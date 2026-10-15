# ADR-0003 — Identidad y autorización contextual en Intent-Based-UI

Fecha: 2026-10-15
Estado: Aprobado

## Decisión

Una intención se interpreta y ejecuta considerando el contexto, la identidad y la autorización del actor:

**Intención + Contexto + Identidad + Autorización → Acción**

Una sola interfaz adaptativa puede servir a visitantes, clientes registrados y administradores; no se crean interfaces separadas por rol.

## Reglas

1. El catálogo público permanece disponible sin login.
2. Se solicita autenticación cuando la intención requiere una operación protegida, no obligatoriamente al entrar a la aplicación.
3. Los permisos se verifican en el backend para cada operación; la interfaz no es una barrera de seguridad.
4. Un cliente autenticado solo accede a recursos propios y acciones permitidas; las capacidades administrativas exigen rol de operador.
5. La conversación solo se usa cuando resuelve ambigüedad o faltan datos indispensables; las tarjetas convencionales permiten revisar y confirmar.
6. Nunca se publican datos privados de clientes como atajo para resolver intenciones.

## Aplicación inmediata: IBUI-005

Primera etapa: Jenny y otros administradores autenticados crean pedidos para clientes existentes, con resolución de clientes reales, catálogo y checkout autenticado. Se solicita confirmación antes de persistir. El portal de clientes registrados queda fuera del alcance de IBUI-005.

## Consecuencias

- Reutilizar Firebase Auth y la verificación administrativa ya existente en Cirios-App.
- Añadir una consulta mínima de clientes autenticada para operadores, sin modificar el endpoint restringido `customerApi`.
- El resolver debe conservar los datos extraídos cuando falta autenticación o hay ambigüedad.
- Mantener el control de autorización en servidor incluso si la UI cambia.

## Implementación

2026-10-15: se incorporó `ibuiCustomerLookupApi` en Cirios-App (commit `e5449d3`); requiere compilación, pruebas y despliegue. La integración del resolver y la UI de IBUI-005 está pendiente.
