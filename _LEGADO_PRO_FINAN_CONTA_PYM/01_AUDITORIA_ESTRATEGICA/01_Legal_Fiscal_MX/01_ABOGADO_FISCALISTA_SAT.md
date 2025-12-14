# 👨‍⚖️ Perfil 01: Validador SAT Automatizado (Ex-Abogado Fiscalista)

**Auditoría Estratégica - Bloque A: Legal y Fiscal México**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Contexto:** Bootstrap + México Profundo
**Fecha:** 9 Diciembre 2025

---

## 🚨 REALIDAD BOOTSTRAP + MÉXICO PROFUNDO

### ❌ El Mito Corporativo:

"Necesitamos contratar un Abogado Fiscalista Senior con Maestría en Fiscal por $60k-80k MXN/mes para interpretar las reglas del SAT y validar CFDIs."

### ✅ La Verdad Sin Dinero:

**NO vamos a contratar a nadie.** El 95% del trabajo de "cumplimiento fiscal" es validar campos contra catálogos públicos del SAT (XML/JSON). Eso es **programable**. El 5% restante (interpretación legal compleja) lo resolvemos:

1. **Consultando el Anexo 20 del SAT** (gratis, público).
2. **Usando ChatGPT/Claude para casos edge** (gratis/barato).
3. **Contratando abogado por evento** ($5k-10k MXN, 2-3 veces al año) solo si nos audita el SAT.

### 🎯 Estrategia de Sustitución:

| Función Original | Solución Bootstrap | Costo |
|:-----------------|:-------------------|:------|
| Validar estructura CFDI | Script TypeScript con xml2js | $0 |
| Verificar RFC contra 69-B | Web scraping SAT (lista pública) | $0 |
| Consultar Buzón Tributario | API interna (CIEC/FIEL) | $0 |
| Asesoría legal puntual | Abogado freelance (bajo demanda) | $5k-10k/evento |

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| CFDI 4.0 y 5.0 documentación | ✅ Completo | `PROJECT_CHARACTERISTICS/02_CONTABILIDAD_SAT.md` |
| Validaciones RFC hardcodeadas | ✅ Completo | `AGENTS.md` (Regex MX) |
| Catálogos SAT (c_ClaveUnidad, etc.) | ✅ Mencionado | Seeds en PostgreSQL |
| Seguridad CIEC/FIEL | ✅ Completo | `12_SEGURIDAD_SAT_CIEC_FIEL/` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Herramienta | Costo | Timeline |
|:-------|:------------|:----------|:------------|:------|:---------|
| LEG-001 | **Validador CFDI (XML Schema XSD 4.0)** | 🔴 Bloqueante | xml2js + ajv | $0 | Sem 1 |
| LEG-002 | **Scraper Lista 69-B (SAT)** | 🟠 Alto | Cheerio + Cron | $0 | Sem 2 |
| LEG-003 | Seeds de Catálogos SAT en PostgreSQL | 🟠 Alto | JSON → Drizzle | $0 | Sem 1 |
| LEG-004 | ~~Contratar Abogado Fiscalista~~ | ❌ Descartado | N/A | $60k/mes ⛔ | Nunca |

---

## 📝 ACTION ITEMS: Implementación (Stack Gratuito)

### 1. Validador CFDI (XSD 4.0) - ElysiaJS + xml2js

Validar la estructura del XML contra el esquema oficial del SAT.

```typescript
// src/lib/server/sat/cfdi-validator.ts (Bun + ElysiaJS)
import { parseStringPromise } from 'xml2js';
import Ajv from 'ajv';

export async function validateCFDI(xmlString: string): Promise<ValidationResult> {
  try {
    // 1. Parsear XML
    const cfdi = await parseStringPromise(xmlString);

    // 2. Validar campos obligatorios
    const errors: string[] = [];
    if (!cfdi['cfdi:Comprobante']?.['$']?.Folio) {
      errors.push('Falta el campo Folio');
    }
    if (!cfdi['cfdi:Comprobante']?.['cfdi:Emisor']) {
      errors.push('Falta el nodo Emisor');
    }

    // 3. Validar RFC formato
    const rfcEmisor = cfdi['cfdi:Comprobante']['cfdi:Emisor'][0]['$'].Rfc;
    if (!validateRFC(rfcEmisor)) {
      errors.push(`RFC Emisor inválido: ${rfcEmisor}`);
    }

    return { isValid: errors.length === 0, errors };
  } catch (err) {
    return { isValid: false, errors: ['XML malformado'] };
  }
}

// Regex mexicanos (de AGENTS.md)
export const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
export const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/;

export function validateRFC(rfc: string): boolean {
  return RFC_REGEX.test(rfc.toUpperCase().trim());
}
```

