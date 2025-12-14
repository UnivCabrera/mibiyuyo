# 📊 RESUMEN EJECUTIVO BLOQUE D: PRODUCTO Y DISEÑO HUMANO

**Auditoría Estratégica - Reingeniería Bootstrap**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo + Infraestructura Dokploy
**Fecha:** 9 Diciembre 2025
**Versión:** 1.0

---

## 🎯 RESUMEN EJECUTIVO

### ¿Qué es el Bloque D?

Reingeniería completa de **9 roles de Producto y Diseño** (Perfiles 21-29) bajo la estrategia Bootstrap, eliminando contrataciones innecesarias y sustituyéndolas por:

1. **Herramientas open source** (PostHog, shadcn-svelte, Loom)
2. **Automatización** (BullMQ, PostgreSQL, ElysiaJS)
3. **Documentación como código** (Tracking Plans, Copy Guidelines)
4. **Framework científico** (`04_NEUROFINANZAS_FRAMEWORK.md` - 12 secciones)

**Resultado:** De $2.65M-3.54M MXN/año (salarios + SaaS) → **$200 MXN/mes** (solo VPS).

---

## 💰 AHORRO TOTAL BLOQUE D

| Concepto Original | Costo Mensual Tradicional | Costo Bootstrap | Ahorro Anual |
|:------------------|:-------------------------|:----------------|:-------------|
| **Salarios (9 roles)** | $335k-445k MXN/mes | $0 | $4.02M-5.34M MXN |
| **Herramientas SaaS** | $6k-24k USD/mes (~$120k-480k MXN) | $0 | $1.44M-5.76M MXN |
| **Consultoría puntual** | N/A | ~$50k-80k MXN/año | N/A |
| **TOTAL** | $2.65M-3.54M MXN/año | **$50k-80k MXN/año** | **$2.57M-3.46M MXN/año** |

**Reducción de costos:** **98.1% - 98.8%**

---

## 📋 PERFILES REINGENIADOS (21-29)

### Perfil 21: Product Manager → Founder como PM + GitHub Projects

**Transformación:**

- ❌ Contratar PM ($50k-70k/mes)
- ✅ Founder ejecuta decisiones con Shape Up simplificado (ciclos 6 semanas)
- ✅ GitHub Projects (gratis, ya incluido) o Linear (capa gratis)
- ✅ Roadmap público en Markdown

**Herramientas:**

- GitHub Projects (kanban, issues, milestones)
- Linear Free Tier (10 usuarios)
- Tracking de OKRs en PostgreSQL

**Ahorro:** $600k-840k MXN/año

---

### Perfil 22: UX Researcher → Feedback Directo WhatsApp + 100 Necesidades

**Transformación:**

- ❌ Contratar UX Researcher ($40k-60k/mes)
- ❌ Herramientas caras (Hotjar $39-99/mes, UserTesting $10k+ USD)
- ✅ Botón WhatsApp flotante para feedback directo
- ✅ PostHog Session Replay (self-hosted) para ver bugs
- ✅ Documento maestro: `07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` (investigación ya hecha)

**Implementación:**
```svelte
<!-- Botón WhatsApp Flotante -->
<a
  href="https://wa.me/5215512345678?text=Tengo%20un%20comentario%20sobre%20la%20app"
  class="whatsapp-float"
  target="_blank"
>
  <MessageCircle size={24} />
</a>
```

**Ahorro:** $480k-720k MXN/año

---

### Perfil 23: UI Designer → Diseño en Código (shadcn-svelte + Open Props)

**Transformación:**

- ❌ Contratar UI Designer ($35k-50k/mes)
- ❌ Herramientas de diseño (Figma Pro $15-45 USD/user/mes)
- ✅ Diseño directo en código con shadcn-svelte
- ✅ Open Props (CSS variables open source)
- ✅ Lucide Icons (1,000+ iconos gratis)

**Componentes listos:**

- **shadcn-svelte:** 45+ componentes accesibles (Button, Card, Dialog, etc.)
- **Bits UI:** Primitivos sin estilo (headless)
- **Open Props:** Sistema de diseño CSS (~7KB)

**Ventajas México Profundo:**

- Bundle ultra-light (<200KB)
- Sin dependencia de conexión (CSS nativo)
- Rendimiento en gama baja (Android $3,000 MXN)

