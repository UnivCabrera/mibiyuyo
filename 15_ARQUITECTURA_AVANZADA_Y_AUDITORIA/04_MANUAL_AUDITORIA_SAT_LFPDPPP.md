# 📘 MANUAL DE AUDITORÍA (SAT + LFPDPPP)

## Guía de Cumplimiento y Evidencia para PRO_FINAN_CONTA_PYM

**Objetivo:** Proveer una guía paso a paso para demostrar cumplimiento normativo ante una inspección del SAT o del INAI (LFPDPPP).

---

## 1. INTRODUCCIÓN PARA EL AUDITOR

Este sistema ha sido diseñado bajo los principios de **Privacidad por Diseño** y **Seguridad en Profundidad**. La arquitectura garantiza la integridad, disponibilidad y confidencialidad de la información fiscal y personal.

---

## 2. CUMPLIMIENTO SAT (CÓDIGO FISCAL DE LA FEDERACIÓN)

### Requisito 1: Disponibilidad de Archivos (CIEC/FIEL)

- **Norma:** El contribuyente debe tener disponibles sus certificados y llaves para el cumplimiento de obligaciones.
- **Evidencia:**
  - Mostrar estructura de directorios `/srv/sat_credentials`.
  - Demostrar acceso de lectura exclusivo por el servicio de timbrado.
  - Mostrar logs de disponibilidad (Uptime) del servicio.

### Requisito 2: Integridad de la Información Fiscal

- **Norma:** La contabilidad electrónica no debe ser alterada.
- **Evidencia:**
  - **Event Sourcing:** Mostrar el historial de eventos de una factura aleatoria.
  - **Logs Inmutables:** Mostrar que los registros de creación/timbrado coinciden con los UUIDs del SAT.
  - **FIM (File Integrity Monitoring):** Reporte de Wazuh demostrando que los binarios de cálculo no han sido modificados.

### Requisito 3: Conservación (5 años)

- **Norma:** Art. 30 CFF.
- **Evidencia:**
  - Política de Retención en S3 (Bucket Lifecycle Policy).
  - Prueba de restauración de un backup de hace 1 año (simulada).

---

## 3. CUMPLIMIENTO LFPDPPP (DATOS PERSONALES)

### Principio de Responsabilidad

- **Evidencia:** Aviso de Privacidad Integral (firmado digitalmente por usuarios al registro).
- **Evidencia:** Nombramiento del Oficial de Privacidad (CISO/DPO).

### Medidas de Seguridad (Art. 19 LFPDPPP)

El reglamento exige medidas administrativas, físicas y técnicas.

| Tipo        | Medida Implementada                    | Evidencia Documental                               |
| ----------- | -------------------------------------- | -------------------------------------------------- |
| **Física**  | Datacenter Tier III/IV (AWS/Hostinger) | Certificados ISO 27001 del proveedor.              |
| **Técnica** | Cifrado en tránsito (TLS 1.3)          | Test SSL Labs (Grado A+).                          |
| **Técnica** | Cifrado en reposo (DB)                 | Configuración de disco cifrado (LUKS).             |
| **Admin**   | Control de Acceso (RBAC)               | Matriz de roles y permisos del sistema.            |
| **Admin**   | Capacitación                           | Registro de capacitación en seguridad al personal. |

### Gestión de Derechos ARCO

- **Procedimiento:** Mostrar el módulo de gestión de solicitudes ARCO en el panel administrativo.
- **Trazabilidad:** Mostrar log de una solicitud de "Cancelación" y cómo se ejecutó el bloqueo de datos (soft-delete).

---

## 4. CHECKLIST PRE-AUDITORÍA (SIMULACRO)

1.  [ ] **Acceso:** ¿Están revocados los accesos de ex-empleados?
2.  [ ] **Parches:** ¿El servidor tiene las últimas actualizaciones de seguridad (`apt list --upgradable`)?
3.  [ ] **Backups:** ¿El último backup se realizó correctamente y se verificó su hash?
4.  [ ] **Logs:** ¿El servidor de logs está recibiendo datos en tiempo real?
5.  [ ] **Legal:** ¿El Aviso de Privacidad en la web es la versión vigente?

---

## 5. PROCEDIMIENTO DURANTE LA INSPECCIÓN

1.  **No dar acceso root:** El auditor debe usar una cuenta de "Auditor" con permisos de solo lectura.
2.  **Acompañamiento:** Un técnico debe acompañar siempre al auditor (física o virtualmente).
3.  **Minimización:** Solo mostrar la información explícitamente solicitada.
4.  **Extracción:** Si piden copia de la BD, entregarla cifrada y mediante acta de entrega-recepción.
