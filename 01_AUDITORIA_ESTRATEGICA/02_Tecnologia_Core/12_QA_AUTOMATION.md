# 👨‍💻 Perfil 12: QA Automation Engineer

**Auditoría Estratégica - Bloque B: Tecnología Core**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Ingeniero de QA Automation asegura la calidad del software mediante pruebas automatizadas. Su foco principal es evitar regresiones en flujos críticos (Facturación, Cálculo de Impuestos) y garantizar que la experiencia de usuario sea consistente.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Framework E2E | ✅ Playwright | `package.json` |
| Unit Testing | ✅ Bun Test / Vitest | `package.json` |
| Estrategia de Testing | ✅ Definida | `08_TESTING_QA/01_ESTRATEGIA_TESTING.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| QA-001 | **Smoke Tests de Despliegue** | 🔴 Bloqueante | `tests/e2e/smoke.spec.ts` | Sem 1 |
| QA-002 | **Tests de Regresión Visual (Snapshots)** | 🟠 Alto | Configuración Playwright | Sem 2 |
| QA-003 | Mocking de Servicios Externos (SAT/Bancos) | 🟡 Medio | `tests/mocks/sat-api.ts` | Sem 2 |
| QA-004 | Tests de Performance (K6/Load) | 🟢 Bajo | `tests/load/` | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Configuración de Playwright para CI/CD

Asegurar que los tests corran en el pipeline de GitHub Actions.

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

### 2. Smoke Test Crítico (Login + Dashboard)

El test mínimo que debe pasar para considerar un despliegue exitoso.

```typescript
// tests/e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test('Smoke: Usuario puede iniciar sesión y ver dashboard', async ({ page }) => {
  await page.goto('/login');

  // Llenar formulario
  await page.getByLabel('Correo').fill('test@demo.com');
  await page.getByLabel('Contraseña').fill('Password123!');
  await page.getByRole('button', { name: 'Entrar' }).click();

  // Verificar redirección y contenido
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Resumen Financiero' })).toBeVisible();
});
```

---

## 🔗 Referencias

- **Playwright Docs:** Best practices, Locators, Auto-waiting.
- **Testing Trophy:** Kent C. Dodds (Unit vs Integration vs E2E).

---

*Última actualización: 9 Diciembre 2025*
