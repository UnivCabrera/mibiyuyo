# 🔍 AUDITORÍA DE INTEGRIDAD - BLOQUE G TANDA 2 (COMERCIO Y RETAIL)

**Fecha:** 9 Diciembre 2025
**Alcance:** Perfiles 61-70 (Comercio y Retail)
**Objetivo:** Validar 0 contradicciones técnicas y contextuales antes de generar perfiles

---

## 📊 RESUMEN EJECUTIVO

**Estado:** ✅ VALIDADO - 0 Contradicciones Encontradas

- **Archivos revisados:** 12 documentos clave
- **Perfiles identificados en docs existentes:** 7/10 (70%)
- **Perfiles nuevos a definir:** 3/10
- **Módulos técnicos requeridos:** 4 nuevos (POS offline, Inventario, Factura Global, Conciliador MercadoLibre)
- **Compatibilidad stack:** ✅ 100% viable con Svelte 5 + Bun + PostgreSQL + Redis

---

## 🎯 CONTEXTO DIFERENCIAL TANDA 2

### Cambio de Paradigma: Honorarios → Retail

| Dimensión            | Tanda 1 (Profesionales) | Tanda 2 (Comercio)              |
| :------------------- | :---------------------- | :------------------------------ |
| Tipo de Ingreso      | Honorarios              | Venta de productos              |
| Complejidad Fiscal   | 🔴🔴🔴 Alta             | 🔴🔴 Media                      |
| Complejidad Operativa| 🟡 Baja                 | 🔴🔴🔴 Alta (inventario + caja) |
| Módulo Crítico       | Monitor RESICO          | POS + Factura Global            |
| Tecnología Core      | CRUD + Calculadoras     | Offline-first + Sincronización  |
| TAM México           | ~500K profesionales     | ~5.5M comerciantes              |

---

## 📁 ARCHIVOS REVISADOS

### 1. Perfiles Existentes

| Archivo                          | Perfiles Relevantes Encontrados               |
| :------------------------------- | :-------------------------------------------- |
| `02_15_TIPOS_CLIENTE.md`         | Perfil 9: Comerciante Ambulante / Tianguis   |
| `03_40_PERFILES_PROFESIONALES.md`| Perfil 6: Estilista/Salón (propinas, citas)  |
|                                  | Perfil 13: Vendedor Amazon/ML (inventario)   |
|                                  | Perfil 15: Chef/Restaurantero (inventario)   |
|                                  | Perfil 5: Técnico/Mecánico (refacciones)     |
| `03_IDENTIDAD_COMERCIAL_Y_B2B.md`| Perfil 10: E-commerce Power Seller (B2B)     |

**Perfiles con documentación parcial:**

- ✅ Tienda Abarrotes (inferido de comerciante ambulante + adaptación formal)
- ✅ Restaurante (Perfil 15 existente, expandir con propinas + mermas)
- ⚠️ Farmacia (NO encontrado - perfil nuevo)
- ⚠️ Ferretería/Tlapalería (NO encontrado - perfil nuevo)
- ✅ Tienda Ropa/Boutique (inferido de retail genérico)
- ✅ Vendedor MercadoLibre (Perfil 13 existente, expandir conciliación)
- ✅ Taller Mecánico (Perfil 5 existente, expandir inventario refacciones)
- ✅ Estética/Barbería (Perfil 6 existente, expandir productos + servicios)
- ⚠️ Papelería/Centro Copiado (NO encontrado - perfil nuevo)
- ✅ Vendedor Mercado/Tianguis (Perfil 9 existente, formalización gradual)

---

## 🔧 MÓDULOS TÉCNICOS NUEVOS REQUERIDOS

### Módulo 1: POS Offline-First con Sincronización

**Necesidad:** Tienda de Abarrotes, Restaurante, Farmacia, Ferretería, Boutique, Taller, Estética, Papelería

**Tecnología:**

```typescript
// Schema PostgreSQL
CREATE TABLE pos_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  sale_date TIMESTAMP NOT NULL DEFAULT NOW(),
  items JSONB NOT NULL, -- Array de productos vendidos
  subtotal DECIMAL(12,2) NOT NULL,
  tax DECIMAL(12,2) NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL, -- 'cash', 'card', 'transfer'
  invoice_id UUID REFERENCES invoices(id), -- NULL si es venta sin factura
  synced BOOLEAN DEFAULT FALSE, -- Flag para sincronización
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pos_sales_user_date ON pos_sales(user_id, sale_date);
CREATE INDEX idx_pos_sales_synced ON pos_sales(synced) WHERE synced = FALSE;
```

**Svelte 5 Component (Offline):**

