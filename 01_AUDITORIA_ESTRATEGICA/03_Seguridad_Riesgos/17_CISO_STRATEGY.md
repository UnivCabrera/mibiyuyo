# 👮‍♂️ Perfil 17: Founder como CISO (Políticas Automatizadas + Cloudflare)

**Auditoría Estratégica - Bloque C: Seguridad y Riesgos**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025
**Reingeniería:** Bootstrap + Seguridad Automatizada

---

## 🎯 Transformación de Rol (Bootstrap)

### Antes (Tradicional):

- **Título:** CISO Senior ($80k-120k MXN/mes)
- **Equipo:** Security Analyst + GRC Specialist ($60k MXN/mes adicional)
- **Costo Total:** $140k-180k MXN/mes = **$1.68M-2.16M MXN/año**

### Después (Bootstrap):

- **Rol:** **Founder como CISO** (políticas simples + automatización)
- **Costo:** $0 MXN/mes + Cloudflare Free (DDoS protection)
- **Contratar CISO:** Solo cuando llegues a **certificación ISO 27001** (clientes corporativos lo exijan) o **10M+ USD funding**

---

## 📋 Misión Redefinida

El **Founder** asume la estrategia de seguridad usando:

1. **Cloudflare Free Tier** (capa anti-DDoS + WAF básico)
2. **Políticas automatizadas** (código > documentos Word)
3. **Templates simples** (políticas de contraseñas, BYOD, backups)
4. **Hardening básico** (UFW, Fail2Ban, HTTPS obligatorio)

**Mentalidad Bootstrap:**

- Seguridad != Burocracia. Seguridad = Código + Config + Sentido común.
- NO necesitas ISO 27001 en MVP (overkill, cuesta $100k-300k MXN certificar).
- Priorizar: Proteger datos de usuarios > cumplir 100 controles de un framework.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Matriz de Vulnerabilidades | ✅ Identificada | `02_CIBERSEGURIDAD/50_VULNERABILIDADES.md` |
| Evaluación Herramientas | ✅ Completa | `02_CIBERSEGURIDAD/EVALUACION_HERRAMIENTAS_SEGURIDAD.md` |
| Infraestructura | ✅ Dokploy + Traefik | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |
| Respaldo Datos | ✅ Cloudflare R2 | Perfil 09 (DevOps) - Backup script |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| SEC-001 | **Cloudflare WAF (Anti-DDoS)** | 🔴 Bloqueante | Cloudflare Free | $0 | Sem 1 |
| SEC-002 | **Security Headers (Helmet)** | 🔴 Bloqueante | ElysiaJS middleware | $0 | Sem 1 |
| SEC-003 | **Rate Limiting API** | 🔴 Bloqueante | `elysia-rate-limit` | $0 | Sem 1 |
| SEC-004 | **Templates Políticas Seguridad** | 🟠 Alto | Markdown docs | $0 | Sem 2 |
| SEC-005 | **Plan Continuidad Negocio (BCP)** | 🟡 Medio | Documento simple | $0 | Sem 3 |
| SEC-006 | ~~Contratar CISO Senior~~ | ❌ Descartado | N/A | $80k-120k/mes ⛔ | Solo con ISO 27001 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Configuración Cloudflare (Anti-DDoS + WAF Gratis)

**Objetivo:** Poner Cloudflare delante del VPS para filtrar ataques antes de que lleguen a Dokploy.

```bash
# Paso 1: Crear cuenta en Cloudflare (https://dash.cloudflare.com/sign-up)
# Paso 2: Agregar dominio (ej: tuapp.com)
# Paso 3: Cambiar nameservers en Hostinger:
#   - Nameserver 1: audrey.ns.cloudflare.com
#   - Nameserver 2: neil.ns.cloudflare.com

# Paso 4: En Cloudflare Dashboard → DNS:
# A record:  @  →  IP_DEL_VPS  (Proxy: Activado 🟠)
# CNAME:     www  →  tuapp.com  (Proxy: Activado 🟠)

# Paso 5: SSL/TLS → Full (strict)
# Paso 6: Security → WAF → Managed Rules (activar)
# Paso 7: Security → DDoS Protection (activado por defecto en Free)
```

**Reglas WAF Gratuitas (activar):**

- ✅ OWASP ModSecurity Core Rule Set
- ✅ Cloudflare Managed Ruleset
- ✅ Cloudflare Bot Management (básico)

**Resultado:** Cloudflare filtra ~90% de ataques DDoS, bots maliciosos y SQL Injection antes de tocar tu VPS.

