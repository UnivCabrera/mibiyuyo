# 🕵️‍♂️ Perfil 18: Ethical Hacker (Pentester)

**Auditoría Estratégica - Bloque C: Seguridad y Riesgos**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Ethical Hacker simula ataques contra la plataforma para encontrar vulnerabilidades antes que los actores maliciosos. Se enfoca en el OWASP Top 10, inyecciones SQL, problemas de autenticación y configuraciones inseguras.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Análisis de Vulnerabilidades | ✅ Teórico | `11_AUDITORIA_PROYECTO/ANALISIS_VULNERABILIDADES_VOLATILES.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| HACK-001 | **Escaneo Automatizado (SAST/DAST)** | 🔴 Bloqueante | `.github/workflows/security-scan.yml` | Sem 1 |
| HACK-002 | **Rate Limiting Agresivo (Anti-Bruteforce)** | 🟠 Alto | Configuración Elysia/Redis | Sem 1 |
| HACK-003 | Bug Bounty Program (Política) | 🟢 Bajo | `SECURITY.md` | Fase 2 |
| HACK-004 | Tests de Penetración Manual | 🟡 Medio | Reporte Externo | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Pipeline de Escaneo de Seguridad (OWASP ZAP)

Integración de escaneo dinámico en el CI/CD.

```yaml
# .github/workflows/security-scan.yml
name: OWASP ZAP Scan

on:
  schedule:
    - cron: '0 0 * * 0' # Semanalmente

jobs:
  zap_scan:
    runs-on: ubuntu-latest
    steps:
      - name: ZAP Scan
        uses: zaproxy/action-baseline@v0.9.0
        with:
          target: 'https://staging.finanzas-pyme.mx'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a'
```

### 2. Protección contra Fuerza Bruta (Redis)

Implementación de un rate limiter específico para endpoints de login.

```typescript
// src/lib/server/security/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({ url: process.env.REDIS_URL, token: process.env.REDIS_TOKEN });

export async function checkLoginAttempts(ip: string, email: string) {
  const key = `login_attempts:${ip}:${email}`;
  const attempts = await redis.incr(key);

  if (attempts === 1) {
    await redis.expire(key, 900); // 15 minutos
  }

  if (attempts > 5) {
    throw new Error('TOO_MANY_ATTEMPTS: Cuenta bloqueada temporalmente por seguridad.');
  }
}
```

---

## 🔗 Referencias

- **OWASP Top 10:** Lista de las vulnerabilidades web más críticas.
- **CWE (Common Weakness Enumeration):** Diccionario de debilidades de software.

---

*Última actualización: 9 Diciembre 2025*
