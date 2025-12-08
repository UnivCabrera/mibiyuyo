# 🎨 MÓDULO 06: EXPERIENCIA DE USUARIO (UX/UI)

**Total:** 40 características  
**Prioridad PMV:** 24  
**Última actualización:** 8 Diciembre 2025  
**Actualización:** v5.0 - Integración Neurociencias + 40 Perfiles + Módulos Innovadores

---

## 🔗 DOCUMENTOS COMPLEMENTARIOS

| Documento                                                                                 | Descripción                                |
| :---------------------------------------------------------------------------------------- | :----------------------------------------- |
| [04_NEUROFINANZAS_FRAMEWORK](../05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md)            | **🆕 Framework completo de neurociencias** |
| [15_MODULOS_INNOVADORES](15_MODULOS_INNOVADORES.md)                                       | **🆕 18 módulos diferenciadores**          |
| [03_40_PERFILES_PROFESIONALES](../03_MERCADO_COMPETENCIA/03_40_PERFILES_PROFESIONALES.md) | **🆕 40 perfiles con neurociencia**        |

---

## 🎯 DOCUMENTOS CLAVE

> **MATRIZ MAESTRA:** `00_ARQUITECTURA_CENTRAL/00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md`
>
> Consultar para: Core Universal, 70 Lifestyle Tools, Features GRATIS vs PAGO por perfil.
>
> **🧠 NEUROCIENCIAS:** `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md`
>
> Todos los widgets aplican los 4 pilares: cognitivo, afectivo, desarrollo, neuropsicología.

---

## 🧩 6.0 INTERFAZ TANGRAM (BENTO GRID) - CORE FEATURE V1

> **DECISIÓN ESTRATÉGICA:** La personalización Tangram es nuestra Killer Feature visual. Disponible desde FREEMIUM, no es un feature de pago. Si el usuario se enamora de la personalización, no se va. Si oculta módulos, ahorramos recursos (Lazy Loading). **GANAR-GANAR.**

### UX-TANGRAM-001: Dashboard Modular Tangram

- **Descripción:** Dashboard donde cada herramienta es un "widget" movible
- **Acciones:** Drag & Drop, Resize, Show/Hide
- **Técnica:** svelte-grid + svelte-dnd-action
- **Lazy Loading:** Widget oculto = 0 KB cargado
- **Persistencia:** LocalStorage + sync con servidor
- **Prioridad:** 🔴 CRÍTICA (Core V1)
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** ✅ **FREEMIUM** (para todos)

### UX-TANGRAM-002: Modo Edición vs Modo Uso

- **Descripción:** Toggle entre personalizar y usar
- **Modo Edición:** Bordes punteados, handles de resize, botón eliminar
- **Modo Uso:** Interfaz limpia, widgets funcionales
- **UX:** Evita arrastres accidentales mientras trabajas
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** ✅ **FREEMIUM**

### UX-TANGRAM-003: Catálogo de Widgets (+)

- **Descripción:** Botón "+" para agregar widgets desde catálogo
- **Catálogo:** Grid visual con preview de cada widget
- **Búsqueda:** Filtrar por categoría o nombre
- **Prefetch:** Pre-cargar widget al hacer hover
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** ✅ **FREEMIUM**

### UX-TANGRAM-004: Múltiples Dashboards Guardados

- **Descripción:** Crear diferentes layouts para diferentes tareas
- **Ejemplos:** "Día a día", "Cierre mensual", "Presentación"
- **Límite FREEMIUM:** 2 dashboards
- **Límite PRO:** Ilimitados
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** FREEMIUM (2) / PRO (∞)

---

## 👤 6.1 SISTEMA DE PERFILES (v4.0)

> **ESTRATEGIA:** El usuario ve 7 PERFILES VISUALES en landing/onboarding. Internamente, mapean a 11 PERFILES TÉCNICOS con configuraciones específicas de widgets.

### 6.1.0 Los 7 Perfiles Visuales (Landing/Onboarding)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    7 PERFILES VISUALES                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   🎓 EXPLORADOR       "Por fin saber a dónde va tu dinero"        │
│   💼 EQUILIBRISTA     "Ahorra PRIMERO, gasta el resto sin culpa"  │
│   🏠 ARQUITECTO       "Que el dinero te alcance TODO el mes"      │
│   🚀 CONSTRUCTOR      "Lo tuyo es tuyo, lo del negocio es del..." │
│   🏢 COMANDANTE       "Cumple con el SAT sin volverte loco"       │
│   📈 ESCALADOR        "Vende más, factura más, crece más"         │
│   👥 ORQUESTADOR      "Gestiona tu cartera sin perder control"    │
│                                                                     │
│   → Cada perfil tiene 10 Lifestyle Tools GRATIS (zero servidor)   │
│   → Ver Matriz Maestra para detalle completo                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.1.1 Los 11 Perfiles Técnicos (Backend)

> Los perfiles visuales mapean automáticamente a perfiles técnicos más específicos:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    11 PERFILES TÉCNICOS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   VISUAL → TÉCNICO(S):                                             │
│   🎓 Explorador    → Estudiante, Empleado joven                    │
│   💼 Equilibrista  → Empleado, Híbrido, Inversionista              │
│   🏠 Arquitecto    → Ama de Casa, Casados, Familia                 │
│   🚀 Constructor   → Emprendedor Solo, Híbrido, Early Stage        │
│   🏢 Comandante    → Dueño PyME, Profesionista RESICO              │
│   📈 Escalador     → E-Commerce, Influencer, Nómada Digital        │
│   👥 Orquestador   → Contador/Despacho, Administrador/Gerente      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 👤 6.1.2 PERFILES TÉCNICOS DETALLADOS (11)

