# 👨‍💻 Perfil 08: Arquitecto Docker + Offline-First (Ex-Arquitecto de Software)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo + Dokploy
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Arquitecto de Software Senior por $70k-100k MXN/mes para diseñar microservicios distribuidos con Kubernetes."

### ✅ La Verdad Sin Dinero:

**El Founder es el arquitecto inicial.** Nuestra arquitectura ya está definida: **Monolito Modular desplegado en Dokploy**. El rol real del "arquitecto" en esta fase es:

1. **Diseñar los Dockerfiles** para Bun/ElysiaJS y SvelteKit.
2. **Implementar estrategia Offline-First** (Service Workers) para PyMEs con internet inestable.
3. **Documentar patrones** (Repository, Event Bus) para mantener código limpio.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Diseño de arquitectura | Ya definido en `03_STACK_TECNOLOGICO_DEFINITIVO.md` | $0 |
| Dockerfiles optimizados | Template base + adaptación | $0 |
| Offline-First (PWA) | Service Workers nativos (Workbox) | $0 |
| Event Bus | EventEmitter nativo de Bun | $0 |

**Cuándo contratar Arquitecto de planta:** Cuando tengamos 10,000+ usuarios Y necesitemos separar en microservicios. Costo: $50k-70k MXN/mes.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Stack Tecnológico | ✅ Definido | `00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md` |
| Patrón de Diseño | ✅ Monolito Modular | `03_STACK_TECNOLOGICO_DEFINITIVO.md` (Hexagonal + DDD) |
| Infraestructura | ✅ Dokploy + VPS | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| ARQ-001 | **Dockerfile para ElysiaJS/Bun** | 🔴 Bloqueante | Docker | $0 | Sem 1 |
| ARQ-002 | **Dockerfile para SvelteKit** | 🔴 Bloqueante | Docker + Node.js | $0 | Sem 1 |
| ARQ-003 | **Service Workers (Offline-First)** | 🟠 Alto | Workbox + Vite Plugin | $0 | Sem 2 |
| ARQ-004 | **Event Bus Tipado** | 🟡 Medio | EventEmitter (Bun nativo) | $0 | Sem 2 |
| ARQ-005 | ~~Contratar Arquitecto Senior~~ | ❌ Descartado | N/A | $70k/mes ⛔ | Solo con 10k+ usuarios |

---

## 📝 ACTION ITEMS: Implementación Técnica (Stack Gratuito)

### 1. Dockerfile para Backend (ElysiaJS + Bun)

Container optimizado para Dokploy con multi-stage build.

```dockerfile
# Dockerfile (apps/backend)
FROM oven/bun:1.3.3-alpine AS base
WORKDIR /app

# Dependencias
FROM base AS deps
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production

# Build (si compilamos TypeScript)
FROM base AS build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
# ElysiaJS no requiere build, pero si usáramos esbuild:
# RUN bun run build

# Producción
FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Usuario no-root (seguridad)
USER bun

# Puerto (definido en .env o defaulteado)
EXPOSE 3000

# Health check para Dokploy
HEALTHCHECK --interval=30s --timeout=3s \
  CMD bun run src/health.ts || exit 1

# Start server
CMD ["bun", "run", "src/index.ts"]
```

### 2. Dockerfile para Frontend (SvelteKit + Node.js)

SvelteKit requiere Node.js para SSR (Bun aún no soporta adapter-node completamente).

```dockerfile
# Dockerfile (apps/frontend)
FROM node:24-alpine AS base
WORKDIR /app

# Dependencias
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Build
FROM base AS build
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Producción
FROM base AS production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./

USER node
EXPOSE 3000

CMD ["node", "build"]
```

### 3. Service Workers (Offline-First para México Profundo)

La mayoría de las PyMEs mexicanas tienen internet inestable (CFE corta luz, datos móviles limitados).

