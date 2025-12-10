# 🧠 Perfil 26: Founder como Behavioral Economist (Nudges Automatizados)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Behavioral Economist por $45k-65k MXN/mes para diseñar nudges y aplicar economía conductual."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** Los nudges son reglas **if/then** simples basadas en el Framework de Neurofinanzas (ya documentado). Se automatizan con BullMQ (cron jobs) y PostgreSQL.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Diseñar Nudges | Patrones del `04_NEUROFINANZAS_FRAMEWORK.md` | $0 |
| Motor de Nudges | Lógica en ElysiaJS + BullMQ | $0 |
| A/B Testing de Nudges | PostHog (self-hosted) en Fase 2 | $0 |
| Análisis Conductual | Métricas PostgreSQL + dashboard básico | $0 |
| Behavioral Economist externo | Solo consultoría puntual (si necesario) | $10k-15k/evento |

**Cuándo contratar:** Fase 3 (50k+ usuarios), si necesitamos optimizar conversión/retención.

**Ahorro:** $540k-780k MXN/año

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework Neuro Completo | ✅ 12 secciones | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` |
| Sesgos Cognitivos Aplicables | ✅ 20+ sesgos | `04_NEUROFINANZAS_FRAMEWORK.md` (Sección 2.3) |
| 100 Necesidades Diarias | ✅ Investigación | `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` |
| BullMQ (Queue System) | ✅ Stack | `03_STACK_TECNOLOGICO_DEFINITIVO.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| BEH-001 | **Motor de Nudges Automatizado** | 🔴 Bloqueante | ElysiaJS + BullMQ | $0 | Sem 2 |
| BEH-002 | **Visualización Goal Gradient Effect** | 🟠 Alto | Svelte 5 + CSS | $0 | Sem 3 |
| BEH-003 | **Defaults Inteligentes (Formularios)** | 🟡 Medio | Zod schemas con defaults | $0 | Sem 3 |
| BEH-004 | **Sesgos Mexicanos Aplicados** | 🟡 Medio | Documentación de patrones | $0 | Sem 4 |
| BEH-005 | ~~Contratar Behavioral Economist~~ | ❌ Descartado | N/A | $45k/mes ⛔ | Nunca (Fase 1-2) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Motor de Nudges Automatizado (ElysiaJS + BullMQ)

Nudges son mensajes contextuales que aparecen en el momento correcto. Se calculan con **reglas if/then** simples.

**Schema de Nudges:**

```typescript
// src/lib/server/db/schema/nudges.ts
import { pgTable, text, timestamp, boolean, jsonb, uuid } from 'drizzle-orm/pg-core';

export const userNudges = pgTable('behavioral_nudges', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  nudgeType: text('nudge_type').notNull(), // 'SAVING_REMINDER', 'TAX_DEADLINE', 'STREAK_RECOVERY'
  message: text('message').notNull(),
  ctaText: text('cta_text'), // Texto del botón
  ctaLink: text('cta_link'), // Enlace del CTA
  metadata: jsonb('metadata'), // Datos extras
  isDismissed: boolean('is_dismissed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**Motor de Detección (Cron Job Diario):**

```typescript
// src/lib/server/nudges/detector.ts
import { db } from '$lib/server/db';
import { users, transactions, goals, userNudges } from '$lib/server/db/schema';
import { eq, sql, and, gte } from 'drizzle-orm';

