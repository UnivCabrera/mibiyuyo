// ═══════════════════════════════════════════════════════════════════════════════
// 📁 API — Apartados
// ═══════════════════════════════════════════════════════════════════════════════
// GET  /api/apartados - Listar apartados
// POST /api/apartados - Crear apartado
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { apartados } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

// ═══════════════════════════════════════════════════════════════════════════════
// GET — Listar apartados del usuario
// ═══════════════════════════════════════════════════════════════════════════════
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	const userId = locals.user.id;
	const onlyActive = url.searchParams.get('active') !== 'false';

	try {
		const conditions = [eq(apartados.userId, userId)];

		if (onlyActive) {
			conditions.push(eq(apartados.isActive, true));
		}

		const results = await db
			.select()
			.from(apartados)
			.where(and(...conditions))
			.orderBy(apartados.dueDate);

		// Calcular totales
		const totales = results.reduce(
			(acc, a) => ({
				apartado: acc.apartado + Number(a.currentAmount || 0),
				objetivo: acc.objetivo + Number(a.targetAmount || 0)
			}),
			{ apartado: 0, objetivo: 0 }
		);

		return json({
			apartados: results.map((a) => ({
				id: a.id,
				nombre: a.name,
				emoji: a.emoji,
				montoActual: Number(a.currentAmount),
				montoObjetivo: Number(a.targetAmount),
				porcentaje: Math.round(
					(Number(a.currentAmount) / Number(a.targetAmount)) * 100
				),
				diaVencimiento: a.dueDate,
				frecuencia: a.frequency,
				categoria: a.category,
				esAutomatico: a.isAutomatic,
				activo: a.isActive,
				color: a.color,
				createdAt: a.createdAt
			})),
			totales: {
				apartado: totales.apartado,
				objetivo: totales.objetivo,
				porcentaje: totales.objetivo > 0 
					? Math.round((totales.apartado / totales.objetivo) * 100) 
					: 0
			}
		});
	} catch (err) {
		console.error('Error listando apartados:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST — Crear apartado
// ═══════════════════════════════════════════════════════════════════════════════
export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	const userId = locals.user.id;

	try {
		const body = await request.json();
		const {
			nombre,
			emoji = '📌',
			montoObjetivo,
			diaVencimiento,
			frecuencia = 'monthly',
			categoria = 'fixed',
			esAutomatico = true,
			color = '#f97316'
		} = body;

		// Validaciones
		if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
			throw error(400, 'El nombre es requerido');
		}

		if (!montoObjetivo || Number.isNaN(montoObjetivo) || montoObjetivo <= 0) {
			throw error(400, 'El monto objetivo debe ser un número positivo');
		}

		if (diaVencimiento !== undefined && (diaVencimiento < 1 || diaVencimiento > 31)) {
			throw error(400, 'El día de vencimiento debe estar entre 1 y 31');
		}

		// Crear apartado
		const [newApartado] = await db
			.insert(apartados)
			.values({
				userId,
				name: nombre.trim(),
				emoji,
				targetAmount: montoObjetivo.toString(),
				currentAmount: '0',
				dueDate: diaVencimiento || null,
				frequency: frecuencia,
				category: categoria,
				isAutomatic: esAutomatico,
				isActive: true,
				color
			})
			.returning();

		return json(
			{
				success: true,
				apartado: {
					id: newApartado.id,
					nombre: newApartado.name,
					emoji: newApartado.emoji,
					montoActual: 0,
					montoObjetivo: Number(newApartado.targetAmount),
					porcentaje: 0,
					color: newApartado.color
				}
			},
			{ status: 201 }
		);
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error creando apartado:', err);
		throw error(500, 'Error interno del servidor');
	}
};
