# 🛡️ DISEÑO DE SEGURIDAD: GESTIÓN DE CREDENCIALES SAT (CIEC/FIEL)

**Fecha:** 29 Noviembre 2025  
**Clasificación:** CONFIDENCIAL / CRÍTICO  
**Contexto:** Cumplimiento Normativo SAT + Seguridad Máxima en Infraestructura

---

## 1. CARPETA EXCLUSIVA PARA CIEC/FIEL (OBLIGACIÓN SAT)

El SAT exige que ciertos archivos (CIEC/FIEL) estén disponibles para auditorías, lo que impide el cifrado en reposo tradicional que inutilizaría los archivos para los procesos de timbrado en tiempo real. Por ello, se implementa una estrategia de **Aislamiento Estricto**.

### 1.1 Ubicación y Propósito

- **Ruta del Sistema:** `/srv/sat_credentials/`
- **Propósito:** Almacenar exclusivamente archivos `.cer` y `.key` necesarios para la firma electrónica y autenticación ante el SAT.

### 1.2 Controles Obligatorios (Sin Cifrado de Contenido)

Aunque el contenido es legible para el servicio, el contenedor es una fortaleza:

1.  **Montaje con Permisos Mínimos:**
    - El volumen se monta en modo `read-only` para el contenedor de la aplicación, excepto durante la carga inicial.
2.  **Propietario Único:**
    - `chown -R sat_service:sat_group /srv/sat_credentials/`
    - Permisos: `chmod 400` (Solo lectura para el propietario, nadie más).
3.  **Aislamiento de Contenedores:**
    - No compartir este volumen con ningún otro servicio (Redis, Nginx, DB).
4.  **Ocultamiento de Rutas:**
    - Ninguna API pública debe exponer la ruta o metadatos de estos archivos.
5.  **Bloqueo de Listados:**
    - Deshabilitar `directory listing` a nivel de sistema operativo y servidor web.
6.  **Integridad Monitorizada:**
    - Cálculo automático de hashes (SHA-256) cada 5 minutos.
    - Los hashes se guardan en una base de datos externa para verificar que los archivos no han sido modificados.

---

## 2. ESTÁNDARES Y MODALIDADES APLICABLES

A falta de cifrado directo del archivo, reforzamos el perímetro con estándares internacionales.

### 2.1 Controles de Acceso

- **Principio de Mínimo Privilegio (PoLP):** Solo el proceso de timbrado tiene acceso.
- **RBAC (Role-Based Access Control):**
  - Rol `SAT-Reader`: Único rol de sistema permitido para leer.
  - Rol `Admin`: No tiene acceso directo por defecto.
- **Acceso Remoto:**
  - SSH deshabilitado para root.
  - Acceso únicamente vía llaves SSH (Ed25519).
  - Autenticación por contraseña deshabilitada.

### 2.2 Estándares de Referencia

- **ISO 27001:** Gestión de seguridad de la información (A.9 Control de acceso, A.12 Seguridad de las operaciones).
- **ISO 27002:** Controles específicos de seguridad.
- **NIST SP 800-53:** Controles de acceso (AC), Auditoría (AU), Integridad del sistema (SI).
- **OWASP DevSecOps / Docker Security Guidelines:** Prácticas seguras para contenedores.

---

## 3. REQUERIMIENTO SAT: "DISPONIBILIDAD DE LA INFORMACIÓN"

El SAT requiere disponibilidad. Nuestra solución equilibra seguridad y cumplimiento.

### 3.1 Estrategia de Aislamiento

- **Volumen Dedicado:** La carpeta reside en una partición o volumen lógico separado.
- **Cifrado de Volumen (Full Disk Encryption):** Aunque el archivo está "plano" para el SO montado, el disco físico o volumen virtual subyacente está cifrado (LUKS/dm-crypt). Si alguien roba el disco físico, no puede leer nada.
- **Acceso Humano Restringido:** Ningún operador humano tiene permisos de lectura rutinarios.

### 3.2 Redundancia Segura

- Mantener dos copias sincronizadas en ubicaciones geográficas distintas para evitar corrupción de datos, cumpliendo con la disponibilidad exigida.

---

## 4. SISTEMA DE REGISTRO INALTERABLE (AUDIT LOGS)

