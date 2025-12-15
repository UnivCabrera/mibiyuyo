// ═══════════════════════════════════════════════════════════════════════════════
// 💰 API: Income Sources — Fuentes de ingreso
// ═══════════════════════════════════════════════════════════════════════════════
// GET    → Obtener todas las fuentes de ingreso del usuario
// POST   → Crear nueva fuente de ingreso
// ═══════════════════════════════════════════════════════════════════════════════

import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { incomeSources } from '$lib/server/schema';
import { eq, desc } from 'drizzle-orm';

// ────────────────────────────────────────────────────────────────────────────────
// GET — Obtener fuentes de ingreso
// ────────────────────────────────────────────────────────────────────────────────
export const GET: RequestHandler = async ({ locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	try {
		const sources = await db
			.select()
			.from(incomeSources)
			.where(eq(incomeSources.userId, user.id))
			.orderBy(desc(incomeSources.createdAt));

		return json({
			success: true,
			data: sources.map(source => ({
				...source,
				amount: Number(source.amount)
			}))
		});
	} catch (err) {
		console.error('Error al obtener fuentes de ingreso:', err);
		throw error(500, 'Error al obtener fuentes de ingreso');
	}
};

// ────────────────────────────────────────────────────────────────────────────────
// POST — Crear fuente de ingreso
// ────────────────────────────────────────────────────────────────────────────────
export const POST: RequestHandler = async ({ request, locals }) => {
	const user = locals.user;
	const session = locals.session;

	if (!session || !user) {
		throw error(401, 'No autorizado');
	}

	try {
		const body = await request.json();
		const { nombre, monto, frecuencia, diaPago } = body;

		// Validaciones
		if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
			throw error(400, 'El nombre debe tener al menos 2 caracteres');
		}

		if (!monto || typeof monto !== 'number' || monto <= 0) {
			throw error(400, 'El monto debe ser un número positivo');
		}

		const frecuenciasValidas = ['semanal', 'quincenal', 'mensual', 'weekly', 'biweekly', 'monthly'];
		if (!frecuencia || !frecuenciasValidas.includes(frecuencia)) {
			throw error(400, 'Frecuencia inválida');
		}

		// Mapear frecuencia a formato en inglés si es necesario
		const frecuenciaMap: Record<string, string> = {
			'semanal': 'weekly',
			'quincenal': 'biweekly',
			'mensual': 'monthly'
		};
		const frecuenciaFinal = frecuenciaMap[frecuencia] || frecuencia;

		// Calcular próxima fecha de pago
		let nextPayDate: Date | undefined;
		if (diaPago && typeof diaPago === 'number') {
			const today = new Date();
			const currentDay = today.getDate();
			const year = today.getFullYear();
			const month = today.getMonth();
			
			if (currentDay <= diaPago) {
				nextPayDate = new Date(year, month, diaPago);
			} else {
				nextPayDate = new Date(year, month + 1, diaPago);
			}
		}

		// Insertar en la base de datos
		const [newSource] = await db
			.insert(incomeSources)
			.values({
				userId: user.id,
				name: nombre.trim(),
				amount: String(monto),
				frequency: frecuenciaFinal,
				dayOfMonth: diaPago || null,
				nextPayDate: nextPayDate,
				isActive: true
			})
			.returning();

		return json({
			success: true,
			data: {
				...newSource,
				amount: Number(newSource.amount)
			}
		}, { status: 201 });
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		console.error('Error al crear fuente de ingreso:', err);
		throw error(500, 'Error al crear fuente de ingreso');
	}
};
