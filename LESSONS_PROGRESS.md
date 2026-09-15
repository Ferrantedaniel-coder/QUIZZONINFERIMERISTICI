# LESSONS_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La terza area di StudyHub, **Lezioni**, è integrata nel repository e collegata alla homepage e alla Biblioteca Materiali.

Slogan attivo: **“Leggi meno. Ricorda di più.”**

File principali:

- `lezioni.html` — interfaccia delle lezioni interattive;
- `lezioni.css` — stile Apple-like coerente con StudyHub;
- `lezioni.js` — motore interattivo e progressi locali;
- `data/lezioni.json` — catalogo gerarchico esami → materie → capitoli → lezioni.

## Architettura corrente

La navigazione Lezioni è ora:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**

La homepage Lezioni mostra gli esami. Al momento **Anatomia Patologica** è il percorso strutturato e apribile; Paziente chirurgico, Infermieristica nel Materno e Scienze della Salute restano predisposti come estensioni future.

### Anatomia Patologica

All'apertura dell'esame vengono mostrate le quattro materie nell'ordine didattico concordato:

1. **Eziologia Generale**
2. **Patologia Generale**
3. **Immunologia**
4. **Anatomia Patologica**

Tutte e quattro sono apribili e mostrano la roadmap dei capitoli anche quando le singole lezioni interattive non sono ancora state scritte.

Roadmap attuale:

- Eziologia Generale: **8 capitoli**;
- Patologia Generale: **20 capitoli**;
- Immunologia: **16 capitoli**;
- Anatomia Patologica: **19 capitoli**;
- totale: **63 capitoli mappati**.

Le materie senza lezioni già convertite mostrano chiaramente lo stato **STRUTTURA PRONTA / IN PREPARAZIONE**: nessun contenuto medico viene inventato per riempire card vuote.

## Lezioni interattive attive

Restano attive le 3 lezioni pilota, ora collocate nella materia **Anatomia Patologica** e nei rispettivi capitoli:

1. **Citologia diagnostica** → capitolo Citologia;
2. **Classificazione delle neoplasie** → capitolo Classificazione delle neoplasie;
3. **Grading e staging** → capitolo Grading e staging.

Gli ID delle tre lezioni non sono stati cambiati, quindi i progressi già presenti nel browser restano compatibili.

Fonte primaria: `ANATOMIA PATOLOGICA.pdf`.

Le altre materie sono già collegate ai rispettivi materiali originali:

- Eziologia Generale → `Eziologia generale STAMPATO.pdf`;
- Patologia Generale → `PATOLOGIA GENERALE definitivo.pdf`;
- Immunologia → `Immunologia STAMPATO.pdf`;
- Anatomia Patologica → `ANATOMIA PATOLOGICA.pdf`.

## Funzioni implementate

- navigazione Home → Lezioni → esame → materia → capitolo → lezione;
- breadcrumb su tutti i livelli;
- accesso Materiali → **Studia come lezione** per Anatomia Patologica;
- roadmap completa dei capitoli prima della conversione in lezioni;
- blocchi didattici brevi e sequenziali;
- concetti chiave;
- active recall con risposta nascosta;
- checkpoint A/B/C/D;
- obbligo di rispondere ai checkpoint prima di proseguire;
- feedback immediato corretto/da rivedere;
- conteggio dei checkpoint corretti;
- avanzamento della singola lezione;
- avanzamento della materia e dell'esame sulle lezioni effettivamente attive;
- stato `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- comando **Segna da ripassare**;
- persistenza in `localStorage` con chiave `studyhub.lessons.progress.v1`;
- schermata di completamento;
- passaggio **Studia → Allenati sul quiz**;
- apertura del PDF originale della materia;
- layout responsive desktop/mobile.

## Routing e compatibilità

Nuovo routing supportato:

- `lezioni.html?esame=anatomia-patologica` → apre l'esame;
- `lezioni.html?esame=anatomia-patologica&materia=immunologia` → apre direttamente la materia;
- il vecchio parametro `?materia=anatomia-patologica` viene ancora interpretato come accesso all'esame per non rompere vecchi link.

La Biblioteca Materiali usa ora il nuovo percorso `?esame=anatomia-patologica`.

## Design

Il modulo mantiene il design system StudyHub:

- Bebas Neue + Inter;
- terracotta `#d77b5f`;
- pesca `#f1b796`;
- turchese `#37b7b3`;
- acquamarina `#86d9cf`;
- glassmorphism;
- gradienti morbidi;
- card arrotondate;
- responsive desktop/mobile.

## Regola di non regressione

Le Lezioni sono una terza area separata. Non devono modificare domande, opzioni, risposte corrette, spiegazioni avanzate, progressi o logica degli esami esistenti.

I contenuti delle lezioni devono derivare dai materiali reali del corso; quando un capitolo non è ancora stato trasformato in lezione, deve rimanere indicato come **in preparazione** invece di essere completato con contenuti non verificati.

## Prossimo sviluppo

Riempire progressivamente i 63 capitoli seguendo l'ordine:

1. Eziologia Generale;
2. Patologia Generale;
3. Immunologia;
4. Anatomia Patologica.

Per ogni capitolo usare lo schema StudyHub: **spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.
