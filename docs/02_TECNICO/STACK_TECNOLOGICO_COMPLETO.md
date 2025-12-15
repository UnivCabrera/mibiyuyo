# 🛠️ STACK TECNOLÓGICO COMPLETO — MIBIYUYO

> **Versión:** 2.1
> **Fecha:** 15 Diciembre 2025
> **Proyecto:** mibiyuyo — "Tu dinero, tu control, tu paz"
> **Dominio:** mibiyuyo.com

---

## 🎯 RESUMEN EJECUTIVO

| Aspecto | Tecnología | Versión |
|:---|:---|:---:|
| **Runtime** | Bun | 1.3.3+ |
| **Frontend** | Svelte 5 + SvelteKit 2 | 5.x / 2.x |
| **Backend** | ElysiaJS | 1.4.16+ |
| **Database** | PostgreSQL | 16+ |
| **Cache** | Redis | 7+ |
| **ORM** | Drizzle ORM | 0.38+ |
| **Auth** | Lucia Auth | Latest |
| **Styling** | CSS Nativo + Open Props | ❌ NO Tailwind |
| **UI** | shadcn-svelte | Latest |
| **Deploy** | Dokploy (Hostinger VPS) | Self-hosted |

---

## 📦 INFRAESTRUCTURA (Control Total)

### VPS — Hostinger

| Configuración | Valor |
|:---|:---|
| **Proveedor** | Hostinger VPS (KVM) |
| **Plan recomendado** | KVM 2 (4GB RAM, 2 vCPU, 100GB SSD) |
| **Costo mensual** | ~$10-15 USD |
| **SO** | Ubuntu 24.04 LTS |
| **Kit** | **Dokploy** (preinstalado) |
| **Ubicación** | Brasil (más cercano a México) |

### Dokploy — Gestor de Despliegue

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DOKPLOY STACK                                   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ✅ Docker CE + Compose (interno, abstraído)                          │
│   ✅ Traefik (reverse proxy, SSL automático)                           │
│   ✅ PostgreSQL (base de datos principal)                              │
│   ✅ Redis (cache, sesiones, queues)                                   │
│   ✅ GitHub Webhooks (CI/CD automático)                                │
│   ✅ Preview Environments (PR → URL temporal)                          │
│   ✅ Backups automáticos (S3/MinIO)                                    │
│   ✅ Let's Encrypt SSL                                                  │
│                                                                         │
│   🌐 Panel: https://tu-vps:3000                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Justificación:**

