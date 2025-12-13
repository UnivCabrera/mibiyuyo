# 🔍 Investigación Completa de MCPs - Stack Tecnológico

**Proyecto:** PRO_FINAN_CONTA_PYM - FinTech SaaS México
**Última Actualización:** 5 Diciembre 2025
**Total Tecnologías:** 61

---

## 📊 Resumen por Categoría

| Categoría           | Total  | Con MCP | Con llms.txt | Sin nada |
| ------------------- | ------ | ------- | ------------ | -------- |
| **Desarrollo Core** | 15     | 8       | 9            | 2        |
| **Bases de Datos**  | 5      | 4       | 1            | 0        |
| **Cloud/Infra**     | 12     | 7       | 0            | 5        |
| **AI/ML**           | 4      | 2       | 0            | 2        |
| **Seguridad**       | 6      | 1       | 1            | 4        |
| **UI/UX**           | 8      | 3       | 2            | 3        |
| **México Fiscal**   | 4      | 0       | 0            | 4        |
| **Utilidades**      | 7      | 2       | 0            | 5        |
| **TOTAL**           | **61** | **27**  | **13**       | **25**   |

---

# ═══════════════════════════════════════════════════════════════════════════════

# ✅ GRUPO 1: LISTOS PARA USAR (30 tecnologías)

# ═══════════════════════════════════════════════════════════════════════════════

## 🛠️ MCPs Configurados en `.vscode/mcp.json` (22)

### Desarrollo (8)

| #   | Tecnología         | Paquete MCP                           | Herramientas                                       |
| --- | ------------------ | ------------------------------------- | -------------------------------------------------- |
| 1   | **Svelte 5**       | `@sveltejs/mcp`                       | list-sections, get-documentation, svelte-autofixer |
| 2   | **Vite**           | `http://localhost:5173/__mcp`         | HMR, builds, config                                |
| 3   | **shadcn-svelte**  | `shadcn@latest mcp`                   | add, init, diff                                    |
| 4   | **Zod**            | `https://mcp.zod.dev/sse`             | schema validation, parsing                         |
| 5   | **CSS/Open Props** | `css-mcp`                             | get_docs, analyze_css, browser_compatibility       |
| 6   | **Lucide Icons**   | `lucide-icons-mcp`                    | search_icons, fuzzy_search, get_usage              |
| 7   | **Playwright**     | `@playwright/mcp`                     | browser actions, snapshots, testing                |
| 8   | **GitHub**         | `@modelcontextprotocol/server-github` | repos, issues, PRs, actions                        |

### Bases de Datos (3)

| #   | Tecnología     | Paquete MCP                             | Herramientas                              |
| --- | -------------- | --------------------------------------- | ----------------------------------------- |
| 9   | **PostgreSQL** | `@modelcontextprotocol/server-postgres` | query, describe-table, list-tables        |
| 10  | **Redis**      | `@redis/mcp-redis`                      | redis-cli, inspect-keys, cache-operations |
| 11  | **SQLite**     | `@modelcontextprotocol/server-sqlite`   | query, schema                             |

### Cloud/Infraestructura (6)

| #   | Tecnología        | Paquete MCP                           | Herramientas                                |
| --- | ----------------- | ------------------------------------- | ------------------------------------------- |
| 12  | **Docker**        | `@docker/mcp-toolkit`                 | mcp-find, mcp-add, containers, images       |
| 13  | **Firebase**      | `firebase-tools mcp`                  | 56 tools: auth, firestore, storage, hosting |
| 14  | **Cloudflare AI** | `https://ai.cloudflare.com/mcp/sse`   | workers, AI, storage                        |
| 15  | **Sentry**        | `@modelcontextprotocol/server-sentry` | list-issues, get-issue-details              |
| 16  | **Dokploy**       | `@ahdev/dokploy-mcp`                  | 67 tools: projects, apps, domains, DBs      |
| 17  | **Linear**        | `https://mcp.linear.app/mcp`          | issues, projects, OAuth automático          |

### AI/Comunicación (3)

| #   | Tecnología | Paquete MCP                | Herramientas      |
| --- | ---------- | -------------------------- | ----------------- |
| 18  | **OpenAI** | `@anthropic-ai/mcp-openai` | chat, completions |
| 19  | **Resend** | `@anthropic-ai/mcp-resend` | send-email        |
| 20  | **Fetch**  | `@anthropic-ai/mcp-fetch`  | fetch URLs        |

