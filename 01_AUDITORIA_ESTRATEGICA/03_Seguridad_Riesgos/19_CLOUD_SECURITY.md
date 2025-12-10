# ☁️ Perfil 19: Cloud Security Engineer

**Auditoría Estratégica - Bloque C: Seguridad y Riesgos**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Ingeniero de Seguridad en la Nube asegura la infraestructura subyacente (VPS, Redes, Contenedores). Su objetivo es reducir la superficie de ataque, asegurar que solo los puertos necesarios estén abiertos y que los contenedores corran con privilegios mínimos.

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Infraestructura | ✅ VPS Dokploy | `00_ARQUITECTURA_CENTRAL/04_DOKPLOY_CONFIGURACION_COMPLETA.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| CLD-001 | **Hardening de VPS (UFW + Fail2Ban)** | 🔴 Bloqueante | `02_CIBERSEGURIDAD/VPS_HARDENING_SCRIPT.sh` | Sem 1 |
| CLD-002 | **Gestión de Secretos (ENV Encryption)** | 🟠 Alto | `16_MCP_CONFIGURACION/SECRETS_MANAGEMENT.md` | Sem 1 |
| CLD-003 | Docker Security (Non-root users) | 🟡 Medio | `Dockerfile` | Sem 2 |
| CLD-004 | VPN para Acceso Administrativo | 🟢 Bajo | Configuración WireGuard | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Script de Hardening Inicial (Ubuntu)

Configuración básica de firewall y protección SSH.

```bash
#!/bin/bash
# vps-hardening.sh

# 1. Actualizar sistema
apt update && apt upgrade -y

# 2. Instalar Fail2Ban
apt install fail2ban -y
systemctl enable fail2ban
systemctl start fail2ban

# 3. Configurar UFW (Firewall)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
# Dokploy ports (si aplica)
ufw allow 3000
ufw enable

# 4. Deshabilitar login root por SSH
sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
service ssh restart
```

### 2. Dockerfile Seguro (Usuario no root)

Evitar correr la aplicación como root dentro del contenedor.

```dockerfile
# Dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# ... build steps ...

FROM base as release
# Crear usuario de sistema
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 elysia

COPY --from=install /app/node_modules ./node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/package.json .

# Cambiar al usuario seguro
USER elysia

EXPOSE 3000
ENTRYPOINT [ "bun", "run", "src/index.ts" ]
```

---

## 🔗 Referencias

- **CIS Benchmarks:** Guías de configuración segura para Ubuntu y Docker.
- **Docker Security Best Practices:** User namespaces, capabilities drop.

---

*Última actualización: 9 Diciembre 2025*
