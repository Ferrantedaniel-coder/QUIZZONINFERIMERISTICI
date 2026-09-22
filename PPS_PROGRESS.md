# PPS_PROGRESS.md

Ultimo aggiornamento: **22 settembre 2026**

## Stato V1

Nuovo esame: **Infermieristica per problemi prioritari di salute (PPS)**.

- banca quiz: **80/80 domande attive**;
- spiegazioni avanzate: **80/80**;
- sezioni quiz: **9**;
- lezioni interattive: **18/18 V1**;
- materiali PPS: **0/4 pubblicati · 4/4 catalogati**; i binari dei PDF caricati non sono ancora pubblicati nel repository;
- progressi quiz: `studyhub_pps_v1`;
- progressi lezioni: namespace generale `studyhub.lessons.progress.v1`.

## Sezioni

1. Infermieristica nella gestione dei problemi di salute cronici — 40 domande
2. Respiratorio / Pneumologia — 5
3. Cardiovascolare e Cardiochirurgia — 5
4. Ematologia — 5
5. Oncologia — 5
6. Neurologia — 5
7. Gastroenterologia — 5
8. Endocrinologia — 5
9. Malattie infettive — 5

Il titolo **Infermieristica nella gestione dei problemi di salute cronici** è presentato come testo ordinario, senza sottolineatura.

## Fonti V1

- `Compendio.pdf` → catalogato, percorso previsto `PPS_Compendio.pdf`;
- `PPS COMPLETA-convertito.pdf` → catalogato, percorso previsto `PPS_PPS_COMPLETA.pdf`;
- `Esame PPS 17 Luglio-convertito.pdf` → catalogato, percorso previsto `PPS_Esame_PPS_17_Luglio.pdf`;
- `Prova esame PPS.pdf` → catalogato, percorso previsto `PPS_Prova_esame_PPS.pdf`.

I contenuti dei quattro file sono stati usati per banca e lezioni. Finché i binari non vengono pubblicati nel repository, la Biblioteca li mostra come **CATALOGATI** con Apri/Scarica disabilitati e le Lezioni rimandano alla scheda Materiali PPS, evitando link 404.

## Criterio banca

La V1 usa soprattutto:
- la sezione **INFERMIERISTICA** di `PPS COMPLETA-convertito.pdf` per il blocco trasversale sulla cronicità;
- quesiti coerenti e direttamente supportati dalle prove d'esame e dal compendio per le otto aree cliniche.

Ogni domanda è portata allo standard StudyHub A/B/C/D. Le spiegazioni distinguono perché la corretta è corretta e perché ciascun distrattore non soddisfa il quesito.

## QA: incongruenze storiche non importate come verità definitive

`Prova esame PPS.pdf` contiene diverse correzioni/evidenziazioni che risultano internamente discordanti con altre formulazioni presenti nei materiali PPS. Per evitare correzioni silenziose, questi item restano fuori dalla V1 definitiva o sono usati solo quando la chiave è coerente tra le fonti.

Coda QA da riconciliare prima di un'eventuale V2:
- livello d'inizio degli alveoli;
- localizzazione del centro inspiratorio;
- item STEMI/ECG con risposta marcata non univoca;
- fibrillazione atriale e frequenza periferica “sempre >100 bpm”;
- leucemia linfatica cronica con chiavi storiche discordanti;
- anticoagulanti orali e antidoti;
- causa dell'embolia cerebrale;
- definizione generale di malattia endocrina;
- ipopituitarismo;
- incubazione dell'epatite B;
- Neisseria meningitidis;
- evoluzione dell'epatite cronica C.

Nessuno di questi conflitti viene “corretto” attribuendo al materiale una risposta che il materiale non supporta in modo univoco.

## Lezioni V1 — 18/18

- Infermieristica nella gestione dei problemi di salute cronici: 2
- Respiratorio / Pneumologia: 2
- Cardiovascolare e Cardiochirurgia: 2
- Ematologia: 2
- Oncologia: 2
- Neurologia: 2
- Gastroenterologia: 2
- Endocrinologia: 2
- Malattie infettive: 2

Schema di ogni lezione:
**spiegazione → concetti chiave → active recall → checkpoint → fonte → quiz PPS**.

## File PPS

- `pps.html`
- `data/pps-001.json`–`002.json`
- `data/pps-explanations-001.json`–`002.json`
- `data/materiali-pps.json`
- `materiali-pps-loader.js`
- `data/lezioni-pps.json` + 3 pacchetti lezioni
- `lezioni-pps-loader.js`
- catalogo dei quattro PDF PPS (binari ancora da pubblicare)
- `PPS_PROGRESS.md`

## Non regressione

Nessuna banca, risposta, spiegazione o progressione dei sei esami precedenti viene modificata dal pacchetto PPS, salvo l'aggiunta dei collegamenti PPS a Home, Materiali e Lezioni e l'aggiornamento dei contatori globali.
