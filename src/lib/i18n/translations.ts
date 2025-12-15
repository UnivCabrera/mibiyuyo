// ═══════════════════════════════════════════════════════════════════════════════
// 🌍 i18n — Sistema de Internacionalización
// ═══════════════════════════════════════════════════════════════════════════════
// Idiomas: ES, EN, ZH, KO, JA, PT, FR, DE, IT, RU (Top extranjeros en México)
// ═══════════════════════════════════════════════════════════════════════════════

export type Locale = 'es' | 'en' | 'pt' | 'zh' | 'ko' | 'ja' | 'fr' | 'de' | 'it' | 'ru';

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
		openMenu: string;
		closeMenu: string;
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
		// Dashboard demo texts
		disponibleHoy: string;
		biyuyoDisponible: string;
		gastos: string;
		apartados: string;
		yaApartamos: string;
		gastosHormiga: string;
		titleSuffix: string;
		desktopTitle: string;
		navDashboard: string;
		navReportes: string;
		navConfig: string;
		laptopNavResumen: string;
		laptopNavMetas: string;
		appGreeting: string;
		appDate: string;
		appLabel: string;
		miniCardRent: string;
		miniCardServices: string;
		miniCardGas: string;
		miniCardStatus: string;
		registerExpense: string;
		badgeReportesClaros: string;
		badgeSeguro: string;
		badgeIngresos: string;
		badgeSetup: string;
		badgeAcceso: string;
		badgeSinEstres: string;
		badgeHechoMX: string;
		badgeGratis: string;
		scrollHint: string;
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
		sectionEyebrow?: string;
		title: string;
		subtitle: string;
		monthly: string;
		annual: string;
		discount: string;
		toggleAria?: string;
		free: string;
		pro: string;
		business: string;
		freePeriod?: string;
		periodMonthly?: string;
		periodAnnual?: string;
		popular: string;
		getStarted: string;
		tryFree: string;
		contactSales: string;
		planDescriptions?: {
			free: string;
			pro: string;
			business: string;
		};
		features?: {
			biyuyoToday: string;
			frequencyConfig: string;
			autoSavings: string;
			quickExpense: string;
			spendingDetector: string;
			smartAlerts: string;
			pwaOffline: string;
			darkMode: string;
			baseFeatures: string;
			advancedReports: string;
			familyMode: string;
			bankSync: string;
			prioritySupport: string;
			everythingInFree: string;
			advancedReportsCharts: string;
			familyUpToFive: string;
			customCategories: string;
			export: string;
			unlimitedGoals: string;
			aiPredictions: string;
			mobileWidgets: string;
			noAds: string;
			chatSupport: string;
			invoicingSat: string;
			apiIntegrations: string;
			everythingInPro: string;
			cfdiIntegration: string;
			satDownloads: string;
			personalBusiness: string;
			taxReports: string;
			unlimitedUsers: string;
			prioritySupport247: string;
			personalizedOnboarding: string;
			dedicatedBackup: string;
			sla: string;
			assignedAccountant: string;
		};
		guarantee?: {
			title: string;
			description: string;
		};
	};
	// Footer
	footer: {
		tagline: string;
		legal: string;
		privacy: string;
		terms: string;
		support: string;
		headings?: {
			product: string;
			company: string;
			resources: string;
			legal: string;
		};
		productLinks?: {
			features: string;
			pricing: string;
			roadmap: string;
			changelog: string;
			integrations: string;
		};
		companyLinks?: {
			about: string;
			blog: string;
			press: string;
			careers: string;
			contact: string;
		};
		resourceLinks?: {
			helpCenter: string;
			guides: string;
			api: string;
			webinars: string;
			community: string;
		};
		legalLinks?: {
			privacy: string;
			terms: string;
			cookies: string;
			security: string;
		};
		trust?: {
			ssl: string;
			sslDesc: string;
			compliance: string;
			complianceDesc: string;
			iso: string;
			isoDesc: string;
		};
		contact?: {
			email: string;
			phone: string;
			location: string;
		};
		bottom?: {
			rights: string;
			madeIn: string;
			sitemap: string;
		};
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
		dashboard: 'Dashboard',
		openMenu: 'Abrir menú',
		closeMenu: 'Cerrar menú'
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
		trustNoCard: 'Sin tarjeta de crédito',
		// Dashboard demo texts
		disponibleHoy: 'Disponible hoy',
		biyuyoDisponible: 'Biyuyo Disponible',
		gastos: 'Gastos',
		apartados: 'Apartados',
		yaApartamos: 'Ya apartamos tus gastos fijos',
		gastosHormiga: '-30% gastos hormiga',
		titleSuffix: 'sin arruinar tu quincena?',
		desktopTitle: 'mibiyuyo — Dashboard',
		navDashboard: 'Dashboard',
		navReportes: 'Reportes',
		navConfig: 'Configuración',
		laptopNavResumen: 'Resumen',
		laptopNavMetas: 'Metas',
		appGreeting: 'Buenos días, Carlos 👋',
		appDate: 'Sábado 14 de diciembre',
		appLabel: 'Tu biyuyo disponible hoy:',
		miniCardRent: 'Renta',
		miniCardServices: 'Servicios',
		miniCardGas: 'Gasolina',
		miniCardStatus: 'Apartado ✓',
		registerExpense: 'Registrar gasto',
		badgeReportesClaros: 'Reportes claros',
		badgeSeguro: '100% seguro',
		badgeIngresos: '+$4,200/mes',
		badgeSetup: '2 min setup',
		badgeAcceso: 'Acceso 24/7',
		badgeSinEstres: 'Sin estrés',
		badgeHechoMX: 'Hecho en MX',
		badgeGratis: 'Gratis',
		scrollHint: 'Descubre más'
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
		sectionEyebrow: 'Precios claros',
		title: 'Empieza gratis, crece cuando quieras',
		subtitle: 'Sin trucos, sin letras chiquitas. Las 18 características base son gratis para siempre.',
		monthly: 'Mensual',
		annual: 'Anual',
		discount: '-20%',
		toggleAria: 'Cambiar entre facturación mensual y anual',
		free: 'Gratis',
		pro: 'Pro',
		business: 'Negocio',
		freePeriod: 'para siempre',
		periodMonthly: '/mes',
		periodAnnual: '/mes (facturado anual)',
		popular: 'Más popular',
		getStarted: 'Empezar gratis',
		tryFree: 'Probar Pro gratis 14 días',
		contactSales: 'Contactar ventas',
		planDescriptions: {
			free: 'Todo lo esencial para empezar a controlar tu dinero.',
			pro: 'Para quienes quieren ir más allá y automatizar todo.',
			business: 'Para freelancers y pequeños negocios que necesitan facturar.'
		},
		features: {
			biyuyoToday: 'Tu Biyuyo Hoy (número central)',
			frequencyConfig: 'Config quincenal/semanal/mensual',
			autoSavings: 'Apartados automáticos (ilimitados)',
			quickExpense: 'Registro de gastos 1-tap',
			spendingDetector: 'Detector de gastos hormiga',
			smartAlerts: 'Alertas inteligentes',
			pwaOffline: 'PWA instalable (offline)',
			darkMode: 'Modo oscuro',
			baseFeatures: 'Las 18 features base',
			advancedReports: 'Reportes avanzados',
			familyMode: 'Modo familiar (multi-usuario)',
			bankSync: 'Conexión bancaria automática',
			prioritySupport: 'Soporte prioritario',
			everythingInFree: 'Todo lo de Gratis',
			advancedReportsCharts: 'Reportes avanzados con gráficas',
			familyUpToFive: 'Modo familiar (hasta 5 usuarios)',
			customCategories: 'Categorías personalizadas',
			export: 'Exportar a Excel/PDF',
			unlimitedGoals: 'Metas de ahorro ilimitadas',
			aiPredictions: 'Predicción de gastos con IA',
			mobileWidgets: 'Widgets para celular',
			noAds: 'Sin publicidad',
			chatSupport: 'Soporte por chat',
			invoicingSat: 'Facturación y SAT',
			apiIntegrations: 'API para integraciones',
			everythingInPro: 'Todo lo de Pro',
			cfdiIntegration: 'Facturación CFDI integrada',
			satDownloads: 'Descarga de facturas del SAT',
			personalBusiness: 'Separación personal/negocio',
			taxReports: 'Reportes fiscales (ISR, IVA)',
			unlimitedUsers: 'Usuarios ilimitados',
			prioritySupport247: 'Soporte prioritario 24/7',
			personalizedOnboarding: 'Onboarding personalizado',
			dedicatedBackup: 'Backup dedicado',
			sla: 'SLA garantizado',
			assignedAccountant: 'Contador asignado (próximamente)'
		},
		guarantee: {
			title: 'Garantía de satisfacción de 30 días',
			description: 'Si no estás 100% satisfecho con Pro o Negocio, te devolvemos tu dinero. Sin preguntas.'
		}
	},
	footer: {
		tagline: 'Finanzas personales simplificadas. Sabe cuánto puedes gastar hoy, sin matemáticas ni hojas de Excel.',
		legal: 'Legal',
		privacy: 'Privacidad',
		terms: 'Términos',
		support: 'Soporte',
		headings: {
			product: 'Producto',
			company: 'Empresa',
			resources: 'Recursos',
			legal: 'Legal'
		},
		productLinks: {
			features: 'Características',
			pricing: 'Precios',
			roadmap: 'Roadmap',
			changelog: 'Actualizaciones',
			integrations: 'Integraciones'
		},
		companyLinks: {
			about: 'Sobre nosotros',
			blog: 'Blog',
			press: 'Prensa',
			careers: 'Trabaja con nosotros',
			contact: 'Contacto'
		},
		resourceLinks: {
			helpCenter: 'Centro de ayuda',
			guides: 'Guías',
			api: 'API Docs',
			webinars: 'Webinars',
			community: 'Comunidad'
		},
		legalLinks: {
			privacy: 'Privacidad',
			terms: 'Términos de uso',
			cookies: 'Cookies',
			security: 'Seguridad'
		},
		trust: {
			ssl: 'SSL Seguro',
			sslDesc: 'Encriptación 256-bit',
			compliance: 'LFPDPPP',
			complianceDesc: 'Datos protegidos',
			iso: 'ISO 27001',
			isoDesc: 'Certificación en proceso'
		},
		contact: {
			email: 'hola@mibiyuyo.com',
			phone: '+52 55 1234 5678',
			location: 'Ciudad de México, México'
		},
		bottom: {
			rights: 'Todos los derechos reservados.',
			madeIn: 'Hecho con 💚 en México.',
			sitemap: 'Sitemap'
		}
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
		dashboard: 'Dashboard',
		openMenu: 'Open menu',
		closeMenu: 'Close menu'
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
		trustNoCard: 'No credit card required',
		// Dashboard demo texts
		disponibleHoy: 'Available today',
		biyuyoDisponible: 'Available Balance',
		gastos: 'Expenses',
		apartados: 'Savings',
		yaApartamos: 'Already set aside your fixed expenses',
		gastosHormiga: '-30% small expenses',
		titleSuffix: 'without ruining your paycheck?',
		desktopTitle: 'mibiyuyo — Dashboard',
		navDashboard: 'Dashboard',
		navReportes: 'Reports',
		navConfig: 'Settings',
		laptopNavResumen: 'Overview',
		laptopNavMetas: 'Goals',
		appGreeting: 'Good morning, Carlos 👋',
		appDate: 'Saturday, December 14',
		appLabel: 'Your biyuyo available today:',
		miniCardRent: 'Rent',
		miniCardServices: 'Utilities',
		miniCardGas: 'Gas',
		miniCardStatus: 'Set aside ✓',
		registerExpense: 'Log expense',
		badgeReportesClaros: 'Clear reports',
		badgeSeguro: '100% secure',
		badgeIngresos: '+$4,200/mo',
		badgeSetup: '2 min setup',
		badgeAcceso: '24/7 access',
		badgeSinEstres: 'Stress-free',
		badgeHechoMX: 'Built in MX',
		badgeGratis: 'Free',
		scrollHint: 'Discover more'
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
		sectionEyebrow: 'Transparent pricing',
		title: 'Start free, grow whenever you want',
		subtitle: 'No tricks, no fine print. The 18 core features are free forever.',
		monthly: 'Monthly',
		annual: 'Annual',
		discount: '-20%',
		toggleAria: 'Toggle between monthly and annual billing',
		free: 'Free',
		pro: 'Pro',
		business: 'Business',
		freePeriod: 'forever',
		periodMonthly: '/month',
		periodAnnual: '/month (billed annually)',
		popular: 'Most popular',
		getStarted: 'Start free',
		tryFree: 'Try Pro free for 14 days',
		contactSales: 'Contact sales',
		planDescriptions: {
			free: 'Everything you need to start taking control of your money.',
			pro: 'For people who want to go further and automate everything.',
			business: 'For freelancers and small businesses that need invoicing.'
		},
		features: {
			biyuyoToday: 'Your Biyuyo Today (headline number)',
			frequencyConfig: 'Weekly/biweekly/monthly scheduling',
			autoSavings: 'Automatic buckets (unlimited)',
			quickExpense: 'One-tap expense logging',
			spendingDetector: 'Spending leak detector',
			smartAlerts: 'Smart alerts',
			pwaOffline: 'Installable PWA (offline)',
			darkMode: 'Dark mode',
			baseFeatures: 'All 18 core features',
			advancedReports: 'Advanced reports',
			familyMode: 'Family mode (multi-user)',
			bankSync: 'Automatic bank sync',
			prioritySupport: 'Priority support',
			everythingInFree: 'Everything in Free',
			advancedReportsCharts: 'Advanced reports with charts',
			familyUpToFive: 'Family mode (up to 5 users)',
			customCategories: 'Custom categories',
			export: 'Export to Excel/PDF',
			unlimitedGoals: 'Unlimited savings goals',
			aiPredictions: 'AI spending predictions',
			mobileWidgets: 'Mobile widgets',
			noAds: 'Ad-free experience',
			chatSupport: 'Chat support',
			invoicingSat: 'Invoicing & SAT',
			apiIntegrations: 'API for integrations',
			everythingInPro: 'Everything in Pro',
			cfdiIntegration: 'Integrated CFDI invoicing',
			satDownloads: 'SAT invoice downloads',
			personalBusiness: 'Personal/business separation',
			taxReports: 'Tax reports (ISR, VAT)',
			unlimitedUsers: 'Unlimited users',
			prioritySupport247: 'Priority support 24/7',
			personalizedOnboarding: 'Personalized onboarding',
			dedicatedBackup: 'Dedicated backup',
			sla: 'Guaranteed SLA',
			assignedAccountant: 'Assigned accountant (coming soon)'
		},
		guarantee: {
			title: '30-day satisfaction guarantee',
			description: 'If you\'re not 100% satisfied with Pro or Business, we\'ll refund your money. No questions asked.'
		}
	},
	footer: {
		tagline: 'Personal finance, simplified. Know exactly how much you can spend today - no math, no spreadsheets.',
		legal: 'Legal',
		privacy: 'Privacy',
		terms: 'Terms',
		support: 'Support',
		headings: {
			product: 'Product',
			company: 'Company',
			resources: 'Resources',
			legal: 'Legal'
		},
		productLinks: {
			features: 'Features',
			pricing: 'Pricing',
			roadmap: 'Roadmap',
			changelog: 'Changelog',
			integrations: 'Integrations'
		},
		companyLinks: {
			about: 'About us',
			blog: 'Blog',
			press: 'Press',
			careers: 'Careers',
			contact: 'Contact'
		},
		resourceLinks: {
			helpCenter: 'Help Center',
			guides: 'Guides',
			api: 'API Docs',
			webinars: 'Webinars',
			community: 'Community'
		},
		legalLinks: {
			privacy: 'Privacy',
			terms: 'Terms of use',
			cookies: 'Cookies',
			security: 'Security'
		},
		trust: {
			ssl: 'SSL Secure',
			sslDesc: '256-bit encryption',
			compliance: 'LFPDPPP',
			complianceDesc: 'Protected data',
			iso: 'ISO 27001',
			isoDesc: 'Certification in progress'
		},
		contact: {
			email: 'hola@mibiyuyo.com',
			phone: '+52 55 1234 5678',
			location: 'Mexico City, Mexico'
		},
		bottom: {
			rights: 'All rights reserved.',
			madeIn: 'Made with 💚 in Mexico.',
			sitemap: 'Sitemap'
		}
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
		dashboard: 'Dashboard',
		openMenu: 'Abrir menu',
		closeMenu: 'Fechar menu'
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
		trustNoCard: 'Sem cartão de crédito',
		// Dashboard demo texts
		disponibleHoy: 'Disponível hoje',
		biyuyoDisponible: 'Saldo Disponível',
		gastos: 'Gastos',
		apartados: 'Poupanças',
		yaApartamos: 'Já separamos suas despesas fixas',
		gastosHormiga: '-30% pequenos gastos',
		titleSuffix: 'sem arruinar seu salário?',
		desktopTitle: 'mibiyuyo — Dashboard',
		navDashboard: 'Painel',
		navReportes: 'Relatórios',
		navConfig: 'Configurações',
		laptopNavResumen: 'Resumo',
		laptopNavMetas: 'Metas',
		appGreeting: 'Bom dia, Carlos 👋',
		appDate: 'Sábado, 14 de dezembro',
		appLabel: 'Seu biyuyo disponível hoje:',
		miniCardRent: 'Aluguel',
		miniCardServices: 'Serviços',
		miniCardGas: 'Combustível',
		miniCardStatus: 'Separado ✓',
		registerExpense: 'Registrar gasto',
		badgeReportesClaros: 'Relatórios claros',
		badgeSeguro: '100% seguro',
		badgeIngresos: '+$4.200/mês',
		badgeSetup: 'Setup em 2 min',
		badgeAcceso: 'Acesso 24/7',
		badgeSinEstres: 'Sem estresse',
		badgeHechoMX: 'Feito no MX',
		badgeGratis: 'Grátis',
		scrollHint: 'Descubra mais'
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
		sectionEyebrow: 'Preços transparentes',
		title: 'Comece grátis, cresça quando quiser',
		subtitle: 'Sem truques, sem letras miúdas. Os 18 recursos básicos são gratuitos para sempre.',
		monthly: 'Mensal',
		annual: 'Anual',
		discount: '-20%',
		toggleAria: 'Alternar entre cobrança mensal e anual',
		free: 'Grátis',
		pro: 'Pro',
		business: 'Negócio',
		freePeriod: 'para sempre',
		periodMonthly: '/mês',
		periodAnnual: '/mês (cobrado anualmente)',
		popular: 'Mais popular',
		getStarted: 'Começar grátis',
		tryFree: 'Experimentar Pro grátis 14 dias',
		contactSales: 'Contatar vendas',
		planDescriptions: {
			free: 'Tudo o essencial para começar a controlar seu dinheiro.',
			pro: 'Para quem quer ir além e automatizar tudo.',
			business: 'Para freelancers e pequenos negócios que precisam faturar.'
		},
		features: {
			biyuyoToday: 'Seu Biyuyo de Hoje (número destaque)',
			frequencyConfig: 'Configuração semanal/quinzenal/mensal',
			autoSavings: 'Compartimentos automáticos (ilimitados)',
			quickExpense: 'Registro de gastos em um toque',
			spendingDetector: 'Detector de gastos formiga',
			smartAlerts: 'Alertas inteligentes',
			pwaOffline: 'PWA instalável (offline)',
			darkMode: 'Modo escuro',
			baseFeatures: 'As 18 funcionalidades base',
			advancedReports: 'Relatórios avançados',
			familyMode: 'Modo família (multiusuário)',
			bankSync: 'Sincronização bancária automática',
			prioritySupport: 'Suporte prioritário',
			everythingInFree: 'Tudo do Grátis',
			advancedReportsCharts: 'Relatórios avançados com gráficos',
			familyUpToFive: 'Modo família (até 5 usuários)',
			customCategories: 'Categorias personalizadas',
			export: 'Exportar para Excel/PDF',
			unlimitedGoals: 'Metas de economia ilimitadas',
			aiPredictions: 'Previsões de gastos com IA',
			mobileWidgets: 'Widgets para celular',
			noAds: 'Sem anúncios',
			chatSupport: 'Suporte por chat',
			invoicingSat: 'Faturamento e SAT',
			apiIntegrations: 'API para integrações',
			everythingInPro: 'Tudo do Pro',
			cfdiIntegration: 'Faturamento CFDI integrado',
			satDownloads: 'Download de notas do SAT',
			personalBusiness: 'Separação pessoal/negócio',
			taxReports: 'Relatórios fiscais (ISR, IVA)',
			unlimitedUsers: 'Usuários ilimitados',
			prioritySupport247: 'Suporte prioritário 24/7',
			personalizedOnboarding: 'Onboarding personalizado',
			dedicatedBackup: 'Backup dedicado',
			sla: 'SLA garantido',
			assignedAccountant: 'Contador dedicado (em breve)'
		},
		guarantee: {
			title: 'Garantia de satisfação de 30 dias',
			description: 'Se você não estiver 100% satisfeito com Pro ou Negócio, devolvemos seu dinheiro. Sem perguntas.'
		}
	},
	footer: {
		tagline: 'Finanças pessoais simplificadas. Saiba exatamente quanto pode gastar hoje, sem matemática nem planilhas.',
		legal: 'Legal',
		privacy: 'Privacidade',
		terms: 'Termos',
		support: 'Suporte',
		headings: {
			product: 'Produto',
			company: 'Empresa',
			resources: 'Recursos',
			legal: 'Legal'
		},
		productLinks: {
			features: 'Recursos',
			pricing: 'Preços',
			roadmap: 'Roadmap',
			changelog: 'Atualizações',
			integrations: 'Integrações'
		},
		companyLinks: {
			about: 'Sobre nós',
			blog: 'Blog',
			press: 'Imprensa',
			careers: 'Trabalhe conosco',
			contact: 'Contato'
		},
		resourceLinks: {
			helpCenter: 'Central de ajuda',
			guides: 'Guias',
			api: 'API Docs',
			webinars: 'Webinars',
			community: 'Comunidade'
		},
		legalLinks: {
			privacy: 'Privacidade',
			terms: 'Termos de uso',
			cookies: 'Cookies',
			security: 'Segurança'
		},
		trust: {
			ssl: 'SSL Seguro',
			sslDesc: 'Criptografia 256-bit',
			compliance: 'LFPDPPP',
			complianceDesc: 'Dados protegidos',
			iso: 'ISO 27001',
			isoDesc: 'Certificação em andamento'
		},
		contact: {
			email: 'hola@mibiyuyo.com',
			phone: '+52 55 1234 5678',
			location: 'Cidade do México, México'
		},
		bottom: {
			rights: 'Todos os direitos reservados.',
			madeIn: 'Feito com 💚 no México.',
			sitemap: 'Mapa do site'
		}
	}
};

