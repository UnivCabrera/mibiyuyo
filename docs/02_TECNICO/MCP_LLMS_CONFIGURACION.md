# 🤖 MCPs Y LLMs — CONFIGURACIÓN PARA MIBIYUYO

> **Versión:** 1.0
> **Fecha:** 14 Diciembre 2025
> **MCPs Configurados:** 22
> **llms.txt Verificados:** 9

---

## 🎯 RESUMEN DE HERRAMIENTAS IA

mibiyuyo cuenta con una configuración avanzada de herramientas de IA para acelerar el desarrollo:

| Categoría | Cantidad | Estado |
|:---|:---:|:---:|
| **MCPs activos** | 21 | ✅ |
| **MCPs pausados** | 1 | ⏸️ |
| **llms.txt verificados** | 9 | ✅ |
| **Cobertura del stack** | 49% | 30/61 tecnologías |

---

## 📦 MCPs CONFIGURADOS

### Ubicación

```
.vscode/mcp.json
```

### Core Development (8)

| MCP | Paquete | Descripción | Estado |
|:---|:---|:---|:---:|
| `svelte` | `@sveltejs/mcp` | Documentación Svelte 5, Runes, SvelteKit | ✅ |
| `vite` | HTTP `:5173/__mcp` | Config, plugins, SSR | ✅ |
| `shadcn` | `shadcn@latest mcp` | Componentes UI | ✅ |
| `zod` | `https://mcp.zod.dev/sse` | Schemas, validación | ✅ |
| `css` | `css-mcp` | Documentación CSS MDN | ✅ |
| `lucide-icons` | `lucide-icons-mcp` | Búsqueda de iconos | ✅ |
| `playwright` | `@playwright/mcp` | Testing E2E | ✅ |
| `github` | `@modelcontextprotocol/server-github` | Repos, issues, PRs | ✅ |

### Databases (3)

| MCP | Paquete | Descripción | Estado |
|:---|:---|:---|:---:|
| `postgres` | `@modelcontextprotocol/server-postgres` | Queries PostgreSQL | ✅ |
| `redis` | `@redis/mcp-redis` | Operaciones cache | ✅ |
| `sqlite` | `@modelcontextprotocol/server-sqlite` | DB local testing | ✅ |

### Cloud & Infrastructure (6)

| MCP | Paquete | Descripción | Estado |
|:---|:---|:---|:---:|
| `docker` | `@docker/mcp-toolkit` | Containers | ✅ |
| `firebase` | `firebase-tools mcp` | Firebase services | ✅ |
| `cloudflare-ai` | `https://ai.cloudflare.com/mcp/sse` | Workers AI | ✅ |
| `sentry` | `@modelcontextprotocol/server-sentry` | Error tracking | ✅ |
| `dokploy` | `@ahdev/dokploy-mcp` | Despliegues | ⏸️* |
| `linear` | `https://mcp.linear.app/mcp` | Project management | ✅ |

### AI & Communication (3)

| MCP | Paquete | Descripción | Estado |
|:---|:---|:---|:---:|
| `openai` | `@anthropic-ai/mcp-openai` | OpenAI API | ✅ |
| `resend` | `@anthropic-ai/mcp-resend` | Email transaccional | ✅ |
| `fetch` | `@anthropic-ai/mcp-fetch` | HTTP requests | ✅ |

### Utilities (2)

| MCP | Paquete | Descripción | Estado |
|:---|:---|:---|:---:|
| `filesystem` | `@anthropic-ai/mcp-filesystem` | Gestión de archivos | ✅ |
| `minio` | (pendiente) | S3-compatible storage | ⏸️ |

*Dokploy: Requiere configurar `DOKPLOY_URL` y `DOKPLOY_API_KEY` del VPS

---

## 📚 llms.txt VERIFICADOS (9)

Recursos con documentación optimizada para LLMs:

| Tecnología | URL | Contenido Principal |
|:---|:---|:---|
| **Svelte 5** | https://svelte.dev/llms.txt | Runes, Snippets, SvelteKit |
| **Vite** | https://vite.dev/llms.txt | Config, Plugins, SSR |
| **shadcn-svelte** | https://shadcn-svelte.com/llms.txt | Componentes UI |
| **Redis** | https://redis.io/docs/latest/llms.txt | Commands, Pub/Sub |
| **Zod** | https://zod.dev/llms.txt | Schemas, Validation |
| **Bun** | https://bun.sh/llms.txt | Runtime, APIs |
| **ElysiaJS** | https://elysiajs.com/llms.txt | Routes, Plugins |
| **Bits UI** | https://bits-ui.com/llms.txt | Headless components |
| **Better Auth** | https://better-auth.com/llms.txt | Auth framework |

### Cómo Usar llms.txt

Cuando necesites información actualizada de estas tecnologías, puedes:

1. Pedir al LLM que consulte la URL directa
2. Usar el MCP `fetch` para obtener el contenido
3. Referir al AGENTS.md que tiene las URLs listadas

---

## ⚙️ CONFIGURACIÓN DE MCPs

### Variables de Entorno Requeridas

```bash
# .env.local

# ===== MCPs Core =====
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# ===== Monitoring =====
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx

# ===== Cloud =====
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxx

# ===== Communication =====
RESEND_API_KEY=re_xxxxxxxxxxxx

# ===== AI =====
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# ===== Database (para MCPs de DB) =====
REDIS_URL=redis://localhost:6379
POSTGRES_CONNECTION_STRING=postgresql://localhost:5432/mibiyuyo_dev

# ===== Dokploy (cuando esté el VPS) =====
DOKPLOY_URL=https://tu-vps.com:3000
DOKPLOY_API_KEY=dk_xxxxxxxxxxxx
```

