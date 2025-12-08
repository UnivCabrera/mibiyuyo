# 🚀 PLAN MAESTRO DE CALIDAD Y ESCALAMIENTO: RUTA A LOS 15,000 USUARIOS (2026)
**Proyecto:** PRO_FINAN_CONTA_PYM  
**Hito Objetivo:** 15,000 Usuarios Activos  
**Horizonte Temporal:** Inicios 2026  
**Filosofía:** "Calidad de Servicio como Ventaja Competitiva"

---

## 1. VISIÓN 2026: EL ESTÁNDAR DE CALIDAD

Para inicios de 2026, la tecnología web habrá madurado hacia la **eficiencia extrema** y la **IA omnipresente**. Los usuarios no tolerarán tiempos de carga superiores a 500ms ni caídas durante cierres fiscales.

Al llegar a los 15,000 usuarios, ya no somos una startup probando suerte; somos una plataforma crítica para la contabilidad de miles de PyMEs. La infraestructura debe reflejar esa responsabilidad.

### 🎯 La Promesa de Calidad (SLA Interno)
*   **Disponibilidad:** 99.95% (Máximo 21 min de caída al mes).
*   **Latencia (p95):** < 100ms para operaciones de lectura.
*   **Soporte:** Respuesta automatizada inmediata, resolución humana < 4h.
*   **Integridad:** Cero pérdida de datos (RPO < 5 min).

---

## 2. DIAGNÓSTICO DEL HITO 15K

Cuando alcancemos los 15,000 usuarios, el sistema se comportará así:

| Métrica | Estimación | Impacto en Infraestructura |
| :--- | :--- | :--- |
| **Requests/segundo** | ~800 - 1,200 | **Bun** lo maneja sin sudar, pero la red puede saturarse. |
| **Base de Datos** | ~150 GB | **PostgreSQL** en un solo nodo empieza a sufrir en reportes pesados. |
| **Conexiones DB** | ~2,000 concurrentes | Necesitamos **PgBouncer** (pooling) obligatorio. |
| **Logs** | ~50 GB/mes | Imposible leer a mano. Se requiere **Loki** + Alertas inteligentes. |
| **Trabajos en Fondo** | ~50,000 jobs/día | Descargas SAT masivas. **Redis** necesita más memoria. |

---

## 3. PLAN DE ACCIÓN TÉCNICO (Fase "Quality First")

Este plan se activa progresivamente al acercarnos a la meta.

### 3.1 Infraestructura: La Transición a Multi-Server (Dokploy Swarm)
No saltaremos a Kubernetes. Usaremos la capacidad de **Docker Swarm** nativa de Dokploy para crear un cluster robusto y económico.

*   **Acción:** Agregar 2 VPS "Workers" (4 vCPU, 8GB RAM) al cluster Dokploy.
*   **Configuración:**
    *   **VPS 1 (Manager):** Solo Base de Datos, Redis y Panel Dokploy (Cerebro y Memoria).
    *   **VPS 2 (Worker A):** Frontend + Backend (Carga de Usuario).
    *   **VPS 3 (Worker B):** Workers de BullMQ (Carga Pesada SAT/IA).
*   **Beneficio:** Si el SAT se cae y los workers se cuelgan, la app de usuario (VPS 2) sigue volando. Aislamiento de fallos.

### 3.2 Resiliencia de Software (Código Inteligente)
Implementaremos patrones de estabilidad directamente en el código (ElysiaJS/TypeScript).

#### A. Circuit Breakers (Rompe-Circuitos)
*   **Problema:** El portal del SAT se cae. Nuestros workers intentan conectar 10,000 veces, saturando nuestra propia red.
*   **Solución:** Implementar `opossum` o lógica custom.
    *   *Si fallan 5 intentos seguidos al SAT → "Abrir circuito" (dejar de intentar por 5 min).*
    *   *Usuario recibe:* "El SAT presenta intermitencia, reintentaremos automáticamente en breve." (En lugar de un spinner infinito).

#### B. Graceful Shutdowns (Apagado Elegante)
*   **Problema:** Al hacer deploy, se cortan conexiones activas.
*   **Solución:** Configurar Elysia y BullMQ para escuchar `SIGTERM`.
    *   *Al recibir señal de apagado:* Dejar de aceptar nuevas peticiones, terminar las actuales (timeout 30s), cerrar conexiones DB, y luego morir.
    *   **Resultado:** Zero-downtime deployments reales.

