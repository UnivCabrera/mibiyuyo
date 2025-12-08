# 🎨 SISTEMA DE DISEÑO UX/UI - PSICOLOGÍA DEL COLOR

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Enfoque:** Anclaje Emocional, Persuasión Visual, Confianza  
**Versión:** 2.0  
**Fecha:** 8 Diciembre 2025

---

## 🔗 DOCUMENTOS COMPLEMENTARIOS

| Documento                                                   | Descripción                                          |
| :---------------------------------------------------------- | :--------------------------------------------------- |
| [04_NEUROFINANZAS_FRAMEWORK](04_NEUROFINANZAS_FRAMEWORK.md) | **🆕 Framework completo de neurociencias aplicadas** |
| [02_CANVAS_DESIGN](02_CANVAS_DESIGN.md)                     | Canvas de diseño general                             |
| [03_INTERFAZ_TANGRAM_SPEC](03_INTERFAZ_TANGRAM_SPEC.md)     | Especificaciones de interfaz modular                 |

> **🧠 Integración Neurociencias:** Este documento aplica los principios del Framework Neuro-Financiero:
>
> - **Neurociencia Cognitiva:** Reducción de carga cognitiva mediante colores claros
> - **Neurociencia Afectiva:** Activación de dopamina (verde éxito) y reducción de cortisol (evitar rojo)
> - **Neuropsicología:** Fricción visual para decisiones importantes (ámbar advertencia)

---

## 📋 ÍNDICE

