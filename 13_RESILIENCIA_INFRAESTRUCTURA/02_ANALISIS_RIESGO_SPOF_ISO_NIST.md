# 🛡️ ANÁLISIS TÉCNICO PROFESIONAL: VPS COMO SINGLE POINT OF FAILURE (SPOF)

## Auditoría de Riesgos de Infraestructura (Nivel ISO 27001 / NIST SP 800-53)

**Fecha:** 29 Noviembre 2025  
**Alcance:** Infraestructura Actual (Hostinger VPS Único)  
**Clasificación:** CRÍTICO  
**Referencia:** ISO 27001 (A.17), NIST SP 800-53 (CP-9, CP-10)

---

## 1. DEFINICIÓN FORMAL DEL RIESGO (SPOF)

Un **Single Point of Failure (SPOF)** se define como cualquier componente único dentro de una arquitectura crítica que, al fallar, genera la interrupción total e inmediata de la capacidad operativa del sistema.

En la arquitectura actual de **PRO_FINAN_CONTA_PYM**, la infraestructura depende exclusivamente de un solo nodo de cómputo (VPS Hostinger) que concentra de manera monolítica:

- **Orquestación:** Servicios Docker y Daemon.
- **Activos Críticos:** Carpeta `/srv/sat_credentials/` (CIEC/FIEL en texto claro).
- **Lógica de Negocio:** Backend API, Frontend SvelteKit.
- **Persistencia:** Base de datos PostgreSQL y Redis.
- **Evidencia:** Logs del sistema y auditoría (auditd).
- **Seguridad:** Gestión de identidad, firewall y certificados SSL.

**Dictamen:** La falla de este activo único implica una **catástrofe operativa**, imposibilitando la recuperación inmediata y comprometiendo la evidencia forense.

---

## 2. IMPACTO TÉCNICO EN PILARES DE SEGURIDAD

Este análisis detalla el impacto directo sobre los pilares fundamentales de la seguridad de la información y el cumplimiento normativo.

### 2.1 Disponibilidad (Pilar Crítico SAT)

El SAT obliga a la disponibilidad permanente de los servicios de facturación (24/7).

- **Vectores de Falla:** Caída del proveedor (Hostinger), corrupción de disco NVMe, error humano (sysadmin), ataque DDoS, Kernel Panic, fallo eléctrico en datacenter.
- **Consecuencia:** Inaccesibilidad inmediata a los archivos CIEC/FIEL. Al no estar disponibles para el proceso de timbrado, se incurre en **incumplimiento normativo inmediato** y cese de operaciones de facturación para los clientes.

### 2.2 Integridad

- **Escenario:** Corrupción del sistema de archivos (ext4/xfs) o intrusión.
- **Impacto:** Al existir una única instancia, no existe una "fuente de verdad" o réplica autoritativa contra la cual comparar. Si un atacante altera un binario o un log, o si el disco corrompe un sector de la DB, no hay mecanismo de verificación cruzada. La integridad de los datos financieros queda comprometida sin posibilidad de detección automática.

### 2.3 Confidencialidad (Aislamiento Fallido)

Aunque la carpeta SAT no puede cifrarse internamente por requerimiento operativo, su protección depende del perímetro.

- **Impacto:** Un solo VPS implica una única barrera de defensa. Si un atacante logra ejecución remota de código (RCE) o escalada de privilegios (Root), accede a **TODO**: base de datos, llaves SAT, código fuente y secretos. No hay segmentación lateral ni "air gaps" que contengan el daño.

### 2.4 Trazabilidad y Auditoría Forense

- **Riesgo Crítico:** Los logs inmutables (diseñados para proteger ante ataques) residen físicamente en el mismo disco que el sistema atacado.
- **Impacto:** Si el VPS es comprometido y "limpiado" (wiped) por un atacante, o si el disco falla catastróficamente, se pierde toda la evidencia forense. Esto deja a la empresa indefensa legalmente ante reclamaciones de usuarios o auditorías del SAT, ya que no se puede demostrar "quién hizo qué".

### 2.5 Cumplimiento Legal y Normativo

La arquitectura actual presenta brechas de cumplimiento en:

- **SAT:** Obligación de disponibilidad y resguardo.
- **ISO 27001 (A.17):** Continuidad del negocio (Business Continuity).
- **NIST SP 800-53 (CP-10, CP-9):** Recuperación de sistemas de información.
- **LFPDPPP / GDPR:** Garantía de integridad y disponibilidad de datos personales.

---

## 3. ESCENARIOS REALES DE FALLO (ANÁLISIS DE IMPACTO)

### 3.1 Falla Total del Proveedor (Blackout)

- **Evento:** Hostinger sufre una caída en su región o el VPS es suspendido por error de facturación/abuso.
- **Consecuencia:** Paralización total por horas o días. Pérdida de confianza del cliente y multas potenciales por no emitir facturas a tiempo.

