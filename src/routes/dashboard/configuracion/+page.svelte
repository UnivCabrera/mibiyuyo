<!-- ═══════════════════════════════════════════════════════════════════════════════
     ⚙️ CONFIGURACIÓN — Ajustes de cuenta y preferencias (Sin animaciones)
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		Settings,
		Mail,
		Shield,
		Bell,
		Palette,
		LogOut,
		ChevronRight,
		Wallet,
		Target,
		DollarSign,
		AlertTriangle
	} from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	interface Props {
		data: {
			user: {
				id: string;
				email: string;
				name: string | null;
				onboardingCompleted: boolean;
			};
			stats: {
				ingresos: number;
				apartados: number;
				metas: number;
				transacciones: number;
			};
		};
	}
	let { data }: Props = $props();

	let showLogoutConfirm = $state(false);
	let showDeleteConfirm = $state(false);
	let isLoggingOut = $state(false);
	let deleteConfirmText = $state('');

	// Formatear fecha
	function formatDate(date: Date): string {
		return new Date(date).toLocaleDateString('es-MX', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	// Calcular días desde registro
	function daysSinceRegistration(date: Date): number {
		const now = new Date();
		const registered = new Date(date);
		const diff = now.getTime() - registered.getTime();
		return Math.floor(diff / (1000 * 60 * 60 * 24));
	}

	// Cerrar sesión
	async function handleLogout() {
		isLoggingOut = true;
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST'
			});
			if (response.ok) {
				goto('/login');
			}
		} catch (e) {
			console.error('Error al cerrar sesión:', e);
		} finally {
			isLoggingOut = false;
			showLogoutConfirm = false;
		}
	}

	// Manejar tecla Escape
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			showLogoutConfirm = false;
			showDeleteConfirm = false;
		}
	}
</script>

<svelte:head>
	<title>Configuración | mibiyuyo</title>
</svelte:head>