│ ════════════ USUARIOS BASE (7) ════════════ │
│ 🎓 Estudiante 🏠 Hogar 💼 Empleado │
│ 🚀 Emprendedor 🏢 PyME 🔀 Híbrido 👥 Grupal │
│ │
│ ═══════════ ACTORES DE PODER (2) ═══════════ │
│ 🧮 CONTADOR/DESPACHO 👔 ADMINISTRADOR/GERENTE │
│ (God Mode Multi-Empresa) (Permisos Granulares) │
│ │
│ ═══════════ HIGH-TICKET (2) ════════════ │
│ 📦 E-COMMERCE POWER SELLER ⚕️ PROFESIONAL ALTA GAMA │
│ (Amazon/ML/Shopify) (Médicos, Arquitectos, Abogados) │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

### UX-PROFILE-001: Selector de Perfil en Onboarding
- **Descripción:** Primera pantalla después del registro
- **Pregunta:** "¿Cuál de estos te describe mejor?"
- **7 Opciones:** Cards visuales con ícono y descripción corta
- **Editable:** Puede cambiar perfil después en configuración
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** ✅ **FREEMIUM**

### PERFIL 1: 🎓 ESTUDIANTE
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Resumen del Mes | ✅ | Visión rápida de dinero disponible |
| Gastos Hormiga | ✅ | Cafés, snacks, transporte |
| Presupuesto Simple | ✅ | Límites por categoría |
| Metas de Ahorro | ✅ | "Ahorrar para laptop/viaje" |
| Calendario de Pagos | ✅ | Colegiaturas, suscripciones |
| Facturación | ❌ | No necesita |
| Inventario | ❌ | No necesita |
| Impuestos | ❌ | No necesita |

### PERFIL 2: 🏠 AMA DE CASA / HOGAR
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Gastos del Súper | ✅ | Categoría principal |
| Servicios del Hogar | ✅ | Luz, agua, gas, internet |
| Presupuesto Familiar | ✅ | Control del gasto mensual |
| Lista de Compras | ✅ | Integrado con gastos |
| Ahorro Familiar | ✅ | Emergencias, vacaciones |
| Calendario de Pagos | ✅ | Vencimientos de servicios |
| Facturación | ❌ | No necesita |
| Impuestos | ❌ | No necesita |

### PERFIL 3: 💼 EMPLEADO / GODÍN
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Control de Quincena | ✅ | Seguimiento de nómina |
| Gastos vs Ingresos | ✅ | Balance mensual |
| Deudas y Créditos | ✅ | Tarjetas, préstamos |
| Metas de Ahorro | ✅ | Viajes, fondo emergencia |
| Inversiones Básicas | ✅ | CETES, afore voluntario |
| Gastos Hormiga | ✅ | Control de fugas |
| Facturación | ❌ | No necesita |
| Inventario | ❌ | No necesita |

### PERFIL 4: 🚀 EMPRENDEDOR SOLO
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Cotizaciones Rápidas | ✅ | Enviar propuestas |
| Gastos vs Ingresos | ✅ | Rentabilidad básica |
| Clientes | ✅ | Mini-CRM |
| Facturación Simple | ✅ | CFDI básico |
| Calendario Fiscal | ✅ | Fechas SAT |
| Flujo de Caja | ✅ | Predicción simple |
| Inventario | ❌ | Aún no necesita |
| Nómina | ❌ | No tiene empleados |

### PERFIL 5: 🏢 DUEÑO DE NEGOCIO (PyME)
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Facturación Completa | ✅ | CFDI 4.0, complementos |
| Inventario | ✅ | Control de stock |
| Flujo de Caja | ✅ | Predicción 90 días |
| Impuestos y SAT | ✅ | ISR, IVA, declaraciones |
| Nómina | ✅ | Gestión de empleados |
| Clientes y Proveedores | ✅ | CRM + validación EFOS |
| Reportes Contables | ✅ | Balance, P&L |
| KPIs del Negocio | ✅ | Métricas clave |

### PERFIL 6: 🔀 HÍBRIDO (NEGOCIO + PERSONAL)
| Widget | Activado | Justificación |
|:---|:---:|:---|
| **Panel Negocio** | ✅ | Sección separada |
| Facturación | ✅ | CFDI negocio |
| Gastos Negocio | ✅ | Deducibles |
| **Panel Personal** | ✅ | Sección separada |
| Presupuesto Personal | ✅ | Gastos del hogar |
| Metas Personales | ✅ | Ahorro, viajes |
| **Vista Consolidada** | ✅ | Toggle para ver todo junto |
| Separador Visual | ✅ | Línea clara entre ambos |

### PERFIL 7: 👥 GRUPAL / ROOMIES
| Widget | Activado | Justificación |
|:---|:---:|:---|
| Gastos Compartidos | ✅ | División automática |
| Tandas Digitales | ✅ | Ahorro colectivo |
| Quién Debe Qué | ✅ | Balance entre miembros |
| Servicios Compartidos | ✅ | Renta, luz, internet |
| Historial de Pagos | ✅ | Transparencia grupal |
| Invitar Miembros | ✅ | Links de invitación |
| Chat Grupal | 🔵 | Futuro: comunicación |
| Facturación | ❌ | No aplica grupal |

