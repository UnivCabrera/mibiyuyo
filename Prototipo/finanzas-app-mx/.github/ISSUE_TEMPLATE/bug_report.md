# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS
Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Crea una instancia con al menos 2 GB de RAM y 1 vCPU.

### 1.2. Acceso al VPS
Conéctate a tu VPS usando SSH:
```bash
ssh root@<IP_DEL_VPS>
```

### 1.3. Actualización del Sistema
Actualiza los paquetes del sistema:
```bash
apt update && apt upgrade -y
```

### 1.4. Instalación de Dependencias
Instala las dependencias necesarias:
```bash
apt install -y curl git docker.io docker-compose
```

### 1.5. Configuración de Docker
Agrega tu usuario al grupo de Docker:
```bash
usermod -aG docker $USER
```
Cierra la sesión y vuelve a iniciar sesión para aplicar los cambios.

## 2. Estructura del Proyecto

Crea la estructura básica del proyecto:
```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 3. Backend con Bun

### 3.1. Creación del Dockerfile para Backend
Crea un archivo `Dockerfile` en la carpeta `backend`:
```Dockerfile
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

### 3.3. Creación del archivo `docker-compose.yml`
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

## 4. Frontend con SvelteKit

### 4.1. Creación del Dockerfile para Frontend
Crea un archivo `Dockerfile` en la carpeta `frontend`:
```Dockerfile
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
    "dev": "vite"
  },
  "dependencies": {
    "svelte": "^3.0.0",
    "vite": "^2.0.0"
  }
}
```

### 4.3. Actualización del archivo `docker-compose.yml`
Actualiza el archivo `docker-compose.yml` para incluir el frontend:
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

  frontend:
    build:
      context: ./frontend
    ports:
      - "5000:5000"
    volumes:
      - ./frontend:/app
```

## 5. Scripts de Utilidad

Crea un script para iniciar los contenedores:
```bash
# start.sh
#!/bin/bash
docker-compose up --build
```
Hazlo ejecutable:
```bash
chmod +x start.sh
```

## 6. Configuración de Webhooks para Despliegue Automático

### 6.1. Configuración de un Webhook
Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que dispare un script en tu VPS al hacer un push a la rama principal.

Ejemplo de un script de despliegue:
```bash
# deploy.sh
#!/bin/bash
cd ~/proyecto-cfdi
git pull origin main
docker-compose down
docker-compose up --build -d
```
Hazlo ejecutable:
```bash
chmod +x deploy.sh
```

### 6.2. Configuración del Webhook
Configura el webhook en tu repositorio para que apunte a tu VPS y ejecute el script `deploy.sh`.

## 7. Guía de Troubleshooting

### 7.1. Problemas Comunes
- **Error de conexión a la base de datos**: Verifica que las credenciales y la configuración de la base de datos sean correctas.
- **Contenedor no se inicia**: Revisa los logs del contenedor con `docker logs <nombre_del_contenedor>`.
- **Problemas de permisos**: Asegúrate de que los archivos y carpetas tengan los permisos correctos.

### 7.2. Comandos Útiles
- Ver el estado de los contenedores:
  ```bash
  docker-compose ps
  ```
- Detener los contenedores:
  ```bash
  docker-compose down
  ```
- Reiniciar los contenedores:
  ```bash
  docker-compose restart
  ```

## 8. Conclusión

Has configurado un VPS desde cero para un proyecto financiero CFDI utilizando Docker. Has creado un backend con Bun y un frontend con SvelteKit, además de configurar scripts de utilidad y webhooks para despliegue automático. Con esta guía, deberías estar bien preparado para manejar tu proyecto y solucionar problemas comunes que puedan surgir.