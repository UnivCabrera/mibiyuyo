// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 LOGOUT API — Cerrar sesión
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.session) {
		throw error(401, { message: 'No hay sesión activa' });
	}
	
	// Invalidar sesión
	await lucia.invalidateSession(locals.session.id);
	
	// Eliminar cookie
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	
	return json({ success: true });
};

// También soportar GET para redirección
export const GET: RequestHandler = async ({ locals, cookies }) => {
	if (locals.session) {
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	
	throw redirect(302, '/');
};