### 3.2 Ataque de Ransomware

- **Evento:** Un atacante cifra el disco del VPS.
- **Consecuencia:** Aunque nosotros no cifremos la carpeta SAT, el atacante sí lo hará. Sin una réplica limpia y aislada (backup inmutable), la empresa queda secuestrada. No hay failover para restaurar la operación en minutos.

### 3.3 Acceso No Autorizado (Root Compromise)

- **Evento:** Robo de credenciales SSH o exploit 0-day.
- **Consecuencia:** El atacante tiene control total. Puede borrar evidencias, exfiltrar las FIEL de todos los clientes y destruir los contenedores. Sin redundancia, la recuperación del entorno íntegro es imposible.

### 3.4 Error Humano (Fat Finger)

- **Evento:** Ejecución accidental de `rm -rf` en un volumen montado o mala configuración de Docker que purga volúmenes.
- **Consecuencia:** Pérdida irreversible de datos si el backup no es reciente o también estaba montado en el mismo servidor.

---

## 4. REQUERIMIENTOS PARA ELIMINACIÓN DEL SPOF

Para mitigar estos riesgos sin violar la obligación operativa de mantener la carpeta SAT accesible, se definen los siguientes requerimientos técnicos:

### Requerimiento 1: Redundancia Física

- **Infraestructura:** Mínimo 2 VPS en proveedores o zonas de disponibilidad distintas.
- **Replicación:** Sincronización programada de la carpeta SAT (vía `rsync` sobre SSH o volúmenes distribuidos como GlusterFS/Longhorn) hacia el nodo pasivo.
- **Orquestación:** Docker Swarm o Kubernetes (K3s) para manejar la carga entre nodos.

### Requerimiento 2: Redundancia Lógica

- **Entrada:** Balanceador de Carga (Load Balancer) externo o DNS Failover (Cloudflare).
- **Desacoplamiento:** La aplicación no debe guardar estado en el contenedor (Stateless), delegando la persistencia a servicios replicados.

### Requerimiento 3: Logs Inmutables Externos

- **Arquitectura:** Envío de logs en tiempo real a un servidor dedicado y aislado (Wazuh / Elastic / Loki).
- **Política:** Retención mínima de 12 meses.
- **Seguridad:** El servidor de logs solo acepta escritura (append-only), nunca borrado, incluso con credenciales de admin del VPS principal.

### Requerimiento 4: Backups con Integridad Verificable

- **Estrategia:** Respaldo automático en volumen cifrado externo (S3/B2).
- **Legalidad:** El backup sí puede y debe ir cifrado (AES-256), ya que es para recuperación, no para operación en vivo.
- **Verificación:** Hash automático (SHA-256) post-backup para asegurar que no hubo corrupción.

---

## 5. ARQUITECTURA OBJETIVO RECOMENDADA

```mermaid
graph TD
    User[Usuario / Cliente] --> LB[Load Balancer / Cloudflare DNS]

    subgraph "Zona A (Producción)"
        LB --> VPS_A[VPS A - Hostinger]
        VPS_A --> DockerA[Docker + App]
        VPS_A --> SAT_A[Carpeta SAT (Texto Claro)]
    end

    subgraph "Zona B (Failover / DR)"
        LB -.-> VPS_B[VPS B - AWS/DigitalOcean]
        VPS_B --> DockerB[Docker + App]
        VPS_B --> SAT_B[Réplica SAT]
    end

    subgraph "Zona C (Auditoría y Seguridad)"
        VPS_A -- Logs --> LogServer[Servidor Logs Inmutables]
        VPS_B -- Logs --> LogServer
        LogServer --> Wazuh[Wazuh / ELK]
    end

    SAT_A -- Sync Segura --> SAT_B
```

---

## 6. CONCLUSIÓN Y RECOMENDACIÓN FORMAL

El uso de un **VPS Único** para un sistema que gestiona credenciales fiscales (CIEC/FIEL) y datos sensibles bajo LFPDPPP es **TÉCNICAMENTE INACEPTABLE** para un entorno de producción definitivo.

Si bien la estrategia de "Rehidratación Rápida" (documentada en `01_ESTRATEGIA_ANTI_FALLOS_VPS.md`) mitiga el riesgo en la etapa de MVP/Startup, la evolución hacia la arquitectura redundante descrita en este documento es **obligatoria** antes de escalar la base de usuarios, para garantizar la supervivencia legal y operativa de la empresa.

**Se recomienda proceder inmediatamente con:**

1.  Implementación de Backups Externos (Inmediato).
2.  Configuración de Logs Remotos (Corto Plazo).
3.  Planificación de Infraestructura Redundante (Mediano Plazo).
