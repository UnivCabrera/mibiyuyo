# 🎯 ROADMAP DE EJECUCIÓN PASO A PASO
## La Guía Definitiva: Del Concepto al Lanzamiento

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión:** 1.0  
**Fecha:** 1 Diciembre 2025  
**Propósito:** Entender el ORDEN LÓGICO y el POR QUÉ de cada decisión técnica

---

## 📚 FILOSOFÍA DE ESTE DOCUMENTO

> **"No basta saber QUÉ construir. Hay que entender POR QUÉ va en ese orden."**

Este documento te enseñará a pensar como un arquitecto de software. Cada paso incluye:
- ✅ **Qué hacer** (acción concreta)
- 🧠 **Por qué en este orden** (lógica de dependencias)
- ⚠️ **Qué pasa si lo saltas** (consecuencias reales)
- 🔗 **De qué depende** (prerrequisitos)

---

## 🏗️ ARQUITECTURA DE DEPENDENCIAS: EL MAPA MENTAL

```
                    ┌─────────────────────────────────────────────────────────────┐
                    │                    FASE 0: FUNDAMENTOS                      │
                    │     (Sin esto, TODO lo demás falla o se reescribe)          │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
            ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
            │  DECISIONES   │        │   AMBIENTE    │        │   ESQUEMA     │
            │  TECNOLÓGICAS │───────▶│  DE TRABAJO   │───────▶│   DE DATOS    │
            └───────────────┘        └───────────────┘        └───────────────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │                    FASE 1: BACKEND CORE                     │
                    │        (La "columna vertebral" de toda la aplicación)       │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
            ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
            │ AUTENTICACIÓN │───────▶│     CRUD      │───────▶│     LÓGICA    │
            │   (Auth.js)   │        │   BÁSICO      │        │   DE NEGOCIO  │
            └───────────────┘        └───────────────┘        └───────────────┘
                    │                         │                         │
                    └─────────────────────────┼─────────────────────────┘
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │                    FASE 2: FRONTEND BASE                    │
                    │          (Interfaz que consume el backend estable)          │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    ▼                         ▼                         ▼
            ┌───────────────┐        ┌───────────────┐        ┌───────────────┐
            │    DESIGN     │───────▶│  COMPONENTES  │───────▶│    PÁGINAS    │
            │    SYSTEM     │        │      UI       │        │   CONECTADAS  │
            └───────────────┘        └───────────────┘        └───────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │                 FASE 3: MÓDULOS SATÉLITE                    │
                    │     (Features que EXTIENDEN el core, no lo definen)         │
                    └─────────────────────────────────────────────────────────────┘
                                              │
          ┌───────────────┬───────────────┬───┴───┬───────────────┬───────────────┐
          ▼               ▼               ▼       ▼               ▼               ▼
    ┌───────────┐   ┌───────────┐   ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐
    │    SAT    │   │    IA     │   │  PAGOS    │ │GAMIFICACIÓN│ │ REPORTES │ │  ESCUDO   │
    │   CFDI    │   │  Gemini   │   │  Stripe   │ │  Puntos   │ │   PDF    │ │FINANCIERO │
    └───────────┘   └───────────┘   └───────────┘ └───────────┘ └───────────┘ └───────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │                 FASE 4: INFRAESTRUCTURA                     │
                    │           (Preparar el "hogar" en producción)               │
                    └─────────────────────────────────────────────────────────────┘
                                              │
                                              ▼
                    ┌─────────────────────────────────────────────────────────────┐
                    │                    FASE 5: LANZAMIENTO                      │
                    │              (Testing final, beta, go-live)                 │
                    └─────────────────────────────────────────────────────────────┘
```

---

# 🚀 FASE 0: FUNDAMENTOS (Semana -1)
## "Las decisiones que tomas ANTES de escribir código definen el 80% del éxito"

---

## PASO 0.1: DECISIONES TECNOLÓGICAS FINALES

