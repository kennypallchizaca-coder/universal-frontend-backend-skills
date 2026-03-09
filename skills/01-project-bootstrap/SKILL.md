---
name: project-bootstrap
description: "Inicializa cualquier proyecto backend desde cero: configura el servidor HTTP, define el punto de entrada de la aplicación y expone un endpoint de salud que confirma que el entorno funciona correctamente. Funciona con cualquier lenguaje, framework o arquitectura."
risk: low
universal: true
source: community
date_added: "2026-03-09"
---

# Project Bootstrap

**Descripción:** Inicializa cualquier proyecto backend desde cero. Configura el servidor HTTP, define el punto de entrada de la aplicación y expone un endpoint `/health` que confirma que el entorno está corriendo correctamente. Es el primer paso antes de desarrollar cualquier funcionalidad.

## Objetivo

Tener un servidor HTTP funcional con configuración mínima, listo para recibir módulos de negocio, usando variables de entorno para todos los valores configurables.

## Use this skill when

- Al iniciar un proyecto backend o microservicio desde cero
- Al migrar una aplicación a otro framework o runtime
- Al crear la base antes de añadir cualquier lógica de negocio

## Do not use this skill when

- El proyecto ya tiene un servidor y punto de entrada funcional
- El alcance es solo frontend sin servidor propio
- Estás agregando funcionalidades a un backend existente

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `runtime` | ✅ | Lenguaje o plataforma (Node.js, Python, Java, Go, etc.) |
| `framework` | ✅ | Framework HTTP (Express, FastAPI, Gin, Spring Boot, etc.) |
| `PORT` | ❌ | Puerto del servidor. Predeterminado: `8080` |
| `APP_ENV` | ❌ | Ambiente de ejecución: `development`, `staging`, `production` |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Servidor HTTP activo | Escucha en el puerto configurado |
| `GET /health` → 200 | Confirma que el servidor está en línea |
| `.env.example` | Plantilla pública de variables de entorno |
| Punto de entrada | Archivo `main.{ext}` o equivalente |

## Pasos de funcionamiento

1. Elegir el lenguaje y framework según los requerimientos del proyecto.
2. Inicializar el proyecto con su gestor de paquetes (`npm init`, `go mod init`, `poetry init`, `gradle init`, etc.).
3. Instalar la dependencia mínima del servidor HTTP.
4. Crear el archivo de entrada `main.{ext}`:
   - Leer `PORT` desde variables de entorno con valor por defecto.
   - Inicializar el servidor HTTP.
   - Registrar `GET /health` → retornar `{ "status": "ok", "timestamp": "<ISO>" }`.
   - Arrancar el servidor y registrar el puerto en el log.
5. Crear `.env.example` con todas las variables configurables documentadas.
6. Agregar `.env` al `.gitignore` — nunca commitear secretos reales.
7. Verificar: iniciar el servidor y llamar `GET /health` → debe responder `200 OK`.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @project-bootstrap skill to initialize a Node.js + Express backend called `orders-api` on port 4000. Use `APP_ENV` and `PORT` as environment variables."

**Resultado esperado:**
```
src/
└── main.js       ← servidor Express con GET /health
.env.example      ← PORT=4000, APP_ENV=development
.gitignore        ← incluye .env
package.json
```

## Estructura de archivos recomendada

```
{project-root}/
├── src/
│   └── main.{ext}            ← Punto de entrada del servidor
├── .env                      ← Valores reales (NO committear)
├── .env.example              ← Plantilla pública (SÍ committear)
├── .gitignore
└── README.md
```

## Checklist de adaptación

Pasos mínimos para aplicar esta skill a cualquier proyecto:

- [ ] Reemplazar `{AppName}` con el nombre real de la aplicación
- [ ] Definir el valor de `PORT` (por defecto `8080` si no se especifica)
- [ ] Seleccionar el runtime y framework según el stack del proyecto
- [ ] Verificar que `GET /health` responde `200 OK` al iniciar
- [ ] Confirmar que `.env` está en `.gitignore` antes de hacer commit

> No requiere modificar la lógica del endpoint, el patrón de configuración ni la estructura del punto de entrada. Esta skill es idéntica para cualquier lenguaje o framework — solo cambian las herramientas usadas.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/.env.example`](resources/.env.example) — Plantilla de variables de entorno
- [`resources/health-check.template.md`](resources/health-check.template.md) — Implementación del endpoint `/health` en 4 lenguajes

---

> **Tip:** Este skill es el prerequisito de todos los demás. Aplícalo siempre primero.
