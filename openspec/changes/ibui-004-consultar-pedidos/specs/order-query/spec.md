# Order Query — Requirements

## ADDED Requirements

### Requirement: Intent-based order search
The system SHALL recognize written requests to list pending, recent, or customer-filtered orders and SHALL retrieve actual records from an authorized backend.

#### Scenario: Pending orders
- **WHEN** an authorized user enters «mostrar pedidos pendientes»
- **THEN** the system SHALL fetch and display orders matching the backend's verified pending-state semantics.

#### Scenario: Customer filter
- **WHEN** the user enters «pedidos de Marvin»
- **THEN** the system SHALL filter results by the requested customer within the user's authorized scope.

### Requirement: Adaptive results
The system SHALL display a compact, responsive list or cards, with available order identity, customer, date, state, and product summary.

#### Scenario: No matches
- **WHEN** the backend returns no matching orders
- **THEN** the system SHALL show a clear empty state without fabricating data.

### Requirement: Contextual selection
The system SHALL permit selecting a displayed order to inspect its basic details.

#### Scenario: Select first result
- **WHEN** the user enters «ver el primero» after a results list
- **THEN** the system SHALL show the first currently displayed order's basic details.

### Requirement: Access control and error handling
The system SHALL respect backend authentication and authorization and SHALL distinguish network errors, access denial, and empty results.

#### Scenario: Unauthorized access
- **WHEN** the backend denies a query
- **THEN** the system SHALL not disclose order data and SHALL explain that access is unavailable.

### Requirement: Non-regression
The system SHALL preserve catalog exploration, order creation, and checkout behavior.

#### Scenario: Existing checkout
- **WHEN** a user completes the existing IBUI-003 checkout
- **THEN** order persistence SHALL behave as before.
