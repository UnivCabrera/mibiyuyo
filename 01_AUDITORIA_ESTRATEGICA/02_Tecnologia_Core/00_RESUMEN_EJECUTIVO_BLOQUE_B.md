# 📊 RESUMEN EJECUTIVO: BLOQUE B (Tecnología Core)

**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025
**Reingeniería:** Bootstrap + México Profundo + Infra Dokploy

---

## 🎯 Objetivo de la Reingeniería

Transformar 9 perfiles tradicionales de tecnología (que costarían **$3.2M-5.4M MXN/año**) en una operación **Founder-led de $200 MXN/mes** usando:

1. **Dokploy** (PaaS self-hosted, elimina DevOps manual)
2. **Open Source** (Bun, ElysiaJS, Svelte 5, PostgreSQL, Redis)
3. **Founder como Desarrollador** (learning curve 2-3 meses)
4. **Optimización Gama Baja** (Android $3,000 MXN, 3G, bundle < 200KB)

---

## 📋 Perfiles Transformados (08-16)

| Perfil | Antes (Tradicional) | Después (Bootstrap) | Ahorro Anual |
|:-------|:-------------------|:--------------------|:-------------|
| **08 - Arquitecto Software** | $60k-100k/mes | Founder + Docker + Offline-First | **$720k-1.2M MXN** |
| **09 - DevOps Engineer** | $40k-60k/mes | Founder + Dokploy UI | **$480k-720k MXN** |
| **10 - Backend Lead** | $50k-80k/mes | Founder + ElysiaJS | **$600k-960k MXN** |
| **11 - Frontend Lead** | $45k-70k/mes | Founder + Svelte 5 Gama Baja | **$540k-840k MXN** |
| **12 - QA Automation** | $35k-50k/mes | Founder + Playwright local | **$420k-600k MXN** |
| **13 - DBA PostgreSQL** | $40k-60k/mes | Founder + Drizzle ORM | **$480k-720k MXN** |
| **14 - Mobile Developer** | $40k-60k/mes | PWA (no apps nativas) | **$480k-720k MXN** |
| **15 - UX/UI Designer** | $30k-50k/mes | Founder + shadcn-svelte + Neurociencias | **$360k-600k MXN** |
| **16 - Data Scientist** | $50k-80k/mes | Scripts Python + Cloudflare AI | **$600k-960k MXN** |
| **TOTAL BLOQUE B** | **$390k-610k/mes** | **$200/mes (solo VPS)** | **$4.68M-7.32M MXN/año** |

---

## 🔧 Stack Tecnológico Definitivo (Respetado 100%)

| Categoría | Tecnología | Versión | Justificación Bootstrap |
|:----------|:-----------|:--------|:------------------------|
| **Runtime** | Bun | 1.3.3+ | 3x más rápido que Node.js, built-in TypeScript |
| **Backend** | ElysiaJS | 1.4.16+ | Type-safety nativo, Eden Treaty (types frontend↔backend) |
| **Frontend** | Svelte 5 (Runes) | 5.x | Bundle 40% más ligero que React, Runes = 0KB overhead |
| **ORM** | Drizzle | 0.38+ | Type-safe SQL, 0 runtime overhead vs Prisma |
| **Base de Datos** | PostgreSQL | 16+ | ACID compliant, JSONB para datos SAT |
| **Cache** | Redis | 7+ | Sesiones, rate limiting, jobs (BullMQ) |
| **Estilos** | CSS + Open Props | - | ❌ NO TAILWIND (demasiado peso en runtime) |
| **UI Components** | shadcn-svelte + Bits UI | Latest | Accesibles (ARIA), copiables, personalizables |
| **Auth** | Better Auth | Latest | Self-hosted (no Auth0 $35-240/mes) |
| **Infra** | Dokploy + Hostinger VPS | KVM 2 | $200 MXN/mes total (vs AWS $500+/mes) |
| **CI/CD** | GitHub Actions (free) | - | 2,000 min/mes gratis (suficiente para tests) |
| **Monitoring** | GlitchTip (self-hosted) | Latest | Reemplaza Sentry ($29-80/mes) |
| **Backups** | Cloudflare R2 | - | 10GB gratis/mes (vs AWS S3 $23/mes) |

---

## 💡 Decisiones Clave (Integridad Documental)

### ✅ Respetadas del `03_STACK_TECNOLOGICO_DEFINITIVO.md`:

1. **Bun (NO Node.js)**: Runtime oficial, Dockerfile con `oven/bun:1.3.3-alpine`
2. **ElysiaJS (NO Express/Fastify)**: Framework obligatorio para backend
3. **Svelte 5 Runes (NO React/Vue)**: Sintaxis obligatoria ($state, $derived, $effect)
4. **Drizzle ORM (NO Prisma)**: Prisma Cloud tiene costos, Drizzle es 100% gratis
5. **Dokploy (NO manual Linux)**: Founder usa UI web, no necesita SSH expertise
6. **CSS + Open Props (NO Tailwind)**: Tailwind prohibido por peso en runtime

