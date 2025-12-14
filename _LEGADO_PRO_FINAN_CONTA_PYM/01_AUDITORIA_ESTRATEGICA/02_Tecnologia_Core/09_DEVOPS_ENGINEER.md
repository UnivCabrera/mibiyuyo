# 👨‍💻 Perfil 09: Dokploy Administrator (Ex-DevOps Engineer)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + Hostinger VPS + Dokploy
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un DevOps Engineer Senior por $60k-80k MXN/mes para configurar Kubernetes, CI/CD complejo y monitoreo enterprise (Datadog, NewRelic)."

### ✅ La Verdad Sin Dinero:

**El Founder gestiona Dokploy vía UI web.** NO necesitamos conocimientos avanzados de Linux ni Kubernetes. Dokploy **ya viene instalado** en el VPS de Hostinger (Kit Dokploy). El rol real es:

1. **Configurar repos de GitHub** en Dokploy (UI web, sin SSH).
2. **Activar Webhooks** para auto-deploy al hacer push.
3. **Configurar backups** a S3 (Dokploy tiene UI para esto).

**NO instalamos:** Docker (ya viene en Dokploy), Traefik (ya viene), Postgres (se crea desde UI).

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Instalar/configurar servidores | Dokploy preinstalado (Hostinger) | $0 |
| CI/CD complejo | GitHub Actions (Free tier) + Webhooks | $0 |
| Monitoreo Enterprise (Datadog) | GlitchTip (auto-hospedado) | $0 |
| Backups S3 | Dokploy UI → MinIO/Cloudflare R2 (gratis) | $0 |

**Cuándo contratar DevOps de planta:** Cuando tengamos 3+ VPS y necesitemos alta disponibilidad real. Costo: $40k-60k MXN/mes.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Infraestructura | ✅ Hostinger VPS KVM 2 | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |
| Dokploy | ✅ Preinstalado | Kit Dokploy (Ubuntu 24.04 + Docker + Traefik) |
| Proveedor Backups | ✅ Cloudflare R2 (gratis) | 10GB/mes gratis |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| OPS-001 | **Conexión GitHub → Dokploy** | 🔴 Bloqueante | Dokploy UI | $0 | Sem 1 |
| OPS-002 | **Webhook Auto-Deploy** | 🔴 Bloqueante | GitHub Settings | $0 | Sem 1 |
| OPS-003 | **Backups Automáticos (PostgreSQL)** | 🔴 Bloqueante | Dokploy UI → R2 | $0 | Sem 1 |
| OPS-004 | **Monitoreo Básico (GlitchTip)** | 🟠 Alto | Docker Compose | $0 | Sem 2 |
| OPS-005 | ~~Contratar DevOps Senior~~ | ❌ Descartado | N/A | $60k/mes ⛔ | Solo con 3+ VPS |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Workflow de GitHub Actions (CI/CD Mínimo)

**Objetivo:** Tests automáticos + trigger a Dokploy (NO heavy build, Dokploy hace el deploy).

```yaml
# .github/workflows/ci.yml
name: CI - Tests Only (Dokploy maneja el deploy)

on:
  push:
    branches: [ "main", "develop" ]
  pull_request:
    branches: [ "main" ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: 1.3.3

      - name: Install Dependencies (Backend)
        working-directory: ./backend
        run: bun install

      - name: Run Backend Tests
        working-directory: ./backend
        run: bun test

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install Dependencies (Frontend)
        working-directory: ./frontend
        run: npm ci

      - name: Run Frontend Tests
        working-directory: ./frontend
        run: npm test

      - name: Build Check (no deploy)
        working-directory: ./frontend
        run: npm run build

  trigger-deploy:
    needs: [test-backend, test-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Trigger Dokploy Webhook (main only)
        run: |
          curl -X POST "${{ secrets.DOKPLOY_WEBHOOK_URL }}" \
            -H "Content-Type: application/json" \
            -d '{"ref": "${{ github.ref }}", "sha": "${{ github.sha }}"}'
```

