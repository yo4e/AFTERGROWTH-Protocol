# Remaining acceptance and dependencies

Use this map with BUILD_PLAN.md and AUTONOMY_LOOP.md. Local prototypes cannot close external acceptance criteria.

| Phase | Remaining acceptance | Immediate dependency / authority |
|---|---|---|
| 0 | Canonical public GitLab, actual pipeline, Duo project access | Participation approved October 7; group/Showcase allocated; actual runner/Duo/canonical target verification; existing authenticated execution path; approve import/public visibility |
| 1–2 | Reviewed seed and browser/schema/safe rejection | Implemented locally and covered by bootstrap CI; merge/review of initial protected governance is owner gate |
| 3 | GitLab server lint, runner/security report support, ordinary MR green and rejection history | Phase 0 authenticated target and runner details. Bootstrap free GitHub CI supplements OCI/security checks but does not create GitLab evidence |
| 4 | Real Issue → plan → code/test → normal MR | Phase 0 and approved project-scoped Duo identity/trigger. YAML/tool names must be validated on target version before enabling |
| 5 | Serialized generation allocation, merged manifest/tag/release and Issue report | Verified target MR/CI semantics and explicit automatic merge/release authority. Pure candidate/release/report helpers tested; cannot claim concurrent remote Git allocation from a local increment helper |
| 6 | Registry, WIF, candidate revision, promotion, rollback, cleanup and live cost checks | Approved dedicated GCP project/billing, remaining shared free allowances, least-privilege identity and deploy/public access authority. Configuration and orchestration helpers are tested; actual IAM/traffic/registry commands need real scoped targets |
| 7 | Nine durable judge-visible stage artifacts | Real preceding phases; all evidence counters remain 0 until public GitLab artifacts exist |
| 8 | Two fresh successful Issues and one real rejection/rollback | Installed Duo + green GitLab gates + production authority/resources; local fixture and injected rollback are not substitutes |
| 9 | Final recording and submission text/URLs | Owner inspects the actual running app and explicitly says OK before video recording/generation/editing; actual loop evidence and canonical/live URLs. Run instructions/storyboard prepared; no app finish approval yet |
| 10 | Final rules recheck, public/video/live verification, submission and freeze | Actual final assets, account-owner public upload/submission authority, and deadline timing |

Not human-blocked: local lint/test/build, read-only PR review, free secret/SAST/dependency checks, standard public bootstrap CI and OCI scanner on its ephemeral runner. These run before pausing; failed checks are diagnosed and repaired until green. No stored cache/artifacts, paid/larger runner, external image publication or credentials are used.

Human gates come from the user's explicit instruction: credentials/permission expansion, new publication, charge risks, merge/deployment and final submission need existing authorization. They are narrower than the eventual hands-off product objective. A scope/target approval unlocks the corresponding work; no claim that BUILD_PLAN is finished is made while these dependencies remain.
