# ✍️ Perfil 25: Founder como Content Strategist (UX Writing Anti-Corporativo)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Content Strategist certificado por $35k-50k MXN/mes para definir el tono de voz y crear copy estratégico."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** El Founder escribe el copy inicial usando plantillas y patrones basados en neurociencia. El tono ya está definido: **Anti-Corporativo, Empático, Directo** (ver Framework Neurofinanzas).

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Definir Tono de Voz | Ya definido en `04_NEUROFINANZAS_FRAMEWORK.md` | $0 |
| Microcopy (botones, errores) | Plantillas JSON i18n con ejemplos | $0 |
| Emails Transaccionales | Svelte-Email + Resend (3k gratis/mes) | $0 |
| Términos Financieros | Tooltips con shadcn-svelte | $0 |
| Content Writer externo | Solo en Fase 3 (si necesario) | $15k-25k/mes |

**Cuándo contratar:** Fase 3 (15k+ usuarios), si los datos muestran abandono por copy confuso.

**Ahorro:** $420k-600k MXN/año

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Tono de Voz | ✅ Completo | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 7) |
| Mensajería Neuro-Optimizada | ✅ Completo | `04_NEUROFINANZAS_FRAMEWORK.md` (Sistema de Mensajes) |
| 100 Necesidades Diarias | ✅ Investigación | `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` |
| Email Transaccional | ✅ Vendor | Resend (Stack Definitivo) |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| CNT-001 | **Sistema i18n (paraglide-js)** | 🔴 Bloqueante | paraglide-js (Svelte nativo) | $0 | Sem 1 |
| CNT-002 | **Plantillas Email Transaccional** | 🟠 Alto | Svelte-Email + Resend | $0 | Sem 2 |
| CNT-003 | **Tooltips de Términos Financieros** | 🟡 Medio | shadcn-svelte Tooltip | $0 | Sem 3 |
| CNT-004 | **Mensajes de Error Amigables** | 🟠 Alto | JSON centralizado | $0 | Sem 2 |
| CNT-005 | ~~Contratar Content Writer~~ | ❌ Descartado | N/A | $35k/mes ⛔ | Nunca (Fase 1-2) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Tono de Voz Anti-Corporativo (Guía Rápida)

Basado en `04_NEUROFINANZAS_FRAMEWORK.md`, sección 7:

**❌ MAL (Tono Bancario):**
> "Su saldo disponible ha sido actualizado satisfactoriamente. Para consultar el detalle de movimientos, acceda al módulo correspondiente."

**✅ BIEN (Tono Amigo Experto):**
> "Listo, tu saldo se actualizó. ¿Quieres ver a dónde se fue tu dinero? [Ver movimientos]"

**Principios del Copy México Profundo:**

| Principio | Ejemplo |
|:----------|:--------|
| **Tutear siempre** | "Tu saldo" (no "Su saldo") |
| **Evitar jargón** | "Dinero disponible" (no "Capital líquido") |
| **Emojis estratégicos** | "✅ Listo" (refuerza recompensa dopamina) |
| **Acción clara** | "Guardar cambios" (no "Proceder") |
| **Cero culpa** | "Intenta de nuevo" (no "Error del usuario") |

### 2. Sistema i18n con paraglide-js (Svelte Nativo)

```typescript
// src/lib/i18n/es-MX.json
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "loading": "Cargando...",
    "success": "¡Listo! ✅",
    "error_generic": "Algo salió mal, pero no es tu culpa. Intenta de nuevo."
  },
  "dashboard": {
    "welcome": "Hola, {name} 👋",
    "balance_label": "Tienes disponible:",
    "empty_state": "Aún no tienes movimientos. Agrega tu primer gasto para empezar.",
    "cta_add": "Agregar gasto"
  },
  "errors": {
    "network": "Perdiste conexión. Tus datos están seguros, intenta cuando tengas internet.",
    "auth_failed": "Email o contraseña incorrectos. ¿Olvidaste tu contraseña?",
    "file_too_large": "El archivo es muy grande. Máximo 5 MB."
  },
  "tooltips": {
    "rfc": "Tu Registro Federal de Contribuyentes (13 caracteres). Lo encuentras en tu Cédula Fiscal.",
    "regimen_fiscal": "Cómo declaras impuestos ante el SAT (ej: 'Sueldos y Salarios' si tienes nómina).",
    "cfdi": "Comprobante Fiscal Digital por Internet. Es tu factura electrónica válida ante el SAT."
  }
}
```