---

## 🧮 6.1.B ACTORES DE PODER (MULTIPLICADORES B2B)

> **ESTRATEGIA CLAVE:** Estos perfiles son nuestros mejores vendedores. Un contador trae 50 clientes. Un gerente valida la compra del dueño.

### PERFIL 8: 🧮 CONTADOR / DESPACHO CONTABLE ("El Socio Estratégico")

> **EL DOLOR:** "Gestionar 50 clientes con claves diferentes es una pesadilla. Entro al SAT 50 veces al día."
> **LA SOLUCIÓN:** "God Mode" - Panel Multi-Empresa con una sola sesión.

| Widget | Activado | Justificación |
|:---|:---:|:---|
| **Panel Multi-Empresa** | ✅ | Vista de TODOS sus clientes en una pantalla |
| Selector de Cliente | ✅ | Dropdown para cambiar de contexto |
| Descarga Masiva XML | ✅ | Un clic → XMLs de 50 empresas |
| Semáforo de Cumplimiento | ✅ | Verde/Amarillo/Rojo por cliente |
| Auditoría EFOS Cartera | ✅ | ¿Algún cliente tiene proveedores en lista negra? |
| Calendario Fiscal Global | ✅ | Fechas de TODOS los clientes |
| Alertas Vencimientos | ✅ | "Cliente X no ha declarado" |
| Facturación por Cliente | ✅ | Emitir facturas en nombre de clientes |
| Reportes Consolidados | ✅ | P&L, Balance de toda la cartera |
| Chat con Clientes | 🔵 | Futuro: comunicación in-app |

**MONETIZACIÓN ESPECIAL:**
```

┌─────────────────────────────────────────────────────────────────────┐
│ PROGRAMA "CONTADOR SOCIO" │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ 🎁 CONTADOR USA GRATIS LA PLATAFORMA │
│ (Si trae a sus clientes a PRO/BUSINESS) │
│ │
│ 💰 COMISIÓN DEL 20% DE CADA CLIENTE │
│ (Mientras el cliente pague) │
│ │
│ 📊 EJEMPLO: │
│ • Contador con 30 clientes PRO ($149/mes c/u) │
│ • Revenue mensual: $4,470 │
│ • Comisión contador: $894/mes │
│ • Contador: Gratis + $894 de ingreso pasivo │
│ │
│ 🎯 EL CONTADOR ES NUESTRO MEJOR VENDEDOR │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

**Features Exclusivos Contador:**
| Feature | Descripción | Plan |
|:---|:---|:---:|
| Multi-Empresa | Gestionar N clientes desde 1 cuenta | GRATIS* |
| Descarga Masiva XML | Todos los XMLs en 1 clic | GRATIS* |
| Auditoría EFOS Cartera | Escanear proveedores de toda la cartera | GRATIS* |
| White-Label Reportes | Logo del despacho en reportes | BUSINESS |
| API para su Sistema | Integrar con su ERP propio | BUSINESS |
| Plantillas Fiscales | Pólizas pre-armadas por industria | PRO |

*Gratis si el contador trae ≥5 clientes activos pagando.

---

### PERFIL 9: 👔 ADMINISTRADOR / GERENTE ("El Controlador")

> **EL DOLOR:** "El dueño no me quiere dar su clave maestra. Pero necesito aprobar gastos y ver reportes."
> **LA SOLUCIÓN:** Perfil con Permisos Granulares y Bitácora de Auditoría.

| Widget | Activado | Justificación |
|:---|:---:|:---|
| Dashboard Operativo | ✅ | Lo que el dueño le permite ver |
| Aprobación de Gastos | ✅ | Cola de gastos pendientes |
| Bitácora de Auditoría | ✅ | Quién hizo qué, cuándo |
| Inventario (Vista) | ✅ | Stock, pero no costos |
| Empleados (Vista) | ✅ | Lista, pero no sueldos |
| Flujo de Caja (Vista) | ⚠️ | Solo si el dueño autoriza |
| Saldos Bancarios | ❌ | Restringido por default |
| Configuración | ❌ | Solo el dueño |

**Sistema de Permisos Granulares:**
```

┌─────────────────────────────────────────────────────────────────────┐
│ MATRIZ DE PERMISOS │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ MÓDULO DUEÑO GERENTE EMPLEADO CONTADOR │
│ ───────────────────────────────────────────────────────────── │
│ 💰 Saldos Bancarios ✅ ❌ ❌ ✅ │
│ 📊 Ventas ✅ ✅ 👁️ ✅ │
│ 📦 Inventario ✅ ✅ 👁️ ✅ │
│ 👥 Nómina ✅ ⚠️ ❌ ✅ │
│ 📄 Facturación ✅ ✅ ❌ ✅ │
│ ✏️ Editar Gastos ✅ ✅ ⚠️ ❌ │
│ 🗑️ Borrar Registros ✅ ❌ ❌ ❌ │
│ ⚙️ Configuración ✅ ❌ ❌ ❌ │
│ │
│ Leyenda: │
│ ✅ = Acceso completo │
│ 👁️ = Solo lectura │
│ ⚠️ = Requiere aprobación del dueño │
│ ❌ = Sin acceso │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

**Bitácora de Auditoría (Compliance):**
| Evento | Información Registrada |
|:---|:---|
| Login/Logout | Usuario, IP, dispositivo, hora |
| Crear Gasto | Quién, monto, categoría, timestamp |
| Editar Registro | Quién, qué cambió, valor anterior → nuevo |
| Borrar Registro | Quién, qué se borró (soft delete) |
| Aprobar/Rechazar | Quién aprobó, qué aprobó |
| Exportar Datos | Quién exportó qué |
| Cambiar Permisos | Quién cambió permisos de quién |

