# 👨‍💻 Perfil 10: Backend Lead (Founder + ElysiaJS)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025
**Reingeniería:** Bootstrap + México Profundo

---

## 🎯 Transformación de Rol (Bootstrap)

### Antes (Tradicional):

- **Título:** Backend Lead Senior ($50k-80k MXN/mes)
- **Equipo:** 2-3 Backend Developers Junior ($35k MXN/mes c/u)
- **Costo Total:** $120k-170k MXN/mes = **$1.44M-2.04M MXN/año**

### Después (Bootstrap):

- **Rol:** **Founder como Backend Developer** (aprende ElysiaJS)
- **Costo:** $0 MXN/mes + 3 meses de learning curve
- **Contratar Backend Senior:** Solo cuando llegues a **5,000+ usuarios activos** y necesites escalar a microservicios

---

## 📋 Misión Redefinida

El **Founder** construye la lógica de negocio crítica usando **ElysiaJS sobre Bun**, enfocándose en:

1. **APIs REST type-safe** (Eden Treaty = TypeScript end-to-end)
2. **Validación con Zod** (schemas compartidos frontend-backend)
3. **Drizzle ORM** (SQL type-safe, no Prisma pesado)
4. **Seguridad básica** (CORS, Rate Limiting, Auth)

**Mentalidad Bootstrap:**

- Priorizar features que generen revenue (facturación, conciliación bancaria)
- Postergar optimizaciones prematuras (caching avanzado, GraphQL, microservicios)
- Usar herramientas que reducen bugs (TypeScript strict, Zod, Drizzle)

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework | ✅ ElysiaJS 1.4.16+ | `00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md` |
| Runtime | ✅ Bun 1.3.3+ | Stack Definitivo + Dockerfile (Perfil 08) |
| ORM | ✅ Drizzle ORM 0.38+ | Perfil 13 (DBA) + Seeds Catálogo SAT |
| Validación | ✅ Zod | AGENTS.md (stack obligatorio) |
| Auth | ✅ Better Auth | `03_STACK_TECNOLOGICO_DEFINITIVO.md` (lines 200-250) |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| BCK-001 | **Error Handler Global (Elysia)** | 🔴 Bloqueante | ElysiaJS `.onError()` | $0 | Sem 1 |
| BCK-002 | **Auth Middleware (Better Auth)** | 🔴 Bloqueante | `@better-auth/elysia` | $0 | Sem 1 |
| BCK-003 | **Rate Limiting (Anti-DDoS)** | 🟠 Alto | `elysia-rate-limit` | $0 | Sem 1 |
| BCK-004 | **CORS + Security Headers** | 🟠 Alto | `@elysiajs/cors` + `elysia-helmet` | $0 | Sem 1 |
| BCK-005 | **Tests de Integración (Bun Test)** | 🟡 Medio | `bun:test` (built-in) | $0 | Sem 2 |
| BCK-006 | ~~Contratar Backend Senior~~ | ❌ Descartado | N/A | $50k-80k/mes ⛔ | Solo con 5k+ usuarios |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Estructura Base de ElysiaJS (Founder-Friendly)

**Objetivo:** API REST type-safe con seguridad básica, sin complejidad innecesaria.

