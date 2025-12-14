# 🔴 ANÁLISIS DE VULNERABILIDADES Y PUNTOS VOLÁTILES

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Fecha de Análisis:** 29 Noviembre 2025  
**Contexto:** Estado del proyecto al inicio de desarrollo  
**Objetivo:** Identificar y mitigar riesgos antes del desarrollo activo

---

## 📊 RESUMEN EJECUTIVO

| Categoría               | Críticos | Altos  | Medios | Total  |
| ----------------------- | -------- | ------ | ------ | ------ |
| **Código/Arquitectura** | 5        | 4      | 2      | 11     |
| **Dependencias/Stack**  | 3        | 3      | 2      | 8      |
| **Infraestructura**     | 4        | 3      | 1      | 8      |
| **Seguridad**           | 6        | 4      | 2      | 12     |
| **Negocio/Legal**       | 4        | 2      | 1      | 7      |
| **Operaciones**         | 2        | 3      | 2      | 7      |
| **TOTAL**               | **24**   | **19** | **10** | **53** |

---

## 🔴 CATEGORÍA 1: CÓDIGO Y ARQUITECTURA

### VULN-CA-001: Archivos de Código Son Placeholders

| Campo                        | Valor                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Severidad**                | 🔴 CRÍTICA                                                                                                               |
| **Ubicación**                | `Prototipo/finanzas-app-mx/backend/src/`, `frontend/`, `database/`                                                       |
| **Descripción**              | Los archivos de código fuente contienen solo `ssh usuario@ip_del_vps` como placeholder. No hay código real implementado. |
| **Impacto**                  | El proyecto no tiene código funcional. Todo debe construirse desde cero.                                                 |
| **Solución Propuesta**       | Seguir `ROADMAP_CONSTRUCCION_PASO_A_PASO.md` estrictamente. Semana 1-2: crear estructura real del código.                |
| **Prioridad Implementación** | Semana 1 (Lunes 2 Dic 2025)                                                                                              |

```typescript
// SOLUCIÓN: Crear archivo real backend/src/index.ts
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(cors())
  .use(swagger())
  .get("/health", () => ({ status: "ok", timestamp: new Date().toISOString() }))
  .listen(4000);

console.log(`🚀 Backend running at http://localhost:${app.server?.port}`);
```

---

### VULN-CA-002: Sin Estructura de Carpetas Hexagonal

| Campo                  | Valor                                                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                                                               |
| **Ubicación**          | `backend/src/`                                                                                                        |
| **Descripción**        | La documentación menciona Arquitectura Hexagonal pero no hay estructura `domain/`, `application/`, `infrastructure/`. |
| **Impacto**            | Código espagueti, difícil de mantener, testing complejo, cambios rompen todo.                                         |
| **Solución Propuesta** | Crear estructura desde el inicio                                                                                      |

```
backend/src/
├── domain/           # Entidades, Value Objects, Reglas de negocio
│   ├── entities/
│   ├── repositories/ # Interfaces (puertos)
│   └── services/     # Lógica de dominio
├── application/      # Casos de uso, orquestación
│   ├── commands/
│   ├── queries/
│   └── services/
├── infrastructure/   # Implementaciones concretas (adaptadores)
│   ├── persistence/  # Drizzle repos
│   ├── external/     # APIs SAT, PAC
│   └── web/          # Controllers, routes
└── shared/           # Utilidades, tipos comunes
```

---

### VULN-CA-003: Sin Validación de Tipos en Runtime

| Campo                  | Valor                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------ |
| **Severidad**          | 🔴 CRÍTICA                                                                                       |
| **Ubicación**          | API endpoints                                                                                    |
| **Descripción**        | TypeScript solo valida en compilación. Datos de usuarios/APIs externas no se validan en runtime. |
| **Impacto**            | Datos malformados causan errores, posible SQL injection, XSS.                                    |
| **Solución Propuesta** | Implementar TypeBox/Zod en todos los endpoints                                                   |

```typescript
// SOLUCIÓN: Validación con TypeBox en Elysia
import { Elysia, t } from "elysia";

