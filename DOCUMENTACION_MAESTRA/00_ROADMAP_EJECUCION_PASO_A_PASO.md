# 🎯 ROADMAP DE EJECUCIÓN v5.0
## Del Concepto al Unicornio: Orden Lógico de Dependencias

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Versión:** 5.0 (Consolidación Final)  
**Fecha:** 3 Enero 2025  
**Actualización:** Sincronizado con Stack v5.0, 7 Perfiles Visuales, BYOK, Vendors decididos

---

## 📚 FILOSOFÍA DE ESTE DOCUMENTO

> **"No basta saber QUÉ construir. Hay que entender POR QUÉ va en ese orden."**

Cada paso incluye:
- ✅ **Qué hacer** (acción concreta)
- 🧠 **Por qué ANTES de lo siguiente** (dependencias)
- ⚠️ **Qué pasa si lo saltas** (deuda técnica real)
- ⏱️ **Tiempo estimado** (para un desarrollador)

---

## 🎯 REFERENCIAS CRUZADAS OBLIGATORIAS

| Documento | Propósito | Sincronización |
| :--- | :--- | :---: |
| `00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md` | Qué prometemos a cada perfil | ✅ v4.0 |
| `03_STACK_TECNOLOGICO_DEFINITIVO.md` | Con qué lo construimos | ✅ v5.0 |
| `00_INDICE_GENERAL.md` | Índice maestro del proyecto | ✅ v4.0 |
| `03_IDENTIDAD_COMERCIAL_Y_B2B.md` | Iceberg Strategy (7→11 perfiles) | ✅ v4.0 |

---

## 🏗️ DIAGRAMA DE DEPENDENCIAS MAESTRO

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           FASE 0: CIMIENTOS (Semana 0)                          │
│                    "Sin esto, TODO se reescribe después"                        │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [0.1] Ambiente Dev → [0.2] Esquema DB → [0.3] Monorepo → [0.4] CI/CD Base     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        FASE 1: SEGURIDAD PRIMERO (Semana 1-2)                   │
│               "El castillo se construye desde los muros, no el trono"           │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [1.1] Auth + Sessions → [1.2] BYOK Crypto → [1.3] Audit Logs                  │
│                                                                                 │
│  🧠 POR QUÉ PRIMERO: Toda transacción necesita `user_id`. Toda API key         │
│     necesita cifrado. Todo cambio necesita auditoría.                          │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        FASE 2: CORE FINANCIERO (Semana 3-4)                     │
│                   "El motor que hace que todo tenga sentido"                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [2.1] Cuentas → [2.2] Categorías → [2.3] Transacciones → [2.4] Balances       │
│                                                                                 │
│  🧠 POR QUÉ ESTE ORDEN: Transacción necesita cuenta_id + categoría_id.         │
│     Balance es cálculo derivado de transacciones.                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        FASE 3: FRONTEND MVP (Semana 5-6)                        │
│                    "Interfaz que consume backend estable"                       │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [3.1] Design System → [3.2] Auth UI → [3.3] Dashboard Base                    │
│  [3.4] Tangram Grid → [3.5] Widgets Core                                       │
│                                                                                 │
│  🧠 POR QUÉ DESPUÉS: El frontend es "espejo" del backend. Si el backend        │
│     cambia, el frontend se rompe.                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       FASE 4: 7 PERFILES VISUALES (Semana 7-8)                  │
│                   "La magia de la personalización automática"                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [4.1] Quiz de Onboarding → [4.2] Mapeo Visual→Técnico                         │
│  [4.3] Templates por Perfil → [4.4] Feature Flags                              │
│                                                                                 │
│  🧠 POR QUÉ AHORA: Requiere UI funcional + backend de usuarios completo.       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      FASE 5: INTEGRACIONES MÉXICO (Semana 9-12)                 │
│                      "Lo que nos diferencia de competidores"                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [5.1] SAT CIEC/FIEL → [5.2] PAC Finkok → [5.3] Finerio Connect                │
│  [5.4] Mercado Libre → [5.5] Validación 69-B                                   │
│                                                                                 │
│  🧠 POR QUÉ DESPUÉS: Necesita auth sólida para manejar credenciales SAT.       │
│     Necesita BYOK para cifrar tokens de terceros.                              │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        FASE 6: INTELIGENCIA ARTIFICIAL (Semana 13-14)           │
│                       "El diferenciador que nadie más tiene"                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [6.1] RAG Pipeline → [6.2] Chat IA (BYOK Gemini) → [6.3] OCR Tickets          │
│  [6.4] Predicciones → [6.5] Embeddings Fiscales                                │
│                                                                                 │
│  🧠 POR QUÉ DESPUÉS: Necesita datos reales para contexto. Necesita BYOK        │
│     funcionando para API keys de usuarios.                                     │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      FASE 7: 70 LIFESTYLE TOOLS (Semana 15-16)                  │
│                    "Gamificación y engagement sin costo servidor"               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [7.1] Tools Ultraligeras → [7.2] Tools Medianas → [7.3] Tools Pesadas         │
│  [7.4] Lazy Loading System                                                     │
│                                                                                 │
│  🧠 POR QUÉ AL FINAL: Son "cereza del pastel". El core debe funcionar primero. │
│     100% client-side, no bloquean nada.                                        │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                     FASE 8: MONETIZACIÓN Y PAGOS (Semana 17-18)                 │
│                        "Convertir valor en ingresos"                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [8.1] Stripe Integration → [8.2] Planes ($0/$99/$149/$199)                    │
│  [8.3] Upsell Triggers → [8.4] Portal de Billing                               │
│                                                                                 │
│  🧠 POR QUÉ CASI AL FINAL: Necesita todo el producto funcionando para          │
│     mostrar valor antes de pedir dinero.                                       │
└─────────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                       FASE 9: PRODUCCIÓN (Semana 19-20)                         │
│                      "Del localhost al mundo real"                              │
├─────────────────────────────────────────────────────────────────────────────────┤
│  [9.1] Dokploy Setup → [9.2] Backups S3 → [9.3] Monitoring                     │
│  [9.4] Beta Cerrada → [9.5] Lanzamiento Público                                │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

