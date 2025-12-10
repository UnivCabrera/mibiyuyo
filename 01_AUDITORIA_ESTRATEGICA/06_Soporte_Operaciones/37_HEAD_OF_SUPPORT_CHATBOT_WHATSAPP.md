# 🤖 Perfil 37: Head of Customer Support → Chatbot WhatsApp + Wiki SvelteKit

**Fecha:** 8 Diciembre 2025
**Bloque:** F (Soporte y Operaciones)
**Filosofía:** Bootstrap + México Profundo + Automation-First

---

## 🎯 Transformación Radical

### ❌ ROL TRADICIONAL (ELIMINADO)

- **Cargo:** Head of Customer Support / Support Manager
- **Salario:** $35,000 - $50,000 MXN/mes
- **Herramientas SaaS:**
  - Zendesk Support ($55-115 USD/mes por agente = $1,045-2,185 MXN)
  - Intercom ($74-395 USD/mes = $1,406-7,505 MXN)
  - Freshdesk ($15-79 USD/mes por agente = $285-1,501 MXN)
  - Call center agents (3-5 personas × $15,000-20,000 MXN/mes = $45,000-100,000 MXN/mes)
- **Costo Total Anual:** $960,000 - $1,800,000 MXN/año

### ✅ SOLUCIÓN BOOTSTRAP

**Stack 100% Open Source + Automation:**

1. **Chatbot WhatsApp con Baileys** (ya implementado en Bloque E)
2. **Base de Conocimiento:** SvelteKit + Mdsvex (Markdown → HTML)
3. **Respuestas automáticas:** Audios/Videos cortos (Loom embebido)
4. **NLP Light:** OpenAI API (solo fallback, no siempre)
5. **Tickets críticos:** PostgreSQL tabla `support_tickets` + BullMQ para escalación

**Costo Anual:** $0 MXN (infraestructura ya cubierta en Hostinger VPS)

---

## 🏗️ Arquitectura Técnica

### 1. **Chatbot WhatsApp (Baileys)**

**Archivo:** `apps/backend/src/services/whatsapp-support-bot.ts`