const transactionSchema = t.Object({
  amount: t.Number({ minimum: 0.01, maximum: 999999999.99 }),
  type: t.Union([t.Literal("income"), t.Literal("expense")]),
  description: t.String({ minLength: 1, maxLength: 500 }),
  categoryId: t.String({ format: "uuid" }),
  date: t.String({ format: "date-time" }),
});

app.post(
  "/transactions",
  ({ body }) => {
    // body está validado y tipado
  },
  { body: transactionSchema },
);
```

---

### VULN-CA-004: Sin Manejo de Errores Centralizado

| Campo                  | Valor                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                             |
| **Descripción**        | No hay estrategia de manejo de errores. Errores exponen stack traces en producción. |
| **Impacto**            | Exposición de información sensible, UX pobre, debugging difícil.                    |
| **Solución Propuesta** | Crear middleware de error handling                                                  |

```typescript
// middleware/errorHandler.ts
export const errorHandler = new Elysia().onError(({ code, error, set }) => {
  console.error(`[ERROR] ${code}:`, error);

  // Nunca exponer stack trace en producción
  if (process.env.NODE_ENV === "production") {
    set.status = code === "NOT_FOUND" ? 404 : 500;
    return {
      error: {
        code: code,
        message:
          code === "NOT_FOUND"
            ? "Recurso no encontrado"
            : "Error interno del servidor",
        requestId: crypto.randomUUID(),
      },
    };
  }

  // En desarrollo, mostrar más detalles
  return { error: { code, message: error.message, stack: error.stack } };
});
```

---

### VULN-CA-005: Sin Tests Automatizados

| Campo                  | Valor                                                                           |
| ---------------------- | ------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                      |
| **Descripción**        | Cero tests unitarios, integración o E2E.                                        |
| **Impacto**            | Bugs en producción, regresiones, miedo a refactorizar, deuda técnica acumulada. |
| **Solución Propuesta** | Configurar testing desde día 1                                                  |

```typescript
// tests/auth.test.ts
import { describe, it, expect } from "bun:test";
import { app } from "../src/index";

describe("Auth API", () => {
  it("POST /auth/register - should create user", async () => {
    const response = await app.handle(
      new Request("http://localhost/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "SecurePass123!",
          name: "Test User",
        }),
      }),
    );

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.user.email).toBe("test@example.com");
  });
});
```

**Cobertura objetivo:** >75% en lógica de negocio

---

## 🔴 CATEGORÍA 2: DEPENDENCIAS Y STACK

### VULN-DS-001: Bun 1.2+ No Es LTS

| Campo                  | Valor                                                                                              |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                                            |
| **Descripción**        | Bun es estable pero evoluciona rápido. Breaking changes posibles.                                  |
| **Impacto**            | Actualizaciones pueden romper código, algunas librerías no compatibles.                            |
| **Solución Propuesta** | 1) Lockear versión en CI/CD. 2) Mantener Node.js 24 como fallback. 3) Testear antes de actualizar. |

```yaml
# .github/workflows/ci.yml
- uses: oven-sh/setup-bun@v2
  with:
    bun-version: "1.2.0" # Versión específica, no 'latest'
```

---

### VULN-DS-002: PostgreSQL 18 Es Bleeding Edge

| Campo                  | Valor                                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟠 ALTA                                                                                                     |
| **Descripción**        | PostgreSQL 18 fue lanzado recientemente (Q4 2025). Puede tener bugs no descubiertos.                        |
| **Impacto**            | Bugs en producción, incompatibilidades con herramientas, menos documentación.                               |
| **Solución Propuesta** | Considerar PostgreSQL 17 para producción inicial. Migrar a 18 después de 6 meses de estabilidad comprobada. |

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:17-alpine # Más estable que 18
    # Migrar a postgres:18-alpine en Q2 2026
```

---

### VULN-DS-003: Dependencia Crítica de APIs Externas

| Campo                  | Valor                                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                                                                                      |
| **Descripción**        | El sistema depende de: SAT (descarga CFDI), PAC (timbrado), Gemini (IA), Belvo (banking). Si cualquiera falla, funcionalidad crítica se pierde. |
| **Impacto**            | Usuarios no pueden facturar, ver datos bancarios, o usar IA.                                                                                    |
| **Solución Propuesta** | Implementar Circuit Breakers + Modo degradado                                                                                                   |

