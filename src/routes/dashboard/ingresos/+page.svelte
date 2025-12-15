<!-- ═══════════════════════════════════════════════════════════════════════════════
     💰 INGRESOS — Gestión de fuentes de ingreso
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		Wallet,
		Plus,
		Pencil,
		Trash2,
		Calendar,
		Clock,
		DollarSign,
		RefreshCw,
		X,
		Check
	} from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	interface Props {
		data: {
			ingresos: IncomeSource[];
		};
	}
	let { data }: Props = $props();

	interface IncomeSource {
		id: string;
		name: string;
		amount: number;
		frequency: string;
		dayOfMonth: number | null;
		nextPayDate: string | null;
		isActive: boolean;
		createdAt: string;
	}

	// Estado - usar $derived para mantener sincronización con props
	let localIngresos = $state<IncomeSource[]>([]);
	let ingresos = $derived(localIngresos.length > 0 ? localIngresos : data.ingresos || []);
	let showModal = $state(false);
	let editingId = $state<string | null>(null);
	let isSubmitting = $state(false);

	// Inicializar ingresos locales
	$effect(() => {
		if (data.ingresos && localIngresos.length === 0) {
			localIngresos = [...data.ingresos];
		}
	});

	// Formulario
	let formData = $state({
		nombre: '',
		monto: '',
		frecuencia: 'quincenal',
		diaPago: '15'
	});

	// Frecuencias con sus labels
	const frecuencias = [
		{ value: 'weekly', label: 'Semanal', plural: 'semana' },
		{ value: 'biweekly', label: 'Quincenal', plural: 'quincena' },
		{ value: 'monthly', label: 'Mensual', plural: 'mes' }
	];

	// Mapeo para nombres de frecuencias
	const frecuenciaLabels: Record<string, string> = {
		'weekly': 'Semanal',
		'biweekly': 'Quincenal',
		'monthly': 'Mensual',
		'semanal': 'Semanal',
		'quincenal': 'Quincenal',
		'mensual': 'Mensual'
	};

	// Calcular total de ingresos mensuales
	const totalMensual = $derived(
		ingresos
			.filter(i => i.isActive)
			.reduce((sum, i) => {
				let multiplicador = 1;
				if (i.frequency === 'weekly' || i.frequency === 'semanal') multiplicador = 4;
				if (i.frequency === 'biweekly' || i.frequency === 'quincenal') multiplicador = 2;
				return sum + (i.amount * multiplicador);
			}, 0)
	);

	// Formatear moneda
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Formatear fecha
	function formatDate(dateStr: string | null): string {
		if (!dateStr) return 'No configurada';
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'short'
		});
	}

	// Abrir modal para nuevo ingreso
	function openModal() {
		editingId = null;
		formData = {
			nombre: '',
			monto: '',
			frecuencia: 'quincenal',
			diaPago: '15'
		};
		showModal = true;
	}

	// Abrir modal para editar
	function editIngreso(ingreso: IncomeSource) {
		editingId = ingreso.id;
		formData = {
			nombre: ingreso.name,
			monto: String(ingreso.amount),
			frecuencia: ingreso.frequency === 'biweekly' ? 'quincenal' : 
			            ingreso.frequency === 'weekly' ? 'semanal' : 
			            ingreso.frequency === 'monthly' ? 'mensual' : ingreso.frequency,
			diaPago: String(ingreso.dayOfMonth || 15)
		};
		showModal = true;
	}

	// Cerrar modal
	function closeModal() {
		showModal = false;
		editingId = null;
	}

	// Guardar ingreso
	async function handleSubmit() {
		if (!formData.nombre || !formData.monto) return;

		isSubmitting = true;

		try {
			const endpoint = editingId 
				? `/api/income-sources/${editingId}` 
				: '/api/income-sources';

			const res = await fetch(endpoint, {
				method: editingId ? 'PUT' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nombre: formData.nombre,
					monto: Number(formData.monto),
					frecuencia: formData.frecuencia,
					diaPago: Number(formData.diaPago)
				})
			});

			const result = await res.json();

			if (res.ok && result.data) {
				if (editingId) {
					// Actualizar existente
					localIngresos = localIngresos.map(i => 
						i.id === editingId ? result.data : i
					);
				} else {
					// Agregar nuevo
					localIngresos = [result.data, ...localIngresos];
				}
				closeModal();
			}
		} catch (err) {
			console.error('Error al guardar:', err);
		} finally {
			isSubmitting = false;
		}
	}

	// Eliminar ingreso
	async function deleteIngreso(id: string) {
		if (!confirm('¿Eliminar esta fuente de ingreso?')) return;

		try {
			const res = await fetch(`/api/income-sources/${id}`, {
				method: 'DELETE'
			});

			if (res.ok) {
				localIngresos = localIngresos.filter(i => i.id !== id);
			}
		} catch (err) {
			console.error('Error al eliminar:', err);
		}
	}
</script>

<svelte:head>
	<title>Mis Ingresos | mibiyuyo</title>
</svelte:head>