**Ahorro:** $420k-600k MXN/año

---

### Perfil 24: Accessibility Specialist → Gama Baja + Alto Contraste

**Transformación:**

- ❌ Contratar Accessibility Specialist ($40k-55k/mes)
- ❌ Auditorías pagas ($5k-15k USD cada una)
- ✅ shadcn-svelte (ARIA nativo, WCAG 2.1 AA)
- ✅ Lighthouse CI (gratis, GitHub Actions)
- ✅ Diseño para celulares viejos (no para discapacidad tradicional)

**Adaptaciones México:**

- **Alto contraste:** Visible bajo sol directo
- **Áreas táctiles grandes:** 48x48px mínimo (dedos grandes)
- **Fuentes legibles:** System fonts, 16px mínimo
- **Sin dependencia de color:** Iconos + texto

**Herramientas:**

- Lighthouse (auditoría automática)
- axe DevTools (gratis)
- NVDA/JAWS (screen readers para testear)

**Ahorro:** $480k-660k MXN/año

---

### Perfil 25: Content Strategist → Founder + Plantillas i18n

**Transformación:**

- ❌ Contratar Content Writer ($35k-50k/mes)
- ❌ Agencias de branding ($100k-300k por proyecto)
- ✅ Tono Anti-Corporativo ya definido (`04_NEUROFINANZAS_FRAMEWORK.md` Sección 7)
- ✅ paraglide-js (i18n nativo Svelte, 0KB runtime)
- ✅ Svelte-Email + Resend (3k emails gratis/mes)
- ✅ Tooltips con shadcn-svelte para términos financieros

**Implementación Clave:**

```typescript
// src/lib/i18n/es-MX.json
{
  "dashboard": {
    "welcome": "Hola, {name} 👋",
    "balance_label": "Tienes disponible:",
    "empty_state": "Aún no tienes movimientos. Agrega tu primer gasto para empezar."
  },
  "tooltips": {
    "rfc": "Tu Registro Federal de Contribuyentes (13 caracteres). Lo encuentras en tu Cédula Fiscal.",
    "cfdi": "Comprobante Fiscal Digital por Internet. Es tu factura electrónica válida ante el SAT."
  }
}
```

**Plantillas Email:**

- Bienvenida
- Verificación (2FA)
- Recuperación password
- Meta completada
- Recordatorio impuestos

**Ahorro:** $420k-600k MXN/año

---

### Perfil 26: Behavioral Economist → Nudges Automatizados (BullMQ)

**Transformación:**

- ❌ Contratar Behavioral Economist ($45k-65k/mes)
- ✅ Motor de nudges con reglas if/then
- ✅ BullMQ (cron jobs diarios)
- ✅ Framework Neurofinanzas (20+ sesgos cognitivos documentados)

**Nudges Implementados:**

| Nudge | Trigger | Objetivo |
|:------|:--------|:---------|
| **Ahorro** | Saldo >$10k, ahorro <$1k | Crear meta de emergencia |
| **SAT** | Días 10-16 del mes | Recordar declaración (día 17) |
| **Racha** | 2 días inactivo | Recuperar racha de X días |
| **Meta cercana** | Progreso >80% | Goal Gradient Effect (motivar) |

**Schema PostgreSQL:**