---

### 2. Security Headers en ElysiaJS (Helmet++)

```typescript
// backend/src/plugins/security.ts
import { Elysia } from 'elysia'
import { helmet } from 'elysia-helmet'

export const securityPlugin = new Elysia()
  .use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Svelte necesita inline scripts
        styleSrc: ["'self'", "'unsafe-inline'"], // Open Props inline styles
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", process.env.API_URL],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"]
      }
    },
    crossOriginEmbedderPolicy: false, // Desactivar para imágenes externas
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }))

  // Custom headers adicionales
  .onRequest(({ set }) => {
    set.headers['X-Frame-Options'] = 'DENY'
    set.headers['X-Content-Type-Options'] = 'nosniff'
    set.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
  })

// backend/src/index.ts
import { securityPlugin } from './plugins/security'

const app = new Elysia()
  .use(securityPlugin) // ✅ Aplicar antes de rutas
  .use(cors())
  .use(rateLimit())
  // ... resto de la app
```

**Verificar headers:**
```bash
curl -I https://tuapp.com
# Debe retornar:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
# Content-Security-Policy: default-src 'self'; ...
```

---

### 3. Rate Limiting Global (Anti-DDoS Básico)

```typescript
// backend/src/plugins/rate-limit.ts
import { Elysia } from 'elysia'
import { rateLimit } from 'elysia-rate-limit'

export const rateLimitPlugin = new Elysia()
  .use(rateLimit({
    duration: 60_000, // 1 minuto
    max: 100,         // 100 requests/min por IP (usuarios normales)

    // Rutas sensibles: límite más estricto
    generator: (req) => {
      const path = new URL(req.url).pathname

      // Login/Register: 5 intentos/min
      if (path.includes('/auth/login') || path.includes('/auth/register')) {
        return { max: 5, duration: 60_000 }
      }

      // API pagos: 20 requests/min
      if (path.includes('/api/v1/pagos')) {
        return { max: 20, duration: 60_000 }
      }

      // Default
      return { max: 100, duration: 60_000 }
    },

    // Excluir health checks
    skip: (req) => {
      return new URL(req.url).pathname === '/health'
    },

    // Respuesta custom cuando se excede
    errorResponse: {
      success: false,
      error: 'Demasiadas solicitudes. Intenta en 1 minuto.',
      retryAfter: 60
    }
  }))
```

**Resultado:** Si un atacante envía 1,000 requests/segundo, solo procesarás 100 y rechazarás las demás (status 429).

---

### 4. Política de Contraseñas Robusta (Validación Zod)

```typescript
// backend/src/utils/validators/password.ts
import { z } from 'zod'

export const PasswordSchema = z.string()
  .min(12, "Contraseña debe tener mínimo 12 caracteres")
  .max(128, "Contraseña demasiado larga")
  .regex(/[A-Z]/, "Debe contener al menos 1 mayúscula")
  .regex(/[a-z]/, "Debe contener al menos 1 minúscula")
  .regex(/[0-9]/, "Debe contener al menos 1 número")
  .regex(/[^A-Za-z0-9]/, "Debe contener al menos 1 carácter especial (!@#$%^&*)")
  .refine((password) => {
    // Prohibir contraseñas comunes
    const commonPasswords = [
      'Password123!', 'Admin123!', 'Mexico2024!',
      'Finanzas123!', 'Pyme2024!', 'Contabilidad1!'
    ]
    return !commonPasswords.includes(password)
  }, "Contraseña demasiado común, usa otra")

// Uso en registro:
export const RegisterSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})
```

---

### 5. Templates de Políticas de Seguridad (Markdown Simples)

