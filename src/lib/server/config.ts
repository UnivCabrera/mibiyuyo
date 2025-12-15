// ═══════════════════════════════════════════════════════════════════════════════
// 🔑 ENVIRONMENT CONFIG — Variables de Entorno
// ═══════════════════════════════════════════════════════════════════════════════
// Configuración centralizada de variables de entorno
// ═══════════════════════════════════════════════════════════════════════════════

import { env } from '$env/dynamic/private';
import { building } from '$app/environment';

// Validar variables requeridas solo en runtime (no durante build)
function getEnvVar(key: string, fallback?: string): string {
	const value = env[key] ?? fallback;
	if (!value && !building) {
		console.warn(`⚠️ Missing environment variable: ${key}`);
	}
	return value ?? '';
}

export const config = {
	// Database
	database: {
		url: getEnvVar('DATABASE_URL', 'postgresql://localhost:5432/mibiyuyo'),
		host: getEnvVar('DB_HOST', 'localhost'),
		port: Number.parseInt(getEnvVar('DB_PORT', '5432')),
		name: getEnvVar('DB_NAME', 'mibiyuyo'),
		user: getEnvVar('DB_USER', 'postgres'),
		password: getEnvVar('DB_PASSWORD', '')
	},
	
	// Auth
	auth: {
		secret: getEnvVar('AUTH_SECRET', 'development-secret-change-in-production'),
		google: {
			clientId: getEnvVar('GOOGLE_CLIENT_ID', ''),
			clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET', '')
		}
	},
	
	// App
	app: {
		url: getEnvVar('PUBLIC_APP_URL', 'http://localhost:5173'),
		env: getEnvVar('NODE_ENV', 'development') as 'development' | 'production' | 'test'
	}
} as const;

export const isDev = config.app.env === 'development';
export const isProd = config.app.env === 'production';
