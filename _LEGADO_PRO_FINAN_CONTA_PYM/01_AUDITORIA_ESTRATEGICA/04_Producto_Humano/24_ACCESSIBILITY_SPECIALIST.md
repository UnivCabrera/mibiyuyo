# ♿ Perfil 24: Accesibilidad Gama Baja (No Specialist Needed)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Accessibility Specialist certificado por $40k-55k MXN/mes para auditar WCAG 2.1 AA/AAA con herramientas enterprise."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** La accesibilidad más crítica para México NO es WCAG para ciegos (0.5% de usuarios), es **optimización para celulares viejos** (80% de usuarios). Gama baja = pantallas LCD malas, procesadores lentos, conexión 3G.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Auditorías WCAG (Deque axe DevTools Pro) | axe-core gratis + Playwright | $0 |
| Tests manuales de lector de pantalla | Tests automatizados axe | $0 |
| Alto contraste | Open Props + CSS variables | $0 |
| Áreas táctiles grandes | CSS min-height: 48px | $0 |
| Navegación por teclado | HTML semántico + :focus-visible | $0 |

**Cuándo contratar:** Solo si el gobierno mexicano exige certificación WCAG formal (ej. licitaciones públicas). **NO antes de tener contratos gubernamentales**.

---

## 📋 Rol y Responsabilidad (Adaptado)

El **Founder-A11y** asegura que la app funcione en **celulares Android $3,000 MXN** (pantallas LCD malas, 1GB RAM, 3G). Prioriza: **alto contraste, botones grandes, carga rápida**. Usa tests automatizados (axe-core) en CI/CD para prevenir regresiones.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Componentes Base | ✅ shadcn-svelte | Accesibles por defecto (Bits UI = Radix UI Svelte) |
| Open Props | ✅ Variables CSS | Alto contraste incluido |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| A11Y-001 | **Tests Automatizados axe-core (Playwright)** | 🔴 Bloqueante | axe-core (gratis) | $0 | Sem 1 |
| A11Y-002 | **Alto Contraste (Gama Baja)** | 🔴 Bloqueante | CSS + Open Props | $0 | Sem 1 |
| A11Y-003 | **Áreas Táctiles Grandes (min 48px)** | 🔴 Bloqueante | CSS variables | $0 | Sem 1 |
| A11Y-004 | **Navegación por Teclado (:focus-visible)** | 🟠 Alto | CSS global | $0 | Sem 2 |
| A11Y-005 | **Preferencias Movimiento Reducido** | 🟡 Medio | CSS @media | $0 | Sem 2 |
| A11Y-006 | ~~Deque axe DevTools Pro~~ | ❌ Descartado | Muy caro ⛔ | $4,000/año ⛔ | Nunca |
| A11Y-007 | ~~Contratar A11y Specialist~~ | ❌ Descartado | Innecesario con tests | $480k-660k/año ⛔ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Tests Automatizados axe-core (Playwright, $0)

Integrar chequeos WCAG en **cada pull request**.

**PASO 1: Instalar axe-core para Playwright**

```bash
bun add -D @axe-core/playwright
```

**PASO 2: Crear tests a11y**

```typescript
// tests/e2e/a11y.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accesibilidad WCAG 2.1 AA', () => {

  test('Dashboard no debe tener violaciones críticas', async ({ page }) => {
    await page.goto('/dashboard');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Fallar si hay violaciones críticas o serias
    const critical = results.violations.filter(v => v.impact === 'critical');
    const serious = results.violations.filter(v => v.impact === 'serious');

    expect(critical, `Encontradas ${critical.length} violaciones críticas`).toHaveLength(0);
    expect(serious, `Encontradas ${serious.length} violaciones serias`).toHaveLength(0);
  });

  test('Formulario de facturas debe ser accesible', async ({ page }) => {
    await page.goto('/facturas/nueva');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    expect(results.violations).toHaveLength(0);
  });

  test('Navegación debe ser accesible por teclado', async ({ page }) => {
    await page.goto('/dashboard');

    // Probar navegación Tab
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focused);
  });
});
```

