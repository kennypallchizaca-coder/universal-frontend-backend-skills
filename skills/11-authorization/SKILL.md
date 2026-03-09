---
name: authorization
description: "Implementa autorización en dos niveles: control de acceso por roles (RBAC) que restringe endpoints según el rol del usuario, y validación de ownership que restringe operaciones según si el usuario es propietario del recurso. Compatible con cualquier sistema, lenguaje o arquitectura."
risk: high
universal: true
source: community
date_added: "2026-03-09"
---

# Authorization

**Descripción:** Implementa autorización en dos niveles que opera después de la autenticación JWT (Skill 10). **Nivel 1 — RBAC:** restringe el acceso a endpoints según el rol del usuario. **Nivel 2 — Ownership:** restringe operaciones sobre recursos según si el usuario es su propietario. Los roles privilegiados pueden omitir la validación de ownership. Ambos niveles aplican a cualquier entidad y proyecto.

## Objetivo

Garantizar que cada operación sea ejecutada única y exclusivamente por el actor correcto: un usuario con el rol adecuado y que además sea el propietario del recurso (o tenga privilegios suficientes para operar sobre cualquier recurso).

## Use this skill when

- Al proteger endpoints con distintos niveles de acceso por tipo de usuario
- Al implementar operaciones `PUT`, `PATCH` o `DELETE` sobre recursos de usuario
- En cualquier sistema multi-rol donde distintos actores tienen permisos distintos
- Al combinar RBAC con propiedad del recurso

## Do not use this skill when

- La API no tiene roles — todos los usuarios autenticados tienen los mismos permisos (solo Skill 10)
- No se ha implementado JWT yet — este skill depende de Skill 10
- La autorización requiere reglas complejas basadas en atributos (ABAC) más allá de roles y ownership

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| Usuario autenticado | ✅ | Proviene del contexto JWT (Skill 10) — contiene `id` y `roles` |
| Roles del usuario | ✅ | Ej: `["ROLE_ADMIN", "ROLE_USER"]` |
| Roles requeridos | ✅ | Los roles mínimos para acceder al endpoint |
| `{ownerField}` | ✅ (Nivel 2) | Campo en el recurso que identifica al propietario |
| Roles privilegiados | ✅ (Nivel 2) | Roles que pueden omitir la validación de ownership |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Operación permitida | El usuario superó todos los niveles de autorización |
| `401 Unauthorized` | Sin token o token inválido (Skill 10) |
| `403 (rol)` | Token válido pero el rol del usuario es insuficiente |
| `403 (ownership)` | Rol válido pero el recurso pertenece a otro usuario |
| `404 Not Found` | El recurso no existe — verificar **antes** del ownership |

## Pasos de funcionamiento

**Nivel 1 — Autorización por rol:**
1. Definir los roles del sistema como constantes o enum: `ROLE_ADMIN`, `ROLE_EDITOR`, `ROLE_USER`, etc.
2. Crear un guard/decorator/middleware reutilizable que:
   - Lee los roles del usuario desde el contexto de la request (inyectado por Skill 10).
   - Verifica que el usuario tiene al menos uno de los roles requeridos.
   - Lanza `ForbiddenException` (403) si no.
3. Aplicar el guard a cada endpoint con los roles que requiere.

**Nivel 2 — Validación de ownership:**
4. En el método del servicio para operaciones `PUT`, `PATCH` o `DELETE`:
   - Cargar el recurso de la BD → `NotFoundException` (404) si no existe — **ANTES** de verificar ownership.
   - Verificar si los roles del usuario incluyen algún rol privilegiado → si sí, omitir ownership y continuar.
   - Comparar `resource.{ownerField}` con `currentUser.id` → si no coinciden → `ForbiddenException` (403).
   - Solo después de pasar ambas verificaciones, ejecutar la operación.
5. Crear una función reutilizable `checkOwnership(ownerField, currentUser, privilegedRoles)` en `shared/` para usar en todos los servicios que lo necesiten.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @authorization skill to protect `DELETE /api/posts/:id`. Only `ROLE_ADMIN` and `ROLE_EDITOR` can delete any post. Regular users can only delete their own posts. The owner field is `authorId`."

**Resultado esperado:**
```
Modelo de seguridad aplicado:
1. JWT válido          → 401 si falta o es inválido
2. Rol requerido       → 403 si no tiene ROLE_ADMIN ni ROLE_EDITOR
3. Ownership check     → 403 si post.authorId != currentUser.id (skip si tiene ROLE_ADMIN)
   ↓ Todo OK
   Servicio elimina el post
```

## Estructura de archivos recomendada

```
src/shared/
├── guards/ | middleware/
│   ├── roles.guard.{ext}              ← Nivel 1: verifica roles desde el token
│   └── ownership.validator.{ext}     ← Nivel 2: función reutilizable de propiedad
└── constants/
    └── roles.{ext}                    ← Enum o constantes con los roles del sistema

src/{domain}/
└── entities/role.entity.{ext}         ← Entidad Role en BD si los roles son dinámicos
```

## Checklist de adaptación

Pasos mínimos para implementar autorización en cualquier proyecto:

- [ ] Definir los roles del sistema: reemplazar `{ROLENAME}` con los roles reales (`ADMIN`, `EDITOR`, etc.)
- [ ] Confirmar qué roles son "privilegiados" (pueden operar sobre cualquier recurso)
- [ ] Definir el campo `{ownerField}` de cada recurso protegido (`ownerId`, `authorId`, `createdBy`)
- [ ] Identificar qué operaciones (PUT, DELETE) requieren validación de ownership
- [ ] Confirmar el orden de verificación: 404 (existe?) → 403 (rol?) → 403 (ownership?)
- [ ] Crear la función `checkOwnership()` en `shared/` como utilidad reutilizable

> La lógica de RBAC y la validación de ownership son idénticas para cualquier proyecto. Solo cambian los nombres de roles, el campo de ownership y los recursos protegidos.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/roles.template.md`](resources/roles.template.md) — Definición de roles y guards en 4 lenguajes
- [`resources/ownership-validator.template.md`](resources/ownership-validator.template.md) — Función reutilizable de validación de propiedad
- [`resources/security-layers.md`](resources/security-layers.md) — Diagrama y tabla de casos de prueba del modelo de seguridad

---

> **Orden crítico:** Verificar 404 (recurso no existe) **antes** que 403 (ownership). El orden incorrecto filtra información al cliente.
