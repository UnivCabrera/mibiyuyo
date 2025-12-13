# 🏗️ MÓDULO 10: INFRAESTRUCTURA Y DEVOPS

**Total:** 5 características
**Prioridad PMV:** 5
**Última actualización:** 28 Nov 2025

---

> **Contexto:** VPS en Hostinger con Docker + Ubuntu 24.04

---

## 10.1 DESPLIEGUE Y ORQUESTACIÓN (5 características)

### INF-001: Docker Compose Production

- **Descripción:** Orquestación de todos los servicios
- **Servicios:** Backend (Bun), Frontend (Node), PostgreSQL, Redis, Traefik
- **Redes:** Frontend network, backend network, monitoring network
- **Volumes:** Persistencia de datos
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** INFRAESTRUCTURA

```yaml
# docker-compose.prod.yml (estructura)
services:
  traefik:
    image: traefik:v3.2
  backend:
    build: ./apps/backend
    runtime: bun
  frontend:
    build: ./apps/frontend
  postgres:
    image: postgres:18.1-alpine
  redis:
    image: redis:8.4-alpine
  prometheus:
    image: prom/prometheus
  grafana:
    image: grafana/grafana
```

### INF-002: CI/CD con GitHub Actions

- **Descripción:** Pipeline automatizado de build, test, deploy
- **Triggers:** Push a main (deploy), PR (test only)
- **Jobs:** Lint → Test → Build → Deploy via SSH
- **Secrets:** Almacenados en GitHub Secrets
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** INFRAESTRUCTURA

```yaml
# .github/workflows/deploy.yml (estructura)
name: Deploy
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: oven-sh/setup-bun@v2
      - run: bun install && bun test
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1
      - run: cd /app && git pull && docker compose up -d --build
```

### INF-003: Reverse Proxy (Traefik)

- **Descripción:** Routing, SSL, rate limiting, load balancing
- **SSL:** Let's Encrypt automático (ACME)
- **Routing:** api.dominio.com → backend, app.dominio.com → frontend
- **Middlewares:** Auth, compress, headers, rate-limit
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** INFRAESTRUCTURA

### INF-004: Monitoreo (Prometheus + Grafana)

- **Descripción:** Métricas de sistema y aplicación
- **Métricas:** CPU, memoria, requests, latencia, errores
- **Dashboards:** Sistema, API, negocio
- **Alertas:** Slack/Discord/Email cuando métricas críticas
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** INFRAESTRUCTURA

### INF-005: Backups Automatizados

- **Descripción:** Respaldos de base de datos y archivos
- **Frecuencia:** Diaria (incremental), Semanal (full)
- **Retención:** 30 días
- **Ubicación:** Off-site (otro servidor o cloud storage)
- **Script:** pg_dump + rclone a Backblaze B2 o similar
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** INFRAESTRUCTURA

---

## 🖥️ ESPECIFICACIONES VPS (Hostinger)

| Recurso       | Recomendado PMV  |    Producción    |
| :------------ | :--------------: | :--------------: |
| **vCPU**      |     2 cores      |     4 cores      |
| **RAM**       |       4 GB       |       8 GB       |
| **Storage**   |    50 GB SSD     |   100 GB NVMe    |
| **Bandwidth** |       4 TB       |       8 TB       |
| **OS**        | Ubuntu 24.04 LTS | Ubuntu 24.04 LTS |
| **Precio**    |   ~$10 USD/mes   |   ~$20 USD/mes   |

---

## 📊 RESUMEN MÓDULO INFRAESTRUCTURA

| Característica |  PMV  |  V1   |  V2   |  V3   |
| :------------- | :---: | :---: | :---: | :---: |
| Docker Compose |  ✅   |   -   |   -   |   -   |
| CI/CD          |  ✅   |   -   |   -   |   -   |
| Traefik        |  ✅   |   -   |   -   |   -   |
| Monitoreo      |  ✅   |   -   |   -   |   -   |
| Backups        |  ✅   |   -   |   -   |   -   |
| **TOTAL**      | **5** | **0** | **0** | **0** |

---

## 🔐 CHECKLIST DE SEGURIDAD INFRA

- [ ] Firewall (UFW): Solo puertos 22, 80, 443
- [ ] SSH: Solo key-based, no password
- [ ] Fail2ban: Protección brute force
- [ ] Automatic updates: unattended-upgrades
- [ ] Docker: Non-root containers
- [ ] Secrets: No hardcodeados, usar env vars

---

**FIN DEL CATÁLOGO DE CARACTERÍSTICAS**

---

## 📈 RESUMEN GLOBAL

| Módulo              | Características |  PMV   |   V1   |   V2   |   V3   |
| :------------------ | :-------------: | :----: | :----: | :----: | :----: |
| 01 Core Financiero  |       45        |   19   |   14   |   10   |   2    |
| 02 Contabilidad SAT |       35        |   13   |   8    |   12   |   2    |
| 03 Inteligencia     |       30        |   6    |   12   |   10   |   2    |
| 04 Gamificación     |       25        |   5    |   10   |   7    |   3    |
| 05 Seguridad        |       22        |   19   |   3    |   0    |   0    |
| 06 UX/UI            |       20        |   10   |   7    |   3    |   0    |
| 07 Integraciones    |       15        |   7    |   6    |   2    |   0    |
| 08 Negocio          |       12        |   5    |   3    |   2    |   2    |
| 09 Palantir         |        8        |   0    |   0    |   3    |   5    |
| 10 Infraestructura  |        5        |   5    |   0    |   0    |   0    |
| **TOTAL**           |     **217**     | **89** | **63** | **49** | **16** |

---

**Documento generado:** 28 Noviembre 2025
**Mantenido por:** Equipo de Arquitectura PRO_FINAN_CONTA_PYM
