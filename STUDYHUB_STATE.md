# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **14 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria; vecchi export o copie locali non vanno considerati automaticamente correnti.

La priorità generale è la **non regressione**: una modifica puntuale non autorizza a cambiare domande, opzioni, risposte corrette, grafica, progressi o logica non coinvolti dal task.

## 2. Stato corrente

StudyHub è una web app statica HTML/CSS/JavaScript con **4 esami attivi e 1.521 domande**:

| Esame | Domande | Sezioni |
|---|---:|---|
| Scienze della Salute | 459 | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| Anatomia Patologica | 300 | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| Infermieristica nel Materno | 300 | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| Paziente chirurgico | 462 | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |

Farmacologia è visibile in homepage come **in preparazione**.

## 3. Funzioni da preservare

- homepage unica;
- mix completo o focus sulla singola sezione;
- sessioni 20/30/50/100/tutte;
- ordine domande casuale o ordine banca quando previsto;
- rimescolamento A/B/C/D;
- distribuzione delle risposte corrette il più possibile bilanciata e non prevedibile quando si creano nuove banche;
- evitare lunghe serie della stessa lettera e pattern meccanici;
- evidenziazione della risposta corretta e dell'eventuale risposta errata scelta;
- feedback immediato;
- punteggio, risposte date, accuratezza e barra progresso;
- riepilogo finale;
- ripasso errori;
- reset progressi;
- progressi in `localStorage`;
- interfaccia responsive/mobile;
- ritorno semplice alla Home.

### Opzioni semanticamente vincolate

Domande con alternative come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”**, **“Tutte corrette”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Il principio `lockOrder` va preservato.

## 4. Integrità delle banche

Se il task riguarda UI, logica, spiegazioni o infrastruttura:

- non modificare il testo delle domande;
- non modificare le 4 opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Se emerge un quesito probabilmente errato, ambiguo, obsoleto o discordante, **non correggerlo di nascosto**: segnalarlo come QA e modificarlo solo con autorizzazione esplicita.

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente; quando serve verifica esterna usare fonti autorevoli, incluse PubMed/PMC, NCBI/NIH, WHO, CDC e linee guida pertinenti.

## 5. Spiegazioni: standard concordato e stato reale

Per **Scienze della Salute**, **Paziente chirurgico** e ora **Anatomia Patologica** lo standard è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta;
- usare il materiale universitario dell'utente come base primaria e verificare i punti scientifici con fonti autorevoli quando necessario.

### Paziente chirurgico — COMPLETO 462/462

`paziente-chirurgico.html` usa il runtime stabile e carica le banche verificando totale, ID, quattro opzioni e indice corretto. Le spiegazioni avanzate sono opzionali e vengono caricate in modalità fail-safe con `Promise.allSettled`; in caso di problema resta disponibile il campo base `why` e il quiz non viene bloccato.

Copertura:

- Diagnostica `di1–di76` = 76/76;
- Educazione terapeutica `ed1–ed54` = 54/54;
- Psicologia `ps1–ps66` = 66/66;
- Terapia `te1–te266` = 266/266;
- **totale 462/462**.

File: `data/paziente-chirurgico-explanations-001.json` → `029.json`.
Checkpoint: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute — COMPLETO 459/459

Implementazione attiva:

- `index.html` apre `scienze-salute.html`;
- `scienze-salute.html` carica `scienze-salute-app.html` in iframe;
- `scienze-salute-app.html` è il motore originale con l'intera banca di **459 domande** e non è stato modificato durante il lavoro sulle spiegazioni;
- `scienze-salute-explanations.js` è l'enhancer opzionale fail-safe.

File avanzati collegati:

- `001.json` → `1–40`
- `002.json` → `41–80`
- `003.json` → `81–100`
- `004.json` → `101–120`
- `005.json` → `121`
- `006.json` → `122–161`
- `007.json` → `162–201`
- `008.json` → `202–241`
- `009.json` → `242–281`
- `010.json` → `282–321`
- `011.json` → `322–361`
- `012.json` → `362–401`
- `013.json` → `402–459`

Percorsi completi: `data/scienze-salute-explanations-XXX.json`.

#### Copertura progressiva per ID banca

- `1–121` → Infermieristica nell'evoluzione storica;
- `122–176` → Epidemiologia;
- `177–220` → Igiene e medicina preventiva;
- `221–270` → Storia della medicina;
- `271–320` → Igiene e medicina preventiva;
- `321–370` → Storia della medicina;
- `371–379` → Infermieristica nell'evoluzione storica;
- `380–392` → Storia della medicina;
- `393–394` → Infermieristica nell'evoluzione storica;
- `395–399` → Storia della medicina;
- `400–402` → Infermieristica nell'evoluzione storica;
- `403–407` → Storia della medicina;
- `408` → Infermieristica nell'evoluzione storica;
- `409–447` → Storia della medicina;
- `448–450` → Infermieristica nell'evoluzione storica;
- `451–459` → Storia della medicina;
- **totale continuo coperto: `1–459` = 459/459**.

