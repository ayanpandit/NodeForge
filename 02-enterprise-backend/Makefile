.PHONY: install dev start test lint format docker-build docker-up docker-down clean

install:
	npm install

dev:
	npm run dev

start:
	npm start

test:
	npm test

lint:
	npm run lint

format:
	npm run format

docker-build:
	docker build -t nodeforge-enterprise-api .

docker-up:
	docker compose -f docker-compose.dev.yml up --build -d

docker-down:
	docker compose -f docker-compose.dev.yml down

clean:
	rm -rf node_modules coverage
