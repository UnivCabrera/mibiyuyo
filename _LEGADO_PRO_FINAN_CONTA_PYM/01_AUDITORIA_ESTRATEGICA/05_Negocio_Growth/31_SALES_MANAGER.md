# 🤝 Perfil 31: CRM Open Source + WhatsApp Sales (Ex-Sales Manager)

**Auditoría Estratégica - Bloque E: Negocio y Growth**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Sales Manager por $40k-55k MXN/mes + Salesforce ($300-500 USD/mes) o HubSpot ($800-3k USD/mes) para gestionar el pipeline de ventas."

### ✅ La Verdad Sin Dinero:

**NO vamos a pagar Salesforce ni contratar equipo de ventas inicial.** La venta B2B en PyMEs mexicanas ocurre 90% por WhatsApp. Necesitamos un CRM ligero open-source desplegado en nuestro VPS.

**Opciones evaluadas:**

- **EspoCRM** (Open Source, PHP + MySQL, self-hosted, WhatsApp integrable)
- **Twenty** (Open Source, TypeScript + PostgreSQL, moderno, API-first)

El "Sales Manager" es el **Founder en los primeros 100 clientes** + CRM automatizado para tracking.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Salesforce CRM | EspoCRM o Twenty (Dokploy) | $0 |
| HubSpot Marketing+Sales | CRM open-source + Baileys WhatsApp | $0 |
| Sales Manager | Founder hace ventas iniciales | $0 |
| Equipo de ventas (3 personas) | Automatización + Scripts | $0 |
| Zapier/Make (integraciones) | Webhooks nativos | $0 |

**Cuándo contratar:** Cuando tengamos 200+ clientes activos Y el founder dedique >4hrs/día a ventas. Entonces contratar SDR junior ($8k-12k/mes).

---

## 🇲🇽 Análisis de Realidad Mexicana (Ventas B2B)

### 1. Psicología de Compra

- **"¿Quién me atiende?":** El empresario quiere saber que hay una persona detrás, no un bot. Necesita un nombre y un número de WhatsApp al cual reclamar si algo falla.
- **Resistencia al Cambio:** "Así lo hemos hecho siempre". La venta debe enfocarse en *cuánto tiempo/dinero pierden hoy*, no solo en lo "bonito" del nuevo sistema.
- **Ciclo de Venta:** Puede ser largo por desidia, pero se acelera drásticamente en fechas clave (Declaración Anual en Abril, Cierre Fiscal en Diciembre).

### 2. Canales Efectivos

