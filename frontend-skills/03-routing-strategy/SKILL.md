---
name: 03-routing-strategy
description: "Defines a portable routing strategy with layouts, lazy loading, nested routes and predictable fallback handling."
risk: medium
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Routing is the structural backbone of a frontend application. This skill organizes route trees, layouts, dynamic segments, lazy loading, and fallback screens so navigation remains scalable and understandable across frameworks.

**Descripción (ES):**
El routing es la columna estructural de una aplicación frontend. Esta skill organiza árboles de rutas, layouts, segmentos dinámicos, lazy loading y pantallas fallback para que la navegación escale y siga siendo entendible entre frameworks.

---

# 2. Skill Objective

**Objective (EN):**
Design a route system that separates public and private areas while keeping performance and maintainability under control.
- Use this skill when: The application has multiple pages, nested layouts, or route-level code splitting.
- Do not use this skill when: A small widget or modal has no standalone navigation model.

**Objetivo (ES):**
Diseñar un sistema de rutas que separe áreas públicas y privadas mientras mantiene rendimiento y mantenibilidad bajo control.
- Úsese cuando: La aplicación tenga múltiples páginas, layouts anidados o code splitting por ruta.
- No se use cuando: Un widget pequeño o modal no tenga un modelo de navegación propio.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Router Mechanism`: Framework router, file-based router, or equivalent navigation layer.
2. `Route Tree`: Public pages, protected pages, dynamic detail routes, and error views.
3. `Layout Needs`: Shells such as app layout, auth layout, dashboard layout, or public layout.

**Entradas (ES):**
1. `Router Mechanism`: Router del framework, file-based router o capa equivalente de navegación.
2. `Route Tree`: Páginas públicas, protegidas, rutas dinámicas de detalle y vistas de error.
3. `Layout Needs`: Shells como app layout, auth layout, dashboard layout o public layout.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A structured route definition with nested layouts.
2. Lazy-loaded pages or route modules where appropriate.
3. Deterministic fallback behavior for unknown paths.

**Salidas (ES):**
1. Una definición de rutas estructurada con layouts anidados.
2. Páginas o módulos lazy-loaded cuando corresponda.
3. Comportamiento fallback determinista para rutas desconocidas.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Map the route tree first:** Identify public, protected, detail, and fallback routes before writing code.
2. **Group routes by layout:** Place routes under the shell that owns the shared navigation and page frame.
3. **Lazy-load route boundaries:** Split large pages or modules at route boundaries to reduce initial bundle cost.
4. **Support dynamic segments intentionally:** Keep route params explicit and aligned with feature needs.
5. **Add a final fallback route:** Unknown paths should land on a consistent not-found view instead of a blank screen.

**Instrucciones (ES):**
1. **Mapear primero el árbol de rutas:** Identifica rutas públicas, protegidas, de detalle y fallback antes de escribir código.
2. **Agrupar rutas por layout:** Coloca cada ruta bajo el shell que posee la navegación compartida y el marco visual correspondiente.
3. **Aplicar lazy loading en límites de ruta:** Divide páginas o módulos grandes en fronteras de ruta para reducir el costo del bundle inicial.
4. **Soportar segmentos dinámicos con intención:** Mantén los params explícitos y alineados con las necesidades del feature.
5. **Agregar una ruta fallback final:** Las rutas desconocidas deben aterrizar en una vista consistente de no encontrado y no en una pantalla en blanco.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @03-routing-strategy to organize navigation in this {Framework} app.
1. Separate public and private routes under their corresponding layouts.
2. Apply lazy loading and a final not-found route so navigation stays scalable and safe.
```

**Prompt (ES):**
```text
Usa la skill @03-routing-strategy para organizar la navegación de esta app {Framework}.
1. Separa las rutas públicas y privadas bajo sus layouts correspondientes.
2. Aplica lazy loading y una ruta final de no encontrado para que la navegación sea escalable y segura.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
├── app/
│   └── router/
│       └── routes.{ext}
├── shared/
│   └── layouts/
│       ├── AppLayout.{ext}
│       └── AuthLayout.{ext}
└── features/
    └── {FeatureName}/
        └── routes.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Public and protected areas are grouped under clear layouts.
- [ ] Route-level lazy loading is used where it meaningfully reduces initial load cost.
- [ ] Unknown paths resolve to a predictable not-found experience.

**Checklist (ES):**
- [ ] Las áreas públicas y protegidas están agrupadas bajo layouts claros.
- [ ] El lazy loading por ruta se usa donde realmente reduce el costo de carga inicial.
- [ ] Las rutas desconocidas resuelven una experiencia consistente de no encontrado.
