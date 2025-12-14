# 🤖 Perfiles 41-50: Automatizaciones y Scripts (NO Contratar Humanos)

**Fecha:** 8 Diciembre 2025
**Bloque:** F (Soporte y Operaciones)
**Filosofía:** Bootstrap + Automation-First + Anti-Burocracia

---

## 🎯 Filosofía Central

> **"Convierte roles humanos burocráticos en Scripts de Automatización"**

Estos 10 perfiles tradicionales se **ELIMINAN COMPLETAMENTE** y se reemplazan con:

- ✅ Cronjobs en Dokploy
- ✅ Scripts en Bun/TypeScript
- ✅ Self-hosted open source tools (Prometheus, Grafana, etc.)
- ✅ Monitoreo pasivo (alertas automáticas por WhatsApp/Discord)

**NO se contrata a nadie para estos roles.**

---

## 📋 Resumen de Transformaciones

| # | Rol Tradicional | Salario Tradicional | Solución Bootstrap | Costo Nuevo |
|---|----------------|---------------------|-------------------|-------------|
| 41 | SRE (Site Reliability Engineer) | $45k-60k/mes | Prometheus + Grafana (Dokploy) + BullMQ alertas | $0/mes |
| 42 | Gestor de Licencias | $25k-35k/mes | Script cronjob que audita `package.json` | $0/mes |
| 43 | Admin de Sistemas Linux | $30k-45k/mes | Ansible playbooks + UFW firewall + hardening script | $0/mes |
| 44 | Traductor/Localización | $20k-30k/mes | **YA RESUELTO** en Perfil 25 (paraglide-js i18n) | $0/mes |
| 45 | Entrenador de IA | $35k-50k/mes | Feedback loop automático (PostHog → OpenAI fine-tuning) | $0/mes |
| 46 | Analista de Soporte Nivel 3 | $30k-40k/mes | God Mode panel (`/admin/users`) + Runbooks en Wiki | $0/mes |
| 47 | Sustainability Officer | $25k-35k/mes | Dark mode CSS + hosting green (ya cubierto) | $0/mes |
| 48 | Business Intelligence | $35k-50k/mes | Grafana + PostgreSQL queries directas | $0/mes |
| 49 | Agile Coach | $30k-45k/mes | GitHub Projects (Kanban) + async sprints | $0/mes |
| 50 | "Abogado del Diablo" | $30k-40k/mes | Premortem sessions trimestrales (Google Meet 1h) | $0/mes |

**Total Eliminado:** $335,000 - $480,000 MXN/mes = **$4,020,000 - $5,760,000 MXN/año**
**Total Nuevo:** $0 MXN/año (infraestructura ya cubierta en VPS Hostinger)
**Ahorro Neto:** **$4M - $5.76M MXN/año** (100% reducción)

---

## 🛠️ Implementaciones Detalladas

### 41. SRE (Site Reliability Engineer)

#### ❌ ROL ELIMINADO:

- Monitoreo 24/7 de servidores
- Definir SLOs (Service Level Objectives)
- On-call rotations
- Incident response
- **Salario:** $45,000 - $60,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**1. Prometheus (self-hosted en Dokploy)**

```yaml
# docker-compose.yml (en Dokploy)
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
    restart: always

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=<secret>
    volumes:
      - grafana_data:/var/lib/grafana
    restart: always

  node_exporter:
    image: prom/node-exporter:latest
    container_name: node_exporter
    ports:
      - "9100:9100"
    restart: always

volumes:
  prometheus_data:
  grafana_data:
```

**2. Configuración Prometheus:**

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['node_exporter:9100']

  - job_name: 'backend'
    static_configs:
      - targets: ['backend:3000']

  - job_name: 'postgresql'
    static_configs:
      - targets: ['postgres_exporter:9187']
```

**3. Alertas automáticas (WhatsApp via Baileys):**

```typescript
// apps/backend/src/services/prometheus-alerts.ts
import { makeWASocket } from '@whiskeysockets/baileys';
import axios from 'axios';

const PROMETHEUS_URL = 'http://localhost:9090';
const ALERT_PHONE = '+5215512345678'; // Número del founder

export async function checkPrometheusAlerts() {
  try {
    const response = await axios.get(`${PROMETHEUS_URL}/api/v1/alerts`);
    const alerts = response.data.data.alerts.filter((a: any) => a.state === 'firing');

    if (alerts.length > 0) {
      const sock = await connectWhatsApp();

      for (const alert of alerts) {
        await sock.sendMessage(ALERT_PHONE, {
          text: `🚨 ALERTA SRE:\n\n${alert.labels.alertname}\n${alert.annotations.summary}\n\nSeverity: ${alert.labels.severity}`,
        });
      }
    }
  } catch (error) {
    console.error('Error checking Prometheus alerts:', error);
  }
}