**PASO 3: Integrar en GitHub Actions**

```yaml
# .github/workflows/a11y.yml
name: Accessibility Tests

on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: bun run test:e2e -- tests/e2e/a11y.spec.ts
```

---

### 2. CSS para Alto Contraste (Gama Baja, $0)

Optimizar para pantallas LCD baratas de celulares Android.

```css
/* src/app.css */
:root {
  /* Alto contraste para pantallas LCD malas */
  --text-primary: var(--gray-9); /* Negro casi puro (#0f172a) */
  --text-secondary: var(--gray-7); /* Gris oscuro legible */
  --bg-primary: var(--gray-0); /* Blanco puro */
  --bg-secondary: var(--gray-1); /* Gris muy claro */

  /* Ratios de contraste WCAG AA (4.5:1 mínimo) */
  /* Negro sobre blanco: 21:1 ✅ */
  /* Gris-7 sobre blanco: 5.8:1 ✅ */

  /* NO usar grises suaves (fallan en LCD barato) */
  /* ❌ --text-muted: var(--gray-4); (contraste 2.3:1, muy bajo) */
}

/* Modo oscuro (activación manual) */
[data-theme="dark"] {
  --text-primary: var(--gray-1); /* Blanco casi puro */
  --text-secondary: var(--gray-3);
  --bg-primary: var(--gray-9); /* Negro casi puro */
  --bg-secondary: var(--gray-8);
}

/* Botones con áreas táctiles grandes (WCAG Touch Target) */
button, a.button, input[type="submit"] {
  min-height: var(--size-8); /* 48px - recomendación WCAG */
  min-width: var(--size-8);
  padding: var(--spacing-md) var(--spacing-lg);

  /* Espaciado entre botones (evitar taps accidentales) */
  margin: var(--spacing-xs);
}

/* Inputs con altura suficiente */
input, select, textarea {
  min-height: var(--size-7); /* 44px */
  font-size: 16px; /* Evitar zoom en iOS */
  padding: var(--spacing-sm);
}

/* Foco visible (navegación por teclado) */
:focus-visible {
  outline: 3px solid var(--blue-6); /* Azul visible */
  outline-offset: 2px;
  border-radius: var(--radius-1);
}

/* Remover outline en mouse/touch (solo visible con teclado) */
:focus:not(:focus-visible) {
  outline: none;
}

/* Preferencias de movimiento reducido (vértigo, epilepsia) */
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Skip link (navegación rápida) */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--blue-6);
  color: white;
  padding: var(--spacing-sm);
  z-index: 9999;
}

.skip-to-content:focus {
  top: 0;
}
```

---

### 3. HTML Semántico (Lectores de Pantalla, $0)

**❌ MAL (divs genéricos):**
```svelte
<div class="header">
  <div class="logo">PRO_FINAN</div>
  <div class="menu">
    <div onclick={goto('/dashboard')}>Dashboard</div>
  </div>
</div>
```

**✅ BIEN (semántico):**
```svelte
<header>
  <h1 class="logo">PRO_FINAN</h1>
  <nav aria-label="Navegación principal">
    <a href="/dashboard">Dashboard</a>
    <a href="/facturas">Facturas</a>
    <a href="/reportes">Reportes</a>
  </nav>
</header>

<main id="main-content">
  <h2>Dashboard Financiero</h2>
  <!-- Contenido -->
</main>

<footer>
  <p>&copy; 2026 PRO_FINAN</p>
</footer>
```

---

### 4. ARIA Labels para Componentes Dinámicos

