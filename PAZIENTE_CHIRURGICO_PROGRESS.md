# Paziente chirurgico - avanzamento spiegazioni

Ultimo aggiornamento: 14 settembre 2026

## Obiettivo

Portare tutte le **462 domande** di **Paziente chirurgico** al nuovo standard StudyHub: dopo la risposta devono essere spiegati sia il motivo per cui la soluzione corretta è giusta sia il motivo specifico per cui ciascuna delle altre tre alternative è sbagliata, senza modificare domanda, opzioni, risposta corretta, sezione o logica del quiz.

## Stato finale

- [x] Motore UI per spiegazioni per singola alternativa **integrato direttamente in `paziente-chirurgico.html`**.
- [x] Manifest delle spiegazioni completo (`data/paziente-chirurgico-explanations-manifest.json`).
- [x] **Diagnostica: 76/76** (`di1`-`di76`).
- [x] **Educazione terapeutica: 54/54** (`ed1`-`ed54`).
- [x] **Psicologia: 66/66** (`ps1`-`ps66`).
- [x] **Terapia: 266/266** (`te1`-`te266`).
- [x] **Totale: 462/462 spiegazioni avanzate complete**.
- [x] **Runtime integrato fix4 (14/09/2026):** verifica obbligatoria 462/462 prima dell'avvio, verifica delle quattro motivazioni per ogni domanda, cache-busting e protezione delle opzioni dipendenti dall'ordine.
- [x] Deploy GitHub Pages del fix4 completato con successo sul commit `b62f4a0a72dbac720768a1ad2727e1b6409fc14c`.

## File spiegazioni

Le spiegazioni sono distribuite nei file:

- `data/paziente-chirurgico-explanations-001.json` → `005.json`: Diagnostica `di1`-`di50`;
- `006.json` → `007.json`: Diagnostica `di51`-`di76`;
- `008.json` → `013.json`: Educazione terapeutica `ed1`-`ed54`;
- `014.json` → `020.json`: Psicologia `ps1`-`ps66`;
- `021.json` → `026.json`: Terapia `te1`-`te120`;
- `027.json`: Terapia `te121`-`te170`;
- `028.json`: Terapia `te171`-`te220`;
- `029.json`: Terapia `te221`-`te266`.

## Comportamento UI

Dopo la conferma della risposta, il quiz mostra:

1. esito corretto/errato;
2. risposta corretta dopo il rimescolamento A/B/C/D;
3. concetto chiave della domanda;
4. quattro riquadri, uno per ogni alternativa mostrata;
5. indicazione `CORRETTA` o `ERRATA`;
6. motivazione specifica per ciascuna alternativa.

Il motore associa le spiegazioni alle opzioni originali anche dopo il rimescolamento della posizione A/B/C/D.

### Correzione runtime definitiva del 14/09/2026

Il precedente approccio caricava `paziente-chirurgico-explanations.js` dopo il motore principale e sovrascriveva alcune funzioni a runtime. Questo meccanismo era fragile e poteva lasciare visibile il vecchio campo generico `why` in alcune condizioni di caricamento/cache.

La versione attiva **fix4** elimina quel punto fragile:

- il motore delle spiegazioni è incorporato direttamente in `paziente-chirurgico.html`;
- banca domande e spiegazioni vengono caricate e verificate nello stesso `boot()`;
- il pulsante **Inizia / Ricomincia resta disabilitato** finché la verifica non è conclusa;
- devono essere presenti **esattamente 462/462 spiegazioni**;
- per ognuna delle 462 domande devono essere presenti le **quattro motivazioni specifiche**, una per ogni opzione;
- se manca un file, una domanda o una motivazione, il quiz non parte e mostra `Spiegazioni: ERRORE` invece di usare il vecchio `why`;
- quando tutto è valido compare visibilmente `Spiegazioni: 462/462 ✓`;
- i JSON vengono caricati con parametro di versione e `cache: no-store`;
- la homepage apre l'esame con `paziente-chirurgico.html?v=20260914-fix4` per evitare che il browser riusi la vecchia pagina;
- le domande con alternative semanticamente dipendenti dalla posizione conservano l'ordine originale (`Tutte le precedenti`, `Nessuna delle precedenti`, `Tutte vere`, `Tutte corrette` e formulazioni equivalenti);
- le normali domande continuano a usare il rimescolamento A/B/C/D bilanciato.

