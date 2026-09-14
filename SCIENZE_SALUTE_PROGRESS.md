# Scienze della Salute - stato operativo

Ultimo aggiornamento: 14 settembre 2026

## Stato corrente

L'esame **Scienze della Salute** contiene **459 domande** distribuite nei quattro macroargomenti:

- Infermieristica nell'evoluzione storica
- Epidemiologia
- Igiene e medicina preventiva
- Storia della medicina

La banca non è interamente organizzata in quattro blocchi contigui: nelle parti successive alcuni macroargomenti ricompaiono in intervalli diversi. La copertura viene quindi registrata per **ID di banca effettivamente completati**.

## Implementazione attiva

La Home apre `scienze-salute.html`, wrapper che carica `scienze-salute-app.html` in iframe.

`scienze-salute-app.html` resta il motore originale e contiene inline l'intera banca di **459 domande**. Durante il lavoro sulle spiegazioni avanzate questo file non viene modificato.

Restano invariati motore del quiz, banca, quattro opzioni, risposte corrette, modalità di sessione, rimescolamento A/B/C/D, punteggio, navigazione, risultato, ripasso errori e `localStorage`.

## Spiegazioni avanzate opzionali - 401/459

Copertura progressiva attiva per ID banca:

- `1–121` → Infermieristica nell'evoluzione storica
- `122–176` → Epidemiologia
- `177–220` → Igiene e medicina preventiva
- `221–270` → Storia della medicina
- `271–320` → Igiene e medicina preventiva
- `321–370` → Storia della medicina
- `371–379` → Infermieristica nell'evoluzione storica
- `380–392` → Storia della medicina
- `393–394` → Infermieristica nell'evoluzione storica
- `395–399` → Storia della medicina
- `400–401` → Infermieristica nell'evoluzione storica
- **Copertura avanzata totale continua: `1–401` = 401/459**

I macroargomenti possono ricomparire più avanti nella banca; non si deve dedurre la completezza globale di una materia soltanto dalla fine di un singolo intervallo.

## File dati

- `data/scienze-salute-explanations-001.json` → `1–40`
- `data/scienze-salute-explanations-002.json` → `41–80`
- `data/scienze-salute-explanations-003.json` → `81–100`
- `data/scienze-salute-explanations-004.json` → `101–120`
- `data/scienze-salute-explanations-005.json` → `121`
- `data/scienze-salute-explanations-006.json` → `122–161`
- `data/scienze-salute-explanations-007.json` → `162–201`
- `data/scienze-salute-explanations-008.json` → `202–241`
- `data/scienze-salute-explanations-009.json` → `242–281`
- `data/scienze-salute-explanations-010.json` → `282–321`
- `data/scienze-salute-explanations-011.json` → `322–361`
- `data/scienze-salute-explanations-012.json` → `362–401`

Ogni entry contiene `summary` e `reasons[4]`, con una motivazione per ciascuna alternativa nell'ordine originale della banca.

## Architettura fail-safe

`scienze-salute-explanations.js` viene iniettato opzionalmente dal wrapper dopo il caricamento dell'app originale.

L'enhancer:

- non modifica `scienze-salute-app.html`;
- non partecipa al caricamento obbligatorio della banca;
- non modifica domande, opzioni o indice corretto;
- carica i JSON con `Promise.allSettled`;
- valida ogni entry rispetto alla domanda originale;
- associa le motivazioni al testo dell'opzione originale, quindi le motivazioni seguono correttamente lo shuffle A/B/C/D;
- arricchisce il feedback solo dopo la correzione;
- se enhancer, JSON o singola entry non sono disponibili, mantiene il feedback base `q.e` e il quiz resta utilizzabile.

**Un problema delle spiegazioni avanzate non deve mai impedire avvio, svolgimento o completamento dell'esame.**

Quando l'entry è valida, il feedback mostra esito, risposta corretta nella posizione realmente mostrata, concetto chiave e quattro motivazioni separate con etichetta `CORRETTA` / `ERRATA`.

## Integrità della banca

Non sono stati modificati:

- `scienze-salute-app.html`;
- testi delle 459 domande;
- alternative;
- risposte corrette;
- ID o macroargomenti.

Le spiegazioni `1–401` sono dati aggiuntivi esterni alla banca originale.

## Commit recenti

Pilot10 — domande `322–361`:

- dati `011`: `dd38ce278e675060c143ec6b164d2c5529da9877`
- enhancer esteso a `361`: `869d446880170cdf9ff62bcf6fc0299f0c10a450`
- wrapper/cache enhancer `pilot10`: `019e6f233f3f7b3eb4c14f8d2ac91081c93d3a87`
- Home/cache-busting `pilot10`: `850d2965a1bfe2eb99cd5b8026164fbc867c44b6`

Pilot11 — domande `362–401`:

- dati `012`: `6972eafd97c0a5c49b00d44aa0afb9c9e1d8e890`
- enhancer esteso a `401`: `30374e186ade4baa28b286604eb7c3f0e0456596`
- wrapper/cache enhancer `pilot11`: `208e908037486d1985b54227da3ad558a96e24fe`
- Home/cache-busting `pilot11`: `a53754a8139d2aa3ab728c095a2683c6b1edf4b2`

## Punto di ripresa

La copertura avanzata è continua dalla domanda **1 alla 401**.

Il prossimo blocco parte dalla **domanda 402**, che prosegue in **Infermieristica nell'evoluzione storica**. Continuare nell'ordine reale della banca e registrare gli intervalli dei macroargomenti senza assumere che siano globalmente contigui.