#### C. Health Checks Profundos vs. Superficiales
*   **Superficial (`/health`):** "Estoy vivo" (Ping). Útil para que Dokploy sepa si el contenedor corre.
*   **Profundo (`/health/deep`):** "Puedo trabajar". Verifica conexión a DB, Redis y espacio en disco.
    *   *Uso:* Si el profundo falla, sacar el nodo del balanceador de carga (Traefik) pero no reiniciarlo inmediatamente (dar tiempo a recuperación).

### 3.3 Base de Datos: Optimización para 2026
*   **PgBouncer:** Implementar pooler de conexiones delante de Postgres. Reduce el overhead de memoria por conexión de 2MB a 2KB.
*   **Read Replicas (Preparación):** Si los reportes son lentos, preparar una réplica de solo lectura en el VPS 3 para analytics, dejando el VPS 1 solo para transacciones (escritura).

---

## 4. TECNOLOGÍA 2026: ¿QUÉ NOS ESPERA?

Anticipamos estas tendencias para inicios de 2026 y nos preparamos hoy:

### 4.1 IA Local como Estándar (Small Language Models)
*   **Tendencia:** Modelos como Gemma 2 o Llama 4 (versiones "Nano") correrán eficientemente en CPU.
*   **Estrategia:** Mover el OCR y clasificación de gastos de la nube (API costosa) al VPS 3 (Local).
*   **Preparación:** Asegurar que los VPS elegidos tengan instrucciones AVX-512 (común en AMD EPYC de Hostinger) para inferencia rápida.

### 4.2 Edge Computing & Latencia
*   **Tendencia:** Lógica en el borde (CDN).
*   **Estrategia:** Mover validaciones simples (JWT, Rate Limiting) a **Cloudflare Workers** antes de que toquen nuestro VPS.
*   **Beneficio:** Filtramos el 30% del tráfico "basura" antes de consumir recursos propios.

### 4.3 Bun Maturity
*   **Tendencia:** Bun será el estándar de facto para alto rendimiento, superando a Node en estabilidad.
*   **Estrategia:** Mantenernos en las versiones estables (v1.4+ para 2026). Usar sus APIs nativas (`Bun.serve`, `Bun.sqlite`) en lugar de librerías externas para reducir dependencias.

---

## 5. FEATURES "PREMIUM" DE INFRAESTRUCTURA (A implementar a los 15k)

Estas son las características que diferencian un proyecto "amateur" de uno "profesional":

| Feature | Descripción | Beneficio al Cliente | Implementación |
| :--- | :--- | :--- | :--- |
| **Rate Limiting Dinámico** | Límites basados en plan (Free: 60 req/min, Pro: 1000 req/min). | Protege el servicio para los clientes que pagan. | Middleware en Elysia + Redis. |
| **Automated Canary** | Deployar nueva versión solo al 5% de usuarios (o solo al equipo interno) primero. | Si hay un bug, solo afecta a pocos. Calidad garantizada. | Dokploy Preview Environments + Header routing. |
| **Business Monitoring** | Dashboard Grafana con métricas de negocio: "$ Facturado hoy", "Errores SAT/hora". | Reacción proactiva ante problemas de negocio, no solo técnicos. | Métricas custom Prometheus en código. |
| **Self-Healing Workers** | Si un worker de descarga SAT se "congela", el sistema lo detecta y lo mata. | Las descargas nunca se quedan "pegadas". | Health check interno en BullMQ. |
| **Compresión Inteligente** | Compresión Zstd para respuestas API y Brotli para estáticos. | App se siente instantánea incluso en 4G. | Configuración en Traefik y Elysia. |

---

## 6. LO QUE NO HAREMOS (ANTI-PATRONES)

Para mantener la agilidad y calidad, **evitaremos** caer en estas trampas comunes a los 15k usuarios:

1.  ❌ **Migrar a Kubernetes (K8s):** Aumentaría la complejidad operativa un 300% sin beneficio tangible de rendimiento. Dokploy Swarm es suficiente hasta los 100k usuarios.
2.  ❌ **Microservicios Puros:** No romperemos el backend en 20 servicios pequeños. Mantendremos un "Monolito Modular" (Modular Monolith) que es fácil de refactorizar y deployar.
3.  ❌ **Service Mesh (Istio):** Demasiado consumo de RAM. La seguridad se manejará con redes privadas de Docker.

---

## 7. RESUMEN DEL PLAN DE ACCIÓN

