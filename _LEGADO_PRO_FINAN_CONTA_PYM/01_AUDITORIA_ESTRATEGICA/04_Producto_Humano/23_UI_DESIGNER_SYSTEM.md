# 🎨 Perfil 23: Diseño en Código (No Designer Needed)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un UI Designer Senior por $40k-60k MXN/mes + Figma Pro ($12/mes/editor) para crear un Design System desde cero."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar diseñador.** **NO vamos a usar Figma.** Vamos a **diseñar directamente en código** usando **shadcn-svelte** (componentes pre-diseñados) + **Open Props** (variables CSS) + **Histoire** (Storybook para Svelte, gratis).

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Diseño de UI (Figma) | shadcn-svelte + Open Props + Código | $0 |
| Prototipado | Histoire (Storybook para Svelte) | $0 |
| Iconos | Lucide Icons (16k+ iconos SVG gratis) | $0 |
| Tipografía | Inter (Google Fonts, gratis) | $0 |
| Design Tokens | Open Props (330+ CSS variables) | $0 |

**Cuándo contratar:** Solo cuando el producto sea tan exitoso que necesites branding custom (logo profesional, ilustraciones). **NO antes de $1M MRR/año**.

---

## 📋 Rol y Responsabilidad (Adaptado)

El **Founder-Designer** mantiene consistencia visual usando **componentes pre-hechos** (shadcn-svelte) y **variables CSS** (Open Props). NO crea diseños en Figma; **escribe componentes Svelte directamente**. Usa Histoire para documentar componentes.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Sistema de Diseño | ✅ Tangram | `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md` |
| Componentes Base | ✅ shadcn-svelte | `AGENTS.md` (80+ componentes listos) |
| Variables CSS | ✅ Open Props | 330+ variables (colores, spacing, shadows) |
| Iconos | ✅ Lucide Icons | 16,000+ iconos SVG |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| UI-001 | **Histoire Configurado (Storybook Svelte)** | 🟠 Alto | Histoire (gratis) | $0 | Sem 2 |
| UI-002 | **Componentes shadcn-svelte Instalados** | 🔴 Bloqueante | CLI shadcn-svelte | $0 | Sem 1 |
| UI-003 | **App.css con Open Props** | 🟠 Alto | CSS puro | $0 | Sem 1 |
| UI-004 | ~~Figma Pro~~ | ❌ Descartado | Muy caro ⛔ | $144/año ⛔ | Nunca |
| UI-005 | ~~Contratar UI Designer~~ | ❌ Descartado | Innecesario con shadcn | $480k-720k/año ⛔ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Instalación de shadcn-svelte ($0)

**PASO 1: Inicializar shadcn-svelte**

```bash
# Desde el directorio raíz del proyecto
npx shadcn-svelte@latest init
```

**Config recomendada:**
```
✔ Which style would you like to use? › Default
✔ Which color would you like to use as base color? › Slate
✔ Where is your global CSS file? › src/app.css
✔ Where is your tailwind.config.js located? › tailwind.config.js (⚠️ Decimos "sí" pero NO usaremos Tailwind)
✔ Configure the import alias for components: › $lib/components
✔ Configure the import alias for utils: › $lib/utils
✔ Write configuration to components.json? › yes
```

**PASO 2: Instalar componentes necesarios**

```bash
# Componentes básicos (empezar con estos)
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add input
npx shadcn-svelte@latest add label
npx shadcn-svelte@latest add select
npx shadcn-svelte@latest add table
npx shadcn-svelte@latest add dialog
npx shadcn-svelte@latest add alert
npx shadcn-svelte@latest add badge
npx shadcn-svelte@latest add progress

# Componentes para dashboards financieros
npx shadcn-svelte@latest add chart # Si está disponible
npx shadcn-svelte@latest add tabs
npx shadcn-svelte@latest add tooltip
npx shadcn-svelte@latest add dropdown-menu
```

---

### 2. Configuración de Open Props ($0)

**PASO 1: Instalar Open Props**

```bash
bun add open-props
```

**PASO 2: Importar en `src/app.css`**