```typescript
// backend/src/index.ts (Entrypoint principal)
import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { rateLimit } from 'elysia-rate-limit'
import { helmet } from 'elysia-helmet'
import { betterAuth } from '@better-auth/elysia'

// Rutas modulares
import { authRoutes } from './routes/auth'
import { facturasRoutes } from './routes/facturas'
import { conciliacionRoutes } from './routes/conciliacion'
import { catalogoRoutes } from './routes/catalogo'

const app = new Elysia()
  // Seguridad básica
  .use(helmet({
    contentSecurityPolicy: false, // Desactivar para desarrollo
    xFrameOptions: { action: 'deny' }
  }))

  // CORS (permitir frontend SvelteKit)
  .use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }))

  // Rate Limiting (Anti-DDoS básico)
  .use(rateLimit({
    duration: 60_000, // 1 minuto
    max: 100,         // 100 requests/min por IP
    skip: (req) => req.headers.get('x-internal') === 'true' // Skip para cron jobs
  }))

  // Auth (Better Auth integrado)
  .use(betterAuth({
    database: process.env.DATABASE_URL!,
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      }
    }
  }))

  // Swagger UI (solo en desarrollo)
  .use(swagger({
    path: '/docs',
    exclude: process.env.NODE_ENV === 'production' ? ['/docs'] : [],
    documentation: {
      info: {
        title: 'FinTech PyME México API',
        version: '1.0.0',
        description: 'API REST para contabilidad, facturación y conciliación bancaria'
      },
      tags: [
        { name: 'Auth', description: 'Autenticación y sesiones' },
        { name: 'Facturas', description: 'CFDI 4.0 Timbrado' },
        { name: 'Conciliación', description: 'SAT vs Bancos' },
        { name: 'Catálogo', description: 'Catálogo de Cuentas SAT' }
      ]
    }
  }))

  // Error Handler Global
  .onError(({ code, error, set, request }) => {
    // Log errors (integración con GlitchTip)
    console.error(`[${code}] ${request.method} ${request.url}:`, error)

    switch (code) {
      case 'VALIDATION':
        set.status = 400
        return {
          success: false,
          error: 'Datos inválidos',
          details: error.message
        }

      case 'NOT_FOUND':
        set.status = 404
        return {
          success: false,
          error: 'Recurso no encontrado'
        }

      case 'PARSE':
        set.status = 400
        return {
          success: false,
          error: 'JSON malformado'
        }

      default:
        set.status = 500
        return {
          success: false,
          error: process.env.NODE_ENV === 'production'
            ? 'Error interno del servidor'
            : error.message
        }
    }
  })

  // Rutas (modularizadas)
  .group('/api/v1', (app) => app
    .use(authRoutes)
    .use(facturasRoutes)
    .use(conciliacionRoutes)
    .use(catalogoRoutes)
  )

  // Health check (para Dokploy)
  .get('/health', () => ({ status: 'ok', timestamp: Date.now() }))

  .listen(process.env.PORT || 3000)

console.log(`🦊 Elysia corriendo en http://localhost:${app.server?.port}`)

// Eden Treaty (Type Safety para Frontend)
export type App = typeof app
```

---

### 2. Módulo de Facturas CFDI 4.0 (Ejemplo Completo)

**Objetivo:** Crear, timbrar y almacenar facturas con validación SAT.

```typescript
// backend/src/routes/facturas.ts
import { Elysia, t } from 'elysia'
import { db } from '../db'
import { facturas, conceptos } from '../db/schema'
import { eq } from 'drizzle-orm'
import { timbrarCFDI } from '../services/finkok'

// Schemas Zod (validación + types)
const ConceptoSchema = t.Object({
  clave_prod_serv: t.String({ minLength: 8, maxLength: 8 }), // Catálogo SAT
  cantidad: t.Number({ minimum: 0.01 }),
  unidad: t.String(),
  descripcion: t.String({ minLength: 5 }),
  valor_unitario: t.Number({ minimum: 0 }),
  importe: t.Number({ minimum: 0 }),
  impuestos: t.Optional(t.Object({
    traslados: t.Array(t.Object({
      base: t.Number(),
      impuesto: t.Literal('002'), // IVA
      tipo_factor: t.Literal('Tasa'),
      tasa_o_cuota: t.Number(),
      importe: t.Number()
    }))
  }))
})

const FacturaSchema = t.Object({
  receptor_rfc: t.String({
    pattern: '^[A-ZÑ&]{3,4}\\d{6}[A-Z0-9]{3}$' // Regex RFC mexicano
  }),
  receptor_nombre: t.String(),
  uso_cfdi: t.String(), // Catálogo SAT c_UsoCFDI
  forma_pago: t.String(), // 01=Efectivo, 03=Transferencia, etc.
  metodo_pago: t.String(), // PUE, PPD
  conceptos: t.Array(ConceptoSchema),
  observaciones: t.Optional(t.String())
})

