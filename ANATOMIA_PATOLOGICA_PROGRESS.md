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

Le spiegazioni conservano terminologia, organizzazione e impostazione del materiale del corso quando scientificamente sostenibili.

### Verifica scientifica esterna

Quando un punto richiede verifica, aggiornamento o disambiguazione vengono consultate fonti autorevoli, tra cui PubMed/PMC, NCBI/NIH, CDC, WHO e linee guida pertinenti. Le fonti esterne servono a verificare o precisare il contenuto e non autorizzano modifiche silenziose della banca.

Se una risposta della banca risultasse probabilmente errata, ambigua o obsoleta, va registrata come **QA separato** e non modificata senza autorizzazione esplicita.

## Architettura fail-safe

File attivi:

- `anatomia-patologica.html` — motore originale dell'esame e caricamento delle 12 banche JSON;
- `anatomia-patologica-explanations.js` — enhancer opzionale;
- `data/anatomia-patologica-explanations-001.json` — `m1–m40`;
- `data/anatomia-patologica-explanations-002.json` — `m41–m80`;
- `data/anatomia-patologica-explanations-003.json` — `m81–m100` + `e1–e20`;
- `data/anatomia-patologica-explanations-004.json` — `e21–e50` + `i1–i10`;
- `data/anatomia-patologica-explanations-005.json` — `i11–i50`.

L'enhancer:

- non modifica i file delle domande;
- non cambia testo, opzioni, risposta corretta, ID o topic;
- attende il caricamento della banca originale di 300 quesiti;
- carica i dati esplicativi separatamente con logica fail-safe;
- associa ogni motivazione al testo dell'opzione originale, quindi la spiegazione segue lo shuffle A/B/C/D;
- se enhancer o JSON non sono disponibili lascia attivo il feedback base `why` e non impedisce lo svolgimento del quiz.

## Copertura — 200/300

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
- File: `data/anatomia-patologica-explanations-005.json`
- **Immunologia completa 50/50**
- Copertura totale: **200/300**

Argomenti principali verificati nel blocco 005:

- plasmacellule e cellule B memoria;
- CD4, CD8, selezione clonale e riconoscimento BCR/TCR;
- neutrofili, eosinofili, mastociti e basofili;
- NK, missing-self, perforine e granzimi;
- organi linfoidi primari e secondari, timo, linfonodo e milza;
- struttura delle immunoglobuline, epitopo e classi IgM/IgG/IgA/IgE;
- MHC I/MHC II, via citosolica, via endocitica e TAP;
- costimolazione e IL-2;
- risposte TH1, TH2 e TH17;
- citotossicità T CD8;
- class switching e maturazione dell'affinità;
- complemento, via classica e opsonizzazione;
- segnalazione autocrina delle citochine;
- ipersensibilità di tipo I, II, III e IV.

### QA e precisazioni scientifiche dei blocchi 001–005

Nessun quesito `m1–m100`, `e1–e50` o `i1–i50` è stato modificato. Le risposte corrette della banca sono rimaste invariate.

Nel confronto tra `Immunologia STAMPATO.pdf` e fonti immunologiche autorevoli sono emerse alcune formulazioni didattiche da precisare **nelle spiegazioni**, senza cambiare i quesiti:

- la corretta denominazione è **via lectinica del complemento**, attivata da molecole di riconoscimento come la **mannose-binding lectin (MBL)**; la dicitura degli appunti “via leptinica/leptina” non è scientificamente corretta;
- le cellule dendritiche sono le APC più efficaci nell'attivazione dei linfociti T vergini, ma non sono in senso assoluto le uniche cellule capaci di esprimere molecole costimolatorie; anche altre APC professionali possono esprimerle in condizioni appropriate;
- MHC I viene descritto nelle spiegazioni come espresso sulla grande maggioranza delle cellule nucleate, evitando formulazioni eccessivamente assolute;
- l'uccisione mediata da NK e T CD8 tramite perforine/granzimi è descritta principalmente come induzione di apoptosi.

Il blocco 005 è stato verificato anche con fonti PubMed/NCBI su MHC I/II, TAP, missing-self delle NK, centri germinativi, class switching, maturazione dell'affinità, complemento e ipersensibilità.

## Dimensione dei blocchi

Per garantire controllo e qualità, procedere in **blocchi da 40 domande** mantenendo l'ordine reale complessivo della banca. L'ultimo blocco potrà contenere il residuo finale inferiore a 40.

## Punto di ripresa

Il prossimo blocco contiene **40 domande**:

- `a1–a40` → **Anatomia Patologica**

Copertura successiva attesa: **240/300**.

Dopo questo blocco resteranno `a41–a80` e infine `a81–a100`.