# 💰 Perfil 35: Revenue Operations (Cobranza Automática Ruthless)

**Auditoría Estratégica - Bloque E: Negocio y Growth**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap Mode (Cash Flow es Oxígeno)
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

**REALIDAD BOOTSTRAP:** NO tenemos equipo de cobranza. NO podemos "perseguir" morosos. El sistema cobra automáticamente o corta el servicio sin piedad. Además, necesitamos **capitalización inmediata** (flujo de caja hoy) para financiar el desarrollo, así que implementamos descuentos agresivos por pago anual.

---

## 🇲🇽 Análisis de Realidad Mexicana (Survival Mode)

### 1. Cultura de Pago (El Enemigo)

- **El "Jineteo" Mexicano:** "Ahorita no tengo, te pago la próxima semana" (mentira).
- **Fricción como Excusa:** "Es que no pude ir al OXXO".
- **Memoria Selectiva:** "¿Ya se venció? No me llegó aviso".

### 2. Estrategia de Cobranza Despiadada (Sin Humanos)

- **Día -3:** WhatsApp automático: "Tu suscripción vence en 3 días. Asegúrate de tener saldo en tu tarjeta".
- **Día 0 (Falla el cobro):** Reintento automático 3 veces en 24 horas.
- **Día +1:** WhatsApp: "Tu pago falló. Actualiza tu tarjeta aquí [link] o se suspenderá tu servicio mañana".
- **Día +3:** **Bloqueo Total Automático.** No puede facturar, no puede ver reportes. Banner rojo: "Servicio Suspendido - Paga Aquí".
- **Día +7:** Eliminación de datos (advertencia).

### 3. Estrategia de Capitalización (Pago Anual con Descuento)

- **Problema:** Necesitamos $50k MXN hoy para pagar el VPS y el desarrollo.
- **Solución:** Ofrecer descuento brutal por pago anual:
  - Plan PRO: $149/mes × 12 = $1,788/año.
  - **Pago Anual:** $1,200/año (**33% descuento** = 4 meses gratis).
  - Si 50 clientes pagan anual: $1,200 × 50 = **$60,000 MXN** de entrada.
- **Pitch:** "Paga el año completo y olvídate del SAT por 12 meses. Además, ahorras $588 pesos".---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Pasarela de Pago | ✅ Stripe (Planeado) | `00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| REV-001 | **Webhook Handler (Stripe -> Factura SAT)** | 🔴 Bloqueante | ElysiaJS Endpoint | $0 | Sem 2 |
| REV-002 | **Motor de Cobranza Automático (Dunning)** | 🔴 Bloqueante | Cron Job (Bun) | $0 | Sem 2 |
| REV-003 | **WhatsApp Alerts (Avisos de Pago)** | 🟠 Alto | Baileys API | $50/mes | Sem 2 |
| REV-004 | **Portal de Auto-Servicio (Cambio Tarjeta)** | 🟠 Alto | Stripe Customer Portal | Incluido | Sem 3 |
| REV-005 | **Planes Anuales con Descuento (UI)** | 🟡 Medio | Pricing Page | $0 | Sem 3 |
| REV-006 | ~~Contratar Especialista en Cobranza~~ | ❌ Descartado | N/A | $12k/mes ⚠️ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Webhook de Stripe para Facturación Automática

Cuando Stripe cobra, nosotros facturamos automáticamente ante el SAT.

```typescript
// src/lib/server/billing/webhooks.ts
import { stripe } from '$lib/server/stripe';
import { createInvoice } from '$lib/server/sat/invoicing';

export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'invoice.payment_succeeded':
      const payment = event.data.object as Stripe.Invoice;
      const customerId = payment.customer as string;

      // 1. Buscar usuario
      const user = await getUserByStripeId(customerId);

      // 2. Generar Factura SAT (PUE - Pago en una sola exhibición)
      // Usamos los datos fiscales del usuario
      await createInvoice({
        rfc: user.rfc,
        items: [{
          productCode: '81112500', // Software de computadora
          description: `Suscripción Plan ${payment.lines.data[0].description}`,
          amount: payment.amount_paid / 100,
          vat: true
        }],
        paymentMethod: '04', // Tarjeta de crédito
        useCFDI: 'G03' // Gastos en general
      });

      // 3. Enviar XML y PDF por correo/WhatsApp
      break;

    case 'invoice.payment_failed':
      // Iniciar secuencia de cobranza (Dunning)
      await startDunningProcess(event.data.object.customer as string);
      break;
  }
}
```

### 2. Motor de Cobranza (Dunning)

Lógica de reintentos y notificaciones.

```typescript
// src/lib/server/billing/dunning.ts
export async function startDunningProcess(stripeCustomerId: string) {
  const user = await getUserByStripeId(stripeCustomerId);

  // Intento 1: Falló el pago
  await sendWhatsApp(user.phone, `Hola ${user.name}, hubo un problema con el pago de tu suscripción. ¿Podrías revisar tu tarjeta aquí? [Link]`);

  // No bloqueamos servicio inmediatamente, damos gracia de 3 días
  await db.update(users).set({ subscriptionStatus: 'PAST_DUE', gracePeriodEnd: addDays(new Date(), 3) });
}
```

---

## 📊 Proyección de Cash Flow (Primeros 6 Meses)

### Escenario Conservador:

- **Mes 1:** 20 usuarios × $149/mes = $2,980 MXN.
- **Mes 3:** 100 usuarios × $149/mes = $14,900 MXN.
- **Mes 6:** 300 usuarios × $149/mes = $44,700 MXN.

### Escenario con Pagos Anuales (Optimista):

- **Mes 1:** 5 anuales ($1,200 c/u) = $6,000 MXN + 15 mensuales ($149) = $8,235 MXN.
- **Mes 3:** 30 anuales = $36,000 MXN + 70 mensuales = $46,430 MXN.
- **Total acumulado en 3 meses:** ~$90k MXN (suficiente para:
  - Pagar VPS 12 meses: $2,400 MXN.
  - Pagar dominio: $600 MXN.
  - Contratar primer CSM part-time: $15k MXN.
  - **Reinvertir en desarrollo:** $70k MXN).

### Estrategia Anti-Colapso:

- **Buffer de 3 Meses:** Nunca gastar más del 60% del MRR.
- **Reserva de Emergencia:** $20k MXN en cuenta separada para pagar el VPS si el MRR cae.

---

## 💡 Mentalidad Bootstrap: "Cash is King"

### Reglas de Supervivencia:

1. **Cobrar ANTES de dar servicio:** Trial de 7 días con tarjeta (preautorización).
2. **Suspender sin piedad:** Si no paga, se corta automáticamente (sin excepciones).
3. **Priorizar Pago Anual:** El descuento del 33% es inversión en capitalización.
4. **No contratar hasta tener 6 meses de runway:** El founder hace RevOps hasta tener $200k MXN en banco.

---

## 🔗 Referencias

- **"The Lean Startup" (Eric Ries):** Validar antes de escalar.
- **Stripe Billing Best Practices:** Dunning y recuperación de pagos.
- **Anexo 20 SAT:** Emisión de CFDI por ingresos (Art. 29-A).
- **ProfitWell:** Churn Benchmarks (SaaS B2B: 5-7% mensual).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap Ruthless (Cash Flow > Growth)*
