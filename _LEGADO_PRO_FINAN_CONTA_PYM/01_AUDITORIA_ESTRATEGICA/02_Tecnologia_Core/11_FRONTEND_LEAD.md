# 👨‍💻 Perfil 11: Frontend Lead (Founder + Svelte 5 Gama Baja)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025
**Reingeniería:** Bootstrap + México Profundo + Optimización Gama Baja

---

## 🎯 Transformación de Rol (Bootstrap)

### Antes (Tradicional):

- **Título:** Frontend Lead Senior ($45k-70k MXN/mes)
- **Equipo:** 1-2 Frontend Developers ($30k MXN/mes c/u)
- **Costo Total:** $75k-130k MXN/mes = **$900k-1.56M MXN/año**

### Después (Bootstrap):

- **Rol:** **Founder como Frontend Developer** (aprende Svelte 5 Runes)
- **Costo:** $0 MXN/mes + 2 meses de learning curve
- **Contratar Frontend Senior:** Solo cuando llegues a **10,000+ usuarios activos** y necesites features avanzadas (PWA Offline-First completa, WebRTC, etc.)

---

## 📋 Misión Redefinida (Gama Baja)

El **Founder** construye interfaces **ultra-ligeras** para el mercado mexicano:

### Perfil del Usuario México Profundo:

- **Dispositivo:** Android $3,000-5,000 MXN (Samsung A14, Xiaomi Redmi Note 12)
- **Specs:** 4GB RAM, 64GB storage, Snapdragon 680 (mid-range)
- **Conectividad:** 3G/4G inestable (10-50 Mbps en ciudad, <5 Mbps en rural)
- **Navegador:** Chrome Android (últimas 2 versiones)

### Requisitos Técnicos NO NEGOCIABLES:

1. **Bundle Total < 200KB gzipped** (HTML+CSS+JS inicial)
2. **FCP (First Contentful Paint) < 1.5s** en 3G
3. **TTI (Time to Interactive) < 3s** en 3G
4. **CERO librerías pesadas:** ❌ moment.js, ❌ lodash, ❌ axios (usar fetch nativo)
5. **Offline-First:** Service Workers obligatorio (ver Perfil 08)
6. **Imágenes:** WebP < 50KB, lazy loading, responsive srcset
7. **Fuentes:** Max 2 familias, subset Latin + Latin-Ext, WOFF2 solo

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework | ✅ Svelte 5 (Runes) | `AGENTS.md` (Sintaxis obligatoria: $state, $derived, $effect) |
| UI Library | ✅ shadcn-svelte + Bits UI | `AGENTS.md` (Componentes accesibles) |
| Estilos | ✅ CSS Nativo + Open Props | ❌ NO TAILWIND (demasiado pesado en runtime) |
| SSR | ✅ SvelteKit (adapter-node) | Dockerfile Node.js (Perfil 08) |
| Type Safety | ✅ Eden Treaty | Cliente API tipado (Perfil 10) |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| FRT-001 | **Sistema de Temas (Dark/Light)** | 🔴 Bloqueante | `mode-watcher` (2KB) | $0 | Sem 1 |
| FRT-002 | **Bundle Optimization (Vite)** | 🔴 Bloqueante | `vite-plugin-compression` | $0 | Sem 1 |
| FRT-003 | **Lazy Loading Rutas** | 🟠 Alto | SvelteKit dinámico | $0 | Sem 1 |
| FRT-004 | **Imágenes WebP Automáticas** | 🟠 Alto | `@sveltejs/enhanced-img` | $0 | Sem 1 |
| FRT-005 | **Análisis de Bundle** | 🟡 Medio | `rollup-plugin-visualizer` | $0 | Sem 2 |
| FRT-006 | ~~Contratar Frontend Senior~~ | ❌ Descartado | N/A | $45k-70k/mes ⛔ | Solo con 10k+ usuarios |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Configuración Vite Ultra-Optimizada (< 200KB Bundle)

