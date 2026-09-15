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
- `data/lezioni-eziologia.json` + `lezioni-eziologia-loader.js` — pacchetto Eziologia Generale;
- `data/lezioni-patologia-1.json`, `data/lezioni-patologia-2.json` + `lezioni-patologia-loader.js` — pacchetto Patologia Generale;
- `data/lezioni-immunologia-1.json`, `data/lezioni-immunologia-2.json` + `lezioni-immunologia-loader.js` — pacchetto Immunologia;
- `data/lezioni-anatomia-patologica-1.json`, `data/lezioni-anatomia-patologica-2.json`, `data/lezioni-anatomia-patologica-3.json` + `lezioni-anatomia-patologica-loader.js` — pacchetto Anatomia Patologica.

## Architettura corrente

La navigazione Lezioni è:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**

La homepage Lezioni mostra gli esami. Al momento **Anatomia Patologica** è il percorso strutturato e apribile; Paziente chirurgico, Infermieristica nel Materno e Scienze della Salute restano predisposti come estensioni future.

### Esame Anatomia Patologica

All'apertura vengono mostrate le quattro materie nell'ordine didattico concordato:

1. **Eziologia Generale**
2. **Patologia Generale**
3. **Immunologia**
4. **Anatomia Patologica**

Roadmap e copertura reale:

- Eziologia Generale: **8 capitoli / 8 lezioni attive**;
- Patologia Generale: **20 capitoli / 10 lezioni attive**;
- Immunologia: **16 capitoli / 12 lezioni attive**;
- Anatomia Patologica: **19 capitoli / 17 lezioni attive**;
- totale: **63 capitoli mappati / 47 lezioni interattive attive**.

I capitoli non convertiti mostrano chiaramente **IN PREPARAZIONE**.

## Eziologia Generale — COMPLETA 8/8

Sono attive:

1. Concetti fondamentali di eziologia
2. Agenti fisici
3. Agenti chimici e tossici
4. Agenti biologici
5. Fattori nutrizionali
6. Fattori genetici
7. Radicali liberi e stress ossidativo
8. Invecchiamento cellulare

Fonti primarie: `Eziologia generale STAMPATO.pdf` e, dove necessario, `PATOLOGIA GENERALE definitivo.pdf`.

## Patologia Generale — 10/20

Lezioni attive:

1. Danno cellulare
2. Morte cellulare
3. Infiammazione acuta
4. Reclutamento leucocitario
5. Mediatori dell'infiammazione
6. Esiti dell'infiammazione acuta
7. Infiammazione cronica
8. Infiammazione granulomatosa
9. Riparazione tissutale
10. Amiloidosi

Fonti: `PATOLOGIA GENERALE definitivo.pdf`; `ANATOMIA PATOLOGICA.pdf` per l'amiloide.

Restano volutamente in preparazione, per insufficiente copertura diretta nei materiali verificati: adattamenti cellulari completi, accumuli intracellulari, calcificazioni patologiche, guarigione delle ferite, disturbi emodinamici generali, emostasi/trombosi, embolia, infarto, shock, pigmenti/metabolismo della bilirubina.

## Immunologia — 12/16

Fonte primaria: `Immunologia STAMPATO.pdf`.

Lezioni attive:

1. Introduzione al sistema immunitario
2. Immunità innata
3. Fagocitosi
4. Sistema del complemento
5. Antigeni e anticorpi
6. Linfociti B
7. MHC e presentazione dell'antigene
8. Linfociti T
9. Sottopopolazioni T helper
10. Citotossicità
11. Citochine
12. Ipersensibilità

### Precisazioni scientifiche applicate

- “via leptinica” degli appunti → **via lectinica del complemento**, mediata dalla **mannose-binding lectin (MBL)**;
- cellule dendritiche indicate come APC **più efficaci** nell'attivazione dei T vergini, evitando l'assoluto “uniche cellule costimolatorie”;
- MHC I descritto sulla grande maggioranza delle cellule nucleate;
- perforina/granzimi presentati principalmente come meccanismo di induzione dell'apoptosi.

Restano in preparazione per copertura insufficiente nel compendio: Autoimmunità, Immunodeficienze, Immunologia dei trapianti, Immunità antitumorale.

## Anatomia Patologica — 17/19

