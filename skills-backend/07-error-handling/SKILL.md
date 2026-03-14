---
name: 07-error-handling
description: "Centralizes backend error handling so failures are logged consistently and clients receive safe, predictable error responses."
risk: medium
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Scattered try/catch blocks create inconsistent APIs and hide operational problems. This skill establishes a global error strategy that separates business exceptions from unexpected failures and translates both into stable response contracts.

**Descripción (ES):**
Los `try/catch` dispersos crean APIs inconsistentes y esconden problemas operativos. Esta skill establece una estrategia global de errores que separa excepciones de negocio de fallos inesperados y traduce ambos a contratos de respuesta estables.

---

# 2. Skill Objective

**Objective (EN):**
Standardize how the backend throws, logs, and returns errors.
- Use this skill when: The project exposes HTTP endpoints, background jobs, or external integrations that can fail.
- Do not use this skill when: You are only writing throwaway scripts with no client-facing contract.

**Objetivo (ES):**
Estandarizar cómo el backend lanza, registra y devuelve errores.
- Úsese cuando: El proyecto exponga endpoints HTTP, jobs en segundo plano o integraciones externas que puedan fallar.
- No se use cuando: Solo se escriban scripts descartables sin contrato hacia clientes.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Error Types`: Validation, not found, conflict, unauthorized, forbidden, external dependency failures.
2. `Logging Strategy`: Console, structured logger, APM, or centralized observability.
3. `Response Schema`: Standard error body expected by clients.

**Entradas (ES):**
1. `Error Types`: Validación, no encontrado, conflicto, no autorizado, prohibido y fallos de dependencias externas.
2. `Logging Strategy`: Consola, logger estructurado, APM u observabilidad centralizada.
3. `Response Schema`: Cuerpo estándar de error esperado por clientes.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Domain/application error classes or enums.
2. A global exception filter, middleware, or handler.
3. Safe client responses plus actionable logs for operators.

**Salidas (ES):**
1. Clases o enums de errores de dominio o aplicación.
2. Un filtro, middleware o handler global de excepciones.
3. Respuestas seguras para clientes y logs accionables para operadores.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Define known error categories:** Model validation, not-found, conflict, auth, and dependency failures explicitly.
2. **Translate errors centrally:** Use a single middleware/filter/handler to map exceptions to HTTP status codes and the shared error schema.
3. **Log with context:** Include request ID, route, actor, and dependency details when available, but avoid leaking secrets or PII.
4. **Separate expected from unexpected:** Business errors should be cleanly exposed; unknown errors should return generic `500` responses.
5. **Keep controllers/services focused:** Throw meaningful errors and let the global layer decide how to serialize them.

**Instrucciones (ES):**
1. **Definir categorías conocidas:** Modela explícitamente validación, no encontrado, conflicto, auth y fallos de dependencias.
2. **Traducir errores en un punto central:** Usa un middleware, filtro o handler único para convertir excepciones en códigos HTTP y en el esquema compartido de error.
3. **Loggear con contexto:** Incluye request ID, ruta, actor y detalles de dependencias cuando existan, pero sin filtrar secretos ni PII.
4. **Separar lo esperado de lo inesperado:** Los errores de negocio pueden exponerse limpiamente; los desconocidos deben devolver `500` genérico.
5. **Mantener foco en controladores y servicios:** Lanza errores significativos y deja que la capa global decida cómo serializarlos.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @07-error-handling to standardize backend failures.
1. Create application error types for validation, not-found, conflict and auth cases.
2. Add a global handler that logs context and returns a safe shared error schema.
```

**Prompt (ES):**
```text
Usa la skill @07-error-handling para estandarizar los fallos del backend.
1. Crea tipos de error de aplicación para validación, no encontrado, conflicto y auth.
2. Agrega un handler global que registre contexto y devuelva un esquema de error seguro y compartido.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── core/
│   ├── errors/
│   │   ├── app-error.{ext}
│   │   └── error-codes.{ext}
│   ├── logging/
│   └── http/
│       └── error-handler.{ext}
└── modules/
    └── {feature}/
        └── {feature}.service.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Unknown failures return a safe `500` response without stack traces in production.
- [ ] Validation and domain errors map to deterministic status codes.
- [ ] Logs contain enough context to debug incidents without exposing secrets.

**Checklist (ES):**
- [ ] Los fallos desconocidos devuelven un `500` seguro sin stack traces en producción.
- [ ] Los errores de validación y dominio mapean a códigos deterministas.
- [ ] Los logs contienen contexto suficiente para depurar sin exponer secretos.
