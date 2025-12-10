# 🧠 PERFIL 55: PSICÓLOGO / NUTRIÓLOGO / TERAPEUTA - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME) | **Tanda:** 1 (Servicios Profesionales) | **Fecha:** 9 Dic 2025
**Base:** Expansión Perfil 7 `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL

> **"Atiendo 8 pacientes a la semana ($800/sesión). Algunos pagan al mes (4 sesiones juntas), otros por sesión, otros en efectivo. Al final del mes no sé cuánto me pagaron realmente vs cuánto me deben. Mi Excel tiene 3 versiones distintas y ninguna cuadra. Gano $25k/mes pero siento que debería ser más."**

**Problema específico:** Tracking manual de sesiones + cobro inconsistente = descontrol total.

---

## 2. 🎯 MÓDULO CRÍTICO

**"Agenda de Sesiones con Facturación Automática Post-Sesión"**

### ¿Qué Resuelve?

1. Agenda de pacientes con historial de sesiones
2. Cobro automático (recordatorio WhatsApp)
3. Factura generada al finalizar sesión
4. Dashboard: "Julio: 32 sesiones, $25,600 cobrados, $3,200 pendientes"

---

### Schema PostgreSQL

```typescript
export const therapySessions = pgTable('therapy_sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientRfc: varchar('patient_rfc', { length: 13 }),
  sessionDate: timestamp('session_date').notNull(),
  sessionType: varchar('session_type', { length: 100 }), // Individual, Pareja, Familiar
  fee: decimal('fee', { precision: 8, scale: 2 }).notNull(),
  paymentStatus: varchar('payment_status', { length: 20 }).default('pending'), // pending | paid | overdue
  invoiced: boolean('invoiced').default(false),
  invoiceId: integer('invoice_id').references(() => invoices.id),
  notes: text('notes'), // Notas clínicas (encriptadas)
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### Endpoint ElysiaJS: Generar Factura Post-Sesión

```typescript
// POST /api/v1/therapy/sessions/:id/complete
.post('/:id/complete', async ({ params, user }) => {
  const sessionId = parseInt(params.id);

  const session = await db.query.therapySessions.findFirst({
    where: eq(therapySessions.id, sessionId),
  });

  if (!session || session.userId !== user.id) {
    throw new Error('Sesión no encontrada');
  }

  // Generar factura CFDI
  const conceptos = [{
    claveProdServ: '85121900', // Servicios de psicología (SAT)
    cantidad: 1,
    claveUnidad: 'E48',
    descripcion: `Sesión ${session.sessionType} - ${new Date(session.sessionDate).toLocaleDateString('es-MX')}`,
    valorUnitario: Number(session.fee),
    importe: Number(session.fee),
  }];

  const cfdi = await generateCFDI({
    userId: user.id,
    receptorRfc: session.patientRfc || 'XAXX010101000',
    receptorNombre: session.patientName,
    conceptos,
    formaPago: '01',
    metodoPago: 'PUE',
  });

  // Guardar factura
  const [invoice] = await db.insert(invoices).values({
    userId: user.id,
    cfdiUuid: cfdi.uuid,
    cfdiXml: cfdi.xml,
    cfdiPdf: cfdi.pdf,
    total: session.fee,
    status: 'active',
  }).returning();

  // Actualizar sesión
  await db.update(therapySessions)
    .set({
      invoiced: true,
      invoiceId: invoice.id,
      paymentStatus: 'paid',
    })
    .where(eq(therapySessions.id, sessionId));

  // Enviar factura por WhatsApp
  await sendWhatsApp(session.patientPhone, `Hola ${session.patientName}, adjunto tu factura de la sesión. Gracias por tu confianza.`, {
    attachment: cfdi.pdf,
  });

  return {
    success: true,
    invoice: {
      uuid: cfdi.uuid,
      total: Number(session.fee),
    },
  };
})
```

---

## 3. 📢 ESTRATEGIA BOOTSTRAP

### Canal #1: Grupos Facebook Psicólogos MX

**Target:** "Psicólogos Independientes México" (15k miembros)

**Post:**

> "¿Cuántos pacientes te deben dinero y no lo sabes? 🤔
> Hice una herramienta que trackea sesiones + cobra + factura automáticamente.
> Primer mes gratis. DM."

---

### Canal #2: LinkedIn + Contenido Educativo

**Serie posts:** "3 Errores Fiscales de los Psicólogos"

1. No facturar sesiones en efectivo (riesgo SAT)
2. No cobrar a tiempo (cashflow irregular)
3. No tener historial de sesiones (auditoría)

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Upsell Plan BUSINESS ($399/mes)

**Target:** Psicólogos con consultorio compartido (2-3 terapeutas)

**Features:**

- ✅ Multi-terapeuta (cada uno su agenda)
- ✅ Compartir sala (evitar traslapes)
- ✅ Reportes consolidados

---

## 5. ⚙️ IMPLEMENTACIÓN

**Prioridad:** 🟡 MEDIA (segmento grande, pero ticket moderado)
**Complejidad:** ⭐⭐☆☆☆ (2/5) - Schema simple, lógica clara
**Tiempo:** 5-7 días

---

## 💰 MODELO NEGOCIO

| Plan | Precio | Target |
|:---|:-:|:---|
| **PRO** | $249/mes | Terapeuta individual |
| **BUSINESS** | $399/mes | Consultorio compartido |

**ROI:** Ahorro $8k/mes contador + cobro puntual = $100k/año

---

**Próximo:** 56 - Agente de Seguros