# 🚀 FASE 0: CIMIENTOS (Semana 0)
## "Las decisiones pre-código definen el 80% del éxito"

---

## PASO 0.1: AMBIENTE DE DESARROLLO
**⏱️ Tiempo: 2 horas**

### ✅ Qué hacer:
```bash
# 1. Instalar Bun (runtime principal)
curl -fsSL https://bun.sh/install | bash
bun --version  # Debe ser 1.3.3+

# 2. Instalar Node.js LTS (fallback)
nvm install 24
nvm use 24

# 3. Instalar Docker
# Ubuntu: sudo apt install docker.io docker-compose-v2
docker --version  # 27.5+

# 4. Configurar VS Code
code --install-extension bradlc.vscode-tailwindcss  # Para Open Props
code --install-extension svelte.svelte-vscode
code --install-extension ms-azuretools.vscode-docker
```

### 🧠 Por qué ANTES de todo:
> Sin ambiente consistente, "funciona en mi máquina" pero falla en producción.

### ⚠️ Qué pasa si lo saltas:
- Bun 1.2 no soporta algunas APIs de crypto → BYOK falla
- Node 20 vs 24 → imports diferentes, tests inconsistentes

---

## PASO 0.2: ESQUEMA DE BASE DE DATOS
**⏱️ Tiempo: 4 horas**

### ✅ Qué hacer:
1. Diseñar diagrama ER con todas las entidades
2. Crear schemas de Drizzle ORM
3. Ejecutar primera migración

### 🧠 Por qué DATABASE-FIRST:
```
Cambiar esquema DESPUÉS de código escrito:
├── Migración de datos (arriesgada)
├── Refactor de todos los repositorios
├── Actualizar tipos TypeScript
├── Modificar validaciones
├── Re-testear todo
└── = 2-4 semanas perdidas
```

### Tablas Mínimas para MVP:
```sql
-- Core Auth
users, sessions, accounts, verification_tokens

-- Core Financiero
financial_accounts, categories, transactions

-- 7 Perfiles
user_profiles, profile_visual_to_technical

-- BYOK
user_api_keys (encrypted), byok_providers

-- Auditoría
audit_logs, user_activities
```

---

## PASO 0.3: ESTRUCTURA MONOREPO
**⏱️ Tiempo: 2 horas**

