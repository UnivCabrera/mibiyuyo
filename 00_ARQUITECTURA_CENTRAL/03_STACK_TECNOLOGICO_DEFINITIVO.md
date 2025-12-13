# 🏗️ STACK TECNOLÓGICO DEFINITIVO (2026)

**Proyecto:** PRO_FINAN_CONTA_PYM
**Versión del Documento:** 5.1
**Fecha:** 12 Diciembre 2025
**Total Features:** 278 características documentadas
**Killer Features:** 45 ventajas vs competencia
**Actualización:** CONSOLIDACIÓN FINAL - Vendors decididos, huecos cerrados, 100% operativo
**Referencia:** Ver [Módulo 13](../PROJECT_CHARACTERISTICS/13_MAPA_TECNOLOGIA_FEATURES.md) para mapeo tecnología→features

Este documento define la **"Fuente de la Verdad"** tecnológica para el desarrollo y despliegue del Unicornio FinTech. Todas las decisiones de ingeniería deben alinearse con este stack.

---

## 🎯 DOCUMENTO CLAVE

> **MATRIZ MAESTRA:** `00_ARQUITECTURA_CENTRAL/00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md`
>
> Este stack permite cumplir TODAS las promesas de la Matriz Maestra. ✅

---

## 🟢 DECISIONES FINALES DE VENDORS (Consolidación Enero 2025)

| Hueco Identificado           | **DECISIÓN FINAL**          | Justificación Costo-Efectiva                                                                                                        |
| :--------------------------- | :-------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Open Banking**             | **Finerio Connect** 🇲🇽      | Empresa mexicana, ISO 27001, experiencia LATAM, modelo pricing B2B negociable, +120 clientes en MX. Belvo tiene enfoque más Brasil. |
| **PAC Timbrado**             | **Finkok (OnDemand)**       | Modelo "paga solo lo que consumes" - SIN cuota fija mensual. Ideal para startup. API REST moderna.                                  |
| **Autenticación SAT**        | **Desarrollo Interno**      | CIEC/FIEL son protocolos estándar XML. Usaremos librerías open source + scraping controlado. Costo: $0.                             |
| **Email Transaccional**      | **Resend (Free Tier)**      | 3,000 emails/mes GRATIS. SOC 2, GDPR. SDK moderno. Tier Pro $20/mes cuando escale.                                                  |
| **Push Notifications**       | **Firebase FCM (Gratis)**   | 100% gratuito para notificaciones. Sin límite práctico para startups.                                                               |
| **Marketplace Integrations** | **APIs Oficiales**          | Mercado Libre OAuth gratuito. Amazon SP-API gratuito. Solo tiempo de desarrollo.                                                    |
| **BYOK Crypto**              | **Node.js Crypto (Nativo)** | AES-256-GCM + PBKDF2. Cero dependencias externas. Máxima seguridad. Costo: $0.                                                      |

---

## 💰 ANÁLISIS DE COSTOS OPERATIVOS (Año 1)

| Servicio         | Tier       |   Costo Mensual |      Costo Anual | Notas                           |
| :--------------- | :--------- | --------------: | ---------------: | :------------------------------ |
| Hostinger VPS    | KVM 2      |        $200 MXN |       $2,400 MXN | 4 vCPU, 8GB RAM, 200GB NVMe     |
| Finerio Connect  | Negociable | $0 - $2,000 MXN |         Variable | Modelo B2B, contactar ventas    |
| Finkok PAC       | OnDemand   |  ~$1.50/factura |         Variable | Sin cuota fija, pago por uso    |
| Resend Email     | Free → Pro |   $0 - $400 MXN |  $0 - $4,800 MXN | 3K gratis, luego $20 USD/mes    |
| Firebase FCM     | Free       |              $0 |               $0 | Siempre gratis                  |
| Cloudflare       | Free       |              $0 |               $0 | DNS, Tunnel, CDN incluidos      |
| GitHub           | Free       |              $0 |               $0 | Repos privados ilimitados       |
| **TOTAL MÍNIMO** |            |   **~$200 MXN** |  **~$2,400 MXN** | Sin contar Finerio              |
| **TOTAL MÁXIMO** |            | **~$4,000 MXN** | **~$48,000 MXN** | Con todos los servicios activos |

> 💡 **Comparación:** Competidores como Alegra o CONTPAQi cobran $300-800 MXN/mes POR USUARIO. Nosotros operamos toda la infraestructura por menos que UN usuario de la competencia.

---

## 🔴 INTEGRACIONES CRÍTICAS PARA CUMPLIR PROMESAS

| Promesa (Matriz Maestra) | Integración Requerida | Vendor/Solución            |   Estado    |
| :----------------------- | :-------------------- | :------------------------- | :---------: |
| Sync bancaria automática | Open Banking API      | **Finerio Connect**        | ✅ Decidido |
| Conexión SAT (CIEC/FIEL) | SAT Auth Service      | **Interno (xml2js + got)** | ✅ Decidido |
| Facturación CFDI         | PAC Timbrado          | **Finkok OnDemand**        | ✅ Decidido |
| Conexión Mercado Libre   | ML OAuth + API        | **API Oficial ML**         | ✅ Decidido |
| Notificaciones push      | Push Service          | **Firebase FCM**           | ✅ Decidido |
| Email Transaccional      | Email API             | **Resend**                 | ✅ Decidido |
| BYOK (API Keys cifradas) | Crypto Service        | **Node.js Crypto Nativo**  | ✅ Decidido |
| 70 Lifestyle Tools       | Client-side JS/WASM   | **Ver sección 4.7**        | ✅ Diseñado |

---

## 🚫 TECNOLOGÍAS EXCLUIDAS (Por decisión de arquitectura)

| Tecnología       | Razón de Exclusión                                                                       |
| :--------------- | :--------------------------------------------------------------------------------------- |
| **React**        | Preferimos Svelte por su compilación AOT, menor bundle size y sintaxis más limpia        |
| **Next.js**      | SvelteKit ofrece las mismas capacidades (SSR, SSG, API Routes) con mejor DX              |
| **Tailwind CSS** | Optamos por CSS nativo con variables (Open Props) para mayor control y menor dependencia |

---

## 1. INFRAESTRUCTURA PAAS (Dokploy Self-Hosted)

La infraestructura se gestiona mediante **Dokploy**, una plataforma PaaS self-hosted sobre Docker Swarm/Compose. Esto simplifica la gestión, despliegue y mantenimiento, permitiendo foco total en el código.

