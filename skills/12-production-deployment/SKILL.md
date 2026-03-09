---
name: production-deployment
description: "Prepara y despliega cualquier aplicación backend en producción: separa configuraciones por ambiente, mueve todos los secretos a variables de entorno, construye un artefacto optimizado y lo publica en Linux (Nginx+systemd), Docker (multi-stage) o PaaS. Compatible con cualquier lenguaje o stack."
risk: high
universal: true
source: community
date_added: "2026-03-09"
---

# Production Deployment

**Descripción:** Prepara y despliega cualquier aplicación backend en producción de forma segura. Separa las configuraciones por ambiente, mueve todos los secretos a variables de entorno, construye un artefacto optimizado y lo publica en un servidor Linux (Nginx + systemd), en un contenedor Docker (Dockerfile multi-stage) o en una plataforma PaaS (Render, Railway, Heroku, Fly.io).

## Objetivo

Transformar una aplicación funcional en desarrollo en un servicio accesible públicamente con HTTPS activo, secretos gestionados como variables de entorno, sin modificación automática del esquema de BD y sin stack traces expuestos al cliente.

## Use this skill when

- Al desplegar cualquier backend en producción por primera vez
- Al migrar de desarrollo local a un servidor, nube o PaaS
- Al contenerizar una aplicación con Docker para facilitar el despliegue
- Al configurar CI/CD para despliegues automáticos

## Do not use this skill when

- La aplicación todavía está en desarrollo activo y no está lista para producción
- Solo necesitas ejecutar la app localmente (usa `docker-compose` o `npm run dev`)
- El destino es Kubernetes — este skill cubre contenedor único y PaaS

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `DATABASE_URL` | ✅ | URL de conexión a la BD de producción — siempre desde variable de entorno |
| `JWT_SECRET` | ✅ | Secreto para firmar tokens — mínimo 32 caracteres |
| `APP_ENV` | ✅ | Debe ser `production` en producción |
| `PORT` | ❌ | Puerto del servidor. Predeterminado: `8080` |
| Infraestructura objetivo | ✅ | Servidor Linux / Docker / PaaS |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Servidor activo | HTTP/HTTPS accesible públicamente |
| Config de producción | `show-sql: false`, sin debug, sin auto-create de BD |
| Imagen Docker | Multi-stage: imagen mínima solo con el runtime |
| HTTPS activo | Nginx con SSL/TLS o terminación TLS en el balanceador |
| `GET /health` → 200 | Health check verificado antes de recibir tráfico |

## Pasos de funcionamiento

**1 — Separar configuración por ambiente:**
- Crear perfiles o archivos de config separados por ambiente (`dev`, `prod`).
- Producción: `ddl-auto: validate` (nunca `create`/`update`), `show-sql: false`, stack traces desactivados.
- Todos los secretos provienen de variables de entorno — nunca hardcodeados.

**2 — Gestión de secretos:**
- Definir todas las variables en `.env.example` con valores de placeholder.
- Agregar `.env` y `.env.production` al `.gitignore`.
- Configurar las variables reales en el servidor o plataforma de despliegue.

**3 — Construir el artefacto:**
- Instalar solo dependencias de producción.
- Compilar sin ejecutar tests: `./gradlew build -x test` / `npm run build` / `go build`.
- Verificar que `GET /health` responde 200 antes de desplegar.

**4 — Docker (Dockerfile multi-stage):**
- **Etapa 1 (builder):** imagen con compilador → compilar el artefacto.
- **Etapa 2 (runtime):** imagen mínima → copiar solo el artefacto compilado. Exponer `$PORT`.
- Probar localmente con las variables de producción antes de subir.

**5 — Servidor Linux (Nginx + systemd):**
- Configurar Nginx como reverse proxy apuntando a `localhost:{PORT}`.
- Agregar SSL con Let's Encrypt (`certbot --nginx`).
- Crear un servicio `systemd` que inicie la app con `EnvironmentFile` y reinicie en fallos.

**6 — PaaS:**
- Conectar el repositorio o subir la imagen Docker.
- Configurar todas las variables de entorno en el dashboard del proveedor.
- Configurar la URL del health check: `GET /health`.

**7 — Verificar:**
- Llamar `GET /health` por el dominio público → debe retornar 200.
- Confirmar que no aparecen logs SQL en producción.
- Confirmar que las respuestas de error no contienen stack traces.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @production-deployment skill to deploy my Python FastAPI backend called `clinic-api` to Render. The app uses PostgreSQL and JWT auth. Create the Dockerfile, .env.production.example, and render.yaml."

**Resultado esperado:**
```
clinic-api/
├── Dockerfile             ← multi-stage: builder + runtime
├── .env.production.example ← DATABASE_URL, JWT_SECRET, APP_ENV, PORT
└── render.yaml            ← service config, env vars, health check URL
```

## Estructura de archivos recomendada

```
{project-root}/
├── Dockerfile                        ← Multi-stage build
├── docker-compose.yml                ← Orquestación local (dev)
├── .env.example                      ← Plantilla pública (SÍ committear)
├── .env                              ← Valores reales (NUNCA committear)
├── nginx/
│   └── default.conf                  ← Config de Nginx como reverse proxy
└── deployment/
    ├── {app-name}.service            ← Config de systemd para servidor Linux
    └── deploy.sh                     ← Script de despliegue automatizado
```

## Checklist de adaptación

Pasos mínimos para preparar cualquier backend para producción:

- [ ] Reemplazar `{app-name}` con el nombre real del proyecto (kebab-case)
- [ ] Confirmar que `DATABASE_URL`, `JWT_SECRET` y `APP_ENV` están en variables de entorno
- [ ] Verificar que la estrategia de BD es `validate` en producción (nunca `create`/`update`)
- [ ] Seleccionar el destino de despliegue: servidor Linux, Docker, o PaaS
- [ ] Confirmar que `GET /health` responde `200 OK` con las variables de producción
- [ ] Verificar que HTTPS está activo (Nginx + TLS o terminación TLS del balanceador)

> Los pasos de configuración, el Dockerfile multi-stage y las reglas de seguridad de producción son idénticos para cualquier proyecto. Solo cambia el nombre de la app y la infraestructura objetivo.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/Dockerfile.template`](resources/Dockerfile.template) — Dockerfile multi-stage genérico adaptable a cualquier lenguaje
- [`resources/nginx.conf.template`](resources/nginx.conf.template) — Configuración de Nginx como reverse proxy con HTTPS
- [`resources/.env.production.example`](resources/.env.production.example) — Plantilla de variables de entorno para producción

---

> **Checklist de producción:** `ddl-auto: validate` ✅ · `show-sql: false` ✅ · secretos en env vars ✅ · HTTPS activo ✅ · health check verificado ✅
