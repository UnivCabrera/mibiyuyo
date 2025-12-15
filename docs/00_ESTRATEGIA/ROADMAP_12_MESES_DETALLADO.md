# 📅 ROADMAP 12 MESES — MIBIYUYO

> **Versión:** 2.0
> **Fecha:** 15 Diciembre 2025
> **Equipo:** 6 personas
> **Modelo:** 1 feature visible + 5 aportes internos por persona/mes

---

## 🎯 RESUMEN EJECUTIVO

| Métrica | Valor |
|:---|:---|
| **Equipo** | 6 personas |
| **Features visibles/mes** | 6 (1 por persona) |
| **Aportes internos/mes** | 30 (5 por persona) |
| **Meta usuarios Mes 12** | 6,000+ |
| **MRR objetivo Mes 12** | $18,600 MXN |

---

## 📋 ROLES DEL EQUIPO

| Rol | Código | Responsabilidad Principal |
|:---:|:---:|:---|
| **Product Owner** | PO | Visión, priorización, comunicación |
| **Frontend Dev** | FE | UI Svelte 5, CSS Nativo, PWA |
| **Backend Dev** | BE | API ElysiaJS, Lucia Auth, Postgres |
| **UX/Diseño** | UX | Flujos, copy, investigación |
| **Seguridad** | SEC | Auditoría, compliance, encriptación |
| **QA/Métricas** | QA | Testing, analytics, documentación |

---

## 🗓️ MES 1: VERSIÓN 1 — "EL FUNDAMENTO"

**Objetivo:** Producto funcional que responde "¿Cuánto puedo gastar HOY?"
**Tema:** Dolor #1 + #2 + #3 + #6

### Features Visibles (6)

| # | Feature | Rol | Dolor | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **"Tu Biyuyo Hoy"** | FE | 1 | Número grande central con balance disponible real |
| 2 | **Config Quincenal** | BE | 2 | Ingreso, fechas de pago, frecuencia |
| 3 | **Apartados Fijos** | FE+BE | 3 | Lista de compromisos con auto-descuento |
| 4 | **Registro 1-Tap** | FE | 1 | Registrar gasto en máximo 2 clics |
| 5 | **Barra Progreso** | UX | 2 | Visualización de avance quincenal |
| 6 | **Panel Seguridad** | SEC | 6 | "Qué datos guardamos" visible |

### Aportes Internos (30)

| Rol | Aportes |
|:---|:---|
| **PO** | Backlog priorizado, OKRs Mes 1, Meeting semanal, Comunicación externa, Benchmark V1 |
| **FE** | Arquitectura Svelte 5, CSS Nativo (Variables + Nesting), PWA Service Worker, IndexedDB offline |
| **BE** | Schema PostgreSQL, API CRUD usuarios, Lucia Auth setup, Redis sesiones, CI/CD pipeline |
| **UX** | Wireframes V1, Copy onboarding, Paleta de colores, Flujo registro, Microcopy errores |
| **SEC** | Audit dependencias, Config Traefik, Backup automático, Rate limiting, Políticas de passwords |
| **QA** | Suite tests básica, Analytics setup, Checklist QA, Documentación API, FAQs iniciales |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Instalaciones PWA | 200 |
| Usuarios registrados | 150 |
| Retention D7 | 50% |
| Gastos registrados | 1,000 |
| NPS inicial | 30+ |

---

## 🗓️ MES 2: VERSIÓN 2 — "EL GUARDIÁN"

**Objetivo:** Prevenir gastos impulsivos y reducir ansiedad financiera
**Tema:** Dolor #4 + #5

### Features Visibles (6)

| # | Feature | Rol | Dolor | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Modo Anti-Impulso** | FE | 4 | Pausa de reflexión con countdown 15s |
| 2 | **Mensajes Emocionales** | UX | 5 | Copy contextual positivo |
| 3 | **Resumen Semanal** | FE | 1,2 | "Así te fue esta semana" |
| 4 | **Notificaciones Smart** | BE | 4 | Push en momento óptimo |
| 5 | **Onboarding v2** | UX | Todos | Mejorado con feedback V1 |
| 6 | **Auditoría Pública** | SEC | 6 | Reporte de seguridad visible |

### Aportes Internos (30)

