<!-- ═══════════════════════════════════════════════════════════════════════════════
     💳 GASTOS — Página de registro y listado de gastos
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		Plus, 
		Search, 
		Filter,
		Calendar,
		ArrowLeft,
		Receipt,
		Coffee,
		Car,
		ShoppingBag,
		Utensils,
		Home,
		Smartphone,
		Sparkles,
		Check,
		X
	} from 'lucide-svelte';
	import { fly, scale, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto, invalidateAll } from '$app/navigation';

	interface Gasto {
		id: string;
		descripcion: string;
		monto: number;
		categoria: string;
		emoji: string;
		fecha: string;
	}

	interface Props {
		data: {
			gastos: Gasto[];
		};
	}
	let { data }: Props = $props();

	// Estado del modal
	let showModal = $state(false);
	let isSubmitting = $state(false);
	let errorMessage = $state('');

	// Datos del formulario
	let monto = $state('');
	let descripcion = $state('');
	let categoriaSeleccionada = $state('otros');

	// Categorías de gastos
	const categorias = [
		{ id: 'comida', emoji: '🍔', nombre: 'Comida', icon: Utensils },
		{ id: 'transporte', emoji: '🚗', nombre: 'Transporte', icon: Car },
		{ id: 'cafe', emoji: '☕', nombre: 'Café', icon: Coffee },
		{ id: 'compras', emoji: '🛍️', nombre: 'Compras', icon: ShoppingBag },
		{ id: 'casa', emoji: '🏠', nombre: 'Casa', icon: Home },
		{ id: 'entretenimiento', emoji: '🎮', nombre: 'Entretenimiento', icon: Sparkles },
		{ id: 'celular', emoji: '📱', nombre: 'Celular', icon: Smartphone },
		{ id: 'otros', emoji: '📦', nombre: 'Otros', icon: Receipt }
	];

	// Formato MXN
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Obtener emoji de categoría
	function getEmojiCategoria(catId: string): string {
		return categorias.find(c => c.id === catId)?.emoji || '📦';
	}

	// Manejar envío del formulario
	async function handleSubmit(e: Event) {
		e.preventDefault();
		
		if (!monto || Number.isNaN(Number(monto)) || Number(monto) <= 0) {
			errorMessage = 'Ingresa un monto válido';
			return;
		}

		isSubmitting = true;
		errorMessage = '';

		try {
			const response = await fetch('/api/transactions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					tipo: 'expense',
					monto: Number(monto),
					descripcion: descripcion || categorias.find(c => c.id === categoriaSeleccionada)?.nombre,
					categoria: categoriaSeleccionada,
					emoji: getEmojiCategoria(categoriaSeleccionada)
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message || 'Error al registrar el gasto');
			}

			// Limpiar formulario y cerrar modal
			monto = '';
			descripcion = '';
			categoriaSeleccionada = 'otros';
			showModal = false;
			
			// Recargar datos
			await invalidateAll();
		} catch (err) {
			errorMessage = err instanceof Error ? err.message : 'Error desconocido';
		} finally {
			isSubmitting = false;
		}
	}

	// Manejar cambio de monto (solo números)
	function handleMontoInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.value.replace(/[^0-9.]/g, '');
		monto = value;
	}

	let mounted = $state(false);
	$effect(() => { mounted = true; });
</script>

<svelte:head>
	<title>Gastos | mibiyuyo</title>
</svelte:head>