```typescript
// services/circuitBreaker.ts
import CircuitBreaker from "opossum";

const pacOptions = {
  timeout: 30000, // 30 segundos timeout
  errorThresholdPercentage: 50, // 50% errores abre circuito
  resetTimeout: 30000, // 30 segundos antes de reintentar
};

export const pacCircuit = new CircuitBreaker(timbrarFactura, pacOptions);

pacCircuit.on("open", () => {
  // Notificar a Sentry/Slack
  console.error("⚠️ PAC circuit OPEN - Timbrado no disponible");
  // Activar modo "guardar para timbrar después"
});

pacCircuit.on("halfOpen", () => {
  console.log("🔄 PAC circuit half-open - Probando reconexión");
});
```

---

### VULN-DS-004: EmbeddingGemma-300M No Probado en Producción

| Campo                  | Valor                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 MEDIA                                                                                                                        |
| **Descripción**        | Modelo de embeddings local es nuevo, poca documentación de producción.                                                          |
| **Impacto**            | Rendimiento desconocido bajo carga, posible OOM en VPS 16GB.                                                                    |
| **Solución Propuesta** | 1) Testear con dataset real antes de producción. 2) Configurar límites de memoria. 3) Tener fallback a Gemini embeddings cloud. |

---

### VULN-DS-005: Auth.js Adapter para Drizzle Es Comunitario

| Campo                  | Valor                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                                                                   |
| **Descripción**        | El adapter Drizzle para Auth.js es mantenido por la comunidad, no por el equipo core.                                     |
| **Impacto**            | Posibles bugs de seguridad, actualizaciones lentas.                                                                       |
| **Solución Propuesta** | 1) Auditar código del adapter. 2) Contribuir fixes upstream. 3) Tener plan de migración a adapter propio si es necesario. |

---

## 🔴 CATEGORÍA 3: INFRAESTRUCTURA

### VULN-INF-001: VPS Single Point of Failure

| Campo                  | Valor                                                       |
| ---------------------- | ----------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                  |
| **Descripción**        | Todo corre en un solo VPS Hostinger. Si falla, todo se cae. |
| **Impacto**            | Downtime total, pérdida de datos si disco falla.            |
| **Solución Propuesta** |                                                             |

**Corto plazo (MVP):**

- Backups diarios a ubicación externa (Backblaze B2)
- Monitoreo con alertas (Prometheus → Discord)
- Script de restauración probado

**Mediano plazo (Post-MVP):**

- VPS secundario en standby
- Replicación PostgreSQL streaming
- DNS failover (Cloudflare)

**Largo plazo (Escala):**

- Kubernetes (ya documentado en `06_ESCALAMIENTO/`)

---

### VULN-INF-002: Sin Firewall Configurado

| Campo                  | Valor                                                                          |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Severidad**          | 🔴 CRÍTICA                                                                     |
| **Descripción**        | VPS expone todos los puertos por defecto.                                      |
| **Impacto**            | Atacantes pueden acceder a PostgreSQL, Redis, servicios internos directamente. |
| **Solución Propuesta** | Configurar UFW + Traefik como único punto de entrada                           |

```bash
# Configuración UFW recomendada
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh          # 22
sudo ufw allow http         # 80 (redirect a 443)
sudo ufw allow https        # 443
sudo ufw enable

# PostgreSQL/Redis SOLO accesibles vía Docker network interno
# NUNCA exponer puertos 5432, 6379 al exterior
```

---

### VULN-INF-003: Secrets en .env Sin Encriptar

| Campo                  | Valor                                                          |
| ---------------------- | -------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                        |
| **Descripción**        | Credenciales en archivos .env en texto plano en el servidor.   |
| **Impacto**            | Si servidor es comprometido, todas las credenciales expuestas. |
| **Solución Propuesta** |                                                                |

**Opción 1 (MVP):** Docker Secrets

