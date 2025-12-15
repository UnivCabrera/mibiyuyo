# 🧠 GUÍA UX — NEUROFINANZAS APLICADAS

> **Versión:** 2.0
> **Fecha:** 15 Diciembre 2025
> **Base:** Framework de Neurofinanzas del legado
> **Objetivo:** Integrar neurociencia en cada elemento del producto

---

## 🎯 PRINCIPIO FUNDAMENTAL

> Las decisiones financieras **NO son racionales**. Están dominadas por emociones.
> Diseñamos para el **Sistema 1** (rápido, intuitivo) pero guiamos hacia
> comportamientos del **Sistema 2** (lento, deliberado).

---

## 🧬 LOS 4 PILARES NEUROCIENTÍFICOS

| Pilar | Aplicación en mibiyuyo |
|:---|:---|
| **Neurociencia Cognitiva** | Ley de Miller (7±2 chunks), reducir carga mental |
| **Neurociencia Afectiva** | Activar dopamina, reducir cortisol, balance serotonina |
| **Neurociencia del Desarrollo** | Scaffolding (metas progresivas, pequeños logros) |
| **Neuropsicología** | Fricción positiva para Sistema 2, prevenir impulsos |

---

## 💊 NEUROTRANSMISORES Y DISEÑO

| Neurotransmisor | Función | Aplicación en App |
|:---|:---|:---|
| **Dopamina** | Recompensa, motivación | Micro-celebraciones, rachas, badges |
| **Serotonina** | Bienestar, satisfacción | Progreso visual, logros, reconocimiento |
| **Cortisol** | Estrés, ansiedad | Reducir con colores suaves, mensajes positivos |
| **Oxitocina** | Conexión social | Metas en pareja, comunidad (futuro) |

---

## 📐 PRINCIPIOS DE DISEÑO

### 0. El Número Mágico (Reducción Radical)

El usuario no quiere matemáticas. Quiere una respuesta.
En lugar de mostrar: Ingresos - Gastos Fijos - Ahorro - Gastos Variables = Disponible.
Mostramos: **$450.00** (Tu Número Mágico).

### 1. Ley de Miller (7±2)

El cerebro solo procesa 7±2 elementos a la vez.

| Elemento | Máximo |
|:---|:---:|
| Opciones en menú | 7 |
| Categorías visibles | 7 |
| Acciones por pantalla | 5 |
| Campos en formulario | 5 |
| Widgets en dashboard | 6 |

### 2. Reducir Carga Cognitiva

```
ANTES (Alta Carga):              DESPUÉS (Baja Carga):
┌────────────────────┐           ┌────────────────────┐
│ Ingrese monto      │           │ ¿Cuánto gastaste?  │
│ Seleccione categoría│           │                    │
│ Elija fecha        │    →      │ [$____] [📷 Ticket]│
│ Agregue nota       │           │                    │
│ Elija cuenta       │           │ [Guardar] ← 1 tap  │
│ Confirme           │           │                    │
└────────────────────┘           └────────────────────┘
     6 decisiones                     1-2 decisiones
```

### 3. Defaults Inteligentes

Pre-seleccionar la mejor opción:

- "Ahorra 20% de tu ingreso" → pre-marcado
- Categoría sugerida por hora/monto
- Cuenta por defecto = la más usada

### 4. Progreso Visible

El cerebro ama las barras de progreso:

```
META: Vacaciones Cancún
████████████░░░░░░░░░░░ 65%
$6,500 de $10,000

🎯 "Solo $233/semana más para lograrlo"
```

---

## 🎨 PALETA DE COLORES (Neuro-optimizada)

### Colores Principales

| Color | Hex | Uso | Efecto |
|:---|:---|:---|:---|
| **Verde** | #10B981 | Positivo, éxito, dinero | Seguridad, crecimiento |
| **Azul** | #3B82F6 | Acciones, links | Confianza, calma |
| **Morado** | #8B5CF6 | Premium, PRO | Exclusividad |

### Colores de Alerta (Usar con moderación)

| Color | Hex | Uso | Cuándo |
|:---|:---|:---|:---|
| **Amarillo** | #F59E0B | Atención suave | Info importante |
| **Naranja** | #F97316 | Urgencia | Fecha límite cerca |
| **Rojo** | #EF4444 | Destructivo | SOLO eliminar/cancelar |

### Paleta Anti-Cortisol

```css
/* Colores que reducen ansiedad */
--calma-primario: #10B981;   /* Verde suave */
--calma-secundario: #3B82F6; /* Azul confianza */
--calma-neutro: #F9FAFB;     /* Gris cálido */

/* EVITAR en contextos financieros negativos */
--evitar-rojo: #EF4444;      /* No para saldos bajos */
--evitar-naranja: #F97316;   /* No para presupuesto */
```

---

## 💬 SISTEMA DE MENSAJERÍA

### Principio: Nunca Castigar, Siempre Reencuadrar

| Contexto | ❌ Evitar | ✅ Usar |
|:---|:---|:---|
| Exceder presupuesto | "Excediste tu límite" | "Te pasaste un poco, ajustemos" |
| Saldo bajo | "Saldo bajo: $234" | "Tienes $234 disponibles" |
| Meta no alcanzada | "No cumpliste tu meta" | "Llegaste al 78%. ¡Casi!" |
| Error de sistema | "Error al procesar" | "Dame un segundo..." |
| Gasto grande | "Gasto excesivo" | "Este gasto es mayor a tu promedio" |