| Capa                  | Tecnología               | Versión   | Justificación                                                                    |
| :-------------------- | :----------------------- | :-------- | :------------------------------------------------------------------------------- |
| **Plataforma PaaS**   | **Dokploy**              | Latest    | Gestión visual de contenedores, bases de datos y despliegues. Open Source.       |
| **Sistema Operativo** | **Ubuntu Server**        | 24.04 LTS | Base sólida para ejecutar Docker y el agente de Dokploy.                         |
| **Orquestación**      | **Docker Swarm**         | Nativo    | Gestionado por Dokploy. Permite escalado horizontal y zero-downtime deployments. |
| **Reverse Proxy**     | **Traefik**              | v3.x      | Gestionado automáticamente por Dokploy. SSL automático (Let's Encrypt).          |
| **Base de Datos**     | **PostgreSQL**           | 16.x+     | Desplegada vía Dokploy con backups automáticos a S3.                             |
| **Caché / Colas**     | **Redis**                | 7.x+      | Desplegada vía Dokploy. Gestión visual de estado.                                |
| **Seguridad PaaS**    | **Cloudflare Tunnel**    | -         | Oculta el panel de administración de internet pública. Acceso Zero Trust.        |
| **Backups**           | **S3 / MinIO**           | -         | Configuración nativa en Dokploy para dumps diarios de DB y volúmenes.            |
| **CI/CD**             | **Dokploy + GH Actions** | -         | Despliegue automático al hacer push (Git) o vía Webhook tras pasar tests.        |

### 🔒 Seguridad Específica para Dokploy

Dado que Dokploy expone un panel de control crítico:

1.  **Acceso al Panel:** Protegido estrictamente. Idealmente no expuesto por IP pública directa, sino a través de **Cloudflare Tunnel** con autenticación adicional (Access) o restringido por IP en el Firewall de Hostinger.
2.  **Autenticación:** 2FA activado obligatoriamente para el usuario administrador de Dokploy.
3.  **Aislamiento:** La base de datos no expone puertos al exterior, solo a la red interna de Docker (comunicación privada entre contenedores).
4.  **Actualizaciones:** Dokploy se actualiza desde el panel. Programar revisión mensual de updates.
5.  **Backup de Configuración:** Exportar configuración de Dokploy semanalmente a S3.

### 🚀 Features de Dokploy a Explotar al Máximo

| Feature                         | Descripción                             | Uso en el Proyecto                                 |
| :------------------------------ | :-------------------------------------- | :------------------------------------------------- |
| **Multi-Server (Docker Swarm)** | Gestionar múltiples VPS como un cluster | Preparación para escalamiento a 2+ VPS en ~6 meses |
| **Preview Deployments**         | Entornos efímeros para cada PR          | QA automático antes de merge a main                |
| **Git Integration**             | Deploy automático al push               | CI/CD simplificado sin scripts SSH                 |
| **Database Management**         | Crear/gestionar Postgres, Redis, MySQL  | Un clic para bases de datos con backups            |
| **Automatic SSL**               | Let's Encrypt integrado vía Traefik     | HTTPS automático para todos los servicios          |
| **Environment Variables**       | Gestión visual de secrets               | Reemplaza archivos .env manuales                   |
| **Real-time Logs**              | Logs en vivo en el panel                | Debugging sin SSH                                  |
| **Resource Monitoring**         | CPU, RAM, Disco por contenedor          | Alertas de saturación (~85% trigger)               |
| **Backup to S3**                | Dumps automáticos de DB y volúmenes     | RPO < 5 min para datos críticos                    |
| **Docker Compose Native**       | Importar archivos compose existentes    | Migración sin reescribir configuración             |
| **Webhooks**                    | URLs secretas para triggear deploys     | Integración GitHub Actions segura                  |
| **Templates**                   | Servicios pre-configurados              | Deploy rápido de Grafana, Prometheus, etc.         |

### 📦 Servicios a Desplegar en Dokploy

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DOKPLOY - ORGANIZACIÓN                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  📁 Proyecto: profinanconta                                        │
│  ├── 🌐 frontend (SvelteKit)        → app.profinanconta.mx         │
│  ├── ⚡ backend (ElysiaJS/Bun)      → api.profinanconta.mx         │
│  ├── 🤖 embedding-service           → interno (no expuesto)        │
│  └── 📄 landing-page                → profinanconta.mx             │
│                                                                     │
│  📁 Databases (Managed by Dokploy)                                 │
│  ├── 🐘 postgres-main               → Backup S3 cada 4h            │
│  ├── 🔴 redis-cache                 → Backup S3 diario             │
│  └── 🔍 postgres-analytics          → Backup S3 diario             │
│                                                                     │
│  📁 Observabilidad                                                 │
│  ├── 📊 grafana                     → metrics.profinanconta.mx     │
│  ├── 📈 prometheus                  → interno                      │
│  ├── 🔔 alertmanager                → interno                      │
│  └── 📝 loki (logs)                 → interno                      │
│                                                                     │
│  📁 Soporte                                                        │
│  ├── 💬 chatwoot                    → chat.profinanconta.mx        │
│  ├── 📚 docusaurus (docs)           → docs.profinanconta.mx        │
│  └── 📅 cal-com                     → agenda.profinanconta.mx      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. RUNTIME Y TOOLING

### ⚡ Runtime Principal: Bun + Node.js (Híbrido)

**Estrategia:** Usar Bun como runtime principal por su velocidad extrema. Para dependencias que no soporten Bun (algunas librerías legacy o bindings específicos), usamos Node.js como fallback.

| Componente            | Tecnología      | Versión     | Notas                                                                                   |
| :-------------------- | :-------------- | :---------- | :-------------------------------------------------------------------------------------- |
| **Runtime Principal** | **Bun**         | 1.3.3+      | 21x más rápido que Express. Ejecuta TS nativamente.                                     |
| **Runtime Fallback**  | **Node.js**     | 24.11.1 LTS | Para dependencias incompatibles con Bun. npm 11.6.2 incluido. Current: 25.2.1           |
| **Package Manager**   | **bun install** | -           | Lockfile `bun.lockb` para reproducibilidad.                                             |
| **Test Runner**       | **bun test**    | -           | Compatible con Jest API. Vitest como alternativa.                                       |
| **Lenguaje**          | **TypeScript**  | 5.9+        | Strict mode obligatorio. Incluye `import defer`, `--module node20`, hovers expandibles. |
| **Servicios IA/ML**   | **Python**      | 3.14+       | Para modelos ML, scripts de data science, fine-tuning.                                  |

---

## 3. BACKEND (`/apps/backend`)

Arquitectura **Hexagonal (Puertos y Adaptadores)** con **DDD (Domain-Driven Design)**.

### 🧠 Core Stack Backend

| Capa                    | Tecnología                  | Justificación                                                                                                |
| :---------------------- | :-------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **Framework Web**       | **ElysiaJS 1.4.16+**        | Optimizado para Bun. End-to-end type safety con Eden Treaty. OpenAPI automático. Soporte Cloudflare Workers. |
| **ORM**                 | **Drizzle ORM**             | SQL-like, zero runtime overhead, migraciones nativas, compatible Bun SQL.                                    |
| **Patrón de Datos**     | **Repository Pattern**      | Centraliza acceso a datos. Ver `15_ARQUITECTURA_AVANZADA_Y_AUDITORIA/08_PATRONES_ARQUITECTURA_PENDIENTES.md` |
| **Validación**          | **TypeBox** (nativo Elysia) | Schemas JSON que validan en runtime y generan tipos TS.                                                      |
| **Autenticación**       | **Auth.js (SvelteKit)**     | OAuth2, Magic Links, Credentials. Adaptador Drizzle incluido.                                                |
| **Sesiones**            | **Redis** + JWT             | Access tokens cortos (15min), refresh tokens en Redis con rotación.                                          |
| **Colas de Trabajo**    | **BullMQ**                  | Jobs en background (sync SAT, OCR, reportes). Redis como broker.                                             |
| **WebSockets**          | **ElysiaJS WS**             | µWebSocket built-in. Notificaciones en tiempo real.                                                          |
| **Pub/Sub Tiempo Real** | **Redis Pub/Sub**           | Notificaciones push sin polling. Ver `13_RESILIENCIA_INFRAESTRUCTURA/`                                       |

### 🔌 Integraciones Externas

| Servicio         | Tecnología/API                           | Uso                                                                                     |
| :--------------- | :--------------------------------------- | :-------------------------------------------------------------------------------------- |
| **SAT México**   | Scraping + XML Parsing + **API Wrapper** | Descarga de facturas, validación CFDI 4.0, listas negras 69-B. Con timeout/retry/cache. |
| **PAC Timbrado** | API REST (Finkok) + **API Wrapper**      | Timbrado de facturas electrónicas CFDI. Con circuit breaker.                            |
| **OCR Facturas** | **Google Gemini Pro**                    | Extracción de datos de tickets/facturas escaneadas.                                     |
| **Chatbot IA**   | **Gemini Pro + RAG**                     | Asistente financiero con contexto de leyes fiscales MX.                                 |
| **Embeddings**   | **EmbeddingGemma-300M**                  | Embeddings locales para búsqueda semántica (on-device/VPS).                             |
| **Open Banking** | **Finerio Connect** + **API Wrapper**    | Agregación de cuentas bancarias (futuro).                                               |

> **Nota:** Todas las integraciones externas usan **API Wrappers** con timeout, retry, cache y circuit breaker.
> Ver documentación completa en `10_API_DOCS/01_API_REFERENCE.md` sección "Wrappers para APIs Externas".

### 🔐 3.1 BYOK (Bring Your Own Key) - Implementación Técnica

> Para cumplir la promesa BYOK de la Matriz Maestra:

```typescript
// Módulo: /apps/backend/src/infrastructure/byok/

import {
  createCipheriv,
  createDecipheriv,
  pbkdf2Sync,
  randomBytes,
} from "crypto";

interface BYOKConfig {
  provider: "gemini" | "openai" | "anthropic";
  encryptedKey: string; // AES-256-GCM encrypted
  iv: string; // Initialization Vector
  salt: string; // Para PBKDF2
}

// Derivar clave de cifrado desde password del usuario
function deriveKey(userPassword: string, salt: Buffer): Buffer {
  return pbkdf2Sync(userPassword, salt, 100000, 32, "sha256");
}

// Cifrar API Key del usuario
export function encryptAPIKey(
  apiKey: string,
  userPassword: string,
): BYOKConfig {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = deriveKey(userPassword, salt);

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(apiKey, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");

  return {
    provider: "gemini", // o detectar automáticamente
    encryptedKey: encrypted + ":" + authTag,
    iv: iv.toString("hex"),
    salt: salt.toString("hex"),
  };
}

// Descifrar solo en memoria, al momento de usar
export function decryptAPIKey(
  config: BYOKConfig,
  userPassword: string,
): string {
  const [encrypted, authTag] = config.encryptedKey.split(":");
  const key = deriveKey(userPassword, Buffer.from(config.salt, "hex"));

  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(config.iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted; // NUNCA loguear esto
}
```

### 📦 3.2 Integraciones Pendientes (Roadmap)

| Integración             | Prioridad | Vendor Final           | Perfil(es) que lo Necesitan        | Tiempo Estimado |
| :---------------------- | :-------: | :--------------------- | :--------------------------------- | :-------------: |
| **Finerio Connect SDK** |  🔴 ALTA  | Finerio Connect        | Equilibrista, Explorador           |    2 semanas    |
| **SAT Auth (CIEC)**     |  🔴 ALTA  | Interno (xml2js + got) | Comandante, Orquestador            |    3 semanas    |
| **PAC Finkok**          |  🔴 ALTA  | Finkok OnDemand        | Constructor, Comandante, Escalador |    2 semanas    |
| **Mercado Libre OAuth** | 🟡 MEDIA  | API Oficial ML         | Escalador                          |    2 semanas    |
| **Amazon SP-API**       |  🟢 BAJA  | API Oficial Amazon     | Escalador (Business)               |    3 semanas    |
| **Firebase FCM**        | 🟡 MEDIA  | Firebase (Google)      | Todos (PRO)                        |    1 semana     |
| **Resend Email**        | 🟡 MEDIA  | Resend                 | Todos                              |     3 días      |

---

## 4. FRONTEND (`/apps/frontend`)

### 🎨 Core Stack Frontend

| Capa                   | Tecnología                    | Versión | Justificación                                                      |
| :--------------------- | :---------------------------- | :------ | :----------------------------------------------------------------- |
| **Framework**          | **Svelte 5**                  | Latest  | Compilación AOT, Runes ($state, $derived, $effect), bundle mínimo. |
| **Meta-Framework**     | **SvelteKit**                 | Latest  | SSR, SSG, API Routes, Adapter-node para Docker.                    |
| **Estilos**            | **CSS Nativo + Open Props**   | -       | Variables CSS modernas, sin dependencias, máximo control.          |
| **Componentes UI**     | **Bits UI** (Headless)        | Latest  | Primitivos accesibles (WAI-ARIA). Sin estilos impuestos.           |
| **Componentes UI**     | **shadcn-svelte**             | Latest  | Componentes copiables, estilizables con CSS nativo.                |
| **Gráficos**           | **Chart.js** + svelte-chartjs | 4.x     | Gráficas financieras (líneas, barras, donuts).                     |
| **Gráficos Avanzados** | **Unovis**                    | Latest  | Visualizaciones complejas (flujos, redes, heatmaps).               |
| **Iconos**             | **Lucide Svelte**             | Latest  | Iconos SVG optimizados, tree-shakeable.                            |
| **Formularios**        | **Superforms** + **Zod**      | Latest  | Validación client/server unificada.                                |

### 4.1 LIBRERÍAS DE ESPECIALIZACIÓN FINTECH & UX (2026)

Estas herramientas cierran la brecha entre una "web app" y una "herramienta financiera profesional", garantizando la experiencia de usuario exigida por el mercado en 2026.

| Categoría                | Librería                  | Justificación (UX/Performance)                                                                                                              |
| :----------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tablas de Datos**      | **TanStack Table v8**     | Manejo "Headless" de miles de filas, filtros complejos, ordenamiento multi-columna y virtualización. Indispensable para reportes contables. |
| **Máscaras de Input**    | **IMask** (svelte-imask)  | UX crítica: Formateo en tiempo real de Moneda ($1,234.56), RFC, CURP y Tarjetas sin romper el modelo de datos.                              |
| **Visor Documentos**     | **PDF.js** (wrapper)      | Visualización de facturas y estados de cuenta _in-app_ (sin descargas forzadas), permitiendo flujos de revisión rápidos.                    |
| **Manejo de Fechas**     | **date-fns**              | Manipulación inmutable y ligera de fechas. Crucial para periodos fiscales, zonas horarias de México y formatos locales.                     |
| **Internacionalización** | **Paraglide JS** (Inlang) | i18n moderno con type-safety total. Carga cero en runtime si no se usa. Preparado para expansión global.                                    |
| **Exportación**          | **ExcelJS**               | Generación de reportes .xlsx con estilos y fórmulas en el cliente (sin sobrecargar el servidor).                                            |
| **Notificaciones**       | **Sonner** (Svelte)       | Toasts apilables, accesibles y con soporte de promesas (ej: "Guardando..." -> "Guardado").                                                  |
| **Onboarding**           | **Driver.js**             | Guías interactivas paso a paso para enseñar al usuario a usar la plataforma (crucial para reducir soporte).                                 |

### 4.2 HERRAMIENTAS DE PLATAFORMA Y OPERACIONES (Open Source)

Estas herramientas completan la plataforma para operación profesional y soporte multiidioma.

| Categoría                     | Herramienta                 | Justificación                                                                                |
| :---------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------- |
| **Soporte al Cliente**        | **Chatwoot** (self-hosted)  | Chat en vivo + tickets + base de conocimiento. Open source, GDPR-compliant.                  |
| **Agendar Citas**             | **Cal.com**                 | Scheduling para llamadas de soporte o demos. Open source.                                    |
| **Notificaciones Unificadas** | **Novu**                    | Orquestador de notificaciones (push, email, SMS, in-app) desde un solo lugar.                |
| **Analytics de Producto**     | **Plausible** o **PostHog** | Métricas de uso sin violar privacidad. PostHog incluye feature flags y session replay.       |
| **Feature Flags**             | **Unleash** o **PostHog**   | Activar/desactivar features por usuario, plan o porcentaje. A/B testing incluido.            |
| **Help Center**               | **Docusaurus**              | Documentación pública (FAQ, tutoriales, guías). SEO-friendly.                                |
| **Pasarela de Pagos**         | **Stripe**                  | Stripe para pagos internacionales y tarjetas. Única pasarela (simplicidad > fragmentación).  |
| **Generación de PDFs**        | **@react-pdf/renderer**     | Crear facturas y reportes PDF desde código. Compatible con Bun.                              |
| **Vault de Secretos**         | **Infisical**               | Gestión segura de CIEC, FIEL y API keys. Más simple que HashiCorp Vault.                     |
| **Logs Estructurados**        | **Pino**                    | Logging JSON ultra-rápido. Integra con Grafana Loki.                                         |
| **Optimización Imágenes**     | **Sharp**                   | Redimensionar y comprimir tickets/recibos antes de almacenar.                                |
| **Email Templates**           | **React Email** o **MJML**  | Plantillas de email bonitas y responsive para verificación, alertas, reportes.               |
| **Cron Monitoring**           | **Healthchecks.io**         | Verificar que jobs de BullMQ (sync SAT, backups) corran correctamente. Free tier suficiente. |
| **WhatsApp Business**         | **WhatsApp Business API**   | Envío de facturas y recibos por WhatsApp (90% penetración MX). Cloud API oficial.            |
| **Compresión de Datos**       | **Brotli / gzip**           | Compresión extrema para modo ahorro de datos (inspirado en África). Reduce 70% payload.      |
| **Background Sync**           | **Workbox**                 | Sincronización en background para PWA. Cola de transacciones offline.                        |

### 4.4 INTERFAZ TANGRAM - STACK DE MODULARIDAD

Sistema de dashboard personalizable con carga bajo demanda. Ver especificación completa en `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md`.

| Categoría                 | Herramienta                 | Justificación                                                 |
| :------------------------ | :-------------------------- | :------------------------------------------------------------ |
| **Grid Layout**           | **svelte-grid**             | Layout con drag & drop y resize. Nativo Svelte, sin wrappers. |
| **Drag & Drop**           | **svelte-dnd-action**       | Animaciones fluidas, soporte touch, accesible. 8KB gzipped.   |
| **Dynamic Import**        | **Vite (nativo)**           | Code splitting automático. Widget oculto = 0 KB cargado.      |
| **Layout Persistence**    | **LocalStorage + Drizzle**  | Offline-first, sync con servidor cuando hay conexión.         |
| **Schema Validation**     | **Zod**                     | Validación de JSON de layouts importados/exportados.          |
| **Intersection Observer** | **API nativa**              | Detectar visibilidad de widgets para lazy loading.            |
| **Prefetch**              | **`<link rel="prefetch">`** | Pre-cargar widgets probables en hover del menú.               |

### 4.5 RESILIENCIA PARA MERCADOS EMERGENTES (Inspirado en África)

Herramientas para funcionar en condiciones de red adversas (México rural, tianguis, zonas 3G).

| Categoría                | Herramienta                       | Justificación                                            |
| :----------------------- | :-------------------------------- | :------------------------------------------------------- |
| **Offline Database**     | **Dexie.js (IndexedDB)**          | Base de datos local robusta. Transacciones sin conexión. |
| **SMS Fallback**         | **Twilio / MessageBird**          | Registro de transacciones por SMS cuando no hay datos.   |
| **Ultra-Lite Bundle**    | **Vite + Manual Chunks**          | App core < 150KB. Módulos opcionales cargados después.   |
| **Image Compression**    | **Sharp + WebP/AVIF**             | Tickets comprimidos al 10% del tamaño original.          |
| **Connection Detection** | **Navigator.onLine + fetch ping** | Detectar estado de red y adaptar UI.                     |
| **Queue Management**     | **Workbox Background Sync**       | Cola de operaciones pendientes con retry automático.     |

### 4.6 HERRAMIENTAS ENTERPRISE / B2B (Fase 2027+)

Preparación para clientes corporativos sin implementar ahora. Solo documentación y arquitectura.

| Categoría            | Herramienta                       | Uso Futuro                                              |
| :------------------- | :-------------------------------- | :------------------------------------------------------ |
| **SSO Enterprise**   | **SAML 2.0 / OIDC**               | Login corporativo para bancos/empresas grandes.         |
| **Audit Compliance** | **Logs inmutables + Export**      | Cumplimiento SOC 2, ISO 27001 para clientes enterprise. |
| **Multi-tenancy**    | **PostgreSQL Row Level Security** | Aislamiento de datos por cliente corporativo.           |
| **White-label**      | **Theming CSS Variables**         | Personalización de marca para licenciamiento.           |
| **API Metered**      | **Rate limiting + Billing**       | Cobro por uso de API a terceros.                        |
| **SLA Dashboard**    | **Grafana + Prometheus**          | Reportes de uptime para contratos enterprise.           |

### 4.7 70 LIFESTYLE TOOLS - STACK CLIENT-SIDE (Costo Servidor: $0)

> Estas herramientas corren 100% en el navegador del usuario. No consumen recursos del servidor.
> Referencia completa: `00_ARQUITECTURA_CENTRAL/00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md`

| Categoría                  | Librería                    | Tamaño | Uso                                         |
| :------------------------- | :-------------------------- | :----: | :------------------------------------------ |
| **Confetti/Celebraciones** | `canvas-confetti`           |  3KB   | Celebrar metas cumplidas, pagos completados |
| **Sonidos UX**             | `howler.js`                 |  12KB  | Feedback auditivo en acciones (opt-in)      |
| **Pomodoro Timer**         | Nativo JS                   |  0KB   | Timer de productividad con Audio API        |
| **Calculadoras**           | Custom Svelte               |  0KB   | ISR, IVA, nómina, ROI, break-even           |
| **Conversor Divisas**      | `fixer.io` free API         |  0KB   | Tiempo real USD/MXN/EUR (API gratuita)      |
| **QR Generator**           | `qrcode`                    |  8KB   | Generar QR de facturas para pago            |
| **Generador Contraseñas**  | Web Crypto API              |  0KB   | Nativo del navegador, sin librería          |
| **Editor Notas**           | `tiptap` (headless)         |  45KB  | Notas rápidas, listas de tareas             |
| **Checklist Templates**    | Custom Svelte               |  0KB   | Checklists fiscales predefinidas            |
| **Mood Tracker**           | Chart.js (ya incluido)      |  0KB   | Gráfica emocional para emprendedores        |
| **Habit Tracker**          | Custom + IndexedDB          |  0KB   | Seguimiento de hábitos financieros          |
| **Vision Board**           | `fabric.js`                 |  98KB  | Canvas para metas visuales (lazy load)      |
| **Breathing Exercise**     | CSS + requestAnimationFrame |  0KB   | Ejercicio 4-7-8 para estrés                 |
| **White Noise**            | Web Audio API + samples     |  0KB   | Sonidos ambientales para concentración      |
| **Expense Splitter**       | Custom Svelte               |  0KB   | Dividir gastos entre socios                 |
| **Meeting Timer**          | Nativo JS                   |  0KB   | Cronómetro de reuniones con costo/hora      |
| **Invoice Scanner**        | Gemini Vision (BYOK)        |  0KB   | OCR con API key del usuario                 |
| **Screenshot Editor**      | `tldraw` lite               | 120KB  | Anotar screenshots de facturas (lazy)       |
| **Color Contrast**         | Nativo JS                   |  0KB   | Verificar accesibilidad de marca            |
| **Favicon Generator**      | `canvas` API                |  0KB   | Crear favicon desde logo                    |

#### Estrategia de Carga

```typescript
// /apps/frontend/src/lib/lifestyle-tools/loader.ts

// Mapa de herramientas y sus chunks
const LIFESTYLE_TOOLS = {
  // Herramientas ultraligeras (siempre disponibles)
  pomodoro: () => import("./tools/pomodoro.svelte"),
  calculators: () => import("./tools/calculators.svelte"),
  "password-gen": () => import("./tools/password-gen.svelte"),
  breathing: () => import("./tools/breathing.svelte"),

  // Herramientas medianas (cargar en hover)
  "qr-generator": () => import("./tools/qr-generator.svelte"),
  "notes-editor": () => import("./tools/notes-editor.svelte"),
  "habit-tracker": () => import("./tools/habit-tracker.svelte"),

  // Herramientas pesadas (solo bajo demanda explícita)
  "vision-board": () => import("./tools/vision-board.svelte"),
  "screenshot-editor": () => import("./tools/screenshot-editor.svelte"),
} as const;

// Prefetch en hover del menú
export function prefetchTool(toolId: keyof typeof LIFESTYLE_TOOLS) {
  const loader = LIFESTYLE_TOOLS[toolId];
  if (loader) {
    // Inicia descarga sin ejecutar
    loader();
  }
}

// Carga real al abrir
export async function loadTool(toolId: keyof typeof LIFESTYLE_TOOLS) {
  const loader = LIFESTYLE_TOOLS[toolId];
  if (!loader) throw new Error(`Tool ${toolId} not found`);
  return await loader();
}
```

#### Budget de Performance

| Categoría                |   Target | Medición          |
| :----------------------- | -------: | :---------------- |
| **Core App (sin tools)** | < 150 KB | gzip, First Load  |
| **Con 10 tools ligeras** | < 200 KB | gzip, Lazy loaded |
| **Tool más pesada**      | < 150 KB | gzip, On-demand   |
| **Time to Interactive**  |     < 2s | 3G simulado       |
| **Lighthouse Score**     |     > 90 | Mobile            |

### 4.3 CONFIGURACIÓN MULTIDIOMA (i18n/l10n)

| Aspecto                | Herramienta/Técnica              | Notas                                                            |
| :--------------------- | :------------------------------- | :--------------------------------------------------------------- |
| **Traducciones UI**    | **Paraglide JS**                 | Type-safe, zero runtime overhead.                                |
| **Formateo Fechas**    | **Intl.DateTimeFormat** (nativo) | Respeta locale del usuario automáticamente.                      |
| **Formateo Moneda**    | **Intl.NumberFormat** (nativo)   | $1,234.56 MXN vs $1,234.56 USD automático.                       |
| **Calendarios/Zonas**  | **@internationalized/date**      | Manejo robusto de zonas horarias (crítico para fechas fiscales). |
| **Pluralización**      | **Intl.PluralRules** (nativo)    | "1 factura" vs "2 facturas" correcto en cada idioma.             |
| **Idiomas Soportados** | es-MX (principal), en-US, es-ES  | Expansión futura: pt-BR para Brasil.                             |

### 📱 PWA y Offline

| Feature             | Tecnología                 | Descripción                                    |
| :------------------ | :------------------------- | :--------------------------------------------- |
| **Service Workers** | **Vite PWA Plugin**        | Caché agresivo, background sync.               |
| **Offline Storage** | **IndexedDB** (Dexie.js)   | Almacenar facturas/transacciones sin conexión. |
| **Sync Strategy**   | **Stale-While-Revalidate** | Datos frescos sin bloquear UI.                 |
| **Mobile UX**       | **Capacitor** (futuro)     | Convertir PWA a app nativa iOS/Android.        |

---

## 5. INTELIGENCIA ARTIFICIAL Y ML

| Componente        | Tecnología                | Uso                                                     |
| :---------------- | :------------------------ | :------------------------------------------------------ |
| **LLM Principal** | **Google Gemini Pro**     | Chat, análisis, generación de reportes narrativos.      |
| **Embeddings**    | **EmbeddingGemma-300M**   | Vectores para RAG local, búsqueda semántica.            |
| **Vector Store**  | **pgvector** (PostgreSQL) | Almacén de embeddings con búsqueda por similitud.       |
| **RAG Pipeline**  | Custom (Bun + Gemini)     | Retrieval-Augmented Generation para consultas fiscales. |
| **OCR**           | **Gemini Pro Vision**     | Extracción de datos de imágenes de tickets.             |
| **Predicciones**  | **Python + Prophet**      | Forecasting de flujo de caja (scripts auxiliares).      |

---

## 6. SEGURIDAD (Security Stack)

| Capa                    | Tecnología                       | Implementación                                          |
| :---------------------- | :------------------------------- | :------------------------------------------------------ |
| **Cifrado en Reposo**   | **pgcrypto**                     | Columnas sensibles (CIEC, FIEL, tokens).                |
| **Cifrado en Tránsito** | **TLS 1.3**                      | Traefik con Let's Encrypt automático.                   |
| **Headers Seguridad**   | **Helmet** (equivalente Elysia)  | HSTS, CSP, X-Frame-Options, X-Content-Type.             |
| **Rate Limiting**       | **Traefik + Redis**              | Protección contra DDoS y brute force.                   |
| **Autenticación**       | **MFA (TOTP)**                   | Google Authenticator para acciones sensibles.           |
| **Secrets**             | **.env** + GitHub Secrets        | Nunca en el repositorio. Inyectados en CI/CD.           |
| **Auditoría**           | **Audit Logs** (tabla inmutable) | Quién hizo qué, cuándo, desde dónde.                    |
| **Validación CFDI**     | **Listas 69-B SAT**              | Verificar proveedores contra listas negras diariamente. |

---

## 7. ESTRUCTURA DEL MONOREPO ACTUALIZADA

```text
PRO_FINAN_CONTA_PYM/
├── .github/
│   └── workflows/           # CI/CD (build, test, deploy, security-scan)
├── apps/
│   ├── backend/             # API ElysiaJS (Bun)
│   │   ├── src/
│   │   │   ├── domain/      # Entidades, Value Objects, Reglas de Negocio
│   │   │   ├── application/ # Casos de Uso, Servicios de Aplicación
│   │   │   ├── infrastructure/
│   │   │   │   ├── db/      # Drizzle schemas, migrations
│   │   │   │   ├── http/    # Controllers, Routes, Middleware
│   │   │   │   ├── sat/     # Integración SAT (scraping, validación)
│   │   │   │   └── ai/      # Gemini, RAG, embeddings
│   │   │   └── shared/      # Utils, tipos compartidos
│   │   ├── tests/
│   │   └── package.json
│   │
│   └── frontend/            # SvelteKit App
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/  # UI Components
│       │   │   ├── stores/      # Svelte stores o runes
│       │   │   ├── utils/       # Helpers
│       │   │   └── server/      # Server-only code (incluye repositories)
│       │   ├── routes/          # File-based routing
│       │   └── styles/          # Global CSS, Open Props config
│       ├── static/
│       └── package.json
│
├── packages/                # Librerías compartidas (workspace)
│   ├── shared-types/        # Tipos TypeScript comunes
│   ├── sat-utils/           # Validadores RFC, CFDI, parsers XML
│   ├── ui-primitives/       # Componentes base sin estilos
│   └── eslint-config/       # Configuración linting unificada
│
├── infrastructure/
│   ├── docker/
│   │   ├── backend/         # Dockerfile backend (Bun)
│   │   ├── frontend/        # Dockerfile frontend (Node para build)
│   │   └── nginx/           # Config para assets estáticos
│   ├── docker-compose.yml   # Desarrollo local
│   ├── docker-compose.prod.yml
│   ├── traefik/             # Configuración Traefik
│   └── scripts/             # deploy.sh, backup.sh, health-check.sh
│
├── database/
│   ├── migrations/          # SQL migrations (Drizzle)
│   ├── seeds/               # Datos de prueba
│   └── backups/             # Dumps de DB
│
├── monitoring/
│   ├── prometheus/          # prometheus.yml, alertas
│   └── grafana/             # Dashboards JSON
│
├── services/                # Microservicios auxiliares (Python)
│   ├── ml-predictor/        # Forecasting con Prophet
│   └── sat-scraper/         # Worker de descarga SAT
│
├── docs/                    # Documentación técnica
├── scripts/                 # Scripts de utilidad
│
├── 00_ARQUITECTURA_CENTRAL/ # Documentación de arquitectura
├── 01_AUDITORIA_ESTRATEGICA/ # Auditorías de los 50 expertos
├── DOCUMENTACION_MAESTRA/   # Roadmaps y planes
├── PROJECT_CHARACTERISTICS/ # Catálogo de +200 características
│
├── bun.lockb
├── package.json             # Workspace root
└── turbo.json               # Turborepo config (opcional)
```

---

## 8. PERSONALIZACIÓN DE USUARIO (Feature Flags)

El sistema permite a los usuarios **personalizar su experiencia** según su plan y preferencias.

### Sistema de Módulos Activables

```typescript
interface UserFeatureConfig {
  // Módulos core (siempre activos)
  dashboard: true;
  transactions: true;

  // Módulos opcionales (según plan y preferencia)
  satValidation: boolean; // Freemium: limitado, Pro: ilimitado
  esgScore: boolean; // Todos los planes
  aiAssistant: boolean; // Solo Pro/Business
  cryptoWallet: boolean; // Opt-in
  gamification: boolean; // Opt-out disponible
  investmentTracking: boolean; // Solo Business
  invoicing: boolean; // Solo Business

  // UI Preferences
  darkMode: boolean;
  compactView: boolean;
  language: "es-MX" | "en-US";
}
```

### Implementación Técnica

- **Backend:** Feature flags almacenados en PostgreSQL por usuario
- **Frontend:** Componentes cargados dinámicamente (`{#if feature.enabled}`)
- **Responsive:** CSS Container Queries para adaptación PC/Móvil

---

## 9. VERSIONES MÍNIMAS REQUERIDAS (Nov 2025)

| Tecnología         | Versión Mínima | Fecha Release |
| :----------------- | :------------- | :------------ |
| Bun                | 1.3.3          | Nov 2025      |
| Node.js (fallback) | 24.11.1 LTS    | Nov 2025      |
| PostgreSQL         | 18.0           | Sep 2025      |
| Redis              | 8.2            | Jul 2025      |
| Svelte             | 5.0            | Oct 2024      |
| SvelteKit          | 2.x            | 2024          |
| ElysiaJS           | 1.4.16+        | Nov 2025      |
| Drizzle ORM        | 0.38+          | 2025          |
| Docker Compose     | 2.40+          | Oct 2025      |
| Python             | 3.14           | Oct 2025      |
| TypeScript         | 5.9            | Ago 2025      |

---

## 10. DECISIONES DE ARQUITECTURA (ADRs)

### ADR-001: Svelte sobre React

**Decisión:** Usar Svelte 5 como framework frontend.
**Contexto:** Menor bundle size, sintaxis más limpia, compilación AOT.
**Consecuencias:** Ecosistema más pequeño pero suficiente para el proyecto.

### ADR-002: CSS Nativo sobre Tailwind

**Decisión:** Usar CSS con variables (Open Props) en lugar de Tailwind.
**Contexto:** Mayor control, sin purge de clases, mejor debugging.
**Consecuencias:** Requiere más estructura inicial pero menos dependencias.

### ADR-003: Bun como Runtime Principal

**Decisión:** Bun para backend y tooling, Node.js como fallback.
**Contexto:** Velocidad extrema, soporte nativo TS, SQLite built-in.
**Consecuencias:** Algunas librerías pueden requerir Node.js.

### ADR-004: PostgreSQL + pgvector para IA

**Decisión:** Usar pgvector en lugar de Pinecone/Weaviate externos.
**Contexto:** Reducir costos, mantener datos en el VPS, simplicidad.
**Consecuencias:** Menor escalabilidad que servicios dedicados pero suficiente para MVP.

## 11. Sincronización Automática con Fuentes Oficiales (MCPs)

> **PROBLEMA IDENTIFICADO:** La documentación puede quedar desactualizada rápidamente. Ejemplo: Node.js 24.11.1 LTS y TypeScript 5.9 ya existen pero pueden no estar reflejados si no hay sincronización activa.

### 11.1 MCPs Oficiales Disponibles para Integrar

| MCP                                       | Función                                 | Instalación                        |
| :---------------------------------------- | :-------------------------------------- | :--------------------------------- |
| `@anthropic/mcp-server-fetch`             | Consulta páginas web (changelogs, docs) | `npx @anthropic/mcp-server-fetch`  |
| `@modelcontextprotocol/server-github`     | Lee releases de GitHub                  | `npx @anthropic/create-mcp-server` |
| `@modelcontextprotocol/server-filesystem` | Lee/escribe archivos locales            | Incluido en SDK                    |

### 11.2 Repositorios a Monitorear (Releases)

| Tecnología      | Repo GitHub                | Release Feed                                              |
| :-------------- | :------------------------- | :-------------------------------------------------------- |
| **Bun**         | `oven-sh/bun`              | https://github.com/oven-sh/bun/releases.atom              |
| **ElysiaJS**    | `elysiajs/elysia`          | https://github.com/elysiajs/elysia/releases.atom          |
| **Drizzle ORM** | `drizzle-team/drizzle-orm` | https://github.com/drizzle-team/drizzle-orm/releases.atom |
| **Svelte**      | `sveltejs/svelte`          | https://github.com/sveltejs/svelte/releases.atom          |
| **SvelteKit**   | `sveltejs/kit`             | https://github.com/sveltejs/kit/releases.atom             |
| **TypeScript**  | `microsoft/TypeScript`     | https://github.com/microsoft/TypeScript/releases.atom     |
| **Node.js**     | `nodejs/node`              | https://nodejs.org/en/feed/releases.xml                   |

### 11.3 Páginas Oficiales a Scrapear (Sin RSS)

| Tecnología | URL Oficial                      | Dato a Extraer            |
| :--------- | :------------------------------- | :------------------------ |
| PostgreSQL | https://www.postgresql.org/docs/ | Versión actual del manual |
| Redis      | https://redis.io/docs/latest/    | Versión y features nuevos |
| Traefik    | https://doc.traefik.io/traefik/  | Versión estable           |

### 11.4 MCP Personalizado: `mcp-stack-sync`

```typescript
// /infrastructure/mcp-servers/stack-sync/src/index.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const STACK_SOURCES = {
  bun: "https://api.github.com/repos/oven-sh/bun/releases/latest",
  elysia: "https://api.github.com/repos/elysiajs/elysia/releases/latest",
  typescript:
    "https://api.github.com/repos/microsoft/TypeScript/releases/latest",
  nodejs: "https://nodejs.org/dist/index.json",
  drizzle:
    "https://api.github.com/repos/drizzle-team/drizzle-orm/releases/latest",
  svelte: "https://api.github.com/repos/sveltejs/svelte/releases/latest",
};

const server = new Server(
  {
    name: "mcp-stack-sync",
    version: "1.0.0",
  },
  {
    capabilities: { tools: {} },
  },
);

// Tool: Verificar versiones actuales vs documentadas
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "check_stack_versions",
      description: "Compara versiones documentadas vs releases oficiales",
      inputSchema: {
        type: "object",
        properties: {
          documented_versions: {
            type: "object",
            description: "Versiones actuales en tu documentación",
          },
        },
      },
    },
    {
      name: "get_latest_features",
      description: "Obtiene las features más recientes de una tecnología",
      inputSchema: {
        type: "object",
        properties: {
          technology: { type: "string", enum: Object.keys(STACK_SOURCES) },
        },
        required: ["technology"],
      },
    },
    {
      name: "generate_update_report",
      description: "Genera reporte Markdown con actualizaciones pendientes",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "check_stack_versions") {
    const results = [];
    for (const [tech, url] of Object.entries(STACK_SOURCES)) {
      const response = await fetch(url);
      const data = await response.json();
      const latestVersion = data.tag_name || data[0]?.version || "unknown";
      const documented = args.documented_versions?.[tech] || "no documentado";
      results.push({
        technology: tech,
        documented: documented,
        latest: latestVersion,
        needsUpdate: documented !== latestVersion,
      });
    }
    return {
      content: [{ type: "text", text: JSON.stringify(results, null, 2) }],
    };
  }

  if (name === "get_latest_features") {
    const url = STACK_SOURCES[args.technology];
    const response = await fetch(url);
    const data = await response.json();
    return {
      content: [
        {
          type: "text",
          text: `## ${args.technology} ${data.tag_name}\n\n${data.body || "Sin notas de release"}`,
        },
      ],
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

