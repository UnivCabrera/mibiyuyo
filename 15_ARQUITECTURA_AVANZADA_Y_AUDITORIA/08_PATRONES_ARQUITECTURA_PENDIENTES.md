# 🏗️ PATRONES DE ARQUITECTURA PENDIENTES DE IMPLEMENTAR

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Fecha:** Diciembre 2025  
> **Versión:** 1.0

---

## 📊 Resumen Ejecutivo

| Categoría | Cantidad | Estado |
|:----------|:---------|:-------|
| ✅ Ya implementado | 11 items | Mantener |
| ⚠️ Verificar | 5 items | Auditar |
| ❌ Por agregar | 9 items | Este documento |

---

## 🔴 PRIORIDAD ALTA (V1 - Mes 0-3)

### 1. Patrón Repository

**¿Qué es?**
Centraliza el acceso a datos en una capa dedicada, separando la lógica de negocio de las queries.

**Beneficios:**
- ✅ Testear sin tocar la DB real (mocks fáciles)
- ✅ Cambiar motor de DB sin reescribir toda la app
- ✅ Código más limpio y mantenible
- ✅ Evitar queries regadas por todo el código
- ✅ Facilita auditorías de acceso a datos

**Estructura de carpetas propuesta:**
```
src/lib/server/
├── repositories/
│   ├── base.repository.ts        # Clase base con métodos comunes
│   ├── cliente.repository.ts     # Acceso a tabla clientes
│   ├── factura.repository.ts     # Acceso a tabla facturas
│   ├── transaccion.repository.ts # Acceso a tabla transacciones
│   └── index.ts                  # Barrel export
├── services/
│   ├── cliente.service.ts        # Lógica de negocio (usa repository)
│   └── factura.service.ts
└── db/
    ├── schema.ts                 # Drizzle schema
    └── index.ts                  # Conexión DB
```

**Implementación con Drizzle ORM:**
```typescript
// filepath: src/lib/server/repositories/base.repository.ts
import { db } from '$lib/server/db';
import type { PgTable } from 'drizzle-orm/pg-core';
import { eq, and, desc, asc, sql } from 'drizzle-orm';

export abstract class BaseRepository<T extends PgTable> {
  protected table: T;
  protected db = db;

  constructor(table: T) {
    this.table = table;
  }

  async findById(id: string) {
    return this.db.query[this.table._.name as keyof typeof this.db.query]
      .findFirst({ where: eq(this.table.id, id) });
  }

  async findAll(options?: { limit?: number; offset?: number }) {
    return this.db.query[this.table._.name as keyof typeof this.db.query]
      .findMany({
        limit: options?.limit ?? 100,
        offset: options?.offset ?? 0
      });
  }

  async count() {
    const result = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(this.table);
    return result[0].count;
  }
}
```

```typescript
// filepath: src/lib/server/repositories/cliente.repository.ts
import { db } from '$lib/server/db';
import { clientes } from '$lib/server/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';
import type { CreateClienteDTO, UpdateClienteDTO } from '$lib/types/cliente';

export class ClienteRepository {
  /**
   * Buscar cliente por ID
   */
  async findById(id: string) {
    return db.query.clientes.findFirst({ 
      where: eq(clientes.id, id) 
    });
  }
  
  /**
   * Buscar cliente por RFC (único en México)
   */
  async findByRfc(rfc: string) {
    return db.query.clientes.findFirst({ 
      where: eq(clientes.rfc, rfc.toUpperCase()) 
    });
  }
  
  /**
   * Listar clientes con filtros
   */
  async findMany(filters?: {
    tenantId?: string;
    activo?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }) {
    const conditions = [];
    
    if (filters?.tenantId) {
      conditions.push(eq(clientes.tenantId, filters.tenantId));
    }
    if (filters?.activo !== undefined) {
      conditions.push(eq(clientes.activo, filters.activo));
    }
    if (filters?.search) {
      conditions.push(like(clientes.razonSocial, `%${filters.search}%`));
    }
    
    return db.query.clientes.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(clientes.createdAt)],
      limit: filters?.limit ?? 50,
      offset: filters?.offset ?? 0
    });
  }
  
  /**
   * Crear nuevo cliente
   */
  async create(data: CreateClienteDTO) {
    const [cliente] = await db.insert(clientes).values({
      ...data,
      rfc: data.rfc.toUpperCase(),
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
    return cliente;
  }
  
  /**
   * Actualizar cliente existente
   */
  async update(id: string, data: UpdateClienteDTO) {
    const [updated] = await db.update(clientes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(clientes.id, id))
      .returning();
    return updated;
  }
  
  /**
   * Eliminar cliente (soft delete)
   */
  async softDelete(id: string) {
    return this.update(id, { 
      activo: false, 
      deletedAt: new Date() 
    });
  }
  
  /**
   * Eliminar permanentemente (hard delete)
   */
  async hardDelete(id: string) {
    return db.delete(clientes).where(eq(clientes.id, id));
  }
}

// Singleton para reutilizar
export const clienteRepository = new ClienteRepository();
```

