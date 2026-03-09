# HTTP Status Code Reference

Quick reference for which HTTP status codes to use in REST APIs.

## Success (2xx)

| Code | Name | When to use |
|:----:|------|-------------|
| `200` | OK | GET, PUT, PATCH — resource found and returned |
| `201` | Created | POST — resource successfully created |
| `204` | No Content | DELETE — resource deleted, no body to return |

## Client Errors (4xx)

| Code | Name | When to use |
|:----:|------|-------------|
| `400` | Bad Request | Validation failed — missing or invalid fields |
| `401` | Unauthorized | No token, or token is invalid/expired |
| `403` | Forbidden | Token valid but role insufficient, or not the owner |
| `404` | Not Found | Resource with given ID does not exist |
| `409` | Conflict | Duplicate value — unique constraint violated (e.g., email already used) |
| `422` | Unprocessable Entity | Request is well-formed but semantically invalid (use sparingly) |

## Server Errors (5xx)

| Code | Name | When to use |
|:----:|------|-------------|
| `500` | Internal Server Error | Unexpected error — always log, never expose details |
| `503` | Service Unavailable | Dependency (e.g., database) is down |

---

## Common mistakes to avoid

| Wrong | Correct |
|-------|---------|
| Returning `200` for successful creation | `201 Created` |
| Returning `200` for successful deletion | `204 No Content` |
| Returning `403` for missing auth | `401 Unauthorized` |
| Returning `500` for validation errors | `400 Bad Request` |
| Returning `404` when checking ownership fails | First check 404, then 403 |
