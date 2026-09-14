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

## Spiegazioni avanzate opzionali - 201/459

Copertura attiva:

- **Infermieristica nell'evoluzione storica: domande banca `1–121` = 121/121, COMPLETO**
- **Epidemiologia: domande banca `122–176` = 55/55, COMPLETO**
- **Igiene e medicina preventiva: domande banca `177–201` = 25 domande completate**
- **Copertura avanzata totale attiva: 201/459**

File dati:

- `data/scienze-salute-explanations-001.json` → domande `1–40`
- `data/scienze-salute-explanations-002.json` → domande `41–80`
- `data/scienze-salute-explanations-003.json` → domande `81–100`
- `data/scienze-salute-explanations-004.json` → domande `101–120`
- `data/scienze-salute-explanations-005.json` → domanda `121`
- `data/scienze-salute-explanations-006.json` → domande `122–161`
- `data/scienze-salute-explanations-007.json` → domande `162–201`

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

Le spiegazioni `1–201` sono state costruite utilizzando il contenuto e il framing già presenti nella banca, senza correggere o sostituire silenziosamente domande e soluzioni.

## Commit principali recenti

Epidemiologia primo blocco / pilot5:

- dati spiegazioni `122–161`: `f99aa5be397c8e704eb925f171cd0b8442311887`
- enhancer esteso a `161`: `98311a39ec7e54fa2956315789fb6062434fa7e8`
- wrapper/cache enhancer `pilot5`: `b5611664f4cb3cb2de1281d0ab07c359b5d39b0d`
- Home/cache-busting `pilot5`: `117c78552e685f3e2983a52fa8101288df74a262`

Chiusura Epidemiologia + avvio Igiene / pilot6:

- dati spiegazioni `162–201`: `836b65add002e4b4a17109f31b6906a6d32ec64c`
- enhancer esteso a `201`: `e59ce41189218667e48309dd9d2ee559f39f4a91`
- wrapper/cache enhancer `pilot6`: `19475ac6c49bba24243684dce0c3165eaf3485fc`
- Home/cache-busting `pilot6`: `3ec4d8cd4de56f254626565107b28a0409e7a865`

## Punto di ripresa

- **Infermieristica nell'evoluzione storica: completo 121/121**.
- **Epidemiologia: completo 55/55 (`122–176`)**.
- **Igiene e medicina preventiva: completate `177–201`**.

Prossimo blocco: **domanda 202**, ancora in **Igiene e medicina preventiva**, mantenendo blocchi controllati e lo stesso standard: spiegare perché la corretta è giusta e perché ciascuna delle altre tre è sbagliata.