**Uso en servicios:**
```typescript
// filepath: src/lib/server/services/cliente.service.ts
import { clienteRepository } from '$lib/server/repositories/cliente.repository';
import { ValidationError, NotFoundError } from '$lib/errors';
import { validarRFC } from '$lib/utils/mexico';

export class ClienteService {
  async crearCliente(data: CreateClienteDTO) {
    // 1. Validar RFC mexicano
    if (!validarRFC(data.rfc)) {
      throw new ValidationError('RFC inválido');
    }
    
    // 2. Verificar unicidad
    const existente = await clienteRepository.findByRfc(data.rfc);
    if (existente) {
      throw new ValidationError('Ya existe un cliente con este RFC');
    }
    
    // 3. Crear (repository maneja la DB)
    return clienteRepository.create(data);
  }
  
  async obtenerCliente(id: string) {
    const cliente = await clienteRepository.findById(id);
    if (!cliente) {
      throw new NotFoundError('Cliente no encontrado');
    }
    return cliente;
  }
}
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V1 (Mes 0-3)  
**Responsable:** Equipo Backend  
**Criterio de Éxito:** Todas las consultas a DB pasan por repositories

---

### 2. Redis Pub/Sub para Tiempo Real

**¿Qué es?**
Sistema de publicación/suscripción para notificaciones en tiempo real sin polling.

**Casos de uso en el proyecto:**
- 📢 Notificaciones de nuevas facturas
- ⚠️ Alertas SAT en tiempo real
- 🔄 Sincronización multi-dispositivo
- 📊 Dashboard en vivo (métricas actualizadas)
- 💬 Chat de soporte interno

**Arquitectura:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    REDIS PUB/SUB ARCHITECTURE                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   PUBLISHERS                   REDIS                 SUBSCRIBERS   │
│   ┌─────────────┐         ┌───────────┐         ┌─────────────┐   │
│   │ API Backend │ ──pub──►│  Channel  │◄──sub── │ WebSocket   │   │
│   │ (ElysiaJS)  │         │  facturas │         │ Server      │   │
│   └─────────────┘         └───────────┘         └─────────────┘   │
│                                │                       │           │
│   ┌─────────────┐              │                       ▼           │
│   │ Workers     │         ┌───────────┐         ┌─────────────┐   │
│   │ (BullMQ)    │ ──pub──►│  Channel  │         │ Browser     │   │
│   └─────────────┘         │  alertas  │         │ (Cliente)   │   │
│                           └───────────┘         └─────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementación:**
```typescript
// filepath: src/lib/server/pubsub/redis-pubsub.ts
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// Conexión para publicar
export const publisher = new Redis(REDIS_URL);

// Conexión separada para suscribirse (Redis requiere conexiones separadas)
export const subscriber = new Redis(REDIS_URL);

// Canales disponibles
export const CHANNELS = {
  FACTURAS: 'facturas',
  ALERTAS_SAT: 'alertas:sat',
  DASHBOARD: 'dashboard:updates',
  NOTIFICACIONES: 'notificaciones'
} as const;

// Helper para publicar
export async function publish<T>(
  channel: keyof typeof CHANNELS, 
  data: T
): Promise<void> {
  const message = JSON.stringify({
    timestamp: new Date().toISOString(),
    data
  });
  await publisher.publish(CHANNELS[channel], message);
}

// Helper para suscribirse
export function subscribe(
  channel: keyof typeof CHANNELS,
  callback: (message: string) => void
): void {
  subscriber.subscribe(CHANNELS[channel]);
  subscriber.on('message', (ch, message) => {
    if (ch === CHANNELS[channel]) {
      callback(message);
    }
  });
}
```

**Uso en API (publicar evento):**
```typescript
// filepath: src/routes/api/facturas/+server.ts
import { publish } from '$lib/server/pubsub/redis-pubsub';

export async function POST({ request }) {
  const data = await request.json();
  
  // Crear factura en DB...
  const factura = await facturaService.crear(data);
  
  // Publicar evento para clientes conectados
  await publish('FACTURAS', {
    tipo: 'nueva',
    facturaId: factura.id,
    clienteId: factura.clienteId,
    monto: factura.total
  });
  
  return json({ success: true, factura });
}
```

**WebSocket handler (suscribirse):**
```typescript
// filepath: src/lib/server/websocket/handler.ts
import { subscribe } from '$lib/server/pubsub/redis-pubsub';

