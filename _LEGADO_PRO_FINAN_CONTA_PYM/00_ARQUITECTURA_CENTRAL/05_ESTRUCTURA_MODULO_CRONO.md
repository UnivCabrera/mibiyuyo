# 🏗️ ESTRUCTURA DEL MÓDULO CRONO-FINANZAS

> Definición de la arquitectura de carpetas y tipos para la implementación del módulo "Crono-Finanzas" (Time-Money Fusion), respetando la Arquitectura Hexagonal del proyecto.

---

## 1. UBICACIÓN EN EL ÁRBOL DE DIRECTORIOS

El módulo se integrará como un **Bounded Context** autónomo, tanto en el Backend (Elysia) como en el Frontend (SvelteKit).

### 1.1 Backend (ElysiaJS + Drizzle)

```bash
src/
└── modules/
    └── crono/                 # 📦 Módulo Crono-Finanzas
        ├── domain/            # 🧠 Lógica Pura (Sin dependencias externas)
        │   ├── entities/
        │   │   ├── TimeTransaction.ts
        │   │   └── UserTimeProfile.ts
        │   ├── value-objects/
        │   │   ├── LifeCurrency.ts
        │   │   └── FrictionFactor.ts
        │   ├── ports/         # Interfaces (Repository & Service Ports)
        │   │   ├── ITimeRepository.ts
        │   │   └── INotificationDispatcher.ts
        │   └── services/      # Domain Services (Lógica de conversión pura)
        │       └── TimeConversionService.ts
        │
        ├── application/       # 🤝 Casos de Uso (Orquestación)
        │   ├── use-cases/
        │   │   ├── CalculateRealWage.ts
        │   │   └── ProcessTransactionImpact.ts
        │   └── dtos/
        │       └── CreateTimeProfileDTO.ts
        │
        └── infrastructure/    # 🔌 Adaptadores (DB, HTTP, Redis)
            ├── persistence/
            │   ├── drizzle/
            │   │   ├── schema.ts       # Tablas time_transactions, user_time_profile
            │   │   └── DrizzleTimeRepository.ts
            │   └── redis/
            │       └── CortisolRateLimiter.ts
            └── http/
                └── crono.routes.ts     # Controladores Elysia
```

### 1.2 Frontend (SvelteKit + Svelte 5)

```bash
src/lib/
└── modules/
    └── crono/                 # 🎨 UI & Estado del Módulo Crono
        ├── stores/
        │   └── reality.svelte.ts  # ⚡ Global Store (Runes) para Toggle
        ├── components/
        │   ├── dashboard/
        │   │   ├── RealityToggle.svelte
        │   │   └── LifeImpactCard.svelte
        │   └── visuals/
        │       └── FutureSelfComparator.svelte
        └── utils/
            └── time-formatter.ts  # "12.5h" -> "1 día y 4 horas"
```

---

## 2. DEFINICIÓN DE INTERFACES (DOMAIN LAYER)

Estas interfaces definen el contrato del núcleo del sistema. No dependen de frameworks ni bases de datos.

### 2.1 Configuración de Divisa de Vida (`LifeCurrencyConfig`)

Define los parámetros necesarios para calcular cuánto vale realmente el tiempo de un usuario.

```typescript
/**
 * Configuración vital del usuario para la conversión Dinero <-> Tiempo.
 * Ubicación: src/modules/crono/domain/value-objects/LifeCurrencyConfig.ts
 */
export interface LifeCurrencyConfig {
  // Ingresos y Deducciones
  monthlyNominalIncome: number;    // Salario bruto
  monthlyDeductions: number;       // Impuestos, retenciones

  // Costos Ocultos (Shadow Costs)
  monthlyFixedCosts: number;       // Renta, comida básica (costo de existir)
  monthlyWorkRelatedCosts: number; // Transporte, ropa de trabajo, comidas fuera

  // Tiempo
  contractHours: number;           // Horas contratadas al mes (ej. 160)
  commuteHoursDaily: number;       // Tiempo de traslado diario
  groomingHoursDaily: number;      // Tiempo de preparación diario

  // Factores Psicológicos
  stressFactor: number;            // 1.0 (Zen) a 3.0 (Burnout inminente)

  /**
   * Calcula el salario real por hora descontando fricción y costos.
   */
  calculateRealHourlyWage(): number;
}
```

### 2.2 Impacto Temporal (`TimeImpact`)

El resultado de convertir una transacción monetaria a su impacto en vida.

```typescript
/**
 * Representación del impacto de un gasto en la línea de vida del usuario.
 * Ubicación: src/modules/crono/domain/value-objects/TimeImpact.ts
 */

export type ImpactCategory =
  | 'ADDS_LIFE'       // 🟡 Inversión / Experiencia / Salud
  | 'MAINTAINS_LIFE'  // 🔵 Costo Fijo / Mantenimiento
  | 'DRAINS_LIFE';    // ⚫ Gasto Hormiga / Vicio / Impulso

export interface TimeImpact {
  // Datos Base
  monetaryAmount: number;

  // Conversión
  timeCostHours: number;           // Costo en horas de vida
  timeCostFormatted: string;       // Ej: "2 días y 4 horas"

  // Clasificación Neurológica
  category: ImpactCategory;
  dopamineScore: number;           // 0-100 (Qué tanto placer inmediato da)
  cortisolScore: number;           // 0-100 (Qué tanto estrés futuro genera)

  // Contexto
  percentageOfFreedom: number;     // % del tiempo libre mensual que consume
  recoveryTimeDays: number;        // Días necesarios para recuperar este gasto
}
```

### 2.3 Store de Realidad (Frontend Interface)

La interfaz pública del Store global que manejará el cambio de paradigma en la UI.

```typescript
/**
 * Contrato para el Store Global de Realidad (Svelte 5 Runes).
 * Ubicación: src/lib/modules/crono/stores/reality.types.ts
 */
export type RealityMode = 'MONEY' | 'TIME';

export interface IRealityStore {
  // Estado (Read-only desde fuera, modificable vía acciones)
  readonly mode: RealityMode;
  readonly hourlyWage: number;
  readonly isTransitioning: boolean;

  // Acciones
  toggleMode(): void;
  setHourlyWage(wage: number): void;

  // Utilidades de Formateo Reactivo
  /**
   * Formatea un valor monetario según el modo actual.
   * Si mode='MONEY' -> "$1,500.00"
   * Si mode='TIME'  -> "12.5 hrs"
   */
  format(amount: number): string;

  /**
   * Obtiene el color asociado al impacto según el modo.
   */
  getImpactColor(amount: number, category: string): string;
}
```

---

## 3. SERVICIOS DE DOMINIO (CORE LOGIC)

### 3.1 Servicio de Conversión (`TimeConversionService`)

```typescript
/**
 * Servicio puro de dominio para realizar conversiones.
 * Ubicación: src/modules/crono/domain/services/TimeConversionService.ts
 */
export interface ITimeConversionService {
  /**
   * Convierte un monto monetario a horas de vida basado en el perfil.
   */
  convertMoneyToTime(amount: number, profile: LifeCurrencyConfig): TimeImpact;

  /**
   * Calcula cuánto tiempo libre real tiene el usuario después de sobrevivir.
   */
  calculateDiscretionaryTime(profile: LifeCurrencyConfig): number;
}
```
