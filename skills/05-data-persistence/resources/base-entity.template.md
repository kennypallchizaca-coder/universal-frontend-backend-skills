# BaseEntity Template — 5 Languages

A `BaseEntity` is the abstract parent class for all domain entities.
It provides `id`, `createdAt`, and `updatedAt` fields automatically.

---

## Java (JPA)

```java
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() { this.createdAt = LocalDateTime.now(); }

    @PreUpdate
    void onUpdate() { this.updatedAt = LocalDateTime.now(); }
}
```

## Node.js (TypeORM — Generic)

```typescript
export abstract class BaseEntity {
    @PrimaryGeneratedColumn()   id: number;
    @CreateDateColumn()         createdAt: Date;
    @UpdateDateColumn()         updatedAt: Date;
}

// Domain entity example:
@Entity('{resources}')
export class {Resource}Entity extends BaseEntity {
    @Column() {field_1}: string;
}
```

## Node.js (NestJS + TypeORM)

```typescript
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}

// Domain entity usage in NestJS:
import { Entity, Column } from 'typeorm';

@Entity('{resources}')
export class {Resource}Entity extends BaseEntity {
    @Column({ nullable: false })
    {field_1}: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    {field_2}?: number;
}
```

## Python (SQLAlchemy)

```python
class BaseModel(Base):
    __abstract__ = True
    id         = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, onupdate=datetime.utcnow)
```

## Go (GORM)

```go
// gorm.Model already includes ID, CreatedAt, UpdatedAt, DeletedAt
type BaseModel struct {
    gorm.Model
}

type {Resource}Model struct {
    BaseModel
    {Field1} string  `gorm:"not null;size:200"`
}
```

---

## Soft delete (optional)

Add `deletedAt` to `BaseEntity` if you need soft delete (mark records as deleted without removing from DB):

```java
// Java — enable @SQLDelete + @Where filter
@SQLDelete(sql = "UPDATE {resources} SET deleted_at = NOW() WHERE id = ?")
@Where(clause = "deleted_at IS NULL")
```
