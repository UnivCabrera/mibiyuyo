# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que cumpla con los requisitos de tu proyecto.

### 1.2. Creación del VPS

1. Crea una nueva instancia de VPS con Ubuntu 22.04 LTS.
2. Configura la dirección IP y el nombre de dominio (si es necesario).
3. Asegúrate de que el VPS tenga acceso a Internet.

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

### 1.5. Instalación de Dependencias

Instala las dependencias necesarias:

```bash
sudo apt install -y curl git
```

## 2. Instalación de Docker y Docker Compose

### 2.1. Instalación de Docker

```bash
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
```

### 2.2. Instalación de Docker Compose

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

Crea la estructura de directorios para tu proyecto:

```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 4. Configuración del Backend (Bun)

### 4.1. Creación del Dockerfile para el Backend

Crea un archivo `Dockerfile` en el directorio `backend`:

```dockerfile
# backend/Dockerfile
FROM jarredsumner/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Creación del archivo `docker-compose.yml`

Crea un archivo `docker-compose.yml` en el directorio raíz:

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

### 5.1. Creación del Dockerfile para el Frontend

Crea un archivo `Dockerfile` en el directorio `frontend`:

```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
```

### 5.2. Actualización del archivo `docker-compose.yml`

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

Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que ejecute el script `deploy.sh` cada vez que se haga un push a la rama principal.

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
- **Problemas de permisos**: Asegúrate de que los archivos y directorios tengan los permisos correctos.
- **Contenedor no inicia**: Revisa los logs del contenedor con `docker logs <nombre_del_contenedor>`.

### 8.2. Comandos Útiles

- Para ver el estado de los contenedores:
  ```bash
  docker-compose ps
  ```
- Para ver los logs de un contenedor específico:
  ```bash
  docker-compose logs <nombre_del_servicio>
  ```
- Para detener y eliminar contenedores:
  ```bash
  docker-compose down
  ```

## 9. Conclusión

Has configurado un VPS desde cero para un proyecto financiero CFDI utilizando Docker. Has creado un backend con Bun y un frontend con SvelteKit, además de configurar un sistema de despliegue automático con webhooks. Esta guía te proporciona una base sólida para desarrollar y escalar tu aplicación. ¡Buena suerte!
