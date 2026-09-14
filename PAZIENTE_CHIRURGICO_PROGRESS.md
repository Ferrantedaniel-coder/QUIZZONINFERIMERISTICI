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

## Spiegazioni avanzate opzionali — 462/462 attive

Sono ora attive in modalità fail-safe per l'intera banca:

- **Diagnostica `di1–di76`: 76/76**;
- **Educazione terapeutica `ed1–ed54`: 54/54**;
- **Psicologia `ps1–ps66`: 66/66**;
- **Terapia `te1–te266`: 266/266**.

Totale collegato al runtime: **462 spiegazioni avanzate opzionali**.

File opzionali caricati:

- `001.json` → `007.json`: Diagnostica `di1–di76`;
- `008.json` → `013.json`: Educazione terapeutica `ed1–ed54`;
- `014.json` → `020.json`: Psicologia `ps1–ps66`;
- `021.json` → `029.json`: Terapia `te1–te266`.

### Architettura fail-safe

Le spiegazioni vengono caricate **solo dopo che la banca principale è valida e il pulsante Inizia è già stato abilitato**.

Il caricamento usa `Promise.allSettled`: il fallimento di uno o più file non genera un errore fatale del quiz. Ogni entry viene accettata soltanto se:

- l'ID corrisponde a una domanda reale;
- esiste un `summary` non vuoto;
- esiste una motivazione valida per ciascuna delle quattro opzioni originali.

Il runtime supporta entrambi i formati presenti nell'archivio:

- mappa `entry.options[opzione]`;
- array `entry.reasons[]` indicizzato sull'ordine originale della banca.

Per `reasons[]`, dopo lo shuffle la motivazione viene ricondotta all'indice dell'opzione originale in `q.options`; in questo modo resta associata semanticamente alla stessa risposta anche se cambia lettera A/B/C/D.

Se una spiegazione manca o non supera la validazione, la singola domanda usa automaticamente il campo base `why`.

**Nessun problema delle spiegazioni avanzate può bloccare l'esame.**

### Feedback avanzato

Quando l'entry è valida, dopo la conferma vengono mostrati:

1. esito corretto/errato;
2. risposta corretta nella posizione A/B/C/D realmente mostrata;
3. concetto chiave;
4. quattro motivazioni separate;
5. etichetta `CORRETTA` o `ERRATA` per ogni alternativa.

## Integrità della banca

Non sono stati modificati testo delle domande, quattro alternative, soluzione registrata, ID, sezioni o conteggi.

## QA separato

Restano separati dal presente task i quesiti già segnalati come potenzialmente ambigui, datati o discordanti (`te5`, `te62`, `te64`, `te84`, `te86`, `te99`, `te103`, `te110`, `te118`, `te124`, `te130`, `te137`, `te155–te162`, `te168`, `te172`, `te175`, `te203`, `te206`, `te209`, `te212`, `te215`, `te223`, `te228`, `te248`, `te255`). Non sono stati modificati. Le relative spiegazioni possono contenere `ATTENZIONE QA`, senza alterare la soluzione memorizzata nella banca.

## Checkpoint finale spiegazioni

- Diagnostica completa: `di1–di76`.
- Educazione terapeutica completa: `ed1–ed54`.
- Psicologia completa: `ps1–ps66`.
- Terapia completa: `te1–te266`.
- **Copertura avanzata opzionale totale: 462/462.**
- Commit runtime finale spiegazioni: `c58fcf3240c6b0ca602b6945856b29d83e5f7661`.
- Commit Home/cache-busting pilot9: `ec70334c915cb0a72e8e4979b34f43230f0e9893`.
- Prossimo lavoro contenutistico previsto: **Scienze della Salute**, mantenendo Paziente chirurgico stabile; eventuale QA della banca resta un task separato e richiede autorizzazione esplicita.