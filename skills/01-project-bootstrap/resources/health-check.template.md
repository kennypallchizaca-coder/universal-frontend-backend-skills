# Health Check Endpoint — Implementation Template

Use this template to implement `GET /health` in your project.

## Endpoint contract

- **Method:** GET
- **URL:** `/health`
- **Auth required:** No
- **Response:** `200 OK` always (if the process is alive)

```json
{
  "status": "ok",
  "timestamp": "2025-06-15T10:30:00.000Z"
}
```

---

## Java (Spring Boot)

```java
@RestController
public class HealthController {
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "ok", "timestamp", Instant.now().toString());
    }
}
```

## Node.js (Express)

```javascript
app.get('/health', (req, res) =>
    res.json({ status: 'ok', timestamp: new Date().toISOString() }));
```

## Node.js (NestJS)

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/health')
    health() {
        return { status: 'ok', timestamp: new Date().toISOString() };
    }
}
```

## Python (FastAPI)

```python
@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}
```

## Go (Gin)

```go
r.GET("/health", func(c *gin.Context) {
    c.JSON(200, gin.H{"status": "ok", "timestamp": time.Now().UTC()})
})
```

---

## Rules

- This endpoint must **never** require authentication.
- It must **always** return `200` if the process is alive — regardless of database state.
- Do not put business logic here.
