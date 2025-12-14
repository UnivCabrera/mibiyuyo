# MAPA DE RESPONSABILIDADES LEGALES Y ORGANIZACIONALES

## Gobierno de Datos Personales

Este documento define la estructura de gobernanza para el cumplimiento de la LFPDPPP, asignando roles y responsabilidades claras dentro de la organización.

### 1. COMITÉ DE PRIVACIDAD Y SEGURIDAD

Órgano máximo de decisión respecto a la protección de datos.

- **Miembros:** CEO, CTO, Asesor Legal Externo.
- **Frecuencia de Reunión:** Trimestral.
- **Responsabilidad:** Aprobar políticas, revisar incidentes graves, asignar presupuesto para seguridad.

### 2. ROLES Y RESPONSABILIDADES

| Rol                                    | Cargo / Área                 | Responsabilidades Clave (LFPDPPP)                                                                                                                |
| -------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Responsable**                        | Persona Moral (La Empresa)   | Entidad legal que decide sobre el tratamiento. Responde ante el INAI y titulares.                                                                |
| **Oficial de Privacidad (DPO)**        | Legal / Compliance           | • Atender solicitudes ARCO.<br>• Mantener actualizado el Aviso de Privacidad.<br>• Supervisar cumplimiento normativo.<br>• Enlace con el INAI.   |
| **CISO (Chief Info Security Officer)** | Tecnología / Seguridad       | • Implementar medidas de seguridad técnicas (Cifrado, Firewalls).<br>• Gestión de incidentes y brechas.<br>• Asegurar la integridad de los logs. |
| **Encargado del Tratamiento**          | Proveedores (AWS, Hostinger) | • Tratar datos solo por instrucción del Responsable.<br>• Mantener confidencialidad y seguridad.<br>• (Definido por contrato).                   |
| **Desarrolladores**                    | Ingeniería                   | • Aplicar "Privacidad por Diseño".<br>• No usar datos reales en entornos de prueba.<br>• Sanitizar logs.                                         |
| **Soporte al Cliente**                 | Operaciones                  | • Identificar solicitudes ARCO y escalarlas al DPO.<br>• No compartir datos personales por canales inseguros (WhatsApp/Chat).                    |

### 3. MATRIZ RACI (Procesos Clave)

| Proceso                             | CEO | DPO | CISO | Devs | Soporte |
| ----------------------------------- | :-: | :-: | :--: | :--: | :-----: |
| **Creación de Aviso de Privacidad** |  A  |  R  |  C   |  I   |    I    |
| **Respuesta a Solicitud ARCO**      |  I  |  R  |  C   |  C   |    I    |
| **Gestión de Brecha de Seguridad**  |  A  |  C  |  R   |  C   |    I    |
| **Alta de Nuevos Proveedores**      |  A  |  C  |  C   |  R   |    I    |
| **Eliminación Segura de Datos**     |  I  |  A  |  R   |  C   |    I    |

- **R (Responsible):** Quien hace el trabajo.
- **A (Accountable):** Quien aprueba y responde por el resultado.
- **C (Consulted):** A quien se le pregunta.
- **I (Informed):** A quien se le notifica.

### 4. PROTOCOLO DE ESCALAMIENTO DE INCIDENTES

1.  **Detección:** Cualquier empleado detecta posible vulneración.
2.  **Reporte Inmediato:** Notificar a `seguridad@profinanconta.mx` (CISO) en < 1 hora.
3.  **Evaluación:** CISO y DPO determinan si hay afectación a datos personales.
4.  **Notificación:** Si el riesgo es alto, el DPO notifica al Titular y al INAI (si aplica) en < 72 horas.
