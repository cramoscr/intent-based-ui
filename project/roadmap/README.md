# Roadmap — Intent-Based-UI

**Updated:** 2026-10-13 (production validation)  
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
- 🟨 [ ] Implement and test the refined dialogue in the web app.
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

## Immediate next step
Complete IBUI-003.1 UX refinement or define IBUI-005 detailed consultation. Separately restore ChatGPT-triggered deployments while requiring explicit production authorization.

> A completed milestone is not the same as a planned or partially specified milestone.
