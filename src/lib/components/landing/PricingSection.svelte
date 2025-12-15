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
	import { t } from '$lib/i18n/index.svelte';
	import { translations } from '$lib/i18n/translations';

	let isAnnual = $state(false);

	const basePrices = {
		free: 0,
		pro: 29,
		business: 149
	};

	const freePrice = '$0';
	const proPrice = $derived(isAnnual ? `$${Math.round(basePrices.pro * 0.8)}` : `$${basePrices.pro}`);
	const businessPrice = $derived(isAnnual ? `$${Math.round(basePrices.business * 0.8)}` : `$${basePrices.business}`);

	const fallbackPlanDescriptions = translations.en.pricing.planDescriptions!;
	const fallbackFeatures = translations.en.pricing.features!;

	type PlanId = 'free' | 'pro' | 'business';
	type FeatureKey = keyof typeof fallbackFeatures;
	type CtaKey = 'getStarted' | 'tryFree' | 'contactSales';

	interface PlanFeature {
		key: FeatureKey;
		included: boolean;
		highlight?: boolean;
	}

	interface PlanConfig {
		id: PlanId;
		icon: typeof Sparkles;
		popular: boolean;
		ctaVariant: 'primary' | 'secondary';
		ctaKey: CtaKey;
		ctaHref: string;
		features: PlanFeature[];
	}

	const plansConfig: PlanConfig[] = [
		{
			id: 'free',
			icon: Sparkles,
			popular: false,
			ctaVariant: 'secondary',
			ctaKey: 'getStarted',
			ctaHref: '/auth/register',
			features: [
				{ key: 'biyuyoToday', included: true },
				{ key: 'frequencyConfig', included: true },
				{ key: 'autoSavings', included: true },
				{ key: 'quickExpense', included: true },
				{ key: 'spendingDetector', included: true },
				{ key: 'manualTracking', included: true },
				{ key: 'pwaOffline', included: true },
				{ key: 'darkMode', included: true },
				{ key: 'baseFeatures', included: true },
				{ key: 'customCategories', included: true },
				{ key: 'notesTags', included: true },
				{ key: 'unlimitedGoals', included: true },
				{ key: 'export', included: true },
				{ key: 'mobileWidgets', included: true },
				{ key: 'noAds', included: true },
				{ key: 'familyMode', included: true },
				{ key: 'advancedReportsCharts', included: true },
				{ key: 'communitySupport', included: true }
			]
		},
		{
			id: 'pro',
			icon: Crown,
			popular: true,
			ctaVariant: 'primary',
			ctaKey: 'tryFree',
			ctaHref: '/auth/register',
			features: [
				{ key: 'everythingInFree', included: true, highlight: true },
				{ key: 'cloudBackups', included: true },
				{ key: 'emailAlerts', included: true },
				{ key: 'premiumExports', included: true },
				{ key: 'priorityEmailSupport', included: true }
			]
		},
		{
			id: 'business',
			icon: Building2,
			popular: false,
			ctaVariant: 'secondary',
			ctaKey: 'contactSales',
			ctaHref: '/contacto',
			features: [
				{ key: 'everythingInPro', included: true, highlight: true },
				{ key: 'bankSync', included: true },
				{ key: 'satConciliation', included: true },
				{ key: 'invoicingSat', included: true },
				{ key: 'cfdiIntegration', included: true },
				{ key: 'satDownloads', included: true },
				{ key: 'personalBusiness', included: true },
				{ key: 'taxReports', included: true },
				{ key: 'apiIntegrations', included: true },
				{ key: 'whatsappSupport', included: true },
				{ key: 'unlimitedUsers', included: true },
				{ key: 'dedicatedBackup', included: true },
				{ key: 'sla', included: true },
				{ key: 'assignedAccountant', included: false }
			]
		}
	];

	type BasePricingCopy = typeof translations.en.pricing;
	type PricingCopy = Omit<BasePricingCopy, 'planDescriptions' | 'features'> & {
		planDescriptions: typeof fallbackPlanDescriptions;
		features: typeof fallbackFeatures;
	};

	const pricingCopy = $derived.by((): PricingCopy => {
		const current = t().pricing;
		return {
			...translations.en.pricing,
			...current,
			planDescriptions: {
				...fallbackPlanDescriptions,
				...(current.planDescriptions ?? {})
			},
			features: {
				...fallbackFeatures,
				...(current.features ?? {})
			}
		};
	});

	function getPlanPrice(planId: PlanId): string {
		if (planId === 'free') return freePrice;
		return planId === 'pro' ? proPrice : businessPrice;
	}

	function getPlanPeriod(planId: PlanId): string {
		if (planId === 'free') return pricingCopy.freePeriod;
		return isAnnual ? pricingCopy.periodAnnual : pricingCopy.periodMonthly;
	}
</script>

<section class="pricing-section" id="pricing">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">{pricingCopy.sectionEyebrow}</span>
			<h2 class="section-title">{pricingCopy.title}</h2>
			<p class="section-subtitle">{pricingCopy.subtitle}</p>

			<!-- Toggle Mensual/Anual Funcional -->
			<div class="pricing-toggle animate-fade-in-up" style="animation-delay: 0.2s">
				<span class="toggle-label" class:active={!isAnnual}>{pricingCopy.monthly}</span>
				<button 
					class="toggle-switch" 
					class:active={isAnnual}
					onclick={() => isAnnual = !isAnnual}
					aria-label={pricingCopy.toggleAria}
				>
					<div class="toggle-knob"></div>
				</button>
				<span class="toggle-label" class:active={isAnnual}>
					{pricingCopy.annual} <span class="discount-badge">{pricingCopy.discount}</span>
				</span>
			</div>
		</div>

		<!-- Pricing Cards -->
		<div class="pricing-grid">
			{#each plansConfig as plan, index}
				<div class="pricing-card reveal card-3d" class:popular={plan.popular} style="animation-delay: {index * 0.1}s">
					{#if plan.popular}
						<div class="popular-badge animate-pulse-soft">
							<Crown size={14} />
							{pricingCopy.popular}
						</div>
					{/if}

					<div class="pricing-header">
						<div class="plan-icon" class:popular={plan.popular}>
							<plan.icon size={24} />
						</div>
						<h3 class="plan-name">{pricingCopy[plan.id]}</h3>
						<div class="plan-price">
							<span class="price">{getPlanPrice(plan.id)}</span>
							<span class="period">{getPlanPeriod(plan.id)}</span>
						</div>
						<p class="plan-description">{pricingCopy.planDescriptions[plan.id]}</p>
					</div>

					<ul class="features-list">
						{#each plan.features as feature}
							<li class:included={feature.included} class:highlight={feature.highlight}>
								{#if feature.included}
									<Check size={16} />
								{:else}
									<X size={16} />
								{/if}
								<span>{pricingCopy.features[feature.key]}</span>
							</li>
						{/each}
					</ul>

					<a
						href={plan.ctaHref}
						class="btn {plan.ctaVariant === 'primary' ? 'btn-primary btn-shine' : 'btn-outline'} magnetic"
					>
						{pricingCopy[plan.ctaKey]}
						<ArrowRight size={16} />
					</a>
				</div>
			{/each}
		</div>

		<!-- Guarantee -->
		<div class="guarantee reveal">
			<div class="guarantee-icon">🛡️</div>
			<div class="guarantee-content">
				<h4>{pricingCopy.guarantee.title}</h4>
				<p>{pricingCopy.guarantee.description}</p>
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
