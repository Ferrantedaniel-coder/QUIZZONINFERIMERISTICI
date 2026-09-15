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

StudyHub è ora organizzato in tre aree principali:

1. **Esami** — simulazioni, spiegazioni, error review e progressi;
2. **Materiali** — sbobine, compendi e slide consultabili/scaricabili;
3. **Lezioni** — percorsi interattivi costruiti sui materiali originali con active recall, checkpoint e collegamento ai quiz.

Slogan correnti:

- Esami: **“Scegli l'esame. Poi distruggilo.”**
- Materiali: **“Meno cartelle. Più studio.”**
- Lezioni: **“Leggi meno. Ricorda di più.”**

### Materiali

La Biblioteca Materiali è attiva tramite `materiali.html`, `materiali.css`, `materiali.js` e `data/materiali.json`.

PDF attualmente collegati e disponibili:

- Anatomia Patologica: **6/6**;
- Paziente chirurgico: **4** PDF attivi più 2 materiali catalogati ma non ancora pubblicati;
- Infermieristica nel Materno: **6/6**;
- Scienze della Salute: area predisposta, nessun PDF ancora associato.

Checkpoint: `MATERIALI_PROGRESS.md`.

### Lezioni interattive

Il motore Lezioni è attivo tramite `lezioni.html`, `lezioni.css`, `lezioni.js` e `data/lezioni.json`.

Pilota attivo: **Anatomia Patologica**, con 3 lezioni:

1. Classificazione delle neoplasie;
2. Grading e staging;
3. Citologia diagnostica.

Funzioni attive:

- blocchi didattici sequenziali;
- concetti chiave;
- active recall;
- checkpoint A/B/C/D con risposta obbligatoria prima di proseguire;
- feedback immediato;
- conteggio checkpoint corretti;
- stato della lezione e avanzamento della materia;
- `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- salvataggio progressi in `localStorage` con chiave `studyhub.lessons.progress.v1`;
- collegamento al PDF originale;
- accesso Materiali → **Studia come lezione** per Anatomia Patologica;
- passaggio finale **Studia → Allenati sul quiz**.

Checkpoint: `LESSONS_PROGRESS.md`.

## 3. Funzioni da preservare

- homepage unica;
- accesso coerente alle tre aree Esami / Materiali / Lezioni;
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
- ritorno semplice alla Home;
- accesso ai PDF originali dalla Biblioteca;
- progressi Lezioni separati dai progressi dei quiz;
- un problema nell'area Lezioni o Materiali non deve impedire il funzionamento degli esami.

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

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Quando serve verifica, aggiornamento o disambiguazione usare fonti autorevoli, incluse **PubMed/PMC, NCBI/NIH, WHO, CDC, UICC/NCI, fonti normative ufficiali e linee guida pertinenti**. Le fonti esterne servono a verificare o precisare il contenuto, non autorizzano modifiche silenziose della banca.

Le lezioni interattive devono essere costruite sui materiali reali del corso. Non attribuire a slide o PDF contenuti non verificati. Il PDF originale deve rimanere accessibile come fonte primaria.

## 5. Standard delle spiegazioni

Per **Scienze della Salute**, **Paziente chirurgico** e **Anatomia Patologica** lo standard è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta;
- mantenere le motivazioni agganciate al testo originale delle opzioni, così da seguirne correttamente lo shuffle A/B/C/D;
- mantenere un fallback fail-safe: un problema nelle spiegazioni avanzate non deve impedire avvio, svolgimento o completamento del quiz.

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

Checkpoint: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — COMPLETO 300/300

Implementazione attiva:

- `anatomia-patologica.html` resta il motore originale e continua a caricare le 12 banche JSON;
- `anatomia-patologica-explanations.js` è un enhancer opzionale fail-safe;
- rilascio finale attivo: **`pilot8`**;
- `EXPECTED_ADVANCED=300`;
- file spiegazioni:
  - `data/anatomia-patologica-explanations-001.json` → `m1–m40`;
  - `data/anatomia-patologica-explanations-002.json` → `m41–m80`;
  - `data/anatomia-patologica-explanations-003.json` → `m81–m100` + `e1–e20`;
  - `data/anatomia-patologica-explanations-004.json` → `e21–e50` + `i1–i10`;
  - `data/anatomia-patologica-explanations-005.json` → `i11–i50`;
  - `data/anatomia-patologica-explanations-006.json` → `a1–a40`;
  - `data/anatomia-patologica-explanations-007.json` → `a41–a80`;
  - `data/anatomia-patologica-explanations-008.json` → `a81–a100`.

Copertura:

- Microbiologia `m1–m100` = **100/100 COMPLETA**;
- Eziologia `e1–e50` = **50/50 COMPLETA**;
- Immunologia `i1–i50` = **50/50 COMPLETA**;
- Anatomia Patologica `a1–a100` = **100/100 COMPLETA**;
- **totale 300/300 COMPLETA**.

Materiale universitario primario:

- `Microbiologia.pdf`;
- `Microbiologia compendio.pdf`;
- `PATOLOGIA GENERALE definitivo.pdf`;
- `Eziologia generale STAMPATO.pdf`;
- `Immunologia STAMPATO.pdf`;
- `ANATOMIA PATOLOGICA.pdf`;
- `Domande anatomia patologica.pdf` come riferimento didattico aggiuntivo.

Nel blocco finale `a81–a100` sono stati verificati: criostato, frozen section e suoi limiti; carcinoma/sarcoma; identità delle metastasi; grading e differenziazione; staging e TNM; T/N/M; distinzione grado/stadio; pTNM; specificità dei criteri TNM per sede; biomarcatori predittivi immunoistochimici; integrazione di morfologia, immunofenotipo e diagnostica molecolare.

### Precisazioni scientifiche registrate

Nelle spiegazioni avanzate sono state applicate precisazioni scientifiche senza modificare la banca originale. Tra le principali:

- corretta denominazione **via lectinica del complemento** con **mannose-binding lectin (MBL)**;
- cellule dendritiche come APC più efficienti nell'attivazione dei T vergini, evitando l'assoluto “uniche APC costimolatorie”;
- MHC I espresso sulla grande maggioranza delle cellule nucleate;
- citotossicità perforina/granzimi descritta principalmente come induzione di apoptosi;
- formalina al 10% precisata come formalina neutra tamponata con circa il 4% di formaldeide;
- ritardo alla fissazione trattato come variabile pre-analitica rilevante;
- Rosso Congo associato all'amiloide e alla birifrangenza verde mela;
- Ki-67 descritto come marcatore nucleare della frazione proliferante con significato dipendente dal contesto;
- `a39–a40` verificati sulla normativa ufficiale italiana, D.P.R. 285/1990, artt. 8–9;
- `a54–a55`: seconda minzione e tre campioni consecutivi mantenuti come **protocollo del corso**, precisando che numero e tempistica possono variare tra laboratori;
- `a64–a65`: washing e Pap test come “citologia abrasiva” mantenuti secondo la classificazione didattica degli appunti;
- `a67`: spiegazione aggiornata alle indicazioni WHO, con HPV DNA test come metodo primario preferito in molti programmi moderni di screening cervicale;
- `a70`: fondo necrotico considerato suggestivo in alcuni contesti ma non specifico da solo per malignità;
- `a75`: “agobiopsia a cielo coperto” mantenuta come terminologia del corso per patologie diffuse, con nota che l'uso moderno dipende dal distretto e dall'imaging;
- frozen section descritta come consulenza intraoperatoria per quesiti selezionati, soggetta a limiti di campionamento e artefatti e seguita dall'esame definitivo;
- **grading e staging sono distinti**: il grading riguarda caratteristiche morfologico-biologiche, lo staging soprattutto l'estensione anatomica;
- nel TNM: **T** = tumore primitivo, **N** = linfonodi regionali, **M** = metastasi a distanza; le categorie specifiche variano per sede/tipo di tumore;
- stadiazione patologica indicata con prefisso **p** (`pTNM`) secondo i criteri applicabili;
- immunoistochimica e diagnostica molecolare possono identificare biomarcatori predittivi utili alla scelta terapeutica.

Nessun quesito `m1–m100`, `e1–e50`, `i1–i50` o `a1–a100` è stato modificato durante il lavoro sulle spiegazioni. Domande, opzioni, risposte corrette, ID e topic sono rimasti invariati.

Checkpoint dettagliato: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

## 6. Architettura corrente

File principali:

- `index.html` — homepage e accesso Esami / Materiali / Lezioni;
- `studyhub.css` — stile condiviso;
- `materiali.html`, `materiali.css`, `materiali.js`, `data/materiali.json` — Biblioteca materiali;
- `MATERIALI_PROGRESS.md`;
- `lezioni.html`, `lezioni.css`, `lezioni.js`, `data/lezioni.json` — motore Lezioni;
- `LESSONS_PROGRESS.md`;
- `scienze-salute.html` — wrapper Scienze;
- `scienze-salute-app.html` — motore originale Scienze;
- `scienze-salute-explanations.js` e `data/scienze-salute-explanations-001.json` → `013.json`;
- `SCIENZE_SALUTE_PROGRESS.md`;
- `anatomia-patologica.html`;
- `anatomia-patologica-explanations.js`;
- `data/anatomia-patologica-explanations-001.json` → `008.json`;
- `ANATOMIA_PATOLOGICA_PROGRESS.md`;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html`;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche, spiegazioni, cataloghi Materiali e Lezioni;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud. I progressi dei quiz e quelli delle Lezioni usano namespace separati.

