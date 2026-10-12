# IBUI-002 — Adaptive Product Catalog

**Status:** Approved for implementation planning (2026-10-11). Not implemented or deployed.

## Goal
Display real products from the existing Cirios-App catalog in Intent-Based-UI, choosing the presentation according to the user's intent. Keep the first mobile-friendly prototype small, simple, and visually consistent with IBUI-001.

## Approved UX decision: Option C — Adaptive
The UI does not force a permanent catalog screen or a single representation.

| Example intent | Presentation |
| --- | --- |
| “Muéstrame los cirios pascuales” | Visual product cards |
| “Lista todos los productos” | Compact list |
| “Busca el cirio 10 × 80” | Individual product detail |
| “Compara estos tres cirios” | Comparison table |

- Intent-first, progressive disclosure, mobile-first.
- Show only the relevant information and actions; keep interaction in the same conversational context.
- Use actual product records and prices where available; never treat mockup images or placeholder prices as production data.
- Follow-up actions (e.g. adding a product to an order) are illustrative future interactions, **not** scope commitments for IBUI-002.

## Technical approach (approved in principle, pending repository inspection)
1. Reuse the existing Intent-Based-UI frontend and its minimal visual language.
2. Inspect the existing Cirios-App catalog API and its actual JSON contract, access control and image fields before coding.
3. Separate responsibilities conceptually:
   - **Intent Resolver:** interpret what the user is asking and the requested presentation.
   - **UI Renderer:** render the result as cards, list, detail or comparison.
4. Start with deterministic rules; no generative AI dependency is needed for this milestone.
5. Consume the existing catalog API and real Firestore-backed data, without changing the backend unless inspection reveals a necessary compatibility fix.
6. Prototype and test on a mobile device, isolated from production and FAB-011.

## Explicit exclusions
- Shopping cart and checkout.
- Product maintenance.
- New business capabilities or database redesign.
- Generic framework extraction or unnecessary dependencies.
- Production deployment without separate review/approval.

## Next step
Review the code structure in `cramoscr/intent-based-ui` and the catalog API contract in `cramoscr/cirios-app`; then define a small implementation and validation checklist. The GitHub connection was verified on 2026-10-11; earlier code-search failure was caused by an incorrect tool argument, not permissions.

## Acceptance criteria (proposed for implementation)
- User can request a product category and see matching real products as cards on mobile.
- User can request a broad listing and see a compact list.
- Exact-product and comparison intents select appropriate views when the required data is available.
- Empty, loading, and error states are understandable.
- No regression to IBUI-001; no modifications to Cirios-App production.
