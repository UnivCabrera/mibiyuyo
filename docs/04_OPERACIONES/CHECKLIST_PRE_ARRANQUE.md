# ✅ CHECKLIST PRE-ARRANQUE — MIBIYUYO

> **Versión:** 1.0
> **Fecha:** 14 Diciembre 2025
> **Objetivo:** Guía paso a paso antes de escribir código
> **Proveedor VPS:** Hostinger (Kit Dokploy preinstalado)

---

## 🎯 RESUMEN DE DEPENDENCIAS

```
ORDEN DE EJECUCIÓN:

[1] VPS Hostinger → [2] Acceder Dokploy → [3] GitHub → [4] Bases de Datos → [5] Código
    ↳ Docker ya viene incluido
    ↳ NO instalas nada manualmente
    ↳ Solo accedes a http://[ip]:3000
```

---

## 📋 FASE 0: INFRAESTRUCTURA

### PASO 0.1: VPS Hostinger con Kit Dokploy

**Tiempo estimado:** 15-30 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | Comprar VPS Hostinger (4GB RAM mínimo) | ⬜ | [hostinger.com](https://www.hostinger.com) |
| 2 | Seleccionar **Kit: Dokploy** | ⬜ | NO Docker solo |
| 3 | Esperar activación (~5 min) | ⬜ | Recibes email con IP |
| 4 | Anotar IP del VPS | ⬜ | Ejemplo: `185.xxx.xxx.xxx` |
| 5 | Configurar DNS del dominio | ⬜ | A record → IP del VPS |

**¿Qué incluye el Kit Dokploy?**

- ✅ Ubuntu 24.04 LTS
- ✅ Docker CE + Docker Compose (interno)
- ✅ Dokploy preinstalado y corriendo
- ✅ Traefik configurado

---

### PASO 0.2: Acceder a Dokploy

**Tiempo estimado:** 5 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | Abrir navegador | ⬜ | Chrome, Firefox |
| 2 | Ir a `http://[TU-IP-VPS]:3000` | ⬜ | Ejemplo: `http://185.123.45.67:3000` |
| 3 | Crear cuenta admin | ⬜ | Email + contraseña segura |
| 4 | Guardar credenciales | ⬜ | En gestor de contraseñas |
| 5 | Generar API Key | ⬜ | Settings → API → Generate Token |
| 6 | Copiar y guardar token | ⬜ | `dk_xxxx...` |

---

### PASO 0.3: Configurar SSL/HTTPS

**Tiempo estimado:** 10 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | Ir a Settings en Dokploy | ⬜ | ⚙️ en sidebar |
| 2 | Ingresar dominio | ⬜ | `mibiyuyo.com` |
| 3 | Ingresar email | ⬜ | Para Let's Encrypt |
| 4 | Seleccionar "Let's Encrypt" | ⬜ | SSL gratis |
| 5 | Guardar y esperar | ⬜ | ~2 minutos |

Después accedes via `https://mibiyuyo.com:3000`

---

### PASO 0.4: GitHub Repository

**Tiempo estimado:** 15 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | Crear repo privado | ⬜ | `mibiyuyo` |
| 2 | Agregar secretos de GitHub | ⬜ | Ver lista abajo |
| 3 | Conectar con Dokploy | ⬜ | OAuth o Deploy Key |

**Secretos de GitHub Actions:**
```
DOKPLOY_URL=https://mibiyuyo.com:3000
DOKPLOY_API_KEY=dk_xxxxx
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

### PASO 0.5: Configurar MCPs en VS Code

**Tiempo estimado:** 15 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | Abrir `.vscode/mcp.json` | ⬜ | Ya existe |
| 2 | Activar Dokploy | ⬜ | `disabled: false` |
| 3 | Agregar URL y API Key | ⬜ | Del paso 0.2 |
| 4 | Configurar GITHUB_TOKEN | ⬜ | En variables de entorno |
| 5 | Recargar VS Code | ⬜ | Verificar panel MCPs |

**Editar `.vscode/mcp.json`:**
```json
"dokploy": {
  "disabled": false,
  "command": "npx",
  "args": ["-y", "@ahdev/dokploy-mcp"],
  "env": {
    "DOKPLOY_URL": "https://mibiyuyo.com:3000",
    "DOKPLOY_API_KEY": "dk_xxxxx"
  }
}
```

---

## 📋 FASE 1: BASES DE DATOS

### PASO 1.1: PostgreSQL en Dokploy

**Tiempo estimado:** 10 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | En Dokploy → New → Database | ⬜ | Seleccionar PostgreSQL |
| 2 | Nombre: `mibiyuyo-db` | ⬜ | |
| 3 | Configurar puerto 5432 | ⬜ | O dejar interno |
| 4 | Crear database: `mibiyuyo` | ⬜ | |
| 5 | Copiar connection string | ⬜ | Para app y MCP |

**Connection string formato:**
```
postgresql://user:password@hostname:5432/mibiyuyo
```

---

### PASO 1.2: Redis en Dokploy

**Tiempo estimado:** 10 minutos

| # | Tarea | Estado | Notas |
|:---:|:---|:---:|:---|
| 1 | En Dokploy → New → Database | ⬜ | Seleccionar Redis |
| 2 | Nombre: `mibiyuyo-redis` | ⬜ | |
| 3 | Configurar puerto 6379 | ⬜ | O dejar interno |
| 4 | Copiar connection string | ⬜ | `redis://...` |

---

## 📋 FASE 2: PROYECTO LOCAL

### PASO 2.1: Clonar y Configurar

**Tiempo estimado:** 30 minutos

```bash
# Clonar desde GitHub
git clone git@github.com:tu-usuario/mibiyuyo.git
cd mibiyuyo

# Instalar Bun (si no lo tienes)
curl -fsSL https://bun.sh/install | bash

# Verificar versión
bun --version  # 1.3.3+

# Instalar dependencias
bun install
```

---

### PASO 2.2: Variables de Entorno

**Tiempo estimado:** 10 minutos

Crear `.env.local`:

```bash
# ===== Base de Datos =====
DATABASE_URL=postgresql://user:pass@localhost:5432/mibiyuyo_dev
REDIS_URL=redis://localhost:6379

# ===== Autenticación =====
AUTH_SECRET=tu-secreto-de-32-caracteres-minimo
BETTER_AUTH_URL=http://localhost:5173

# ===== MCPs =====
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxx
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# ===== Dokploy (producción) =====
DOKPLOY_URL=https://mibiyuyo.com:3000
DOKPLOY_API_KEY=dk_xxxxxxxxxxxx
```

---

### PASO 2.3: Inicializar Proyecto SvelteKit

**Si empiezas desde cero:**

```bash
# Crear proyecto SvelteKit
bun create svelte@latest mibiyuyo-app

# Opciones:
# - Skeleton project
# - TypeScript
# - ESLint, Prettier, Playwright

# Instalar dependencias del stack
bun add drizzle-orm postgres better-auth
bun add -d drizzle-kit @types/node

# Instalar ElysiaJS para API
bun add elysia @elysiajs/cors @elysiajs/swagger

# Instalar UI
bun add bits-ui lucide-svelte
npx shadcn-svelte@latest init
```

---

## 📋 FASE 3: VERIFICACIÓN

### Checklist Final

| # | Verificación | Comando/Acción | ✅ |
|:---:|:---|:---|:---:|
| 1 | VPS accesible | `ping mibiyuyo.com` | ⬜ |
| 2 | Dokploy funcionando | Abrir `https://mibiyuyo.com:3000` | ⬜ |
| 3 | PostgreSQL conecta | `psql $DATABASE_URL` | ⬜ |
| 4 | Redis conecta | `redis-cli -u $REDIS_URL ping` | ⬜ |
| 5 | GitHub repo existe | `git remote -v` | ⬜ |
| 6 | MCPs funcionan | Verificar panel VS Code | ⬜ |
| 7 | Bun instalado | `bun --version` | ⬜ |
| 8 | Proyecto compila | `bun run dev` | ⬜ |

---

## 🚀 DESPUÉS DEL CHECKLIST

Una vez completado:

1. **Seguir el Roadmap** → `docs/00_ESTRATEGIA/ROADMAP_12_MESES_DETALLADO.md`
2. **Asignar tareas del Mes 1** → 6 features + 30 aportes internos
3. **Meeting de kickoff** → Equipo de 6 personas
4. **Comenzar desarrollo** → V1 "El Fundamento"

---

## 📁 ESTRUCTURA FINAL DEL PROYECTO

```
mibiyuyo/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .vscode/
│   ├── mcp.json              # 22 MCPs
│   └── settings.json
├── docs/
│   ├── 00_ESTRATEGIA/
│   ├── 01_PRODUCTO/
│   ├── 02_TECNICO/
│   ├── 03_SEGURIDAD/
│   └── 04_OPERACIONES/
├── src/
│   ├── app.css
│   ├── app.html
│   ├── lib/
│   │   ├── components/
│   │   ├── server/
│   │   └── utils/
│   └── routes/
├── static/
├── tests/
├── _LEGADO_PRO_FINAN_CONTA_PYM/
├── .env.local
├── .env.example
├── AGENTS.md
├── MIBIYUYO_DOCUMENTO_MAESTRO.md
├── package.json
├── svelte.config.js
├── vite.config.ts
└── drizzle.config.ts
```

---

## ⏰ TIMELINE ESTIMADO

| Fase | Tiempo | Resultado |
|:---|:---:|:---|
| Comprar VPS | 30 min | VPS activo |
| Configurar Dokploy | 30 min | Panel accesible, SSL |
| Bases de datos | 20 min | PostgreSQL + Redis |
| Proyecto local | 45 min | Dev environment listo |
| Verificación | 15 min | Todo funcionando |
| **Total** | **~2.5 horas** | **Listo para desarrollar** |

---

**Documento:** CHECKLIST_PRE_ARRANQUE.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025

> *"Infraestructura primero, código después."* 🏗️
