/**
 * The twelve Berlin boroughs (Bezirke) plus a best-effort keyword map used to
 * guess which borough an event belongs to from its (free-text) title. The
 * calendar has no structured location field, so this is intentionally fuzzy:
 * a borough matches if any of its keywords appears as a substring of the
 * (lower-cased) title. Keywords include the borough's sub-localities so an
 * event titled "… in Kreuzberg" still maps to "Friedrichshain-Kreuzberg".
 */
export interface BerlinDistrict {
  /** Canonical borough name shown in the filter. */
  name: string
  /** Lower-cased needles that map a title to this borough. */
  keywords: string[]
}

export const BERLIN_DISTRICTS: BerlinDistrict[] = [
  { name: 'Mitte', keywords: ['mitte', 'wedding', 'tiergarten', 'moabit', 'gesundbrunnen', 'hansaviertel'] },
  { name: 'Friedrichshain-Kreuzberg', keywords: ['friedrichshain-kreuzberg', 'friedrichshain', 'kreuzberg', 'xhain'] },
  { name: 'Pankow', keywords: ['pankow', 'prenzlauer berg', 'prenzlberg', 'prenzlauerberg', 'weißensee', 'weissensee', 'buch'] },
  { name: 'Charlottenburg-Wilmersdorf', keywords: ['charlottenburg-wilmersdorf', 'charlottenburg', 'wilmersdorf', 'halensee', 'grunewald', 'schmargendorf', 'westend'] },
  { name: 'Spandau', keywords: ['spandau', 'staaken', 'kladow', 'gatow', 'haselhorst', 'siemensstadt'] },
  { name: 'Steglitz-Zehlendorf', keywords: ['steglitz-zehlendorf', 'steglitz', 'zehlendorf', 'lichterfelde', 'lankwitz', 'dahlem', 'wannsee', 'nikolassee'] },
  { name: 'Tempelhof-Schöneberg', keywords: ['tempelhof-schöneberg', 'tempelhof-schoeneberg', 'tempelhof', 'schöneberg', 'schoeneberg', 'mariendorf', 'marienfelde', 'lichtenrade', 'friedenau'] },
  { name: 'Neukölln', keywords: ['neukölln', 'neukoelln', 'rudow', 'britz', 'buckow', 'gropiusstadt'] },
  { name: 'Treptow-Köpenick', keywords: ['treptow-köpenick', 'treptow-koepenick', 'treptow', 'köpenick', 'koepenick', 'adlershof', 'schöneweide', 'schoeneweide', 'baumschulenweg', 'friedrichshagen'] },
  { name: 'Marzahn-Hellersdorf', keywords: ['marzahn-hellersdorf', 'marzahn', 'hellersdorf', 'kaulsdorf', 'mahlsdorf', 'biesdorf'] },
  { name: 'Lichtenberg', keywords: ['lichtenberg', 'karlshorst', 'friedrichsfelde', 'hohenschönhausen', 'hohenschoenhausen', 'rummelsburg'] },
  { name: 'Reinickendorf', keywords: ['reinickendorf', 'tegel', 'wittenau', 'frohnau', 'hermsdorf', 'heiligensee', 'waidmannslust', 'lübars'] },
]

/** All borough names, in the canonical order above — for the filter options. */
export const BERLIN_DISTRICT_NAMES = BERLIN_DISTRICTS.map((d) => d.name)

/** Best-effort: which boroughs are mentioned in a free-text title. */
export function districtsInText(text: string): string[] {
  const hay = text.toLowerCase()
  return BERLIN_DISTRICTS.filter((d) => d.keywords.some((k) => hay.includes(k))).map(
    (d) => d.name,
  )
}