// 中文 (Chino Simplificado)
export const zh: Translations = {
	common: {
		loading: '加载中...',
		error: '错误',
		success: '成功',
		cancel: '取消',
		save: '保存',
		delete: '删除',
		edit: '编辑',
		close: '关闭',
		back: '返回',
		next: '下一步',
		submit: '提交',
		search: '搜索'
	},
	nav: {
		features: '功能',
		benefits: '优势',
		testimonials: '用户评价',
		pricing: '价格',
		faq: '常见问题',
		login: '登录',
		register: '免费注册',
		logout: '退出',
		dashboard: '仪表板',
		openMenu: '打开菜单',
		closeMenu: '关闭菜单'
	},
	hero: {
		badge: '前18项功能100%免费',
		title: '你知道今天可以花多少钱吗',
		titleHighlight: '今天',
		subtitle: 'mibiyuyo 准确告诉你每天有多少可用资金，自动预留固定支出，帮助你摆脱月光族的生活。',
		ctaPrimary: '免费开始',
		ctaSecondary: '了解详情',
		trustSecurity: '数据100%安全',
		trustSetup: '2分钟设置',
		trustNoCard: '无需信用卡',
		// Dashboard demo texts
		disponibleHoy: '今天可用',
		biyuyoDisponible: '可用余额',
		gastos: '支出',
		apartados: '储蓄',
		yaApartamos: '已为您预留固定支出',
		gastosHormiga: '-30% 小额支出',
		titleSuffix: '而不影响您的薪水？',
		desktopTitle: 'mibiyuyo — 仪表板',
		navDashboard: '仪表板',
		navReportes: '报告',
		navConfig: '设置',
		laptopNavResumen: '概览',
		laptopNavMetas: '目标',
		appGreeting: '早上好，Carlos 👋',
		appDate: '12月14日 星期六',
		appLabel: '你今天可用的 biyuyo：',
		miniCardRent: '房租',
		miniCardServices: '水电',
		miniCardGas: '油费',
		miniCardStatus: '已预留 ✓',
		registerExpense: '记录支出',
		badgeReportesClaros: '清晰报表',
		badgeSeguro: '100% 安全',
		badgeIngresos: '+$4,200/月',
		badgeSetup: '2 分钟设置',
		badgeAcceso: '24/7 访问',
		badgeSinEstres: '无压力',
		badgeHechoMX: '墨西哥制造',
		badgeGratis: '免费',
		scrollHint: '继续探索'
	},
	auth: {
		loginTitle: '欢迎回来',
		loginSubtitle: '输入您的信息以访问账户',
		registerTitle: '创建免费账户',
		registerSubtitle: '加入数千名已经掌控财务的用户',
		email: '邮箱',
		password: '密码',
		confirmPassword: '确认密码',
		rememberMe: '记住我',
		forgotPassword: '忘记密码？',
		noAccount: '没有账户？',
		hasAccount: '已有账户？',
		orContinueWith: '或使用邮箱继续',
		continueWithGoogle: '使用Google登录'
	},
	pricing: {
		sectionEyebrow: '价格透明',
		title: '免费开始，随时升级',
		subtitle: '没有套路，没有小字。18项基础功能永久免费。',
		monthly: '月付',
		annual: '年付',
		discount: '-20%',
		toggleAria: '在月付和年付之间切换',
		free: '免费版',
		pro: '专业版',
		business: '商业版',
		freePeriod: '永久免费',
		periodMonthly: '/月',
		periodAnnual: '/月（按年计费）',
		popular: '最受欢迎',
		getStarted: '免费开始',
		tryFree: '免费试用专业版14天',
		contactSales: '联系销售',
		planDescriptions: {
			free: '掌控日常现金流所需的一切基础功能。',
			pro: '适合想要更进一步并自动化一切的用户。',
			business: '专为需要开具发票的自由职业者与小型企业打造。'
		},
		features: {
			biyuyoToday: '今日 Biyuyo 数字概览',
			frequencyConfig: '支持周/半月/月度预算设置',
			autoSavings: '自动分账（无限制）',
			quickExpense: '一键记录支出',
			spendingDetector: '小额支出侦测',
			smartAlerts: '智能提醒',
			pwaOffline: '可安装 PWA（离线）',
			darkMode: '深色模式',
			baseFeatures: '全部 18 项核心功能',
			advancedReports: '高级报表',
			familyMode: '家庭模式（多用户）',
			bankSync: '自动银行同步',
			prioritySupport: '优先客服',
			everythingInFree: '包含免费版全部功能',
			advancedReportsCharts: '高级图表报表',
			familyUpToFive: '家庭模式（最多 5 位用户）',
			customCategories: '自定义分类',
			export: '导出至 Excel/PDF',
			unlimitedGoals: '无限储蓄目标',
			aiPredictions: 'AI 支出预测',
			mobileWidgets: '手机小组件',
			noAds: '无广告体验',
			chatSupport: '在线聊天支持',
			invoicingSat: '开票与 SAT 对接',
			apiIntegrations: '对外整合 API',
			everythingInPro: '包含专业版全部功能',
			cfdiIntegration: '集成 CFDI 发票',
			satDownloads: 'SAT 发票下载',
			personalBusiness: '个人 / 商业账目分离',
			taxReports: '税务报表（ISR、IVA）',
			unlimitedUsers: '不限用户数',
			prioritySupport247: '7x24 小时优先客服',
			personalizedOnboarding: '专属上手辅导',
			dedicatedBackup: '专属备份',
			sla: 'SLA 服务保证',
			assignedAccountant: '专属会计（即将上线）'
		},
		guarantee: {
			title: '30 天满意保证',
			description: '如果你对专业版或商业版不完全满意，我们将全额退款，无需任何说明。'
		}
	},
	footer: {
		tagline: '您的日常财务助手。',
		legal: '法律',
		privacy: '隐私',
		terms: '条款',
		support: '支持'
	}
};

