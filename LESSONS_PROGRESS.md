# LESSONS_PROGRESS.md

Ultimo aggiornamento: 15 settembre 2026

## Stato

La terza area di StudyHub, **Lezioni**, è integrata nel repository e collegata alla homepage e alla Biblioteca Materiali.

Slogan attivo: **“Leggi meno. Ricorda di più.”**

La navigazione è:

**Lezioni → Esame → Materia → Capitolo → Lezione interattiva**

Ogni lezione mantiene lo schema StudyHub:

**spiegazione → concetti chiave → active recall → checkpoint → materiale originale → quiz collegato**.

## Copertura complessiva

Sono ora strutturati e apribili tre percorsi d'esame:

- **Anatomia Patologica**: 63 capitoli mappati / 47 lezioni attive;
- **Infermieristica nel Materno**: 62 capitoli / **62 lezioni attive**;
- **Paziente chirurgico**: 60 capitoli / **60 lezioni attive**.

Totale StudyHub Lezioni: **185 capitoli mappati / 169 lezioni interattive attive**.

Scienze della Salute resta predisposto come successiva estensione della sezione Lezioni.

---

# 1. Anatomia Patologica

Materie e copertura:

- Eziologia Generale: **8/8**;
- Patologia Generale: **10/20**;
- Immunologia: **12/16**;
- Anatomia Patologica: **17/19**.

Totale: **47/63**.

I 16 capitoli non attivati restano volutamente **IN PREPARAZIONE** perché non sufficientemente coperti dai materiali universitari verificati: 10 di Patologia Generale, 4 di Immunologia e 2 di Anatomia Patologica.

Le tre lezioni pilota originarie — **Citologia diagnostica**, **Classificazione delle neoplasie**, **Grading e staging** — mantengono gli stessi ID e quindi restano compatibili con i progressi già salvati.

Pacchetti attivi:

- `data/lezioni-eziologia.json` + `lezioni-eziologia-loader.js`;
- `data/lezioni-patologia-1.json`, `data/lezioni-patologia-2.json` + `lezioni-patologia-loader.js`;
- `data/lezioni-immunologia-1.json`, `data/lezioni-immunologia-2.json` + `lezioni-immunologia-loader.js`;
- `data/lezioni-anatomia-patologica-1.json`, `data/lezioni-anatomia-patologica-2.json`, `data/lezioni-anatomia-patologica-3.json` + `lezioni-anatomia-patologica-loader.js`.

Fonti universitarie principali:

- `Eziologia generale STAMPATO.pdf`;
- `PATOLOGIA GENERALE definitivo.pdf`;
- `Immunologia STAMPATO.pdf`;
- `ANATOMIA PATOLOGICA.pdf`.

Tra le correzioni scientifiche già registrate: via **lectinica** del complemento/MBL; MHC I sulla grande maggioranza delle cellule nucleate; perforina/granzimi come meccanismo apoptotico; formalina 10% ≈ 4% formaldeide; Rosso Congo e birifrangenza verde mela; Ki-67 contestualizzato; frozen section come consulenza intraoperatoria selettiva; grading e staging distinti; TNM dipendente dalla sede.

---

# 2. Infermieristica nel Materno — COMPLETA 62/62

Il percorso Materno è costruito sui quattro compendi reali del corso. Le quattro materie sono complete e navigabili.

- **Infermieristica Pediatrica: 15/15**;
- **Pediatria: 15/15**;
- **Ostetricia: 18/18**;
- **Ginecologia: 14/14**.

Fonti primarie:

- `COMPENDEIO INFE PED.pdf`;
- `PEDIATRIA.pdf`;
- `COMPENDIO OSTETRICIA.pdf`;
- `COMPENDIO GINE.pdf`.

Pacchetti:

- `data/lezioni-materno.json`;
- `data/lezioni-materno-infermieristica-2.json`;
- `data/lezioni-materno-pediatria.json`;
- `data/lezioni-materno-ostetricia.json`;
- `data/lezioni-materno-ginecologia.json`;
- `lezioni-materno-loader.js`.

