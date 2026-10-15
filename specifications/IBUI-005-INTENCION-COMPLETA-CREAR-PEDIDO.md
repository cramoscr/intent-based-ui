# IBUI-005 — Creación de pedido mediante intención completa

**Estado:** Especificado; pendiente de implementación y pruebas  
**Fecha:** 2026-10-14  
**Objetivo temporal:** Entregable previo al domingo 18 de octubre de 2026; después, congelación acordada de nuevas funcionalidades durante 30 días.

## Propósito

Permitir que el operador del taller cree un borrador de pedido a partir de **una única instrucción escrita completa** en Intent-Based-UI (Fabrícamelo), sin recorrer innecesariamente el diálogo paso a paso. La intención debe resolverse contra **clientes y productos reales** de Cirios-App.

Ejemplo principal:

> «Crea un pedido para Marvin con un cirio de 10 x 80».

Resultado interpretado esperado:

| Campo | Valor |
| --- | --- |
| Acción | Crear pedido |
| Cliente mencionado | Marvin |
| Producto mencionado | Cirio 10 × 80 |
| Cantidad | 1 (implícita cuando no se expresa otra cantidad) |

Los nombres del ejemplo son texto de entrada, **no prueban que existan registros coincidentes**.

## Alcance del entregable

1. **Reconocer la intención** de crear un pedido desde el comando textual existente en IBUI.
2. **Extraer entidades**: cliente, producto y cantidad, con variantes sencillas de redacción y medidas como «10 x 80», «10×80».
3. **Resolver y validar** cada entidad con los servicios y catálogos existentes: el cliente debe existir, el producto debe existir y la cantidad debe ser un entero positivo.
4. **Manejar resultados de búsqueda**:
   - Coincidencia única: utilizar identificador y datos reales.
   - Sin coincidencia: informar qué dato no se encontró, sin inventarlo ni sustituirlo silenciosamente.
   - Varias coincidencias: pedir solo la aclaración indispensable.
5. **Construir el borrador** con cliente, producto, cantidad y precio real recuperado del catálogo; mostrarlo en la tarjeta actual de Crear pedido, incluyendo total.
6. **Confirmación**: reutilizar el checkout y la autenticación existentes para registrar el pedido solo cuando el usuario lo confirme. Conservar las reglas existentes para datos adicionales obligatorios, incluida la fecha de compromiso cuando corresponda.

## Comportamiento deseado

**Camino feliz**

- Entrada: «Crea un pedido para Marvin con un cirio de 10 x 80».
- El sistema identifica la acción y las entidades.
- Consulta datos reales de Cirios-App; comprueba coincidencias y cantidad.
- Si todo se resuelve, muestra la tarjeta del pedido listo para revisión y confirmación.
- No pregunta de nuevo por cliente, producto o cantidad ya resueltos.
- No persiste nada antes de la confirmación.

**Cliente no encontrado**

- Informar «No encontré al cliente Marvin» (o equivalente).
- Mantener los demás datos reconocidos sin inventar cliente.

**Producto no encontrado**

- Informar qué producto no pudo resolverse.
- No sustituirlo automáticamente por otro producto parecido.

**Ambigüedad**

- Si existen varios clientes llamados Marvin o varios productos compatibles con «cirio 10 x 80», mostrar opciones reales y solicitar una elección breve.

**Cantidad**

- «Un cirio» y la ausencia de cantidad explícita equivalen a 1.
- «Dos cirios» equivale a 2.
- Rechazar cantidades nulas, negativas o no válidas; no confundir «10 x 80» (dimensiones del producto) con cantidad.

## Criterios de aceptación

- [ ] Una instrucción completa inicia creación de pedido sin wizard obligatorio.
- [ ] Se reconocen acción, cliente, producto y cantidad del ejemplo principal.
- [ ] La resolución utiliza APIs y registros reales, no datos ficticios.
- [ ] Se valida existencia de cliente y producto; se gestiona coincidencia única, ninguna y múltiples coincidencias.
- [ ] Se interpreta 10 × 80 como atributo de producto y no como cantidad.
- [ ] La tarjeta muestra cliente, producto, cantidad, precio y total consistentes con el catálogo.
- [ ] No se hacen preguntas redundantes; solo las necesarias por ambigüedad o reglas de negocio.
- [ ] El pedido solo se registra mediante la confirmación/autenticación ya existentes.
- [ ] No hay regresiones en catálogo, consulta de pedidos ni creación conversacional anterior.
- [ ] Se ejecutan build y pruebas antes de solicitar despliegue.

## Fuera de alcance

- Motor universal de lenguaje natural o protocolo transaccional genérico.
- Carrito de compras para clientes, tienda online o checkout nuevo.
- Reconocimiento por voz y modificaciones a Alexa.
- Alta automática de clientes o productos inexistentes.
- Rediseño de la lista de pedidos.
- Nuevas APIs si las existentes resuelven la necesidad.

## Restricciones de diseño

- **Una instrucción completa → ejecución del análisis sin diálogo innecesario.**
- **Datos reales y reglas existentes → nada de inventar coincidencias.**
- **Tarjeta convencional para revisar y confirmar → conversación solo ante ambigüedad.**
- Mantener la implementación mínima y acotada al entregable previo a la congelación.

## Dependencias por verificar antes de codificar

- Contrato de búsqueda de clientes y tratamiento de nombres duplicados.
- Contrato de catálogo, identificadores, variantes de nombre y precios.
- Estado actual del resolver de intenciones en IBUI y del flujo de checkout.
- Tratamiento actual de fecha de compromiso y campos obligatorios.

## Publicación

La documentación no autoriza despliegue. Publicar código únicamente ante instrucción explícita del usuario: **«publica en producción»**.

## Frontera de identidad y autorización (acuerdo 2026-10-15)

**Principio arquitectónico aprobado:** la interpretación y ejecución de una intención depende de la identidad y el contexto de autorización del actor. Una misma interfaz adaptativa puede servir a visitantes, clientes registrados y administradores, pero sus capacidades y datos accesibles son distintos.

**Modelo:** Intención + Contexto + Identidad + Autorización → Acción.

- **Visitante:** consulta de información pública, como catálogo, sin login obligatorio.
- **Cliente registrado:** operaciones sobre sus propios pedidos y datos, sujeto a permisos verificados en backend. Su experiencia autenticada queda para un entregable posterior.
- **Administrador del taller (Jenny):** puede crear pedidos para clientes y consultar información del taller según los permisos reales. IBUI-005 prioriza este camino.
- **Autenticación progresiva:** solicitar login al llegar a una operación protegida; no forzarlo en la pantalla inicial para intenciones públicas.
- **Autorización en servidor:** nunca confiar en el rol indicado por el navegador, ni exponer el directorio de clientes mediante API pública.
- **Resolución de clientes:** la API existente `customerApi` de Cirios-App está restringida a cuenta de servicio; no debe abrirse al público. Para IBUI-005, evaluar un endpoint de consulta mínima autenticado para administradores, reutilizando la verificación de token y permiso `isAdmin` del checkout/consulta de pedidos. Devolver únicamente los candidatos necesarios para desambiguación.
- **Checkout:** mantener la confirmación explícita y las validaciones de servidor existentes. No crear pedido antes de la confirmación.

**Límite de alcance:** no implementar en IBUI-005 un portal completo de clientes, registro de cuentas ni un sistema genérico de roles. Se conserva una sola interfaz adaptativa y se resuelve primero la operación administrativa.

**Estado de este acuerdo:** arquitectura documentada; implementación, pruebas y despliegue pendientes.