// 한국어 (Coreano)
export const ko: Translations = {
	common: {
		loading: '로딩 중...',
		error: '오류',
		success: '성공',
		cancel: '취소',
		save: '저장',
		delete: '삭제',
		edit: '편집',
		close: '닫기',
		back: '뒤로',
		next: '다음',
		submit: '제출',
		search: '검색'
	},
	nav: {
		features: '기능',
		benefits: '혜택',
		testimonials: '후기',
		pricing: '가격',
		faq: 'FAQ',
		login: '로그인',
		register: '무료 가입',
		logout: '로그아웃',
		dashboard: '대시보드',
		openMenu: '메뉴 열기',
		closeMenu: '메뉴 닫기'
	},
	hero: {
		badge: '처음 18가지 기능 100% 무료',
		title: '오늘 얼마를 쓸 수 있는지 알고 계신가요',
		titleHighlight: '오늘',
		subtitle: 'mibiyuyo는 매일 사용 가능한 금액을 정확히 알려주고, 고정 지출을 자동으로 적립하며, 월급날만 기다리는 생활에서 벗어나게 도와줍니다.',
		ctaPrimary: '무료로 시작',
		ctaSecondary: '작동 방식 보기',
		trustSecurity: '100% 안전한 데이터',
		trustSetup: '2분 설정',
		trustNoCard: '신용카드 불필요',
		// Dashboard demo texts
		disponibleHoy: '오늘 사용 가능',
		biyuyoDisponible: '사용 가능 잔액',
		gastos: '지출',
		apartados: '저축',
		yaApartamos: '고정 지출은 이미 적립했습니다',
		gastosHormiga: '-30% 소액 지출',
		titleSuffix: '급여를 망치지 않고?',
		desktopTitle: 'mibiyuyo — 대시보드',
		navDashboard: '대시보드',
		navReportes: '보고서',
		navConfig: '설정',
		laptopNavResumen: '요약',
		laptopNavMetas: '목표',
		appGreeting: '좋은 아침이에요, Carlos 👋',
		appDate: '12월 14일 토요일',
		appLabel: '오늘 사용할 수 있는 biyuyo:',
		miniCardRent: '월세',
		miniCardServices: '공과금',
		miniCardGas: '주유비',
		miniCardStatus: '분리 완료 ✓',
		registerExpense: '지출 기록하기',
		badgeReportesClaros: '명확한 보고서',
		badgeSeguro: '100% 안전',
		badgeIngresos: '+$4,200/월',
		badgeSetup: '2분 설정',
		badgeAcceso: '24/7 접속',
		badgeSinEstres: '스트레스 없음',
		badgeHechoMX: 'MX 제작',
		badgeGratis: '무료',
		scrollHint: '더 알아보기'
	},
	auth: {
		loginTitle: '다시 오신 것을 환영합니다',
		loginSubtitle: '계정에 접속하려면 정보를 입력하세요',
		registerTitle: '무료 계정 만들기',
		registerSubtitle: '이미 돈을 관리하는 수천 명의 사용자와 함께하세요',
		email: '이메일',
		password: '비밀번호',
		confirmPassword: '비밀번호 확인',
		rememberMe: '로그인 유지',
		forgotPassword: '비밀번호를 잊으셨나요?',
		noAccount: '계정이 없으신가요?',
		hasAccount: '이미 계정이 있으신가요?',
		orContinueWith: '또는 이메일로 계속',
		continueWithGoogle: 'Google로 계속'
	},
	pricing: {
		sectionEyebrow: '투명한 요금제',
		title: '무료로 시작하고 원할 때 업그레이드',
		subtitle: '속임수도 작은 글씨도 없습니다. 18가지 기본 기능은 영구 무료입니다.',
		monthly: '월간',
		annual: '연간',
		discount: '-20%',
		toggleAria: '월간과 연간 요금제를 전환',
		free: '무료',
		pro: '프로',
		business: '비즈니스',
		freePeriod: '평생 무료',
		periodMonthly: '/월',
		periodAnnual: '/월(연간 결제)',
		popular: '가장 인기',
		getStarted: '무료로 시작',
		tryFree: '프로 14일 무료 체험',
		contactSales: '영업팀 문의',
		planDescriptions: {
			free: '돈 관리를 시작하는 데 필요한 필수 기능을 모두 제공합니다.',
			pro: '더 깊이 자동화하고 싶은 사용자를 위한 플랜입니다.',
			business: '청구서 발행이 필요한 프리랜서와 소규모 비즈니스를 위한 플랜입니다.'
		},
		features: {
			biyuyoToday: '오늘의 Biyuyo 주요 수치',
			frequencyConfig: '주/격주/월별 리듬 설정',
			autoSavings: '자동 분류 계좌(무제한)',
			quickExpense: '원탭 지출 기록',
			spendingDetector: '스몰 스펜딩 감지',
			smartAlerts: '스마트 알림',
			pwaOffline: '설치형 PWA(오프라인)',
			darkMode: '다크 모드',
			baseFeatures: '18가지 핵심 기능 전체',
			advancedReports: '고급 리포트',
			familyMode: '패밀리 모드(다중 사용자)',
			bankSync: '자동 은행 동기화',
			prioritySupport: '우선 지원',
			everythingInFree: '무료 플랜 기능 전체 포함',
			advancedReportsCharts: '차트가 포함된 고급 리포트',
			familyUpToFive: '패밀리 모드(최대 5명)',
			customCategories: '맞춤 카테고리',
			export: 'Excel/PDF 내보내기',
			unlimitedGoals: '무제한 저축 목표',
			aiPredictions: 'AI 지출 예측',
			mobileWidgets: '모바일 위젯',
			noAds: '광고 없음',
			chatSupport: '채팅 지원',
			invoicingSat: '인보이스 및 SAT 연동',
			apiIntegrations: '연동용 API',
			everythingInPro: '프로 플랜 기능 전체 포함',
			cfdiIntegration: 'CFDI 인보이스 통합',
			satDownloads: 'SAT 인보이스 다운로드',
			personalBusiness: '개인/비즈니스 자금 분리',
			taxReports: '세무 리포트(ISR, IVA)',
			unlimitedUsers: '무제한 사용자',
			prioritySupport247: '24/7 우선 지원',
			personalizedOnboarding: '맞춤 온보딩',
			dedicatedBackup: '전용 백업',
			sla: 'SLA 보장',
			assignedAccountant: '전담 회계사(출시 예정)'
		},
		guarantee: {
			title: '30일 만족 보장',
			description: '프로 또는 비즈니스 플랜이 100% 만족스럽지 않다면 질문 없이 환불해 드립니다.'
		}
	},
	footer: {
		tagline: '당신의 일상 재정 동반자.',
		legal: '법률',
		privacy: '개인정보',
		terms: '이용약관',
		support: '지원'
	}
};

