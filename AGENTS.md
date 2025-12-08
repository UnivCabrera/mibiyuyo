# 🤖 Agent Instructions - FinTech SaaS México

> Este archivo instruye a los LLMs sobre cómo usar los MCPs disponibles y las reglas específicas del proyecto.

---

## 🔧 MCP Servers Disponibles

### 1. Svelte MCP (`@sveltejs/mcp`)

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation.

#### Available MCP Tools:

**1. list-sections**
Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

**2. get-documentation**
Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

**3. svelte-autofixer**
Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

**4. playground-link**
Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.

---

### 2. CSS MCP (`css-mcp`)

You have access to the CSS MCP server by @stolinski for comprehensive CSS documentation and analysis.

#### Available MCP Tools:

**1. get_docs**
Fetch CSS documentation for any property, selector, function, or concept from MDN.
Examples: `get_docs({ slug: "grid" })`, `get_docs({ slug: ":has" })`, `get_docs({ slug: "flexbox" })`

**2. get_browser_compatibility**
Fetch browser compatibility data for CSS features.
Example: `get_browser_compatibility({ bcd_id: "css.properties.grid" })`

**3. analyze_css**
Analyze CSS code for quality, complexity, and design patterns. Returns 150+ metrics.
Use `summaryOnly: true` for lightweight response, `summaryOnly: false` for complete analysis.

**4. analyze_project_css**
Analyze all CSS files in a project directory. Framework-agnostic.
Example: `analyze_project_css({ path: "src" })`

---

### 3. shadcn MCP (`shadcn@latest mcp`)

You have access to the shadcn MCP server for browsing and installing UI components.

#### Available MCP Tools:

**1. Browse Components**
List all available components, blocks, and templates from configured registries.

**2. Search Across Registries**
Find specific components by name or functionality.

**3. Install with Natural Language**
Add components using simple conversational prompts like "add a login form".

**Note**: For shadcn-svelte, ensure the registry is configured in `components.json`:
```json
{
  "registries": {
    "@shadcn-svelte": "https://shadcn-svelte.com/registry"
  }
}
```

---

### 4. Redis MCP (`@redis/mcp-redis`)

Official Redis MCP server for database operations and caching.

#### Available MCP Tools:

**1. redis-cli**
Execute Redis CLI commands directly.
Examples: `SET key value`, `GET key`, `HGETALL hash`, `KEYS pattern*`

**2. inspect-keys**
Inspect keys matching a pattern with their types and TTL.

**3. cache-operations**
Perform cache operations: get, set, delete, expire.

**Note**: Requires `REDIS_URL` environment variable configured.

---

### 5. PostgreSQL MCP (`@modelcontextprotocol/server-postgres`)

Official MCP server for PostgreSQL database operations.

#### Available MCP Tools:

**1. query**
Execute SQL queries against the connected database.
Example: `SELECT * FROM users WHERE active = true`

**2. describe-table**
Get table schema information including columns, types, and constraints.

**3. list-tables**
List all tables in the current database.

**Note**: Requires `POSTGRES_CONNECTION_STRING` environment variable.

---

### 6. Sentry MCP (`@modelcontextprotocol/server-sentry`)

Official MCP server for Sentry error tracking and performance monitoring.

#### Available MCP Tools:

**1. list-issues**
Retrieve issues from a Sentry project with filtering options.

**2. get-issue-details**
Get detailed information about a specific issue.

**3. list-events**
List events associated with an issue.

**Note**: Requires `SENTRY_AUTH_TOKEN` environment variable.

---

## 📚 Recursos con llms.txt (usar documentación directa)

| Tecnología | llms.txt URL |
|------------|--------------|
| Svelte 5 | https://svelte.dev/llms.txt |
| Vite | https://vite.dev/llms.txt |
| shadcn-svelte | https://shadcn-svelte.com/llms.txt |
| Redis | https://redis.io/docs/latest/llms.txt |
| Zod | https://zod.dev/llms.txt |
| Bun | https://bun.sh/llms.txt |
| ElysiaJS | https://elysiajs.com/llms.txt |
| Bits UI | https://bits-ui.com/llms.txt |
| Better Auth | https://better-auth.com/llms.txt |

## 📚 Recursos sin llms.txt (documentación estándar)

| Tecnología | Recurso |
|------------|---------|
| Lucide Icons | https://lucide.dev/icons/ |
| Superforms | https://superforms.rocks/ |
| TanStack Table | https://tanstack.com/table/ |
| Chart.js | https://www.chartjs.org/docs/ |
| Sonner | NPM package docs |
| Traefik | https://doc.traefik.io/ |
| BetterStack | https://betterstack.com/docs |
| PdfMake | https://pdfmake.github.io/docs/ |
| Linear Developers | https://linear.app/developers |

## 🇲🇽 México - Implementaciones Manuales

| Concepto | Implementación |
|----------|----------------|
| RFC Validation | Regex: `/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/` |
| CURP Validation | Regex: `/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/` |
| SAT/CFDI | Referencia: https://www.sat.gob.mx/ |

## 📋 Reglas Específicas del Proyecto

### Stack Tecnológico (NO NEGOCIABLE)

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| Runtime | Bun | 1.3.3+ |
| Framework Backend | ElysiaJS | 1.4.16+ |
| Framework Frontend | Svelte 5 + SvelteKit | 5.x / 2.x |
| ORM | Drizzle ORM | 0.38+ |
| Base de Datos | PostgreSQL | 16.x+ |
| Cache | Redis | 7.x+ |
| Styling | CSS Nativo + Open Props | ❌ NO TAILWIND |
| UI Components | shadcn-svelte + Bits UI | Latest |
| TypeScript | Strict Mode | 5.9+ |

### Reglas de Código Svelte 5

