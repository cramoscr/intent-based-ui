# Roadmap

## Delivered milestones

- [x] **IBUI-001 — Minimal intent-first frontend.** React/MUI application deployed to Firebase Hosting with controlled GitHub Actions CI/CD.
- [x] **IBUI-002 — Adaptive real product catalog.** Confirmed working in production on 2026-10-12.
  - [x] Connect to Cirios-App public read-only product catalog API.
  - [x] Replace six demonstration products with active real products.
  - [x] Show product cards with real images when available; graceful fallback when absent.
  - [x] Preserve compact text list when explicitly requested.
  - [x] Support product search and comparison presentations.
  - [x] Verify GitHub Actions deployment status through commit status.
  - [x] User acceptance: confirmed product photographs display when available.
  - [x] Production: https://fabriquemelo-app.web.app

## Next steps

- [ ] **IBUI-003 — To be defined.** Prioritize the next user journey before implementation.
- [ ] Validate UX with Jenny and at least one shopper.
- [ ] Compare steps, comprehension, errors, and perceived effort with the existing UX.
- [ ] Decide adopt / revise / reject before considering reusable framework components.

## Guiding principles

- Intent-first, progressive disclosure, and minimal visual complexity.
- Keep the existing Cirios-App business logic as the source of truth.
- Production deployment only upon explicit authorization: **«publica en producción»**.
