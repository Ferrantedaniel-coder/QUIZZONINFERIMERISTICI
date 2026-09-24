(function(){
"use strict";

var CONFIG = window.STUDYHUB_RECORDER_CONFIG || {};
var DB_NAME = "studyhub-recorder-v1";
var DB_VERSION = 2;
var SESSIONS = "sessions";
var CHUNKS = "chunks";
var RECORDINGS = "recordings";

var dbPromise = null;
var mediaRecorder = null;
var mediaStream = null;
var currentSession = null;
var pendingWrites = [];
var liveChunks = [];
var timerHandle = null;
var elapsedBase = 0;
var segmentStartedAt = 0;
var previewUrl = null;
var backendReady = false;

var el = {};
function $(id){ return document.getElementById(id); }

document.addEventListener("DOMContentLoaded", init);

async function init(){
  [
    "subject","lessonTitle","teacher","supportLine","prepareBtn","recorderCard","recState","chunkState","timer",
    "pauseBtn","stopBtn","recHelper","processingPanel","processingTitle","processingText","retentionBadge",
    "transcribeBtn","previewBtn","deleteBtn","audioPreview","notesPanel","notesTitle","summaryText","keyPoints",
    "profExamples","examQuestions","transcriptText","archiveList","refreshArchiveBtn","consentModal","consentClose",
    "recordingConsent","retentionConsent","consentCancel","consentConfirm","aiBadge"
  ].forEach(function(id){ el[id] = $(id); });

  bindEvents();
  checkSupport();
  await inspectMicrophonePermission();

  try {
    await openDb();
    await markInterruptedSessions();
    await purgeLegacyDeletedSessions();
    await refreshArchive();
  } catch (err) {
    setSupport("Archiviazione locale non disponibile: " + friendlyError(err), false);
    el.prepareBtn.disabled = true;
  }

  await checkBackendHealth();
}

function bindEvents(){
  el.prepareBtn.addEventListener("click", openConsent);
  el.consentClose.addEventListener("click", closeConsent);
  el.consentCancel.addEventListener("click", closeConsent);
  el.recordingConsent.addEventListener("change", function(){
    el.consentConfirm.disabled = !el.recordingConsent.checked;
  });
  el.consentConfirm.addEventListener("click", confirmConsentAndStart);
  el.pauseBtn.addEventListener("click", togglePause);
  el.stopBtn.addEventListener("click", stopRecording);
  el.transcribeBtn.addEventListener("click", function(){
    if (currentSession) transcribeSession(currentSession.id);
  });
  el.previewBtn.addEventListener("click", function(){
    if (currentSession) previewAudio(currentSession.id);
  });
  el.deleteBtn.addEventListener("click", function(){
    if (currentSession) deleteSessionCompletely(currentSession.id);
  });
  el.refreshArchiveBtn.addEventListener("click", refreshArchive);

  el.audioPreview.addEventListener("error", function(){
    var mediaError = el.audioPreview.error;
    var code = mediaError ? mediaError.code : 0;
    var label = code === 4
      ? "formato audio non supportato dal browser"
      : code === 3
        ? "errore di decodifica audio"
        : "errore di riproduzione";
    el.processingText.textContent = "L'audio è stato registrato ma il player non riesce a riprodurlo: " + label + ". La registrazione resta salvata; prova a ricaricare la pagina o usa una nuova registrazione dopo questo aggiornamento.";
  });

  el.consentModal.addEventListener("click", function(event){
    if (event.target === el.consentModal) closeConsent();
  });
  document.addEventListener("keydown", function(event){
    if (event.key === "Escape" && !el.consentModal.classList.contains("hidden")) closeConsent();
  });

  document.addEventListener("visibilitychange", function(){
    if (document.hidden && mediaRecorder && mediaRecorder.state === "recording") {
      try { mediaRecorder.requestData(); } catch (_) {}
    }
  });
}

async function checkBackendHealth(){
  backendReady = false;

  if (!CONFIG.apiEndpoint) {
    el.aiBadge.textContent = "BACKEND AI DA PUBBLICARE";
    el.aiBadge.classList.remove("ok");
    return false;
  }

  el.aiBadge.textContent = "CONTROLLO AI…";
  el.aiBadge.classList.remove("ok");

  try {
    var endpoint = new URL(CONFIG.apiEndpoint, window.location.href);
    endpoint.pathname = endpoint.pathname.replace(/\/v1\/transcribe\/?$/, "/health");
    endpoint.search = "";
    endpoint.hash = "";

    var response = await fetch(endpoint.toString(), {
      method: "GET",
      cache: "no-store"
    });

    if (!response.ok) throw new Error("HTTP " + response.status);
    var data = await response.json();
    if (!data || data.ok !== true) throw new Error("health check non valido");

    backendReady = true;
    el.aiBadge.textContent = "AI ONLINE";
    el.aiBadge.classList.add("status-badge","ok");
    return true;
  } catch (_) {
    backendReady = false;
    el.aiBadge.textContent = "AI NON RAGGIUNGIBILE";
    el.aiBadge.classList.remove("ok");
    return false;
  }
}

function checkSupport(){
  var supported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.indexedDB);
  var secure = window.isSecureContext;
  if (!secure) {
    setSupport("Il microfono richiede una connessione HTTPS sicura.", false);
    el.prepareBtn.disabled = true;
    return;
  }
  if (!supported) {
    setSupport("Questo browser non supporta tutte le funzioni necessarie al registratore.", false);
    el.prepareBtn.disabled = true;
    return;
  }
  setSupport("Browser compatibile · microfono e salvataggio locale disponibili.", true);
}

function setSupport(message, ok){
  el.supportLine.textContent = message;
  el.supportLine.classList.toggle("ok", !!ok);
  el.supportLine.classList.toggle("bad", !ok);
}

async function inspectMicrophonePermission(){
  if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return;

  if (window.top !== window.self) {
    var policyAllows = true;
    try {
      var policy = document.permissionsPolicy || document.featurePolicy;
      if (policy && typeof policy.allowsFeature === "function") {
        policyAllows = policy.allowsFeature("microphone");
      }
    } catch (_) {}
    if (!policyAllows) {
      setSupport("Microfono bloccato dalla pagina incorporata. Apri StudyHub direttamente in una nuova scheda.", false);
      return;
    }
  }

  if (!navigator.permissions || !navigator.permissions.query) return;
  try {
    var permission = await navigator.permissions.query({ name: "microphone" });
    applyMicrophonePermissionState(permission.state);
    permission.onchange = function(){ applyMicrophonePermissionState(permission.state); };
  } catch (_) {
    // Alcuni browser non espongono lo stato del microfono tramite Permissions API.
  }
}

function applyMicrophonePermissionState(state){
  if (state === "denied") {
    setSupport("Il browser segnala il microfono come BLOCCATO. Controlla sia il permesso del sito sia il permesso Microfono di Chrome nelle impostazioni di macOS.", false);
  } else if (state === "granted") {
    setSupport("Permesso microfono del sito: autorizzato · salvataggio locale disponibile.", true);
  } else if (state === "prompt") {
    setSupport("Microfono disponibile · il browser chiederà l'autorizzazione al primo avvio.", true);
  }
}

function openConsent(){
  if (!el.subject.value) {
    el.subject.focus();
    setSupport("Scrivi prima cosa stai registrando.", false);
    return;
  }
  if (!el.lessonTitle.value.trim()) {
    el.lessonTitle.focus();
    setSupport("Inserisci un titolo per riconoscere la lezione.", false);
    return;
  }
  el.recordingConsent.checked = false;
  el.retentionConsent.checked = false;
  el.consentConfirm.disabled = true;
  el.consentModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeConsent(){
  el.consentModal.classList.add("hidden");
  document.body.style.overflow = "";
}

async function confirmConsentAndStart(){
  if (!el.recordingConsent.checked) return;
  el.consentConfirm.disabled = true;
  closeConsent();
  await startRecording();
}

async function startRecording(){
  if (mediaRecorder && mediaRecorder.state !== "inactive") return;

  el.prepareBtn.disabled = true;
  setRecorderState("PREPARAZIONE", "idle");

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: true
      },
      video: false
    });

    var mimeType = chooseMimeType();
    var options = mimeType ? { mimeType: mimeType, audioBitsPerSecond: 96000 } : { audioBitsPerSecond: 96000 };

    try {
      mediaRecorder = new MediaRecorder(mediaStream, options);
    } catch (_) {
      mediaRecorder = new MediaRecorder(mediaStream);
      mimeType = mediaRecorder.mimeType || "";
    }

    var now = new Date();
    currentSession = {
      id: makeId(),
      subject: el.subject.value,
      title: el.lessonTitle.value.trim(),
      teacher: el.teacher.value.trim(),
      createdAt: now.toISOString(),
      consentAt: now.toISOString(),
      recordingConsent: true,
      retentionConsent: !!el.retentionConsent.checked,
      retentionPolicy: el.retentionConsent.checked ? "retain" : "delete_after_transcription",
      state: "recording",
      mimeType: mediaRecorder.mimeType || mimeType || "audio/webm",
      chunkCount: 0,
      durationMs: 0,
      transcript: "",
      summary: "",
      keyPoints: [],
      profExamples: [],
      examQuestions: [],
      audioDeletedAt: null,
      transcribedAt: null,
      lastUpdatedAt: now.toISOString()
    };

    await putSession(currentSession);
    pendingWrites = [];
    liveChunks = [];
    elapsedBase = 0;
    segmentStartedAt = Date.now();

    mediaRecorder.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorder.addEventListener("stop", finalizeRecording, { once: true });
    mediaRecorder.addEventListener("error", handleRecorderError);

    mediaRecorder.start(Number(CONFIG.chunkMilliseconds) || 5000);
    startTimer();
    setRecorderState("IN REGISTRAZIONE", "recording");
    el.recorderCard.classList.add("is-recording");
    el.pauseBtn.disabled = false;
    el.stopBtn.disabled = false;
    el.pauseBtn.textContent = "Pausa";
    el.recHelper.textContent = currentSession.retentionConsent
      ? "Il docente ha autorizzato la conservazione dell'audio. I blocchi vengono salvati localmente mentre registri."
      : "Audio temporaneo: verrà eliminato dopo una trascrizione completata con successo.";
    updateChunkState();
    setSupport("Microfono attivo · registrazione in corso.", true);

    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(function(){});
    }
  } catch (err) {
    stopTracks();
    mediaRecorder = null;
    el.prepareBtn.disabled = false;
    setRecorderState("PRONTO", "idle");
    setSupport(await microphoneErrorMessage(err), false);
  }
}

