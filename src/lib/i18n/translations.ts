// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 i18n — Sistema de Internacionalización
// ═══════════════════════════════════════════════════════════════════════════════
// Idiomas soportados: Español (MX), English, Português
// ═══════════════════════════════════════════════════════════════════════════════

export type Locale = 'es' | 'en' | 'pt';

export interface Translations {
	// Common
	common: {
		loading: string;
		error: string;
		success: string;
		cancel: string;
		save: string;
		delete: string;
		edit: string;
		close: string;
		back: string;
		next: string;
		submit: string;
		search: string;
	};
	// Navigation
	nav: {
		features: string;
		benefits: string;
		testimonials: string;
		pricing: string;
		faq: string;
		login: string;
		register: string;
		logout: string;
		dashboard: string;
	};
	// Hero Section
	hero: {
		badge: string;
		title: string;
		titleHighlight: string;
		subtitle: string;
		ctaPrimary: string;
		ctaSecondary: string;
		trustSecurity: string;
		trustSetup: string;
		trustNoCard: string;
	};
	// Auth
	auth: {
		loginTitle: string;
		loginSubtitle: string;
		registerTitle: string;
		registerSubtitle: string;
		email: string;
		password: string;
		confirmPassword: string;
		rememberMe: string;
		forgotPassword: string;
		noAccount: string;
		hasAccount: string;
		orContinueWith: string;
		continueWithGoogle: string;
	};
	// Pricing
	pricing: {
		title: string;
		subtitle: string;
		monthly: string;
		annual: string;
		discount: string;
		free: string;
		pro: string;
		business: string;
		popular: string;
		getStarted: string;
		tryFree: string;
		contactSales: string;
	};
	// Footer
	footer: {
		tagline: string;
		legal: string;
		privacy: string;
		terms: string;
		support: string;
	};
}

// Español (México) - Default
export const es: Translations = {
	common: {
		loading: 'Cargando...',
		error: 'Error',
		success: 'Éxito',
		cancel: 'Cancelar',
		save: 'Guardar',
		delete: 'Eliminar',
		edit: 'Editar',
		close: 'Cerrar',
		back: 'Atrás',
		next: 'Siguiente',
		submit: 'Enviar',
		search: 'Buscar'
	},
	nav: {
		features: 'Características',
		benefits: 'Beneficios',
		testimonials: 'Testimonios',
		pricing: 'Precios',
		faq: 'FAQ',
		login: 'Iniciar sesión',
		register: 'Registrarte gratis',
		logout: 'Cerrar sesión',
		dashboard: 'Dashboard'
	},
	hero: {
		badge: 'Las primeras 18 características son 100% gratis',
		title: '¿Sabes cuánto puedes gastar',
		titleHighlight: 'HOY',
		subtitle: 'mibiyuyo te dice exactamente cuánto dinero tienes disponible cada día, aparta automáticamente tus gastos fijos, y te ayuda a dejar de vivir quincena a quincena.',
		ctaPrimary: 'Empezar gratis',
		ctaSecondary: 'Ver cómo funciona',
		trustSecurity: 'Datos 100% seguros',
		trustSetup: 'Configuración en 2 minutos',
		trustNoCard: 'Sin tarjeta de crédito'
	},
	auth: {
		loginTitle: 'Bienvenido de vuelta',
		loginSubtitle: 'Ingresa tus datos para acceder a tu cuenta',
		registerTitle: 'Crear cuenta gratis',
		registerSubtitle: 'Únete a miles de personas que ya controlan su dinero',
		email: 'Email',
		password: 'Contraseña',
		confirmPassword: 'Confirmar contraseña',
		rememberMe: 'Recordarme',
		forgotPassword: '¿Olvidaste tu contraseña?',
		noAccount: '¿No tienes cuenta?',
		hasAccount: '¿Ya tienes cuenta?',
		orContinueWith: 'o continúa con tu email',
		continueWithGoogle: 'Continuar con Google'
	},
	pricing: {
		title: 'Empieza gratis, crece cuando quieras',
		subtitle: 'Sin trucos, sin letras chiquitas. Las 18 características base son gratis para siempre.',
		monthly: 'Mensual',
		annual: 'Anual',
		discount: '-20%',
		free: 'Gratis',
		pro: 'Pro',
		business: 'Negocio',
		popular: 'Más popular',
		getStarted: 'Empezar gratis',
		tryFree: 'Probar Pro gratis 14 días',
		contactSales: 'Contactar ventas'
	},
	footer: {
		tagline: 'Tu aliado financiero diario.',
		legal: 'Legal',
		privacy: 'Privacidad',
		terms: 'Términos',
		support: 'Soporte'
	}
};

