---
name: 02-component-architecture
description: "Separates container logic from presentational UI so frontend features stay testable, reusable and framework-agnostic."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Frontend components become hard to maintain when data fetching, state orchestration, and rendering all live in the same file. This skill organizes features into container and presentational layers so UI remains reusable and behavior stays easier to test.

**Descripción (ES):**
Los componentes frontend se vuelven difíciles de mantener cuando la carga de datos, la orquestación del estado y el render viven en el mismo archivo. Esta skill organiza los features en capas contenedoras y presentacionales para que la UI sea reutilizable y el comportamiento resulte más fácil de probar.

---

# 2. Skill Objective

**Objective (EN):**
Build components with clear separation between visual rendering and feature logic.
- Use this skill when: A view coordinates API calls, store reads, derived state, or non-trivial user interactions.
- Do not use this skill when: A tiny purely visual component already has no business logic to extract.

**Objetivo (ES):**
Construir componentes con una separación clara entre render visual y lógica del feature.
- Úsese cuando: Una vista coordine llamadas API, lecturas de store, estado derivado o interacciones no triviales.
- No se use cuando: Un componente pequeño y puramente visual ya no tenga lógica de negocio para extraer.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Feature Domain`: The business area, such as invoices, users, or products.
2. `State Sources`: Repository calls, route params, local state, or global store reads.
3. `UI Contract`: Props, inputs, emitted events, slots, or callbacks required by the visual layer.

**Entradas (ES):**
1. `Feature Domain`: El área del negocio, como invoices, users o products.
2. `State Sources`: Llamadas a repositorios, route params, estado local o lecturas del store global.
3. `UI Contract`: Props, inputs, eventos emitidos, slots o callbacks que requiere la capa visual.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Container or smart components responsible for orchestration.
2. Presentational or dumb components focused on rendering and user interaction.
3. A cleaner feature boundary that is easier to test and refactor.

**Salidas (ES):**
1. Componentes contenedores o smart responsables de la orquestación.
2. Componentes presentacionales o dumb enfocados en render y en interacciones de usuario.
3. Un límite de feature más limpio, más fácil de probar y refactorizar.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Move orchestration upward:** Let the top-level feature view read repositories, route state, or stores.
2. **Keep presentational components transport-agnostic:** They should not know how data was fetched or where it came from.
3. **Pass explicit contracts downward:** Use typed props, inputs, slots, or callbacks instead of hidden shared state.
4. **Return interactions upward:** Emit events or callbacks such as `onEdit`, `onDelete`, or `submit`.
5. **Test UI in isolation:** Presentational components should render correctly with mock data and no server dependency.

**Instrucciones (ES):**
1. **Subir la orquestación hacia arriba:** Deja que la vista principal del feature lea repositorios, estado de ruta o stores.
2. **Mantener los componentes presentacionales agnósticos al transporte:** No deberían saber cómo se obtuvo la data ni de dónde vino.
3. **Pasar contratos explícitos hacia abajo:** Usa props, inputs, slots o callbacks tipados en lugar de estado compartido oculto.
4. **Subir interacciones hacia arriba:** Emite eventos o callbacks como `onEdit`, `onDelete` o `submit`.
5. **Probar la UI en aislamiento:** Los componentes presentacionales deben renderizar correctamente con mocks y sin dependencia del servidor.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @02-component-architecture to split `{FeatureName}` into container and presentational layers.
1. Keep data loading and state orchestration in the feature view.
2. Move reusable UI rendering into a pure presentational component with an explicit contract.
```

**Prompt (ES):**
```text
Usa la skill @02-component-architecture para dividir `{FeatureName}` en capas contenedoras y presentacionales.
1. Mantén la carga de datos y la orquestación del estado en la vista del feature.
2. Mueve el render reutilizable de UI a un componente presentacional puro con contrato explícito.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── features/
    └── {FeatureName}/
        ├── views/
        │   └── {FeatureName}View.{ext}
        ├── components/
        │   └── {FeatureName}Table.{ext}
        └── api/ or services/
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Presentational components do not fetch data or depend on transport libraries.
- [ ] Container components own repository calls, route parsing, and feature orchestration.
- [ ] Visual components can be rendered with mocks in isolation.

**Checklist (ES):**
- [ ] Los componentes presentacionales no consumen datos ni dependen de librerías de transporte.
- [ ] Los componentes contenedores controlan las llamadas a repositorios, el parseo de rutas y la orquestación del feature.
- [ ] Los componentes visuales pueden renderizarse con mocks en aislamiento.
