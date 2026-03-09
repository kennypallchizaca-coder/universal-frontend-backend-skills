---
name: rest-api-design
description: "Diseña e implementa una API RESTful completa con operaciones CRUD sobre cualquier recurso de negocio, usando verbos HTTP semánticos, DTOs separados para entrada y salida, y respuestas con los códigos HTTP correctos. Compatible con cualquier framework backend."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# REST API Design

**Descripción:** Diseña e implementa una API RESTful completa con operaciones CRUD sobre cualquier recurso de negocio. El controlador solo enruta y delega al servicio — nunca contiene lógica de negocio. El cliente siempre recibe un DTO de respuesta, nunca la entidad directa de base de datos.

## Objetivo

Exponer cualquier recurso del sistema a través de endpoints HTTP predecibles y semánticamente correctos, desacoplados del modelo interno de datos, con contratos de entrada y salida claramente definidos.

## Use this skill when

- Al diseñar los endpoints de cualquier entidad de negocio
- Al exponer una API consumida por un frontend, cliente móvil o servicio externo
- Al agregar un nuevo recurso a una API existente
- Al estandarizar respuestas HTTP en un equipo o proyecto

## Do not use this skill when

- El requerimiento es en tiempo real (usar WebSockets o SSE)
- El recurso es solo interno sin exposición HTTP
- El proyecto usa GraphQL o RPC — este skill es estrictamente REST

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `{Resource}` | ✅ | Nombre del recurso en PascalCase (ej: `Order`, `Invoice`) |
| `{resources}` | ✅ | Nombre plural en lowercase para la ruta (ej: `orders`, `invoices`) |
| Campos del recurso | ✅ | Lista de campos con tipos para los DTOs |
| Reglas de negocio | ❌ | Restricciones sobre qué operaciones están permitidas |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| 5 endpoints CRUD | `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id` |
| `Create{Resource}Dto` | Contrato de entrada para creación |
| `Update{Resource}Dto` | Contrato de entrada para actualización (campos opcionales) |
| `{Resource}ResponseDto` | Contrato de salida sin campos internos ni sensibles |
| Códigos HTTP semánticos | 200, 201, 204, 400, 404, 409 según operación |

## Pasos de funcionamiento

1. Definir la ruta base: `/api/{resources}` — sustantivo plural, lowercase, kebab-case.
2. Diseñar `Create{Resource}Dto` con los campos requeridos para crear.
3. Diseñar `Update{Resource}Dto` con todos los campos opcionales (para PATCH/PUT).
4. Diseñar `{Resource}ResponseDto` con solo los campos que el cliente debe ver.
5. Implementar los cinco endpoints estándar con sus métodos HTTP y códigos:

   | Método | Ruta | Acción | HTTP OK | HTTP Error |
   |--------|------|--------|:-------:|:----------:|
   | GET | `/api/{resources}` | Listar todos | 200 | 500 |
   | GET | `/api/{resources}/{id}` | Obtener uno | 200 | 404 |
   | POST | `/api/{resources}` | Crear | 201 | 400, 409 |
   | PUT | `/api/{resources}/{id}` | Actualizar | 200 | 400, 404 |
   | DELETE | `/api/{resources}/{id}` | Eliminar | 204 | 404 |

6. El controlador SOLO llama al servicio y retorna el resultado — sin lógica de negocio.
7. Activar validación sobre el body del request (`@Valid`, `validate()`, `ShouldBindJSON`, etc.).
8. Retornar siempre el `{Resource}ResponseDto` — nunca la entidad de BD directamente.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @rest-api-design skill to implement a full CRUD API for an `Invoice` resource in my FastAPI project. Fields: `number` (string, required), `amount` (decimal, required), `status` (enum: PENDING/PAID/CANCELLED)."

**Resultado esperado:**
```
GET    /api/invoices         → 200 [ { id, number, amount, status, createdAt } ]
GET    /api/invoices/{id}    → 200 { id, number, amount, status, createdAt }
POST   /api/invoices         → 201 { id, number, amount, status, createdAt }
PUT    /api/invoices/{id}    → 200 { id, number, amount, status, createdAt }
DELETE /api/invoices/{id}    → 204
```

## Estructura de archivos recomendada

```
src/{resources}/
├── controllers/
│   └── {resources}.controller.{ext}      ← Solo enruta — sin lógica
├── dtos/
│   ├── create-{resource}.dto.{ext}
│   ├── update-{resource}.dto.{ext}
│   └── {resource}-response.dto.{ext}
└── services/
    └── {resource}.service.{ext}          ← Toda la lógica de negocio
```

## Checklist de adaptación

Pasos mínimos para aplicar esta skill a cualquier recurso de negocio:

- [ ] Reemplazar `{Resource}` con el nombre real del recurso (PascalCase)
- [ ] Reemplazar `{resources}` con el nombre plural en lowercase para la URL
- [ ] Definir los campos del recurso y sus reglas de validación
- [ ] Identificar qué campos deben ocultarse en el `{Resource}ResponseDto`
- [ ] Confirmar que el controlador no contiene lógica de negocio
- [ ] Verificar que los 5 endpoints retornan los códigos HTTP correctos

> Los únicos cambios entre recursos son el nombre del recurso, los campos y las reglas de negocio. La estructura de endpoints, los DTOs separados y los códigos HTTP son siempre idénticos.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/api-contract.template.md`](resources/api-contract.template.md) — Plantilla de contrato de API para documentar cualquier recurso
- [`resources/http-status-reference.md`](resources/http-status-reference.md) — Referencia de códigos HTTP por tipo de operación

---

> **Regla de oro:** El cliente nunca recibe la entidad de BD directamente. Siempre usa el ResponseDto.