// Ejecutar cada 5 minutos
setInterval(checkPrometheusAlerts, 5 * 60 * 1000);
```

**4. SLOs definidos (documentación):**

| Servicio | SLO | Error Budget | Alerta |
|----------|-----|--------------|--------|
| Backend API | 99.9% uptime | 43 min/mes downtime | > 5 min down → WhatsApp |
| Frontend | 99.5% uptime | 3.6 hrs/mes downtime | > 10 min down → WhatsApp |
| PostgreSQL | 99.95% uptime | 21 min/mes downtime | > 2 min down → WhatsApp |

**Ahorro:** $540,000 - $720,000 MXN/año

---

### 42. Gestor de Licencias

#### ❌ ROL ELIMINADO:

- Auditoría de licencias open source
- Compliance legal (GPL, MIT, Apache)
- Gestión de vulnerabilidades (CVEs)
- **Salario:** $25,000 - $35,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**Script automatizado (Bun):**

```typescript
// scripts/audit-licenses.ts
import { readFileSync } from 'fs';
import { parseArgs } from 'util';

interface Dependency {
  name: string;
  version: string;
  license: string;
}

const FORBIDDEN_LICENSES = ['GPL-3.0', 'AGPL-3.0', 'SSPL-1.0'];
const ALLOWED_LICENSES = ['MIT', 'Apache-2.0', 'BSD-3-Clause', 'ISC', 'CC0-1.0'];

