# 🗺️ MÓDULO 13: MAPA TECNOLOGÍA → CARACTERÍSTICAS

**Proyecto:** PRO_FINAN_CONTA_PYM
**Total Características Mapeadas:** 278
**Fecha:** 30 Noviembre 2025
**Versión:** 1.0

---

> 🎯 **PROPÓSITO:** Este documento te ayuda a identificar qué tecnología necesitas dominar para implementar cada característica. Organizado por tecnología para que puedas trabajar en lotes relacionados.

---

## 📊 RESUMEN EJECUTIVO: TECNOLOGÍAS PRINCIPALES

| Tecnología               | # Features | % del Proyecto | Prioridad de Aprendizaje |
| ------------------------ | ---------- | -------------- | ------------------------ |
| **ElysiaJS + Bun**       | 85         | 31%            | 🔴 CRÍTICA               |
| **PostgreSQL + Drizzle** | 72         | 26%            | 🔴 CRÍTICA               |
| **Svelte 5 + SvelteKit** | 65         | 23%            | 🔴 CRÍTICA               |
| **Gemini Pro (IA)**      | 35         | 13%            | 🟡 ALTA                  |
| **Redis**                | 28         | 10%            | 🟡 ALTA                  |
| **pgvector**             | 18         | 6%             | 🟢 MEDIA                 |
| **BullMQ**               | 22         | 8%             | 🟡 ALTA                  |
| **Python + Prophet**     | 8          | 3%             | 🟢 MEDIA                 |
| **WhatsApp API**         | 5          | 2%             | 🟢 MEDIA                 |
| **Open Banking (Belvo)** | 6          | 2%             | 🟢 MEDIA                 |

---

## 1. 🚀 ELYSIA JS + BUN (Backend Core)

### Tecnologías Involucradas

- **ElysiaJS 1.4.16+** - Framework web
- **Bun 1.3.4+** - Runtime JavaScript full-stack
- **TypeBox** - Validación de schemas
- **Eden Treaty** - Type-safe API client

### Características que Implementa

#### Módulo 01: Core Financiero (45 features)

| ID      | Feature                      | Complejidad | Endpoint Principal                  |
| ------- | ---------------------------- | ----------- | ----------------------------------- |
| FIN-001 | Registro de transacciones    | 🔨 3-5d     | `POST /api/transactions`            |
| FIN-002 | Categorización automática    | 🔧 6-10d    | `POST /api/transactions/categorize` |
| FIN-003 | Presupuestos mensuales       | 🔧 6-10d    | `CRUD /api/budgets`                 |
| FIN-004 | Metas de ahorro              | 🔧 6-10d    | `CRUD /api/goals`                   |
| FIN-005 | Multi-cuenta                 | 🔨 3-5d     | `CRUD /api/accounts`                |
| FIN-006 | Transferencias entre cuentas | ⚡ 1-2d     | `POST /api/transfers`               |
| FIN-007 | Transacciones recurrentes    | 🔧 6-10d    | `CRUD /api/recurring`               |
| FIN-008 | Etiquetas personalizadas     | ⚡ 1-2d     | `CRUD /api/tags`                    |
| FIN-009 | Notas en transacciones       | ⚡ 1-2d     | `PATCH /api/transactions/:id`       |
| FIN-010 | Adjuntos (comprobantes)      | 🔨 3-5d     | `POST /api/attachments`             |

#### Módulo 02: Contabilidad SAT (35 features)

| ID      | Feature                 | Complejidad | Endpoint Principal                  |
| ------- | ----------------------- | ----------- | ----------------------------------- |
| SAT-001 | Emisión CFDI 4.0        | 🏗️ 11-20d   | `POST /api/cfdi/emit`               |
| SAT-002 | Validación CFDI         | 🔧 6-10d    | `POST /api/cfdi/validate`           |
| SAT-003 | Cancelación CFDI        | 🔧 6-10d    | `POST /api/cfdi/cancel`             |
| SAT-004 | Descarga masiva SAT     | 🔧 6-10d    | `POST /api/sat/download`            |
| SAT-005 | Parser XML CFDI         | 🔨 3-5d     | `POST /api/cfdi/parse`              |
| SAT-006 | Complementos de pago    | 🏗️ 11-20d   | `POST /api/cfdi/payment-complement` |
| SAT-007 | Carta porte             | 🏗️ 11-20d   | `POST /api/cfdi/carta-porte`        |
| SAT-008 | Validador 69-B/EFOS     | 🔨 3-5d     | `GET /api/sat/efos/:rfc`            |
| SAT-009 | Catálogo de cuentas SAT | 🔨 3-5d     | `GET /api/sat/catalogs`             |
| SAT-010 | Balanza de comprobación | 🔧 6-10d    | `GET /api/reports/balanza`          |

