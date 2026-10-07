# Project Status

Updated 2026-10-07. Baseline: GitHub main `d740aaa`. Active task: bootstrap Issue #3, with preparatory slices for #4–#8.

## Verified local progress

- Phase 1: TypeScript HTTP app, deterministic SVG habitat/hour slider, gen-0000 badge, lineage, health/generation/world endpoints, Git-versioned world and lineage. Production remains pending.
- Phase 2: generation/world parsing, consistency and ancestor validation; good/night-only mutation tests, deliberately invalid metadata/cost cases, browser rendering fixture. Candidate identity and release eligibility helpers exist; concurrent allocation remains unverified until the canonical release mechanism is configured.
- Phase 3 preparation: lint/format/type/unit/build/browser/audit/policy jobs, Dockerfile, duplicate branch/MR pipeline suppression, protected-file gate using immutable MR base SHA. YAML parsed locally; GitLab server lint, runner/container, security scans and green public history remain unverified.
- Phase 4 preparation: official v1 Duo flow candidate and Issue template. Not installed, target-version validated or run.
- Phase 5/6 preparation: release eligibility, generation report, smoke verification, deploy/rollback argument builders and tested rollback orchestration. No automatic merge, release, image push, IAM grant, cloud provisioning or deploy is wired/enabled.
- Phase 9 preparation: local run instructions, recording plan and precise access/approval checklist.

## Latest verification

Passed: lint, Prettier, TypeScript, 14 Vitest checks across 7 files, 2 headless Playwright checks, generation/cost policy, application build, compiled HTTP server + smoke integration, npm audit (0 vulnerabilities), Git diff whitespace check.

Not run: OCI container build (no Docker/Podman runtime installed), GitLab CI/server-side flow validation, SAST/secret/container scans, real Duo growth, cloud health/rollback, live cost/account usage checks.

Failures diagnosed/repaired: browser globals absent from lint config; initial Vitest dependency vulnerabilities (upgraded to 5.0.3); loopback sandbox restriction (tests rerun with approved local waiting socket); prototype-named static paths and inconsistent manifests hardened during self-review.

## Active gates / next autonomous work

See [ACCESS_GATES.md](ACCESS_GATES.md). Existing Issue #2 is the onboarding blocker; #6 is the GCP gate. No authenticated GitLab/GCP tool, canonical project URL or approved resource identity is available here. Human confirms existing access and the dedicated targets; no credentials should be pasted into chat.

Once GitLab access is available: import the reviewed bootstrap, run server CI lint and pipeline (including OCI), enable/validate the Duo candidate in the allocated project, capture a fresh Issue → tested MR. Select target-supported security checks and runner packaging before wiring release jobs. Bootstrap protected governance files require explicit review. Once production authority/resources are approved: wire serialized generation allocation, release, OIDC deploy, candidate revision verification, traffic promotion, ancestor restoration and Issue report, then run the two-success/one-failure campaign.

## Completion counters

- Successful hands-off production generations: **0 / 2**
- Safe real production failure/rollback demonstrations: **0 / 1** (unit simulation only)
- Lifecycle stages with public GitLab evidence: **0 / 9**
- Public Cloud Run deployment: **no**
- Submission-ready video: **no**

Deadline verified against official rules: October 27, 2026 13:00 UTC / 22:00 JST. Target ready October 26. No submitted version exists yet.
