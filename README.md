# unfuck.berlin website

## Content aus Sanity

Redaktionelle Inhalte kommen aus dem Sanity Studio (`volt-kampagne/`, Projekt
`xzcgo5ky`), die Termine aus dem oeffentlichen Google Calendar. Beides wird vom
`prebuild`-Hook nach `src/data/*.generated.*` geschrieben und dort auch **im Git
eingecheckt**.

Warum eingecheckt: Die Dateien werden zur Build-Zeit importiert. Antwortet Sanity
oder Google Calendar beim Build nicht, greifen die Fetch-Skripte auf die zuletzt
eingecheckte Fassung zurueck – so bricht der Deploy nicht und Updates lassen sich
weiter ausliefern. Preis dafuer ist eine gewisse Drift zwischen eingecheckter und
echter Fassung, bis der naechste erfolgreiche Build sie erneuert.

Aktualisieren bzw. nach einem frischen Clone erzeugen:

```bash
npm run content          # veroeffentlichte Inhalte
npm run content:drafts   # Entwuerfe (Staging-Preview, liest .env.local)
```

`content:drafts` liest `SANITY_API_READ_TOKEN` aus `.env.local` (gitignored) und
zieht Sanity-Entwuerfe – dasselbe Verhalten wie Netlify-Preview-/Branch-Deploys.