<!-- ═══════════════════════════════════════════════════════════════════════════
     🧠 HOW IT WORKS — Cómo Funciona (Reducción de Incertidumbre)
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - 3 pasos: Número mágico de Miller (procesamiento fácil)
     - Visualización: Reduce ansiedad ante lo desconocido
     - Números específicos: "2 minutos" genera confianza
     - Progresión visual: Sentido de movimiento hacia la meta
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { UserPlus, Settings, Sparkles, ArrowRight, Check } from 'lucide-svelte';

	const steps = [
		{
			number: '01',
			icon: UserPlus,
			title: 'Regístrate en 30 segundos',
			description: 'Solo necesitas tu email. Sin contraseñas complicadas, sin verificación de identidad.',
			details: ['Email o Google/Apple', 'Sin tarjeta de crédito', 'Datos 100% privados'],
			time: '30 seg'
		},
		{
			number: '02',
			icon: Settings,
			title: 'Configura tu quincena',
			description: 'Dinos cuándo te pagan, cuánto ganas, y cuáles son tus gastos fijos del mes.',
			details: ['Fecha de pago', 'Ingreso mensual', 'Gastos fijos (renta, luz, etc.)'],
			time: '2 min'
		},
		{
			number: '03',
			icon: Sparkles,
			title: 'Ve tu biyuyo disponible',
			description: 'La app te muestra exactamente cuánto puedes gastar HOY sin afectar tus compromisos.',
			details: ['Número claro y grande', 'Actualizado en tiempo real', 'Alertas inteligentes'],
			time: '¡Listo!'
		}
	];
</script>

<section class="how-section" id="how">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">Así de fácil</span>
			<h2 class="section-title">
				En 3 pasos tienes el control
			</h2>
			<p class="section-subtitle">
				Sin cursos de finanzas. Sin Excel complicado. Sin horas de configuración.
			</p>
		</div>

		<!-- Steps -->
		<div class="steps-container">
			{#each steps as step, index}
				<div class="step reveal" style="animation-delay: {index * 0.15}s">
					<!-- Step Number -->
					<div class="step-number-container">
						<span class="step-number">{step.number}</span>
						{#if index < steps.length - 1}
							<div class="step-connector">
								<ArrowRight size={20} />
							</div>
						{/if}
					</div>

					<!-- Step Card -->
					<div class="step-card">
						<div class="step-icon">
							<step.icon size={28} />
						</div>
						<h3 class="step-title">{step.title}</h3>
						<p class="step-description">{step.description}</p>

						<!-- Details -->
						<ul class="step-details">
							{#each step.details as detail}
								<li>
									<Check size={14} />
									<span>{detail}</span>
								</li>
							{/each}
						</ul>

						<!-- Time Badge -->
						<div class="step-time">
							<span>{step.time}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Result Preview -->
		<div class="result-preview reveal">
			<div class="result-content">
				<div class="result-text">
					<h3>Y después de esos 3 pasos...</h3>
					<p>
						Cada día, al abrir la app, verás <strong>UN SOLO NÚMERO</strong>: 
						lo que puedes gastar hoy tranquilamente. Sin culpa. Sin estrés.
						Con tus gastos fijos ya apartados.
					</p>
					<a href="/auth/register" class="btn btn-primary">
						Quiero probarlo
						<ArrowRight size={18} />
					</a>
				</div>
				<div class="result-visual">
					<div class="mini-phone">
						<div class="phone-notch"></div>
						<div class="phone-content">
							<span class="phone-label">Tu biyuyo hoy</span>
							<span class="phone-amount">$2,847</span>
							<span class="phone-status">✓ Gastos fijos apartados</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.how-section {
		padding: var(--mby-space-4xl) 0;
		background: linear-gradient(180deg, var(--mby-surface-1) 0%, var(--mby-surface-0) 100%);
	}

	/* Section Header */
	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mby-space-3xl);
	}

	.section-eyebrow {
		display: inline-block;
		font-size: 1.75rem;
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

	/* Steps Container */
	.steps-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-3xl);
	}

	.step {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	/* Step Number */
	.step-number-container {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.step-number {
		font-family: var(--mby-font-display);
		font-size: 2.5rem;
		font-weight: 800;
		background: linear-gradient(135deg, var(--mby-gold-400), var(--mby-gold-600));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.step-connector {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mby-gold-400);
		opacity: 0.8;
		transform: scale(2.5);
	}

	/* Step Card */
	.step-card {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		padding: var(--mby-space-xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-surface-3);
		box-shadow: var(--mby-shadow-sm);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base);
	}

	.step-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--mby-shadow-lg);
	}

	.step-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 56px;
		height: 56px;
		background: var(--mby-gold-50);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-primary-600);
	}

	.step-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--mby-text-primary);
	}

	.step-description {
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
		line-height: 1.6;
	}

	/* Step Details */
	.step-details {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.step-details li {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-size: 0.875rem;
		color: var(--mby-text-secondary);
	}

	.step-details li :global(svg) {
		color: var(--mby-primary-500);
		flex-shrink: 0;
	}

	/* Step Time */
	.step-time {
		margin-top: auto;
		padding-top: var(--mby-space-md);
		border-top: 1px solid var(--mby-surface-3);
	}

	.step-time span {
		display: inline-block;
		padding: var(--mby-space-xs) var(--mby-space-sm);
		background: var(--mby-gold-100);
		color: var(--mby-gold-700);
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: var(--mby-radius-sm);
	}

	/* Result Preview */
	.result-preview {
		background: var(--mby-gradient-hero);
		border-radius: var(--mby-radius-2xl);
		padding: var(--mby-space-3xl);
		overflow: hidden;
	}

	.result-content {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--mby-space-3xl);
		align-items: center;
	}

	.result-text {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	.result-text h3 {
		font-size: 1.75rem;
		color: white;
	}

	.result-text p {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.7;
		max-width: 480px;
	}

	.result-text strong {
		color: var(--mby-gold-400);
	}

	/* Mini Phone */
	.mini-phone {
		width: 200px;
		height: 300px;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 32px;
		padding: var(--mby-space-md);
		display: flex;
		flex-direction: column;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.phone-notch {
		width: 80px;
		height: 24px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 0 0 12px 12px;
		margin: 0 auto var(--mby-space-lg);
	}

	.phone-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-sm);
		text-align: center;
	}

	.phone-label {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.phone-amount {
		font-family: var(--mby-font-display);
		font-size: 2.5rem;
		font-weight: 800;
		color: var(--mby-gold-400);
		text-shadow: 0 0 20px rgba(249, 115, 22, 0.5);
	}

	.phone-status {
		font-size: 0.6875rem;
		color: var(--mby-gold-400);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.steps-container {
			grid-template-columns: 1fr;
			gap: var(--mby-space-xl);
		}

		.step-connector {
			display: none;
		}

		.result-content {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.result-text p {
			max-width: 100%;
		}

		.result-text .btn {
			margin: 0 auto;
		}

		.mini-phone {
			margin: 0 auto;
		}
	}
</style>
