// Wahlprogramm-Inhalte liegen im CMS als normale "article"-Dokumente, weil sie
// unter /news/<slug> ausgeliefert und von der Wahlprogramm-Seite aus verlinkt
// werden. In der News-Übersicht haben sie aber nichts zu suchen: über 20
// Mini-Manifesto-Sprachversionen würden die eigentlichen Meldungen verdrängen.
//
// Gefiltert wird über den Slug, weil das article-Schema kein Kategorie- oder
// Sichtbarkeits-Feld hat. Konvention im Studio: "manifesto-<lang>" für das
// vollständige Programm, "mini-manifesto-<lang>" für die Kurzfassung
// (inklusive Varianten wie "mini-manifesto-ar-version-1").
const MANIFESTO_SLUG = /^(mini-)?manifesto(-|$)/

export function isManifestoArticle(article: { slug?: string }): boolean {
  return MANIFESTO_SLUG.test((article.slug || '').trim().toLowerCase())
}

// Nur die Übersicht filtern – die Detailseiten unter /news/<slug> bleiben
// erreichbar, sonst brechen die Sprachlinks auf /wahlprogramm.
export function listableNews<T extends { slug?: string }>(articles: readonly T[]): T[] {
  return articles.filter((article) => !isManifestoArticle(article))
}
