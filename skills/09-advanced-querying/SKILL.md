---
name: advanced-querying
description: "Extiende cualquier endpoint GET de listado para soportar filtrado dinámico por parámetros opcionales y paginación de resultados, ejecutando ambas operaciones directamente en la base de datos. Aplicable a cualquier recurso, base de datos o framework backend."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# Advanced Querying

**Descripción:** Extiende cualquier endpoint `GET` de listado para soportar filtrado dinámico por parámetros opcionales y paginación de resultados. Ambas operaciones (filtrado y paginación) se ejecutan directamente en la base de datos en una sola consulta. Si no se envía ningún filtro, se devuelven todos los recursos paginados con valores predeterminados.

## Objetivo

Permitir que la API devuelva subconjuntos de datos filtrados y paginados de forma eficiente, sin cargar colecciones completas en memoria, para cualquier entidad del sistema.

## Use this skill when

- Un endpoint `GET` de listado puede retornar muchos registros
- Un frontend necesita búsqueda, filtros o tablas paginadas
- Se requiere combinar múltiples filtros opcionales en una sola consulta a la BD
- El rendimiento requiere `LIMIT/OFFSET` en lugar de cargar todo

## Do not use this skill when

- El endpoint siempre retorna un conjunto pequeño y fijo (menos de ~20 registros garantizados)
- La lógica de filtrado es demasiado compleja para query params — considerar un endpoint de búsqueda con body
- La fuente de datos no soporta consultas indexadas (ej: una llamada a API de tercero)

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `page` | ❌ | Número de página (base 0). Predeterminado: `0` |
| `size` | ❌ | Resultados por página. Predeterminado: `10`, Máximo: `100` |
| `sort` | ❌ | Campo y dirección: `{field},asc` o `{field},desc` |
| `{filter_param}` | ❌ | Parámetros de filtro opcionales — específicos del recurso |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| `content` | Array de elementos de la página actual con DTO de respuesta aplicado |
| `totalElements` | Total de registros que cumplen los filtros activos |
| `totalPages` | Cantidad total de páginas |
| `number` | Índice de la página actual (base 0) |
| `size` | Tamaño de página aplicado |
| `first` / `last` | `true` si es la primera o última página |

## Pasos de funcionamiento

1. Identificar los campos filtrables del recurso y agruparlos por tipo:
   - **Texto:** búsqueda parcial (LIKE/ILIKE) → `?{field}=texto`
   - **Rango numérico:** mín y máx → `?min{Field}=10&max{Field}=50`
   - **Valor exacto/enum:** → `?status=ACTIVE`
   - **Relación (FK):** → `?{relatedId}=5`
   - **Rango de fechas:** → `?from=ISO&to=ISO`
2. Crear `{Resource}FiltersDto` agrupando todos los parámetros opcionales.
3. En el repositorio, construir la consulta dinámica:
   - Por cada parámetro: si es `null` o vacío → no agregar filtro
   - Aplicar todos los filtros activos en la misma consulta con cláusulas `WHERE`
4. Aplicar `ORDER BY`, `LIMIT` y `OFFSET` a la misma consulta.
5. Ejecutar `COUNT(*)` con los mismos filtros activos para obtener `totalElements`.
6. Construir la respuesta con `content` + metadatos de paginación (ver schema en resources).
7. Validar: `page >= 0`, `1 <= size <= MAX_SIZE`, campo de `sort` en whitelist permitida.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @advanced-querying skill to add filtering and pagination to `GET /api/products`. Filters: `name` (partial text), `minPrice` and `maxPrice` (decimal range), `categoryId` (FK). Default size: 20, max: 100."

**Resultado esperado:**
```
GET /api/products?page=0&size=20&sort=name,asc&name=laptop&minPrice=100&maxPrice=500

Response:
{
  "content": [{ "id": 1, "name": "Laptop Pro", "price": 299.99, ... }],
  "totalElements": 3,
  "totalPages": 1,
  "number": 0,
  "size": 20,
  "first": true,
  "last": true
}
```

## Estructura de archivos recomendada

```
src/shared/dtos/
└── paginated-response.dto.{ext}          ← Wrapper genérico reutilizable en todo el proyecto

src/{resources}/
├── controllers/
│   └── {resources}.controller.{ext}     ← Recibe: page, size, sort + filtros como query params
├── dtos/
│   └── {resource}-filters.dto.{ext}    ← Agrupa todos los filtros opcionales del recurso
└── repositories/
    └── {resource}.repository.{ext}     ← Query dinámica: COUNT + LIMIT/OFFSET en una sola consulta
```

## Checklist de adaptación

Pasos mínimos para agregar filtrado y paginación a cualquier endpoint GET:

- [ ] Reemplazar `{Resource}` con el nombre real del recurso
- [ ] Definir los campos filtrables y su tipo de filtro (texto, rango, enum, FK, fecha)
- [ ] Definir el tamaño de página máximo permitido (`MAX_SIZE`)
- [ ] Definir la whitelist de campos por los que se puede ordenar con `sort`
- [ ] Confirmar que el filtro se aplica en la BD, no en memoria
- [ ] Confirmar que la respuesta usa el shape de `PaginatedResponse` (ver `resources/paginated-response.schema.json`)

> El patrón de filtrado dinámico y paginación es idéntico para cualquier recurso. Solo cambian los campos filtrables y sus tipos.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/filters-dto.template.md`](resources/filters-dto.template.md) — Plantilla de DTO de filtros por lenguaje
- [`resources/paginated-response.schema.json`](resources/paginated-response.schema.json) — Schema JSON de la respuesta paginada estándar

---

> **Regla:** Todo el filtrado, ordenamiento y paginación ocurre en UNA sola consulta a la BD. Nunca filtrar en memoria.