Correzioni principali già applicate: sonno sicuro aggiornato; PBLS formulato secondo principi correnti; ipoglicemia neonatale e ittero non ridotti a soglie fisse obsolete; OGTT non presentato come unico criterio diagnostico del diabete; eliminazione della regola rigida 1 cm/ora nel travaglio; preeclampsia come sindrome multisistemica; precedente cesareo non come automatismo; endometriosi non vincolata sempre a laparoscopia; leiomiomi uterini descritti correttamente; CA-125 non usato come screening generale; screening cervicale e HPV aggiornati.

---

# 3. Paziente chirurgico — COMPLETO 60/60

Il percorso è attivo e navigabile nelle cinque materie previste.

## Assistenza perioperatoria — 18/18

Lezioni:

1. Percorso perioperatorio
2. Classificazione degli interventi
3. Valutazione preoperatoria e rischio
4. Consenso, identificazione e sicurezza
5. Digiuno e preparazione preoperatoria
6. Preparazione della cute e tricotomia
7. Surgical Safety Checklist
8. Sala operatoria, asepsi e team
9. Posizionamento intraoperatorio
10. PACU e monitoraggio post-anestesia
11. Dolore postoperatorio
12. Mobilizzazione precoce e prevenzione TEV
13. Complicanze postoperatorie precoci
14. Ferita chirurgica e cicatrizzazione
15. Drenaggi chirurgici
16. Stomie e assistenza
17. Nutrizione nel paziente chirurgico
18. Emergenze chirurgiche e deterioramento

## Diagnostica — 10/10

1. Principi di diagnostica per immagini
2. Radiografia
3. Ecografia
4. Tomografia computerizzata
5. Risonanza magnetica
6. Medicina nucleare
7. Mezzi di contrasto
8. Sicurezza dei mezzi di contrasto
9. Angiografia e radiologia interventistica
10. Biopsie image-guided e assistenza

## Psicologia — 10/10

1. Dal modello biomedico al biopsicosociale
2. Stress e trauma chirurgico
3. Ansia preoperatoria
4. Comunicazione e informazione
5. Coping e meccanismi di difesa
6. Immagine corporea e perdita d'organo
7. Paura dell'anestesia e perdita di controllo
8. Adattamento psicologico postoperatorio
9. Vissuti nei grandi cambiamenti corporei
10. Resilienza e alleanza terapeutica

## Educazione terapeutica — 7/7

1. Educazione terapeutica: definizione e finalità
2. Analisi del bisogno educativo
3. Obiettivi e progettazione educativa
4. Metodologie educative
5. Educazione preoperatoria
6. Educazione postoperatoria e dimissione
7. Educazione a dispositivi e caregiver

## Terapia e farmacologia — 15/15

1. Processo di gestione del farmaco
2. Rischio clinico ed errori in terapia
3. Calcoli di dose e infusioni
4. Vie enterali
5. Vie sottocutanea, intradermica e intramuscolare
6. Somministrazione endovenosa
7. Catetere venoso periferico
8. Midline, PICC, CVC e Port
9. Pompe ed elastomeri
10. Farmaci attraverso sondino enterale
11. Via epidurale e intraossea
12. Anticoagulanti e antiaggreganti nel perioperatorio
13. Analgesia nel paziente chirurgico
14. Farmaci ad alto rischio e potassio
15. Riconciliazione, PRN e monitoraggio

### Fonti Paziente chirurgico

Materiali primari del corso/progetto utilizzati:

- `Infermieristica nell'assistenza del paziente chirurgico.pdf`;
- `DIAGNOSTICA.pdf`;
- `PSICOLOGIA .pdf`;
- `Terapia.pdf`;
- `ASSISTENZA INFERMIERISTICA NEL PAZIENTE CHIRURGICO .pdf` come compendio esteso già verificato nel progetto;
- `Il_Paziente_Chirurgico_-_Sintesi_Esame.pdf` come sintesi integrata di controllo.

### Correzioni e aggiornamenti applicati