export function setupWebSocketHandlers(wss: WebSocketServer) {
  // Suscribirse a canal de facturas
  subscribe('FACTURAS', (message) => {
    const data = JSON.parse(message);
    
    // Enviar a todos los clientes conectados del tenant
    wss.clients.forEach((client) => {
      if (client.tenantId === data.data.clienteId) {
        client.send(message);
      }
    });
  });
  
  // Suscribirse a alertas SAT
  subscribe('ALERTAS_SAT', (message) => {
    // Broadcast a todos los admins
    wss.clients.forEach((client) => {
      if (client.role === 'admin') {
        client.send(message);
      }
    });
  });
}
```

**⚠️ Importante:** 
- Redis Pub/Sub NO guarda historial (fire-and-forget)
- Para persistencia usar **Redis Streams** (ver sección siguiente)
- Cada suscriptor necesita su propia conexión Redis

**Redis Streams (alternativa para persistencia):**
```typescript
// Para casos donde necesitas historial de eventos
await redis.xadd('stream:facturas', '*', 
  'tipo', 'nueva',
  'facturaId', factura.id,
  'timestamp', Date.now().toString()
);

// Leer últimos 10 eventos
const events = await redis.xrevrange('stream:facturas', '+', '-', 'COUNT', 10);
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V1 (Mes 0-3)  
**Dependencia:** WebSocket server configurado  
**Criterio de Éxito:** Dashboard actualiza en <100ms sin refresh

---

### 3. Wrappers para APIs Externas

**¿Qué es?**
Capa de abstracción que encapsula llamadas a APIs externas (SAT, Banxico, PAC) con:
- ⏱️ Timeouts configurables
- 🔄 Reintentos automáticos con backoff exponencial
- 💾 Fallbacks con caché
- 🚨 Manejo de errores consistente
- 📊 Métricas de disponibilidad

**Arquitectura:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                    API WRAPPER ARCHITECTURE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Tu Código         Wrapper              API Externa               │
│   ┌─────────┐      ┌───────────────┐      ┌─────────────┐         │
│   │ Service │ ───► │ ✓ Timeout     │ ───► │ SAT API     │         │
│   │         │      │ ✓ Retry       │      │ (puede caer)│         │
│   │         │ ◄─── │ ✓ Cache       │ ◄─── │             │         │
│   │         │      │ ✓ Circuit     │      └─────────────┘         │
│   │         │      │   Breaker     │                               │
│   └─────────┘      └───────────────┘                               │
│                           │                                         │
│                           ▼                                         │
│                    ┌───────────┐                                   │
│                    │  Redis    │  (Cache de respuestas)            │
│                    │  Cache    │                                   │
│                    └───────────┘                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementación base:**
```typescript
// filepath: src/lib/server/integrations/base.wrapper.ts
import Redis from 'ioredis';

interface WrapperConfig {
  name: string;
  baseUrl: string;
  timeout: number;          // ms
  retries: number;
  retryDelay: number;       // ms base (se multiplica exponencialmente)
  cacheTTL: number;         // segundos
}

interface WrapperResponse<T> {
  data: T;
  cached: boolean;
  stale: boolean;
  latency: number;
}

export abstract class BaseAPIWrapper {
  protected config: WrapperConfig;
  protected cache: Redis;
  protected circuitOpen: boolean = false;
  protected failureCount: number = 0;
  protected lastFailure: number = 0;

  constructor(config: WrapperConfig, cache: Redis) {
    this.config = config;
    this.cache = cache;
  }

  /**
   * Ejecutar request con todas las protecciones
   */
  protected async executeWithProtection<T>(
    cacheKey: string,
    fetchFn: () => Promise<T>
  ): Promise<WrapperResponse<T>> {
    const startTime = Date.now();

    // 1. Verificar Circuit Breaker
    if (this.isCircuitOpen()) {
      const cached = await this.getFromCache<T>(cacheKey);
      if (cached) {
        return { data: cached, cached: true, stale: true, latency: Date.now() - startTime };
      }
      throw new Error(`${this.config.name}: Circuit breaker abierto`);
    }

    // 2. Buscar en caché fresco
    const cached = await this.getFromCache<T>(cacheKey);
    if (cached) {
      return { data: cached, cached: true, stale: false, latency: Date.now() - startTime };
    }

    // 3. Intentar fetch con reintentos
    try {
      const data = await this.fetchWithRetry(fetchFn);
      
      // Guardar en caché
      await this.setCache(cacheKey, data);
      
      // Reset circuit breaker
      this.failureCount = 0;
      
      return { data, cached: false, stale: false, latency: Date.now() - startTime };
      
    } catch (error) {
      // Incrementar fallos
      this.failureCount++;
      this.lastFailure = Date.now();
      
      // Abrir circuito si hay muchos fallos
      if (this.failureCount >= 5) {
        this.circuitOpen = true;
        console.error(`${this.config.name}: Circuit breaker ABIERTO`);
      }

      // Intentar devolver stale cache
      const staleKey = `${cacheKey}:stale`;
      const stale = await this.getFromCache<T>(staleKey);
      if (stale) {
        return { data: stale, cached: true, stale: true, latency: Date.now() - startTime };
      }

      throw error;
    }
  }

  private async fetchWithRetry<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= this.config.retries; attempt++) {
      try {
        // Timeout
        const result = await Promise.race([
          fn(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), this.config.timeout)
          )
        ]);
        return result;
        
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < this.config.retries) {
          // Backoff exponencial
          const delay = this.config.retryDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }

  private isCircuitOpen(): boolean {
    if (!this.circuitOpen) return false;
    
    // Auto-reset después de 5 minutos
    if (Date.now() - this.lastFailure > 5 * 60 * 1000) {
      this.circuitOpen = false;
      this.failureCount = 0;
      return false;
    }
    
    return true;
  }

  private async getFromCache<T>(key: string): Promise<T | null> {
    const data = await this.cache.get(key);
    return data ? JSON.parse(data) : null;
  }

  private async setCache<T>(key: string, data: T): Promise<void> {
    const json = JSON.stringify(data);
    await this.cache.setex(key, this.config.cacheTTL, json);
    // También guardar versión stale con TTL largo
    await this.cache.setex(`${key}:stale`, this.config.cacheTTL * 10, json);
  }
}
```

