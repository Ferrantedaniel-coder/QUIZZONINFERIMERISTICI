# Anatomia Patologica - stato operativo spiegazioni avanzate

Ultimo aggiornamento: 14 settembre 2026

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

Le spiegazioni conservano, quando scientificamente sostenibile, terminologia, organizzazione e impostazione del materiale del corso.

### Verifica scientifica esterna

Quando un punto richiede verifica, aggiornamento o disambiguazione, vengono consultate fonti autorevoli, tra cui PubMed/PMC, NCBI/NIH, CDC, WHO e standard o linee guida pertinenti. Le fonti esterne servono a verificare o precisare il contenuto e non autorizzano modifiche silenziose della banca.

Se una risposta della banca risultasse probabilmente errata, ambigua o obsoleta, va registrata come **QA separato** e non modificata senza autorizzazione esplicita.

## Architettura fail-safe

File attivi:

- `anatomia-patologica.html` — motore originale dell'esame e caricamento delle 12 banche JSON;
- `anatomia-patologica-explanations.js` — enhancer opzionale;
- `data/anatomia-patologica-explanations-001.json` — spiegazioni `m1–m40`;
- `data/anatomia-patologica-explanations-002.json` — spiegazioni `m41–m80`;
- `data/anatomia-patologica-explanations-003.json` — spiegazioni `m81–m100` + `e1–e20`;
- `data/anatomia-patologica-explanations-004.json` — spiegazioni `e21–e50` + `i1–i10`.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- arricchisce il feedback soltanto dopo la correzione;
- in caso di errore dell'enhancer o dei JSON lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 160/300

### Blocco 001

- IDs: `m1–m40`
- Sezione: **Microbiologia**
- File: `data/anatomia-patologica-explanations-001.json`

### Blocco 002

- IDs: `m41–m80`
- Sezione: **Microbiologia**
- File: `data/anatomia-patologica-explanations-002.json`

### Blocco 003

- IDs: `m81–m100` → **Microbiologia** (20 domande)
- IDs: `e1–e20` → **Eziologia** (20 domande)
- File: `data/anatomia-patologica-explanations-003.json`

Con il blocco 003 la sezione **Microbiologia è completa 100/100**.

### Blocco 004

- IDs: `e21–e50` → **Eziologia** (30 domande)
- IDs: `i1–i10` → **Immunologia** (10 domande)
- File: `data/anatomia-patologica-explanations-004.json`
- Copertura totale: **160/300**

Con il blocco 004 la sezione **Eziologia è completa 50/50** per le spiegazioni avanzate.

Argomenti principali verificati nel blocco 004:

- radiazioni ionizzanti, danno al DNA e radiolisi dell'acqua;
- radicali liberi, radicale ossidrile, perossidazione lipidica, stress ossidativo e sistemi antiossidanti;
- picnosi, carioressi e cariolisi;
- radiosensibilità delle cellule proliferanti;
- danno chimico, osmosi, denaturazione proteica e tossicologia;
- DL50, saturnismo e biotrasformazione di fase I/II;
- infiammazione acuta, istamina, prostaglandine, diapedesi, chemiotassi e neutrofili;
- essudato vs trasudato, pus, ascesso, empiema e infiammazione cronica;
- guarigione per seconda intenzione;
- immunosorveglianza;
- immunità innata vs adattativa;
- linfociti B/T, selezione ed espansione clonale;
- cute, lisozima, defensine, microbiota intestinale;
- opsonizzazione e fagosoma.

### QA dei blocchi 001–004

Nessun quesito `m1–m100`, `e1–e50` o `i1–i10` è stato modificato. Nel controllo non sono emerse risposte corrette chiaramente incompatibili con il materiale universitario e con le fonti scientifiche autorevoli consultate.

Nel blocco 004 alcuni concetti degli appunti sono stati precisati scientificamente nelle spiegazioni senza alterare la banca. In particolare:

- il danno indiretto da radiazioni è spiegato attraverso radiolisi dell'acqua e formazione di specie reattive;
- lo stress ossidativo è definito come squilibrio a favore degli ossidanti rispetto ai sistemi antiossidanti;
- l'essudato viene distinto dal trasudato sulla base di permeabilità vascolare, proteine e cellule;
- la guarigione per seconda intenzione viene descritta con maggiore tessuto di granulazione, contrazione e cicatrice;
- per l'immunità innata/adattativa sono stati mantenuti i concetti del corso ma con terminologia immunologica corrente.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale complessivo della banca. Quando un blocco attraversa il confine tra due sezioni, mantenere comunque la dimensione di 40 e registrare chiaramente gli intervalli.

## Punto di ripresa

Il prossimo blocco contiene **40 domande**:

- `i11–i50` → **Immunologia** (40 domande)

Copertura successiva attesa al termine del blocco: **200/300**.
