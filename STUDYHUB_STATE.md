# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **24 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria.

La priorità generale è la **non regressione**: una modifica puntuale non autorizza a cambiare domande, opzioni, risposte corrette, grafica, progressi o logica non coinvolti dal task.

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Le fonti esterne autorevoli possono essere usate per verificare, completare e correggere contenuti obsoleti quando autorizzato, ma non devono essere attribuite falsamente ai materiali del corso e non autorizzano modifiche silenziose delle banche quiz.

Se un quesito storico è ambiguo, errato o obsoleto, la correzione va **tracciata esplicitamente come QA**.

## 2. Stato generale

StudyHub è una web app statica HTML/CSS/JavaScript con **7 esami attivi e 2.026 domande**:

| Esame | Domande | Sezioni |
|---|---:|---|
| Scienze della Salute | 459 | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| Anatomia Patologica | 300 | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| Infermieristica nel Materno | 300 | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| Paziente chirurgico | 462 | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |
| Diagnostica | 80 | Diagnostica (esame autonomo da banca fornita il 20/09/2026) |
| MedChiruFarmaco | 65 | Medicina Generale 25; Chirurgia Generale 25; Farmacologia 15 |
| Infermieristica per problemi prioritari di salute (PPS) | 360 | 9 sezioni da 40 domande: Infermieristica nella gestione dei problemi di salute cronici; Respiratorio/Pneumologia; Cardiovascolare e Cardiochirurgia; Ematologia; Oncologia; Neurologia; Gastroenterologia; Endocrinologia; Malattie infettive |

StudyHub è organizzato in quattro aree principali:

1. **Esami** — simulazioni, spiegazioni, error review e progressi;
2. **Materiali** — sbobine, compendi e slide consultabili/scaricabili quando i binari sono presenti;
3. **Lezioni** — percorsi interattivi costruiti sui materiali reali con active recall, checkpoint e collegamento ai quiz;
4. **Registratore** — registrazione audio delle lezioni con salvataggio locale a blocchi, consenso separato per registrazione/conservazione e pipeline predisposta per trascrizione + appunti AI.

Slogan correnti:

- Esami: **“Scegli l'esame. Poi distruggilo.”**
- Materiali: **“Meno cartelle. Più studio.”**
- Lezioni: **“Leggi meno. Ricorda di più.”**
- Registratore: **“Ascolta. Gli appunti arrivano dopo.”**

## 3. Materiali

Motore Biblioteca:

- `materiali.html`;
- `materiali.css`;
- `materiali.js`;
- `data/materiali.json`;
- loader dedicato MedChiruFarmaco: `materiali-medchirufarmaco-loader.js` + `data/materiali-medchirufarmaco.json`.

Stato documenti:

- Anatomia Patologica: **6/6 pubblicati**;
- Paziente chirurgico: **4 pubblicati + 2 catalogati**;
- Infermieristica nel Materno: **6/6 pubblicati**;
- Scienze della Salute: nessun PDF associato;
- MedChiruFarmaco: **4 materiali catalogati, binari non ancora pubblicati nel repository**;
- PPS: **4 materiali catalogati, binari non ancora pubblicati nel repository**.

Totale: **16 documenti pubblicati / 26 catalogati**.

Percorsi **Studia come lezione** attivi dalla Biblioteca:

- Anatomia Patologica;
- Infermieristica nel Materno;
- Paziente chirurgico;
- MedChiruFarmaco;
- PPS.

Per MedChiruFarmaco i quattro originali catalogati sono:

- `Medicina Generale.pdf.pdf`;
- `Chirurgia Definitivo.pdf`;
- `FARMACO SCHEMI.odt`;
- `domande esame corrette medicina chirurgia farmacologia (1).pdf`.

Finché i binari non sono pubblicati nel repository, `medchirufarmaco-source-guard.js` impedisce link 404 dalle Lezioni e rimanda alla scheda Materiali.

