<!-- ═══════════════════════════════════════════════════════════════════════════
     💰 PRICING — Precios Transparentes
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Ancla de precio: Mostrar el PRO primero para que GRATIS se vea increíble
     - Comparación visual: Facilita la decisión
     - "Gratis para siempre": Elimina miedo a comprometerse
     - Garantía: Reduce riesgo percibido
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Check, X, Sparkles, Crown, Building2, ArrowRight } from 'lucide-svelte';

	// Estado para toggle mensual/anual
	let isAnnual = $state(false);

	// Tipo para las features
	interface Feature {
		text: string;
		included: boolean;
		highlight?: boolean;
	}

	// Precios base
	const basePrices = {
		gratis: 0,
		pro: 29,
		negocio: 99
	};

	// Calcular precios según período
	// Precios derivados con descuento anual del 20%
	const proPrice = $derived(isAnnual ? `$${Math.round(basePrices.pro * 0.8)}` : `$${basePrices.pro}`);
	const negocioPrice = $derived(isAnnual ? `$${Math.round(basePrices.negocio * 0.8)}` : `$${basePrices.negocio}`);
	const proPeriod = $derived(isAnnual ? '/mes (facturado anual)' : '/mes');
	const negocioPeriod = $derived(isAnnual ? '/mes (facturado anual)' : '/mes');

	// Planes estáticos (las features no cambian)
	const plansData: {
		name: string;
		priceKey: 'gratis' | 'pro' | 'negocio';
		period: string;
		description: string;
		cta: string;
		ctaVariant: string;
		icon: typeof Sparkles;
		popular: boolean;
		features: Feature[];
	}[] = [
		{
			name: 'Gratis',
			priceKey: 'gratis' as const,
			period: 'para siempre',
			description: 'Todo lo esencial para empezar a controlar tu dinero.',
			cta: 'Empezar gratis',
			ctaVariant: 'secondary',
			icon: Sparkles,
			popular: false,
			features: [
				{ text: 'Tu Biyuyo Hoy (número central)', included: true },
				{ text: 'Config quincenal/semanal/mensual', included: true },
				{ text: 'Apartados automáticos (ilimitados)', included: true },
				{ text: 'Registro de gastos 1-tap', included: true },
				{ text: 'Detector de gastos hormiga', included: true },
				{ text: 'Alertas inteligentes', included: true },
				{ text: 'PWA instalable (offline)', included: true },
				{ text: 'Modo oscuro', included: true },
				{ text: 'Las 18 features base', included: true },
				{ text: 'Reportes avanzados', included: false },
				{ text: 'Modo familiar (multi-usuario)', included: false },
				{ text: 'Conexión bancaria automática', included: false },
				{ text: 'Soporte prioritario', included: false }
			]
		},
		{
			name: 'Pro',
			priceKey: 'pro' as const,
			period: '', // Se calcula dinámicamente
			description: 'Para quienes quieren ir más allá y automatizar todo.',
			cta: 'Probar Pro gratis 14 días',
			ctaVariant: 'primary',
			icon: Crown,
			popular: true,
			features: [
				{ text: 'Todo lo de Gratis', included: true, highlight: true },
				{ text: 'Reportes avanzados con gráficas', included: true },
				{ text: 'Modo familiar (hasta 5 usuarios)', included: true },
				{ text: 'Categorías personalizadas', included: true },
				{ text: 'Exportar a Excel/PDF', included: true },
				{ text: 'Metas de ahorro ilimitadas', included: true },
				{ text: 'Predicción de gastos con IA', included: true },
				{ text: 'Widgets para celular', included: true },
				{ text: 'Sin publicidad', included: true },
				{ text: 'Soporte por chat', included: true },
				{ text: 'Conexión bancaria automática', included: false },
				{ text: 'Facturación y SAT', included: false },
				{ text: 'API para integraciones', included: false }
			]
		},
		{
			name: 'Negocio',
			priceKey: 'negocio' as const,
			period: '', // Se calcula dinámicamente
			description: 'Para freelancers y pequeños negocios que necesitan facturar.',
			cta: 'Contactar ventas',
			ctaVariant: 'secondary',
			icon: Building2,
			popular: false,
			features: [
				{ text: 'Todo lo de Pro', included: true, highlight: true },
				{ text: 'Conexión bancaria automática', included: true },
				{ text: 'Facturación CFDI integrada', included: true },
				{ text: 'Descarga de facturas del SAT', included: true },
				{ text: 'Separación personal/negocio', included: true },
				{ text: 'Reportes fiscales (ISR, IVA)', included: true },
				{ text: 'API para integraciones', included: true },
				{ text: 'Usuarios ilimitados', included: true },
				{ text: 'Soporte prioritario 24/7', included: true },
				{ text: 'Onboarding personalizado', included: true },
				{ text: 'Backup dedicado', included: true },
				{ text: 'SLA garantizado', included: true },
				{ text: 'Contador asignado (próximamente)', included: false }
			]
		}
	];

	// Helper para obtener precio y período según el plan
	function getPlanPrice(priceKey: 'gratis' | 'pro' | 'negocio'): string {
		if (priceKey === 'gratis') return '$0';
		if (priceKey === 'pro') return proPrice;
		return negocioPrice;
	}

	function getPlanPeriod(priceKey: 'gratis' | 'pro' | 'negocio'): string {
		if (priceKey === 'gratis') return 'para siempre';
		if (priceKey === 'pro') return proPeriod;
		return negocioPeriod;
	}
