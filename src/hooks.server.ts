// ═══════════════════════════════════════════════════════════════════════════════
// 🪝 SERVER HOOKS — Middleware de SvelteKit
// ═══════════════════════════════════════════════════════════════════════════════
// Manejo de sesiones y autenticación en cada request
// ═══════════════════════════════════════════════════════════════════════════════

import type { Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// Obtener session cookie
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}
	
	// Validar sesión
	const { session, user } = await lucia.validateSession(sessionId);
	
	if (session?.fresh) {
		// Refrescar cookie si la sesión está próxima a expirar
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	
	if (!session) {
		// Eliminar cookie inválida
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	
	event.locals.user = user;
	event.locals.session = session;
	
	return resolve(event);
};