function chooseMimeType(){
  var candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus"
  ];
  for (var i=0; i<candidates.length; i++) {
    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(candidates[i])) return candidates[i];
  }
  return "";
}

function handleDataAvailable(event){
  if (!currentSession || !event.data || event.data.size === 0) return;

  liveChunks.push(event.data);
  currentSession.chunkCount += 1;
  currentSession.lastUpdatedAt = new Date().toISOString();
  var seq = currentSession.chunkCount;
  var sessionId = currentSession.id;
  var mime = event.data.type || currentSession.mimeType;

  var write = putChunk({
    key: sessionId + ":" + String(seq).padStart(8,"0"),
    sessionId: sessionId,
    seq: seq,
    createdAt: new Date().toISOString(),
    mimeType: mime,
    blob: event.data
  }).then(function(){
    return putSession(currentSession);
  }).then(function(){
    updateChunkState();
  }).catch(function(err){
    el.recHelper.textContent = "Attenzione: un blocco audio non è stato salvato correttamente. " + friendlyError(err);
  });

  pendingWrites.push(write);
}

function togglePause(){
  if (!mediaRecorder) return;

  if (mediaRecorder.state === "recording") {
    mediaRecorder.pause();
    elapsedBase += Date.now() - segmentStartedAt;
    if (currentSession) {
      currentSession.durationMs = elapsedBase;
      currentSession.state = "paused";
      currentSession.lastUpdatedAt = new Date().toISOString();
      putSession(currentSession).catch(function(){});
    }
    setRecorderState("IN PAUSA", "paused");
    el.recorderCard.classList.remove("is-recording");
    el.pauseBtn.textContent = "Riprendi";
    return;
  }

  if (mediaRecorder.state === "paused") {
    mediaRecorder.resume();
    segmentStartedAt = Date.now();
    if (currentSession) {
      currentSession.state = "recording";
      currentSession.lastUpdatedAt = new Date().toISOString();
      putSession(currentSession).catch(function(){});
    }
    setRecorderState("IN REGISTRAZIONE", "recording");
    el.recorderCard.classList.add("is-recording");
    el.pauseBtn.textContent = "Pausa";
  }
}

