# Validation Rules Reference

Quick reference for declarative validation annotations by language.

## Common validations

| Rule | Java (Bean Validation) | Node.js (class-validator / NestJS) | Python (Pydantic) | Go (validator) |
|------|----------------------|--------------------------|-------------------|---------------|
| Required | `@NotBlank` / `@NotNull` | `@IsNotEmpty()` | `Field(...)` | `binding:"required"` |
| Email | `@Email` | `@IsEmail()` | `EmailStr` | `validate:"email"` |
| Min length | `@Size(min=N)` | `@MinLength(N)` | `min_length=N` | `validate:"min=N"` |
| Max length | `@Size(max=N)` | `@MaxLength(N)` | `max_length=N` | `validate:"max=N"` |
| Positive number | `@Positive` | `@IsPositive()` | `Field(..., gt=0)` | `validate:"gt=0"` |
| Min value | `@Min(N)` | `@Min(N)` | `Field(..., ge=N)` | `validate:"gte=N"` |
| Max value | `@Max(N)` | `@Max(N)` | `Field(..., le=N)` | `validate:"lte=N"` |
| Numeric | `@Digits` | `@IsNumber()` | `float` / `int` | `validate:"numeric"` |
| URL | `@URL` | `@IsUrl()` | `AnyUrl` | `validate:"url"` |
| Pattern (regex) | `@Pattern(regexp=...)` | `@Matches(regex)` | `regex=...` | `validate:"regexp=..."` |
| Enum value | `@Enumerated` | `@IsEnum(Enum)` | `Enum` type | `validate:"oneof=A B C"` |
| Not empty list | — | `@ArrayNotEmpty()` | `Field(..., min_items=1)` | `validate:"min=1"` |

---

## DTO validation activation

| Framework | Activation |
|-----------|-----------|
| Spring Boot | `@Valid` on `@RequestBody` |
| Express + class-validator | `validate(dto)` in controller |
| FastAPI | Automatic with Pydantic models |
| Gin | `c.ShouldBindJSON(&dto); validate.Struct(dto)` |
| NestJS | Global `ValidationPipe` |

---

## Error message format

Always provide meaningful error messages. The global handler (skill 07) formats them:

```json
{
  "status": 400,
  "message": "name: must not be blank, price: must be greater than 0",
  "path": "/api/{resources}"
}
```
