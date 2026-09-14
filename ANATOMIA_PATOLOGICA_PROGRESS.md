# Anatomia Patologica - stato operativo spiegazioni avanzate

Ultimo aggiornamento: 15 settembre 2026

## Stato corrente

L'esame **Anatomia Patologica** contiene **300 domande** in quattro sezioni:

- Microbiologia: 100
- Eziologia: 50
- Immunologia: 50
- Anatomia Patologica: 100

La banca originale resta invariata. Il lavoro consiste esclusivamente nell'aggiunta di spiegazioni avanzate esterne alla banca.

## Standard delle spiegazioni

Per ogni domanda:

1. concetto chiave sintetico e utile allo studio;
2. spiegazione del perché la risposta corretta è corretta;
3. spiegazione specifica del perché ciascuna delle altre tre opzioni è errata;
4. motivazioni memorizzate nell'ordine originale delle quattro opzioni, così da seguire correttamente il rimescolamento A/B/C/D.

## Fonti e metodo

### Materiale universitario fornito dall'utente — fonte primaria

- `Microbiologia.pdf`
- `Microbiologia compendio.pdf`
- `PATOLOGIA GENERALE definitivo.pdf`
- `Eziologia generale STAMPATO.pdf`
- `Immunologia STAMPATO.pdf`
- `ANATOMIA PATOLOGICA.pdf`
- `Domande anatomia patologica.pdf` come ulteriore riferimento per terminologia e impostazione didattica.

Le spiegazioni conservano terminologia, organizzazione e impostazione del corso quando scientificamente sostenibili.

### Verifica scientifica esterna

Quando un punto richiede verifica, aggiornamento o disambiguazione vengono consultate fonti autorevoli, tra cui PubMed/PMC, NCBI/NIH, CDC, WHO, fonti normative ufficiali e linee guida pertinenti. Le fonti esterne servono a verificare o precisare il contenuto e non autorizzano modifiche silenziose della banca.

Se una risposta della banca risultasse probabilmente errata, ambigua o obsoleta, va registrata come **QA separato** e non modificata senza autorizzazione esplicita.

## Architettura fail-safe

File attivi:

- `anatomia-patologica.html` — motore originale dell'esame e caricamento delle 12 banche JSON;
- `anatomia-patologica-explanations.js` — enhancer opzionale;
- `data/anatomia-patologica-explanations-001.json` — `m1–m40`;
- `data/anatomia-patologica-explanations-002.json` — `m41–m80`;
- `data/anatomia-patologica-explanations-003.json` — `m81–m100` + `e1–e20`;
- `data/anatomia-patologica-explanations-004.json` — `e21–e50` + `i1–i10`;
- `data/anatomia-patologica-explanations-005.json` — `i11–i50`;
- `data/anatomia-patologica-explanations-006.json` — `a1–a40`;
- `data/anatomia-patologica-explanations-007.json` — `a41–a80`.

L'enhancer non modifica le domande, associa le motivazioni al testo originale delle opzioni e mantiene il feedback base `why` se i file avanzati non sono disponibili.

## Copertura — 280/300

### Blocco 001
- `m1–m40` — Microbiologia

### Blocco 002
- `m41–m80` — Microbiologia

### Blocco 003
- `m81–m100` — Microbiologia (20)
- `e1–e20` — Eziologia (20)
- **Microbiologia completa 100/100**

### Blocco 004
- `e21–e50` — Eziologia (30)
- `i1–i10` — Immunologia (10)
- **Eziologia completa 50/50**

### Blocco 005
- `i11–i50` — Immunologia (40)
- **Immunologia completa 50/50**

### Blocco 006
- `a1–a40` — Anatomia Patologica (40)
- File: `data/anatomia-patologica-explanations-006.json`

### Blocco 007
- `a41–a80` — Anatomia Patologica (40)
- File: `data/anatomia-patologica-explanations-007.json`
- Anatomia Patologica: **80/100**
- Copertura totale: **280/300**

