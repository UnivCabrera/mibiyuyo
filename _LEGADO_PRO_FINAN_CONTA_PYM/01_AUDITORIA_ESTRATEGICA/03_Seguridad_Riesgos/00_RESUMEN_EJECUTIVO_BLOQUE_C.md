# 📊 RESUMEN EJECUTIVO: BLOQUE C (Seguridad y Riesgos)

**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025
**Reingeniería:** Bootstrap + Seguridad Automatizada (Código > Burocracia)

---

## 🎯 Objetivo de la Reingeniería

Transformar 4 perfiles tradicionales de seguridad (que costarían **$2.28M-3.24M MXN/año**) en una operación **automatizada de $0 MXN/mes** usando:

1. **Cloudflare Free Tier** (WAF + DDoS protection, elimina 90% ataques antes de tocar VPS)
2. **OWASP ZAP** (pentesting automatizado en CI/CD, reemplaza consultoras $50k+)
3. **UFW + Fail2Ban** (hardening VPS, protección SSH/brute-force)
4. **Better Auth + 2FA TOTP** (elimina Auth0/Okta $35-240/mes)

**Mentalidad Clave:** Seguridad != Certificaciones caras. Seguridad = Código + Config + Sentido común.

---

## 📋 Perfiles Transformados (17-20)

| Perfil | Antes (Tradicional) | Después (Bootstrap) | Ahorro Anual |
|:-------|:-------------------|:--------------------|:-------------|
| **17 - CISO Strategy** | $80k-120k/mes + $60k team | Founder + Cloudflare + Templates | **$1.86M-2.76M MXN** |
| **18 - Ethical Hacker** | $50k-70k/mes + Pentest $50k | OWASP ZAP CI/CD | **$660k-890k MXN** |
| **19 - Cloud Security** | $45k-60k/mes | UFW + Fail2Ban scripts | **$540k-720k MXN** |
| **20 - IAM Specialist** | $40k-55k/mes | Better Auth + 2FA TOTP | **$480k-660k MXN** |
| **TOTAL BLOQUE C** | **$215k-305k/mes** | **$0/mes** | **$2.58M-3.66M MXN/año** |

---

## 🛡️ Stack de Seguridad Definitivo

| Capa | Solución Bootstrap | Costo | Reemplaza ($) |
|:-----|:------------------|:------|:--------------|
| **Anti-DDoS** | Cloudflare Free (WAF + Bot Management) | $0 | Cloudflare Pro $20/mes, Imperva $200+/mes |
| **Pentesting** | OWASP ZAP (GitHub Actions) | $0 | Consultoras $50k-100k/año |
| **Firewall VPS** | UFW (built-in Ubuntu) | $0 | Managed firewall $10-50/mes |
| **Brute-Force** | Fail2Ban + Redis rate limiting | $0 | Cloudflare Rate Limiting $10-50/mes |
| **Auth** | Better Auth (self-hosted) | $0 | Auth0 $35-240/mes, Okta $60-480/mes |
| **2FA** | TOTP (Google Authenticator) | $0 | SMS 2FA $0.05-0.10/mensaje |
| **Security Headers** | Helmet (ElysiaJS plugin) | $0 | N/A (básico) |
| **Secrets** | `.env` + Dokploy encryption | $0 | HashiCorp Vault $0.03/hour |
| **Logging** | PostgreSQL + GlitchTip | $0 | Splunk $500-2,000/mes |

**Total:** **$0/mes** vs **$800-3,000/mes** (herramientas tradicionales)

---

## 🔐 Implementaciones Clave

### Perfil 17: CISO Strategy

**Entregables:**

- ✅ Cloudflare DNS + WAF configurado (30 min setup)
- ✅ Security Headers (Helmet plugin ElysiaJS)
- ✅ Rate Limiting global (100 req/min, 5 login attempts)
- ✅ Templates políticas (Contraseñas, BYOD, BCP) en Markdown

**Código Crítico:**
```typescript
// Security Headers
.use(helmet({
  hsts: { maxAge: 31536000, includeSubDomains: true },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      objectSrc: ["'none'"]
    }
  }
}))

// Rate Limiting (Anti-DDoS)
.use(rateLimit({
  duration: 60_000,
  max: 100,
  generator: (req) => {
    if (req.url.includes('/auth/login')) return { max: 5, duration: 60_000 }
    return { max: 100, duration: 60_000 }
  }
}))
```

**Ahorro:** **$1.86M-2.76M MXN/año** (CISO + Analyst + GRC)

