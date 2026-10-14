# Highly desirable — ejecución de intenciones completas

- Fecha: 2026-10-13
- Estado: idea / capacidad futura, no implementada ni comprometida para el hito actual
- Deseabilidad: **MUY ALTA**
- Proyecto: Intent-Based-UI / Fabrícamelo

## Visión

El usuario expresa **qué desea conseguir**, sin explicar cómo navegar o llenar formularios. El resolver y el backend realizan el trabajo necesario para ejecutar la operación de negocio de manera correcta.

> «Crea un pedido de un cirio pascual 10 x 80 para Marvin».

Resultado esperado: pedido correctamente registrado, sin preguntas innecesarias.

## Principio

**Intención → Resolución → Operación.**

Solo ante ambigüedad o datos obligatorios faltantes: **Intención → Resolución parcial → Pregunta puntual → Operación**.

El diálogo no es el flujo obligatorio; es un recurso de recuperación. IBUI (texto/visual) y Alexa (voz) son canales de la misma capacidad, no procesos de negocio separados.

## Comportamiento deseado

1. Interpretar la operación «crear pedido» y extraer cliente, producto, dimensiones y cantidad (1 solo si la regla de negocio permite ese valor por defecto).
2. Resolver **identificadores reales** de cliente y producto, sin inventar coincidencias.
3. Recuperar precio y validar reglas del negocio, permisos y campos obligatorios.
4. Preguntar solo si existe ambigüedad, riesgo o información imprescindible; aplicar confirmación cuando las reglas lo exijan.
5. Registrar una sola vez de forma confiable; manejar errores, reintentos y duplicados.
6. Devolver un resultado breve y verificable, con identificación del pedido registrado.

## Criterio de aceptación aspiracional

Dado un cliente Marvin inequívoco y un producto de catálogo «cirio pascual 10 x 80» inequívoco, y siempre que las reglas permitan los datos por defecto, la frase anterior debe crear exactamente un pedido correcto sin diálogo adicional. Verificar en el backend cliente, producto, cantidad, precio y persistencia. Ante coincidencias ambiguas, no registrar hasta desambiguar.

## Implicaciones

- No convertir IBUI en un formulario disfrazado de conversación.
- No obligar a reproducir paso a paso el diálogo actual de Alexa.
- Mantener la validación transaccional en el backend; el resolver interpreta, no inventa datos.
- Medir exactitud, preguntas evitadas, duplicados y errores, antes de declarar la capacidad lograda.

Referencia conceptual evocada en la conversación: la computadora de Jean-Luc Picard, a la que se indica **qué** conseguir, no **cómo** hacerlo. «Keep performing admirably».