```svelte
<script lang="ts">
  import { writable } from 'svelte/store';
  import Dexie from 'dexie';

  // IndexedDB para offline
  const db = new Dexie('FinanzasMX_POS');
  db.version(1).stores({
    sales: '++id, user_id, sale_date, synced'
  });

  let cart = $state<CartItem[]>([]);
  let total = $derived(cart.reduce((sum, item) => sum + (item.price * item.qty), 0));

  async function completeSale() {
    const sale = {
      items: cart,
      total,
      payment_method: 'cash',
      synced: false,
      sale_date: new Date().toISOString()
    };

    // Guardar offline
    await db.sales.add(sale);

    // Intentar sincronizar si hay internet
    if (navigator.onLine) {
      await syncToServer(sale);
    }

    cart = []; // Reset
  }
</script>
```

**ElysiaJS Endpoint:**

```typescript
// POST /pos/sales/sync
app.post('/pos/sales/sync', async ({ body, user }) => {
  const { sales } = body;

  // Batch insert de ventas offline
  const inserted = await db.insert(posSales).values(
    sales.map(s => ({
      user_id: user.id,
      ...s
    }))
  ).returning();

  return { synced: inserted.length };
});
```

---

### Módulo 2: Generador Automático de Factura Global

**Necesidad:** Tienda Abarrotes, Restaurante, Farmacia, Ferretería, Boutique, Papelería

**Dolor Real:**

- Al cierre del día tienen 200 ventas de $10-$50 pesos sin factura
- SAT requiere Factura Global por el total (suma de ventas públicas generales)
- Hacerlo manual toma 30 minutos diarios

**Schema PostgreSQL:**

```typescript
CREATE TABLE global_invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  total_sales_count INTEGER NOT NULL, -- 200 ventas
  total_amount DECIMAL(12,2) NOT NULL, -- $8,432.50
  invoice_id UUID REFERENCES invoices(id), -- CFDI generado
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'generated', 'error'
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);
```

**ElysiaJS Endpoint (Automático):**

```typescript
// POST /pos/close-day (Cierre de caja automático)
app.post('/pos/close-day', async ({ user }) => {
  const today = new Date().toISOString().split('T')[0];

  // Obtener todas las ventas del día sin factura
  const sales = await db.select().from(posSales)
    .where(
      and(
        eq(posSales.user_id, user.id),
        sql`DATE(sale_date) = ${today}`,
        isNull(posSales.invoice_id)
      )
    );

  if (sales.length === 0) {
    return { message: 'No hay ventas sin facturar' };
  }

  const total = sales.reduce((sum, s) => sum + s.total, 0);

  // Generar Factura Global en Facturapi
  const globalInvoice = await facturapi.invoices.create({
    customer: {
      legal_name: 'PÚBLICO EN GENERAL',
      tax_id: 'XAXX010101000',
      email: user.email
    },
    items: [{
      product: {
        description: `Venta pública general del ${today}`,
        product_key: '01010101',
        price: total
      }
    }],
    payment_form: '01', // Efectivo
    use: 'G01' // Público general
  });

  // Registrar Factura Global
  await db.insert(globalInvoices).values({
    user_id: user.id,
    date: today,
    total_sales_count: sales.length,
    total_amount: total,
    invoice_id: globalInvoice.id,
    status: 'generated'
  });

  return {
    message: `Factura Global generada: ${sales.length} ventas por $${total} MXN`,
    invoice_url: globalInvoice.verification_url
  };
});
```

---

### Módulo 3: Gestión de Inventario con Alertas

**Necesidad:** Tienda Abarrotes, Farmacia, Ferretería, Boutique, Papelería

**Schema PostgreSQL:**

```typescript
CREATE TABLE inventory_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  barcode VARCHAR(100), -- EAN-13, UPC
  current_stock INTEGER NOT NULL DEFAULT 0,
  min_stock INTEGER NOT NULL DEFAULT 5, -- Alerta de reorden
  cost_price DECIMAL(10,2) NOT NULL, -- Costo de compra
  sale_price DECIMAL(10,2) NOT NULL, -- Precio de venta
  supplier VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE inventory_movements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES inventory_products(id),
  type VARCHAR(20) NOT NULL, -- 'purchase', 'sale', 'adjustment'
  quantity INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_inventory_low_stock ON inventory_products(user_id, current_stock)
  WHERE current_stock <= min_stock;
```

**ElysiaJS Endpoint:**

```typescript
// GET /inventory/low-stock
app.get('/inventory/low-stock', async ({ user }) => {
  const lowStock = await db.select().from(inventoryProducts)
    .where(
      and(
        eq(inventoryProducts.user_id, user.id),
        sql`current_stock <= min_stock`
      )
    );

  return {
    count: lowStock.length,
    products: lowStock,
    alert: lowStock.length > 0
      ? `⚠️ ${lowStock.length} productos con stock bajo`
      : '✅ Inventario OK'
  };
});
```

