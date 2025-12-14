# ⚖️ PERFIL 52: ABOGADO / NOTARIO - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME)
**Tanda:** 1 (Servicios Profesionales)
**Fecha:** 9 Diciembre 2025
**Base:** Expansión de Perfil 2 de `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL (Pain Point SAT)

### El Problema Específico

**NO es:** "Las facturas son tediosas" (genérico)

**SÍ es:**

> **"Estoy defendiendo un caso de divorcio. El cliente me paga $80,000 por mis honorarios, pero yo tuve que adelantar $12,000 de gastos de terceros (perito, notificador, copias certificadas). Mi contador me dice que debo facturar los $92,000 completos, entonces pago ISR sobre $12,000 que NO SON MÍOS. Pierdo $3,600 en impuestos por dinero que solo pasó por mis manos. Y el SAT no entiende de 'gastos por cuenta del cliente'."**

---

### Desglose del Dolor

| Tipo de Ingreso | Monto | Retención ISR | Es Ingreso Real |
|:---|:-:|:-:|:-:|
| **Honorarios propios** | $80,000 | 10% ($8,000) | ✅ SÍ |
| **Gastos por cuenta del cliente** | $12,000 | 10% ($1,200) | ❌ NO (reembolso) |
| **Total facturado** | $92,000 | 10% ($9,200) | ⚠️ Mixto |

**Resultado:**

- Paga $9,200 de ISR
- **Debería pagar:** $8,000 (solo sobre sus honorarios)
- **Sobrepago:** $1,200 (15% más de lo justo)

**Multiplicado por 10 casos al año:** Pierde $12,000 en impuestos injustos.

---

### Impacto Neurociencia

| Neurotransmisor | Estado Actual | Síntoma Conductual |
|:---|:-:|:---|
| **Cortisol** | ⬆️⬆️ Muy elevado | Frustración constante ("Me roban") |
| **Dopamina** | ⬇️ Muy bajo | Sensación de injusticia ("Para qué trabajo") |
| **Serotonina** | ⬇️ Bajo | Irritabilidad con clientes (cobrar anticipos) |
| **Carga Cognitiva** | 🔴 Sobrecarga | "¿Facturo todo o por separado?" |

**Consecuencia:** Muchos abogados terminan **no registrando los gastos por terceros** (evasión involuntaria) o **cobrando de más al cliente** para cubrir el sobrepago de ISR.

---

## 2. 🎯 MÓDULO CRÍTICO (Killer Feature)

### Nombre del Módulo

**"Separador Inteligente: Honorarios vs Gastos por Cuenta de Terceros"**

---

### ¿Qué Resuelve?

1. **Registro separado:** Honorarios propios vs gastos que reembolsarás
2. **Facturación correcta:** Genera 2 conceptos en el CFDI con claves SAT diferentes
3. **Cálculo justo de ISR:** Solo sobre honorarios, no sobre reembolsos
4. **Dashboard visual:** "De $92,000 facturados, solo $80,000 son tuyos"

---

### Especificación Técnica

#### A. Schema PostgreSQL

```typescript
// apps/backend/src/db/schema.ts (agregar)

