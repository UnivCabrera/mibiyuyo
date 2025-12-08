# 📖 API DOCUMENTATION
**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión API:** v1  
**Base URL:** `https://api.profinanconta.mx/v1`  
**Fecha:** 29 Noviembre 2025

---

## 🔐 AUTENTICACIÓN

Todos los endpoints (excepto auth) requieren token JWT en header:
```
Authorization: Bearer <token>
```

---

## 📚 ENDPOINTS

### 🔑 AUTH

#### POST /auth/register
Registra un nuevo usuario.

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "Password123!",
  "name": "Juan Pérez"
}
```

**Response (201):**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez"
  },
  "message": "Cuenta creada. Revisa tu email para verificar."
}
```

---

#### POST /auth/login
Inicia sesión.

**Request:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "name": "Juan Pérez",
    "plan": "free"
  }
}
```

---

### 💰 TRANSACCIONES

#### GET /transactions
Lista transacciones del usuario.

**Query params:**
- `page` (int, default: 1)
- `limit` (int, default: 20, max: 100)
- `type` (string: income|expense|transfer)
- `startDate` (ISO date)
- `endDate` (ISO date)
- `categoryId` (uuid)
- `accountId` (uuid)

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "expense",
      "amount": 1500.00,
      "description": "Pago de luz",
      "date": "2025-11-28T10:00:00Z",
      "category": {
        "id": "uuid",
        "name": "Servicios",
        "icon": "⚡"
      },
      "account": {
        "id": "uuid",
        "name": "Cuenta Principal"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

#### POST /transactions
Crea nueva transacción.

**Request:**
```json
{
  "type": "expense",
  "amount": 1500.00,
  "description": "Pago de luz",
  "date": "2025-11-28",
  "categoryId": "uuid",
  "accountId": "uuid",
  "notes": "Recibo CFE Nov-2025"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "expense",
    "amount": 1500.00,
    ...
  }
}
```

---

### 🏦 CUENTAS

#### GET /accounts
Lista cuentas del usuario.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Cuenta Principal",
      "type": "bank",
      "balance": 25000.00,
      "currency": "MXN",
      "color": "#4CAF50",
      "icon": "🏦"
    },
    {
      "id": "uuid",
      "name": "Efectivo",
      "type": "cash",
      "balance": 3500.00,
      "currency": "MXN",
      "color": "#FF9800",
      "icon": "💵"
    }
  ]
}
```

---

#### POST /accounts
Crea nueva cuenta.

**Request:**
```json
{
  "name": "Tarjeta de Crédito",
  "type": "credit_card",
  "balance": -5000.00,
  "currency": "MXN",
  "color": "#F44336",
  "icon": "💳"
}
```

---

### 📊 REPORTES

#### GET /reports/summary
Resumen financiero del período.

**Query params:**
- `period` (string: week|month|quarter|year)
- `startDate` (ISO date)
- `endDate` (ISO date)

**Response (200):**
```json
{
  "period": "2025-11",
  "income": 45000.00,
  "expenses": 32000.00,
  "balance": 13000.00,
  "previousPeriod": {
    "income": 42000.00,
    "expenses": 35000.00,
    "balance": 7000.00
  },
  "changePercent": {
    "income": 7.14,
    "expenses": -8.57,
    "balance": 85.71
  }
}
```

---

#### GET /reports/categories
Gastos/ingresos por categoría.

**Response (200):**
```json
{
  "expenses": [
    {
      "category": "Servicios",
      "amount": 8500.00,
      "percentage": 26.5,
      "transactions": 12
    },
    {
      "category": "Proveedores",
      "amount": 15000.00,
      "percentage": 46.9,
      "transactions": 8
    }
  ],
  "income": [
    {
      "category": "Ventas",
      "amount": 40000.00,
      "percentage": 88.9,
      "transactions": 45
    }
  ]
}
```

---

### 🎯 METAS DE AHORRO

#### GET /goals
Lista metas de ahorro.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Fondo de emergencia",
      "targetAmount": 50000.00,
      "currentAmount": 23500.00,
      "progress": 47,
      "targetDate": "2026-06-01",
      "daysRemaining": 185
    }
  ]
}
```

#### POST /goals/:id/contribute
Aportar a una meta.

**Request:**
```json
{
  "amount": 1000.00,
  "sourceAccountId": "uuid"
}
```

---

## 📜 CÓDIGOS DE ERROR

| Código | Significado |
|--------|-------------|
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Token inválido/expirado |
| 403 | Forbidden - Sin permisos |
| 404 | Not Found - Recurso no existe |
| 409 | Conflict - Recurso ya existe |
| 422 | Unprocessable Entity - Validación falló |
| 429 | Too Many Requests - Rate limit |
| 500 | Internal Server Error |

**Formato de error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "El email ya está registrado",
    "details": {
      "field": "email",
      "value": "test@test.com"
    }
  }
}
```

