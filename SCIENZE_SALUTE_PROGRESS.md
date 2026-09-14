# Scienze della Salute - stato operativo

Ultimo aggiornamento: 14 settembre 2026

## Stato corrente

L'esame **Scienze della Salute** contiene **459 domande** distribuite nei quattro macroargomenti:

- Infermieristica nell'evoluzione storica
- Epidemiologia
- Igiene e medicina preventiva
- Storia della medicina

La banca non è interamente organizzata in quattro blocchi contigui: nelle parti successive alcuni macroargomenti ricompaiono in intervalli diversi. Per questo la copertura viene registrata per **ID di banca effettivamente completati**.

## Implementazione attiva

La Home principale apre `scienze-salute.html`.

`scienze-salute.html` è il wrapper attivo e carica nello stesso dominio, tramite iframe, `scienze-salute-app.html`.

`scienze-salute-app.html` resta il motore originale dell'esame e contiene inline l'intera banca di **459 domande**. Durante il lavoro sulle spiegazioni avanzate questo file **non viene modificato**.

Restano invariati motore del quiz, banca, quattro opzioni, risposte corrette, modalità di sessione, rimescolamento A/B/C/D, punteggio, navigazione, risultato, ripasso errori e `localStorage`.

## Spiegazioni avanzate opzionali - 321/459

Copertura progressiva attiva per ID banca:

- `1–121` → Infermieristica nell'evoluzione storica
- `122–176` → Epidemiologia
- `177–220` → Igiene e medicina preventiva
- `221–270` → Storia della medicina
- `271–320` → Igiene e medicina preventiva
- `321` → Storia della medicina
- **Copertura avanzata totale continua: `1–321` = 321/459**

I primi due tratti originari sono completi nel loro intervallo iniziale: **Infermieristica 1–121** ed **Epidemiologia 122–176**. Dalla 271 la banca torna a intercalare i macroargomenti; non si deve quindi dedurre la completezza globale di una materia soltanto dal termine di un intervallo.

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

Ogni entry contiene:

- `summary`: concetto chiave;
- `reasons[4]`: una motivazione per ciascuna delle quattro opzioni nell'ordine originale della banca.

## Architettura fail-safe

`scienze-salute-explanations.js` viene iniettato opzionalmente da `scienze-salute.html` dopo il caricamento dell'app originale.

L'enhancer:

- non modifica `scienze-salute-app.html`;
- non partecipa al caricamento obbligatorio della banca;
- non modifica domande, opzioni o indice corretto;
- carica i JSON avanzati con `Promise.allSettled`;
- valida ogni entry rispetto alla domanda originale;
- associa le motivazioni al testo dell'opzione originale, così seguono correttamente lo shuffle A/B/C/D;
- osserva il feedback prodotto dal motore originale e lo arricchisce soltanto dopo la correzione;
- se enhancer, JSON o singola entry non sono disponibili, mantiene il feedback base `q.e` e il quiz continua a funzionare.

**Un problema delle spiegazioni avanzate non deve mai impedire avvio, svolgimento o completamento dell'esame.**

Quando l'entry avanzata è valida, il feedback mostra:

1. esito corretto/errato;
2. risposta corretta nella posizione A/B/C/D realmente mostrata;
3. concetto chiave;
4. quattro motivazioni separate;
5. etichetta `CORRETTA` o `ERRATA` per ogni alternativa.

## Integrità della banca

Non sono stati modificati:

- `scienze-salute-app.html`;
- testi delle 459 domande;
- alternative;
- risposte corrette;
- ID o macroargomenti.

Le spiegazioni `1–321` sono dati aggiuntivi esterni alla banca originale.

## Commit recenti

Pilot8 — domande `242–281`:

- dati `009`: `19b76c16b1c4001b4c87f1227e4965a2c78bb747`
- enhancer esteso a `281`: `3f6207905e90383766fefce6c60a3eeed20efc00`
- wrapper/cache enhancer `pilot8`: `29654c97519248a9bda1a8234f804e40076bd48e`
- Home/cache-busting `pilot8`: `35161c1abb1d10f1f36c915f04b1fe039a31ab43`

Pilot9 — domande `282–321`:

- dati `010`: `48a3cdb09fbf952d3594e3d27100f9ae94ef213c`
- enhancer finale esteso a `321`: `aa4ec1ab5cca0874cd9af999adff8019c8d3b092`
- wrapper/cache enhancer `pilot9`: `3ff18a54028d35fab0d2c1104603e75b2924590d`
- Home/cache-busting `pilot9`: `870a32a28e9b1c053542789bdade4d38a4ecf428`

## Punto di ripresa

La copertura avanzata è continua dalla domanda **1 alla 321**.

Il prossimo blocco parte dalla **domanda 322**, che prosegue in **Storia della medicina**. Continuare nell'ordine reale della banca, registrando gli intervalli dei macroargomenti senza assumere che siano globalmente contigui.
