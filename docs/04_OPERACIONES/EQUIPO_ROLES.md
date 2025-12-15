# 👥 EQUIPO MIBIYUYO — ROLES Y RESPONSABILIDADES

> **Versión:** 1.0
> **Fecha:** 14 Diciembre 2025
> **Equipo:** 6 personas
> **Presupuesto inicial:** $1,000 MXN ($200 MXN × 5 aportantes)

---

## 🎯 MODELO OPERATIVO

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MODELO DE APORTES MENSUALES                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   📊 POR PERSONA:                                                       │
│   • Hasta 6 aportes estratégicos/mes                                   │
│   • 1 feature visible liberado/mes                                     │
│   • 5 aportes internos (no visibles)                                   │
│                                                                         │
│   📈 POR EQUIPO (6 personas):                                          │
│   • 6 features visibles/mes                                            │
│   • 30 aportes internos/mes                                            │
│                                                                         │
│   💡 FILOSOFÍA: Calidad sobre cantidad                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ ESTRUCTURA DEL EQUIPO

```
                        ┌─────────────────────┐
                        │   PRODUCT OWNER     │
                        │   (Visión/Decisión) │
                        └──────────┬──────────┘
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
┌────────┴────────┐      ┌────────┴────────┐      ┌────────┴────────┐
│    FRONTEND     │      │     BACKEND     │      │   UX/DISEÑO     │
│  (UI/Svelte 5)  │      │  (API/ElysiaJS) │      │  (Flujos/Copy)  │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                                                 │
┌────────┴────────┐                              ┌────────┴────────┐
│   SEGURIDAD     │                              │   QA/MÉTRICAS   │
│  (Audit/Comply) │                              │  (Testing/Data) │
└─────────────────┘                              └─────────────────┘
```

---

## 📋 ROL 1: PRODUCT OWNER (PO)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | Visión de producto, priorización, comunicación |
| **Tiempo estimado** | 15-20 horas/mes |
| **Habilidades** | Liderazgo, comunicación, análisis |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Definición y lanzamiento del feature mensual |
| 2 | Backlog priorizado | Interno | Lista ordenada de tareas próximas |
| 3 | OKRs del mes | Interno | Objetivos y resultados clave |
| 4 | Meeting semanal | Interno | Coordinación de equipo |
| 5 | Decisiones documentadas | Interno | Registro de trade-offs |
| 6 | Comunicación externa | Interno | Changelog, anuncios |

### Herramientas Sugeridas

- Linear (gestión de issues) — MCP disponible
- Notion/Obsidian (documentación)
- Discord/Slack (comunicación)

---

## 📋 ROL 2: DESARROLLADOR FRONTEND (FE)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | UI/UX técnica, componentes, PWA |
| **Tiempo estimado** | 25-30 horas/mes |
| **Stack** | Svelte 5, SvelteKit 2, CSS + Open Props |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Componente/página funcional |
| 2 | Componentes UI | Interno | shadcn-svelte customizados |
| 3 | PWA improvements | Interno | Service worker, offline |
| 4 | Testing E2E | Interno | Playwright tests |
| 5 | Performance | Interno | Lighthouse audit |
| 6 | Accesibilidad | Interno | WCAG compliance |

### Reglas de Código (Svelte 5)

```svelte
<!-- ✅ CORRECTO - Svelte 5 con Runes -->
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);

  let { name, age = 18 } = $props<{ name: string; age?: number }>();

  $effect(() => {
    console.log('Count changed:', count);
  });
</script>

<button onclick={() => count++}>
  Clicks: {count}
</button>

<style>
  button {
    padding: var(--size-3);
    border-radius: var(--radius-2);
    background: var(--green-6);
  }
</style>
```

### Prohibiciones

- ❌ NO usar `$:` statements (legacy)
- ❌ NO usar `on:` directive (usar `onclick`)
- ❌ NO usar `<slot>` (usar Snippets)
- ❌ NO usar Tailwind CSS

### MCPs Disponibles

- `svelte` — Documentación oficial
- `shadcn` — Componentes UI
- `css` — Documentación CSS
- `vite` — Build tool

---