export async function detectNudges() {
  const allUsers = await db.select().from(users).where(eq(users.isActive, true));

  for (const user of allUsers) {
    // NUDGE 1: Saldo alto sin ahorro (Aversión a pérdida)
    const balance = parseFloat(user.balance);
    const savings = parseFloat(user.savingsAmount || '0');

    if (balance > 10000 && savings < 1000) {
      await db.insert(userNudges).values({
        userId: user.id,
        nudgeType: 'SAVING_OPPORTUNITY',
        message: `Tienes $${balance.toFixed(2)} disponibles. ¿Qué tal si separas $2,000 para emergencias?`,
        ctaText: 'Crear meta de ahorro',
        ctaLink: '/goals/create',
        metadata: { balance, savings, suggestedAmount: 2000 }
      });
    }

    // NUDGE 2: Recordatorio SAT (Sesgos: Pérdida > Ganancia)
    const today = new Date();
    const dayOfMonth = today.getDate();

    if (dayOfMonth >= 10 && dayOfMonth <= 16) {
      await db.insert(userNudges).values({
        userId: user.id,
        nudgeType: 'TAX_DEADLINE',
        message: `El 17 de ${today.toLocaleDateString('es-MX', { month: 'long' })} vence tu declaración. ¡No dejes que el SAT te multe!`,
        ctaText: 'Declarar impuestos',
        ctaLink: '/taxes/declaracion',
        metadata: { deadline: '17', urgency: 'HIGH' }
      });
    }

    // NUDGE 3: Recuperación de Racha (Gamificación)
    const lastActivity = user.lastActivityDate;
    if (lastActivity) {
      const daysSinceActivity = Math.floor((Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

      if (daysSinceActivity === 2) {
        await db.insert(userNudges).values({
          userId: user.id,
          nudgeType: 'STREAK_RECOVERY',
          message: '¡No pierdas tu racha de 15 días! Registra un gasto hoy para mantenerla.',
          ctaText: 'Registrar gasto',
          ctaLink: '/transactions/add',
          metadata: { currentStreak: user.currentStreak, daysInactive: daysSinceActivity }
        });
      }
    }

    // NUDGE 4: Meta cerca de completarse (Goal Gradient Effect)
    const activeGoals = await db.select().from(goals)
      .where(and(
        eq(goals.userId, user.id),
        eq(goals.status, 'ACTIVE')
      ));

    for (const goal of activeGoals) {
      const progress = (parseFloat(goal.currentAmount) / parseFloat(goal.targetAmount)) * 100;

      if (progress >= 80 && progress < 100) {
        const remaining = parseFloat(goal.targetAmount) - parseFloat(goal.currentAmount);
        await db.insert(userNudges).values({
          userId: user.id,
          nudgeType: 'GOAL_ALMOST_COMPLETE',
          message: `¡Ya casi! Solo te faltan $${remaining.toFixed(2)} para completar "${goal.name}". 🎯`,
          ctaText: 'Ver meta',
          ctaLink: `/goals/${goal.id}`,
          metadata: { goalId: goal.id, progress, remaining }
        });
      }
    }
  }
}
```

**Configuración BullMQ (Cron Job):**

```typescript
// src/lib/server/jobs/nudges.job.ts
import { Queue, Worker } from 'bullmq';
import { detectNudges } from '$lib/server/nudges/detector';

const nudgesQueue = new Queue('nudges-detection', {
  connection: { host: 'localhost', port: 6379 }
});

// Ejecutar todos los días a las 9am
await nudgesQueue.add(
  'daily-nudges',
  {},
  { repeat: { pattern: '0 9 * * *' } }
);

const worker = new Worker(
  'nudges-detection',
  async (job) => {
    await detectNudges();
  },
  { connection: { host: 'localhost', port: 6379 } }
);
```

### 2. Visualización Goal Gradient Effect (Progreso Visual)

El cerebro se motiva más cuando ve que está **cerca** de completar algo.

```svelte
<!-- src/lib/components/goals/GoalProgress.svelte -->
<script lang="ts">
  import { Progress } from '$lib/components/ui/progress';

  let { goal } = $props<{ goal: { name: string, currentAmount: number, targetAmount: number } }>();

  let progress = $derived((goal.currentAmount / goal.targetAmount) * 100);
  let remaining = $derived(goal.targetAmount - goal.currentAmount);
  let isCloseToFinish = $derived(progress >= 80);
</script>

<div class="goal-card" class:pulse={isCloseToFinish}>
  <div class="flex justify-between mb-2">
    <h3 class="font-bold">{goal.name}</h3>
    <span class="text-sm text-muted">{progress.toFixed(0)}%</span>
  </div>

  <Progress value={progress} class="mb-2" />

  <p class="text-sm">
    {#if isCloseToFinish}
      🎯 ¡Ya casi! Solo faltan ${remaining.toFixed(2)} MXN
    {:else}
      ${goal.currentAmount.toFixed(2)} de ${goal.targetAmount.toFixed(2)} MXN
    {/if}
  </p>
</div>

<style>
  .pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    border: 2px solid var(--color-primary-500);
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.8; }
  }
</style>
```

### 3. Defaults Inteligentes (Default Bias)

La opción **pre-seleccionada** se elige en el 80% de los casos.

**Ejemplo: Formulario de Ahorro**

```typescript
// src/lib/schemas/savings.ts
import { z } from 'zod';

export const savingsGoalSchema = z.object({
  name: z.string().min(3).default('Fondo de Emergencia'),
  targetAmount: z.number().positive().default(20000), // Salario promedio MX
  monthlyContribution: z.number().positive().default(2000), // 10% del ingreso promedio
  category: z.enum(['EMERGENCY', 'VACATION', 'PURCHASE', 'OTHER']).default('EMERGENCY'),
});
```

**En el formulario Svelte:**

```svelte
<script lang="ts">
  import { savingsGoalSchema } from '$lib/schemas/savings';

  let formData = $state({
    name: 'Fondo de Emergencia', // Pre-filled
    targetAmount: 20000,
    monthlyContribution: 2000,
    category: 'EMERGENCY'
  });
</script>

<form>
  <label>
    Nombre de tu meta
    <input type="text" bind:value={formData.name} placeholder="Ej: Fondo de Emergencia" />
    <p class="hint">💡 Tip: 3-6 meses de gastos</p>
  </label>

  <label>
    ¿Cuánto quieres ahorrar?
    <input type="number" bind:value={formData.targetAmount} />
    <p class="hint">Sugerido: $20,000 MXN (3 meses de gastos promedio)</p>
  </label>
</form>
```

### 4. Sesgos Mexicanos Aplicados

**Tabla de Sesgos Cognitivos + Adaptación Cultural:**

| Sesgo Conductual | Aplicación Universal | Adaptación México Profundo |
|:-----------------|:---------------------|:---------------------------|
| **Aversión a pérdida** | "No pierdas tu racha" | "No dejes que el SAT te multe" |
| **Anclaje** | "Usuarios ahorran $2,500/mes" | "Tu vecino ya ahorró $5,000" (prueba social) |
| **FOMO (Fear of Missing Out)** | "Última oportunidad" | "Solo 3 espacios para plan PRO" |
| **Efecto dotación** | "Tu ahorro de $10,000" | "Tu aguinaldo de $15,000" |
| **Sesgo de confirmación** | Mostrar datos que confirmen progreso | "Gastas 20% menos que el mes pasado" |
| **Presente vs Futuro** | Mostrar beneficio inmediato | "Este café = 2 días más para tu meta" |

**Ejemplo: Recordatorio Multa SAT (Aversión a pérdida)**

```svelte
<Alert variant="warning">
  <AlertCircle class="h-4 w-4" />
  <AlertTitle>⚠️ Declaración próxima a vencer</AlertTitle>
  <AlertDescription>
    El 17 vence tu declaración. Si no la presentas, el SAT puede multarte hasta $15,000 MXN.
    <br />
    <Button variant="destructive" class="mt-2">Declarar ahora (5 min)</Button>
  </AlertDescription>
</Alert>
```

---

## 💡 Mentalidad Bootstrap: Nudges = Código, No Psicólogos

### Qué hace el Sistema:

1. **Detectar oportunidades** (cron job diario con BullMQ).
2. **Generar nudges** basados en patrones del Framework Neurofinanzas.
3. **Mostrarlos** en el dashboard como notificaciones no intrusivas.

### Cuándo contratar especialista:

- **Fase 3:** 50k+ usuarios, si las métricas muestran baja conversión de nudges.
- **Costo:** $10k-15k por consultoría puntual (no nómina).

### Herramientas:

- **BullMQ:** Cron jobs para ejecutar detector de nudges.
- **PostgreSQL:** Almacenar nudges y métricas.
- **shadcn-svelte Alert:** Componente para mostrar nudges.

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje de Pérdida (Aversión Mexicana)

**❌ MAL (Abstracto):**
> "Optimiza tu portafolio para maximizar retornos ajustados al riesgo."

**✅ BIEN (Concreto + Pérdida):**
> "Si no ahorras $2,000 al mes, en 1 año habrás perdido $24,000 que pudiste tener."

### 2. Prueba Social Localizada

**❌ Genérico:**
> "8 de cada 10 usuarios usan esta función."

**✅ México:**
> "Tu vecino en CDMX ya ahorró $10,000 con esta estrategia."

### 3. Urgencia Real (No Falsa)

**❌ Clickbait:**
> "¡ÚLTIMA OPORTUNIDAD! Solo hoy 50% de descuento."

**✅ Fecha Real:**
> "El 17 de enero vence la declaración provisional. Quedan 5 días."

---

## 🔗 Referencias

- **Nudge Theory:** Thaler & Sunstein (Premio Nobel 2017).
- **Behavioral Design:** BJ Fogg Model (Motivation × Ability × Trigger).
- **Framework Neurofinanzas:** `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md`.
- **Kahneman:** _Thinking, Fast and Slow_ (Sistema 1 vs Sistema 2).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Nudges automatizados con código, Cero Psicólogos)*
