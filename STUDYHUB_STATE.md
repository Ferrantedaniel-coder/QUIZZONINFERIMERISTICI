# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **15 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria.

La priorità generale è la **non regressione**: una modifica puntuale non autorizza a cambiare domande, opzioni, risposte corrette, grafica, progressi o logica non coinvolti dal task.

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Le fonti esterne autorevoli possono essere usate per verificare e correggere contenuti obsoleti, ma non devono essere attribuite falsamente ai PDF del corso e non autorizzano modifiche silenziose delle banche quiz.

## 2. Stato generale

StudyHub è una web app statica HTML/CSS/JavaScript con **4 esami attivi e 1.521 domande**:

| Esame | Domande | Sezioni |
|---|---:|---|
| Scienze della Salute | 459 | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| Anatomia Patologica | 300 | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| Infermieristica nel Materno | 300 | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| Paziente chirurgico | 462 | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |

Farmacologia resta visibile in homepage come **in preparazione**.

StudyHub è organizzato in tre aree principali:

1. **Esami** — simulazioni, spiegazioni, error review e progressi;
2. **Materiali** — sbobine, compendi e slide consultabili/scaricabili;
3. **Lezioni** — percorsi interattivi costruiti sui materiali reali con active recall, checkpoint e collegamento ai quiz.

Slogan correnti:

- Esami: **“Scegli l'esame. Poi distruggilo.”**
- Materiali: **“Meno cartelle. Più studio.”**
- Lezioni: **“Leggi meno. Ricorda di più.”**

## 3. Materiali

La Biblioteca è attiva tramite `materiali.html`, `materiali.css`, `materiali.js` e `data/materiali.json`.

PDF collegati:

- Anatomia Patologica: **6/6**;
- Paziente chirurgico: **4 PDF pubblicati + 2 compendi catalogati ma non ancora pubblicati nel repository**;
- Infermieristica nel Materno: **6/6**;
- Scienze della Salute: area predisposta, nessun PDF ancora associato.

Percorsi **Studia come lezione** attivi dalla Biblioteca:

- Anatomia Patologica;
- Infermieristica nel Materno;
- Paziente chirurgico.

Checkpoint dettagliato: `MATERIALI_PROGRESS.md`.

## 4. Lezioni interattive

Motore:

- `lezioni.html`;
- `lezioni.css`;
- `lezioni.js`;
- `data/lezioni.json`;
- progressi locali in `localStorage` con chiave `studyhub.lessons.progress.v1`.

Gerarchia:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**.

Schema didattico obbligatorio:

**spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.

### Copertura globale

- Anatomia Patologica: **63 capitoli mappati / 47 lezioni attive**;
- Infermieristica nel Materno: **62/62 lezioni COMPLETE**;
- Paziente chirurgico: **60/60 lezioni COMPLETE**;
- totale area Lezioni: **185 capitoli mappati / 169 lezioni attive**.

Scienze della Salute resta il successivo percorso da strutturare quando saranno disponibili materiali reali sufficienti.

### 4.1 Anatomia Patologica — 47/63

- Eziologia Generale: **8/8**;
- Patologia Generale: **10/20**;
- Immunologia: **12/16**;
- Anatomia Patologica: **17/19**.

I 16 capitoli non attivati restano volutamente **IN PREPARAZIONE** perché non sufficientemente coperti dai materiali verificati.

Loader/pacchetti:

- `lezioni-eziologia-loader.js` + `data/lezioni-eziologia.json`;
- `lezioni-patologia-loader.js` + `data/lezioni-patologia-1.json`, `data/lezioni-patologia-2.json`;
- `lezioni-immunologia-loader.js` + `data/lezioni-immunologia-1.json`, `data/lezioni-immunologia-2.json`;
- `lezioni-anatomia-patologica-loader.js` + `data/lezioni-anatomia-patologica-1.json`, `-2.json`, `-3.json`.

Le tre lezioni pilota originarie — **Citologia diagnostica**, **Classificazione delle neoplasie**, **Grading e staging** — mantengono gli stessi ID e restano compatibili con i progressi già salvati.

Checkpoint: `LESSONS_PROGRESS.md`.

### 4.2 Infermieristica nel Materno — COMPLETA 62/62

- Infermieristica Pediatrica: **15/15**;
- Pediatria: **15/15**;
- Ostetricia: **18/18**;
- Ginecologia: **14/14**.

Pacchetti:

- `data/lezioni-materno.json`;
- `data/lezioni-materno-infermieristica-2.json`;
- `data/lezioni-materno-pediatria.json`;
- `data/lezioni-materno-ostetricia.json`;
- `data/lezioni-materno-ginecologia.json`;
- `lezioni-materno-loader.js`.

