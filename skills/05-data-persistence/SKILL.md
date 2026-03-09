---
name: data-persistence
description: "Conecta cualquier aplicación backend a una base de datos mediante un ORM o ODM: define una clase base de auditoría reutilizable, mapea entidades de dominio a tablas o colecciones, e implementa repositorios con operaciones CRUD. Compatible con cualquier ORM, ODM o tecnología de base de datos."
risk: medium
universal: true
source: community
date_added: "2026-03-09"
---

# Data Persistence

**Descripción:** Conecta cualquier aplicación backend a una base de datos mediante un ORM o ODM. Define una clase base de auditoría reutilizable (`BaseEntity`), mapea entidades de dominio a tablas o colecciones, e implementa repositorios con operaciones CRUD. El acceso a datos queda completamente aislado del resto de la aplicación.

## Objetivo

Persistir los datos de forma estructurada y portable, con un patrón de repositorio que puede sustituirse o testearse sin afectar la lógica de negocio, adaptable a cualquier tecnología de base de datos.

## Use this skill when

- Al conectar cualquier backend a una base de datos relacional o documental por primera vez
- Al agregar una nueva entidad al sistema que necesite persistencia
- Al reemplazar almacenamiento en memoria por una base de datos real
- Al definir el modelo de datos de un nuevo dominio

## Do not use this skill when

- Solo necesitas leer de una base de datos existente sin modificar el esquema
- El proyecto usa SQL crudo sin ORM (adapta el patrón repositorio manualmente)
- Estás configurando caché o índices de búsqueda — son responsabilidades separadas

## Entradas (Inputs)

| Input | Requerido | Descripción |
|-------|:---------:|-------------|
| `DATABASE_URL` | ✅ | URL completa de conexión — siempre desde variable de entorno |
| Esquema del modelo | ✅ | Campos, tipos, restricciones y relaciones de la entidad |
| ORM elegido | ✅ | JPA, TypeORM, SQLAlchemy, GORM, Mongoose, etc. |
| `ddl-strategy` | ❌ | `auto`/`update` en dev — `validate`/`none` en prod |

## Salidas (Outputs)

| Output | Descripción |
|--------|-------------|
| Conexión activa | BD conectada y disponible al arrancar el servidor |
| `BaseEntity` | Clase base con `id`, `createdAt`, `updatedAt` reutilizable en todas las entidades |
| `{Resource}Entity` | Clase mapeada a la tabla/colección del dominio |
| `{Resource}Repository` | Clase con operaciones CRUD y consultas del dominio |

## Pasos de funcionamiento

1. Instalar el ORM/ODM y el driver de la BD elegida.
2. Configurar la conexión usando `DATABASE_URL` desde variable de entorno — nunca hardcodear.
3. Crear `BaseEntity` (o clase abstracta equivalente) con:
   - `id` — clave primaria auto-generada
   - `createdAt` — establecido en inserción, no editable
   - `updatedAt` — actualizado automáticamente en cada modificación
4. Crear la entidad del dominio extendiendo `BaseEntity`:
   - Mapear cada campo al tipo de columna correcto
   - Definir constraints: `nullable`, `unique`, `length`, `default`
5. Implementar el repositorio con al menos: `findAll`, `findById`, `save`, `delete`, y consultas específicas del dominio (`findBy{Field}`, `existsBy{Field}`).
6. Definir la estrategia de migración por ambiente:
   - **Desarrollo:** `auto`/`update` — el ORM modifica el esquema automáticamente
   - **Producción:** `validate`/`none` — el ORM solo valida, **NUNCA** modifica
7. Verificar la conexión al arrancar la aplicación.

## Ejemplo de uso

**Prompt para el agente:**
> "Use the @data-persistence skill to create the `AppointmentEntity` and `AppointmentRepository` for my Python + SQLAlchemy project. Fields: `scheduledAt` (datetime, required), `notes` (text, nullable), `patientId` (FK to Patient)."

**Resultado esperado:**
```python
class AppointmentModel(BaseModel):
    __tablename__ = "appointments"
    scheduled_at = Column(DateTime, nullable=False)
    notes        = Column(Text, nullable=True)
    patient_id   = Column(Integer, ForeignKey("patients.id"), nullable=False)

class AppointmentRepository:
    def find_by_patient_id(self, patient_id: int): ...
    def save(self, obj): ...
```

## Estructura de archivos recomendada

```
src/
├── config/
│   └── database.config.{ext}              ← Configuración de conexión (usa DATABASE_URL)
├── shared/
│   └── base-entity.{ext}                  ← BaseEntity reutilizable en todo el proyecto
└── {resources}/
    ├── entities/
    │   └── {resource}.entity.{ext}
    └── repositories/
        └── {resource}.repository.{ext}
```

## Checklist de adaptación

Pasos mínimos para conectar cualquier entidad a una base de datos:

- [ ] Confirmar que `DATABASE_URL` está en variables de entorno, no en el código
- [ ] Reemplazar `{Resource}` con el nombre real de la entidad
- [ ] Definir los campos de la entidad con sus tipos y restricciones
- [ ] Verificar la estrategia de migración: `auto` en dev, `validate` en producción
- [ ] Confirmar que `BaseEntity` es reutilizada por todas las entidades del proyecto
- [ ] Confirmar que el repositorio es la única capa que accede directamente a la BD

> El patrón de `BaseEntity`, repositorio y configuración de conexión es idéntico para cualquier entidad. Solo cambian los nombres de campos y las consultas específicas del dominio.

## Resources

Los siguientes archivos de apoyo están disponibles en `resources/`:

- [`resources/base-entity.template.md`](resources/base-entity.template.md) — Implementación de BaseEntity en 4 lenguajes
- [`resources/database.config.template.md`](resources/database.config.template.md) — Configuración de conexión a BD por lenguaje
- [`resources/migration-strategy.md`](resources/migration-strategy.md) — Guía de estrategias de migración por ambiente

---

> **Crítico:** En producción la estrategia siempre debe ser `validate` o `none`. Nunca `update` o `create`.