```yaml
# docker-compose.yml
secrets:
  db_password:
    file: ./secrets/db_password.txt
services:
  postgres:
    secrets:
      - db_password
```

**Opción 2 (Recomendado):** HashiCorp Vault o Infisical

---

### VULN-INF-004: Sin Rate Limiting en Origen

| Campo                  | Valor                                                           |
| ---------------------- | --------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                         |
| **Descripción**        | Rate limiting solo en Traefik. DDoS a nivel aplicación posible. |
| **Impacto**            | Atacante puede agotar recursos del backend.                     |
| **Solución Propuesta** | Rate limiting en múltiples capas                                |

```typescript
// middleware/rateLimit.ts (Elysia)
import { Elysia } from "elysia";
import { redis } from "../db/redis";

export const rateLimit = (requests: number, windowMs: number) =>
  new Elysia().derive(async ({ request }) => {
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const key = `ratelimit:${ip}`;
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, windowMs / 1000);
    }

    if (current > requests) {
      throw new Error("Too many requests");
    }

    return { rateLimit: { remaining: requests - current } };
  });
```

---

### VULN-INF-005: Backups No Probados

| Campo                  | Valor                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                       |
| **Descripción**        | Documentación menciona backups pero no hay evidencia de pruebas de restauración. |
| **Impacto**            | Backups pueden estar corruptos. No sabrás hasta que sea demasiado tarde.         |
| **Solución Propuesta** | Test de restauración mensual obligatorio                                         |

```bash
#!/bin/bash
# scripts/test-restore.sh - Ejecutar mensualmente

# 1. Crear base de datos de prueba
docker exec postgres createdb -U finanzas test_restore

# 2. Restaurar último backup
latest_backup=$(ls -t /backups/*.sql.gz | head -1)
gunzip -c $latest_backup | docker exec -i postgres psql -U finanzas test_restore

# 3. Verificar integridad
count=$(docker exec postgres psql -U finanzas -d test_restore -t -c "SELECT COUNT(*) FROM users")
if [ "$count" -gt 0 ]; then
  echo "✅ Backup válido - $count usuarios restaurados"
else
  echo "❌ ERROR: Backup corrupto o vacío"
  # Enviar alerta a Discord/Slack
fi

# 4. Limpiar
docker exec postgres dropdb -U finanzas test_restore
```

---

## 🔴 CATEGORÍA 4: SEGURIDAD

### VULN-SEC-001: Sin Protección CSRF Implementada

| Campo                  | Valor                                                                         |
| ---------------------- | ----------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                    |
| **Descripción**        | Documentación no menciona tokens CSRF para formularios.                       |
| **Impacto**            | Atacante puede ejecutar acciones en nombre del usuario vía sitios maliciosos. |
| **Solución Propuesta** | Implementar CSRF tokens en SvelteKit                                          |

```typescript
// hooks.server.ts (SvelteKit)
import { sequence } from "@sveltejs/kit/hooks";
import { csrf } from "sveltekit-csrf";

export const handle = sequence(
  csrf({
    secret: process.env.CSRF_SECRET,
    checkOrigin: true,
  }),
);
```

---

### VULN-SEC-002: CIEC/FIEL Almacenamiento Riesgoso

| Campo                  | Valor                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                                               |
| **Descripción**        | El proyecto planea almacenar credenciales del SAT (CIEC, FIEL/e.Firma). Esto es extremadamente sensible. |
| **Impacto**            | Breach expone acceso fiscal completo de usuarios. Responsabilidad legal masiva.                          |
| **Solución Propuesta** |                                                                                                          |

**Estrategia de Mitigación:**

1. **NUNCA almacenar CIEC en texto plano**
2. Cifrado AES-256 con key derivada del password del usuario
3. La key de cifrado NO debe estar en el servidor
4. Implementar HSM virtual o usar servicio como AWS KMS
5. Considerar NO almacenar y pedir cada vez (peor UX, mejor seguridad)

