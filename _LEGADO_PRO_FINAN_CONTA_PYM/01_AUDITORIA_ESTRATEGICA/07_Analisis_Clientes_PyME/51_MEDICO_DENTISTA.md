# 🩺 PERFIL 51: MÉDICO / DENTISTA - Análisis Cliente PyME

**Bloque:** G (Análisis Clientes PyME)
**Tanda:** 1 (Servicios Profesionales)
**Fecha:** 9 Diciembre 2025
**Base:** Expansión de Perfiles 1 y 36 de `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL (Pain Point SAT)

### El Problema Específico

**NO es:** "Odio pagar impuestos" (genérico)

**SÍ es:**

> **"Me odio en la consulta del martes, una paciente me paga $1,500 en efectivo por una endodoncia. El viernes, GNP me deposita $8,200 por 3 consultas del mes pasado. El sábado trabajo en el Hospital Ángeles y me llega un cheque de $12,000 con retención del 10%. Son las 11pm del domingo y no sé cuánto dinero es REALMENTE MÍO vs cuánto debo apartar para el SAT. Termino con ansiedad cada mes."**

---

### Desglose del Dolor

| Fuente de Ingreso | Frecuencia | Modalidad | Complejidad Fiscal |
|:---|:-:|:---|:-:|
| **Consultas privadas (efectivo)** | Diario | $500-2,000 | 🟡 Sin retención |
| **Aseguradoras (GNP, Metlife, etc.)** | Quincenal | $5,000-20,000 | 🔴 Retención 10% ISR |
| **Hospital (nómina)** | Mensual | $10,000-30,000 | 🔴 Retención + complemento nómina |
| **Cirugías programadas** | Esporádico | $15,000-50,000 | 🔴 Anticipos + saldos |

**Total fuentes:** 4 diferentes con 3 regímenes fiscales distintos

---

### Impacto Neurociencia

| Neurotransmisor | Estado Actual | Síntoma Conductual |
|:---|:-:|:---|
| **Cortisol** | ⬆️ Elevado | Ansiedad anticipatoria (miedo a multas SAT) |
| **Dopamina** | ⬇️ Bajo | No siente recompensa por ganar bien |
| **Serotonina** | ⬇️ Irregular | Frustración ("¿Para qué trabajo tanto?") |
| **Carga Cognitiva** | 🔴 Sobrecarga | 4 cálculos mentales simultáneos |

**Resultado:** Evasión (meter efectivo bajo el colchón) o **sobre-pago** de contador ($8k-15k/mes)

---

## 2. 🎯 MÓDULO CRÍTICO (Killer Feature)

### Nombre del Módulo

**"Agenda Médica con Facturación Instantánea + Apartado ISR Automático"**

---

### ¿Qué Resuelve?

1. **Al finalizar la cita → Factura generada automáticamente**
2. **Envío por WhatsApp al paciente en < 30 segundos**
3. **Apartado automático del 30% para ISR** (reserva virtual intocable)
4. **Dashboard unificado:** "Hoy tengo $12,450 disponibles (ya aparté impuestos)"

---

### Especificación Técnica

#### A. Schema PostgreSQL

```typescript
// apps/backend/src/db/schema.ts (agregar)