| Rol | Aportes |
|:---|:---|
| **PO** | Análisis feedback V1, Ajuste roadmap, Priorización features, Métricas D7, Preparar monetización |
| **FE** | Animaciones celebración, Componente countdown, Transiciones suaves, Mejoras performance, Testing E2E |
| **BE** | Sistema notificaciones, Queue Redis, Webhooks Sentry, Logs estructurados, API resumen semanal |
| **UX** | Framework mensajes, Biblioteca emojis, Flujo anti-impulso, Tutoriales in-app, Investigación usuarios |
| **SEC** | Pentesting básico, Rotación secrets, Audit logs acceso, Backup restore test, 2FA opcional |
| **QA** | Testing anti-impulso, Métricas retención, Dashboard Sentry, Documentación V2, Survey usuarios |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Retention D14 | 45% |
| Gastos "pausados" | 100+ |
| Satisfacción UX | 4.2/5 |
| Bugs críticos | 0 |
| Usuarios | 400 |

---

## 🗓️ MES 3: VERSIÓN 3 — "LA CONFIANZA"

**Objetivo:** Refinamiento con feedback real, preparar monetización
**Tema:** Consolidación de los 6 dolores

### Features Visibles (6)

| # | Feature | Rol | Dolor | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **7 Categorías MX** | FE | 1 | Categorías pre-configuradas mexicanas |
| 2 | **Historial Quincenal** | BE | 2 | Ver gastos de quincenas pasadas |
| 3 | **Comparativa** | BE | 2 | "vs quincena anterior" |
| 4 | **Multi-cuenta Básica** | BE | 3 | Efectivo + 1 cuenta banco |
| 5 | **Feedback Loop** | QA | Todos | Sistema de sugerencias in-app |
| 6 | **Legal Completo** | SEC | 6 | Términos, privacidad, ARCO |

### Aportes Internos (30)

| Rol | Aportes |
|:---|:---|
| **PO** | Modelo de precios, Preparar PRO, Análisis competencia, Decisiones V4, Comunicación equipo |
| **FE** | Componente gráficas, Cards categorías, UI historial, Performance audit, Accesibilidad WCAG |
| **BE** | Multi-cuenta logic, Queries optimizadas, Export API, Sistema categorías, Health checks |
| **UX** | Iconos categorías, Flujo comparativa, Copy feedback, Tutorial multi-cuenta, Investigación PRO |
| **SEC** | LFPDPPP compliance, Procedimiento ARCO, Audit permisos, Encrypt multi-cuenta, Documentación legal |
| **QA** | Testing multi-cuenta, Survey PRO, Métricas D30, Documentación usuario, Automatización tests |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Retention D30 | 35% |
| Usuarios totales | 600 |
| Feedback recibido | 50+ |
| Interés en PRO | 20% |
| Bugs | <5 abiertos |

---

## 🗓️ MES 4: VERSIÓN 4 — "EL VALOR"

**Objetivo:** Primera monetización con plan PRO
**Tema:** $29 MXN/mes, valor real

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Plan PRO Launch** | PO | PRO | $29/mes listo para pagos |
| 2 | **Sync Multi-dispositivo** | BE | PRO | Datos sincronizados |
| 3 | **Exportar PDF** | FE | PRO | Reporte mensual descargable |
| 4 | **Temas de Color** | FE | PRO | 4 temas personalizables |
| 5 | **Historial Ilimitado** | BE | PRO | Sin límite de 3 meses |
| 6 | **Sistema de Pagos** | BE+SEC | Core | Stripe MX integrado |

### Aportes Internos (30)

| Rol | Aportes |
|:---|:---|
| **PO** | Pricing page, FAQ monetización, Onboarding PRO, Análisis churn, Comunicación lanzamiento |
| **FE** | UI temas, Componente PDF, Modal upgrade, Skeleton loaders, PWA improvements |
| **BE** | Stripe integration, Webhooks pagos, Sync logic, Subscription management, Rate limits PRO |
| **UX** | Diseño temas, Copy upgrade, Flujo pago, Celebración PRO, Onboarding PRO |
| **SEC** | PCI awareness, Audit Stripe, Logs pagos, Encriptación tokens, Backup con pagos |
| **QA** | Testing pagos, Monitoring MRR, Métricas conversión, Documentación PRO, Testing sync |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Conversión a PRO | 5% |
| MRR | $1,500 MXN |
| Churn | <10% |
| Usuarios totales | 900 |
| NPS PRO | 50+ |

---

## 🗓️ MES 5: VERSIÓN 5 — "LA CLARIDAD"