Checkpoint dedicato: `MEDCHIRUFARMACO_PROGRESS.md`.

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

**spiegazione → concetti chiave → active recall → checkpoint → fonte/materiale disponibile → quiz collegato**.

### Copertura globale

- Anatomia Patologica: **63/63**;
- Infermieristica nel Materno: **62/62**;
- Paziente chirurgico: **60/60**;
- MedChiruFarmaco: **24/24**;
- Scienze della Salute: **49/49**;
- PPS: **18/18**;
- totale: **276 capitoli mappati / 276 lezioni attive**.

Scienze della Salute è stato strutturato sulla banca reale da 459 quesiti e sulle 459 spiegazioni verificate, poiché non risultano PDF universitari associati. La provenienza è dichiarata nell’interfaccia e tracciata in `SCIENZE_SALUTE_PROGRESS.md`.

### 4.1 Anatomia Patologica — COMPLETA 63/63

- Eziologia Generale: 8/8;
- Patologia Generale: 20/20;
- Immunologia: 16/16;
- Anatomia Patologica: 19/19.

Loader/pacchetti già consolidati; non rifare le 63 lezioni.

### 4.2 Infermieristica nel Materno — COMPLETA 62/62

- Infermieristica Pediatrica: 15/15;
- Pediatria: 15/15;
- Ostetricia: 18/18;
- Ginecologia: 14/14.

Non rifare le 62 lezioni.

### 4.3 Paziente chirurgico — COMPLETO 60/60

- Assistenza perioperatoria: 18/18;
- Diagnostica: 10/10;
- Psicologia: 10/10;
- Educazione terapeutica: 7/7;
- Terapia e farmacologia: 15/15.

Non rifare le 60 lezioni.

### 4.4 MedChiruFarmaco — COMPLETO V1 24/24

- Medicina Generale: **12/12**;
- Chirurgia Generale: **9/9**;
- Farmacologia: **3/3**.

Pacchetti:

- `data/lezioni-medchirufarmaco.json`;
- `data/lezioni-medchirufarmaco-medicina-generale.json`;
- `data/lezioni-medchirufarmaco-chirurgia-generale.json`;
- `data/lezioni-medchirufarmaco-farmacologia.json`;
- `lezioni-medchirufarmaco-loader.js`.

Fonti primarie: `Medicina Generale.pdf.pdf`, `Chirurgia Definitivo.pdf`, `FARMACO SCHEMI.odt`.

### 4.5 Scienze della Salute — COMPLETA 49/49

- Infermieristica nell’evoluzione storica: **12/12**;
- Epidemiologia: **8/8**;
- Igiene e medicina preventiva: **12/12**;
- Storia della medicina: **17/17**.

Fonti del percorso: banca attiva da **459 domande** + **459/459 spiegazioni avanzate** già verificate in StudyHub. Non viene simulata la presenza di un PDF originale: il pulsante fonte apre la banca quiz e usa l’etichetta **“Banca quiz + spiegazioni verificate”**.

Pacchetti:

- `data/lezioni-scienze-salute.json`;
- `data/lezioni-scienze-salute-infermieristica.json`;
- `data/lezioni-scienze-salute-epidemiologia.json`;
- `data/lezioni-scienze-salute-igiene.json`;
- `data/lezioni-scienze-salute-storia.json`;
- `lezioni-scienze-salute-loader.js`;
- `SCIENZE_SALUTE_PROGRESS.md`.

### 4.6 PPS — COMPLETO V1 18/18

- Infermieristica nella gestione dei problemi di salute cronici: **2/2**;
- Respiratorio / Pneumologia: **2/2**;
- Cardiovascolare e Cardiochirurgia: **2/2**;
- Ematologia: **2/2**;
- Oncologia: **2/2**;
- Neurologia: **2/2**;
- Gastroenterologia: **2/2**;
- Endocrinologia: **2/2**;
- Malattie infettive: **2/2**.