```typescript
// apps/backend/src/services/whatsapp-support-bot.ts
import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { db } from '../db';
import { supportTickets } from '../db/schema';
import { eq } from 'drizzle-orm';
import { openai } from '../lib/openai'; // Cliente OpenAI (fallback)
import pino from 'pino';

const logger = pino({ level: 'info' });

interface KnowledgeBaseEntry {
  keywords: string[];
  response: string;
  mediaUrl?: string; // URL Loom o video/audio
  audioPath?: string; // Ruta local para audio .ogg
}

// Base de Conocimiento estática (FAQ común)
const knowledgeBase: KnowledgeBaseEntry[] = [
  {
    keywords: ['cómo', 'registrar', 'factura', 'cfdi'],
    response: 'Para registrar una factura CFDI en FinanzasMX:\n\n1. Menú "Facturas" → "Nueva Factura"\n2. Subir XML del SAT\n3. Validación automática\n4. Guardar en tu catálogo\n\n¿Tienes el XML a la mano?',
    mediaUrl: 'https://www.loom.com/share/abc123tutorial',
  },
  {
    keywords: ['costo', 'precio', 'plan', 'cuánto'],
    response: '💰 Planes FinanzasMX:\n\n• GRATIS: $0/mes (básico)\n• PRO: $149/mes (PyMEs)\n• FAMILIA: $249/mes (multi-user)\n• NEGOCIO: $299/mes (avanzado)\n• BUSINESS: $499/mes (automatización total)\n\n¿Cuál se ajusta a tu caso?',
  },
  {
    keywords: ['cancelar', 'suscripción', 'baja', 'reembolso'],
    response: 'Para cancelar tu suscripción:\n\n1. Entra a "Mi Cuenta" → "Suscripción"\n2. Clic en "Cancelar Plan"\n3. Confirma (no hay penalización)\n\nTus datos se conservan 90 días por si regresas. ¿Algo que podamos mejorar?',
    audioPath: '/media/audios/cancelacion_proceso.ogg',
  },
  {
    keywords: ['sat', 'caído', 'no funciona', 'error 500'],
    response: '⚠️ Si el SAT está caído:\n\n1. Checa nuestro "Monitor del DOF" en el Dashboard\n2. Guardamos tus facturas en caché\n3. Se sincronizarán automáticamente cuando el SAT regrese\n\nNo pierdes nada. Relax. ☕',
  },
  {
    keywords: ['rfc', 'validar', 'incorrecto', 'error rfc'],
    response: 'El RFC debe tener:\n\n• 13 caracteres (personas físicas)\n• 12 caracteres (personas morales)\n• Solo MAYÚSCULAS y números\n\nEjemplo: XAXX010101000\n\n¿Me pasas tu RFC para revisarlo?',
  },
  {
    keywords: ['ayuda', 'soporte', 'problema', 'bug', 'error'],
    response: '🆘 Estoy aquí para ayudarte.\n\nPor favor dime:\n1. ¿Qué intentabas hacer?\n2. ¿Qué error viste?\n3. ¿En qué plan estás?\n\nSi es urgente, escribe "URGENTE" y te escalo con el equipo técnico.',
  },
];

export async function startWhatsAppSupportBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./baileys_auth_support');

  const sock = makeWASocket({
    auth: state,
    logger,
    printQRInTerminal: true,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      logger.info('WhatsApp connection closed. Reconnecting:', shouldReconnect);
      if (shouldReconnect) {
        setTimeout(() => startWhatsAppSupportBot(), 5000);
      }
    } else if (connection === 'open') {
      logger.info('✅ WhatsApp Support Bot connected');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const message = m.messages[0];
    if (!message.message || message.key.fromMe) return;

    const userPhone = message.key.remoteJid!;
    const userMessage = message.message.conversation || message.message.extendedTextMessage?.text || '';

    logger.info(`📩 Mensaje de ${userPhone}: ${userMessage}`);

    // Buscar en Knowledge Base
    const matchedEntry = knowledgeBase.find((entry) =>
      entry.keywords.some((keyword) => userMessage.toLowerCase().includes(keyword))
    );

    if (matchedEntry) {
      // Respuesta automática con texto
      await sock.sendMessage(userPhone, { text: matchedEntry.response });

      // Si hay audio, enviarlo
      if (matchedEntry.audioPath) {
        await sock.sendMessage(userPhone, {
          audio: { url: matchedEntry.audioPath },
          mimetype: 'audio/ogg; codecs=opus',
          ptt: true, // Push-to-Talk (nota de voz)
        });
      }

      // Si hay video/Loom, enviar link
      if (matchedEntry.mediaUrl) {
        await sock.sendMessage(userPhone, {
          text: `📹 Video tutorial: ${matchedEntry.mediaUrl}`,
        });
      }

      return;
    }

    // Si no hay match, usar OpenAI (fallback)
    try {
      const aiResponse = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `Eres el asistente de soporte de FinanzasMX, una app de contabilidad para PyMEs mexicanas.
Responde en español mexicano, informal pero profesional. Si no sabes, di "Te conecto con soporte humano en 24h".`,
          },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 200,
      });

      const botReply = aiResponse.choices[0].message.content || 'No entendí. ¿Puedes reformular?';
      await sock.sendMessage(userPhone, { text: botReply });

      // Crear ticket para revisión humana (si es urgente)
      if (userMessage.toLowerCase().includes('urgente') || userMessage.toLowerCase().includes('crítico')) {
        await db.insert(supportTickets).values({
          userPhone,
          message: userMessage,
          status: 'open',
          priority: 'high',
          createdAt: new Date(),
        });

        await sock.sendMessage(userPhone, {
          text: '🚨 Ticket creado. El equipo técnico te responderá en máximo 4 horas.',
        });
      }
    } catch (error) {
      logger.error('Error OpenAI fallback:', error);
      await sock.sendMessage(userPhone, {
        text: 'Hubo un error al procesar tu mensaje. Por favor intenta de nuevo en unos minutos.',
      });
    }
  });
}
```

**Schema PostgreSQL:**

