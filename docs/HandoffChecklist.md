# Landing i18n Handoff

## Resumen rapido

- Se completo la localizacion de PricingSection con claves centralizadas y caidas a en cuando falta traduccion.
- Se reviso el catalogo de traducciones para garantizar paridad de estructura entre es, en, fr, de, it, pt, zh, ko, ja y ru.
- Se corrigieron las entradas de pricing en es y se verifico que no haya regresiones en hero y footer.

## Cobertura de idiomas en pricing

| Idioma | Estado |
| --- | --- |
| es | Completo |
| en | Completo |
| pt | Completo |
| zh | Completo |
| ko | Completo |
| ja | Completo |
| fr | Completo |
| de | Completo |
| it | Completo |
| ru | Completo |

## Acciones sugeridas

1. Documentar proceso para mantener paridad de claves cuando se agreguen nuevas secciones.
2. Ejecutar `bun run check` tras aislar las configs externas (_LEGADO_) para validar que svelte-check no arrastre errores ajenos al proyecto principal.
