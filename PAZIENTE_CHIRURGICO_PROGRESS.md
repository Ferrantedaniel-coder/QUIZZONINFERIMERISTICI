# Paziente chirurgico - stato operativo

Ultimo aggiornamento: 14 settembre 2026

## Stato corrente

L'esame **Paziente chirurgico** contiene **462 domande**:

- Diagnostica: 76
- Educazione terapeutica: 54
- Psicologia: 66
- Terapia: 266

La priorità resta la **fruibilità stabile dell'esame**.

## Runtime stabile

`paziente-chirurgico.html` continua a caricare i 13 file della banca domande e a verificare:

- totale esatto di 462 domande;
- ID presente;
- quattro opzioni per domanda;
- indice della risposta corretta valido.

Il quiz viene abilitato appena la banca è valida. Le spiegazioni avanzate **non partecipano al boot obbligatorio** e quindi non possono impedire l'avvio dell'esame.

Restano preservati mix/focus, 20/30/50/100/tutte, ordine casuale/banca, shuffle A/B/C/D, `lockOrder`, punteggio, accuratezza, barra progresso, precedente/successiva, risultato, breakdown, ripasso errori, reset, `localStorage` e Home.

## Spiegazioni avanzate opzionali — Diagnostica completa

Sono ora attive in modalità fail-safe per **tutta Diagnostica `di1–di76`**.

File opzionali caricati:

- `001.json` — `di1–di10`;
- `002.json` — `di11–di20`;
- `003.json` — `di21–di30`;
- `004.json` — `di31–di40`;
- `005.json` — `di41–di50`;
- `006.json` — `di51–di60`;
- `007.json` — `di61–di76`.

### Architettura fail-safe

Le spiegazioni vengono caricate **solo dopo che la banca principale è valida e il pulsante Inizia è già stato abilitato**.

Il caricamento usa `Promise.allSettled`: il fallimento di uno o più file non genera un errore fatale del quiz. Ogni entry viene accettata soltanto se:

- l'ID corrisponde a una domanda reale;
- esiste un `summary` non vuoto;
- esiste una motivazione valida per ciascuna delle quattro opzioni originali.

Il runtime supporta entrambi i formati già presenti nell'archivio delle spiegazioni:

- mappa testuale `entry.options[opzione]`;
- array `entry.reasons[]` indicizzato sull'ordine originale della banca.

Per il formato `reasons[]`, dopo lo shuffle la motivazione viene recuperata tramite l'indice dell'opzione nel vettore originale `q.options`, quindi resta associata semanticamente alla risposta corretta anche se cambia lettera A/B/C/D.

Se una spiegazione manca o non supera la validazione, la singola domanda usa automaticamente il campo base `why`.

**Nessun problema delle spiegazioni avanzate può bloccare l'esame.**

### Feedback avanzato

Per `di1–di76`, quando l'entry è valida, dopo la conferma vengono mostrati:

1. esito corretto/errato;
2. risposta corretta nella posizione A/B/C/D realmente mostrata;
3. concetto chiave;
4. quattro motivazioni separate;
5. etichetta `CORRETTA` o `ERRATA` per ogni alternativa.

Per Educazione terapeutica, Psicologia e Terapia resta per ora il feedback base `why`.

## Integrità della banca

Non sono stati modificati testo delle domande, quattro alternative, soluzione registrata, ID, sezioni o conteggi.

## QA separato

Restano separati dal presente task i quesiti già segnalati come potenzialmente ambigui, datati o discordanti (`te5`, `te62`, `te103`, `te110`, `te118`, `te137`, `te168`, `te172`, `te175`, `te203`, `te206`, `te209`, `te212`, `te215`, `te223`, `te228`). Non sono stati modificati.

## Checkpoint

- Pilot precedente: `di1–di40`.
- Blocco appena esteso: `di41–di76`.
- **Diagnostica totale con spiegazioni avanzate opzionali: 76/76.**
- Commit runtime: `22027093522eac6837da3c4f78e24c84eafb824c`.
- Commit Home/cache-busting: `cfe455e1fa9675ff2e5e60bd2b5c7ba09e7ad09e`.
- Punto di ripresa successivo: **Educazione terapeutica `ed1`**.