# POLÍTICA INTERNA DE GESTIÓN DE SOLICITUDES ARCO
## Manual Operativo para el Oficial de Privacidad

**Objetivo:** Estandarizar el proceso interno para recibir, analizar y responder solicitudes de Derechos ARCO en tiempo y forma.

## 1. CANALES DE RECEPCIÓN
*   **Único Canal Oficial:** Correo electrónico `privacidad@profinanconta.mx`.
*   **Canales No Válidos:** Redes sociales, chat de soporte, teléfono (se debe redirigir al usuario al correo oficial).

## 2. FLUJO DE ATENCIÓN (SLA: 20 DÍAS HÁBILES)

### Paso 1: Recepción y Validación (Día 1-5)
*   Verificar que la solicitud contenga:
    *   Nombre del titular.
    *   Documento de identidad (INE, Pasaporte) escaneado.
    *   Descripción clara del derecho a ejercer.
*   **Si falta información:** Requerir al titular (tiene 10 días para subsanar). Si no responde, se tiene por no presentada.

### Paso 2: Análisis de Procedencia (Día 6-10)
*   **Acceso:** ¿Tenemos datos del usuario? Generar reporte de datos.
*   **Rectificación:** ¿El dato es incorrecto? Validar con la evidencia que aporte el usuario.
*   **Cancelación:** ¿Existe obligación legal de conservar el dato (ej. facturas)?
    *   *Sí:* Negar cancelación parcial (explicar bloqueo).
    *   *No:* Proceder al bloqueo.
*   **Oposición:** ¿El motivo es legítimo (ej. publicidad)? Dar de baja de listas de marketing.

### Paso 3: Ejecución Técnica (Día 11-15)
*   El DPO instruye al área técnica (CTO/Devs) mediante ticket interno.
*   **Acción:** Ejecutar script de exportación, corrección o marcado de bloqueo en la BD.
*   **Evidencia:** El área técnica entrega captura de pantalla o log de la acción realizada.

### Paso 4: Respuesta al Titular (Día 16-20)
*   Redactar respuesta formal (usar plantillas aprobadas).
*   Adjuntar evidencia de la acción o justificación legal de la negativa.
*   Enviar por correo electrónico cifrado o protegido con contraseña si contiene datos sensibles.

## 3. BITÁCORA DE SOLICITUDES
Se debe mantener un registro (Excel o Software) con:
*   Folio interno.
*   Fecha de recepción.
*   Derecho ejercido.
*   Fecha de respuesta.
*   Sentido de la respuesta (Procedente / Improcedente / Parcial).

## 4. PLANTILLAS DE RESPUESTA (EJEMPLOS)

### A) Respuesta Procedente (Cancelación)
> "Estimado [Nombre], le informamos que su solicitud de Cancelación ha sido procedente. Sus datos han entrado en periodo de bloqueo por [X] años conforme a la ley, y posteriormente serán suprimidos. Se adjunta constancia técnica del bloqueo."

### B) Respuesta Improcedente (Datos Fiscales)
> "Estimado [Nombre], respecto a su solicitud de eliminar sus facturas emitidas, le informamos que existe un impedimento legal (Art. 30 CFF) que nos obliga a conservarlas por 5 años. Por tanto, no es posible eliminarlas hasta [Fecha]. Sin embargo, hemos restringido su uso exclusivamente para fines de conservación legal."