```css
/* src/app.css */
@import "open-props/style";
@import "open-props/normalize";
@import "open-props/buttons";

/* Custom overrides para México Profundo */
:root {
  /* Colores Tangram (basados en Open Props) */
  --color-primary: var(--blue-6);
  --color-success: var(--green-6);
  --color-warning: var(--orange-6);
  --color-danger: var(--red-6);

  /* Espaciado (usar sizes de Open Props) */
  --spacing-xs: var(--size-2); /* 8px */
  --spacing-sm: var(--size-3); /* 12px */
  --spacing-md: var(--size-4); /* 16px */
  --spacing-lg: var(--size-6); /* 24px */
  --spacing-xl: var(--size-8); /* 32px */

  /* Tipografía (gama baja optimizada) */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Inter', system-ui, sans-serif;

  /* NO cargar más de 2 fonts (bundle optimization) */
  font-family: var(--font-body);
  font-size: 16px; /* Base accesible */
}

/* Modo oscuro (usando Open Props) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--gray-9);
    --color-text: var(--gray-1);
  }
}

/* Optimización gama baja: reducir animaciones */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 3. Configuración de Histoire (Storybook Svelte, $0)

**PASO 1: Instalar Histoire**

```bash
bun add -D histoire @histoire/plugin-svelte
```

**PASO 2: Crear `histoire.config.ts`**

```typescript
// histoire.config.ts
import { defineConfig } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';

export default defineConfig({
  plugins: [HstSvelte()],
  setupFile: '/src/histoire.setup.ts',
  theme: {
    title: 'PRO_FINAN Design System (Tangram)',
    colors: {
      primary: { 50: '#eef2ff', 500: '#6366f1', 900: '#312e81' },
    },
  },
  vite: {
    server: {
      port: 6006, // Puerto custom (no conflicto con Vite)
    },
  },
});
```

**PASO 3: Crear `src/histoire.setup.ts`**

```typescript
// src/histoire.setup.ts
import './app.css'; // Importar estilos globales
```

**PASO 4: Crear historia de ejemplo**

```svelte
<!-- src/lib/components/ui/button/Button.story.svelte -->
<script lang="ts">
  import { Hst } from '@histoire/plugin-svelte';
  import Button from './button.svelte';
</script>

<Hst.Story title="Components/Button" layout={{ type: 'grid', width: 200 }}>
  <Hst.Variant title="Default">
    <Button>Click me</Button>
  </Hst.Variant>

  <Hst.Variant title="Primary">
    <Button variant="default">Primary</Button>
  </Hst.Variant>

  <Hst.Variant title="Destructive">
    <Button variant="destructive">Delete</Button>
  </Hst.Variant>

  <Hst.Variant title="Outline">
    <Button variant="outline">Outline</Button>
  </Hst.Variant>

  <Hst.Variant title="Disabled">
    <Button disabled>Disabled</Button>
  </Hst.Variant>
</Hst.Story>
```

**PASO 5: Agregar script a `package.json`**

```json
{
  "scripts": {
    "story:dev": "histoire dev",
    "story:build": "histoire build",
    "story:preview": "histoire preview"
  }
}
```

**Ejecutar:**
```bash
bun run story:dev
# Abre http://localhost:6006
```

---

### 4. Ejemplo de Componente con Open Props + Svelte 5

```svelte
<!-- src/lib/components/ui/card/card-financiero.svelte -->
<script lang="ts">
  import { Card } from '$lib/components/ui/card';

  let { titulo, monto, variacion, tipo = 'neutro' } = $props<{
    titulo: string;
    monto: string;
    variacion?: string;
    tipo?: 'positivo' | 'negativo' | 'neutro';
  }>();

  let colorVariacion = $derived(
    tipo === 'positivo' ? 'var(--green-6)' :
    tipo === 'negativo' ? 'var(--red-6)' :
    'var(--gray-6)'
  );
</script>