**Configuración en GitHub:**

- `Settings → Secrets → Actions → New repository secret`
- Nombre: `DOKPLOY_WEBHOOK_URL`
- Valor: `https://tu-vps.com/api/deploy/webhook/abc123xyz` (copiar de Dokploy UI)

---

### 2. Backup Automático PostgreSQL → Cloudflare R2

**Estrategia:**

- Dokploy UI: Configurar backup integrado (cada 24h)
- Script manual: Para backups adicionales on-demand

```bash
#!/bin/bash
# scripts/backup-postgres-to-r2.sh
# Ejecutar: chmod +x backup-postgres-to-r2.sh && ./backup-postgres-to-r2.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/tmp/db_backup_$TIMESTAMP.sql.gz"

# 1. Dump de PostgreSQL (desde contenedor Dokploy)
docker exec dokploy-postgres-1 \
  pg_dump -U postgres fintech_db | gzip > $BACKUP_FILE

# 2. Subir a Cloudflare R2 (requiere wrangler CLI o AWS CLI compatible)
# Opción A: Wrangler (Cloudflare oficial)
npx wrangler r2 object put fintech-backups/database/$TIMESTAMP.sql.gz \
  --file=$BACKUP_FILE

# Opción B: AWS CLI (S3-compatible endpoint)
# aws s3 cp $BACKUP_FILE s3://fintech-backups/database/ \
#   --endpoint-url=https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com \
#   --profile=r2

# 3. Limpieza local (mantener últimos 3 backups)
ls -t /tmp/db_backup_*.sql.gz | tail -n +4 | xargs rm -f

echo "✅ Backup completado: $BACKUP_FILE → R2"
```

**Cron Job (dentro del VPS):**

```bash
# Editar crontab: crontab -e
# Backup diario a las 3:00 AM
0 3 * * * /home/user/scripts/backup-postgres-to-r2.sh >> /var/log/backups.log 2>&1
```

**Configuración Cloudflare R2:**

- Dashboard: `R2 → Create bucket → fintech-backups`
- API Token: `Manage R2 API Tokens → Create Token → Edit (R2)`
- Configurar: `~/.aws/credentials` (S3-compatible) o `.env` (Wrangler)

---

### 3. Monitoreo de Errores: GlitchTip (Self-Hosted)

**Reemplaza Sentry ($29-80/mes)** con Sentry-compatible open-source.

```yaml
# docker-compose.monitoring.yml (dentro del VPS)
version: '3.8'

services:
  glitchtip-postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: glitchtip
      POSTGRES_USER: glitchtip
      POSTGRES_PASSWORD: ${GLITCHTIP_DB_PASSWORD}
    volumes:
      - glitchtip-db:/var/lib/postgresql/data

  glitchtip-redis:
    image: redis:7-alpine

  glitchtip-web:
    image: glitchtip/glitchtip:latest
    depends_on:
      - glitchtip-postgres
      - glitchtip-redis
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgres://glitchtip:${GLITCHTIP_DB_PASSWORD}@glitchtip-postgres/glitchtip
      REDIS_URL: redis://glitchtip-redis:6379
      SECRET_KEY: ${GLITCHTIP_SECRET_KEY}
      PORT: 8000
      EMAIL_URL: smtp://smtp.gmail.com:587  # Para notificaciones
      DEFAULT_FROM_EMAIL: noreply@tuapp.com
      ENABLE_ORGANIZATION_CREATION: "true"
    volumes:
      - glitchtip-uploads:/code/uploads

  glitchtip-worker:
    image: glitchtip/glitchtip:latest
    command: ./bin/run-celery-with-beat.sh
    depends_on:
      - glitchtip-postgres
      - glitchtip-redis
    environment:
      DATABASE_URL: postgres://glitchtip:${GLITCHTIP_DB_PASSWORD}@glitchtip-postgres/glitchtip
      REDIS_URL: redis://glitchtip-redis:6379
      SECRET_KEY: ${GLITCHTIP_SECRET_KEY}

volumes:
  glitchtip-db:
  glitchtip-uploads:
```

