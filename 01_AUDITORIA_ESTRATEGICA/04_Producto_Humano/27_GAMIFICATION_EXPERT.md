# 🎮 Perfil 27: Founder como Gamification Designer (Sistema Puntos Estilo Duolingo)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Gamification Expert por $40k-55k MXN/mes y usar plataformas como Badgeville ($500-2k USD/mes) para diseñar engagement."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie ni pagar plataformas.** La gamificación es **base de datos + lógica simple** (puntos, badges, rachas). Se implementa con PostgreSQL JSONB y BullMQ.

**Referencia:** Duolingo (valuado en $7B) usa gamificación simple: rachas, niveles, badges. NO usa plataformas externas.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Diseñar Sistema de Puntos | Framework Neurofinanzas Sección 10 | $0 |
| Motor de Gamificación | PostgreSQL + BullMQ | $0 |
| Badges Visuales | Lucide Icons (open source) | $0 |
| Leaderboards | Query SQL simple (opcional) | $0 |
| Plataformas de Gamificación | Nada (Badgeville, etc.) | $0 vs $6k-24k USD/año ⛔ |
| Gamification Expert externo | Solo consultoría puntual (si necesario) | $8k-12k/evento |

**Cuándo contratar:** Fase 3 (100k+ usuarios), si necesitamos optimizar economía de recompensas.

**Ahorro:** $480k-660k MXN/año

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework Gamificación | ✅ Completo | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 10) |
| Neurotransmisores (Dopamina) | ✅ Documentado | `04_NEUROFINANZAS_FRAMEWORK.md` (Sección 1.2) |
| BullMQ (Jobs) | ✅ Stack | `03_STACK_TECNOLOGICO_DEFINITIVO.md` |
| PostgreSQL JSONB | ✅ Stack | Drizzle ORM |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| GAM-001 | **Schema de Gamificación (PostgreSQL)** | 🔴 Bloqueante | Drizzle ORM | $0 | Sem 2 |
| GAM-002 | **Motor de Rachas (Streaks)** | 🟠 Alto | ElysiaJS + BullMQ | $0 | Sem 2 |
| GAM-003 | **Sistema de Badges (15 Insignias)** | 🟡 Medio | JSONB + Lucide Icons | $0 | Sem 3 |
| GAM-004 | **Componentes Visuales (Progreso)** | 🟠 Alto | Svelte 5 | $0 | Sem 3 |
| GAM-005 | **Leaderboards Anónimos** | 🟢 Bajo | Query SQL | $0 | Fase 2 |
| GAM-006 | ~~Plataforma de Gamificación (Badgeville)~~ | ❌ Descartado | N/A | $500-2k USD/mes ⛔ | Nunca |
| GAM-007 | ~~Contratar Gamification Expert~~ | ❌ Descartado | N/A | $40k/mes ⛔ | Nunca (Fase 1-2) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Gamificación (PostgreSQL JSONB)

**Ventaja JSONB:** Permite agregar badges/logros sin alterar schema.

```typescript
// src/lib/server/db/schema/gamification.ts
import { pgTable, text, integer, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

export const userGamification = pgTable('user_gamification', {
  userId: text('user_id').primaryKey(),

  // Puntos y Niveles
  totalPoints: integer('total_points').default(0),
  level: integer('level').default(1),

  // Rachas (Streaks)
  currentStreak: integer('current_streak').default(0),
  longestStreak: integer('longest_streak').default(0),
  lastActivityDate: timestamp('last_activity_date'),

  // Badges (Insignias) en JSONB
  badges: jsonb('badges').$type<string[]>().default([]),
  // Ejemplo: ['FIRST_TRANSACTION', 'TAX_HERO', '7_DAY_STREAK']

  // Estadísticas
  transactionsLogged: integer('transactions_logged').default(0),
  goalsCompleted: integer('goals_completed').default(0),
  taxesFiledOnTime: integer('taxes_filed_on_time').default(0),

  updatedAt: timestamp('updated_at').defaultNow(),
});

// Catálogo de Badges (referencia estática en código)
export const BADGE_CATALOG = [
  // Principiante
  { id: 'FIRST_TRANSACTION', name: 'Primera Transacción', icon: 'Sparkles', points: 10 },
  { id: 'PROFILE_COMPLETE', name: 'Perfil Completo', icon: 'UserCheck', points: 20 },

  // Rachas
  { id: '7_DAY_STREAK', name: '7 Días Seguidos', icon: 'Flame', points: 50 },
  { id: '30_DAY_STREAK', name: '30 Días Seguidos', icon: 'Trophy', points: 150 },
  { id: '100_DAY_STREAK', name: '100 Días de Constancia', icon: 'Crown', points: 500 },

  // Finanzas
  { id: 'FIRST_GOAL', name: 'Primera Meta Creada', icon: 'Target', points: 30 },
  { id: 'GOAL_COMPLETED', name: 'Meta Completada', icon: 'CheckCircle', points: 100 },
  { id: 'SAVINGS_MASTER', name: 'Ahorrador Experto', icon: 'PiggyBank', points: 200 },

  // SAT/Impuestos
  { id: 'TAX_HERO', name: 'Héroe Fiscal', icon: 'FileText', points: 100 },
  { id: 'ON_TIME_FILER', name: 'Declaración Puntual', icon: 'Clock', points: 50 },

  // Social
  { id: 'REFER_FRIEND', name: 'Embajador', icon: 'Users', points: 75 },

  // Avanzado
  { id: '100_TRANSACTIONS', name: '100 Movimientos', icon: 'TrendingUp', points: 150 },
  { id: 'BUDGET_NINJA', name: 'Ninja del Presupuesto', icon: 'BarChart3', points: 200 },
  { id: 'DEBT_FREE', name: 'Libre de Deudas', icon: 'Shield', points: 300 },
  { id: 'FINANCIAL_FREEDOM', name: 'Libertad Financiera', icon: 'Rocket', points: 1000 },
] as const;
```