```typescript
// frontend/vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import { enhancedImages } from '@sveltejs/enhanced-img'

export default defineConfig({
  plugins: [
    enhancedImages(), // WebP automático
    sveltekit(),
    compression({ algorithm: 'gzip' }),
    visualizer({ open: false, filename: 'bundle-stats.html' })
  ],

  build: {
    target: 'es2020', // Soportar Android 8+ (2017)
    cssCodeSplit: true,
    minify: 'terser',

    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug']
      }
    },

    rollupOptions: {
      output: {
        // Manual chunks (separar vendor de app code)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separar librerías grandes
            if (id.includes('@sveltejs/kit')) return 'kit'
            if (id.includes('bits-ui')) return 'ui'
            return 'vendor'
          }
        },

        // Nombres consistentes (mejor caching)
        chunkFileNames: 'chunks/[name]-[hash].js',
        entryFileNames: 'entries/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 100 // Warning si chunk > 100KB
  },

  // Optimizar imports (tree-shaking agresivo)
  optimizeDeps: {
    include: ['@sveltejs/kit'],
    exclude: ['@sveltejs/kit/vite'] // Evitar pre-bundle de dev tools
  }
})
```

**Meta de Bundles:**

- `_app/immutable/entries/pages/_page-[hash].svelte-xxx.js`: **< 50KB**
- `_app/immutable/chunks/vendor-[hash].js`: **< 100KB**
- `_app/immutable/chunks/kit-[hash].js`: **< 30KB**
- **Total First Load:** **< 200KB gzipped**

---

### 2. Store Global con Runes (0KB extra)

**PROHIBIDO:** Zustand, Redux, Pinia, Recoil (librerías pesadas externas).
**USAR:** Svelte 5 Runes nativo (0 bytes de overhead).

```typescript
// frontend/src/lib/stores/auth.svelte.ts
import { treaty } from '@elysiajs/eden'
import type { App } from '$lib/api/types'

const api = treaty<App>(import.meta.env.VITE_API_URL)

// Clase reactiva (Svelte 5 Runes)
class AuthStore {
  user = $state<User | null>(null)
  isAuthenticated = $derived(!!this.user)
  isLoading = $state(true)

  constructor() {
    // Auto-inicializar (verificar sesión existente)
    if (typeof window !== 'undefined') {
      this.checkSession()
    }
  }

  async checkSession() {
    try {
      const { data, error } = await api.api.v1.auth.me.get()
      if (data && !error) {
        this.user = data.user
      }
    } catch {
      this.user = null
    } finally {
      this.isLoading = false
    }
  }

  async login(email: string, password: string) {
    const { data, error } = await api.api.v1.auth.login.post({ email, password })
    if (data && !error) {
      this.user = data.user
      return { success: true }
    }
    return { success: false, error: error?.value }
  }

  logout() {
    this.user = null
    document.cookie = 'session=; Max-Age=0' // Limpiar cookie
  }
}

// Singleton global
export const auth = new AuthStore()
```

**Uso en componentes:**

```svelte
<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte'

  // ✅ Reactivo automático (gracias a Runes)
  const userName = $derived(auth.user?.name ?? 'Invitado')

  async function handleLogin() {
    const result = await auth.login(email, password)
    if (result.success) {
      goto('/dashboard')
    }
  }
</script>

<p>Hola, {userName}</p>
{#if auth.isAuthenticated}
  <button onclick={() => auth.logout()}>Cerrar Sesión</button>
{/if}
```

---

### 3. Cliente API Type-Safe (Eden Treaty - 0KB Runtime)

```typescript
// frontend/src/lib/api/client.ts
import { treaty } from '@elysiajs/eden'
import type { App } from '../../../backend/src/index' // Importar tipo desde backend

// Cliente tipado (autocomplete full)
export const api = treaty<App>(import.meta.env.VITE_API_URL || 'http://localhost:3000')

// ✅ VENTAJAS:
// 1. Autocomplete completo (sabe todas las rutas del backend)
// 2. Type-safety (si backend cambia schema, TypeScript alerta)
// 3. 0 bytes de runtime (solo tipos, se eliminan en build)

// Ejemplo de uso:
// const { data, error } = await api.api.v1.facturas.post({
//   receptor_rfc: 'XAXX010101000',
//   conceptos: [...]
// })
```

