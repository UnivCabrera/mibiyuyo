<!-- ═══════════════════════════════════════════════════════════════════════════════
     📊 REPORTES — Análisis financiero mensual
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		BarChart3,
		TrendingUp,
		TrendingDown,
		Wallet,
		PiggyBank,
		Target,
		Calendar,
		ChevronLeft,
		ChevronRight,
		ArrowUpRight,
		ArrowDownRight,
		Minus
	} from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	interface Props {
		data: {
			periodo: {
				inicio: string;
				fin: string;
				mes: string;
			};
			resumen: {
				ingresos: number;
				gastos: number;
				balance: number;
				ingresoMensualEstimado: number;
			};
			categorias: Array<{
				nombre: string;
				monto: number;
				porcentaje: number;
			}>;
			apartados: {
				total: number;
				objetivo: number;
				porcentaje: number;
				cantidad: number;
			};
			metas: {
				activas: number;
				completadas: number;
				totalAhorrado: number;
			};
			transaccionesRecientes: Array<{
				id: string;
				tipo: string;
				monto: number;
				descripcion: string | null;
				categoria: string | null;
				emoji: string | null;
				fecha: string;
			}>;
			gastosDiarios: Array<{
				fecha: string;
				monto: number;
			}>;
		};
	}
	let { data }: Props = $props();

	// Colores para categorías
	const coloresCategorias = [
		'#f97316', '#3b82f6', '#22c55e', '#eab308', 
		'#8b5cf6', '#ec4899', '#06b6d4', '#ef4444'
	];

	// Formatear moneda
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Formatear fecha corta
	function formatDateShort(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'short'
		});
	}

	// Navegar al mes anterior/siguiente
	function navegarMes(delta: number) {
		const fecha = new Date(data.periodo.inicio);
		fecha.setMonth(fecha.getMonth() + delta);
		goto(`/dashboard/reportes?year=${fecha.getFullYear()}&month=${fecha.getMonth() + 1}`);
	}

	// Calcular máximo para escala de barras
	const maxGastoDiario = $derived(
		Math.max(...data.gastosDiarios.map(g => g.monto), 1)
	);

	// Calcular porcentaje de uso del ingreso
	const porcentajeUsoIngreso = $derived(
		data.resumen.ingresoMensualEstimado > 0
			? Math.round((data.resumen.gastos / data.resumen.ingresoMensualEstimado) * 100)
			: 0
	);
</script>

<svelte:head>
	<title>Reportes | mibiyuyo</title>
</svelte:head>