Quiz PPS: **360/360 domande + 360/360 spiegazioni avanzate**. Le incongruenze presenti nelle correzioni storiche non vengono corrette silenziosamente: gli item dubbi sono esclusi o tracciati in `PPS_PROGRESS.md`.

Materiali: quattro PDF catalogati; i binari non sono ancora pubblicati nel repository, quindi Lezioni rimanda alla scheda Materiali PPS senza creare link 404.

## 4.7 Registratore lezioni — V1 BETA ATTIVA

Motore:

- `registratore.html`;
- `registratore.css`;
- `registratore.js`;
- `registratore-config.js`;
- checkpoint `RECORDER_PROGRESS.md`;
- storage locale IndexedDB: `studyhub-recorder-v1`.

Funzioni attive:

- registrazione microfono via browser;
- input libero “Cosa stai registrando?” senza categorie/esami predefiniti;
- timer, pausa/riprendi/termina;
- salvataggio audio a chunk da 5 secondi;
- recupero delle sessioni interrotte;
- consenso obbligatorio alla registrazione;
- consenso separato e opzionale alla conservazione dell'audio, disattivato di default;
- eliminazione manuale dell'audio;
- eliminazione automatica dei chunk locali dopo trascrizione riuscita quando la conservazione non è autorizzata;
- archivio sessioni e anteprima audio locale;
- accesso dalla Home.

Il backend AI non è ancora attivo: `apiEndpoint` resta vuoto finché non esiste un endpoint server-side sicuro. Nessuna chiave API deve essere inserita nel frontend o nel repository pubblico.

## 5. Funzioni Lezioni da preservare

