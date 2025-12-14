# 💰 Perfil 40: Finance Manager → Dogfooding (Usa tu Propio Software)

**Fecha:** 8 Diciembre 2025
**Bloque:** F (Soporte y Operaciones)
**Filosofía:** Bootstrap + Dogfooding + Validación Real

---

## 🎯 Transformación Radical

### ❌ ROL TRADICIONAL (ELIMINADO)

- **Cargo:** Finance Manager / Controller / CFO
- **Salario:** $35,000 - $50,000 MXN/mes
- **Herramientas SaaS externas:**
  - QuickBooks ($50-200 USD/mes = $950-3,800 MXN)
  - Xero ($13-70 USD/mes = $247-1,330 MXN)
  - SAP Business One ($5,000-15,000 MXN/mes)
  - Contador externo ($8,000-15,000 MXN/mes)
- **Costo Total Anual:** $600,000 - $900,000 MXN/año

### ✅ SOLUCIÓN BOOTSTRAP

**Estrategia: Dogfooding Radical**

1. **Usar FinanzasMX para la contabilidad interna** del negocio
2. **Si no sirve para nosotros, no sirve para nadie**
3. **Validación continua:** Cada bug lo vivimos en carne propia
4. **Dashboard financiero:** PostgreSQL + queries SQL directas
5. **Contador externo:** Solo 1 vez/mes para revisión (no ejecución diaria)

**Costo Anual:** $0 MXN software + $60,000 MXN contador part-time (vs. $600K-900K)

---

## 🏗️ Arquitectura Técnica

### 1. **Contabilidad con FinanzasMX (Dogfooding)**

**Principio:** Todo lo que le pedimos al cliente, lo hacemos primero nosotros.

#### Casos de uso internos:

| Categoría                | Ejemplo Real                                         | Validación                                   |
| ------------------------ | ---------------------------------------------------- | -------------------------------------------- |
| **Facturas Emitidas**    | Factura a cliente Plan PRO ($149 MXN/mes)            | ¿CFDI 4.0 se genera bien?                    |
| **Facturas Recibidas**   | Factura de Hostinger VPS ($200 MXN/mes)              | ¿XML del SAT se valida correctamente?        |
| **Gastos Operativos**    | OpenAI API ($50 USD/mes), Resend ($0 free tier)      | ¿Categorización automática funciona?         |
| **Nómina (Contractors)** | Pago a freelancer ($15,000 MXN por proyecto)         | ¿Retención ISR 10% se calcula bien?          |
| **Ingresos Stripe**      | Webhook payment_succeeded → auto-facturar            | ¿Conciliación bancaria es correcta?          |
| **Declaraciones SAT**    | Declaración mensual IVA/ISR                          | ¿Exportar a SAT es fácil o un infierno?      |

---

### 2. **Dashboard Financiero (PostgreSQL + Grafana)**

**No usar software externo.** Queries SQL directas sobre nuestras tablas.

**Ejemplo de métricas clave:**

```sql
-- Revenue mensual (ingresos por suscripciones)
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(amount) AS total_revenue,
  COUNT(DISTINCT user_id) AS paying_customers
FROM invoices
WHERE status = 'paid'
  AND created_at >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month DESC;

-- Gastos mensuales (facturas recibidas)
SELECT
  DATE_TRUNC('month', created_at) AS month,
  SUM(amount) AS total_expenses
FROM expenses
WHERE created_at >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month DESC;

-- Runway (meses de supervivencia con caja actual)
WITH caja_actual AS (
  SELECT SUM(balance) AS cash FROM bank_accounts
),
burn_rate AS (
  SELECT AVG(monthly_expenses) AS avg_burn
  FROM (
    SELECT
      DATE_TRUNC('month', created_at) AS month,
      SUM(amount) AS monthly_expenses
    FROM expenses
    WHERE created_at >= NOW() - INTERVAL '6 months'
    GROUP BY month
  ) subquery
)
SELECT
  caja_actual.cash,
  burn_rate.avg_burn,
  ROUND(caja_actual.cash / NULLIF(burn_rate.avg_burn, 0), 1) AS runway_months
FROM caja_actual, burn_rate;

-- MRR (Monthly Recurring Revenue)
SELECT
  COUNT(*) FILTER (WHERE plan = 'PRO') * 149 +
  COUNT(*) FILTER (WHERE plan = 'FAMILIA') * 249 +
  COUNT(*) FILTER (WHERE plan = 'NEGOCIO') * 299 +
  COUNT(*) FILTER (WHERE plan = 'BUSINESS') * 499 AS mrr
FROM subscriptions
WHERE status = 'active';

-- Churn Rate mensual
WITH active_last_month AS (
  SELECT COUNT(*) AS count
  FROM subscriptions
  WHERE status = 'active'
    AND created_at <= NOW() - INTERVAL '1 month'
),
churned_this_month AS (
  SELECT COUNT(*) AS count
  FROM subscriptions
  WHERE status = 'canceled'
    AND canceled_at >= NOW() - INTERVAL '1 month'
)
SELECT
  ROUND((churned_this_month.count::DECIMAL / active_last_month.count) * 100, 2) AS churn_rate_percentage
FROM active_last_month, churned_this_month;
```