Fonti primarie: `COMPENDEIO INFE PED.pdf`, `PEDIATRIA.pdf`, `COMPENDIO OSTETRICIA.pdf`, `COMPENDIO GINE.pdf`.

Le correzioni scientifiche e i dettagli completi sono registrati in `LESSONS_PROGRESS.md`.

### 4.3 Paziente chirurgico — COMPLETO 60/60

Cinque materie complete:

- **Assistenza perioperatoria: 18/18**;
- **Diagnostica: 10/10**;
- **Psicologia: 10/10**;
- **Educazione terapeutica: 7/7**;
- **Terapia e farmacologia: 15/15**.

Pacchetti:

- `data/lezioni-paziente-chirurgico.json` — roadmap completa 5 materie / 60 capitoli;
- `data/lezioni-paziente-chirurgico-assistenza-1.json`;
- `data/lezioni-paziente-chirurgico-assistenza-2.json`;
- `data/lezioni-paziente-chirurgico-diagnostica.json`;
- `data/lezioni-paziente-chirurgico-psicologia.json`;
- `data/lezioni-paziente-chirurgico-educazione.json`;
- `data/lezioni-paziente-chirurgico-terapia-1.json`;
- `data/lezioni-paziente-chirurgico-terapia-2.json`;
- `lezioni-paziente-chirurgico-loader.js`.

`lezioni.html` importa il loader dedicato e `data/materiali.json` collega **Paziente chirurgico → Studia come lezione**.

Fonti reali utilizzate:

- `Infermieristica nell'assistenza del paziente chirurgico.pdf`;
- `DIAGNOSTICA.pdf`;
- `PSICOLOGIA .pdf`;
- `Terapia.pdf`;
- `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf` — compendio esteso del progetto;
- `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf` — sintesi integrata del progetto.

Aggiornamenti principali applicati senza alterare la banca quiz:

- precauzioni standard per tutti i pazienti; non propagata la vecchia programmazione discriminatoria del paziente sieropositivo;
- esami preoperatori individualizzati;
- digiuno preoperatorio aggiornato, non ridotto a “dalla mezzanotte” per tutti;
- tricotomia solo se necessaria, preferendo clipper e non rasoio;
- Surgical Safety Checklist OMS: Sign In / Time Out / Sign Out;
- RM: screening di dispositivi/impianti e concetto MR Conditional;
- contrasto: reazioni allergic-like distinte dalle fisiologiche, premedicazione selettiva, gestione metformina contestualizzata a funzione renale/AKI e protocollo;
- PET-FDG non descritta come specifica esclusivamente per neoplasia;
- Midline correttamente classificato come accesso periferico lungo;
- PICC come catetere centrale a inserzione periferica con punta centrale appropriata e verificata;
- CVP non sostituito secondo una scadenza universale fissa di 72 ore;
- KCl concentrato mai EV push/non diluito;
- warfarin: alimentazione con vitamina K mantenuta relativamente costante, non eliminata; gestione perioperatoria individualizzata;
- formulazioni orali manipolate solo dopo verifica della specifica formulazione;
- via intraossea contestualizzata a competenze, formazione e protocolli locali;
- modelli psicologici a stadi presentati come descrittivi e non obbligatori/lineari.

Checkpoint dettagliato: `LESSONS_PROGRESS.md`.

## 5. Funzioni Lezioni da preservare

