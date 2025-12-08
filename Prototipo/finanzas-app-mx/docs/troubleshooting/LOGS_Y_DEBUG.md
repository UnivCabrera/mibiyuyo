# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

## Índice

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración del VPS](#configuración-del-vps)
4. [Arquitectura Evolutiva del Proyecto](#arquitectura-evolutiva-del-proyecto)
5. [Configuración de Docker](#configuración-de-docker)
   - [Dockerfile para Backend (Bun)](#dockerfile-para-backend-bun)
   - [Dockerfile para Frontend (SvelteKit)](#dockerfile-para-frontend-sveltekit)
6. [Scripts de Utilidad](#scripts-de-utilidad)
7. [Configuración de Webhooks para Despliegue Automático](#configuración-de-webhooks-para-despliegue-automático)
8. [Guía de Troubleshooting](#guía-de-troubleshooting)
9. [Conclusión](#conclusión)

## Introducción

Esta guía tiene como objetivo proporcionar un enfoque paso a paso para la instalación y configuración de un VPS (Servidor Privado Virtual) para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Se abordarán aspectos como la configuración del servidor, la arquitectura del proyecto, la creación de Dockerfiles optimizados, scripts de utilidad, y la configuración de webhooks para despliegue automático.

## Requisitos Previos

- Acceso a un VPS (se recomienda Ubuntu 20.04 o superior).
- Conocimientos básicos de línea de comandos.
- Docker y Docker Compose instalados en el VPS.
- Un dominio registrado (opcional, pero recomendado para producción).

## Configuración del VPS

1. **Acceso al VPS**:
   - Conéctate a tu VPS usando SSH:
     ```bash
     ssh usuario@ip_del_vps
     ```

2. **Actualiza el sistema**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **Instala Docker y Docker Compose**:
   ```bash
   sudo apt install docker.io
   sudo systemctl start docker
   sudo systemctl enable docker
   sudo apt install docker-compose
   ```

4. **Agrega tu usuario al grupo de Docker**:
   ```bash
   sudo usermod -aG docker $USER
   ```

5. **Reinicia la sesión** para aplicar los cambios.

## Arquitectura Evolutiva del Proyecto

La arquitectura del proyecto se basa en una separación clara entre el backend y el frontend:

- **Backend**: Implementado con Bun, que se encargará de la lógica de negocio y la gestión de datos.
- **Frontend**: Implementado con SvelteKit, que proporcionará la interfaz de usuario.

### Estructura de Carpetas

```
/proyecto-cfdi
|-- /backend
|   |-- Dockerfile
|   |-- src/
|   |-- package.json
|-- /frontend
|   |-- Dockerfile
|   |-- src/
|   |-- package.json
|-- docker-compose.yml
|-- scripts/
|   |-- deploy.sh
|-- .env
```

## Configuración de Docker

### Dockerfile para Backend (Bun)

Crea un archivo `Dockerfile` en la carpeta `/backend`:

```dockerfile
# Dockerfile para Backend
FROM jarredsumner/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .

EXPOSE 3000
CMD ["bun", "run", "start"]
```

### Dockerfile para Frontend (SvelteKit)

Crea un archivo `Dockerfile` en la carpeta `/frontend`:

```dockerfile
# Dockerfile para Frontend
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### docker-compose.yml

Crea un archivo `docker-compose.yml` en la raíz del proyecto:

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production

  frontend:
    build:
      context: ./frontend
    ports:
      - "5173:5173"
    environment:
      - NODE_ENV=production
```

## Scripts de Utilidad

Crea un script de despliegue en `scripts/deploy.sh`:

```bash
#!/bin/bash

# Script para desplegar la aplicación
docker-compose down
docker-compose up --build -d
```

No olvides dar permisos de ejecución al script:

```bash
chmod +x scripts/deploy.sh
```

## Configuración de Webhooks para Despliegue Automático

1. **Configura un webhook en tu repositorio** (GitHub, GitLab, etc.) que apunte a tu VPS.
2. **Crea un endpoint en tu servidor** que escuche las solicitudes del webhook. Puedes usar un servidor simple en Node.js o Bun para esto.
3. **Ejemplo de endpoint**:

```javascript
// server.js
import express from 'express';
import { exec } from 'child_process';

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
  exec('./scripts/deploy.sh', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error en el despliegue');
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send('Error en el despliegue');
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send('Despliegue exitoso');
  });
});

app.listen(3001, () => {
  console.log('Servidor de webhook escuchando en el puerto 3001');
});
```

## Guía de Troubleshooting

1. **Problemas de conexión**:
   - Verifica que el VPS esté en línea y que el puerto esté abierto.
   - Asegúrate de que el firewall no esté bloqueando las conexiones.

2. **Errores en Docker**:
   - Revisa los logs de Docker:
     ```bash
     docker-compose logs
     ```
   - Asegúrate de que las imágenes se construyan correctamente.

3. **Problemas de despliegue**:
   - Verifica que el script `deploy.sh` tenga permisos de ejecución.
   - Revisa los logs del servidor de webhook para errores.

4. **Errores en la aplicación**:
   - Revisa los logs de la aplicación en el contenedor:
     ```bash
     docker logs <nombre_del_contenedor>
     ```

## Conclusión

Esta guía proporciona un enfoque integral para la instalación y configuración de un VPS para un proyecto financiero CFDI. Siguiendo estos pasos, deberías poder configurar un entorno de desarrollo y producción robusto utilizando Docker, Bun y SvelteKit. Recuerda siempre mantener tu sistema y dependencias actualizadas y realizar pruebas exhaustivas antes de poner en producción cualquier cambio.