### 11.5 Configuración en VS Code (claude_desktop_config.json)

```json
{
  "mcpServers": {
    "stack-sync": {
      "command": "node",
      "args": ["/ruta/a/mcp-stack-sync/dist/index.js"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-fetch"]
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/home/red/Documents/PRO_FINAN_CONTA_PYM"
      ]
    }
  }
}
```

### 11.6 Workflow de Sincronización Semanal

```yaml
# .github/workflows/sync-stack-versions.yml
name: Sync Stack Versions
on:
  schedule:
    - cron: "0 9 * * 1" # Cada lunes 9am
  workflow_dispatch:

jobs:
  check-versions:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Check Bun
        id: bun
        run: echo "version=$(curl -s https://api.github.com/repos/oven-sh/bun/releases/latest | jq -r .tag_name)" >> $GITHUB_OUTPUT

      - name: Check Elysia
        id: elysia
        run: echo "version=$(curl -s https://api.github.com/repos/elysiajs/elysia/releases/latest | jq -r .tag_name)" >> $GITHUB_OUTPUT

      - name: Check TypeScript
        id: typescript
        run: echo "version=$(curl -s https://api.github.com/repos/microsoft/TypeScript/releases/latest | jq -r .tag_name)" >> $GITHUB_OUTPUT

      - name: Compare and Alert
        run: |
          echo "🔄 Versiones actuales detectadas:"
          echo "Bun: ${{ steps.bun.outputs.version }}"
          echo "Elysia: ${{ steps.elysia.outputs.version }}"
          echo "TypeScript: ${{ steps.typescript.outputs.version }}"

      - name: Create Issue if Outdated
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: '🔄 Stack desactualizado - Revisar versiones',
              body: 'El workflow detectó versiones nuevas. Revisar `03_STACK_TECNOLOGICO_DEFINITIVO.md`'
            })
```

