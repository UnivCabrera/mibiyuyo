# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que tenga al menos 2 GB de RAM y 1 CPU.

### 1.2. Creación del VPS

1. Crea una nueva instancia de VPS.
2. Selecciona un sistema operativo (Ubuntu 22.04 LTS es una buena opción).
3. Configura la autenticación SSH y asegúrate de tener acceso a la IP pública.

### 1.3. Acceso al VPS

Conéctate a tu VPS usando SSH:

```bash
ssh usuario@ip_del_vps
```

### 1.4. Actualización del Sistema

Actualiza los paquetes del sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Instalación de Docker y Docker Compose

### 2.1. Instalación de Docker

Ejecuta los siguientes comandos para instalar Docker:

```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
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

Crea la estructura básica del proyecto:

```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 4. Configuración del Backend (Bun)

### 4.1. Dockerfile para Backend

Crea un archivo `Dockerfile` en la carpeta `backend`:

```dockerfile
# backend/Dockerfile
FROM oven/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Configuración de Bun

Asegúrate de tener un archivo `bun.lockb` y `package.json` en la carpeta `backend`.

### 4.3. docker-compose.yml para Backend

Crea un archivo `docker-compose.yml` en la raíz del proyecto:

```yaml
version: "3.8"

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

### 5.1. Dockerfile para Frontend

Crea un archivo `Dockerfile` en la carpeta `frontend`:

```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
```

### 5.2. docker-compose.yml para Frontend

Agrega el servicio de frontend al archivo `docker-compose.yml`:

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

Crea un script para facilitar el despliegue:

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

Puedes usar un servicio como GitHub Actions o un servidor de webhook para escuchar cambios en tu repositorio y ejecutar el script de despliegue.

### 7.2. Ejemplo de GitHub Actions

Crea un archivo `.github/workflows/deploy.yml` en tu repositorio:

```yaml
name: Deploy

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
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.VPS_IP }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          source: "deploy.sh"
          target: "/home/usuario/proyecto-cfdi/"

      - name: Execute deploy script
        run: ssh -i ${{ secrets.VPS_SSH_KEY }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_IP }} 'bash /home/usuario/proyecto-cfdi/deploy.sh'
```

## 8. Guía de Troubleshooting

### 8.1. Problemas Comunes

- **Error de conexión a la base de datos**: Verifica las credenciales y la configuración de la base de datos.
- **Contenedor no se inicia**: Revisa los logs del contenedor con `docker-compose logs`.
- **Problemas de permisos**: Asegúrate de que los archivos y carpetas tengan los permisos correctos.

### 8.2. Comandos Útiles

- Ver todos los contenedores: `docker ps -a`
- Detener todos los contenedores: `docker-compose down`
- Reiniciar contenedores: `docker-compose restart`
- Ver logs de un contenedor específico: `docker-compose logs <nombre_del_servicio>`

## 9. Conclusión

Has configurado un VPS desde cero para un proyecto financiero CFDI utilizando Docker para contenerizar tanto el backend como el frontend. Además, has configurado un sistema de despliegue automático mediante webhooks. Esta guía te proporciona una base sólida para desarrollar y desplegar tu aplicación. ¡Buena suerte!