### Utilidades (2)

| #   | Tecnología       | Paquete MCP                    | Herramientas         |
| --- | ---------------- | ------------------------------ | -------------------- |
| 21  | **Filesystem**   | `@anthropic-ai/mcp-filesystem` | read, write, list    |
| 22  | **MinIO/AIStor** | `minio/mcp-server-aistor`      | buckets, objects, AI |

---

## 📚 Solo llms.txt (Sin MCP, pero documentación suficiente) (9)

| #   | Tecnología        | URL llms.txt                          | Tamaño   |
| --- | ----------------- | ------------------------------------- | -------- |
| 1   | **Svelte 5**      | https://svelte.dev/llms.txt           | ~50KB    |
| 2   | **Vite**          | https://vite.dev/llms.txt             | ~30KB    |
| 3   | **shadcn-svelte** | https://shadcn-svelte.com/llms.txt    | ~20KB    |
| 4   | **Redis**         | https://redis.io/docs/latest/llms.txt | ~100KB   |
| 5   | **Zod**           | https://zod.dev/llms.txt              | ~15KB    |
| 6   | **Bun**           | https://bun.sh/llms.txt               | ~80KB    |
| 7   | **ElysiaJS**      | https://elysiajs.com/llms.txt         | ~40KB    |
| 8   | **Bits UI**       | https://bits-ui.com/llms.txt          | ~25KB    |
| 9   | **Better Auth**   | https://better-auth.com/llms.txt      | ~60KB ✨ |

---

# ═══════════════════════════════════════════════════════════════════════════════

# ⏳ GRUPO 2: PENDIENTES DE VERIFICAR (6 tecnologías)

# ═══════════════════════════════════════════════════════════════════════════════

| #   | Tecnología         | Estado           | MCP/llms.txt                    | Acción                  |
| --- | ------------------ | ---------------- | ------------------------------- | ----------------------- |
| 1   | **Drizzle ORM**    | ⏳ Parcial       | orm.drizzle.team (sin llms.txt) | Usar con PostgreSQL MCP |
| 2   | **Superforms**     | ⏳ Sin verificar | superforms.rocks                | Verificar llms.txt      |
| 3   | **ExcelJS**        | ⏳ Pendiente     | `@negokaz/excel-mcp-server`     | Probar MCP comunitario  |
| 4   | **xlsx (SheetJS)** | ❌ No tiene      | docs.sheetjs.com                | Usar documentación      |
| 5   | **TanStack Table** | ❌ No tiene      | tanstack.com/table              | Usar shadcn Data Table  |
| 6   | **Chart.js**       | ❌ No tiene      | chartjs.org                     | Usar shadcn Chart       |

---

# ═══════════════════════════════════════════════════════════════════════════════

# ❌ GRUPO 3: SIN MCP NI llms.txt (25 tecnologías)

# ═══════════════════════════════════════════════════════════════════════════════

## 🇲🇽 México Fiscal (EN PAUSA - 4)

| Tecnología          | Documentación           | Prioridad                     |
| ------------------- | ----------------------- | ----------------------------- |
| **SAT/CFDI**        | sat.gob.mx              | P0 - Crítico cuando se active |
| **Finkok PAC**      | wiki.finkok.com         | P1 - Alto                     |
| **Finerio Connect** | docs.finerio.mx         | P2 - Medio                    |
| **RFC/CURP**        | ✅ Implementado (regex) | Completado                    |

**Librerías JS disponibles:**

- `@nodecfdi/cfdi-core`
- `@nodecfdi/sat-estado-cfdi`
- `@nodecfdi/cfdi-expresiones`

```typescript
// Validación RFC
const RFC_PATTERN = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

// Validación CURP
const CURP_PATTERN = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
```

---

## 🔧 Infraestructura Sin MCP (5)

| Tecnología              | Docs                 | Por qué no necesita MCP                    |
| ----------------------- | -------------------- | ------------------------------------------ |
| **Traefik**             | doc.traefik.io       | Versión gratis suficiente, config estática |
| **BetterStack/Logtail** | betterstack.com/docs | Usar SDK `@logtail/bun`                    |
| **Prometheus**          | prometheus.io/docs   | Scraping automático                        |
| **Grafana**             | grafana.com/docs     | UI dashboards                              |
| **Caddy**               | caddyserver.com/docs | Alternativa simple a Traefik               |

---