### 2. Scraper Lista 69-B (Actualización Mensual)

El SAT publica la lista de contribuyentes con operaciones presuntamente inexistentes (EFOS).

```typescript
// src/lib/server/sat/lista-69b-scraper.ts
import * as cheerio from 'cheerio';

export async function updateBlacklist69B() {
  const url = 'http://omawww.sat.gob.mx/cifras_sat/Paginas/datos/vinculo.html?page=ListCompleta69B.html';

  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);

  const rfcs: string[] = [];
  $('table tr').each((i, el) => {
    const rfc = $(el).find('td').first().text().trim();
    if (rfc && validateRFC(rfc)) {
      rfcs.push(rfc);
    }
  });

  // Guardar en PostgreSQL
  await db.insert(blacklist69B).values(rfcs.map(rfc => ({ rfc, updatedAt: new Date() })));
  console.log(`✅ Actualizados ${rfcs.length} RFCs en lista 69-B`);
}

// Ejecutar 1 vez al mes (Cron Job en Dokploy)
```

---

## 🇲🇽 Adaptación México Profundo

### 1. Lenguaje Anti-Pánico

El usuario mexicano tiene **miedo al SAT**. Nuestros mensajes de error deben ser tranquilizadores, no técnicos.

**❌ MAL:**
> "Error XSD-001: Violación del esquema en el nodo cfdi:Complemento. Validación fallida contra anexo20.xsd línea 847."

**✅ BIEN:**
> "Parece que falta un dato en tu factura (el complemento). ¿Quieres que lo revisemos juntos? [Agendar 5 min con soporte]"

### 2. Diseño para Conexión Lenta

El validador de CFDI debe ser **ultra ligero**. No cargar librerías pesadas en el frontend.

- **Frontend (Svelte):** Solo sube el XML al backend.
- **Backend (ElysiaJS):** Procesa y regresa JSON simple con errores.
- **Tamaño respuesta:** < 5 KB (para 3G lento).

### 3. Desconfianza Institucional

El usuario NO confía en "el sistema". Debe poder **ver el XML original** que generamos.

```svelte
<!-- Botón de transparencia -->
<Button variant="ghost" on:click={() => downloadXML()}>
  📄 Descargar XML Original (sin modificaciones)
</Button>
```

---

## 💡 Mentalidad Bootstrap: Founder como "Legalista Autodidacta"

### Qué hace el Founder (primeros 6 meses):

1. **Leer el Anexo 20 del SAT** (documento público, 200 páginas).
2. **Usar ChatGPT para casos edge:** "¿Qué pasa si el RFC tiene homoclave genérica?"
3. **Contratar abogado solo si:** Nos audita el SAT o tenemos demanda fiscal.

### Cuándo contratar abogado fiscalista:

- **Trigger:** Primera auditoría del SAT o 1,000+ usuarios.
- **Costo estimado:** $5k-10k MXN por consultoría puntual (2-3 veces al año).
- **Alternativa:** Abogado freelance en LinkedIn (buscar "Fiscalista SAT México").

---

## 🔗 Referencias

- **Anexo 20 del SAT:** Guía de llenado CFDI 4.0 (Gratis, portal SAT).
- **xml2js (NPM):** Parser de XML para Node.js/Bun.
- **Cheerio (NPM):** Web scraping (estilo jQuery para Node.js).
- **Lista 69-B:** http://omawww.sat.gob.mx/cifras_sat/Paginas/datos/vinculo.html?page=ListCompleta69B.html

---

*Última actualización: 9 Diciembre 2025*
*Modo: Bootstrap Survival (Sin Capital Inicial)*

---

## 📊 Métricas de Cumplimiento

| Métrica | Target | Estado Actual |
|:--------|:-------|:--------------|
| Validación RFC correcta | 100% | ✅ Implementado |
| Validación CFDI estructura | 100% | ⚠️ Pendiente |
| Consulta listas 69-B | <2s | ⚠️ Pendiente |
| Descarga masiva SAT | Funcional | ⚠️ Pendiente |

---

## 📚 Referencias Legales

- **Anexo 20 SAT:** Estructura XML CFDI 4.0
- **Resolución Miscelánea Fiscal 2025**
- **Código Fiscal de la Federación**
- **Ley del ISR / IVA**

---

## 🔗 Documentos Relacionados

- `PROJECT_CHARACTERISTICS/02_CONTABILIDAD_SAT.md`
- `12_SEGURIDAD_SAT_CIEC_FIEL/DISEÑO_SEGURIDAD_SAT_CIEC_FIEL.md`
- `07_INTEGRACIONES.md` (sección PAC)

---

*Última actualización: 8 Diciembre 2025*