**Wrapper específico para SAT:**
```typescript
// filepath: src/lib/server/integrations/sat.wrapper.ts
import { BaseAPIWrapper } from './base.wrapper';
import type Redis from 'ioredis';

interface ValidacionRFC {
  rfc: string;
  valido: boolean;
  nombre?: string;
  estatus?: 'ACTIVO' | 'CANCELADO' | 'SUSPENDIDO';
  regimen?: string;
}

export class SATWrapper extends BaseAPIWrapper {
  constructor(cache: Redis) {
    super({
      name: 'SAT',
      baseUrl: 'https://portalsat.plataforma.sat.gob.mx',
      timeout: 15000,      // SAT es lento
      retries: 3,
      retryDelay: 1000,
      cacheTTL: 86400      // 24 horas (datos fiscales cambian poco)
    }, cache);
  }

  async validarRFC(rfc: string): Promise<ValidacionRFC> {
    const rfcNormalizado = rfc.toUpperCase().trim();
    const cacheKey = `sat:rfc:${rfcNormalizado}`;

    const response = await this.executeWithProtection(cacheKey, async () => {
      // Aquí iría la llamada real al SAT
      // Por ahora simulamos con validación local
      const esValido = this.validarFormatoRFC(rfcNormalizado);
      
      return {
        rfc: rfcNormalizado,
        valido: esValido,
        // En producción esto vendría del SAT
        estatus: 'ACTIVO' as const
      };
    });

    return response.data;
  }

  async obtenerConstanciaSituacionFiscal(rfc: string): Promise<Buffer | null> {
    const cacheKey = `sat:csf:${rfc.toUpperCase()}`;

    try {
      const response = await this.executeWithProtection(cacheKey, async () => {
        // Llamada a API del SAT para obtener CSF
        // Esto requiere autenticación FIEL
        throw new Error('Requiere implementación con FIEL');
      });
      return response.data as unknown as Buffer;
    } catch {
      return null;
    }
  }

  private validarFormatoRFC(rfc: string): boolean {
    // RFC persona física: 13 caracteres
    // RFC persona moral: 12 caracteres
    const regexFisica = /^[A-ZÑ&]{4}\d{6}[A-Z0-9]{3}$/;
    const regexMoral = /^[A-ZÑ&]{3}\d{6}[A-Z0-9]{3}$/;
    return regexFisica.test(rfc) || regexMoral.test(rfc);
  }
}

// Singleton
let satWrapper: SATWrapper | null = null;

export function getSATWrapper(cache: Redis): SATWrapper {
  if (!satWrapper) {
    satWrapper = new SATWrapper(cache);
  }
  return satWrapper;
}
```