**Uso en Svelte 5:**

```svelte
<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<h1>{$t('dashboard.welcome', { name: user.name })}</h1>
<button>{$t('common.save')}</button>
```

### 3. Plantillas de Email Transaccional (Svelte-Email + Resend)

**Stack:** Resend tiene SDK nativo para Svelte, perfecta integración con Svelte-Email.

```svelte
<!-- src/lib/emails/welcome.svelte -->
<script lang="ts">
  let { name } = $props<{ name: string }>();
</script>

<html lang="es-MX">
  <head>
    <style>
      body { font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: #10b981; color: white; padding: 20px; text-align: center; border-radius: 8px; }
      .content { padding: 30px 20px; line-height: 1.6; }
      .cta { display: inline-block; background: #10b981; color: white; padding: 12px 24px;
             text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>¡Bienvenido a FinTech! 🎉</h1>
    </div>
    <div class="content">
      <p>Hola {name},</p>
      <p>
        Estamos felices de tenerte aquí. FinTech es tu aliado para llevar control
        de tus finanzas sin complicaciones, en español y adaptado a México.
      </p>
      <p><strong>Tu próximo paso:</strong> Configura tu perfil en 2 minutos.</p>
      <a href="https://app.fintech.mx/onboarding" class="cta">
        Configurar mi cuenta
      </a>
      <p>
        Si tienes dudas, solo responde este email o envíanos WhatsApp al
        <a href="https://wa.me/5215512345678">55 1234 5678</a>.
      </p>
      <p>¡A darle! 💪</p>
      <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
        Este correo fue enviado porque te registraste en FinTech.
        Si no fuiste tú, ignora este mensaje.
      </p>
    </div>
  </body>
</html>
```

**Envío desde Backend (ElysiaJS):**

```typescript
// src/lib/server/email.ts
import { Resend } from 'resend';
import WelcomeEmail from '$lib/emails/welcome.svelte';
import { render } from 'svelte-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(name: string, email: string) {
  const html = render({
    template: WelcomeEmail,
    props: { name }
  });

  await resend.emails.send({
    from: 'FinTech <hola@fintech.mx>',
    to: email,
    subject: `¡Bienvenido a FinTech, ${name}! 🎉`,
    html
  });
}
```

**Plantillas a Crear (Fase 1):**

| Email | Trigger | Objetivo |
|:------|:--------|:---------|
| **Bienvenida** | Registro completo | Activar onboarding |
| **Verificación** | Signup | Confirmar email (2FA) |
| **Recuperación Password** | "Olvidé contraseña" | Reset seguro |
| **Meta Completada** | Usuario alcanza meta | Refuerzo dopamina 🎉 |
| **Recordatorio Impuestos** | 10 días antes de vencimiento | Prevenir multas |

### 4. Tooltips de Términos Financieros

Usar shadcn-svelte `Tooltip` para explicar términos complejos inline.

```svelte
<!-- src/lib/components/text/FinancialTerm.svelte -->
<script lang="ts">
  import { Tooltip } from '$lib/components/ui/tooltip';
  import { t } from '$lib/i18n';

  let { term } = $props<{ term: string }>();
  let definition = $derived($t(`tooltips.${term}`));
</script>

<Tooltip>
  {#snippet trigger()}
    <span class="underline decoration-dotted decoration-emerald-500 cursor-help">
      {term === 'rfc' ? 'RFC' : term === 'cfdi' ? 'CFDI' : term}
    </span>
  {/snippet}
  {#snippet content()}
    <p class="max-w-xs text-sm leading-relaxed">{definition}</p>
  {/snippet}
</Tooltip>

<style>
  span:hover {
    color: var(--color-primary-600);
  }
</style>
```

**Uso:**

```svelte
<p>
  Ingresa tu <FinancialTerm term="rfc" /> para validar tu identidad.
</p>
```

### 5. Mensajes de Error Amigables (Centralizados)

