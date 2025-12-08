# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS (Servidor Privado Virtual) para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS
Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que tenga al menos 2 GB de RAM y 1 CPU.

### 1.2. Creación del VPS
1. Crea una nueva instancia de VPS.
2. Selecciona un sistema operativo, preferiblemente Ubuntu 22.04 LTS.
3. Configura la autenticación SSH y asegúrate de tener acceso a la IP pública.

### 1.3. Conexión al VPS
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

Crea la estructura de directorios para tu proyecto:
```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 4. Configuración del Backend (Bun)

### 4.1. Creación del Dockerfile para el Backend
Crea un archivo `Dockerfile` en la carpeta `backend`:
```dockerfile
# backend/Dockerfile
FROM jarredsumner/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Creación del archivo `docker-compose.yml`
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
    environment:
      NODE_ENV: production

  frontend:
    build:
      context: ./frontend
    ports:
      - "5000:5000"
    volumes:
      - ./frontend:/app
    environment:
      NODE_ENV: production
```

## 5. Configuración del Frontend (SvelteKit)

### 5.1. Creación del Dockerfile para el Frontend
Crea un archivo `Dockerfile` en la carpeta `frontend`:
```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "preview"]
```

## 6. Scripts de Utilidad

Crea un script para facilitar el despliegue. Crea un archivo `deploy.sh` en la raíz del proyecto:
```bash
#!/bin/bash

# Script para desplegar el proyecto
docker-compose down
docker-compose up --build -d
```
Hazlo ejecutable:
```bash
chmod +x deploy.sh
```

## 7. Configuración de Webhooks para Despliegue Automático

### 7.1. Configuración de un Webhook
Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que ejecute el script `deploy.sh` en tu VPS cada vez que se haga un push a la rama principal.

Ejemplo de un archivo de configuración de GitHub Actions (`.github/workflows/deploy.yml`):
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
- **Error de conexión a la base de datos**: Verifica que las credenciales y la URL de la base de datos sean correctas.
- **Contenedor no se inicia**: Revisa los logs del contenedor con `docker-compose logs backend` o `docker-compose logs frontend`.
- **Problemas de permisos**: Asegúrate de que los archivos y carpetas tengan los permisos correctos.

### 8.2. Comandos Útiles
- Para ver el estado de los contenedores:
  ```bash
  docker-compose ps
  ```
- Para detener los contenedores:
  ```bash
  docker-compose down
  ```
- Para reconstruir los contenedores:
  ```bash
  docker-compose up --build
  ```

## 9. Conclusión

Has configurado un VPS desde cero para un proyecto financiero CFDI utilizando Docker. Has creado un backend con Bun y un frontend con SvelteKit, además de configurar scripts de utilidad y webhooks para despliegue automático. Con esta guía, deberías estar bien equipado para gestionar y desplegar tu aplicación. ¡Buena suerte!