---

## 💎 6.1.C CLIENTES HIGH-TICKET (PREMIUM ESTABLES)

> **ESTRATEGIA:** Estos clientes pagan PRO/BUSINESS sin pensarlo. Alto LTV, baja churn, alto volumen. Son el revenue estable que nos permite innovar.

### PERFIL 10: 📦 E-COMMERCE POWER SELLER (Amazon/ML/Shopify)

> **EL DOLOR:** "Vendo 100 productos al día. No puedo facturar a mano. Las comisiones de Mercado Libre me comen el margen y no sé cuánto gano realmente."
> **LA SOLUCIÓN:** Conciliación automática + margen REAL (descontando comisiones).

| Widget | Activado | Justificación |
|:---|:---:|:---|
| **Conciliación Automática** | ✅ | Banco ↔ Mercado Pago ↔ Amazon |
| Margen Real por Producto | ✅ | Precio - Comisión MP - Envío - Costo = REAL |
| Inventario Multi-Canal | ✅ | Stock sincronizado Amazon + ML + Tienda |
| Auto-Facturación | ✅ | Factura automática por cada venta |
| Flujo de Caja Marketplace | ✅ | Cuándo cae el dinero de ML (7-14 días) |
| Alertas de Stock | ✅ | "Producto X tiene solo 5 unidades" |
| Top Productos | ✅ | Qué vendo más, qué genera más margen |
| Devoluciones | ✅ | Tracking de returns, reembolsos |
| Comisiones por Plataforma | ✅ | Cuánto le pago a cada marketplace |
| KPIs E-commerce | ✅ | ROAS, CAC, AOV, LTV por canal |

**Integraciones Críticas:**
```

┌─────────────────────────────────────────────────────────────────────┐
│ ECOSISTEMA E-COMMERCE │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ MERCADO │ │ AMAZON │ │ SHOPIFY │ │
│ │ LIBRE │ │ SELLER │ │ + WOO │ │
│ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ │
│ │ │ │ │
│ └───────────────────┼───────────────────┘ │
│ ▼ │
│ ┌─────────────────┐ │
│ │ NUESTRA APP │ │
│ │ CONCILIACIÓN │ │
│ │ AUTOMÁTICA │ │
│ └────────┬────────┘ │
│ │ │
│ ┌──────────────────┼──────────────────┐ │
│ ▼ ▼ ▼ │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ │
│ │ FACTURACIÓN │ │ MARGEN │ │ INVENTARIO │ │
│ │ AUTOMÁTICA │ │ REAL │ │ UNIFICADO │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

**Features Power Seller:**
| Feature | Descripción | Plan |
|:---|:---|:---:|
| Conexión Mercado Libre | OAuth, sync automático | PRO |
| Conexión Amazon Seller | SP-API integration | BUSINESS |
| Conexión Shopify/Woo | Webhooks tiempo real | PRO |
| Auto-Facturación | CFDI automático por venta | PRO |
| Cálculo Margen Real | Descuenta comisiones + envío | PRO |
| Multi-Inventario | Stock unificado | BUSINESS |
| Alertas de Rentabilidad | "Este producto ya no es rentable" | PRO |

**Por qué nos conviene:**
- **Alto volumen** = más facturas = más timbrado = más revenue
- **Stickiness alto** = si funciona, NO se va (dolor de migrar integraciones)
- **Boca a boca** = sellers se conocen entre sí, comunidad activa
- **Estabilidad** = e-commerce es su ingreso principal, pagan religiosamente

---

### PERFIL 11: ⚕️ PROFESIONAL DE ALTA GAMA (Médicos, Arquitectos, Abogados, Consultores)

> **EL DOLOR:** "Gano bien pero no tengo tiempo para nada. Le tengo terror al SAT. Quiero algo que me diga exactamente cuánto debo y ya."
> **LA SOLUCIÓN:** Panel ULTRA-MINIMALISTA. Solo 3 números: Gané, Gasté, Debo.

| Widget | Activado | Justificación |
|:---|:---:|:---|
| **Panel Minimalista** | ✅ | Solo: Ingresos, Gastos, Impuestos |
| Facturación 3 Clics | ✅ | RFC → Monto → Enviar. Listo. |
| Expediente de Clientes | ✅ | Historial de pacientes/casos |
| Agenda/Citas | ✅ | Integración con calendario |
| Deducciones Sugeridas | ✅ | "Esto es deducible en tu régimen" |
| Honorarios por Cobrar | ✅ | Quién me debe y cuánto |
| Recibos por WhatsApp | ✅ | Enviar comprobante al cliente |
| Recordatorio de Pagos | ✅ | "Paciente X no ha pagado" |
| Calculadora RESICO | ✅ | Impuesto simplificado |
| Gráfica Anual | ✅ | Tendencia de ingresos |

**Diseño Ultra-Minimalista:**
```

