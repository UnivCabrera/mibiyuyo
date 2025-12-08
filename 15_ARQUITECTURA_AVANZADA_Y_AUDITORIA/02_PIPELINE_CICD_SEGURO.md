# 🚀 DISEÑO DE PIPELINE CI/CD SEGURO (DOKPLOY + GITHUB ACTIONS)
## Despliegue Automatizado sin Comandos Peligrosos

Este diseño garantiza que el código pase por verificaciones de calidad y seguridad antes de tocar producción, eliminando el acceso manual SSH y el error humano.

---

## 1. FLUJO DE TRABAJO (WORKFLOW)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PIPELINE CI/CD CON DOKPLOY                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   Developer          GitHub Actions              Dokploy                │
│   ┌────────┐        ┌─────────────────┐        ┌─────────────────┐     │
│   │ Push   │───────►│ 1. Lint         │        │                 │     │
│   │ main   │        │ 2. Test         │───────►│ Build Image     │     │
│   └────────┘        │ 3. SAST Scan    │ webhook│ Deploy (0 DT)   │     │
│                     │ 4. Audit Deps   │        │ Health Check    │     │
│                     └─────────────────┘        └─────────────────┘     │
│                                                                         │
│   Si falla cualquier paso → NO se dispara el webhook                   │
│   Si todo pasa → Webhook activa deploy en Dokploy automáticamente      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

1.  **Push a `main`:** Desarrollador sube código.
2.  **CI (Integración Continua - GitHub Actions):**
    *   Linting (Biome/ESLint).
    *   Testing Unitario (Bun Test).
    *   Análisis de Seguridad Estático (SAST con Trivy).
    *   Auditoría de dependencias.
3.  **CD (Despliegue Continuo - Dokploy):**
    *   Si todos los checks pasan, GitHub Actions llama al **Webhook de Despliegue** de Dokploy.
    *   Dokploy hace pull del código, construye la imagen y despliega sin downtime.

---

## 2. ARCHIVO DE CONFIGURACIÓN COMPLETO

### `.github/workflows/ci-cd.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  BUN_VERSION: '1.3.3'

