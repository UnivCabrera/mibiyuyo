# 💼 PERFIL 54: CONSULTOR DE NEGOCIOS / FREELANCER RESICO - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME)
**Tanda:** 1 (Servicios Profesionales)
**Fecha:** 9 Diciembre 2025
**Base:** Expansión de Perfil 20 de `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL (Pain Point SAT 2026)

### El Problema Específico

**NO es:** "Los impuestos son complicados" (genérico)

**SÍ es:**

> **"Estoy en RESICO. Facturé $2.8M MXN en 2025 (dentro del tope de $3.5M). En febrero 2026, me llega un proyecto de $900k. Si lo acepto, me paso a $3.7M y el SAT me OBLIGA a cambiar a Persona Física con Actividad Empresarial (PFAE). Ahí pago ISR del 30-35% vs el 2.5% que pago ahorita en RESICO. Pierdo $250k en impuestos adicionales. Pero si NO acepto el proyecto, pierdo el cliente. Son las 3am y no sé qué hacer. Mi contador me dice 'calcula tú' pero no tengo herramientas."**

---

### Desglose del Dolor

| Escenario | Ingresos 2026 | Régimen | ISR Estimado | Utilidad Neta |
|:---|:-:|:---|:-:|:-:|
| **Escenario 1: Acepto proyecto** | $3.7M | PFAE (30% ISR) | $1.11M | $2.59M |
| **Escenario 2: Rechazo proyecto** | $2.8M | RESICO (2.5% ISR) | $70k | $2.73M |

**Resultado:** Ganar más = ganar menos. **Paradoja fiscal**.

---

### Problema Adicional: Ignorancia del Tope

Muchos consultores/freelancers en RESICO **no saben cuánto llevan facturado en el año**.

**Consecuencia:**

1. Se pasan del tope sin darse cuenta
2. SAT los cambia automáticamente a PFAE en diciembre
3. Reciben **multa** + deben pagar la diferencia de ISR retroactivo
4. Multa típica: $50,000-150,000 MXN

---

### Impacto Neurociencia

| Neurotransmisor | Estado Actual | Síntoma Conductual |
|:---|:-:|:---|
| **Cortisol** | ⬆️⬆️⬆️ Crítico | Parálisis decisional ("¿Acepto o no?") |
| **Dopamina** | ⬇️⬇️ Muy bajo | Frustración ("Para qué crezco si pierdo") |
| **Serotonina** | ⬇️ Bajo | Sensación de trampa ("El sistema está mal") |
| **Carga Cognitiva** | 🔴🔴 Colapso | Cálculos manuales imposibles |

**Consecuencia:** Muchos consultores terminan **rechazando clientes grandes** por miedo fiscal (crecimiento autolimitado).

---

## 2. 🎯 MÓDULO CRÍTICO (Killer Feature)

### Nombre del Módulo

**"Monitor RESICO con Simulador Predictivo de Cambio de Régimen"**

---

### ¿Qué Resuelve?

1. **Dashboard en tiempo real:** "Llevas $2.8M de $3.5M (80% del tope)"
2. **Alerta preventiva:** "⚠️ Solo te quedan $700k para no pasarte"
3. **Simulador de escenarios:**
   - "Si acepto este proyecto de $900k, pagaré $250k más de ISR"
   - "Si lo rechazo, me quedo con $140k más en bolsa"
4. **Recomendación automatizada:**
   - "✅ Acepta solo $700k y negocia el resto para 2027"
   - "❌ No aceptes, tu utilidad neta será menor"

---

### Especificación Técnica

#### A. Schema PostgreSQL

```typescript
// apps/backend/src/db/schema.ts (agregar)