</script>

<section class="pricing-section" id="pricing">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">Precios claros</span>
			<h2 class="section-title">
				Empieza gratis, crece cuando quieras
			</h2>
			<p class="section-subtitle">
				Sin trucos, sin letras chiquitas. Las 18 características base son gratis para siempre.
			</p>
			
			<!-- Toggle Mensual/Anual Funcional -->
			<div class="pricing-toggle animate-fade-in-up" style="animation-delay: 0.2s">
				<span class="toggle-label" class:active={!isAnnual}>Mensual</span>
				<button 
					class="toggle-switch" 
					class:active={isAnnual}
					onclick={() => isAnnual = !isAnnual}
					aria-label="Cambiar entre facturación mensual y anual"
				>
					<div class="toggle-knob"></div>
				</button>
				<span class="toggle-label" class:active={isAnnual}>
					Anual <span class="discount-badge">-20%</span>
				</span>
			</div>
		</div>

		<!-- Pricing Cards -->
		<div class="pricing-grid">
			{#each plansData as plan, index}
				<div class="pricing-card reveal card-3d" class:popular={plan.popular} style="animation-delay: {index * 0.1}s">
					{#if plan.popular}
						<div class="popular-badge animate-pulse-soft">
							<Crown size={14} />
							Más popular
						</div>
					{/if}

					<div class="pricing-header">
						<div class="plan-icon" class:popular={plan.popular}>
							<plan.icon size={24} />
						</div>
						<h3 class="plan-name">{plan.name}</h3>
						<div class="plan-price">
							<span class="price">{getPlanPrice(plan.priceKey)}</span>
							<span class="period">{getPlanPeriod(plan.priceKey)}</span>
						</div>
						<p class="plan-description">{plan.description}</p>
					</div>

					<ul class="features-list">
						{#each plan.features as feature}
							<li class:included={feature.included} class:highlight={feature.highlight}>
								{#if feature.included}
									<Check size={16} />
								{:else}
									<X size={16} />
								{/if}
								<span>{feature.text}</span>
							</li>
						{/each}
					</ul>

					<a
						href={plan.name === 'Negocio' ? '/contacto' : '/auth/register'}
						class="btn {plan.ctaVariant === 'primary' ? 'btn-primary btn-shine' : 'btn-outline'} magnetic"
					>
						{plan.cta}
						<ArrowRight size={16} />
					</a>
				</div>
			{/each}
		</div>

		<!-- Guarantee -->
		<div class="guarantee reveal">
			<div class="guarantee-icon">🛡️</div>
			<div class="guarantee-content">
				<h4>Garantía de satisfacción de 30 días</h4>
				<p>
					Si no estás 100% satisfecho con Pro o Negocio, te devolvemos tu dinero. Sin preguntas.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	.pricing-section {
		padding: var(--mby-space-4xl) 0;
		background: linear-gradient(180deg, var(--mby-surface-0) 0%, var(--mby-surface-1) 100%);
	}

	/* Section Header */
	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mby-space-3xl);
	}

	.section-eyebrow {
		display: inline-block;
		font-size: 0.875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--mby-primary-600);
		margin-bottom: var(--mby-space-md);
	}

	.section-title {
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-md);
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--mby-text-secondary);
		line-height: 1.7;
	}

	/* Pricing Grid */
	.pricing-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-3xl);
		align-items: start;
	}

	/* Pricing Card */
	.pricing-card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
		padding: var(--mby-space-xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-surface-3);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base);
	}

	.pricing-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--mby-shadow-lg);
	}

	.pricing-card.popular {
		border-color: var(--mby-gold-400);
		box-shadow: var(--mby-shadow-gold);
		transform: scale(1.02);
		z-index: 1;
	}

	.pricing-card.popular:hover {
		transform: scale(1.02) translateY(-4px);
	}

	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-xs) var(--mby-space-md);
		background: var(--mby-gradient-green);
		color: var(--mby-text-inverse);
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: var(--mby-radius-full);
		box-shadow: var(--mby-shadow-md);
	}

	/* Pricing Header */
	.pricing-header {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.plan-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: var(--mby-surface-2);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-text-secondary);
	}

	.plan-icon.popular {
		background: var(--mby-gradient-green);
		color: var(--mby-text-inverse);
		box-shadow: var(--mby-shadow-glow);
	}

	.plan-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	.plan-price {
		display: flex;
		align-items: baseline;
		gap: var(--mby-space-xs);
	}

	.price {
		font-family: var(--mby-font-display);
		font-size: 3rem;
		font-weight: 800;
		color: var(--mby-text-primary);
	}

	.period {
		font-size: 1rem;
		color: var(--mby-text-secondary);
	}

	.plan-description {
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
		text-align: center;
	}

	/* Features List */
	.features-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
		flex: 1;
	}

	.features-list li {
		display: flex;
		align-items: flex-start;
		gap: var(--mby-space-sm);
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
	}

	.features-list li.included {
		color: var(--mby-text-primary);
	}

	.features-list li.included :global(svg) {
		color: var(--mby-gold-500);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.features-list li:not(.included) {
		opacity: 0.5;
	}

	.features-list li:not(.included) :global(svg) {
		color: var(--mby-text-muted);
		flex-shrink: 0;
		margin-top: 2px;
	}

	.features-list li.highlight {
		font-weight: 600;
		color: var(--mby-gold-600);
	}

	/* Toggle Switch */
	.pricing-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		margin-top: var(--mby-space-lg);
	}

	.toggle-label {
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--mby-text-secondary);
		transition: color var(--mby-transition-fast);
	}

	.toggle-label.active {
		color: var(--mby-text-primary);
		font-weight: 600;
	}

	.toggle-switch {
		width: 52px;
		height: 28px;
		background: var(--mby-surface-3);
		border-radius: 14px;
		position: relative;
		cursor: pointer;
		border: none;
		transition: background var(--mby-transition-fast);
	}

	.toggle-switch:hover {
		background: var(--mby-orange-200);
	}

	.toggle-switch.active {
		background: var(--mby-orange-500);
	}

	.toggle-knob {
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		position: absolute;
		top: 3px;
		left: 3px;
		box-shadow: var(--mby-shadow-sm);
		transition: transform var(--mby-transition-bounce);
	}

	.toggle-switch.active .toggle-knob {
		transform: translateX(24px);
	}

	.discount-badge {
		display: inline-block;
		padding: 2px 6px;
		background: var(--mby-gold-100);
		color: var(--mby-gold-700);
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: var(--mby-radius-full);
		margin-left: 4px;
		vertical-align: middle;
	}

	/* CTA Button */
	.pricing-card .btn {
		width: 100%;
		justify-content: center;
	}

	.btn-outline {
		background: transparent;
		color: var(--mby-text-primary);
		border: 2px solid var(--mby-surface-3);
	}

	.btn-outline:hover {
		border-color: var(--mby-orange-500);
		color: var(--mby-orange-600);
		background: var(--mby-orange-50);
	}

	/* Guarantee */
	.guarantee {
		display: flex;
		align-items: center;
		gap: var(--mby-space-lg);
		padding: var(--mby-space-xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-xl);
		border: 2px dashed var(--mby-surface-3);
		max-width: 640px;
		margin: 0 auto;
	}

	.guarantee-icon {
		font-size: 3rem;
		flex-shrink: 0;
	}

	.guarantee-content h4 {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
	}

	.guarantee-content p {
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.pricing-grid {
			grid-template-columns: 1fr;
			max-width: 400px;
			margin-left: auto;
			margin-right: auto;
		}

		.pricing-card.popular {
			transform: none;
			order: -1;
		}

		.pricing-card.popular:hover {
			transform: translateY(-4px);
		}
	}

	@media (max-width: 640px) {
		.guarantee {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
