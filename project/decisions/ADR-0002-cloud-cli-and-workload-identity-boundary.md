# ADR-0002 — Separate administrative tooling from CI/CD authentication

**Status:** Accepted  
**Date:** 2026-10-12  
**Scope:** Intent-Based-UI deployment to Firebase / Google Cloud

## Context

IBUI uses GitHub Actions for controlled CI/CD and Firebase Hosting in the Google Cloud project `fabricamelo-lab`. Google Cloud CLI (`gcloud`) may be useful on a developer workstation to inspect and administer IAM, service accounts, Workload Identity Federation (WIF), and infrastructure.

The presence of `gcloud` must not encourage a shortcut that replaces workload identity with personal workstation credentials or downloaded service-account keys.

## Decision

1. **GitHub Actions is the official CI/CD execution environment.** Production deployment is initiated only by the agreed explicit authorization process, expressed as **«publica en producción»**. Ordinary commits must not deploy.
2. **Workload Identity Federation is mandatory for GitHub Actions authentication to Google Cloud.** Use short-lived, federated credentials associated with an appropriately scoped service account.
3. **Firebase CLI performs Firebase Hosting deployments**, scoped to the IBUI target (`hosting:ibui`) in `fabricamelo-lab`. Never deploy the default Hosting site inadvertently.
4. **`gcloud` is permitted as an administrative tool** on a workstation for inspection and management of Google Cloud resources and IAM. Its availability does **not** authorize deploying production from the workstation or substituting interactive user authentication for WIF in CI/CD.
5. **Do not use persistent service-account JSON keys** or personal user credentials in GitHub Actions. Grant only necessary permissions and restrict federated trust to approved repositories and conditions.
6. Any deviation from these boundaries requires an explicit, documented architectural decision before implementation.

## Implementation guardrails

- Keep the workflow authentication step based on `google-github-actions/auth` and WIF provider/service-account configuration.
- Keep the Hosting deploy command explicitly scoped to `hosting:ibui`.
- Before first deployment, verify WIF provider attribute conditions, service-account impersonation authorization, and the service account's Firebase Hosting permissions for this repository.
- Do not treat installing or logging into `gcloud` as proof that CI/CD identity federation works.
- Do not trigger production deployment during infrastructure or authentication setup without explicit authorization.

## Consequences

- Clear separation between developer administration and automated production identity.
- No long-lived Google Cloud credentials in CI/CD.
- Some initial IAM setup and verification remain necessary; `gcloud` can help perform them without changing the deployment architecture.
