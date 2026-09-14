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

`scienze-salute-app.html` resta il motore originale e contiene inline l'intera banca di **459 domande**. Durante il lavoro sulle spiegazioni avanzate questo file non è stato modificato.

Restano invariati motore del quiz, banca, quattro opzioni, risposte corrette, modalità di sessione, rimescolamento A/B/C/D, punteggio, navigazione, risultato, ripasso errori e `localStorage`.

## Spiegazioni avanzate opzionali - COMPLETO 459/459

Copertura progressiva per ID banca:

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
- `400–402` → Infermieristica nell'evoluzione storica
- `403–407` → Storia della medicina
- `408` → Infermieristica nell'evoluzione storica
- `409–447` → Storia della medicina
- `448–450` → Infermieristica nell'evoluzione storica
- `451–459` → Storia della medicina
- **Copertura avanzata totale continua: `1–459` = 459/459**

Tutte le domande dell'esame dispongono ora della spiegazione avanzata concordata: concetto chiave, motivo della risposta corretta e motivo dell'errore per ciascuna delle altre tre alternative.

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
- `data/scienze-salute-explanations-013.json` → `402–459`

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

Le spiegazioni `1–459` sono dati aggiuntivi esterni alla banca originale.

## Commit finali

Pilot11 — domande `362–401`:

- dati `012`: `6972eafd97c0a5c49b00d44aa0afb9c9e1d8e890`
- enhancer esteso a `401`: `30374e186ade4baa28b286604eb7c3f0e0456596`
- wrapper/cache enhancer `pilot11`: `208e908037486d1985b54227da3ad558a96e24fe`
- Home/cache-busting `pilot11`: `a53754a8139d2aa3ab728c095a2683c6b1edf4b2`

Pilot12 — domande `402–459`:

- dati `013`: `edf3d581fe17e99b1c9e2e5967aee5b103e26db9`
- enhancer esteso a `459`: `81d3132ee541aaa9b7222dcbb1462be616a7fc92`
- wrapper/cache enhancer `pilot12`: `272209f94dc140d0211afc0c231a5932d9f35748`
- Home/cache-busting `pilot12`: `198bb41440c86c32f06918e3d81423d4677c3c4b`

## Punto di ripresa

**Nessun blocco residuo. Scienze della Salute è completa: 459/459 spiegazioni avanzate.**

Eventuali attività successive devono essere trattate come QA separato, manutenzione o nuove funzionalità, senza modificare la banca originale salvo autorizzazione esplicita.
