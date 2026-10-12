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
