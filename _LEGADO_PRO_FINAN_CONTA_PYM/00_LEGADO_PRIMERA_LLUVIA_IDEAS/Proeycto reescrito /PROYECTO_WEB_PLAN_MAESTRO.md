# PROYECTO: APLICACIÓN WEB DE FINANZAS PERSONALES PARA MÉXICO

## ACTUALIZACIÓN: ANÁLISIS DE CARACTERÍSTICAS GLOBALES Y SU INTEGRACIÓN AL PROYECTO

### ANÁLISIS DE 70+ CARACTERÍSTICAS DE APPS DE FINANZAS PERSONALES GLOBALES

Esta sección integra las características identificadas en el mercado global de apps de finanzas personales, clasificándolas por su relevancia para el proyecto México 2026 y su nivel de innovación.

---

## I. GESTIÓN Y REGISTRO DE TRANSACCIONES (13 CARACTERÍSTICAS)

### CARACTERÍSTICAS PRESENTES EN EL PROYECTO ✅

**1. Registro de Ingresos** (RF-001 a RF-003)

- Estado: ✅ IMPLEMENTADO
- Prioridad: PMV (Mes 0-3)
- Integración: Módulo de transacciones con soporte multi-atributo

**2. Registro de Gastos** (RF-001 a RF-003)

- Estado: ✅ IMPLEMENTADO
- Prioridad: PMV (Mes 0-3)
- Diferenciador: Incluye validación RFC y categorización inteligente

**3. Clasificación por Categorías** (RF-041 a RF-048)

- Estado: ✅ IMPLEMENTADO MEJORADO
- Innovación México: Categorías predeterminadas adaptadas a fiscalidad mexicana
- Feature único: Categorías con indicador de "deducible fiscalmente"

**4. Subcategorías Detalladas** (RF-043)

- Estado: ✅ IMPLEMENTADO
- Capacidad: 3 niveles de profundidad (padre-hijo-nieto)

**5. Etiquetas/Tags Personalizados** (RF-049 a RF-050)

- Estado: ✅ IMPLEMENTADO
- Límite: 100 etiquetas por usuario

**6. Adición de Notas** (RF-051 a RF-058)

- Estado: ✅ IMPLEMENTADO
- Feature adicional: Notas privadas que no aparecen en reportes compartidos

**7. Captura Digital de Recibos/Facturas** (RF-056 a RF-057)

- Estado: ✅ IMPLEMENTADO CON OCR
- Diferenciador México: Integración con XML CFDI (no solo foto)
- Tecnología: OCR + validación SAT

**8. Selección de Fecha y Hora** (RF-051 a RF-068)

- Estado: ✅ IMPLEMENTADO
- Validación: No permite fechas futuras (excepto transacciones programadas)

**9. Ubicación Geográfica** (Parcialmente implementado)

- Estado: ⚠️ FASE 2 (Mes 6-12)
- Razón: No crítico para PMV, útil para análisis de patrones

**10. Múltiples Cuentas** (RF-031 a RF-040)

- Estado: ✅ IMPLEMENTADO
- Tipos soportados: Efectivo, Banco, Inversión, Cripto, Tarjeta Crédito, Ahorro
- Límite: 50 cuentas por usuario

**11. Transacciones Recurrentes** (RF-059 a RF-061)

- Estado: ✅ IMPLEMENTADO
- Frecuencias: Diaria, Semanal, Quincenal, Mensual, Anual
- Motor: pg-boss (job scheduler)

**12. Divisas Múltiples** (RF-025, RF-152)

- Estado: ✅ IMPLEMENTADO
- Monedas: MXN (principal), USD, EUR
- Feature: Actualización diaria de tipos de cambio (API)

**13. Transferencias Internas** (RF-054 a RF-055)

- Estado: ✅ IMPLEMENTADO
- Validación: Cuenta origen ≠ cuenta destino
- Contabilidad: No afecta balance total (neutral)

---

## II. INTEGRACIÓN Y AUTOMATIZACIÓN (5 CARACTERÍSTICAS)

### CARACTERÍSTICAS IMPLEMENTADAS/EN ROADMAP

**14. Sincronización Bancaria Segura**

- Estado: ⚠️ FASE 2 (Mes 3-6) - PoC Open Banking
- Proveedor: Belvo/Finerio (evaluación en curso)
- Target inicial: 3-5 bancos principales (BBVA, Santander, Banorte)
- Nota: Esta es una de las mayores diferenciaciones competitivas para México

**15. Clasificación Automática de Movimientos**

- Estado: ✅ IMPLEMENTADO (Reglas) + 🔄 IA (Fase 2)
- PMV: Motor de reglas definidas por usuario
- V+: IA con sugerencias explicables (confidence score)
- Feature único: Aprende de conciliaciones manuales del usuario

**16. Actualización Automática de Saldos**

- Estado: ✅ IMPLEMENTADO
- Tecnología: Triggers PostgreSQL + caché Redis (TTL 5 min)
- Performance: Balance recalculado en <50ms

**17. Conciliación de Transacciones**

- Estado: ✅ IMPLEMENTADO (Motor de reglas) + 🔄 IA (Fase 2)
- Diferenciador crítico: Conciliación factura PPD vs movimiento bancario
- Feature México: Generación automática de Complemento de Pagos (REP)

**18. Detección de Transacciones Duplicadas**

- Estado: ✅ IMPLEMENTADO
- Algoritmo: Mismo monto + fecha ± 1 día + cuenta
- Durante: Importación CSV y sincronización bancaria

---

## III. PRESUPUESTACIÓN Y CONTROL (8 CARACTERÍSTICAS)

### TODAS LAS CARACTERÍSTICAS IMPLEMENTADAS ✅

**19. Creación de Presupuestos Personalizados** (RF-081 a RF-082)

- Estado: ✅ IMPLEMENTADO
- Tipos: Por categoría (mensual, trimestral, anual) + global

**20. Seguimiento del Progreso del Presupuesto** (RF-082 a RF-083)

- Estado: ✅ IMPLEMENTADO
- UI: Barra de progreso visual (verde <80%, amarillo 80-100%, rojo >100%)

**21. Alertas de Presupuesto** (RF-084 a RF-085)

- Estado: ✅ IMPLEMENTADO
- Triggers: 80% (warning) y 100% (excedido)
- Canales: Email + notificaciones in-app

**22. Presupuestos Flexibles (Rolling Budgets)** (RF-086)

- Estado: ✅ IMPLEMENTADO
- Feature: Sobrante se "rueda" al siguiente periodo

**23. Presupuesto Base Cero (Zero-Based Budgeting)**

- Estado: ❌ NO IMPLEMENTADO
- Razón: Complejidad vs beneficio en PMV
- Consideración: Fase 3 (Mes 12+) si hay demanda

**24. Análisis de Hábitos de Consumo** (RF-078 a RF-080)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Promedios por categoría, día semana, mes
  - Detección de anomalías (outliers >2σ)
  - Tendencias mes vs mes anterior

**25. Cálculo de Flujo de Efectivo (Cash Flow)** (RF-146)

- Estado: ✅ IMPLEMENTADO
- Reportes: Ingresos, egresos, balance neto por periodo
- Feature empresarial: Proyección 3-6-12 meses (Fase 2)

**26. Control de Gastos Variables/Fijos** (RF-059 a RF-061)

- Estado: ✅ IMPLEMENTADO VÍA RECURRENTES
- Identificación: Transacciones recurrentes = gastos fijos
- Análisis: Dashboard muestra distribución fijos vs variables

---

## IV. VISUALIZACIÓN Y REPORTES (7 CARACTERÍSTICAS)

### TODAS IMPLEMENTADAS ✅

**27. Interfaz Clara e Intuitiva**

- Estado: ✅ DISEÑO DEFINIDO
- Framework: Nuxt 3 + SCSS (metodología BEM)
- Principio: Mobile-first, responsive

**28. Pantalla Ilustrativa/Gráficos** (RF-127 a RF-130)

- Estado: ✅ IMPLEMENTADO
- Tipos:
  - Evolución de balance (línea temporal)
  - Distribución gastos (pie chart con drill-down)
  - Ingresos vs egresos (barras agrupadas)

**29. Informes Detallados** (RF-131 a RF-139)

- Estado: ✅ IMPLEMENTADO
- Tipos de reportes:
  - Mensual automático (resumen ejecutivo + gráficas)
  - Personalizado (selección periodo/cuentas/categorías)
  - Flujo de caja
  - Comparativa año anterior (YoY)
  - Fiscal simplificado (preparación SAT)

**30. Exportación de Datos** (RF-133 a RF-135)

- Estado: ✅ IMPLEMENTADO
- Formatos: CSV, Excel, PDF
- Feature: Marca de agua personalizable en PDFs

**31. Resúmenes Mensuales/Semanales** (RF-148)

- Estado: ✅ IMPLEMENTADO
- Automatización: Email opt-in (configurable por usuario)

**32. Dashboard Personalizable**

- Estado: ⚠️ FASE 2 (Mes 3-6)
- PMV: Dashboard predefinido con KPIs estándar
- V+: Widgets arrastrables, selección de KPIs

**33. Análisis de Tendencias a Largo Plazo** (RF-136 a RF-137)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Comparación mes actual vs mismo mes año anterior
  - Identificación de estacionalidad (ej. gastos altos en diciembre)

---

## V. AHORRO Y METAS (6 CARACTERÍSTICAS)

### TODAS IMPLEMENTADAS ✅

**34. Establecimiento de Metas de Ahorro** (RF-091 a RF-092)

- Estado: ✅ IMPLEMENTADO
- Atributos: Nombre, monto objetivo, fecha límite, cuenta destino

**35. Seguimiento del Progreso de Metas** (RF-093 a RF-094)

- Estado: ✅ IMPLEMENTADO
- UI: Barra visual + porcentaje + proyección de cumplimiento

**36. Herramientas de Ahorro Automático** (RF-096 a RF-097)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Aportes manuales desde cualquier cuenta
  - Aportes automáticos (X% de ingresos)

**37. Redondeo de Compras**

- Estado: ❌ FASE 3 (Requiere integración bancaria avanzada)
- Alternativa PMV: Regla manual "Si gasto <X, ahorrar Y"

**38. Fondo de Emergencia** (RF-099)

- Estado: ✅ IMPLEMENTADO
- Feature: Sugerencia automática (6 meses de gastos promedio)

**39. Cálculo del Patrimonio Neto** (RF-153 a RF-154)

- Estado: ✅ IMPLEMENTADO
- Fórmula: (Activos + Inversiones) - Deudas
- Dashboard: Gráfica de evolución histórica

---

## VI. PLANIFICACIÓN Y GESTIÓN AVANZADA (9 CARACTERÍSTICAS)

### MAYORÍA IMPLEMENTADAS ✅

**40. Programación de Pagos Futuros** (RF-059 a RF-061)

- Estado: ✅ IMPLEMENTADO VÍA RECURRENTES

**41. Recordatorios de Facturas y Pagos** (RF-146 a RF-147)

- Estado: ✅ IMPLEMENTADO
- Features específicas México:
  - Recordatorio CFDI pendientes aceptación/rechazo (Regla 2.7.1.21)
  - Recordatorio pagos deudas (7 días antes vencimiento)

**42. Gestión de Deudas y Préstamos** (RF-101 a RF-110)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Registro deuda (acreedor, monto, tasa, plazo)
  - Tabla de amortización automática
  - Cálculo intereses totales
  - Estrategias de pago (avalancha vs bola de nieve)

**43. Planificador de Pago de Deuda** (RF-109)

- Estado: ✅ IMPLEMENTADO
- Estrategias: Mayor interés primero / Menor saldo primero

**44. Seguimiento de Inversiones** (RF-111 a RF-120)

- Estado: ✅ IMPLEMENTADO
- Tipos: Stocks, Bonds, Crypto, Real Estate, Other
- Cálculos: Valor actual, ganancia/pérdida, ROI

**45. Simuladores Financieros** (RF-165 a RF-166)

- Estado: ⚠️ FASE 2
- Incluidos: Calculadora inversiones, calculadora retiro, emergency fund

**46. Gestión de Viajes** (RF-169)

- Estado: ⚠️ FASE 2 (Mes 6-12)
- Feature: Modo viajes con gastos en moneda extranjera

**47. Seguimiento de Kilometraje**

- Estado: ❌ FASE 3 (No prioritario para México)
- Razón: Mayoría usuarios no requiere esto vs USA

**48. Planificación de Impuestos** (RF-139, Módulo SAT completo)

- Estado: ✅ IMPLEMENTADO - DIFERENCIADOR CRÍTICO MÉXICO
- Features:
  - Reporte fiscal simplificado
  - Identificación gastos deducibles
  - Cálculo ISR estimado (Fase 2)
  - Integración descarga masiva SAT
  - Validación CFDI contra listas negras

---

## VII. COLABORACIÓN Y COMUNIDAD (3 CARACTERÍSTICAS)

### IMPLEMENTADAS ✅

**49. Gastos Compartidos/División de Cuentas** (RF-155 a RF-159)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Registro gastos con división automática
  - Algoritmo minimización transacciones (quién debe a quién)
  - Comentarios en transacciones (thread)

**50. Sincronización Multiusuario** (RF-158 a RF-160)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Invitación co-administración cuenta
  - Permisos granulares (ver, crear, editar, eliminar)
  - Audit log de cambios

**51. Función de Chat/Comentarios** (RF-157)

- Estado: ✅ IMPLEMENTADO
- Feature: Thread de conversación por transacción

---

## VIII. EXPERIENCIA DE USUARIO Y TECNOLOGÍA (10 CARACTERÍSTICAS)

### MAYORÍA IMPLEMENTADAS ✅

**52. Compatibilidad Multiplataforma**

- Estado: ✅ IMPLEMENTADO
- Plataformas: Web (responsive), PWA (installable)
- Futuro: Apps nativas (preparación arquitectónica)

**53. Sincronización en la Nube** (Multi-dispositivo)

- Estado: ✅ IMPLEMENTADO
- Backend: PostgreSQL cloud + Redis

**54. Modo Offline** (RF-146)

- Estado: ✅ IMPLEMENTADO VÍA PWA
- Capacidad: Registro transacciones, consulta datos cacheados
- Sincronización diferida al reconectar

**55. Personalización del Tema** (RF-100 a RF-102)

- Estado: ✅ IMPLEMENTADO
- Features: Modo oscuro/claro persistente

**56. Widgets de Pantalla de Inicio**

- Estado: ❌ NO APLICABLE (Web/PWA)
- Alternativa: Quick actions en PWA installada

**57. Integración con Asistentes de Voz**

- Estado: ❌ FASE 3+ (Baja prioridad)
- Razón: Requiere desarrollo significativo, beneficio limitado en PMV

**58. Soporte y Ayuda Integrada** (RF-030, Onboarding)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Wizard onboarding 5 pasos
  - Tooltips contextuales (? icon)
  - Base conocimientos (50+ artículos Mes 3)

**59. Notificaciones Push Personalizadas** (RF-111 a RF-125)

- Estado: ✅ IMPLEMENTADO
- Tipos: 15+ notificaciones configurables
- Canales: Email + in-app (campana navbar)

**60. Actualizaciones Frecuentes**

- Estado: ✅ ESTRATEGIA DEFINIDA
- Cadencia: Deploy diario (CI/CD), releases semanales
- Feature flags para rollout gradual

**61. Feedback y Sugerencias In-app**

- Estado: ✅ IMPLEMENTADO
- Canales: Formulario in-app, Slack/WhatsApp directo (primeros 50 usuarios)

---

## IX. SEGURIDAD Y PRIVACIDAD (5 CARACTERÍSTICAS)

### TODAS IMPLEMENTADAS CON NIVEL BANCARIO ✅

**62. Protección con Contraseña/PIN** (RF-076 a RF-082)

- Estado: ✅ IMPLEMENTADO
- Política: Min 12 caracteres, 1 mayúscula, 1 número, 1 símbolo
- Almacenamiento: Bcrypt (cost factor 12)

**63. Autenticación Biométrica** (RF-083 a RF-085)

- Estado: ✅ IMPLEMENTADO (2FA con TOTP)
- Proveedores: Google Authenticator compatible
- Feature: 10 códigos backup

**64. Cifrado de Datos** (RF-026, E2EE e.firma)

- Estado: ✅ IMPLEMENTADO NIVEL BANCARIO
- Capas:
  - TLS 1.3 en tránsito
  - AES-256 en reposo (datos sensibles)
  - E2EE para e.firma (K_user_priv cifrado con password usuario)

**65. Políticas de Privacidad Claras** (RF-106 a RF-107)

- Estado: ✅ PREPARADO
- Documentos: TOS, Privacy Policy, DPA (Plan Contador)
- Compliance: LFPDPPP, preparación GDPR

**66. Seguridad a Nivel Bancario**

- Estado: ✅ ARQUITECTURA COMPLETA
- Medidas:
  - Multi-tenant RLS forzado
  - Audit log inmutable
  - Rate limiting (login, API)
  - CSRF, XSS, SQL injection protection
  - Circuit breakers
  - Secure logger
  - HMAC anti-replay

---

## X. SERVICIOS COMPLEMENTARIOS Y MONETIZACIÓN (5 CARACTERÍSTICAS)

### PARCIALMENTE IMPLEMENTADAS

**67. Contenido Educativo/Cursos**

- Estado: ⚠️ FASE 2 (Mes 3-6)
- Plan: Blog 20+ artículos Mes 3, webinars mensuales Mes 6

**68. Recomendaciones Personalizadas** (RF-167 a RF-168)

- Estado: ⚠️ FASE 2 (IA recomendaciones)
- Features planeadas:
  - Score salud financiera (0-100)
  - Sugerencias ahorro basadas en patrones
  - Alertas proactivas cumplimiento SAT

**69. Alertas de Comisiones Bancarias**

- Estado: ⚠️ FASE 2 (Requiere Open Banking)
- Dependencia: Integración Belvo/Finerio

**70. Integración con Servicios de Pago Móvil**

- Estado: ❌ FASE 3+ (No prioritario)
- Razón: Enfoque en gestión, no en procesamiento pagos

---

## CARACTERÍSTICAS ADICIONALES INNOVADORAS NO EN LISTA ORIGINAL

### A. CARACTERÍSTICAS OPEN BANKING (ALTA PRIORIDAD FASE 2)

**71. Agregación de Cuentas de Terceros**

- Estado: ⚠️ PoC (Mes 3-6)
- Proveedor: Belvo/Finerio
- Target: Vista unificada todos productos financieros usuario

**72. Integración Productos Deuda/Crédito**

- Estado: ❌ FASE 3
- Feature: Visualización score crédito, alertas tasas interés

**73. API Pública para Desarrolladores** (RF-161 a RF-162)

- Estado: ⚠️ FASE 2
- Plan: API versionada (v1), webhooks, rate limited

---

### B. CARACTERÍSTICAS ESPECÍFICAS CONTABILIDAD MÉXICO (CRÍTICAS)

**74. Descarga Masiva SAT Automatizada**

- Estado: ✅ IMPLEMENTADO - DIFERENCIADOR #1
- Features:
  - Web Service oficial SAT (no scraping)
  - Descarga diaria automática (2 AM)
  - Hasta 200,000 XML por solicitud
  - Notificación nuevas facturas

**75. Validación RFC contra Padrón SAT** (Validación RFC Fase 1)

- Estado: ✅ IMPLEMENTADO
- Features:
  - Consulta en tiempo real
  - Caché 7 días (Redis)
  - Estados: ACTIVO, INACTIVO, LISTA_NEGRA_69B

**76. Workflow Aceptación/Rechazo CFDI Recibidos** (Regla 2.7.1.21)

- Estado: ✅ IMPLEMENTADO (Fase V+, Mes 3-6)
- Features:
  - Notificaciones timeline (0h, 24h, 48h, 72h)
  - Auto-aceptación después 72h
  - Motivos rechazo (catálogo SAT)

**77. Generación Complemento de Pagos (REP) Automático**

- Estado: ⚠️ FASE 2 (Mes 6-12)
- Trigger: Conciliación pago con factura PPD
- Validaciones: Saldo insoluto, fecha pago, forma pago

**78. Validación vs Listas Negras (EFOS, EDOS, 69-B)**

- Estado: ✅ IMPLEMENTADO (Validación proactiva)
- Features:
  - Consulta automática al registrar proveedor
  - Alertas riesgo fiscal
  - Dashboard de proveedores riesgo

**79. Integración Buzón Tributario SAT**

- Estado: ⚠️ FASE 2 (Mes 6-12)
- Features:
  - Scraping automatizado cada 6 horas
  - Descarga notificaciones críticas
  - Clasificación automática (críticas vs informativas)

**80. Reportes DIOT y Carga Batch**

- Estado: ❌ FASE 3 (Empresarial)
- Target: Plan Profesional/Contador

---

### C. CARACTERÍSTICAS IA/AUTOMATIZACIÓN AVANZADA (FASE 2+)

**81. Motor Conciliación con IA (Sugerencias Explicables)**

- Estado: ⚠️ FASE 2 (Mes 3-6)
- Features:
  - Modelo embeddings (Sentence Transformers)
  - Score confianza + breakdown explicativo
  - Reentrenamiento cada 1,000 conciliaciones
  - Target: >80% precisión, >70% acceptance rate

**82. Predicción de Saldo Futuro**

- Estado: ⚠️ FASE 2
- Base: Patrones históricos + transacciones recurrentes
- Horizonte: 3-6 meses

**83. Detección Gastos Anómalos** (RF-080)

- Estado: ✅ IMPLEMENTADO
- Algoritmo: Desviación estándar >2σ

**84. Categorización Automática Aprendizaje**

- Estado: ⚠️ FASE 2 (IA)
- PMV: Reglas definidas por usuario
- V+: IA aprende de categorizaciones manuales

---

### D. CARACTERÍSTICAS GAMIFICACIÓN/ENGAGEMENT (FASE 2+)

**85. Sistema de Badges/Logros** (RF-164)

- Estado: ⚠️ FASE 2
- Ejemplos: "First $10K saved", "30 días presupuesto cumplido"

**86. Retos Financieros/Competencias**

- Estado: ❌ FASE 3
- Feature: Retos semanales/mensuales con amigos

**87. Sistema de Sobres Digitales (Envelope Budgeting)** (RF-163)

- Estado: ⚠️ FASE 2
- Feature: Asignación fondos a sobres virtuales

---

### E. CARACTERÍSTICAS COLABORACIÓN AVANZADA (FASE 2)

**88. Dashboard Contador Multi-Cliente**

- Estado: ✅ CRÍTICO PARA NETWORK EFFECTS (Mes 3-6)
- Features:
  - Vista consolidada 10+ RFCs
  - Facturación masiva
  - Reportes consolidados
  - Whitelabel básico

**89. Metas Compartidas Entre Usuarios** (RF-073)

- Estado: ❌ FASE 3
- Ejemplo: Pareja ahorra para vacaciones

---

### F. CARACTERÍSTICAS FISCALES AVANZADAS MÉXICO (FASE 2-3)

**90. Generación Declaración Anual Pre-llenada**

- Estado: ⚠️ FASE 3 (Mes 12-18)
- Features:
  - Resumen ingresos/deducciones
  - Cálculo ISR estimado
  - Exportación formato SAT

**91. Integración con PAC para Timbrado Propio**

- Estado: ✅ IMPLEMENTADO (Facturapi adapter)
- Circuit breaker + fallback

**92. Gestión e.firma con E2EE**

- Estado: ✅ IMPLEMENTADO
- Seguridad: K_user_priv cifrado con password usuario

**93. Validación CFDI contra Catálogos SAT**

- Estado: ✅ IMPLEMENTADO
- Feature flags para actualización catálogos

**94. Soporte Multi-Versión CFDI (4.0 + preparación 5.0)**

- Estado: ✅ ARQUITECTURA PREPARADA
- Patrón: CFDIVersionManager con feature flags

---

### G. CARACTERÍSTICAS EMPRESARIALES/CONTABILIDAD (FASE 2-3)

**95. Contabilidad Doble Entrada**

- Estado: ❌ FASE 3 (Requiere refactor significativo)
- Alternativa PMV: Registro simplificado con categorización

**96. Gestión Activos Fijos y Depreciación**

- Estado: ⚠️ FASE 3 (Plan Profesional)
- Target: PyMEs con activos

**97. Flujo de Efectivo Proyectado Empresarial**

- Estado: ⚠️ FASE 2 (extensión de personal)
- Horizonte: 3-6-12 meses

**98. Análisis Costos por Proyecto/Centro Costo**

- Estado: ❌ FASE 3
- Target: Freelancers/agencias

**99. Nómina Simplificada** (Add-on $99 MXN/mes)

- Estado: ⚠️ FASE 3 (Mes 12+)
- Límite: Hasta 10 empleados

**100. Gestión Inventarios Básica**