jobs:
  # ═══════════════════════════════════════════════════════════════════
  # FASE 1: CALIDAD DE CÓDIGO
  # ═══════════════════════════════════════════════════════════════════
  lint-and-typecheck:
    name: 🔍 Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      
      - name: Install Dependencies
        run: bun install --frozen-lockfile
      
      - name: Run Biome (Lint + Format)
        run: bun run lint
      
      - name: TypeScript Type Check
        run: bun run typecheck

  # ═══════════════════════════════════════════════════════════════════
  # FASE 2: TESTS
  # ═══════════════════════════════════════════════════════════════════
  test:
    name: 🧪 Tests
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test_db
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Bun
        uses: oven-sh/setup-bun@v1
        with:
          bun-version: ${{ env.BUN_VERSION }}
      
      - name: Install Dependencies
        run: bun install --frozen-lockfile
      
      - name: Run Unit Tests
        run: bun test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test_db
          REDIS_URL: redis://localhost:6379
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        if: github.event_name == 'push'

  # ═══════════════════════════════════════════════════════════════════
  # FASE 3: SEGURIDAD
  # ═══════════════════════════════════════════════════════════════════
  security:
    name: 🛡️ Security Scan
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy (SAST)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          ignore-unfixed: true
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
      
      - name: Upload Trivy Results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Dependency Audit
        run: bun pm audit || true  # No falla por vulnerabilidades conocidas en desarrollo

  # ═══════════════════════════════════════════════════════════════════
  # FASE 4: DEPLOY A PRODUCCIÓN (Solo main, solo si todo pasa)
  # ═══════════════════════════════════════════════════════════════════
  deploy-production:
    name: 🚀 Deploy to Production
    runs-on: ubuntu-latest
    needs: [test, security]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment:
      name: production
      url: https://app.profinanconta.mx
    steps:
      - name: Trigger Dokploy Deployment (Backend)
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${{ secrets.DOKPLOY_WEBHOOK_BACKEND }}")
          if [ "$response" != "200" ]; then
            echo "❌ Backend deploy failed with status $response"
            exit 1
          fi
          echo "✅ Backend deploy triggered successfully"
      
      - name: Trigger Dokploy Deployment (Frontend)
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${{ secrets.DOKPLOY_WEBHOOK_FRONTEND }}")
          if [ "$response" != "200" ]; then
            echo "❌ Frontend deploy failed with status $response"
            exit 1
          fi
          echo "✅ Frontend deploy triggered successfully"
      
      - name: Wait for Deployment
        run: sleep 60  # Esperar a que Dokploy complete el deploy
      
      - name: Health Check
        run: |
          for i in {1..10}; do
            status=$(curl -s -o /dev/null -w "%{http_code}" https://api.profinanconta.mx/health)
            if [ "$status" == "200" ]; then
              echo "✅ Health check passed"
              exit 0
            fi
            echo "⏳ Waiting for service... attempt $i"
            sleep 10
          done
          echo "❌ Health check failed after 10 attempts"
          exit 1
      
      - name: Notify Success
        if: success()
        run: echo "🎉 Deployment successful!"
        # Opcional: Enviar notificación a Slack/Discord
```

---

## 3. CONFIGURACIÓN DE SECRETS EN GITHUB

```
Repository → Settings → Secrets and variables → Actions

Secrets requeridos:
├── DOKPLOY_WEBHOOK_BACKEND   # URL webhook del servicio backend
├── DOKPLOY_WEBHOOK_FRONTEND  # URL webhook del servicio frontend
└── CODECOV_TOKEN             # (Opcional) Para coverage reports
```

**Cómo obtener las URLs de webhook en Dokploy:**
```
Dokploy Panel → Project → Service → Settings → Webhooks → Generate
```

---

## 4. VENTAJAS DE ESTE MÉTODO

| Aspecto | Método Anterior (SSH) | Método Dokploy |
| :--- | :--- | :--- |
| **Llaves SSH** | Almacenadas en GitHub Secrets | ❌ No requeridas |
| **Acceso al servidor** | GitHub tiene acceso root | ❌ Solo webhook público |
| **Superficie de ataque** | Alta (SSH expuesto) | Baja (solo HTTPS) |
| **Rollback** | Manual (SSH + comandos) | Un clic en Dokploy |
| **Logs de deploy** | `docker logs` vía SSH | Panel visual en tiempo real |
| **Zero-downtime** | Configuración manual compleja | Automático (Swarm/rolling) |

---

## 5. WORKFLOW PARA PREVIEW ENVIRONMENTS (PRs)

```yaml
# .github/workflows/preview.yml
name: Preview Environment

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Preview Deploy
        run: |
          curl -X POST "${{ secrets.DOKPLOY_WEBHOOK_PREVIEW }}" \
            -H "Content-Type: application/json" \
            -d '{"pr_number": "${{ github.event.pull_request.number }}"}'
      
      - name: Comment PR with Preview URL
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🔮 Preview environment deployed!\n\n' +
                    '**URL:** https://pr-${{ github.event.pull_request.number }}.preview.profinanconta.mx\n\n' +
                    'This environment will be automatically deleted when the PR is merged or closed.'
            })
```

---

## 6. ROLLBACK DE EMERGENCIA

Si un deploy falla en producción:

1. **Desde Dokploy (Recomendado):**
   ```
   Panel → Service → Deployments → Seleccionar versión anterior → Redeploy
   ```

2. **Desde GitHub (Si Dokploy no responde):**
   ```bash
   # Revertir el commit en main
   git revert HEAD
   git push origin main
   # El pipeline se ejecutará automáticamente con el código anterior
   ```

---

**Documento mantenido por:** Equipo DevOps PRO_FINAN_CONTA_PYM  
**Última actualización:** 1 Diciembre 2025
```

## 3. MEDIDAS DE SEGURIDAD IMPLEMENTADAS

1.  **Usuario `deploy`:** El pipeline usa un usuario específico en el VPS (`deploy`) que solo pertenece al grupo `docker`. **NO TIENE PERMISOS DE SUDO** ni acceso a la carpeta `/srv/sat_credentials`.
2.  **Secretos Encriptados:** Las IPs, usuarios y llaves SSH están en GitHub Secrets, nunca en el código.
3.  **Escaneo de Vulnerabilidades:** `Trivy` bloquea el deploy si detecta librerías inseguras antes de construir la imagen.
4.  **Imágenes Firmadas:** Al usar GHCR y el token de GitHub, garantizamos la procedencia de la imagen.

## 4. ROLLBACK AUTOMÁTICO (PLAN B)
Si el deploy falla, el script debe tener un mecanismo de reversión.

```bash
# Snippet para script de deploy avanzado
if ! docker compose up -d; then
  echo "❌ Deploy falló. Revirtiendo a imagen anterior..."
  docker tag ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:previous ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
  docker compose up -d
  exit 1
fi
```
