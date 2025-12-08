# 🛡️ ESTRATEGIA DE RESILIENCIA Y CONTINUIDAD DE NEGOCIO (BCP)

## MITIGACIÓN DE RIESGO: VPS COMO PUNTO ÚNICO DE FALLO (SPOF)

**Fecha:** 1 Diciembre 2025  
**Nivel Técnico:** Avanzado / DevOps  
**Plataforma:** Dokploy (Docker Swarm)  
**Objetivo:** Garantizar RTO < 30 min y RPO < 5 min.

---

## 1. ANÁLISIS DE RIESGO Y ARQUITECTURA

Actualmente, el sistema opera en un modelo **Dokploy Single Node** sobre un VPS (Hostinger). Aunque Dokploy simplifica la gestión, el VPS sigue siendo un **Single Point of Failure (SPOF)** hasta que activemos multi-server.

| Amenaza                      | Probabilidad | Impacto | Mitigación Dokploy                        |
| ---------------------------- | ------------ | ------- | ----------------------------------------- |
| Fallo de Hardware            | Baja         | Crítico | Backups S3 automáticos + Export de config |
| Corrupción de SO             | Media        | Alto    | Reinstalar VPS + Importar Dokploy config  |
| Error Humano (rm -rf)        | Media        | Crítico | Backups incrementales en S3               |
| Ataque DDoS                  | Alta         | Medio   | Cloudflare + Rate limiting Traefik        |
| Zona de Disponibilidad Caída | Baja         | Alto    | Multi-server Swarm (Fase 2)               |

### 1.1 Definición de Objetivos de Recuperación

- **RPO (Recovery Point Objective):** Máximo 4 horas de pérdida de datos (frecuencia de backup PostgreSQL).
- **RTO (Recovery Time Objective):** Máximo 30 minutos para restablecer el servicio.

---

## 2. ESTRATEGIA DE DEFENSA EN PROFUNDIDAD (DOKPLOY)

### 2.1 Capa 1: Backups Automatizados (Nativo Dokploy)

| Componente               | Frecuencia       | Destino           | Retención |
| ------------------------ | ---------------- | ----------------- | --------- |
| PostgreSQL (dump)        | Cada 4 horas     | S3 (Backblaze B2) | 30 días   |
| Redis (RDB)              | Diario           | S3                | 14 días   |
| Volúmenes (uploads, SAT) | Diario           | S3                | 14 días   |
| Configuración Dokploy    | Semanal (manual) | S3                | 4 copias  |

**Configuración en Dokploy:**

```
Database → Settings → Backups → Enable
Destination: S3 (previamente configurado)
Frequency: Every 4 hours
Retention: 30 days
```

### 2.2 Capa 2: Export de Configuración Dokploy

Dokploy permite exportar toda la configuración (proyectos, servicios, variables de entorno) en un archivo JSON.

```bash
# Backup manual de configuración (hacer semanalmente)
# Panel → Settings → Export Configuration → Download

# Subir a S3
aws s3 cp dokploy-config-$(date +%Y%m%d).json \
  s3://profinanconta-backups/dokploy-configs/ \
  --endpoint-url=https://s3.us-west-000.backblazeb2.com
```

### 2.3 Capa 3: Multi-Server para Alta Disponibilidad (Fase 2)

Cuando activemos el segundo VPS:

```
┌─────────────────┐     ┌─────────────────┐
│   VPS Manager   │     │   VPS Worker    │
│   (Dokploy)     │◄───►│                 │
│   PostgreSQL    │     │   Frontend x2   │
│   Redis         │     │   Backend x2    │
└─────────────────┘     └─────────────────┘
        │                       │
        └───────────┬───────────┘
                    │
            Cloudflare (LB)
```

