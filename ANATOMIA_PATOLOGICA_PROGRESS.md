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
- `data/anatomia-patologica-explanations-003.json` — spiegazioni `m81–m100` + `e1–e20`.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- arricchisce il feedback soltanto dopo la correzione;
- in caso di errore dell'enhancer o dei JSON lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 120/300

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
- Copertura totale: **120/300**

Con il blocco 003 la sezione **Microbiologia è completa 100/100** per le spiegazioni avanzate.

Argomenti principali verificati nel blocco 003:

- beta-lattamasi, resistenza intrinseca e acquisita, batteriostatici;
- anaerobi facoltativi e obbligati, microaerofili;
- scissione binaria, trasformazione, trasduzione e coniugazione;
- NAG/NAM del peptidoglicano e membrana esterna dei Gram-negativi;
- `Plasmodium`, `Toxoplasma gondii`, miceti, lieviti e muffe;
- `Candida albicans`, `Aspergillus flavus`, aflatossine e micosi opportunistiche;
- definizione di eziologia e cause estrinseche;
- patologia traumatica: ecchimosi, escoriazione, danni viscerali, pneumotorace, fratture, distorsione e lussazione;
- danno termico e classificazione delle ustioni;
- colpo di calore e risposta al freddo;
- radiazioni corpuscolate ed elettromagnetiche, con particelle alfa.

### QA dei blocchi 001–003

Nessun quesito `m1–m100` o `e1–e20` è stato modificato. Nel controllo non sono emerse risposte corrette chiaramente incompatibili con il materiale universitario e con le fonti scientifiche autorevoli consultate.

Nel blocco 003 alcune formulazioni degli appunti sono state **precisate nelle spiegazioni senza alterare la banca**: ad esempio, nell'ipertermia l'alta umidità riduce l'efficacia dell'evaporazione del sudore; per le ustioni sono stati usati anche i termini moderni superficiale, partial-thickness e full-thickness. Questo mantiene la risposta della banca ma rende la spiegazione scientificamente più rigorosa.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale complessivo della banca. Quando un blocco attraversa il confine tra due sezioni, mantenere comunque la dimensione di 40 e registrare chiaramente gli intervalli.

## Punto di ripresa

Il prossimo blocco contiene **40 domande**:

- `e21–e50` → **Eziologia** (30 domande)
- `i1–i10` → **Immunologia** (10 domande)

Copertura successiva attesa al termine del blocco: **160/300**.
