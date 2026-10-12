# Roadmap — Intent-Based-UI

**Updated:** 2026-10-12  
**Legend:** 🟩 [x] Done · 🟨 [ ] In progress · ⬜ [ ] Pending

## Foundation
- 🟩 [x] Independent public repository, vision and project structure.
- 🟩 [x] Adopt Cirios-App visual foundations.

## IBUI-001 — Intent-first home
- 🟩 [x] Responsive minimal home, suggestions and favicon.
- 🟩 [x] Published to Firebase Hosting and verified on mobile.
- 🟩 [x] Milestone closed.

## IBUI-002 — Adaptive product catalog
- 🟩 [x] Adaptive catalog: cards for exploration and compact list for many products.
- 🟩 [x] Home retains action suggestion bubbles.
- 🟩 [x] Real catalog integrated.
- 🟩 [x] Product images displayed when available.
- 🟩 [x] Published and verified in production, including browser cache retest.
- 🟩 [x] Milestone closed (user verified 2026-10-12).
- **Note:** Earlier text-only API and image-placeholder decisions were superseded by delivered behavior.

## IBUI-003 — Conversational order creation
- 🟩 [x] Initiate functional specification.
- 🟩 [x] Identify reusable customer resolver and authenticated order client.
- 🟨 [ ] Specify secure web-to-backend integration and conversation state.
- ⬜ [ ] Implement text-based order journey with progressive visual summary.
- ⬜ [ ] Test customer ambiguity, products, quantity, nullable delivery date, correction and confirmation.
- ⬜ [ ] Validate authorization, idempotency and real persistence safely.
- ⬜ [ ] Publish and verify on mobile.
- ⬜ [ ] Close milestone.

## Delivery and validation
- ⬜ [ ] Verify CI/CD pipeline and document rollback.
- ⬜ [ ] Compare Taller and Tienda workflows with real users.
- ⬜ [ ] Decide whether to generalize IBUI based on results.

## Immediate next step
Inspect Alexa conversation transitions and order API security boundary; implement an isolated IBUI-003 prototype before any production publication.

> A completed milestone is not the same as a planned or partially specified milestone.
