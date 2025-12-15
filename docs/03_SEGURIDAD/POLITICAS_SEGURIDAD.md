# 🔐 POLÍTICAS DE SEGURIDAD — MIBIYUYO

> **Versión:** 1.0
> **Fecha:** 14 Diciembre 2025
> **Clasificación:** No Negociable
> **Responsable:** Rol de Seguridad (SEC)

---

## 🎯 PRINCIPIO FUNDAMENTAL

> **La seguridad de mibiyuyo NUNCA se compromete por features o velocidad.**
> Es el Dolor #6: "No confío en las apps con mis datos financieros."

---

## 🛡️ ESTÁNDARES DE SEGURIDAD

### 1. Encriptación

| Área | Estándar | Implementación |
|:---|:---|:---|
| **Datos en tránsito** | TLS 1.3 | Traefik + Let's Encrypt |
| **Datos en reposo** | AES-256 | PostgreSQL + pgcrypto |
| **Passwords** | bcrypt | Better Auth (12 rounds) |
| **Tokens** | SHA-256 | Sesiones Redis |

### 2. Autenticación

| Control | Configuración |
|:---|:---|
| **Password mínimo** | 12 caracteres |
| **Complejidad** | 1 mayúscula, 1 número, 1 especial |
| **Rate limiting login** | 5 intentos / 15 minutos |
| **Bloqueo temporal** | 30 min después de 5 fallas |
| **Session duration** | 7 días (refresh diario) |
| **2FA** | TOTP opcional (obligatorio admins) |

### 3. Infraestructura

| Componente | Medida |
|:---|:---|
| **Firewall** | UFW + Traefik |
| **IDS** | fail2ban (SSH, HTTP) |
| **Puertos abiertos** | Solo 80, 443, 22 (custom) |
| **SSH** | Solo llaves, puerto no estándar |
| **Backups** | Diarios, encriptados, 7 días |
| **Ubicación** | Servidores en Brasil/México |

### 4. Código

| Práctica | Frecuencia |
|:---|:---|
| `npm audit` | Cada PR |
| Snyk scan | Semanal |
| Code review | Obligatorio |
| Secrets en .env | Siempre (nunca en código) |
| OWASP Top 10 review | Mensual |

---

## 📋 CHECKLIST SEMANAL DE SEGURIDAD

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     CHECKLIST SEMANAL (SEC)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   [ ] Revisar logs de fail2ban                                         │
│   [ ] Verificar certificados SSL (expiración)                          │
│   [ ] Monitorear alertas de Sentry                                     │
│   [ ] Revisar intentos de login fallidos                               │
│   [ ] Actualizar dependencias con vulnerabilidades críticas            │
│   [ ] Verificar que backups se están ejecutando                        │
│   [ ] Revisar accesos de usuarios admin                                │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 CHECKLIST MENSUAL DE SEGURIDAD

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     CHECKLIST MENSUAL (SEC)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   [ ] Ejecutar npm audit y resolver vulnerabilidades                   │
│   [ ] Rotar API keys y secrets                                         │
│   [ ] Test de restore de backup                                        │
│   [ ] Revisar permisos de usuarios en DB                               │
│   [ ] Actualizar documentación de seguridad                            │
│   [ ] Revisar logs de acceso inusuales                                 │
│   [ ] Verificar headers de seguridad (securityheaders.com)             │
│   [ ] Actualizar OS del servidor (apt upgrade)                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 CHECKLIST TRIMESTRAL DE SEGURIDAD

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     CHECKLIST TRIMESTRAL (SEC)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   [ ] Penetration testing manual                                       │
│   [ ] Revisión de OWASP Top 10                                         │
│   [ ] Auditoría de código (seguridad)                                  │
│   [ ] Simulacro de incidente                                           │
│   [ ] Revisión de política de contraseñas                              │
│   [ ] Evaluación de nuevas amenazas                                    │
│   [ ] Actualización de playbooks de incidentes                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🚨 PLAYBOOK DE INCIDENTES

### Niveles de Severidad

| Nivel | Descripción | Tiempo de Respuesta |
|:---|:---|:---:|
| **CRÍTICO** | Breach de datos, sistema comprometido | Inmediato |
| **ALTO** | Vulnerabilidad explotable, DDoS | < 4 horas |
| **MEDIO** | Vulnerabilidad potencial, anomalías | < 24 horas |
| **BAJO** | Mejoras de seguridad, optimizaciones | < 1 semana |

### Paso a Paso (Incidente Crítico)

