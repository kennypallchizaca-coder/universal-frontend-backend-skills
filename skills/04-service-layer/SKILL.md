---
name: service-layer
description: "Implementa una capa de servicios que centraliza toda la lógica de negocio del sistema, desacoplada de los controladores HTTP y del acceso a datos. Independiente del lenguaje, framework y lógica de negocio del proyecto."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# Service Layer

**Descripción:** Implementa una capa de servicios que centraliza toda la lógica de negocio del sistema, desacoplada de los controladores HTTP y del acceso a datos. El servicio es la única capa que toma decisiones de dominio, aplica reglas de negocio y lanza excepciones tipadas cuando una operación no puede completarse.

## Objetivo

Garantizar que la lógica de negocio vive en un único lugar, puede testearse de forma aislada sin levantar servidor ni base de datos, y puede reutilizarse desde cualquier punto de entrada (HTTP, CLI, tareas programadas, colas de mensajes).

## Use this skill when

- Un controlador contiene más que enrutamiento y formateo de respuesta
- Necesitas implementar reglas de negocio, validaciones cruzadas o flujos complejos
- Quieres testear lógica de negocio de forma aislada con mocks
- Una operación debe ser accesible desde múltiples puntos de entrada (HTTP, CLI, queue)

## Do not use this skill when

- La lógica requerida es solo una consulta a BD sin decisiones de negocio (igual úsalo, pero será delgado)
- Estás construyendo solo el frontend sin servidor propio
- La operación es un script de uso único sin reglas de dominio

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| DTO de entrada | ✅ | Datos validados provenientes del controlador |
| Repositorios inyectados | ✅ | Inyectados por constructor — nunca instanciados dentro del servicio |
| Contexto del usuario | ❌ | ID, roles (cuando se requiere seguridad — Skills 10-11) |
| Servicios externos | ❌ | Si la operación cruza múltiples dominios |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| DTO de respuesta | Datos procesados listos para el cliente |
| Excepción de dominio | Error tipado cuando una regla de negocio no se cumple |
| Efecto en la BD | Datos persistidos, actualizados o eliminados |

## Pasos de funcionamiento

1. Definir la interfaz del servicio con todos los métodos públicos del dominio.
2. Crear la clase de implementación que implementa la interfaz.
3. Declarar todas las dependencias (repositorios, servicios externos) en el constructor — **NUNCA** instanciarlas con `new` dentro del servicio.
4. Por cada método del servicio:
   - Cargar entidades necesarias desde el repositorio.
   - Aplicar las reglas de negocio del dominio.
   - Si una regla falla → lanzar excepción tipada inmediatamente.
   - Transformar el resultado al DTO de salida.
   - Retornar el DTO — nunca la entidad directamente.
5. El servicio **NUNCA** captura sus propias excepciones — el handler global (Skill 07) las captura.
6. Escribir tests unitarios del servicio usando repositorios mockeados.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @service-layer skill to implement the `ShipmentService` in my Go + Gin project. Rule: a shipment cannot be cancelled once its status is DELIVERED. Inject `ShipmentRepository` and `NotificationService`."

**Resultado esperado:**
```
// ShipmentService.Cancel(id) logic:
1. repo.FindById(id)          → 404 si no existe
2. if shipment.Status == DELIVERED → throw ConflictException
3. shipment.Status = CANCELLED
4. repo.Save(shipment)
5. notificationService.SendCancellation(shipment)
6. return ShipmentResponseDto
```

## Estructura de archivos recomendada

```
src/{resources}/services/
├── {resource}.service.{ext}           ← Interfaz pública del servicio
├── {resource}.service.impl.{ext}      ← Implementación con lógica de negocio
└── {resource}.service.test.{ext}      ← Tests unitarios con mocks del repositorio
```

## Checklist de adaptación

Pasos mínimos para aplicar esta skill a cualquier servicio de negocio:

- [ ] Reemplazar `{Resource}Service` con el nombre real del servicio
- [ ] Listar los métodos públicos del dominio que el servicio debe exponer
- [ ] Identificar las dependencias que se inyectarán en el constructor (repositorios, otros servicios)
- [ ] Definir las reglas de negocio que el servicio debe aplicar y en qué métodos
- [ ] Identificar qué excepciones tipadas lanzar ante cada violación de regla
- [ ] Confirmar que el servicio no tiene imports de controladores ni de capas HTTP

> La interfaz, el patrón de inyección y la estructura de métodos son idénticos para cualquier dominio. Solo cambian los métodos específicos, las reglas de negocio y las dependencias.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/service.template.md`](resources/service.template.md) — Plantilla de servicio con interfaz e implementación en 4 lenguajes
- [`resources/service-interface.template.md`](resources/service-interface.template.md) — Definición de la interfaz pública del servicio

---

> **Regla de oro:** Si el servicio no puede ser testeado con mocks sin levantar servidor ni BD, el diseño está mal.
