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

## Spiegazioni avanzate opzionali - 161/459

Copertura attiva:

- **Infermieristica nell'evoluzione storica: domande banca `1–121` = 121/121, COMPLETO**
- **Epidemiologia: domande banca `122–161` = 40 domande completate**
- **Copertura avanzata totale attiva: 161/459**

File dati:

- `data/scienze-salute-explanations-001.json` → domande `1–40`
- `data/scienze-salute-explanations-002.json` → domande `41–80`
- `data/scienze-salute-explanations-003.json` → domande `81–100`
- `data/scienze-salute-explanations-004.json` → domande `101–120`
- `data/scienze-salute-explanations-005.json` → domanda `121`
- `data/scienze-salute-explanations-006.json` → domande `122–161`

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

Le spiegazioni `1–161` sono state costruite utilizzando il contenuto e il framing già presenti nella banca, senza correggere o sostituire silenziosamente domande e soluzioni.

## Commit principali recenti

Chiusura primo macroargomento / pilot4:

- domanda `121`: `fa14048cdf2cce94636594f3d975235b521b5787`
- enhancer esteso a `121`: `fc77352b9f9a7b38fff8f0200bdad64fd9fa2efb`
- wrapper `pilot4`: `0a94fc10b09c97b9c52b74f89cf8ac2b3d863c1c`
- Home `pilot4`: `ead0192c5c6bbd682eb7657114505b134bcf7727`

Epidemiologia primo blocco / pilot5:

- dati spiegazioni `122–161`: `f99aa5be397c8e704eb925f171cd0b8442311887`
- enhancer esteso a `161`: `98311a39ec7e54fa2956315789fb6062434fa7e8`
- wrapper/cache enhancer `pilot5`: `b5611664f4cb3cb2de1281d0ab07c359b5d39b0d`
- Home/cache-busting `pilot5`: `117c78552e685f3e2983a52fa8101288df74a262`

## Punto di ripresa

Il macroargomento **Infermieristica nell'evoluzione storica è completo: 121/121**.

Il primo blocco di **Epidemiologia 122–161** è completo.

Prossimo blocco: **domanda 162**, mantenendo blocchi controllati e lo stesso standard: spiegare perché la corretta è giusta e perché ciascuna delle altre tre è sbagliata.
