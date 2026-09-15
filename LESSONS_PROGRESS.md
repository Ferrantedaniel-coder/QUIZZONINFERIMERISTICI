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
- `data/lezioni-patologia-1.json`, `data/lezioni-patologia-2.json` + `lezioni-patologia-loader.js` — pacchetto Patologia Generale.

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
- Patologia Generale: **20 capitoli / 10 lezioni attive**;
- Immunologia: **16 capitoli / 0 lezioni attive**;
- Anatomia Patologica: **19 capitoli / 3 lezioni attive**;
- totale: **63 capitoli mappati / 21 lezioni interattive attive**.

I capitoli non ancora convertiti mostrano chiaramente **IN PREPARAZIONE**.

## Eziologia Generale — COMPLETA 8/8

Sono attive le lezioni:

1. Concetti fondamentali di eziologia
2. Agenti fisici
3. Agenti chimici e tossici
4. Agenti biologici
5. Fattori nutrizionali
6. Fattori genetici
7. Radicali liberi e stress ossidativo
8. Invecchiamento cellulare

Fonti primarie:

- `Eziologia generale STAMPATO.pdf`;
- `PATOLOGIA GENERALE definitivo.pdf` dove necessario per parti presenti nel materiale del corso.

## Patologia Generale — 10/20 capitoli con lezione attiva

Sono state pubblicate solo lezioni supportate direttamente dai materiali reali del corso:

1. **Danno cellulare**
2. **Morte cellulare**
3. **Infiammazione acuta**
4. **Reclutamento leucocitario**
5. **Mediatori dell'infiammazione**
6. **Esiti dell'infiammazione acuta**
7. **Infiammazione cronica**
8. **Infiammazione granulomatosa**
9. **Riparazione tissutale**
10. **Amiloidosi**

Fonti:

- `PATOLOGIA GENERALE definitivo.pdf` come fonte primaria delle prime nove lezioni;
- `ANATOMIA PATOLOGICA.pdf` per la lezione sull'amiloide, in particolare deposito beta-fibrillare, Rosso Congo e birifrangenza verde mela.

Ogni lezione contiene spiegazione, concetti chiave, active recall e 2 checkpoint A/B/C/D obbligatori con feedback.

### Capitoli lasciati volutamente in preparazione

Non sono stati riempiti artificialmente i capitoli per i quali, nella verifica corrente dei materiali, non è emersa copertura sufficiente per una lezione completa e affidabile:

- Adattamenti cellulari completi;
- Accumuli intracellulari;
- Calcificazioni patologiche;
- Guarigione delle ferite;
- Disturbi emodinamici generali;
- Emostasi e trombosi;
- Embolia;
- Infarto;
- Shock;
- Pigmenti e metabolismo della bilirubina.

Questi capitoli restano visibili nella roadmap con stato **IN PREPARAZIONE**. Verranno attivati solo dopo aver individuato materiale universitario dell'utente che li copra adeguatamente oppure dopo una futura integrazione esplicitamente autorizzata e verificata.

## Anatomia Patologica — 3 lezioni già attive

Le tre lezioni pilota restano nei rispettivi capitoli e mantengono gli ID originali, quindi i progressi browser restano compatibili:

1. **Citologia diagnostica**
2. **Classificazione delle neoplasie**
3. **Grading e staging**

Fonte primaria: `ANATOMIA PATOLOGICA.pdf`.

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

Proseguire nell'ordine didattico:

1. completare eventuali capitoli di Patologia Generale solo se supportati da materiali reali aggiuntivi;
2. **Immunologia** — 16 capitoli;
3. **Anatomia Patologica** — completare i capitoli ancora senza lezione.

Per ogni capitolo mantenere lo schema StudyHub: **spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.
