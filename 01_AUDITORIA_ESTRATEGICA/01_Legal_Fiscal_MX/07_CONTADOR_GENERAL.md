# 👨‍💼 Perfil 07: Founder como "Contador Básico" + ChatGPT (Ex-Contador General)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Contador Público Certificado por $40k-60k MXN/mes para diseñar el Catálogo de Cuentas y generar Estados Financieros."

### ✅ La Verdad Sin Dinero:

**El Founder debe aprender Contabilidad Básica.** No necesitas ser Contador Público Certificado para entender:

- Partida Doble (Debe = Haber)
- Catálogo de Cuentas del SAT (Código Agrupador)
- Balance General y Estado de Resultados

**Estrategia de aprendizaje:**

1. Curso de Contabilidad Básica (Udemy: $200 MXN, 10 horas).
2. ChatGPT para dudas específicas ("Explica qué es una póliza de diario").
3. Consultar el **Código Fiscal de la Federación** (gratis, público).

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Diseñar Catálogo de Cuentas | Usar plantilla del SAT (Código Agrupador oficial) | $0 |
| Generar pólizas automáticas | Algoritmo en ElysiaJS (a partir de CFDIs) | $0 |
| Balance General / Edo Resultados | Chart.js + Svelte (frontend) | $0 |
| Asesoría contable puntual | Contador freelance (bajo demanda) | $3k-5k/mes |

**Cuándo contratar Contador de planta:** Cuando tengamos $100k MXN/mes de MRR. Pago: 10% de ingresos o equity.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Concepto de Contabilidad | ✅ General | `PROJECT_CHARACTERISTICS/00_INDICE_GENERAL.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| CON-001 | **Catálogo de Cuentas SAT (Seeds)** | 🔴 Bloqueante | JSON → PostgreSQL | $0 | Sem 1 |
| CON-002 | **Motor de Pólizas Automáticas** | 🔴 Bloqueante | ElysiaJS + Drizzle | $0 | Sem 2 |
| CON-003 | Balanza de Comprobación (XML SAT) | 🟠 Alto | Backend (Feature) | $0 | Sem 3 |
| CON-004 | Dashboard Financiero (Charts) | 🟠 Alto | Svelte + Chart.js | $0 | Fase 2 |
| CON-005 | ~~Contratar Contador General~~ | ❌ Descartado | N/A | $40k/mes ⛔ | Solo con $100k MRR |

---

## 📝 ACTION ITEMS: Implementación (Stack Gratuito)

### 1. Seeds del Catálogo de Cuentas SAT

El SAT publica el **Código Agrupador** oficial (Anexo 24).

```json
// seeds/catalogo-cuentas-sat.json
[
  { "code": "101.01", "name": "Caja", "type": "ASSET" },
  { "code": "102.01", "name": "Bancos", "type": "ASSET" },
  { "code": "103.01", "name": "Inversiones temporales", "type": "ASSET" },
  { "code": "105.01", "name": "Clientes", "type": "ASSET" },
  { "code": "201.01", "name": "Proveedores", "type": "LIABILITY" },
  { "code": "301.01", "name": "Capital social", "type": "EQUITY" },
  { "code": "401.01", "name": "Ingresos", "type": "REVENUE" },
  { "code": "601.01", "name": "Gastos de operación", "type": "EXPENSE" }
]
```

### 2. Schema de Contabilidad Core

```typescript
// src/lib/server/db/schema/accounting.ts
import { pgTable, text, timestamp, numeric, uuid, integer } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounting_accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: text('company_id').notNull(),
  code: text('code').notNull(), // '100-01-000'
  satGroupingCode: text('sat_grouping_code').notNull(), // '101.01' (Caja)
  name: text('name').notNull(),
  type: text('type').notNull(), // 'ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'
  balance: numeric('balance').default('0'),
});

export const journalEntries = pgTable('accounting_journal_entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: text('company_id').notNull(),
  date: timestamp('date').notNull(),
  type: text('type').notNull(), // 'Dr' (Diario), 'Ig' (Ingreso), 'Eg' (Egreso)
  concept: text('concept').notNull(),
  folio: text('folio').notNull(), // Consecutivo
  relatedUuid: text('related_uuid'), // UUID del CFDI asociado
});

