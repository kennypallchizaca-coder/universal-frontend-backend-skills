# Module Structure Template

Use this template to scaffold any domain module in your project.

## Universal folder structure (per domain)

```
src/{domain}/
├── controllers/
│   └── {domain}.controller.{ext}      ← Routes HTTP requests to the service
├── services/
│   ├── {domain}.service.{ext}         ← Interface (optional, strongly typed languages)
│   └── {domain}.service.impl.{ext}    ← Business logic implementation
├── repositories/
│   └── {domain}.repository.{ext}      ← All database access
├── entities/
│   └── {domain}.entity.{ext}          ← ORM-mapped data model
└── dtos/
    ├── create-{domain}.dto.{ext}       ← Input for POST
    ├── update-{domain}.dto.{ext}       ← Input for PUT/PATCH (all optional)
    └── {domain}-response.dto.{ext}    ← Output shape (no internals)
```

## Shared folder structure

```
src/shared/
├── middleware/
│   ├── auth.middleware.{ext}           ← JWT filter (skill 10)
│   └── error.middleware.{ext}          ← Global error handler (skill 07)
├── utils/
│   └── pagination.util.{ext}           ← Paginated response builder
└── base-entity.{ext}                   ← id, createdAt, updatedAt
```

## Config folder structure

```
src/config/
├── database.config.{ext}               ← DB connection setup
├── jwt.config.{ext}                    ← JWT secret + expiration
└── app.config.{ext}                    ← General app settings
```

## Domain naming checklist

- [ ] Folder name: `lowercase-kebab-case` (e.g., `work-orders`, `customer-accounts`)
- [ ] Class names: `PascalCase` with layer suffix (e.g., `WorkOrderController`, `WorkOrderService`)
- [ ] File names: `lowercase-kebab-case` with layer suffix (e.g., `work-order.controller.ts`)
- [ ] Table/collection names: `plural_snake_case` (e.g., `work_orders`)
