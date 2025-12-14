# 🔥 ARQUITECTURA HEXAGONAL + EVENT SOURCING (DISEÑO AVANZADO)

Este documento detalla cómo implementar Event Sourcing dentro de nuestra Arquitectura Hexagonal para garantizar trazabilidad total de las operaciones fiscales.

## 1. CONCEPTO CORE

En lugar de actualizar filas en una tabla `users` o `invoices`, nuestro sistema persistirá **Eventos de Dominio** inmutables en un `EventStore`.

### Flujo de Datos

1.  **Comando:** `TimbrarFactura(id: 123)`
2.  **Dominio:** Valida reglas -> Genera evento `FacturaTimbrada`
3.  **Event Store:** Guarda `FacturaTimbrada` en `events_table`
4.  **Proyección:** Un listener actualiza la tabla de lectura `invoices_view` (para consultas rápidas).

## 2. ESTRUCTURA DEL EVENTO

Cada evento debe contener toda la información necesaria para entender qué pasó.

```typescript
// domain/events/DomainEvent.ts
export interface DomainEvent {
  eventId: string; // UUID único del evento
  aggregateId: string; // ID de la entidad (ej. ID de Factura)
  type: string; // Nombre del evento (ej. 'INVOICE_STAMPED')
  timestamp: Date; // Cuándo ocurrió
  payload: any; // Datos relevantes (ej. UUID del timbre fiscal)
  metadata: {
    userId: string; // Quién lo provocó
    ip: string; // Desde dónde
    version: number; // Versión del esquema del evento
  };
}
```

## 3. CATÁLOGO DE EVENTOS CRÍTICOS (SAT)

| Agregado    | Evento                    | Descripción                  | Payload Clave                      |
| ----------- | ------------------------- | ---------------------------- | ---------------------------------- |
| **Auth**    | `UserLoggedIn`            | Inicio de sesión exitoso     | `session_id`, `mfa_method`         |
| **Auth**    | `SATCredentialsUploaded`  | Carga de CIEC/FIEL           | `file_hash`, `cert_expiry`         |
| **Invoice** | `InvoiceCreated`          | Factura borrador creada      | `items`, `total`, `rfc_receptor`   |
| **Invoice** | `InvoiceStamped`          | Timbrado exitoso ante SAT    | `uuid_sat`, `xml_hash`, `pac_id`   |
| **Invoice** | `InvoiceCancelled`        | Cancelación de factura       | `cancellation_reason`, `ack_sat`   |
| **Tax**     | `TaxCalculationCompleted` | Cálculo de impuestos mensual | `period`, `total_iva`, `total_isr` |

## 4. IMPLEMENTACIÓN TÉCNICA (PLACEHOLDER AVANZADO)

### 4.1 Event Store Repository

```typescript
// domain/repositories/EventStore.ts
import { DomainEvent } from "../events/DomainEvent";

export interface EventStore {
  save(event: DomainEvent): Promise<void>;
  getEventsByAggregate(aggregateId: string): Promise<DomainEvent[]>;
}
```

### 4.2 Implementación en PostgreSQL (JSONB)

Usaremos PostgreSQL con `pgvector` (ya en el stack) y columnas JSONB para flexibilidad.

```sql
-- infrastructure/persistence/schema.sql
CREATE TABLE event_store (
    event_id UUID PRIMARY KEY,
    aggregate_id UUID NOT NULL,
    type VARCHAR(100) NOT NULL,
    timestamp TIMESTAMPTZ NOT NULL,
    payload JSONB NOT NULL,
    metadata JSONB NOT NULL,
    version INT NOT NULL
);

CREATE INDEX idx_aggregate_id ON event_store(aggregate_id);
CREATE INDEX idx_type_timestamp ON event_store(type, timestamp);
```

### 4.3 Reconstrucción de Estado (Replay)

Para obtener el estado actual de una factura, no leemos una tabla, "reproducimos" sus eventos.

```typescript
// domain/aggregates/Invoice.ts
class Invoice {
  status: "DRAFT" | "STAMPED" | "CANCELLED" = "DRAFT";
  uuid?: string;

  // Aplicar eventos en orden
  apply(events: DomainEvent[]) {
    for (const event of events) {
      switch (event.type) {
        case "InvoiceStamped":
          this.status = "STAMPED";
          this.uuid = event.payload.uuid_sat;
          break;
        case "InvoiceCancelled":
          this.status = "CANCELLED";
          break;
      }
    }
  }
}
```

## 5. VENTAJAS PARA AUDITORÍA SAT

1.  **Inmutabilidad:** `UPDATE` y `DELETE` están prohibidos en el `EventStore`. Solo `INSERT`.
2.  **Evidencia:** Si el SAT cuestiona una cancelación, tenemos el evento exacto `InvoiceCancelled` con la IP, usuario y motivo, imposible de falsificar si usamos logs encadenados.
3.  **Debugging:** Si un cálculo de impuestos falla, podemos ver la secuencia exacta de eventos que llevó a ese estado.
