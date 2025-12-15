<!-- ═══════════════════════════════════════════════════════════════════════════════
     🌍 LANGUAGE SELECTOR — Selector de Idioma (Sin animaciones)
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Globe, Check } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { availableLocales, getLocale, setLocale, initLocale, type Locale } from '$lib/i18n/index.svelte';

	let isOpen = $state(false);
	let currentLocale = $state<Locale>('es');

	onMount(() => {
		initLocale();
		currentLocale = getLocale();
	});

	function handleSelect(locale: Locale) {
		setLocale(locale);
		currentLocale = locale;
		isOpen = false;
		// Recargar para aplicar traducciones
		window.location.reload();
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-selector')) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});

	const currentLocaleData = $derived(availableLocales.find(l => l.code === currentLocale));
</script>

<div class="language-selector">
	<button
		class="selector-trigger"
		onclick={() => isOpen = !isOpen}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label="Seleccionar idioma"
	>
		<Globe size={18} />
		<span class="current-lang">{currentLocaleData?.code.toUpperCase() || 'ES'}</span>
	</button>

	{#if isOpen}
		<div class="selector-dropdown" role="listbox">
			{#each availableLocales as locale}
				<button
					class="locale-option"
					class:active={locale.code === currentLocale}
					onclick={() => handleSelect(locale.code)}
					role="option"
					aria-selected={locale.code === currentLocale}
				>
					<span class="option-code">{locale.code.toUpperCase()}</span>
					<div class="option-text">
						<span class="option-native">{locale.nativeName}</span>
					</div>
					{#if locale.code === currentLocale}
						<Check size={16} class="check-icon" />
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.language-selector {
		position: relative;
	}

	.selector-trigger {
		display: flex;
		align-items: center;
		gap: var(--mby-space-xs);
		padding: var(--mby-space-sm) var(--mby-space-md);
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: var(--mby-radius-md);
		color: var(--mby-text-inverse);
		cursor: pointer;
	}

	.selector-trigger:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.current-lang {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.selector-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		min-width: 180px;
		max-height: 320px;
		overflow-y: auto;
		background: var(--mby-surface-0, #fff);
		border: 1px solid var(--mby-surface-3, #e5e5e5);
		border-radius: var(--mby-radius-lg);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		z-index: 9999;
	}

	.locale-option {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		width: 100%;
		padding: 10px 14px;
		background: transparent;
		border: none;
		cursor: pointer;
		text-align: left;
	}

	.locale-option:hover {
		background: var(--mby-surface-1, #f5f5f5);
	}

	.locale-option.active {
		background: var(--mby-gold-50, #fffbeb);
	}

	.option-code {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--mby-text-tertiary, #999);
		background: var(--mby-surface-2, #eee);
		padding: 2px 6px;
		border-radius: 4px;
		min-width: 28px;
		text-align: center;
	}

	.locale-option.active .option-code {
		background: var(--mby-primary-100, #ffedd5);
		color: var(--mby-primary-600, #ea580c);
	}

	.option-text {
		flex: 1;
	}

	.option-native {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--mby-text-primary, #1a1a1a);
	}

	.locale-option.active .option-native {
		color: var(--mby-primary-600, #ea580c);
	}

	.locale-option :global(.check-icon) {
		color: var(--mby-primary-500, #f97316);
		flex-shrink: 0;
	}
</style>
