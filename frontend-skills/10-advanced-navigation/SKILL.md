---
name: 10-advanced-navigation
description: "Keeps navigation state in the router while improving the visual navigation shell with breadcrumbs, hero summaries, URL pagination and helper navigation components."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Navigation is part of application state and also part of the user experience. This skill treats the router as the source of truth for breadcrumbs, pagination, filters, and shareable URLs, while also organizing visible navigation helpers such as hero summaries, layout shell consistency, and back-to-top affordances.

**Descripción (ES):**
La navegación también es estado de la aplicación y parte de la experiencia visual. Esta skill trata al router como la fuente de verdad para breadcrumbs, paginación, filtros y URLs compartibles, y además organiza ayudas visibles de navegación como hero summaries, consistencia del layout shell y componentes de retorno rápido.

---

# 2. Skill Objective

**Objective (EN):**
Build navigation patterns that survive reloads, preserve history, and remain visually clear for users.
- Use this skill when: Implementing breadcrumbs, URL pagination, search params, list-detail flows, or visual navigation improvements around the app shell.
- Do not use this skill when: A page has no navigational state beyond a static route.

**Objetivo (ES):**
Construir patrones de navegación que sobrevivan recargas, preserven historial y sigan siendo visualmente claros para usuarios.
- Úsese cuando: Se implementen breadcrumbs, paginación por URL, search params, flujos lista-detalle o mejoras visuales alrededor del shell de navegación.
- No se use cuando: Una página no tenga estado de navegación más allá de una ruta estática.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Route Tree`: Layouts, nested routes, and route metadata.
2. `URL State`: Pagination, filters, tabs, or sort encoded in query params.
3. `Page Context`: Summary metrics or hero information derived from the current route.

**Entradas (ES):**
1. `Route Tree`: Layouts, rutas anidadas y metadata de rutas.
2. `URL State`: Paginación, filtros, tabs o sort codificados en query params.
3. `Page Context`: Métricas resumen o hero info derivadas de la ruta actual.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Breadcrumb components or helpers derived from routing data.
2. URL-driven pagination and filtering behavior.
3. Hero or summary components synchronized with the active route.
4. Predictable navigation history and reload behavior.
5. Optional helper components such as back-to-top or layout shell adjustments when the page requires them.

**Salidas (ES):**
1. Componentes o helpers de breadcrumbs derivados del routing.
2. Comportamiento de paginación y filtros guiado por URL.
3. Componentes hero o resúmenes sincronizados con la ruta activa.
4. Historial de navegación y recarga predecibles.
5. Componentes auxiliares opcionales como back-to-top o ajustes del shell visual cuando la página los necesite.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Derive breadcrumbs from the router:** Use route metadata or matched segments instead of hardcoding labels in every page.
2. **Keep list state in the URL:** Put `page`, `sort`, `search`, and relevant filters in query params so links are shareable and reload-safe.
3. **Read URL state before fetching:** Components or loaders should parse route params first, then request data using that state.
4. **Preserve browser history intentionally:** Use push vs replace carefully so pagination and filtering behave naturally with back/forward navigation.
5. **Keep summaries synced to route state:** Hero headers, counts, or pills should reflect the active route and query params, not stale local assumptions.
6. **Stabilize the visual shell:** Keep navbar, drawer, footer, and route outlet layout coherent so loading states or empty pages do not collapse the overall page structure.
7. **Add helper navigation components when justified:** Use back-to-top buttons, contextual hero blocks, or persistent navigation helpers only when they improve long-page usability.

**Instrucciones (ES):**
1. **Derivar breadcrumbs desde el router:** Usa metadata de rutas o segmentos resueltos en lugar de hardcodear etiquetas en cada página.
2. **Mantener el estado de lista en la URL:** Lleva `page`, `sort`, `search` y filtros relevantes a query params para que los links sean compartibles y resistentes a recargas.
3. **Leer el estado URL antes de pedir datos:** Componentes o loaders deben parsear params primero y luego consultar datos con ese estado.
4. **Preservar historial con intención:** Usa push o replace con cuidado para que paginación y filtros se comporten natural con back/forward.
5. **Sincronizar resúmenes con la ruta:** Hero headers, contadores o pills deben reflejar la ruta activa y los query params, no supuestos locales obsoletos.
6. **Estabilizar el shell visual:** Mantén navbar, drawer, footer y layout del router coherentes para que los estados de carga o vacíos no colapsen la estructura general.
7. **Agregar ayudas de navegación cuando estén justificadas:** Usa back-to-top, bloques hero contextuales o ayudas persistentes solo cuando mejoren la usabilidad de páginas largas.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @10-advanced-navigation to make the `{FeatureName}` routes URL-driven.
1. Derive breadcrumbs from route metadata and matched segments.
2. Move pagination and filters into query parameters so the view survives reloads and shared links.
3. Add hero summaries or helper navigation components if the page needs stronger orientation.
```

**Prompt (ES):**
```text
Usa la skill @10-advanced-navigation para volver las rutas de `{FeatureName}` guiadas por URL.
1. Deriva breadcrumbs desde metadata de rutas y segmentos resueltos.
2. Mueve paginación y filtros a query parameters para que la vista sobreviva recargas y links compartidos.
3. Agrega resúmenes hero o ayudas visuales de navegación si la página necesita mejor orientación.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── app/
│   └── router/
│       ├── routes.{ext}
│       └── breadcrumb-map.{ext}
└── features/
    └── {FeatureName}/
        ├── components/
        │   ├── Breadcrumbs.{ext}
        │   ├── HeroSummary.{ext}
        │   └── Pagination.{ext}
        └── views/
            └── {FeatureName}List.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Reloading the page preserves pagination and filter state from the URL.
- [ ] Breadcrumb labels come from routing data instead of duplicated local constants.
- [ ] Back and forward navigation behave predictably after changing query params.
- [ ] Hero summaries and helper navigation components stay synchronized with the current route.
- [ ] The layout shell remains visually stable during loading and empty states.

**Checklist (ES):**
- [ ] Recargar la página preserva el estado de paginación y filtros desde la URL.
- [ ] Las etiquetas de breadcrumbs provienen del routing y no de constantes duplicadas locales.
- [ ] La navegación back y forward se comporta de forma predecible tras cambiar query params.
- [ ] Los resúmenes hero y ayudas de navegación permanecen sincronizados con la ruta actual.
- [ ] El shell visual se mantiene estable durante estados de carga o vacíos.