---

### Perfil 18: Ethical Hacker

**Entregables:**

- ✅ OWASP ZAP en GitHub Actions (scan semanal automático)
- ✅ Dependabot activado (alertas vulnerabilidades npm/bun)
- ✅ Brute-force protection (Redis + IP blocking)
- ✅ `SECURITY.md` (responsible disclosure policy)

**GitHub Actions Workflow:**
```yaml
# .github/workflows/security-scan.yml
name: OWASP ZAP Security Scan

on:
  schedule:
    - cron: '0 0 * * 0' # Domingos 12AM
  workflow_dispatch: # Manual trigger

jobs:
  zap_scan:
    runs-on: ubuntu-latest
    steps:
      - uses: zaproxy/action-baseline@v0.9.0
        with:
          target: 'https://staging.tuapp.com'
          rules_file_name: '.zap/rules.tsv'
          fail_action: true # Bloquear deploy si hay críticos

      - name: Upload Report
        uses: actions/upload-artifact@v3
        with:
          name: zap-report
          path: report_html.html
```

**Protección Brute-Force:**
```typescript
// Backend: Login attempts tracking
export async function checkLoginAttempts(ip: string, email: string) {
  const key = `login:${ip}:${email}`
  const attempts = await redis.incr(key)

  if (attempts === 1) await redis.expire(key, 900) // 15 min

  if (attempts > 5) {
    await logSecurityEvent({ type: 'BRUTE_FORCE_ATTEMPT', ip, email })
    throw new Error('Demasiados intentos. Cuenta bloqueada 15 minutos.')
  }
}
```

**Ahorro:** **$660k-890k MXN/año** (Pentester + consultorías)

---

### Perfil 19: Cloud Security (Hardening VPS)

**Entregables:**