## 📋 ROL 3: DESARROLLADOR BACKEND (BE)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | API, base de datos, integraciones |
| **Tiempo estimado** | 25-30 horas/mes |
| **Stack** | Bun, ElysiaJS, Drizzle ORM, PostgreSQL, Redis |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Endpoint/lógica funcional |
| 2 | Migraciones DB | Interno | Schema changes |
| 3 | API documentation | Interno | OpenAPI spec |
| 4 | Redis caching | Interno | Performance |
| 5 | Testing unitario | Interno | Vitest tests |
| 6 | Logs/monitoring | Interno | Sentry integration |

### Estructura de API (ElysiaJS)

```typescript
// src/server/routes/transactions.ts
import { Elysia, t } from 'elysia';
import { db } from '../db';

export const transactionsRoutes = new Elysia({ prefix: '/transactions' })
  .get('/', async ({ query }) => {
    // Listar transacciones
    return db.query.transactions.findMany({
      where: eq(transactions.userId, query.userId),
      orderBy: desc(transactions.date),
    });
  })
  .post('/', async ({ body }) => {
    // Crear transacción
    return db.insert(transactions).values(body).returning();
  }, {
    body: t.Object({
      amount: t.Number(),
      category: t.String(),
      description: t.Optional(t.String()),
    })
  });
```

### MCPs Disponibles

- `postgres` — Queries directas
- `redis` — Cache operations
- `zod` — Validación schemas

---

## 📋 ROL 4: UX/DISEÑO (UX)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | Flujos, copy, investigación, diseño visual |
| **Tiempo estimado** | 20-25 horas/mes |
| **Herramientas** | Figma, Maze, Typeform |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Diseño + copy de feature |
| 2 | Wireframes | Interno | Bocetos de próximas features |
| 3 | Microcopy | Interno | Mensajes, errores, tooltips |
| 4 | Investigación | Interno | 3-5 entrevistas con usuarios |
| 5 | Guía de estilo | Interno | Sistema de diseño |
| 6 | Usability tests | Interno | Sesiones con usuarios reales |

### Framework de Mensajería (Neurofinanzas)

| Contexto | ❌ Evitar | ✅ Usar |
|:---|:---|:---|
| Exceder presupuesto | "Excediste tu límite" | "Te pasaste un poco, ajustemos" |
| Saldo bajo | "Saldo bajo: $234" | "Tienes $234 disponibles" |
| Meta no alcanzada | "No cumpliste tu meta" | "Llegaste al 78%. ¡Casi!" |
| Error | "Error al procesar" | "Dame un segundo..." |

### Paleta de Colores

```css
/* Primarios (Positivos) */
--green-primary: #10B981;    /* Éxito, dinero disponible */
--blue-trust: #3B82F6;       /* Confianza, acciones */

/* Alertas (Usar con moderación) */
--yellow-attention: #F59E0B;  /* Atención suave */
--orange-warning: #F97316;    /* Urgencia */
--red-danger: #EF4444;        /* SOLO destructivo */

/* Premium */
--purple-pro: #8B5CF6;        /* Features PRO */
```

---

## 📋 ROL 5: ESPECIALISTA EN SEGURIDAD (SEC)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | Auditoría, compliance, encriptación |
| **Tiempo estimado** | 15-20 horas/mes |
| **Conocimientos** | OWASP, LFPDPPP, encriptación |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Panel de seguridad/legal visible |
| 2 | Audit dependencias | Interno | npm audit, Snyk |
| 3 | Penetration testing | Interno | Testing manual de vulnerabilidades |
| 4 | Backup verification | Interno | Restore test |
| 5 | Rotación secrets | Interno | Cambio de API keys |
| 6 | Documentación compliance | Interno | LFPDPPP, términos |

### Checklist Semanal

- [ ] Revisar logs de acceso (fail2ban)
- [ ] Verificar certificados SSL
- [ ] Monitorear Sentry por anomalías
- [ ] Actualizar dependencias críticas
- [ ] Revisar intentos de login fallidos

### Estándares No Negociables

| Área | Implementación |
|:---|:---|
| **Passwords** | bcrypt con salt, mínimo 12 caracteres |
| **Sesiones** | Rotation en cada login, Redis |
| **Datos en tránsito** | TLS 1.3 obligatorio |
| **Datos en reposo** | AES-256 para datos sensibles |
| **Rate limiting** | 5 intentos / 15 min |
| **2FA** | TOTP opcional (obligatorio para admin) |

---

## 📋 ROL 6: QA / MÉTRICAS (QA)

### Perfil

