# Guide Alignment

This file documents how the skills in this repository trace back to the source material in:

- `icc-ppw-frameworks-backend-main`
- `icc-ppw-frameworks-web-main`

It is meant to make the relationship explicit for future maintenance.

## Rights and provenance note

- These alignment notes exist for maintenance provenance only.
- Publishing this repository assumes the maintainer either authored the referenced teaching material or has permission or a compatible license to publish rewritten derivative guidance based on it.
- Do not copy source text, screenshots, branding assets, student submissions, or other third-party material into this repository unless the publication rights and required attribution are documented.
- Keep references generic and repository-relative; do not publish private local filesystem paths or personal workstation metadata.

The source guide is strongly oriented toward Angular on the frontend and Spring-style patterns on the backend. The skills in this repository intentionally preserve the same architectural intent, sequencing, and quality constraints while rewriting the instructions in framework-agnostic terms so they can be applied across runtimes without copying framework-specific syntax as if it were universal.

## Alignment Status

`Direct` means the skill maps closely to one main practice or concept document.

`Synthesized` means the skill was derived from multiple documents or from repeated patterns shown in the guide, not from a single exact file.

## Backend Skills

| Skill | Source Guide Files | Status | Notes |
|---|---|---|---|
| `01-project-bootstrap` | `docs/01_conceptos_backend.md`, `docs/02_arquitectura_backend.md` | Synthesized | Covers backend bootstrap and HTTP base setup from the conceptual introduction. |
| `02-modular-project-structure` | `docs/02_arquitectura_backend.md` | Direct | Focused on feature-based structure and layer separation. |
| `03-rest-api-design` | `docs/03_api_rest_conceptos.md` | Direct | Maps REST resources, verbs, and status codes. |
| `04-service-layer` | `docs/04_controladores_servicios.md` | Direct | Mirrors controller/service separation and dependency injection intent. |
| `05-data-persistence` | `docs/05_repositorios_bd.md`, `docs/05_b_instalacion_postgres_docker.md` | Direct | Combines repositories, ORM and migration-oriented persistence setup. |
| `06-dto-and-validation` | `docs/06_modelos_dtos_validacion.md` | Direct | Tracks DTO boundaries and strict validation. |
| `07-error-handling` | `docs/07_control_errores.md` | Direct | Aligns centralized exceptions and consistent error responses. |
| `08-entity-relationships` | `docs/08_relacion_entidades.md` | Direct | Aligns entity relations, foreign keys and serialization care. |
| `09-advanced-querying` | `docs/09_relacion_requestparam.md`, `docs/10_paginacion.md` | Direct | Combines query params and pagination into one skill. |
| `10-jwt-authentication` | `docs/11_autenticacion_autorizacion.md` | Direct | Covers password hashing, JWT claims and token validation. |
| `11-authorization` | `docs/12_roles_autorizacion.md`, `docs/13_ownership_validacion.md` | Direct | Includes RBAC, ownership validation, privileged bypass and proper 401/403/404 order. |
| `12-production-deployment` | `docs/14_despliegue_produccion.md` | Direct | Covers Docker, env vars and production hardening. |

## Frontend Skills

| Skill | Source Guide Files | Status | Notes |
|---|---|---|---|
| `01-project-setup` | `angular/01-instalacion_configuracio/01-instalacion_configuracio.md`, `astro/01-instalacion_configuracio-astro.md` | Direct | Covers setup, base config, env handling and project bootstrap. |
| `02-component-architecture` | `angular/02-fundamentos/02-fundamentos.md`, `astro/02-fundamentos-astro.md` | Synthesized | The guide teaches component fundamentals; the smart/dumb split is a structured extrapolation from that foundation. |
| `03-routing-strategy` | `angular/03-Navegacion/03-Navegacion.md`, `astro/03-navegacion-astro.md` | Direct | Maps layouts, nested routes and lazy navigation. |
| `04-form-orchestration` | `angular/04-Formularios/04-Formularios.md` | Direct | Tracks form handling and validation flow. |
| `05-ui-feedback-system` | `angular/05-UI-Heuristicas/05-UI-Heuristicas.md`, `angular/06-UI-Heuristicas-impl/06-UI-Heuristicas-impl.md`, `docs/05-heristicas.md` | Direct | Combines heuristic guidance with concrete UI feedback implementation. |
| `06-authentication-flow` | `angular/11-firebase/11-firebase.md`, `angular/12-guards-seguridad-rutas/12-guards-seguridad-rutas.md` | Synthesized | The guide covers session-sensitive routing and provider auth; the full session lifecycle skill was derived from both. |
| `07-styling-system` | `angular/07-Estilos/07-Estilos.md`, `angular/08-Estilos-Tema-Componentes/08-Estilos-Tema-Componentes.md` | Direct | Covers tokens, themes and scoped styles. |
| `08-state-management` | `angular/09-Consumos_servicos/09-Consumos_servicos.md`, `docs/angular-obserbables-rx.md` | Synthesized | The guide emphasizes reactive state and resources; the store strategy skill consolidates those patterns. |
| `09-data-fetching` | `angular/09-Consumos_servicos/09-Consumos_servicos.md`, `docs/angular-obserbables-rx.md` | Direct | Covers shared API clients, services, Rx flows and error handling. |
| `10-advanced-navigation` | `angular/10-mejoras-vsuales/10-mejoras-vsuales.md` | Direct | Includes URL pagination, breadcrumbs, hero summaries and visual navigation helpers. |
| `11-baas-integration` | `angular/11-firebase/11-firebase.md` | Direct | Covers Firebase-style SDK setup and reactive auth/data usage. |
| `12-route-guards` | `angular/12-guards-seguridad-rutas/12-guards-seguridad-rutas.md` | Direct | Covers auth guards, guest guards and guarded navigation behavior. |

## Review Outcome

- The repository now aligns cleanly with the strongest conceptual sections of the guide.
- The repository keeps the source guide's architectural intent while expressing it in portable, technology-agnostic language.
- The main synthesized areas are explicitly documented instead of pretending they came from a single source file.
- Backend ownership validation is now treated as part of authorization instead of being left implicit.
- Frontend advanced navigation now reflects the visual-navigation practice more closely instead of only covering query params.
