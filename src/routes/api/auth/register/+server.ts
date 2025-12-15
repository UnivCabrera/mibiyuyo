// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 REGISTER API — Registro de usuarios
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { lucia } from '$lib/server/auth';
import { hashPassword, validatePasswordStrength } from '$lib/server/password';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();
	const { email, password, name } = body;
	
	// Validaciones
	if (!email || !password) {
		throw error(400, { message: 'Email y contraseña son requeridos' });
	}
	
	// Validar email
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		throw error(400, { message: 'Email inválido' });
	}
	
	// Validar contraseña
	const passwordValidation = validatePasswordStrength(password);
	if (!passwordValidation.isValid) {
		throw error(400, { message: passwordValidation.errors.join('. ') });
	}
	
	// Verificar si el usuario ya existe
	const existingUser = await db.query.users.findFirst({
		where: eq(users.email, email.toLowerCase())
	});
	
	if (existingUser) {
		throw error(409, { message: 'Ya existe una cuenta con este email' });
	}
	
	// Crear hash de contraseña
	const passwordHash = await hashPassword(password);
	
	// Crear usuario
	const [newUser] = await db.insert(users).values({
		email: email.toLowerCase(),
		passwordHash,
		name: name || null
	}).returning();
	
	// Crear sesión
	const session = await lucia.createSession(newUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	
	return json({
		success: true,
		user: {
			id: newUser.id,
			email: newUser.email,
			name: newUser.name
		}
	}, { status: 201 });
};
