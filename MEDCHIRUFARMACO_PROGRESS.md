# MEDCHIRUFARMACO_PROGRESS.md

Ultimo aggiornamento: **16 settembre 2026**

## Stato generale

MedChiruFarmaco è il quinto esame di StudyHub e riunisce **Medicina Generale, Chirurgia Generale e Farmacologia**.

### Quiz — COMPLETO V1 65/65

- Medicina Generale: **25/25**;
- Chirurgia Generale: **25/25**;
- Farmacologia: **15/15**;
- totale: **65 domande**.

Fonte primaria della V1: prova AulaWeb del **27 gennaio 2015** con risposte ufficiali. Le dispense del corso sono usate per contestualizzare e spiegare i quesiti.

File banca:

- `data/medchirufarmaco-medicina.json`;
- `data/medchirufarmaco-chirurgia.json`;
- `data/medchirufarmaco-farmacologia.json`.

Pagina esame: `medchirufarmaco.html`.

Funzioni attive: mix completo o singola materia, 20/30/50/tutte, shuffle delle domande, bilanciamento A/B/C/D, `lockOrder` per alternative dipendenti dall'ordine, feedback immediato, punteggio, accuratezza, progressi locali e ripasso errori.

## Spiegazioni quiz — COMPLETE 65/65

Ogni quesito ha:

- concetto chiave;
- motivo per cui la risposta corretta è corretta;
- motivo per cui ciascuna delle altre tre alternative è errata.

File:

- `data/medchirufarmaco-medicina-explanations.json` — 25;
- `data/medchirufarmaco-chirurgia-explanations.json` — 25;
- `data/medchirufarmaco-farmacologia-explanations.json` — 15.

Le spiegazioni sono fail-safe: il quiz continua a funzionare anche se un pacchetto spiegazioni non viene caricato.

## QA tracciato

Tre quesiti della prova storica sono stati resi didatticamente non ambigui invece di copiare alla cieca una formulazione problematica:

1. **mcf054 — corticosteroidi**: la V1 esplicita che iperglicemia, osteoporosi e ritenzione idrosalina possono comparire durante trattamento prolungato; risposta `Tutte le precedenti` con ordine bloccato.
2. **mcf063 — attacco anginoso**: riformulato sulla terapia di rapido sollievo con nitrato a rapida azione per via sublinguale, evitando di trasformare una vecchia formulazione combinata in una regola clinica universale.
3. **mcf064 — paracetamolo e warfarin**: la prova storica inseriva il paracetamolo tra i FANS. La V1 chiede invece quale analgesico sia preferibile *rispetto ai FANS* nel paziente in warfarin, mantenendo il paracetamolo come risposta attesa senza classificarlo erroneamente come FANS.

Le raccolte aggiuntive `Domande Medicina Chirurgia e Farmacologia.pdf`, `Domande 1.pdf` e `Domande 2.pdf` restano disponibili per una successiva espansione della banca oltre le 65 domande della V1.

## Lezioni interattive — COMPLETE 24/24

- Medicina Generale: **12/12**;
- Chirurgia Generale: **9/9**;
- Farmacologia: **3/3**;
- totale: **24/24**.

Ogni lezione segue lo standard StudyHub:

**spiegazione → concetti chiave → active recall → checkpoint → materiale → quiz**.

Pacchetti:

- `data/lezioni-medchirufarmaco.json`;
- `data/lezioni-medchirufarmaco-medicina-generale.json`;
- `data/lezioni-medchirufarmaco-chirurgia-generale.json`;
- `data/lezioni-medchirufarmaco-farmacologia.json`;
- `lezioni-medchirufarmaco-loader.js`.

## Materiali

Pacchetto catalogato in `data/materiali-medchirufarmaco.json` e caricato dalla Biblioteca tramite `materiali-medchirufarmaco-loader.js`.

Materiali catalogati:

1. `Medicina Generale.pdf.pdf` — 77 pagine;
2. `Chirurgia Definitivo.pdf` — 85 pagine;
3. `FARMACO SCHEMI.odt` — schemi di farmacologia;
4. `domande esame corrette medicina chirurgia farmacologia (1).pdf` — prova AulaWeb da 65 domande.

**Stato binari:** i quattro originali sono catalogati ma non ancora pubblicati come file scaricabili nel repository del sito. Per evitare link 404 dalle Lezioni, `medchirufarmaco-source-guard.js` rimanda alla scheda Materiali di MedChiruFarmaco finché i binari non saranno presenti.

## Fonti didattiche usate

- Medicina: `Medicina Generale.pdf.pdf`;
- Chirurgia: `Chirurgia Definitivo.pdf`;
- Farmacologia: `FARMACO SCHEMI.odt`;
- banca V1: `domande esame corrette medicina chirurgia farmacologia (1).pdf`.

Le raccolte di domande non ufficiali sono considerate fonti secondarie e non prevalgono automaticamente sulla prova AulaWeb o sui materiali del corso.

## Regola di non regressione

La costruzione di MedChiruFarmaco non modifica testi, risposte corrette, ID o progressi delle quattro banche esistenti. Il nuovo esame usa il proprio namespace di progressi: `studyhub_medchirufarmaco_v1`.