// 日本語 (Japonés)
export const ja: Translations = {
	common: {
		loading: '読み込み中...',
		error: 'エラー',
		success: '成功',
		cancel: 'キャンセル',
		save: '保存',
		delete: '削除',
		edit: '編集',
		close: '閉じる',
		back: '戻る',
		next: '次へ',
		submit: '送信',
		search: '検索'
	},
	nav: {
		features: '機能',
		benefits: 'メリット',
		testimonials: 'お客様の声',
		pricing: '料金',
		faq: 'よくある質問',
		login: 'ログイン',
		register: '無料登録',
		logout: 'ログアウト',
		dashboard: 'ダッシュボード',
		openMenu: 'メニューを開く',
		closeMenu: 'メニューを閉じる'
	},
	hero: {
		badge: '最初の18機能は100%無料',
		title: '今日いくら使えるか知っていますか',
		titleHighlight: '今日',
		subtitle: 'mibiyuyoは毎日使える金額を正確に教え、固定費を自動で取り分け、給料日待ちの生活から抜け出すお手伝いをします。',
		ctaPrimary: '無料で始める',
		ctaSecondary: '仕組みを見る',
		trustSecurity: '100%安全なデータ',
		trustSetup: '2分で設定',
		trustNoCard: 'クレジットカード不要',
		// Dashboard demo texts
		disponibleHoy: '今日使用可能',
		biyuyoDisponible: '使用可能残高',
		gastos: '支出',
		apartados: '貯金',
		yaApartamos: '固定費はすでに取り分けました',
		gastosHormiga: '-30% 小額支出',
		titleSuffix: '給料を台無しにせず？',
		desktopTitle: 'mibiyuyo — ダッシュボード',
		navDashboard: 'ダッシュボード',
		navReportes: 'レポート',
		navConfig: '設定',
		laptopNavResumen: '概要',
		laptopNavMetas: '目標',
		appGreeting: 'おはよう、Carlos 👋',
		appDate: '12月14日 土曜日',
		appLabel: '今日使えるbiyuyo:',
		miniCardRent: '家賃',
		miniCardServices: '公共料金',
		miniCardGas: 'ガソリン',
		miniCardStatus: '確保済み ✓',
		registerExpense: '支出を記録',
		badgeReportesClaros: 'わかりやすいレポート',
		badgeSeguro: '100% 安全',
		badgeIngresos: '+$4,200/月',
		badgeSetup: '2分セットアップ',
		badgeAcceso: '24/7 アクセス',
		badgeSinEstres: 'ストレスなし',
		badgeHechoMX: 'メキシコ製',
		badgeGratis: '無料',
		scrollHint: 'さらに見る'
	},
	auth: {
		loginTitle: 'おかえりなさい',
		loginSubtitle: 'アカウントにアクセスするには情報を入力してください',
		registerTitle: '無料アカウント作成',
		registerSubtitle: 'すでにお金を管理している数千人のユーザーに参加しましょう',
		email: 'メールアドレス',
		password: 'パスワード',
		confirmPassword: 'パスワード確認',
		rememberMe: 'ログイン状態を保持',
		forgotPassword: 'パスワードをお忘れですか？',
		noAccount: 'アカウントをお持ちでないですか？',
		hasAccount: 'すでにアカウントをお持ちですか？',
		orContinueWith: 'またはメールで続行',
		continueWithGoogle: 'Googleで続行'
	},
		pricing: {
			sectionEyebrow: '透明な料金プラン',
			title: '無料で始めて、好きな時にアップグレード',
			subtitle: 'トリックも小さな文字もありません。18の基本機能は永久無料です。',
			monthly: '月額',
			annual: '年額',
			discount: '-20%',
			toggleAria: '月額と年額の請求を切り替える',
			free: '無料',
			pro: 'プロ',
			business: 'ビジネス',
			freePeriod: 'ずっと無料',
			periodMonthly: '/月',
			periodAnnual: '/月（年額請求）',
			popular: '一番人気',
			getStarted: '無料で始める',
			tryFree: 'プロを14日間無料体験',
			contactSales: '営業に連絡',
			planDescriptions: {
				free: 'お金の管理を始めるために必要な基本機能がそろっています。',
				pro: 'さらに自動化を進めたい方に最適なプランです。',
				business: '請求書発行が必要なフリーランスとスモールビジネス向けです。'
			},
			features: {
				biyuyoToday: '今日のBiyuyoハイライト数値',
				frequencyConfig: '週／隔週／月のサイクル設定',
				autoSavings: '自動取り分け（無制限）',
				quickExpense: 'ワンタップ支出記録',
				spendingDetector: 'スモール支出検知',
				smartAlerts: 'スマートアラート',
				pwaOffline: 'インストール型PWA（オフライン対応）',
				darkMode: 'ダークモード',
				baseFeatures: '18のコア機能すべて',
				advancedReports: '高度なレポート',
				familyMode: 'ファミリーモード（複数ユーザー）',
				bankSync: '自動銀行同期',
				prioritySupport: '優先サポート',
				everythingInFree: '無料プランの全機能',
				advancedReportsCharts: 'チャート付き高度レポート',
				familyUpToFive: 'ファミリーモード（最大5ユーザー）',
				customCategories: 'カスタムカテゴリ',
				export: 'Excel/PDFエクスポート',
				unlimitedGoals: '無制限の貯蓄目標',
				aiPredictions: 'AI支出予測',
				mobileWidgets: 'モバイルウィジェット',
				noAds: '広告なし',
				chatSupport: 'チャットサポート',
				invoicingSat: '請求書＆SAT連携',
				apiIntegrations: '統合用API',
				everythingInPro: 'プロプランの全機能',
				cfdiIntegration: 'CFDI請求統合',
				satDownloads: 'SAT請求書ダウンロード',
				personalBusiness: '個人用／事業用の分離',
				taxReports: '税務レポート（ISR・IVA）',
				unlimitedUsers: '無制限ユーザー',
				prioritySupport247: '24時間365日の優先サポート',
				personalizedOnboarding: 'パーソナライズドオンボーディング',
				dedicatedBackup: '専用バックアップ',
				sla: 'SLA保証',
				assignedAccountant: '専任会計士（近日公開）'
			},
			guarantee: {
				title: '30日間満足保証',
				description: 'プロまたはビジネスが100%満足いただけない場合は、理由を問わず返金いたします。'
			}
		},
	footer: {
		tagline: 'あなたの毎日の財務パートナー。',
		legal: '法的事項',
		privacy: 'プライバシー',
		terms: '利用規約',
		support: 'サポート'
	}
};

