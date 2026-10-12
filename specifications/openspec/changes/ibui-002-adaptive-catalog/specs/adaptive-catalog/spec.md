# Adaptive Product Catalog Specification

## ADDED Requirements

### Requirement: Intent-dependent presentation
The system SHALL choose a catalog presentation based on the user's requested task, without requiring navigation to a fixed catalog screen.

#### Scenario: Explore a category
- **WHEN** the user requests “Muéstrame los cirios pascuales”
- **THEN** the system displays matching products as visual cards.

#### Scenario: List many products
- **WHEN** the user requests “Lista todos los productos”
- **THEN** the system displays a compact product list.

#### Scenario: Find one product
- **WHEN** the user requests “Busca el cirio 10 × 80”
- **THEN** the system presents the matching product in a focused detail view, or an understandable not-found state.

#### Scenario: Compare products
- **WHEN** the user requests a comparison of three identified products
- **THEN** the system presents available comparable attributes in a table and clearly indicates missing attributes.

### Requirement: Real catalog integration
The system SHALL retrieve catalog information through the existing Cirios-App catalog API, subject to its verified contract and authorization requirements.

#### Scenario: Catalog request succeeds
- **WHEN** the API returns matching products
- **THEN** the interface renders real product information rather than mock data.

#### Scenario: Catalog request fails
- **WHEN** the API is unavailable or denies the request
- **THEN** the interface communicates the problem without fabricating products.

### Requirement: Progressive mobile UI
The system SHALL preserve the minimal, mobile-first interaction style established in IBUI-001.

#### Scenario: No matching results
- **WHEN** a valid catalog search returns no products
- **THEN** the interface displays a concise empty state and permits another request.
