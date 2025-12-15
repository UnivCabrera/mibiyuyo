// ═══════════════════════════════════════════════════════════════════════════════
// 📊 API — Dashboard Summary
// ═══════════════════════════════════════════════════════════════════════════════
// GET /api/dashboard/summary - Obtener resumen del dashboard
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { apartados, transactions, savingsGoals, incomeSources } from '$lib/server/schema';
import { eq, desc, sql, and, gte } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
	// Verificar autenticación
	if (!locals.user) {
		throw error(401, 'No autorizado');
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
		const totalObjetivo = userApartados.reduce(
			(sum, a) => sum + Number(a.targetAmount || 0),
			0
		);

		// ─────────────────────────────────────────────────────────────────────────
		// 3. Obtener últimas transacciones
		// ─────────────────────────────────────────────────────────────────────────
		const recentTransactions = await db
			.select()
			.from(transactions)
			.where(eq(transactions.userId, userId))
			.orderBy(desc(transactions.date))
			.limit(10);

		// ─────────────────────────────────────────────────────────────────────────
		// 4. Calcular gastos del mes actual
		// ─────────────────────────────────────────────────────────────────────────
		const startOfMonth = new Date();
		startOfMonth.setDate(1);
		startOfMonth.setHours(0, 0, 0, 0);

		const monthlyExpenses = await db
			.select({
				total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`
			})
			.from(transactions)
			.where(
				and(
					eq(transactions.userId, userId),
					eq(transactions.type, 'expense'),
					gte(transactions.date, startOfMonth)
				)
			);

		const monthlyIncome = await db
			.select({
				total: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`
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
		// 5. Obtener fuentes de ingreso
		// ─────────────────────────────────────────────────────────────────────────
		const userIncomeSources = await db
			.select()
			.from(incomeSources)
			.where(and(eq(incomeSources.userId, userId), eq(incomeSources.isActive, true)));

		// ─────────────────────────────────────────────────────────────────────────
		// 6. Calcular "Biyuyo Hoy" (dinero disponible)
		// ─────────────────────────────────────────────────────────────────────────
		// Total ingresos - Total apartado - Gastos no asignados a apartados
		const totalIngreso = Number(monthlyIncome[0]?.total || 0);
		const totalGastado = Number(monthlyExpenses[0]?.total || 0);
		const biyuyoHoy = totalIngreso - totalApartado - totalGastado;

		// ─────────────────────────────────────────────────────────────────────────
		// 7. Metas de ahorro
		// ─────────────────────────────────────────────────────────────────────────
		const userSavingsGoals = await db
			.select()
			.from(savingsGoals)
			.where(and(eq(savingsGoals.userId, userId), eq(savingsGoals.isCompleted, false)));

		return json({
			biyuyoHoy: Math.max(0, biyuyoHoy),
			apartados: userApartados.map((a) => ({
				id: a.id,
				nombre: a.name,
				emoji: a.emoji,
				monto: Number(a.currentAmount),
				objetivo: Number(a.targetAmount),
				porcentaje: Math.round(
					(Number(a.currentAmount) / Number(a.targetAmount)) * 100
				),
				color: a.color,
				dueDate: a.dueDate
			})),
			totalApartado,
			totalObjetivo,
			gastosRecientes: recentTransactions.map((t) => ({
				id: t.id,
				descripcion: t.description,
				monto: Number(t.amount),
				tipo: t.type,
				categoria: t.category,
				emoji: t.emoji,
				fecha: t.date
			})),
			resumenMensual: {
				ingresos: totalIngreso,
				gastos: totalGastado,
				balance: totalIngreso - totalGastado
			},
			metasAhorro: userSavingsGoals.map((g) => ({
				id: g.id,
				nombre: g.name,
				emoji: g.emoji,
				actual: Number(g.currentAmount),
				objetivo: Number(g.targetAmount),
				porcentaje: Math.round(
					(Number(g.currentAmount) / Number(g.targetAmount)) * 100
				),
				color: g.color
			})),
			fuentesIngreso: userIncomeSources.map((s) => ({
				id: s.id,
				nombre: s.name,
				monto: Number(s.amount),
				frecuencia: s.frequency
			}))
		});
	} catch (err) {
		console.error('Error obteniendo resumen del dashboard:', err);
		throw error(500, 'Error interno del servidor');
	}
};