### ✅ Qué hacer:
1. Confirmar stack tecnológico definitivo (ya documentado en `03_STACK_TECNOLOGICO_DEFINITIVO.md`)
2. Crear documento de ADRs (Architecture Decision Records) si hay cambios
3. Verificar versiones exactas de cada tecnología

### 🧠 Por qué en este orden:
> **Cambiar de tecnología después de empezar a programar es como cambiar los cimientos de una casa cuando ya construiste el segundo piso.**

Si decides cambiar de PostgreSQL a MongoDB a mitad del proyecto, tendrás que:
- Reescribir todos los schemas
- Rehacer las migraciones
- Modificar todos los repositorios
- Actualizar los tipos de TypeScript
- Re-testear todo

**Costo estimado de cambiar tecnología a mitad del proyecto: 2-4 semanas perdidas.**

### ⚠️ Qué pasa si lo saltas:
- Descubres que una librería no es compatible con Bun → refactor de emergencia
- Eliges una base de datos sin soporte de vectores → imposible hacer IA local
- Usas un framework abandonado → vulnerabilidades sin parchar

### 🔗 Prerrequisitos:
- Ninguno (es el punto de partida)

---

## PASO 0.2: CONFIGURACIÓN DEL AMBIENTE DE DESARROLLO

### ✅ Qué hacer:
1. Instalar Bun 1.3.3+, Node.js 24.11.1 LTS (fallback)
2. Instalar Docker Desktop o Docker Engine
3. Configurar VS Code con extensiones necesarias
4. Crear archivo `.nvmrc` o `.tool-versions` para versiones
5. Configurar `.editorconfig` y `.prettierrc` para consistencia

### 🧠 Por qué en este orden:
> **Un ambiente de desarrollo inconsistente genera bugs "fantasma" que solo aparecen en tu máquina.**

Si tú usas Node 24 y un colaborador usa Node 20:
- Las APIs nuevas no funcionarán en su máquina
- Los tests pasarán en tu PC pero fallarán en CI/CD
- Perderás horas debuggeando "funciona en mi máquina"

### ⚠️ Qué pasa si lo saltas:
- `bun install` instala versiones diferentes en cada máquina
- Docker builds fallan porque el ambiente local difiere
- El código funciona en desarrollo pero crashea en producción

### 🔗 Prerrequisitos:
- Paso 0.1 completado (saber qué versiones instalar)

---

## PASO 0.3: DISEÑO DEL ESQUEMA DE DATOS (DATABASE-FIRST)

### ✅ Qué hacer:
1. Diseñar diagrama ER (Entidad-Relación) completo
2. Definir todas las tablas, columnas, tipos, relaciones
3. Identificar índices necesarios para queries frecuentes
4. Crear schema inicial con Drizzle ORM
5. Ejecutar primera migración en PostgreSQL local

### 🧠 Por qué ANTES del código de aplicación:
> **La base de datos es el "contrato" entre todas las partes del sistema. Cambiarla después afecta TODO.**

```
                     ┌─────────────────┐
                     │   BASE DE DATOS  │
                     │    (Esquema)     │
                     └────────┬────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Backend │          │   IA    │          │  Jobs   │
   │   API   │          │ Queries │          │ Workers │
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │Frontend │          │ Reports │          │Analytics│
   │   UI    │          │   PDF   │          │Dashboard│
   └─────────┘          └─────────┘          └─────────┘
```

**Si cambias el esquema después:**
- Backend: Modificar repositorios, DTOs, validaciones
- Frontend: Cambiar formularios, tablas, tipos
- IA: Actualizar prompts y embeddings
- Jobs: Reescribir workers de sincronización
- Reportes: Ajustar queries y plantillas

### ⚠️ Qué pasa si lo saltas:
- Creas el frontend con campos que no existen en DB → reescritura total
- Olvidas un campo crítico (ej: `deleted_at` para soft delete) → migración compleja después
- No indexas columnas de búsqueda → app lenta con 1000 usuarios

