# MATRIZ DE RIESGO DE TRATAMIENTO DE DATOS PERSONALES

## Análisis de Impacto a la Privacidad (PIA)

**Fecha de Análisis:** 29 Noviembre 2025
**Responsable:** Oficial de Privacidad (DPO)

Esta matriz identifica, clasifica y evalúa los riesgos asociados al tratamiento de datos personales en la plataforma PRO FINAN CONTA PYM, conforme a la LFPDPPP y estándares ISO 27701.

| ID       | Tipo de Dato                | Clasificación                    | Finalidad del Tratamiento                  | Riesgo Inherente | Medidas de Mitigación                                                                                 | Riesgo Residual |
| -------- | --------------------------- | -------------------------------- | ------------------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------- | --------------- |
| **D-01** | **RFC / Razón Social**      | Identificación (Público/Privado) | Facturación, Identificación de cuenta      | Bajo             | Validación vs Listas Negras SAT (69-B).                                                               | Bajo            |
| **D-02** | **Correo Electrónico**      | Contacto                         | Notificaciones, Recuperación de contraseña | Medio            | Verificación de doble opt-in. Enmascaramiento en logs.                                                | Bajo            |
| **D-03** | **Contraseña Acceso**       | Autenticación                    | Ingreso a la plataforma                    | Alto             | Hashing (Argon2id). Nunca texto plano.                                                                | Bajo            |
| **D-04** | **Archivos e.Firma (.key)** | **SENSIBLE (Patrimonial)**       | Timbrado y Descarga SAT                    | **CRÍTICO**      | Almacenamiento aislado `/srv/sat_credentials`. Cifrado de volumen. Acceso restringido por contenedor. | Medio           |
| **D-05** | **Contraseña CIEC**         | **SENSIBLE (Patrimonial)**       | Scraping/Sincronización SAT                | **CRÍTICO**      | Cifrado AES-256 en BD. Llaves de cifrado en KMS externo.                                              | Medio           |
| **D-06** | **CFDI (XMLs)**             | Patrimonial                      | Contabilidad, Cálculo de Impuestos         | Medio            | ACLs estrictas (solo el usuario ve sus facturas). Backups cifrados.                                   | Bajo            |
| **D-07** | **Cuenta Bancaria (CLABE)** | Patrimonial                      | Pago de suscripción / Conciliación         | Alto             | Tokenización vía Stripe/Pasarela. No se almacena completo en BD.                                      | Bajo            |
| **D-08** | **Empleados (Nómina)**      | Identificación / Patrimonial     | Timbrado de Nómina                         | Medio            | Roles de acceso segregados (solo RRHH/Contador).                                                      | Bajo            |
| **D-09** | **Logs de Acceso (IP)**     | Identificación                   | Seguridad y Auditoría                      | Medio            | Retención limitada. Logs inmutables.                                                                  | Bajo            |

### Escala de Riesgo

- **CRÍTICO:** Fuga implica daño patrimonial grave, robo de identidad fiscal o multas masivas.
- **ALTO:** Fuga implica acceso no autorizado a recursos financieros o datos sensibles.
- **MEDIO:** Fuga implica spam, phishing dirigido o pérdida de privacidad moderada.
- **BAJO:** Datos públicos o de bajo impacto.

### Conclusión del Análisis

El tratamiento de **D-04** y **D-05** representa el mayor riesgo operativo y legal. Se requiere mantener la vigilancia estricta sobre los controles compensatorios (Aislamiento, Monitoreo, Logs Inmutables) descritos en la arquitectura de seguridad.