┌─────────────────────────────────────────────────────────────────────┐
│ PANEL PROFESIONAL ALTA GAMA │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ │ │
│ │ ESTE MES │ │
│ │ │ │
│ │ 💰 INGRESOS 📊 GASTOS │ │
│ │ $85,000 $12,500 │ │
│ │ │ │
│ │ ───────────────────────────────────── │ │
│ │ │ │
│ │ 🏛️ DEBES AL SAT │ │
│ │ $3,400 │ │
│ │ (Vence 17 dic) │ │
│ │ │ │
│ │ [💳 PAGAR AHORA] │ │
│ │ │ │
│ └───────────────────────────────────────────────────────────┘ │
│ │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│ │ 📄 FACTURAR │ │ 📅 CITAS HOY │ │ 💸 POR COBRAR │ │
│ │ (3 clics) │ │ 4 │ │ $22,000 │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│ │
│ 🔔 "Dr. García, tiene 2 pacientes que no han pagado de nov" │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

**Facturación en 3 Clics (Entre Paciente y Paciente):**
```

PASO 1: Seleccionar cliente (autocompletado por nombre)
→ "Gar..." → "García López María"

PASO 2: Confirmar monto
→ $1,500 (último monto usado con este cliente)
→ [Cambiar] o [Confirmar]

PASO 3: Enviar
→ [📧 Email] [📱 WhatsApp] [Ambos]

✅ Factura emitida y enviada. Volver a consulta.

```

**Features Profesional Alta Gama:**
| Feature | Descripción | Plan |
|:---|:---|:---:|
| Panel 3 Números | Ingresos, Gastos, Impuestos. Nada más. | PRO |
| Facturación 3 Clics | Ultra-simplificada | PRO |
| Expediente Clientes | Historial, notas, archivos | PRO |
| Deducciones Sugeridas | IA sugiere qué es deducible | PRO |
| Agenda Integrada | Sync con Google Calendar | PRO |
| Recibo WhatsApp | Envío directo | PRO |
| Honorarios Pendientes | Gestión de cobranza pasiva | PRO |

**Por qué nos conviene:**
- **Ingresos altos** = pueden pagar $149-$299/mes sin pestañear
- **Dolor extremo** = el SAT les da pavor, pagarían lo que sea
- **Poco tiempo** = valoran la simplicidad sobre features
- **Referidos** = médicos conocen médicos, arquitectos conocen arquitectos
- **Estabilidad** = profesiones estables, no cierran de un día para otro

---

## 📊 MATRIZ COMPLETA: 11 PERFILES × WIDGETS

| Widget | 🎓 | 🏠 | 💼 | 🚀 | 🏢 | 🔀 | 👥 | 🧮 | 👔 | 📦 | ⚕️ |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Resumen Mes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gastos vs Ingresos | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ |
| Presupuesto | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Metas Ahorro | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Gastos Hormiga | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Facturación | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Inventario | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | 👁️ | ✅ | ❌ |
| Flujo Caja | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | 👁️ | ✅ | ❌ |
| Nómina | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | 👁️ | ❌ | ❌ |
| Impuestos | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Multi-Empresa | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ |
| Permisos | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| Conciliación MP | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Margen Real | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Panel Minimalista | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Expediente | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| Gastos Compartidos | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Tandas | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Bitácora | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |

Leyenda: ✅ = Activo | 👁️ = Solo lectura | ❌ = No activo

---

## 6.2 DISEÑO Y TEMAS (8 características)

### UX-001: Tema Claro/Oscuro
- **Descripción:** Soporte para modo light y dark
- **Detección:** Preferencia del sistema (prefers-color-scheme)
- **Manual:** Toggle para cambiar
- **Persistencia:** Guardar preferencia en localStorage
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### UX-002: Diseño Responsive
- **Descripción:** Adaptación a todos los tamaños de pantalla
- **Breakpoints:** Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- **Técnica:** CSS Container Queries + Grid/Flexbox
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** FREEMIUM

### UX-003: Sistema de Diseño Consistente
- **Descripción:** Tokens y componentes unificados
- **Base:** Open Props (variables CSS)
- **Componentes:** Bits UI + shadcn-svelte
- **Documentación:** Storybook o similar
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### UX-004: Tipografía Accesible
- **Descripción:** Fuentes legibles y escalables
- **Fuente:** Inter (sans-serif), JetBrains Mono (código)
- **Tamaños:** rem units, escala modular
- **Contraste:** WCAG 2.1 AA mínimo
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-005: Colores Semánticos
- **Descripción:** Paleta consistente con significado
- **Positivo:** Verde (ingresos, metas)
- **Negativo:** Rojo (gastos, alertas)
- **Neutro:** Azul (información)
- **Warning:** Amarillo (advertencias)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-006: Iconografía Consistente
- **Descripción:** Set de íconos unificado
- **Librería:** Lucide Svelte
- **Estilo:** Outline (light), Filled (dark)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-007: Microinteracciones
- **Descripción:** Animaciones sutiles de feedback
- **Ejemplos:** Hover, click, loading, success/error
- **Librería:** CSS transitions + svelte/motion
- **Performance:** GPU-accelerated (transform, opacity)
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### UX-008: Skeleton Loaders
- **Descripción:** Placeholders mientras carga contenido
- **Patrón:** Shimmer effect
- **Uso:** Listas, cards, gráficas
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

---

## 6.2 ACCESIBILIDAD (5 características)