```typescript
export const userNudges = pgTable('behavioral_nudges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  nudgeType: text('nudge_type').notNull(),
  message: text('message').notNull(),
  ctaText: text('cta_text'),
  ctaLink: text('cta_link'),
  isDismissed: boolean('is_dismissed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Sesgos Mexicanos:**

- **Aversión a pérdida:** "No dejes que el SAT te multe"
- **Anclaje:** "Tu vecino ya ahorró $10,000"
- **FOMO:** "Solo 3 espacios para plan PRO"

**Ahorro:** $540k-780k MXN/año

---

### Perfil 27: Gamification Expert → Sistema Puntos PostgreSQL (Estilo Duolingo)

**Transformación:**

- ❌ Contratar Gamification Expert ($40k-55k/mes)
- ❌ Plataformas de gamificación (Badgeville $500-2k USD/mes)
- ✅ PostgreSQL JSONB (puntos, badges, rachas)
- ✅ BullMQ (detectar logros diarios)
- ✅ Lucide Icons (badges visuales)

**Sistema de Puntos:**

| Acción | Puntos | Frecuencia |
|:-------|:-------|:-----------|
| Registrar transacción | 5 | Ilimitada |
| Crear meta | 30 | Ilimitada |
| Completar meta | 100 | Ilimitada |
| Declarar a tiempo | 50 | Mensual |
| Racha 7 días | 50 | Semanal |
| Referir amigo | 75 | Ilimitada |

**Regla:** 100 puntos = 1 nivel (máx 50 niveles)

**Badges (15 Insignias):**

- 🌟 Primera Transacción
- 🔥 7 Días Seguidos
- 🏆 30 Días Seguidos
- 👑 100 Días de Constancia
- 🎯 Primera Meta
- ✅ Meta Completada
- 💰 Ahorrador Experto
- 📄 Héroe Fiscal
- ⏰ Declaración Puntual
- 👥 Embajador
- 📈 100 Movimientos
- 📊 Ninja del Presupuesto
- 🛡️ Libre de Deudas
- 🚀 Libertad Financiera

**Implementación:**

```typescript
// Schema JSONB
export const userGamification = pgTable('user_gamification', {
  userId: text('user_id').primaryKey(),
  totalPoints: integer('total_points').default(0),
  level: integer('level').default(1),
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  badges: jsonb('badges').$type<string[]>().default([]),
  // ['FIRST_TRANSACTION', 'TAX_HERO', '7_DAY_STREAK']
});
```

**Ahorro:** $480k-660k MXN/año

---

### Perfil 28: Data Analyst → PostHog Self-Hosted + SQL

**Transformación:**

- ❌ Contratar Data Analyst ($40k-60k/mes)
- ❌ Mixpanel/Amplitude ($299-2k USD/mes)
- ✅ PostHog Open Source (self-hosted en Dokploy)
- ✅ Tracking Plan documentado (Markdown)
- ✅ Queries SQL directos para análisis custom

**PostHog Incluye:**

- Event tracking
- Funnels
- Cohortes (retención)
- Session replay
- Feature flags
- A/B testing

**Tracking Plan (Eventos Core):**

**Onboarding:**

- `signup_started`
- `signup_completed`
- `onboarding_step_completed`
- `onboarding_completed`

**Core Value:**

- `transaction_added` (primera activación)
- `goal_created`
- `invoice_uploaded`
- `sat_connected`

**Engagement:**

- `dashboard_viewed`
- `report_generated`
- `goal_completed`
- `streak_milestone`

**Monetization:**

- `pricing_page_viewed`
- `subscription_activated`
- `subscription_cancelled`

**Funnels a Analizar:**

1. Signup → Onboarding → First Transaction (Activación)
2. Free → Pricing → Paid (Monetización)
3. Goal Created → Goal Completed (Engagement)

**Instalación Dokploy:**

```yaml
# docker-compose.posthog.yml
version: '3.8'
services:
  posthog:
    image: posthog/posthog:latest
    environment:
      - POSTHOG_REDIS_HOST=redis
      - POSTHOG_POSTGRES_HOST=postgres
      - SITE_URL=https://analytics.fintech.mx
    ports:
      - "8000:8000"
```

**Privacidad LFPDPPP:**

- Opt-in obligatorio
- Mask de datos sensibles
- Session replay solo con consentimiento

**Ahorro:** $480k-720k MXN/año

---

### Perfil 29: Onboarding Specialist → Wizard Svelte A Prueba de Tontos

**Transformación:**

- ❌ Contratar Onboarding Specialist ($35k-50k/mes)
- ❌ Herramientas de onboarding (Appcues/Pendo $300-2k USD/mes)
- ✅ Wizard de 5 pasos (<2.5 minutos)
- ✅ Checklist progresivo en dashboard
- ✅ Videos cortos (1-2 min) con Loom gratis
- ✅ Empty states educativos

**Wizard de 5 Pasos:**

1. 👋 **Bienvenida** - ¿Quién eres? (Freelance, PyME, Contador, Empleado)
2. 🎯 **Tu Meta** - ¿Qué quieres lograr? (Ahorrar, Impuestos, Control, Crecer)
3. 💰 **Ingreso Mensual** - Rangos (no exacto): <$10k, $10k-30k, $30k-50k, >$50k
4. 📊 **Primera Transacción** - Registra gasto ejemplo ($50 café)
5. ✅ **Listo** - Ver dashboard con datos de ejemplo

**Implementación Svelte 5:**

```svelte
<script lang="ts">
  let currentStep = $state(1);
  let formData = $state({
    profileType: '',
    goal: '',
    incomeRange: '',
    firstTransaction: { description: 'Café', amount: 50 }
  });

  let progress = $derived((currentStep / 5) * 100);
  let canContinue = $derived(() => {
    if (currentStep === 1) return formData.profileType !== '';
    if (currentStep === 2) return formData.goal !== '';
    if (currentStep === 3) return formData.incomeRange !== '';
    if (currentStep === 4) return formData.firstTransaction.amount > 0;
    return true;
  });
