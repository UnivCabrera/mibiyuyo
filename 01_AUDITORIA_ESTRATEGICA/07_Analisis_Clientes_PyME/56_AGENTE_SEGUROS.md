# 🛡️ PERFIL 56: AGENTE DE SEGUROS - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME) | **Tanda:** 1 (Servicios Profesionales) | **Fecha:** 9 Dic 2025
**Perfil:** NUEVO (no existe en docs previos)

---

## 1. 😰 DOLOR REAL

> **"Vendo pólizas de GNP, Metlife y AXA. Cada aseguradora me deposita comisiones quincenales con retención del 10% ISR. GNP me manda el XML por correo, Metlife por portal, AXA por Dropbox. Tengo 47 XMLs de retenciones de 2025 sin conciliar. En marzo 2026 debo presentar DIOT. Mi contador me cobra $15k extra por 'conciliar manualmente' los XMLs. No tengo tiempo ni Excel que aguante esto."**

**Problema específico:** 3 aseguradoras × 24 quincenas × 3 retenciones por pago = **216 XMLs/año** sin automatizar.

---

## 2. 🎯 MÓDULO CRÍTICO

**"Conciliador de XMLs de Retenciones de Aseguradoras + DIOT Automático"**

### ¿Qué Resuelve?

1. **Upload masivo de XMLs** (arrastra carpeta con 50 XMLs → sube todos)
2. **Parsing automático** (lee RFC, monto, retención de cada XML)
3. **Matching con facturas emitidas** (cruza XML con tu CFDI de comisiones)
4. **Dashboard:** "$180k de comisiones, $18k retenidos, $162k netos"
5. **Exportar DIOT** (formato SAT con 1 click)

---

### Schema PostgreSQL

```typescript
export const insuranceRetentions = pgTable('insurance_retentions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  insuranceCompany: varchar('insurance_company', { length: 255 }).notNull(), // GNP, Metlife, AXA
  insuranceRfc: varchar('insurance_rfc', { length: 13 }).notNull(),
  retentionUuid: varchar('retention_uuid', { length: 36 }).notNull().unique(),
  retentionXml: text('retention_xml').notNull(),

  // Datos del XML
  commissionAmount: decimal('commission_amount', { precision: 10, scale: 2 }).notNull(),
  retentionIsr: decimal('retention_isr', { precision: 10, scale: 2 }).notNull(), // 10% típico
  retentionIva: decimal('retention_iva', { precision: 10, scale: 2 }).default('0'),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }).notNull(),

  // Fechas
  retentionDate: timestamp('retention_date').notNull(),

  // Matching
  matchedInvoiceId: integer('matched_invoice_id').references(() => invoices.id),
  matched: boolean('matched').default(false),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### Endpoint ElysiaJS: Upload Masivo de XMLs

```typescript
// POST /api/v1/insurance/retentions/upload-batch
.post('/upload-batch', async ({ body, user }) => {
  const { xmlFiles } = body; // Array de XMLs en base64

  const results = [];

  for (const xmlBase64 of xmlFiles) {
    const xmlString = Buffer.from(xmlBase64, 'base64').toString('utf-8');

    // Parse XML (usando librería xml2js o similar)
    const parsedXml = await parseRetentionXml(xmlString);

    // Extraer datos
    const retentionData = {
      userId: user.id,
      insuranceCompany: parsedXml.emisor.nombre,
      insuranceRfc: parsedXml.emisor.rfc,
      retentionUuid: parsedXml.uuid,
      retentionXml: xmlString,
      commissionAmount: parsedXml.totales.montoTotal,
      retentionIsr: parsedXml.impuestos.retenciones.isr,
      retentionIva: parsedXml.impuestos.retenciones.iva || 0,
      netAmount: parsedXml.totales.montoTotal - parsedXml.impuestos.retenciones.isr,
      retentionDate: new Date(parsedXml.fecha),
    };

    // Verificar si ya existe (por UUID)
    const existing = await db.query.insuranceRetentions.findFirst({
      where: eq(insuranceRetentions.retentionUuid, retentionData.retentionUuid),
    });

    if (existing) {
      results.push({ uuid: retentionData.retentionUuid, status: 'duplicate' });
      continue;
    }

    // Guardar
    await db.insert(insuranceRetentions).values(retentionData);
    results.push({ uuid: retentionData.retentionUuid, status: 'imported' });
  }

  return {
    success: true,
    imported: results.filter(r => r.status === 'imported').length,
    duplicates: results.filter(r => r.status === 'duplicate').length,
    total: results.length,
  };
})

