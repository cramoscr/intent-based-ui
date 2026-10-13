# IBUI-004 — Technical discovery: Cirios-App order queries

**Date:** 2026-10-13  
**Status:** Source inspection completed; implementation not started.

## Verified source
- `cramoscr/cirios-app/functions/src/index.ts`: `orderListApi` exposes GET and delegates to `listVoiceOrders()`. Its invoker is restricted to the Fabrícamelo service account; it is **not** a public browser API.
- `cramoscr/cirios-app/functions/src/orderList.ts`: `listVoiceOrders()` reads orders and clients, returns `{id,clientName,committedDate,total,productNames}`; filters status `R` or missing historical status, sorts committed dates ascending with null last.
- `ibuiCheckoutApi` in `functions/src/index.ts` uses Firebase ID token verification and requires `users-collection/{uid}.isAdmin === true`. This provides a precedent for authenticated workshop access, not automatic authorization for reads.

## Architectural decision recommended
Reuse `listVoiceOrders()` server-side behind a new IBUI-specific read-only authenticated endpoint. Verify Firebase ID tokens and operator permissions on every request; allowlist IBUI hosting origins, use `Cache-Control: no-store`, and return minimal necessary fields. Never make `orderListApi` public or expose its service-account credentials in the browser.

## Functional gaps to address
- Existing list contains only registered/historical pending orders, not all lifecycle states.
- It does not expose status, order creation timestamp, quantity, line details or customer ID.
- No server-side customer filter, recent-orders sort, or pagination.
- Existing implementation loads the full collection before filtering; evaluate scale and query limits.
- `Ver el primero` can display available summary, but full order details require another verified contract.

## Recommended incremental delivery
1. Implement secure `ibuiOrderQueryApi` GET returning the current summary contract, with server-side auth.
2. Connect IBUI to this endpoint for «mostrar pedidos pendientes» and client-name filtering; bound results and render adaptive cards.
3. Extend the backend contract only as needed for recent orders and basic details.
4. Add tests for 401, 403, 405, CORS, empty results, and checkout regression.
5. Deploy only upon explicit «publica en producción».

## Safety
No code or deployment changes were performed during this discovery.
