// ═══════════════════════════════════════════════════════════════════════════════
// 🗄️ DATABASE CLIENT — Conexión PostgreSQL con Drizzle
// ═══════════════════════════════════════════════════════════════════════════════
// Usando postgres.js como driver (más rápido que pg)
// ═══════════════════════════════════════════════════════════════════════════════

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from './config';
import * as schema from './schema';

// Singleton para conexión
let connection: ReturnType<typeof postgres> | null = null;

function getConnection() {
	connection ??= postgres(config.database.url, {
		max: 10, // Pool de conexiones
		idle_timeout: 20,
		connect_timeout: 10
	});
	return connection;
}

// Exportar instancia de Drizzle
export const db = drizzle(getConnection(), { schema });

// Cerrar conexión (útil para tests)
export async function closeConnection() {
	if (connection) {
		await connection.end();
		connection = null;
	}
}

// Health check
export async function checkDatabaseHealth(): Promise<boolean> {
	try {
		await getConnection()`SELECT 1`;
		return true;
	} catch (error) {
		console.error('❌ Database health check failed:', error);
		return false;
	}
}
