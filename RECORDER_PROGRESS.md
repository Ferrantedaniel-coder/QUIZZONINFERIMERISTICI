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
- metadati: materia, titolo, docente facoltativo, data/ora consenso, retention policy, durata, stato.

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

La UI e il client sono predisposti ma il backend AI sicuro **non è ancora collegato**.
`registratore-config.js` mantiene `apiEndpoint: ""` finché non esiste un endpoint server-side.

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

1. backend sicuro di upload temporaneo + speech-to-text;
2. generazione appunti secondo standard StudyHub;
3. retention server-side verificabile;
4. salvataggio degli appunti nella Biblioteca/Lezioni;
5. comando “Crea quiz da questa lezione”;
6. test browser/mobile su registrazioni lunghe.