### Activar MCP Dokploy

Cuando tengas el VPS configurado:

1. Acceder a `http://[tu-ip-vps]:3000`
2. Crear cuenta admin
3. Ir a **Settings → API → Generate Token**
4. Copiar el token
5. Editar `.vscode/mcp.json`:

```json
"dokploy": {
  "disabled": false,
  "command": "npx",
  "args": ["-y", "@ahdev/dokploy-mcp"],
  "env": {
    "DOKPLOY_URL": "https://tu-vps.com:3000",
    "DOKPLOY_API_KEY": "dk_xxxx"
  }
}
```

---

## 🔧 USO DE MCPs EN DESARROLLO

### Svelte MCP

```
Herramientas disponibles:
1. list-sections      → Lista secciones de documentación
2. get-documentation  → Obtiene contenido de secciones
3. svelte-autofixer   → Analiza código Svelte
4. playground-link    → Genera link a playground
```

**Flujo recomendado:**

1. `list-sections` primero para encontrar temas
2. `get-documentation` para obtener contenido relevante
3. `svelte-autofixer` SIEMPRE antes de entregar código

### CSS MCP

```
Herramientas disponibles:
1. get_docs               → Documentación de propiedades CSS
2. get_browser_compatibility → Compatibilidad de navegadores
3. analyze_css            → Análisis de calidad CSS
4. analyze_project_css    → Análisis de todo el proyecto
```

### shadcn MCP

```
Herramientas disponibles:
1. Browse Components  → Lista componentes disponibles
2. Search             → Busca por nombre/funcionalidad
3. Install            → Agrega componentes al proyecto
```

### Redis MCP

```
Herramientas disponibles:
1. redis-cli         → Ejecuta comandos Redis
2. inspect-keys      → Inspecciona claves
3. cache-operations  → Get, Set, Delete, Expire
```

### PostgreSQL MCP

```
Herramientas disponibles:
1. query            → Ejecuta SQL
2. describe-table   → Schema de tabla
3. list-tables      → Lista tablas
```

### Sentry MCP

```
Herramientas disponibles:
1. list-issues       → Issues del proyecto
2. get-issue-details → Detalle de issue
3. list-events       → Eventos de issue
```

---

## 🇲🇽 IMPLEMENTACIONES MANUALES (México)

Algunas funcionalidades mexicanas requieren implementación manual:

| Concepto | Implementación | Regex/Formato |
|:---|:---|:---|
| **RFC** | Validación regex | `/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/` |
| **CURP** | Validación regex | `/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/` |
| **SAT/CFDI** | API propia | https://www.sat.gob.mx/ |
| **Bancos MX** | Belvo/Finerio | APIs externas |

### Ejemplo: Validación RFC

```typescript
// src/lib/utils/mexico.ts

export function validateRFC(rfc: string): boolean {
  const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
  return rfcRegex.test(rfc.toUpperCase());
}

export function validateCURP(curp: string): boolean {
  const curpRegex = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;
  return curpRegex.test(curp.toUpperCase());
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
}
```

---

## 📋 RECURSOS SIN llms.txt

Tecnologías que requieren documentación estándar:

| Tecnología | URL de Documentación |
|:---|:---|
| Lucide Icons | https://lucide.dev/icons/ |
| Superforms | https://superforms.rocks/ |
| TanStack Table | https://tanstack.com/table/ |
| Chart.js | https://www.chartjs.org/docs/ |
| Sonner | NPM package docs |
| Traefik | https://doc.traefik.io/ |
| BetterStack | https://betterstack.com/docs |
| PdfMake | https://pdfmake.github.io/docs/ |
| Linear | https://linear.app/developers |

---

## ⏸️ MCPs EN PAUSA (Contabilidad México)

Para cuando se implemente el módulo fiscal (Mes 9+):

| Tecnología | Razón | Acción Pendiente |
|:---|:---|:---|
| SAT/CFDI | Core fiscal | Crear MCP propio o wrapper |
| Finkok PAC | Timbrado | Evaluar API, crear wrapper |
| Finerio Connect | Open Banking | Evaluar costos, integrar |

---

## 🔄 ACTUALIZACIÓN DE MCPs

### Verificar Actualizaciones

```bash
# Verificar versiones de paquetes MCP
npm outdated -g @sveltejs/mcp
npm outdated -g @modelcontextprotocol/server-postgres

# Actualizar específico
npm update -g @sveltejs/mcp

# Actualizar todos
npm update -g
```

### Agregar Nuevo MCP

1. Editar `.vscode/mcp.json`
2. Agregar configuración del nuevo MCP
3. Configurar variables de entorno necesarias
4. Recargar VS Code
5. Verificar en panel de MCPs

---

## 📊 MÉTRICAS DE USO

### MCPs Más Utilizados (estimado)

| MCP | Uso Esperado | Contexto |
|:---|:---|:---|
| `svelte` | 🔴 Alto | Todo desarrollo frontend |
| `postgres` | 🔴 Alto | Queries, debugging |
| `css` | 🟡 Medio | Estilos, documentación |
| `github` | 🟡 Medio | Issues, PRs |
| `sentry` | 🟡 Medio | Debugging errores |
| `redis` | 🟢 Bajo | Cache, sesiones |

---

**Documento:** MCP_LLMS_CONFIGURACION.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025

> *"22 MCPs listos para acelerar tu desarrollo."* 🤖
