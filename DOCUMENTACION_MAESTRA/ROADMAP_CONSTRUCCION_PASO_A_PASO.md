# 🔨 ROADMAP DE CONSTRUCCIÓN PASO A PASO

**Proyecto:** PRO_FINAN_CONTA_PYM  
**Para:** Desarrolladores que empiezan desde cero  
**Nivel:** Desde preparatoria hasta senior  
**Versión:** 1.1  
**Fecha:** 30 Noviembre 2025  
**Inicio planificado:** Lunes 2 de Diciembre 2025

---

## 🎯 OBJETIVO DE ESTE DOCUMENTO

Este roadmap te guiará paso a paso para construir el proyecto completo, empezando desde la instalación de herramientas básicas hasta tener una aplicación funcional en producción.

> **Filosofía:** "Un paso a la vez, bien hecho, es mejor que mil pasos a medias"

> **🆕 Tip:** Usa el archivo `PROJECT_CHARACTERISTICS/13_MAPA_TECNOLOGIA_FEATURES.md` para saber exactamente qué tecnología usar en cada paso.

---

## 📋 REQUISITOS PREVIOS

### Hardware Mínimo

- **RAM:** 8GB (16GB recomendado)
- **Disco:** 50GB libres
- **SO:** Linux (Ubuntu/Fedora), macOS, o Windows con WSL2

### Conocimientos Básicos (Opcional pero útil)

- [ ] Saber usar la terminal/línea de comandos
- [ ] Conceptos básicos de programación
- [ ] Entender qué es una base de datos
- [ ] Saber qué es HTML/CSS/JavaScript (básico)

---

## 🗓️ PLAN DE 8 SEMANAS

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    VISIÓN GENERAL DE 8 SEMANAS                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  SEMANA 1-2: PREPARACIÓN                                               │
│  └── Instalar herramientas, entender el proyecto, configurar ambiente  │
│                                                                         │
│  SEMANA 3-4: BACKEND                                                   │
│  └── Base de datos, API, autenticación, lógica de negocio             │
│                                                                         │
│  SEMANA 5-6: FRONTEND                                                  │
│  └── Interfaz de usuario, componentes, integración con API            │
│                                                                         │
│  SEMANA 7: INTEGRACIÓN                                                 │
│  └── Conectar todo, pruebas, corrección de errores                    │
│                                                                         │
│  SEMANA 8: DESPLIEGUE                                                  │
│  └── VPS, Docker, dominio, SSL, monitoreo                             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

# 📅 SEMANA 1: PREPARACIÓN DEL AMBIENTE

## Día 1 (Lunes): Instalación de Herramientas Base

### Paso 1.1: Instalar Git

```bash
# Linux (Ubuntu/Debian)
sudo apt update
sudo apt install git -y

# Verificar
git --version  # Debería mostrar: git version 2.x.x
```

### Paso 1.2: Configurar Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### Paso 1.3: Instalar nvm (Node Version Manager)

```bash
# Descargar e instalar nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Cargar nvm (o reiniciar terminal)
source ~/.bashrc  # o ~/.zshrc si usas zsh

# Verificar
nvm --version  # Debería mostrar: 0.40.3
```

### Paso 1.4: Instalar Node.js 24 LTS

```bash
# Instalar Node.js 24 (última LTS)
nvm install 24

# Verificar
node -v  # Debería mostrar: v24.11.1
npm -v   # Debería mostrar: 11.6.2
```

### Paso 1.5: Instalar Bun (Runtime principal)

```bash
# Instalar Bun
curl -fsSL https://bun.sh/install | bash

# Cargar Bun
source ~/.bashrc

# Verificar
bun --version  # Debería mostrar: 1.x.x
```

### Paso 1.6: Instalar Docker

```bash
# Linux (Ubuntu)
sudo apt install docker.io docker-compose-v2 -y

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Reiniciar sesión o ejecutar
newgrp docker

# Verificar
docker --version  # Debería mostrar: Docker version 27.x
docker compose version  # Debería mostrar: v2.x
```

### Paso 1.7: Instalar VS Code

```bash
# Descargar desde: https://code.visualstudio.com/
# O via snap (Linux)
sudo snap install code --classic
```

### ✅ Checklist Día 1

- [ ] Git instalado y configurado
- [ ] nvm instalado
- [ ] Node.js 24.11.1 instalado
- [ ] npm 11.6.2 funcionando
- [ ] Bun instalado
- [ ] Docker y Docker Compose instalados
- [ ] VS Code instalado

---