Objetivo: Saber quién entró, cuándo y con qué permisos, asegurando que **nadie** (ni root) pueda borrar el historial para encubrir un ataque.

### 4.1 Logs Inmutables (Linux Auditd)

- **Herramienta:** `auditd` (Linux Audit Daemon).
- **Reglas de Inmutabilidad:**
  - Configurar el flag `immutable` en la configuración de auditd al inicio del sistema. Una vez activo, requiere reinicio físico para desactivarse.
- **Protección de Archivos de Log:**
  - Uso de atributo `chattr +a` en `/var/log/audit/`.
  - Esto permite **agregar** (append) nuevos logs, pero impide **borrar** o **modificar** los existentes.

### 4.2 Doble Registro (Local + Remoto)

1.  **Log Local Inmutable:** Protegido por atributos del sistema de archivos.
2.  **Log Remoto (Log Shipping):**
    - Envío en tiempo real (vía `rsyslog` o `Fluentd`) a un servidor externo seguro (Log Server o servicio SaaS).
    - **Beneficio:** Si un atacante compromete el VPS y logra borrar los logs locales (difícil), los logs remotos ya están a salvo fuera de su alcance.

### 4.3 Eventos Registrados

- Inicios de sesión (SSH).
- Cualquier intento de acceso (lectura/escritura) a `/srv/sat_credentials/`.
- Comandos de Docker (`docker exec`, `docker run`).
- Cambios de permisos (`chmod`, `chown`).
- Comandos ejecutados por usuarios con `sudo`.
- Verificación de integridad (cambios en hashes de archivos SAT).

---

## 5. CONFIGURACIÓN DE SEGURIDAD VPS (UBUNTU + DOCKER)

Checklist de Hardening "Nivel Máximo" para la infraestructura base.

### 5.1 Endurecimiento de Ubuntu (OS Hardening)

- [ ] **Root Login:** Deshabilitado (`PermitRootLogin no` en sshd_config).
- [ ] **SSH:** Solo llaves públicas, puerto por defecto cambiado (opcional pero recomendado), Protocol 2.
- [ ] **Firewall (UFW):**
  - Política por defecto: `DENY INCOMING`.
  - Allow: Solo puertos estrictamente necesarios (ej. 443, puerto SSH personalizado).
- [ ] **Fail2Ban:** Configurado para banear IPs tras 3 intentos fallidos de SSH.
- [ ] **Actualizaciones:** `unattended-upgrades` activado para parches de seguridad críticos.
- [ ] **Usuarios:** Segregación estricta. Usuario `deploy`, usuario `admin`, usuario `sat_service`.
- [ ] **Paquetes:** Instalación mínima (Server Minimal Image).

### 5.2 Seguridad de Docker

- [ ] **Redes:** Uso de redes `bridge` internas definidas por usuario. NUNCA usar `host` network mode por defecto.
- [ ] **Exposición:** Contenedores de base de datos y backend NO exponen puertos al host (sin `-p 5432:5432`), solo se comunican por la red interna de Docker. Solo el Reverse Proxy expone 80/443.
- [ ] **Imágenes:** Uso exclusivo de imágenes oficiales o construidas internamente (firmadas).
- [ ] **Privilegios:** Bloquear flag `--privileged`.
- [ ] **User Namespaces:** Mapeo de usuarios para que `root` dentro del contenedor no sea `root` en el host.
- [ ] **Daemon:** Socket de Docker no compartido con contenedores.

### 5.3 Seguridad Específica Carpeta SAT en Docker

- [ ] **Montaje:** `read-only` (`-v /srv/sat_credentials:/app/certs:ro`).
- [ ] **Aislamiento:** Solo montado en el contenedor `backend-sat`.
- [ ] **Monitoreo:** Regla de `auditd` específica para vigilar el path del volumen.

### 5.4 Capas Adicionales (Defensa en Profundidad)

- **IDS/IPS:** Instalación de agente Wazuh o CrowdSec para detección de intrusos.
- **Protección DDoS:** Cloudflare o protección a nivel de proveedor de nube.
- **Backups Cifrados:** Copias de seguridad automáticas enviadas a almacenamiento externo cifrado.
- **Rotación de Llaves:** Política de cambio de llaves SSH cada 6 meses.
- **Malware Scan:** Escaneo semanal con `ClamAV` o similar en el sistema de archivos host.