**Objetivo:** Insights y análisis de gastos
**Tema:** Entender a dónde va el dinero

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Dashboard Análisis** | FE | PRO | Vista completa de datos |
| 2 | **Gráfica de Dona** | FE | Gratis | Distribución por categoría |
| 3 | **Tendencias** | BE | PRO | "Gastaste X más en Y" |
| 4 | **Alertas Presupuesto** | BE | PRO | Por categoría |
| 5 | **Comparador Meses** | FE | PRO | Histórico visual |
| 6 | **Widget Home** | FE | Gratis | Resumen en home screen |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Usuarios totales | 1,200 |
| PRO activos | 60 |
| MRR | $2,730 MXN |
| Uso dashboard | 70% PRO |

---

## 🗓️ MES 6: VERSIÓN 6 — "EL MÓVIL"

**Objetivo:** Experiencia web móvil optimizada
**Tema:** Mobile-first, no app nativa

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **UI Mobile-First** | FE+UX | Core | Rediseño responsive completo |
| 2 | **Gestos Táctiles** | FE | Core | Swipe para acciones |
| 3 | **Quick Actions** | FE | Core | Desde notificación |
| 4 | **Modo Offline Pro** | FE+BE | Core | Offline mejorado |
| 5 | **Web Push** | BE | Core | Notificaciones nativas |
| 6 | **Performance 90+** | QA | Core | Lighthouse optimizado |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Lighthouse Score | 90+ |
| Time to Interactive | <3s |
| Mobile users | 70% |
| Usuarios totales | 1,600 |
| MRR | $3,800 MXN |

---

## 🗓️ MES 7: VERSIÓN 7 — "LAS METAS"

**Objetivo:** Sistema de metas de ahorro
**Tema:** Scaffolding neuro-financiero

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Crear Meta Ahorro** | FE+BE | Gratis (1) | Una meta gratis |
| 2 | **Apartado Automático** | BE | PRO | Auto-save para meta |
| 3 | **Progreso Visual** | FE | Gratis | Barra y % |
| 4 | **Celebración** | UX+FE | Gratis | Al completar meta |
| 5 | **Metas Múltiples** | BE | PRO | Sin límite |
| 6 | **Sugerencias IA** | BE | PRO | Basadas en gastos |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Usuarios con meta | 40% |
| Metas completadas | 50 |
| Usuarios totales | 2,000 |
| MRR | $4,880 MXN |

---

## 🗓️ MES 8: VERSIÓN 8 — "LA CONEXIÓN"

**Objetivo:** Beta conexión bancaria
**Tema:** Open Banking México

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Conexión Bancaria** | BE+SEC | PRO | 3 bancos iniciales |
| 2 | **Categorización Auto** | BE | PRO | ML básico |
| 3 | **Sync Diario** | BE | PRO | Movimientos automáticos |
| 4 | **Panel Conexiones** | FE | PRO | Gestión de bancos |
| 5 | **Alertas Movimientos** | BE | PRO | Notificación por transacción |
| 6 | **Seguridad Bancaria** | SEC | Core | Encriptación reforzada |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Conexiones activas | 100 |
| Usuarios totales | 2,500 |
| MRR | $6,595 MXN |

---

## 🗓️ MES 9: VERSIÓN 9 — "EL SAT"

**Objetivo:** Beta descarga facturas SAT
**Tema:** CIEC personal

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Conexión SAT** | BE+SEC | PRO | CIEC scraping legal |
| 2 | **Descarga CFDI** | BE | PRO | Emitidos y recibidos |
| 3 | **Vista Facturas** | FE | PRO | Legible, no XML |
| 4 | **Clasificación Auto** | BE | PRO | Por tipo |
| 5 | **Alertas Fiscales** | BE | PRO | Fechas límite |
| 6 | **Exportar Contador** | FE | PRO | Formato Excel |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Conexiones SAT | 50 |
| Usuarios totales | 3,000 |
| MRR | $8,310 MXN |

---

## 🗓️ MES 10: VERSIÓN 10 — "EL DUAL"

**Objetivo:** Separar finanzas personales de profesionales
**Tema:** Plan NEGOCIO

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Toggle Personal/Pro** | FE | NEGOCIO | Cambio de modo |
| 2 | **Dashboards Separados** | FE | NEGOCIO | Vistas independientes |
| 3 | **Gastos Deducibles** | BE | NEGOCIO | Marcador fiscal |
| 4 | **Reportes por Modo** | BE | NEGOCIO | Separados |
| 5 | **Alertas Custom** | BE | NEGOCIO | Por modo |
| 6 | **Plan NEGOCIO** | PO | Core | $99/mes lanzamiento |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Conversión NEGOCIO | 1% |
| Usuarios totales | 4,000 |
| MRR | $11,740 MXN |

