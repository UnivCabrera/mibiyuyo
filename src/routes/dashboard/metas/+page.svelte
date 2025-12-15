<!-- ═══════════════════════════════════════════════════════════════════════════════
     🎯 METAS — Objetivos de ahorro
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		Target,
		Plus,
		Pencil,
		Trash2,
		Calendar,
		TrendingUp,
		X,
		Check,
		Sparkles,
		Trophy
	} from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';

	interface Props {
		data: {
			metas: SavingsGoal[];
		};
	}
	let { data }: Props = $props();

	interface SavingsGoal {
		id: string;
		name: string;
		emoji: string;
		targetAmount: number;
		currentAmount: number;
		deadline: string | null;
		color: string;
		isCompleted: boolean;
		createdAt: string;
	}

	// Estado - usar estado local para sincronización
	let localMetas = $state<SavingsGoal[]>([]);
	let metas = $derived(localMetas.length > 0 ? localMetas : data.metas || []);
	let showModal = $state(false);
	let editingId = $state<string | null>(null);
	let isSubmitting = $state(false);
	let showAbonarModal = $state(false);
	let abonarMetaId = $state<string | null>(null);
	let montoAbonar = $state('');

	// Inicializar metas locales
	$effect(() => {
		if (data.metas && localMetas.length === 0) {
			localMetas = [...data.metas];
		}
	});

	// Formulario
	let formData = $state({
		nombre: '',
		emoji: '🎯',
		montoObjetivo: '',
		montoActual: '0',
		deadline: '',
		color: '#3b82f6'
	});

	// Emojis populares para metas
	const emojisPopulares = ['🎯', '🏠', '✈️', '🚗', '💻', '📱', '🎓', '💍', '🏖️', '💰', '🎁', '🎉'];
	
	// Colores para metas
	const coloresDisponibles = [
		'#3b82f6', '#8b5cf6', '#ec4899', '#f97316', 
		'#22c55e', '#06b6d4', '#eab308', '#ef4444'
	];

	// Totales derivados
	const totalAhorrado = $derived(
		metas.reduce((sum, m) => sum + m.currentAmount, 0)
	);
	
	const totalObjetivo = $derived(
		metas.filter(m => !m.isCompleted).reduce((sum, m) => sum + m.targetAmount, 0)
	);

	const metasCompletadas = $derived(
		metas.filter(m => m.isCompleted).length
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
		if (!dateStr) return '';
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}

	// Calcular porcentaje
	function getPercentage(current: number, target: number): number {
		return Math.min(100, Math.round((current / target) * 100));
	}

	// Calcular días restantes
	function getDaysRemaining(deadline: string | null): string | null {
		if (!deadline) return null;
		const today = new Date();
		const deadlineDate = new Date(deadline);
		const diff = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
		
		if (diff < 0) return 'Vencida';
		if (diff === 0) return 'Hoy';
		if (diff === 1) return '1 día';
		return `${diff} días`;
	}

	// Abrir modal nuevo
	function openModal() {
		editingId = null;
		formData = {
			nombre: '',
			emoji: '🎯',
			montoObjetivo: '',
			montoActual: '0',
			deadline: '',
			color: '#3b82f6'
		};
		showModal = true;
	}

	// Editar meta
	function editMeta(meta: SavingsGoal) {
		editingId = meta.id;
		formData = {
			nombre: meta.name,
			emoji: meta.emoji,
			montoObjetivo: String(meta.targetAmount),
			montoActual: String(meta.currentAmount),
			deadline: meta.deadline ? meta.deadline.split('T')[0] : '',
			color: meta.color
		};
		showModal = true;
	}

	// Cerrar modal
	function closeModal() {
		showModal = false;
		editingId = null;
	}

	// Guardar meta
	async function handleSubmit() {
		if (!formData.nombre || !formData.montoObjetivo) return;

		isSubmitting = true;

		try {
			const endpoint = editingId 
				? `/api/savings-goals/${editingId}` 
				: '/api/savings-goals';

			const res = await fetch(endpoint, {
				method: editingId ? 'PUT' : 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					nombre: formData.nombre,
					emoji: formData.emoji,
					montoObjetivo: Number(formData.montoObjetivo),
					montoActual: Number(formData.montoActual),
					deadline: formData.deadline || null,
					color: formData.color
				})
			});

			const result = await res.json();

			if (res.ok && result.data) {
				if (editingId) {
					localMetas = localMetas.map(m => m.id === editingId ? result.data : m);
				} else {
					localMetas = [result.data, ...localMetas];
				}
				closeModal();
			}
		} catch (err) {
			console.error('Error al guardar:', err);
		} finally {
			isSubmitting = false;
		}
	}

	// Abrir modal de abonar
	function openAbonarModal(id: string) {
		abonarMetaId = id;
		montoAbonar = '';
		showAbonarModal = true;
	}

	// Abonar a meta
	async function handleAbonar() {
		if (!abonarMetaId || !montoAbonar) return;

		const meta = metas.find(m => m.id === abonarMetaId);
		if (!meta) return;

		isSubmitting = true;

		try {
			const nuevoMonto = meta.currentAmount + Number(montoAbonar);
			const isCompleted = nuevoMonto >= meta.targetAmount;

			const res = await fetch(`/api/savings-goals/${abonarMetaId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					montoActual: nuevoMonto,
					isCompleted
				})
			});

			const result = await res.json();

			if (res.ok && result.data) {
				localMetas = localMetas.map(m => m.id === abonarMetaId ? result.data : m);
				showAbonarModal = false;
				abonarMetaId = null;
			}
		} catch (err) {
			console.error('Error al abonar:', err);
		} finally {
			isSubmitting = false;
		}
	}

	// Eliminar meta
	async function deleteMeta(id: string) {
		if (!confirm('¿Eliminar esta meta de ahorro?')) return;

		try {
			const res = await fetch(`/api/savings-goals/${id}`, {
				method: 'DELETE'
			});

			if (res.ok) {
				localMetas = localMetas.filter(m => m.id !== id);
			}
		} catch (err) {
			console.error('Error al eliminar:', err);
		}
	}
</script>

<svelte:head>
	<title>Mis Metas | mibiyuyo</title>
</svelte:head>

<div class="metas-page">
	<!-- Header -->
	<header class="page-header">
		<div class="header-info">
			<h1>
				<Target size={28} />
				Mis Metas
			</h1>
			<p>Define y rastrea tus objetivos de ahorro</p>
		</div>
		<button class="btn btn-primary" onclick={openModal}>
			<Plus size={18} />
			<span>Nueva meta</span>
		</button>
	</header>

	<!-- Stats Cards -->
	<div class="stats-grid" in:fly={{ y: 20, duration: 400, delay: 100, easing: quintOut }}>
		<div class="stat-card">
			<div class="stat-icon" style="background: rgba(34, 197, 94, 0.1); color: #22c55e;">
				<TrendingUp size={24} />
			</div>
			<div class="stat-content">
				<span class="stat-label">Total ahorrado</span>
				<span class="stat-value">{formatMXN(totalAhorrado)}</span>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
				<Target size={24} />
			</div>
			<div class="stat-content">
				<span class="stat-label">Objetivo total</span>
				<span class="stat-value">{formatMXN(totalObjetivo)}</span>
			</div>
		</div>

		<div class="stat-card">
			<div class="stat-icon" style="background: rgba(234, 179, 8, 0.1); color: #eab308;">
				<Trophy size={24} />
			</div>
			<div class="stat-content">
				<span class="stat-label">Metas logradas</span>
				<span class="stat-value">{metasCompletadas}</span>
			</div>
		</div>
	</div>

	<!-- Lista de metas -->
	<div class="metas-list">
		{#if metas.length === 0}
			<div class="empty-state" in:fade={{ duration: 300 }}>
				<div class="empty-icon">
					<Target size={48} />
				</div>
				<h3>Sin metas de ahorro</h3>
				<p>Crea tu primera meta para empezar a ahorrar hacia tus sueños.</p>
				<button class="btn btn-primary" onclick={openModal}>
					<Plus size={18} />
					Crear primera meta
				</button>
			</div>
		{:else}
			<div class="metas-grid">
				{#each metas as meta, i (meta.id)}
					{@const percentage = getPercentage(meta.currentAmount, meta.targetAmount)}
					{@const daysRemaining = getDaysRemaining(meta.deadline)}
					<div 
						class="meta-card"
						class:completed={meta.isCompleted}
						in:fly={{ y: 20, duration: 300, delay: i * 50, easing: quintOut }}
					>
						<!-- Header con emoji y acciones -->
						<div class="meta-header">
							<div class="meta-emoji" style="background: {meta.color}20; color: {meta.color};">
								{meta.emoji}
							</div>
							<div class="meta-actions">
								<button class="action-btn" title="Editar" onclick={() => editMeta(meta)}>
									<Pencil size={14} />
								</button>
								<button class="action-btn danger" title="Eliminar" onclick={() => deleteMeta(meta.id)}>
									<Trash2 size={14} />
								</button>
							</div>
						</div>

						<!-- Info -->
						<h3 class="meta-name">{meta.name}</h3>

						{#if meta.isCompleted}
							<div class="completed-badge" in:scale={{ start: 0.8, duration: 300, easing: backOut }}>
								<Trophy size={14} />
								¡Meta lograda!
							</div>
						{/if}

						<!-- Progreso -->
						<div class="meta-progress">
							<div class="progress-bar">
								<div 
									class="progress-fill"
									style="width: {percentage}%; background: {meta.color};"
								></div>
							</div>
							<div class="progress-info">
								<span class="current">{formatMXN(meta.currentAmount)}</span>
								<span class="target">de {formatMXN(meta.targetAmount)}</span>
							</div>
						</div>

						<!-- Footer -->
						<div class="meta-footer">
							{#if daysRemaining}
								<span class="deadline" class:urgent={daysRemaining === 'Vencida' || daysRemaining === 'Hoy'}>
									<Calendar size={12} />
									{daysRemaining}
								</span>
							{/if}
							<span class="percentage">{percentage}%</span>
						</div>

						<!-- Botón abonar -->
						{#if !meta.isCompleted}
							<button 
								class="abonar-btn"
								onclick={() => openAbonarModal(meta.id)}
							>
								<Plus size={16} />
								Abonar
							</button>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<!-- Modal Nueva/Editar Meta -->
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
				<h2>{editingId ? 'Editar meta' : 'Nueva meta'}</h2>
				<button class="close-btn" onclick={closeModal}>
					<X size={20} />
				</button>
			</header>

			<form class="modal-body" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
				<!-- Selector de emoji -->
				<div class="form-group">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label>Ícono</label>
					<div class="emoji-picker">
						{#each emojisPopulares as emoji}
							<button 
								type="button"
								class="emoji-btn"
								class:selected={formData.emoji === emoji}
								onclick={() => formData.emoji = emoji}
							>
								{emoji}
							</button>
						{/each}
					</div>
				</div>

				<div class="form-group">
					<label for="nombre">Nombre de la meta</label>
					<input 
						type="text"
						id="nombre"
						placeholder="Ej: Vacaciones, Auto nuevo..."
						bind:value={formData.nombre}
						class="input"
						required
					/>
				</div>

				<div class="form-row">
					<div class="form-group">
						<label for="montoObjetivo">Monto objetivo</label>
						<div class="input-with-prefix">
							<span class="prefix">$</span>
							<input 
								type="text"
								id="montoObjetivo"
								inputmode="decimal"
								placeholder="50000"
								bind:value={formData.montoObjetivo}
								class="input"
								required
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="montoActual">Ahorro inicial</label>
						<div class="input-with-prefix">
							<span class="prefix">$</span>
							<input 
								type="text"
								id="montoActual"
								inputmode="decimal"
								placeholder="0"
								bind:value={formData.montoActual}
								class="input"
							/>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label for="deadline">Fecha límite (opcional)</label>
					<input 
						type="date"
						id="deadline"
						bind:value={formData.deadline}
						class="input"
					/>
				</div>

				<!-- Selector de color -->
				<div class="form-group">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label>Color</label>
					<div class="color-picker">
						{#each coloresDisponibles as color}
							<button 
								type="button"
								class="color-btn"
								class:selected={formData.color === color}
								style="background: {color};"
								onclick={() => formData.color = color}
							>
								{#if formData.color === color}
									<Check size={14} />
								{/if}
							</button>
						{/each}
					</div>
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
							{editingId ? 'Actualizar' : 'Crear meta'}
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Modal Abonar -->
{#if showAbonarModal}
	{@const meta = metas.find(m => m.id === abonarMetaId)}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions a11y_click_events_have_key_events -->
	<div class="modal-overlay" role="dialog" aria-modal="true" tabindex="-1" transition:fade={{ duration: 200 }} onclick={() => showAbonarModal = false} onkeydown={(e) => e.key === 'Escape' && (showAbonarModal = false)}>
		<!-- svelte-ignore a11y_no_static_element_interactions a11y_click_events_have_key_events -->
		<div 
			class="modal modal-sm"
			onclick={(e) => e.stopPropagation()}
			in:fly={{ y: 50, duration: 300, easing: quintOut }}
		>
			<header class="modal-header">
				<h2>Abonar a {meta?.name}</h2>
				<button class="close-btn" onclick={() => showAbonarModal = false}>
					<X size={20} />
				</button>
			</header>

			<form class="modal-body" onsubmit={(e) => { e.preventDefault(); handleAbonar(); }}>
				<p class="abonar-info">
					Saldo actual: <strong>{formatMXN(meta?.currentAmount || 0)}</strong>
				</p>

				<div class="form-group">
					<label for="montoAbonar">Monto a abonar</label>
					<div class="input-with-prefix">
						<span class="prefix">$</span>
						<input 
							type="text"
							id="montoAbonar"
							inputmode="decimal"
							placeholder="1000"
							bind:value={montoAbonar}
							class="input"
							required
						/>
					</div>
				</div>

				<div class="modal-actions">
					<button type="button" class="btn btn-outline" onclick={() => showAbonarModal = false}>
						Cancelar
					</button>
					<button type="submit" class="btn btn-primary" disabled={isSubmitting}>
						<Plus size={18} />
						Abonar
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	.metas-page {
		padding: var(--mby-space-xl);
		max-width: 1000px;
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

	/* Stats Grid */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-xl);
	}

	.stat-card {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg);
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-border-subtle);
	}

	.stat-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--mby-radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stat-content {
		display: flex;
		flex-direction: column;
	}

	.stat-label {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
	}

	.stat-value {
		font-size: var(--mby-text-xl);
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	/* Metas Grid */
	.metas-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: var(--mby-space-lg);
	}

	.meta-card {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
		transition: all 0.3s ease;
	}

	.meta-card:hover {
		border-color: var(--mby-border-default);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
	}

	.meta-card.completed {
		background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
		border-color: rgba(34, 197, 94, 0.3);
	}

	.meta-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--mby-space-md);
	}

	.meta-emoji {
		width: 48px;
		height: 48px;
		border-radius: var(--mby-radius-lg);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
	}

	.meta-actions {
		display: flex;
		gap: 4px;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.meta-card:hover .meta-actions {
		opacity: 1;
	}

	.action-btn {
		width: 28px;
		height: 28px;
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

	.meta-name {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-sm);
	}

	.completed-badge {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 4px 10px;
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
		border-radius: var(--mby-radius-full);
		font-size: var(--mby-text-xs);
		font-weight: 600;
		margin-bottom: var(--mby-space-md);
	}

	.meta-progress {
		margin-bottom: var(--mby-space-md);
	}

	.progress-bar {
		height: 8px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
		margin-bottom: var(--mby-space-xs);
	}

	.progress-fill {
		height: 100%;
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	.progress-info {
		display: flex;
		justify-content: space-between;
		font-size: var(--mby-text-sm);
	}

	.progress-info .current {
		font-weight: 600;
		color: var(--mby-text-primary);
	}

	.progress-info .target {
		color: var(--mby-text-tertiary);
	}

	.meta-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--mby-space-md);
	}

	.deadline {
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: var(--mby-text-xs);
		color: var(--mby-text-secondary);
	}

	.deadline.urgent {
		color: #ef4444;
	}

	.percentage {
		font-size: var(--mby-text-sm);
		font-weight: 600;
		color: var(--mby-text-secondary);
	}

	.abonar-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm);
		background: var(--mby-bg-base);
		border: 1px dashed var(--mby-border-default);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-sm);
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.abonar-btn:hover {
		background: rgba(34, 197, 94, 0.1);
		border-color: #22c55e;
		color: #22c55e;
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

	/* Modals */
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
		max-width: 500px;
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-2xl);
		overflow: hidden;
	}

	.modal.modal-sm {
		max-width: 380px;
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

	/* Emoji Picker */
	.emoji-picker {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
	}

	.emoji-btn {
		width: 40px;
		height: 40px;
		border-radius: var(--mby-radius-md);
		border: 2px solid var(--mby-border-subtle);
		background: var(--mby-bg-base);
		font-size: 1.25rem;
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

	/* Color Picker */
	.color-picker {
		display: flex;
		gap: var(--mby-space-xs);
	}

	.color-btn {
		width: 32px;
		height: 32px;
		border-radius: var(--mby-radius-full);
		border: 3px solid transparent;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: all 0.2s ease;
	}

	.color-btn:hover {
		transform: scale(1.1);
	}

	.color-btn.selected {
		border-color: var(--mby-text-primary);
	}

	.modal-actions {
		display: flex;
		gap: var(--mby-space-sm);
		justify-content: flex-end;
		padding-top: var(--mby-space-md);
	}

	.abonar-info {
		color: var(--mby-text-secondary);
		margin: 0 0 var(--mby-space-md);
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
		.metas-page {
			padding: var(--mby-space-lg);
		}

		.page-header {
			flex-direction: column;
		}

		.stats-grid {
			grid-template-columns: 1fr;
		}

		.metas-grid {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
