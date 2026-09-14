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

## Spiegazioni avanzate opzionali - 121/459

È ora completato l'intero primo macroargomento:

- **Infermieristica nell'evoluzione storica: domande banca `1–121` = 121/121**
- **Copertura avanzata totale attiva: 121/459**

File dati:

- `data/scienze-salute-explanations-001.json` → domande `1–40`
- `data/scienze-salute-explanations-002.json` → domande `41–80`
- `data/scienze-salute-explanations-003.json` → domande `81–100`
- `data/scienze-salute-explanations-004.json` → domande `101–120`
- `data/scienze-salute-explanations-005.json` → domanda `121`

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

Le spiegazioni `1–121` sono state costruite utilizzando i contenuti e il framing già presenti nella banca dell'esame, senza correggere o sostituire silenziosamente il materiale con fonti esterne.

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

Pilot 3:

- Dati spiegazioni `81–100`: `52786cd1100130e3a20ac43ce55bb880c0a8a7b7`
- Dati spiegazioni `101–120`: `ae1156047703551b8fb3d362f7805e0edba0b6ae`
- Enhancer esteso a `120`: `469f50d4905d4139135a76fdd91eb935b53e0744`
- Fix escaping enhancer: `6913e0f80297d163873c6e08b92ddba9a9e21e7c`
- Wrapper/cache enhancer `pilot3`: `ec31a9aed92937b2bf9a23abdd5f57a95ebc6abf`
- Home/cache-busting `pilot3`: `ab0f4a79b4cf09809c85919e486fa6f22792475d`

Pilot 4 / chiusura primo macroargomento:

- Spiegazione avanzata domanda `121`: `fa14048cdf2cce94636594f3d975235b521b5787`
- Enhancer esteso a `121`: `fc77352b9f9a7b38fff8f0200bdad64fd9fa2efb`
- Wrapper/cache enhancer `pilot4`: `0a94fc10b09c97b9c52b74f89cf8ac2b3d863c1c`
- Home/cache-busting `pilot4`: `ead0192c5c6bbd682eb7657114505b134bcf7727`

## Punto di ripresa

Il macroargomento **Infermieristica nell'evoluzione storica è completo: 121/121**.

Prossimo blocco: **domanda 122**, prima domanda di **Epidemiologia**, mantenendo la stessa architettura opzionale non bloccante e lo stesso standard: spiegare perché la corretta è giusta e perché ciascuna delle altre tre è sbagliata.
