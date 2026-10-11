# Architecture — preliminary boundaries

IBUI focuses on the user-facing interaction: capture an intent, discover relevant actions, request missing inputs, present an appropriate UI, and hand off an authorized operation to the host application.

The host remains responsible for authentication, authorization, business rules, persistence, and transactional integrity. No backend replacement, Firestore migration, generic AI engine, or universal transaction transport is assumed.

The separate idea of a universal transactional protocol remains outside this experiment until independently scoped.
