# 🎯 PLANIFICADOR FINANCIERO UNIVERSAL GRATUITO

> **Versión:** 1.0  
> **Última actualización:** 8 Diciembre 2025  
> **Objetivo:** Módulo obligatorio, gratuito, potente y accesible para TODOS los usuarios.  
> **Filosofía:** Zero Servidor para usuarios gratuitos. 100% offline-first.

---

## 📋 ÍNDICE

1. [Visión y Filosofía](#1-visión-y-filosofía)
2. [Arquitectura Técnica](#2-arquitectura-técnica)
3. [Módulos del Planificador](#3-módulos-del-planificador)
4. [Wallet Mexicano Inteligente](#4-wallet-mexicano-inteligente)
5. [Planificador Quincenal Neuro](#5-planificador-quincenal-neuro)
6. [Control de Deudas Neuro-Persuasivo](#6-control-de-deudas-neuro-persuasivo)
7. [Metas Inteligentes con Scaffolding](#7-metas-inteligentes-con-scaffolding)
8. [Módulo "Tu Dinero Hoy"](#8-módulo-tu-dinero-hoy)
9. [Mapa Financiero Emocional](#9-mapa-financiero-emocional)
10. [Modo Anti-Gasto Impulsivo](#10-modo-anti-gasto-impulsivo)
11. [Exportación y Sincronización](#11-exportación-y-sincronización)
12. [Métricas de Éxito](#12-métricas-de-éxito)

---

## 1. VISIÓN Y FILOSOFÍA

### 1.1 Propuesta de Valor

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   "El planificador financiero más potente de México.                   │
│    Gratis. Para siempre. Sin excusas."                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Principios Fundacionales

|  #  | Principio                  | Descripción                                    |
| :-: | :------------------------- | :--------------------------------------------- |
|  1  | **Gratuito real**          | No hay "trial", no hay "límites que frustren"  |
|  2  | **Offline-first**          | Funciona sin internet, sincroniza cuando hay   |
|  3  | **Sin cuenta obligatoria** | Usar desde día 1 sin registro                  |
|  4  | **Datos del usuario**      | Guardados localmente, exportables, eliminables |
|  5  | **Diseño mexicano**        | Quincenas, efectivo, tandas, aguinaldo         |
|  6  | **Neurociencia aplicada**  | Cada elemento reduce fricción y ansiedad       |
|  7  | **Accesible**              | WCAG 2.1 AA, lectura fácil, alto contraste     |

### 1.3 ¿Por Qué Gratis?

**Modelo de Negocio:**

```
                    ┌─────────────────────┐
                    │  PLANIFICADOR FREE  │
                    │  (100% funcional)   │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────┴────────────────┐
              │                                  │
              ▼                                  ▼
    ┌─────────────────┐              ┌─────────────────┐
    │  Usuario feliz  │              │  Usuario feliz  │
    │  = Permanece    │              │  = Recomienda   │
    └────────┬────────┘              └────────┬────────┘
             │                                 │
             ▼                                 ▼
    ┌─────────────────┐              ┌─────────────────┐
    │  Necesita más   │              │  Virality loop  │
    │  → Upgrade PRO  │              │  → Más usuarios │
    └─────────────────┘              └─────────────────┘
```

**Upsell natural (no forzado):**

- ✅ Planificador funciona perfecto gratis
- 💫 PRO: Sincronización multi-dispositivo
- 💫 PRO: IA Coach personalizado
- 💫 PRO: Conexión bancaria automática
- 💫 PRO: Reportes PDF exportables

---

## 2. ARQUITECTURA TÉCNICA

### 2.1 Stack Tecnológico

| Capa              | Tecnología               | Razón                        |
| :---------------- | :----------------------- | :--------------------------- |
| **Framework**     | Svelte 5 + SvelteKit     | Rendimiento, tamaño mínimo   |
| **Storage Local** | IndexedDB (via Dexie.js) | Offline, capacidad ilimitada |
| **Sync Opcional** | Redis + PostgreSQL       | Solo si usuario tiene cuenta |
| **PWA**           | Service Worker           | Funciona como app nativa     |
| **Cálculos**      | Web Workers              | No bloquear UI               |

### 2.2 Modelo de Datos Local

```typescript
// Estructura simplificada para IndexedDB
interface LocalFinanceDB {
  // Tablas principales
  transactions: Transaction[];
  categories: Category[];
  budgets: Budget[];
  goals: Goal[];
  debts: Debt[];

  // Metadata
  settings: UserSettings;
  analytics: LocalAnalytics;

  // Sincronización
  syncQueue: PendingSync[];
  lastSyncTimestamp: number;
}

interface Transaction {
  id: string; // UUID generado localmente
  amount: number;
  type: "income" | "expense";
  categoryId: string;
  date: string; // ISO 8601
  note?: string;
  isRecurring: boolean;
  recurringPattern?: "daily" | "weekly" | "biweekly" | "monthly";
  paymentMethod: "cash" | "card" | "transfer" | "other";
  emotionalState?: 1 | 2 | 3 | 4 | 5; // Para mapa emocional
  createdAt: string;
  updatedAt: string;
}

interface Goal {
  id: string;
  name: string;
  emoji: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  savingsFrequency: "daily" | "weekly" | "biweekly" | "monthly";
  savingsAmount: number;
  status: "active" | "completed" | "paused";
  celebrationShown: boolean;
}
```

### 2.3 Tamaño y Performance

| Métrica              |   Target    | Razón                   |
| :------------------- | :---------: | :---------------------- |
| **Bundle Size**      | <100KB gzip | Cargar rápido en 3G     |
| **First Paint**      |    <1.5s    | Percepción de velocidad |
| **TTI**              |     <3s     | Interactividad rápida   |
| **Lighthouse Score** |     >90     | SEO + UX                |
| **Offline Ready**    |    100%     | Funcionar sin internet  |

---

## 3. MÓDULOS DEL PLANIFICADOR

### 3.1 Vista General

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PLANIFICADOR FINANCIERO                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │   WALLET    │  │ PLANIFICADOR│  │   DEUDAS    │  │   METAS     │   │
│  │  MEXICANO   │  │  QUINCENAL  │  │   NEURO     │  │INTELIGENTES │   │
│  │             │  │             │  │             │  │             │   │
│  │  💵 $4,250  │  │  📊 Día 8   │  │  🎯 67%     │  │  🏖️ 45%     │   │
│  │  Disponible │  │  de 15      │  │  Libertad   │  │  Vacaciones │   │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘   │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                     │
│  │  TU DINERO  │  │    MAPA     │  │    MODO     │                     │
│  │    HOY      │  │  EMOCIONAL  │  │ ANTI-GASTO  │                     │
│  │             │  │             │  │             │                     │
│  │  🎯 $320    │  │  😊 → 💸    │  │  🛡️ Activo  │                     │
│  │  Para gastar│  │  Correlación│  │  3 salvados │                     │
│  └─────────────┘  └─────────────┘  └─────────────┘                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Módulos Gratuitos vs PRO

| Módulo                      |    GRATIS     |           PRO            |
| :-------------------------- | :-----------: | :----------------------: |
| Wallet Mexicano Inteligente |  ✅ Completo  |    ✅ + OCR ilimitado    |
| Planificador Quincenal      |  ✅ Completo  |   ✅ + Predicciones IA   |
| Control de Deudas           |  ✅ 3 deudas  |      ✅ Ilimitadas       |
| Metas Inteligentes          |  ✅ 3 metas   |      ✅ Ilimitadas       |
| Tu Dinero Hoy               |  ✅ Completo  |    ✅ + Proyecciones     |
| Mapa Emocional              |  ✅ 30 días   |  ✅ Histórico completo   |
| Modo Anti-Gasto             |  ✅ Completo  |     ✅ + Patrones IA     |
| Exportar datos              |    ✅ CSV     | ✅ + PDF + Google Sheets |
| Sincronización              | ❌ Local only |   ✅ Multi-dispositivo   |

---

## 4. WALLET MEXICANO INTELIGENTE

### 4.1 Problema que Resuelve

> "¿A dónde se fue mi dinero?"  
> "Gasto mucho en efectivo y no sé cuánto."  
> "Las apps gringas no entienden propinas, taquitos, uber."

### 4.2 Características

#### 4.2.1 Registro Ultra-Rápido

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         REGISTRO RÁPIDO                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   💵 ¿Cuánto gastaste?                                                 │
│                                                                         │
│   ┌───────────────────────────────────────────┐                        │
│   │             $ 185                         │                        │
│   └───────────────────────────────────────────┘                        │
│                                                                         │
│   🏷️ ¿En qué?  (IA sugiere basado en hora/monto)                       │
│                                                                         │
│   [🍔 Comida]  [🚗 Uber]  [☕ Café]  [🛒 Super]  [•••]                  │
│                                                                         │
│   💳 ¿Cómo pagaste?                                                     │
│                                                                         │
│   [💵 Efectivo]  [💳 Tarjeta]  [📱 Transferencia]                       │
│                                                                         │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                    [GUARDAR] ✨                                 │   │
│   └────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│   ⏱️ Tiempo estimado: 5 segundos                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

#### 4.2.2 Categorías Mexicanas Pre-configuradas

| Categoría           | Emoji | Subcategorías Mexicanas                              |
| :------------------ | :---: | :--------------------------------------------------- |
| **Comida**          |  🍔   | Tacos, comida corrida, antojitos, restaurante, café  |
| **Transporte**      |  🚗   | Uber/Didi, Metro/Metrobús, Gasolina, Estacionamiento |
| **Casa**            |  🏠   | Renta, Luz (CFE), Agua, Gas, Internet, Predial       |
| **Compras**         |  🛒   | Super, OXXO, Farmacia, Ropa, Amazon/ML               |
| **Entretenimiento** |  🎬   | Netflix/Spotify, Salidas, Conciertos, Viajes         |
| **Salud**           |  💊   | Doctor, Medicinas, Gym, IMSS/ISSSTE                  |
| **Educación**       |  📚   | Colegiaturas, Cursos, Libros, Materiales             |
| **Trabajo**         |  💼   | Comidas trabajo, Papelería, Coworking                |
| **Otros**           |  ✨   | Regalos, Mascotas, Propinas, Tandas                  |

#### 4.2.3 Detección Inteligente

```typescript
// Lógica de sugerencia de categoría
function suggestCategory(amount: number, time: Date): Category {
  const hour = time.getHours();

  // Patrones mexicanos
  if (hour >= 7 && hour <= 9 && amount < 100) {
    return "desayuno"; // Torta, tamal, café
  }
  if (hour >= 13 && hour <= 15 && amount >= 80 && amount <= 200) {
    return "comida_corrida"; // Almuerzo típico
  }
  if (hour >= 20 && hour <= 23 && amount >= 100 && amount <= 300) {
    return "cena_salida"; // Tacos, cena fuera
  }
  if (amount === 25 || amount === 30) {
    return "transporte_metro"; // Precio del metro
  }
  if (
    amount >= 80 &&
    amount <= 250 &&
    ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 20))
  ) {
    return "uber_didi"; // Horario rush
  }

  return "otros";
}
```

#### 4.2.4 OCR para Tickets (Básico Gratis)

- 📷 Tomar foto del ticket
- 🤖 Extraer monto automáticamente
- 🏷️ Sugerir categoría por comercio
- 📅 Detectar fecha del ticket

**Límite Gratis:** 10 scans/mes (suficiente para tickets importantes)  
**PRO:** Ilimitado

---

## 5. PLANIFICADOR QUINCENAL NEURO

### 5.1 Problema que Resuelve

> "Siempre llego a la quincena sin dinero."  
> "No sé cuánto gastar cada día."  
> "Me estreso viendo números rojos."

### 5.2 Vista Principal

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PLANIFICADOR QUINCENAL                               │
│                    Quincena: 1-15 Diciembre 2025                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   💰 Tu quincena: $12,500                                              │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │ ████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │
│   │                     53% restante                                │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   📊 Distribución                                                       │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ 🏠 Fijos (renta, servicios)     $5,500   ████████████░░░░     │    │
│   │ 🍔 Comida                        $2,000   █████░░░░░░░░░░░     │    │
│   │ 🚗 Transporte                    $1,500   ████░░░░░░░░░░░░     │    │
│   │ 💰 Ahorro                        $1,500   ████░░░░░░░░░░░░     │    │
│   │ ✨ Libre                         $2,000   █████░░░░░░░░░░░     │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   📅 Hoy es día 8 de 15                                                │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │  🎯 Puedes gastar hoy: $285                                   │    │
│   │                                                                │    │
│   │  Esto te deja $1,995 para los próximos 7 días                 │    │
│   │  Promedio diario restante: $285                                │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   ✅ Vas muy bien. Si sigues así, sobran $200 esta quincena.           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Neuro-Features

| Feature         | Principio Neuro  | Implementación                    |
| :-------------- | :--------------- | :-------------------------------- |
| **Sin rojo**    | Reducir cortisol | Solo verde/amarillo, nunca rojo   |
| **Día a día**   | Chunk pequeño    | "Puedes gastar $285 HOY"          |
| **Celebración** | Dopamina         | "+$200 de sobra esta quincena 🎉" |
| **Proyección**  | Anticipación     | "Si sigues así..." positivo       |
| **Comparación** | Progreso         | "Vs quincena pasada: +15% ahorro" |

### 5.4 Modo Anti-Estrés

Cuando el usuario está en "zona amarilla" (gastó más de lo planeado):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🧘 MODO TRANQUILIDAD                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Gastaste un poco más de lo planeado, pero está bien.                 │
│                                                                         │
│   Opciones para equilibrar:                                             │
│                                                                         │
│   [ ] Reducir $30/día los próximos 5 días                              │
│   [ ] Posponer un gasto no urgente                                      │
│   [ ] Usar tu colchón de emergencia ($500 disponibles)                 │
│                                                                         │
│   💚 Recuerda: No es perfecto, es progreso.                            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 6. CONTROL DE DEUDAS NEURO-PERSUASIVO

### 6.1 Problema que Resuelve

> "Ver mis deudas me deprime."  
> "No sé por dónde empezar a pagar."  
> "Siento que nunca voy a salir de esto."

### 6.2 Reframe: Inversión en Libertad

**Tradicional vs Neuro:**

| Tradicional             | Neuro-Optimizado                             |
| :---------------------- | :------------------------------------------- |
| "Deudas: $45,000"       | "Tu camino a la libertad: 67% completado"    |
| "Te faltan $15,000"     | "Solo $15,000 más para ser libre"            |
| "Llevas 18 meses de 36" | "¡Ya pasaste la mitad! 🎉"                   |
| "Intereses: $5,000"     | "Cada pago te acerca a ahorrar en intereses" |

### 6.3 Vista Principal

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    🎯 TU CAMINO A LA LIBERTAD                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                                                                  │  │
│   │                    🏔️                                           │  │
│   │                   /  \                                          │  │
│   │                  /    \  ← 💪 Estás aquí (67%)                 │  │
│   │                 /      \                                        │  │
│   │                /        \                                       │  │
│   │               /══════════\  ← Inicio                           │  │
│   │                                                                  │  │
│   │   "Cada peso pagado es un paso hacia la cima"                   │  │
│   │                                                                  │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   📋 Tus deudas:                                                        │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ 💳 Tarjeta BBVA          $8,000 restante                      │    │
│   │    ████████████████░░░░  80% completado                       │    │
│   │    Próximo pago: $1,200 (15 dic)                              │    │
│   │    [Pagar ahora] [Ver detalles]                               │    │
│   ├───────────────────────────────────────────────────────────────┤    │
│   │ 🚗 Crédito Auto          $45,000 restante                     │    │
│   │    ████████░░░░░░░░░░░░  40% completado                       │    │
│   │    Próximo pago: $3,500 (20 dic)                              │    │
│   │    [Pagar ahora] [Ver detalles]                               │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   🎯 Estrategia activa: Avalancha (mayor interés primero)              │
│      [Cambiar estrategia]                                               │
│                                                                         │
│   📅 Fecha estimada de libertad: Marzo 2027                            │
│      (¡Solo 15 meses más! 🚀)                                          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 6.4 Estrategias de Pago

| Estrategia        | Descripción                   | Mejor Para                   |
| :---------------- | :---------------------------- | :--------------------------- |
| **Avalancha**     | Mayor tasa de interés primero | Ahorrar más en intereses     |
| **Bola de Nieve** | Menor saldo primero           | Victorias rápidas (dopamina) |
| **Híbrida**       | Mezcla de ambas               | Balance motivación/ahorro    |

### 6.5 Celebraciones de Deuda

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         🎉🎉🎉🎉🎉                                      │
│                                                                         │
│              ¡PAGASTE TU TARJETA BBVA!                                 │
│                                                                         │
│              $40,000 de deuda = ELIMINADA                              │
│                                                                         │
│              Ahorraste $8,500 en intereses                             │
│              al pagar antes de tiempo.                                  │
│                                                                         │
│              🏆 Badge desbloqueado: "Liberador"                        │
│              +500 XP                                                    │
│                                                                         │
│              [Compartir mi logro] [Siguiente deuda →]                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. METAS INTELIGENTES CON SCAFFOLDING

### 7.1 Problema que Resuelve

> "Mis metas siempre fallan porque son muy grandes."  
> "Me aburro a mitad del camino."  
> "No veo progreso."

### 7.2 Sistema de Scaffolding (Andamiaje)

**Progresión de dificultad:**

| Nivel | Duración Meta |  Monto Típico  | Ejemplo                     |
| :---: | :-----------: | :------------: | :-------------------------- |
|  1️⃣   |    7 días     |    $100-500    | "Ahorra para unos tacos"    |
|  2️⃣   |    14 días    |   $500-1,500   | "Ahorra para un regalo"     |
|  3️⃣   |    30 días    |  $1,000-3,000  | "Ahorra para algo especial" |
|  4️⃣   |    90 días    | $3,000-10,000  | "Ahorra para tecnología"    |
|  5️⃣   |    6 meses    | $10,000-30,000 | "Ahorra para vacaciones"    |
|  6️⃣   |   12 meses    |    $30,000+    | "Ahorra para auto/casa"     |

### 7.3 Flujo de Creación de Meta

```
Paso 1: Emoción
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ¿Para qué quieres ahorrar?                                           │
│                                                                         │
│   🏖️ Vacaciones    🚗 Auto/Moto      🏠 Casa                           │
│   💻 Tecnología    🎓 Educación      🚨 Emergencias                     │
│   🎁 Regalo        👔 Ropa           ✨ Otro...                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Paso 2: Visualización
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   🏖️ Vacaciones                                                        │
│                                                                         │
│   [Imagen bonita de playa]                                              │
│                                                                         │
│   Cierra los ojos un momento...                                        │
│   Imagínate ahí, sin preocupaciones, disfrutando.                      │
│                                                                         │
│   ¿Cuánto necesitas para hacerlo realidad?                             │
│                                                                         │
│   $[_15,000___] MXN                                                     │
│                                                                         │
│   💡 El promedio para vacaciones en México es $12,000-$20,000          │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Paso 3: Micro-Compromiso
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   Para lograr $15,000...                                               │
│                                                                         │
│   ¿Cuánto puedes guardar cada quincena?                                │
│   (Sé realista, esto es un compromiso contigo mismo)                   │
│                                                                         │
│   [ $500 ]  [ $1,000 ]  [ $1,500 ]  [Escribir otro]                    │
│                                                                         │
│   ────────────────────────────────────────────────────                  │
│                                                                         │
│   📅 Con $1,000/quincena:                                              │
│      Lo logras en 7.5 meses (Julio 2026)                               │
│      ¡Justo para vacaciones de verano! ☀️                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Paso 4: Compromiso Público (Opcional)
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ¿Quieres hacer un compromiso público?                                │
│   (Aumenta 3x la probabilidad de éxito)                                │
│                                                                         │
│   [ ] Compartir con mi pareja                                          │
│   [ ] Compartir en la comunidad (anónimo)                              │
│   [ ] Recordármelo cada semana                                          │
│   [ ] No, prefiero mantenerlo privado                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 7.4 Vista de Progreso de Meta

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    🏖️ VACACIONES CANCÚN                                │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                                                                  │  │
│   │   $6,750 de $15,000                                             │  │
│   │                                                                  │  │
│   │   ████████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │  │
│   │                           45%                                   │  │
│   │                                                                  │  │
│   │   🔥 Racha: 12 quincenas consecutivas ahorrando                │  │
│   │                                                                  │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   📊 Tu progreso:                                                       │
│   ├── Quincena 1:  $1,000 ✅                                           │
│   ├── Quincena 2:  $1,000 ✅                                           │
│   ├── Quincena 3:  $1,250 ✅ (+$250 bonus)                             │
│   ├── Quincena 4:  $1,000 ✅                                           │
│   ├── Quincena 5:  $1,000 ✅                                           │
│   └── Quincena 6:  $1,500 ✅ (+$500 aguinaldo)                         │
│                                                                         │
│   🎯 Siguiente aporte: $1,000 (15 diciembre)                           │
│                                                                         │
│   📅 Fecha estimada: Julio 2026 (¡2 meses antes de lo planeado!)       │
│                                                                         │
│   [💰 Abonar ahora]  [📝 Ajustar meta]  [⏸️ Pausar]                    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 8. MÓDULO "TU DINERO HOY"

### 8.1 Problema que Resuelve

> "¿Cuánto tengo realmente para gastar hoy?"  
> "Tengo dinero pero no sé si puedo usarlo."  
> "Siempre me confundo con lo que ya comprometí."

### 8.2 Algoritmo

```typescript
function calculateMoneyToday(user: User): TodayMoney {
  const today = new Date();
  const daysUntilPayday = calculateDaysUntilPayday(today, user.paydayPattern);

  // 1. Dinero total disponible
  const totalBalance = user.accounts.reduce((sum, acc) => sum + acc.balance, 0);

  // 2. Restar compromisos fijos pendientes
  const pendingFixed = user.fixedExpenses
    .filter((exp) => exp.dueDate >= today && exp.dueDate <= user.nextPayday)
    .reduce((sum, exp) => sum + exp.amount, 0);

  // 3. Restar ahorro comprometido
  const pendingSavings = user.goals
    .filter((goal) => goal.status === "active")
    .reduce((sum, goal) => sum + goal.nextContribution, 0);

  // 4. Restar deudas pendientes
  const pendingDebts = user.debts
    .filter((debt) => debt.nextPaymentDate <= user.nextPayday)
    .reduce((sum, debt) => sum + debt.nextPayment, 0);

  // 5. Calcular disponible real
  const realAvailable =
    totalBalance - pendingFixed - pendingSavings - pendingDebts;

  // 6. Dividir entre días restantes
  const dailyBudget = realAvailable / daysUntilPayday;

  // 7. Restar lo gastado hoy
  const spentToday = user.transactions
    .filter((t) => isToday(t.date) && t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const availableToday = dailyBudget - spentToday;

  return {
    totalBalance,
    committed: pendingFixed + pendingSavings + pendingDebts,
    realAvailable,
    dailyBudget,
    spentToday,
    availableToday,
    daysUntilPayday,
  };
}
```

### 8.3 Vista Principal

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        💰 TU DINERO HOY                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                                                                  │  │
│   │                         $320                                    │  │
│   │                    PUEDES GASTAR HOY                            │  │
│   │                                                                  │  │
│   │                    sin afectar nada más                         │  │
│   │                                                                  │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│   📊 Desglose:                                                          │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ 💵 En tu cuenta                    $8,500                     │    │
│   │ ➖ Renta (vence 1 dic)              -$4,500                    │    │
│   │ ➖ Luz (vence 5 dic)                -$890                      │    │
│   │ ➖ Ahorro vacaciones                -$1,000                    │    │
│   │ ➖ Pago tarjeta                     -$1,200                    │    │
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │    │
│   │ 💚 Disponible real                  $910                      │    │
│   │ ÷ 7 días hasta quincena            ÷7                         │    │
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │    │
│   │ 🎯 Presupuesto diario               $130                      │    │
│   │ ➖ Ya gastaste hoy (tacos)          -$85                       │    │
│   │ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │    │
│   │ 💚 PUEDES GASTAR AHORA              $320                      │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   💡 Si no gastas los $320, mañana tienes $450 disponibles            │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 9. MAPA FINANCIERO EMOCIONAL

### 9.1 Problema que Resuelve

> "Gasto más cuando estoy triste/estresado."  
> "No entiendo por qué a veces me descontrolo."  
> "No relaciono mis emociones con mi dinero."

### 9.2 Captura de Estado Emocional

Después de cada gasto importante (>$500 o categoría "impulsivo"):

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   ¿Cómo te sentías cuando hiciste esta compra?                         │
│                                                                         │
│   😢        😕        😐        🙂        😄                           │
│   Mal      Regular   Neutral   Bien      Genial                        │
│                                                                         │
│   [Saltar]                                                              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 9.3 Visualización del Mapa

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    🗺️ TU MAPA FINANCIERO EMOCIONAL                     │
│                    Últimos 30 días                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   😄 Genial   ●           ●                           ●                 │
│   🙂 Bien     ●  ●  ●  ●     ●  ●  ●              ●  ●  ●  ●           │
│   😐 Neutral     ●  ●        ●           ●  ●  ●        ●              │
│   😕 Regular        ●              ●  ●                                 │
│   😢 Mal                              ●                                 │
│              ─────────────────────────────────────────────              │
│              1     5     10    15    20    25    30                     │
│                         Días del mes                                    │
│                                                                         │
│   📊 Insights:                                                          │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ • Cuando te sientes 😕 Regular, gastas 40% más en comida     │    │
│   │ • Tus mejores días para ahorrar: Lunes y Martes              │    │
│   │ • Patrón detectado: Compras impulsivas los viernes 🍻        │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   💡 Sugerencia:                                                        │
│   "Los viernes activa el Modo Anti-Gasto antes de salir"               │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 10. MODO ANTI-GASTO IMPULSIVO

### 10.1 Problema que Resuelve

> "Siempre me arrepiento de compras grandes."  
> "Compro por impulso y luego no me alcanza."  
> "No pienso antes de gastar."

### 10.2 Triggers de Activación

| Trigger              | Condición                         | Acción                            |
| :------------------- | :-------------------------------- | :-------------------------------- |
| **Monto alto**       | Gasto > promedio × 3              | Pausa obligatoria                 |
| **Categoría riesgo** | Compras, entretenimiento nocturno | Pregunta de reflexión             |
| **Hora sospechosa**  | 23:00 - 03:00                     | "¿Seguro que no es mejor mañana?" |
| **Estado emocional** | Marcó 😢 o 😕 recientemente       | Alerta empática                   |
| **Fin de quincena**  | <3 días para cobrar, saldo bajo   | Friction extra                    |

### 10.3 Pantalla de Pausa

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        ⏸️ PAUSA DE REFLEXIÓN                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Este gasto ($2,500) es mayor a tu promedio.                          │
│                                                                         │
│   ⏱️ Tómate 15 segundos para pensar...                                 │
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │                                                                │    │
│   │   ¿Este gasto te acerca o te aleja                            │    │
│   │   de tu meta "Vacaciones Cancún"?                             │    │
│   │                                                                │    │
│   │   💡 $2,500 = 2.5 quincenas de ahorro para tu meta            │    │
│   │                                                                │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│                         12... 11... 10...                               │
│                                                                         │
│   ┌────────────────────┐   ┌────────────────────────────────┐          │
│   │ ⬅️ Mejor lo pienso │   │ ✅ Sí, lo necesito realmente   │          │
│   └────────────────────┘   └────────────────────────────────┘          │
│                                                                         │
│   📊 Stats: Este mes evitaste 3 compras impulsivas = $4,200 ahorrados  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 10.4 Historial de "Salvadas"

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    🛡️ GASTOS QUE EVITASTE                               │
│                    Este mes: $8,700 salvados                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌───────────────────────────────────────────────────────────────┐    │
│   │ 🛍️ Ropa (impulso)           $2,500   12 dic   ✅ Evitado      │    │
│   │ 🎮 Videojuego               $1,200   8 dic    ✅ Evitado      │    │
│   │ 🍕 Uber Eats (antojo)       $450    5 dic    ✅ Evitado      │    │
│   │ 👟 Tenis                    $3,500   2 dic    ✅ Evitado      │    │
│   │ ☕ Starbucks diario         $150    varios   ✅ Evitado      │    │
│   └───────────────────────────────────────────────────────────────┘    │
│                                                                         │
│   💰 Total salvado este mes: $8,700                                    │
│   🎯 Equivale a: 87% de tu meta de vacaciones                          │
│                                                                         │
│   🏆 Badge desbloqueado: "Guardián del Wallet"                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 11. EXPORTACIÓN Y SINCRONIZACIÓN

### 11.1 Exportar Datos (Gratis)

| Formato           | Disponibilidad | Contenido                         |
| :---------------- | :------------: | :-------------------------------- |
| **CSV**           |   ✅ GRATIS    | Transacciones, categorías, fechas |
| **JSON**          |   ✅ GRATIS    | Backup completo (portable)        |
| **PDF**           |     💎 PRO     | Reportes visuales                 |
| **Google Sheets** |     💎 PRO     | Sync bidireccional                |

### 11.2 Sincronización Multi-Dispositivo (PRO)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    ☁️ SINCRONIZACIÓN (PRO)                              │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   📱 Tu celular                                                         │
│      ↕️ Sincronizado hace 5 min                                         │
│   💻 Tu laptop                                                          │
│      ↕️ Sincronizado hace 2 horas                                       │
│   🖥️ Tu trabajo                                                         │
│      ↕️ Sincronizado hace 1 día                                         │
│                                                                         │
│   [Sincronizar ahora]                                                   │
│                                                                         │
│   ⚙️ Configuración:                                                     │
│   [ ] Sincronizar automáticamente (con WiFi)                           │
│   [✓] Sincronizar solo manual                                          │
│   [ ] Encriptar datos en la nube                                       │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 12. MÉTRICAS DE ÉXITO

### 12.1 KPIs del Planificador

| Métrica                  | Target Mes 1 | Target Mes 6 | Target Año 1 |
| :----------------------- | :----------: | :----------: | :----------: |
| **Usuarios registrados** |    5,000     |    50,000    |   200,000    |
| **DAU/MAU**              |     20%      |     35%      |     45%      |
| **Retención D7**         |     40%      |     55%      |     65%      |
| **Retención D30**        |     25%      |     40%      |     50%      |
| **Conversión a PRO**     |      2%      |      5%      |      8%      |
| **NPS**                  |      30      |      50      |      60      |

### 12.2 Métricas de Impacto

| Métrica                        | Cómo Medir                    |       Target       |
| :----------------------------- | :---------------------------- | :----------------: |
| **Gastos registrados/usuario** | Promedio semanal              |        15+         |
| **Metas creadas**              | % usuarios con 1+ meta        |        60%         |
| **Metas completadas**          | % metas terminadas vs creadas |        40%         |
| **Gastos evitados**            | Suma de "salvadas"            | $1,000/usuario/mes |
| **Tiempo en app**              | Sesión promedio               |     4+ minutos     |

---

## 🚀 ROADMAP DE IMPLEMENTACIÓN

### Fase 1: MVP (4 semanas)

- [ ] Wallet Mexicano (registro básico)
- [ ] Planificador Quincenal
- [ ] Tu Dinero Hoy
- [ ] Storage local (IndexedDB)

### Fase 2: Core Completo (8 semanas)

- [ ] Metas Inteligentes
- [ ] Control de Deudas
- [ ] Modo Anti-Gasto
- [ ] Gamificación básica

### Fase 3: Premium (12 semanas)

- [ ] Mapa Emocional
- [ ] OCR para tickets
- [ ] Sincronización cloud
- [ ] Exportación avanzada

### Fase 4: IA (16 semanas)

- [ ] Predicciones de gasto
- [ ] Coach financiero
- [ ] Patrones de comportamiento
- [ ] Sugerencias personalizadas

---

_Documento vivo - Actualizar conforme se implementa_
