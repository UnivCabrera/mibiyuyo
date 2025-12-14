# 🚀 Perfil 29: Founder como Onboarding Specialist (Wizard A Prueba de Tontos)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Onboarding Specialist por $35k-50k MXN/mes y usar herramientas como Appcues/Pendo ($300-2k USD/mes) para crear tours guiados."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie ni pagar herramientas de onboarding.** Un wizard bien diseñado en **Svelte 5** + checklist progresivo + tooltips es suficiente.

**Realidad México:** El usuario promedio NO lee manuales. Necesita **paso a paso visual** con lenguaje simple.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Tour Interactivo | Wizard Svelte 5 (5 pasos máx) | $0 |
| Tooltips Contextuales | shadcn-svelte Tooltip | $0 |
| Videos Tutoriales | Loom (gratis 25 videos) + hosting Cloudflare R2 | $0 |
| Checklist de Activación | Componente Svelte + PostgreSQL | $0 |
| Empty States Educativos | Ilustraciones + copy claro | $0 |
| Herramientas de Onboarding | PROHIBIDO (Appcues, Pendo, Intercom) | $0 vs $3.6k-24k USD/año ⛔ |
| Onboarding Specialist externo | Solo UX audit puntual (si necesario) | $8k-15k/evento |

**Cuándo contratar:** Fase 3 (100k+ usuarios), si tasa de activación <30%.

**Ahorro:** $420k-600k MXN/año

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Flujo de Registro Básico | ✅ Definido | `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md` |
| Framework Onboarding Adaptativo | ✅ Completo | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 4) |
| Copy Anti-Corporativo | ✅ Definido | Perfil 25 (Content Strategist) |
| shadcn-svelte Components | ✅ Stack | `03_STACK_TECNOLOGICO_DEFINITIVO.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| ONB-001 | **Wizard de 5 Pasos (Svelte 5)** | 🔴 Bloqueante | Svelte Runes | $0 | Sem 1 |
| ONB-002 | **Checklist de Activación** | 🔴 Bloqueante | shadcn-svelte Progress | $0 | Sem 1 |
| ONB-003 | **Videos Tutoriales Cortos (1-2 min)** | 🟠 Alto | Loom + Cloudflare R2 | $0 | Sem 2 |
| ONB-004 | **Empty States Educativos** | 🟡 Medio | Svelte components | $0 | Sem 3 |
| ONB-005 | **Email Welcome Drip (3 correos)** | 🟡 Medio | Resend + Svelte-Email | $0 | Sem 3 |
| ONB-006 | **Onboarding Adaptativo (Niveles)** | 🟢 Bajo | Lógica condicional | $0 | Fase 2 |
| ONB-007 | ~~Herramientas de Onboarding (Appcues/Pendo)~~ | ❌ PROHIBIDO | N/A | $300-2k USD/mes ⛔ | Nunca |
| ONB-008 | ~~Contratar Onboarding Specialist~~ | ❌ Descartado | N/A | $35k/mes ⛔ | Nunca (Fase 1-2) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Wizard de 5 Pasos (Svelte 5 Runes)

**Filosofía:** Máximo 5 pasos, cada uno <30 segundos. Total <2.5 minutos.

**Pasos del Wizard:**

1. 👋 **Bienvenida** - ¿Quién eres? (Perfil: Freelance, PyME, Contador, etc.)
2. 🎯 **Tu Meta** - ¿Qué quieres lograr? (Ahorrar, Declarar impuestos, Controlar gastos)
3. 💰 **Ingreso Mensual** - ¿Cuánto ganas aprox.? (rangos, no exacto)
4. 📊 **Primera Transacción** - Registra tu primer gasto (ejemplo: $50 MXN café)
5. ✅ **Listo** - Ver dashboard con datos de ejemplo

**Implementación:**

```svelte
<!-- src/routes/onboarding/+page.svelte -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Progress } from '$lib/components/ui/progress';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Input } from '$lib/components/ui/input';

  let currentStep = $state(1);
  let formData = $state({
    profileType: '',
    goal: '',
    incomeRange: '',
    firstTransaction: { description: 'Café', amount: 50 }
  });

  let progress = $derived((currentStep / 5) * 100);
  let canContinue = $derived(() => {
    if (currentStep === 1) return formData.profileType !== '';
    if (currentStep === 2) return formData.goal !== '';
    if (currentStep === 3) return formData.incomeRange !== '';
    if (currentStep === 4) return formData.firstTransaction.amount > 0;
    return true;
  });

  async function handleNext() {
    if (currentStep === 5) {
      await saveOnboardingData(formData);
      await goto('/dashboard');
    } else {
      currentStep++;
    }
  }

  function handleBack() {
    if (currentStep > 1) currentStep--;
  }
