---
name: 01-project-bootstrap
description: "Initializes a backend service with a clear entry point, environment-driven configuration and a health endpoint."
risk: low
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Every backend needs a stable starting point before business logic is added. This skill sets up the application entry point, environment configuration, and a basic health endpoint so the service can be booted, verified, and extended safely.

**Descripción (ES):**
Todo backend necesita un punto de partida estable antes de agregar lógica de negocio. Esta skill configura el punto de entrada de la aplicación, la configuración por entorno y un endpoint básico de salud para que el servicio pueda arrancar, verificarse y extenderse con seguridad.

---

# 2. Skill Objective

**Objective (EN):**
Create a minimal but professional backend bootstrap ready for future modules.
- Use this skill when: Starting a backend project, a microservice, or a new service runtime from scratch.
- Do not use this skill when: The project already has a working entry point and you are only extending existing features.

**Objetivo (ES):**
Crear un bootstrap backend mínimo pero profesional, listo para módulos futuros.
- Úsese cuando: Se inicie un backend, un microservicio o un nuevo runtime de servicio desde cero.
- No se use cuando: El proyecto ya tenga un punto de entrada funcionando y solo se estén extendiendo features existentes.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Runtime`: Node.js, Python, Java, Go, .NET, or another server runtime.
2. `HTTP Layer`: Native framework, standard library server, or equivalent transport adapter.
3. `Environment Values`: `PORT`, environment name, and any required startup config.

**Entradas (ES):**
1. `Runtime`: Node.js, Python, Java, Go, .NET u otro runtime de servidor.
2. `HTTP Layer`: Framework web, servidor de librería estándar o adaptador equivalente de transporte.
3. `Environment Values`: `PORT`, nombre del entorno y cualquier configuración requerida para arrancar.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. A working application entry point.
2. A health-check endpoint such as `GET /health`.
3. Environment templates and startup defaults that are safe to version.

**Salidas (ES):**
1. Un punto de entrada de aplicación funcionando.
2. Un endpoint de health-check como `GET /health`.
3. Plantillas de entorno y defaults de arranque seguros para versionar.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Initialize the project runtime:** Create the base package, module, or workspace using the ecosystem’s standard tooling.
2. **Add only the essential HTTP dependencies:** Keep bootstrap minimal until real feature needs appear.
3. **Create a clear entry point:** Read configuration from environment, start the HTTP server, and register a simple health route.
4. **Define safe defaults:** Fall back to a standard port like `8080` and expose the expected environment variables in `.env.example`.
5. **Protect local secrets:** Keep real `.env` files out of version control and commit only templates or examples.

**Instrucciones (ES):**
1. **Inicializar el runtime del proyecto:** Crea el paquete, módulo o workspace base usando el tooling estándar del ecosistema.
2. **Agregar solo las dependencias HTTP esenciales:** Mantén el bootstrap mínimo hasta que existan necesidades reales de features.
3. **Crear un punto de entrada claro:** Lee configuración desde el entorno, inicia el servidor HTTP y registra una ruta simple de salud.
4. **Definir defaults seguros:** Usa un puerto estándar como `8080` cuando no haya configuración explícita y expón las variables esperadas en `.env.example`.
5. **Proteger secretos locales:** Mantén los `.env` reales fuera del control de versiones y sube solo plantillas o ejemplos.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @01-project-bootstrap to initialize a new `{Runtime}` backend service.
1. Create a clear entry point that reads environment config and starts the HTTP layer.
2. Add a `GET /health` endpoint plus safe environment templates for local development.
```

**Prompt (ES):**
```text
Usa la skill @01-project-bootstrap para inicializar un nuevo servicio backend en `{Runtime}`.
1. Crea un punto de entrada claro que lea configuración del entorno y levante la capa HTTP.
2. Agrega un endpoint `GET /health` y plantillas seguras de entorno para desarrollo local.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
{project-root}/
├── src/
│   └── main.{ext}
├── .env.example
├── .gitignore
├── README.md
└── runtime config files
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] The service starts from a single clear entry point.
- [ ] `GET /health` returns a successful response when the service is healthy.
- [ ] Real local secrets are excluded from version control.

**Checklist (ES):**
- [ ] El servicio arranca desde un punto de entrada único y claro.
- [ ] `GET /health` devuelve una respuesta exitosa cuando el servicio está sano.
- [ ] Los secretos locales reales están excluidos del control de versiones.
