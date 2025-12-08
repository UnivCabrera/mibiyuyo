# 🔬 AUDITORÍA COMPLETA: SVELTE 5 + SVELTEKIT MCP

> **Fecha de Auditoría**: 2 Diciembre 2025  
> **Propósito**: Análisis educativo detallado de la configuración MCP para Svelte  
> **Estado**: ✅ AUDITORÍA COMPLETADA

---

## 📊 RESUMEN EJECUTIVO

| Aspecto | Resultado |
|---------|-----------|
| **¿Existe MCP Oficial?** | ✅ **SÍ** - `@sveltejs/mcp` |
| **Mantenedor** | Svelte Team (oficial) |
| **Versión Svelte** | 5.x con Runes ✅ |
| **Calidad Docs** | ⭐⭐⭐⭐⭐ Excelente |
| **Recomendación** | 🟢 **USAR INMEDIATAMENTE** |

---

## 🔗 PARTE 1: AUDITORÍA DE URLs

### ✅ URLs VÁLIDAS Y OFICIALES (USAR)

| # | URL | Estado | Propósito | Prioridad |
|---|-----|--------|-----------|-----------|
| 1 | `https://svelte.dev/docs/mcp/overview` | ✅ ACTIVA | Página principal MCP | 🔴 CRÍTICA |
| 2 | `https://svelte.dev/docs/mcp/local-setup` | ✅ ACTIVA | Setup local (stdio) | 🔴 CRÍTICA |
| 3 | `https://svelte.dev/docs/mcp/remote-setup` | ✅ ACTIVA | Setup remoto (HTTP) | 🟡 ALTERNATIVA |
| 4 | `https://svelte.dev/docs/mcp/tools` | ✅ ACTIVA | Tools del MCP | 🔴 CRÍTICA |
| 5 | `https://svelte.dev/docs/mcp/prompts` | ✅ ACTIVA | Prompts predefinidos | 🟡 ÚTIL |
| 6 | `https://mcp.svelte.dev/mcp` | ✅ ACTIVA | Endpoint remoto MCP | 🟡 ALTERNATIVA |
| 7 | `https://svelte.dev/llms.txt` | ✅ ACTIVA | Índice LLM docs | 🟢 REFERENCIA |
| 8 | `https://svelte.dev/llms-full.txt` | ✅ ACTIVA | Docs completas LLM | 🟢 BACKUP |
| 9 | `https://svelte.dev/llms-medium.txt` | ✅ ACTIVA | Docs comprimidas | 🟢 BACKUP |
| 10 | `https://svelte.dev/llms-small.txt` | ✅ ACTIVA | Docs mínimas | 🟢 BACKUP |
| 11 | `https://svelte.dev/docs/svelte/llms.txt` | ✅ ACTIVA | Svelte específico | 🟢 REFERENCIA |
| 12 | `https://svelte.dev/docs/kit/llms.txt` | ✅ ACTIVA | SvelteKit específico | 🟢 REFERENCIA |
| 13 | `https://svelte.dev/docs/cli/llms.txt` | ✅ ACTIVA | CLI específico | 🟢 REFERENCIA |
| 14 | `https://svelte.dev/packages` | ✅ ACTIVA | Ecosystem packages | 🟡 ÚTIL |
| 15 | `https://svelte.dev/blog/sveltekit-integrated-observability` | ✅ ACTIVA | OpenTelemetry (nuevo) | 🟢 INFO |

### ⚠️ URLs CONDICIONALES

| # | URL | Estado | Veredicto |
|---|-----|--------|-----------|
| 16 | `https://zed.dev/extensions/svelte-mcp` | ✅ ACTIVA | ⚠️ **SOLO si usas Zed**. Es un wrapper del MCP oficial. Para VS Code/Cursor: NO necesitas esto. |
| 17 | `https://github.com/openai/codex/blob/main/docs/config.md` | ✅ ACTIVA | ⚠️ **SOLO si usas Codex CLI**. Es documentación de OpenAI Codex, no de Svelte. |
| 18 | `https://svelte.dev/blog/advent-of-svelte` | ✅ ACTIVA | ⚠️ **NO CRÍTICO** - Es contenido promocional/educativo, no documentación técnica. |

### ❌ URLs INNECESARIAS/REDUNDANTES