export const medicalAppointments = pgTable('medical_appointments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  patientName: varchar('patient_name', { length: 255 }).notNull(),
  patientRfc: varchar('patient_rfc', { length: 13 }), // Opcional para facturar
  patientEmail: varchar('patient_email', { length: 255 }),
  patientPhone: varchar('patient_phone', { length: 20 }).notNull(), // Para WhatsApp

  // Datos de la cita
  appointmentDate: timestamp('appointment_date').notNull(),
  service: varchar('service', { length: 255 }).notNull(), // "Endodoncia", "Limpieza", etc.
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar('payment_method', { length: 50 }).default('cash'), // cash | card | transfer

  // Status
  status: varchar('status', { length: 20 }).default('scheduled'), // scheduled | completed | cancelled | no_show
  completedAt: timestamp('completed_at'),

  // Facturación
  invoiceId: integer('invoice_id').references(() => invoices.id),
  invoiced: boolean('invoiced').default(false),
  invoiceSentAt: timestamp('invoice_sent_at'),

  // Notas clínicas (opcional, encriptadas)
  notes: text('notes'),

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const isrReserves = pgTable('isr_reserves', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  sourceType: varchar('source_type', { length: 50 }).notNull(), // appointment | insurance | hospital | surgery
  sourceId: integer('source_id').notNull(), // FK a medical_appointments, etc.
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(), // Monto bruto
  isrReserve: decimal('isr_reserve', { precision: 10, scale: 2 }).notNull(), // 30% del bruto
  reservedAt: timestamp('reserved_at').defaultNow(),
  releasedAt: timestamp('released_at'), // Cuando se paga al SAT
  status: varchar('status', { length: 20 }).default('reserved'), // reserved | paid | released
});
```

---

#### B. Flujo de Facturación Automática

**Endpoint ElysiaJS:**

```typescript
// apps/backend/src/routes/medical/appointments.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { medicalAppointments, invoices, isrReserves } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { generateCFDI } from '../../services/sat/cfdi-generator';
import { sendWhatsApp } from '../../services/whatsapp/baileys-client';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const medicalAppointmentsRouter = new Elysia({ prefix: '/medical/appointments' })

  // POST /api/v1/medical/appointments/:id/complete
  .post('/:id/complete', async ({ params, user }) => {
    const appointmentId = parseInt(params.id);

    // 1. Obtener cita
    const appointment = await db.query.medicalAppointments.findFirst({
      where: eq(medicalAppointments.id, appointmentId),
    });

    if (!appointment || appointment.userId !== user.id) {
      throw new Error('Cita no encontrada');
    }

    // 2. Marcar cita como completada
    await db.update(medicalAppointments)
      .set({
        status: 'completed',
        completedAt: new Date()
      })
      .where(eq(medicalAppointments.id, appointmentId));

    // 3. Generar factura automáticamente
    const invoiceData = {
      userId: user.id,
      receptorRfc: appointment.patientRfc || 'XAXX010101000', // RFC genérico si no lo tiene
      receptorNombre: appointment.patientName,
      receptorEmail: appointment.patientEmail,
      conceptos: [
        {
          claveProdServ: '85121800', // Servicios médicos generales (SAT)
          cantidad: 1,
          claveUnidad: 'E48', // Servicio (SAT)
          descripcion: appointment.service,
          valorUnitario: Number(appointment.amount),
          importe: Number(appointment.amount),
        },
      ],
      formaPago: appointment.paymentMethod === 'cash' ? '01' : '03', // 01=Efectivo, 03=Transferencia
      metodoPago: 'PUE', // Pago en una sola exhibición
    };

    const cfdi = await generateCFDI(invoiceData);

    // 4. Guardar factura en BD
    const [invoice] = await db.insert(invoices).values({
      userId: user.id,
      cfdiUuid: cfdi.uuid,
      cfdiXml: cfdi.xml,
      cfdiPdf: cfdi.pdf,
      total: appointment.amount,
      status: 'active',
      createdAt: new Date(),
    }).returning();

    // 5. Vincular factura con cita
    await db.update(medicalAppointments)
      .set({
        invoiceId: invoice.id,
        invoiced: true,
        invoiceSentAt: new Date(),
      })
      .where(eq(medicalAppointments.id, appointmentId));

    // 6. Apartar 30% para ISR (reserva automática)
    const isrAmount = Number(appointment.amount) * 0.30;
    await db.insert(isrReserves).values({
      userId: user.id,
      sourceType: 'appointment',
      sourceId: appointmentId,
      amount: appointment.amount,
      isrReserve: isrAmount,
      status: 'reserved',
    });

    // 7. Enviar factura por WhatsApp al paciente
    if (appointment.patientPhone) {
      const whatsappMessage = `Hola ${appointment.patientName},\n\nGracias por tu consulta de ${appointment.service}.\n\nAdjunto tu factura (CFDI):\n${cfdi.pdf}\n\nCualquier duda, estoy a tus órdenes.\n\nDr. ${user.name}`;

      await sendWhatsApp(appointment.patientPhone, whatsappMessage, {
        attachment: cfdi.pdf,
      });
    }

    // 8. Enviar por email (backup)
    if (appointment.patientEmail) {
      await resend.emails.send({
        from: 'facturas@finanzasmx.com',
        to: appointment.patientEmail,
        subject: `Factura - ${appointment.service}`,
        html: `<p>Estimado(a) ${appointment.patientName},</p>
               <p>Adjunto su factura electrónica (CFDI).</p>
               <p>Gracias por su confianza.</p>`,
        attachments: [
          {
            filename: `factura_${cfdi.uuid}.pdf`,
            content: Buffer.from(cfdi.pdf, 'base64'),
          },
        ],
      });
    }

    return {
      success: true,
      invoice: {
        id: invoice.id,
        uuid: cfdi.uuid,
        total: appointment.amount,
        isrReserved: isrAmount,
      },
      message: 'Factura generada y enviada por WhatsApp',
    };
  })

  // GET /api/v1/medical/appointments/today-available
  .get('/today-available', async ({ user }) => {
    // Calcular dinero disponible HOY (después de apartar ISR)
    const totalIncome = await db.query.invoices.findMany({
      where: eq(invoices.userId, user.id),
      // Sumar total de ingresos
    });

    const totalReserved = await db.query.isrReserves.findMany({
      where: (reserves, { and, eq }) =>
        and(eq(reserves.userId, user.id), eq(reserves.status, 'reserved')),
      // Sumar total reservado
    });

    const totalIncomeAmount = totalIncome.reduce((sum, inv) => sum + Number(inv.total), 0);
    const totalReservedAmount = totalReserved.reduce((sum, res) => sum + Number(res.isrReserve), 0);

    const availableToday = totalIncomeAmount - totalReservedAmount;

    return {
      totalIncome: totalIncomeAmount,
      totalReserved: totalReservedAmount,
      availableToday,
      message: `Tienes $${availableToday.toFixed(2)} MXN disponibles hoy (ya apartamos $${totalReservedAmount.toFixed(2)} para ISR)`,
    };
  });
