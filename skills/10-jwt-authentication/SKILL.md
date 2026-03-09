---
name: jwt-authentication
description: "Implementa autenticación stateless basada en JWT: registro de usuarios con hash seguro de contraseñas, login con generación de token firmado, y un middleware o filtro que valida el token en cada petición protegida. Compatible con cualquier lenguaje, framework o arquitectura backend."
risk: high
universal: true
source: community
date_added: "2026-03-09"
---

# JWT Authentication

**Descripción:** Implementa autenticación stateless basada en JSON Web Tokens (JWT). Cubre: registro de usuarios con hash seguro de contraseñas (bcrypt), login con generación de token firmado, y un middleware/filtro que valida el token en cada petición protegida antes de ejecutar cualquier lógica del endpoint.

## Objetivo

Proteger los endpoints de una API garantizando que solo los usuarios con un token JWT válido y no expirado puedan consumir los recursos protegidos, sin mantener estado de sesión en el servidor.

## Use this skill when

- Al agregar autenticación a cualquier API backend por primera vez
- Al reemplazar sesiones de servidor por autenticación stateless
- Al construir una API consumida por SPA, app móvil o microservicio
- Al integrar autenticación en un proyecto que ya tiene las Skills 01–08

## Do not use this skill when

- El sistema ya tiene autenticación JWT funcional y solo necesita extenderla
- Se usa OAuth2 o SSO con proveedor externo — este skill no cubre el intercambio de tokens
- La API es solo interna accedida por servicios de confianza (considerar mTLS)

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `{identifier}` | ✅ | Campo de identificación del usuario (email, username, phone, etc.) |
| `password` | ✅ | Contraseña en texto plano — se hashea con bcrypt antes de guardar |
| `JWT_SECRET` | ✅ | Mínimo 32 caracteres aleatorios para firmar tokens |
| `JWT_EXPIRATION` | ❌ | Segundos de validez del token. Predeterminado: `86400` (24h) |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Token JWT | Firmado con claims: `id`, `sub` (identifier), `roles`, `iat`, `exp` |
| `AuthResponseDto` | `{ token, id, {identifier}, roles }` |
| Contexto de seguridad | Usuario autenticado disponible en toda la request (para Skill 11) |
| `401 Unauthorized` | Token ausente, expirado o con firma inválida |

## Pasos de funcionamiento

1. Guardar `JWT_SECRET` y `JWT_EXPIRATION` en variables de entorno. **Nunca hardcodear**.
2. Implementar `POST /auth/register`:
   - Validar DTO de entrada (`{identifier}` + `password`).
   - Verificar que el `{identifier}` no está registrado → `ConflictException` si ya existe.
   - Hashear la contraseña con `bcrypt` (factor de coste ≥ 10). Guardar el hash, nunca el texto plano.
   - Generar un JWT firmado con los claims del usuario.
   - Retornar `AuthResponseDto` (sin contraseña en la respuesta).
3. Implementar `POST /auth/login`:
   - Buscar el usuario por `{identifier}` → `UnauthorizedException` si no existe (mismo mensaje que contraseña incorrecta, para evitar enumeración).
   - Comparar la contraseña con el hash almacenado usando bcrypt compare.
   - Si válida → generar y retornar un JWT fresco.
4. Crear el filtro/middleware JWT que corre antes de cada petición protegida:
   - Extraer el token del header: `Authorization: Bearer <token>`.
   - Si no hay header → continuar sin autenticar (el endpoint decide si falla).
   - Validar la firma con `JWT_SECRET`.
   - Verificar que el token no ha expirado.
   - Si válido → cargar el usuario e inyectar en el contexto de la request.
   - Si inválido → retornar `401` inmediatamente.
5. Configurar rutas:
   - **Públicas:** `/auth/**`, `/health`
   - **Protegidas:** todo lo demás requiere token válido

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @jwt-authentication skill to add stateless JWT auth to my Go + Gin API. The identifier field is `email`. Include register and login endpoints, and a middleware that protects all routes except `/auth/**` and `/health`."

**Resultado esperado:**
```
POST /auth/register → 201 { token, id, email, roles: ["ROLE_USER"] }
POST /auth/login    → 200 { token, id, email, roles: ["ROLE_USER"] }
GET  /api/orders    → 401 si no hay token
GET  /api/orders    → 200 si token válido en Authorization header
```

## Estructura de archivos recomendada

```
src/
├── config/
│   └── jwt.config.{ext}               ← Leer JWT_SECRET y JWT_EXPIRATION del entorno
├── auth/
│   ├── controllers/
│   │   └── auth.controller.{ext}      ← POST /auth/login y POST /auth/register
│   ├── services/
│   │   └── auth.service.{ext}
│   └── dtos/
│       ├── login.dto.{ext}
│       ├── register.dto.{ext}
│       └── auth-response.dto.{ext}    ← { token, id, {identifier}, roles }
└── shared/middleware/
    └── jwt-auth.middleware.{ext}       ← Filtro que valida el token en cada request
```

## Checklist de adaptación

Pasos mínimos para agregar autenticación JWT a cualquier proyecto:

- [ ] Definir el campo de identificación del usuario: reemplazar `{identifier}` (email, username, phone)
- [ ] Confirmar que `JWT_SECRET` y `JWT_EXPIRATION` están en variables de entorno, no en código
- [ ] Confirmar que las contraseñas se hashean con un algoritmo seguro (bcrypt, Argon2) antes de guardar
- [ ] Definir qué rutas son públicas y cuáles requieren token válido
- [ ] Verificar que el filtro inyecta al usuario en el contexto de la request (para que Skill 11 pueda usarlo)
- [ ] Confirmar que el mensaje de error es el mismo para "usuario no encontrado" y "contraseña incorrecta"

> El flujo de registro, login y validación de token es idéntico para cualquier proyecto. Solo cambia el campo de identificación del usuario y las rutas públicas.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/jwt.config.template.md`](resources/jwt.config.template.md) — Configuración JWT en 4 lenguajes con variables de entorno
- [`resources/auth-endpoints.template.md`](resources/auth-endpoints.template.md) — Plantilla de endpoints de autenticación
- [`resources/jwt-claims.schema.json`](resources/jwt-claims.schema.json) — Schema del payload del token JWT

---

> **Crítico:** Nunca guardar contraseñas en texto plano. `JWT_SECRET` siempre desde variables de entorno, mínimo 32 caracteres.
