# Study Hub

Web app statica per simulazioni d'esame. Attualmente include **Scienze della Salute** con **459 domande**, 4 macroargomenti, rimescolamento A/B/C/D, spiegazioni, ripasso errori e salvataggio locale dei progressi.

## Pubblicazione su GitHub Pages

### Metodo consigliato: GitHub Actions

1. Crea un nuovo repository GitHub, ad esempio `study-hub`.
2. Carica **tutto il contenuto di questa cartella** nella radice del repository, inclusa la cartella `.github`.
3. Assicurati che il branch principale si chiami `main`.
4. Vai in **Settings → Pages**.
5. In **Build and deployment**, scegli **Source: GitHub Actions**.
6. Fai un commit/push su `main`.
7. Apri la scheda **Actions**: il workflow `Deploy GitHub Pages` pubblicherà automaticamente il sito.
8. Al termine, GitHub mostrerà l'indirizzo pubblico, normalmente:
   `https://NOMEUTENTE.github.io/NOMEREPOSITORY/`

Ogni nuovo commit su `main` aggiornerà automaticamente il sito.

## Metodo alternativo: Deploy from a branch

Se non vuoi usare Actions:

1. Vai in **Settings → Pages**.
2. Seleziona **Deploy from a branch**.
3. Scegli `main` e `/ (root)`.
4. Salva.

In questo caso il file `index.html` deve restare nella radice del repository.

## Struttura

- `index.html` — applicazione completa, inclusi stile, logica e banca delle 459 domande.
- `.nojekyll` — impedisce a GitHub Pages di applicare Jekyll.
- `.github/workflows/pages.yml` — pubblicazione automatica con GitHub Actions.

## Progressi degli utenti

I progressi sono salvati tramite `localStorage` nel browser di ciascun utente. Non vengono condivisi tra persone e non richiedono account o database.

## Aggiornamenti futuri

Per aggiungere altri esami si potrà aggiornare la stessa app mantenendo la homepage e le regole grafiche già definite.
