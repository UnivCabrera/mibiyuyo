<!-- ═══════════════════════════════════════════════════════════════════════════
     😰 PAIN POINTS — Los 6 Dolores (Resonancia Emocional)
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Técnica de "agitación": Conectar con el dolor antes de la solución
     - Preguntas retóricas: Activan el pensamiento introspectivo
     - Emojis: Reducen la carga emocional negativa
     - Transición suave: De problema a esperanza
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	const painPoints = [
		{
			emoji: '🤷',
			question: '¿No sabes cuánto puedes gastar hoy?',
			description:
				'Terminas gastando "a ojo" y al final de la quincena no sabes a dónde se fue el dinero.',
			color: 'var(--mby-orange-500)'
		},
		{
			emoji: '😓',
			question: '¿Vives quincena a quincena?',
			description:
				'Cuentas los días para el depósito y sientes que el dinero nunca alcanza.',
			color: 'var(--mby-orange-500)'
		},
		{
			emoji: '😵',
			question: '¿Tus gastos fijos te ahogan?',
			description:
				'Renta, luz, teléfono, Netflix... llegan todos al mismo tiempo y no estás preparado.',
			color: 'var(--mby-orange-500)'
		},
		{
			emoji: '🛒',
			question: '¿Gastas de más sin darte cuenta?',
			description:
				'Pequeños gustos diarios que suman miles al mes: el cafecito, el Uber, las papitas.',
			color: 'var(--mby-orange-500)'
		},
		{
			emoji: '😰',
			question: '¿Te sientes ansioso con el dinero?',
			description:
				'Revisar tu cuenta te genera estrés. Prefieres no ver para no preocuparte.',
			color: 'var(--mby-orange-500)'
		},
		{
			emoji: '🔒',
			question: '¿No confías en las apps financieras?',
			description:
				'Te da miedo que vendan tus datos o que no sean seguras. Preferirías tener el control.',
			color: 'var(--mby-orange-500)'
		}
	];
</script>

<section class="pain-section" id="pain">
	<div class="container">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">El problema que nadie habla</span>
			<h2 class="section-title">
				El 78% de los mexicanos vive estresado por su dinero
			</h2>
			<p class="section-subtitle">
				No eres tú. Es que nadie te enseñó a manejar tu dinero de forma práctica.
				<strong>Eso cambia hoy.</strong>
			</p>
		</div>

		<!-- Pain Points Grid -->
		<div class="pain-grid">
			{#each painPoints as pain, index}
				<div class="pain-card reveal card-3d" style="animation-delay: {index * 0.1}s">
					<span class="pain-emoji">{pain.emoji}</span>
					<h3 class="pain-question">{pain.question}</h3>
					<p class="pain-description">{pain.description}</p>
				</div>
			{/each}
		</div>

		<!-- Transition to Solution -->
		<div class="transition-block reveal animate-bounce-subtle">
			<div class="transition-icon">💚</div>
			<p class="transition-text">
				<strong>¿Te identificaste?</strong> No estás solo. Y lo mejor: 
				<span class="text-gradient-animated">tiene solución.</span>
			</p>
		</div>
	</div>
</section>

<style>
	.pain-section {
		padding: var(--mby-space-4xl) 0;
		background: var(--mby-surface-1);
		position: relative;
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
		color: var(--mby-orange-500);
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

	.section-subtitle strong {
		color: var(--mby-primary-600);
	}

	/* Pain Points Grid */
	.pain-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--mby-space-lg);
		margin-bottom: var(--mby-space-3xl);
	}

	.pain-card {
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-xl);
		padding: var(--mby-space-xl);
		text-align: center;
		border: 1px solid var(--mby-surface-3);
		transition:
			transform var(--mby-transition-base),
			box-shadow var(--mby-transition-base),
			border-color var(--mby-transition-base);
	}

	.pain-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--mby-shadow-lg);
		border-color: var(--mby-orange-500);
	}

	.pain-emoji {
		font-size: 3rem;
		display: block;
		margin-bottom: var(--mby-space-md);
	}

	.pain-question {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-sm);
	}

	.pain-description {
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
		line-height: 1.6;
	}

	/* Transition Block */
	.transition-block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--mby-space-md);
		text-align: center;
		padding: var(--mby-space-2xl);
		background: var(--mby-surface-0);
		border-radius: var(--mby-radius-2xl);
		border: 2px solid var(--mby-gold-400);
		box-shadow: 0 4px 24px rgba(234, 179, 8, 0.15);
	}

	.transition-icon {
		font-size: 3rem;
		animation: float 3s ease-in-out infinite;
	}

	.transition-text {
		font-size: 1.25rem;
		color: var(--mby-text-primary);
	}

	.transition-text strong {
		font-weight: 700;
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.pain-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.pain-grid {
			grid-template-columns: 1fr;
		}

		.pain-card {
			padding: var(--mby-space-lg);
		}
	}
</style>
