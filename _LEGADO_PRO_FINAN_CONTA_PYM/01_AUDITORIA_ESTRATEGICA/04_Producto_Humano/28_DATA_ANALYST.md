# 📊 Perfil 28: Founder como Data Analyst (PostHog Self-Hosted + SQL)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Data Analyst por $40k-60k MXN/mes y usar Mixpanel/Amplitude ($299-2k USD/mes) para analizar comportamiento de usuarios."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie ni pagar analytics caros.** Usaremos **PostHog Open Source** (self-hosted en Dokploy) + **queries SQL directos** sobre PostgreSQL.

**PostHog:** Plataforma all-in-one (eventos, funnels, cohortes, session replay, feature flags) con 100% de los datos en nuestro VPS.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Analytics Platform | PostHog Self-Hosted (Dokploy) | $0 |
| Tracking Plan | Documento Markdown + TypeScript types | $0 |
| Funnels/Cohortes | PostHog UI (incluido) | $0 |
| Session Replay | PostHog (incluido) | $0 |
| Análisis Custom | Queries SQL directos + Metabase (opcional) | $0 |
| Data Analyst externo | Solo consultoría puntual (si necesario) | $8k-15k/evento |
| Mixpanel/Amplitude | PROHIBIDO | $0 vs $3.6k-24k USD/año ⛔ |

**Cuándo contratar:** Fase 3 (100k+ usuarios), si necesitamos análisis predictivo/ML.

**Ahorro:** $480k-720k MXN/año

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Métricas Clave (KPIs) | ✅ Definidas | `06_ESCALAMIENTO/02_PLAN_ACCION_15K_USUARIOS_2026.md` |
| Dokploy (Infraestructura) | ✅ Configurado | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |
| PostgreSQL (Datos) | ✅ Stack | `03_STACK_TECNOLOGICO_DEFINITIVO.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| ANA-001 | **PostHog Self-Hosted (Dokploy)** | 🔴 Bloqueante | Docker Compose en Dokploy | $0 | Sem 1 |
| ANA-002 | **Tracking Plan (Eventos Core)** | 🔴 Bloqueante | Documento Markdown | $0 | Sem 1 |
| ANA-003 | **SDK PostHog Frontend (Svelte)** | 🔴 Bloqueante | posthog-js | $0 | Sem 2 |
| ANA-004 | **Funnels Críticos (Onboarding, Conversión)** | 🟠 Alto | PostHog UI | $0 | Sem 2 |
| ANA-005 | **Análisis Cohortes (Retención)** | 🟡 Medio | PostHog UI | $0 | Sem 3 |
| ANA-006 | **Session Replay (Depuración UX)** | 🟡 Medio | PostHog (opt-in) | $0 | Fase 2 |
| ANA-007 | ~~Contratar Data Analyst~~ | ❌ Descartado | N/A | $40k/mes ⛔ | Nunca (Fase 1-2) |
| ANA-008 | ~~Mixpanel/Amplitude~~ | ❌ PROHIBIDO | N/A | $299-2k USD/mes ⛔ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Instalar PostHog Self-Hosted en Dokploy

**Opción A: Docker Compose Manual**

```yaml
# docker-compose.posthog.yml
version: '3.8'

services:
  posthog:
    image: posthog/posthog:latest
    restart: unless-stopped
    environment:
      - POSTHOG_REDIS_HOST=redis
      - POSTHOG_POSTGRES_HOST=postgres
      - POSTHOG_POSTGRES_USER=posthog
      - POSTHOG_POSTGRES_PASSWORD=${POSTHOG_DB_PASSWORD}
      - POSTHOG_SECRET_KEY=${POSTHOG_SECRET_KEY}
      - SITE_URL=https://analytics.fintech.mx
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    volumes:
      - posthog-data:/app/posthog

  postgres:
    image: postgres:14-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=posthog
      - POSTGRES_PASSWORD=${POSTHOG_DB_PASSWORD}
      - POSTGRES_DB=posthog
    volumes:
      - posthog-postgres:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    volumes:
      - posthog-redis:/data