export const legalCases = pgTable('legal_cases', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos del caso
  caseName: varchar('case_name', { length: 255 }).notNull(), // "Divorcio Pérez vs Pérez"
  caseType: varchar('case_type', { length: 100 }).notNull(), // Divorcio, Mercantil, Penal, etc.
  caseNumber: varchar('case_number', { length: 100 }), // Expediente judicial
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientRfc: varchar('client_rfc', { length: 13 }),

  // Honorarios
  legalFees: decimal('legal_fees', { precision: 10, scale: 2 }).notNull(), // Honorarios del abogado
  thirdPartyExpenses: decimal('third_party_expenses', { precision: 10, scale: 2 }).default('0'), // Gastos terceros
  totalBilled: decimal('total_billed', { precision: 10, scale: 2 }).notNull(), // legalFees + thirdPartyExpenses

  // Status
  status: varchar('status', { length: 20 }).default('active'), // active | closed | suspended
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),

  // Facturación
  invoiced: boolean('invoiced').default(false),
  invoiceId: integer('invoice_id').references(() => invoices.id),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const caseExpenses = pgTable('case_expenses', {
  id: serial('id').primaryKey(),
  caseId: integer('case_id').references(() => legalCases.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),

  // Datos del gasto
  expenseType: varchar('expense_type', { length: 100 }).notNull(), // Perito, Notificador, Copias, etc.
  description: text('description').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  expenseDate: timestamp('expense_date').notNull(),

  // Clasificación fiscal
  isThirdParty: boolean('is_third_party').default(true), // true = por cuenta del cliente, false = gasto deducible propio

  // Comprobante
  receiptUrl: varchar('receipt_url', { length: 500 }), // URL del ticket/factura escaneado

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});

