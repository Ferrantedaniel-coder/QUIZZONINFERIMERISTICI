# LESSONS_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La terza area di StudyHub, **Lezioni**, è integrata nel repository e collegata alla homepage e alla Biblioteca Materiali.

Slogan attivo: **“Leggi meno. Ricorda di più.”**

File principali:

- `lezioni.html` — interfaccia delle lezioni interattive;
- `lezioni.css` — stile Apple-like coerente con StudyHub;
- `lezioni.js` — motore interattivo e progressi locali;
- `data/lezioni.json` — catalogo e contenuti delle lezioni.

## Pilota attivo

### Anatomia Patologica — 3 lezioni

1. **Classificazione delle neoplasie**
2. **Grading e staging**
3. **Citologia diagnostica**

Le lezioni sono costruite sui materiali reali del corso e mantengono il collegamento al PDF `ANATOMIA PATOLOGICA.pdf`.

## Funzioni implementate

- navigazione Home → Lezioni → materia → singola lezione;
- accesso diretto Materiali → **Studia come lezione** per Anatomia Patologica;
- blocchi didattici brevi e sequenziali;
- concetti chiave;
- active recall con risposta nascosta;
- checkpoint A/B/C/D;
- obbligo di rispondere ai checkpoint prima di proseguire;
- feedback immediato corretto/da rivedere;
- conteggio dei checkpoint corretti;
- avanzamento della lezione;
- avanzamento complessivo della materia;
- stato `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- comando **Segna da ripassare**;
- persistenza in `localStorage` con chiave `studyhub.lessons.progress.v1`;
- schermata di completamento;
- passaggio **Studia → Allenati sul quiz**;
- apertura del PDF originale;
- layout responsive desktop/mobile.

## Design

Il modulo mantiene il design system StudyHub:

- Bebas Neue + Inter;
- terracotta `#d77b5f`;
- pesca `#f1b796`;
- turchese `#37b7b3`;
- acquamarina `#86d9cf`;
- glassmorphism, gradienti morbidi e card arrotondate.

## Materie predisposte

Sono già presenti nel catalogo come future estensioni:

- Paziente chirurgico;
- Infermieristica nel Materno;
- Scienze della Salute.

Il motore è generico: per aggiungere nuove lezioni non è necessario creare un nuovo motore, ma aggiungere i contenuti strutturati in `data/lezioni.json` e collegare la materia ai materiali originali e al quiz.

## Regola di non regressione

Le Lezioni sono una terza area separata. Non devono modificare domande, opzioni, risposte corrette, spiegazioni avanzate, progressi o logica degli esami esistenti.

## Prossimo sviluppo consigliato

1. estendere Anatomia Patologica oltre le 3 lezioni pilota;
2. creare il percorso Materno usando `PEDIATRIA.pdf`, `COMPENDEIO INFE PED.pdf`, `COMPENDIO GINE.pdf` e `COMPENDIO OSTETRICIA.pdf`;
3. creare Paziente chirurgico dai PDF già pubblicati;
4. collegare, quando possibile, ogni lezione a una sezione o gruppo di domande specifico del relativo esame;
5. aggiungere una futura modalità di ripasso aggregato delle lezioni segnate `DA RIPASSARE`.
