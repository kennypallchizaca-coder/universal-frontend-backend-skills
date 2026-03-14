---
name: 04-form-orchestration
description: "Structures controlled or reactive forms with schema validation, state tracking and safe submission behavior."
risk: medium
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Forms are one of the main entry points for user data. This skill standardizes how to collect input, validate it, show field-level feedback, and prevent duplicate or malformed submissions across frontend frameworks.

**Descripción (ES):**
Los formularios son una de las principales puertas de entrada de datos del usuario. Esta skill estandariza cómo recoger input, validarlo, mostrar feedback por campo y prevenir envíos duplicados o malformados entre frameworks frontend.

---

# 2. Skill Objective

**Objective (EN):**
Build reliable forms that keep validation, submission state, and rendering in sync.
- Use this skill when: Implementing login forms, CRUD forms, settings forms, or any multi-field submit flow.
- Do not use this skill when: A simple one-field search input can stay as lightweight local state.

**Objetivo (ES):**
Construir formularios confiables que mantengan sincronizados validación, estado de envío y render.
- Úsese cuando: Se implementen formularios de login, CRUD, settings o cualquier flujo de envío con varios campos.
- No se use cuando: Un input simple de búsqueda pueda quedarse como estado local liviano.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Form Engine`: Native reactive bindings, controlled inputs, or the project's chosen form abstraction.
2. `Validation Schema`: Native validators, a schema layer, or an equivalent validation contract supported by the stack.
3. `Submission Flow`: The API or action that receives the final payload.

**Entradas (ES):**
1. `Form Engine`: Bindings reactivos nativos, inputs controlados o la abstraccion de formularios elegida por el proyecto.
2. `Validation Schema`: Validadores nativos, una capa de esquemas o un contrato equivalente soportado por el stack.
3. `Submission Flow`: La API o acción que recibe el payload final.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A controlled or reactive form component.
2. Validation logic separated from raw DOM access.
3. Predictable submit-lock behavior and field-level error rendering.

**Salidas (ES):**
1. Un componente de formulario controlado o reactivo.
2. Lógica de validación separada del acceso crudo al DOM.
3. Comportamiento predecible de bloqueo durante submit y renderizado de errores por campo.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Model the form schema:** Define the allowed fields, defaults, and validation rules before wiring inputs.
2. **Bind inputs through the form engine:** Avoid reading values manually from the DOM when the framework offers reactive or controlled bindings.
3. **Track field and submit state:** Support concepts such as touched, dirty, invalid, and submitting when the stack provides them.
4. **Show validation close to the field:** Keep input errors near their source and reserve global alerts for submit-level failures.
5. **Prevent duplicate submits:** Disable or guard the submit action while the request is in flight.

**Instrucciones (ES):**
1. **Modelar el esquema del formulario:** Define campos permitidos, valores por defecto y reglas de validación antes de conectar inputs.
2. **Enlazar inputs mediante el form engine:** Evita leer valores manualmente del DOM cuando el framework ofrece bindings reactivos o controlados.
3. **Rastrear estado de campos y submit:** Soporta conceptos como touched, dirty, invalid y submitting cuando el stack los ofrezca.
4. **Mostrar validación cerca del campo:** Mantén los errores de input junto a su origen y deja las alertas globales para fallos de submit.
5. **Prevenir submits duplicados:** Deshabilita o protege la acción de envío mientras la request siga en curso.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @04-form-orchestration to implement the `{UseCase}` form in this {Framework} app.
1. Define a validation schema and bind the inputs through the framework's form engine.
2. Show field-level errors and lock the submit action while the payload is being sent.
```

**Prompt (ES):**
```text
Usa la skill @04-form-orchestration para implementar el formulario `{UseCase}` en esta app {Framework}.
1. Define un esquema de validación y enlaza los inputs mediante el motor de formularios del framework.
2. Muestra errores por campo y bloquea el submit mientras se envía el payload.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── features/
    └── {FeatureName}/
        ├── components/
        │   └── {FeatureName}Form.{ext}
        └── validation/
            └── {feature}.schema.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Form values are not read through ad-hoc DOM queries.
- [ ] Validation rules are centralized and reusable.
- [ ] The submit action is guarded against duplicate requests.

**Checklist (ES):**
- [ ] Los valores del formulario no se leen mediante consultas DOM improvisadas.
- [ ] Las reglas de validación están centralizadas y son reutilizables.
- [ ] La acción de submit está protegida contra requests duplicadas.
