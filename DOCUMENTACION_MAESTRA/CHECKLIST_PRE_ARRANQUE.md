# ✅ CHECKLIST PRE-ARRANQUE

## Orden Exacto de Ejecución para Iniciar el Proyecto

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión:** 1.0  
**Fecha:** 8 Diciembre 2025  
**Propósito:** Guía simplificada paso a paso antes de escribir código

---

## 🎯 RESUMEN EJECUTIVO

```
ORDEN DE DEPENDENCIAS:

[1] VPS → [2] GitHub → [3] Dokploy → [4] Base Datos → [5] Código
         ↳ Sin VPS, Dokploy no funciona
         ↳ Sin GitHub, no hay CI/CD
         ↳ Sin Dokploy, no hay donde desplegar
```

---

## 📋 FASE 0: INFRAESTRUCTURA (Antes del código)

### PASO 0.1: VPS + Dominio

**Tiempo estimado:** 1-2 horas

| Tarea                              | Estado | Notas                       |
| ---------------------------------- | :----: | --------------------------- |
| Comprar/tener VPS (4GB RAM mínimo) |   ⬜   | Hetzner, DigitalOcean, etc. |
| Dominio apuntando al VPS           |   ⬜   | DNS A record                |
| SSH acceso configurado             |   ⬜   | `ssh root@tu-vps.com`       |
| Docker + Docker Compose instalados |   ⬜   | Script abajo                |

```bash
# En el VPS (una vez conectado por SSH):
curl -fsSL https://get.docker.com | sh
docker --version  # Debe mostrar 24.x+
```

---

### PASO 0.2: Dokploy (PaaS Self-Hosted)

**Tiempo estimado:** 30 minutos  
**Dependencia:** VPS funcionando

| Tarea                   | Estado | Notas                     |
| ----------------------- | :----: | ------------------------- |
| Instalar Dokploy en VPS |   ⬜   | Script oficial            |
| Acceder a panel web     |   ⬜   | `https://tu-vps.com:3000` |
| Crear usuario admin     |   ⬜   | Guardar credenciales      |
| Generar API Key         |   ⬜   | Para el MCP               |

```bash
# En el VPS:
curl -sSL https://dokploy.com/install.sh | sh
# Seguir instrucciones en pantalla
```

**Después de instalar:**

1. Abrir `https://tu-vps.com:3000` en navegador
2. Crear cuenta admin
3. Ir a Settings → API → Generate Token
4. Copiar el token

---

### PASO 0.3: GitHub Repository

**Tiempo estimado:** 15 minutos  
**Dependencia:** Cuenta GitHub

| Tarea                | Estado | Notas                 |
| -------------------- | :----: | --------------------- |
| Crear repo privado   |   ⬜   | `pro-finan-conta-pym` |
| Agregar secretos     |   ⬜   | Ver lista abajo       |
| Conectar con Dokploy |   ⬜   | OAuth o Deploy Key    |

**Secretos requeridos en GitHub:**

```
DOKPLOY_URL=https://tu-vps.com:3000
DOKPLOY_API_KEY=dk_xxxxx
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

---

### PASO 0.4: Configurar MCPs en VS Code

**Tiempo estimado:** 15 minutos  
**Dependencia:** Dokploy API Key + GitHub Token

| Tarea                           | Estado | Notas                 |
| ------------------------------- | :----: | --------------------- |
| Abrir `.vscode/mcp.json`        |   ⬜   | Ya existe             |
| Activar Dokploy (disabled→true) |   ⬜   | Agregar URL y API Key |
| Verificar GitHub token          |   ⬜   | `GITHUB_TOKEN` en env |

**Editar `.vscode/mcp.json`:**

```json
"dokploy": {
  "disabled": false,  // <-- Cambiar de true a false
  "command": "npx",
  "args": ["-y", "@ahdev/dokploy-mcp"],
  "env": {
    "DOKPLOY_URL": "https://tu-vps.com:3000",
    "DOKPLOY_API_KEY": "dk_xxxxx"
  }
}
```

---

## 📋 FASE 1: BASES DE DATOS

### PASO 1.1: PostgreSQL en Dokploy

**Tiempo estimado:** 10 minutos

| Tarea                     | Estado | Notas                       |
| ------------------------- | :----: | --------------------------- |
| Crear servicio PostgreSQL |   ⬜   | En Dokploy → New → Database |
| Configurar puerto 5432    |   ⬜   | O dejar interno             |
| Copiar connection string  |   ⬜   | Para app y MCP              |

---

### PASO 1.2: Redis en Dokploy

**Tiempo estimado:** 10 minutos

| Tarea                    | Estado | Notas                       |
| ------------------------ | :----: | --------------------------- |
| Crear servicio Redis     |   ⬜   | En Dokploy → New → Database |
| Configurar puerto 6379   |   ⬜   | O dejar interno             |
| Copiar connection string |   ⬜   | `redis://...`               |