**Wrapper para PAC (Finkok):**
```typescript
// filepath: src/lib/server/integrations/finkok.wrapper.ts
import { BaseAPIWrapper } from './base.wrapper';

export class FinkokWrapper extends BaseAPIWrapper {
  constructor(cache: Redis) {
    super({
      name: 'Finkok',
      baseUrl: 'https://facturacion.finkok.com',
      timeout: 30000,      // Timbrado puede tardar
      retries: 2,
      retryDelay: 2000,
      cacheTTL: 0          // No cachear timbrado
    }, cache);
  }

  async timbrar(cfdiXML: string): Promise<TimbradoResult> {
    // NO usar caché para timbrado (cada factura es única)
    return this.executeWithProtection(`finkok:timbrar:${Date.now()}`, async () => {
      const response = await fetch(`${this.config.baseUrl}/servicios/soap/stamp`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml' },
        body: this.buildSOAPRequest(cfdiXML)
      });

      if (!response.ok) {
        throw new Error(`Finkok error: ${response.status}`);
      }

      return this.parseSOAPResponse(await response.text());
    });
  }
}
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V1 (Mes 0-3)  
**Prioridad:** Crítico para integraciones SAT/PAC  
**Criterio de Éxito:** API externa caída no afecta UX (fallback a caché)

---

## 🟡 PRIORIDAD MEDIA (V2 - Mes 3-6)

### 4. CQRS (Command Query Responsibility Segregation)

**¿Qué es?**
Separar operaciones de lectura (Query) y escritura (Command) para optimizar cada una independientemente.

**Cuándo aplicar:**
- 📊 Dashboard con muchas lecturas
- 📈 Reportes pesados que no deben bloquear escrituras
- 🔄 Operaciones de escritura que requieren consistencia fuerte
- ⚡ Necesidad de cachear lecturas agresivamente

**Implementación simplificada para el proyecto:**
```typescript
// filepath: src/lib/server/cqrs/factura.commands.ts
// COMANDOS: Modifican estado (escrituras)
export class FacturaCommands {
  private repository: FacturaRepository;
  private eventBus: EventBus;

  async crear(data: CreateFacturaDTO): Promise<Factura> {
    // Validar
    await this.validar(data);
    
    // Escribir a DB principal
    const factura = await this.repository.create(data);
    
    // Emitir evento para invalidar caché
    await this.eventBus.emit('factura:creada', { id: factura.id });
    
    return factura;
  }

  async cancelar(uuid: string, motivo: string): Promise<void> {
    await this.repository.update(uuid, { 
      estatus: 'CANCELADA',
      motivoCancelacion: motivo,
      fechaCancelacion: new Date()
    });
    
    await this.eventBus.emit('factura:cancelada', { uuid });
  }
}
```

```typescript
// filepath: src/lib/server/cqrs/factura.queries.ts
// QUERIES: Solo lecturas (pueden usar caché/réplica)
export class FacturaQueries {
  private cache: Redis;
  private db: DatabaseConnection;

  async obtenerDashboard(tenantId: string): Promise<DashboardData> {
    const cacheKey = `dashboard:${tenantId}`;
    
    // 1. Buscar en Redis
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    
    // 2. Si no hay caché, consultar DB
    const data = await this.buildDashboardData(tenantId);
    
    // 3. Guardar en caché (5 minutos)
    await this.cache.setex(cacheKey, 300, JSON.stringify(data));
    
    return data;
  }

  async buscarFacturas(filters: FacturaFilters): Promise<PaginatedResult<Factura>> {
    // Para búsquedas, podemos usar réplica de lectura
    return this.db.replica.query.facturas.findMany({
      where: this.buildWhereClause(filters),
      limit: filters.limit,
      offset: filters.offset
    });
  }

  private async buildDashboardData(tenantId: string): Promise<DashboardData> {
    const [
      totalFacturado,
      facturasPendientes,
      facturasMes,
      topClientes
    ] = await Promise.all([
      this.getTotalFacturado(tenantId),
      this.getFacturasPendientes(tenantId),
      this.getFacturasMesActual(tenantId),
      this.getTopClientes(tenantId)
    ]);

    return {
      totalFacturado,
      facturasPendientes,
      facturasMes,
      topClientes,
      generatedAt: new Date().toISOString()
    };
  }
}
```

**Invalidación de caché con eventos:**
```typescript
// filepath: src/lib/server/cqrs/cache-invalidator.ts
export class CacheInvalidator {
  constructor(
    private cache: Redis,
    private eventBus: EventBus
  ) {
    this.setupListeners();
  }

  private setupListeners() {
    // Cuando se crea factura, invalidar dashboard del tenant
    this.eventBus.on('factura:creada', async ({ tenantId }) => {
      await this.cache.del(`dashboard:${tenantId}`);
    });

    // Cuando se cancela, invalidar múltiples cachés
    this.eventBus.on('factura:cancelada', async ({ tenantId, clienteId }) => {
      await Promise.all([
        this.cache.del(`dashboard:${tenantId}`),
        this.cache.del(`cliente:${clienteId}:facturas`)
      ]);
    });
  }
}
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V2 (Mes 3-6)  
**Dependencia:** Repository Pattern implementado  
**Criterio de Éxito:** Dashboard carga en <200ms con 10k facturas

---

### 5. Sagas para Transacciones Distribuidas