## 🔐 Seguridad Sin MCP (4)

| Tecnología   | Docs                     | Por qué no necesita MCP                      |
| ------------ | ------------------------ | -------------------------------------------- |
| **Auth.js**  | authjs.dev               | ❌ No tiene llms.txt, considerar Better Auth |
| **Jose/JWT** | github.com/panva/jose    | Librería pura, docs claros                   |
| **Argon2**   | npmjs.com/package/argon2 | Bun.password nativo mejor                    |
| **crypto**   | nodejs.org/api/crypto    | API nativa, docs estándar                    |

---

## 📦 Utilidades Sin MCP (7)

| Tecnología        | Docs                            | Por qué no necesita MCP    |
| ----------------- | ------------------------------- | -------------------------- |
| **PdfMake**       | pdfmake.github.io/docs          | API JSON simple            |
| **QRCode**        | npmjs.com/package/qrcode        | Una función, muy simple    |
| **Signature Pad** | npmjs.com/package/signature_pad | Canvas HTML5 básico        |
| **date-fns**      | date-fns.org                    | Funciones puras            |
| **Sonner**        | sonner.emilkowal.ski            | Toast notifications simple |
| **sharp**         | sharp.pixelplumbing.com         | Image processing CLI       |
| **Anthropic SDK** | docs.anthropic.com              | Usar SDK directo           |

---

# ═══════════════════════════════════════════════════════════════════════════════

# 🛡️ DECISIÓN: MCP PROPIO PARA MÉXICO

# ═══════════════════════════════════════════════════════════════════════════════

## ✅ Recomendación: SÍ crear MCP propio

**Razones:**

1. SAT/CFDI no tiene MCP existente
2. Librerías `@nodecfdi/*` son complejas
3. Necesidad de mantener documentación fiscal actualizada
4. Validaciones específicas (RFC, CURP) centralizadas

## 📋 Herramientas propuestas para MCP México

```typescript
// mcp-mexico-fiscal
const tools = {
  // Validación
  "validate-rfc": "Validar RFC persona física/moral",
  "validate-curp": "Validar CURP",
  "validate-cfdi": "Validar estructura CFDI",

  // Consulta SAT
  "sat-status-cfdi": "Consultar estado CFDI en SAT",
  "sat-rfc-info": "Información pública RFC",

  // Generación
  "generate-cfdi-template": "Template para factura",
  "generate-complement": "Complementos de pago",

  // Timbrado (cuando Finkok esté configurado)
  "stamp-cfdi": "Timbrar CFDI con PAC",
  "cancel-cfdi": "Cancelar CFDI",
};
```

## 🗓️ Timeline sugerido

| Fase       | Descripción                | Cuando                 |
| ---------- | -------------------------- | ---------------------- |
| **Fase 0** | Documentar APIs SAT/Finkok | Antes de módulo fiscal |
| **Fase 1** | MCP básico (validaciones)  | Con módulo fiscal      |
| **Fase 2** | MCP completo (timbrado)    | Post-lanzamiento       |

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📖 DOCUMENTACIÓN DETALLADA DE MCPs PRINCIPALES

# ═══════════════════════════════════════════════════════════════════════════════

## 🔧 Docker MCP Toolkit (OFICIAL)

> **Fuente:** https://docs.docker.com/ai/mcp-catalog-and-toolkit/

**Características:**

- MCP Catalog: Servidores verificados en namespace `mcp/`
- MCP Gateway: Orquestación en contenedores aislados
- Dynamic MCP: Descubrimiento bajo demanda

**Herramientas dinámicas:**

- `mcp-find` - Buscar servidores
- `mcp-add` - Agregar servidor
- `mcp-config-set` - Configurar
- `mcp-remove` - Remover
- `mcp-exec` - Ejecutar herramienta

**Seguridad:**

- CPU limitada a 1 core
- Memoria limitada a 2 GB
- Sin acceso a filesystem por defecto

---

## 🔧 Firebase MCP (OFICIAL Google)

> **Fuente:** https://firebase.google.com/docs/ai-assistance/mcp-server

**56 herramientas en categorías:**

| Categoría   | Ejemplos                                              |
| ----------- | ----------------------------------------------------- |
| Core        | firebase_login, firebase_get_project                  |
| Firestore   | firestore_query_collection, firestore_delete_document |
| Auth        | auth_get_users, auth_update_user                      |
| Storage     | storage_get_object_download_url                       |
| Messaging   | messaging_send_message                                |
| Functions   | functions_get_logs                                    |
| Crashlytics | crashlytics_get_top_issues                            |

