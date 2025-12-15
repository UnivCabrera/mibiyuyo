// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 i18n STORE — Control de Idioma Global
// ═══════════════════════════════════════════════════════════════════════════════
// Usando Svelte 5 Runes para máximo rendimiento
// ═══════════════════════════════════════════════════════════════════════════════

import { translations, type Locale, type Translations } from './translations';
export type { Locale } from './translations';

// Estado reactivo del idioma
let currentLocale = $state<Locale>('es');

// Obtener idioma del navegador
function getBrowserLocale(): Locale {
	if (globalThis.window === undefined) return 'es';
	
	const browserLang = navigator.language.split('-')[0];
	
	if (browserLang === 'en') return 'en';
	if (browserLang === 'pt') return 'pt';
	
	return 'es'; // Default
}

// Obtener idioma guardado
function getSavedLocale(): Locale {
	if (globalThis.window === undefined) return 'es';
	const saved = localStorage.getItem('mibiyuyo-locale') as Locale | null;
	return saved || getBrowserLocale();
}

// Inicializar idioma
export function initLocale() {
	currentLocale = getSavedLocale();
}

// Cambiar idioma
export function setLocale(locale: Locale) {
	currentLocale = locale;
	if (globalThis.window !== undefined) {
		localStorage.setItem('mibiyuyo-locale', locale);
		document.documentElement.setAttribute('lang', locale);
	}
}

// Obtener idioma actual
export function getLocale(): Locale {
	return currentLocale;
}

// Obtener traducciones actuales
export function t(): Translations {
	return translations[currentLocale];
}

// Lista de idiomas disponibles
export const availableLocales: { code: Locale; name: string; flag: string }[] = [
	{ code: 'es', name: 'Español', flag: '🇲🇽' },
	{ code: 'en', name: 'English', flag: '🇺🇸' },
	{ code: 'pt', name: 'Português', flag: '🇧🇷' }
];