### 🔗 Prerrequisitos:
- Paso 0.2 (PostgreSQL corriendo en Docker local)

---

## PASO 0.4: CONFIGURACIÓN DEL MONOREPO

### ✅ Qué hacer:
1. Inicializar estructura de carpetas según `03_STACK_TECNOLOGICO_DEFINITIVO.md`
2. Configurar Bun workspaces (`package.json` raíz)
3. Crear `tsconfig.json` base y extendidos por app
4. Configurar ESLint + Prettier compartidos
5. Crear scripts comunes (`dev`, `build`, `test`, `lint`)

### 🧠 Por qué ahora:
> **La estructura del proyecto define cómo escala el equipo y el código.**

Un monorepo bien configurado permite:
- Compartir tipos entre frontend y backend (sin duplicar)
- Ejecutar tests de todo el proyecto con un comando
- Hacer deploys atómicos (todo sube junto)
- Reutilizar código en `packages/shared-types`

### ⚠️ Qué pasa si lo saltas:
- Copias y pegas tipos entre apps → se desincronizan
- Cada app tiene su propio ESLint → código inconsistente
- No puedes hacer CI/CD unificado

### 🔗 Prerrequisitos:
- Paso 0.2 (Bun instalado)

---

# 🔧 FASE 1: BACKEND CORE (Semanas 1-2)
## "El backend es el 'cerebro' - si falla, todo el cuerpo colapsa"

---

## PASO 1.1: AUTENTICACIÓN Y AUTORIZACIÓN

### ✅ Qué hacer:
1. Implementar Auth.js con adaptador Drizzle
2. Configurar providers: Email/Password, Google, Microsoft
3. Implementar JWT con refresh tokens en Redis
4. Crear middleware de autorización por roles
5. Implementar rate limiting en endpoints de auth

### 🧠 Por qué es lo PRIMERO del backend:
> **Sin autenticación, no puedes saber QUIÉN hace QUÉ. Y sin saber quién, no puedes guardar SUS datos.**

```
Usuario hace request
       │
       ▼
┌──────────────────┐
│  ¿Está logueado? │──── NO ───▶ Redirigir a /login
└────────┬─────────┘
         │ SÍ
         ▼
┌──────────────────┐
│ ¿Tiene permisos? │──── NO ───▶ Error 403 Forbidden
└────────┬─────────┘
         │ SÍ
         ▼
┌──────────────────┐
│  Procesar request │
│  con `user.id`    │
└──────────────────┘
```

Cada transacción que guardes necesita `user_id`. Si implementas transacciones primero sin auth:
- ¿De quién es la transacción? No sabes.
- ¿Cómo filtras por usuario? No puedes.
- Tendrás que agregar `user_id` después → migración + refactor.

### ⚠️ Qué pasa si lo saltas:
- Guardas transacciones sin saber de quién son
- Cualquiera puede ver datos de otros usuarios (vulnerabilidad crítica)
- Tienes que rehacer todos los endpoints para agregar `user_id`

### 🔗 Prerrequisitos:
- Paso 0.3 (tablas `users`, `sessions`, `accounts` en DB)
- Paso 0.4 (proyecto estructurado)

---

## PASO 1.2: CRUD DE ENTIDADES CORE

### ✅ Qué hacer:
1. Implementar repositorio de Usuarios (ya viene con auth)
2. Crear CRUD de Cuentas financieras
3. Crear CRUD de Categorías
4. Crear CRUD de Transacciones
5. Implementar validaciones con TypeBox

### 🧠 Por qué este orden (Cuentas → Categorías → Transacciones):
> **Las entidades tienen dependencias. No puedes crear una transacción sin saber EN QUÉ cuenta y DE QUÉ categoría.**