#### Módulo 12: Killer Features (45 features)

| ID      | Feature                 | Complejidad | Endpoint Principal                                 |
| ------- | ----------------------- | ----------- | -------------------------------------------------- |
| KIL-001 | Facturación 1-clic      | 🔧 6-10d    | `POST /api/invoices/quick`                         |
| KIL-002 | Conciliación automática | 🏗️ 11-20d   | `POST /api/reconciliation/auto`                    |
| KIL-003 | Descarga SAT background | 🔧 6-10d    | `POST /api/sat/sync` (job)                         |
| KIL-004 | Pólizas automáticas     | 🏗️ 11-20d   | `POST /api/accounting/auto-entry`                  |
| KIL-009 | Multi-empresa           | 🔧 6-10d    | `GET /api/companies`, `POST /api/companies/switch` |
| KIL-013 | Modo contador           | 🔧 6-10d    | `GET /api/accountant/dashboard`                    |
| KIL-015 | Validador EFOS          | 🔨 3-5d     | `POST /api/suppliers/validate-efos`                |
| KIL-037 | Factura recurrente      | 🔨 3-5d     | `CRUD /api/invoices/recurring`                     |
| KIL-038 | Cobranza automática     | 🔧 6-10d    | `POST /api/collections/start`                      |
| KIL-043 | Pagos masivos           | 🏗️ 11-20d   | `POST /api/payments/bulk`                          |

### Snippets de Referencia

```typescript
// Estructura típica de endpoint ElysiaJS
import { Elysia, t } from "elysia";
import { transactionService } from "@/domain/transactions";

export const transactionsController = new Elysia({
  prefix: "/transactions",
}).post(
  "/",
  async ({ body, user }) => {
    return transactionService.create(body, user.id);
  },
  {
    body: t.Object({
      amount: t.Number(),
      description: t.String(),
      categoryId: t.Optional(t.String()),
      accountId: t.String(),
      date: t.String({ format: "date" }),
    }),
    response: t.Object({
      id: t.String(),
      amount: t.Number(),
      // ...
    }),
  },
);
```

---

## 2. 🐘 POSTGRESQL 18 + DRIZZLE ORM

### Tecnologías Involucradas

- **PostgreSQL 18.1** - Base de datos principal (Nov 2025, stability fixes, performance improvements)
- **pgvector 0.8.1** - Vector similarity search para RAG/IA
- **Drizzle ORM 0.38+** - ORM type-safe con soporte Bun SQL nativo
- **pgcrypto** - Cifrado de datos sensibles
- **pg_partman** - Particionado de tablas grandes

### Características que Implementa

#### Almacenamiento Core

| ID      | Feature             | Tabla Principal      | Índices Clave                     |
| ------- | ------------------- | -------------------- | --------------------------------- |
| FIN-001 | Transacciones       | `transactions`       | `user_id`, `date`, `category_id`  |
| FIN-003 | Presupuestos        | `budgets`            | `user_id`, `month`, `category_id` |
| FIN-004 | Metas               | `goals`              | `user_id`, `status`               |
| SAT-001 | CFDIs emitidos      | `cfdis`              | `user_id`, `uuid`, `status`       |
| SAT-004 | CFDIs recibidos     | `cfdis_received`     | `user_id`, `rfc_emisor`, `fecha`  |
| KIL-012 | Historial ilimitado | Particionado por año | `date_range`                      |

#### Auditoría y Compliance

| ID      | Feature           | Tabla         | Características        |
| ------- | ----------------- | ------------- | ---------------------- |
| SEC-001 | Audit logs        | `audit_logs`  | Inmutable, append-only |
| SEC-002 | Sesiones          | `sessions`    | TTL, device tracking   |
| SEC-005 | Cifrado CIEC/FIEL | `credentials` | pgcrypto AES-256       |

