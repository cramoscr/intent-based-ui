# IBUI-002: Adaptive Product Catalog

## Why
The IBUI pilot needs to display real catalog products without introducing traditional ERP navigation. The presentation should respond to the user's intent.

## What Changes
- Connect the existing IBUI frontend to the existing Cirios-App catalog API, after confirming its actual contract and access restrictions.
- Resolve catalog intents into a presentation mode: cards, compact list, product detail, or comparison.
- Render real results using mobile-first components and clear loading, empty and error states.
- Keep interpretation and rendering responsibilities separate, using simple deterministic rules initially.

## Impact
- Primary project: Intent-Based-UI.
- Related dependency: Cirios-App catalog API (read-only use planned).
- No production deployment, database migration, shopping cart, product maintenance, or generic framework extraction in this change.
- No modification to FAB-011.

## Status
Approved concept; implementation pending source/API inspection.

## Approved UX scope — 2026-10-11

- **Initial home:** minimal intent entry with suggestion bubbles/chips, not product cards.
- **Catalog response:** after a catalog request, keep the request visible, show a brief contextual result message, and render product cards (for exploratory/category queries).
- **Card fields:** product name, category and price from the existing text-only catalog response; a fixed dummy image placeholder prepares the layout for future photographs. Dimensions are optional and must not be fabricated.
- **Conversational continuity:** keep the next-intent input available below the results; do not switch to a traditional catalog screen.
- **Deferred:** extending `catalogApi` with image URLs. No catalog API changes in this milestone.
- **Visual reference:** user-provided dark, minimal mobile mockup showing two Pascual candle cards, search/request at the top and conversational input below. It is a design reference, not real product data.
