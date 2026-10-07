# Evidence Ledger

This file is a living index for judge-visible proof.

Do not mark a row complete until the linked evidence actually exists in the public GitLab project.

| Lifecycle stage | Implementation | GitLab evidence | Demo moment | Status |
|---|---|---|---|---|
| plan | growth Issue interpreted by Duo planner/flow | TBD | show Issue → plan | ⬜ |
| create | agent creates branch/MR and implementation | TBD | show MR authored by automation | ⬜ |
| verify | lint/type/unit/browser/build checks | TBD | show green pipeline gates | ⬜ |
| package | OCI image built for generation | TBD | show package/build job | ⬜ |
| secure | supported security/secret/dependency checks | TBD | show security gate | ⬜ |
| release | generation tag/release | TBD | show gen-N release | ⬜ |
| configure | Cloud Run deployment configuration | TBD | show GitLab environment/deploy | ⬜ |
| monitor | post-deploy health + expected-generation check | TBD | show production smoke | ⬜ |
| govern | policy + cost + protected invariant checks | TBD | show governance job | ⬜ |

## Core autonomy evidence

- Initial growth Issue: TBD
- Agent/flow session: TBD
- Merge Request: TBD
- Production pipeline: TBD
- Release/tag: TBD
- Cloud Run URL: TBD
- Final generation report: TBD

## Repeatability evidence

### Successful generation A

TBD.

### Successful generation B

TBD.

## Safe failure evidence

TBD.

Record either:

- candidate blocked before release, or
- failed production validation + automatic ancestor rollback

## Google Cloud bonus evidence

- public Cloud Run URL: TBD
- deployment code in public GitLab repo: TBD
- production deployment job: TBD

## Presentation assets

- architecture diagram: TBD
- final demo script: TBD
- YouTube URL (<3 minutes): TBD
- Devpost URL: TBD

## Evidence rule

Prefer links to durable GitLab artifacts over screenshots.

Screenshots/video are presentation aids; GitLab history is the audit trail.

## Local preparation — 2026-10-07 (not GitLab lifecycle proof)

- `npm run check`: lint/format/typecheck, 14 unit/integration assertions, cost/generation policy, build passed.
- `npm run test:browser`: 2 headless tests passed. Night-flower screenshot is a renderer fixture; it is not a deployed mutation.
- Compiled server + `smoke` identified gen-0000 successfully over loopback.
- `npm audit --audit-level=moderate`: 0 vulnerabilities after repairing the initial vulnerable test dependency.
- Rejection tests cover metadata, missing release checks, wrong production generation, cost expansion and protected/credential-shaped paths.
- Rollback tests prove failed candidate → restore ancestor → revalidate; failed ancestor validation never reports success. These are injected-function tests, not Cloud Run evidence.
- CI and Duo YAML parse locally. Target GitLab validators/runners/flow identity are pending.
- OCI build, SAST/secret/container scanning and actual cloud usage remain unverified.

Official rules/pricing were re-read: [rules](https://gitlab-transcend.devpost.com/rules), [Cloud Run](https://cloud.google.com/run/pricing), [Cloud Build](https://cloud.google.com/build/pricing), [Artifact Registry](https://cloud.google.com/artifact-registry/pricing). Shared billing-account usage must still be checked before provisioning.

Follow-up: authentication-free secret/SAST verification completed (Gitleaks 8.30.1: 17 commits/0 findings; Semgrep 1.179.0: 74 rules/8 files/0 findings/0 errors). See SECURITY_CHECKS.md. Bootstrap GitHub CI added after confirming existing Actions enabled and standard public runner free; its status must be read on the exact latest head. This remains separate from public GitLab lifecycle proof.

Bootstrap CI head `87da9b713fc3a679dfb9a8a89e5e7f0a2d92a252`: [run 37551508587](https://github.com/yo4e/AFTERGROWTH-Protocol/actions/runs/37551508587) concluded success. Passed quality, browser, dependency audit, Gitleaks, Semgrep, OCI build and running-container generation smoke. No image was pushed. Subsequent heads must be verified independently.