```
┌──────────────┐
│    Usuario   │
└──────┬───────┘
       │ 1:N (un usuario tiene muchas cuentas)
       ▼
┌──────────────┐
│    Cuenta    │
└──────┬───────┘
       │ 1:N (una cuenta tiene muchas transacciones)
       ▼
┌──────────────┐     ┌──────────────┐
│ Transacción  │────▶│  Categoría   │
└──────────────┘     └──────────────┘
                     (N:1 - muchas transacciones, una categoría)
```

Si creas Transacciones primero:
- `account_id` → ¿Qué cuenta? No existe tabla.
- `category_id` → ¿Qué categoría? No existe tabla.
- El INSERT falla por foreign key constraints.

### ⚠️ Qué pasa si lo saltas:
- Errores de FK en runtime
- Tests que fallan por datos incompletos
- Lógica de negocio rota

### 🔗 Prerrequisitos:
- Paso 1.1 (saber el `user_id` para asociar entidades)

---

## PASO 1.3: LÓGICA DE NEGOCIO (Casos de Uso)

### ✅ Qué hacer:
1. Implementar cálculo de balances
2. Crear servicio de transferencias entre cuentas
3. Implementar presupuestos y alertas
4. Crear sistema de metas financieras
5. Implementar transacciones recurrentes (BullMQ)

### 🧠 Por qué después del CRUD básico:
> **La lógica de negocio ORQUESTA las entidades. Sin entidades, no hay nada que orquestar.**

Ejemplo: "Transferencia entre cuentas"
```typescript
// Esto NECESITA que Cuenta y Transacción ya existan
async function transferir(origen: string, destino: string, monto: number) {
  // 1. Validar que origen tiene saldo suficiente (NECESITA: Cuenta)
  // 2. Crear transacción de egreso en origen (NECESITA: Transacción)
  // 3. Crear transacción de ingreso en destino (NECESITA: Transacción)
  // 4. Actualizar balances de ambas cuentas (NECESITA: Cuenta)
}
```

### ⚠️ Qué pasa si lo saltas:
- Solo tienes CRUD sin "inteligencia"
- El usuario hace todo manualmente
- No hay valor diferencial vs una hoja de Excel

### 🔗 Prerrequisitos:
- Paso 1.2 (entidades listas para orquestar)

---

## PASO 1.4: TESTS DEL BACKEND

### ✅ Qué hacer:
1. Escribir tests unitarios de lógica de negocio
2. Escribir tests de integración de APIs
3. Configurar base de datos de prueba (PostgreSQL test)
4. Alcanzar cobertura mínima del 70%
5. Integrar tests en pre-commit hook

### 🧠 Por qué antes del frontend:
> **Si el backend tiene bugs, el frontend mostrará datos incorrectos. Mejor detectar bugs ahora que cuando el usuario los reporte.**

```
Backend con bugs    Backend testeado
       │                   │
       ▼                   ▼
  ┌─────────┐         ┌─────────┐
  │ Balance │         │ Balance │
  │ $5,000  │         │ $3,200  │ ← Correcto
  │(incorrecto)       └─────────┘
  └─────────┘
       │
       ▼
  Usuario confía
  en dato falso
       │
       ▼
  Toma mala decisión
  financiera
       │
       ▼
  Demanda legal 💀
```

### ⚠️ Qué pasa si lo saltas:
- Bugs en producción que afectan dinero real
- Usuarios pierden confianza
- Reputación destruida

### 🔗 Prerrequisitos:
- Paso 1.3 (código que testear)

---

# 🎨 FASE 2: FRONTEND BASE (Semanas 3-4)
## "El frontend es la 'cara' del producto - si es feo o confuso, nadie lo usa"

---

## PASO 2.1: DESIGN SYSTEM

