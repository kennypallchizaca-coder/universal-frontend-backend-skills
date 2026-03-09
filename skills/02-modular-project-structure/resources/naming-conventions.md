# Naming Conventions by Language and Layer

## General rules

| Element | Convention | Example |
|---------|-----------|---------|
| Domain folder | `lowercase-kebab-case` | `work-orders/`, `customer-accounts/` |
| Table / collection | `plural_snake_case` | `work_orders`, `customer_accounts` |
| Route (URL) | `/api/plural-kebab-case` | `/api/work-orders` |
| Environment variable | `UPPER_SNAKE_CASE` | `DATABASE_URL`, `JWT_SECRET` |

---

## Java / Kotlin

| Layer | Naming | Example |
|-------|--------|---------|
| Controller class | `{Domain}Controller` | `WorkOrderController` |
| Service interface | `{Domain}Service` | `WorkOrderService` |
| Service impl | `{Domain}ServiceImpl` | `WorkOrderServiceImpl` |
| Repository | `{Domain}Repository` | `WorkOrderRepository` |
| Entity | `{Domain}Entity` | `WorkOrderEntity` |
| Create DTO | `Create{Domain}Dto` | `CreateWorkOrderDto` |
| Response DTO | `{Domain}ResponseDto` | `WorkOrderResponseDto` |
| Package | `com.{company}.{app}.{domain}` | `com.acme.api.workorders` |

## Node.js / TypeScript

| Layer | Naming | Example |
|-------|--------|---------|
| Controller file | `{domain}.controller.ts` | `work-order.controller.ts` |
| Service file | `{domain}.service.ts` | `work-order.service.ts` |
| Repository file | `{domain}.repository.ts` | `work-order.repository.ts` |
| Entity file | `{domain}.entity.ts` | `work-order.entity.ts` |
| Create DTO file | `create-{domain}.dto.ts` | `create-work-order.dto.ts` |
| Response DTO file | `{domain}-response.dto.ts` | `work-order-response.dto.ts` |

## Python

| Layer | Naming | Example |
|-------|--------|---------|
| Router file | `router.py` inside domain | `work_orders/router.py` |
| Service file | `service.py` | `work_orders/service.py` |
| Repository file | `repository.py` | `work_orders/repository.py` |
| Model file | `models.py` | `work_orders/models.py` |
| Schema file (Pydantic) | `schemas.py` | `work_orders/schemas.py` |

## Go

| Layer | Naming | Example |
|-------|--------|---------|
| Handler file | `handler.go` inside domain | `workorders/handler.go` |
| Service file | `service.go` | `workorders/service.go` |
| Repository file | `repository.go` | `workorders/repository.go` |
| Model file | `model.go` | `workorders/model.go` |
| DTO file | `dto.go` | `workorders/dto.go` |
