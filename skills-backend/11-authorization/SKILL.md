---
name: 11-authorization
description: "Enforces authorization with guards, role checks and ownership validation so authenticated users can only perform allowed actions."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Authentication answers who the user is; authorization answers what that user may do. This skill applies role-based and ownership-based checks across controllers and services so protected actions stay locked to the right principals.

**Descripción (ES):**
La autenticación responde quién es el usuario; la autorización responde qué puede hacer. Esta skill aplica controles por rol y por ownership en controladores y servicios para que las acciones protegidas queden realmente bloqueadas al principal correcto.

---

# 2. Skill Objective

**Objective (EN):**
Implement authorization checks that clearly separate `401 Unauthorized` from `403 Forbidden`.
- Use this skill when: Protecting admin routes, scoped resources, or actions that require a specific permission set.
- Do not use this skill when: The endpoint is intentionally public and has no protected behavior.

**Objetivo (ES):**
Implementar controles de autorización que separen claramente `401 Unauthorized` de `403 Forbidden`.
- Úsese cuando: Se protejan rutas admin, recursos acotados o acciones que requieran permisos específicos.
- No se use cuando: El endpoint sea intencionalmente público y no tenga comportamiento protegido.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Principal Context`: Authenticated user ID, roles, scopes, or claims.
2. `Permission Model`: RBAC, ABAC, ownership rules, or policy checks.
3. `Protected Actions`: Endpoints, service methods, or commands that require authorization.

**Entradas (ES):**
1. `Principal Context`: ID del usuario autenticado, roles, scopes o claims.
2. `Permission Model`: RBAC, ABAC, reglas de ownership o políticas.
3. `Protected Actions`: Endpoints, métodos de servicio o comandos que requieren autorización.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Guards, decorators, middleware, or policy helpers.
2. Service-level authorization checks for ownership-sensitive actions.
3. Deterministic `401`, `403`, and `404` responses following the proper security order.

**Salidas (ES):**
1. Guards, decoradores, middleware o helpers de políticas.
2. Checks de autorización a nivel servicio para acciones sensibles por ownership.
3. Respuestas deterministas `401`, `403` y `404` respetando el orden correcto de seguridad.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Require authentication first:** Authorization should run only after identity has been resolved.
2. **Centralize permission checks:** Use guards, decorators, or policies instead of scattering ad-hoc role checks through controllers.
3. **Check existence before ownership:** Load the resource first, return `404` if it does not exist, and only then evaluate ownership or privileged bypass.
4. **Add ownership validation in services:** When a rule depends on who owns a resource, verify it where the resource is loaded and business decisions occur.
5. **Implement privileged bypass explicitly:** Allow `ADMIN` or the equivalent privileged role to bypass ownership checks in a clear early-return branch.
6. **Return correct status codes:** `401` when there is no valid authenticated principal; `403` when the principal exists but lacks permission.
7. **Log denials safely:** Record denied attempts for audit value without exposing sensitive policy details to clients.

**Instrucciones (ES):**
1. **Exigir autenticación primero:** La autorización solo debe ejecutarse después de resolver la identidad.
2. **Centralizar permisos:** Usa guards, decoradores o políticas en lugar de esparcir checks de rol improvisados en controladores.
3. **Verificar existencia antes del ownership:** Carga primero el recurso, devuelve `404` si no existe y solo después evalúa ownership o bypass privilegiado.
4. **Agregar ownership en servicios:** Cuando la regla depende de quién es dueño del recurso, valídalo donde se carga el recurso y ocurre la decisión de negocio.
5. **Implementar bypass privilegiado de forma explícita:** Permite que `ADMIN` o el rol privilegiado equivalente salte la validación de ownership mediante una rama temprana y clara.
6. **Devolver códigos correctos:** `401` cuando no existe principal autenticado válido; `403` cuando sí existe pero no tiene permiso.
7. **Registrar denegaciones con seguridad:** Guarda intentos denegados con valor de auditoría sin exponer detalles sensibles de la política al cliente.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @11-authorization to protect `{FeatureName}` actions.
1. Add guard or policy checks for roles/scopes at the route boundary.
2. Validate ownership inside the service before updating or deleting protected resources.
```

**Prompt (ES):**
```text
Usa la skill @11-authorization para proteger las acciones de `{FeatureName}`.
1. Agrega checks de guard o políticas por roles/scopes en el borde de la ruta.
2. Valida ownership dentro del servicio antes de actualizar o eliminar recursos protegidos.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── core/
│   └── auth/
│       ├── guards/
│       │   ├── auth.guard.{ext}
│       │   └── roles.guard.{ext}
│       ├── decorators/
│       └── policies/
└── modules/
    └── {feature}/
        ├── {feature}.controller.{ext}
        └── {feature}.service.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Unauthenticated requests fail with `401`, not `403`.
- [ ] Permission rules are centralized and reusable.
- [ ] Ownership-sensitive actions are checked in the service layer, not only in the UI.
- [ ] Privileged roles bypass ownership explicitly and safely.
- [ ] Missing resources return `404` before any ownership denial.

**Checklist (ES):**
- [ ] Las requests no autenticadas fallan con `401`, no con `403`.
- [ ] Las reglas de permisos están centralizadas y son reutilizables.
- [ ] Las acciones sensibles por ownership se validan en la capa de servicio, no solo en la UI.
- [ ] Los roles privilegiados hacen bypass del ownership de forma explícita y segura.
- [ ] Los recursos inexistentes devuelven `404` antes de cualquier denegación por ownership.