### 11.7 Features Nuevas por Versión (Referencia Rápida)

#### TypeScript 5.9 (Ago 2025)

- `import defer` - Evaluación diferida de módulos
- `--module node20` - Compatibilidad Node.js v20
- `tsc --init` minimalista con defaults modernos
- Hovers expandibles en VS Code

#### Node.js 24.11.1 LTS (Nov 2025)

- npm 11.6.2 incluido
- Mejoras de rendimiento V8
- Soporte ESM mejorado

#### Bun 1.3.3 (Nov 2025)

- Mejoras de estabilidad
- Mejor compatibilidad con npm packages
- Fixes de WebSocket

#### ElysiaJS 1.4.16 (Nov 2025)

- Soporte Cloudflare Workers
- `ValidationError.messageValue` alias
- `macro.introspect`
- Mejoras de streaming

---

## 12. Gobernanza y Mantenimiento del Stack

- **Cambio Tecnológico:** cualquier modificación debe abrir un ADR nuevo (ADR-00X) y actualizar los diagramas en `02_BLUEPRINTS_VISUALES.md` para evitar desalineación entre documentación y despliegue real.
- **Sincronización con Código:** verificar que `package.json`, `docker-compose*.yml` y `infrastructure/` reflejen las versiones mínimas declaradas en la sección 9 antes de cada release.
- **Auditoría Trimestral:** seguridad revisa cifrado/TLS, plataforma revisa runtime (Bun/Node) y datos realizan pruebas de pgvector/Redis para asegurar compatibilidad., NOP SUGIERO HURGENTEMENET QUE SEA CADA 15 DIAS
- **Plan de Respaldo:** mantener alternativas documentadas (ej. fallback a Node, uso de SvelteKit clásico) para responder rápidamente ante vulnerabilidades críticas o bugs del stack principal.

---

**Documento mantenido por:** Equipo de Arquitectura PRO_FINAN_CONTA_PYM
**Última actualización:** 29 Noviembre 2025
**Próxima revisión programada:** 6 Diciembre 2025 (sincronización semanal)
**Fuentes verificadas:** GitHub Releases (Bun 1.3.3, Elysia 1.4.16), PostgreSQL Docs, Svelte Blog