```typescript
// Cifrado de CIEC con key derivada
import { createCipheriv, createDecipheriv, scrypt } from "crypto";

const deriveKey = async (
  userPassword: string,
  salt: Buffer,
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    scrypt(userPassword, salt, 32, (err, key) => {
      if (err) reject(err);
      resolve(key);
    });
  });
};

const encryptCIEC = async (
  ciec: string,
  userPassword: string,
): Promise<string> => {
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);
  const key = await deriveKey(userPassword, salt);

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(ciec, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();

  // Formato: salt:iv:tag:encrypted
  return `${salt.toString("hex")}:${iv.toString("hex")}:${tag.toString("hex")}:${encrypted}`;
};
```

---

### VULN-SEC-003: Sin Content Security Policy

| Campo                  | Valor                                                   |
| ---------------------- | ------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                 |
| **Descripción**        | No hay CSP definida. XSS puede cargar scripts externos. |
| **Impacto**            | Robo de datos, sesiones, keylogging.                    |
| **Solución Propuesta** | Implementar CSP estricta                                |

```typescript
// svelte.config.js
const config = {
  kit: {
    csp: {
      mode: "auto",
      directives: {
        "default-src": ["self"],
        "script-src": ["self"],
        "style-src": ["self", "unsafe-inline"], // Necesario para Svelte
        "img-src": ["self", "data:", "https:"],
        "connect-src": ["self", "https://api.profinanconta.mx"],
        "frame-ancestors": ["none"],
        "form-action": ["self"],
      },
    },
  },
};
```

---

### VULN-SEC-004: Sin Sanitización de XML SAT

| Campo                  | Valor                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| **Severidad**          | 🔴 CRÍTICA                                                         |
| **Descripción**        | Descarga de XMLs del SAT puede contener payloads maliciosos (XXE). |
| **Impacto**            | Server-Side Request Forgery, lectura de archivos del servidor.     |
| **Solución Propuesta** | Parsear XML con configuración segura                               |

```typescript
// NUNCA usar xml2js sin configuración segura
import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  // CRÍTICO: Deshabilitar entidades externas
  processEntities: false,
  // No resolver DTD
  allowBooleanAttributes: false,
});

const parseCFDI = (xmlString: string) => {
  // Validar que es XML bien formado primero
  if (!xmlString.startsWith("<?xml")) {
    throw new Error("Invalid XML format");
  }

  return parser.parse(xmlString);
};
```

---

### VULN-SEC-005: Logs Pueden Contener Datos Sensibles

| Campo                  | Valor                                                                            |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                          |
| **Descripción**        | Sin política de sanitización de logs. Passwords, tokens pueden terminar en logs. |
| **Impacto**            | Breach de logs = breach de credenciales.                                         |
| **Solución Propuesta** | Implementar sanitizador de logs                                                  |

```typescript
// utils/logger.ts
const SENSITIVE_FIELDS = [
  "password",
  "token",
  "ciec",
  "fiel",
  "secret",
  "apiKey",
];

const sanitize = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) return obj;

  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE_FIELDS.some((f) => key.toLowerCase().includes(f))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof sanitized[key] === "object") {
      sanitized[key] = sanitize(sanitized[key]);
    }
  }
  return sanitized;
};

export const log = {
  info: (message: string, data?: any) => {
    console.log(
      JSON.stringify({
        level: "info",
        message,
        data: sanitize(data),
        timestamp: new Date(),
      }),
    );
  },
  error: (message: string, error?: any, data?: any) => {
    console.error(
      JSON.stringify({
        level: "error",
        message,
        error: error?.message,
        data: sanitize(data),
        timestamp: new Date(),
      }),
    );
  },
};
```

---

### VULN-SEC-006: Sin Protección contra Timing Attacks

| Campo                  | Valor                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 MEDIA                                                                           |
| **Descripción**        | Comparación de tokens/passwords puede filtrar información por tiempo de respuesta. |
| **Solución Propuesta** | Usar comparación de tiempo constante                                               |

```typescript
import { timingSafeEqual } from "crypto";

const secureCompare = (a: string, b: string): boolean => {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    // Comparar contra sí mismo para mantener tiempo constante
    timingSafeEqual(bufA, bufA);
    return false;
  }

  return timingSafeEqual(bufA, bufB);
};
```

---

## 🔴 CATEGORÍA 5: NEGOCIO Y LEGAL

