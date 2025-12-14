# 💻 PERFIL 57: PROGRAMADOR / DISEÑADOR FREELANCE RESICO - Análisis Cliente PyME

**Bloque:** G | **Tanda:** 1 | **Fecha:** 9 Dic 2025
**Base:** Expansión Perfil 25 `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL

> **"Programo para clientes de USA y Europa. Me pagan en USD/EUR por Wise/PayPal. Facturé $2.1M MXN equivalente en 2025 (estoy en RESICO OK). Pero en 2026 el dólar puede subir a $20 MXN. Si me pagan los mismos $100k USD que el año pasado, ahora son $2M MXN vs $1.8M MXN en 2025. ¿Me paso del tope RESICO por la INFLACIÓN DEL DÓLAR y no por crecer realmente? ¿Eso es justo?"**

**Problema doble:**

1. **Conversión USD→MXN fluctuante** (no controlas el tipo de cambio)
2. **Monitor RESICO que NO considera divisa** (solo ve MXN totales)

---

## 2. 🎯 MÓDULO CRÍTICO

**"Monitor RESICO Multi-Divisa con Proyección de Tipo de Cambio"**

### ¿Qué Resuelve?

1. **Tracking por divisa:** "Llevas $80k USD facturados ($1.6M MXN al tipo de cambio promedio)"
2. **Simulador:** "Si el dólar sube a $21 MXN, tus $80k USD = $1.68M → aún OK"
3. **Alerta predictiva:** "Con tipo de cambio actual, solo puedes facturar $45k USD más este año"
4. **Dashboard dual:** MXN vs USD real

---

### Schema PostgreSQL

```typescript
export const foreignInvoices = pgTable('foreign_invoices', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  invoiceId: integer('invoice_id').references(() => invoices.id),

  // Divisa original
  currency: varchar('currency', { length: 3 }).notNull(), // USD, EUR, GBP
  amountForeign: decimal('amount_foreign', { precision: 12, scale: 2 }).notNull(),

  // Conversión
  exchangeRate: decimal('exchange_rate', { precision: 10, scale: 4 }).notNull(), // Tipo de cambio del día
  amountMxn: decimal('amount_mxn', { precision: 12, scale: 2 }).notNull(),

  // Fuente tipo de cambio
  exchangeRateSource: varchar('exchange_rate_source', { length: 50 }).default('banxico'), // banxico | dof | manual

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});

export const exchangeRateHistory = pgTable('exchange_rate_history', {
  id: serial('id').primaryKey(),
  currency: varchar('currency', { length: 3 }).notNull(),
  rate: decimal('rate', { precision: 10, scale: 4 }).notNull(),
  date: timestamp('date').notNull(),
  source: varchar('source', { length: 50 }).default('banxico'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### Endpoint ElysiaJS: Monitor RESICO Multi-Divisa

```typescript
// GET /api/v1/resico/monitor-multidivisa
.get('/monitor-multidivisa', async ({ user }) => {
  const currentYear = new Date().getFullYear();

  // Obtener facturas con divisa extranjera
  const foreignInvoicesThisYear = await db.query.foreignInvoices.findMany({
    where: (invoices, { and, eq, gte, lte }) =>
      and(
        eq(invoices.userId, user.id),
        gte(invoices.createdAt, new Date(`${currentYear}-01-01`)),
        lte(invoices.createdAt, new Date(`${currentYear}-12-31`))
      ),
  });

  // Agrupar por divisa
  const byDivisa = {};
  let totalMxn = 0;

  foreignInvoicesThisYear.forEach(inv => {
    const currency = inv.currency;
    if (!byDivisa[currency]) {
      byDivisa[currency] = {
        currency,
        totalForeign: 0,
        totalMxn: 0,
        avgExchangeRate: 0,
      };
    }
    byDivisa[currency].totalForeign += Number(inv.amountForeign);
    byDivisa[currency].totalMxn += Number(inv.amountMxn);
    totalMxn += Number(inv.amountMxn);
  });

  // Calcular tipo de cambio promedio por divisa
  Object.keys(byDivisa).forEach(currency => {
    byDivisa[currency].avgExchangeRate = byDivisa[currency].totalMxn / byDivisa[currency].totalForeign;
  });

  // Obtener tipo de cambio actual (último del día)
  const currentRates = {};
  for (const currency of Object.keys(byDivisa)) {
    const latestRate = await db.query.exchangeRateHistory.findFirst({
      where: eq(exchangeRateHistory.currency, currency),
      orderBy: (rates, { desc }) => [desc(rates.date)],
    });
    currentRates[currency] = Number(latestRate?.rate || 20); // Default $20 si no hay dato
  }

  // Proyectar si sube el tipo de cambio
  const resicoLimit = 3500000;
  const remainingCapacity = resicoLimit - totalMxn;

  const projections = {};
  Object.keys(byDivisa).forEach(currency => {
    const currentRate = currentRates[currency];
    const maxForeignRemaining = remainingCapacity / currentRate;
    projections[currency] = {
      maxForeignRemaining,
      atCurrentRate: maxForeignRemaining * currentRate,
      warningRate: (resicoLimit * 1.1) / (byDivisa[currency].totalForeign + maxForeignRemaining), // +10% tipo cambio
    };
  });

  return {
    totalMxn,
    resicoLimit,
    remainingCapacity,
    percentageUsed: ((totalMxn / resicoLimit) * 100).toFixed(2) + '%',
    byDivisa,
    currentRates,
    projections,
    warning: totalMxn > resicoLimit * 0.8 ? 'Estás cerca del tope. Considera el tipo de cambio futuro.' : null,
  };
})
```

---

## 3. 📢 ESTRATEGIA BOOTSTRAP

### Canal #1: Comunidades Tech Freelance

**Target:**

- r/freelance_mx (Reddit)
- Grupos Discord: "México Devs", "Diseñadores MX"
- Twitter/X: #FreelanceMX

**Post:**

> "Freelancers que cobran en USD/EUR: ¿Ya calcularon si se van a pasar del tope RESICO por la subida del dólar?
> Si el USD llega a $22 MXN, tus mismos clientes te pasarán del límite.
> Hice una calculadora que proyecta esto. DM."

---

### Canal #2: YouTube/TikTok Tutorial

**Video:** "Por qué el dólar puede ARRUINAR tu RESICO en 2026 (y cómo evitarlo)"

**CTA:** "Link en bio para calcular tu margen real"

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Upsell Plan BUSINESS ($499/mes)

**Target:** Freelancers con múltiples clientes internacionales

**Features:**

- ✅ Multi-divisa (USD, EUR, GBP, CAD)
- ✅ Integración Stripe/PayPal (auto-sync)
- ✅ Facturación multi-moneda (SAT permite USD en CFDI)
- ✅ Simulador de escenarios (¿qué pasa si el EUR baja?)

---

## 5. ⚙️ IMPLEMENTACIÓN

**Prioridad:** 🔴 ALTA (segmento creciente, tech-savvy)
**Complejidad:** ⭐⭐⭐⭐☆ (4/5) - API Banxico, multi-divisa, proyecciones
**Tiempo:** 9-11 días

---

## 💰 MODELO NEGOCIO

| Plan | Precio | Target |
|:---|:-:|:---|
| **PRO** | $249/mes | Freelancer individual |
| **BUSINESS** | $499/mes | Agencia/múltiples clientes |

**ROI:** Evitar cambio de régimen = $200k-300k en ISR ahorrado

---

**Próximo:** 58 - Contador Usuario Final