**Configuración en la App (ElysiaJS):**

```typescript
// backend/src/plugins/sentry.ts (compatible con GlitchTip)
import * as Sentry from '@sentry/bun'

Sentry.init({
  dsn: process.env.GLITCHTIP_DSN, // http://abc123@tu-vps.com:8000/1
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1, // 10% de requests (reducir carga)
  beforeSend(event) {
    // Filtrar errores sensibles (no enviar contraseñas)
    if (event.request?.data?.password) {
      delete event.request.data.password
    }
    return event
  }
})

export const sentryPlugin = (app: Elysia) => {
  app.onError(({ error, code, set }) => {
    Sentry.captureException(error, {
      tags: { code },
      level: code === 'NOT_FOUND' ? 'info' : 'error'
    })
    // Continuar con error handler normal
    return { error: error.message }
  })
}
```

**Configuración en Frontend (Svelte):**

```typescript
// frontend/src/lib/sentry.ts
import * as Sentry from '@sentry/sveltekit'

Sentry.init({
  dsn: import.meta.env.VITE_GLITCHTIP_DSN,
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.0, // Desactivar Session Replay (consume mucho)
  replaysOnErrorSampleRate: 0.0
})
```

---

### 4. Monitoreo Básico: Prometheus + Grafana (Opcional)

**Solo si necesitas métricas de infraestructura (CPU, RAM, red).**

```yaml
# docker-compose.monitoring.yml (agregar)
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    ports:
      - "9090:9090"

  grafana:
    image: grafana/grafana:latest
    depends_on:
      - prometheus
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD}
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  prometheus-data:
  grafana-data:
```

**Configuración mínima:**

```yaml
# prometheus.yml
global:
  scrape_interval: 30s # No 15s (ahorrar recursos)

scrape_configs:
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  - job_name: 'cadvisor'
    static_configs:
      - targets: ['cadvisor:8080']
```

**⚠️ Nota Bootstrap:**

- NO instalar esto en Semana 1 (ocupa recursos)
- Solo cuando llegues a 500+ usuarios activos
- Alternativa: Usar métricas básicas de Dokploy UI (CPU/RAM/Disk)

---

### 5. Alertas Críticas vía WhatsApp (México Profundo)

**Reemplaza Slack/PagerDuty** con WhatsApp Business API.

```typescript
// backend/src/utils/alerts.ts
import { Baileys } from '@whiskeysockets/baileys'

export async function sendWhatsAppAlert(message: string) {
  const sock = await Baileys.makeWASocket({
    auth: { /* credenciales */ }
  })

  await sock.sendMessage('521234567890@s.whatsapp.net', {
    text: `🚨 ALERTA CRÍTICA\n\n${message}`
  })
}

// Uso en monitoreo
if (cpuUsage > 90) {
  await sendWhatsAppAlert('CPU > 90% en servidor principal')
}

if (failedLogins > 10) {
  await sendWhatsAppAlert('10+ intentos fallidos de login en 5min')
}
```

**Costos:**

- Baileys (librería): $0 (gratis, sin API oficial de Meta)
- WhatsApp Business API oficial: ~$50/mes (si necesitas SLA empresarial)

---

## 💼 Mentalidad Bootstrap: Founder como DevOps

### Qué puede hacer el Founder (sin conocimiento avanzado):

1. **Gestión Dokploy UI:**
   - Deploy de aplicaciones: Conectar repo GitHub + configurar build command
   - Crear bases de datos: PostgreSQL, Redis, MongoDB (1 click)
   - Ver logs en tiempo real: Buscar errores sin SSH
   - Configurar dominios: Conectar DNS, SSL automático
   - Backups: Configurar frecuencia y destino (R2)

