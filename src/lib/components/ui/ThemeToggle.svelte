<!-- ═══════════════════════════════════════════════════════════════════════════════
     🌙 THEME TOGGLE — Botón de Modo Oscuro/Claro
     ═══════════════════════════════════════════════════════════════════════════════ -->
<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { toggleTheme, getTheme, initTheme } from '$lib/stores/theme.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let isDark = $derived(mounted && getTheme() === 'dark');

	onMount(() => {
		initTheme();
		mounted = true;
	});
</script>

<button
	class="theme-toggle"
	onclick={toggleTheme}
	aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
	title={isDark ? 'Modo claro' : 'Modo oscuro'}
>
	<div class="toggle-track" class:dark={isDark}>
		<div class="toggle-icons">
			<Sun size={14} class="icon-sun" />
			<Moon size={14} class="icon-moon" />
		</div>
		<div class="toggle-thumb" class:dark={isDark}>
			{#if isDark}
				<Moon size={12} />
			{:else}
				<Sun size={12} />
			{/if}
		</div>
	</div>
</button>

<style>
	.theme-toggle {
		position: relative;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.toggle-track {
		width: 56px;
		height: 28px;
		background: linear-gradient(135deg, #fbbf24 0%, #f97316 100%);
		border-radius: 14px;
		position: relative;
		transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		overflow: hidden;
		box-shadow: 
			inset 0 2px 4px rgba(0, 0, 0, 0.1),
			0 2px 8px rgba(251, 191, 36, 0.3);
	}

	.toggle-track.dark {
		background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
		box-shadow: 
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			0 2px 8px rgba(249, 115, 22, 0.2);
	}

	.toggle-icons {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 6px;
		pointer-events: none;
	}

	.toggle-icons :global(.icon-sun) {
		color: rgba(255, 255, 255, 0.9);
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.toggle-track.dark .toggle-icons :global(.icon-sun) {
		opacity: 0.3;
	}

	.toggle-icons :global(.icon-moon) {
		color: rgba(255, 255, 255, 0.5);
		opacity: 0.3;
		transition: opacity 0.3s ease;
	}

	.toggle-track.dark .toggle-icons :global(.icon-moon) {
		color: var(--mby-orange-400);
		opacity: 1;
	}

	.toggle-thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 22px;
		height: 22px;
		background: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 
			0 2px 4px rgba(0, 0, 0, 0.2),
			0 1px 2px rgba(0, 0, 0, 0.1);
		transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}

	.toggle-thumb.dark {
		left: calc(100% - 25px);
		background: var(--mby-surface-2, #1a1a24);
	}

	.toggle-thumb :global(svg) {
		color: #f97316;
		transition: color 0.3s ease;
	}

	.toggle-thumb.dark :global(svg) {
		color: var(--mby-orange-400);
	}

	/* Hover effect */
	.theme-toggle:hover .toggle-track {
		box-shadow: 
			inset 0 2px 4px rgba(0, 0, 0, 0.1),
			0 4px 12px rgba(251, 191, 36, 0.4);
	}

	.theme-toggle:hover .toggle-track.dark {
		box-shadow: 
			inset 0 2px 4px rgba(0, 0, 0, 0.3),
			0 4px 12px rgba(249, 115, 22, 0.4);
	}

	/* Focus state */
	.theme-toggle:focus-visible .toggle-track {
		outline: 2px solid var(--mby-primary-500);
		outline-offset: 2px;
	}
</style>
