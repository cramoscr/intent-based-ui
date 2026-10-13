# IBUI-004 — Consulta conversacional de pedidos
**Estado:** Especificado; pendiente de implementación y validación
**Fecha:** 2026-10-13

## Propósito
Consultar pedidos reales de Cirios-App mediante intenciones escritas y visualizar resultados adaptativos, sin navegar por pantallas tradicionales de ERP.

## Alcance funcional
- Interpretar «mostrar pedidos pendientes», «ver mis pedidos», «pedidos de Marvin» y «últimos pedidos» como consultas, nunca como creación o modificación.
- Consultar exclusivamente el backend autorizado de Cirios-App; no usar datos ficticios en producción.
- Mostrar una lista/tarjetas compactas con identificador, cliente, fecha, estado y resumen de productos cuando estén disponibles.
- Seleccionar un pedido para ver detalles básicos sin perder el contexto de búsqueda. La consulta detallada avanzada queda para IBUI-005.
- Estados vacíos, carga, errores y acceso no autorizado con mensajes claros; no inventar resultados.
- Diseño responsive, con control de intenciones arriba y resultados debajo, consistente con IBUI-003.1.
- Mantener catálogo y checkout existentes sin regresiones.

## Interacción de referencia
Usuario: «Mostrar pedidos pendientes».
Sistema: presenta pedidos recuperados del backend, o «No encontré pedidos pendientes».
Usuario: «Pedidos de Marvin».
Sistema: aplica filtro por cliente y presenta coincidencias.
Usuario: «Ver el primero».
Sistema: abre el detalle básico del pedido seleccionado.

## Reglas
- «Pendiente» se traduce usando los estados reales del backend, previa inspección de su contrato; no presumir códigos.
- «Mis pedidos» depende de identidad y permisos efectivos; no asumir propiedad de pedidos.
- Consultas ambiguas piden una aclaración corta.
- Paginación/límites para colecciones extensas.
- Nunca mostrar pedidos de un ámbito sin autorización.
- Las tarjetas del ejemplo conversacional son ilustrativas, no evidencia de datos reales.

## Fuera de alcance
Editar, cancelar, eliminar, cambiar estados, crear APIs duplicadas, voz, generalización prematura del motor.

## Criterios de aceptación
- [ ] La consulta de pendientes muestra solo registros autorizados y estados correctamente interpretados.
- [ ] Filtro por cliente y consulta de últimos pedidos funcionan.
- [ ] Selección contextual de un pedido muestra su detalle básico.
- [ ] Vacío, error de red y falta de autorización se presentan correctamente.
- [ ] Funciona en móvil sin ocultar el campo de intenciones.
- [ ] IBUI-002, IBUI-003 y checkout no presentan regresiones.
- [ ] Se verifican contratos, permisos y pruebas antes de cualquier publicación.

## Dependencias y decisiones abiertas
Inspeccionar endpoints, autenticación, modelo de estados y paginación de Cirios-App antes de codificar. IBUI-003.1 sigue pendiente de implementación.

**Despliegue:** solo con autorización explícita «publica en producción».
