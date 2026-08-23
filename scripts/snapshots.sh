#!/usr/bin/env bash
#
# Fuehrt die visuelle Playwright-Suite im offiziellen Playwright-Docker-Image
# aus. Der Image-Tag MUSS zur installierten @playwright/test-Version passen
# (aktuell 1.61.1) – sonst passen die vorinstallierten Browser nicht.
#
# Nutzung:
#   scripts/snapshots.sh                     # vergleicht gegen Baselines
#   scripts/snapshots.sh --update-snapshots  # erzeugt/aktualisiert Baselines
#   scripts/snapshots.sh tests/visual/x.spec.ts   # nur eine Datei
#
# Alle Argumente werden an `playwright test` durchgereicht.
set -euo pipefail

IMAGE="mcr.microsoft.com/playwright:v1.61.1-noble"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# TTY nur anhaengen, wenn wir wirklich an einem Terminal haengen (CI-safe).
TTY_FLAG="-i"
[ -t 0 ] && TTY_FLAG="-it"

# Zusaetzliche docker-run-Argumente (z. B. Port-Publish fuer den UI-Mode):
#   PW_DOCKER_ARGS="-p 8080:8080" scripts/snapshots.sh --ui --ui-host=0.0.0.0 ...
docker run --rm $TTY_FLAG \
  --ipc=host \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  -e CI="${CI:-}" \
  -v "$PROJECT_DIR:/work" \
  -w /work \
  ${PW_DOCKER_ARGS:-} \
  "$IMAGE" \
  npx playwright test "$@"
