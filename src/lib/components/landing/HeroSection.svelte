<!-- ═══════════════════════════════════════════════════════════════════════════
     🦸 HERO SECTION — Primera Impresión (7 segundos críticos)
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Headline: Apela al dolor #1 (no saber cuánto gastar HOY)
     - Número grande: Principio de concreción (tangibilidad)
     - CTA doble: Reduce fricción cognitiva (opción clara)
     - Social proof: Principio de conformidad social
     - Urgencia suave: FOMO sin manipulación agresiva
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { ArrowRight, Play, Shield, Zap, Heart, CheckCircle2 } from 'lucide-svelte';
	import { t } from '$lib/i18n/index.svelte';

	// Número animado para el "biyuyo disponible"
	let displayAmount = $state(0);
	const targetAmount = 2847;

	$effect(() => {
		const duration = 2000;
		const steps = 60;
		const increment = targetAmount / steps;
		let current = 0;
		let step = 0;

		const timer = setInterval(() => {
			step++;
			current = Math.min(Math.round(increment * step), targetAmount);
			displayAmount = current;

			if (step >= steps) {
				clearInterval(timer);
			}
		}, duration / steps);

		return () => clearInterval(timer);
	});

	// Formato de moneda MXN
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(amount);
	}

	// Estado para badges arrastrables
	interface BadgePosition {
		x: number;
		y: number;
	}

	let badgePositions = $state<Record<string, BadgePosition>>({});
	let draggingBadge = $state<string | null>(null);
	let dragOffset = $state({ x: 0, y: 0 });

	function handleDragStart(e: MouseEvent | TouchEvent, badgeId: string) {
		const target = e.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		
		dragOffset = {
			x: clientX - rect.left,
			y: clientY - rect.top
		};
		draggingBadge = badgeId;
		
		// Prevenir selección de texto
		e.preventDefault();
	}

	function handleDrag(e: MouseEvent | TouchEvent) {
		if (!draggingBadge) return;
		
		const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
		const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
		
		const container = document.querySelector('.tangram-badges') as HTMLElement;
		if (!container) return;
		
		const containerRect = container.getBoundingClientRect();
		
		badgePositions[draggingBadge] = {
			x: clientX - containerRect.left - dragOffset.x,
			y: clientY - containerRect.top - dragOffset.y
		};
	}

	function handleDragEnd() {
		draggingBadge = null;
	}

	function getBadgeStyle(badgeId: string): string {
		const pos = badgePositions[badgeId];
		if (pos) {
			return `left: ${pos.x}px; top: ${pos.y}px; transform: none;`;
		}
		return '';
	}
</script>

<svelte:window 
	onmousemove={handleDrag} 
	onmouseup={handleDragEnd}
	ontouchmove={handleDrag}
	ontouchend={handleDragEnd}
/>

