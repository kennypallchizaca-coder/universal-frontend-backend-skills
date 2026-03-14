---
name: 12-route-guards
description: "Protects routes with auth, guest and permission guards that wait for session bootstrap before redirecting."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Route guards should enforce navigation rules without flicker, loops, or stale session assumptions. This skill makes guards depend on explicit session state and route metadata instead of fragile browser storage checks.

**Descripción (ES):**
Los route guards deben hacer cumplir reglas de navegación sin flicker, loops ni supuestos viejos sobre la sesión. Esta skill hace que los guards dependan de estado explícito de sesión y metadata de rutas, no de checks frágiles de almacenamiento del navegador.

---

# 2. Skill Objective

**Objective (EN):**
Implement auth and guest route protection that cooperates with session hydration.
- Use this skill when: Protecting private pages, preventing logged-in users from visiting login routes, or applying role-based route access.
- Do not use this skill when: The app is fully public and has no session-dependent navigation.

**Objetivo (ES):**
Implementar protección de rutas auth y guest que coopere con la hidratación de sesión.
- Úsese cuando: Se protejan páginas privadas, se impida que usuarios logueados visiten rutas de login o se aplique acceso por rol.
- No se use cuando: La app sea completamente pública y no tenga navegación dependiente de sesión.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Session Store`: Source of truth for `unknown`, `authenticated`, `guest`, and optionally roles.
2. `Route Metadata`: `requiresAuth`, `requiresGuest`, role/scopes, fallback paths.
3. `Redirect Policy`: Login path, home path, forbidden path, and return URL behavior.

**Entradas (ES):**
1. `Session Store`: Fuente de verdad para `unknown`, `authenticated`, `guest` y opcionalmente roles.
2. `Route Metadata`: `requiresAuth`, `requiresGuest`, roles/scopes y rutas fallback.
3. `Redirect Policy`: Ruta de login, home, forbidden y comportamiento de return URL.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Reusable auth, guest, and optional role guards.
2. Route configuration that depends on session state instead of ad-hoc checks.
3. Redirect behavior that preserves intended destination when appropriate.

**Salidas (ES):**
1. Guards reutilizables de auth, guest y opcionalmente de rol.
2. Configuración de rutas que depende del estado de sesión y no de checks improvisados.
3. Redirecciones que preservan el destino deseado cuando corresponde.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Wait for session bootstrap:** Guards must distinguish “session still loading” from “guest” to avoid false redirects.
2. **Use the central auth store/service:** Never make direct browser-storage reads the primary truth source for route protection.
3. **Implement distinct guard types:** Auth guards protect private routes, guest guards protect login/register routes, and role guards protect privileged areas.
4. **Preserve intent when useful:** Redirect unauthenticated users to login with a return URL or equivalent router state.
5. **Keep guard logic deterministic:** Avoid side effects beyond navigation decisions and shared session resets.

**Instrucciones (ES):**
1. **Esperar el bootstrap de sesión:** Los guards deben distinguir entre “sesión aún cargando” y “guest” para evitar redirecciones falsas.
2. **Usar el store o servicio central de auth:** Nunca conviertas lecturas directas del storage del navegador en la fuente principal de verdad para proteger rutas.
3. **Implementar tipos de guard distintos:** Auth guards para rutas privadas, guest guards para login/register y role guards para áreas privilegiadas.
4. **Preservar intención cuando sirva:** Redirige usuarios no autenticados al login con return URL o estado equivalente del router.
5. **Mantener lógica determinista:** Evita side effects más allá de decisiones de navegación y resets compartidos de sesión.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @12-route-guards to protect navigation in this {Framework} app.
1. Build auth and guest guards that wait for session bootstrap before redirecting.
2. Use route metadata and the central auth store instead of direct browser storage checks.
```

**Prompt (ES):**
```text
Usa la skill @12-route-guards para proteger la navegación en esta app {Framework}.
1. Construye auth y guest guards que esperen el bootstrap de sesión antes de redirigir.
2. Usa metadata de rutas y el store central de auth en lugar de checks directos de storage del navegador.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── app/
│   └── router/
│       ├── guards/
│       │   ├── require-auth.{ext}
│       │   ├── require-guest.{ext}
│       │   └── require-role.{ext}
│       └── routes.{ext}
└── features/
    └── auth/
        └── store/
            └── auth.store.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Guards do not redirect until session bootstrap has completed.
- [ ] Route protection depends on shared session state, not direct token reads from browser storage.
- [ ] Auth redirects preserve the intended destination when appropriate.

**Checklist (ES):**
- [ ] Los guards no redirigen hasta que el bootstrap de sesión termine.
- [ ] La protección de rutas depende del estado compartido de sesión, no de lecturas directas del storage del navegador.
- [ ] Las redirecciones auth preservan el destino deseado cuando aplica.