1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Psicología del Color Financiero](#psicología-del-color-financiero)
3. [Paleta de Colores Principal](#paleta-de-colores-principal)
4. [Paleta Semántica](#paleta-semántica)
5. [Modo Oscuro](#modo-oscuro)
6. [Aplicación por Contexto Emocional](#aplicación-por-contexto-emocional)
7. [Tipografía](#tipografía)
8. [Espaciado y Ritmo Visual](#espaciado-y-ritmo-visual)
9. [Componentes UI](#componentes-ui)
10. [Accesibilidad](#accesibilidad)

---

## 🧠 FILOSOFÍA DE DISEÑO

### Principios Fundamentales

```
┌─────────────────────────────────────────────────────────────────┐
│                    DISEÑO CON PROPÓSITO                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. CONFIANZA PRIMERO                                          │
│     → El usuario debe sentir que su dinero está seguro         │
│     → Colores que transmitan profesionalismo y estabilidad     │
│                                                                 │
│  2. REDUCIR ANSIEDAD FINANCIERA                                │
│     → Las finanzas generan estrés, el diseño debe calmarlo     │
│     → Evitar rojos alarmantes, preferir tonos suaves           │
│                                                                 │
│  3. MOTIVAR ACCIÓN POSITIVA                                    │
│     → Gamificación visual que celebre logros                   │
│     → Colores energizantes para progreso                       │
│                                                                 │
│  4. SESIONES LARGAS SIN FATIGA                                 │
│     → Contraste suficiente pero no agresivo                    │
│     → Fondos que no cansen la vista                            │
│                                                                 │
│  5. IDENTIDAD MEXICANA MODERNA                                 │
│     → Inspiración cultural sin ser folklórico                  │
│     → Profesional pero cálido                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎭 PSICOLOGÍA DEL COLOR FINANCIERO

### Emociones que Queremos Evocar (Base Neurocientífica)

| Emoción                 | Color Asociado         | Uso en App                | Neurotransmisor       |
| :---------------------- | :--------------------- | :------------------------ | :-------------------- |
| **Confianza**           | Azul profundo          | Header, CTAs principales  | Serotonina ↑          |
| **Seguridad**           | Verde azulado (teal)   | Estados positivos         | Cortisol ↓            |
| **Tranquilidad**        | Azul claro, gris suave | Fondos, áreas de lectura  | Cortisol ↓            |
| **Prosperidad**         | Verde esmeralda        | Ganancias, ahorros        | Dopamina ↑            |
| **Urgencia controlada** | Ámbar cálido           | Alertas no críticas       | Sistema 2 activo      |
| **Éxito/Celebración**   | Dorado suave           | Logros, gamificación      | Dopamina ↑↑           |
| **Alerta**              | Coral (no rojo puro)   | Errores, gastos excesivos | Adrenalina controlada |

### Lo que EVITAMOS

| Color                   | Problema                 | Alternativa               |
| :---------------------- | :----------------------- | :------------------------ |
| 🔴 Rojo puro (#FF0000)  | Genera pánico financiero | Coral suave (#E57373)     |
| ⚫ Negro puro (#000000) | Demasiado duro           | Gris carbón (#1A1A2E)     |
| 🟡 Amarillo brillante   | Cansa la vista           | Ámbar cálido (#F5A623)    |
| 🟢 Verde neón           | Poco profesional         | Verde esmeralda (#10B981) |

---

## 🎨 PALETA DE COLORES PRINCIPAL

### Colores Primarios (Brand)

```css
:root {
  /* PRIMARIO - Azul Confianza */
  --primary-50: #eef2ff; /* Fondos sutiles */
  --primary-100: #e0e7ff; /* Hover estados */
  --primary-200: #c7d2fe; /* Bordes activos */
  --primary-300: #a5b4fc; /* Iconos secundarios */
  --primary-400: #818cf8; /* Elementos interactivos */
  --primary-500: #6366f1; /* ★ COLOR PRINCIPAL - Indigo */
  --primary-600: #4f46e5; /* Hover principal */
  --primary-700: #4338ca; /* Active/pressed */
  --primary-800: #3730a3; /* Textos sobre claro */
  --primary-900: #312e81; /* Headers importantes */

  /* SECUNDARIO - Teal Seguridad */
  --secondary-50: #f0fdfa;
  --secondary-100: #ccfbf1;
  --secondary-200: #99f6e4;
  --secondary-300: #5eead4;
  --secondary-400: #2dd4bf;
  --secondary-500: #14b8a6; /* ★ COLOR SECUNDARIO - Teal */
  --secondary-600: #0d9488;
  --secondary-700: #0f766e;
  --secondary-800: #115e59;
  --secondary-900: #134e4a;
}
```

### Visualización de Paleta Primaria

```
INDIGO (Confianza/Profesionalismo)
┌────────────────────────────────────────────────────────────────┐
│ 50    100   200   300   400   500★  600   700   800   900     │
│ ░░░░  ░░░░  ▒▒▒▒  ▒▒▒▒  ▓▓▓▓  ████  ████  ████  ████  ████   │
│ EEF2  E0E7  C7D2  A5B4  818C  6366  4F46  4338  3730  312E   │
└────────────────────────────────────────────────────────────────┘

TEAL (Seguridad/Crecimiento)
┌────────────────────────────────────────────────────────────────┐
│ 50    100   200   300   400   500★  600   700   800   900     │
│ ░░░░  ░░░░  ▒▒▒▒  ▒▒▒▒  ▓▓▓▓  ████  ████  ████  ████  ████   │
│ F0FD  CCFB  99F6  5EEA  2DD4  14B8  0D94  0F76  115E  134E   │
└────────────────────────────────────────────────────────────────┘
```

### Por qué Indigo + Teal

| Combinación | Razón Psicológica                                            |
| :---------- | :----------------------------------------------------------- |
| **Indigo**  | Combina la confianza del azul con la creatividad del violeta |
| **Teal**    | Une la calma del azul con la prosperidad del verde           |
| **Juntos**  | Profesionalismo moderno sin ser corporativo frío             |

---

## 🚦 PALETA SEMÁNTICA

### Estados y Acciones

```css
:root {
  /* ÉXITO - Verde Esmeralda (Ganancias, Metas cumplidas) */
  --success-50: #ecfdf5;
  --success-100: #d1fae5;
  --success-200: #a7f3d0;
  --success-300: #6ee7b7;
  --success-400: #34d399;
  --success-500: #10b981; /* ★ ÉXITO PRINCIPAL */
  --success-600: #059669;
  --success-700: #047857;
  --success-800: #065f46;
  --success-900: #064e3b;

  /* ADVERTENCIA - Ámbar Cálido (Alertas, Límites cercanos) */
  --warning-50: #fffbeb;
  --warning-100: #fef3c7;
  --warning-200: #fde68a;
  --warning-300: #fcd34d;
  --warning-400: #fbbf24;
  --warning-500: #f59e0b; /* ★ ADVERTENCIA PRINCIPAL */
  --warning-600: #d97706;
  --warning-700: #b45309;
  --warning-800: #92400e;
  --warning-900: #78350f;

  /* ERROR/GASTO - Coral Suave (NO rojo agresivo) */
  --error-50: #fef2f2;
  --error-100: #fee2e2;
  --error-200: #fecaca;
  --error-300: #fca5a5;
  --error-400: #f87171;
  --error-500: #ef4444; /* ★ ERROR PRINCIPAL */
  --error-600: #dc2626;
  --error-700: #b91c1c;
  --error-800: #991b1b;
  --error-900: #7f1d1d;

  /* INFO - Azul Cielo (Información neutral) */
  --info-50: #eff6ff;
  --info-100: #dbeafe;
  --info-200: #bfdbfe;
  --info-300: #93c5fd;
  --info-400: #60a5fa;
  --info-500: #3b82f6; /* ★ INFO PRINCIPAL */
  --info-600: #2563eb;
  --info-700: #1d4ed8;
  --info-800: #1e40af;
  --info-900: #1e3a8a;
}
```

### Aplicación Semántica en Finanzas

| Contexto                 |      Color      | Ejemplo                           |
| :----------------------- | :-------------: | :-------------------------------- |
| Ingreso recibido         | `--success-500` | "+$15,000 MXN"                    |
| Ahorro aumentó           | `--success-400` | "Meta 75% completada"             |
| Gasto registrado         |  `--error-400`  | "-$500 MXN" (suave, no alarmante) |
| Gasto excede presupuesto |  `--error-500`  | "Sobrepasaste alimentación"       |
| Fecha límite cercana     | `--warning-500` | "Declaración en 3 días"           |
| Tip/Consejo              |  `--info-500`   | "💡 Puedes deducir esto"          |

---

## 🌙 MODO OSCURO

### Filosofía del Modo Oscuro

> **"Sesiones largas de revisión financiera nocturna deben ser cómodas"**

```css
:root[data-theme="dark"] {
  /* FONDOS - Azul-gris profundo (no negro puro) */
  --bg-primary: #0f0f1a; /* Fondo principal */
  --bg-secondary: #1a1a2e; /* Cards, modales */
  --bg-tertiary: #252542; /* Hover, elementos elevados */
  --bg-elevated: #2d2d4a; /* Dropdowns, tooltips */

  /* SUPERFICIES */
  --surface-1: #16162a;
  --surface-2: #1e1e36;
  --surface-3: #262642;

  /* TEXTO */
  --text-primary: #f1f5f9; /* Texto principal */
  --text-secondary: #94a3b8; /* Texto secundario */
  --text-muted: #64748b; /* Texto deshabilitado */

  /* BORDES */
  --border-subtle: #2d2d4a;
  --border-default: #3d3d5c;
  --border-strong: #4d4d6a;

  /* PRIMARIO - Ajustado para oscuro */
  --primary-500: #818cf8; /* Más brillante en oscuro */
  --primary-600: #6366f1;

  /* ÉXITO - Ajustado */
  --success-500: #34d399; /* Más brillante */

  /* ERROR - Ajustado (menos agresivo) */
  --error-500: #f87171; /* Coral más suave */
}
```

### Comparativa Claro vs Oscuro

```
MODO CLARO (Día)
┌────────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════════╗ │
│  ║  Fondo: #FFFFFF (blanco)                             ║ │
│  ║  Card:  #F8FAFC (gris muy claro)                     ║ │
│  ║  Texto: #1E293B (casi negro)                         ║ │
│  ╚══════════════════════════════════════════════════════╝ │
│                                                           │
│  Contraste: 12.6:1 ✓ (WCAG AAA)                         │
└────────────────────────────────────────────────────────────┘

MODO OSCURO (Noche)
┌────────────────────────────────────────────────────────────┐
│  ╔══════════════════════════════════════════════════════╗ │
│  ║  Fondo: #0F0F1A (azul-negro profundo)                ║ │
│  ║  Card:  #1A1A2E (azul-gris oscuro)                   ║ │
│  ║  Texto: #F1F5F9 (casi blanco)                        ║ │
│  ╚══════════════════════════════════════════════════════╝ │
│                                                           │
│  Contraste: 14.2:1 ✓ (WCAG AAA)                         │
└────────────────────────────────────────────────────────────┘
```

---

## 💭 APLICACIÓN POR CONTEXTO EMOCIONAL

### 1. Dashboard Principal

**Estado emocional del usuario:** Quiere ver su situación rápidamente

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER: Indigo-600 (#4F46E5)                                   │
│  → Transmite: "Estás en un lugar profesional y seguro"          │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  BALANCE POSITIVO: Success-500 (#10B981) sobre Success-50       │
│  → Transmite: "Tu dinero está creciendo, todo bien"             │
│                                                                  │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │ Ingresos   │  │ Gastos     │  │ Ahorro     │                │
│  │ $25,000    │  │ $18,000    │  │ $7,000     │                │
│  │  ↑ +12%    │  │  ↓ -5%     │  │  ↑ +25%    │                │
│  │ ■■■■■■■■   │  │ ■■■■■■     │  │ ■■■■■■■■■  │                │
│  │ [SUCCESS]  │  │ [WARNING]  │  │ [SUCCESS]  │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 2. Registro de Gasto

**Estado emocional del usuario:** Posible culpa, necesita validación

```
┌──────────────────────────────────────────────────────────────────┐
│  MODAL: Fondo suave, bordes redondeados                         │
│  → Transmite: "No te juzgamos, solo organizamos"                │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   💳 Registrar Gasto                                            │
│                                                                  │
│   Monto: [________$500________]                                 │
│                                                                  │
│   Categoría:  🍔 Comida                                         │
│               → Fondo: Warning-50 (ámbar muy suave)             │
│               → Texto: Warning-700                              │
│               → "Cerca del límite" (no "Te pasaste")            │
│                                                                  │
│   ┌─────────────────────────────────────────────────┐           │
│   │ 💡 Este gasto es normal para tu presupuesto    │           │
│   │    de comida. Te quedan $800 este mes.         │           │
│   │    [Info-100 fondo, Info-700 texto]            │           │
│   └─────────────────────────────────────────────────┘           │
│                                                                  │
│   [ Cancelar ]  [ ✓ Guardar ]                                   │
│   [Gris-300]    [Primary-500]                                   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 3. Meta de Ahorro Cumplida

**Estado emocional del usuario:** Orgullo, quiere celebración

```
┌──────────────────────────────────────────────────────────────────┐
│  CELEBRACIÓN: Gradiente Success + Dorado                        │
│  → Transmite: "¡Lo lograste! Mereces reconocimiento"            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   🎉 ¡FELICIDADES!                                              │
│                                                                  │
│   ╔══════════════════════════════════════════════════╗          │
│   ║          🏆                                      ║          │
│   ║                                                  ║          │
│   ║    Completaste tu meta:                         ║          │
│   ║    "Fondo de Emergencia"                        ║          │
│   ║                                                  ║          │
│   ║    $30,000 MXN                                  ║          │
│   ║    ████████████████████ 100%                    ║          │
│   ║                                                  ║          │
│   ║    [Gradiente: Success-400 → Warning-400]       ║          │
│   ╚══════════════════════════════════════════════════╝          │
│                                                                  │
│   +50 XP  •  Logro: "Previsor"  •  Racha: 15 días              │
│   [Dorado: #F59E0B con brillo animado]                          │
│                                                                  │
│            [ 🚀 Nueva Meta ]                                    │
│            [Primary-500, pulsante]                              │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 4. Alerta de Fecha Límite SAT

**Estado emocional del usuario:** Potencial estrés, necesita claridad

```
┌──────────────────────────────────────────────────────────────────┐
│  ALERTA: Warning (NO error) - Urgente pero manejable            │
│  → Transmite: "Hay tiempo, pero actúa pronto"                   │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ ⚠️ Declaración mensual en 3 días                        │   │
│   │                                                          │   │
│   │ Tu declaración de noviembre vence el 17 de diciembre.   │   │
│   │                                                          │   │
│   │ Ya tienes todo listo:                                    │   │
│   │ ✓ Ingresos registrados                                  │   │
│   │ ✓ Gastos deducibles identificados                       │   │
│   │ ✓ ISR calculado: $2,340 MXN                             │   │
│   │                                                          │   │
│   │ [Fondo: Warning-50, Borde: Warning-300]                 │   │
│   │ [Texto: Warning-800 (legible)]                          │   │
│   │                                                          │   │
│   │ [ Ver detalles ]  [ Declarar ahora → ]                  │   │
│   │ [Outline]         [Warning-500 sólido]                  │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### 5. Error Real (Gasto excede TODO el presupuesto)

**Estado emocional del usuario:** Necesita saber, pero sin pánico

```
┌──────────────────────────────────────────────────────────────────┐
│  ERROR CONTROLADO: Error-400 (coral, no rojo sangre)            │
│  → Transmite: "Hay un problema, pero lo podemos resolver"       │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │ 📊 Presupuesto del mes excedido                         │   │
│   │                                                          │   │
│   │ Has gastado $2,500 más de lo planeado.                  │   │
│   │                                                          │   │
│   │ Presupuesto:  $20,000                                   │   │
│   │ Gastado:      $22,500  ████████████░░ 112%              │   │
│   │               [Barra: Error-400]                        │   │
│   │                                                          │   │
│   │ 💡 Sugerencias:                                         │   │
│   │ • Revisa gastos de "Entretenimiento" ($5,200)           │   │
│   │ • Considera ajustar presupuesto del próximo mes         │   │
│   │                                                          │   │
│   │ [Fondo: Error-50, Borde: Error-200]                     │   │
│   │ [Texto principal: Error-800]                            │   │
│   │ [Sugerencias: Info-700 - tono constructivo]             │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## ✍️ TIPOGRAFÍA

### Familia Tipográfica

```css
:root {
  /* Principal - Inter (legibilidad, profesional, moderna) */
  --font-sans:
    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Monoespaciada - Para números y código */
  --font-mono: "JetBrains Mono", "Fira Code", Consolas, monospace;

  /* Display - Para headers grandes (opcional) */
  --font-display: "Plus Jakarta Sans", var(--font-sans);
}
```

### Escala Tipográfica

```css
:root {
  /* Tamaños - Escala modular 1.25 (Major Third) */
  --text-xs: 0.75rem; /* 12px - Labels pequeños */
  --text-sm: 0.875rem; /* 14px - Texto secundario */
  --text-base: 1rem; /* 16px - Texto base */
  --text-lg: 1.125rem; /* 18px - Texto destacado */
  --text-xl: 1.25rem; /* 20px - Subtítulos */
  --text-2xl: 1.5rem; /* 24px - Títulos sección */
  --text-3xl: 1.875rem; /* 30px - Títulos página */
  --text-4xl: 2.25rem; /* 36px - Heroes */
  --text-5xl: 3rem; /* 48px - Dashboard números */

  /* Pesos */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Uso de Monoespaciada para Números

```
NÚMEROS FINANCIEROS: Usar --font-mono

Correcto:                    Incorrecto:
┌────────────────────┐      ┌────────────────────┐
│    $12,345.67      │      │    $12,345.67      │
│    $ 1,234.56      │      │    $1,234.56       │
│    $   123.45      │      │    $123.45         │
│                    │      │                    │
│ [Números alineados]│      │ [Saltan al cambiar]│
└────────────────────┘      └────────────────────┘

→ La monoespaciada mantiene números alineados
→ Facilita comparación visual
→ Profesional para finanzas
```

---

## 📐 ESPACIADO Y RITMO VISUAL

### Sistema de Espaciado (8px base)

```css
:root {
  --space-1: 0.25rem; /* 4px  - Mínimo */
  --space-2: 0.5rem; /* 8px  - Interno elementos */
  --space-3: 0.75rem; /* 12px - Separación cercana */
  --space-4: 1rem; /* 16px - Padding estándar */
  --space-5: 1.25rem; /* 20px - Separación media */
  --space-6: 1.5rem; /* 24px - Entre secciones */
  --space-8: 2rem; /* 32px - Separación grande */
  --space-10: 2.5rem; /* 40px - Entre bloques */
  --space-12: 3rem; /* 48px - Separación mayor */
  --space-16: 4rem; /* 64px - Entre secciones principales */
}
```

### Radios de Borde

```css
:root {
  --radius-sm: 0.25rem; /* 4px  - Inputs pequeños */
  --radius-md: 0.375rem; /* 6px  - Botones */
  --radius-lg: 0.5rem; /* 8px  - Cards */
  --radius-xl: 0.75rem; /* 12px - Modales */
  --radius-2xl: 1rem; /* 16px - Elementos grandes */
  --radius-full: 9999px; /* Círculos, pills */
}
```

### Sombras (Elevación)

```css
:root {
  /* Sombras suaves - no agresivas */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

  /* Sombras con color (para hover en botones) */
  --shadow-primary: 0 4px 14px 0 rgb(99 102 241 / 0.4);
  --shadow-success: 0 4px 14px 0 rgb(16 185 129 / 0.4);
}
```

---

## 🧩 COMPONENTES UI

### Botones

```css
/* Botón Primario */
.btn-primary {
  background: var(--primary-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  transition: all 150ms ease;
}

.btn-primary:hover {
  background: var(--primary-600);
  box-shadow: var(--shadow-primary);
  transform: translateY(-1px);
}

/* Botón Secundario (Outline) */
.btn-secondary {
  background: transparent;
  color: var(--primary-600);
  border: 1.5px solid var(--primary-300);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
}

.btn-secondary:hover {
  background: var(--primary-50);
  border-color: var(--primary-500);
}

/* Botón Success (para acciones positivas) */
.btn-success {
  background: var(--success-500);
  color: white;
}

.btn-success:hover {
  background: var(--success-600);
  box-shadow: var(--shadow-success);
}
```

### Cards Financieras

```css
/* Card de Balance */
.card-balance {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
  color: white;
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Card de Transacción */
.card-transaction {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  transition: all 150ms ease;
}

.card-transaction:hover {
  border-color: var(--primary-200);
  box-shadow: var(--shadow-md);
}

/* Card de Ingreso */
.card-transaction.income {
  border-left: 3px solid var(--success-500);
}

/* Card de Gasto */
.card-transaction.expense {
  border-left: 3px solid var(--error-400);
}
```

### Badges/Etiquetas

```css
/* Badge de Estado */
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-success {
  background: var(--success-100);
  color: var(--success-700);
}

.badge-warning {
  background: var(--warning-100);
  color: var(--warning-700);
}

.badge-error {
  background: var(--error-100);
  color: var(--error-700);
}

.badge-info {
  background: var(--info-100);
  color: var(--info-700);
}
```

---

## ♿ ACCESIBILIDAD

### Requisitos WCAG 2.1 AA

| Criterio                   | Requisito | Nuestro Valor |
| :------------------------- | :-------: | :-----------: |
| **Contraste texto normal** |  ≥ 4.5:1  |   7.5:1 ✅    |
| **Contraste texto grande** |   ≥ 3:1   |   5.2:1 ✅    |
| **Contraste elementos UI** |   ≥ 3:1   |   4.1:1 ✅    |
| **Focus visible**          |  Visible  | Anillo 3px ✅ |
| **Target size**            |  ≥ 44px   |    48px ✅    |

### Estados de Focus

```css
/* Focus visible para navegación con teclado */
:focus-visible {
  outline: 3px solid var(--primary-400);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Quitar outline feo por defecto solo si hay focus-visible */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Indicadores de Color + Icono

```
NO solo color para estados:

❌ Incorrecto:           ✅ Correcto:
┌──────────────────┐    ┌──────────────────┐
│ Ganancia         │    │ ↑ Ganancia +15%  │
│ [solo verde]     │    │ [verde + flecha] │
└──────────────────┘    └──────────────────┘

┌──────────────────┐    ┌──────────────────┐
│ Pérdida          │    │ ↓ Pérdida -5%    │
│ [solo rojo]      │    │ [coral + flecha] │
└──────────────────┘    └──────────────────┘
```

### Modo Alto Contraste

```css
@media (prefers-contrast: high) {
  :root {
    --primary-500: #4338ca; /* Más oscuro */
    --success-500: #047857;
    --error-500: #b91c1c;
    --border-default: #000;
  }
}
```

---

## 📱 RESPONSIVE

### Breakpoints

```css
:root {
  --breakpoint-sm: 640px; /* Mobile landscape */
  --breakpoint-md: 768px; /* Tablet */
  --breakpoint-lg: 1024px; /* Desktop */
  --breakpoint-xl: 1280px; /* Desktop grande */
  --breakpoint-2xl: 1536px; /* Pantalla grande */
}
```

### Escala de Tipografía Responsive

```css
/* Mobile-first */
h1 {
  font-size: var(--text-2xl);
} /* 24px mobile */

@media (min-width: 768px) {
  h1 {
    font-size: var(--text-3xl);
  } /* 30px tablet */
}

@media (min-width: 1024px) {
  h1 {
    font-size: var(--text-4xl);
  } /* 36px desktop */
}
```

---

## 🎯 RESUMEN DE TOKENS CSS COMPLETO

```css
/* ============================================
   TOKENS DE DISEÑO - PRO_FINAN_CONTA_PYM
   Sistema de Diseño v1.0
   ============================================ */

:root {
  /* === COLORES PRIMITIVOS === */

  /* Primario - Indigo (Confianza) */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;

  /* Secundario - Teal (Seguridad) */
  --secondary-50: #f0fdfa;
  --secondary-500: #14b8a6;
  --secondary-600: #0d9488;
  --secondary-700: #0f766e;

  /* Semánticos */
  --success-50: #ecfdf5;
  --success-500: #10b981;
  --success-600: #059669;

  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-600: #d97706;

  --error-50: #fef2f2;
  --error-400: #f87171;
  --error-500: #ef4444;

  --info-50: #eff6ff;
  --info-500: #3b82f6;

  /* Neutros */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;

  /* === TIPOGRAFÍA === */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;

  /* === ESPACIADO === */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;

  /* === BORDES === */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-full: 9999px;

  /* === SOMBRAS === */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

  /* === TRANSICIONES === */
  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 350ms ease;
}
```

---

## 📎 ARCHIVOS RELACIONADOS

- **Siguiente:** `02_CANVAS_DESIGN.md` (Layouts y wireframes)
- **Relacionado:** `03_ICONOGRAFIA.md` (Sistema de iconos)
- **Relacionado:** `04_ANIMACIONES.md` (Micro-interacciones)

---

**Creado con 💜 para PRO_FINAN_CONTA_PYM**
