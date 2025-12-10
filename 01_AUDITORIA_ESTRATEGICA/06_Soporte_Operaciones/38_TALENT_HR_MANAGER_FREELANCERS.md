# 🌍 Perfil 38: Talent/HR Manager → Gestión de Freelancers

**Fecha:** 8 Diciembre 2025
**Bloque:** F (Soporte y Operaciones)
**Filosofía:** Bootstrap + Remote First + Anti-Nómina

---

## 🎯 Transformación Radical

### ❌ ROL TRADICIONAL (ELIMINADO)

- **Cargo:** HR Manager / Talent Manager / Reclutador
- **Salario:** $30,000 - $45,000 MXN/mes
- **Herramientas SaaS:**
  - BambooHR ($8-15 USD/mes por empleado = $152-285 MXN)
  - Gusto/Deel (nómina + HR: $40-80 USD/mes = $760-1,520 MXN)
  - LinkedIn Recruiter ($99 USD/mes = $1,881 MXN)
  - ATS (Applicant Tracking System) como Greenhouse ($500 USD/mes = $9,500 MXN)
- **Costos ocultos:**
  - Nómina (IMSS, INFONAVIT, ISR) = 40% adicional sobre salarios
  - Finiquitos/Liquidaciones
  - Días festivos, vacaciones, aguinaldo
  - Seguro de gastos médicos mayores ($500-1,000 MXN/mes por empleado)
- **Costo Total Anual:** $500,000 - $800,000 MXN/año (HR Manager + overhead nómina)

### ✅ SOLUCIÓN BOOTSTRAP

**Estrategia: Remote First + Contractors Only**

1. **NO HAY NÓMINA FIJA** → Solo freelancers/contractors
2. **Pagos:** Wise (internacional), transferencia bancaria (MX), crypto (USDC/USDT)
3. **Contratos:** Por obra/proyecto (Markdown → PDF generado)
4. **Base de datos:** PostgreSQL tabla `contractors`
5. **Reclutamiento:** Orgánico (Twitter/X, GitHub, networking, dogfooding)
6. **Automatización:** Scripts de pago mensuales (cronjob)

**Costo Anual:** $0 MXN salarios fijos + comisiones Wise (~2% por transacción)

---

## 🏗️ Arquitectura Técnica

### 1. **Base de Datos de Contractors**

**Schema PostgreSQL:**