### VULN-BL-001: Cambios en Legislación SAT

| Campo                  | Valor                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                             |
| **Descripción**        | SAT cambia reglas fiscales frecuentemente. CFDI 4.0 ya tuvo múltiples actualizaciones. |
| **Impacto**            | Sistema puede generar facturas inválidas, usuarios multados.                           |
| **Solución Propuesta** |                                                                                        |

1. **Monitoreo activo:** Suscribirse a boletín SAT
2. **Catálogos dinámicos:** Job semanal para actualizar catálogos
3. **Feature flags:** Poder deshabilitar features rápidamente
4. **Versionado de reglas:** Lógica fiscal en módulos intercambiables

```typescript
// domain/fiscal/rules/cfdi40.ts
export interface CFDIRules {
  version: string;
  validate(cfdi: CFDI): ValidationResult;
  transform(cfdi: CFDI): CFDI;
}

// Fácil de cambiar cuando SAT actualice
export const currentRules: CFDIRules = cfdi40Rules;
```

---

### VULN-BL-002: Sin Aviso de Privacidad Implementado

| Campo                  | Valor                                                           |
| ---------------------- | --------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA (Legal)                                              |
| **Descripción**        | LFPDPPP requiere aviso de privacidad antes de recolectar datos. |
| **Impacto**            | Multas de 100 a 320,000 UMAs (~$32 millones MXN máximo).        |
| **Solución Propuesta** |                                                                 |

1. Redactar aviso de privacidad completo
2. Mostrar en registro antes de crear cuenta
3. Checkbox obligatorio (no pre-marcado)
4. Almacenar timestamp de aceptación
5. Versionar el aviso (si cambia, re-aceptar)

---

### VULN-BL-003: Sin Política de Retención de Datos

| Campo                  | Valor                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                                                                        |
| **Descripción**        | CFF requiere guardar facturas 7 años. LFPDPPP requiere eliminar datos cuando ya no sean necesarios. Conflicto. |
| **Solución Propuesta** | Política clara documentada                                                                                     |

```
POLÍTICA DE RETENCIÓN:
- Datos fiscales (CFDI, XML): 7 años (CFF Art. 30)
- Datos personales no fiscales: Hasta 2 años después de cierre de cuenta
- Logs de acceso: 1 año
- Datos analíticos anónimos: Indefinido
- Backups: Rotación 30 días
```

---

### VULN-BL-004: Responsabilidad por Datos de Terceros

| Campo                  | Valor                                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                                                    |
| **Descripción**        | Al descargar facturas de proveedores, tenemos datos de terceros que no aceptaron nuestro aviso de privacidad. |
| **Impacto**            | Posible violación de LFPDPPP con datos de terceros.                                                           |
| **Solución Propuesta** |                                                                                                               |

1. Limitar datos de terceros al mínimo necesario (RFC, razón social)
2. No usar datos de terceros para marketing
3. Documentar base legal (interés legítimo fiscal)
4. Permitir a terceros solicitar eliminación

---

## 🔴 CATEGORÍA 6: OPERACIONES

### VULN-OP-001: Sin Runbook de Incidentes

| Campo                  | Valor                                                                       |
| ---------------------- | --------------------------------------------------------------------------- |
| **Severidad**          | 🔴 CRÍTICA                                                                  |
| **Descripción**        | No hay procedimientos documentados para responder a incidentes.             |
| **Impacto**            | Pánico, decisiones incorrectas, tiempo de respuesta lento, daño a usuarios. |
| **Solución Propuesta** | Crear runbooks para escenarios comunes                                      |

**Runbook mínimo a crear:**

1. `RUNBOOK-001`: Servidor caído
2. `RUNBOOK-002`: Base de datos corrupta
3. `RUNBOOK-003`: Breach de seguridad detectado
4. `RUNBOOK-004`: API SAT no disponible
5. `RUNBOOK-005`: Certificado SSL expirado

---

### VULN-OP-002: Sin Monitoreo de Negocio