### UX-009: Navegación por Teclado
- **Descripción:** Uso completo sin mouse
- **Focus:** Indicadores visibles de foco
- **Tab order:** Lógico y predecible
- **Shortcuts:** Atajos para acciones frecuentes
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### UX-010: Screen Reader Support
- **Descripción:** Compatible con lectores de pantalla
- **ARIA:** Labels, roles, live regions
- **Testing:** VoiceOver, NVDA
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### UX-011: Reducción de Movimiento
- **Descripción:** Respetar preferencia de usuario
- **Detección:** prefers-reduced-motion
- **Efecto:** Deshabilitar animaciones
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-012: Alto Contraste
- **Descripción:** Modo para usuarios con baja visión
- **Contraste:** WCAG AAA (7:1)
- **Activación:** Toggle en configuración
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-013: Tamaño de Fuente Ajustable
- **Descripción:** Usuario puede aumentar tamaño de texto
- **Escalas:** 100%, 125%, 150%
- **Persistencia:** Guardar preferencia
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

---

## 6.3 PWA Y OFFLINE (5 características)

### UX-014: PWA Instalable
- **Descripción:** Instalar como app nativa
- **Manifest:** Íconos, nombre, colores de tema
- **Service Worker:** Vite PWA Plugin
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### UX-015: Funcionamiento Offline
- **Descripción:** Usar app sin conexión
- **Caché:** Service Worker para assets y API
- **Storage:** IndexedDB (Dexie.js) para datos
- **Sync:** Sincronizar al reconectar
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### UX-016: Push Notifications
- **Descripción:** Notificaciones del sistema
- **Permisos:** Solicitar opt-in
- **Tipos:** Alertas presupuesto, vencimientos, logros
- **Configurable:** Usuario elige qué recibir
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### UX-017: Indicador de Conexión
- **Descripción:** Mostrar estado de red
- **Estados:** Online, Offline, Sincronizando
- **UI:** Badge o toast sutil
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** TODOS

### UX-018: Background Sync
- **Descripción:** Sincronizar datos en segundo plano
- **Tecnología:** Background Sync API
- **Uso:** Subir transacciones creadas offline
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

---

## 6.4 PERSONALIZACIÓN (2 características)

### UX-019: Dashboard Personalizable
- **Descripción:** Reorganizar widgets del dashboard
- **Acciones:** Drag & drop, mostrar/ocultar, redimensionar
- **Persistencia:** Guardar layout en backend
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** ✅ **FREEMIUM** (Ver sección 6.0 Tangram)

### UX-020: Preferencias de Notificación
- **Descripción:** Controlar qué notificaciones recibir
- **Categorías:** Alertas, recordatorios, tips, marketing
- **Canales:** Email, push, in-app
- **Horarios:** No molestar de X a Y
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

---

## 🚀 6.5 GROWTH LOOPS Y VIRALIDAD (8 características nuevas)

> **FILOSOFÍA:** El sistema debe crecer solo. Cada usuario debe traer más usuarios. Cada acción debe generar engagement.

### UX-VIRAL-001: Referral Program Agresivo
- **Descripción:** Sistema de referidos con descuentos acumulables
- **Mecánica:**
  - Invita 1 amigo → 30% descuento
  - Invita 2 amigos → 60% descuento
  - Invita 3 amigos → 90% descuento (o 100% primer año)
- **Para el invitado:** 15% descuento en primer mes
- **Tracking:** Links únicos, dashboard de referidos
- **Viral Loop:** El invitado también puede referir
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** ✅ **FREEMIUM** (todos pueden referir)

### UX-VIRAL-002: Tasting Menu (Prueba PRO 24hrs)
- **Descripción:** Cualquier usuario FREEMIUM puede activar modo PRO completo por 24 horas
- **Límite:** Una vez al mes
- **Trigger adicional:** Eventos especiales (cumpleaños, Black Friday)
- **UX:** Botón "🚀 Probar PRO por 24hrs" visible en sidebar
- **Objetivo:** Que sienta la potencia y quiera comprar
- **Conversión esperada:** 15-25% de los que prueban
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** ✅ **FREEMIUM**

### UX-VIRAL-003: Loyalty Unlocks (3 Meses = 3 Regalos)
- **Descripción:** Fidelización por uso continuo
- **Mecánica:**
  - 1 mes activo → Badge de "Usuario Comprometido"
  - 2 meses activo → Acceso a 1 feature PRO permanente (a elegir)
  - 3 meses activo → Acceso a 2 features PRO más (total 3)
- **Features elegibles:** Modo offline, reportes avanzados, alertas predictivas
- **Permanente:** No se quitan aunque deje de usar
- **Objetivo:** Retención brutal, switching cost alto
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** ✅ **FREEMIUM**

### UX-VIRAL-004: Compartir Logros
- **Descripción:** Compartir achievements en redes sociales
- **Ejemplos:**
  - "¡Ahorré $5,000 este mes! 🎉"
  - "¡100 facturas emitidas! 📄"
  - "¡3 meses sin gastos hormiga! ☕❌"
- **Formato:** Imagen bonita con branding sutil
- **Redes:** WhatsApp, Twitter, Instagram, LinkedIn
- **Incentivo:** +50 FinCoins por cada share
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** ✅ **FREEMIUM**

### UX-VIRAL-005: Invitar a Colaboradores (Negocio)
- **Descripción:** Dueño de negocio puede invitar empleados/contador
- **Roles:** Admin, Editor, Viewer
- **Límite FREEMIUM:** 1 colaborador
- **Límite PRO:** 5 colaboradores
- **Límite BUSINESS:** Ilimitado
- **Viral:** Colaborador conoce la plataforma → la usa para su negocio propio
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** FREEMIUM (1) / PRO (5) / BIZ (∞)

