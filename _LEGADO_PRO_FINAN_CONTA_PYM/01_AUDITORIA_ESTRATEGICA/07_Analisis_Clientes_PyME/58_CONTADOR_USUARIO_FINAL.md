# 🧮 PERFIL 58: CONTADOR USUARIO FINAL - Análisis Cliente PyME

**Bloque:** G | **Tanda:** 1 | **Fecha:** 9 Dic 2025
**Base:** Expansión Perfil 39 `03_40_PERFILES_PROFESIONALES.md`

---

## 1. 😰 DOLOR REAL

> **"Soy contador y tengo 15 clientes PyME. Cada uno usa un Excel distinto. Cuando me preguntan 'Cuánto debo de ISR este mes?' tardo 2 horas en calcular porque tengo que abrir 3 archivos, descargar XMLs del SAT, cruzar con su contabilidad manual, y rezar que cuadre. Cobro $3,500/mes por cliente pero pierdo 30 hrs/mes en tareas repetitivas. Gano $52k/mes pero trabajo 80 hrs/semana."**

**Problema:** Los contadores necesitan la herramienta ELLOS MISMOS para servir a sus clientes.

---

## 2. 🎯 MÓDULO CRÍTICO

**"Panel Multi-Cliente para Contadores (God Mode para 50+ Clientes)"**

### ¿Qué Resuelve?

1. **Dashboard consolidado:** Ver todos los clientes en un panel
2. **Facturación batch:** Generar 20 CFDIs en 5 minutos
3. **DIOT consolidado:** Un archivo para TODOS los clientes
4. **Alertas fiscales:** "Cliente ABC vence declaración en 3 días"
5. **Reportes automáticos:** PDF mensual por cliente (email auto)

---

### Schema PostgreSQL

```typescript
export const accountantClients = pgTable('accountant_clients', {
  id: serial('id').primaryKey(),
  accountantId: integer('accountant_id').references(() => users.id).notNull(),
  clientUserId: integer('client_user_id').references(() => users.id), // Si el cliente tiene cuenta propia
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientRfc: varchar('client_rfc', { length: 13 }).notNull().unique(),
  clientEmail: varchar('client_email', { length: 255 }),
  monthlyFee: decimal('monthly_fee', { precision: 8, scale: 2 }), // Honorarios
  status: varchar('status', { length: 20 }).default('active'), // active | suspended | inactive
  createdAt: timestamp('created_at').defaultNow(),
});

export const clientTasksAutomation = pgTable('client_tasks_automation', {
  id: serial('id').primaryKey(),
  accountantId: integer('accountant_id').references(() => users.id).notNull(),
  clientId: integer('client_id').references(() => accountantClients.id).notNull(),
  taskType: varchar('task_type', { length: 100 }).notNull(), // monthly_report | diot | declaration
  dueDate: timestamp('due_date').notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // pending | completed | overdue
  completedAt: timestamp('completed_at'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

### Endpoint ElysiaJS: Panel Consolidado

```typescript
// GET /api/v1/accountant/dashboard
.get('/dashboard', async ({ user }) => {
  // Verificar que el usuario es contador
  if (user.role !== 'accountant') {
    throw new Error('Solo contadores tienen acceso a este panel');
  }

  // Obtener todos los clientes
  const clients = await db.query.accountantClients.findMany({
    where: eq(accountantClients.accountantId, user.id),
  });

  // Para cada cliente, calcular KPIs
  const clientsWithKpis = await Promise.all(clients.map(async client => {
    // Total facturado este mes
    const currentMonth = new Date().toISOString().slice(0, 7); // '2026-01'
    const invoicesThisMonth = await db.query.invoices.findMany({
      where: (invoices, { and, eq, gte, lte }) =>
        and(
          eq(invoices.userId, client.clientUserId),
          gte(invoices.createdAt, new Date(`${currentMonth}-01`)),
          lte(invoices.createdAt, new Date(`${currentMonth}-31`))
        ),
    });

    const totalInvoiced = invoicesThisMonth.reduce((sum, inv) => sum + Number(inv.total), 0);

    // ISR estimado (simple: 10% para RESICO, 30% para PFAE)
    const isrEstimated = totalInvoiced * 0.10; // Simplificado

    // Tareas pendientes
    const pendingTasks = await db.query.clientTasksAutomation.findMany({
      where: (tasks, { and, eq }) =>
        and(eq(tasks.clientId, client.id), eq(tasks.status, 'pending')),
    });

    return {
      id: client.id,
      name: client.clientName,
      rfc: client.clientRfc,
      monthlyFee: Number(client.monthlyFee),
      totalInvoiced,
      isrEstimated,
      pendingTasks: pendingTasks.length,
    };
  }));

  // Totales consolidados
  const totalRevenue = clientsWithKpis.reduce((sum, c) => sum + c.monthlyFee, 0);
  const totalInvoicedAllClients = clientsWithKpis.reduce((sum, c) => sum + c.totalInvoiced, 0);

  return {
    accountant: {
      name: user.name,
      email: user.email,
      totalClients: clients.length,
      monthlyRevenue: totalRevenue,
    },
    clients: clientsWithKpis,
    consolidatedStats: {
      totalInvoicedAllClients,
      averagePerClient: totalInvoicedAllClients / clients.length,
    },
  };
})