```typescript
// apps/backend/src/db/schema.ts (agregar)
export const supportTickets = pgTable('support_tickets', {
  id: serial('id').primaryKey(),
  userPhone: varchar('user_phone', { length: 20 }).notNull(),
  userId: integer('user_id').references(() => users.id), // Opcional, si está logueado
  message: text('message').notNull(),
  status: varchar('status', { length: 20 }).default('open'), // open | in_progress | resolved | closed
  priority: varchar('priority', { length: 20 }).default('medium'), // low | medium | high | critical
  assignedTo: integer('assigned_to'), // Si hay humano escalado
  aiResponse: text('ai_response'), // Log de lo que respondió el bot
  createdAt: timestamp('created_at').defaultNow(),
  resolvedAt: timestamp('resolved_at'),
});
```

---

### 2. **Base de Conocimiento (Wiki SvelteKit)**

**Ruta:** `apps/frontend/src/routes/docs/+page.svelte`

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let docs = $state<{ slug: string; title: string; excerpt: string }[]>([]);
  let searchQuery = $state('');

  onMount(async () => {
    // Cargar lista de documentos (endpoint o estático)
    const response = await fetch('/api/docs');
    docs = await response.json();
  });

  let filteredDocs = $derived(
    docs.filter((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
</script>

<div class="docs-container">
  <header>
    <h1>📚 Base de Conocimiento FinanzasMX</h1>
    <p>Todo lo que necesitas saber sobre contabilidad, SAT, y FinanzasMX</p>
  </header>

  <input
    type="search"
    bind:value={searchQuery}
    placeholder="Buscar documentos..."
    class="search-bar"
  />

  <div class="docs-grid">
    {#each filteredDocs as doc}
      <a href="/docs/{doc.slug}" class="doc-card">
        <h3>{doc.title}</h3>
        <p>{doc.excerpt}</p>
      </a>
    {/each}
  </div>
</div>

<style>
  .docs-container {
    max-width: var(--size-content-3);
    margin: 0 auto;
    padding: var(--size-8);
  }

  header {
    text-align: center;
    margin-bottom: var(--size-6);
  }

  .search-bar {
    width: 100%;
    padding: var(--size-3);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2);
    margin-bottom: var(--size-4);
  }

  .docs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--size-4);
  }

  .doc-card {
    padding: var(--size-4);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-2);
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s;
  }

  .doc-card:hover {
    box-shadow: var(--shadow-3);
  }
</style>
```

**Documento individual con Mdsvex:**

```svelte
<!-- apps/frontend/src/routes/docs/[slug]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  let { data } = $props();
</script>

<article class="doc-content">
  {@html data.content}
</article>

<style>
  .doc-content {
    max-width: var(--size-content-2);
    margin: 0 auto;
    padding: var(--size-6);
    line-height: 1.7;
  }

  .doc-content :global(h2) {
    margin-top: var(--size-6);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: var(--size-2);
  }

  .doc-content :global(code) {
    background: var(--surface-2);
    padding: var(--size-1);
    border-radius: var(--radius-1);
  }

  .doc-content :global(pre) {
    background: var(--surface-1);
    padding: var(--size-4);
    border-radius: var(--radius-2);
    overflow-x: auto;
  }
</style>
```

**Load Function:**

```typescript
// apps/frontend/src/routes/docs/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  try {
    // Importar archivo Markdown dinámicamente
    const doc = await import(`../../../content/docs/${params.slug}.md`);

    return {
      content: doc.default.render().html,
      metadata: doc.metadata,
    };
  } catch (e) {
    throw error(404, `Documento no encontrado: ${params.slug}`);
  }
};
```

**Ejemplo de documento Markdown:**

```markdown
<!-- apps/frontend/src/content/docs/como-registrar-factura-cfdi.md -->
---
title: "Cómo registrar una factura CFDI"
excerpt: "Guía paso a paso para subir y validar facturas del SAT"
date: "2025-12-08"
author: "FinanzasMX"
---

# Cómo registrar una factura CFDI

## 📄 ¿Qué necesitas?

- Archivo XML de la factura (descargado del SAT o recibido por email)
- Estar logueado en FinanzasMX

## 🚀 Pasos

### 1. Acceder al módulo de Facturas

Desde el Dashboard principal, haz clic en **"Facturas"** en el menú lateral.

### 2. Nueva Factura

Clic en el botón **"+ Nueva Factura"**.

### 3. Subir XML

Arrastra el archivo `.xml` o haz clic en **"Seleccionar archivo"**.

### 4. Validación automática

FinanzasMX valida:
- ✅ RFC del emisor y receptor
- ✅ UUID único (no duplicado)
- ✅ Sello digital del SAT
- ✅ Vigencia del certificado