**¿Qué es?**
Patrón para coordinar operaciones que afectan múltiples servicios/sistemas con compensación automática si algo falla.

**Ejemplo: Flujo de Creación de Factura CFDI**
```
1. Validar datos del cliente ─────────► Si falla → Terminar
2. Generar XML CFDI ──────────────────► Si falla → Terminar  
3. Enviar a PAC para timbrado ────────► Si falla → Rollback XML
4. Guardar en DB ─────────────────────► Si falla → Cancelar en PAC + Rollback XML
5. Enviar notificación al cliente ────► Si falla → Log (no crítico, no rollback)
```

**Implementación con patrón Saga Coreografiada:**
```typescript
// filepath: src/lib/server/sagas/factura.saga.ts
import { EventBus } from '$lib/server/events';

interface SagaContext {
  facturaId: string;
  clienteId: string;
  xmlGenerado?: string;
  uuidTimbrado?: string;
  pasoActual: string;
  errores: string[];
}

export class FacturaSaga {
  private eventBus: EventBus;
  private compensations: Map<string, (ctx: SagaContext) => Promise<void>>;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
    this.compensations = new Map();
    this.setupListeners();
    this.setupCompensations();
  }

  /**
   * Iniciar saga de creación de factura
   */
  async iniciar(data: CreateFacturaDTO): Promise<SagaContext> {
    const context: SagaContext = {
      facturaId: crypto.randomUUID(),
      clienteId: data.clienteId,
      pasoActual: 'inicio',
      errores: []
    };

    // Paso 1: Validar
    await this.eventBus.emit('saga:factura:validar', { context, data });
    
    return context;
  }

  private setupListeners() {
    // Paso 1: Validar cliente
    this.eventBus.on('saga:factura:validar', async ({ context, data }) => {
      try {
        context.pasoActual = 'validacion';
        await this.validarCliente(data.clienteId);
        await this.eventBus.emit('saga:factura:generar_xml', { context, data });
      } catch (error) {
        await this.handleError(context, error);
      }
    });

    // Paso 2: Generar XML
    this.eventBus.on('saga:factura:generar_xml', async ({ context, data }) => {
      try {
        context.pasoActual = 'generacion_xml';
        context.xmlGenerado = await this.generarXML(data);
        await this.eventBus.emit('saga:factura:timbrar', { context });
      } catch (error) {
        await this.handleError(context, error);
      }
    });

    // Paso 3: Timbrar en PAC
    this.eventBus.on('saga:factura:timbrar', async ({ context }) => {
      try {
        context.pasoActual = 'timbrado';
        const resultado = await this.timbrarEnPAC(context.xmlGenerado!);
        context.uuidTimbrado = resultado.uuid;
        await this.eventBus.emit('saga:factura:guardar', { context });
      } catch (error) {
        await this.handleError(context, error);
      }
    });

    // Paso 4: Guardar en DB
    this.eventBus.on('saga:factura:guardar', async ({ context }) => {
      try {
        context.pasoActual = 'persistencia';
        await this.guardarEnDB(context);
        await this.eventBus.emit('saga:factura:notificar', { context });
      } catch (error) {
        await this.handleError(context, error);
      }
    });

    // Paso 5: Notificar (no crítico)
    this.eventBus.on('saga:factura:notificar', async ({ context }) => {
      try {
        context.pasoActual = 'notificacion';
        await this.notificarCliente(context);
        await this.eventBus.emit('saga:factura:completada', { context });
      } catch (error) {
        // No fallar la saga por notificación
        console.error('Notificación falló (no crítico):', error);
        await this.eventBus.emit('saga:factura:completada', { context });
      }
    });
  }

  private setupCompensations() {
    // Compensación para timbrado: cancelar en PAC
    this.compensations.set('timbrado', async (ctx) => {
      if (ctx.uuidTimbrado) {
        await this.cancelarEnPAC(ctx.uuidTimbrado);
      }
    });

    // Compensación para XML: limpiar archivos temporales
    this.compensations.set('generacion_xml', async (ctx) => {
      if (ctx.xmlGenerado) {
        await this.limpiarXMLTemporal(ctx.facturaId);
      }
    });

    // Compensación para persistencia: eliminar registro
    this.compensations.set('persistencia', async (ctx) => {
      await this.eliminarFacturaDB(ctx.facturaId);
    });
  }

  private async handleError(context: SagaContext, error: unknown): Promise<void> {
    const errorMsg = error instanceof Error ? error.message : 'Error desconocido';
    context.errores.push(`${context.pasoActual}: ${errorMsg}`);

    console.error(`Saga falló en paso ${context.pasoActual}:`, error);

    // Ejecutar compensaciones en orden inverso
    const pasos = ['notificacion', 'persistencia', 'timbrado', 'generacion_xml', 'validacion'];
    const indexActual = pasos.indexOf(context.pasoActual);

    for (let i = indexActual; i < pasos.length; i++) {
      const paso = pasos[i];
      const compensacion = this.compensations.get(paso);
      if (compensacion) {
        try {
          await compensacion(context);
          console.log(`Compensación ejecutada para: ${paso}`);
        } catch (compError) {
          console.error(`Error en compensación de ${paso}:`, compError);
        }
      }
    }

    await this.eventBus.emit('saga:factura:fallida', { context });
  }
}
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V2 (Mes 3-6)  
**Complejidad:** Alta  
**Criterio de Éxito:** Timbrado fallido no deja datos huérfanos

---

### 6. Blue-Green / Canary Deployments

**¿Qué es?**
- **Blue-Green:** Dos entornos idénticos, cambio instantáneo de tráfico
- **Canary:** Despliegue gradual (10% → 50% → 100%)

**Implementación con Traefik (ya en stack):**

```yaml
# filepath: docker/traefik/dynamic/canary.yml
http:
  services:
    # Servicio con balanceo ponderado
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 90    # 90% del tráfico
          - name: app-green
            weight: 10    # 10% del tráfico (canary)

    app-blue:
      loadBalancer:
        servers:
          - url: "http://app-blue:3000"

    app-green:
      loadBalancer:
        servers:
          - url: "http://app-green:3000"

  routers:
    app-canary:
      rule: "Host(`app.profinanconta.mx`)"
      service: app-weighted
      entryPoints:
        - websecure
      tls:
        certResolver: letsencrypt