**Beneficio:** Si el Worker cae, el Manager sigue sirviendo. Si el Manager cae, los Workers continúan con la última configuración (aunque no se pueden hacer cambios hasta restaurar). 1. Endurece la seguridad (UFW, SSH, Fail2Ban). 2. Instala Docker y Docker Compose. 3. Clona el repositorio (código). 4. Descarga los últimos backups de S3. 5. Restaura la DB y volúmenes. 6. Levanta los contenedores.

- **Resultado:** Convertimos un servidor "Mascota" (Pet) en "Ganado" (Cattle). Si enferma, lo sacrificamos y levantamos otro idéntico.

### 2.3 Capa 3: Failover de DNS (Cloudflare)

Si la IP del VPS principal (A) muere, necesitamos apuntar el dominio a la IP del VPS de rescate (B) rápidamente.

- **TTL Bajo:** Configurar TTL de registros A en 60 segundos.
- **API Switch:** Script que actualiza el registro DNS en Cloudflare apuntando a la nueva IP tras el despliegue de emergencia.

---

## 3. PROTOCOLO DE RECUPERACIÓN DE DESASTRES (DRP) - DOKPLOY

**Escenario:** El VPS principal ha sido destruido o es inaccesible permanentemente.

### FASE 1: ACTIVACIÓN (Minuto 0-5)

1.  **Confirmación:** Verificar caída mediante ping externo y panel de Hostinger.
2.  **Declaración de Desastre:** El CTO/Líder técnico declara "Código Rojo".
3.  **Aprovisionamiento:**
    - Entrar a Hostinger.
    - Crear nuevo VPS (Ubuntu 24.04, 4vCPU, 16GB RAM).
    - Obtener nueva IP Pública.

### FASE 2: REINSTALACIÓN DOKPLOY (Minuto 5-10)

```bash
# SSH al nuevo VPS
ssh root@NUEVA_IP

# Instalar Dokploy (incluye Docker)
curl -sSL https://dokploy.com/install.sh | sh

# Esperar ~2-3 minutos
```

### FASE 3: RESTAURAR CONFIGURACIÓN (Minuto 10-20)

1.  Acceder al panel: `http://NUEVA_IP:3000`
2.  Crear cuenta admin (temporal)
3.  **Importar Configuración:**
    ```
    Settings → Import Configuration → Subir JSON de backup
    ```
4.  Esto recrea todos los proyectos, servicios y variables de entorno.

### FASE 4: RESTAURAR DATOS (Minuto 20-25)

1.  **PostgreSQL:**
    ```
    Database → postgres-main → Backups → Restore from S3
    Seleccionar el backup más reciente
    ```
2.  **Volúmenes:**
    ```
    Service → Volumes → Restore from Backup
    ```

### FASE 5: SWITCH DNS (Minuto 25-30)

1.  Entrar a Cloudflare.
2.  Actualizar registro A de `app.profinanconta.mx` a `NUEVA_IP`.
3.  TTL bajo (60s) permite propagación rápida.

### FASE 6: VERIFICACIÓN

```bash
# Health check
curl https://api.profinanconta.mx/health

# Verificar logs en Dokploy
Panel → Service → Logs
```

**Notificar a usuarios:** "Sistema restablecido. Algunos datos de los últimos minutos podrían requerir re-ingreso."

---

## 4. IMPLEMENTACIÓN TÉCNICA (SNIPPETS)

### 4.1 Configuración PostgreSQL para WAL Archiving

`postgresql.conf`:

```ini
wal_level = replica
archive_mode = on
archive_command = 'envdir /etc/wal-g.d/env wal-g wal-push %p'
archive_timeout = 60  # Forzar archivo cada 60s si hay poca actividad
```

### 4.2 Script de Backup de Volúmenes (Restic)

```bash
#!/bin/bash
# backup-volumes.sh
export RESTIC_REPOSITORY="s3:s3.us-west-000.backblazeb2.com/profinanconta-backups"
export RESTIC_PASSWORD_FILE="/etc/restic/password"

# Backup de carpeta SAT y Uploads
restic backup /srv/sat_credentials /srv/uploads --tag automated

# Prune (mantener últimos 7 días, 4 semanas, 6 meses)
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
```