- **WhatsApp (Rey Absoluto):** El 90% del seguimiento ocurre aquí. Audios, PDFs de cotización, dudas rápidas.
- **Llamada Telefónica:** Para el cierre final o manejo de objeciones complejas ("¿Y si me audita el SAT?").
- **Email:** Solo para formalidades (contratos, facturas). No para vender.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Propuesta de Valor | ✅ Definida | `03_MERCADO_COMPETENCIA/03_IDENTIDAD_COMERCIAL_Y_B2B.md` |
| Tipos de Cliente | ✅ 15 Arquetipos | `03_MERCADO_COMPETENCIA/02_15_TIPOS_CLIENTE.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| SAL-001 | **Decisión CRM (EspoCRM vs Twenty)** | 🔴 Bloqueante | Investigación | $0 | Sem 1 |
| SAL-002 | **Despliegue CRM en Dokploy** | 🔴 Bloqueante | Dokploy | $0 | Sem 2 |
| SAL-003 | **Integración WhatsApp (Baileys → CRM)** | 🟠 Alto | Baileys API | $50/mes | Sem 2 |
| SAL-004 | **Scripts de Ventas México Profundo** | 🟠 Alto | Markdown Docs | $0 | Sem 1 |
| SAL-005 | **Pipeline Automatizado (Drip WhatsApp)** | 🟡 Medio | BullMQ | $0 | Sem 3 |
| SAL-006 | ~~Salesforce CRM~~ | ❌ Descartado | N/A | $300-500 USD/mes ⛔ | Nunca |
| SAL-007 | ~~HubSpot Sales Hub~~ | ❌ Descartado | N/A | $800-3k USD/mes ⛔ | Nunca |
| SAL-008 | ~~Contratar Sales Manager~~ | ❌ Descartado | N/A | $40k-55k/mes ⛔ | Sem 200+ |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Evaluación de CRMs Open Source

#### Opción A: **EspoCRM** (Recomendación Bootstrap)

**Pros:**

- Open Source (AGPLv3), gratuito 100%
- Maduro (10+ años), comunidad activa
- Módulos nativos: Leads, Oportunidades, Contactos, Cuentas, Calendarios
- Integración WhatsApp disponible (vía plugins de comunidad)
- Ligero (PHP 8+ + MySQL/PostgreSQL)
- Dokploy-compatible (usa Docker oficial)

**Cons:**

- UI menos moderna (estilo 2015)
- Requiere PHP (no nativo en nuestro stack Bun/TypeScript)

**Despliegue Dokploy:**
```yaml
# docker-compose.yml para EspoCRM en Dokploy
version: '3.8'
services:
  espocrm:
    image: espocrm/espocrm:latest
    container_name: espocrm
    restart: unless-stopped
    environment:
      ESPOCRM_DATABASE_HOST: postgres
      ESPOCRM_DATABASE_NAME: espocrm
      ESPOCRM_DATABASE_USER: espocrm_user
      ESPOCRM_DATABASE_PASSWORD: ${DB_PASSWORD}
      ESPOCRM_ADMIN_USERNAME: admin
      ESPOCRM_ADMIN_PASSWORD: ${ADMIN_PASSWORD}
      ESPOCRM_SITE_URL: https://crm.finanzasmx.app
    volumes:
      - espocrm_data:/var/www/html
    ports:
      - "8080:80"
    depends_on:
      - postgres
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.espocrm.rule=Host(`crm.finanzasmx.app`)"
      - "traefik.http.routers.espocrm.entrypoints=websecure"
      - "traefik.http.routers.espocrm.tls.certresolver=letsencrypt"

  postgres:
    image: postgres:16-alpine
    container_name: espocrm_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: espocrm
      POSTGRES_USER: espocrm_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  espocrm_data:
  postgres_data:
```

#### Opción B: **Twenty** (Alternativa Moderna)

**Pros:**

- Open Source (AGPLv3)
- Stack moderno: TypeScript + React + PostgreSQL + GraphQL
- UI/UX excelente (estilo Notion/Linear)
- API-first (fácil integración con nuestro backend Bun)
- Desarrollo activo (startup europea con funding)

**Cons:**

- Menos maduro (2 años)
- Documentación en evolución
- Requiere más recursos (Node.js + PostgreSQL pesado)

**Despliegue Dokploy:**
```yaml
# docker-compose.yml para Twenty en Dokploy
version: '3.8'
services:
  twenty:
    image: twentycrm/twenty:latest
    container_name: twenty_crm
    restart: unless-stopped
    environment:
      PG_DATABASE_URL: postgresql://twenty_user:${DB_PASSWORD}@postgres:5432/twenty
      FRONT_BASE_URL: https://crm.finanzasmx.app
      SERVER_URL: https://crm.finanzasmx.app
    volumes:
      - twenty_data:/app/.local-storage
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.twenty.rule=Host(`crm.finanzasmx.app`)"
      - "traefik.http.routers.twenty.entrypoints=websecure"
      - "traefik.http.routers.twenty.tls.certresolver=letsencrypt"

  postgres:
    image: postgres:16-alpine
    container_name: twenty_db
    restart: unless-stopped
    environment:
      POSTGRES_DB: twenty
      POSTGRES_USER: twenty_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  twenty_data:
  postgres_data:
```

**Decisión: EspoCRM** (por madurez y recursos limitados del VPS)

---

### 2. Integración WhatsApp → CRM

```typescript
// src/lib/server/integrations/whatsapp-to-crm.ts
import { sendWhatsApp } from '$lib/server/channels/whatsapp';

// Webhook: Cuando llega mensaje de WhatsApp desconocido
export async function onIncomingWhatsAppMessage(phone: string, message: string) {
  // 1. Buscar si ya existe en CRM (EspoCRM API)
  const existingLead = await espoCrmApi.searchLead({ phone });

  if (!existingLead) {
    // 2. Crear lead automáticamente
    const lead = await espoCrmApi.createLead({
      name: `Lead WhatsApp (${phone})`,
      phone,
      source: 'WhatsApp Inbound',
      status: 'NEW',
      description: `Primer mensaje: "${message}"`,
    });

    // 3. Notificar al Founder
    await sendWhatsApp(
      process.env.FOUNDER_PHONE!,
      `🆕 Nuevo lead de WhatsApp:\\nTeléfono: ${phone}\\nMensaje: "${message}"\\n\\nVer en CRM: https://crm.finanzasmx.app/lead/${lead.id}`
    );
  } else {
    // Agregar interacción
    await espoCrmApi.addInteraction({
      leadId: existingLead.id,
      type: 'WhatsApp',
      summary: message,
    });
  }
}
```

---

### 3. Scripts de Ventas (WhatsApp-First)

```markdown
# 📞 Playbook de Ventas B2B México

