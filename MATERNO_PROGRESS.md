# Infermieristica nel Materno — stato spiegazioni avanzate

Ultimo aggiornamento: 15 settembre 2026

## Stato corrente

- Banca totale: **300 domande**.
- Spiegazioni avanzate complete: **240/300**.
- Prossimo indice da elaborare: **241**.
- Restano: **60 domande**.

Ogni spiegazione avanzata contiene:
- una spiegazione generale del concetto;
- quattro motivazioni, una per ciascuna opzione originale A/B/C/D;
- indicazione sostanziale del perché l'opzione corretta è corretta e del perché le alternative sono errate;
- associazione alle opzioni originali preservata anche quando il quiz rimescola le risposte.

## Copertura per sezione

- **Infermieristica Pediatrica: 137/137** — COMPLETA (indici 1–137).
- **Pediatria: 55/55** — COMPLETA (indici 138–192).
- **Ostetricia: 48/53** — indici 193–240 completati; restano 241–245.
- **Ginecologia: 0/55** — indici 246–300 ancora da elaborare.

## Pacchetti spiegazioni

- `data/materno-explanations-001.json.gz.b64` → 1–40
- `data/materno-explanations-002.json.gz.b64` → 41–80
- `data/materno-explanations-003.json.gz.b64` → 81–120
- `data/materno-explanations-004.json.gz.b64` → 121–160
- `data/materno-explanations-005.json.gz.b64` → 161–200
- `data/materno-explanations-006.json.gz.b64` → 201–240

## Integrazione tecnica

`infermieristica-materno-explanations.js` è configurato con `EXPECTED_ADVANCED = 240` e carica i sei pacchetti sopra indicati.

Il controllo di coerenza della banca riconosce i confini reali delle quattro sezioni:
- 1–137 Infermieristica Pediatrica;
- 138–192 Pediatria;
- 193–245 Ostetricia;
- 246–300 Ginecologia.

Il vecchio controllo che richiedeva che tutte le domande avanzate appartenessero a Infermieristica Pediatrica è stato rimosso/generalizzato, così l'enhancer continua a funzionare oltre l'indice 137.

Il caricatore in `infermieristica-materno-plus.html` è stato reso più robusto: installazione all'evento `load`, controllo immediato dell'iframe già pronto e retry di sicurezza. Home, wrapper e enhancer usano cache-busting `pilot5`.

## Regola di ripresa

Alla prossima sessione **non rifare 1–240**. Riprendere da:

1. 241–245: ultime 5 domande di Ostetricia;
2. 246–280: prime 35 domande di Ginecologia;
3. 281–300: ultime 20 domande di Ginecologia.

Dopo il completamento portare `EXPECTED_ADVANCED` a 300 e verificare 300/300 entries valide, ciascuna con esattamente quattro `reasons` non vuote.
