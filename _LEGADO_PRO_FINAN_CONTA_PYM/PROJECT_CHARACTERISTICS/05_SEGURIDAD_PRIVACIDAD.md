# 🔒 MÓDULO 05: SEGURIDAD Y PRIVACIDAD

**Total:** 22 características  
**Prioridad PMV:** 15  
**Última actualización:** 28 Nov 2025

---

## 5.1 AUTENTICACIÓN (8 características)

### SEC-001: Registro con Email + Password

- **Descripción:** Método básico de registro
- **Validaciones:** Email válido, password fuerte (min 8 chars, mayúscula, número, especial)
- **Verificación:** Email de confirmación obligatorio
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-002: Login Social (OAuth2)

- **Descripción:** Registro/login con proveedores externos
- **Proveedores:** Google, Microsoft, Apple
- **Librería:** Auth.js para SvelteKit
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-003: Magic Links (Passwordless)

- **Descripción:** Login sin contraseña vía email
- **Flujo:** Email → Click link → Autenticado
- **Expiración:** Link válido 15 minutos
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-004: MFA (Autenticación Multi-Factor)

- **Descripción:** Segunda capa de verificación
- **Métodos:** TOTP (Google Authenticator), SMS (fallback)
- **Obligatorio:** Para acciones sensibles (cambio password, retiro)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### SEC-005: Sesiones Seguras

- **Descripción:** Manejo de tokens JWT + refresh
- **Access Token:** 15 minutos de vida
- **Refresh Token:** 7 días, almacenado en Redis, rotación automática
- **Invalidación:** Logout cierra todas las sesiones
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-006: Gestión de Dispositivos Confiables

- **Descripción:** Ver y administrar sesiones activas
- **Info:** Dispositivo, ubicación, última actividad
- **Acciones:** Cerrar sesión remota
- **Alerta:** Notificación en nuevo dispositivo
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-007: Recuperación de Cuenta

- **Descripción:** Proceso seguro para recuperar acceso
- **Flujo:** Email → Verificar identidad → Reset password
- **Códigos backup:** Para MFA perdido
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-008: Bloqueo por Intentos Fallidos

- **Descripción:** Protección contra brute force
- **Límite:** 5 intentos fallidos → bloqueo 15 min
- **Escala:** Incrementa con más intentos
- **CAPTCHA:** Después de 3 intentos
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

---

## 5.2 CIFRADO Y PROTECCIÓN DE DATOS (7 características)

### SEC-009: Cifrado en Tránsito (TLS 1.3)

- **Descripción:** HTTPS obligatorio en toda comunicación
- **Certificados:** Let's Encrypt automático (Traefik)
- **HSTS:** Headers de seguridad activados
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-010: Cifrado en Reposo (Datos Sensibles)

- **Descripción:** Columnas sensibles cifradas en DB
- **Tecnología:** pgcrypto (AES-256)
- **Datos:** CIEC, FIEL, tokens bancarios, datos personales
- **Key Management:** Rotación anual
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### SEC-011: Hashing de Passwords

- **Descripción:** Contraseñas nunca almacenadas en texto plano
- **Algoritmo:** Argon2id (ganador de PHC)
- **Parámetros:** memory=64MB, iterations=3, parallelism=4
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-012: Sanitización de Inputs

- **Descripción:** Prevención de inyección SQL y XSS
- **ORM:** Drizzle con queries parametrizadas
- **Templates:** Svelte escapa automáticamente
- **Validación:** TypeBox en backend
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-013: Headers de Seguridad HTTP

- **Descripción:** Protección contra ataques comunes
- **Headers:** CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy
- **Implementación:** Middleware Elysia
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-014: Rate Limiting

- **Descripción:** Límite de requests por IP/usuario
- **Límites:** 100 req/min general, 10 req/min en login
- **Implementación:** Traefik + Redis
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-015: Backups Cifrados

