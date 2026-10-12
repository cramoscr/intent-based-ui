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
