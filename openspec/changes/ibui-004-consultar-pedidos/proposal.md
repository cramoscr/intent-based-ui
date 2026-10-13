# Proposal — IBUI-004 Consultar pedidos

## Why
IBUI-003 permite registrar pedidos; el siguiente incremento útil es recuperarlos mediante intención escrita, conservando el paradigma intent-first.

## What changes
- Reconocimiento de intenciones de consulta y filtros (pendientes, cliente, recientes).
- Integración de lectura con los servicios existentes de Cirios-App y sus controles de acceso.
- Representación adaptativa de resultados, estados vacíos y errores.
- Selección contextual para ver información básica de un pedido.

## Impact
Interfaz web y adaptador de consulta; sin cambios previstos al checkout ni escrituras sobre pedidos. Los endpoints concretos deben verificarse antes de implementar.

## Out of scope
Edición/cancelación, voz, nuevo framework de agentes o duplicación de backend.

## Related
[Especificación funcional](../../../specifications/IBUI-004-CONSULTAR-PEDIDOS.md)
