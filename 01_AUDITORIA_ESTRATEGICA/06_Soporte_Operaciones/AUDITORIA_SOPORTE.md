# 🔧 BLOQUE F: SOPORTE Y CALIDAD TOTAL

## 41. Site Reliability Engineer (SRE)

### 1. Diagnóstico Actual

Sin métricas de confiabilidad definidas.

### 2. Riesgos Críticos

- **SLA Breach:** Prometer 99.9% de uptime y no cumplirlo.

### 3. Soluciones 2026

- **SLIs/SLOs:** Definir qué es "estar arriba" (ej. endpoint `/facturar` responde en < 2s).
- **Error Budget:** Si gastamos el presupuesto de errores, congelamos deploys.

### 4. Action Items

- [ ] Configurar Prometheus para medir latencia y tasa de errores.
- [ ] Definir SLO inicial: 99.5% disponibilidad mensual.

## 42. Gestor de Licencias

### 1. Diagnóstico Actual

Uso de librerías Open Source sin auditoría.

### 2. Riesgos Críticos

- **Viralidad GPL:** Usar una librería GPLv3 obliga a liberar todo el código fuente.

### 3. Soluciones 2026

- **SCA (Software Composition Analysis):** Escanear dependencias en busca de licencias incompatibles.
- **Política:** Preferir MIT/Apache/BSD.

### 4. Action Items

- [ ] Correr auditoría de licencias en `package.json`.
- [ ] Documentar licencias de terceros en la App ("About").

## 43. Admin de Sistemas Linux

### 1. Diagnóstico Actual

Servidor Fedora mencionado.

### 2. Riesgos Críticos

- **Seguridad OS:** Puertos abiertos innecesarios, kernel desactualizado.

### 3. Soluciones 2026

- **Hardening:** Cerrar todo excepto 80/443/22 (con llave).
- **Actualizaciones Automáticas:** Parches de seguridad críticos.

### 4. Action Items

- [ ] Configurar `firewalld` o `ufw`.
- [ ] Deshabilitar login por password en SSH.

## 44. Traductor/Localización

### 1. Diagnóstico Actual

Español genérico.

### 2. Riesgos Críticos

- **Confusión:** Usar términos de España ("Albarán") en México ("Remisión").

### 3. Soluciones 2026

- **i18n:** Preparar el código para múltiples idiomas (futuro), pero centrar el copy en "Español Mexicano Fiscal".

### 4. Action Items

- [ ] Revisar glosario para asegurar consistencia (ej. siempre decir "Factura", no "Invoice").

## 45. Entrenador de IA

### 1. Diagnóstico Actual

IA sin contexto específico.

### 2. Riesgos Críticos

- **Respuestas Genéricas:** La IA respondiendo como Wikipedia, no como contador experto.

### 3. Soluciones 2026

- **Fine-tuning / Few-shot prompting:** Darle ejemplos de respuestas correctas e incorrectas.
- **Feedback Loop:** El usuario califica la respuesta de la IA.

### 4. Action Items

- [ ] Crear dataset de 50 preguntas/respuestas fiscales frecuentes para probar la IA.

## 46. Analista de Soporte Nivel 3

### 1. Diagnóstico Actual

El desarrollador es el soporte.

### 2. Riesgos Críticos

- **Burnout:** El desarrollador principal respondiendo chats a las 3 AM.

### 3. Soluciones 2026

- **Runbooks:** Guías paso a paso para resolver problemas comunes sin escalar a ingeniería.
- **Herramientas de Admin:** Panel para ver el estado de un usuario y desbloquearlo.

### 4. Action Items

- [ ] Crear Dashboard de "Super Admin" (God Mode).

## 47. Sustainability Officer (Green IT)

### 1. Diagnóstico Actual

No considerado.

### 2. Riesgos Críticos

- **Desperdicio:** Código ineficiente consume más energía (y dinero).

### 3. Soluciones 2026

- **Optimización:** Código eficiente = Menos CPU = Menos CO2.
- **Dark Mode:** Ahorra batería en pantallas OLED.

### 4. Action Items

- [ ] Medir huella de carbono del hosting (estimada).

## 48. Business Intelligence (BI)

### 1. Diagnóstico Actual

Sin dashboards internos.

### 2. Riesgos Críticos

- **Volar a ciegas:** No saber métricas clave (MRR, Churn, DAU).

### 3. Soluciones 2026

- **Metabase/Grafana:** Conectar a la réplica de lectura de la DB para visualizar KPIs.

### 4. Action Items

- [ ] Crear Dashboard Ejecutivo: Usuarios Nuevos, Facturas Emitidas, Errores.

## 49. Agile Coach

### 1. Diagnóstico Actual

Trabajo ad-hoc.

### 2. Riesgos Críticos

- **Caos:** Cambiar de prioridades cada hora.

### 3. Soluciones 2026

- **Kanban Personal:** To Do, Doing, Done.
- **Sprints:** Ciclos de 1 o 2 semanas con objetivos claros.

### 4. Action Items

- [ ] Configurar tablero en GitHub Projects o Trello.
- [ ] Definir rituales mínimos (Planning lunes, Review viernes).

## 50. El "Abogado del Diablo"

### 1. Diagnóstico Actual

Optimismo excesivo.

### 2. Riesgos Críticos

- **Sesgo de Confirmación:** Ignorar señales de que algo va mal.

### 3. Soluciones 2026

- **Cuestionamiento:** "¿Y si nadie quiere esto?", "¿Y si el SAT saca su propia app gratis y buena?".
- **Pivote:** Estar listos para cambiar el rumbo si la hipótesis falla.

### 4. Action Items

- [ ] Sesión de "Premortem" mensual: Imaginar que el proyecto fracasó y explicar por qué.