**Alternativa si Eden Treaty no funciona (usar fetch nativo):**

```typescript
// frontend/src/lib/api/fetch.ts
const BASE_URL = import.meta.env.VITE_API_URL

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    credentials: 'include' // Enviar cookies de sesión
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

// Uso:
// const facturas = await apiFetch<Factura[]>('/api/v1/facturas')
```

---

### 4. Layout Optimizado (Dark/Light Mode)

```svelte
<!-- frontend/src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css' // Open Props CSS Variables
  import { ModeWatcher } from 'mode-watcher'

  let { children } = $props()
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
  <!-- Preconnect a API (reduce latency) -->
  <link rel="preconnect" href={import.meta.env.VITE_API_URL} />
  <!-- DNS Prefetch para CDNs -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
</svelte:head>

<!-- Mode Watcher: Dark/Light automático (respeta preferencia sistema) -->
<ModeWatcher />

<div class="app-shell">
  <header class="app-header">
    <nav>
      <a href="/">Inicio</a>
      <a href="/facturas">Facturas</a>
      <a href="/conciliacion">Conciliación</a>
    </nav>
  </header>

  <main class="app-main">
    {@render children()}
  </main>

  <footer class="app-footer">
    <p>&copy; 2025 FinTech PyME México</p>
  </footer>
</div>

<style>
  /* Usar CSS Grid (soportado desde Android 6.0+) */
  .app-shell {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh; /* dvh = dynamic viewport (mejor en móvil) */
    background-color: var(--surface-1);
    color: var(--text-1);
  }

  .app-header {
    padding: var(--size-3);
    background-color: var(--surface-2);
    border-bottom: 1px solid var(--surface-3);
  }

  .app-main {
    padding: var(--size-4);
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  .app-footer {
    padding: var(--size-3);
    text-align: center;
    font-size: var(--font-size-0);
    color: var(--text-2);
    background-color: var(--surface-2);
  }

  /* Optimización Gama Baja: Reducir animaciones */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
</style>
```

---

### 5. Componente de Ejemplo (Tabla de Facturas)

**PROHIBIDO:** TanStack Table completo (demasiado pesado).
**USAR:** Tabla HTML nativa + sorting/filtering ligero.