## 🎯 Objetivo
Convertir lead frío → cliente pagando en <7 días.

## 📱 Canal Principal: WhatsApp

### Mensaje 1: Apertura (Día 1, 10am)
```
Hola [Nombre] 👋

Soy [Tu Nombre] de FinanzasMX.

Vi que descargaste nuestra guía sobre [tema].
¿Cómo llevas actualmente tu contabilidad? ¿Excel, sistema, o tu contador se encarga de todo?

Solo quiero entender si te puedo ayudar con algo específico.
```

**Esperar respuesta. Si no responde en 24hrs → Mensaje 2.**

---

### Mensaje 2: Recordatorio Suave (Día 2, 2pm)
```
Hola de nuevo [Nombre],

Por si se te pasó mi mensaje 😊

Estoy acá para resolver dudas fiscales sin compromiso.
¿Tienes 5 minutos para platicar por llamada?
```

**Si responde "No tengo tiempo" → Mensaje 3 (valor inmediato).**
**Si responde positivamente → Agendar llamada.**

---

### Mensaje 3: Dar Valor Gratis (Día 3)
```
Sin problema, te dejo esto por si te sirve:

📄 Checklist: "5 cosas que el SAT revisa en 2025 (y cómo evitar multas)"
[Link al PDF]

Cualquier duda, acá estoy 👍
```

**Esperar 3 días. Si no responde → Marcar como "LOST" en CRM.**
**Si descarga el PDF → Mensaje 4 (cierre suave).**

---

### Mensaje 4: Cierre Suave (Día 6)
```
Oye [Nombre], ¿te sirvió el checklist?

Si quieres, te puedo hacer un diagnóstico fiscal gratis de tu negocio.
Solo necesito tu CIEC (es seguro, acceso de solo lectura).

En 10 minutos te digo:
✅ Si tienes discrepancias con el SAT
✅ Cuánto pagarás de impuestos este mes
✅ Qué deducciones te estás perdiendo

¿Te late?
```

**Si acepta → Enviar link de onboarding.**
**Si dice "Tengo contador" → Objeción #1.**

---

## 🛡️ Manejo de Objeciones

### Objeción #1: "Ya tengo contador"
**Respuesta:**
```
¡Perfecto! No queremos reemplazarlo 😊

De hecho, la app le facilita la vida a él (y a ti).

En lugar de que te pida estados de cuenta y facturas cada mes,
todo se sincroniza automático.

Él sigue siendo tu contador, pero tú tienes el control en tiempo real.

¿Quieres que te muestre cómo funciona en una videollamada de 10 min?
```

---

### Objeción #2: "Está muy caro"
**Respuesta:**
```
Te entiendo.

Solo para que dimensiones:

- Una multa del SAT por discrepancia → desde $3,000 MXN
- Un error en tu declaración → hasta $15,000 MXN
- Nuestra app → $149 MXN/mes (menos de $5 pesos al día)

Literal cuesta menos que un café diario ☕

Además, el primer mes es gratis. Si no ves el valor, cancelas sin broncas.
¿Le entramos?
```

---

### Objeción #3: "Ahorita no, en unos meses"
**Respuesta:**
```
Sin problema, lo respeto.

Solo ten en cuenta que el SAT ya está cruzando datos con IA.
Si detecta discrepancias, te llega carta invitación (o peor, congelamiento de cuenta).

¿Te parece si te agendo un recordatorio para [fecha específica que mencione]?
Mientras, te comparto nuestro blog con tips fiscales gratis 👇
[Link]
```

---

## 📊 Métricas de Éxito

- **Tasa de respuesta inicial:** >40% (México responde WhatsApp)
- **Conversión Lead → Trial:** >25%
- **Conversión Trial → Pago:** >60%
- **Tiempo promedio de cierre:** 7-14 días
```

---

### 4. Pipeline Automatizado (Drip Campaign)

```typescript
// src/lib/server/sales/drip-campaign.ts
import { BullMQ } from 'bullmq';
import { sendWhatsApp } from '$lib/server/channels/whatsapp';