function stopRecording(){
  if (!mediaRecorder || mediaRecorder.state === "inactive") return;
  el.pauseBtn.disabled = true;
  el.stopBtn.disabled = true;

  if (mediaRecorder.state === "recording") {
    elapsedBase += Date.now() - segmentStartedAt;
  }
  if (currentSession) currentSession.durationMs = elapsedBase;

  setRecorderState("SALVATAGGIO", "paused");
  el.recorderCard.classList.remove("is-recording");
  try { mediaRecorder.stop(); } catch (err) { handleRecorderError(err); }
}

async function finalizeRecording(){
  stopTimer();
  stopTracks();

  try {
    await Promise.allSettled(pendingWrites);
    if (!currentSession) return;

    if (liveChunks.length) {
      var masterType = currentSession.mimeType || liveChunks[0].type || "audio/webm";
      var masterBlob = new Blob(liveChunks, { type: masterType });
      if (!masterBlob.size) throw new Error("Il file audio finale risulta vuoto");

      await putRecording({
        sessionId: currentSession.id,
        blob: masterBlob,
        mimeType: masterType,
        size: masterBlob.size,
        createdAt: new Date().toISOString()
      });

      currentSession.masterAudio = true;
      currentSession.audioBytes = masterBlob.size;

      // I chunk servono al recupero durante la registrazione. Dopo aver salvato
      // il master verificato si possono rimuovere per evitare doppio spazio.
      await deleteChunks(currentSession.id);
    }

    currentSession.state = "recorded";
    currentSession.durationMs = elapsedBase;
    currentSession.lastUpdatedAt = new Date().toISOString();
    await putSession(currentSession);

    setRecorderState("REGISTRATA", "idle");
    el.timer.textContent = formatDuration(currentSession.durationMs);
    el.recHelper.textContent = "Registrazione completata. I blocchi audio sono disponibili sul dispositivo.";
    el.prepareBtn.disabled = false;
    updateChunkState();
    await showProcessing(currentSession);
    await refreshArchive();
  } catch (err) {
    setSupport("Registrazione terminata, ma il salvataggio finale ha restituito un errore: " + friendlyError(err), false);
  } finally {
    mediaRecorder = null;
    pendingWrites = [];
    liveChunks = [];
  }
}

