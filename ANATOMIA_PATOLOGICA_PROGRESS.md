# Anatomia Patologica - stato operativo spiegazioni avanzate

Ultimo aggiornamento: 15 settembre 2026

## Stato corrente

L'esame **Anatomia Patologica** contiene **300 domande** in quattro sezioni:

- Microbiologia: 100
- Eziologia: 50
- Immunologia: 50
- Anatomia Patologica: 100

Le spiegazioni avanzate sono **COMPLETE 300/300**. La banca originale resta invariata: il lavoro ha aggiunto esclusivamente spiegazioni esterne.

## Standard delle spiegazioni

Per ogni domanda sono presenti:

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

Quando un punto ha richiesto verifica, aggiornamento o disambiguazione sono state consultate fonti autorevoli, tra cui PubMed/PMC, NCBI/NIH, CDC, WHO, UICC/NCI, fonti normative ufficiali e linee guida pertinenti. Le fonti esterne sono state usate per verificare o precisare il contenuto e non per modificare silenziosamente la banca.

Se in futuro emerge un quesito probabilmente errato, ambiguo o obsoleto, deve essere registrato come **QA separato** e modificato solo con autorizzazione esplicita.

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
- `data/anatomia-patologica-explanations-007.json` — `a41–a80`;
- `data/anatomia-patologica-explanations-008.json` — `a81–a100`.

L'enhancer non modifica le domande, associa le motivazioni al testo originale delle opzioni e mantiene il feedback base `why` se i file avanzati non sono disponibili. Il rilascio finale è **pilot8** con `EXPECTED_ADVANCED=300`.

## Copertura — 300/300 COMPLETA

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

### Blocco 007
- `a41–a80` — Anatomia Patologica (40)

### Blocco 008
- `a81–a100` — Anatomia Patologica (20)
- **Anatomia Patologica completa 100/100**

Copertura complessiva: **300/300 COMPLETA**.

## Argomenti principali del blocco 008

- criostato e frozen section;
- indicazioni, limiti, falso negativo e conferma istologica definitiva;
- carcinoma e sarcoma;
- identità delle metastasi rispetto al tumore primitivo;
- grading, differenziazione e parametri morfologici;
- staging e sistema TNM;
- significato di T, N e M;
- distinzione tra grading e staging;
- stadiazione patologica `pTNM`;
- specificità dei criteri TNM per sede e tipo tumorale;
- immunoistochimica come strumento per biomarcatori predittivi;
- integrazione di morfologia, immunofenotipo e diagnostica molecolare nell'oncologia moderna.

## QA e precisazioni scientifiche registrate

Nessun quesito `m1–m100`, `e1–e50`, `i1–i50` o `a1–a100` è stato modificato. Le risposte corrette della banca sono rimaste invariate.

Precisazioni già registrate nei blocchi precedenti:

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
- `a79–a80`: frozen section descritta come consulenza intraoperatoria per quesiti selezionati, con limiti di campionamento e artefatti; invio del tessuto a fresco senza fissativo.

Precisazioni del blocco 008:

- `a83–a85`: l'esame al congelatore è una valutazione preliminare e selettiva; il campionamento e gli artefatti possono produrre falsi negativi e il materiale viene successivamente processato per l'esame definitivo;
- `a89–a95`: **grading e staging non sono sinonimi**; il grading descrive caratteristiche morfologico-biologiche, mentre lo staging descrive soprattutto l'estensione anatomica della malattia;
- `a92–a94`: nel TNM, **T** descrive il tumore primitivo, **N** i linfonodi regionali e **M** la diffusione metastatica a distanza;
- `a97`: la classificazione patologica viene indicata con il prefisso **p**, come `pTNM`, secondo i criteri applicabili;
- `a98`: le definizioni delle categorie TNM non sono universali per tutte le neoplasie ma dipendono da sede e tipo tumorale;
- `a99–a100`: l'immunoistochimica e le metodiche molecolari possono identificare biomarcatori predittivi e sono parte integrante della moderna anatomia patologica di precisione.

Le verifiche del blocco 008 hanno utilizzato `ANATOMIA PATOLOGICA.pdf` e `Domande anatomia patologica.pdf` come base primaria, UICC/NCI per TNM e distinzione grado/stadio, e PubMed per frozen section e biomarcatori predittivi.

## Punto di ripresa

**Nessuno: Anatomia Patologica è completa 300/300.**
