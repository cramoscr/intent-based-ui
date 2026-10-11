# IBUI-001 — Intent Entry & Progressive Disclosure

**Status:** Draft  
**Date:** 2026-10-11  
**Project:** Intent-Based-UI  
**Pilot:** Cirios-App (isolated prototype)

## 1. Purpose
Validate that a user can begin a business task by expressing intent, without first navigating modules, menus or forms.

## 2. Hypothesis
A nearly blank, intent-first entry point with progressive disclosure can reduce unnecessary navigation and perceived effort while preserving clarity, control, accessibility and recovery.

## 3. Scope
- One initial intent entry surface, accepting typed text and offering a microphone affordance only if speech input is available.
- A small number of discoverable task suggestions, without replacing free-form input.
- Two pilot journeys: **Taller** — `Crear pedido para Marvin`; **Tienda** — `Buscar cirio pascual`.
- Incremental clarification and presentation of only relevant controls.
- Explicit review before any business write.
- Independent prototype; no production integration.

## 4. Functional requirements
| ID | Requirement |
| --- | --- |
| FR-01 | Show a minimal starting surface centered on the prompt “¿Qué quieres hacer?” |
| FR-02 | Accept a textual description of the user's intent. |
| FR-03 | Offer optional voice input only where supported; text must remain usable. |
| FR-04 | Display contextual task suggestions that can initiate the same flows as typed intent. |
| FR-05 | Identify the intended task or ask a clarification when ambiguous; never silently assume a destructive or transactional action. |
| FR-06 | Reveal the next necessary field, choice, or result progressively; do not display a complete legacy form by default. |
| FR-07 | Let the user edit prior input, go back, cancel, or restart without losing control. |
| FR-08 | Present a clear confirmation summary before creating an order. |
| FR-09 | Distinguish a successful action from a proposed or simulated action; the initial prototype must label simulated operations. |
| FR-10 | Apply different verbs, context and permissions to Taller and Tienda; do not expose workshop operations to shoppers. |

## 5. Pilot flows

### Journey A — Taller: create order
1. User enters `Crear pedido para Marvin`.
2. Interface recognizes an order-creation intent and customer reference.
3. If the customer is ambiguous or unknown, request clarification.
4. Ask for the product and quantity, one step at a time or together when supplied.
5. Present the order summary and request explicit confirmation.
6. In the prototype, show a **simulated** completion; do not write production data.

### Journey B — Tienda: find product
1. User enters `Buscar cirio pascual`.
2. Interface recognizes product search.
3. Show matching products or a useful empty state.
4. Allow refinement of search terms and inspection of product details.
5. Do not expose Taller-only controls.

## 6. Interaction states
`Idle → IntentCaptured → Interpreting → Clarifying | Presenting → Reviewing (writes only) → SimulatedCompleted`

From each nonterminal state, the user can cancel or revise. Errors must provide an actionable recovery path. No silent state transition may execute a business write.

## 7. Nonfunctional requirements
- **Accessibility:** keyboard and screen-reader support, visible focus, readable contrast; voice never mandatory.
- **Responsiveness:** usable on mobile and desktop.
- **Visual continuity:** reuse Cirios-App's approved typography and visual language for the pilot.
- **Privacy:** do not log customer data or raw voice content by default.
- **Provider independence:** no assumption that Alexa, a particular LLM, or a particular database is required.
- **Separation:** the prototype must not alter Cirios-App production or FAB-011.

## 8. Acceptance criteria
- [ ] Both pilot tasks can be initiated from the same intent entry surface.
- [ ] Text input works without voice.
- [ ] Each flow reveals only controls relevant to its current step.
- [ ] Ambiguity results in clarification, not a guessed write.
- [ ] Order creation requires an explicit review and confirmation.
- [ ] Users can cancel, backtrack and correct an input.
- [ ] Shopper and workshop capabilities remain separated.
- [ ] No production data is modified.
- [ ] Prototype communicates simulated actions accurately.

## 9. Validation
Compare each pilot flow with the current Cirios-App UX using: task completion, number of user actions, elapsed time, errors, and perceived ease. Test with Jenny for Taller and at least one shopper for Tienda. Do not assert superiority before testing.

## 10. Explicit non-goals
No generic UI framework, universal transaction protocol, ERP rewrite, database migration, AI-provider commitment, production deployment or replacement of FAB-011.

## 11. Open decisions
- Should the initial screen have one or multiple suggested intents?
- How is Taller/Tienda context established before intent entry?
- What should the UI do when intent recognition confidence is insufficient?
- Should voice input be included in the first prototype or deferred?

## 12. Next step
Build a low-fidelity interactive prototype of the two flows, then validate with real users before deciding whether to adopt, revise or reject IBUI.