### ✅ Qué hacer:
1. Configurar Open Props + CSS Variables
2. Crear tokens de diseño (colores, espaciados, tipografía)
3. Implementar tema claro/oscuro
4. Documentar paleta según `01_COLORIMETRIA_PSICOLOGIA.md`
5. Crear archivo `global.css` con reset y base

### 🧠 Por qué antes de los componentes:
> **Sin un sistema de diseño, cada componente se ve diferente. El resultado: una app que parece hecha por 10 personas diferentes.**

```css
/* SIN Design System */
.button-1 { background: #3498db; padding: 10px; }
.button-2 { background: blue; padding: 8px 16px; }
.button-3 { background: #2980b9; padding: 12px; }
/* Tres botones, tres estilos diferentes. Caos visual. */

/* CON Design System */
.btn { 
  background: var(--color-primary); 
  padding: var(--space-2) var(--space-4);
}
/* Todos los botones se ven iguales. Consistencia. */
```

### ⚠️ Qué pasa si lo saltas:
- Cada componente tiene su propio color hardcodeado
- Cambiar el tema oscuro = modificar 200 archivos
- La app se ve "amateur"

### 🔗 Prerrequisitos:
- Paso 0.4 (proyecto frontend inicializado)

---

## PASO 2.2: COMPONENTES UI ATÓMICOS

### ✅ Qué hacer:
1. Crear componentes primitivos: Button, Input, Card, Modal
2. Integrar shadcn-svelte como base
3. Crear componentes financieros: MoneyInput (con IMask), DatePicker
4. Implementar tablas con TanStack Table
5. Documentar componentes con Storybook o similar

### 🧠 Por qué antes de las páginas:
> **Las páginas USAN componentes. Sin componentes, las páginas son HTML repetido.**

```
Página de Dashboard
       │
       ├── <Header />
       ├── <Card title="Balance">
       │      └── <MoneyDisplay value={balance} />
       ├── <TransactionTable data={transactions} />
       └── <Footer />
```

Si creas la página primero sin componentes:
- Copias y pegas el mismo HTML en 10 páginas
- Cambias el diseño del botón = editar 10 páginas
- Inconsistencias visuales

### ⚠️ Qué pasa si lo saltas:
- Código duplicado por todas partes
- Imposible mantener consistencia
- Cambios de diseño = pesadilla

### 🔗 Prerrequisitos:
- Paso 2.1 (tokens de diseño disponibles)

---

## PASO 2.3: PÁGINAS Y RUTAS

### ✅ Qué hacer:
1. Crear layout principal (sidebar + header + main)
2. Implementar rutas: /dashboard, /transacciones, /cuentas, etc.
3. Conectar páginas con API del backend (Eden Treaty)
4. Implementar estados de carga (skeletons)
5. Manejar errores con boundaries

### 🧠 Por qué después de componentes:
> **Una página es una COMPOSICIÓN de componentes. Sin componentes, no hay nada que componer.**

### ⚠️ Qué pasa si lo saltas:
- Tienes componentes bonitos pero ningún lugar donde usarlos
- La app no hace nada visible para el usuario

### 🔗 Prerrequisitos:
- Paso 2.2 (componentes listos)
- Paso 1.4 (backend probado y estable)

---

## PASO 2.4: FLUJOS DE USUARIO CRÍTICOS

### ✅ Qué hacer:
1. Implementar onboarding (registro → verificar email → primer uso)
2. Crear flujo de agregar transacción (formulario → validar → guardar)
3. Implementar flujo de crear presupuesto
4. Crear flujo de conectar cuenta bancaria (futuro)
5. Testear flujos con Playwright E2E

### 🧠 Por qué ahora:
> **Los flujos son la EXPERIENCIA del usuario. Sin flujos, tienes páginas desconectadas.**

Un flujo típico:
```
Usuario nuevo
    │
    ▼
┌─────────────────┐
│    REGISTRO     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ VERIFICAR EMAIL │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   ONBOARDING    │
│ "Crea tu primera│
│    cuenta"      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   DASHBOARD     │
│  "¡Bienvenido!" │
└─────────────────┘
```

