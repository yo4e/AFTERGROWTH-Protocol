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
