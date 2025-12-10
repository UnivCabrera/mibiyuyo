# 👨‍💼 Perfil 04: Founder como DPO Temporal (Data Protection Officer)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un DPO certificado por $35k-50k MXN/mes para cumplir con la LFPDPPP."

### ✅ La Verdad Sin Dinero:

**El Founder asume el rol de DPO** hasta tener 10,000+ usuarios. La LFPDPPP **NO exige** certificaciones específicas para el DPO en México (a diferencia del GDPR europeo). Solo requiere que el responsable:

1. Publique un Aviso de Privacidad claro (✅ Ya lo tenemos).
2. Responda solicitudes ARCO en 20 días hábiles (✅ Automatizable).
3. Notifique brechas de seguridad al INAI dentro de 72 horas (✅ Protocolo simple).

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Publicar Aviso Privacidad | Template del INAI | $0 |
| Atender solicitudes ARCO | Email + formulario web | $0 |
| Logs de consentimiento | PostgreSQL (audit_consent_logs) | $0 |
| Notificar brechas al INAI | Email manual (esperamos NO usarlo) | $0 |

**Cuándo contratar DPO externo:** Cuando llegue una denuncia ante el INAI o tengamos 10k+ usuarios. Costo: $20k-35k MXN/mes.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Aviso de Privacidad | ✅ Completo | `14_LEGAL_PRIVACIDAD/01_AVISO_PRIVACIDAD_INTEGRAL.md` |
| Procedimiento ARCO | ✅ Completo | `14_LEGAL_PRIVACIDAD/03_PROCEDIMIENTO_DERECHOS_ARCO.md` |
| Política de Conservación | ✅ Completo | `14_LEGAL_PRIVACIDAD/07_POLITICA_CONSERVACION_ELIMINACION.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| DPO-001 | **Logs de Consentimiento (Audit Trail)** | 🔴 Bloqueante | PostgreSQL Schema | $0 | Sem 1 |
| DPO-002 | **Formulario Web para ARCO** | 🟠 Alto | Svelte Form | $0 | Sem 2 |
| DPO-003 | Protocolo de Brechas (Template) | 🟠 Alto | Markdown Doc | $0 | Sem 1 |
| DPO-004 | ~~Contratar DPO Certificado~~ | ❌ Descartado | N/A | $35k/mes ⛔ | Solo si denuncia INAI |

---

## 📝 ACTION ITEMS: Implementación (Stack Gratuito)

### 1. Schema de Logs de Consentimiento (Audit Trail)

```typescript
// src/lib/server/db/schema/audit.ts
import { pgTable, text, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core';

export const consentLogs = pgTable('audit_consent_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  documentId: text('document_id').notNull(), // 'AVISO_PRIVACIDAD_V1', 'TYC_V1'
  acceptedAt: timestamp('accepted_at').defaultNow().notNull(),
  ipAddress: text('ip_address').notNull(),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata'), // Snapshot del documento o hash
});

export const dataAccessLogs = pgTable('audit_data_access', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorId: text('actor_id').notNull(), // Quién accedió (Usuario o Sistema)
  resourceType: text('resource_type').notNull(), // 'CIEC', 'CFDI'
  resourceId: text('resource_id'),
  action: text('action').notNull(), // 'READ', 'DECRYPT', 'DELETE'
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  justification: text('justification'), // Razón del acceso
});
```

### 2. Registrar Consentimiento en SvelteKit

```typescript
// src/routes/register/+page.server.ts
import { consentLogs } from '$lib/server/db/schema/audit';

