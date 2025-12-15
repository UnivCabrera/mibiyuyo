<!-- ═══════════════════════════════════════════════════════════════════════════
     🧭 HEADER — Navegación Principal mibiyuyo
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Menu, X, Sparkles } from 'lucide-svelte';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
	import LanguageSelector from '$lib/components/ui/LanguageSelector.svelte';
	import { t, initLocale } from '$lib/i18n/index.svelte';
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	onMount(() => {
		initLocale();
	});

	// Detectar scroll para cambiar estilo del header
	$effect(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 20;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	// Navlinks reactivos con traducciones
	const navLinks = $derived([
		{ href: '#features', label: t().nav.features },
		{ href: '#benefits', label: t().nav.benefits },
		{ href: '#testimonials', label: t().nav.testimonials },
		{ href: '#pricing', label: t().nav.pricing },
		{ href: '#faq', label: t().nav.faq }
	]);
</script>

<header class="header" class:scrolled={isScrolled}>
	<nav class="nav container">
		<!-- Logo -->
		<a href="/" class="logo" aria-label="mibiyuyo - Inicio">
			<span class="logo-icon">❤️</span>
			<span class="logo-text">mibiyuyo</span>
		</a>

		<!-- Desktop Navigation -->
		<div class="nav-links hide-mobile">
			{#each navLinks as link}
				<a href={link.href} class="nav-link">{link.label}</a>
			{/each}
		</div>

		<!-- CTAs -->
		<div class="nav-ctas">
			<LanguageSelector />
			<ThemeToggle />
			<a href="/auth/login" class="btn btn-login hide-mobile">{t().nav.login}</a>
			<a href="/auth/register" class="btn btn-primary btn-sm btn-shine">
				<Sparkles size={16} />
				{t().nav.register}
			</a>

			<!-- Mobile Menu Toggle -->
			<button
				class="menu-toggle show-mobile-only"
				onclick={toggleMenu}
				aria-label={isMenuOpen ? t().nav.closeMenu : t().nav.openMenu}
				aria-expanded={isMenuOpen}
			>
				{#if isMenuOpen}
					<X size={24} />
				{:else}
					<Menu size={24} />
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="mobile-menu show-mobile-only">
			<div class="mobile-menu-content">
				{#each navLinks as link}
					<a href={link.href} class="mobile-nav-link" onclick={() => (isMenuOpen = false)}>
						{link.label}
					</a>
				{/each}
				<hr class="mobile-divider" />
				<a href="/auth/login" class="mobile-nav-link">{t().nav.login}</a>
			</div>
		</div>
	{/if}
</header>

<style>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: var(--mby-z-fixed);
		padding: var(--mby-space-md) 0;
		transition:
			background-color var(--mby-transition-base),
			backdrop-filter var(--mby-transition-base),
			box-shadow var(--mby-transition-base);
	}

	.header.scrolled {
		background: rgba(15, 23, 42, 0.9);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
	}

	.nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--mby-space-xl);
	}

	/* Logo */
	.logo {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-family: var(--mby-font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--mby-text-inverse);
		text-decoration: none;
	}

	.logo:hover {
		color: var(--mby-text-inverse);
	}

	.logo-icon {
		font-size: 1.75rem;
		animation: float 3s ease-in-out infinite;
	}

	.logo-text {
		background: linear-gradient(135deg, var(--mby-gold-400), var(--mby-orange-500));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Nav Links */
	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--mby-space-lg);
	}

	.nav-link {
		font-size: 0.9375rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		transition: color var(--mby-transition-fast);
		position: relative;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 0;
		height: 2px;
		background: var(--mby-orange-500);
		transition: width var(--mby-transition-fast);
	}

	.nav-link:hover {
		color: var(--mby-text-inverse);
	}

	.nav-link:hover::after {
		width: 100%;
	}

	/* CTAs */
	.nav-ctas {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	/* Botón Login mejorado */
	.btn-login {
		padding: var(--mby-space-sm) var(--mby-space-lg);
		font-size: var(--mby-text-sm, 0.9375rem);
		font-weight: 500;
		color: rgba(255, 255, 255, 0.9);
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: var(--mby-radius-md);
		transition: all var(--mby-transition-fast);
	}

	.btn-login:hover {
		color: var(--mby-text-inverse);
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.4);
	}

	/* Mobile Menu Toggle */
	.menu-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: transparent;
		border: none;
		color: var(--mby-text-inverse);
		cursor: pointer;
		border-radius: var(--mby-radius-md);
		transition: background-color var(--mby-transition-fast);
	}

	.menu-toggle:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	/* Mobile Menu */
	.mobile-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(15, 23, 42, 0.98);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		animation: fadeInUp 0.3s ease-out;
	}

	.mobile-menu-content {
		padding: var(--mby-space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.mobile-nav-link {
		display: block;
		padding: var(--mby-space-md);
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--mby-text-inverse);
		text-decoration: none;
		border-radius: var(--mby-radius-md);
		transition: background-color var(--mby-transition-fast);
	}

	.mobile-nav-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: var(--mby-gold-400);
	}

	.mobile-divider {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		margin: var(--mby-space-sm) 0;
	}

	/* Float animation for logo */
	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}
</style>
