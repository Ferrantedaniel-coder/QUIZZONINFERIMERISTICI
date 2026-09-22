# LESSONS_PROGRESS.md

Ultimo aggiornamento: **22 settembre 2026**

## Stato

L'area **Lezioni** è integrata nel repository e collegata a homepage e Biblioteca Materiali.

Slogan: **“Leggi meno. Ricorda di più.”**

Navigazione:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**

Schema StudyHub obbligatorio:

**spiegazione → concetti chiave → active recall → checkpoint → materiale → quiz collegato**.

## Copertura complessiva

Sono attivi sei percorsi completi:

- **Anatomia Patologica**: 63/63;
- **Infermieristica nel Materno**: 62/62;
- **Paziente chirurgico**: 60/60;
- **MedChiruFarmaco**: 24/24;
- **Scienze della Salute**: 49/49;
- **Infermieristica per problemi prioritari di salute (PPS)**: 18/18.

Totale StudyHub Lezioni: **276 capitoli mappati / 276 lezioni interattive attive**.

---

# 1. Anatomia Patologica — COMPLETA 63/63

- Eziologia Generale: **8/8**;
- Patologia Generale: **20/20**;
- Immunologia: **16/16**;
- Anatomia Patologica: **19/19**.

Pacchetti consolidati:

- `lezioni-eziologia-loader.js` + `data/lezioni-eziologia.json`;
- `lezioni-patologia-loader.js` + tre pacchetti Patologia;
- `lezioni-immunologia-loader.js` + tre pacchetti Immunologia;
- `lezioni-anatomia-patologica-loader.js` + quattro pacchetti Anatomia Patologica.

Le tre lezioni pilota originarie — Citologia diagnostica, Classificazione delle neoplasie, Grading e staging — mantengono gli ID originari e la compatibilità con i progressi locali.

Correzioni scientifiche già consolidate nel percorso restano quelle registrate nello storico del progetto e in `STUDYHUB_STATE.md`.

---

# 2. Infermieristica nel Materno — COMPLETA 62/62

- Infermieristica Pediatrica: **15/15**;
- Pediatria: **15/15**;
- Ostetricia: **18/18**;
- Ginecologia: **14/14**.

Fonti primarie:

- `COMPENDEIO INFE PED.pdf`;
- `PEDIATRIA.pdf`;
- `COMPENDIO OSTETRICIA.pdf`;
- `COMPENDIO GINE.pdf`.

Pacchetti consolidati:

- `data/lezioni-materno.json`;
- `data/lezioni-materno-infermieristica-2.json`;
- `data/lezioni-materno-pediatria.json`;
- `data/lezioni-materno-ostetricia.json`;
- `data/lezioni-materno-ginecologia.json`;
- `lezioni-materno-loader.js`.

---

# 3. Paziente chirurgico — COMPLETO 60/60

- Assistenza perioperatoria: **18/18**;
- Diagnostica: **10/10**;
- Psicologia: **10/10**;
- Educazione terapeutica: **7/7**;
- Terapia e farmacologia: **15/15**.

Pacchetti consolidati:

- `data/lezioni-paziente-chirurgico.json`;
- due pacchetti Assistenza;
- un pacchetto Diagnostica;
- un pacchetto Psicologia;
- un pacchetto Educazione terapeutica;
- due pacchetti Terapia;
- `lezioni-paziente-chirurgico-loader.js`.

Le correzioni già consolidate — precauzioni standard, digiuno individualizzato, tricotomia solo se necessaria, checklist OMS, sicurezza RM/contrasto, classificazione Midline/PICC, gestione KCl/warfarin e altri aggiornamenti — restano valide e non sono state alterate dal lavoro MedChiruFarmaco.

---

# 4. MedChiruFarmaco — COMPLETO V1 24/24

Percorso costruito sui materiali caricati per il nuovo esame.

## Medicina Generale — 12/12

1. Esame obiettivo
2. Temperatura, febbre e ipertermia
3. Dispnea e cianosi
4. Tosse ed escreato
5. Edemi e ascite
6. Ittero e bilirubina
7. Vertigini e cefalee
8. Stato di coscienza, lipotimia, sincope e coma
9. Diuresi e minzione
10. Emorragie
11. Funzioni digestive e alvo
12. Diabete mellito e piede diabetico

Fonte primaria: `Medicina Generale.pdf.pdf`.

## Chirurgia Generale — 9/9