### Vocabulario Positivo

| Categoría | Palabras a Usar |
|:---|:---|
| **Crecimiento** | Prosperar, evolucionar, crecer, florecer |
| **Control** | Gestionar, organizar, dirigir, liderar |
| **Claridad** | Entender, visualizar, descubrir, aclarar |
| **Facilidad** | Simplificar, agilizar, optimizar, fluir |
| **Logro** | Alcanzar, conseguir, completar, conquistar |

### Vocabulario a Evitar

| Categoría | Palabras a Evitar | Alternativa |
|:---|:---|:---|
| Miedo | Fracaso, quiebra, pérdida | "Área de oportunidad" |
| Complejidad | Complicado, difícil | "Detallado", "paso a paso" |
| Obligación | Debes, tienes que | "Te sugerimos", "considera" |
| Negatividad | Problema, error, fallo | "Oportunidad", "ajuste" |

---

## 🔄 CICLO DOPAMINA

```
    ┌──────────────────┐
    │   1. TRIGGER     │ ← Notificación: "¿Registraste tus gastos?"
    │                  │
    └────────┬─────────┘
             ▼
    ┌──────────────────┐
    │   2. ACCIÓN      │ ← Usuario registra gasto (1 tap)
    │                  │
    └────────┬─────────┘
             ▼
    ┌──────────────────┐
    │   3. RECOMPENSA  │ ← "+5 FinCoins ✨" + Animación
    │   VARIABLE       │
    └────────┬─────────┘
             ▼
    ┌──────────────────┐
    │  4. ANTICIPACIÓN │ ← "Solo 2 más para tu badge"
    │                  │
    └────────┬─────────┘
             │
             └──────────────► Repite ciclo
```

### Recompensas Variables

| Frecuencia | Recompensa | Ejemplo |
|:---:|:---|:---|
| 100% | +5 FinCoins | Cada registro |
| 30% | Bonus random | +10 a +50 extra |
| 5% | Súper bonus | Badge sorpresa |
| 1% | Jackpot | Mes PRO gratis |

---

## 🛡️ MODO ANTI-IMPULSO

### Triggers

Activar pausa cuando:

- Monto > promedio × 3
- Categorías de riesgo (compras, entretenimiento)
- Hora sospechosa (23:00 - 03:00)
- Fin de quincena + saldo bajo

### Flujo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ⏸️ PAUSA DE REFLEXIÓN                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Este gasto ($2,500) es 4x tu promedio.                               │
│                                                                         │
│   ⏱️ Tómate 15 segundos...                                              │
│                                                                         │
│   "$2,500 = 2.5 quincenas de ahorro para Cancún"                       │
│                                                                         │
│   ¿Te acerca o te aleja de tu meta?                                    │
│                                                                         │
│                         12... 11... 10...                               │
│                                                                         │
│   [⬅️ Lo pienso]              [✅ Sí, lo necesito]                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🎮 GAMIFICACIÓN BÁSICA

### Sistema de Puntos (FinCoins)

| Acción | Puntos |
|:---|:---:|
| Registrar gasto | +5 |
| Mantener racha | +10/día |
| Cumplir presupuesto semanal | +50 |
| Completar meta | +100 |

### Badges

| Badge | Requisito | Neurotransmisor |
|:---|:---|:---|
| 🌅 Primer Amanecer | 7 días activo | Serotonina |
| 🔥 En Racha | 7 días seguidos | Dopamina |
| 💎 Diamante | $10K ahorrados | Serotonina |
| 🧘 Zen Financiero | 0 gastos impulsivos/mes | Serotonina |
| 🦸 Libertador | Primera deuda pagada | Dopamina |

---

## 📱 COMPONENTES UX CLAVE

### Tu Biyuyo Hoy (Hero)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                              $2,850                                     │
│                        PUEDES GASTAR HOY                               │
│                                                                         │
│       😌 "Todo lo importante ya está apartado"                         │
│                                                                         │
│   Renta ✅ $8,000 • Luz ✅ $450 • Ahorro ✅ $1,500                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Principios:**

- Número grande, central, verde
- Mensaje positivo debajo
- Desglose de lo apartado (transparencia)
- Sin elementos que distraigan

### Registro de Gasto

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ¿Cuánto gastaste?                                                    │
│                                                                         │
│   ┌──────────────────────────────────────┐                             │
│   │        $                             │                             │
│   └──────────────────────────────────────┘                             │
│                                                                         │
│   [🍔] [🚗] [🏠] [🛒] [🎬] [💊] [···]                                   │
│                                                                         │
│                    [GUARDAR]                                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Principios:**

- Campo de monto primero (lo más importante)
- Categorías como iconos tap-able
- Botón guardar grande y visible
- Máximo 2 pasos para registrar

---

## ✅ CHECKLIST UX POR FEATURE

Antes de lanzar cualquier feature:

- [ ] ¿Cumple con máximo 7 opciones visibles?
- [ ] ¿Tiene defaults inteligentes?
- [ ] ¿Los mensajes son positivos?
- [ ] ¿Los colores siguen la paleta neuro?
- [ ] ¿Hay retroalimentación visual inmediata?
- [ ] ¿Se puede completar en <3 taps?
- [ ] ¿Funciona en móvil?
- [ ] ¿Pasa el test "¿cómo me siento?" (no ansiedad)?

---

**Documento:** UX_GUIDELINES.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025

> *"Diseñar para humanos, no para robots."* 🧠