<div class="reportes-page">
	<!-- Header con navegación de mes -->
	<header class="page-header">
		<div class="header-info">
			<h1>
				<BarChart3 size={28} />
				Reportes
			</h1>
			<p>Análisis de tus finanzas personales</p>
		</div>

		<div class="month-nav">
			<button class="nav-btn" onclick={() => navegarMes(-1)}>
				<ChevronLeft size={20} />
			</button>
			<span class="current-month">
				<Calendar size={16} />
				{data.periodo.mes}
			</span>
			<button class="nav-btn" onclick={() => navegarMes(1)}>
				<ChevronRight size={20} />
			</button>
		</div>
	</header>

	<!-- Resumen Principal -->
	<div class="summary-grid" in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}>
		<!-- Ingresos -->
		<div class="summary-card income">
			<div class="card-header">
				<span class="card-label">Ingresos del mes</span>
				<div class="card-icon">
					<TrendingUp size={20} />
				</div>
			</div>
			<div class="card-value">{formatMXN(data.resumen.ingresos)}</div>
			{#if data.resumen.ingresoMensualEstimado > 0}
				<div class="card-meta">
					Estimado: {formatMXN(data.resumen.ingresoMensualEstimado)}
				</div>
			{/if}
		</div>

		<!-- Gastos -->
		<div class="summary-card expense">
			<div class="card-header">
				<span class="card-label">Gastos del mes</span>
				<div class="card-icon">
					<TrendingDown size={20} />
				</div>
			</div>
			<div class="card-value">{formatMXN(data.resumen.gastos)}</div>
			{#if porcentajeUsoIngreso > 0}
				<div class="card-meta" class:warning={porcentajeUsoIngreso > 80} class:danger={porcentajeUsoIngreso > 100}>
					{porcentajeUsoIngreso}% de tu ingreso estimado
				</div>
			{/if}
		</div>

		<!-- Balance -->
		<div class="summary-card balance" class:positive={data.resumen.balance >= 0} class:negative={data.resumen.balance < 0}>
			<div class="card-header">
				<span class="card-label">Balance</span>
				<div class="card-icon">
					{#if data.resumen.balance > 0}
						<ArrowUpRight size={20} />
					{:else if data.resumen.balance < 0}
						<ArrowDownRight size={20} />
					{:else}
						<Minus size={20} />
					{/if}
				</div>
			</div>
			<div class="card-value">
				{data.resumen.balance >= 0 ? '+' : ''}{formatMXN(data.resumen.balance)}
			</div>
			<div class="card-meta">
				{data.resumen.balance >= 0 ? 'Superávit 🎉' : 'Déficit ⚠️'}
			</div>
		</div>
	</div>

	<div class="content-grid">
		<!-- Gráfica de gastos diarios -->
		<section class="chart-section" in:fly={{ y: 20, duration: 400, delay: 200, easing: quintOut }}>
			<h2>Gastos diarios</h2>
			{#if data.gastosDiarios.length > 0}
				<div class="bar-chart">
					{#each data.gastosDiarios as dia, i}
						<div class="bar-item" title="{formatDateShort(dia.fecha)}: {formatMXN(dia.monto)}">
							<div 
								class="bar"
								style="height: {(dia.monto / maxGastoDiario) * 100}%;"
								in:scale={{ start: 0, duration: 300, delay: i * 30 }}
							></div>
							<span class="bar-label">{new Date(dia.fecha).getDate()}</span>
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-chart">
					<p>No hay gastos registrados este mes</p>
				</div>
			{/if}
		</section>

		<!-- Gastos por categoría -->
		<section class="categories-section" in:fly={{ y: 20, duration: 400, delay: 300, easing: quintOut }}>
			<h2>Gastos por categoría</h2>
			{#if data.categorias.length > 0}
				<div class="categories-list">
					{#each data.categorias as cat, i}
						<div class="category-item">
							<div class="category-info">
								<div 
									class="category-color"
									style="background: {coloresCategorias[i % coloresCategorias.length]};"
								></div>
								<span class="category-name">{cat.nombre}</span>
							</div>
							<div class="category-stats">
								<span class="category-amount">{formatMXN(cat.monto)}</span>
								<div class="category-bar-container">
									<div 
										class="category-bar"
										style="width: {cat.porcentaje}%; background: {coloresCategorias[i % coloresCategorias.length]};"
									></div>
								</div>
								<span class="category-percent">{cat.porcentaje}%</span>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="empty-categories">
					<p>No hay gastos categorizados</p>
				</div>
			{/if}
		</section>
	</div>

	<!-- Resumen de ahorros -->
	<div class="savings-grid" in:fly={{ y: 20, duration: 400, delay: 400, easing: quintOut }}>
		<!-- Apartados -->
		<div class="savings-card">
			<div class="savings-icon apartados">
				<Wallet size={24} />
			</div>
			<div class="savings-info">
				<h3>Apartados</h3>
				<div class="savings-stats">
					<span class="main-stat">{formatMXN(data.apartados.total)}</span>
					<span class="sub-stat">de {formatMXN(data.apartados.objetivo)}</span>
				</div>
				<div class="progress-bar">
					<div class="progress-fill" style="width: {data.apartados.porcentaje}%;"></div>
				</div>
				<span class="progress-label">{data.apartados.cantidad} apartados • {data.apartados.porcentaje}%</span>
			</div>
		</div>

		<!-- Metas -->
		<div class="savings-card">
			<div class="savings-icon metas">
				<Target size={24} />
			</div>
			<div class="savings-info">
				<h3>Metas de ahorro</h3>
				<div class="savings-stats">
					<span class="main-stat">{formatMXN(data.metas.totalAhorrado)}</span>
					<span class="sub-stat">ahorrado total</span>
				</div>
				<div class="metas-badges">
					<span class="badge active">{data.metas.activas} activas</span>
					<span class="badge completed">{data.metas.completadas} completadas</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Transacciones recientes -->
	<section class="recent-section" in:fly={{ y: 20, duration: 400, delay: 500, easing: quintOut }}>
		<h2>Transacciones recientes</h2>
		{#if data.transaccionesRecientes.length > 0}
			<div class="transactions-list">
				{#each data.transaccionesRecientes as trans}
					<div class="transaction-item">
						<div class="trans-icon" class:income={trans.tipo === 'income'} class:expense={trans.tipo === 'expense'}>
							{trans.emoji || (trans.tipo === 'income' ? '💰' : '💸')}
						</div>
						<div class="trans-info">
							<span class="trans-desc">{trans.descripcion || trans.categoria || 'Sin descripción'}</span>
							<span class="trans-date">{formatDateShort(trans.fecha)}</span>
						</div>
						<span class="trans-amount" class:income={trans.tipo === 'income'} class:expense={trans.tipo === 'expense'}>
							{trans.tipo === 'income' ? '+' : '-'}{formatMXN(trans.monto)}
						</span>
					</div>
				{/each}
			</div>
		{:else}
			<div class="empty-transactions">
				<p>No hay transacciones este mes</p>
				<a href="/dashboard/gastos" class="btn btn-primary">Registrar gasto</a>
			</div>
		{/if}
	</section>
</div>

<style>
	.reportes-page {
		padding: var(--mby-space-xl);
		max-width: 1100px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-xl);
		flex-wrap: wrap;
	}

	.header-info h1 {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-xs);
	}

	.header-info p {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-sm);
		margin: 0;
	}

	.month-nav {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		background: var(--mby-bg-elevated);
		padding: var(--mby-space-xs);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
	}

	.nav-btn {
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-lg);
		border: none;
		background: transparent;
		color: var(--mby-text-secondary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.nav-btn:hover {
		background: var(--mby-bg-base);
		color: var(--mby-text-primary);
	}

	.current-month {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: 0 var(--mby-space-md);
		font-weight: 500;
		color: var(--mby-text-primary);
		text-transform: capitalize;
	}

	/* Summary Grid */
	.summary-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-xl);
	}

	.summary-card {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--mby-space-sm);
	}

	.card-label {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
	}

	.card-icon {
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.summary-card.income .card-icon {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	.summary-card.expense .card-icon {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.summary-card.balance .card-icon {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.summary-card.balance.positive .card-icon {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	.summary-card.balance.negative .card-icon {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.card-value {
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
	}

	.summary-card.balance.positive .card-value {
		color: #22c55e;
	}

	.summary-card.balance.negative .card-value {
		color: #ef4444;
	}

	.card-meta {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.card-meta.warning {
		color: #eab308;
	}

	.card-meta.danger {
		color: #ef4444;
	}

	/* Content Grid */
	.content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-xl);
	}

	.chart-section, .categories-section {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
	}

	.chart-section h2, .categories-section h2, .recent-section h2 {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-lg);
	}

	/* Bar Chart */
	.bar-chart {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: 150px;
		padding-top: var(--mby-space-md);
	}

	.bar-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	.bar {
		width: 100%;
		max-width: 20px;
		background: linear-gradient(180deg, var(--mby-primary-500), var(--mby-primary-600));
		border-radius: var(--mby-radius-sm) var(--mby-radius-sm) 0 0;
		min-height: 4px;
		margin-top: auto;
		transition: height 0.3s ease;
	}

	.bar-label {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
		margin-top: var(--mby-space-xs);
	}

	.empty-chart, .empty-categories, .empty-transactions {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--mby-space-xl);
		color: var(--mby-text-tertiary);
		text-align: center;
	}

	/* Categories */
	.categories-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	.category-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.category-info {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		min-width: 120px;
	}

	.category-color {
		width: 12px;
		height: 12px;
		border-radius: var(--mby-radius-sm);
	}

	.category-name {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-primary);
	}

	.category-stats {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		flex: 1;
	}

	.category-amount {
		font-size: var(--mby-text-sm);
		font-weight: 600;
		color: var(--mby-text-primary);
		min-width: 80px;
		text-align: right;
	}

	.category-bar-container {
		flex: 1;
		height: 8px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
	}

	.category-bar {
		height: 100%;
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	.category-percent {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
		min-width: 35px;
		text-align: right;
	}

	/* Savings Grid */
	.savings-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-xl);
	}

	.savings-card {
		display: flex;
		gap: var(--mby-space-lg);
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
	}

	.savings-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--mby-radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.savings-icon.apartados {
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-500);
	}

	.savings-icon.metas {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.savings-info {
		flex: 1;
	}

	.savings-info h3 {
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-secondary);
		margin: 0 0 var(--mby-space-xs);
	}

	.savings-stats {
		display: flex;
		align-items: baseline;
		gap: var(--mby-space-xs);
		margin-bottom: var(--mby-space-sm);
	}

	.main-stat {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	.sub-stat {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.progress-bar {
		height: 6px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
		margin-bottom: var(--mby-space-xs);
	}

	.progress-fill {
		height: 100%;
		background: var(--mby-primary-500);
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	.progress-label {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.metas-badges {
		display: flex;
		gap: var(--mby-space-xs);
	}

	.badge {
		padding: 2px 8px;
		border-radius: var(--mby-radius-full);
		font-size: var(--mby-text-xs);
	}

	.badge.active {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.badge.completed {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	/* Recent Transactions */
	.recent-section {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
	}

	.transactions-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.transaction-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-sm);
		border-radius: var(--mby-radius-lg);
		transition: background 0.2s ease;
	}

	.transaction-item:hover {
		background: var(--mby-bg-base);
	}

	.trans-icon {
		width: 40px;
		height: 40px;
		border-radius: var(--mby-radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2rem;
	}

	.trans-icon.income {
		background: rgba(34, 197, 94, 0.1);
	}

	.trans-icon.expense {
		background: rgba(239, 68, 68, 0.1);
	}

	.trans-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.trans-desc {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-primary);
	}

	.trans-date {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.trans-amount {
		font-size: var(--mby-text-sm);
		font-weight: 600;
	}

	.trans-amount.income {
		color: #22c55e;
	}

	.trans-amount.expense {
		color: #ef4444;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm) var(--mby-space-lg);
		border-radius: var(--mby-radius-lg);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		text-decoration: none;
	}

	.btn-primary {
		background: var(--mby-primary-500);
		color: white;
	}

	.btn-primary:hover {
		background: var(--mby-primary-600);
	}

	/* Responsive */
	@media (max-width: 768px) {
		.reportes-page {
			padding: var(--mby-space-lg);
		}

		.page-header {
			flex-direction: column;
			align-items: stretch;
		}

		.month-nav {
			justify-content: center;
		}

		.content-grid {
			grid-template-columns: 1fr;
		}

		.category-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.category-stats {
			width: 100%;
		}
	}
</style>
