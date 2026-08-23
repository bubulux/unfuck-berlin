# unfuck.berlin website

## Content aus Sanity

Redaktionelle Inhalte kommen aus dem Sanity Studio (`volt-kampagne/`, Projekt
`xzcgo5ky`). Die Dateien unter `src/data/*.generated.*` sind **Build-Artefakte**
und liegen nicht im Git – Source of Truth ist Sanity. Sie werden bei jedem
Netlify-Build vom `prebuild`-Hook neu erzeugt.

Nach einem frischen Clone einmal generieren, bevor `dev`/`build` laufen:

```bash
npm run content          # veroeffentlichte Inhalte
npm run content:drafts   # Entwuerfe (Staging-Preview, liest .env.local)
```

`content:drafts` liest `SANITY_API_READ_TOKEN` aus `.env.local` (gitignored) und
zieht Sanity-Entwuerfe – dasselbe Verhalten wie Netlify-Preview-/Branch-Deploys.