---

## 🚦 RATE LIMITING

| Endpoint | Límite |
|----------|--------|
| POST /auth/* | 5 req/min |
| GET /* | 100 req/min |
| POST/PUT/DELETE /* | 30 req/min |

Headers de respuesta:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1732800000
```

---

## 🔌 WRAPPERS PARA APIS EXTERNAS

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** ⏳ PENDIENTE (Prioridad Alta V1)

### Arquitectura de Wrappers

Los wrappers encapsulan llamadas a APIs externas con protecciones:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    API WRAPPER ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Tu Código              Wrapper                    API Externa        │
│   ┌─────────┐      ┌─────────────────────┐      ┌─────────────┐       │
│   │ Service │ ───► │ ⏱️ Timeout (10-30s)  │ ───► │ SAT API     │       │
│   │         │      │ 🔄 Retry (3 intentos)│      │ Finkok API  │       │
│   │         │ ◄─── │ 💾 Cache (Redis)     │ ◄─── │ Banxico API │       │
│   │         │      │ 🔌 Circuit Breaker   │      │             │       │
│   └─────────┘      └─────────────────────┘      └─────────────┘       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### APIs Externas Integradas

| API | Propósito | Wrapper | Estado |
|:----|:----------|:--------|:-------|
| **SAT** | Validación RFC, CSF, CIEC | `SATWrapper` | ⏳ Pendiente |
| **Finkok** | Timbrado CFDI | `FinkokWrapper` | ⏳ Pendiente |
| **Banxico** | Tipo de cambio | `BanxicoWrapper` | ⏳ Pendiente |
| **Finerio** | Open Banking | `FinerioWrapper` | ⏳ Pendiente |

### Uso de Wrappers

```typescript
// ✅ CORRECTO: Usar wrapper con protecciones
import { getSATWrapper } from '$lib/server/integrations/sat.wrapper';

const sat = getSATWrapper(redis);
const resultado = await sat.validarRFC('XAXX010101000');
// - Si SAT está caído → devuelve caché
// - Si timeout → reintenta 3 veces
// - Si circuit abierto → falla rápido

// ❌ INCORRECTO: Llamar API directamente
const response = await fetch('https://sat.gob.mx/api/...');
// - Sin timeout → puede colgar infinito
// - Sin retry → falla al primer error
// - Sin caché → SAT caído = app caída
```

### Endpoints de Integraciones

#### GET /integrations/sat/validar-rfc
Valida un RFC con el SAT.

**Request:**
```
GET /integrations/sat/validar-rfc?rfc=XAXX010101000
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "rfc": "XAXX010101000",
    "valido": true,
    "estatus": "ACTIVO",
    "nombre": "NOMBRE EJEMPLO",
    "regimen": "601 - General de Ley"
  },
  "meta": {
    "cached": true,
    "stale": false,
    "latency": 45
  }
}
```

**Response (503 - SAT caído):**
```json
{
  "success": true,
  "data": {
    "rfc": "XAXX010101000",
    "valido": true,
    "estatus": "ACTIVO"
  },
  "meta": {
    "cached": true,
    "stale": true,
    "warning": "Datos de caché (SAT no disponible)"
  }
}
```

#### GET /integrations/banxico/tipo-cambio
Obtiene tipo de cambio USD/MXN.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "moneda": "USD",
    "valor": 17.45,
    "fecha": "2025-12-07"
  },
  "meta": {
    "fuente": "Banxico",
    "cached": false
  }
}
```

---

## 🪝 WEBHOOKS DE ALTA CARGA

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** ⏳ PENDIENTE (Prioridad Media)

### Arquitectura de Webhooks

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    WEBHOOK PROCESSING ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Servicio Externo         Tu API              Background Workers      │
│   ┌─────────────┐      ┌───────────────┐      ┌─────────────────┐     │
│   │ Stripe      │      │ 1. Validar    │      │ 3. Procesar     │     │
│   │ SAT         │ ───► │    firma      │ ───► │    evento       │     │
│   │ PAC         │      │ 2. ACK rápido │      │                 │     │
│   │ Banxico     │      │    (200 OK)   │      │ BullMQ Queue    │     │
│   └─────────────┘      └───────────────┘      └─────────────────┘     │
│                               │                       │                │
│                               │ <100ms                │ async          │
│                               ▼                       ▼                │
│                        ┌─────────────┐         ┌─────────────┐        │
│                        │ Redis Queue │ ◄─────► │ PostgreSQL  │        │
│                        └─────────────┘         └─────────────┘        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Principios de Webhooks Robustos

1. **ACK rápido:** Responder 200 OK en <100ms (antes de procesar)
2. **Idempotencia:** Procesar mismo evento múltiples veces sin duplicar
3. **Validar firma:** Verificar que el webhook es legítimo
4. **Cola de procesamiento:** No procesar en el request, encolar

### Endpoints de Webhooks

#### POST /webhooks/stripe
Recibe eventos de Stripe (pagos, suscripciones).

**Headers requeridos:**
```
Stripe-Signature: t=1671234567,v1=abc123...
Content-Type: application/json
```

**Flujo de procesamiento:**
```typescript
// filepath: src/routes/webhooks/stripe/+server.ts
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import Stripe from 'stripe';
import { webhookQueue } from '$lib/server/queues/webhook.queue';

export async function POST({ request }) {
  const payload = await request.text();
  const signature = request.headers.get('stripe-signature');

  // 1. Validar firma (seguridad)
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature!,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed');
    return new Response('Invalid signature', { status: 400 });
  }

  // 2. Verificar idempotencia (evitar duplicados)
  const eventId = event.id;
  const exists = await redis.get(`webhook:processed:${eventId}`);
  if (exists) {
    return new Response('Already processed', { status: 200 });
  }

  // 3. Encolar para procesamiento async
  await webhookQueue.add('stripe', {
    eventId,
    type: event.type,
    data: event.data.object
  }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 1000 }
  });

  // 4. Marcar como procesado
  await redis.setex(`webhook:processed:${eventId}`, 86400, '1');

  // 5. ACK rápido (< 100ms)
  return new Response('OK', { status: 200 });
}
```

#### POST /webhooks/sat/notificaciones
Recibe notificaciones del SAT (opcional, si se implementa).

#### POST /webhooks/finkok/status
Recibe actualizaciones de estado de facturas.

### Procesamiento de Cola (BullMQ)

```typescript
// filepath: src/lib/server/workers/webhook.worker.ts
import { Worker } from 'bullmq';
import { redis } from '$lib/server/redis';

const webhookWorker = new Worker('webhooks', async (job) => {
  const { eventId, type, data } = job.data;

  console.log(`Processing webhook: ${type} (${eventId})`);

  switch (type) {
    case 'invoice.paid':
      await handleInvoicePaid(data);
      break;
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(data);
      break;
    case 'payment_intent.payment_failed':
      await handlePaymentFailed(data);
      break;
    default:
      console.log(`Unhandled webhook type: ${type}`);
  }
}, { connection: redis });

async function handleInvoicePaid(invoice: any) {
  // Actualizar suscripción del usuario
  // Enviar email de confirmación
  // Actualizar métricas
}
```

### Reintentos y Errores

| Escenario | Comportamiento |
|:----------|:---------------|
| Timeout (>30s) | Stripe reintenta |
| Error 5xx | Reintento automático |
| Error 4xx | No reintenta (error nuestro) |
| Duplicado | Idempotencia protege |
| Worker caído | BullMQ reintenta |

### Monitoreo de Webhooks

```typescript
// Dashboard: /admin/webhooks
interface WebhookStats {
  total: number;
  successful: number;
  failed: number;
  avgProcessingTime: number;
  lastReceived: Date;
}

// Alertas configuradas
// - Error rate > 5%: Warning
// - Error rate > 20%: Critical
// - No webhooks en 1 hora: Warning
```

---

## 📖 SWAGGER/OPENAPI

Documentación interactiva disponible en:
- **Development:** `http://localhost:4000/swagger`
- **Production:** `https://api.profinanconta.mx/swagger`

---

*API diseñada siguiendo principios REST y convenciones de la industria*  
*Actualizado: 7 Diciembre 2025 - Agregadas secciones Wrappers y Webhooks*
