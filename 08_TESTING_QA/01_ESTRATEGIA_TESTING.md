# 🔬 TESTING Y QA
**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión:** 1.0  
**Fecha:** 29 Noviembre 2025

---

## 🎯 ESTRATEGIA DE TESTING

### Pirámide de Tests
```
                    ┌───────────────┐
                    │     E2E       │  10% - Cypress
                    │   (Usuario)   │
                    ├───────────────┤
                    │  Integración  │  20% - Supertest
                    │    (API)      │
                    ├───────────────┤
                    │    Unidad     │  70% - Vitest/Bun test
                    │  (Funciones)  │
                    └───────────────┘
```

---

## 📊 COBERTURA OBJETIVO

| Área | Cobertura Mínima | Cobertura Ideal |
|------|------------------|-----------------|
| Funciones críticas (auth, pagos) | 90% | 95% |
| Lógica de negocio | 80% | 90% |
| Utilidades | 70% | 85% |
| UI Components | 60% | 80% |
| **Global** | **75%** | **85%** |

---

## 🧪 TIPOS DE TESTS

### 1. Tests Unitarios
```typescript
// Ejemplo: test de cálculo de ISR
import { describe, it, expect } from 'bun:test';
import { calcularISR } from '../lib/fiscal/isr';

describe('Cálculo de ISR', () => {
  it('calcula ISR para ingresos < $10,000', () => {
    expect(calcularISR(8000, 'RESICO')).toBe(80); // 1%
  });

  it('calcula ISR para ingresos $10,001-$50,000', () => {
    expect(calcularISR(30000, 'RESICO')).toBe(330); // 1.1%
  });
});
```

### 2. Tests de Integración
```typescript
// Ejemplo: test de endpoint API
import { describe, it, expect } from 'bun:test';
import { app } from '../src/index';

describe('API /auth/login', () => {
  it('retorna token con credenciales válidas', async () => {
    const response = await app.handle(
      new Request('http://localhost/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'password123'
        }),
        headers: { 'Content-Type': 'application/json' }
      })
    );
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.token).toBeDefined();
  });
});
```

### 3. Tests E2E
```typescript
// Ejemplo: flujo de registro completo
describe('Flujo de Registro', () => {
  it('usuario puede registrarse y ver dashboard', () => {
    cy.visit('/');
    cy.get('[data-cy=cta-register]').click();
    cy.get('[data-cy=email]').type('nuevo@test.com');
    cy.get('[data-cy=password]').type('Password123!');
    cy.get('[data-cy=submit]').click();
    cy.url().should('include', '/dashboard');
    cy.get('[data-cy=welcome-message]').should('be.visible');
  });
});
```

---

## ✅ CHECKLIST PRE-RELEASE

### Funcionalidad Crítica
- [ ] Login/Logout funciona
- [ ] Registro crea usuario correctamente
- [ ] Transacciones se guardan y muestran
- [ ] Reportes generan datos correctos
- [ ] Facturación SAT conecta correctamente

### Seguridad
- [ ] No hay SQL injection
- [ ] XSS bloqueado
- [ ] CSRF tokens funcionan
- [ ] Rate limiting activo
- [ ] Datos sensibles cifrados

### Performance
- [ ] Lighthouse > 90
- [ ] API responde < 200ms
- [ ] No memory leaks
- [ ] Imágenes optimizadas

### Compatibilidad
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Mobile iOS
- [ ] Mobile Android

---

## 🔒 TESTING DE DEADLOCKS Y LOCKS EN BASE DE DATOS

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** ⏳ PENDIENTE (Agregar a suite de tests)

### ¿Qué son los Deadlocks?

Un **deadlock** ocurre cuando dos o más transacciones se bloquean mutuamente esperando recursos que la otra tiene. PostgreSQL detecta esto automáticamente y cancela una de las transacciones.

```
Transacción A                    Transacción B
─────────────                    ─────────────
LOCK tabla_1                     LOCK tabla_2
   │                                │
   │ espera tabla_2 ◄───────────────┤
   │                                │
   └───────────────────────────────► espera tabla_1
   
   ⚠️ DEADLOCK - PostgreSQL cancela una transacción
```

### Escenarios de Riesgo en Este Proyecto

