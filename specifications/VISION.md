# Intent-Based-UI (IBUI)

**Status:** Concept and name approved; exploration and prototyping pending.

## Vision

A radically minimal interface that begins with what a person wants to accomplish rather than a menu of modules. The initial view is nearly blank, with a central input for expressing intent. The interface progressively reveals only the elements needed to complete the task.

## Principles

- **Intent first, not voice only.** People may express intent through text, voice, or visual controls.
- **Progressive disclosure.** Discreet suggestions first; fields, results, and actions appear only as needed.
- **Contextual capability.** Shoppers and workshop operators share an interaction philosophy, not identical verbs or permissions.
- **Low friction.** Minimize navigation and cognitive load without sacrificing discoverability, accessibility, or error recovery.
- **Technology independence.** Avoid coupling the interaction model to Alexa, any single AI provider, or one backend.
- **Real validation.** Test against actual work with Jenny and shoppers before deciding on a generalized architecture.

## First pilot: Cirios-App

Two representative tasks:

1. **Taller:** `Crear pedido para Marvin`.
2. **Tienda:** `Buscar cirio pascual`.

Compare task success, steps, time, errors, and perceived ease with the existing Cirios-App interface.

## Boundaries

IBUI is now an **independent project**. [Fabrícamelo](https://github.com/cramoscr/fabricamelo) and [Cirios-App](https://github.com/cramoscr/cirios-app) are related projects; Cirios-App is the first testbed. The previously approved [Cirios-App ADR-UX-001](https://github.com/cramoscr/cirios-app/blob/main/docs/ADR-UX-001-TIENDA-TALLER.md) remains relevant: Tienda and Taller are separate experiences with a common intent-first philosophy.

The pilot should remain isolated from FAB-011 and production. Do not assume a generic framework, frontend rewrite, database migration, or production deployment. A universal transaction protocol is a separate research question, not an established IBUI feature.

## Next steps

Review Cirios-App branches and FAB-011 status; build a small prototype; validate with real tasks; then decide whether to adopt, revise, or discard the concept.
