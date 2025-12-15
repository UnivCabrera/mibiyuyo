// ═══════════════════════════════════════════════════════════════════════════════
// 💳 GASTOS PAGE — Carga de datos de gastos
// ═══════════════════════════════════════════════════════════════════════════════

import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { transactions } from '$lib/server/schema';
import { eq, desc, and } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { gastos: [] };
	}

	const userId = locals.user.id;

	try {
		const userGastos = await db
			.select()
			.from(transactions)
			.where(and(eq(transactions.userId, userId), eq(transactions.type, 'expense')))
			.orderBy(desc(transactions.date))
			.limit(50);

		// Formatear fecha relativa
		function formatRelativeDate(date: Date): string {
			const now = new Date();
			const diff = now.getTime() - date.getTime();
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			if (days === 0) return 'Hoy';
			if (days === 1) return 'Ayer';
			if (days < 7) return `Hace ${days} días`;
			return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short' });
		}

		return {
			gastos: userGastos.map((t) => ({
				id: t.id,
				descripcion: t.description || 'Gasto',
				monto: -Number(t.amount),
				categoria: t.category || 'otros',
				emoji: t.emoji || '💸',
				fecha: formatRelativeDate(t.date)
			}))
		};
	} catch (err) {
		console.error('Error cargando gastos:', err);
		return { gastos: [] };
	}
};