```typescript
// src/lib/utils/friendly-errors.ts
export const friendlyErrors: Record<string, string> = {
  // Network
  'ERR_NETWORK': 'Perdiste conexión. Tus datos están seguros, intenta cuando tengas internet.',
  'ERR_TIMEOUT': 'La conexión tardó mucho. ¿Tienes señal débil? Intenta de nuevo.',

  // Auth
  'AUTH_INVALID_CREDENTIALS': 'Email o contraseña incorrectos. ¿Olvidaste tu contraseña?',
  'AUTH_EMAIL_NOT_VERIFIED': 'Verifica tu email primero. Te enviamos un correo de confirmación.',
  'AUTH_ACCOUNT_DISABLED': 'Tu cuenta está desactivada. Contáctanos si crees que es un error.',

  // Validation
  'VALIDATION_RFC_INVALID': 'El RFC no es válido. Debe tener 13 caracteres (12 si eres persona física).',
  'VALIDATION_FILE_TOO_LARGE': 'El archivo es muy grande. Máximo 5 MB.',

  // SAT
  'SAT_CIEC_INVALID': 'Tu contraseña del SAT (CIEC) es incorrecta. Verifica en sat.gob.mx primero.',
  'SAT_SERVICE_DOWN': 'El SAT está en mantenimiento. Intenta en 1 hora.',

  // Generic
  'UNKNOWN_ERROR': 'Algo salió mal, pero no es tu culpa. Ya lo reportamos. Intenta de nuevo.'
};

export function getFriendlyError(code: string): string {
  return friendlyErrors[code] || friendlyErrors.UNKNOWN_ERROR;
}
```

---

## 💡 Mentalidad Bootstrap: Copy = Código, No Burocracia

### Qué hace el Founder:

1. **Escribir copy inicial** usando patrones del Framework Neurofinanzas.
2. **Centralizar textos** en archivos JSON i18n (fácil de buscar/reemplazar).
3. **Testear con usuarios reales** (WhatsApp feedback) y ajustar.

### Qué NO hace el Founder:

- ❌ Crear guías de estilo de 50 páginas (innecesario en MVP).
- ❌ Contratar agencia de branding ($100k-300k).
- ❌ Hacer A/B testing de copy (sin tráfico suficiente).

### Herramientas Gratuitas:

- **paraglide-js:** i18n nativo para Svelte (compilado, 0KB runtime).
- **Svelte-Email:** Plantillas de email en Svelte.
- **Resend:** 3,000 emails/mes gratis (suficiente para Fase 1).
- **shadcn-svelte Tooltip:** Componente accesible para explicar términos.

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje Coloquial (pero no informal)

**Coloquial ✅:**
> "¿Cuánto traes en tu cartera?"

**Informal ❌:**
> "¿Cuánto cash cargas, carnal?"

**Corporativo ❌:**
> "¿Cuál es su capital disponible líquido?"

### 2. Explicar TODO (No Asumir Conocimiento)

El 60% de los mexicanos no sabe qué es un RFC hasta que lo necesita.

**Tooltip de RFC:**
> "Tu Registro Federal de Contribuyentes. Es como tu INE, pero para impuestos. Lo encuentras en tu Cédula Fiscal (descárgala del SAT)."

**Tooltip de CFDI:**
> "Comprobante Fiscal Digital por Internet. Es el nombre oficial de las facturas electrónicas en México. Si vendes algo, debes dar CFDI al cliente."

### 3. Casos de Uso Mexicanos en Copy

**Email de Meta Completada:**
> "¡Lograste ahorrar $10,000 MXN! 🎉 Ya tienes para tu fondo de emergencias (o esos tacos que te mereces)."

**Recordatorio de Impuestos:**
> "El 17 de enero vence la declaración mensual. No dejes que el SAT te multe. [Declarar ahora]"

---

## 🔗 Referencias

- **Framework Neurofinanzas:** `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 7).
- **100 Necesidades Diarias:** `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md`.
- **Mailchimp Content Style Guide:** Inspiración para tono amigable.
- **Plain Language Guidelines:** https://plainlanguage.gov

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Founder escribe copy usando patrones, Cero Agencias)*
