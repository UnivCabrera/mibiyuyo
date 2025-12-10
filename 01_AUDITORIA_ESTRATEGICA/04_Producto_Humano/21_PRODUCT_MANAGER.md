# 👨‍💼 Perfil 21: Founder como Product Manager

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Product Manager Senior certificado por $50k-80k MXN/mes para gestionar el roadmap y priorizar features."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** El Founder **ES** el Product Manager los primeros 1-2 años. El "Product-Market Fit" se encuentra conversando con usuarios reales, no con Jira Boards. Las primeras 1,000 decisiones de producto deben venir del Founder.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Product Roadmap | GitHub Projects (incluido con repos) | $0 |
| Feature Prioritization | RICE Scoring simplificado (Excel/Notion) | $0 |
| User Research | WhatsApp directo con usuarios | $0 |
| A/B Testing | PostHog self-hosted + Feature Flags código | $0 |
| Métricas de Producto | SQL queries + PostHog analytics | $0 |

**Cuándo contratar:** Solo cuando el MRR > $500k MXN/mes sostenidos (6 meses) y el Founder se ahoga operacionalmente.

---

## 📋 Rol y Responsabilidad (Adaptado)

El **Founder-PM** define el "Qué" y el "Por qué" basándose en feedback directo de usuarios PyMEs mexicanas. Usa **Shape Up** (6-week cycles) en lugar de Scrum burocrático. Prioriza usando RICE scoring manual, sin herramientas caras.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Roadmap General | ✅ Definido | `06_ESCALAMIENTO/02_PLAN_ACCION_15K_USUARIOS_2026.md` |
| Definición de Producto | ✅ Completa | `PROJECT_CHARACTERISTICS/00_INDICE_GENERAL.md` |
| 40 Perfiles de Usuario | ✅ Completo | `03_MERCADO_COMPETENCIA/03_40_PERFILES_PROFESIONALES.md` |
| 100 Necesidades Diarias | ✅ Completo | `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| PM-001 | **Sistema de Feature Flags** | 🔴 Bloqueante | Redis + Código | $0 | Sem 1 |
| PM-002 | **Analítica de Producto (Event Tracking)** | 🟠 Alto | PostHog self-hosted | $0 | Sem 2 |
| PM-003 | **GitHub Projects Configurado** | 🟠 Alto | GitHub Projects (gratis) | $0 | Sem 1 |
| PM-004 | ~~Dashboard Jira/Asana~~ | ❌ Descartado | Muy caro ⛔ | $120k/año ⛔ | Nunca |
| PM-005 | ~~Contratar PM~~ | ❌ Descartado | Demasiado early-stage | $600k-960k/año ⛔ | Nunca (Pre-PMF) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Sistema de Feature Flags (Redis + Código, $0)

Permite activar/desactivar funcionalidades sin redeploy. **NO usar LaunchDarkly ($2k-10k/mes)**, implementar con Redis existente.

```typescript
// src/lib/server/features/flags.ts
import { redis } from '$lib/server/redis'; // Ya incluido en el stack

export async function isFeatureEnabled(feature: string, userId?: string): Promise<boolean> {
  // 1. Check global flag
  const globalEnabled = await redis.get(`feature:${feature}:enabled`);
  if (globalEnabled !== '1') return false;

  // 2. Check user whitelist (gradual rollout)
  if (userId) {
    const isWhitelisted = await redis.sismember(`feature:${feature}:users`, userId);
    if (isWhitelisted) return true;

    // Percentage rollout (ejemplo: 10% de usuarios)
    const rolloutPercent = await redis.get(`feature:${feature}:percent`);
    if (rolloutPercent) {
      const hash = hashUserId(userId); // Simple hash function
      if (hash % 100 < parseInt(rolloutPercent)) return true;
    }
  }

  return false;
}

// CLI para activar features (desde terminal SSH)
export async function enableFeature(feature: string, percent: number = 100) {
  await redis.set(`feature:${feature}:enabled`, '1');
  await redis.set(`feature:${feature}:percent`, percent.toString());
  console.log(`✅ Feature "${feature}" habilitada para ${percent}% de usuarios`);
}
```

**Uso en código:**

```typescript
// src/routes/dashboard/+page.server.ts
import { isFeatureEnabled } from '$lib/server/features/flags';

export const load = async ({ locals }) => {
  const showNewDashboard = await isFeatureEnabled('NEW_DASHBOARD', locals.user?.id);

  return {
    showNewDashboard,
    // ...resto del código
  };
};
```

---

### 2. GitHub Projects: Setup del Roadmap (Gratis)

Configurar GitHub Projects con las columnas correctas para Shape Up cycles.

**Estructura recomendada:**

```
Proyecto: PRO_FINAN_CONTA_PYM Roadmap 2026

Columnas:
1. 🗓️ Icebox (Algún día/tal vez)
2. 📋 Backlog (Próximos 3 meses)
3. 🔨 Current Cycle (6 semanas)
4. 🧪 Testing
5. ✅ Shipped

Labels:
- Priority: P0 (Bloqueante), P1 (Alto), P2 (Medio), P3 (Bajo)
- Type: Feature, Bug, Tech Debt, Research
- Size: Small (1-3 días), Medium (1 semana), Large (2-3 semanas), Huge (4-6 semanas)
```

**Cómo priorizar features (RICE Scoring simplificado):**

```
RICE = (Reach × Impact × Confidence) / Effort

