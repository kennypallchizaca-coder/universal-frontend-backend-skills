---
name: 03-rest-api-design
description: "Defines resource-oriented REST endpoints with consistent nouns, HTTP verbs, status codes and response contracts."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
REST APIs stay maintainable when routes are predictable. This skill standardizes resource naming, HTTP verb usage, status codes, and collection vs item semantics so frontend and backend teams can integrate without guesswork.

**Descripción (ES):**
Las APIs REST se mantienen sanas cuando sus rutas son predecibles. Esta skill estandariza nombres de recursos, uso de verbos HTTP, códigos de estado y semántica entre colecciones e ítems para que frontend y backend se integren sin adivinar.

---

# 2. Skill Objective

**Objective (EN):**
Design resource-oriented HTTP interfaces that are easy to document, test, and consume.
- Use this skill when: Defining CRUD endpoints, nested resources, or public/internal REST contracts.
- Do not use this skill when: Building GraphQL schemas, RPC endpoints, or event-only interfaces.

**Objetivo (ES):**
Diseñar interfaces HTTP orientadas a recursos, fáciles de documentar, probar y consumir.
- Úsese cuando: Se definan endpoints CRUD, recursos anidados o contratos REST públicos o internos.
- No se use cuando: Se construyan esquemas GraphQL, endpoints RPC o interfaces solo por eventos.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Resource Name`: Plural noun such as `users`, `orders`, or `products`.
2. `Operations`: List, read, create, update, delete, and optional search/filter needs.
3. `Response Contract`: Success and error payload conventions.

**Entradas (ES):**
1. `Resource Name`: Sustantivo en plural como `users`, `orders` o `products`.
2. `Operations`: Necesidades de listar, leer, crear, actualizar, eliminar y buscar.
3. `Response Contract`: Convenciones de payloads de éxito y error.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Standardized endpoint paths such as `/users` and `/users/{id}`.
2. Clear status-code behavior for each operation.
3. Stable request and response contracts for clients and tests.

**Salidas (ES):**
1. Rutas estandarizadas como `/users` y `/users/{id}`.
2. Comportamiento claro de códigos HTTP por operación.
3. Contratos estables de request y response para clientes y pruebas.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Use nouns, not actions:** Prefer `/users` over `/getUsers` and `/users/{id}` over `/deleteUserById`.
2. **Map verbs to intent:** `GET` for reads, `POST` for creates, `PUT/PATCH` for updates, and `DELETE` for removals.
3. **Separate collections from items:** `/users` addresses many resources; `/users/{id}` addresses one.
4. **Return proper status codes:** `200` for reads/updates, `201` for creates, `204` for empty successful deletes, `400/404/409` as appropriate for errors.
5. **Keep filters in query params:** Use `/users?page=1&limit=20&role=admin` instead of inventing action paths.

**Instrucciones (ES):**
1. **Usar sustantivos, no acciones:** Prefiere `/users` en lugar de `/getUsers` y `/users/{id}` en lugar de `/deleteUserById`.
2. **Mapear verbos a intención:** `GET` para lectura, `POST` para creación, `PUT/PATCH` para actualización y `DELETE` para eliminación.
3. **Separar colecciones de ítems:** `/users` representa muchos recursos; `/users/{id}` representa uno.
4. **Retornar códigos correctos:** `200` para lectura/actualización, `201` para creación, `204` para borrado exitoso sin cuerpo y `400/404/409` según el error.
5. **Poner filtros en query params:** Usa `/users?page=1&limit=20&role=admin` en lugar de inventar rutas de acción.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @03-rest-api-design to define the HTTP contract for `{ResourceName}`.
1. Create standard collection and item endpoints with correct verbs and status codes.
2. Keep filters and pagination in query parameters instead of action-style routes.
```

**Prompt (ES):**
```text
Usa la skill @03-rest-api-design para definir el contrato HTTP de `{ResourceName}`.
1. Crea endpoints estándar de colección e ítem con verbos y códigos correctos.
2. Mantén filtros y paginación en query parameters, no en rutas con acciones.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    └── {resource}/
        ├── dto/
        ├── {resource}.controller.{ext}
        ├── {resource}.service.{ext}
        └── {resource}.contract.md or openapi.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Endpoints use plural resource nouns consistently.
- [ ] Query parameters handle pagination, sorting, and filtering.
- [ ] Status codes match the operation outcome without ad-hoc behavior.

**Checklist (ES):**
- [ ] Los endpoints usan sustantivos en plural de forma consistente.
- [ ] Los query parameters manejan paginación, orden y filtros.
- [ ] Los códigos de estado reflejan correctamente el resultado de la operación.