</script>

<Progress value={progress} class="h-2" />
<p class="text-sm">Paso {currentStep} de 5</p>
```

**Checklist de Activación:**

- ✅ Registra tu primera transacción
- ✅ Crea una meta de ahorro
- ✅ Conecta tu cuenta del SAT
- ✅ Configura tu presupuesto mensual

**Videos Tutoriales:**

| Video | Duración | Tema |
|:------|:---------|:-----|
| 1 | 60 seg | ¿Qué es FinTech? |
| 2 | 90 seg | Primer gasto |
| 3 | 120 seg | Metas de ahorro |
| 4 | 120 seg | Conectar SAT |
| 5 | 120 seg | Declaración provisional |

**Email Drip (BullMQ):**

| Día | Email | CTA |
|:----|:------|:----|
| 0 | Bienvenida | Completar onboarding |
| 3 | Primer valor | Ver video tutorial |
| 7 | Recuperación | ¿Necesitas ayuda? |

**Ahorro:** $420k-600k MXN/año

---

## 🛠️ HERRAMIENTAS BOOTSTRAP (BLOQUE D)

### Open Source / Gratis

| Herramienta | Función | Costo |
|:------------|:--------|:------|
| **shadcn-svelte** | UI components | $0 |
| **Bits UI** | Primitivos headless | $0 |
| **Open Props** | Sistema de diseño CSS | $0 |
| **Lucide Icons** | 1,000+ iconos | $0 |
| **paraglide-js** | i18n Svelte | $0 |
| **PostHog** | Analytics self-hosted | $0 |
| **BullMQ** | Job queues | $0 |
| **PostgreSQL JSONB** | Gamificación | $0 |
| **GitHub Projects** | PM kanban | $0 |
| **Loom** | Videos tutoriales | $0 (25 videos) |
| **Svelte-Email** | Email templates | $0 |
| **Resend** | Email transaccional | $0 (3k/mes) |
| **Lighthouse CI** | Accessibility audits | $0 |
| **Cloudflare R2** | Video hosting | $0.015/GB |

### Prohibidas (SaaS Caros)

| Herramienta | Costo Mensual | Razón de Exclusión |
|:------------|:-------------|:-------------------|
| Mixpanel | $299-2k USD | PostHog self-hosted |
| Amplitude | $299-2k USD | PostHog self-hosted |
| Appcues | $300-2k USD | Wizard Svelte nativo |
| Pendo | $500-2k USD | Wizard Svelte nativo |
| Hotjar | $39-99 USD | PostHog Session Replay |
| Badgeville | $500-2k USD | PostgreSQL JSONB |
| Figma Pro | $15-45 USD | Diseño en código |

**Total ahorrado en SaaS:** $1.44M-5.76M MXN/año

---

## 📊 COMPARATIVA: TRADICIONAL VS BOOTSTRAP

### Escenario Tradicional (Corporate)

| Rol | Salario Mensual | SaaS Mensual | Total Anual |
|:----|:---------------|:------------|:------------|
| Product Manager | $60k | - | $720k |
| UX Researcher | $50k | Hotjar $99 USD (~$2k) | $624k |
| UI Designer | $42k | Figma Pro $45 USD (~$900) | $514.8k |
| Accessibility | $47k | Auditorías $10k USD/año (~$180k) | $744k |
| Content Writer | $42k | - | $504k |
| Behavioral Economist | $55k | - | $660k |
| Gamification | $47k | Badgeville $500 USD (~$10k) | $684k |
| Data Analyst | $50k | Mixpanel $299 USD (~$6k) | $672k |
| Onboarding | $42k | Appcues $300 USD (~$6k) | $576k |
| **TOTAL** | **$435k/mes** | **~$24k MXN/mes** | **$5.7M MXN/año** |

### Escenario Bootstrap (Nosotros)

| Concepto | Costo Mensual | Total Anual |
|:---------|:-------------|:------------|
| VPS Hostinger | $200 MXN | $2.4k |
| Resend (email) | $0-400 MXN | $0-4.8k |
| Cloudflare R2 | ~$50 MXN | $600 |
| Consultoría puntual | ~$5k-7k MXN | $50k-80k |
| **TOTAL** | **~$5k-8k MXN/mes** | **$53k-87k MXN/año** |

**Ahorro:** $5.7M → $87k = **98.5% reducción**

---

## 🎯 MÉTRICAS DE ÉXITO (KPIs)

### Activación (D7)

- **Onboarding completado:** >60%
- **Primera transacción:** >70% (dentro de 7 días)
- **Meta creada:** >40%

### Engagement

- **D7 Retention:** >40%
- **D30 Retention:** >20%
- **Racha promedio:** >10 días

### Conversión

- **Free → Paid (30 días):** >5%
- **Funnel Checkout → Payment:** >70%

### Calidad UX

- **Lighthouse Score:** >90
- **Bundle size:** <200KB gzipped
- **FCP (First Contentful Paint):** <1.5s en 3G
- **TTI (Time to Interactive):** <3s

---

## 🇲🇽 ADAPTACIONES MÉXICO PROFUNDO

### 1. Lenguaje

- **Tutear siempre:** "Tu saldo" (no "Su saldo")
- **Evitar jargón:** "Dinero disponible" (no "Capital líquido")
- **Emojis estratégicos:** ✅ Listo (refuerzo dopamina)
- **Acción clara:** "Guardar cambios" (no "Proceder")
- **Cero culpa:** "Intenta de nuevo" (no "Error del usuario")

### 2. Tooltips Educativos

Explicar términos que el 60% de mexicanos no conoce:

- **RFC:** "Tu Registro Federal de Contribuyentes. Como tu INE, pero para impuestos."
- **CFDI:** "Comprobante Fiscal Digital. Es el nombre oficial de las facturas electrónicas."
- **Régimen Fiscal:** "Cómo declaras impuestos (ej: 'Sueldos y Salarios' si tienes nómina)."

### 3. Sesgos Culturales

- **Aversión a pérdida:** "No dejes que el SAT te multe $15,000"
- **Prueba social:** "Tu vecino en CDMX ya ahorró $10,000"
- **Urgencia real:** "El 17 de enero vence" (no clickbait)

### 4. Gama Baja

- **Alto contraste:** Visible bajo sol directo
- **Áreas táctiles:** 48x48px mínimo
- **Fuentes legibles:** System fonts, 16px+
- **Bundle <200KB:** Para 3G lento

### 5. Privacidad LFPDPPP

- **Opt-in analytics:** Usuario debe aceptar explícitamente
- **Mask data:** RFC, cuentas bancarias, passwords
- **Session replay:** Solo con consentimiento

---

## 🚧 ORDEN DE IMPLEMENTACIÓN

### Semana 1 (Crítico)

- ✅ Wizard onboarding (Perfil 29)
- ✅ Checklist activación (Perfil 29)
- ✅ Sistema i18n (Perfil 25)
- ✅ Tooltips términos financieros (Perfil 25)

### Semana 2 (Alto)

- ✅ Schema gamificación (Perfil 27)
- ✅ Motor de nudges (Perfil 26)
- ✅ PostHog self-hosted (Perfil 28)
- ✅ Email welcome drip (Perfil 25)

### Semana 3 (Medio)

- ✅ Sistema de rachas (Perfil 27)
- ✅ Videos tutoriales (Perfil 29)
- ✅ Tracking Plan (Perfil 28)
- ✅ Badges visuales (Perfil 27)

### Fase 2 (Bajo/Opcional)

- Session replay (Perfil 28)
- Leaderboards anónimos (Perfil 27)
- Onboarding adaptativo (Perfil 29)
- Feature flags (Perfil 28)

---

## 📖 DOCUMENTACIÓN DE REFERENCIA

### Framework Científico

- **`05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md`** (718 líneas)
  - Sección 1: Fundamentos científicos (neurotransmisores)
  - Sección 2: Neurociencia cognitiva (Ley de Miller, sesgos)
  - Sección 3: Neurociencia afectiva (dopamina, serotonina, cortisol)
  - Sección 4: Onboarding adaptativo (scaffolding)
  - Sección 7: Sistema de mensajería neuro-optimizado
  - Sección 10: Gamificación neurocognitiva

### Investigación de Mercado

- **`03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md`** (641 líneas)
  - 100 necesidades identificadas
  - 5 categorías: Finanzas diarias, Vida profesional, Hogar, Consumo, Social
  - Fuentes: INEGI, tendencias Twitter, grupos Facebook/Reddit

### Stack Tecnológico

- **`00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md`** (920 líneas)
  - Dokploy (PaaS self-hosted)
  - Svelte 5 + SvelteKit
  - shadcn-svelte + Bits UI
  - PostgreSQL 16+ + Drizzle ORM
  - Redis 7+ + BullMQ
  - Resend (email transaccional)

---

## ✅ CHECKLIST DE COMPLETITUD

### Documentación

- [x] 9 perfiles reescritos (21-29)
- [x] Framework Neurofinanzas aplicado (12 secciones)
- [x] 100 Necesidades investigadas
- [x] Tono de voz definido (Anti-Corporativo)
- [x] Tracking Plan (eventos core)
- [x] Email templates (Svelte-Email)
- [x] Wizard onboarding (5 pasos)

### Código de Ejemplo

- [x] Schema gamificación (PostgreSQL JSONB)
- [x] Motor de nudges (BullMQ)
- [x] Sistema de rachas (date-fns)
- [x] Wizard Svelte 5 (Runes)
- [x] Checklist progresivo (shadcn-svelte)
- [x] PostHog config (Docker Compose)
- [x] Tooltips términos (shadcn Tooltip)
- [x] i18n setup (paraglide-js)

### Herramientas Configuradas

- [x] shadcn-svelte (UI)
- [x] Bits UI (primitivos)
- [x] Open Props (CSS)
- [x] Lucide Icons (SVG)
- [x] PostgreSQL (gamificación)
- [x] BullMQ (jobs)
- [x] Resend (email)
- [x] Loom (videos)

---

## 🎉 CONCLUSIÓN

**El Bloque D demuestra que el "Diseño de Producto de Clase Mundial" NO requiere:**

- ❌ Equipo de 9 personas ($5.7M/año)
- ❌ Herramientas SaaS caras ($1.44M-5.76M/año)
- ❌ Agencias de branding ($100k-300k por proyecto)
- ❌ Auditorías de UX ($5k-15k USD cada una)

**Requiere:**

- ✅ Framework científico bien documentado (`04_NEUROFINANZAS_FRAMEWORK.md`)
- ✅ Herramientas open source (shadcn, PostHog, BullMQ)
- ✅ Automatización inteligente (nudges, gamificación)
- ✅ Founder con ejecución disciplinada

**Próximo Paso:**

Implementar en orden: Semana 1 (Onboarding + i18n) → Semana 2 (Gamificación + Nudges + PostHog) → Semana 3 (Rachas + Videos + Tracking).

---

## 📞 CONTACTO DE SEGUIMIENTO

Si necesitas profundizar en algún perfil específico:

- **Perfil 25 (Copy):** Ver `25_CONTENT_STRATEGIST.md` (plantillas i18n, email templates)
- **Perfil 26 (Nudges):** Ver `26_BEHAVIORAL_ECONOMIST.md` (motor BullMQ, sesgos mexicanos)
- **Perfil 27 (Gamificación):** Ver `27_GAMIFICATION_EXPERT.md` (schema JSONB, badges)
- **Perfil 28 (Analytics):** Ver `28_DATA_ANALYST.md` (PostHog Dokploy, tracking plan)
- **Perfil 29 (Onboarding):** Ver `29_USER_ONBOARDING.md` (wizard Svelte 5, videos)

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (98.5% reducción de costos, Cero Contrataciones)*
*Ahorro Total Bloque D: $2.57M-3.46M MXN/año*
