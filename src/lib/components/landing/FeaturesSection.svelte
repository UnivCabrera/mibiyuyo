<!-- ═══════════════════════════════════════════════════════════════════════════
     ✨ FEATURES — Las 18 Características Gratuitas
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Número específico (18): Principio de concreción
     - "Gratis": Elimina barrera de entrada (reciprocidad)
     - Iconos + Texto corto: Reduce carga cognitiva
     - Agrupación visual: Ley de proximidad (Gestalt)
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import {
		Wallet,
		Calendar,
		PiggyBank,
		TrendingUp,
		Bell,
		Shield,
		Smartphone,
		Target,
		LineChart,
		Receipt,
		Users,
		Zap,
		Lock,
		RefreshCw,
		Clock,
		Star,
		Gift,
		Sparkles
	} from 'lucide-svelte';

	const features = [
		{
			icon: Wallet,
			title: 'Tu Biyuyo Hoy',
			description: 'Número único que te dice cuánto puedes gastar HOY sin afectar tus gastos fijos.',
			highlight: true,
			animation: 'animate-pulse-soft'
		},
		{
			icon: Calendar,
			title: 'Config Quincenal',
			description: 'Configura tus fechas de pago (quincenal, semanal, mensual) y olvídate del estrés.'
		},
		{
			icon: PiggyBank,
			title: 'Apartados Fijos',
			description: 'La app aparta automáticamente renta, luz, teléfono. Ese dinero "no existe".'
		},
		{
			icon: Receipt,
			title: 'Registro 1-Tap',
			description: 'Registra gastos en 1 segundo. Sin categorías complicadas, solo el monto.'
		},
		{
			icon: TrendingUp,
			title: 'Gastos Hormiga',
			description: 'Detecta esos pequeños gastos que suman miles al mes sin que te des cuenta.'
		},
		{
			icon: Bell,
			title: 'Alertas Inteligentes',
			description: 'Te avisamos cuando estás por pasarte del presupuesto. Sin sermones.'
		},
		{
			icon: Shield,
			title: 'Privacidad Total',
			description: 'Tus datos nunca se venden. Encriptación de grado bancario.'
		},
		{
			icon: Smartphone,
			title: 'PWA Instalable',
			description: 'Instálala como app en tu celular. Sin tienda de apps, funciona offline.'
		},
		{
			icon: Target,
			title: 'Metas de Ahorro',
			description: 'Define metas visuales y ve tu progreso día a día.'
		},
		{
			icon: LineChart,
			title: 'Reportes Simples',
			description: 'Gráficas que se entienden a la primera. Nada de terminología financiera.'
		},
		{
			icon: Users,
			title: 'Modo Familiar',
			description: 'Comparte gastos con tu pareja o roomies de forma transparente.'
		},
		{
			icon: Zap,
			title: 'Sync Automático',
			description: 'Tus datos sincronizados en todos tus dispositivos al instante.'
		},
		{
			icon: Lock,
			title: 'Acceso Biométrico',
			description: 'Entra con huella o Face ID. Rápido y seguro.'
		},
		{
			icon: RefreshCw,
			title: 'Recurrentes Auto',
			description: 'Netflix, Spotify, gym... se registran solos cada mes.'
		},
		{
			icon: Clock,
			title: 'Historial Completo',
			description: 'Ve todos tus gastos pasados organizados por fecha.'
		},
		{
			icon: Star,
			title: 'Logros y Streaks',
			description: 'Gamificación que te motiva a mantener buenos hábitos.'
		},
		{
			icon: Gift,
			title: 'Propinas al Equipo',
			description: 'Si te gusta la app, puedes darnos propina voluntaria. Sin presión.'
		},
		{
			icon: Sparkles,
			title: 'Modo Oscuro',
			description: 'Cuida tus ojos de noche con el tema oscuro automático.'
		}
	];
</script>

