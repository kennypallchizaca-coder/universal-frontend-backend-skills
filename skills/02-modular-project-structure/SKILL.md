---
name: modular-project-structure
description: "Organiza cualquier proyecto backend en módulos independientes agrupados por dominio de negocio, donde cada módulo encapsula sus propias capas internas. Aplicable a cualquier arquitectura, lenguaje o framework backend."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# Modular Project Structure

**Descripción:** Organiza cualquier proyecto backend en módulos independientes agrupados por dominio de negocio. Cada módulo encapsula completamente sus capas internas (controladores, servicios, repositorios, entidades y DTOs). El código transversal vive en `shared/` y la configuración global en `config/`.

## Objetivo

Crear proyectos escalables y mantenibles donde agregar, modificar o eliminar un dominio de negocio no afecte a los demás, facilitando el trabajo en equipo y la evolución hacia microservicios.

## Use this skill when

- Al diseñar la arquitectura de cualquier proyecto backend antes de escribir código
- Al refactorizar un monolito desorganizado o con capas horizontales
- Al incorporar un nuevo dominio de negocio a un proyecto existente
- Al preparar un proyecto para escalar hacia microservicios

## Do not use this skill when

- El proyecto es un script de uso único sin múltiples dominios
- El proyecto ya tiene una estructura modular bien establecida
- El alcance es solo un endpoint o una entidad con cero expansión futura

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `domains` | ✅ | Lista de dominios de negocio del sistema (sustantivos del negocio) |
| `pattern` | ❌ | Patrón arquitectónico: MVCS, Clean, Hexagonal. Predeterminado: MVCS |
| `language` | ✅ | Define convenciones de nombres en los directorios |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Árbol de directorios | Una carpeta por dominio con sus capas internas |
| `shared/` | Código transversal reutilizable entre módulos |
| `config/` | Configuraciones globales (BD, seguridad, etc.) aisladas |

## Pasos de funcionamiento

1. Identificar los dominios de negocio del sistema usando el lenguaje del negocio: sustantivos, no términos técnicos (ej: `orders`, `employees`, `invoices`).
2. Crear `src/` como raíz de todo el código fuente.
3. Crear `src/config/` para configuraciones globales (base de datos, seguridad, etc.).
4. Crear `src/shared/` para código transversal:
   - `middleware/` — middlewares aplicados a toda la app
   - `utils/` — funciones utilitarias sin reglas de negocio
   - `base-entity.{ext}` — clase base con `id`, `createdAt`, `updatedAt`
5. Por cada dominio identificado, crear una carpeta en `src/{domain}/` con:
   - `controllers/` — reciben y responden peticiones HTTP
   - `services/` — contienen la lógica de negocio
   - `repositories/` — acceden a la base de datos
   - `entities/` — representan los modelos de datos
   - `dtos/` — definen los contratos de entrada y salida
6. Crear el punto de entrada `src/main.{ext}` que ensambla todos los módulos.
7. Aplicar la regla: ningún módulo importa clases internas de otro módulo directamente.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @modular-project-structure skill to design the folder layout for a Java Spring Boot project with three domains: `orders`, `customers`, and `inventory`."

**Resultado esperado:**
```
src/main/java/com/{company}/{app}/
├── config/
├── shared/entities/BaseEntity.java
├── orders/controllers/OrderController.java
├── orders/services/OrderService.java
├── orders/repositories/OrderRepository.java
├── orders/entities/OrderEntity.java
├── orders/dtos/CreateOrderDto.java
├── customers/...
└── inventory/...
```

## Estructura de archivos recomendada

```
{project-root}/
├── src/
│   ├── config/                         ← Configuración global
│   ├── shared/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── base-entity.{ext}
│   ├── {domain-a}/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── entities/
│   │   └── dtos/
│   ├── {domain-b}/
│   │   └── (misma estructura)
│   └── main.{ext}
└── tests/                              ← Misma estructura que src/
```

## Checklist de adaptación

Pasos mínimos para aplicar esta skill a cualquier proyecto:

- [ ] Identificar los dominios de negocio del sistema (sustantivos del negocio, no términos técnicos)
- [ ] Reemplazar `{domain-a}`, `{domain-b}` con los nombres reales de los dominios
- [ ] Adaptar los nombres de capas internas si el framework usa convenciones distintas (ej: `handlers/` en vez de `controllers/`)
- [ ] Confirmar que ningún módulo importa clases internas de otro módulo directamente
- [ ] Crear `src/shared/` para código transversal al inicio del proyecto

> Los nombres de dominios, el número de carpetas y la profundidad de las capas son los únicos elementos que varían entre proyectos. El patrón de organización es idéntico para cualquier lenguaje o framework.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/module-structure.template.md`](resources/module-structure.template.md) — Árbol de directorios universal por dominio
- [`resources/naming-conventions.md`](resources/naming-conventions.md) — Convenciones de nombres por lenguaje y capa

---

> **Principios clave:** Alta cohesión (todo del mismo dominio en la misma carpeta), bajo acoplamiento (los módulos no conocen la implementación de los demás), SRP (cada capa tiene una única responsabilidad).
