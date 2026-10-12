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