<section class="features-section" id="features">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">Lo que incluye GRATIS</span>
			<h2 class="section-title">
				<span class="number-badge">18</span> características sin pagar un peso
			</h2>
			<p class="section-subtitle">
				Las primeras 3 versiones de mibiyuyo son completamente gratuitas. 
				Sin trucos, sin "versión de prueba", sin tarjeta de crédito.
			</p>
		</div>

		<!-- Features Grid -->
		<div class="features-grid">
			{#each features as feature, index}
				<div
					class="feature-card reveal magnetic {feature.animation || ''}"
					class:highlight={feature.highlight}
					style="animation-delay: {(index % 6) * 0.05}s"
				>
					<div class="feature-icon" class:highlight={feature.highlight}>
						<feature.icon size={24} />
					</div>
					<div class="feature-content">
						<h3 class="feature-title">{feature.title}</h3>
						<p class="feature-description">{feature.description}</p>
					</div>
					{#if feature.highlight}
						<span class="feature-badge animate-pulse-soft">⭐ Core</span>
					{/if}
				</div>
			{/each}
		</div>

		<!-- CTA -->
		<div class="features-cta reveal">
			<p class="cta-text">
				¿Listo para tomar el control de tu dinero?
			</p>
			<a href="/auth/register" class="btn btn-primary btn-lg btn-shine animate-glow-pulse">
				Empezar gratis ahora
			</a>
			<span class="cta-note">Sin tarjeta de crédito • Configuración en 2 minutos</span>
		</div>
	</div>
</section>

<style>
	.features-section {
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
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		flex-wrap: wrap;
	}

	.number-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 64px;
		height: 64px;
		background: var(--mby-gradient-green);
		color: var(--mby-text-inverse);
		font-size: 1.75rem;
		font-weight: 800;
		border-radius: var(--mby-radius-xl);
		box-shadow: var(--mby-shadow-glow);
	}

	.section-subtitle {
		font-size: 1.125rem;
		color: var(--mby-text-secondary);
		line-height: 1.7;
	}

	/* Features Grid */
	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-3xl);
	}

	.feature-card {
		position: relative;
		display: flex;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg);
		background: var(--mby-surface-1);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-surface-3);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base),
			border-color var(--mby-transition-base);
	}

	.feature-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--mby-shadow-md);
		border-color: var(--mby-gold-200);
	}

	.feature-card.highlight {
		background: linear-gradient(135deg, var(--mby-gold-50) 0%, var(--mby-surface-0) 100%);
		border-color: var(--mby-gold-300);
	}

	.feature-card.highlight:hover {
		box-shadow: var(--mby-shadow-lg);
		border-color: var(--mby-gold-400);
	}

	.feature-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-lg);
		color: var(--mby-primary-600);
		box-shadow: var(--mby-shadow-sm);
	}

	.feature-icon.highlight {
		background: var(--mby-gradient-green);
		color: var(--mby-text-inverse);
		box-shadow: var(--mby-shadow-glow);
	}

	.feature-content {
		flex: 1;
		min-width: 0;
	}

	.feature-title {
		font-size: 1rem;
		font-weight: 700;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
	}

	.feature-description {
		font-size: 0.875rem;
		color: var(--mby-text-secondary);
		line-height: 1.5;
	}

	.feature-badge {
		position: absolute;
		top: var(--mby-space-sm);
		right: var(--mby-space-sm);
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 2px 8px;
		background: var(--mby-gold-100);
		color: var(--mby-gold-700);
		border-radius: var(--mby-radius-sm);
	}

	/* CTA */
	.features-cta {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-md);
		text-align: center;
		padding: var(--mby-space-2xl);
		background: var(--mby-gradient-hero);
		border-radius: var(--mby-radius-2xl);
		overflow: hidden;
	}

	/* Borde dorado animado */
	.features-cta::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: var(--mby-radius-2xl);
		padding: 3px;
		background: linear-gradient(
			90deg,
			var(--mby-gold-400),
			var(--mby-orange-500),
			var(--mby-gold-300),
			var(--mby-orange-400),
			var(--mby-gold-400)
		);
		background-size: 300% 100%;
		animation: borderGlow 3s ease-in-out infinite;
		-webkit-mask: 
			linear-gradient(#fff 0 0) content-box, 
			linear-gradient(#fff 0 0);
		mask: 
			linear-gradient(#fff 0 0) content-box, 
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		pointer-events: none;
	}

	/* Efecto de brillo pulsante */
	.features-cta::after {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: var(--mby-radius-2xl);
		background: linear-gradient(
			90deg,
			transparent,
			rgba(234, 179, 8, 0.4),
			transparent
		);
		background-size: 200% 100%;
		animation: borderShine 2s ease-in-out infinite;
		pointer-events: none;
		opacity: 0.6;
	}

	@keyframes borderGlow {
		0%, 100% {
			background-position: 0% 50%;
			filter: brightness(1);
		}
		50% {
			background-position: 100% 50%;
			filter: brightness(1.3);
		}
	}

	@keyframes borderShine {
		0% {
			background-position: -200% 0;
			opacity: 0.4;
		}
		50% {
			opacity: 0.8;
		}
		100% {
			background-position: 200% 0;
			opacity: 0.4;
		}
	}

	.cta-text {
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
		position: relative;
		z-index: 1;
		text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
	}

	.features-cta .btn {
		position: relative;
		z-index: 1;
	}

	.cta-note {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		position: relative;
		z-index: 1;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.features-grid {
			grid-template-columns: 1fr;
		}

		.number-badge {
			width: 48px;
			height: 48px;
			font-size: 1.25rem;
		}

		.feature-card {
			flex-direction: column;
			text-align: center;
		}

		.feature-icon {
			margin: 0 auto;
		}
	}
</style>