### 4.3 Playbook Ansible (Esqueleto)

```yaml
- name: Recuperación de Desastre
  hosts: all
  become: true
  tasks:
    - name: Instalar Docker
      apt: name=docker.io state=present

    - name: Recuperar Datos
      shell: |
        export AWS_ACCESS_KEY_ID=...
        wal-g backup-fetch /var/lib/postgresql/data LATEST

    - name: Levantar Stack
      community.docker.docker_compose:
        project_src: /app
        state: present
```

---

## 5. REDIS PUB/SUB PARA TIEMPO REAL

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`  
> **Estado:** ⏳ PENDIENTE (Prioridad Alta V1)

### ¿Por Qué Redis Pub/Sub?

En lugar de que los clientes hagan polling (preguntar cada X segundos), Redis Pub/Sub permite **push notifications** instantáneas:

```
SIN PUB/SUB (polling):                    CON PUB/SUB (push):
┌────────┐                                ┌────────┐
│ Cliente│ ──► ¿hay algo nuevo? (cada 5s) │ Cliente│
│        │ ◄── no...                      │        │ ◄── ¡evento nuevo! (instantáneo)
│        │ ──► ¿hay algo nuevo?           │        │
│        │ ◄── no...                      │        │ ◄── ¡otro evento!
│        │ ──► ¿hay algo nuevo?           │        │
│        │ ◄── ¡SÍ! (finalmente)          │        │
└────────┘                                └────────┘

Latencia: 0-5 segundos                    Latencia: ~50ms
Requests: Muchos (desperdicio)            Requests: Solo cuando hay evento
```

### Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    REDIS PUB/SUB PARA TIEMPO REAL                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   PUBLISHERS                                    SUBSCRIBERS             │
│   ┌─────────────────┐                          ┌─────────────────┐     │
│   │ API Backend     │──┐                   ┌──►│ WebSocket Server│     │
│   │ (crear factura) │  │                   │   │ (broadcast)     │     │
│   └─────────────────┘  │                   │   └─────────────────┘     │
│                        │   ┌───────────┐   │           │                │
│   ┌─────────────────┐  └──►│  REDIS    │───┤           ▼                │
│   │ BullMQ Workers  │─────►│  CHANNELS │   │   ┌─────────────────┐     │
│   │ (procesar SAT)  │      │           │   │   │ Browser Users   │     │
│   └─────────────────┘      └───────────┘   │   │ (tiempo real)   │     │
│                                            │   └─────────────────┘     │
│   ┌─────────────────┐                      │                           │
│   │ Cron Jobs       │──────────────────────┘                           │
│   │ (alertas)       │                                                  │
│   └─────────────────┘                                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Canales Definidos

| Canal                     | Propósito                        | Suscriptores              |
| :------------------------ | :------------------------------- | :------------------------ |
| `facturas:{tenantId}`     | Nueva factura, cancelación       | Dashboard, notificaciones |
| `alertas:sat`             | Problemas con SAT                | Admins, dashboard         |
| `dashboard:{tenantId}`    | Métricas actualizadas            | Dashboard en vivo         |
| `notificaciones:{userId}` | Notificaciones personales        | Usuario específico        |
| `sync:{tenantId}`         | Sincronización multi-dispositivo | Todos los dispositivos    |

### Implementación

```typescript
// filepath: src/lib/server/pubsub/redis-pubsub.ts
import Redis from "ioredis";
import { REDIS_URL } from "$env/static/private";

// Conexiones separadas (Redis Pub/Sub lo requiere)
export const publisher = new Redis(REDIS_URL);
export const subscriber = new Redis(REDIS_URL);

// Tipos de eventos
export type EventType =
  | "factura:creada"
  | "factura:cancelada"
  | "alerta:sat"
  | "dashboard:update"
  | "sync:transaccion";

interface PubSubEvent<T = unknown> {
  type: EventType;
  timestamp: string;
  data: T;
}

