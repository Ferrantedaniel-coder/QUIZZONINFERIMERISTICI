# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **14 settembre 2026**
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**
> Branch di riferimento: **main**

## 1. Scopo del file

Questo file deve essere letto **prima di qualsiasi modifica a StudyHub**. Serve a evitare di lavorare su versioni vecchie, perdere funzionalità già presenti o modificare involontariamente banche domande già approvate.

La fonte tecnica primaria è sempre il **repository GitHub aggiornato**, in particolare il branch `main`. File HTML esportati, copie locali o vecchi `index.html` non devono essere considerati automaticamente il master.

---

## 2. Stato corrente del progetto

StudyHub è una **web app statica per simulazioni d'esame universitarie**, organizzata come libreria unica di esami. La homepage attuale espone **4 esami attivi per un totale di 1.521 domande**.

| Esame | Domande | Sezioni / macroargomenti |
|---|---:|---|
| **Scienze della Salute** | **459** | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| **Anatomia Patologica** | **300** | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| **Infermieristica nel Materno** | **300** | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| **Paziente chirurgico** | **462** | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |

Totale: **1.521 domande**.

Nella homepage è inoltre presente **Farmacologia** come esame **in preparazione / futuro**.

### Stato spiegazioni avanzate

- **Paziente chirurgico: COMPLETO 462/462** al nuovo standard con spiegazione della risposta corretta e motivazione specifica delle tre alternative errate.
- **Scienze della Salute: ancora da completare** al medesimo standard.

Per Paziente chirurgico il dettaglio operativo è registrato in `PAZIENTE_CHIRURGICO_PROGRESS.md`.

---

## 3. Funzioni che StudyHub deve mantenere

Le seguenti funzioni costituiscono il comportamento base del progetto e **non devono essere rimosse accidentalmente durante gli aggiornamenti**:

- homepage unica con scelta dell'esame;
- possibilità di svolgere l'intero esame in modalità **mix** oppure concentrarsi su una singola sezione / macroargomento;
- sessioni da **20, 30, 50, 100 domande oppure tutte quelle disponibili**;
- ordine delle domande casuale oppure ordine banca, quando previsto;
- rimescolamento delle alternative **A/B/C/D**;
- distribuzione della risposta corretta il più possibile **bilanciata e non prevedibile**;
- evitare lunghe sequenze della stessa lettera corretta e pattern meccanici facilmente riconoscibili;
- evidenziazione visiva della risposta corretta e dell'eventuale risposta errata scelta;
- spiegazione immediata dopo la conferma;
- punteggio della sessione;
- numero di risposte date;
- percentuale di accuratezza;
- barra di avanzamento;
- riepilogo finale, anche per sezione quando previsto;
- possibilità di **ripassare soltanto gli errori**;
- possibilità di azzerare i progressi;
- salvataggio dei progressi nel browser tramite **localStorage**;
- interfaccia responsive e utilizzabile anche da smartphone;
- ritorno semplice alla homepage;
- coerenza grafica tra i diversi esami.

### Eccezione importante: opzioni vincolate

Quando una domanda contiene alternative semanticamente vincolate alla posizione, ad esempio **“Tutte le precedenti”**, l'ordine non deve essere alterato in modo da rendere la domanda logicamente errata. Il sistema del Materno usa già una logica di `lockOrder` per questi casi e tale principio va preservato. **Paziente chirurgico applica ora lo stesso principio direttamente nel proprio motore**, riconoscendo anche formulazioni equivalenti come “nessuna delle precedenti”, “tutte vere” e “tutte corrette”.

---

## 4. Regole sulle banche domande

### 4.1 Integrità delle domande approvate

Le banche già inserite sono materiale d'esame e non devono essere riscritte senza una richiesta esplicita.

Quando il compito riguarda soltanto grafica, logica del quiz, spiegazioni o infrastruttura:

- **non modificare il testo della domanda**;
- **non modificare le quattro opzioni**;
- **non cambiare quale risposta è corretta**;
- **non eliminare domande**;
- **non aggiungere nuove domande** salvo richiesta specifica;
- mantenere ID, sezione e associazione domanda/risposta coerenti.

Se durante un lavoro sulle spiegazioni emerge una domanda probabilmente errata, obsoleta o internamente incoerente, **non correggerla di nascosto**. Va segnalata come punto QA e la modifica alla banca deve essere affrontata separatamente con autorizzazione esplicita.

### 4.2 Qualità scientifica

