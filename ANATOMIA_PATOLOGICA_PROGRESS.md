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
4. motivazioni memorizzate nell'ordine originale delle quattro opzioni, così da poter seguire correttamente il rimescolamento A/B/C/D del quiz.

## Fonti e metodo

### Materiale universitario fornito dall'utente — fonte primaria

- `Microbiologia.pdf`
- `Microbiologia compendio.pdf`
- `PATOLOGIA GENERALE definitivo.pdf`
- `Eziologia generale STAMPATO.pdf`
- `Immunologia STAMPATO.pdf`
- `ANATOMIA PATOLOGICA.pdf`
- `Domande anatomia patologica.pdf`, usato come ulteriore riferimento per terminologia e impostazione delle domande storiche del corso.

Le spiegazioni conservano terminologia, organizzazione e impostazione del materiale del corso quando scientificamente sostenibili.

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
- `data/anatomia-patologica-explanations-006.json` — `a1–a40`.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente con logica fail-safe;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- se enhancer o JSON non sono disponibili lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 240/300

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
- Anatomia Patologica: **40/100**
- Copertura totale: **240/300**

Argomenti principali verificati nel blocco 006:

- ruolo dell'anatomopatologo e metodiche ancillari;
- istologia vs citologia;
- formalina neutra tamponata al 10%, fissazione e tempo di ischemia fredda;
- identificazione dei campioni e informazioni della richiesta;
- processazione istologica, inclusione in paraffina e sezioni di pochi micrometri;
- ematossilina-eosina, Perls, Rosso Congo e PAS;
- immunoistochimica, ibridazione in situ, microscopia elettronica e Ki-67;
- campionamento macroscopico, orientamento delle biopsie e artefatti;
- autopsia clinico-patologica e medico-legale;
- fenomeni cadaverici immediati, successivi e trasformativi;
- rigor mortis, ipostasi, autolisi, autodigestione e putrefazione;
- epicrisi ed esame interno autoptico;
- disciplina italiana del periodo di osservazione del cadavere.

### QA e precisazioni scientifiche dei blocchi 001–006

Nessun quesito `m1–m100`, `e1–e50`, `i1–i50` o `a1–a40` è stato modificato. Le risposte corrette della banca sono rimaste invariate.

Precisazioni già registrate nei blocchi precedenti:

- corretta denominazione **via lectinica del complemento** con **mannose-binding lectin (MBL)**;
- cellule dendritiche come APC più efficienti nell'attivazione dei T vergini, evitando l'assoluto “uniche APC costimolatorie”;
- MHC I espresso sulla grande maggioranza delle cellule nucleate;
- citotossicità perforina/granzimi descritta principalmente come induzione di apoptosi.

Precisazioni del blocco 006:

- la formalina al 10% è descritta in modo rigoroso come formalina neutra tamponata contenente circa il 4% di formaldeide;
- il tempo tra prelievo e fissazione è trattato come variabile pre-analitica rilevante perché può modificare morfologia, antigenicità e alcuni biomarcatori;
- il Rosso Congo è associato all'amiloide e alla classica birifrangenza verde mela in luce polarizzata, con la dovuta attenzione agli artefatti interpretativi;
- Ki-67 è descritto come marcatore nucleare della frazione proliferante, non come indicatore universale con identico significato prognostico in ogni tumore;
- per `a39–a40` è stata verificata direttamente la normativa ufficiale: **D.P.R. 10 settembre 1990, n. 285, artt. 8–9**, che stabilisce 24 ore come periodo ordinario e fino a 48 ore in caso di morte improvvisa o dubbio di morte apparente, salvo accertamento anticipato della morte secondo le modalità previste.

Il blocco 006 è stato verificato anche con letteratura PubMed sulla fase pre-analitica della fissazione e dell'immunoistochimica e con fonti ufficiali italiane per i quesiti normativi.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale complessivo della banca. L'ultimo blocco potrà contenere il residuo finale inferiore a 40.

## Punto di ripresa

Il prossimo blocco contiene **40 domande**:

- `a41–a80` → **Anatomia Patologica**

Copertura successiva attesa: **280/300**.

Dopo questo blocco resterà il residuo finale `a81–a100` (20 domande).