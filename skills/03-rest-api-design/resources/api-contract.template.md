# API Contract Template

Use this template to document any resource's API contract before implementation.

---

## Resource: `{Resource}`

**Base URL:** `/api/{resources}`
**Auth required:** Yes / No

---

### Endpoints

#### `GET /api/{resources}`
List all `{Resource}` resources.

- **Auth:** Optional — adjust per project
- **Query params:** See [advanced-querying skill](../../09-advanced-querying/SKILL.md) for filtering and pagination
- **Response `200`:**
```json
[
  {
    "id": 1,
    "{field_1}": "value",
    "{field_2}": "value",
    "createdAt": "ISO"
  }
]
```

---

#### `GET /api/{resources}/{id}`
Get a single `{Resource}` by ID.

- **Response `200`:**
```json
{
  "id": 1,
  "{field_1}": "value",
  "{field_2}": "value",
  "createdAt": "ISO"
}
```
- **Response `404`:**
```json
{ "status": 404, "message": "{Resource} not found: {id}" }
```

---

#### `POST /api/{resources}`
Create a new `{Resource}`.

- **Request body:**
```json
{
  "{field_1}": "value",    // required
  "{field_2}": "value"     // required
}
```
- **Response `201`:** same shape as GET /:id
- **Response `400`:** validation errors
- **Response `409`:** conflict (duplicate field)

---

#### `PUT /api/{resources}/{id}`
Replace all fields of `{Resource}` with `{id}`.

- **Request body:** same as POST
- **Response `200`:** updated resource
- **Response `404`:** not found

---

#### `DELETE /api/{resources}/{id}`
Delete `{Resource}` with `{id}`.

- **Response `204`:** no content
- **Response `404`:** not found

---

### DTO contracts

#### `Create{Resource}Dto`

| Field | Type | Required | Rules |
|-------|------|:--------:|-------|
| `{field_1}` | string | ✅ | min 2, max 200 chars |
| `{field_2}` | number | ✅ | positive |

#### `{Resource}ResponseDto`

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Auto-generated |
| `{field_1}` | string | |
| `{field_2}` | number | |
| `createdAt` | datetime | Auto-set on insert |