Per contenuti medici e infermieristici:

- non inventare informazioni;
- dare priorità ai materiali universitari forniti dall'utente;
- quando serve verificare o correggere un contenuto, usare fonti mediche o istituzionali autorevoli;
- evitare correzioni arbitrarie della banca senza necessità o senza che la modifica rientri nel lavoro richiesto;
- mantenere il livello adatto a una simulazione d'esame universitario;
- distinguere chiaramente ciò che deriva dagli appunti del corso da eventuali aggiornamenti scientifici esterni.

### 4.3 Distribuzione A/B/C/D

La lettera corretta deve risultare fortemente variabile. Obiettivo:

- utilizzare tutte le lettere A/B/C/D in modo equilibrato;
- evitare più di due risposte corrette consecutive con la stessa lettera quando tecnicamente possibile;
- evitare pattern ripetitivi evidenti come `ABABAB`;
- non introdurre bias stabile verso A o B;
- il rimescolamento non deve mai rompere la corrispondenza tra risposta corretta e spiegazione.

---

## 5. Regola concordata sulle spiegazioni

### Standard generale

Una spiegazione utile **non deve limitarsi a ripetere la risposta corretta**. Deve chiarire il principio clinico, scientifico, storico o assistenziale che rende corretta la soluzione.

### Standard superiore concordato

Per:

1. **Scienze della Salute**
2. **Paziente chirurgico**

il feedback deve spiegare:

- **perché la risposta corretta è giusta**;
- **perché ciascuna delle altre tre alternative è sbagliata**.

Questa modifica riguarda **esclusivamente le spiegazioni**, salvo successivo task QA esplicitamente autorizzato.

Per questa attività è tassativamente richiesto mantenere invariati:

- testo delle domande;
- quattro opzioni di risposta;
- risposta corretta;
- numero delle domande;
- macroargomenti / sezioni;
- logica di selezione;
- funzionamento generale del quiz;
- rimescolamento A/B/C/D;
- punteggio, accuratezza, progressi e ripasso errori.

### Stato tecnico al 14/09/2026

**Paziente chirurgico è stato completato ed è ora protetto da verifica runtime integrata.**

Il quiz attivo utilizza direttamente `paziente-chirurgico.html` come motore unico per:

- caricamento delle 462 domande;
- caricamento del manifest `data/paziente-chirurgico-explanations-manifest.json`;
- caricamento dei file `data/paziente-chirurgico-explanations-001.json` → `029.json`;
- verifica preventiva che siano presenti **462/462 spiegazioni**;
- verifica che **ogni singola opzione di ogni domanda** abbia una motivazione specifica;
- rendering del concetto chiave e dei quattro riquadri `CORRETTA` / `ERRATA` dopo la conferma;
- mantenimento dell'associazione fra alternativa originale e spiegazione dopo il rimescolamento A/B/C/D;
- blocco dell'avvio del quiz se banca o spiegazioni risultano incomplete.

Il precedente file `paziente-chirurgico-explanations.js` può restare nel repository come artefatto storico, ma **non è più il motore attivo della pagina**. La pagina non dipende più da un monkey-patch esterno o da un fallback silenzioso sul vecchio campo `why`.

Per evitare versioni obsolete in cache, la homepage apre Paziente chirurgico con un parametro di versione e i file JSON vengono richiesti con cache disabilitata/versionata.

Durante il lavoro sono stati marcati con `ATTENZIONE QA` alcuni quesiti potenzialmente discordanti, datati o ambigui; il dettaglio si trova in `PAZIENTE_CHIRURGICO_PROGRESS.md`. Le risposte registrate nella banca non sono state modificate.

**Scienze della Salute resta il prossimo esame da portare integralmente allo stesso standard.**

---

## 6. Architettura corrente

Il progetto è una web app statica basata su HTML/CSS/JavaScript e file dati nel repository.

Elementi principali attuali:

- `index.html` — homepage / catalogo esami;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` / `scienze-salute-app.html` — Scienze della Salute;
- `anatomia-patologica.html` — Anatomia Patologica;
- `infermieristica-materno.html` — Infermieristica nel Materno;
- `paziente-chirurgico.html` — Paziente chirurgico e **motore attivo integrato delle spiegazioni avanzate**;
- `paziente-chirurgico-explanations.js` — file legacy non più caricato dalla pagina attiva;
- `data/paziente-chirurgico-explanations-manifest.json` — manifest delle spiegazioni avanzate;
- `data/paziente-chirurgico-explanations-001.json` → `029.json` — spiegazioni per tutte le 462 domande di Paziente chirurgico;
- `PAZIENTE_CHIRURGICO_PROGRESS.md` — checkpoint e QA dell'esame;
- `data/` — banche domande suddivise in file JSON o JSON compressi;
- `.nojekyll` — supporto alla pubblicazione statica.

I progressi degli utenti sono attualmente **locali al dispositivo/browser** attraverso `localStorage`. Non esistono, nello stato corrente, account utente, sincronizzazione cloud dei progressi o database applicativo.

---

## 7. Regole operative per le modifiche future

Prima di modificare StudyHub:

1. leggere questo file;
2. leggere il **branch `main` aggiornato** del repository;
3. identificare quali file sono realmente attivi nella versione corrente;
4. evitare di partire da vecchi export o copie locali quando il repository contiene una versione più recente;
5. applicare la modifica nel punto più circoscritto possibile;
6. preservare tutte le funzioni non coinvolte dalla richiesta;
7. controllare conteggi delle domande e sezioni dopo ogni modifica alle banche;
8. verificare che risposta corretta, opzioni e spiegazioni rimangano correttamente associate dopo il rimescolamento;
9. verificare almeno il flusso: avvio quiz → risposta → feedback → navigazione → risultato → ripasso errori → ritorno Home;
10. mantenere responsive layout e leggibilità mobile;
11. aggiornare questo `STUDYHUB_STATE.md` quando una modifica cambia realmente lo stato del progetto, una regola o la roadmap.

### 7.1 Lavoro a blocchi controllati

Per lavori estesi sulle banche domande — soprattutto revisione, correzione o riscrittura delle spiegazioni — si deve procedere **a blocchi controllati, idealmente di 40–60 domande per volta**.

Questa dimensione non rappresenta un limite di lettura, ma una regola di qualità. Serve a:

- mantenere alta l'attenzione su ogni singola domanda;
- controllare che le spiegazioni siano scientificamente corrette;
- evitare spiegazioni generiche, automatiche o ripetitive;
- verificare che le motivazioni delle alternative errate siano realmente specifiche;
- ridurre il rischio di regressioni o associazioni errate tra domanda, risposta e spiegazione;
- rendere ogni tranche facilmente verificabile e recuperabile.

Dopo ogni blocco completato, quando tecnicamente appropriato, il lavoro deve essere **salvato nel master GitHub** o comunque portato a un checkpoint chiaramente identificabile prima di iniziare il blocco successivo.

Il checkpoint deve permettere di sapere con precisione almeno:

- quale esame si sta lavorando;
- quali domande sono state completate;
- qual è l'ultima domanda completata;
- quali file sono stati modificati;
- quale commit contiene il lavoro completato, quando disponibile;
- da quale domanda o blocco riprendere.

### 7.2 Sicurezza della continuità tra chat

Durante lavori molto lunghi, ChatGPT deve **segnalare proattivamente quando la conversazione sta accumulando abbastanza materiale da rendere preferibile un passaggio a una nuova chat**.

Non esiste un contatore preciso e affidabile del tipo “mancano N token al limite”, quindi **non va promesso un allarme matematico o una soglia numerica esatta**. La regola è invece riconoscere per tempo una conversazione diventata molto estesa e proporre un handoff sicuro **prima** che la continuità del lavoro possa diventare fragile.

L'avviso deve essere concreto, ad esempio:

> “Abbiamo completato fino alla domanda 240 e il lavoro è salvato nel master. Da qui conviene aprire una nuova chat, leggere `STUDYHUB_STATE.md` e ripartire dalla domanda 241.”

Prima di consigliare il cambio chat, bisogna assicurarsi che il lavoro già completato sia stato salvato in un checkpoint affidabile, idealmente nel branch `main`.

In questo modo il cambio di conversazione **non deve comportare perdita del lavoro già svolto**: la nuova chat recupera lo stato dal repository, da questo file e dal checkpoint indicato.

Se la conversazione è già molto lunga, non va avviato inutilmente un nuovo blocco enorme: si completa e salva il blocco corrente, si registra il punto di ripresa e si effettua l'handoff.

### Principio di non regressione

Una richiesta puntuale non autorizza a rifare parti non coinvolte. Esempio: se viene richiesto di migliorare le spiegazioni, non si devono contemporaneamente riscrivere domande, cambiare grafica, eliminare progressi o alterare la logica del quiz.

---

## 8. GitHub: repository e autorizzazioni operative

Repository collegato:

`Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`

Branch master operativo:

`main`

La connessione GitHub disponibile a ChatGPT ha accesso al repository e, al momento della redazione di questo file, espone permessi GitHub di **pull, push, maintain e admin**.

### Autorizzazione concessa per il progetto

Per StudyHub, ChatGPT può usare la connessione GitHub per:

- leggere il repository e lo stato corrente dei file;
- confrontare versioni e commit;
- creare nuovi file richiesti dal progetto;
- aggiornare file esistenti quando la modifica è stata richiesta dall'utente;
- creare i commit necessari alle modifiche richieste;
- controllare il risultato nel repository dopo la scrittura.

I permessi tecnici del connettore **non vanno interpretati come autorizzazione automatica a operazioni distruttive o non richieste**. Cancellazioni massive, force update, modifiche estranee al task o interventi sulle impostazioni del repository devono essere evitati salvo richiesta esplicita.

---

## 9. Roadmap attualmente concordata / visibile

### Priorità immediata

**Paziente chirurgico: completato 462/462 per il nuovo standard di spiegazione e runtime integrato con verifica completa prima dell'avvio.**

La priorità rimanente è portare **Scienze della Salute** allo stesso standard:

- motivazione della corretta;
- motivazione specifica per ciascuna alternativa errata;
- nessuna modifica al contenuto del quiz oltre alle spiegazioni;
- lavorazione in **blocchi controllati da circa 40–60 domande**, con checkpoint GitHub tra i blocchi.

Per Paziente chirurgico resta disponibile un futuro **task QA separato** sui quesiti marcati `ATTENZIONE QA`; tale task potrà modificare domanda/opzioni/soluzioni solo dopo autorizzazione esplicita dell'utente.

### Espansione del catalogo

StudyHub è pensato come **libreria unica di più esami**. Le nuove banche devono essere aggiunte alla stessa homepage mantenendo struttura, grafica e comportamento coerenti con gli esami già presenti.

**Farmacologia** è già indicata nella homepage come futura banca in preparazione.

### Evoluzioni non ancora approvate come requisito

Account utente, database remoto, sincronizzazione cloud, classifiche, IA integrata, app nativa/PWA o altre funzioni avanzate **non devono essere considerate già approvate** solo perché tecnicamente possibili. Se verranno decise in futuro, dovranno essere aggiunte a questo file.

---

## 10. Regola di continuità per nuove chat / nuovi agenti

Chiunque lavori successivamente sul progetto deve assumere che:

- questo file descrive le decisioni consolidate;
- il repository GitHub `main` descrive l'implementazione reale più recente;
- in caso di differenza tra una vecchia copia locale e GitHub, **prevale il repository aggiornato**;
- in caso di differenza tra una proposta futura e una regola esplicitamente consolidata qui, **prevale la regola consolidata** finché l'utente non la modifica;
- dopo cambiamenti rilevanti, questo file deve essere aggiornato per evitare perdita di contesto;
- nei lavori estesi si deve riprendere dall'ultimo **checkpoint dichiarato**, non ricominciare arbitrariamente da zero;
- se la chat precedente ha segnalato un punto di handoff, quel punto deve essere verificato sul master prima di continuare.

---

## 11. Snapshot sintetico

**StudyHub oggi:**

- 4 esami attivi;
- 1.521 domande;
- quiz per mix o singola sezione;
- 20/30/50/100/tutte;
- A/B/C/D rimescolate e bilanciate;
- feedback immediato;
- punteggio e accuratezza;
- riepilogo;
- ripasso errori;
- progressi in `localStorage`;
- interfaccia responsive;
- repository GitHub come master;
- lavori estesi gestiti in **blocchi controllati da 40–60 domande**;
- checkpoint e handoff preventivo tra chat per proteggere qualità e continuità;
- **Paziente chirurgico completo 462/462 con spiegazione della corretta + spiegazione specifica delle tre errate**;
- Paziente chirurgico usa **verifica runtime 462/462 integrata nella pagina**, senza fallback silenzioso al vecchio `why`;
- punti clinico-scientifici dubbi di Paziente chirurgico preservati e marcati come QA senza modificare di nascosto la banca.

**Prossimo vincolo prioritario:** completare **Scienze della Salute** con lo stesso standard di spiegazione, procedendo per blocchi controllati e senza alterare la banca salvo task QA separato.