```markdown
<!-- docs/politicas/POLITICA_CONTRASEÑAS.md -->
# Política de Contraseñas

**Versión:** 1.0
**Fecha:** 9 Diciembre 2025
**Aplica a:** Todos los usuarios de la plataforma

## Requisitos Mínimos:
- ✅ Mínimo 12 caracteres
- ✅ Al menos 1 mayúscula, 1 minúscula, 1 número, 1 símbolo
- ✅ NO usar contraseñas comunes (Password123!, Admin123!, etc.)
- ✅ NO reutilizar contraseñas de otros sitios

## Recomendaciones:
- Usar gestor de contraseñas (1Password, Bitwarden)
- Cambiar contraseña cada 6 meses (opcional, no forzado)
- Activar 2FA (obligatorio para roles Admin/Contador)

## Sanciones:
- 1ra violación: Warning + reset forzado
- 2da violación: Suspensión cuenta 24h
- 3ra violación: Bloqueo permanente

---

<!-- docs/politicas/POLITICA_BYOD.md -->
# Política BYOD (Bring Your Own Device)

**Versión:** 1.0
**Contexto:** México Profundo - mayoría usa celular personal

## Dispositivos Permitidos:
- ✅ Smartphones Android/iOS actualizados (últimas 2 versiones OS)
- ✅ Laptops Windows/Mac con antivirus actualizado
- ❌ Tablets sin PIN/contraseña
- ❌ Computadoras públicas/cibercafés

## Requisitos de Seguridad:
- Bloqueo por PIN/Huella (obligatorio)
- NO hacer jailbreak/root (detectado = cuenta bloqueada)
- Cerrar sesión al terminar (no "recordar contraseña" en dispositivos compartidos)
- Reportar robo/pérdida de dispositivo en < 24h

## Responsabilidad del Usuario:
- El usuario es responsable de su dispositivo
- La empresa NO pagará reparaciones ni pérdidas
- Datos sensibles (CFDI, claves bancarias) son propiedad del usuario

---

<!-- docs/politicas/PLAN_CONTINUIDAD_NEGOCIO.md -->
# Plan de Continuidad de Negocio (BCP)

**Versión:** 1.0
**Objetivo:** Asegurar que la plataforma funcione incluso si el VPS principal falla

## Escenarios de Desastre:

### 1. Caída del VPS (RTO: 2 horas)
**Acción:**
1. Verificar status en Hostinger panel
2. Si no responde, levantar backup en otro VPS (Hostinger VPS KVM 1)
3. Restaurar última snapshot de R2 (máximo 24h antigüedad)
4. Cambiar DNS a nueva IP en Cloudflare

**Responsable:** Founder (tiene acceso root)

### 2. Ataque DDoS Masivo (RTO: 15 minutos)
**Acción:**
1. Cloudflare activará "Under Attack Mode" automático
2. Si persiste, activar "I'm Under Attack" manual (CAPTCHA a todos)
3. Investigar origen del ataque en Cloudflare Analytics

**Responsable:** Founder (Cloudflare dashboard)

### 3. Corrupción de Base de Datos (RTO: 4 horas)
**Acción:**
1. Detener app (Dokploy UI → Stop)
2. Restaurar backup PostgreSQL desde R2 (script backup-restore.sh)
3. Validar integridad con query de prueba
4. Reiniciar app

**Responsable:** Founder (script automatizado)

### 4. Robo de Credenciales (RTO: 30 minutos)
**Acción:**
1. Forzar cierre de todas las sesiones (DELETE FROM sessions)
2. Enviar email a todos los usuarios: "Cambia tu contraseña"
3. Bloquear cuentas con actividad sospechosa (login desde otro país)
4. Investigar logs (GlitchTip + PostgreSQL audit_logs)

**Responsable:** Founder + Script automatizado

## Backups:
- **Diario:** PostgreSQL dump → R2 (3AM)
- **Semanal:** Full snapshot VPS → Hostinger Backup Center
- **Mensual:** Exportación manual a disco externo (paranoia)

## Contactos de Emergencia:
- **Hostinger Support:** https://hpanel.hostinger.com/tickets
- **Cloudflare Support:** https://dash.cloudflare.com/support (solo Pro plan)
```

---

### 6. Logging de Eventos de Seguridad

```typescript
// backend/src/utils/security-logger.ts
import { db } from '../db'
import { securityEvents } from '../db/schema/security'

export async function logSecurityEvent(event: {
  userId?: string
  type: 'LOGIN_FAILED' | 'RATE_LIMIT_EXCEEDED' | 'SUSPICIOUS_ACTIVITY' | 'PASSWORD_CHANGED'
  ip: string
  userAgent: string
  details?: Record<string, any>
}) {
  await db.insert(securityEvents).values({
    ...event,
    timestamp: new Date()
  })

  // Si es evento crítico, enviar alerta WhatsApp
  if (event.type === 'SUSPICIOUS_ACTIVITY') {
    await sendWhatsAppAlert(`🚨 Actividad sospechosa: ${event.type} desde IP ${event.ip}`)
  }
}

// Schema
export const securityEvents = pgTable('security_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id'),
  type: text('type').notNull(),
  ip: text('ip').notNull(),
  userAgent: text('user_agent'),
  details: jsonb('details'),
  timestamp: timestamp('timestamp').defaultNow()
})
```