volumes:
  posthog-data:
  posthog-postgres:
  posthog-redis:
```

**Opción B: Usar UI de Dokploy**

1. En Dokploy: `Apps > New App > Docker Compose`
2. Pegar el `docker-compose.posthog.yml`
3. Configurar variables de entorno:
   - `POSTHOG_DB_PASSWORD`: Generar con `openssl rand -base64 32`
   - `POSTHOG_SECRET_KEY`: Generar con `openssl rand -base64 50`
4. Asignar dominio: `analytics.fintech.mx` (con Traefik SSL automático)
5. Deploy

**Verificación:**

```bash
curl https://analytics.fintech.mx/_health
# Respuesta: {"status":"ok"}
```

### 2. Tracking Plan (Documento Maestro)

**Archivo:** `01_AUDITORIA_ESTRATEGICA/04_Producto_Humano/TRACKING_PLAN.md`

```markdown
# 📊 TRACKING PLAN V1 - FinTech

> **Objetivo:** Definir TODOS los eventos que se trackean, sus propiedades y cuándo se disparan.

---

## 📦 ENTIDADES

- **User:** Usuario registrado
- **Transaction:** Gasto/Ingreso
- **Goal:** Meta de ahorro
- **Invoice:** Factura CFDI
- **Tax Declaration:** Declaración de impuestos

---

## 🔥 EVENTOS CRÍTICOS

### 1. ONBOARDING (Conversión)

| Evento | Cuándo se dispara | Propiedades |
|:-------|:------------------|:------------|
| `signup_started` | Usuario hace click en "Registrarse" | `source: 'landing' \| 'referral'` |
| `signup_completed` | Email verificado | `method: 'email' \| 'google'` |
| `onboarding_step_viewed` | Usuario ve paso del wizard | `step: 1-5, step_name: string` |
| `onboarding_step_completed` | Usuario completa paso | `step: number, time_spent_seconds: number` |
| `onboarding_abandoned` | Usuario sale sin completar | `last_step: number` |
| `onboarding_completed` | Usuario llega al dashboard | `total_time_seconds: number` |

### 2. CORE VALUE (Activación)

| Evento | Cuándo se dispara | Propiedades |
|:-------|:------------------|:------------|
| `transaction_added` | Primera transacción registrada | `type: 'expense' \| 'income', amount: number, method: 'manual' \| 'ocr' \| 'bank_sync'` |
| `goal_created` | Primera meta de ahorro creada | `target_amount: number, category: string` |
| `invoice_uploaded` | Primera factura CFDI subida | `method: 'xml' \| 'pdf_ocr', amount: number` |
| `sat_connected` | Usuario conecta cuenta SAT (CIEC/FIEL) | `method: 'ciec' \| 'fiel'` |
| `bank_connected` | Usuario conecta banco (Open Banking) | `bank: string, accounts: number` |

### 3. ENGAGEMENT (Retención)

| Evento | Cuándo se dispara | Propiedades |
|:-------|:------------------|:------------|
| `dashboard_viewed` | Usuario abre dashboard | `device: 'mobile' \| 'desktop', time_of_day: string` |
| `report_generated` | Usuario genera reporte | `type: 'monthly' \| 'annual' \| 'custom', format: 'pdf' \| 'excel'` |
| `budget_created` | Usuario crea presupuesto | `categories: number, total_amount: number` |
| `goal_completed` | Meta de ahorro alcanzada | `goal_id: string, days_to_complete: number` |
| `streak_milestone` | Racha alcanza hito | `days: 7 \| 30 \| 100` |

### 4. MONETIZATION (Ingresos)

| Evento | Cuándo se dispara | Propiedades |
|:-------|:------------------|:------------|
| `pricing_page_viewed` | Usuario ve planes | `source: 'banner' \| 'menu' \| 'paywall'` |
| `plan_selected` | Usuario elige plan | `plan: 'pro' \| 'business', billing: 'monthly' \| 'annual'` |
| `checkout_started` | Inicia proceso de pago | `plan: string, amount: number` |
| `payment_failed` | Pago rechazado | `error_code: string, payment_method: string` |
| `subscription_activated` | Pago exitoso | `plan: string, mrr: number, trial: boolean` |
| `subscription_cancelled` | Usuario cancela | `reason: string, had_plan_days: number` |

