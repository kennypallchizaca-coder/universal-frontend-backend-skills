---
name: 07-styling-system
description: "Defines a scalable styling system with design tokens, scoped component styles and a predictable theming strategy."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Styling becomes expensive when colors, spacing, and component rules are duplicated everywhere. This skill creates a stable design-token layer plus component-level scoping so the UI can grow without CSS collisions or inconsistent theming.

**Descripción (ES):**
El styling se vuelve costoso cuando colores, espaciados y reglas de componentes se duplican por todas partes. Esta skill crea una capa estable de design tokens más un alcance local por componente para que la UI crezca sin choques CSS ni theming inconsistente.

---

# 2. Skill Objective

**Objective (EN):**
Establish a styling architecture that is reusable, themeable, and easy to maintain.
- Use this skill when: Starting a frontend design system, cleaning a messy stylesheet layer, or adding light/dark themes.
- Do not use this skill when: You only need a one-off page tweak inside an already consistent design system.

**Objetivo (ES):**
Establecer una arquitectura de estilos reutilizable, tematizable y fácil de mantener.
- Úsese cuando: Se inicie un design system frontend, se limpie una capa CSS caótica o se agreguen temas light/dark.
- No se use cuando: Solo se necesite un ajuste puntual dentro de un sistema visual ya consistente.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Design Tokens`: Color palette, spacing, radius, typography, elevation.
2. `Styling Strategy`: CSS Modules, Tailwind, scoped CSS, styled APIs, or framework-native styles.
3. `Theme Requirements`: Light/dark mode, brand themes, or accessibility constraints.

**Entradas (ES):**
1. `Design Tokens`: Paleta de colores, spacing, radius, tipografía y elevación.
2. `Styling Strategy`: CSS Modules, Tailwind, scoped CSS, APIs styled o estilos nativos del framework.
3. `Theme Requirements`: Light/dark mode, temas de marca o restricciones de accesibilidad.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A root token layer (`:root`, config theme, or equivalent).
2. A documented theme-switch strategy.
3. Scoped component styles that avoid global leakage.

**Salidas (ES):**
1. Una capa raíz de tokens (`:root`, config theme o equivalente).
2. Una estrategia documentada para el cambio de tema.
3. Estilos de componente con alcance local que eviten filtraciones globales.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Define tokens first:** Centralize colors, spacing, typography, radius, and shadows before styling individual screens.
2. **Separate global from local:** Keep reset, body defaults, and tokens global; keep component rules local or namespaced.
3. **Design theme switching explicitly:** Use CSS variables, data attributes, or framework theme providers instead of hardcoding duplicate color values.
4. **Favor semantic naming:** Use tokens such as `--color-surface` or `--spacing-md` instead of arbitrary literals spread across files.
5. **Audit accessibility:** Verify contrast, focus states, and reduced-motion behavior when the theme system changes.

**Instrucciones (ES):**
1. **Definir tokens primero:** Centraliza colores, spacing, tipografía, radius y sombras antes de estilizar pantallas individuales.
2. **Separar global de local:** Deja reset, defaults del body y tokens como globales; deja reglas de componentes como locales o namespaced.
3. **Diseñar el cambio de tema de forma explícita:** Usa variables CSS, `data-theme` o providers del framework en lugar de duplicar valores de color.
4. **Favorecer nombres semánticos:** Usa tokens como `--color-surface` o `--spacing-md` en vez de literales sueltos repartidos por archivos.
5. **Auditar accesibilidad:** Verifica contraste, estados de foco y reduced motion cuando cambie el sistema de tema.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @07-styling-system to organize the visual foundation of this {Framework} project.
1. Create a token layer for color, spacing, typography and elevation.
2. Keep global reset/theme rules separate from local component styles.
```

**Prompt (ES):**
```text
Usa la skill @07-styling-system para organizar la base visual de este proyecto {Framework}.
1. Crea una capa de tokens para color, spacing, tipografía y elevación.
2. Mantén separadas las reglas globales de reset o tema y los estilos locales de componentes.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── styles/
│   ├── tokens.{css|ts}
│   ├── theme.{css|ts}
│   └── reset.{css}
└── components/
    └── {ComponentName}/
        ├── {ComponentName}.{ext}
        └── {ComponentName}.module.css or {ComponentName}.styles.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Tokens are defined once and reused across the app.
- [ ] Component styles do not leak unintentionally into unrelated screens.
- [ ] Theme changes preserve contrast and interaction accessibility.

**Checklist (ES):**
- [ ] Los tokens se definen una sola vez y se reutilizan en toda la app.
- [ ] Los estilos de componentes no se filtran accidentalmente a pantallas no relacionadas.
- [ ] Los cambios de tema conservan contraste y accesibilidad de interacción.
