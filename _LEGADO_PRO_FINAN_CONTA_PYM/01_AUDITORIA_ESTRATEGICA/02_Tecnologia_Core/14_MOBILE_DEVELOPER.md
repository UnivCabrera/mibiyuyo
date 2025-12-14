# 👨‍💻 Perfil 14: Mobile Developer (PWA)

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Mobile Developer se enfoca en la experiencia móvil a través de PWA (Progressive Web App). No desarrollamos apps nativas (iOS/Android) inicialmente, sino una PWA instalable con capacidades offline, notificaciones push y acceso a hardware básico.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Estrategia Móvil | ✅ PWA First | `00_LEGADO_PRIMERA_LLUVIA_IDEAS/App_movil-main/` (Referencia) |
| Diseño Responsive | ✅ Mobile First | `05_UX_UI_DESIGN/03_INTERFAZ_TANGRAM_SPEC.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| MOB-001 | **Web App Manifest Completo** | 🔴 Bloqueante | `static/manifest.json` | Sem 1 |
| MOB-002 | **Service Worker (Offline Fallback)** | 🟠 Alto | `src/service-worker.ts` | Sem 2 |
| MOB-003 | Notificaciones Push (Web Push) | 🟡 Medio | `src/lib/client/push.ts` | Fase 2 |
| MOB-004 | Install Prompt Personalizado | 🟢 Bajo | Componente Svelte | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Manifest.json Optimizado

Para que la app se sienta nativa al instalarse.

```json
// static/manifest.json
{
  "name": "Finanzas PyME México",
  "short_name": "FinanzasMX",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#0052cc",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Service Worker Básico (SvelteKit)

SvelteKit facilita la generación del SW.

```typescript
// src/service-worker.ts
/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
  async function addFilesToCache() {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
  }
  event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
  async function deleteOldCaches() {
    for (const key of await caches.keys()) {
      if (key !== CACHE) await caches.delete(key);
    }
  }
  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  async function respond() {
    const url = new URL(event.request.url);
    const cache = await caches.open(CACHE);

    // Estrategia: Cache First para assets, Network First para datos
    if (ASSETS.includes(url.pathname)) {
      return (await cache.match(event.request)) || fetch(event.request);
    }

    try {
      const response = await fetch(event.request);
      if (response.status === 200) {
        cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      return cache.match(event.request);
    }
  }

  event.respondWith(respond());
});
```

---

## 🔗 Referencias

- **MDN PWA Docs:** Manifest, Service Workers.
- **SvelteKit Service Workers:** Módulo `$service-worker`.

---

*Última actualización: 9 Diciembre 2025*