<Card.Root class="p-card">
  <Card.Header>
    <Card.Title class="text-subtitle">{titulo}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p class="text-amount" style="color: {colorVariacion}">
      {monto}
    </p>
    {#if variacion}
      <p class="text-variation" style="color: {colorVariacion}">
        {variacion}
      </p>
    {/if}
  </Card.Content>
</Card.Root>

<style>
  .p-card {
    padding: var(--spacing-md);
    border-radius: var(--radius-2);
    background: var(--surface-1);
    box-shadow: var(--shadow-2);
  }

  .text-subtitle {
    font-size: var(--font-size-1);
    color: var(--text-2);
    font-weight: var(--font-weight-5);
  }

  .text-amount {
    font-size: var(--font-size-6);
    font-weight: var(--font-weight-7);
    margin-top: var(--spacing-xs);
  }

  .text-variation {
    font-size: var(--font-size-0);
    margin-top: var(--spacing-xs);
  }

  /* Responsive gama baja */
  @media (max-width: 480px) {
    .text-amount {
      font-size: var(--font-size-4); /* Más pequeño en celulares viejos */
    }
  }
</style>
```

---

## 💡 Mentalidad Bootstrap: Diseñar en Código

### Qué hace el Founder (NO diseñador gráfico):

1. **Usar shadcn-svelte components** (80+ componentes pre-hechos).
2. **Customizar con Open Props** (330+ variables CSS listas).
3. **Prototipar en Histoire** (sin Figma, directo en navegador).
4. **Iterar en producción** (deploy → feedback → ajustar CSS → repeat).

### Por qué NO usar Figma:

- ❌ **Costo:** $12 USD/editor/mes (~$3k MXN/año).
- ❌ **Overhead:** Diseñar en Figma → Traducir a código = 2x trabajo.
- ❌ **Desync:** Diseño en Figma queda obsoleto vs código real.
- ✅ **Mejor:** Diseñar directamente en componentes Svelte.

### Herramientas Prohibidas:

- ❌ **Figma Pro:** $12 USD/editor/mes.
- ❌ **Sketch:** $10 USD/mes.
- ❌ **Adobe XD:** $10 USD/mes.
- ❌ **Framer:** $15 USD/mes.
- ❌ **Storybook:** Histoire es más ligero para Svelte.

---

## 🇲🇽 Adaptación México Profundo

### 1. Áreas Táctiles Grandes (Celulares Viejos)

Los usuarios con celulares Android $3,000 MXN tienen pantallas chicas y dedos grandes.

**❌ MAL:**
```css
.button {
  height: 32px; /* Muy chico, difícil tocar */
  padding: 4px 8px;
}
```

**✅ BIEN:**
```css
.button {
  min-height: var(--size-8); /* 48px - recomendación WCAG */
  min-width: var(--size-8);
  padding: var(--spacing-md) var(--spacing-lg);

  /* Espaciado entre botones */
  margin: var(--spacing-sm);
}
```

### 2. Alto Contraste (Pantallas Baratas)

Celulares de gama baja tienen pantallas LCD malas.

**Usar ratios de contraste WCAG AA (4.5:1 mínimo):**
```css
:root {
  /* Colores con alto contraste */
  --text-on-light: var(--gray-9); /* Negro casi puro */
  --text-on-dark: var(--gray-1); /* Blanco casi puro */

  /* NO usar grises suaves (se ven mal en LCD barato) */
  /* ❌ --text-muted: var(--gray-5); */
}
```

### 3. Iconos con Labels (No confiar solo en iconografía)

**❌ MAL (solo icono):**
```svelte
<button>
  <Plus /> <!-- Usuario no sabe qué hace -->
</button>
```

**✅ BIEN (icono + texto):**
```svelte
<button>
  <Plus />
  <span>Agregar gasto</span>
</button>
```

---

## 🔗 Referencias

- **shadcn-svelte:** https://shadcn-svelte.com/docs/installation
- **Open Props:** https://open-props.style/
- **Histoire:** https://histoire.dev/guide/svelte3/getting-started.html
- **Lucide Icons:** https://lucide.dev/icons/
- **WCAG Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Diseño en Código, Cero Diseñador)*

- **Design Tokens W3C:** Estándar para variables de diseño.

---

*Última actualización: 9 Diciembre 2025*