```svelte
<!-- frontend/src/routes/facturas/+page.svelte -->
<script lang="ts">
  import { api } from '$lib/api/client'
  import { onMount } from 'svelte'

  let facturas = $state<Factura[]>([])
  let loading = $state(true)
  let error = $state<string | null>(null)

  // ✅ CORRECTO: Svelte 5 lifecycle
  onMount(async () => {
    try {
      const { data } = await api.api.v1.facturas.get()
      if (data) {
        facturas = data.data
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'Error desconocido'
    } finally {
      loading = false
    }
  })

  // Sorting ligero (solo en memoria, no query a backend)
  let sortKey = $state<'folio' | 'fecha' | 'total'>('fecha')
  let sortOrder = $state<'asc' | 'desc'>('desc')

  const sortedFacturas = $derived(
    [...facturas].sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1
      if (sortKey === 'total') {
        return (a.total - b.total) * multiplier
      }
      return a[sortKey].localeCompare(b[sortKey]) * multiplier
    })
  )

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey = key
      sortOrder = 'desc'
    }
  }
</script>

<div class="page-header">
  <h1>Facturas Emitidas</h1>
  <a href="/facturas/nueva" class="btn-primary">+ Nueva Factura</a>
</div>

{#if loading}
  <p>Cargando...</p>
{:else if error}
  <p class="error">{error}</p>
{:else if sortedFacturas.length === 0}
  <p>No tienes facturas emitidas.</p>
{:else}
  <!-- Tabla responsive (scroll horizontal en móvil) -->
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>
            <button onclick={() => toggleSort('folio')}>
              Folio {sortKey === 'folio' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
          </th>
          <th>
            <button onclick={() => toggleSort('fecha')}>
              Fecha {sortKey === 'fecha' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
          </th>
          <th>Cliente</th>
          <th>
            <button onclick={() => toggleSort('total')}>
              Total {sortKey === 'total' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </button>
          </th>
          <th>Status</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {#each sortedFacturas as factura (factura.id)}
          <tr>
            <td>{factura.folio}</td>
            <td>{new Date(factura.created_at).toLocaleDateString('es-MX')}</td>
            <td>{factura.receptor_nombre}</td>
            <td>${factura.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
            <td>
              <span class="badge badge-{factura.status}">
                {factura.status}
              </span>
            </td>
            <td>
              <a href="/facturas/{factura.uuid}">Ver</a>
              <a href="/facturas/{factura.uuid}/xml" download>XML</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--size-5);
  }

  .btn-primary {
    padding: var(--size-2) var(--size-4);
    background-color: var(--brand);
    color: white;
    border-radius: var(--radius-2);
    text-decoration: none;
    font-weight: 600;
  }

  /* Tabla responsive (overflow-x en móvil) */
  .table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch; /* Smooth scroll iOS */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--font-size-1);
  }

  th, td {
    padding: var(--size-2);
    text-align: left;
    border-bottom: 1px solid var(--surface-3);
  }

  th button {
    background: none;
    border: none;
    font-weight: 600;
    cursor: pointer;
    padding: 0;
    color: inherit;
  }

  .badge {
    padding: var(--size-1) var(--size-2);
    border-radius: var(--radius-1);
    font-size: var(--font-size-0);
    font-weight: 600;
  }

  .badge-timbrada {
    background-color: var(--green-3);
    color: var(--green-10);
  }

  .badge-borrador {
    background-color: var(--yellow-3);
    color: var(--yellow-10);
  }

  .badge-cancelada {
    background-color: var(--red-3);
    color: var(--red-10);
  }

  /* Mobile: Stack botones verticalmente */
  @media (max-width: 640px) {
    .page-header {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--size-3);
    }

    table {
      font-size: var(--font-size-0); /* Reducir texto en móvil */
    }
  }
</style>
```

---

### 6. Lazy Loading de Rutas (Code Splitting)

```typescript
// frontend/src/routes/+layout.ts
export const prerender = false // SSR dinámico
export const ssr = true // Server-Side Rendering habilitado

// Lazy loading de páginas pesadas
export const csr = true // Client-Side Routing habilitado
```

**Rutas con Lazy Loading:**

```
src/routes/
├── +layout.svelte (siempre cargado)
├── +page.svelte (inicio - critical)
├── facturas/
│   ├── +page.svelte (lazy load al entrar)
│   └── [uuid]/
│       └── +page.svelte (lazy load al ver detalle)
├── conciliacion/
│   └── +page.svelte (lazy load, chunk separado)
└── reportes/
    └── +page.svelte (lazy load, posponer hasta Fase 2)
```

**Resultado:** Cada ruta genera un chunk separado, solo se descarga al navegar.

---

### 7. Optimización de Imágenes (WebP Automático)

```svelte
<script lang="ts">
  import { Image } from '@sveltejs/enhanced-img'
  import logoSrc from '$lib/assets/logo.png?enhanced' // Vite procesa automáticamente
</script>

<!-- ✅ Genera srcset + WebP automático -->
<Image
  src={logoSrc}
  alt="Logo FinTech"
  sizes="(max-width: 640px) 100vw, 200px"
  loading="lazy"
/>

<!-- Salida HTML:
<picture>
  <source
    type="image/webp"
    srcset="/logo-320w.webp 320w, /logo-640w.webp 640w, /logo-1280w.webp 1280w"
    sizes="(max-width: 640px) 100vw, 200px"
  />
  <img
    src="/logo.png"
    alt="Logo FinTech"
    loading="lazy"
  />
</picture>
-->
```

