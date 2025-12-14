# 🔑 Perfil 20: IAM Specialist (Identity & Access Management)

**Auditoría Estratégica - Bloque C: Seguridad y Riesgos**
**Proyecto:** PRO_FINAN_CONTA_PYM
**Fecha:** 9 Diciembre 2025

---

## 📋 Rol y Responsabilidad

El Especialista IAM gestiona las identidades digitales, la autenticación (AuthN) y la autorización (AuthZ). En una FinTech, esto es crítico: asegurar que quien entra es quien dice ser (MFA) y que solo accede a lo que debe (RBAC).

---

## ✅ LO QUE TENEMOS (Documentado)

| Área | Estado | Documento de Referencia |
|:-----|:-------|:------------------------|
| Auth Provider | ✅ Better Auth | `AGENTS.md` (llms.txt disponible) |
| Roles Básicos | ✅ Definidos | `03_MERCADO_COMPETENCIA/03_40_PERFILES_PROFESIONALES.md` |

---

## ❌ LO QUE FALTA (Gaps Identificados)

| Gap ID | Descripción | Prioridad | Archivo Destino | Timeline |
|:-------|:------------|:----------|:----------------|:---------|
| IAM-001 | **Implementación RBAC (Role-Based Access Control)** | 🔴 Bloqueante | `src/lib/server/auth/rbac.ts` | Sem 1 |
| IAM-002 | **Autenticación de Dos Factores (2FA/MFA)** | 🟠 Alto | Configuración Better Auth | Sem 2 |
| IAM-003 | Gestión de Sesiones (Revocación, Timeout) | 🟡 Medio | Configuración Redis | Sem 2 |
| IAM-004 | Auditoría de Accesos (Who did what) | 🟡 Medio | Vinculado a DPO-004 | Fase 2 |

---

## 📝 ACTION ITEMS: Implementación Técnica

### 1. Schema de Roles y Permisos

Estructura flexible para manejar permisos granulares.

```typescript
// src/lib/server/db/schema/auth.ts
import { pgTable, text, primaryKey } from 'drizzle-orm/pg-core';

export const roles = pgTable('auth_roles', {
  id: text('id').primaryKey(), // 'ADMIN', 'ACCOUNTANT', 'USER'
  description: text('description'),
});

export const permissions = pgTable('auth_permissions', {
  id: text('id').primaryKey(), // 'invoices:read', 'invoices:write'
  description: text('description'),
});

export const rolePermissions = pgTable('auth_role_permissions', {
  roleId: text('role_id').references(() => roles.id),
  permissionId: text('permission_id').references(() => permissions.id),
}, (t) => ({
  pk: primaryKey(t.roleId, t.permissionId),
}));

export const userRoles = pgTable('auth_user_roles', {
  userId: text('user_id').notNull(),
  roleId: text('role_id').references(() => roles.id),
}, (t) => ({
  pk: primaryKey(t.userId, t.roleId),
}));
```

### 2. Middleware de Autorización (Guard)

Función para proteger rutas basada en permisos, no solo en roles.

```typescript
// src/lib/server/middleware/guard.ts
import { error } from 'elysia';

export const requirePermission = (permission: string) => {
  return async (ctx: Context) => {
    const user = ctx.store.user;
    if (!user) throw error(401, 'Unauthorized');

    const hasPermission = await checkUserPermission(user.id, permission);
    if (!hasPermission) {
      throw error(403, 'Forbidden: Insufficient permissions');
    }
  };
};

// Uso en Elysia:
// app.get('/invoices', handler, { beforeHandle: requirePermission('invoices:read') })
```

---

## 🔗 Referencias

- **NIST SP 800-63:** Digital Identity Guidelines.
- **Better Auth Docs:** Implementación de Plugins (MFA, Organization).

---

*Última actualización: 9 Diciembre 2025*
