---
name: 12-production-deployment
description: "Hardens backend deployment for production with multi-stage builds, non-root containers, secret management and operational safeguards."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Production readiness is not just “it runs on my machine.” This skill defines how to package, configure, and operate a backend securely with container hardening, safe environment handling, health checks, and reproducible build steps.

**Descripción (ES):**
Estar listo para producción no es solo “corre en mi máquina”. Esta skill define cómo empaquetar, configurar y operar un backend con endurecimiento de contenedores, manejo seguro de entornos, health checks y pasos de build reproducibles.

---

# 2. Skill Objective

**Objective (EN):**
Prepare the backend for secure, repeatable deployment across staging and production environments.
- Use this skill when: Building Docker images, defining runtime environment variables, or preparing CI/CD release flows.
- Do not use this skill when: You only need a local dev script with no intention of deployment.

**Objetivo (ES):**
Preparar el backend para un despliegue seguro y repetible en staging y producción.
- Úsese cuando: Se construyan imágenes Docker, variables de entorno de runtime o flujos CI/CD de release.
- No se use cuando: Solo se necesite un script de desarrollo local sin intención de despliegue.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Runtime Target`: Container platform, VM, PaaS, or orchestrator.
2. `Build Artifacts`: JAR, compiled Node app, Python package, Go binary, etc.
3. `Operational Requirements`: Health endpoint, secrets, migrations, logging, resource limits.

**Entradas (ES):**
1. `Runtime Target`: Plataforma de contenedores, VM, PaaS u orquestador.
2. `Build Artifacts`: JAR, app Node compilada, paquete Python, binario Go, etc.
3. `Operational Requirements`: Health endpoint, secretos, migraciones, logging y límites de recursos.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Production-focused Dockerfile or deployment manifest.
2. Safe runtime configuration driven by environment variables or secret stores.
3. Operational checks for startup, health, logging, and migration discipline.

**Salidas (ES):**
1. Dockerfile o manifiesto de despliegue orientado a producción.
2. Configuración segura de runtime impulsada por variables de entorno o secret stores.
3. Chequeos operativos para arranque, health, logging y disciplina de migraciones.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Use multi-stage builds:** Keep compilers and dev dependencies out of the final runtime image.
2. **Run as a non-root user:** Drop privileges inside the container whenever the base image allows it.
3. **Externalize secrets and config:** Load database URLs, JWT secrets, API keys, and environment flags from env vars or secret managers, never from committed files.
4. **Expose health and startup behavior:** Provide a health endpoint and clear startup logs so orchestration platforms can detect readiness and failure.
5. **Ship only what production needs:** Exclude tests, caches, local `.env` files, and unused build artifacts with `.dockerignore` and release hygiene.

**Instrucciones (ES):**
1. **Usar builds multi-stage:** Mantén compiladores y dependencias de desarrollo fuera de la imagen final.
2. **Ejecutar como usuario no root:** Baja privilegios dentro del contenedor siempre que la imagen base lo permita.
3. **Externalizar secretos y configuración:** Carga URLs de base, secretos JWT, API keys y flags desde env vars o secret managers, nunca desde archivos subidos al repo.
4. **Exponer health y arranque:** Provee un endpoint de salud y logs de arranque claros para que la plataforma detecte readiness y fallos.
5. **Empaquetar solo lo necesario:** Excluye pruebas, cachés, `.env` locales y artefactos sobrantes con `.dockerignore` y buena higiene de release.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @12-production-deployment to harden this backend for production.
1. Build a multi-stage image that runs as a non-root user and excludes dev-only artifacts.
2. Load secrets from runtime configuration and expose a health endpoint for orchestration checks.
```

**Prompt (ES):**
```text
Usa la skill @12-production-deployment para endurecer este backend para producción.
1. Construye una imagen multi-stage que corra con usuario no root y excluya artefactos solo de desarrollo.
2. Carga secretos desde configuración de runtime y expone un endpoint de health para chequeos del orquestador.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
{project-root}/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml or deploy manifest
├── .env.production.example
└── src/
    └── health/
        └── health.controller.{ext} or health route
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] The runtime image excludes dev-only tooling and secrets.
- [ ] The container runs without root privileges whenever possible.
- [ ] Production configuration comes from environment or secret stores, not committed local files.

**Checklist (ES):**
- [ ] La imagen final excluye tooling de desarrollo y secretos.
- [ ] El contenedor corre sin privilegios root siempre que sea posible.
- [ ] La configuración de producción viene de entorno o secret stores, no de archivos locales subidos al repo.
