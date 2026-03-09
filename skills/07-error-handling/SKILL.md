---
name: error-handling
description: "Implementa un sistema centralizado y global de manejo de errores que captura excepciones de dominio tipadas, errores de validación y fallos inesperados, devolviendo siempre respuestas JSON estructuradas con el código HTTP correcto. Compatible con cualquier lenguaje o framework backend."
risk: medium
universal: true
source: community
date_added: "2026-03-09"
---

# Error Handling

**Descripción:** Implementa un sistema centralizado y global de manejo de errores que captura excepciones de dominio tipadas, errores de validación y fallos inesperados, devolviendo siempre respuestas JSON con estructura uniforme, el código HTTP correcto y sin exponer detalles internos al cliente.

## Objetivo

Garantizar que toda la API responda con un formato de error uniforme en cualquier situación, eliminando `try/catch` dispersos en controladores y servicios, centralizando el formateo de errores en un único lugar de toda la aplicación.

## Use this skill when

- Al iniciar cualquier proyecto — configurar **antes** del primer endpoint
- Al agregar cualquier módulo que pueda lanzar errores de dominio
- Al estandarizar las respuestas de error de una API existente

## Do not use this skill when

- Se necesita infraestructura de logging — el error handling es sobre respuestas, no logs
- La aplicación es un worker en background sin respuestas HTTP
- El flujo de control esperado ya usa excepciones — no es "manejo de errores"

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| Excepción lanzada | ✅ | Error tipado: `NotFoundException`, `ConflictException`, etc. |
| Mensaje de error | ✅ | Texto descriptivo del problema — seguro para el cliente |
| Contexto HTTP | ✅ | URL y método de la petición para incluir en la respuesta |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| JSON uniforme | `{ timestamp, status, error, message, path }` — siempre igual |
| Código HTTP correcto | 400, 401, 403, 404, 409, 500 según el tipo de excepción |
| Sin stack traces | Detalles internos nunca expuestos al cliente |

## Pasos de funcionamiento

1. Definir la clase base `ApplicationException` con:
   - `statusCode` — el HTTP status que esta excepción mapea
   - `message` — descripción legible y segura para el cliente
2. Crear excepciones tipadas por caso de negocio:
   - `NotFoundException` → 404
   - `ConflictException` → 409
   - `BadRequestException` → 400
   - `UnauthorizedException` → 401
   - `ForbiddenException` → 403
3. Definir la forma estándar de respuesta de error (ver schema en resources).
4. Implementar el handler global que intercepta **todas** las excepciones:
   - Si es `ApplicationException` → usar su `statusCode` y `message`
   - Si es error de validación → colectar todos los mensajes de campo → 400
   - Si es cualquier otro error → responder 500 con mensaje genérico seguro
5. Registrar el handler como interceptor global **antes** que cualquier ruta.
6. En servicios y repositorios: SOLO lanzar excepciones — nunca capturarlas.
7. Verificar en producción: stack traces desactivados, mensajes no revelan internos.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @error-handling skill to set up centralized error handling in my Express + TypeScript API. Include NotFoundException, ConflictException, ForbiddenException, and a global middleware that formats all errors into a standard JSON shape."

**Resultado esperado:**
```typescript
// Lanzado desde el servicio:
throw new NotFoundException(`Order not found: ${id}`);

// Respuesta al cliente:
{
  "timestamp": "2025-06-15T10:30:00.000Z",
  "status": 404,
  "error": "Not Found",
  "message": "Order not found: 99",
  "path": "/api/orders/99"
}
```

## Estructura de archivos recomendada

```
src/shared/
├── exceptions/
│   ├── app.exception.{ext}            ← Clase base con status + message
│   ├── not-found.exception.{ext}
│   ├── conflict.exception.{ext}
│   ├── bad-request.exception.{ext}
│   └── forbidden.exception.{ext}
├── handlers/ | filters/ | middleware/
│   └── global-error-handler.{ext}    ← Único lugar que formatea errores
└── dtos/
    └── error-response.dto.{ext}
```

## Checklist de adaptación

Pasos mínimos para configurar el manejo de errores en cualquier proyecto:

- [ ] Crear la excepción base con `statusCode` y `message`
- [ ] Crear las excepciones tipadas para los casos de negocio del proyecto
- [ ] Registrar el handler global **antes** de cualquier ruta
- [ ] Confirmar que la respuesta de error sigue el schema estándar (ver `resources/error-response.schema.json`)
- [ ] Confirmar que el código 500 devuelve un mensaje genérico sin detalles internos
- [ ] Verificar que ningún controlador ni servicio captura sus propias excepciones

> La jerarquía de excepciones, el shape del error y la posición del handler son idénticos para cualquier proyecto. Solo se agregan nuevas excepciones tipadas por cada regla de negocio específica del dominio.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/exceptions.template.md`](resources/exceptions.template.md) — Jerarquía de excepciones en 4 lenguajes
- [`resources/error-response.schema.json`](resources/error-response.schema.json) — Schema JSON del formato de error estándar

---

> **Regla:** Los servicios solo lanzan — el handler global captura. Sin `try/catch` en controladores.
