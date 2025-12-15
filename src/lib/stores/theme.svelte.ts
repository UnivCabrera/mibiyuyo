// ═══════════════════════════════════════════════════════════════════════════════
// 🌙 THEME STORE — Control de Modo Claro/Oscuro
// ═══════════════════════════════════════════════════════════════════════════════
// Usando Svelte 5 Runes para máximo rendimiento
// ═══════════════════════════════════════════════════════════════════════════════

type Theme = 'light' | 'dark';

// Estado reactivo del tema
let currentTheme = $state<Theme>('light');

// Detectar preferencia del sistema
function getSystemPreference(): Theme {
	if (typeof globalThis.window === 'undefined') return 'light';
	return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Obtener tema guardado o usar preferencia del sistema
function getSavedTheme(): Theme {
	if (typeof globalThis.window === 'undefined') return 'light';
	const saved = localStorage.getItem('mibiyuyo-theme') as Theme | null;
	return saved || getSystemPreference();
}

// Aplicar tema al DOM
function applyTheme(theme: Theme) {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
	// Meta theme-color para mobile browsers
	const metaTheme = document.querySelector('meta[name="theme-color"]');
	if (metaTheme) {
		metaTheme.setAttribute('content', theme === 'dark' ? '#0a0a0f' : '#ffffff');
	}
}

// Inicializar tema
export function initTheme() {
	currentTheme = getSavedTheme();
	applyTheme(currentTheme);
	
	// Escuchar cambios en preferencia del sistema
	if (typeof globalThis.window !== 'undefined') {
		const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', (e) => {
			// Solo cambiar si no hay preferencia guardada
			if (!localStorage.getItem('mibiyuyo-theme')) {
				currentTheme = e.matches ? 'dark' : 'light';
				applyTheme(currentTheme);
			}
		});
	}
}

// Toggle entre temas
export function toggleTheme() {
	currentTheme = currentTheme === 'light' ? 'dark' : 'light';
	localStorage.setItem('mibiyuyo-theme', currentTheme);
	applyTheme(currentTheme);
}

// Establecer tema específico
export function setTheme(theme: Theme) {
	currentTheme = theme;
	localStorage.setItem('mibiyuyo-theme', theme);
	applyTheme(currentTheme);
}

// Exportar getter reactivo
export function getTheme(): Theme {
	return currentTheme;
}

// Verificar si es modo oscuro
export function isDark(): boolean {
	return currentTheme === 'dark';
}
