# 🕵️‍♀️ Perfil 22: Founder como UX Researcher (Guerrilla Research)

**Auditoría Estratégica - Bloque D: Producto y Diseño**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un UX Researcher certificado por $40k-60k MXN/mes para hacer estudios de usabilidad con 100 usuarios."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** La investigación UX más valiosa cuesta **$0**: hablar directamente con usuarios reales vía WhatsApp/Zoom. Un solo comerciante frustrado te dice más que 100 surveys corporativos.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| User Interviews (UserTesting.com) | WhatsApp + Zoom gratis | $0 |
| Heatmaps/Session Replay (Hotjar) | PostHog self-hosted | $0 |
| Surveys (Typeform Pro) | Google Forms | $0 |
| Análisis de comportamiento | PostHog Analytics + SQL queries | $0 |
| Recruiting de usuarios | Anuncios orgánicos Facebook/LinkedIn | $0 |

**Cuándo contratar:** Solo cuando tengas >10k usuarios activos y necesites research cuantitativo masivo (Fase 3).

---

## 📋 Rol y Responsabilidad (Adaptado)

El **Founder-Researcher** investiga las necesidades reales de PyMEs mexicanas usando **Guerrilla Research** (métodos rápidos, baratos, efectivos). Prioriza conversaciones 1-on-1 vía WhatsApp sobre surveys masivos. Usa PostHog para analizar comportamiento real, no hipótesis.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Perfiles de Usuario | ✅ 40 Perfiles | `03_MERCADO_COMPETENCIA/03_40_PERFILES_PROFESIONALES.md` |
| Necesidades | ✅ 100 Necesidades | `03_MERCADO_COMPETENCIA/07_100_NECESIDADES_DIARIAS_NO_RESUELTAS.md` |
| Framework Neurociencias | ✅ Completo | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| UXR-001 | **Widget de Feedback Contextual (WhatsApp)** | 🟠 Alto | Botón flotante + link WA | $0 | Sem 2 |
| UXR-002 | **Grabación de Sesiones (Session Replay)** | 🟡 Medio | PostHog self-hosted | $0 | Sem 3 |
| UXR-003 | **Google Forms para Surveys** | 🟠 Alto | Google Forms | $0 | Sem 1 |
| UXR-004 | ~~Hotjar/Fullstory~~ | ❌ Descartado | Muy caro ⛔ | $39-99/mes ⛔ | Nunca |
| UXR-005 | ~~UserTesting.com~~ | ❌ Descartado | $100/sesión ⛔ | $4,800/año ⛔ | Nunca |
| UXR-006 | ~~Contratar UX Researcher~~ | ❌ Descartado | Demasiado early-stage | $480k-720k/año ⛔ | Nunca (Pre-PMF) |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Widget de Feedback Contextual (Botón WhatsApp Flotante, $0)

NO usar formularios complicados. Enviar **directo a WhatsApp del Founder**.

```svelte
<!-- src/lib/components/feedback/FeedbackWidget.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  const whatsappNumber = '5215512345678'; // Número del Founder
  let currentPath = $derived($page.url.pathname);

  function sendFeedback() {
    const message = `Hola! Tengo un comentario sobre la página ${currentPath}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
</script>

<button
  onclick={sendFeedback}
  class="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
  aria-label="Enviar feedback por WhatsApp"
>
  💬 Feedback
</button>

