# Study Hub – Quiz Infermieristici

Web app statica per simulazioni d'esame, materiali e lezioni interattive universitarie.

## Esami disponibili

- **Scienze della Salute** — 459 domande
- **Anatomia Patologica** — 300 domande
- **Infermieristica nel Materno** — 300 domande
- **Paziente chirurgico** — 462 domande
- **MedChiruFarmaco** — 65 domande: Medicina Generale 25, Chirurgia Generale 25, Farmacologia 15

**Totale attivo: 1.586 domande.**

## Funzioni

- mix dell'intero esame oppure focus su una singola sezione/materia;
- simulazioni con numero configurabile di domande;
- ordine casuale delle domande e alternative bilanciate quando appropriato;
- `lockOrder` per alternative semanticamente dipendenti dall'ordine;
- spiegazione del perché della risposta corretta e delle alternative errate;
- ripasso degli errori;
- punteggio, accuratezza e progressi salvati nel browser;
- Biblioteca Materiali con lettura/download dei PDF pubblicati;
- Lezioni interattive con spiegazione, active recall e checkpoint.

## Lezioni interattive

- Anatomia Patologica: 63/63
- Infermieristica nel Materno: 62/62
- Paziente chirurgico: 60/60
- MedChiruFarmaco: 24/24

Totale: **209 lezioni attive**.

## Pubblicazione

Il sito è pubblicato con GitHub Pages dalla radice del branch `main`.

## Struttura principale

- `index.html` — homepage Study Hub
- `materiali.html` — Biblioteca
- `lezioni.html` — Lezioni interattive
- `scienze-salute.html` / `scienze-salute-app.html`
- `anatomia-patologica.html`
- `infermieristica-materno-plus.html`
- `paziente-chirurgico.html`
- `medchirufarmaco.html`
- `studyhub.css` — stile condiviso
- `data/` — banche, spiegazioni, cataloghi e pacchetti lezioni
- `STUDYHUB_STATE.md` — stato operativo e regole di non regressione