```

---

#### C. Componente Svelte (Frontend)

```svelte
<!-- apps/frontend/src/routes/medical/appointments/[id]/complete/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  let loading = $state(false);
  let success = $state(false);
  let invoiceData = $state<any>(null);

  async function completeAppointment() {
    loading = true;

    try {
      const response = await fetch(`/api/v1/medical/appointments/${$page.params.id}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        success = true;
        invoiceData = data.invoice;

        // Reproducir sonido de éxito (opcional)
        new Audio('/sounds/success.mp3').play();

        // Redirigir al dashboard después de 3 segundos
        setTimeout(() => {
          goto('/dashboard');
        }, 3000);
      } else {
        alert('Error al completar cita: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    } finally {
      loading = false;
    }
  }
</script>

<div class="complete-appointment">
  <h1>✅ Completar Cita</h1>

  {#if !success}
    <div class="pre-complete">
      <p>¿Deseas marcar esta cita como completada y generar la factura automáticamente?</p>

      <div class="actions">
        <button
          onclick={completeAppointment}
          disabled={loading}
          class="btn-primary"
        >
          {loading ? 'Generando factura...' : 'Sí, Completar y Facturar'}
        </button>
        <button onclick={() => goto('/medical/appointments')} class="btn-secondary">
          Cancelar
        </button>
      </div>
    </div>
  {:else}
    <div class="success-message">
      <h2>🎉 ¡Listo!</h2>
      <p>Factura generada exitosamente:</p>

      <div class="invoice-details">
        <p><strong>UUID:</strong> {invoiceData.uuid}</p>
        <p><strong>Total:</strong> ${invoiceData.total} MXN</p>
        <p><strong>Apartado ISR:</strong> ${invoiceData.isrReserved} MXN (30%)</p>
      </div>

      <p class="whatsapp-sent">📱 Factura enviada por WhatsApp al paciente</p>

      <p class="redirect-message">Regresando al dashboard...</p>
    </div>
  {/if}
</div>

<style>
  .complete-appointment {
    max-width: var(--size-content-2);
    margin: 0 auto;
    padding: var(--size-6);
  }

  .pre-complete {
    text-align: center;
  }

  .actions {
    display: flex;
    gap: var(--size-3);
    justify-content: center;
    margin-top: var(--size-4);
  }

  .btn-primary {
    padding: var(--size-3) var(--size-6);
    background: var(--green-6);
    color: white;
    border: none;
    border-radius: var(--radius-2);
    font-size: var(--font-size-2);
    cursor: pointer;
  }

  .btn-primary:hover {
    background: var(--green-7);
  }

  .btn-primary:disabled {
    background: var(--gray-5);
    cursor: not-allowed;
  }

  .btn-secondary {
    padding: var(--size-3) var(--size-6);
    background: var(--gray-3);
    color: var(--gray-9);
    border: none;
    border-radius: var(--radius-2);
    cursor: pointer;
  }

  .success-message {
    text-align: center;
    animation: fadeIn 0.5s;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .invoice-details {
    background: var(--surface-2);
    padding: var(--size-4);
    border-radius: var(--radius-2);
    margin: var(--size-4) 0;
  }

  .whatsapp-sent {
    color: var(--green-7);
    font-weight: bold;
    margin-top: var(--size-3);
  }

  .redirect-message {
    color: var(--gray-6);
    font-size: var(--font-size-0);
    margin-top: var(--size-3);
  }
</style>
```

---

#### D. Widget "Dinero Disponible Hoy"

```svelte
<!-- apps/frontend/src/lib/components/medical/AvailableTodayWidget.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let availableData = $state<any>(null);
  let loading = $state(true);

  onMount(async () => {
    const response = await fetch('/api/v1/medical/appointments/today-available', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    availableData = await response.json();
    loading = false;
  });
</script>

{#if loading}
  <div class="widget loading">
    <p>Calculando...</p>
  </div>
{:else if availableData}
  <div class="widget">
    <div class="amount">
      ${availableData.availableToday.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
    </div>
    <p class="label">Disponible HOY</p>
    <p class="sublabel">
      (Ya apartamos ${availableData.totalReserved.toLocaleString('es-MX')} para ISR)
    </p>

    <div class="progress-bar">
      <div
        class="progress-fill"
        style="width: {(availableData.availableToday / availableData.totalIncome) * 100}%"
      ></div>
    </div>

    <p class="reassurance">😌 Gasta sin culpa. Todo lo importante ya está apartado.</p>
  </div>
{/if}

<style>
  .widget {
    background: linear-gradient(135deg, var(--green-1), var(--blue-1));
    padding: var(--size-5);
    border-radius: var(--radius-3);
    text-align: center;
    box-shadow: var(--shadow-3);
  }

  .amount {
    font-size: var(--font-size-7);
    font-weight: bold;
    color: var(--green-9);
    margin-bottom: var(--size-2);
  }

  .label {
    font-size: var(--font-size-3);
    color: var(--gray-7);
    margin-bottom: var(--size-1);
  }

  .sublabel {
    font-size: var(--font-size-0);
    color: var(--gray-6);
    margin-bottom: var(--size-3);
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: var(--gray-3);
    border-radius: var(--radius-2);
    overflow: hidden;
    margin: var(--size-3) 0;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--green-6), var(--green-7));
    transition: width 0.5s ease;
  }

  .reassurance {
    font-size: var(--font-size-1);
    color: var(--green-8);
    margin-top: var(--size-2);
  }
</style>
```

---

## 3. 📢 ESTRATEGIA DE VENTA BOOTSTRAP (Sin Ads)

### Canal #1: Alianzas con Asociaciones Médicas (Gratis)

**Target:**

- Colegio de Cirujanos Dentistas (CDMX, Guadalajara, Monterrey)
- Asociación Mexicana de Médicos Generales
- Grupos de Facebook: "Médicos Emprendedores México" (15k miembros)

**Propuesta:**

> "Hola, soy [Nombre] de FinanzasMX. Desarrollé un software que automatiza la facturación post-consulta para médicos (se genera y envía por WhatsApp en 30 segundos). ¿Puedo hacer una demo gratuita de 10 minutos en su próxima reunión mensual?"

**Incentivo:**

- **Para la asociación:** 10% de descuento para todos sus miembros
- **Para el presidente:** 1 año gratis (testimonial)

---

### Canal #2: Grupos de WhatsApp de Residentes (Orgánico)

**Target:**

- Residentes de especialidades (último año) que están por abrir consultorio
- Buscar en Facebook grupos de "Residentes UNAM", "Residentes TEC", etc.

**Mensaje Directo:**

> "Hola colega, vi que estás por terminar la residencia. Cuando abras tu consultorio, vas a odiar la parte de facturación a aseguradoras. Hice una herramienta que lo automatiza (factura + WhatsApp en 30 seg). Te regalo 3 meses gratis para que la pruebes. ¿Te interesa?"

**Conversión esperada:** 15-20% (por ser target early career)

---

### Canal #3: LinkedIn con Contenido de Valor

**Estrategia:**

1. Publicar **micro-tutoriales** semanales:
   - "Cómo facturar a GNP sin morir en el intento"
   - "3 errores fiscales que cometen los dentistas"
   - "Cuánto debes apartar de cada consulta para el SAT"

2. **Hashtags:** #MédicoEmprendedor #DentistaIndependiente #ConsultorioPrivado

3. **Call to Action suave:**
   > "Si quieres automatizar esto, tengo una herramienta. DM y te cuento."

---

### Landing Page Específica

**URL:** `finanzasmx.com/medicos`

**Wireframe:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   🩺 FinanzasMX para Médicos y Dentistas                               │
│                                                                         │
│   "Dedica tu tiempo a tus pacientes, no a tus impuestos"               │
│                                                                         │
│   ┌──────────────────────────────────────────────────────────┐        │
│   │ 📹 VIDEO: Dr. Martínez (30 seg testimonial)              │        │
│   │ "Antes tardaba 15 min en facturar. Ahora son 30 seg."    │        │
│   └──────────────────────────────────────────────────────────┘        │
│                                                                         │
│   ✅ Agenda tu cita → Factura automática en WhatsApp                  │
│   ✅ Apartado automático del 30% para ISR                              │
│   ✅ Dashboard: "Cuánto tengo disponible HOY"                          │
│   ✅ Compatible con aseguradoras (GNP, Metlife, etc.)                 │
│                                                                         │
│   💰 Precio: $299/mes (vs $8,000/mes de contador tradicional)         │
│                                                                         │
│   [🎁 PROBAR GRATIS 30 DÍAS]    [📆 AGENDAR DEMO]                     │
│                                                                         │
│   🎓 Usado por 150+ médicos en México                                  │
│   ⭐⭐⭐⭐⭐ 4.8/5 en testimoniales                                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. 🔮 VISIÓN ESTRATÉGICA

### Prevención: Riesgo Fiscal 2026

**Problema:** Médicos que no facturan consultas en efectivo.

**Consecuencia:**

- SAT cruza información: Depósitos bancarios > ingresos facturados
- Carta invitación (auditoría) en 2026
- Multa del 55-75% del ingreso no declarado

**Solución FinanzasMX:**

> "Registra TODAS tus consultas (aunque sean efectivo). El sistema te sugiere cuándo facturar para no levantar banderas rojas del SAT."

**Alerta predictiva:**

```
⚠️ Llevás 15 consultas en efectivo sin facturar ($22,500 MXN).
Si depositas esto en tu banco sin facturarlo, el SAT lo va a notar.

Opciones:
1. Facturar a RFC genérico (XAXX010101000)
2. Llevar el efectivo de forma escalonada
3. Hablar con tu contador (te conectamos)
```

---

### Proyección: Venta de Plan Anual

**Momento óptimo:** Después de 3 meses de uso (ya confía en la herramienta).

**Propuesta:**

> "Dr. Martínez, he notado que facturaste $180,000 MXN en los últimos 3 meses. A este ritmo, vas a ganar ~$720,000/año.
>
> Si pagas anual, te ahorras $600 MXN (2 meses gratis) y te incluyo:
>
> - ✅ Asesoría fiscal 1-on-1 (1 hora con contador experto)
> - ✅ Simulador de escenarios: "¿Qué pasa si compro ese láser dental?"
> - ✅ Prioridad en soporte (WhatsApp directo)
>
> Plan Anual: $3,288 MXN (vs $3,588 mensual)"

**Conversión esperada:** 25-30% (médicos valoran la estabilidad)

---

### Upsell: Plan BUSINESS ($499/mes)

**Cuando tiene:**

- 2+ consultorios
- 1+ asistente/recepcionista
- > $80,000 MXN/mes en ingresos

**Features exclusivas:**

- ✅ Multi-usuario (asistente puede agendar citas)
- ✅ Reportes de productividad (consultas por día/semana)
- ✅ Integración con laboratorios (rayos X, análisis clínicos)
- ✅ Calculadora de ROI para equipos médicos

---

## 5. ⚙️ IMPLEMENTACIÓN TÉCNICA

### Prioridad

🔴 **ALTA** (Feature diferenciadora clave para captar médicos)

---

### Complejidad

⭐⭐⭐⭐☆ (4/5 estrellas)

**Razones:**

- Integración con sistema de facturación SAT (ya existe en Bloque B)
- Nuevo schema para citas médicas (simple)
- Lógica de apartado ISR (matemática básica)
- Envío WhatsApp (ya implementado en Bloque F)

**Desafíos:**

- Validación de RFC de pacientes (puede ser genérico)
- Optimización de tiempos de respuesta (< 30 segundos garantizado)

---

### Tiempo Estimado

**8-10 días** de desarrollo full-time

**Desglose:**

| Tarea | Días |
|:---|:-:|
| Schema PostgreSQL + migraciones | 1 |
| Endpoints ElysiaJS (CRUD citas) | 2 |
| Lógica de facturación automática | 2 |
| Apartado ISR (reservas) | 1 |
| Componentes Svelte (agenda + widget) | 2 |
| Testing end-to-end | 1 |
| Documentación técnica | 1 |

---

### Dependencias Técnicas

| Dependencia | Estado | Notas |
|:---|:-:|:---|
| **Facturación CFDI 4.0** | ✅ Ya existe | Bloque B - Perfil 10 |
| **WhatsApp (Baileys)** | ✅ Ya existe | Bloque F - Perfil 37 |
| **Resend (Email)** | ✅ Ya existe | Bloque D - Perfil 26 |
| **PostgreSQL** | ✅ Ya existe | Stack base |
| **Svelte 5 (Runes)** | ✅ Ya existe | Frontend |

**Conclusión:** ✅ Todas las dependencias están cubiertas. No requiere nuevas integraciones.

---

## 📊 MÉTRICAS DE ÉXITO

### KPIs a Trackear

| KPI | Meta | Medición |
|:---|:-:|:---|
| **Tiempo promedio facturación** | < 30 segundos | Timestamp `completedAt` → `invoiceSentAt` |
| **% Adopción del apartado ISR** | > 80% | Users que activan reserva automática |
| **% Citas facturadas** | > 95% | `invoiced = true` / total citas completadas |
| **Satisfacción (NPS)** | > 8/10 | Encuesta post-facturación |
| **Churn médicos** | < 5% mensual | Cancelaciones por mes |

---

## 💰 MODELO DE NEGOCIO

### Pricing Sugerido

| Plan | Precio | Target | Features Clave |
|:---|:-:|:---|:---|
| **PRO** | $299/mes | Médico consultorio único | Facturación + Apartado ISR |
| **BUSINESS** | $499/mes | 2+ consultorios | Multi-usuario + Reportes avanzados |
| **ENTERPRISE** | Custom | Clínicas/Hospitales privados | API + Integración con sistemas hospitalarios |

---

### ROI para el Médico

**Sin FinanzasMX:**

- Contador: $8,000-15,000/mes
- Software de facturación: $500-1,500/mes
- Tiempo perdido: 10 hrs/mes × $500/hr = $5,000/mes
- **Total:** $13,500-21,500/mes

**Con FinanzasMX:**

- FinanzasMX PRO: $299/mes
- Tiempo ahorrado: 9.5 hrs/mes
- **Ahorro:** $13,201-21,201/mes (**98% reducción**)

---

## ✅ CHECKLIST PRE-LANZAMIENTO

- [ ] Schema `medical_appointments` creado y testeado
- [ ] Schema `isr_reserves` creado y testeado
- [ ] Endpoint `/medical/appointments/:id/complete` funcionando
- [ ] Endpoint `/medical/appointments/today-available` funcionando
- [ ] Componente Svelte de completar cita con UX fluido
- [ ] Widget "Dinero Disponible Hoy" en dashboard principal
- [ ] Integración WhatsApp testeada (envío de PDF)
- [ ] Landing page `/medicos` publicada
- [ ] 3 testimonios de médicos beta testers
- [ ] Video demo de 30 segundos grabado

---

**🎉 Resultado:** Médicos facturan en 30 segundos, saben cuánto tienen disponible HOY, y duermen tranquilos sabiendo que el SAT está cubierto.

**Próximo perfil:** 52 - Abogado/Notario
