<!-- ═══════════════════════════════════════════════════════════════════════════════
     📊 DASHBOARD HOME — Página principal del Dashboard
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		TrendingUp, 
		TrendingDown, 
		Wallet, 
		PiggyBank,
		ArrowRight,
		Plus,
		Calendar,
		AlertTriangle,
		CheckCircle,
		Inbox
	} from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	// Tipos de los datos
	interface Apartado {
		id: string;
		name: string;
		emoji: string;
		current: number;
		target: number;
		color: string;
		dueDate: number | null;
	}

	interface GastoReciente {
		id: string;
		description: string;
		amount: number;
		emoji: string;
		date: string;
	}

	interface DashboardData {
		biyuyoHoy: number;
		totalIngresos: number;
		totalGastos: number;
		totalApartados: number;
		apartados: Apartado[];
		gastosRecientes: GastoReciente[];
	}

	// Data prop desde el layout y page.server
	interface Props {
		data: {
			user?: {
				name?: string;
			};
			dashboardData: DashboardData | null;
		};
	}
	let { data }: Props = $props();
	
	// Datos reactivos derivados de data.dashboardData
	const biyuyoHoy = $derived(data.dashboardData?.biyuyoHoy ?? 0);
	const totalIngresos = $derived(data.dashboardData?.totalIngresos ?? 0);
	const totalGastos = $derived(data.dashboardData?.totalGastos ?? 0);
	const totalApartados = $derived(data.dashboardData?.totalApartados ?? 0);
	const apartados = $derived(data.dashboardData?.apartados ?? []);
	const gastosRecientes = $derived(data.dashboardData?.gastosRecientes ?? []);

	// Verificar si hay datos
	const tienesDatos = $derived(
		apartados.length > 0 || gastosRecientes.length > 0 || totalIngresos > 0
	);

	// Formato MXN
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Alertas demo (TODO: conectar con BD)
	const alertas = [
		{ type: 'warning', message: 'La luz vence en 5 días', icon: AlertTriangle },
		{ type: 'success', message: 'Meta de ahorro al 75%', icon: CheckCircle }
	];

	let mounted = $state(false);
	$effect(() => { mounted = true; });
</script>

<svelte:head>
	<title>Dashboard | mibiyuyo</title>
</svelte:head>

