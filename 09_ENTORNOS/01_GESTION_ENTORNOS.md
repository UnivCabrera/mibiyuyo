# 📦 GESTIÓN DE ENTORNOS
**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión:** 1.0  
**Fecha:** 29 Noviembre 2025

---

## 🌍 ENTORNOS DEL PROYECTO (Gestionados por Dokploy)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE DE ENTORNOS (DOKPLOY)                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   LOCAL (dev)        STAGING (Dokploy)      PRODUCTION (Dokploy)       │
│   ┌─────────┐       ┌─────────────┐        ┌─────────────┐             │
│   │ Tu PC   │  ──►  │ Preview Env │  ──►   │  Live Env   │             │
│   │ Docker  │       │ (Auto PR)   │        │  (Main)     │             │
│   └─────────┘       └─────────────┘        └─────────────┘             │
│                                                                         │
│   localhost:4000    pr-123.staging.mx      app.profinanconta.mx        │
│                                                                         │
│   Base de datos:    Base de datos:         Base de datos:              │
│   finanzas_dev      finanzas_staging       finanzas_prod               │
│   (Local Docker)    (Dokploy Managed)      (Dokploy + S3 Backup)       │
│                                                                         │
│   Datos: Fake       Datos: Seed/Sanitized  Datos: Reales               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 🔄 Flujo de Despliegue con Dokploy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   1. Push a PR     ──►  Dokploy crea Preview Environment automático    │
│                         (pr-123.staging.profinanconta.mx)              │
│                                                                         │
│   2. PR Aprobado   ──►  Merge a main                                   │
│                                                                         │
│   3. Push a main   ──►  GitHub Actions: Tests + Security Scan          │
│                    ──►  Si pasa: Webhook triggerea deploy en Dokploy   │
│                    ──►  Dokploy: Pull, Build, Deploy (zero-downtime)   │
│                                                                         │
│   4. Rollback      ──►  Un clic en Dokploy para revertir a versión N-1 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 VARIABLES DE ENTORNO

### Archivo `.env.example`
```bash
# ================================
# AMBIENTE
# ================================
NODE_ENV=development  # development | staging | production

# ================================
# BASE DE DATOS
# ================================
DATABASE_URL=postgresql://user:pass@localhost:5432/finanzas_dev

# ================================
# REDIS
# ================================
REDIS_URL=redis://localhost:6379

# ================================
# AUTENTICACIÓN
# ================================
AUTH_SECRET=tu-secreto-super-seguro-de-32-caracteres
AUTH_TRUST_HOST=true

# ================================
# SERVICIOS EXTERNOS
# ================================
# SAT/CFDI
SAT_API_KEY=
SAT_API_SECRET=

# Google (OAuth + Gemini)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_AI_API_KEY=

# Stripe (Pagos)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# ================================
# MONITOREO
# ================================
SENTRY_DSN=
NEW_RELIC_LICENSE_KEY=

# ================================
# EMAIL
# ================================
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=noreply@app.mx

# ================================
# APP
# ================================
PUBLIC_APP_URL=http://localhost:5173
API_URL=http://localhost:4000
```

---

## 📋 CONFIGURACIÓN POR ENTORNO

### Development (Local)
| Variable | Valor |
|----------|-------|
| NODE_ENV | development |
| DATABASE_URL | postgresql://finanzas:dev123@localhost:5432/finanzas_dev |
| REDIS_URL | redis://localhost:6379 |
| AUTH_SECRET | dev-secret-no-usar-en-prod |
| LOG_LEVEL | debug |
| STRIPE_SECRET_KEY | sk_test_... |

### Staging
| Variable | Valor |
|----------|-------|
| NODE_ENV | staging |
| DATABASE_URL | postgresql://...@staging-db:5432/finanzas_staging |
| REDIS_URL | redis://staging-redis:6379 |
| AUTH_SECRET | (secreto staging) |
| LOG_LEVEL | info |
| STRIPE_SECRET_KEY | sk_test_... |

### Production
| Variable | Valor |
|----------|-------|
| NODE_ENV | production |
| DATABASE_URL | postgresql://...@prod-db:5432/finanzas_prod |
| REDIS_URL | redis://prod-redis:6379 |
| AUTH_SECRET | (secreto producción - 64 chars) |
| LOG_LEVEL | warn |
| STRIPE_SECRET_KEY | sk_live_... |

---

## 🚀 COMANDOS POR ENTORNO

