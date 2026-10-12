# IBUI-003 — Crear pedido para Marvin

**Status:** In progress — specification initiated
**Date:** 2026-10-12

## Goal
Prototype a Taller transaction initiated by the intent `Crear pedido para Marvin`, using progressive disclosure instead of traditional ERP navigation.

## Proposed interaction
1. Operator enters `Crear pedido para Marvin` on the intent-first home.
2. System resolves the customer through the existing customer resolver. If ambiguous, ask the operator to select the correct customer.
3. System requests a product; operator can type a natural phrase such as `Cirio pascual 10 x 80`.
4. System resolves the product through the existing catalog API and asks for clarification when needed.
5. System collects quantity (default of one only if clearly shown and editable) and optionally committed date.
6. System displays a compact order summary and requires explicit confirmation before persisting.
7. On success, show a clear receipt/identifier and offer the next action. On failure, preserve the draft and provide recovery.

## UX rules
- Keep the home free of traditional menus and product cards.
- Reveal a contextual order summary only after the intent is recognized.
- Support text first; do not depend on Alexa or voice recognition.
- Use the existing Cirios-App visual language.
- No write operation before explicit confirmation.
- Prevent accidental duplicate submission.

## Integration boundaries
- Reuse existing customer, catalog and order endpoints where appropriate, after inspecting their actual contracts.
- Do not modify the backend, production orders, or FAB-011 as part of the initial prototype.
- Do not introduce a generalized workflow engine or new persistence layer.

## Acceptance criteria
- [ ] Customer resolved or ambiguity handled.
- [ ] Product resolved or ambiguity handled.
- [ ] Quantity and committed date can be reviewed/edited.
- [ ] Explicit confirmation before order creation.
- [ ] Successful transaction and failure states handled.
- [ ] Mobile interaction verified.
- [ ] Existing backend contracts and deployment impact reviewed before implementation.

## Next
Inspect current frontend structure and existing order API contract, then implement the smallest viable flow in isolation.