- navigazione Home → Lezioni → esame → materia → capitolo → lezione;
- breadcrumb su tutti i livelli;
- blocchi didattici sequenziali;
- concetti chiave;
- active recall;
- checkpoint A/B/C/D con risposta obbligatoria;
- feedback immediato;
- conteggio checkpoint corretti;
- avanzamento lezione/materia/esame;
- stati `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- comando **Segna da ripassare**;
- progressi in `localStorage` separati dai quiz;
- schermata di completamento;
- passaggio **Studia → Allenati sul quiz**;
- accesso al materiale originale disponibile;
- routing `?esame=...&materia=...`;
- responsive desktop/mobile.

## 6. Integrità delle banche quiz

Se il task riguarda UI, logica, spiegazioni, Materiali o Lezioni:

- non modificare il testo delle domande;
- non modificare le quattro opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Se emerge un quesito probabilmente errato, ambiguo o obsoleto, trattarlo come **QA separato** e non correggerlo di nascosto.

Domande con alternative semanticamente vincolate come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Preservare `lockOrder`.

## 7. Standard spiegazioni quiz

Standard per gli enhancer:

- spiegare perché la risposta corretta è corretta;
- spiegare perché ciascuna delle altre tre è errata;
- mantenere le motivazioni agganciate all'opzione originale anche dopo shuffle;
- fallback fail-safe: un problema nelle spiegazioni non deve impedire avvio o completamento del quiz.

### Paziente chirurgico — SPIEGAZIONI COMPLETE 462/462

- Diagnostica `di1–di76` = 76/76;
- Educazione terapeutica `ed1–ed54` = 54/54;
- Psicologia `ps1–ps66` = 66/66;
- Terapia `te1–te266` = 266/266.

File: `data/paziente-chirurgico-explanations-001.json` → `029.json`.  
Checkpoint: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute — SPIEGAZIONI COMPLETE 459/459

`scienze-salute-explanations.js` + `data/scienze-salute-explanations-001.json` → `013.json`.

Checkpoint: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — SPIEGAZIONI COMPLETE 300/300

`anatomia-patologica-explanations.js`, `EXPECTED_ADVANCED=300`, release `pilot8`, pacchetti `data/anatomia-patologica-explanations-001.json` → `008.json`.

Checkpoint: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

### Infermieristica nel Materno — SPIEGAZIONI QUIZ 240/300

**Questo stato riguarda le spiegazioni del quiz; le Lezioni Materno sono già complete 62/62.**

- Infermieristica Pediatrica: 137/137;
- Pediatria: 55/55;
- Ostetricia: 48/53;
- Ginecologia: 0/55;
- totale: **240/300**;
- prossimo indice: **241**.

Ripresa: 241–245 Ostetricia, 246–280 Ginecologia, 281–300 Ginecologia. Non rifare 1–240.

Checkpoint: `MATERNO_PROGRESS.md`.

## 8. Architettura principale

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `materiali.html`, `materiali.css`, `materiali.js`, `data/materiali.json`;
- `MATERIALI_PROGRESS.md`;
- `lezioni.html`, `lezioni.css`, `lezioni.js`, `data/lezioni.json`;
- loader/pacchetti Anatomia, Materno e Paziente chirurgico descritti sopra;
- `LESSONS_PROGRESS.md`;
- `scienze-salute.html`, `scienze-salute-app.html`, `scienze-salute-explanations.js`;
- `anatomia-patologica.html`, `anatomia-patologica-explanations.js`;
- `infermieristica-materno.html`, `infermieristica-materno-plus.html`, `infermieristica-materno-explanations.js`;
- `paziente-chirurgico.html` + enhancer spiegazioni;
- `data/` — banche, spiegazioni, cataloghi e pacchetti Lezioni;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud. Quiz e Lezioni usano namespace separati.

## 9. Workflow obbligatorio

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi, ID, sezioni e risposta corretta;
7. per gli esami testare avvio → risposta → feedback → navigazione → risultato → ripasso errori → Home;
8. per le Lezioni testare Home Lezioni → esame → materia → capitolo → blocchi → recall → checkpoint → completamento → quiz/materiale → ritorno;
9. mantenere responsive/mobile;
10. aggiornare checkpoint e questo file quando cambia lo stato reale.

### Lavoro a blocchi

- Paziente chirurgico spiegazioni quiz: **462/462** completo;
- Scienze della Salute spiegazioni quiz: **459/459** completo;
- Anatomia Patologica spiegazioni quiz: **300/300** completo;
- Materno spiegazioni quiz: **240/300**, ripresa da **241**;
- Lezioni Anatomia Patologica: **47/63** attive;
- Lezioni Infermieristica nel Materno: **62/62 COMPLETE**;
- Lezioni Paziente chirurgico: **60/60 COMPLETE**;
- totale Lezioni: **169/185 attive**.

## 10. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 11. Roadmap immediata

1. preservare intatti i quattro esami e le rispettive banche;
2. **Lezioni Materno 62/62 — COMPLETE, non rifarle**;
3. **Lezioni Paziente chirurgico 60/60 — COMPLETE, non rifarle**;
4. prossimo percorso Lezioni: **Scienze della Salute**, dopo associazione di materiali universitari sufficienti;
5. per Anatomia Patologica attivare i 16 capitoli ancora in preparazione solo con materiale sufficiente o integrazione verificata/autorizzata;
6. completare separatamente le spiegazioni quiz Materno da **241 a 300**;
7. associare materiali reali a Scienze della Salute quando disponibili;
8. Farmacologia resta futura banca in preparazione;
9. gestire quesiti dubbi o obsoleti come QA separato.