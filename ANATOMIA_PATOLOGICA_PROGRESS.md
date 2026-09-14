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
- `data/anatomia-patologica-explanations-001.json` — spiegazioni avanzate del primo blocco.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- arricchisce il feedback soltanto dopo la correzione;
- in caso di errore dell'enhancer o del JSON lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 40/300

### Blocco 001

- IDs: `m1–m40`
- Sezione: **Microbiologia**
- File: `data/anatomia-patologica-explanations-001.json`
- Copertura totale: **40/300**

Argomenti verificati nel blocco:

- infezioni endogene ed esogene;
- microbiota cutaneo e opportunismo;
- vaccini vivi attenuati, inattivati e split;
- selettività degli antibatterici e sulfamidici;
- ciclo replicativo e struttura dei virus;
- Orthomyxoviridae e diagnostica virologica diretta;
- procarioti/eucarioti e diagnostica microbiologica;
- patogenicità e MIC;
- LPS/Lipide A, plasmidi e variabilità genetica;
- peptidoglicano, capsula, saprofitismo ed endospore.

### QA del blocco 001

Nessun quesito `m1–m40` è stato modificato. Nel controllo preliminare non sono emerse risposte corrette chiaramente incompatibili con il materiale universitario e con le fonti scientifiche autorevoli consultate.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale della banca. L'ultimo blocco potrà contenere il residuo finale se inferiore a 40.

## Punto di ripresa

Il prossimo blocco è:

- **`m41–m80`**
- sezione: **Microbiologia**
- dimensione: **40 domande**
