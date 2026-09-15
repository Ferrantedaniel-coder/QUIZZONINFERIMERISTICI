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

Sono ora strutturati e apribili due percorsi d'esame:

- **Anatomia Patologica**: 63 capitoli mappati / 47 lezioni attive;
- **Infermieristica nel Materno**: 62 capitoli / **62 lezioni attive**.

Totale StudyHub Lezioni: **125 capitoli mappati / 109 lezioni interattive attive**.

Paziente chirurgico e Scienze della Salute restano predisposti come successive estensioni della sezione Lezioni.

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

Il percorso Materno è stato costruito sui quattro compendi reali del corso e sulla banca Materno già verificata. Le quattro materie sono tutte complete e navigabili.

## Infermieristica Pediatrica — 15/15

Fonte primaria: `COMPENDEIO INFE PED.pdf`.

Lezioni:

1. Approccio assistenziale al bambino e alla famiglia
2. Stato di coscienza e osservazione neurologica
3. Parametri vitali pediatrici
4. Crescita, antropometria e percentili
5. Valutazione del dolore
6. Strategie non farmacologiche del dolore
7. Termoregolazione neonatale
8. Sonno sicuro e prevenzione della SIDS
9. Somministrazione dei farmaci in pediatria
10. Detersione nasale e terapia inalatoria
11. Nausea, vomito e rigurgito
12. Alvo, diarrea e disidratazione
13. Trauma cranico pediatrico
14. Emergenze pediatriche e triage
15. Ospedalizzazione, genitori e gioco terapeutico

Aggiornamenti applicati: sonno sicuro coerente con raccomandazioni correnti; dosaggio/somministrazione pediatrica senza regole generalizzate sulla manipolazione delle formulazioni; PBLS ed emergenze formulati secondo principi e linee guida correnti, evitando algoritmi storici del vecchio compendio.

## Pediatria — 15/15

Fonte primaria: `PEDIATRIA.pdf`.

Lezioni:

1. Fasi dello sviluppo e prevenzione
2. Screening neonatali e pediatrici
3. Infezioni perinatali e TORCH
4. Adattamento alla vita extrauterina
5. Valutazione del neonato e APGAR
6. Classificazione del neonato
7. Prematurità e principali rischi
8. Ittero e malattia emolitica
9. Alimentazione e allattamento
10. Patologie respiratorie pediatriche
11. Diabete tipo 1 e chetoacidosi
12. Fibrosi cistica e celiachia
13. Patologie gastrointestinali pediatriche
14. Rene, vie urinarie e IVU
15. Neurologia pediatrica

Aggiornamenti applicati: rischio rosolia congenita non limitato al solo primo mese; ipoglicemia neonatale senza soglie fisse obsolete; bilirubina interpretata per età in ore/età gestazionale/rischi; alimentazione complementare aggiornata; OGTT non presentato come unico criterio diagnostico del diabete; reflusso del lattante compatibile con sonno supino sicuro.

## Ostetricia — 18/18

Fonte primaria: `COMPENDIO OSTETRICIA.pdf`.

Lezioni:

1. Placenta, membrane e liquido amniotico
2. Cordone ombelicale
3. Gravidanza fisiologica
4. Sviluppo fetale e bacino osseo
5. Diagnosi prenatale e screening
6. Diagnostica prenatale invasiva
7. Aborto spontaneo e gravidanza ectopica
8. Preparazione al parto
9. Cardiotocografia
10. Travaglio e stadi del parto
11. Analgesia del parto
12. Parto operativo e taglio cesareo
13. Post-partum e puerperio
14. Allattamento al seno
15. Preeclampsia
16. Placenta previa e distacco di placenta
17. Prolasso del funicolo
18. Rottura prematura delle membrane

Aggiornamenti applicati:

- classificazione moderna dei tre stadi del parto;
- eliminazione della vecchia regola rigida **1 cm/ora** come criterio isolato di distocia/intervento;
- preeclampsia descritta come sindrome ipertensiva multisistemica: proteinuria non obbligatoria se presenti specifici segni di danno d'organo; edema non necessario alla diagnosi;
- incremento ponderale in gravidanza individualizzato in base al BMI e al contesto;
- placenta previa/distacco e prolasso del funicolo ripuliti da percentuali e schemi terapeutici datati del compendio;
- PROM/PPROM trattate distinguendo epoca gestazionale e rischio infettivo/pretermine;
- precedente cesareo non presentato come indicazione automatica a cesareo ripetuto.

## Ginecologia — 14/14

Fonte primaria: `COMPENDIO GINE.pdf`.

Lezioni:

1. Anatomia dell'apparato genitale femminile
2. Ovaio e tube uterine
3. Utero, endometrio e miometrio
4. Ciclo ovarico ed endometriale
5. Menopausa
6. Endometriosi
7. Malformazioni mülleriane
8. Fibromi e polipi uterini
9. Cisti e neoformazioni ovariche
10. Screening del carcinoma cervicale
11. Colposcopia, biopsia e conizzazione
12. HPV e lesioni cervicali
13. Infezioni vulvovaginali e IST
14. Procreazione medicalmente assistita

Correzioni scientifiche principali:

- la vagina non viene descritta come provvista di ghiandole proprie diffuse: la lubrificazione deriva soprattutto da trasudazione e secrezioni cervicali/vestibolari;
- fibromi/leiomiomi descritti correttamente come tumori benigni della muscolatura liscia uterina;
- non tutte le malformazioni mülleriane sono considerate automaticamente causa di infertilità;
- endometriosi: laparoscopia non obbligatoria per ogni diagnosi; valorizzati quadro clinico ed imaging;
- cisti dermoide identificata come teratoma maturo; cistoadenomi distinti dai fibromi ovarici;
- CA-125 non presentato come screening generale del carcinoma ovarico;
- screening cervicale italiano aggiornato: Pap test generalmente 25–29 anni ogni 3 anni e HPV-DNA primario 30–64 anni ogni 5 anni nei programmi che hanno completato la transizione;
- HPV positivo distinto dalla diagnosi di carcinoma; persistenza di HPV ad alto rischio come elemento centrale;
- infertilità definita secondo OMS come mancata gravidanza dopo 12 mesi o più di rapporti regolari non protetti, con valutazione anticipabile in base a età/fattori clinici.

## File Materno

- `data/lezioni-materno.json` — roadmap completa delle 4 materie e primo pacchetto di Infermieristica Pediatrica;
- `data/lezioni-materno-infermieristica-2.json` — completamento Infermieristica Pediatrica;
- `data/lezioni-materno-pediatria.json` — 15 lezioni Pediatria;
- `data/lezioni-materno-ostetricia.json` — 18 lezioni Ostetricia;
- `data/lezioni-materno-ginecologia.json` — 14 lezioni Ginecologia;
- `lezioni-materno-loader.js` — carica e unisce i quattro pacchetti nel percorso `infermieristica-materno`;
- `lezioni.html` — importa il loader Materno con cache-busting aggiornato.

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
- apertura del PDF originale;
- layout responsive desktop/mobile.

## Regola contenuti

**Non inventare contenuti per riempire la roadmap.** Le lezioni devono derivare dai materiali reali del corso. Le fonti esterne autorevoli possono essere usate per correggere o aggiornare parti obsolete, ma non devono essere attribuite falsamente al PDF del corso.

Quando un argomento non è sufficientemente coperto dal materiale universitario e non esiste un'integrazione autorizzata/affidabile, il capitolo rimane **IN PREPARAZIONE**.

## Prossimo sviluppo

Il percorso **Infermieristica nel Materno è completo 62/62**.

Prossimo blocco consigliato per Lezioni: **Paziente chirurgico**, usando i PDF reali già presenti nella Biblioteca Materiali e mantenendo esattamente la stessa architettura e gli stessi standard di non regressione.

Restano inoltre 16 capitoli della roadmap di Anatomia Patologica non attivati per insufficiente copertura diretta nei materiali già verificati.