// GET /api/v1/insurance/retentions/diot-export
.get('/diot-export', async ({ user, query }) => {
  const { year } = query;

  const retentions = await db.query.insuranceRetentions.findMany({
    where: (retentions, { and, eq, gte, lte }) =>
      and(
        eq(retentions.userId, user.id),
        gte(retentions.retentionDate, new Date(`${year}-01-01`)),
        lte(retentions.retentionDate, new Date(`${year}-12-31`))
      ),
  });

  // Agrupar por aseguradora
  const diotData = {};
  retentions.forEach(ret => {
    if (!diotData[ret.insuranceRfc]) {
      diotData[ret.insuranceRfc] = {
        rfc: ret.insuranceRfc,
        nombre: ret.insuranceCompany,
        totalComisiones: 0,
        totalRetenciones: 0,
      };
    }
    diotData[ret.insuranceRfc].totalComisiones += Number(ret.commissionAmount);
    diotData[ret.insuranceRfc].totalRetenciones += Number(ret.retentionIsr);
  });

  // Generar archivo DIOT (formato txt pipe-delimited SAT)
  const diotLines = Object.values(diotData).map(item => {
    return `03|${item.rfc}|${item.nombre}|MEXICO|||15|${item.totalComisiones}|0|0|0|0|0|${item.totalRetenciones}|0|0|0`;
  });

  const diotContent = diotLines.join('\n');

  return {
    success: true,
    diotContent,
    filename: `DIOT_${year}.txt`,
  };
})
```

---

## 3. 📢 ESTRATEGIA BOOTSTRAP

### Canal #1: Asociaciones de Agentes de Seguros

**Target:** AMASFAC (Asociación Mexicana de Agentes de Seguros y Fianzas)

**Estrategia:** Ponencia gratuita "Cómo Automatizar el DIOT de Retenciones" en congreso anual.

---

### Canal #2: Grupos LinkedIn Seguros

**Post tipo:**

> "Agentes de seguros: ¿Cuánto te cobra tu contador por conciliar XMLs de GNP/Metlife/AXA?
> A mí me cobraban $15k. Ahora lo hago en 5 minutos con esta herramienta.
> DM si quieres ver cómo."

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Upsell Plan BUSINESS ($399/mes)

**Target:** Agencias de seguros con 5+ agentes

**Features:**

- ✅ Multi-agente (consolidado de toda la agencia)
- ✅ DIOT consolidado (un archivo para todos)
- ✅ Dashboard gerencial (comisiones por agente)

---

## 5. ⚙️ IMPLEMENTACIÓN

**Prioridad:** 🟡 MEDIA-ALTA (nicho específico, buen willingness to pay)
**Complejidad:** ⭐⭐⭐⭐☆ (4/5) - Parsing XML complejo, formato DIOT delicado
**Tiempo:** 8-10 días

---

## 💰 MODELO NEGOCIO

| Plan | Precio | Target |
|:---|:-:|:---|
| **PRO** | $299/mes | Agente individual |
| **BUSINESS** | $499/mes | Agencia 5+ agentes |

**ROI:** Ahorro $15k/año contador + tiempo 20 hrs/año = $25k/año

---

**Próximo:** 57 - Programador/Diseñador RESICO
