# MATERIALI_PROGRESS.md

Ultimo aggiornamento: **16 settembre 2026**

## Stato

L'area **Materiali** è integrata nel repository e collegata alla homepage.

File principali:

- `materiali.html` — Biblioteca;
- `materiali.css` — stile Apple-like coerente con `studyhub.css`;
- `materiali.js` — ricerca, filtri, navigazione materia, lettore PDF, download e collegamento alle Lezioni;
- `data/materiali.json` — catalogo base;
- `data/materiali-medchirufarmaco.json` + `materiali-medchirufarmaco-loader.js` — estensione MedChiruFarmaco.

## Stato documenti

Sono pubblicati nel repository **16 PDF reali** su **22 documenti catalogati**.

### Anatomia Patologica — 6/6 attivi

1. `ANATOMIA PATOLOGICA.pdf`
2. `Eziologia generale STAMPATO.pdf`
3. `Immunologia STAMPATO.pdf`
4. `Microbiologia.pdf`
5. `Microbiologia compendio.pdf`
6. `PATOLOGIA GENERALE definitivo.pdf`

Percorso **Studia come lezione**: `lezioni.html?esame=anatomia-patologica`.

### Paziente chirurgico — 4 attivi, 2 catalogati

Attivi:

1. `Infermieristica nell'assistenza del paziente chirurgico.pdf`
2. `DIAGNOSTICA.pdf`
3. `PSICOLOGIA .pdf`
4. `Terapia.pdf`

Catalogati ma non presenti come binari:

- `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf`
- `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf`

Percorso **Studia come lezione**: `lezioni.html?esame=paziente-chirurgico`.

### Infermieristica nel Materno — 6/6 attivi

1. `PEDIATRIA.pdf`
2. `COMPENDEIO INFE PED.pdf`
3. `COMPENDIO GINE.pdf`
4. `COMPENDIO OSTETRICIA.pdf`
5. `1.pdf`
6. `2.pdf`

Percorso **Studia come lezione**: `lezioni.html?esame=infermieristica-materno`.

### Scienze della Salute

Area predisposta; nessun PDF associato.

### MedChiruFarmaco — 0 attivi, 4 catalogati

1. `Medicina Generale.pdf.pdf` — 77 pagine;
2. `Chirurgia Definitivo.pdf` — 85 pagine;
3. `FARMACO SCHEMI.odt` — schemi del corso;
4. `domande esame corrette medicina chirurgia farmacologia (1).pdf` — prova AulaWeb con 65 quesiti.

Percorso **Studia come lezione**: `lezioni.html?esame=medchirufarmaco`.

I quattro file originali sono stati usati per costruire quiz e lezioni ma **non risultano ancora pubblicati come binari nel repository del sito**. La Biblioteca li mostra quindi correttamente come catalogati con pulsanti Apri/Scarica disabilitati. `medchirufarmaco-source-guard.js` evita che le Lezioni aprano URL PDF inesistenti e rimanda alla scheda Materiali finché i binari non saranno disponibili.

## Funzioni implementate

- pagina Materiali separata dalla pagina Esami;
- palette StudyHub invariata;
- glassmorphism e layout responsive;
- ricerca globale;
- filtri Tutti / Sbobine / Compendi / Slide;
- pagina interna per materia;
- argomenti collegati;
- catalogo dati separato dalla UI;
- lettore PDF integrato via iframe;
- download diretto dei PDF pubblicati;
- stati `DISPONIBILE`, `PARZIALMENTE DISPONIBILE`, `CATALOGATO` o `IN CATALOGAZIONE` calcolati dai file realmente disponibili;
- contatore distintivo tra documenti disponibili e catalogati;
- pulsanti disabilitati quando il binario non è pubblicato;
- collegamento **Materiali → Studia come lezione** per Anatomia Patologica, Infermieristica nel Materno, Paziente chirurgico e MedChiruFarmaco.

## Regola di non regressione

L'area Materiali non modifica banche quiz, risposte, spiegazioni, conteggi, localStorage o logica degli esami esistenti.