### ⚠️ Qué pasa si lo saltas:
- Usuario se registra → llega a dashboard vacío → no sabe qué hacer → abandona
- Tasa de conversión: 5% (debería ser >50%)

### 🔗 Prerrequisitos:
- Paso 2.3 (páginas existentes para conectar)

---

# 🛰️ FASE 3: MÓDULOS SATÉLITE (Semanas 5-6)
## "Features que EXTIENDEN el producto, pero no son el core"

---

## ORDEN DE IMPLEMENTACIÓN DE SATÉLITES

| Prioridad | Módulo | Por qué este orden |
|:---:|:---|:---|
| 1 | **SAT/CFDI** | Sin esto, no hay propuesta de valor para México. Es el diferenciador #1. |
| 2 | **Pagos (Stripe)** | Sin cobrar, no hay negocio. Habilita planes PRO. |
| 3 | **Reportes PDF** | Los contadores lo esperan. Deal-breaker identificado. |
| 4 | **IA Básica** | Chatbot y categorización. Alto valor percibido, bajo esfuerzo. |
| 5 | **Escudo Financiero** | Retención en crisis. Puede esperar al mes 2. |
| 6 | **Gamificación** | Engagement. Nice-to-have, no crítico para MVP. |
| 7 | **Open Banking** | Depende de APIs de terceros. Complejidad alta. |

### 🧠 Por qué SAT primero:
> **Si no cumples con el SAT, tu app es ilegal para negocios mexicanos.**

Un contador NO puede recomendar una app que no emita CFDI válidos. Sin SAT:
- 0% de penetración en mercado PyME formal
- Solo usuarios de finanzas personales (mercado más pequeño)
- Competidores como Contpaqi te ganan automáticamente

### 🧠 Por qué Stripe antes de IA:
> **La IA cuesta dinero (Gemini API). Sin ingresos, no puedes pagar la IA.**

Orden de dependencia financiera:
```
Usuarios Freemium → Algunos upgraden a PRO → Stripe cobra → Ingresos → Pagas Gemini API
```

Si implementas IA primero sin Stripe:
- IA consume tu presupuesto
- No puedes cobrar
- El proyecto muere por falta de fondos

---

## PASO 3.1: INTEGRACIÓN SAT (CFDI)

### ✅ Qué hacer:
1. Implementar descarga masiva de facturas (CIEC/FIEL)
2. Crear parser de XML CFDI 4.0
3. Implementar validación contra listas 69-B
4. Integrar con PAC para timbrado (Facturapi)
5. Crear interfaz de facturación

### 🔗 Prerrequisitos:
- Paso 1.2 (CRUD de transacciones para vincular facturas)
- Paso 2.3 (UI para mostrar facturas)

---

## PASO 3.2: INTEGRACIÓN STRIPE

### ✅ Qué hacer:
1. Configurar cuenta Stripe
2. Implementar Checkout para suscripciones
3. Crear webhooks para eventos de pago
4. Implementar lógica de feature flags por plan
5. Crear página de planes/pricing

### 🔗 Prerrequisitos:
- Paso 1.1 (usuarios autenticados para asociar suscripción)

---

## PASO 3.3: REPORTES Y EXPORTACIÓN

### ✅ Qué hacer:
1. Implementar generación de PDF con @react-pdf/renderer
2. Crear templates de reportes (Estado de resultados, Balance, etc.)
3. Implementar exportación Excel con ExcelJS
4. Crear sistema de reportes programados (BullMQ)
5. Implementar visor in-app con PDF.js

### 🔗 Prerrequisitos:
- Paso 1.3 (lógica de negocio para calcular datos del reporte)

---

## PASO 3.4: INTELIGENCIA ARTIFICIAL

