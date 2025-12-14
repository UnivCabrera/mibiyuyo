# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que tenga al menos 2 GB de RAM y 1 CPU.

### 1.2. Creación del VPS

1. Crea una nueva instancia de VPS con Ubuntu 22.04 LTS.
2. Configura el acceso SSH y asegúrate de tener la clave privada en tu máquina local.

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

### 1.5. Instalación de Dependencias

Instala las dependencias necesarias:

```bash
sudo apt install -y docker.io docker-compose git
```

### 1.6. Configuración de Docker

Agrega tu usuario al grupo de Docker:

```bash
sudo usermod -aG docker $USER
```

Cierra la sesión y vuelve a iniciar sesión para aplicar los cambios.

## 2. Estructura del Proyecto

Crea la estructura básica del proyecto:

```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 3. Backend con Bun

### 3.1. Creación del Dockerfile para el Backend

Crea un archivo `Dockerfile` en la carpeta `backend`:

```dockerfile
# backend/Dockerfile
FROM jarredsumner/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 3.2. Configuración del Backend

Crea un archivo `package.json` en la carpeta `backend`:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "start": "bun run server.js"
  },
  "dependencies": {
    // Agrega tus dependencias aquí
  }
}
```

### 3.3. Creación de un archivo `docker-compose.yml`

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

## 4. Frontend con SvelteKit

### 4.1. Creación del Dockerfile para el Frontend

Crea un archivo `Dockerfile` en la carpeta `frontend`:

```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

### 4.2. Configuración del Frontend

Crea un archivo `package.json` en la carpeta `frontend`:

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "svelte": "^3.0.0",
    "vite": "^2.0.0"
  }
}
```

### 4.3. Actualización del archivo `docker-compose.yml`

Agrega el servicio del frontend al archivo `docker-compose.yml`:

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

  frontend:
    build:
      context: ./frontend
    ports:
      - "5000:5000"
    volumes:
      - ./frontend:/app
```

## 5. Scripts de Utilidad

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

## 6. Configuración de Webhooks para Despliegue Automático

### 6.1. Configuración de un Webhook

Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que ejecute el script `deploy.sh` cada vez que se haga un push a la rama principal.

### 6.2. Ejemplo de GitHub Actions

Crea un archivo `.github/workflows/deploy.yml`:

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
        run: ssh -i ${{ secrets.VPS_SSH_KEY }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_IP }} 'bash ~/proyecto-cfdi/deploy.sh'
```

## 7. Guía de Troubleshooting

### 7.1. Problemas Comunes

- **Error de conexión a la base de datos**: Verifica las credenciales y la configuración de la base de datos.
- **Problemas de permisos**: Asegúrate de que los archivos y carpetas tengan los permisos correctos.
- **Errores de Docker**: Usa `docker logs <nombre_del_contenedor>` para ver los logs y diagnosticar problemas.

### 7.2. Comandos Útiles

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

## Conclusión

Siguiendo esta guía, deberías poder configurar un VPS desde cero para un proyecto financiero CFDI utilizando Docker. Asegúrate de ajustar las configuraciones según las necesidades específicas de tu proyecto y de realizar pruebas exhaustivas para garantizar que todo funcione correctamente.