// Français (Francés)
export const fr: Translations = {
	common: {
		loading: 'Chargement...',
		error: 'Erreur',
		success: 'Succès',
		cancel: 'Annuler',
		save: 'Enregistrer',
		delete: 'Supprimer',
		edit: 'Modifier',
		close: 'Fermer',
		back: 'Retour',
		next: 'Suivant',
		submit: 'Soumettre',
		search: 'Rechercher'
	},
	nav: {
		features: 'Fonctionnalités',
		benefits: 'Avantages',
		testimonials: 'Témoignages',
		pricing: 'Tarifs',
		faq: 'FAQ',
		login: 'Connexion',
		register: "S'inscrire gratuitement",
		logout: 'Déconnexion',
		dashboard: 'Tableau de bord',
		openMenu: 'Ouvrir le menu',
		closeMenu: 'Fermer le menu'
	},
	hero: {
		badge: 'Les 18 premières fonctionnalités sont 100% gratuites',
		title: 'Savez-vous combien vous pouvez dépenser',
		titleHighlight: "AUJOURD'HUI",
		subtitle: "mibiyuyo vous dit exactement combien d'argent vous avez disponible chaque jour, met automatiquement de côté vos dépenses fixes et vous aide à arrêter de vivre de paie en paie.",
		ctaPrimary: 'Commencer gratuitement',
		ctaSecondary: 'Voir comment ça marche',
		trustSecurity: 'Données 100% sécurisées',
		trustSetup: 'Configuration en 2 minutes',
		trustNoCard: 'Sans carte de crédit',
		// Dashboard demo texts
		disponibleHoy: 'Disponible aujourd\'hui',
		biyuyoDisponible: 'Solde disponible',
		gastos: 'Dépenses',
		apartados: 'Économies',
		yaApartamos: 'Nous avons déjà mis de côté vos frais fixes',
		gastosHormiga: '-30% petites dépenses',
		titleSuffix: 'sans ruiner votre salaire ?',
		desktopTitle: 'mibiyuyo — Tableau de bord',
		navDashboard: 'Tableau de bord',
		navReportes: 'Rapports',
		navConfig: 'Paramètres',
		laptopNavResumen: 'Vue d’ensemble',
		laptopNavMetas: 'Objectifs',
		appGreeting: 'Bonjour Carlos 👋',
		appDate: 'Samedi 14 décembre',
		appLabel: 'Ton biyuyo disponible aujourd\'hui :',
		miniCardRent: 'Loyer',
		miniCardServices: 'Services',
		miniCardGas: 'Carburant',
		miniCardStatus: 'Mis de côté ✓',
		registerExpense: 'Enregistrer une dépense',
		badgeReportesClaros: 'Rapports clairs',
		badgeSeguro: '100% sécurisé',
		badgeIngresos: '+$4 200/mois',
		badgeSetup: 'Setup en 2 min',
		badgeAcceso: 'Accès 24/7',
		badgeSinEstres: 'Sans stress',
		badgeHechoMX: 'Fabriqué au MX',
		badgeGratis: 'Gratuit',
		scrollHint: 'Découvrez plus'
	},
	auth: {
		loginTitle: 'Bon retour',
		loginSubtitle: 'Entrez vos informations pour accéder à votre compte',
		registerTitle: 'Créer un compte gratuit',
		registerSubtitle: 'Rejoignez des milliers de personnes qui contrôlent déjà leur argent',
		email: 'Email',
		password: 'Mot de passe',
		confirmPassword: 'Confirmer le mot de passe',
		rememberMe: 'Se souvenir de moi',
		forgotPassword: 'Mot de passe oublié?',
		noAccount: "Vous n'avez pas de compte?",
		hasAccount: 'Vous avez déjà un compte?',
		orContinueWith: 'ou continuez avec votre email',
		continueWithGoogle: 'Continuer avec Google'
	},
	pricing: {
		sectionEyebrow: 'Tarifs transparents',
		title: 'Commencez gratuitement, évoluez quand vous voulez',
		subtitle: 'Pas de pièges, pas de petites lignes. Les 18 fonctionnalités de base sont gratuites à vie.',
		monthly: 'Mensuel',
		annual: 'Annuel',
		discount: '-20%',
		toggleAria: 'Basculer entre la facturation mensuelle et annuelle',
		free: 'Gratuit',
		pro: 'Pro',
		business: 'Entreprise',
		freePeriod: 'à vie',
		periodMonthly: '/mois',
		periodAnnual: '/mois (facturé annuellement)',
		popular: 'Le plus populaire',
		getStarted: 'Commencer gratuitement',
		tryFree: 'Essayer Pro gratuitement pendant 14 jours',
		contactSales: 'Contacter les ventes',
		planDescriptions: {
			free: 'Tout ce dont vous avez besoin pour reprendre le contrôle de votre argent.',
			pro: 'Pour celles et ceux qui veulent aller plus loin et tout automatiser.',
			business: 'Pour les freelances et petites entreprises qui doivent facturer.'
		},
		features: {
			biyuyoToday: 'Votre Biyuyo du jour (chiffre clé)',
			frequencyConfig: 'Réglage hebdomadaire/bimensuel/mensuel',
			autoSavings: 'Tirelires automatiques (illimitées)',
			quickExpense: 'Enregistrement des dépenses en un tap',
			spendingDetector: 'Détecteur de dépenses furtives',
			smartAlerts: 'Alertes intelligentes',
			pwaOffline: 'PWA installable (hors ligne)',
			darkMode: 'Mode sombre',
			baseFeatures: 'Les 18 fonctionnalités de base',
			advancedReports: 'Rapports avancés',
			familyMode: 'Mode famille (multi-utilisateur)',
			bankSync: 'Synchronisation bancaire automatique',
			prioritySupport: 'Support prioritaire',
			everythingInFree: 'Tout le contenu du plan Gratuit',
			advancedReportsCharts: 'Rapports avancés avec graphiques',
			familyUpToFive: 'Mode famille (jusqu’à 5 utilisateurs)',
			customCategories: 'Catégories personnalisées',
			export: 'Export vers Excel/PDF',
			unlimitedGoals: 'Objectifs d’épargne illimités',
			aiPredictions: 'Prévisions de dépenses par IA',
			mobileWidgets: 'Widgets mobiles',
			noAds: 'Sans publicité',
			chatSupport: 'Support par chat',
			invoicingSat: 'Facturation et SAT',
			apiIntegrations: 'API d’intégration',
			everythingInPro: 'Tout le contenu du plan Pro',
			cfdiIntegration: 'Facturation CFDI intégrée',
			satDownloads: 'Téléchargement des factures SAT',
			personalBusiness: 'Séparation finances perso/pro',
			taxReports: 'Rapports fiscaux (ISR, TVA)',
			unlimitedUsers: 'Utilisateurs illimités',
			prioritySupport247: 'Support prioritaire 24/7',
			personalizedOnboarding: 'Accompagnement personnalisé',
			dedicatedBackup: 'Sauvegarde dédiée',
			sla: 'SLA garanti',
			assignedAccountant: 'Comptable dédié (bientôt)'
		},
		guarantee: {
			title: 'Garantie satisfait ou remboursé 30 jours',
			description: "Si Pro ou Entreprise ne vous convainc pas, nous vous remboursons sans poser de questions."
		}
	},
	footer: {
		tagline: 'Votre allié financier quotidien.',
		legal: 'Légal',
		privacy: 'Confidentialité',
		terms: 'Conditions',
		support: 'Support'
	}
};

