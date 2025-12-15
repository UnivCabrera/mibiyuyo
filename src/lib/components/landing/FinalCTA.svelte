<!-- ═══════════════════════════════════════════════════════════════════════════
     🚀 FINAL CTA — Llamada a la Acción Final
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Repetición del CTA: Refuerza la acción deseada
     - Urgencia suave: Sin ser agresivo ni manipulador
     - Resumen de valor: Recuerda beneficios clave
     - Diseño impactante: Cierra con fuerza visual
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { ArrowRight, Check, Sparkles } from 'lucide-svelte';

	const highlights = [
		'18 características gratis',
		'Sin tarjeta de crédito',
		'Configuración en 2 minutos',
		'Datos 100% privados'
	];
</script>

<section class="final-cta-section">
	<div class="bg-effects">
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
	</div>

	<div class="container">
		<div class="cta-content reveal">
			<div class="cta-badge animate-bounce-subtle">
				<Sparkles size={16} />
				<span>Empieza hoy</span>
			</div>

			<h2 class="cta-title">
				¿Listo para saber cuánto puedes gastar
				<span class="text-gradient-animated">HOY</span>?
			</h2>

			<p class="cta-subtitle">
				Únete a miles de mexicanos que ya dejaron de vivir quincena a quincena.
				Tu futuro financiero empieza con un simple paso.
			</p>

			<div class="cta-highlights">
				{#each highlights as highlight}
					<div class="highlight-item">
						<Check size={16} />
						<span>{highlight}</span>
					</div>
				{/each}
			</div>

			<div class="cta-buttons">
				<a href="/auth/register" class="btn btn-primary btn-lg cta-main btn-shine animate-glow-pulse">
					Crear cuenta gratis
					<ArrowRight size={20} />
				</a>
			</div>

			<p class="cta-note">
				Sin compromisos. Cancela cuando quieras.
			</p>
		</div>
	</div>
</section>

<style>
	.final-cta-section {
		position: relative;
		padding: var(--mby-space-4xl) 0;
		background: var(--mby-gradient-hero);
		overflow: hidden;
	}

	/* Background Effects */
	.bg-effects {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(100px);
		opacity: 0.4;
	}

	.orb-1 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, var(--mby-orange-500) 0%, transparent 70%);
		top: -100px;
		left: -100px;
		animation: float-slow 8s ease-in-out infinite, morph 12s ease-in-out infinite;
	}

	.orb-2 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--mby-primary-500) 0%, transparent 70%);
		bottom: -100px;
		right: -100px;
		animation: float-slow 10s ease-in-out infinite reverse, morph 15s ease-in-out infinite reverse;
	}

	/* Content */
	.cta-content {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		max-width: 720px;
		margin: 0 auto;
	}

	.cta-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: rgba(234, 179, 8, 0.2);
		border: 1px solid rgba(234, 179, 8, 0.4);
		border-radius: var(--mby-radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--mby-gold-400);
		margin-bottom: var(--mby-space-lg);
	}

	.cta-title {
		font-size: clamp(2rem, 4vw + 0.5rem, 3rem);
		color: white;
		margin-bottom: var(--mby-space-md);
		line-height: 1.2;
	}

	.cta-subtitle {
		font-size: 1.25rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.7;
		margin-bottom: var(--mby-space-xl);
	}

	/* Highlights */
	.cta-highlights {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--mby-space-md) var(--mby-space-lg);
		margin-bottom: var(--mby-space-xl);
	}

	.highlight-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: 0.9375rem;
		color: rgba(255, 255, 255, 0.8);
	}

	.highlight-item :global(svg) {
		color: var(--mby-gold-400);
	}

	/* Buttons */
	.cta-buttons {
		display: flex;
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-lg);
	}

	.cta-main {
		font-size: 1.125rem;
		padding: var(--mby-space-lg) var(--mby-space-2xl);
	}

	.cta-note {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.5);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.cta-highlights {
			flex-direction: column;
			align-items: center;
		}

		.cta-buttons {
			width: 100%;
		}

		.cta-main {
			width: 100%;
			justify-content: center;
		}
	}
</style>
