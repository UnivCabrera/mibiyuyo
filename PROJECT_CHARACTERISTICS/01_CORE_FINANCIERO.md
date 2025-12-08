# 💰 MÓDULO 01: CORE FINANCIERO

**Total:** 45 características  
**Prioridad PMV:** 25  
**Última actualización:** 28 Nov 2025

---

## 1.1 TRANSACCIONES (15 características)

### FIN-001: Registro Manual de Ingresos

- **Descripción:** Permite registrar ingresos con todos los atributos necesarios
- **Campos:** Monto, fecha, cuenta, categoría, etiquetas, notas, adjuntos
- **Validaciones:** Monto > 0, fecha válida, categoría obligatoria
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-002: Registro Manual de Egresos

- **Descripción:** Registro de gastos con detalles completos
- **Campos:** Igual que ingresos + método de pago
- **Validaciones:** Validar saldo disponible (opcional warning)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-003: Categorización Inteligente

- **Descripción:** Sistema de categorías jerárquicas (padre-hijo-nieto)
- **Niveles:** Hasta 3 niveles de profundidad
- **Predefinidas:** 20+ categorías precargadas adaptadas a México
- **Personalizables:** Usuario puede crear ilimitadas
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM (límite 10) | PRO (ilimitadas)

### FIN-004: Sistema de Etiquetas (Tags)

- **Descripción:** Clasificación cruzada con etiquetas personalizables
- **Límite:** 100 etiquetas por usuario
- **Multi-tag:** Una transacción puede tener múltiples etiquetas
- **Búsqueda:** Filtrado rápido por etiquetas
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-005: Adjuntar Recibos/Comprobantes

- **Descripción:** Permite adjuntar imágenes de recibos
- **Formatos:** JPG, PNG, PDF
- **Límite:** 5MB por archivo
- **OCR:** Extracción automática de monto, fecha, comercio (Gemini Vision)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** FREEMIUM (5/mes) | PRO (ilimitado)

### FIN-006: Gestión de Múltiples Cuentas

- **Descripción:** Usuario puede tener varias cuentas financieras
- **Tipos:** Efectivo, Banco, Inversión, Cripto, Tarjeta Crédito, Ahorro
- **Límite:** 50 cuentas por usuario
- **Balance:** Calculado automáticamente en tiempo real
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM (3 cuentas) | PRO (50)

### FIN-007: Transferencias Entre Cuentas

- **Descripción:** Mover dinero entre cuentas propias
- **Validación:** Cuenta origen ≠ destino
- **Neutral:** No afecta balance total
- **Auditoría:** Registro completo de transferencias
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-008: Transacciones Recurrentes

- **Descripción:** Automatización de transacciones periódicas
- **Frecuencias:** Diaria, Semanal, Quincenal, Mensual, Anual
- **Motor:** BullMQ para job scheduling
- **Control:** Pausar/reanudar/eliminar
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### FIN-009: Soporte Multi-Moneda

- **Descripción:** Manejo de transacciones en diferentes monedas
- **Monedas:** MXN (principal), USD, EUR
- **Conversión:** Automática usando API de tipos de cambio (Banxico)
- **Actualización:** Diaria
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-010: Búsqueda y Filtrado Avanzado

- **Descripción:** Localizar transacciones rápidamente
- **Filtros:** Fecha, monto, categoría, cuenta, etiquetas, texto
- **Búsqueda:** Full-text search en descripción/notas (PostgreSQL tsvector)
- **Performance:** Índices optimizados
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### FIN-011: Importación CSV/Excel

- **Descripción:** Importar transacciones masivamente
- **Formatos:** CSV, XLSX
- **Validación:** Detección de duplicados, formato incorrecto
- **Preview:** Vista previa antes de confirmar
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### FIN-012: Exportación de Datos

- **Descripción:** Exportar transacciones filtradas
- **Formatos:** CSV, Excel, PDF
- **Configuración:** Selección de columnas, rango fechas
- **Marca de agua:** En PDF (personalizable)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-013: Edición Masiva

- **Descripción:** Modificar múltiples transacciones simultáneamente
- **Acciones:** Cambiar categoría, agregar etiquetas, mover a cuenta
- **Selección:** Checkboxes en listado
- **Confirmación:** Diálogo antes de aplicar
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-014: Historial de Cambios (Audit Trail)

