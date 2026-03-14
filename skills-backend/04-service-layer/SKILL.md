---
name: 04-service-layer
description: "Moves business rules out of controllers into services so HTTP handling stays thin, testable and framework-agnostic."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Controllers should handle transport concerns, not business decisions. This skill defines a service layer where validations, workflows, calculations, and orchestration live independently from HTTP details.

**Descripción (ES):**
Los controladores deben manejar transporte, no decisiones de negocio. Esta skill define una capa de servicios donde viven validaciones, flujos, cálculos y orquestación de forma independiente a los detalles HTTP.

---

# 2. Skill Objective

**Objective (EN):**
Create services that encapsulate business logic and remain reusable across controllers, jobs, and tests.
- Use this skill when: Logic is growing beyond simple request parsing, or multiple endpoints share the same workflow.
- Do not use this skill when: The change is limited to static routing metadata with no business behavior.

**Objetivo (ES):**
Crear servicios que encapsulen lógica de negocio y puedan reutilizarse entre controladores, jobs y pruebas.
- Úsese cuando: La lógica crece más allá del parseo de requests o varios endpoints comparten el mismo flujo.
- No se use cuando: El cambio se limita a metadatos de rutas sin comportamiento de negocio.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Use Case`: The business action to implement, such as creating an order or approving a payment.
2. `Dependencies`: Repositories, gateways, queues, caches, or external services required by the flow.
3. `Domain Rules`: Validations, invariants, permissions, and calculations.

**Entradas (ES):**
1. `Use Case`: Acción de negocio a implementar, como crear una orden o aprobar un pago.
2. `Dependencies`: Repositorios, gateways, colas, cachés o servicios externos requeridos por el flujo.
3. `Domain Rules`: Validaciones, invariantes, permisos y cálculos.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A service class or module with clear methods per use case.
2. Thin controllers that delegate work and only map HTTP input/output.
3. Testable business rules decoupled from request/response objects.

**Salidas (ES):**
1. Una clase o módulo de servicio con métodos claros por caso de uso.
2. Controladores delgados que delegan el trabajo y solo traducen entrada/salida HTTP.
3. Reglas de negocio testeables y desacopladas de `request` y `response`.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Keep controllers thin:** Parse path/query/body input, call the service, and map the result to HTTP.
2. **Inject dependencies into the service:** Repositories and external clients should be constructor-injected or framework-injected, never instantiated ad hoc inside methods.
3. **Centralize business rules:** Place validations, calculations, conditional flows, and orchestration in the service.
4. **Raise domain-level errors:** Throw meaningful exceptions that can later be translated by the global error layer.
5. **Design for reuse:** A service method should be callable from an HTTP controller, a queue consumer, or a scheduled job without needing web objects.

**Instrucciones (ES):**
1. **Mantener controladores delgados:** Parsear `path/query/body`, llamar al servicio y mapear el resultado a HTTP.
2. **Inyectar dependencias en el servicio:** Repositorios y clientes externos deben inyectarse, nunca crearse de forma improvisada dentro del método.
3. **Centralizar reglas de negocio:** Coloca validaciones, cálculos, flujos condicionales y orquestación en el servicio.
4. **Lanzar errores de dominio:** Usa excepciones significativas que luego puedan traducirse en la capa global de errores.
5. **Diseñar para reutilizar:** Un método de servicio debe poder llamarse desde HTTP, colas o tareas programadas sin depender de objetos web.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @04-service-layer to implement the `{UseCase}` workflow.
1. Keep the controller limited to HTTP mapping.
2. Move validations, calculations and dependency orchestration into a reusable service method.
```

**Prompt (ES):**
```text
Usa la skill @04-service-layer para implementar el flujo `{UseCase}`.
1. Deja el controlador limitado al mapeo HTTP.
2. Mueve validaciones, cálculos y orquestación de dependencias a un método reutilizable del servicio.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    └── {feature}/
        ├── dto/
        ├── {feature}.controller.{ext}
        ├── {feature}.service.{ext}
        ├── {feature}.repository.{ext}
        └── {feature}.spec.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Controllers do not contain business calculations or persistence logic.
- [ ] Services accept plain arguments or DTOs, not raw web framework objects.
- [ ] The main use case can be unit-tested without booting an HTTP server.

**Checklist (ES):**
- [ ] Los controladores no contienen cálculos de negocio ni lógica de persistencia.
- [ ] Los servicios reciben argumentos planos o DTOs, no objetos crudos del framework web.
- [ ] El caso de uso principal puede probarse sin levantar un servidor HTTP.
