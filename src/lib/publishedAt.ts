// Artikel ohne gesetztes Datum sollen kein "Invalid Date" ausgeben. Kommt aus
// dem CMS ein leeres oder unlesbares published_at, bleibt die Datumszeile leer.
export function formatPublishedAt(value?: string): string {
  const date = new Date(value || '')
  if (Number.isNaN(date.getTime())) {
    return ''
  }
  return date.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Ohne (oder mit unlesbarem) Datum wuerde der Vergleich NaN liefern und die
// Reihenfolge waere undefiniert – solche Eintraege bekommen 0 und wandern ans Ende.
export function publishedAtSortKey(value?: string): number {
  const time = new Date(value || '').getTime()
  return Number.isNaN(time) ? 0 : time
}
