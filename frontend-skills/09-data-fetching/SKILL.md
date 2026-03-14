---
name: 09-data-fetching
description: "Centralizes API communication with reusable clients, repositories and safe authentication-aware error handling."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Calling APIs directly from components quickly creates duplication, hidden auth bugs, and inconsistent error handling. This skill defines a shared network layer with one client, typed repositories, and predictable handling of credentials, retries, and failures.

**Descripción (ES):**
Consumir APIs directamente desde componentes crea rápido duplicación, bugs de auth ocultos y manejo inconsistente de errores. Esta skill define una capa de red compartida con un solo cliente, repositorios tipados y tratamiento predecible de credenciales, reintentos y fallos.

---

# 2. Skill Objective

**Objective (EN):**
Create a maintainable HTTP layer that components can consume without knowing transport details.
- Use this skill when: The app talks to REST, GraphQL, or internal API endpoints and needs reusable request behavior.
- Do not use this skill when: A tiny proof of concept only makes one disposable request.
- Security preference: Prefer cookie-based sessions with `withCredentials` over reading tokens from `localStorage`.

**Objetivo (ES):**
Crear una capa HTTP mantenible que los componentes puedan consumir sin conocer detalles del transporte.
- Úsese cuando: La app hable con endpoints REST, GraphQL o APIs internas y necesite comportamiento reutilizable de requests.
- No se use cuando: Un proof of concept mínimo solo haga una request descartable.
- Preferencia de seguridad: Prioriza sesiones por cookie con `withCredentials` por encima de leer tokens desde `localStorage`.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Base API Config`: Base URL, timeout, credentials mode, headers.
2. `Auth Strategy`: Secure cookies, memory token, or documented bearer-token fallback.
3. `Error Contract`: Shared response shape for 4xx and 5xx failures.

**Entradas (ES):**
1. `Base API Config`: URL base, timeout, modo de credenciales y headers.
2. `Auth Strategy`: Cookies seguras, token en memoria o bearer fallback documentado.
3. `Error Contract`: Forma compartida de respuesta para fallos 4xx y 5xx.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A centralized API client instance.
2. Feature repositories or services that map endpoints to typed methods.
3. Global response handling for `401`, `403`, and server failures.

**Salidas (ES):**
1. Una instancia centralizada del cliente API.
2. Repositorios o servicios por feature que mapear endpoints a métodos tipados.
3. Manejo global de respuestas para `401`, `403` y fallos del servidor.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Create one client per backend context:** Centralize base URL, timeout, JSON defaults, and credential behavior.
2. **Attach auth the safe way:** Prefer `withCredentials` or framework-native cookie support. Only inject bearer headers manually when the backend contract truly requires it.
3. **Wrap endpoints in repositories/services:** Components should call `UsersRepository.list()` rather than constructing raw URLs.
4. **Normalize failures:** Map backend error payloads to one predictable shape and route `401` handling through the shared auth reset flow.
5. **Keep components transport-agnostic:** UI code should focus on loading, empty, success, and error states, not on HTTP plumbing.

**Instrucciones (ES):**
1. **Crear un cliente por contexto backend:** Centraliza base URL, timeout, defaults JSON y comportamiento de credenciales.
2. **Adjuntar auth de forma segura:** Prefiere `withCredentials` o soporte nativo de cookies del framework. Solo inyecta bearer headers manualmente cuando el contrato backend realmente lo exija.
3. **Envolver endpoints en repositorios o servicios:** Los componentes deberían llamar `UsersRepository.list()` en lugar de construir URLs crudas.
4. **Normalizar fallos:** Mapea los payloads de error backend a una forma predecible y envía el manejo de `401` por el flujo compartido de reset de auth.
5. **Mantener componentes agnósticos al transporte:** La UI debe enfocarse en loading, empty, success y error, no en plumbing HTTP.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @09-data-fetching to structure API access in this {Framework} app.
1. Create a shared API client with timeout, credentials and normalized error handling.
2. Expose typed repositories per feature so components never build raw HTTP requests inline.
```

**Prompt (ES):**
```text
Usa la skill @09-data-fetching para estructurar el acceso API en esta app {Framework}.
1. Crea un cliente API compartido con timeout, credenciales y manejo normalizado de errores.
2. Expón repositorios tipados por feature para que los componentes nunca construyan requests HTTP inline.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── shared/
│   └── api/
│       ├── api-client.{ext}
│       ├── api-errors.{ext}
│       └── auth-interceptor.{ext}
└── features/
    └── {FeatureName}/
        └── api/
            └── {feature}.repository.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Components never embed raw API URLs or auth header logic.
- [ ] `401` responses trigger the shared session reset path.
- [ ] Browser token storage is not the default auth transport recommendation.

**Checklist (ES):**
- [ ] Los componentes nunca embeben URLs API crudas ni lógica de auth headers.
- [ ] Las respuestas `401` disparan el camino compartido de reset de sesión.
- [ ] El almacenamiento de tokens en el navegador no es la recomendación por defecto.
