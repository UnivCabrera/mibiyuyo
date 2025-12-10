# 📱 Perfil 36: Monitor DOF Automatizado (Ex-Community Manager)

**Auditoría Estratégica - Bloque E: Negocio y Growth**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Community Manager por $25k-35k MXN/mes + Buffer/Hootsuite ($15-99 USD/mes) para gestionar redes sociales y crisis."

### ✅ La Verdad Sin Dinero:

**NO vamos a pagar por herramientas de social media ni contratar CM para postear memes.** La estrategia es **Monitor del DOF (Diario Oficial de la Federación)** automatizado con IA que nos da autoridad y contenido instantáneo.

El "Community Manager" es un **cronjob en Dokploy** que escanea el DOF cada 6 horas + Founder generando contenido cuando hay alertas.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Community Manager | Founder + IA (ChatGPT) | $20/mes (OpenAI) |
| Buffer/Hootsuite | Scripts + APIs nativas | $0 |
| Monitor de noticias | DOF Scraper (cronjob) | $0 |
| Crisis management | Protocolo automatizado | $0 |
| Analytics social media | PostHog (ya implementado) | $0 |

**Cuándo contratar:** Cuando tengamos 10k+ seguidores Y necesitemos engagement diario profesional. Entonces contratar CM freelance ($5k-8k/mes).

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| PostHog Analytics | ✅ Implementado | `01_AUDITORIA_ESTRATEGICA/04_Producto_Humano/28_DATA_ANALYST.md` |
| WhatsApp API | ✅ Implementado | Baileys (ya configurado) |
| Blog SvelteKit | ✅ Implementado | Perfil 32 (Marketing Lead) |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| COM-001 | **DOF Scraper (Cronjob)** | 🔴 Bloqueante | Bun + Cheerio | $0 | Sem 1 |
| COM-002 | **IA Summarizer (DOF → Contenido)** | 🔴 Bloqueante | OpenAI API | $20/mes | Sem 1 |
| COM-003 | **Protocolo de Crisis SAT** | 🟠 Alto | Markdown Docs | $0 | Sem 2 |
| COM-004 | **Social Media API Integrations** | 🟡 Medio | Twitter/LinkedIn APIs | $0 | Sem 3 |
| COM-005 | ~~Buffer/Hootsuite~~ | ❌ Descartado | N/A | $15-99 USD/mes ⛔ | Nunca |
| COM-006 | ~~Contratar Community Manager~~ | ❌ Descartado | N/A | $25k-35k/mes ⛔ | Fase 10k+ |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. DOF Monitor (Scraper Automatizado)

El **Diario Oficial de la Federación** publica todas las regulaciones fiscales nuevas. Queremos ser los primeros en explicarlas.

```typescript
// src/lib/server/scraping/dof-monitor.ts
import { JSDOM } from 'jsdom';
import { db } from '$lib/server/db';
import { sendWhatsApp } from '$lib/server/channels/whatsapp';

const DOF_URL = 'https://www.dof.gob.mx/index.php';

// Keywords que nos interesan
const FISCAL_KEYWORDS = [
  'SAT',
  'RESICO',
  'Código Fiscal',
  'Ley del Impuesto',
  'factura electrónica',
  'CFDI',
  'complemento de pago',
  'carta porte',
  'Anexo 20',
  'Resolución Miscelánea Fiscal',
  'declaración anual'
];

export async function scrapeDOF() {
  try {
    // 1. Fetch página principal del DOF
    const response = await fetch(DOF_URL);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // 2. Extraer publicaciones del día
    const publications = document.querySelectorAll('.publicacion');
    const relevantPublications = [];

    for (const pub of publications) {
      const title = pub.querySelector('.titulo')?.textContent || '';
      const link = pub.querySelector('a')?.href || '';
      const date = pub.querySelector('.fecha')?.textContent || '';

      // 3. Filtrar por keywords fiscales
      const isRelevant = FISCAL_KEYWORDS.some(keyword =>
        title.toLowerCase().includes(keyword.toLowerCase())
      );

      if (isRelevant) {
        relevantPublications.push({
          title,
          link,
          date,
          scrapedAt: new Date(),
        });
      }
    }

    // 4. Guardar en base de datos
    if (relevantPublications.length > 0) {
      await db.insert(dofPublications).values(relevantPublications);

      // 5. Notificar al Founder
      await sendWhatsApp(
        process.env.FOUNDER_PHONE!,
        `🚨 DOF Monitor: ${relevantPublications.length} publicaciones fiscales nuevas hoy:\\n\\n` +
        relevantPublications.map(p => `• ${p.title}\\n${p.link}`).join('\\n\\n')
      );
    }

    return relevantPublications;
  } catch (error) {
    console.error('Error scraping DOF:', error);
    return [];
  }
}
```

