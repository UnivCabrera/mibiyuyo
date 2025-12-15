// ═══════════════════════════════════════════════════════════════════════════════
// 📁 APARTADOS PAGE — Carga de datos de apartados
// ═══════════════════════════════════════════════════════════════════════════════

import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { apartados } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { 
			apartados: [],
			totales: { apartado: 0, objetivo: 0, porcentaje: 0 }
		};
	}

	const userId = locals.user.id;

	try {
		const userApartados = await db
			.select()
			.from(apartados)
			.where(and(eq(apartados.userId, userId), eq(apartados.isActive, true)))
			.orderBy(apartados.dueDate);

		// Calcular totales
		const totales = userApartados.reduce(
			(acc, a) => ({
				apartado: acc.apartado + Number(a.currentAmount || 0),
				objetivo: acc.objetivo + Number(a.targetAmount || 0)
			}),
			{ apartado: 0, objetivo: 0 }
		);

		return {
			apartados: userApartados.map((a) => ({
				id: a.id,
				nombre: a.name,
				emoji: a.emoji || '📌',
				montoActual: Number(a.currentAmount),
				montoObjetivo: Number(a.targetAmount),
				porcentaje: Math.round(
					(Number(a.currentAmount) / Number(a.targetAmount)) * 100
				),
				diaVencimiento: a.dueDate,
				frecuencia: a.frequency || 'monthly',
				color: a.color || '#f97316'
			})),
			totales: {
				apartado: totales.apartado,
				objetivo: totales.objetivo,
				porcentaje: totales.objetivo > 0 
					? Math.round((totales.apartado / totales.objetivo) * 100) 
					: 0
			}
		};
	} catch (err) {
		console.error('Error cargando apartados:', err);
		return { 
			apartados: [],
			totales: { apartado: 0, objetivo: 0, porcentaje: 0 }
		};
	}
};
