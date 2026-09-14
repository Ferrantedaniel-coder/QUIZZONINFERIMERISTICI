# Scienze della Salute - stato operativo

Ultimo aggiornamento: 14 settembre 2026

## Stato corrente

L'esame **Scienze della Salute** contiene **459 domande** distribuite in quattro macroargomenti:

- Infermieristica nell'evoluzione storica
- Epidemiologia
- Igiene e medicina preventiva
- Storia della medicina

La priorità è mantenere il quiz esistente stabile mentre le spiegazioni vengono portate progressivamente allo standard avanzato.

## Implementazione attiva

La Home principale apre `scienze-salute.html`.

`scienze-salute.html` è il wrapper attivo e carica nello stesso dominio, tramite iframe, `scienze-salute-app.html`.

`scienze-salute-app.html` resta il motore originale dell'esame e contiene inline l'intera banca di **459 domande**. Durante il lavoro sulle spiegazioni avanzate questo file **non viene modificato**.

Restano quindi invariati il motore del quiz, la banca, le quattro opzioni, le risposte corrette, le modalità di sessione, il rimescolamento A/B/C/D, punteggio, navigazione, risultato, ripasso errori e `localStorage`.

## Spiegazioni avanzate opzionali - 80/459

Sono attivi due blocchi controllati:

- **Infermieristica nell'evoluzione storica: domande banca `1–40`**
- **Infermieristica nell'evoluzione storica: domande banca `41–80`**
- **Copertura avanzata attiva: 80/459**

File dati:

- `data/scienze-salute-explanations-001.json` → domande `1–40`
- `data/scienze-salute-explanations-002.json` → domande `41–80`

Ogni entry contiene:

- `summary`: concetto chiave;
- `reasons[4]`: una motivazione per ciascuna delle quattro opzioni nell'ordine originale della banca.

## Architettura fail-safe

Il file `scienze-salute-explanations.js` viene iniettato opzionalmente dal wrapper `scienze-salute.html` dopo il caricamento dell'app.

L'enhancer:

- non modifica `scienze-salute-app.html`;
- non partecipa al caricamento obbligatorio della banca;
- non modifica domande, opzioni o indice corretto;
- carica i JSON avanzati con `Promise.allSettled`;
- valida ogni entry rispetto alla domanda originale;
- associa le motivazioni alle opzioni tramite il testo dell'opzione originale, così la spiegazione segue correttamente l'alternativa anche dopo lo shuffle A/B/C/D;
- osserva il riquadro feedback con `MutationObserver` e lo arricchisce soltanto dopo che il motore originale ha già corretto la domanda;
- se enhancer, JSON o singola entry non sono disponibili, lascia intatto il feedback base `q.e` già prodotto dal quiz.

**Un problema delle spiegazioni avanzate non deve impedire avvio, svolgimento o completamento dell'esame.**

Quando l'entry avanzata è valida, il feedback mostra:

1. esito corretto/errato;
2. risposta corretta nella lettera A/B/C/D realmente mostrata;
3. concetto chiave;
4. quattro motivazioni separate;
5. etichetta `CORRETTA` o `ERRATA` per ogni alternativa.

## Integrità della banca

Non sono stati modificati:

- `scienze-salute-app.html`;
- testi delle 459 domande;
- alternative;
- risposte corrette;
- ID e macroargomenti.

Le spiegazioni `1–80` sono state costruite utilizzando i contenuti e il framing già presenti nella banca dell'esame, senza correggere o sostituire silenziosamente il materiale con fonti esterne.

## Commit principali

Pilot 1:

- Dati spiegazioni `1–40`: `8086e9134391808b777b54d7b01509cc339a848f`
- Enhancer opzionale iniziale: `6186fd956133ce86ea365efbeb403c345921dcfa`
- Wrapper iniziale: `60a28bd11f9beeaf33781b58a4f5363174b4b277`
- Home/cache-busting `pilot1`: `3b9a767222b3e2ca67f90b6c9bc99b1dd870c902`

Pilot 2:

- Dati spiegazioni `41–80`: `2c14b9f1770f1a1121c5f921e407c6375fb1c530`
- Enhancer esteso a `80`: `8fbd9598a32412eed65c996dd80219bf5b301e76`
- Wrapper/cache enhancer `pilot2`: `33eba477435a8632047d7ac1fb7aec169c243460`
- Home/cache-busting `pilot2`: `496857823ef7b66cffd178083837d96a9d15ed01`

## Punto di ripresa

Prossimo blocco: **domanda 81**, mantenendo blocchi controllati di circa 40 domande e la stessa architettura opzionale non bloccante.