Reach: ¿Cuántos usuarios afectará? (1-10)
Impact: ¿Qué tan importante es? (0.25=mínimo, 0.5=bajo, 1=medio, 2=alto, 3=masivo)
Confidence: ¿Qué tan seguros estamos? (50%, 80%, 100%)
Effort: ¿Cuántos días-persona? (0.5, 1, 2, 5, 10, etc.)

Ejemplo:
Feature: "Importar CFDIs automáticamente desde SAT"
Reach: 9 (casi todos los usuarios lo usarán)
Impact: 3 (masivo, es el core value)
Confidence: 80% (ya tenemos la arquitectura)
Effort: 10 días

RICE = (9 × 3 × 0.8) / 10 = 2.16 ⭐ (Prioridad ALTA)
```

---

### 3. Tracker de Eventos (PostHog self-hosted, $0)

Abstracción para enviar eventos a PostHog sin vendor lock-in.

```typescript
// src/lib/analytics/tracker.ts
import posthog from 'posthog-js';

type EventName =
  | 'signup_completed'
  | 'invoice_created'
  | 'subscription_started'
  | 'tax_report_downloaded'
  | 'onboarding_step_completed';

export const trackEvent = (
  event: EventName,
  properties: Record<string, any> = {}
) => {
  // Solo en cliente (browser)
  if (typeof window !== 'undefined') {
    posthog.capture(event, {
      ...properties,
      timestamp: new Date().toISOString(),
    });
  }
};

// Server-side tracking (para eventos críticos)
export const trackServerEvent = async (
  userId: string,
  event: EventName,
  properties: Record<string, any> = {}
) => {
  await fetch('http://localhost:8000/capture', { // PostHog self-hosted
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.POSTHOG_API_KEY,
      event,
      distinct_id: userId,
      properties,
    }),
  });
};
```

---

## 💡 Mentalidad Bootstrap: Founder-PM

### Qué hace el Founder (Manual, primeros 6-12 meses):

1. **Hablar con usuarios** (mínimo 2 por semana vía WhatsApp/Zoom).
2. **Escribir PRDs ultra-simples** (1 página máx, problema + solución + KPIs).
3. **Priorizar con RICE** (Excel, 15 min).
4. **Mover issues en GitHub Projects** (5 min/día).
5. **Revisar métricas clave** (SQL queries directas a PostgreSQL + PostHog dashboards).

### Cuándo contratar PM:

- **NUNCA antes de Product-Market Fit** (PMF = retención > 40%, NPS > 30, payback < 6 meses).
- **Solo cuando Founder no puede codear** por estar en reuniones todo el día.
- **Costo estimado:** $50k-80k MXN/mes (cuando MRR > $500k).

### Herramientas Prohibidas (Demasiado Caras):

- ❌ **Jira:** $10 USD/user/mes (~$10k/año para 10 personas).
- ❌ **Asana:** $24.99 USD/user/mes (~$25k/año).
- ❌ **Aha!:** $59 USD/user/mes (PM tools corporativos).
- ❌ **Productboard:** $49 USD/user/mes (feedback management).
- ❌ **LaunchDarkly:** $2k-10k/mes (feature flags enterprise).

---

## 🇲🇽 Adaptación México Profundo

### 1. Priorizar Features "Gama Baja" Primero

No empezar por "dashboards cool con gráficas 3D". Empezar por:

1. Conexión con SAT (CFDIs automáticos).
2. Reconciliación bancaria simple (tabla, no gráficas).
3. Recordatorios de impuestos (WhatsApp, no push notifications fancy).

**Orden de prioridad:**

1. ✅ **Funciona sin internet** (Service Workers, IndexedDB).
2. ✅ **Carga rápido en 3G** (bundle <200KB).
3. ✅ **No consume datos** (cache agresivo).
4. 🟡 Se ve bonito (cuando ya funcione todo lo anterior).

### 2. User Research Sin Presupuesto

No pagar por UserTesting.com ($100 USD/sesión). Hacer:

```
Estrategia de Feedback Directo:
1. WhatsApp Business (gratis) - Grupo "Beta Testers PRO_FINAN"
2. Google Forms (gratis) - Encuesta post-onboarding
3. Llamadas Zoom (gratis, 40 min) - 2 usuarios/semana
4. Observar Analytics (PostHog) - ¿Dónde se atascan?

Incentivos:
- NO pagar dinero (no tenemos).
- Ofrecer: "Acceso early-bird, tu nombre en los créditos, Plan Pro gratis 6 meses"
```

### 3. Roadmap Transparente (México Valora la Honestidad)

Publicar roadmap **público** en la landing page:

```
🗓️ Roadmap 2026 (Próximos 6 meses)

✅ Ene-Feb: MVP (Facturas + SAT)
🔨 Mar-Abr: Reconciliación bancaria (Open Banking)
📋 May-Jun: Reportes contables básicos
🗓️ Jul-Ago: Nómina digital
🗓️ Sep-Oct: Integración marketplaces (ML, Amazon)
```

**Ventaja:** Genera expectativa y reduce el "¿cuándo va a estar X feature?" vía WhatsApp.

---

## 🔗 Referencias

- **Shape Up (Basecamp):** Metodología de 6-week cycles sin Scrum burocrático.
- **RICE Scoring:** Framework de Intercom para priorizar features.
- **Lean Analytics:** Métricas que importan en cada etapa (Traction, Alistair Croll).
- **GitHub Projects:** https://docs.github.com/en/issues/planning-and-tracking-with-projects

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Founder-PM, Cero Herramientas de Pago)*
