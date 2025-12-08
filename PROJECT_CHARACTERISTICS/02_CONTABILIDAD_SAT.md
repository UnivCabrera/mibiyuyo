# 🧾 MÓDULO 02: CONTABILIDAD Y COMPLIANCE SAT

**Total:** 35 características  
**Prioridad PMV:** 18  
**Última actualización:** 28 Nov 2025

---

## 2.1 FACTURACIÓN CFDI 4.0 (15 características)

### SAT-001: Timbrado de Facturas CFDI 4.0

- **Descripción:** Emisión de facturas electrónicas válidas ante SAT
- **PAC:** Integración con Facturapi/SW (circuit breaker)
- **Validaciones:** RFC, UsoCFDI, FormaPago, conceptos
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** BUSINESS

### SAT-002: Pre-Auditoría Automática de CFDI

- **Descripción:** Motor de validación automática antes de timbrar (evita rechazos)
- **Detección:** RFC inválido, uso CFDI incorrecto, montos inconsistentes
- **Scoring:** Probabilidad de éxito del timbrado (0-100%)
- **Ventaja:** 40% de timbrados fallan por errores evitables
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-003: Validación Proactiva de RFC

- **Descripción:** Verificar RFC contra padrón SAT antes de timbrar
- **API:** Servicio de ValidaRFC.mx (con cache Redis 7 días)
- **Estados:** ACTIVO, INACTIVO, LISTA_NEGRA_69B
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### SAT-004: Catálogos SAT Actualizados

- **Descripción:** Mantener catálogos oficiales del SAT
- **Incluye:** UsoCFDI, FormaPago, ClaveProdServ, ClaveUnidad, RegimenFiscal
- **Actualización:** Semanal (BullMQ job automatizado)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SAT-005: Complementos de Pago (REP)

- **Descripción:** Generación automática al conciliar pagos PPD
- **Validaciones:** Saldo insoluto, fecha pago, forma pago
- **Trigger:** Conciliación de pago con factura PPD
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-006: Descarga Masiva SAT (Facturas Emitidas/Recibidas)

- **Descripción:** Descarga automática de CFDI desde SAT
- **Método:** Web Service oficial (no scraping)
- **Frecuencia:** Diaria (2 AM)
- **Capacidad:** Hasta 200,000 XML por solicitud
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** PRO

### SAT-007: Workflow Aceptación/Rechazo

- **Descripción:** Cumplimiento Regla 2.7.1.21 SAT
- **Timeline:** Notificaciones en 0h, 24h, 48h, 72h
- **Auto-aceptación:** Después de 72h sin respuesta
- **Motivos rechazo:** Catálogo oficial SAT
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### SAT-008: Validación Listas Negras (EFOS/EDOS/69-B)

- **Descripción:** Verificar proveedores contra listas negras SAT
- **Listas:** EFOS, EDOS, 69-B, Incumplidos
- **Momento:** Al registrar proveedor y antes de timbrar
- **Alertas:** Notificación si RFC está en lista negra
- **Dashboard:** Panel de proveedores de riesgo
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### SAT-009: Cancelación de CFDI

- **Descripción:** Proceso de cancelación conforme Artículo 29-A CFF
- **Requisitos:** Motivo (01-04), UUID relacionado (si aplica)
- **Flujo:** Solicitud → Aceptación receptor → Cancelación
- **Restricción:** No cancelar CFDI con complemento pago
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### SAT-010: Almacenamiento WORM (7 años)

- **Descripción:** Retención inmutable de XML según CFF
- **Storage:** MinIO/PostgreSQL con política WORM
- **Retención:** 7 años desde emisión
- **Purga:** Automática después de 7 años
- **Prioridad:** 🔴 CRÍTICA (Compliance)
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### SAT-011: Generación de PDF Personalizable

- **Descripción:** Representación impresa del CFDI
- **Plantillas:** 3 diseños (clásico, moderno, minimalista)
- **Marca de agua:** Logo del usuario (opcional)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### SAT-012: Envío Automático por Email

- **Descripción:** Enviar XML + PDF al receptor
- **Trigger:** Al timbrar exitosamente
- **Template:** Personalizable
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** BUSINESS

### SAT-013: Dashboard de Facturación

- **Descripción:** Vista consolidada de facturación
- **Métricas:** Facturas emitidas/mes, monto total, pendientes PPD
- **Gráficas:** Evolución temporal
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### SAT-014: Clientes y Proveedores (CRM Básico)

- **Descripción:** Directorio de clientes/proveedores frecuentes
- **Datos:** RFC, Razón Social, Régimen, Uso CFDI preferido
- **Autocompletado:** Al emitir factura
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### SAT-015: Conciliación Facturas-Pagos

- **Descripción:** Vincular facturas con transacciones bancarias
- **Automática:** Sugerencias por monto y fecha
- **Manual:** Drag & drop para asociar
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

---

## 2.2 PREPARACIÓN CFDI 5.0 (8 características)

### SAT-016: Arquitectura Multi-Versión 4.0/5.0

- **Descripción:** Soporte dual CFDI 4.0 y 5.0 simultáneo
- **UI:** Secciones separadas con feature flags
- **Estado:** 4.0 activo, 5.0 preparado (inactivo hasta Q2 2026)
- **Prioridad:** 🔴 CRÍTICA (Preparación)
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### SAT-017: Analizador de Diferencias 4.0 vs 5.0