| Aspecto | Descripción |
|:---|:---|
| **Responsabilidad** | Testing, analytics, documentación |
| **Tiempo estimado** | 20-25 horas/mes |
| **Herramientas** | Playwright, Vitest, Sentry, BetterStack |

### Entregables Mensuales

| # | Entregable | Tipo | Descripción |
|:---:|:---|:---:|:---|
| 1 | **Feature visible** | Visible | Sistema de feedback/ayuda |
| 2 | Suite de tests | Interno | E2E + unitarios nuevos |
| 3 | Dashboard métricas | Interno | KPIs visualizados |
| 4 | Bug triage | Interno | Issues priorizados |
| 5 | Documentación usuario | Interno | Help center, FAQs |
| 6 | Reportes semanales | Interno | Estado de calidad |

### Métricas a Trackear

| Categoría | Métrica | Herramienta |
|:---|:---|:---|
| **Adquisición** | Registros/día | Analytics |
| **Activación** | % completa onboarding | Eventos |
| **Retención** | D1, D7, D30 | Cohortes |
| **Revenue** | MRR, conversión | Stripe |
| **Calidad** | Bugs/sprint, crash rate | Sentry |

---

## 📅 CICLO MENSUAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CICLO MENSUAL DE TRABAJO                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   SEMANA 1: PLANIFICACIÓN                                              │
│   ├── Lunes: Kickoff meeting (1h)                                      │
│   ├── Definir features del mes                                         │
│   ├── Asignar responsabilidades                                        │
│   └── Setup de ambiente si necesario                                   │
│                                                                         │
│   SEMANA 2-3: DESARROLLO                                               │
│   ├── Trabajo individual o en parejas                                  │
│   ├── Check-ins diarios (async, Discord)                              │
│   ├── Code reviews (PR obligatorio)                                    │
│   └── Testing continuo                                                  │
│                                                                         │
│   SEMANA 4: INTEGRACIÓN                                                │
│   ├── Testing conjunto                                                  │
│   ├── Documentación                                                     │
│   ├── Release (viernes)                                                 │
│   └── Retrospectiva (domingo)                                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 🤝 MATRIZ RACI

| Actividad | PO | FE | BE | UX | SEC | QA |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| Definir feature | **R/A** | C | C | C | I | I |
| Diseño UI | I | C | I | **R/A** | I | I |
| Implementación FE | I | **R/A** | C | C | C | C |
| Implementación BE | I | C | **R/A** | I | C | C |
| Seguridad | I | C | C | I | **R/A** | C |
| Testing | I | C | C | I | C | **R/A** |
| Release | **A** | R | R | I | C | R |
| Comunicación | **R/A** | I | I | C | I | C |

*R=Responsable, A=Aprobador, C=Consultado, I=Informado*

---

## 💬 COMUNICACIÓN

### Canales

| Canal | Uso | Frecuencia |
|:---|:---|:---|
| **Discord #general** | Comunicación diaria | Async |
| **Discord #dev** | Técnico | Async |
| **Meeting semanal** | Sync, decisiones | 1h/semana |
| **Linear** | Issues, tracking | Continuo |
| **GitHub** | Code, PRs | Continuo |

### Reglas de Comunicación

1. **Async first**: No esperar respuesta inmediata
2. **Documentar decisiones**: Todo en Linear o docs/
3. **PR obligatorio**: No commits directos a main
4. **Review en 24h**: Máximo tiempo para revisar PR
5. **Retrospectivas honestas**: Sin culpas, con mejoras

---

## 📊 EVALUACIÓN

### Indicadores por Rol

| Rol | KPI Principal | Target Mensual |
|:---|:---|:---|
| PO | Features lanzados | 6 |
| FE | Lighthouse score | 90+ |
| BE | Uptime | 99.5% |
| UX | NPS | 40+ |
| SEC | Vulnerabilidades críticas | 0 |
| QA | Cobertura tests | 70%+ |

### Retrospectiva Mensual

Al final de cada mes:

1. ¿Qué funcionó bien?
2. ¿Qué podemos mejorar?
3. ¿Qué aprendimos?
4. Ajustes para el próximo mes

---

**Documento:** EQUIPO_ROLES.md
**Versión:** 1.0
**Fecha:** 14 Diciembre 2025
**Equipo:** 6 personas comprometidas

> *"Solos vamos más rápido, juntos llegamos más lejos."* 🚀