/**
 * Publicar evento a un canal
 */
export async function publish<T>(
  channel: string,
  type: EventType,
  data: T,
): Promise<void> {
  const event: PubSubEvent<T> = {
    type,
    timestamp: new Date().toISOString(),
    data,
  };

  await publisher.publish(channel, JSON.stringify(event));

  console.log(`[PubSub] Published ${type} to ${channel}`);
}

/**
 * Suscribirse a un canal
 */
export function subscribe(
  channel: string,
  callback: (event: PubSubEvent) => void,
): () => void {
  subscriber.subscribe(channel);

  const handler = (ch: string, message: string) => {
    if (ch === channel) {
      try {
        const event = JSON.parse(message) as PubSubEvent;
        callback(event);
      } catch (error) {
        console.error("[PubSub] Failed to parse message:", error);
      }
    }
  };

  subscriber.on("message", handler);

  // Retorna función para desuscribirse
  return () => {
    subscriber.unsubscribe(channel);
    subscriber.off("message", handler);
  };
}

/**
 * Suscribirse a patrón (ej: facturas:*)
 */
export function psubscribe(
  pattern: string,
  callback: (channel: string, event: PubSubEvent) => void,
): () => void {
  subscriber.psubscribe(pattern);

  const handler = (pat: string, channel: string, message: string) => {
    if (pat === pattern) {
      try {
        const event = JSON.parse(message) as PubSubEvent;
        callback(channel, event);
      } catch (error) {
        console.error("[PubSub] Failed to parse message:", error);
      }
    }
  };

  subscriber.on("pmessage", handler);

  return () => {
    subscriber.punsubscribe(pattern);
    subscriber.off("pmessage", handler);
  };
}
```

### Uso en API (publicar evento)

```typescript
// filepath: src/routes/api/facturas/+server.ts
import { publish } from "$lib/server/pubsub/redis-pubsub";

export async function POST({ request, locals }) {
  const data = await request.json();
  const tenantId = locals.session.tenantId;

  // 1. Crear factura en DB
  const factura = await facturaService.crear(data);

  // 2. Publicar evento para clientes conectados
  await publish(`facturas:${tenantId}`, "factura:creada", {
    id: factura.id,
    numero: factura.numero,
    cliente: factura.clienteNombre,
    total: factura.total,
    uuid: factura.uuidSAT,
  });

  return json({ success: true, factura });
}
```

### WebSocket Server (suscribirse y reenviar)

```typescript
// filepath: src/lib/server/websocket/handler.ts
import { psubscribe } from "$lib/server/pubsub/redis-pubsub";
import type { WebSocketServer, WebSocket } from "ws";

interface AuthenticatedWebSocket extends WebSocket {
  tenantId: string;
  userId: string;
}

