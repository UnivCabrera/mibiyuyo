# 🔒 DISEÑO DE SISTEMA DE LOGS INMUTABLES (WORM)

## Trazabilidad Forense para Cumplimiento SAT y LFPDPPP

Este diseño asegura que **nadie**, ni siquiera un administrador con acceso root al VPS principal, pueda borrar o modificar la evidencia histórica de las operaciones.

---

## 1. ARQUITECTURA DE LOGGING CENTRALIZADO

Utilizaremos el stack **PLG (Promtail + Loki + Grafana)** o **Wazuh** (SIEM). Para este proyecto, recomendamos **Wazuh** por sus capacidades de seguridad y cumplimiento normativo pre-configuradas.

### Componentes

1.  **Agente (VPS Producción):** `Wazuh Agent` o `Promtail`. Lee logs locales (`/var/log/audit/audit.log`, logs de Docker).
2.  **Transporte Seguro:** Túnel TLS mutuo (mTLS) hacia el servidor de logs.
3.  **Servidor de Logs (VPS Aislado):** Instancia separada que recibe, indexa y almacena.
4.  **Almacenamiento WORM (Write Once, Read Many):** Configuración de retención que impide borrado.

## 2. FLUJO DE INMUTABILIDAD

```mermaid
graph LR
    App[Aplicación] -->|JSON Log| Stdout[Docker Stdout]
    Stdout -->|Lee| Agent[Wazuh Agent]
    Agent -->|Envía (TLS)| Server[Wazuh Server (VPS Externo)]
    Server -->|Escribe| Index[Elasticsearch / Indexer]
    Server -->|Respalda| S3[S3 Bucket (Object Lock)]
```

### 2.1 Protección en Origen (VPS Producción)

- **Auditd Inmutable:** Configuración del kernel para impedir desactivar la auditoría sin reinicio.
- **Logs Append-Only:** `chattr +a /var/log/audit/audit.log`.

### 2.2 Protección en Destino (VPS Logs / S3)

- **S3 Object Lock:** Configuramos un bucket S3 con "Object Lock" en modo "Compliance". Esto significa que **ni siquiera el dueño de la cuenta de AWS** puede borrar los logs antes del periodo de retención (ej. 5 años para fiscal).

## 3. IMPLEMENTACIÓN TÉCNICA (WAZUH)

### 3.1 Configuración del Agente (`ossec.conf`)

```xml
<localfile>
  <log_format>audit</log_format>
  <location>/var/log/audit/audit.log</location>
</localfile>

<localfile>
  <log_format>syslog</log_format>
  <location>/var/log/syslog</location>
</localfile>

<!-- Monitoreo de Integridad de Archivos (FIM) -->
<syscheck>
  <directories check_all="yes" realtime="yes">/srv/sat_credentials</directories>
  <directories check_all="yes" realtime="yes">/etc/docker</directories>
</syscheck>
```

### 3.2 Alertas de Seguridad (Reglas Personalizadas)

Wazuh generará alertas inmediatas ante eventos críticos:

- **Regla 1001:** Acceso a carpeta SAT por usuario no autorizado.
- **Regla 1002:** Fallo de integridad (hash cambiado) en binarios del sistema.
- **Regla 1003:** Intento de borrado de logs (`rm`, `truncate`).

## 4. ENCADENAMIENTO DE HASHES (BLOCKCHAIN-LIKE)

Para garantizar que no se eliminaron líneas intermedias en el log:

1.  Cada entrada de log incluye el hash de la entrada anterior.
2.  `Hash(N) = SHA256(Log(N) + Hash(N-1))`
3.  Si alguien borra el Log N, la cadena se rompe y la verificación falla.

## 5. BENEFICIO PARA AUDITORÍA

Cuando el auditor pregunte: _"¿Cómo sé que no borraste el acceso indebido del día 12?"_
Respuesta: _"Los logs se replican en tiempo real a un almacenamiento inmutable (S3 Compliance Mode) y están encadenados criptográficamente. Aquí está el reporte de integridad del periodo."_