- **Descripción:** Respaldos de DB encriptados
- **Frecuencia:** Diaria (incrementales), Semanal (completos)
- **Retención:** 30 días
- **Ubicación:** Off-site (diferente VPS o cloud)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

---

## 5.3 AUDITORÍA Y COMPLIANCE (7 características)

### SEC-016: Audit Logs (Bitácora de Acciones)

- **Descripción:** Registro inmutable de todas las acciones
- **Datos:** user_id, action, resource, timestamp, ip, user_agent
- **Tabla:** append-only (no UPDATE, no DELETE)
- **Retención:** 7 años (CFF)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### SEC-017: Logs de Acceso

- **Descripción:** Registro de logins exitosos y fallidos
- **Info:** IP, dispositivo, ubicación, timestamp
- **Alertas:** Notificar acceso desde nueva ubicación
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-018: Cumplimiento LFPDPPP

- **Descripción:** Ley Federal de Protección de Datos Personales
- **Aviso de Privacidad:** Publicado y aceptado
- **Derechos ARCO:** Acceso, Rectificación, Cancelación, Oposición
- **Prioridad:** 🔴 CRÍTICA (Legal)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-019: Exportación de Datos Personales

- **Descripción:** Derecho del usuario a descargar sus datos
- **Formato:** JSON o CSV
- **Contenido:** Todas las tablas relacionadas al usuario
- **Prioridad:** 🟡 ALTA (LFPDPPP)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-020: Eliminación de Cuenta (Derecho al Olvido)

- **Descripción:** Usuario puede eliminar su cuenta
- **Proceso:** Soft delete → 30 días gracia → Hard delete
- **Excepciones:** Datos fiscales (7 años por CFF)
- **Prioridad:** 🔴 CRÍTICA (Legal)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SEC-021: Consentimiento Granular

- **Descripción:** Usuario elige qué datos compartir
- **Opciones:** Analytics, emails marketing, compartir anónimo
- **Revocable:** En cualquier momento
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### SEC-022: Monitoreo de Seguridad

- **Descripción:** Alertas en tiempo real de incidentes
- **Tecnología:** Sentry (errores), Prometheus (métricas)
- **Alertas:** Intentos de inyección, rate limit excedido, errores críticos
- **Canal:** Email, Slack/Discord
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

---

## 5.4 CONTROL DE ACCESO AVANZADO (2 características)

> 💡 **Origen:** Inspirado en PBAC/CBAC de Palantir, simplificado para PyMEs.

### SEC-023: Roles Personalizables por Módulo

- **Descripción:** Control granular de qué ve cada empleado
- **Roles predefinidos:** Admin, Contador, Vendedor, Solo-Lectura
- **Personalizable:** "Juan puede ver facturas pero no nómina"
- **Audit:** Registro de quién vio qué
- **Beneficio:** Proteger información sensible de empleados
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SEC-024: Modo "Dueño Ausente"

- **Descripción:** Dashboard simplificado para revisar desde el celular
- **Contexto:** El dueño de PyME viaja o no está en oficina
- **Features:** Alertas críticas, aprobaciones rápidas, resumen diario
- **Seguridad:** Requiere biometría para acciones sensibles
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

---

## 📊 RESUMEN MÓDULO SEGURIDAD

| Sección        | Total  |  PMV   |  V1   |  V2   |  V3   |
| :------------- | :----: | :----: | :---: | :---: | :---: |
| Autenticación  |   8    |   7    |   1   |   0   |   0   |
| Cifrado        |   7    |   7    |   0   |   0   |   0   |
| Auditoría      |   7    |   5    |   2   |   0   |   0   |
| Control Acceso |   2    |   0    |   1   |   1   |   0   |
| **TOTAL**      | **24** | **19** | **4** | **1** | **0** |

---

**Próximo:** [06_EXPERIENCIA_USUARIO.md](./06_EXPERIENCIA_USUARIO.md)