// Secuencia automatizada para leads que no responden
export async function startDripCampaign(leadId: string, phone: string, name: string) {
  const queue = new Queue('sales-drip');

  // Día 1: Mensaje inicial
  await queue.add('send-intro', {
    leadId,
    phone,
    name,
    message: getIntroMessage(name),
  }, { delay: 0 });

  // Día 2: Recordatorio
  await queue.add('send-reminder', {
    leadId,
    phone,
    name,
    message: getReminderMessage(name),
  }, { delay: 24 * 60 * 60 * 1000 }); // 24 horas

  // Día 3: Valor gratis (PDF)
  await queue.add('send-value', {
    leadId,
    phone,
    message: getFreeValueMessage(),
  }, { delay: 3 * 24 * 60 * 60 * 1000 }); // 3 días

  // Día 6: Cierre suave
  await queue.add('send-close', {
    leadId,
    phone,
    name,
    message: getSoftCloseMessage(name),
  }, { delay: 6 * 24 * 60 * 60 * 1000 }); // 6 días
}

function getIntroMessage(name: string): string {
  return `Hola ${name} 👋\\n\\nSoy [Founder] de FinanzasMX.\\n\\nVi que descargaste nuestra guía. ¿Cómo llevas tu contabilidad actualmente?`;
}
```

---

## 💰 Proyección de Conversión (Primeros 6 Meses)

### Escenario Conservador:

- **Mes 1:** 50 leads → 20 conversaciones → 5 trials → 3 pagos (6% conversión)
- **Mes 3:** 150 leads → 60 conversaciones → 18 trials → 11 pagos (7.3%)
- **Mes 6:** 400 leads → 160 conversaciones → 56 trials → 36 pagos (9%)

**MRR Mes 6:** 36 clientes × $149 = $5,364 MXN/mes

### Escenario Optimista (con referidos funcionando):

- **Mes 6:** 800 leads → 320 conversaciones → 112 trials → 78 pagos (9.75%)
- **MRR Mes 6:** 78 clientes × $149 = $11,622 MXN/mes

---

## 💡 Mentalidad Bootstrap: Founder como Primer "Sales Team"

### Qué hace el Founder (primeros 100 clientes):

1. **Responder TODOS los WhatsApps personalmente** (aprender objeciones reales).
2. **Hacer 10 llamadas de ventas/semana** (grabar y analizar).
3. **Documentar cada objeción y su respuesta efectiva** (crear playbook).
4. **Pedir feedback brutal** ("¿Por qué NO compraste?").

### Cuándo contratar primer SDR:

- **Trigger:** >50 leads/semana Y founder dedica >4hrs/día a ventas.
- **Perfil ideal:** Estudiante de Contabilidad/Administración, quiere aprender SaaS.
- **Compensación:** $8k-12k/mes base + 10% comisión por venta cerrada.

### Resumen de Ahorro:

| Concepto | Costo Tradicional | Costo Bootstrap | Ahorro Anual |
|:---------|:------------------|:----------------|:-------------|
| Sales Manager | $40k-55k/mes × 12 | $0 (Founder) | $480k-660k/año |
| Salesforce CRM | $300-500 USD/mes × 12 | $0 (EspoCRM Dokploy) | $72k-120k/año |
| HubSpot Sales Hub | $800-3k USD/mes × 12 | $0 | $192k-720k/año |
| SDR Team (3 personas) | $25k/mes × 3 × 12 | $0 (primeros 6 meses) | $900k/año |
| Zapier/Make (automatización) | $300-800 USD/mes × 12 | $0 (webhooks nativos) | $72k-192k/año |
| **TOTAL AHORROS** | **$1.716M-2.69M/año** | **$600/año (WhatsApp)** | **$1.71M-2.69M/año** |

---

## 🔗 Referencias

- **SPIN Selling (Neil Rackham):** Preguntas de Situación, Problema, Implicación, Necesidad.
- **"The Sales Acceleration Formula" (Mark Roberge):** Playbook de HubSpot pre-IPO.
- **EspoCRM Documentation:** https://docs.espocrm.com/
- **Twenty CRM:** https://twenty.com/

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Founder-Led Sales, CRM Self-Hosted)*
