// ═══════════════════════════════════════════════════════════════════════════════
// 🎯 API: Savings Goals [id] — Operaciones individuales
// ═══════════════════════════════════════════════════════════════════════════════
// GET    → Obtener meta específica
// PUT    → Actualizar meta
// DELETE → Eliminar meta
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { savingsGoals } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

// ────────────────────────────────────────────────────────────────────────────────
// GET — Obtener meta específica
// ────────────────────────────────────────────────────────────────────────────────
export const GET: RequestHandler = async ({ params, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	const { id } = params;

	try {
		const [goal] = await db
			.select()
			.from(savingsGoals)
			.where(and(
				eq(savingsGoals.id, id),
				eq(savingsGoals.userId, user.id)
			));

		if (!goal) {
			throw error(404, 'Meta no encontrada');
		}

		return json({
			success: true,
			data: {
				id: goal.id,
				name: goal.name,
				emoji: goal.emoji,
				targetAmount: Number(goal.targetAmount),
				currentAmount: Number(goal.currentAmount),
				deadline: goal.deadline?.toISOString() || null,
				color: goal.color,
				isCompleted: goal.isCompleted,
				createdAt: goal.createdAt.toISOString()
			}
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al obtener meta:', err);
		throw error(500, 'Error al obtener meta de ahorro');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// PUT — Actualizar meta
// ────────────────────────────────────────────────────────────────────────────────
export const PUT: RequestHandler = async ({ params, request, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	const { id } = params;

	try {
		// Verificar que existe y pertenece al usuario
		const [existing] = await db
			.select()
			.from(savingsGoals)
			.where(and(
				eq(savingsGoals.id, id),
				eq(savingsGoals.userId, user.id)
			));

		if (!existing) {
			throw error(404, 'Meta no encontrada');
		}

		const body = await request.json();
		const { nombre, emoji, montoObjetivo, montoActual, deadline, color, isCompleted } = body;

		// Preparar datos de actualización
		const updateData: Record<string, unknown> = {
			updatedAt: new Date()
		};

		if (nombre !== undefined) {
			updateData.name = nombre.trim();
		}

		if (emoji !== undefined) {
			updateData.emoji = emoji;
		}

		if (montoObjetivo !== undefined) {
			updateData.targetAmount = String(montoObjetivo);
		}

		if (montoActual !== undefined) {
			updateData.currentAmount = String(montoActual);
		}

		if (deadline !== undefined) {
			updateData.deadline = deadline ? new Date(deadline) : null;
		}

		if (color !== undefined) {
			updateData.color = color;
		}

		if (isCompleted !== undefined) {
			updateData.isCompleted = Boolean(isCompleted);
		}

		// Actualizar
		const [updated] = await db
			.update(savingsGoals)
			.set(updateData)
			.where(eq(savingsGoals.id, id))
			.returning();

		return json({
			success: true,
			data: {
				id: updated.id,
				name: updated.name,
				emoji: updated.emoji,
				targetAmount: Number(updated.targetAmount),
				currentAmount: Number(updated.currentAmount),
				deadline: updated.deadline?.toISOString() || null,
				color: updated.color,
				isCompleted: updated.isCompleted,
				createdAt: updated.createdAt.toISOString()
			}
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al actualizar meta:', err);
		throw error(500, 'Error al actualizar meta de ahorro');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// DELETE — Eliminar meta
// ────────────────────────────────────────────────────────────────────────────────
export const DELETE: RequestHandler = async ({ params, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	const { id } = params;

	try {
		// Verificar que existe y pertenece al usuario
		const [existing] = await db
			.select()
			.from(savingsGoals)
			.where(and(
				eq(savingsGoals.id, id),
				eq(savingsGoals.userId, user.id)
			));

		if (!existing) {
			throw error(404, 'Meta no encontrada');
		}

		// Eliminar
		await db
			.delete(savingsGoals)
			.where(eq(savingsGoals.id, id));

		return json({
			success: true,
			message: 'Meta eliminada correctamente'
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al eliminar meta:', err);
		throw error(500, 'Error al eliminar meta de ahorro');
	}
};
