# 🏗️ PERFIL 53: ARQUITECTO / INGENIERO CONTRATISTA - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME)
**Tanda:** 1 (Servicios Profesionales)
**Fecha:** 9 Diciembre 2025
**Base:** Expansión de Perfil 3 de `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL (Pain Point SAT)

### El Problema Específico

**NO es:** "Los proyectos son complicados" (genérico)

**SÍ es:**

> **"Gané una licitación para remodelar un hospital. Monto total: $2.5M MXN. Me dan un anticipo del 30% ($750k), luego pago por estimaciones (6 estimaciones del 10% c/u), y al final retienen el 5% ($125k) por vicios ocultos que me devuelven en 12 meses. Son las 2am y no sé cuánto dinero REALMENTE tengo, cuánto debo pagar a proveedores, y cuánto apartar para ISR. Mi Excel tiene 40 pestañas y no cuadra. Tengo $300k en el banco pero no sé si puedo gastarlos o si ya están comprometidos."**

---

### Desglose del Dolor

| Concepto | Monto | % Proyecto | Timing | Complejidad Fiscal |
|:---|:-:|:-:|:---|:-:|
| **Anticipo** | $750,000 | 30% | Día 1 | 🟡 Facturar + apartar ISR |
| **Estimación 1** | $250,000 | 10% | Mes 1 | 🔴 Facturar + retención 5% obra |
| **Estimación 2** | $250,000 | 10% | Mes 2 | 🔴 Idem |
| **Estimación 3-6** | $1,000,000 | 40% | Mes 3-6 | 🔴 Idem |
| **Retención vicios ocultos** | $125,000 | 5% | Mes 18 | 🔴 Facturado pero NO cobrado |
| **Saldo final** | $125,000 | 5% | Mes 6 | 🔴 Cierre proyecto |

**Problema adicional:** Gastos proveedores (cemento, varilla, mano de obra) se pagan **ANTES** de recibir la estimación.

**Resultado:** Flujo de efectivo descontrolado, no sabe si tiene rentabilidad real.

---

### Impacto Neurociencia

| Neurotransmisor | Estado Actual | Síntoma Conductual |
|:---|:-:|:---|
| **Cortisol** | ⬆️⬆️⬆️ Crítico | Ansiedad extrema ("¿Podré pagar la nómina?") |
| **Dopamina** | ⬇️ Muy bajo | No disfruta ganar licitaciones (estrés) |
| **Serotonina** | ⬇️ Bajo | Irritabilidad con cliente (cambios de alcance) |
| **Carga Cognitiva** | 🔴🔴 Colapso | 6 fuentes de ingreso + 20 proveedores |

**Consecuencia:** Muchos arquitectos/ingenieros terminan **descapitalizados** (ganan $2.5M en papel, pero quiebran por falta de liquidez).

---

## 2. 🎯 MÓDULO CRÍTICO (Killer Feature)

### Nombre del Módulo

**"Control de Obra: Anticipos, Estimaciones, Retenciones y Cashflow Proyectado"**

---

### ¿Qué Resuelve?

1. **Registro de proyecto con calendario de estimaciones**
2. **Tracking de anticipos, estimaciones, retenciones**
3. **Cashflow proyectado:** "En 2 meses recibirás $250k, pero debes pagar $180k de proveedores"
4. **Dashboard de rentabilidad real:** "De $2.5M facturados, tu utilidad neta es $320k (12.8%)"
5. **Alertas:** "⚠️ Estimación 3 vence en 5 días. Generar factura ahora."

---

### Especificación Técnica

#### A. Schema PostgreSQL

```typescript
// apps/backend/src/db/schema.ts (agregar)