| Campo                  | Valor                                                             |
| ---------------------- | ----------------------------------------------------------------- |
| **Severidad**          | 🟡 ALTA                                                           |
| **Descripción**        | Prometheus monitorea infraestructura pero no métricas de negocio. |
| **Impacto**            | No sabrás si usuarios están teniendo problemas funcionales.       |
| **Solución Propuesta** | Dashboards de negocio en Grafana                                  |

**Métricas de negocio a trackear:**

- Facturas timbradas exitosas vs fallidas (por hora)
- Tiempo promedio de timbrado
- Usuarios activos (DAU, WAU, MAU)
- Tasa de conversión free → paid
- Errores de validación más comunes
- Uso de features por plan

---

### VULN-OP-003: Sin Feature Flags

| Campo                  | Valor                                                    |
| ---------------------- | -------------------------------------------------------- |
| **Severidad**          | 🟡 MEDIA                                                 |
| **Descripción**        | No hay manera de activar/desactivar features sin deploy. |
| **Impacto**            | Para arreglar un bug, hay que hacer deploy completo.     |
| **Solución Propuesta** | Implementar sistema simple de feature flags              |

```typescript
// lib/featureFlags.ts
const FLAGS = {
  ENABLE_AI_CHAT: true,
  ENABLE_BANK_SYNC: false, // Próximamente
  ENABLE_NEW_DASHBOARD: false, // Testing
  MAINTENANCE_MODE: false,
};

// Cargar de Redis para cambios dinámicos
export const isEnabled = async (flag: keyof typeof FLAGS): Promise<boolean> => {
  const override = await redis.get(`flag:${flag}`);
  if (override !== null) return override === "true";
  return FLAGS[flag];
};
```

---

## 📋 PLAN DE ACCIÓN PRIORIZADO

### 🚨 SEMANA 1-2 (INMEDIATO)

| #   | Vulnerabilidad | Acción                                   |
| --- | -------------- | ---------------------------------------- |
| 1   | VULN-CA-001    | Crear código real (estructura hexagonal) |
| 2   | VULN-INF-002   | Configurar firewall UFW                  |
| 3   | VULN-SEC-001   | Implementar CSRF                         |
| 4   | VULN-CA-003    | Agregar validación TypeBox               |
| 5   | VULN-INF-003   | Migrar secrets a Docker Secrets          |

### 🟡 SEMANA 3-4 (ALTA PRIORIDAD)

| #   | Vulnerabilidad | Acción                              |
| --- | -------------- | ----------------------------------- |
| 6   | VULN-SEC-002   | Implementar cifrado CIEC/FIEL       |
| 7   | VULN-DS-003    | Circuit breakers para APIs externas |
| 8   | VULN-CA-005    | Setup de tests automatizados        |
| 9   | VULN-SEC-003   | Configurar CSP                      |
| 10  | VULN-BL-002    | Publicar aviso de privacidad        |

### 🟢 SEMANA 5-8 (PRE-PRODUCCIÓN)

| #   | Vulnerabilidad | Acción                          |
| --- | -------------- | ------------------------------- |
| 11  | VULN-INF-005   | Script y prueba de restauración |
| 12  | VULN-OP-001    | Escribir runbooks               |
| 13  | VULN-OP-002    | Dashboards de negocio           |
| 14  | VULN-INF-001   | Plan de backup offsite          |
| 15  | VULN-OP-003    | Feature flags                   |

---

## ✅ CONCLUSIÓN

El proyecto tiene una **arquitectura bien pensada** pero está en **fase de documentación**, no de implementación. Los principales riesgos son:

1. **Código placeholder** - Todo debe construirse
2. **Datos sensibles (CIEC/FIEL)** - Requiere seguridad excepcional
3. **Dependencia de APIs externas** - Necesita resiliencia
4. **Single point of failure** - Un VPS para todo
5. **Compliance legal** - LFPDPPP y CFF requieren atención

**Recomendación:** Seguir el `ROADMAP_CONSTRUCCION_PASO_A_PASO.md` pero integrando las soluciones de seguridad desde el día 1, no como "nice to have" posterior.

---

_Análisis completado el 29 de Noviembre de 2025_  
_GitHub Copilot - Claude Opus 4.5_
