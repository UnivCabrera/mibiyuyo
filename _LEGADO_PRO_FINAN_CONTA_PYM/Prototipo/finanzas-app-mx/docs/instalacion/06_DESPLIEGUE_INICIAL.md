# Guía Completa para la Instalación de un VPS desde Cero para un Proyecto Financiero CFDI

Esta guía te llevará a través del proceso de instalación y configuración de un VPS (Servidor Privado Virtual) para un proyecto financiero que utiliza CFDI (Comprobante Fiscal Digital por Internet). Utilizaremos Docker para contenerizar tanto el backend (con Bun) como el frontend (con SvelteKit). También incluiremos scripts de utilidad, configuración de webhooks para despliegue automático y una guía de troubleshooting.

## 1. Preparación del VPS

### 1.1. Selección del Proveedor de VPS

Elige un proveedor de VPS que se ajuste a tus necesidades. Algunos proveedores populares son:

- DigitalOcean
- AWS (Amazon Web Services)
- Linode
- Vultr

### 1.2. Creación del VPS

1. **Selecciona el sistema operativo**: Ubuntu 22.04 LTS es una buena opción.
2. **Configura la instancia**: Elige el tamaño de la instancia según tus necesidades (CPU, RAM, almacenamiento).
3. **Configura la red**: Asegúrate de que el VPS tenga una dirección IP pública.

### 1.3. Acceso al VPS

Accede a tu VPS a través de SSH:

```bash
ssh root@<IP_DEL_VPS>
```

## 2. Instalación de Dependencias

### 2.1. Actualización del Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 2.2. Instalación de Docker y Docker Compose

```bash
# Instalar dependencias
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# Agregar la clave GPG de Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Agregar el repositorio de Docker
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# Instalar Docker
sudo apt update
sudo apt install docker-ce -y

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2.3. Instalación de Bun

```bash
curl -fsSL https://bun.sh/install | bash
```

Asegúrate de agregar Bun a tu PATH. Esto puede requerir que agregues la siguiente línea a tu archivo `~/.bashrc` o `~/.zshrc`:

```bash
export PATH="$HOME/.bun/bin:$PATH"
```

## 3. Estructura del Proyecto

Crea la estructura básica de tu proyecto:

```bash
mkdir -p ~/proyecto-cfdi/{backend,frontend}
cd ~/proyecto-cfdi
```

## 4. Dockerfiles

### 4.1. Dockerfile para Backend (Bun)

Crea un archivo `Dockerfile` en la carpeta `backend`:

```dockerfile
# backend/Dockerfile
FROM bun:latest

WORKDIR /app

COPY . .

RUN bun install

CMD ["bun", "start"]
```

### 4.2. Dockerfile para Frontend (SvelteKit)

Crea un archivo `Dockerfile` en la carpeta `frontend`:

```dockerfile
# frontend/Dockerfile
FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "preview"]
```

## 5. Archivos de Configuración de Docker Compose

Crea un archivo `docker-compose.yml` en la raíz del proyecto:

```yaml
version: "3.8"

services:
  backend:
    build:
      context: ./backend
    ports:
      - "3000:3000"

  frontend:
    build:
      context: ./frontend
    ports:
      - "5000:5000"
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

Puedes usar un servicio como GitHub o GitLab para configurar un webhook que apunte a un script en tu VPS. Crea un archivo `webhook.sh`:

```bash
#!/bin/bash

# Cambia al directorio del proyecto
cd ~/proyecto-cfdi

# Actualiza el repositorio
git pull origin main

# Despliega la aplicación
./deploy.sh
```

Hazlo ejecutable:

```bash
chmod +x webhook.sh
```

### 7.2. Configuración del Servidor Web

Instala un servidor web como Nginx para manejar las solicitudes:

```bash
sudo apt install nginx -y
```

Configura Nginx para redirigir las solicitudes a tu aplicación:

```nginx
server {
    listen 80;
    server_name tu_dominio.com;

    location / {
        proxy_pass http://localhost:5000; # Cambia según tu configuración
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Recarga Nginx:

```bash
sudo systemctl restart nginx
```

## 8. Guía de Troubleshooting

### 8.1. Problemas Comunes

- **Docker no inicia**: Verifica que el servicio de Docker esté activo.

  ```bash
  sudo systemctl status docker
  ```

- **Errores de permisos**: Asegúrate de que tu usuario esté en el grupo de Docker.

  ```bash
  sudo usermod -aG docker $USER
  ```

- **Problemas de red**: Verifica la configuración de tu firewall (ufw).

  ```bash
  sudo ufw allow 80
  sudo ufw allow 3000
  sudo ufw allow 5000
  ```

### 8.2. Logs de Docker

Para ver los logs de tus contenedores:

```bash
docker-compose logs
```

### 8.3. Acceso a la Consola de un Contenedor

Para acceder a la consola de un contenedor en ejecución:

```bash
docker exec -it <nombre_del_contenedor> /bin/sh
```

## Conclusión

Siguiendo esta guía, deberías poder configurar un VPS desde cero para tu proyecto financiero CFDI utilizando Docker, Bun y SvelteKit. Asegúrate de realizar pruebas exhaustivas y de mantener tu sistema actualizado para evitar problemas de seguridad. ¡Buena suerte con tu proyecto!
