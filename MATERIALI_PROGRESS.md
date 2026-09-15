# MATERIALI_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La seconda area di StudyHub, **Materiali**, è integrata nel repository e collegata alla homepage.

File introdotti:

- `materiali.html` — pagina Biblioteca;
- `materiali.css` — stile Apple-like coerente con `studyhub.css`;
- `materiali.js` — ricerca, filtri, navigazione materia, lettore PDF e download;
- `data/materiali.json` — catalogo centralizzato dei materiali.

La homepage `index.html` contiene ora l'accesso a `materiali.html` senza modificare la logica dei quattro esami esistenti.

## Catalogo reale recuperato dalla File Library

### Anatomia Patologica — 6 documenti

1. `ANATOMIA PATOLOGICA.pdf`
2. `Eziologia generale STAMPATO.pdf`
3. `Immunologia STAMPATO.pdf`
4. `Microbiologia.pdf`
5. `Microbiologia compendio.pdf`
6. `PATOLOGIA GENERALE definitivo.pdf`

### Paziente chirurgico — 6 documenti

1. `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf`
2. `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf`
3. `Infermieristica nell'assistenza del paziente chirurgico.pdf`
4. `DIAGNOSTICA.pdf`
5. `PSICOLOGIA .pdf`
6. `Terapia.pdf`

### Infermieristica nel Materno — 4 documenti

1. `PEDIATRIA.pdf`
2. `1.pdf` — assistenza infermieristica al neonato sano
3. `1.pdf` — neonatologia, caratteristiche e adattamento
4. `2.pdf` — prematurità

### Scienze della Salute

La materia è predisposta nell'interfaccia; i PDF sorgente non sono ancora stati identificati con sufficiente certezza nella File Library e quindi non sono stati inventati o associati arbitrariamente.

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
- lettore PDF integrato via iframe quando il file è pubblicato;
- download diretto quando il file è pubblicato;
- pulsanti disabilitati in modo esplicito quando il PDF è soltanto catalogato ma non ancora presente nello storage pubblico del sito.

## Passaggio tecnico ancora necessario

I PDF recuperati dalla **File Library di ChatGPT** sono riferimenti privati e non possono essere serviti direttamente da GitHub Pages. Per attivare realmente `Apri` e `Scarica`, i binari PDF devono essere copiati in `materials/...` nel repository (o in uno storage pubblico stabile) e il campo `file` di `data/materiali.json` deve puntare al relativo percorso.

I percorsi di destinazione sono già predisposti nel campo `plannedPath` del catalogo.

## Regola di non regressione

La nuova area Materiali non deve modificare banche quiz, risposte, spiegazioni, conteggi, localStorage o logica degli esami esistenti.