- Estado: ❌ FASE 3+
- Razón: Scope creep, competencia con ERPs

---

## RESUMEN EJECUTIVO DE COBERTURA

### CARACTERÍSTICAS IMPLEMENTADAS EN PMV (Mes 0-3): 60+

✅ **Gestión Transacciones:** 11/13 (85%)
✅ **Integración/Automatización:** 3/5 (60%) - Open Banking en Fase 2
✅ **Presupuestación:** 7/8 (88%)
✅ **Visualización/Reportes:** 6/7 (86%)
✅ **Ahorro/Metas:** 5/6 (83%)
✅ **Planificación Avanzada:** 6/9 (67%) - Simuladores en Fase 2
✅ **Colaboración:** 3/3 (100%)
✅ **UX/Tecnología:** 8/10 (80%)
✅ **Seguridad:** 5/5 (100%)
✅ **Servicios Complementarios:** 1/5 (20%) - Educación en Fase 2

### DIFERENCIADORES ÚNICOS MÉXICO (CRÍTICOS PARA ÉXITO):

🔥 **Top 3 Diferenciadores:**

1. **Descarga Masiva SAT Automatizada** - WS oficial, no scraping
2. **Validación CFDI vs Listas Negras** - Proactiva, tiempo real
3. **Workflow Aceptación/Rechazo CFDI** - Compliance Regla 2.7.1.21

🚀 **Ventajas Competitivas Sostenibles:**

- Motor conciliación híbrido (reglas + IA explicable)
- Network effects vía Contador (Dashboard multi-cliente)
- Compliance SAT nativo (no adaptación post-facto)
- Pricing disruptivo ($199 vs $500-1,000)

### CARACTERÍSTICAS FASE 2 (Mes 3-6): 15+

⚠️ **Prioridad Alta:**

- Open Banking (PoC Belvo)
- IA Conciliación con explicabilidad
- Dashboard Contador multi-cliente
- Contenido educativo/webinars

### CARACTERÍSTICAS FASE 3+ (Mes 6-18): 20+

❌ **Nice-to-Have / Específicas Nicho:**

- Contabilidad doble entrada completa
- Nómina integrada
- Gestión inventarios
- Gamificación profunda
- AR/VR visualización finanzas

---

## ANÁLISIS DE GAPS Y OPORTUNIDADES

### GAPS IDENTIFICADOS (NO EN PROYECTO ACTUAL):

**1. Integración Dispositivos IoT / Wearables**

- Estado: ❌ NO PLANEADO
- Razón: ROI bajo, complejidad alta
- Reconsideración: Si hay demanda específica en Mes 12+

**2. Marketplace Servicios Financieros**

- Estado: ❌ NO PLANEADO PMV
- Oportunidad Fase 3: Afiliación productos (seguros, inversiones)

**3. Blockchain / Contabilidad Triple Entrada**

- Estado: ❌ NO PLANEADO
- Razón: Over-engineering para target PyMEs/individuos

**4. Realidad Aumentada Visualización Finanzas**

- Estado: ❌ NO PLANEADO
- Razón: Gimmick vs utilidad real, prioridad muy baja

**5. Detección Suscripciones Olvidadas**

- Estado: ⚠️ CONSIDERACIÓN FASE 2
- Implementación: Análisis transacciones recurrentes con IA
- Prioridad: Media (nice-to-have)

### OPORTUNIDADES DIFERENCIACIÓN ADICIONALES:

**Micro-Inversiones Automáticas** (Inspirado en Acorns)

- Estado: ⚠️ CONSIDERACIÓN FASE 2-3
- Feature: Redondeo compras → inversión ETF bajo riesgo
- Requiere: Integración bancaria + broker

**Carbon Footprint Financiero** (ESG)

- Estado: ❌ FASE 3+ (Muy nicho)
- Target: Usuarios conscientes medio ambiente

**Modo Freelancer/Gig Economy** (Inspirado en Heru)

- Estado: ⚠️ CONSIDERACIÓN FASE 2
- Features:
  - Separación ingresos personal vs negocio
  - Tracking clientes/proyectos
  - Facturación integrada

---

## PRIORIZACIÓN ESTRATÉGICA FINAL

### CRITERIOS DE PRIORIZACIÓN:

1. **Impacto en Diferenciación México** (peso 40%)
2. **Complejidad Técnica** (peso 20%)
3. **Demanda Usuario** (peso 30%)
4. **ROI / Monetización** (peso 10%)

### ROADMAP ACTUALIZADO CON CARACTERÍSTICAS GLOBALES:

#### **PMV HARDENED (Mes 0-3):**

✅ 60+ características core implementadas

- Enfoque: Estabilidad, seguridad, compliance SAT

#### **Fase V+ (Mes 3-6):**

✅ 15 características adicionales

- Prioridad: Open Banking PoC, IA Conciliación, Dashboard Contador

#### **Fase 2 (Mes 6-12):**

✅ 20 características avanzadas

- Prioridad: Complemento Pagos REP, Buzón Tributario, Features empresariales

#### **Fase 3+ (Mes 12-18):**

✅ 25+ características expansión

- Prioridad: CFDI 5.0, Nómina, Declaración anual, Micro-inversiones

---

## CONCLUSIÓN: COBERTURA Y POSICIONAMIENTO

### COBERTURA GLOBAL: 65 de 70 características originales (93%)

**No implementadas (5):**

1. Widgets pantalla inicio (no aplicable web)
2. Integración asistentes voz (prioridad baja)
3. Integración pagos móviles (fuera scope)
4. Zero-based budgeting (complejidad vs beneficio)
5. Seguimiento kilometraje (no relevante México)

### CARACTERÍSTICAS ADICIONALES ÚNICAS: 30+

**Diferenciadores México:**

- 10 características fiscales SAT
- 5 características compliance específicas
- 8 características IA/automatización
- 7 características colaboración empresarial

### POSICIONAMIENTO COMPETITIVO:

**vs Apps Globales (QuickBooks, Mint, YNAB):**
✅ Superior en compliance México
✅ Superior en automatización SAT
✅ Pricing 3-5x más bajo
⚠️ Inferior en madurez features (pero catching up rápido)

**vs Apps Mexicanas (Fintonic MX, Finerio):**
✅ Superior en contabilidad/fiscalidad
✅ Único con descarga masiva SAT real
✅ Único con validación listas negras
⚠️ Inferior (inicial) en integraciones bancarias

**Ventaja Competitiva Sostenible:**
🏆 **Producto diseñado 100% para México desde día 1**
🏆 **Network effects vía contadores** (imposible de replicar rápido)
🏆 **Datos propietarios** (motor IA mejora con uso)

---

## SIGUIENTE FASE: EJECUCIÓN

### ACCIONES INMEDIATAS (Semana 0):

1. ✅ Validar que las 60+ características PMV están en backlog
2. ✅ Priorizar 3-5 características "nice-to-have" para Mes 1
3. ✅ Definir criterios de aceptación para características críticas México
4. ✅ Establecer métricas de éxito por característica
5. ✅ Planificar A/B testing para features opcionales

### KPIs POR CATEGORÍA DE CARACTERÍSTICAS:

**Transacciones:**

- Tiempo promedio registro: <60 segundos
- % transacciones con categoría correcta: >85%

**Automatización:**

- % transacciones categorizadas automáticamente: >70% (Fase 2)
- Tiempo ahorro vs manual: >80%

**Reportes:**

- Tiempo generación reporte: <5 segundos
- % usuarios que descargan reportes mensualmente: >40%

**SAT/Fiscalidad:**

- % CFDI descargados exitosamente: >99%
- Tiempo descarga masiva 1,000 facturas: <10 minutos
- % validaciones RFC exitosas: >95%

**Engagement:**

- DAU/MAU ratio: >30%
- % usuarios que completan onboarding: >70%
- Churn Mes 1: <15%

---

**ACTUALIZACIÓN COMPLETA: 26 de Enero de 2026**
**Total Características Analizadas:** 100+
**Características Implementadas PMV:** 60+
**Roadmap Definido:** 18 meses
**Diferenciadores Únicos México:** 10+

Este análisis confirma que el proyecto tiene **cobertura superior al 90%** de características estándar del mercado, más **30+ características únicas** que lo posicionan como **líder potencial en el nicho México**.

Agregare todo lo anteriro para que tu lo reestrucutres todo y lo pongas en orden porfavor el objetivo es uan appweb de contabilidad y finazas personales vale? se retralimentes y con ello tambien si tienes un negocio buscar como ofrecer esto y poquito mas especializado en negocios que opinas vale? eso considero es de nicho que no esta siend solucionado y creo que de la guia tuya podremos desarolalr una super herramienta bien aca van todos los datos

# PROYECTO: APLICACIÓN WEB DE FINANZAS PERSONALES PARA MÉXICO

