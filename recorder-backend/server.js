import crypto from "node:crypto";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import multer from "multer";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const PORT = Number(process.env.PORT || 8787);
const MAX_AUDIO_MB = Math.max(10, Number(process.env.MAX_AUDIO_MB || 180));
const MAX_AUDIO_BYTES = MAX_AUDIO_MB * 1024 * 1024;
const TRANSCRIBE_MODEL = process.env.OPENAI_TRANSCRIBE_MODEL || "gpt-transcribe";
const SUMMARY_MODEL = process.env.OPENAI_SUMMARY_MODEL || "gpt-5.6-terra";

const DEFAULT_ORIGINS = [
  "https://ferrantedaniel-coder.github.io",
  "http://localhost:5500",
  "http://localhost:8080",
  "http://localhost:3000"
];

const ALLOWED_ORIGINS = new Set(
  (process.env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(","))
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

if (!process.env.OPENAI_API_KEY) {
  console.warn("[StudyHub Recorder] OPENAI_API_KEY non configurata.");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.has(origin)) return callback(null, true);
    return callback(new Error("Origin non autorizzata"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-StudyHub-Api-Version"],
  maxAge: 86400
}));

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 12,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "rate_limit",
    message: "Troppe elaborazioni in un'ora. Riprova più tardi."
  }
});

const upload = multer({
  dest: os.tmpdir(),
  limits: {
    fileSize: MAX_AUDIO_BYTES,
    files: 1,
    fields: 1,
    fieldSize: 128 * 1024
  },
  fileFilter(_req, file, callback) {
    const allowedMime = new Set([
      "audio/webm",
      "video/webm",
      "audio/mp4",
      "video/mp4",
      "audio/mpeg",
      "audio/mp3",
      "audio/ogg",
      "audio/wav",
      "audio/x-wav",
      "audio/flac",
      "audio/x-m4a"
    ]);

    if (allowedMime.has(file.mimetype)) return callback(null, true);
    return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "audio"));
  }
});

const MetadataSchema = z.object({
  sessionId: z.string().min(1).max(160),
  subject: z.string().min(1).max(140),
  title: z.string().min(1).max(120),
  teacher: z.string().max(100).optional().default(""),
  durationMs: z.number().nonnegative().max(24 * 60 * 60 * 1000),
  consentAt: z.string().min(1).max(64),
  retentionConsent: z.boolean(),
  retentionPolicy: z.enum(["retain", "delete_after_transcription"]),
  outputLanguage: z.string().max(12).optional().default("it"),
  studyHubFormat: z.object({
    universityStyle: z.boolean().optional().default(true),
    removeRepetitions: z.boolean().optional().default(true),
    keepProfessorExamples: z.boolean().optional().default(true),
    generateKeyPoints: z.boolean().optional().default(true),
    generateExamQuestions: z.boolean().optional().default(true)
  }).optional().default({})
});

const NotesSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  profExamples: z.array(z.string()),
  examQuestions: z.array(z.string())
});

app.get("/health", (_req, res) => {
  res.json({
    ok: true,
    service: "studyhub-recorder-backend",
    version: "1.0.0"
  });
});

