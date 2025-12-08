# 🚀 ESTRATEGIA DE ESCALAMIENTO - DOKPLOY → SWARM → K8s

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Fase Actual:** Dokploy (Single Node)  
**Trigger Fase 2:** ~6 meses o VPS al 85% de capacidad  
**VPS Actual:** 4 vCPU, 16GB RAM, 200GB NVMe  
**Versión:** 2.0 (Actualizado para Dokploy)  
**Fecha:** 1 Diciembre 2025

---

## 📋 ÍNDICE

1. [Ruta de Escalamiento](#ruta-de-escalamiento)
2. [Fase 1: Dokploy Single Node (Actual)](#fase-1-dokploy-single-node)
3. [Fase 2: Dokploy Multi-Server (Docker Swarm)](#fase-2-dokploy-multi-server)
4. [Fase 3: Kubernetes (Si es necesario)](#fase-3-kubernetes-opcional)
5. [Triggers de Escalamiento](#triggers-de-escalamiento)
6. [Monitoreo y Alertas](#monitoreo-y-alertas)
7. [Checklist Pre-Escalamiento](#checklist-pre-escalamiento)

---

## 🛤️ RUTA DE ESCALAMIENTO

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    RUTA DE CRECIMIENTO (Dokploy-First)                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  FASE 1 (Actual)          FASE 2 (~6 meses)         FASE 3 (Si necesario)      │
│  ┌─────────────────┐      ┌─────────────────┐       ┌─────────────────┐        │
│  │ DOKPLOY         │      │ DOKPLOY         │       │ KUBERNETES      │        │
│  │ Single Node     │ ──►  │ Multi-Server    │ ──►   │ (K3s/EKS)       │        │
│  │ Docker Compose  │      │ Docker Swarm    │       │                 │        │
│  └─────────────────┘      └─────────────────┘       └─────────────────┘        │
│                                                                                 │
│  • 1 VPS Hostinger        • 2-4 VPS                 • Cluster Managed          │
│  • ~10,000 usuarios       • ~50,000 usuarios        • ~100,000+ usuarios       │
│  • Zero config            • Panel Dokploy           • Manifiestos K8s          │
│  • $20-40/mes             • $60-120/mes             • $200+/mes                │
│                                                                                 │
│  VENTAJA DOKPLOY: LA TRANSICIÓN DE FASE 1 → FASE 2 ES UN CLIC                  │
│  (Agregar servidor worker desde el panel, sin reconfigurar nada)               │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### ¿Por qué Dokploy antes que K8s directamente?

| Criterio                 | Dokploy (Swarm)             | Kubernetes                   |
| :----------------------- | :-------------------------- | :--------------------------- |
| **Curva de aprendizaje** | ✅ Mínima (ya sabes Docker) | ❌ Alta (nuevos conceptos)   |
| **Costo operacional**    | ✅ Solo VPS                 | ❌ Requiere expertise DevOps |
| **Para <50k usuarios**   | ✅ Más que suficiente       | ❌ Overkill                  |
| **Migrabilidad**         | ✅ Swarm → K8s es directo   | -                            |
| **Debugging**            | ✅ Logs visuales            | ❌ `kubectl` obligatorio     |
| **Tiempo productivo**    | ✅ Enfocado en código       | ❌ Enfocado en infra         |

---

## 🖥️ FASE 1: DOKPLOY SINGLE NODE (ACTUAL)

### Arquitectura Actual

```
                    HOSTINGER VPS (4vCPU, 16GB, 200GB)
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                      DOKPLOY PANEL                            │ │
│  │              dokploy.profinanconta.mx (2FA + Cloudflare)      │ │
│  └───────────────────────────────────────────────────────────────┘ │
│                              │                                      │
│  ┌───────────────────────────┴───────────────────────────────────┐ │
│  │                      TRAEFIK (Auto-managed)                   │ │
│  │                      SSL automático + Load Balancing          │ │
│  └───────────────────────────┬───────────────────────────────────┘ │
│                              │                                      │
│  ┌───────────────────────────┼───────────────────────────────────┐ │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │ │
│  │  │  FRONTEND   │    │   BACKEND   │    │  EMBEDDING  │       │ │
│  │  │  SvelteKit  │    │  ElysiaJS   │    │   Gemma     │       │ │
│  │  │  replicas:1 │    │  replicas:2 │    │  replicas:1 │       │ │
│  │  └─────────────┘    └─────────────┘    └─────────────┘       │ │
│  │                                                                │ │
│  │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │ │
│  │  │ PostgreSQL  │    │   Redis     │    │  Grafana    │       │ │
│  │  │ + pgvector  │    │   Cache     │    │ Prometheus  │       │ │
│  │  │ Backup: S3  │    │             │    │             │       │ │
│  │  └─────────────┘    └─────────────┘    └─────────────┘       │ │
│  └────────────────────────────────────────────────────────────────┘ │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Capacidad Estimada (Fase 1)

| Métrica               | Capacidad      | Nota                         |
| :-------------------- | :------------- | :--------------------------- |
| Usuarios Concurrentes | ~500-1000      | Con cache Redis agresivo     |
| Usuarios Registrados  | ~10,000        | Antes de saturar recursos    |
| Requests/segundo      | ~300-500       | Bun es extremadamente rápido |
| Almacenamiento        | ~150GB usables | Dejando 50GB para sistema    |

---

## 🔄 FASE 2: DOKPLOY MULTI-SERVER (Docker Swarm)

### Cuándo activar Fase 2 (Checklist)

- [ ] CPU promedio > 70% por 7+ días
- [ ] RAM promedio > 75% por 7+ días
- [ ] Latencia p95 > 200ms
- [ ] ~8,000-10,000 usuarios registrados
- [ ] Ingresos justifican $40-60/mes adicionales

### Proceso de Escalamiento (5 minutos)

```bash
# Desde el panel de Dokploy (NO SSH necesario):
# 1. Ir a Settings → Servers
# 2. Click "Add Server"
# 3. Ingresar IP del nuevo VPS
# 4. Dokploy genera comando de un solo uso
# 5. SSH al nuevo VPS, pegar comando
# 6. El servidor se une al Swarm automáticamente
```

### Arquitectura Fase 2

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    DOKPLOY MULTI-SERVER (Docker Swarm)                          │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  ┌─────────────────────────────────────────────────────────────────────────┐   │
│  │                        CLOUDFLARE (DNS + CDN + WAF)                     │   │
│  │                    *.profinanconta.mx → Load Balanced                   │   │
│  └─────────────────────────────────┬───────────────────────────────────────┘   │
│                                    │                                            │
│  ┌─────────────────────────────────┼───────────────────────────────────────┐   │
│  │                           DOKPLOY PANEL                                 │   │
│  │                    (Gestiona todo el Swarm desde UI)                    │   │
│  └─────────────────────────────────┬───────────────────────────────────────┘   │
│                                    │                                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                 │
│  │   VPS 1         │  │   VPS 2         │  │   VPS 3         │                 │
│  │   (Manager)     │  │   (Worker)      │  │   (Worker)      │                 │
│  │                 │  │                 │  │                 │                 │
│  │ • Dokploy Core  │  │ • Frontend x2   │  │ • Frontend x2   │                 │
│  │ • Traefik       │  │ • Backend x2    │  │ • Backend x2    │                 │
│  │ • PostgreSQL    │  │ • Embedding x1  │  │ • BullMQ Workers│                 │
│  │ • Redis         │  │                 │  │                 │                 │
│  │ • Prometheus    │  │                 │  │                 │                 │
│  │                 │  │                 │  │                 │                 │
│  │ 4 vCPU / 16GB   │  │ 4 vCPU / 16GB   │  │ 4 vCPU / 8GB    │                 │
│  │ $40/mes         │  │ $40/mes         │  │ $25/mes         │                 │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                 │
│                                                                                 │
│                    Swarm Overlay Network (Comunicación interna cifrada)        │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### Configuración de Réplicas en Dokploy

En el panel de Dokploy, por cada servicio:

| Servicio      | Réplicas Fase 1 | Réplicas Fase 2 | Estrategia                               |
| :------------ | :-------------: | :-------------: | :--------------------------------------- |
| frontend      |        1        |        4        | Distribución en todos los workers        |
| backend       |        2        |        6        | Distribución uniforme                    |
| embedding     |        1        |        2        | Solo en nodos con GPU (futuro) o más RAM |
| postgres      |        1        |        1        | Stateful en Manager (backups S3)         |
| redis         |        1        |        1        | Stateful en Manager                      |
| bullmq-worker |        1        |        3        | Workers dedicados                        |

---

## ☸️ FASE 3: KUBERNETES (OPCIONAL)

### Cuándo considerar Kubernetes

- [ ] +50,000 usuarios activos
- [ ] Necesidad de auto-scaling agresivo
- [ ] Equipo con experiencia K8s
- [ ] Presupuesto $500+/mes en infra
- [ ] Multi-región obligatorio

### Ruta de Migración Swarm → K8s

```
┌─────────────────────────────────────────────────────────────────────┐
│                MIGRACIÓN SWARM → KUBERNETES                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. Ya tienes Dockerfiles → Funcionan igual en K8s ✓               │
│                                                                     │
│  2. Usar herramienta Kompose:                                      │
│     $ kompose convert -f docker-compose.yml                        │
│     → Genera Deployments, Services, PVCs automáticamente           │
│                                                                     │
│  3. Elegir plataforma:                                             │
│     • K3s (Self-hosted, económico)                                 │
│     • DigitalOcean Kubernetes (~$48/mes mínimo)                    │
│     • AWS EKS (~$72/mes + nodos)                                   │
│     • GKE Autopilot (pago por uso)                                 │
│                                                                     │
│  4. Migrar datos:                                                  │
│     • PostgreSQL: pg_dump → restore en K8s PVC                     │
│     • Redis: RDB snapshot → restore                                │
│                                                                     │
│  5. DNS cutover:                                                   │
│     • Blue-Green deployment                                        │
│     • Traffic gradual con Cloudflare                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Por qué probablemente NO necesites Kubernetes

Con la arquitectura actual (Bun + Elysia + Svelte), el rendimiento es tan alto que:

| Usuarios | Servidores Necesarios (Swarm) | Costo Estimado |
| :------- | :---------------------------- | :------------- |
| 10,000   | 1 VPS                         | $40/mes        |
| 30,000   | 2 VPS                         | $80/mes        |
| 50,000   | 3 VPS                         | $120/mes       |
| 100,000  | 5-6 VPS                       | $200-240/mes   |

**Nota:** Muchas startups con 100k+ usuarios siguen usando Docker Swarm. K8s es para casos específicos (multi-región, compliance enterprise, auto-scaling extremo).

---

│ │ │ DATA LAYER │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ │ │
│ └────────────────────────────────────────────────────────────────┘ │
│ │
│ Volúmenes: /data/postgres, /data/redis, /data/backups │
│ │
└─────────────────────────────────────────────────────────────────────┘

````

### docker-compose.yml Actual (Referencia)

```yaml
# docker-compose.yml (simplificado)
version: '3.9'

services:
  traefik:
    image: traefik:v3.0
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./traefik:/etc/traefik

  frontend:
    build: ./frontend
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`app.tudominio.cloud`)"

  backend:
    build: ./backend
    environment:
      - DATABASE_URL=postgresql://...
      - REDIS_URL=redis://redis:6379
    depends_on:
      - postgres
      - redis

  postgres:
    image: pgvector/pgvector:pg18
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}

  redis:
    image: redis:8.2-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
````

---

## 📋 PLAN DE MIGRACIÓN A KUBERNETES

### Fases de Migración

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PLAN DE MIGRACIÓN (4 semanas)                   │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  FASE 1: PREPARACIÓN (Semana 1)                                    │
│  ├── Instalar K3s en VPS actual (single-node)                      │
│  ├── Crear manifiestos Kubernetes                                   │
│  ├── Configurar Helm charts                                         │
│  └── Pruebas en ambiente staging                                    │
│                                                                     │
│  FASE 2: MIGRACIÓN DATA LAYER (Semana 2)                           │
│  ├── PostgreSQL → StatefulSet con PVC                              │
│  ├── Redis → StatefulSet con persistencia                          │
│  ├── Migrar volúmenes de datos                                     │
│  └── Validar integridad de datos                                   │
│                                                                     │
│  FASE 3: MIGRACIÓN APP LAYER (Semana 3)                            │
│  ├── Frontend → Deployment + HPA                                   │
│  ├── Backend → Deployment + HPA                                    │
│  ├── Embedding → Deployment (recursos dedicados)                   │
│  └── Configurar Ingress (reemplaza Traefik)                        │
│                                                                     │
│  FASE 4: OPTIMIZACIÓN (Semana 4)                                   │
│  ├── Configurar autoscaling                                        │
│  ├── Implementar health checks                                     │
│  ├── Configurar backups automatizados                              │
│  └── Documentar runbooks                                           │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Por qué K3s (no K8s completo)

| Aspecto            | K3s         | K8s Full         |
| :----------------- | :---------- | :--------------- |
| **RAM mínima**     | 512MB       | 2GB+             |
| **Binario**        | ~50MB       | ~300MB           |
| **Instalación**    | 30 segundos | 30+ minutos      |
| **Para VPS**       | ✅ Ideal    | ❌ Overkill      |
| **Single-node**    | ✅ Funciona | ⚠️ Complejo      |
| **SQLite backend** | ✅ Incluido | ❌ Requiere etcd |

---

## 🏗️ ARQUITECTURA KUBERNETES PROPUESTA

### Single-Node → Multi-Node Evolution

```
FASE 1: SINGLE NODE (K3s en VPS actual)
┌─────────────────────────────────────────────────────────────────────┐
│                       HOSTINGER VPS (Master/Worker)                │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                         K3s Cluster                           │ │
│  │                                                               │ │
│  │   Namespace: finanzas-prod                                    │ │
│  │   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │ │
│  │   │Frontend │ │Backend  │ │Backend  │ │Embedding│           │ │
│  │   │ Pod x1  │ │ Pod x2  │ │ Pod x2  │ │ Pod x1  │           │ │
│  │   └─────────┘ └─────────┘ └─────────┘ └─────────┘           │ │
│  │                                                               │ │
│  │   Namespace: data                                             │ │
│  │   ┌─────────────────┐ ┌─────────────────┐                    │ │
│  │   │ PostgreSQL      │ │ Redis           │                    │ │
│  │   │ StatefulSet x1  │ │ StatefulSet x1  │                    │ │
│  │   └─────────────────┘ └─────────────────┘                    │ │
│  │                                                               │ │
│  │   Ingress: Traefik (built-in K3s)                            │ │
│  │                                                               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘


FASE 2: MULTI-NODE (Cuando necesitemos más recursos)
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│  │   Node 1        │  │   Node 2        │  │   Node 3        │    │
│  │   (Master)      │  │   (Worker)      │  │   (Worker)      │    │
│  │                 │  │                 │  │                 │    │
│  │ • Control Plane │  │ • Frontend x2   │  │ • Frontend x2   │    │
│  │ • PostgreSQL    │  │ • Backend x3    │  │ • Backend x3    │    │
│  │ • Redis         │  │ • Embedding x1  │  │                 │    │
│  │ • Monitoring    │  │                 │  │                 │    │
│  │                 │  │                 │  │                 │    │
│  │ 4 vCPU / 16GB   │  │ 4 vCPU / 16GB   │  │ 4 vCPU / 16GB   │    │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘    │
│                                                                     │
│                    Shared: Longhorn (Storage)                       │
│                    Network: Flannel CNI                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ TRIGGERS DE ESCALAMIENTO (Actualizados para Dokploy)

### Dashboard de Métricas en Dokploy

Dokploy muestra métricas en tiempo real por cada servicio. Configura alertas en Grafana para estos umbrales:

| Recurso          |  Warning (Amarillo)  |      Crítico (Rojo)      | Acción                  |
| :--------------- | :------------------: | :----------------------: | :---------------------- |
| **CPU Total**    | 65% sostenido 3 días | **80%** sostenido 7 días | Agregar Worker VPS      |
| **RAM Total**    | 70% sostenido 3 días | **85%** sostenido 7 días | Agregar Worker VPS      |
| **Disco**        |      60% usado       |      **75%** usado       | Expandir o limpiar      |
| **Latencia p95** |        >150ms        |        **>300ms**        | Revisar queries / cache |
| **Error Rate**   |        >0.5%         |         **>2%**          | Debugging urgente       |

### Métricas de Negocio → Infraestructura

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    PROYECCIÓN DE CRECIMIENTO                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│  Usuarios       Infra                 Costo/mes     Decisión                    │
│  Registrados    Recomendada                                                     │
│  ─────────────────────────────────────────────────────────────────────────────  │
│  0 - 5,000      Dokploy 1 VPS         $40           Fase 1 (actual)             │
│  5,000-15,000   Dokploy 2 VPS         $80           Agregar Worker (~6 meses)   │
│  15,000-40,000  Dokploy 3 VPS         $120          Agregar Worker              │
│  40,000-80,000  Dokploy 4-5 VPS       $160-200      Evaluar K8s managed         │
│  80,000+        K8s (DO/GKE/EKS)      $300+         Migración si hace sentido   │
│                                                                                 │
│  NOTA: Con Bun + Elysia, el throughput es 10-20x mayor que Node/Express.       │
│  Estas estimaciones son conservadoras.                                          │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 MONITOREO Y ALERTAS (Configuración Grafana)

### Alertas Prometheus para Escalamiento

```yaml
# prometheus-alerts.yaml (importar en Grafana)
groups:
  - name: scaling-alerts
    rules:
      - alert: HighCPUUsage
        expr: avg(rate(container_cpu_usage_seconds_total[5m])) by (name) > 0.7
        for: 3d
        labels:
          severity: warning
        annotations:
          summary: "CPU alto en {{ $labels.name }}"
          description: "Considerar agregar réplicas o nuevo VPS"

      - alert: CriticalCPUUsage
        expr: avg(rate(container_cpu_usage_seconds_total[5m])) by (name) > 0.85
        for: 1d
        labels:
          severity: critical
        annotations:
          summary: "CPU CRÍTICO - Escalar AHORA"

      - alert: HighMemoryUsage
        expr: container_memory_usage_bytes / container_spec_memory_limit_bytes > 0.85
        for: 1d
        labels:
          severity: critical
        annotations:
          summary: "Memoria alta en {{ $labels.name }}"

      - alert: HighLatency
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.3
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: "Latencia p95 > 300ms"
```

### Dashboard Grafana Recomendado

Importar dashboards:

- **Node Exporter Full:** ID 1860 (métricas de sistema)
- **Docker Container:** ID 893 (métricas por contenedor)
- **Traefik:** ID 4475 (métricas de reverse proxy)

---

## ✅ CHECKLIST PRE-ESCALAMIENTO

### Antes de agregar segundo VPS (Fase 2)

**Técnico:**

- [ ] Backup completo de Dokploy exportado
- [ ] Dump de PostgreSQL verificado en S3
- [ ] Variables de entorno documentadas
- [ ] Nuevo VPS provisionado (mismo DC si posible)
- [ ] Firewall del nuevo VPS: solo puertos 2377, 7946, 4789 abiertos al Manager

**Negocio:**

- [ ] Presupuesto aprobado ($40/mes adicional)
- [ ] Ventana de mantenimiento comunicada (aunque downtime mínimo)

### Proceso de Agregar Worker

```bash
# En el VPS Manager (donde está Dokploy):
# 1. Panel Dokploy → Settings → Servers → "Add Server"
# 2. Copiar el comando generado

# En el nuevo VPS Worker:
# 3. Pegar comando (instala Docker + une al Swarm)
# 4. Verificar en Dokploy que aparezca como "Connected"

# 5. Ir a cada servicio y aumentar réplicas:
#    Frontend: 1 → 2
#    Backend: 2 → 4
#    BullMQ Worker: 1 → 2
```

---

## 📚 REFERENCIA: MANIFIESTOS K8s (Para Fase 3 futura)

> **NOTA:** Estos manifiestos son para referencia futura si decides migrar a Kubernetes.
> Por ahora, Dokploy genera la configuración equivalente automáticamente.

### Por qué K3s si llegas a necesitar K8s

| Aspecto            | K3s         | K8s Full         |
| :----------------- | :---------- | :--------------- |
| **RAM mínima**     | 512MB       | 2GB+             |
| **Binario**        | ~50MB       | ~300MB           |
| **Instalación**    | 30 segundos | 30+ minutos      |
| **Para VPS**       | ✅ Ideal    | ❌ Overkill      |
| **Single-node**    | ✅ Funciona | ⚠️ Complejo      |
| **SQLite backend** | ✅ Incluido | ❌ Requiere etcd |

### ConfigMap

```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: finanzas-config
  namespace: finanzas-prod
data:
  NODE_ENV: "production"
  APP_URL: "https://app.tudominio.cloud"
  API_URL: "https://api.tudominio.cloud"
  REDIS_HOST: "redis-service"
  REDIS_PORT: "6379"
  POSTGRES_HOST: "postgres-service"
  POSTGRES_PORT: "5432"
  POSTGRES_DB: "finanzas_db"
```

### Secrets (usar sealed-secrets en producción)

```yaml
# secrets.yaml (ejemplo - usar sealed-secrets)
apiVersion: v1
kind: Secret
metadata:
  name: finanzas-secrets
  namespace: finanzas-prod
type: Opaque
stringData:
  POSTGRES_PASSWORD: "${DB_PASSWORD}"
  REDIS_PASSWORD: "${REDIS_PASSWORD}"
  JWT_SECRET: "${JWT_SECRET}"
  GEMINI_API_KEY: "${GEMINI_API_KEY}"
```

### PostgreSQL StatefulSet

```yaml
# postgres-statefulset.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: finanzas-prod
spec:
  serviceName: postgres-service
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
        - name: postgres
          image: pgvector/pgvector:pg18
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_DB
              valueFrom:
                configMapKeyRef:
                  name: finanzas-config
                  key: POSTGRES_DB
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: finanzas-secrets
                  key: POSTGRES_PASSWORD
          resources:
            requests:
              memory: "2Gi"
              cpu: "500m"
            limits:
              memory: "4Gi"
              cpu: "1000m"
          volumeMounts:
            - name: postgres-storage
              mountPath: /var/lib/postgresql/data
          livenessProbe:
            exec:
              command: ["pg_isready", "-U", "postgres"]
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            exec:
              command: ["pg_isready", "-U", "postgres"]
            initialDelaySeconds: 5
            periodSeconds: 5
  volumeClaimTemplates:
    - metadata:
        name: postgres-storage
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 50Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgres-service
  namespace: finanzas-prod
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432
  clusterIP: None
```

### Backend Deployment con HPA

```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: finanzas-prod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: registry.tudominio.cloud/finanzas-backend:latest
          ports:
            - containerPort: 4000
          envFrom:
            - configMapRef:
                name: finanzas-config
            - secretRef:
                name: finanzas-secrets
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 4000
            initialDelaySeconds: 15
            periodSeconds: 20
          readinessProbe:
            httpGet:
              path: /ready
              port: 4000
            initialDelaySeconds: 5
            periodSeconds: 10
---
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: finanzas-prod
spec:
  selector:
    app: backend
  ports:
    - port: 4000
      targetPort: 4000
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: backend-hpa
  namespace: finanzas-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: backend
  minReplicas: 2
  maxReplicas: 6
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
```

### Frontend Deployment

```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: finanzas-prod
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: registry.tudominio.cloud/finanzas-frontend:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "250m"
          livenessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 10
            periodSeconds: 15
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: finanzas-prod
spec:
  selector:
    app: frontend
  ports:
    - port: 3000
      targetPort: 3000
```

### Ingress

```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: finanzas-ingress
  namespace: finanzas-prod
  annotations:
    kubernetes.io/ingress.class: traefik
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
    - hosts:
        - app.tudominio.cloud
        - api.tudominio.cloud
      secretName: finanzas-tls
  rules:
    - host: app.tudominio.cloud
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 3000
    - host: api.tudominio.cloud
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 4000
```

---

## 📊 MONITOREO Y ALERTAS

### Prometheus Stack (Helm)

```bash
# Instalar kube-prometheus-stack
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --create-namespace \
  --set prometheus.prometheusSpec.retention=15d \
  --set prometheus.prometheusSpec.resources.requests.memory=1Gi \
  --set grafana.enabled=true
```

### Alertas Críticas

```yaml
# alerts.yaml
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: finanzas-alerts
  namespace: monitoring
spec:
  groups:
    - name: finanzas.rules
      rules:
        # CPU > 85%
        - alert: HighCPUUsage
          expr: |
            100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 85
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "CPU > 85% - Considerar migración K8s multi-node"

        # RAM > 85%
        - alert: HighMemoryUsage
          expr: |
            (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 85
          for: 5m
          labels:
            severity: critical
          annotations:
            summary: "RAM > 85% - Considerar migración K8s multi-node"

        # Pod restarts
        - alert: PodRestartingFrequently
          expr: |
            rate(kube_pod_container_status_restarts_total[15m]) * 60 * 15 > 3
          for: 5m
          labels:
            severity: warning
          annotations:
            summary: "Pod reiniciándose frecuentemente"
```

---

## 💰 ESTIMACIÓN DE COSTOS

### Hostinger VPS (Escenarios)

| Escenario       |  Nodos  | Specs               | Costo/mes | Usuarios Est. |
| :-------------- | :-----: | :------------------ | :-------: | :-----------: |
| **Actual**      |    1    | 4vCPU/16GB/200GB    |  $15 USD  |    ~5,000     |
| **K8s 2 nodos** |    2    | 4vCPU/16GB cada uno |  $30 USD  |    ~15,000    |
| **K8s 4 nodos** |    4    | 4vCPU/16GB cada uno |  $60 USD  |    ~40,000    |
| **Cloud K8s**   | Managed | DigitalOcean/Vultr  | $100+ USD |   ~100,000+   |

### Costo vs Ingreso

```
ANÁLISIS DE VIABILIDAD

Usuarios Premium: 1,000 × $99 MXN = $99,000 MXN/mes (~$5,500 USD)
Costo Infra 4 nodos: $60 USD/mes
Margen: $5,440 USD (98.9%)

→ Infraestructura NUNCA será el cuello de botella financiero
```

---

## ✅ CHECKLIST PRE-MIGRACIÓN

### Antes de Iniciar

- [ ] Backup completo de PostgreSQL
- [ ] Backup de Redis (RDB + AOF)
- [ ] Documentar todas las variables de entorno
- [ ] Probar restauración de backups
- [ ] Crear ambiente staging idéntico
- [ ] Definir ventana de mantenimiento

### Durante Migración

- [ ] Activar modo mantenimiento en frontend
- [ ] Detener writes a PostgreSQL
- [ ] Migrar datos con pg_dump/pg_restore
- [ ] Verificar integridad de datos
- [ ] Levantar pods uno por uno
- [ ] Verificar conectividad entre servicios
- [ ] Pruebas de humo (smoke tests)
- [ ] Validar SSL/TLS
- [ ] Verificar DNS

### Post-Migración

- [ ] Monitorear métricas 24h
- [ ] Verificar logs de errores
- [ ] Probar todas las funcionalidades críticas
- [ ] Documentar cambios
- [ ] Actualizar runbooks
- [ ] Comunicar a equipo

---

## 📎 ARCHIVOS RELACIONADOS

- `docker-compose.yml` (actual)
- `kubernetes/` (futuros manifiestos)
- `monitoring/prometheus/` (alertas)

---

## 🍕 SHARDING DE BASE DE DATOS (Futuro - Año 2+)

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** 📋 DOCUMENTADO (no implementar aún)

### ¿Qué es Sharding?

Sharding es dividir tu base de datos en partes más pequeñas (shards), distribuidas en varios servidores. Cada servidor responde solo lo que le toca:

- ✅ Usuarios en un shard
- ✅ Facturas en otro
- ✅ Métricas en otro

**Resultado:** Menos carga por servidor, más velocidad, más escalabilidad.

### ¿Cuándo Necesitarlo?

| Trigger          | Umbral                | Acción                         |
| :--------------- | :-------------------- | :----------------------------- |
| Usuarios activos | > 1 millón            | Evaluar sharding               |
| Tamaño de tabla  | > 100GB               | Particionar o shard            |
| Latencia p95     | > 500ms               | Optimizar primero, luego shard |
| Conexiones       | > 10,000 concurrentes | PgBouncer + considerar shard   |

### ⚠️ Por Qué NO Implementarlo Ahora

1. **PostgreSQL single-node** puede manejar 50,000+ usuarios fácilmente
2. **Complejidad innecesaria** - Las queries distribuidas son difíciles
3. **Costo operacional** - Requiere expertise DevOps avanzado
4. **El proyecto no lo necesita** - Estamos en fase de crecimiento inicial

### Estrategia Futura (Si Escala Masiva)

**Opción 1: Citus (Extensión PostgreSQL)**

```sql
-- Convertir tabla a distribuida
SELECT create_distributed_table('facturas', 'tenant_id');
SELECT create_distributed_table('clientes', 'tenant_id');
SELECT create_distributed_table('transacciones', 'tenant_id');

-- Las queries siguen siendo SQL estándar
SELECT * FROM facturas WHERE tenant_id = 'abc123';
-- Citus enruta automáticamente al shard correcto
```

**Ventajas de Citus:**

- ✅ Compatible con PostgreSQL (mismo código)
- ✅ Sharding automático por tenant_id
- ✅ Usado por empresas grandes (Algolia, Heap)

**Opción 2: Vitess**

- Usado por YouTube, Slack, GitHub
- Más complejo pero más escalable
- Requiere cambios en la aplicación

### Estrategia de Particionamiento (Antes de Sharding)

Antes de llegar al sharding, podemos usar **particionamiento nativo** de PostgreSQL:

```sql
-- Particionar facturas por fecha (más común)
CREATE TABLE facturas (
    id UUID PRIMARY KEY,
    tenant_id UUID NOT NULL,
    fecha_emision TIMESTAMPTZ NOT NULL,
    -- ... otros campos
) PARTITION BY RANGE (fecha_emision);

-- Crear particiones por año
CREATE TABLE facturas_2024 PARTITION OF facturas
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE facturas_2025 PARTITION OF facturas
    FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

CREATE TABLE facturas_2026 PARTITION OF facturas
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
```

**Beneficios del particionamiento:**

- ✅ Queries más rápidas (solo escanea partición relevante)
- ✅ Backups más eficientes (por partición)
- ✅ Eliminación de datos antiguos trivial
- ✅ Sin cambios en la aplicación

### Roadmap de Escalamiento de DB

```
FASE 1 (Actual - 10k usuarios):
└── PostgreSQL single-node + índices optimizados

FASE 2 (10k-50k usuarios):
├── PgBouncer (connection pooling)
└── Read replicas para reportes

FASE 3 (50k-200k usuarios):
├── Particionamiento por fecha
└── Caché agresivo en Redis

FASE 4 (200k-1M usuarios):
└── Citus para sharding por tenant_id

FASE 5 (1M+ usuarios):
└── Evaluar Vitess o CockroachDB
```

---

## 🎯 RESUMEN

| Pregunta              | Respuesta                           |
| :-------------------- | :---------------------------------- |
| **¿Cuándo migrar?**   | Cuando CPU/RAM > 85% sostenido      |
| **¿Qué Kubernetes?**  | K3s (ligero, ideal para VPS)        |
| **¿Cuánto cuesta?**   | $15-60 USD/mes (1-4 nodos)          |
| **¿Cuánto tiempo?**   | ~4 semanas (planificado)            |
| **¿Downtime?**        | ~15-30 minutos (con planificación)  |
| **¿Sharding cuándo?** | +1M usuarios o +100GB datos         |
| **¿Qué sharding?**    | Citus primero, Vitess si escala más |

---

**Documento de Escalamiento v2.0 - PRO_FINAN_CONTA_PYM**  
_Actualizado: 7 Diciembre 2025 - Agregada sección de Sharding_