export const actions = {
  async register({ request, getClientAddress }) {
    const data = await request.formData();
    const acceptedTerms = data.get('acceptedTerms');

    if (!acceptedTerms) {
      return fail(400, { error: 'Debes aceptar los Términos y Condiciones' });
    }

    // Registrar consentimiento
    await db.insert(consentLogs).values({
      userId: newUser.id,
      documentId: 'TYC_V1',
      ipAddress: getClientAddress(),
      userAgent: request.headers.get('user-agent'),
      metadata: { version: '1.0', date: new Date().toISOString() }
    });
  }
};
```

---

## 💡 Mentalidad Bootstrap: Founder como DPO Temporal

### Qué hace el Founder (responsabilidades DPO):

1. **Publicar Aviso de Privacidad** (ya tenemos template).
2. **Responder solicitudes ARCO en 20 días hábiles** (email manual).
3. **Mantener logs de consentimiento** (automático vía PostgreSQL).
4. **Notificar brechas al INAI en 72 horas** (esperamos NO usarlo).

### Cuándo contratar DPO externo:

- **Trigger 1:** Primera denuncia ante el INAI.
- **Trigger 2:** 10,000+ usuarios (recomendable, no obligatorio).
- **Costo estimado:** $20k-35k MXN/mes (freelance o medio tiempo).

### Herramienta de Auto-Servicio ARCO:

```svelte
<!-- Formulario web para solicitudes ARCO -->
<form method="POST" action="/arco">
  <h2>Ejercer Derechos ARCO</h2>
  <select name="right">
    <option>Acceso (ver mis datos)</option>
    <option>Rectificación (corregir datos)</option>
    <option>Cancelación (eliminar cuenta)</option>
    <option>Oposición (no usar mis datos)</option>
  </select>
  <textarea name="description" placeholder="Describe tu solicitud"></textarea>
  <button type="submit">Enviar Solicitud</button>
</form>
```

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje Simple (No Técnico)

**❌ MAL:**
> "El tratamiento de tus datos personales se realiza conforme al Artículo 16 de la LFPDPPP."

**✅ BIEN:**
> "Usamos tus datos para darte el servicio. No los vendemos a nadie."

### 2. Transparencia Visual

Mostrar un icono de "candado" al lado de campos sensibles.

```svelte
<label>
  🔒 CIEC (Contraseña del SAT)
  <input type="password" bind:value={ciec} />
  <small>Encriptada con AES-256. Ni nosotros podemos verla.</small>
</label>
```

---

## 🔗 Referencias

- **INAI (Instituto Nacional de Transparencia):** https://www.inai.org.mx
- **LFPDPPP:** Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
- **Procedimiento ARCO:** Ya documentado en `14_LEGAL_PRIVACIDAD/03_PROCEDIMIENTO_DERECHOS_ARCO.md`.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Founder como DPO Temporal)*

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Sistema de Logs de Consentimiento (Audit Trail)

Es obligatorio poder demostrar cuándo y cómo el usuario aceptó el Aviso de Privacidad y los T&C.

```typescript
// src/lib/server/db/schema/audit.ts
import { pgTable, text, timestamp, jsonb, uuid, inet } from 'drizzle-orm/pg-core';

export const consentLogs = pgTable('audit_consent_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  documentId: text('document_id').notNull(), // 'AVISO_PRIVACIDAD_V1', 'TYC_V1'
  acceptedAt: timestamp('accepted_at').defaultNow().notNull(),
  ipAddress: inet('ip_address').notNull(),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata'), // Snapshot del documento aceptado o hash
});

export const dataAccessLogs = pgTable('audit_data_access', {
  id: uuid('id').defaultRandom().primaryKey(),
  actorId: text('actor_id').notNull(), // Quién accedió (Usuario o Sistema)
  resourceType: text('resource_type').notNull(), // 'CIEC', 'CFDI'
  resourceId: text('resource_id'),
  action: text('action').notNull(), // 'READ', 'DECRYPT', 'DELETE'
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  justification: text('justification'), // Razón del acceso (ej. 'Sincronización SAT')
});
```

### 2. Protocolo de Encriptación de Campos Sensibles

Asegurar que CIEC y FIEL nunca estén en texto plano, ni siquiera para los administradores de DB.

```typescript
// Ejemplo conceptual de uso de librería de encriptación
import { encrypt, decrypt } from '$lib/server/security/crypto';

// Al guardar
const encryptedCiec = await encrypt(userInput.ciec, process.env.DATA_ENCRYPTION_KEY);
await db.insert(credentials).values({ ciec: encryptedCiec });

// Al usar (solo en memoria, por el menor tiempo posible)
const ciec = await decrypt(record.ciec, process.env.DATA_ENCRYPTION_KEY);
await satScraper.login(rfc, ciec);
// Inmediatamente liberar memoria si es posible (garbage collection)
```

---

## 🔗 Referencias Normativas

- **LFPDPPP Art. 6:** Principios de protección de datos (Licitud, Consentimiento, Información, Calidad, Finalidad, Lealtad, Proporcionalidad y Responsabilidad).
- **GDPR (Referencia):** Aunque es México, usamos estándares GDPR para "Privacy by Design".

---

*Última actualización: 9 Diciembre 2025*