### ❌ Eliminadas (Bootstrap):

1. **Datadog/NewRelic** ($500-2,000/mes) → Prometheus básico + logs Dokploy (gratis)
2. **Sentry** ($29-80/mes) → GlitchTip self-hosted (gratis)
3. **Auth0** ($35-240/mes) → Better Auth self-hosted (gratis)
4. **BrowserStack** ($39-129/mes) → Playwright local + GitHub Actions (gratis)
5. **PagerDuty** ($21-41/mes) → WhatsApp Baileys (gratis)
6. **AWS S3 Backups** ($23+/mes) → Cloudflare R2 10GB gratis

---

## 🇲🇽 Adaptaciones México Profundo (Gama Baja)

### Perfil del Usuario Objetivo:

- **Dispositivo:** Android $3,000-5,000 MXN (Samsung A14, Xiaomi Redmi Note 12)
- **Specs:** 4GB RAM, 64GB storage, Snapdragon 680 (mid-range 2023)
- **Conexión:** 3G/4G inestable (10-50 Mbps ciudad, <5 Mbps rural)
- **Navegador:** Chrome Android (últimas 2 versiones)

### Requisitos Técnicos NO NEGOCIABLES:

| Métrica | Target | Herramienta Medición |
|:--------|:-------|:---------------------|
| **Bundle Total** | < 200KB gzipped | `rollup-plugin-visualizer` |
| **FCP (First Contentful Paint)** | < 1.5s en 3G | Lighthouse CI |
| **TTI (Time to Interactive)** | < 3s en 3G | Lighthouse CI |
| **Imágenes** | WebP < 50KB cada una | `@sveltejs/enhanced-img` |
| **Fuentes** | Max 2 familias, WOFF2 subset | Google Fonts + `unicode-range` |
| **JavaScript** | 0 librerías pesadas | Ver tabla prohibiciones ⬇️ |

### Prohibiciones Absolutas (Librerías Pesadas):

| ❌ Librería Prohibida | Tamaño | ✅ Alternativa Nativa (0KB) |
|:--------------------|:-------|:---------------------------|
| moment.js | 67KB | `Intl.DateTimeFormat` |
| lodash | 71KB | Array methods (`map`, `filter`, `reduce`) |
| axios | 13KB | `fetch` API nativo |
| jQuery | 87KB | Vanilla JS + Svelte |
| Chart.js completo | 180KB | `chart.js/auto` (60KB) o SVG manual |
| Zod en frontend | 12KB | Validar solo backend (Eden Treaty propaga tipos) |
| TanStack Table | 45KB | Tabla HTML + sorting ligero |

---

## 📝 Entregables por Perfil (Implementación)

### Perfil 08: Arquitecto Software (Docker + Offline-First)

**Entregables:**

- ✅ `backend/Dockerfile` (multi-stage Bun 1.3.3)
- ✅ `frontend/Dockerfile` (multi-stage Node.js 24)
- ✅ `frontend/src/service-worker.ts` (Workbox strategies)
- ✅ `dokploy.yaml` (resource limits, healthcheck)
- ✅ Bundle optimization rules (< 200KB gzipped)

**Código Clave:**
```dockerfile
# Backend Dockerfile (Bun)
FROM oven/bun:1.3.3-alpine AS build
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun build src/index.ts --target=bun --outdir=dist

FROM oven/bun:1.3.3-alpine AS production
RUN addgroup -g 1001 -S nodejs && adduser -S bun -u 1001
USER bun
WORKDIR /app
COPY --from=build --chown=bun:nodejs /app/dist ./dist
COPY --from=build --chown=bun:nodejs /app/node_modules ./node_modules
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD bun run healthcheck.ts
CMD ["bun", "run", "dist/index.js"]
```

---

### Perfil 09: DevOps (Dokploy Administrator)

**Entregables:**

- ✅ `.github/workflows/ci.yml` (tests only, Dokploy hace deploy)
- ✅ `scripts/backup-postgres-to-r2.sh` (cron diario 3AM)
- ✅ `docker-compose.monitoring.yml` (GlitchTip stack)
- ✅ WhatsApp alerts (`src/utils/alerts.ts` usando Baileys)

**Ahorro Específico:**

- DevOps Senior: $40k-60k/mes → $0 (Founder usa Dokploy UI)
- Datadog: $500-2,000/mes → $0 (Prometheus + logs Dokploy)
- Sentry: $29-80/mes → $0 (GlitchTip self-hosted)
- PagerDuty: $21-41/mes → $0 (WhatsApp Baileys)

