# Roadmap — Intent-Based-UI

**Updated:** 2026-10-14 (repository review)  
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
- **Follow-ups (not blockers):** Understand quantities written as words, compact long conversations, support corrections, review Firebase web API key restrictions and authentication UX; assess idempotency for retries.

## IBUI-003.1 — Conversational UX refinement
- 🟩 [x] Approve top-positioned text entry, live order summary and removal of repeated yes/no prompts.
- 🟩 [x] Record UX specification and acceptance criteria.
- 🟨 [ ] Implement and test the refined order-creation dialogue in the web app (verified source still uses the `another` yes/no step).
- 🟩 [x] Position intent entry above order *consultation* results (IBUI-004); does not imply IBUI-003.1 is complete.
- ⬜ [ ] Validate on mobile and publish only on explicit authorization.

## IBUI-004 — Conversational order consultation
- 🟩 [x] Specification, OpenSpec and authorized read-only Cirios-App endpoint implemented.
- 🟩 [x] Authenticated order consultation and customer-name filters via natural language.
- 🟩 [x] Responsive order results, basic selection, compact presentation and delivery-date sorting.
- 🟩 [x] Intent input positioned above order results; internal order IDs hidden.
- 🟩 [x] GitHub Actions manual production deployment succeeded (run 38497355872, commit 15fd0aa, 2026-10-13 Costa Rica).
- 🟩 [x] User verified production behavior, including “dame los pedidos de Marvin”.
- 🟩 [x] Milestone closed after user acceptance (2026-10-13).
- **Deferred, not delivered:** Recent-order intent based on verified creation timestamps; detailed consultation belongs to IBUI-005. Do not imply these are working.

## Intent resolution — next design principle
- 🟩 [x] Document the ambition of completing a commercial intent in one instruction when all required details can be resolved (e.g. «crea un pedido de un cirio pascual 10 x 80 para Marvin»).
- ⬜ [ ] Define minimal resolution, ambiguity, authorization and transaction-confirmation rules before implementation.
- **Principle:** Ask only for missing mandatory information or real ambiguity; do not add conversational steps merely to simulate a wizard. One-shot execution is a documented direction, **not** a deployed capability.

## Future candidates (proposed)
- ⬜ [ ] IBUI-005 — Detailed order consultation.
- ⬜ [ ] IBUI-006 — Modify existing orders.
- ⬜ [ ] IBUI-007 — Customer management by intent.
- ⬜ [ ] IBUI-008 — Progressive voice integration.

## Production deployment control
- 🟩 [x] GitHub Actions supports manual `workflow_dispatch` and a dedicated push trigger limited to `.deploy/production-request.txt`.
- 🟩 [x] Normal code, documentation and workflow commits do **not** trigger production deployment.
- 🟨 [ ] Validate the new marker-based trigger on the next explicitly authorized release; no deployment was requested by the workflow change.
- **Procedure:** After the user explicitly says “publica en producción”, create or update `.deploy/production-request.txt` on `main` with a new release request (date, target commit and reason). That commit alone starts the existing Firebase Hosting CD workflow. Verify GitHub Actions conclusion and deployed behavior before claiming success.
- **Fallback:** Run the same workflow manually through GitHub Actions → Run workflow. Never update the marker without explicit authorization.

## Delivery and validation
- 🟨 [ ] CI/CD production execution verified; document rollback and restore ChatGPT-triggered deployments without automatic releases on ordinary commits.
- ⬜ [ ] Compare Taller and Tienda workflows with real users.
- ⬜ [ ] Decide whether to generalize IBUI based on results.

## Delivery window and temporary development freeze
- 🟨 [ ] Through 2026-10-18: finish only feasible work already underway (especially IBUI-003.1 and deployment controls), without opening new features.
- ⬜ [ ] From 2026-10-19: freeze new software feature development for 30 days; reserve effort for professional-skills improvement and evaluation of remote career opportunities. Maintain critical fixes only if needed.
- ⬜ [ ] Reassess priorities after the freeze; future IBUI-005–008 remain proposals, not active commitments.

## Immediate next step
Prioritize IBUI-003.1 dialogue simplification and verify the explicitly authorized deployment mechanism. Do not claim the revised create-order flow has been implemented until its code and behavior are verified.

> A completed milestone is not the same as a planned or partially specified milestone.