function handleRecorderError(event){
  stopTimer();
  stopTracks();
  el.prepareBtn.disabled = false;
  el.pauseBtn.disabled = true;
  el.stopBtn.disabled = true;
  el.recorderCard.classList.remove("is-recording");
  setRecorderState("ERRORE", "paused");
  var err = event && event.error ? event.error : event;
  setSupport("Errore durante la registrazione: " + friendlyError(err), false);
}

function startTimer(){
  stopTimer();
  timerHandle = window.setInterval(function(){
    var ms = elapsedBase;
    if (mediaRecorder && mediaRecorder.state === "recording") ms += Date.now() - segmentStartedAt;
    el.timer.textContent = formatDuration(ms);
  }, 250);
}

function stopTimer(){
  if (timerHandle) window.clearInterval(timerHandle);
  timerHandle = null;
}

function setRecorderState(label, stateClass){
  el.recState.className = "rec-state " + (stateClass || "idle");
  el.recState.innerHTML = "<i></i> " + label;
}

function updateChunkState(){
  var count = currentSession ? currentSession.chunkCount || 0 : 0;
  el.chunkState.textContent = count ? count + " blocchi salvati" : "Nessun audio salvato";
}

function stopTracks(){
  if (!mediaStream) return;
  mediaStream.getTracks().forEach(function(track){ track.stop(); });
  mediaStream = null;
}

async function showProcessing(session){
  currentSession = session;
  el.processingPanel.classList.remove("hidden");
  el.processingTitle.textContent = session.title || "Lezione registrata";
  el.retentionBadge.textContent = session.retentionConsent ? "AUDIO CONSERVABILE" : "AUDIO TEMPORANEO";
  el.retentionBadge.classList.toggle("ok", !!session.retentionConsent);

  if (session.state === "transcribed") {
    el.processingText.textContent = session.retentionConsent
      ? "Trascrizione completata. L'audio resta disponibile perché la conservazione è stata autorizzata."
      : "Trascrizione completata. L'audio locale è stato eliminato come previsto dal consenso.";
    el.transcribeBtn.disabled = true;
    el.transcribeBtn.textContent = "Trascrizione completata";
    el.previewBtn.disabled = !session.retentionConsent || !!session.audioDeletedAt;
    el.deleteBtn.disabled = !!session.audioDeletedAt;
    showNotes(session);
    return;
  }

  el.transcribeBtn.textContent = backendReady ? "Trascrivi e crea appunti" : (CONFIG.apiEndpoint ? "AI non raggiungibile" : "Backend AI da pubblicare");
  el.transcribeBtn.disabled = !backendReady;
  el.previewBtn.disabled = !!session.audioDeletedAt;
  el.deleteBtn.disabled = !!session.audioDeletedAt;

  if (backendReady) {
    el.processingText.textContent = session.retentionConsent
      ? "Puoi avviare trascrizione e riassunto. Dopo l'elaborazione l'audio verrà conservato sul dispositivo."
      : "Puoi avviare trascrizione e riassunto. Dopo il completamento riuscito StudyHub eliminerà l'audio locale.";
  } else {
    el.processingText.textContent = "Il registratore è operativo. La trascrizione automatica richiede il backend sicuro, non ancora configurato: l'audio resta locale e non viene eliminato finché la trascrizione non risulta completata.";
  }
}