```

**Script de deployment canary:**
```bash
#!/bin/bash
# filepath: scripts/canary-deploy.sh

set -e

NEW_VERSION=$1
CANARY_PERCENTAGE=${2:-10}

echo "🚀 Iniciando Canary Deploy v${NEW_VERSION} (${CANARY_PERCENTAGE}%)"

# 1. Desplegar nueva versión como "green"
docker service update --image app:${NEW_VERSION} app-green

# 2. Esperar health check
echo "⏳ Esperando health check..."
sleep 30
curl -f http://app-green:3000/health || exit 1

# 3. Actualizar pesos en Traefik
cat > /etc/traefik/dynamic/canary.yml << EOF
http:
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: $((100 - CANARY_PERCENTAGE))
          - name: app-green
            weight: ${CANARY_PERCENTAGE}
EOF

echo "✅ Canary activo: ${CANARY_PERCENTAGE}% en v${NEW_VERSION}"
echo "📊 Monitorear métricas antes de promocionar..."
```

**Promoción completa:**
```bash
#!/bin/bash
# filepath: scripts/promote-canary.sh

echo "🎉 Promocionando canary a producción..."

# Blue ahora recibe la versión nueva
docker service update --image app:${NEW_VERSION} app-blue

# Restaurar 100% a blue
cat > /etc/traefik/dynamic/canary.yml << EOF
http:
  services:
    app-weighted:
      weighted:
        services:
          - name: app-blue
            weight: 100
          - name: app-green
            weight: 0
EOF

echo "✅ v${NEW_VERSION} ahora es producción"
```

**Estado:** ⏳ PENDIENTE  
**Fase:** V2 (Mes 6-12)  
**Dependencia:** Multi-server Dokploy  
**Criterio de Éxito:** Zero-downtime en cada deploy

---

## 🟢 PRIORIDAD BAJA (Futuro)

### 7. Sharding de Base de Datos

**¿Cuándo necesitarlo?**
- 📊 +1 millón de usuarios activos
- 💾 +100GB de datos en una tabla
- ⏱️ Queries lentas a pesar de índices y optimizaciones
- 🌍 Usuarios distribuidos geográficamente

**NO necesario actualmente.** El proyecto puede manejar 50,000+ usuarios con PostgreSQL single-node optimizado.

**Estrategia futura (si escala masiva):**
- Shard por `tenant_id` (arquitectura multi-tenant)
- Usar PostgreSQL con **Citus** (extensión nativa)
- O migrar a **Vitess** (usado por YouTube)

```sql
-- Ejemplo con Citus (cuando sea necesario)
SELECT create_distributed_table('facturas', 'tenant_id');
SELECT create_distributed_table('clientes', 'tenant_id');

