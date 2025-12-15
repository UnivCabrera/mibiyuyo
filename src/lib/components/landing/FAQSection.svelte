<!-- ═══════════════════════════════════════════════════════════════════════════
     ❓ FAQ — Preguntas Frecuentes (Reducción de Objeciones)
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Anticipar objeciones: Resuelve dudas antes de que las pregunten
     - Transparencia: Genera confianza
     - Tono conversacional: Humaniza la marca
     - Estructura colapsable: Reduce sobrecarga cognitiva
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { ChevronDown } from 'lucide-svelte';

	const faqs = [
		{
			question: '¿mibiyuyo es realmente gratis?',
			answer:
				'Sí, 100%. Las primeras 18 características (3 versiones) son gratuitas para siempre. No es "gratis por tiempo limitado" ni "gratis con funciones recortadas". El plan gratuito incluye TODO lo esencial para controlar tu dinero: el número de biyuyo diario, apartados automáticos, registro de gastos, alertas, y más. Solo cobramos por funciones avanzadas como reportes detallados, conexión bancaria automática, o facturación.',
			open: true
		},
		{
			question: '¿Mis datos están seguros?',
			answer:
				'Absolutamente. Usamos encriptación de grado bancario (AES-256) para todos tus datos. Nunca vendemos ni compartimos tu información con terceros. Tus datos están almacenados en servidores seguros y solo tú tienes acceso a ellos. Además, puedes exportar o eliminar toda tu información en cualquier momento. Lee nuestra política de privacidad para más detalles.',
			open: false
		},
		{
			question: '¿Necesito conectar mi cuenta bancaria?',
			answer:
				'No, es completamente opcional. mibiyuyo funciona perfectamente sin conexión bancaria. Simplemente registras tus ingresos y gastos manualmente (toma segundos). La conexión bancaria automática es una función del plan Negocio para quienes quieren automatizar la importación de movimientos.',
			open: false
		},
		{
			question: '¿Funciona con quincenas irregulares o ingresos variables?',
			answer:
				'¡Sí! Puedes configurar múltiples fuentes de ingreso con diferentes frecuencias: quincenal, semanal, mensual, o incluso ingresos irregulares (propinas, freelance, comisiones). La app se adapta a tu situación real, no al revés.',
			open: false
		},
		{
			question: '¿Puedo usar mibiyuyo con mi pareja o familia?',
			answer:
				'Sí. El plan Gratis permite un usuario. El plan Pro incluye modo familiar para hasta 5 usuarios, donde pueden ver gastos compartidos y mantener también cuentas individuales privadas. Ideal para parejas, roomies, o familias.',
			open: false
		},
		{
			question: '¿Funciona sin internet?',
			answer:
				'Sí. mibiyuyo es una PWA (Progressive Web App) que funciona offline. Puedes registrar gastos sin conexión y se sincronizarán automáticamente cuando vuelvas a tener internet. También puedes instalarla como app en tu celular sin pasar por la tienda de apps.',
			open: false
		},
		{
			question: '¿Puedo cancelar en cualquier momento?',
			answer:
				'Sí, sin penalizaciones ni preguntas. Si tienes un plan de pago y decides cancelar, simplemente vas a tu perfil y cancelas. Seguirás teniendo acceso hasta el final de tu período pagado, y después bajarás automáticamente al plan Gratis (no pierdes tus datos).',
			open: false
		},
		{
			question: '¿Qué pasa con mis datos si dejo de usar la app?',
			answer:
				'Tus datos te pertenecen. Puedes exportarlos en cualquier momento a Excel o PDF. Si decides eliminar tu cuenta, borramos permanentemente toda tu información de nuestros servidores dentro de 30 días. No guardamos copias ocultas.',
			open: false
		},
		{
			question: '¿mibiyuyo reemplaza a un contador?',
			answer:
				'No. mibiyuyo es para finanzas personales y control de gastos del día a día. No damos asesoría fiscal ni contable profesional. Sin embargo, el plan Negocio incluye funciones de facturación CFDI y reportes fiscales básicos que pueden ayudarte a organizar tu información antes de entregarla a tu contador.',
			open: false
		},
		{
			question: '¿Cómo se financia mibiyuyo si es gratis?',
			answer:
				'Nuestro modelo es "freemium": las funciones básicas son gratis, y cobramos por funciones avanzadas (Pro y Negocio). También aceptamos propinas voluntarias de usuarios que quieren apoyar el proyecto. No mostramos anuncios ni vendemos datos. Somos rentables porque mantenemos costos bajos y somos un equipo pequeño y eficiente.',
			open: false
		}
	];

	let openIndex = $state(0);

	function toggle(index: number) {
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<section class="faq-section" id="faq">
	<div class="container container-narrow">
		<!-- Section Header -->
		<div class="section-header reveal">
			<span class="section-eyebrow">Preguntas frecuentes</span>
			<h2 class="section-title">
				Todo lo que quieres saber
			</h2>
			<p class="section-subtitle">
				Si no encuentras tu respuesta, escríbenos a 
				<a href="mailto:hola@mibiyuyo.com">hola@mibiyuyo.com</a>
			</p>
		</div>

		<!-- FAQ Items -->
		<div class="faq-list">
			{#each faqs as faq, index}
				<div class="faq-item reveal" class:open={openIndex === index}>
					<button class="faq-question" onclick={() => toggle(index)}>
						<span>{faq.question}</span>
						<div class="faq-icon">
							<ChevronDown size={20} />
						</div>
					</button>
					{#if openIndex === index}
						<div class="faq-answer">
							<p>{faq.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Contact CTA -->
		<div class="faq-contact reveal">
			<p>¿Tienes otra pregunta?</p>
			<a href="mailto:hola@mibiyuyo.com" class="btn btn-ghost">
				Escríbenos
			</a>
		</div>
	</div>
</section>

<style>
	.faq-section {
		padding: var(--mby-space-4xl) 0;
		background: var(--mby-surface-0);
	}

	/* Section Header */
	.section-header {
		text-align: center;
		margin-bottom: var(--mby-space-3xl);
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

	.section-subtitle a {
		color: var(--mby-primary-600);
		text-decoration: underline;
	}

	/* FAQ List */
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
		margin-bottom: var(--mby-space-2xl);
	}

	.faq-item {
		background: var(--mby-surface-1);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-surface-3);
		overflow: hidden;
		transition:
			border-color var(--mby-transition-fast),
			box-shadow var(--mby-transition-fast);
	}

	.faq-item:hover {
		border-color: var(--mby-gold-200);
	}

	.faq-item.open {
		border-color: var(--mby-gold-400);
		box-shadow: var(--mby-shadow-md);
	}

	.faq-question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg) var(--mby-space-xl);
		background: transparent;
		border: none;
		text-align: left;
		font-family: var(--mby-font-sans);
		font-size: var(--mby-text-lg, 1.1875rem); /* +6px */
		font-weight: 500; /* Reducido de 600 */
		color: var(--mby-text-primary);
		cursor: pointer;
		transition: color var(--mby-transition-fast);
		line-height: 1.5;
	}

	.faq-question:hover {
		color: var(--mby-primary-600);
	}

	.faq-icon {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: var(--mby-surface-2);
		border-radius: var(--mby-radius-md);
		color: var(--mby-text-secondary);
		transition:
			transform var(--mby-transition-fast),
			background-color var(--mby-transition-fast);
	}

	.faq-item.open .faq-icon {
		transform: rotate(180deg);
		background: var(--mby-gold-100);
		color: var(--mby-primary-600);
	}

	.faq-answer {
		padding: 0 var(--mby-space-xl) var(--mby-space-xl);
		animation: fadeInUp 0.3s ease-out;
	}

	.faq-answer p {
		font-size: var(--mby-text-base, 1.0625rem); /* +6px de 14px a 17px */
		line-height: 1.8;
		color: var(--mby-text-secondary);
		font-weight: 400;
	}

	/* Contact CTA */
	.faq-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-lg);
		background: var(--mby-surface-1);
		border-radius: var(--mby-radius-xl);
		border: 1px dashed var(--mby-surface-3);
	}

	.faq-contact p {
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
	}

	.faq-contact :global(.btn-ghost) {
		position: relative;
		border: 2px solid var(--mby-gold-500);
		background: transparent;
		color: var(--mby-gold-600);
		overflow: hidden;
	}

	.faq-contact :global(.btn-ghost)::before {
		content: '';
		position: absolute;
		top: -2px;
		left: -100%;
		width: 100%;
		height: calc(100% + 4px);
		background: linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.4), transparent);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}

	/* Responsive */
	@media (max-width: 640px) {
		.faq-contact {
			flex-direction: column;
		}
	}
</style>
