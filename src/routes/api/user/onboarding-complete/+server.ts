// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 API: POST /api/user/onboarding-complete
// Marca el onboarding del usuario como completado
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	try {
		// Actualizar el flag de onboarding completado
		await db
			.update(users)
			.set({ 
				onboardingCompleted: true,
				updatedAt: new Date()
			})
			.where(eq(users.id, user.id));

		return json({ 
			success: true, 
			message: 'Onboarding completado exitosamente' 
		});
	} catch (err) {
		console.error('Error al completar onboarding:', err);
		throw error(500, 'Error al completar el onboarding');
	}
};
