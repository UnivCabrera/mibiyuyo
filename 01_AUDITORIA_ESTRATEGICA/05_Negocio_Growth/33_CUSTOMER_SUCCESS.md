# 😇 Perfil 33: Health Score Automatizado (Ex-Customer Success Manager)

**Auditoría Estratégica - Bloque E: Negocio y Growth**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Customer Success Manager por $35k-45k MXN/mes + Intercom ($79-149 USD/mes) o Zendesk ($55-115 USD/mes) para gestionar la retención y soporte."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar equipo de CS ni pagar herramientas de soporte.** La retención se logra con un **algoritmo de Health Score en SQL** que detecta inactividad y dispara alertas automáticas por WhatsApp.

El "Customer Success Manager" es el **Founder respondiendo WhatsApps** + sistema automatizado de detección de riesgo de churn.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| CS Manager | Founder (primeros 200 usuarios) | $0 |
| Intercom/Zendesk | WhatsApp + Health Score SQL | $50/mes (Baileys) |
| Onboarding calls | Videos Loom (ya implementados) | $0 |
| NPS surveys | SQL query + email simple | $0 |
| Customer database | PostgreSQL analytics | $0 |

**Cuándo contratar:** Cuando tengamos 200+ usuarios activos Y soporte quite >3hrs/día al founder. Entonces contratar CSM junior ($8k-12k/mes).

---

## 🇲🇽 Análisis de Realidad Mexicana (Success)

### 1. El "Apapacho" Digital

- **High-Touch Onboarding:** El usuario promedio tiene pánico de picarle mal y "echarse al SAT encima". El CSM debe ofrecer sesiones de acompañamiento (Zoom/Meet) de 15 min para la configuración inicial (FIEL, Sellos).
- **Lenguaje de Paz:** Prohibido usar tecnicismos fríos. En lugar de "Error de validación XSD", decir "Parece que hay un detalle con el RFC del cliente, vamos a corregirlo juntos".

### 2. KPIs de Ansiedad

- **Time-to-First-Invoice (TTFI):** Si no factura en la primera semana, se va.
- **NPS Relacional:** "¿Qué tan tranquilo te sientes con nuestra plataforma?"

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Onboarding UI | ✅ Diseñado | `01_AUDITORIA_ESTRATEGICA/04_Producto_Humano/29_USER_ONBOARDING.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| CSM-001 | **Biblioteca de Videos Loom (60+ tutoriales)** | 🔴 Bloqueante | Loom (Gratis) | $0 | Sem 1-2 |
| CSM-002 | **Health Score del Cliente (Algoritmo de Riesgo)** | 🟠 Alto | Backend Custom | $0 | Sem 2 |
| CSM-003 | **Onboarding Wizard (5 Steps Obligatorios)** | 🟠 Alto | Svelte Component | $0 | Sem 2 |
| CSM-004 | **FAQ Bot (Respuestas Automáticas WhatsApp)** | 🟡 Medio | Baileys (WA API) | ~$50/mes | Fase 2 |
| CSM-005 | ~~Chat de Soporte Humano (Intercom)~~ | ❌ Descartado | N/A | $79/mes ⚠️ | Nunca |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Algoritmo de Health Score (Detección de Riesgo)

Detectar usuarios que están "sufriendo" en silencio (no facturan, errores constantes) para intervenir proactivamente.

```typescript
// src/lib/server/success/health.ts
import { db } from '$lib/server/db';

export async function calculateCustomerHealth(userId: string) {
  const user = await db.query.users.findFirst({ where: eq(users.id, userId) });
  const lastLogin = user.lastLogin;
  const failedInvoices = await getFailedInvoicesCount(userId, '7d'); // Últimos 7 días
  const supportTickets = await getOpenTicketsCount(userId);

  let score = 100;

  // Penalización por inactividad (Riesgo de abandono)
  const daysInactive = differenceInDays(new Date(), lastLogin);
  if (daysInactive > 7) score -= 20;
  if (daysInactive > 30) score -= 50;

  // Penalización por frustración (Errores al facturar)
  score -= (failedInvoices * 5);

  // Penalización por problemas no resueltos
  score -= (supportTickets * 10);

  // Acción Proactiva
  if (score < 50) {
    await triggerAlertToCSM(userId, 'RIESGO_CHURN', `Score: ${score}. Usuario frustrado.`);
    await sendWhatsApp(user.phone, 'Hola, noté que has tenido problemas para facturar. ¿Quieres que nos conectemos 5 min para ayudarte?');
  }

  return score;
}
```

---

## 💡 Mentalidad Bootstrap: Founder como "Primer CSM"

### Qué hacer YO (Founder) en los primeros 100 usuarios:

1. **Responder WhatsApps Personalmente:** Aprendo los dolores reales.
2. **Grabar 1 Video Loom por cada Pregunta Nueva:** Construyo la biblioteca de auto-ayuda.
3. **Llamadas de Onboarding (Solo para Plan NEGOCIO/BUSINESS):** Cobro más, doy más.
4. **Tracking Manual de Churn:** Excel/Notion con "Razón de Cancelación" para cada baja.

### Cuándo contratar el primer CSM:

- **Trigger:** Cuando tenga 200+ usuarios activos Y el soporte me quite +3 horas/día.
- **Perfil Ideal:** Estudiante de Contabilidad que quiera aprender y gane por comisión.
- **Pago Estimado:** $3,000-5,000 MXN/mes base + 10% de MRR retenido.

---

## 🔗 Referencias

- **"The Mom Test" (Rob Fitzpatrick):** Valida el problema antes de escalar soporte.
- **Jason Fried (Basecamp):** "Stay small. Stay profitable. Stay bootstrapped."
- **SAT 2026:** Vigilancia profunda y cartas invitación automáticas.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap Survival (Sin Capital Inicial)*