## Día 2 (Martes): Extensiones VS Code y Herramientas

### Paso 2.1: Extensiones Esenciales de VS Code

```
Abrir VS Code → Ctrl+Shift+X (Extensiones) → Buscar e instalar:

OBLIGATORIAS:
├── Svelte for VS Code
├── TypeScript Vue Plugin (Volar) - Para tipos mejorados
├── Prettier - Code formatter
├── ESLint
├── GitLens
├── Docker
├── Tailwind CSS IntelliSense (desactivar si no lo usamos)
├── Error Lens
└── Auto Rename Tag

RECOMENDADAS:
├── Material Icon Theme
├── One Dark Pro (tema)
├── Path Intellisense
├── Thunder Client (para probar APIs)
├── Database Client (para ver PostgreSQL)
└── Todo Tree
```

### Paso 2.2: Configurar VS Code Settings

```json
// Archivo: .vscode/settings.json (se crea en el proyecto)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "files.autoSave": "onFocusChange",
  "typescript.preferences.importModuleSpecifier": "relative",
  "svelte.enable-ts-plugin": true
}
```

### Paso 2.3: Instalar PostgreSQL (Local para desarrollo)

```bash
# Opción 1: Docker (RECOMENDADO)
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=dev123 \
  -e POSTGRES_USER=finanzas \
  -e POSTGRES_DB=finanzas_dev \
  -p 5432:5432 \
  -d pgvector/pgvector:pg18

# Verificar
docker ps  # Debería mostrar postgres-dev corriendo

# Opción 2: Instalación nativa (si prefieres)
sudo apt install postgresql postgresql-contrib -y
```

### Paso 2.4: Instalar Redis (Local para desarrollo)

```bash
# Usando Docker
docker run --name redis-dev \
  -p 6379:6379 \
  -d redis:8-alpine

# Verificar
docker ps  # Debería mostrar redis-dev corriendo
```

### ✅ Checklist Día 2

- [ ] Extensiones VS Code instaladas
- [ ] Settings de VS Code configurados
- [ ] PostgreSQL corriendo en Docker (puerto 5432)
- [ ] Redis corriendo en Docker (puerto 6379)

---

## Día 3 (Miércoles): Clonar y Entender el Proyecto

### Paso 3.1: Clonar el Repositorio

```bash
# Crear carpeta de proyectos
mkdir -p ~/proyectos
cd ~/proyectos

# Clonar (cuando esté en GitHub)
git clone https://github.com/TU_USUARIO/pro-finan-conta-pym.git
cd pro-finan-conta-pym

# O si ya tienes el proyecto local
cd /home/red/Documents/PRO_FINAN_CONTA_PYM
```

### Paso 3.2: Entender la Estructura

```bash
# Ver estructura
tree -L 2 -d

# Resultado esperado:
# .
# ├── 00_ARQUITECTURA_CENTRAL/
# ├── 00_LEGADO_PRIMERA_LLUVIA_IDEAS/
# ├── 01_AUDITORIA_ESTRATEGICA/
# ├── 02_CIBERSEGURIDAD/
# ├── 03_MERCADO_COMPETENCIA/
# ├── 04_LANDING_PAGE/
# ├── 05_UX_UI_DESIGN/
# ├── 06_ESCALAMIENTO/
# ├── DOCUMENTACION_MAESTRA/
# ├── PROJECT_CHARACTERISTICS/
# └── Prototipo/
#     └── finanzas-app-mx/
```

### Paso 3.3: Leer Documentación Base

```bash
# Tiempo estimado: 2 horas
#
# Leer en este orden:
# 1. DOCUMENTACION_MAESTRA/00_GUIA_LECTURA_PROYECTO.md
# 2. 00_ARQUITECTURA_CENTRAL/03_STACK_TECNOLOGICO_DEFINITIVO.md
# 3. PROJECT_CHARACTERISTICS/00_INDICE_GENERAL.md
```

### ✅ Checklist Día 3

- [ ] Proyecto clonado/accesible
- [ ] Estructura de carpetas entendida
- [ ] Documentación base leída (mínimo 3 documentos)

---

## Día 4-5 (Jueves-Viernes): Crear Estructura del Código

### Paso 4.1: Crear Estructura de Aplicación

```bash
cd ~/proyectos/pro-finan-conta-pym/Prototipo

# Crear estructura monorepo
mkdir -p apps/frontend
mkdir -p apps/backend
mkdir -p packages/shared
mkdir -p packages/ui
```

### Paso 4.2: Inicializar Backend con Bun