### Schema Drizzle de Referencia

```typescript
// /apps/backend/src/db/schema/transactions.ts
import {
  pgTable,
  uuid,
  decimal,
  timestamp,
  text,
  index,
} from "drizzle-orm/pg-core";

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),
    accountId: uuid("account_id")
      .notNull()
      .references(() => accounts.id),
    categoryId: uuid("category_id").references(() => categories.id),
    amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
    description: text("description").notNull(),
    date: timestamp("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIdIdx: index("transactions_user_id_idx").on(table.userId),
    dateIdx: index("transactions_date_idx").on(table.date),
    categoryIdx: index("transactions_category_id_idx").on(table.categoryId),
  }),
);
```

---

## 3. 🎨 SVELTE 5 + SVELTEKIT (Frontend)

### Tecnologías Involucradas

- **Svelte 5** - Framework reactivo con Runes
- **SvelteKit** - Meta-framework (SSR, routing)
- **Bits UI** - Componentes headless
- **shadcn-svelte** - Componentes estilizados
- **Chart.js** - Gráficas
- **Superforms + Zod** - Formularios

### Características que Implementa

#### Módulo 06: Experiencia de Usuario (20 features)

| ID     | Feature             | Componente Principal       | Runes Usados         |
| ------ | ------------------- | -------------------------- | -------------------- |
| UX-001 | Dashboard principal | `Dashboard.svelte`         | `$state`, `$derived` |
| UX-002 | Modo oscuro         | `ThemeProvider.svelte`     | `$state`             |
| UX-003 | Responsive mobile   | Layout CSS                 | -                    |
| UX-004 | PWA offline         | `+layout.svelte` + SW      | `$effect`            |
| UX-005 | Notificaciones push | `Notifications.svelte`     | `$state`             |
| UX-006 | Búsqueda global     | `CommandPalette.svelte`    | `$state`, `$derived` |
| UX-007 | Atajos de teclado   | `KeyboardShortcuts.svelte` | `$effect`            |
| UX-008 | Onboarding guiado   | `Onboarding.svelte`        | `$state`             |

#### Módulo 04: Gamificación (30 features)

| ID      | Feature             | Componente             | Animación                |
| ------- | ------------------- | ---------------------- | ------------------------ |
| GAM-001 | Streaks de registro | `StreakCounter.svelte` | CSS + Svelte transitions |
| GAM-002 | Badges/logros       | `BadgeGrid.svelte`     | Confetti animation       |
| GAM-003 | Nivel de usuario    | `LevelProgress.svelte` | Progress bar animado     |
| GAM-004 | Leaderboard         | `Leaderboard.svelte`   | List transitions         |
| GAM-005 | Retos semanales     | `ChallengeCard.svelte` | Card flip                |

#### Killer Features UI

| ID      | Feature              | Componente                 | Interacción            |
| ------- | -------------------- | -------------------------- | ---------------------- |
| KIL-001 | Factura 1-clic       | `QuickInvoice.svelte`      | Autocompletado IA      |
| KIL-007 | Búsqueda instantánea | `GlobalSearch.svelte`      | Command+K palette      |
| KIL-008 | Reportes 1-clic      | `QuickReport.svelte`       | Natural language input |
| KIL-026 | Predictor flujo      | `CashFlowPredictor.svelte` | Gráfica interactiva    |
| KIL-030 | OCR tickets          | `TicketScanner.svelte`     | Camera + preview       |
| KIL-044 | Widget móvil         | PWA Widget API             | -                      |

### Snippet Svelte 5 de Referencia

```svelte
<!-- QuickInvoice.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms'

  let selectedClient = $state<Client | null>(null)
  let suggestedProducts = $derived(
    selectedClient ? getFrequentProducts(selectedClient.id) : []
  )
  let isSubmitting = $state(false)

  $effect(() => {
    if (selectedClient) {
      // Prellenar datos del cliente
      prefillClientData(selectedClient)
    }
  })
</script>

<form method="POST" action="?/createInvoice" use:enhance>
  <ClientSelector bind:value={selectedClient} />

  {#if suggestedProducts.length > 0}
    <ProductSuggestions products={suggestedProducts} />
  {/if}

  <Button type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Timbrando...' : 'Facturar en 1-Clic'}
  </Button>
</form>
```

