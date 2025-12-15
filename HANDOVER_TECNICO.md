# 📋 Documento de Traspaso (Handover) - mibiyuyo V1

> **Para:** Desarrollador Backend/Fullstack
> **De:** Lead Developer
> **Fecha Límite:** Cierre de Mes
> **Estado:** 🟢 Estructura Base Lista (Fase de Conexión Lógica)

---

## 🧠 Contexto Rápido

Estamos construyendo **mibiyuyo**, una Super App Financiera para México.

* **Meta:** Responder "¿Cuánto puedo gastar hoy?".
* **Stack:** Svelte 5 (Runes), TailwindCSS v4, Bun, ElysiaJS, Drizzle ORM, PostgreSQL (Local/Dokploy).
* **Filosofía:** Cero ansiedad, privacidad de datos (Pilar #6).

---

## ✅ Lo que YA está hecho (No tocar, solo usar)

1. **Infraestructura:**
   - Repositorio limpio en `mibiyuyo`.
   - Entorno local configurado (`.env` con credenciales locales).
   - Base de datos Dockerizada corriendo (Postgres + Redis).
2. **Frontend Core:**
   - Landing Page migrada a Svelte 5.
   - Sistema `i18n` reactivo (`index.svelte.ts`) implementado.
   - Traducciones base: Español (`es`), Inglés (`en`), Portugués (`pt`).
3. **Backend Base:**
   - **Schema Definido:** `src/lib/server/schema.ts` ya contiene las tablas base.
   - **Migraciones:** Carpeta `drizzle/migrations` ya tiene el SQL inicial (`0000_...`).
   - **API Routes:** Estructura de endpoints creada en `src/routes/api/`.

---

## 📝 TUS MISIONES (Prioridad Alta)

### 1. Finalizar y Auditar Traducciones (i18n)

*Estado:* El core funciona, falta contenido.

- [ ] **Validar Idiomas Extra:** Verificar si `fr`, `de`, `it`, `ru` están correctamente implementados en `translations.ts` o si quedaron a medias. Si faltan, complétalos.
- [ ] **LanguageSelector:** Confirmar que al cambiar de bandera, la UI se actualice instantáneamente (sin recargar).

### 2. Conectar Autenticación (El "Cableado")

*Estado:* Archivos creados (`routes/auth/login`, `api/auth/login`), falta la lógica interna.

- [ ] **Frontend → Backend:** Asegurar que el formulario de Login en Svelte envíe los datos al endpoint de Elysia/API correctamente.
- [ ] **Sesión:** Implementar la creación de cookie de sesión segura tras validar usuario/password (usando `src/lib/server/auth.ts`).

### 3. Lógica "Tu Biyuyo Hoy" (El Cerebro)

*Estado:* Endpoint `api/dashboard/summary` existe.

- [ ] **Implementar Cálculo:** Escribir la lógica matemática dentro del endpoint:
    ```typescript
    const disponible = (ingresos - gastos_fijos_mensuales) / dias_restantes_mes;
    ```
- [ ] **Conectar UI:** Hacer que el Dashboard (`routes/dashboard/+page.svelte`) consuma este dato y lo muestre en el número grande central.

---

## 🛠️ Comandos para trabajar

- `bun run dev`: Inicia Frontend y Backend.
- `bun run db:migrate`: Si necesitas aplicar cambios al esquema.
- `bun run db:studio`: Para ver la base de datos visualmente y verificar datos.

¡Tienes los cimientos sólidos! Ahora te toca levantar las paredes. 🚀
