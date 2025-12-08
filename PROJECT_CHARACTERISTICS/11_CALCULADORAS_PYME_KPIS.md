# 🧮 CALCULADORAS PYME - KPIs EMPRESARIALES

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Módulo:** Inteligencia Empresarial para PyMEs  
**Versión:** 1.0  
**Fecha:** 29 Noviembre 2025

---

## 📋 ÍNDICE

1. [Visión General](#visión-general)
2. [KPIs de Contabilidad (Accounting)](#kpis-de-contabilidad-accounting)
3. [KPIs de Flujo de Caja (Cash Flow)](#kpis-de-flujo-de-caja-cash-flow)
4. [KPIs de Balance General (Balance Sheet)](#kpis-de-balance-general-balance-sheet)
5. [KPIs de Inventario (Inventory)](#kpis-de-inventario-inventory)
6. [KPIs de CAPEX](#kpis-de-capex)
7. [KPIs Fiscales/SAT (Tax)](#kpis-fiscalessat-tax)
8. [KPIs para CEO (Executive Dashboard)](#kpis-para-ceo-executive-dashboard)
9. [KPIs para Inversionistas (Investor Metrics)](#kpis-para-inversionistas-investor-metrics)
10. [Calculadora de ROI](#calculadora-de-roi)
11. [Top 20 Métricas de Negocio](#top-20-métricas-de-negocio)
12. [Funcionalidades de Exportación](#funcionalidades-de-exportación)

---

## 🎯 VISIÓN GENERAL

### Filosofía

> **"Transforma datos en decisiones. Cada PyME merece inteligencia empresarial de Fortune 500"**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PIRÁMIDE DE INTELIGENCIA PYME                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                           ┌─────────────┐                              │
│                           │  DECISIÓN   │  ← CEO/Inversionista         │
│                           └──────┬──────┘                              │
│                        ┌─────────┴─────────┐                           │
│                        │    PREDICCIÓN     │  ← IA + Machine Learning  │
│                        └─────────┬─────────┘                           │
│                   ┌──────────────┴──────────────┐                      │
│                   │         ANÁLISIS            │  ← KPIs + Ratios     │
│                   └──────────────┬──────────────┘                      │
│              ┌───────────────────┴───────────────────┐                 │
│              │            ORGANIZACIÓN               │  ← Categorías   │
│              └───────────────────┬───────────────────┘                 │
│         ┌────────────────────────┴────────────────────────┐            │
│         │                   DATOS CRUDOS                  │  ← Input   │
│         └─────────────────────────────────────────────────┘            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Nomenclatura Bilingüe

Todos los KPIs incluyen:

- **Nombre en español** (interfaz principal)
- **Nombre en inglés** (para búsquedas y exportación internacional)
- **Fórmula matemática** (transparencia)
- **Interpretación** (qué significa para el negocio)
- **Benchmark** (valores de referencia para México)

---

## 📊 KPIS DE CONTABILIDAD (ACCOUNTING)

### ACC-01: Margen Bruto (Gross Margin)

| Campo            | Valor                                                                         |
| :--------------- | :---------------------------------------------------------------------------- |
| **Nombre ES**    | Margen Bruto                                                                  |
| **Nombre EN**    | Gross Margin                                                                  |
| **Fórmula**      | $\frac{\text{Ingresos} - \text{Costo de Ventas}}{\text{Ingresos}} \times 100$ |
| **Unidad**       | Porcentaje (%)                                                                |
| **Frecuencia**   | Mensual, Trimestral, Anual                                                    |
| **Benchmark MX** | PyME saludable: 30-50%                                                        |

```typescript
interface GrossMargin {
  revenue: number; // Ingresos totales
  costOfGoodsSold: number; // Costo de ventas
  grossProfit: number; // Utilidad bruta
  grossMarginPercent: number;
  trend: "up" | "down" | "stable";
  vsLastPeriod: number; // Cambio vs periodo anterior
}

function calculateGrossMargin(revenue: number, cogs: number): GrossMargin {
  const grossProfit = revenue - cogs;
  const grossMarginPercent = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
  return {
    revenue,
    costOfGoodsSold: cogs,
    grossProfit,
    grossMarginPercent: Math.round(grossMarginPercent * 100) / 100,
    trend: "stable",
    vsLastPeriod: 0,
  };
}
```

**Interpretación:**

- 🟢 **> 40%**: Excelente - buen control de costos
- 🟡 **20-40%**: Normal - revisar eficiencia
- 🔴 **< 20%**: Crítico - costos muy altos

---

### ACC-02: Margen Neto (Net Margin)

| Campo            | Valor                                                             |
| :--------------- | :---------------------------------------------------------------- |
| **Nombre ES**    | Margen Neto / Margen de Utilidad                                  |
| **Nombre EN**    | Net Profit Margin                                                 |
| **Fórmula**      | $\frac{\text{Utilidad Neta}}{\text{Ingresos Totales}} \times 100$ |
| **Unidad**       | Porcentaje (%)                                                    |
| **Benchmark MX** | PyME saludable: 10-20%                                            |

**Interpretación:**

- 🟢 **> 15%**: Excelente rentabilidad
- 🟡 **5-15%**: Rentabilidad aceptable
- 🔴 **< 5%**: Baja rentabilidad, revisar estructura

---

### ACC-03: Margen Operativo (Operating Margin / EBIT Margin)

| Campo            | Valor                                            |
| :--------------- | :----------------------------------------------- |
| **Nombre ES**    | Margen Operativo / Margen EBIT                   |
| **Nombre EN**    | Operating Margin                                 |
| **Fórmula**      | $\frac{\text{EBIT}}{\text{Ingresos}} \times 100$ |
| **Componentes**  | EBIT = Ingresos - Costos - Gastos Operativos     |
| **Benchmark MX** | 15-25%                                           |

---

### ACC-04: Punto de Equilibrio (Break-Even Point)

| Campo                | Valor                                                                                 |
| :------------------- | :------------------------------------------------------------------------------------ |
| **Nombre ES**        | Punto de Equilibrio                                                                   |
| **Nombre EN**        | Break-Even Point (BEP)                                                                |
| **Fórmula Unidades** | $\frac{\text{Costos Fijos}}{\text{Precio Unitario} - \text{Costo Variable Unitario}}$ |
| **Fórmula Ventas**   | $\frac{\text{Costos Fijos}}{1 - \frac{\text{Costos Variables}}{\text{Ventas}}}$       |

```typescript
interface BreakEvenAnalysis {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  breakEvenUnits: number;
  breakEvenRevenue: number;
  currentUnits: number;
  marginOfSafety: number; // Margen de seguridad
  marginOfSafetyPercent: number;
}

function calculateBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number,
  currentUnits: number,
): BreakEvenAnalysis {
  const contributionMargin = pricePerUnit - variableCostPerUnit;
  const breakEvenUnits = fixedCosts / contributionMargin;
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;
  const marginOfSafety = currentUnits - breakEvenUnits;

  return {
    fixedCosts,
    variableCostPerUnit,
    pricePerUnit,
    breakEvenUnits: Math.ceil(breakEvenUnits),
    breakEvenRevenue,
    currentUnits,
    marginOfSafety,
    marginOfSafetyPercent: (marginOfSafety / currentUnits) * 100,
  };
}
```

---

### ACC-05: EBITDA

| Campo         | Valor                                                        |
| :------------ | :----------------------------------------------------------- |
| **Nombre ES** | EBITDA                                                       |
| **Nombre EN** | Earnings Before Interest, Taxes, Depreciation & Amortization |
| **Fórmula**   | Utilidad Operativa + Depreciación + Amortización             |
| **Uso**       | Mide capacidad de generar efectivo operativo                 |

---

## 💵 KPIS DE FLUJO DE CAJA (CASH FLOW)

### CF-01: Flujo de Caja Operativo (Operating Cash Flow)

| Campo           | Valor                                                        |
| :-------------- | :----------------------------------------------------------- |
| **Nombre ES**   | Flujo de Caja Operativo                                      |
| **Nombre EN**   | Operating Cash Flow (OCF)                                    |
| **Fórmula**     | Utilidad Neta + Depreciación ± Cambios en Capital de Trabajo |
| **Importancia** | 🔴 CRÍTICA - efectivo real del negocio                       |

---

### CF-02: Flujo de Caja Libre (Free Cash Flow)

| Campo              | Valor                                                 |
| :----------------- | :---------------------------------------------------- |
| **Nombre ES**      | Flujo de Caja Libre                                   |
| **Nombre EN**      | Free Cash Flow (FCF)                                  |
| **Fórmula**        | $\text{OCF} - \text{CAPEX}$                           |
| **Interpretación** | Efectivo disponible para dividendos, deuda, inversión |

```typescript
interface CashFlowStatement {
  operatingCashFlow: number;
  investingCashFlow: number;
  financingCashFlow: number;
  netCashFlow: number;
  freeCashFlow: number;
  cashConversionCycle: number;
  daysToRunOut: number; // Días para quedarse sin efectivo
  cashBurnRate: number; // Tasa de quema mensual
  runway: number; // Meses de operación restantes
}
```

---

### CF-03: Ciclo de Conversión de Efectivo (Cash Conversion Cycle)

| Campo           | Valor                                                      |
| :-------------- | :--------------------------------------------------------- |
| **Nombre ES**   | Ciclo de Conversión de Efectivo                            |
| **Nombre EN**   | Cash Conversion Cycle (CCC)                                |
| **Fórmula**     | $\text{DIO} + \text{DSO} - \text{DPO}$                     |
| **Componentes** | DIO (Días Inventario) + DSO (Días Cobro) - DPO (Días Pago) |
| **Meta**        | Menor = mejor (idealmente < 30 días)                       |

---

### CF-04: Runway / Meses de Operación

| Campo         | Valor                                                                 |
| :------------ | :-------------------------------------------------------------------- | ------------ | ------------ |
| **Nombre ES** | Meses de Operación Restantes                                          |
| **Nombre EN** | Cash Runway                                                           |
| **Fórmula**   | $\frac{\text{Efectivo Disponible}}{\text{Gastos Mensuales Promedio}}$ |
| **Alerta**    | 🔴 < 3 meses                                                          | 🟡 3-6 meses | 🟢 > 6 meses |

```typescript
interface RunwayCalculation {
  currentCash: number;
  monthlyBurnRate: number;
  runwayMonths: number;
  runwayEndDate: Date;
  recommendations: string[];
}

function calculateRunway(cash: number, expenses: number[]): RunwayCalculation {
  const avgMonthlyBurn = expenses.reduce((a, b) => a + b, 0) / expenses.length;
  const runwayMonths = cash / avgMonthlyBurn;
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + Math.floor(runwayMonths));

  const recommendations: string[] = [];
  if (runwayMonths < 3) {
    recommendations.push("⚠️ URGENTE: Buscar financiamiento o reducir gastos");
  } else if (runwayMonths < 6) {
    recommendations.push("📊 Revisar estructura de costos");
  }

  return {
    currentCash: cash,
    monthlyBurnRate: avgMonthlyBurn,
    runwayMonths: Math.round(runwayMonths * 10) / 10,
    runwayEndDate: endDate,
    recommendations,
  };
}
```

---

## 📋 KPIS DE BALANCE GENERAL (BALANCE SHEET)

### BS-01: Razón Corriente (Current Ratio)

| Campo         | Valor                                                       |
| :------------ | :---------------------------------------------------------- |
| **Nombre ES** | Razón Corriente / Razón Circulante                          |
| **Nombre EN** | Current Ratio                                               |
| **Fórmula**   | $\frac{\text{Activo Circulante}}{\text{Pasivo Circulante}}$ |
| **Benchmark** | Ideal: 1.5 - 2.0                                            |

**Interpretación:**

- 🟢 **1.5 - 2.0**: Liquidez saludable
- 🟡 **1.0 - 1.5**: Precaución - ajustada
- 🔴 **< 1.0**: Riesgo de insolvencia

---

### BS-02: Prueba Ácida (Quick Ratio)

| Campo         | Valor                                                                           |
| :------------ | :------------------------------------------------------------------------------ |
| **Nombre ES** | Prueba Ácida / Razón Rápida                                                     |
| **Nombre EN** | Quick Ratio / Acid Test                                                         |
| **Fórmula**   | $\frac{\text{Activo Circulante} - \text{Inventario}}{\text{Pasivo Circulante}}$ |
| **Benchmark** | Ideal: > 1.0                                                                    |

---

### BS-03: Razón de Endeudamiento (Debt Ratio)

| Campo            | Valor                                                        |
| :--------------- | :----------------------------------------------------------- |
| **Nombre ES**    | Razón de Endeudamiento                                       |
| **Nombre EN**    | Debt Ratio                                                   |
| **Fórmula**      | $\frac{\text{Pasivo Total}}{\text{Activo Total}} \times 100$ |
| **Benchmark MX** | Saludable: < 60%                                             |

---

### BS-04: Deuda a Capital (Debt to Equity)

| Campo         | Valor                                                 |
| :------------ | :---------------------------------------------------- |
| **Nombre ES** | Razón Deuda/Capital                                   |
| **Nombre EN** | Debt to Equity Ratio (D/E)                            |
| **Fórmula**   | $\frac{\text{Pasivo Total}}{\text{Capital Contable}}$ |
| **Benchmark** | Saludable: < 2.0                                      |

---

### BS-05: Capital de Trabajo (Working Capital)

| Campo              | Valor                                      |
| :----------------- | :----------------------------------------- |
| **Nombre ES**      | Capital de Trabajo                         |
| **Nombre EN**      | Working Capital                            |
| **Fórmula**        | Activo Circulante - Pasivo Circulante      |
| **Interpretación** | Debe ser positivo para operación saludable |

```typescript
interface BalanceSheetAnalysis {
  // Activos
  totalAssets: number;
  currentAssets: number;
  nonCurrentAssets: number;
  cash: number;
  accountsReceivable: number;
  inventory: number;

  // Pasivos
  totalLiabilities: number;
  currentLiabilities: number;
  longTermDebt: number;
  accountsPayable: number;

  // Capital
  totalEquity: number;
  retainedEarnings: number;

  // Ratios calculados
  currentRatio: number;
  quickRatio: number;
  debtRatio: number;
  debtToEquity: number;
  workingCapital: number;

  // Alertas
  alerts: FinancialAlert[];
}

interface FinancialAlert {
  type: "danger" | "warning" | "info";
  metric: string;
  message: string;
  recommendation: string;
}
```

---

## 📦 KPIS DE INVENTARIO (INVENTORY)

### INV-01: Rotación de Inventario (Inventory Turnover)

| Campo              | Valor                                                       |
| :----------------- | :---------------------------------------------------------- |
| **Nombre ES**      | Rotación de Inventario                                      |
| **Nombre EN**      | Inventory Turnover Ratio                                    |
| **Fórmula**        | $\frac{\text{Costo de Ventas}}{\text{Inventario Promedio}}$ |
| **Interpretación** | Veces que el inventario "rota" al año                       |
| **Benchmark**      | Depende del sector (retail: 8-12, industrial: 4-6)          |

---

### INV-02: Días de Inventario (Days Inventory Outstanding)

| Campo         | Valor                                       |
| :------------ | :------------------------------------------ |
| **Nombre ES** | Días de Inventario                          |
| **Nombre EN** | Days Inventory Outstanding (DIO)            |
| **Fórmula**   | $\frac{365}{\text{Rotación de Inventario}}$ |
| **Meta**      | Menor = mejor (menos capital atado)         |

---

### INV-03: Nivel de Stock Óptimo

| Campo         | Valor                                                   |
| :------------ | :------------------------------------------------------ |
| **Nombre ES** | Nivel Óptimo de Stock                                   |
| **Nombre EN** | Economic Order Quantity (EOQ)                           |
| **Fórmula**   | $\sqrt{\frac{2DS}{H}}$                                  |
| **Variables** | D=Demanda anual, S=Costo pedido, H=Costo almacenamiento |

```typescript
interface InventoryMetrics {
  totalInventoryValue: number;
  inventoryTurnover: number;
  daysInventoryOutstanding: number;
  stockoutRisk: "low" | "medium" | "high";
  slowMovingItems: InventoryItem[];
  deadStock: InventoryItem[];
  reorderAlerts: ReorderAlert[];
}

interface ReorderAlert {
  sku: string;
  productName: string;
  currentStock: number;
  reorderPoint: number;
  suggestedOrderQty: number;
  daysUntilStockout: number;
}
```

---

### INV-04: ABC Analysis (Análisis ABC)

| Categoría | Descripción                        | % Items | % Valor |
| :-------: | :--------------------------------- | :-----: | :-----: |
|   **A**   | Productos estrella - alta rotación |   20%   |   80%   |
|   **B**   | Productos medios                   |   30%   |   15%   |
|   **C**   | Productos de baja rotación         |   50%   |   5%    |

---

## 🏭 KPIS DE CAPEX

### CAPEX-01: Gasto de Capital (Capital Expenditure)

| Campo         | Valor                                                  |
| :------------ | :----------------------------------------------------- |
| **Nombre ES** | Gasto de Capital                                       |
| **Nombre EN** | Capital Expenditure (CAPEX)                            |
| **Fórmula**   | Compra de activos fijos + Mejoras a activos existentes |
| **Tipos**     | Mantenimiento vs Crecimiento                           |

---

### CAPEX-02: Ratio CAPEX a Ventas

| Campo         | Valor                                                   |
| :------------ | :------------------------------------------------------ |
| **Nombre ES** | CAPEX como % de Ventas                                  |
| **Nombre EN** | CAPEX to Sales Ratio                                    |
| **Fórmula**   | $\frac{\text{CAPEX}}{\text{Ventas Totales}} \times 100$ |
| **Benchmark** | Varía por industria (5-15% típico)                      |

---

### CAPEX-03: Retorno sobre Inversión de Capital

| Campo         | Valor                                                      |
| :------------ | :--------------------------------------------------------- |
| **Nombre ES** | Retorno sobre Capital Invertido                            |
| **Nombre EN** | Return on Invested Capital (ROIC)                          |
| **Fórmula**   | $\frac{\text{NOPAT}}{\text{Capital Invertido}} \times 100$ |
| **NOPAT**     | Net Operating Profit After Tax                             |

```typescript
interface CAPEXAnalysis {
  totalCapex: number;
  maintenanceCapex: number;
  growthCapex: number;
  capexToSalesRatio: number;
  depreciationCoverage: number; // CAPEX / Depreciación

  projects: CAPEXProject[];

  // Proyecciones
  projectedCapexNextYear: number;
  fundingGap: number;
}

interface CAPEXProject {
  name: string;
  amount: number;
  type: "maintenance" | "growth" | "mandatory";
  expectedROI: number;
  paybackPeriod: number; // En meses
  status: "planned" | "approved" | "in-progress" | "completed";
}
```

---

## 🏛️ KPIS FISCALES/SAT (TAX)

### TAX-01: Tasa Efectiva de Impuestos

| Campo         | Valor                                                                            |
| :------------ | :------------------------------------------------------------------------------- |
| **Nombre ES** | Tasa Efectiva de Impuestos                                                       |
| **Nombre EN** | Effective Tax Rate                                                               |
| **Fórmula**   | $\frac{\text{Impuestos Pagados}}{\text{Utilidad Antes de Impuestos}} \times 100$ |
| **RESICO**    | Máximo 2.5% sobre ingresos                                                       |
| **General**   | ISR 30% sobre utilidad                                                           |

---

### TAX-02: ISR Proyectado Mensual

| Campo         | Valor                                      |
| :------------ | :----------------------------------------- |
| **Nombre ES** | ISR Proyectado                             |
| **Nombre EN** | Projected Income Tax                       |
| **RESICO**    | Ingresos facturados × Tasa RESICO (1-2.5%) |
| **General**   | (Ingresos - Deducciones) × 30%             |

```typescript
interface TaxProjection {
  regime: "RESICO" | "ACTIVIDAD_EMPRESARIAL" | "PERSONA_MORAL";
  period: "monthly" | "quarterly" | "annual";

  // Ingresos
  grossRevenue: number;
  taxableIncome: number;

  // Deducciones (si aplica)
  deductions: TaxDeduction[];
  totalDeductions: number;

  // Impuestos
  isrToPay: number;
  ivaTrasladadoRate: number;
  ivaTrasladadoAmount: number;
  ivaAcreditableAmount: number;
  ivaNetToPay: number;

  // Fechas
  dueDate: Date;
  daysUntilDue: number;

  // Comparación
  vsLastPeriod: number;
  ytdTotal: number;
}

interface TaxDeduction {
  category: string;
  amount: number;
  description: string;
  cfdiRequired: boolean;
  hasCFDI: boolean;
}
```

---

### TAX-03: Optimización Fiscal

| Campo         | Valor                                   |
| :------------ | :-------------------------------------- |
| **Nombre ES** | Oportunidades de Deducción              |
| **Nombre EN** | Tax Optimization Opportunities          |
| **Función**   | Identificar deducciones no aprovechadas |

```typescript
interface TaxOptimization {
  currentTaxBurden: number;
  optimizedTaxBurden: number;
  potentialSavings: number;

  opportunities: TaxOpportunity[];
}

interface TaxOpportunity {
  type: "deduction" | "credit" | "timing" | "regime_change";
  description: string;
  potentialSaving: number;
  effort: "low" | "medium" | "high";
  deadline?: Date;
  requirements: string[];
}
```

---

## 👔 KPIS PARA CEO (EXECUTIVE DASHBOARD)

### CEO-01: Dashboard Ejecutivo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      🎯 DASHBOARD CEO - Noviembre 2025                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐              │
│  │   INGRESOS    │  │    EBITDA     │  │  CASH FLOW   │              │
│  │   $850,000    │  │   $127,500    │  │   $95,000    │              │
│  │   ↑ +12%      │  │   ↑ +8%       │  │   ↑ +15%     │              │
│  └───────────────┘  └───────────────┘  └───────────────┘              │
│                                                                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐              │
│  │ MARGEN NETO   │  │   RUNWAY      │  │   CLIENTES   │              │
│  │    15%        │  │  8.5 meses    │  │     127      │              │
│  │   ↑ +2pp      │  │   ↓ -0.5      │  │   ↑ +15      │              │
│  └───────────────┘  └───────────────┘  └───────────────┘              │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 📊 TENDENCIA DE INGRESOS (12 meses)                             │   │
│  │                                                                  │   │
│  │  900K ┤                                              ▄▄         │   │
│  │  800K ┤                                    ▄▄  ▄▄  ██         │   │
│  │  700K ┤                          ▄▄  ▄▄  ██  ██  ██         │   │
│  │  600K ┤              ▄▄    ▄▄  ██  ██  ██  ██  ██         │   │
│  │  500K ┤  ▄▄    ▄▄  ██  ██  ██  ██  ██  ██  ██         │   │
│  │       └──Dic──Ene──Feb──Mar──Abr──May──Jun──Jul──Ago──Sep──Oct──Nov│   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  🚨 ALERTAS                                                            │
│  ├── ⚠️ Cuentas por cobrar > 60 días: $45,000                         │
│  ├── ⚠️ Declaración ISR vence en 3 días                               │
│  └── ℹ️ Nuevo cliente potencial: $50,000/mes                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### CEO-02: Scorecard Mensual

```typescript
interface CEOScorecard {
  period: string;

  // Financieros
  revenue: MetricWithTrend;
  ebitda: MetricWithTrend;
  netIncome: MetricWithTrend;
  cashPosition: MetricWithTrend;

  // Operativos
  customerCount: MetricWithTrend;
  avgRevenuePerCustomer: MetricWithTrend;
  employeeCount: number;
  revenuePerEmployee: MetricWithTrend;

  // Estratégicos
  marketShare: MetricWithTrend;
  customerSatisfaction: MetricWithTrend;

  // Alertas prioritarias
  criticalAlerts: Alert[];

  // Recomendaciones IA
  aiInsights: string[];
}

interface MetricWithTrend {
  value: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  target?: number;
  vsTarget?: number;
}
```

---

## 💼 KPIS PARA INVERSIONISTAS (INVESTOR METRICS)

### INV-01: Return on Equity (ROE)

| Campo         | Valor                                                                      |
| :------------ | :------------------------------------------------------------------------- |
| **Nombre ES** | Rendimiento sobre Capital                                                  |
| **Nombre EN** | Return on Equity (ROE)                                                     |
| **Fórmula**   | $\frac{\text{Utilidad Neta}}{\text{Capital Contable Promedio}} \times 100$ |
| **Benchmark** | Bueno: > 15%, Excelente: > 20%                                             |

---

### INV-02: Return on Assets (ROA)

| Campo         | Valor                                                                     |
| :------------ | :------------------------------------------------------------------------ |
| **Nombre ES** | Rendimiento sobre Activos                                                 |
| **Nombre EN** | Return on Assets (ROA)                                                    |
| **Fórmula**   | $\frac{\text{Utilidad Neta}}{\text{Activos Totales Promedio}} \times 100$ |
| **Benchmark** | Bueno: > 5%, Excelente: > 10%                                             |

---

### INV-03: Valuación Implícita

```typescript
interface CompanyValuation {
  // Métodos de valuación
  discountedCashFlow: DCFValuation;
  multipleRevenue: number; // Revenue × múltiplo industria
  multipleEbitda: number; // EBITDA × múltiplo
  bookValue: number; // Valor en libros

  // Resumen
  valuationRange: {
    low: number;
    mid: number;
    high: number;
  };

  // Para presentación a inversionistas
  pitchMetrics: {
    mrr: number; // Monthly Recurring Revenue
    arr: number; // Annual Recurring Revenue
    growthRate: number;
    ltv: number; // Lifetime Value
    cac: number; // Customer Acquisition Cost
    ltvCacRatio: number;
    churnRate: number;
    nrr: number; // Net Revenue Retention
  };
}

interface DCFValuation {
  projectedCashFlows: number[]; // 5 años
  terminalValue: number;
  discountRate: number; // WACC
  presentValue: number;
}
```

---

### INV-04: Unit Economics

| Métrica                             | Fórmula                           |   Target   |
| :---------------------------------- | :-------------------------------- | :--------: |
| **LTV** (Lifetime Value)            | ARPU × Vida Cliente               | > $10,000  |
| **CAC** (Customer Acquisition Cost) | Gasto Marketing / Clientes Nuevos |  < $1,000  |
| **LTV:CAC Ratio**                   | LTV / CAC                         |   > 3:1    |
| **Payback Period**                  | CAC / (ARPU × Margen)             | < 12 meses |

---

## 📈 CALCULADORA DE ROI

### ROI-01: Calculadora de Inversiones

```typescript
interface ROICalculator {
  calculateSimpleROI(investment: number, returns: number): number;
  calculateAnnualizedROI(
    investment: number,
    returns: number,
    years: number,
  ): number;
  calculateNPV(cashFlows: number[], discountRate: number): number;
  calculateIRR(cashFlows: number[]): number;
  calculatePaybackPeriod(investment: number, annualCashFlow: number): number;
}

// Implementación
const ROI = {
  simple: (investment: number, returns: number) =>
    ((returns - investment) / investment) * 100,

  annualized: (investment: number, returns: number, years: number) =>
    (Math.pow(returns / investment, 1 / years) - 1) * 100,

  npv: (cashFlows: number[], rate: number) =>
    cashFlows.reduce((acc, cf, i) => acc + cf / Math.pow(1 + rate, i), 0),

  payback: (investment: number, annualCF: number) => investment / annualCF,
};
```

### ROI-02: Escenarios de Inversión

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    💰 CALCULADORA DE ROI                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Inversión Inicial:    $  [ 100,000 ]                                  │
│  Período (años):          [    3    ]                                  │
│  Tasa de descuento:       [   12%   ]                                  │
│                                                                         │
│  Flujos de caja proyectados:                                           │
│  ├── Año 1:  $  [ 30,000 ]                                            │
│  ├── Año 2:  $  [ 45,000 ]                                            │
│  └── Año 3:  $  [ 60,000 ]                                            │
│                                                                         │
│  ═══════════════════════════════════════════════════════════════════   │
│                                                                         │
│  RESULTADOS:                                                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐        │
│  │   ROI SIMPLE    │  │      NPV        │  │      IRR        │        │
│  │     35%         │  │   $12,450       │  │     18.2%       │        │
│  │   ✅ Positivo   │  │   ✅ > 0        │  │   ✅ > 12%      │        │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘        │
│                                                                         │
│  Payback Period: 2.4 años                                              │
│                                                                         │
│  💡 Recomendación: INVERTIR - ROI superior al costo de capital        │
│                                                                         │
│  [ 📊 Ver gráfico ] [ 📄 Exportar PDF ] [ 📊 Exportar Excel ]         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏆 TOP 20 MÉTRICAS DE NEGOCIO

### Tabla Resumen

|  #  | Métrica                  | Categoría     | Fórmula                 |   Target   |
| :-: | :----------------------- | :------------ | :---------------------- | :--------: |
|  1  | **Ingresos Mensuales**   | Revenue       | Suma de ventas          | Creciendo  |
|  2  | **Margen Bruto**         | Profitability | (Revenue-COGS)/Revenue  |   > 30%    |
|  3  | **Margen Neto**          | Profitability | Net Income/Revenue      |   > 10%    |
|  4  | **EBITDA**               | Profitability | EBIT + D&A              |  Positivo  |
|  5  | **Flujo de Caja Libre**  | Cash          | OCF - CAPEX             |  Positivo  |
|  6  | **Runway**               | Cash          | Cash/Burn Rate          | > 6 meses  |
|  7  | **Razón Corriente**      | Liquidity     | CA/CL                   |  1.5-2.0   |
|  8  | **Razón Deuda/Capital**  | Leverage      | Debt/Equity             |   < 2.0    |
|  9  | **ROE**                  | Returns       | NI/Equity               |   > 15%    |
| 10  | **ROA**                  | Returns       | NI/Assets               |    > 5%    |
| 11  | **Rotación Inventario**  | Efficiency    | COGS/Inventory          |    > 6x    |
| 12  | **Días de Cobro**        | Efficiency    | (AR/Revenue)×365        | < 45 días  |
| 13  | **Días de Pago**         | Efficiency    | (AP/COGS)×365           | > 30 días  |
| 14  | **Punto de Equilibrio**  | Planning      | Fixed/(Price-VC)        |  Conocido  |
| 15  | **LTV**                  | Customers     | ARPU × Lifetime         |  > 3× CAC  |
| 16  | **CAC**                  | Customers     | Marketing/New Customers |  < LTV/3   |
| 17  | **Churn Rate**           | Customers     | Lost/Total × 100        |    < 5%    |
| 18  | **NPS**                  | Customers     | Promoters - Detractors  |    > 50    |
| 19  | **Revenue por Empleado** | Productivity  | Revenue/Employees       | Creciendo  |
| 20  | **Tasa Efectiva ISR**    | Tax           | Taxes/EBT               | Optimizada |

---

## 📤 FUNCIONALIDADES DE EXPORTACIÓN

### Formatos de Exportación

```typescript
interface ExportOptions {
  format: "pdf" | "excel" | "csv" | "json";
  template: "summary" | "detailed" | "investor" | "tax" | "custom";
  period: DateRange;
  metrics: string[]; // IDs de métricas a incluir
  includeCharts: boolean;
  includeTrends: boolean;
  language: "es" | "en";
  branding: {
    logo?: string;
    companyName: string;
    colors?: BrandColors;
  };
}
```

### Templates de Exportación

#### 1. Reporte Ejecutivo (PDF)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  [LOGO]     REPORTE FINANCIERO EJECUTIVO                               │
│             Mi Empresa S.A. de C.V.                                    │
│             Noviembre 2025                                             │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  RESUMEN EJECUTIVO                                                     │
│  ─────────────────────────────────────────────────────────────────     │
│  • Ingresos del mes: $850,000 MXN (+12% vs mes anterior)              │
│  • EBITDA: $127,500 MXN (15% margen)                                  │
│  • Flujo de caja positivo: $95,000 MXN                                │
│  • Runway: 8.5 meses                                                   │
│                                                                         │
│  [Gráfico de tendencia 12 meses]                                       │
│                                                                         │
│  INDICADORES CLAVE                                                     │
│  ─────────────────────────────────────────────────────────────────     │
│  Margen Bruto:     42%    ✅                                          │
│  Razón Corriente:  1.8    ✅                                          │
│  ROE:              18%    ✅                                          │
│  Días de Cobro:    38     ✅                                          │
│                                                                         │
│  [Tabla detallada de métricas]                                        │
│                                                                         │
│  RECOMENDACIONES                                                       │
│  ─────────────────────────────────────────────────────────────────     │
│  1. Reducir días de cobro a 30 para mejorar cash flow                 │
│  2. Revisar gastos operativos para mejorar margen                     │
│  3. Considerar línea de crédito para crecimiento                      │
│                                                                         │
│                                    Generado por PRO_FINAN_CONTA_PYM   │
│                                    29/Nov/2025 14:30                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 2. Export Excel (Multi-hoja)

```
📊 ARCHIVO: reporte_financiero_nov2025.xlsx

├── Hoja 1: RESUMEN
│   └── KPIs principales con semáforo
│
├── Hoja 2: P&L
│   └── Estado de Resultados detallado
│
├── Hoja 3: BALANCE
│   └── Balance General con ratios
│
├── Hoja 4: CASH_FLOW
│   └── Flujo de efectivo
│
├── Hoja 5: TENDENCIAS
│   └── Histórico 12 meses con gráficos
│
├── Hoja 6: PROYECCIONES
│   └── Forecast 6 meses
│
└── Hoja 7: SAT
    └── Resumen fiscal del periodo
```

### API de Exportación

```typescript
// endpoints de exportación
POST /api/v1/export/pdf
POST /api/v1/export/excel
POST /api/v1/export/csv

// Ejemplo request
{
  "format": "pdf",
  "template": "investor",
  "period": {
    "start": "2025-01-01",
    "end": "2025-11-30"
  },
  "metrics": [
    "revenue", "ebitda", "net_margin",
    "cash_flow", "roe", "ltv_cac"
  ],
  "includeCharts": true,
  "language": "es",
  "branding": {
    "companyName": "Mi Empresa",
    "logo": "base64..."
  }
}

// Response
{
  "success": true,
  "downloadUrl": "/downloads/report_abc123.pdf",
  "expiresAt": "2025-11-30T00:00:00Z"
}
```

---

## 🎯 IMPLEMENTACIÓN POR FASES

### Fase 1: MVP (Semanas 1-4)

- [ ] Margen Bruto y Neto
- [ ] Razón Corriente
- [ ] Cash Flow básico
- [ ] Runway
- [ ] ISR proyectado RESICO
- [ ] Export PDF básico

### Fase 2: Core (Semanas 5-8)

- [ ] EBITDA
- [ ] Punto de equilibrio
- [ ] Rotación inventario
- [ ] Días de cobro/pago
- [ ] Dashboard CEO
- [ ] Export Excel

### Fase 3: Avanzado (Semanas 9-12)

- [ ] ROE, ROA, ROIC
- [ ] LTV, CAC, Churn
- [ ] Valuación DCF
- [ ] Escenarios y proyecciones
- [ ] IA insights
- [ ] API completa

---

## 📎 ARCHIVOS RELACIONADOS

- `PROJECT_CHARACTERISTICS/01_CORE_FINANCIERO.md`
- `PROJECT_CHARACTERISTICS/03_INTELIGENCIA_ANALITICA.md`
- `01_AUDITORIA_ESTRATEGICA/02_Tecnologia_Core/`

---

**Calculadoras PYME v1.0 - PRO_FINAN_CONTA_PYM**