**Schema de Base de Datos:**
```typescript
// src/lib/server/db/schema/dof.ts
import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';

export const dofPublications = pgTable('community_dof_publications', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  link: text('link').notNull(),
  date: text('date').notNull(),
  summary: text('summary'), // Generado por IA
  contentGenerated: boolean('content_generated').default(false),
  blogPostSlug: text('blog_post_slug'), // Link al artículo generado
  scrapedAt: timestamp('scraped_at').defaultNow(),
});
```

---

### 2. Cronjob en Dokploy (BullMQ)

```typescript
// src/lib/server/jobs/dof-monitor-job.ts
import { Queue, Worker } from 'bullmq';
import { scrapeDOF } from '$lib/server/scraping/dof-monitor';

const queue = new Queue('dof-monitor', {
  connection: {
    host: process.env.REDIS_HOST,
    port: 6379,
  },
});

// Programar ejecución cada 6 horas
export async function scheduleDOFMonitor() {
  await queue.add(
    'scrape-dof',
    {},
    {
      repeat: {
        pattern: '0 */6 * * *', // Cada 6 horas
      },
    }
  );
}

// Worker que ejecuta el scraping
const worker = new Worker(
  'dof-monitor',
  async (job) => {
    console.log('🔍 Iniciando scraping DOF...');
    const publications = await scrapeDOF();
    console.log(`✅ Encontradas ${publications.length} publicaciones relevantes`);
    return publications;
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: 6379,
    },
  }
);
```

---

### 3. IA Summarizer (DOF → Contenido para Blog)

```typescript
// src/lib/server/ai/dof-to-blog.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateBlogPostFromDOF(
  dofTitle: string,
  dofLink: string
) {
  // 1. Fetch contenido completo del DOF
  const response = await fetch(dofLink);
  const html = await response.text();
  const dom = new JSDOM(html);
  const fullText = dom.window.document.body.textContent || '';

  // 2. Extraer texto relevante (primeros 5000 caracteres)
  const excerpt = fullText.slice(0, 5000);

  // 3. Generar artículo con ChatGPT
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Eres un experto fiscal mexicano. Tu audiencia son PyMEs que no entienden lenguaje técnico del SAT.

Instrucciones:
- Explica en lenguaje simple y directo (tuteo)
- Usa ejemplos concretos mexicanos
- Evita jargón legal innecesario
- Incluye "Qué hacer ahora" al final
- Tono: Calmado pero urgente si aplica
- Máximo 1500 palabras`,
      },
      {
        role: 'user',
        content: `El Diario Oficial de la Federación publicó hoy:

**Título:** ${dofTitle}

**Extracto del documento:**
${excerpt}

Genera un artículo de blog que explique:
1. ¿Qué cambió?
2. ¿A quién afecta? (RESICO, RIF, Moral, etc.)
3. ¿Cuándo entra en vigor?
4. ¿Qué debo hacer? (Pasos específicos)

Formato Markdown con:
- Título SEO-friendly
- Introducción que enganche
- Subtítulos claros (##)
- Lista de acción al final`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const blogContent = completion.choices[0].message.content;

  // 4. Guardar en base de datos
  await db.update(dofPublications)
    .set({
      summary: blogContent,
      contentGenerated: true,
    })
    .where(eq(dofPublications.title, dofTitle));

  return blogContent;
}
```

**Workflow Completo:**
```
1. Cronjob cada 6 horas → Scrape DOF
2. Si encuentra publicación relevante → WhatsApp al Founder
3. Founder revisa → Trigger IA Summarizer
4. IA genera draft del artículo → Founder edita/publica
5. Artículo se publica en blog → Notificar suscriptores (Listmonk)
6. Compartir en redes sociales (manual o automatizado)
```

---

### 4. Protocolo de Crisis (Ejemplo: SAT Caído)

```markdown
# 🚨 Protocolo de Crisis: SAT Fuera de Servicio

## Situación
El portal del SAT está caído o lento. Los usuarios entran en pánico.

## Objetivos
1. Calmar ansiedad
2. Dar información factual
3. Posicionar a FinanzasMX como autoridad confiable

## Acciones Inmediatas (en 15 minutos)

### 1. Verificar Situación
- [ ] Confirmar downtime en https://downdetector.mx/fallas/sat/
- [ ] Revisar Twitter @SATMX para comunicados oficiales
- [ ] Verificar en grupos de Facebook de contadores

### 2. Publicar Mensaje Calmante

**Twitter/X:**
```
⚠️ El portal del SAT presenta fallas desde las [hora].

Esto NO afecta la validez de tus facturas emitidas.
NO hay multas por no poder declarar si el sistema está caído.

Mantente tranquilo. Te avisamos cuando se restablezca.

#SAT #SATCaido #México
```

**WhatsApp (broadcast a usuarios activos):**
```
Hola 👋

Sabemos que el portal del SAT está caído.

📌 Lo importante:
✅ Tus facturas emitidas SÍ son válidas
✅ NO habrá multas si no pudiste declarar (es falla del SAT)
✅ El SAT dará prórroga automática

🔔 Te avisaremos cuando se restablezca el servicio.

Mientras tanto, puedes seguir facturando normal en FinanzasMX.

Equipo FinanzasMX
```

