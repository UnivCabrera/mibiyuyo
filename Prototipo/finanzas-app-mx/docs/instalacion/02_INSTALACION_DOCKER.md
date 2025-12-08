# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting detallada.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que cumpla con los requisitos de tu proyecto.

### 1.2. Creación del VPS

1. Crea una nueva instancia de VPS con un sistema operativo Linux (Ubuntu 22.04 LTS es una buena opción).
2. Configura la dirección IP y asegúrate de que el acceso SSH esté habilitado.

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

Crea la estructura de directorios para tu proyecto:

```bash
mkdir -p ~/proyecto-cfdi/backend ~/proyecto-cfdi/frontend
cd ~/proyecto-cfdi
```

## 4. Configuración del Backend (Bun)

### 4.1. Dockerfile para el Backend

Crea un archivo llamado `Dockerfile` en el directorio `backend`:

```dockerfile
# backend/Dockerfile
FROM jarredsumner/bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Configuración de Bun

Asegúrate de tener un archivo `bun.lockb` y `package.json` en el directorio `backend`.

### 4.3. Docker Compose para el Backend

Crea un archivo `docker-compose.yml` en el directorio `proyecto-cfdi`:

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

### 5.1. Dockerfile para el Frontend

Crea un archivo llamado `Dockerfile` en el directorio `frontend`:

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

### 5.2. Docker Compose para el Frontend

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

Puedes usar un servicio como GitHub Actions o un servidor de CI/CD para configurar un webhook que ejecute el script `deploy.sh` cada vez que se realice un push a la rama principal.

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

- **Error de conexión a la base de datos**: Verifica que las credenciales y la configuración de la base de datos sean correctas.
- **Problemas de permisos**: Asegúrate de que los archivos y directorios tengan los permisos correctos.
- **Errores de Docker**: Usa `docker logs <nombre_del_contenedor>` para ver los logs y diagnosticar problemas.

### 8.2. Comandos Útiles

- Ver contenedores en ejecución:
  ```bash
  docker ps
  ```
- Ver logs de un contenedor:
  ```bash
  docker logs <nombre_del_contenedor>
  ```
- Detener todos los contenedores:
  ```bash
  docker-compose down
  ```

## Conclusión

Siguiendo esta guía, deberías poder configurar un VPS desde cero para un proyecto financiero CFDI utilizando Docker, Bun y SvelteKit. Asegúrate de adaptar la configuración a las necesidades específicas de tu proyecto y de mantener la seguridad de tu VPS. ¡Buena suerte!