```typescript
// apps/backend/src/db/schema.ts (agregar)
export const contractors = pgTable('contractors', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),
  country: varchar('country', { length: 2 }).default('MX'), // ISO 3166-1 alpha-2
  skillset: text('skillset').array(), // ['svelte', 'postgresql', 'elysia']
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }), // USD o MXN
  currency: varchar('currency', { length: 3 }).default('MXN'), // USD | MXN | USDT
  paymentMethod: varchar('payment_method', { length: 50 }), // wise | bank_transfer | crypto

  // Datos bancarios (encriptados en producción)
  bankName: varchar('bank_name', { length: 100 }),
  bankAccount: varchar('bank_account', { length: 50 }),
  bankClabe: varchar('bank_clabe', { length: 18 }), // México
  wiseEmail: varchar('wise_email', { length: 255 }), // Para Wise
  cryptoWallet: varchar('crypto_wallet', { length: 100 }), // USDC/USDT address

  contractType: varchar('contract_type', { length: 50 }).default('per_project'), // hourly | per_project | retainer
  status: varchar('status', { length: 20 }).default('active'), // active | inactive | blocked

  // Documentos
  contractUrl: text('contract_url'), // URL del contrato firmado (PDF)
  taxIdRfc: varchar('tax_id_rfc', { length: 13 }), // RFC (México) o Tax ID

  // Auditoría
  createdAt: timestamp('created_at').defaultNow(),
  lastPaymentAt: timestamp('last_payment_at'),
  totalEarnings: decimal('total_earnings', { precision: 12, scale: 2 }).default('0'),
});

export const contractorInvoices = pgTable('contractor_invoices', {
  id: serial('id').primaryKey(),
  contractorId: integer('contractor_id').references(() => contractors.id).notNull(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).unique(),
  description: text('description'), // "Desarrollo módulo X", "Diseño UI Y"
  hoursWorked: decimal('hours_worked', { precision: 5, scale: 2 }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('MXN'),
  status: varchar('status', { length: 20 }).default('pending'), // pending | paid | disputed
  paidAt: timestamp('paid_at'),
  paymentReference: varchar('payment_reference', { length: 100 }), // ID de Wise, TXID crypto, etc.
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### 2. **Panel de Gestión (SvelteKit)**

**Ruta:** `apps/frontend/src/routes/admin/contractors/+page.svelte`

```svelte
<script lang="ts">
  import { onMount } from 'svelte';

  let contractors = $state<any[]>([]);
  let showAddModal = $state(false);

  onMount(async () => {
    const response = await fetch('/api/admin/contractors');
    contractors = await response.json();
  });

  async function addContractor(data: any) {
    await fetch('/api/admin/contractors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    showAddModal = false;
    // Recargar lista
    const response = await fetch('/api/admin/contractors');
    contractors = await response.json();
  }
</script>

<div class="contractors-panel">
  <header>
    <h1>👨‍💻 Contractors / Freelancers</h1>
    <button onclick={() => (showAddModal = true)}>+ Nuevo Contractor</button>
  </header>

  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>País</th>
        <th>Habilidades</th>
        <th>Tarifa</th>
        <th>Método de Pago</th>
        <th>Total Ganado</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each contractors as contractor}
        <tr>
          <td>{contractor.name}</td>
          <td>{contractor.email}</td>
          <td>{contractor.country}</td>
          <td>{contractor.skillset?.join(', ') || 'N/A'}</td>
          <td>{contractor.hourlyRate} {contractor.currency}/hr</td>
          <td>
            <span class="badge {contractor.paymentMethod}">
              {contractor.paymentMethod}
            </span>
          </td>
          <td>${contractor.totalEarnings} {contractor.currency}</td>
          <td>
            <span class="status {contractor.status}">{contractor.status}</span>
          </td>
          <td>
            <a href="/admin/contractors/{contractor.id}">Ver Detalles</a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if showAddModal}
    <!-- Modal para agregar contractor (formulario) -->
    <div class="modal">
      <form onsubmit={(e) => { e.preventDefault(); /* lógica */ }}>
        <h2>Nuevo Contractor</h2>
        <input type="text" placeholder="Nombre completo" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="País (MX, US, AR, etc.)" />
        <input type="number" placeholder="Tarifa por hora" step="0.01" />
        <select>
          <option value="wise">Wise</option>
          <option value="bank_transfer">Transferencia Bancaria</option>
          <option value="crypto">Crypto (USDC/USDT)</option>
        </select>
        <button type="submit">Guardar</button>
        <button type="button" onclick={() => (showAddModal = false)}>Cancelar</button>
      </form>
    </div>
  {/if}
</div>