### ✅ Qué hacer:
```bash
# Crear estructura
mkdir -p apps/{backend,frontend} packages/{shared-types,sat-utils} infrastructure/docker

# Inicializar workspaces
bun init -y
# Editar package.json para workspaces
```

### package.json raíz:
```json
{
  "name": "profinanconta",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "test": "turbo test",
    "lint": "turbo lint"
  }
}
```

---

## PASO 0.4: CI/CD BÁSICO
**⏱️ Tiempo: 2 horas**

### ✅ Qué hacer:
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun test
      - run: bun run lint
```

---

# 🔐 FASE 1: SEGURIDAD PRIMERO (Semana 1-2)
## "El castillo se construye desde los muros, no el trono"

---

## PASO 1.1: AUTENTICACIÓN Y SESIONES
**⏱️ Tiempo: 8 horas**

### ✅ Qué hacer:
1. Implementar Auth.js con adaptador Drizzle
2. Configurar providers (Email, Google, Microsoft)
3. JWT + Refresh Tokens en Redis
4. Rate limiting en /auth/*

### 🧠 Por qué es lo PRIMERO:
> **Toda transacción necesita `user_id`. Sin auth, no sabes de quién son los datos.**

```typescript
// ❌ SIN AUTH: ¿De quién es esta transacción?
await db.insert(transactions).values({
  amount: 1000,
  // user_id: ???  ← No lo sabes
});

// ✅ CON AUTH: Claro y seguro
await db.insert(transactions).values({
  amount: 1000,
  user_id: session.user.id  // ← Viene del JWT verificado
});
```

### ⚠️ Qué pasa si lo saltas:
- Vulnerabilidad CRÍTICA: usuarios ven datos de otros
- Refactor masivo para agregar `user_id` en todas las tablas

---

## PASO 1.2: BYOK (Bring Your Own Key) - CRÍTICO
**⏱️ Tiempo: 6 horas**

### ✅ Qué hacer:
Implementar el módulo de cifrado de API keys según `03_STACK_TECNOLOGICO_DEFINITIVO.md` sección 3.1.

### 🧠 Por qué ANTES del chat IA:
> **Si guardas API keys de usuarios sin cifrar:**
> - Breach de DB = todas las keys expuestas
> - Usuario pierde control de su cuenta Gemini/OpenAI
> - Responsabilidad legal recae en nosotros

```
┌─────────────────────────────────────────────────────────────────┐
│  SIN BYOK (Peligroso)                                          │
├─────────────────────────────────────────────────────────────────┤
│  DB: api_key = "sk-abc123..."  ← Texto plano, vulnerable       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  CON BYOK (Seguro)                                             │
├─────────────────────────────────────────────────────────────────┤
│  DB: encrypted_key = "U2FsdGVkX1..."  ← Cifrado AES-256-GCM    │
│      iv = "a1b2c3d4..."               ← Único por key          │
│      salt = "e5f6g7h8..."             ← Para derivar clave     │
│                                                                 │
│  Solo se descifra EN MEMORIA al usar, NUNCA se loguea          │
└─────────────────────────────────────────────────────────────────┘
```

### Implementación obligatoria:
```typescript
// /apps/backend/src/infrastructure/byok/crypto.ts
// Ver código completo en 03_STACK_TECNOLOGICO_DEFINITIVO.md sección 3.1
```

---

## PASO 1.3: SISTEMA DE AUDITORÍA
**⏱️ Tiempo: 4 horas**

### ✅ Qué hacer:
```typescript
interface AuditLog {
  id: string;
  user_id: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT';
  entity: string;       // 'transaction', 'account', etc.
  entity_id: string;
  old_values: object | null;
  new_values: object | null;
  ip_address: string;
  user_agent: string;
  created_at: Date;
}
```

### 🧠 Por qué ahora:
> Para cumplir LFPDPPP y tener trazabilidad. Si algo falla, necesitas saber qué pasó.

---

# 💰 FASE 2: CORE FINANCIERO (Semana 3-4)
## "El motor que hace que todo tenga sentido"

---

## PASO 2.1: CRUD DE CUENTAS FINANCIERAS
**⏱️ Tiempo: 4 horas**

### ✅ Qué hacer:
```typescript
interface FinancialAccount {
  id: string;
  user_id: string;
  name: string;          // "Cuenta Principal BBVA"
  type: 'checking' | 'savings' | 'credit' | 'cash' | 'investment';
  currency: 'MXN' | 'USD';
  initial_balance: number;
  current_balance: number;  // Calculado
  institution?: string;     // "BBVA", "Banorte", etc.
  is_active: boolean;
  created_at: Date;
}
```

---

## PASO 2.2: SISTEMA DE CATEGORÍAS
**⏱️ Tiempo: 3 horas**

### ✅ Qué hacer:
- Categorías predefinidas por perfil (ver Matriz Maestra)
- Categorías personalizadas del usuario
- Iconos y colores

```typescript
interface Category {
  id: string;
  user_id: string | null;  // null = sistema
  name: string;
  icon: string;            // Lucide icon name
  color: string;           // Hex color
  type: 'income' | 'expense' | 'transfer';
  parent_id?: string;      // Subcategorías
  profile_tags: string[];  // ['comandante', 'equilibrista']
}
```

---

## PASO 2.3: TRANSACCIONES
**⏱️ Tiempo: 6 horas**

### ✅ Qué hacer:
```typescript
interface Transaction {
  id: string;
  user_id: string;
  account_id: string;           // FK a financial_accounts
  category_id: string;          // FK a categories
  amount: number;               // Positivo = ingreso, Negativo = gasto
  description: string;
  date: Date;
  type: 'income' | 'expense' | 'transfer';
  