**Total:** **$495,600 MXN/año ahorrados**

---

### Perfil 10: Backend Lead (Bun + ElysiaJS)

**Entregables:**

- ✅ `backend/src/index.ts` (Elysia app con helmet, CORS, rate limit)
- ✅ `backend/src/routes/facturas.ts` (CRUD + timbrado Finkok)
- ✅ `backend/src/services/finkok.ts` (integración PAC CFDI 4.0)
- ✅ `backend/tests/facturas.test.ts` (Bun Test + Eden Treaty client)

**Código Clave:**
```typescript
// Eden Treaty (Type Safety Frontend ↔ Backend)
import { treaty } from '@elysiajs/eden'
import type { App } from '../../../backend/src/index'

export const api = treaty<App>('http://localhost:3000')

// Uso en Svelte:
const { data, error } = await api.api.v1.facturas.post({
  receptor_rfc: 'XAXX010101000',
  conceptos: [...]
})
// ✅ Autocomplete completo, type-safety, 0KB runtime
```

**Ahorro:** **$1.44M-2.04M MXN/año** (Backend Lead + 2 Juniors)

---

### Perfil 11: Frontend Lead (Svelte 5 Gama Baja)

**Entregables:**

- ✅ `frontend/vite.config.ts` (terser, manual chunks, compression)
- ✅ `frontend/src/lib/stores/auth.svelte.ts` (Runes store, 0KB overhead)
- ✅ `frontend/src/routes/+layout.svelte` (Dark/Light mode, Open Props)
- ✅ `frontend/src/routes/facturas/+page.svelte` (tabla nativa, sorting ligero)

**Optimizaciones Extremas:**

- ❌ NO moment.js → `Intl.DateTimeFormat` (0KB)
- ❌ NO lodash → Array methods nativos (0KB)
- ❌ NO axios → `fetch` API (0KB)
- ❌ NO TanStack Table → HTML `<table>` + sorting en memoria

**Bundle Target:** < 200KB gzipped (HTML+CSS+JS inicial)

**Ahorro:** **$1.26M-1.56M MXN/año** (Frontend Lead + 2 Devs)

---

### Perfil 12: QA Automation (Playwright Local)

**Entregables:**

- ✅ `tests/e2e/smoke.spec.ts` (Login + Dashboard crítico)
- ✅ `playwright.config.ts` (CI optimizado, 1 worker, retry 2)
- ✅ `.github/workflows/ci.yml` (tests antes de deploy)

**Eliminado:**

- ❌ BrowserStack ($39-129/mes) → Playwright local + GitHub Actions (gratis)
- ❌ Percy ($39-149/mes) → Playwright snapshots nativos (gratis)

**Ahorro:** **$420k-600k MXN/año**

---

### Perfil 13: DBA PostgreSQL (Drizzle ORM)

**Entregables:**

- ✅ `backend/src/db/schema/facturas.ts` (Drizzle schema)
- ✅ `backend/src/db/migrations/001_partitioning.sql` (CFDI partitions)
- ✅ Seeds Catálogo SAT (Cuentas, Productos, UsoCFDI)

**Simplificación:**

- NO requiere tuning manual (Dokploy PostgreSQL 16 viene optimizado)
- Drizzle genera migrations automáticas (`drizzle-kit generate`)
- Backups via Dokploy UI (1 click → R2)

**Ahorro:** **$480k-720k MXN/año**

---

### Perfil 14: Mobile Developer (PWA Ultra-Ligera)

**Entregables:**

- ✅ `frontend/static/manifest.json` (instalable Android/iOS)
- ✅ `frontend/src/service-worker.ts` (offline fallback)
- ✅ Íconos 192x192, 512x512 (maskable)

**Decisión Estratégica:**

- NO desarrollar apps nativas (React Native/Flutter) en MVP
- PWA cubre 90% casos de uso mexicanos (notificaciones, offline, home screen)
- Apps nativas solo si clientes corporativos lo exigen (Fase 2)

**Ahorro:** **$480k-720k MXN/año**

---

### Perfil 15: UX/UI Designer (Neurociencias)

**Entregables:**

- ✅ `frontend/src/app.css` (Design tokens Open Props + Neurofinanzas)
- ✅ Componentes feedback positivo (confetti, toasts, logros)
- ✅ Paleta semántica: verde (dopamina), azul (serotonina), rojo mínimo (cortisol)

**Framework Neurociencias:**

- Ley de Miller: Max 7 opciones por pantalla
- Dopamina: Micro-logros (facturas timbradas, metas cumplidas)
- Cortisol: Reducir alertas rojas (usar amarillo/naranja)
- Serotonina: Espaciado generoso (Open Props `--size-5`)