export const facturasRoutes = new Elysia({ prefix: '/facturas' })
  // GET /api/v1/facturas (Listar facturas del usuario)
  .get('/', async ({ user, query }) => {
    if (!user) return { success: false, error: 'No autenticado' }

    const { page = '1', limit = '20', status } = query
    const offset = (parseInt(page) - 1) * parseInt(limit)

    const results = await db
      .select()
      .from(facturas)
      .where(eq(facturas.user_id, user.id))
      .limit(parseInt(limit))
      .offset(offset)

    return {
      success: true,
      data: results,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: results.length
      }
    }
  }, {
    detail: {
      tags: ['Facturas'],
      summary: 'Listar facturas del usuario autenticado'
    }
  })

  // POST /api/v1/facturas (Crear y timbrar CFDI)
  .post('/', async ({ user, body, set }) => {
    if (!user) {
      set.status = 401
      return { success: false, error: 'No autenticado' }
    }

    try {
      // 1. Validar datos
      const datos = body as typeof FacturaSchema.static

      // 2. Calcular totales
      const subtotal = datos.conceptos.reduce((sum, c) => sum + c.importe, 0)
      const iva = datos.conceptos.reduce((sum, c) => {
        const traslados = c.impuestos?.traslados || []
        return sum + traslados.reduce((s, t) => s + t.importe, 0)
      }, 0)
      const total = subtotal + iva

      // 3. Guardar en BD (estado: 'borrador')
      const [nuevaFactura] = await db.insert(facturas).values({
        user_id: user.id,
        receptor_rfc: datos.receptor_rfc,
        receptor_nombre: datos.receptor_nombre,
        uso_cfdi: datos.uso_cfdi,
        forma_pago: datos.forma_pago,
        metodo_pago: datos.metodo_pago,
        subtotal,
        iva,
        total,
        status: 'borrador',
        created_at: new Date()
      }).returning()

      // 4. Insertar conceptos
      await db.insert(conceptos).values(
        datos.conceptos.map(c => ({
          factura_id: nuevaFactura.id,
          ...c
        }))
      )

      // 5. Timbrar con Finkok (PAC)
      const cfdiXML = await timbrarCFDI({
        factura: nuevaFactura,
        conceptos: datos.conceptos
      })

      // 6. Actualizar con UUID + XML
      await db.update(facturas)
        .set({
          uuid: cfdiXML.uuid,
          xml_content: cfdiXML.xml,
          pdf_url: cfdiXML.pdf_url,
          status: 'timbrada',
          timbrado_at: new Date()
        })
        .where(eq(facturas.id, nuevaFactura.id))

      return {
        success: true,
        data: {
          id: nuevaFactura.id,
          uuid: cfdiXML.uuid,
          total,
          pdf_url: cfdiXML.pdf_url
        }
      }

    } catch (error) {
      console.error('Error al timbrar CFDI:', error)
      set.status = 500
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido'
      }
    }
  }, {
    body: FacturaSchema,
    detail: {
      tags: ['Facturas'],
      summary: 'Crear y timbrar CFDI 4.0',
      description: 'Genera una factura válida ante el SAT usando Finkok PAC'
    }
  })

  // GET /api/v1/facturas/:uuid/xml (Descargar XML)
  .get('/:uuid/xml', async ({ params, user, set }) => {
    if (!user) {
      set.status = 401
      return 'No autenticado'
    }

    const [factura] = await db
      .select()
      .from(facturas)
      .where(eq(facturas.uuid, params.uuid))
      .limit(1)

    if (!factura || factura.user_id !== user.id) {
      set.status = 404
      return 'Factura no encontrada'
    }

    set.headers['Content-Type'] = 'application/xml'
    set.headers['Content-Disposition'] = `attachment; filename="${params.uuid}.xml"`

    return factura.xml_content
  }, {
    detail: {
      tags: ['Facturas'],
      summary: 'Descargar XML timbrado'
    }
  })
```

---

### 3. Service Layer: Timbrado con Finkok

```typescript
// backend/src/services/finkok.ts
interface TimbrarCFDIInput {
  factura: {
    receptor_rfc: string
    receptor_nombre: string
    subtotal: number
    iva: number
    total: number
    uso_cfdi: string
    forma_pago: string
    metodo_pago: string
  }
  conceptos: Array<{
    clave_prod_serv: string
    cantidad: number
    descripcion: string
    valor_unitario: number
    importe: number
  }>
}

