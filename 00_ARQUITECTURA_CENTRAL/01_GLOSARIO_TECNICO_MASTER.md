# 📖 GLOSARIO TÉCNICO Y DE NEGOCIO: PRO_FINAN_CONTA_PYM

**Última Actualización:** 12 Diciembre 2025  
**Total Características:** 278 features documentadas  
**Módulos:** 13 (incluye Killer Features y Mapa Tecnológico)

> **Cómo usar este archivo:** sirve como diccionario vivo de términos y decisiones arquitectónicas. Cada entrada indica su definición, dónde reside en el código y cómo impacta otras capas del sistema para facilitar el rastreo durante auditorías o refactors.

## 1. Entidades de Negocio (Core Domain)

| Término              | Definición                                                               | Mapeo en Código (Prototipo)                                        | Conexión Arquitectónica                                                                                            |
| :------------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **Usuario (User)**   | Entidad raíz; representa personas físicas o morales con roles de acceso. | `backend/src/domain/entities/User.ts` y `backend/src/db/schema.ts` | Inicia los flujos de autenticación, ownership de cuentas y auditorías (se relaciona con `AuditLogger`).            |
| **CFDI 4.0**         | Comprobante Fiscal Digital por Internet vigente en SAT.                  | `backend/src/infrastructure/adapters/sat/`                         | Almacena metadatos en PostgreSQL y dispara validaciones en `SATCredential` y módulos de compliance.                |
| **EFOS/EDOS**        | Listas negras del SAT para operaciones simuladas.                        | `App_movil-main/Claude_estudialo` (referencia legal)               | Integración planificada con workers que consultan listas 69-B y bloquean contrapartes en el dominio.               |
| **Póliza**           | Registro contable que afecta cuentas de mayor.                           | _Pendiente_ (`project_characteristics/02_CONTABILIDAD_SAT.md`)     | Será materializada como agregado en Dominio para generar reportes fiscales; depende de transacciones consolidadas. |
| **Buzón Tributario** | Canal oficial SAT-contribuyente.                                         | _Integración futura_                                               | Previsto como adaptador en `infrastructure/adapters/sat/` para sincronizar notificaciones y alertas legales.       |

## 2. Stack Tecnológico (Architecture)

| Tecnología                   | Rol en el Sistema                                             | Estado Actual                                  | Motivo de Elección                                                               |
| :--------------------------- | :------------------------------------------------------------ | :--------------------------------------------- | :------------------------------------------------------------------------------- |
| **Bun**                      | Runtime JS/TS de alto rendimiento; ejecuta backend y tooling. | ✅ Implementado en `backend/`                  | Menor latencia que Node, TS nativo, soporte WebSocket integrado.                 |
| **Svelte 5 (Runes)**         | Framework frontend reactivo para la PWA.                      | ⚠️ Migración pendiente desde SvelteKit clásico | Reduce bundle size y ofrece reactividad declarativa sin virtual DOM.             |
| **ElysiaJS**                 | Framework HTTP sobre Bun.                                     | ✅ `backend/src/index.ts`                      | Tipado end-to-end con Eden Treaty y soporte nativo para plugins (Swagger, Cors). |
| **PostgreSQL 18 + pgvector** | Base relacional y motor semántico.                            | ✅ `database/migrations/`                      | Permite ACID para core financiero y búsquedas IA sin servicios externos. Historial ilimitado vs 2 años de Contpaqi. |
| **Redis 8.2+**               | Caché, sesiones y colas BullMQ.                               | ✅ `infrastructure/docker/`                    | Streams mejorados, comandos HSETEX para tokens rotables. Vector sets para IA.                        |
| **Dokploy**                  | Orquestador Docker con UI web.                                | ✅ VPS Hostinger                               | Maneja Docker Swarm, backups, CI/CD y SSL automático. Alternativa a Kubernetes para 1-3 VPS.       |
| **Traefik 3**                | Reverse proxy, SSL y rate limiting.                           | ✅ `infrastructure/traefik/`                   | Auto Let's Encrypt y middlewares consumibles desde labels Docker.                |

## 3. Librerías Especializadas (Frontend/UX)

| Librería              | Propósito                                      | Impacto en UX                                                                           |
| :-------------------- | :--------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **TanStack Table v8** | Motor "headless" para tablas de datos masivos. | Permite filtros complejos, ordenamiento y virtualización sin lag en reportes contables. |
| **IMask**             | Máscaras de entrada para strings con formato.  | Evita errores en captura de montos monetarios, RFCs y CURPs.                            |
| **PDF.js**            | Renderizado de PDFs en el cliente.             | Mantiene al usuario en la app al visualizar facturas, evitando descargas forzadas.      |
| **date-fns**          | Manipulación de fechas ligera e inmutable.     | Garantiza precisión en cálculos de periodos fiscales y zonas horarias.                  |
| **Paraglide JS**      | Internacionalización (i18n) type-safe.         | Prepara la plataforma para escalar a otros mercados sin deuda técnica.                  |
| **ExcelJS**           | Generación de hojas de cálculo en cliente.     | Permite exportar reportes complejos sin sobrecargar el backend.                         |
| **Sonner**            | Sistema de notificaciones (Toasts).            | Feedback inmediato y no intrusivo para acciones del usuario.                            |
| **Driver.js**         | Guías de onboarding interactivas.              | Reduce la curva de aprendizaje mediante tutoriales paso a paso in-app.                  |