async function previewAudio(sessionId){
  try {
    var session = await getSession(sessionId);
    var audio = await getAudioBlob(sessionId, session);

    if (!audio || !audio.blob || !audio.blob.size) {
      el.processingText.textContent = "Non risulta un file audio disponibile per questa sessione.";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(audio.blob);

    el.audioPreview.pause();
    el.audioPreview.removeAttribute("src");
    el.audioPreview.src = previewUrl;
    el.audioPreview.classList.remove("hidden");
    el.audioPreview.load();

    // Non avviare automaticamente: dopo una lettura IndexedDB asincrona
    // Chrome può considerare perso il gesto dell'utente e bloccare play().
    el.processingText.textContent = "Audio pronto. Premi ▶ nel player per ascoltare la registrazione.";
    el.audioPreview.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (err) {
    el.processingText.textContent = "Impossibile preparare l'audio: " + friendlyError(err);
  }
}

async function getAudioBlob(sessionId, session){
  var master = await getRecording(sessionId);
  if (master && master.blob && master.blob.size) return master;

  // Compatibilità e recupero per registrazioni precedenti o sessioni interrotte.
  var chunks = await getChunks(sessionId);
  if (!chunks.length) return null;

  var mimeType = (session && session.mimeType) || chunks[0].mimeType || chunks[0].blob.type || "audio/webm";
  var blob = new Blob(chunks.map(function(item){ return item.blob; }), { type: mimeType });

  if (blob.size && session && session.state !== "recording" && session.state !== "paused") {
    await putRecording({
      sessionId: sessionId,
      blob: blob,
      mimeType: mimeType,
      size: blob.size,
      createdAt: new Date().toISOString(),
      rebuiltFromRecoveryChunks: true
    });
    session.masterAudio = true;
    session.audioBytes = blob.size;
    await putSession(session);
  }

  return { sessionId: sessionId, blob: blob, mimeType: mimeType, size: blob.size };
}

async function transcribeSession(sessionId){
  if (!backendReady) {
    await checkBackendHealth();
    if (!backendReady) {
      el.processingText.textContent = "Il servizio AI non è disponibile. L'audio resta salvato localmente e puoi riprovare quando il backend torna online.";
      return;
    }
  }

  el.transcribeBtn.disabled = true;
  el.transcribeBtn.textContent = "Elaborazione…";
  el.processingText.textContent = "Preparazione dell'audio e invio al servizio di trascrizione sicuro…";

  try {
    var session = await getSession(sessionId);
    var audio = await getAudioBlob(sessionId, session);
    if (!audio || !audio.blob || !audio.blob.size) throw new Error("Audio non disponibile");

    session.state = "processing";
    session.lastUpdatedAt = new Date().toISOString();
    await putSession(session);

    var audioBlob = audio.blob;

    var metadata = {
      sessionId: session.id,
      subject: session.subject,
      title: session.title,
      teacher: session.teacher,
      durationMs: session.durationMs,
      consentAt: session.consentAt,
      retentionConsent: session.retentionConsent,
      retentionPolicy: session.retentionConsent ? "retain" : "delete_after_transcription",
      outputLanguage: "it",
      studyHubFormat: {
        universityStyle: true,
        removeRepetitions: true,
        keepProfessorExamples: true,
        generateKeyPoints: true,
        generateExamQuestions: true
      }
    };

    var form = new FormData();
    form.append("audio", audioBlob, safeFilename(session.title) + extensionForMime(audioBlob.type));
    form.append("metadata", JSON.stringify(metadata));

    var response = await fetch(CONFIG.apiEndpoint, {
      method: "POST",
      body: form,
      headers: { "X-StudyHub-Api-Version": CONFIG.apiVersion || "v1" }
    });

    if (!response.ok) {
      var detail = "";
      try { detail = await response.text(); } catch (_) {}
      throw new Error("Servizio di trascrizione: HTTP " + response.status + (detail ? " · " + detail.slice(0,180) : ""));
    }

    var data = await response.json();
    if (!data || typeof data.transcript !== "string" || !data.transcript.trim()) {
      throw new Error("La trascrizione ricevuta è vuota o non valida");
    }

    session.transcript = data.transcript.trim();
    session.summary = normalizeText(data.summary);
    session.keyPoints = normalizeList(data.keyPoints || data.key_points);
    session.profExamples = normalizeList(data.profExamples || data.prof_examples);
    session.examQuestions = normalizeList(data.examQuestions || data.exam_questions);
    session.transcribedAt = new Date().toISOString();
    session.state = "transcribed";
    session.lastUpdatedAt = new Date().toISOString();

    if (!session.retentionConsent) {
      await deleteChunks(session.id);
      await deleteRecording(session.id);
      session.audioDeletedAt = new Date().toISOString();
      session.masterAudio = false;
    }

    await putSession(session);
    currentSession = session;

    el.processingText.textContent = session.retentionConsent
      ? "Trascrizione completata. Audio conservato perché autorizzato."
      : "Trascrizione completata. Audio locale eliminato automaticamente come previsto.";
    await showProcessing(session);
    await refreshArchive();
  } catch (err) {
    var failed = await getSession(sessionId).catch(function(){ return null; });
    if (failed) {
      failed.state = "recorded";
      failed.lastError = friendlyError(err);
      failed.lastUpdatedAt = new Date().toISOString();
      await putSession(failed).catch(function(){});
      currentSession = failed;
    }
    el.processingText.textContent = "La trascrizione non è stata completata. L'audio non è stato eliminato, così puoi riprovare. Dettaglio: " + friendlyError(err);
    el.transcribeBtn.disabled = false;
    el.transcribeBtn.textContent = "Riprova trascrizione";
    await refreshArchive();
  }
}

function showNotes(session){
  el.notesPanel.classList.remove("hidden");
  el.notesTitle.textContent = session.subject + " · " + session.title;
  renderParagraphs(el.summaryText, session.summary || "Riassunto non disponibile.");
  renderList(el.keyPoints, session.keyPoints, "Nessun concetto chiave restituito.");
  renderList(el.profExamples, session.profExamples, "Nessun esempio del docente identificato.");
  renderList(el.examQuestions, session.examQuestions, "Nessuna domanda d'esame generata.");
  el.transcriptText.textContent = session.transcript || "";
}

function renderParagraphs(target, value){
  target.textContent = "";
  String(value || "").split(/\n{2,}/).filter(Boolean).forEach(function(paragraph){
    var p = document.createElement("p");
    p.textContent = paragraph.trim();
    target.appendChild(p);
  });
}

function renderList(target, values, emptyText){
  target.textContent = "";
  var list = normalizeList(values);
  if (!list.length) {
    var p = document.createElement("p");
    p.textContent = emptyText;
    target.appendChild(p);
    return;
  }
  var ul = document.createElement("ul");
  list.forEach(function(value){
    var li = document.createElement("li");
    li.textContent = value;
    ul.appendChild(li);
  });
  target.appendChild(ul);
}

async function deleteSessionCompletely(sessionId){
  var session = await getSession(sessionId);
  if (!session) return;

  var confirmed = window.confirm(
    "Eliminare definitivamente questa registrazione? Verranno cancellati audio, dati della sessione e appunti eventualmente generati."
  );
  if (!confirmed) return;

  await deleteChunks(sessionId);
  await deleteRecording(sessionId);
  await deleteSession(sessionId);

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }

  el.audioPreview.pause();
  el.audioPreview.removeAttribute("src");
  el.audioPreview.classList.add("hidden");

  if (currentSession && currentSession.id === sessionId) {
    currentSession = null;
    el.processingPanel.classList.add("hidden");
    el.notesPanel.classList.add("hidden");
    el.timer.textContent = "00:00:00";
    el.chunkState.textContent = "Nessun audio salvato";
    setRecorderState("PRONTO", "idle");
    el.recHelper.textContent = "Registrazione eliminata. Puoi avviare una nuova sessione.";
  }

  await refreshArchive();
}

async function purgeLegacyDeletedSessions(){
  var sessions = await getAllSessions();
  var ghosts = sessions.filter(function(session){
    return session && session.state === "audio_deleted";
  });

  for (var i = 0; i < ghosts.length; i++) {
    await deleteChunks(ghosts[i].id).catch(function(){});
    await deleteRecording(ghosts[i].id).catch(function(){});
    await deleteSession(ghosts[i].id).catch(function(){});
  }
}

async function refreshArchive(){
  var sessions = await getAllSessions();
  sessions.sort(function(a,b){ return String(b.createdAt).localeCompare(String(a.createdAt)); });
  el.archiveList.textContent = "";

  if (!sessions.length) {
    var empty = document.createElement("div");
    empty.className = "archive-empty";
    empty.textContent = "Nessuna sessione registrata su questo dispositivo.";
    el.archiveList.appendChild(empty);
    return;
  }

  sessions.forEach(function(session){
    var row = document.createElement("article");
    row.className = "archive-item";

    var main = document.createElement("div");
    var title = document.createElement("b");
    title.textContent = (session.subject || "Materia") + " · " + (session.title || "Lezione");
    var meta = document.createElement("small");
    var when = session.createdAt ? new Date(session.createdAt).toLocaleString("it-IT") : "data non disponibile";
    var retention = session.retentionConsent ? "audio autorizzato alla conservazione" : "audio temporaneo";
    var audioState = session.audioDeletedAt
      ? "audio eliminato"
      : session.masterAudio
        ? "audio pronto"
        : (session.chunkCount ? session.chunkCount + " blocchi di recupero" : "nessun audio");
    meta.textContent = when + " · " + formatDuration(session.durationMs || 0) + " · " + retention + " · " + audioState + " · " + humanState(session.state);
    main.appendChild(title);
    main.appendChild(meta);

    var actions = document.createElement("div");
    actions.className = "archive-item-actions";

    var open = document.createElement("button");
    open.type = "button";
    open.className = "mini-btn";
    open.textContent = session.state === "transcribed" ? "Apri appunti" : "Apri";
    open.addEventListener("click", async function(){
      var fresh = await getSession(session.id);
      currentSession = fresh;
      await showProcessing(fresh);
      if (fresh.state === "transcribed") showNotes(fresh);
      el.processingPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    actions.appendChild(open);

    if (!session.audioDeletedAt && (session.masterAudio || session.chunkCount)) {
      var wipe = document.createElement("button");
      wipe.type = "button";
      wipe.className = "mini-btn danger";
      wipe.textContent = "Elimina registrazione";
      wipe.addEventListener("click", function(){ deleteSessionCompletely(session.id); });
      actions.appendChild(wipe);
    }

    row.appendChild(main);
    row.appendChild(actions);
    el.archiveList.appendChild(row);
  });
}

async function markInterruptedSessions(){
  var sessions = await getAllSessions();
  var changes = sessions.filter(function(s){ return s.state === "recording" || s.state === "paused" || s.state === "processing"; });
  for (var i=0; i<changes.length; i++) {
    changes[i].state = "interrupted";
    changes[i].lastUpdatedAt = new Date().toISOString();
    await putSession(changes[i]);
  }
}

function humanState(state){
  var map = {
    recording:"in registrazione",
    paused:"in pausa",
    recorded:"pronta per trascrizione",
    processing:"in elaborazione",
    transcribed:"trascritta",
    interrupted:"recuperata dopo interruzione",
    audio_deleted:"audio eliminato"
  };
  return map[state] || state || "salvata";
}

function normalizeText(value){
  if (typeof value === "string") return value.trim();
  if (Array.isArray(value)) return value.join("\n\n").trim();
  return "";
}

function normalizeList(value){
  if (Array.isArray(value)) return value.map(function(v){ return String(v).trim(); }).filter(Boolean);
  if (typeof value === "string") {
    return value.split(/\n+/).map(function(v){ return v.replace(/^\s*[-•*\d.)]+\s*/, "").trim(); }).filter(Boolean);
  }
  return [];
}

function extensionForMime(mime){
  if ((mime || "").indexOf("mp4") >= 0) return ".m4a";
  if ((mime || "").indexOf("ogg") >= 0) return ".ogg";
  return ".webm";
}

function safeFilename(value){
  return String(value || "lezione")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-zA-Z0-9_-]+/g,"-")
    .replace(/^-+|-+$/g,"")
    .slice(0,80) || "lezione";
}

