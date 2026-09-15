# STUDYHUB_STATE.md

> **Single source of truth operativo per StudyHub**
>
> Ultimo aggiornamento: **15 settembre 2026**  
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

StudyHub è organizzato in tre aree principali:

1. **Esami** — simulazioni, spiegazioni, error review e progressi;
2. **Materiali** — sbobine, compendi e slide consultabili/scaricabili;
3. **Lezioni** — percorsi interattivi costruiti sui materiali originali con active recall, checkpoint e collegamento ai quiz.

Slogan correnti:

- Esami: **“Scegli l'esame. Poi distruggilo.”**
- Materiali: **“Meno cartelle. Più studio.”**
- Lezioni: **“Leggi meno. Ricorda di più.”**

### Materiali

La Biblioteca Materiali è attiva tramite `materiali.html`, `materiali.css`, `materiali.js` e `data/materiali.json`.

PDF collegati:

- Anatomia Patologica: **6/6**;
- Paziente chirurgico: **4** PDF attivi più 2 materiali catalogati ma non ancora pubblicati;
- Infermieristica nel Materno: **6/6**;
- Scienze della Salute: area predisposta, nessun PDF ancora associato.

Checkpoint: `MATERIALI_PROGRESS.md`.

## 3. Lezioni interattive

Il motore Lezioni è attivo tramite `lezioni.html`, `lezioni.css`, `lezioni.js` e `data/lezioni.json`.

Gerarchia:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**.

Sono attivi due percorsi strutturati:

### Anatomia Patologica

- Eziologia Generale: **8/8**;
- Patologia Generale: **10/20**;
- Immunologia: **12/16**;
- Anatomia Patologica: **17/19**;
- totale: **63 capitoli mappati / 47 lezioni attive**.

Restano 16 capitoli volutamente **IN PREPARAZIONE** perché non sufficientemente coperti dai materiali universitari: 10 di Patologia Generale, 4 di Immunologia e 2 di Anatomia Patologica.

Le tre lezioni pilota originarie — **Citologia diagnostica**, **Classificazione delle neoplasie**, **Grading e staging** — mantengono gli stessi ID e quindi i progressi già salvati restano compatibili.

Pacchetti:

- `data/lezioni-eziologia.json` + `lezioni-eziologia-loader.js`;
- `data/lezioni-patologia-1.json`, `data/lezioni-patologia-2.json` + `lezioni-patologia-loader.js`;
- `data/lezioni-immunologia-1.json`, `data/lezioni-immunologia-2.json` + `lezioni-immunologia-loader.js`;
- `data/lezioni-anatomia-patologica-1.json`, `data/lezioni-anatomia-patologica-2.json`, `data/lezioni-anatomia-patologica-3.json` + `lezioni-anatomia-patologica-loader.js`.

### Infermieristica nel Materno — COMPLETA 62/62

Il percorso Materno è ora interamente navigabile nelle quattro materie:

- **Infermieristica Pediatrica: 15/15 lezioni**;
- **Pediatria: 15/15 lezioni**;
- **Ostetricia: 18/18 lezioni**;
- **Ginecologia: 14/14 lezioni**;
- totale Materno: **62 capitoli / 62 lezioni attive**.

Totale globale area Lezioni: **125 capitoli mappati / 109 lezioni interattive attive**.

Fonti primarie Materno:

- `COMPENDEIO INFE PED.pdf`;
- `PEDIATRIA.pdf`;
- `COMPENDIO OSTETRICIA.pdf`;
- `COMPENDIO GINE.pdf`;
- banca `Infermieristica_nel_materno_300_domande.*` come supporto di controllo/coerenza con il programma.

Pacchetti Materno:

- `data/lezioni-materno.json` — roadmap delle quattro materie e primo blocco Infermieristica Pediatrica;
- `data/lezioni-materno-infermieristica-2.json` — completamento Infermieristica Pediatrica;
- `data/lezioni-materno-pediatria.json` — Pediatria 15/15;
- `data/lezioni-materno-ostetricia.json` — Ostetricia 18/18;
- `data/lezioni-materno-ginecologia.json` — Ginecologia 14/14;
- `lezioni-materno-loader.js` — unisce i pacchetti e attiva il percorso `infermieristica-materno`.