---

## 4. 🤖 GOOGLE GEMINI PRO (IA)

### Tecnologías Involucradas

- **Gemini Pro** - LLM principal (chat, análisis)
- **Gemini Pro Vision** - OCR de tickets
- **EmbeddingGemma-300M** - Embeddings locales
- **pgvector** - Vector store

### Características que Implementa

#### Módulo 03: Inteligencia Analítica (36 features)

| ID      | Feature               | Modelo           | Prompt Type           |
| ------- | --------------------- | ---------------- | --------------------- |
| ANA-001 | Dashboard inteligente | Gemini Pro       | Análisis + resumen    |
| ANA-002 | Insights automáticos  | Gemini Pro       | Pattern detection     |
| ANA-003 | Predicciones          | Prophet + Gemini | Explicación narrativa |
| ANA-004 | Alertas proactivas    | Gemini Pro       | Anomaly explanation   |
| ANA-031 | SQL lenguaje natural  | Gemini Pro       | Text-to-SQL           |
| ANA-033 | Detector fraude       | Gemini Pro       | Classification        |
| ANA-036 | Asistente precios     | Gemini Pro       | Recommendation        |

#### Killer Features IA

| ID      | Feature             | Modelo           | Uso                     |
| ------- | ------------------- | ---------------- | ----------------------- |
| KIL-026 | Predictor flujo     | Prophet + Gemini | Forecast + explicación  |
| KIL-027 | Auto-clasificador   | Gemini Pro       | Few-shot classification |
| KIL-028 | Detector anomalías  | Gemini Pro       | Pattern detection       |
| KIL-029 | Asistente impuestos | Gemini Pro + RAG | QA conversacional       |
| KIL-030 | OCR tickets         | Gemini Vision    | Extraction              |
| KIL-032 | Alertas ahorro      | Gemini Pro       | Recommendation          |
| KIL-033 | Reportes NL         | Gemini Pro       | Report generation       |
| KIL-034 | Simulador what-if   | Gemini Pro       | Scenario analysis       |

### Snippet de Integración

```typescript
// /apps/backend/src/services/ai/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function classifyTransaction(description: string, amount: number) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Clasifica esta transacción mexicana:
    Descripción: "${description}"
    Monto: $${amount} MXN

    Categorías disponibles: Alimentación, Transporte, Servicios, Nómina, Impuestos, etc.

    Responde SOLO con el nombre de la categoría, sin explicación.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function extractTicketData(imageBase64: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const result = await model.generateContent([
    "Extrae los datos de este ticket mexicano: RFC, total, fecha, concepto. Responde en JSON.",
    { inlineData: { mimeType: "image/jpeg", data: imageBase64 } },
  ]);

  return JSON.parse(result.response.text());
}
```

---

## 5. ⚡ REDIS (Caché + Colas)

### Tecnologías Involucradas

- **Redis 8.4.0** - Caché, colas, Vector Sets (beta), JSON/TimeSeries integrados
- **BullMQ** - Sistema de colas/jobs

### Características que Implementa

#### Caché y Performance

| ID       | Feature                | Key Pattern                 | TTL    |
| -------- | ---------------------- | --------------------------- | ------ |
| PERF-001 | Caché de sesiones      | `session:{userId}`          | 15 min |
| PERF-002 | Caché de catálogos SAT | `catalog:{type}`            | 24 hrs |
| PERF-003 | Rate limiting          | `ratelimit:{ip}:{endpoint}` | 1 min  |
| PERF-004 | Caché de dashboard     | `dashboard:{userId}`        | 5 min  |
| PERF-005 | Caché de EFOS          | `efos:{rfc}`                | 24 hrs |

#### Jobs en Background (BullMQ)

| ID      | Feature          | Queue Name        | Schedule     |
| ------- | ---------------- | ----------------- | ------------ |
| KIL-002 | Conciliación     | `reconciliation`  | Cada 4 hrs   |
| KIL-003 | Sync SAT         | `sat-sync`        | Cada hora    |
| KIL-014 | Alertas fiscales | `fiscal-alerts`   | Diario 6am   |
| KIL-015 | Validar EFOS     | `efos-validation` | Diario 3am   |
| KIL-018 | Recordatorios    | `reminders`       | Cada hora    |
| KIL-038 | Cobranza         | `collections`     | Diario 9am   |
| SAT-004 | Descarga masiva  | `sat-download`    | Bajo demanda |

