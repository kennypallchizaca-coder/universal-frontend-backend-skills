# Universal Full-Stack AI Skills Library
### 24 bilingual `SKILL.md` guides for portable frontend and backend work

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Frontend Skills](https://img.shields.io/badge/Frontend-12_Skills-blue.svg)](./frontend-skills/README.md)
[![Backend Skills](https://img.shields.io/badge/Backend-12_Skills-green.svg)](./skills-backend/README.md)
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%7C%20ES-orange.svg)]()
[![Validated](https://img.shields.io/badge/Status-Validated-success.svg)]()

**Compatible AI Agents & Models:**  
[![Cursor](https://img.shields.io/badge/Cursor-AI-000000.svg?logo=cursor)]()
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-Enabled-eeeeee.svg?logo=github)]()
[![Windsurf](https://img.shields.io/badge/Windsurf-Ready-blue.svg)]()
[![Gemini](https://img.shields.io/badge/Gemini-Supported-1A73E8.svg?logo=google-gemini)]()
[![Claude](https://img.shields.io/badge/Claude-Supported-D97757.svg)]()
[![ChatGPT/Codex](https://img.shields.io/badge/ChatGPT%2FCodex-Supported-412991.svg?logo=openai)]()

This repository is a **production-ready, documentation-driven skill library** tailored specifically for AI coding assistants (like Cursor, GitHub Copilot, Gemini, Codex, Windsurf, and Claude). It packages reusable frontend and backend playbooks as structured `SKILL.md` files, ensuring that your AI assistant builds with coherent, robust architecture rather than improvising from generic internet examples.

All skills are strictly bilingual (English/Spanish).

## Table of Contents

- [Purpose](#purpose)
- [Why AI Agents Need This](#why-ai-agents-need-this)
- [How to Use This Repository](#how-to-use-this-repository)
- [Repository Structure](#repository-structure)
- [Frontend Skill Catalog](#frontend-skill-catalog)
- [Backend Skill Catalog](#backend-skill-catalog)
- [Validation and Automation](#validation-and-automation)
- [License](#license)

## Purpose

AI assistants are powerful, but they often drift when a codebase lacks explicit implementation rules or context.

This repository provides:
- **Portable implementation guidance** for common tasks across any modern framework.
- **Clear architectural boundaries** covering routing, service layers, data fetching, authorization, and deployment.
- **Strictly validated structures** that ensure consistent execution (checked via `validate-skills.mjs`).
- **Bilingual instructions** in English and explicitly normalized Spanish with proper accents.

This is not a runnable application template; it is an **operating system of knowledge** for AI-assisted software development.

## Why AI Agents Need This

When you ask an AI to "build a login form," it often generates a monolith. By providing a skill like `@04-form-orchestration` or `@10-jwt-authentication`, the AI is forced to follow a specific, professional-grade pattern. 

**Each `SKILL.md` rigidly defines:**
1. **Description / Descripción:** What the skill is and why it matters.
2. **Objective / Objetivo:** When to use it and when NOT to use it.
3. **Inputs / Entradas:** What the agent needs to know before starting.
4. **Outputs / Salidas:** What the exact deliverable should look like.
5. **Execution Steps / Instrucciones:** A step-by-step implementation guide.
6. **Example Usage / Prompt:** A ready-to-use prompt template.
7. **Adaptation Checklist:** Verification rules to ensure the AI didn't blindly copy-paste.

## How to Use This Repository

1. **Clone or copy** the `frontend-skills/` or `skills-backend/` folders into your active workspace.
2. **Instruct your AI** to reference specific skills by name.

**Example Prompts:**
> "Use the **@03-routing-strategy** skill from `frontend-skills` to define layouts, lazy routes, and the right rendering mode for this app."

> "Use the **@04-service-layer** skill from `skills-backend` to move the `Order` workflow out of controllers and into a reusable, testable boundary."

> "Combine **@06-authentication-flow** and **@12-route-guards** to secure our React application."

## Repository Structure

```text
.
├── frontend-skills/          # 12 framework-agnostic UI skills
│   ├── 01-project-setup/
│   ├── ...
│   └── README.md
├── skills-backend/           # 12 REST-first backend skills
│   ├── 01-project-bootstrap/
│   ├── ...
│   └── README.md
├── scripts/
│   └── validate-skills.mjs   # Validation tooling
├── GUIDE_ALIGNMENT.md        # Traceability & source concepts
├── SECURITY.md               # Publishing safety rules
├── package.json              # Minimal Node metadata for validator
└── README.md
```

## Frontend Skill Catalog

| # | Skill | Focus |
|---|---|---|
| 01 | [project-setup](./frontend-skills/01-project-setup/SKILL.md) | Setup, aliases, environment hygiene, delivery |
| 02 | [component-architecture](./frontend-skills/02-component-architecture/SKILL.md) | Component boundaries, reusable UI primitives |
| 03 | [routing-strategy](./frontend-skills/03-routing-strategy/SKILL.md) | Layouts, lazy loading, rendering strategy |
| 04 | [form-orchestration](./frontend-skills/04-form-orchestration/SKILL.md) | Form structure, async validation, server-error map |
| 05 | [ui-feedback-system](./frontend-skills/05-ui-feedback-system/SKILL.md) | UI feedback states, accessibility, guidance |
| 06 | [authentication-flow](./frontend-skills/06-authentication-flow/SKILL.md) | Session lifecycle, auth state transitions |
| 07 | [styling-system](./frontend-skills/07-styling-system/SKILL.md) | Tokens, theming, responsive styling |
| 08 | [state-management](./frontend-skills/08-state-management/SKILL.md) | Shared client state, cache separation |
| 09 | [data-fetching](./frontend-skills/09-data-fetching/SKILL.md) | HTTP clients, interceptors, transport tests |
| 10 | [advanced-navigation](./frontend-skills/10-advanced-navigation/SKILL.md) | Breadcrumbs, URL pagination, URL state |
| 11 | [baas-integration](./frontend-skills/11-baas-integration/SKILL.md) | BaaS provider integration via adapters |
| 12 | [route-guards](./frontend-skills/12-route-guards/SKILL.md) | Auth/guest route protection |

*(For templates and schemas, see [frontend-skills/README.md](./frontend-skills/README.md))*

## Backend Skill Catalog

| # | Skill | Focus |
|---|---|---|
| 01 | [project-bootstrap](./skills-backend/01-project-bootstrap/SKILL.md) | Entry point, boostrap, health contracts |
| 02 | [modular-project-structure](./skills-backend/02-modular-project-structure/SKILL.md) | Feature-based directory structures |
| 03 | [rest-api-design](./skills-backend/03-rest-api-design/SKILL.md) | REST contracts, versioning, OpenAPI |
| 04 | [service-layer](./skills-backend/04-service-layer/SKILL.md) | Transport-independent business logic |
| 05 | [data-persistence](./skills-backend/05-data-persistence/SKILL.md) | Repositories, migrations, persistence models |
| 06 | [dto-and-validation](./skills-backend/06-dto-and-validation/SKILL.md) | Request validation, schema boundaries |
| 07 | [error-handling](./skills-backend/07-error-handling/SKILL.md) | Exception mapping, safe client errors |
| 08 | [entity-relationships](./skills-backend/08-entity-relationships/SKILL.md) | Relations, ownership, and serialization |
| 09 | [advanced-querying](./skills-backend/09-advanced-querying/SKILL.md) | Filtering, paginated response patterns |
| 10 | [jwt-authentication](./skills-backend/10-jwt-authentication/SKILL.md) | Login, token logic, claims generation |
| 11 | [authorization](./skills-backend/11-authorization/SKILL.md) | Policy checks, layered access control |
| 12 | [production-deployment](./skills-backend/12-production-deployment/SKILL.md) | Delivery, observability, CI/CD, rollbacks |

*(For templates and schemas, see [skills-backend/README.md](./skills-backend/README.md))*

## Validation and Automation

All content is heavily validated to ensure rigorous structure. Run:

```bash
npm run validate
```

This ensures:
1. Every `SKILL.md` adheres to the strict 7-part format.
2. All Markdown relative links correctly resolve to existing files.
3. All attached `.json` schemas and templates are valid.
4. No orphan dependencies exist.

## License

This project is released under the [MIT License](./LICENSE).
