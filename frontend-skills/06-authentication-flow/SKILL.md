---
name: 06-authentication-flow
description: "Orchestrates login, session hydration, logout and 401 recovery while preferring secure cookie-based sessions over browser token persistence."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Authentication is more than a login form. The frontend must restore session state on boot, react to expired sessions, coordinate protected navigation, and avoid unsafe token storage patterns. This skill defines that lifecycle end to end.

**Descripción (ES):**
La autenticación es mucho más que un formulario de login. El frontend debe restaurar la sesión al arrancar, reaccionar a sesiones expiradas, coordinar navegación protegida y evitar patrones inseguros de almacenamiento de tokens. Esta skill define ese ciclo completo.

---

# 2. Skill Objective

**Objective (EN):**
Implement a reliable session flow for SPA or hybrid frontend applications.
- Use this skill when: Building login/logout flows, protected dashboards, or startup hydration for authenticated apps.
- Do not use this skill when: Authentication is fully delegated to a BaaS SDK that already exposes reactive session state (see Skill 11).
- Security preference: Prefer `httpOnly`, `secure`, `sameSite` cookies. Use `localStorage` or `sessionStorage` only if the architecture explicitly requires it and the tradeoff is documented.

**Objetivo (ES):**
Implementar un flujo de sesión confiable para aplicaciones frontend SPA o híbridas.
- Úsese cuando: Se construyan flujos de login/logout, dashboards protegidos o hidratación inicial de apps autenticadas.
- No se use cuando: La autenticación esté delegada por completo a un SDK BaaS que ya expone estado reactivo de sesión (ver Skill 11).
- Preferencia de seguridad: Prioriza cookies `httpOnly`, `secure`, `sameSite`. Usa `localStorage` o `sessionStorage` solo si la arquitectura lo exige de forma explícita y el riesgo queda documentado.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Auth Endpoints`: `login`, `logout`, `me`, and optionally `refresh`.
2. `Session Transport`: Secure cookies, in-memory token, or documented fallback storage.
3. `Global State`: Store/service that exposes session status to the app shell and guards.

**Entradas (ES):**
1. `Auth Endpoints`: `login`, `logout`, `me` y opcionalmente `refresh`.
2. `Session Transport`: Cookies seguras, token en memoria o almacenamiento alternativo documentado.
3. `Global State`: Store/servicio que expone el estado de sesión al shell de la app y a los guards.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. An auth repository/service that talks to the backend.
2. A global session store with explicit states such as `unknown`, `authenticated`, and `guest`.
3. A hydration routine and logout workflow reused by guards and HTTP error handling.

**Salidas (ES):**
1. Un repositorio o servicio de auth que hable con el backend.
2. Un store global de sesión con estados explícitos como `unknown`, `authenticated` y `guest`.
3. Una rutina de hidratación y un flujo de logout reutilizados por guards y manejo de errores HTTP.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Create the auth repository:** Isolate `login`, `logout`, `me`, and `refresh` requests from UI components.
2. **Model explicit session states:** The app should distinguish between “still checking session” and “definitely logged out”.
3. **Hydrate on startup:** On app boot, call `/me` or a refresh endpoint before rendering protected routes; do not guess auth state from UI-only assumptions.
4. **Centralize logout:** A single `logout()` action must clear session state, trigger backend logout if needed, and redirect safely.
5. **Handle `401` once:** Route HTTP `401` responses through the same logout/session reset path to avoid duplicated logic and stale UI state.

**Instrucciones (ES):**
1. **Crear el repositorio de auth:** Aísla las llamadas `login`, `logout`, `me` y `refresh` fuera de los componentes UI.
2. **Modelar estados de sesión explícitos:** La app debe distinguir entre “aún verificando sesión” y “definitivamente deslogueado”.
3. **Hidratar al arrancar:** Al iniciar la app, llama a `/me` o a un endpoint de refresh antes de renderizar rutas protegidas; no adivines auth solo desde suposiciones de UI.
4. **Centralizar logout:** Una única acción `logout()` debe limpiar el estado de sesión, ejecutar logout backend si aplica y redirigir de forma segura.
5. **Manejar `401` una sola vez:** Enruta las respuestas HTTP `401` por el mismo camino de logout o reset de sesión para evitar lógica duplicada y UI obsoleta.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @06-authentication-flow to implement session management in this {Framework} app.
1. Build an auth repository plus a global session store with `unknown`, `authenticated` and `guest` states.
2. Hydrate the session on app startup and route every `401` through the same logout/reset flow.
```

**Prompt (ES):**
```text
Usa la skill @06-authentication-flow para implementar gestión de sesión en esta app {Framework}.
1. Construye un repositorio de auth y un store global con estados `unknown`, `authenticated` y `guest`.
2. Hidrata la sesión al arrancar la app y envía cada `401` por el mismo flujo de logout o reset.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── features/
    └── auth/
        ├── api/
        │   └── auth.repository.{ext}
        ├── store/
        │   └── auth.store.{ext}
        ├── hooks/ or composables/
        │   └── use-session-bootstrap.{ext}
        └── components/
            └── LoginForm.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] A page refresh preserves the real session state after hydration.
- [ ] Protected routes wait for session bootstrap before redirecting.
- [ ] Token persistence is not stored in `localStorage` unless the project documents that exception and accepts the risk.

**Checklist (ES):**
- [ ] Un refresh de página preserva el estado real de la sesión después de la hidratación.
- [ ] Las rutas protegidas esperan el bootstrap de sesión antes de redirigir.
- [ ] La persistencia de tokens no se guarda en `localStorage` salvo que el proyecto documente esa excepción y acepte el riesgo.
