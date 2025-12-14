# 🛠️ BLOQUE B: INGENIERÍA DE SOFTWARE DE ÉLITE

## 8. Arquitecto de Software

### 1. Diagnóstico Actual

El backend en `backend/src` tiene una estructura básica de controladores y rutas, pero carece de una separación clara de capas de dominio. Hay lógica de negocio mezclada en los controladores.

### 2. Riesgos Críticos

- **Deuda Técnica Acelerada:** Sin DDD, añadir nuevas reglas fiscales (que cambian cada año) romperá el código existente.
- **Acoplamiento:** Dificultad para cambiar de base de datos o framework si la lógica está atada a la infraestructura.

### 3. Soluciones 2026

- **Arquitectura Hexagonal (Puertos y Adaptadores):** Aislar el núcleo (Reglas SAT) de los detalles (Bun, Postgres).
- **Domain-Driven Design (DDD):** Modelar "Factura", "Impuesto", "Usuario" como agregados ricos, no solo datos anémicos.

### 4. Action Items

- [ ] Refactorizar `backend/src` creando carpetas `domain`, `application`, `infrastructure`.
- [ ] Definir Interfaces de Repositorio para desacoplar la DB.

## 9. Svelte Frontend Lead

### 1. Diagnóstico Actual

El frontend en `frontend/` usa SvelteKit pero la estructura de componentes no aprovecha las nuevas características de Svelte 5 (Runes).

### 2. Riesgos Críticos

- **Rendimiento en Móviles:** El manejo de estado global complejo sin Runes puede causar re-renderizados innecesarios en dispositivos de gama baja (comunes en PyMES).
- **Obsolescencia:** Svelte 4 pasará a modo mantenimiento pronto.

### 3. Soluciones 2026

- **Migración a Runes:** Usar `$state`, `$derived`, `$effect` para una reactividad granular y predecible.
- **Componentes "Headless":** Separar lógica de UI para máxima reutilización.

### 4. Action Items

- [ ] Actualizar `package.json` a Svelte 5 (preview/stable).
- [ ] Reescribir stores globales usando el nuevo sistema de reactividad.

## 10. Backend API Architect

### 1. Diagnóstico Actual

La API actual parece ser REST básica. No hay evidencia de manejo de idempotencia para operaciones críticas como "Timbrar Factura".

### 2. Riesgos Críticos

- **Doble Facturación:** Si el cliente reintenta una petición por error de red, se podría generar doble factura fiscal.
- **Versionado:** Cambios en la API romperán la App Móvil si no se versiona correctamente (`/v1`, `/v2`).

### 3. Soluciones 2026

- **Idempotency Keys:** Header `Idempotency-Key` obligatorio para POSTs financieros.
- **HATEOAS:** (Opcional) Para navegabilidad, pero priorizar documentación OpenAPI (Swagger).

### 4. Action Items

- [ ] Implementar middleware de Idempotencia con Redis.
- [ ] Configurar ElysiaJS Swagger para documentación automática.

## 11. Database Administrator (DBA)

### 1. Diagnóstico Actual

PostgreSQL está configurado (`database/migrations`), pero no se ven índices optimizados para consultas de reportes financieros pesados.

### 2. Riesgos Críticos

- **Cuellos de Botella:** Consultas de "Ventas del Año" colapsarán el servidor sin índices compuestos.
- **Integridad de Datos:** Falta uso extensivo de Constraints y Foreign Keys para asegurar consistencia contable.

### 3. Soluciones 2026

- **Partitioning:** Particionar tablas de `facturas` por año/mes.
- **Materialized Views:** Vistas materializadas para reportes en tiempo real, refrescadas por eventos.

### 4. Action Items

- [ ] Analizar query plans de reportes actuales.
- [ ] Implementar particionamiento en tabla `transactions`.

## 12. DevOps Engineer

### 1. Diagnóstico Actual

Hay `docker-compose` y scripts básicos. Falta un pipeline CI/CD robusto que ejecute pruebas y despliegue automáticamente con cero downtime.

### 2. Riesgos Críticos

- **"En mi máquina funciona":** Discrepancias entre dev y prod.
- **Downtime en Despliegues:** Reiniciar contenedores tira el servicio a usuarios activos.

### 3. Soluciones 2026

- **Blue-Green Deployment:** Desplegar la nueva versión en paralelo y cambiar el tráfico gradualmente.
- **Infrastructure as Code (IaC):** Terraform o Ansible para configurar el VPS Fedora.

### 4. Action Items

