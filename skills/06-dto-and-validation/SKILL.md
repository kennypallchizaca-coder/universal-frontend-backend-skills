---
name: dto-and-validation
description: "Diseña Data Transfer Objects (DTOs) para separar la representación pública de los datos del modelo interno, y aplica validaciones declarativas sobre los campos de entrada. Independiente del lenguaje, framework y estructura de datos del proyecto."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# DTO and Validation

**Descripción:** Diseña Data Transfer Objects (DTOs) para separar la representación pública de los datos del modelo interno de la base de datos, y aplica validaciones declarativas sobre los campos de entrada. Los datos inválidos son rechazados en la frontera de la API con mensajes descriptivos, antes de alcanzar la lógica de negocio.

## Objetivo

Garantizar que el cliente nunca reciba más datos de los que debe ver, y que los datos inválidos sean rechazados con mensajes claros antes de ejecutar cualquier operación de negocio.

## Use this skill when

- Al definir el body de cualquier endpoint `POST`, `PUT` o `PATCH`
- Al diseñar respuestas que deben ocultar campos internos (contraseñas, tokens, claves)
- Al establecer reglas de entrada (campos requeridos, longitudes, formatos, rangos)
- Al garantizar la separación entre lo que la BD almacena y lo que el cliente ve

## Do not use this skill when

- El endpoint no tiene body y no requiere shaping de respuesta (ej: `DELETE` simple)
- Se trabaja en una función interna sin exposición HTTP
- El DTO sería idéntico a la entidad sin ningún campo eliminado — reconsiderar el diseño

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| Campos requeridos | ✅ | Qué debe enviar obligatoriamente el cliente al crear |
| Campos opcionales | ❌ | Qué puede enviar en actualizaciones parciales |
| Campos sensibles | ✅ | Campos que NUNCA deben incluirse en la respuesta |
| Reglas de validación | ✅ | Formatos, longitudes, rangos, dependencias entre campos |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| `Create{Resource}Dto` | DTO de entrada con validaciones declarativas para creación |
| `Update{Resource}Dto` | DTO con todos los campos opcionales para actualización |
| `{Resource}ResponseDto` | DTO de salida sin campos sensibles ni internos |
| Error `400 Bad Request` | Lista de campos inválidos con mensajes descriptivos |

## Pasos de funcionamiento

1. Identificar los campos que el cliente debe enviar al crear (campos requeridos).
2. Crear `Create{Resource}Dto` con anotaciones de validación declarativas por campo:
   - Requerido: `@NotBlank`, `@IsNotEmpty`, `required`, `Field(...)`
   - Longitud: `@Size`, `@MinLength/@MaxLength`, `min_length/max_length`
   - Formato: `@Email`, `@IsEmail`, `EmailStr`
   - Rango: `@Min/@Max`, `@IsPositive`, `gt=0`, `validate:"gte=0"`
3. Crear `Update{Resource}Dto` con los mismos campos, todos opcionales.
4. Identificar los campos que el cliente **nunca** debe ver: contraseñas, hashes, tokens, IDs internos.
5. Crear `{Resource}ResponseDto` con solo los campos públicos del recurso.
6. Activar la validación en el controlador (`@Valid`, `validate()`, `ShouldBindJSON`, etc.).
7. No capturar errores de validación en el controlador — el handler global (Skill 07) los formatea.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @dto-and-validation skill to create the `CreateProductDto`, `UpdateProductDto`, and `ProductResponseDto` for my NestJS project. Fields: `name` (string, 3–100 chars), `price` (positive decimal), `categoryId` (number). The response must not include cost or internal margin fields."

**Resultado esperado:**
```typescript
class CreateProductDto {
    @IsNotEmpty() @MinLength(3) @MaxLength(100)  name: string;
    @IsPositive()                                price: number;
    @IsInt()                                     categoryId: number;
}

class ProductResponseDto {
    id: number; name: string; price: number; categoryId: number; createdAt: Date;
    // NO incluye: cost, margin, internalSku
}
```

## Estructura de archivos recomendada

```
src/{resources}/dtos/
├── create-{resource}.dto.{ext}       ← Campos requeridos + validaciones (POST)
├── update-{resource}.dto.{ext}       ← Todos los campos opcionales (PUT/PATCH)
└── {resource}-response.dto.{ext}    ← Solo campos públicos (todas las respuestas)
```

## Checklist de adaptación

Pasos mínimos para aplicar esta skill a cualquier recurso del sistema:

- [ ] Reemplazar `{Resource}` con el nombre real del recurso
- [ ] Listar los campos del `Create{Resource}Dto` con su tipo, si son requeridos y sus reglas
- [ ] Identificar qué campos son opcionales en el `Update{Resource}Dto`
- [ ] Identificar qué campos deben excluirse del `{Resource}ResponseDto` (contraseñas, tokens, campos internos)
- [ ] Activar la validación global en el framework utilizado

> Los tres DTOs (`Create`, `Update`, `Response`) son el único patrón. Solo cambian los campos específicos y sus reglas de validación.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/dto.template.md`](resources/dto.template.md) — Plantillas de los 3 DTOs en 4 lenguajes
- [`resources/validation-rules-reference.md`](resources/validation-rules-reference.md) — Tabla de anotaciones de validación por lenguaje

---

> **Regla de oro:** Tres clases por recurso: `CreateDto`, `UpdateDto`, `ResponseDto`. Nunca una sola para todo.