// Deutsch (Alemán)
export const de: Translations = {
	common: {
		loading: 'Laden...',
		error: 'Fehler',
		success: 'Erfolg',
		cancel: 'Abbrechen',
		save: 'Speichern',
		delete: 'Löschen',
		edit: 'Bearbeiten',
		close: 'Schließen',
		back: 'Zurück',
		next: 'Weiter',
		submit: 'Absenden',
		search: 'Suchen'
	},
	nav: {
		features: 'Funktionen',
		benefits: 'Vorteile',
		testimonials: 'Erfahrungsberichte',
		pricing: 'Preise',
		faq: 'FAQ',
		login: 'Anmelden',
		register: 'Kostenlos registrieren',
		logout: 'Abmelden',
		dashboard: 'Dashboard',
		openMenu: 'Menü öffnen',
		closeMenu: 'Menü schließen'
	},
	hero: {
		badge: 'Die ersten 18 Funktionen sind 100% kostenlos',
		title: 'Wissen Sie, wie viel Sie ausgeben können',
		titleHighlight: 'HEUTE',
		subtitle: 'mibiyuyo sagt Ihnen genau, wie viel Geld Sie jeden Tag zur Verfügung haben, legt automatisch Ihre festen Ausgaben zurück und hilft Ihnen, nicht mehr von Gehalt zu Gehalt zu leben.',
		ctaPrimary: 'Kostenlos starten',
		ctaSecondary: 'Sehen Sie wie es funktioniert',
		trustSecurity: '100% sichere Daten',
		trustSetup: 'Einrichtung in 2 Minuten',
		trustNoCard: 'Keine Kreditkarte erforderlich',
		// Dashboard demo texts
		disponibleHoy: 'Heute verfügbar',
		biyuyoDisponible: 'Verfügbares Guthaben',
		gastos: 'Ausgaben',
		apartados: 'Ersparnisse',
		yaApartamos: 'Wir haben bereits Ihre festen Ausgaben zurückgelegt',
		gastosHormiga: '-30% kleine Ausgaben',
		titleSuffix: 'ohne Ihr Gehalt zu ruinieren?',
		desktopTitle: 'mibiyuyo — Dashboard',
		navDashboard: 'Dashboard',
		navReportes: 'Berichte',
		navConfig: 'Einstellungen',
		laptopNavResumen: 'Übersicht',
		laptopNavMetas: 'Ziele',
		appGreeting: 'Guten Morgen, Carlos 👋',
		appDate: 'Samstag, 14. Dezember',
		appLabel: 'Dein heute verfügbares biyuyo:',
		miniCardRent: 'Miete',
		miniCardServices: 'Nebenkosten',
		miniCardGas: 'Benzin',
		miniCardStatus: 'Zurückgelegt ✓',
		registerExpense: 'Ausgabe erfassen',
		badgeReportesClaros: 'Klare Berichte',
		badgeSeguro: '100% sicher',
		badgeIngresos: '+$4.200/Monat',
		badgeSetup: 'Setup in 2 Min',
		badgeAcceso: '24/7 Zugang',
		badgeSinEstres: 'Kein Stress',
		badgeHechoMX: 'Made in MX',
		badgeGratis: 'Gratis',
		scrollHint: 'Mehr entdecken'
	},
	auth: {
		loginTitle: 'Willkommen zurück',
		loginSubtitle: 'Geben Sie Ihre Daten ein, um auf Ihr Konto zuzugreifen',
		registerTitle: 'Kostenloses Konto erstellen',
		registerSubtitle: 'Schließen Sie sich Tausenden von Menschen an, die bereits ihr Geld kontrollieren',
		email: 'E-Mail',
		password: 'Passwort',
		confirmPassword: 'Passwort bestätigen',
		rememberMe: 'Angemeldet bleiben',
		forgotPassword: 'Passwort vergessen?',
		noAccount: 'Kein Konto?',
		hasAccount: 'Haben Sie bereits ein Konto?',
		orContinueWith: 'oder mit E-Mail fortfahren',
		continueWithGoogle: 'Mit Google fortfahren'
	},
	pricing: {
		sectionEyebrow: 'Transparente Preise',
		title: 'Kostenlos starten, wachsen wann immer Sie wollen',
		subtitle: 'Keine Tricks, kein Kleingedrucktes. Die 18 Basisfunktionen bleiben für immer kostenlos.',
		monthly: 'Monatlich',
		annual: 'Jährlich',
		discount: '-20%',
		toggleAria: 'Zwischen monatlicher und jährlicher Abrechnung wechseln',
		free: 'Kostenlos',
		pro: 'Pro',
		business: 'Business',
		freePeriod: 'für immer',
		periodMonthly: '/Monat',
		periodAnnual: '/Monat (jährlich abgerechnet)',
		popular: 'Am beliebtesten',
		getStarted: 'Kostenlos starten',
		tryFree: 'Pro 14 Tage gratis testen',
		contactSales: 'Vertrieb kontaktieren',
		planDescriptions: {
			free: 'Alles, was Sie brauchen, um Ihre Finanzen wieder im Griff zu haben.',
			pro: 'Für alle, die weitergehen und alles automatisieren wollen.',
			business: 'Für Freelancer und kleine Unternehmen, die Rechnungen stellen müssen.'
		},
		features: {
			biyuyoToday: 'Ihr Biyuyo des Tages (Schlüsselzahl)',
			frequencyConfig: 'Wöchentliche/14-tägige/monatliche Intervalle',
			autoSavings: 'Automatische Sparboxen (unbegrenzt)',
			quickExpense: 'Ausgaben mit einem Tipp erfassen',
			spendingDetector: 'Detektor versteckter Ausgaben',
			smartAlerts: 'Intelligente Warnungen',
			pwaOffline: 'Installierbare PWA (offline)',
			darkMode: 'Dark Mode',
			baseFeatures: 'Die 18 Basisfunktionen',
			advancedReports: 'Erweiterte Berichte',
			familyMode: 'Familienmodus (Mehrbenutzer)',
			bankSync: 'Automatischer Bankabgleich',
			prioritySupport: 'Priorisierter Support',
			everythingInFree: 'Alles aus dem kostenlosen Plan',
			advancedReportsCharts: 'Erweiterte Berichte mit Charts',
			familyUpToFive: 'Familienmodus (bis zu 5 Nutzer)',
			customCategories: 'Eigene Kategorien',
			export: 'Export nach Excel/PDF',
			unlimitedGoals: 'Unbegrenzte Sparziele',
			aiPredictions: 'KI-Ausgabenprognosen',
			mobileWidgets: 'Mobile Widgets',
			noAds: 'Werbefrei',
			chatSupport: 'Support per Chat',
			invoicingSat: 'Rechnungen & SAT',
			apiIntegrations: 'API-Integrationen',
			everythingInPro: 'Alles aus dem Pro-Plan',
			cfdiIntegration: 'CFDI-Rechnungsstellung integriert',
			satDownloads: 'SAT-Rechnungsexporte',
			personalBusiness: 'Trennung privat/geschäftlich',
			taxReports: 'Steuerberichte (ISR, IVA)',
			unlimitedUsers: 'Unbegrenzte Nutzer',
			prioritySupport247: 'Priorisierter Support 24/7',
			personalizedOnboarding: 'Individuelle Einführung',
			dedicatedBackup: 'Dedizierte Backups',
			sla: 'Garantierter SLA',
			assignedAccountant: 'Eigene Steuerberatung (kommt bald)'
		},
		guarantee: {
			title: '30-Tage-Geld-zurück-Garantie',
			description: 'Wenn Pro oder Business nicht passt, erstatten wir ohne Nachfragen.'
		}
	},
	footer: {
		tagline: 'Ihr täglicher Finanzpartner.',
		legal: 'Rechtliches',
		privacy: 'Datenschutz',
		terms: 'AGB',
		support: 'Support'
	}
};