function auditPackageJson(path: string): Dependency[] {
  const packageJson = JSON.parse(readFileSync(path, 'utf-8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

  const issues: Dependency[] = [];

  for (const [name, version] of Object.entries(dependencies)) {
    // Leer package.json de cada dependencia
    try {
      const depPath = `./node_modules/${name}/package.json`;
      const depPackageJson = JSON.parse(readFileSync(depPath, 'utf-8'));
      const license = depPackageJson.license || 'UNKNOWN';

      if (FORBIDDEN_LICENSES.includes(license)) {
        issues.push({ name, version: version as string, license });
      }
    } catch (e) {
      console.warn(`⚠️ No se pudo leer licencia de ${name}`);
    }
  }

  return issues;
}

const issues = auditPackageJson('./package.json');

if (issues.length > 0) {
  console.error('🚨 LICENCIAS PROHIBIDAS DETECTADAS:\n');
  issues.forEach((dep) => {
    console.error(`- ${dep.name}@${dep.version} → ${dep.license}`);
  });
  process.exit(1);
} else {
  console.log('✅ Todas las licencias son compatibles');
}
```

**Cronjob (ejecutar semanalmente):**

```bash
# Ejecutar cada lunes a las 9am
0 9 * * 1 cd /home/app && bun run scripts/audit-licenses.ts || \
  curl -X POST https://finanzasmx.com/api/webhooks/alert \
  -d '{"message":"🚨 Licencias prohibidas detectadas en dependencies"}'
```

**Ahorro:** $300,000 - $420,000 MXN/año

---

### 43. Admin de Sistemas Linux

#### ❌ ROL ELIMINADO:

- Hardening de servidores
- Gestión de firewall (UFW, iptables)
- SSH key rotation
- Updates de seguridad
- **Salario:** $30,000 - $45,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**1. Script de Hardening (Ansible):**

```yaml
# ansible/hardening.yml
---
- name: Hardening de VPS Ubuntu 24.04
  hosts: vps
  become: yes
  tasks:
    - name: Update all packages
      apt:
        update_cache: yes
        upgrade: dist

    - name: Install UFW firewall
      apt:
        name: ufw
        state: present

    - name: Configure UFW (allow SSH, HTTP, HTTPS)
      ufw:
        rule: allow
        port: "{{ item }}"
      loop:
        - '22'
        - '80'
        - '443'

    - name: Enable UFW
      ufw:
        state: enabled

    - name: Disable root login via SSH
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^PermitRootLogin'
        line: 'PermitRootLogin no'

    - name: Disable password authentication (only SSH keys)
      lineinfile:
        path: /etc/ssh/sshd_config
        regexp: '^PasswordAuthentication'
        line: 'PasswordAuthentication no'

    - name: Restart SSH service
      service:
        name: ssh
        state: restarted

    - name: Install fail2ban (brute-force protection)
      apt:
        name: fail2ban
        state: present

    - name: Enable fail2ban
      service:
        name: fail2ban
        enabled: yes
        state: started
```

**Ejecutar:**

```bash
ansible-playbook -i inventory.ini ansible/hardening.yml
```

**2. Updates automáticos (Unattended Upgrades):**

```bash
# Instalar en VPS
sudo apt install unattended-upgrades -y

# Configurar
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

**Ahorro:** $360,000 - $540,000 MXN/año

---

### 44. Traductor/Localización

#### ❌ ROL ELIMINADO:

- Traducción de UI (español mexicano)
- i18n management
- **Salario:** $20,000 - $30,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**YA RESUELTO en Perfil 25 (Bloque D):**

- paraglide-js (i18n automatizado)
- Archivos JSON con términos fiscales mexicanos
- Auto-fallback a español si falta traducción

**Ahorro:** $240,000 - $360,000 MXN/año

---

### 45. Entrenador de IA (Fine-tuning)

#### ❌ ROL ELIMINADO:

- Fine-tuning de modelos (GPT, Claude)
- Crear datasets de entrenamiento
- Feedback loop manual
- **Salario:** $35,000 - $50,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**Feedback loop automático:**

```typescript
// apps/backend/src/services/ai-feedback-loop.ts
import { db } from '../db';
import { supportTickets } from '../db/schema';
import { openai } from '../lib/openai';

export async function collectFeedbackForFineTuning() {
  // 1. Obtener tickets resueltos con rating alto (> 8/10)
  const goodTickets = await db.query.supportTickets.findMany({
    where: (tickets, { and, eq, gt }) =>
      and(eq(tickets.status, 'resolved'), gt(tickets.userRating, 8)),
    limit: 100,
  });

  // 2. Formatear para fine-tuning OpenAI
  const trainingData = goodTickets.map((ticket) => ({
    messages: [
      { role: 'system', content: 'Eres el asistente de FinanzasMX.' },
      { role: 'user', content: ticket.message },
      { role: 'assistant', content: ticket.aiResponse || '' },
    ],
  }));

  // 3. Subir a OpenAI para fine-tuning
  const file = await openai.files.create({
    file: Buffer.from(JSON.stringify(trainingData)),
    purpose: 'fine-tune',
  });

  const fineTune = await openai.fineTuning.jobs.create({
    training_file: file.id,
    model: 'gpt-4o-mini-2024-07-18',
  });

  console.log(`✅ Fine-tuning job created: ${fineTune.id}`);
}

// Ejecutar cada mes
setInterval(collectFeedbackForFineTuning, 30 * 24 * 60 * 60 * 1000);
```

**Ahorro:** $420,000 - $600,000 MXN/año

---

### 46. Analista de Soporte Nivel 3

#### ❌ ROL ELIMINADO:

- Resolver bugs complejos
- Acceso God Mode a base de datos
- **Salario:** $30,000 - $40,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**God Mode Admin Panel:**

```svelte
<!-- apps/frontend/src/routes/admin/users/[id]/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  let { data } = $props();

  async function resetPassword() {
    const confirmed = confirm('¿Resetear contraseña del usuario?');
    if (confirmed) {
      await fetch(`/api/admin/users/${data.user.id}/reset-password`, { method: 'POST' });
      alert('Contraseña reseteada. Email enviado al usuario.');
    }
  }

  async function refundSubscription() {
    const confirmed = confirm('¿Reembolsar suscripción?');
    if (confirmed) {
      await fetch(`/api/admin/users/${data.user.id}/refund`, { method: 'POST' });
      alert('Reembolso procesado en Stripe.');
    }
  }
</script>

<div class="god-mode-panel">
  <h1>🛡️ God Mode: {data.user.email}</h1>

  <section>
    <h2>Info del Usuario</h2>
    <p><strong>RFC:</strong> {data.user.rfc}</p>
    <p><strong>Plan:</strong> {data.user.plan}</p>
    <p><strong>Suscripción:</strong> {data.user.subscriptionStatus}</p>
  </section>

  <section>
    <h2>Acciones</h2>
    <button onclick={resetPassword}>Resetear Contraseña</button>
    <button onclick={refundSubscription}>Reembolsar Suscripción</button>
  </section>

  <section>
    <h2>Runbooks</h2>
    <ul>
      <li><a href="/docs/runbooks/user-locked-account">Usuario bloqueado</a></li>
      <li><a href="/docs/runbooks/duplicate-invoice">Factura duplicada</a></li>
      <li><a href="/docs/runbooks/sat-sync-failed">Error sincronización SAT</a></li>
    </ul>
  </section>
</div>

<style>
  .god-mode-panel {
    padding: var(--size-6);
  }

  button {
    margin-right: var(--size-2);
    padding: var(--size-2) var(--size-4);
    background: var(--red-6);
    color: white;
    border: none;
    border-radius: var(--radius-2);
    cursor: pointer;
  }

  button:hover {
    background: var(--red-7);
  }
</style>
```

**Ahorro:** $360,000 - $480,000 MXN/año

---

### 47. Sustainability Officer (Green IT)

#### ❌ ROL ELIMINADO:

- Medir carbon footprint
- Optimizar consumo energético
- **Salario:** $25,000 - $35,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**YA CUBIERTO:**

- Dark mode CSS (ahorra batería en dispositivos)
- VPS Hostinger (datacenter eficiente)
- Sin oficina = $0 consumo eléctrico

**Extra:** Documentar en Wiki:

```markdown
# 🌱 Compromiso Green IT

1. **Dark mode por defecto** (ahorra 30% batería en OLED)
2. **Sin oficina física** (0 toneladas CO2)
3. **VPS eficiente** (Hostinger usa energía renovable)
4. **Código optimizado** (menos CPU = menos energía)
```

**Ahorro:** $300,000 - $420,000 MXN/año

---

### 48. Business Intelligence (BI)

#### ❌ ROL ELIMINADO:

- Crear dashboards en Tableau/Power BI
- Análisis de KPIs
- **Salario:** $35,000 - $50,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**YA RESUELTO:**

- Grafana (self-hosted en Dokploy)
- PostgreSQL queries directas (ver Perfil 40)
- Dashboards de:
  - Revenue
  - MRR
  - Churn Rate
  - Runway

**Ahorro:** $420,000 - $600,000 MXN/año

---

### 49. Agile Coach

#### ❌ ROL ELIMINADO:

- Facilitar sprints
- Retrospectivas
- Daily standups
- **Salario:** $30,000 - $45,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**GitHub Projects (Kanban):**

- Columnas: Backlog, In Progress, Done
- Labels: `priority:high`, `good-first-issue`, `bug`
- Milestones = Sprints (2 semanas)

**Async Sprints:**

- NO daily standups → Update en Discord text
- Retrospectiva asíncrona (Google Doc compartido)

**Ahorro:** $360,000 - $540,000 MXN/año

---

### 50. "Abogado del Diablo" (Premortem)

#### ❌ ROL ELIMINADO:

- Challenger en decisiones
- Premortem sessions
- **Salario:** $30,000 - $40,000 MXN/mes

#### ✅ SOLUCIÓN BOOTSTRAP:

**Premortem trimestral (1 hora, Google Meet):**

**Preguntas clave:**

1. ¿Qué podría matar a FinanzasMX en los próximos 6 meses?
2. ¿Qué asumimos que es cierto pero podría ser falso?
3. ¿Qué haría la competencia para destruirnos?

**Documentar respuestas en Wiki.**

**Ahorro:** $360,000 - $480,000 MXN/año

---

## 💰 Ahorro Total (Perfiles 41-50)

| Concepto | Costo Eliminado |
|----------|----------------|
| Salarios (10 personas) | $335k-480k MXN/mes |
| Herramientas SaaS | $10k-20k MXN/mes |
| **TOTAL ANUAL** | **$4,140,000 - $6,000,000 MXN/año** |

| Concepto Nuevo | Costo |
|---------------|-------|
| Open source tools (self-hosted) | $0 MXN |
| VPS Hostinger (ya cubierto) | $0 MXN |
| **TOTAL ANUAL** | **$0 MXN/año** |

### 🎉 Ahorro Neto: **$4.14M - $6M MXN/año** (100% reducción)

---

## ✅ Checklist de Implementación

### Automatizaciones críticas:

- [ ] Prometheus + Grafana (Dokploy)
- [ ] Script audit de licencias (cronjob semanal)
- [ ] Ansible playbook hardening (ejecutar 1 vez)
- [ ] God Mode panel (`/admin/users`)
- [ ] Feedback loop AI (cronjob mensual)
- [ ] GitHub Projects (Kanban setup)
- [ ] Premortem session Q1 2026 agendada

### Documentación:

- [ ] Runbooks en Wiki SvelteKit (`/docs/runbooks`)
- [ ] SLOs documentados
- [ ] Playbooks de Ansible en repo

---

**Resultado:** 10 roles burocráticos **ELIMINADOS COMPLETAMENTE**. Reemplazados con scripts y herramientas open source. Ahorro: **$4M-6M MXN/año**.

**Próximo paso:** Resumen Ejecutivo Bloque F consolidando todo el bloque.
