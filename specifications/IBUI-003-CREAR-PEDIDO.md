# IBUI-003 — Crear pedido para Marvin

**Status:** In progress — interaction direction approved
**Date:** 2026-10-12

## Goal
Reproduce the existing Fabrícamelo/Alexa order-creation dialogue in Intent-Based-UI, using typed text instead of speech. The business conversation is the baseline; the UI adds a visual trace of the order being assembled.

## Approved interaction
- Chat-like, single-surface conversation (similar to ChatGPT).
- Typed text for now. Voice is deferred.
- Reuse the existing Alexa dialogue sequence and business behavior; inspect its implementation before coding rather than inventing a separate workflow.
- Show a single evolving visual order summary alongside/in the conversation, not a new card after every turn.
- Ask only for information still missing; let users correct previously entered values.
- Require explicit confirmation before persisting.
- Preserve the established Cirios-App visual language and intent-first home.

## Illustrative journey (validate against actual Alexa implementation)
1. User: `Crear pedido para Marvin`.
2. Resolve customer, clarify if ambiguous, and ask for the product.
3. User supplies product naturally, potentially with quantity embedded.
4. Resolve product and collect any missing quantity or delivery date according to existing behavior.
5. Display and update the visual trace: customer, products/quantities, committed date.
6. Show final summary, confirm, then submit through the existing order mechanism.
7. Handle success, errors, and retries without accidental duplicates.

## Boundaries
- This is **not** a three-screen wizard.
- No microphone, speech-to-text, Alexa UI embedding, new general-purpose conversation engine, or new persistence layer for the initial prototype.
- No production order writes until API contract, authentication, and confirmation semantics have been reviewed.
- Avoid disrupting FAB-011 or the existing Alexa experience.

## Acceptance criteria
- [ ] Actual Alexa order dialogue and API contracts reviewed.
- [ ] Typed conversation matches existing order-flow semantics.
- [ ] One evolving visual order summary, editable without restarting.
- [ ] Customer and product ambiguity handled.
- [ ] Explicit confirmation and duplicate-submit protection.
- [ ] Mobile usability validated.
- [ ] Controlled end-to-end order test and error recovery verified.

## Next
Inspect Fabrícamelo's Alexa dialogue implementation and Cirios-App order endpoints, then build the smallest compatible text-first UI flow.
