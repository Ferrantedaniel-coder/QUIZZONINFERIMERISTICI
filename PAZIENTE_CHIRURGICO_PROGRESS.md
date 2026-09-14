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

Restano preservati:

- mix completo / focus per sezione;
- sessioni 20/30/50/100/tutte;
- ordine casuale o banca;
- rimescolamento A/B/C/D bilanciato;
- `lockOrder` per opzioni semanticamente vincolate;
- punteggio, accuratezza e barra progresso;
- precedente/successiva;
- risultato finale e breakdown;
- ripasso errori;
- reset e `localStorage`;
- ritorno Home.

## Pilot spiegazioni avanzate — ATTIVO

È stato reintrodotto un primo blocco controllato di **40 domande**, esclusivamente:

- **Diagnostica `di1–di40`**.

File opzionali caricati:

- `data/paziente-chirurgico-explanations-001.json` — `di1–di10`;
- `data/paziente-chirurgico-explanations-002.json` — `di11–di20`;
- `data/paziente-chirurgico-explanations-003.json` — `di21–di30`;
- `data/paziente-chirurgico-explanations-004.json` — `di31–di40`.

### Architettura fail-safe del pilot

Le spiegazioni vengono caricate **solo dopo che la banca principale è stata caricata e il pulsante Inizia è stato abilitato**.

Il caricamento usa `Promise.allSettled`, quindi il fallimento di uno o più file non genera un errore fatale del quiz.

Ogni spiegazione avanzata viene accettata solo se:

- l'ID corrisponde a una domanda realmente presente;
- esiste un `summary`;
- le quattro opzioni della domanda sono univoche;
- esiste una motivazione non vuota per ciascuna delle quattro opzioni originali.

Se una spiegazione non è disponibile o non supera la validazione, quella domanda usa automaticamente il campo base `why` della banca.

**Il quiz non viene mai bloccato per un problema delle spiegazioni avanzate.**

### Feedback del pilot

Per `di1–di40`, quando il relativo dato avanzato è disponibile, dopo la conferma vengono mostrati:

1. esito corretto/errato;
2. risposta corretta nella posizione A/B/C/D effettivamente mostrata;
3. concetto chiave;
4. quattro motivazioni separate, una per ciascuna alternativa;
5. etichetta `CORRETTA` o `ERRATA` per ogni alternativa.

Le motivazioni sono recuperate tramite il testo dell'opzione originale, quindi continuano a seguire l'alternativa anche dopo il rimescolamento A/B/C/D.

Per tutte le altre domande (`di41–di76`, Educazione terapeutica, Psicologia, Terapia) resta per ora il feedback base `why`.

## Test eseguiti sul pilot

- sintassi JavaScript verificata con `node --check`: **PASS**;
- shuffle della risposta corretta su tutte le posizioni A/B/C/D: **PASS**;
- conservazione delle quattro alternative dopo shuffle: **PASS**;
- associazione alternativa → spiegazione dopo shuffle: **PASS**;
- `lockOrder` con “Tutte le precedenti”: **PASS**;
- disponibilità del fallback base in assenza di spiegazione avanzata: **PASS**;
- build e deploy GitHub Pages del pilot: **SUCCESS**.

Commit runtime pilot: `fbe309ea672312c50fad42e925c5ebfc03d17b52`.
Commit Home/cache-busting pilot: `1e729d9fc576a515a2f46134f69ae112d391f4ab`.

## Integrità della banca

Nel pilot non sono stati modificati:

- testo delle domande;
- quattro alternative;
- risposta corretta registrata;
- ID;
- sezioni;
- conteggi.

## QA già individuato

Restano separati dal presente task i quesiti precedentemente segnalati come potenzialmente ambigui, datati o discordanti (`te5`, `te62`, `te103`, `te110`, `te118`, `te137`, `te168`, `te172`, `te175`, `te203`, `te206`, `te209`, `te212`, `te215`, `te223`, `te228`). Non sono stati modificati.

## Punto di ripresa

**Pilot attivo e checkpoint salvato: `di1–di40`.**

Prima di estendere le spiegazioni avanzate al blocco successivo, verificare il comportamento reale del pilot pubblicato. Se confermato stabile, il prossimo blocco può partire da **`di41`** mantenendo la stessa architettura non bloccante.