```svelte
<!-- Botón de menú hamburguesa -->
<button
  aria-label="Abrir menú"
  aria-expanded={isMenuOpen}
  onclick={toggleMenu}
>
  <Menu />
</button>

<!-- Tabla financiera -->
<table aria-label="Gastos del mes">
  <thead>
    <tr>
      <th scope="col">Fecha</th>
      <th scope="col">Concepto</th>
      <th scope="col">Monto</th>
    </tr>
  </thead>
  <tbody>
    {#each gastos as gasto}
      <tr>
        <td>{gasto.fecha}</td>
        <td>{gasto.concepto}</td>
        <td>{formatCurrency(gasto.monto)}</td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- Loading spinner accesible -->
{#if isLoading}
  <div role="status" aria-live="polite">
    <Spinner />
    <span class="sr-only">Cargando datos financieros...</span>
  </div>
{/if}

<style>
  /* Screen reader only (oculto visualmente, legible por lectores) */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

---

## 💡 Mentalidad Bootstrap: Accesibilidad Automatizada

### Qué hace el Founder (automatizado):

1. **Tests axe-core en CI/CD** (GitHub Actions, cada PR).
2. **Usar componentes shadcn-svelte** (ya tienen ARIA correcto).
3. **Alto contraste por defecto** (Open Props).
4. **Áreas táctiles grandes** (min 48px).
5. **HTML semántico** (header, nav, main, footer).

### Cuándo contratar A11y Specialist:

- **NUNCA antes de contratos gubernamentales** que exijan certificación WCAG formal.
- Solo si necesitas auditoría externa para RFPs.
- **Costo estimado:** $40k-55k MXN/mes (cuando tengas presupuesto).

### Herramientas Prohibidas:

- ❌ **Deque axe DevTools Pro:** $4,000 USD/año (axe-core gratis hace lo mismo).
- ❌ **Siteimprove:** $10k+ USD/año (overkill para startup).
- ❌ **Level Access:** Enterprise pricing (muy caro).

---

## 🇲🇽 Adaptación México Profundo

### 1. Prioridades de Accesibilidad (México Real)

| Prioridad | Problema | Usuarios Afectados | Solución |
|:----------|:---------|:-------------------|:----------|
| 🔴 **CRÍTICA** | Celulares viejos (LCD malo, 3G) | 80% | Alto contraste, botones grandes |
| 🟠 **ALTA** | Conexión lenta | 60% | Bundle <200KB, cache agresivo |
| 🟡 **MEDIA** | Teclado (desktop) | 30% | :focus-visible, skip links |
| 🟢 **BAJA** | Lectores de pantalla (ciegos) | 0.5% | HTML semántico, ARIA |

**Nota:** NO ignoramos a usuarios ciegos, pero **80% del impacto viene de optimizar gama baja**.

### 2. Tests en Celulares Reales (No Emuladores)

**Celulares objetivo (México 2026):**

- Samsung Galaxy A03 ($3,500 MXN) - Android 12, 3GB RAM, LCD 720p
- Moto E13 ($2,800 MXN) - Android 13 Go, 2GB RAM, LCD 720p
- Xiaomi Redmi A1 ($2,000 MXN) - Android 12 Go, 2GB RAM, LCD 720p

**Cómo probar sin presupuesto:**
```
1. Pedir prestado celular viejo a familia/amigos
2. Usar BrowserStack (60 min gratis/mes)
3. Chrome DevTools: Network throttling "Slow 3G"
4. Lighthouse: Ejecutar en modo "Slow 4G + 4x CPU slowdown"
```

### 3. Textos Legibles (No Anglicanismos Técnicos)

**❌ MAL (corporativo):**
> "Screen reader compatibility ensured via ARIA labels."

**✅ BIEN (claro):**
> "La app funciona con lectores de pantalla para personas ciegas."

---

## 🔗 Referencias

- **WCAG 2.1 AA:** https://www.w3.org/WAI/WCAG21/quickref/
- **axe-core Docs:** https://github.com/dequelabs/axe-core
- **WebAIM Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Inclusive Components:** https://inclusive-components.design/
- **A11y Project Checklist:** https://www.a11yproject.com/checklist/

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Tests Automatizados, Gama Baja Primero)*
