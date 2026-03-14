---
name: 08-state-management
description: "Defines focused global state patterns that keep UI state, session state and server state clearly separated."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Global state becomes dangerous when it turns into a dumping ground. This skill defines how to keep client state small, explicit, and framework-appropriate while separating server cache, UI state, and session state.

**Descripción (ES):**
El estado global se vuelve peligroso cuando se convierte en un basurero. Esta skill define cómo mantener el state del cliente pequeño, explícito y apropiado para cada framework, separando caché del servidor, estado UI y estado de sesión.

---

# 2. Skill Objective

**Objective (EN):**
Build small, intentional stores instead of one oversized global state container.
- Use this skill when: Multiple pages share UI/session state, or local prop drilling is becoming noisy.
- Do not use this skill when: The data belongs to a single component subtree and can stay local.
- Security note: Do not persist sensitive tokens in browser storage by default. Keep session truth in secure cookies or controlled memory when possible.

**Objetivo (ES):**
Construir stores pequeños e intencionales en lugar de un contenedor global gigantesco.
- Úsese cuando: Varias páginas compartan estado de UI o sesión, o el prop drilling local ya genere ruido.
- No se use cuando: Los datos pertenezcan a un solo subárbol de componentes y puedan seguir locales.
- Nota de seguridad: No persistas tokens sensibles en almacenamiento del navegador por defecto. Mantén la verdad de la sesión en cookies seguras o memoria controlada cuando sea posible.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Shared State Types`: Session state, theme, UI preferences, wizard state, or feature filters.
2. `Shared State Mechanism`: Store, signal, service, reducer, or another explicit shared-state abstraction.
3. `Server Cache Strategy`: Query layer, resource API, repository cache, or another remote-data coordination mechanism.

**Entradas (ES):**
1. `Shared State Types`: Sesión, tema, preferencias UI, wizard state o filtros de features.
2. `Shared State Mechanism`: Store, signal, servicio, reducer u otra abstraccion explicita de estado compartido.
3. `Server Cache Strategy`: Capa de query, resource API, cache a nivel de repositorio u otro mecanismo para coordinar datos remotos.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. One or more small stores with typed state and intent-based actions.
2. Clear separation between global client state and server-fetched data.
3. Predictable hydration or bootstrap logic for shared state.

**Salidas (ES):**
1. Uno o varios stores pequeños con estado tipado y acciones orientadas a intención.
2. Separación clara entre state global del cliente y datos obtenidos del servidor.
3. Lógica predecible de hidratación o bootstrap del estado compartido.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Split state by concern:** Keep auth, theme, and feature UI state in separate stores unless they genuinely belong together.
2. **Prefer actions over direct mutation:** Expose methods such as `setSession`, `setFilters`, or `resetDraft` instead of leaking raw write access everywhere.
3. **Keep server data out of the store unless necessary:** Prefer query/resource libraries for remote cache and use stores for client-owned state.
4. **Hydrate intentionally:** Rebuild store state from safe sources such as cookies, `/me`, URL params, or documented persisted preferences.
5. **Document persistence rules:** Only persist what the app truly needs across reloads, and never persist secrets casually.

**Instrucciones (ES):**
1. **Separar el estado por responsabilidad:** Mantén auth, tema y estado UI de features en stores distintos salvo que realmente pertenezcan juntos.
2. **Preferir acciones sobre mutación directa:** Expón métodos como `setSession`, `setFilters` o `resetDraft` en vez de filtrar escritura cruda a cualquier lado.
3. **Dejar fuera los datos del servidor salvo que haga falta:** Prefiere librerías de query o resources para caché remota y usa stores para estado propiedad del cliente.
4. **Hidratar con intención:** Reconstruye el state desde fuentes seguras como cookies, `/me`, URL params o preferencias persistidas documentadas.
5. **Documentar reglas de persistencia:** Persiste solo lo que la app necesita entre recargas y nunca secretos de forma casual.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @08-state-management to structure shared state in this {Framework} app.
1. Split session, theme and feature UI state into focused stores with typed actions.
2. Keep remote API data in query/resource layers unless a real client-owned cache is required.
```

**Prompt (ES):**
```text
Usa la skill @08-state-management para estructurar el estado compartido de esta app {Framework}.
1. Separa sesión, tema y estado UI de features en stores enfocados con acciones tipadas.
2. Mantén los datos remotos en capas query o resource salvo que exista una necesidad real de caché del lado cliente.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── shared/
│   └── stores/
│       ├── auth.store.{ext}
│       ├── ui.store.{ext}
│       └── preferences.store.{ext}
└── features/
    └── {FeatureName}/
        └── state/
            └── {feature}.filters.store.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Each store has a narrow responsibility and explicit actions.
- [ ] Remote API cache is not mixed blindly into client UI state.
- [ ] Sensitive session data is not persisted in browser storage by default.

**Checklist (ES):**
- [ ] Cada store tiene una responsabilidad estrecha y acciones explícitas.
- [ ] La caché remota de API no se mezcla a ciegas con el estado UI del cliente.
- [ ] Los datos sensibles de sesión no se persisten por defecto en almacenamiento del navegador.
