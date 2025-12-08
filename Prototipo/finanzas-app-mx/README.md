# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

## Índice

1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración del VPS](#configuración-del-vps)
   - 3.1. [Elección del Proveedor de VPS](#elección-del-proveedor-de-vps)
   - 3.2. [Instalación del Sistema Operativo](#instalación-del-sistema-operativo)
   - 3.3. [Configuración de Seguridad](#configuración-de-seguridad)
4. [Arquitectura Evolutiva del Proyecto](#arquitectura-evolutiva-del-proyecto)
5. [Configuración de Docker](#configuración-de-docker)
   - 5.1. [Dockerfile para Backend (Bun)](#dockerfile-para-backend-bun)
   - 5.2. [Dockerfile para Frontend (SvelteKit)](#dockerfile-para-frontend-sveltekit)
6. [Scripts de Utilidad](#scripts-de-utilidad)
7. [Configuración de Webhooks para Despliegue Automático](#configuración-de-webhooks-para-despliegue-automático)
8. [Guía de Troubleshooting](#guía-de-troubleshooting)
9. [Conclusión](#conclusión)

## Introducción

Esta guía tiene como objetivo proporcionar un enfoque paso a paso para la instalación y configuración de un VPS para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Se abordarán aspectos como la configuración del servidor, la arquitectura del proyecto, la creación de contenedores Docker y la automatización del despliegue.

## Requisitos Previos

- Conocimientos básicos de administración de sistemas Linux.
- Familiaridad con Docker y contenedores.
- Acceso a un VPS con privilegios de administrador.

## Configuración del VPS

### Elección del Proveedor de VPS

Selecciona un proveedor de VPS que se ajuste a tus necesidades. Algunas opciones populares son:

- DigitalOcean
- AWS EC2
- Linode
- Vultr

### Instalación del Sistema Operativo

1. **Selecciona el Sistema Operativo**: Ubuntu 22.04 LTS es una opción recomendada.
2. **Conéctate al VPS**: Usa SSH para conectarte a tu VPS.
   ```bash
   ssh root@<IP_DEL_VPS>
   ```

### Configuración de Seguridad

1. **Actualiza el sistema**:
   ```bash
   apt update && apt upgrade -y
   ```

2. **Crea un nuevo usuario**:
   ```bash
   adduser nombre_usuario
   usermod -aG sudo nombre_usuario
   ```

3. **Configura el firewall**:
   ```bash
   ufw allow OpenSSH
   ufw enable
   ```

4. **Desactiva el acceso SSH para root**:
   Edita el archivo `/etc/ssh/sshd_config` y cambia `PermitRootLogin yes` a `PermitRootLogin no`. Luego reinicia el servicio SSH:
   ```bash
   systemctl restart ssh
   ```

## Arquitectura Evolutiva del Proyecto

La arquitectura del proyecto se basa en una separación clara entre el backend y el frontend, utilizando microservicios. El backend se encargará de la lógica de negocio y la gestión de datos, mientras que el frontend proporcionará la interfaz de usuario.

- **Backend**: Implementado en Bun, un entorno de ejecución para JavaScript.
- **Frontend**: Desarrollado con SvelteKit, un framework para aplicaciones web.

## Configuración de Docker

### Dockerfile para Backend (Bun)

Crea un archivo llamado `Dockerfile` en el directorio del backend:

```dockerfile
# Dockerfile para Backend (Bun)
FROM jarredsumner/bun:latest

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 3000

CMD ["bun", "run", "start"]
```

### Dockerfile para Frontend (SvelteKit)

Crea un archivo llamado `Dockerfile` en el directorio del frontend:

```dockerfile
# Dockerfile para Frontend (SvelteKit)
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
```

## Scripts de Utilidad

Crea un script de utilidad para facilitar el despliegue de los contenedores. Guarda el siguiente script como `deploy.sh` en el directorio raíz del proyecto:

```bash
#!/bin/bash

# Script para desplegar el proyecto

# Construir y ejecutar contenedores
docker-compose up --build -d

# Verificar el estado de los contenedores
docker ps
```

No olvides dar permisos de ejecución al script:

```bash
chmod +x deploy.sh
```

## Configuración de Webhooks para Despliegue Automático

Para configurar webhooks, puedes usar un servicio como GitHub o GitLab. A continuación, se muestra un ejemplo de cómo configurar un webhook en GitHub:

1. **Crea un endpoint en tu servidor** que escuche las solicitudes del webhook. Puedes usar un simple servidor Express para esto.

2. **Configura el webhook en GitHub**:
   - Ve a tu repositorio en GitHub.
   - Navega a "Settings" > "Webhooks" > "Add webhook".
   - Introduce la URL de tu servidor y selecciona el evento "push".

3. **Ejemplo de código para el servidor**:

```javascript
const express = require('express');
const { exec } = require('child_process');

const app = express();
app.use(express.json());

app.post('/webhook', (req, res) => {
    exec('bash /ruta/a/tu/deploy.sh', (error, stdout, stderr) => {
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

app.listen(3000, () => {
    console.log('Servidor de webhooks escuchando en el puerto 3000');
});
```

## Guía de Troubleshooting

### Problemas Comunes

1. **Error de conexión a la base de datos**:
   - Verifica que las credenciales de la base de datos sean correctas.
   - Asegúrate de que el contenedor de la base de datos esté en ejecución.

2. **Contenedor no se inicia**:
   - Revisa los logs del contenedor:
     ```bash
     docker logs <nombre_del_contenedor>
     ```

3. **Problemas de red**:
   - Asegúrate de que los puertos estén expuestos correctamente en el `Dockerfile`.
   - Verifica la configuración del firewall.

4. **Errores de compilación**:
   - Asegúrate de que todas las dependencias estén correctamente instaladas en el `Dockerfile`.

## Conclusión

Esta guía proporciona un marco completo para la instalación y configuración de un VPS para un proyecto financiero CFDI. Siguiendo estos pasos, podrás establecer un entorno de desarrollo y producción robusto y escalable. Recuerda siempre mantener tu sistema actualizado y realizar copias de seguridad periódicas de tus datos.