Le lezioni preservano il programma del corso ma non propagano nozioni datate o errate. In particolare:

- nessuna programmazione discriminatoria del paziente sieropositivo: **precauzioni standard per tutti**;
- esami preoperatori non richiesti come pacchetto fisso universale, ma in base a paziente e procedura;
- digiuno non ridotto alla regola automatica “dalla mezzanotte”: tempi differenziati per liquidi chiari, pasti e rischio individuale;
- tricotomia non routinaria; se necessaria, clipper e non rasoio a lama;
- Surgical Safety Checklist articolata in **Sign In, Time Out, Sign Out**;
- RM: impianti/dispositivi valutati come MR Safe / MR Conditional / MR Unsafe secondo caratteristiche specifiche, non “metallo = sempre vietato”;
- contrasto: distinte reazioni allergic-like e fisiologiche; premedicazione non universale; gestione metformina in base soprattutto a funzione renale/AKI e protocollo;
- PET-FDG non presentata come specifica esclusivamente per neoplasia;
- **Midline = accesso periferico lungo**, non CVC;
- **PICC = accesso centrale a inserzione periferica**, con punta in posizione centrale appropriata e verificata, non genericamente “in atrio destro”;
- CVP non sostituito secondo una scadenza rigida universale di 72 ore: gestione secondo indicazione clinica e protocollo;
- KCl concentrato mai EV push o non diluito;
- warfarin: nessun divieto assoluto di alimenti con vitamina K; importanza della costanza alimentare e del monitoraggio INR; gestione perioperatoria individualizzata;
- formulazioni orali: non tutte le capsule sono automaticamente indivisibili e non tutte le compresse triturabili; verifica della formulazione;
- via intraossea descritta secondo competenze, formazione e protocolli locali, evitando la formula universale “atto medico delegato”;
- modelli psicologici a stadi descritti come cornici interpretative, non sequenze obbligatorie e lineari.

### File Paziente chirurgico Lezioni

- `data/lezioni-paziente-chirurgico.json` — roadmap 5 materie / 60 capitoli;
- `data/lezioni-paziente-chirurgico-assistenza-1.json`;
- `data/lezioni-paziente-chirurgico-assistenza-2.json`;
- `data/lezioni-paziente-chirurgico-diagnostica.json`;
- `data/lezioni-paziente-chirurgico-psicologia.json`;
- `data/lezioni-paziente-chirurgico-educazione.json`;
- `data/lezioni-paziente-chirurgico-terapia-1.json`;
- `data/lezioni-paziente-chirurgico-terapia-2.json`;
- `lezioni-paziente-chirurgico-loader.js` — carica e unisce tutti i pacchetti nel percorso `paziente-chirurgico`.

`lezioni.html` importa il loader dedicato e `data/materiali.json` collega la Biblioteca al percorso con **Studia come lezione**.

---

## Funzioni implementate

- navigazione Home → Lezioni → esame → materia → capitolo → lezione;
- breadcrumb su tutti i livelli;
- accesso Materiali → **Studia come lezione** dove previsto;
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
- apertura del PDF/materiale originale disponibile;
- layout responsive desktop/mobile.

## Regola contenuti

**Non inventare contenuti per riempire la roadmap.** Le lezioni devono derivare dai materiali reali del corso/progetto. Le fonti esterne autorevoli possono essere usate per correggere o aggiornare parti obsolete, ma non devono essere attribuite falsamente al PDF del corso.

Quando un argomento non è sufficientemente coperto dal materiale universitario e non esiste un'integrazione autorizzata/affidabile, il capitolo rimane **IN PREPARAZIONE**.

## Prossimo sviluppo

I percorsi **Infermieristica nel Materno 62/62** e **Paziente chirurgico 60/60** sono completi.

Prossimo percorso Lezioni naturale: **Scienze della Salute**, quando saranno disponibili materiali reali sufficienti da associare alla Biblioteca.

Restano inoltre 16 capitoli della roadmap di Anatomia Patologica non attivati per insufficiente copertura diretta nei materiali già verificati.