```typescript
// src/service-worker.ts (SvelteKit)
import { build, files, version } from '$service-worker';
import { precacheAndRoute } from 'workbox-precaching';

const CACHE_NAME = `app-v${version}`;

// Pre-cachear archivos críticos
const precache_files = [
  ...build, // JS/CSS chunks
  ...files, // Static assets (imágenes, iconos)
  '/offline', // Página offline custom
];

// Estrategia: Cache-First para assets, Network-First para API
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // API calls: Network-First (con fallback a cache)
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, res.clone());
          return res;
        })
        .catch(() => caches.match(event.request)) // Fallback a cache
    );
  } else {
    // Assets: Cache-First
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  }
});
```

### 4. dokploy.yaml (Configuración Despliegue)

```yaml
# dokploy.yaml (apps/backend)
version: '1.0'
name: profinanconta-backend
type: service
build:
  context: .
  dockerfile: Dockerfile
env:
  DATABASE_URL: ${DATABASE_URL}
  REDIS_URL: ${REDIS_URL}
  JWT_SECRET: ${JWT_SECRET}
ports:
  - "3000:3000"
healthcheck:
  test: ["CMD", "bun", "run", "src/health.ts"]
  interval: 30s
  timeout: 3s
  retries: 3
resources:
  cpus: '1'
  memory: 512M
```

---

## 💡 Mentalidad Bootstrap: Founder como Arquitecto Temporal

### Qué hace el Founder (primeros 6 meses):

1. **Copiar/pegar Dockerfiles** de templates (no reinventar la rueda).
2. **Configurar Dokploy** vía UI web (no requiere conocimientos DevOps avanzados).
3. **Implementar Service Workers** básicos (copiar de Workbox docs).

### Cuándo contratar Arquitecto Senior:

- **Trigger:** 10,000+ usuarios Y necesidad real de microservicios.
- **Señales:** Monolito es > 100k LOC, múltiples equipos pisándose.
- **Costo estimado:** $50k-70k MXN/mes (o equity 2-5%).

### Recursos Gratis:

- **Dockerfile templates:** GitHub (buscar "bun docker production").
- **Service Workers:** Workbox docs (https://developer.chrome.com/docs/workbox/).
- **Dokploy docs:** https://docs.dokploy.com/

---

## 🇲🇽 Adaptación México Profundo

### 1. Offline-First es OBLIGATORIO

**Realidad:** PyMEs en zonas rurales o con mala infraestructura pierden internet 2-3 veces al día.

**Estrategia:**

- Cachear TODA la UI en Service Worker.
- Permitir crear facturas OFFLINE (guardar en IndexedDB).
- Sincronizar cuando vuelva el internet.

```typescript
// Detección de conexión
if (!navigator.onLine) {
  toast.warning('Sin internet. Trabajando en modo offline. Tus cambios se guardarán cuando vuelvas a conectarte.');
}
```

### 2. Tamaño del Bundle (Optimización Gama Baja)

**Realidad:** Celulares de $3,000 MXN tienen 32GB de almacenamiento (Android Go).

**Límites:**

- Bundle JS total: < 200 KB (gzipped).
- Imágenes: WebP optimizadas, < 50 KB cada una.
- Fonts: Máximo 2 familias (usar system fonts cuando sea posible).

```javascript
// vite.config.js - Análisis de bundle
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', 'zod'], // Separar vendors
        }
      }
    }
  },
  plugins: [
    visualizer({ filename: 'bundle-analysis.html' }) // Analizar bundle
  ]
}
```

---

## 🔗 Referencias

- **Bun Docker:** https://bun.sh/docs/installation#docker
- **SvelteKit adapter-node:** https://kit.svelte.dev/docs/adapter-node
- **Workbox (Service Workers):** https://developer.chrome.com/docs/workbox/
- **Dokploy Docs:** https://docs.dokploy.com/

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap + Offline-First (México Profundo)*
├── invoicing/           # Contexto: Facturación
└── shared/              # Kernel compartido (Utils, Tipos base)
```

---

## 🔗 Referencias

- **Domain-Driven Design (DDD):** Bounded Contexts.
- **The Majestic Monolith:** DHH (Basecamp) philosophy.

---

*Última actualización: 9 Diciembre 2025*
