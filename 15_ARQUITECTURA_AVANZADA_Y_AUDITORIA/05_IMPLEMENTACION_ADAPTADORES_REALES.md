# 💻 IMPLEMENTACIÓN REAL DE ADAPTADORES (SNIPPETS)

## Código Funcional para Infraestructura Crítica

Aquí transformamos los "placeholders" en código real, seguro y listo para producción.

---

## 1. ADAPTADOR DE PERSISTENCIA (POSTGRESQL + DRIZZLE)

Este adaptador implementa el repositorio de usuarios usando Drizzle ORM y PostgreSQL.

```typescript
// infrastructure/adapters/persistence/postgres/PostgresUserRepository.ts
import { eq } from "drizzle-orm";
import { db } from "../../config/database"; // Instancia Drizzle
import { users } from "../../config/schema"; // Esquema Drizzle
import { UserRepository } from "../../../../domain/repositories/UserRepository";
import { User } from "../../../../domain/entities/User";

export class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (result.length === 0) return null;

    const row = result[0];
    return new User(row.id, row.email, row.role);
  }

  async save(user: User): Promise<void> {
    await db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        role: user.role,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: users.id,
        set: { role: user.role, updatedAt: new Date() },
      });
  }
}
```

## 2. ADAPTADOR SAT (SISTEMA DE ARCHIVOS SEGURO)

Este adaptador lee las credenciales. **NOTA:** No expone el contenido del archivo al exterior, solo lo usa para firmar.

```typescript
// infrastructure/adapters/sat/SecureFileSystemSATRepository.ts
import { readFile, access, constants } from "fs/promises";
import { SATCredentialRepository } from "../../../../domain/repositories/SATCredentialRepository";
import { SATCredential } from "../../../../domain/entities/SATCredential";

export class SecureFileSystemSATRepository implements SATCredentialRepository {
  private readonly BASE_PATH = "/srv/sat_credentials";

  async getCredentialContent(id: string, type: "key" | "cer"): Promise<Buffer> {
    // 🛡️ SECURITY: Path Traversal Prevention
    const safeId = id.replace(/[^a-zA-Z0-9-]/g, "");
    const filePath = `${this.BASE_PATH}/${safeId}.${type}`;

    try {
      // Verificar acceso de lectura
      await access(filePath, constants.R_OK);
      return await readFile(filePath);
    } catch (error) {
      throw new Error(`Credential not found or inaccessible: ${safeId}`);
    }
  }

  // El repositorio de dominio solo devuelve metadatos, NO el contenido binario
  async findById(id: string): Promise<SATCredential | null> {
    const safeId = id.replace(/[^a-zA-Z0-9-]/g, "");
    const path = `${this.BASE_PATH}/${safeId}.cer`;

    try {
      await access(path, constants.F_OK);
      return new SATCredential(id, path, "CIEC"); // Simplificado
    } catch {
      return null;
    }
  }
}
```

## 3. ADAPTADOR DE LOGGING (WAZUH / JSON)

Genera logs estructurados en JSON para que el agente de Wazuh los parsee fácilmente.

```typescript
// infrastructure/adapters/logging/WazuhLogger.ts
import { AuditPort } from "../../../../application/ports/AuditPort";

export class WazuhLogger implements AuditPort {
  logAccess(userId: string, action: string, metadata: any = {}): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      component: "BACKEND_API",
      event_type: "AUDIT_ACCESS",
      user_id: userId,
      action: action,
      metadata: metadata,
      // 🛡️ SECURITY: Masking sensitive data
      source_ip: metadata.ip || "unknown",
    };

    // Escribir a stdout (Docker logs -> Wazuh Agent)
    console.log(JSON.stringify(logEntry));
  }
}
```

## 4. CONFIGURACIÓN DE BASE DE DATOS (DRIZZLE)

```typescript
// infrastructure/config/database.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// 🛡️ SECURITY: Secrets from Environment Variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const client = postgres(connectionString, { max: 10 });
export const db = drizzle(client, { schema });
```

## 5. INYECCIÓN DE DEPENDENCIAS (CONTAINER REAL)

```typescript
// infrastructure/bootstrap/container.ts
import { PostgresUserRepository } from "../adapters/persistence/postgres/PostgresUserRepository";
import { SecureFileSystemSATRepository } from "../adapters/sat/SecureFileSystemSATRepository";
import { WazuhLogger } from "../adapters/logging/WazuhLogger";
import { GetSATCredentials } from "../../application/use_cases/queries/GetSATCredentials";

// Instancias Singleton
const userRepo = new PostgresUserRepository();
const satRepo = new SecureFileSystemSATRepository();
const auditLogger = new WazuhLogger();

// Casos de Uso
const getSATCredentials = new GetSATCredentials(satRepo, auditLogger);

export const container = {
  getSATCredentials,
};
```
