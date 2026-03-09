# Relationship Decision Guide

Use this guide to choose the correct relationship type between any two entities.

## Decision table

| Scenario | Type | FK location |
|----------|------|-------------|
| One `{A}` has many `{B}`. Each `{B}` belongs to one `{A}`. | `1:N` | FK `{a}_id` in `{B}`'s table |
| One `{A}` has exactly one `{B}`. Each `{B}` belongs to one `{A}`. | `1:1` | FK in the dependent/weaker entity |
| Many `{A}` associate with many `{B}`. | `N:N` | Join table `{a}_{b}` |
| Join table `{a}_{b}` has its own fields (e.g., timestamp, status). | `N:N` with entity | Give the join table its own entity class |

---

## Strategy checklist

- [ ] Defined which entity is the "owning" side (holds the FK)
- [ ] Named the join table explicitly: `{entity_a}_{entity_b}` (alphabetical)
- [ ] Set `fetch = LAZY` on all relationships
- [ ] Created a repository method to query by FK (instead of navigating collections)
- [ ] Verified with ORM logging that no N+1 queries are generated

---

## LAZY vs EAGER

| Strategy | When to use |
|----------|------------|
| `LAZY` (default) | Related data is not always needed — load on demand |
| `EAGER` | Related data is required in **every** query — use sparingly |

> Rule: if you use EAGER, you must be able to explain why with data.

---

## Cascade rules

| Cascade | Meaning | Use when |
|---------|---------|---------|
| `PERSIST` | Save child when saving parent | Child cannot exist without parent |
| `MERGE` | Merge child when merging parent | Child is always managed with parent |
| `REMOVE` | Delete children when deleting parent | Children are owned by parent |
| `ALL` | All of the above | Only for strict parent-child (never for peers) |
| (none) | No cascade | Most relationships — each entity managed independently |
