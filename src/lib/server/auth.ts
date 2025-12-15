// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 LUCIA AUTH — Configuración de Autenticación
// ═══════════════════════════════════════════════════════════════════════════════
// Lucia v3 con adaptador Drizzle para PostgreSQL
// ═══════════════════════════════════════════════════════════════════════════════

import { Lucia, TimeSpan } from 'lucia';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { users, sessions } from './schema';
import { isDev } from './config';

// Adaptador Drizzle para Lucia
const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

// Instancia de Lucia
export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, 'd'), // 30 días
	sessionCookie: {
		name: 'mibiyuyo_session',
		attributes: {
			secure: !isDev,
			sameSite: 'lax'
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			name: attributes.name,
			avatarUrl: attributes.avatarUrl,
			plan: attributes.plan,
			locale: attributes.locale,
			emailVerified: attributes.emailVerified,
			onboardingCompleted: attributes.onboardingCompleted
		};
	}
});

// Types para Lucia
declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	name: string | null;
	avatarUrl: string | null;
	plan: string;
	locale: string;
	emailVerified: boolean;
	onboardingCompleted: boolean;
}
