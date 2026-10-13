# IBUI-003.1 — Refinamiento UX de creación de pedidos

**Estado:** Aprobado; implementación pendiente.
**Fecha:** 2026-10-13
**Origen:** revisión del flujo IBUI-003 ya desplegado y validado.

## Objetivo
Reducir la fricción de la creación conversacional de pedidos en el canal web, sin modificar la semántica transaccional ni romper la integración existente con Cirios-App.

## Cambios aprobados
- **Entrada arriba:** colocar el control de escritura inmediatamente debajo del encabezado/título de la tarea, antes del diálogo y el resumen; permanece accesible mientras crece el pedido, especialmente en móvil.
- **Sin pregunta repetitiva:** al agregar cada producto, actualizar el resumen visual y esperar una nueva instrucción. No preguntar «¿Desea agregar otro producto?» ni exigir «sí/no».
- **Terminación explícita:** aceptar «terminar pedido», «finalizar pedido» o «revisar pedido» cuando exista al menos un producto. Solo entonces solicitar la fecha de entrega pendiente o permitir «sin fecha», y pasar a revisión.
- **Pedido vivo:** mostrar un resumen único y persistente con cliente, productos/cantidades y fecha; no crear una nueva tarjeta por turno.
- **Diálogo conciso:** usar mensajes breves, contextuales y evitar repetir en texto datos que ya están en el resumen. Mantener un historial accesible si se ofrece compactación visual.
- **Correcciones:** permitir cambiar cliente, cantidades, productos o fecha en el borrador sin reiniciar.
- **Confirmación segura:** conservar revisión y confirmación explícita antes de enviar al backend. No indicar éxito hasta obtener respuesta positiva.

## Recorrido deseado
1. Usuario: «Crear pedido».
2. Sistema: «¿Para quién es el pedido?» (si no lo indicó).
3. Usuario: «Marvin».
4. Sistema: «Indica el primer producto».
5. Usuario: «Cirio pascual 10 x 80».
6. Sistema solicita cantidad solo si no se ha indicado; luego incorpora el producto al pedido visual.
7. Usuario puede escribir otro producto **directamente**, sin responder sí/no.
8. Usuario: «terminar pedido».
9. Sistema solicita fecha solo si hace falta, muestra revisión y espera confirmación.
10. Tras confirmar y autenticar, se registra el pedido y se muestra el resultado del servidor.

## Criterios de aceptación
- [ ] La caja de comandos aparece por encima del diálogo y del resumen en teléfono y escritorio.
- [ ] Después de agregar un producto nunca aparece «¿Desea agregar otro producto?».
- [ ] Puede agregarse un segundo producto escribiéndolo de inmediato.
- [ ] «Terminar pedido» conduce a revisión sin agregar productos adicionales.
- [ ] El borrador visual se actualiza una sola vez por cada instrucción válida.
- [ ] Un error de interpretación conserva el borrador; la orden se guarda únicamente tras confirmación.
- [ ] El flujo existente de catálogo y el checkout IBUI-003 mantienen sus pruebas.
- [ ] Prueba móvil satisfactoria antes de pedir autorización para publicar.

## Límites
No implementar voz, una nueva máquina conversacional, un framework de agentes ni cambiar el API de persistencia por este ajuste.

**Publicación:** requiere instrucción explícita «publica en producción».