| # | URL | Razón de Exclusión |
|---|-----|--------------------|
| - | `https://svelte.dev/docs/svelte/overview` | Ya incluido en MCP automáticamente |
| - | `https://svelte.dev/docs/kit/introduction` | Ya incluido en MCP automáticamente |
| - | `https://svelte.dev/docs/cli/overview` | Ya incluido en MCP automáticamente |

**💡 Nota Importante**: El MCP oficial de Svelte ya incluye TODA la documentación de svelte.dev. No necesitas los archivos llms.txt como fuentes separadas si usas el MCP.

---

## 🎯 PARTE 2: FILTRO DE VERSIÓN (Svelte 5 vs 4)

### ✅ CONFIRMADO: Todo apunta a Svelte 5

El MCP oficial `@sveltejs/mcp` está **específicamente diseñado para Svelte 5**:

```
"You are able to use the Svelte MCP server, where you have access to 
comprehensive Svelte 5 and SvelteKit documentation."
```

### 📋 Features de Svelte 5 Documentados en el MCP

| Feature Svelte 5 | ¿Incluido en MCP? | Path en MCP |
|------------------|-------------------|-------------|
| **Runes ($state, $derived, $effect)** | ✅ Sí | `svelte/runes` |
| **Snippets** | ✅ Sí | `svelte/snippets` |
| **Fine-grained reactivity** | ✅ Sí | `svelte/reactivity` |
| **$props()** | ✅ Sí | `svelte/component-fundamentals` |
| **$bindable()** | ✅ Sí | `svelte/component-fundamentals` |
| **Event handlers (onclick vs on:click)** | ✅ Sí | Migración documentada |
| **Class component API (legacy)** | ✅ Marcado como legacy | `svelte/legacy-*` |

### ⚠️ Secciones Legacy (Svelte 3/4) - IDENTIFICADAS

El MCP **sí incluye** documentación legacy, pero está claramente marcada:

```
- svelte/legacy-overview
- svelte/legacy-let
- svelte/legacy-reactive-assignments
- svelte/legacy-export-let
- svelte/legacy-$$props-and-$$restProps
- svelte/legacy-on
- svelte/legacy-slots
- svelte/legacy-$$slots
- svelte/legacy-svelte-fragment
- svelte/legacy-svelte-component
- svelte/legacy-svelte-self
- svelte/legacy-component-api
```

**🎯 Estrategia**: El MCP categoriza estas como "legacy" con casos de uso específicos:
- "migration from svelte 3/4 to svelte 5"
- "maintaining legacy components"
- "understanding deprecated features"

**Tu acción**: NO necesitas excluirlas manualmente. El LLM las usará solo cuando detecte código legacy que necesita migración.

---

## 🛠️ PARTE 3: PROPUESTA DE CONFIGURACIÓN MCP

### Opción A: VS Code (TU CASO - RECOMENDADA)

**Archivo**: `.vscode/mcp.json` (en la raíz de tu proyecto)

```json
{
  "mcpServers": {
    "svelte": {
      "command": "npx",
      "args": ["-y", "@sveltejs/mcp"]
    }
  }
}
```

**Instalación alternativa vía Command Palette**:
1. `Ctrl+Shift+P` → "MCP: Add Server..."
2. Seleccionar "Command (stdio)"
3. Escribir: `npx -y @sveltejs/mcp`
4. Nombre: `svelte`
5. Seleccionar: `Workspace` (para que aplique solo a este proyecto)

---

### Opción B: Cursor

**Archivo**: `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "svelte": {
      "command": "npx",
      "args": ["-y", "@sveltejs/mcp"]
    }
  }
}
```

---

### Opción C: Remoto (Sin instalación local)

Para cualquier cliente MCP compatible con HTTP:

```json
{
  "mcpServers": {
    "svelte": {
      "url": "https://mcp.svelte.dev/mcp"
    }
  }
}
```

**⚠️ Nota**: La versión local es preferible para:
- Mayor velocidad (sin latencia de red)
- Funciona offline
- Sin dependencia de servidor externo

---

## 📁 PARTE 4: ESTRUCTURA DE ARCHIVOS RECOMENDADA

Para tu proyecto FinTech, crea esta estructura:

```
PRO_FINAN_CONTA_PYM/
├── .vscode/
│   └── mcp.json          ← Configuración MCP para VS Code
├── AGENTS.md             ← Instrucciones para el LLM (opcional pero recomendado)
└── ... resto del proyecto
```

### Contenido de `AGENTS.md` (Recomendado por Svelte Team)