- **Descripción:** Herramienta para entender cambios
- **Features:** Comparativa lado a lado, resaltado de diferencias
- **Educación:** Guía interactiva
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### SAT-018: Migrador de Datos 4.0 a 5.0

- **Descripción:** Convertir facturas existentes al nuevo formato
- **Validación:** Verificar compatibilidad antes de migrar
- **Rollback:** Posibilidad de revertir
- **Prioridad:** 🟡 ALTA (Q2 2026)
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-019: Catálogos CFDI 5.0

- **Descripción:** Nuevos catálogos simplificados
- **Reducción:** De 47 a ~30 catálogos
- **Actualización:** Automática desde SAT
- **Prioridad:** 🟡 ALTA (Q2 2026)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

### SAT-020: Validador CFDI 5.0

- **Descripción:** Validación contra nuevo schema XSD
- **Pre-timbrado:** Verificar antes de enviar a PAC
- **Prioridad:** 🟡 ALTA (Q2 2026)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### SAT-021: Factura Lite (Negocios Pequeños)

- **Descripción:** Versión simplificada de CFDI 5.0
- **Campos:** Menos obligatorios
- **Target:** RIF, RESICO
- **Prioridad:** 🟢 MEDIA (Q3 2026)
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### SAT-022: API RESTful para CFDI 5.0

- **Descripción:** Soporte nuevas APIs del SAT
- **Reemplazo:** Gradual de SOAP Web Services
- **Prioridad:** 🟡 ALTA (Q2-Q3 2026)
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-023: Carta Porte 4.0 (Complemento)

- **Descripción:** Soporte para transporte de mercancías
- **Requerido:** Por algunas industrias (logística)
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** BUSINESS

---

## 2.3 DEDUCCIONES Y DECLARACIONES (7 características)

### SAT-024: Dashboard Salud Fiscal (Scoring)

- **Descripción:** Indicador visual (0-100) del "riesgo fiscal" del usuario
- **Factores:** Declaraciones a tiempo, facturas pendientes, proveedores riesgo
- **Alertas:** "Tu score bajó 10 puntos, revisa 3 facturas pendientes"
- **Gamificación:** Usuario quiere mejorar su score
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### SAT-025: Asistente de Deducciones Personales IA

- **Descripción:** IA identifica automáticamente gastos deducibles
- **Categorías:** Médico, escuela, seguros, lentes, donaciones
- **Simulador:** "Si registras $5K más en médico, tu devolución sube $2K"
- **Recomendaciones:** "Aprovecha $7K más en médico antes del 31/Dic"
- **Ventaja:** 68% de mexicanos NO sabe qué es deducible
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### SAT-026: Calculadora de ISR

- **Descripción:** Cálculo de ISR según régimen fiscal
- **Regímenes:** RESICO, Actividad Empresarial, Sueldos, Honorarios
- **Tablas:** Actualizadas automáticamente (DOF)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### SAT-027: Recordatorios de Declaraciones

- **Descripción:** Alertas de fechas límite SAT
- **Declaraciones:** Mensuales (día 17), Anuales (Abril), Provisionales
- **Canales:** Email + in-app + push
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### SAT-028: Pre-llenado de Declaración Anual

- **Descripción:** Genera borrador con datos de la app
- **Formato:** Compatible con portal SAT
- **Campos:** Ingresos, deducciones, retenciones
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### SAT-029: Historial Fiscal Multi-año

- **Descripción:** Comparativa de situación fiscal año vs año
- **Métricas:** Ingresos, deducciones, ISR pagado, devoluciones
- **Gráficas:** Evolución temporal
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### SAT-030: Guías Fiscales Contextuales

- **Descripción:** Ayuda inline sobre temas fiscales mexicanos
- **Contenido:** Artículos, videos, FAQs
- **Contextual:** Aparece según página actual
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** TODOS

---

## 2.4 REPORTES CONTABLES (5 características)

### SAT-031: Estado de Resultados

- **Descripción:** Reporte de ingresos vs egresos por periodo
- **Formato:** Estándar contable mexicano
- **Exportación:** PDF, Excel
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### SAT-032: Balance General

- **Descripción:** Activos, pasivos, capital
- **Para:** Pequeñas empresas (RESICO Empresarial)
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-033: Flujo de Efectivo

- **Descripción:** Movimientos de caja clasificados
- **Método:** Directo e indirecto
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-034: Conciliación Bancaria

- **Descripción:** Cruzar movimientos banco con registros
- **Automática:** Matching inteligente
- **Diferencias:** Identificar y resolver
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### SAT-035: Libro Diario y Mayor

- **Descripción:** Registros contables estándar
- **Partida doble:** Débitos y créditos
- **Exportación:** Para contador externo
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🏗️ 11-20 días
- **Plan:** BUSINESS

---

## 📊 RESUMEN MÓDULO SAT

| Sección     | Total  |  PMV   |  V1   |   V2   |  V3   |
| :---------- | :----: | :----: | :---: | :----: | :---: |
| CFDI 4.0    |   15   |   8    |   5   |   2    |   0   |
| CFDI 5.0    |   8    |   1    |   0   |   6    |   1   |
| Deducciones |   7    |   4    |   2   |   1    |   0   |
| Reportes    |   5    |   0    |   1   |   3    |   1   |
| **TOTAL**   | **35** | **13** | **8** | **12** | **2** |

---

**Próximo:** [03_INTELIGENCIA_ANALITICA.md](./03_INTELIGENCIA_ANALITICA.md)
