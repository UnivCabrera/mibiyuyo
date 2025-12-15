<!-- ═══════════════════════════════════════════════════════════════════════════════
     📁 APARTADOS — Página de gestión de apartados
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		Plus, 
		ArrowLeft,
		Wallet,
		Check,
		X,
		TrendingUp,
		Pencil
	} from 'lucide-svelte';
	import { fly, scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { invalidateAll } from '$app/navigation';

	interface Apartado {
		id: string;
		nombre: string;
		emoji: string;
		montoActual: number;
		montoObjetivo: number;
		porcentaje: number;
		diaVencimiento: number | null;
		frecuencia: string;
		color: string;
	}

	interface Props {
		data: {
			apartados: Apartado[];
			totales: {
				apartado: number;
				objetivo: number;
				porcentaje: number;
			};
		};
	}
	let { data }: Props = $props();

	// Estado del modal
	let showModal = $state(false);
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	// Datos del formulario
	let nombre = $state('');
	let montoObjetivo = $state('');
	let emojiSeleccionado = $state('📌');
	let diaVencimiento = $state('');
	let colorSeleccionado = $state('#f97316');

	// Emojis populares para apartados
	const emojis = ['🏠', '💡', '📶', '📱', '🚗', '💳', '🏥', '📚', '🎓', '✈️', '🎉', '📌'];

	// Colores disponibles
	const colores = [
		'#f97316', // Orange
		'#ef4444', // Red
		'#eab308', // Yellow
		'#22c55e', // Green
		'#3b82f6', // Blue
		'#8b5cf6', // Purple
		'#ec4899', // Pink
		'#06b6d4'  // Cyan
	];

	// Formato MXN
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Manejar envío del formulario
	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!nombre.trim()) {
			errorMessage = 'El nombre es requerido';
			return;
		}

		if (!montoObjetivo || Number.isNaN(Number(montoObjetivo)) || Number(montoObjetivo) <= 0) {
			errorMessage = 'Ingresa un monto válido';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/apartados', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nombre: nombre.trim(),
					montoObjetivo: Number(montoObjetivo),
					emoji: emojiSeleccionado,
					diaVencimiento: diaVencimiento ? Number(diaVencimiento) : null,
					color: colorSeleccionado
				})
			});

			if (!response.ok) {
				const res = await response.json();
				throw new Error(res.message || 'Error al crear el apartado');
			}

			// Limpiar formulario y cerrar modal
			nombre = '';
			montoObjetivo = '';
			emojiSeleccionado = '📌';
			diaVencimiento = '';
			colorSeleccionado = '#f97316';
			showModal = false;
			
			// Recargar datos
			await invalidateAll();
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Error desconocido';
		} finally {
			isSubmitting = false;
		}
	}

	// Manejar input de monto
	function handleMontoInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.value.replace(/[^0-9.]/g, '');
		montoObjetivo = value;
	}

	let mounted = $state(false);
	$effect(() => { mounted = true; });
</script>

<svelte:head>
	<title>Apartados | mibiyuyo</title>
</svelte:head>

