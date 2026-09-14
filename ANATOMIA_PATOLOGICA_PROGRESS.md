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

Le spiegazioni devono conservare, quando scientificamente sostenibile, terminologia e impostazione del materiale del corso.

### Verifica scientifica esterna

Quando un punto richiede verifica, aggiornamento o disambiguazione, vengono consultate fonti autorevoli, tra cui PubMed/PMC, NCBI/NIH, CDC e standard o linee guida pertinenti. Le fonti esterne servono a verificare il contenuto e non autorizzano modifiche silenziose della banca.

Se una risposta della banca risultasse probabilmente errata, ambigua o obsoleta, va registrata come **QA separato** e non modificata senza autorizzazione esplicita.

## Architettura fail-safe

File attivi:

- `anatomia-patologica.html` — motore originale dell'esame e caricamento delle 12 banche JSON;
- `anatomia-patologica-explanations.js` — enhancer opzionale;
- `data/anatomia-patologica-explanations-001.json` — spiegazioni `m1–m40`;
- `data/anatomia-patologica-explanations-002.json` — spiegazioni `m41–m80`.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- arricchisce il feedback soltanto dopo la correzione;
- in caso di errore dell'enhancer o dei JSON lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 80/300

### Blocco 001

- IDs: `m1–m40`
- Sezione: **Microbiologia**
- File: `data/anatomia-patologica-explanations-001.json`

Argomenti principali: infezioni endogene/esogene, microbiota, vaccini, virologia, diagnostica, struttura batterica, MIC, LPS, plasmidi, capsula ed endospore.

### Blocco 002

- IDs: `m41–m80`
- Sezione: **Microbiologia**
- File: `data/anatomia-patologica-explanations-002.json`
- Copertura totale: **80/300**

Argomenti verificati nel blocco:

- ribosomi, citoplasma e metabolismo batterico;
- acidi teicoici e struttura Gram positiva;
- endospore e germinazione;
- criteri di valutazione degli antibatterici e farmacocinetica;
- meccanismi di antibiotico-resistenza;
- beta-lattamici/PBP, macrolidi, fluorochinoloni, rifampicina e aminoglicosidi;
- colorazione di Gram e Ziehl-Neelsen;
- acidi micolici e micobatteri;
- ciclo di `Chlamydia trachomatis`;
- agar, terreni di trasporto, selettivi e differenziali;
- beta-emolisi;
- raccolta di campioni per coltura, urinocoltura ed emocolture;
- diagnostica indiretta e sieroconversione.

### QA dei blocchi 001–002

Nessun quesito `m1–m80` è stato modificato. Nel controllo non sono emerse risposte corrette chiaramente incompatibili con il materiale universitario e con le fonti scientifiche autorevoli consultate.

Per il blocco 002 i punti più sensibili sono stati confrontati con letteratura PubMed/NCBI su meccanismi d'azione e resistenza agli antibiotici, Chlamydia e micobatteri e con indicazioni CDC sulla raccolta di più set di emocolture.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale complessivo della banca. Quando un blocco attraversa il confine tra due sezioni, mantenere comunque la dimensione di 40 e registrare chiaramente gli intervalli.

## Punto di ripresa

Il prossimo blocco contiene **40 domande**:

- `m81–m100` → **Microbiologia** (20 domande)
- `e1–e20` → **Eziologia** (20 domande)

Copertura successiva attesa al termine del blocco: **120/300**.