export const resicoMonitor = pgTable('resico_monitor', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Año fiscal
  fiscalYear: integer('fiscal_year').notNull(), // 2026

  // Topes oficiales SAT
  resicoLimit: decimal('resico_limit', { precision: 12, scale: 2 }).default('3500000'), // $3.5M

  // Acumulado
  totalInvoiced: decimal('total_invoiced', { precision: 12, scale: 2 }).default('0'),
  remainingCapacity: decimal('remaining_capacity', { precision: 12, scale: 2 }),
  percentageUsed: decimal('percentage_used', { precision: 5, scale: 2 }),

  // Status
  status: varchar('status', { length: 20 }).default('safe'), // safe | warning | danger | exceeded
  exceededDate: timestamp('exceeded_date'),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const resicoScenarios = pgTable('resico_scenarios', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos del escenario
  scenarioName: varchar('scenario_name', { length: 255 }).notNull(), // "Proyecto Cliente ABC"
  projectAmount: decimal('project_amount', { precision: 12, scale: 2 }).notNull(),

  // Proyección
  projectedTotal: decimal('projected_total', { precision: 12, scale: 2 }).notNull(), // Actual + proyecto
  willExceedLimit: boolean('will_exceed_limit').default(false),

  // Cálculos fiscales
  isrResico: decimal('isr_resico', { precision: 12, scale: 2 }), // 2.5%
  isrPfae: decimal('isr_pfae', { precision: 12, scale: 2 }), // 30%
  differenceLoss: decimal('difference_loss', { precision: 12, scale: 2 }),

  // Recomendación
  recommendation: text('recommendation'),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});

