# Implementation checklist

## Discovery
- [ ] Inspect IBUI frontend and existing UI conventions.
- [ ] Inspect Cirios-App catalog API endpoint, schema, permissions, CORS, filtering and product images.
- [ ] Confirm available product attributes and edge cases.

## Implementation
- [ ] Implement deterministic catalog intent classification.
- [ ] Add API adapter for real product data.
- [ ] Implement cards, compact list, detail and comparison views as supported by actual data.
- [ ] Add loading, empty, error and missing-image states.
- [ ] Preserve IBUI-001 behavior and mobile layout.

## Validation
- [ ] Verify category exploration: “Muéstrame los cirios pascuales”.
- [ ] Verify broad listing: “Lista todos los productos”.
- [ ] Verify exact lookup: “Busca el cirio 10 × 80”.
- [ ] Verify comparison of three products when fields are available.
- [ ] Test on a mobile phone.
- [ ] Confirm no production or FAB-011 changes.

## Approved scope refinement — 2026-10-11

- [ ] Build text-first product cards using real `id`, `name`, `category`, `price` fields.
- [ ] Reserve a consistent image region and use a local dummy placeholder; support optional future image URL in component design.
- [ ] Confirm the deployed IBUI-001 source location before modifying the frontend.
- [ ] Keep `catalogApi` unchanged; image-field expansion is deferred to a separate future change.

## Approved visual reference — acceptance checks (2026-10-11)

- [ ] Keep home page free of product cards; show suggestion bubbles/chips instead.
- [ ] On category search, retain the user request and show a brief contextual introduction followed by a responsive card grid.
- [ ] Each card has a stable dummy image slot, real product name and real price; display dimensions only when reliably available.
- [ ] Keep the conversational next-action input visible after the results.
- [ ] Validate responsive layout and visual consistency with the user-provided dark mockup.