### 5. Guardar

Si todo está correcto, la factura se guarda en tu catálogo automáticamente.

## 🎥 Video Tutorial

<iframe src="https://www.loom.com/embed/abc123tutorial" width="100%" height="400" frameborder="0" allowfullscreen></iframe>

## ❓ ¿Problemas?

Si el XML da error, verifica:
- Que sea un CFDI 4.0 válido
- Que tu RFC esté registrado correctamente
- Que el archivo no esté corrupto

**¿Aún con dudas?** Mándanos mensaje por WhatsApp al **+52 55 1234 5678**.
```

---

### 3. **Panel de Tickets (God Mode)**

Para casos escalados, panel admin en SvelteKit:

```svelte
<!-- apps/frontend/src/routes/admin/support-tickets/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let tickets = $state<any[]>([]);

  onMount(async () => {
    const response = await fetch('/api/admin/support-tickets');
    tickets = await response.json();
  });

  async function resolveTicket(id: number) {
    await fetch(`/api/admin/support-tickets/${id}/resolve`, { method: 'POST' });
    tickets = tickets.filter((t) => t.id !== id);
  }
</script>

<div class="tickets-admin">
  <h1>🎫 Tickets de Soporte</h1>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario (Teléfono)</th>
        <th>Mensaje</th>
        <th>Prioridad</th>
        <th>Estado</th>
        <th>Fecha</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      {#each tickets as ticket}
        <tr class:urgent={ticket.priority === 'high'}>
          <td>{ticket.id}</td>
          <td>{ticket.userPhone}</td>
          <td>{ticket.message.slice(0, 50)}...</td>
          <td><span class="badge {ticket.priority}">{ticket.priority}</span></td>
          <td>{ticket.status}</td>
          <td>{new Date(ticket.createdAt).toLocaleDateString('es-MX')}</td>
          <td>
            <button onclick={() => resolveTicket(ticket.id)}>Resolver</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .tickets-admin {
    padding: var(--size-6);
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

  .urgent {
    background-color: var(--red-1);
  }

  .badge {
    padding: var(--size-1) var(--size-2);
    border-radius: var(--radius-1);
    font-size: var(--font-size-0);
  }

  .badge.high {
    background-color: var(--red-3);
    color: white;
  }

  .badge.medium {
    background-color: var(--yellow-3);
  }

  .badge.low {
    background-color: var(--green-3);
  }
</style>
```

---

## 🎯 Filosofía México Profundo

### 1. **La gente NO lee FAQs**

Por eso el chatbot responde con:

- ✅ Audios de voz (formato .ogg, bajo peso)
- ✅ Videos cortos (Loom embebido)
- ✅ Texto ultra-corto (máximo 3 líneas)

### 2. **WhatsApp es el canal rey**

- 95% de mexicanos usan WhatsApp
- Email es ignorado (especialmente en gama baja)
- No necesitas app móvil nativa si tienes WhatsApp Bot

### 3. **Sin internet? Modo offline**

- La Wiki SvelteKit usa Service Workers (PWA)
- Documentos en caché
- Respuestas del bot guardadas localmente

---

## 📊 Métricas de Éxito

### KPIs a trackear:

1. **Resolution Rate:** % de preguntas resueltas sin humano
   - Meta: 85% automático
2. **Response Time:** Tiempo promedio de respuesta del bot
   - Meta: < 30 segundos
3. **Escalation Rate:** % de tickets que suben a humano
   - Meta: < 15%
4. **User Satisfaction:** NPS post-interacción
   - Meta: > 8/10

**Dashboard Grafana:**

```sql
-- Query para Grafana (PostgreSQL data source)
SELECT
  DATE_TRUNC('day', created_at) AS date,
  COUNT(*) FILTER (WHERE status = 'resolved' AND assigned_to IS NULL) AS auto_resolved,
  COUNT(*) FILTER (WHERE assigned_to IS NOT NULL) AS human_escalated,
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))) / 60 AS avg_resolution_minutes
FROM support_tickets
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY date
ORDER BY date DESC;
```

---

## 💰 Ahorro Real

| Concepto Eliminado                  | Costo Mensual   | Costo Anual     |
| ----------------------------------- | --------------- | --------------- |
| Head of Support (1 persona)         | $45,000 MXN     | $540,000 MXN    |
| Agentes de soporte (3 personas)     | $60,000 MXN     | $720,000 MXN    |
| Zendesk/Intercom (SaaS)             | $5,000 MXN      | $60,000 MXN     |
| Call center tercerizado             | $20,000 MXN     | $240,000 MXN    |
| **TOTAL ELIMINADO**                 | **$130,000 MXN** | **$1,560,000 MXN** |

| Concepto Nuevo                      | Costo Mensual   | Costo Anual     |
| ----------------------------------- | --------------- | --------------- |
| Baileys + SvelteKit + OpenAI API    | $500 MXN (API)  | $6,000 MXN      |
| VPS Hostinger (ya cubierto)         | $0 MXN          | $0 MXN          |
| **TOTAL NUEVO**                     | **$500 MXN**    | **$6,000 MXN**  |

### 🎉 Ahorro Neto: **$1,554,000 MXN/año** (99.6% reducción)

---

## 🚀 Roadmap de Implementación

### Fase 1: Setup Básico (Semana 1)

- [ ] Configurar Baileys en backend
- [ ] Crear tabla `support_tickets` en PostgreSQL
- [ ] Implementar knowledge base estática (10 preguntas FAQ)

### Fase 2: Wiki SvelteKit (Semana 2)

- [ ] Instalar Mdsvex en frontend
- [ ] Crear 20 documentos iniciales (Markdown)
- [ ] Implementar búsqueda en `/docs`

### Fase 3: Respuestas Multimedia (Semana 3)

- [ ] Grabar 10 audios de voz (respuestas comunes)
- [ ] Crear 5 videos Loom (tutoriales)
- [ ] Integrar envío de audio/video en bot

### Fase 4: OpenAI Fallback (Semana 4)

- [ ] Integrar OpenAI API para preguntas no contempladas
- [ ] Crear pipeline de escalación (BullMQ)
- [ ] Panel admin de tickets

### Fase 5: Mejora Continua (Mensual)

- [ ] Analizar logs de preguntas frecuentes
- [ ] Agregar nuevas entradas al knowledge base
- [ ] Optimizar prompts de OpenAI

---

## 🔒 Consideraciones de Seguridad

1. **Rate Limiting:** Máximo 10 mensajes/minuto por usuario (evitar spam)
2. **Validación de teléfonos:** Solo números mexicanos (+52)
3. **Logs auditables:** Guardar todas las interacciones (GDPR/INAI compliant)
4. **Secrets:** OpenAI API key en `.env` (nunca en código)

```bash
# .env
OPENAI_API_KEY=sk-proj-xxxxx
WHATSAPP_BOT_PHONE=+5215512345678
```

---

## 🎓 Capacitación (Opcional)

Si eventualmente contratas 1 humano para escalaciones complejas:

**Perfil requerido:**

- NO necesita título universitario
- Empatía + redacción básica
- Conoce FinanzasMX (dogfooding)
- Responde máximo 5-10 tickets/día (los más críticos)

**Salario sugerido:** $12,000 MXN/mes part-time (vs. $45,000 full-time tradicional)

---

## 📚 Referencias Técnicas

- **Baileys Docs:** https://github.com/WhiskeySockets/Baileys
- **Mdsvex (Markdown for Svelte):** https://mdsvex.pngwn.io/
- **OpenAI API:** https://platform.openai.com/docs/guides/chat
- **Loom Embed:** https://support.loom.com/hc/en-us/articles/360002208918

---

## ✅ Checklist Pre-Producción

- [ ] QR de WhatsApp escaneado y bot conectado
- [ ] Knowledge base con mínimo 15 entradas
- [ ] Audios grabados y subidos a `/media/audios/`
- [ ] Videos Loom creados y URLs embedeadas
- [ ] OpenAI API key configurada con créditos
- [ ] Panel admin accesible solo para God Mode users
- [ ] Pruebas end-to-end con usuarios reales (beta)

---

**Resultado:** Head of Support + 3 agentes **ELIMINADOS**. Chatbot 24/7 con 85%+ de resolución automática. Ahorro: **$1.5M MXN/año**.

**Próximo paso:** Perfil 38 (Talent/HR Manager → Freelancers).