<div class="dashboard-home">
	{#if mounted}
	<!-- Greeting -->
	<div class="greeting" in:fly={{ y: -20, duration: 500, easing: quintOut }}>
		<h1>Buenos días, {data.user?.name?.split(' ')[0] || 'Usuario'} 👋</h1>
		<p>Aquí está tu resumen financiero de hoy</p>
	</div>

	<!-- Main Card: Biyuyo Disponible -->
	<div class="biyuyo-card" in:scale={{ start: 0.95, duration: 600, easing: quintOut, delay: 100 }}>
		<div class="biyuyo-content">
			<span class="biyuyo-label">Tu biyuyo disponible hoy</span>
			<div class="biyuyo-amount text-gradient-animated">
				{formatMXN(biyuyoHoy)}
			</div>
			<span class="biyuyo-sublabel">
				<CheckCircle size={14} />
				Ya apartamos tus gastos fijos
			</span>
		</div>
		<button class="btn btn-primary btn-lg btn-shine">
			<Plus size={20} />
			Registrar gasto
		</button>
	</div>

	<!-- Stats Grid -->
	<div class="stats-grid" in:fly={{ y: 20, duration: 500, easing: quintOut, delay: 200 }}>
		<div class="stat-card">
			<div class="stat-icon income">
				<TrendingUp size={24} />
			</div>
			<div class="stat-info">
				<span class="stat-label">Ingresos del mes</span>
				<span class="stat-value">{formatMXN(totalIngresos)}</span>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon expense">
				<TrendingDown size={24} />
			</div>
			<div class="stat-info">
				<span class="stat-label">Gastos del mes</span>
				<span class="stat-value">{formatMXN(totalGastos)}</span>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon apartados">
				<Wallet size={24} />
			</div>
			<div class="stat-info">
				<span class="stat-label">Total apartado</span>
				<span class="stat-value">{formatMXN(totalApartados)}</span>
			</div>
		</div>
		<div class="stat-card">
			<div class="stat-icon savings">
				<PiggyBank size={24} />
			</div>
			<div class="stat-info">
				<span class="stat-label">Ahorro del mes</span>
				<span class="stat-value">{formatMXN(totalIngresos - totalGastos - totalApartados)}</span>
			</div>
		</div>
	</div>

	<!-- Two Column Layout -->
	<div class="two-columns" in:fly={{ y: 20, duration: 500, easing: quintOut, delay: 300 }}>
		<!-- Apartados -->
		<div class="panel">
			<div class="panel-header">
				<h3>📁 Apartados del mes</h3>
				<a href="/dashboard/apartados" class="link-see-all">
					Ver todos <ArrowRight size={14} />
				</a>
			</div>
			<div class="apartados-list">
				{#if apartados.length === 0}
					<div class="empty-state">
						<Inbox size={40} strokeWidth={1.5} />
						<p>No tienes apartados configurados</p>
						<a href="/dashboard/apartados/nuevo" class="btn btn-outline btn-sm">
							<Plus size={16} />
							Crear apartado
						</a>
					</div>
				{:else}
					{#each apartados as apartado}
						<div class="apartado-item">
							<div class="apartado-info">
								<span class="apartado-emoji">{apartado.emoji}</span>
								<div class="apartado-details">
									<span class="apartado-name">{apartado.name}</span>
									<span class="apartado-progress-text">
										{formatMXN(apartado.current)} / {formatMXN(apartado.target)}
									</span>
								</div>
							</div>
							<div class="apartado-progress">
								<div 
									class="progress-bar" 
									style="width: {Math.min((apartado.current / apartado.target) * 100, 100)}%; background: {apartado.color}"
								></div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Gastos Recientes -->
		<div class="panel">
			<div class="panel-header">
				<h3>💳 Gastos recientes</h3>
				<a href="/dashboard/gastos" class="link-see-all">
					Ver todos <ArrowRight size={14} />
				</a>
			</div>
			<div class="gastos-list">
				{#if gastosRecientes.length === 0}
					<div class="empty-state">
						<Inbox size={40} strokeWidth={1.5} />
						<p>No hay gastos registrados</p>
						<button class="btn btn-outline btn-sm" onclick={() => {}}>
							<Plus size={16} />
							Registrar gasto
						</button>
					</div>
				{:else}
					{#each gastosRecientes as gasto}
						<div class="gasto-item">
							<span class="gasto-emoji">{gasto.emoji}</span>
							<div class="gasto-details">
								<span class="gasto-description">{gasto.description}</span>
								<span class="gasto-date">{gasto.date}</span>
							</div>
							<span class="gasto-amount">{formatMXN(gasto.amount)}</span>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<!-- Alerts -->
	{#if alertas.length > 0}
	<div class="alerts-section" in:fly={{ y: 20, duration: 500, easing: quintOut, delay: 400 }}>
		<h3>🔔 Alertas</h3>
		<div class="alerts-list">
			{#each alertas as alerta}
				<div class="alert-item {alerta.type}">
					<alerta.icon size={18} />
					<span>{alerta.message}</span>
				</div>
			{/each}
		</div>
	</div>
	{/if}
	{/if}
</div>

<style>
	.dashboard-home {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xl);
	}

	/* Greeting */
	.greeting h1 {
		font-size: var(--mby-text-3xl, 2rem);
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
	}

	.greeting p {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-base, 1.0625rem);
	}

	/* Biyuyo Card */
	.biyuyo-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--mby-space-2xl);
		background: var(--mby-gradient-hero);
		border-radius: var(--mby-radius-xl);
		color: white;
	}

	.biyuyo-content {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.biyuyo-label {
		font-size: var(--mby-text-sm, 0.9375rem);
		opacity: 0.8;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.biyuyo-amount {
		font-family: var(--mby-font-display);
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 800;
		line-height: 1;
	}

	.biyuyo-sublabel {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-gold-400);
	}

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--mby-space-md);
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-surface-3);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--mby-radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stat-icon.income { background: rgba(249, 115, 22, 0.1); color: var(--mby-primary-600); }
	.stat-icon.expense { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
	.stat-icon.apartados { background: rgba(59, 130, 246, 0.1); color: var(--mby-blue-600); }
	.stat-icon.savings { background: rgba(249, 115, 22, 0.1); color: var(--mby-orange-600); }

	.stat-info {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.stat-label {
		font-size: var(--mby-text-xs, 0.8125rem);
		color: var(--mby-text-muted);
	}

	.stat-value {
		font-size: var(--mby-text-xl, 1.375rem);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	/* Two Columns */
	.two-columns {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-lg);
	}

	/* Panel */
	.panel {
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-surface-3);
		padding: var(--mby-space-lg);
	}

	.panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: var(--mby-space-lg);
	}

	.panel-header h3 {
		font-size: var(--mby-text-lg, 1.1875rem);
		font-weight: 600;
		color: var(--mby-text-primary);
	}

	.link-see-all {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-primary-600);
		text-decoration: none;
	}

	.link-see-all:hover {
		text-decoration: underline;
	}

	/* Apartados List */
	.apartados-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	.apartado-item {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.apartado-info {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.apartado-emoji {
		font-size: 1.5rem;
	}

	.apartado-details {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.apartado-name {
		font-weight: 500;
		color: var(--mby-text-primary);
	}

	.apartado-progress-text {
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-text-muted);
	}

	.apartado-progress {
		height: 6px;
		background: var(--mby-surface-2);
		border-radius: 3px;
		overflow: hidden;
	}

	.progress-bar {
		height: 100%;
		border-radius: 3px;
		transition: width 0.5s ease;
	}

	/* Gastos List */
	.gastos-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.gasto-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-sm) 0;
		border-bottom: 1px solid var(--mby-surface-2);
	}

	.gasto-item:last-child {
		border-bottom: none;
	}

	.gasto-emoji {
		font-size: 1.25rem;
	}

	.gasto-details {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.gasto-description {
		font-weight: 500;
		color: var(--mby-text-primary);
	}

	.gasto-date {
		font-size: var(--mby-text-xs, 0.8125rem);
		color: var(--mby-text-muted);
	}

	.gasto-amount {
		font-weight: 600;
		color: #ef4444;
	}

	/* Alerts */
	.alerts-section h3 {
		font-size: var(--mby-text-lg, 1.1875rem);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-md);
	}

	.alerts-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.alert-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-md);
		font-size: var(--mby-text-sm, 0.9375rem);
	}

	.alert-item.warning {
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-orange-600);
	}

	.alert-item.success {
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-600);
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-2xl) var(--mby-space-lg);
		text-align: center;
		color: var(--mby-text-tertiary);
	}

	.empty-state p {
		font-size: var(--mby-text-sm);
		margin: 0;
	}

	.empty-state .btn {
		margin-top: var(--mby-space-sm);
	}

	/* Responsive */
	@media (max-width: 1200px) {
		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 768px) {
		.stats-grid {
			grid-template-columns: 1fr;
		}

		.two-columns {
			grid-template-columns: 1fr;
		}

		.biyuyo-card {
			flex-direction: column;
			text-align: center;
			gap: var(--mby-space-xl);
		}
	}
</style>
