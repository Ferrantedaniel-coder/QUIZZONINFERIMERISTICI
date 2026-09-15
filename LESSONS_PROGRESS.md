# LESSONS_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La terza area di StudyHub, **Lezioni**, è integrata nel repository e collegata alla homepage e alla Biblioteca Materiali.

Slogan attivo: **“Leggi meno. Ricorda di più.”**

File principali:

- `lezioni.html` — interfaccia delle lezioni interattive;
- `lezioni.css` — stile Apple-like coerente con StudyHub;
- `lezioni.js` — motore interattivo e progressi locali;
- `data/lezioni.json` — catalogo gerarchico esami → materie → capitoli → lezioni;
- `data/lezioni-eziologia.json` — pacchetto contenuti Eziologia Generale;
- `lezioni-eziologia-loader.js` — loader non distruttivo del pacchetto Eziologia.

## Architettura corrente

La navigazione Lezioni è:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**

La homepage Lezioni mostra gli esami. Al momento **Anatomia Patologica** è il percorso strutturato e apribile; Paziente chirurgico, Infermieristica nel Materno e Scienze della Salute restano predisposti come estensioni future.

### Anatomia Patologica

All'apertura dell'esame vengono mostrate le quattro materie nell'ordine didattico concordato:

1. **Eziologia Generale**
2. **Patologia Generale**
3. **Immunologia**
4. **Anatomia Patologica**

Roadmap:

- Eziologia Generale: **8 capitoli / 8 lezioni attive**;
- Patologia Generale: **20 capitoli**;
- Immunologia: **16 capitoli**;
- Anatomia Patologica: **19 capitoli / 3 lezioni attive**;
- totale: **63 capitoli mappati / 11 lezioni interattive attive**.

Le materie o i capitoli non ancora convertiti mostrano chiaramente **STRUTTURA PRONTA / IN PREPARAZIONE**.

## Eziologia Generale — COMPLETA 8/8

Tutti gli 8 capitoli della roadmap sono ora trasformati in vere lezioni interattive:

1. **Concetti fondamentali di eziologia**
2. **Agenti fisici**
3. **Agenti chimici e tossici**
4. **Agenti biologici**
5. **Fattori nutrizionali**
6. **Fattori genetici**
7. **Radicali liberi e stress ossidativo**
8. **Invecchiamento cellulare**

Ogni lezione contiene:

- obiettivo didattico;
- spiegazione universitaria sintetica;
- concetti chiave;
- active recall;
- 2 checkpoint A/B/C/D obbligatori;
- feedback immediato;
- collegamento al materiale originale;
- stato/progresso salvato in `localStorage`.

Fonti primarie del pacchetto:

- `Eziologia generale STAMPATO.pdf` per classificazione delle cause, agenti fisici, cause chimiche e radicali liberi;
- `PATOLOGIA GENERALE definitivo.pdf` come integrazione per cause genetiche, fattori alimentari, agenti biologici e invecchiamento/stress ossidativo.

Il pacchetto è separato dal catalogo principale e viene collegato a runtime dal loader: questo rende più semplice aggiungere in seguito Patologia Generale, Immunologia e altre materie senza gonfiare o riscrivere il motore.

## Anatomia Patologica — 3 lezioni già attive

Le 3 lezioni pilota restano collocate nei rispettivi capitoli:

1. **Citologia diagnostica** → capitolo Citologia;
2. **Classificazione delle neoplasie** → capitolo Classificazione delle neoplasie;
3. **Grading e staging** → capitolo Grading e staging.

Gli ID delle tre lezioni non sono stati cambiati, quindi i progressi già presenti nel browser restano compatibili.

Fonte primaria: `ANATOMIA PATOLOGICA.pdf`.

## Fonti collegate alle materie

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

- `lezioni.html?esame=anatomia-patologica` → apre l'esame;
- `lezioni.html?esame=anatomia-patologica&materia=eziologia-generale` → apre direttamente Eziologia;
- `lezioni.html?esame=anatomia-patologica&materia=immunologia` → apre direttamente Immunologia;
- il vecchio parametro `?materia=anatomia-patologica` resta compatibile.

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

I contenuti devono derivare dai materiali reali del corso; eventuali integrazioni devono servire a rendere il contenuto scientificamente corretto e coerente, senza attribuire ai PDF affermazioni non presenti.

## Prossimo sviluppo

Eziologia è completa. Proseguire nell'ordine didattico:

1. **Patologia Generale** — 20 capitoli;
2. **Immunologia** — 16 capitoli;
3. **Anatomia Patologica** — completare i 16 capitoli ancora senza lezione.

Per ogni capitolo mantenere lo schema StudyHub: **spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.