function makeId(){
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "rec-" + Date.now() + "-" + Math.random().toString(16).slice(2);
}

function formatDuration(ms){
  var total = Math.max(0, Math.floor((Number(ms) || 0) / 1000));
  var h = Math.floor(total / 3600);
  var m = Math.floor((total % 3600) / 60);
  var s = total % 60;
  return [h,m,s].map(function(v){ return String(v).padStart(2,"0"); }).join(":");
}

async function microphoneErrorMessage(err){
  if (!err) return "Impossibile avviare il microfono: errore sconosciuto.";

  if (err.name === "NotAllowedError" || err.name === "SecurityError") {
    if (window.top !== window.self) {
      try {
        var policy = document.permissionsPolicy || document.featurePolicy;
        if (policy && typeof policy.allowsFeature === "function" && !policy.allowsFeature("microphone")) {
          return "Microfono bloccato dalla pagina incorporata. Apri StudyHub direttamente in una nuova scheda e riprova.";
        }
      } catch (_) {}
    }

    if (navigator.permissions && navigator.permissions.query) {
      try {
        var status = await navigator.permissions.query({ name: "microphone" });
        if (status.state === "denied") {
          return "Microfono bloccato. In Chrome consenti il Microfono nelle impostazioni del sito e, su Mac, verifica anche Impostazioni di Sistema → Privacy e sicurezza → Microfono → Google Chrome.";
        }
        if (status.state === "granted") {
          return "Chrome segnala il sito come autorizzato, ma l'accesso al microfono è ancora bloccato. Su Mac verifica Impostazioni di Sistema → Privacy e sicurezza → Microfono → Google Chrome, poi chiudi e riapri Chrome.";
        }
      } catch (_) {}
    }

    return "Accesso al microfono bloccato dal browser o dal sistema operativo. Controlla il permesso del sito e il permesso Microfono di Chrome nelle impostazioni del dispositivo.";
  }

  if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
    return "Nessun microfono rilevato dal dispositivo.";
  }
  if (err.name === "NotReadableError" || err.name === "TrackStartError") {
    return "Il microfono è autorizzato ma non può essere aperto: potrebbe essere occupato da un'altra app. Chiudi eventuali app che lo stanno usando e riprova.";
  }
  if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
    return "Il microfono è disponibile ma non supporta una delle impostazioni richieste. Riprova: StudyHub userà una configurazione più semplice.";
  }
  return "Impossibile avviare il microfono: " + (err.message || String(err));
}