  // Campos México-específicos
  cfdi_id?: string;             // Si está vinculada a factura
  sat_validated?: boolean;
  
  // Metadatos
  tags: string[];
  attachments: string[];        // URLs de comprobantes
  is_recurring: boolean;
  recurring_config?: object;
  
  created_at: Date;
  updated_at: Date;
}
```

### 🧠 Por qué necesita Cuenta y Categoría primero:
```
INSERT INTO transactions (account_id, category_id, ...)
         │                      │
         ▼                      ▼
   FK → accounts          FK → categories
   
   Si no existen, INSERT falla con:
   "foreign key constraint violation"
```

---

## PASO 2.4: CÁLCULO DE BALANCES
**⏱️ Tiempo: 4 horas**

### ✅ Qué hacer:
```typescript
// Servicio de balances - NO duplicar en frontend
class BalanceService {
  async getAccountBalance(accountId: string): Promise<number> {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.id, accountId)
    });
    
    const txSum = await db
      .select({ total: sql<number>`SUM(amount)` })
      .from(transactions)
      .where(eq(transactions.account_id, accountId));
    
    return account.initial_balance + (txSum[0].total || 0);
  }
  
  async getNetWorth(userId: string): Promise<number> {
    const userAccounts = await this.getUserAccounts(userId);
    const balances = await Promise.all(
      userAccounts.map(a => this.getAccountBalance(a.id))
    );
    return balances.reduce((sum, b) => sum + b, 0);
  }
}
```

---

# 🎨 FASE 3: FRONTEND MVP (Semana 5-6)
## "Interfaz que consume backend estable"

---

## PASO 3.1: DESIGN SYSTEM
**⏱️ Tiempo: 8 horas**

### ✅ Qué hacer:
1. Configurar Open Props (CSS variables)
2. Definir tokens de color por tema (light/dark)
3. Crear componentes base con shadcn-svelte
4. Documentar en Storybook (opcional)

### Colores según `01_COLORIMETRIA_PSICOLOGIA.md`:
```css
:root {
  /* Primarios */
  --color-primary: #2563EB;     /* Azul Confianza */
  --color-secondary: #059669;   /* Verde Crecimiento */
  
  /* Estados */
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
  
  /* Neutrales */
  --color-bg: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #1F2937;
  --color-muted: #6B7280;
}

