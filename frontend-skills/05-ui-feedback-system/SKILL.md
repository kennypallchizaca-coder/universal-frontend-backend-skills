---
name: 05-ui-feedback-system
description: "Standardizes toasts, loading states and confirmation dialogs so UI feedback stays consistent across the application."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Users need clear feedback when something is loading, succeeds, fails, or requires confirmation. This skill centralizes those signals so the app does not reinvent notification and dialog behavior on every page.

**Descripción (ES):**
Los usuarios necesitan feedback claro cuando algo está cargando, sale bien, falla o requiere confirmación. Esta skill centraliza esas señales para que la app no reinvente notificaciones y diálogos en cada página.

---

# 2. Skill Objective

**Objective (EN):**
Build a shared feedback layer for transient notifications, blocking confirmations, and loading communication.
- Use this skill when: The app performs async operations that need visible success, error, warning, or confirmation feedback.
- Do not use this skill when: The issue is a field-level validation error that belongs inside the form itself.

**Objetivo (ES):**
Construir una capa compartida de feedback para notificaciones transitorias, confirmaciones bloqueantes y comunicación de carga.
- Úsese cuando: La app ejecute operaciones asíncronas que necesiten feedback visible de éxito, error, advertencia o confirmación.
- No se use cuando: El problema sea un error de validación por campo que deba vivir dentro del formulario.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Feedback Channel`: Toast system, alert system, modal/dialog layer, or global loading indicator.
2. `Trigger Source`: Components, repositories, interceptors, or shared services.
3. `Visual Strategy`: Framework UI library, custom CSS system, or design-system components.

**Entradas (ES):**
1. `Feedback Channel`: Sistema de toasts, alertas, modales o indicador global de carga.
2. `Trigger Source`: Componentes, repositorios, interceptores o servicios compartidos.
3. `Visual Strategy`: Librería UI del framework, sistema CSS propio o componentes del design system.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A global feedback container mounted near the app shell.
2. Simple service or store APIs to trigger toasts and dialogs.
3. Reusable confirmation and loading patterns.

**Salidas (ES):**
1. Un contenedor global de feedback montado cerca del shell de la app.
2. APIs simples vía servicio o store para disparar toasts y diálogos.
3. Patrones reutilizables de confirmación y estados de carga.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Create one shared feedback entry point:** Mount toast and dialog containers near the top-level app layout.
2. **Expose simple trigger APIs:** Use calls such as `notify.success`, `notify.error`, or `confirm.open`.
3. **Differentiate transient and blocking feedback:** Toasts should be lightweight; destructive actions should use explicit confirmation dialogs.
4. **Handle loading visibly:** Use spinners, skeletons, or progress indicators where the wait matters to the user.
5. **Clean up automatically:** Toast timeouts and dialog lifecycle should not leak listeners or stale state.

**Instrucciones (ES):**
1. **Crear un punto compartido de feedback:** Monta contenedores de toast y diálogo cerca del layout principal de la app.
2. **Exponer APIs simples para dispararlos:** Usa llamadas como `notify.success`, `notify.error` o `confirm.open`.
3. **Diferenciar feedback transitorio y bloqueante:** Los toasts deben ser livianos; las acciones destructivas deben usar diálogos de confirmación explícitos.
4. **Hacer visible la carga:** Usa spinners, skeletons o indicadores de progreso donde la espera sea relevante para el usuario.
5. **Limpiar automáticamente:** Los timeouts de toast y el ciclo de vida de diálogos no deben dejar listeners o estado obsoleto.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @05-ui-feedback-system to standardize feedback in this {Framework} app.
1. Add a shared toast and confirmation layer near the main app shell.
2. Expose simple helper APIs so features can show success, error, and destructive-action confirmations consistently.
```

**Prompt (ES):**
```text
Usa la skill @05-ui-feedback-system para estandarizar el feedback en esta app {Framework}.
1. Agrega una capa compartida de toasts y confirmaciones cerca del shell principal.
2. Expón helpers simples para que los features muestren éxito, error y confirmaciones destructivas de forma consistente.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── shared/
    ├── components/
    │   └── feedback/
    │       ├── ToastContainer.{ext}
    │       ├── ConfirmDialog.{ext}
    │       └── LoadingState.{ext}
    └── services/ or stores/
        └── notification.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Async success and error states surface through a shared feedback system.
- [ ] Destructive actions require explicit confirmation.
- [ ] Toast and dialog lifecycle handling does not leak stale state or timers.

**Checklist (ES):**
- [ ] Los estados asíncronos de éxito y error se muestran mediante un sistema compartido de feedback.
- [ ] Las acciones destructivas requieren confirmación explícita.
- [ ] El ciclo de vida de toasts y diálogos no deja timers ni estado obsoleto.
