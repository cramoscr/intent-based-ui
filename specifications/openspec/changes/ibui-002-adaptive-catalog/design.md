# Design: Adaptive Catalog

## Context
IBUI starts from user intent, not permanent modules or menus. IBUI-001 established a minimal mobile-friendly prototype. Cirios-App is the first testbed.

## Decisions
1. **Intent Resolver:** map a request to a catalog query and view type, initially via deterministic rules; no generative AI dependency.
2. **UI Renderer:** render data independent of intent parsing.
3. **Views:** cards for exploratory category requests, compact list for broad listings, single-product detail for exact lookup, and comparison for multiple explicitly selected products.
4. **Data:** use the existing catalog API and its real Firestore-backed records; inspect response schema, permissions, CORS and available image/price fields before choosing concrete component props.
5. **Interaction:** keep the UI progressive, mobile-first and consistent with IBUI-001.

## Open questions (verify in code)
- Current frontend framework and component organization.
- API URL, authentication, response JSON and pagination/filter behavior.
- Image availability and fallbacks.
- What product attributes permit useful comparisons.

## Boundaries
No cart, product editing, checkout, backend redesign, or production deployment in this change.

## Verified source findings (2026-10-11)

- `cirios-app/functions/src/index.ts` defines `catalogApi` as an IAM-restricted GET Cloud Function. It returns `{ products: [{ id, name, category, price }] }`; no image URL is currently returned.
- `cirios-app/functions/src/getPriceList.ts` obtains active products only (`isAvailable === "Y"`), joins category names and sorts by category/name.
- `cirios-app/functions/src/firestoreApi.ts` defines a richer internal Product model with `imageurl`, `extraImages`, `description`, `materials`, and `categoryId`. These are NOT currently exposed by catalogApi.
- The existing API is restricted to a service-account invoker, so direct unauthenticated browser requests are not a viable assumed integration. Review secure proxy/auth architecture before wiring IBUI frontend.
- Repository `software/README.md` still describes pre-prototype status. The published IBUI-001 frontend source location remains to be identified and verified.

## Implementation implications

- Begin with image-free, typography-first cards, or separately approve a minimal API contract extension for image URLs after reviewing image hosting/security.
- Use only fields actually returned by the API; do not invent comparison attributes.
- Do not loosen IAM or embed service-account credentials in browser code.

## Decision — text-first cards with future image slot (2026-10-11)

- Defer adding image fields to `catalogApi`. Do not change the API contract in IBUI-002.
- Render catalog product name, category and price using real API fields when integration is available.
- Reserve a fixed image slot in product cards and show a local dummy/placeholder visual for now; label it as a placeholder rather than a real product photo.
- Keep the card component ready to accept an optional future `imageUrl` without layout redesign. Avoid assuming the current API returns that field.
- Do not use fabricated product records/prices as if they were live data.
- Actual source code for the deployed IBUI-001 application has not yet been located in this repository; verify it before implementation.
