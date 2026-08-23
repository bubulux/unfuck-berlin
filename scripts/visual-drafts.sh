#!/usr/bin/env bash
#
# Zeigt, welche visuellen Aenderungen die aktuellen Sanity-Entwuerfe gegenueber
# der veroeffentlichten Baseline einfuehren:
#   1. zieht Draft-Inhalte (content:drafts, liest .env.local),
#   2. laesst die visuelle Suite im Docker dagegen laufen (Vergleich, kein Update),
#   3. stellt danach IMMER die veroeffentlichten Inhalte wieder her.
#
# Schritt 3 laeuft auch bei gefundenen Unterschieden (Trap), damit src/data
# hinterher wieder = published = Baseline ist. Der Exit-Code der Suite bleibt
# erhalten, damit "keine Aenderung" (0) von "Aenderungen gefunden" (!=0)
# unterscheidbar ist.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo ">> Ziehe Draft-Inhalte aus Sanity (.env.local)..."
npm run content:drafts

restore() {
  local code=$?
  echo
  echo ">> Stelle veroeffentlichte Inhalte wieder her (src/data = published)..."
  npm run content || true
  exit "$code"
}
trap restore EXIT

echo ">> Vergleiche Draft-Rendering gegen die veroeffentlichte Baseline..."
npm run test:visual
