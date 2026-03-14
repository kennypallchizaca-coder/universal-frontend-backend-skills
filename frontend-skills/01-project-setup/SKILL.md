---
name: 01-project-setup
description: "Establishes the frontend foundation with strict typing, path aliases, environment hygiene and predictable project conventions."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
A strong frontend starts with predictable structure. This skill defines the minimum setup needed to keep imports clean, configuration explicit, and environment variables safe across modern frontend frameworks.

**Descripción (ES):**
Un frontend sólido empieza con una estructura predecible. Esta skill define la configuración mínima necesaria para mantener imports limpios, configuración explícita y variables de entorno seguras en frameworks frontend modernos.

---

# 2. Skill Objective

**Objective (EN):**
Prepare a new or existing frontend project for maintainable development.
- Use this skill when: Bootstrapping a frontend app, cleaning inconsistent config, or standardizing imports and env files.
- Do not use this skill when: You are only changing isolated component behavior with no impact on project configuration.

**Objetivo (ES):**
Preparar un proyecto frontend nuevo o existente para un desarrollo mantenible.
- Úsese cuando: Se inicialice una app frontend, se limpie configuración inconsistente o se estandaricen imports y archivos de entorno.
- No se use cuando: Solo se cambie el comportamiento de un componente aislado sin impacto en la configuración del proyecto.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Frontend Runtime`: The chosen UI runtime and component model for the project.
2. `Tooling Layer`: The build, compile, and test chain that resolves imports and environment values.
3. `Environment Rules`: Which values are public to the client and which must remain server-only.

**Entradas (ES):**
1. `Frontend Runtime`: El runtime UI y el modelo de componentes elegidos para el proyecto.
2. `Tooling Layer`: La cadena de build, compilacion y pruebas que resuelve imports y variables de entorno.
3. `Environment Rules`: Qué valores son públicos para el cliente y cuáles deben permanecer solo del lado servidor.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Strict compiler or type-checking configuration.
2. Stable alias configuration for top-level imports.
3. Safe `.env` and `.env.example` conventions adapted to the stack.

**Salidas (ES):**
1. Configuración estricta del compilador o del type-checking.
2. Configuración estable de aliases para imports de alto nivel.
3. Convenciones seguras de `.env` y `.env.example` adaptadas al stack.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Enable strict development defaults:** Turn on strict typing or equivalent compiler checks whenever the stack supports it.
2. **Create import aliases:** Define a stable alias such as `@/` for the main source folder and mirror that setup in the bundler, compiler, and test runner.
3. **Separate public and private env values:** Only expose variables that are explicitly intended for the client bundle.
4. **Document the config contract:** Leave `.env.example`, alias docs, and base scripts clear enough for any contributor or agent to bootstrap the project safely.
5. **Keep the structure simple:** Prefer a clean root with source, config, and environment files over ad-hoc scattered setup.

**Instrucciones (ES):**
1. **Activar defaults estrictos de desarrollo:** Habilita tipado estricto o checks equivalentes del compilador siempre que el stack lo soporte.
2. **Crear aliases de importación:** Define un alias estable como `@/` para la carpeta principal de código y replica esa configuración en bundler, compilador y test runner.
3. **Separar variables públicas y privadas:** Expón al bundle cliente solo las variables que realmente estén pensadas para el navegador.
4. **Documentar el contrato de configuración:** Deja `.env.example`, documentación de aliases y scripts base lo suficientemente claros para que cualquier colaborador o agente inicialice el proyecto con seguridad.
5. **Mantener la estructura simple:** Prefiere una raíz limpia con código fuente, config y archivos de entorno en vez de una configuración dispersa e improvisada.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @01-project-setup to standardize the foundation of this frontend codebase.
1. Enable strict compiler checks and define a reusable source alias.
2. Create environment templates that expose only client-safe variables.
```

**Prompt (ES):**
```text
Usa la skill @01-project-setup para estandarizar la base de este proyecto frontend.
1. Activa checks estrictos del compilador y define un alias reutilizable para el código fuente.
2. Crea plantillas de entorno que expongan solo variables seguras para el cliente.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
{project-root}/
├── src/
├── .env.example
├── .gitignore
├── compiler config or equivalent
├── build config or framework-equivalent config
└── README.md
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Top-level imports resolve through a documented alias instead of deep relative paths.
- [ ] Public environment variables use the correct exposure mechanism for the chosen stack.
- [ ] Contributors can clone the project and understand the base configuration quickly.

**Checklist (ES):**
- [ ] Los imports de alto nivel se resuelven mediante un alias documentado en lugar de rutas relativas profundas.
- [ ] Las variables públicas usan el prefijo o mecanismo correcto de exposición del framework.
- [ ] Cualquier colaborador puede clonar el proyecto y entender rápidamente su configuración base.
