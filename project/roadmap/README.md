# Roadmap — Intent-Based-UI

**Updated:** 2026-10-13  
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
- 🟩 [x] Text-based conversational order flow and progressive temporary cart.
- 🟩 [x] Product resolution, quantities and optional delivery date.
- 🟩 [x] Explicit checkout confirmation with authenticated Cirios-App backend.
- 🟩 [x] Firebase Hosting and Functions CI/CD passed.
- 🟩 [x] User verified an order reached the backend in production (2026-10-12).
- 🟩 [x] Milestone closed (2026-10-12).
- **Follow-ups (not blockers):** Understand quantities written as words (e.g. «uno»), compact long conversations, support corrections, review Firebase web API key restrictions and authentication UX; assess idempotency for retries.

## IBUI-003.1 — Conversational UX refinement
- 🟩 [x] Approve top-positioned text entry, live order summary and removal of repeated yes/no prompts.
- 🟩 [x] Record UX specification and acceptance criteria.
- 🟨 [ ] Implement and test the refined dialogue in the web app.
- ⬜ [ ] Validate on mobile and publish only on explicit authorization.

## Delivery and validation
- ⬜ [ ] Verify CI/CD pipeline and document rollback.
- ⬜ [ ] Compare Taller and Tienda workflows with real users.
- ⬜ [ ] Decide whether to generalize IBUI based on results.

## Immediate next step
Implement and validate IBUI-003.1 without changing the existing production checkout or deploying without authorization.

> A completed milestone is not the same as a planned or partially specified milestone.
