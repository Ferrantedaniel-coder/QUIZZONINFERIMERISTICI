# Paziente chirurgico - stato operativo

Ultimo aggiornamento: 14 settembre 2026

## Stato corrente

L'esame **Paziente chirurgico** contiene **462 domande**:

- Diagnostica: 76
- Educazione terapeutica: 54
- Psicologia: 66
- Terapia: 266

La priorità attuale è la **fruibilità stabile dell'esame**.

## Hotfix stabilità 14/09/2026

Dopo regressioni introdotte dal caricamento delle spiegazioni avanzate, il runtime è stato semplificato.

La pagina attiva `paziente-chirurgico.html` ora:

- carica soltanto i 13 file della banca domande;
- verifica che il totale sia esattamente **462**;
- verifica che ogni domanda abbia ID, 4 opzioni e indice corretto valido;
- abilita il quiz appena la banca è caricata correttamente;
- mantiene mix/focus per sezione;
- mantiene sessioni 20/30/50/100/tutte;
- mantiene ordine casuale o ordine banca;
- mantiene rimescolamento A/B/C/D bilanciato;
- preserva l'ordine per domande con alternative semanticamente vincolate, come “Tutte le precedenti”;
- mantiene punteggio, accuratezza, barra progresso, riepilogo, ripasso errori e `localStorage`;
- usa temporaneamente il campo base `why` già presente nella banca per il feedback dopo la risposta.

## Spiegazioni avanzate

Le spiegazioni avanzate costruite per **462/462** domande restano salvate nei file:

- `data/paziente-chirurgico-explanations-001.json` → `029.json`
- `data/paziente-chirurgico-explanations-manifest.json`
- `paziente-chirurgico-explanations.js`

**Questi file non sono attualmente caricati dal quiz.**

La funzione “perché la corretta è giusta + perché le tre errate sono sbagliate” è quindi **temporaneamente in pausa** fino a un successivo task dedicato, per evitare che comprometta l'eseguibilità dell'esame.

## Integrità della banca

Nel ripristino stabile non sono stati modificati:

- testo delle domande;
- quattro alternative;
- risposta corretta registrata;
- ID;
- sezioni;
- conteggi.

## QA già individuato

Restano da revisionare separatamente, solo con autorizzazione esplicita alla modifica della banca, alcuni quesiti precedentemente marcati come potenzialmente ambigui, datati o discordanti, tra cui `te5`, `te62`, `te103`, `te110`, `te118`, `te137`, `te168`, `te172`, `te175`, `te203`, `te206`, `te209`, `te212`, `te215`, `te223`, `te228`.

## Regola per il prossimo intervento

Non riattivare le spiegazioni avanzate direttamente sul runtime stabile senza prima provarle in modo isolato. La priorità resta: **l'esame deve essere sempre avviabile e completabile anche se il sistema avanzato delle spiegazioni è disattivato**.