- [ ] Configurar GitHub Actions para Build, Test y Push a Registry.
- [ ] Script de Rollback automático en caso de fallo.

## 13. Cloud FinOps

### 1. Diagnóstico Actual

El plan parece ser usar un VPS. Esto es barato al inicio pero no escala automáticamente.

### 2. Riesgos Críticos

- **Costos Ocultos:** Si se migra a AWS/Azure sin control, la factura se disparará.
- **Recursos Ociosos:** Pagar por CPU al 100% cuando el tráfico es bajo en la noche.

### 3. Soluciones 2026

- **Hetzner/DigitalOcean:** Mantenerse en proveedores de costo fijo para la fase inicial.
- **Serverless para tareas puntuales:** Usar Cloudflare Workers o AWS Lambda solo para procesos pesados esporádicos (OCR).

### 4. Action Items

- [ ] Presupuesto mensual estricto de infraestructura ($50 USD).
- [ ] Monitoreo de costos con alertas.

## 14. Mobile Architect

### 1. Diagnóstico Actual

Se menciona `App_movil-main` pero parece ser documentación. La estrategia PWA es sólida pero requiere implementación nativa de capacidades offline.

### 2. Riesgos Críticos

- **Experiencia de Usuario:** Una PWA lenta se siente "barata" comparada con una App Nativa.
- **Sincronización:** Conflictos de datos cuando el usuario trabaja offline y luego se conecta.

### 3. Soluciones 2026

- **Service Workers Avanzados:** Estrategia `Stale-While-Revalidate` para datos de lectura.
- **Background Sync API:** Para enviar facturas creadas offline cuando vuelva la red.

### 4. Action Items

- [ ] Configurar `vite-plugin-pwa` con estrategias de caché agresivas.
- [ ] Diseñar cola de sincronización en IndexedDB.

## 15. QA Automation Lead

### 1. Diagnóstico Actual

No hay evidencia de tests E2E o unitarios en el código fuente proporcionado.

### 2. Riesgos Críticos

- **Regresiones:** Arreglar un bug en el cálculo de IVA rompe el cálculo de ISR.
- **Confianza:** Un error en producción destruye la confianza del usuario financiero.

### 3. Soluciones 2026

- **Playwright:** Tests E2E que simulen el flujo completo de facturación.
- **Vitest:** Tests unitarios para toda la lógica de negocio y cálculos fiscales.

### 4. Action Items

- [ ] Instalar Playwright y crear test "Happy Path" (Login -> Crear Factura).
- [ ] Alcanzar 80% de cobertura en módulo de impuestos.

## 16. AI Integration Engineer

### 1. Diagnóstico Actual

Se menciona "Gemini" y "Agentes". Falta la integración real en el código.

### 2. Riesgos Críticos

- **Alucinaciones:** La IA inventando leyes fiscales o montos.
- **Latencia:** Respuestas lentas de la IA frustran al usuario.

### 3. Soluciones 2026

- **RAG (Retrieval-Augmented Generation):** Alimentar a la IA con el contexto exacto de la ley y los datos del usuario.
- **Function Calling:** Usar la IA para extraer datos de facturas y llamar a funciones de la API, no para generar texto libre.

### 4. Action Items

- [ ] Implementar cliente de Gemini Pro con contexto de leyes fiscales.
- [ ] Crear pipeline de OCR para tickets de gastos.

## 17. Data Scientist

### 1. Diagnóstico Actual

No hay análisis de datos implementado.

### 2. Riesgos Críticos

- **Ceguera:** No saber qué funcionalidades se usan más.
- **Oportunidad Perdida:** No ofrecer insights financieros (ej. "Gastas mucho en café").

### 3. Soluciones 2026

- **Forecasting:** Algoritmos simples (ARIMA/Prophet) para predecir flujo de caja.
- **Clustering:** Agrupar gastos automáticamente.

### 4. Action Items

- [ ] Diseñar esquema de Data Warehouse (separado de la DB transaccional).
- [ ] Prototipar modelo de predicción de gastos en Python.

## 18. Blockchain Consultant

### 1. Diagnóstico Actual

Mencionado como opcional.

### 2. Riesgos Críticos

- **Complejidad Innecesaria:** Añadir Blockchain ahora distraería del Core Business.

### 3. Soluciones 2026

- **Notarización Digital:** Usar Blockchain solo para generar un hash inmutable de la contabilidad anual (Proof of Existence).

### 4. Action Items

- [ ] Evaluar costos de transacción en redes L2 (Polygon/Arbitrum) para notarización mensual (Post-MVP).