```bash
# ================================
# DEVELOPMENT
# ================================
bun run dev              # Inicia en modo desarrollo
bun run dev:backend      # Solo backend
bun run dev:frontend     # Solo frontend
bun run db:studio        # UI de base de datos

# ================================
# STAGING
# ================================
bun run build:staging    # Build para staging
bun run deploy:staging   # Desplegar a staging
bun run migrate:staging  # Migraciones staging

# ================================
# PRODUCTION
# ================================
bun run build            # Build optimizado
bun run start            # Iniciar en producción
bun run migrate:prod     # Migraciones producción
bun run rollback:prod    # Revertir última migración
```

---

## 🔒 SEGURIDAD DE SECRETOS

### ❌ NUNCA HACER
- Subir `.env` a Git
- Hardcodear secretos en código
- Compartir secretos por chat/email
- Usar mismos secretos en todos los ambientes

### ✅ SIEMPRE HACER
- Usar `.env.example` sin valores reales
- Secretos diferentes por ambiente
- Rotar secretos periódicamente
- Usar gestor de secretos (1Password, Vault)

### Gestores Recomendados
1. **Development:** `.env` local (nunca en git)
2. **CI/CD:** GitHub Secrets (solo para tokens de webhook)
3. **Staging/Production:** **Dokploy Environment Variables** (panel visual)
   - Dokploy almacena secrets encriptados en su base de datos
   - Se inyectan automáticamente a los contenedores
   - Historial de cambios visible
   - Para secrets ultra-sensibles (CIEC, FIEL): **Infisical** integrado

### Configuración de Variables en Dokploy

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Dokploy → Project: profinanconta → Service: backend → Environment     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Variable Name          Value                    Visibility            │
│  ─────────────────────────────────────────────────────────────────────  │
│  DATABASE_URL           postgresql://...         🔒 Secret              │
│  REDIS_URL              redis://redis:6379       🔒 Secret              │
│  AUTH_SECRET            ************             🔒 Secret              │
│  GOOGLE_AI_API_KEY      ************             🔒 Secret              │
│  NODE_ENV               production               👁️ Visible             │
│  LOG_LEVEL              warn                     👁️ Visible             │
│  PUBLIC_APP_URL         https://app.profin...    👁️ Visible             │
│                                                                         │
│  [+ Add Variable]  [Import from .env]  [Export]                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🔵🟢 BLUE-GREEN / CANARY DEPLOYMENTS

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** ⏳ PENDIENTE (Fase V2)

### Conceptos

| Estrategia | Descripción | Cuándo Usar |
|:-----------|:------------|:------------|
| **Blue-Green** | Dos entornos idénticos, cambio instantáneo | Cambios grandes, necesitas rollback inmediato |
| **Canary** | Despliegue gradual (10% → 50% → 100%) | Cambios arriesgados, quieres probar con usuarios reales |
| **Rolling** | Actualización progresiva de instancias | Default de Docker Swarm |

### Arquitectura Blue-Green

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    BLUE-GREEN DEPLOYMENT                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Usuarios                                                              │
│      │                                                                  │
│      ▼                                                                  │
│   ┌──────────┐                                                          │
│   │ Traefik  │ ──────────────────────┐                                  │
│   │ (Router) │                       │                                  │
│   └──────────┘                       │                                  │
│        │                             │                                  │
│        │  100% tráfico               │  0% tráfico                      │
│        ▼                             ▼                                  │
│   ┌──────────┐                  ┌──────────┐                            │
│   │  BLUE    │                  │  GREEN   │                            │
│   │  v2.3.1  │                  │  v2.4.0  │  ← Nueva versión           │
│   │ (actual) │                  │ (nueva)  │    desplegándose           │
│   └──────────┘                  └──────────┘                            │
│                                                                         │
│   SWITCH: Cambiar todo el tráfico de Blue → Green en 1 segundo          │
│   ROLLBACK: Cambiar de Green → Blue instantáneamente                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Arquitectura Canary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CANARY DEPLOYMENT (Gradual)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Paso 1: 10% canary          Paso 2: 50% canary       Paso 3: 100%    │
│   ┌─────────────────┐         ┌─────────────────┐      ┌──────────┐    │
│   │  Blue    Green  │         │  Blue    Green  │      │  Green   │    │
│   │  90%  →  10%    │         │  50%  →  50%    │      │  100%    │    │
│   └─────────────────┘         └─────────────────┘      └──────────┘    │
│                                                                         │
│   Monitorear errores entre cada paso. Si hay problemas → Rollback      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Implementación con Traefik (ya en stack)