Argomenti principali verificati nel blocco 007:

- finalità scientifiche dell'autopsia, patomorfosi, richiesta di riscontro diagnostico e gestione di reperti di possibile interesse giudiziario;
- tanatologia;
- vantaggi e limiti della citologia rispetto all'istologia;
- citologia esfoliativa, agoaspirativa, respiratoria e dei versamenti;
- citologia urinaria: seconda minzione, campioni ripetuti, contaminazione e artefatti da terapia o strumentazione;
- espettorato, broncoaspirato, broncolavaggio e brushing;
- classificazione didattica del washing e del Pap test come citologia abrasiva;
- aggiornamento dello screening cervicale con centralità dell'HPV test nei programmi moderni;
- rapporto nucleo/citoplasma, atipie nucleari e fondo necrotico;
- biopsia incisionale, escissionale, agobiopsia/core biopsy e biopsia stereotassica;
- biopsie endoscopiche e polmonari transparietali;
- esame intraoperatorio al congelatore e invio a fresco del materiale.

## QA e precisazioni scientifiche dei blocchi 001–007

Nessun quesito `m1–m100`, `e1–e50`, `i1–i50` o `a1–a80` è stato modificato. Le risposte corrette della banca sono rimaste invariate.

Precisazioni già registrate:

- corretta denominazione **via lectinica del complemento** con **mannose-binding lectin (MBL)**;
- cellule dendritiche come APC più efficienti nell'attivazione dei T vergini, evitando l'assoluto “uniche APC costimolatorie”;
- MHC I espresso sulla grande maggioranza delle cellule nucleate;
- citotossicità perforina/granzimi descritta principalmente come induzione di apoptosi;
- formalina al 10% precisata come formalina neutra tamponata con circa il 4% di formaldeide;
- ritardo alla fissazione trattato come variabile pre-analitica rilevante;
- Rosso Congo associato all'amiloide e alla birifrangenza verde mela;
- Ki-67 descritto come marcatore nucleare della frazione proliferante con significato dipendente dal contesto;
- `a39–a40` verificati sulla normativa ufficiale italiana, D.P.R. 285/1990, artt. 8–9.

Precisazioni del blocco 007:

- `a54–a55`: seconda minzione e tre campioni consecutivi sono mantenuti come **protocollo del corso**; il principio di evitare campioni cellularmente degenerati e di aumentare la resa con campionamenti ripetuti è coerente con la pratica citologica, mentre numero e tempistica esatti possono variare tra laboratori;
- `a64–a65`: la classificazione di washing e Pap test come “citologia abrasiva” è mantenuta perché esplicitamente adottata negli appunti; altri testi possono usare tassonomie differenti;
- `a67`: è stata aggiornata la spiegazione in accordo con WHO, che indica l'HPV DNA test come metodo primario preferito in molti programmi moderni di screening cervicale;
- `a70`: il fondo necrotico è descritto come reperto suggestivo in alcuni contesti ma non specifico da solo per malignità;
- `a75`: “agobiopsia a cielo coperto” è mantenuta come terminologia didattica del corso per campionamento di patologie diffuse, segnalando che l'uso moderno dipende dal distretto e dalla guida di imaging;
- `a79–a80`: l'esame al congelatore è spiegato come consulenza intraoperatoria utile solo per quesiti selezionati, con limiti da campionamento e artefatti; il campione deve arrivare a fresco e senza fissativo.

Le verifiche del blocco 007 hanno utilizzato `ANATOMIA PATOLOGICA.pdf` e `Domande anatomia patologica.pdf` come base primaria, WHO per lo screening cervicale e letteratura PubMed per citologia urinaria e frozen section.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in blocchi da 40 domande; il residuo finale può essere inferiore a 40.

## Punto di ripresa

Resta l'ultimo blocco:

- `a81–a100` → **Anatomia Patologica** (20 domande)

Copertura attesa al termine: **300/300 COMPLETA**.
