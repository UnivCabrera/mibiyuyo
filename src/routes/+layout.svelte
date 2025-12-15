<script lang="ts">
	import '../lib/styles/app.css';

	let { children } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>mibiyuyo — Sabe cuánto puedes gastar HOY | Finanzas Personales México</title>
	<meta name="title" content="mibiyuyo — Sabe cuánto puedes gastar HOY | Finanzas Personales México" />
	<meta name="description" content="La app de finanzas personales más simple de México. Sin matemáticas, sin hojas de Excel. Solo abre la app y ve tu número verde: lo que puedes gastar hoy sin afectar tus compromisos." />
	<meta name="keywords" content="finanzas personales, control de gastos, ahorro, México, presupuesto, dinero, app financiera, mibiyuyo" />
	<meta name="author" content="mibiyuyo" />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="Spanish" />
	<meta name="revisit-after" content="7 days" />

	<!-- Favicon -->
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://mibiyuyo.com/" />
	<meta property="og:title" content="mibiyuyo — Sabe cuánto puedes gastar HOY" />
	<meta property="og:description" content="La app de finanzas personales más simple de México. Solo abre la app y ve tu número verde." />
	<meta property="og:image" content="https://mibiyuyo.com/og-image.png" />
	<meta property="og:locale" content="es_MX" />
	<meta property="og:site_name" content="mibiyuyo" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://mibiyuyo.com/" />
	<meta property="twitter:title" content="mibiyuyo — Sabe cuánto puedes gastar HOY" />
	<meta property="twitter:description" content="La app de finanzas personales más simple de México. Solo abre la app y ve tu número verde." />
	<meta property="twitter:image" content="https://mibiyuyo.com/og-image.png" />
	<meta name="twitter:creator" content="@mibiyuyo" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://mibiyuyo.com/" />

	<!-- Preconnect to Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />

	<!-- Theme Color -->
	<meta name="theme-color" content="#f97316" />
	<meta name="msapplication-TileColor" content="#f97316" />

	<!-- Viewport -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />

	<!-- Schema.org JSON-LD -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "mibiyuyo",
		"applicationCategory": "FinanceApplication",
		"operatingSystem": "Web, iOS, Android",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "MXN"
		},
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "4.9",
			"ratingCount": "2500"
		},
		"description": "App de finanzas personales para México. Controla tus gastos sin complicaciones.",
		"url": "https://mibiyuyo.com"
	}
	</script>`}
</svelte:head>

<div class="app">
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>
