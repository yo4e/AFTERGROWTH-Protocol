# Architecture Draft

## Architectural thesis

AFTERGROWTH Protocol should be technically modest at the application layer and unusually complete at the lifecycle layer.

The winning architecture is not “a complicated app plus some CI.”

It is:

> **A small living phenotype attached to a deep, autonomous, auditable software lifecycle.**

## System boundaries

### GitLab — canonical control plane

During the hackathon, the public GitLab project is the source of truth for:

- Issues / growth requests
- Git history
- branches and Merge Requests
- GitLab Duo agents and flows
- CI/CD
- security/policy evidence
- package/release evidence
- environments/deployments
- audit trail

This GitHub repository is the bootstrap/design origin. After hackathon onboarding, the public GitLab project should become canonical for the submitted build.

### Google Cloud — production habitat

Use Google Cloud only for a very small production surface:

- Cloud Run service
- Artifact Registry
- Cloud Build if chosen for image builds
- minimum IAM necessary for deployment

Avoid adding a database or infrastructure layer unless the core workflow genuinely requires it.

### Browser — phenotype

The public Cloud Run URL renders:

- current habitat
- current generation metadata
- recent lineage
- health-visible state

## Recommended application stack

Preferred starting point:

- TypeScript
- Node.js LTS
- lightweight client renderer
- minimal Node HTTP server
- Vitest for unit tests
- Playwright for one decisive browser test
- Docker/OCI image

A small Vite-based client plus minimal server is acceptable. Avoid framework complexity that does not increase the judging score.

## Repository layout

Conceptual target:

```
.
├── AGENTS.md
├── LICENSE
├── README.md
├── .gitlab-ci.yml
├── .gitlab/
│   ├── duo/
│   │   └── ... current supported agent/flow configuration ...
│   └── issue_templates/
│       └── growth.md
├── src/
│   ├── client/
│   ├── server/
│   └── generation/
├── world/
│   └── current.json
├── lineage/
│   ├── current.json
│   └── generations/
├── tests/
├── scripts/
│   ├── next-generation.*
│   ├── validate-generation.*
│   ├── smoke-production.*
│   ├── rollback.*
│   └── cost-guard.*
├── Dockerfile
└── docs/
```

Actual GitLab Duo file paths and schemas must be verified against current official documentation before implementation.

## End-to-end flow

### 0. Trigger

A human creates a GitLab Issue representing intent.

Recommended trigger mechanism:

- a label such as `growth-request`, or
- a dedicated Issue template, or
- the supported GitLab Duo trigger mechanism available in the hackathon environment

The user’s action ends here for Hands-off mode.

### 1. Plan

A planner agent:

- reads the Issue
- reads `AGENTS.md`
- reads current generation and relevant source
- proposes a mutation plan
- generates acceptance criteria
- identifies test changes
- identifies risk level

The plan should be persisted in an inspectable GitLab location, ideally the Issue/MR or agent session.

### 2. Create

A developer agent:

- creates a branch
- implements the mutation
- updates or adds tests
- updates generation-facing metadata as appropriate
- opens a Merge Request

The generation number should not be finalized too early if the candidate may fail.

### 3. Verify

CI runs:

- formatting/lint
- typecheck
- unit tests
- application build
- focused integration/browser test

The browser test should assert the requested visible behavior when practical.

### 4. Secure

Use the strongest security checks available in the hackathon GitLab environment without introducing paid dependencies.

Desired evidence:

- secret detection
- dependency scanning
- SAST or equivalent supported scan
- container/dependency checks where available

A high/critical result should block autonomous production unless explicitly documented as a false positive under a governance policy.

### 5. Govern

A policy job checks invariants such as:

- protected documentation/guardrails were not silently weakened
- no secret-like files are added
- cost-sensitive infrastructure did not expand
- required generation metadata exists
- only allowed deployment resources are referenced
- autonomous merge criteria are satisfied

Governance must be executable, not merely prose.

### 6. Package

Create a compact OCI image.

Preferred paths, in order of simplicity and visibility:

1. GitLab CI orchestrates Google Cloud Build to build/push the image to Artifact Registry.
2. GitLab CI builds the image and pushes it to Artifact Registry.

Choose the path that is most reliable in the hackathon environment.

Keep images small enough that current + previous images remain safely under the Artifact Registry free storage allowance.

### 7. Release

When all pre-production gates pass:

- merge the MR without human approval in Hands-off mode
- allocate the next generation ID
- write the generation record
- create a Git tag/release such as `gen-0007`
- associate the release with the source Issue/MR

Avoid recursive pipelines. The release mechanism must distinguish candidate pipelines from post-merge generation/release pipelines.

### 8. Configure / deploy

Deploy to Cloud Run.

Target configuration:

- region: a Tier 1 region; `us-central1` is a reasonable default for the hackathon unless there is a stronger reason
- request-based billing
- minimum instances: 0
- maximum instances: 1
- 1 vCPU or less where supported
- 256–512 MiB memory if sufficient
- public unauthenticated service for judges
- no custom domain
- no external load balancer
- no VPC connector

