// ═══════════════════════════════════════════════════════════════════════════════
// 💳 API — Transacción Individual
// ═══════════════════════════════════════════════════════════════════════════════
// GET    /api/transactions/[id] - Obtener transacción
// PUT    /api/transactions/[id] - Actualizar transacción
// DELETE /api/transactions/[id] - Eliminar transacción
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { transactions } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

// ═══════════════════════════════════════════════════════════════════════════════
// GET — Obtener transacción por ID
// ═══════════════════════════════════════════════════════════════════════════════
export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		const [transaction] = await db
			.select()
			.from(transactions)
			.where(
				and(
					eq(transactions.id, params.id),
					eq(transactions.userId, locals.user.id)
				)
			)
			.limit(1);

		if (!transaction) {
			throw error(404, 'Transacción no encontrada');
		}

		return json({
			id: transaction.id,
			tipo: transaction.type,
			monto: Number(transaction.amount),
			descripcion: transaction.description,
			categoria: transaction.category,
			emoji: transaction.emoji,
			fecha: transaction.date,
			apartadoId: transaction.apartadoId,
			notas: transaction.notes,
			tags: transaction.tags
		});
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error obteniendo transacción:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUT — Actualizar transacción
// ═══════════════════════════════════════════════════════════════════════════════
export const PUT: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		// Verificar que la transacción existe y pertenece al usuario
		const [existing] = await db
			.select()
			.from(transactions)
			.where(
				and(
					eq(transactions.id, params.id),
					eq(transactions.userId, locals.user.id)
				)
			)
			.limit(1);

		if (!existing) {
			throw error(404, 'Transacción no encontrada');
		}

		const body = await request.json();
		const { monto, descripcion, categoria, emoji, notas, tags } = body;

		// Preparar actualización
		const updates: Partial<typeof transactions.$inferInsert> = {};

		if (monto !== undefined) {
			if (Number.isNaN(monto) || monto <= 0) {
				throw error(400, 'Monto debe ser un número positivo');
			}
			updates.amount = monto.toString();
		}

		if (descripcion !== undefined) updates.description = descripcion;
		if (categoria !== undefined) updates.category = categoria;
		if (emoji !== undefined) updates.emoji = emoji;
		if (notas !== undefined) updates.notes = notas;
		if (tags !== undefined) updates.tags = tags;

		const [updated] = await db
			.update(transactions)
			.set(updates)
			.where(eq(transactions.id, params.id))
			.returning();

		return json({
			success: true,
			transaction: {
				id: updated.id,
				tipo: updated.type,
				monto: Number(updated.amount),
				descripcion: updated.description,
				categoria: updated.category,
				emoji: updated.emoji,
				fecha: updated.date
			}
		});
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error actualizando transacción:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// DELETE — Eliminar transacción
// ═══════════════════════════════════════════════════════════════════════════════
export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		const [deleted] = await db
			.delete(transactions)
			.where(
				and(
					eq(transactions.id, params.id),
					eq(transactions.userId, locals.user.id)
				)
			)
			.returning();

		if (!deleted) {
			throw error(404, 'Transacción no encontrada');
		}

		return json({ success: true, message: 'Transacción eliminada' });
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error eliminando transacción:', err);
		throw error(500, 'Error interno del servidor');
	}
};
