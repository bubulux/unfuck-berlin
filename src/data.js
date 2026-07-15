// STRUKTUR & LAYOUT bleiben hier im Code (nicht im CMS editierbar).
// REDAKTIONELLE INHALTE (Kandidaten, Termine, Texte, Bilder …) kommen aus
// src/content.js – das wird beim Build automatisch aus Sanity generiert.
import {
  KANDIDATEN,
  KANDIDAT_INNEN,
  SPITZENDUO_BASE,
  TERMINE,
  BEZIRK_THEMEN,
  NEUIGKEITEN,
  ZIELE,
  PLATZHALTER,
  PLATZHALTER_LANG,
  SEITEN,
  DYN_SEITEN,
} from "./content";

// Berlin districts with hex grid coordinates (col, row in odd-q layout) — Struktur, fix.
export const BEZIRKE = [
  { id: "spandau", name: "Spandau", col: 0, row: 1 },
  { id: "reinickendorf", name: "Reinickendorf", col: 1, row: 0 },
  { id: "pankow", name: "Pankow", col: 2, row: 0 },
  { id: "lichtenberg", name: "Lichtenberg", col: 3, row: 0 },
  { id: "marzahn", name: "Marzahn-Hellersdorf", col: 4, row: 0 },
  { id: "mitte", name: "Mitte", col: 1, row: 1 },
  { id: "charlottenburg", name: "Charlottenburg-Wilmersdorf", col: 0, row: 2 },
  { id: "friedrichshain", name: "Friedrichshain-Kreuzberg", col: 2, row: 1 },
  { id: "tempelhof", name: "Tempelhof-Schöneberg", col: 1, row: 2, active: true },
  { id: "neukoelln", name: "Neukölln", col: 2, row: 2 },
  { id: "treptow", name: "Treptow-Köpenick", col: 3, row: 1 },
  { id: "steglitz", name: "Steglitz-Zehlendorf", col: 0, row: 3 },
];

// Themen-Filter (Chips) — Struktur, fix.
export const THEMEN = [
  { id: "alle", label: "Alle" },
  { id: "bildung", label: "Bildung" },
  { id: "wohnung", label: "Wohnung" },
  { id: "muell", label: "Müll" },
  { id: "gruen", label: "Grünflächen" },
  { id: "digital", label: "Digitalisierung" },
  { id: "kultur", label: "Kultur" },
  { id: "sport", label: "Sport & Jugend" },
  { id: "sozial", label: "Soziale Gerechtigkeit" },
];

// "Was mehr?" Cross-Navigation (Routen) — Struktur, fix.
export const WAS_MEHR_LINKS = [
  { label: "Wahlprogram", to: "/wahlprogramm" },
  { label: "Kalendar", to: "https://voltdeutschland.org/berlin/veranstaltungen" },
  { label: "Alle Voltkandidaten", to: "https://voltdeutschland.org/berlin/menschen/kandidierende-agh-liste-2026" },
  // { label: "Sticker abgreifen", to: "/unfck-berlin#sticker" },
  // { label: "Unf*ck Berlin", to: "/unfck-berlin" },
  // { label: "Im Bezirk", to: "/im-bezirk" },
  { label: "Spenden", to: "https://voltdeutschland.org/berlin/spenden" },
  { label: "Mitmachen", to: "https://voltdeutschland.org/berlin/mitmachen" },
];

// Foto-Ausrichtung (Design) bleibt im Code; Fotos selbst kommen aus Sanity.
const FOTO_POS = { anna: "object-left-top", paul: "object-right-top" };
export const SPITZENDUO = SPITZENDUO_BASE.map((s) => ({
  ...s,
  fotoPos: FOTO_POS[s.slug] || "object-top",
}));

// Redaktionelle Inhalte aus Sanity durchreichen (Namen wie bisher).
export {
  KANDIDATEN,
  KANDIDAT_INNEN,
  TERMINE,
  BEZIRK_THEMEN,
  NEUIGKEITEN,
  ZIELE,
  PLATZHALTER,
  PLATZHALTER_LANG,
  SEITEN,
  DYN_SEITEN,
};