| Operación | Riesgo | Mitigación |
|:----------|:-------|:-----------|
| Creación de factura + actualización de saldo | 🔴 Alto | Orden consistente de locks |
| Transferencias entre cuentas | 🔴 Alto | Lock por ID menor primero |
| Reportes concurrentes | 🟡 Medio | Read replicas / MVCC |
| Múltiples usuarios editando mismo cliente | 🟡 Medio | Optimistic locking |
| Carga masiva de transacciones | 🔴 Alto | Batch con transacciones pequeñas |

### Tests de Concurrencia

```typescript
// filepath: tests/integration/concurrency.test.ts
import { describe, it, expect } from 'bun:test';
import { db } from '$lib/server/db';
import { cuentas, transacciones } from '$lib/server/db/schema';

describe('Tests de Concurrencia y Deadlocks', () => {
  
  it('debe manejar transferencias concurrentes sin deadlock', async () => {
    const cuentaA = 'cuenta-a-id';
    const cuentaB = 'cuenta-b-id';
    const monto = 100;
    
    // Simular 10 transferencias concurrentes en ambas direcciones
    const transferencias = [];
    
    for (let i = 0; i < 5; i++) {
      // A → B
      transferencias.push(transferir(cuentaA, cuentaB, monto));
      // B → A
      transferencias.push(transferir(cuentaB, cuentaA, monto));
    }
    
    // Todas deben completarse sin deadlock
    const resultados = await Promise.allSettled(transferencias);
    
    // Verificar que no hubo errores de deadlock
    const errores = resultados.filter(r => r.status === 'rejected');
    expect(errores.length).toBe(0);
    
    // Verificar integridad de saldos
    const [saldoA, saldoB] = await Promise.all([
      getSaldo(cuentaA),
      getSaldo(cuentaB)
    ]);
    
    // Los saldos deben ser iguales al inicio (transferencias se cancelan)
    expect(saldoA + saldoB).toBe(SALDO_INICIAL_A + SALDO_INICIAL_B);
  });

  it('debe usar optimistic locking para evitar conflictos', async () => {
    const clienteId = 'cliente-test-id';
    
    // Obtener cliente con versión
    const cliente = await db.query.clientes.findFirst({
      where: eq(clientes.id, clienteId)
    });
    
    // Simular actualización concurrente
    const version = cliente.version;
    
    // Primera actualización (debe pasar)
    const resultado1 = await actualizarConVersion(clienteId, {
      nombre: 'Actualizado 1'
    }, version);
    
    // Segunda actualización con misma versión (debe fallar)
    await expect(
      actualizarConVersion(clienteId, {
        nombre: 'Actualizado 2'
      }, version)
    ).rejects.toThrow('Conflicto de versión');
  });

  it('debe manejar inserciones masivas sin bloquear lecturas', async () => {
    const batchSize = 1000;
    
    // Iniciar lectura larga
    const lecturaPromise = db.query.transacciones.findMany({
      limit: 100,
      orderBy: desc(transacciones.fecha)
    });
    
    // Insertar batch mientras la lectura está en progreso
    const insertPromise = insertarBatch(batchSize);
    
    // Ambas operaciones deben completarse en tiempo razonable
    const [lectura, insert] = await Promise.all([
      withTimeout(lecturaPromise, 5000),
      withTimeout(insertPromise, 10000)
    ]);
    
    expect(lectura.length).toBeGreaterThan(0);
    expect(insert.insertedCount).toBe(batchSize);
  });
});

// Helper: Transferencia con orden de locks consistente
async function transferir(origen: string, destino: string, monto: number) {
  // CRÍTICO: Siempre hacer lock en el mismo orden (por ID menor)
  const [primero, segundo] = [origen, destino].sort();
  
  return db.transaction(async (tx) => {
    // Lock cuenta con ID menor primero
    await tx.execute(sql`
      SELECT * FROM cuentas WHERE id = ${primero} FOR UPDATE
    `);
    await tx.execute(sql`
      SELECT * FROM cuentas WHERE id = ${segundo} FOR UPDATE
    `);
    
    // Realizar transferencia
    await tx.update(cuentas)
      .set({ saldo: sql`saldo - ${monto}` })
      .where(eq(cuentas.id, origen));
      
    await tx.update(cuentas)
      .set({ saldo: sql`saldo + ${monto}` })
      .where(eq(cuentas.id, destino));
  });
}

// Helper: Actualización con optimistic locking
async function actualizarConVersion(id: string, data: any, expectedVersion: number) {
  const result = await db.update(clientes)
    .set({ ...data, version: expectedVersion + 1 })
    .where(and(
      eq(clientes.id, id),
      eq(clientes.version, expectedVersion)
    ))
    .returning();
    
  if (result.length === 0) {
    throw new Error('Conflicto de versión - el registro fue modificado');
  }
  
  return result[0];
}
```

