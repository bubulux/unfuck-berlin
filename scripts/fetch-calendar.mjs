import { promises as fs } from 'fs';
import path from 'path';

const CALENDAR_ICS_PATH = 'https://calendar.google.com/calendar/ical/volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg%40group.calendar.google.com/public/basic.ics'
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar.generated.ics');
// /api/volt-berlin-public-calendar.ics
// /src/data/volt-berlin-public-calendar.generated.ics

async function fetchOnce() {
  // Timeout, damit ein haengender Google-Server den Build nicht blockiert.
  const response = await fetch(CALENDAR_ICS_PATH, { signal: AbortSignal.timeout(15000) });

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
  }

  const icsText = await response.text();

  // Sicherstellen, dass der Zielordner existiert
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });

  // ICS-Inhalt als Plain-Text speichern
  await fs.writeFile(OUTPUT_PATH, icsText, { encoding: 'utf-8' });

  return OUTPUT_PATH;
}

async function fetchCalendar() {
  // Ein Retry gegen transiente Aussetzer/Rate-Limits.
  try {
    return await fetchOnce();
  } catch (err) {
    console.warn('Kalender-Abruf fehlgeschlagen, ein erneuter Versuch:', err.message);
    await new Promise((r) => setTimeout(r, 1500));
    return await fetchOnce();
  }
}

fetchCalendar()
  .then((p) => console.info(`Kalender aktualisiert: ${p}`))
  .catch(async (err) => {
    console.warn('Kalender-Abruf endgueltig fehlgeschlagen:', err.message);
    // Fallback: die zuletzt eingecheckte .ics behalten, damit der Build (und der
    // Build-Zeit-Import in src/lib/calendar.ts) nicht bricht. Analog fetch-content.
    try {
      await fs.access(OUTPUT_PATH);
      console.warn('Behalte bestehende Kalender-Datei (letzter Stand).');
      process.exit(0);
    } catch {
      console.error('Keine Kalender-Datei vorhanden – Build kann nicht ohne Kalender starten.');
      process.exit(1);
    }
  });
