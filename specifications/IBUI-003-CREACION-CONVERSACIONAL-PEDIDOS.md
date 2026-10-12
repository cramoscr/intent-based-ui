# IBUI-003 — Creación conversacional de pedidos

**Estado:** Iniciado — especificación preliminar, pendiente de validación.
**Fecha:** 2026-10-12

## Objetivo
Crear pedidos mediante conversación escrita, con representación visual progresiva del pedido en construcción. La interacción seguirá el comportamiento funcional ya probado en Alexa, sin reproducir un formulario tradicional.

## Principios aprobados
- Entrada por texto en esta fase; voz después.
- Conversación equivalente al flujo de Alexa.
- Visualización persistente de cliente, productos y datos de entrega conforme se recopilan.
- Evitar wizard y formularios estáticos.
- Reutilizar servicios existentes de Cirios-App/Fabrícamelo; evitar duplicar lógica de negocio.
- Solicitar confirmación explícita antes de guardar.

## Recorrido propuesto (por validar)
1. Expresar intención: «Crear pedido para Marvin».
2. Resolver cliente, manejar ambigüedad.
3. Agregar uno o más productos mediante texto, resolver producto y cantidad.
4. Solicitar o corregir fecha comprometida si corresponde.
5. Mostrar resumen y pedir confirmación.
6. Persistir mediante servicio existente y mostrar resultado o error recuperable.

## Criterios iniciales de aceptación
- El usuario puede crear un pedido sin navegar a un formulario convencional.
- El estado visual refleja fielmente la conversación y permite identificar datos pendientes.
- Se puede corregir cliente, producto, cantidad o fecha antes de confirmar.
- Ningún pedido se guarda sin confirmación.
- Errores de resolución o persistencia no pierden el borrador.
- La interfaz funciona en móvil.

## Límites
No implementar voz, motor genérico de agentes, protocolo universal de transacciones ni nueva persistencia de borradores en este hito. No modificar producción sin revisión y autorización de publicación.

## Próximos pasos
Inspeccionar implementaciones reales de pedidos y endpoints de Cirios-App y Fabrícamelo, precisar contrato y máquina de estados mínima, desarrollar prototipo aislado y probar recorrido completo antes de publicar.