---

## 📋 FASE 2: PROYECTO LOCAL

### PASO 2.1: Clonar/Crear Proyecto

**Tiempo estimado:** 30 minutos

```bash
# Opción A: Clonar desde GitHub
git clone git@github.com:tu-usuario/pro-finan-conta-pym.git
cd pro-finan-conta-pym

# Opción B: Crear nuevo
mkdir pro-finan-conta-pym && cd pro-finan-conta-pym
bun init

# Instalar stack base
bun add svelte @sveltejs/kit vite drizzle-orm
bun add -d @sveltejs/adapter-node typescript
```

---

### PASO 2.2: Variables de Entorno

**Tiempo estimado:** 10 minutos

Crear archivo `.env.local`:

```bash
# Base de datos (desde Dokploy)
DATABASE_URL=postgresql://user:pass@tu-vps.com:5432/fintech_db
REDIS_URL=redis://tu-vps.com:6379

# Auth (generar nuevos)
AUTH_SECRET=openssl rand -base64 32

# APIs (obtener de cada servicio)
GITHUB_TOKEN=ghp_xxxx
SENTRY_AUTH_TOKEN=sntrys_xxxx
OPENAI_API_KEY=sk-xxxx  # o Gemini

# Opcional
CLOUDFLARE_API_TOKEN=xxxx
RESEND_API_KEY=re_xxxx
```

---

## 📋 FASE 3: VERIFICACIÓN

### Checklist Final Antes de Codear

| #   | Verificación        | Comando/Acción                  | ✅  |
| --- | ------------------- | ------------------------------- | :-: |
| 1   | VPS accesible       | `ping tu-vps.com`               | ⬜  |
| 2   | Dokploy funcionando | Abrir `https://tu-vps.com:3000` | ⬜  |
| 3   | PostgreSQL conecta  | `psql $DATABASE_URL`            | ⬜  |
| 4   | Redis conecta       | `redis-cli -u $REDIS_URL ping`  | ⬜  |
| 5   | GitHub repo existe  | `git remote -v`                 | ⬜  |
| 6   | MCPs funcionan      | Abrir VS Code, verificar panel  | ⬜  |
| 7   | Bun instalado       | `bun --version` (1.2+)          | ⬜  |

---

## 🚀 ¿QUÉ SIGUE DESPUÉS?

Una vez completado este checklist:

1. **Seguir `00_ROADMAP_EJECUCION_PASO_A_PASO.md`** → Fase 0 a Fase 9
2. **Consultar `03_STACK_TECNOLOGICO_DEFINITIVO.md`** → Para cada tecnología
3. **Usar MCPs** → Svelte, shadcn, PostgreSQL, etc.

---

## 📚 REFERENCIAS

| Documento                                          | Propósito                |
| -------------------------------------------------- | ------------------------ |
| `00_ROADMAP_EJECUCION_PASO_A_PASO.md`              | Roadmap completo 9 fases |
| `03_STACK_TECNOLOGICO_DEFINITIVO.md`               | Stack tecnológico        |
| `16_MCP_CONFIGURACION/00_RESUMEN_EJECUTIVO_MCP.md` | Estado MCPs              |
| `04_DOKPLOY_CONFIGURACION_COMPLETA.md`             | Guía detallada Dokploy   |

---

## 🔄 PENDIENTES ESPECÍFICOS DEL PROYECTO

### Después de configurar infraestructura:

| Pendiente            | Descripción                       | Cuándo hacerlo    |
| -------------------- | --------------------------------- | ----------------- |
| **GitHub pasos 2-3** | Crear repo + conectar CI/CD       | Fase 0.3          |
| **Dokploy MCP**      | Activar cuando VPS esté listo     | Fase 0.4          |
| **llms.txt SAT**     | Crear documentación para SAT/CFDI | Fase 5 (Semana 9) |
| **llms.txt Finkok**  | Documentar API Finkok             | Fase 5 (Semana 9) |

---

_Documento creado: 8 Diciembre 2025_  
_Versión: 1.0_  
_Sincronizado con: ROADMAP v5.0, MCP Resumen, Stack v5.0_
