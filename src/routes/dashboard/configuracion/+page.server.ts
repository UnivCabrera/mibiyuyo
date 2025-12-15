import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { incomeSources, apartados, savingsGoals, transactions } from '$lib/server/schema';
import { eq, count } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;

	if (!session || !user) {
		throw redirect(302, '/login');
	}

	// Obtener estadísticas del usuario
	const [ingresosCount] = await db
		.select({ count: count() })
		.from(incomeSources)
		.where(eq(incomeSources.userId, user.id));

	const [apartadosCount] = await db
		.select({ count: count() })
		.from(apartados)
		.where(eq(apartados.userId, user.id));

	const [metasCount] = await db
		.select({ count: count() })
		.from(savingsGoals)
		.where(eq(savingsGoals.userId, user.id));

	const [transaccionesCount] = await db
		.select({ count: count() })
		.from(transactions)
		.where(eq(transactions.userId, user.id));

	return {
		user: {
			id: user.id,
			email: user.email,
			name: user.name,
			onboardingCompleted: user.onboardingCompleted
		},
		stats: {
			ingresos: ingresosCount?.count || 0,
			apartados: apartadosCount?.count || 0,
			metas: metasCount?.count || 0,
			transacciones: transaccionesCount?.count || 0
		}
	};
};