export async function timbrarCFDI(input: TimbrarCFDIInput) {
  // 1. Construir XML CFDI 4.0 (estructura SAT)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<cfdi:Comprobante
  xmlns:cfdi="http://www.sat.gob.mx/cfd/4"
  Version="4.0"
  Fecha="${new Date().toISOString()}"
  Folio="1"
  SubTotal="${input.factura.subtotal}"
  Total="${input.factura.total}"
  Moneda="MXN"
  TipoDeComprobante="I"
  MetodoPago="${input.factura.metodo_pago}"
  FormaPago="${input.factura.forma_pago}"
  LugarExpedicion="06000">

  <cfdi:Emisor
    Rfc="${process.env.EMPRESA_RFC}"
    Nombre="${process.env.EMPRESA_NOMBRE}"
    RegimenFiscal="601"/>

  <cfdi:Receptor
    Rfc="${input.factura.receptor_rfc}"
    Nombre="${input.factura.receptor_nombre}"
    UsoCFDI="${input.factura.uso_cfdi}"
    DomicilioFiscalReceptor="00000"
    RegimenFiscalReceptor="601"/>

  <cfdi:Conceptos>
    ${input.conceptos.map(c => `
    <cfdi:Concepto
      ClaveProdServ="${c.clave_prod_serv}"
      Cantidad="${c.cantidad}"
      ClaveUnidad="E48"
      Descripcion="${c.descripcion}"
      ValorUnitario="${c.valor_unitario}"
      Importe="${c.importe}"
      ObjetoImp="02"/>
    `).join('')}
  </cfdi:Conceptos>

  <cfdi:Impuestos
    TotalImpuestosTrasladados="${input.factura.iva}">
    <cfdi:Traslados>
      <cfdi:Traslado
        Base="${input.factura.subtotal}"
        Impuesto="002"
        TipoFactor="Tasa"
        TasaOCuota="0.160000"
        Importe="${input.factura.iva}"/>
    </cfdi:Traslados>
  </cfdi:Impuestos>

</cfdi:Comprobante>`

  // 2. Llamar a Finkok API (OnDemand)
  const response = await fetch('https://demo-facturacion.finkok.com/servicios/soap/stamp.wsdl', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/xml',
      'Authorization': `Basic ${Buffer.from(`${process.env.FINKOK_USER}:${process.env.FINKOK_PASSWORD}`).toString('base64')}`
    },
    body: `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:apps="apps.services.soap.ws.finkok.com">
        <soapenv:Body>
          <apps:stamp>
            <apps:xml>${Buffer.from(xml).toString('base64')}</apps:xml>
          </apps:stamp>
        </soapenv:Body>
      </soapenv:Envelope>
    `
  })

  const result = await response.text()

  // 3. Parsear respuesta y extraer UUID
  const uuidMatch = result.match(/UUID="([^"]+)"/)
  const uuid = uuidMatch?.[1]

  if (!uuid) {
    throw new Error('Error al timbrar: ' + result)
  }

  return {
    uuid,
    xml: result, // XML timbrado con sello SAT
    pdf_url: `https://api.tuapp.com/facturas/${uuid}/pdf` // Generar después con pdfmake
  }
}
```

---

### 4. Tests de Integración (Bun Test)

```typescript
// backend/tests/facturas.test.ts
import { describe, test, expect, beforeAll } from 'bun:test'
import { treaty } from '@elysiajs/eden'
import type { App } from '../src/index'

const client = treaty<App>('http://localhost:3000')