Fonti primarie: `ANATOMIA PATOLOGICA.pdf` e, per concetti di invasione/metastasi/neoplasia, `PATOLOGIA GENERALE definitivo.pdf` dello stesso esame.

Le 3 lezioni pilota preesistenti mantengono gli stessi ID e quindi la compatibilità con i progressi già salvati:

- Citologia diagnostica
- Classificazione delle neoplasie
- Grading e staging

Sono state aggiunte 14 lezioni grounded:

1. **Introduzione all'Anatomia Patologica**
2. **Prelievo e campionamento**
3. **Fissazione del campione**
4. **Processazione istologica**
5. **Colorazioni istologiche e istochimica**
6. **Immunoistochimica**
7. **Diagnostica molecolare**
8. **Esame intraoperatorio al congelatore**
9. **Neoplasia: concetti fondamentali**
10. **Invasione tumorale**
11. **Metastasi**
12. **Biomarcatori tumorali**
13. **Qualità del campione**
14. **Autopsia e riscontro diagnostico**

### Capitoli Anatomia Patologica lasciati volutamente in preparazione

- **Citologia cervico-vaginale** — il materiale contiene Pap test e citologia abrasiva, ma la roadmap richiede anche HPV e screening cervicale; non vengono trasformate in indicazioni attuali eventuali nozioni datate degli appunti senza una verifica dedicata.
- **Refertazione anatomopatologica** — istotipo, grading, staging, margini, linfonodi e biomarcatori sono presenti separatamente nei materiali, ma non è stata trovata una trattazione abbastanza organica del referto completo da giustificare una lezione autonoma senza integrare contenuti esterni.

### Precisazioni scientifiche applicate in Anatomia Patologica

- formalina al 10% descritta correttamente come soluzione contenente circa il 4% di formaldeide;
- ritardo alla fissazione trattato come variabile preanalitica rilevante;
- Rosso Congo associato all'amiloide e alla birifrangenza verde mela;
- Ki-67 descritto come indice proliferativo il cui significato dipende dal contesto tumorale;
- frozen section presentata come consulenza intraoperatoria selettiva, con limiti di campionamento e artefatti, seguita dall'esame definitivo;
- grading e staging mantenuti distinti;
- T/N/M descritti rispettivamente come tumore primitivo, linfonodi regionali e metastasi a distanza, con criteri specifici dipendenti dalla sede.

## Funzioni implementate

- navigazione Home → Lezioni → esame → materia → capitolo → lezione;
- breadcrumb su tutti i livelli;
- accesso Materiali → **Studia come lezione**;
- roadmap completa dei capitoli;
- spiegazioni e concetti chiave;
- active recall;
- checkpoint A/B/C/D con risposta obbligatoria;
- feedback immediato;
- avanzamento di lezione, materia ed esame;
- stati `DA INIZIARE`, `IN CORSO`, `COMPLETATA`, `DA RIPASSARE`;
- comando **Segna da ripassare**;
- progressi in `localStorage` con chiave `studyhub.lessons.progress.v1`;
- schermata di completamento;
- passaggio **Studia → Allenati sul quiz**;
- apertura del PDF originale;
- layout responsive desktop/mobile.

## Regola contenuti

**Non inventare contenuti per riempire la roadmap.** Le lezioni devono derivare dai materiali reali del corso. Se un argomento non è sufficientemente coperto, resta in preparazione. Eventuali precisazioni esterne possono essere usate solo per verificare/correggere scientificamente e devono essere distinguibili dal contenuto attribuito ai materiali del corso.

## Prossimo sviluppo

Per l'esame Anatomia Patologica restano **16 capitoli della roadmap non attivati** perché non sufficientemente coperti dai materiali già verificati: 10 di Patologia Generale, 4 di Immunologia e 2 di Anatomia Patologica.

Prossimi passi possibili:

1. attivare questi capitoli solo quando viene individuato materiale universitario sufficiente o dopo un'integrazione esterna esplicitamente autorizzata e verificata;
2. iniziare il percorso Lezioni di **Infermieristica nel Materno** usando i PDF reali già presenti;
3. iniziare il percorso Lezioni di **Paziente chirurgico** usando i PDF reali già presenti.

Per ogni capitolo mantenere lo schema StudyHub: **spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.
