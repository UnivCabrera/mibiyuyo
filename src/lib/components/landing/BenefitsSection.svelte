<!-- ═══════════════════════════════════════════════════════════════════════════
     🏆 BENEFITS — Beneficios Transformacionales
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Beneficios vs Features: Apela a emociones (qué SIENTES, no qué hace)
     - Contraste Antes/Después: Visualización de transformación
     - Números específicos: Credibilidad y tangibilidad
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { TrendingDown, Brain, Clock, Heart, Wallet, Shield } from 'lucide-svelte';

	const benefits = [
		{
			icon: Brain,
			title: 'Claridad mental',
			before: 'Estrés constante por el dinero',
			after: 'Sabes exactamente cuánto puedes gastar',
			stat: '87%',
			statLabel: 'menos ansiedad financiera'
		},
		{
			icon: TrendingDown,
			title: 'Gastos bajo control',
			before: 'Gastos hormiga invisibles',
			after: 'Detectas y reduces gastos innecesarios',
			stat: '-30%',
			statLabel: 'en gastos innecesarios'
		},
		{
			icon: Wallet,
			title: 'Dinero que sobra',
			before: 'Quincena a quincena sin ahorrar',
			after: 'Ahorro automático cada mes',
			stat: '+$4,200',
			statLabel: 'ahorrados al mes en promedio'
		},
		{
			icon: Clock,
			title: 'Tiempo recuperado',
			before: 'Horas en Excel o calculando',
			after: '10 segundos para registrar un gasto',
			stat: '2 min',
			statLabel: 'al día máximo'
		},
		{
			icon: Heart,
			title: 'Paz financiera',
			before: 'Evitar revisar la cuenta',
			after: 'Abres la app con confianza',
			stat: '93%',
			statLabel: 'se sienten más tranquilos'
		},
		{
			icon: Shield,
			title: 'Control total',
			before: 'No confiar en apps con tus datos',
			after: 'Tus datos son tuyos, siempre',
			stat: '100%',
			statLabel: 'privacidad garantizada'
		}
	];
</script>

<section class="benefits-section" id="benefits">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">El cambio real</span>
			<h2 class="section-title">
				Lo que vas a sentir usando mibiyuyo
			</h2>
			<p class="section-subtitle">
				No es solo una app de finanzas. Es la tranquilidad de saber que tu dinero está bajo control.
			</p>
		</div>

		<!-- Benefits Grid -->
		<div class="benefits-grid">
			{#each benefits as benefit, index}
				<div class="benefit-card reveal" style="animation-delay: {index * 0.1}s">
					<div class="benefit-icon">
						<benefit.icon size={24} />
					</div>

					<h3 class="benefit-title">{benefit.title}</h3>

					<div class="benefit-comparison">
						<div class="comparison-before">
							<span class="comparison-label">Antes</span>
							<p>{benefit.before}</p>
						</div>
						<div class="comparison-arrow">→</div>
						<div class="comparison-after">
							<span class="comparison-label">Después</span>
							<p>{benefit.after}</p>
						</div>
					</div>

					<div class="benefit-stat">
						<span class="stat-value">{benefit.stat}</span>
						<span class="stat-label">{benefit.statLabel}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.benefits-section {
		padding: var(--mby-space-4xl) 0;
		background: var(--mby-surface-0);
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

	/* Benefits Grid */
	.benefits-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
	}

	.benefit-card {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		padding: var(--mby-space-xl);
		background: var(--mby-surface-1);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-surface-3);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base);
	}

	.benefit-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--mby-shadow-lg);
	}

	.benefit-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--mby-gradient-green);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-text-inverse);
		box-shadow: var(--mby-shadow-glow);
	}

	.benefit-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	/* Comparison */
	.benefit-comparison {
		display: flex;
		align-items: stretch;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-lg);
	}

	.comparison-before,
	.comparison-after {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.comparison-label {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.comparison-before .comparison-label {
		color: var(--mby-orange-500);
	}

	.comparison-after .comparison-label {
		color: var(--mby-gold-600);
	}

	.comparison-before p,
	.comparison-after p {
		font-size: 0.8125rem;
		line-height: 1.4;
		color: var(--mby-text-secondary);
	}

	.comparison-before p {
		text-decoration: line-through;
		opacity: 0.7;
	}

	.comparison-after p {
		color: var(--mby-text-primary);
		font-weight: 500;
	}

	.comparison-arrow {
		display: flex;
		align-items: center;
		color: var(--mby-gold-500);
		font-size: 1.25rem;
		padding: 0 var(--mby-space-xs);
	}

	/* Stat */
	.benefit-stat {
		display: flex;
		align-items: baseline;
		gap: var(--mby-space-sm);
		padding-top: var(--mby-space-md);
		border-top: 1px solid var(--mby-surface-3);
		margin-top: auto;
	}

	.stat-value {
		font-family: var(--mby-font-display);
		font-size: 1.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--mby-gold-500), var(--mby-orange-500));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.stat-label {
		font-size: 0.8125rem;
		color: var(--mby-text-secondary);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.benefits-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.benefits-grid {
			grid-template-columns: 1fr;
		}

		.benefit-comparison {
			flex-direction: column;
		}

		.comparison-arrow {
			transform: rotate(90deg);
			justify-content: center;
		}
	}
</style>
