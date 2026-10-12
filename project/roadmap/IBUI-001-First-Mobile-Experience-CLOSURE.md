# IBUI-001 — First Mobile Experience · Cierre del primer entregable

**Fecha:** 2026-10-11  
**Estado:** Hito de experiencia móvil alcanzado y validado visualmente por el usuario  
**Proyecto:** Intent-Based-UI  
**Especificación:** IBUI-001 — Intent Entry & Progressive Disclosure

## Objetivo del entregable

Validar una primera experiencia móvil basada en intenciones, con interfaz mínima, antes de implementar transacciones de negocio.

## Resultado alcanzado

- Prototipo desarrollado con React 18 y Material UI 5.
- Pantalla inicial monocromática con «¿Qué quieres hacer?», entrada de texto y dos sugerencias: «Ver catálogo de productos» y «Crear pedido».
- Aparición secuencial de las dos burbujas; el usuario la vio funcionar, aunque considera mejorable su calidad.
- Compilación local exitosa con Vite: 910 módulos transformados.
- Sitio Firebase Hosting **fabriquemelo-app** creado dentro del proyecto provisional **fabricamelo-lab**.
- Despliegue manual exitoso en https://fabriquemelo-app.web.app.
- Interfaz abierta y valorada positivamente por el usuario desde su teléfono móvil.
- ADR-0001 registra la elección de React, Material UI y Firebase Hosting.

## Evidencia y enlaces

- Sitio publicado: https://fabriquemelo-app.web.app
- Especificación: ../../specifications/IBUI-001-Intent-Entry-Progressive-Disclosure.md
- ADR: ../decisions/ADR-0001-Prototype-Technology-Stack.md
- Código del prototipo: ../../software/app/
- Implementación React: rama `feature/ibui-001-react-mui`, PR #2.

## Alcance no realizado / pendiente

- Las sugerencias solo seleccionan intenciones; no consultan catálogo ni crean pedidos.
- Sin integración con backend, reconocimiento de voz ni operaciones de negocio.
- Sin instalación PWA validada; el usuario accedió por navegador Android.
- La animación funciona, pero su refinamiento queda pospuesto por decisión explícita.
- Favicon monocromático de artesano preparado en la rama de implementación, **aún no desplegado**.
- Automatización CI/CD pendiente: el despliegue de esta entrega fue manual.
- La rama de implementación y el PR #2 aún requieren revisión e integración; no se afirma que estén fusionados.

## Criterio de cierre

Se declara **cerrado el primer entregable visual y móvil**, no la totalidad del alcance funcional de IBUI-001. La experiencia fue publicada y observada en un dispositivo real, con validación positiva del usuario.

## Decisión de continuidad

Conservar el prototipo simple, registrar pendientes y retomar las funcionalidades de negocio en un siguiente hito, sin ampliar esta entrega.
