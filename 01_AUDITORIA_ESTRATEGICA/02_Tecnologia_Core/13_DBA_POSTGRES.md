# 👨‍💻 Perfil 13: DBA PostgreSQL

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El DBA (Database Administrator) se encarga del diseño, optimización y mantenimiento de la base de datos PostgreSQL. Dado que manejaremos millones de registros (CFDIs, Movimientos), el particionamiento y la indexación son críticos.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Motor DB | ✅ PostgreSQL 16+ | `00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md` |
| ORM | ✅ Drizzle | `package.json` |
| Hosting | ✅ VPS (Docker) | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| DBA-001 | **Estrategia de Particionamiento (CFDIs)** | 🔴 Bloqueante | `src/lib/server/db/migrations/001_partitioning.sql` | Sem 2 |
| DBA-002 | **Índices para Búsqueda Full-Text (TsVector)** | 🟠 Alto | Schema Drizzle | Sem 2 |
| DBA-003 | Configuración de Tuning (postgresql.conf) | 🟡 Medio | `docker/postgres/postgresql.conf` | Fase 2 |
| DBA-004 | Pooling de Conexiones (PgBouncer) | 🟡 Medio | Configuración Dokploy | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Particionamiento de Tabla Grande (CFDIs)

Los CFDIs crecen exponencialmente. Particionaremos por rango de fecha (mensual o anual).

```sql
-- SQL Raw para particionamiento (Drizzle lo soporta parcialmente, a veces requiere raw sql)

CREATE TABLE cfdi_documents (
    id UUID DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    issued_at TIMESTAMP NOT NULL,
    total NUMERIC(12,2) NOT NULL,
    xml_content TEXT,
    metadata JSONB,
    PRIMARY KEY (id, issued_at) -- La llave de partición debe ser parte de la PK
) PARTITION BY RANGE (issued_at);

-- Crear particiones automáticas (o manuales para 2025)
CREATE TABLE cfdi_documents_2025_01 PARTITION OF cfdi_documents
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');

CREATE TABLE cfdi_documents_2025_02 PARTITION OF cfdi_documents
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
```

### 2. Índices Gin para Búsqueda en JSONB

Muchos datos del SAT vienen en estructuras variables. Usaremos JSONB y GIN indexes.

```typescript
// src/lib/server/db/schema/invoices.ts
import { index } from 'drizzle-orm/pg-core';

export const invoices = pgTable('invoices', {
  // ... campos
  metadata: jsonb('metadata'),
}, (table) => ({
  // Índice para buscar rápido dentro del JSON (ej. buscar por UUID relacionado)
  metadataGinIdx: index('metadata_gin_idx').on(table.metadata).using('gin'),
}));
```

---

## 🔗 Referencias

- **PostgreSQL Docs:** Partitioning, GIN Indexes.
- **Drizzle ORM Docs:** SQL operator `sql`.

---

*Última actualización: 9 Diciembre 2025*
