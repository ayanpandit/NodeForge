# Enterprise Node.js Backend Application Foundation

A complete, production-ready, enterprise-grade backend infrastructure setup using Node.js and ES Modules.

## Architectural Conventions

This project utilizes a **Modular Layered Architecture** with strict Separation of Concerns:

- **Loaders**: Bootstrapping phases for Express, security headers, routing, and processes connection pools.
- **Observability**: Raw Console JSON logging configuration matching modern orchestrator standards.
- **Routing**: API Routing bindings under `/api`.
- **Health probes**: Kubernetes endpoints mapped under `/healthz` (`/live`, `/ready`, `/status`).

## Getting Started

1. Set up dependencies:
   ```bash
   npm install
   ```
2. Set up environment:
   ```bash
   cp .env.example .env
   ```
3. Run hot watch mode:
   ```bash
   npm run dev
   ```

## Development Scripts

- `npm start`: Starts server listener in standard state.
- `npm run dev`: Starts live watch reload on source code modifications.
- `npm run lint`: Performs quality checks.
- `npm run format`: Beautifies formatting rules across all codebase.
- `npm run test`: Executes test runner verification.
- `npm run test:coverage`: Calculates coverage performance.