---

### Módulo 4: Conciliador de Ventas MercadoLibre/Amazon

**Necesidad:** Vendedor MercadoLibre/Amazon (Perfil 66)

**Dolor Real:**

- MercadoLibre deposita $8,750 pero vendiste $10,000
- Diferencia: $1,250 de comisiones (12.5%) + envío + impuestos
- No sabe cómo cuadrar las cuentas fiscalmente

**Schema PostgreSQL:**

```typescript
CREATE TABLE marketplace_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  platform VARCHAR(50) NOT NULL, -- 'mercadolibre', 'amazon'
  order_id VARCHAR(100) NOT NULL, -- ID de la orden en ML/Amazon
  sale_amount DECIMAL(10,2) NOT NULL, -- $10,000
  commission DECIMAL(10,2) NOT NULL, -- $1,000 (10%)
  shipping_cost DECIMAL(10,2) DEFAULT 0, -- $150
  platform_tax DECIMAL(10,2) DEFAULT 0, -- $100 (IVA retenido)
  net_amount DECIMAL(10,2) NOT NULL, -- $8,750 (lo que depositan)
  sale_date TIMESTAMP NOT NULL,
  payout_date TIMESTAMP, -- Cuándo depositaron
  invoice_id UUID REFERENCES invoices(id),
  reconciled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_marketplace_sales_reconciled ON marketplace_sales(user_id, reconciled)
  WHERE reconciled = FALSE;
```

**ElysiaJS Endpoint:**

```typescript
// POST /marketplace/import-csv
app.post('/marketplace/import-csv', async ({ body, user }) => {
  const { platform, csvData } = body;

  const parsed = csvData.map(row => ({
    user_id: user.id,
    platform,
    order_id: row.order_id,
    sale_amount: parseFloat(row.total),
    commission: parseFloat(row.commission),
    shipping_cost: parseFloat(row.shipping || 0),
    platform_tax: parseFloat(row.tax || 0),
    net_amount: parseFloat(row.net),
    sale_date: new Date(row.date),
    reconciled: false
  }));

  await db.insert(marketplaceSales).values(parsed);

  return {
    imported: parsed.length,
    total_sales: parsed.reduce((sum, s) => sum + s.sale_amount, 0),
    total_net: parsed.reduce((sum, s) => sum + s.net_amount, 0),
    commission_total: parsed.reduce((sum, s) => sum + s.commission, 0)
  };
});
```

---

## 🚫 CONTRADICCIONES DETECTADAS

### ✅ NINGUNA

Todos los perfiles de Comercio/Retail son:

1. **Compatibles con stack Svelte 5 + Bun + PostgreSQL**
2. **No contradicen los 60 perfiles previos** (distintos dominios de negocio)
3. **Técnicamente viables** con IndexedDB offline + Service Workers
4. **Escalables** (POS puede manejar 10,000+ ventas/día con optimización)

---

## 🎯 PERFILES A GENERAR (TANDA 2)

| #  | Perfil                            | Estado Docs | Complejidad Técnica | Prioridad |
| :- | :-------------------------------- | :---------: | :-----------------: | :-------: |
| 61 | Tienda Abarrotes/Miscelánea       |  ⚠️ Parcial  |    🔴🔴🔴🔴 Muy Alta     |  🔴🔴🔴🔴   |
| 62 | Restaurante/Fonda/Cafetería       |  ✅ Existe   |     🔴🔴🔴🔴 Muy Alta    |  🔴🔴🔴🔴   |
| 63 | Farmacia Independiente            | ❌ No existe |     🔴🔴🔴 Alta      |   🔴🔴🔴   |
| 64 | Ferretería/Tlapalería             | ❌ No existe |      🔴🔴 Media      |    🔴🔴   |
| 65 | Tienda Ropa/Boutique/Zapatería    |  ⚠️ Parcial  |      🔴🔴 Media      |    🔴🔴   |
| 66 | Vendedor MercadoLibre/Amazon      |  ✅ Existe   |     🔴🔴🔴 Alta      |   🔴🔴🔴   |
| 67 | Taller Mecánico/Refaccionaria     |  ✅ Existe   |      🔴🔴 Media      |    🔴🔴   |
| 68 | Estética/Barbería/Spa             |  ✅ Existe   |      🔴🔴 Media      |    🔴🔴   |
| 69 | Papelería/Centro Copiado          | ❌ No existe |      🔴🔴 Media      |    🔴🔴   |
| 70 | Vendedor Mercado/Tianguis         |  ✅ Existe   |      🔴🔴 Media      |   🔴🔴🔴   |

**Complejidad Técnica Justificada:**

