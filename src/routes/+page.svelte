<!-- ═══════════════════════════════════════════════════════════════════════════
     🏠 LANDING PAGE — Página Principal de mibiyuyo
     ═══════════════════════════════════════════════════════════════════════════
     Estructura Psicológica del Flujo:
     1. Header - Navegación y CTAs inmediatos
     2. Hero - Primera impresión (7 segundos críticos)
     3. Pain - Conexión emocional con el problema
     4. Features - 18 características GRATIS
     5. HowItWorks - Simplicidad del proceso
     6. Benefits - Transformación antes/después
     7. Testimonials - Prueba social
     8. Pricing - Transparencia en precios
     9. FAQ - Resolver objeciones
     10. FinalCTA - Última llamada a la acción
     11. Footer - Confianza institucional
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { onMount } from 'svelte';

	// Components
	import Header from '$lib/components/landing/Header.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import PainSection from '$lib/components/landing/PainSection.svelte';
	import FeaturesSection from '$lib/components/landing/FeaturesSection.svelte';
	import HowItWorks from '$lib/components/landing/HowItWorks.svelte';
	import BenefitsSection from '$lib/components/landing/BenefitsSection.svelte';
	import TestimonialsSection from '$lib/components/landing/TestimonialsSection.svelte';
	import PricingSection from '$lib/components/landing/PricingSection.svelte';
	import FAQSection from '$lib/components/landing/FAQSection.svelte';
	import FinalCTA from '$lib/components/landing/FinalCTA.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';

	// Scroll Reveal Animation
	onMount(() => {
		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
				}
			});
		}, observerOptions);

		// Observe all elements with .reveal class
		document.querySelectorAll('.reveal').forEach((el) => {
			observer.observe(el);
		});

		return () => observer.disconnect();
	});
</script>

<div class="landing-page">
	<Header />

	<main>
		<HeroSection />
		<PainSection />
		<FeaturesSection />
		<HowItWorks />
		<BenefitsSection />
		<TestimonialsSection />
		<PricingSection />
		<FAQSection />
		<FinalCTA />
	</main>

	<Footer />
</div>

<style>
	.landing-page {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	/* Global Reveal Animation */
	:global(.reveal) {
		opacity: 0;
		transform: translateY(30px);
		transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(.reveal.visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* Staggered reveal for children */
	:global(.reveal-stagger > *) {
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
			transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(.reveal-stagger.visible > *:nth-child(1)) {
		transition-delay: 0.1s;
	}
	:global(.reveal-stagger.visible > *:nth-child(2)) {
		transition-delay: 0.2s;
	}
	:global(.reveal-stagger.visible > *:nth-child(3)) {
		transition-delay: 0.3s;
	}
	:global(.reveal-stagger.visible > *:nth-child(4)) {
		transition-delay: 0.4s;
	}
	:global(.reveal-stagger.visible > *:nth-child(5)) {
		transition-delay: 0.5s;
	}
	:global(.reveal-stagger.visible > *:nth-child(6)) {
		transition-delay: 0.6s;
	}

	:global(.reveal-stagger.visible > *) {
		opacity: 1;
		transform: translateY(0);
	}
</style>