1.  **Hoy:** Seguir desarrollando en el stack Bun/Elysia/Svelte (Base sólida).
2.  **5,000 Usuarios:** Activar **Cloudflare Cache** agresivo y optimizar queries SQL.
3.  **10,000 Usuarios:** Separar la Base de Datos a su propio VPS (dentro de Dokploy).
4.  **15,000 Usuarios (Hito):**
    *   Activar **Cluster Swarm (3 nodos)**.
    *   Implementar **Circuit Breakers** para el SAT.
    *   Desplegar **Dashboard de Negocio** en Grafana.
    *   Revisar **SLA** y ajustar recursos.

Este documento es la brújula para que el crecimiento no nos tome por sorpresa. La calidad no es un accidente, es arquitectura.

---

## 8. APÉNDICE TÉCNICO: PROTOCOLO DE MIGRACIÓN A CLUSTER (PASO A PASO)

Este es el manual de ejecución exacto para cuando llegue el día de escalar de 1 VPS a 3 VPS.

### FASE A: Aprovisionamiento de Servidores (Hostinger)

1.  **Contratar VPS Adicionales:**
    *   Ir al panel de Hostinger.
    *   Adquirir 2 nuevas instancias VPS (Recomendado: KVM 4, 4 vCPU, 8GB RAM).
    *   **Importante:** Seleccionar la **misma ubicación física** (Data Center) que el VPS principal para minimizar latencia.
    *   Sistema Operativo: **Ubuntu 24.04** (Clean Install).

2.  **Preparación de Red (Firewall):**
    *   En el panel de Hostinger de los *nuevos* VPS, abrir puertos para comunicación Swarm:
        *   `2377/tcp` (Cluster Management)
        *   `7946/tcp` y `7946/udp` (Communication)
        *   `4789/udp` (Overlay Network)
        *   `22/tcp` (SSH)
    *   *Nota:* Idealmente, restringir estos puertos para que solo acepten tráfico de la IP del VPS Manager.

### FASE B: Vinculación con Dokploy (El "Magic Link")

1.  **Obtener Token de Unión:**
    *   Ir a tu panel actual: `dokploy.profinanconta.mx`
    *   Navegar a: `Settings` > `Cluster / Servers` > `Add Server`.
    *   Copiar el comando generado (ej. `curl https://dokploy.com/join...`).

2.  **Ejecutar en Workers:**
    *   Conectarse por SSH al **Nuevo VPS 1** (Worker A).
    *   Pegar y ejecutar el comando.
    *   Repetir para el **Nuevo VPS 2** (Worker B).

3.  **Verificación:**
    *   En el panel Dokploy, verás los 3 nodos con estado "Ready".
    *   Etiquetarlos para organización:
        *   Manager (Original) -> Label: `role=manager`
        *   Worker A -> Label: `role=app`
        *   Worker B -> Label: `role=worker`

### FASE C: Migración de Servicios (Sin Downtime)

Ahora moveremos la carga de trabajo a los nuevos nodos.

#### 1. Mover Frontend y Backend (a Worker A)
Queremos que la aplicación corra en el VPS dedicado a App.

*   Ir a `Application` > `frontend` > `Deployment`.
*   **Placement Constraints:** Agregar restricción.
    *   `node.labels.role` == `app`
*   **Replicas:** Aumentar a 2.
*   **Deploy:** Dokploy levantará las nuevas instancias en el Worker A y apagará las del Manager suavemente.

#### 2. Mover Workers de Fondo (a Worker B)
Queremos que el procesamiento pesado (SAT, IA) no afecte al usuario.

*   Ir a `Application` > `sat-worker` > `Deployment`.
*   **Placement Constraints:** Agregar restricción.
    *   `node.labels.role` == `worker`
*   **Deploy.**

#### 3. Anclar Base de Datos (en Manager)
La base de datos NO debe moverse para evitar problemas de volúmenes (a menos que usemos almacenamiento distribuido como GlusterFS, pero por simplicidad inicial, la dejamos fija).

*   Ir a `Database` > `postgres-main`.
*   **Placement Constraints:** Asegurar que esté anclada.
    *   `node.role` == `manager`

### FASE D: Verificación Final

1.  **Test de Carga:** Verificar que el tráfico fluye correctamente a través de Traefik (en el Manager) hacia los servicios en los Workers.
2.  **Latencia:** Verificar que la latencia entre DB (Manager) y App (Worker A) sea < 1ms (red interna).
3.  **Desconexión:** Simular apagado de un contenedor de App para ver cómo Swarm lo reinicia.

*Fin del Protocolo.*

