<!-- ═══════════════════════════════════════════════════════════════════════════
     📝 REGISTER PAGE — Registro de Usuarios
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Progreso visible: Indicar que es rápido (2 minutos)
     - Valor inmediato: Recordar beneficios gratuitos
     - Reducción de fricción: Campos mínimos necesarios
     - Seguridad percibida: Indicadores de privacidad
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import {
		Leaf,
		User,
		Mail,
		Lock,
		Eye,
		EyeOff,
		ArrowRight,
		AlertCircle,
		Check,
		Shield,
		Clock,
		Gift
	} from 'lucide-svelte';
	import { goto } from '$app/navigation';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let acceptTerms = $state(false);
	let isLoading = $state(false);
	let error = $state('');

	// Password strength
	const passwordChecks = $derived([
		{ label: 'Mínimo 8 caracteres', valid: password.length >= 8 },
		{ label: 'Una mayúscula', valid: /[A-Z]/.test(password) },
		{ label: 'Un número', valid: /[0-9]/.test(password) },
		{ label: 'Un carácter especial', valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
	]);

	const passwordStrength = $derived(passwordChecks.filter((c) => c.valid).length);

	const strengthLabel = $derived(() => {
		if (passwordStrength === 0) return { text: '', color: '' };
		if (passwordStrength === 1) return { text: 'Muy débil', color: 'red' };
		if (passwordStrength === 2) return { text: 'Débil', color: 'orange' };
		if (passwordStrength === 3) return { text: 'Buena', color: 'yellow' };
		return { text: 'Fuerte', color: 'green' };
	});

	const benefits = [
		{ icon: Gift, text: '18 características gratis' },
		{ icon: Clock, text: 'Setup en 2 minutos' },
		{ icon: Shield, text: 'Datos 100% privados' }
	];

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';

		if (!acceptTerms) {
			error = 'Debes aceptar los términos y condiciones';
			return;
		}

		if (passwordStrength < 3) {
			error = 'Tu contraseña debe ser más fuerte';
			return;
		}

		isLoading = true;

		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Error al crear cuenta');
			}

			// Redirigir al onboarding o dashboard
			await goto('/dashboard/onboarding');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error desconocido';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Crear Cuenta Gratis | mibiyuyo</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-container">
		<!-- Left Side - Form -->
		<div class="auth-form-side">
			<div class="auth-form-wrapper">
				<!-- Logo -->
				<a href="/" class="auth-logo">
					<div class="logo-icon">
						<Leaf size={24} />
					</div>
					<span class="logo-text">mibiyuyo</span>
				</a>

				<div class="auth-header">
					<h1>Crea tu cuenta gratis</h1>
					<p>Sin tarjeta de crédito • Solo 2 minutos</p>
				</div>

				<!-- Social Login -->
				<div class="social-login">
					<button type="button" class="btn-social">
						<svg viewBox="0 0 24 24" width="20" height="20">
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Continuar con Google
					</button>
				</div>

				<div class="divider">
					<span>o regístrate con tu email</span>
				</div>

				<!-- Register Form -->
				<form onsubmit={handleSubmit} class="auth-form">
					{#if error}
						<div class="error-message">
							<AlertCircle size={16} />
							<span>{error}</span>
						</div>
					{/if}

					<div class="form-group">
						<label for="name">Nombre completo</label>
						<div class="input-wrapper">
							<User size={18} />
							<input
								type="text"
								id="name"
								bind:value={name}
								placeholder="Juan Pérez"
								required
								autocomplete="name"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<div class="input-wrapper">
							<Mail size={18} />
							<input
								type="email"
								id="email"
								bind:value={email}
								placeholder="tu@email.com"
								required
								autocomplete="email"
							/>
						</div>
					</div>

					<div class="form-group">
						<label for="password">Contraseña</label>
						<div class="input-wrapper">
							<Lock size={18} />
							<input
								type={showPassword ? 'text' : 'password'}
								id="password"
								bind:value={password}
								placeholder="••••••••"
								required
								autocomplete="new-password"
							/>
							<button
								type="button"
								class="toggle-password"
								onclick={() => (showPassword = !showPassword)}
							>
								{#if showPassword}
									<EyeOff size={18} />
								{:else}
									<Eye size={18} />
								{/if}
							</button>
						</div>

						<!-- Password Strength -->
						{#if password.length > 0}
							<div class="password-strength">
								<div class="strength-bars">
									{#each Array(4) as _, i}
										<div
											class="strength-bar"
											class:active={i < passwordStrength}
											class:red={i < passwordStrength && passwordStrength === 1}
											class:orange={i < passwordStrength && passwordStrength === 2}
											class:yellow={i < passwordStrength && passwordStrength === 3}
											class:green={i < passwordStrength && passwordStrength === 4}
										></div>
									{/each}
								</div>
								<span class="strength-label {strengthLabel().color}">{strengthLabel().text}</span>
							</div>

							<div class="password-checks">
								{#each passwordChecks as check}
									<div class="check-item" class:valid={check.valid}>
										<Check size={14} />
										<span>{check.label}</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>

					<div class="form-terms">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={acceptTerms} />
							<span class="checkmark"></span>
							Acepto los
							<a href="/terms" target="_blank">términos de servicio</a>
							y la
							<a href="/privacy" target="_blank">política de privacidad</a>
						</label>
					</div>

					<button type="submit" class="btn btn-primary btn-lg btn-full" disabled={isLoading}>
						{#if isLoading}
							<span class="spinner"></span>
							Creando cuenta...
						{:else}
							Crear cuenta gratis
							<ArrowRight size={18} />
						{/if}
					</button>
				</form>

				<p class="auth-footer">
					¿Ya tienes cuenta?
					<a href="/auth/login">Iniciar sesión</a>
				</p>
			</div>
		</div>

		<!-- Right Side - Benefits -->
		<div class="auth-visual-side">
			<div class="visual-content">
				<div class="visual-badge">🎁 100% GRATIS</div>
				<h2>Tu vida financiera en piloto automático</h2>
				<p>
					Únete a más de 2,500 mexicanos que ya saben exactamente cuánto pueden gastar
					cada día sin estrés.
				</p>

				<div class="benefits-list">
					{#each benefits as benefit}
						<div class="benefit-item">
							<div class="benefit-icon">
								<benefit.icon size={20} />
							</div>
							<span>{benefit.text}</span>
						</div>
					{/each}
				</div>

				<!-- Testimonial Mini -->
				<div class="mini-testimonial">
					<p>
						"En 5 minutos ya tenía toda mi información financiera organizada. Increíble
						lo simple que es."
					</p>
					<div class="testimonial-author">
						<div class="author-avatar">MR</div>
						<div class="author-info">
							<span class="author-name">María Rodríguez</span>
							<span class="author-title">Emprendedora, CDMX</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.auth-page {
		min-height: 100vh;
		background: var(--mby-bg-primary);
	}

	.auth-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
	}

	/* Form Side */
	.auth-form-side {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--mby-space-2xl);
		overflow-y: auto;
	}

	.auth-form-wrapper {
		width: 100%;
		max-width: 420px;
		padding: var(--mby-space-xl) 0;
	}

	.auth-logo {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-sm);
		text-decoration: none;
		margin-bottom: var(--mby-space-xl);
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
		color: var(--mby-text-primary);
	}

	.auth-header {
		margin-bottom: var(--mby-space-lg);
	}

	.auth-header h1 {
		font-size: 1.75rem;
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
	}

	.auth-header p {
		color: var(--mby-primary-600);
		font-weight: 500;
	}

	/* Social Login */
	.social-login {
		margin-bottom: var(--mby-space-lg);
	}

	.btn-social {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		background: var(--mby-surface-0);
		border: 2px solid var(--mby-gold-400);
		border-radius: var(--mby-radius-md);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--mby-gray-800);
		cursor: pointer;
		transition: all var(--mby-transition-fast);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.btn-social:hover {
		background: var(--mby-gold-50);
		border-color: var(--mby-gold-500);
		box-shadow: 0 0 12px rgba(234, 179, 8, 0.3);
	}

	/* Divider */
	.divider {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-lg);
	}

	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: var(--mby-gray-200);
	}

	.divider span {
		font-size: 0.875rem;
		color: var(--mby-text-tertiary);
		white-space: nowrap;
	}

	/* Form */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.form-group label {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--mby-text-primary);
	}

	.input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input-wrapper :global(svg:first-child) {
		position: absolute;
		left: var(--mby-space-md);
		color: var(--mby-text-tertiary);
		pointer-events: none;
	}

	.input-wrapper input {
		width: 100%;
		padding: var(--mby-space-md) var(--mby-space-md) var(--mby-space-md) 48px;
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-md);
		font-size: 1rem;
		color: var(--mby-text-primary);
		background: var(--mby-surface-0);
		transition: all var(--mby-transition-fast);
	}

	.input-wrapper input:focus {
		outline: none;
		border-color: var(--mby-primary-500);
		box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
	}

	.input-wrapper input::placeholder {
		color: var(--mby-gray-400);
		opacity: 1;
	}

	.toggle-password {
		position: absolute;
		right: var(--mby-space-md);
		background: none;
		border: none;
		color: var(--mby-text-tertiary);
		cursor: pointer;
		padding: 0;
		display: flex;
	}

	.toggle-password:hover {
		color: var(--mby-text-secondary);
	}

	/* Password Strength */
	.password-strength {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		margin-top: var(--mby-space-xs);
	}

	.strength-bars {
		display: flex;
		gap: 4px;
		flex: 1;
	}

	.strength-bar {
		height: 4px;
		flex: 1;
		background: var(--mby-gray-200);
		border-radius: 2px;
		transition: background var(--mby-transition-fast);
	}

	.strength-bar.active.red {
		background: var(--mby-red-500);
	}
	.strength-bar.active.orange {
		background: var(--mby-orange-500);
	}
	.strength-bar.active.yellow {
		background: var(--mby-yellow-500);
	}
	.strength-bar.active.green {
		background: var(--mby-green-500);
	}

	.strength-label {
		font-size: 0.75rem;
		font-weight: 500;
		min-width: 60px;
		text-align: right;
	}

	.strength-label.red {
		color: var(--mby-red-500);
	}
	.strength-label.orange {
		color: var(--mby-orange-500);
	}
	.strength-label.yellow {
		color: var(--mby-yellow-600);
	}
	.strength-label.green {
		color: var(--mby-green-500);
	}

	/* Password Checks */
	.password-checks {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-xs);
		margin-top: var(--mby-space-sm);
	}

	.check-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		font-size: 0.75rem;
		color: var(--mby-text-tertiary);
	}

	.check-item :global(svg) {
		opacity: 0.3;
	}

	.check-item.valid {
		color: var(--mby-primary-600);
	}

	.check-item.valid :global(svg) {
		opacity: 1;
	}

	/* Terms */
	.form-terms {
		margin-top: var(--mby-space-sm);
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25em;
		font-size: 0.8125rem;
		color: var(--mby-text-secondary);
		cursor: pointer;
		line-height: 1.5;
	}

	.checkbox-label input {
		margin-top: 3px;
		accent-color: var(--mby-primary-500);
	}

	.checkbox-label a {
		color: var(--mby-primary-600);
		text-decoration: none;
	}

	.checkbox-label a:hover {
		text-decoration: underline;
	}

	/* Error Message */
	.error-message {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		padding: var(--mby-space-md);
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.2);
		border-radius: var(--mby-radius-md);
		color: var(--mby-red-600);
		font-size: 0.875rem;
	}

	/* Spinner */
	.spinner {
		width: 18px;
		height: 18px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Auth Footer */
	.auth-footer {
		margin-top: var(--mby-space-xl);
		text-align: center;
		font-size: 0.9375rem;
		color: var(--mby-text-secondary);
	}

	.auth-footer a {
		color: var(--mby-primary-600);
		font-weight: 500;
		text-decoration: none;
	}

	.auth-footer a:hover {
		text-decoration: underline;
	}

	/* Visual Side */
	.auth-visual-side {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--mby-gradient-hero);
		padding: var(--mby-space-2xl);
	}

	.visual-content {
		max-width: 480px;
		text-align: center;
		color: white;
	}

	.visual-badge {
		display: inline-block;
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: rgba(255, 255, 255, 0.15);
		border-radius: var(--mby-radius-full);
		font-size: 0.875rem;
		font-weight: 600;
		color: white;
		margin-bottom: var(--mby-space-xl);
	}

	.visual-content h2 {
		font-size: 2rem;
		margin-bottom: var(--mby-space-md);
		line-height: 1.3;
		color: white;
	}

	.visual-content p {
		font-size: 1.125rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.7;
		margin-bottom: var(--mby-space-xl);
	}

	/* Benefits List */
	.benefits-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-2xl);
	}

	.benefit-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--mby-space-sm);
		font-size: 1rem;
	}

	.benefit-icon {
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.15);
		border-radius: var(--mby-radius-full);
	}

	/* Mini Testimonial */
	.mini-testimonial {
		background: rgba(255, 255, 255, 0.1);
		border-radius: var(--mby-radius-lg);
		padding: var(--mby-space-lg);
		text-align: left;
	}

	.mini-testimonial p {
		font-size: 0.9375rem;
		font-style: italic;
		margin-bottom: var(--mby-space-md);
		opacity: 0.9;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
	}

	.author-avatar {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.2);
		border-radius: var(--mby-radius-full);
		font-weight: 600;
		font-size: 0.875rem;
	}

	.author-info {
		display: flex;
		flex-direction: column;
	}

	.author-name {
		font-weight: 600;
		font-size: 0.875rem;
	}

	.author-title {
		font-size: 0.75rem;
		opacity: 0.7;
	}

	/* Dark Mode Fixes */
	:global([data-theme='dark']) .input-wrapper input {
		background: var(--mby-surface-1);
		border-color: var(--mby-surface-3);
		color: var(--mby-text-primary);
	}

	:global([data-theme='dark']) .input-wrapper input::placeholder {
		color: var(--mby-gray-500);
	}

	:global([data-theme='dark']) .input-wrapper :global(svg:first-child) {
		color: var(--mby-gray-400);
	}

	:global([data-theme='dark']) .btn-social {
		background: var(--mby-surface-1);
		color: var(--mby-gray-800);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.auth-container {
			grid-template-columns: 1fr;
		}

		.auth-visual-side {
			display: none;
		}
	}

	@media (max-width: 480px) {
		.auth-form-side {
			padding: var(--mby-space-lg);
		}

		.password-checks {
			grid-template-columns: 1fr;
		}
	}
</style>