<style>
  button {
    background: var(--color-success);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  button:hover {
    transform: scale(1.05);
  }
</style>
```

**Por qué WhatsApp directo:**

- ✅ **Cero fricción**: 1 clic y el usuario ya está chateando contigo.
- ✅ **Contexto instantáneo**: Sabes exactamente de qué página te hablan.
- ✅ **Conversación real**: Puedes hacer follow-up, aclarar dudas, profundizar.
- ✅ **Gratis**: No pagas por formulario, no necesitas DB de feedback.

---

### 2. PostHog Session Replay (Self-Hosted, $0)

Ver **exactamente** cómo los usuarios usan la app (sin pagarle a Hotjar).

**Instalación con Docker Compose (ya incluido en Dokploy):**

```yaml
# docker-compose.yml (añadir servicio PostHog)
services:
  posthog:
    image: posthog/posthog:latest
    environment:
      SECRET_KEY: ${POSTHOG_SECRET_KEY}
      DATABASE_URL: postgres://user:pass@postgres:5432/posthog
      REDIS_URL: redis://redis:6379/
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
```

**Integración en SvelteKit:**

```typescript
// src/hooks.client.ts
import posthog from 'posthog-js';
import { browser } from '$app/environment';

if (browser) {
  posthog.init('phc_YOUR_PROJECT_KEY', {
    api_host: 'https://analytics.tudominio.com', // Tu PostHog self-hosted
    session_recording: {
      enabled: true,
      recordCrossOriginIframes: true,
    },
  });
}
```

**Configurar grabaciones:**

- ✅ Solo grabar usuarios que den consentimiento (GDPR).
- ✅ Enmascarar campos sensibles (contraseñas, RFC, datos bancarios).
- ✅ Eliminar grabaciones después de 30 días.

---

### 3. Google Forms para Surveys ($0)

Para encuestas post-onboarding o NPS.

**Ejemplo: Encuesta post-registro**

```html
<!-- Embeber Google Form en modal -->
<iframe
  src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
  width="640"
  height="800"
  frameborder="0"
  marginheight="0"
  marginwidth="0"
>
  Cargando…
</iframe>
```

**Preguntas clave (NPS + Qualitative):**

1. ¿Qué tan probable es que recomiendes PRO_FINAN a un amigo? (0-10)
2. ¿Qué te gustó más de la experiencia de registro?
3. ¿Qué fue lo más confuso o difícil?
4. ¿Qué feature te gustaría ver primero?

---

## 💡 Mentalidad Bootstrap: Guerrilla Research

### Qué hace el Founder (Manual, primeros 12 meses):

1. **2 entrevistas de usuario por semana** (30 min c/u, Zoom gratis).
2. **Responder TODOS los mensajes de WhatsApp** personalmente.
3. **Revisar Session Replays** de usuarios que abandonan (1 hora/semana).
4. **Analizar Google Forms** cada lunes (15 min).
5. **Leer analytics de PostHog** (funnel de conversión, páginas con >80% bounce rate).

### Cuándo contratar UX Researcher:

- **NUNCA antes de 10k usuarios activos**.
- Solo cuando el Founder no pueda seguir el ritmo de feedback.
- **Costo estimado:** $40k-60k MXN/mes (cuando MRR > $300k).

### Herramientas Prohibidas (Demasiado Caras):

- ❌ **Hotjar:** $39-99 USD/mes (~$9k-24k MXN/año).
- ❌ **FullStory:** $199 USD/mes (~$48k MXN/año).
- ❌ **UserTesting.com:** $100 USD/sesión (~$24k MXN por 10 entrevistas).
- ❌ **Typeform Pro:** $29 USD/mes (~$7k MXN/año).
- ❌ **Dovetail:** $39 USD/user/mes (para organizar insights).

---

## 🇲🇽 Adaptación México Profundo

### 1. Cómo Entrevistar PyMEs Sin Intimidarlas

**❌ MAL (Tono corporativo):**
> "Hola, soy UX Researcher de PRO_FINAN. ¿Tienes 60 minutos para una sesión de usabilidad grabada con consentimiento firmado?"

**✅ BIEN (Tono cercano):**
> "¡Hola! Soy [Nombre], el que creó PRO_FINAN. ¿Me regalas 15-20 minutos para platicar de cómo llevas tus finanzas? Quiero que la app te funcione chido. Te invito un café virtual ☕"

### 2. Dónde Conseguir Usuarios para Entrevistas (Gratis)

```
Canales orgánicos:
1. Grupos de Facebook de emprendedores ("PyMEs México", "Contadores MX")
2. LinkedIn (publicar: "Busco comerciantes para feedback, 15 min, regalo 6 meses gratis")
3. Mercado Libre / Amazon (contactar vendedores pequeños)
4. Mercados locales (físicamente, con volantes)
5. Usuarios actuales (email post-registro: "¿Tienes 15 min para platicar?")

Incentivos (sin gastar dinero):
- ✅ Plan Pro gratis por 6 meses
- ✅ Early access a nuevas features
- ✅ Su nombre en los créditos de la app
- ❌ NO pagar dinero (Amazon gift cards, etc.) - no tenemos presupuesto
```

### 3. Preguntas Clave para PyMEs Mexicanas

**Contexto financiero:**

- ¿Cómo llevas tus cuentas actualmente? (Excel, cuaderno, contador externo?)
- ¿Qué es lo más estresante de declarar impuestos?
- ¿Has tenido broncas con el SAT? ¿Cuál fue el peor momento?

**Tecnología:**

- ¿Qué celular usas? (Android/iPhone, modelo, año)
- ¿Qué tan rápido es tu internet? (WiFi casa, datos móviles, combo?)
- ¿Usas apps de banco? ¿Cuál te gusta más y por qué?

**Pain Points:**

- Si pudieras eliminar UNA cosa de tu día relacionada con finanzas, ¿qué sería?
- ¿Qué te da más miedo: el SAT, quedarte sin dinero, o no entender los números?

**Validación de solución:**

- Si PRO_FINAN te ahorrara 5 horas al mes, ¿cuánto pagarías? (pricing research)
- ¿Qué features debe tener SÍ O SÍ para que dejes tu método actual?

---

## 🔗 Referencias

- **Guerrilla User Research:** Steve Krug ("Rocket Surgery Made Easy").
- **The Mom Test:** Rob Fitzpatrick (cómo hacer preguntas que no mientan).
- **PostHog Docs:** https://posthog.com/docs/session-replay
- **Lean Customer Development:** Cindy Alvarez.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Guerrilla Research, Cero Presupuesto)*