### UX-VIRAL-006: Tandas Públicas
- **Descripción:** Crear tandas abiertas donde cualquiera puede unirse
- **Viral:** Cada miembro trae a sus conocidos
- **Descubrimiento:** Directorio de tandas activas
- **Confianza:** Rating de organizadores
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** ✅ **FREEMIUM**

### UX-VIRAL-007: Retos Públicos de Ahorro
- **Descripción:** Challenges donde usuarios compiten
- **Ejemplos:**
  - "Enero sin Uber Eats" 🍔❌
  - "Ahorra 10% de tu ingreso" 💰
  - "30 días sin gastos hormiga" ☕❌
- **Leaderboard:** Ranking anónimo (solo %)
- **Premios:** Features PRO gratis, merch, gift cards
- **Viral:** Usuarios invitan amigos a competir
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** ✅ **FREEMIUM**

### UX-VIRAL-008: Widget Embebible
- **Descripción:** Código para poner "Mi Meta de Ahorro" en blog/web
- **Ejemplo:** Blogger muestra su progreso de ahorro
- **Branding:** "Powered by [App]" con link
- **Viral:** Lectores del blog conocen la app
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

---

## 💰 6.6 MODELO DE MONETIZACIÓN (COST-BASED FREEMIUM)

> **REGLA DE ORO:** Todo lo que se procese en el dispositivo del usuario (client-side) o tenga costo marginal = **GRATIS**. Solo cobramos por lo que nos genera costo real.

### Matriz de Costos y Pricing

| Feature | Costo Real | Plan |
|:---|:---:|:---:|
| Dashboard Tangram | $0 (client-side) | ✅ FREEMIUM |
| Registro de gastos | $0 (client-side) | ✅ FREEMIUM |
| Presupuestos | $0 (client-side) | ✅ FREEMIUM |
| Gráficas básicas | $0 (client-side) | ✅ FREEMIUM |
| Metas de ahorro | $0 (client-side) | ✅ FREEMIUM |
| Categorización manual | $0 (client-side) | ✅ FREEMIUM |
| Modo offline | $0 (client-side) | ✅ FREEMIUM |
| Exportar CSV | $0 (client-side) | ✅ FREEMIUM |
| 7 Perfiles de inicio | $0 (client-side) | ✅ FREEMIUM |
| Referral program | $0 (marketing) | ✅ FREEMIUM |
| --- | --- | --- |
| Timbrado CFDI (PAC) | $0.50-2.00/factura | 💳 PRO (10 gratis/mes) |
| IA Gemini (chatbot) | $0.01-0.05/consulta | 💳 PRO (50 gratis/mes) |
| OCR de tickets | $0.02/imagen | 💳 PRO (20 gratis/mes) |
| Conexión bancaria | $5-15/cuenta/mes | 💳 PRO |
| Almacenamiento >500MB | $0.02/GB/mes | 💳 PRO |
| Sync SAT automático | Worker time | 💳 PRO |
| Reportes PDF branded | Server render | 💳 PRO |
| Predicción flujo caja | ML compute | 💳 BUSINESS |
| Multi-empresa | DB isolation | 💳 BUSINESS |
| API access | Rate limiting | 💳 BUSINESS |

### Planes Simplificados

| Plan | Precio | Para Quién | Límites |
|:---|:---:|:---|:---|
| **FREEMIUM** | $0 | Estudiantes, Hogares, Empleados | Tangram ✅, 10 facturas/mes, 50 IA/mes |
| **PRO** | $149/mes | Emprendedores, Freelancers | Todo FREEMIUM + ilimitado |
| **BUSINESS** | $499/mes | PyMEs, Negocios formales | Todo PRO + multi-empresa + API |

### Límites FREEMIUM Generosos

| Feature | Límite FREEMIUM | Límite PRO |
|:---|:---:|:---:|
| Transacciones/mes | Ilimitadas | Ilimitadas |
| Facturas emitidas/mes | 10 | Ilimitadas |
| Consultas IA/mes | 50 | Ilimitadas |
| OCR tickets/mes | 20 | Ilimitadas |
| Almacenamiento | 500 MB | 10 GB |
| Dashboards guardados | 2 | Ilimitados |
| Colaboradores | 1 | 5 (BIZ: ∞) |
| Historial | 12 meses | Ilimitado |

---

## 📊 RESUMEN MÓDULO UX ACTUALIZADO

| Sección | Total | PMV | V1 | V2 | V3 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Tangram** | 4 | 3 | 1 | 0 | 0 |
| **11 Perfiles** | 4 | 2 | 1 | 1 | 0 |
| Diseño | 8 | 6 | 2 | 0 | 0 |
| Accesibilidad | 5 | 2 | 2 | 1 | 0 |
| PWA | 5 | 2 | 2 | 1 | 0 |
| Personalización | 2 | 2 | 0 | 0 | 0 |
| **Growth Loops** | 8 | 3 | 3 | 2 | 0 |
| **TOTAL** | **36** | **20** | **11** | **5** | **0** |

---

## 🎯 CATÁLOGO COMPLETO DE WIDGETS