**Archivo de configuración dinámica:**
```yaml
# filepath: docker/traefik/dynamic/canary.yml
http:
  services:
    # Servicio con balanceo ponderado
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 90    # 90% del tráfico a versión estable
          - name: app-green
            weight: 10    # 10% del tráfico a canary

    app-blue:
      loadBalancer:
        servers:
          - url: "http://app-blue:3000"
        healthCheck:
          path: /health
          interval: 10s
          timeout: 3s

    app-green:
      loadBalancer:
        servers:
          - url: "http://app-green:3000"
        healthCheck:
          path: /health
          interval: 10s
          timeout: 3s

  routers:
    app-main:
      rule: "Host(`app.profinanconta.mx`)"
      service: app-weighted
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt
```

### Scripts de Deployment

**Canary Deploy (10%):**
```bash
#!/bin/bash
# filepath: scripts/canary-deploy.sh
set -e

NEW_VERSION=$1
CANARY_PERCENT=${2:-10}

echo "🚀 Iniciando Canary Deploy v${NEW_VERSION} (${CANARY_PERCENT}%)"

# 1. Desplegar nueva versión como "green"
docker service update --image profinanconta/app:${NEW_VERSION} app-green

# 2. Esperar health check
echo "⏳ Esperando health check..."
for i in {1..30}; do
  if curl -sf http://app-green:3000/health > /dev/null; then
    echo "✅ Health check passed"
    break
  fi
  sleep 2
done

# 3. Actualizar pesos en Traefik
cat > /etc/traefik/dynamic/canary.yml << EOF
http:
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: $((100 - CANARY_PERCENT))
          - name: app-green
            weight: ${CANARY_PERCENT}
EOF

echo "✅ Canary activo: ${CANARY_PERCENT}% tráfico en v${NEW_VERSION}"
echo "📊 Monitorear métricas en Grafana antes de promocionar"
echo "📝 Comando para promocionar: ./scripts/promote-canary.sh ${NEW_VERSION}"
```

**Promoción completa (100%):**
```bash
#!/bin/bash
# filepath: scripts/promote-canary.sh
set -e

NEW_VERSION=$1

echo "🎉 Promocionando v${NEW_VERSION} a producción (100%)"

# 1. Blue ahora recibe la versión nueva
docker service update --image profinanconta/app:${NEW_VERSION} app-blue

# 2. Restaurar 100% a blue
cat > /etc/traefik/dynamic/canary.yml << EOF
http:
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 100
          - name: app-green
            weight: 0
EOF

echo "✅ v${NEW_VERSION} ahora es producción (100% en blue)"
```

**Rollback de emergencia:**
```bash
#!/bin/bash
# filepath: scripts/rollback-canary.sh
echo "🚨 ROLLBACK: Revirtiendo canary a 0%"

cat > /etc/traefik/dynamic/canary.yml << EOF
http:
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 100
          - name: app-green
            weight: 0
EOF

echo "✅ Rollback completado. Todo el tráfico en versión estable."
```

### Checklist Pre-Canary

- [ ] Nuevo servicio `app-green` configurado en Dokploy
- [ ] Health check endpoint `/health` funcionando
- [ ] Métricas de error configuradas en Grafana
- [ ] Alertas de Sentry habilitadas
- [ ] Equipo notificado del despliegue
- [ ] Script de rollback probado

### Métricas a Monitorear Durante Canary

| Métrica | Umbral de Rollback | Herramienta |
|:--------|:-------------------|:------------|
| Error rate | > 1% | Sentry / Grafana |
| Latencia p95 | > 500ms | Prometheus |
| Memory usage | > 85% | Dokploy / Grafana |
| HTTP 5xx | > 10/min | Traefik metrics |

---

## 📊 CHECKLIST POR AMBIENTE

### Antes de ir a Staging
- [ ] Todos los tests pasan
- [ ] No hay console.log
- [ ] Variables de entorno configuradas
- [ ] Migraciones listas
- [ ] Code review aprobado

### Antes de ir a Production
- [ ] Staging funcionó 48h sin errores
- [ ] Tests E2E en staging pasaron
- [ ] Backup de BD actual
- [ ] Plan de rollback listo
- [ ] Equipo notificado
- [ ] Monitoring configurado

### Antes de Canary Deploy
- [ ] Feature flags configurados (si aplica)
- [ ] Métricas baseline documentadas
- [ ] Tiempo de observación definido (mínimo 30 min)
- [ ] Criterios de rollback claros
- [ ] Comunicación a stakeholders

---

*Cada ambiente tiene su propósito. Respétalos.*  
*Actualizado: 7 Diciembre 2025 - Agregada sección Blue-Green/Canary*