## 📋 TABLA DE CONTENIDOS

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Objetivos y Metas](#objetivos-y-metas)
3. [Herramientas Necesarias](#herramientas-necesarias)
4. [Stack Tecnológico Recomendado](#stack-tecnológico-recomendado)
5. [Consideraciones Críticas](#consideraciones-críticas)
6. [Arquitectura del Sistema](#arquitectura-del-sistema)
7. [Plan de Desarrollo por Fases](#plan-de-desarrollo-por-fases)
8. [Buenas Prácticas](#buenas-prácticas)
9. [Roadmap Detallado](#roadmap-detallado)

---

## 🎯 RESUMEN EJECUTIVO

**Objetivo Principal**: Crear una solución web completa de gestión de finanzas personales diseñada específicamente para el usuario mexicano, aprovechando la ausencia de soluciones web robustas en el mercado.

**Diferenciador**: Mientras existen apps móviles similares, el mercado web carece de soluciones integrales. Nuestro enfoque web permitirá:

- Mayor facilidad de uso en computadoras/laptops
- Mejor experiencia para análisis de datos
- Integración más directa con sistemas bancarios mexicanos
- Accesibilidad sin instalación

---

## 🎯 OBJETIVOS Y METAS

### Objetivos Funcionales

1. **Gestión de Ingresos y Gastos**
   - Registro automático y manual de transacciones
   - Categorización inteligente
   - Etiquetado personalizado

2. **Análisis y Reportes**
   - Dashboards con KPIs financieros
   - Gráficos de tendencias (mensuales, anuales)
   - Reportes exportables (PDF, Excel)
   - Proyecciones de ahorro

3. **Integración Bancaria**
   - Conexión con bancos mexicanos (mediante APIs seguras)
   - Sincronización automática de transacciones
   - Soporte para múltiples cuentas
   - Alertas de movimientos sospechosos

4. **Gestión de Presupuestos**
   - Creación y seguimiento de presupuestos por categoría
   - Alertas cuando se aproximan a límites
   - Comparativas presupuestadas vs. real
   - Análisis de desviaciones

5. **Planificación Financiera**
   - Metas de ahorro con timeline
   - Calculadoras (créditos, inversiones, retirement)
   - Simulaciones de escenarios

### Objetivos No Funcionales

- **Rendimiento**: < 2s carga inicial, < 500ms acciones de usuario
- **Seguridad**: Cumplir estándares bancarios, encriptación E2E
- **Disponibilidad**: 99.9% uptime
- **Escalabilidad**: Soportar 100k+ usuarios simultáneos
- **Accesibilidad**: WCAG 2.1 Level AA

---

## 🛠️ HERRAMIENTAS NECESARIAS

### Gestión de Proyecto

- **Jira/Linear**: Seguimiento de sprints y tareas
- **Figma**: Diseño y prototipado UI/UX
- **Notion/Confluence**: Documentación y wikis técnicas
- **GitHub/GitLab**: Control de versiones y CI/CD

### Desarrollo

- **VS Code/JetBrains**: IDE principal
- **Postman/Insomnia**: Testing de APIs
- **Docker**: Containerización
- **Git**: Versionado de código

### Testing

- **Jest/Vitest**: Testing unitario
- **Cypress/Playwright**: Testing E2E
- **Lighthouse**: Auditoría de rendimiento
- **OWASP ZAP**: Testing de seguridad

### DevOps & Infraestructura

- **AWS/Google Cloud/Azure**: Cloud hosting
- **GitHub Actions/Jenkins**: CI/CD pipelines
- **Terraform**: Infrastructure as Code
- **Grafana/DataDog**: Monitoreo y logging
- **ELK Stack**: Análisis de logs

### Seguridad

- **1Password/Vault**: Gestión de secrets
- **Snyk**: Análisis de vulnerabilidades
- **Auth0/Okta**: Autenticación y SSO
- **HashiCorp Vault**: Gestión de credenciales

---

## 💻 STACK TECNOLÓGICO RECOMENDADO

Vue 3 / Next.js estos si , para nada react , tailwind , next js .
UI Component Library\*\*: Material-UI / Shadcn / Ant Design

- **State Management**: Zustand / Redux Toolkit / Pinia
- **HTTP Client**: TanStack Query / SWR
- **Visualización**: Chart.js / D3.js / Apache ECharts
- **Formularios**: React Hook Form / Formik
- **Styling**:CSS Modules y lo que tu ademas sugieras
- **Build Tool**: Vite.
  fijate que me llama l aatencion , peor yo dije en mi documento que te di de referncia el de Claude_estudialo que bun es lo que quiero vale? , peor eso se analiza con esto mira:Standards & Compatibility
  Node.js Compatibility

Copy page

Bun’s compatibility status with Node.js APIs, modules, and globals

Every day, Bun gets closer to 100% Node.js API compatibility. Today, popular frameworks like Next.js, Express, and millions of npm packages intended for Node just work with Bun. To ensure compatibility, we run thousands of tests from Node.js’ test suite before every release of Bun.
If a package works in Node.js but doesn’t work in Bun, we consider it a bug in Bun. Please open an issue and we’ll fix it.
This page is updated regularly to reflect compatibility status of the latest version of Bun. The information below reflects Bun’s compatibility with Node.js v23.
​
Built-in Node.js modules
​
node:assert
🟢 Fully implemented.
​
node:buffer
🟢 Fully implemented.
​
node:console
🟢 Fully implemented.
​
node:dgram
🟢 Fully implemented. > 90% of Node.js’s test suite passes.
​
node:diagnostics_channel
🟢 Fully implemented.
​
node:dns
🟢 Fully implemented. > 90% of Node.js’s test suite passes.
​
node:events
🟢 Fully implemented. 100% of Node.js’s test suite passes. EventEmitterAsyncResource uses AsyncResource underneath.
​
node:fs
🟢 Fully implemented. 92% of Node.js’s test suite passes.
​
node:http
🟢 Fully implemented. Outgoing client request body is currently buffered instead of streamed.
​
node:https
🟢 APIs are implemented, but Agent is not always used yet.
​
node:os
🟢 Fully implemented. 100% of Node.js’s test suite passes.
​
node:path
🟢 Fully implemented. 100% of Node.js’s test suite passes.
​
node:punycode
🟢 Fully implemented. 100% of Node.js’s test suite passes, deprecated by Node.js.
​
node:querystring
🟢 Fully implemented. 100% of Node.js’s test suite passes.
​
node:readline
🟢 Fully implemented.
​
node:stream
🟢 Fully implemented.
​
node:string_decoder
🟢 Fully implemented. 100% of Node.js’s test suite passes.
​
node:timers
🟢 Recommended to use global setTimeout, et. al. instead.
​
node:tty
🟢 Fully implemented.
​
node:url
🟢 Fully implemented.
​
node:zlib
🟢 Fully implemented. 98% of Node.js’s test suite passes.
​
node:async_hooks
🟡 AsyncLocalStorage, and AsyncResource are implemented. v8 promise hooks are not called, and its usage is strongly discouraged.
​
node:child_process
🟡 Missing proc.gid proc.uid. Stream class not exported. IPC cannot send socket handles. Node.js ↔ Bun IPC can be used with JSON serialization.
​
node:cluster
🟡 Handles and file descriptors cannot be passed between workers, which means load-balancing HTTP requests across processes is only supported on Linux at this time (via SO_REUSEPORT). Otherwise, implemented but not battle-tested.
​
node:crypto
🟡 Missing secureHeapUsed setEngine setFips
​
node:domain
🟡 Missing Domain active
​
node:http2
🟡 Client & server are implemented (95.25% of gRPC’s test suite passes). Missing options.allowHTTP1, options.enableConnectProtocol, ALTSVC extension, and http2stream.pushStream.
​
node:module
🟡 Missing syncBuiltinESMExports, Module#load(). Overriding require.cache is supported for ESM & CJS modules. module.\_extensions, module.\_pathCache, module.\_cache are no-ops. module.register is not implemented and we recommend using a Bun.plugin in the meantime.
​
node:net
🟢 Fully implemented.
​
node:perf_hooks
🟡 APIs are implemented, but Node.js test suite does not pass yet for this module.
​
node:process
🟡 See process Global.
​
node:sys
🟡 See node:util.
​
node:tls
🟡 Missing tls.createSecurePair.
​
node:util
🟡 Missing getCallSite getCallSites getSystemErrorMap getSystemErrorMessage transferableAbortSignal transferableAbortController
​
node:v8
🟡 writeHeapSnapshot and getHeapSnapshot are implemented. serialize and deserialize use JavaScriptCore’s wire format instead of V8’s. Other methods are not implemented. For profiling, use bun:jsc instead.
​
node:vm
🟡 Core functionality and ES modules are implemented, including vm.Script, vm.createContext, vm.runInContext, vm.runInNewContext, vm.runInThisContext, vm.compileFunction, vm.isContext, vm.Module, vm.SourceTextModule, vm.SyntheticModule, and importModuleDynamically support. Options like timeout and breakOnSigint are fully supported. Missing vm.measureMemory and some cachedData functionality.
​
node:wasi
🟡 Partially implemented.
​
node:worker_threads
🟡 Worker doesn’t support the following options: stdin stdout stderr trackedUnmanagedFds resourceLimits. Missing markAsUntransferable moveMessagePortToContext.
​
node:inspector
🔴 Not implemented.
​
node:repl
🔴 Not implemented.
​
node:sqlite
🔴 Not implemented.
​
node:test
🟡 Partly implemented. Missing mocks, snapshots, timers. Use bun:test instead.
​
node:trace_events
🔴 Not implemented.
​
Node.js globals
The table below lists all globals implemented by Node.js and Bun’s current compatibility status.
​
AbortController
🟢 Fully implemented.
​
AbortSignal
🟢 Fully implemented.
​
Blob
🟢 Fully implemented.
​
Buffer
🟢 Fully implemented.
​
ByteLengthQueuingStrategy
🟢 Fully implemented.
​
**dirname
🟢 Fully implemented.
​
**filename
🟢 Fully implemented.
​
atob()
🟢 Fully implemented.
​
Atomics
🟢 Fully implemented.
​
BroadcastChannel
🟢 Fully implemented.
​
btoa()
🟢 Fully implemented.
​
clearImmediate()
🟢 Fully implemented.
​
clearInterval()
🟢 Fully implemented.
​
clearTimeout()
🟢 Fully implemented.
​
CompressionStream
🔴 Not implemented.
​
console
🟢 Fully implemented.
​
CountQueuingStrategy
🟢 Fully implemented.
​
Crypto
🟢 Fully implemented.
​
SubtleCrypto (crypto)
🟢 Fully implemented.
​
CryptoKey
🟢 Fully implemented.
​
CustomEvent
🟢 Fully implemented.
​
DecompressionStream
🔴 Not implemented.
​
Event
🟢 Fully implemented.
​
EventTarget
🟢 Fully implemented.
​
exports
🟢 Fully implemented.
​
fetch
🟢 Fully implemented.
​
FormData
🟢 Fully implemented.
​
global
🟢 Implemented. This is an object containing all objects in the global namespace. It’s rarely referenced directly, as its contents are available without an additional prefix, e.g. **dirname instead of global.**dirname.
​
globalThis
🟢 Aliases to global.
​
Headers
🟢 Fully implemented.
​
MessageChannel
🟢 Fully implemented.
​
MessageEvent
🟢 Fully implemented.
​
MessagePort
🟢 Fully implemented.
​
module
🟢 Fully implemented.
​
PerformanceEntry
🟢 Fully implemented.
​
PerformanceMark
🟢 Fully implemented.
​
PerformanceMeasure
🟢 Fully implemented.
​
PerformanceObserver
🟢 Fully implemented.
​
PerformanceObserverEntryList
🟢 Fully implemented.
​
PerformanceResourceTiming
🟢 Fully implemented.
​
performance
🟢 Fully implemented.
​
process
🟡 Mostly implemented. process.binding (internal Node.js bindings some packages rely on) is partially implemented. process.title is currently a no-op on macOS & Linux. getActiveResourcesInfo setActiveResourcesInfo, getActiveResources and setSourceMapsEnabled are stubs. Newer APIs like process.loadEnvFile and process.getBuiltinModule are not implemented yet.
​
queueMicrotask()
🟢 Fully implemented.
​
ReadableByteStreamController
🟢 Fully implemented.
​
ReadableStream
🟢 Fully implemented.
​
ReadableStreamBYOBReader
🟢 Fully implemented.
​
ReadableStreamBYOBRequest
🟢 Fully implemented.
​
ReadableStreamDefaultController
🟢 Fully implemented.
​
ReadableStreamDefaultReader
🟢 Fully implemented.
​
require()
🟢 Fully implemented, including require.main, require.cache, require.resolve.
​
Response
🟢 Fully implemented.
​
Request
🟢 Fully implemented.
​
setImmediate()
🟢 Fully implemented.
​
setInterval()
🟢 Fully implemented.
​
setTimeout()
🟢 Fully implemented.
​
structuredClone()
🟢 Fully implemented.
​
SubtleCrypto
🟢 Fully implemented.
​
DOMException
🟢 Fully implemented.
​
TextDecoder
🟢 Fully implemented.
​
TextDecoderStream
🟢 Fully implemented.
​
TextEncoder
🟢 Fully implemented.
​
TextEncoderStream
🟢 Fully implemented.
​
TransformStream
🟢 Fully implemented.
​
TransformStreamDefaultController
🟢 Fully implemented.
​
URL
🟢 Fully implemented.
​
URLSearchParams
🟢 Fully implemented.
​
WebAssembly
🟢 Fully implemented.
​
WritableStream
🟢 Fully implemented.
​
WritableStreamDefaultController
🟢 Fully implemented.
​
WritableStreamDefaultWriter
🟢 Fully implemented., porque me interesa se complemento ocne stoque ofrece de manera nativa:Everything you need to build & ship
Production-ready APIs and tools, built into Bun

HTTP & WebSockets
Bun.serve()
HTTP & WebSocket server
routes
Built-in routing with dynamic paths
request.cookies
Zero-overhead cookie parsing
Databases
Bun.sql
PostgreSQL, MySQL, SQLite
Bun.s3
S3-compatible cloud storage
Bun.redis
Redis client with Pub/Sub
File System
Bun.file()
Fast file reading & streaming
Bun.Glob
Fast file pattern matching
Bun.write()
Write files efficiently
Testing
bun test
Jest-compatible test runner
snapshots
Snapshot testing built-in
expect()
Jest-compatible assertions
Build & Deploy
bun build
Fast bundler with tree-shaking
--compile
Single-file executables
--hot
Hot reload without restarts
TypeScript & DX
TypeScript & JSX
No config required
import "_.yaml"
YAML & TOML imports
import "_.css"
CSS & asset imports
Security
Bun.password
bcrypt, argon2 hashing
Bun.CSRF
CSRF token generation
Bun.secrets
OS keychain integration
System Integration
Bun.$
Cross-platform shell scripting
Bun.spawn()
Spawn child processes
bun:ffi
Call native C/C++ libraries
Utilities
Bun.hash()
Fast hashing utilities
Bun.semver
Version comparison
Bun.escapeHTML()
HTML escaping & sanitization,Four tools, one toolkit
Use them together as an all-in-one toolkit, or adopt them incrementally. bun test works in Node.js projects. bun install can be used as the fastest npm client. Each tool stands on its own.

JavaScript Runtime
Starts 3x faster than Node.js
A fast JavaScript runtime designed as a drop-in replacement for Node.js

$ bun ./index.ts
✓
Node.js API compatibility
✓
TypeScript, JSX & React (zero config)
✓
Comprehensive builtin standard library
✓
PostgreSQL, Redis, MySQL, SQLite
✓
Hot & watch mode built-in
✓
Environment variables with .env
REPLACESNode.js
Package Manager
30x faster
Install packages up to 30x faster than npm with a global cache and workspaces

$ bun install
✓
Simple migration from npm/pnpm/yarn
✓
Eliminate phantom dependencies
✓
Workspaces, monorepos
✓
Lifecycle scripts & postinstall handling
✓
Dependency auditing with bun audit
✓
Block malicious packages
ReplacesNPM
Test Runner
Replaces Jest & Vitest
Jest-compatible test runner with built-in code coverage and watch mode

$ bun test
✓
Jest-compatible expect() API
✓
Snapshot testing
✓
Watch mode & lifecycle hooks
✓
DOM APIs via happy-dom
✓
Concurrent test execution
✓
Built-in code coverage
ReplacesVitest
Bundler
Replaces Vite and esbuild
Bundle TypeScript, JSX, React & CSS for both browsers and servers

$ bun build ./app.tsx
✓
TypeScript & JSX built-in (no config)
✓
CSS imports & bundling
✓
React support out of the box
✓
Build for the browser, Bun, and Node.js
✓
Single-file executables
✓
.html, .css, .ts, .tsx, .jsx & more esto es super importante , el nucelo de la pagain web es bun, de la mano con nuxt , vue.js , redis ,sql el que sea el mas adecuado y lo que sugieras compleemntar vale?

### Backend :pUES TODO se tiene que readaptar em temo bajo lo que te menicon runtime se modifica creo , framework:Bun con Elysia es una opción destacada. Elysia está diseñado específicamente para Bun, ofreciendo una experiencia de desarrollo excepcional con soporte nativo, tipado end-to-end y una integración fluida con herramientas como Swagger y ORMs. Es particularmente recomendado para desarrolladores que valoran el rendimiento y una configuración sencilla, aunque algunos prefieren Hono por su estabilidad en producción.Para proyectos empresariales, se sugiere:

Hono si buscas alto rendimiento con estabilidad y compatibilidad multiplataforma tambien.

- **Base de Datos**: PostgreSQL (relacional) + Redis (cache) y loq eu tu sugieras
- **ORM**: Prisma / TypeORM / SQLAlchemy receurda compatibilidad full con bun y con nuxt y vue.js
- **API**: REST + GraphQL (opcional) lo qeu se adapte al proyecto
- **Autenticación**: JWT + OAuth 2.0, lo que sea lo ams adecuado encontre esot para complementar:OAuth Libraries for Bun
  Here you'll find the best Bun libraries for building OAuth clients and servers.

Client Libraries
openid-client. OpenID Certified™ OAuth 2 / OpenID Connect Client API for JavaScript Runtimes
oauth4webapi. OpenID Certified™ Low-Level OAuth 2 / OpenID Connect Client API for JavaScript Runtimes

- **Message Queue**: Bull / RabbitMQ

### Infraestructura

- **Containerización**: Docker
- **Orquestación**: Kubernetes / Docker Compose
- **CDN**: CloudFront / Cloudflare creo seria esto , epro no tengo dinero hasta generar ingresos podre ofrecer o pagar esot vale?
- **Almacenamiento**: S3 / GCS
- **Base de Datos**: Managed PostgreSQL (RDS/Cloud SQL)

## 🔒 CONSIDERACIONES CRÍTICAS

### Seguridad

1. **Cumplimiento Normativo**
   - Ley de Protección de Datos Personales (LFPDPPP)
   - PCI DSS si maneja datos de tarjetas
   - GDPR si tiene usuarios internacionales
   - Revisar regulaciones de Banco de México ene stos 4 puntos devemos ver al amanera para dar a entender que sus datos no entran a mi servidor su infapocin se queda en su pc en su dispositivo y , no se como hacerle para evitar yo tenga infroacion tan delicada o decir que la informacion esta encriptada y por tanto nosotors no tenemosacceso , entra encriptado slae encriptado que opinas , asi doy mas seguridad y estabilidad a usuarios y gobierno pero un nivel de seguridad muy alto devo de cumplir por arriba del estandar para todoa la plataforma a nivel integral vale?:2. **Encriptación**
   - TLS 1.3 para transmisión de datos
   - Encriptación AES-256 en reposo
   - Campos sensibles ofuscados en logs
   - Hashing seguro de contraseñas (bcrypt/argon2) a esto emrefiero y quiza si es necesario mas pues mas por seguriadad y prevencion de nosotroos.

   . **Autenticación & Autorización**
   - Multi-factor authentication (MFA)
   - Rate limiting en endpoints de login
   - Session management seguro
   - RBAC (Role-Based Access Control)
   - Auditoria de accesos

2. **Integración Bancaria**
   - Usar APIs bancarias oficiales (no web scraping)
   - Tokenización de credenciales
   - No almacenar credenciales en BD
   - Validar certificados SSL
   - Implementar webhook validation

### Rendimiento

1. **Frontend**
   - Code splitting automático
   - Lazy loading de componentes/imágenes
   - Service Workers para offline mode
   - Caché inteligente (HTTP cache headers)
   - Minificación y compresión Gzip/Brotli

2. **Backend**
   - Connection pooling en BD
   - Caching en capas (Redis, Query Cache)
   - Índices optimizados en BD
   - Paginación en listados
   - Async/await para operaciones I/O

3. **Monitoreo**
   - Web Vitals (LCP, FID, CLS)
   - Error tracking (Sentry)
   - APM (Application Performance Monitoring)
   - Alertas automáticas en degradación

### Integración

1. **Bancos Mexicanos**
   - Banamex / Citibanamex
   - BBVA Bancomer
   - Scotiabank
   - Santander
   - Inbursa
   - Banorte
   - Usar APIs estandarizadas (Open Banking)

2. **Servicios Terceros**
   - Pasarelas de pago (Stripe, po el mopmonto solo stripe no habra mas.)
     - Email (SendGrid, AWS SES)
   - SMS (Twilio)
   - Almacenamiento (AWS S3) no teneia pensado nada de amazon peor si es asi , se o ams estrategico porsible vale? aun em queda mi cuenta de github student pack y quiza se le pueda sacar provecho no los e si valga la pena pero lo tengo ahi vale? gracais.
   3. **Carga Fluida**
   - Progressive enhancement
   - Skeleton screens mientras carga
   - Transiciones smooth
   - Estados de carga visuales
   - Manejo graceful de errores

### Escalabilidad

1. **Horizontal Scaling**
   - Stateless backend services
   - Load balancers
   - Auto-scaling groups

2. **Vertical Scaling**
   - Optimización de queries
   - Caching agresivo
   - Compresión de datos

3. **Base de Datos**
   - Replicación read-only
   - Sharding si es necesario
   - Archivado de datos históricos

---

## 🏗️ ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────────────────┐
│                    CDN (Cloudflare)                  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────┐
│             Frontend (SPA/PWA)                       │
│  - React/Vue + TypeScript                           │
│  - Responsive design (Mobile-first)                 │
│  - Service Workers (Offline support)                │
└────────────────────┬────────────────────────────────┘
                     │ (HTTPS/CORS)
┌────────────────────┴────────────────────────────────┐
│          API Gateway / Load Balancer                 │
│  - Rate limiting                                     │
│  - Request validation                               │
│  - Authentication middleware                        │
└────────────────────┬────────────────────────────────┘
                     │
     ┌───────────────┼───────────────┐
     │               │               │
┌────▼──────┐  ┌────▼──────┐  ┌────▼──────┐
│  Service  │  │  Service  │  │  Service  │
│ Auth (JWT)│  │ Finanzas  │  │Integraciones
│           │  │           │  │(Bancos)
└────┬──────┘  └────┬──────┘  └────┬──────┘
     │              │              │
     └──────────────┼──────────────┘
                    │
        ┌───────────┴──────────┐
        │                      │
   ┌────▼──────┐         ┌────▼──────┐
   │PostgreSQL │         │   Redis   │
   │(Primary)  │         │  (Cache)  │
   └───────────┘         └───────────┘

   ┌────────────────────────────────────────┐
   │    Message Queue (Bull/RabbitMQ)       │
   │  - Procesamiento async                 │
   │  - Sincronización bancaria             │
   │  - Generación de reportes              │
   └────────────────────────────────────────┘
```

### Separación por Dominios

- **Auth Service**: Autenticación y autorización
- **Finance Service**: Lógica de ingresos, gastos, presupuestos
- **Bank Integration Service**: Conexión con APIs bancarias
- **Reporting Service**: Generación de reportes y análisis
- **Notification Service**: Emails, SMS, push notifications

---

## 📅 PLAN DE DESARROLLO POR FASES

### FASE 0: PREPARACIÓN (2-3 semanas)

**Objetivo**: Establecer la base sólida

#### Tasks

- [ ] Diseño de BD (ER diagram)
- [ ] Setup de infraestructura (Docker, CI/CD)
- [ ] Configuración de repositorios y branches
- [ ] Definición de estándares de código
- [ ] Setup de testing framework
- [ ] Diseño UI/UX en Figma (wireframes)
- [ ] Análisis de seguridad inicial

**Entregables**:

- BD schema documentada
- Docker compose con stack base
- CI/CD pipeline funcional
- Design system en Figma

---

### FASE 1: MVP CORE (4-6 semanas)

**Objetivo**: Funcionalidad mínima viable de finanzas

#### Frontend

- [ ] Autenticación (login/registro)
- [ ] Dashboard básico
- [ ] Registro de transacciones (manual)
- [ ] Listado de transacciones
- [ ] Categorización básica

#### Backend

- [ ] API de autenticación (JWT)
- [ ] Modelos de usuario, transacciones, categorías
- [ ] CRUD de transacciones
- [ ] Validaciones y middleware
- [ ] Rate limiting

#### Infraestructura

- [ ] Base de datos en PostgreSQL
- [ ] Redis para sesiones
- [ ] Logging centralizado
- [ ] Monitoreo básico

**Entregables**: Aplicación funcional con autenticación y CRUD de transacciones
, sugiero para la parte del uxui devemos de ser muy MUY ESTRATEGAS Para saver acomodar y saver que biblioteca suaremos para las animaciones los efectos visuales lso emojis o cosas similares devemos de genera un apap de confianza que no de miedo vale?, por eso te pedire t ayuda estrategica emocional cultural claude para generar atracion del publico y rmper la barrera de que la aplataforma se me hace dificl, deve de ser muy intuitiva , deveoms ofrecer como rutas ya prehehcas para canalizarlso creo todo con el objetivo de eficientar el procesopara cada quien, no se aun peor te pido seas el estratega en lo tecnico tactico psicologico y del proyecto una visooin integral panoramoca please, no quiero el proyecto tirene o caiga por algo que no suimos parneder de lso errorees de todas las empresas del mundo de lso rubros de finazas educacion financiera contabilidad etc y similares vale?

## FASE 2: ANÁLISIS Y REPORTES (3-4 semanas)

**Objetivo**: Insights y visualización de datos

#### Frontend

- [ ] Dashboard con gráficos
- [ ] Reportes por período
- [ ] Exportación PDF/Excel
- [ ] Filtros y búsqueda avanzada
- [ ] Responsivo en móviles

#### Backend

- [ ] Agregaciones y analytics
- [ ] Generación de reportes
- [ ] Caching de datos agregados
- [ ] Worker para reportes pesados

**Entregables**: Dashboards interactivos con análisis de datos

---

### FASE 3: PRESUPUESTOS (2-3 semanas)

**Objetivo**: Herramientas de planificación

#### Features

- [ ] Creación de presupuestos
- [ ] Seguimiento vs. actual
- [ ] Alertas de límites
- [ ] Proyecciones
- [ ] Recomendaciones

---

### FASE 4: INTEGRACIÓN BANCARIA (4-6 semanas)

**Objetivo**: Conexión segura con bancos mexicanos

#### Análisis

- [ ] Investigar APIs de bancos disponibles
- [ ] Evaluación de plataformas (Plaid, Yapstone, etc.)
- [ ] Definición de flujo seguro

#### Implementación

- [ ] OAuth 2.0 para bancos
- [ ] Sincronización automática
- [ ] Tokenización de credenciales
- [ ] Reconciliación de transacciones
- [ ] Testing de seguridad

**Nota**: Esta fase requiere compliance legal y seguridad certificada

---

### FASE 5: METAS DE AHORRO (2-3 semanas)

**Objetivo**: Planificación financiera personal

#### Features

- [ ] Creación de metas
- [ ] Tracking de progreso
- [ ] Calculadoras (créditos, inversiones)
- [ ] Recomendaciones IA

---

### FASE 6: OPTIMIZACIÓN Y ESCALA (2-3 semanas)

**Objetivo**: Performance y disponibilidad

#### Tasks

- [ ] Auditorías de rendimiento
- [ ] Optimización de queries
- [ ] Mejora de UX based on analytics
- [ ] Stress testing
- [ ] Escalabilidad horizontal

---

### FASE 7: SEGURIDAD Y COMPLIANCE (Continuo)

**Objetivo**: Cumplimiento normativo

#### Tasks

- [ ] Auditoría de seguridad externa
- [ ] Penetration testing
- [ ] Certificación de compliance
- [ ] Documentación legal (Privacy Policy, ToS)
- [ ] GDPR/LFPDPPP compliance

---

## ✅ BUENAS PRÁCTICAS

### Código

```
1. **Code Quality**
   - ESLint + Prettier (formateo automático)
   - SonarQube para análisis estático
   - Husky para pre-commit hooks
   - Coverage > 80% en tests
   - Code reviews obligatorios (PR)

2. **Versionado Semántico**
   - Mayor.Menor.Patch
   - Changelogs automáticos (Conventional Commits)
   - Git flow con main/develop/feature branches

3. **Testing**
   - Unit tests: Funciones puras
   - Integration tests: APIs, BD
   - E2E tests: Flujos críticos
   - Performance tests: Load testing
   - Security tests: OWASP Top 10

4. **Documentation**
   - JSDoc/TypeDoc para código
   - Swagger/OpenAPI para APIs
   - Runbooks para operaciones
   - ADRs (Architecture Decision Records)
```

### DevOps

```
1. **CI/CD**
   - Builds automáticos en cada push
   - Tests automáticos
   - Linting y security checks
   - Deployment automático a staging
   - Approval manual para producción

2. **Deployments**
   - Blue-green deployments
   - Canary releases (5% → 50% → 100%)
   - Rollback automático en errores
   - Feature flags para rollout gradual
   - Monitoreo post-deployment

3. **Infrastructure as Code**
   - Terraform para infra
   - Docker para apps
   - Versionado de configs
   - Reproducible environments
```

### Seguridad

```
1. **Secrets Management**
   - No commitear secrets a Git
   - Vault centralizado
   - Rotación automática
   - Auditoría de accesos

2. **HTTPS/TLS**
   - TLS 1.3 obligatorio
   - HSTS headers
   - Certificate pinning (opcional)
   - Regular updates de certs

3. **Protección de APIs**
   - Rate limiting por IP/usuario
   - CORS configurado restrictivo
   - CSRF tokens
   - Input validation y sanitización
   - SQL injection prevention (prepared statements)
```

---

## 🚀 ROADMAP DETALLADO

### Timeline Estimado: 4-5 meses para MVP completo

```
Semana 1-2:     Fase 0 (Preparación)
Semana 3-8:     Fase 1 (MVP Core)
Semana 9-12:    Fase 2 (Análisis)
Semana 13-14:   Fase 3 (Presupuestos)
Semana 15-20:   Fase 4 (Integración Bancaria)*
Semana 21-23:   Fase 5 (Metas)
Semana 24-26:   Fase 6 (Optimización)
Continuo:       Fase 7 (Seguridad)

* La fase de integración bancaria puede extenderse si requiere aprobaciones regulatorias
```

### Hitos Clave

1. **MVP Launch** (Semana 8): Autenticación + Transacciones + Dashboard básico
2. **Analytics Ready** (Semana 12): Reportes e insights funcionales
3. **Banking Integration** (Semana 20): Conexión con bancos
4. **Production Ready** (Semana 26): Escalable, seguro, certificado
5. **Market Launch** (Semana 28): Disponible para usuarios

---

## 📊 EQUIPO NECESARIO

### Roles Recomendados

- **1 Product Manager**: Visión y roadmap
- **2-3 Full Stack Engineers**: Core development
- **1 Frontend Engineer**: Especialista UX
- **1 Backend Engineer**: Arquitectura y APIs
- **1 DevOps/SRE**: Infra, monitoring, scaling
- **1 QA Engineer**: Testing y quality
- **1 Security Engineer**: Compliance y seguridad (part-time inicial)
- **1 UI/UX Designer**: Diseño e investigación
- **1 DBA**: Optimización de datos (part-time inicial)

---

## 🎓 SIGUIENTES PASOS

1. **Validar tecnologías**: Comparte tu análisis y fusionaremos propuestas
2. **Crear equipo**: Reclutamiento según roles
3. **Iniciar Fase 0**: Setup de infraestructura
4. **Definir sprint 0**: Primeras 2 semanas de trabajo
5. **Establecer métricas**: OKRs y KPIs de éxito

---

## 📝 NOTAS FINALES

- Este documento es vivo y debe evolucionar
- Mantener reuniones semanales de arquitectura
- Documentar decisiones en ADRs
- Revisar roadmap cada 2 semanas
- Estar preparados para pivotar según feedback del mercado
- Considerar early access/beta con usuarios seleccionados

**Próximos pasos en 24-48 horas**: Revisión conjunta y fusión con tu análisis actual.

```

---
me diste esto te lo doy peude de algo te sirva a ti:## ✅ Cambios Realizados

1. ✅ **Eliminados**: Todos los archivos referentes a app móvil (mantener solo lo reutilizable)
2. ✅ **Creado**: Un documento maestro completo (`PROYECTO_WEB_PLAN_MAESTRO.md`) con:
   - Herramientas necesarias
   - Objetivos y metas claros
   - Tecnologías recomendadas (abiertas a tu propuesta)
   - Consideraciones de seguridad, rendimiento, integración
   - Arquitectura del sistema
   - Plan de desarrollo en 7 fases
   - Buenas prácticas
   - Roadmap estimado

El documento está listo para que **fusiones tu análisis actual**. Solo dame una indicación cuando tengas tu propuesta y haremos el merge de las mejores ideas. 🎯# PROYECTO: APLICACIÓN WEB DE FINANZAS PERSONALES PARA MÉXICO

## 📋 TABLA DE CONTENIDOS
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Objetivos y Metas](#objetivos-y-metas)
3. [Herramientas Necesarias](#herramientas-necesarias)
4. [Stack Tecnológico Recomendado](#stack-tecnológico-recomendado)
5. [Consideraciones Críticas](#consideraciones-críticas)
6. [Arquitectura del Sistema](#arquitectura-del-sistema)
7. [Plan de Desarrollo por Fases](#plan-de-desarrollo-por-fases)
8. [Buenas Prácticas](#buenas-prácticas)
9. [Roadmap Detallado](#roadmap-detallado)

---

## 🎯 RESUMEN EJECUTIVO

**Objetivo Principal**: Crear una solución web completa de gestión de finanzas personales diseñada específicamente para el usuario mexicano, aprovechando la ausencia de soluciones web robustas en el mercado.

**Diferenciador**: Mientras existen apps móviles similares, el mercado web carece de soluciones integrales. Nuestro enfoque web permitirá:
- Mayor facilidad de uso en computadoras/laptops
- Mejor experiencia para análisis de datos
- Integración más directa con sistemas bancarios mexicanos
- Accesibilidad sin instalación

---

## 🎯 OBJETIVOS Y METAS

### Objetivos Funcionales
1. **Gestión de Ingresos y Gastos**
   - Registro automático y manual de transacciones
   - Categorización inteligente
   - Etiquetado personalizado

2. **Análisis y Reportes**
   - Dashboards con KPIs financieros
   - Gráficos de tendencias (mensuales, anuales)
   - Reportes exportables (PDF, Excel)
   - Proyecciones de ahorro

3. **Integración Bancaria**
   - Conexión con bancos mexicanos (mediante APIs seguras)
   - Sincronización automática de transacciones
   - Soporte para múltiples cuentas
   - Alertas de movimientos sospechosos

4. **Gestión de Presupuestos**
   - Creación y seguimiento de presupuestos por categoría
   - Alertas cuando se aproximan a límites
   - Comparativas presupuestadas vs. real
   - Análisis de desviaciones

5. **Planificación Financiera**
   - Metas de ahorro con timeline
   - Calculadoras (créditos, inversiones, retirement)
   - Simulaciones de escenarios

### Objetivos No Funcionales
- **Rendimiento**: < 2s carga inicial, < 500ms acciones de usuario
- **Seguridad**: Cumplir estándares bancarios, encriptación E2E
- **Disponibilidad**: 99.9% uptime
- **Escalabilidad**: Soportar 100k+ usuarios simultáneos
- **Accesibilidad**: WCAG 2.1 Level AA

---

## 🛠️ HERRAMIENTAS NECESARIAS

### Gestión de Proyecto
- **Jira/Linear**: Seguimiento de sprints y tareas
- **Figma**: Diseño y prototipado UI/UX
- **Notion/Confluence**: Documentación y wikis técnicas
- **GitHub/GitLab**: Control de versiones y CI/CD

### Desarrollo
- **VS Code/JetBrains**: IDE principal
- **Postman/Insomnia**: Testing de APIs
- **Docker**: Containerización
- **Git**: Versionado de código

### Testing
- **Jest/Vitest**: Testing unitario
- **Cypress/Playwright**: Testing E2E
- **Lighthouse**: Auditoría de rendimiento
- **OWASP ZAP**: Testing de seguridad

### DevOps & Infraestructura
- **AWS/Google Cloud/Azure**: Cloud hosting
- **GitHub Actions/Jenkins**: CI/CD pipelines
- **Terraform**: Infrastructure as Code
- **Grafana/DataDog**: Monitoreo y logging
- **ELK Stack**: Análisis de logs

### Seguridad
- **1Password/Vault**: Gestión de secrets
- **Snyk**: Análisis de vulnerabilidades
- **Auth0/Okta**: Autenticación y SSO
- **HashiCorp Vault**: Gestión de credenciales

---

## 💻 STACK TECNOLÓGICO RECOMENDADO

*(Mantén abierta la posibilidad de cambiar según tu análisis)*

### Frontend
- **Framework**: React 18+ / Vue 3 / Next.js
- **UI Component Library**: Material-UI / Shadcn / Ant Design
- **State Management**: Zustand / Redux Toolkit / Pinia
- **HTTP Client**: TanStack Query / SWR
- **Visualización**: Chart.js / D3.js / Apache ECharts
- **Formularios**: React Hook Form / Formik
- **Styling**: Tailwind CSS / CSS Modules
- **Build Tool**: Vite / Webpack 5

### Backend
- **Runtime**: Node.js / Python FastAPI / Go
- **Framework**: Express / NestJS / Django
- **Base de Datos**: PostgreSQL (relacional) + Redis (cache)
- **ORM**: Prisma / TypeORM / SQLAlchemy
- **API**: REST + GraphQL (opcional)
- **Autenticación**: JWT + OAuth 2.0
- **Message Queue**: Bull / RabbitMQ

### Infraestructura
- **Containerización**: Docker
- **Orquestación**: Kubernetes / Docker Compose
- **CDN**: CloudFront / Cloudflare
- **Almacenamiento**: S3 / GCS
- **Base de Datos**: Managed PostgreSQL (RDS/Cloud SQL)

---

## 🔒 CONSIDERACIONES CRÍTICAS

### Seguridad
1. **Cumplimiento Normativo**
   - Ley de Protección de Datos Personales (LFPDPPP)
   - PCI DSS si maneja datos de tarjetas
   - GDPR si tiene usuarios internacionales
   - Revisar regulaciones de Banco de México

2. **Encriptación**
   - TLS 1.3 para transmisión de datos
   - Encriptación AES-256 en reposo
   - Campos sensibles ofuscados en logs
   - Hashing seguro de contraseñas (bcrypt/argon2)

3. **Autenticación & Autorización**
   - Multi-factor authentication (MFA)
   - Rate limiting en endpoints de login
   - Session management seguro
   - RBAC (Role-Based Access Control)
   - Auditoria de accesos

4. **Integración Bancaria**
   - Usar APIs bancarias oficiales (no web scraping)
   - Tokenización de credenciales
   - No almacenar credenciales en BD
   - Validar certificados SSL
   - Implementar webhook validation

### Rendimiento
1. **Frontend**
   - Code splitting automático
   - Lazy loading de componentes/imágenes
   - Service Workers para offline mode
   - Caché inteligente (HTTP cache headers)
   - Minificación y compresión Gzip/Brotli

2. **Backend**
   - Connection pooling en BD
   - Caching en capas (Redis, Query Cache)
   - Índices optimizados en BD
   - Paginación en listados
   - Async/await para operaciones I/O

3. **Monitoreo**
   - Web Vitals (LCP, FID, CLS)
   - Error tracking (Sentry)
   - APM (Application Performance Monitoring)
   - Alertas automáticas en degradación

### Integración
1. **Bancos Mexicanos**
   - Banamex / Citibanamex
   - BBVA Bancomer
   - Scotiabank
   - Santander
   - Inbursa
   - Banorte
   - Usar APIs estandarizadas (Open Banking)

2. **Servicios Terceros**
   - Pasarelas de pago (Stripe, Mercado Pago)
   - Email (SendGrid, AWS SES)
   - SMS (Twilio)
   - Almacenamiento (AWS S3)

3. **Carga Fluida**
   - Progressive enhancement
   - Skeleton screens mientras carga
   - Transiciones smooth
   - Estados de carga visuales
   - Manejo graceful de errores

### Escalabilidad
1. **Horizontal Scaling**
   - Stateless backend services
   - Load balancers
   - Auto-scaling groups

2. **Vertical Scaling**
   - Optimización de queries
   - Caching agresivo
   - Compresión de datos

3. **Base de Datos**
   - Replicación read-only
   - Sharding si es necesario
   - Archivado de datos históricos

---

## 🏗️ ARQUITECTURA DEL SISTEMA

```

┌─────────────────────────────────────────────────────┐
│ CDN (Cloudflare) │
└────────────────────┬────────────────────────────────┘
│
┌────────────────────┴────────────────────────────────┐
│ Frontend (SPA/PWA) │
│ - React/Vue + TypeScript │
│ - Responsive design (Mobile-first) │
│ - Service Workers (Offline support) │
└────────────────────┬────────────────────────────────┘
│ (HTTPS/CORS)
┌────────────────────┴────────────────────────────────┐
│ API Gateway / Load Balancer │
│ - Rate limiting │
│ - Request validation │
│ - Authentication middleware │
└────────────────────┬────────────────────────────────┘
│
┌───────────────┼───────────────┐
│ │ │
┌────▼──────┐ ┌────▼──────┐ ┌────▼──────┐
│ Service │ │ Service │ │ Service │
│ Auth (JWT)│ │ Finanzas │ │Integraciones
│ │ │ │ │(Bancos)
└────┬──────┘ └────┬──────┘ └────┬──────┘
│ │ │
└──────────────┼──────────────┘
│
┌───────────┴──────────┐
│ │
┌────▼──────┐ ┌────▼──────┐
│PostgreSQL │ │ Redis │
│(Primary) │ │ (Cache) │
└───────────┘ └───────────┘

┌────────────────────────────────────────┐
│ Message Queue (Bull/RabbitMQ) │
│ - Procesamiento async │
│ - Sincronización bancaria │
│ - Generación de reportes │
└────────────────────────────────────────┘

```

### Separación por Dominios
- **Auth Service**: Autenticación y autorización
- **Finance Service**: Lógica de ingresos, gastos, presupuestos
- **Bank Integration Service**: Conexión con APIs bancarias
- **Reporting Service**: Generación de reportes y análisis
- **Notification Service**: Emails, SMS, push notifications

---

## 📅 PLAN DE DESARROLLO POR FASES

### FASE 0: PREPARACIÓN (2-3 semanas)
**Objetivo**: Establecer la base sólida

#### Tasks
- [ ] Diseño de BD (ER diagram)
- [ ] Setup de infraestructura (Docker, CI/CD)
- [ ] Configuración de repositorios y branches
- [ ] Definición de estándares de código
- [ ] Setup de testing framework
- [ ] Diseño UI/UX en Figma (wireframes)
- [ ] Análisis de seguridad inicial

**Entregables**:
- BD schema documentada
- Docker compose con stack base
- CI/CD pipeline funcional
- Design system en Figma

---

### FASE 1: MVP CORE (4-6 semanas)
**Objetivo**: Funcionalidad mínima viable de finanzas

#### Frontend
- [ ] Autenticación (login/registro)
- [ ] Dashboard básico
- [ ] Registro de transacciones (manual)
- [ ] Listado de transacciones
- [ ] Categorización básica

#### Backend
- [ ] API de autenticación (JWT)
- [ ] Modelos de usuario, transacciones, categorías
- [ ] CRUD de transacciones
- [ ] Validaciones y middleware
- [ ] Rate limiting

#### Infraestructura
- [ ] Base de datos en PostgreSQL
- [ ] Redis para sesiones
- [ ] Logging centralizado
- [ ] Monitoreo básico

**Entregables**: Aplicación funcional con autenticación y CRUD de transacciones

---

### FASE 2: ANÁLISIS Y REPORTES (3-4 semanas)
**Objetivo**: Insights y visualización de datos

#### Frontend
- [ ] Dashboard con gráficos
- [ ] Reportes por período
- [ ] Exportación PDF/Excel
- [ ] Filtros y búsqueda avanzada
- [ ] Responsivo en móviles

#### Backend
- [ ] Agregaciones y analytics
- [ ] Generación de reportes
- [ ] Caching de datos agregados
- [ ] Worker para reportes pesados

**Entregables**: Dashboards interactivos con análisis de datos

---

### FASE 3: PRESUPUESTOS (2-3 semanas)
**Objetivo**: Herramientas de planificación

#### Features
- [ ] Creación de presupuestos
- [ ] Seguimiento vs. actual
- [ ] Alertas de límites
- [ ] Proyecciones
- [ ] Recomendaciones

---

### FASE 4: INTEGRACIÓN BANCARIA (4-6 semanas)
**Objetivo**: Conexión segura con bancos mexicanos

#### Análisis
- [ ] Investigar APIs de bancos disponibles
- [ ] Evaluación de plataformas (Plaid, Yapstone, etc.)
- [ ] Definición de flujo seguro

#### Implementación
- [ ] OAuth 2.0 para bancos
- [ ] Sincronización automática
- [ ] Tokenización de credenciales
- [ ] Reconciliación de transacciones
- [ ] Testing de seguridad

**Nota**: Esta fase requiere compliance legal y seguridad certificada

---

### FASE 5: METAS DE AHORRO (2-3 semanas)
**Objetivo**: Planificación financiera personal

#### Features
- [ ] Creación de metas
- [ ] Tracking de progreso
- [ ] Calculadoras (créditos, inversiones)
- [ ] Recomendaciones IA

---

### FASE 6: OPTIMIZACIÓN Y ESCALA (2-3 semanas)
**Objetivo**: Performance y disponibilidad

#### Tasks
- [ ] Auditorías de rendimiento
- [ ] Optimización de queries
- [ ] Mejora de UX based on analytics
- [ ] Stress testing
- [ ] Escalabilidad horizontal

---

### FASE 7: SEGURIDAD Y COMPLIANCE (Continuo)
**Objetivo**: Cumplimiento normativo

#### Tasks
- [ ] Auditoría de seguridad externa
- [ ] Penetration testing
- [ ] Certificación de compliance
- [ ] Documentación legal (Privacy Policy, ToS)
- [ ] GDPR/LFPDPPP compliance

---

## ✅ BUENAS PRÁCTICAS

### Código
```

1. **Code Quality**
   - ESLint + Prettier (formateo automático)
   - SonarQube para análisis estático
   - Husky para pre-commit hooks
   - Coverage > 80% en tests
   - Code reviews obligatorios (PR)

2. **Versionado Semántico**
   - Mayor.Menor.Patch
   - Changelogs automáticos (Conventional Commits)
   - Git flow con main/develop/feature branches

3. **Testing**
   - Unit tests: Funciones puras
   - Integration tests: APIs, BD
   - E2E tests: Flujos críticos
   - Performance tests: Load testing
   - Security tests: OWASP Top 10

4. **Documentation**
   - JSDoc/TypeDoc para código
   - Swagger/OpenAPI para APIs
   - Runbooks para operaciones
   - ADRs (Architecture Decision Records)

```

### DevOps
```

1. **CI/CD**
   - Builds automáticos en cada push
   - Tests automáticos
   - Linting y security checks
   - Deployment automático a staging
   - Approval manual para producción

2. **Deployments**
   - Blue-green deployments
   - Canary releases (5% → 50% → 100%)
   - Rollback automático en errores
   - Feature flags para rollout gradual
   - Monitoreo post-deployment

3. **Infrastructure as Code**
   - Terraform para infra
   - Docker para apps
   - Versionado de configs
   - Reproducible environments

```

### Seguridad
```

1. **Secrets Management**
   - No commitear secrets a Git
   - Vault centralizado
   - Rotación automática
   - Auditoría de accesos

2. **HTTPS/TLS**
   - TLS 1.3 obligatorio
   - HSTS headers
   - Certificate pinning (opcional)
   - Regular updates de certs

3. **Protección de APIs**
   - Rate limiting por IP/usuario
   - CORS configurado restrictivo
   - CSRF tokens
   - Input validation y sanitización
   - SQL injection prevention (prepared statements)

```

---

## 🚀 ROADMAP DETALLADO

### Timeline Estimado: 4-5 meses para MVP completo

```

Semana 1-2: Fase 0 (Preparación)
Semana 3-8: Fase 1 (MVP Core)
Semana 9-12: Fase 2 (Análisis)
Semana 13-14: Fase 3 (Presupuestos)
Semana 15-20: Fase 4 (Integración Bancaria)\*
Semana 21-23: Fase 5 (Metas)
Semana 24-26: Fase 6 (Optimización)
Continuo: Fase 7 (Seguridad)

- La fase de integración bancaria puede extenderse si requiere aprobaciones regulatorias

```

### Hitos Clave
1. **MVP Launch** (Semana 8): Autenticación + Transacciones + Dashboard básico
2. **Analytics Ready** (Semana 12): Reportes e insights funcionales
3. **Banking Integration** (Semana 20): Conexión con bancos
4. **Production Ready** (Semana 26): Escalable, seguro, certificado
5. **Market Launch** (Semana 28): Disponible para usuarios

---

## 📊 EQUIPO NECESARIO

### Roles Recomendados
- **1 Product Manager**: Visión y roadmap
- **2-3 Full Stack Engineers**: Core development
- **1 Frontend Engineer**: Especialista UX
- **1 Backend Engineer**: Arquitectura y APIs
- **1 DevOps/SRE**: Infra, monitoring, scaling
- **1 QA Engineer**: Testing y quality
- **1 Security Engineer**: Compliance y seguridad (part-time inicial)
- **1 UI/UX Designer**: Diseño e investigación
- **1 DBA**: Optimización de datos (part-time inicial)

---

## 🎓 SIGUIENTES PASOS

1. **Validar tecnologías**: Comparte tu análisis y fusionaremos propuestas
2. **Crear equipo**: Reclutamiento según roles
3. **Iniciar Fase 0**: Setup de infraestructura
4. **Definir sprint 0**: Primeras 2 semanas de trabajo
5. **Establecer métricas**: OKRs y KPIs de éxito

---

## 📝 NOTAS FINALES

- Este documento es vivo y debe evolucionar
- Mantener reuniones semanales de arquitectura
- Documentar decisiones en ADRs
- Revisar roadmap cada 2 semanas
- Estar preparados para pivotar según feedback del mercado
- Considerar early access/beta con usuarios seleccionados

**Próximos pasos en 24-48 horas**: Revisión conjunta y fusión con tu análisis actual.

```

---

## ✅ Cambios Realizados

1. ✅ **Eliminados**: Todos los archivos referentes a app móvil (mantener solo lo reutilizable)
2. ✅ **Creado**: Un documento maestro completo (`PROYECTO_WEB_PLAN_MAESTRO.md`) con:
   - Herramientas necesarias
   - Objetivos y metas claros
   - Tecnologías recomendadas (abiertas a tu propuesta)
   - Consideraciones de seguridad, rendimiento, integración
   - Arquitectura del sistema
   - Plan de desarrollo en 7 fases
   - Buenas prácticas
   - Roadmap estimado

El documento está listo para que **fusiones tu análisis actual**. Solo dame una indicación cuando tengas tu propuesta y haremos el merge de las mejores ideas. 🎯

Pero por supuesto esto de ley a ti te sirve demasiago Claude mira esto si o si tiene que estar :PROYECTO WEB DE FINANZAS PERSONALES PARA MÉXICO
DOCUMENTO MAESTRO - BLUEPRINT COMPLETO v8.0
Actualizado: 26 de Enero de 2025
Tipo de Proyecto: Aplicación Web (Vue + Nuxt)
Duración: 3 meses
Infraestructura: VPS Hostinger (4 vCPU, 16GB RAM, 200GB NVMe, 16TB bandwidth)

TABLA DE CONTENIDOS
PARTE I: VISIÓN ESTRATÉGICA Y FUNDAMENTOS
Objetivo General del Proyecto
Objetivos Específicos (100+ Requisitos)
Alcance del Proyecto
Análisis del Mercado Mexicano y Propuesta de Valor
Modelo de Negocio y Monetización
PARTE II: REQUISITOS DEL SISTEMA
Requisitos Funcionales (RF-001 a RF-150+)
Requisitos No Funcionales (RNF-001 a RNF-080+)
Requisitos de Compliance y Regulación (México)
Matriz de Priorización de Features
PARTE III: ARQUITECTURA Y DISEÑO TÉCNICO
Arquitectura del Sistema (Clean Architecture + SOLID)
Tecnologías y Stack Técnico Definitivo
Diseño de Base de Datos (Modelo Completo)
Arquitectura de APIs (RESTful + Versionado)
Arquitectura de Seguridad Multi-Capa
PARTE IV: SEGURIDAD Y COMPLIANCE
Estrategia de Seguridad Integral
Protección de Datos Financieros (LFPDPPP)
Plan de Auditoría y Trazabilidad
Gestión de Secretos y Credenciales
Plan de Continuidad y Recuperación ante Desastres
PARTE V: INFRAESTRUCTURA Y DEVOPS
Configuración del VPS Hostinger
Containerización y Orquestación (Docker)
Estrategia de CI/CD
Monitoreo, Logging y Observabilidad
Estrategia de Backup y Restore
PARTE VI: DESARROLLO Y METODOLOGÍA
Roadmap de Desarrollo (3 Meses - 7 Fases)
Metodología Ágil y Gestión de Sprints
Estándares de Código y Buenas Prácticas
Estrategia de Testing (Unitario, Integración, E2E)
Documentación Técnica y de Usuario
PARTE VII: GESTIÓN DE RIESGOS Y ESCALABILIDAD
Análisis de Riesgos y Planes de Mitigación
Estrategia de Escalabilidad (Vertical y Horizontal)
Plan de Migración a Cloud (Preparación Futura)
Consideraciones de Performance y Optimización
PARTE VIII: UX/UI Y EXPERIENCIA DEL USUARIO
Filosofía de Diseño y Principios UX
Sistema de Design Tokens
Accesibilidad (WCAG 2.1 AA)
Internacionalización y Localización (México)
Estrategia Mobile-First y Responsive
PARTE IX: LANZAMIENTO Y OPERACIONES
Plan de Lanzamiento (Go-Live Strategy)
Estrategia de Adquisición de Usuarios
Métricas de Éxito y KPIs
Plan de Soporte y Mantenimiento
Roadmap Post-Lanzamiento (Meses 4-12)
PARTE X: ANEXOS TÉCNICOS
Glosario de Términos
Referencias y Bibliografía
Checklist de Pre-Lanzamiento
Plantillas de Documentación
Matriz de Decisiones Técnicas
PARTE I: VISIÓN ESTRATÉGICA Y FUNDAMENTOS

1. OBJETIVO GENERAL DEL PROYECTO
   Desarrollar una plataforma web robusta, segura y altamente escalable para la administración integral de finanzas personales, diseñada específicamente para el mercado mexicano, que permita a usuarios individuales, freelancers y pequeñas empresas:

Gestionar todos sus ingresos, egresos y transacciones financieras de manera centralizada
Analizar patrones de gasto y tendencias mediante dashboards inteligentes y visualizaciones dinámicas
Planificar su futuro financiero con presupuestos, metas y proyecciones
Cumplir con obligaciones fiscales mexicanas (preparación para integración SAT)
Tomar decisiones financieras informadas basadas en datos reales y análisis predictivo
1.1 Principios Rectores del Proyecto
Seguridad First: Protección de datos financieros sensibles como prioridad máxima, cumpliendo estándares bancarios.

Simplicidad Inteligente: Interfaz intuitiva que oculta la complejidad técnica, accesible para usuarios no técnicos.

México-Centric: Diseñado desde cero para el contexto fiscal, bancario y cultural mexicano.

Escalabilidad desde Día 1: Arquitectura preparada para crecer de 100 a 100,000 usuarios sin refactorización mayor.

Performance Obsesivo: Carga <3 segundos, interacciones <500ms, experiencia fluida en dispositivos de gama media.

Privacy by Design: Los datos del usuario le pertenecen, nunca se venden ni comparten sin consentimiento explícito.

2. OBJETIVOS ESPECÍFICOS (150+ REQUISITOS INTEGRADOS)
   2.1 Gestión Financiera Core (30 Objetivos)
   OBJ-001 — Permitir registro manual de ingresos con múltiples atributos (monto, fecha, categoría, etiquetas, notas, recurrencia).

OBJ-002 — Permitir registro manual de egresos con todos los atributos de ingresos más método de pago.

OBJ-003 — Crear, editar y eliminar categorías personalizadas con iconos y colores configurables.

OBJ-004 — Soportar jerarquía de categorías (padre-hijo) hasta 3 niveles de profundidad.

OBJ-005 — Implementar sistema de etiquetas flexible para clasificación cruzada (tags).

OBJ-006 — Registrar múltiples cuentas financieras por usuario (efectivo, bancos, inversiones, criptomonedas).

OBJ-007 — Permitir transferencias entre cuentas propias sin afectar balance global.

OBJ-008 — Calcular balance automático por cuenta en tiempo real.

OBJ-009 — Calcular patrimonio neto (net worth) = Activos - Pasivos.

OBJ-010 — Registrar deudas con acreedor, monto, tasa de interés, fecha de vencimiento.

OBJ-011 — Calcular amortización de deudas y generar tabla de pagos.

OBJ-012 — Registrar inversiones con rentabilidad, fecha de inicio, vencimiento.

OBJ-013 — Soportar múltiples monedas con conversión automática (MXN, USD, EUR).

OBJ-014 — Permitir transacciones recurrentes (diarias, semanales, quincenales, mensuales, anuales).

OBJ-015 — Automatizar creación de transacciones recurrentes con jobs programados.

OBJ-016 — Permitir pausar/reanudar transacciones recurrentes.

OBJ-017 — Registrar gastos compartidos con división automática entre participantes.

OBJ-018 — Calcular quién debe a quién en gastos compartidos (algoritmo de minimización).

OBJ-019 — Permitir adjuntar recibos/comprobantes en formato imagen (JPG, PNG) hasta 5MB.

OBJ-020 — Extraer texto de recibos con OCR básico (monto, fecha, comercio).

OBJ-021 — Buscar transacciones por texto completo (descripción, notas, comercio).

OBJ-022 — Filtrar transacciones por múltiples criterios (rango de fechas, categorías, cuentas, etiquetas).

OBJ-023 — Exportar transacciones filtradas a CSV, Excel, PDF.

OBJ-024 — Importar transacciones desde CSV/Excel con validación de formato.

OBJ-025 — Detectar transacciones duplicadas durante importación (mismo monto + fecha ± 1 día).

OBJ-026 — Permitir edición masiva de transacciones (cambiar categoría de 50 registros a la vez).

OBJ-027 — Implementar papelera de reciclaje (soft delete) con recuperación dentro de 30 días.

OBJ-028 — Registrar historial de cambios en transacciones (audit trail).

OBJ-029 — Permitir notas privadas en transacciones que no se incluyan en reportes compartidos.

OBJ-030 — Calcular promedio de gasto/ingreso por categoría, día de semana, mes.

2.2 Análisis y Reportes (25 Objetivos)
OBJ-031 — Dashboard principal con KPIs: balance actual, ingresos del mes, egresos del mes, ahorro del mes, tendencia vs. mes anterior.

OBJ-032 — Gráfica de evolución de balance (línea temporal) con zoom interactivo.

OBJ-033 — Gráfica de distribución de gastos por categoría (pie chart) con drill-down.

OBJ-034 — Gráfica de comparación ingresos vs egresos mensual (barras agrupadas).

OBJ-035 — Gráfica de tendencias de categorías específicas a lo largo del tiempo.

OBJ-036 — Identificar categorías con mayor crecimiento de gasto (alertas proactivas).

OBJ-037 — Calcular tasa de ahorro mensual (% de ingresos no gastados).

OBJ-038 — Proyectar balance futuro basado en promedios históricos y recurrencias.

OBJ-039 — Generar reporte mensual automático con resumen ejecutivo y gráficas.

OBJ-040 — Enviar reporte mensual por correo automáticamente (opt-in).

OBJ-041 — Comparar mes actual vs mismo mes año anterior (year-over-year).

OBJ-042 — Identificar gastos anómalos (outliers) usando desviación estándar.

OBJ-043 — Mostrar top 10 gastos del mes ordenados por monto.

OBJ-044 — Calcular gasto promedio diario y proyectar fin de mes.

OBJ-045 — Analizar estacionalidad de gastos (más alto en diciembre, etc.).

OBJ-046 — Generar reporte de flujo de caja (cash flow) por periodo.

OBJ-047 — Calcular ROI (Return on Investment) de inversiones registradas.

OBJ-048 — Exportar cualquier reporte a PDF con marca de agua personalizable.

OBJ-049 — Programar generación automática de reportes (semanal, mensual).

OBJ-050 — Compartir reportes con terceros vía link temporal (expire en 7 días).

OBJ-051 — Comparar desempeño financiero vs promedios anónimos de otros usuarios (opt-in).

OBJ-052 — Visualizar net worth histórico (crecimiento de patrimonio).

OBJ-053 — Dashboard de deudas con timeline de pagos y monto pendiente.

OBJ-054 — Calcular intereses pagados en deudas vs intereses ganados en inversiones.

OBJ-055 — Generar reporte fiscal simplificado (preparación para declaración anual).

2.3 Presupuestos y Metas (20 Objetivos)
OBJ-056 — Crear presupuestos por categoría con límite mensual.

OBJ-057 — Calcular progreso de presupuesto en tiempo real (% gastado).

OBJ-058 — Alertar cuando se alcance 80% del presupuesto de una categoría.

OBJ-059 — Alertar cuando se exceda 100% del presupuesto.

OBJ-060 — Permitir presupuestos flexibles que "ruedan" el sobrante al mes siguiente.

OBJ-061 — Crear presupuestos globales (límite total de gastos del mes).

OBJ-062 — Comparar gasto real vs presupuestado con varianza (±%).

OBJ-063 — Sugerir ajustes de presupuesto basados en patrones históricos.

OBJ-064 — Crear metas de ahorro con monto objetivo y fecha límite.

OBJ-065 — Calcular cuánto ahorrar mensualmente para alcanzar meta.

OBJ-066 — Mostrar progreso de metas con barra visual y proyección.

OBJ-067 — Permitir aportes manuales a metas desde cualquier cuenta.

OBJ-068 — Automatizar aportes a metas (transferir X% de ingresos automáticamente).

OBJ-069 — Notificar cuando se alcance una meta (celebración UX).

OBJ-070 — Crear metas con múltiples hitos (ej: meta de $100K en 3 etapas).

OBJ-071 — Sugerir metas basadas en perfil de usuario (emergency fund = 6 meses de gastos).

OBJ-072 — Calcular tiempo estimado para alcanzar meta basado en tasa de ahorro actual.

OBJ-073 — Permitir metas compartidas entre múltiples usuarios (ej: pareja ahorra para vacaciones).

OBJ-074 — Visualizar todas las metas en un roadmap temporal.

OBJ-075 — Exportar plan de ahorro con calendario de aportes.

2.4 Autenticación y Seguridad (20 Objetivos)
OBJ-076 — Registro de usuario con email y contraseña segura (min 12 caracteres, mayúsculas, números, símbolos).

OBJ-077 — Login con email/contraseña y generación de JWT access token (15 min).

OBJ-078 — Implementar refresh token con rotación automática.

OBJ-079 — Logout que invalida refresh token del servidor.

OBJ-080 — Recuperación de contraseña con token temporal (expire en 1 hora).

OBJ-081 — Cambio de contraseña con validación de contraseña actual.

OBJ-082 — Forzar cambio de contraseña cada 90 días (configurable).

OBJ-083 — Implementar autenticación de dos factores (2FA) con TOTP (Google Authenticator).

OBJ-084 — Generar códigos de backup para 2FA (10 códigos de uso único).

OBJ-085 — Registrar sesiones activas del usuario con device, IP, fecha.

OBJ-086 — Permitir cerrar sesiones remotas desde cualquier dispositivo.

OBJ-087 — Notificar por email cuando haya login desde dispositivo nuevo.

OBJ-088 — Implementar rate limiting: max 5 intentos de login fallidos, luego bloqueo temporal 15 min.

OBJ-089 — Detectar patrones de acceso sospechosos (login desde 2 países en <1 hora).

OBJ-090 — Cifrar datos sensibles en BD (contraseñas con bcrypt, tokens con AES-256).

OBJ-091 — Implementar CSRF protection con tokens en formularios.

OBJ-092 — Sanitizar todas las entradas de usuario (prevención XSS).

OBJ-093 — Usar prepared statements para prevenir SQL injection.

OBJ-094 — Implementar Content Security Policy (CSP) headers.

OBJ-095 — Auditar todos los accesos a datos financieros en tabla audit_log.

2.5 Gestión de Perfil y Configuración (15 Objetivos)
OBJ-096 — Editar perfil: nombre, foto, email, teléfono.

OBJ-097 — Configurar moneda principal (MXN por defecto).

OBJ-098 — Configurar zona horaria (America/Mexico_City por defecto).

OBJ-099 — Configurar inicio de mes fiscal (día 1 o día de pago).

OBJ-100 — Activar/desactivar notificaciones por email.

OBJ-101 — Configurar frecuencia de reportes automáticos (nunca, semanal, mensual).

OBJ-102 — Activar modo oscuro/claro (persistir preferencia).

OBJ-103 — Configurar idioma (Español México por defecto, preparación para inglés).

OBJ-104 — Configurar formato de números (separador de miles, decimales).

OBJ-105 — Configurar formato de fechas (DD/MM/AAAA por defecto).

OBJ-106 — Exportar todos los datos del usuario (GDPR/LFPDPPP compliance).

OBJ-107 — Eliminar cuenta permanentemente con confirmación doble.

OBJ-108 — Descargar historial de actividad (audit log personal).

OBJ-109 — Configurar recordatorios personalizados (ej: "revisa gastos cada viernes").

OBJ-110 — Permitir conexión con cuentas de Google/Facebook (OAuth2) - Fase 2.

2.6 Notificaciones y Comunicación (15 Objetivos)
OBJ-111 — Enviar notificación por email cuando se cree una transacción (opt-in).

OBJ-112 — Notificar cuando se alcance 80% de presupuesto.

OBJ-113 — Notificar cuando se exceda presupuesto.

OBJ-114 — Notificar cuando se alcance meta de ahorro.

OBJ-115 — Enviar recordatorio de transacciones recurrentes pendientes.

OBJ-116 — Notificar cuando una deuda esté próxima a vencer (7 días antes).

OBJ-117 — Enviar resumen semanal de actividad financiera (opt-in).

OBJ-118 — Notificar cuando haya gastos anómalos detectados.

OBJ-119 — Alertar cuando el balance de una cuenta sea negativo.

OBJ-120 — Notificar cuando se detecte login sospechoso.

OBJ-121 — Enviar notificación cuando se cambie contraseña.

OBJ-122 — Recordar cambio de contraseña próximo a expirar (7 días antes).

OBJ-123 — Implementar sistema de notificaciones in-app (campana en navbar).

OBJ-124 — Marcar notificaciones como leídas/no leídas.

OBJ-125 — Archivar notificaciones antiguas (>30 días).

2.7 Colaboración y Multi-Usuario (10 Objetivos)
OBJ-126 — Permitir invitar a otro usuario a ver cuenta compartida (solo lectura).

OBJ-127 — Permitir co-administración de cuenta (ambos pueden editar).

OBJ-128 — Definir permisos granulares (puede ver, puede crear, puede editar, puede eliminar).

OBJ-129 — Registrar quién hizo cada cambio en transacciones compartidas.

OBJ-130 — Notificar a co-administradores cuando se creen transacciones grandes (>$5,000 MXN).

OBJ-131 — Permitir comentarios en transacciones compartidas (hilo de conversación).

OBJ-132 — Crear grupos para gastos compartidos (ej: viaje con amigos).

OBJ-133 — Calcular balance de quién debe a quién en grupo.

OBJ-134 — Generar reporte de gastos compartidos para dividir cuentas.

OBJ-135 — Enviar solicitud de pago a participantes de gasto compartido (link de pago futuro).

2.8 Integración Bancaria y Automati...existing code...
OBJ-136 — Preparar arquitectura para conexión con Open Banking (Belvo, Finerio) - Fase 2.

OBJ-137 — Sincronizar transacciones bancarias automáticamente vía API - Fase 2.

OBJ-138 — Categorizar transacciones importadas con IA básica (ML) - Fase 2.

OBJ-139 — Detectar transacciones duplicadas entre importación manual y bancaria.

OBJ-140 — Permitir reglas de categorización automática ("si descripción contiene X, categoría Y").

OBJ-141 — Sugerir categorías basadas en historial del usuario.

OBJ-142 — Integración con SAT para descarga de CFDI (preparación) - Fase 3.

OBJ-143 — Validar RFC mexicano en registro de transacciones.

OBJ-144 — Generar pre-llenado de declaración anual SAT - Fase 3.

OBJ-145 — Calcular ISR estimado basado en ingresos registrados - Fase 3.

2.9 Performance y UX (10 Objetivos)
OBJ-146 — Cargar página principal en <3 segundos en conexión 3G.

OBJ-147 — Responder a interacciones del usuario en <500ms (clicks, inputs).

OBJ-148 — Implementar lazy loading en listados de transacciones (paginación infinita).

OBJ-149 — Cachear datos frecuentemente accedidos en Redis (balance, categorías).

OBJ-150 — Optimizar queries PostgreSQL con índices en columnas frecuentes (user_id, date).

2.10 Extras Identificados del Contexto "Claude_estudialo" (20+ Objetivos)
OBJ-151 — Implementar sistema de sobres digitales (envelope budgeting).

OBJ-152 — Gamificación: otorgar badges por logros financieros (first $10K saved, etc.).

OBJ-153 — Calculadora de inversiones (proyección de rendimiento compuesto).

OBJ-154 — Calculadora de deudas (cuánto ahorrar pagando deuda vs invertir).

OBJ-155 — Simulador de retiro (cuánto necesito ahorrar para retirarme).

OBJ-156 — Dashboard de salud financiera (score 0-100 basado en ratios).

OBJ-157 — Recomendaciones personalizadas basadas en perfil ("reduce gastos en restaurantes 15%").

OBJ-158 — Modo viajes: registrar gastos en moneda extranjera con conversión automática.

OBJ-159 — Integración con WhatsApp para registro rápido de gastos (bot) - Fase 3.

OBJ-160 — Integración con Telegram para notificaciones y comandos - Fase 3.

OBJ-161 — API pública para desarrolladores (rate limited) - Fase 3.

OBJ-162 — Webhooks para integración con otras apps (Zapier, IFTTT) - Fase 3.

OBJ-163 — Exportar datos en formato QIF (Quicken Interchange Format).

OBJ-164 — Importar datos de otras apps financieras (YNAB, Mint, Fintonic).

OBJ-165 — Modo offline con sincronización diferida (PWA) - Fase 2.

OBJ-166 — Registro de activos físicos (casa, carro, electrónicos) para cálculo de net worth.

OBJ-167 — Registro de seguros con fecha de renovación y prima.

OBJ-168 — Calculadora de emergency fund (6 meses de gastos fijos).

OBJ-169 — Análisis de gastos hormiga (micro-gastos que suman mucho).

OBJ-170 — Comparar gastos vs percentiles de población similar (edad, ingresos).

3. ALCANCE DEL PROYECTO
   3.1 Dentro del Alcance (In-Scope)
   Plataforma 100% Web:

Aplicación web progresiva (PWA) accesible desde cualquier navegador moderno
Sin necesidad de instalación en tiendas de apps
Funcionalidad completa en desktop, tablets y móviles
Diseño Responsive:

Mobile-first design
Breakpoints: 320px (móvil), 768px (tablet), 1024px (desktop), 1440px+ (wide)
Todos los features accesibles en todos los tamaños de pantalla
Infraestructura Escalable en VPS:

Deployment en VPS Hostinger (4 vCPU, 16GB RAM, 200GB NVMe)
PostgreSQL en la nube (Supabase, Railway o similar)
Redis en el mismo VPS (caché y sesiones)
Nginx como reverse proxy y load balancer
Backend Robusto:

API REST completamente versionada (/api/v1)
Autenticación JWT con refresh tokens
Rate limiting y seguridad desde día 1
Preparado para escalar horizontalmente si es necesario
Frontend Moderno:

Vue 3 con Composition API
Nuxt 3 con SSR (Server-Side Rendering) para SEO
SCSS para estilos con metodología BEM
Componentes reutilizables y atomic design
Seguridad Nivel Bancario:

HTTPS obligatorio con certificados SSL/TLS 1.3
Encriptación de datos sensibles en BD
Auditoría completa de accesos
Compliance con LFPDPPP (Ley Federal de Protección de Datos Personales)
Testing Comprehensivo:

Unitarios (Jest/Vitest) >80% coverage
Integración (Supertest)
End-to-End (Cypress/Playwright)
Performance testing (Lighthouse, WebPageTest)
Documentación Completa:

Swagger/OpenAPI para API
Storybook para componentes Vue
Guías de usuario y videos tutoriales
Runbooks para operaciones
3.2 Fuera del Alcance (Out-of-Scope) para los 3 Meses Iniciales
Apps Móviles Nativas:

NO se desarrollará app iOS ni Android nativa
La web es responsive y funciona perfectamente en móviles
Preparación arquitectónica para futuras apps, pero no se construyen ahora
Integraciones Avanzadas (Fase 2+):

Open Banking (Belvo, Finerio) - se prepara arquitectura, pero no se implementa
Conexión directa con SAT - se deja endpoint preparado
Integración con bancos específicos
WhatsApp/Telegram bots
Features de Comunidad:

Foro de usuarios
Comparación social de finanzas
Marketplace de servicios financieros
Procesamiento de Pagos:

NO se procesarán pagos reales en el MVP
Se puede agregar Stripe/MercadoPago en Fase 2
Machine Learning Avanzado:

Categorización automática con IA básica (reglas)
ML completo para predicciones en Fase 2
3.3 Preparación para Futuro (Future-Proof Architecture)
Aunque NO se construye ahora, la arquitectura DEBE estar preparada para:

APIs Móviles:

Backend diseñado como API-first
Todos los endpoints documentados y versionados
JWT funciona igual para web y futuras apps
Microservicios:

Backend modular que puede dividirse en servicios independientes
Comunicación vía eventos (EventEmitter / Redis Pub/Sub)
Multi-tenancy:

Aunque inicialmente es B2C, la BD está diseñada para soportar organizaciones en el futuro
Internacionalización:

Preparación de i18n desde día 1 (aunque solo español México en MVP) 4. ANÁLISIS DEL MERCADO MEXICANO Y PROPUESTA DE VALOR
4.1 Contexto del Mercado Financiero Personal en México (2025)
Tamaño del Mercado:

129 millones de habitantes
75 millones de usuarios de internet
45 millones de usuarios de banca en línea
Solo 37% de adultos tiene educación financiera formal
Problemáticas Identificadas:

68% de mexicanos no lleva un control formal de sus finanzas
52% no sabe cuánto gasta al mes
73% no tiene presupuesto mensual
61% vive quincena a quincena (sin ahorro)
Falta de herramientas gratuitas y en español mexicano
Competencia Actual:

Fintonic: Enfocada en conexión bancaria, UX compleja
Monefy: Móvil only, no tiene reportes avanzados
Wallet: Muy básica, sin análisis
YNAB: Caro ($14.99 USD/mes), en inglés, no adaptado a México
Oportunidad:

Ningún competidor ofrece análisis profundo + UX simple + gratis (freemium)
Nicho desatendido: Freelancers y emprendedores mexicanos que necesitan control pero no quieren pagar Quickbooks
4.2 Propuesta de Valor Única
Para el Usuario Individual:

"Toma control de tu dinero en 5 minutos. Sin apps que descargar, sin curva de aprendizaje, sin letra chica. Tu dinero, tus reglas."

Para Freelancers/Emprendedores:

"Lleva la contabilidad de tu negocio sin pagar miles de pesos en software. Prepárate para el SAT con reportes fiscales simplificados."

Diferenciadores Clave:

100% Web — No ocupas espacio en tu celular, funciona en cualquier dispositivo
Español Mexicano — Diseñado para México (pesos, fiscalía local, cultura)
Freemium — Gratis hasta 100 transacciones/mes, luego $99 MXN/mes
Simple pero Poderoso — Interfaz como Netflix, análisis como Excel
Seguro — Tus datos financieros nunca se venden ni comparten
4.3 Segmentos de Usuarios Objetivo
Segmento Primario (60%): Jóvenes Profesionales 25-35 años

Ingresos: $15,000 - $35,000 MXN/mes
Buscan: Control de gastos hormiga, ahorrar para metas (casa, carro)
Pain point: Apps complicadas, no saben en qué se les va el dinero
Segmento Secundario (25%): Freelancers/Emprendedores 28-40 años

Ingresos variables: $20,000 - $60,000 MXN/mes
Buscan: Separar finanzas personales de negocio, preparar declaración SAT
Pain point: Quickbooks es caro, Excel es tedioso
Segmento Terciario (15%): Familias 35-50 años

Ingresos: $25,000 - $50,000 MXN/mes
Buscan: Controlar gastos familiares, enseñar finanzas a hijos
Pain point: No tienen tiempo para apps complicadas 5. MODELO DE NEGOCIO Y MONETIZACIÓN
5.1 Estrategia Freemium
Tier Gratuito (Forever Free):

Hasta 100 transacciones/mes
3 cuentas bancarias
Categorías ilimitadas
Reportes básicos (mensual)
1 presupuesto activo
3 metas de ahorro
Soporte por email (48h)
Tier Premium ($99 MXN/mes o $999/año con 15% descuento):

Transacciones ilimitadas
Cuentas ilimitadas
Reportes avanzados (personalizados, exportables)
Presupuestos ilimitados
Metas ilimitadas
Conexión bancaria automática (Fase 2)
Soporte prioritario (12h)
Exportación a SAT (Fase 3)
Modo colaborativo (invitar a pareja)
Tier Business ($299 MXN/mes) - Fase 2:

Todo lo de Premium
Multi-usuario (hasta 3)
Facturación básica (integración PAC)
Reportes fiscales SAT
API access (10,000 llamadas/mes)
5.2 Fuentes de Ingreso Adicionales (Fase 2+)
Comisiones por Referidos:

Referir a usuarios a productos financieros (tarjetas, inversiones)
Comisión por conversión (modelo afiliado)
Contenido Premium:

Cursos de educación financiera
Plantillas de presupuestos avanzadas
Consultoría financiera personal
White-Label:

Licenciar plataforma a bancos/fintechs mexicanas
5.3 Unit Economics Proyectados
Costo de Adquisición de Cliente (CAC):

Orgánico (SEO, redes): $50 MXN
Paid (Facebook Ads): $150 MXN
CAC blended: $80 MXN
Lifetime Value (LTV):

Conversión Free → Premium: 15%
Churn mensual Premium: 5%
Vida promedio Premium: 20 meses
LTV = $99 × 20 × 0.15 = $297 MXN
LTV/CAC = 3.7x ✅ (target >3x)
Break-even:

Con 1,000 usuarios activos (150 premium)
Ingresos: $14,850 MXN/mes
Costos: ~$10,000 MXN/mes (servidor $2K + herramientas $3K + soporte $5K)
Profit margin: ~30%
PARTE II: REQUISITOS DEL SISTEMA 6. REQUISITOS FUNCIONALES (RF-001 a RF-150+)
6.1 Módulo de Autenticación y Usuarios
RF-001 — El sistema DEBE permitir registro de nuevos usuarios con email y contraseña.

Validación: Email formato válido, contraseña min 12 caracteres
Confirmación: Email de verificación enviado al registrarse
RF-002 — El sistema DEBE validar fortaleza de contraseña (min 12 caracteres, 1 mayúscula, 1 número, 1 símbolo).

RF-003 — El sistema DEBE enviar email de confirmación con link de activación (expire en 24h).

RF-004 — El sistema DEBE permitir login con email/contraseña verificada.

RF-005 — El sistema DEBE generar JWT access token con expiración de 15 minutos.

RF-006 — El sistema DEBE generar refresh token con expiración de 7 días y almacenarlo en BD.

RF-007 — El sistema DEBE permitir renovación de access token usando refresh token válido.

RF-008 — El sistema DEBE rotar refresh token cada vez que se use (refresque token rotation).

RF-009 — El sistema DEBE invalidar refresh token al hacer logout.

RF-010 — El sistema DEBE implementar "recuperar contraseña" con token temporal (1 hora).

RF-011 — El sistema DEBE permitir cambio de contraseña validando la actual.

RF-012 — El sistema DEBE forzar cambio de contraseña cada 90 días (configurable por admin).

RF-013 — El sistema DEBE implementar 2FA con TOTP (compatible con Google Authenticator).

RF-014 — El sistema DEBE generar 10 códigos de backup para 2FA durante activación.

RF-015 — El sistema DEBE validar código 2FA antes de permitir acceso si está activado.

RF-016 — El sistema DEBE registrar todas las sesiones activas (device, IP, user agent, fecha).

RF-017 — El sistema DEBE permitir al usuario ver sesiones activas y cerrar cualquiera remotamente.

RF-018 — El sistema DEBE enviar email de alerta cuando se detecte login desde dispositivo nuevo.

RF-019 — El sistema DEBE implementar rate limiting: máximo 5 intentos fallidos de login, luego bloqueo 15 min.

RF-020 — El sistema DEBE detectar patrones sospechosos (login desde 2 países en <1 hora) y requerir verificación adicional.

6.2 Módulo de Gestión de Perfil
RF-021 — El sistema DEBE permitir editar perfil: nombre completo, foto (max 2MB, JPG/PNG), teléfono.

RF-022 — El sistema DEBE validar formato de teléfono mexicano (10 dígitos, opcional +52).

RF-023 — El sistema DEBE redimensionar foto de perfil a 200x200px automáticamente.

RF-024 — El sistema DEBE permitir cambio de email con verificación del nuevo email.

RF-025 — El sistema DEBE permitir configurar moneda principal (MXN por defecto, soportar USD, EUR).

RF-026 — El sistema DEBE permitir configurar zona horaria (America/Mexico_City por defecto).

RF-027 — El sistema DEBE permitir configurar día de inicio de mes fiscal (1-31).

RF-028 — El sistema DEBE permitir activar/desactivar notificaciones por email globalmente.

RF-029 — El sistema DEBE permitir configurar frecuencia de reportes automáticos (nunca, semanal, quincenal, mensual).

RF-030 — El sistema DEBE persistir preferencia de modo oscuro/claro en BD.

6.3 Módulo de Cuentas Financieras
RF-031 — El sistema DEBE permitir crear cuentas con: nombre, tipo (efectivo, banco, inversión, cripto), moneda, balance inicial.

RF-032 — El sistema DEBE validar tipos de cuenta: {CASH, BANK, INVESTMENT, CRYPTO, CREDIT_CARD, SAVINGS}.

RF-033 — El sistema DEBE permitir editar nombre, tipo y moneda de cuenta (no balance, se calcula).

RF-034 — El sistema DEBE permitir archivar cuentas (no eliminar, soft delete).

RF-035 — El sistema DEBE calcular balance actual de cuenta sumando transacciones.

RF-036 — El sistema DEBE mostrar balance de cuenta en su moneda y en moneda principal del usuario.

RF-037 — El sistema DEBE permitir marcar cuenta como "incluir en balance total" o "excluir" (ej: excluir deudas).

RF-038 — El sistema DEBE soportar máximo 50 cuentas por usuario (límite configurable).

RF-039 — El sistema DEBE ordenar cuentas por balance descendente por defecto.

RF-040 — El sistema DEBE permitir reordenar cuentas manualmente (drag & drop).

6.4 Módulo de Categorías y Etiquetas
RF-041 — El sistema DEBE crear categorías predeterminadas al registrar usuario: Alimentación, Transporte, Vivienda, Entretenimiento, Salud, Educación, Otros.

RF-042 — El sistema DEBE permitir crear categorías personalizadas con: nombre, ícono (emoji), color (hex).

RF-043 — El sistema DEBE soportar categorías padre-hijo (máximo 3 niveles de profundidad).

RF-044 — El sistema DEBE validar que categoría hija no sea padre de sí misma (prevenir loops).

RF-045 — El sistema DEBE permitir editar nombre, ícono, color de categorías.

RF-046 — El sistema DEBE permitir eliminar categorías sin transacciones asociadas.

RF-047 — El sistema DEBE prevenir eliminación de categorías con transacciones, ofreciendo reasignar a otra categoría.

RF-048 — El sistema DEBE soportar máximo 100 categorías por usuario.

RF-049 — El sistema DEBE permitir crear etiquetas (tags) con solo nombre (ej: "urgente", "deducible", "reembolsable").

RF-050 — El sistema DEBE permitir asignar múltiples etiquetas a una transacción.

6.5 Módulo de Transacciones (Core)
RF-051 — El sistema DEBE permitir registrar ingreso con: monto, fecha, cuenta, categoría, descripción (opcional), notas (opcional).

RF-052 — El sistema DEBE permitir registrar egreso con: monto, fecha, cuenta origen, categoría, método de pago, descripción, notas.

RF-053 — El sistema DEBE validar método de pago: {CASH, DEBIT_CARD, CREDIT_CARD, TRANSFER, CHECK, OTHER}.

RF-054 — El sistema DEBE permitir registrar transferencia entre cuentas propias sin afectar balance total.

RF-055 — El sistema DEBE validar que en transferencias, cuenta origen ≠ cuenta destino.

RF-056 — El sistema DEBE permitir adjuntar imagen de recibo (JPG, PNG, max 5MB).

RF-057 — El sistema DEBE comprimir imágenes a 1920px de ancho máximo automáticamente.

RF-058 — El sistema DEBE permitir asignar múltiples etiquetas a transacción.

RF-059 — El sistema DEBE permitir marcar transacción como "recurrente" con frecuencia: {DAILY, WEEKLY, BIWEEKLY, MONTHLY, YEARLY}.

RF-060 — El sistema DEBE crear automáticamente transacciones recurrentes mediante job scheduler (cron).

RF-061 — El sistema DEBE permitir pausar transacción recurrente sin eliminarla.

RF-062 — El sistema DEBE permitir editar transacción cambiando cualquier campo.

RF-063 — El sistema DEBE registrar historial de cambios (audit trail) al editar transacción.

RF-064 — El sistema DEBE permitir eliminar transacción (soft delete con papelera 30 días).

RF-065 — El sistema DEBE permitir recuperar transacciones eliminadas desde papelera.

RF-066 — El sistema DEBE purgar transacciones en papelera después de 30 días automáticamente.

RF-067 — El sistema DEBE validar monto > 0 y ≤ $10,000,000 MXN.

RF-068 — El sistema DEBE validar fecha no sea futura (excepto si es transacción programada).

RF-069 — El sistema DEBE permitir buscar transacciones por texto completo (descripción, notas).

RF-070 — El sistema DEBE permitir filtrar transacciones por: rango de fechas, tipo, cuentas, categorías, etiquetas, monto mín/máx.

6.6 Módulo de Transacciones Avanzadas
RF-071 — El sistema DEBE permitir importar transacciones desde CSV con validación de formato.

RF-072 — El sistema DEBE detectar transacciones duplicadas (mismo monto + fecha ± 1 día + cuenta).

RF-073 — El sistema DEBE mostrar vista previa de transacciones antes de confirmar importación.

RF-074 — El sistema DEBE permitir edición masiva: seleccionar múltiples transacciones y cambiar categoría/etiqueta.

RF-075 — El sistema DEBE permitir exportar transacciones filtradas a CSV, Excel, PDF.

RF-076 — El sistema DEBE aplicar OCR básico a recibos adjuntos para extraer: monto, fecha, comercio.

RF-077 — El sistema DEBE sugerir categoría basada en descripción usando reglas del usuario.

RF-078 — El sistema DEBE calcular promedios: gasto diario, semanal, mensual por categoría.

RF-079 — El sistema DEBE calcular tendencias: incremento/decremento % vs periodo anterior.

RF-080 — El sistema DEBE identificar gastos anómalos (outliers) usando desviación estándar (>2σ).

6.7 Módulo de Presupuestos
RF-081 — El sistema DEBE permitir crear presupuesto por categoría con: monto límite, periodo (mensual, trimestral, anual).

RF-082 — El sistema DEBE calcular progreso de presupuesto en tiempo real (% gastado).

RF-083 — El sistema DEBE mostrar barra de progreso visual con colores: verde (<80%), amarillo (80-100%), rojo (>100%).

RF-084 — El sistema DEBE enviar notificación cuando presupuesto alcance 80%.

RF-085 — El sistema DEBE enviar notificación cuando presupuesto se exceda 100%.

RF-086 — El sistema DEBE permitir presupuestos "flexibles" que ruedan sobrante al siguiente periodo.

RF-087 — El sistema DEBE permitir crear presupuesto global (límite total de gastos del periodo).

RF-088 — El sistema DEBE comparar gasto real vs presupuestado con varianza (monto y %).

RF-089 — El sistema DEBE sugerir ajustes de presupuesto basados en promedio de últimos 3 meses.

RF-090 — El sistema DEBE permitir copiar presupuesto de un mes a otro.

6.8 Módulo de Metas de Ahorro
RF-091 — El sistema DEBE permitir crear meta con: nombre, monto objetivo, fecha límite (opcional), cuenta destino.

RF-092 — El sistema DEBE calcular cuánto ahorrar mensualmente/semanalmente para alcanzar meta a tiempo.

RF-093 — El sistema DEBE mostrar progreso de meta con barra visual y porcentaje.

RF-094 — El sistema DEBE proyectar fecha estimada de cumplimiento basada en tasa de ahorro actual.

RF-095 — El sistema DEBE permitir aportes manuales a meta desde cualquier cuenta.

RF-096 — El sistema DEBE permitir aportes automáticos (transferir X% de ingresos a meta).

RF-097 — El sistema DEBE notificar cuando meta se cumpla con celebración UX (confetti animation).

RF-098 — El sistema DEBE permitir metas con múltiples hitos (ej: $10K, $20K, $50K).

RF-099 — El sistema DEBE sugerir metas basadas en perfil: emergency fund = 6 meses de gastos promedio.

RF-100 — El sistema DEBE visualizar todas las metas en timeline temporal.

6.9 Módulo de Deudas
RF-101 — El sistema DEBE permitir registrar deuda con: acreedor, monto inicial, tasa de interés anual, fecha de inicio, plazo (meses).

RF-102 — El sistema DEBE calcular tabla de amortización con pagos mensuales (capital + intereses).

RF-103 — El sistema DEBE mostrar monto pendiente actualizado en tiempo real al registrar pagos.

RF-104 — El sistema DEBE calcular intereses totales que se pagarán al final del plazo.

RF-105 — El sistema DEBE notificar cuando pago de deuda esté próximo a vencer (7 días antes).

RF-106 — El sistema DEBE permitir registrar pagos adelantados y recalcular tabla de amortización.

RF-107 — El sistema DEBE mostrar dashboard de deudas con: monto total pendiente, próximo pago, fecha de liquidación estimada.

RF-108 — El sistema DEBE calcular ratio deuda/ingreso mensual.

RF-109 — El sistema DEBE sugerir estrategia de pago: "avalancha" (mayor interés primero) o "bola de nieve" (menor saldo primero).

RF-110 — El sistema DEBE marcar deuda como "liquidada" automáticamente cuando saldo = 0.

6.10 Módulo de Inversiones
RF-111 — El sistema DEBE permitir registrar inversión con: nombre, monto, fecha de compra, tasa de retorno esperada (%), fecha de vencimiento (opcional).

RF-112 — El sistema DEBE calcular valor actual de inversión: monto × (1 + tasa) ^ (años).

RF-113 — El sistema DEBE mostrar ganancia/pérdida absoluta y porcentual.

RF-114 — El sistema DEBE calcular ROI (Return on Investment) = (valor actual - monto inicial) / monto inicial × 100.

RF-115 — El sistema DEBE permitir registrar dividendos/intereses recibidos.

RF-116 — El sistema DEBE sumar inversiones al net worth del usuario.

RF-117 — El sistema DEBE mostrar dashboard de inversiones con: monto total invertido, valor actual, ROI promedio.

RF-118 — El sistema DEBE notificar cuando inversión alcance vencimiento.

RF-119 — El sistema DEBE permitir registrar venta de inversión y calcular ganancia realizada.

RF-120 — El sistema DEBE soportar múltiples tipos de inversión: {STOCKS, BONDS, CRYPTO, REAL_ESTATE, OTHER}.

6.11 Módulo de Dashboard y KPIs
RF-121 — El sistema DEBE mostrar balance actual (suma de todas las cuentas incluidas).

RF-122 — El sistema DEBE mostrar ingresos del mes actual hasta la fecha.

RF-123 — El sistema DEBE mostrar egresos del mes actual hasta la fecha.

RF-124 — El sistema DEBE calcular ahorro del mes = ingresos - egresos.

RF-125 — El sistema DEBE calcular tasa de ahorro = ahorro / ingresos × 100.

RF-126 — El sistema DEBE mostrar tendencia vs mes anterior con % de cambio y flecha (↑↓).

RF-127 — El sistema DEBE mostrar gráfica de evolución de balance (línea temporal, últimos 12 meses).

RF-128 — El sistema DEBE permitir zoom y pan en gráfica de balance.

RF-129 — El sistema DEBE mostrar distribución de gastos por categoría (pie chart) con drill-down.

RF-130 — El sistema DEBE mostrar comparación ingresos vs egresos mensual (barras agrupadas, últimos 6 meses).

6.12 Módulo de Reportes
RF-131 — El sistema DEBE generar reporte mensual con: resumen ejecutivo, gráficas, top 10 gastos, comparación vs mes anterior.

RF-132 — El sistema DEBE permitir generar reporte personalizado seleccionando: periodo, cuentas, categorías, formato (PDF/Excel).

RF-133 — El sistema DEBE enviar reporte mensual automáticamente por email (opt-in).

RF-134 — El sistema DEBE permitir descargar cualquier reporte como PDF con marca de agua personalizable.

RF-135 — El sistema DEBE generar reporte de flujo de caja (cash flow): ingresos, egresos, balance neto por periodo.

RF-136 — El sistema DEBE comparar mes actual vs mismo mes año anterior (year-over-year).

RF-137 — El sistema DEBE identificar tendencias estacionales (ej: gastos más altos en diciembre).

RF-138 — El sistema DEBE calcular gasto promedio diario y proyectar fin de mes.

RF-139 — El sistema DEBE generar reporte fiscal simplificado con: ingresos totales, deducciones, ISR estimado (preparación SAT).

RF-140 — El sistema DEBE permitir compartir reportes vía link temporal (expire en 7 días, protegido con password).

6.13 Módulo de Notificaciones
RF-141 — El sistema DEBE enviar email de bienvenida al registrarse.

RF-142 — El sistema DEBE enviar email de confirmación de cuenta.

RF-143 — El sistema DEBE enviar email cuando se alcance 80% de presupuesto.

RF-144 — El sistema DEBE enviar email cuando se exceda presupuesto.

RF-145 — El sistema DEBE enviar email cuando se alcance meta de ahorro.

RF-146 — El sistema DEBE enviar email de recordatorio de transacciones recurrentes.

RF-147 — El sistema DEBE enviar email cuando deuda esté próxima a vencer.

RF-148 — El sistema DEBE enviar email de resumen semanal/mensual (opt-in).

RF-149 — El sistema DEBE mostrar notificaciones in-app (campana en navbar) con contador.

RF-150 — El sistema DEBE permitir marcar notificaciones como leídas/archivar.

6.14 Requisitos Funcionales Adicionales (RF-151 a RF-170)
RF-151 — El sistema DEBE soportar múltiples monedas con conversión automática usando API de tipos de cambio.

RF-152 — El sistema DEBE actualizar tipos de cambio diariamente con job scheduler.

RF-153 — El sistema DEBE calcular net worth = (activos + inversiones) - deudas.

RF-154 — El sistema DEBE mostrar evolución histórica de net worth (gráfica de línea).

RF-155 — El sistema DEBE permitir registrar gastos compartidos con división automática entre participantes.

RF-156 — El sistema DEBE calcular quién debe a quién en gastos compartidos (algoritmo de minimización de transacciones).

RF-157 — El sistema DEBE permitir comentarios en transacciones (thread de conversación).

RF-158 — El sistema DEBE permitir invitar a otro usuario a co-administrar cuenta.

RF-159 — El sistema DEBE definir permisos granulares (ver, crear, editar, eliminar).

RF-160 — El sistema DEBE registrar quién hizo cada cambio en audit log.

RF-161 — El sistema DEBE permitir exportar todos los datos del usuario (LFPDPPP compliance).

RF-162 — El sistema DEBE permitir eliminar cuenta permanentemente con confirmación doble.

RF-163 — El sistema DEBE implementar sobres digitales (envelope budgeting) con asignación de fondos.

RF-164 — El sistema DEBE otorgar badges por logros financieros (gamificación).

RF-165 — El sistema DEBE incluir calculadora de inversiones con interés compuesto.

RF-166 — El sistema DEBE incluir calculadora de retiro (cuánto ahorrar para jubilarse).

RF-167 — El sistema DEBE calcular score de salud financiera (0-100) basado en ratios.

RF-168 — El sistema DEBE dar recomendaciones personalizadas basadas en perfil.

RF-169 — El sistema DEBE soportar modo viajes con gastos en moneda extranjera.

RF-170 — El sistema DEBE permitir registrar activos físicos (casa, carro) para net worth.

7. REQUISITOS NO FUNCIONALES (RNF-001 a RNF-080+)
   7.1 Performance
   RNF-001 — El sistema DEBE cargar página principal en <3 segundos en conexión 3G (testear con Lighthouse throttling).

RNF-002 — El sistema DEBE responder a interacciones del usuario en <500ms (clicks, inputs).

RNF-003 — El sistema DEBE cargar dashboard en <2 segundos con hasta 1,000 transacciones.

RNF-004 — El sistema DEBE soportar mínimo 100 usuarios concurrentes sin degradación.

RNF-005 — El sistema DEBE cachear datos frecuentemente accedidos (balance, categorías) en Redis con TTL de 5 minutos.

RNF-006 — El sistema DEBE implementar lazy loading en listados de transacciones (pagination o infinite scroll).

RNF-007 — El sistema DEBE comprimir responses HTTP con Gzip/Brotli.

RNF-008 — El sistema DEBE servir assets estáticos con cache headers (max-age=1 año).

RNF-009 — El sistema DEBE optimizar imágenes con formato WebP donde sea soportado.

RNF-010 — El sistema DEBE usar índices en PostgreSQL para queries frecuentes (user_id, date, category_id).

7.2 Seguridad
RNF-011 — El sistema DEBE usar HTTPS con TLS 1.3 en TODAS las conexiones.

RNF-012 — El sistema DEBE usar certificados SSL válidos y renovarlos automáticamente (Let's Encrypt).

RNF-013 — El sistema DEBE hashear contraseñas con bcrypt (cost factor 12).

RNF-014 — El sistema DEBE generar JWT access tokens con expiración de 15 minutos.

RNF-015 — El sistema DEBE generar refresh tokens con expiración de 7 días.

RNF-016 — El sistema DEBE implementar CSRF protection con tokens en formularios.

RNF-017 — El sistema DEBE sanitizar todas las entradas de usuario para prevenir XSS.

RNF-018 — El sistema DEBE usar prepared statements para prevenir SQL injection.

RNF-019 — El sistema DEBE implementar rate limiting: 100 requests/min por IP en endpoints públicos.

RNF-020 — El sistema DEBE implementar rate limiting: 5 intentos/15 min en login.

RNF-021 — El sistema DEBE implementar Content Security Policy (CSP) headers.

RNF-022 — El sistema DEBE implementar X-Frame-Options: DENY header.

RNF-023 — El sistema DEBE implementar X-Content-Type-Options: nosniff header.

RNF-024 — El sistema DEBE implementar Strict-Transport-Security header (HSTS).

RNF-025 — El sistema DEBE auditar todos los accesos a datos financieros en tabla audit_log.

RNF-026 — El sistema DEBE cifrar datos sensibles en BD (tokens, claves de API) con AES-256.

RNF-027 — El sistema DEBE rotar claves de cifrado cada 90 días.

RNF-028 — El sistema DEBE implementar políticas de contraseñas: min 12 caracteres, 1 mayúscula, 1 número, 1 símbolo.

RNF-029 — El sistema DEBE prevenir reutilización de últimas 5 contraseñas.

RNF-030 — El sistema DEBE cerrar sesiones inactivas después de 30 minutos.

7.3 Disponibilidad y Confiabilidad
RNF-031 — El sistema DEBE tener uptime de 99.5% (downtime máximo de 3.65 horas/mes).

RNF-032 — El sistema DEBE realizar backups automáticos diarios de PostgreSQL.

RNF-033 — El sistema DEBE almacenar backups en ubicación geográfica diferente (cloud storage).

RNF-034 — El sistema DEBE probar restauración de backups mensualmente.

RNF-035 — El sistema DEBE tener RTO (Recovery Time Objective) de <2 horas.

RNF-036 — El sistema DEBE tener RPO (Recovery Point Objective) de <24 horas.

RNF-037 — El sistema DEBE implementar health checks en endpoint /health.

RNF-038 — El sistema DEBE reiniciarse automáticamente en caso de crash (process manager como PM2).

RNF-039 — El sistema DEBE registrar errores críticos en sistema de logging centralizado.

RNF-040 — El sistema DEBE notificar al equipo cuando haya errores críticos (alertas Slack/email).

7.4 Escalabilidad
RNF-041 — El sistema DEBE soportar crecimiento a 10,000 usuarios sin refactorización mayor.

La respuesta alcanzó el límite de longitud. Vuelva a formular su mensaje.
RNF-048 — El sistema DEBE implementar particionamiento de tablas grandes por tenant_id o fecha:

RNF-049 — El sistema DEBE usar colas de procesamiento asíncrono (pg-boss) para operaciones pesadas:

Descarga masiva SAT
Generación de reportes PDF
Envío de emails masivos
Procesamiento de importaciones CSV
RNF-050 — El sistema DEBE limitar recursos por tenant para prevenir abuse:

Max 1,000 transacciones por request de importación
Max 50 facturas en timbrado batch
Max 10 descargas SAT simultáneas por tenant
Max 5 reportes generándose simultáneamente por tenant
7.5 Usabilidad y Accesibilidad
RNF-051 — El sistema DEBE cumplir con WCAG 2.1 nivel AA:

Contraste mínimo 4.5:1 para texto normal
Contraste mínimo 3:1 para texto grande (18pt+)
Navegación completa por teclado (Tab, Enter, Escape)
Screen reader compatible (aria-labels, roles semánticos)
RNF-052 — El sistema DEBE soportar modo oscuro con persistencia de preferencia.

RNF-053 — El sistema DEBE ser responsive con breakpoints estándar:

Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Wide: 1440px+
RNF-054 — El sistema DEBE mostrar estados de carga claros:

Skeleton screens para contenido cargando
Progress bars para operaciones largas (>3 segundos)
Spinners solo para operaciones <3 segundos
Mensajes de confirmación en operaciones críticas
RNF-055 — El sistema DEBE implementar feedback visual inmediato (<100ms) en todas las interacciones del usuario.

RNF-056 — El sistema DEBE usar mensajes de error claros y accionables:
❌ Mal: "Error 500"
✅ Bien: "No pudimos conectar con el SAT. Intentaremos automáticamente en 5 minutos. [Reintentar ahora]"

RNF-057 — El sistema DEBE implementar tooltips contextuales en campos complejos (régimen fiscal, uso CFDI, etc.).

RNF-058 — El sistema DEBE mantener estado de formularios en localStorage (prevenir pérdida de datos si se cierra browser).

7.6 Mantenibilidad
RNF-059 — El código DEBE tener >80% de cobertura de tests (unit + integration).

RNF-060 — El código DEBE seguir estándares definidos:

ESLint + Prettier (TypeScript/JavaScript)
Conventional Commits para mensajes de git
Código en inglés, comentarios en español
Máximo 300 líneas por archivo (excepto configs)
RNF-061 — Todas las APIs DEBEN estar documentadas con OpenAPI 3.0 (Swagger).

RNF-062 — Todas las funciones públicas DEBEN tener JSDoc/TSDoc.

RNF-063 — El sistema DEBE tener logs estructurados (JSON) con niveles apropiados:

ERROR: Errores que requieren intervención
WARN: Situaciones anormales pero manejadas
INFO: Eventos importantes del negocio
DEBUG: Información detallada para desarrollo
RNF-064 — El sistema DEBE versionar todas las APIs con prefijo /api/v1, /api/v2, etc.

RNF-065 — El sistema DEBE mantener compatibilidad backward por mínimo 6 meses al deprecar features.

7.7 Compliance y Legal (México)
RNF-066 — El sistema DEBE cumplir con LFPDPPP (Ley Federal de Protección de Datos Personales):

Aviso de privacidad visible y explícito
Consentimiento para tratamiento de datos
Procedimiento ARCO (Acceso, Rectificación, Cancelación, Oposición)
RNF-067 — El sistema DEBE permitir exportación completa de datos del usuario en formato portable (JSON + CSVs).

RNF-068 — El sistema DEBE implementar eliminación de cuenta con:

Confirmación doble (escribir "ELIMINAR")
Período de gracia de 30 días (soft delete)
Purga completa después de 30 días (except audit logs por 7 años)
RNF-069 — El sistema DEBE cumplir con retención legal de CFDI (Artículo 30 CFF):

Mínimo 7 años desde emisión
Inmutabilidad (WORM storage)
No permitir eliminación por usuario
RNF-070 — El sistema DEBE cumplir con Miscelánea Fiscal 2026:

Validación de veracidad de operaciones
Soporte para cancelación extendida hasta declaración anual
Requisitos específicos por sector (hidrocarburos, etc.)
RNF-071 — El sistema DEBE implementar watermarking en reportes PDF con:

Timestamp de generación
Usuario que generó
Hash del contenido (prevenir alteración)
7.8 Monitoreo y Observabilidad
RNF-072 — El sistema DEBE instrumentar todas las operaciones críticas con métricas:

Latencia por endpoint (p50, p95, p99)
Tasa de errores por tipo
Throughput (requests/segundo)
Tasa de éxito de integraciones externas (PAC, SAT, Bank)
RNF-073 — El sistema DEBE implementar distributed tracing para requests cross-service.

RNF-074 — El sistema DEBE tener dashboards de observabilidad para:

Salud del sistema (uptime, latencia, errores)
Métricas de negocio (MRR, nuevos usuarios, churn, timbres/día)
Integración SAT (success rate, tiempo de descarga, errores por categoría)
Integración PAC (circuit breaker state, tasa de éxito, latencia)
RNF-075 — El sistema DEBE implementar alertas automáticas en Datadog/Grafana:

Error rate > 5% por 5 minutos → Alerta HIGH
Latencia p95 > 1000ms por 10 minutos → Alerta MEDIUM
Circuit breaker OPEN por >10 minutos → Alerta CRITICAL
Disco >90% → Alerta CRITICAL
RNF-076 — El sistema DEBE registrar eventos de auditoría para:

Login/logout de usuario
Cambios de permisos
Operaciones financieras críticas (timbrado, descarga SAT)
Intentos de acceso no autorizado (tenant mismatch)
7.9 Internacionalización (Preparación)
RNF-077 — El sistema DEBE estar preparado para i18n aunque solo soporte Español México en PMV:

Todos los strings en archivos de traducción (no hardcoded)
Formato de fechas configurable por locale
Formato de moneda configurable
Timezone aware (UTC en BD, local en UI)
RNF-078 — El sistema DEBE soportar múltiples monedas en BD aunque PMV solo use MXN:

7.10 Extras de Calidad
RNF-079 — El sistema DEBE implementar feature flags para activar/desactivar funcionalidades sin deploy:

RNF-080 — El sistema DEBE tener modo de mantenimiento programado:

Banner visible 48h antes
Página de mantenimiento custom (no 503 genérico)
Estimación de duración
Status updates en tiempo real 8. REQUISITOS DE COMPLIANCE Y REGULACIÓN (MÉXICO)
8.1 Ley Federal de Protección de Datos Personales (LFPDPPP)
COMP-001 — El sistema DEBE publicar Aviso de Privacidad accesible desde cualquier página con:

Identidad y domicilio del responsable
Finalidades del tratamiento de datos
Opciones para limitar uso o divulgación
Medios para ejercer derechos ARCO
Cambios al aviso de privacidad
COMP-002 — El sistema DEBE obtener consentimiento explícito antes de recopilar datos sensibles:

Checkbox obligatorio (no pre-marcado)
Lenguaje claro y simple
Separado de otros términos y condiciones
COMP-003 — El sistema DEBE implementar procedimiento ARCO completo:

Formulario accesible para ejercer derechos
Respuesta en máximo 20 días hábiles
Confirmación por email al recibir solicitud
Verificación de identidad del solicitante
COMP-004 — El sistema DEBE implementar portabilidad de datos:

Exportación completa en formato legible (JSON + CSV)
Incluir: transacciones, facturas, configuración, historial
Disponible en <5 minutos para datasets <10GB
Envío por email cifrado o descarga segura
8.2 Código Fiscal de la Federación (CFF) y Normativa SAT
COMP-005 — El sistema DEBE retener CFDI por mínimo 7 años desde emisión:

Almacenamiento inmutable (WORM)
No permitir eliminación por usuario
Purga automática después de 7 años
Backup offsite con misma retención
COMP-006 — El sistema DEBE validar estructura de CFDI según Anexo 20 SAT vigente:

Schema XSD actualizado (CFDI 4.0 actual, preparación 5.0)
Catálogos SAT actualizados (c_FormaPago, c_UsoCFDI, etc.)
Validación de RFC contra padrón SAT
Validación de relación ClaveProdServ + ClaveUnidad
COMP-007 — El sistema DEBE implementar cancelación de CFDI según Artículo 29-A CFF:

Motivo de cancelación (01-04)
UUID relacionado si es sustitución
Aceptación del receptor (excepto en primeras 72 horas)
Restricción: No cancelar CFDI con complemento de pago
COMP-008 — El sistema DEBE cumplir con Regla 2.7.1.21 (Aceptación/Rechazo):

Workflow de 3 días para aceptar/rechazar facturas recibidas
Notificación al receptor cuando reciba factura
Auto-aceptación si no hay respuesta en 3 días
Registro de todas las decisiones con timestamp
COMP-009 — El sistema DEBE implementar Complemento de Pagos (REP) según Anexo 20:

Relación con CFDI origen (UUID)
Monto pagado + saldo insoluto
Forma de pago + últimos 4 dígitos (si aplica)
Validación: Suma de pagos <= Monto CFDI origen
8.3 Miscelánea Fiscal 2026 (Actualizaciones)
COMP-010 — El sistema DEBE validar veracidad y materialidad de operaciones:

Validación de RFC del receptor contra padrón SAT
Verificación de que RFC no esté en lista negra (69-B, EFOS, EDOS)
Alerta si monto de operación es anómalo para el tipo de negocio
Disclaimer legal: Usuario responsable de veracidad
COMP-011 — El sistema DEBE soportar extensión de cancelación hasta declaración anual:

CFDI emitidos en 2025 pueden cancelarse hasta Abril 2026 (personas físicas)
CFDI emitidos en 2025 pueden cancelarse hasta Marzo 2026 (personas morales)
Validación de período permitido antes de cancelar
COMP-012 — El sistema DEBE implementar requisitos específicos por sector:

Hidrocarburos: Número de permiso obligatorio en CFDI
Preparación para futuros sectores regulados
COMP-013 — El sistema DEBE respetar prohibición de requerir información adicional innecesaria:

No solicitar Cédula de Identificación Fiscal completa
No solicitar documentos adicionales más allá de lo requerido por SAT
Solo pedir información necesaria para timbrado
8.4 Integración con Listas del SAT
COMP-014 — El sistema DEBE consultar y validar contra listas negras del SAT:

Lista de Contribuyentes Incumplidos (69-B)
EFOS (Empresas que Facturan Operaciones Simuladas)
EDOS (Empresas que Deducen Operaciones Simuladas)
Contribuyentes No Localizados
COMP-015 — El sistema DEBE actualizar listas negras diariamente:

Descarga automática desde fuentes oficiales (datos.gob.mx)
Validación de checksums/firmas
Alerta si descarga falla por >48 horas
COMP-016 — El sistema DEBE alertar al usuario si:

Intenta timbrar a RFC en lista negra (bloquear + explicar)
Tiene facturas recibidas de proveedores que entraron a lista negra
Clientes del contador están en riesgo (dashboard del contador)
8.5 Preparación para CFDI 5.0 (Lanzamiento esperado Q2-Q3 2026)
COMP-017 — El sistema DEBE estar preparado para soportar múltiples versiones de CFDI:

COMP-018 — El sistema DEBE mantener soporte de CFDI 4.0 por mínimo 24 meses después del lanzamiento de 5.0.

COMP-019 — El sistema DEBE usar feature flags para activar CFDI 5.0 gradualmente:

Beta cerrada con usuarios voluntarios
Monitoreo intensivo de tasa de éxito
Rollback inmediato si tasa de error >5% 9. MATRIZ DE PRIORIZACIÓN DE FEATURES
9.1 Framework MoSCoW (Must, Should, Could, Won't)
Feature Prioridad Fase Justificación Impacto Usuario Complejidad Técnica
Autenticación segura Must PMV Base de seguridad CRITICAL MEDIA
Facturación CFDI 4.0 Must PMV Core del producto CRITICAL ALTA
Descarga masiva SAT Must PMV Diferenciador #1 HIGH MUY ALTA
Conciliación (Reglas) Must PMV Ahorra 8-12h/mes HIGH ALTA
Dashboard financiero Must PMV Visibilidad básica MEDIUM MEDIA
Multi-tenant (Contador) Should V+ Network effects HIGH ALTA
Aceptación/Rechazo CFDI Should V+ Compliance obligatorio MEDIUM MEDIA
Validación RFC EFOS Should V+ Prevención riesgos HIGH BAJA
Conciliación (IA) Could Fase 2 Mejora, no crítico MEDIUM MUY ALTA
Open Banking Could V+ Reduce fricción CSV HIGH ALTA
Complemento de Pagos Could Fase 2 Compliance avanzado MEDIUM ALTA
Nómina Could Fase 2 Mercado diferente LOW ALTA
Buzón Tributario Should V+ Compliance 2026 MEDIUM MEDIA
CFDI 5.0 Won't TBD Esperando definición SAT N/A ALTA
App Móvil Nativa Won't Fase 3+ PWA suficiente LOW MUY ALTA
9.2 Matriz de Impacto vs Esfuerzo
9.3 Roadmap Visual (Gantt Simplificado - 6 Meses) 10. ARQUITECTURA DEL SISTEMA (CLEAN ARCHITECTURE + SOLID)
10.1 Principios Arquitectónicos

1. Separation of Concerns (SoC)

2. Dependency Inversion (SOLID - D)

Las capas superiores NO dependen de las inferiores directamente
Dependencias apuntan hacia abstracciones (interfaces)
Ejemplo: TimbradoUseCase depende de IPacService, no de FacturapiAdapter 3. Single Responsibility (SOLID - S)

Cada clase/módulo tiene una única razón para cambiar
FacturaController: Solo maneja HTTP requests/responses
TimbradoService: Solo lógica de negocio de timbrado
PacAdapter: Solo comunicación con PAC externo 4. Open/Closed (SOLID - O)

Abierto para extensión (agregar nuevos PACs sin modificar código existente)
Cerrado para modificación (no tocar código estable) 5. Liskov Substitution (SOLID - L)

Cualquier implementación de IPacService debe ser intercambiable 6. Interface Segregation (SOLID - I)

Interfaces específicas, no "god interfaces"
IPacService ≠ ISATService ≠ IStorageService
10.2 Estructura de Carpetas (Monorepo)
10.3 Capas de la Arquitectura (Detallado)
10.3.1 Presentation Layer (Frontend - Nuxt 3)
Responsabilidades:

Renderizar UI
Manejar interacciones del usuario
Validación de inputs (cliente)
State management (Pinia)
Routing y navegación
Tecnologías:

Framework: Nuxt 3 (Vue 3 + SSR)
State: Pinia (Vuex sucesor)
HTTP Client: $fetch (Nuxt built-in) o TanStack Query
Validación: VeeValidate + Zod
UI Components: Headless UI + Custom (NO libraries pesadas)
Styling: SCSS + CSS Modules + BEM methodology
Ejemplo de Estructura de Componente:

10.3.2 Application Layer (Backend - Elysia)
Responsabilidades:

Manejar HTTP requests/responses
Autenticación y autorización (middleware)
Validación de inputs (servidor)
Transformar DTOs ↔ Domain Entities
Error handling y logging
Tecnologías:

Framework: Elysia (Bun-native, ultra-rápido)
Validación: Elysia built-in (similar a Zod)
Auth: JWT (jsonwebtoken o jose)
Logging: Pino (structured JSON logging)
Monitoring: Opentelemetry SDK
Ejemplo de Controller:

10.3.3 Domain Layer (Business Logic)
Responsabilidades:

Lógica de negocio pura (no depende de frameworks)
Definir entidades del dominio
Definir interfaces para infraestructura
Reglas de validación de negocio
Use cases (aplicación de reglas)
Tecnologías:

TypeScript puro (no dependencias externas)
Interfaces para abstracciones
Ejemplo de Entity:

Ejemplo de Use Case:

10.3.4 Infrastructure Layer (Integraciones Externas)
Responsabilidades:

Implementar interfaces definidas en Domain Layer
Comunicación con base de datos
Comunicación con APIs externas
File storage
Colas de mensajes
Tecnologías:

ORM: Drizzle ORM (Bun-compatible, type-safe)
DB: PostgreSQL 16
Cache: Redis 7
Storage: MinIO (S3-compatible)
HTTP Client: Native fetch o ky
Queue: pg-boss (PostgreSQL-based)
Ejemplo de Repository:

Ejemplo de Adapter (PAC):

10.4 Patrón de Circuit Breaker (Resiliencia)
Uso en PacAdapter:

...existing code...

No se pudo realizar la solicitud. Vuelva a intentarlo.

Id. de solicitud de Copilot: 80ee3b12-855d-4033-b0c5-aba4e9bd82f8

Motivo: Prompt failed validation with the reason: No messages provided. Please file an issue.

Claude Sonnet 4.5 • 1x RECUERDA POROFAVR CLAUDE TODO ESTO TIENE QUE ESTAR ACTUALIZADO para 2026 ya que necesito estar preparado si tienes mejoras que identifique sqeu se pueden realizar en basoa lo que te doy estabien lo que no NO NO ES NEGOCIABEL es BUN SE QUEDA NEXTJS SE QUEDA NUXTJS SE QUEDA Y REDIS SE QUEDAN , todo deve girar enton a esto vale? gracais calude continuemos Claude:DOCUMENTO MAESTRO COMPLETO - PROYECTO FINANZAS PERSONALES MÉXICO 2026
CONTINUACIÓN DESDE "Feature 7: PoC Open Banking"
PARTE IV: INTEGRACIONES CRÍTICAS (Continuación)
4.4.1 Features de Negocio - Mes 30-90 (Continuación)
Feature 7: PoC Open Banking - Conexión Bancaria Real (Continuación)

Implementación Frontend:

El usuario ve un botón "Conectar Banco" que abre un widget embebido de Belvo. El widget maneja toda la autenticación de forma segura (las credenciales bancarias NUNCA pasan por nuestros servidores). Una vez conectado, los movimientos se sincronizan automáticamente cada 6 horas.

UI de Gestión de Conexiones:

Panel que muestra bancos conectados con estado (activo, requiere re-autenticación, error). El usuario puede desconectar en cualquier momento. Se muestra última sincronización y contador de movimientos importados.

Pricing del Partner:

Belvo cobra aproximadamente $0.15 USD por transacción sincronizada. Para un usuario con 50 transacciones/mes, el costo es $7.50 USD (~$135 MXN). Esto justifica que esta feature sea exclusiva del Plan Profesional ($399 MXN/mes).

Limitaciones del PoC (Beta Cerrada):

Solo disponible para 20-30 usuarios beta seleccionados. Solo bancos principales (BBVA, Santander, Banorte). Sincronización cada 6 horas (no tiempo real). No se procesan pagos, solo lectura de movimientos.

Criterio de aceptación:

Widget de Belvo se integra correctamente
Movimientos se importan y normalizan (mapeados a nuestro esquema)
Webhook de Belvo se procesa sin errores
Usuario puede desconectar banco y datos se marcan como "stale"
Conciliación automática funciona con movimientos de Open Banking
Métricas instrumentadas: Bank Connection Success Rate, Sync Frequency, Transaction Import Volume
Target Beta: 20 usuarios activos por 30 días
Feedback loop: Survey post-conexión para validar PMF (Product-Market Fit)
Riesgos y Mitigación:

Riesgo: Bancos bloquean accesos frecuentes → Mitigación: Respetar rate limits de Belvo, sincronizar cada 6h (no cada hora)
Riesgo: Usuarios desconfían de dar credenciales → Mitigación: Explicar claramente que Belvo es partner certificado, nosotros NUNCA vemos sus passwords
Riesgo: Costo alto de Belvo impacta márgenes → Mitigación: Solo en Plan Profesional ($399/mes) donde el margen soporta el costo
Roadmap Post-PoC:

Si el PoC es exitoso (>70% de beta users lo usan activamente), en Mes 6-12 se expande a todos los usuarios Premium y se agregan más bancos.

Feature 8: CFDI Recibidos - Workflow Aceptación/Rechazo (Compliance Obligatorio)

Prioridad: 🔴 CRÍTICA (Obligación fiscal desde 2022)

Tiempo estimado: 6 días

Owner: Backend Lead + Frontend Lead

Descripción: Implementar flujo completo de aceptación/rechazo de facturas recibidas según Regla 2.7.1.21 del SAT

Contexto Legal:

Desde 2022, el SAT obliga a los receptores de CFDI a manifestar la aceptación o rechazo de las facturas recibidas dentro de 3 días hábiles. Si no se hace nada, la factura se acepta automáticamente. Esto es crítico para evitar fraudes donde proveedores emiten facturas falsas.

Estados de un CFDI Recibido:

PENDIENTE: Descargado del SAT, esperando decisión del usuario (3 días)
ACEPTADO: Usuario acepta (explícita o implícitamente después de 3 días)
RECHAZADO: Usuario rechaza con motivo (ej: "Servicio no prestado")
CANCELADO_POR_EMISOR: El emisor canceló antes de que el receptor decida
Flujo de Decisión:

El sistema descarga automáticamente los CFDI recibidos cada día. Al día siguiente de recibir una factura, se envía email al usuario: "Tienes 1 factura nueva de PROVEEDOR XYZ por $5,000 MXN. Acepta o rechaza en 3 días". A las 48 horas (si no hay respuesta), se envía recordatorio: "Te quedan 24 horas para aceptar/rechazar factura de PROVEEDOR XYZ". A las 72 horas (deadline), si el usuario no hizo nada, el sistema auto-acepta y notifica: "La factura de PROVEEDOR XYZ fue aceptada automáticamente (no respondiste en 3 días)".

Motivos de Rechazo (Catálogo SAT):

01: Comprobante no corresponde a la operación realizada
02: Operación no fue realizada
03: Amparo obtenido
04: Desconocimiento de la operación
Implementación Backend:

Job diario que consulta el SAT por nuevos CFDI recibidos. Job que monitorea facturas en estado PENDIENTE y calcula deadline. Sistema de notificaciones (email + in-app) con timeline de 0h, 24h, 48h, 72h. API endpoint para aceptar/rechazar con motivo. Integración con SAT para enviar manifestación (Web Service oficial).

Implementación Frontend:

Dashboard de "Facturas Recibidas Pendientes" con contador de tiempo restante. Modal de confirmación al aceptar: "¿Confirmas que recibiste el servicio de PROVEEDOR XYZ por $5,000?". Modal de rechazo con select de motivo + campo de texto opcional. Filtros: Todas, Pendientes, Aceptadas, Rechazadas, Vencidas. Histórico de manifestaciones enviadas al SAT.

UI de Facturas Pendientes:

Panel mostrando factura con semáforo visual: Verde si hay más de 48h restantes, Amarillo si quedan 24-48h, Rojo si quedan menos de 24h. Botones de acción: "Aceptar" y "Rechazar". Información del proveedor: RFC, nombre, concepto, monto. Botones para descargar XML y PDF de la factura.

Criterio de aceptación:

Job de descarga de CFDI recibidos funciona diariamente
Sistema de notificaciones envía emails en timeline correcto
Auto-aceptación después de 72h funciona correctamente
Manifestación se envía al SAT con Web Service oficial
UI muestra tiempo restante con precisión de horas
Métricas instrumentadas: Response Time (cuánto tardan usuarios en decidir), Auto-Acceptance Rate, Rejection Rate by Motivo
Compliance: 100% de facturas manifestadas dentro de deadline
Alertas: Si manifestación al SAT falla, reintentar cada hora por 24h
Casos Edge:

Si el proveedor cancela la factura antes de que el usuario decida, el sistema marca como "CANCELADO_POR_EMISOR" y no requiere manifestación. Si el SAT está caído al momento del deadline, el sistema encola la manifestación y la envía cuando el SAT vuelva (con evidencia de intento). Si el usuario rechaza pero el proveedor ya cobró, el sistema sugiere: "Contacta a tu proveedor para solicitar devolución o factura de corrección".

Feature 9: Validación Proactiva de RFC (Padrón SAT en Tiempo Real)

Prioridad: 🟡 ALTA

Tiempo estimado: 4 días

Owner: Backend Lead

Descripción: Validar RFC del cliente/proveedor contra el padrón del SAT ANTES de timbrar para evitar rechazos

Problema:

El SAT puede rechazar un timbrado si el RFC del receptor no está activo o está en lista negra (69-B). Esto genera frustración en el usuario porque ya capturó toda la factura y al final no se timbra.

Solución:

Validar el RFC en tiempo real (mientras el usuario escribe) consultando una API del padrón del SAT o un servicio tercero confiable.

Opciones de Implementación:

Opción A (Oficial pero lento): Web Service del SAT "Consulta RFC". Latencia: 2-5 segundos. Gratis pero inestable.

Opción B (Tercero rápido): API de ValidaRFC.mx o similar. Latencia: 200-500ms. Costo: $0.02 USD por consulta. Más confiable.

Opción C (Híbrido - Recomendado): Cachear consultas en Redis por 7 días. Primera vez: Opción B (tercero rápido). Consultas repetidas: Cache hit (latencia <10ms). Refresh cache cada 7 días en background.

Implementación Backend:

Cliente HTTP para API de validación (con circuit breaker). Cache de RFC en Redis con TTL de 7 días. Middleware que valida RFC antes de permitir timbrado. Response con estado: ACTIVO, INACTIVO, LISTA_NEGRA_69B, NO_ENCONTRADO.

Implementación Frontend:

Validación en tiempo real mientras usuario escribe RFC (debounce de 500ms). Indicadores visuales: Check verde si activo, X rojo si inactivo, Warning amarillo si en lista negra. Tooltip explicativo: "Este RFC está en lista negra 69-B. Las facturas de este proveedor no son deducibles". Opción de continuar de todos modos (con disclaimer legal).

UI de Validación:

Campo de RFC con indicador de loading (spinner) mientras consulta. Estado ACTIVO: Check verde + "RFC válido". Estado INACTIVO: X rojo + "RFC no encontrado en padrón SAT. Verifica el RFC". Estado LISTA_NEGRA: Warning amarillo + "⚠️ RFC en lista negra 69-B. Facturas no deducibles. ¿Continuar de todos modos?". Link a "Consultar en SAT" (abre portal del SAT en nueva ventana).

Criterio de aceptación:

Validación funciona con latencia <1s (90% de casos con cache)
Cache en Redis reduce llamadas a API tercera (hit rate >70%)
UI muestra estado visual claro (no confuso)
Sistema NO bloquea el timbrado si API falla (graceful degradation)
Métricas instrumentadas: RFC Validation Success Rate, Cache Hit Rate, Blocked Invoices (por RFC inválido)
Costo: <$50 USD/mes en validaciones (con cache optimizado)
Alertas: Si validación falla >20% en 1 hora, activar fallback al WS oficial del SAT
4.4.2 Optimizaciones de Infraestructura (Mes 30-90)
Optimización 1: Implementar DualWriteStorageAdapter (Preparación Cloud)

Prioridad: 🟡 ALTA (Preparación para Fase 3)

Tiempo estimado: 3 días

Owner: DevOps + Backend Lead

Descripción: Implementar patrón de escritura dual (MinIO local + GCS cloud) para preparar migración futura sin downtime

Objetivo:

Cuando eventualmente migremos al cloud, los archivos históricos (XML/PDF) ya estarán en GCS. Esto elimina el paso "migrar 50,000 archivos" que puede tomar horas/días.

Estrategia:

Escribir en ambos storages (MinIO + GCS) de forma simultánea durante Mes 3-12. Leer solo de MinIO (Mes 3-12). En Mes 12 (cuando migremos), cambiar la lectura a GCS. Apagar MinIO y VPS.

Implementación:

Interfaz StorageAdapter con métodos upload, download, delete. MinIOAdapter y GCSAdapter implementan la interfaz. DualWriteStorageAdapter llama a ambos en paralelo. Config flag para activar/desactivar dual-write. Métricas: upload_success_minio, upload_success_gcs, upload_latency por storage.

Manejo de Errores:

Si MinIO falla pero GCS exitoso: Log warning, continuar (no bloquear). Si GCS falla pero MinIO exitoso: Log warning, encolar retry de GCS (job background). Si ambos fallan: Retornar error al usuario, encolar retry de ambos.

Criterio de aceptación:

DualWriteStorageAdapter funciona correctamente
Uploads simultáneos a MinIO y GCS (latencia <2s p95)
Fallback graceful si uno de los storages falla
Feature flag permite activar/desactivar sin deploy
Métricas en Datadog muestran success rate de cada storage
Costo GCS: ~$5-10 USD/mes para 200GB + 10K writes/mes
Optimización 2: Configurar Réplica Lógica PostgreSQL → Cloud SQL (Preparación)

Prioridad: 🟡 ALTA (Preparación para Fase 3)

Tiempo estimado: 5 días

Owner: DevOps

Descripción: Configurar réplica read-only de PostgreSQL en Cloud SQL que se mantiene sincronizada en tiempo real

Objetivo:

Cuando migremos al cloud (Mes 12-15), la base de datos ya estará replicada. Solo necesitamos "promover" la réplica a master, cambiar el DATABASE_URL y reiniciar la app. Downtime: 15-30 minutos (no 48 horas).

Arquitectura:

VPS PostgreSQL (Master, read-write) → Streaming Replication → Cloud SQL (Replica, read-only). Lag objetivo: <1 segundo. Monitoreo constante del lag.

Implementación:

Configurar PostgreSQL en VPS con WAL shipping. Crear instancia Cloud SQL en GCP. Configurar replicación lógica con pg_basebackup. Monitorear lag con query: SELECT now() - pg_last_xact_replay_timestamp(). Alertas si lag >10 segundos.

Preparación para Switchover:

Script automatizado de switchover (Mes 12). Runbook detallado con rollback plan. Test de switchover en staging cada mes.

Criterio de aceptación:

Réplica configurada y sincronizando correctamente
Lag <1 segundo en 95% del tiempo
Alertas funcionan (si lag >10s, notify on-call)
Script de switchover probado en staging
Costo Cloud SQL: ~$150-200 USD/mes (durante preparación, luego se convierte en producción)
Documentación completa en runbook
Optimización 3: Implementar Índices Parciales y Optimización de Queries

Prioridad: 🟡 ALTA

Tiempo estimado: 4 días

Owner: Backend Lead + DBA

Descripción: Optimizar queries lentos identificados en pg_stat_statements

Proceso:

Analizar top 20 queries lentos con pg_stat_statements. Identificar queries sin índices o con índices ineficientes. Crear índices parciales donde aplique. Re-escribir queries N+1 con JOINs o CTEs. Validar mejora con EXPLAIN ANALYZE.

Ejemplos de Índices Parciales:

Solo facturas activas (no eliminadas). Solo movimientos bancarios sin conciliar. Solo transacciones recurrentes activas.

Criterio de aceptación:

Top 10 queries lentos optimizados (latencia reducida >50%)
Índices parciales creados (ahorran espacio vs índices completos)
Query plan documentado para queries críticos
Métricas en Datadog: query_latency_p95 mejora
Target: p95 de queries críticos <200ms
4.5 Fase 2: Mes 90-180 Días (Crecimiento y Diferenciación)
Objetivo: Consolidar ventaja competitiva con features únicos, preparar para escala

4.5.1 Features de Negocio (Mes 90-180)
Feature 10: Motor de Conciliación con IA (Sugerencias Explicables)

Prioridad: 🟡 ALTA (Diferenciador clave)

Tiempo estimado: 12 días

Owner: Backend Lead + Data Scientist (contractor)

Descripción: Evolucionar el motor de reglas a un sistema híbrido: Reglas determinísticas + IA que aprende de las decisiones del usuario

Filosofía: IA como "asistente inteligente", NO como caja negra

El usuario siempre ve POR QUÉ la IA sugiere un match. Ejemplo: "95% de confianza porque el monto coincide exactamente ($10,000) y la fecha es el mismo día (15/Oct) y el proveedor 'ACME SA' aparece en la descripción del movimiento bancario".

Arquitectura del Sistema Híbrido:

Fase 1 (Reglas): Motor de reglas tradicional corre primero. Fase 2 (IA): Si las reglas no encuentran match, la IA sugiere candidatos. Fase 3 (Aprendizaje): Cada vez que el usuario concilia manualmente, se entrena el modelo. Fase 4 (Mejora continua): El modelo mejora con más datos, pero las reglas siguen siendo la base.

Modelo de IA (Recomendado):

Usar modelo de similitud basado en embeddings (Sentence Transformers). No requiere GPU (puede correr en CPU del VPS). Input: Descripción del movimiento bancario + Metadatos (monto, fecha, tipo). Output: Top 5 facturas candidatas con score de similitud (0-100%). Reentrenamiento: Cada 1,000 conciliaciones manuales.

Features del Modelo:

Similitud de texto (descripción bancaria vs concepto de factura). Similitud de monto (con tolerancia). Proximidad de fecha (mismo día = 100%, ±1 día = 90%, ±7 días = 50%). Frecuencia de relación proveedor-movimiento (si históricamente este proveedor aparece en esta cuenta bancaria).

Explicabilidad (CRÍTICO para UX):

Cada sugerencia de la IA incluye "score breakdown": Similitud de texto: 85%, Similitud de monto: 100% (exacto), Proximidad de fecha: 100% (mismo día), Historial: 80% (has conciliado 12 veces movimientos similares con este proveedor), Confianza global: 95%.

UI de Sugerencias IA:

Panel de sugerencias con indicador de confianza visual (barra de progreso 0-100%). Top 3 sugerencias ordenadas por confianza. Botón "¿Por qué esta sugerencia?" que expande el breakdown. Botón "Rechazar y enseñar" que permite al usuario indicar: "Este match es incorrecto porque..." (feedback para reentrenar).

Criterio de aceptación:

Modelo entrenado con datos sintéticos iniciales (1,000 pares movimiento-factura)
API de sugerencias responde en <500ms (p95)
Precisión del modelo >80% en test set
Explicabilidad funciona (breakdown se muestra correctamente)
Reentrenamiento automático cada 1,000 conciliaciones
Métricas instrumentadas: AI Suggestion Acceptance Rate, Confidence Calibration (si dice 95%, es correcto 95% de veces)
Target: AI acceptance rate >70% para sugerencias >90% confianza
Fallback: Si modelo falla, usar solo reglas (graceful degradation)
Limitaciones:

Requiere mínimo 1,000 conciliaciones manuales para entrenar modelo útil. No funciona bien en Mes 0-3 (pocos datos). Feature se habilita en Mes 6+ cuando hay suficientes datos. Usuarios nuevos reciben modelo pre-entrenado con datos agregados anónimos.

Feature 11: Complemento de Pagos Automático (REP)

Prioridad: 🟡 ALTA (Compliance obligatorio para PPD)

Tiempo estimado: 10 días

Owner: Backend Lead (especialista en CFDI)

Descripción: Generación automática de Complemento de Pagos (REP) al relacionar un pago con una factura PPD

Contexto Legal:

Cuando una factura se emite con método de pago "PPD" (Pago en Parcialidades o Diferido), el emisor DEBE emitir un Complemento de Pagos (REP) cuando reciba el pago. El REP relaciona la factura original con el pago recibido y actualiza el saldo insoluto.

Flujo Automático:

Usuario emite factura con método PPD (ejemplo: $10,000 MXN). Sistema marca factura como "Pendiente de pago". Usuario registra movimiento bancario (ingreso $10,000). Motor de conciliación relaciona el movimiento con la factura PPD. Sistema detecta: "Esta factura PPD recibió pago, debo emitir REP". Sistema genera automáticamente el REP con: Fecha de pago, Monto pagado, Forma de pago, Moneda, Saldo insoluto actualizado. Sistema timbra el REP con el PAC. Sistema notifica al usuario: "REP generado automáticamente para FAC-1234".

Casos Complejos:

Pago parcial: Factura $10,000, pago $5,000 → REP por $5,000, saldo insoluto $5,000. Múltiples pagos: Factura $10,000, pago 1 $3,000, pago 2 $7,000 → Dos REPs. Pago en exceso: Factura $10,000, pago $10,500 → REP por $10,000 (completo), avisar excedente de $500. Pago en moneda extranjera: Aplicar tipo de cambio del día.

Implementación Backend:

Tabla facturas_ppd_pendientes con saldo_insoluto. Job que monitorea conciliaciones nuevas. Si conciliación relaciona movimiento con factura PPD, trigger generación REP. Validaciones: Monto no excede saldo insoluto, Fecha de pago posterior a fecha de factura, Forma de pago válida según catálogo SAT. Integración con PAC para timbrar REP (usa mismo flujo que factura normal).

Implementación Frontend:

Dashboard de "Facturas PPD Pendientes" con saldo insoluto. Indicador visual de progreso de pagos. Opción de generar REP manualmente (si no se detectó automáticamente). Historial de REPs asociados a cada factura PPD. Notificación al generar REP exitosamente.

Criterio de aceptación:

REP se genera automáticamente al conciliar pago
Validaciones de negocio funcionan correctamente
Saldo insoluto se actualiza después de cada pago
REP se timbra exitosamente con PAC
UI muestra historial de pagos y REPs claramente
Métricas instrumentadas: REP Auto-Generation Rate, REP Timbrado Success Rate
Target: >90% de REPs generados automáticamente (sin intervención manual)
Feature 12: Dashboard del Contador (Multi-Cliente)

Prioridad: 🔴 CRÍTICA (Network effects)

Tiempo estimado: 8 días

Owner: Frontend Lead + Backend Lead

Descripción: Vista consolidada para contadores que manejan múltiples clientes (10+ RFCs)

Problema:

Un contador con 10 clientes tiene que hacer login/logout 10 veces para revisar cada empresa. Esto es extremadamente ineficiente.

Solución:

Dashboard que muestra TODOS los clientes del contador en una sola vista. El contador puede hacer "drill-down" en cualquier cliente sin cambiar de cuenta.

UI del Dashboard Contador:

Vista de tabla con columnas: Cliente (Razón Social), RFC, Ingresos (mes actual), Egresos (mes actual), Balance, Facturas Pendientes, Última Actividad, Acciones (Ver Dashboard). Indicadores visuales: Semáforo verde/amarillo/rojo según salud financiera. Alertas: "5 facturas por aceptar/rechazar (deadline en 2 días)". Filtros: Todos, Con alertas, Inactivos >7 días. Búsqueda por RFC o nombre.

Acciones Rápidas desde Dashboard:

Descargar SAT de todos los clientes (botón "Descargar SAT de Todos"). Generar reportes consolidados (suma de ingresos/egresos de todos). Enviar recordatorio a cliente inactivo (email automático). Facturación masiva (emitir 50 facturas en una sesión para diferentes clientes).

Drill-Down en Cliente:

Al hacer click en "Ver Dashboard" de un cliente, el contador entra al dashboard de ese cliente específico (con todos los features normales). Breadcrumb: "Dashboard Contador > ACME SA de CV". Botón "Volver a mis clientes" siempre visible.

Permisos y Seguridad:

El contador NO puede modificar e.firma del cliente (solo su propia e.firma). El contador puede ver/editar facturas y movimientos bancarios. El cliente puede revocar acceso al contador en cualquier momento. Audit log registra todas las acciones del contador en cada cliente.

Criterio de aceptación:

Dashboard muestra correctamente todos los clientes del contador
Drill-down funciona sin errores
Permisos se respetan (contador no puede hacer acciones no autorizadas)
Audit log registra acciones del contador
Métricas instrumentadas: Contador Active Users, Avg Clients per Contador, Contador Session Duration
Target: Contadores pasan >60 min/día en la plataforma (vs 20 min/día en app normal)
Feature 13: Integración con Buzón Tributario (Scraping Automatizado)

Prioridad: 🟡 ALTA (Compliance 2025)

Tiempo estimado: 8 días

Owner: Backend Lead (especialista SAT)

Descripción: Consultar automáticamente el Buzón Tributario del SAT cada 3 días para descargar notificaciones críticas

Contexto Legal:

Desde Julio 2025, el SAT envía notificaciones SOLO por el Buzón Tributario (no más por email). Las notificaciones incluyen: Requerimientos de información, Avisos de auditoría, Multas, Citatorios, Cancelación de certificados. Los contribuyentes tienen 3 días para enterarse después de que el SAT publica la notificación.

Estrategia de Implementación:

Opción A (Oficial pero complejo): API oficial del Buzón (si existe). Opción B (Scraping legal): Automatizar el login al portal del SAT con e.firma y descargar notificaciones. Opción C (Híbrido - Recomendado): Intentar API oficial, fallback a scraping si falla.

Flujo de Scraping:

Job que corre cada 12 horas. Autentica con e.firma del usuario en el portal del SAT. Navega a sección "Buzón Tributario". Descarga nuevas notificaciones (PDFs). Parsea título y fecha de cada notificación. Notifica al usuario inmediatamente si hay notificaciones nuevas.

Clasificación de Notificaciones:

Críticas (requieren acción inmediata): Requerimientos, Auditorías, Multas. Informativas (no requieren acción): Avisos generales, Cambios en legislación. Sistema prioriza las críticas con alertas in-app y email.

UI de Buzón:

Sección "Notificaciones del SAT" en el menú principal. Lista de notificaciones con: Fecha, Título, Tipo (Crítica/Informativa), Estado (Nueva/Leída). Botón "Descargar PDF" en cada notificación. Indicador de notificaciones no leídas (contador en navbar).

Criterio de aceptación:

Job de scraping funciona sin errores (o fallback graceful si SAT cambia UI)
Notificaciones se descargan y almacenan correctamente
Clasificación automática de críticas vs informativas
Alertas se envían inmediatamente para notificaciones críticas
Métricas instrumentadas: Buzón Check Success Rate, Notificaciones Nuevas por Usuario, Response Time (cuánto tarda usuario en leer)
Target: 100% de notificaciones críticas leídas dentro de 24h
Riesgos y Mitigación:

Riesgo: SAT cambia el UI del Buzón y el scraping se rompe → Mitigación: Monitoreo automatizado cada 6 horas, alertas si scraping falla, feature flag para desactivar. Riesgo: e.firma del usuario expira y no podemos acceder → Mitigación: Validar vigencia de e.firma antes de intentar scraping, notificar usuario si necesita renovar.

4.5.2 Preparación para Migración Cloud (Mes 90-180)
Preparación 1: Crear Cuenta GCP y Desplegar Terraform en Staging

Prioridad: 🟡 ALTA

Tiempo estimado: 5 días

Owner: DevOps

Descripción: Preparar infraestructura cloud en staging para validar arquitectura antes de migrar producción

Actividades:

Crear cuenta GCP y aplicar créditos gratuitos ($300 USD). Configurar proyecto GCP y permisos IAM. Escribir scripts Terraform para toda la infraestructura. Desplegar en staging: Cloud SQL, Cloud Storage, Memorystore Redis, Cloud Run. Validar que la app funciona correctamente en GCP staging. Medir costos reales vs estimados.

Validaciones en Staging:

App se despliega correctamente en Cloud Run. PostgreSQL en Cloud SQL funciona con RLS. Redis en Memorystore tiene latencia aceptable. Storage en GCS funciona con MinIO adapter. Monitoreo en Datadog captura métricas de GCP.

Criterio de aceptación:

Infraestructura completa desplegada en GCP staging
App funciona sin errores en staging
Costos medidos: <$200 USD/mes en staging
Terraform scripts versionados en Git
Runbook de despliegue documentado
Preparación 2: Escribir y Probar Script de Switchover

Prioridad: 🔴 CRÍTICA

Tiempo estimado: 3 días

Owner: DevOps + Backend Lead

Descripción: Automatizar completamente el proceso de migración de VPS a GCP

Script de Switchover (Alta Nivel):

Paso 1: Poner app en modo read-only (usuarios pueden ver pero no crear facturas). Paso 2: Esperar a que réplica PostgreSQL alcance lag = 0. Paso 3: Promover réplica a master. Paso 4: Actualizar DATABASE_URL en variables de entorno. Paso 5: Reiniciar app con nueva configuración. Paso 6: Cambiar DNS gradualmente (90% VPS → 10% GCP por 10 min, luego 100% GCP). Paso 7: Monitorear errores por 24 horas. Paso 8: Apagar VPS definitivamente.

Runbook de Rollback:

Si hay errores críticos en GCP, hacer rollback inmediato a VPS. Cambiar DNS de vuelta a VPS. Degradar réplica GCP a read-only nuevamente. Investigar causa raíz antes de re-intentar.

Pruebas del Script:

Ejecutar switchover en staging cada mes. Medir RTO real (cuánto tiempo toma). Identificar puntos de falla y optimizar. Documentar cada paso con screenshots y comandos.

Criterio de aceptación:

Script de switchover funciona correctamente en staging
RTO medido: <30 minutos
Runbook de rollback probado y funcional
Checklist pre-migración completo (60+ items)
Notificaciones a usuarios 72h antes programadas
4.6 Consideraciones 2026 (CFDI 5.0 y Nuevas Regulaciones)
4.6.1 Preparación para CFDI 5.0
Timeline Esperado:

Q2 2026: SAT publica versión final de CFDI 5.0. Q3 2026: Periodo de transición comienza (ambas versiones válidas). Q4 2026: Primeros PACs soportan CFDI 5.0. Q1 2027: Deadline para migrar (CFDI 4.0 deja de ser válido).

Cambios Esperados en CFDI 5.0:

Simplificación de catálogos (de 47 a ~30). Nueva estructura XML (incompatible con 4.0). Factura "Lite" para negocios pequeños (menos campos obligatorios). Timestamps criptográficos (posible integración con blockchain). APIs RESTful (reemplazo gradual de SOAP Web Services).

Estrategia de Preparación (Desde Ahora):

Diseñar sistema con soporte multi-versión desde PMV. Crear abstracción CFDIVersionManager que puede manejar 4.0 y 5.0 simultáneamente. Implementar feature flags para activar/desactivar versiones. Cuando 5.0 esté disponible, habilitar para beta testers primero. Mantener soporte de 4.0 por mínimo 24 meses después de 5.0.

Arquitectura Multi-Versión:

Interfaz ICFDIGenerator con método generate(version, data). CFDI40Generator implementa la lógica de 4.0. CFDI50Generator implementará la lógica de 5.0 (cuando esté disponible). Usuario selecciona versión (o app decide automáticamente). Feature flag controla qué versiones están habilitadas.

Criterio de Preparación:

Código modular permite agregar CFDI 5.0 sin refactorizar todo
Feature flags permiten rollout gradual
Tests existen para ambas versiones (aunque 5.0 sea mock inicialmente)
Documentación explica diferencias entre versiones
4.6.2 Monitoreo Proactivo de Cambios SAT
Estrategia de Vigilancia:

Scraping automatizado de la página de anuncios del SAT cada 6 horas. Alertas automáticas si se detecta palabras clave: "CFDI 5.0", "nueva obligación", "plazo", "vigencia". Suscripción a newsletters oficiales del SAT y IMCP. Contacto directo con PACs (ellos suelen enterarse primero). Participación en comunidades de contadores (feedback early adopters).

Plan de Reacción Rápida:

Cuando se anuncie cambio importante: Analizar impacto en 48 horas. Crear plan de implementación en 1 semana. Comunicar a usuarios afectados. Implementar cambio con feature flag. Habilitar gradualmente.

PARTE V: ESCALABILIDAD Y PREPARACIÓN PARA 700 USUARIOS/HORA
5.1 Análisis de Capacidad Requerida
Supuestos del Escenario:

700 usuarios activos simultáneamente (hora pico). Cada usuario realiza 15 acciones en 25-60 minutos. Distribución de acciones: 30% Consultas (GET facturas, dashboard), 40% Escrituras simples (POST nueva factura, PUT editar), 20% Escrituras complejas (Timbrado, Descarga SAT), 10% Operaciones pesadas (Generar reporte PDF).

Cálculo de Carga:

700 usuarios × 15 acciones = 10,500 acciones total. Ventana de tiempo: 25-60 min (usamos 40 min promedio). Tasa de acciones: 10,500 / 40 min = 262.5 acciones/min = 4.4 acciones/segundo (promedio). Pico (asumiendo distribución no uniforme): 4.4 × 3 = 13.2 acciones/seg.

Desglose por Tipo:

Consultas (GET): 3,150 acciones → ~1.3 req/seg promedio, ~4 req/seg pico. Escrituras simples (POST/PUT): 4,200 acciones → ~1.75 req/seg promedio, ~5.3 req/seg pico. Escrituras complejas (Timbrado/SAT): 2,100 acciones → ~0.9 req/seg promedio, ~2.7 req/seg pico. Operaciones pesadas (Reportes): 1,050 acciones → ~0.44 req/seg promedio, ~1.3 req/seg pico.

Recursos Necesarios en VPS:

CPU: Asumiendo cada request toma ~50ms CPU, necesitamos (13.2 req/seg × 50ms = 660ms CPU/seg). Con 4 vCPU disponibles, esto es ~16.5% de utilización (hay headroom).

RAM: Cada proceso Bun consume ~200MB RAM (con 10 workers). 10 × 200MB = 2GB RAM para la app. PostgreSQL: ~4GB RAM. Redis: ~2GB RAM. Total: ~8GB RAM utilizada de 16GB disponibles.

Disco: Operaciones de lectura/escritura son manejables con NVMe (100K IOPS+). Bottleneck probable: PostgreSQL I/O (no CPU).

Ancho de Banda: 10,500 acciones × 50KB promedio por response = 525MB transferidos en 40 min. Esto es ~13MB/min o ~217KB/seg. Bien dentro del límite de 16TB/mes.

Conclusión de Capacidad:

El VPS (4 vCPU, 16GB RAM) puede manejar 700 usuarios/hora con 15 acciones c/u SIN PROBLEMAS. El bottleneck real será PostgreSQL I/O si las queries no están optimizadas. Solución: Índices, connection pooling, y caching agresivo en Redis.

5.2 Estrategia de Caché (Redis)
Principio: Cachear todo lo que NO cambie frecuentemente

Datos a Cachear:

Catálogos del SAT (UsoCFDI, FormaPago, etc): TTL 7 días. Categorías del usuario: TTL 1 hora (invalida al crear/editar). Balance de cuentas: TTL 5 minutos (invalida al crear transacción). Dashboard KPIs: TTL 5 minutos. Facturas descargadas del SAT (metadata): TTL 24 horas.

Patrón de Cache-Aside:

Request llega al endpoint. Check cache: if (redis.get(key)) return cached. Si no existe en cache, query PostgreSQL. Guarda en cache con TTL. Return data.

Invalidación de Cache:

Cuando usuario crea factura: Invalidar cache de "balance*usuario*{id}" y "dashboard*kpis_usuario*{id}". Cuando usuario edita categoría: Invalidar cache de "categorias*usuario*{id}". Cuando se descarga SAT: Invalidar cache de "facturas*recibidas_usuario*{id}".

Métricas de Cache:

Cache Hit Rate: >70% (target). Cache Miss Rate: <30%. Latencia promedio: Cache hit <10ms, Cache miss <200ms.

Criterio de Validación:

Bajo carga de 700 usuarios, cache hit rate debe estar >70%. Latencia p95 de endpoints con cache debe ser <200ms.

5.3 Connection Pooling (PostgreSQL)
Configuración Recomendada:

Pool size: 20 conexiones (suficiente para 10 workers × 2 conexiones c/u). Max overflow: 10 conexiones adicionales en pico. Timeout: 30 segundos (si no hay conexión disponible, fallar).

Monitoreo de Pool:

Métricas en Datadog: pool_active_connections, pool_idle_connections, pool_wait_time. Alertas si pool_wait_time > 1 segundo (indica pool saturation).

Optimización:

Cada request debe usar la conexión el MENOR tiempo posible. Queries complejos deben usar índices para reducir tiempo de ejecución. Transactions deben ser cortas (no mantener conexión abierta mientras se hacen llamadas externas).

5.4 Procesamiento Asíncrono (pg-boss)
Jobs que DEBEN ser Asíncronos:

Timbrado de CFDI (toma 2-5 segundos, no bloquear el request). Descarga masiva SAT (toma 30-120 segundos). Generación de reportes PDF (toma 5-10 segundos). Envío de emails (toma 1-2 segundos). Reentrenamiento de modelo IA (toma minutos).

Configuración de Colas:

Queue "timbrado" con prioridad HIGH, workers = 5, retry = 3. Queue "descarga_sat" con prioridad NORMAL, workers = 3, retry = 5. Queue "reportes" con prioridad LOW, workers = 2, retry = 1. Queue "emails" con prioridad LOW, workers = 10, retry = 3.

Monitoreo de Colas:

Métricas en Datadog: queue_depth (cuántos jobs pendientes), queue_processing_time, queue_fail_rate. Alertas si queue_depth > 100 (indica backlog).

5.5 Testing de Carga (Load Testing)
Herramienta Recomendada: k6 (open-source, fácil de usar)

Escenarios de Test:

Escenario 1 (Smoke Test): 10 usuarios por 5 minutos → Verificar que no hay errores obvios.

Escenario 2 (Load Test): 700 usuarios ramping up en 5 min, mantener 40 min → Simular hora pico real.

Escenario 3 (Stress Test): 1,400 usuarios (2x carga esperada) → Encontrar punto de quiebre.

Escenario 4 (Spike Test): 0 → 700 usuarios en 1 min (spike) → Validar que autoscaling funciona (si aplicara).

Métricas a Validar:

HTTP success rate: >99.9%. Latencia p95: <500ms (GET), <2s (POST timbrado). Error rate: <0.1%. Database connection pool saturation: <80%.

Criterio de Aprobación:

Escenarios 1 y 2 DEBEN pasar antes de lanzar a producción. Escenario 3 es informativo (para saber límites). Escenario 4 es opcional (nice-to-have).

PARTE VI: SEGURIDAD Y COMPLIANCE
6.1 Estrategia de Seguridad Ofensiva (Pentesting)
Antes del Lanzamiento (Crítico):

Contratar pentester externo (freelance o empresa como HackerOne). Scope: Toda la aplicación web + API. Duración: 1-2 semanas. Objetivo: Encontrar vulnerabilidades OWASP Top 10. Entregable: Reporte detallado con severidades (Critical, High, Medium, Low). Plan: Remediar todos los Critical y High antes de lanzar, Medium y Low en Mes 1-3.

Testing Interno (Continuo):

Usar herramientas automatizadas: OWASP ZAP (scanner de vulnerabilidades web), Snyk (análisis de dependencias), npm audit (vulnerabilidades en paquetes Node).

Bug Bounty Program (Mes 6+):

Abrir programa de bug bounty en HackerOne o similar. Recompensas: Critical = $500 USD, High = $200 USD, Medium = $50 USD, Low = $20 USD (reputación). Scope limitado: Solo producción, excluir staging.

6.2 Compliance Legal (LFPDPPP, GDPR)
Ley Federal de Protección de Datos Personales en Posesión de Particulares (México):

Aviso de Privacidad publicado en sitio web. Obtener consentimiento explícito antes de recopilar datos. Permitir ejercicio de derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Implementar medidas de seguridad administrativas, técnicas y físicas. Notificar a usuarios en caso de breach de seguridad.

Implementación de ARCO:

Sección en la app: "Mis Datos Personales". Botón "Descargar mis datos" (export JSON con toda la información del usuario). Botón "Eliminar mi cuenta" (soft delete, retención 30 días para rollback). Botón "Modificar datos" (usuario puede editar perfil). Formulario de "Oposición" (usuario puede pedir no recibir ciertos emails).

Data Processing Agreement (DPA):

Documento legal que firmamos con el usuario (especialmente Plan Contador). Especifica cómo procesamos datos personales de sus clientes. Incluye cláusulas de confidencialidad y sub-procesadores (PAC, Belvo, Datadog).

6.3 Plan de Respuesta a Incidentes de Seguridad
Definición de Incidente:

Acceso no autorizado a datos de usuario. Brecha de datos (data leak). Ataque DDoS exitoso. Vulnerabilidad crítica descubierta en producción.

Protocolo de Respuesta:

Detección: Alertas automáticas en Datadog o reporte de usuario. Contención: Aislar componente afectado (desactivar feature flag, bloquear IPs). Investigación: Revisar logs, identificar causa raíz, cuantificar impacto. Remediación: Patchear vulnerabilidad, cambiar credenciales comprometidas. Notificación: Informar a usuarios afectados dentro de 72 horas (LFPDPPP). Post-Mortem: Documentar incidente, implementar mejoras para prevenir recurrencia.

Runbook de Incidentes:

Cada tipo de incidente tiene runbook específico con pasos detallados. Roles definidos: Incident Commander, Technical Lead, Communications Lead. Simulacros de incidentes cada 6 meses (tabletop exercises).

PARTE VII: LANZAMIENTO Y OPERACIONES
7.1 Checklist Pre-Lanzamiento (60+ Items)
Seguridad (20 items):

Todas las tareas de Prioridad 0 completadas. Pentest externo realizado y vulnerabilidades críticas remediadas. Secrets gestionados con Doppler (no .env). RLS forzado en PostgreSQL con roles separados. Circuit breaker y rate limiters activos. Auditoría de logs sin secrets expuestos. HTTPS con TLS 1.3 funcionando. Headers de seguridad configurados. CSRF protection activa. 2FA disponible para usuarios.

Infraestructura (15 items):

VPS configurado y funcionando. PostgreSQL con backups diarios automatizados. Redis con persistencia AOF+RDB. MinIO con WORM habilitado. Nginx como reverse proxy. Datadog monitoreando todas las métricas. Alertas críticas configuradas y probadas. Runbooks documentados. Script de disaster recovery probado mensualmente. Feature flags operacionales.

Producto (15 items):

Onboarding wizard funcional y testeado. Facturación CFDI 4.0 timbra correctamente. Descarga masiva SAT funciona con WS oficial. Conciliación básica con reglas funcional. CFDI recibidos con workflow aceptación/rechazo. Validación de RFC integrada. Dashboard muestra KPIs correctos. Reportes exportan a PDF/Excel. Notificaciones por email funcionan. Analytics instrumentados (PostHog/Mixpanel).

Legal y Compliance (10 items):

Aviso de Privacidad publicado. Términos y Condiciones firmables. DPA preparado para Plan Contador. Disclaimer legal sobre no reemplazar contador. Registro de marca en IMPI (Instituto Mexicano de la Propiedad Industrial). Contrato con PAC firmado. Facturación propia configurada (somos contribuyentes).

7.2 Estrategia de Lanzamiento (Go-Live)
Fase Beta Cerrada (Mes 0-1):

Invitar 20-30 usuarios seleccionados (contadores early adopters). Onboarding manual con llamada 1-on-1. Feedback intenso vía Slack/WhatsApp. Iterar rápido basado en feedback.

Fase Beta Abierta (Mes 1-3):

Abrir registro público con waitlist. Aprobar usuarios manualmente (evitar abuse). Target: 100-200 usuarios activos. A/B test de pricing.

Lanzamiento Público (Mes 3):

Abrir registro sin waitlist. Campaña de marketing: Blog posts, comunidades, paid ads. Target: 500+ usuarios en Mes 6.

7.3 Métricas de Éxito (North Star Metrics)
Métrica North Star: MRR (Monthly Recurring Revenue)

Target Mes 3: $10,000 MXN ($550 USD). Target Mes 6: $50,000 MXN ($2,750 USD). Target Mes 12: $200,000 MXN (~$11,000 USD).

Métricas de Soporte:

Activation Rate (% que completan onboarding): Target >70%. Time to First Invoice: Target <15 minutos. Churn Rate: Target <5%/mes. NPS (Net Promoter Score): Target >50. CAC Payback Period: Target <12 meses.

PARTE VIII: ANEXOS Y CONCLUSIÓN
8.1 Resumen Ejecutivo Final
Este documento representa un blueprint completo para construir una plataforma web de finanzas personales y contabilidad enfocada en México, usando el stack Bun + Vue + Nuxt, desplegada inicialmente en VPS Hostinger con preparación para migración futura a GCP.

Diferenciadores Clave:

Descarga masiva automatizada del SAT (Web Service oficial). Conciliación inteligente con motor híbrido (reglas + IA). Compliance SAT nativo (CFDI 4.0, preparación 5.0). Network effects vía Dashboard del Contador. Pricing disruptivo ($199 MXN/mes vs $500-1,000 competidores).

Validación de Capacidad:

El VPS puede manejar 700 usuarios/hora con 15 acciones cada uno sin problemas. Estrategia de caché, connection pooling y jobs asíncronos asegura fluidez. Plan de migración cloud (Mes 12-15) garantiza escalabilidad a 10,000+ usuarios.

Seguridad Nivel Bancario:

RLS multi-tenant forzado. E2EE para e.firma. Circuit breakers y rate limiters. Auditoría completa de accesos. Pentest externo antes de lanzar.

Roadmap Realista:

PMV (Mes 0-3): Features core + seguridad. V+ (Mes 3-6): Features premium + estabilización. Fase 2 (Mes 6-12): Diferenciación + preparación cloud. Fase 3 (Mes 12-18): Migración cloud + CFDI 5.0.

Este documento debe ser la referencia única para todo el equipo durante los próximos 12 meses. Actualizar trimestralmente basado en feedback del mercado y cambios regulatorios del SAT.

FIN DEL DOCUMENTO MAESTRO v8.0

Claude Sonnet 4.5 • 1x