**Visualización en Grafana:**

- Panel 1: Revenue vs. Expenses (line chart)
- Panel 2: MRR growth (bar chart)
- Panel 3: Runway (single stat con alerta si < 6 meses)
- Panel 4: Churn Rate (gauge 0-10%)

---

### 3. **Automatización de Declaraciones SAT**

**Flujo:**

1. **Cada mes (día 1):** Cronjob genera reporte de IVA/ISR
2. **Enviar a contador:** Email automático con CSV/Excel adjunto
3. **Contador revisa:** Hace declaración en portal SAT
4. **Confirmación:** Guardar acuse de recibo en PostgreSQL

**Script (Bun + ElysiaJS):**

```typescript
// apps/backend/src/services/sat-monthly-report.ts
import { db } from '../db';
import { invoices, expenses } from '../db/schema';
import { between } from 'drizzle-orm';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function generateMonthlySATReport(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  // Facturas emitidas (ingresos)
  const facturasByMonth = await db.query.invoices.findMany({
    where: between(invoices.createdAt, startDate, endDate),
  });

  const totalIngresos = facturasByMonth.reduce((sum, f) => sum + Number(f.amount), 0);
  const ivaTrasladadoOut = totalIngresos * 0.16;

  // Facturas recibidas (gastos)
  const gastosByMonth = await db.query.expenses.findMany({
    where: between(expenses.createdAt, startDate, endDate),
  });

  const totalGastos = gastosByMonth.reduce((sum, g) => sum + Number(g.amount), 0);
  const ivaTrasladadoIn = totalGastos * 0.16;

  // IVA a pagar (trasladado out - acreditable in)
  const ivaPorPagar = ivaTrasladadoOut - ivaTrasladadoIn;

  // ISR (simplificado, tarifa 30% sobre utilidad)
  const utilidad = totalIngresos - totalGastos;
  const isrPorPagar = utilidad > 0 ? utilidad * 0.30 : 0;

  // Generar CSV para contador
  const csvContent = `
Concepto,Monto
Total Ingresos,$${totalIngresos.toFixed(2)}
Total Gastos,$${totalGastos.toFixed(2)}
Utilidad,$${utilidad.toFixed(2)}
IVA Trasladado (Out),$${ivaTrasladadoOut.toFixed(2)}
IVA Acreditable (In),$${ivaTrasladadoIn.toFixed(2)}
IVA por Pagar,$${ivaPorPagar.toFixed(2)}
ISR por Pagar (30%),$${isrPorPagar.toFixed(2)}
  `.trim();

  // Enviar email a contador
  await resend.emails.send({
    from: 'finanzas@finanzasmx.com',
    to: 'contador@example.com',
    subject: `Reporte SAT - ${year}/${month}`,
    text: `Adjunto reporte mensual para declaración SAT.`,
    attachments: [
      {
        filename: `SAT_${year}_${month}.csv`,
        content: Buffer.from(csvContent).toString('base64'),
      },
    ],
  });

  console.log(`✅ Reporte SAT ${year}/${month} enviado a contador`);
  return {
    totalIngresos,
    totalGastos,
    utilidad,
    ivaPorPagar,
    isrPorPagar,
  };
}
```

**Cronjob (ejecutar día 1 de cada mes):**

```bash
# En Dokploy o crontab del VPS
0 9 1 * * bun run /home/app/backend/src/scripts/sat-monthly-report.ts
```

---

### 4. **Auditoría Continua (Self-Validation)**

**Checklist semanal (viernes):**

- [ ] ¿Todas las facturas de la semana están en FinanzasMX?
- [ ] ¿Pagos de Stripe se auto-facturaron correctamente?
- [ ] ¿Gastos categorizados automáticamente son correctos?
- [ ] ¿Algún bug encontrado mientras usábamos el sistema?