// English
export const en: Translations = {
	common: {
		loading: 'Loading...',
		error: 'Error',
		success: 'Success',
		cancel: 'Cancel',
		save: 'Save',
		delete: 'Delete',
		edit: 'Edit',
		close: 'Close',
		back: 'Back',
		next: 'Next',
		submit: 'Submit',
		search: 'Search'
	},
	nav: {
		features: 'Features',
		benefits: 'Benefits',
		testimonials: 'Testimonials',
		pricing: 'Pricing',
		faq: 'FAQ',
		login: 'Sign in',
		register: 'Sign up free',
		logout: 'Sign out',
		dashboard: 'Dashboard'
	},
	hero: {
		badge: 'First 18 features are 100% free',
		title: 'Do you know how much you can spend',
		titleHighlight: 'TODAY',
		subtitle: 'mibiyuyo tells you exactly how much money you have available each day, automatically sets aside your fixed expenses, and helps you stop living paycheck to paycheck.',
		ctaPrimary: 'Start free',
		ctaSecondary: 'See how it works',
		trustSecurity: '100% secure data',
		trustSetup: 'Setup in 2 minutes',
		trustNoCard: 'No credit card required'
	},
	auth: {
		loginTitle: 'Welcome back',
		loginSubtitle: 'Enter your details to access your account',
		registerTitle: 'Create free account',
		registerSubtitle: 'Join thousands of people who already control their money',
		email: 'Email',
		password: 'Password',
		confirmPassword: 'Confirm password',
		rememberMe: 'Remember me',
		forgotPassword: 'Forgot password?',
		noAccount: "Don't have an account?",
		hasAccount: 'Already have an account?',
		orContinueWith: 'or continue with email',
		continueWithGoogle: 'Continue with Google'
	},
	pricing: {
		title: 'Start free, grow when you want',
		subtitle: 'No tricks, no fine print. The 18 base features are free forever.',
		monthly: 'Monthly',
		annual: 'Annual',
		discount: '-20%',
		free: 'Free',
		pro: 'Pro',
		business: 'Business',
		popular: 'Most popular',
		getStarted: 'Get started free',
		tryFree: 'Try Pro free 14 days',
		contactSales: 'Contact sales'
	},
	footer: {
		tagline: 'Your daily financial ally.',
		legal: 'Legal',
		privacy: 'Privacy',
		terms: 'Terms',
		support: 'Support'
	}
};

// Português
export const pt: Translations = {
	common: {
		loading: 'Carregando...',
		error: 'Erro',
		success: 'Sucesso',
		cancel: 'Cancelar',
		save: 'Salvar',
		delete: 'Excluir',
		edit: 'Editar',
		close: 'Fechar',
		back: 'Voltar',
		next: 'Próximo',
		submit: 'Enviar',
		search: 'Buscar'
	},
	nav: {
		features: 'Recursos',
		benefits: 'Benefícios',
		testimonials: 'Depoimentos',
		pricing: 'Preços',
		faq: 'FAQ',
		login: 'Entrar',
		register: 'Cadastre-se grátis',
		logout: 'Sair',
		dashboard: 'Dashboard'
	},
	hero: {
		badge: 'Os primeiros 18 recursos são 100% gratuitos',
		title: 'Você sabe quanto pode gastar',
		titleHighlight: 'HOJE',
		subtitle: 'mibiyuyo diz exatamente quanto dinheiro você tem disponível a cada dia, reserva automaticamente suas despesas fixas e ajuda você a parar de viver de salário em salário.',
		ctaPrimary: 'Começar grátis',
		ctaSecondary: 'Veja como funciona',
		trustSecurity: 'Dados 100% seguros',
		trustSetup: 'Configuração em 2 minutos',
		trustNoCard: 'Sem cartão de crédito'
	},
	auth: {
		loginTitle: 'Bem-vindo de volta',
		loginSubtitle: 'Digite seus dados para acessar sua conta',
		registerTitle: 'Criar conta grátis',
		registerSubtitle: 'Junte-se a milhares de pessoas que já controlam seu dinheiro',
		email: 'Email',
		password: 'Senha',
		confirmPassword: 'Confirmar senha',
		rememberMe: 'Lembrar-me',
		forgotPassword: 'Esqueceu a senha?',
		noAccount: 'Não tem conta?',
		hasAccount: 'Já tem conta?',
		orContinueWith: 'ou continue com seu email',
		continueWithGoogle: 'Continuar com Google'
	},
	pricing: {
		title: 'Comece grátis, cresça quando quiser',
		subtitle: 'Sem truques, sem letras miúdas. Os 18 recursos básicos são gratuitos para sempre.',
		monthly: 'Mensal',
		annual: 'Anual',
		discount: '-20%',
		free: 'Grátis',
		pro: 'Pro',
		business: 'Negócio',
		popular: 'Mais popular',
		getStarted: 'Começar grátis',
		tryFree: 'Experimentar Pro grátis 14 dias',
		contactSales: 'Contatar vendas'
	},
	footer: {
		tagline: 'Seu aliado financeiro diário.',
		legal: 'Legal',
		privacy: 'Privacidade',
		terms: 'Termos',
		support: 'Suporte'
	}
};

export const translations: Record<Locale, Translations> = { es, en, pt };
