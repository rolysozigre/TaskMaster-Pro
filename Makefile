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
	@echo "  make docker_up     → Lance l’environnement dockerisé"
	@echo "  make docker_build  → Build l’image Docker"
	@echo "  make docker_down   → Stoppe l’environnement Docker"

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

up:
	docker compose up

build:
	docker compose up --build

rebuild:
	docker compose down && docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

print_links:
	@echo "✅ Accès à l'application : http://localhost:3000"