<section class="hero">
	<!-- Background Elements -->
	<div class="hero-bg">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="grid-pattern"></div>
	</div>

	<div class="container hero-content">
		<div class="hero-text">
			<!-- Eyebrow / Badge -->
			<div class="hero-badge animate-fade-in-up animate-float-medium">
				<span class="badge-icon">🚀</span>
				<span>{t().hero.badge}</span>
			</div>

			<!-- Headline Principal -->
			<h1 class="hero-title animate-fade-in-up" style="animation-delay: 0.1s">
				{t().hero.title}
				<span class="text-gradient-animated">{t().hero.titleHighlight}</span>
				{t().hero.titleSuffix}
			</h1>

			<!-- Subheadline -->
			<p class="hero-subtitle animate-fade-in-up" style="animation-delay: 0.2s">
				{t().hero.subtitle}
			</p>

			<!-- CTA Buttons -->
			<div class="hero-ctas animate-fade-in-up" style="animation-delay: 0.3s">
				<a href="/register" class="btn btn-primary btn-lg btn-shine animate-glow-pulse">
					{t().hero.ctaPrimary}
					<ArrowRight size={20} />
				</a>
				<button class="btn btn-secondary btn-lg magnetic">
					<Play size={20} />
					{t().hero.ctaSecondary}
				</button>
			</div>

			<!-- Trust Signals -->
			<div class="hero-trust animate-fade-in-up" style="animation-delay: 0.4s">
				<div class="trust-item">
					<Shield size={16} />
					<span>{t().hero.trustSecurity}</span>
				</div>
				<div class="trust-item">
					<Zap size={16} />
					<span>{t().hero.trustSetup}</span>
				</div>
				<div class="trust-item">
					<Heart size={16} />
					<span>{t().hero.trustNoCard}</span>
				</div>
			</div>
		</div>

		<!-- Hero Visual: Dispositivos en layout paralelo -->
		<div class="hero-visual animate-scale-in" style="animation-delay: 0.3s">
			<!-- Fila superior: Desktop y Laptop lado a lado -->
			<div class="devices-row">
				<!-- Desktop Preview -->
				<div class="desktop-preview glass-premium animate-float-slow" style="animation-delay: 0.1s">
					<div class="desktop-header">
						<div class="desktop-dots">
							<span class="dot red"></span>
							<span class="dot yellow"></span>
							<span class="dot green"></span>
						</div>
						<span class="desktop-title">{t().hero.desktopTitle}</span>
					</div>
					<div class="desktop-content">
						<div class="desktop-sidebar">
							<div class="sidebar-item active">📊 {t().hero.navDashboard}</div>
							<div class="sidebar-item">💳 {t().hero.gastos}</div>
							<div class="sidebar-item">📁 {t().hero.apartados}</div>
							<div class="sidebar-item">📈 {t().hero.navReportes}</div>
							<div class="sidebar-item">⚙️ {t().hero.navConfig}</div>
						</div>
						<div class="desktop-main">
							<div class="desktop-stat">
								<span class="stat-label">{t().hero.biyuyoDisponible}</span>
								<span class="stat-value text-gradient-animated">{formatMXN(displayAmount)}</span>
							</div>
							<div class="desktop-chart">
								<div class="chart-bar" style="height: 60%"></div>
								<div class="chart-bar" style="height: 80%"></div>
								<div class="chart-bar" style="height: 45%"></div>
								<div class="chart-bar" style="height: 90%"></div>
								<div class="chart-bar active" style="height: 70%"></div>
							</div>
						</div>
					</div>
				</div>

				<!-- Laptop Preview -->
				<div class="laptop-preview glass-premium animate-float-slow" style="animation-delay: 0.2s">
					<div class="laptop-screen">
						<div class="laptop-header">
							<div class="laptop-dots">
								<span class="dot red"></span>
								<span class="dot yellow"></span>
								<span class="dot green"></span>
							</div>
							<span class="laptop-url">🔒 app.mibiyuyo.com</span>
						</div>
						<div class="laptop-content">
							<div class="laptop-nav">
								<span class="nav-item active">💰 {t().hero.laptopNavResumen}</span>
								<span class="nav-item">📊 {t().hero.gastos}</span>
								<span class="nav-item">🎯 {t().hero.laptopNavMetas}</span>
							</div>
							<div class="laptop-main">
								<div class="laptop-stat-card">
									<span class="laptop-stat-label">{t().hero.disponibleHoy}</span>
									<span class="laptop-stat-value">{formatMXN(displayAmount)}</span>
								</div>
								<div class="laptop-mini-chart">
									<div class="mini-bar" style="height: 40%"></div>
									<div class="mini-bar" style="height: 65%"></div>
									<div class="mini-bar active" style="height: 85%"></div>
									<div class="mini-bar" style="height: 50%"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="laptop-base"></div>
				</div>
			</div>

			<!-- Mobile Preview - En paralelo debajo -->
			<div class="app-preview glass-premium animate-float-slow" style="animation-delay: 0.3s">
				<div class="app-header">
					<span class="app-greeting">{t().hero.appGreeting}</span>
					<span class="app-date">{t().hero.appDate}</span>
				</div>

				<div class="app-main">
					<span class="app-label">{t().hero.appLabel}</span>
					<div class="app-amount text-gradient-animated">
						{formatMXN(displayAmount)}
					</div>
					<div class="app-sublabel">
						<CheckCircle2 size={14} />
						<span>{t().hero.yaApartamos}</span>
					</div>
				</div>

				<div class="app-cards">
					<div class="mini-card">
						<span class="mini-card-icon">🏠</span>
						<div class="mini-card-content">
							<span class="mini-card-title">{t().hero.miniCardRent}</span>
							<span class="mini-card-value">{t().hero.miniCardStatus}</span>
						</div>
					</div>
					<div class="mini-card">
						<span class="mini-card-icon">📱</span>
						<div class="mini-card-content">
							<span class="mini-card-title">{t().hero.miniCardServices}</span>
							<span class="mini-card-value">{t().hero.miniCardStatus}</span>
						</div>
					</div>
					<div class="mini-card">
						<span class="mini-card-icon">🚗</span>
						<div class="mini-card-content">
							<span class="mini-card-title">{t().hero.miniCardGas}</span>
							<span class="mini-card-value">{t().hero.miniCardStatus}</span>
						</div>
					</div>
				</div>

				<button class="app-cta">
					<span>➕</span>
					<span>{t().hero.registerExpense}</span>
				</button>
			</div>

			<!-- Floating badges ARRASTRABLES - El usuario puede moverlos -->
			<div class="tangram-badges">
				<div 
					class="floating-badge tb-1" 
					class:dragging={draggingBadge === 'tb-1'}
					style={getBadgeStyle('tb-1')}
					onmousedown={(e) => handleDragStart(e, 'tb-1')}
					ontouchstart={(e) => handleDragStart(e, 'tb-1')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>🎯</span>
					<span>{t().hero.gastosHormiga}</span>
				</div>
				<div 
					class="floating-badge tb-2"
					class:dragging={draggingBadge === 'tb-2'}
					style={getBadgeStyle('tb-2')}
					onmousedown={(e) => handleDragStart(e, 'tb-2')}
					ontouchstart={(e) => handleDragStart(e, 'tb-2')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>📊</span>
					<span>{t().hero.badgeReportesClaros}</span>
				</div>
				<div 
					class="floating-badge tb-3"
					class:dragging={draggingBadge === 'tb-3'}
					style={getBadgeStyle('tb-3')}
					onmousedown={(e) => handleDragStart(e, 'tb-3')}
					ontouchstart={(e) => handleDragStart(e, 'tb-3')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>🔒</span>
					<span>{t().hero.badgeSeguro}</span>
				</div>
				<div 
					class="floating-badge tb-4"
					class:dragging={draggingBadge === 'tb-4'}
					style={getBadgeStyle('tb-4')}
					onmousedown={(e) => handleDragStart(e, 'tb-4')}
					ontouchstart={(e) => handleDragStart(e, 'tb-4')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>💰</span>
					<span>{t().hero.badgeIngresos}</span>
				</div>
				<div 
					class="floating-badge tb-5"
					class:dragging={draggingBadge === 'tb-5'}
					style={getBadgeStyle('tb-5')}
					onmousedown={(e) => handleDragStart(e, 'tb-5')}
					ontouchstart={(e) => handleDragStart(e, 'tb-5')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>⚡</span>
					<span>{t().hero.badgeSetup}</span>
				</div>
				<div 
					class="floating-badge tb-6"
					class:dragging={draggingBadge === 'tb-6'}
					style={getBadgeStyle('tb-6')}
					onmousedown={(e) => handleDragStart(e, 'tb-6')}
					ontouchstart={(e) => handleDragStart(e, 'tb-6')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>📱</span>
					<span>{t().hero.badgeAcceso}</span>
				</div>
				<div 
					class="floating-badge tb-7"
					class:dragging={draggingBadge === 'tb-7'}
					style={getBadgeStyle('tb-7')}
					onmousedown={(e) => handleDragStart(e, 'tb-7')}
					ontouchstart={(e) => handleDragStart(e, 'tb-7')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>😌</span>
					<span>{t().hero.badgeSinEstres}</span>
				</div>
				<div 
					class="floating-badge tb-8"
					class:dragging={draggingBadge === 'tb-8'}
					style={getBadgeStyle('tb-8')}
					onmousedown={(e) => handleDragStart(e, 'tb-8')}
					ontouchstart={(e) => handleDragStart(e, 'tb-8')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>🇲🇽</span>
					<span>{t().hero.badgeHechoMX}</span>
				</div>
				<div 
					class="floating-badge tb-9"
					class:dragging={draggingBadge === 'tb-9'}
					style={getBadgeStyle('tb-9')}
					onmousedown={(e) => handleDragStart(e, 'tb-9')}
					ontouchstart={(e) => handleDragStart(e, 'tb-9')}
					role="button"
					tabindex="0"
				>
					<span class="drag-hint">⋮⋮</span>
					<span>✨</span>
					<span>{t().hero.badgeGratis}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="scroll-indicator animate-fade-in" style="animation-delay: 1s">
		<div class="scroll-mouse">
			<div class="scroll-wheel"></div>
		</div>
		<span>{t().hero.scrollHint}</span>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: flex;
		align-items: center;
		padding: calc(80px + var(--mby-space-3xl)) 0 var(--mby-space-3xl);
		background: var(--mby-gradient-hero);
		overflow: hidden;
	}

	/* Background Effects */
	.hero-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		opacity: 0.5;
	}

	.orb-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--mby-orange-500) 0%, transparent 70%);
		top: -200px;
		right: -100px;
		animation: float-slow 8s ease-in-out infinite, morph 15s ease-in-out infinite;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--mby-primary-500) 0%, transparent 70%);
		bottom: -100px;
		left: -100px;
		animation: float-slow 10s ease-in-out infinite reverse, morph 12s ease-in-out infinite reverse;
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
	}

	/* Content Layout */
	.hero-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-4xl);
		align-items: center;
		position: relative;
		z-index: 1;
	}

	/* Hero Text */
	.hero-text {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: rgba(234, 179, 8, 0.15);
		border: 1px solid rgba(234, 179, 8, 0.4);
		border-radius: var(--mby-radius-full);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--mby-gold-400);
		width: fit-content;
	}

	.badge-icon {
		font-size: 1rem;
	}

	.hero-title {
		color: white;
		line-height: 1.1;
	}

	.hero-subtitle {
		font-size: 1.25rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.7);
		max-width: 540px;
	}

	.hero-subtitle strong {
		color: var(--mby-gold-400);
		font-weight: 600;
	}

	/* CTAs */
	.hero-ctas {
		display: flex;
		gap: var(--mby-space-md);
		flex-wrap: wrap;
		margin-top: var(--mby-space-md);
	}

	/* Force white text on secondary button in hero (dark background) */
	.hero-ctas :global(.btn-secondary) {
		color: white !important;
	}

	.hero-ctas :global(.btn-secondary:hover) {
		color: white !important;
	}

	/* Trust Signals */
	.hero-trust {
		display: flex;
		gap: var(--mby-space-lg);
		flex-wrap: wrap;
		margin-top: var(--mby-space-md);
	}

	.trust-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.trust-item :global(svg) {
		color: var(--mby-orange-400);
	}

	/* Hero Visual */
	.hero-visual {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xl);
		align-items: center;
		justify-content: center;
		perspective: 1000px;
	}

	/* Fila de dispositivos web (Desktop + Laptop lado a lado) */
	.devices-row {
		display: flex;
		gap: var(--mby-space-lg);
		align-items: flex-start;
		justify-content: center;
	}

	/* Desktop Preview */
	.desktop-preview {
		position: relative;
		width: 320px;
		flex-shrink: 0;
		background: var(--mby-gradient-card);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: var(--mby-radius-xl);
		overflow: hidden;
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.4),
			0 0 0 1px rgba(255, 255, 255, 0.05),
			0 0 80px -20px rgba(217, 119, 6, 0.2);
		z-index: 2;
		animation: deviceFloat 6s ease-in-out infinite;
		transition: transform 0.4s ease, box-shadow 0.4s ease;
	}

	.desktop-preview:hover {
		transform: translateY(-10px) rotateX(2deg);
		box-shadow:
			0 35px 60px -15px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			0 0 100px -20px rgba(217, 119, 6, 0.3);
	}

	@keyframes deviceFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	.desktop-header {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.desktop-dots {
		display: flex;
		gap: 6px;
	}

	.desktop-dots .dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.dot.red { background: #ff5f57; }
	.dot.yellow { background: #ffbd2e; }
	.dot.green { background: #28c840; }

	.desktop-title {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.desktop-content {
		display: flex;
		min-height: 260px;
	}

	.desktop-sidebar {
		width: 120px;
		padding: var(--mby-space-md);
		background: rgba(0, 0, 0, 0.2);
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.sidebar-item {
		padding: var(--mby-space-xs) var(--mby-space-sm);
		font-size: 0.6875rem;
		color: rgba(255, 255, 255, 0.5);
		border-radius: var(--mby-radius-sm);
		white-space: nowrap;
	}

	.sidebar-item.active {
		background: var(--mby-primary-500);
		color: white;
	}

	.desktop-main {
		flex: 1;
		padding: var(--mby-space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.desktop-stat {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.stat-label {
		font-size: 0.6875rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-family: var(--mby-font-display);
		font-size: 1.75rem;
		font-weight: 800;
	}

	.desktop-chart {
		display: flex;
		align-items: flex-end;
		gap: var(--mby-space-sm);
		height: 80px;
		padding: var(--mby-space-md);
		background: rgba(0, 0, 0, 0.2);
		border-radius: var(--mby-radius-md);
		overflow: hidden;
	}

	.chart-bar {
		flex: 1;
		background: linear-gradient(180deg, var(--mby-orange-400) 0%, var(--mby-red-500) 100%);
		border-radius: var(--mby-radius-sm);
		transition: all 0.3s ease;
		animation: chartGrow 1.2s ease-out backwards;
		opacity: 0.6;
	}

	.chart-bar:nth-child(1) { animation-delay: 0.6s; }
	.chart-bar:nth-child(2) { animation-delay: 0.7s; }
	.chart-bar:nth-child(3) { animation-delay: 0.8s; }
	.chart-bar:nth-child(4) { animation-delay: 0.9s; }
	.chart-bar:nth-child(5) { animation-delay: 1s; }

	.chart-bar:hover {
		opacity: 1;
		transform: scaleY(1.1);
	}

	.chart-bar.active {
		background: var(--mby-gradient-primary);
		opacity: 1;
		animation: chartPulse 2s ease-in-out infinite, chartGrow 1.2s ease-out backwards 1s;
	}

	@keyframes chartGrow {
		from { 
			height: 0 !important;
			opacity: 0;
		}
	}

	@keyframes chartPulse {
		0%, 100% { 
			opacity: 1;
			box-shadow: 0 0 10px rgba(217, 119, 6, 0.3);
		}
		50% { 
			opacity: 0.8;
			box-shadow: 0 0 20px rgba(217, 119, 6, 0.5);
		}
	}

	/* App Preview Card (Mobile - Foreground) */
	.app-preview {
		position: relative;
		z-index: 2;
		width: 100%;
		max-width: 320px;
		flex-shrink: 0;
		background: var(--mby-gradient-card);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--mby-radius-2xl);
		padding: var(--mby-space-xl);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
		box-shadow:
			0 25px 50px -12px rgba(0, 0, 0, 0.5),
			0 0 0 1px rgba(255, 255, 255, 0.1),
			0 0 60px -15px rgba(217, 119, 6, 0.25);
		animation: mobileFloat 5s ease-in-out infinite 0.5s;
		transition: transform 0.4s ease, box-shadow 0.4s ease;
	}

	.app-preview:hover {
		transform: translateY(-15px) scale(1.02);
		box-shadow:
			0 35px 70px -15px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 255, 255, 0.15),
			0 0 80px -10px rgba(217, 119, 6, 0.35);
	}

	@keyframes mobileFloat {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-8px); }
	}

	.app-header {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.app-greeting {
		font-size: 1.125rem;
		font-weight: 600;
		color: white;
	}

	.app-date {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
	}

	.app-main {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-xl) 0;
	}

	.app-label {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.app-amount {
		font-family: var(--mby-font-display);
		font-size: 3.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--mby-gold-400), var(--mby-orange-500), var(--mby-gold-400));
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		line-height: 1;
		animation: amountShine 3s ease-in-out infinite;
		text-shadow: 0 0 40px rgba(217, 119, 6, 0.3);
	}

	@keyframes amountShine {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	.app-sublabel {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: 0.8125rem;
		color: var(--mby-gold-400);
	}

	/* Mini Cards */
	.app-cards {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.mini-card {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-md);
		background: rgba(255, 255, 255, 0.05);
		border-radius: var(--mby-radius-lg);
		border: 1px solid rgba(255, 255, 255, 0.08);
		animation: slideInCard 0.6s ease-out backwards;
		transition: all 0.3s ease;
	}

	.mini-card:nth-child(1) { animation-delay: 0.8s; }
	.mini-card:nth-child(2) { animation-delay: 1s; }
	.mini-card:nth-child(3) { animation-delay: 1.2s; }

	.mini-card:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.15);
		transform: translateX(5px);
	}

	@keyframes slideInCard {
		from {
			opacity: 0;
			transform: translateX(-20px);
		}
	}

	.mini-card-icon {
		font-size: 1.5rem;
	}

	.mini-card-content {
		display: flex;
		flex-direction: column;
	}

	.mini-card-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: white;
	}

	.mini-card-value {
		font-size: 0.75rem;
		color: var(--mby-gold-400);
	}

	/* App CTA */
	.app-cta {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		background: var(--mby-gradient-green);
		border: none;
		border-radius: var(--mby-radius-lg);
		font-family: var(--mby-font-sans);
		font-size: 1rem;
		font-weight: 600;
		color: white;
		cursor: pointer;
		transition:
			transform var(--mby-transition-fast),
			box-shadow var(--mby-transition-fast);
	}

	.app-cta:hover {
		transform: translateY(-2px);
		box-shadow: var(--mby-shadow-glow);
	}

	/* Tangram Badges - Distribución orgánica ARRASTRABLES */
	.tangram-badges {
		position: absolute;
		inset: -60px -100px;
		pointer-events: none;
		z-index: 10;
	}

	.floating-badge {
		position: absolute;
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: 8px 14px;
		background: rgba(15, 23, 42, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--mby-radius-full);
		font-size: 0.75rem;
		font-weight: 500;
		color: white;
		white-space: nowrap;
		pointer-events: auto;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: grab;
		user-select: none;
	}

	.floating-badge:hover {
		background: rgba(30, 41, 59, 0.95);
		border-color: var(--mby-orange-400);
		transform: scale(1.05);
		box-shadow: 0 8px 30px rgba(217, 119, 6, 0.3);
	}

	.floating-badge:active,
	.floating-badge.dragging {
		cursor: grabbing;
		transform: scale(1.1);
		box-shadow: 0 12px 40px rgba(217, 119, 6, 0.4);
		z-index: 100;
	}

	.drag-hint {
		font-size: 0.7rem;
		opacity: 0.4;
		letter-spacing: -1px;
		margin-right: 2px;
	}

	.floating-badge:hover .drag-hint {
		opacity: 0.8;
		color: var(--mby-orange-400);
	}

	.floating-badge span:nth-child(2) {
		font-size: 1rem;
	}

	/* Posiciones Tangram - Distribución orgánica asimétrica */
	.tb-1 {
		top: 8%;
		left: 5%;
		transform: rotate(-8deg);
		animation: floatTangram1 5s ease-in-out infinite;
	}

	.tb-2 {
		top: 2%;
		left: 45%;
		transform: rotate(3deg);
		animation: floatTangram2 6s ease-in-out infinite 0.3s;
	}

	.tb-3 {
		top: 15%;
		right: 2%;
		transform: rotate(6deg);
		animation: floatTangram1 5.5s ease-in-out infinite 0.6s;
	}

	.tb-4 {
		top: 38%;
		left: -2%;
		transform: rotate(-4deg);
		animation: floatTangram2 4.8s ease-in-out infinite 0.9s;
	}

	.tb-5 {
		top: 45%;
		right: -1%;
		transform: rotate(5deg);
		animation: floatTangram1 5.2s ease-in-out infinite 1.2s;
	}

	.tb-6 {
		bottom: 28%;
		left: 8%;
		transform: rotate(-6deg);
		animation: floatTangram2 5.8s ease-in-out infinite 0.4s;
	}

	.tb-7 {
		bottom: 12%;
		left: 35%;
		transform: rotate(2deg);
		animation: floatTangram1 4.5s ease-in-out infinite 0.7s;
	}

	.tb-8 {
		bottom: 22%;
		right: 5%;
		transform: rotate(-3deg);
		animation: floatTangram2 5.3s ease-in-out infinite 1s;
	}

	.tb-9 {
		bottom: 5%;
		right: 25%;
		transform: rotate(4deg);
		animation: floatTangram1 6.2s ease-in-out infinite 0.2s;
	}

	@keyframes floatTangram1 {
		0%, 100% { 
			transform: translateY(0) rotate(var(--rotate, 0deg)); 
		}
		50% { 
			transform: translateY(-8px) rotate(calc(var(--rotate, 0deg) + 2deg)); 
		}
	}

	@keyframes floatTangram2 {
		0%, 100% { 
			transform: translateY(0) translateX(0); 
		}
		33% { 
			transform: translateY(-6px) translateX(4px); 
		}
		66% { 
			transform: translateY(4px) translateX(-3px); 
		}
	}

	/* Laptop Preview */
	.laptop-preview {
		position: relative;
		width: 280px;
		flex-shrink: 0;
		animation: deviceFloat 6.5s ease-in-out infinite 0.3s;
		transition: transform 0.4s ease, box-shadow 0.4s ease;
	}

	.laptop-preview:hover {
		transform: translateY(-8px);
	}

	.laptop-screen {
		background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%);
		border-radius: var(--mby-radius-lg) var(--mby-radius-lg) 0 0;
		padding: var(--mby-space-xs);
		border: 2px solid #333;
		border-bottom: none;
		box-shadow: 
			0 -15px 40px rgba(217, 119, 6, 0.1),
			inset 0 0 20px rgba(0, 0, 0, 0.3);
	}

	.laptop-header {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-xs) var(--mby-space-sm);
		background: rgba(0, 0, 0, 0.3);
		border-radius: var(--mby-radius-md) var(--mby-radius-md) 0 0;
	}

	.laptop-dots {
		display: flex;
		gap: 6px;
	}

	.laptop-dots span {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.laptop-dots span:nth-child(1) { background: #ff5f56; }
	.laptop-dots span:nth-child(2) { background: #ffbd2e; }
	.laptop-dots span:nth-child(3) { background: #27ca40; }

	.laptop-url {
		flex: 1;
		padding: 4px 12px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--mby-radius-sm);
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.6);
		font-family: monospace;
	}

	.laptop-content {
		display: grid;
		grid-template-columns: 180px 1fr;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		min-height: 200px;
	}

	.laptop-nav {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-xs) var(--mby-space-sm);
		border-radius: var(--mby-radius-md);
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		transition: all var(--mby-transition-fast);
	}

	.nav-item.active {
		background: var(--mby-gradient-primary);
		color: white;
	}

	.laptop-main {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--mby-space-sm);
	}

	.laptop-stat-card {
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: var(--mby-radius-md);
		padding: var(--mby-space-sm);
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.laptop-stat-label {
		font-size: 0.65rem;
		color: rgba(255, 255, 255, 0.5);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.laptop-stat-value {
		font-size: 1.1rem;
		font-weight: 700;
		color: var(--mby-gold-400);
	}

	.laptop-mini-chart {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		height: 30px;
		margin-top: auto;
	}

	.mini-bar {
		flex: 1;
		background: var(--mby-gradient-primary);
		border-radius: 2px;
		animation: growBar 1.5s ease-out backwards;
	}

	.mini-bar:nth-child(1) { height: 60%; animation-delay: 0.1s; }
	.mini-bar:nth-child(2) { height: 80%; animation-delay: 0.2s; }
	.mini-bar:nth-child(3) { height: 45%; animation-delay: 0.3s; }
	.mini-bar:nth-child(4) { height: 90%; animation-delay: 0.4s; }
	.mini-bar:nth-child(5) { height: 70%; animation-delay: 0.5s; }

	@keyframes growBar {
		from { height: 0; }
	}

	.laptop-base {
		height: 18px;
		background: linear-gradient(180deg, #444 0%, #222 100%);
		border-radius: 0 0 4px 4px;
		position: relative;
	}

	.laptop-base::before {
		content: '';
		position: absolute;
		top: 4px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 6px;
		background: #333;
		border-radius: 3px;
	}

	/* Scroll Indicator */
	.scroll-indicator {
		position: absolute;
		bottom: var(--mby-space-xl);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-sm);
		color: rgba(255, 255, 255, 0.5);
		font-size: 0.75rem;
	}

	.scroll-mouse {
		width: 24px;
		height: 38px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 12px;
		display: flex;
		justify-content: center;
		padding-top: 6px;
	}

	.scroll-wheel {
		width: 4px;
		height: 8px;
		background: var(--mby-gold-400);
		border-radius: 2px;
		animation: scrollWheel 1.5s ease-in-out infinite;
	}

	@keyframes scrollWheel {
		0%,
		100% {
			transform: translateY(0);
			opacity: 1;
		}
		50% {
			transform: translateY(8px);
			opacity: 0.3;
		}
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: var(--mby-space-3xl);
			text-align: center;
		}

		.hero-text {
			align-items: center;
		}

		.hero-subtitle {
			max-width: 100%;
		}

		.hero-ctas {
			justify-content: center;
		}

		.hero-trust {
			justify-content: center;
		}

		/* Tangram badges - tablet */
		.tangram-badges {
			inset: -30px -40px;
		}

		.floating-badge {
			font-size: 0.7rem;
			padding: 6px 10px;
		}

		/* Reposicionar para tablet */
		.tb-1 { top: 2%; left: 0%; }
		.tb-2 { top: -2%; left: 35%; }
		.tb-3 { top: 5%; right: -2%; }
		.tb-4 { top: 35%; left: -5%; }
		.tb-5 { top: 38%; right: -5%; }
		.tb-6 { bottom: 30%; left: 0%; }
		.tb-7 { bottom: 10%; left: 25%; }
		.tb-8 { bottom: 20%; right: 0%; }
		.tb-9 { bottom: 2%; right: 20%; }

		.hero-visual {
			flex-direction: column;
			align-items: center;
		}

		.devices-row {
			flex-direction: column;
			align-items: center;
		}

		.desktop-preview {
			width: 100%;
			max-width: 360px;
		}

		.laptop-preview {
			width: 100%;
			max-width: 320px;
		}

		.app-preview {
			max-width: 320px;
		}
	}

	@media (max-width: 640px) {
		.hero {
			padding-top: calc(70px + var(--mby-space-2xl));
		}

		.hero-ctas {
			flex-direction: column;
			width: 100%;
		}

		.hero-ctas .btn {
			width: 100%;
			justify-content: center;
		}

		/* Ocultar tangram badges en móvil */
		.tangram-badges {
			display: none;
		}

		.devices-row {
			display: none;
		}

		.app-amount {
			font-size: 2.75rem;
		}

		.desktop-preview,
		.laptop-preview {
			display: none;
		}

		.scroll-indicator {
			display: none;
		}
	}
</style>
