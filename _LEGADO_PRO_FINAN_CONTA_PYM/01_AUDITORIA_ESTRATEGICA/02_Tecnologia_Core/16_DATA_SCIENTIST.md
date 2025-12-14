# 👨‍🔬 Perfil 16: Data Scientist (AI Logic)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Data Scientist implementa la lógica de inteligencia artificial para la categorización automática de gastos, detección de anomalías y proyecciones de flujo de efectivo. Utiliza modelos ligeros o APIs externas (OpenAI/Cloudflare AI) según la configuración.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Integración AI | ✅ Firebase AI Logic | `AGENTS.md` (Mencionado en MCP) |
| Cloudflare AI | ✅ Configurado | `AGENTS.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| DAT-001 | **Categorizador de Movimientos Bancarios (NLP)** | 🔴 Bloqueante | `src/lib/server/ai/categorizer.ts` | Sem 2 |
| DAT-002 | **Forecasting de Flujo de Caja (Regresión)** | 🟠 Alto | `src/lib/server/ai/forecasting.ts` | Sem 3 |
| DAT-003 | Chatbot Asistente Financiero (RAG) | 🟡 Medio | Feature | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Categorizador Simple (Reglas + AI Fallback)

Sistema híbrido: Primero reglas deterministas (rápido), luego AI (inteligente).

```typescript
// src/lib/server/ai/categorizer.ts
import { runAiModel } from './providers/cloudflare'; // Wrapper hipotético

const RULES = [
  { pattern: /UBER|DIDI/i, category: 'TRANSPORTE' },
  { pattern: /STARBUCKS|OXXO/i, category: 'ALIMENTOS' },
  { pattern: /CFE|TELMEX/i, category: 'SERVICIOS' },
];

export async function categorizeTransaction(description: string, amount: number) {
  // 1. Intentar reglas regex (Costo cero, latencia cero)
  for (const rule of RULES) {
    if (rule.pattern.test(description)) {
      return { category: rule.category, confidence: 1.0, method: 'RULE' };
    }
  }

  // 2. Fallback a AI (Costo API, mayor latencia)
  try {
    const prompt = `Categoriza este gasto bancario en una palabra (ALIMENTOS, TRANSPORTE, SERVICIOS, SALUD, OCIO, OTROS): "${description}"`;
    const result = await runAiModel('@cf/meta/llama-3-8b-instruct', prompt);
    return { category: result.trim(), confidence: 0.8, method: 'AI' };
  } catch (e) {
    return { category: 'OTROS', confidence: 0.0, method: 'DEFAULT' };
  }
}
```

### 2. Forecasting Lineal Simple

Para la versión 1, una regresión lineal simple sobre el histórico de saldos.

```typescript
// src/lib/server/ai/forecasting.ts
import regression from 'regression'; // Librería npm

export function predictNextMonthBalance(history: { date: number, balance: number }[]) {
  const data = history.map(h => [h.date, h.balance]);
  const result = regression.linear(data);

  const nextMonthDate = new Date().setMonth(new Date().getMonth() + 1);
  const prediction = result.predict(nextMonthDate);

  return prediction[1]; // Saldo estimado
}
```

---

## 🔗 Referencias

- **Cloudflare Workers AI:** Inferencia en el borde (barato y rápido).
- **TensorFlow.js:** Opción para correr modelos en el cliente si es necesario.

---

*Última actualización: 9 Diciembre 2025*
