---
name: 02-modular-project-structure
description: "Organizes the backend by feature modules so controllers, services, repositories, DTOs and tests evolve with clear boundaries and minimal coupling."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
A professional backend grows by domains, not by technical chaos. This skill defines a feature-first structure so each business area owns its controllers, services, repositories, DTOs, entities, and tests without leaking responsibilities across the codebase.

**Descripción (ES):**
Un backend profesional crece por dominios, no por caos técnico. Esta skill define una estructura orientada a features para que cada área del negocio posea sus controladores, servicios, repositorios, DTOs, entidades y pruebas sin mezclar responsabilidades en todo el proyecto.

---

# 2. Skill Objective

**Objective (EN):**
Create a modular backend layout that scales cleanly across frameworks and languages.
- Use this skill when: Starting a new backend, reorganizing a monolith, or preparing the project for multiple domains.
- Do not use this skill when: You only need to add a single helper file inside an already established module.

**Objetivo (ES):**
Crear una estructura backend modular que escale de forma limpia entre frameworks y lenguajes.
- Úsese cuando: Se inicia un backend nuevo, se reorganiza un monolito o se prepara el proyecto para múltiples dominios.
- No se use cuando: Solo se necesita agregar un archivo auxiliar dentro de un módulo ya definido.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Domain List`: Business areas such as `users`, `orders`, or `payments`.
2. `Framework Conventions`: The runtime's module, package, container, or dependency-boundary rules.
3. `Shared Concerns`: Logging, config, auth, database, and utilities.

**Entradas (ES):**
1. `Domain List`: Áreas del negocio como `users`, `orders` o `payments`.
2. `Framework Conventions`: Reglas de módulos o contenedores del framework usado.
3. `Shared Concerns`: Logging, configuración, autenticación, base de datos y utilidades.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A feature-based folder tree under `src/`.
2. Clear placement rules for controllers, services, repositories, DTOs, entities, and tests.
3. A predictable root composition layer for route/module registration.

**Salidas (ES):**
1. Un árbol de carpetas orientado a features dentro de `src/`.
2. Reglas claras para ubicar controladores, servicios, repositorios, DTOs, entidades y pruebas.
3. Una capa raíz predecible para registrar rutas o módulos.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Create feature modules:** Allocate one folder per domain (`users`, `products`, `billing`) instead of mixing everything under `controllers/` or `services/`.
2. **Keep layers local to the feature:** Store controllers, services, repositories, DTOs, entities, and tests beside the domain they belong to.
3. **Separate cross-cutting code:** Move config, auth, logging, middleware, and shared utilities into `core/`, `shared/`, or framework-equivalent folders.
4. **Avoid circular dependencies:** Features may depend on shared/core abstractions, but not on each other's internal files directly.
5. **Compose from the root:** Register routes/modules in a single app entry point that imports feature modules instead of manually wiring every file everywhere.

**Instrucciones (ES):**
1. **Crear módulos por feature:** Asigna una carpeta por dominio (`users`, `products`, `billing`) en lugar de mezclar todo en `controllers/` o `services/`.
2. **Mantener las capas dentro del dominio:** Guarda controladores, servicios, repositorios, DTOs, entidades y pruebas junto al feature al que pertenecen.
3. **Separar lo transversal:** Mueve configuración, auth, logging, middleware y utilidades compartidas a `core/`, `shared/` o su equivalente.
4. **Evitar dependencias circulares:** Los features pueden depender de abstracciones compartidas, pero no de archivos internos de otros features.
5. **Componer desde la raíz:** Registra rutas o módulos desde un punto de entrada único que importe features completos.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @02-modular-project-structure to reorganize this backend by business domains.
1. Create one module per feature and keep controller, service, repository, dto and tests inside it.
2. Move config, auth and shared utilities to a common layer without creating circular imports.
```

**Prompt (ES):**
```text
Usa la skill @02-modular-project-structure para reorganizar este backend por dominios del negocio.
1. Crea un módulo por feature y deja controller, service, repository, dto y pruebas dentro del mismo dominio.
2. Mueve config, auth y utilidades compartidas a una capa común sin crear imports circulares.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── app.{ext} or main.{ext}
├── core/
│   ├── config/
│   ├── auth/
│   └── logging/
├── shared/
│   ├── utils/
│   └── types/
└── modules/
    ├── users/
    │   ├── dto/
    │   ├── entities/
    │   ├── users.controller.{ext}
    │   ├── users.service.{ext}
    │   ├── users.repository.{ext}
    │   └── users.spec.{ext}
    └── orders/
        └── ...
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Each feature can be understood without opening unrelated folders.
- [ ] Cross-cutting concerns live outside the feature modules.
- [ ] No controller imports another feature's repository directly.

**Checklist (ES):**
- [ ] Cada feature puede entenderse sin abrir carpetas no relacionadas.
- [ ] Las preocupaciones transversales viven fuera de los módulos de dominio.
- [ ] Ningún controlador importa directamente el repositorio interno de otro feature.