`paziente-chirurgico-explanations.js` può restare nel repository come file storico, ma **non viene più caricato dalla pagina attiva** e non deve essere considerato il motore corrente.

## Integrità della banca

Durante questo lavoro sono rimasti invariati:

- testo delle 462 domande;
- quattro alternative;
- indice della risposta corretta registrata nella banca;
- ID delle domande;
- sezioni e conteggi;
- logica mix/focus;
- sessioni 20/30/50/100/tutte;
- bilanciamento A/B/C/D, fatta eccezione per le domande che richiedono ordine bloccato per conservarne il significato;
- punteggio, accuratezza, progressi e ripasso errori;
- `localStorage`.

## Controllo qualità scientifico

Durante la spiegazione sono stati rilevati alcuni quesiti della banca che presentano formulazioni discordanti con gli stessi materiali forniti, informazioni storiche o affermazioni che richiedono una revisione clinico-scientifica separata. **Non sono stati corretti automaticamente**, in rispetto della regola di integrità della banca.

Nei relativi riquadri compare `ATTENZIONE QA` per rendere trasparente il problema. Tra i punti segnalati figurano, a titolo esemplificativo:

- `te5`: seconda intenzione e soluzione registrata discordante con granulazione/riepitelizzazione;
- `te62`: morfina nella pancreatite, formulazione storica;
- `te103`: definizione di reazione avversa troppo ampia rispetto agli stessi appunti;
- `te110`: formulazione ambigua sulla gestione della prescrizione terapeutica;
- `te118`: sovrapposizione tra colangiografia radiologica e colangio-RM;
- `te137`: pacemaker presentato come controindicazione generale alla RM senza distinguere dispositivi MR-conditional;
- `te168`: ossigenoterapia nella TEP considerata inadeguata soltanto se intesa come risposta esclusiva;
- `te172`: warming associato al risveglio dall'anestesia;
- `te175`: protossido di azoto indicato come gas anestetico più comune;
- `te203`: schema antiallergico storico contenente ranitidina/Zantac;
- `te206`, `te209`, `te215`, `te228`: indicazioni assistenziali o protocollari da ricontrollare rispetto a standard aggiornati;
- `te212`: opzione internamente eterogenea sulle vie enterali;
- `te223`: `CVP` registrato come dispositivo tunnellizzato, incongruenza evidente con la classificazione degli accessi vascolari.

Questi punti devono essere affrontati in un **task QA dedicato**, perché correggerli significa modificare domanda/opzioni/soluzione e non soltanto la spiegazione.

## Fonti usate

Priorità ai PDF forniti dall'utente per Paziente chirurgico, tra cui materiale su:

- assistenza infermieristica perioperatoria;
- diagnostica per immagini e mezzi di contrasto;
- terapia e responsabilità infermieristica;
- educazione terapeutica;
- psicologia del paziente chirurgico;
- accessi vascolari, nutrizione, ferite e complicanze postoperatorie;
- banche/esercitazioni d'esame fornite.

## Punto di ripresa

**Nessuna spiegazione rimanente. Paziente chirurgico è completo 462/462 per il task “spiegazioni corrette + alternative errate”.**

Il prossimo eventuale lavoro su questo esame deve partire da uno dei seguenti filoni:

1. QA dei quesiti segnalati `ATTENZIONE QA`;
2. test funzionale/browser della versione pubblicata;
3. revisione scientifica della banca con autorizzazione esplicita a modificare risposte o quesiti.