### 2. Motor de Puntos y Niveles

**Regla:** 100 puntos = 1 nivel. Máximo 50 niveles.

```typescript
// src/lib/server/gamification/points.ts
import { db } from '$lib/server/db';
import { userGamification } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function awardPoints(userId: string, points: number, reason: string) {
  const current = await db.select().from(userGamification)
    .where(eq(userGamification.userId, userId))
    .limit(1);

  if (!current.length) {
    // Crear registro inicial
    await db.insert(userGamification).values({ userId, totalPoints: points, level: 1 });
    return;
  }

  const newPoints = current[0].totalPoints + points;
  const newLevel = Math.min(Math.floor(newPoints / 100) + 1, 50); // Max 50 niveles

  await db.update(userGamification)
    .set({ totalPoints: newPoints, level: newLevel, updatedAt: new Date() })
    .where(eq(userGamification.userId, userId));

  // Si subió de nivel, mostrar celebración
  if (newLevel > current[0].level) {
    await celebrateLevelUp(userId, newLevel);
  }
}

async function celebrateLevelUp(userId: string, newLevel: number) {
  // Enviar notificación push + mostrar modal en app
  await sendPushNotification(userId, {
    title: `🎉 ¡Subiste a Nivel ${newLevel}!`,
    body: 'Sigue así, estás haciendo un gran trabajo con tus finanzas.',
    data: { type: 'LEVEL_UP', level: newLevel }
  });
}
```

**Eventos que otorgan puntos:**

| Acción | Puntos | Frecuencia Máxima |
|:-------|:-------|:------------------|
| Registrar transacción | 5 | Ilimitada |
| Completar perfil | 20 | Una vez |
| Crear meta de ahorro | 30 | Ilimitada |
| Completar meta | 100 | Ilimitada |
| Declarar impuestos a tiempo | 50 | Mensual |
| Mantener racha 7 días | 50 | Semanal |
| Referir amigo exitoso | 75 | Ilimitada |
| Completar onboarding | 15 | Una vez |

### 3. Motor de Rachas (Streaks) - Estilo Duolingo

**Lógica:** Usuario debe interactuar al menos 1 vez al día.