<div class="ingresos-page">
	<!-- Header -->
	<header class="page-header">
		<div class="header-info">
			<h1>
				<Wallet size={28} />
				Mis Ingresos
			</h1>
			<p>Configura tus fuentes de ingreso para calcular tu biyuyo disponible</p>
		</div>
		<button class="btn btn-primary" onclick={openModal}>
			<Plus size={18} />
			<span>Nuevo ingreso</span>
		</button>
	</header>

	<!-- Resumen -->
	<div class="summary-card" in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}>
		<div class="summary-icon">
			<DollarSign size={24} />
		</div>
		<div class="summary-content">
			<span class="summary-label">Ingreso mensual total</span>
			<span class="summary-value">{formatMXN(totalMensual)}</span>
		</div>
	</div>

	<!-- Lista de ingresos -->
	<div class="ingresos-list">
		{#if ingresos.length === 0}
			<div class="empty-state" in:fade={{ duration: 300 }}>
				<div class="empty-icon">
					<Wallet size={48} />
				</div>
				<h3>Sin fuentes de ingreso</h3>
				<p>Agrega tu nómina, freelance u otras fuentes de ingreso.</p>
				<button class="btn btn-primary" onclick={openModal}>
					<Plus size={18} />
					Agregar primer ingreso
				</button>
			</div>
		{:else}
			{#each ingresos as ingreso, i (ingreso.id)}
				<div 
					class="ingreso-card"
					class:inactive={!ingreso.isActive}
					in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
				>
					<div class="ingreso-main">
						<div class="ingreso-icon">
							<Wallet size={20} />
						</div>
						<div class="ingreso-info">
							<h3>{ingreso.name}</h3>
							<div class="ingreso-meta">
								<span class="badge">
									<RefreshCw size={12} />
									{frecuenciaLabels[ingreso.frequency] || ingreso.frequency}
								</span>
								{#if ingreso.dayOfMonth}
									<span class="badge">
										<Calendar size={12} />
										Día {ingreso.dayOfMonth}
									</span>
								{/if}
								{#if ingreso.nextPayDate}
									<span class="badge highlight">
										<Clock size={12} />
										Próximo: {formatDate(ingreso.nextPayDate)}
									</span>
								{/if}
							</div>
						</div>
					</div>

					<div class="ingreso-amount">
						<span class="amount">{formatMXN(ingreso.amount)}</span>
						<span class="frequency">/{frecuenciaLabels[ingreso.frequency]?.toLowerCase().replace('al', '') || 'mes'}</span>
					</div>

					<div class="ingreso-actions">
						<button class="action-btn" title="Editar" onclick={() => editIngreso(ingreso)}>
							<Pencil size={16} />
						</button>
						<button class="action-btn danger" title="Eliminar" onclick={() => deleteIngreso(ingreso.id)}>
							<Trash2 size={16} />
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions a11y_click_events_have_key_events -->
	<div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" transition:fade={{ duration: 200 }} onclick={closeModal} onkeydown={(e) => e.key === 'Escape' && closeModal()}>
		<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
		<div 
			class="modal"
			onclick={(e) => e.stopPropagation()}
			in:fly={{ y: 50, duration: 300, easing: quintOut }}
		>
			<header class="modal-header">
				<h2>{editingId ? 'Editar ingreso' : 'Nuevo ingreso'}</h2>
				<button class="close-btn" onclick={closeModal}>
					<X size={20} />
				</button>
			</header>

			<form class="modal-body" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
				<div class="form-group">
					<label for="nombre">Nombre</label>
					<input 
						type="text"
						id="nombre"
						placeholder="Ej: Nómina, Freelance..."
						bind:value={formData.nombre}
						class="input"
						required
					/>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="monto">Monto</label>
						<div class="input-with-prefix">
							<span class="prefix">$</span>
							<input 
								type="text"
								id="monto"
								inputmode="decimal"
								placeholder="15000"
								bind:value={formData.monto}
								class="input"
								required
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="frecuencia">Frecuencia</label>
						<select id="frecuencia" bind:value={formData.frecuencia} class="input">
							<option value="semanal">Semanal</option>
							<option value="quincenal">Quincenal</option>
							<option value="mensual">Mensual</option>
						</select>
					</div>
				</div>

				<div class="form-group">
					<label for="diaPago">Día de pago</label>
					<input 
						type="number"
						id="diaPago"
						min="1"
						max="31"
						placeholder="15"
						bind:value={formData.diaPago}
						class="input"
					/>
					<span class="hint">El día del mes que recibes este ingreso</span>
				</div>

				<div class="modal-actions">
					<button type="button" class="btn btn-outline" onclick={closeModal}>
						Cancelar
					</button>
					<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
						{#if isSubmitting}
							Guardando...
						{:else}
							<Check size={18} />
							{editingId ? 'Actualizar' : 'Crear ingreso'}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.ingresos-page {
		padding: var(--mby-space-xl);
		max-width: 900px;
		margin: 0 auto;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-xl);
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

	/* Summary Card */
	.summary-card {
		display: flex;
		align-items: center;
		gap: var(--mby-space-lg);
		padding: var(--mby-space-lg);
		background: linear-gradient(135deg, var(--mby-primary-500), var(--mby-gold-500));
		border-radius: var(--mby-radius-xl);
		margin-bottom: var(--mby-space-xl);
	}

	.summary-icon {
		width: 56px;
		height: 56px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: var(--mby-radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.summary-content {
		display: flex;
		flex-direction: column;
	}

	.summary-label {
		font-size: var(--mby-text-sm);
		color: rgba(255, 255, 255, 0.8);
	}

	.summary-value {
		font-size: var(--mby-text-3xl);
		font-weight: 700;
		color: white;
	}

	/* Lista */
	.ingresos-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	.ingreso-card {
		display: flex;
		align-items: center;
		gap: var(--mby-space-lg);
		padding: var(--mby-space-lg);
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
		transition: all 0.2s ease;
	}

	.ingreso-card:hover {
		border-color: var(--mby-border-default);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.ingreso-card.inactive {
		opacity: 0.6;
	}

	.ingreso-icon {
		width: 48px;
		height: 48px;
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-500);
		border-radius: var(--mby-radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.ingreso-main {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		flex: 1;
		min-width: 0;
	}

	.ingreso-info h3 {
		font-size: var(--mby-text-base);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-xs);
	}

	.ingreso-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
	}

	.badge {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		font-size: var(--mby-text-xs);
		color: var(--mby-text-secondary);
	}

	.badge.highlight {
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-600);
	}

	.ingreso-amount {
		text-align: right;
		flex-shrink: 0;
	}

	.ingreso-amount .amount {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	.ingreso-amount .frequency {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-tertiary);
	}

	.ingreso-actions {
		display: flex;
		gap: var(--mby-space-xs);
		flex-shrink: 0;
	}

	.action-btn {
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-md);
		border: none;
		background: transparent;
		color: var(--mby-text-tertiary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.action-btn:hover {
		background: var(--mby-bg-base);
		color: var(--mby-text-primary);
	}

	.action-btn.danger:hover {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	/* Empty State */
	.empty-state {
		text-align: center;
		padding: var(--mby-space-3xl);
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 2px dashed var(--mby-border-subtle);
	}

	.empty-icon {
		width: 80px;
		height: 80px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mby-text-tertiary);
		margin: 0 auto var(--mby-space-lg);
	}

	.empty-state h3 {
		font-size: var(--mby-text-lg);
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-sm);
	}

	.empty-state p {
		color: var(--mby-text-secondary);
		margin: 0 0 var(--mby-space-lg);
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--mby-space-lg);
		z-index: 1000;
	}

	.modal {
		width: 100%;
		max-width: 480px;
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-2xl);
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--mby-space-lg);
		border-bottom: 1px solid var(--mby-border-subtle);
	}

	.modal-header h2 {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0;
	}

	.close-btn {
		width: 32px;
		height: 32px;
		border-radius: var(--mby-radius-md);
		border: none;
		background: transparent;
		color: var(--mby-text-tertiary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: var(--mby-bg-base);
		color: var(--mby-text-primary);
	}

	.modal-body {
		padding: var(--mby-space-lg);
	}

	.form-group {
		margin-bottom: var(--mby-space-md);
	}

	.form-group label {
		display: block;
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-secondary);
		margin-bottom: var(--mby-space-xs);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-md);
	}

	.input {
		width: 100%;
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-border-default);
		background: var(--mby-bg-base);
		color: var(--mby-text-primary);
		font-size: var(--mby-text-base);
		transition: all 0.2s ease;
	}

	.input:focus {
		outline: none;
		border-color: var(--mby-primary-500);
		box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
	}

	.input-with-prefix {
		display: flex;
	}

	.prefix {
		padding: var(--mby-space-md);
		background: var(--mby-bg-elevated);
		border: 1px solid var(--mby-border-default);
		border-right: none;
		border-radius: var(--mby-radius-lg) 0 0 var(--mby-radius-lg);
		color: var(--mby-text-tertiary);
	}

	.input-with-prefix .input {
		border-radius: 0 var(--mby-radius-lg) var(--mby-radius-lg) 0;
	}

	.hint {
		display: block;
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
		margin-top: var(--mby-space-xs);
	}

	.modal-actions {
		display: flex;
		gap: var(--mby-space-sm);
		justify-content: flex-end;
		padding-top: var(--mby-space-md);
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
	}

	.btn-primary {
		background: var(--mby-primary-500);
		color: white;
	}

	.btn-primary:hover {
		background: var(--mby-primary-600);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-outline {
		background: transparent;
		border: 1px solid var(--mby-border-default);
		color: var(--mby-text-secondary);
	}

	.btn-outline:hover {
		background: var(--mby-bg-base);
		border-color: var(--mby-border-strong);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.ingresos-page {
			padding: var(--mby-space-lg);
		}

		.page-header {
			flex-direction: column;
		}

		.ingreso-card {
			flex-wrap: wrap;
		}

		.ingreso-main {
			width: 100%;
		}

		.ingreso-amount {
			flex: 1;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
