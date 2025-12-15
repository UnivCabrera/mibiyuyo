// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 i18n STORE — Control de Idioma Global (Sin animaciones)
// ═══════════════════════════════════════════════════════════════════════════════
// Sistema reactivo con Svelte 5 Runes
// ═══════════════════════════════════════════════════════════════════════════════

import { translations, type Locale, type Translations } from './translations';
export type { Locale } from './translations';

// Estado reactivo del idioma usando un objeto para forzar reactividad
const localeState = $state({ value: 'es' as Locale });

// Obtener idioma del navegador
function getBrowserLocale(): Locale {
	if (globalThis.window === undefined) return 'es';
	
	const browserLang = navigator.language.split('-')[0].toLowerCase();
	
	// Mapear códigos de idioma del navegador a nuestros locales
	const langMap: Record<string, Locale> = {
		'es': 'es',
		'en': 'en',
		'pt': 'pt',
		'zh': 'zh',
		'ko': 'ko',
		'ja': 'ja',
		'fr': 'fr',
		'de': 'de',
		'it': 'it',
		'ru': 'ru'
	};
	
	return langMap[browserLang] || 'es';
}

// Obtener idioma guardado
function getSavedLocale(): Locale {
	if (globalThis.window === undefined) return 'es';
	const saved = localStorage.getItem('mibiyuyo-locale') as Locale | null;
	return saved && translations[saved] ? saved : getBrowserLocale();
}

// Inicializar idioma
export function initLocale() {
	localeState.value = getSavedLocale();
	if (typeof document !== 'undefined') {
		document.documentElement.setAttribute('lang', localeState.value);
	}
}

// Cambiar idioma
export function setLocale(locale: Locale) {
	if (!translations[locale]) return;
	
	localeState.value = locale;
	if (globalThis.window !== undefined) {
		localStorage.setItem('mibiyuyo-locale', locale);
		document.documentElement.setAttribute('lang', locale);
	}
}

// Obtener idioma actual (reactivo)
export function getLocale(): Locale {
	return localeState.value;
}

// Obtener traducciones actuales (reactivo)
export function t(): Translations {
	return translations[localeState.value];
}

// Lista de idiomas disponibles (variedad de idiomas, no países)
export const availableLocales: { code: Locale; name: string; nativeName: string }[] = [
	{ code: 'es', name: 'Spanish', nativeName: 'Español' },
	{ code: 'en', name: 'English', nativeName: 'English' },
	{ code: 'zh', name: 'Chinese', nativeName: '中文' },
	{ code: 'ko', name: 'Korean', nativeName: '한국어' },
	{ code: 'ja', name: 'Japanese', nativeName: '日本語' },
	{ code: 'pt', name: 'Portuguese', nativeName: 'Português' },
	{ code: 'fr', name: 'French', nativeName: 'Français' },
	{ code: 'de', name: 'German', nativeName: 'Deutsch' },
	{ code: 'it', name: 'Italian', nativeName: 'Italiano' },
	{ code: 'ru', name: 'Russian', nativeName: 'Русский' }
];