- Elimina costos de Vercel/Netlify (~$20-100 USD/mes)
- Control total de datos (soberanía — Pilar #6)
- Self-hosted, open source
- Blue-green deployments

### Base de Datos — PostgreSQL 16+

| Configuración | Valor |
|:---|:---|
| **Puerto** | 5432 (interno) |
| **Extensiones** | pgcrypto, uuid-ossp |
| **Backups** | Diarios, 7 días retención |
| **Ubicación** | Dentro de Dokploy |

### Cache — Redis 7+

| Configuración | Valor |
|:---|:---|
| **Puerto** | 6379 (interno) |
| **Uso** | Sesiones, rate limiting, queues |
| **Persistencia** | RDB + AOF |
| **Maxmemory** | 512MB (configurable) |

### Storage — MinIO (S3-compatible)

| Configuración | Valor |
|:---|:---|
| **Uso** | Archivos, backups, PDFs |
| **Compatibilidad** | S3 API |
| **Ubicación** | Dentro de Dokploy |

---

## 🔧 BACKEND

### Runtime — Bun 1.3+

```bash
# Instalación
curl -fsSL https://bun.sh/install | bash

# Verificar versión
bun --version  # 1.3.3+
```

**¿Por qué Bun?**

- 4x más rápido que Node.js
- TypeScript nativo (sin transpilación)
- Package manager incluido (más rápido que npm/yarn)
- Compatible con Node.js APIs

### Framework — ElysiaJS 1.4+

```typescript
// src/server/index.ts
import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get('/', () => 'mibiyuyo API v1')
  .get('/health', () => ({ status: 'ok', timestamp: Date.now() }))
  .listen(3000);

console.log(`🦊 Server running at ${app.server?.hostname}:${app.server?.port}`);
```

**¿Por qué ElysiaJS?**

- El framework más rápido para Bun
- Type-safety end-to-end
- OpenAPI/Swagger automático
- Middleware modular

### ORM — Drizzle ORM 0.38+

```typescript
// src/server/db/schema.ts
import { pgTable, serial, text, timestamp, decimal, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  category: text('category').notNull(),
  description: text('description'),
  date: timestamp('date').defaultNow(),
  isImpulsive: boolean('is_impulsive').default(false),
});
```

**¿Por qué Drizzle?**

- Ligero, sin "cajas negras"
- SQL-like syntax (sin magia)
- Migraciones programáticas
- Type-safe queries

### Autenticación — Better Auth

```typescript
// src/server/auth.ts
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Cambiar a true en prod
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
    updateAge: 60 * 60 * 24, // Refresh cada día
  },
});
```

**¿Por qué Better Auth?**

- Open source, self-hosted
- Compatible con Drizzle
- 2FA opcional
- OAuth providers (futuro)

---

## 🎨 FRONTEND

### Framework — Svelte 5 + SvelteKit 2

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { TuBiyuyoHoy } from '$lib/components/dashboard';

  let balance = $state(2850);
  let greeting = $derived(getGreeting());

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }
</script>

<main>
  <h1>{greeting} 👋</h1>
  <TuBiyuyoHoy {balance} />
</main>

<style>
  main {
    padding: var(--size-4);
    max-width: var(--size-content-3);
    margin: 0 auto;
  }

  h1 {
    font-size: var(--font-size-4);
    color: var(--text-1);
  }
