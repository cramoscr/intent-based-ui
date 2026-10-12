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

## Approved visual reference — contextual catalog cards (2026-10-11)

The user supplied a visual reference for the catalog result screen. Preserve its interaction hierarchy rather than treating it as a new home page:

1. **Home / initial search:** minimal intent input plus small suggestion bubbles/chips; NO product cards.
2. **After a catalog intent:** keep the expressed request visible near the top and introduce results with a short contextual sentence.
3. **Catalog result:** show a responsive grid of product cards, visually aligned with the supplied dark minimal mockup. Each card has a reserved image region (local dummy/placeholder initially), product name, optional dimensions only if reliably available, and actual catalog price.
4. **Continue conversation:** keep the next-intent input available beneath the result rather than navigating into a conventional catalog module.
5. **Adaptive behavior:** broad listings may use compact rows; card grid is for exploratory product/category results.

The mockup's photographed products, dimensions and empty price marks are visual references, not actual catalog records. The existing API only exposes `id`, `name`, `category`, `price`. Do not modify its contract or infer dimensions from product names as structured data without an approved rule.