**Reglas de Imágenes:**

- **Logos/íconos:** SVG (vectorial, escala perfecto)
- **Fotos/screenshots:** WebP < 50KB
- **Avatares:** 100x100px max, WebP
- **Ilustraciones complejas:** SVG optimizado con SVGO

---

## 💼 Mentalidad Bootstrap: Founder como Frontend Dev

### Qué puede hacer el Founder (sin experiencia previa):

1. **Aprender Svelte 5 en 2 semanas:**
   - Tutorial interactivo: https://svelte.dev/tutorial/svelte/welcome-to-svelte
   - Svelte 5 Runes: https://svelte.dev/docs/svelte/$state
   - Diferencia con React: No hooks, no virtual DOM, no re-renders

2. **Copiar componentes de shadcn-svelte:**
   ```bash
   npx shadcn-svelte@latest add button
   npx shadcn-svelte@latest add card
   npx shadcn-svelte@latest add dialog
   ```
   - Componentes ya optimizados y accesibles
   - Copiar código fuente para personalizar

3. **Debugging fácil:**
   - `console.log()` dentro de `{#if}` blocks
   - Svelte DevTools (extensión Chrome/Firefox)
   - Hot Module Replacement (cambios sin recargar)

### Cuándo contratar Frontend Senior ($45k-70k MXN/mes):

- ✅ **10,000+ usuarios activos** (necesitas animaciones complejas)
- ✅ **Tiempo real** (WebSockets, live updates)
- ✅ **Offline-First avanzado** (IndexedDB sync, conflict resolution)
- ✅ **Accesibilidad avanzada** (screen readers, WCAG AAA)

**Hasta ese punto:** Founder + Svelte 5 + shadcn-svelte + Copilot = suficiente.

---

## 🇲🇽 Adaptaciones México Profundo (Gama Baja)

### 1. Detectar Conexión Lenta (Adaptive Loading)

```typescript
// frontend/src/lib/utils/network.ts
export function getConnectionSpeed(): 'slow' | 'fast' {
  // @ts-ignore - Navigator.connection no está en todos los tipos
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

  if (!connection) return 'fast' // Asumir rápido si no hay API

  const type = connection.effectiveType // '2g', '3g', '4g', etc.

  return ['slow-2g', '2g', '3g'].includes(type) ? 'slow' : 'fast'
}

// Uso: Cargar menos imágenes en 3G
const speed = getConnectionSpeed()

if (speed === 'slow') {
  // Cargar placeholders de 10KB en lugar de imágenes full
}
```

### 2. Reducir Animaciones en Dispositivos Lentos

```svelte
<script lang="ts">
  import { browser } from '$app/environment'

  let enableAnimations = $state(true)

  $effect(() => {
    if (browser) {
      // Detectar si usuario prefiere menos animaciones
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Detectar si dispositivo es gama baja (< 4GB RAM aprox)
      // @ts-ignore
      const deviceMemory = navigator.deviceMemory || 4

      enableAnimations = !prefersReduced && deviceMemory >= 4
    }
  })
</script>

<div class:animate={enableAnimations}>
  Contenido
</div>

<style>
  div {
    transition: none; /* Sin transiciones por defecto */
  }

  div.animate {
    transition: transform 200ms ease; /* Solo si dispositivo soporta */
  }
</style>
```

### 3. Fechas Nativas (NO moment.js = 67KB)

```typescript
// ❌ MAL: moment.js (67KB minified)
import moment from 'moment'
const fecha = moment().format('DD/MM/YYYY')

// ✅ BIEN: Intl nativo (0KB, built-in browser)
const formatter = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
})

const fecha = formatter.format(new Date()) // "09/12/2025"

// Fechas relativas (sin librería)
function fechaRelativa(fecha: Date): string {
  const ahora = new Date()
  const diff = ahora.getTime() - fecha.getTime()
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (dias === 0) return 'Hoy'
  if (dias === 1) return 'Ayer'
  if (dias < 7) return `Hace ${dias} días`
  if (dias < 30) return `Hace ${Math.floor(dias / 7)} semanas`
  return formatter.format(fecha)
}
```

