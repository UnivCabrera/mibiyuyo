# 🎨 BLOQUE D: PRODUCTO, PSICOLOGÍA Y DISEÑO

## 25. Product Manager

### 1. Diagnóstico Actual

Visión ambiciosa pero dispersa. Falta un Roadmap claro de MVP vs V2.

### 2. Riesgos Críticos

- **Feature Creep:** Querer hacer todo (Nómina, Inventarios, Bancos) y no terminar nada bien.
- **Desalineación:** Construir lo que creemos que quieren, no lo que necesitan.

### 3. Soluciones 2026

- **MVP Estricto:** Solo Facturación + Declaración Mensual Básica.
- **Feedback Loops:** Botón de "Sugerir mejora" en cada pantalla.

### 4. Action Items

- [ ] Definir alcance del MVP para lanzamiento en 4 semanas.
- [ ] Priorizar Backlog en GitHub Projects.

## 26. UX Researcher

### 1. Diagnóstico Actual

Diseño basado en suposiciones.

### 2. Riesgos Críticos

- **Fricción:** Flujos que tienen sentido para un ingeniero pero no para un contador.

### 3. Soluciones 2026

- **Entrevistas:** Hablar con 5 contadores y 5 dueños de PyME.
- **Pruebas de Usabilidad:** Observar a usuarios reales intentando hacer una factura.

### 4. Action Items

- [ ] Crear script de entrevista de descubrimiento.
- [ ] Grabar sesiones de uso (con permiso) usando herramientas como Hotjar (futuro).

## 27. Psicólogo Conductual

### 1. Diagnóstico Actual

La contabilidad genera ansiedad. La app no hace nada para mitigarla.

### 2. Riesgos Críticos

- **Abandono:** El usuario evita entrar a la app por miedo a ver "números rojos".

### 3. Soluciones 2026

- **Refuerzo Positivo:** Celebrar cuando se completa una tarea (ej. "¡Factura enviada!").
- **Lenguaje Calbado:** Evitar tecnicismos alarmantes. Usar "Todo en orden" en verde.

### 4. Action Items

- [ ] Revisar copy de mensajes de error para hacerlos empáticos y accionables.
- [ ] Diseñar "Empty States" amigables.

## 28. UI Designer

### 1. Diagnóstico Actual

Interfaz funcional pero probablemente genérica.

### 2. Riesgos Críticos

- **Desconfianza:** Una UI fea o rota genera desconfianza en temas de dinero.

### 3. Soluciones 2026

- **Design System:** Definir colores, tipografía, espaciados consistentes.
- **Modo Oscuro:** Esencial para contadores que trabajan de noche.

### 4. Action Items

- [ ] Crear guía de estilos básica (Figma o código).
- [ ] Implementar componentes base en Svelte (Botones, Inputs, Cards).

## 29. Accessibility Lead (A11y)

### 1. Diagnóstico Actual

Probablemente no cumple WCAG.

### 2. Riesgos Críticos

- **Exclusión:** Usuarios con problemas de visión no pueden usar la app.
- **Legal:** En algunos países es obligatorio (y éticamente correcto).

### 3. Soluciones 2026

- **Semántica HTML:** Usar `<button>`, `<label>`, `aria-live`.
- **Contraste:** Asegurar legibilidad de textos.

### 4. Action Items

- [ ] Auditar con Lighthouse Accessibility.
- [ ] Asegurar navegación por teclado completa.

## 30. Gamification Expert

### 1. Diagnóstico Actual

La contabilidad es aburrida.

### 2. Riesgos Críticos

- **Baja Retención:** El usuario solo entra una vez al mes.

### 3. Soluciones 2026

- **Rachas:** "Llevas 3 meses declarando a tiempo".
- **Niveles:** "Contador Novato" -> "CFO Pro".

### 4. Action Items

- [ ] Diseñar sistema de logros simple.
- [ ] Barra de progreso de "Salud Fiscal".

## 31. Technical Writer

### 1. Diagnóstico Actual

Documentación técnica mezclada con notas personales.

### 2. Riesgos Críticos

- **Bus Factor:** Si tú te vas, nadie entiende el sistema.
- **Soporte:** Usuarios preguntando lo mismo una y otra vez.

### 3. Soluciones 2026

- **Base de Conocimiento:** Artículos de ayuda integrados ("¿Cómo cancelo una factura?").
- **Docs de API:** Para integradores externos.

### 4. Action Items

- [ ] Escribir manual de usuario básico.
- [ ] Documentar arquitectura interna para nuevos devs.

## 32. Customer Success

### 1. Diagnóstico Actual

No existe proceso de Onboarding.

### 2. Riesgos Críticos

- **Churn Temprano:** El usuario se registra, no entiende qué hacer y se va para siempre.

### 3. Soluciones 2026

- **Tour Guiado:** "Aquí creas facturas", "Aquí ves tus impuestos".
- **Email Drip:** Secuencia de correos educativos los primeros 7 días.

### 4. Action Items

- [ ] Diseñar flujo de "Primeros Pasos" (Setup Wizard).
- [ ] Configurar correos transaccionales de bienvenida.

## 33. Neuromarketing Specialist

### 1. Diagnóstico Actual

No se aplican sesgos cognitivos para venta/retención.

### 2. Riesgos Críticos

- **Baja Conversión:** El usuario gratuito no ve valor en pagar.

### 3. Soluciones 2026

- **Anclaje de Precios:** Mostrar el plan caro para que el medio parezca barato.
- **Aversión a la Pérdida:** "No pierdas tus deducciones por no registrar gastos".

### 4. Action Items

- [ ] Optimizar página de Precios (Pricing Page).
- [ ] Usar prueba social ("500 PyMES confían en nosotros").
