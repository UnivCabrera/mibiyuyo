# 👨‍💼 Perfil 05: Motor de Conciliación Automatizado (Ex-Auditor Forense)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Auditor Forense certificado por $50k-70k MXN/mes para detectar fraudes y conciliar cuentas."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** La detección de discrepancias es **100% automatizable**. Un algoritmo puede comparar:

- SAT (CFDIs emitidos/recibidos)
- Banco (Movimientos descargados vía Finerio Connect)
- Contabilidad interna (Pólizas)

Si hay diferencias > $500 MXN, se dispara alerta automática vía WhatsApp.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Conciliación Bancos vs SAT | Algoritmo en ElysiaJS | $0 |
| Detección de EFOS | Cruce con Lista 69-B (ya implementado) | $0 |
| Alertas de fraude | WhatsApp API (Baileys) | $50/mes |
| Auditoría humana | Solo bajo demanda (si hay fraude real) | $5k-10k/evento |

**Cuándo contratar:** NUNCA. Este rol es 100% automatizable.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Logs de sistema | ✅ Básico | `00_ARQUITECTURA_CENTRAL/02_BLUEPRINTS_VISUALES.md` |
| Integridad de datos | ✅ Básico | Foreign Keys en PostgreSQL |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| FOR-001 | **Motor de Conciliación (SAT vs Banco)** | 🔴 Bloqueante | ElysiaJS + Drizzle | $0 | Sem 2 |
| FOR-002 | **Alertas WhatsApp Automáticas** | 🟠 Alto | Baileys API | $50/mes | Sem 3 |
| FOR-003 | ~~Logs Inmutables (Blockchain)~~ | ⏸️ Diferido | N/A | Caro ⛔ | Fase 3 (overkill) |
| FOR-004 | ~~Contratar Auditor Forense~~ | ❌ Descartado | N/A | $50k/mes ⛔ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Conciliación y Discrepancias

Necesitamos almacenar los resultados de comparar lo que dice el SAT (CFDIs) vs lo que dice el Banco (Movimientos) vs lo que dice la Contabilidad interna.

```typescript
// src/lib/server/db/schema/forensics.ts
import { pgTable, text, timestamp, numeric, uuid, jsonb, boolean } from 'drizzle-orm/pg-core';

export const reconciliationDiscrepancies = pgTable('forensics_discrepancies', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  period: text('period').notNull(), // '2025-01'
  type: text('type').notNull(), // 'SAT_VS_BANK', 'SAT_VS_ACCOUNTING'

  satAmount: numeric('sat_amount', { precision: 12, scale: 2 }).default('0'),
  bankAmount: numeric('bank_amount', { precision: 12, scale: 2 }).default('0'),
  difference: numeric('difference', { precision: 12, scale: 2 }).notNull(),

  status: text('status').default('OPEN'), // 'OPEN', 'JUSTIFIED', 'RESOLVED'
  justification: text('justification'),
  detectedAt: timestamp('detected_at').defaultNow(),
});

export const fraudAlerts = pgTable('forensics_alerts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  severity: text('severity').notNull(), // 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
  ruleId: text('rule_id').notNull(), // 'UNUSUAL_EXPENSE_VOLUME'
  details: jsonb('details'),
  isResolved: boolean('is_resolved').default(false),
});
```

### 2. Lógica de Detección (Ejemplo)

```typescript
// src/lib/server/forensics/analyzer.ts
export async function analyzeMonthlyDiscrepancy(userId: string, month: string) {
  const satIncome = await getSatIncome(userId, month);
  const bankDeposits = await getBankDeposits(userId, month);

  const diff = satIncome.minus(bankDeposits).abs();

  // Umbral de tolerancia (ej. $100 MXN)
  if (diff.greaterThan(100)) {
    await db.insert(reconciliationDiscrepancies).values({
      userId,
      period: month,
      type: 'SAT_VS_BANK',
      satAmount: satIncome.toString(),
      bankAmount: bankDeposits.toString(),
      difference: diff.toString(),
    });

    // Enviar alerta vía WhatsApp
    await sendWhatsApp(user.phone, `⚠️ Detectamos una diferencia de $${diff} MXN entre tus facturas (SAT) y tu banco. ¿Quieres revisarlo?`);
  }
}
```

---

## 💡 Mentalidad Bootstrap: Automatización Total

### Qué hace el Sistema (automatizado):

1. **Cada fin de mes:** Ejecutar análisis de discrepancias (Cron Job).
2. **Si diferencia > $500 MXN:** Enviar alerta automática vía WhatsApp.
3. **Dashboard:** Mostrar semaforo (Verde/Amarillo/Rojo) según nivel de discrepancia.

### Cuándo contratar auditor humano:

- **NUNCA de planta.** Solo bajo demanda si:
  - Sospecha de fraude real (interno o externo).
  - Auditoría legal (SAT, IMSS, etc.).
- **Costo estimado:** $5k-10k MXN por evento (2-3 veces al año).

### Herramientas Open Source:

- **Algoritmo de detección:** Lógica custom en ElysiaJS.
- **Baileys (WhatsApp API):** Para alertas ($50/mes).
- **PostgreSQL:** Para almacenar discrepancias.

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje Anti-Pánico

Las discrepancias NO siempre son fraude. Pueden ser:

- Facturas cobradas en quincena siguiente.
- Depósitos en efectivo no registrados.
- Errores humanos al capturar.

**❌ MAL:**
> "⚠️ FRAUDE DETECTADO: Discrepancia de $5,000 MXN. Contacta a un auditor forense inmediatamente."

**✅ BIEN:**
> "Nota: Encontramos una diferencia de $5,000 MXN entre tus facturas y tu banco. ¿Quieres que te ayudemos a revisarlo? [Ver detalles]"

### 2. Tolerancia Cultural (Economía Informal)

En México, es común:

- Cobrar en efectivo (no pasa por banco).
- Tener ingresos "extra" no facturados.

La plataforma debe **educar**, no **juzgar**.

```svelte
<Alert variant="warning">
  💵 Detectamos $3,000 MXN que no están en tu banco. ¿Cobraste en efectivo?
  <Button variant="link">Sí, cobré en efectivo</Button>
  <Button variant="link">No, quiero investigar</Button>
</Alert>
```

---

## 🔗 Referencias

- **Finerio Connect:** Open Banking para descarga de movimientos bancarios.
- **Baileys (WhatsApp API):** https://github.com/WhiskeySockets/Baileys (Open Source).
- **Algorithmic Fraud Detection:** Técnicas básicas (thresholds, anomalies).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Automatización 100%, Cero Personal)*
      type: 'SAT_VS_BANK',
      satAmount: satIncome.toString(),
      bankAmount: bankDeposits.toString(),
      difference: diff.toString(),
      status: 'OPEN'
    });
  }
}
```

---

## 🔗 Referencias

- **NIA 240:** Responsabilidades del auditor en la auditoría de estados financieros con respecto al fraude.
- **CFF:** Discrepancia fiscal (gastos > ingresos declarados).

---

*Última actualización: 9 Diciembre 2025*
