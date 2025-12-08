# POLÍTICA DE CONSERVACIÓN, BLOQUEO Y ELIMINACIÓN DE DATOS

**Objetivo:** Establecer los plazos de retención de datos personales y fiscales, así como el procedimiento seguro para su destrucción, cumpliendo con el CFF y la LFPDPPP.

## 1. PRINCIPIOS GENERALES
*   **Minimización:** Solo conservar lo estrictamente necesario.
*   **Limitación del Plazo:** No guardar datos "por si acaso" indefinidamente.
*   **Bloqueo:** Cuando los datos ya no son necesarios para la finalidad original pero existe una obligación legal de conservarlos, se deben "bloquear" (impedir su tratamiento ordinario).

## 2. PLAZOS DE RETENCIÓN (TABLA MAESTRA)

| Tipo de Dato | Periodo de Retención | Fundamento Legal / Operativo | Acción al Vencimiento |
|--------------|----------------------|------------------------------|-----------------------|
| **CFDI (XML/PDF)** | 5 a 10 años | Art. 30 Código Fiscal de la Federación (CFF). | Eliminación segura o anonimización estadística. |
| **Contabilidad Electrónica** | 5 a 10 años | Art. 30 CFF. | Eliminación segura. |
| **Datos de Cuenta (Usuario)** | Vigencia de contrato + 2 años | Plazo genérico de prescripción de acciones legales civiles/mercantiles. | Bloqueo y posterior eliminación. |
| **Logs de Acceso/Seguridad** | 12 meses | ISO 27001 / Mejores prácticas forenses. | Sobrescritura rotativa o archivo en frío (Glacier). |
| **Cookies / Rastreo** | 6 meses | Preferencia de privacidad del usuario. | Expiración automática. |
| **Solicitudes ARCO** | 5 años | Evidencia de cumplimiento ante INAI. | Eliminación segura. |
| **Backups de Base de Datos** | 30 días (rotativo) | Recuperación de desastres (DRP). | Sobrescritura automática. |

## 3. PROCEDIMIENTO DE BLOQUEO
Cuando un usuario cancela su cuenta o solicita la cancelación de datos (y procede):

1.  **Identificación:** Se marcan los registros en la base de datos con un flag `deleted_at` (Soft Delete) y `status = 'BLOCKED'`.
2.  **Restricción:** El sistema impide el acceso a estos datos desde la interfaz de usuario y APIs operativas. Solo el perfil "Auditor Legal" puede acceder.
3.  **Finalidad Exclusiva:** Los datos bloqueados solo se conservan para responder a requerimientos de autoridades (SAT, Jueces).

## 4. PROCEDIMIENTO DE BORRADO SEGURO (SANITIZACIÓN)
Una vez cumplido el plazo de conservación legal (ej. 10 años para fiscal):

1.  **Medios Digitales (DB/Discos):**
    *   Uso de comandos de borrado criptográfico o sobrescritura (shred/wipe) si es posible.
    *   En nube (AWS/Hostinger): Eliminación de la llave de cifrado que protege los datos (Crypto-shredding). Esto hace los datos irrecuperables instantáneamente.
2.  **Archivos Físicos (si hubiera):**
    *   Trituración cruzada de documentos.

## 5. RESPONSABILIDAD
El **CISO** es responsable de ejecutar los scripts de purga automática trimestralmente. El **DPO** audita que la purga se haya realizado conforme a esta política.