---

## 🔧 Dokploy MCP (OFICIAL)

> **Fuente:** https://github.com/Dokploy/mcp

**67 herramientas:**

| Categoría         | Tools                                       |
| ----------------- | ------------------------------------------- |
| Proyectos (6)     | project-all, project-create, project-update |
| Aplicaciones (26) | deploy, redeploy, start, stop, reload       |
| Dominios (9)      | domain-create, domain-validate              |
| PostgreSQL (13)   | postgres-create, postgres-deploy            |
| MySQL (13)        | mysql-create, mysql-deploy                  |

---

## 🔧 Linear MCP (OFICIAL Remoto)

> **Fuente:** https://linear.app/developers

**Endpoints:**

- HTTP: `https://mcp.linear.app/mcp`
- SSE: `https://mcp.linear.app/sse`

**Autenticación:** OAuth 2.1 automático (sin API key manual)

**Recursos para developers:**

- GraphQL API: https://linear.app/developers/graphql
- TypeScript SDK: https://linear.app/developers/sdk
- Agent Guidelines: https://linear.app/developers/aig

---

## 🔧 Cloudflare MCP Servers (15 disponibles)

> **Fuente:** https://developers.cloudflare.com/agents/model-context-protocol/

| Servidor          | URL                                          |
| ----------------- | -------------------------------------------- |
| Documentation     | https://docs.mcp.cloudflare.com/mcp          |
| Workers Bindings  | https://bindings.mcp.cloudflare.com/mcp      |
| Observability     | https://observability.mcp.cloudflare.com/mcp |
| Browser Rendering | https://browser.mcp.cloudflare.com/mcp       |
| AI Gateway        | https://ai-gateway.mcp.cloudflare.com/mcp    |

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📖 DOCUMENTACIÓN EXTENSA: BUN RUNTIME

# ═══════════════════════════════════════════════════════════════════════════════

> **Fuente:** https://bun.sh/llms.txt
> **Noticia:** Bun fue adquirido por Anthropic (Diciembre 2025)

## Bun.serve() - HTTP Server

**Benchmark:** 2.5x más rápido que Node.js (~160k req/s vs ~64k)

```typescript
Bun.serve({
  port: 3000,
  routes: {
    "/": () => new Response("Home"),
    "/api/status": new Response("OK"),
    "/users/:id": (req) => new Response(`User ${req.params.id}`),
    "/api/posts": {
      GET: () => Response.json({ posts: [] }),
      POST: async (req) => {
        const body = await req.json();
        return Response.json({ created: true, ...body });
      },
    },
  },
  fetch(req) {
    return new Response("Not Found", { status: 404 });
  },
});
```

**Características:**

- Hot Route Reloading
- Unix Domain Sockets
- Streaming de archivos
- Range requests automáticos

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📖 DOCUMENTACIÓN EXTENSA: ELYSIAJS

# ═══════════════════════════════════════════════════════════════════════════════

> **Fuente:** https://elysiajs.com/llms.txt

**Benchmark:** 21x más rápido que Express, 6x más rápido que Fastify

## Integración con SvelteKit

```typescript
// src/routes/api/[...slugs]/+server.ts
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", "hello SvelteKit")
  .post("/", ({ body }) => body, {
    body: t.Object({
      name: t.String(),
    }),
  });

export const fallback = ({ request }) => app.handle(request);
```

## Integración con Better Auth

```typescript
import { Elysia } from "elysia";
import { betterAuth } from "better-auth";

const auth = betterAuth({
  // config
});

new Elysia().use(auth.handler).listen(3000);
```

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📖 DOCUMENTACIÓN EXTENSA: BETTER AUTH

# ═══════════════════════════════════════════════════════════════════════════════

> **Fuente:** https://better-auth.com/llms.txt
> **Nota:** Auth.js fue adquirido por Better Auth Inc.

## Características

- 30+ proveedores OAuth (Google, GitHub, Discord, etc.)
- Adaptadores: Drizzle, Prisma, PostgreSQL, MySQL, SQLite, MongoDB
- Integraciones: SvelteKit, Elysia, Astro, Next.js, Nuxt
- Plugins: 2FA, Admin, Organization, Passkey, OIDC Provider

## Integración con SvelteKit

```typescript
// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
```

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📋 LISTA FINAL DE ELEMENTOS FALTANTES

