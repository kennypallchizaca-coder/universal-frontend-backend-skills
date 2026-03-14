---
name: 09-advanced-querying
description: "Implements safe pagination, filtering and sorting so list endpoints remain scalable and predictable."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
List endpoints become dangerous when they fetch everything by default. This skill introduces validated query parameters, bounded pagination, sortable fields, and stable metadata so APIs scale without surprising clients or databases.

**Descripción (ES):**
Los endpoints de listado se vuelven peligrosos cuando traen todo por defecto. Esta skill introduce query parameters validados, paginación con límites, campos ordenables y metadata estable para que la API escale sin sorprender ni a clientes ni a la base.

---

# 2. Skill Objective

**Objective (EN):**
Add scalable query capabilities to collection endpoints without exposing the database to abusive requests.
- Use this skill when: A `GET /resource` endpoint needs pagination, sorting, searching, or filters.
- Do not use this skill when: The dataset is fixed and guaranteed to stay tiny forever.

**Objetivo (ES):**
Agregar capacidades de consulta escalables a endpoints de colección sin exponer la base a requests abusivos.
- Úsese cuando: Un `GET /resource` necesite paginación, orden, búsqueda o filtros.
- No se use cuando: El dataset sea fijo y esté garantizado que siempre será pequeño.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Query Parameters`: `page`, `limit`, `sort`, `search`, and domain filters.
2. `Allowed Fields`: Sortable/filterable columns or document attributes.
3. `Response Meta`: Total items, current page, page size, and navigation hints.

**Entradas (ES):**
1. `Query Parameters`: `page`, `limit`, `sort`, `search` y filtros de dominio.
2. `Allowed Fields`: Columnas o atributos permitidos para ordenar o filtrar.
3. `Response Meta`: Total de ítems, página actual, tamaño y pistas de navegación.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Validated query DTOs or parser utilities.
2. Repository queries with bounded pagination and controlled sorting.
3. Responses containing both `data` and `meta`.

**Salidas (ES):**
1. DTOs de query o utilidades de parseo validadas.
2. Consultas de repositorio con paginación acotada y orden controlado.
3. Respuestas que contengan tanto `data` como `meta`.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Validate and normalize query params:** Default `page`, `limit`, and sort order; reject invalid numbers or unsupported fields.
2. **Cap the page size:** Enforce a maximum limit to prevent memory abuse or expensive scans.
3. **Allowlist sort/filter fields:** Never concatenate arbitrary client input directly into raw database queries.
4. **Push constraints to the repository:** Translate pagination and filters to SQL, ORM, or driver-level operations instead of slicing in memory.
5. **Return metadata consistently:** Include totals and paging info so clients can render navigation correctly.

**Instrucciones (ES):**
1. **Validar y normalizar query params:** Define valores por defecto para `page`, `limit` y orden; rechaza números inválidos o campos no soportados.
2. **Poner tope al tamaño de página:** Impón un máximo para evitar abuso de memoria o scans costosos.
3. **Permitir solo campos de orden o filtro conocidos:** Nunca concatenes input arbitrario del cliente dentro de consultas crudas.
4. **Llevar restricciones al repositorio:** Traduce paginación y filtros a SQL, ORM o driver en vez de recortar en memoria.
5. **Devolver metadata consistente:** Incluye totales e información de paginación para que el cliente navegue correctamente.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @09-advanced-querying to upgrade the `{ResourceName}` list endpoint.
1. Add validated page, limit, sort and filter parameters with safe defaults.
2. Return paginated data plus metadata without loading the full dataset into memory.
```

**Prompt (ES):**
```text
Usa la skill @09-advanced-querying para mejorar el endpoint de listado de `{ResourceName}`.
1. Agrega parámetros validados de page, limit, sort y filtros con defaults seguros.
2. Devuelve datos paginados más metadata sin cargar todo el dataset en memoria.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── shared/
│   └── pagination/
│       ├── pagination.dto.{ext}
│       └── pagination.util.{ext}
└── modules/
    └── {feature}/
        ├── dto/
        │   └── query-{feature}.dto.{ext}
        ├── {feature}.controller.{ext}
        └── {feature}.repository.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Requests cannot force extreme limits such as `limit=1000000`.
- [ ] Sort and filter fields are validated against an allowlist.
- [ ] Collection responses include stable paging metadata.

**Checklist (ES):**
- [ ] Las requests no pueden forzar límites extremos como `limit=1000000`.
- [ ] Los campos de orden y filtro se validan contra una allowlist.
- [ ] Las respuestas de colección incluyen metadata de paginación estable.