### Snippet BullMQ

```typescript
// /apps/backend/src/jobs/sat-sync.ts
import { Queue, Worker } from "bullmq";
import { redis } from "@/lib/redis";

export const satSyncQueue = new Queue("sat-sync", { connection: redis });

// Programar sync cada hora
await satSyncQueue.add(
  "sync-all",
  {},
  {
    repeat: { pattern: "0 * * * *" }, // Cada hora
  },
);

// Worker que procesa
const worker = new Worker(
  "sat-sync",
  async (job) => {
    const { userId, ciec, fiel } = job.data;

    // 1. Descargar nuevos CFDIs del SAT
    const newCfdis = await satService.downloadCfdis(ciec, fiel);

    // 2. Parsear y guardar
    for (const xml of newCfdis) {
      await cfdiService.parseAndSave(xml, userId);
    }

    // 3. Notificar si hay nuevos
    if (newCfdis.length > 0) {
      await notificationService.send(userId, {
        type: "sat-sync",
        message: `${newCfdis.length} nuevos CFDIs sincronizados`,
      });
    }
  },
  { connection: redis },
);
```

---

## 6. 🔍 PGVECTOR (Búsqueda Semántica)

### Tecnologías Involucradas

- **pgvector 0.8.1** - Extensión PostgreSQL
- **EmbeddingGemma-300M** - Modelo de embeddings

### Características que Implementa

| ID      | Feature              | Uso de Vectores                               |
| ------- | -------------------- | --------------------------------------------- |
| KIL-007 | Búsqueda instantánea | Buscar facturas/transacciones por significado |
| KIL-029 | Asistente fiscal     | RAG sobre leyes/criterios SAT                 |
| KIL-033 | Reportes NL          | Encontrar datos relevantes                    |
| ANA-031 | SQL natural          | Mapear pregunta → esquema                     |
| KIL-025 | Comunidad contadores | Buscar respuestas similares                   |

### Schema y Queries

```sql
-- Extensión
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabla de embeddings
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding vector(768), -- EmbeddingGemma produce 768 dims
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda rápida
CREATE INDEX ON document_embeddings
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Query de similitud
SELECT content, metadata,
       1 - (embedding <=> $1) as similarity
FROM document_embeddings
WHERE 1 - (embedding <=> $1) > 0.7
ORDER BY embedding <=> $1
LIMIT 5;
```

---

## 7. 🐍 PYTHON + PROPHET (ML/Predicciones)

### Tecnologías Involucradas

- **Python 3.14+** - Scripts ML
- **Prophet** - Forecasting de series temporales
- **Pandas** - Manipulación de datos

### Características que Implementa

| ID      | Feature              | Script                  | Input → Output                 |
| ------- | -------------------- | ----------------------- | ------------------------------ |
| KIL-026 | Predictor flujo caja | `forecast_cashflow.py`  | Transacciones → Predicción 90d |
| ANA-003 | Predicción gastos    | `forecast_expenses.py`  | Histórico → Tendencia          |
| ANA-034 | Benchmark sector     | `industry_benchmark.py` | Datos agregados → Percentiles  |
| KIL-034 | Simulador what-if    | `scenario_simulator.py` | Parámetros → Proyección        |

### Script de Referencia

```python
# /scripts/ml/forecast_cashflow.py
from prophet import Prophet
import pandas as pd
from typing import List, Dict
import json
import sys

def forecast_cashflow(transactions: List[Dict], days: int = 90) -> Dict:
    """
    Predice flujo de caja para los próximos N días.
    """
    # Preparar datos para Prophet
    df = pd.DataFrame(transactions)
    df['ds'] = pd.to_datetime(df['date'])
    df['y'] = df['amount']

    # Agrupar por día (suma de ingresos - egresos)
    daily = df.groupby('ds')['y'].sum().reset_index()

    # Entrenar modelo
    model = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=True,
        daily_seasonality=False
    )
    model.fit(daily)

    # Predecir
    future = model.make_future_dataframe(periods=days)
    forecast = model.predict(future)

    # Extraer predicciones futuras
    future_forecast = forecast[forecast['ds'] > daily['ds'].max()]

    return {
        'predictions': future_forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].to_dict('records'),
        'trend': forecast['trend'].tolist()[-days:],
        'critical_date': find_critical_date(future_forecast)  # Fecha con déficit
    }

if __name__ == '__main__':
    # Recibir datos de stdin (desde Bun)
    transactions = json.loads(sys.stdin.read())
    result = forecast_cashflow(transactions)
    print(json.dumps(result))
```

