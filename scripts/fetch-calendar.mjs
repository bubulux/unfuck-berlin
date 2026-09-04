import { promises as fs } from 'fs';
import path from 'path';


// const CALENDAR_ICS_PATH_LUMA = 'https://api.luma.com/ics/get?entity=calendar&id=cal-wsWAMhhqMgzBFdK'

export const calenders = [
  {
    NAME: 'Volt Berlin (public)',
    ICS_PATH: 'https://calendar.google.com/calendar/ical/volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg%40group.calendar.google.com/public/basic.ics',
    OUTPUT_PATH: path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar.generated.ics'),
  },
  {
    NAME: 'Volt Berlin (public fallback)',
    ICS_PATH: 'https://calendar.google.com/calendar/ical/c_f98aa796c20d52a83b00d89dcf8bbb1787e149e10ec7f6103dee5c58e0962541%40group.calendar.google.com/public/basic.ics',
    OUTPUT_PATH: path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar-FALLBACK.generated.ics'),
  }
]

// const CALENDAR_ICS_PATH = 'https://calendar.google.com/calendar/ical/volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg%40group.calendar.google.com/public/basic.ics'
// const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar.generated.ics');

// const CALENDAR_ICS_PATH_FALLBACK = 'https://calendar.google.com/calendar/ical/c_f98aa796c20d52a83b00d89dcf8bbb1787e149e10ec7f6103dee5c58e0962541%40group.calendar.google.com/public/basic.ics'
// const OUTPUT_PATH_FALLBACK = path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar-FALLBACK.generated.ics');

// /api/volt-berlin-public-calendar.ics
// /src/data/volt-berlin-public-calendar.generated.ics

async function fetchOnce(CAL_PATH, save_path) {
  // Timeout, damit ein haengender Google-Server den Build nicht blockiert.
  const response = await fetch(CAL_PATH, { signal: AbortSignal.timeout(15000) });

  if (!response.ok) {
    throw new Error(`Failed to fetch calendar: ${response.status} ${response.statusText}`);
  }

  const icsText = await response.text();

  // Sicherstellen, dass der Zielordner existiert
  await fs.mkdir(path.dirname(save_path), { recursive: true });

  // ICS-Inhalt als Plain-Text speichern
  await fs.writeFile(save_path, icsText, { encoding: 'utf-8' });

  return save_path;
}

async function fetchCalendar(CAL_PATH, save_path) {
  // Ein Retry gegen transiente Aussetzer/Rate-Limits.
  try {
    return await fetchOnce(CAL_PATH, save_path);
  } catch (err) {
    console.warn('Kalender-Abruf fehlgeschlagen, ein erneuter Versuch:', err.message);
    await new Promise((r) => setTimeout(r, 1500));
    return await fetchOnce(CAL_PATH, save_path);
  }
}

for (const cal of calenders) {
  const { ICS_PATH, OUTPUT_PATH } = cal
  fetchCalendar(ICS_PATH, OUTPUT_PATH)
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

}
