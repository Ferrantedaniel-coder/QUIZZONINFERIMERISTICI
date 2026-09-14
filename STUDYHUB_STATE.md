# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **15 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria.

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

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Quando serve verifica, aggiornamento o disambiguazione utilizzare fonti autorevoli, incluse **PubMed/PMC, NCBI/NIH, WHO, CDC e linee guida pertinenti**. Le fonti esterne servono a verificare o precisare il contenuto, non autorizzano modifiche silenziose della banca.

## 5. Standard delle spiegazioni

Per **Scienze della Salute**, **Paziente chirurgico** e **Anatomia Patologica** lo standard è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta;
- mantenere le motivazioni agganciate al testo originale delle opzioni, così da seguirne correttamente lo shuffle A/B/C/D;
- mantenere un fallback fail-safe: un problema nelle spiegazioni avanzate non deve mai impedire avvio, svolgimento o completamento del quiz.

### Paziente chirurgico — COMPLETO 462/462

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
- `scienze-salute-app.html` è il motore originale con l'intera banca di 459 domande;
- `scienze-salute-explanations.js` è l'enhancer opzionale fail-safe;
- `data/scienze-salute-explanations-001.json` → `013.json` coprono `1–459`.

Copertura completa per ID banca:

- `1–121` Infermieristica nell'evoluzione storica;
- `122–176` Epidemiologia;
- `177–220` Igiene e medicina preventiva;
- `221–270` Storia della medicina;
- `271–320` Igiene e medicina preventiva;
- `321–370` Storia della medicina;
- `371–379` Infermieristica nell'evoluzione storica;
- `380–392` Storia della medicina;
- `393–394` Infermieristica nell'evoluzione storica;
- `395–399` Storia della medicina;
- `400–402` Infermieristica nell'evoluzione storica;
- `403–407` Storia della medicina;
- `408` Infermieristica nell'evoluzione storica;
- `409–447` Storia della medicina;
- `448–450` Infermieristica nell'evoluzione storica;
- `451–459` Storia della medicina;
- **totale 459/459**.

Checkpoint: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — IN CORSO 200/300

Il lavoro procede in **blocchi da 40 domande** seguendo l'ordine reale complessivo della banca.

Implementazione attiva:

- `anatomia-patologica.html` resta il motore originale e continua a caricare le 12 banche JSON;
- `anatomia-patologica-explanations.js` è un enhancer opzionale fail-safe;
- rilascio attivo: **`pilot5`**;
- `EXPECTED_ADVANCED=200`;
- file spiegazioni:
  - `data/anatomia-patologica-explanations-001.json` → `m1–m40`;
  - `data/anatomia-patologica-explanations-002.json` → `m41–m80`;
  - `data/anatomia-patologica-explanations-003.json` → `m81–m100` + `e1–e20`;
  - `data/anatomia-patologica-explanations-004.json` → `e21–e50` + `i1–i10`;
  - `data/anatomia-patologica-explanations-005.json` → `i11–i50`.

Copertura:

- Microbiologia `m1–m100` = **100/100 COMPLETA**;
- Eziologia `e1–e50` = **50/50 COMPLETA**;
- Immunologia `i1–i50` = **50/50 COMPLETA**;
- Anatomia Patologica = 0/100;
- **totale 200/300**.

Materiale universitario primario fornito dall'utente:

- `Microbiologia.pdf`;
- `Microbiologia compendio.pdf`;
- `PATOLOGIA GENERALE definitivo.pdf`;
- `Eziologia generale STAMPATO.pdf`;
- `Immunologia STAMPATO.pdf`;
- `ANATOMIA PATOLOGICA.pdf`.

Nel blocco 005 sono stati verificati in particolare: differenziazione B in plasmacellule/memoria, CD4/CD8, selezione clonale, neutrofili/eosinofili/mastociti, NK e missing-self, organi linfoidi, struttura e classi delle immunoglobuline, epitopi, MHC I/II, TAP, costimolazione, IL-2, TH1/TH2/TH17, perforine/granzimi, class switching, maturazione dell'affinità, complemento e ipersensibilità I–IV.

### Precisazioni scientifiche registrate

Nei quesiti coperti finora non sono state modificate domande, opzioni, risposte corrette, ID o topic. Non sono emerse risposte corrette da cambiare nel blocco `i11–i50`.

Dal confronto tra il materiale del corso e fonti autorevoli sono però state registrate queste precisazioni, applicate **solo nelle spiegazioni**:

- la corretta denominazione è **via lectinica del complemento**, con riconoscimento da parte di molecole come la **mannose-binding lectin (MBL)**; la dicitura “via leptinica/leptina” presente negli appunti non è scientificamente corretta;
- le cellule dendritiche sono le APC più efficaci per l'attivazione dei T vergini, ma non sono in senso assoluto le uniche APC capaci di esprimere molecole costimolatorie;
- MHC I viene descritto in modo rigoroso come espresso sulla grande maggioranza delle cellule nucleate;
- la citotossicità mediata da perforine/granzimi di NK e T CD8 viene descritta principalmente come induzione di apoptosi.

Le verifiche del blocco 005 hanno utilizzato anche fonti PubMed/NCBI su MHC, NK/missing-self, immunoglobuline, centri germinativi, class switching, maturazione dell'affinità, complemento e ipersensibilità.

**Punto di ripresa Anatomia Patologica:** prossimo blocco da 40 = `a1–a40` (**Anatomia Patologica**), con copertura attesa **240/300**.

Checkpoint dettagliato: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

## 6. Architettura corrente

File principali:

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` — wrapper Scienze;
- `scienze-salute-app.html` — motore originale Scienze;
- `scienze-salute-explanations.js` e `data/scienze-salute-explanations-001.json` → `013.json`;
- `SCIENZE_SALUTE_PROGRESS.md`;
- `anatomia-patologica.html`;
- `anatomia-patologica-explanations.js`;
- `data/anatomia-patologica-explanations-001.json` → `005.json`;
- `ANATOMIA_PATOLOGICA_PROGRESS.md`;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html`;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche e spiegazioni;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud.

## 7. Workflow obbligatorio

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi, ID, sezioni e risposta corretta;
7. verificare che le motivazioni seguano l'opzione originale dopo shuffle;
8. testare almeno avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. mantenere responsive/mobile;
10. aggiornare checkpoint e questo file quando cambia lo stato reale.

### Lavoro a blocchi

- Paziente chirurgico: **462/462** completo.
- Scienze della Salute: **459/459** completo.
- Anatomia Patologica: **200/300**, blocchi fissi da 40; prossimo `a1–a40`.

Per Anatomia Patologica restano 100 domande: `a1–a40`, `a41–a80`, poi residuo finale `a81–a100`.

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 9. Roadmap immediata

1. Paziente chirurgico: spiegazioni complete 462/462.
2. Scienze della Salute: spiegazioni complete 459/459.
3. Anatomia Patologica: spiegazioni avanzate **200/300**; proseguire con `a1–a40`.
4. Mantenere le banche originali inalterate salvo autorizzazione esplicita.
5. Gestire quesiti dubbi o obsoleti come QA separato.
6. Farmacologia resta una futura banca in preparazione.
