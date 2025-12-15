<!-- ═══════════════════════════════════════════════════════════════════════════════
     🚀 ONBOARDING — Configuración inicial del usuario
     ═══════════════════════════════════════════════════════════════════════════════
     Flujo: 
     1. Bienvenida personalizada
     2. Configurar fuentes de ingreso
     3. Crear primeros apartados
     4. Listo para usar
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { 
		ArrowRight, 
		ArrowLeft,
		Check,
		Wallet,
		PiggyBank,
		Calendar,
		Sparkles,
		Plus,
		X
	} from 'lucide-svelte';
	import { fly, fade, scale } from 'svelte/transition';
	import { quintOut, backOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	interface Props {
		data: {
			user?: {
				name?: string;
			};
		};
	}
	let { data }: Props = $props();

	// Estado del onboarding
	let currentStep = $state(1);
	const totalSteps = 4;
	let isSubmitting = $state(false);

	// Datos del paso 2: Fuente de ingreso
	let nombreIngreso = $state('');
	let montoIngreso = $state('');
	let frecuenciaIngreso = $state('quincenal');
	let diaDeposito = $state('15');

	// Datos del paso 3: Apartados
	interface ApartadoTemp {
		nombre: string;
		monto: string;
		emoji: string;
		dia: string;
	}
	let apartados = $state<ApartadoTemp[]>([]);
	let nuevoApartado = $state({ nombre: '', monto: '', emoji: '📌', dia: '' });
	let showApartadoForm = $state(false);

	// Emojis para apartados
	const emojisPopulares = ['🏠', '💡', '📶', '📱', '🚗', '💳', '🏥', '📚', '🎓', '✈️', '🎉', '📌'];

	// Frecuencias de pago
	const frecuencias = [
		{ id: 'semanal', label: 'Semanal' },
		{ id: 'quincenal', label: 'Quincenal' },
		{ id: 'mensual', label: 'Mensual' }
	];

	// Apartados sugeridos
	const apartadosSugeridos = [
		{ nombre: 'Renta', emoji: '🏠', monto: '6500' },
		{ nombre: 'Luz', emoji: '💡', monto: '600' },
		{ nombre: 'Internet', emoji: '📶', monto: '599' },
		{ nombre: 'Celular', emoji: '📱', monto: '400' },
		{ nombre: 'Gas', emoji: '🔥', monto: '300' },
		{ nombre: 'Agua', emoji: '💧', monto: '200' }
	];

	// Formato MXN
	function formatMXN(amount: number): string {
		return new Intl.NumberFormat('es-MX', {
			style: 'currency',
			currency: 'MXN',
			minimumFractionDigits: 0
		}).format(amount);
	}

	// Calcular total apartados
	const totalApartados = $derived(
		apartados.reduce((sum, a) => sum + (Number(a.monto) || 0), 0)
	);

	// Agregar apartado sugerido
	function agregarSugerido(sugerido: typeof apartadosSugeridos[0]) {
		// Verificar si ya existe
		if (apartados.some(a => a.nombre === sugerido.nombre)) return;
		
		apartados = [...apartados, { ...sugerido, dia: '1' }];
	}

	// Agregar apartado personalizado
	function agregarApartado() {
		if (!nuevoApartado.nombre || !nuevoApartado.monto) return;
		
		apartados = [...apartados, { ...nuevoApartado }];
		nuevoApartado = { nombre: '', monto: '', emoji: '📌', dia: '' };
		showApartadoForm = false;
	}

	// Eliminar apartado
	function eliminarApartado(index: number) {
		apartados = apartados.filter((_, i) => i !== index);
	}

	// Navegación
	function nextStep() {
		if (currentStep < totalSteps) {
			currentStep++;
		}
	}

	function prevStep() {
		if (currentStep > 1) {
			currentStep--;
		}
	}

	// Guardar y finalizar
	async function finalizarOnboarding() {
		isSubmitting = true;

		try {
			// 1. Guardar fuente de ingreso (si se configuró)
			if (nombreIngreso && montoIngreso) {
				await fetch('/api/income-sources', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						nombre: nombreIngreso,
						monto: Number(montoIngreso),
						frecuencia: frecuenciaIngreso,
						diaPago: Number(diaDeposito)
					})
				});
			}

			// 2. Guardar apartados
			for (const apartado of apartados) {
				await fetch('/api/apartados', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						nombre: apartado.nombre,
						montoObjetivo: Number(apartado.monto),
						emoji: apartado.emoji,
						diaVencimiento: apartado.dia ? Number(apartado.dia) : null
					})
				});
			}

			// 3. Marcar onboarding como completado
			await fetch('/api/user/onboarding-complete', {
				method: 'POST'
			});

			// Redirigir al dashboard
			await goto('/dashboard');
		} catch (err) {
			console.error('Error en onboarding:', err);
		} finally {
			isSubmitting = false;
		}
	}

	let mounted = $state(false);
	$effect(() => { mounted = true; });