```typescript
// src/lib/server/gamification/streaks.ts
import { db } from '$lib/server/db';
import { userGamification } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { differenceInDays, startOfDay } from 'date-fns';

export async function updateStreak(userId: string) {
  const user = await db.select().from(userGamification)
    .where(eq(userGamification.userId, userId))
    .limit(1);

  if (!user.length) return;

  const today = startOfDay(new Date());
  const lastActivity = user[0].lastActivityDate ? startOfDay(user[0].lastActivityDate) : null;

  if (!lastActivity) {
    // Primera interacción
    await db.update(userGamification)
      .set({ currentStreak: 1, longestStreak: 1, lastActivityDate: today })
      .where(eq(userGamification.userId, userId));
    return;
  }

  const daysDiff = differenceInDays(today, lastActivity);

  if (daysDiff === 0) {
    // Ya interactuó hoy, no hacer nada
    return;
  } else if (daysDiff === 1) {
    // Racha continúa
    const newStreak = user[0].currentStreak + 1;
    const newLongest = Math.max(newStreak, user[0].longestStreak);

    await db.update(userGamification)
      .set({
        currentStreak: newStreak,
        longestStreak: newLongest,
        lastActivityDate: today
      })
      .where(eq(userGamification.userId, userId));

    // Otorgar badges por rachas
    if (newStreak === 7) await awardBadge(userId, '7_DAY_STREAK');
    if (newStreak === 30) await awardBadge(userId, '30_DAY_STREAK');
    if (newStreak === 100) await awardBadge(userId, '100_DAY_STREAK');

  } else {
    // Racha rota (pasaron 2+ días)
    await db.update(userGamification)
      .set({ currentStreak: 1, lastActivityDate: today })
      .where(eq(userGamification.userId, userId));

    // Enviar nudge de recuperación (si racha era >= 7)
    if (user[0].currentStreak >= 7) {
      await sendStreakLostNudge(userId, user[0].currentStreak);
    }
  }
}

async function sendStreakLostNudge(userId: string, lostStreak: number) {
  // Enviar WhatsApp o Push
  await sendPushNotification(userId, {
    title: '😢 Perdiste tu racha',
    body: `Tenías ${lostStreak} días seguidos. ¡Recupera tu ritmo hoy!`,
    data: { type: 'STREAK_LOST', previousStreak: lostStreak }
  });
}
```

### 4. Sistema de Badges (Insignias)

```typescript
// src/lib/server/gamification/badges.ts
import { db } from '$lib/server/db';
import { userGamification } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { BADGE_CATALOG } from '$lib/server/db/schema/gamification';
import { awardPoints } from './points';

export async function awardBadge(userId: string, badgeId: string) {
  const user = await db.select().from(userGamification)
    .where(eq(userGamification.userId, userId))
    .limit(1);

  if (!user.length) return;

  const currentBadges = user[0].badges || [];

  // Evitar duplicados
  if (currentBadges.includes(badgeId)) return;

  const newBadges = [...currentBadges, badgeId];
  await db.update(userGamification)
    .set({ badges: newBadges })
    .where(eq(userGamification.userId, userId));

  // Otorgar puntos del badge
  const badge = BADGE_CATALOG.find(b => b.id === badgeId);
  if (badge) {
    await awardPoints(userId, badge.points, `Badge: ${badge.name}`);
    await celebrateBadge(userId, badge);
  }
}

async function celebrateBadge(userId: string, badge: any) {
  await sendPushNotification(userId, {
    title: `🏆 ¡Desbloqueaste un Badge!`,
    body: `${badge.name} (+${badge.points} puntos)`,
    data: { type: 'BADGE_EARNED', badgeId: badge.id }
  });
}

// Detección automática de badges basados en métricas
export async function checkBadgeEligibility(userId: string) {
  const user = await db.select().from(userGamification)
    .where(eq(userGamification.userId, userId))
    .limit(1);

  if (!user.length) return;

  const u = user[0];

  // 100 transacciones
  if (u.transactionsLogged >= 100 && !u.badges.includes('100_TRANSACTIONS')) {
    await awardBadge(userId, '100_TRANSACTIONS');
  }

  // 5 metas completadas
  if (u.goalsCompleted >= 5 && !u.badges.includes('SAVINGS_MASTER')) {
    await awardBadge(userId, 'SAVINGS_MASTER');
  }

  // 12 declaraciones puntuales
  if (u.taxesFiledOnTime >= 12 && !u.badges.includes('TAX_HERO')) {
    await awardBadge(userId, 'TAX_HERO');
  }
}
```

### 5. Componentes Visuales (Svelte 5)

**Indicador de Racha:**

```svelte
<!-- src/lib/components/gamification/StreakIndicator.svelte -->
<script lang="ts">
  import { Flame } from 'lucide-svelte';

  let { streak } = $props<{ streak: number }>();
  let isActive = $derived(streak > 0);
</script>

<div class="flex items-center gap-2 p-3 rounded-lg" class:active={isActive} class:inactive={!isActive}>
  <Flame class={isActive ? 'text-orange-500' : 'text-gray-400'} size={24} />
  <div>
    <p class="text-sm font-bold">{streak} días</p>
    <p class="text-xs text-muted-foreground">Racha actual</p>
  </div>
</div>

<style>
  .active {
    background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
    border: 2px solid #f97316;
  }

  .inactive {
    background: var(--surface-2);
    border: 1px solid var(--surface-3);
  }
</style>
```

**Badge Display:**