**Si encontramos un bug:** Crear issue en GitHub inmediatamente, prioridad ALTA.

**Filosofía:** Si nosotros no confiamos en nuestro propio software, ¿por qué lo haría un cliente?

---

## 🎯 Casos de Uso Reales (Dogfooding)

### Ejemplo 1: Factura de Hostinger VPS

**Situación:**

- Pagamos $200 MXN/mes a Hostinger
- Hostinger envía factura por email (PDF + XML)

**Proceso:**

1. **Subir XML a FinanzasMX** (módulo "Gastos")
2. **Validación automática:** RFC de Hostinger, UUID, sello digital SAT
3. **Categorización:** "Servicios de Hosting" (categoría fiscal deducible)
4. **Conciliación bancaria:** Match con cargo de $200 MXN en Stripe/tarjeta

**Validación:**

- ✅ ¿El sistema detectó bien el XML?
- ✅ ¿Categorización fue correcta o tuvimos que cambiarla?
- ✅ ¿Alerta si el XML es inválido?

---

### Ejemplo 2: Ingreso por suscripción (Plan PRO $149 MXN)

**Situación:**

- Cliente paga $149 MXN con Stripe
- Webhook `payment_succeeded` dispara facturación automática

**Proceso:**

1. **Webhook recibido** en `/api/webhooks/stripe`
2. **Auto-generar CFDI 4.0** con datos del cliente (RFC, email)
3. **Enviar factura por email** (Resend + Svelte-Email template)
4. **Guardar en tabla `invoices`** con status `paid`

**Validación:**

- ✅ ¿El CFDI se generó sin errores?
- ✅ ¿El cliente recibió el email con XML adjunto?
- ✅ ¿El UUID es único (no duplicado)?

---

### Ejemplo 3: Pago a contractor (freelancer $15,000 MXN)

**Situación:**

- Pagamos a un desarrollador freelancer mexicano
- Debe emitir factura (CFDI Honorarios)

**Proceso:**

1. **Contractor envía XML de su factura** por WhatsApp/email
2. **Subir a FinanzasMX** (módulo "Gastos - Nómina")
3. **Cálculo automático de retención ISR 10%** (si aplica)
4. **Generar constancia de retención** (PDF)

**Validación:**

- ✅ ¿La retención se calculó bien?
- ✅ ¿El PDF de constancia es legible y cumple con SAT?
- ✅ ¿Se puede exportar para declaración mensual?

---

## 📊 Métricas de Éxito del Dogfooding

### KPIs a trackear:

1. **Bugs encontrados por Dogfooding:** Número de issues creados al usar nuestro propio sistema
   - Meta: Identificar al menos 5 bugs/mes antes que los clientes
2. **Time to Fix:** Tiempo promedio entre bug descubierto → fix deployado
   - Meta: < 48 horas
3. **Feature Requests internos:** Features que pedimos nosotros
   - Meta: 50% de roadmap viene de dogfooding
4. **Contador satisfaction:** ¿El contador encuentra errores en los reportes?
   - Meta: 0 errores en declaraciones SAT

**Dashboard interno:**

```sql
-- Bugs de dogfooding vs. bugs de clientes
SELECT
  source,
  COUNT(*) AS total_bugs
FROM github_issues
WHERE created_at >= NOW() - INTERVAL '3 months'
GROUP BY source;
-- source = 'dogfooding' | 'customer_support'
```

---

## 💰 Ahorro Real

| Concepto Eliminado                  | Costo Mensual   | Costo Anual     |
| ----------------------------------- | --------------- | --------------- |
| Finance Manager (1 persona)         | $45,000 MXN     | $540,000 MXN    |
| QuickBooks/Xero/SAP                 | $8,000 MXN      | $96,000 MXN     |
| Contador full-time                  | $25,000 MXN     | $300,000 MXN    |
| **TOTAL ELIMINADO**                 | **$78,000 MXN** | **$936,000 MXN** |

| Concepto Nuevo                      | Costo Mensual   | Costo Anual     |
| ----------------------------------- | --------------- | --------------- |
| FinanzasMX (dogfooding = gratis)    | $0 MXN          | $0 MXN          |
| Contador part-time (revisión)       | $5,000 MXN      | $60,000 MXN     |
| **TOTAL NUEVO**                     | **$5,000 MXN**  | **$60,000 MXN** |

