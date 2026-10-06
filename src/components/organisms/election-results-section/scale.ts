/** Prozentwert -> Breite/Position relativ zum Achsenmaximum. */
export function scale(value: number, max: number): string {
  return `${Math.min(100, (value / max) * 100)}%`
}