export const constructionProjects = pgTable('construction_projects', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos del proyecto
  projectName: varchar('project_name', { length: 255 }).notNull(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientRfc: varchar('client_rfc', { length: 13 }),
  projectType: varchar('project_type', { length: 100 }).notNull(), // Remodelación, Obra nueva, etc.

  // Montos
  totalContract: decimal('total_contract', { precision: 12, scale: 2 }).notNull(), // Monto total contrato
  advancePercentage: decimal('advance_percentage', { precision: 5, scale: 2 }).default('30'), // % anticipo (típico 30%)
  retentionPercentage: decimal('retention_percentage', { precision: 5, scale: 2 }).default('5'), // % retención vicios ocultos

  // Fechas
  startDate: timestamp('start_date').notNull(),
  expectedEndDate: timestamp('expected_end_date').notNull(),
  actualEndDate: timestamp('actual_end_date'),

  // Status
  status: varchar('status', { length: 20 }).default('planning'), // planning | in_progress | completed | suspended

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projectEstimates = pgTable('project_estimates', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => constructionProjects.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos de la estimación
  estimateNumber: integer('estimate_number').notNull(), // 1, 2, 3...
  estimateType: varchar('estimate_type', { length: 20 }).notNull(), // advance | estimate | final | retention_release
  description: text('description'),

  // Montos
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  retentionAmount: decimal('retention_amount', { precision: 12, scale: 2 }).default('0'), // 5% típico
  netAmount: decimal('net_amount', { precision: 12, scale: 2 }).notNull(), // amount - retention

  // Fechas
  estimateDate: timestamp('estimate_date').notNull(),
  dueDate: timestamp('due_date').notNull(),
  paidDate: timestamp('paid_date'),

  // Facturación
  invoiced: boolean('invoiced').default(false),
  invoiceId: integer('invoice_id').references(() => invoices.id),

  // Status
  status: varchar('status', { length: 20 }).default('pending'), // pending | invoiced | paid | overdue

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});

export const projectExpenses = pgTable('project_expenses', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => constructionProjects.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos del gasto
  expenseType: varchar('expense_type', { length: 100 }).notNull(), // Material, Mano de obra, Subcontratista, Equipo
  supplierName: varchar('supplier_name', { length: 255 }),
  description: text('description').notNull(),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  expenseDate: timestamp('expense_date').notNull(),

  // Vinculación a estimación (opcional)
  relatedEstimateId: integer('related_estimate_id').references(() => projectEstimates.id),

  // Comprobante
  receiptUrl: varchar('receipt_url', { length: 500 }),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});

