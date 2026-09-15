# MATERIALI_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La seconda area di StudyHub, **Materiali**, è integrata nel repository e collegata alla homepage.

File principali:

- `materiali.html` — pagina Biblioteca;
- `materiali.css` — stile Apple-like coerente con `studyhub.css`;
- `materiali.js` — ricerca, filtri, navigazione materia, lettore PDF, download e collegamento alle Lezioni;
- `data/materiali.json` — catalogo centralizzato dei materiali.

La homepage `index.html` contiene l'accesso a `materiali.html` senza modificare la logica dei quattro esami esistenti.

## PDF pubblicati e attivi nel repository

Sono attualmente collegati alla Biblioteca **16 PDF reali**.

### Anatomia Patologica — 6/6 attivi

1. `ANATOMIA PATOLOGICA.pdf`
2. `Eziologia generale STAMPATO.pdf`
3. `Immunologia STAMPATO.pdf`
4. `Microbiologia.pdf`
5. `Microbiologia compendio.pdf`
6. `PATOLOGIA GENERALE definitivo.pdf`

Il pacchetto mostra anche **Studia come lezione**, collegato a `lezioni.html?esame=anatomia-patologica`.

### Paziente chirurgico — 4 attivi, 2 ancora solo catalogati

Attivi:

1. `Infermieristica nell'assistenza del paziente chirurgico.pdf`
2. `DIAGNOSTICA.pdf`
3. `PSICOLOGIA .pdf`
4. `Terapia.pdf`

Ancora catalogati ma non presenti nel repository:

- `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf`
- `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf`

### Infermieristica nel Materno — 6/6 attivi

1. `PEDIATRIA.pdf` — Compendio Pediatria
2. `COMPENDEIO INFE PED.pdf` — Compendio Infermieristica Pediatrica
3. `COMPENDIO GINE.pdf` — Compendio Ginecologia
4. `COMPENDIO OSTETRICIA.pdf` — Compendio Ostetricia
5. `1.pdf` — Slide Materno 1
6. `2.pdf` — Slide Materno 2

I due file numerici sono volutamente mostrati con titoli neutrali finché il contenuto non viene rinominato o identificato con certezza.

Il pacchetto Materno mostra ora **Studia come lezione**, collegato al percorso completo `lezioni.html?esame=infermieristica-materno` (**62/62 lezioni attive**).

### Scienze della Salute

La materia è predisposta nell'interfaccia; nessun PDF è ancora associato.

## Funzioni implementate

- pagina Materiali separata dalla pagina Esami;
- palette StudyHub invariata: terracotta, pesca, turchese, acquamarina;
- font Bebas Neue + Inter;
- glassmorphism e layout responsive;
- ricerca globale sui materiali;
- filtri Tutti / Sbobine / Compendi / Slide;
- pagina interna per materia;
- argomenti collegati;
- catalogo dati separato dalla UI;
- lettore PDF integrato via iframe;
- download diretto dei PDF pubblicati;
- stato `DISPONIBILE`, `PARZIALMENTE DISPONIBILE`, `CATALOGATO` o `IN CATALOGAZIONE` calcolato dai file realmente presenti;
- contatore distinto tra documenti disponibili e documenti catalogati;
- pulsanti disabilitati quando il PDF non è ancora presente nel repository;
- collegamento **Materiali → Studia come lezione** per Anatomia Patologica e Infermieristica nel Materno.

## Regola di non regressione

L'area Materiali non modifica banche quiz, risposte, spiegazioni, conteggi, localStorage o logica degli esami esistenti.