### 5. PRODUCT-SPECIFIC (México)

| Evento | Cuándo se dispara | Propiedades |
|:-------|:------------------|:------------|
| `tax_declaration_filed` | Usuario declara impuestos | `declaration_type: 'mensual' \| 'anual', on_time: boolean` |
| `cfdi_validated` | Valida factura con SAT | `result: 'valid' \| 'invalid' \| 'cancelled'` |
| `efos_check_run` | Verifica RFC en Lista 69-B | `is_efos: boolean` |
| `whatsapp_support_opened` | Abre chat WhatsApp | `topic: string` |

---

## 📊 FUNNELS A ANALIZAR

1. **Signup → Onboarding → First Transaction** (Activación)
2. **First Visit → Signup** (Conversión)
3. **Free → Pricing → Checkout → Paid** (Monetización)
4. **Goal Created → Goal Completed** (Engagement)

---

## 📊 COHORTES A ANALIZAR

- **Retención D1, D7, D30:** % usuarios activos después de registro
- **Retención por Mes de Signup:** Comparar cohortes mensuales
- **Conversión Free → Paid por Cohorte:** Cuánto tardan en pagar

---

*Última actualización: 9 Diciembre 2025*
```

### 3. Implementación SDK PostHog (Frontend Svelte)

**Instalación:**

```bash
bun add posthog-js
```

**Configuración:**

```typescript
// src/lib/analytics.ts
import posthog from 'posthog-js';
import { browser } from '$app/environment';

if (browser) {
  posthog.init('phc_YOUR_PROJECT_API_KEY', {
    api_host: 'https://analytics.fintech.mx',
    autocapture: false, // Preferimos eventos manuales
    capture_pageview: true,
    persistence: 'localStorage',

    // Privacidad: NO enviar data sensible
    mask_all_text: true,
    mask_all_element_attributes: true,

    // Opt-out por defecto (GDPR/LFPDPPP)
    opt_out_capturing_by_default: true, // Usuario debe hacer opt-in
  });
}

export { posthog };
```

**Uso en Componentes:**

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { posthog } from '$lib/analytics';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let user = $state(null);

  onMount(() => {
    // Identificar usuario (solo si opt-in)
    if (user && user.analyticsConsent) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        plan: user.plan,
        createdAt: user.createdAt,
      });
    }
  });
</script>
```

**Tracking de Eventos:**

```svelte
<!-- src/routes/transactions/add/+page.svelte -->
<script lang="ts">
  import { posthog } from '$lib/analytics';

  async function handleSubmit() {
    const transaction = await createTransaction(formData);

    // Track evento
    posthog.capture('transaction_added', {
      type: transaction.type,
      amount: transaction.amount,
      method: 'manual',
      category: transaction.category,
    });
  }
</script>
```

### 4. Configurar Funnels en PostHog UI

**Funnel 1: Signup → Activación**

1. En PostHog: `Insights > New Insight > Funnel`
2. Pasos:
   - `signup_completed`
   - `onboarding_completed`
   - `transaction_added` (dentro de 7 días)
3. Filtros: `source = 'organic'` vs `source = 'referral'`
4. Guardar como "Activation Funnel"

**Funnel 2: Free → Paid**

1. Pasos:
   - `pricing_page_viewed`
   - `plan_selected`
   - `checkout_started`
   - `subscription_activated`
2. Análisis: ¿Dónde abandonan más?

### 5. Análisis de Cohortes (Retención)

**En PostHog:**

1. `Insights > New Insight > Retention`
2. Configurar:
   - **Event A (Primera vez):** `signup_completed`
   - **Event B (Retorno):** `dashboard_viewed`
   - **Período:** Diario (D1, D7, D30)
3. Agrupar por: `signup_source`, `plan`, `country`

**Meta:** D7 Retention > 40%, D30 Retention > 20%

