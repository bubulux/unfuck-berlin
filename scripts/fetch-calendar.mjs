import { promises as fs } from 'fs';
import path from 'path';

const CALENDAR_ICS_PATH = 'https://calendar.google.com/calendar/ical/volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg%40group.calendar.google.com/public/basic.ics'
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'volt-berlin-public-calendar.generated.ics');
// /api/volt-berlin-public-calendar.ics
// /src/data/volt-berlin-public-calendar.generated.ics

async function fetchCalendar() {
  const response = await fetch(CALENDAR_ICS_PATH);

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

fetchCalendar()
