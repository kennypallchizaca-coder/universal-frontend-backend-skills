# Universal Frontend Skills
### 12 bilingual agentic skills for portable frontend architecture

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

This frontend library gives an AI assistant a reusable playbook for setup, component boundaries, routing, forms, feedback, auth, data fetching, styling, and navigation without assuming a single framework.

**Scope notes:**
- The library is designed for real application work: SPAs, hybrid-rendered apps, and frontend delivery strategy with release readiness.
- React, Vue, and similar stacks are fully supported through these portable patterns, ensuring your AI builds robust boundaries instead of brittle, framework-specific cookbooks.

---

## Quick start

1. Copy the `frontend-skills/` folder into the AI assistant workspace.
2. Ask the agent explicitly:

> "Use the **@03-routing-strategy** skill to define layouts, lazy routes, and the right rendering mode for this app."

> "Apply **@05-ui-feedback-system** so the form has clear loading, empty, success, and error states with accessible behavior."

---

## Validation

Run `npm run validate` before publishing updates. The validator checks skill structure, markdown links, and JSON resources across the repository.

---

## Frontend skills index

| # | Skill | English Description | Descripcion (Espanol) | Risk |
|---|---|---|---|:---:|
| **01** | [**project-setup**](./01-project-setup/SKILL.md) | Establishes portable frontend setup, env hygiene, aliases, and delivery baseline | Define setup portable, orden de configuracion y baseline de entrega | 🟢 Low |
| **02** | [**component-architecture**](./02-component-architecture/SKILL.md) | Defines component boundaries, composition rules, and reusable UI primitives | Define limites de componentes, composicion y primitivas reutilizables | 🟢 Low |
| **03** | [**routing-strategy**](./03-routing-strategy/SKILL.md) | Organizes routing, layouts, lazy loading, and render strategy choices | Organiza rutas, layouts, lazy loading y decisiones de renderizado | 🟡 Medium |
| **04** | [**form-orchestration**](./04-form-orchestration/SKILL.md) | Structures reusable forms with validation, async checks, and server-error mapping | Estructura formularios reutilizables con validacion y mapeo de errores | 🟡 Medium |
| **05** | [**ui-feedback-system**](./05-ui-feedback-system/SKILL.md) | Standardizes UI feedback, heuristic checks, and accessibility-aware states | Estandariza feedback UI, heuristicas y estados accesibles | 🟢 Low |
| **06** | [**authentication-flow**](./06-authentication-flow/SKILL.md) | Owns session lifecycle, hydration, and auth state transitions | Controla el ciclo de sesion, la hidratacion y las transiciones auth | 🔴 High |
| **07** | [**styling-system**](./07-styling-system/SKILL.md) | Applies tokens, theming, responsive rules, and stack-aware styling choices | Aplica tokens, theming y decisiones de estilos segun el stack | 🟢 Low |
| **08** | [**state-management**](./08-state-management/SKILL.md) | Separates shared client state from remote cache and request state | Separa estado compartido del cache remoto y del estado de request | 🔴 High |
| **09** | [**data-fetching**](./09-data-fetching/SKILL.md) | Builds shared HTTP clients, repositories, and transport-aware tests | Construye clientes HTTP compartidos, repositorios y pruebas de transporte | 🔴 High |
| **10** | [**advanced-navigation**](./10-advanced-navigation/SKILL.md) | Adds breadcrumbs, URL pagination, and navigation-supporting UI patterns | Agrega breadcrumbs, paginacion por URL y ayudas visuales de navegacion | 🟢 Low |
| **11** | [**baas-integration**](./11-baas-integration/SKILL.md) | Integrates BaaS capabilities through provider adapters and clear boundaries | Integra capacidades BaaS mediante adaptadores y limites claros | 🔴 High |
| **12** | [**route-guards**](./12-route-guards/SKILL.md) | Protects navigation with auth-aware and guest-aware route rules | Protege la navegacion con reglas de ruta auth y guest | 🔴 High |

---

## Frontend resources index

These templates and references help adapt the skills to different frameworks while preserving the architectural intent.

| Skill | Resource | Purpose |
|---|---|---|
| 01 | [aliases.template.md](./01-project-setup/resources/aliases.template.md) | Align path aliases across compiler, bundler, test runner, and IDE |
| 01 | [env.template.md](./01-project-setup/resources/env.template.md) | Define safe public/private environment-variable handling by stack |
| 01 | [frontend-delivery-checklist.md](./01-project-setup/resources/frontend-delivery-checklist.md) | Baseline checklist for lint, typecheck, build, and release readiness |
| 01 | [frontend-deployment-strategy.md](./01-project-setup/resources/frontend-deployment-strategy.md) | Decide between static, SPA, and hybrid delivery targets |
| 02 | [component-primitives.matrix.md](./02-component-architecture/resources/component-primitives.matrix.md) | Map component primitives across Angular, React, Vue, and Astro |
| 02 | [smart-dumb-pattern.template.md](./02-component-architecture/resources/smart-dumb-pattern.template.md) | Explain container/presentational split as one optional composition pattern |
| 03 | [rendering-strategy.matrix.md](./03-routing-strategy/resources/rendering-strategy.matrix.md) | Compare CSR, SSR, SSG, ISR, and islands by use case |
| 04 | [dynamic-form-patterns.md](./04-form-orchestration/resources/dynamic-form-patterns.md) | Handle repeatable groups, conditional fields, and nested forms |
| 04 | [validation-engine.matrix.md](./04-form-orchestration/resources/validation-engine.matrix.md) | Choose a validation/form engine that matches the target stack |
| 05 | [usability-accessibility-checklist.md](./05-ui-feedback-system/resources/usability-accessibility-checklist.md) | Review focus, keyboard, copy, and error-prevention behavior |
| 05 | [ux-heuristics-reference.md](./05-ui-feedback-system/resources/ux-heuristics-reference.md) | Map Nielsen-style heuristics to practical UI review questions |
| 07 | [styling-strategy.matrix.md](./07-styling-system/resources/styling-strategy.matrix.md) | Compare utility CSS, scoped CSS, CSS-in-JS, and token-first setups |
| 08 | [global-store.template.md](./08-state-management/resources/global-store.template.md) | Structure portable shared-state patterns without coupling to one library |
| 09 | [http-testing.matrix.md](./09-data-fetching/resources/http-testing.matrix.md) | Cover repository, interceptor, form, and guard-adjacent transport tests |
| 10 | [pagination.template.md](./10-advanced-navigation/resources/pagination.template.md) | Normalize URL-driven pagination and navigation metadata |
| 11 | [baas-adapter-pattern.md](./11-baas-integration/resources/baas-adapter-pattern.md) | Separate provider bootstrap from capability adapters |
| 11 | [firebase-setup.template.md](./11-baas-integration/resources/firebase-setup.template.md) | Example setup for Firebase-style provider wiring |
| 12 | [guards.template.md](./12-route-guards/resources/guards.template.md) | Build auth/guest route guards against a hydrated session source |

---

## Design principles

- Treat framework APIs as implementation details, not as the architecture itself.
- Keep session lifecycle, provider integration, and route protection as separate responsibilities.
- Prefer reusable composition patterns over rigid one-framework recipes.
- Include feedback, accessibility, and delivery concerns as first-class frontend work.