export function setupWebSocketPubSub(wss: WebSocketServer) {
  // Mapa de conexiones por tenant
  const connectionsByTenant = new Map<string, Set<AuthenticatedWebSocket>>();

  // Suscribirse a todos los canales de facturas
  psubscribe("facturas:*", (channel, event) => {
    const tenantId = channel.split(":")[1];
    const connections = connectionsByTenant.get(tenantId);

    if (connections) {
      const message = JSON.stringify({
        channel: "facturas",
        ...event,
      });

      connections.forEach((ws) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(message);
        }
      });
    }
  });

  // Suscribirse a alertas SAT (broadcast a admins)
  psubscribe("alertas:*", (channel, event) => {
    // Broadcast a todos los admins conectados
    wss.clients.forEach((ws: AuthenticatedWebSocket) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            channel: "alertas",
            ...event,
          }),
        );
      }
    });
  });

  // Manejar nuevas conexiones
  wss.on("connection", (ws: AuthenticatedWebSocket, request) => {
    const tenantId = ws.tenantId;

    // Registrar conexión
    if (!connectionsByTenant.has(tenantId)) {
      connectionsByTenant.set(tenantId, new Set());
    }
    connectionsByTenant.get(tenantId)!.add(ws);

    console.log(`[WS] Client connected: tenant=${tenantId}`);

    // Limpiar al desconectar
    ws.on("close", () => {
      connectionsByTenant.get(tenantId)?.delete(ws);
      console.log(`[WS] Client disconnected: tenant=${tenantId}`);
    });
  });
}
```

### Cliente Svelte (recibir eventos)

```svelte
<!-- filepath: src/lib/components/RealtimeProvider.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { notifications } from '$lib/stores/notifications';
  import { dashboardData } from '$lib/stores/dashboard';

  let ws: WebSocket | null = null;
  let reconnectTimeout: number;

  function connect() {
    if (!browser) return;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${window.location.host}/ws`);

    ws.onopen = () => {
      console.log('[WS] Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.channel) {
        case 'facturas':
          handleFacturaEvent(data);
          break;
        case 'alertas':
          handleAlertaEvent(data);
          break;
        case 'dashboard':
          dashboardData.invalidate();
          break;
      }
    };

    ws.onclose = () => {
      console.log('[WS] Disconnected, reconnecting in 3s...');
      reconnectTimeout = setTimeout(connect, 3000);
    };
  }

  function handleFacturaEvent(data: any) {
    if (data.type === 'factura:creada') {
      notifications.add({
        type: 'success',
        title: 'Nueva factura',
        message: `Factura ${data.data.numero} creada - $${data.data.total}`
      });
    }
  }

  function handleAlertaEvent(data: any) {
    notifications.add({
      type: 'warning',
      title: 'Alerta SAT',
      message: data.data.mensaje
    });
  }

  onMount(() => connect());

  onDestroy(() => {
    clearTimeout(reconnectTimeout);
    ws?.close();
  });
</script>

<slot />
```

### ⚠️ Limitaciones de Pub/Sub

| Característica  | Redis Pub/Sub          | Redis Streams         |
| :-------------- | :--------------------- | :-------------------- |
| Persistencia    | ❌ Fire-and-forget     | ✅ Guarda historial   |
| Reconexión      | ❌ Pierde mensajes     | ✅ Puede leer desde X |
| Consumer groups | ❌ No                  | ✅ Sí                 |
| Uso recomendado | Notificaciones en vivo | Event sourcing        |

**Recomendación:** Usar Pub/Sub para notificaciones UI. Para eventos críticos (auditoría, facturación), usar Redis Streams o PostgreSQL.

---

## 6. CDN Y ACELERACIÓN DE ASSETS

> **Fuente:** Análisis de `ideas_al_aire/ideas_encontradas.md`

### Ya Implementado con Cloudflare

El proyecto ya usa **Cloudflare** (Free Tier) como CDN:

- ✅ Caché de assets estáticos (JS, CSS, imágenes)
- ✅ Compresión automática (Brotli/Gzip)
- ✅ Minificación HTML/CSS/JS
- ✅ Protección DDoS
- ✅ SSL/TLS automático

### Configuración Recomendada

```
Cloudflare → Rules → Page Rules:

1. *.profinanconta.mx/assets/*
   - Cache Level: Cache Everything
   - Edge TTL: 1 month

2. *.profinanconta.mx/api/*
   - Cache Level: Bypass

3. *.profinanconta.mx/_app/*
   - Cache Level: Cache Everything
   - Edge TTL: 1 year (SvelteKit hashes assets)
```

---

## 7. CONCLUSIÓN

Aunque operamos en un solo VPS, esta estrategia eleva la disponibilidad del 99.0% al **99.9%** virtualmente, asegurando que ningún fallo de hardware resulte en pérdida de datos significativa.

**Costo Adicional:** ~$5 USD/mes (Almacenamiento S3/B2).
**Valor:** Supervivencia del negocio.

---

_Actualizado: 7 Diciembre 2025 - Agregadas secciones Redis Pub/Sub y CDN_