---

## 8. 📱 INTEGRACIONES EXTERNAS

### WhatsApp Business API

| ID      | Feature                | Endpoint                          |
| ------- | ---------------------- | --------------------------------- |
| KIL-020 | Enviar facturas        | `POST /api/whatsapp/send-invoice` |
| KIL-038 | Recordatorios cobranza | `POST /api/whatsapp/reminder`     |

### Open Banking (Belvo/Finerio)

| ID      | Feature           | Integración                   |
| ------- | ----------------- | ----------------------------- |
| KIL-002 | Conciliación auto | Obtener movimientos bancarios |
| KIL-036 | Zero-touch        | Sync automático de banco      |

### PAC Timbrado (Facturama/SW)

| ID      | Feature      | Operación           |
| ------- | ------------ | ------------------- |
| SAT-001 | Emisión CFDI | Timbrar XML         |
| SAT-003 | Cancelación  | Cancelar UUID       |
| SAT-006 | Complementos | Timbrar complemento |

---

## 📋 GUÍA DE IMPLEMENTACIÓN POR PRIORIDAD

### 🔴 Semana 1-4: Fundamentos Críticos

**Tecnologías a dominar:**

1. ElysiaJS + Bun (API básica)
2. PostgreSQL + Drizzle (Schema core)
3. Svelte 5 básico (UI principal)

**Features a implementar:**

- FIN-001 a FIN-010 (Transacciones básicas)
- SAT-001 a SAT-005 (CFDI core)
- UX-001 a UX-005 (Dashboard básico)
- KIL-010, KIL-011, KIL-012 (Infraestructura)

### 🟡 Semana 5-8: Diferenciadores

**Tecnologías a agregar:**

1. Redis + BullMQ (Jobs)
2. Gemini Pro básico (Clasificación)

**Features a implementar:**

- KIL-001, KIL-003, KIL-007 (Eficiencia)
- KIL-015, KIL-018 (Compliance MX)
- KIL-027, KIL-030 (IA básica)

### 🟢 Semana 9-12: Inteligencia

**Tecnologías a agregar:**

1. pgvector (Búsqueda semántica)
2. Prophet (Predicciones)
3. Gemini Vision (OCR)

**Features a implementar:**

- KIL-002, KIL-004, KIL-026 (Automatización)
- KIL-029, KIL-033 (IA avanzada)
- GAM-001 a GAM-010 (Gamificación)

### 🔵 Semana 13+: Ecosistema Completo

**Tecnologías a agregar:**

1. WhatsApp API
2. Open Banking
3. Capacitor (móvil)

**Features a implementar:**

- KIL-020, KIL-038 (Comunicación)
- KIL-036, KIL-041 (Integraciones)
- KIL-025 (Comunidad)

---

## 📊 MATRIZ: FEATURE → ARCHIVOS A CREAR

| Feature | Backend Files                   | Frontend Files             | DB Migrations                  |
| ------- | ------------------------------- | -------------------------- | ------------------------------ |
| KIL-001 | `invoices/quick.ts`             | `QuickInvoice.svelte`      | -                              |
| KIL-002 | `reconciliation/auto.ts`        | `Reconciliation.svelte`    | `add_reconciliation_table.sql` |
| KIL-015 | `sat/efos.ts`                   | `EfosAlert.svelte`         | `add_efos_cache.sql`           |
| KIL-026 | `ml/forecast.ts`, `forecast.py` | `CashFlowPredictor.svelte` | -                              |
| KIL-030 | `ocr/ticket.ts`                 | `TicketScanner.svelte`     | -                              |

---

**Próximo:** [00_INDICE_GENERAL.md](./00_INDICE_GENERAL.md) (actualizar con Módulo 13)