<div class="apartados-page">
	{#if mounted}
	<!-- Header -->
	<div class="page-header" in:fly={{ y: -20, duration: 400, easing: quintOut }}>
		<div class="header-left">
			<a href="/dashboard" class="back-btn">
				<ArrowLeft size={20} />
			</a>
			<div>
				<h1>📁 Mis Apartados</h1>
				<p>Administra tus gastos fijos</p>
			</div>
		</div>
		<button class="btn btn-primary btn-shine" onclick={() => showModal = true}>
			<Plus size={20} />
			Nuevo apartado
		</button>
	</div>

	<!-- Resumen Total -->
	<div class="total-summary" in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}>
		<div class="summary-content">
			<div class="summary-icon">
				<Wallet size={32} />
			</div>
			<div class="summary-info">
				<span class="summary-label">Total apartado este mes</span>
				<span class="summary-value">{formatMXN(data.totales.apartado)}</span>
				<span class="summary-target">de {formatMXN(data.totales.objetivo)} objetivo</span>
			</div>
		</div>
		<div class="summary-progress">
			<div class="progress-bar-bg">
				<div 
					class="progress-bar-fill" 
					style="width: {Math.min(data.totales.porcentaje, 100)}%"
				></div>
			</div>
			<span class="progress-percent">{data.totales.porcentaje}%</span>
		</div>
	</div>

	<!-- Lista de apartados -->
	<div class="apartados-grid" in:fly={{ y: 20, duration: 400, delay: 200, easing: quintOut }}>
		{#if data.apartados.length === 0}
			<div class="empty-state">
				<Wallet size={48} strokeWidth={1.5} />
				<h3>No tienes apartados</h3>
				<p>Crea apartados para organizar tus gastos fijos mensuales</p>
				<button class="btn btn-primary" onclick={() => showModal = true}>
					<Plus size={18} />
					Crear primer apartado
				</button>
			</div>
		{:else}
			{#each data.apartados as apartado, i}
				<div 
					class="apartado-card" 
					style="--card-color: {apartado.color}"
					in:fly={{ y: 20, duration: 300, delay: i * 50 }}
				>
					<div class="apartado-header">
						<span class="apartado-emoji">{apartado.emoji}</span>
						<div class="apartado-meta">
							<span class="apartado-nombre">{apartado.nombre}</span>
							{#if apartado.diaVencimiento}
								<span class="apartado-vence">Vence día {apartado.diaVencimiento}</span>
							{/if}
						</div>
						<button class="edit-btn">
							<Pencil size={16} />
						</button>
					</div>

					<div class="apartado-amounts">
						<span class="amount-current">{formatMXN(apartado.montoActual)}</span>
						<span class="amount-separator">/</span>
						<span class="amount-target">{formatMXN(apartado.montoObjetivo)}</span>
					</div>

					<div class="apartado-progress">
						<div class="progress-track">
							<div 
								class="progress-fill" 
								style="width: {Math.min(apartado.porcentaje, 100)}%; background: {apartado.color}"
							></div>
						</div>
						<span class="progress-label">{apartado.porcentaje}%</span>
					</div>

					{#if apartado.porcentaje >= 100}
						<div class="apartado-complete">
							<Check size={14} />
							<span>Completado</span>
						</div>
					{:else}
						<button class="btn btn-outline btn-sm abonar-btn">
							<TrendingUp size={14} />
							Abonar
						</button>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
	{/if}
</div>

<!-- Modal de nuevo apartado -->
{#if showModal}
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="modal-overlay" role="presentation" transition:fade={{ duration: 200 }} onclick={() => showModal = false}>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-apartado-title" tabindex="-1" transition:scale={{ start: 0.95, duration: 300 }} onclick={(e) => e.stopPropagation()}>
		<div class="modal-header">
			<h2 id="modal-apartado-title">📁 Nuevo Apartado</h2>
			<button class="close-btn" onclick={() => showModal = false}>
				<X size={20} />
			</button>
		</div>

		<form onsubmit={handleSubmit}>
			<!-- Emoji selector -->
			<div class="form-group">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>Elige un ícono</label>
				<div class="emoji-grid">
					{#each emojis as emoji}
						<button 
							type="button"
							class="emoji-btn"
							class:selected={emojiSeleccionado === emoji}
							onclick={() => emojiSeleccionado = emoji}
						>
							{emoji}
						</button>
					{/each}
				</div>
			</div>

			<!-- Nombre -->
			<div class="form-group">
				<label for="nombre">Nombre del apartado</label>
				<input 
					type="text"
					id="nombre"
					placeholder="Ej: Renta, Luz, Internet..."
					bind:value={nombre}
					class="input"
				/>
			</div>

			<!-- Monto objetivo -->
			<div class="form-group">
				<label for="monto">Monto mensual</label>
				<div class="input-with-prefix">
					<span class="prefix">$</span>
					<input 
						type="text"
						id="monto"
						inputmode="decimal"
						placeholder="0"
						value={montoObjetivo}
						oninput={handleMontoInput}
						class="input"
					/>
				</div>
			</div>

			<!-- Día de vencimiento -->
			<div class="form-group">
				<label for="dia">Día de vencimiento (opcional)</label>
				<input 
					type="number"
					id="dia"
					min="1"
					max="31"
					placeholder="Ej: 15"
					bind:value={diaVencimiento}
					class="input"
				/>
			</div>

			<!-- Color -->
			<div class="form-group">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>Color</label>
				<div class="color-grid">
					{#each colores as color}
						<button 
							type="button"
							class="color-btn"
							class:selected={colorSeleccionado === color}
							style="background: {color}"
							onclick={() => colorSeleccionado = color}
						>
							{#if colorSeleccionado === color}
								<Check size={14} />
							{/if}
						</button>
					{/each}
				</div>
			</div>

			{#if errorMessage}
				<div class="error-message" transition:fade>
					{errorMessage}
				</div>
			{/if}

			<button type="submit" class="btn btn-primary btn-lg btn-block btn-shine" disabled={isSubmitting}>
				{#if isSubmitting}
					Creando...
				{:else}
					<Check size={20} />
					Crear apartado
				{/if}
			</button>
		</form>
	</div>
</div>
{/if}

<style>
	.apartados-page {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xl);
		max-width: 1000px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--mby-space-md);
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.back-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--mby-radius-full);
		background: var(--mby-bg-elevated);
		color: var(--mby-text-secondary);
		transition: all 0.2s ease;
	}

	.back-btn:hover {
		background: var(--mby-bg-hover);
		color: var(--mby-text-primary);
	}

	.page-header h1 {
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: 0;
	}

	.page-header p {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
		margin: 0;
	}

	/* Total Summary */
	.total-summary {
		background: linear-gradient(135deg, var(--mby-primary-600), var(--mby-gold-500));
		padding: var(--mby-space-xl);
		border-radius: var(--mby-radius-xl);
		color: white;
	}

	.summary-content {
		display: flex;
		align-items: center;
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-lg);
	}

	.summary-icon {
		width: 56px;
		height: 56px;
		border-radius: var(--mby-radius-lg);
		background: rgba(255, 255, 255, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.summary-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.summary-label {
		font-size: var(--mby-text-sm);
		opacity: 0.8;
	}

	.summary-value {
		font-size: var(--mby-text-2xl);
		font-weight: 700;
	}

	.summary-target {
		font-size: var(--mby-text-sm);
		opacity: 0.7;
	}

	.summary-progress {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.progress-bar-bg {
		flex: 1;
		height: 8px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
	}

	.progress-bar-fill {
		height: 100%;
		background: white;
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	.progress-percent {
		font-weight: 600;
		min-width: 45px;
		text-align: right;
	}

	/* Grid de apartados */
	.apartados-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--mby-space-lg);
	}

	.apartado-card {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
		padding: var(--mby-space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		transition: all 0.2s ease;
	}

	.apartado-card:hover {
		border-color: var(--card-color, var(--mby-primary-500));
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.apartado-header {
		display: flex;
		align-items: flex-start;
		gap: var(--mby-space-sm);
	}

	.apartado-emoji {
		font-size: 2rem;
	}

	.apartado-meta {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.apartado-nombre {
		font-weight: 600;
		color: var(--mby-text-primary);
	}

	.apartado-vence {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.edit-btn {
		width: 32px;
		height: 32px;
		border-radius: var(--mby-radius-md);
		background: transparent;
		border: none;
		color: var(--mby-text-tertiary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.edit-btn:hover {
		background: var(--mby-bg-hover);
		color: var(--mby-text-primary);
	}

	.apartado-amounts {
		display: flex;
		align-items: baseline;
		gap: var(--mby-space-xs);
	}

	.amount-current {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	.amount-separator {
		color: var(--mby-text-tertiary);
	}

	.amount-target {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-tertiary);
	}

	.apartado-progress {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.progress-track {
		flex: 1;
		height: 6px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	.progress-label {
		font-size: var(--mby-text-xs);
		font-weight: 600;
		color: var(--mby-text-secondary);
		min-width: 35px;
		text-align: right;
	}

	.apartado-complete {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		color: #22c55e;
		font-size: var(--mby-text-sm);
		font-weight: 500;
	}

	.abonar-btn {
		margin-top: auto;
	}

	/* Empty State */
	.empty-state {
		grid-column: 1 / -1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-3xl);
		text-align: center;
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
		color: var(--mby-text-tertiary);
	}

	.empty-state h3 {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0;
	}

	.empty-state p {
		font-size: var(--mby-text-sm);
		margin: 0;
		max-width: 300px;
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
		z-index: 100;
	}

	.modal {
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-2xl);
		width: 100%;
		max-width: 480px;
		max-height: 90vh;
		overflow-y: auto;
		border: 1px solid var(--mby-border-subtle);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--mby-space-lg);
		border-bottom: 1px solid var(--mby-border-subtle);
	}

	.modal-header h2 {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: 0;
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-full);
		background: transparent;
		color: var(--mby-text-tertiary);
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-btn:hover {
		background: var(--mby-bg-hover);
		color: var(--mby-text-primary);
	}

	form {
		padding: var(--mby-space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	label {
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-secondary);
	}

	.input {
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-border-default);
		background: var(--mby-bg-elevated);
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
		align-items: center;
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
		flex: 1;
	}

	/* Emoji Grid */
	.emoji-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
	}

	.emoji-btn {
		width: 44px;
		height: 44px;
		border-radius: var(--mby-radius-md);
		border: 2px solid var(--mby-border-subtle);
		background: var(--mby-bg-elevated);
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.emoji-btn:hover {
		border-color: var(--mby-primary-300);
	}

	.emoji-btn.selected {
		border-color: var(--mby-primary-500);
		background: rgba(249, 115, 22, 0.1);
	}

	/* Color Grid */
	.color-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-sm);
	}

	.color-btn {
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-full);
		border: 3px solid transparent;
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}

	.color-btn:hover {
		transform: scale(1.1);
	}

	.color-btn.selected {
		border-color: var(--mby-text-primary);
	}

	.error-message {
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-md);
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		font-size: var(--mby-text-sm);
	}

	.btn-block {
		width: 100%;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.apartados-grid {
			grid-template-columns: 1fr;
		}

		.summary-content {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
