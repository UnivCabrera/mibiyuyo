import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { savingsGoals } from '$lib/server/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	const session = locals.session;
	const user = locals.user;

	if (!session || !user) {
		throw redirect(302, '/auth/login');
	}

	// Obtener metas de ahorro del usuario
	const userMetas = await db
		.select()
		.from(savingsGoals)
		.where(eq(savingsGoals.userId, user.id))
		.orderBy(desc(savingsGoals.createdAt));

	return {
		metas: userMetas.map(meta => ({
			id: meta.id,
			name: meta.name,
			emoji: meta.emoji,
			targetAmount: Number(meta.targetAmount),
			currentAmount: Number(meta.currentAmount),
			deadline: meta.deadline?.toISOString() || null,
			color: meta.color,
			isCompleted: meta.isCompleted,
			createdAt: meta.createdAt.toISOString()
		}))
	};
};
