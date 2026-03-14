---
name: 08-entity-relationships
description: "Models entity relationships explicitly so cardinality, ownership and loading behavior stay correct and maintainable."
risk: medium
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Relationships are where many persistence bugs begin: duplicate ownership, accidental cascades, recursive serialization, and N+1 queries. This skill helps define entity associations with explicit ownership, constraints, and fetch strategies.

**Descripción (ES):**
Las relaciones son el origen de muchos bugs de persistencia: ownership duplicado, cascadas accidentales, serialización recursiva y consultas N+1. Esta skill ayuda a definir asociaciones entre entidades con ownership, restricciones y estrategias de carga explícitas.

---

# 2. Skill Objective

**Objective (EN):**
Implement entity relationships that preserve data integrity and keep API serialization under control.
- Use this skill when: Modeling one-to-one, one-to-many, many-to-one, or many-to-many associations.
- Do not use this skill when: The data model is flat and does not reference other entities.

**Objetivo (ES):**
Implementar relaciones entre entidades que preserven integridad de datos y mantengan controlada la serialización de la API.
- Úsese cuando: Se modelen asociaciones one-to-one, one-to-many, many-to-one o many-to-many.
- No se use cuando: El modelo de datos sea plano y no referencie otras entidades.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Cardinality`: One-to-one, one-to-many, many-to-many, optional vs required.
2. `Ownership Rules`: Which side holds the foreign key and who may update it.
3. `Read Patterns`: Lazy/eager loading needs, aggregate views, serialization rules.

**Entradas (ES):**
1. `Cardinality`: One-to-one, one-to-many, many-to-many, opcional vs obligatorio.
2. `Ownership Rules`: Qué lado guarda la foreign key y quién puede modificarla.
3. `Read Patterns`: Necesidades de carga lazy/eager, vistas agregadas y reglas de serialización.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Relationship mappings in entities or schemas.
2. Explicit foreign keys, join tables, and cascade rules.
3. DTO or serialization boundaries that avoid recursive payloads.

**Salidas (ES):**
1. Mapeos de relaciones en entidades o esquemas.
2. Foreign keys, join tables y reglas de cascada explícitas.
3. Límites de DTO o serialización para evitar payloads recursivos.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Choose the correct cardinality:** Model each relationship based on real business rules, not convenience.
2. **Define ownership explicitly:** Know which side stores the foreign key or join table and which operations are allowed to change it.
3. **Be conservative with cascades:** Enable delete/update cascades only when they are truly safe and intentional.
4. **Control loading behavior:** Avoid eager-loading large graphs by default; fetch related data intentionally for each use case.
5. **Serialize through DTOs:** Do not expose raw ORM graphs directly if they can recurse or leak internal details.

**Instrucciones (ES):**
1. **Elegir la cardinalidad correcta:** Modela cada relación según reglas reales del negocio, no por comodidad.
2. **Definir ownership de forma explícita:** Identifica qué lado almacena la foreign key o join table y qué operaciones pueden cambiarla.
3. **Ser conservador con cascadas:** Activa cascadas de borrado o actualización solo cuando sean realmente seguras e intencionales.
4. **Controlar la carga de datos:** Evita cargar grafos grandes de forma eager por defecto; trae relaciones según cada caso de uso.
5. **Serializar mediante DTOs:** No expongas directamente grafos ORM si pueden recursar o filtrar detalles internos.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @08-entity-relationships to model the association between `{EntityA}` and `{EntityB}`.
1. Define the correct cardinality, owner side and foreign key behavior.
2. Prevent recursive API payloads by exposing DTOs instead of raw ORM graphs.
```

**Prompt (ES):**
```text
Usa la skill @08-entity-relationships para modelar la asociación entre `{EntityA}` y `{EntityB}`.
1. Define la cardinalidad correcta, el lado owner y el comportamiento de la foreign key.
2. Evita payloads recursivos en la API exponiendo DTOs en lugar de grafos ORM crudos.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    ├── {entity-a}/
    │   ├── entities/
    │   │   └── {entity-a}.entity.{ext}
    │   └── dto/
    └── {entity-b}/
        ├── entities/
        │   └── {entity-b}.entity.{ext}
        └── dto/
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Relationship ownership is unambiguous in code and schema.
- [ ] Cascades are explicit and justified, not enabled by habit.
- [ ] API responses avoid recursive or unexpectedly heavy entity graphs.

**Checklist (ES):**
- [ ] El ownership de la relación es inequívoco en código y esquema.
- [ ] Las cascadas son explícitas y justificadas, no activadas por costumbre.
- [ ] Las respuestas de la API evitan grafos recursivos o demasiado pesados.