```svelte
<!-- src/lib/components/gamification/BadgeGrid.svelte -->
<script lang="ts">
  import { BADGE_CATALOG } from '$lib/server/db/schema/gamification';
  import * as LucideIcons from 'lucide-svelte';

  let { earnedBadges } = $props<{ earnedBadges: string[] }>();
</script>

<div class="grid grid-cols-3 md:grid-cols-5 gap-4">
  {#each BADGE_CATALOG as badge}
    {@const isEarned = earnedBadges.includes(badge.id)}
    {@const Icon = LucideIcons[badge.icon]}

    <div class="badge-card" class:earned={isEarned} class:locked={!isEarned}>
      <Icon size={32} />
      <p class="text-xs mt-2">{badge.name}</p>
      {#if isEarned}
        <span class="points">+{badge.points}</span>
      {:else}
        <span class="locked-icon">🔒</span>
      {/if}
    </div>
  {/each}
</div>

<style>
  .badge-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
  }

  .earned {
    background: var(--surface-1);
    border: 2px solid var(--color-primary-500);
    color: var(--text-1);
  }

  .locked {
    background: var(--surface-3);
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .points {
    font-size: 0.7rem;
    color: var(--color-primary-600);
    font-weight: bold;
  }
</style>
```

### 6. Leaderboards Anónimos (Opcional)

```typescript
// src/routes/api/leaderboard/+server.ts
import { db } from '$lib/server/db';
import { userGamification, users } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  const top100 = await db.select({
    username: users.username, // Anónimo: solo primeras 2 letras
    level: userGamification.level,
    totalPoints: userGamification.totalPoints,
    currentStreak: userGamification.currentStreak,
  })
  .from(userGamification)
  .innerJoin(users, eq(users.id, userGamification.userId))
  .orderBy(desc(userGamification.totalPoints))
  .limit(100);

  // Anonimizar
  const anonymized = top100.map((user, index) => ({
    rank: index + 1,
    username: user.username.substring(0, 2) + '***', // "Jo***"
    level: user.level,
    points: user.totalPoints,
    streak: user.currentStreak,
  }));

  return new Response(JSON.stringify(anonymized), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## 💡 Mentalidad Bootstrap: Gamificación = Base de Datos, No Plataformas

### Qué hace el Sistema:

1. **Otorgar puntos** automáticamente por acciones (transacciones, metas, impuestos).
2. **Detectar badges** con reglas if/then (100 transacciones → Badge).
3. **Mantener rachas** con cron job diario (BullMQ).
4. **Celebrar logros** con notificaciones push + modales.

### Qué NO hacer:

- ❌ Pagar plataformas como Badgeville ($6k-24k USD/año).
- ❌ Crear economía compleja (canjear puntos por dinero = problema legal).
- ❌ Leaderboards públicos (privacidad + toxicidad).

### Herramientas:

- **PostgreSQL JSONB:** Almacenar badges sin alterar schema.
- **BullMQ:** Cron jobs para detectar rachas/badges.
- **Lucide Icons:** 1,000+ iconos open source para badges.
- **shadcn-svelte:** Componentes visuales (Progress, Badge, Card).

---

## 🇲🇽 Adaptación México Profundo

### 1. Badges Culturalmente Relevantes

**❌ Genérico:**
> "Master Saver" (insignia de ahorro)

**✅ México:**
> "Guardadito de la Abuela" (evoca cultura de ahorro familiar)

**Otros ejemplos:**

- "Ninja del SAT" (declaraciones a tiempo)
- "Rey de la Quincena" (presupuesto perfecto)
- "Águila Financiera" (patrimonio sólido)

### 2. Evitar Monetización de Puntos

En México, convertir puntos virtuales en dinero puede interpretarse como **rifas/sorteos** (regulado por Segob).

**❌ Ilegal/Gris:**
> "Canjea 10,000 puntos por $100 MXN."

**✅ Legal:**
> "Desbloquea función premium con Nivel 10."

### 3. Mensajes de Celebración Mexicanos

**Badge Desbloqueado:**
> "🎉 ¡Órale! Desbloqueaste 'Ninja del SAT'. +100 puntos."

**Nivel Subido:**
> "🚀 ¡A huevo! Ya eres Nivel 5. Sigue así, campeón."

---

## 🔗 Referencias

- **Octalysis Framework:** Yu-kai Chou (8 motivadores de gamificación).
- **Duolingo Case Study:** Cómo rachas aumentaron retención 20%.
- **Self-Determination Theory (SDT):** Autonomía, Competencia, Relación.
- **Framework Neurofinanzas:** `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 10).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Gamificación en PostgreSQL, Cero Plataformas Externas)*