1. **SIEMPRE usar Runes** (nuevo sistema de reactividad):
   ```svelte
   <!-- ✅ CORRECTO - Svelte 5 -->
   <script lang="ts">
     let count = $state(0);
     let doubled = $derived(count * 2);
     
     $effect(() => {
       console.log('Count changed:', count);
     });
   </script>
   ```

   ```svelte
   <!-- ❌ INCORRECTO - Svelte 4 (legacy) -->
   <script>
     let count = 0;
     $: doubled = count * 2;
   </script>
   ```

2. **Props con $props()**:
   ```svelte
   <!-- ✅ CORRECTO -->
   <script lang="ts">
     let { name, age = 18 } = $props<{ name: string; age?: number }>();
   </script>
   ```

3. **Event Handlers sin on:**:
   ```svelte
   <!-- ✅ CORRECTO - Svelte 5 -->
   <button onclick={() => count++}>Click</button>
   
   <!-- ❌ INCORRECTO - Svelte 4 -->
   <button on:click={() => count++}>Click</button>
   ```

4. **Snippets en lugar de slots**:
   ```svelte
   <!-- ✅ CORRECTO - Svelte 5 -->
   {#snippet header()}
     <h1>Title</h1>
   {/snippet}
   
   <Card {header}>Content</Card>
   ```

### Reglas de Estilo (CSS)

1. **NO USAR TAILWIND** - Proyecto usa CSS Nativo + Open Props
2. Preferir CSS variables de Open Props
3. Estilos scoped dentro de `<style>` en componentes Svelte
4. Para estilos globales, usar `app.css`

```svelte
<style>
  .card {
    padding: var(--size-4);
    border-radius: var(--radius-2);
    background: var(--surface-1);
    box-shadow: var(--shadow-2);
  }
</style>
```

### Contexto de Negocio

- **Producto**: SaaS FinTech para PyMEs mexicanas
- **Idioma principal**: Español (México)
- **Moneda**: MXN (Peso Mexicano)
- **Formato RFC**: Validar con regex mexicano
- **Formato fechas**: DD/MM/YYYY o ISO 8601
- **Zona horaria**: America/Mexico_City

### Patrones de Componentes

Seguir estructura de shadcn-svelte:

```
src/lib/components/ui/
├── button/
│   ├── index.ts
│   └── button.svelte
├── card/
│   ├── index.ts
│   ├── card.svelte
│   ├── card-header.svelte
│   └── card-content.svelte
```

---

## 🚫 Prohibiciones

- ❌ NO usar `let` reactivo sin `$state()` en Svelte 5
- ❌ NO usar `$:` statements (son legacy)
- ❌ NO usar `on:` directive (usar `onclick`, `onsubmit`, etc.)
- ❌ NO usar `<slot>` (usar Snippets)
- ❌ NO usar Tailwind CSS
- ❌ NO usar React, Next.js, o cualquier tecnología fuera del stack

---

## ✅ Verificación de Código

Antes de entregar cualquier código Svelte:

1. Verificar que usa Runes ($state, $derived, $effect)
2. Verificar que los props usan $props()
3. Verificar que los eventos usan el nuevo formato (onclick)
4. Ejecutar `svelte-autofixer` del MCP
5. Asegurar que el código compila sin warnings

---

## 🧠 Neurociencias Aplicadas (NUEVO)

El proyecto aplica 4 pilares de neurociencia en todo el UX/UI:

| Pilar | Aplicación |
|:---|:---|
| **Neurociencia Cognitiva** | Ley de Miller (7±2 chunks), reducción de carga mental |
| **Neurociencia Afectiva** | Activación dopamina, reducción cortisol, balance serotonina |
| **Neurociencia del Desarrollo** | Scaffolding (metas progresivas) |
| **Neuropsicología** | Fricción para Sistema 2, prevención de impulsos |

Ver documento completo: `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md`

---

## 💰 Precios Oficiales (UNIFICADOS)

| Plan | Precio |
|:---:|:---:|
| GRATIS | $0/mes |
| PRO | $149/mes |
| FAMILIA | $249/mes |
| NEGOCIO | $299/mes |
| BUSINESS | $499/mes |
| ENTERPRISE | Personalizado |

---

*Última actualización: 8 Diciembre 2025*
*Versión Stack: v5.0*
*MCPs Configurados: 22 (Svelte, Vite, shadcn, PostgreSQL, Redis, SQLite, Sentry, Playwright, Zod, CSS, Lucide, GitHub, Firebase, Cloudflare, Docker, OpenAI, Resend, Fetch, Filesystem, Linear, Dokploy, MinIO)*
*llms.txt Verificados: 9 URLs*
*Tecnologías Investigadas: 61/61 (100%)*
*Cobertura MCP + llms.txt: 49% (30/61)*

## 📚 Documentación Clave

### Nuevos documentos (Diciembre 2025):
- `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` - Framework neurociencias
- `03_MERCADO_COMPETENCIA/03_40_PERFILES_PROFESIONALES.md` - 40 perfiles expandidos
- `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` - Necesidades mercado
- `PROJECT_CHARACTERISTICS/14_PLANIFICADOR_UNIVERSAL_GRATUITO.md` - Planificador gratuito
- `PROJECT_CHARACTERISTICS/15_MODULOS_INNOVADORES.md` - 18 módulos nuevos
- `DOCUMENTACION_MAESTRA/ESTRATEGIA_NEURO_FINANCIERA_2025_2026.md` - Estrategia master

### MCPs:
- `16_MCP_CONFIGURACION/00_RESUMEN_EJECUTIVO_MCP.md` - Resumen rápido
- `16_MCP_CONFIGURACION/INVESTIGACION_MCP_STACK.md` - Documentación completa
- `.vscode/mcp.json` - Configuración de MCPs
