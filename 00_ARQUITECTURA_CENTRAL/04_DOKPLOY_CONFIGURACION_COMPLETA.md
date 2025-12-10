# 🚀 DOKPLOY - CONFIGURACIÓN COMPLETA Y MEJORES PRÁCTICAS

**Proyecto:** PRO_FINAN_CONTA_PYM
**Versión:** 2.0
**Fecha:** 8 Diciembre 2025
**Objetivo:** Documentar la configuración completa de Dokploy para maximizar sus capacidades
**Proveedor Recomendado:** Hostinger (Kit Dokploy preinstalado)

---

## 🎯 RESUMEN EJECUTIVO

> **Con Hostinger Kit Dokploy, NO necesitas instalar Docker ni Dokploy manualmente.**
> Todo viene preconfigurado. Solo accedes a `http://[tu-ip]:3000` y creas tu cuenta admin.

| Método | Complejidad | Tiempo | Recomendado |
| --- | --- | --- | --- |
| **Hostinger Kit Dokploy** | 🟢 Fácil | 5 min | ✅ **SÍ** |
| Instalación manual | 🔴 Avanzado | 30-60 min | Solo si necesitas control total |

---

## 📋 ÍNDICE

1. [Instalación con Hostinger (Recomendado)](#instalación-con-hostinger-recomendado)
2. [Instalación Manual (Alternativa)](#instalación-manual-alternativa)
3. [Configuración de Seguridad](#configuración-de-seguridad)
4. [Estructura de Proyectos](#estructura-de-proyectos)
5. [Configuración de Servicios](#configuración-de-servicios)
6. [Bases de Datos](#bases-de-datos)
7. [Backups Automatizados](#backups-automatizados)
8. [CI/CD con GitHub](#cicd-con-github)
9. [Preview Environments](#preview-environments)
10. [Multi-Server (Docker Swarm)](#multi-server-docker-swarm)
11. [Monitoreo](#monitoreo)
12. [Troubleshooting](#troubleshooting)

---

## 🚀 INSTALACIÓN CON HOSTINGER (RECOMENDADO)

### ¿Qué es el Kit Dokploy de Hostinger?

Hostinger ofrece **plantillas VPS preconfiguradas** llamadas "Kits". El **Kit Dokploy** incluye:

- ✅ Ubuntu 24.04 LTS
- ✅ Docker CE + Docker Compose (interno, no lo tocas)
- ✅ Dokploy preinstalado y corriendo
- ✅ Listo para usar en minutos

**Dokploy abstrae Docker** - Tú NO ejecutas comandos Docker directamente. Dokploy maneja todo internamente a través de su interfaz web.

### Paso 1: Comprar VPS en Hostinger

1. Ir a [Hostinger VPS](https://www.hostinger.com/vps-hosting)
2. Seleccionar plan (mínimo 4GB RAM recomendado)
3. En **"Sistema Operativo"** o **"Plantilla"**, seleccionar: **Dokploy**
4. Completar compra
5. Esperar email con IP del VPS (~5 minutos)

### Paso 2: Acceder a Dokploy

```
🌐 Abrir navegador → http://[TU-IP-VPS]:3000
```

1. Se muestra pantalla "Create Admin Account"
2. Ingresar email y contraseña segura
3. Click en "Create Account"
4. ¡Listo! Ya estás en el dashboard de Dokploy

### Paso 3: Configurar SSL (HTTPS)

1. Ir a **Settings** (⚙️ en sidebar izquierdo)
2. En **Server Domain**, ingresar tu dominio (ej: `app.tudominio.com`)
3. En **Email**, ingresar tu email (para Let's Encrypt)
4. En **Certificate**, seleccionar **Let's Encrypt**
5. Click en **Save**
6. Esperar ~2 minutos

Ahora puedes acceder via: `https://app.tudominio.com:3000`

### Paso 4: Obtener API Key (para MCP)

1. Ir a **Settings** → **API**
2. Click en **Generate Token**
3. Copiar el token (formato: `dk_xxxxxxxxxxxx`)
4. Guardar en lugar seguro

---

## 🔧 INSTALACIÓN MANUAL (ALTERNATIVA)

> **Solo usar si NO tienes acceso a Hostinger Kit Dokploy o necesitas control total.**

### Requisitos del VPS

- **OS:** Ubuntu 22.04/24.04 LTS
- **RAM:** Mínimo 2GB (recomendado 4GB+)
- **CPU:** 2 vCPU mínimo
- **Disco:** 40GB+ SSD
- **Puertos:** 80, 443 abiertos

---

## ✅ CHECKLIST DÍA 1: CONFIGURACIÓN INICIAL DEL VPS (MANUAL)

> **NOTA:** Este checklist es para instalación MANUAL.
> Si usas Hostinger Kit Dokploy, salta directamente a [Configuración de Seguridad](#configuración-de-seguridad).

### Paso 1: Conexión Inicial y Actualización del Sistema

```bash
# Conectar al VPS
ssh root@TU_IP_VPS

# Actualizar sistema
apt update && apt upgrade -y

# Instalar utilidades básicas
apt install -y curl wget git htop net-tools ufw fail2ban
```

### Paso 2: Crear Usuario No-Root (Seguridad)

```bash
# Crear usuario de administración
adduser deployer
usermod -aG sudo deployer

# Copiar llaves SSH al nuevo usuario
mkdir -p /home/deployer/.ssh
cp ~/.ssh/authorized_keys /home/deployer/.ssh/
chown -R deployer:deployer /home/deployer/.ssh
chmod 700 /home/deployer/.ssh
chmod 600 /home/deployer/.ssh/authorized_keys
```

### Paso 3: Hardening SSH

```bash
# Editar configuración SSH
nano /etc/ssh/sshd_config
```

Cambiar/verificar estas líneas:

```
Port 2222                          # Cambiar puerto por defecto
PermitRootLogin no                 # Deshabilitar login root
PasswordAuthentication no          # Solo llaves SSH
MaxAuthTries 3                     # Máximo 3 intentos
```

```bash
# Reiniciar SSH (¡mantener sesión actual abierta!)
systemctl restart sshd

# Probar conexión en nueva terminal antes de cerrar la actual
ssh -p 2222 deployer@TU_IP_VPS
```

### Paso 4: Configurar Firewall UFW

```bash
# Configurar reglas básicas
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir SSH (puerto personalizado)
sudo ufw allow 2222/tcp

# Permitir HTTP/HTTPS (para Traefik)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Activar firewall
sudo ufw enable

# Verificar estado
sudo ufw status verbose
```

**Resultado esperado:**

```
Status: active

To                         Action      From
--                         ------      ----
2222/tcp                   ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

### Paso 5: Configurar Fail2Ban

```bash
# Crear configuración local
sudo nano /etc/fail2ban/jail.local
```

Contenido:

```ini
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400
```

```bash
# Reiniciar servicio
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# Verificar que funciona
sudo fail2ban-client status sshd
```

### Paso 6: Instalar Dokploy

```bash
# Instalar Dokploy (incluye Docker automáticamente)
curl -sSL https://dokploy.com/install.sh | sh
```

Esperar ~3-5 minutos. Al terminar verás:

```
Dokploy installed successfully!
Access your panel at: http://TU_IP:3000
```

### Paso 7: Configuración Inicial de Dokploy

1. **Acceder al panel:** `http://TU_IP_VPS:3000`
2. **Crear cuenta admin:** Usuario y contraseña fuertes.
3. **Configurar dominio del panel:**
   ```
   Settings → Server → Web Server
   Domain: dokploy.tudominio.com
   Enable HTTPS: ✅
   ```
4. **Activar 2FA:**
   ```
   Settings → Profile → Two-Factor Authentication → Enable
   ```

### Paso 8: Configurar Destino de Backups

Dokploy soporta nativamente S3, pero si ya tienes Google Drive con espacio pagado, puedes usarlo como destino alternativo.

#### Opción A: S3 Compatible (Backblaze B2, AWS, MinIO)

```
Settings → S3 Destinations → Add

Name: backblaze-b2 (o tu proveedor)
Endpoint: s3.us-west-000.backblazeb2.com
Bucket: profinanconta-backups
Access Key: ****
Secret Key: ****
Region: us-west-000
```

#### Opción B: Google Drive (Recomendado si ya tienes plan pagado)

Si ya pagas por Google Drive (ej. 2TB), es más económico usarlo en lugar de pagar otro servicio.

**Paso 1: Instalar rclone**

```bash
# Instalar rclone
curl https://rclone.org/install.sh | sudo bash

# Verificar instalación
rclone version
```

**Paso 2: Configurar Google Drive en rclone**

```bash
# Iniciar configuración interactiva
rclone config

# Seguir el asistente:
# n) New remote
# name> gdrive-backups
# Storage> drive (buscar "Google Drive")
# client_id> (dejar vacío, Enter)
# client_secret> (dejar vacío, Enter)
# scope> 1 (Full access)
# root_folder_id> (dejar vacío, Enter)
# service_account_file> (dejar vacío, Enter)
# Edit advanced config> n
# Use auto config> n (porque estamos en servidor sin GUI)

# Te dará una URL. Ábrela en tu navegador local, autoriza, y pega el código.
```

**Paso 3: Verificar conexión**

```bash
# Listar contenido de tu Drive
rclone ls gdrive-backups:

# Crear carpeta para backups
rclone mkdir gdrive-backups:dokploy-backups
```

**Paso 4: Configurar Dokploy para backups locales**

En Dokploy, configura los backups para que se guarden en una carpeta local:

```
Database → postgres-main → Backups → Settings
Destination: Local
Path: /var/lib/dokploy/backups
Frequency: Every 4 hours
Retention: 7 days (local)
```

**Paso 5: Crear sync automático a Google Drive**

```bash
# Crear script de sincronización
sudo nano /opt/scripts/sync-backups-gdrive.sh
```

Contenido del script:

```bash
#!/bin/bash
# Sincronizar backups de Dokploy a Google Drive
# Ejecutar cada 6 horas

LOG_FILE="/var/log/gdrive-sync.log"
SOURCE="/var/lib/dokploy/backups"
DEST="gdrive-backups:dokploy-backups"

echo "$(date): Iniciando sincronización..." >> $LOG_FILE

# Sincronizar (solo sube archivos nuevos/modificados)
rclone sync $SOURCE $DEST --log-file=$LOG_FILE --log-level INFO

# Limpiar backups viejos en Drive (mantener 30 días)
rclone delete $DEST --min-age 30d --log-file=$LOG_FILE

echo "$(date): Sincronización completada." >> $LOG_FILE
```

```bash
# Dar permisos de ejecución
sudo chmod +x /opt/scripts/sync-backups-gdrive.sh

# Probar manualmente
sudo /opt/scripts/sync-backups-gdrive.sh

# Verificar que subió
rclone ls gdrive-backups:dokploy-backups
```

**Paso 6: Programar ejecución automática (Cron)**

```bash
# Editar crontab
sudo crontab -e

# Agregar línea (sync cada 6 horas)
0 */6 * * * /opt/scripts/sync-backups-gdrive.sh
```

**Paso 7: Monitorear sincronización**

```bash
# Ver logs
tail -f /var/log/gdrive-sync.log

# Ver espacio usado en Drive
rclone size gdrive-backups:dokploy-backups
```

#### Resumen de Backups

| Componente     | Frecuencia Local | Sync a Google Drive | Retención        |
| :------------- | :--------------- | :------------------ | :--------------- |
| PostgreSQL     | Cada 4 horas     | Cada 6 horas        | 30 días en Drive |
| Redis          | Diario           | Cada 6 horas        | 30 días en Drive |
| Volúmenes      | Diario           | Cada 6 horas        | 30 días en Drive |
| Config Dokploy | Semanal (manual) | Manual              | Permanente       |

### Paso 9: Verificación Final

```bash
# Verificar Docker
docker --version
docker ps

# Verificar Dokploy
curl -I http://localhost:3000

# Verificar firewall
sudo ufw status

# Verificar fail2ban
sudo fail2ban-client status
```

### 📋 Checklist de Validación

- [ ] SSH solo funciona con llave (no contraseña)
- [ ] SSH en puerto personalizado (no 22)
- [ ] Root login deshabilitado
- [ ] UFW activo con solo puertos necesarios
- [ ] Fail2Ban protegiendo SSH
- [ ] Dokploy instalado y accesible
- [ ] 2FA activado en Dokploy
- [ ] Dominio configurado para el panel (HTTPS)
- [ ] Destino de backups S3 configurado

---

## 🔮 PREPARACIÓN PARA ESCALAMIENTO FUTURO

> Estas configuraciones NO son necesarias con 1 VPS, pero están documentadas para cuando llegue el momento.

### Puertos para Docker Swarm (Solo cuando agregues VPS 2+)

Cuando decidas escalar a múltiples servidores, necesitarás abrir estos puertos **SOLO en ese momento**:

```bash
# SOLO ejecutar cuando agregues un segundo VPS
sudo ufw allow 2377/tcp   # Cluster management
sudo ufw allow 7946/tcp   # Node communication
sudo ufw allow 7946/udp   # Node communication
sudo ufw allow 4789/udp   # Overlay network
```

### Placement Constraints (Solo con 2+ nodos)

Cuando tengas múltiples VPS, podrás configurar en Dokploy:

- Frontend → `node.labels.role == app`
- Backend → `node.labels.role == app`
- Workers → `node.labels.role == worker`
- Database → `node.role == manager`

**Por ahora:** Todo corre en el mismo nodo, no hay necesidad de separar.

---

## 🔒 CONFIGURACIÓN DE SEGURIDAD (CRÍTICO)

### Paso 1: Configurar Dominio para el Panel

```
Panel Dokploy → Settings → Server → Web Server

Domain: dokploy.profinanconta.mx
Enable HTTPS: ✅
```

### Paso 2: Activar 2FA

```
Panel → Settings → Profile → Two-Factor Authentication → Enable
```

### Paso 3: Cloudflare Tunnel (Recomendado)

Oculta completamente el panel de internet público:

```bash
# En el VPS, instalar cloudflared
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# Autenticar con Cloudflare
cloudflared tunnel login

# Crear túnel
cloudflared tunnel create dokploy-panel

# Configurar
cloudflared tunnel route dns dokploy-panel dokploy.profinanconta.mx
```

Archivo de configuración `/etc/cloudflared/config.yml`:

```yaml
tunnel: <TUNNEL-ID>
credentials-file: /root/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: dokploy.profinanconta.mx
    service: http://localhost:3000
  - service: http_status:404
```

Resultado: El panel solo es accesible vía Cloudflare (no por IP directa).

### Paso 4: Firewall del VPS (UFW)

```bash
# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Permitir SSH (cambiar puerto si usas otro)
sudo ufw allow 22/tcp

# Permitir HTTP/HTTPS (para Traefik)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Si usas Cloudflare Tunnel, puedes bloquear 80/443 y solo permitir Cloudflare IPs
# Ver: https://www.cloudflare.com/ips/

# Puertos para Docker Swarm (solo si multi-server)
# sudo ufw allow 2377/tcp  # Cluster management
# sudo ufw allow 7946/tcp  # Node communication
# sudo ufw allow 7946/udp
# sudo ufw allow 4789/udp  # Overlay network

sudo ufw enable
```

### Paso 5: Fail2Ban para SSH

```bash
sudo apt install fail2ban -y

# Configurar
sudo nano /etc/fail2ban/jail.local
```

```ini
[sshd]
enabled = true
port = 22
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
findtime = 600
```

```bash
sudo systemctl restart fail2ban
```

---

## 📁 ESTRUCTURA DE PROYECTOS EN DOKPLOY

### Organización Recomendada

```
┌─────────────────────────────────────────────────────────────────────────┐
│  DOKPLOY DASHBOARD                                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📁 Project: profinanconta-prod                                         │
│  ├── 🌐 Application: frontend                                           │
│  │   └── Domain: app.profinanconta.mx                                   │
│  ├── ⚡ Application: backend                                            │
│  │   └── Domain: api.profinanconta.mx                                   │
│  ├── 🤖 Application: embedding-service                                  │
│  │   └── Internal only (no domain)                                      │
│  ├── 🐘 Database: postgres-main                                         │
│  │   └── Backup: S3 every 4h                                            │
│  └── 🔴 Database: redis-cache                                           │
│      └── Backup: S3 daily                                               │
│                                                                         │
│  📁 Project: profinanconta-staging                                      │
│  ├── 🌐 Application: frontend-staging                                   │
│  │   └── Domain: staging.profinanconta.mx                               │
│  └── ... (mirror de prod con datos sanitizados)                         │
│                                                                         │
│  📁 Project: observability                                              │
│  ├── 📊 Application: grafana                                            │
│  │   └── Domain: metrics.profinanconta.mx                               │
│  ├── 📈 Application: prometheus                                         │
│  │   └── Internal only                                                  │
│  └── 📝 Application: loki                                               │
│      └── Internal only                                                  │
│                                                                         │
│  📁 Project: support-tools                                              │
│  ├── 💬 Application: chatwoot                                           │
│  │   └── Domain: chat.profinanconta.mx                                  │
│  └── 📚 Application: docusaurus                                         │
│      └── Domain: docs.profinanconta.mx                                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ CONFIGURACIÓN DE SERVICIOS

### Frontend (SvelteKit)

**Panel:** Project → Add Application → Git

```yaml
# Configuración en Dokploy UI
Repository: github.com/tu-org/profinanconta-frontend
Branch: main
Build Path: /
Dockerfile Path: ./Dockerfile # O usar Nixpacks

# Resources
CPU Limit: 0.5
Memory Limit: 512MB
Replicas: 1 (aumentar en Fase 2)

# Domain
Domain: app.profinanconta.mx
HTTPS: Enabled (auto Let's Encrypt)

# Health Check
Path: /api/health
Interval: 30s
Timeout: 10s
```

**Dockerfile para SvelteKit + Bun:**

```dockerfile
FROM oven/bun:1.3.3 AS builder
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM oven/bun:1.3.3-slim
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "./build/index.js"]
```

### Backend (ElysiaJS + Bun)

```yaml
# Configuración en Dokploy UI
Repository: github.com/tu-org/profinanconta-backend
Branch: main

# Resources
CPU Limit: 1
Memory Limit: 1GB
Replicas: 2

# Domain
Domain: api.profinanconta.mx
HTTPS: Enabled

# Environment Variables (en panel)
DATABASE_URL: postgresql://user:pass@postgres-main:5432/finanzas
REDIS_URL: redis://redis-cache:6379
NODE_ENV: production
# ... más variables

# Health Check
Path: /health
Interval: 15s
```

**Dockerfile para Backend Bun:**

```dockerfile
FROM oven/bun:1.3.3
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["bun", "run", "src/index.ts"]
```

---

## 🗄️ BASES DE DATOS

### PostgreSQL con pgvector

**Panel:** Project → Add Database → PostgreSQL

```yaml
Name: postgres-main
Image: pgvector/pgvector:pg16
Version: 16

# Resources
CPU Limit: 2
Memory Limit: 4GB

# Persistence
Volume Size: 50GB

# Backup (CRÍTICO)
Backup Enabled: ✅
Destination: S3
S3 Endpoint: s3.us-west-000.backblazeb2.com
S3 Bucket: profinanconta-backups
S3 Access Key: ***
S3 Secret Key: ***
Backup Frequency: Every 4 hours
Retention: 30 days
```

### Redis

```yaml
Name: redis-cache
Image: redis:7-alpine

# Resources
CPU Limit: 0.5
Memory Limit: 1GB

# Persistence
Append Only File: Yes

# Backup
Backup Enabled: ✅
Frequency: Daily
```

---

## 💾 BACKUPS AUTOMATIZADOS

### Configuración S3 (Backblaze B2 - Económico)

1. Crear bucket en Backblaze B2: `profinanconta-backups`
2. Crear Application Key con permisos de lectura/escritura
3. En Dokploy:

```
Settings → S3 Destinations → Add

Name: backblaze-b2
Endpoint: s3.us-west-000.backblazeb2.com
Bucket: profinanconta-backups
Access Key: ****
Secret Key: ****
Region: us-west-000
```

### Backup de Volúmenes (Archivos subidos, SAT, etc.)

Dokploy permite backup de volúmenes además de databases:

```
Project → Service → Volumes → Backup Settings

Enable Backup: ✅
Destination: backblaze-b2
Frequency: Daily at 3:00 AM
Retention: 14 days
```

### Verificación de Backups

```bash
# Listar backups desde CLI (opcional)
docker exec dokploy-postgres pg_dump -U postgres finanzas > backup_test.sql

# Verificar en S3
aws s3 ls s3://profinanconta-backups/postgres/ --endpoint-url=https://s3.us-west-000.backblazeb2.com
```

---

## 🔄 CI/CD CON GITHUB

### Método 1: Webhook (Recomendado)

1. En Dokploy, por cada servicio:
   ```
   Service → Settings → Webhooks → Generate Webhook URL
   ```
2. Copiar URL (ejemplo): `https://dokploy.profinanconta.mx/api/deploy/abc123xyz`

3. En GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
      - run: bun run lint

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Dokploy Deploy
        run: |
          curl -X POST "${{ secrets.DOKPLOY_WEBHOOK_URL }}" \
            -H "Content-Type: application/json"
```

4. En GitHub → Settings → Secrets → Actions:
   - `DOKPLOY_WEBHOOK_URL`: La URL del webhook

### Método 2: Git Integration Directa

Dokploy puede conectarse directamente a GitHub:

```
Service → Settings → Git → Connect GitHub

Repository: tu-org/profinanconta-frontend
Branch: main
Auto Deploy: ✅ (deploy on push)
```

---

## 🔮 PREVIEW ENVIRONMENTS

Una de las mejores features de Dokploy para QA:

```
Service → Settings → Preview Deployments → Enable

Base Domain: preview.profinanconta.mx
Auto-create on PR: ✅
Auto-delete on merge: ✅
```

**Resultado:**

- PR #123 crea automáticamente: `pr-123.preview.profinanconta.mx`
- Se destruye al mergear el PR
- QA puede probar features aisladas

---

## 🌐 MULTI-SERVER (DOCKER SWARM)

### Cuándo Activar

- CPU/RAM > 70% sostenido
- ~8,000-10,000 usuarios
- Necesidad de zero-downtime real

### Proceso (5 minutos)

**En Dokploy Panel:**

```
Settings → Servers → Add Server

Server Name: worker-01
Server IP: 192.168.x.x (IP del nuevo VPS)
SSH Port: 22
```

Dokploy genera un comando único.

**En el nuevo VPS:**

```bash
# Pegar el comando generado
curl -sSL https://dokploy.com/join.sh | sh -s -- \
  --token=abc123 \
  --manager-ip=IP_DEL_MANAGER
```

**Verificar:**

```
Settings → Servers → worker-01 debería mostrar "Connected"
```

**Distribuir réplicas:**

```
Service → Settings → Replicas: 4
Service → Settings → Placement: Spread across all nodes
```

---

## 📊 MONITOREO

### Métricas Built-in

Dokploy muestra por cada servicio:

- CPU %
- Memory usage
- Network I/O
- Logs en tiempo real

### Integrar Grafana + Prometheus

Deploy como servicios en Dokploy:

**Prometheus:**

```yaml
# docker-compose snippet para importar
services:
  prometheus:
    image: prom/prometheus:latest
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
```

**Grafana:**

```yaml
services:
  grafana:
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_ADMIN_PASSWORD}
```

---

## 🔧 TROUBLESHOOTING

### Servicio no inicia

```
1. Service → Logs → Ver errores
2. Verificar Environment Variables
3. Verificar que la imagen Docker construya localmente
4. Verificar health check path existe
```

### Base de datos no conecta

```
1. Verificar que el servicio use el nombre interno (postgres-main, no localhost)
2. Verificar credenciales en Environment Variables
3. Probar conexión desde otro contenedor:
   docker exec -it backend sh
   nc -zv postgres-main 5432
```

### Deploy falla

```
1. Revisar build logs en Dokploy
2. Verificar Dockerfile syntax
3. Si usa Nixpacks, revisar que detecte el framework correctamente
4. Verificar que el branch exista
```

### Certificado SSL no genera

```
1. Verificar que el dominio apunte al VPS (DNS propagado)
2. Verificar que puertos 80/443 estén abiertos
3. Revisar logs de Traefik en Dokploy
```

---

## 📅 MANTENIMIENTO PROGRAMADO

### Semanal

- [ ] Verificar que backups se ejecutaron (revisar S3)
- [ ] Revisar métricas de recursos
- [ ] Revisar logs de errores

### Mensual

- [ ] Actualizar Dokploy (Settings → Updates)
- [ ] Rotar credenciales de bases de datos
- [ ] Revisar y limpiar imágenes Docker antiguas

### Trimestral

- [ ] Test de restauración de backup (en staging)
- [ ] Revisión de seguridad (puertos, firewall)
- [ ] Evaluar necesidad de escalamiento

---

**Documento mantenido por:** Equipo DevOps PRO_FINAN_CONTA_PYM
**Última actualización:** 1 Diciembre 2025