### ✅ Qué hacer:
1. Configurar API de Gemini Pro
2. Implementar categorización automática con ML
3. Crear chatbot de consultas financieras
4. Implementar RAG para consultas fiscales
5. Crear predictor de flujo de caja con Prophet

### 🔗 Prerrequisitos:
- Paso 3.2 (Stripe activo para costear la API)
- Paso 0.3 (pgvector para embeddings)

---

# 🏗️ FASE 4: INFRAESTRUCTURA DE PRODUCCIÓN (Semana 7)
## "Preparar el 'hogar' donde vivirá la aplicación"

---

## PASO 4.1: CONFIGURACIÓN VPS

### ✅ Qué hacer:
1. Aprovisionar VPS en Hostinger (Docker + Ubuntu 24.04)
2. Configurar firewall (UFW)
3. Crear usuario no-root para deploys
4. Instalar Docker y Docker Compose
5. Configurar SSH keys para acceso seguro

### 🧠 Por qué antes de deploy:
> **No puedes desplegar a un servidor que no existe.**

### 🔗 Prerrequisitos:
- Ninguno técnico (pero sí tener cuenta en Hostinger)

---

## PASO 4.2: CI/CD PIPELINE

### ✅ Qué hacer:
1. Configurar GitHub Actions para tests automáticos
2. Crear workflow de deploy a VPS vía SSH
3. Implementar blue-green deployment
4. Configurar secrets en GitHub
5. Crear rollback automatizado

### 🧠 Por qué ahora:
> **Sin CI/CD, cada deploy es manual y propenso a errores humanos.**

Deploy manual:
```
1. SSH al servidor
2. git pull
3. docker compose build
4. docker compose up -d
5. Rezar que funcione
6. Si falla, debug en producción 💀
```

Deploy con CI/CD:
```
1. git push main
2. (todo automático)
3. Si falla, rollback automático
4. Notificación de éxito/fallo en Slack
```

### 🔗 Prerrequisitos:
- Paso 4.1 (servidor disponible para recibir deploys)

---

## PASO 4.3: MONITOREO Y ALERTAS

### ✅ Qué hacer:
1. Desplegar Prometheus + Grafana
2. Configurar Sentry para error tracking
3. Crear dashboards de métricas críticas
4. Configurar alertas (email/Slack)
5. Implementar health checks

### 🧠 Por qué antes del lanzamiento:
> **Si no puedes VER los problemas, no puedes SOLUCIONARLOS.**

Sin monitoreo:
- El servidor se cae a las 3am → te enteras a las 9am por quejas de usuarios
- La base de datos se llena → todo crashea sin aviso
- Un endpoint tarda 5 segundos → no sabes cuál

Con monitoreo:
- Alerta a las 3:01am: "CPU al 95%" → actúas antes del crash
- Alerta: "Disco al 80%" → limpias antes de que se llene
- Dashboard: "GET /transactions: 4.2s" → optimizas ese endpoint

### 🔗 Prerrequisitos:
- Paso 4.1 (servidor donde desplegar herramientas)

---

## PASO 4.4: BACKUPS Y RECUPERACIÓN

### ✅ Qué hacer:
1. Configurar pg_dump automatizado (cron)
2. Configurar rclone para subir a almacenamiento externo
3. Probar restauración de backup
4. Documentar proceso de disaster recovery
5. Configurar retención de 30 días

### 🧠 Por qué es CRÍTICO:
> **Sin backups, un error de disco = perder TODOS los datos de los usuarios.**

Escenario sin backup:
```
Día 1: Disco del VPS falla
Día 1: 500 usuarios pierden TODAS sus transacciones
Día 2: Demandas legales
Día 3: Empresa cierra
```

Escenario con backup:
```
Día 1: Disco falla
Día 1: Restauras backup de hace 1 hora
Día 1: Usuarios pierden máximo 1 hora de datos
Día 1: Continúas operando
```

