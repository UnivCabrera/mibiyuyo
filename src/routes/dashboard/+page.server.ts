// ═══════════════════════════════════════════════════════════════════════════════
// 📊 DASHBOARD PAGE — Carga de datos del dashboard
// ═══════════════════════════════════════════════════════════════════════════════

import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { apartados, transactions } from '$lib/server/schema';
import { eq, desc, and, gte, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return { dashboardData: null };
	}

	const userId = locals.user.id;

	try {
		// ─────────────────────────────────────────────────────────────────────────
		// 1. Obtener apartados activos
		// ─────────────────────────────────────────────────────────────────────────
		const userApartados = await db
			.select()
			.from(apartados)
			.where(and(eq(apartados.userId, userId), eq(apartados.isActive, true)))
			.orderBy(apartados.dueDate);

		// ─────────────────────────────────────────────────────────────────────────
		// 2. Calcular totales de apartados
		// ─────────────────────────────────────────────────────────────────────────
		const totalApartado = userApartados.reduce(
			(sum, a) => sum + Number(a.currentAmount || 0),
			0
		);

		// ─────────────────────────────────────────────────────────────────────────
		// 3. Obtener últimas transacciones (gastos)
		// ─────────────────────────────────────────────────────────────────────────
		const recentTransactions = await db
			.select()
			.from(transactions)
			.where(and(eq(transactions.userId, userId), eq(transactions.type, 'expense')))
			.orderBy(desc(transactions.date))
			.limit(5);

		// ─────────────────────────────────────────────────────────────────────────
		// 4. Calcular gastos e ingresos del mes actual
		// ─────────────────────────────────────────────────────────────────────────
		const startOfMonth = new Date();
		startOfMonth.setDate(1);
		startOfMonth.setHours(0, 0, 0, 0);

		const [monthlyExpenses] = await db
			.select({
				total: sql<string>`COALESCE(SUM(${transactions.amount}), 0)`
			})
			.from(transactions)
			.where(
				and(
					eq(transactions.userId, userId),
					eq(transactions.type, 'expense'),
					gte(transactions.date, startOfMonth)
				)
			);

		const [monthlyIncome] = await db
			.select({
				total: sql<string>`COALESCE(SUM(${transactions.amount}), 0)`
			})
			.from(transactions)
			.where(
				and(
					eq(transactions.userId, userId),
					eq(transactions.type, 'income'),
					gte(transactions.date, startOfMonth)
				)
			);

		// ─────────────────────────────────────────────────────────────────────────
		// 5. Calcular "Biyuyo Hoy" (dinero disponible)
		// ─────────────────────────────────────────────────────────────────────────
		const totalIngreso = Number(monthlyIncome?.total || 0);
		const totalGastado = Number(monthlyExpenses?.total || 0);
		const biyuyoHoy = totalIngreso - totalApartado - totalGastado;

		// ─────────────────────────────────────────────────────────────────────────
		// 6. Formatear fecha relativa
		// ─────────────────────────────────────────────────────────────────────────
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
			dashboardData: {
				biyuyoHoy: Math.max(0, biyuyoHoy),
				totalIngresos: totalIngreso,
				totalGastos: totalGastado,
				totalApartados: totalApartado,
				apartados: userApartados.map((a) => ({
					id: a.id,
					name: a.name,
					emoji: a.emoji || '📌',
					current: Number(a.currentAmount),
					target: Number(a.targetAmount),
					color: a.color || '#f97316',
					dueDate: a.dueDate
				})),
				gastosRecientes: recentTransactions.map((t) => ({
					id: t.id,
					description: t.description || 'Gasto',
					amount: -Number(t.amount),
					emoji: t.emoji || '💸',
					date: formatRelativeDate(t.date)
				}))
			}
		};
	} catch (err) {
		console.error('Error cargando dashboard:', err);
		return {
			dashboardData: null
		};
	}
};