<div class="config-page">
	<!-- Header -->
	<header class="page-header">
		<h1>
			<Settings size={28} />
			Configuración
		</h1>
		<p>Administra tu cuenta y preferencias</p>
	</header>

	<div class="config-grid">
		<!-- Perfil de usuario -->
		<section class="config-section profile-section">
			<h2>Tu perfil</h2>
			<div class="profile-card">
				<div class="avatar">
					{(data.user.name || data.user.email).charAt(0).toUpperCase()}
				</div>
				<div class="profile-info">
					<h3>{data.user.name || 'Usuario'}</h3>
					<div class="profile-meta">
						<span class="meta-item">
							<Mail size={14} />
							{data.user.email}
						</span>
					</div>
					<div class="profile-badge">
						Usuario de mibiyuyo 💚
					</div>
				</div>
			</div>
		</section>

		<!-- Estadísticas rápidas -->
		<section class="config-section stats-section">
			<h2>Tu actividad</h2>
			<div class="stats-grid">
				<div class="stat-item">
					<DollarSign size={20} />
					<span class="stat-value">{data.stats.ingresos}</span>
					<span class="stat-label">fuentes de ingreso</span>
				</div>
				<div class="stat-item">
					<Wallet size={20} />
					<span class="stat-value">{data.stats.apartados}</span>
					<span class="stat-label">apartados</span>
				</div>
				<div class="stat-item">
					<Target size={20} />
					<span class="stat-value">{data.stats.metas}</span>
					<span class="stat-label">metas</span>
				</div>
				<div class="stat-item">
					<DollarSign size={20} />
					<span class="stat-value">{data.stats.transacciones}</span>
					<span class="stat-label">transacciones</span>
				</div>
			</div>
		</section>

		<!-- Ajustes de cuenta -->
		<section class="config-section">
			<h2>Cuenta</h2>
			<div class="settings-list">
				<button class="setting-item" onclick={() => goto('/dashboard/ingresos')}>
					<div class="setting-icon income">
						<DollarSign size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Fuentes de ingreso</span>
						<span class="setting-desc">Administra tus ingresos recurrentes</span>
					</div>
					<ChevronRight size={20} class="chevron" />
				</button>

				<button class="setting-item" onclick={() => goto('/dashboard/metas')}>
					<div class="setting-icon goals">
						<Target size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Metas de ahorro</span>
						<span class="setting-desc">Configura tus objetivos financieros</span>
					</div>
					<ChevronRight size={20} class="chevron" />
				</button>

				<button class="setting-item" onclick={() => goto('/dashboard/apartados')}>
					<div class="setting-icon apartados">
						<Wallet size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Apartados</span>
						<span class="setting-desc">Gestiona tu dinero apartado</span>
					</div>
					<ChevronRight size={20} class="chevron" />
				</button>
			</div>
		</section>

		<!-- Preferencias (futuras) -->
		<section class="config-section">
			<h2>Preferencias</h2>
			<div class="settings-list">
				<div class="setting-item disabled">
					<div class="setting-icon notifications">
						<Bell size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Notificaciones</span>
						<span class="setting-desc">Próximamente</span>
					</div>
					<span class="coming-soon">Pronto</span>
				</div>

				<div class="setting-item disabled">
					<div class="setting-icon theme">
						<Palette size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Tema</span>
						<span class="setting-desc">Personaliza la apariencia</span>
					</div>
					<span class="coming-soon">Pronto</span>
				</div>
			</div>
		</section>

		<!-- Seguridad -->
		<section class="config-section">
			<h2>Seguridad</h2>
			<div class="settings-list">
				<div class="setting-item disabled">
					<div class="setting-icon security">
						<Shield size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Cambiar contraseña</span>
						<span class="setting-desc">Próximamente</span>
					</div>
					<span class="coming-soon">Pronto</span>
				</div>

				<button class="setting-item danger" onclick={() => showLogoutConfirm = true}>
					<div class="setting-icon logout">
						<LogOut size={20} />
					</div>
					<div class="setting-info">
						<span class="setting-title">Cerrar sesión</span>
						<span class="setting-desc">Salir de tu cuenta en este dispositivo</span>
					</div>
					<ChevronRight size={20} class="chevron" />
				</button>
			</div>
		</section>

		<!-- Zona peligrosa -->
		<section class="config-section danger-section">
			<h2>Zona peligrosa</h2>
			<div class="danger-card">
				<div class="danger-info">
					<AlertTriangle size={20} />
					<div>
						<h4>Eliminar cuenta</h4>
						<p>Esta acción eliminará permanentemente tu cuenta y todos tus datos. No se puede deshacer.</p>
					</div>
				</div>
				<button class="btn btn-danger" onclick={() => showDeleteConfirm = true} disabled>
					Próximamente
				</button>
			</div>
		</section>
	</div>
</div>

