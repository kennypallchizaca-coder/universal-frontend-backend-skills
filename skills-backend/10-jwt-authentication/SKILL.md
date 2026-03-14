---
name: 10-jwt-authentication
description: "Implements secure authentication with hashed passwords, minimal JWT claims and environment-managed secrets."
risk: high
universal: true
source: community
date_added: "2026-03-10"
---

# 1. Skill Description

**Description (EN):**
Authentication must protect credentials, issue trustworthy tokens, and keep secrets out of source code. This skill defines a production-ready JWT flow with password hashing, minimal claims, secret management, and clear validation boundaries.

**Descripción (ES):**
La autenticación debe proteger credenciales, emitir tokens confiables y mantener secretos fuera del código fuente. Esta skill define un flujo JWT listo para producción con hashing de contraseñas, claims mínimos, manejo de secretos y límites claros de validación.

---

# 2. Skill Objective

**Objective (EN):**
Build a secure login flow that issues and validates JWTs without leaking secrets or overloading the token payload.
- Use this skill when: Implementing email/password login, token validation middleware, or refresh/access token flows.
- Do not use this skill when: Authentication is fully delegated to an external identity provider with no local token issuance.

**Objetivo (ES):**
Construir un flujo de login seguro que emita y valide JWTs sin filtrar secretos ni sobrecargar el payload.
- Úsese cuando: Se implemente login por email/password, middleware de validación de tokens o flujos refresh/access token.
- No se use cuando: La autenticación esté delegada por completo a un proveedor externo sin emisión local de tokens.

---

# 3. Inputs / Entradas

**Inputs (EN):**
1. `Credential Source`: User email/username plus password hash stored in the database.
2. `Token Claims`: Minimal identity and authorization data such as `sub`, `role`, `iat`, `exp`.
3. `Secret Strategy`: Environment variables, secret manager, or asymmetric keys.

**Entradas (ES):**
1. `Credential Source`: Email/usuario más hash de contraseña almacenado en base de datos.
2. `Token Claims`: Datos mínimos de identidad y autorización como `sub`, `role`, `iat`, `exp`.
3. `Secret Strategy`: Variables de entorno, secret manager o llaves asimétricas.

---

# 4. Outputs / Salidas

**Outputs (EN):**
1. Password hashing and verification routines.
2. Token issuing and token verification services or middleware.
3. A safe login response contract and secret-loading configuration.

**Salidas (ES):**
1. Rutinas de hashing y verificación de contraseñas.
2. Servicios o middleware para emitir y validar tokens.
3. Un contrato seguro de respuesta de login y configuración de carga de secretos.

---

# 5. Execution Steps

**Instructions (EN):**
1. **Hash passwords securely:** Use `bcrypt`, `argon2`, or an equivalent adaptive algorithm. Never store plaintext passwords.
2. **Issue minimal claims:** Put only what the backend must trust in the token (`sub`, roles, expiry, issuer/audience when relevant). Never embed passwords or sensitive profile data.
3. **Load secrets from secure config:** Read signing secrets or keys from environment variables or a secret manager. Never hardcode them.
4. **Validate every token use:** Check signature, expiration, issuer/audience as needed, and reject malformed or expired tokens deterministically.
5. **Prefer short-lived access tokens:** If the product needs long sessions, add refresh-token rotation or secure cookie-based session renewal.

**Instrucciones (ES):**
1. **Hashear contraseñas de forma segura:** Usa `bcrypt`, `argon2` o un algoritmo adaptativo equivalente. Nunca guardes passwords en texto plano.
2. **Emitir claims mínimos:** Pon solo lo que el backend debe confiar dentro del token (`sub`, roles, expiración, issuer/audience si aplica). Nunca incluyas passwords ni datos sensibles del perfil.
3. **Cargar secretos desde configuración segura:** Lee secretos o llaves desde variables de entorno o un secret manager. Nunca los hardcodees.
4. **Validar cada uso del token:** Revisa firma, expiración, issuer/audience cuando aplique y rechaza tokens malformados o vencidos de forma determinista.
5. **Preferir access tokens cortos:** Si el producto necesita sesiones largas, agrega rotación de refresh tokens o renovación mediante cookies seguras.

---

# 6. Example Usage (Prompt)

**Prompt (EN):**
```text
Use the skill @10-jwt-authentication to implement secure login for `{AuthModule}`.
1. Hash passwords with an adaptive algorithm and issue JWTs with minimal claims.
2. Load signing secrets from environment configuration and validate token expiry on every protected request.
```

**Prompt (ES):**
```text
Usa la skill @10-jwt-authentication para implementar login seguro en `{AuthModule}`.
1. Hashea contraseñas con un algoritmo adaptativo y emite JWTs con claims mínimos.
2. Carga los secretos de firma desde configuración de entorno y valida la expiración en cada request protegida.
```

---

# 7. Recommended File Structure / Estructura Recomendada

```text
src/
└── modules/
    └── auth/
        ├── dto/
        │   └── login.dto.{ext}
        ├── auth.controller.{ext}
        ├── auth.service.{ext}
        ├── password.service.{ext}
        ├── token.service.{ext}
        └── auth.middleware.{ext} or jwt.strategy.{ext}
```

## Adaptation Checklist / Lista de Adaptación

**Checklist (EN):**
- [ ] Passwords are stored only as secure hashes.
- [ ] JWT secrets or private keys are not committed to the repository.
- [ ] Protected routes reject expired, malformed, or tampered tokens consistently.

**Checklist (ES):**
- [ ] Las contraseñas se almacenan solo como hashes seguros.
- [ ] Los secretos JWT o llaves privadas no se suben al repositorio.
- [ ] Las rutas protegidas rechazan tokens expirados, malformados o alterados de forma consistente.