- navigazione Home → Lezioni → esame → materia → capitolo → lezione;
- breadcrumb;
- blocchi didattici sequenziali;
- concetti chiave;
- active recall;
- checkpoint A/B/C/D con risposta obbligatoria;
- feedback immediato;
- avanzamento lezione/materia/esame;
- stati `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- comando **Segna da ripassare**;
- progressi in `localStorage` separati dai quiz;
- schermata di completamento;
- passaggio **Studia → Allenati sul quiz**;
- accesso al materiale originale quando pubblicato;
- routing `?esame=...&materia=...`;
- responsive desktop/mobile.

## 6. Integrità delle banche quiz

Se il task riguarda UI, logica, spiegazioni, Materiali o Lezioni:

- non modificare il testo delle domande;
- non modificare le opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Eccezione: quando l'utente chiede esplicitamente di costruire/correggere una nuova banca, i quesiti possono essere adattati e corretti, ma ogni scostamento sostanziale dalla fonte storica va registrato nel checkpoint QA.

Domande con alternative semanticamente vincolate come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Preservare `lockOrder`.

## 7. Standard spiegazioni quiz

Ogni spiegazione avanzata deve:

- spiegare perché la risposta corretta è corretta;
- spiegare perché ciascuna delle altre tre è errata;
- restare agganciata all'opzione originale anche dopo shuffle;
- avere fallback fail-safe: problemi nelle spiegazioni non devono impedire avvio o completamento del quiz.

Stato:

- Paziente chirurgico: **462/462**;
- Scienze della Salute: **459/459**;
- Anatomia Patologica: **300/300**;
- MedChiruFarmaco: **65/65**;
- PPS: **360/360**;
- Infermieristica nel Materno: **240/300** (Infermieristica Pediatrica 137/137; Pediatria 55/55; Ostetricia 48/53; Ginecologia 0/55; ripresa da 241).

### MedChiruFarmaco QA

Fonte primaria banca V1: prova AulaWeb del 27/01/2015. Tre adattamenti sono tracciati in `MEDCHIRUFARMACO_PROGRESS.md`:

- mcf054: corticosteroidi;
- mcf063: rapido sollievo dell'angina;
- mcf064: paracetamolo distinto correttamente dai FANS.

Le raccolte `Domande Medicina Chirurgia e Farmacologia.pdf`, `Domande 1.pdf` e `Domande 2.pdf` restano fonti per una futura espansione oltre la V1 da 65 domande.

### Diagnostica standalone

La banca `Diagnostica` da **80 domande** è un esame autonomo separato dal blocco Diagnostica già incluso in `Paziente chirurgico` (76 domande). Per richiesta esplicita dell'utente, usa le correzioni già presenti nel file sorgente e **non applica** lo standard delle spiegazioni avanzate “perché corretta/perché errata”. Il quiz mantiene correzione immediata, randomizzazione, punteggio, accuratezza, ripasso errori e progressi locali.

## 8. Architettura principale

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `materiali.html`, `materiali.css`, `materiali.js`, `data/materiali.json`;
- `materiali-medchirufarmaco-loader.js`, `data/materiali-medchirufarmaco.json`;
- `lezioni.html`, `lezioni.css`, `lezioni.js`, `data/lezioni.json`;
- loader/pacchetti Anatomia, Materno, Paziente chirurgico, MedChiruFarmaco e Scienze della Salute;
- `scienze-salute.html`, `scienze-salute-app.html`, `scienze-salute-explanations.js`;
- `anatomia-patologica.html`, `anatomia-patologica-explanations.js`;
- `infermieristica-materno.html`, `infermieristica-materno-plus.html`, `infermieristica-materno-explanations.js`;
- `paziente-chirurgico.html` + enhancer spiegazioni;
- `diagnostica.html` + `data/diagnostica-001.json`–`004.json` — esame autonomo da 80 domande, feedback di sola correzione;
- `medchirufarmaco.html` + sei pacchetti banca/spiegazioni;
- `pps.html` + `data/pps-001.json`–`002.json` + spiegazioni PPS + loader Materiali/Lezioni;
- `PPS_PROGRESS.md`;
- `MEDCHIRUFARMACO_PROGRESS.md`;
- `registratore.html`, `registratore.css`, `registratore.js`, `registratore-config.js` — StudyHub Recorder V1;
- `RECORDER_PROGRESS.md` — checkpoint e contratto privacy/backend del Registratore;
- `data/` — banche, spiegazioni, cataloghi e pacchetti Lezioni;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud. Quiz e Lezioni usano namespace separati. MedChiruFarmaco usa `studyhub_medchirufarmaco_v1`. Il Registratore usa IndexedDB `studyhub-recorder-v1` per sessioni e chunk audio locali.

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

## 10. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 11. Roadmap immediata

1. preservare intatti i sette esami attivi;
2. PPS: **360/360 quiz + 360/360 spiegazioni + 18/18 lezioni** — non rifare; dettagli e QA in `PPS_PROGRESS.md`;
3. MedChiruFarmaco V1: **65/65 quiz + 65/65 spiegazioni + 24/24 lezioni** — non rifare;
4. possibile futura espansione MedChiruFarmaco usando le raccolte di domande aggiuntive, con QA separato;
5. completare separatamente le spiegazioni quiz Materno da 241 a 300;
6. Scienze della Salute: **459/459 quiz + 459/459 spiegazioni + 49/49 lezioni** — non rifare;
7. pubblicare i quattro binari MedChiruFarmaco e i quattro binari PPS nella Biblioteca quando la pipeline di upload binario del repository sarà disponibile.
8. **StudyHub Recorder V1 ATTIVO**: pagina, stile, registrazione browser, consenso, pause/riprendi, chunk da 5 s in IndexedDB, recupero locale, anteprima e cancellazione audio sono implementati. La casella **“Il docente autorizza la conservazione dell’audio oltre il tempo necessario alla trascrizione”** è non selezionata di default. Se non selezionata, l'audio è temporaneo e viene eliminato automaticamente solo dopo una trascrizione completata con successo. Il backend AI sicuro per trascrizione/riassunto è predisposto ma non ancora collegato; dettagli in `RECORDER_PROGRESS.md`.