---

## 🗓️ MES 11: VERSIÓN 11 — "LA FACTURA"

**Objetivo:** Facturación CFDI básica
**Tema:** Freelancers

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Emisión CFDI 4.0** | BE+SEC | NEGOCIO | Básico |
| 2 | **Catálogo Clientes** | BE | NEGOCIO | Gestión contactos |
| 3 | **Plantilla Factura** | FE | NEGOCIO | Personalizable |
| 4 | **Envío Email** | BE | NEGOCIO | Automático |
| 5 | **Historial Facturas** | FE | NEGOCIO | Vista completa |
| 6 | **Complemento Pago** | BE | NEGOCIO | Básico |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Facturas emitidas | 200 |
| Usuarios totales | 5,000 |
| MRR | $15,170 MXN |

---

## 🗓️ MES 12: VERSIÓN 12 — "EL FREELANCER"

**Objetivo:** Suite completa para profesionistas independientes
**Tema:** Dashboard freelancer

### Features Visibles (6)

| # | Feature | Rol | Plan | Descripción |
|:---:|:---|:---:|:---:|:---|
| 1 | **Cuentas por Cobrar** | BE | NEGOCIO | Gestión cobranza |
| 2 | **Recordatorios Pago** | BE | NEGOCIO | A clientes |
| 3 | **Cálculo ISR RESICO** | BE | NEGOCIO | Estimado mensual |
| 4 | **Proyección Ingresos** | BE | NEGOCIO | Próximos 3 meses |
| 5 | **Reporte Contador** | FE | NEGOCIO | PDF completo |
| 6 | **Dashboard Freelancer** | FE | NEGOCIO | KPIs clave |

### Métricas de Éxito

| Métrica | Target |
|:---|:---:|
| Usuarios NEGOCIO | 100+ |
| Usuarios totales | 6,000 |
| MRR | $18,600 MXN |
| Retention anual | 70% |

---

## 📊 RESUMEN ANUAL

### Proyección de Usuarios

```
Mes  1: ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   200
Mes  2: ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   400
Mes  3: ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░   600
Mes  4: ████████████████░░░░░░░░░░░░░░░░░░░░░░   900
Mes  5: ████████████████████░░░░░░░░░░░░░░░░░░ 1,200
Mes  6: ██████████████████████████░░░░░░░░░░░░ 1,600
Mes  7: ████████████████████████████████░░░░░░ 2,000
Mes  8: █████████████████████████████████████░ 2,500
Mes  9: ████████████████████████████████████████ 3,000
Mes 10: ████████████████████████████████████████ 4,000
Mes 11: ████████████████████████████████████████ 5,000
Mes 12: ████████████████████████████████████████ 6,000
```

### Proyección de MRR (Ingresos Recurrentes Mensuales)

| Mes | Gratis | PRO | NEGOCIO | MRR Total |
|:---:|:---:|:---:|:---:|---:|
| 1 | 190 | 10 | 0 | $290 |
| 2 | 380 | 20 | 0 | $580 |
| 3 | 570 | 30 | 0 | $870 |
| 4 | 850 | 45 | 5 | $1,800 |
| 5 | 1,130 | 60 | 10 | $2,730 |
| 6 | 1,505 | 80 | 15 | $3,805 |
| 7 | 1,880 | 100 | 20 | $4,880 |
| 8 | 2,345 | 125 | 30 | $6,595 |
| 9 | 2,810 | 150 | 40 | $8,310 |
| 10 | 3,740 | 200 | 60 | $11,740 |
| 11 | 4,670 | 250 | 80 | $15,170 |
| 12 | 5,600 | 300 | 100 | **$18,600** |

---

## ✅ CHECKLIST MENSUAL

Cada mes el equipo debe completar:

- [ ] 6 features visibles liberados
- [ ] 30 aportes internos entregados
- [ ] Retrospectiva de equipo
- [ ] Actualización de métricas
- [ ] Decisiones de congelamiento/descarte
- [ ] Documentación actualizada
- [ ] Comunicación a usuarios (changelog)

---

**Documento:** ROADMAP_12_MESES_DETALLADO.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025
**Equipo:** 6 personas comprometidas

> *"6 features/mes × 12 meses = 72 features de calidad"* 🚀
