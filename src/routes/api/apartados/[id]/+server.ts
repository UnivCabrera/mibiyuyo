// ═══════════════════════════════════════════════════════════════════════════════
// 📁 API — Apartado Individual
// ═══════════════════════════════════════════════════════════════════════════════
// GET    /api/apartados/[id] - Obtener apartado
// PUT    /api/apartados/[id] - Actualizar apartado
// DELETE /api/apartados/[id] - Eliminar apartado
// PATCH  /api/apartados/[id] - Abonar al apartado
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { apartados, transactions } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

// ═══════════════════════════════════════════════════════════════════════════════
// GET — Obtener apartado con historial
// ═══════════════════════════════════════════════════════════════════════════════
export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		const [apartado] = await db
			.select()
			.from(apartados)
			.where(
				and(
					eq(apartados.id, params.id),
					eq(apartados.userId, locals.user.id)
				)
			)
			.limit(1);

		if (!apartado) {
			throw error(404, 'Apartado no encontrado');
		}

		// Obtener transacciones relacionadas
		const historial = await db
			.select()
			.from(transactions)
			.where(eq(transactions.apartadoId, params.id))
			.orderBy(transactions.date);

		return json({
			id: apartado.id,
			nombre: apartado.name,
			emoji: apartado.emoji,
			montoActual: Number(apartado.currentAmount),
			montoObjetivo: Number(apartado.targetAmount),
			porcentaje: Math.round(
				(Number(apartado.currentAmount) / Number(apartado.targetAmount)) * 100
			),
			diaVencimiento: apartado.dueDate,
			frecuencia: apartado.frequency,
			categoria: apartado.category,
			esAutomatico: apartado.isAutomatic,
			activo: apartado.isActive,
			color: apartado.color,
			createdAt: apartado.createdAt,
			historial: historial.map((t) => ({
				id: t.id,
				monto: Number(t.amount),
				tipo: t.type,
				descripcion: t.description,
				fecha: t.date
			}))
		});
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error obteniendo apartado:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// PUT — Actualizar apartado
// ═══════════════════════════════════════════════════════════════════════════════
export const PUT: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		// Verificar que existe
		const [existing] = await db
			.select()
			.from(apartados)
			.where(
				and(
					eq(apartados.id, params.id),
					eq(apartados.userId, locals.user.id)
				)
			)
			.limit(1);

		if (!existing) {
			throw error(404, 'Apartado no encontrado');
		}

		const body = await request.json();
		const {
			nombre,
			emoji,
			montoObjetivo,
			diaVencimiento,
			frecuencia,
			categoria,
			esAutomatico,
			activo,
			color
		} = body;

		// Preparar actualización
		const updates: Partial<typeof apartados.$inferInsert> = {
			updatedAt: new Date()
		};

		if (nombre !== undefined) updates.name = nombre;
		if (emoji !== undefined) updates.emoji = emoji;
		if (montoObjetivo !== undefined) updates.targetAmount = montoObjetivo.toString();
		if (diaVencimiento !== undefined) updates.dueDate = diaVencimiento;
		if (frecuencia !== undefined) updates.frequency = frecuencia;
		if (categoria !== undefined) updates.category = categoria;
		if (esAutomatico !== undefined) updates.isAutomatic = esAutomatico;
		if (activo !== undefined) updates.isActive = activo;
		if (color !== undefined) updates.color = color;

		const [updated] = await db
			.update(apartados)
			.set(updates)
			.where(eq(apartados.id, params.id))
			.returning();

		return json({
			success: true,
			apartado: {
				id: updated.id,
				nombre: updated.name,
				emoji: updated.emoji,
				montoActual: Number(updated.currentAmount),
				montoObjetivo: Number(updated.targetAmount),
				color: updated.color
			}
		});
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error actualizando apartado:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// PATCH — Abonar al apartado
// ═══════════════════════════════════════════════════════════════════════════════
export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		const [existing] = await db
			.select()
			.from(apartados)
			.where(
				and(
					eq(apartados.id, params.id),
					eq(apartados.userId, locals.user.id)
				)
			)
			.limit(1);

		if (!existing) {
			throw error(404, 'Apartado no encontrado');
		}

		const body = await request.json();
		const { monto, descripcion } = body;

		if (!monto || Number.isNaN(monto) || monto === 0) {
			throw error(400, 'El monto debe ser un número diferente de cero');
		}

		const nuevoMonto = Number(existing.currentAmount) + monto;

		// No permitir montos negativos
		if (nuevoMonto < 0) {
			throw error(400, 'El monto resultante no puede ser negativo');
		}

		// Actualizar el monto del apartado
		await db
			.update(apartados)
			.set({
				currentAmount: nuevoMonto.toString(),
				updatedAt: new Date()
			})
			.where(eq(apartados.id, params.id));

		// Registrar la transacción
		await db.insert(transactions).values({
			userId: locals.user.id,
			type: monto > 0 ? 'income' : 'expense',
			amount: Math.abs(monto).toString(),
			description: descripcion || (monto > 0 ? 'Abono a apartado' : 'Retiro de apartado'),
			category: 'apartado',
			emoji: existing.emoji,
			apartadoId: params.id,
			date: new Date()
		});

		return json({
			success: true,
			apartado: {
				id: existing.id,
				nombre: existing.name,
				montoAnterior: Number(existing.currentAmount),
				montoNuevo: nuevoMonto,
				diferencia: monto
			}
		});
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error abonando a apartado:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// DELETE — Eliminar apartado
// ═══════════════════════════════════════════════════════════════════════════════
export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	try {
		const [deleted] = await db
			.delete(apartados)
			.where(
				and(
					eq(apartados.id, params.id),
					eq(apartados.userId, locals.user.id)
				)
			)
			.returning();

		if (!deleted) {
			throw error(404, 'Apartado no encontrado');
		}

		return json({ success: true, message: 'Apartado eliminado' });
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error eliminando apartado:', err);
		throw error(500, 'Error interno del servidor');
	}
};