### Implementación de Optimistic Locking

```typescript
// filepath: src/lib/server/db/schema.ts
import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';

export const clientes = pgTable('clientes', {
  id: uuid('id').primaryKey().defaultRandom(),
  // ... otros campos
  version: integer('version').notNull().default(1),  // ← Campo de versión
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// En cada UPDATE, incrementar versión y verificar
```

```typescript
// filepath: src/lib/server/repositories/cliente.repository.ts
export class ClienteRepository {
  /**
   * Actualizar con optimistic locking
   */
  async updateWithLock(id: string, data: UpdateClienteDTO, expectedVersion: number) {
    const result = await db.update(clientes)
      .set({
        ...data,
        version: expectedVersion + 1,
        updatedAt: new Date()
      })
      .where(and(
        eq(clientes.id, id),
        eq(clientes.version, expectedVersion)
      ))
      .returning();

    if (result.length === 0) {
      // Verificar si el registro existe
      const exists = await this.findById(id);
      if (!exists) {
        throw new NotFoundError('Cliente no encontrado');
      }
      throw new ConflictError(
        'El registro fue modificado por otro usuario. Recarga y vuelve a intentar.'
      );
    }

    return result[0];
  }
}
```

### Patrones para Evitar Deadlocks

1. **Orden consistente de locks:**
   ```typescript
   // ✅ CORRECTO: Siempre lockear por ID menor primero
   const [primero, segundo] = [cuentaA, cuentaB].sort();
   await lockCuenta(primero);
   await lockCuenta(segundo);
   
   // ❌ INCORRECTO: Orden variable
   await lockCuenta(cuentaOrigen);  // Puede causar deadlock
   await lockCuenta(cuentaDestino);
   ```

2. **Transacciones cortas:**
   ```typescript
   // ✅ CORRECTO: Transacción mínima
   await db.transaction(async (tx) => {
     await tx.update(...);  // Solo lo necesario
   });
   
   // ❌ INCORRECTO: Transacción larga
   await db.transaction(async (tx) => {
     await tx.query(...);
     await fetch(externalAPI);  // ¡NO! Puede tardar segundos
     await tx.update(...);
   });
   ```

3. **SKIP LOCKED para colas:**
   ```typescript
   // Para procesar jobs sin bloquear otros workers
   const job = await db.execute(sql`
     SELECT * FROM jobs 
     WHERE status = 'pending'
     ORDER BY created_at
     LIMIT 1
     FOR UPDATE SKIP LOCKED
   `);
   ```

### Monitoreo de Locks en Producción

```sql
-- Ver locks activos
SELECT 
  pg_stat_activity.pid,
  pg_stat_activity.query,
  pg_locks.mode,
  pg_locks.granted
FROM pg_locks
JOIN pg_stat_activity ON pg_locks.pid = pg_stat_activity.pid
WHERE NOT pg_locks.granted;

-- Ver deadlocks en logs
-- En postgresql.conf: log_lock_waits = on
```

### Alerta de Deadlock en Grafana

```yaml
# Prometheus query para alertas
- alert: PostgreSQLDeadlocks
  expr: rate(pg_stat_database_deadlocks[5m]) > 0
  for: 1m
  labels:
    severity: warning
  annotations:
    summary: "Deadlocks detectados en PostgreSQL"
    description: "Se han detectado {{ $value }} deadlocks en los últimos 5 minutos"
```

---

## 🐛 REPORTE DE BUGS - TEMPLATE

```markdown
## Bug #XXX - [Título corto]

**Severidad:** 🔴 Crítico / 🟠 Alto / 🟡 Medio / 🟢 Bajo

**Ambiente:**
- Navegador: 
- SO: 
- Versión app: 

**Pasos para reproducir:**
1. 
2. 
3. 

**Resultado esperado:**


**Resultado actual:**


**Screenshots/Videos:**


**Logs relevantes:**

```

---

*Testing no es opcional, es fundamental*  
*Actualizado: 7 Diciembre 2025 - Agregada sección de Deadlocks/Locks*
