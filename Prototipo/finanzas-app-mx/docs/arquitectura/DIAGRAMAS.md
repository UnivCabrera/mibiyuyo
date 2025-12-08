# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS
Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que cumpla con los requisitos de tu proyecto.

### 1.2. Creación del VPS
1. Crea una nueva instancia de VPS con Ubuntu 22.04 LTS.
2. Asegúrate de asignar una dirección IP pública.
3. Configura las reglas de firewall para permitir el tráfico en los puertos necesarios (80, 443, 22).

### 1.3. Acceso al VPS
Conéctate a tu VPS usando SSH:
```bash
ssh root@<tu-ip-publica>
```

### 1.4. Actualización del Sistema
Actualiza los paquetes del sistema:
```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Instalación de Docker

### 2.1. Instalación de Docker
Ejecuta los siguientes comandos para instalar Docker:
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce -y
```

### 2.2. Instalación de Docker Compose
Instala Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2.3. Verificación de la Instalación
Verifica que Docker y Docker Compose estén instalados correctamente:
```bash
docker --version
docker-compose --version
```

## 3. Estructura del Proyecto

Crea la estructura de directorios para tu proyecto:
```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 4. Configuración del Backend (Bun)

### 4.1. Dockerfile para el Backend
Crea un archivo `Dockerfile` en la carpeta `backend`:
```dockerfile
# backend/Dockerfile
FROM jarredsumner/bun:latest

WORKDIR /app
COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Configuración de Bun
Asegúrate de tener un archivo `bun.lockb` y `package.json` en la carpeta `backend`.

### 4.3. docker-compose para el Backend
Crea un archivo `docker-compose.yml` en la raíz del proyecto:
```yaml
version: '3.8'
services:
  backend:
    build:
      context: ./backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend:/app
```

## 5. Configuración del Frontend (SvelteKit)

### 5.1. Dockerfile para el Frontend
Crea un archivo `Dockerfile` en la carpeta `frontend`:
```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview"]
```

### 5.2. docker-compose para el Frontend
Agrega el servicio del frontend al archivo `docker-compose.yml`:
```yaml
  frontend:
    build:
      context: ./frontend
    ports:
      - "5000:5000"
    volumes:
      - ./frontend:/app
```

## 6. Scripts de Utilidad

Crea un script de utilidad para facilitar el despliegue:
```bash
# deploy.sh
#!/bin/bash
docker-compose down
docker-compose up --build -d
```
Hazlo ejecutable:
```bash
chmod +x deploy.sh
```

## 7. Configuración de Webhooks para Despliegue Automático

### 7.1. Configuración de un Webhook
Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que ejecute el script de despliegue cada vez que se haga un push a la rama principal.

Ejemplo de configuración en GitHub Actions:
```yaml
name: Deploy to VPS

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: SSH to VPS and deploy
        uses: appleboy/ssh-action@v0.1.0
        with:
          host: ${{ secrets.VPS_IP }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd ~/proyecto-cfdi
            ./deploy.sh
```

## 8. Guía de Troubleshooting

### 8.1. Problemas Comunes
- **Docker no inicia**: Verifica los logs de Docker con `docker logs <container_id>`.
- **Errores de conexión**: Asegúrate de que los puertos estén abiertos en el firewall.
- **Problemas de permisos**: Asegúrate de que los archivos en el contenedor tengan los permisos correctos.

### 8.2. Comandos Útiles
- Verificar el estado de los contenedores:
  ```bash
  docker ps
  ```
- Ver logs de un contenedor específico:
  ```bash
  docker logs <container_id>
  ```
- Acceder a un contenedor en ejecución:
  ```bash
  docker exec -it <container_id> /bin/bash
  ```

## 9. Conclusión

Con esta guía, deberías ser capaz de instalar y configurar un VPS para un proyecto financiero CFDI utilizando Docker. Asegúrate de seguir las mejores prácticas de seguridad y mantenimiento para mantener tu servidor en óptimas condiciones. ¡Buena suerte con tu proyecto!