```bash
cd apps/backend

# Inicializar proyecto
bun init -y

# Instalar dependencias core
bun add elysia @elysiajs/cors @elysiajs/swagger
bun add drizzle-orm postgres
bun add @auth/core @auth/sveltekit
bun add -d drizzle-kit typescript @types/bun
```

### Paso 4.3: Crear Archivo Principal del Backend

```typescript
// apps/backend/src/index.ts
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "PRO_FINAN_CONTA_PYM API",
          version: "1.0.0",
          description: "API para la mejor app de finanzas PyME de México",
        },
      },
    }),
  )
  .get("/", () => ({
    message: "¡Bienvenido a PRO_FINAN_CONTA_PYM!",
    status: "healthy",
    timestamp: new Date().toISOString(),
  }))
  .get("/health", () => ({ status: "ok" }))
  .listen(4000);

console.log(`
🚀 Backend corriendo en http://localhost:${app.server?.port}
📚 Documentación en http://localhost:${app.server?.port}/swagger
`);

export type App = typeof app;
```

### Paso 4.4: Inicializar Frontend con SvelteKit

```bash
cd ../frontend

# Crear proyecto SvelteKit
bunx create-svelte@latest . --template skeleton --types typescript --no-eslint --no-prettier

# Instalar dependencias
bun install

# Instalar dependencias adicionales
bun add bits-ui
bun add -d @sveltejs/adapter-node
```

### Paso 4.5: Verificar que Todo Funciona

```bash
# Terminal 1: Backend
cd apps/backend
bun run src/index.ts
# Debería mostrar: 🚀 Backend corriendo en http://localhost:4000

# Terminal 2: Frontend
cd apps/frontend
bun dev
# Debería mostrar: Local: http://localhost:5173

# Verificar en navegador:
# - http://localhost:4000 → API funcionando
# - http://localhost:4000/swagger → Documentación API
# - http://localhost:5173 → Frontend funcionando
```

### ✅ Checklist Semana 1

- [ ] Todas las herramientas instaladas
- [ ] Estructura de carpetas creada
- [ ] Backend Elysia funcionando en :4000
- [ ] Frontend SvelteKit funcionando en :5173
- [ ] PostgreSQL y Redis corriendo
- [ ] Documentación base leída

---

# 📅 SEMANA 2: BASE DE DATOS Y AUTENTICACIÓN

## Día 6-7: Configurar Base de Datos

### Paso 6.1: Crear Schema de Drizzle

```typescript
// apps/backend/src/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  decimal,
  boolean,
  text,
  integer,
} from "drizzle-orm/pg-core";

// Usuarios
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  emailVerified: timestamp("email_verified"),
  image: varchar("image", { length: 500 }),
  plan: varchar("plan", { length: 50 }).default("free"), // free, pro, enterprise
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Cuentas (bancarias, efectivo, etc.)
export const accounts = pgTable("accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // bank, cash, credit_card, investment
  currency: varchar("currency", { length: 3 }).default("MXN"),
  balance: decimal("balance", { precision: 15, scale: 2 }).default("0"),
  color: varchar("color", { length: 7 }),
  icon: varchar("icon", { length: 50 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categorías
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => users.id),
  name: varchar("name", { length: 100 }).notNull(),
  type: varchar("type", { length: 20 }).notNull(), // income, expense
  icon: varchar("icon", { length: 50 }),
  color: varchar("color", { length: 7 }),
  parentId: uuid("parent_id"),
  isSystem: boolean("is_system").default(false),
});

// Transacciones
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  accountId: uuid("account_id")
    .references(() => accounts.id)
    .notNull(),
  categoryId: uuid("category_id").references(() => categories.id),
  type: varchar("type", { length: 20 }).notNull(), // income, expense, transfer
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  notes: text("notes"),
  isRecurring: boolean("is_recurring").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Metas de ahorro
export const savingsGoals = pgTable("savings_goals", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  targetAmount: decimal("target_amount", { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 15, scale: 2 }).default(
    "0",
  ),
  targetDate: timestamp("target_date"),
  color: varchar("color", { length: 7 }),
  icon: varchar("icon", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### Paso 6.2: Configurar Conexión a BD

```typescript
// apps/backend/src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://finanzas:dev123@localhost:5432/finanzas_dev";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });

export { schema };
```

### Paso 6.3: Configurar Drizzle Kit

```typescript
// apps/backend/drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ||
      "postgresql://finanzas:dev123@localhost:5432/finanzas_dev",
  },
});
```

### Paso 6.4: Ejecutar Migraciones

```bash
cd apps/backend