<div class="gastos-page">
	{#if mounted}
	<!-- Header -->
	<div class="page-header" in:fly={{ y: -20, duration: 400, easing: quintOut }}>
		<div class="header-left">
			<a href="/dashboard" class="back-btn">
				<ArrowLeft size={20} />
			</a>
			<div>
				<h1>💳 Mis Gastos</h1>
				<p>Registra y administra tus gastos</p>
			</div>
		</div>
		<button class="btn btn-primary btn-shine" onclick={() => showModal = true}>
			<Plus size={20} />
			Nuevo gasto
		</button>
	</div>

	<!-- Stats rápidos -->
	<div class="quick-stats" in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}>
		<div class="stat">
			<span class="stat-label">Este mes</span>
			<span class="stat-value">{formatMXN(data.gastos.reduce((sum, g) => sum + Math.abs(g.monto), 0))}</span>
		</div>
		<div class="stat">
			<span class="stat-label">Gastos registrados</span>
			<span class="stat-value">{data.gastos.length}</span>
		</div>
	</div>

	<!-- Lista de gastos -->
	<div class="gastos-list-container" in:fly={{ y: 20, duration: 400, delay: 200, easing: quintOut }}>
		{#if data.gastos.length === 0}
			<div class="empty-state">
				<Receipt size={48} strokeWidth={1.5} />
				<h3>No hay gastos registrados</h3>
				<p>Comienza registrando tu primer gasto</p>
				<button class="btn btn-primary" onclick={() => showModal = true}>
					<Plus size={18} />
					Registrar gasto
				</button>
			</div>
		{:else}
			<div class="gastos-list">
				{#each data.gastos as gasto, i}
					<div class="gasto-item" in:fly={{ y: 20, duration: 300, delay: i * 50 }}>
						<span class="gasto-emoji">{gasto.emoji}</span>
						<div class="gasto-info">
							<span class="gasto-descripcion">{gasto.descripcion}</span>
							<span class="gasto-fecha">{gasto.fecha}</span>
						</div>
						<span class="gasto-monto">{formatMXN(gasto.monto)}</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	{/if}
</div>

<!-- Modal de nuevo gasto -->
{#if showModal}
<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div class="modal-overlay" role="presentation" transition:fade={{ duration: 200 }} onclick={() => showModal = false}>
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1" transition:scale={{ start: 0.95, duration: 300 }} onclick={(e) => e.stopPropagation()}>
		<div class="modal-header">
			<h2 id="modal-title">💸 Nuevo Gasto</h2>
			<button class="close-btn" onclick={() => showModal = false}>
				<X size={20} />
			</button>
		</div>

		<form onsubmit={handleSubmit}>
			<!-- Monto -->
			<div class="form-group monto-group">
				<label for="monto">¿Cuánto gastaste?</label>
				<div class="monto-input-wrapper">
					<span class="currency-symbol">$</span>
					<input 
						type="text"
						id="monto"
						inputmode="decimal"
						placeholder="0"
						value={monto}
						oninput={handleMontoInput}
						class="monto-input"
					/>
				</div>
			</div>

			<!-- Categoría -->
			<div class="form-group">
				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>¿En qué categoría?</label>
				<div class="categorias-grid">
					{#each categorias as cat}
						<button 
							type="button"
							class="categoria-btn"
							class:selected={categoriaSeleccionada === cat.id}
							onclick={() => categoriaSeleccionada = cat.id}
						>
							<span class="cat-emoji">{cat.emoji}</span>
							<span class="cat-nombre">{cat.nombre}</span>
							{#if categoriaSeleccionada === cat.id}
								<span class="cat-check"><Check size={14} /></span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- Descripción -->
			<div class="form-group">
				<label for="descripcion">Descripción (opcional)</label>
				<input 
					type="text"
					id="descripcion"
					placeholder="Ej: Café en Starbucks"
					bind:value={descripcion}
					class="input"
				/>
			</div>

			{#if errorMessage}
				<div class="error-message" transition:fade>
					{errorMessage}
				</div>
			{/if}

			<button type="submit" class="btn btn-primary btn-lg btn-block btn-shine" disabled={isSubmitting}>
				{#if isSubmitting}
					Guardando...
				{:else}
					<Check size={20} />
					Guardar gasto
				{/if}
			</button>
		</form>
	</div>
</div>
{/if}

<style>
	.gastos-page {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xl);
		max-width: 800px;
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

	/* Quick Stats */
	.quick-stats {
		display: flex;
		gap: var(--mby-space-lg);
		background: var(--mby-bg-elevated);
		padding: var(--mby-space-lg);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.stat-label {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	/* Lista de gastos */
	.gastos-list-container {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
		overflow: hidden;
	}

	.gastos-list {
		display: flex;
		flex-direction: column;
	}

	.gasto-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg);
		border-bottom: 1px solid var(--mby-border-subtle);
		transition: background 0.2s ease;
	}

	.gasto-item:last-child {
		border-bottom: none;
	}

	.gasto-item:hover {
		background: var(--mby-bg-hover);
	}

	.gasto-emoji {
		font-size: 1.5rem;
	}

	.gasto-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.gasto-descripcion {
		font-weight: 500;
		color: var(--mby-text-primary);
	}

	.gasto-fecha {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.gasto-monto {
		font-weight: 600;
		color: #ef4444;
	}

	/* Empty State */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-3xl);
		text-align: center;
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

	/* Monto Input */
	.monto-group {
		background: linear-gradient(135deg, var(--mby-primary-500), var(--mby-gold-500));
		padding: var(--mby-space-xl);
		border-radius: var(--mby-radius-xl);
		margin: calc(var(--mby-space-lg) * -1);
		margin-bottom: 0;
	}

	.monto-group label {
		color: rgba(255, 255, 255, 0.8);
	}

	.monto-input-wrapper {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.currency-symbol {
		font-size: 2rem;
		font-weight: 700;
		color: white;
	}

	.monto-input {
		flex: 1;
		background: transparent;
		border: none;
		font-size: 3rem;
		font-weight: 700;
		color: white;
		padding: 0;
	}

	.monto-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.monto-input:focus {
		outline: none;
	}

	/* Categorías Grid */
	.categorias-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--mby-space-sm);
	}

	.categoria-btn {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-md) var(--mby-space-sm);
		border-radius: var(--mby-radius-lg);
		border: 2px solid var(--mby-border-subtle);
		background: var(--mby-bg-elevated);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.categoria-btn:hover {
		border-color: var(--mby-primary-300);
	}

	.categoria-btn.selected {
		border-color: var(--mby-primary-500);
		background: rgba(249, 115, 22, 0.1);
	}

	.cat-emoji {
		font-size: 1.5rem;
	}

	.cat-nombre {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-secondary);
	}

	.cat-check {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 18px;
		height: 18px;
		border-radius: var(--mby-radius-full);
		background: var(--mby-primary-500);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
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
		.categorias-grid {
			grid-template-columns: repeat(4, 1fr);
		}

		.cat-nombre {
			display: none;
		}

		.monto-input {
			font-size: 2.5rem;
		}
	}
</style>
