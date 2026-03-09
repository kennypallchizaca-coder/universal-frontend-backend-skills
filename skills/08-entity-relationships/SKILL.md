---
name: entity-relationships
description: "Define y mapea relaciones entre entidades de dominio (uno a uno, uno a muchos, muchos a muchos) configurando claves foráneas, tablas de unión y estrategias de carga diferida (LAZY). Compatible con cualquier ORM relacional o documental."
risk: medium
universal: true
source: community
date_added: "2026-03-09"
---

# Entity Relationships

**Descripción:** Define y mapea relaciones entre entidades de dominio (1:1, 1:N, N:N) configurando claves foráneas, tablas de unión y estrategias de carga LAZY. El acceso a entidades relacionadas siempre ocurre a través del repositorio — nunca navegando colecciones en memoria, lo que previene el problema N+1 y los errores de inicialización perezosa.

## Objetivo

Representar correctamente las relaciones del dominio en la base de datos, evitando el problema N+1 y cargas innecesarias, para cualquier par de entidades relacionadas en cualquier proyecto.

## Use this skill when

- Dos o más entidades tienen una relación que debe expresarse en la base de datos
- Al agregar una clave foránea a una tabla existente
- Al diseñar o extender un esquema de datos antes de implementar repositorios
- Al reemplazar JOINs manuales con asociaciones gestionadas por el ORM

## Do not use this skill when

- La asociación es solo lógica y no necesita estar en la base de datos
- Trabajas con una BD no relacional donde las relaciones se embeben en documentos
- La relación es entre sistemas externos, no dentro de tu propio dominio

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `{EntityA}` | ✅ | Nombre de la primera entidad |
| `{EntityB}` | ✅ | Nombre de la segunda entidad relacionada |
| Tipo de relación | ✅ | `1:1`, `1:N`, o `N:N` |
| Lado propietario | ✅ | Qué entidad tiene la FK en su tabla |
| `fetchStrategy` | ❌ | `LAZY` (recomendado) o `EAGER`. Predeterminado: `LAZY` |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Campo de relación anotado | Propiedad en la entidad con el tipo de relación mapeado |
| Clave foránea en BD | Columna FK autogenerada en la tabla propietaria |
| Tabla de unión (N:N) | Tabla intermedia con las FKs de ambas entidades |
| Método en repositorio | Consulta por FK sin navegar colecciones en memoria |

## Pasos de funcionamiento

1. Identificar el tipo de relación entre `{EntityA}` y `{EntityB}` (ver tabla de decisiones en resources).
2. Decidir el lado propietario:
   - `1:N` → la FK siempre está en el lado "N"
   - `N:N` → se crea una tabla de unión con nombre explícito: `{entity_a}_{entity_b}`
   - `1:1` → elegir el lado más dependiente
3. Anotar la relación en la entidad propietaria con las anotaciones del ORM.
4. Configurar `fetchStrategy = LAZY` en todas las relaciones — EAGER requiere justificación explícita.
5. Configurar `cascade` solo si las operaciones deben propagarse (ej: eliminar hijos cuando se elimina el padre).
6. Si la tabla de unión tiene campos propios (timestamps, status), modelarla como entidad independiente.
7. Crear el método en el repositorio que consulta por FK directamente — nunca navegar colecciones en código.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @entity-relationships skill to map the relationship between `Post` (one) and `Comment` (many) in my TypeORM project, and the many-to-many between `Post` and `Tag` with an explicit join table."

**Resultado esperado:**
```typescript
@Entity('comments')
export class CommentEntity {
    @ManyToOne(() => PostEntity, { nullable: false })
    @JoinColumn({ name: 'post_id' })
    post: PostEntity;
}
// Repository:
findByPostId(postId: number): Promise<CommentEntity[]>

// NO navegar:  post.getComments()  ← ERROR / N+1
// SÍ consultar: commentRepo.findByPostId(postId) ← CORRECTO
```

## Estructura de archivos recomendada

```
src/{entity_b}/
└── entities/
    └── {entity_b}.entity.{ext}        ← Define FK y relaciones anotadas

src/shared/                             ← Solo si la relación cruza módulos
└── entities/
    └── {entity_a}-{entity_b}.entity.{ext}  ← Entidad de tabla de unión (N:N con campos)
```

## Checklist de adaptación

Pasos mínimos para mapear cualquier relación entre entidades:

- [ ] Reemplazar `{EntityA}` y `{EntityB}` con los nombres reales de las entidades
- [ ] Identificar el tipo de relación (ver `resources/relationship-decision.md`)
- [ ] Definir el lado propietario (quién tiene la FK en su tabla)
- [ ] Confirmar que fetch strategy es `LAZY` — documentar si se usa `EAGER` y por qué
- [ ] Crear el método en el repositorio para consultar por FK
- [ ] Si la tabla de unión tiene campos propios, modelarla como entidad independiente

> El patrón de mapeado es idéntico para cualquier par de entidades. Solo cambian los nombres, el tipo de relación y los campos de la tabla de unión.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/relationship-decision.md`](resources/relationship-decision.md) — Tabla de decisiones para elegir el tipo de relación correcto
- [`resources/entity-relationship.template.md`](resources/entity-relationship.template.md) — Templates de relaciones 1:N y N:N en 4 lenguajes

---

> **Regla:** LAZY es el predeterminado. EAGER es la excepción y debe justificarse. Nunca navegar colecciones en memoria.
