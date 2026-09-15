# MATERIALI_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La seconda area di StudyHub, **Materiali**, è integrata nel repository e collegata alla homepage.

File introdotti:

- `materiali.html` — pagina Biblioteca;
- `materiali.css` — stile Apple-like coerente con `studyhub.css`;
- `materiali.js` — ricerca, filtri, navigazione materia, lettore PDF e download;
- `data/materiali.json` — catalogo centralizzato dei materiali.

La homepage `index.html` contiene l'accesso a `materiali.html` senza modificare la logica dei quattro esami esistenti.

## PDF pubblicati e attivi nel repository

Sono attualmente presenti sul branch `main` **10 PDF reali**, ora collegati direttamente alla Biblioteca.

### Anatomia Patologica — 6/6 attivi

1. `ANATOMIA PATOLOGICA.pdf`
2. `Eziologia generale STAMPATO.pdf`
3. `Immunologia STAMPATO.pdf`
4. `Microbiologia.pdf`
5. `Microbiologia compendio.pdf`
6. `PATOLOGIA GENERALE definitivo.pdf`

Per questi documenti sono attivi sia **Apri** nel lettore integrato sia **Scarica**.

### Paziente chirurgico — 4 attivi, 2 ancora solo catalogati

Attivi:

1. `Infermieristica nell'assistenza del paziente chirurgico.pdf`
2. `DIAGNOSTICA.pdf`
3. `PSICOLOGIA .pdf`
4. `Terapia.pdf`

Ancora catalogati ma non presenti nel repository:

- `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf`
- `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf`

### Infermieristica nel Materno

Il catalogo è predisposto, ma i PDF `PEDIATRIA.pdf`, `1.pdf` e `2.pdf` non risultano ancora presenti sul branch `main`; i relativi pulsanti rimangono quindi disabilitati per evitare link inesistenti.

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
- pulsanti disabilitati quando il PDF non è ancora presente nel repository.

## Regola di non regressione

La nuova area Materiali non modifica banche quiz, risposte, spiegazioni, conteggi, localStorage o logica degli esami esistenti.