function friendlyError(err){
  if (!err) return "errore sconosciuto";
  if (err.name === "NotAllowedError") return "accesso al microfono bloccato";
  if (err.name === "NotFoundError") return "nessun microfono disponibile";
  if (err.name === "NotReadableError") return "microfono occupato o non leggibile";
  return err.message || String(err);
}

function openDb(){
  if (dbPromise) return dbPromise;
  dbPromise = new Promise(function(resolve,reject){
    var request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = function(){
      var db = request.result;
      if (!db.objectStoreNames.contains(SESSIONS)) {
        db.createObjectStore(SESSIONS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(CHUNKS)) {
        var store = db.createObjectStore(CHUNKS, { keyPath: "key" });
        store.createIndex("sessionId", "sessionId", { unique: false });
      }
      if (!db.objectStoreNames.contains(RECORDINGS)) {
        db.createObjectStore(RECORDINGS, { keyPath: "sessionId" });
      }
    };
    request.onsuccess = function(){ resolve(request.result); };
    request.onerror = function(){ reject(request.error || new Error("IndexedDB non disponibile")); };
  });
  return dbPromise;
}

async function putSession(session){
  var db = await openDb();
  return txPromise(db, SESSIONS, "readwrite", function(store){ store.put(session); });
}

async function getSession(id){
  var db = await openDb();
  return requestPromise(db.transaction(SESSIONS,"readonly").objectStore(SESSIONS).get(id));
}

async function getAllSessions(){
  var db = await openDb();
  return requestPromise(db.transaction(SESSIONS,"readonly").objectStore(SESSIONS).getAll());
}

async function deleteSession(sessionId){
  var db = await openDb();
  return txPromise(db, SESSIONS, "readwrite", function(store){ store.delete(sessionId); });
}

async function putChunk(chunk){
  var db = await openDb();
  return txPromise(db, CHUNKS, "readwrite", function(store){ store.put(chunk); });
}

async function getChunks(sessionId){
  var db = await openDb();
  var tx = db.transaction(CHUNKS,"readonly");
  var index = tx.objectStore(CHUNKS).index("sessionId");
  var items = await requestPromise(index.getAll(IDBKeyRange.only(sessionId)));
  items.sort(function(a,b){ return a.seq - b.seq; });
  return items;
}

async function deleteChunks(sessionId){
  var db = await openDb();
  return new Promise(function(resolve,reject){
    var tx = db.transaction(CHUNKS,"readwrite");
    var index = tx.objectStore(CHUNKS).index("sessionId");
    var request = index.openKeyCursor(IDBKeyRange.only(sessionId));
    request.onsuccess = function(){
      var cursor = request.result;
      if (!cursor) return;
      tx.objectStore(CHUNKS).delete(cursor.primaryKey);
      cursor.continue();
    };
    request.onerror = function(){ reject(request.error); };
    tx.oncomplete = function(){ resolve(); };
    tx.onerror = function(){ reject(tx.error || new Error("Errore eliminazione audio")); };
    tx.onabort = function(){ reject(tx.error || new Error("Eliminazione audio annullata")); };
  });
}

async function putRecording(recording){
  var db = await openDb();
  return txPromise(db, RECORDINGS, "readwrite", function(store){ store.put(recording); });
}

async function getRecording(sessionId){
  var db = await openDb();
  return requestPromise(db.transaction(RECORDINGS,"readonly").objectStore(RECORDINGS).get(sessionId));
}

async function deleteRecording(sessionId){
  var db = await openDb();
  return txPromise(db, RECORDINGS, "readwrite", function(store){ store.delete(sessionId); });
}

function txPromise(db, storeName, mode, action){
  return new Promise(function(resolve,reject){
    var tx = db.transaction(storeName, mode);
    var store = tx.objectStore(storeName);
    try { action(store); } catch (err) { reject(err); return; }
    tx.oncomplete = function(){ resolve(); };
    tx.onerror = function(){ reject(tx.error || new Error("Errore IndexedDB")); };
    tx.onabort = function(){ reject(tx.error || new Error("Transazione IndexedDB annullata")); };
  });
}

function requestPromise(request){
  return new Promise(function(resolve,reject){
    request.onsuccess = function(){ resolve(request.result); };
    request.onerror = function(){ reject(request.error || new Error("Richiesta IndexedDB fallita")); };
  });
}

})();