app.post("/v1/transcribe", apiLimiter, upload.single("audio"), async (req, res) => {
  const requestId = crypto.randomUUID();
  let audioPath = req.file?.path || null;

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        error: "backend_not_configured",
        message: "Il servizio AI non è ancora configurato.",
        requestId
      });
    }

    if (!req.file) {
      return res.status(400).json({
        error: "missing_audio",
        message: "File audio mancante.",
        requestId
      });
    }

    let rawMetadata;
    try {
      rawMetadata = JSON.parse(req.body.metadata || "{}");
    } catch {
      return res.status(400).json({
        error: "invalid_metadata",
        message: "Metadati non validi.",
        requestId
      });
    }

    const metadata = MetadataSchema.parse(rawMetadata);

    if (
      metadata.retentionConsent === false &&
      metadata.retentionPolicy !== "delete_after_transcription"
    ) {
      return res.status(400).json({
        error: "retention_mismatch",
        message: "La policy audio non è coerente con il consenso.",
        requestId
      });
    }

    const extension = safeAudioExtension(req.file.originalname, req.file.mimetype);
    const extensionPath = req.file.path + extension;
    await fsp.rename(req.file.path, extensionPath);
    audioPath = extensionPath;

    console.info(JSON.stringify({
      event: "studyhub_transcription_started",
      requestId,
      bytes: req.file.size,
      model: TRANSCRIBE_MODEL
    }));

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: TRANSCRIBE_MODEL,
      response_format: "json",
      chunking_strategy: "auto"
    });

    const transcript = String(transcription?.text || "").trim();
    if (!transcript) {
      throw new Error("La trascrizione restituita è vuota.");
    }

    const notesResponse = await openai.responses.parse({
      model: SUMMARY_MODEL,
      reasoning: { effort: "low" },
      input: [
        {
          role: "system",
          content: [
            "Sei il motore di appunti di StudyHub.",
            "Trasforma una trascrizione universitaria in appunti fedeli, chiari e studiabili in italiano.",
            "Non aggiungere conoscenze esterne e non correggere silenziosamente il docente.",
            "Elimina riempitivi, ripetizioni e false partenze senza eliminare contenuto sostanziale.",
            "Mantieni definizioni, passaggi logici, classificazioni, meccanismi e relazioni causa-effetto spiegate durante la lezione.",
            "Inserisci in profExamples soltanto esempi chiaramente attribuibili al docente o presenti esplicitamente nella trascrizione.",
            "Se un passaggio è ambiguo o la trascrizione appare incerta, non inventare: segnala brevemente l'incertezza nel riassunto.",
            "Le possibili domande d'esame devono derivare esclusivamente dalla lezione.",
            "Usa linguaggio universitario ma scorrevole."
          ].join(" ")
        },
        {
          role: "user",
          content: [
            "Contesto libero della registrazione: " + metadata.subject,
            "Titolo: " + metadata.title,
            metadata.teacher ? "Docente: " + metadata.teacher : "",
            "",
            "TRASCRIZIONE:",
            transcript
          ].filter(Boolean).join("\n")
        }
      ],
      text: {
        format: zodTextFormat(NotesSchema, "studyhub_notes")
      }
    });

    const notes = notesResponse.output_parsed;
    if (!notes) {
      throw new Error("Il modello non ha restituito appunti strutturati.");
    }

    console.info(JSON.stringify({
      event: "studyhub_transcription_completed",
      requestId,
      transcriptCharacters: transcript.length,
      summaryModel: SUMMARY_MODEL
    }));

    return res.json({
      transcript,
      summary: notes.summary,
      keyPoints: notes.keyPoints,
      profExamples: notes.profExamples,
      examQuestions: notes.examQuestions,
      processing: {
        requestId,
        serverAudioRetention: "temporary_only_deleted_after_processing",
        transcribeModel: TRANSCRIBE_MODEL,
        summaryModel: SUMMARY_MODEL
      }
    });
  } catch (error) {
    console.error(JSON.stringify({
      event: "studyhub_transcription_failed",
      requestId,
      error: safeErrorName(error)
    }));

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "invalid_metadata",
        message: "I metadati della registrazione non sono validi.",
        requestId
      });
    }

    return res.status(502).json({
      error: "processing_failed",
      message: "Trascrizione o generazione degli appunti non completata. L'audio locale nel browser non deve essere eliminato.",
      requestId
    });
  } finally {
    if (audioPath) {
      await fsp.rm(audioPath, { force: true }).catch(() => {});
    }
  }
});

app.use((error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        error: "audio_too_large",
        message: "Il file audio supera il limite di " + MAX_AUDIO_MB + " MB."
      });
    }

    return res.status(400).json({
      error: "invalid_upload",
      message: "Upload audio non valido."
    });
  }

  if (error?.message === "Origin non autorizzata") {
    return res.status(403).json({
      error: "origin_not_allowed",
      message: "Origine non autorizzata."
    });
  }

  console.error("[StudyHub Recorder] errore non gestito:", safeErrorName(error));
  return res.status(500).json({
    error: "internal_error",
    message: "Errore interno del servizio."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.info(
    "[StudyHub Recorder] backend attivo sulla porta " + PORT +
    " · upload max " + MAX_AUDIO_MB + " MB"
  );
});

function safeAudioExtension(originalName, mimeType) {
  const known = new Set([".flac", ".mp3", ".mp4", ".mpeg", ".mpga", ".m4a", ".ogg", ".wav", ".webm"]);
  const fromName = path.extname(originalName || "").toLowerCase();
  if (known.has(fromName)) return fromName;

  const map = {
    "audio/webm": ".webm",
    "video/webm": ".webm",
    "audio/mp4": ".m4a",
    "video/mp4": ".mp4",
    "audio/mpeg": ".mp3",
    "audio/mp3": ".mp3",
    "audio/ogg": ".ogg",
    "audio/wav": ".wav",
    "audio/x-wav": ".wav",
    "audio/flac": ".flac",
    "audio/x-m4a": ".m4a"
  };

  return map[mimeType] || ".webm";
}

function safeErrorName(error) {
  if (!error) return "UnknownError";
  return String(error.name || error.code || "Error").slice(0, 80);
}
