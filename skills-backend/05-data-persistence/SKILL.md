---
name: 05-data-persistence
description: "Implements repositories, entities and migrations so persistence is consistent, testable and isolated from HTTP concerns."
risk: medium
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Persistence code should be explicit about how data is stored, queried, and migrated. This skill organizes repositories and ORM models so services can rely on a clean data access layer without coupling business logic to SQL or framework internals.

**Descripción (ES):**
La persistencia debe dejar claro cómo se guardan, consultan y migran los datos. Esta skill organiza repositorios y modelos ORM para que los servicios dependan de una capa de acceso a datos limpia, sin acoplar la lógica de negocio al SQL ni a detalles internos del framework.

---

# 2. Skill Objective

**Objective (EN):**
Build a persistence layer with clear entities, repository methods, and migration discipline.
- Use this skill when: Connecting the project to a relational or document database, or replacing in-memory arrays.
- Do not use this skill when: The feature only needs temporary mock data for a throwaway prototype.

**Objetivo (ES):**
Construir una capa de persistencia con entidades claras, métodos de repositorio y disciplina de migraciones.
- Úsese cuando: Se conecte el proyecto a una base relacional o documental, o se reemplacen arreglos en memoria.
- No se use cuando: El feature solo necesita datos mock temporales para un prototipo descartable.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Storage Engine`: PostgreSQL, MySQL, MongoDB, SQLite, etc.
2. `Data Model`: Entities, tables/collections, keys, and constraints.
3. `Access Patterns`: Reads, writes, transactions, pagination, and lookups.

**Entradas (ES):**
1. `Storage Engine`: PostgreSQL, MySQL, MongoDB, SQLite, etc.
2. `Data Model`: Entidades, tablas/colecciones, llaves y restricciones.
3. `Access Patterns`: Lecturas, escrituras, transacciones, paginación y búsquedas.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Entity or schema definitions.
2. Repository interfaces or concrete adapters for data access.
3. A migration strategy that can evolve the database safely.

**Salidas (ES):**
1. Definiciones de entidades o esquemas.
2. Interfaces de repositorio o adaptadores concretos para acceso a datos.
3. Una estrategia de migraciones para evolucionar la base de forma segura.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Model the persistence shape:** Define entities or schemas with explicit names, keys, indexes, and constraints.
2. **Create repositories around use cases:** Expose meaningful methods such as `findByEmail`, `save`, or `findActiveOrders`, not generic controller-oriented helpers.
3. **Keep persistence behind the service layer:** Controllers must never call ORM or raw SQL directly.
4. **Handle transactions deliberately:** Group multi-write workflows under service-managed transactions where the framework supports them.
5. **Version schema changes:** Use migrations or equivalent change history instead of editing the live database manually.

**Instrucciones (ES):**
1. **Modelar la forma persistente:** Define entidades o esquemas con nombres, llaves, índices y restricciones explícitas.
2. **Crear repositorios orientados a casos de uso:** Expón métodos como `findByEmail`, `save` o `findActiveOrders`, no helpers genéricos pensados desde el controlador.
3. **Mantener la persistencia detrás del servicio:** Los controladores nunca deben llamar al ORM ni al SQL crudo directamente.
4. **Manejar transacciones con intención:** Agrupa flujos con múltiples escrituras bajo transacciones administradas por el servicio cuando el framework lo permita.
5. **Versionar cambios de esquema:** Usa migraciones o historial equivalente en lugar de editar la base viva manualmente.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @05-data-persistence to add persistence for `{FeatureName}`.
1. Define the entity/schema and repository methods required by the service layer.
2. Add a migration strategy so schema changes can be replayed safely in every environment.
```

**Prompt (ES):**
```text
Usa la skill @05-data-persistence para agregar persistencia a `{FeatureName}`.
1. Define la entidad/esquema y los métodos de repositorio que necesita la capa de servicio.
2. Agrega una estrategia de migraciones para repetir cambios de esquema de forma segura en cualquier entorno.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    └── {feature}/
        ├── entities/ or schemas/
        │   └── {feature}.entity.{ext}
        ├── repositories/
        │   └── {feature}.repository.{ext}
        ├── dto/
        └── {feature}.service.{ext}
migrations/
└── {timestamp}-{change-name}.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Repository methods describe business retrieval intent instead of raw SQL fragments.
- [ ] Controllers never import ORM models directly.
- [ ] Database changes are tracked through migrations or an equivalent audited mechanism.

**Checklist (ES):**
- [ ] Los métodos del repositorio describen intención de negocio y no fragmentos sueltos de SQL.
- [ ] Los controladores nunca importan modelos ORM directamente.
- [ ] Los cambios de base se registran mediante migraciones o un mecanismo equivalente auditable.