export const projectCashflow = pgTable('project_cashflow', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').references(() => constructionProjects.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Proyección
  projectedMonth: varchar('projected_month', { length: 7 }).notNull(), // '2026-01'
  expectedIncome: decimal('expected_income', { precision: 12, scale: 2 }).notNull(),
  expectedExpenses: decimal('expected_expenses', { precision: 12, scale: 2 }).notNull(),
  netCashflow: decimal('net_cashflow', { precision: 12, scale: 2 }).notNull(),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

#### B. Endpoint ElysiaJS: Cashflow Proyectado

```typescript
// apps/backend/src/routes/construction/projects.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { constructionProjects, projectEstimates, projectExpenses, projectCashflow } from '../../db/schema';
import { eq } from 'drizzle-orm';

export const constructionProjectsRouter = new Elysia({ prefix: '/construction/projects' })

  // POST /api/v1/construction/projects - Crear proyecto con calendario auto-generado
  .post('/', async ({ body, user }) => {
    const { projectName, clientName, totalContract, advancePercentage, numberOfEstimates, startDate } = body;

    // 1. Crear proyecto
    const [project] = await db.insert(constructionProjects).values({
      userId: user.id,
      projectName,
      clientName,
      totalContract,
      advancePercentage: advancePercentage || 30,
      retentionPercentage: 5,
      startDate: new Date(startDate),
      expectedEndDate: new Date(Date.now() + numberOfEstimates * 30 * 24 * 60 * 60 * 1000), // +N meses
      status: 'planning',
    }).returning();

    // 2. Generar calendario de estimaciones automático
    const totalAmount = Number(totalContract);
    const advanceAmount = totalAmount * (Number(advancePercentage) / 100);
    const retentionAmount = totalAmount * 0.05; // 5% retención
    const remainingAmount = totalAmount - advanceAmount - retentionAmount;
    const estimateAmount = remainingAmount / numberOfEstimates;

    const estimates = [];

    // Anticipo (día 1)
    estimates.push({
      projectId: project.id,
      userId: user.id,
      estimateNumber: 0,
      estimateType: 'advance',
      description: `Anticipo ${advancePercentage}%`,
      amount: advanceAmount,
      retentionAmount: 0,
      netAmount: advanceAmount,
      estimateDate: new Date(startDate),
      dueDate: new Date(startDate),
      status: 'pending',
    });

    // Estimaciones mensuales
    for (let i = 1; i <= numberOfEstimates; i++) {
      const estimateDate = new Date(new Date(startDate).getTime() + i * 30 * 24 * 60 * 60 * 1000);
      const retentionPerEstimate = estimateAmount * 0.05;

      estimates.push({
        projectId: project.id,
        userId: user.id,
        estimateNumber: i,
        estimateType: 'estimate',
        description: `Estimación ${i} de ${numberOfEstimates}`,
        amount: estimateAmount,
        retentionAmount: retentionPerEstimate,
        netAmount: estimateAmount - retentionPerEstimate,
        estimateDate,
        dueDate: new Date(estimateDate.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 días
        status: 'pending',
      });
    }

    // Retención (liberación en 12 meses)
    estimates.push({
      projectId: project.id,
      userId: user.id,
      estimateNumber: numberOfEstimates + 1,
      estimateType: 'retention_release',
      description: 'Liberación de retención por vicios ocultos',
      amount: retentionAmount,
      retentionAmount: 0,
      netAmount: retentionAmount,
      estimateDate: new Date(new Date(startDate).getTime() + (numberOfEstimates + 12) * 30 * 24 * 60 * 60 * 1000),
      dueDate: new Date(new Date(startDate).getTime() + (numberOfEstimates + 12) * 30 * 24 * 60 * 60 * 1000),
      status: 'pending',
    });

    await db.insert(projectEstimates).values(estimates);

    return {
      success: true,
      project,
      estimatesCount: estimates.length,
      message: `Proyecto creado con ${estimates.length} pagos programados`,
    };
  }, {
    body: t.Object({
      projectName: t.String(),
      clientName: t.String(),
      totalContract: t.Number(),
      advancePercentage: t.Optional(t.Number()),
      numberOfEstimates: t.Number(),
      startDate: t.String(),
    }),
  })

  // GET /api/v1/construction/projects/:id/cashflow
  .get('/:id/cashflow', async ({ params, user }) => {
    const projectId = parseInt(params.id);

    // 1. Obtener proyecto
    const project = await db.query.constructionProjects.findFirst({
      where: eq(constructionProjects.id, projectId),
    });

    if (!project || project.userId !== user.id) {
      throw new Error('Proyecto no encontrado');
    }

    // 2. Obtener estimaciones (ingresos proyectados)
    const estimates = await db.query.projectEstimates.findMany({
      where: eq(projectEstimates.projectId, projectId),
      orderBy: (estimates, { asc }) => [asc(estimates.estimateNumber)],
    });

    // 3. Obtener gastos (egresos)
    const expenses = await db.query.projectExpenses.findMany({
      where: eq(projectExpenses.projectId, projectId),
    });

    // 4. Calcular cashflow mensual
    const cashflowByMonth: Record<string, { income: number; expenses: number; net: number }> = {};

    estimates.forEach(estimate => {
      const month = estimate.estimateDate.toISOString().slice(0, 7); // '2026-01'
      if (!cashflowByMonth[month]) {
        cashflowByMonth[month] = { income: 0, expenses: 0, net: 0 };
      }
      cashflowByMonth[month].income += Number(estimate.netAmount);
    });

    expenses.forEach(expense => {
      const month = expense.expenseDate.toISOString().slice(0, 7);
      if (!cashflowByMonth[month]) {
        cashflowByMonth[month] = { income: 0, expenses: 0, net: 0 };
      }
      cashflowByMonth[month].expenses += Number(expense.amount);
    });

    Object.keys(cashflowByMonth).forEach(month => {
      cashflowByMonth[month].net = cashflowByMonth[month].income - cashflowByMonth[month].expenses;
    });

    // 5. Calcular totales
    const totalIncome = estimates.reduce((sum, est) => sum + Number(est.netAmount), 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const netProfit = totalIncome - totalExpenses;
    const profitMargin = (netProfit / totalIncome) * 100;

    return {
      project: {
        name: project.projectName,
        totalContract: Number(project.totalContract),
        status: project.status,
      },
      cashflowByMonth,
      totals: {
        totalIncome,
        totalExpenses,
        netProfit,
        profitMargin: profitMargin.toFixed(2) + '%',
      },
      estimates: estimates.map(e => ({
        number: e.estimateNumber,
        type: e.estimateType,
        amount: Number(e.amount),
        retention: Number(e.retentionAmount),
        net: Number(e.netAmount),
        dueDate: e.dueDate,
        status: e.status,
      })),
    };
  })

  // POST /api/v1/construction/projects/:id/estimates/:estimateId/invoice
  .post('/:id/estimates/:estimateId/invoice', async ({ params, user }) => {
    const estimateId = parseInt(params.estimateId);

    // 1. Obtener estimación
    const estimate = await db.query.projectEstimates.findFirst({
      where: eq(projectEstimates.id, estimateId),
    });

    if (!estimate || estimate.userId !== user.id) {
      throw new Error('Estimación no encontrada');
    }

    if (estimate.invoiced) {
      throw new Error('Esta estimación ya fue facturada');
    }

    // 2. Obtener proyecto
    const project = await db.query.constructionProjects.findFirst({
      where: eq(constructionProjects.id, estimate.projectId),
    });

    // 3. Generar factura CFDI
    const conceptos = [
      {
        claveProdServ: '71141600', // Servicios de construcción (SAT)
        cantidad: 1,
        claveUnidad: 'E48',
        descripcion: `${estimate.description} - ${project.projectName}`,
        valorUnitario: Number(estimate.amount),
        importe: Number(estimate.amount),
      },
    ];

    // Si hay retención, agregar como descuento
    if (Number(estimate.retentionAmount) > 0) {
      conceptos[0].descuento = Number(estimate.retentionAmount);
    }

    const invoiceData = {
      userId: user.id,
      receptorRfc: project.clientRfc || 'XAXX010101000',
      receptorNombre: project.clientName,
      conceptos,
      formaPago: '99', // Por definir (típico en estimaciones)
      metodoPago: 'PPD', // Pago en parcialidades (típico en obra)
    };

    const cfdi = await generateCFDI(invoiceData);

    // 4. Guardar factura
    const [invoice] = await db.insert(invoices).values({
      userId: user.id,
      cfdiUuid: cfdi.uuid,
      cfdiXml: cfdi.xml,
      cfdiPdf: cfdi.pdf,
      total: estimate.netAmount,
      status: 'active',
    }).returning();

    // 5. Actualizar estimación
    await db.update(projectEstimates)
      .set({
        invoiced: true,
        invoiceId: invoice.id,
        status: 'invoiced',
      })
      .where(eq(projectEstimates.id, estimateId));

    return {
      success: true,
      invoice: {
        id: invoice.id,
        uuid: cfdi.uuid,
        amount: Number(estimate.amount),
        retention: Number(estimate.retentionAmount),
        net: Number(estimate.netAmount),
      },
    };
  });
```

---

#### C. Componente Svelte: Dashboard de Cashflow

```svelte
<!-- apps/frontend/src/routes/construction/projects/[id]/cashflow/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { Chart } from 'chart.js/auto';

  let cashflowData = $state<any>(null);
  let loading = $state(true);
  let chartCanvas: HTMLCanvasElement;

  onMount(async () => {
    const response = await fetch(`/api/v1/construction/projects/${$page.params.id}/cashflow`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    cashflowData = await response.json();
    loading = false;

    // Renderizar gráfico de cashflow
    renderChart();
  });

  function renderChart() {
    const months = Object.keys(cashflowData.cashflowByMonth).sort();
    const incomeData = months.map(m => cashflowData.cashflowByMonth[m].income);
    const expensesData = months.map(m => cashflowData.cashflowByMonth[m].expenses);
    const netData = months.map(m => cashflowData.cashflowByMonth[m].net);

    new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: months.map(m => {
          const [year, month] = m.split('-');
          return `${month}/${year.slice(2)}`;
        }),
        datasets: [
          {
            label: 'Ingresos',
            data: incomeData,
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
          },
          {
            label: 'Gastos',
            data: expensesData,
            backgroundColor: 'rgba(239, 68, 68, 0.7)',
          },
          {
            label: 'Neto',
            data: netData,
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            type: 'line',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Cashflow Proyectado',
          },
        },
      },
    });
  }
</script>

{#if loading}
  <div class="loading">Cargando...</div>
{:else if cashflowData}
  <div class="cashflow-dashboard">
    <h1>💰 Cashflow: {cashflowData.project.name}</h1>

    <div class="summary-cards">
      <div class="card income">
        <h3>Ingresos Totales</h3>
        <p class="amount">${cashflowData.totals.totalIncome.toLocaleString('es-MX')}</p>
      </div>

      <div class="card expenses">
        <h3>Gastos Totales</h3>
        <p class="amount">${cashflowData.totals.totalExpenses.toLocaleString('es-MX')}</p>
      </div>

      <div class="card profit">
        <h3>Utilidad Neta</h3>
        <p class="amount">${cashflowData.totals.netProfit.toLocaleString('es-MX')}</p>
        <p class="margin">Margen: {cashflowData.totals.profitMargin}</p>
      </div>
    </div>

    <div class="chart-container">
      <canvas bind:this={chartCanvas}></canvas>
    </div>

    <div class="estimates-table">
      <h3>📋 Calendario de Estimaciones</h3>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Retención</th>
            <th>Neto</th>
            <th>Fecha Vencimiento</th>
            <th>Status</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {#each cashflowData.estimates as estimate}
            <tr class={estimate.status}>
              <td>{estimate.number}</td>
              <td>{estimate.type}</td>
              <td>${estimate.amount.toLocaleString('es-MX')}</td>
              <td>${estimate.retention.toLocaleString('es-MX')}</td>
              <td><strong>${estimate.net.toLocaleString('es-MX')}</strong></td>
              <td>{new Date(estimate.dueDate).toLocaleDateString('es-MX')}</td>
              <td>
                {#if estimate.status === 'pending'}
                  ⏳ Pendiente
                {:else if estimate.status === 'invoiced'}
                  📄 Facturado
                {:else if estimate.status === 'paid'}
                  ✅ Pagado
                {:else}
                  ⚠️ Vencido
                {/if}
              </td>
              <td>
                {#if estimate.status === 'pending'}
                  <a href="/construction/projects/{$page.params.id}/estimates/{estimate.id}/invoice" class="btn-invoice">
                    Facturar
                  </a>
                {/if}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
{/if}

<style>
  .cashflow-dashboard {
    max-width: var(--size-content-3);
    margin: 0 auto;
    padding: var(--size-6);
  }

  .summary-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--size-4);
    margin: var(--size-5) 0;
  }

  .card {
    padding: var(--size-5);
    border-radius: var(--radius-3);
    box-shadow: var(--shadow-3);
  }

  .card.income {
    background: linear-gradient(135deg, var(--green-1), var(--green-2));
    border-left: 4px solid var(--green-7);
  }

  .card.expenses {
    background: linear-gradient(135deg, var(--red-1), var(--red-2));
    border-left: 4px solid var(--red-7);
  }

  .card.profit {
    background: linear-gradient(135deg, var(--blue-1), var(--blue-2));
    border-left: 4px solid var(--blue-7);
  }

  .amount {
    font-size: var(--font-size-6);
    font-weight: bold;
    margin: var(--size-2) 0;
  }

  .margin {
    font-size: var(--font-size-1);
    color: var(--gray-7);
  }

  .chart-container {
    margin: var(--size-6) 0;
    background: var(--surface-1);
    padding: var(--size-5);
    border-radius: var(--radius-3);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: var(--size-3);
  }

  thead {
    background: var(--surface-2);
  }

  th, td {
    padding: var(--size-2);
    text-align: left;
    border-bottom: 1px solid var(--gray-4);
  }

  .btn-invoice {
    padding: var(--size-1) var(--size-3);
    background: var(--blue-6);
    color: white;
    border-radius: var(--radius-2);
    text-decoration: none;
    font-size: var(--font-size-0);
  }

  .btn-invoice:hover {
    background: var(--blue-7);
  }
</style>
```

---

## 3. 📢 ESTRATEGIA DE VENTA BOOTSTRAP (Sin Ads)

### Canal #1: Cámaras de Construcción (CMIC)

**Target:** Cámara Mexicana de la Industria de la Construcción

**Estrategia:**

1. Asistir a **Expo CMIC** (anual, CDMX)
   - Stand: $10,000-20,000 MXN
   - Demo en vivo: "Control de cashflow en obra pública"

2. Ponencia gratuita en delegaciones estatales

---

### Canal #2: Grupos Facebook de Arquitectos/Ingenieros

**Grupos objetivo:**

- "Arquitectos Freelance México" (8k miembros)
- "Ingenieros Civiles y Constructores" (12k miembros)

**Publicación tipo:**

> "🚨 ¿Alguna vez has ganado una licitación de $2M y terminaste descapitalizado?
>
> El problema no es el proyecto, es el CONTROL DE CASHFLOW.
>
> Hice una herramienta que proyecta tu flujo de efectivo mes a mes (anticipos, estimaciones, retenciones).
>
> Primer mes gratis. DM si te interesa."

---

### Canal #3: LinkedIn + Contenido Educativo

**Serie de posts:** "Los 5 Errores Fiscales de los Arquitectos Mexicanos"

1. No apartar el 30% del anticipo para impuestos
2. Confundir facturación con ingreso real (retenciones)
3. No trackear la liberación de retenciones (12 meses)
4. Gastos de obra sin comprobante fiscal
5. No calcular utilidad neta real

**Cada post** termina con: "Si quieres automatizar esto, DM."

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Prevención: Riesgo Fiscal 2026

**Problema:** Arquitectos que facturan la retención del 5% pero nunca la cobran (pasa a pérdida).

**Consecuencia:**

- SAT ve: Facturó $2.5M
- Realidad: Cobró $2.375M ($125k retenidos)
- Debe pagar ISR sobre $2.5M → Sobrepago de $12,500

**Solución FinanzasMX:**

> "Alerta automática: Retención de $125k será liberada en diciembre 2027. Agendar seguimiento."

---

### Upsell: Plan BUSINESS ($499/mes)

**Target:** Constructoras con 3+ obras simultáneas

**Features:**

- ✅ Multi-proyecto (dashboard consolidado)
- ✅ Control de nómina por obra
- ✅ Reportes de productividad (m² construidos vs costo)
- ✅ Integración con proveedores (Cemex, Holcim)

---

## 5. ⚙️ IMPLEMENTACIÓN TÉCNICA

### Prioridad

🔴 **ALTA** (Segmento con alto ticket, buen willingness to pay)

### Complejidad

⭐⭐⭐⭐☆ (4/5) - Schema complejo, cashflow proyectado requiere lógica avanzada

### Tiempo Estimado

**10-12 días** full-time

---

## 📊 MÉTRICAS DE ÉXITO

| KPI | Meta |
|:---|:-:|
| **Precisión cashflow proyectado** | ±5% real |
| **% Usuarios que facturan a tiempo** | > 90% |
| **Satisfacción (NPS)** | > 8/10 |

---

## 💰 MODELO DE NEGOCIO

| Plan | Precio | Target |
|:---|:-:|:---|
| **PRO** | $349/mes | 1-2 obras simultáneas |
| **BUSINESS** | $599/mes | 3-10 obras |
| **ENTERPRISE** | Custom | Constructoras 10+ obras |

**ROI:** Ahorro de $15,000-25,000/año en contador + evitar descapitalización.

---

**Próximo perfil:** 54 - Consultor de Negocios (Monitor RESICO)