// POST /api/v1/accountant/batch-diot - DIOT consolidado
.post('/batch-diot', async ({ user, body }) => {
  const { clientIds, year } = body;

  const diotData = [];

  for (const clientId of clientIds) {
    const client = await db.query.accountantClients.findFirst({
      where: eq(accountantClients.id, clientId),
    });

    // Obtener retenciones del cliente
    const retentions = await db.query.insuranceRetentions.findMany({
      where: (retentions, { and, eq, gte, lte }) =>
        and(
          eq(retentions.userId, client.clientUserId),
          gte(retentions.retentionDate, new Date(`${year}-01-01`)),
          lte(retentions.retentionDate, new Date(`${year}-12-31`))
        ),
    });

    // Agregar a DIOT consolidado\n    diotData.push({\n      clientRfc: client.clientRfc,\n      clientName: client.clientName,\n      retentions: retentions.length,\n      totalAmount: retentions.reduce((sum, r) => sum + Number(r.commissionAmount), 0),\n    });\n  }\n  \n  return {\n    success: true,\n    diotData,\n    filename: `DIOT_CONSOLIDADO_${year}.txt`,\n  };\n})\n```\n\n---\n\n## 3. 📢 ESTRATEGIA BOOTSTRAP\n\n### Canal #1: Colegios de Contadores\n\n**Target:** Colegio de Contadores Públicos CDMX\n\n**Estrategia:** Ponencia \"Cómo Atender 50 Clientes con Tecnología\" en congreso anual.\n\n---\n\n### Canal #2: LinkedIn B2B\n\n**Post:**\n\n> "Contadores: ¿Cuántas horas pierden al mes en tareas repetitivas?  \n> Yo perdía 30 hrs. Ahora 5 hrs gracias a automatización.  \n> Les enseño cómo. DM."\n\n---\n\n## 4. 🔮 VISIÓN ESTRATÉGICA\n\n### Pricing Especial B2B\n\n**Plan ENTERPRISE (Custom):**\n\n- $999/mes base + $20/mes por cliente\n- Ejemplo: 30 clientes = $999 + $600 = $1,599/mes\n- **ROI contador:** Ahorra 25 hrs/mes × $500/hr = $12,500/mes de valor\n\n---\n\n## 5. ⚙️ IMPLEMENTACIÓN\n\n**Prioridad:** 🔴🔴 MUY ALTA (B2B = 1 contador = 30 usuarios finales)  \n**Complejidad:** ⭐⭐⭐⭐⭐ (5/5) - Multi-tenant, permisos complejos, DIOT consolidado  \n**Tiempo:** 12-15 días\n\n---\n\n## 💰 MODELO NEGOCIO\n\n| Clientes del Contador | Precio Mensual |\n|:-:|:-:|\n| 1-10 | $999 |\n| 11-30 | $999 + $20/cliente extra |\n| 31-50 | $999 + $15/cliente extra |\n| 51+ | Negociado |\n\n**ARR de 100 contadores con 20 clientes c/u:** $999 × 100 = $99,900/mes = **$1.2M MXN/año**\n\n---\n\n**Próximo:** 59 - Profesor Particular\n