// Italiano (Italiano)
export const it: Translations = {
	common: {
		loading: 'Caricamento...',
		error: 'Errore',
		success: 'Successo',
		cancel: 'Annulla',
		save: 'Salva',
		delete: 'Elimina',
		edit: 'Modifica',
		close: 'Chiudi',
		back: 'Indietro',
		next: 'Avanti',
		submit: 'Invia',
		search: 'Cerca'
	},
	nav: {
		features: 'Funzionalità',
		benefits: 'Benefici',
		testimonials: 'Testimonianze',
		pricing: 'Prezzi',
		faq: 'FAQ',
		login: 'Accedi',
		register: 'Registrati gratis',
		logout: 'Esci',
		dashboard: 'Dashboard',
		openMenu: 'Apri menu',
		closeMenu: 'Chiudi menu'
	},
	hero: {
		badge: 'Le prime 18 funzionalità sono 100% gratuite',
		title: 'Sai quanto puoi spendere',
		titleHighlight: 'OGGI',
		subtitle: 'mibiyuyo ti dice esattamente quanti soldi hai a disposizione ogni giorno, mette da parte automaticamente le tue spese fisse e ti aiuta a smettere di vivere di stipendio in stipendio.',
		ctaPrimary: 'Inizia gratis',
		ctaSecondary: 'Scopri come funziona',
		trustSecurity: 'Dati 100% sicuri',
		trustSetup: 'Configurazione in 2 minuti',
		trustNoCard: 'Nessuna carta di credito',
		// Dashboard demo texts
		disponibleHoy: 'Disponibile oggi',
		biyuyoDisponible: 'Saldo disponibile',
		gastos: 'Spese',
		apartados: 'Risparmi',
		yaApartamos: 'Abbiamo già messo da parte le tue spese fisse',
		gastosHormiga: '-30% piccole spese',
		titleSuffix: 'senza rovinare il tuo stipendio?',
		desktopTitle: 'mibiyuyo — Dashboard',
		navDashboard: 'Dashboard',
		navReportes: 'Report',
		navConfig: 'Impostazioni',
		laptopNavResumen: 'Panoramica',
		laptopNavMetas: 'Obiettivi',
		appGreeting: 'Buongiorno, Carlos 👋',
		appDate: 'Sabato 14 dicembre',
		appLabel: 'Il tuo biyuyo disponibile oggi:',
		miniCardRent: 'Affitto',
		miniCardServices: 'Servizi',
		miniCardGas: 'Carburante',
		miniCardStatus: 'Accantonato ✓',
		registerExpense: 'Registrare spesa',
		badgeReportesClaros: 'Report chiari',
		badgeSeguro: '100% sicuro',
		badgeIngresos: '+$4.200/mese',
		badgeSetup: 'Setup in 2 min',
		badgeAcceso: 'Accesso 24/7',
		badgeSinEstres: 'Zero stress',
		badgeHechoMX: 'Made in MX',
		badgeGratis: 'Gratis',
		scrollHint: 'Scopri di più'
	},
	auth: {
		loginTitle: 'Bentornato',
		loginSubtitle: 'Inserisci i tuoi dati per accedere al tuo account',
		registerTitle: 'Crea un account gratuito',
		registerSubtitle: 'Unisciti a migliaia di persone che già controllano i loro soldi',
		email: 'Email',
		password: 'Password',
		confirmPassword: 'Conferma password',
		rememberMe: 'Ricordami',
		forgotPassword: 'Password dimenticata?',
		noAccount: 'Non hai un account?',
		hasAccount: 'Hai già un account?',
		orContinueWith: 'o continua con la tua email',
		continueWithGoogle: 'Continua con Google'
	},
	pricing: {
		sectionEyebrow: 'Prezzi trasparenti',
		title: 'Inizia gratis, cresci quando vuoi',
		subtitle: 'Nessun trucco, niente caratteri piccoli. Le 18 funzionalità base sono gratuite per sempre.',
		monthly: 'Mensile',
		annual: 'Annuale',
		discount: '-20%',
		toggleAria: 'Passa dalla fatturazione mensile a quella annuale',
		free: 'Gratis',
		pro: 'Pro',
		business: 'Business',
		freePeriod: 'per sempre',
		periodMonthly: '/mese',
		periodAnnual: '/mese (fatturato annualmente)',
		popular: 'Il più popolare',
		getStarted: 'Inizia gratis',
		tryFree: 'Prova Pro gratis per 14 giorni',
		contactSales: 'Contatta il team vendite',
		planDescriptions: {
			free: 'Tutto ciò che ti serve per riprendere il controllo dei tuoi soldi.',
			pro: 'Per chi vuole fare un salto in più e automatizzare tutto.',
			business: 'Per freelance e piccole imprese che devono fatturare.'
		},
		features: {
			biyuyoToday: 'Il tuo Biyuyo di oggi (numero chiave)',
			frequencyConfig: 'Programmazione settimanale/bisettimanale/mensile',
			autoSavings: 'Salvadanai automatici (illimitati)',
			quickExpense: 'Registrazione spese in un tap',
			spendingDetector: 'Rilevatore di spese invisibili',
			smartAlerts: 'Avvisi intelligenti',
			pwaOffline: 'PWA installabile (offline)',
			darkMode: 'Modalità scura',
			baseFeatures: 'Le 18 funzionalità base',
			advancedReports: 'Report avanzati',
			familyMode: 'Modalità famiglia (multi-utente)',
			bankSync: 'Sincronizzazione bancaria automatica',
			prioritySupport: 'Supporto prioritario',
			everythingInFree: 'Tutto il piano Gratis',
			advancedReportsCharts: 'Report avanzati con grafici',
			familyUpToFive: 'Modalità famiglia (fino a 5 utenti)',
			customCategories: 'Categorie personalizzate',
			export: 'Export in Excel/PDF',
			unlimitedGoals: 'Obiettivi di risparmio illimitati',
			aiPredictions: 'Previsioni di spesa con IA',
			mobileWidgets: 'Widget mobile',
			noAds: 'Senza pubblicità',
			chatSupport: 'Supporto via chat',
			invoicingSat: 'Fatturazione e SAT',
			apiIntegrations: 'API per integrazioni',
			everythingInPro: 'Tutto il piano Pro',
			cfdiIntegration: 'Fatturazione CFDI integrata',
			satDownloads: 'Download fatture SAT',
			personalBusiness: 'Separazione finanze personali/pro',
			taxReports: 'Report fiscali (ISR, IVA)',
			unlimitedUsers: 'Utenti illimitati',
			prioritySupport247: 'Supporto prioritario 24/7',
			personalizedOnboarding: 'Onboarding personalizzato',
			dedicatedBackup: 'Backup dedicato',
			sla: 'SLA garantito',
			assignedAccountant: 'Commercialista dedicato (presto)'
		},
		guarantee: {
			title: 'Garanzia di rimborso 30 giorni',
			description: 'Se Pro o Business non fanno per te, rimborsiamo senza domande.'
		}
	},
	footer: {
		tagline: 'Il tuo alleato finanziario quotidiano.',
		legal: 'Legale',
		privacy: 'Privacy',
		terms: 'Termini',
		support: 'Supporto'
	}
};