Prefer keyless GitLab CI → Google Cloud authentication via OIDC / Workload Identity Federation when practical.

### 9. Monitor

After deployment, a production verification job should check:

- HTTP health endpoint
- expected generation ID
- one visible or API-observable acceptance condition
- public reachability

This is the minimum monitoring story for the hackathon.

A periodic always-on monitor is unnecessary and would weaken the cost story. Monitoring can be **event-driven at deployment time**.

### 10. Roll back

If production verification fails:

- route traffic back to the previous known-good Cloud Run revision
- mark the candidate generation failed/non-viable
- preserve failure evidence
- report rollback on the original Issue
- do not rewrite Git history to pretend failure did not happen

This is crucial for credibility.

### 11. Report

The original Issue receives a concise machine-generated report containing:

- intended mutation
- generation ID or failed-candidate ID
- MR link
- pipeline link
- tests/security summary
- release/tag link
- Cloud Run URL/revision
- health result
- rollback result if applicable

## GitLab Duo Agent Platform design

Use the current supported combination of:

- custom or foundational agents
- custom/foundational flows
- triggers
- MCP only if it adds real value

A likely division of responsibility:

### Germinator / Planner

Turns a growth Issue into:

- mutation plan
- acceptance criteria
- implementation scope
- risk notes

### Mutator / Developer

Implements and tests the requested change.

### Sentinel / Reviewer

Checks:

- correctness
- regression risk
- protected invariants
- whether tests actually prove the requested mutation

### Steward / Release agent

Coordinates generation identity, release metadata, deployment, smoke verification, and Issue reporting.

Do not create multiple agents merely to increase the count. Each one should make the workflow clearer or safer.

GitLab flows support multi-agent workflows and GitLab recommends `AGENTS.md` as shared context for flows. Use that capability directly.

## Trigger and recursion safety

Autonomous systems easily create loops.

Required protections:

- distinguish human growth Issues from bot-generated reports
- do not trigger new growth runs from the bot’s own comments
- do not start a new mutation from release commits
- serialize production deployment
- use resource groups/locking if needed
- cap automatic retry counts
- fail closed when the same pipeline stage repeatedly fails

## State model

Keep state in Git wherever practical.

Good state:

- `world/current.json`
- generation manifests
- lineage index
- release tags

Avoid relying on mutable external state for core behavior.

Why:

- Git history is central to the concept
- it is free
- it is auditable
- rollback is simpler
- judges can inspect it

## Health endpoints

Recommended:

### `GET /healthz`

Returns a minimal healthy response and current generation.

### `GET /api/generation`

Returns generation metadata sufficient for post-deploy verification.

Example:

```json
{
  "generation": "gen-0007",
  "parent": "gen-0006",
  "status": "healthy"
}
```

Do not expose credentials, internal CI variables, or sensitive deployment metadata.

## Rollback model

Cloud Run creates revisions naturally.

Maintain the previous known-good revision identity during deployment.

On smoke-test failure:

1. mark candidate unhealthy
2. shift traffic back to previous revision
3. verify the old generation responds
4. report outcome
5. leave evidence for debugging

This allows AFTERGROWTH to make a strong claim:

> autonomy does not mean irreversibility.

## Security and credentials

Never commit Google credentials.

Preferred authentication hierarchy:

1. GitLab OIDC + Google Workload Identity Federation
2. protected/masked short-lived CI credential if the environment makes WIF impractical
3. long-lived service-account JSON only as a last resort, stored only as protected CI secret and removed after the event

Grant only permissions required to:

- build/push image
- deploy/update the single Cloud Run service
- read deployment status

## Nine-stage evidence map

| Stage | Technical mechanism | Judge-visible proof |
|---|---|---|
| plan | Duo planner/flow | Issue + agent session/plan |
| create | branch + MR | MR diff |
| verify | tests | CI jobs |
| package | OCI build | pipeline + registry reference |
| secure | scans | GitLab security jobs/results |
| release | generation tag/release | release page |
| configure | Cloud Run deploy config | repo config + environment |
| monitor | smoke/health check | post-deploy job |
| govern | policy/cost/protected-file gates | policy job + audit report |

## Architecture risks

### Risk: agent flow APIs/config evolve

Mitigation: verify current GitLab docs at implementation time. Keep configuration small and documented.

### Risk: full hands-off merge is blocked by project permissions

Mitigation: configure a dedicated automation identity with only required permissions and test early.

### Risk: autonomous code creates flaky visual tests

Mitigation: keep a deterministic renderer and expose machine-readable phenotype/generation state.

### Risk: demo takes too long

Mitigation: keep build/test/deploy path intentionally small. Optimize for a complete mutation in a few minutes, not for a realistic enterprise build.

### Risk: free-tier leakage

Mitigation: enforce `docs/COST_GUARDRAILS.md` in code and infrastructure choices.

## Stretch ideas only after core loop is stable

- alternate lineage branches
- lineage tree visualization
- mutation “fitness score”
- automatic changelog prose
- software-carbon/SCI measurement
- MCP integration for one meaningful external context source

None of these outrank a reliable Hands-off end-to-end loop.