### 🎉 Ahorro Neto: **$876,000 MXN/año** (93.6% reducción)

---

## 🚀 Roadmap de Implementación

### Fase 1: Migración Completa (Semana 1-2)

- [ ] Migrar toda la contabilidad actual a FinanzasMX
- [ ] Subir todas las facturas del año (XML)
- [ ] Configurar categorías fiscales personalizadas

### Fase 2: Automatización (Semana 3-4)

- [ ] Conectar Stripe webhooks → auto-facturación
- [ ] Script de reporte mensual SAT
- [ ] Dashboard Grafana con métricas financieras

### Fase 3: Validación Continua (Mensual)

- [ ] Reunión mensual con contador (30 min)
- [ ] Revisar declaraciones SAT
- [ ] Identificar bugs o mejoras

### Fase 4: Roadmap de Features (Trimestral)

- [ ] 50% de features nuevas vienen de dogfooding
- [ ] Priorizar lo que nos duele a nosotros

---

## 🔒 Consideraciones Legales

### 1. **Contador Externo (Obligatorio en México)**

Aunque uses software, **siempre debes tener un contador certificado** que:

- ✅ Revise declaraciones mensuales
- ✅ Firme dictámenes fiscales (si aplica)
- ✅ Esté al día con cambios del SAT

**Rol del contador:**

- ❌ NO ejecuta la contabilidad diaria (eso es FinanzasMX)
- ✅ SÍ valida y firma declaraciones
- ✅ SÍ asesora en optimización fiscal

**Costo:** $5,000 MXN/mes part-time (vs. $25,000 full-time)

---

### 2. **Obligaciones Fiscales (Persona Moral)**

Si FinanzasMX es S.A.P.I. de C.V.:

- Declaración mensual IVA (día 17)
- Declaración mensual ISR (día 17)
- Declaración anual (marzo 31)
- DIOT (día 17, reporte de proveedores)
- Contabilidad electrónica (mensual al SAT)

**Automatización con FinanzasMX:**

- ✅ DIOT generado automáticamente (XML proveedores)
- ✅ Balanza de comprobación (contabilidad electrónica)
- ✅ Exportar todo en formato SAT (XML)

---

## 🎓 Aprendizajes Esperados

### 1. **Pain Points que descubriremos**

- ¿Es fácil subir facturas XML o el UI es confuso?
- ¿La categorización automática es precisa o hay que cambiar todo manualmente?
- ¿Los reportes del SAT se generan bien o tienen errores?

**Cada pain point = feature prioritaria en roadmap**

---

### 2. **Features que nacerán del Dogfooding**

Ejemplos históricos de otras empresas:

- **Notion:** Se creó porque el fundador quería una wiki interna y no encontró nada bueno
- **Stripe:** Patrick Collison necesitaba procesar pagos para su primer startup
- **GitHub:** Originalmente era para hostear el código de GitHub mismo

**FinanzasMX:** Si vivimos el dolor de la contabilidad mexicana, vamos a construir la mejor solución.

---

## 📚 Referencias de Inspiración

### Empresas dogfooding exitosas:

- **Basecamp:** Usa Basecamp para gestionar Basecamp
- **Atlassian:** Jira fue creado para gestionar Jira
- **Figma:** Diseñan Figma en Figma
- **Linear:** Linear fue construido usando Linear desde día 1

**Lema común:** "Si no lo usamos nosotros, no lo lanzamos."

---

## ✅ Checklist Pre-Producción

- [ ] Toda la contabilidad 2025 migrada a FinanzasMX
- [ ] Stripe webhooks conectados (auto-facturación)
- [ ] Script de reporte SAT funcional y testeado
- [ ] Contador part-time contratado (mensual)
- [ ] Dashboard Grafana con Revenue, Expenses, Runway, MRR
- [ ] Proceso de "bug Friday" (revisar dogfooding cada viernes)

---

## 🎯 Lema del Equipo

> **"Si FinanzasMX no sirve para administrar FinanzasMX, no sirve para nadie."**

(Esto es dogfooding en su máxima expresión. Es la prueba definitiva de calidad.)

---

**Resultado:** Finance Manager + Software externo **ELIMINADOS**. Dogfooding completo con FinanzasMX. Ahorro: **$876K MXN/año**.

**Próximo paso:** Consolidar Perfiles 41-50 en automatizaciones (SRE, Licenses, Linux Admin, etc.).
