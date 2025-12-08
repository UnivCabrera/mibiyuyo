# 🛡️ BLOQUE C: CIBERSEGURIDAD Y RIESGOS

## 19. CISO (Chief Info Security Officer)
### 1. Diagnóstico Actual
Seguridad básica. Falta una estrategia integral de defensa en profundidad.
### 2. Riesgos Críticos
*   **Ransomware:** Secuestro de la base de datos de los clientes.
*   **Insider Threat:** Empleados robando bases de datos de clientes.
### 3. Soluciones 2026
*   **Zero Trust:** "Nunca confiar, siempre verificar". Autenticación mutua entre microservicios (mTLS).
*   **Segregación de Deberes:** Nadie tiene acceso completo a todo.
### 4. Action Items
- [ ] Definir políticas de acceso RBAC granulares.
- [ ] Implementar escaneo de vulnerabilidades en CI/CD (Trivy).

## 20. Ethical Hacker (Red Team)
### 1. Diagnóstico Actual
El código no ha sido auditado.
### 2. Riesgos Críticos
*   **SQL Injection / XSS:** Vulnerabilidades clásicas web.
*   **IDOR (Insecure Direct Object References):** Un usuario viendo la factura de otro cambiando el ID en la URL.
### 3. Soluciones 2026
*   **Pentesting Continuo:** Pruebas automatizadas de seguridad (DAST).
*   **Bug Bounty:** (Futuro) Recompensar a quien encuentre fallos.
### 4. Action Items
- [ ] Ejecutar OWASP ZAP contra la API en entorno de staging.
- [ ] Revisar todas las rutas de API para asegurar validación de propiedad del recurso.

## 21. Gestor de Identidad (IAM)
### 1. Diagnóstico Actual
Autenticación básica.
### 2. Riesgos Críticos
*   **Robo de Credenciales:** Usuarios usando contraseñas débiles "123456".
*   **Sesiones Zombis:** Tokens JWT que no expiran o no se pueden revocar.
### 3. Soluciones 2026
*   **MFA (Multi-Factor Authentication):** Obligatorio para acciones sensibles (cambiar CLABE, descargar FIEL).
*   **Short-lived Tokens:** Access Tokens de 15 min y Refresh Tokens rotativos.
### 4. Action Items
- [ ] Implementar TOTP (Google Authenticator).
- [ ] Configurar rotación de Refresh Tokens en Redis.

## 22. Risk Manager (Pre-Mortem)
### 1. Diagnóstico Actual
No hay análisis de riesgos operativos.
### 2. Riesgos Críticos
*   **Dependencia del SAT:** Si el SAT cambia su API mañana, el sistema muere.
*   **Pérdida de Datos:** Fallo catastrófico en el servidor de base de datos.
### 3. Soluciones 2026
*   **Modo Contingencia:** Permitir captura manual si el SAT está caído.
*   **Backups 3-2-1:** 3 copias, 2 medios, 1 off-site (S3 inmutable).
### 4. Action Items
- [ ] Simular caída del servicio del SAT y verificar comportamiento de la App.
- [ ] Automatizar backups a AWS S3 con Object Lock.

## 23. Chaos Engineer
### 1. Diagnóstico Actual
Sistema frágil ante fallos inesperados.
### 2. Riesgos Críticos
*   **Cascada de Fallos:** Un servicio lento tumba toda la plataforma.
### 3. Soluciones 2026
*   **Circuit Breakers:** Si el servicio de OCR falla, cortar el acceso rápido para no saturar el sistema.
*   **Rate Limiting:** Proteger la API de abusos.
### 4. Action Items
- [ ] Implementar Circuit Breaker en llamadas a APIs externas.
- [ ] Configurar Rate Limiting en Traefik.

## 24. Crisis Manager
### 1. Diagnóstico Actual
Sin protocolo de respuesta a incidentes.
### 2. Riesgos Críticos
*   **Pánico:** Equipo paralizado ante un hackeo real.
*   **Mala Comunicación:** Ocultar el problema a los usuarios (ilegal y poco ético).
### 3. Soluciones 2026
*   **War Room Virtual:** Canal de Slack dedicado a incidentes.
*   **Templates de Comunicación:** Correos pre-redactados para notificar brechas de seguridad.
### 4. Action Items
- [ ] Redactar "Playbook de Respuesta a Incidentes".
- [ ] Definir roles durante una crisis (Comandante, Comunicador, Técnico).