## 7. Workflow obbligatorio

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi, ID, sezioni e risposta corretta;
7. verificare che le motivazioni seguano l'opzione originale dopo shuffle;
8. per gli esami testare almeno avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. per le Lezioni testare almeno Home Lezioni → materia → blocchi → active recall → checkpoint → completamento → quiz/PDF → ritorno;
10. mantenere responsive/mobile;
11. aggiornare checkpoint e questo file quando cambia lo stato reale.

### Lavoro a blocchi

- Paziente chirurgico: **462/462** completo.
- Scienze della Salute: **459/459** completo.
- Anatomia Patologica: **300/300** completo.
- Lezioni Anatomia Patologica: **3 lezioni pilota attive**.

Non esiste più un punto di ripresa per le spiegazioni avanzate dei tre esami completi. Il lavoro incrementale corrente riguarda l'estensione delle Lezioni e il completamento delle spiegazioni Materno secondo `MATERNO_PROGRESS.md`.

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 9. Roadmap immediata

1. mantenere intatti i quattro esami esistenti e le relative banche;
2. completare le spiegazioni avanzate Materno secondo `MATERNO_PROGRESS.md`;
3. estendere il percorso Lezioni di Anatomia Patologica oltre le 3 lezioni pilota;
4. creare Lezioni per Infermieristica nel Materno utilizzando i PDF reali già pubblicati;
5. creare Lezioni per Paziente chirurgico utilizzando i PDF reali già pubblicati;
6. collegare progressivamente le lezioni alle sezioni/domande pertinenti dei quiz;
7. associare materiali reali a Scienze della Salute quando disponibili;
8. Farmacologia resta una futura banca in preparazione;
9. gestire quesiti dubbi o obsoleti come QA separato.
