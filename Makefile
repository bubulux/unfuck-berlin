# Handliche Shortcuts fuer die haeufigsten Aufgaben.
# `make` oder `make help` zeigt die Uebersicht.

.PHONY: help dev content content-drafts visual visual-update visual-ui

help: ## Diese Uebersicht anzeigen
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

dev: ## Lokalen Vite-Dev-Server starten
	npm run dev

content: ## Inhalte aus Sanity generieren (nur veroeffentlicht)
	npm run content

content-drafts: ## Inhalte aus Sanity generieren inkl. Entwuerfe (liest .env.local)
	npm run content:drafts

visual: ## Visuelle Regression im Docker gegen die Baselines pruefen
	npm run test:visual

visual-update: ## Baselines der visuellen Suite neu erzeugen/aktualisieren
	npm run test:visual:update

visual-drafts: ## Draft-Inhalte visuell gegen die veroeffentlichte Baseline pruefen (danach published wiederhergestellt)
	bash scripts/visual-drafts.sh

visual-production: ## Suite gegen die Produktions-URL laufen lassen (kein lokaler Server)
	PW_BASE_URL=https://unfuckberlin.netlify.app bash scripts/snapshots.sh

visual-report: ## Letzten Playwright-HTML-Report oeffnen (Host, ohne Docker)
	npx playwright show-report

visual-ui: ## Playwright UI-Mode im Docker starten -> http://localhost:8080
	PW_DOCKER_ARGS="-p 8080:8080" bash scripts/snapshots.sh --ui --ui-host=0.0.0.0 --ui-port=8080
