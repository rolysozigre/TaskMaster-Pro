# Makefile à placer à la racine du projet

APP_NAME=taskmaster-pro
DOCKER_IMAGE=taskmaster-pro-app
CONTAINER_NAME=taskmaster-pro-container

.PHONY: help install build start lint format test clean code_check docker_up docker_build docker_down

help:
	@echo "Commandes disponibles :"
	@echo "  make install       → Installe les dépendances"
	@echo "  make start         → Démarre l'app localement (Vite)"
	@echo "  make lint          → Lint le code avec ESLint"
	@echo "  make format        → Formate avec Prettier"
	@echo "  make test          → Lance les tests"
	@echo "  make code_check    → Lint + Format + Test"
	@echo "  make dev-build  → Build l’image Docker en developpement"
	@echo "  make dev-up     → Lance l’environnement dockerisé en dev"
	@echo "  make dev-down   → Stoppe l’environnement Docker en dev"
	@echo "  make prod-build  → Build l’image Docker en production"
	@echo "  make prod-up  → Lance l’environnement dockerisé en production"
	@echo "  make prod-down   → Stoppe l’environnement Docker en prod"

install:
	npm install

start:
	npm run dev

lint:
	npx eslint .

format:
	npx prettier --write .

test:
	npm run test

code_check: lint format test

code_fix:
	npx eslint . --fix
# === DEV ===
dev-up:
	docker compose -f compose.dev.yml up

dev-build:
	docker compose -f compose.dev.yml build

dev-deploy: dev-build dev-up

dev-down:
	docker compose -f compose.dev.yml down

# === PROD ===

prod-build:
	docker compose -f compose.yml build

prod-up:
	docker compose -f compose.yml up -d

prod-deploy: prod-build prod-up

prod-down:
	docker compose -f compose.yml down

logs:
	docker compose logs -f

print_links:
	@echo "✅ Accès à l'application en local: http://localhost:5173"
	@echo "✅ Accès à l'application en production: http://localhost"

