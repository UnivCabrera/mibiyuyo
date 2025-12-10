# 👨‍💼 Perfil 06: Calculadora ISR/IMSS Open Source (Ex-Experto Nómina)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Experto en Nómina certificado por $30k-45k MXN/mes para calcular ISR, IMSS y timbrar recibos."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** El cálculo de ISR/IMSS es **fórmulas matemáticas públicas** (Anexo 8 de la RMF). Ya existen librerías open source en NPM/GitHub que hacen esto.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Cálculo ISR/IMSS | Fork de proyecto open source (GitHub) | $0 |
| Tablas ISR vigentes | Seeds JSON en PostgreSQL | $0 |
| Timbrado CFDI Nómina | Finkok PAC (ya decidido) | ~$1.50/recibo |
| Asesoría laboral | Solo si nos demandan (abogado laboral) | $8k-15k/evento |

**Cuándo contratar:** Si entramos al mercado de empresas con +50 empleados (Fase 2, 2026 Q2). Costo: $25k-35k MXN/mes.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Mención de módulo nómina | ✅ Básico | `PROJECT_CHARACTERISTICS/00_INDICE_GENERAL.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| NOM-001 | **Fork de Calculadora ISR Open Source** | 🔴 Bloqueante | GitHub (ej: nomina-mx) | $0 | Sem 2 |
| NOM-002 | Seeds de Tablas ISR 2025 | 🟠 Alto | JSON → PostgreSQL | $0 | Sem 1 |
| NOM-003 | ~~Gestión de Incidencias~~ | ⏸️ Diferido | N/A | $0 | Fase 2 (empresas +50 empleados) |
| NOM-004 | ~~Contratar Experto Nómina~~ | ❌ Descartado | N/A | $30k/mes ⛔ | Solo si pivoteamos a RRHH |

---

## 📝 ACTION ITEMS: Implementación (Stack Gratuito)

### 1. Fork de Calculadora ISR Open Source

**Proyectos recomendados en GitHub:**

- `nomina-cfdi-mexico` (TypeScript)
- `calculadora-isr-mx` (JavaScript)
- `nomina-js` (Node.js)

```bash
# Buscar en GitHub
gh repo search "nomina ISR México" --language=typescript

# Forkear el mejor candidato
gh repo fork usuario/nomina-cfdi-mexico
```

### 2. Adaptación a ElysiaJS + Bun

```typescript
// src/lib/server/payroll/isr-calculator.ts
import { ISRTables2025 } from './tables/isr-2025';

export function calculateISR(monthlySalary: number): number {
  // Buscar en tabla de ISR (Anexo 8 RMF)
  const bracket = ISRTables2025.find(b =>
    monthlySalary >= b.lowerLimit && monthlySalary < b.upperLimit
  );

  if (!bracket) return 0;

  const excess = monthlySalary - bracket.lowerLimit;
  const isr = bracket.fixedFee + (excess * bracket.rate);

  return Math.round(isr * 100) / 100; // Redondear a 2 decimales
}

