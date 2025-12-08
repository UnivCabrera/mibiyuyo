# MECANISMOS DE CONSENTIMIENTO Y ACEPTACIÓN
## Diseño de UX Legal

Para cumplir con el principio de **Consentimiento Informado**, la plataforma debe implementar los siguientes mecanismos en la interfaz de usuario.

## 1. REGISTRO DE USUARIO (CHECKBOX OBLIGATORIO)
En el formulario de registro (`/register`), antes del botón "Crear Cuenta":

*   [ ] **He leído y acepto los [Términos y Condiciones] y el [Aviso de Privacidad].** (Obligatorio, sin pre-marcar).
*   [ ] **Acepto recibir comunicaciones promocionales.** (Opcional, sin pre-marcar).

**Backend Log:**
Al crear el usuario, guardar en la BD:
```json
{
  "privacy_policy_version": "1.0",
  "terms_version": "1.0",
  "accepted_at": "2025-11-29T10:00:00Z",
  "ip_address": "192.168.1.1"
}
```

## 2. CARGA DE CREDENCIALES SAT (CONSENTIMIENTO EXPRESO)
Dado que CIEC y FIEL son datos patrimoniales/sensibles, se requiere un refuerzo.

**Modal / Pantalla de Carga:**
> "Para sincronizar tus facturas, necesitamos usar tu Contraseña CIEC y archivos e.Firma.
>
> **IMPORTANTE:**
> *   Tus archivos se guardan cifrados.
> *   Solo se usan para conectarse al SAT en tu nombre.
> *   Puedes borrarlos en cualquier momento desde Configuración.
>
> [ ] **Autorizo expresamente el uso de mis credenciales fiscales para los fines descritos.**"

## 3. COOKIES Y RASTREO (BANNER)
Banner en la parte inferior al primer ingreso:

> "Usamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas nuestra política de cookies."
> [Aceptar] [Configurar] [Rechazar]

## 4. CAMBIOS EN EL AVISO DE PRIVACIDAD
Si cambia el Aviso de Privacidad sustancialmente:
1.  Enviar correo electrónico a todos los usuarios.
2.  Al siguiente login, mostrar pantalla bloqueante:
    > "Hemos actualizado nuestro Aviso de Privacidad. Por favor, revísalo y acéptalo para continuar."
    > [Leer Nuevo Aviso]
    > [Aceptar y Continuar]

## 5. REVOCACIÓN DEL CONSENTIMIENTO
En el panel de usuario `Configuración > Privacidad`:
*   Botón: **"Descargar mis datos (Portabilidad)"**
*   Botón: **"Eliminar cuenta y datos"** (Dispara el flujo de bloqueo/cancelación).
*   Toggle: **"Recibir newsletter"** (Opt-out fácil).