describe('Facturas API', () => {
  let authToken: string

  beforeAll(async () => {
    // Login para obtener token
    const { data } = await client.api.v1.auth.login.post({
      email: 'test@example.com',
      password: 'test1234'
    })
    authToken = data.token
  })

  test('GET /facturas retorna array vacío para usuario nuevo', async () => {
    const { data, status } = await client.api.v1.facturas.get({
      headers: { Authorization: `Bearer ${authToken}` }
    })

    expect(status).toBe(200)
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  test('POST /facturas crea y timbra CFDI', async () => {
    const { data, status } = await client.api.v1.facturas.post({
      headers: { Authorization: `Bearer ${authToken}` },
      body: {
        receptor_rfc: 'XAXX010101000',
        receptor_nombre: 'Cliente Test',
        uso_cfdi: 'G03',
        forma_pago: '03',
        metodo_pago: 'PUE',
        conceptos: [{
          clave_prod_serv: '01010101',
          cantidad: 1,
          unidad: 'Servicio',
          descripcion: 'Consultoría',
          valor_unitario: 1000,
          importe: 1000
        }]
      }
    })

    expect(status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.uuid).toBeDefined()
    expect(data.data.uuid).toMatch(/^[A-F0-9]{8}-[A-F0-9]{4}-4[A-F0-9]{3}-[89AB][A-F0-9]{3}-[A-F0-9]{12}$/i)
  }, { timeout: 10000 }) // Timbrado puede tardar 5-10s
})
```

**Ejecutar tests:**

```bash
# Backend tests
cd backend && bun test

# Con coverage
bun test --coverage
```

---

## 💼 Mentalidad Bootstrap: Founder como Backend Dev

### Qué puede hacer el Founder (sin experiencia previa):

1. **Aprender ElysiaJS en 1 semana:**
   - Tutorial oficial: https://elysiajs.com/quick-start.html
   - Syntax similar a Express.js pero con types nativos
   - Eden Treaty = autocomplete mágico frontend↔backend

2. **Implementar APIs CRUD básicas:**
   - Copiar estructura del ejemplo Facturas
   - Cambiar schema Zod según entidad (usuarios, productos, polizas)
   - Drizzle ORM genera queries SQL automáticas

3. **Debugging fácil:**
   - `console.log()` funciona perfecto en Bun
   - Swagger UI (`/docs`) para probar endpoints sin Postman
   - GlitchTip captura errores automáticamente

### Cuándo contratar Backend Senior ($50k-80k MXN/mes):

- ✅ **5,000+ usuarios activos** (necesitas optimización de queries)
- ✅ **Microservicios** (separar facturación, conciliación, auth)
- ✅ **Integración compleja** (Open Banking, Marketplaces, SAT automation)
- ✅ **Cumplimiento PCI-DSS** (si aceptas tarjetas de crédito)

**Hasta ese punto:** Founder + ElysiaJS + Drizzle + Copilot = suficiente.

---

## 🇲🇽 Adaptaciones México Profundo

### 1. Validación RFC Mexicano (Nativa)

```typescript
// backend/src/utils/validators.ts
export const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/
export const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/

export function validarRFC(rfc: string): boolean {
  if (!RFC_REGEX.test(rfc)) return false

  // Validar contra lista negra 69-B (importar desde seed)
  const esListaNegra = await db
    .select()
    .from(lista_69b)
    .where(eq(lista_69b.rfc, rfc))
    .limit(1)

  return esListaNegra.length === 0
}
```

### 2. Optimización para Conexiones 3G

```typescript
// backend/src/index.ts (agregar compresión)
import { compression } from 'elysia-compression'

app.use(compression({
  encoding: 'gzip',
  threshold: 1024 // Comprimir responses > 1KB
}))
```

### 3. Respuestas Optimizadas (Reducir Payloads)

```typescript
// ❌ MAL: Retornar todo el objeto (pesado)
return await db.select().from(facturas)

// ✅ BIEN: Solo campos necesarios
return await db
  .select({
    id: facturas.id,
    folio: facturas.folio,
    receptor: facturas.receptor_nombre,
    total: facturas.total,
    status: facturas.status,
    fecha: facturas.created_at
  })
  .from(facturas)
```

---

## 🔗 Referencias

- **ElysiaJS Docs:** https://elysiajs.com/
- **Bun Runtime:** https://bun.sh/docs
- **Eden Treaty:** https://elysiajs.com/eden/overview.html (Type safety end-to-end)
- **Drizzle ORM:** https://orm.drizzle.team/docs/overview
- **Better Auth:** https://better-auth.com/docs/installation
- **Finkok API:** https://wiki.finkok.com/ (Timbrado CFDI)
- **SAT Catálogos:** http://omawww.sat.gob.mx/tramitesyservicios/Paginas/documentos/catCFDI.xsd

---

## 📊 Costo Total del Perfil

| Concepto | Costo Real (Bootstrap) | Costo Tradicional |
|:---------|:-----------------------|:------------------|
| **Backend Lead Senior** | ❌ $0 (Founder aprende) | $50k-80k/mes |
| **2 Backend Devs Junior** | ❌ $0 (postergar hasta Fase 2) | $70k/mes ($35k c/u) |
| **ElysiaJS + Bun** | ✅ $0 (open-source) | $0 |
| **Drizzle ORM** | ✅ $0 (open-source) | $0 vs Prisma Cloud ($29/mes) |
| **Better Auth** | ✅ $0 (self-hosted) | $0 vs Auth0 ($35-240/mes) |
| **API Testing (Bun Test)** | ✅ $0 (built-in) | $0 vs Postman Team ($49/mes) |
| **Finkok PAC (Timbrado)** | ✅ ~$1.50/factura (OnDemand) | Mismo costo |
| **Total Mensual** | **Variable (uso)** | **$120k-170k MXN** |
| **Ahorro Anual** | - | **$1.44M-2.04M MXN/año** |

---

*Última actualización: 9 Diciembre 2025*
*Autor: Reingeniería Bootstrap + México Profundo*
