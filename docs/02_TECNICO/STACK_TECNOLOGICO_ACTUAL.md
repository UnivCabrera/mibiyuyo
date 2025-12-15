# 🛠️ Stack Tecnológico Oficial: mibiyuyo (V2.1)

> **Proyecto:** mibiyuyo — "Tu dinero, tu control, tu paz"
> **Dominio:** mibiyuyo.com
> **Fecha:** 15 Diciembre 2025

Este documento define la infraestructura y tecnologías activas. Cualquier desviación debe ser aprobada.

---

## 📋 RESUMEN RÁPIDO

| Categoría | Tecnología | Versión |
|:---|:---|:---:|
| Runtime | **Bun** | 1.3.3+ |
| Frontend | **Svelte 5 + SvelteKit 2** | 5.x / 2.x |
| Backend | **ElysiaJS** | 1.4.16+ |
| Database | **PostgreSQL** | 16+ |
| Cache | **Redis** | 7+ |
| ORM | **Drizzle ORM** | 0.38+ |
| Auth | **Lucia Auth** | 3.x |
| Styling | **CSS Nativo + Open Props** | Modern CSS |
| UI | **Bits UI (Headless)** | Latest |
| Deploy | **Dokploy (Hostinger VPS)** | Self-hosted |

---

## 1. Infraestructura (Control Total)

| Componente | Tecnología | Notas |
|:---|:---|:---|
| **Proveedor VPS** | Hostinger VPS (KVM) | 4GB RAM recomendado |
| **SO** | Ubuntu 24.04 LTS | Via Kit Dokploy |
| **Gestor Despliegue** | [Dokploy](https://dokploy.com/) | Open Source, Self-hosted |
| **Base de Datos** | PostgreSQL 16+ | Dockerizada vía Dokploy |
| **Cache/Sesiones** | Redis 7+ | Dockerizado vía Dokploy |
| **Proxy Inverso** | Traefik | Manejado por Dokploy |
| **SSL** | Let's Encrypt | Automático vía Traefik |
| **Storage** | MinIO | S3-compatible, self-hosted |

**Justificación:** Elimina costos de Vercel/Netlify, garantiza soberanía de datos (Pilar #6).

---

## 2. Backend (API & Lógica)

| Componente | Tecnología | Razón |
|:---|:---|:---|
| **Runtime** | [Bun](https://bun.sh/) | Velocidad extrema, TS nativo |
| **Framework** | [ElysiaJS](https://elysiajs.com/) | El más rápido para Bun |
| **ORM** | [Drizzle ORM](https://orm.drizzle.team/) | Ligero, SQL-like, type-safe |
| **Autenticación** | [Lucia Auth](https://lucia-auth.com/) | Cookies HttpOnly, seguridad robusta |
| **Validación** | [Zod](https://zod.dev/) | Schema validation |

---

## 3. Frontend (Experiencia de Usuario)

| Componente | Tecnología | Razón |
|:---|:---|:---|
| **Framework** | SvelteKit 2 (Svelte 5 Runes) | Rendimiento, tamaño bundle |
| **Lenguaje** | TypeScript (Strict Mode) | Type safety |
| **Estilos** | **CSS Nativo** | Variables, Nesting, sin dependencias |
| **Sistema Diseño** | [Open Props](https://open-props.style/) | Variables CSS modernas |
| **Componentes** | [Bits UI](https://bits-ui.com/) | Headless, accesible, sin estilos |
| **PWA** | Vite PWA Plugin | Instalación en móviles |
| **Icons** | Lucide | Consistencia visual |

---

## 4. Herramientas de Desarrollo

| Categoría | Herramienta |
|:---|:---|
| **IDE** | VS Code (cualquier OS) |
| **Package Manager** | Bun |
| **Linter Markdown** | markdownlint-cli2 |
| **Formatter** | Prettier |
| **Testing E2E** | Playwright |
| **Testing Unit** | Vitest |

---

## 5. MCPs Configurados (22)

| Categoría | MCPs |
|:---|:---|
| **Core Dev** | svelte, vite, zod, css, lucide-icons, playwright, github |
| **Databases** | postgres, redis, sqlite |
| **Cloud** | docker, firebase, cloudflare-ai, sentry, dokploy*, linear |
| **AI** | openai, resend, fetch |
| **Utils** | filesystem |

*Dokploy: Pendiente de configurar con VPS

---

## 6. llms.txt Disponibles (9)

| Tecnología | URL |
|:---|:---|
| Svelte 5 | https://svelte.dev/llms.txt |
| Vite | https://vite.dev/llms.txt |
| Redis | https://redis.io/docs/latest/llms.txt |
| Zod | https://zod.dev/llms.txt |
| Bun | https://bun.sh/llms.txt |
| ElysiaJS | https://elysiajs.com/llms.txt |
| Bits UI | https://bits-ui.com/llms.txt |
| Lucia Auth | https://lucia-auth.com/llms.txt |
| Open Props | https://open-props.style/llms.txt |

---

## 7. Costos Mensuales Estimados

| Servicio | Costo USD |
|:---|---:|
| VPS Hostinger (4GB) | $12 |
| Dominio (.com) | $1 |
| Emails (Resend free) | $0 |
| Analytics (self-hosted) | $0 |
| Sentry (free tier) | $0 |
| **Total** | **~$13** |

---

## 📚 Documentación Detallada

- [Stack Completo](docs/02_TECNICO/STACK_TECNOLOGICO_COMPLETO.md)
- [MCPs y LLMs](docs/02_TECNICO/MCP_LLMS_CONFIGURACION.md)
- [Seguridad](docs/03_SEGURIDAD/POLITICAS_SEGURIDAD.md)

---

**Última actualización:** 15 Diciembre 2025
