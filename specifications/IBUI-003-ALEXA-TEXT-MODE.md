# IBUI-003 — Alexa Text-Mode: estudio técnico y experimento

**Estado:** arquitectura aprobada; implementación pendiente  
**Fecha:** 2026-10-12  
**Fuentes:** `cramoscr/fabricamelo/software/functions/src/alexa.ts`, `software/functions/src/index.ts`, `software/alexa/interaction-model-es-US.json`, FAB-008/008.2/008.3/008.4.

## Hipótesis

IBUI puede operar como canal de texto sobre el flujo conversacional que ya usa Alexa. No debe duplicar resolutores, estado de pedido, reglas comerciales ni persistencia.

## Evidencia comprobada

- `alexaEndpoint` es una HTTPS Function pública que **verifica firma/certificado de Amazon**, identificador de skill, estructura y antigüedad de solicitudes. Un JSON fabricado desde el navegador no es una solicitud Alexa válida.
- `alexa.ts` combina transporte/validación, `ask-sdk-core`, lógica conversacional y servicios de negocio.
- El contexto de pedido viaja en atributos de sesión: `customerId`, `customerName`, `customerCommunity`, `products`, `pendingProduct`, `awaitingAnotherProduct`, `awaitingCommittedDate`, `committedDate`, `awaitingConfirmation`.
- El modelo Alexa contiene `CrearPedidoIntent`, `AgregarProductoIntent`, `AgregarCantidadIntent`, `CapturarFechaEntregaIntent`, `SinFechaEntregaIntent`, `AMAZON.YesIntent` y `AMAZON.NoIntent`.
- `splitLeadingProductQuantity` contempla una cantidad al comienzo de la frase; debe preservarse sin confundir dimensiones de producto como «10 x 80».
- FAB-008 requiere confirmación antes de persistir; Cirios App valida y calcula precios definitivos.

## Diseño candidato

```text
Alexa / voz -> firma Amazon -> Alexa adapter --+
                                               |
IBUI / texto -> autenticación -> Text adapter -+-> diálogo Fabrícamelo
                                                   -> resolutores
                                                   -> orderApi (solo tras confirmar)
                                               |
                               respuesta + estado de pedido
                                               |
                                         proyección IBUI
```

**Importante:** reutilizar semántica de eventos Alexa no equivale a falsificar firmas ni llamar al endpoint de Alexa desde el navegador.

### JSON ilustrativo, NO contrato implementado

```json
{
  "sessionId": "opaque-session-id",
  "message": "crear pedido para Marvin"
}
```

El servidor autentica y autoriza al operador, conserva el estado de sesión de forma confiable, traduce texto a intención/slots y devuelve respuesta conversacional y una proyección **saneada** del borrador para renderizarla. El cliente no controla IDs de clientes/productos, precios ni transiciones autoritativas.

## Riesgos y límites

1. **Interpretación:** Alexa hace reconocimiento de intent/slots antes de invocar Firebase. Texto libre requiere un traductor contextual pequeño; no basta con cambiar `speech` por `text`.
2. **Seguridad:** mantener `alexaEndpoint` intacto y crear una ruta web autenticada; no aceptar atributos de sesión arbitrarios del navegador.
3. **Estado:** los atributos Alexa son transportados por Alexa. IBUI requiere sesión gestionada/validada en servidor, expiración y protección ante concurrencia.
4. **Escrituras:** mantener confirmación explícita, protección frente a doble envío y no reportar éxito sin confirmación del backend.
5. **Fechas:** Alexa resuelve `AMAZON.DATE`; texto requiere parser seguro y confirmación ante ambigüedad, nunca fechas inventadas.
6. **Presentación:** no exponer SSML, directivas Alexa o tokens en el contrato público; devolver texto y proyección visual.

## Experimento mínimo propuesto (sin desplegar)

1. Caracterizar transiciones reales y casos de prueba de `alexa.ts`.
2. Extraer una función conversacional invocable sin HTTP/firma de Amazon, preservando el comportamiento Alexa.
3. Construir traductor textual acotado al pedido: inicio/cliente, producto, cantidad, sí/no, fecha/sin fecha.
4. Ejecutar tests comparativos para la misma secuencia Alexa vs Text-Mode, con servicios simulados y persistencia deshabilitada.
5. Solo después diseñar endpoint autenticado, almacenamiento de sesión y pruebas de confirmación/idempotencia.
6. Publicación en producción únicamente bajo autorización expresa «publica en producción».

## Criterio de decisión

Continuar con Alexa Text-Mode si el experimento reutiliza la máquina existente sin replicar el flujo ni introducir un segundo motor de reglas. Si el SDK impide reutilización razonable, extraer una capa de orquestación compartida en lugar de simular solicitudes firmadas.

## Decisión aprobada — 2026-10-12

**Fabrícamelo es el dueño del motor conversacional multicanal.** Alexa e IBUI son adaptadores de canal, no implementaciones separadas del flujo de negocio. La expresión «Alexa Text-Mode» queda como nombre del experimento inicial, no como arquitectura definitiva.

- **Alexa Adapter:** valida autenticidad Amazon, transforma intents/slots a eventos internos y convierte respuestas a formato Alexa.
- **IBUI Adapter:** autentica al usuario web, interpreta o canaliza texto y proyecta la respuesta como texto + estado visual.
- **Fabrícamelo Engine:** mantiene estados/transiciones de conversación, resoluciones de cliente/producto y orquestación de pedidos; acepta eventos estructurados o texto mediante interpretación compartida.
- **Cirios-App:** autoridad para reglas de persistencia, validación de entidades y precios/totales definitivos.

### Plan incremental aprobado

1. Identificar límites de canal y lógica compartida en `alexa.ts` y caracterizar pruebas actuales.
2. Extraer estado y orquestación del pedido sin cambiar contratos ni comportamiento de Alexa.
3. Adelgazar el endpoint Alexa a un adaptador de firma/SDK/serialización; conservar regresión automatizada.
4. Añadir adaptador IBUI y contrato JSON propio, **no** solicitudes Amazon simuladas ni firmas falsificadas.
5. Validar equivalencia de recorridos, aislamiento de sesiones, autorización, confirmación e idempotencia.
6. Desplegar solamente con instrucción explícita «publica en producción».

**Restricción:** no construir framework genérico, agente IA ni segunda máquina de estados; primero refactorización pequeña y segura.
