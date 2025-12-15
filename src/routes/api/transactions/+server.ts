// ═══════════════════════════════════════════════════════════════════════════════
// 💳 API — Transacciones (Gastos e Ingresos)
// ═══════════════════════════════════════════════════════════════════════════════
// GET  /api/transactions - Listar transacciones
// POST /api/transactions - Crear transacción
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { transactions, apartados } from '$lib/server/schema';
import { eq, desc, and, gte, lte, sql } from 'drizzle-orm';

// ═══════════════════════════════════════════════════════════════════════════════
// GET — Listar transacciones
// ═══════════════════════════════════════════════════════════════════════════════
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	const userId = locals.user.id;
	const limit = Number.parseInt(url.searchParams.get('limit') || '50');
	const offset = Number.parseInt(url.searchParams.get('offset') || '0');
	const type = url.searchParams.get('type'); // income | expense
	const fromDate = url.searchParams.get('from');
	const toDate = url.searchParams.get('to');
	const category = url.searchParams.get('category');

	try {
		const conditions = [eq(transactions.userId, userId)];

		if (type) {
			conditions.push(eq(transactions.type, type));
		}

		if (fromDate) {
			conditions.push(gte(transactions.date, new Date(fromDate)));
		}

		if (toDate) {
			conditions.push(lte(transactions.date, new Date(toDate)));
		}

		if (category) {
			conditions.push(eq(transactions.category, category));
		}

		const results = await db
			.select()
			.from(transactions)
			.where(and(...conditions))
			.orderBy(desc(transactions.date))
			.limit(limit)
			.offset(offset);

		// Obtener total para paginación
		const countResult = await db
			.select({ count: sql<number>`count(*)` })
			.from(transactions)
			.where(and(...conditions));

		return json({
			transactions: results.map((t) => ({
				id: t.id,
				tipo: t.type,
				monto: Number(t.amount),
				descripcion: t.description,
				categoria: t.category,
				emoji: t.emoji,
				fecha: t.date,
				apartadoId: t.apartadoId,
				notas: t.notes,
				tags: t.tags
			})),
			pagination: {
				total: Number(countResult[0].count),
				limit,
				offset,
				hasMore: offset + limit < Number(countResult[0].count)
			}
		});
	} catch (err) {
		console.error('Error listando transacciones:', err);
		throw error(500, 'Error interno del servidor');
	}
};

// ═══════════════════════════════════════════════════════════════════════════════
// POST — Crear transacción
// ═══════════════════════════════════════════════════════════════════════════════
export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(401, 'No autorizado');
	}

	const userId = locals.user.id;

	try {
		const body = await request.json();
		const { tipo, monto, descripcion, categoria, emoji, apartadoId, notas, tags } = body;

		// Validaciones
		if (!tipo || !['income', 'expense'].includes(tipo)) {
			throw error(400, 'Tipo debe ser "income" o "expense"');
		}

		if (!monto || Number.isNaN(monto) || monto <= 0) {
			throw error(400, 'Monto debe ser un número positivo');
		}

		// Verificar que el apartado pertenece al usuario (si se proporciona)
		if (apartadoId) {
			const apartado = await db
				.select()
				.from(apartados)
				.where(and(eq(apartados.id, apartadoId), eq(apartados.userId, userId)))
				.limit(1);

			if (!apartado.length) {
				throw error(400, 'Apartado no encontrado');
			}
		}

		// Crear transacción
		const [newTransaction] = await db
			.insert(transactions)
			.values({
				userId,
				type: tipo,
				amount: monto.toString(),
				description: descripcion || null,
				category: categoria || null,
				emoji: emoji || (tipo === 'expense' ? '💸' : '💰'),
				apartadoId: apartadoId || null,
				notes: notas || null,
				tags: tags || [],
				date: new Date()
			})
			.returning();

		return json(
			{
				success: true,
				transaction: {
					id: newTransaction.id,
					tipo: newTransaction.type,
					monto: Number(newTransaction.amount),
					descripcion: newTransaction.description,
					categoria: newTransaction.category,
					emoji: newTransaction.emoji,
					fecha: newTransaction.date
				}
			},
			{ status: 201 }
		);
	} catch (err) {
		if (err instanceof Response) throw err;
		console.error('Error creando transacción:', err);
		throw error(500, 'Error interno del servidor');
	}
};
