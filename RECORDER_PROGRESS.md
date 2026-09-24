# STUDYHUB RECORDER — CHECKPOINT

Ultimo aggiornamento: **24 settembre 2026**

## Stato V1

Il Registratore lezioni è pubblicato come modulo beta integrato in StudyHub.

File attivi:
- `registratore.html`
- `registratore.css`
- `registratore.js`
- `registratore-config.js`

Accesso dalla homepage tramite **Registra / Apri registratore**.

## Funzioni operative

- registrazione microfono dal browser tramite MediaRecorder;
- consenso prima dell'attivazione del microfono;
- conferma obbligatoria dell'autorizzazione necessaria a registrare;
- consenso separato e opzionale alla conservazione dell'audio;
- la conservazione è **NON selezionata di default**;
- timer HH:MM:SS;
- pausa / riprendi / termina;
- acquisizione a blocchi da 5 secondi;
- salvataggio progressivo dei Blob in IndexedDB;
- recupero locale di sessioni interrotte;
- anteprima dell'audio registrato;
- cancellazione manuale dell'audio;
- archivio locale delle sessioni;
- metadati: descrizione libera di ciò che si sta registrando, titolo, docente facoltativo, data/ora consenso, retention policy, durata, stato.

## Regola privacy / retention

Sono distinti:
1. autorizzazione necessaria a registrare la lezione;
2. autorizzazione opzionale a conservare l'audio oltre la trascrizione.

Checkbox di conservazione:
**“Il docente autorizza la conservazione dell'audio oltre il tempo necessario alla trascrizione.”**

Default: **false**.

Se false:
- l'audio resta temporaneamente sul dispositivo finché la trascrizione non è completata;
- dopo una trascrizione completata con successo i chunk locali vengono eliminati automaticamente;
- restano trascrizione, riassunto e metadati.

Se true:
- dopo la trascrizione l'audio può restare associato alla lezione.

In caso di errore di trascrizione l'audio NON viene eliminato automaticamente, così è possibile riprovare.

## Backend AI

Il backend sicuro **è implementato nel repository** in `recorder-backend/`, ma non è ancora pubblicato su un hosting esterno.
`registratore-config.js` mantiene `apiEndpoint: ""` finché il servizio non riceve un URL HTTPS pubblico.

Backend V1:
- Node.js 24+ / Express;
- upload audio su file temporaneo, non in RAM;
- limite audio configurabile, default 180 MB;
- CORS limitato alle origini autorizzate;
- rate limit;
- endpoint `GET /health`;
- endpoint `POST /v1/transcribe`;
- speech-to-text con `gpt-transcribe`;
- appunti strutturati con `gpt-5.6-terra`;
- output: trascrizione, riassunto, concetti chiave, esempi del prof, possibili domande d'esame;
- nessun contenuto della lezione scritto nei log;
- file audio temporaneo server-side eliminato sempre in `finally`, sia in caso di successo sia in caso di errore.

Il consenso alla conservazione governa quindi la copia locale sul dispositivo. Il backend non conserva permanentemente l'audio neppure quando la conservazione è autorizzata.

Regola assoluta:
**mai inserire chiavi API o segreti nel repository/frontend pubblico.**

Contratto client previsto:
- POST multipart/form-data;
- campo `audio`;
- campo `metadata` JSON;
- metadata include `retentionConsent` e `retentionPolicy`;
- output atteso: `transcript`, `summary`, `keyPoints`, `profExamples`, `examQuestions`.

Il backend dovrà applicare la stessa retention policy anche alle copie temporanee server-side.

## Formato appunti previsto

Dopo trascrizione:
- riassunto discorsivo universitario;
- rimozione di ripetizioni/giri di parole;
- concetti chiave;
- esempi del docente;
- possibili domande d'esame;
- trascrizione completa;
- successiva integrazione prevista con Materiali/Lezioni/quiz.

## Non regressione

Il modulo Recorder è separato da:
- banche quiz;
- spiegazioni;
- progressi quiz;
- progressi Lezioni;
- Materiali.

Non modificare domande, risposte, shuffle, spiegazioni o motori esistenti per sviluppare il Recorder.

## Prossimi step

1. pubblicare `recorder-backend/` su hosting HTTPS e impostare `apiEndpoint`;
2. eseguire test end-to-end con una registrazione reale;
3. test browser/mobile su registrazioni lunghe;
4. integrare gli appunti generati nella Biblioteca/Lezioni;
5. comando “Crea quiz da questa lezione”.


## Input libero contenuto registrato

Il campo iniziale **“Cosa stai registrando?”** è un input testuale libero.
Non deve mostrare categorie, esami o materie predefinite e non deve imporre tassonomie fisse.
L'utente può descrivere liberamente il contenuto della registrazione.


## Health check backend

Il frontend non considera il backend “collegato” solo perché esiste un URL.
All'avvio esegue un controllo `GET /health` e abilita **Trascrivi e crea appunti** solo se il servizio risponde correttamente.
Stati UI: **BACKEND AI DA PUBBLICARE**, **CONTROLLO AI…**, **AI ONLINE**, **AI NON RAGGIUNGIBILE**.


## Fix riproduzione audio V3

Correzione del 24 settembre 2026:

- IndexedDB aggiornato da V1 a V2;
- nuovo store `recordings` per il master audio finale;
- i chunk da 5 secondi sono usati come recovery durante la registrazione;
- a registrazione terminata StudyHub crea un unico Blob master, lo salva e poi rimuove i chunk duplicati;
- anteprima e trascrizione usano il master audio;
- per registrazioni vecchie/interrotte resta un fallback che ricostruisce il master dai chunk;
- l'anteprima non tenta più autoplay dopo letture asincrone IndexedDB: mostra il player e lascia all'utente il comando Play;
- aggiunta diagnostica degli errori media/decodifica;
- in assenza di consenso alla conservazione, dopo trascrizione riuscita vengono eliminati sia master sia eventuali chunk.
