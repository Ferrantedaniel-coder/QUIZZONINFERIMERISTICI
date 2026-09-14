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

Lo standard desiderato per **Scienze della Salute** e **Paziente chirurgico** resta:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta.

### Paziente chirurgico — runtime stabile + pilot controllato

L'esame resta basato sul runtime stabile di `paziente-chirurgico.html`:

- carica i 13 file della banca domande;
- verifica il totale di **462**;
- verifica ID, quattro opzioni e indice corretto;
- abilita il quiz senza dipendere dalle spiegazioni avanzate.

È attivo un **pilot non bloccante di 40 domande**, limitato a **Diagnostica `di1–di40`**.

Il pilot usa soltanto:

- `data/paziente-chirurgico-explanations-001.json`;
- `data/paziente-chirurgico-explanations-002.json`;
- `data/paziente-chirurgico-explanations-003.json`;
- `data/paziente-chirurgico-explanations-004.json`.

Le spiegazioni avanzate vengono caricate **dopo** che il quiz è già stato reso avviabile. Il caricamento usa `Promise.allSettled`; un file mancante o non valido non blocca l'esame. Ogni entry viene accettata solo se corrisponde a una domanda esistente e contiene una motivazione valida per tutte e quattro le opzioni.

Per `di1–di40`, se l'entry avanzata è disponibile, il feedback mostra:

- esito corretto/errato;
- risposta corretta nella posizione effettivamente mostrata;
- concetto chiave;
- quattro motivazioni separate, una per ogni alternativa;
- etichetta `CORRETTA` / `ERRATA`.

Se l'entry avanzata non è disponibile, oppure per tutte le domande fuori dal pilot, viene usato automaticamente il campo base `why` della banca.

**Regola fondamentale: nessun problema delle spiegazioni avanzate deve mai impedire avvio, svolgimento o completamento dell'esame.**

Checkpoint dettagliato: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute

Resta da portare allo standard superiore delle spiegazioni, ma solo dopo che l'architettura pilot di Paziente chirurgico sarà stata confermata stabile e riutilizzabile.

---

## 6. Architettura corrente

File principali:

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` / `scienze-salute-app.html`;
- `anatomia-patologica.html`;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html` — runtime stabile + pilot spiegazioni non bloccante;
- `paziente-chirurgico-explanations.js` — file legacy, non caricato dal runtime attivo;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029` — archivio completo delle spiegazioni; solo `001`→`004` sono attualmente caricati dal pilot;
- `PAZIENTE_CHIRURGICO_PROGRESS.md` — checkpoint specifico;
- `data/` — banche domande;
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

Per revisione estesa di banche o spiegazioni lavorare in **blocchi controllati di circa 40–60 domande**, con checkpoint GitHub tra i blocchi. Il checkpoint deve indicare esame, intervallo completato, ultima domanda, file modificati, commit e punto di ripresa.

Per Paziente chirurgico **non estendere oltre `di40` finché il pilot pubblicato non è stato confermato stabile**. Dopo conferma, il prossimo blocco parte da `di41` mantenendo la stessa architettura fail-safe.

### Continuità tra chat

Se la conversazione diventa molto lunga, segnalare proattivamente che conviene aprire una nuova chat. Prima dell'handoff salvare il lavoro nel `main` o in un checkpoint affidabile e registrare il punto esatto da cui riprendere. Non promettere un contatore preciso dei token residui.

---

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

---

## 9. Roadmap immediata

1. **Verificare il pilot Paziente chirurgico `di1–di40`.**
2. Se stabile, estendere le spiegazioni avanzate dal blocco `di41` in poi, sempre senza dipendenza dal boot del quiz.
3. Successivamente completare Scienze della Salute allo stesso standard superiore delle spiegazioni.
4. QA separato dei quesiti di Paziente chirurgico già segnalati, solo con autorizzazione esplicita a modificare la banca.

Farmacologia resta una futura banca in preparazione.