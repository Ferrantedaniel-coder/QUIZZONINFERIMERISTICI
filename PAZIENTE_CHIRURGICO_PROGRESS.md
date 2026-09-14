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

## Spiegazioni avanzate opzionali — 196/462 attive

Sono ora attive in modalità fail-safe per:

- **Diagnostica `di1–di76`: 76/76**;
- **Educazione terapeutica `ed1–ed54`: 54/54**;
- **Psicologia `ps1–ps66`: 66/66**.

Totale collegato al runtime: **196 spiegazioni avanzate opzionali**.

File opzionali caricati:

- `001.json` → `007.json`: Diagnostica `di1–di76`;
- `008.json` → `013.json`: Educazione terapeutica `ed1–ed54`;
- `014.json` → `020.json`: Psicologia `ps1–ps66`.

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

Per Terapia resta per ora il feedback base `why`.

## Integrità della banca

Non sono stati modificati testo delle domande, quattro alternative, soluzione registrata, ID, sezioni o conteggi.

## QA separato

Restano separati dal presente task i quesiti già segnalati come potenzialmente ambigui, datati o discordanti (`te5`, `te62`, `te103`, `te110`, `te118`, `te137`, `te168`, `te172`, `te175`, `te203`, `te206`, `te209`, `te212`, `te215`, `te223`, `te228`). Non sono stati modificati.

## Checkpoint

- Diagnostica completa: `di1–di76`.
- Educazione terapeutica completa: `ed1–ed54`.
- Psicologia completa: `ps1–ps66`.
- **Copertura avanzata opzionale totale: 196/462.**
- Commit runtime Psicologia: `ac2dd4b543af896b02457c4c8caee90bb5581e4d`.
- Commit Home/cache-busting: `2c0c5d9f5629f9ca3f692c8a1b6a88eb876c6093`.
- Punto di ripresa successivo: **Terapia `te1`**.