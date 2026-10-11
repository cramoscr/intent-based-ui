# ADR-001 — Visual Consistency and Theme Independence

- **Status:** Accepted
- **Date:** 2026-10-11
- **Project:** Intent-Based-UI (IBUI)

## Context

IBUI's first usability pilot will be implemented in the context of Cirios-App. A different visual language would introduce a confounding variable when comparing the intent-first interaction against existing workflows.

## Decision

1. **Use Cirios-App's actual visual design as the initial reference:** typography, color palette, spacing, border treatments, and control styling.
2. **Do not reuse its navigation paradigm by default.** IBUI experiments with a nearly blank initial canvas, central intent input, and progressive disclosure of relevant controls and forms.
3. **Separate interaction behavior from visual themes.** IBUI's interaction model must remain independent of the Cirios-App theme so other applications can supply their own appearance.
4. **Verify, don't guess, design tokens.** Inspect Cirios-App's actual styles/components before documenting exact font families, color codes, dimensions, or reusable UI assets. No specific values are approved by this ADR.
5. **Pilot without production changes.** This ADR authorizes documentation and isolated UX experiments, not a Cirios-App rewrite, merge, or deployment.

## Rationale

Consistent visual styling reduces relearning for existing users and lets the pilot focus on the effect of intent-first interaction. Theme independence avoids coupling a reusable IBUI concept to one artisan-shop application.

## Consequences

- Create or document a `Cirios-App` reference theme only after inspecting the source design.
- Keep visual theme definitions separate from the intent interpretation, context/permission handling, and progressive interaction flow.
- Evaluate whether the resulting interface is both familiar and more effective in the two pilot journeys: `Crear pedido para Marvin` (Taller) and `Buscar cirio pascual` (Tienda).

## Related decisions

- [IBUI decision log](README.md)
- [IBUI vision](../../specifications/VISION.md)
- [Cirios-App ADR-UX-001](https://github.com/cramoscr/cirios-app/blob/main/docs/ADR-UX-001-TIENDA-TALLER.md)