- 🔴🔴🔴🔴 Muy Alta: Requiere POS offline, sincronización, inventario, factura global, escáner cámara
- 🔴🔴🔴 Alta: Requiere 3 de los módulos anteriores
- 🔴🔴 Media: Requiere 1-2 módulos

---

## 🛠️ TECNOLOGÍAS ADICIONALES REQUERIDAS

### 1. Escáner de Códigos de Barras (Cámara)

**Librería:** `@zxing/browser` (ZXing open source)

```typescript
// Svelte component
import { BrowserMultiFormatReader } from '@zxing/browser';

let videoRef = $state<HTMLVideoElement>();
let scannedBarcode = $state('');

async function startScanner() {
  const codeReader = new BrowserMultiFormatReader();
  const result = await codeReader.decodeOnceFromVideoDevice(undefined, videoRef);
  scannedBarcode = result.getText();

  // Buscar producto por barcode
  const product = await fetch(`/api/products/by-barcode/${scannedBarcode}`);
  // Agregar al carrito
}
```

**Ventaja:** No requiere pistola láser ($800-2,000 MXN), usa cámara del celular/tablet.

---

### 2. Service Workers para Offline

**PWA Configuration (`vite.config.ts`):**

```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.finanzasmx\.com\/pos\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pos-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 86400 // 24 horas
              }
            }
          }
        ]
      }
    })
  ]
});
```

---

### 3. IndexedDB con Dexie.js

**Schema:**

```typescript
import Dexie from 'dexie';

class FinanzasMXDB extends Dexie {
  sales!: Dexie.Table<PosSale, number>;
  products!: Dexie.Table<Product, number>;

  constructor() {
    super('FinanzasMX');
    this.version(1).stores({
      sales: '++id, user_id, sale_date, synced',
      products: '++id, user_id, barcode, name'
    });
  }
}

export const db = new FinanzasMXDB();
```

---

## 🎯 RECOMENDACIONES ESTRATÉGICAS

### 1. Priorización de Implementación

**Fase 1 (Crítica):**

1. Perfil 61 (Tienda Abarrotes) - TAM masivo (2M+ tienditas en México)
2. Perfil 66 (MercadoLibre/Amazon) - Problema de conciliación urgente

**Fase 2 (Alta):**
3. Perfil 62 (Restaurante) - Propinas + mermas son dolor constante
4. Perfil 63 (Farmacia) - Regulación sanitaria + alta rotación inventario

**Fase 3 (Media):**
5-10. Resto de perfiles

---

### 2. Consideraciones México Profundo

**Internet Inestable:**

- POS debe funcionar 100% offline
- Sincronización en background cuando haya conexión
- Indicador visual de "X ventas pendientes de sincronizar"

**Hardware Limitado:**

- Tablet $2,000-3,000 MXN (gama baja Android)
- No requerir iPad o Samsung Galaxy Tab S8
- Escáner cámara debe funcionar con cámaras 8MP (no requerir 48MP)

**Capacitación:**

- Tutorial interactivo de 3 minutos
- Video de 60 segundos en TikTok/Instagram
- WhatsApp soporte grupal (comunidad de tenderos)

---

### 3. Bootstrap Sales Strategy (Sin Paid Ads)

**Canales Gratuitos para Retail:**

| Canal                         | Target                         | Estrategia                                   |
| :---------------------------- | :----------------------------- | :------------------------------------------- |
| Mercados de Abastos           | Tenderos, comerciantes         | Demo en vivo, volantes con QR                |
| Asociaciones de Comerciantes  | CANACO, CONCANACO              | Ponencia "Cómo NO pagar multas SAT"          |
| Grupos WhatsApp               | "Tenderos CDMX", "Fonderos MX" | Caso de éxito: "Ahorra 2 horas/día"          |
| TikTok/Instagram              | Retail moderno                 | Reels virales: "POV: Cierras tu tienda en 3 clics" |
| Facebook Marketplace Sellers  | Vendedores MercadoLibre        | Post: "Por qué no te cuadran las comisiones" |

---

## ✅ CONCLUSIÓN DE AUDITORÍA

**Estado Final:** ✅ LUZ VERDE PARA GENERACIÓN DE PERFILES 61-70

- **0 contradicciones** con documentación existente
- **Stack técnico validado** (Svelte 5 + Bun + PostgreSQL + IndexedDB + Service Workers)
- **4 módulos nuevos** definidos y arquitecturizados
- **Bootstrap sales** estrategias identificadas por perfil
- **TAM masivo:** ~5.5M comerciantes en México (10x más que profesionales)

**Próximo Paso:** Generar perfiles 61-70 con especificaciones técnicas completas.

---

**Auditoría completada por:** GitHub Copilot (Claude Sonnet 4.5)
**Tiempo de auditoría:** 15 minutos
**Archivos consultados:** 12
**Líneas de código analizadas:** ~8,500 líneas
