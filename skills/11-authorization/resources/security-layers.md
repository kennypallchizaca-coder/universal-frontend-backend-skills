# Security Layers Reference

## Authorization model

```
Incoming Request
│
├─ Layer 0: JWT Authentication (Skill 10)
│   ├─ No token / invalid token   → 401 Unauthorized
│   └─ Valid token                 → inject user into request context
│
├─ Layer 1: Role-Based Access Control (RBAC)
│   ├─ Role insufficient           → 403 Forbidden
│   └─ Role OK                     → continue
│
├─ Layer 2: Resource Existence (in service)
│   ├─ Resource not found          → 404 Not Found
│   └─ Resource exists             → continue
│
└─ Layer 3: Ownership Validation (in service)
    ├─ User has privileged role    → bypass → execute operation ✅
    ├─ resource.{ownerField} == currentUser.id → execute operation ✅
    └─ Mismatch + no privilege     → 403 Forbidden
```

---

## Test case matrix

| User | Action | Layer fails | Result |
|------|--------|:-----------:|:------:|
| Not authenticated | Any operation | Layer 0 | ❌ 401 |
| Authenticated, insufficient role | Restricted endpoint | Layer 1 | ❌ 403 |
| Role OK, resource doesn't exist | Edit any resource | Layer 2 | ❌ 404 |
| Role OK, resource belongs to another user | Edit other's resource | Layer 3 | ❌ 403 |
| Role OK, owns the resource | Edit own resource | — | ✅ 2xx |
| Privileged role | Edit any resource | — | ✅ 2xx |

---

## Common mistakes

| Mistake | Consequence | Fix |
|---------|------------|-----|
| Check ownership before existence | Returns 403 on non-existent resources, leaking data | Always 404 first, then 403 |
| Ownership logic in controller | Cannot be reused, tested in isolation | Move to service |
| Hardcoded role strings everywhere | Breaking changes when roles change | Use constants/enum |
| Separate guard and ownership not composable | Complex nested guards | Keep RBAC and ownership as separate functions |
