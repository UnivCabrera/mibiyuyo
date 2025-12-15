<!-- ═══════════════════════════════════════════════════════════════════════════
     🔐 LOGIN PAGE — Inicio de Sesión
     ═══════════════════════════════════════════════════════════════════════════
     Psicología Aplicada:
     - Simplicidad: Reducir fricción cognitiva
     - Confianza: Indicadores de seguridad visibles
     - Motivación: Recordar beneficios del producto
     ═══════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let showPassword = $state(false);
	let rememberMe = $state(false);
	let isLoading = $state(false);
	let error = $state('');
	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		isLoading = true;

		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Error al iniciar sesión');
			}

			// Redirigir al dashboard
			await goto('/dashboard');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Error desconocido';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Iniciar Sesión | mibiyuyo</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-container">
		<!-- Left Side - Form -->
		<div class="auth-form-side">
			{#if mounted}
			<div class="auth-form-wrapper" in:fly={{ y: 30, duration: 600, easing: quintOut }}>
				<!-- Logo -->
				<a href="/" class="auth-logo">
					<div class="logo-icon">
						<Leaf size={24} />
					</div>
					<span class="logo-text">mibiyuyo</span>
				</a>

				<div class="auth-header">
					<h1>Bienvenido de vuelta</h1>
					<p>Ingresa tus datos para acceder a tu cuenta</p>
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
					<span>o continúa con tu email</span>
				</div>

				<!-- Login Form -->
				<form onsubmit={handleSubmit} class="auth-form">
					{#if error}
						<div class="error-message">
							<AlertCircle size={16} />
							<span>{error}</span>
						</div>
					{/if}

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
								autocomplete="current-password"
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
					</div>

					<div class="form-options">
						<label class="checkbox-label">
							<input type="checkbox" bind:checked={rememberMe} />
							<span class="checkmark"></span>
							Recordarme
						</label>
						<a href="/auth/forgot-password" class="forgot-link">¿Olvidaste tu contraseña?</a>
					</div>

					<button type="submit" class="btn btn-primary btn-lg btn-full" disabled={isLoading}>
						{#if isLoading}
							<span class="spinner"></span>
							Iniciando sesión...
						{:else}
							Iniciar sesión
							<ArrowRight size={18} />
						{/if}
					</button>
				</form>

				<p class="auth-footer">
					¿No tienes cuenta?
					<a href="/auth/register">Regístrate gratis</a>
				</p>
			</div>
			{/if}
		</div>

		<!-- Right Side - Illustration -->
		<div class="auth-visual-side">
			<div class="visual-content">
				<div class="visual-badge">💚 +2,500 usuarios activos</div>
				<h2>Retoma el control de tus finanzas</h2>
				<p>
					Accede a tu dashboard personalizado y descubre cuánto puedes gastar hoy sin
					afectar tus compromisos.
				</p>
				<div class="visual-features">
					<div class="vf-item">✓ Dashboard en tiempo real</div>
					<div class="vf-item">✓ Alertas inteligentes</div>
					<div class="vf-item">✓ Sincronización automática</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.auth-page {
		min-height: 100vh;
		background: var(--mby-surface-0);
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
		background: var(--mby-surface-0);
	}

	.auth-form-wrapper {
		width: 100%;
		max-width: 420px;
	}

	.auth-logo {
		display: inline-flex;
		align-items: center;
		gap: var(--mby-space-sm);
		text-decoration: none;
		margin-bottom: var(--mby-space-2xl);
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
		margin-bottom: var(--mby-space-xl);
	}

	.auth-header h1 {
		font-size: var(--mby-text-3xl, 2rem);
		color: var(--mby-text-primary);
		margin-bottom: var(--mby-space-xs);
		font-weight: 700;
	}

	.auth-header p {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-base, 1.0625rem);
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
		padding: var(--mby-space-md) var(--mby-space-lg);
		background: var(--mby-surface-0);
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-lg);
		font-size: var(--mby-text-sm, 0.9375rem);
		font-weight: 500;
		color: var(--mby-text-primary);
		cursor: pointer;
		transition: all var(--mby-transition-fast);
	}

	.btn-social:hover {
		background: var(--mby-surface-1);
		border-color: var(--mby-gold-300);
		transform: translateY(-2px);
		box-shadow: var(--mby-shadow-md);
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
		background: var(--mby-surface-3);
	}

	.divider span {
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-text-muted);
		white-space: nowrap;
	}

	/* Form */
	.auth-form {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
	}

	.form-group label {
		font-size: var(--mby-text-sm, 0.9375rem);
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
		color: var(--mby-text-muted);
		pointer-events: none;
	}

	.input-wrapper input {
		width: 100%;
		padding: var(--mby-space-md) var(--mby-space-md) var(--mby-space-md) 48px;
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-lg);
		font-size: var(--mby-text-base, 1rem);
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
		color: var(--mby-text-muted);
	}

	.toggle-password {
		position: absolute;
		right: var(--mby-space-md);
		background: none;
		border: none;
		color: var(--mby-text-muted);
		cursor: pointer;
		padding: 0;
		display: flex;
		transition: color var(--mby-transition-fast);
	}

	.toggle-password:hover {
		color: var(--mby-text-secondary);
	}

	/* Form Options */
	.form-options {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-text-secondary);
		cursor: pointer;
	}

	.checkbox-label input {
		accent-color: var(--mby-primary-500);
		width: 16px;
		height: 16px;
	}

	.forgot-link {
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-primary-600);
		text-decoration: none;
		transition: color var(--mby-transition-fast);
	}

	.forgot-link:hover {
		color: var(--mby-primary-500);
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
		margin-bottom: var(--mby-space-xl);
	}

	.visual-content h2 {
		font-size: 2rem;
		margin-bottom: var(--mby-space-md);
		line-height: 1.3;
	}

	.visual-content p {
		font-size: 1.125rem;
		opacity: 0.8;
		line-height: 1.7;
		margin-bottom: var(--mby-space-xl);
	}

	.visual-features {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-sm);
		align-items: center;
	}

	.vf-item {
		font-size: 0.9375rem;
		opacity: 0.9;
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

		.form-options {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--mby-space-sm);
		}
	}
</style>
