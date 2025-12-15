<!-- ═══════════════════════════════════════════════════════════════════════════════
     📊 DASHBOARD LAYOUT — Layout del área privada
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		LayoutDashboard, 
		Wallet,
		DollarSign,
		FolderOpen, 
		Target, 
		BarChart3, 
		Settings,
		LogOut,
		Menu,
		X,
		Bell,
		Search
	} from 'lucide-svelte';
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';

	let { data, children } = $props<{ data: LayoutData; children: any }>();
	let isSidebarOpen = $state(false);

	// Verificar si el item está activo
	function isActive(href: string): boolean {
		const currentPath = $page.url.pathname;
		if (href === '/dashboard') {
			return currentPath === '/dashboard';
		}
		return currentPath.startsWith(href);
	}

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
		{ href: '/dashboard/ingresos', label: 'Ingresos', icon: DollarSign },
		{ href: '/dashboard/gastos', label: 'Gastos', icon: Wallet },
		{ href: '/dashboard/apartados', label: 'Apartados', icon: FolderOpen },
		{ href: '/dashboard/metas', label: 'Metas', icon: Target },
		{ href: '/dashboard/reportes', label: 'Reportes', icon: BarChart3 },
		{ href: '/dashboard/configuracion', label: 'Configuración', icon: Settings }
	];
</script>

