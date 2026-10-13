# IBUI-004 — Security review

**Date:** 2026-10-13
**Status:** Remediation in branch; not yet deployed or verified.

## Finding
GitGuardian detected a Google API key hardcoded in `software/app/src/App.jsx`. This is a Firebase web API key, which is ordinarily a public application identifier, not an administrative service-account credential. Nonetheless it should be restricted to required APIs and application origins.

## Changes
- Removed hardcoded key references in both login paths.
- The app now uses `VITE_FIREBASE_API_KEY`.
- Hosting workflow injects it from GitHub Actions repository variable `IBUI_FIREBASE_WEB_API_KEY` and fails the build if missing.
- Local developers can use an ignored `.env.local` based on `.env.example`.

## Required before deployment
1. Set `IBUI_FIREBASE_WEB_API_KEY` in GitHub repository Actions variables with the actual Firebase web key (not a service-account key).
2. Review API restrictions in Google Cloud Console (Identity Toolkit and other Firebase-required APIs) and HTTP referrer restrictions for both IBUI hosting domains. Test login after restriction.
3. Review GitGuardian finding and classify correctly after validation. The historical commit still contains the key; do not rewrite shared history without planning.
4. Confirm endpoint authentication/authorization, CORS, error responses, build and integration tests.
5. Deploy only with explicit user authorization.

**Note:** Vite `VITE_*` values are embedded in public client bundles. This is configuration hygiene, not a secrecy boundary. Never put private tokens or service-account keys there.