### 6. Session Replay (Depuración UX)

**Activación (Opt-In):**

```typescript
// Solo si usuario acepta en configuración
if (user.sessionReplayConsent) {
  posthog.startSessionRecording();
}
```

**Uso:**

- Ver cómo usuarios interactúan con formularios complejos (ej: declaración de impuestos).
- Detectar bugs invisibles (ej: botón que no responde en gama baja).
- **Privacidad:** Maskear inputs sensibles (passwords, RFC, cuentas bancarias).

### 7. Análisis SQL Directos (PostgreSQL)

**Ejemplo: Top 10 categorías de gasto**

```sql
-- Ejecutar en psql o Metabase
SELECT
  category,
  COUNT(*) as transaction_count,
  SUM(amount) as total_amount
FROM transactions
WHERE type = 'expense'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY category
ORDER BY total_amount DESC
LIMIT 10;
```

**Ejemplo: Tasa de activación (7 días)**

```sql
WITH signups AS (
  SELECT id, created_at
  FROM users
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
activated AS (
  SELECT DISTINCT user_id
  FROM transactions
  WHERE created_at <= (SELECT created_at FROM users WHERE users.id = transactions.user_id) + INTERVAL '7 days'
)
SELECT
  COUNT(signups.id) as total_signups,
  COUNT(activated.user_id) as activated_users,
  ROUND(COUNT(activated.user_id)::numeric / COUNT(signups.id) * 100, 2) as activation_rate
FROM signups
LEFT JOIN activated ON signups.id = activated.user_id;
```

---

## 💡 Mentalidad Bootstrap: Analytics = Self-Hosted, No SaaS

### Qué hace el Sistema:

1. **PostHog** captura eventos, funnels, cohortes, session replay.
2. **Tracking Plan** documenta qué trackear (vivo, se actualiza con producto).
3. **SQL queries** para análisis custom que PostHog no cubre.

### Qué NO hacer:

- ❌ Usar Google Analytics (no da datos granulares, problemas privacidad).
- ❌ Pagar Mixpanel/Amplitude ($3.6k-24k USD/año).
- ❌ Trackear TODO (solo eventos que impactan decisiones).

### Herramientas:

- **PostHog Open Source:** Self-hosted en Dokploy (gratis, datos propios).
- **posthog-js:** SDK para Svelte (13KB gzipped).
- **PostgreSQL:** Queries SQL directos para análisis custom.
- **Metabase (Opcional):** Dashboard SQL visual (open source).

---

## 🇲🇽 Adaptación México Profundo

### 1. Privacidad (LFPDPPP)

**Opt-In Obligatorio:**

```svelte
<div class="analytics-consent">
  <p>Usamos análisis para mejorar la app. No vendemos tu información.</p>
  <Button onclick={() => posthog.opt_in_capturing()}>
    Aceptar análisis
  </Button>
  <Button variant="ghost" onclick={() => posthog.opt_out_capturing()}>
    No, gracias
  </Button>
</div>
```

### 2. Métricas Específicas de México

- **% usuarios que conectan SAT** (indicador de confianza).
- **% declaraciones a tiempo** (valor diferenciador).
- **% uso en gama baja** (Android <$5k MXN).
- **Adoption por estado** (CDMX, Jalisco, Nuevo León).

### 3. Análisis de Churn

Entender **por qué** cancelan:

```sql
SELECT
  cancellation_reason,
  COUNT(*) as count,
  AVG(EXTRACT(DAY FROM (cancelled_at - created_at))) as avg_lifetime_days
FROM users
WHERE status = 'cancelled'
GROUP BY cancellation_reason
ORDER BY count DESC;
```

---

## 🔗 Referencias

- **PostHog Docs:** https://posthog.com/docs
- **Lean Analytics:** Alistair Croll & Benjamin Yoskovitz.
- **Amplitude Event Taxonomy:** Best practices (aplicables a PostHog).
- **AARRR Framework (Pirate Metrics):** Acquisition, Activation, Retention, Revenue, Referral.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (PostHog Self-Hosted, Cero SaaS de Analytics)*