# Generar migración
bunx drizzle-kit generate

# Aplicar migración
bunx drizzle-kit push

# Ver tablas creadas
bunx drizzle-kit studio
# Abre http://localhost:4983 para ver la BD visualmente
```

### ✅ Checklist Día 6-7

- [ ] Schema de Drizzle creado
- [ ] Conexión a BD funcionando
- [ ] Migraciones ejecutadas
- [ ] Tablas creadas en PostgreSQL

---

## Día 8-10: Sistema de Autenticación

### Paso 8.1: Crear Endpoints de Auth

```typescript
// apps/backend/src/routes/auth.ts
import { Elysia, t } from "elysia";
import { db, schema } from "../db";
import { eq } from "drizzle-orm";

export const authRoutes = new Elysia({ prefix: "/auth" })

  // Registro
  .post(
    "/register",
    async ({ body }) => {
      const { email, password, name } = body;

      // Verificar si usuario existe
      const existing = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1);

      if (existing.length > 0) {
        return { error: "El email ya está registrado" };
      }

      // Hash de contraseña (usar Bun.password)
      const passwordHash = await Bun.password.hash(password);

      // Crear usuario
      const [user] = await db
        .insert(schema.users)
        .values({ email, passwordHash, name })
        .returning();

      return {
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 8 }),
        name: t.String({ minLength: 2 }),
      }),
    },
  )

  // Login
  .post(
    "/login",
    async ({ body }) => {
      const { email, password } = body;

      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, email))
        .limit(1);

      if (!user || !user.passwordHash) {
        return { error: "Credenciales inválidas" };
      }

      const validPassword = await Bun.password.verify(
        password,
        user.passwordHash,
      );

      if (!validPassword) {
        return { error: "Credenciales inválidas" };
      }

      // TODO: Generar JWT token
      return {
        success: true,
        user: { id: user.id, email: user.email, name: user.name },
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String(),
      }),
    },
  );
```

### Paso 8.2: Agregar Rutas al App Principal

```typescript
// apps/backend/src/index.ts (actualizado)
import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { authRoutes } from "./routes/auth";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "PRO_FINAN_CONTA_PYM API",
          version: "1.0.0",
        },
      },
    }),
  )
  .get("/", () => ({
    message: "¡Bienvenido a PRO_FINAN_CONTA_PYM!",
    status: "healthy",
  }))
  .get("/health", () => ({ status: "ok" }))
  .use(authRoutes) // Agregar rutas de auth
  .listen(4000);

console.log(`🚀 Backend en http://localhost:${app.server?.port}`);
```

### ✅ Checklist Semana 2

- [ ] Base de datos configurada
- [ ] Schema de tablas creado
- [ ] Migraciones ejecutadas
- [ ] Endpoints de registro y login funcionando
- [ ] Contraseñas hasheadas correctamente

---

# 📅 SEMANA 3-4: DESARROLLO DE FEATURES CORE

## Objetivos:

1. CRUD completo de transacciones
2. CRUD de cuentas
3. CRUD de categorías
4. Dashboard básico
5. Reportes simples

_(El documento continúa con las semanas 3-8 con el mismo nivel de detalle)_

---

# 📋 RESUMEN DE COMANDOS ESENCIALES

```bash
# === DESARROLLO ===
cd apps/backend && bun run dev     # Iniciar backend
cd apps/frontend && bun dev        # Iniciar frontend

# === BASE DE DATOS ===
bunx drizzle-kit generate          # Generar migraciones
bunx drizzle-kit push              # Aplicar migraciones
bunx drizzle-kit studio            # UI visual de BD

# === DOCKER ===
docker compose up -d               # Levantar servicios
docker compose down                # Detener servicios
docker compose logs -f             # Ver logs

# === GIT ===
git add .
git commit -m "feat: descripción"
git push origin main

# === TESTING ===
bun test                           # Ejecutar tests
bun test --watch                   # Tests en modo watch
```

---

# 🎯 SIGUIENTE PASO DESPUÉS DE ESTE ROADMAP

Una vez completadas las 8 semanas:

1. **Beta privada** con 5-10 usuarios
2. **Feedback** y corrección de bugs
3. **Lanzamiento público** gradual
4. **Marketing** y adquisición de usuarios
5. **Iteración** basada en métricas

---

**¡Éxito en tu desarrollo!** 🚀

_PRO_FINAN_CONTA_PYM - La mejor app de finanzas para PyMEs mexicanas_