// Русский (Ruso)
export const ru: Translations = {
	common: {
		loading: 'Загрузка...',
		error: 'Ошибка',
		success: 'Успех',
		cancel: 'Отмена',
		save: 'Сохранить',
		delete: 'Удалить',
		edit: 'Редактировать',
		close: 'Закрыть',
		back: 'Назад',
		next: 'Далее',
		submit: 'Отправить',
		search: 'Поиск'
	},
	nav: {
		features: 'Возможности',
		benefits: 'Преимущества',
		testimonials: 'Отзывы',
		pricing: 'Цены',
		faq: 'FAQ',
		login: 'Войти',
		register: 'Регистрация',
		logout: 'Выйти',
		dashboard: 'Панель',
		openMenu: 'Открыть меню',
		closeMenu: 'Закрыть меню'
	},
	hero: {
		badge: 'Первые 18 функций 100% бесплатны',
		title: 'Вы знаете, сколько можете потратить',
		titleHighlight: 'СЕГОДНЯ',
		subtitle: 'mibiyuyo точно показывает, сколько денег у вас есть каждый день, автоматически откладывает на постоянные расходы и помогает перестать жить от зарплаты до зарплаты.',
		ctaPrimary: 'Начать бесплатно',
		ctaSecondary: 'Как это работает',
		trustSecurity: '100% безопасные данные',
		trustSetup: 'Настройка за 2 минуты',
		trustNoCard: 'Без кредитной карты',
		// Dashboard demo texts
		disponibleHoy: 'Доступно сегодня',
		biyuyoDisponible: 'Доступный баланс',
		gastos: 'Расходы',
		apartados: 'Сбережения',
		yaApartamos: 'Мы уже отложили ваши фиксированные расходы',
		gastosHormiga: '-30% мелкие расходы',
		titleSuffix: 'не портя зарплату?',
		desktopTitle: 'mibiyuyo — Панель',
		navDashboard: 'Панель',
		navReportes: 'Отчеты',
		navConfig: 'Настройки',
		laptopNavResumen: 'Обзор',
		laptopNavMetas: 'Цели',
		appGreeting: 'Доброе утро, Карлос 👋',
		appDate: 'Суббота, 14 декабря',
		appLabel: 'Ваш biyuyo доступен сегодня:',
		miniCardRent: 'Аренда',
		miniCardServices: 'Коммунальные услуги',
		miniCardGas: 'Бензин',
		miniCardStatus: 'Отложено ✓',
		registerExpense: 'Записать расход',
		badgeReportesClaros: 'Понятные отчеты',
		badgeSeguro: '100% безопасно',
		badgeIngresos: '+$4 200/мес',
		badgeSetup: 'Настройка за 2 мин',
		badgeAcceso: 'Доступ 24/7',
		badgeSinEstres: 'Без стресса',
		badgeHechoMX: 'Сделано в MX',
		badgeGratis: 'Бесплатно',
		scrollHint: 'Узнать больше'
	},
	auth: {
		loginTitle: 'С возвращением',
		loginSubtitle: 'Введите данные для доступа к аккаунту',
		registerTitle: 'Создать бесплатный аккаунт',
		registerSubtitle: 'Присоединяйтесь к тысячам людей, которые уже контролируют свои деньги',
		email: 'Email',
		password: 'Пароль',
		confirmPassword: 'Подтвердите пароль',
		rememberMe: 'Запомнить меня',
		forgotPassword: 'Забыли пароль?',
		noAccount: 'Нет аккаунта?',
		hasAccount: 'Уже есть аккаунт?',
		orContinueWith: 'или продолжите с email',
		continueWithGoogle: 'Продолжить с Google'
	},
	pricing: {
		sectionEyebrow: 'Прозрачные тарифы',
		title: 'Начните бесплатно, растите когда хотите',
		subtitle: 'Без уловок, без мелкого шрифта. 18 базовых функций бесплатны навсегда.',
		monthly: 'Ежемесячно',
		annual: 'Ежегодно',
		discount: '-20%',
		toggleAria: 'Переключить между ежемесячной и ежегодной оплатой',
		free: 'Бесплатно',
		pro: 'Pro',
		business: 'Бизнес',
		freePeriod: 'навсегда',
		periodMonthly: '/месяц',
		periodAnnual: '/месяц (оплата раз в год)',
		popular: 'Самый популярный',
		getStarted: 'Начать бесплатно',
		tryFree: 'Попробовать Pro бесплатно 14 дней',
		contactSales: 'Связаться с отделом продаж',
		planDescriptions: {
			free: 'Всё необходимое, чтобы начать контролировать деньги.',
			pro: 'Для тех, кто хочет идти дальше и автоматизировать всё.',
			business: 'Для фрилансеров и малого бизнеса, которым нужны счета и отчётность.'
		},
		features: {
			biyuyoToday: 'Ваш Biyuyo сегодня (главное число)',
			frequencyConfig: 'Настройка расписания: неделя/две недели/месяц',
			autoSavings: 'Автоматические копилки (без ограничений)',
			quickExpense: 'Регистрация расходов в одно касание',
			spendingDetector: 'Детектор мелких трат',
			smartAlerts: 'Умные уведомления',
			pwaOffline: 'Устанавливаемое PWA (офлайн)',
			darkMode: 'Тёмная тема',
			baseFeatures: 'Все 18 базовых функций',
			advancedReports: 'Расширенные отчёты',
			familyMode: 'Семейный режим (несколько пользователей)',
			bankSync: 'Автосинхронизация с банком',
			prioritySupport: 'Приоритетная поддержка',
			everythingInFree: 'Всё из тарифа Бесплатно',
			advancedReportsCharts: 'Расширенные отчёты с графиками',
			familyUpToFive: 'Семейный режим (до 5 пользователей)',
			customCategories: 'Пользовательские категории',
			export: 'Экспорт в Excel/PDF',
			unlimitedGoals: 'Неограниченные цели по сбережениям',
			aiPredictions: 'Прогноз расходов на основе ИИ',
			mobileWidgets: 'Виджеты для смартфона',
			noAds: 'Без рекламы',
			chatSupport: 'Поддержка в чате',
			invoicingSat: 'Выставление счетов и SAT',
			apiIntegrations: 'API для интеграций',
			everythingInPro: 'Всё из тарифа Pro',
			cfdiIntegration: 'Интегрированная выписка CFDI',
			satDownloads: 'Загрузка счетов из SAT',
			personalBusiness: 'Разделение личных и бизнес-денег',
			taxReports: 'Налоговые отчёты (ISR, IVA)',
			unlimitedUsers: 'Неограниченное число пользователей',
			prioritySupport247: 'Приоритетная поддержка 24/7',
			personalizedOnboarding: 'Персональное подключение',
			dedicatedBackup: 'Выделенное резервное копирование',
			sla: 'Гарантированное SLA',
			assignedAccountant: 'Персональный бухгалтер (скоро)'
		},
		guarantee: {
			title: 'Гарантия удовлетворённости 30 дней',
			description: 'Если Pro или Бизнес вам не подойдут, вернём деньги без вопросов.'
		}
	},
	footer: {
		tagline: 'Ваш ежедневный финансовый помощник. Знайте, сколько можно потратить сегодня без таблиц и лишней математики.',
		legal: 'Правовая информация',
		privacy: 'Конфиденциальность',
		terms: 'Условия',
		support: 'Поддержка',
		headings: {
			product: 'Продукт',
			company: 'Компания',
			resources: 'Ресурсы',
			legal: 'Право'
		},
		productLinks: {
			features: 'Возможности',
			pricing: 'Тарифы',
			roadmap: 'Дорожная карта',
			changelog: 'Журнал изменений',
			integrations: 'Интеграции'
		},
		companyLinks: {
			about: 'О нас',
			blog: 'Блог',
			press: 'Пресса',
			careers: 'Карьера',
			contact: 'Контакты'
		},
		resourceLinks: {
			helpCenter: 'Центр помощи',
			guides: 'Руководства',
			api: 'API Docs',
			webinars: 'Вебинары',
			community: 'Сообщество'
		},
		legalLinks: {
			privacy: 'Политика конфиденциальности',
			terms: 'Условия использования',
			cookies: 'Cookies',
			security: 'Безопасность'
		},
		trust: {
			ssl: 'Защищённый SSL',
			sslDesc: 'Шифрование 256-бит',
			compliance: 'LFPDPPP',
			complianceDesc: 'Данные под защитой',
			iso: 'ISO 27001',
			isoDesc: 'Сертификация в процессе'
		},
		contact: {
			email: 'hola@mibiyuyo.com',
			phone: '+52 55 1234 5678',
			location: 'Мехико, Мексика'
		},
		bottom: {
			rights: 'Все права защищены.',
			madeIn: 'Сделано с 💚 в Мексике.',
			sitemap: 'Карта сайта'
		}
	}
};

export const translations: Record<Locale, Translations> = { es, en, pt, zh, ko, ja, fr, de, it, ru };