<div class="dashboard-layout">
	<!-- Sidebar -->
	<aside class="sidebar" class:open={isSidebarOpen}>
		<div class="sidebar-header">
			<a href="/dashboard" class="sidebar-logo">
				<span class="logo-icon">💚</span>
				<span class="logo-text">mibiyuyo</span>
			</a>
			<button class="sidebar-close show-mobile-only" onclick={() => isSidebarOpen = false}>
				<X size={24} />
			</button>
		</div>

		<nav class="sidebar-nav">
			{#each navItems as item}
				<a href={item.href} class="nav-item" class:active={isActive(item.href)}>
					<item.icon size={20} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-footer">
			<div class="user-info">
				<div class="user-avatar">
					{#if data.user?.avatarUrl}
						<img src={data.user.avatarUrl} alt={data.user.name || 'Avatar'} />
					{:else}
						<span>{data.user?.name?.[0] || data.user?.email?.[0] || '?'}</span>
					{/if}
				</div>
				<div class="user-details">
					<span class="user-name">{data.user?.name || 'Usuario'}</span>
					<span class="user-plan">Plan {data.user?.plan || 'Gratis'}</span>
				</div>
			</div>
			<a href="/api/auth/logout" class="logout-btn" title="Cerrar sesión">
				<LogOut size={18} />
			</a>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="main-content">
		<!-- Top Bar -->
		<header class="topbar">
			<button class="menu-toggle show-mobile-only" onclick={() => isSidebarOpen = true}>
				<Menu size={24} />
			</button>

			<div class="search-bar hide-mobile">
				<Search size={18} />
				<input type="search" placeholder="Buscar gastos, apartados..." />
			</div>

			<div class="topbar-actions">
				<button class="notification-btn">
					<Bell size={20} />
					<span class="notification-badge">3</span>
				</button>
				<ThemeToggle />
			</div>
		</header>

		<!-- Page Content -->
		<div class="page-content">
			{@render children()}
		</div>
	</main>
</div>

<!-- Overlay para móvil -->
{#if isSidebarOpen}
	<button 
		type="button"
		class="sidebar-overlay show-mobile-only" 
		onclick={() => isSidebarOpen = false}
		aria-label="Cerrar menú"
	></button>
{/if}

<style>
	.dashboard-layout {
		display: flex;
		min-height: 100vh;
		background: var(--mby-surface-1);
	}

	/* Sidebar */
	.sidebar {
		width: 260px;
		background: var(--mby-surface-0);
		border-right: 1px solid var(--mby-surface-3);
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		z-index: var(--mby-z-fixed);
		transition: transform var(--mby-transition-base);
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--mby-space-lg);
		border-bottom: 1px solid var(--mby-surface-3);
	}

	.sidebar-logo {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		text-decoration: none;
	}

	.logo-icon {
		font-size: 1.5rem;
	}

	.logo-text {
		font-family: var(--mby-font-display);
		font-size: 1.25rem;
		font-weight: 700;
		background: linear-gradient(135deg, var(--mby-orange-500), var(--mby-orange-600));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.sidebar-close {
		background: none;
		border: none;
		color: var(--mby-text-secondary);
		cursor: pointer;
		padding: var(--mby-space-xs);
	}

	.sidebar-nav {
		flex: 1;
		padding: var(--mby-space-md);
		overflow-y: auto;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-md);
		color: var(--mby-text-secondary);
		text-decoration: none;
		font-size: var(--mby-text-sm, 0.9375rem);
		font-weight: 500;
		transition: all var(--mby-transition-fast);
	}

	.nav-item:hover {
		background: var(--mby-surface-1);
		color: var(--mby-text-primary);
	}

	.nav-item.active {
		background: var(--mby-gold-50);
		color: var(--mby-primary-600);
	}

	.sidebar-footer {
		padding: var(--mby-space-md);
		border-top: 1px solid var(--mby-surface-3);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.user-info {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: var(--mby-gold-100);
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: var(--mby-primary-600);
		overflow: hidden;
	}

	.user-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: var(--mby-text-sm, 0.9375rem);
		font-weight: 600;
		color: var(--mby-text-primary);
	}

	.user-plan {
		font-size: var(--mby-text-xs, 0.8125rem);
		color: var(--mby-text-muted);
		text-transform: capitalize;
	}

	.logout-btn {
		padding: var(--mby-space-sm);
		color: var(--mby-text-muted);
		transition: color var(--mby-transition-fast);
	}

	.logout-btn:hover {
		color: var(--mby-orange-500);
	}

	/* Main Content */
	.main-content {
		flex: 1;
		margin-left: 260px;
		display: flex;
		flex-direction: column;
	}

	/* Topbar */
	.topbar {
		height: 64px;
		background: var(--mby-surface-0);
		border-bottom: 1px solid var(--mby-surface-3);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 var(--mby-space-xl);
		position: sticky;
		top: 0;
		z-index: var(--mby-z-sticky);
	}

	.menu-toggle {
		background: none;
		border: none;
		color: var(--mby-text-primary);
		cursor: pointer;
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		background: var(--mby-surface-1);
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-lg);
		padding: var(--mby-space-sm) var(--mby-space-md);
		width: 320px;
		color: var(--mby-text-muted);
	}

	.search-bar input {
		flex: 1;
		border: none;
		background: transparent;
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-text-primary);
	}

	.search-bar input::placeholder {
		color: var(--mby-text-muted);
	}

	.search-bar input:focus {
		outline: none;
	}

	.topbar-actions {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.notification-btn {
		position: relative;
		background: none;
		border: none;
		color: var(--mby-text-secondary);
		cursor: pointer;
		padding: var(--mby-space-sm);
	}

	.notification-badge {
		position: absolute;
		top: 0;
		right: 0;
		width: 18px;
		height: 18px;
		background: var(--mby-orange-500);
		color: white;
		font-size: 0.625rem;
		font-weight: 700;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Page Content */
	.page-content {
		flex: 1;
		padding: var(--mby-space-xl);
	}

	/* Overlay */
	.sidebar-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: calc(var(--mby-z-fixed) - 1);
		border: none;
		cursor: pointer;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.sidebar {
			transform: translateX(-100%);
		}

		.sidebar.open {
			transform: translateX(0);
		}

		.main-content {
			margin-left: 0;
		}
	}

	@media (max-width: 768px) {
		.page-content {
			padding: var(--mby-space-md);
		}
	}
</style>
