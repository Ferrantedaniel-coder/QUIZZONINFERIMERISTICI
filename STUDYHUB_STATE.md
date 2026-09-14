# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **14 settembre 2026**  
> Repository: **Ferrantedaniel-coder/QUIZZONINFERIMERISTICI**  
> Branch operativo: **main**

## 1. Regola primaria

Prima di qualsiasi modifica a StudyHub leggere questo file e il `main` aggiornato. Il repository GitHub è la fonte tecnica primaria.

La priorità generale è la **non regressione**: una modifica puntuale non autorizza a cambiare domande, opzioni, risposte corrette, grafica, progressi o logica non coinvolti dal task.

## 2. Stato corrente

StudyHub è una web app statica HTML/CSS/JavaScript con **4 esami attivi e 1.521 domande**:

| Esame | Domande | Sezioni |
|---|---:|---|
| Scienze della Salute | 459 | Infermieristica nell'evoluzione storica; Epidemiologia; Igiene e medicina preventiva; Storia della medicina |
| Anatomia Patologica | 300 | Microbiologia 100; Eziologia 50; Immunologia 50; Anatomia Patologica 100 |
| Infermieristica nel Materno | 300 | Infermieristica Pediatrica 137; Pediatria 55; Ostetricia 53; Ginecologia 55 |
| Paziente chirurgico | 462 | Diagnostica 76; Educazione terapeutica 54; Psicologia 66; Terapia 266 |

Farmacologia è visibile in homepage come **in preparazione**.

## 3. Funzioni da preservare

- homepage unica;
- mix completo o focus sulla singola sezione;
- sessioni 20/30/50/100/tutte;
- ordine domande casuale o ordine banca quando previsto;
- rimescolamento A/B/C/D;
- distribuzione delle risposte corrette il più possibile bilanciata e non prevedibile quando si creano nuove banche;
- evitare lunghe serie della stessa lettera e pattern meccanici;
- evidenziazione della risposta corretta e dell'eventuale risposta errata scelta;
- feedback immediato;
- punteggio, risposte date, accuratezza e barra progresso;
- riepilogo finale;
- ripasso errori;
- reset progressi;
- progressi in `localStorage`;
- interfaccia responsive/mobile;
- ritorno semplice alla Home.

### Opzioni semanticamente vincolate

Domande con alternative come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”**, **“Tutte corrette”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Il principio `lockOrder` va preservato.

## 4. Integrità delle banche

Se il task riguarda UI, logica, spiegazioni o infrastruttura:

- non modificare il testo delle domande;
- non modificare le 4 opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Se emerge un quesito probabilmente errato, ambiguo, obsoleto o discordante, **non correggerlo di nascosto**: segnalarlo come QA e modificarlo solo con autorizzazione esplicita.

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Quando serve verifica, aggiornamento o disambiguazione utilizzare fonti autorevoli, incluse **PubMed/PMC, NCBI/NIH, WHO, CDC e linee guida pertinenti**. Le fonti esterne servono a verificare o precisare il contenuto, non autorizzano modifiche silenziose della banca.

## 5. Standard delle spiegazioni

Per **Scienze della Salute**, **Paziente chirurgico** e **Anatomia Patologica** lo standard è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta;
- mantenere le motivazioni agganciate al testo originale delle opzioni, così da seguirne correttamente lo shuffle A/B/C/D;
- mantenere un fallback fail-safe: un problema nelle spiegazioni avanzate non deve mai impedire avvio, svolgimento o completamento del quiz.

### Paziente chirurgico — COMPLETO 462/462

Copertura:

- Diagnostica `di1–di76` = 76/76;
- Educazione terapeutica `ed1–ed54` = 54/54;
- Psicologia `ps1–ps66` = 66/66;
- Terapia `te1–te266` = 266/266;
- **totale 462/462**.

File: `data/paziente-chirurgico-explanations-001.json` → `029.json`.  
Checkpoint: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute — COMPLETO 459/459

Implementazione attiva:

- `index.html` apre `scienze-salute.html`;
- `scienze-salute.html` carica `scienze-salute-app.html` in iframe;
- `scienze-salute-app.html` è il motore originale con l'intera banca di 459 domande;
- `scienze-salute-explanations.js` è l'enhancer opzionale fail-safe;
- `data/scienze-salute-explanations-001.json` → `013.json` coprono `1–459`.

Copertura completa per ID banca:

- `1–121` Infermieristica nell'evoluzione storica;
- `122–176` Epidemiologia;
- `177–220` Igiene e medicina preventiva;
- `221–270` Storia della medicina;
- `271–320` Igiene e medicina preventiva;
- `321–370` Storia della medicina;
- `371–379` Infermieristica nell'evoluzione storica;
- `380–392` Storia della medicina;
- `393–394` Infermieristica nell'evoluzione storica;
- `395–399` Storia della medicina;
- `400–402` Infermieristica nell'evoluzione storica;
- `403–407` Storia della medicina;
- `408` Infermieristica nell'evoluzione storica;
- `409–447` Storia della medicina;
- `448–450` Infermieristica nell'evoluzione storica;
- `451–459` Storia della medicina;
- **totale 459/459**.