1. Gestione postoperatoria
2. Rischio operatorio
3. Malato con sepsi
4. Nutrizione in chirurgia
5. Sistema linfatico e patologie vascolari
6. Esofago, stomaco e intestino
7. Chirurgia endocrina
8. Patologia mammaria
9. Addome acuto

Fonte primaria: `Chirurgia Definitivo.pdf`.

## Farmacologia — 3/3

1. Principi della terapia antipertensiva
2. Diuretici
3. Beta-bloccanti

Fonte primaria: `FARMACO SCHEMI.odt`.

Il percorso Farmacologia V1 è volutamente limitato agli argomenti realmente sviluppati nel materiale disponibile usato per questo blocco; non sono stati inventati capitoli per riempire la roadmap.

File:

- `data/lezioni-medchirufarmaco.json`;
- `data/lezioni-medchirufarmaco-medicina-generale.json`;
- `data/lezioni-medchirufarmaco-chirurgia-generale.json`;
- `data/lezioni-medchirufarmaco-farmacologia.json`;
- `lezioni-medchirufarmaco-loader.js`;
- `medchirufarmaco-source-guard.js`.

Il source guard rimanda alla scheda Biblioteca finché i quattro materiali originali MedChiruFarmaco non sono pubblicati come binari nel repository, evitando link 404.

Checkpoint dettagliato quiz/QA/materiali: `MEDCHIRUFARMACO_PROGRESS.md`.

---

# 5. Scienze della Salute — COMPLETA 49/49

- Infermieristica nell’evoluzione storica: **12/12**;
- Epidemiologia: **8/8**;
- Igiene e medicina preventiva: **12/12**;
- Storia della medicina: **17/17**.

Non risultano PDF universitari pubblicati per questo esame. Il percorso usa esclusivamente la banca reale da **459 quesiti** e le **459 spiegazioni avanzate** già verificate. Ogni lezione conserva gli ID delle domande sorgente in `sourceQuestionIds`; il pulsante fonte è etichettato **Apri banca quiz** e non viene presentato come PDF originale.

File:

- `data/lezioni-scienze-salute.json`;
- `data/lezioni-scienze-salute-infermieristica.json`;
- `data/lezioni-scienze-salute-epidemiologia.json`;
- `data/lezioni-scienze-salute-igiene.json`;
- `data/lezioni-scienze-salute-storia.json`;
- `lezioni-scienze-salute-loader.js`;
- `SCIENZE_SALUTE_PROGRESS.md`.

---

# 6. PPS — COMPLETO V1 18/18

Percorso costruito esclusivamente sui quattro materiali PPS caricati.

- Infermieristica nella gestione dei problemi di salute cronici: **2/2**;
- Respiratorio / Pneumologia: **2/2**;
- Cardiovascolare e Cardiochirurgia: **2/2**;
- Ematologia: **2/2**;
- Oncologia: **2/2**;
- Neurologia: **2/2**;
- Gastroenterologia: **2/2**;
- Endocrinologia: **2/2**;
- Malattie infettive: **2/2**.

File:
- `data/lezioni-pps.json`;
- `data/lezioni-pps-pack-1.json`–`003.json`;
- `lezioni-pps-loader.js`;
- `PPS_PROGRESS.md`.

Le lezioni rimandano alla Biblioteca PPS finché i quattro PDF originali non sono pubblicati come binari nel repository. Il titolo “Infermieristica nella gestione dei problemi di salute cronici” resta testo ordinario, senza sottolineatura.

---

## Funzioni da preservare

- breadcrumb su tutti i livelli;
- roadmap capitoli;
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
- apertura del materiale originale solo quando realmente disponibile;
- layout responsive desktop/mobile.

## Regola contenuti

**Non inventare contenuti per riempire la roadmap.** Le lezioni devono derivare dai materiali reali del corso/progetto o, quando esplicitamente usata come fonte didattica, dalla banca quiz verificata del progetto. Le fonti esterne possono integrare o correggere solo quando autorizzato e con provenienza distinta.

## Prossimo sviluppo

- non rifare Anatomia 63/63, Materno 62/62, Paziente chirurgico 60/60, MedChiruFarmaco 24/24, Scienze della Salute 49/49 o PPS 18/18;
- una futura espansione di MedChiruFarmaco potrà usare le raccolte aggiuntive di domande, mantenendo QA e fonti tracciate.
