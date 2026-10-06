# Build Plan

## Objective

Reach a stable, judge-visible **Hands-off Issue → production generation** loop early, then spend remaining time strengthening lifecycle coverage and presentation.

Deadline: **2026-10-27 13:00 UTC / 22:00 JST**.

Do not treat October 27 as a build day. Target submission-ready state by October 26.

## Phase 0 — Access and canonical repository

### Tasks

- complete GitLab Transcend hackathon contributor onboarding
- create/use the provided public GitLab project
- ensure MIT license is visible
- move/import the project from this bootstrap GitHub repository
- verify GitLab Duo Agent Platform access
- verify runners/CI can execute
- read current official Agent Platform docs
- decide exact supported agent/flow/trigger mechanisms

### Acceptance

- public GitLab URL exists
- a trivial pipeline passes
- a Duo agent/flow can access the project
- no paid GitLab upgrade is required beyond hackathon access

### Target

October 7–9.

## Phase 1 — Build the phenotype

### Tasks

- scaffold minimal TypeScript app
- render deterministic habitat
- add current generation badge
- add lineage view
- add `/healthz`
- add `/api/generation`
- create seed generation `gen-0000`
- establish `world/` and `lineage/` data

### Acceptance

- local app is visually understandable
- changing a trait creates an obvious visible change
- generation API is deterministic
- unit tests pass

### Target

October 9–11.

## Phase 2 — Make generations testable

### Tasks

- add fast unit tests
- add one browser test
- add generation-schema validation
- add scripts for candidate generation metadata
- add a deliberately invalid test case

### Acceptance

- a good mutation can prove itself
- a bad mutation fails before deployment
- tests run quickly enough for repeated autonomous use

### Target

October 10–12.

## Phase 3 — Build the lifecycle pipeline

### Tasks

Create GitLab CI stages/jobs covering as much as possible:

- verify
- security
- governance
- package
- release preparation
- deploy
- production smoke

Add policy checks for protected invariants and cost constraints.

### Acceptance

- ordinary MR pipeline is green
- a protected-invariant violation is blocked
- a failing test is blocked
- visible CI history exists

### Target

October 11–14.

## Phase 4 — Agentic growth flow

### Tasks

Build the GitLab Duo agent/flow path:

1. trigger from growth Issue
2. plan
3. implement
4. test locally/in flow where appropriate
5. open MR
6. respond to failures
7. complete when CI gates pass

Use `AGENTS.md` as shared instruction context.

### Acceptance

- one plain-language Issue results in a real MR
- requested behavior and test are implemented
- no manual coding is required

### Target

October 13–17.

## Phase 5 — Hands-off merge and generation release

### Tasks

- configure autonomous merge when gates pass
- assign next generation safely
- create generation manifest
- create tag/release
- prevent pipeline recursion
- post links back to Issue

### Acceptance

- Issue → merged generation requires no human approval
- generation numbering cannot collide under normal demo use
- audit trail is complete

### Target

October 16–19.

## Phase 6 — Google Cloud production loop

### Tasks

- create minimal GCP project/resources
- configure Artifact Registry
- configure Cloud Run
- configure keyless auth if practical
- deploy from GitLab CI
- implement post-deploy health/generation check
- implement rollback to previous Cloud Run revision
- implement registry cleanup strategy
- verify cost guardrails

### Acceptance

- public Cloud Run URL works
- new generation deploys automatically
- smoke test proves expected generation
- forced bad production validation rolls back
- no forbidden/always-on resources exist

### Target

October 18–20.

## Phase 7 — Complete all nine stages

Maintain a living evidence table.

### plan

Evidence: Issue + agent plan/session.

### create

Evidence: agent-authored MR.

### verify

Evidence: tests/type/build jobs.

### package

Evidence: container build/image.

### secure

Evidence: GitLab-supported scan results.

### release

Evidence: generation tag/release.

### configure

Evidence: deployment config + Cloud Run environment.

### monitor

Evidence: production health/smoke job.

### govern

Evidence: policy/cost guard job + protected rules.

### Acceptance

Each stage has:

- real technical behavior
- a visible GitLab artifact
- a one-sentence explanation usable in the demo/submission

### Target

October 20–22.

## Phase 8 — Reliability campaign

Run at least three scenarios.

### Scenario A — successful visual mutation

Example:

> Add rare bioluminescent flowers visible only at night.

Expected: hands-off production generation.

### Scenario B — second distinct successful mutation

Example:

> Add a nocturnal creature that hides by day.

Expected: next hands-off production generation, proving repeatability.

### Scenario C — non-viable mutation

Intentionally cause a test/policy/production-health failure.

Expected: blocked release or automatic rollback with visible report.

### Acceptance

- two consecutive successful fresh-Issue runs
- one safe failure
- no human intervention after trigger
- no leaked secrets
- total runtime is demo-friendly

### Target

October 21–23.

## Phase 9 — Submission engineering

### Deliverables

- architecture diagram
- lifecycle evidence table
- polished README
- exact setup/run instructions
- project description
- concise problem/impact explanation
- screenshots if useful
- demo script
- recorded <3 minute public/unlisted YouTube video
- Devpost submission draft
- Google Cloud live URL
- final license check

### Target

October 23–26.

## Phase 10 — Freeze

Before deadline:

- re-check official rules
- verify public GitLab access
- verify live Cloud Run app
- verify CI history is visible
- verify video access
- verify MIT license
- verify all submission URLs
- verify Artifact Registry size
- verify cost config
- make final submission
- freeze submitted repository through judging as required

Target: October 26.

October 27 is reserve only.

## Prioritization rule

If time becomes constrained, preserve in this order:

1. real GitLab Duo automation
2. hands-off end-to-end loop
3. safe failure/rollback
4. all-nine-stage visible evidence
5. Google Cloud deployment bonus
6. clear three-minute presentation
7. visual polish
8. branching lineage
9. sustainability prize work
10. everything else

## “Do not polish a broken organism” rule

No major visual-polish work until:

- Issue → MR works
- CI gates work
- autonomous merge works
- production deploy works
- post-deploy verification works

The pipeline is the product.