- ✅ Script `vps-hardening.sh` (UFW + Fail2Ban + SSH hardening)
- ✅ Dockerfiles non-root (user `bun:1001`)
- ✅ Traefik SSL automático (Let's Encrypt)
- ✅ Secrets encryption (Dokploy env vars cifrados)

**VPS Hardening Script:**
```bash
#!/bin/bash
# scripts/vps-hardening.sh

set -e

echo "🔒 Iniciando hardening del VPS..."

# 1. Actualizar sistema
apt update && apt upgrade -y

# 2. Instalar herramientas
apt install -y ufw fail2ban unattended-upgrades

# 3. Configurar UFW (Firewall)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh          # Puerto 22
ufw allow http         # Puerto 80
ufw allow https        # Puerto 443
ufw allow 3000         # Dokploy UI
ufw --force enable

# 4. Configurar Fail2Ban (Anti-brute-force SSH)
cat > /etc/fail2ban/jail.local <<EOF
[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
EOF

systemctl enable fail2ban
systemctl restart fail2ban

# 5. Deshabilitar root login SSH
sed -i 's/#PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

# 6. Actualizaciones automáticas de seguridad
dpkg-reconfigure -plow unattended-upgrades

echo "✅ Hardening completado. Firewall activo, Fail2Ban protegiendo SSH."
```

**Dockerfile Non-Root:**
```dockerfile
# Backend Dockerfile (Bun)
FROM oven/bun:1.3.4-alpine AS production

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && adduser -S bun -u 1001

USER bun
WORKDIR /app

COPY --chown=bun:nodejs package.json bun.lockb ./
RUN bun install --production

COPY --chown=bun:nodejs . .

EXPOSE 3000
CMD ["bun", "run", "start"]
```

**Ahorro:** **$540k-720k MXN/año** (Cloud Security Engineer)

---

### Perfil 20: IAM Specialist (Better Auth + 2FA)

**Entregables:**

- ✅ Better Auth configurado (email + OAuth Google)
- ✅ 2FA TOTP obligatorio (roles Admin/Contador)
- ✅ RBAC (Role-Based Access Control) con permisos granulares
- ✅ Session management (Redis, auto-expire 7 días)

**Better Auth Setup:**
```typescript
// backend/src/plugins/auth.ts
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../db'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg'
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 12
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },

  // 2FA TOTP (Google Authenticator)
  twoFactor: {
    enabled: true,
    issuer: 'FinTech PyME México',
    otpOptions: {
      period: 30,
      digits: 6
    }
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 días
    updateAge: 60 * 60 * 24       // Renovar cada día
  }
})

// ElysiaJS integration
export const authPlugin = (app: Elysia) => {
  return app.use(auth.handler)
}
```

**RBAC Implementation:**
```typescript
// backend/src/auth/rbac.ts
export const ROLES = {
  ADMIN: 'ADMIN',
  CONTADOR: 'CONTADOR',
  USER: 'USER'
} as const

export const PERMISSIONS = {
  // Facturas
  'facturas:read': ['ADMIN', 'CONTADOR', 'USER'],
  'facturas:write': ['ADMIN', 'CONTADOR'],
  'facturas:delete': ['ADMIN'],

  // Usuarios
  'usuarios:read': ['ADMIN'],
  'usuarios:write': ['ADMIN'],

  // Configuración
  'config:write': ['ADMIN']
} as const

export async function checkPermission(
  userId: string,
  permission: keyof typeof PERMISSIONS
): Promise<boolean> {
  const userRoles = await db
    .select()
    .from(userRoles)
    .where(eq(userRoles.userId, userId))

  const allowedRoles = PERMISSIONS[permission]

  return userRoles.some(ur => allowedRoles.includes(ur.roleId))
}

// Middleware
export const requirePermission = (permission: keyof typeof PERMISSIONS) => {
  return async ({ user, set }: Context) => {
    if (!user) {
      set.status = 401
      throw new Error('No autenticado')
    }

    const hasPermission = await checkPermission(user.id, permission)

    if (!hasPermission) {
      set.status = 403
      throw new Error('Sin permisos suficientes')
    }
  }
}

// Uso en rutas:
app.delete('/facturas/:id', handler, {
  beforeHandle: requirePermission('facturas:delete')
})
```

**2FA Enforcement (Roles Sensibles):**
```typescript
// backend/src/middleware/enforce-2fa.ts
export const enforce2FA = async ({ user, set, request }: Context) => {
  if (!user) {
    set.status = 401
    return { error: 'No autenticado' }
  }

  // Verificar si el rol requiere 2FA
  const requiresTwoFactor = ['ADMIN', 'CONTADOR'].includes(user.role)

  if (requiresTwoFactor && !user.twoFactorEnabled) {
    set.status = 403
    return {
      error: 'Tu rol requiere autenticación de dos factores.',
      action: 'SETUP_2FA',
      redirectTo: '/settings/security/2fa'
    }
  }
}

// Aplicar en rutas protegidas:
app.group('/admin', (app) => app
  .use(enforce2FA)
  .get('/dashboard', adminDashboard)
)
```

**Ahorro:** **$480k-660k MXN/año** (IAM Specialist, elimina Auth0/Okta)

---

## 🇲🇽 Adaptaciones México Profundo

### 1. 2FA sin SMS (Costos Prohibitivos)

```typescript
// ❌ MAL: SMS 2FA (caro en México, $0.05-0.10/mensaje)
// Con 10,000 usuarios activos = $500-1,000 USD/mes

// ✅ BIEN: TOTP (Google Authenticator, gratis)
import { generateTOTP, verifyTOTP } from 'better-auth/totp'

const secret = generateTOTP()
// Usuario escanea QR con Google Authenticator
// Al login, ingresa código de 6 dígitos
const isValid = verifyTOTP(userCode, secret)
```

### 2. Educación en Seguridad (Phishing Común)

```svelte
<!-- Frontend: Banner educativo (primeros 30 días) -->
<script lang="ts">
  import { onMount } from 'svelte'

  let showSecurityTip = $state(true)

  onMount(() => {
    const dismissed = localStorage.getItem('security-tip-dismissed')
    if (dismissed) showSecurityTip = false
  })

  function dismiss() {
    localStorage.setItem('security-tip-dismissed', 'true')
    showSecurityTip = false
  }
</script>

{#if showSecurityTip}
  <Alert variant="info" dismissible onDismiss={dismiss}>
    🔒 <strong>Tip de Seguridad:</strong> Nunca compartas tu contraseña por WhatsApp,
    email o teléfono. Nosotros NUNCA te la pediremos.
  </Alert>
{/if}
```

### 3. Detección de Compartir Cuentas (Común en PyMEs)

```typescript
// Backend: Detectar logins simultáneos desde IPs distantes
export async function detectAccountSharing(userId: string, currentIP: string) {
  const activeSessions = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId))
    .where(gt(sessions.expiresAt, new Date()))

  // Si hay 2+ sesiones activas desde IPs diferentes (tolerancia: misma ciudad)
  const uniqueIPs = new Set(activeSessions.map(s => s.ipAddress))

  if (uniqueIPs.size > 2) {
    await logSecurityEvent({
      userId,
      type: 'POSSIBLE_ACCOUNT_SHARING',
      details: { sessions: activeSessions.length, ips: Array.from(uniqueIPs) }
    })

    // NO bloquear automáticamente (familia puede compartir), solo alertar
    await sendEmail(user.email, {
      subject: 'Detectamos múltiples sesiones activas',
      body: `Hola, tu cuenta tiene ${uniqueIPs.size} sesiones activas desde diferentes ubicaciones.
             Si no fuiste tú, cambia tu contraseña inmediatamente.`
    })
  }
}
```

---

## 📊 Comparativa de Costos Final

### Escenario Tradicional (Outsourcing/Consultoras):

| Servicio | Costo Mensual | Costo Anual |
|:---------|:--------------|:------------|
| CISO + Team | $140k-180k | $1.68M-2.16M |
| Pentesting (trimestral) | ~$15k/evento | $60k-80k |
| Cloud Security Engineer | $45k-60k | $540k-720k |
| IAM Specialist | $40k-55k | $480k-660k |
| **Herramientas:**
| Cloudflare Pro | $400 MXN (~$20 USD) | $4,800 |
| Auth0 (escala) | $4,000 MXN (~$200 USD) | $48k |
| Splunk/SIEM | $10k MXN (~$500 USD) | $120k |
| HashiCorp Vault | $2k MXN (~$100 USD) | $24k |
| Consultorías ISO 27001 | One-time | $100k-300k |
| **TOTAL** | **$211k-310k/mes** | **$2.53M-3.72M/año** |

### Escenario Bootstrap (Actual):

| Servicio | Costo Mensual | Costo Anual |
|:---------|:--------------|:------------|
| Founder como CISO | $0 | $0 |
| Cloudflare Free | $0 | $0 |
| OWASP ZAP (GitHub) | $0 | $0 |
| UFW + Fail2Ban | $0 (built-in) | $0 |
| Better Auth (self-hosted) | $0 | $0 |
| TOTP 2FA | $0 | $0 |
| PostgreSQL logs | $0 (ya incluido) | $0 |
| **TOTAL** | **$0/mes** | **$0/año** |

**Ahorro Total Bloque C:** **$2.53M-3.72M MXN/año**

---

## ⚠️ Cuándo Contratar Talento de Seguridad

| Rol | Contratar cuando... | Costo Justificado |
|:----|:--------------------|:------------------|
| **CISO** | Certificación ISO 27001 obligatoria (clientes corporativos) | $80k-120k/mes |
| **Pentester** | Series A+ ($10M+ USD), auditorías trimestrales requeridas | $50k-70k/mes |
| **Cloud Security** | Multi-cloud (AWS + GCP + Azure), compliance SOC 2 | $45k-60k/mes |
| **IAM Specialist** | SSO enterprise (SAML), compliance GDPR/CCPA avanzado | $40k-55k/mes |

**Hasta ese punto:** Founder + automatización + herramientas gratis = suficiente para 90% startups FinTech.

---

## 🔗 Referencias Técnicas

| Recurso | URL |
|:--------|:----|
| **Cloudflare Free** | https://www.cloudflare.com/plans/free/ |
| **OWASP ZAP** | https://www.zaproxy.org/ |
| **Fail2Ban** | https://www.fail2ban.org/ |
| **Better Auth** | https://better-auth.com/ |
| **OWASP Top 10** | https://owasp.org/www-project-top-ten/ |
| **CIS Benchmarks** | https://www.cisecurity.org/cis-benchmarks/ |
| **NIST Cybersecurity** | https://www.nist.gov/cyberframework |

---

## 📈 Ahorro Acumulado Total

| Bloque | Ahorro Anual |
|:-------|:-------------|
| **A (Legal/Fiscal)** | $3.66M MXN |
| **B (Tecnología)** | $4.68M-7.32M MXN |
| **C (Seguridad)** | $2.53M-3.72M MXN |
| **TOTAL** | **$10.87M-14.70M MXN/año** |

**Conclusión:** La estrategia Bootstrap + Open Source + Automatización permite operar una FinTech SaaS completa por **$200 MXN/mes** (solo VPS), vs **$900k-1.2M MXN/mes** en modelo tradicional.

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + Seguridad Automatizada*
*Ahorro Total Bloques A+B+C: $10.87M-14.70M MXN/año*
