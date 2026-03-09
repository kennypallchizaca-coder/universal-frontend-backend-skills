# Migration Strategy Guide

Choosing the right migration strategy prevents data loss in production.

## Strategy by environment

| Environment | Strategy | Who modifies the schema |
|-------------|----------|------------------------|
| **Development** | `auto` / `update` / `synchronize: true` | ORM automatically (on startup) |
| **Staging** | Explicit migrations | You, via migration scripts |
| **Production** | `validate` / `none` / `synchronize: false` | You, via migration scripts ONLY |

> ⚠️ **Never use `update` or `create` in production.** Even a simple model change can drop columns or recreate tables depending on the ORM version.

---

## ORM-specific settings

### Spring Boot (JPA)

```yaml
# application-dev.yml
spring.jpa.hibernate.ddl-auto: update

# application-prod.yml
spring.jpa.hibernate.ddl-auto: validate
```

### TypeORM (Node.js)

```typescript
// dev
{ synchronize: true }

// prod
{ synchronize: false, migrationsRun: true }
```

### SQLAlchemy (Python)

```python
# dev — create all tables on startup
Base.metadata.create_all(engine)

# prod — use Alembic migrations only
# alembic upgrade head
```

### GORM (Go)

```go
// dev
db.AutoMigrate(&{Resource}Model{})

// prod — use Atlas or golang-migrate
// Do NOT call AutoMigrate
```

---

## Explicit migrations checklist

Before running migrations in production:

- [ ] Backup the database
- [ ] Test the migration on staging first
- [ ] Verify rollback script is ready
- [ ] Run during low-traffic window
- [ ] Monitor error rates after migration