Checkpoint dettagliato: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — IN CORSO 40/300

Il lavoro sulle spiegazioni avanzate è iniziato in blocchi controllati da **40 domande**.

Implementazione attiva:

- `anatomia-patologica.html` resta il motore originale e continua a caricare le 12 banche JSON dell'esame;
- `anatomia-patologica-explanations.js` è un enhancer opzionale fail-safe;
- `data/anatomia-patologica-explanations-001.json` contiene le spiegazioni avanzate del primo blocco;
- il rilascio attivo è `pilot1`.

Copertura:

- `m1–m40` → Microbiologia;
- **totale coperto: 40/300**.

Il primo blocco è stato costruito usando come base primaria `Microbiologia.pdf` e `Microbiologia compendio.pdf`, con verifica esterna di punti selezionati mediante fonti autorevoli (PubMed/PMC, NCBI/NIH, CDC e letteratura microbiologica pertinente).

Nel blocco `m1–m40` non sono state modificate domande, opzioni, risposte corrette, ID o topic. Non sono emersi nel controllo preliminare quesiti con risposta corretta chiaramente incompatibile con il materiale universitario e con le fonti autorevoli consultate.

L'enhancer Anatomia Patologica:

- attende il caricamento della banca originale di 300 domande;
- carica i file di spiegazione separatamente;
- valida `summary` e quattro motivazioni;
- associa le motivazioni alle opzioni originali tramite il testo, mantenendole corrette dopo il rimescolamento A/B/C/D;
- arricchisce il feedback soltanto dopo la correzione;
- se enhancer o dati esplicativi non sono disponibili, mantiene il feedback base `why` senza bloccare il quiz.

**Punto di ripresa Anatomia Patologica: `m41–m80`, 40 domande di Microbiologia.**

Checkpoint dettagliato: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

## 6. Architettura corrente

File principali:

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` — wrapper attivo Scienze;
- `scienze-salute-app.html` — motore originale e banca inline 459 domande;
- `scienze-salute-explanations.js` — enhancer opzionale;
- `data/scienze-salute-explanations-001.json` → `013.json` — spiegazioni avanzate complete `1–459`;
- `SCIENZE_SALUTE_PROGRESS.md` — checkpoint specifico Scienze;
- `anatomia-patologica.html` — runtime Anatomia Patologica e caricamento banca 300 domande;
- `anatomia-patologica-explanations.js` — enhancer opzionale Anatomia Patologica;
- `data/anatomia-patologica-explanations-001.json` — spiegazioni avanzate `m1–m40`;
- `ANATOMIA_PATOLOGICA_PROGRESS.md` — checkpoint specifico Anatomia Patologica;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html` — runtime stabile + spiegazioni complete;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche domande e spiegazioni;
- `.nojekyll` — pubblicazione statica.

I progressi sono locali al browser; non ci sono account, database remoto o sync cloud.

## 7. Workflow obbligatorio per modifiche future

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi e sezioni dopo modifiche dati;
7. verificare associazione risposta corretta/opzioni dopo shuffle;
8. testare almeno avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. mantenere responsive/mobile;
10. aggiornare questo file quando cambia lo stato reale del progetto.

### Lavoro a blocchi

Per revisioni estese di banche o spiegazioni lavorare in **blocchi controllati da 40 domande** quando concordato, con checkpoint GitHub tra i blocchi.

- Paziente chirurgico: spiegazioni complete **462/462**.
- Scienze della Salute: spiegazioni complete **459/459**.
- Anatomia Patologica: spiegazioni avanzate **40/300**, completato `m1–m40`, prossimo `m41–m80`.

Per Anatomia Patologica mantenere la dimensione di 40 quesiti per blocco seguendo l'ordine reale della banca; l'ultimo blocco può contenere il residuo finale inferiore a 40.

### Continuità tra chat

Se la conversazione diventa molto lunga, prima dell'handoff salvare il lavoro nel `main` o in un checkpoint affidabile e registrare il punto esatto da cui riprendere.

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 9. Roadmap immediata

1. **Paziente chirurgico: spiegazioni avanzate complete 462/462 con architettura fail-safe.**
2. **Scienze della Salute: spiegazioni avanzate complete 459/459 con enhancer opzionale fail-safe.**
3. **Anatomia Patologica: spiegazioni avanzate 40/300; proseguire da `m41` in blocchi da 40.**
4. Mantenere le banche originali inalterate salvo autorizzazione esplicita.
5. Gestire eventuali quesiti dubbi o obsoleti come QA separato.

Farmacologia resta una futura banca in preparazione.