<style>
  .contractors-panel {
    padding: var(--size-6);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--size-4);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    text-align: left;
    padding: var(--size-3);
    border-bottom: 1px solid var(--border-color);
  }

  .badge {
    padding: var(--size-1) var(--size-2);
    border-radius: var(--radius-1);
    font-size: var(--font-size-0);
  }

  .badge.wise {
    background-color: var(--blue-3);
    color: white;
  }

  .badge.crypto {
    background-color: var(--orange-3);
    color: white;
  }

  .badge.bank_transfer {
    background-color: var(--green-3);
  }

  .status.active {
    color: var(--green-6);
    font-weight: bold;
  }

  .status.inactive {
    color: var(--gray-6);
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal form {
    background: white;
    padding: var(--size-6);
    border-radius: var(--radius-2);
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    max-width: 500px;
  }
</style>
```

---

### 3. **Sistema de Pagos Automatizado**

**Backend (ElysiaJS):**

```typescript
// apps/backend/src/routes/admin/payments.ts
import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { contractors, contractorInvoices } from '../../db/schema';
import { eq } from 'drizzle-orm';
import axios from 'axios';

export const paymentsRouter = new Elysia({ prefix: '/admin/payments' })
  .post('/process-batch', async ({ body }) => {
    // Procesar pagos mensuales a contractors
    const pendingInvoices = await db.query.contractorInvoices.findMany({
      where: eq(contractorInvoices.status, 'pending'),
      with: { contractor: true },
    });

    const results = [];

    for (const invoice of pendingInvoices) {
      const contractor = invoice.contractor;
      let paymentResult;

      switch (contractor.paymentMethod) {
        case 'wise':
          paymentResult = await payViaWise(contractor, invoice);
          break;
        case 'bank_transfer':
          paymentResult = await payViaBankTransfer(contractor, invoice);
          break;
        case 'crypto':
          paymentResult = await payViaCrypto(contractor, invoice);
          break;
        default:
          paymentResult = { success: false, error: 'Unknown payment method' };
      }

      if (paymentResult.success) {
        await db.update(contractorInvoices)
          .set({
            status: 'paid',
            paidAt: new Date(),
            paymentReference: paymentResult.reference,
          })
          .where(eq(contractorInvoices.id, invoice.id));

        await db.update(contractors)
          .set({
            lastPaymentAt: new Date(),
            totalEarnings: contractor.totalEarnings + invoice.amount,
          })
          .where(eq(contractors.id, contractor.id));
      }

      results.push({
        invoiceId: invoice.id,
        contractorName: contractor.name,
        status: paymentResult.success ? 'paid' : 'failed',
        reference: paymentResult.reference,
        error: paymentResult.error,
      });
    }

    return { success: true, results };
  });

// Función para pagar vía Wise (API)
async function payViaWise(contractor: any, invoice: any) {
  try {
    const WISE_API_KEY = process.env.WISE_API_KEY;
    const WISE_PROFILE_ID = process.env.WISE_PROFILE_ID;

    // 1. Crear quote
    const quoteResponse = await axios.post(
      'https://api.wise.com/v1/quotes',
      {
        sourceCurrency: 'MXN',
        targetCurrency: contractor.currency,
        sourceAmount: invoice.amount,
        profile: WISE_PROFILE_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${WISE_API_KEY}`,
        },
      }
    );

    const quoteId = quoteResponse.data.id;

    // 2. Crear destinatario (si no existe)
    const recipientResponse = await axios.post(
      'https://api.wise.com/v1/accounts',
      {
        currency: contractor.currency,
        type: 'email',
        profile: WISE_PROFILE_ID,
        accountHolderName: contractor.name,
        details: {
          email: contractor.wiseEmail,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WISE_API_KEY}`,
        },
      }
    );

    const recipientId = recipientResponse.data.id;

    // 3. Crear transferencia
    const transferResponse = await axios.post(
      'https://api.wise.com/v1/transfers',
      {
        targetAccount: recipientId,
        quoteUuid: quoteId,
        customerTransactionId: invoice.invoiceNumber,
        details: {
          reference: `FinanzasMX - ${invoice.description}`,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${WISE_API_KEY}`,
        },
      }
    );

    return {
      success: true,
      reference: transferResponse.data.id,
    };
  } catch (error: any) {
    console.error('Error Wise payment:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

// Función para pagar vía transferencia bancaria (manual)
async function payViaBankTransfer(contractor: any, invoice: any) {
  // En este caso, solo se genera un recordatorio para que alguien haga la transferencia manual
  console.log(`⚠️ Pago manual requerido para ${contractor.name}: $${invoice.amount} ${contractor.currency}`);
  console.log(`CLABE: ${contractor.bankClabe}`);
  console.log(`Banco: ${contractor.bankName}`);

  return {
    success: true,
    reference: 'MANUAL_TRANSFER_PENDING',
  };
}

// Función para pagar vía crypto (USDC/USDT en red Polygon o BSC)
async function payViaCrypto(contractor: any, invoice: any) {
  try {
    // Aquí usarías una librería como ethers.js o web3.js
    // Ejemplo simplificado (requiere wallet del proyecto configurada)
    const { ethers } = await import('ethers');

    const WALLET_PRIVATE_KEY = process.env.CRYPTO_WALLET_PRIVATE_KEY;
    const USDC_CONTRACT_ADDRESS = '0x...'; // Dirección de USDC en Polygon

    const provider = new ethers.JsonRpcProvider('https://polygon-rpc.com');
    const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

    const usdcContract = new ethers.Contract(
      USDC_CONTRACT_ADDRESS,
      ['function transfer(address to, uint256 amount) returns (bool)'],
      wallet
    );

    const tx = await usdcContract.transfer(
      contractor.cryptoWallet,
      ethers.parseUnits(invoice.amount.toString(), 6) // USDC usa 6 decimales
    );

    await tx.wait();

    return {
      success: true,
      reference: tx.hash,
    };
  } catch (error: any) {
    console.error('Error crypto payment:', error.message);
    return { success: false, error: error.message };
  }
}
```

**Cronjob para pagos mensuales:**

```bash
# Ejecutar el 1ro de cada mes a las 9am
# Agregar a Dokploy cronjobs o crontab del VPS
0 9 1 * * curl -X POST https://finanzasmx.com/api/admin/payments/process-batch \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

### 4. **Generación de Contratos (Markdown → PDF)**

**Plantilla Markdown:**

```markdown
<!-- templates/contractor_agreement.md -->
# CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES

**CONTRATANTE:** FinanzasMX S.A.P.I. de C.V.
**RFC:** FMX240101ABC
**CONTRATISTA:** {{ contractor.name }}
**RFC/Tax ID:** {{ contractor.taxIdRfc }}

## 1. OBJETO DEL CONTRATO

El CONTRATISTA se compromete a prestar los siguientes servicios profesionales:

{{ contract.serviceDescription }}

## 2. DURACIÓN Y ENTREGABLES

- **Fecha de inicio:** {{ contract.startDate }}
- **Fecha de término:** {{ contract.endDate }}
- **Entregables:** {{ contract.deliverables }}

## 3. RETRIBUCIÓN

El CONTRATANTE pagará al CONTRATISTA:

- **Monto:** ${{ contract.amount }} {{ contract.currency }}
- **Forma de pago:** {{ contract.paymentMethod }}
- **Calendario de pagos:** {{ contract.paymentSchedule }}

## 4. PROPIEDAD INTELECTUAL

Todo código, diseño, y material creado durante la prestación de servicios será propiedad exclusiva de FinanzasMX S.A.P.I. de C.V.

## 5. CONFIDENCIALIDAD

El CONTRATISTA se obliga a mantener confidencial toda información del CONTRATANTE.

## 6. JURISDICCIÓN

Este contrato se rige por las leyes de México. Cualquier disputa se resolverá en los tribunales de Ciudad de México.

---

**FIRMAS:**

**CONTRATANTE**
Nombre: [Representante Legal FinanzasMX]
Fecha: {{ contract.signedDate }}

**CONTRATISTA**
Nombre: {{ contractor.name }}
Fecha: {{ contract.signedDate }}
```

**Script de generación:**

```typescript
// apps/backend/src/services/contract-generator.ts
import fs from 'fs/promises';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';

export async function generateContract(contractor: any, contractData: any) {
  // Leer plantilla Markdown
  const templateMd = await fs.readFile('./templates/contractor_agreement.md', 'utf-8');

  // Compilar con Handlebars
  const template = Handlebars.compile(templateMd);
  const contractMarkdown = template({ contractor, contract: contractData });

  // Convertir Markdown a HTML (puedes usar marked.js)
  const { marked } = await import('marked');
  const contractHtml = marked(contractMarkdown);

  // Generar PDF con Puppeteer
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          h1 { color: #333; border-bottom: 2px solid #000; }
        </style>
      </head>
      <body>${contractHtml}</body>
    </html>
  `);

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  // Guardar en storage (puede ser MinIO, filesystem, S3)
  const filename = `contract_${contractor.id}_${Date.now()}.pdf`;
  await fs.writeFile(`./storage/contracts/${filename}`, pdfBuffer);

  return {
    url: `/storage/contracts/${filename}`,
    filename,
  };
}
```

---

## 🌍 Filosofía Remote First

### Principios inquebrantables:

1. **NO HAY OFICINA FÍSICA**
   - Costo de renta: $0 MXN
   - Utilities: $0 MXN
   - Mobiliario: $0 MXN

2. **Async by default**
   - Reuniones síncronas: máximo 2 por semana
   - Todo documentado en Notion/Markdown
   - Comunicación vía Discord/Slack (no emails)

3. **Zona horaria flexible**
   - Contractors en México, Argentina, Colombia, España, etc.
   - Overlap mínimo: 2 horas (10am-12pm MX)

4. **Tools gratuitas:**
   - GitHub (repos ilimitados gratis)
   - Discord (servidor privado gratis)
   - Google Meet (free tier 1 hora/call)
   - Notion (personal gratis, o self-hosted Wiki)

---

## 🚫 Anti-Patterns Prohibidos

### ❌ NO HACER:

1. **Contratar empleados de planta**
   - Obligaciones fiscales infinitas
   - Difícil despedir en México (Ley Federal del Trabajo)
   - Liquidación = 3 meses de salario + prestaciones

2. **Usar Deel/Gusto para nómina**
   - $40-80 USD/mes por persona
   - Innecesario si usas contractors

3. **Oficina "cool" para atraer talento**
   - El talento remoto valora autonomía, no ping-pong tables

4. **Contratar por CV/títulos**
   - Priorizar: GitHub profile, portfolio, prueba técnica real

---

## 📊 Métricas de Éxito

### KPIs a trackear:

1. **Cost per Contractor:** Promedio de gasto mensual por freelancer
   - Meta: < $20,000 MXN/mes por contratista senior
2. **Retention Rate:** % de contractors que regresan para más proyectos
   - Meta: > 70%
3. **Time to Payment:** Días entre factura → pago
   - Meta: < 7 días
4. **Payment Method Distribution:**
   - Wise: 60%
   - Bank Transfer: 30%
   - Crypto: 10%

---

## 💰 Ahorro Real

| Concepto Eliminado                      | Costo Mensual   | Costo Anual     |
| --------------------------------------- | --------------- | --------------- |
| HR Manager (1 persona)                  | $40,000 MXN     | $480,000 MXN    |
| Software de nómina (BambooHR/Deel)      | $5,000 MXN      | $60,000 MXN     |
| Costos laborales (IMSS, SAR, etc.)     | $15,000 MXN     | $180,000 MXN    |
| Recruiter/LinkedIn Recruiter            | $8,000 MXN      | $96,000 MXN     |
| **TOTAL ELIMINADO**                     | **$68,000 MXN** | **$816,000 MXN** |

| Concepto Nuevo                          | Costo Mensual   | Costo Anual     |
| --------------------------------------- | --------------- | --------------- |
| Comisiones Wise (2% de pagos)           | $2,000 MXN      | $24,000 MXN     |
| Fees crypto (gas fees)                  | $200 MXN        | $2,400 MXN      |
| PostgreSQL + panel admin (ya cubierto)  | $0 MXN          | $0 MXN          |
| **TOTAL NUEVO**                         | **$2,200 MXN**  | **$26,400 MXN** |

### 🎉 Ahorro Neto: **$789,600 MXN/año** (96.8% reducción)

---

## 🚀 Roadmap de Implementación

### Fase 1: Setup Base de Datos (Semana 1)

- [ ] Crear tablas `contractors` y `contractor_invoices`
- [ ] Panel admin básico en SvelteKit

### Fase 2: Sistema de Pagos (Semana 2-3)

- [ ] Integrar Wise API
- [ ] Script de pagos batch
- [ ] Setup cronjob mensual

### Fase 3: Contratos Automatizados (Semana 4)

- [ ] Plantilla Markdown de contrato
- [ ] Script Puppeteer para PDF
- [ ] Storage de contratos firmados

### Fase 4: Crypto Payments (Opcional - Mes 2)

- [ ] Wallet corporativa (Polygon/BSC)
- [ ] Script ethers.js para USDC
- [ ] Tracking de transacciones on-chain

---

## 🔒 Consideraciones Legales (México)

### 1. **Contractors vs. Empleados**

Para que un contractor NO sea considerado empleado (art. 20 LFT):

- ✅ Trabajo por proyecto/obra determinada
- ✅ Libertad de horarios
- ✅ Usa sus propias herramientas
- ✅ Puede tener múltiples clientes
- ❌ NO tiene horario fijo ni supervisión directa

### 2. **Facturación**

- Contractors mexicanos deben emitir CFDI (Recibo de Honorarios)
- Contractors extranjeros: invoice estándar (no CFDI)

### 3. **Retención de ISR (México)**

Si el contractor es persona física mexicana:

- Retener 10% de ISR (si no tiene EFIRMA)
- Declararlo en pago provisional mensual

**Automatización:**

```typescript
// Calcular retención automáticamente
function calculateISRRetention(amount: number, hasEFirma: boolean): number {
  return hasEFirma ? 0 : amount * 0.10;
}
```

---

## 🎓 Onboarding de Contractors

**Proceso estandarizado (30 minutos):**

1. **Firma de contrato** (digital, DocuSign free tier o HelloSign)
2. **Datos bancarios/Wise/crypto** en formulario
3. **Acceso a Discord + GitHub org**
4. **Lectura de documentación** (Wiki SvelteKit)
5. **Primera tarea:** Fix de un issue pequeño (onboarding test)

---

## 📚 Referencias Técnicas

- **Wise API Docs:** https://docs.wise.com/api-docs/
- **Ethers.js (Crypto payments):** https://docs.ethers.org/v6/
- **Puppeteer (PDF generation):** https://pptr.dev/
- **Handlebars (Templates):** https://handlebarsjs.com/
- **Ley Federal del Trabajo (México):** http://www.diputados.gob.mx/LeyesBiblio/pdf/125.pdf

---

## ✅ Checklist Pre-Producción

- [ ] Tabla `contractors` creada y poblada con 3 contractors iniciales
- [ ] Wise API key configurada (`WISE_API_KEY`)
- [ ] Cronjob de pagos mensuales activo
- [ ] Plantilla de contrato aprobada por legal (si aplica)
- [ ] Panel admin accesible en `/admin/contractors`
- [ ] Prueba de pago exitosa (sandbox Wise o testnet crypto)

---

**Resultado:** HR Manager + Nómina fija **ELIMINADOS**. Contractors pagados en 7 días. Ahorro: **$789K MXN/año**.

**Próximo paso:** Perfil 39 (Office Manager → Remote First Radical).
