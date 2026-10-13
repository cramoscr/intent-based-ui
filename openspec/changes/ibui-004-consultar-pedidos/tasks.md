# Implementation tasks — IBUI-004

## Implemented on feature branches (not production)
- [x] Inspect Cirios-App order read API, registered-status semantics and admin authentication.
- [x] Map pending-order and customer-filter intents to query parameters.
- [x] Implement read-only authenticated query endpoint in Cirios-App.
- [x] Implement authenticated client, responsive summaries and selection by ordinal.
- [x] Handle loading, empty result, authorization failures and invalid selections.
- [x] Remove hardcoded Firebase web API key from current App.jsx source.
- [x] Configure Hosting build to require GitHub variable IBUI_FIREBASE_WEB_API_KEY.

## Still pending
- [ ] Confirm GitHub Actions variable is configured and API key restrictions are appropriate.
- [ ] Run TypeScript backend compilation and Vite frontend build with CI evidence.
- [ ] Verify authentication, 401, 403, CORS and query results against deployed backend.
- [ ] Test customer filters, mobile UX and existing checkout regression.
- [ ] Implement recent-order query using verified creation timestamps (currently intentionally unavailable).
- [ ] Review IBUI-003.1 UX consistency.
- [ ] Obtain explicit deployment authorization before publishing.

**Note:** Source commits do not establish successful build, testing or deployment. Both PRs remain drafts.