- **Descripción:** Registro inmutable de modificaciones
- **Datos:** Quién, qué, cuándo cambió
- **Reversión:** Posibilidad de revertir cambios
- **Retención:** Permanente
- **Prioridad:** 🔴 CRÍTICA (Seguridad)
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** TODOS

### FIN-015: Papelera de Reciclaje

- **Descripción:** Soft delete con recuperación temporal
- **Retención:** 30 días
- **Recuperación:** Un clic para restaurar
- **Purga:** Automática después de 30 días (cron job)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

---

## 1.2 PRESUPUESTOS (10 características)

### FIN-016: Creación de Presupuestos por Categoría

- **Descripción:** Establecer límites de gasto por categoría
- **Periodos:** Mensual, Trimestral, Anual
- **Múltiples:** Varios presupuestos activos simultáneamente
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM (3) | PRO (ilimitados)

### FIN-017: Seguimiento en Tiempo Real

- **Descripción:** Ver progreso del presupuesto actualizado
- **Indicadores:** Barra de progreso, porcentaje, monto restante
- **Colores:** Verde (<80%), Amarillo (80-100%), Rojo (>100%)
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-018: Alertas de Presupuesto

- **Descripción:** Notificaciones automáticas al alcanzar límites
- **Umbrales:** 80% (warning), 100% (excedido)
- **Canales:** Email + notificaciones in-app
- **Configuración:** Usuario puede activar/desactivar
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM

### FIN-019: Presupuestos Flexibles (Rolling)

- **Descripción:** Sobrante del mes se transfiere al siguiente
- **Configuración:** Por presupuesto individual
- **Cálculo:** Automático al finalizar periodo
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-020: Presupuesto Global

- **Descripción:** Límite total de gastos del periodo
- **Cálculo:** Suma de todos los egresos
- **Prioridad sobre categorías:** Alerta si global se excede
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-021: Comparación Real vs Presupuestado

- **Descripción:** Dashboard visual de varianzas
- **Métricas:** Monto absoluto y porcentaje de desviación
- **Gráficas:** Barras comparativas (Chart.js)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-022: Sugerencias de Ajuste IA

- **Descripción:** IA sugiere ajustes basados en patrones
- **Análisis:** Últimos 3-6 meses de datos
- **Recomendaciones:** Aumentar/reducir presupuestos específicos
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### FIN-023: Copiar Presupuesto

- **Descripción:** Duplicar presupuesto de un periodo a otro
- **Ajustes:** Opción de aplicar inflación/cambios
- **Rapidez:** Setup de presupuesto en segundos
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** PRO

### FIN-024: Presupuesto por Proyecto

- **Descripción:** Para freelancers/empresas con múltiples proyectos
- **Asignación:** Gastos específicos a cada proyecto
- **Tracking:** Balance individual por proyecto
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** BUSINESS

### FIN-025: Historial de Presupuestos

- **Descripción:** Ver evolución de presupuestos en el tiempo
- **Análisis:** Identificar tendencias, estacionalidad
- **Comparativas:** Año vs año
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

---

## 1.3 METAS DE AHORRO (10 características)

### FIN-026: Creación de Metas

- **Descripción:** Establecer objetivos de ahorro específicos
- **Atributos:** Nombre, monto objetivo, fecha límite, cuenta destino, imagen
- **Múltiples:** Varias metas simultáneas
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** FREEMIUM (2) | PRO (ilimitadas)

### FIN-027: Progreso Visual

- **Descripción:** Seguimiento del avance hacia la meta
- **Indicadores:** Barra de progreso, porcentaje, monto acumulado
- **Proyección:** Fecha estimada de cumplimiento
- **Prioridad:** 🔴 CRÍTICA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-028: Aportes Manuales

- **Descripción:** Transferir fondos manualmente a la meta
- **Origen:** Cualquier cuenta del usuario
- **Registro:** Historial de aportes
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-029: Aportes Automáticos

- **Descripción:** Transferencias programadas a la meta
- **Configuración:** X% de ingresos o monto fijo
- **Frecuencia:** Semanal, quincenal, mensual
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-030: Calculadora de Meta

- **Descripción:** Calcula cuánto ahorrar para alcanzar meta
- **Inputs:** Monto objetivo, fecha límite, ahorro actual
- **Output:** Ahorro mensual/semanal requerido
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-031: Metas con Hitos (Milestones)

- **Descripción:** Subdividir meta grande en hitos menores
- **Ejemplo:** Meta $100K dividida en $10K, $20K, $50K, $100K
- **Celebración:** Notificación al completar cada hito
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-032: Sugerencias de Metas IA