[data-theme="dark"] {
  --color-bg: #0F172A;
  --color-surface: #1E293B;
  --color-text: #F1F5F9;
  --color-muted: #94A3B8;
}
```

---

## PASO 3.2: FLUJO DE AUTENTICACIÓN UI
**⏱️ Tiempo: 6 horas**

### ✅ Qué hacer:
- Página /login con providers
- Página /register con validación
- Página /forgot-password
- Componente de sesión expirada
- Redirect después de login

---

## PASO 3.3: DASHBOARD BASE
**⏱️ Tiempo: 8 horas**

### ✅ Qué hacer:
- Layout principal (sidebar + topbar + content)
- Widget de balance total
- Widget de transacciones recientes
- Widget de gráfica mensual
- Estado vacío para usuarios nuevos

---

## PASO 3.4: SISTEMA TANGRAM (Grid Personalizable)
**⏱️ Tiempo: 10 horas**

### ✅ Qué hacer:
Implementar según `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md`:

```svelte
<!-- /apps/frontend/src/lib/components/TangramGrid.svelte -->
<script lang="ts">
  import Grid from "svelte-grid";
  import { dndzone } from "svelte-dnd-action";
  
  let widgets = $state<Widget[]>([]);
  
  function handleSort(e: CustomEvent) {
    widgets = e.detail.items;
    saveLayout(widgets);
  }
</script>

