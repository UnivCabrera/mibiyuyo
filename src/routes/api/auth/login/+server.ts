// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 LOGIN API — Inicio de sesión
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { lucia } from '$lib/server/auth';
import { verifyPassword } from '$lib/server/password';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password } = body;
	
	// Validaciones
	if (!email || !password) {
		throw error(400, { message: 'Email y contraseña son requeridos' });
	}
	
	// Buscar usuario
	const user = await db.query.users.findFirst({
		where: eq(users.email, email.toLowerCase())
	});
	
	if (!user || !user.passwordHash) {
		// Mensaje genérico por seguridad
		throw error(401, { message: 'Credenciales inválidas' });
	}
	
	// Verificar contraseña
	const isValidPassword = await verifyPassword(password, user.passwordHash);
	
	if (!isValidPassword) {
		throw error(401, { message: 'Credenciales inválidas' });
	}
	
	// Actualizar último login
	await db.update(users)
		.set({ lastLoginAt: new Date() })
		.where(eq(users.id, user.id));
	
	// Crear sesión
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	
	return json({
		success: true,
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			plan: user.plan
		}
	});
};
