# 📐 DOCUMENTO 02: ARQUITECTURA TÉCNICA DETALLADA

## Aplicación Web de Finanzas Personales y Contabilidad para México 2026

**Versión:** 1.0  
**Fecha:** 26 de Enero de 2026  
**Stack:** Bun + SvelteKit + PostgreSQL 18 + Redis 8  
**Confidencialidad:** Uso Interno  
**Audiencia:** Equipo Técnico, Desarrolladores, DevOps

---

## 📑 TABLA DE CONTENIDOS

1. Stack Tecnológico Completo
2. Arquitectura de Aplicación
3. Base de Datos PostgreSQL 18
4. Sistema de Caché Redis 8
5. Frontend SvelteKit
6. Backend Bun + Drizzle
7. Autenticación
8. WebSockets
9. Búsqueda Semántica
10. Almacenamiento
11. Integración SAT
12. Testing
13. Deploy
14. Monitoreo
15. Seguridad
16. Performance
17. Estructura Proyecto
18. Setup Desarrollo

---

## 1. STACK TECNOLÓGICO COMPLETO

### 1.1 Tecnologías Principales

```yaml
Frontend:
  framework: SvelteKit 2.49.0
  ui: Svelte 5.43.14 (Runes)
  styles: CSS Nativo + Variables
  build: Vite 5.x

Backend:
  runtime_primary: Bun 1.3.3
  runtime_secondary: Node.js 24.11.1 LTS
  orm: Drizzle 0.44.7
  api: Elysia.js

Database:
  primary: PostgreSQL 18.1
  vector: pgvector
  cache: Redis 8.0.2

AI/ML:
  embeddings: EmbeddingGemma-300M
  ml: scikit-learn (Python)

Auth:
  library: Auth.js 1.11.1
  hash: Argon2
  2fa: TOTP

Storage:
  local: MinIO
  cloud: Google Cloud Storage

Deploy:
  containers: Docker 27.x
  orchestration: Docker Compose v2.29
  process: PM2 5.4.3
  proxy: Traefik 3.1
  server: VPS Hostinger KVM 4

Monitoring:
  metrics: Prometheus 3.0.1
  visualization: Grafana 11.3.1
  errors: Sentry 10.20
  logs: Loki

Testing:
  e2e: Playwright 1.49.1
  unit: Vitest 4.0.13 + bun test
```

### 1.2 Justificación Decisiones Técnicas

**SvelteKit:** Bundle 40% más pequeño, performance superior, compatibilidad Bun  
**CSS Nativo:** Control total, sin dependencias, futuro-proof  
**Bun:** 10x startup más rápido, TypeScript nativo  
**PostgreSQL 18:** ACID completo, pgvector nativo, RLS, io_uring  
**Drizzle:** Queries SQL puras, bundle ligero, mejor soporte Bun

---

## 2. ARQUITECTURA DE APLICACIÓN

### 2.1 Diagrama General