</script>

<div class="onboarding-container max-w-2xl mx-auto p-8">
  <!-- Progress Bar -->
  <div class="mb-8">
    <Progress value={progress} class="h-2" />
    <p class="text-sm text-muted mt-2">Paso {currentStep} de 5</p>
  </div>

  <!-- Step 1: Perfil -->
  {#if currentStep === 1}
    <div class="step">
      <h1 class="text-3xl font-bold mb-4">👋 ¡Hola! ¿Quién eres?</h1>
      <p class="text-muted mb-6">Esto nos ayuda a personalizar tu experiencia.</p>

      <RadioGroup bind:value={formData.profileType}>
        <div class="option">
          <RadioGroupItem value="freelance" id="freelance" />
          <label for="freelance">
            <strong>Freelancer / Honorarios</strong>
            <p class="text-sm text-muted">Trabajo por mi cuenta</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="pyme" id="pyme" />
          <label for="pyme">
            <strong>Dueño de Negocio (PyME)</strong>
            <p class="text-sm text-muted">Tengo empleados</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="contador" id="contador" />
          <label for="contador">
            <strong>Contador / Despacho</strong>
            <p class="text-sm text-muted">Llevo contabilidad de clientes</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="empleado" id="empleado" />
          <label for="empleado">
            <strong>Empleado (Nómina)</strong>
            <p class="text-sm text-muted">Trabajo para una empresa</p>
          </label>
        </div>
      </RadioGroup>
    </div>
  {/if}

  <!-- Step 2: Meta -->
  {#if currentStep === 2}
    <div class="step">
      <h1 class="text-3xl font-bold mb-4">🎯 ¿Qué quieres lograr?</h1>
      <p class="text-muted mb-6">Elige tu objetivo principal (puedes cambiarlo después).</p>

      <RadioGroup bind:value={formData.goal}>
        <div class="option">
          <RadioGroupItem value="save" id="save" />
          <label for="save">
            <strong>💰 Ahorrar dinero</strong>
            <p class="text-sm text-muted">Crear un fondo de emergencia</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="taxes" id="taxes" />
          <label for="taxes">
            <strong>📊 Declarar impuestos fácil</strong>
            <p class="text-sm text-muted">Evitar multas del SAT</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="control" id="control" />
          <label for="control">
            <strong>📋 Controlar mis gastos</strong>
            <p class="text-sm text-muted">Saber a dónde va mi dinero</p>
          </label>
        </div>
        <div class="option">
          <RadioGroupItem value="grow" id="grow" />
          <label for="grow">
            <strong>🚀 Hacer crecer mi negocio</strong>
            <p class="text-sm text-muted">Métricas y reportes</p>
          </label>
        </div>
      </RadioGroup>
    </div>
  {/if}

  <!-- Step 3: Ingreso -->
  {#if currentStep === 3}
    <div class="step">
      <h1 class="text-3xl font-bold mb-4">💰 ¿Cuánto ganas al mes?</h1>
      <p class="text-muted mb-6">Aproximado, para sugerirte metas realistas. No lo compartimos.</p>

      <RadioGroup bind:value={formData.incomeRange}>
        <div class="option">
          <RadioGroupItem value="<10k" id="low" />
          <label for="low">Menos de $10,000 MXN</label>
        </div>
        <div class="option">
          <RadioGroupItem value="10k-30k" id="med" />
          <label for="med">$10,000 - $30,000 MXN</label>
        </div>
        <div class="option">
          <RadioGroupItem value="30k-50k" id="high" />
          <label for="high">$30,000 - $50,000 MXN</label>
        </div>
        <div class="option">
          <RadioGroupItem value=">50k" id="vhigh" />
          <label for="vhigh">Más de $50,000 MXN</label>
        </div>
      </RadioGroup>
    </div>
  {/if}

  <!-- Step 4: Primera Transacción -->
  {#if currentStep === 4}
    <div class="step">
      <h1 class="text-3xl font-bold mb-4">📊 Registra tu primer gasto</h1>
      <p class="text-muted mb-6">Solo para que veas cómo funciona. ¡Es facilisimo!</p>

      <div class="space-y-4">
        <div>
          <label>Descripción</label>
          <Input
            type="text"
            bind:value={formData.firstTransaction.description}
            placeholder="Ej: Café, Comida, Uber"
          />
        </div>
        <div>
          <label>¿Cuánto gastaste?</label>
          <Input
            type="number"
            bind:value={formData.firstTransaction.amount}
            placeholder="50"
          />
          <p class="text-sm text-muted mt-1">En pesos mexicanos (MXN)</p>
        </div>
      </div>

      <div class="bg-green-50 p-4 rounded-lg mt-6">
        <p class="text-sm">
          💡 <strong>Tip:</strong> Después puedes usar foto de tickets o sincronizar tu banco.
        </p>
      </div>
    </div>
  {/if}

  <!-- Step 5: Listo -->
  {#if currentStep === 5}
    <div class="step text-center">
      <div class="text-6xl mb-4">🎉</div>
      <h1 class="text-3xl font-bold mb-4">¡Listo, {formData.profileType}!</h1>
      <p class="text-lg mb-6">
        Tu cuenta está configurada. Ahora vamos al dashboard para que veas todo lo que puedes hacer.
      </p>

      <div class="bg-blue-50 p-6 rounded-lg mb-6">
        <p class="text-sm text-left">
          <strong>Tu próximo paso:</strong><br />
          {#if formData.goal === 'save'}
            Crea tu primera meta de ahorro (ej: $20,000 para emergencias).
          {:else if formData.goal === 'taxes'}
            Conecta tu cuenta del SAT para descargar facturas automáticamente.
          {:else if formData.goal === 'control'}
            Revisa el análisis de tus gastos del mes.
          {:else}
            Explora los reportes de tu negocio.
          {/if}
        </p>
      </div>
    </div>
  {/if}

  <!-- Navigation -->
  <div class="flex justify-between mt-8">
    <Button variant="ghost" onclick={handleBack} disabled={currentStep === 1}>
      ← Atrás
    </Button>
    <Button onclick={handleNext} disabled={!canContinue()}>
      {currentStep === 5 ? '🚀 Ir al Dashboard' : 'Siguiente →'}
    </Button>
  </div>

  <!-- Skip Option -->
  {#if currentStep < 5}
    <div class="text-center mt-4">
      <button class="text-sm text-muted underline" onclick={() => goto('/dashboard')}>
        Saltar configuración (puedes hacerla después)
      </button>
    </div>
  {/if}
</div>

<style>
  .option {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--surface-3);
    border-radius: 8px;
    margin-bottom: 0.75rem;
    cursor: pointer;
  }

  .option:hover {
    border-color: var(--color-primary-500);
    background: var(--surface-1);
  }

  .step {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
```

### 2. Checklist de Activación (Dashboard)

Componente que se muestra en el dashboard hasta que el usuario completa acciones clave.

```svelte
<!-- src/lib/components/dashboard/SetupProgress.svelte -->
<script lang="ts">
  import { Progress } from '$lib/components/ui/progress';
  import { Button } from '$lib/components/ui/button';
  import { X } from 'lucide-svelte';

  let { steps, onDismiss } = $props<{
    steps: { id: string, label: string, completed: boolean, link: string }[],
    onDismiss: () => void
  }>();

  let completedCount = $derived(steps.filter(s => s.completed).length);
  let progress = $derived((completedCount / steps.length) * 100);
  let isComplete = $derived(completedCount === steps.length);
</script>

{#if !isComplete}
  <div class="setup-card p-6 border-2 border-primary rounded-lg bg-gradient-to-br from-blue-50 to-green-50 mb-6 relative">
    <button
      onclick={onDismiss}
      class="absolute top-2 right-2 text-muted hover:text-foreground"
      aria-label="Cerrar"
    >
      <X size={20} />
    </button>

    <div class="flex justify-between items-center mb-3">
      <h3 class="text-xl font-bold">🎯 Completa tu configuración</h3>
      <span class="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
    </div>

    <Progress value={progress} class="h-3 mb-4" />

    <p class="text-sm text-muted mb-4">
      Estas acciones te ayudarán a sacarle el máximo provecho a FinTech.
    </p>

    <ul class="space-y-3">
      {#each steps as step}
        <li class="flex items-start gap-3">
          <input
            type="checkbox"
            checked={step.completed}
            disabled
            class="mt-1 accent-primary w-5 h-5"
          />
          {#if step.completed}
            <span class="line-through text-muted-foreground flex-1">
              {step.label}
            </span>
          {:else}
            <div class="flex-1">
              <a href={step.link} class="text-primary hover:underline font-medium">
                {step.label}
              </a>
            </div>
          {/if}
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <div class="celebration p-6 border-2 border-green-500 rounded-lg bg-green-50 mb-6 text-center">
    <div class="text-4xl mb-2">🎉</div>
    <h3 class="text-xl font-bold text-green-700">¡Configuración completa!</h3>
    <p class="text-sm text-green-600 mt-2">
      Ya estás listo para aprovechar todas las funciones. 🚀
    </p>
    <Button variant="ghost" size="sm" onclick={onDismiss} class="mt-3">
      Cerrar
    </Button>
  </div>
{/if}
```

**Uso en Dashboard:**

```svelte
<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import SetupProgress from '$lib/components/dashboard/SetupProgress.svelte';

  let setupSteps = $state([
    { id: '1', label: 'Registra tu primera transacción', completed: false, link: '/transactions/add' },
    { id: '2', label: 'Crea una meta de ahorro', completed: false, link: '/goals/create' },
    { id: '3', label: 'Conecta tu cuenta del SAT', completed: false, link: '/integrations/sat' },
    { id: '4', label: 'Configura tu presupuesto mensual', completed: false, link: '/budget/create' },
  ]);

  let showSetup = $state(true);
</script>

{#if showSetup}
  <SetupProgress steps={setupSteps} onDismiss={() => showSetup = false} />
{/if}
```

### 3. Videos Tutoriales Cortos (1-2 min)

**Herramienta:** Loom (gratis 25 videos) + hosting en Cloudflare R2.

**Videos a Crear:**

| Video | Duración | Tema |
|:------|:---------|:-----|
| 1. Bienvenida | 60 seg | ¿Qué es FinTech y qué puedes hacer? |
| 2. Primer Gasto | 90 seg | Cómo registrar tu primera transacción |
| 3. Metas de Ahorro | 120 seg | Crear y completar una meta |
| 4. Conectar SAT | 120 seg | Paso a paso (CIEC/FIEL) |
| 5. Declaración Provisional | 120 seg | Cómo declarar en 5 minutos |

**Implementación:**

```svelte
<!-- src/lib/components/onboarding/VideoTutorial.svelte -->
<script lang="ts">
  let { videoId, title } = $props<{ videoId: string, title: string }>();
  let videoUrl = $derived(`https://cdn.fintech.mx/videos/${videoId}.mp4`);
</script>

<div class="video-container">
  <h4 class="font-bold mb-2">🎥 {title}</h4>
  <video controls class="w-full rounded-lg" poster={`${videoUrl}.jpg`}>
    <source src={videoUrl} type="video/mp4" />
    Tu navegador no soporta video.
  </video>
</div>
```

### 4. Empty States Educativos

Cuando un usuario aún no tiene datos, mostrar **qué puede hacer** (no solo "No hay datos").

```svelte
<!-- src/lib/components/ui/EmptyState.svelte -->
<script lang="ts">
  import { Button } from '$lib/components/ui/button';

  let {
    icon = '📄',
    title,
    description,
    ctaText,
    ctaLink
  } = $props<{
    icon?: string,
    title: string,
    description: string,
    ctaText: string,
    ctaLink: string
  }>();
</script>

<div class="empty-state text-center p-12 border-2 border-dashed rounded-lg">
  <div class="text-6xl mb-4">{icon}</div>
  <h3 class="text-2xl font-bold mb-2">{title}</h3>
  <p class="text-muted mb-6 max-w-md mx-auto">{description}</p>
  <Button href={ctaLink}>{ctaText}</Button>
</div>
```

**Ejemplo de Uso:**

```svelte
<!-- src/routes/goals/+page.svelte -->
{#if goals.length === 0}
  <EmptyState
    icon="🎯"
    title="Aún no tienes metas"
    description="Las metas de ahorro te ayudan a alcanzar tus objetivos financieros paso a paso. ¿Qué tal un fondo de emergencia?"
    ctaText="Crear mi primera meta"
    ctaLink="/goals/create"
  />
{/if}
```

### 5. Email Welcome Drip (3 correos)

Secuencia de correos automáticos para guiar al usuario.

| Día | Email | Objetivo |
|:---|:------|:---------|
| 0 | Bienvenida | Confirmar registro, CTA: Completar onboarding |
| 3 | Primer valor | Tip: "Registra tus gastos en menos de 10 seg" + video |
| 7 | Recordatorio | Si no ha activado: "Te extrañamos, ¿necesitas ayuda?" |

**Implementación con BullMQ:**

```typescript
// src/lib/server/jobs/email-drip.job.ts
import { Queue } from 'bullmq';
import { sendEmail } from '$lib/server/email';

const emailQueue = new Queue('email-drip', {
  connection: { host: 'localhost', port: 6379 }
});

export async function scheduleWelcomeDrip(userId: string, email: string) {
  // Día 0: Inmediato
  await emailQueue.add('welcome-day-0', { userId, email }, { delay: 0 });

  // Día 3: 3 días después
  await emailQueue.add('welcome-day-3', { userId, email }, { delay: 3 * 24 * 60 * 60 * 1000 });

  // Día 7: 7 días después
  await emailQueue.add('welcome-day-7', { userId, email }, { delay: 7 * 24 * 60 * 60 * 1000 });
}
```

---

## 💡 Mentalidad Bootstrap: Onboarding = Wizard Simple, No Herramientas Caras

### Qué hace el Sistema:

1. **Wizard de 5 pasos** (<2.5 minutos) con Svelte 5 Runes.
2. **Checklist progresivo** visible hasta completar acciones clave.
3. **Videos cortos** (1-2 min) embebidos en app.
4. **Empty states** educativos (no solo "No hay datos").
5. **Email drip** (3 correos) con Resend + BullMQ.

### Qué NO hacer:

- ❌ Onboarding de 10+ pasos (abandono masivo).
- ❌ Pagar Appcues/Pendo ($3.6k-24k USD/año).
- ❌ Tooltips en TODO (solo en puntos críticos).
- ❌ Forzar onboarding (permitir skip).

### Herramientas:

- **Svelte 5 Runes:** Wizard reactivo sin líbricas externas.
- **shadcn-svelte:** Progress, Button, RadioGroup.
- **Loom:** Grabar videos tutoriales (25 gratis).
- **Cloudflare R2:** Hosting de videos ($0.015/GB).
- **Resend + BullMQ:** Email drip campaign.

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje "A Prueba de Tontos"

**❌ Corporativo:**
> "Configure su perfil fiscal ingresando su RFC y régimen tributario."

**✅ México Profundo:**
> "¿Tienes tu RFC a la mano? Es ese código de 13 letras y números. Lo encuentras en tu Cédula Fiscal (descárgala del SAT)."

### 2. Perfiles Culturalmente Relevantes

En el paso 1 del wizard, usar lenguaje mexicano:

- ❌ "Self-employed"
- ✅ "Freelancer / Trabajo por mi cuenta"

- ❌ "Small business owner"
- ✅ "Dueño de negocio (PyME)"

### 3. Primeras Transacciones Contextuales

Ejemplos pre-llenados mexicanos:

| Perfil | Ejemplo Pre-Llenado |
|:-------|:-------------------|
| Freelancer | "Café en Starbucks - $65" |
| PyME | "Gasolina para repartidor - $500" |
| Empleado | "Comida del trabajo - $120" |

### 4. Videos con Voz Mexicana

Grabar tutoriales con **acento neutral mexicano** (no español de España).

---

## 🔗 Referencias

- **UserOnboard.com:** Teardowns de onboarding (Duolingo, Notion, Superhuman).
- **Framework Neurofinanzas:** `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` (Sección 4: Onboarding Adaptativo).
- **Jobs to be Done (JTBD):** Entender qué "contrata" el usuario al registrarse.
- **Hooked Model:** Nir Eyal (Trigger → Action → Reward → Investment).

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Wizard Svelte nativo, Cero Herramientas de Onboarding)*
