// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DASHBOARD LAYOUT — Layout del área privada
// ═══════════════════════════════════════════════════════════════════════════════

import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// Proteger rutas del dashboard
	if (!locals.user) {
		throw redirect(302, '/auth/login?redirect=/dashboard');
	}
	
	return {
		user: locals.user
	};
};
