import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;

	if (!session || !user) {
		throw redirect(302, '/auth/login');
	}

	// Si ya completó el onboarding, redirigir al dashboard
	if (user.onboardingCompleted) {
		throw redirect(302, '/dashboard');
	}

	return {
		user: {
			name: user.name,
			email: user.email
		}
	};
};