<div use:dndzone={{ items: widgets }} on:consider={handleSort} on:finalize={handleSort}>
  <Grid bind:items={widgets} cols={12} rowHeight={100}>
    {#each widgets as widget (widget.id)}
      <div>
        <svelte:component this={widgetComponents[widget.type]} {...widget.props} />
      </div>
    {/each}
  </Grid>
</div>
```

---

## PASO 3.5: WIDGETS CORE
**⏱️ Tiempo: 12 horas**

### Widgets obligatorios para MVP:
| Widget | Descripción | Perfil Principal |
| :--- | :--- | :--- |
| `BalanceCard` | Balance total + cambio % | Todos |
| `RecentTransactions` | Últimas 5-10 transacciones | Todos |
| `MonthlyChart` | Ingresos vs Gastos del mes | Todos |
| `BudgetProgress` | Progreso de presupuestos | Equilibrista |
| `CashFlowForecast` | Predicción próximos 7 días | Comandante |
| `QuickActions` | Botones de acción rápida | Todos |

---

# 🎭 FASE 4: 7 PERFILES VISUALES (Semana 7-8)
## "La magia de la personalización automática"

---

## PASO 4.1: QUIZ DE ONBOARDING
**⏱️ Tiempo: 8 horas**

### ✅ Qué hacer:
5 preguntas que determinan el perfil visual:

```typescript
const QUIZ_QUESTIONS = [
  {
    id: 'income_source',
    text: '¿De dónde viene tu ingreso principal?',
    options: [
      { value: 'salary', label: 'Sueldo fijo', points: { equilibrista: 2 } },
      { value: 'freelance', label: 'Proyectos/Freelance', points: { constructor: 2 } },
      { value: 'business', label: 'Mi negocio', points: { comandante: 2 } },
      { value: 'multiple', label: 'Varias fuentes', points: { orquestador: 2 } },
    ]
  },
  // ... 4 preguntas más
];

function calculateProfile(answers: Answer[]): VisualProfile {
  const scores = { equilibrista: 0, constructor: 0, ... };
  // Sumar puntos
  // Retornar perfil con mayor score
}
```

---

## PASO 4.2: MAPEO VISUAL → TÉCNICO
**⏱️ Tiempo: 4 horas**

### ✅ Qué hacer:
Implementar la tabla de `03_IDENTIDAD_COMERCIAL_Y_B2B.md`:

```typescript
const VISUAL_TO_TECHNICAL: Record<VisualProfile, TechnicalProfile[]> = {
  'equilibrista': ['employed_stable', 'early_saver'],
  'constructor': ['freelancer', 'side_hustler'],
  'explorador': ['newbie_curious', 'debt_resolver'],
  'comandante': ['sme_owner', 'multi_business'],
  'escalador': ['ecommerce', 'marketplace_seller'],
  'orquestador': ['multi_entity', 'holding'],
  'guardian': ['family_cfo', 'legacy_planner'],
};
```

---

## PASO 4.3: TEMPLATES POR PERFIL
**⏱️ Tiempo: 8 horas**

### ✅ Qué hacer:
Cada perfil tiene:
- Dashboard layout predeterminado
- Categorías sugeridas
- Metas típicas
- Widgets recomendados

```typescript
const PROFILE_TEMPLATES: Record<VisualProfile, ProfileTemplate> = {
  'equilibrista': {
    defaultWidgets: ['balance', 'budget-progress', 'savings-goal'],
    suggestedCategories: ['Nómina', 'Renta', 'Servicios', 'Ahorro'],
    initialGoals: ['Fondo de emergencia 3 meses', 'Vacaciones'],
    primaryColor: '#2563EB',  // Azul estabilidad
  },
  'comandante': {
    defaultWidgets: ['cashflow', 'accounts-overview', 'sat-status'],
    suggestedCategories: ['Ventas', 'Nómina empleados', 'Impuestos', 'Inventario'],
    initialGoals: ['Flujo de caja positivo', 'Declaración mensual al día'],
    primaryColor: '#7C3AED',  // Morado autoridad
  },
  // ... otros perfiles
};
```

---

## PASO 4.4: SISTEMA DE FEATURE FLAGS
**⏱️ Tiempo: 6 horas**

### ✅ Qué hacer:
```typescript
// Qué ve cada perfil + plan
interface FeatureAccess {
  feature: string;
  profiles: VisualProfile[];
  requiredPlan: 'free' | 'basico' | 'pro' | 'business';
}

const FEATURE_ACCESS: FeatureAccess[] = [
  { feature: 'sat_connection', profiles: ['comandante', 'orquestador'], requiredPlan: 'pro' },
  { feature: 'ai_chat', profiles: ['all'], requiredPlan: 'pro' },
  { feature: 'multi_entity', profiles: ['orquestador'], requiredPlan: 'business' },
  { feature: 'basic_reports', profiles: ['all'], requiredPlan: 'free' },
];

function canAccess(user: User, feature: string): boolean {
  const config = FEATURE_ACCESS.find(f => f.feature === feature);
  if (!config) return false;
  
  const hasProfile = config.profiles.includes('all') || 
                     config.profiles.includes(user.profile);
  const hasPlan = PLAN_HIERARCHY[user.plan] >= PLAN_HIERARCHY[config.requiredPlan];
  
  return hasProfile && hasPlan;
}
```

---

# 🇲🇽 FASE 5: INTEGRACIONES MÉXICO (Semana 9-12)
## "Lo que nos diferencia de competidores extranjeros"

---

## PASO 5.1: SAT CIEC/FIEL
**⏱️ Tiempo: 3 semanas**

### ✅ Qué hacer:
1. Módulo de captura segura de CIEC
2. Almacenamiento cifrado con BYOK
3. Scraping controlado del portal SAT
4. Descarga automática de CFDIs
5. Parser XML de facturas

### 🧠 Por qué requiere BYOK primero:
> Las credenciales CIEC son **más sensibles que una tarjeta de crédito**. Sin cifrado, un breach expone acceso fiscal completo de usuarios.

### Arquitectura:
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Usuario       │     │    Backend      │     │      SAT        │
│  ingresa CIEC   │────▶│  cifra con      │────▶│   (scraping)    │
│                 │     │  BYOK           │     │                 │
└─────────────────┘     └────────┬────────┘     └────────┬────────┘
                                 │                       │
                                 ▼                       ▼
                        ┌─────────────────┐     ┌─────────────────┐
                        │  DB (cifrado)   │     │  XMLs descargados│
                        │  encrypted_ciec │     │  + parseados     │
                        └─────────────────┘     └─────────────────┘
```

---

## PASO 5.2: PAC FINKOK (Timbrado)
**⏱️ Tiempo: 2 semanas**

### ✅ Qué hacer:
1. Integrar SDK de Finkok (modelo OnDemand)
2. Generar CFDI 4.0 desde templates
3. Timbrar facturas
4. Cancelar facturas
5. Almacenar XMLs y PDFs

### Vendor decidido:
> **Finkok OnDemand**: Sin cuota fija mensual. Pagas ~$1.50 MXN por factura timbrada. Ideal para startup.

---

## PASO 5.3: FINERIO CONNECT (Open Banking)
**⏱️ Tiempo: 2 semanas**

### ✅ Qué hacer:
1. Integrar Widget de Finerio
2. OAuth flow para bancos
3. Sync de transacciones bancarias
4. Categorización automática
5. Reconciliación con transacciones manuales

### Vendor decidido:
> **Finerio Connect**: Empresa mexicana, ISO 27001, +120 clientes en MX. Modelo B2B negociable.

---

## PASO 5.4: MERCADO LIBRE API
**⏱️ Tiempo: 2 semanas**

### ✅ Qué hacer:
1. OAuth con Mercado Libre
2. Sync de ventas
3. Sync de costos de envío
4. Cálculo de comisiones
5. Matching con CFDIs

### Para perfil: **Escalador**

---

## PASO 5.5: VALIDACIÓN LISTA 69-B
**⏱️ Tiempo: 3 días**

### ✅ Qué hacer:
1. Job diario que descarga lista 69-B del SAT
2. Verificar proveedores del usuario contra lista
3. Alertar si proveedor está en lista negra
4. Bloquear deducción de facturas problemáticas

---

# 🤖 FASE 6: INTELIGENCIA ARTIFICIAL (Semana 13-14)
## "El diferenciador que nadie más tiene"

---

## PASO 6.1: RAG PIPELINE
**⏱️ Tiempo: 1 semana**

### ✅ Qué hacer:
1. Cargar documentos fiscales (leyes, reglamentos) en pgvector
2. Embeddings con EmbeddingGemma-300M (local)
3. Sistema de retrieval por similitud
4. Prompt engineering para respuestas

### 🧠 Por qué requiere datos primero:
> RAG necesita contexto real del usuario para dar respuestas útiles.

---

## PASO 6.2: CHAT IA CON BYOK
**⏱️ Tiempo: 1 semana**

### ✅ Qué hacer:
1. UI de chat (estilo ChatGPT)
2. Integración con Gemini Pro
3. Usuario usa SU API key (BYOK)
4. Nosotros no pagamos consumo de IA
5. Contexto RAG + datos del usuario

### Flujo BYOK:
```
Usuario pregunta
       │
       ▼
Descifrar API key (en memoria)
       │
       ▼
Llamar Gemini con key del usuario
       │
       ▼
Respuesta (el usuario paga su consumo)
```

---

## PASO 6.3: OCR DE TICKETS
**⏱️ Tiempo: 4 días**

### ✅ Qué hacer:
1. Upload de imagen de ticket
2. Enviar a Gemini Vision (BYOK)
3. Extraer: monto, fecha, concepto, RFC
4. Crear transacción automática
5. Guardar imagen como attachment

---

## PASO 6.4: PREDICCIONES DE FLUJO
**⏱️ Tiempo: 3 días**

### ✅ Qué hacer:
1. Script Python con Prophet
2. Entrenar con transacciones históricas
3. Predecir ingresos/gastos próximos 30 días
4. Alertar si se predice saldo negativo

---

## PASO 6.5: EMBEDDINGS FISCALES
**⏱️ Tiempo: 3 días**

### ✅ Qué hacer:
1. Vectorizar Ley del ISR, IVA, CFF
2. Vectorizar guías del SAT
3. Actualizar cuando haya reformas
4. Búsqueda semántica en chat

---

# 🎮 FASE 7: 70 LIFESTYLE TOOLS (Semana 15-16)
## "Gamificación sin costo de servidor"

---

## PASO 7.1: TOOLS ULTRALIGERAS (0KB adicionales)
**⏱️ Tiempo: 3 días**

| Tool | Implementación |
| :--- | :--- |
| Pomodoro Timer | `setInterval` + Audio API |
| Calculadoras | Funciones puras Svelte |
| Generador Contraseñas | `crypto.getRandomValues()` |
| Ejercicio Respiración | CSS animations |

---

## PASO 7.2: TOOLS MEDIANAS (~20KB)
**⏱️ Tiempo: 4 días**

| Tool | Librería | Tamaño |
| :--- | :--- | :--- |
| QR Generator | `qrcode` | 8KB |
| Editor Notas | `tiptap` | 45KB (lazy) |
| Confetti | `canvas-confetti` | 3KB |

---

## PASO 7.3: TOOLS PESADAS (~100KB)
**⏱️ Tiempo: 3 días**

| Tool | Librería | Carga |
| :--- | :--- | :--- |
| Vision Board | `fabric.js` | Solo on-demand |
| Screenshot Editor | `tldraw` lite | Solo on-demand |

---

## PASO 7.4: SISTEMA DE LAZY LOADING
**⏱️ Tiempo: 2 días**

```typescript
// Ver implementación completa en 03_STACK_TECNOLOGICO_DEFINITIVO.md sección 4.7
```

---

# 💳 FASE 8: MONETIZACIÓN (Semana 17-18)
## "Convertir valor en ingresos"

---

## PASO 8.1: INTEGRACIÓN STRIPE
**⏱️ Tiempo: 4 días**

### ✅ Qué hacer:
1. Crear productos en Stripe Dashboard
2. Configurar webhooks
3. Implementar checkout session
4. Manejar suscripciones

---

## PASO 8.2: PLANES ANTI-MIEDO
**⏱️ Tiempo: 2 días**

| Plan | Precio | Perfiles Target |
| :--- | ---: | :--- |
| **Gratis** | $0/mes | Explorador |
| **Básico** | $99/mes | Equilibrista |
| **Pro** | $149/mes | Constructor, Comandante |
| **Business** | $199/mes | Escalador, Orquestador, Guardián |

---

## PASO 8.3: TRIGGERS DE UPSELL
**⏱️ Tiempo: 3 días**

Ver tabla de triggers en `00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md` sección "Triggers de Upsell".

---

## PASO 8.4: PORTAL DE BILLING
**⏱️ Tiempo: 3 días**

- Ver plan actual
- Cambiar plan (upgrade/downgrade)
- Ver historial de facturas
- Cancelar suscripción

---

# 🚀 FASE 9: PRODUCCIÓN (Semana 19-20)
## "Del localhost al mundo real"

---

## PASO 9.1: CONFIGURACIÓN DOKPLOY
**⏱️ Tiempo: 1 día**

Ver `04_DOKPLOY_CONFIGURACION_COMPLETA.md` para setup detallado.

---

## PASO 9.2: BACKUPS AUTOMÁTICOS
**⏱️ Tiempo: 4 horas**

```yaml
# Dokploy config
backups:
  postgres:
    schedule: "0 */4 * * *"  # Cada 4 horas
    destination: s3://backups-profinanconta/db/
    retention: 30  # días
```

---

## PASO 9.3: MONITORING
**⏱️ Tiempo: 1 día**

1. Prometheus para métricas
2. Grafana para dashboards
3. Alertmanager para notificaciones
4. Loki para logs

---

## PASO 9.4: BETA CERRADA
**⏱️ Tiempo: 2 semanas**

1. 50 usuarios beta seleccionados
2. Feedback estructurado
3. Bug tracking con GitHub Issues
4. Iteración rápida

---

## PASO 9.5: LANZAMIENTO PÚBLICO
**⏱️ Tiempo: 1 día**

1. DNS apuntando a producción
2. SSL verificado
3. Landing page activa
4. Monitoreo en tiempo real
5. Plan de respuesta a incidentes

---

# 📊 RESUMEN EJECUTIVO

| Fase | Duración | Entregable Principal |
| :--- | :---: | :--- |
| 0. Cimientos | 1 semana | Ambiente + DB + Monorepo |
| 1. Seguridad | 2 semanas | Auth + BYOK + Auditoría |
| 2. Core Financiero | 2 semanas | Transacciones + Balances |
| 3. Frontend MVP | 2 semanas | Dashboard + Tangram |
| 4. 7 Perfiles | 2 semanas | Quiz + Templates |
| 5. México | 4 semanas | SAT + PAC + Open Banking |
| 6. IA | 2 semanas | RAG + Chat + OCR |
| 7. Lifestyle | 2 semanas | 70 Tools |
| 8. Monetización | 2 semanas | Stripe + Planes |
| 9. Producción | 2 semanas | Deploy + Beta |
| **TOTAL** | **~21 semanas** | **MVP Completo** |

---

## 🔗 DOCUMENTOS RELACIONADOS

- `00_MATRIZ_MAESTRA_SERVICIOS_POR_PERFIL.md` - Qué prometemos
- `03_STACK_TECNOLOGICO_DEFINITIVO.md` - Con qué lo construimos
- `03_IDENTIDAD_COMERCIAL_Y_B2B.md` - Iceberg Strategy
- `04_DOKPLOY_CONFIGURACION_COMPLETA.md` - Infraestructura

---

**Última actualización:** 3 Enero 2025  
**Versión:** 5.0 (Consolidación Final)
