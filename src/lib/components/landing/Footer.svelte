<!-- ═══════════════════════════════════════════════════════════════════════════
     🦶 FOOTER — Pie de Página Completo
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Confianza institucional: Datos legales y transparencia
     - Accesibilidad: Navegación completa del sitio
     - Social proof: Enlaces a redes sociales
     - Seguridad: Badges de certificaciones y seguridad
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import {
		Leaf,
		Facebook,
		Twitter,
		Instagram,
		Linkedin,
		Youtube,
		Mail,
		Phone,
		MapPin,
		Shield,
		Lock,
		Award
	} from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	const productLinks = [
		{ href: '#features', label: 'Características' },
		{ href: '#pricing', label: 'Precios' },
		{ href: '/roadmap', label: 'Roadmap' },
		{ href: '/changelog', label: 'Actualizaciones' },
		{ href: '/integrations', label: 'Integraciones' }
	];

	const companyLinks = [
		{ href: '/about', label: 'Sobre nosotros' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/press', label: 'Prensa' },
		{ href: '/careers', label: 'Trabaja con nosotros' },
		{ href: '/contact', label: 'Contacto' }
	];

	const resourceLinks = [
		{ href: '/help', label: 'Centro de ayuda' },
		{ href: '/guides', label: 'Guías' },
		{ href: '/api', label: 'API Docs' },
		{ href: '/webinars', label: 'Webinars' },
		{ href: '/community', label: 'Comunidad' }
	];

	const legalLinks = [
		{ href: '/privacy', label: 'Privacidad' },
		{ href: '/terms', label: 'Términos de uso' },
		{ href: '/cookies', label: 'Cookies' },
		{ href: '/security', label: 'Seguridad' }
	];

	const socialLinks = [
		{ href: 'https://facebook.com/mibiyuyo', icon: Facebook, label: 'Facebook' },
		{ href: 'https://twitter.com/mibiyuyo', icon: Twitter, label: 'Twitter' },
		{ href: 'https://instagram.com/mibiyuyo', icon: Instagram, label: 'Instagram' },
		{ href: 'https://linkedin.com/company/mibiyuyo', icon: Linkedin, label: 'LinkedIn' },
		{ href: 'https://youtube.com/@mibiyuyo', icon: Youtube, label: 'YouTube' }
	];

	const trustBadges = [
		{ icon: Shield, label: 'SSL Seguro', description: 'Encriptación 256-bit' },
		{ icon: Lock, label: 'LFPDPPP', description: 'Datos protegidos' },
		{ icon: Award, label: 'ISO 27001', description: 'Certificación en proceso' }
	];
</script>

<footer class="footer">
	<div class="container">
		<!-- Main Footer -->
		<div class="footer-main">
			<!-- Brand Column -->
			<div class="footer-brand">
				<a href="/" class="footer-logo">
					<div class="logo-icon">
						<Leaf size={24} />
					</div>
					<span class="logo-text">mibiyuyo</span>
				</a>

				<p class="footer-tagline">
					Finanzas personales simplificadas. Sabe cuánto puedes gastar hoy,
					sin matemáticas ni hojas de Excel.
				</p>

				<div class="footer-contact">
					<a href="mailto:hola@mibiyuyo.com" class="contact-item">
						<Mail size={16} />
						<span>hola@mibiyuyo.com</span>
					</a>
					<a href="tel:+525512345678" class="contact-item">
						<Phone size={16} />
						<span>+52 55 1234 5678</span>
					</a>
					<div class="contact-item">
						<MapPin size={16} />
						<span>Ciudad de México, México</span>
					</div>
				</div>

				<!-- Social Links -->
				<div class="social-links">
					{#each socialLinks as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label={social.label}
						>
							<social.icon size={18} />
						</a>
					{/each}
				</div>
			</div>

			<!-- Links Columns -->
			<div class="footer-links">
				<div class="link-column">
					<h4>Producto</h4>
					<ul>
						{#each productLinks as link}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</div>

				<div class="link-column">
					<h4>Empresa</h4>
					<ul>
						{#each companyLinks as link}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</div>

				<div class="link-column">
					<h4>Recursos</h4>
					<ul>
						{#each resourceLinks as link}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</div>

				<div class="link-column">
					<h4>Legal</h4>
					<ul>
						{#each legalLinks as link}
							<li><a href={link.href}>{link.label}</a></li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<!-- Trust Badges -->
		<div class="trust-section">
			{#each trustBadges as badge}
				<div class="trust-badge">
					<badge.icon size={20} />
					<div class="badge-text">
						<span class="badge-label">{badge.label}</span>
						<span class="badge-desc">{badge.description}</span>
					</div>
				</div>
			{/each}
		</div>

		<!-- Bottom Bar -->
		<div class="footer-bottom">
			<p class="copyright">
				© {currentYear} mibiyuyo. Todos los derechos reservados.
				Hecho con 💚 en México.
			</p>

			<div class="footer-legal">
				<a href="/privacy">Privacidad</a>
				<span class="separator">•</span>
				<a href="/terms">Términos</a>
				<span class="separator">•</span>
				<a href="/sitemap">Sitemap</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--mby-gray-900);
		color: var(--mby-gray-300);
		border-top: 1px solid var(--mby-gray-800);
	}

	.footer-main {
		display: grid;
		grid-template-columns: 1.5fr 2.5fr;
		gap: var(--mby-space-3xl);
		padding: var(--mby-space-3xl) 0;
		border-bottom: 1px solid var(--mby-gray-800);
	}

	/* Brand Column */
	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.footer-logo {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-sm);
		text-decoration: none;
	}

	.logo-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--mby-gradient-primary);
		border-radius: var(--mby-radius-md);
		color: white;
	}

	.logo-text {
		font-family: var(--mby-font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: white;
	}

	.footer-tagline {
		font-size: 0.9375rem;
		line-height: 1.7;
		color: var(--mby-gray-400);
		max-width: 300px;
	}

	.footer-contact {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.contact-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-size: 0.875rem;
		color: var(--mby-gray-400);
		text-decoration: none;
		transition: color var(--mby-transition-fast);
	}

	.contact-item:hover {
		color: var(--mby-gold-400);
	}

	/* Social Links */
	.social-links {
		display: flex;
		gap: var(--mby-space-sm);
		margin-top: var(--mby-space-md);
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: var(--mby-gray-800);
		border-radius: var(--mby-radius-full);
		color: var(--mby-gray-400);
		transition: all var(--mby-transition-fast);
	}

	.social-link:hover {
		background: var(--mby-orange-500);
		color: white;
		transform: translateY(-2px);
	}

	/* Links Columns */
	.footer-links {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--mby-space-xl);
	}

	.link-column h4 {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--mby-gold-400);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-bottom: var(--mby-space-md);
	}

	.link-column ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
	}

	.link-column a {
		font-size: 0.9375rem;
		color: var(--mby-gray-400);
		text-decoration: none;
		transition: color var(--mby-transition-fast);
	}

	.link-column a:hover {
		color: var(--mby-gold-400);
	}

	/* Trust Section */
	.trust-section {
		display: flex;
		justify-content: center;
		gap: var(--mby-space-2xl);
		padding: var(--mby-space-xl) 0;
		border-bottom: 1px solid var(--mby-gray-800);
	}

	.trust-badge {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		color: var(--mby-gray-400);
	}

	.trust-badge :global(svg) {
		color: var(--mby-orange-500);
	}

	.badge-text {
		display: flex;
		flex-direction: column;
	}

	.badge-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--mby-gray-200);
	}

	.badge-desc {
		font-size: 0.75rem;
		color: var(--mby-gray-500);
	}

	/* Bottom Bar */
	.footer-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--mby-space-lg) 0;
	}

	.copyright {
		font-size: 0.875rem;
		color: var(--mby-gray-500);
	}

	.footer-legal {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.footer-legal a {
		font-size: 0.875rem;
		color: var(--mby-gray-500);
		text-decoration: none;
		transition: color var(--mby-transition-fast);
	}

	.footer-legal a:hover {
		color: var(--mby-gold-400);
	}

	.separator {
		color: var(--mby-gray-600);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.footer-main {
			grid-template-columns: 1fr;
			gap: var(--mby-space-2xl);
		}

		.footer-links {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 640px) {
		.footer-links {
			grid-template-columns: 1fr 1fr;
			gap: var(--mby-space-lg);
		}

		.trust-section {
			flex-direction: column;
			align-items: center;
			gap: var(--mby-space-md);
		}

		.footer-bottom {
			flex-direction: column;
			gap: var(--mby-space-md);
			text-align: center;
		}
	}
</style>