export const journalLines = pgTable('accounting_journal_lines', {
  id: uuid('id').defaultRandom().primaryKey(),
  entryId: uuid('entry_id').references(() => journalEntries.id),
  accountId: uuid('account_id').references(() => accounts.id),
  debit: numeric('debit').default('0'), // Debe
  credit: numeric('credit').default('0'), // Haber
});
```

### 3. Generador de Pólizas Automáticas

Cuando el sistema descarga un CFDI del SAT, genera automáticamente la póliza contable.

```typescript
// src/lib/server/accounting/auto-poliza.ts
export async function generatePolicyFromCFDI(cfdi: CFDI) {
  if (cfdi.type === 'INGRESO') {
    // Póliza de Ingreso
    const entry = await db.insert(journalEntries).values({
      type: 'Ig',
      concept: `Factura ${cfdi.folio} - ${cfdi.client.name}`,
      folio: generateFolio('Ig'),
      relatedUuid: cfdi.uuid,
    });

    // Asiento: Debe (Clientes) / Haber (Ingresos + IVA)
    await db.insert(journalLines).values([
      { entryId: entry.id, accountId: CLIENTES_ID, debit: cfdi.total },
      { entryId: entry.id, accountId: INGRESOS_ID, credit: cfdi.subtotal },
      { entryId: entry.id, accountId: IVA_ID, credit: cfdi.vat },
    ]);
  }
}
```

---

## 💡 Mentalidad Bootstrap: Founder Aprende Contabilidad Básica

### Plan de Autoaprendizaje (2 semanas):

1. **Curso Udemy:** "Contabilidad Básica para Emprendedores" ($200 MXN, 10 horas).
2. **Leer:** "Contabilidad para Dummies" (versión México).
3. **Consultar:** Código Fiscal de la Federación (CFF) - Anexo 24 (Catálogo SAT).
4. **Practicar:** Generar manualmente 10 pólizas de ejemplo.

### Cuándo contratar Contador de planta:

- **Trigger:** $100k MXN/mes de MRR.
- **Modelo de pago:** 10% de ingresos o equity (no sueldo fijo).
- **Perfil:** Contador Público recién egresado que quiera aprender startups.

### Asesoría Puntual:

- **Freelance en LinkedIn:** $3k-5k MXN/mes (revisión mensual de contabilidad).
- **Consultoría bajo demanda:** Solo si hay auditoría del SAT.

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje Anti-Técnico

El usuario NO sabe qué es una "póliza contable" o "partida doble".

**❌ MAL:**
> "Genera tu balanza de comprobación conforme a la NIF A-3 para cumplir con el Artículo 33 del CFF."

**✅ BIEN:**
> "Aquí están todos tus movimientos de dinero (entradas y salidas) organizados para el SAT."

### 2. Visualización Simple (No Tablas Complejas)

Mostrar el Balance General con iconos y colores.

```svelte
<div class="balance-visual">
  <div class="assets">
    💵 Lo que TIENES: $150,000 MXN
    <small>(Banco + Clientes que te deben)</small>
  </div>
  <div class="liabilities">
    💳 Lo que DEBES: $50,000 MXN
    <small>(Proveedores + Impuestos)</small>
  </div>
  <div class="equity">
    ✅ Tu Dinero Real: $100,000 MXN
  </div>
</div>
```

---

## 🔗 Referencias

- **Anexo 24 del SAT:** Catálogo de Cuentas (Código Agrupador oficial).
- **Udemy:** Cursos de contabilidad básica ($200-500 MXN).
- **NIF (Normas de Información Financiera):** CINIF (no obligatorio para PyMEs).
- **CFF (Código Fiscal de la Federación):** Artículo 33 (Contabilidad Electrónica).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Founder como Contador Temporal)*

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Contabilidad Core

El corazón del sistema contable: Cuentas y Pólizas.

```typescript
// src/lib/server/db/schema/accounting.ts
import { pgTable, text, timestamp, numeric, uuid, integer, boolean } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounting_accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: text('company_id').notNull(),
  code: text('code').notNull(), // Ej. '100-01-000'
  satGroupingCode: text('sat_grouping_code').notNull(), // Ej. '101.01' (Caja)
  name: text('name').notNull(),
  type: text('type').notNull(), // 'ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE'
  level: integer('level').notNull(), // 1, 2, 3
  parentId: uuid('parent_id'), // Para jerarquía
  balance: numeric('balance').default('0'),
});

export const journalEntries = pgTable('accounting_journal_entries', { // Pólizas
  id: uuid('id').defaultRandom().primaryKey(),
  companyId: text('company_id').notNull(),
  date: timestamp('date').notNull(),
  type: text('type').notNull(), // 'Dr' (Diario), 'Ig' (Ingreso), 'Eg' (Egreso)
  concept: text('concept').notNull(),
  folio: text('folio').notNull(), // Consecutivo

  // Metadatos fiscales
  relatedUuid: text('related_uuid'), // UUID del CFDI asociado
});

export const journalLines = pgTable('accounting_journal_lines', { // Movimientos
  id: uuid('id').defaultRandom().primaryKey(),
  entryId: uuid('entry_id').references(() => journalEntries.id),
  accountId: uuid('account_id').references(() => accounts.id),
  debit: numeric('debit').default('0'), // Debe
  credit: numeric('credit').default('0'), // Haber
  reference: text('reference'),
});
```

### 2. Lógica de Asientos Automáticos

El sistema debe generar pólizas automáticamente a partir de los XMLs.

```typescript
// src/lib/server/accounting/automation.ts
export async function createEntryFromExpense(cfdi: CFDI) {
  // 1. Identificar cuenta de gasto (basado en proveedor o producto)
  const expenseAccount = await resolveAccount(cfdi.items[0]);

  // 2. Crear Póliza de Egreso
  // Cargo a Gasto
  // Cargo a IVA Acreditable
  // Abono a Bancos / Proveedores
}
```

---

## 🔗 Referencias Normativas

- **NIF A-2:** Postulados básicos (Sustancia económica, Entidad económica, Devengación contable).
- **Anexo 24 RMF:** Contabilidad Electrónica (XML de Balanza y Catálogo).

---

*Última actualización: 9 Diciembre 2025*
