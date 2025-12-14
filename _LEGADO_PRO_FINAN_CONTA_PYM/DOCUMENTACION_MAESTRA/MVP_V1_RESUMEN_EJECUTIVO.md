# 🎯 MVP V1: TU DINERO HOY

> **Documento de referencia rápida para desarrollo**
> **Última actualización:** 14 Diciembre 2025

---

## 🔥 EL PRODUCTO EN UNA FRASE

```
"Abres la app y en 0.5 segundos sabes exactamente cuánto
puedes gastar HOY sin arruinar tu quincena."
```

---

## 📱 LA PANTALLA PRINCIPAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                           $347                                          │
│                   PUEDES GASTAR HOY                                     │
│                   sin afectar tu quincena                               │
│                                                                         │
│   ───────────────────────────────────────────────────────────────       │
│                                                                         │
│   ✅ Renta: $5,000 (apartado)                                           │
│   ✅ Luz/Internet: $800 (apartado)                                      │
│   ✅ Ahorro: $500 (apartado)                                            │
│   💳 Tarjeta: $1,200 (apartado)                                         │
│                                                                         │
│   📅 Día 8 de 15 | Quincena: Dic 1-15                                   │
│   📊 Vas $45/día arriba del plan 🟢                                     │
│                                                                         │
│                    [+ Registrar Gasto]                                   │
│                                                                         │
│   😌 "Gasta tranquilo. Lo importante ya está cubierto."                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ FEATURES V1 (10 días de desarrollo)

| # | Feature | Descripción | Días |
|:---:|:---|:---|:---:|
| 1 | **"Tu Dinero Hoy"** | Número grande calculado | 2 |
| 2 | **Ingreso quincenal** | Input simple al inicio | 1 |
| 3 | **Gastos fijos** | Lista de compromisos | 2 |
| 4 | **Registro gasto** | 1 tap + monto | 2 |
| 5 | **Barra progreso** | Visual días/dinero | 1 |
| 6 | **Mensaje positivo** | Reduce ansiedad | 0.5 |
| 7 | **PWA** | Instalable, offline | 1 |
| 8 | **IndexedDB** | Storage local | 0.5 |

---

## 🎯 MÉTRICAS DE ÉXITO

| Métrica | Target V1 |
|:---|:---:|
| Instalaciones | 100 |
| Usuarios D7 | 50 (50%) |
| Gastos registrados | 500 total |

---

## 🧠 LOS 5 DOLORES QUE RESUELVE

1. **"No sé cuánto puedo gastar HOY"** → Número grande
2. **"Vivo quincena a quincena"** → Planificador quincenal
3. **"Mis gastos fijos me ahogan"** → Apartados visibles
4. **"Gasto de más sin darme cuenta"** → Anti-impulso (V3)
5. **"Me siento ansioso con el dinero"** → Mensajes positivos

---

## 🛠️ STACK TÉCNICO

| Capa | Tecnología |
|:---|:---|
| Frontend | Svelte 5 + SvelteKit 2 |
| Styling | CSS Nativo + Open Props |
| Storage | IndexedDB (Dexie.js) |
| PWA | Service Worker |
| Deploy | Dokploy + Hostinger |

---

## 📅 TIMELINE V1

```
SEMANA 1: Setup + Pantalla principal + Storage
SEMANA 2: Gastos fijos + Registro gasto
SEMANA 3: PWA + Pulido + Testing
SEMANA 4: Deploy + 50 usuarios beta + Métricas
```

---

## ❌ LO QUE NO INCLUYE V1

- Categorías de gastos
- Gráficas históricas
- Sync cloud
- Metas de ahorro
- Conexión SAT
- Login/Registro (solo local)

---

## 📋 SIGUIENTE ACCIÓN

1. `bun create svelte@latest tu-dinero-hoy`
2. Implementar pantalla principal
3. IndexedDB con Dexie.js
4. Service Worker para PWA
5. Deploy en Dokploy
6. Compartir con 5 personas

---

**Documento completo:** [REESTRUCTURACION_MVP_ESTRATEGICO.md](REESTRUCTURACION_MVP_ESTRATEGICO.md)
