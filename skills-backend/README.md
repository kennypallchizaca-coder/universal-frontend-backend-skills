# 🌌 Universal Backend Skills (Bilingual Edition)
### The Ultimate Collection of 12 Agentic Skills for Claude Code, Gemini CLI, Cursor, Copilot & More
**Battle-tested · Framework-agnostic · Language-agnostic · Java · Node.js · Python · Go**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-12-blueviolet)]()

---

## 🌎 About this Library / Sobre esta Librería

**(EN):** Welcome to the Universal Backend Skills Library. This is a complete operating system for your AI agent to implement any backend pattern correctly, every time. Every skill here is entirely bilingual, providing AI models with precise contextual mappings without degrading logic.

**(ES):** Bienvenido a la librería Universal Backend Skills. Este es un sistema operativo completo para que tu agente de Inteligencia Artificial implemente cualquier patrón backend correctamente cada vez. Cada skill aquí es completamente bilingüe, proveyendo a los modelos de IA mapas contextuales precisos sin degradar la lógica.

---

## ⚡️ Quick Start / Inicio Rápido

**(EN):**
1. Copy the `skills-backend/` folder into your AI assistant workspace.
2. Ask your agent explicitly:
> "Use the **@04-service-layer** skill to implement the `OrderService` for my backend project."

**(ES):**
1. Copia la carpeta `skills-backend/` dentro de tu espacio de asistente IA.
2. Pide a tu agente explícitamente:
> "Usa la skill **@04-service-layer** para implementar el `OrderService` para mi proyecto backend."

---

## Validation

Run `npm run validate` before publishing updates to verify every skill file, relative markdown link, and JSON schema in this repository.

---

## 📚 Backend Skills Index / Índice de Skills Backend

| # | Skill | English Description | Descripción (Español) | Risk |
|---|-------|---------------------|-----------------------|:----:|
| **01** | [**project-bootstrap**](./01-project-bootstrap/SKILL.md) | Initializes backend from scratch | Inicializa servidor HTTP desde cero | 🟢 Low |
| **02** | [**modular-project-structure**](./02-modular-project-structure/SKILL.md) | Domain-driven folder routing | Ruteo de carpetas guiado por dominio | 🟢 Low |
| **03** | [**rest-api-design**](./03-rest-api-design/SKILL.md) | Standard HTTP REST mapping | Mapeo HTTP REST estándar | 🟢 Low |
| **04** | [**service-layer**](./04-service-layer/SKILL.md) | Business Logic encapsulated | Lógica de Negocio encapsulada | 🟢 Low |
| **05** | [**data-persistence**](./05-data-persistence/SKILL.md) | ORM Repository abstraction | Abstracción de Repositorio ORM | 🟡 Medium |
| **06** | [**dto-and-validation**](./06-dto-and-validation/SKILL.md) | Request Payload strict validation | Validación estricta de Payloads | 🟢 Low |
| **07** | [**error-handling**](./07-error-handling/SKILL.md) | Global centralized try/catch | Excepciones Globales centralizadas | 🟡 Medium |
| **08** | [**entity-relationships**](./08-entity-relationships/SKILL.md) | Foreign Keys and Joins isolation | Aislamiento de Llaves Foráneas y Joins | 🟡 Medium |
| **09** | [**advanced-querying**](./09-advanced-querying/SKILL.md) | Native limits and URL queries | Límites nativos y Paginated URLs | 🟢 Low |
| **10** | [**jwt-authentication**](./10-jwt-authentication/SKILL.md) | Passwords & Web Token Issuance | Contraseñas y Emisión JWT | 🔴 High|
| **11** | [**authorization**](./11-authorization/SKILL.md) | Role Guard Route Blockers | Guardias bloqueadores de Rol | 🔴 High|
| **12** | [**production-deployment**](./12-production-deployment/SKILL.md) | Secure Dockerfile instancing | Instanciación segura de Dockerfile | 🔴 High|

---

## 🔗 Architecture Tree / Árbol de Arquitectura

**Apply skills in order / Aplica estas skills en estricto orden:**

```text
01  project-bootstrap
└── 02  modular-project-structure
    ├── 03  rest-api-design
    │   ├── 04  service-layer
    │   │   ├── 05  data-persistence
    │   │   │   └── 08  entity-relationships
    │   │   ├── 06  dto-and-validation
    │   │   └── 07  error-handling  ◄── Safety Net / Red de salvavidas
    │   └── 09  advanced-querying
    ├── 10  jwt-authentication
    │   └── 11  authorization
    └── 12  production-deployment
```

---

> ⭐ **Bilingual Architecture:** *All native files hold identical logic in both English and Spanish contexts ensuring AI models execute variables accurately.*
