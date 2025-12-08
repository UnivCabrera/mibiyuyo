# 🔌 MÓDULO 07: INTEGRACIONES EXTERNAS
**Total:** 15 características  
**Prioridad PMV:** 4  
**Última actualización:** 28 Nov 2025

---

## 7.1 OPEN BANKING (4 características)

### INT-001: Conexión Bancaria (Belvo/Finerio)
- **Descripción:** Conectar cuentas bancarias mexicanas
- **Proveedores:** Belvo o Finerio Connect
- **Bancos:** BBVA, Santander, Banorte, Citibanamex, HSBC, Scotiabank
- **Flujo:** Widget → Credenciales → Link creado
- **Costo:** ~$0.015 USD/transacción
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** PRO

### INT-002: Descarga Automática de Movimientos
- **Descripción:** Importar transacciones bancarias cada 24h
- **Job:** BullMQ programado a las 6 AM
- **Histórico:** Últimos 90 días en conexión inicial
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### INT-003: Conciliación Automática Banco-App
- **Descripción:** Vincular transacciones bancarias con registros
- **Matching:** Por monto, fecha, comercio (fuzzy matching)
- **UI:** Sugerencias para aprobar/rechazar
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### INT-004: Alertas de Movimientos Bancarios
- **Descripción:** Notificar cuando hay nuevo movimiento
- **Trigger:** Webhook de Belvo
- **Nudge:** "¿Qué compraste en OXXO hace 5 min?"
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

---

## 7.2 SAT Y FACTURACIÓN (5 características)

### INT-005: API PAC (Timbrado)
- **Descripción:** Conexión con proveedor de timbrado
- **Proveedores:** Facturapi, SW Sapien, Diverza
- **Patrón:** Circuit breaker + failover
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### INT-006: Web Service SAT (Descarga Masiva)
- **Descripción:** API oficial para descargar CFDI
- **Autenticación:** FIEL (firma electrónica)
- **Límite:** 200,000 XML por solicitud
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** PRO

### INT-007: Validación RFC SAT
- **Descripción:** Verificar RFC contra padrón oficial
- **API:** ValidaRFC.mx o similar
- **Caché:** Redis 7 días
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### INT-008: Catálogos SAT Automatizados
- **Descripción:** Actualizar catálogos desde portal SAT
- **Frecuencia:** Semanal (job automatizado)
- **Storage:** PostgreSQL con versioning
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### INT-009: Listas Negras SAT (EFOS/69-B)
- **Descripción:** Sincronizar listas negras
- **Fuente:** Portal SAT (scraping permitido)
- **Frecuencia:** Diaria
- **Alertas:** Notificar si proveedor entra en lista
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

---

## 7.3 SERVICIOS EXTERNOS (6 características)

### INT-010: Tipo de Cambio (Banxico)
- **Descripción:** Obtener tipos de cambio oficiales
- **API:** SIE Banxico (gratis)
- **Monedas:** USD, EUR, CAD
- **Actualización:** Diaria
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** PRO

### INT-011: Inflación INEGI
- **Descripción:** Índices de precios al consumidor
- **Uso:** Calcular "inflación personal" del usuario
- **API:** INEGI API (gratis)
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** PRO

### INT-012: Google Gemini Pro (IA)
- **Descripción:** LLM para chatbot y análisis
- **Usos:** Consultas, OCR, resúmenes, RAG
- **Rate Limit:** 60 req/min (free tier)
- **Costo:** ~$0.002 USD/1K tokens (paid)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### INT-013: Email Transaccional
- **Descripción:** Envío de emails desde la app
- **Proveedor:** Resend, Postmark o SendGrid
- **Tipos:** Verificación, alertas, reportes, facturas
- **Templates:** MJML responsive
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### INT-014: Storage de Archivos
- **Descripción:** Almacenamiento de adjuntos
- **Opciones:** MinIO (self-hosted), Cloudflare R2 (S3-compatible)
- **Límite:** 5MB/archivo, 1GB/usuario (FREE), 10GB (PRO)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### INT-015: Geolocalización (Opcional)
- **Descripción:** Detectar ubicación para contexto
- **Uso:** Comercio cercano, zona de gasto
- **API:** Browser Geolocation API
- **Privacidad:** Opt-in explícito
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** PRO

---

## 📊 RESUMEN MÓDULO INTEGRACIONES

| Sección | Total | PMV | V1 | V2 | V3 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Open Banking | 4 | 0 | 3 | 1 | 0 |
| SAT | 5 | 4 | 1 | 0 | 0 |
| Externos | 6 | 3 | 2 | 1 | 0 |
| **TOTAL** | **15** | **7** | **6** | **2** | **0** |

---

**Próximo:** [08_NEGOCIO_MONETIZACION.md](./08_NEGOCIO_MONETIZACION.md)
