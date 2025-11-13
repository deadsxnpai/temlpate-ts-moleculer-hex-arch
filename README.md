[![Moleculer]()](https://moleculer.services)

# Moleculer Hexagonal Architecture Template

A **Moleculer.js** microservices template with **Hexagonal Architecture** (Ports & Adapters) for clean, maintainable, and testable services.

---

## 📦 Project Structure

```
├── src/
│ ├── application/ # Application layer (use cases, business logic)
│ │   ├── use-cases/
│ │   └── DTO/ # Data Transfer Objects
│ │
│ ├── domain/ # Domain layer (core business models)
│ │   ├── entities/ # Business entities
│ │   └── ports/[in/out] # Repository interfaces (ports)
│ │
│ └── infrastructure/ # Infrastructure layer (adapters)
│     ├── adapters/[in/out] # External adapters (DB, APIs, etc.)
│     ├── config/ # Configuration files
│     ├── di/ # dependency inversion container
│     ├── moleculer/ # moleculer
│     │   └── moleculer.config.ts # Moleculer broker config
│     └── utils/ # Utilities/helpers
├── test/ # Tests
│   ├── unit/ # Unit tests
│   ├── integration/ # Integration tests
│   └── e2e/ # End-to-end tests
│
├── .env # Environment variables
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Requirements

- Node.js (v18+)
- Moleculer CLI (`npm install -g moleculer-cli`)
- Docker (optional, for infrastructure services)

### Installation

1. Clone the repository and run:
   ```bash
   git clone https://git.tsutmb.ru/deadsxnpai/template.git
   ```
1. Install dependencies:
   ```bash
   npm install
   ```
1. Cp env file:
   ```bash
   cp .env.example .env
   ```
1. Run app
   ```bash
   npm run dev
   ```

---

### Key Concepts

1. Hexagonal Architecture

- Domain Layer: Core business logic (entities, ports).
- Application Layer: Use cases and service orchestration.
- Infrastructure Layer: External adapters (DB, APIs, etc.).

### Testing

- Unit Tests: Test individual use cases and adapters.
- Integration Tests: Test service interactions.
- E2E Tests: Test full API flows.

1. Run test
   ```bash
   npm run test
   ```

### API Documentation

there will be api docs