Il loader assegna a ogni materia lo stato `complete`, `active` o `outline` sulla base della copertura reale e aggiorna i contatori globali senza modificare il motore base.

### Correzioni scientifiche Materno registrate

Le lezioni restano grounded sui compendi, ma gli errori o contenuti obsoleti vengono corretti con fonti autorevoli senza modificare di nascosto la banca quiz.

Principali correzioni applicate:

- sonno sicuro del lattante: supino, superficie rigida/piana, ambiente libero da oggetti soffici;
- PBLS/emergenze pediatriche formulate secondo principi aggiornati, evitando algoritmi storici del vecchio compendio;
- ipoglicemia neonatale e ittero non ridotti a soglie fisse universali obsolete;
- alimentazione complementare aggiornata; non viene mantenuto il rinvio indiscriminato degli alimenti allergenici oltre l'anno;
- OGTT non presentato come unico criterio diagnostico per diabete;
- travaglio: eliminata la vecchia regola rigida **1 cm/ora** come criterio isolato di intervento;
- preeclampsia: sindrome ipertensiva multisistemica; proteinuria non sempre necessaria se presenti specifici segni di danno d'organo; edema non richiesto per diagnosi;
- precedente cesareo non presentato come indicazione automatica a cesareo ripetuto;
- vagina: corretta l'affermazione sulle presunte ghiandole proprie diffuse;
- fibromi uterini descritti come **leiomiomi della muscolatura liscia**;
- malformazioni mülleriane non considerate automaticamente causa di infertilità;
- endometriosi: laparoscopia non obbligatoria per ogni diagnosi; valorizzati quadro clinico ed imaging;
- cisti dermoide distinta come teratoma maturo; cistoadenomi distinti dai fibromi ovarici;
- CA-125 non presentato come screening generale del carcinoma ovarico;
- screening cervicale italiano aggiornato con Pap test/HPV-DNA secondo fascia d'età e programma regionale;
- HPV positivo distinto dalla diagnosi di carcinoma; rilevanza della persistenza dei genotipi ad alto rischio;
- infertilità definita secondo OMS dopo 12 mesi o più di rapporti regolari non protetti, con possibile valutazione anticipata per età/fattori clinici.

Checkpoint dettagliato: `LESSONS_PROGRESS.md`.

### Funzioni Lezioni da preservare