# ═══════════════════════════════════════════════════════════════════════════════

## 🔴 Requieren Información del Usuario

| #   | Tecnología   | Qué falta                         | Urgencia                      |
| --- | ------------ | --------------------------------- | ----------------------------- |
| 1   | **Dokploy**  | URL VPS + API Key                 | Media (cuando VPS esté listo) |
| 2   | **SAT/CFDI** | Decisión de timing módulo fiscal  | Baja                          |
| 3   | **Finkok**   | Credenciales PAC (cuando aplique) | Baja                          |
| 4   | **Finerio**  | API Key (cuando aplique)          | Baja                          |

## 🟡 Requieren Verificación Técnica

| #   | Tecnología      | Verificar     | Acción                             |
| --- | --------------- | ------------- | ---------------------------------- |
| 1   | **ExcelJS MCP** | Funcionalidad | Probar `@negokaz/excel-mcp-server` |
| 2   | **Superforms**  | llms.txt      | Buscar en repo oficial             |
| 3   | **Drizzle**     | llms.txt      | Verificar orm.drizzle.team         |

## ✅ No Requieren Nada Más

Todas las demás tecnologías están:

- ✅ Configuradas en mcp.json, o
- ✅ Tienen llms.txt verificado, o
- ✅ Son librerías simples que no necesitan MCP

---

# ═══════════════════════════════════════════════════════════════════════════════

# 🔧 CONFIGURACIÓN COMPLETA `.vscode/mcp.json`

# ═══════════════════════════════════════════════════════════════════════════════

Ver archivo actualizado: `.vscode/mcp.json`

**Resumen:**

- 22 MCPs configurados
- 21 activos
- 1 disabled (dokploy - requiere VPS)

**Variables de entorno requeridas:**

```bash
GITHUB_TOKEN=ghp_xxxx
SENTRY_AUTH_TOKEN=sntrys_xxxx
CLOUDFLARE_API_TOKEN=xxxx
RESEND_API_KEY=re_xxxx
OPENAI_API_KEY=sk-xxxx
REDIS_URL=redis://localhost:6379
POSTGRES_CONNECTION_STRING=postgresql://localhost:5432/fintech_db
```

---

_Última actualización: 5 Diciembre 2025_
_MCPs: 22 | llms.txt: 9 | Total: 61 tecnologías_

OK apartir de aqui yo pondre todo lo que encuntre de informacion :
📋 Tecnologías SIN MCP ni llms.txt (31)
🇲🇽 México Fiscal - EN PAUSA (4)

# Tecnología Docs Estado

1 SAT/CFDI sat.gob.mx ⏸️ Pausa
2 Finkok PAC wiki.finkok.com ⏸️ Pausa
3 Finerio Connect docs.finerio.mx ⏸️ Pausa
4 RFC/CURP ✅ Regex implementado ✅ Listo
🔧 Infraestructura (5)

# Tecnología Docs Razón sin MCP

5 Traefik doc.traefik.io Config estática
6 BetterStack/Logtail betterstack.com/docs Usar SDK
7 Prometheus prometheus.io/docs Scraping automático
8 Grafana grafana.com/docs UI dashboards
9 Caddy caddyserver.com/docs Alternativa Traefik
🔐 Seguridad (4)

# Tecnología Docs Razón sin MCP

10 Auth.js authjs.dev ❌ No llms.txt (usar Better Auth)
11 Jose/JWT github.com/panva/jose Librería pura
12 Argon2 npmjs.com/package/argon2 Bun.password nativo
13 crypto nodejs.org/api/crypto API nativa
📦 Utilidades (7)

# Tecnología Docs Razón sin MCP

14 PdfMake pdfmake.github.io/docs API JSON simple
15 QRCode npmjs.com/package/qrcode Una función
16 Signature Pad npmjs.com/package/signature_pad Canvas básico
17 date-fns date-fns.org Funciones puras
18 Sonner sonner.emilkowal.ski Toasts simple
19 sharp sharp.pixelplumbing.com Image processing
20 Anthropic SDK docs.anthropic.com Usar SDK directo
📊 Data/Export (4)

# Tecnología Docs Estado

21 xlsx (SheetJS) docs.sheetjs.com ❌ No tiene llms.txt
22 ExcelJS github.com/exceljs/exceljs ⏳ MCP comunitario pendiente
23 TanStack Table tanstack.com/table Usar shadcn Data Table
24 Chart.js chartjs.org Usar shadcn Chart
🗄️ ORM/DB Tools (2)

