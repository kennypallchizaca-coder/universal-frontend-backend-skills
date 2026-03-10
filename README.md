# 💎 The Universal Full-Stack Agentic Ecosystem
### The Ultimate Collection of 24 Agentic Skills for your AI Workspace
**Battle-tested · Framework-agnostic · Language-agnostic · Frontend & Backend**

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Frontend Skills](https://img.shields.io/badge/Frontend-12_Skills-blue)]()
[![Backend Skills](https://img.shields.io/badge/Backend-12_Skills-green)]()
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%7C%20ES-orange)]()
[![Claude Code](https://img.shields.io/badge/Claude_Code-✓-orange)]()
[![Gemini CLI](https://img.shields.io/badge/Gemini_CLI-✓-blue)]()
[![Cursor](https://img.shields.io/badge/Cursor-✓-black)]()
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-✓-007ACC)]()
[![OpenAI Codex](https://img.shields.io/badge/OpenAI_Codex-✓-00A67E)]()
[![Antigravity](https://img.shields.io/badge/Antigravity-✓-purple)]()
[![Devin](https://img.shields.io/badge/Devin_AI-✓-CA2A62)]()
[![OpenCode](https://img.shields.io/badge/OpenCode-✓-4B32C3)]()
[![Tabnine](https://img.shields.io/badge/Tabnine-✓-FF8E00)]()

</div>

---

## 📖 About this Ecosystem / Sobre este Ecosistema

> **(EN):** AI Agents (like Claude Code, Cursor, or Gemini) are smart, but they lack **specific implementation playbooks**. These **Skills** are hyper-optimized dual-language markdown files that teach your agent exactly how to do frontend and backend tasks correctly — preventing loops, context deterioration, and poor architecture. 
> 
> *Every single Skill is carefully constructed in both **English and Spanish** to maximize NLP ingestion and parsing logic by LLMs, ensuring perfect predictability and robust code generation regardless of the stack.*

> **(ES):** Los agentes de IA son inteligentes, pero carecen de **libros de jugadas de implementación específicos**. Estas **Skills** son archivos markdown bilingües hiper-optimizados que enseñan a tu agente exactamente cómo hacer tareas de frontend y backend — previniendo bucles ciegos, deterioros de contexto y arquitecturas pobres. 
>
> *Cada Skill se construye meticulosamente tanto en **Inglés como en Español** para maximizar la asimilación profunda NLP en los modelos LLM, garantizando rutinas perfectas y una generación de código robusta sin importar el stack tecnológico.*

---

## 🎯 Why Use This? / ¿Por qué usar esto?

🔹 **Zero Hallucinations:** Prevents AI from guessing. It gives them standard operating procedures (SOPs).  
🔹 **Bilingual Engine:** Dual English/Spanish prompts maximize AI understanding.  
🔹 **Modular:** 12 Frontend skills and 12 Backend skills to cover the entire development lifecycle.  
🔹 **Universal:** Works flawlessly for React, Angular, Vue, Spring Boot, Express, Django, FastAPI, and more.  

---

## ⏱️ Quick Start / Inicio Rápido

**(EN):** Point your AI explicitly to the target folder and skill:
> "Use the **@04-service-layer** skill located inside `skills-backend/` to implement my business logic."
> "Use the **@03-routing-strategy** skill from `frontend-skills/` to setup my React Router layouts."

**(ES):** Dirige a tu IA de manera explícita a la carpeta y skill objetivo:
> "Usa la skill **@04-service-layer** ubicada adentro de `skills-backend/` para implementar mi lógica de negocio."
> "Usa la skill **@03-routing-strategy** alojada en `frontend-skills/` configurando mis Layouts del React Router."

---

## 🖥️ Frontend Skills (UI/UX & Client Logic)

📍 **Location:** `./frontend-skills/`

| # | Skill Name | English Summary | Español (Resumen) | Risk |
|:---:|---|---|---|:---:|
| **01** | [**project-setup**](./frontend-skills/01-project-setup/SKILL.md) | Global scaffold & Configs | Estructura root y Configs | 🟢 Low |
| **02** | [**component-architecture**](./frontend-skills/02-component-architecture/SKILL.md) | Smart/Dumb pattern splits | División Lógicos/Tontos | 🟡 Medium |
| **03** | [**routing-strategy**](./frontend-skills/03-routing-strategy/SKILL.md) | Layouts and Lazy Loading | Paginación y Carga Lenta URL | 🟡 Medium |
| **04** | [**form-orchestration**](./frontend-skills/04-form-orchestration/SKILL.md) | Immutable generic state refs | Referencias inmutables estado | 🟢 Low |
| **05** | [**ui-feedback-system**](./frontend-skills/05-ui-feedback-system/SKILL.md) | Toasts, Skeletons & Spinners | Mapeo carga, Esqueletos y Toast | 🟢 Low |
| **06** | [**authentication-flow**](./frontend-skills/06-authentication-flow/SKILL.md) | JWT Hydration on LocalStorage | Hidratación JWT en LocalStorage | 🔴 High |
| **07** | [**styling-system**](./frontend-skills/07-styling-system/SKILL.md) | Architecture CSS/Tailwind rules | Reglas Maestras CSS/Módulos | 🟢 Low |
| **08** | [**state-management**](./frontend-skills/08-state-management/SKILL.md) | Zustand/Pinia/Redux patterns | Gestores Globales Reactivos | 🔴 High |
| **09** | [**data-fetching**](./frontend-skills/09-data-fetching/SKILL.md) | Axios interceptors & Cache | Interceptores Red Axios/Cache | 🟡 Medium |
| **10** | [**advanced-navigation**](./frontend-skills/10-advanced-navigation/SKILL.md) | Breadcrumbs & URL pagination | Migas y Paginación UI (URL) | 🟢 Low |
| **11** | [**baas-integration**](./frontend-skills/11-baas-integration/SKILL.md) | Firebase/Supabase Connectors | Inyección SDK Firebase nativa | 🔴 High |
| **12** | [**route-guards**](./frontend-skills/12-route-guards/SKILL.md) | Protected routes Middlewares | Rutas Privadas e Interceptores | 🔴 High |

---

## 🗄️ Backend Skills (Server, DB & Auth)

📍 **Location:** `./skills-backend/` ([View Full Backend Docs](./skills-backend/README.md))

| # | Skill Name | English Summary | Español (Resumen) | Risk |
|:---:|---|---|---|:---:|
| **01** | [**project-bootstrap**](./skills-backend/01-project-bootstrap/SKILL.md) | Express/Spring HTTP Setup | Setup de Motor HTTP Limpio | 🟢 Low |
| **02** | [**modular-project-structure**](./skills-backend/02-modular-project-structure/SKILL.md) | Feature-based directory tree | Árbol de carpetas por Features | 🟢 Low |
| **03** | [**rest-api-design**](./skills-backend/03-rest-api-design/SKILL.md) | REST generic endpoints | Puntos de Red Genéricos REST | 🟢 Low |
| **04** | [**service-layer**](./skills-backend/04-service-layer/SKILL.md) | Decoupled Business logic | Lógica de Negocio Desacoplada | 🟢 Low |
| **05** | [**data-persistence**](./skills-backend/05-data-persistence/SKILL.md) | Repository & ORM bindings | Conexión limpia con ORM base | 🟡 Medium |
| **06** | [**dto-and-validation**](./skills-backend/06-dto-and-validation/SKILL.md) | Body validations strict constraints | Validaciones de Body strictas | 🟢 Low |
| **07** | [**error-handling**](./skills-backend/07-error-handling/SKILL.md) | Global generic Catch system | Sistema Global recolector fallos | 🟡 Medium |
| **08** | [**entity-relationships**](./skills-backend/08-entity-relationships/SKILL.md) | OneToMany / Foreign Keys | Marcadores Llaves Foráneas DB | 🟡 Medium |
| **09** | [**advanced-querying**](./skills-backend/09-advanced-querying/SKILL.md) | DB limits and Search offsets | Offsets de Consulta URL limpios | 🟢 Low |
| **10** | [**jwt-authentication**](./skills-backend/10-jwt-authentication/SKILL.md) | Stateless JWT creation | Creador Stateless en JWT Token | 🔴 High |
| **11** | [**authorization**](./skills-backend/11-authorization/SKILL.md) | Role constraints mapping | Enrutado Restringido por Rol | 🔴 High |
| **12** | [**production-deployment**](./skills-backend/12-production-deployment/SKILL.md) | Dockerfiles and clean Builds | Dockerfiles y Limpieza Builds | 🔴 High |

---

## 🔌 Compatibility & Invocation / Invocación

**(EN):**
These skills follow the universal `SKILL.md` format.
**Important:** Your agent must read the absolute file structure natively. Provide the explicit directory names (`frontend-skills/` or `skills-backend/`) when instructing your AI Workspace explicitly.

**(ES):**
Estas skills respetan orgánicamente el sistema genérico de formateado en `SKILL.md`.
**Importante:** Provee a tu agente el espacio en disco explícito nombrando la carpeta nativa asilada  (`frontend-skills/` o `skills-backend/`) al enviarle sus comandos operativos nativos.

| Tool | Type | Invocation Example |
|------|------|--------------------|
| **Claude Code** | **CLI** | `Use @04-service-layer to...` |
| **Gemini CLI** | **CLI** | `Use skills-backend/04-service-layer to...` |
| **Cursor** | **IDE** | `@04-service-layer in Chat` |
| **Antigravity** | **IDE** | `Use @04-service-layer` |
| **GitHub Copilot** | **IDE** | Paste or attach `SKILL.md` directly into chat |

---

## 📝 License
MIT License — free to use, modify, and distribute in any project. Made for the Future of Coding. 🚀
