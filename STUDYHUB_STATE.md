# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **14 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub bisogna leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria; vecchi export o copie locali non vanno considerati automaticamente correnti.

La priorità generale è la **non regressione**: una modifica puntuale non autorizza a cambiare domande, opzioni, risposte corrette, grafica, progressi o logica non coinvolti dal task.

---

## 2. Stato corrente

StudyHub è una web app statica HTML/CSS/JavaScript con **4 esami attivi e 1.521 domande**:

| Esame | Domande | Sezioni |
|---|---:|---|
| Scienze della Salute | 459 | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| Anatomia Patologica | 300 | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| Infermieristica nel Materno | 300 | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| Paziente chirurgico | 462 | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |

Farmacologia è visibile in homepage come **in preparazione**.

---

## 3. Funzioni da preservare

- homepage unica;
- mix completo o focus su singola sezione;
- sessioni 20/30/50/100/tutte;
- ordine domande casuale o ordine banca quando previsto;
- rimescolamento A/B/C/D;
- distribuzione il più possibile bilanciata e non prevedibile della risposta corretta;
- evitare lunghe serie della stessa lettera e pattern meccanici;
- evidenziazione risposta corretta ed eventuale risposta errata scelta;
- feedback immediato;
- punteggio, risposte date, accuratezza, barra progresso;
- riepilogo finale;
- ripasso errori;
- reset progressi;
- progressi in `localStorage`;
- interfaccia responsive/mobile;
- ritorno semplice alla Home.

### Opzioni semanticamente vincolate

Domande con alternative come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”**, **“Tutte corrette”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Il principio `lockOrder` va preservato.

---

## 4. Integrità delle banche

Se il task riguarda UI, logica, spiegazioni o infrastruttura:

- non modificare il testo delle domande;
- non modificare le 4 opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Se emerge un quesito probabilmente errato, ambiguo, obsoleto o discordante, **non correggerlo di nascosto**: va segnalato come QA e modificato solo con autorizzazione esplicita.

Per contenuti medici/infermieristici dare priorità ai materiali universitari forniti dall'utente; quando serve verifica esterna usare fonti autorevoli.

---

## 5. Spiegazioni: standard concordato e stato reale

Lo standard desiderato per **Scienze della Salute** e **Paziente chirurgico** è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta.

### Paziente chirurgico — COMPLETO 462/462

`paziente-chirurgico.html` usa il runtime stabile:

- carica i 13 file della banca domande;
- verifica il totale di **462**;
- verifica ID, quattro opzioni e indice corretto;
- abilita il quiz senza dipendere dalle spiegazioni avanzate.

Le spiegazioni avanzate vengono caricate **solo dopo** che il quiz è già avviabile. Il caricamento usa `Promise.allSettled`; un file mancante o non valido non può bloccare avvio, svolgimento o completamento dell'esame. Quando una spiegazione avanzata non è disponibile viene usato automaticamente il campo base `why`.

Copertura attiva:

- Diagnostica `di1–di76` = 76/76;
- Educazione terapeutica `ed1–ed54` = 54/54;
- Psicologia `ps1–ps66` = 66/66;
- Terapia `te1–te266` = 266/266;
- **totale 462/462**.

File collegati: `data/paziente-chirurgico-explanations-001.json` → `029.json`.

Checkpoint dettagliato: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute — spiegazioni avanzate 321/459

L'implementazione attiva è:

- `index.html` apre `scienze-salute.html`;
- `scienze-salute.html` è il wrapper che carica `scienze-salute-app.html` in iframe;
- `scienze-salute-app.html` è il motore originale con l'intera banca di **459 domande** e non viene modificato durante il lavoro sulle spiegazioni;
- `scienze-salute-explanations.js` è l'enhancer opzionale fail-safe.

File avanzati collegati:

- `001.json` → `1–40`
- `002.json` → `41–80`
- `003.json` → `81–100`
- `004.json` → `101–120`
- `005.json` → `121`
- `006.json` → `122–161`
- `007.json` → `162–201`
- `008.json` → `202–241`
- `009.json` → `242–281`
- `010.json` → `282–321`

