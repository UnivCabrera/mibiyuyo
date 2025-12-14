# 🤝 Perfil 34: Partnership Manager (Alianzas Contadores)

**Auditoría Estratégica - Bloque E: Negocio y Growth**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** El Contador como Aliado Estratégico
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

En México, el Contador es el "Portero" de la decisión de compra. El Partnership Manager debe desarmar la amenaza percibida ("me van a quitar mi chamba") y convertirla en oportunidad ("me van a quitar la talacha"). Su objetivo es reclutar contadores para el programa de Partners, ofreciéndoles herramientas exclusivas y comisiones recurrentes.

---

## 🇲🇽 Análisis de Realidad Mexicana (Contadores)

### 1. El Dolor del Contador

- **La Talacha:** Descargar XMLs, corretear clientes por estados de cuenta, capturar pólizas manuales.
- **El Cliente Desordenado:** "Mándame la factura de la gasolina de hace 3 meses".
- **Rentabilidad:** Cobran poco por mucha talacha. Quieren más clientes pero no tienen capacidad operativa.

### 2. La Propuesta de Valor (Partner Program)

- **"Tu Portal Exclusivo":** Un dashboard donde ven a todos sus clientes en tiempo real. Sin pedir contraseñas, sin esperar archivos.
- **Revenue Share:** "Gana el 20% de la suscripción de tus clientes de por vida". Ingreso pasivo real.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Modelo de Negocio | ✅ B2B | `03_MERCADO_COMPETENCIA/03_IDENTIDAD_COMERCIAL_Y_B2B.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| PRT-001 | **Portal de Partners (Dashboard de Ganancias)** | 🔴 Bloqueante | SvelteKit + Chart.js | $0 | Sem 3 |
| PRT-002 | **Sistema de Pagos Automático (Comisiones)** | 🔴 Bloqueante | Stripe Connect | 2.9% fee | Sem 3 |
| PRT-003 | **Tracking de Referidos (Unique Links)** | 🟠 Alto | Drizzle Schema | $0 | Sem 3 |
| PRT-004 | Kit de Marketing (PDFs + Scripts) | 🟡 Medio | Canva (Gratis) | $0 | Fase 2 |
| PRT-005 | ~~Contratar Partnership Manager~~ | ❌ Descartado | N/A | $15k/mes ⚠️ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Partners y Vinculación

Relación N:M entre Contadores (Partners) y Empresas (Clientes).

```typescript
// src/lib/server/db/schema/partners.ts
import { pgTable, text, timestamp, integer, uuid, boolean } from 'drizzle-orm/pg-core';

export const partners = pgTable('partners_profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Usuario que es contador
  clabe: text('clabe'), // Para depositar comisiones
  status: text('status').default('PENDING'), // 'ACTIVE', 'SUSPENDED'
  commissionRate: integer('commission_rate').default(20), // 20%
});

export const partnerClients = pgTable('partners_clients', {
  partnerId: uuid('partner_id').references(() => partners.id),
  clientId: text('client_id').references(() => users.id), // La PyME
  accessLevel: text('access_level').default('FULL'), // 'READ_ONLY', 'FULL'
  linkedAt: timestamp('linked_at').defaultNow(),
}, (t) => ({
  pk: primaryKey(t.partnerId, t.clientId),
}));

export const commissions = pgTable('partners_commissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  partnerId: uuid('partner_id').references(() => partners.id),
  sourcePaymentId: text('source_payment_id'), // Pago de la suscripción del cliente
  amount: numeric('amount').notNull(),
  status: text('status').default('PENDING'), // 'PAID', 'PENDING'
});
```

### 2. Dashboard del Contador (Concepto UI)

Vista consolidada para ver el estatus fiscal de 50 clientes en una pantalla.

```svelte
<!-- src/routes/partners/dashboard/+page.svelte -->
<script>
  // Lista de clientes con semáforo fiscal
  let clients = [
    { name: 'Tacos El Paisa', status: 'CRITICAL', pendingDocs: 5, lastTax: 'UNPAID' },
    { name: 'Consultoría López', status: 'OK', pendingDocs: 0, lastTax: 'PAID' },
    // ...
  ];
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  {#each clients as client}
    <Card class={client.status === 'CRITICAL' ? 'border-red-500' : 'border-green-500'}>
      <CardHeader>
        <CardTitle>{client.name}</CardTitle>
        <Badge variant={client.status === 'CRITICAL' ? 'destructive' : 'default'}>
          {client.status === 'CRITICAL' ? 'ATENCIÓN' : 'AL CORRIENTE'}
        </Badge>
      </CardHeader>
      <CardContent>
        <p>Pendientes: {client.pendingDocs}</p>
        <Button variant="outline" href="/partners/client/{client.id}">Entrar a su cuenta</Button>
      </CardContent>
    </Card>
  {/each}
</div>
```

---

## 💡 Estrategia de Reclutamiento (Sin Presupuesto de Marketing)

### Fase 1: Los Primeros 10 Contadores (Founder Recruiting)


1. **LinkedIn Manual:** Buscar "Contador Público" + "CDMX" y enviar mensajes personalizados.
2. **Grupos de Facebook:** "Contadores Públicos México", "IMCP Jóvenes".
3. **Eventos Presenciales:** Asistir a conferencias del IMCP (networking gratis).
4. **Pitch de 30 segundos:**
   > "Te pago el 30% recurrente de cada cliente que traigas. Sin exclusividad, sin cuota. Tú sigues siendo su contador, solo usas nuestra plataforma para quitarte la talacha."


### Fase 2: Viral Loop (Contador Refiere a Contador)

- **Incentivo Adicional:** Si un contador trae a otro contador que también trae clientes, el primero gana **5% extra** de las comisiones del segundo (modelo MLM ligero, 2 niveles máximo).


### Qué NO hacer (Trampas Bootstrap):

- ❌ NO pagar por anuncios de reclutamiento.
- ❌ NO prometer "capacitación presencial" (cuesta tiempo/dinero).
- ✅ SÍ ofrecer webinar grabado de 15 min ("Cómo usar el portal").

---

## 🔗 Referencias

- **Modelo QuickBooks ProAdvisor:** Comisión 20-50% según tier.
- **ConektaHub (México):** Red de desarrolladores con revenue share.
- **IMCP:** Instituto Mexicano de Contadores Públicos.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Growth Orgánico Sin Gasto Publicitario)*