**Ahorro:** **$360k-600k MXN/año**

---

### Perfil 16: Data Scientist (AI Logic)

**Entregables:**

- ✅ `backend/src/ai/categorizer.ts` (Reglas + Cloudflare AI fallback)
- ✅ `backend/src/ai/forecasting.ts` (Regresión lineal simple)

**Estrategia Híbrida:**

- **Fase 1:** Reglas deterministas (regex) → Costo $0, latencia 0ms
- **Fase 2:** Cloudflare AI Workers ($0.01/1,000 neurons) para casos complejos
- **Fase 3:** Modelo local (TensorFlow.js) si escala (10k+ usuarios)

**Ahorro:** **$600k-960k MXN/año**

---

## 📊 Comparativa Costos Final

| Concepto | Bootstrap (Actual) | Tradicional (Mercado) | Ahorro Anual |
|:---------|:-------------------|:----------------------|:-------------|
| **Bloque A (Legal/Fiscal)** | $200 MXN/mes VPS | $220k-425k/mes | **$3.66M MXN/año** |
| **Bloque B (Tecnología)** | $0 MXN (Founder) | $390k-610k/mes | **$4.68M-7.32M MXN/año** |
| **Total Infraestructura** | $200 MXN/mes | $610k-1.035M/mes | **$8.34M-11.98M MXN/año** |

**Conclusión:** La estrategia Bootstrap + Open Source + Dokploy permite operar **99.97% más barato** que la competencia tradicional.

---

## ⚠️ Cuándo Contratar Talento Real

### Señales de que es momento de contratar:

| Rol | Contratar cuando... | Costo Justificado |
|:----|:--------------------|:------------------|
| **DevOps Senior** | 3+ servidores VPS, multi-región | $40k-60k/mes |
| **Backend Senior** | 5,000+ usuarios, microservicios | $50k-80k/mes |
| **Frontend Senior** | 10,000+ usuarios, features avanzadas | $45k-70k/mes |
| **QA Lead** | 20+ features, regresiones constantes | $35k-50k/mes |
| **DBA** | 1M+ registros, queries lentas > 500ms | $40k-60k/mes |
| **UX Designer** | A/B testing, user research avanzado | $30k-50k/mes |
| **Data Scientist** | ML models custom, no APIs externas | $50k-80k/mes |

**Hasta ese punto:** Founder + Copilot + MCPs + Open Source = suficiente.

---

## 🚀 Roadmap de Implementación

### Semana 1 (Bloqueantes):

- [x] Perfil 08: Dockerfiles (Bun + Node.js)
- [x] Perfil 09: GitHub Actions CI + Dokploy webhook
- [x] Perfil 10: ElysiaJS base + facturas endpoint
- [x] Perfil 11: Vite config + bundle < 200KB
- [x] Perfil 12: Playwright smoke test

### Semana 2 (Alto):

- [ ] Perfil 08: Service Workers (Workbox)
- [ ] Perfil 09: GlitchTip Docker Compose
- [ ] Perfil 10: Finkok integration (timbrado)
- [ ] Perfil 11: Componentes shadcn-svelte
- [ ] Perfil 13: Drizzle schemas + migrations

### Semana 3-4 (Medio):

- [ ] Perfil 14: PWA manifest + install prompt
- [ ] Perfil 15: Design tokens + neurociencias
- [ ] Perfil 16: AI categorizer (reglas + Cloudflare AI)

### Fase 2 (Bajo prioridad, post-MVP):

- [ ] Perfil 12: Visual regression tests
- [ ] Perfil 13: PostgreSQL tuning avanzado
- [ ] Perfil 15: Micro-interacciones animadas
- [ ] Perfil 16: Modelo ML local (TensorFlow.js)

---

## 🔗 Referencias Técnicas

| Recurso | URL |
|:--------|:----|
| **Bun Runtime** | https://bun.sh/docs |
| **ElysiaJS Framework** | https://elysiajs.com/ |
| **Svelte 5 (Runes)** | https://svelte.dev/docs/svelte/$state |
| **Drizzle ORM** | https://orm.drizzle.team/ |
| **Dokploy Docs** | https://docs.dokploy.com/ |
| **shadcn-svelte** | https://shadcn-svelte.com/ |
| **Open Props** | https://open-props.style/ |
| **Better Auth** | https://better-auth.com/ |
| **Playwright** | https://playwright.dev/ |
| **GlitchTip** | https://glitchtip.com/ |
| **Cloudflare R2** | https://developers.cloudflare.com/r2/ |
| **Finkok API** | https://wiki.finkok.com/ |

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + México Profundo*
*Ahorro Total: $8.34M-11.98M MXN/año vs stack tradicional*
