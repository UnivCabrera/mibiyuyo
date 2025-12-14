# Finanzas App MX

## Descripción del Proyecto

Finanzas App MX es una plataforma web integral diseñada para la gestión financiera y contable, enfocada en el mercado mexicano. La aplicación combina herramientas de finanzas personales, contabilidad simplificada y cumplimiento fiscal, todo en un entorno intuitivo y fácil de usar.

## Características Principales

- **Gestión de Finanzas Personales**: Control total de ingresos, gastos y presupuestos.
- **Contabilidad Simplificada**: Herramientas accesibles para freelancers y pequeñas empresas.
- **Cumplimiento Fiscal**: Integración nativa con el SAT para la generación de CFDI.
- **Educación Financiera**: Recursos educativos y herramientas para mejorar la salud financiera.
- **Búsqueda Semántica**: Bot inteligente que permite encontrar documentos y registros mediante lenguaje natural.

## Estructura del Proyecto

```
finanzas-app-mx
├── .vscode
│   └── settings.json
├── tools
│   └── mcp-svelte-docs
│       ├── src
│       │   ├── index.ts
│       │   ├── tools
│       │   │   └── doc-search.ts
│       │   └── resources
│       │       └── svelte-docs.ts
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── docs
│   └── mcp
│       └── SETUP_SVELTE_MCP.md
├── mcp_config.json
├── package.json
├── tsconfig.json
└── README.md
```

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/finanzas-app-mx.git
   cd finanzas-app-mx
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura el entorno:
   - Asegúrate de tener configurado el archivo `mcp_config.json` con los parámetros necesarios.

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:

```bash
npm start
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agrega nueva característica'`).
4. Envía un pull request.

## Documentación de MCP Svelte

Para más información sobre la configuración y uso del servidor MCP para Svelte, consulta el archivo `docs/mcp/SETUP_SVELTE_MCP.md` y la documentación en `tools/mcp-svelte-docs/README.md`.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
