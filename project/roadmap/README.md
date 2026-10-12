# Roadmap — Intent-Based-UI

**Updated:** 2026-10-11  
**Legend:** ✅ Done · 🔄 In progress / next · ⬜ Pending

## Phase 0 — Foundation

- ✅ Create independent public repository under `cramoscr/intent-based-ui` (Apache-2.0).
- ✅ Record project vision and intent-first UI principles.
- ✅ Establish independent project structure for specifications, software, and project control.
- ✅ Adopt the established Cirios-App visual foundations as a starting point.

## Phase 1 — IBUI-001: Intent-first home (delivered)

- ✅ Specify the minimal home screen with contextual action suggestions.
- ✅ Implement the initial responsive web prototype.
- ✅ Publish the prototype to Firebase Hosting (`fabriquemelo-app` site).
- ✅ Verify the published experience on a mobile phone.
- ✅ Add a workshop-inspired favicon.
- ✅ Close the first deliverable.

## Phase 2 — IBUI-002: Adaptive product catalog (specified; not delivered)

- ✅ Approve intent-adaptive presentation: product cards for browsing and compact lists for larger result sets.
- ✅ Keep the home screen focused on action-suggestion bubbles, not product cards.
- ✅ Specify integration with the existing Cirios-App text-based catalog API.
- ✅ Decide to defer product images in the API; reserve placeholder image areas in product cards.
- ✅ Document the IBUI-002 specification and OpenSpec change.
- ⬜ Implement and integrate the real product catalog.
- ⬜ Validate catalog display, search behaviors, and mobile usability.
- ⬜ Publish and verify IBUI-002 in production.

## Phase 3 — Delivery automation (next priority)

- 🔄 Set up GitHub CI/CD for Intent-Based-UI, following the proven Fabrícamelo publishing workflow.
- ⬜ Validate the deployment pipeline with a controlled change.
- ⬜ Document deployment and rollback steps.

## Phase 4 — Experience validation

- ⬜ Test representative Taller and Tienda journeys with real users, including Jenny and a shopper.
- ⬜ Compare comprehension, steps, errors, and perceived effort against Cirios-App workflows.
- ⬜ Refine progressive disclosure and adaptive presentation from observations.

## Phase 5 — Architecture decision

- ⬜ Decide whether to adopt, revise, or reject the experimental approach based on validation.
- ⬜ Evaluate reusable components and integration boundaries only when justified by evidence.

## Immediate next step

**Implement CI/CD**, then return to IBUI-002 catalog integration. Keep the existing API text-only for this milestone and avoid premature architectural expansion.

> **Status discipline:** ✅ means completed. Approved specifications are not equivalent to implemented or deployed features.