Percorsi completi: `data/scienze-salute-explanations-XXX.json`.

#### Copertura progressiva per ID banca

- `1–121` → Infermieristica nell'evoluzione storica;
- `122–176` → Epidemiologia;
- `177–220` → Igiene e medicina preventiva;
- `221–270` → Storia della medicina;
- `271–320` → Igiene e medicina preventiva;
- `321` → Storia della medicina;
- **totale continuo coperto: `1–321` = 321/459**.

**Importante:** dalla parte centrale/finale della banca i macroargomenti non restano sempre in intervalli unici e contigui. Alcune materie ricompaiono più avanti. Lo stato va quindi registrato per ID effettivamente completati, senza dichiarare una materia globalmente completa solo perché termina un tratto consecutivo.

L'enhancer:

- non è necessario all'avvio o allo svolgimento del quiz;
- carica i dati avanzati con `Promise.allSettled`;
- valida `summary` e quattro motivazioni;
- associa le motivazioni alle opzioni originali tramite il testo, mantenendole corrette dopo lo shuffle A/B/C/D;
- arricchisce il feedback già prodotto dal motore originale;
- se enhancer, JSON o singola entry falliscono, mantiene il feedback base `q.e` e non blocca il quiz.

Per una entry valida il feedback mostra esito, risposta corretta nella posizione effettiva, concetto chiave e quattro motivazioni separate con etichetta `CORRETTA` / `ERRATA`.

**Regola fondamentale: nessun problema delle spiegazioni avanzate deve mai impedire avvio, svolgimento o completamento del quiz.**

Checkpoint dettagliato: `SCIENZE_SALUTE_PROGRESS.md`.

---

## 6. Architettura corrente

File principali:

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` — wrapper attivo di Scienze della Salute;
- `scienze-salute-app.html` — motore originale e banca inline da 459 domande;
- `scienze-salute-explanations.js` — enhancer opzionale;
- `data/scienze-salute-explanations-001.json` → `010.json` — spiegazioni avanzate `1–321`;
- `SCIENZE_SALUTE_PROGRESS.md` — checkpoint specifico Scienze;
- `anatomia-patologica.html`;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html` — runtime stabile + spiegazioni avanzate complete;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche domande e spiegazioni;
- `.nojekyll` — pubblicazione statica.

I progressi sono locali al browser; non ci sono account, database remoto o sync cloud.

---

## 7. Workflow obbligatorio per modifiche future

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi e sezioni dopo modifiche dati;
7. verificare associazione risposta corretta/opzioni dopo shuffle;
8. testare almeno: avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. mantenere responsive/mobile;
10. aggiornare questo file quando cambia lo stato reale del progetto.

### Lavoro a blocchi

Per revisione estesa di banche o spiegazioni lavorare in **blocchi controllati di circa 40–60 domande**, con checkpoint GitHub tra i blocchi.

- Paziente chirurgico: spiegazioni complete **462/462**.
- Scienze della Salute: spiegazioni complete in sequenza **1–321**; punto di ripresa **322**.

Per Scienze continuare nell'ordine reale della banca e annotare gli intervalli dei macroargomenti quando cambiano. Non presumere che un macroargomento occupi un unico intervallo continuo.

### Continuità tra chat

Se la conversazione diventa molto lunga, segnalare proattivamente che conviene aprire una nuova chat. Prima dell'handoff salvare il lavoro nel `main` o in un checkpoint affidabile e registrare il punto esatto da cui riprendere.

---

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

---

## 9. Roadmap immediata

1. **Paziente chirurgico: spiegazioni avanzate complete 462/462 con architettura fail-safe.**
2. **Scienze della Salute: spiegazioni avanzate attive 1–321 con enhancer opzionale fail-safe.**
3. Proseguire Scienze della Salute dalla **domanda 322**, seguendo l'ordine reale della banca.
4. Mantenere le banche originali inalterate durante il lavoro sulle spiegazioni.
5. QA separato dei quesiti dubbi o obsoleti, solo con autorizzazione esplicita a modificare la banca.

Farmacologia resta una futura banca in preparazione.