- **Descripción:** IA sugiere metas basadas en perfil
- **Ejemplos:** Emergency fund (6 meses gastos), Vacaciones, Retiro
- **Personalización:** Ajuste según ingresos/gastos
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### FIN-033: Timeline de Metas

- **Descripción:** Vista cronológica de todas las metas
- **Visualización:** Roadmap temporal (Gantt simplificado)
- **Priorización:** Indicadores de urgencia
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-034: Metas Compartidas

- **Descripción:** Metas familiares entre múltiples usuarios
- **Colaboración:** Aportes de varios miembros
- **Visibilidad:** Dashboard compartido
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** FAMILIA

### FIN-035: Celebraciones de Logro

- **Descripción:** Reconocimiento al completar metas
- **Elementos:** Confetti, badge especial, share en redes
- **Gamificación:** Puntos por cada meta completada
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

---

## 1.4 DEUDAS (10 características)

### FIN-036: Registro de Deudas

- **Descripción:** Capturar información completa de préstamos
- **Datos:** Acreedor, monto, tasa, plazo, fecha inicio
- **Tipos:** Tarjeta crédito, préstamo personal, hipoteca, otros
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-037: Tabla de Amortización

- **Descripción:** Cálculo automático de pagos mensuales
- **Desglose:** Capital + intereses por periodo
- **Actualización:** Recalcula al registrar pagos adelantados
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-038: Dashboard de Deudas

- **Descripción:** Vista consolidada de todas las deudas
- **KPIs:** Total pendiente, próximo pago, fecha liquidación
- **Alertas:** Pagos próximos a vencer (7 días antes)
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-039: Estrategias de Pago (Avalancha/Bola de Nieve)

- **Descripción:** Sugerencias para optimizar pagos
- **Métodos:** Avalancha (mayor interés primero), Bola de nieve (menor saldo)
- **Simulación:** Ver ahorro en intereses
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

### FIN-040: Ratio Deuda/Ingreso

- **Descripción:** Cálculo de salud financiera
- **Fórmula:** Total deudas / Ingresos mensuales
- **Indicadores:** Semáforo según ratio (sano <30%, riesgoso 30-50%, crítico >50%)
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** FREEMIUM

### FIN-041: Notificaciones de Vencimiento

- **Descripción:** Recordatorios automáticos de pagos
- **Anticipación:** 7 días, 3 días, día mismo
- **Canales:** Email + in-app + push
- **Prioridad:** 🟡 ALTA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-042: Liquidación Automática

- **Descripción:** Marcar deuda como pagada al completarse
- **Celebración:** Notificación de logro
- **Historial:** Registro de deudas liquidadas
- **Prioridad:** 🟢 MEDIA
- **Esfuerzo:** ⚡ 1-2 días
- **Plan:** PRO

### FIN-043: Refinanciamiento Sugerido

- **Descripción:** IA detecta oportunidades de refinanciar
- **Análisis:** Comparar tasas actuales con mercado
- **Alerta:** "Podrías ahorrar $X,XXX refinanciando esta deuda"
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** BUSINESS

### FIN-044: Consolidación de Deudas

- **Descripción:** Simular consolidación de múltiples deudas
- **Cálculo:** Pago único vs múltiples pagos
- **Recomendación:** Indicar si conviene o no
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🔨 3-5 días
- **Plan:** PRO

### FIN-045: Historial Crediticio Interno

- **Descripción:** Score interno basado en cumplimiento de pagos
- **Factores:** Pagos a tiempo, utilización, antigüedad
- **Uso:** Gamificación + recomendaciones
- **Prioridad:** 🔵 BAJA
- **Esfuerzo:** 🔧 6-10 días
- **Plan:** PRO

---

## 📊 RESUMEN MÓDULO CORE FINANCIERO

| Sección         | Total  |  PMV   |   V1   |   V2   |  V3   |
| :-------------- | :----: | :----: | :----: | :----: | :---: |
| Transacciones   |   15   |   10   |   3    |   2    |   0   |
| Presupuestos    |   10   |   5    |   3    |   2    |   0   |
| Metas de Ahorro |   10   |   4    |   3    |   3    |   0   |
| Deudas          |   10   |   0    |   5    |   3    |   2   |
| **TOTAL**       | **45** | **19** | **14** | **10** | **2** |

---

**Próximo:** [02_CONTABILIDAD_SAT.md](./02_CONTABILIDAD_SAT.md)