### 4. Utilidades Nativas (NO lodash = 71KB)

```typescript
// ❌ MAL: lodash (71KB, + 25KB tree-shaking residual)
import _ from 'lodash'
const unicos = _.uniq(array)
const agrupado = _.groupBy(facturas, 'status')

// ✅ BIEN: Array methods nativos (0KB)
const unicos = [...new Set(array)]
const agrupado = facturas.reduce((acc, f) => {
  (acc[f.status] = acc[f.status] || []).push(f)
  return acc
}, {} as Record<string, Factura[]>)

// Debounce nativo (no lodash.debounce)
function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: number
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

const handleSearch = debounce((query: string) => {
  // Buscar...
}, 300)
```

### 5. HTTP Nativo (NO axios = 13KB)

```typescript
// ❌ MAL: axios (13KB + interceptors)
import axios from 'axios'
const { data } = await axios.get('/api/facturas')

// ✅ BIEN: fetch nativo (0KB, built-in)
const response = await fetch('/api/facturas', {
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include' // Incluir cookies
})

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`)
}

const data = await response.json()
```

---

## 🔗 Referencias

- **Svelte 5 Docs:** https://svelte.dev/docs/svelte/overview
- **Svelte 5 Runes:** https://svelte.dev/docs/svelte/$state
- **SvelteKit:** https://kit.svelte.dev/docs
- **shadcn-svelte:** https://shadcn-svelte.com/docs/introduction
- **Open Props:** https://open-props.style/
- **Eden Treaty:** https://elysiajs.com/eden/overview.html
- **Web Vitals:** https://web.dev/vitals/
- **Bundle Size Checker:** https://bundlephobia.com/

---

## 📊 Costo Total del Perfil

| Concepto | Costo Real (Bootstrap) | Costo Tradicional |
|:---------|:-----------------------|:------------------|
| **Frontend Lead Senior** | ❌ $0 (Founder aprende) | $45k-70k/mes |
| **Frontend Developers (2)** | ❌ $0 (postergar hasta 10k users) | $60k/mes ($30k c/u) |
| **Svelte 5 + SvelteKit** | ✅ $0 (open-source) | $0 |
| **shadcn-svelte + Bits UI** | ✅ $0 (open-source) | $0 vs Chakra UI Pro ($299/año) |
| **Open Props CSS** | ✅ $0 (CDN gratis) | $0 vs TailwindUI ($299/año) |
| **Vite Build Tool** | ✅ $0 (open-source) | $0 |
| **Bundle Analyzer** | ✅ $0 (rollup-plugin-visualizer) | $0 vs Webpack Bundle Analyzer |
| **Mode Watcher (Dark Mode)** | ✅ $0 (librería 2KB) | $0 |
| **Total Mensual** | **$0 MXN** | **$105k-130k MXN** |
| **Ahorro Anual** | - | **$1.26M-1.56M MXN/año** |

---

## 📦 Prohibiciones Absolutas (Gama Baja)

| Librería Prohibida | Tamaño | Alternativa Nativa (0KB) |
|:-------------------|:-------|:-------------------------|
| ❌ moment.js | 67KB | `Intl.DateTimeFormat` |
| ❌ lodash | 71KB | Array methods (`map`, `filter`, `reduce`) |
| ❌ axios | 13KB | `fetch` API |
| ❌ jQuery | 87KB | Vanilla JS + Svelte |
| ❌ Chart.js completo | 180KB | Usar solo `chart.js/auto` (60KB) o SVG manual |
| ❌ Full Lodash | 71KB | Import individual: `lodash-es/groupBy` (solo 2KB) |
| ❌ TanStack Table completo | 45KB | Tabla HTML nativa + sorting ligero |
| ❌ Zod en frontend | 12KB | Validar solo en backend (Eden Treaty propaga tipos) |

**Meta Bundle Total:** **< 200KB gzipped** (First Load)

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + México Profundo + Gama Baja*
