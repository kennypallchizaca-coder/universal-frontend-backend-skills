# 🌌 Universal Backend Skills: 12 Agentic Skills for Claude Code, Gemini CLI, Cursor, Copilot & More

### The Ultimate Collection of Universal Backend Skills for AI Coding Assistants
**Battle-tested · Framework-agnostic · Language-agnostic · Java · Node.js · Python · Go · and more**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-12-blueviolet)]()
[![Claude Code](https://img.shields.io/badge/Claude_Code-✓-orange)]()
[![Gemini CLI](https://img.shields.io/badge/Gemini_CLI-✓-blue)]()
[![Cursor](https://img.shields.io/badge/Cursor-✓-black)]()
[![Antigravity](https://img.shields.io/badge/Antigravity-✓-purple)]()
[![VS Code Copilot](https://img.shields.io/badge/Copilot-✓-007ACC)]()

---

## Table of Contents

- [🚀 New Here? Start Here!](#-new-here-start-here)
- [🔌 Compatibility & Invocation](#-compatibility--invocation)
- [📚 Browse the 12 Skills](#-browse-the-12-skills)
- [🔗 Skill Dependency Map](#-skill-dependency-map)
- [📁 Resources Index](#-resources-index)
- [🔁 Placeholder Convention](#-placeholder-convention)
- [⚖️ License](#️-license)

---

## 🚀 New Here? Start Here!

**Welcome to the Universal Backend Skills Library.** This isn't just documentation — it's a complete operating system for your AI agent to implement any backend pattern correctly, every time.

### 1. 🐣 Context: What is this?

AI Agents (like Claude Code, Cursor, or Gemini) are smart, but they lack **specific implementation playbooks**. These **Skills** are markdown files that teach your agent exactly how to do backend tasks correctly — in any language, any framework, any project.

Each skill includes:
- **Descripción** — what the skill does (in Spanish)
- **Entradas / Salidas** — inputs and outputs with a clear table
- **Pasos de funcionamiento** — numbered steps your agent follows
- **Ejemplo de uso** — a ready-to-use prompt + expected output
- **Resources** — supporting files with templates, schemas, and references

### 2. ⚡️ Quick Start (1 minute)

Copy or clone the `skills/` folder into your project root. Then ask your agent:

> "Use the **@04-service-layer** skill to implement the `OrderService` for my Spring Boot project. Rule: orders cannot be cancelled once shipped."

> "Apply **@07-error-handling** to set up centralized error handling in my Express + TypeScript API."

> "Follow **@09-advanced-querying** to add filtering by `status` and pagination to `GET /api/invoices`."

### 3. 🧠 How to use

1. **Identify the skill** matching your current task.
2. **Open the SKILL.md** and read the `Pasos de funcionamiento` section.
3. **Copy the Example Prompt** at the bottom, adapt the placeholders to your entities.
4. **Send the prompt** to your AI agent.
5. **Check the Resources** folder for templates, schemas, or reference guides the agent can use.

---

## 🔌 Compatibility & Invocation

These skills follow the universal `SKILL.md` format and work with any AI coding assistant.

| Tool | Type | Invocation Example | Path |
|------|------|--------------------|------|
| **Claude Code** | CLI | `>> Use @skill-name to...` | `.claude/skills/` |
| **Gemini CLI** | CLI | `Use skill-name to...` | `.gemini/skills/` |
| **Cursor** | IDE | `@skill-name in Chat` | `.cursor/skills/` |
| **Antigravity** | IDE | `Use @skill-name` | `.agent/skills/` |
| **VS Code Copilot** | Ext | Paste SKILL.md content as context | N/A |
| **OpenCode** | CLI | `opencode run @skill-name` | `.agents/skills/` |
| **Any LLM** | Any | Attach the SKILL.md as context | Any |

---

## 📚 Browse the 12 Skills

| # | Skill | Descripción | Risk |
|---|-------|-------------|:----:|
| 01 | [**project-bootstrap**](./01-project-bootstrap/SKILL.md) | Inicializa el servidor HTTP con un endpoint `/health` | 🟢 Low |
| 02 | [**modular-project-structure**](./02-modular-project-structure/SKILL.md) | Organiza el proyecto en módulos independientes por dominio | 🟢 Low |
| 03 | [**rest-api-design**](./03-rest-api-design/SKILL.md) | Implementa CRUD REST con verbos HTTP semánticos y DTOs | 🟢 Low |
| 04 | [**service-layer**](./04-service-layer/SKILL.md) | Centraliza toda la lógica de negocio en servicios inyectables | 🟢 Low |
| 05 | [**data-persistence**](./05-data-persistence/SKILL.md) | Conecta a BD con ORM, BaseEntity y patrón repositorio | 🟡 Medium |
| 06 | [**dto-and-validation**](./06-dto-and-validation/SKILL.md) | Separa contratos I/O y valida datos de entrada declarativamente | 🟢 Low |
| 07 | [**error-handling**](./07-error-handling/SKILL.md) | Manejo global de errores: excepciones tipadas y respuestas uniformes | 🟡 Medium |
| 08 | [**entity-relationships**](./08-entity-relationships/SKILL.md) | Mapea relaciones 1:1, 1:N y N:N con carga LAZY | 🟡 Medium |
| 09 | [**advanced-querying**](./09-advanced-querying/SKILL.md) | Filtrado dinámico y paginación en cualquier endpoint GET | 🟢 Low |
| 10 | [**jwt-authentication**](./10-jwt-authentication/SKILL.md) | Auth stateless: registro, login y filtro JWT | 🔴 High |
| 11 | [**authorization**](./11-authorization/SKILL.md) | Control de acceso por roles (RBAC) y validación de ownership | 🔴 High |
| 12 | [**production-deployment**](./12-production-deployment/SKILL.md) | Despliega en Linux, Docker o PaaS con HTTPS y secretos seguros | 🔴 High |

---

## 🔗 Skill Dependency Map

Apply skills in order for a new project. Each skill builds on the previous ones.

```
01  project-bootstrap
└── 02  modular-project-structure
    ├── 03  rest-api-design
    │   ├── 04  service-layer
    │   │   ├── 05  data-persistence
    │   │   │   └── 08  entity-relationships
    │   │   ├── 06  dto-and-validation
    │   │   └── 07  error-handling  ◄── apply early, before the first endpoint
    │   └── 09  advanced-querying
    ├── 10  jwt-authentication
    │   └── 11  authorization
    └── 12  production-deployment
```

> **Apply Skill 07 (`error-handling`) before your first endpoint.** It acts as the safety net for everything else.

---

## 📁 Resources Index

Each skill includes a `resources/` folder with supporting files. These are templates, schemas, and guides you can pass directly to your agent as context.

| Skill | Resource | Type | Purpose |
|-------|----------|:----:|---------|
| 01 | [`resources/.env.example`](./01-project-bootstrap/resources/.env.example) | Config | Environment variables template |
| 01 | [`resources/health-check.template.md`](./01-project-bootstrap/resources/health-check.template.md) | Template | `/health` endpoint in 4 languages |
| 02 | [`resources/module-structure.template.md`](./02-modular-project-structure/resources/module-structure.template.md) | Template | Universal domain folder scaffold |
| 02 | [`resources/naming-conventions.md`](./02-modular-project-structure/resources/naming-conventions.md) | Reference | Naming rules by language and layer |
| 03 | [`resources/api-contract.template.md`](./03-rest-api-design/resources/api-contract.template.md) | Template | API contract documentation per resource |
| 03 | [`resources/http-status-reference.md`](./03-rest-api-design/resources/http-status-reference.md) | Reference | HTTP status codes by operation |
| 04 | [`resources/service-interface.template.md`](./04-service-layer/resources/service-interface.template.md) | Template | Service interface + implementation skeleton in 4 languages |
| 05 | [`resources/base-entity.template.md`](./05-data-persistence/resources/base-entity.template.md) | Template | BaseEntity with `id`, `createdAt`, `updatedAt` in 4 languages |
| 05 | [`resources/migration-strategy.md`](./05-data-persistence/resources/migration-strategy.md) | Reference | Migration strategy by ORM and environment |
| 06 | [`resources/validation-rules-reference.md`](./06-dto-and-validation/resources/validation-rules-reference.md) | Reference | Validation annotations by language |
| 07 | [`resources/error-response.schema.json`](./07-error-handling/resources/error-response.schema.json) | Schema | JSON Schema of the standard error response |
| 08 | [`resources/relationship-decision.md`](./08-entity-relationships/resources/relationship-decision.md) | Reference | Guide for choosing the correct relationship type |
| 09 | [`resources/paginated-response.schema.json`](./09-advanced-querying/resources/paginated-response.schema.json) | Schema | JSON Schema of the standard paginated response |
| 10 | [`resources/jwt-claims.schema.json`](./10-jwt-authentication/resources/jwt-claims.schema.json) | Schema | JSON Schema of the JWT payload claims |
| 11 | [`resources/security-layers.md`](./11-authorization/resources/security-layers.md) | Reference | Security model diagram and test cases |
| 12 | [`resources/Dockerfile.template`](./12-production-deployment/resources/Dockerfile.template) | Template | Multi-stage Dockerfile in 4 languages |
| 12 | [`resources/.env.production.example`](./12-production-deployment/resources/.env.production.example) | Config | Production environment variables template |

---

## 🔁 Placeholder Convention

Every skill uses placeholders instead of project-specific names. Replace them before sending the prompt to your agent.

| Placeholder | Replace with | Example |
|-------------|-------------|---------|
| `{Resource}` | Entity name, PascalCase | `Order`, `Invoice`, `Appointment` |
| `{resources}` | Plural lowercase, for routes/tables | `orders`, `invoices`, `appointments` |
| `{field_1}`, `{field_2}` | Real field names of the entity | `title`, `amount`, `scheduledAt` |
| `{domain}` | Business domain, kebab-case | `billing`, `inventory`, `hr` |
| `{identifier}` | User identification field | `email`, `username`, `phone` |
| `{ROLENAME}` | Role name in your system | `ADMIN`, `EDITOR`, `VIEWER` |
| `{ownerField}` | Field that identifies the owner | `ownerId`, `authorId`, `createdBy` |
| `{app-name}` | Application name, kebab-case | `orders-api`, `clinic-backend` |

---

## ⚖️ License

MIT License — free to use, modify, and distribute in any project.

---

> ⭐ If these skills saved you time, share them with your team.
