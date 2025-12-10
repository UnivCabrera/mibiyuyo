# 👨‍🎨 Perfil 15: UX/UI Designer (Neurofinanzas)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Diseñador UX/UI no solo hace que la app se vea bien, sino que aplica el framework de **Neurofinanzas** definido en el proyecto. Su objetivo es reducir la carga cognitiva (Ley de Miller), reducir el cortisol (estrés financiero) y generar dopamina (logros).

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework Neuro | ✅ Completo | `05_UX_UI_DESIGN/04_NEUROFINANZAS_FRAMEWORK.md` |
| Sistema de Diseño | ✅ Tangram | `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md` |
| Paleta de Color | ✅ Psicológica | `05_UX_UI_DESIGN/01_COLORIMETRIA_PSICOLOGIA.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| UX-001 | **Implementación de Design Tokens (Open Props)** | 🔴 Bloqueante | `src/app.css` | Sem 1 |
| UX-002 | **Componentes de Feedback Positivo (Confetti/Toast)** | 🟠 Alto | `src/lib/components/feedback/` | Sem 2 |
| UX-003 | Modo "Zen" (Reducción de ruido visual) | 🟡 Medio | Feature Toggle | Fase 2 |
| UX-004 | Micro-interacciones (Svelte Transitions) | 🟡 Medio | Global | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Design Tokens con Open Props

Mapear los principios de neurofinanzas a variables CSS.

```css
/* src/app.css */
@import "open-props/style";
@import "open-props/normalize";

:root {
  /* Colores Semánticos (Neurofinanzas) */
  --color-success-dopamine: var(--green-5); /* Para logros */
  --color-alert-cortisol: var(--red-6); /* Usar con precaución */
  --color-calm-serotonin: var(--blue-4); /* Fondos y headers */

  /* Espaciado (Reducción de carga cognitiva) */
  --space-breathing: var(--size-5);

  /* Bordes (Suavidad) */
  --radius-friendly: var(--radius-3);
}

.card-achievement {
  background: var(--surface-1);
  border: 1px solid var(--color-success-dopamine);
  border-radius: var(--radius-friendly);
  padding: var(--space-breathing);
  animation: var(--animation-slide-in-up);
}
```

### 2. Componente de Logro (Dopamina)

```svelte
<!-- src/lib/components/feedback/Achievement.svelte -->
<script lang="ts">
  import { Confetti } from 'svelte-confetti'; // Librería hipotética o implementada
  let { title, points } = $props<{ title: string, points: number }>();
</script>

<div class="achievement-modal">
  <Confetti />
  <h2>¡Felicidades! 🎉</h2>
  <p>Has completado: <strong>{title}</strong></p>
  <span class="points">+{points} pts</span>
</div>

<style>
  .achievement-modal {
    /* Estilos centrados y llamativos pero no agresivos */
  }
</style>
```

---

## 🔗 Referencias

- **Neurofinanzas Framework:** Documento interno `04_NEUROFINANZAS_FRAMEWORK.md`.
- **Open Props:** Variables CSS para diseño consistente.

---

*Última actualización: 9 Diciembre 2025*