# Tecnología Docs Estado

25 Drizzle ORM orm.drizzle.team ⏳ Verificar llms.txt
26 Superforms superforms.rocks ⏳ Verificar llms.txt
🌐 Otros (5)

# Tecnología Docs Razón

27 Open Props open-props.style Variables CSS
28 TypeBox github.com/sinclairzx81/typebox Con ElysiaJS
29 Drizzle-TypeBox orm.drizzle.team/docs/typebox Integración
30 node-cron npmjs.com/package/node-cron Jobs simples
31 pino/winston getpino.io Logging básico
📊 Resumen
Categoría Cantidad Acción
México Fiscal 4 ⏸️ En pausa
Infraestructura 5 Docs suficientes
Seguridad 4 Docs/SDK suficientes
Utilidades 7 Librerías simples
Data/Export 4 1 pendiente verificar
ORM/DB 2 Pendiente verificar
Otros 5 Docs suficientes
TOTAL 31 -
✅ Conclusión
De estos 31:

4 están en pausa (México fiscal)
3 requieren verificación (ExcelJS, Drizzle, Superforms)
24 son librerías simples que no necesitan MCP (docs suficientes)

---

# ═══════════════════════════════════════════════════════════════════════════════

# 📋 CHECKLIST COMPLETO - INFORMACIÓN PENDIENTE (6 elementos)

# ═══════════════════════════════════════════════════════════════════════════════

> **INSTRUCCIONES:** El usuario proporcionará la información de cada elemento.
> Marcar con ✅ cuando esté completado.

---

## 🔍 GRUPO A: Verificación llms.txt (3)

### ❌ 1. Drizzle ORM

**URL a verificar:** https://orm.drizzle.team/llms.txt
**Repositorio alternativo:** https://github.com/drizzle-team/drizzle-orm

**Qué buscar:**

- Si existe llms.txt en el dominio principal
- Si NO existe, buscar en `/docs/llms.txt` o `/.well-known/llms.txt`
- Si NO existe en ningún lado, buscar archivo README.md completo del repo

**Formato de entrega:**
```
=== DRIZZLE ORM ===
URL probada: [url]
Estado: [EXISTE / NO EXISTE]
Contenido: [copiar todo si existe, o "NO ENCONTRADO"]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/llms-txt-files/drizzle.txt` (si existe)

**Estado:** ⏳ PENDIENTE

---

### ❌ 2. Superforms

**URL a verificar:** https://superforms.rocks/llms.txt
**Repositorio alternativo:** https://github.com/ciscoheat/sveltekit-superforms

**Qué buscar:**

- Si existe llms.txt en el dominio
- Si NO existe, copiar README.md del repositorio
- Si NO hay nada, copiar contenido de la documentación principal

**Formato de entrega:**
```
=== SUPERFORMS ===
URL probada: [url]
Estado: [EXISTE / NO EXISTE]
Contenido: [copiar todo si existe, o README.md del repo]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/llms-txt-files/superforms.txt` (si existe)

**Estado:** ⏳ PENDIENTE

---

### ❌ 3. ExcelJS MCP (comunitario)

**URL a verificar:** https://github.com/negokaz/excel-mcp-server

**Qué buscar:**

- Confirmar que el repositorio existe y está activo
- Última fecha de actualización (commits recientes)
- Copiar README.md completo
- Copiar ejemplo de uso si existe

**Formato de entrega:**
```
=== EXCELJS MCP ===
Repositorio: https://github.com/negokaz/excel-mcp-server
Estado: [ACTIVO / ABANDONADO]
Última actualización: [fecha]
README completo: [copiar todo]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/mcp-comunitarios/excel-mcp-info.md`

**Estado:** ⏳ PENDIENTE

---

## 🇲🇽 GRUPO B: México Fiscal (3)

### ❌ 4. SAT CFDI 4.0 - Especificación Oficial

**URL a verificar:** https://www.sat.gob.mx/consulta/09778/consulta-tu-version-de-cfdi

**URLs adicionales:**

- https://www.sat.gob.mx/cs/Satellite?c=Page&cid=1395147032121&pagename=SAT/Page/SATHome
- Buscar "Anexo 20" en el SAT (catálogos CFDI)

**Qué buscar:**

