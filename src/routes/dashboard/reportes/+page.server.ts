import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { transactions, apartados, incomeSources, savingsGoals } from '$lib/server/schema';
import { eq, and, gte, lte, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals, url }) => {
	const session = locals.session;
	const user = locals.user;

	if (!session || !user) {
		throw redirect(302, '/login');
	}

	// Obtener rango de fechas (por defecto: último mes)
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

	// Parámetros de URL para filtrar por mes
	const yearParam = url.searchParams.get('year');
	const monthParam = url.searchParams.get('month');

	let startDate = startOfMonth;
	let endDate = endOfMonth;

	if (yearParam && monthParam) {
		const year = Number.parseInt(yearParam);
		const month = Number.parseInt(monthParam) - 1; // JavaScript months are 0-indexed
		startDate = new Date(year, month, 1);
		endDate = new Date(year, month + 1, 0, 23, 59, 59);
	}

	// Obtener transacciones del período
	const userTransactions = await db
		.select()
		.from(transactions)
		.where(
			and(
				eq(transactions.userId, user.id),
				gte(transactions.date, startDate),
				lte(transactions.date, endDate)
			)
		)
		.orderBy(desc(transactions.date));

	// Calcular totales
	const gastos = userTransactions
		.filter(t => t.type === 'expense')
		.reduce((sum, t) => sum + Number(t.amount), 0);

	const ingresos = userTransactions
		.filter(t => t.type === 'income')
		.reduce((sum, t) => sum + Number(t.amount), 0);

	// Gastos por categoría
	const gastosPorCategoria = userTransactions
		.filter(t => t.type === 'expense')
		.reduce((acc, t) => {
			const cat = t.category || 'Sin categoría';
			acc[cat] = (acc[cat] || 0) + Number(t.amount);
			return acc;
		}, {} as Record<string, number>);

	// Convertir a array ordenado
	const categoriasOrdenadas = Object.entries(gastosPorCategoria)
		.map(([nombre, monto]) => ({ nombre, monto: monto as number, porcentaje: gastos > 0 ? Math.round(((monto as number) / gastos) * 100) : 0 }))
		.sort((a, b) => (b.monto as number) - (a.monto as number));

	// Obtener apartados activos
	const userApartados = await db
		.select()
		.from(apartados)
		.where(and(
			eq(apartados.userId, user.id),
			eq(apartados.isActive, true)
		));

	const totalApartados = userApartados.reduce((sum, a) => sum + Number(a.currentAmount), 0);
	const totalObjetivoApartados = userApartados.reduce((sum, a) => sum + Number(a.targetAmount), 0);

	// Obtener ingresos configurados
	const userIncomeSources = await db
		.select()
		.from(incomeSources)
		.where(and(
			eq(incomeSources.userId, user.id),
			eq(incomeSources.isActive, true)
		));

	// Calcular ingreso mensual estimado
	const ingresoMensualEstimado = userIncomeSources.reduce((sum, s) => {
		let multiplicador = 1;
		if (s.frequency === 'weekly') multiplicador = 4;
		if (s.frequency === 'biweekly') multiplicador = 2;
		return sum + (Number(s.amount) * multiplicador);
	}, 0);

	// Obtener metas de ahorro
	const userGoals = await db
		.select()
		.from(savingsGoals)
		.where(eq(savingsGoals.userId, user.id));

	const metasActivas = userGoals.filter(g => !g.isCompleted);
	const metasCompletadas = userGoals.filter(g => g.isCompleted);
	const totalAhorrado = userGoals.reduce((sum, g) => sum + Number(g.currentAmount), 0);

	// Transacciones recientes para timeline
	const transaccionesRecientes = userTransactions.slice(0, 10).map(t => ({
		id: t.id,
		tipo: t.type,
		monto: Number(t.amount),
		descripcion: t.description,
		categoria: t.category,
		emoji: t.emoji,
		fecha: t.date.toISOString()
	}));

	// Gastos diarios del mes (para gráfica)
	const gastosDiarios: Record<string, number> = {};
	userTransactions
		.filter(t => t.type === 'expense')
		.forEach(t => {
			const dia = t.date.toISOString().split('T')[0];
			gastosDiarios[dia] = (gastosDiarios[dia] || 0) + Number(t.amount);
		});

	return {
		periodo: {
			inicio: startDate.toISOString(),
			fin: endDate.toISOString(),
			mes: startDate.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
		},
		resumen: {
			ingresos,
			gastos,
			balance: ingresos - gastos,
			ingresoMensualEstimado
		},
		categorias: categoriasOrdenadas,
		apartados: {
			total: totalApartados,
			objetivo: totalObjetivoApartados,
			porcentaje: totalObjetivoApartados > 0 ? Math.round((totalApartados / totalObjetivoApartados) * 100) : 0,
			cantidad: userApartados.length
		},
		metas: {
			activas: metasActivas.length,
			completadas: metasCompletadas.length,
			totalAhorrado
		},
		transaccionesRecientes,
		gastosDiarios: Object.entries(gastosDiarios).map(([fecha, monto]) => ({ fecha, monto }))
	};
};