export const legalInvoices = pgTable('legal_invoices', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  caseId: integer('case_id').references(() => legalCases.id).notNull(),

  // Desglose fiscal
  legalFeesAmount: decimal('legal_fees_amount', { precision: 10, scale: 2 }).notNull(),
  thirdPartyAmount: decimal('third_party_amount', { precision: 10, scale: 2 }).default('0'),

  // ISR calculado
  isrOnFees: decimal('isr_on_fees', { precision: 10, scale: 2 }).notNull(), // 10% solo sobre honorarios
  isrOnThirdParty: decimal('isr_on_third_party', { precision: 10, scale: 2 }).default('0'), // 0% (no es ingreso)

  // Factura SAT
  cfdiUuid: varchar('cfdi_uuid', { length: 36 }),
  cfdiXml: text('cfdi_xml'),
  cfdiPdf: text('cfdi_pdf'),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

#### B. Endpoint ElysiaJS: Facturación Separada

```typescript
// apps/backend/src/routes/legal/cases.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { legalCases, caseExpenses, legalInvoices } from '../../db/schema';
import { eq, sum } from 'drizzle-orm';
import { generateCFDI } from '../../services/sat/cfdi-generator';

export const legalCasesRouter = new Elysia({ prefix: '/legal/cases' })

  // POST /api/v1/legal/cases/:id/invoice
  .post('/:id/invoice', async ({ params, user }) => {
    const caseId = parseInt(params.id);

    // 1. Obtener caso
    const legalCase = await db.query.legalCases.findFirst({
      where: eq(legalCases.id, caseId),
    });

    if (!legalCase || legalCase.userId !== user.id) {
      throw new Error('Caso no encontrado');
    }

    if (legalCase.invoiced) {
      throw new Error('Este caso ya fue facturado');
    }

    // 2. Obtener gastos por terceros
    const thirdPartyExpenses = await db.query.caseExpenses.findMany({
      where: (expenses, { and, eq }) =>
        and(eq(expenses.caseId, caseId), eq(expenses.isThirdParty, true)),
    });

    const totalThirdParty = thirdPartyExpenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );

    // 3. Calcular ISR solo sobre honorarios
    const legalFeesAmount = Number(legalCase.legalFees);
    const isrOnFees = legalFeesAmount * 0.10; // 10% ISR solo sobre honorarios
    const isrOnThirdParty = 0; // 0% sobre gastos terceros (no es ingreso)

    // 4. Generar CFDI con 2 conceptos separados
    const conceptos = [
      // Concepto 1: Honorarios del abogado
      {
        claveProdServ: '85102200', // Servicios legales (SAT)
        cantidad: 1,
        claveUnidad: 'E48', // Servicio
        descripcion: `Honorarios por servicios legales - ${legalCase.caseName}`,
        valorUnitario: legalFeesAmount,
        importe: legalFeesAmount,
      },
    ];

    // Concepto 2: Gastos por cuenta del cliente (si existen)
    if (totalThirdParty > 0) {
      conceptos.push({
        claveProdServ: '78111800', // Servicios de reembolso (SAT)
        cantidad: 1,
        claveUnidad: 'E48',
        descripcion: `Gastos por cuenta del cliente - ${legalCase.caseName} (NO es ingreso del prestador)`,
        valorUnitario: totalThirdParty,
        importe: totalThirdParty,
      });
    }

    const invoiceData = {
      userId: user.id,
      receptorRfc: legalCase.clientRfc || 'XAXX010101000',
      receptorNombre: legalCase.clientName,
      conceptos,
      formaPago: '03', // Transferencia
      metodoPago: 'PUE', // Pago en una sola exhibición
    };

    const cfdi = await generateCFDI(invoiceData);

    // 5. Guardar factura legal con desglose
    const [invoice] = await db.insert(legalInvoices).values({
      userId: user.id,
      caseId,
      legalFeesAmount,
      thirdPartyAmount: totalThirdParty,
      isrOnFees,
      isrOnThirdParty,
      cfdiUuid: cfdi.uuid,
      cfdiXml: cfdi.xml,
      cfdiPdf: cfdi.pdf,
    }).returning();

    // 6. Marcar caso como facturado
    await db.update(legalCases)
      .set({
        invoiced: true,
        invoiceId: invoice.id,
        totalBilled: legalFeesAmount + totalThirdParty,
        thirdPartyExpenses: totalThirdParty,
      })
      .where(eq(legalCases.id, caseId));

    // 7. Registrar reserva ISR (solo sobre honorarios)
    await db.insert(isrReserves).values({
      userId: user.id,
      sourceType: 'legal_case',
      sourceId: caseId,
      amount: legalFeesAmount,
      isrReserve: isrOnFees,
      status: 'reserved',
    });

    return {
      success: true,
      invoice: {
        id: invoice.id,
        uuid: cfdi.uuid,
        legalFees: legalFeesAmount,
        thirdPartyExpenses: totalThirdParty,
        totalBilled: legalFeesAmount + totalThirdParty,
        isrOnFees,
        isrOnThirdParty,
        savings: `Ahorraste $${(totalThirdParty * 0.10).toFixed(2)} MXN en ISR al separar correctamente`,
      },
    };
  })

  // GET /api/v1/legal/cases/:id/expenses-summary
  .get('/:id/expenses-summary', async ({ params, user }) => {
    const caseId = parseInt(params.id);

    const expenses = await db.query.caseExpenses.findMany({
      where: eq(caseExpenses.caseId, caseId),
    });

    const thirdPartyTotal = expenses
      .filter(e => e.isThirdParty)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    const ownExpensesTotal = expenses
      .filter(e => !e.isThirdParty)
      .reduce((sum, e) => sum + Number(e.amount), 0);

    return {
      thirdPartyExpenses: thirdPartyTotal,
      ownExpenses: ownExpensesTotal,
      totalExpenses: thirdPartyTotal + ownExpensesTotal,
      breakdown: expenses.map(e => ({
        type: e.expenseType,
        amount: Number(e.amount),
        isThirdParty: e.isThirdParty,
        description: e.description,
      })),
    };
  });
```

---

#### C. Componente Svelte: Desglose Visual

```svelte
<!-- apps/frontend/src/routes/legal/cases/[id]/invoice/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let caseData = $state<any>(null);
  let expensesSummary = $state<any>(null);
  let loading = $state(true);
  let invoicing = $state(false);
  let invoiceResult = $state<any>(null);

  onMount(async () => {
    // Cargar datos del caso
    const [caseRes, expensesRes] = await Promise.all([
      fetch(`/api/v1/legal/cases/${$page.params.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      }),
      fetch(`/api/v1/legal/cases/${$page.params.id}/expenses-summary`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      }),
    ]);

    caseData = await caseRes.json();
    expensesSummary = await expensesRes.json();
    loading = false;
  });

  async function generateInvoice() {
    invoicing = true;

    try {
      const response = await fetch(`/api/v1/legal/cases/${$page.params.id}/invoice`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      });

      const data = await response.json();

      if (data.success) {
        invoiceResult = data.invoice;
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    } finally {
      invoicing = false;
    }
  }
