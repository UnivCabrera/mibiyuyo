// ═══════════════════════════════════════════════════════════════════════════════
// 💰 API: Income Sources [id] — Operaciones individuales
// ═══════════════════════════════════════════════════════════════════════════════
// GET    → Obtener fuente de ingreso específica
// PUT    → Actualizar fuente de ingreso
// DELETE → Eliminar fuente de ingreso
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { incomeSources } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

// ────────────────────────────────────────────────────────────────────────────────
// GET — Obtener fuente específica
// ────────────────────────────────────────────────────────────────────────────────
export const GET: RequestHandler = async ({ params, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	const { id } = params;

	try {
		const [source] = await db
			.select()
			.from(incomeSources)
			.where(and(
				eq(incomeSources.id, id),
				eq(incomeSources.userId, user.id)
			));

		if (!source) {
			throw error(404, 'Fuente de ingreso no encontrada');
		}

		return json({
			success: true,
			data: {
				...source,
				amount: Number(source.amount)
			}
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al obtener fuente de ingreso:', err);
		throw error(500, 'Error al obtener fuente de ingreso');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// PUT — Actualizar fuente de ingreso
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
			.from(incomeSources)
			.where(and(
				eq(incomeSources.id, id),
				eq(incomeSources.userId, user.id)
			));

		if (!existing) {
			throw error(404, 'Fuente de ingreso no encontrada');
		}

		const body = await request.json();
		const { nombre, monto, frecuencia, diaPago, isActive } = body;

		// Preparar datos de actualización
		const updateData: Record<string, unknown> = {
			updatedAt: new Date()
		};

		if (nombre !== undefined) {
			if (typeof nombre !== 'string' || nombre.trim().length < 2) {
				throw error(400, 'El nombre debe tener al menos 2 caracteres');
			}
			updateData.name = nombre.trim();
		}

		if (monto !== undefined) {
			if (typeof monto !== 'number' || monto <= 0) {
				throw error(400, 'El monto debe ser un número positivo');
			}
			updateData.amount = String(monto);
		}

		if (frecuencia !== undefined) {
			const frecuenciaMap: Record<string, string> = {
				'semanal': 'weekly',
				'quincenal': 'biweekly',
				'mensual': 'monthly'
			};
			updateData.frequency = frecuenciaMap[frecuencia] || frecuencia;
		}

		if (diaPago !== undefined) {
			const dayOfMonthValue = Number(diaPago) || null;
			updateData.dayOfMonth = dayOfMonthValue;
			
			// Recalcular próxima fecha de pago
			if (dayOfMonthValue) {
				const today = new Date();
				const currentDay = today.getDate();
				const year = today.getFullYear();
				const month = today.getMonth();
				
				if (currentDay <= dayOfMonthValue) {
					updateData.nextPayDate = new Date(year, month, dayOfMonthValue);
				} else {
					updateData.nextPayDate = new Date(year, month + 1, dayOfMonthValue);
				}
			}
		}

		if (isActive !== undefined) {
			updateData.isActive = Boolean(isActive);
		}

		// Actualizar
		const [updated] = await db
			.update(incomeSources)
			.set(updateData)
			.where(eq(incomeSources.id, id))
			.returning();

		return json({
			success: true,
			data: {
				...updated,
				amount: Number(updated.amount)
			}
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al actualizar fuente de ingreso:', err);
		throw error(500, 'Error al actualizar fuente de ingreso');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// DELETE — Eliminar fuente de ingreso
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
			.from(incomeSources)
			.where(and(
				eq(incomeSources.id, id),
				eq(incomeSources.userId, user.id)
			));

		if (!existing) {
			throw error(404, 'Fuente de ingreso no encontrada');
		}

		// Eliminar
		await db
			.delete(incomeSources)
			.where(eq(incomeSources.id, id));

		return json({
			success: true,
			message: 'Fuente de ingreso eliminada'
		});
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al eliminar fuente de ingreso:', err);
		throw error(500, 'Error al eliminar fuente de ingreso');
	}
};
