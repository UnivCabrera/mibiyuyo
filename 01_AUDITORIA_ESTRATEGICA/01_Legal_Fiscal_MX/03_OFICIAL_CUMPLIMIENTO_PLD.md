# 👨‍💼 Perfil 03: Checklist Automatizado PLD (Ex-Oficial Cumplimiento)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos un Oficial de Cumplimiento PLD/FT certificado por $40k-60k MXN/mes para cumplir con la Ley Antilavado (LFPIORPI)."

### ✅ La Verdad Sin Dinero:

**NO somos una SOFOM ni Actividad Vulnerable** (no movemos dinero de terceros, solo consultamos datos). Por lo tanto, **NO estamos obligados** a tener un Oficial de Cumplimiento. Sin embargo, aplicamos **buenas prácticas** para evitar que EFOS usen nuestra plataforma.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Validar Lista 69-B (EFOS) | Scraper automático (actualización mensual) | $0 |
| KYC (Know Your Customer) | RFC + CURP validados en registro | $0 |
| Monitoreo transacciones | No aplica (no movemos dinero) | $0 |
| Reporte a UIF | No aplica (no somos Actividad Vulnerable) | $0 |

**Cuándo contratar:** Si cambiamos el modelo de negocio a "mover dinero" (wallets, pagos) → Ahí sí necesitamos Oficial PLD certificado.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Identificación de usuarios | ✅ Parcial | `14_LEGAL_PRIVACIDAD/02_TERMINOS_Y_CONDICIONES.md` |
| Logs de trazabilidad | ✅ Básico | `00_ARQUITECTURA_CENTRAL/02_BLUEPRINTS_VISUALES.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| PLD-001 | **Validación Lista 69-B (Scraper)** | 🔴 Bloqueante | Cheerio + Cron | $0 | Sem 1 |
| PLD-002 | Validación RFC/CURP en Registro | 🟠 Alto | Regex + DB Check | $0 | Sem 1 |
| PLD-003 | ~~Manual de PLD Completo~~ | ⏸️ Diferido | N/A | $0 | Solo si pivoteamos a Wallet |
| PLD-004 | ~~Contratar Oficial PLD~~ | ❌ Descartado | N/A | $40k/mes ⛔ | Nunca (no aplica) |

---

## 📝 ACTION ITEMS: Implementación (Stack Gratuito)

### 1. Schema de Lista Negra 69-B

```typescript
// src/lib/server/db/schema/compliance.ts
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const blacklist69B = pgTable('compliance_blacklist_69b', {
  id: uuid('id').defaultRandom().primaryKey(),
  rfc: text('rfc').notNull().unique(),
  name: text('name').notNull(), // Razón social
  status: text('status').notNull(), // 'PRESUNTO', 'DEFINITIVO'
  listedAt: timestamp('listed_at').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### 2. Validación en Registro de Usuario

```typescript
// src/lib/server/auth/register.ts
import { blacklist69B } from '$lib/server/db/schema/compliance';

export async function registerUser(rfc: string, email: string) {
  // 1. Validar RFC contra lista 69-B
  const isBlacklisted = await db.query.blacklist69B.findFirst({
    where: eq(blacklist69B.rfc, rfc.toUpperCase())
  });

  if (isBlacklisted && isBlacklisted.status === 'DEFINITIVO') {
    throw new Error('⚠️ Tu RFC está en la lista 69-B del SAT (Operaciones Presuntamente Inexistentes). No podemos registrarte.');
  }

  if (isBlacklisted && isBlacklisted.status === 'PRESUNTO') {
    // Alerta pero permitir registro (no es definitivo)
    console.warn(`RFC ${rfc} en lista 69-B (PRESUNTO). Registro permitido con monitoreo.`);
  }

  // 2. Continuar con registro normal
  await createUser({ rfc, email });
}
```

---

## 💡 Mentalidad Bootstrap: Checklist Automatizado

### Qué hace el Founder (una sola vez):

1. **Descargar la Lista 69-B del SAT** (CSV/HTML público).
2. **Importar a PostgreSQL** (script de scraping, ejecución mensual).
3. **Validar RFC en cada registro** (automatizado, $0 costo).

### Cuándo contratar Oficial PLD:

- **Trigger:** Si pivoteamos a "mover dinero" (wallet, pagos, préstamos).
- **Obligación legal:** Solo si somos SOFOM o Actividad Vulnerable (LFPIORPI).
- **Costo estimado:** $35k-50k MXN/mes + certificación CNBV.

---

## 🇲🇽 Adaptación México Profundo

### 1. Economía Informal (No Juzgar)

Muchos clientes operan en "zona gris". Nuestro mensaje debe ser:

**❌ MAL:**
> "¿Operas sin RFC? Eso es ilegal. No podemos ayudarte."

**✅ BIEN:**
> "Si aún no tienes RFC, te ayudamos a tramitarlo gratis (tutorial paso a paso). Mientras tanto, puedes usar el sistema en modo prueba."

### 2. Validación Sin Fricción

No bloquear el registro si el RFC no está en la lista. Solo alertar internamente.

```typescript
// Estrategia suave
if (isBlacklisted && isBlacklisted.status === 'PRESUNTO') {
  // No bloquear, solo monitorear
  await logInternalAlert(`RFC ${rfc} en 69-B (PRESUNTO)`);
}
```

---

## 🔗 Referencias

- **Lista 69-B del SAT:** http://omawww.sat.gob.mx/cifras_sat/Paginas/datos/vinculo.html?page=ListCompleta69B.html
- **LFPIORPI (Ley Antilavado):** Solo aplica a Actividades Vulnerables (no SaaS).
- **CNBV:** Comisión Nacional Bancaria y de Valores (supervisión PLD).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Cumplimiento Básico Sin Contratar)*

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Validación de Listas Negras (Schema)

Necesitamos una tabla para cachear las listas del 69-B del SAT y OFAC para validar RFCs al registrarse.

```typescript
// src/lib/server/db/schema/compliance.ts
import { pgTable, text, timestamp, boolean, uuid } from 'drizzle-orm/pg-core';

export const blacklists = pgTable('compliance_blacklists', {
  id: uuid('id').defaultRandom().primaryKey(),
  rfc: text('rfc').notNull().unique(), // RFC del contribuyente listado
  name: text('name').notNull(), // Razón social
  source: text('source').notNull(), // 'SAT_69B', 'OFAC', 'UIF'
  status: text('status').notNull(), // 'DEFINITIVO', 'PRESUNTO', 'DESVIRTUADO'
  listedAt: timestamp('listed_at').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const kycVerifications = pgTable('compliance_kyc', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Referencia a auth.users
  documentType: text('document_type').notNull(), // 'INE', 'ACTA_CONSTITUTIVA'
  documentUrl: text('document_url').notNull(), // URL encriptada en Storage
  verificationStatus: text('status').default('PENDING'), // 'APPROVED', 'REJECTED'
  verifiedBy: text('verified_by'), // ID del auditor interno
  verifiedAt: timestamp('verified_at'),
});
```

### 2. Función de Verificación (Pseudocódigo)

```typescript
// src/lib/server/compliance/check.ts
export async function checkBlacklist(rfc: string) {
  // 1. Normalizar RFC
  const cleanRfc = rfc.toUpperCase().trim();

  // 2. Buscar en DB local
  const match = await db.query.blacklists.findFirst({
    where: eq(blacklists.rfc, cleanRfc)
  });

  if (match && match.status === 'DEFINITIVO') {
    throw new Error('RFC_BLACKLISTED: El RFC se encuentra en listas negras del SAT (69-B).');
  }

  return { safe: true };
}
```

---

## 🔗 Referencias Normativas

- **LFPIORPI (Ley Antilavado):** Artículos sobre identificación de clientes y usuarios.
- **CFF Art. 69-B:** Listado de contribuyentes que emiten comprobantes sin activos (EFOS).

---

*Última actualización: 9 Diciembre 2025*
