<!-- ═══════════════════════════════════════════════════════════════════════════════
     🌍 LANGUAGE SELECTOR — Selector de Idioma
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Globe } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { availableLocales, getLocale, setLocale, initLocale, type Locale } from '$lib/i18n/index.svelte';

	let isOpen = $state(false);
	let mounted = $state(false);
	let currentLocale = $derived(mounted ? getLocale() : 'es');

	onMount(() => {
		initLocale();
		mounted = true;
	});

	function handleSelect(locale: Locale) {
		setLocale(locale);
		isOpen = false;
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
</script>

<div class="language-selector">
	<button
		class="selector-trigger"
		onclick={() => isOpen = !isOpen}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
	>
		<Globe size={18} />
		<span class="current-flag">
			{availableLocales.find(l => l.code === currentLocale)?.flag || '🇲🇽'}
		</span>
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
					<span class="option-flag">{locale.flag}</span>
					<span class="option-name">{locale.name}</span>
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
		transition: all var(--mby-transition-fast);
	}

	.selector-trigger:hover {
		background: rgba(255, 255, 255, 0.15);
		border-color: rgba(255, 255, 255, 0.25);
	}

	.current-flag {
		font-size: 1.125rem;
	}

	.selector-dropdown {
		position: absolute;
		top: calc(100% + 8px);
		right: 0;
		min-width: 160px;
		background: var(--mby-surface-0);
		border: 1px solid var(--mby-surface-3);
		border-radius: var(--mby-radius-lg);
		box-shadow: var(--mby-shadow-lg);
		overflow: hidden;
		z-index: var(--mby-z-dropdown);
		animation: fadeInUp 0.2s ease-out;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.locale-option {
		display: flex;
		align-items: center;
		gap: var(--mby-space-sm);
		width: 100%;
		padding: var(--mby-space-md);
		background: transparent;
		border: none;
		cursor: pointer;
		transition: background var(--mby-transition-fast);
	}

	.locale-option:hover {
		background: var(--mby-surface-1);
	}

	.locale-option.active {
		background: var(--mby-gold-50);
	}

	.option-flag {
		font-size: 1.25rem;
	}

	.option-name {
		font-size: var(--mby-text-sm, 0.9375rem);
		color: var(--mby-text-primary);
	}

	.locale-option.active .option-name {
		font-weight: 600;
		color: var(--mby-primary-600);
	}
</style>
