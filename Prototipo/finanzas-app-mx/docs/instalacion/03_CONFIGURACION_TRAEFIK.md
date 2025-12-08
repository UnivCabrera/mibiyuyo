# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS (Servidor Privado Virtual) para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Crea una cuenta y lanza una nueva instancia de VPS con las siguientes especificaciones mínimas:

- **Sistema Operativo**: Ubuntu 22.04 LTS
- **CPU**: 2 vCPUs
- **RAM**: 4 GB
- **Almacenamiento**: 20 GB SSD

### 1.2. Acceso al VPS

Accede a tu VPS mediante SSH:

```bash
ssh usuario@ip_del_vps
```

### 1.3. Actualización del Sistema

Actualiza los paquetes del sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.4. Instalación de Dependencias

Instala las dependencias necesarias:

```bash
sudo apt install -y curl git
```

## 2. Instalación de Docker y Docker Compose

### 2.1. Instalación de Docker

Ejecuta los siguientes comandos para instalar Docker:

```bash
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce
```

### 2.2. Instalación de Docker Compose

Instala Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2.3. Verificación de Instalación

Verifica que Docker y Docker Compose estén instalados correctamente:

```bash
docker --version
docker-compose --version
```

## 3. Estructura del Proyecto

Crea la estructura de carpetas para tu proyecto:

```bash
mkdir -p ~/proyecto-cfdi/backend ~/proyecto-cfdi/frontend
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

### 4.2. Configuración de Docker Compose

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
    environment:
      - NODE_ENV=production
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

### 5.2. Actualización del Docker Compose

Actualiza el archivo `docker-compose.yml` para incluir el frontend:

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
    environment:
      - NODE_ENV=production

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

Puedes usar un servicio como GitHub Actions o GitLab CI/CD para configurar un webhook que ejecute el script `deploy.sh` cada vez que se haga un push a la rama principal.

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
          source: "."
          target: "/home/usuario/proyecto-cfdi"

      - name: Run deploy script
        run: ssh -i ${{ secrets.VPS_SSH_KEY }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_IP }} 'bash -s' < deploy.sh
```

## 8. Guía de Troubleshooting

### 8.1. Problemas Comunes

- **Error de conexión a la base de datos**: Verifica las credenciales y la configuración de la base de datos.
- **Contenedor no se inicia**: Revisa los logs del contenedor con `docker-compose logs`.
- **Problemas de permisos**: Asegúrate de que los archivos en el VPS tengan los permisos correctos.

### 8.2. Comandos Útiles

- Ver el estado de los contenedores:
  ```bash
  docker-compose ps
  ```
- Detener todos los contenedores:
  ```bash
  docker-compose down
  ```
- Reiniciar contenedores:
  ```bash
  docker-compose restart
  ```

## 9. Conclusión

Has configurado un VPS desde cero para un proyecto financiero CFDI utilizando Docker para contenerizar tanto el backend como el frontend. Además, has implementado un sistema de despliegue automático mediante webhooks. Asegúrate de seguir las mejores prácticas de seguridad y mantenimiento para tu VPS y tus aplicaciones. ¡Buena suerte con tu proyecto!