| Widget | Tamaño Mín | Perfiles Default | Plan |
|:---|:---:|:---|:---:|
| Resumen del Mes | 3x2 | Todos | FREE |
| Gastos vs Ingresos | 4x2 | Todos (excepto Grupal, Alta Gama) | FREE |
| Presupuesto | 4x3 | Base (7 perfiles) | FREE |
| Metas de Ahorro | 3x2 | Estudiante, Empleado, Hogar, Híbrido | FREE |
| Gastos Hormiga | 3x2 | Estudiante, Empleado | FREE |
| Calendario Pagos | 3x3 | Todos | FREE |
| **Panel Multi-Empresa** | 12x4 | Contador | BIZ |
| **Semáforo Cumplimiento** | 6x3 | Contador | BIZ |
| **Descarga Masiva XML** | 4x2 | Contador | BIZ |
| **Bitácora Auditoría** | 6x3 | PyME, Contador, Gerente | PRO |
| **Permisos Usuarios** | 4x3 | PyME, Contador | PRO |
| **Aprobación Gastos** | 4x3 | Gerente | PRO |
| **Conciliación Marketplace** | 8x4 | E-commerce | PRO |
| **Margen Real Producto** | 6x3 | E-commerce | PRO |
| **Inventario Multi-Canal** | 8x4 | E-commerce | BIZ |
| **Panel Minimalista 3 Números** | 6x3 | Profesional Alta Gama | PRO |
| **Facturación 3 Clics** | 4x2 | Profesional Alta Gama | PRO |
| **Expediente Clientes** | 6x4 | Profesional Alta Gama | PRO |
| **Deducciones Sugeridas** | 4x3 | Profesional Alta Gama | PRO |
| Facturación Completa | 6x4 | Emprendedor, PyME, Híbrido | FREE (10/mes) |
| Inventario | 6x4 | PyME, E-commerce | PRO |
| Flujo de Caja | 8x3 | Emprendedor, PyME, Contador, E-commerce | PRO |
| Impuestos SAT | 4x3 | Emprendedor, PyME, E-commerce, Alta Gama | PRO |
| Nómina | 6x4 | PyME, Contador | BIZ |
| Clientes/CRM | 6x4 | Emprendedor, PyME | FREE |
| Reportes | 6x3 | PyME, Híbrido, Contador | PRO |
| KPIs | 12x2 | PyME, E-commerce | PRO |
| Gastos Compartidos | 4x3 | Grupal | FREE |
| Tandas | 4x4 | Grupal | FREE |
| Deudas/Créditos | 4x3 | Empleado | FREE |
| Mascota Financiera | 2x2 | Todos (opt-in) | FREE |
| Alertas SAT | 3x2 | Emprendedor, PyME | FREE |
| Notificaciones | 2x4 | Todos | FREE | |

---

## 🔄 FLUJO DE VIRALIDAD Y CAPTACIÓN

```

┌─────────────────────────────────────────────────────────────────────┐
│ GROWTH LOOP ENGINE V2 │
├─────────────────────────────────────────────────────────────────────┤
│ │
│ LOOP 1: USUARIOS BASE (7 PERFILES) │
│ ───────────────────────────────────────── │
│ 1. Usuario se registra → Elige perfil (1-7) │
│ 2. Tangram auto-configura → Usa 3 meses │
│ 3. Loyalty Unlocks → Feliz → Comparte logro │
│ 4. Refiere 3 amigos → 90-100% descuento │
│ 5. Amigos se registran → LOOP │
│ │
│ LOOP 2: CONTADOR SOCIO (MULTIPLICADOR x50) │
│ ───────────────────────────────────────── │
│ 1. Contador se registra (GRATIS si trae clientes) │
│ 2. Invita a sus 30-50 clientes → Todos pagan PRO/BIZ │
│ 3. Contador gana 20% comisión = $894-2,000/mes │
│ 4. Contador recomienda a otros contadores │
│ 5. Red de contadores → EXPLOSIÓN │
│ │
│ LOOP 3: HIGH-TICKET (REFERIDOS ENTRE PARES) │
│ ───────────────────────────────────────── │
│ 1. E-commerce seller o Profesional se registra │
│ 2. Resuelve su dolor → Feliz → Lo comenta en comunidad │
│ 3. Otros sellers/profesionales preguntan │
│ 4. Referido → 15% descuento ambos │
│ 5. Comunidad de nicho crece │
│ │
│ 📊 Viral Coefficient Objetivo: K > 1.5 │
│ (Con contadores: cada usuario trae 1.5 usuarios nuevos) │
│ │
└─────────────────────────────────────────────────────────────────────┘

```

---

## 💰 REVENUE POR PERFIL (PROYECCIÓN)

| Perfil | Plan Típico | Precio | LTV Estimado | Churn |
|:---|:---:|:---:|:---:|:---:|
| 🎓 Estudiante | FREE | $0 | $0 (hoy) → $149 (futuro) | Alto |
| 🏠 Hogar | FREE/PRO | $0-149 | $300 | Medio |
| 💼 Empleado | FREE/PRO | $0-149 | $500 | Medio |
| 🚀 Emprendedor | PRO | $149 | $1,800 | Bajo |
| 🏢 PyME | BUSINESS | $499 | $6,000 | Muy bajo |
| 🔀 Híbrido | PRO | $149 | $1,800 | Bajo |
| 👥 Grupal | FREE | $0 | Viralidad | Alto |
| 🧮 Contador | GRATIS* | $0 | **$10,000+** (indirecto) | Muy bajo |
| 👔 Gerente | N/A | N/A | Incluido en PyME | N/A |
| 📦 E-commerce | BUSINESS | $499 | $8,000 | Muy bajo |
| ⚕️ Alta Gama | PRO | $149 | $3,000 | Muy bajo |

*Contador gratis porque cada cliente que trae genera $149-499/mes.

---

**Próximo:** [07_INTEGRACIONES.md](./07_INTEGRACIONES.md)
```