2. **Monitoreo Básico:**
   - Dashboard Dokploy: CPU, RAM, Disk, Network
   - GlitchTip: Ver errores agrupados, stack traces
   - GitHub Actions: Ver qué tests fallaron

3. **Respuesta a Incidentes:**
   - Rollback: 1 click en Dokploy (volver a deployment anterior)
   - Reiniciar servicio: 1 click en Dokploy
   - Revisar logs: Buscar por timestamp o error message

### Cuándo contratar DevOps real ($40k-60k MXN/mes):

- ✅ **3+ servidores VPS** (multi-región, disaster recovery)
- ✅ **10,000+ usuarios activos** (necesitas Kubernetes, auto-scaling)
- ✅ **Compliance avanzado** (ISO 27001, SOC 2) requiere auditorías
- ✅ **Latencia crítica** (<100ms) necesita CDN custom + optimización avanzada

**Hasta ese punto:** Founder + Dokploy UI + GlitchTip + R2 backups = suficiente.

---

## 🇲🇽 Adaptaciones México Profundo

### 1. Monitoreo Minimalista (No Sobrecargar el VPS)

```yaml
# Reducir scrape_interval de Prometheus
global:
  scrape_interval: 60s  # En lugar de 15s (default)
  evaluation_interval: 60s
```

### 2. Alertas Solo para Críticos

```typescript
// backend/src/monitoring/alerts.ts
const CRITICAL_THRESHOLDS = {
  cpuUsage: 85,        // No 70% (falsos positivos)
  memoryUsage: 90,     // No 80%
  diskUsage: 85,
  errorRate: 10,       // 10+ errores/min
  responseTime: 5000   // 5 segundos (no 1s, conexiones 3G)
}

// Enviar alerta SOLO si persiste 5+ minutos
if (cpuUsage > CRITICAL_THRESHOLDS.cpuUsage) {
  await delay(5 * 60 * 1000) // Esperar 5 min
  if (cpuUsage > CRITICAL_THRESHOLDS.cpuUsage) {
    await sendWhatsAppAlert('CPU sostenido > 85%')
  }
}
```

### 3. Backups con Compresión Agresiva

```bash
# Usar gzip -9 (máxima compresión, ahorra ancho de banda)
pg_dump -U postgres fintech_db | gzip -9 > backup.sql.gz

# Alternativa: zstd (mejor ratio compresión/velocidad)
pg_dump -U postgres fintech_db | zstd -19 > backup.sql.zst
```

---

## 🔗 Referencias

- **Dokploy Docs:** https://docs.dokploy.com/
- **GlitchTip:** https://glitchtip.com/documentation
- **Cloudflare R2:** https://developers.cloudflare.com/r2/
- **Prometheus:** https://prometheus.io/docs/prometheus/latest/getting_started/
- **12-Factor App:** https://12factor.net/ (Config, Backing Services, Logs)
- **Baileys WhatsApp:** https://github.com/WhiskeySockets/Baileys

---

## 📊 Costo Total del Perfil

| Concepto | Costo Real (Bootstrap) | Costo Tradicional |
|:---------|:-----------------------|:------------------|
| **DevOps Senior** | ❌ $0 (Founder + Dokploy UI) | $40k-60k/mes |
| **Datadog/NewRelic** | ❌ $0 (Prometheus local) | $500-2,000/mes |
| **Sentry** | ❌ $0 (GlitchTip self-hosted) | $29-80/mes |
| **PagerDuty** | ❌ $0 (WhatsApp Baileys) | $21-41/mes |
| **AWS S3 Backups** | ✅ $0 (R2 10GB gratis) | $23/mes (100GB) |
| **VPS Hostinger** | ✅ $200/mes (KVM 2) | $200/mes |
| **GitHub Actions** | ✅ $0 (free tier, 2,000 min/mes) | $0 |
| **Total Mensual** | **$200 MXN** | **$41,500+ MXN** |
| **Ahorro Anual** | - | **$495,600 MXN/año** |

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + México Profundo*