### 🔗 Prerrequisitos:
- Paso 4.1 (PostgreSQL corriendo en servidor)

---

# 🚀 FASE 5: LANZAMIENTO (Semana 8)
## "El momento de la verdad"

---

## PASO 5.1: TESTING FINAL

### ✅ Qué hacer:
1. Ejecutar suite completa de tests E2E
2. Hacer penetration testing básico (ZAP)
3. Verificar Lighthouse score >90
4. Probar todos los flujos manualmente
5. Verificar responsive en móvil real

### 🧠 Por qué ahora:
> **El último control de calidad antes de exponer el producto al mundo.**

---

## PASO 5.2: BETA PRIVADA

### ✅ Qué hacer:
1. Invitar 10-20 usuarios de confianza
2. Recopilar feedback estructurado
3. Priorizar bugs críticos encontrados
4. Iterar rápidamente (hotfixes)
5. Medir NPS (Net Promoter Score)

### 🧠 Por qué beta privada antes de pública:
> **Mejor que 20 amigos encuentren bugs, que 2,000 desconocidos los publiquen en Twitter.**

---

## PASO 5.3: DOCUMENTACIÓN Y SOPORTE

### ✅ Qué hacer:
1. Crear base de conocimiento (Docusaurus)
2. Escribir 10 artículos de ayuda más frecuentes
3. Configurar Chatwoot para soporte en vivo
4. Crear video de onboarding
5. Preparar FAQs

### 🔗 Prerrequisitos:
- Paso 5.2 (preguntas frecuentes de beta testers)

---

## PASO 5.4: GO-LIVE 🎉

### ✅ Qué hacer:
1. Quitar banner de "Beta"
2. Activar registro público
3. Publicar en redes sociales
4. Configurar analytics (Plausible)
5. Preparar plan de respuesta a incidentes

---

# 🔄 RESUMEN: DEPENDENCIAS CRÍTICAS

```
Ambiente → Base de Datos → Auth → CRUD → Lógica → Tests Backend
                                                          │
                                                          ▼
Design System → Componentes → Páginas → Flujos → Tests E2E
                                                     │
                                                     ▼
         SAT → Stripe → Reportes → IA → Gamificación
                           │
                           ▼
          VPS → CI/CD → Monitoreo → Backups
                           │
                           ▼
         Testing Final → Beta → Docs → GO-LIVE
```

---

# 📊 CONTEO ACTUALIZADO DE CARACTERÍSTICAS

| Módulo | Anterior | Nuevo | Delta |
|:---|:---:|:---:|:---:|
| 01_CORE_FINANCIERO | 45 | 52 | +7 (CxC, CxP, Cotizaciones) |
| 02_CONTABILIDAD_SAT | 35 | 43 | +8 (Nota Crédito, Pólizas, NIF) |
| 03_INTELIGENCIA_ANALITICA | 36 | 42 | +6 (Escudo Financiero) |
| 04_GAMIFICACION_PSICOLOGIA | 30 | 30 | 0 |
| 05_SEGURIDAD_PRIVACIDAD | 24 | 26 | +2 (Vault, Secrets) |
| 06_EXPERIENCIA_USUARIO | 20 | 28 | +8 (Super App features) |
| 07_INTEGRACIONES | 15 | 22 | +7 (Asia/Europa features) |
| 08_NEGOCIO_MONETIZACION | 12 | 12 | 0 |
| 09_PALANTIR_ENTERPRISE | 11 | 11 | 0 |
| 10_INFRAESTRUCTURA | 5 | 12 | +7 (Estabilidad) |
| 11_CALCULADORAS_PYME_KPIS | - | - | (documentación) |
| 12_KILLER_FEATURES | 45 | 55 | +10 |
| **TOTAL** | **278** | **333** | **+55** |

---

**Documento creado:** 1 Diciembre 2025  
**Próxima revisión:** Después del Sprint 1

*"Entender el orden es entender el sistema."*
