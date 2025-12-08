# 📖 GLOSARIO TÉCNICO Y DE NEGOCIO: PRO_FINAN_CONTA_PYM

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
| **PostgreSQL 18 + pgvector** | Base relacional y motor semántico.                            | ✅ `database/migrations/`                      | Permite ACID para core financiero y búsquedas IA sin servicios externos.         |
| **Redis 8**                  | Caché, sesiones y colas BullMQ.                               | ✅ `infrastructure/docker/`                    | Streams mejorados y comandos HSETEX para tokens rotables.                        |
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

## 4. Inventario de Activos a Migrar

1. **Lógica de Backend:** `Prototipo/finanzas-app-mx/backend` (conservar estructura Hexagonal basada en Bun/Elysia).
2. **Infraestructura:** `Prototipo/finanzas-app-mx/infrastructure` (Docker Compose, Traefik y scripts de despliegue).
3. **Documentación Estratégica:** `Proeycto reescrito/01_VISION_ESTRATEGICA.md` (fundamentos de negocio y narrativa comercial).
4. **Investigación SAT:** `App_movil-main/Claude_estudialo` (reglas de validación RFC y listas 69-B).

## 5. Guía Rápida de Actualización

1. **Agregar término nuevo:** incluir definición, archivo fuente y cómo afecta otra capa (dominio, aplicación o infraestructura).
2. **Cambiar tecnología:** justificar la decisión y registrar ADR asociado en `03_STACK_TECNOLOGICO_DEFINITIVO.md`.
3. **Auditoría periódica:** cada release mayor debe validar que las rutas de código aquí listadas sigan vigentes para evitar referencias rotas.
