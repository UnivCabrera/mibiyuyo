# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través de los pasos necesarios para configurar un VPS (Servidor Privado Virtual) desde cero, optimizando la arquitectura para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS
Elige un proveedor de VPS como DigitalOcean, AWS, Linode o Vultr. Asegúrate de seleccionar un plan que cumpla con los requisitos de tu proyecto.

### 1.2. Creación del VPS
1. Crea una nueva instancia de VPS.
2. Selecciona un sistema operativo (Ubuntu 22.04 LTS es una buena opción).
3. Configura el tamaño de la instancia según tus necesidades.

### 1.3. Acceso al VPS
Accede a tu VPS a través de SSH:
```bash
ssh root@<IP_DEL_VPS>
```

### 1.4. Actualización del Sistema
Actualiza los paquetes del sistema:
```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Instalación de Dependencias

### 2.1. Instalación de Docker
Instala Docker siguiendo estos pasos:
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

### 2.3. Instalación de Bun
Instala Bun, un runtime para JavaScript y TypeScript:
```bash
curl -fsSL https://bun.sh/install | bash
```
Asegúrate de agregar Bun a tu PATH.

## 3. Estructura del Proyecto

Crea la estructura básica del proyecto:
```bash
mkdir -p ~/proyecto-cfdi/backend ~/proyecto-cfdi/frontend
cd ~/proyecto-cfdi
```

## 4. Dockerfiles

### 4.1. Dockerfile para Backend (Bun)

Crea un archivo `Dockerfile` en `~/proyecto-cfdi/backend`:
```dockerfile
# Dockerfile para Backend
FROM bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "run", "start"]
```

### 4.2. Dockerfile para Frontend (SvelteKit)

Crea un archivo `Dockerfile` en `~/proyecto-cfdi/frontend`:
```dockerfile
# Dockerfile para Frontend
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
```

## 5. Scripts de Utilidad

Crea un script para construir y ejecutar los contenedores. Crea un archivo `deploy.sh` en `~/proyecto-cfdi`:
```bash
#!/bin/bash

# Script para desplegar la aplicación
cd backend
docker build -t backend .
cd ../frontend
docker build -t frontend .

# Levantar los contenedores
docker-compose up -d
```
No olvides dar permisos de ejecución:
```bash
chmod +x deploy.sh
```

## 6. Configuración de Webhooks para Despliegue Automático

### 6.1. Configuración de un Webhook
Puedes usar un servicio como GitHub Actions o GitLab CI para configurar un webhook que dispare el script de despliegue cada vez que se haga un push a la rama principal.

### 6.2. Ejemplo de GitHub Actions
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
        run: ssh -i ${{ secrets.VPS_SSH_KEY }} ${{ secrets.VPS_USER }}@${{ secrets.VPS_IP }} 'bash /home/usuario/proyecto-cfdi/deploy.sh'
```

## 7. Guía de Troubleshooting

### 7.1. Problemas Comunes
- **Error de conexión SSH**: Asegúrate de que tu clave SSH esté correctamente configurada y que el puerto 22 esté abierto en el firewall.
- **Contenedor no se inicia**: Revisa los logs del contenedor con `docker logs <nombre_del_contenedor>`.
- **Problemas de red**: Asegúrate de que los puertos necesarios estén expuestos en tu `docker-compose.yml`.

### 7.2. Comandos Útiles
- Para ver el estado de los contenedores:
  ```bash
  docker ps
  ```
- Para detener todos los contenedores:
  ```bash
  docker-compose down
  ```
- Para acceder a un contenedor en ejecución:
  ```bash
  docker exec -it <nombre_del_contenedor> /bin/sh
  ```

## 8. Conclusión

Siguiendo esta guía, deberías poder configurar un VPS desde cero para tu proyecto financiero CFDI, utilizando Docker para contenerizar tanto el backend como el frontend. La implementación de webhooks te permitirá realizar despliegues automáticos, y la sección de troubleshooting te ayudará a resolver problemas comunes. ¡Buena suerte con tu proyecto!