```markdown
# Agent Instructions

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation.

## Available MCP Tools:

### 1. list-sections
Use this FIRST to discover all available documentation sections.

### 2. get-documentation
Retrieves full documentation content for specific sections.

### 3. svelte-autofixer
Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code.

### 4. playground-link
Generates a Svelte Playground link with the provided code.

## Project-Specific Rules:
- This is a FinTech SaaS for Mexican SMBs
- Use Svelte 5 with Runes ($state, $derived, $effect)
- NO Tailwind CSS - use CSS Nativo + Open Props
- Components should follow shadcn-svelte patterns
- All code must be TypeScript strict mode
```

---

## 🔧 PARTE 5: TOOLS DEL MCP EXPLICADOS

El MCP de Svelte provee **4 herramientas**:

### 1. `list-sections`
```
Uso: Listar todas las secciones de documentación disponibles
Cuándo: Al inicio de cualquier tarea relacionada con Svelte
Retorna: Lista con title, use_cases, y paths
```

### 2. `get-documentation`
```
Uso: Obtener documentación completa de secciones específicas
Cuándo: Después de list-sections, para profundizar
Ejemplo: get-documentation("svelte/runes", "svelte/reactivity")
```

### 3. `svelte-autofixer`
```
Uso: Análisis estático del código generado
Cuándo: SIEMPRE antes de entregar código Svelte al usuario
Loop: Llamar hasta que no retorne issues/suggestions
```

### 4. `playground-link`
```
Uso: Generar link de playground con el código
Cuándo: Solo si el usuario lo pide Y el código no se escribió a archivos
```

---

## ✅ PARTE 6: CHECKLIST DE IMPLEMENTACIÓN

### Paso 1: Crear archivo de configuración
- [ ] Crear `.vscode/mcp.json` con la configuración

### Paso 2: Verificar que funciona
- [ ] Abrir VS Code
- [ ] `Ctrl+Shift+P` → "MCP: List Servers"
- [ ] Verificar que aparece "svelte"

### Paso 3: Probar el MCP
- [ ] En chat de Copilot, preguntar algo de Svelte 5
- [ ] Verificar que el LLM usa el MCP (verás actividad en output)

### Paso 4: Opcional - Agregar AGENTS.md
- [ ] Crear `AGENTS.md` con instrucciones específicas del proyecto

---

## 📊 PARTE 7: ANATOMÍA DE LA DECISIÓN

### ¿Cómo llegué a esta configuración?

```
PASO 1: Verificar existencia de MCP oficial
   ↓ 
   ✅ Encontrado: @sveltejs/mcp (npm oficial de Svelte)
   
PASO 2: Verificar que es Svelte 5
   ↓
   ✅ Confirmado: "comprehensive Svelte 5 and SvelteKit documentation"
   
PASO 3: Descartar alternativas
   ↓
   - Zed extension: Solo wrapper, no necesario para VS Code
   - llms.txt files: Redundantes si usas el MCP
   - Documentación manual: Innecesaria con MCP activo
   
PASO 4: Elegir modo de conexión
   ↓
   ✅ Local (stdio) > Remoto (HTTP)
   Razón: Más rápido, funciona offline, sin dependencias externas
   
PASO 5: Generar configuración mínima
   ↓
   Resultado: 6 líneas de JSON
```

---

## 🎓 LECCIÓN APRENDIDA

### Patrón para evaluar MCPs de cualquier tecnología:

1. **¿Existe MCP oficial?** → Buscar en `npm`, GitHub del proyecto, o docs oficiales
2. **¿Qué versión soporta?** → Verificar que sea la versión actual (Svelte 5, no 4)
3. **¿Qué tools provee?** → Entender qué puede hacer el MCP
4. **¿Local o remoto?** → Preferir local para velocidad y confiabilidad
5. **¿Requiere configuración adicional?** → AGENTS.md, variables de entorno, etc.

---

## 📌 CONCLUSIÓN

**Svelte es el caso IDEAL de MCP**:
- ✅ MCP oficial mantenido por el equipo core
- ✅ Documentación 100% actualizada a Svelte 5
- ✅ Tools especializados (autofixer, playground)
- ✅ Configuración mínima (6 líneas)
- ✅ Funciona con VS Code, Cursor, Claude, Codex, Gemini, Zed

**Próximo paso**: Implementar la configuración y probar.

---

*Documento generado para propósitos educativos*
*Auditoría realizada: 2 Diciembre 2025*
