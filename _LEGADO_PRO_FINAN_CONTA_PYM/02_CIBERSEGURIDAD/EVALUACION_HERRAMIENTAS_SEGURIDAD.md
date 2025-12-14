# 🔐 EVALUACIÓN DE HERRAMIENTAS DE SEGURIDAD IA

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Herramientas Evaluadas:** Metis AI Security, BruteForceAI  
**Versión:** 1.0  
**Fecha:** 29 Noviembre 2025

---

## 📋 ÍNDICE

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Metis AI Security Code Review](#metis-ai-security-code-review)
3. [BruteForceAI](#bruteforceai)
4. [Comparativa con Stack Actual](#comparativa-con-stack-actual)
5. [Recomendación Final](#recomendación-final)
6. [Plan de Integración Propuesto](#plan-de-integración-propuesto)

---

## 🎯 RESUMEN EJECUTIVO

### Pregunta del Usuario

> "Metis: AI-Powered Security Code Review... valdría la pena agregar esto al proyecto?"

### Respuesta Corta

| Herramienta      |   ¿Agregar?    | Cuándo            | Prioridad |
| :--------------- | :------------: | :---------------- | :-------: |
| **Metis AI**     |     ✅ SÍ      | Fase 2 (Post-MVP) | 🟡 MEDIA  |
| **BruteForceAI** | ⚠️ CONDICIONAL | Solo auditorías   |  🟢 BAJA  |

### Justificación Rápida

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ANÁLISIS DE VALOR AGREGADO                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  METIS AI:                                                             │
│  ✅ Usa pgvector (ya lo tenemos en stack)                             │
│  ✅ Compatible con Ollama (podemos correr local)                      │
│  ✅ Detecta vulnerabilidades en código automáticamente                │
│  ✅ Integra con CI/CD                                                  │
│  ⚠️ Requiere recursos adicionales de GPU/CPU                         │
│  ⚠️ Curva de aprendizaje                                              │
│                                                                         │
│  BRUTEFORCEAI:                                                         │
│  ✅ Automatiza pruebas de penetración                                 │
│  ✅ Útil para auditorías de seguridad                                 │
│  ⚠️ No es para uso continuo (solo auditorías puntuales)              │
│  ❌ Puede generar alertas en hosting si se usa mal                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🤖 METIS AI SECURITY CODE REVIEW

### ¿Qué es Metis?

Metis es una herramienta de revisión de código impulsada por IA que:

- Analiza código fuente en busca de vulnerabilidades de seguridad
- Usa embeddings vectoriales (pgvector compatible) para entender contexto
- Puede correr con modelos locales (Ollama) o APIs externas
- Detecta patrones de código inseguro automáticamente

### Características Relevantes para el Proyecto

| Feature                     | Relevancia | Alineación con Stack        |
| :-------------------------- | :--------: | :-------------------------- |
| **Detección SQL Injection** |  🔴 ALTA   | Protege Drizzle ORM queries |
| **XSS Detection**           |  🔴 ALTA   | Protege Svelte components   |
| **Auth Vulnerabilities**    |  🔴 ALTA   | Complementa Auth.js         |
| **Secrets Scanning**        |  🟡 MEDIA  | Detecta API keys expuestas  |
| **Dependency Audit**        |  🟡 MEDIA  | Revisa package.json         |
| **pgvector Integration**    |  🟢 BONUS  | Ya tenemos pgvector         |
| **Ollama Support**          |  🟢 BONUS  | Podemos correr local        |

### Arquitectura de Integración Propuesta

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE METIS EN CI/CD                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  [GitHub Push] → [GitHub Actions] → [Metis Scanner]                    │
│                                           │                             │
│                                           ▼                             │
│                        ┌─────────────────────────────────┐             │
│                        │     ANÁLISIS DE SEGURIDAD       │             │
│                        │                                 │             │
│                        │  1. Parse código TypeScript     │             │
│                        │  2. Genera embeddings (Gemma)   │             │
│                        │  3. Compara con patrones vuln   │             │
│                        │  4. Genera reporte              │             │
│                        │                                 │             │
│                        └──────────────┬──────────────────┘             │
│                                       │                                 │
│                                       ▼                                 │
│          ┌────────────────────────────┴────────────────────────┐       │
│          │                                                      │       │
│     [Sin Issues]                                          [Issues]     │
│          │                                                      │       │
│          ▼                                                      ▼       │
│    ✅ Deploy                                            ❌ Block PR    │
│                                                         + Crear Issue  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Recursos Requeridos

| Recurso       |  Mínimo  | Recomendado |
| :------------ | :------: | :---------: |
| **RAM**       |   2GB    |     4GB     |
| **CPU**       | 2 cores  |   4 cores   |
| **Disco**     |   5GB    |    10GB     |
| **Modelo IA** | Gemma 2B | Llama 3 8B  |

### Impacto en VPS Actual (4 vCPU, 16GB)

```
ANTES (Sin Metis):
├── PostgreSQL:    ~2GB RAM
├── Redis:         ~512MB RAM
├── Backend:       ~1GB RAM
├── Frontend:      ~512MB RAM
├── Embedding:     ~500MB RAM
└── Sistema:       ~2GB RAM
    TOTAL:         ~6.5GB / 16GB (41%)

DESPUÉS (Con Metis en CI/CD - No en producción):
├── Mismos servicios: ~6.5GB
├── Metis (solo CI):  0GB en prod
└── TOTAL PROD:       ~6.5GB (sin cambio)

Metis corre en GitHub Actions, NO en el VPS de producción ✅
```

### Configuración de Ejemplo

```yaml
# .github/workflows/security-scan.yml
name: Metis Security Scan

on:
  pull_request:
    branches: [main, develop]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run Metis Scanner
        uses: metis-ai/scanner-action@v1
        with:
          scan-path: "./src"
          language: "typescript"
          severity-threshold: "medium"
          ollama-model: "llama3:8b" # Corre en GitHub Actions

      - name: Upload SARIF
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: metis-results.sarif
```

### Tipos de Vulnerabilidades Detectadas

```typescript
// Ejemplos de lo que Metis detectaría en nuestro código

// ❌ VULNERABLE - SQL Injection (aunque usemos Drizzle)
const unsafeQuery = db.execute(`SELECT * FROM users WHERE id = ${userId}`);

// ✅ SEGURO - Drizzle parameterizado
const safeQuery = db.select().from(users).where(eq(users.id, userId));

// ❌ VULNERABLE - XSS en Svelte
{@html userInput}

// ✅ SEGURO - Escapado automático
{userInput}

// ❌ VULNERABLE - Secret hardcodeado
const API_KEY = "sk-1234567890abcdef";

// ✅ SEGURO - Variable de entorno
const API_KEY = process.env.GEMINI_API_KEY;
```

### Costo-Beneficio

| Aspecto                       | Valor                  |
| :---------------------------- | :--------------------- |
| **Costo**                     | $0 (Open Source)       |
| **Tiempo Setup**              | ~2 horas               |
| **Mantenimiento**             | ~30 min/semana         |
| **Vulnerabilidades Evitadas** | ~5-10/mes estimado     |
| **Costo de un breach**        | $50,000 - $500,000 USD |
| **ROI**                       | Muy alto ✅            |

---

## 💥 BRUTEFORCEAI

### ¿Qué es BruteForceAI?

Herramienta de pruebas de penetración automatizadas con IA que:

- Simula ataques de fuerza bruta inteligentes
- Encuentra endpoints vulnerables
- Prueba configuraciones de autenticación
- Genera reportes de seguridad

### Características

| Feature                | Descripción                            |
| :--------------------- | :------------------------------------- |
| **Smart Fuzzing**      | Genera payloads inteligentes con IA    |
| **Auth Testing**       | Prueba mecanismos de login             |
| **API Discovery**      | Encuentra endpoints ocultos            |
| **Rate Limit Testing** | Verifica protecciones anti-brute force |
| **Report Generation**  | Informes detallados                    |

### ⚠️ ADVERTENCIAS IMPORTANTES

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ⚠️ PRECAUCIONES CON BRUTEFORCEAI                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. NUNCA usar contra sistemas en producción sin autorización         │
│                                                                         │
│  2. SOLO usar en entornos de desarrollo/staging                       │
│                                                                         │
│  3. Hostinger puede bloquear tu VPS si detecta ataques                │
│                                                                         │
│  4. Usar solo durante auditorías programadas                          │
│                                                                         │
│  5. Documentar siempre el alcance y la autorización                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Cuándo Usar BruteForceAI

| Escenario                  |   ¿Usar?   | Frecuencia       |
| :------------------------- | :--------: | :--------------- |
| Auditoría pre-lanzamiento  |   ✅ SÍ    | Una vez          |
| Auditoría trimestral       |   ✅ SÍ    | Cada 3 meses     |
| Después de cambios grandes |   ✅ SÍ    | Por evento       |
| Pruebas continuas en CI    |   ❌ NO    | N/A              |
| Contra producción          | ⚠️ CUIDADO | Con autorización |

### Alternativa Recomendada: OWASP ZAP

```
Para pruebas de penetración regulares, mejor usar OWASP ZAP:
- Más establecido y documentado
- Integración con CI/CD probada
- Menos riesgo de falsos positivos
- Comunidad activa
```

---

## ⚖️ COMPARATIVA CON STACK ACTUAL

### Herramientas de Seguridad Ya Incluidas

| Capa             | Herramienta Actual      | Metis Agregaría          |
| :--------------- | :---------------------- | :----------------------- |
| **Código**       | ESLint security rules   | Análisis profundo con IA |
| **Dependencias** | npm audit               | Contexto de uso          |
| **Secrets**      | .env + gitignore        | Detección en commits     |
| **Runtime**      | Sentry                  | N/A (Metis es estático)  |
| **Infra**        | Traefik + rate limiting | N/A                      |
| **Auth**         | Auth.js                 | Validación de config     |

### Matriz de Decisión

```
                    ESFUERZO DE IMPLEMENTACIÓN
                    Bajo         Alto
                    ┌───────────┬───────────┐
              Alto  │  ★ METIS  │ BruteForce│
   VALOR           │   (SÍ)    │  (MAYBE)  │
              Bajo  │  ESLint++ │   N/A     │
                    │  (Ya está)│           │
                    └───────────┴───────────┘
```

---

## ✅ RECOMENDACIÓN FINAL

### Para Metis AI

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         ✅ RECOMENDACIÓN: SÍ                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  AGREGAR METIS AL PROYECTO                                             │
│                                                                         │
│  Cuándo: Fase 2 (después del MVP)                                      │
│  Dónde: GitHub Actions (CI/CD), no en VPS                              │
│  Cómo: Como paso obligatorio en PRs                                    │
│                                                                         │
│  Razones:                                                               │
│  ✓ Compatible con pgvector (ya en stack)                               │
│  ✓ Puede usar modelos locales (Ollama/Gemma)                           │
│  ✓ Costo $0 (Open Source)                                              │
│  ✓ Alto ROI en prevención de vulnerabilidades                         │
│  ✓ No impacta recursos de producción                                  │
│                                                                         │
│  Prioridad: MEDIA (implementar después de funcionalidades core)        │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Para BruteForceAI

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ⚠️ RECOMENDACIÓN: CONDICIONAL                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  NO AGREGAR AL FLUJO REGULAR                                           │
│  USAR SOLO PARA AUDITORÍAS PUNTUALES                                   │
│                                                                         │
│  Cuándo usarlo:                                                         │
│  ✓ Auditoría de seguridad pre-lanzamiento                             │
│  ✓ Revisión trimestral de seguridad                                   │
│  ✓ Después de implementar nuevos endpoints de auth                    │
│                                                                         │
│  Cuándo NO usarlo:                                                      │
│  ✗ Como parte del CI/CD regular                                        │
│  ✗ Contra servidores de producción sin aviso                          │
│  ✗ Sin documentar alcance y autorización                              │
│                                                                         │
│  Alternativa preferida: OWASP ZAP para pruebas regulares              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 PLAN DE INTEGRACIÓN PROPUESTO

### Fase 1: Preparación (Semana 1)

```bash
# 1. Crear workflow de GitHub Actions
mkdir -p .github/workflows
touch .github/workflows/security-scan.yml

# 2. Configurar reglas de ESLint de seguridad (ya deberíamos tener)
npm install --save-dev eslint-plugin-security

# 3. Configurar pre-commit hooks
npm install --save-dev husky lint-staged
```

### Fase 2: Implementación Metis (Semana 2-3)

```yaml
# .github/workflows/security-scan.yml
name: Security Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main, develop]

jobs:
  # Job 1: Análisis estático con ESLint Security
  eslint-security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci
      - run: npm run lint:security

  # Job 2: Auditoría de dependencias
  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm audit --audit-level=high

  # Job 3: Metis AI Scanner (cuando esté disponible)
  metis-scan:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - name: Run Metis AI Security Scan
        # Configurar cuando implementemos
        run: echo "Metis scan placeholder"

  # Job 4: Secret scanning
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
```

### Fase 3: Monitoreo Continuo

```typescript
// src/lib/security/audit-logger.ts
import { db } from "$lib/database";

interface SecurityEvent {
  type:
    | "auth_failure"
    | "rate_limit"
    | "suspicious_activity"
    | "vulnerability_scan";
  severity: "low" | "medium" | "high" | "critical";
  details: Record<string, unknown>;
  ip?: string;
  userId?: string;
}

export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  await db.insert(securityLogs).values({
    type: event.type,
    severity: event.severity,
    details: JSON.stringify(event.details),
    ip: event.ip,
    userId: event.userId,
    timestamp: new Date(),
  });

  // Alertar si es crítico
  if (event.severity === "critical") {
    // Enviar notificación a Sentry/Slack
    await notifySecurityTeam(event);
  }
}
```

---

## 📊 RESUMEN DE DECISIONES

| Herramienta         |      Decisión      | Prioridad | Timeline           |
| :------------------ | :----------------: | :-------: | :----------------- |
| **Metis AI**        |   ✅ Implementar   |   MEDIA   | Fase 2 (post-MVP)  |
| **BruteForceAI**    | ⚠️ Solo auditorías |   BAJA    | Cuando se necesite |
| **ESLint Security** |   ✅ Ya incluido   |   ALTA    | Ahora              |
| **npm audit**       |   ✅ Ya incluido   |   ALTA    | Ahora              |
| **OWASP ZAP**       |   📋 Considerar    |   MEDIA   | Auditorías         |
| **Trufflehog**      |   ✅ Implementar   |   ALTA    | Semana 1           |

---

## 📎 ARCHIVOS RELACIONADOS

- `02_CIBERSEGURIDAD/50_VULNERABILIDADES.md`
- `01_AUDITORIA_ESTRATEGICA/03_Seguridad_Riesgos/AUDITORIA_SEGURIDAD.md`
- `.github/workflows/security-scan.yml` (a crear)

---

**Evaluación de Herramientas de Seguridad v1.0 - PRO_FINAN_CONTA_PYM**