<!-- Modal confirmar logout -->
{#if showLogoutConfirm}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div 
		class="modal-overlay" 
		onclick={() => showLogoutConfirm = false}
		onkeydown={handleKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby="logout-title"
		tabindex="-1"
		transition:fade={{ duration: 200 }}
	>
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<div class="modal" onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="document">
			<h3 id="logout-title">¿Cerrar sesión?</h3>
			<p>¿Estás seguro de que deseas cerrar sesión en este dispositivo?</p>
			<div class="modal-actions">
				<button class="btn btn-secondary" onclick={() => showLogoutConfirm = false}>
					Cancelar
				</button>
				<button class="btn btn-danger" onclick={handleLogout} disabled={isLoggingOut}>
					{#if isLoggingOut}
						Cerrando...
					{:else}
						Cerrar sesión
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.config-page {
		padding: var(--mby-space-xl);
		max-width: 800px;
		margin: 0 auto;
	}

	/* Header */
	.page-header {
		margin-bottom: var(--mby-space-xl);
	}

	.page-header h1 {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-xs);
	}

	.page-header p {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-sm);
		margin: 0;
	}

	/* Grid */
	.config-grid {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.config-section {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-lg);
		border: 1px solid var(--mby-border-subtle);
	}

	.config-section h2 {
		font-size: var(--mby-text-sm);
		font-weight: 600;
		color: var(--mby-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin: 0 0 var(--mby-space-md);
	}

	/* Profile */
	.profile-card {
		display: flex;
		gap: var(--mby-space-lg);
		align-items: center;
	}

	.avatar {
		width: 72px;
		height: 72px;
		background: linear-gradient(135deg, var(--mby-primary-500), var(--mby-primary-600));
		border-radius: var(--mby-radius-xl);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: white;
		flex-shrink: 0;
	}

	.profile-info h3 {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-xs);
	}

	.profile-meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-sm);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
	}

	.profile-badge {
		display: inline-block;
		padding: 4px 12px;
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-500);
		border-radius: var(--mby-radius-full);
		font-size: var(--mby-text-xs);
		font-weight: 500;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--mby-space-md);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		padding: var(--mby-space-md);
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-text-secondary);
	}

	.stat-value {
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: var(--mby-space-xs) 0;
	}

	.stat-label {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	/* Settings list */
	.settings-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.setting-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-md);
		background: transparent;
		border: none;
		border-radius: var(--mby-radius-lg);
		cursor: pointer;
		transition: background 0.2s ease;
		text-align: left;
		width: 100%;
	}

	.setting-item:hover:not(.disabled) {
		background: var(--mby-bg-base);
	}

	.setting-item.disabled {
		cursor: not-allowed;
		opacity: 0.6;
	}

	.setting-item.danger:hover {
		background: rgba(239, 68, 68, 0.05);
	}

	.setting-icon {
		width: 42px;
		height: 42px;
		border-radius: var(--mby-radius-md);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.setting-icon.income {
		background: rgba(34, 197, 94, 0.1);
		color: #22c55e;
	}

	.setting-icon.goals {
		background: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.setting-icon.apartados {
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-500);
	}

	.setting-icon.notifications {
		background: rgba(168, 85, 247, 0.1);
		color: #a855f7;
	}

	.setting-icon.theme {
		background: rgba(236, 72, 153, 0.1);
		color: #ec4899;
	}

	.setting-icon.security {
		background: rgba(14, 165, 233, 0.1);
		color: #0ea5e9;
	}

	.setting-icon.logout {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.setting-info {
		flex: 1;
	}

	.setting-title {
		display: block;
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-primary);
		margin-bottom: 2px;
	}

	.setting-desc {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	.setting-item :global(.chevron) {
		color: var(--mby-text-tertiary);
	}

	.coming-soon {
		padding: 4px 10px;
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-full);
		font-size: var(--mby-text-xs);
		color: var(--mby-text-tertiary);
	}

	/* Danger zone */
	.danger-section h2 {
		color: #ef4444;
	}

	.danger-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--mby-space-lg);
		padding: var(--mby-space-md);
		background: rgba(239, 68, 68, 0.05);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: var(--mby-radius-lg);
	}

	.danger-info {
		display: flex;
		gap: var(--mby-space-md);
		color: #ef4444;
	}

	.danger-info h4 {
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-xs);
	}

	.danger-info p {
		font-size: var(--mby-text-xs);
		color: var(--mby-text-secondary);
		margin: 0;
		max-width: 400px;
	}

	/* Buttons */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm) var(--mby-space-lg);
		border-radius: var(--mby-radius-lg);
		font-weight: 500;
		font-size: var(--mby-text-sm);
		cursor: pointer;
		transition: all 0.2s ease;
		border: none;
		white-space: nowrap;
	}

	.btn-secondary {
		background: var(--mby-bg-base);
		color: var(--mby-text-primary);
		border: 1px solid var(--mby-border-subtle);
	}

	.btn-secondary:hover {
		background: var(--mby-bg-elevated);
	}

	.btn-danger {
		background: #ef4444;
		color: white;
	}

	.btn-danger:hover:not(:disabled) {
		background: #dc2626;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Modal */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--mby-space-lg);
	}

	.modal {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-xl);
		max-width: 400px;
		width: 100%;
		border: 1px solid var(--mby-border-subtle);
	}

	.modal h3 {
		font-size: var(--mby-text-lg);
		font-weight: 600;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-sm);
	}

	.modal p {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-sm);
		margin: 0 0 var(--mby-space-lg);
	}

	.modal-actions {
		display: flex;
		gap: var(--mby-space-sm);
		justify-content: flex-end;
	}

	/* Responsive */
	@media (max-width: 640px) {
		.config-page {
			padding: var(--mby-space-lg);
		}

		.profile-card {
			flex-direction: column;
			text-align: center;
		}

		.profile-meta {
			justify-content: center;
		}

		.stats-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.danger-card {
			flex-direction: column;
			text-align: center;
		}

		.danger-info {
			flex-direction: column;
			align-items: center;
		}

		.danger-info p {
			max-width: none;
		}
	}
</style>