</style>
```

### Reglas de Svelte 5 (OBLIGATORIAS)

| Concepto | ❌ Svelte 4 (NO usar) | ✅ Svelte 5 (USAR) |
|:---|:---|:---|
| Estado | `let x = 0` | `let x = $state(0)` |
| Derivados | `$: y = x * 2` | `let y = $derived(x * 2)` |
| Efectos | `$: console.log(x)` | `$effect(() => console.log(x))` |
| Props | `export let name` | `let { name } = $props()` |
| Eventos | `on:click={fn}` | `onclick={fn}` |
| Slots | `<slot />` | `{#snippet}{/snippet}` |

### Styling — CSS Nativo + Open Props

```css
/* src/app.css */
@import 'open-props/style';
@import 'open-props/normalize';

:root {
  /* Colores de marca */
  --mibiyuyo-green: #10B981;
  --mibiyuyo-blue: #3B82F6;

  /* Alias */
  --color-primary: var(--mibiyuyo-green);
  --color-action: var(--mibiyuyo-blue);
}

/* Tema oscuro */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-1: var(--gray-9);
    --surface-2: var(--gray-8);
    --text-1: var(--gray-1);
    --text-2: var(--gray-4);
  }
}
```

**❌ NO USAR TAILWIND** — El proyecto usa CSS nativo con Open Props.

### UI Components — shadcn-svelte + Bits UI

```bash
# Instalación de componentes
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add input
```

**Estructura de componentes:**

```
src/lib/components/
├── ui/                      # shadcn-svelte
│   ├── button/
│   │   ├── index.ts
│   │   └── button.svelte
│   ├── card/
│   │   ├── index.ts
│   │   ├── card.svelte
│   │   ├── card-header.svelte
│   │   └── card-content.svelte
│   └── ...
├── dashboard/               # Componentes de negocio
│   ├── tu-biyuyo-hoy.svelte
│   ├── planificador-quincenal.svelte
│   └── ...
└── shared/                  # Componentes compartidos
    ├── navbar.svelte
    ├── footer.svelte
    └── ...
```

### PWA — Vite PWA Plugin

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default {
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'mibiyuyo',
        short_name: 'mibiyuyo',
        description: 'Tu dinero, tu control, tu paz',
        theme_color: '#10B981',
        background_color: '#ffffff',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
};
```

---

## 🔐 SEGURIDAD

### Estándares Implementados

| Área | Implementación |
|:---|:---|
| **Passwords** | bcrypt, salt, mínimo 12 chars |
| **Datos en tránsito** | TLS 1.3 (Let's Encrypt) |
| **Datos en reposo** | AES-256 para sensibles |
| **Sesiones** | Redis + rotation |
| **Rate limiting** | 5 intentos / 15 min |
| **2FA** | TOTP opcional |
| **Backups** | Diarios, encriptados |

### Headers de Seguridad (Traefik)

```yaml
# traefik/dynamic/security.yml
http:
  middlewares:
    security-headers:
      headers:
        browserXssFilter: true
        contentTypeNosniff: true
        frameDeny: true
        stsIncludeSubdomains: true
        stsSeconds: 31536000
        customResponseHeaders:
          X-Frame-Options: "DENY"
          X-Content-Type-Options: "nosniff"
          X-XSS-Protection: "1; mode=block"
```

---

## 🤖 MCPs CONFIGURADOS (22)

### Core Development (8)

| MCP | Paquete | Estado |
|:---|:---|:---:|
| `svelte` | @sveltejs/mcp | ✅ |
| `vite` | HTTP localhost:5173 | ✅ |
| `shadcn` | shadcn@latest mcp | ✅ |
| `zod` | https://mcp.zod.dev/sse | ✅ |
| `css` | css-mcp | ✅ |
| `lucide-icons` | lucide-icons-mcp | ✅ |
| `playwright` | @playwright/mcp | ✅ |
| `github` | @modelcontextprotocol/server-github | ✅ |

### Databases (3)

| MCP | Paquete | Estado |
|:---|:---|:---:|
| `postgres` | @modelcontextprotocol/server-postgres | ✅ |
| `redis` | @redis/mcp-redis | ✅ |
| `sqlite` | @modelcontextprotocol/server-sqlite | ✅ |

### Cloud & Infra (6)

| MCP | Paquete | Estado |
|:---|:---|:---:|
| `docker` | @docker/mcp-toolkit | ✅ |
| `firebase` | firebase-tools mcp | ✅ |
| `cloudflare-ai` | https://ai.cloudflare.com/mcp/sse | ✅ |
| `sentry` | @modelcontextprotocol/server-sentry | ✅ |
| `dokploy` | @ahdev/dokploy-mcp | ⏸️* |
| `linear` | https://mcp.linear.app/mcp | ✅ |

### AI & Communication (3)

| MCP | Paquete | Estado |
|:---|:---|:---:|
| `openai` | @anthropic-ai/mcp-openai | ✅ |
| `resend` | @anthropic-ai/mcp-resend | ✅ |
| `fetch` | @anthropic-ai/mcp-fetch | ✅ |

### Utilities (2)

| MCP | Paquete | Estado |
|:---|:---|:---:|
| `filesystem` | @anthropic-ai/mcp-filesystem | ✅ |
| `minio` | (pendiente) | ⏸️ |

*Dokploy: Requiere DOKPLOY_URL y DOKPLOY_API_KEY del VPS

---

## 📚 llms.txt DISPONIBLES (9)

| Tecnología | URL | Contenido |
|:---|:---|:---|
| Svelte 5 | https://svelte.dev/llms.txt | Runes, Snippets, SvelteKit |
| Vite | https://vite.dev/llms.txt | Config, Plugins, SSR |
| shadcn-svelte | https://shadcn-svelte.com/llms.txt | Componentes UI |
| Redis | https://redis.io/docs/latest/llms.txt | Commands, Pub/Sub |
| Zod | https://zod.dev/llms.txt | Schemas, Validation |
| Bun | https://bun.sh/llms.txt | Runtime, APIs |
| ElysiaJS | https://elysiajs.com/llms.txt | Routes, Plugins |
| Bits UI | https://bits-ui.com/llms.txt | Headless components |
| Better Auth | https://better-auth.com/llms.txt | Auth framework |

---

## 🔧 VARIABLES DE ENTORNO

```bash
# .env.local (desarrollo)
# .env.production (producción - en Dokploy)

# ===== Base de Datos =====
DATABASE_URL=postgresql://user:pass@localhost:5432/mibiyuyo_dev
REDIS_URL=redis://localhost:6379

# ===== Autenticación =====
AUTH_SECRET=tu-secreto-de-32-caracteres-minimo
BETTER_AUTH_URL=http://localhost:5173

# ===== MCPs =====
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxx
RESEND_API_KEY=re_xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# ===== Dokploy (solo producción) =====
DOKPLOY_URL=https://tu-vps.com:3000
DOKPLOY_API_KEY=dk_xxxxxxxxxxxx

# ===== Pagos (Mes 4+) =====
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
```

---

## 📁 ESTRUCTURA DE PROYECTO

```
mibiyuyo/
├── .github/                    # CI/CD workflows
│   └── workflows/
├── .vscode/                    # Configuración VS Code
│   ├── mcp.json               # 22 MCPs configurados
│   └── settings.json
├── docs/                       # Documentación activa
│   ├── 00_ESTRATEGIA/
│   ├── 01_PRODUCTO/
│   ├── 02_TECNICO/
│   ├── 03_SEGURIDAD/
│   └── 04_OPERACIONES/
├── src/
│   ├── app.css                # Estilos globales
│   ├── app.html               # Template HTML
│   ├── hooks.server.ts        # Hooks de servidor
│   ├── lib/                   # Código compartido
│   │   ├── components/        # Componentes Svelte
│   │   ├── server/            # Backend (ElysiaJS)
│   │   └── utils/             # Utilidades
│   └── routes/                # Rutas SvelteKit
│       ├── +page.svelte       # Landing/Home
│       ├── (app)/             # App autenticada
│       └── (auth)/            # Login/Register
├── static/                     # Assets estáticos
├── tests/                      # Tests (Playwright)
├── _LEGADO_PRO_FINAN_CONTA_PYM/  # Documentación anterior
├── AGENTS.md                   # Instrucciones para LLMs
├── MIBIYUYO_DOCUMENTO_MAESTRO.md
├── package.json
├── svelte.config.js
├── vite.config.ts
└── drizzle.config.ts
```

---

## 🚀 COMANDOS DE DESARROLLO

```bash
# Instalar dependencias
bun install

# Desarrollo local
bun run dev

# Build producción
bun run build

# Preview producción
bun run preview

# Tests
bun run test

# Lint Markdown
bun run lint:md

# Migraciones DB
bun run db:generate
bun run db:migrate
bun run db:push
```

---

## 📊 COSTOS MENSUALES ESTIMADOS

| Servicio | Costo USD | Notas |
|:---|---:|:---|
| VPS Hostinger (4GB) | $12 | Todo incluido |
| Dominio (.com) | $1 | Amortizado anual |
| Emails (Resend) | $0 | Free tier |
| Analytics (Plausible/self) | $0 | Self-hosted |
| Sentry | $0 | Free tier |
| **Total** | **$13** | |

**Nota:** Stripe cobra 3.6% + $3 MXN por transacción (sin costo fijo mensual).

---

**Documento:** STACK_TECNOLOGICO_COMPLETO.md
**Versión:** 2.0
**Fecha:** 14 Diciembre 2025

> *"Stack elegido con criterio: rendimiento, costo, control."* 🛠️