export const resicoAlerts = pgTable('resico_alerts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Tipo de alerta
  alertType: varchar('alert_type', { length: 50 }).notNull(), // warning_80 | danger_90 | exceeded
  threshold: decimal('threshold', { precision: 5, scale: 2 }).notNull(), // 80%, 90%, etc.
  currentAmount: decimal('current_amount', { precision: 12, scale: 2 }).notNull(),

  // Mensaje
  message: text('message').notNull(),

  // Status
  read: boolean('read').default(false),
  dismissed: boolean('dismissed').default(false),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

#### B. Endpoint ElysiaJS: Simulador de Escenarios

```typescript
// apps/backend/src/routes/resico/monitor.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { resicoMonitor, resicoScenarios, resicoAlerts, invoices } from '../../db/schema';
import { eq, and, gte, lte, sum } from 'drizzle-orm';

export const resicoRouter = new Elysia({ prefix: '/resico' })

  // GET /api/v1/resico/monitor - Estado actual del monitor
  .get('/monitor', async ({ user }) => {
    const currentYear = new Date().getFullYear();

    // 1. Calcular total facturado en el año
    const invoicesThisYear = await db.query.invoices.findMany({
      where: (invoices, { and, eq, gte, lte }) =>
        and(
          eq(invoices.userId, user.id),
          gte(invoices.createdAt, new Date(`${currentYear}-01-01`)),
          lte(invoices.createdAt, new Date(`${currentYear}-12-31`))
        ),
    });

    const totalInvoiced = invoicesThisYear.reduce((sum, inv) => sum + Number(inv.total), 0);
    const resicoLimit = 3500000;
    const remainingCapacity = resicoLimit - totalInvoiced;
    const percentageUsed = (totalInvoiced / resicoLimit) * 100;

    // 2. Determinar status
    let status = 'safe';
    if (percentageUsed >= 90) status = 'danger';
    else if (percentageUsed >= 80) status = 'warning';
    if (totalInvoiced > resicoLimit) status = 'exceeded';

    // 3. Actualizar o crear monitor
    const existingMonitor = await db.query.resicoMonitor.findFirst({
      where: (monitor, { and, eq }) =>
        and(eq(monitor.userId, user.id), eq(monitor.fiscalYear, currentYear)),
    });

    if (existingMonitor) {
      await db.update(resicoMonitor)
        .set({
          totalInvoiced,
          remainingCapacity,
          percentageUsed,
          status,
          exceededDate: status === 'exceeded' ? new Date() : null,
          updatedAt: new Date(),
        })
        .where(eq(resicoMonitor.id, existingMonitor.id));
    } else {
      await db.insert(resicoMonitor).values({
        userId: user.id,
        fiscalYear: currentYear,
        totalInvoiced,
        remainingCapacity,
        percentageUsed,
        status,
      });
    }

    // 4. Generar alertas si es necesario
    if (percentageUsed >= 80 && percentageUsed < 90) {
      await createAlertIfNotExists(user.id, 'warning_80', 80, totalInvoiced);
    } else if (percentageUsed >= 90 && totalInvoiced <= resicoLimit) {
      await createAlertIfNotExists(user.id, 'danger_90', 90, totalInvoiced);
    } else if (status === 'exceeded') {
      await createAlertIfNotExists(user.id, 'exceeded', 100, totalInvoiced);
    }

    return {
      fiscalYear: currentYear,
      resicoLimit,
      totalInvoiced,
      remainingCapacity,
      percentageUsed: percentageUsed.toFixed(2) + '%',
      status,
      message: getStatusMessage(status, remainingCapacity, totalInvoiced, resicoLimit),
    };
  })

  // POST /api/v1/resico/simulate - Simular escenario de nuevo proyecto
  .post('/simulate', async ({ body, user }) => {
    const { projectName, projectAmount } = body;
    const currentYear = new Date().getFullYear();

    // 1. Obtener monitor actual
    const monitor = await db.query.resicoMonitor.findFirst({
      where: (monitor, { and, eq }) =>
        and(eq(monitor.userId, user.id), eq(monitor.fiscalYear, currentYear)),
    });

    if (!monitor) {
      throw new Error('Monitor no inicializado. Llama a /resico/monitor primero.');
    }

    const currentTotal = Number(monitor.totalInvoiced);
    const projectedTotal = currentTotal + Number(projectAmount);
    const resicoLimit = 3500000;
    const willExceedLimit = projectedTotal > resicoLimit;

    // 2. Calcular ISR en ambos escenarios
    let isrResico = 0;
    let isrPfae = 0;
    let recommendation = '';

    if (!willExceedLimit) {
      // Escenario 1: Sigue en RESICO
      isrResico = projectedTotal * 0.025; // 2.5%
      recommendation = `✅ Puedes aceptar este proyecto y seguir en RESICO.\n\nPagarás $${isrResico.toLocaleString('es-MX')} de ISR (2.5%).\n\nAún te quedarían $${(resicoLimit - projectedTotal).toLocaleString('es-MX')} de margen.`;
    } else {
      // Escenario 2: Se pasa a PFAE
      const excededAmount = projectedTotal - resicoLimit;
      isrResico = resicoLimit * 0.025; // 2.5% sobre primeros $3.5M
      isrPfae = projectedTotal * 0.30; // 30% sobre todo (PFAE)
      const differenceLoss = isrPfae - isrResico;

      recommendation = `⚠️ ALERTA: Si aceptas este proyecto, te pasarás del tope RESICO.\n\n` +
        `📊 Comparación:\n` +
        `- Escenario RESICO (sin proyecto): ISR $${isrResico.toLocaleString('es-MX')} (2.5%)\n` +
        `- Escenario PFAE (con proyecto): ISR $${isrPfae.toLocaleString('es-MX')} (30%)\n\n` +
        `💸 PÉRDIDA: $${differenceLoss.toLocaleString('es-MX')} adicionales en ISR\n\n` +
        `🎯 RECOMENDACIÓN:\n` +
        `1. Negocia solo $${(resicoLimit - currentTotal).toLocaleString('es-MX')} para 2026\n` +
        `2. Deja los otros $${excededAmount.toLocaleString('es-MX')} para facturar en 2027\n` +
        `3. O rechaza el proyecto si no es negociable (tu utilidad neta será MENOR aceptándolo)`;
    }

    // 3. Guardar escenario
    const [scenario] = await db.insert(resicoScenarios).values({
      userId: user.id,
      scenarioName: projectName,
      projectAmount: Number(projectAmount),
      projectedTotal,
      willExceedLimit,
      isrResico,
      isrPfae: willExceedLimit ? isrPfae : 0,
      differenceLoss: willExceedLimit ? (isrPfae - isrResico) : 0,
      recommendation,
    }).returning();

    return {
      success: true,
      scenario: {
        id: scenario.id,
        projectName,
        projectAmount: Number(projectAmount),
        currentTotal,
        projectedTotal,
        willExceedLimit,
        isrResico,
        isrPfae: willExceedLimit ? isrPfae : 0,
        differenceLoss: willExceedLimit ? (isrPfae - isrResico) : 0,
      },
      recommendation,
    };
  }, {
    body: t.Object({
      projectName: t.String(),
      projectAmount: t.Number(),
    }),
  })

  // GET /api/v1/resico/alerts - Obtener alertas activas
  .get('/alerts', async ({ user }) => {
    const alerts = await db.query.resicoAlerts.findMany({
      where: (alerts, { and, eq }) =>
        and(eq(alerts.userId, user.id), eq(alerts.dismissed, false)),
      orderBy: (alerts, { desc }) => [desc(alerts.createdAt)],
    });

    return {
      alerts: alerts.map(a => ({
        id: a.id,
        type: a.alertType,
        message: a.message,
        currentAmount: Number(a.currentAmount),
        createdAt: a.createdAt,
        read: a.read,
      })),
    };
  });

// Helper: Crear alerta si no existe
async function createAlertIfNotExists(userId: number, alertType: string, threshold: number, currentAmount: number) {
  const existingAlert = await db.query.resicoAlerts.findFirst({
    where: (alerts, { and, eq }) =>
      and(eq(alerts.userId, userId), eq(alerts.alertType, alertType), eq(alerts.dismissed, false)),
  });

  if (!existingAlert) {
    const messages = {
      warning_80: `⚠️ Has alcanzado el 80% del tope RESICO ($${currentAmount.toLocaleString('es-MX')} de $3,500,000). Solo te quedan $${(3500000 - currentAmount).toLocaleString('es-MX')} para el resto del año.`,
      danger_90: `🚨 Has alcanzado el 90% del tope RESICO ($${currentAmount.toLocaleString('es-MX')} de $3,500,000). ¡CUIDADO! Solo te quedan $${(3500000 - currentAmount).toLocaleString('es-MX')}.`,
      exceeded: `🔴 EXCEDISTE el tope RESICO. Facturaste $${currentAmount.toLocaleString('es-MX')} (límite: $3,500,000). El SAT te cambiará a PFAE automáticamente. Deberás pagar ISR retroactivo.`,
    };

    await db.insert(resicoAlerts).values({
      userId,
      alertType,
      threshold,
      currentAmount,
      message: messages[alertType] || 'Alerta RESICO',
    });
  }
}

// Helper: Mensaje según status
function getStatusMessage(status: string, remaining: number, current: number, limit: number): string {
  if (status === 'safe') {
    return `✅ Estás en zona segura. Llevas $${current.toLocaleString('es-MX')} facturados.`;
  } else if (status === 'warning') {
    return `⚠️ Atención: Te quedan solo $${remaining.toLocaleString('es-MX')} para no pasarte del tope.`;
  } else if (status === 'danger') {
    return `🚨 PELIGRO: Estás a punto de exceder el tope. Solo $${remaining.toLocaleString('es-MX')} restantes.`;
  } else {
    return `🔴 EXCEDISTE el tope RESICO. El SAT te cambiará a PFAE. Contacta a un contador URGENTE.`;
  }
}
```

---

#### C. Componente Svelte: Dashboard RESICO Monitor

```svelte
<!-- apps/frontend/src/routes/resico/monitor/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let monitorData = $state<any>(null);
  let alerts = $state<any[]>([]);
  let loading = $state(true);

  // Simulador
  let showSimulator = $state(false);
  let projectName = $state('');
  let projectAmount = $state(0);
  let simulationResult = $state<any>(null);

  onMount(async () => {
    await loadMonitor();
    await loadAlerts();
    loading = false;
  });

  async function loadMonitor() {
    const response = await fetch('/api/v1/resico/monitor', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    monitorData = await response.json();
  }

  async function loadAlerts() {
    const response = await fetch('/api/v1/resico/alerts', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await response.json();
    alerts = data.alerts;
  }

  async function simulateScenario() {
    const response = await fetch('/api/v1/resico/simulate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectName, projectAmount }),
    });

    simulationResult = await response.json();
  }
</script>

{#if loading}
  <div class="loading">Cargando monitor RESICO...</div>
{:else if monitorData}
  <div class="resico-monitor">
    <h1>📊 Monitor RESICO {monitorData.fiscalYear}</h1>

    <!-- Alertas activas -->
    {#if alerts.length > 0}
      <div class="alerts">
        {#each alerts as alert}
          <div class="alert {alert.type}">
            {alert.message}
          </div>
        {/each}
      </div>
    {/if}

    <!-- Gauge visual -->
    <div class="gauge-container">
      <h2>Tu Progreso en RESICO</h2>

      <div class="gauge">
        <div
          class="gauge-fill {monitorData.status}"
          style="width: {monitorData.percentageUsed}"
        ></div>
      </div>

      <div class="gauge-labels">
        <span>$0</span>
        <span>$1.75M</span>
        <span>$3.5M (Tope)</span>
      </div>

      <div class="gauge-info">
        <p class="current">${Number(monitorData.totalInvoiced).toLocaleString('es-MX')}</p>
        <p class="label">Facturado este año</p>
      </div>

      <div class="remaining {monitorData.status}">
        {#if monitorData.status === 'exceeded'}
          <p>🔴 EXCEDISTE EL TOPE</p>
          <p class="amount">+${Math.abs(Number(monitorData.remainingCapacity)).toLocaleString('es-MX')}</p>
        {:else}
          <p>Margen restante:</p>
          <p class="amount">${Number(monitorData.remainingCapacity).toLocaleString('es-MX')}</p>
        {/if}
      </div>
    </div>

    <!-- Simulador -->
    <div class="simulator">
      <h2>🎯 Simulador de Escenarios</h2>

      {#if !showSimulator}
        <button onclick={() => showSimulator = true} class="btn-primary">
          📈 Simular Nuevo Proyecto
        </button>
      {:else}
        <div class="simulator-form">
          <input
            type="text"
            bind:value={projectName}
            placeholder="Nombre del proyecto"
            class="input"
          />
          <input
            type="number"
            bind:value={projectAmount}
            placeholder="Monto del proyecto (MXN)"
            class="input"
          />
          <button onclick={simulateScenario} class="btn-simulate">
            Calcular Impacto
          </button>
        </div>

        {#if simulationResult}
          <div class="simulation-result">
            <h3>{simulationResult.scenario.willExceedLimit ? '⚠️' : '✅'} Resultado de la Simulación</h3>

            <div class="comparison">
              <div class="column">
                <h4>Situación Actual</h4>
                <p>${Number(simulationResult.scenario.currentTotal).toLocaleString('es-MX')}</p>
              </div>
              <div class="arrow">→</div>
              <div class="column">
                <h4>Con Este Proyecto</h4>
                <p>${Number(simulationResult.scenario.projectedTotal).toLocaleString('es-MX')}</p>
              </div>
            </div>

            {#if simulationResult.scenario.willExceedLimit}
              <div class="loss-alert">
                <p><strong>💸 Pérdida por cambio de régimen:</strong></p>
                <p class="loss-amount">${Number(simulationResult.scenario.differenceLoss).toLocaleString('es-MX')}</p>
              </div>
            {/if}

            <div class="recommendation">
              <pre>{simulationResult.recommendation}</pre>
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </div>
{/if}

<style>
  .resico-monitor {
    max-width: var(--size-content-2);
    margin: 0 auto;
    padding: var(--size-6);
  }

  .alerts {
    margin: var(--size-4) 0;
  }

  .alert {
    padding: var(--size-3);
    border-radius: var(--radius-2);
    margin-bottom: var(--size-2);
    font-weight: bold;
  }

  .alert.warning_80 {
    background: var(--yellow-2);
    border-left: 4px solid var(--yellow-7);
    color: var(--yellow-10);
  }

  .alert.danger_90 {
    background: var(--orange-2);
    border-left: 4px solid var(--orange-7);
    color: var(--orange-10);
  }

  .alert.exceeded {
    background: var(--red-2);
    border-left: 4px solid var(--red-7);
    color: var(--red-10);
  }

  .gauge-container {
    background: var(--surface-1);
    padding: var(--size-6);
    border-radius: var(--radius-3);
    margin: var(--size-5) 0;
    box-shadow: var(--shadow-3);
  }

  .gauge {
    width: 100%;
    height: 40px;
    background: var(--gray-3);
    border-radius: var(--radius-2);
    overflow: hidden;
    position: relative;
    margin: var(--size-4) 0;
  }

  .gauge-fill {
    height: 100%;
    transition: width 0.5s ease;
  }

  .gauge-fill.safe {
    background: linear-gradient(90deg, var(--green-5), var(--green-6));
  }

  .gauge-fill.warning {
    background: linear-gradient(90deg, var(--yellow-5), var(--yellow-6));
  }

  .gauge-fill.danger {
    background: linear-gradient(90deg, var(--orange-5), var(--red-6));
  }

  .gauge-fill.exceeded {
    background: var(--red-7);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }

  .gauge-labels {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-0);
    color: var(--gray-7);
  }

  .gauge-info {
    text-align: center;
    margin: var(--size-4) 0;
  }

  .current {
    font-size: var(--font-size-7);
    font-weight: bold;
    color: var(--blue-9);
  }

  .remaining {
    text-align: center;
    padding: var(--size-4);
    border-radius: var(--radius-2);
    margin-top: var(--size-4);
  }

  .remaining.safe {
    background: var(--green-1);
  }

  .remaining.warning {
    background: var(--yellow-1);
  }

  .remaining.danger {
    background: var(--orange-1);
  }

  .remaining.exceeded {
    background: var(--red-1);
  }

  .amount {
    font-size: var(--font-size-5);
    font-weight: bold;
    margin-top: var(--size-2);
  }

  .simulator {
    background: var(--surface-1);
    padding: var(--size-5);
    border-radius: var(--radius-3);
    margin-top: var(--size-5);
  }

  .simulator-form {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    margin: var(--size-4) 0;
  }

  .input {
    padding: var(--size-3);
    border: 1px solid var(--gray-5);
    border-radius: var(--radius-2);
    font-size: var(--font-size-2);
  }

  .btn-primary, .btn-simulate {
    padding: var(--size-3) var(--size-5);
    background: var(--blue-6);
    color: white;
    border: none;
    border-radius: var(--radius-2);
    font-size: var(--font-size-2);
    font-weight: bold;
    cursor: pointer;
  }

  .btn-primary:hover, .btn-simulate:hover {
    background: var(--blue-7);
  }

  .simulation-result {
    margin-top: var(--size-4);
    padding: var(--size-4);
    background: var(--surface-2);
    border-radius: var(--radius-2);
  }

  .comparison {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: var(--size-4) 0;
  }

  .column {
    flex: 1;
    text-align: center;
  }

  .arrow {
    font-size: var(--font-size-6);
    color: var(--gray-7);
    padding: 0 var(--size-3);
  }

  .loss-alert {
    background: var(--red-1);
    padding: var(--size-4);
    border-radius: var(--radius-2);
    text-align: center;
    margin: var(--size-4) 0;
  }

  .loss-amount {
    font-size: var(--font-size-6);
    font-weight: bold;
    color: var(--red-9);
    margin-top: var(--size-2);
  }

  .recommendation {
    background: var(--blue-1);
    padding: var(--size-4);
    border-radius: var(--radius-2);
    margin-top: var(--size-4);
  }

  .recommendation pre {
    white-space: pre-wrap;
    font-family: var(--font-sans);
    line-height: 1.6;
  }
</style>
```

---

## 3. 📢 ESTRATEGIA DE VENTA BOOTSTRAP (Sin Ads)

### Canal #1: Comunidades de Freelancers/Consultores

**Target:**

- Grupos LinkedIn: "Consultores Independientes México" (10k)
- Facebook: "Freelancers México" (25k)
- Discord: "MX Freelancers" (3k)

**Post viral tipo:**

> "🚨 ALERTA RESICO 2026
>
> Si estás en RESICO y llevas $2.8M facturados, solo te quedan $700k para no pasarte.
>
> Si te pasas, tu ISR sube del 2.5% al 30%.
>
> Eso son $250k de pérdida en impuestos.
>
> Hice una herramienta que te avisa ANTES de que te pases.
>
> Primer mes gratis. DM si te interesa."

---

### Canal #2: Twitter/X con Contenido Educativo

**Serie de hilos:** "Por qué RESICO es una trampa si ganas bien"

1. "Ganar más ≠ Ganar más (la paradoja RESICO)"
2. "Cómo calcular tu tope RESICO sin Excel"
3. "Qué hacer si un cliente grande te ofrece $1M y ya llevas $3M"

**Engagement esperado:** 1000+ views, 50+ RTs, 20+ leads

---

### Canal #3: Webinars Gratuitos (LinkedIn Live)

**Título:** "RESICO 2026: Cómo NO pasarte del tope y evitar multas"

**Agenda (30 min):**

1. ¿Qué es RESICO y por qué es un "regalo envenenado"?
2. Demo en vivo: Monitor RESICO de FinanzasMX
3. Q&A

**Conversión:** 15-20% de asistentes a trial

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Prevención: Riesgo Fiscal 2026

**Problema:** Miles de consultores se pasarán del tope sin darse cuenta.

**Consecuencia:**

- Multa del SAT: $50,000-150,000 MXN
- ISR retroactivo: Diferencia entre 2.5% y 30% del total
- Estrés + pérdida de tiempo en aclaraciones

**Solución FinanzasMX:**

> "Te avisamos cuando llegues al 80%, 90%, y justo antes de pasarte. Nunca más sorpresas del SAT."

---

### Upsell: Plan BUSINESS ($499/mes)

**Target:** Consultores con múltiples fuentes de ingreso (consulting + cursos + asesorías)

**Features:**

- ✅ Monitor RESICO por fuente de ingreso
- ✅ Simulador de escenarios múltiples (5 proyectos simultáneos)
- ✅ Dashboard de rentabilidad por cliente
- ✅ Integración con plataformas (Stripe, PayPal)

---

## 5. ⚙️ IMPLEMENTACIÓN TÉCNICA

### Prioridad

🔴🔴 **CRÍTICA** (RESICO es el tema fiscal #1 de 2026 en México)

### Complejidad

⭐⭐⭐☆☆ (3/5) - Lógica de cálculo clara, schema simple

### Tiempo Estimado

**7-9 días** full-time

---

## 📊 MÉTRICAS DE ÉXITO

| KPI | Meta |
|:---|:-:|
| **% Usuarios que NO se pasan del tope** | > 95% |
| **Alertas enviadas a tiempo (80%)** | 100% |
| **Satisfacción (NPS)** | > 9/10 |

---

## 💰 MODELO DE NEGOCIO

| Plan | Precio |
|:---|:-:|
| **PRO** | $199/mes |
| **BUSINESS** | $499/mes |

**ROI:** Evitar multa de $50k-150k + ahorro de $250k en ISR = $300k-400k de valor.

---

**Próximo perfil:** 55 - Psicólogo/Nutriólogo
