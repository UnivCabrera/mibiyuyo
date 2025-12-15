// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 API: Savings Goals — Metas de ahorro
// ═══════════════════════════════════════════════════════════════════════════════
// GET    → Obtener todas las metas del usuario
// POST   → Crear nueva meta
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { savingsGoals } from '$lib/server/schema';
import { eq, desc } from 'drizzle-orm';

// ────────────────────────────────────────────────────────────────────────────────
// GET — Obtener metas de ahorro
// ────────────────────────────────────────────────────────────────────────────────
export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	try {
		const goals = await db
			.select()
			.from(savingsGoals)
			.where(eq(savingsGoals.userId, user.id))
			.orderBy(desc(savingsGoals.createdAt));

		return json({
			success: true,
			data: goals.map(goal => ({
				id: goal.id,
				name: goal.name,
				emoji: goal.emoji,
				targetAmount: Number(goal.targetAmount),
				currentAmount: Number(goal.currentAmount),
				deadline: goal.deadline?.toISOString() || null,
				color: goal.color,
				isCompleted: goal.isCompleted,
				createdAt: goal.createdAt.toISOString()
			}))
		});
	} catch (err) {
		console.error('Error al obtener metas:', err);
		throw error(500, 'Error al obtener metas de ahorro');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// POST — Crear meta de ahorro
// ────────────────────────────────────────────────────────────────────────────────
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	try {
		const body = await request.json();
		const { nombre, emoji, montoObjetivo, montoActual, deadline, color } = body;

		// Validaciones
		if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
			throw error(400, 'El nombre debe tener al menos 2 caracteres');
		}

		if (!montoObjetivo || typeof montoObjetivo !== 'number' || montoObjetivo <= 0) {
			throw error(400, 'El monto objetivo debe ser un número positivo');
		}

		// Insertar en la base de datos
		const [newGoal] = await db
			.insert(savingsGoals)
			.values({
				userId: user.id,
				name: nombre.trim(),
				emoji: emoji || '🎯',
				targetAmount: String(montoObjetivo),
				currentAmount: String(montoActual || 0),
				deadline: deadline ? new Date(deadline) : null,
				color: color || '#3b82f6',
				isCompleted: false
			})
			.returning();

		return json({
			success: true,
			data: {
				id: newGoal.id,
				name: newGoal.name,
				emoji: newGoal.emoji,
				targetAmount: Number(newGoal.targetAmount),
				currentAmount: Number(newGoal.currentAmount),
				deadline: newGoal.deadline?.toISOString() || null,
				color: newGoal.color,
				isCompleted: newGoal.isCompleted,
				createdAt: newGoal.createdAt.toISOString()
			}
		}, { status: 201 });
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al crear meta:', err);
		throw error(500, 'Error al crear meta de ahorro');
	}
};
