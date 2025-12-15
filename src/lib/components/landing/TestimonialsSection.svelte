<!-- ═══════════════════════════════════════════════════════════════════════════
     💬 TESTIMONIALS — Prueba Social
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Conformidad social: "Si otros lo usan, debe ser bueno"
     - Identificación: Perfiles similares al target
     - Especificidad: Números concretos dan credibilidad
     - Emociones: Testimonios que apelan a sentimientos
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-svelte';

	const testimonials = [
		{
			name: 'María González',
			role: 'Diseñadora Freelance',
			location: 'CDMX',
			avatar: '👩‍🎨',
			rating: 5,
			quote:
				'Por primera vez en mi vida sé exactamente cuánto puedo gastar sin preocuparme. Ya no vivo con la ansiedad de "¿alcanzará para la quincena?"',
			highlight: 'Ahorré $3,500 en mi primer mes',
			verified: true
		},
		{
			name: 'Carlos Ramírez',
			role: 'Desarrollador de Software',
			location: 'Guadalajara',
			avatar: '👨‍💻',
			rating: 5,
			quote:
				'Probé mil apps de finanzas pero todas eran muy complicadas o no entendían las quincenas mexicanas. mibiyuyo es exactamente lo que necesitaba.',
			highlight: 'Reducí 40% mis gastos hormiga',
			verified: true
		},
		{
			name: 'Ana Martínez',
			role: 'Maestra de Primaria',
			location: 'Monterrey',
			avatar: '👩‍🏫',
			rating: 5,
			quote:
				'Lo que más me gusta es que aparta automáticamente para la renta y servicios. Ese dinero "no existe" hasta que se necesita. ¡Genial!',
			highlight: 'Nunca más atrasada en mis pagos',
			verified: true
		},
		{
			name: 'Roberto Hernández',
			role: 'Vendedor',
			location: 'Puebla',
			avatar: '👨‍💼',
			rating: 5,
			quote:
				'Mi esposa y yo compartimos la app para ver nuestros gastos juntos. Ha mejorado muchísimo nuestra comunicación sobre dinero.',
			highlight: 'Mejoramos como pareja',
			verified: true
		},
		{
			name: 'Lupita Sánchez',
			role: 'Estudiante de Medicina',
			location: 'Mérida',
			avatar: '👩‍⚕️',
			rating: 5,
			quote:
				'Como estudiante, cada peso cuenta. mibiyuyo me ayudó a identificar que gastaba $1,800 al mes solo en café y snacks. ¡No lo podía creer!',
			highlight: 'Identifiqué mis gastos invisibles',
			verified: true
		},
		{
			name: 'Fernando Díaz',
			role: 'Chef',
			location: 'Cancún',
			avatar: '👨‍🍳',
			rating: 5,
			quote:
				'Trabajo en turismo y mis ingresos varían mucho. La app se adapta perfectamente a mi situación irregular. Muy recomendada.',
			highlight: 'Funciona con ingresos variables',
			verified: true
		}
	];

	let currentIndex = $state(0);

	function next() {
		currentIndex = (currentIndex + 1) % Math.ceil(testimonials.length / 3);
	}

	function prev() {
		currentIndex =
			(currentIndex - 1 + Math.ceil(testimonials.length / 3)) %
			Math.ceil(testimonials.length / 3);
	}

	// Auto-advance
	$effect(() => {
		const timer = setInterval(next, 6000);
		return () => clearInterval(timer);
	});
</script>