-- Las queries siguen siendo SQL estándar
SELECT * FROM facturas WHERE tenant_id = 'abc123';
```

**Estado:** 📋 DOCUMENTADO (no implementar aún)  
**Fase:** V4+ (Año 2+)  
**Trigger:** Base de datos >50GB o latencia p95 >500ms

---

### 8. Service Mesh

**¿Cuándo necesitarlo?**
- 🔗 +20 microservicios independientes
- 🔒 Necesidad de mTLS entre todos los servicios
- 📊 Observabilidad a nivel de red
- 🎛️ Control de tráfico avanzado (circuit breakers a nivel infra)

**NO aplica actualmente.** El proyecto usa arquitectura modular monolítica, no microservicios.

**Si algún día se necesita:**
- **Linkerd** (ligero, fácil)
- **Istio** (potente, complejo)

**Estado:** ❌ NO APLICA  
**Razón:** Arquitectura modular, no microservicios

---

### 9. Monorepo (NX o TurboRepo)

**Contexto del archivo `ideas_encontradas.md`:**
El documento menciona monorepos como estrategia para equipos que comparten código entre múltiples proyectos.

**Estado actual del proyecto:**
- ✅ Single repo (SvelteKit fullstack)
- ✅ Frontend y Backend en mismo proyecto
- ✅ Shared types via TypeScript

**¿Necesitamos monorepo?**
**NO actualmente.** Monorepo es útil cuando:
- Tienes múltiples apps independientes (web, mobile, admin)
- Equipos separados trabajan en paralelo
- Quieres compartir librerías entre proyectos

**Si crecemos a múltiples apps:**
- **TurboRepo:** Más simple, menos opinión
- **NX:** Más estructura, mejores generadores

**Estado:** ❌ NO APLICA (por ahora)  
**Trigger:** Cuando tengamos app móvil nativa separada

---

### 10. Microfrontends

**Del análisis de `ideas_encontradas.md`:**
> "Si estás haciendo un panel administrativo, una app pequeña o un dashboard: No invoques demonios innecesarios."

**Conclusión para este proyecto:**
- ❌ **NO implementar microfrontends**
- ✅ Usar componentes Svelte modulares
- ✅ Lazy loading de rutas (ya incluido en SvelteKit)

**Razón:** Complejidad injustificada para una app de este tamaño.

---

## ✅ YA IMPLEMENTADO (Verificar Funcionamiento)

| Patrón | Ubicación | Estado | Verificar |
|:-------|:----------|:-------|:----------|
| Rate Limiting | ElysiaJS middleware | ✅ | Config en `src/middleware/` |
| Migraciones DB | Drizzle ORM | ✅ | `drizzle/migrations/` |
| Clean Architecture | Estructura carpetas | ✅ | `src/lib/server/` |
| Cache con Redis | Configurado | ✅ | `.env` y servicios |
| TypeScript Strict | tsconfig.json | ✅ | `"strict": true` |
| Validación RFC | Regex mexicano | ✅ | `src/lib/utils/mexico.ts` |
| Backups automáticos | Dokploy → S3 | ✅ | Panel Dokploy |
| SSL automático | Traefik | ✅ | Let's Encrypt |
| Health checks | `/health` endpoint | ✅ | API routes |
| Graceful shutdown | BullMQ + Elysia | ⚠️ | **VERIFICAR** |
| Circuit breakers | API Wrappers | ❌ | **PENDIENTE** |

---

## 📊 Resumen de Prioridades por Fase

```
FASE V1 (Mes 0-3):
├── 🔴 Repository Pattern ← CRÍTICO para organización
├── 🔴 Redis Pub/Sub ← CRÍTICO para tiempo real
└── 🔴 API Wrappers ← CRÍTICO para integraciones SAT/PAC

FASE V2 (Mes 3-6):
├── 🟡 CQRS simplificado ← Performance dashboards
└── 🟡 Sagas básicas ← Transacciones robustas

FASE V3 (Mes 6-12):
└── 🟡 Blue-Green/Canary ← Zero-downtime deploys

FUTURO (Año 2+):
├── 🟢 Sharding ← Solo si escala masiva
├── ❌ Service Mesh ← No aplica (no microservicios)
├── ❌ Monorepo ← No aplica (single app)
└── ❌ Microfrontends ← No aplica (overkill)
```

---

## 📝 Checklist de Implementación

### V1 - Prioridad Alta
- [ ] Crear estructura `src/lib/server/repositories/`
- [ ] Implementar `BaseRepository` con Drizzle
- [ ] Migrar queries existentes a repositories
- [ ] Configurar Redis Pub/Sub
- [ ] Crear WebSocket handler para eventos
- [ ] Implementar `BaseAPIWrapper`
- [ ] Crear wrapper para SAT
- [ ] Crear wrapper para Finkok (PAC)
- [ ] Agregar tests para wrappers

### V2 - Prioridad Media
- [ ] Separar Commands y Queries
- [ ] Implementar invalidación de caché
- [ ] Crear Saga para facturación
- [ ] Documentar compensaciones
- [ ] Configurar canary en Traefik
- [ ] Scripts de deployment gradual

---

*Última actualización: 7 Diciembre 2025*  
*Fuente: ideas_al_aire/ideas_encontradas.md*  
*Versión del documento: 1.0*
