# 🚨 DECISIÓN PENDIENTE: Sistema de Exportación Excel/Sheets

**Estado:** ⏳ PENDIENTE DE DEFINIR  
**Prioridad:** Alta (antes de desarrollo de reportes)  
**Fecha creación:** 3 Diciembre 2025

---

## 📋 Resumen del Problema

Los usuarios del sistema necesitarán exportar datos (facturas, reportes, catálogos, etc.). 
Debemos definir qué formatos ofrecer y qué librerías usar.

---

## 🎯 Propuesta de Botones de Exportación

```
┌─────────────────────────────────────────────────────────────────┐
│  📥 EXPORTAR DATOS                                              │
│                                                                 │
│  [📊 Excel Clásico (.xls)]  ← Compatibilidad máxima (viejito)  │
│  [📊 Excel Moderno (.xlsx)] ← Formato actual con estilos       │
│  [📋 Google Sheets]         ← Solo si aplica (ver reglas)      │
│  [📄 CSV]                   ← Universal                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Matriz de Decisión por Tipo de Usuario

| Tipo de Usuario | Excel Clásico | Excel Moderno | Google Sheets | CSV |
|-----------------|---------------|---------------|---------------|-----|
| **Contador formal (despacho)** | ✅ Sí | ✅ Sí | ❌ No | ✅ Sí |
| **Contador independiente** | ✅ Sí | ✅ Sí | ⚠️ Opcional | ✅ Sí |
| **PyME pequeña** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |
| **Startup/Emprendedor** | ⚠️ Opcional | ✅ Sí | ✅ Sí | ✅ Sí |
| **Administrativo** | ✅ Sí | ✅ Sí | ✅ Sí | ✅ Sí |

---

## 🔧 Librerías Disponibles

### Para archivos Excel descargables:

| Librería | Formato | Fortaleza | Debilidad |
|----------|---------|-----------|-----------|
| **xlsx (SheetJS)** | .xls, .xlsx, .csv, .ods | Máxima compatibilidad, más estable | Estilos limitados |
| **ExcelJS** | .xlsx | Estilos avanzados (colores, fuentes) | Solo formato moderno |
| **excel4node** | .xlsx | Simple | Menos features |

### Para Google Sheets (hoja viva en nube):

| Herramienta | Uso | Ventaja | Desventaja |
|-------------|-----|---------|------------|
| **Google Sheets API** | Crear/editar hojas en cuenta del usuario | Colaborativo, tiempo real | Requiere OAuth, no para datos sensibles |

---

## ✅ Cuándo SÍ usar Google Sheets

- App ligera, colaborativa, estilo startup
- Usuarios que NO son contadores formales
- Datos simples (ingresos/gastos básicos, dashboards)
- Equipos que necesitan edición en tiempo real
- Registros de control administrativo
- Cuando no hay macros ni fórmulas complejas

**Piensa en Sheets como una "base de datos light" con interfaz visual.**

---

## ❌ Cuándo NO usar Google Sheets

- **Contabilidad formal o fiscal** (DIOT, CFDI, pólizas, nómina)
- Archivos Excel complejos con:
  - Macros (VBA)
  - Tablas dinámicas avanzadas
  - Conexiones PowerQuery
  - Validaciones fiscales
- **Grandes volúmenes** (+100k filas) - Sheets se vuelve lento
- **Datos sensibles** (RFC, datos fiscales, información bancaria)
- Cuando el contador ya tiene su flujo de trabajo en Excel

---

## 🛠️ Implementación Técnica Sugerida

### Opción A: xlsx (SheetJS) - RECOMENDADA para máxima compatibilidad

```typescript
import * as XLSX from 'xlsx';

// Exportar a .xlsx (moderno)
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Facturas');
const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

// Exportar a .xls (clásico/compatible)
const bufferXls = XLSX.write(workbook, { type: 'buffer', bookType: 'xls' });
```

### Opción B: ExcelJS - Para estilos avanzados

```typescript
import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Facturas');

// Estilos avanzados
sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '366092' } };

const buffer = await workbook.xlsx.writeBuffer();
```

### Opción C: Google Sheets API - Para hoja colaborativa

```typescript
import { google } from 'googleapis';

// Requiere OAuth del usuario
const sheets = google.sheets({ version: 'v4', auth: userOAuthToken });

// Crear nueva hoja en cuenta del usuario
const spreadsheet = await sheets.spreadsheets.create({
  requestBody: {
    properties: { title: 'Reporte Facturas - Mi Empresa' },
    sheets: [{ properties: { title: 'Facturas' } }]
  }
});

// Escribir datos
await sheets.spreadsheets.values.update({
  spreadsheetId: spreadsheet.data.spreadsheetId,
  range: 'Facturas!A1',
  valueInputOption: 'USER_ENTERED',
  requestBody: { values: dataArray }
});

// Devolver URL al usuario
const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheet.data.spreadsheetId}`;
```

---

## 📌 Información Técnica Google Sheets API

```
Spreadsheet ID: extraer de URL → /d/SPREADSHEET_ID/edit
Sheet ID: extraer de URL → gid=SHEET_ID  
Notación A1: Sheet1!A1:B2 (más común)
Notación R1C1: Sheet1!R1C1:R2C2 (menos común)
Límite: ~10 millones de celdas por spreadsheet
Límite filas: ~10 millones (pero lento después de 100k)
```

---

## 🤔 Preguntas a Responder Antes de Implementar

- [ ] **¿Qué nivel de estilos necesitan los reportes?**
  - Básico (solo datos) → xlsx (SheetJS)
  - Avanzado (colores, logos, formato) → ExcelJS

- [ ] **¿Los usuarios principales son contadores formales?**
  - Sí → Priorizar Excel, ocultar Sheets
  - No → Mostrar todas las opciones

- [ ] **¿Necesitan colaboración en tiempo real?**
  - Sí → Incluir Google Sheets
  - No → Solo Excel/CSV

- [ ] **¿Manejamos datos fiscales sensibles?**
  - Sí → NO mostrar Google Sheets para esos reportes
  - No → Puede mostrarse

- [ ] **¿Qué tan viejos son los Excel de los usuarios?**
  - Excel 2003 o anterior → Ofrecer .xls obligatorio
  - Excel 2007+ → .xlsx es suficiente

---

## 📋 Decisión Sugerida (Borrador)

```
Reportes fiscales (CFDI, DIOT, etc.):
  → Excel Clásico (.xls) ✅
  → Excel Moderno (.xlsx) ✅
  → CSV ✅
  → Google Sheets ❌ (datos sensibles)

Reportes administrativos (ventas, inventario, etc.):
  → Excel Clásico (.xls) ✅
  → Excel Moderno (.xlsx) ✅
  → CSV ✅
  → Google Sheets ✅ (opcional)

Dashboards y resúmenes:
  → Excel Moderno (.xlsx) ✅
  → Google Sheets ✅
  → CSV ⚠️ (opcional)
```

---

## 🔗 Referencias

- xlsx (SheetJS): https://www.npmjs.com/package/xlsx
- ExcelJS: https://www.npmjs.com/package/exceljs
- Google Sheets API: https://developers.google.com/sheets/api/guides/concepts

---

**→ DEFINIR CUANDO LLEGUEMOS A DESARROLLO DE MÓDULO DE EXPORTACIONES**

*Última actualización: 3 Diciembre 2025*
