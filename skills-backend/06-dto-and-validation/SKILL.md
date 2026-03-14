---
name: 06-dto-and-validation
description: "Defines DTOs and validation rules that reject malformed or dangerous input before it reaches the service layer."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Input validation is a security boundary, not optional polish. This skill introduces DTOs or request schemas that whitelist accepted fields, validate types and formats, and stop invalid payloads before they touch business logic or persistence.

**Descripción (ES):**
La validación de entrada es una frontera de seguridad, no un adorno opcional. Esta skill introduce DTOs o esquemas de request que permiten solo campos aceptados, validan tipos y formatos, y frenan payloads inválidos antes de tocar lógica de negocio o persistencia.

---

# 2. Skill Objective

**Objective (EN):**
Create validated request contracts for create, update, and query operations.
- Use this skill when: Accepting external input through `POST`, `PUT`, `PATCH`, form-data, or query filters.
- Do not use this skill when: A route is purely static and has no user-controlled input.

**Objetivo (ES):**
Crear contratos de request validados para operaciones de creación, actualización y consulta.
- Úsese cuando: Se acepte input externo por `POST`, `PUT`, `PATCH`, formularios o filtros por query.
- No se use cuando: Una ruta sea puramente estática y no tenga input controlado por usuarios.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Payload Shape`: Fields, types, optional values, and nested objects.
2. `Validation Engine`: Zod, Joi, class-validator, Pydantic, Bean Validation, etc.
3. `Error Contract`: How validation failures are returned to clients.

**Entradas (ES):**
1. `Payload Shape`: Campos, tipos, opcionales y objetos anidados.
2. `Validation Engine`: Zod, Joi, class-validator, Pydantic, Bean Validation, etc.
3. `Error Contract`: Cómo se devuelven los fallos de validación al cliente.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. DTO classes or request schemas for create/update/query operations.
2. Automatic validation hooks in controllers, routers, or middleware.
3. Safe, structured `400 Bad Request` responses for invalid input.

**Salidas (ES):**
1. Clases DTO o esquemas de request para create/update/query.
2. Hooks automáticos de validación en controladores, routers o middleware.
3. Respuestas `400 Bad Request` seguras y estructuradas ante input inválido.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Define allowlisted DTOs:** Explicitly declare accepted fields instead of passing raw `request.body` into services or repositories.
2. **Validate shape and meaning:** Enforce required fields, string length, numeric ranges, enums, dates, email formats, and nested objects.
3. **Separate create vs update contracts:** `PATCH` should not reuse the exact same rules as `POST` unless that is truly correct.
4. **Normalize validation errors:** Return clear field-level feedback without leaking stack traces or framework internals.
5. **Keep validation close to the boundary:** Reject bad input before business logic runs.

**Instrucciones (ES):**
1. **Definir DTOs con allowlist:** Declara explícitamente los campos aceptados en lugar de pasar `request.body` crudo a servicios o repositorios.
2. **Validar forma y significado:** Aplica requeridos, longitud de strings, rangos numéricos, enums, fechas, emails y objetos anidados.
3. **Separar contratos de create y update:** `PATCH` no debe reutilizar exactamente las mismas reglas de `POST` salvo que sea correcto.
4. **Normalizar errores de validación:** Devuelve feedback claro por campo sin filtrar stack traces ni detalles internos.
5. **Validar en el borde:** Rechaza el input inválido antes de ejecutar lógica de negocio.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @06-dto-and-validation to define the request contracts for `{EntityName}`.
1. Create separate DTOs/schemas for create and update operations.
2. Validate fields at the controller boundary and return structured 400 errors when input is invalid.
```

**Prompt (ES):**
```text
Usa la skill @06-dto-and-validation para definir los contratos de request de `{EntityName}`.
1. Crea DTOs o esquemas separados para operaciones de create y update.
2. Valida los campos en el borde del controlador y devuelve errores 400 estructurados cuando el input sea inválido.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    └── {feature}/
        ├── dto/
        │   ├── create-{feature}.dto.{ext}
        │   ├── update-{feature}.dto.{ext}
        │   └── query-{feature}.dto.{ext}
        ├── {feature}.controller.{ext}
        └── {feature}.service.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Services never receive unchecked raw request bodies.
- [ ] Create and update payloads use distinct validation rules when needed.
- [ ] Validation errors are deterministic and safe to expose to clients.

**Checklist (ES):**
- [ ] Los servicios nunca reciben cuerpos de request crudos sin validar.
- [ ] Los payloads de create y update usan reglas distintas cuando hace falta.
- [ ] Los errores de validación son deterministas y seguros para exponer al cliente.