**Uso en login:**
```typescript
// backend/src/routes/auth.ts
.post('/login', async ({ body, request, set }) => {
  const { email, password } = body

  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

  if (!user || !await verifyPassword(password, user.passwordHash)) {
    // Loggear intento fallido
    await logSecurityEvent({
      userId: user?.id,
      type: 'LOGIN_FAILED',
      ip: request.headers.get('cf-connecting-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    })

    set.status = 401
    return { success: false, error: 'Credenciales inválidas' }
  }

  // Login exitoso...
})
```

---

## 💼 Mentalidad Bootstrap: Seguridad = Código, No Burocracia

### Qué puede hacer el Founder (sin certificaciones):

1. **Cloudflare Setup (30 minutos):**
   - Crear cuenta gratuita
   - Cambiar nameservers
   - Activar WAF + SSL

2. **Security Headers (1 hora):**
   - Copiar código Helmet de arriba
   - Verificar con `curl -I`

3. **Rate Limiting (30 minutos):**
   - Instalar `elysia-rate-limit`
   - Configurar límites por ruta

4. **Políticas Markdown (2 horas):**
   - Copiar templates de arriba
   - Adaptar a tu contexto

### Cuándo contratar CISO real ($80k-120k MXN/mes):

- ✅ **Certificación ISO 27001** (clientes corporativos lo exigen)
- ✅ **Compliance PCI-DSS** (si aceptas tarjetas directamente)
- ✅ **Auditoría externa** (inversionistas Series A+ lo piden)
- ✅ **10M+ USD funding** (ya puedes pagar talento senior)

**Hasta ese punto:** Founder + Cloudflare + Helmet + sentido común = suficiente.

---

## 🇲🇽 Adaptaciones México Profundo

### 1. Phishing es COMÚN (Capacitación Ligera)

```typescript
// Detectar emails sospechosos en registros
export function detectPhishingAttempt(email: string): boolean {
  const suspiciousPatterns = [
    /admin@tuapp\.com/i,  // Nadie legítimo usaría este email
    /soporte@tuapp\.com/i,
    /noreply.*@gmail\.com/i, // NoReply falsos
    /verificacion.*@hotmail\.com/i
  ]

  return suspiciousPatterns.some(pattern => pattern.test(email))
}
```

**Mensaje educativo al usuario:**
```svelte
<Alert variant="warning">
  ⚠️ Nunca te pediremos tu contraseña por email, WhatsApp o teléfono.
  Si recibes un mensaje sospechoso, repórtalo a seguridad@tuapp.com
</Alert>
```

### 2. Conexiones desde Múltiples Dispositivos (Normal)

En México, es común que el contador use:

- PC de escritorio en oficina
- Laptop en casa
- Celular en el camión

**NO bloquear por "ubicación sospechosa"** (como hacen bancos gringos).

```typescript
// ❌ MAL: Bloquear si IP cambia de estado
if (user.lastLoginState !== currentState) {
  blockAccount()
}

// ✅ BIEN: Solo alertar (no bloquear)
if (user.lastLoginCity !== currentCity) {
  await sendEmail(user.email, `Detectamos un login desde ${currentCity}. ¿Fuiste tú?`)
}
```

---

## 🔗 Referencias

- **Cloudflare Free Plan:** https://www.cloudflare.com/plans/free/
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **Helmet.js (adaptado a Elysia):** https://helmetjs.github.io/
- **NIST Cybersecurity Framework:** https://www.nist.gov/cyberframework
- **Elysia Rate Limit:** https://elysiajs.com/plugins/rate-limit.html

---

## 📊 Costo Total del Perfil

| Concepto | Costo Real (Bootstrap) | Costo Tradicional |
|:---------|:-----------------------|:------------------|
| **CISO Senior** | ❌ $0 (Founder + templates) | $80k-120k/mes |
| **Security Analyst** | ❌ $0 (automatización) | $40k-60k/mes |
| **GRC Specialist** | ❌ $0 (políticas simples) | $35k-50k/mes |
| **Cloudflare WAF** | ✅ $0 (Free tier) | $20-200/mes (Pro plan) |
| **SIEM/SOC** | ❌ $0 (logs PostgreSQL) | $500-2,000/mes (Splunk) |
| **ISO 27001 Consultoría** | ❌ $0 (diferido Fase 2) | $100k-300k one-time |
| **Total Mensual** | **$0 MXN** | **$155k-230k MXN** |
| **Ahorro Anual** | - | **$1.86M-2.76M MXN/año** |

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + Seguridad Automatizada*