</script>

<svelte:head>
	<title>Configuración inicial | mibiyuyo</title>
</svelte:head>

<div class="onboarding-page">
	{#if mounted}
	<div class="onboarding-container">
		<!-- Progress Bar -->
		<div class="progress-bar-container" in:fade={{ duration: 300 }}>
			<div class="progress-steps">
				{#each Array(totalSteps) as _, i}
					<div 
						class="step-dot" 
						class:active={i + 1 <= currentStep}
						class:current={i + 1 === currentStep}
					></div>
				{/each}
			</div>
			<div class="progress-track">
				<div 
					class="progress-fill" 
					style="width: {((currentStep - 1) / (totalSteps - 1)) * 100}%"
				></div>
			</div>
		</div>

		<!-- Step Content -->
		<div class="step-content">
			{#if currentStep === 1}
				<!-- PASO 1: Bienvenida -->
				<div class="step" in:fly={{ x: 50, duration: 400, easing: quintOut }}>
					<div class="welcome-icon" in:scale={{ start: 0.5, duration: 500, delay: 200, easing: backOut }}>
						<Sparkles size={48} />
					</div>
					<h1>¡Bienvenido{data.user?.name ? `, ${data.user.name.split(' ')[0]}` : ''}! 🎉</h1>
					<p class="step-description">
						En solo 2 minutos configuraremos tu cuenta para que empieces a
						<strong>tomar el control de tu dinero</strong>.
					</p>

					<div class="benefits-list">
						<div class="benefit-item">
							<div class="benefit-icon"><Wallet size={20} /></div>
							<span>Configura tus fuentes de ingreso</span>
						</div>
						<div class="benefit-item">
							<div class="benefit-icon"><PiggyBank size={20} /></div>
							<span>Crea apartados para gastos fijos</span>
						</div>
						<div class="benefit-item">
							<div class="benefit-icon"><Calendar size={20} /></div>
							<span>Siempre sabrás cuánto tienes disponible</span>
						</div>
					</div>

					<button class="btn btn-primary btn-lg btn-shine" onclick={nextStep}>
						Empezar configuración
						<ArrowRight size={20} />
					</button>
				</div>

			{:else if currentStep === 2}
				<!-- PASO 2: Fuente de ingreso -->
				<div class="step" in:fly={{ x: 50, duration: 400, easing: quintOut }}>
					<h2>💰 ¿Cómo recibes tu dinero?</h2>
					<p class="step-description">
						Configura tu fuente principal de ingresos para calcular tu biyuyo disponible.
					</p>

					<div class="form-card">
						<div class="form-group">
							<label for="nombreIngreso">Nombre (ej: Nómina, Freelance)</label>
							<input 
								type="text"
								id="nombreIngreso"
								placeholder="Mi nómina"
								bind:value={nombreIngreso}
								class="input"
							/>
						</div>

						<div class="form-row">
							<div class="form-group">
								<label for="montoIngreso">Monto</label>
								<div class="input-with-prefix">
									<span class="prefix">$</span>
									<input 
										type="text"
										id="montoIngreso"
										inputmode="decimal"
										placeholder="15000"
										bind:value={montoIngreso}
										class="input"
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="frecuencia">Frecuencia</label>
								<select id="frecuencia" bind:value={frecuenciaIngreso} class="input">
									{#each frecuencias as freq}
										<option value={freq.id}>{freq.label}</option>
									{/each}
								</select>
							</div>
						</div>

						<div class="form-group">
							<label for="diaDeposito">¿Qué día te pagan?</label>
							<input 
								type="number"
								id="diaDeposito"
								min="1"
								max="31"
								placeholder="15"
								bind:value={diaDeposito}
								class="input"
							/>
						</div>
					</div>

					<p class="skip-note">
						También puedes <button class="link-btn" onclick={nextStep}>saltar este paso</button> y configurarlo después.
					</p>
				</div>

			{:else if currentStep === 3}
				<!-- PASO 3: Apartados -->
				<div class="step" in:fly={{ x: 50, duration: 400, easing: quintOut }}>
					<h2>📁 Crea tus apartados</h2>
					<p class="step-description">
						Los apartados separan automáticamente el dinero para tus gastos fijos. 
						Así siempre sabes lo que realmente puedes gastar.
					</p>

					<!-- Sugeridos -->
					<div class="sugeridos-section">
						<span class="section-label">Sugerencias rápidas:</span>
						<div class="sugeridos-grid">
							{#each apartadosSugeridos as sugerido}
								<button 
									class="sugerido-chip"
									class:added={apartados.some(a => a.nombre === sugerido.nombre)}
									onclick={() => agregarSugerido(sugerido)}
								>
									<span>{sugerido.emoji}</span>
									<span>{sugerido.nombre}</span>
									{#if apartados.some(a => a.nombre === sugerido.nombre)}
										<Check size={14} />
									{:else}
										<Plus size={14} />
									{/if}
								</button>
							{/each}
						</div>
					</div>

					<!-- Lista de apartados agregados -->
					{#if apartados.length > 0}
						<div class="apartados-added">
							<div class="apartados-header">
								<span>Tus apartados ({apartados.length})</span>
								<span class="total">Total: {formatMXN(totalApartados)}/mes</span>
							</div>
							<div class="apartados-list">
								{#each apartados as apartado, i}
									<div class="apartado-chip" in:scale={{ start: 0.9, duration: 200 }}>
										<span class="emoji">{apartado.emoji}</span>
										<span class="nombre">{apartado.nombre}</span>
										<span class="monto">{formatMXN(Number(apartado.monto))}</span>
										<button class="remove-btn" onclick={() => eliminarApartado(i)}>
											<X size={14} />
										</button>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Agregar personalizado -->
					{#if showApartadoForm}
						<div class="apartado-form" in:fly={{ y: 20, duration: 300 }}>
							<div class="form-row">
								<div class="emoji-picker">
									{#each emojisPopulares as emoji}
										<button 
											type="button"
											class="emoji-btn"
											class:selected={nuevoApartado.emoji === emoji}
											onclick={() => nuevoApartado.emoji = emoji}
										>
											{emoji}
										</button>
									{/each}
								</div>
							</div>
							<div class="form-row">
								<input 
									type="text"
									placeholder="Nombre"
									bind:value={nuevoApartado.nombre}
									class="input"
								/>
								<div class="input-with-prefix">
									<span class="prefix">$</span>
									<input 
										type="text"
										inputmode="decimal"
										placeholder="Monto"
										bind:value={nuevoApartado.monto}
										class="input"
									/>
								</div>
							</div>
							<div class="form-actions">
								<button class="btn btn-outline" onclick={() => showApartadoForm = false}>
									Cancelar
								</button>
								<button class="btn btn-primary" onclick={agregarApartado}>
									<Plus size={16} />
									Agregar
								</button>
							</div>
						</div>
					{:else}
						<button class="btn btn-outline add-custom-btn" onclick={() => showApartadoForm = true}>
							<Plus size={18} />
							Agregar apartado personalizado
						</button>
					{/if}
				</div>

			{:else if currentStep === 4}
				<!-- PASO 4: Listo -->
				<div class="step" in:fly={{ x: 50, duration: 400, easing: quintOut }}>
					<div class="success-icon" in:scale={{ start: 0.5, duration: 500, delay: 200, easing: backOut }}>
						<Check size={48} />
					</div>
					<h1>¡Todo listo! 🚀</h1>
					<p class="step-description">
						Tu cuenta está configurada. Ahora podrás ver tu 
						<strong>biyuyo disponible</strong> en tiempo real.
					</p>

					<!-- Resumen -->
					<div class="summary-card">
						{#if nombreIngreso && montoIngreso}
							<div class="summary-item">
								<span class="label">Ingreso configurado:</span>
								<span class="value">{formatMXN(Number(montoIngreso))} / {frecuenciaIngreso}</span>
							</div>
						{/if}
						{#if apartados.length > 0}
							<div class="summary-item">
								<span class="label">Apartados creados:</span>
								<span class="value">{apartados.length} ({formatMXN(totalApartados)}/mes)</span>
							</div>
						{/if}
						{#if nombreIngreso && montoIngreso && apartados.length > 0}
							<div class="summary-item highlight">
								<span class="label">Tu biyuyo estimado:</span>
								<span class="value big">{formatMXN(Number(montoIngreso) - totalApartados)}</span>
							</div>
						{/if}
					</div>

					<button 
						class="btn btn-primary btn-lg btn-shine" 
						onclick={finalizarOnboarding}
						disabled={isSubmitting}
					>
						{#if isSubmitting}
							Guardando...
						{:else}
							Ir a mi dashboard
							<ArrowRight size={20} />
						{/if}
					</button>
				</div>
			{/if}
		</div>

		<!-- Navigation -->
		{#if currentStep > 1 && currentStep < 4}
			<div class="step-navigation" in:fade={{ duration: 200 }}>
				<button class="btn btn-ghost" onclick={prevStep}>
					<ArrowLeft size={18} />
					Atrás
				</button>
				<button class="btn btn-primary" onclick={nextStep}>
					Continuar
					<ArrowRight size={18} />
				</button>
			</div>
		{:else if currentStep === 4}
			<div class="step-navigation" in:fade={{ duration: 200 }}>
				<button class="btn btn-ghost" onclick={prevStep}>
					<ArrowLeft size={18} />
					Ajustar configuración
				</button>
			</div>
		{/if}
	</div>
	{/if}
</div>

<style>
	.onboarding-page {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--mby-space-xl);
		background: var(--mby-bg-base);
	}

	.onboarding-container {
		width: 100%;
		max-width: 600px;
	}

	/* Progress Bar */
	.progress-bar-container {
		margin-bottom: var(--mby-space-2xl);
	}

	.progress-steps {
		display: flex;
		justify-content: space-between;
		margin-bottom: var(--mby-space-sm);
	}

	.step-dot {
		width: 12px;
		height: 12px;
		border-radius: var(--mby-radius-full);
		background: var(--mby-bg-elevated);
		border: 2px solid var(--mby-border-subtle);
		transition: all 0.3s ease;
	}

	.step-dot.active {
		background: var(--mby-primary-500);
		border-color: var(--mby-primary-500);
	}

	.step-dot.current {
		box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
	}

	.progress-track {
		height: 4px;
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-full);
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--mby-primary-500), var(--mby-gold-500));
		border-radius: var(--mby-radius-full);
		transition: width 0.5s ease;
	}

	/* Step Content */
	.step-content {
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-2xl);
		padding: var(--mby-space-2xl);
		border: 1px solid var(--mby-border-subtle);
		min-height: 400px;
	}

	.step {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.welcome-icon, .success-icon {
		width: 80px;
		height: 80px;
		border-radius: var(--mby-radius-full);
		background: linear-gradient(135deg, var(--mby-primary-500), var(--mby-gold-500));
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin-bottom: var(--mby-space-lg);
	}

	.step h1, .step h2 {
		font-size: var(--mby-text-2xl);
		font-weight: 700;
		color: var(--mby-text-primary);
		margin: 0 0 var(--mby-space-md);
	}

	.step-description {
		font-size: var(--mby-text-base);
		color: var(--mby-text-secondary);
		max-width: 400px;
		margin-bottom: var(--mby-space-xl);
		line-height: 1.6;
	}

	/* Benefits List */
	.benefits-list {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-md);
		margin-bottom: var(--mby-space-xl);
		width: 100%;
		max-width: 320px;
	}

	.benefit-item {
		display: flex;
		align-items: center;
		gap: var(--mby-space-md);
		padding: var(--mby-space-md);
		background: var(--mby-bg-base);
		border-radius: var(--mby-radius-lg);
		text-align: left;
	}

	.benefit-icon {
		width: 40px;
		height: 40px;
		border-radius: var(--mby-radius-md);
		background: rgba(249, 115, 22, 0.1);
		color: var(--mby-primary-500);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.benefit-item span {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-primary);
	}

	/* Form Card */
	.form-card {
		width: 100%;
		background: var(--mby-bg-base);
		padding: var(--mby-space-lg);
		border-radius: var(--mby-radius-xl);
		margin-bottom: var(--mby-space-lg);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: var(--mby-space-xs);
		margin-bottom: var(--mby-space-md);
		text-align: left;
	}

	.form-group:last-child {
		margin-bottom: 0;
	}

	.form-group label {
		font-size: var(--mby-text-sm);
		font-weight: 500;
		color: var(--mby-text-secondary);
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--mby-space-md);
	}

	.input {
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-lg);
		border: 1px solid var(--mby-border-default);
		background: var(--mby-bg-elevated);
		color: var(--mby-text-primary);
		font-size: var(--mby-text-base);
		width: 100%;
		transition: all 0.2s ease;
	}

	.input:focus {
		outline: none;
		border-color: var(--mby-primary-500);
		box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
	}

	select.input {
		cursor: pointer;
	}

	.input-with-prefix {
		display: flex;
		align-items: center;
	}

	.prefix {
		padding: var(--mby-space-md);
		background: var(--mby-bg-base);
		border: 1px solid var(--mby-border-default);
		border-right: none;
		border-radius: var(--mby-radius-lg) 0 0 var(--mby-radius-lg);
		color: var(--mby-text-tertiary);
	}

	.input-with-prefix .input {
		border-radius: 0 var(--mby-radius-lg) var(--mby-radius-lg) 0;
	}

	.skip-note {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-tertiary);
	}

	.link-btn {
		background: none;
		border: none;
		color: var(--mby-primary-500);
		cursor: pointer;
		text-decoration: underline;
		font-size: inherit;
	}

	/* Sugeridos */
	.sugeridos-section {
		width: 100%;
		margin-bottom: var(--mby-space-lg);
		text-align: left;
	}

	.section-label {
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
		display: block;
		margin-bottom: var(--mby-space-sm);
	}

	.sugeridos-grid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
	}

	.sugerido-chip {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm) var(--mby-space-md);
		border-radius: var(--mby-radius-full);
		border: 1px solid var(--mby-border-subtle);
		background: var(--mby-bg-base);
		cursor: pointer;
		font-size: var(--mby-text-sm);
		transition: all 0.2s ease;
	}

	.sugerido-chip:hover {
		border-color: var(--mby-primary-300);
	}

	.sugerido-chip.added {
		background: rgba(249, 115, 22, 0.1);
		border-color: var(--mby-primary-500);
		color: var(--mby-primary-600);
	}

	/* Apartados Added */
	.apartados-added {
		width: 100%;
		background: var(--mby-bg-base);
		padding: var(--mby-space-md);
		border-radius: var(--mby-radius-xl);
		margin-bottom: var(--mby-space-lg);
	}

	.apartados-header {
		display: flex;
		justify-content: space-between;
		font-size: var(--mby-text-sm);
		color: var(--mby-text-secondary);
		margin-bottom: var(--mby-space-sm);
	}

	.apartados-header .total {
		font-weight: 600;
		color: var(--mby-primary-600);
	}

	.apartados-list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
	}

	.apartado-chip {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-xs) var(--mby-space-sm);
		background: var(--mby-bg-elevated);
		border-radius: var(--mby-radius-lg);
		font-size: var(--mby-text-sm);
	}

	.apartado-chip .emoji {
		font-size: 1rem;
	}

	.apartado-chip .nombre {
		color: var(--mby-text-primary);
	}

	.apartado-chip .monto {
		color: var(--mby-text-tertiary);
	}

	.remove-btn {
		width: 20px;
		height: 20px;
		border-radius: var(--mby-radius-full);
		background: transparent;
		border: none;
		color: var(--mby-text-tertiary);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.remove-btn:hover {
		background: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	/* Apartado Form */
	.apartado-form {
		width: 100%;
		background: var(--mby-bg-base);
		padding: var(--mby-space-lg);
		border-radius: var(--mby-radius-xl);
		margin-bottom: var(--mby-space-lg);
	}

	.emoji-picker {
		display: flex;
		flex-wrap: wrap;
		gap: var(--mby-space-xs);
		margin-bottom: var(--mby-space-md);
	}

	.emoji-btn {
		width: 36px;
		height: 36px;
		border-radius: var(--mby-radius-md);
		border: 2px solid var(--mby-border-subtle);
		background: var(--mby-bg-elevated);
		font-size: 1.2rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.emoji-btn:hover {
		border-color: var(--mby-primary-300);
	}

	.emoji-btn.selected {
		border-color: var(--mby-primary-500);
		background: rgba(249, 115, 22, 0.1);
	}

	.form-actions {
		display: flex;
		gap: var(--mby-space-sm);
		justify-content: flex-end;
		margin-top: var(--mby-space-md);
	}

	.add-custom-btn {
		width: 100%;
		margin-bottom: var(--mby-space-lg);
	}

	/* Summary Card */
	.summary-card {
		width: 100%;
		background: var(--mby-bg-base);
		padding: var(--mby-space-lg);
		border-radius: var(--mby-radius-xl);
		margin-bottom: var(--mby-space-xl);
	}

	.summary-item {
		display: flex;
		justify-content: space-between;
		padding: var(--mby-space-sm) 0;
		border-bottom: 1px solid var(--mby-border-subtle);
	}

	.summary-item:last-child {
		border-bottom: none;
	}

	.summary-item .label {
		color: var(--mby-text-secondary);
		font-size: var(--mby-text-sm);
	}

	.summary-item .value {
		color: var(--mby-text-primary);
		font-weight: 500;
	}

	.summary-item.highlight {
		padding-top: var(--mby-space-md);
		margin-top: var(--mby-space-sm);
	}

	.summary-item .value.big {
		font-size: var(--mby-text-xl);
		color: var(--mby-primary-600);
		font-weight: 700;
	}

	/* Navigation */
	.step-navigation {
		display: flex;
		justify-content: space-between;
		margin-top: var(--mby-space-xl);
	}

	.btn-ghost {
		background: transparent;
		border: none;
		color: var(--mby-text-secondary);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm) var(--mby-space-md);
		border-radius: var(--mby-radius-lg);
		transition: all 0.2s ease;
	}

	.btn-ghost:hover {
		background: var(--mby-bg-elevated);
		color: var(--mby-text-primary);
	}

	/* Responsive */
	@media (max-width: 640px) {
		.onboarding-page {
			padding: var(--mby-space-md);
		}

		.step-content {
			padding: var(--mby-space-lg);
		}

		.form-row {
			grid-template-columns: 1fr;
		}
	}
</style>