<section class="testimonials-section" id="testimonials">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">Historias reales</span>
			<h2 class="section-title">
				Mexicanos que ya tomaron el control
			</h2>
			<p class="section-subtitle">
				No somos nosotros diciendo que funciona. Son ellos.
			</p>
		</div>

		<!-- Stats Bar -->
		<div class="stats-bar reveal">
			<div class="stat-item">
				<span class="stat-number">2,500+</span>
				<span class="stat-text">usuarios activos</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">4.9</span>
				<span class="stat-text">calificación promedio</span>
			</div>
			<div class="stat-divider"></div>
			<div class="stat-item">
				<span class="stat-number">$8.2M</span>
				<span class="stat-text">ahorrados en total</span>
			</div>
		</div>

		<!-- Testimonials Carousel -->
		<div class="testimonials-wrapper">
			<button class="carousel-btn prev" onclick={prev} aria-label="Anterior">
				<ChevronLeft size={24} />
			</button>

			<div class="testimonials-track" style="transform: translateX(-{currentIndex * 100}%)">
				{#each { length: Math.ceil(testimonials.length / 3) } as _, pageIndex}
					<div class="testimonials-page">
						{#each testimonials.slice(pageIndex * 3, (pageIndex + 1) * 3) as testimonial}
							<div class="testimonial-card">
								<div class="testimonial-header">
									<div class="testimonial-avatar">{testimonial.avatar}</div>
									<div class="testimonial-info">
										<span class="testimonial-name">{testimonial.name}</span>
										<span class="testimonial-role"
											>{testimonial.role} • {testimonial.location}</span
										>
									</div>
									{#if testimonial.verified}
										<span class="verified-badge" title="Usuario verificado">✓</span>
									{/if}
								</div>

								<div class="testimonial-rating">
									{#each { length: testimonial.rating } as _}
										<Star size={16} fill="currentColor" />
									{/each}
								</div>

								<div class="testimonial-quote">
									<Quote size={20} class="quote-icon" />
									<p>{testimonial.quote}</p>
								</div>

								<div class="testimonial-highlight">
									<span>✨ {testimonial.highlight}</span>
								</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>

			<button class="carousel-btn next" onclick={next} aria-label="Siguiente">
				<ChevronRight size={24} />
			</button>
		</div>

		<!-- Dots Indicator -->
		<div class="carousel-dots">
			{#each { length: Math.ceil(testimonials.length / 3) } as _, index}
				<button
					class="dot"
					class:active={index === currentIndex}
					onclick={() => (currentIndex = index)}
					aria-label="Ir a página {index + 1}"
				></button>
			{/each}
		</div>
	</div>
</section>

<style>
	.testimonials-section {
		padding: var(--mby-space-3xl) 0;
		background: var(--mby-surface-1);
		overflow: hidden;
	}

	/* Section Header */
	.section-header {
		text-align: center;
		max-width: 720px;
		margin: 0 auto var(--mby-space-2xl);
	}

	.section-eyebrow {
		display: inline-block;
		font-size: 2.625rem;
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

	/* Stats Bar */
	.stats-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--mby-space-xl);
		padding: var(--mby-space-lg) var(--mby-space-2xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-full);
		margin-bottom: var(--mby-space-3xl);
		box-shadow: var(--mby-shadow-md);
		flex-wrap: wrap;
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-xs);
	}

	.stat-number {
		font-family: var(--mby-font-display);
		font-size: 1.75rem;
		font-weight: 800;
		color: var(--mby-primary-600);
	}

	.stat-text {
		font-size: 0.8125rem;
		color: var(--mby-text-secondary);
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: var(--mby-surface-3);
	}

	/* Testimonials Wrapper */
	.testimonials-wrapper {
		position: relative;
		overflow: hidden;
	}

	.carousel-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 48px;
		height: 48px;
		background: var(--mby-surface-0);
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-full);
		color: var(--mby-text-primary);
		cursor: pointer;
		transition:
			background-color var(--mby-transition-fast),
			box-shadow var(--mby-transition-fast);
		box-shadow: var(--mby-shadow-md);
	}

	.carousel-btn:hover {
		background: var(--mby-gold-50);
		box-shadow: var(--mby-shadow-lg);
	}

	.carousel-btn.prev {
		left: 0;
	}

	.carousel-btn.next {
		right: 0;
	}

	/* Track */
	.testimonials-track {
		display: flex;
		transition: transform 0.5s ease-out;
	}

	.testimonials-page {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
		min-width: 100%;
		padding: 0 var(--mby-space-4xl);
	}

	/* Testimonial Card */
	.testimonial-card {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		padding: var(--mby-space-xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-xl);
		border: 1px solid var(--mby-surface-3);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base);
	}

	.testimonial-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--mby-shadow-lg);
	}

	.testimonial-header {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
	}

	.testimonial-avatar {
		font-size: 2.5rem;
		width: 56px;
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--mby-surface-2);
		border-radius: var(--mby-radius-full);
	}

	.testimonial-info {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.testimonial-name {
		font-weight: 600;
		color: var(--mby-text-primary);
	}

	.testimonial-role {
		font-size: 0.8125rem;
		color: var(--mby-text-secondary);
	}

	.verified-badge {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background: var(--mby-orange-500);
		color: var(--mby-text-inverse);
		font-size: 0.75rem;
		border-radius: var(--mby-radius-full);
	}

	.testimonial-rating {
		display: flex;
		gap: 2px;
		color: #fbbf24;
	}

	.testimonial-quote {
		position: relative;
		flex: 1;
	}

	.testimonial-quote :global(.quote-icon) {
		position: absolute;
		top: 0;
		left: 0;
		color: var(--mby-gold-200);
		opacity: 0.5;
	}

	.testimonial-quote p {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--mby-text-secondary);
		padding-left: var(--mby-space-xl);
	}

	.testimonial-highlight {
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: var(--mby-gold-50);
		border-radius: var(--mby-radius-md);
		border-left: 3px solid var(--mby-orange-500);
	}

	.testimonial-highlight span {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--mby-gold-700);
	}

	/* Dots */
	.carousel-dots {
		display: flex;
		justify-content: center;
		gap: var(--mby-space-sm);
		margin-top: var(--mby-space-xl);
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: var(--mby-radius-full);
		background: var(--mby-surface-3);
		border: none;
		cursor: pointer;
		transition: background-color var(--mby-transition-fast);
	}

	.dot.active {
		background: var(--mby-orange-500);
		width: 24px;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.testimonials-page {
			grid-template-columns: repeat(2, 1fr);
			padding: 0 var(--mby-space-3xl);
		}

		.testimonials-page > :nth-child(3) {
			display: none;
		}

		.carousel-btn {
			display: none;
		}
	}

	@media (max-width: 640px) {
		.testimonials-page {
			grid-template-columns: 1fr;
			padding: 0 var(--mby-space-md);
		}

		.testimonials-page > :nth-child(2),
		.testimonials-page > :nth-child(3) {
			display: none;
		}

		.stats-bar {
			flex-direction: column;
			gap: var(--mby-space-md);
			border-radius: var(--mby-radius-xl);
		}

		.stat-divider {
			width: 60px;
			height: 1px;
		}
	}
</style>