</script>

{#if loading}
  <div class="loading">Cargando...</div>
{:else if invoiceResult}
  <div class="success">
    <h1>✅ Factura Generada</h1>

    <div class="invoice-summary">
      <h3>Desglose Fiscal Correcto</h3>

      <div class="breakdown">
        <div class="item">
          <span class="label">Honorarios Legales:</span>
          <span class="amount">${invoiceResult.legalFees.toLocaleString('es-MX')}</span>
          <span class="tax">ISR: ${invoiceResult.isrOnFees.toLocaleString('es-MX')} (10%)</span>
        </div>

        <div class="item third-party">
          <span class="label">Gastos por Cuenta del Cliente:</span>
          <span class="amount">${invoiceResult.thirdPartyExpenses.toLocaleString('es-MX')}</span>
          <span class="tax">ISR: $0.00 (0% - No es ingreso)</span>
        </div>

        <div class="total">
          <span class="label">Total Facturado:</span>
          <span class="amount">${invoiceResult.totalBilled.toLocaleString('es-MX')}</span>
        </div>
      </div>

      <div class="savings-highlight">
        🎉 {invoiceResult.savings}
      </div>

      <p class="uuid">UUID: {invoiceResult.uuid}</p>
    </div>
  </div>
{:else}
  <div class="pre-invoice">
    <h1>⚖️ Facturar Caso: {caseData.caseName}</h1>

    <div class="visual-breakdown">
      <h3>Desglose de Honorarios y Gastos</h3>

      <div class="chart">
        <div class="bar">
          <div
            class="bar-fill legal-fees"
            style="width: {(caseData.legalFees / caseData.totalBilled) * 100}%"
          >
            <span class="bar-label">
              Honorarios: ${Number(caseData.legalFees).toLocaleString('es-MX')}
            </span>
          </div>

          <div
            class="bar-fill third-party"
            style="width: {(expensesSummary.thirdPartyExpenses / caseData.totalBilled) * 100}%"
          >
            <span class="bar-label">
              Gastos Terceros: ${expensesSummary.thirdPartyExpenses.toLocaleString('es-MX')}
            </span>
          </div>
        </div>
      </div>

      <div class="tax-calculation">
        <h4>Cálculo de ISR</h4>

        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Monto</th>
              <th>ISR (10%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Honorarios Legales</td>
              <td>${Number(caseData.legalFees).toLocaleString('es-MX')}</td>
              <td class="tax-amount">${(Number(caseData.legalFees) * 0.10).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Gastos por Terceros</td>
              <td>${expensesSummary.thirdPartyExpenses.toLocaleString('es-MX')}</td>
              <td class="no-tax">$0.00 (No es ingreso)</td>
            </tr>
            <tr class="total-row">
              <td><strong>Total</strong></td>
              <td><strong>${caseData.totalBilled.toLocaleString('es-MX')}</strong></td>
              <td class="tax-amount"><strong>${(Number(caseData.legalFees) * 0.10).toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="comparison">
          <div class="wrong-way">
            <h5>❌ Forma Incorrecta (tradicional)</h5>
            <p>ISR sobre todo: ${(caseData.totalBilled * 0.10).toFixed(2)}</p>
          </div>

          <div class="right-way">
            <h5>✅ Forma Correcta (FinanzasMX)</h5>
            <p>ISR solo honorarios: ${(Number(caseData.legalFees) * 0.10).toFixed(2)}</p>
          </div>

          <div class="savings">
            <h5>💰 Ahorras:</h5>
            <p>${((caseData.totalBilled - Number(caseData.legalFees)) * 0.10).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>

    <button
      onclick={generateInvoice}
      disabled={invoicing}
      class="btn-generate"
    >
      {invoicing ? 'Generando factura...' : '📄 Generar Factura (Desglose Correcto)'}
    </button>
  </div>
{/if}

<style>
  .visual-breakdown {
    background: var(--surface-1);
    padding: var(--size-5);
    border-radius: var(--radius-3);
    margin: var(--size-4) 0;
  }

  .chart {
    margin: var(--size-4) 0;
  }

  .bar {
    display: flex;
    width: 100%;
    height: 60px;
    border-radius: var(--radius-2);
    overflow: hidden;
    box-shadow: var(--shadow-2);
  }

  .bar-fill {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--size-2);
    color: white;
    font-weight: bold;
    font-size: var(--font-size-0);
  }

  .legal-fees {
    background: linear-gradient(135deg, var(--blue-6), var(--blue-7));
  }

  .third-party {
    background: linear-gradient(135deg, var(--gray-5), var(--gray-6));
  }

  .tax-calculation {
    margin-top: var(--size-5);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: var(--size-3) 0;
  }

  thead {
    background: var(--surface-2);
  }

  th, td {
    padding: var(--size-2);
    text-align: left;
    border-bottom: 1px solid var(--gray-4);
  }

  .tax-amount {
    color: var(--blue-7);
    font-weight: bold;
  }

  .no-tax {
    color: var(--green-7);
    font-weight: bold;
  }

  .total-row {
    background: var(--surface-2);
  }

  .comparison {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--size-3);
    margin-top: var(--size-4);
  }

  .wrong-way, .right-way, .savings {
    padding: var(--size-3);
    border-radius: var(--radius-2);
    text-align: center;
  }

  .wrong-way {
    background: var(--red-1);
    border: 2px solid var(--red-5);
  }

  .right-way {
    background: var(--green-1);
    border: 2px solid var(--green-5);
  }

  .savings {
    background: var(--yellow-1);
    border: 2px solid var(--yellow-5);
  }

  .btn-generate {
    width: 100%;
    padding: var(--size-4);
    background: var(--blue-6);
    color: white;
    border: none;
    border-radius: var(--radius-2);
    font-size: var(--font-size-3);
    font-weight: bold;
    cursor: pointer;
    margin-top: var(--size-4);
  }

  .btn-generate:hover {
    background: var(--blue-7);
  }

  .btn-generate:disabled {
    background: var(--gray-5);
    cursor: not-allowed;
  }

  .savings-highlight {
    background: var(--green-1);
    padding: var(--size-3);
    border-radius: var(--radius-2);
    text-align: center;
    font-size: var(--font-size-2);
    color: var(--green-9);
    font-weight: bold;
    margin: var(--size-4) 0;
  }
</style>
```

---

## 3. 📢 ESTRATEGIA DE VENTA BOOTSTRAP (Sin Ads)

### Canal #1: Colegios de Abogados (Autoridad)

**Target:**

- Barra de Abogados del Estado de México
- Colegio de Abogados CDMX
- Asociación Nacional de Abogados de Empresa (ANADE)

**Estrategia:**

1. Ofrecer **ponencia gratuita** de 45 minutos:
   - Título: "Cómo Dejar de Pagar ISR sobre Gastos que No Son Tuyos"
   - Demo en vivo con caso real

2. **Certificado de asistencia** (CPD points para abogados)

3. **Código de descuento exclusivo** para miembros: `BARRA2026` (20% off primer año)

---

### Canal #2: Foros Jurídicos en LinkedIn

**Grupos objetivo:**

- "Abogados Mexicanos" (12k miembros)
- "Derecho y Tecnología México" (8k miembros)
- "Abogados Emprendedores" (5k miembros)

**Contenido semanal:**

1. **Post educativo:**
   > "🚨 ¿Sabías que puedes dejar de pagar ISR sobre gastos de terceros?
   >
   > Ejemplo: Caso de divorcio con $12,000 de gastos periciales.
   >
   > ❌ Forma incorrecta: Pagas ISR sobre los $12,000 = $1,200 perdidos
   > ✅ Forma correcta: ISR $0 (no es tu ingreso)
   >
   > ¿Quieres aprender a facturar correctamente? DM."

2. **Hashtags:** #AbogadosMX #TechLegal #FiscalParaAbogados

---

### Canal #3: WhatsApp de Pasantes de Derecho

**Target:** Pasantes de últimos semestres (futuros abogados independientes)

**Mensaje:**

> "Hola colega,
>
> Vi que estás por terminar la carrera. Cuando empieces tu despacho, vas a tener un problema que nadie te enseñó en la universidad: **cómo facturar correctamente los gastos por cuenta del cliente**.
>
> Hice una herramienta que lo automatiza (y evita que pagues ISR de más).
>
> Te regalo 6 meses gratis para que arranques bien. ¿Te interesa?"

**Conversión esperada:** 20-25% (target early career)

---

### Canal #4: Eventos de Actualización Fiscal

**Objetivo:** Asistir a congresos fiscales donde van abogados

**Ejemplos:**

- Congreso Nacional de Derecho Fiscal (octubre)
- Jornadas de Actualización Tributaria UNAM (semestral)

**Stand / Booth:**

- Costo: $5,000-15,000 MXN
- ROI esperado: 50-80 leads calificados
- Conversión: 15-20% → 10-15 clientes nuevos

---

### Landing Page Específica

**URL:** `finanzasmx.com/abogados`

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ⚖️ FinanzasMX para Abogados y Notarios                               │
│                                                                         │
│   "Deja de pagar ISR sobre dinero que no es tuyo"                      │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────┐        │
│   │ 📊 CALCULADORA INTERACTIVA:                               │        │
│   │                                                            │        │
│   │ Honorarios: [$80,000] MXN                                  │        │
│   │ Gastos terceros: [$12,000] MXN                             │        │
│   │                                                            │        │
│   │ ❌ Forma incorrecta: Pagas $9,200 ISR                     │        │
│   │ ✅ Forma correcta: Pagas $8,000 ISR                        │        │
│   │                                                            │        │
│   │ 💰 AHORRAS: $1,200 por caso                               │        │
│   └──────────────────────────────────────────────────────────┘        │
│                                                                         │
│   ✅ Facturación separada: Honorarios vs Gastos terceros              │
│   ✅ Cálculo automático de ISR (solo sobre lo que ES tuyo)            │
│   ✅ Dashboard por caso (rentabilidad real)                            │
│   ✅ Compatible con todos los tipos de juicios                         │
│                                                                         │
│   💰 Precio: $249/mes (vs $8,000/mes contador especializado)          │
│                                                                         │
│   [🎁 PROBAR GRATIS 30 DÍAS]    [📆 DEMO EN VIVO]                     │
│                                                                         │
│   🎓 Recomendado por 80+ abogados fiscalistas                          │
│   ⭐⭐⭐⭐⭐ 4.9/5 en testimoniales                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Prevención: Riesgo Fiscal 2026

**Problema:** Abogados que facturan TODO como "honorarios" sin distinguir gastos por terceros.

**Consecuencia SAT 2026:**

1. **Auditoría cruzada:** SAT compara:
   - Facturas emitidas (honorarios altos)
   - Deducciones (gastos periciales sin comprobante correcto)
   - **Inconsistencia → Carta invitación**

2. **Pérdida de deducciones:**
   - Si no tienes comprobante de los gastos por terceros, no puedes deducirlos
   - Terminas pagando ISR sobre dinero que gastaste

---

### Proyección: Venta de Plan BUSINESS ($499/mes)

**Target:** Despachos con 3+ abogados

**Features exclusivas:**

- ✅ Multi-usuario (cada abogado tiene su panel)
- ✅ Timesheet automático (rastreo de horas por caso)
- ✅ Reportes de rentabilidad por caso:
  - "Caso Pérez: Ganaste $80k, gastaste 40 hrs → $2,000/hr"
- ✅ Integración con firma electrónica (e.firma SAT)
- ✅ Dashboard gerencial (casos más rentables)

---

### Upsell: Plan ENTERPRISE (Custom)

**Target:** Notarías, despachos corporativos 10+ abogados

**Features:**

- ✅ API para integrar con software de gestión de despachos (Clio, PracticePanther)
- ✅ Facturación masiva (batch de 50+ casos)
- ✅ Reportes de cumplimiento fiscal (auditoría interna)
- ✅ Soporte prioritario (WhatsApp directo con equipo técnico)

---

## 5. ⚙️ IMPLEMENTACIÓN TÉCNICA

### Prioridad

🔴 **MUY ALTA** (Pain point crítico, alto willingness to pay)

---

### Complejidad

⭐⭐⭐☆☆ (3/5 estrellas)

**Razones:**

- Schema relativamente simple (casos + gastos)
- Lógica de separación fiscal clara
- Facturación CFDI ya implementada (Bloque B)

**Desafíos:**

- Validación de claves SAT para "gastos por terceros" (clave 78111800)
- UX de desglose visual (debe ser MUY claro)

---

### Tiempo Estimado

**6-8 días** de desarrollo full-time

**Desglose:**

| Tarea | Días |
|:---|:-:|
| Schema PostgreSQL (casos + gastos) | 1 |
| Endpoints CRUD para casos y gastos | 2 |
| Lógica de facturación separada | 2 |
| Componente Svelte (desglose visual) | 2 |
| Testing end-to-end | 1 |

---

### Dependencias Técnicas

| Dependencia | Estado |
|:---|:-:|
| Facturación CFDI 4.0 | ✅ Ya existe |
| PostgreSQL | ✅ Ya existe |
| Svelte 5 | ✅ Ya existe |
| Apartado ISR (reutilizar de Perfil 51) | ✅ Código adaptable |

---

## 📊 MÉTRICAS DE ÉXITO

| KPI | Meta |
|:---|:-:|
| **Ahorro promedio ISR por caso** | > $1,000 MXN |
| **% Abogados que usan separación** | > 85% |
| **Satisfacción (NPS)** | > 9/10 |
| **Churn** | < 3% mensual |

---

## 💰 MODELO DE NEGOCIO

| Plan | Precio | Target |
|:---|:-:|:---|
| **PRO** | $249/mes | Abogado independiente |
| **BUSINESS** | $499/mes | Despacho 3-10 abogados |
| **ENTERPRISE** | Custom | Notarías, corporativos 10+ |

---

### ROI para el Abogado

**Sin FinanzasMX:**

- Contador especializado: $8,000-12,000/mes
- Sobrepago ISR: $1,200 × 10 casos/año = $12,000/año
- **Total costo:** $108,000/año

**Con FinanzasMX:**

- FinanzasMX PRO: $2,988/año
- Ahorro ISR: $12,000/año
- **Ahorro neto:** $105,012/año (**97% reducción**)

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] Schema `legal_cases` y `case_expenses` creado
- [ ] Endpoint `/legal/cases/:id/invoice` funcionando
- [ ] Componente Svelte con desglose visual claro
- [ ] Calculadora interactiva en landing page
- [ ] 5 testimonios de abogados beta testers
- [ ] Video demo de 60 segundos
- [ ] Alianza con 1 colegio de abogados (mínimo)

---

**🎉 Resultado:** Abogados facturan correctamente, ahorran miles en ISR injusto, y tienen visibilidad real de rentabilidad por caso.

**Próximo perfil:** 53 - Arquitecto/Ingeniero Freelancer
