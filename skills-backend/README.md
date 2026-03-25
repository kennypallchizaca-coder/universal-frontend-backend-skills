# Universal Backend Skills
### 12 bilingual agentic skills for portable REST-first backend architecture
**Framework-agnostic patterns for service APIs, security, and production delivery**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)
[![Skills](https://img.shields.io/badge/Skills-12-blueviolet)]()

**Compatible AI Agents & Models:**  
[![Cursor](https://img.shields.io/badge/Cursor-AI-000000.svg?logo=cursor)]()
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-Enabled-eeeeee.svg?logo=github)]()
[![Windsurf](https://img.shields.io/badge/Windsurf-Ready-blue.svg)]()
[![Gemini](https://img.shields.io/badge/Gemini-Supported-1A73E8.svg?logo=google-gemini)]()
[![Claude](https://img.shields.io/badge/Claude-Supported-D97757.svg)]()
[![ChatGPT/Codex](https://img.shields.io/badge/ChatGPT%2FCodex-Supported-412991.svg?logo=openai)]()

---

## About this library

This backend library gives an AI assistant a reusable playbook for clean API architecture, request validation, data access, security, and production delivery without tying the guidance to one runtime or framework.

**Scope notes:**
- OpenAPI guidance lives inside [03-rest-api-design](./03-rest-api-design/SKILL.md), serving as the single source of truth for the API contract.
- GraphQL, gRPC, WebSockets, and SSE appear as transport decisions, not first-class tracks.
- The strongest coverage is for service-style web backends that expose HTTP APIs and need operational discipline.

---

## Quick start

1. Copy the `skills-backend/` folder into the AI assistant workspace.
2. Ask the agent explicitly:

> "Use the **@04-service-layer** skill to move the `Order` workflow out of controllers and into a reusable service boundary."

> "Apply **@12-production-deployment** to prepare this API for staging and production rollout."

---

## Validation

Run `npm run validate` before publishing updates. The validator checks every `SKILL.md`, relative markdown link, and JSON resource in the repository.

---

## Backend skills index

| # | Skill | English Description | Descripcion (Espanol) | Risk |
|---|---|---|---|:---:|
| **01** | [**project-bootstrap**](./01-project-bootstrap/SKILL.md) | Initializes backend entry point and base health contract | Inicializa el backend y su contrato base de salud | 🟢 Low |
| **02** | [**modular-project-structure**](./02-modular-project-structure/SKILL.md) | Organizes code by feature and layer boundaries | Organiza el codigo por feature y limites de capa | 🟢 Low |
| **03** | [**rest-api-design**](./03-rest-api-design/SKILL.md) | Defines REST contracts, envelopes, versioning, and OpenAPI discipline | Define contratos REST, envelopes, versionado y disciplina OpenAPI | 🟢 Low |
| **04** | [**service-layer**](./04-service-layer/SKILL.md) | Keeps business logic reusable, testable, and transport-independent | Mantiene la logica de negocio reutilizable y aislada del transporte | 🟢 Low |
| **05** | [**data-persistence**](./05-data-persistence/SKILL.md) | Encapsulates repositories, entities, and migration-aware persistence | Encapsula repositorios, entidades y persistencia lista para migraciones | 🟡 Medium |
| **06** | [**dto-and-validation**](./06-dto-and-validation/SKILL.md) | Enforces DTO or schema boundaries before business logic runs | Impone limites de DTO o schema antes de ejecutar negocio | 🟢 Low |
| **07** | [**error-handling**](./07-error-handling/SKILL.md) | Centralizes exception mapping and safe client-facing errors | Centraliza excepciones y errores seguros hacia el cliente | 🟡 Medium |
| **08** | [**entity-relationships**](./08-entity-relationships/SKILL.md) | Models ownership, relations, and safe serialization boundaries | Modela ownership, relaciones y limites seguros de serializacion | 🟡 Medium |
| **09** | [**advanced-querying**](./09-advanced-querying/SKILL.md) | Adds safe filtering, sorting, and paginated metadata | Agrega filtros, orden y metadata paginada de forma segura | 🟢 Low |
| **10** | [**jwt-authentication**](./10-jwt-authentication/SKILL.md) | Implements secure login, token issuance, and token validation | Implementa login seguro, emision y validacion de tokens | 🔴 High |
| **11** | [**authorization**](./11-authorization/SKILL.md) | Applies policy checks, ownership, and layered access control | Aplica politicas, ownership y control de acceso por capas | 🔴 High |
| **12** | [**production-deployment**](./12-production-deployment/SKILL.md) | Hardens release, observability, CI/CD, and rollback readiness | Endurece release, observabilidad, CI/CD y rollback | 🔴 High |

---

## Backend resources index

These resources help adapt the skills to different languages, frameworks, and hosting models without changing the architectural intent.

| Skill | Resource | Purpose |
|---|---|---|
| 01 | [health-check.template.md](./01-project-bootstrap/resources/health-check.template.md) | Base liveness contract with optional readiness extension |
| 01 | [`01-project-bootstrap/resources/.env.example`](./01-project-bootstrap/resources/.env.example) | Example environment layout for backend bootstrap |
| 02 | [module-structure.template.md](./02-modular-project-structure/resources/module-structure.template.md) | Portable feature-and-layer directory baseline |
| 02 | [naming-conventions.md](./02-modular-project-structure/resources/naming-conventions.md) | Naming patterns by language and layer |
| 03 | [api-contract.template.md](./03-rest-api-design/resources/api-contract.template.md) | Base contract template for resource-oriented APIs |
| 03 | [contract-test-checklist.md](./03-rest-api-design/resources/contract-test-checklist.md) | Verify real route behavior against the published contract |
| 03 | [http-status-reference.md](./03-rest-api-design/resources/http-status-reference.md) | Quick reference for intentional HTTP status choices |
| 03 | [openapi-quality-checklist.md](./03-rest-api-design/resources/openapi-quality-checklist.md) | Review OpenAPI accuracy, schema quality, and release readiness |
| 03 | [openapi-starter.template.md](./03-rest-api-design/resources/openapi-starter.template.md) | Start a portable OpenAPI document with stable envelopes |
| 03 | [transport-decision-guide.md](./03-rest-api-design/resources/transport-decision-guide.md) | Decide whether REST is the right fit before forcing it |
| 04 | [service-interface.template.md](./04-service-layer/resources/service-interface.template.md) | Service boundary template with optional explicit contract |
| 04 | [service-test-strategy.md](./04-service-layer/resources/service-test-strategy.md) | Minimum testing plan for service-level use cases |
| 05 | [shared-persistence-fields.template.md](./05-data-persistence/resources/shared-persistence-fields.template.md) | Shared persistence field patterns without assuming inheritance |
| 05 | [migration-strategy.md](./05-data-persistence/resources/migration-strategy.md) | Safe schema-change and migration guidance |
| 06 | [validation-rules-reference.md](./06-dto-and-validation/resources/validation-rules-reference.md) | Reusable validation-rule catalog |
| 08 | [relationship-decision.md](./08-entity-relationships/resources/relationship-decision.md) | Choose cardinality, ownership, and serialization boundaries |
| 09 | [`09-advanced-querying/resources/paginated-response.schema.json`](./09-advanced-querying/resources/paginated-response.schema.json) | JSON schema for paginated collection responses |
| 10 | [`10-jwt-authentication/resources/jwt-claims.schema.json`](./10-jwt-authentication/resources/jwt-claims.schema.json) | JSON schema for minimal JWT claim payloads |
| 11 | [security-layers.md](./11-authorization/resources/security-layers.md) | Map authentication, authorization, and ownership responsibilities |
| 12 | [edge-runtime.matrix.md](./12-production-deployment/resources/edge-runtime.matrix.md) | Choose the right runtime model for deployment |
| 12 | [observability-release-checklist.md](./12-production-deployment/resources/observability-release-checklist.md) | Release checklist for observability and rollback readiness |
| 12 | [process-supervision.template.md](./12-production-deployment/resources/process-supervision.template.md) | Supervision rules for native long-running processes |
| 12 | [reverse-proxy.template.md](./12-production-deployment/resources/reverse-proxy.template.md) | Minimum proxy responsibilities for public backend traffic |
| 12 | [release-pipeline.template.md](./12-production-deployment/resources/release-pipeline.template.md) | Portable CI/CD pipeline stages and release gates |

---

## Architecture order

Apply these skills in a natural backend build-out order:

```text
01  project-bootstrap
└── 02  modular-project-structure
    ├── 03  rest-api-design
    │   ├── 04  service-layer
    │   │   ├── 05  data-persistence
    │   │   │   └── 08  entity-relationships
    │   │   ├── 06  dto-and-validation
    │   │   └── 07  error-handling
    │   └── 09  advanced-querying
    ├── 10  jwt-authentication
    │   └── 11  authorization
    └── 12  production-deployment
```

---

## Design principles

- Keep transport thin and business rules reusable.
- Treat API contracts as code, not as after-the-fact documentation.
- Keep auth, authorization, validation, and error handling as explicit boundaries.
- Adapt naming and file structure to the target stack instead of copying examples literally.
