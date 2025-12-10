# ✅ CHECKLIST PRE-ARRANQUE

## Orden Exacto de Ejecución para Iniciar el Proyecto

**Proyecto:** PRO_FINAN_CONTA_PYM
**Versión:** 1.1
**Fecha:** 8 Diciembre 2025
**Propósito:** Guía simplificada paso a paso antes de escribir código
**Proveedor VPS:** Hostinger (Kit Dokploy preinstalado)

---

## 🎯 RESUMEN EJECUTIVO

```
ORDEN DE DEPENDENCIAS (SIMPLIFICADO CON HOSTINGER):

[1] VPS Hostinger (Kit Dokploy) → [2] Acceder Dokploy → [3] GitHub → [4] Bases de Datos → [5] Código
    ↳ Docker ya viene incluido internamente
    ↳ NO necesitas instalar nada manualmente
    ↳ Solo accedes a http://[ip]:3000 y listo
```

---

## 📋 FASE 0: INFRAESTRUCTURA (Antes del código)

### PASO 0.1: VPS Hostinger con Kit Dokploy

**Tiempo estimado:** 15-30 minutos (compra + activación)

> **💡 IMPORTANTE:** Hostinger ofrece "Kits" preinstalados. El **Kit Dokploy** incluye:
>
> - Ubuntu 24.04 LTS
> - Docker CE + Docker Compose (internamente)
> - Dokploy preinstalado y listo para usar
>
> **NO necesitas instalar Docker manualmente. Dokploy abstrae toda la complejidad.**

| Tarea | Estado | Notas |
| --- | :---: | --- |
| Comprar VPS Hostinger (4GB RAM mínimo) | ⬜ | [Dokploy VPS Hosting](https://www.hostinger.com) |
| Seleccionar **Kit: Dokploy** | ⬜ | NO seleccionar "Docker" solo |
| Esperar activación (~5 min) | ⬜ | Recibirás email con IP |
| Anotar IP del VPS | ⬜ | Ejemplo: `185.xxx.xxx.xxx` |
| Dominio apuntando al VPS | ⬜ | DNS A record → IP del VPS |

**Opciones de Kit en Hostinger:**

| Kit | Incluye | ¿Cuál elegir? |
| --- | --- | --- |
| **Dokploy** ✅ | Ubuntu 24.04 + Dokploy + Docker interno | **← ESTE** |
| Docker | Ubuntu 24.04 + Docker CE | Solo si quieres control manual |
| Ubuntu Plain | Solo Ubuntu | Para expertos |

---

### PASO 0.2: Acceder a Dokploy (¡Ya está instalado!)

**Tiempo estimado:** 5 minutos
**Dependencia:** VPS activo

> **🚀 Con el Kit Dokploy de Hostinger, NO necesitas ejecutar ningún comando.**
> Dokploy ya está corriendo. Solo accede al panel web.

| Tarea | Estado | Notas |
| --- | :---: | --- |
| Abrir navegador | ⬜ | Chrome, Firefox, etc. |
| Ir a `http://[TU-IP-VPS]:3000` | ⬜ | Ejemplo: `http://185.123.45.67:3000` |
| Crear cuenta admin | ⬜ | Email + contraseña segura |
| Guardar credenciales | ⬜ | En gestor de contraseñas |
| Generar API Key | ⬜ | Settings → API → Generate Token |

**Pasos en Dokploy:**

1. Abrir `http://[tu-ip]:3000` en navegador
2. Se muestra pantalla de "Create Admin Account"
3. Ingresar email y contraseña
4. ¡Listo! Ya estás en el dashboard

**Para obtener API Key (necesaria para MCP):**

1. Ir a **Settings** (⚙️ en sidebar)
2. Ir a sección **API**
3. Click en **Generate Token**
4. Copiar y guardar el token (`dk_xxxx...`)

---

### PASO 0.3: Configurar SSL/HTTPS (Recomendado)

**Tiempo estimado:** 10 minutos

| Tarea | Estado | Notas |
| --- | :---: | --- |
| Ir a Settings en Dokploy | ⬜ | ⚙️ en sidebar |
| Ingresar dominio | ⬜ | `tudominio.com` |
| Ingresar email | ⬜ | Para Let's Encrypt |
| Seleccionar "Let's Encrypt" | ⬜ | SSL gratis |
| Guardar cambios | ⬜ | Esperar ~2 min |

Después de esto, accedes via `https://tudominio.com:3000`

---

### PASO 0.4: GitHub Repository

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
