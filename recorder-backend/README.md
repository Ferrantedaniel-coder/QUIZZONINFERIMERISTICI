# StudyHub Recorder Backend

Backend separato dal frontend GitHub Pages. Riceve l'audio di una registrazione, genera la trascrizione e restituisce appunti strutturati.

## Privacy

- L'audio arriva al server solo dopo che l'utente avvia manualmente la trascrizione.
- Il file viene scritto in una directory temporanea esclusivamente per l'elaborazione.
- Il backend elimina il file temporaneo nel blocco `finally` sia in caso di successo sia in caso di errore.
- Il backend **non conserva una copia permanente dell'audio**, anche se il docente ha autorizzato la conservazione.
- Quando `retentionConsent=true`, l'eventuale audio conservato resta nella copia locale IndexedDB di StudyHub.
- Quando `retentionConsent=false`, il frontend elimina i chunk locali solo dopo una risposta di trascrizione riuscita.
- Trascrizione e testo degli appunti non vengono scritti nei log.

## Endpoint

### GET /health

Restituisce lo stato del servizio.

### POST /v1/transcribe

`multipart/form-data`:

- `audio`: file registrato;
- `metadata`: JSON StudyHub.

Risposta:

```json
{
  "transcript": "...",
  "summary": "...",
  "keyPoints": ["..."],
  "profExamples": ["..."],
  "examQuestions": ["..."]
}
```

## Modelli

Default:
- speech-to-text: `gpt-transcribe`;
- sintesi: `gpt-5.6-terra`.

Entrambi sono sovrascrivibili da variabili ambiente.

## Avvio locale

Richiede Node.js 24+.

```bash
npm install
OPENAI_API_KEY="..." npm start
```

Non inserire mai `OPENAI_API_KEY` in `registratore-config.js`, HTML o altri file pubblici.

## Variabili ambiente

Vedi `.env.example`.

## Collegamento al frontend

Dopo il deploy, impostare in `registratore-config.js`:

```js
apiEndpoint: "https://<backend>/v1/transcribe"
```

La chiave OpenAI resta esclusivamente sul server.

## Hosting

È adatto a un servizio Node persistente/containerizzato (per esempio Railway) perché le lezioni possono produrre upload audio molto più grandi delle comuni funzioni serverless.

Il limite applicativo predefinito è 180 MB ed è configurabile con `MAX_AUDIO_MB`.