### 3. Artículo de Blog Rápido (30 minutos)

**Título:** "SAT Caído [Fecha]: Qué Hacer Si No Puedes Declarar"

**Contenido:**
- Confirmar downtime oficial
- Citar artículo del CFF sobre prórrogas por caso fortuito
- Explicar qué SÍ se puede hacer (seguir facturando)
- Explicar qué NO se puede hacer (descargar XMLs, presentar declaraciones)
- FAQ rápido

### 4. Monitoreo Activo
- [ ] Revisar cada 30 min el status del SAT
- [ ] Publicar actualización cuando se restablezca
- [ ] Dar mensaje de "Todo normal" al final del día

---

## Post-Crisis (Siguiente semana)

### Contenido Educativo
Publicar artículo: "Cómo Prepararte para Cuando el SAT Falle (Tips de Resiliencia Fiscal)"

### Análisis Interno
- ¿Cuántos usuarios nos contactaron?
- ¿El mensaje calmó o generó más dudas?
- ¿Qué mejorar para la próxima crisis?
```

---

### 5. Social Media Automation (Opcional, Fase 2)

```typescript
// src/lib/server/social/auto-post.ts
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export async function postToTwitter(content: string, link?: string) {
  try {
    const tweet = link ? `${content}\\n\\n${link}` : content;
    await twitterClient.v2.tweet(tweet);
    console.log('✅ Posted to Twitter');
  } catch (error) {
    console.error('Error posting to Twitter:', error);
  }
}

// Uso:
// await postToTwitter(
//   '📰 Nuevo en el blog: Cómo Facturar RESICO en 2025',
//   'https://finanzasmx.app/blog/como-facturar-resico-2025'
// );
```

---

## 💰 Proyección de Autoridad (6 Meses)

### Escenario Conservador:

- **Publicaciones DOF detectadas:** 20-30/mes
- **Artículos generados:** 4-6/mes (solo los más relevantes)
- **Engagement en redes:** 500-1,000 impresiones/post
- **Posicionamiento:** "La app que te avisa cuando el SAT cambia algo"

### Escenario Optimista:

- **Artículos generados:** 10-12/mes
- **Engagement:** 5,000-10,000 impresiones/post
- **Menciones en medios:** 2-3 medios fiscales nos citan
- **Posicionamiento:** "La fuente #1 de noticias fiscales para PyMEs"

**ROI del Monitor DOF:**

- Costo: $20 USD/mes (OpenAI API)
- Beneficio: Autoridad + SEO + Diferenciación de competencia
- **Valor intangible:** Priceless (no tiene equivalente en el mercado)

---

## 💡 Mentalidad Bootstrap: Automatización Inteligente

### Qué hace el Sistema (automatizado):

1. **Cada 6 horas:** Escanear DOF por keywords fiscales
2. **Si encuentra algo:** WhatsApp al Founder
3. **Founder decide:** "¿Vale la pena un artículo?" (5 min de análisis)
4. **Si sí:** Trigger IA para generar draft (10 min)
5. **Founder edita:** Ajustar tono, agregar insights (20 min)
6. **Publicar:** Blog + redes sociales (5 min)
7. **Notificar:** Suscriptores vía Listmonk (automático)

**Tiempo total del Founder:** 40 min/artículo (vs 3 horas escribiendo desde cero)

### Cuándo contratar Community Manager:

- **Trigger:** >10k seguidores en redes Y necesitamos engagement diario.
- **Perfil ideal:** Freelance con conocimiento fiscal básico, copywriter.
- **Compensación:** $5k-8k/mes part-time (10 hrs/semana).

### Resumen de Ahorro:

| Concepto | Costo Tradicional | Costo Bootstrap | Ahorro Anual |
|:---------|:------------------|:----------------|:-------------|
| Community Manager | $25k-35k/mes × 12 | $0 (Founder + IA) | $300k-420k/año |
| Buffer/Hootsuite | $15-99 USD/mes × 12 | $0 (APIs nativas) | $3.6k-24k/año |
| News monitoring service | $100-300 USD/mes × 12 | $0 (DOF scraper) | $24k-72k/año |
| Content Writer (crisis) | $5k/evento × 12 | $0 (IA + Founder) | $60k/año |
| OpenAI API | N/A | $20 USD/mes × 12 | -$4.8k/año (nuevo gasto) |
| **TOTAL AHORROS** | **$387k-576k/año** | **$4.8k/año** | **$382k-571k/año** |

---

## 🔗 Referencias

- **DOF (Diario Oficial):** https://www.dof.gob.mx/
- **OpenAI API Pricing:** https://openai.com/api/pricing/
- **Twitter API v2 Docs:** https://developer.twitter.com/
- **Crisis Communication Playbook:** Best practices para crisis management.

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap (Monitor Automatizado, IA-Assisted, Autoridad Fiscal)*