```
1. DETECTAR
   └── Identificar el incidente (Sentry, logs, usuario)

2. CONTENER
   └── Aislar el sistema afectado
   └── Bloquear acceso si es necesario
   └── Preservar evidencia

3. COMUNICAR
   └── Notificar al equipo (Discord #urgent)
   └── Si hay breach: notificar usuarios afectados

4. INVESTIGAR
   └── Determinar alcance
   └── Identificar causa raíz
   └── Documentar timeline

5. REMEDIAR
   └── Aplicar fix
   └── Verificar solución
   └── Monitorear

6. APRENDER
   └── Post-mortem documentado
   └── Actualizar playbooks
   └── Implementar controles preventivos
```

---

## 📜 COMPLIANCE

### LFPDPPP (México)

| Requisito | Implementación |
|:---|:---|
| **Aviso de privacidad** | Visible en footer, durante registro |
| **Consentimiento** | Checkbox explícito |
| **Acceso (ARCO)** | Endpoint /api/arco/access |
| **Rectificación** | Editable en perfil |
| **Cancelación** | Botón "Eliminar cuenta" |
| **Oposición** | Email de opt-out |

### Datos Sensibles (Finanzas)

| Dato | Tratamiento |
|:---|:---|
| **Ingresos** | Encriptado en reposo |
| **Gastos** | Encriptado en reposo |
| **Saldos** | Calculado, no almacenado |
| **CIEC/SAT** | Nunca almacenado (solo sesión) |
| **Conexión bancaria** | Token temporal, no credenciales |

---

## 🔑 GESTIÓN DE SECRETS

### Variables de Entorno Sensibles

```bash
# NUNCA en código, siempre en .env o Bitwarden/1Password
AUTH_SECRET=          # Better Auth
DATABASE_URL=         # PostgreSQL
REDIS_URL=            # Redis
STRIPE_SECRET_KEY=    # Pagos
SENTRY_AUTH_TOKEN=    # Monitoring
DOKPLOY_API_KEY=      # Deploy
```

### Rotación de Secrets

| Secret | Frecuencia | Proceso |
|:---|:---|:---|
| `AUTH_SECRET` | Cada 3 meses | Regenerar, actualizar .env |
| API Keys externas | Cada 6 meses | Generar nueva, deprecar antigua |
| Database password | Cada 6 meses | Cambiar en Dokploy + app |

---

## 👁️ PANEL DE SEGURIDAD (Usuario)

Lo que el usuario ve en su perfil:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     🛡️ TU SEGURIDAD                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ESTADO DE TU CUENTA                                                  │
│   ✅ Contraseña segura                                                 │
│   ✅ Sesión activa (1 dispositivo)                                     │
│   ⚠️ 2FA no activado [Activar]                                         │
│                                                                         │
│   ÚLTIMOS ACCESOS                                                      │
│   • Hoy 10:32 - Chrome, CDMX                                           │
│   • Ayer 18:45 - Safari, Guadalajara                                   │
│                                                                         │
│   TUS DATOS                                                            │
│   [📥 Descargar todos mis datos]                                       │
│   [🗑️ Eliminar mi cuenta]                                              │
│                                                                         │
│   PRIVACIDAD                                                           │
│   Tus datos están encriptados y nunca se comparten.                    │
│   [Leer política de privacidad]                                        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 MÉTRICAS DE SEGURIDAD

### KPIs Mensuales

| Métrica | Target | Alerta |
|:---|:---:|:---:|
| Vulnerabilidades críticas | 0 | > 0 |
| Tiempo de parche crítico | < 24h | > 48h |
| Intentos de intrusión | Monitorear | > 100/día |
| Uptime | 99.5% | < 99% |
| Backup success rate | 100% | < 100% |

---

## 🚫 LO QUE NUNCA HACEMOS

| Práctica Prohibida | Razón |
|:---|:---|
| ❌ Almacenar passwords en texto plano | Vulnerabilidad crítica |
| ❌ Loggear datos sensibles | Exposición en logs |
| ❌ Secrets en código | Exposición en repo |
| ❌ Ejecutar como root | Principio de mínimo privilegio |
| ❌ Ignorar npm audit | Vulnerabilidades conocidas |
| ❌ Desactivar SSL | Datos en tránsito expuestos |
| ❌ Almacenar CIEC/FIEL | Datos ultra-sensibles |

---

**Documento:** POLITICAS_SEGURIDAD.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025

> *"La seguridad no es una feature, es un requisito."* 🛡️