export function calculateIMSS(dailySalary: number): number {
  const UMA = 108.57; // UMA 2025
  const imssRate = 0.0125; // 1.25% para trabajador

  return dailySalary * 30 * imssRate;
}
```

### 3. Seeds de Tablas ISR 2025

```json
// seeds/isr-tables-2025.json
[
  { "lowerLimit": 0.01, "upperLimit": 7735.00, "fixedFee": 0.00, "rate": 0.0192 },
  { "lowerLimit": 7735.01, "upperLimit": 65651.07, "fixedFee": 148.51, "rate": 0.064 },
  { "lowerLimit": 65651.08, "upperLimit": 115375.90, "fixedFee": 3855.14, "rate": 0.1088 },
  // ... resto de la tabla
]
```

---

## 💡 Mentalidad Bootstrap: Fork + Adaptación

### Qué hace el Founder:

1. **Buscar proyecto open source** en GitHub (filtro: stars > 50).
2. **Fork + adaptación** a nuestro stack (Bun + ElysiaJS).
3. **Agregar seeds de tablas ISR vigentes** (Anexo 8 RMF, publicado por SAT).

### Cuándo contratar experto:

- **Trigger:** Si entramos a empresas con +50 empleados (Fase 2).
- **Realidad:** Las PyMEs con <10 empleados no necesitan software complejo de nómina.
- **Costo estimado:** $25k-35k MXN/mes (si llegamos a ese mercado).

### Herramientas Open Source:

- **GitHub:** Búsqueda de proyectos de nómina MX.
- **SAT (Anexo 8):** Tablas ISR oficiales (gratis).
- **Finkok PAC:** Timbrado de recibos (~$1.50/recibo).

---

## 🇲🇽 Adaptación México Profundo

### 1. Realidad Laboral Mexicana

La mayoría de las PyMEs:

- Pagan en efectivo (sin nómina formal).
- Tienen trabajadores "de confianza" (sin IMSS).
- Solo formalizan cuando son auditadas.

Nuestro mensaje:

**❌ MAL:**
> "⚠️ Tus empleados deben estar dados de alta en el IMSS. Es ilegal no hacerlo."

**✅ BIEN:**
> "Te ayudamos a formalizar tu nómina paso a paso. Aquí te decimos cómo dar de alta a tu equipo en el IMSS (tutorial 5 min)."

### 2. Simplicidad (No Ofrecer Todo)

En Fase 1, SOLO ofrecer:

- Cálculo de ISR/IMSS.
- Timbrado de recibos (CFDI Nómina).

**NO ofrecer** (hasta Fase 2):

- Gestión de incidencias (faltas, vacaciones).
- Cálculo de finiquitos/liquidaciones.
- Integración con SUA/IDSE del IMSS.

---

## 🔗 Referencias

- **Anexo 8 RMF (SAT):** Tablas de ISR vigentes (gratis, público).
- **GitHub:** Proyectos open source de nómina MX.
- **Finkok PAC:** Timbrado de CFDI Nómina ($1.50/recibo).
- **UMA 2025:** $108.57 MXN (Unidad de Medida y Actualización).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Open Source + Adaptación)*

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Empleados y Nómina

Estructura necesaria para soportar el Complemento de Nómina 1.2 del SAT.

```typescript
// src/lib/server/db/schema/payroll.ts
import { pgTable, text, timestamp, numeric, uuid, date, integer } from 'drizzle-orm/pg-core';

export const employees = pgTable('payroll_employees', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: text('company_id').notNull(), // Empleador
  curp: text('curp').notNull().unique(),
  rfc: text('rfc').notNull(),
  nss: text('nss').notNull(), // Número Seguridad Social
  startDate: date('start_date').notNull(), // Fecha inicio relación laboral
  jobRisk: text('job_risk'), // Clase de riesgo (I, II, III, IV, V)
  contractType: text('contract_type').notNull(), // 01, 02, etc. (Catálogo SAT)
  dailySalary: numeric('daily_salary').notNull(), // Salario Diario Integrado
  paymentFrequency: text('payment_frequency').notNull(), // Semanal, Quincenal
});

export const payrollReceipts = pgTable('payroll_receipts', {
  id: uuid('id').defaultRandom().primaryKey(),
  employeeId: uuid('employee_id').references(() => employees.id),
  periodStart: date('period_start').notNull(),
  periodEnd: date('period_end').notNull(),
  paymentDate: date('payment_date').notNull(),

  grossAmount: numeric('gross_amount').notNull(),
  netAmount: numeric('net_amount').notNull(),

  // Retenciones
  isrRetained: numeric('isr_retained').default('0'),
  imssRetained: numeric('imss_retained').default('0'),

  uuidSat: text('uuid_sat'), // UUID del Timbre Fiscal Digital
  status: text('status').default('DRAFT'), // 'DRAFT', 'STAMPED', 'CANCELLED'
});
```

### 2. Tablas de ISR (Ejemplo de Seed)

Necesitamos cargar las tablas de ISR vigentes (Anexo 8 de la RMF).

```typescript
// src/lib/server/payroll/tables.ts
export const ISR_TABLES_2025_QUINCENAL = [
  { lowerLimit: 0.01, fixedFee: 0.00, percent: 1.92 },
  { lowerLimit: 368.11, fixedFee: 7.05, percent: 6.40 },
  // ... resto de la tabla
];

export function calculateIsr(taxableIncome: number) {
  // Lógica de búsqueda en tabla y cálculo
}
```

---

## 🔗 Referencias Normativas

- **Ley Federal del Trabajo (LFT):** Prestaciones mínimas.
- **Ley del Seguro Social (LSS):** Cuotas obrero-patronales.
- **Guía de llenado del comprobante del recibo de pago de nómina (SAT).**

---

*Última actualización: 9 Diciembre 2025*
