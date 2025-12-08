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

Esta guía tiene como objetivo proporcionar un enfoque paso a paso para la instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Se abordarán aspectos como la configuración del servidor, la arquitectura del proyecto, la creación de Dockerfiles optimizados, scripts de utilidad y la configuración de webhooks para despliegue automático.

## Requisitos Previos

- Un VPS con acceso root (puedes usar proveedores como DigitalOcean, AWS, Linode, etc.).
- Conocimientos básicos de Linux y administración de servidores.
- Familiaridad con Docker y herramientas de CI/CD.

## Configuración del VPS

1. **Acceso al VPS**:
   - Conéctate a tu VPS usando SSH:
     ```bash
     ssh root@tu-ip-del-vps
     ```

2. **Actualización del Sistema**:
   - Actualiza los paquetes del sistema:
     ```bash
     apt update && apt upgrade -y
     ```

3. **Instalación de Dependencias**:
   - Instala `curl`, `git`, `docker`, y `docker-compose`:
     ```bash
     apt install -y curl git
     curl -fsSL https://get.docker.com -o get-docker.sh
     sh get-docker.sh
     apt install -y docker-compose
     ```

4. **Agregar tu usuario al grupo de Docker** (opcional):
   ```bash
   usermod -aG docker $USER
   ```

5. **Instalación de Bun**:
   - Sigue las instrucciones de instalación de Bun desde su [sitio oficial](https://bun.sh/).

6. **Instalación de Node.js y npm** (si es necesario para SvelteKit):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
   apt install -y nodejs
   ```

## Arquitectura Evolutiva del Proyecto

La arquitectura del proyecto se basa en una separación clara entre el backend y el frontend:

- **Backend**: API RESTful construida con Bun.
- **Frontend**: Aplicación web construida con SvelteKit.
- **Base de Datos**: PostgreSQL (o cualquier otra base de datos que prefieras).
- **Contenedores**: Uso de Docker para facilitar el despliegue y la escalabilidad.

## Configuración de Docker

### Dockerfile para Backend (Bun)

Crea un archivo llamado `Dockerfile.backend` en la raíz de tu proyecto:

```dockerfile
# Dockerfile.backend
FROM bun:latest

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]
```

### Dockerfile para Frontend (SvelteKit)

Crea un archivo llamado `Dockerfile.frontend` en la raíz de tu proyecto:

```dockerfile
# Dockerfile.frontend
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]
```

## Scripts de Utilidad

Crea un archivo llamado `scripts.sh` en la raíz de tu proyecto:

```bash
#!/bin/bash

# Script para construir y ejecutar contenedores
function deploy() {
    docker-compose up --build -d
}

# Script para detener contenedores
function stop() {
    docker-compose down
}

# Script para ver logs
function logs() {
    docker-compose logs -f
}

# Uso
case "$1" in
    deploy)
        deploy
        ;;
    stop)
        stop
        ;;
    logs)
        logs
        ;;
    *)
        echo "Uso: $0 {deploy|stop|logs}"
        ;;
esac
```

No olvides dar permisos de ejecución al script:

```bash
chmod +x scripts.sh
```

## Configuración de Webhooks para Despliegue Automático

1. **Configura un servidor web** (puedes usar Nginx o Apache) para recibir los webhooks.
2. **Crea un endpoint** que escuche los webhooks y ejecute el script de despliegue.

Ejemplo de un endpoint en Node.js:

```javascript
const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    exec('./scripts.sh deploy', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error en el despliegue');
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error en el despliegue');
        }
        console.log(`stdout: ${stdout}`);
        res.send('Despliegue exitoso');
    });
});

app.listen(3000, () => {
    console.log('Servidor de webhooks escuchando en el puerto 3000');
});
```

## Guía de Troubleshooting

1. **Problemas de Conexión**:
   - Verifica que el VPS esté en línea y que no haya problemas de red.
   - Asegúrate de que los puertos necesarios estén abiertos en el firewall.

2. **Errores de Docker**:
   - Usa `docker-compose logs` para ver los logs de los contenedores.
   - Asegúrate de que las imágenes se construyan correctamente.

3. **Problemas de Webhook**:
   - Verifica que el servidor que envía el webhook esté configurado correctamente.
   - Asegúrate de que el endpoint esté accesible desde Internet.

4. **Errores de Aplicación**:
   - Revisa los logs de la aplicación para identificar errores específicos.
   - Asegúrate de que todas las dependencias estén instaladas correctamente.

## Conclusión

Esta guía proporciona un marco completo para la instalación y configuración de un VPS para un proyecto financiero CFDI. Siguiendo estos pasos, podrás establecer un entorno de desarrollo y producción robusto utilizando Docker, Bun y SvelteKit. Recuerda siempre mantener tu sistema y dependencias actualizadas para garantizar la seguridad y el rendimiento óptimo de tu aplicación.