1. Versión actual de CFDI (debe ser 4.0)
2. URL del XSD oficial (esquema XML)
3. Tipos de comprobante (I=Ingreso, E=Egreso, P=Pago, T=Traslado, N=Nómina)
4. Lista de complementos disponibles (Pago 2.0, Nómina 1.2, etc.)
5. Reglas de validación principales
6. Guía de llenado (si está disponible)

**Formato de entrega:**
```
=== SAT CFDI 4.0 ===
Versión actual: [4.0 o la que sea]
URL XSD oficial: [url del esquema]
Tipos de comprobante: [listar todos]
Complementos disponibles: [listar principales]
Reglas principales: [copiar resumen]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/mexico-fiscal/sat-cfdi-4.0-spec.md`

**Estado:** ⏳ PENDIENTE

---

### ❌ 5. NodeCFDI - Librerías JavaScript

**URLs a verificar:**

- https://www.npmjs.com/package/@nodecfdi/cfdi-core
- https://www.npmjs.com/package/@nodecfdi/sat-estado-cfdi
- https://www.npmjs.com/package/@nodecfdi/cfdi-expresiones

**Qué buscar:**

- README completo de cada librería
- Versión actual de cada una
- Ejemplos de uso básico
- API principal (funciones más importantes)

**Formato de entrega:**
```
=== NODECFDI LIBRARIES ===

## @nodecfdi/cfdi-core
Versión: [x.x.x]
README: [copiar completo]

## @nodecfdi/sat-estado-cfdi
Versión: [x.x.x]
README: [copiar completo]

## @nodecfdi/cfdi-expresiones
Versión: [x.x.x]
README: [copiar completo]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/mexico-fiscal/nodecfdi-libraries.md`

**Estado:** ⏳ PENDIENTE

---

### ❌ 6. Finkok PAC - API Timbrado

**URL a verificar:** https://wiki.finkok.com/doku.php?id=quick_start

**URLs adicionales:**

- https://wiki.finkok.com/doku.php?id=metodos (métodos disponibles)
- https://demo-facturacion.finkok.com/ (ambiente demo)

**Qué buscar:**

1. Quick Start Guide completo
2. Endpoints principales:
   - Timbrado (stamp)
   - Cancelación (cancel)
   - Consulta de folios
3. Diferencias entre ambiente TEST y PRODUCCIÓN
4. Formato de requests y responses
5. Códigos de error comunes

**Formato de entrega:**
```
=== FINKOK PAC ===
Quick Start: [copiar guía]
Endpoints principales: [listar con URLs]
Ambiente TEST: [URL y configuración]
Ambiente PROD: [URL y configuración]
Ejemplo request: [copiar si existe]
Códigos de error: [copiar tabla si existe]
```

**Dónde se guardará:** `16_MCP_CONFIGURACION/mexico-fiscal/finkok-pac-api.md`

**Estado:** ⏳ PENDIENTE

---

## 📊 RESUMEN DE PROGRESO

| #   | Elemento               | Categoría      | Prioridad | Estado      |
| --- | ---------------------- | -------------- | --------- | ----------- |
| 1   | Drizzle ORM llms.txt   | Verificación   | Media     | ⏳ PENDIENTE |
| 2   | Superforms llms.txt    | Verificación   | Media     | ⏳ PENDIENTE |
| 3   | ExcelJS MCP comunitario| Verificación   | Baja      | ⏳ PENDIENTE |
| 4   | SAT CFDI 4.0           | México Fiscal  | Alta*     | ⏳ PENDIENTE |
| 5   | NodeCFDI librerías     | México Fiscal  | Alta*     | ⏳ PENDIENTE |
| 6   | Finkok PAC API         | México Fiscal  | Media*    | ⏳ PENDIENTE |

\*Prioridad alta para documentación, pero implementación en Fase 5

---

## 🎯 INSTRUCCIONES PARA EL USUARIO

**Cómo proceder:**

1. Copia el formato de cada elemento (el bloque que dice "Formato de entrega")
2. Ve a las URLs indicadas
3. Copia la información solicitada
4. Pega el resultado completo en el chat
5. Yo crearé los archivos correspondientes y actualizaré este checklist

**Puedes hacerlo de uno en uno o varios a la vez, como prefieras.**

**Cuando termines los 6, el PASO 1 estará 100% completo.** ✅

---

_Última actualización checklist: 13 Diciembre 2025_
_Completados: 0/6 | Pendientes: 6/6_