## 4. Ventajas Competitivas (Killer Features)

| Término | Definición | Competidor Afectado | Feature ID |
|:--------|:-----------|:-------------------|:-----------|
| **Facturación 1-Clic** | Crear y timbrar CFDI en 30 segundos vs 5-10 min en Contpaqi | Contpaqi, Aspel | KIL-001 |
| **Conciliación Automática** | IA empareja transacciones bancarias sin intervención manual | Todos | KIL-002 |
| **Descarga SAT Background** | Sincronización automática de facturas SAT cada hora | Alegra, QuickBooks | KIL-003 |
| **Historial Ilimitado** | PostgreSQL 18 sin límite de años vs 2 años de Contpaqi | Contpaqi | KIL-012 |
| **Validador EFOS** | Verificación diaria contra listas 69-B del SAT | Todos menos Contpaqi | KIL-015 |
| **Predictor Flujo Caja** | Prophet ML predice déficit con 90 días anticipación | Todos (exclusivo) | KIL-026 |
| **OCR Tickets MX** | Gemini Vision extrae datos de tickets mexicanos (Oxxo, etc.) | Todos (exclusivo) | KIL-030 |
| **Zero-Touch Bookkeeping** | Contabilidad automática para freelancers RESICO | Todos (exclusivo) | KIL-036 |

**Referencia completa:** Ver `PROJECT_CHARACTERISTICS/12_KILLER_FEATURES_VS_COMPETENCIA.md` para las 45 features y análisis de 10 competidores.

## 5. Módulos del Proyecto (13 Total)

| Módulo | Características | Estado | Descripción |
|:-------|:---------------|:-------|:------------|
| 01 - Core Financiero | 45 | ✅ | Transacciones, cuentas, presupuestos |
| 02 - Contabilidad SAT | 35 | ✅ | CFDI 4.0/5.0, validaciones, compliance |
| 03 - Inteligencia Analítica | 36 | ✅ | Reportes, IA, predicciones |
| 04 - Gamificación | 30 | ✅ | Retos, badges, psicología MX |
| 05 - Seguridad | 24 | ✅ | Cifrado, 2FA, auditoría |
| 06 - Experiencia Usuario | 20 | ✅ | UI/UX, PWA, accesibilidad |
| 07 - Integraciones | 15 | ✅ | Open Banking, PAC, SAT |
| 08 - Negocio | 12 | ✅ | Planes, pricing, afiliados |
| 09 - Palantir Enterprise | 11 | ✅ | Data Fabric, CRM, B2B |
| 10 - Infraestructura | 5 | ✅ | Docker, VPS, CI/CD |
| 11 - Calculadoras KPIs | - | ✅ | KPIs empresariales |
| **12 - Killer Features** | **45** | **✅** | **Ventajas vs 10 competidores** |
| **13 - Mapa Tecnológico** | **-** | **✅** | **Guía tecnología→feature** |

## 6. Inventario de Activos a Migrar

1. **Lógica de Backend:** `Prototipo/finanzas-app-mx/backend` (conservar estructura Hexagonal basada en Bun/Elysia).
2. **Infraestructura:** `Prototipo/finanzas-app-mx/infrastructure` (Docker Compose, Traefik y scripts de despliegue).
3. **Documentación Estratégica:** `Proeycto reescrito/01_VISION_ESTRATEGICA.md` (fundamentos de negocio y narrativa comercial).
4. **Investigación SAT:** `App_movil-main/Claude_estudialo` (reglas de validación RFC y listas 69-B).

## 8. Guía Rápida de Actualización

1. **Agregar término nuevo:** incluir definición, archivo fuente y cómo afecta otra capa (dominio, aplicación o infraestructura).
2. **Cambiar tecnología:** justificar la decisión y registrar ADR asociado en `03_STACK_TECNOLOGICO_DEFINITIVO.md`.
3. **Nueva killer feature:** documentar en Módulo 12 con competidor afectado y debilidad que ataca.
4. **Auditoría periódica:** cada release mayor debe validar que las rutas de código aquí listadas sigan vigentes para evitar referencias rotas.

---

**Última revisión:** 12 Diciembre 2025  
**Próxima auditoría programada:** Marzo 2026
