---
name: 11-baas-integration
description: "Integrates Firebase or Supabase through official SDKs, singleton setup and secure client-server responsibility boundaries."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
BaaS platforms reduce backend work, but they also blur security boundaries if used carelessly. This skill standardizes official SDK setup, reactive auth integration, and the rule that privileged operations must stay behind security rules or server-side functions.

**Descripción (ES):**
Las plataformas BaaS reducen trabajo backend, pero también difuminan fronteras de seguridad si se usan sin cuidado. Esta skill estandariza el setup con SDK oficial, la integración reactiva de auth y la regla de que las operaciones privilegiadas deben quedar detrás de security rules o funciones server-side.

---

# 2. Skill Objective

**Objective (EN):**
Integrate Firebase or Supabase safely without turning components into direct infrastructure code.
- Use this skill when: The app depends on Firebase, Supabase, or another official BaaS SDK for auth, database, storage, or realtime features.
- Do not use this skill when: The frontend talks only to a custom backend and does not need a direct cloud SDK.

**Objetivo (ES):**
Integrar Firebase o Supabase de forma segura sin convertir componentes en código de infraestructura.
- Úsese cuando: La app dependa de Firebase, Supabase u otro SDK BaaS oficial para auth, base de datos, storage o realtime.
- No se use cuando: El frontend solo hable con un backend propio y no necesite SDK cloud directo.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Provider`: Firebase, Supabase, or equivalent official SDK.
2. `Public Config`: Public env variables required by the client SDK.
3. `Security Model`: Firestore rules, Supabase RLS, App Check, server functions, or edge functions.

**Entradas (ES):**
1. `Provider`: Firebase, Supabase o SDK oficial equivalente.
2. `Public Config`: Variables públicas de entorno requeridas por el SDK cliente.
3. `Security Model`: Firestore rules, Supabase RLS, App Check, server functions o edge functions.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A singleton provider bootstrap file.
2. Auth/database wrappers consumed by the rest of the app.
3. Clear boundaries between client-safe operations and privileged server-side flows.

**Salidas (ES):**
1. Un archivo singleton para inicializar el provider.
2. Wrappers de auth o base consumidos por el resto de la app.
3. Límites claros entre operaciones seguras del cliente y flujos privilegiados del lado servidor.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Bootstrap the SDK once:** Export a single initialized app/client instance from a shared module.
2. **Load only public client config:** Client-side API keys may be public by design, but admin keys and service secrets must stay server-side.
3. **Wrap SDK usage:** Components should call app services or repositories, not raw SDK primitives scattered everywhere.
4. **Enforce backend-side protection:** Use Firestore rules, Supabase RLS, App Check, or server/edge functions for privileged operations.
5. **Connect auth reactively:** Surface auth-session changes into the app store or route guards without duplicating provider logic in each page.

**Instrucciones (ES):**
1. **Inicializar el SDK una sola vez:** Exporta una única instancia inicializada del app o client desde un módulo compartido.
2. **Cargar solo configuración pública:** Las client API keys pueden ser públicas por diseño, pero admin keys y secretos de servicio deben quedarse server-side.
3. **Envolver el uso del SDK:** Los componentes deben llamar servicios o repositorios de la app, no primitivas crudas del SDK por todas partes.
4. **Hacer cumplir la protección en backend:** Usa Firestore rules, Supabase RLS, App Check o server/edge functions para operaciones privilegiadas.
5. **Conectar auth de forma reactiva:** Expón cambios de sesión al store o a los route guards sin duplicar la lógica del provider en cada página.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @11-baas-integration to integrate `{BaaSProvider}` into this {Framework} app.
1. Create a single shared SDK bootstrap and wrap auth/database operations in app services.
2. Keep privileged writes behind rules or server-side functions instead of trusting the UI alone.
```

**Prompt (ES):**
```text
Usa la skill @11-baas-integration para integrar `{BaaSProvider}` en esta app {Framework}.
1. Crea un bootstrap único del SDK compartido y envuelve auth o base de datos en servicios de la app.
2. Mantén las escrituras privilegiadas detrás de rules o funciones server-side en lugar de confiar solo en la UI.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── shared/
│   └── baas/
│       ├── provider.{ext}
│       ├── auth.service.{ext}
│       └── database.repository.{ext}
└── features/
    └── auth/
        └── store/
            └── auth.store.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] The SDK is initialized exactly once.
- [ ] No service keys or admin credentials are exposed to the client bundle.
- [ ] Security rules or server-side functions enforce privileged operations beyond UI checks.

**Checklist (ES):**
- [ ] El SDK se inicializa exactamente una vez.
- [ ] Ninguna service key ni credencial admin se expone al bundle del cliente.
- [ ] Las rules de seguridad o funciones server-side hacen cumplir operaciones privilegiadas más allá de la UI.