Checkpoint: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — IN CORSO 160/300

Il lavoro procede in **blocchi da 40 domande** seguendo l'ordine reale complessivo della banca.

Implementazione attiva:

- `anatomia-patologica.html` resta il motore originale e continua a caricare le 12 banche JSON;
- `anatomia-patologica-explanations.js` è un enhancer opzionale fail-safe;
- rilascio attivo: **`pilot4`**;
- `EXPECTED_ADVANCED=160`;
- file spiegazioni:
  - `data/anatomia-patologica-explanations-001.json` → `m1–m40`;
  - `data/anatomia-patologica-explanations-002.json` → `m41–m80`;
  - `data/anatomia-patologica-explanations-003.json` → `m81–m100` + `e1–e20`;
  - `data/anatomia-patologica-explanations-004.json` → `e21–e50` + `i1–i10`.

Copertura:

- Microbiologia `m1–m100` = **100/100 COMPLETA**;
- Eziologia `e1–e50` = **50/50 COMPLETA**;
- Immunologia `i1–i10` = **10/50**;
- Anatomia Patologica = 0/100;
- **totale 160/300**.

Materiale universitario primario fornito dall'utente:

- `Microbiologia.pdf`;
- `Microbiologia compendio.pdf`;
- `PATOLOGIA GENERALE definitivo.pdf`;
- `Eziologia generale STAMPATO.pdf`;
- `Immunologia STAMPATO.pdf`;
- `ANATOMIA PATOLOGICA.pdf`.

Nel blocco 004 sono stati verificati: radiazioni ionizzanti e danno al DNA, radiolisi dell'acqua, radicali liberi, perossidazione lipidica e stress ossidativo; radiosensibilità, danno chimico, osmosi, denaturazione proteica, tossicologia, DL50, saturnismo e biotrasformazione; infiammazione, istamina, prostaglandine, diapedesi, chemiotassi, neutrofili, essudato/trasudato, pus, ascesso/empiema, infiammazione cronica e guarigione per seconda intenzione; per Immunologia: immunosorveglianza, immunità innata/adattativa, linfociti B/T, barriere, lisozima, defensine, microbiota, opsonizzazione e fagosoma.

Nei quesiti coperti finora non sono state modificate domande, opzioni, risposte corrette, ID o topic. Non sono emerse risposte corrette chiaramente incompatibili con i materiali universitari e con le fonti autorevoli consultate.

**Punto di ripresa Anatomia Patologica:** prossimo blocco da 40 = `i11–i50` (**40 Immunologia**), con copertura attesa **200/300**.

Checkpoint dettagliato: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

## 6. Architettura corrente

File principali:

- `index.html` — homepage;
- `studyhub.css` — stile condiviso;
- `scienze-salute.html` — wrapper Scienze;
- `scienze-salute-app.html` — motore originale Scienze;
- `scienze-salute-explanations.js` e `data/scienze-salute-explanations-001.json` → `013.json`;
- `SCIENZE_SALUTE_PROGRESS.md`;
- `anatomia-patologica.html`;
- `anatomia-patologica-explanations.js`;
- `data/anatomia-patologica-explanations-001.json` → `004.json`;
- `ANATOMIA_PATOLOGICA_PROGRESS.md`;
- `infermieristica-materno.html`;
- `paziente-chirurgico.html`;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche e spiegazioni;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud.

## 7. Workflow obbligatorio

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi, ID, sezioni e risposta corretta;
7. verificare che le motivazioni seguano l'opzione originale dopo shuffle;
8. testare almeno avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. mantenere responsive/mobile;
10. aggiornare checkpoint e questo file quando cambia lo stato reale.

### Lavoro a blocchi

- Paziente chirurgico: **462/462** completo.
- Scienze della Salute: **459/459** completo.
- Anatomia Patologica: **160/300**, blocchi fissi da 40; prossimo `i11–i50`.

Quando un blocco attraversa il confine tra due sezioni, mantenere la dimensione di 40 e registrare chiaramente gli intervalli. L'ultimo blocco può contenere il residuo finale inferiore a 40.

## 8. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 9. Roadmap immediata

1. Paziente chirurgico: spiegazioni complete 462/462.
2. Scienze della Salute: spiegazioni complete 459/459.
3. Anatomia Patologica: spiegazioni avanzate **160/300**; proseguire con `i11–i50`.
4. Mantenere le banche originali inalterate salvo autorizzazione esplicita.
5. Gestire quesiti dubbi o obsoleti come QA separato.
6. Farmacologia resta una futura banca in preparazione.
