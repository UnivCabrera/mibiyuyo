import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { incomeSources } from '$lib/server/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;

	if (!session || !user) {
		throw redirect(302, '/auth/login');
	}

	// Obtener fuentes de ingreso del usuario
	const userIngresos = await db
		.select()
		.from(incomeSources)
		.where(eq(incomeSources.userId, user.id))
		.orderBy(desc(incomeSources.createdAt));

	return {
		ingresos: userIngresos.map(source => ({
			...source,
			amount: Number(source.amount)
		}))
	};
};
