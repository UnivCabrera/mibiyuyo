# 🏛️ ¿POR QUÉ ARQUITECTURA HEXAGONAL + EVENT SOURCING?
## Justificación Técnica y de Negocio para PRO_FINAN_CONTA_PYM

**Fecha:** 29 Noviembre 2025  
**Proyecto:** Plataforma Fiscal/Contable para PyMEs  
**Contexto:** Alta sensibilidad de datos (SAT), requisitos legales estrictos (LFPDPPP) y necesidad de resiliencia.

---

### 1. EL PROBLEMA: VOLATILIDAD Y RIESGO
Este proyecto no es un simple CRUD. Enfrenta desafíos únicos:
*   **Reglas Externas Cambiantes:** El SAT cambia esquemas (CFDI 3.3 -> 4.0) sin previo aviso.
*   **Datos Críticos:** Manejo de FIEL/CIEC implica responsabilidad legal masiva.
*   **Auditoría Obligatoria:** Necesitamos saber *exactamente* qué pasó, cuándo y quién lo hizo.

### 2. LA SOLUCIÓN: ARQUITECTURA HEXAGONAL (PORTS & ADAPTERS)
Esta arquitectura desacopla el "Núcleo del Negocio" (Cálculo de impuestos, Reglas contables) de la "Infraestructura" (Base de datos, API del SAT, Web Framework).

**¿Por qué es perfecta aquí?**
*   **Protección del Núcleo:** Si el SAT cambia su API mañana, solo cambiamos el *Adaptador SAT*. El núcleo de cálculo de impuestos no se toca.
*   **Testabilidad:** Podemos probar toda la lógica contable sin conectar con el SAT real ni levantar una base de datos.
*   **Independencia Tecnológica:** Si mañana queremos cambiar de PostgreSQL a Mongo, o de Elysia a Express, el dominio no se entera.

### 3. EL SUPERPODER: EVENT SOURCING (ALMACENAMIENTO DE EVENTOS)
En lugar de guardar solo el "estado actual" (ej. "Factura Pagada"), guardamos la *historia* de todo lo que pasó (`FacturaCreada` -> `FacturaEnviadaSAT` -> `FacturaTimbrada` -> `FacturaPagada`).

**Beneficios Críticos:**
*   **Auditoría Forense Nativa:** El historial de eventos ES la auditoría. No hay que programar logs extra. Es inmutable por diseño.
*   **Reconstrucción de Estado:** Si la base de datos se corrompe, podemos "reproducir" los eventos y reconstruir el sistema desde cero.
*   **Depuración en el Tiempo:** Podemos ver exactamente cómo estaba el sistema el "14 de Febrero a las 10:00 AM".

### 4. CONCLUSIÓN
Esta combinación no es "sobre-ingeniería"; es un **seguro de vida** para el proyecto. Nos permite cumplir con la ley, dormir tranquilos ante cambios del SAT y escalar sin miedo a romper la lógica financiera.