- navigazione esame → materia → capitolo → lezione;
- breadcrumb su tutti i livelli;
- blocchi didattici sequenziali;
- concetti chiave;
- active recall;
- checkpoint A/B/C/D con risposta obbligatoria prima di proseguire;
- feedback immediato;
- conteggio checkpoint corretti;
- avanzamento di lezione, materia ed esame sulle lezioni effettivamente attive;
- stati `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- salvataggio progressi in `localStorage` con chiave `studyhub.lessons.progress.v1`;
- collegamento al PDF originale della materia;
- passaggio finale **Studia → Allenati sul quiz**;
- routing `?esame=...&materia=...`;
- compatibilità con i vecchi routing già supportati;
- layout responsive desktop/mobile.

## 4. Funzioni generali da preservare

- homepage unica;
- accesso coerente alle tre aree Esami / Materiali / Lezioni;
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
- ritorno semplice alla Home;
- accesso ai PDF originali dalla Biblioteca;
- progressi Lezioni separati dai progressi dei quiz;
- un problema nell'area Lezioni o Materiali non deve impedire il funzionamento degli esami.

### Opzioni semanticamente vincolate

Domande con alternative come **“Tutte le precedenti”**, **“Nessuna delle precedenti”**, **“Tutte vere”**, **“Tutte corrette”** o equivalenti non devono essere rimescolate se l'ordine ne altera il significato. Il principio `lockOrder` va preservato.

## 5. Integrità delle banche

Se il task riguarda UI, logica, spiegazioni o infrastruttura:

- non modificare il testo delle domande;
- non modificare le 4 opzioni;
- non cambiare la risposta corretta;
- non eliminare o aggiungere domande senza richiesta esplicita;
- mantenere ID, sezioni e conteggi coerenti.

Se emerge un quesito probabilmente errato, ambiguo, obsoleto o discordante, **non correggerlo di nascosto**: segnalarlo come QA e modificarlo solo con autorizzazione esplicita.

Per contenuti medici/infermieristici dare priorità ai materiali universitari dell'utente. Quando serve verifica, aggiornamento o disambiguazione usare fonti autorevoli, incluse **PubMed/PMC, NCBI/NIH, WHO, CDC, ACOG, ERC, ISS/Ministero della Salute, UICC/NCI, fonti normative ufficiali e linee guida pertinenti**.

Le fonti esterne servono a verificare o precisare il contenuto e non autorizzano modifiche silenziose della banca.

Le lezioni interattive devono essere costruite sui materiali reali del corso. Non attribuire a slide o PDF contenuti non verificati. Il PDF originale deve rimanere accessibile come fonte primaria. Se il materiale non copre a sufficienza un capitolo, quel capitolo resta **IN PREPARAZIONE**.

## 6. Standard delle spiegazioni quiz

Per **Scienze della Salute**, **Paziente chirurgico**, **Anatomia Patologica** e, progressivamente, **Infermieristica nel Materno** lo standard è:

- spiegare perché la risposta corretta è giusta;
- spiegare perché ciascuna delle altre tre è sbagliata;
- non limitarsi a ripetere la risposta corretta;
- mantenere le motivazioni agganciate al testo originale delle opzioni, così da seguirne correttamente lo shuffle A/B/C/D;
- mantenere un fallback fail-safe: un problema nelle spiegazioni avanzate non deve impedire avvio, svolgimento o completamento del quiz.

### Paziente chirurgico — COMPLETO 462/462

- Diagnostica `di1–di76` = 76/76;
- Educazione terapeutica `ed1–ed54` = 54/54;
- Psicologia `ps1–ps66` = 66/66;
- Terapia `te1–te266` = 266/266;
- totale **462/462**.

File: `data/paziente-chirurgico-explanations-001.json` → `029.json`.  
Checkpoint: `PAZIENTE_CHIRURGICO_PROGRESS.md`.

### Scienze della Salute — COMPLETO 459/459

- `scienze-salute.html` carica `scienze-salute-app.html` in iframe;
- `scienze-salute-explanations.js` è enhancer opzionale fail-safe;
- `data/scienze-salute-explanations-001.json` → `013.json` coprono 1–459.

Checkpoint: `SCIENZE_SALUTE_PROGRESS.md`.

### Anatomia Patologica — COMPLETO 300/300

- `anatomia-patologica.html` mantiene le 12 banche originali;
- `anatomia-patologica-explanations.js` è enhancer opzionale fail-safe;
- release spiegazioni: `pilot8`;
- `EXPECTED_ADVANCED=300`;
- pacchetti `data/anatomia-patologica-explanations-001.json` → `008.json`;
- Microbiologia 100/100, Eziologia 50/50, Immunologia 50/50, Anatomia Patologica 100/100.

Nessuna domanda/opzione/risposta corretta/ID è stata modificata durante il lavoro sulle spiegazioni o sulle Lezioni.

Checkpoint: `ANATOMIA_PATOLOGICA_PROGRESS.md`.

### Infermieristica nel Materno — SPIEGAZIONI QUIZ 240/300

**Attenzione: questo stato riguarda le spiegazioni del quiz, non le Lezioni. Le Lezioni Materno sono già complete 62/62.**

Stato enhancer Materno:

- Infermieristica Pediatrica: **137/137**;
- Pediatria: **55/55**;
- Ostetricia: **48/53**;
- Ginecologia: **0/55**;
- totale: **240/300**;
- prossimo indice: **241**;
- restano **60** domande.

Pacchetti attuali: `data/materno-explanations-001.json.gz.b64` → `006.json.gz.b64`; `infermieristica-materno-explanations.js` ha `EXPECTED_ADVANCED = 240`.

Ripresa corretta spiegazioni quiz: 241–245 Ostetricia, 246–280 Ginecologia, 281–300 Ginecologia. Non rifare 1–240.

Checkpoint: `MATERNO_PROGRESS.md`.

## 7. Architettura corrente

File principali:

- `index.html` — homepage e accesso Esami / Materiali / Lezioni;
- `studyhub.css` — stile condiviso;
- `materiali.html`, `materiali.css`, `materiali.js`, `data/materiali.json` — Biblioteca Materiali;
- `MATERIALI_PROGRESS.md`;
- `lezioni.html`, `lezioni.css`, `lezioni.js`, `data/lezioni.json` — motore Lezioni;
- loader Anatomia: `lezioni-eziologia-loader.js`, `lezioni-patologia-loader.js`, `lezioni-immunologia-loader.js`, `lezioni-anatomia-patologica-loader.js`;
- loader Materno: `lezioni-materno-loader.js`;
- pacchetti `data/lezioni-*.json`;
- `LESSONS_PROGRESS.md`;
- `scienze-salute.html`, `scienze-salute-app.html`, `scienze-salute-explanations.js`;
- `data/scienze-salute-explanations-001.json` → `013.json`;
- `SCIENZE_SALUTE_PROGRESS.md`;
- `anatomia-patologica.html`, `anatomia-patologica-explanations.js`;
- `data/anatomia-patologica-explanations-001.json` → `008.json`;
- `ANATOMIA_PATOLOGICA_PROGRESS.md`;
- `infermieristica-materno.html`, `infermieristica-materno-plus.html`, `infermieristica-materno-explanations.js`;
- `MATERNO_PROGRESS.md`;
- `paziente-chirurgico.html`;
- `data/paziente-chirurgico-explanations-manifest.json` e `001`→`029`;
- `PAZIENTE_CHIRURGICO_PROGRESS.md`;
- `data/` — banche, spiegazioni e cataloghi;
- `.nojekyll`.

I progressi utente restano locali al browser; non ci sono account, database remoto o sync cloud. Quiz e Lezioni usano namespace separati.

## 8. Workflow obbligatorio

1. leggere `STUDYHUB_STATE.md`;
2. leggere il `main` aggiornato;
3. identificare i file realmente attivi;
4. applicare la modifica più circoscritta possibile;
5. preservare tutto ciò che non è coinvolto;
6. verificare conteggi, ID, sezioni e risposta corretta;
7. verificare che le motivazioni seguano l'opzione originale dopo shuffle;
8. per gli esami testare almeno avvio → risposta → feedback → successiva/precedente → risultato → ripasso errori → Home;
9. per le Lezioni testare almeno Home Lezioni → esame → materia → capitolo → blocchi → active recall → checkpoint → completamento → quiz/PDF → ritorno;
10. mantenere responsive/mobile;
11. aggiornare checkpoint e questo file quando cambia lo stato reale.

### Lavoro a blocchi

- Paziente chirurgico spiegazioni: **462/462** completo;
- Scienze della Salute spiegazioni: **459/459** completo;
- Anatomia Patologica spiegazioni: **300/300** completo;
- Materno spiegazioni quiz: **240/300**, ripresa da **241**;
- Lezioni Anatomia Patologica: **47/63** attive;
- Lezioni Infermieristica nel Materno: **62/62 COMPLETE**;
- totale Lezioni: **109/125** attive.

## 9. GitHub e autorizzazioni

Repository: `Ferrantedaniel-coder/QUIZZONINFERIMERISTICI`  
Branch: `main`

Per StudyHub ChatGPT è autorizzato a leggere il repository, confrontare versioni, creare/aggiornare i file richiesti, creare commit necessari e verificare il risultato.

Non sono automaticamente autorizzati mass delete, force update, modifiche distruttive, cambi di impostazioni o interventi fuori scope.

## 10. Roadmap immediata

1. preservare intatti i quattro esami e le rispettive banche;
2. **Lezioni Materno: COMPLETE 62/62 — non rifarle**;
3. prossimo percorso Lezioni consigliato: **Paziente chirurgico**, usando i PDF reali già pubblicati;
4. per Anatomia Patologica attivare i 16 capitoli ancora in preparazione solo con materiale universitario sufficiente o integrazione esterna verificata/autorizzata;
5. completare separatamente le spiegazioni quiz Materno da **241 a 300** secondo `MATERNO_PROGRESS.md`;
6. collegare progressivamente Materiali → Lezioni anche per Materno dove utile;
7. associare materiali reali a Scienze della Salute quando disponibili;
8. Farmacologia resta futura banca in preparazione;
9. gestire quesiti dubbi o obsoleti come QA separato.
