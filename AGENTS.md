# AGENTS.md — Autonomous Build Contract

This file is the operating contract for AI coding agents, including dots and GitLab Duo agents, working on AFTERGROWTH Protocol.

## Mission

Build a **hackathon-winning, working, inspectable demonstration of hands-off post-code software evolution** for the GitLab Transcend: Life After Code hackathon.

The system must use GitLab Duo Agent Platform features, cover as much of the post-code DevSecOps lifecycle as credibly possible, deploy on Google Cloud for the bonus opportunity, and remain inside free usage ranges.

The project is successful only when the end-to-end loop works in reality. A beautiful architecture diagram with manual gaps is not enough.

## Read first

Before implementing anything substantial, read these files in order:

1. `README.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/ARCHITECTURE.md`
4. `docs/HACKATHON_STRATEGY.md`
5. `docs/COST_GUARDRAILS.md`
6. `docs/BUILD_PLAN.md`
7. `docs/AUTONOMY_LOOP.md`
8. `docs/DOTS_HANDOFF.md`

Treat them as one specification. If they conflict, prefer in this order:

1. current official hackathon rules
2. cost/safety guardrails
3. this AGENTS.md
4. architecture/product docs
5. implementation convenience

## Autonomous operating mode

Default to action, not discussion.

**Persistent execution is mandatory.** Follow `docs/AUTONOMY_LOOP.md`: observe → act → verify → diagnose → repair → retry → record → advance. A failed test, build, CI job, or implementation attempt is normally a reason to investigate and loop again, not a reason to notify the human.

You may independently:

- inspect the repository and current issues
- research current official GitLab and Google Cloud documentation
- scaffold and refactor code
- write tests
- create branches and merge requests
- create or update issues
- configure CI/CD files
- create GitLab Duo agents/flows/triggers using currently supported mechanisms
- write deployment scripts and infrastructure configuration
- run local or CI tests
- deploy to already-authorized free-tier-safe Google Cloud resources
- fix failures and retry
- improve documentation
- prepare demo/submission material

Do **not** stop merely because an implementation detail is unspecified. Choose the simplest design that preserves the project concept and judging strength.

Stop and request human involvement only when one of these is true:

- credentials, account approval, or an interactive authorization step is required and unavailable
- an action may create a charge outside the documented free usage range
- an irreversible external action would affect resources unrelated to this project
- official rules are ambiguous in a way that could threaten submission eligibility
- a requested permission cannot legitimately be obtained by the agent

When blocked, leave the repository in a clean state and create/update a clearly named blocker issue with exact next steps. Then continue every other unblocked workstream. A human-only gate blocks a branch of work, not the whole project.

## Hackathon posture

Target:

- **Path A: Start Fresh**
- **Hands-off autonomy**
- **Most Creative**
- **Most Stages Covered (Path A)**
- Google Cloud deployment bonus
- Most Environmentally Impactful only as a stretch goal if it can be quantified without compromising the core build

Submission-critical requirements include a public GitLab repository, MIT license, visible CI/CD history, and a public demo video under three minutes. Verify current rules before final submission.

## Core product invariant

A human should be able to create one natural-language **growth request** in GitLab and then stop touching the project.

The system should autonomously:

1. interpret intent
2. plan the mutation
3. implement it
4. create/update a Merge Request
5. verify behavior
6. run security/policy gates
7. package the application
8. merge when all gates pass
9. create a new generation
10. deploy to Google Cloud Run
11. validate production
12. roll back automatically if production validation fails
13. post a concise generation report to the original Issue

If manual approval is necessary for an intermediate step, the build is not yet Hands-off.

## Protected invariants

Agents must not casually modify these principles:

- The project name is **AFTERGROWTH Protocol**.
- The tagline concept is “Code is only the beginning. What comes after is growth.”
- Git history is treated as lineage/heredity.
- The public application must visibly expose generation/lineage information.
- Production mutations must be testable and reversible.
- The cloud architecture must remain scale-to-zero and free-tier-oriented.
- Secrets must never be committed.
- No paid service may be introduced merely for convenience.
- The final GitLab project must remain public through judging.
- The submitted version must be frozen after the hackathon deadline according to the official rules.

Changes to governance, cost guardrails, or autonomous merge criteria should be explicit and auditable.

## Preferred implementation shape

Prefer a small, deterministic application with deep lifecycle automation.

Unless there is a strong blocker, prefer:

- TypeScript
- current Node.js LTS
- a lightweight browser UI
- a minimal HTTP server suitable for Cloud Run
- declarative world/generation data stored in Git
- Vitest or equivalent for fast unit tests
- Playwright or equivalent for one or two decisive end-to-end checks
- OCI container packaging
- Google Cloud Run
- Google Artifact Registry
- Google Cloud Build only when useful and within free allowances

Avoid a large framework if a smaller implementation makes the autonomous loop easier to trust and demonstrate.

## Repository design

Expected conceptual areas:

- `src/` — application code
- `world/` — declarative phenotype/world state
- `lineage/` — generation records
- `tests/` — unit/integration/browser checks
- `scripts/` — release, smoke, rollback, and cost-safety helpers
- `.gitlab-ci.yml` — lifecycle pipeline
- `.gitlab/` — GitLab-specific agent/flow/governance configuration, using current official formats
- `docs/` — architecture, evidence, demo, submission documentation

Do not invent GitLab configuration formats from memory. Check current GitLab documentation at implementation time.

## Generation model

Each successful autonomous production mutation must produce a durable generation identity such as:

- `gen-0001`
- `gen-0002`
- `gen-0003`

A generation record should include at least:

- generation ID
- parent generation
- source Issue
- Merge Request
- commit SHA
- mutation summary
- tests/security results
- deployment revision
- health result
- timestamp

Generation metadata should be machine-readable and visible in the application.

## Change discipline

For each meaningful slice:

1. start from an Issue or explicit task
2. make the smallest coherent change
3. add or update tests
4. run the relevant checks
5. document observable behavior
6. commit with a meaningful message
7. leave the repository usable

Prefer several coherent, reviewable generations over one giant final dump.

## Quality gates

A candidate generation must not reach production unless the applicable gates are green:

- formatting/linting
- type checking
- unit tests
- application build
- container build
- core browser/smoke test
- secret detection
- dependency/security checks available in the hackathon environment
- policy check for protected files and cost constraints

After deployment:

- `/healthz` or equivalent must respond successfully
- the generation endpoint must identify the expected generation
- the visible mutation must be testable
- failure must trigger rollback or mark the generation non-viable

## Security

Prefer short-lived/keyless authentication.

For GitLab CI → Google Cloud, prefer Workload Identity Federation / OIDC if practical in the available environment. If a service-account key is temporarily required, keep it only in protected CI variables, never in Git, and document its removal.

Never log credentials or dump environment variables containing secrets.

## Cost safety

`docs/COST_GUARDRAILS.md` is mandatory.

In particular:

- Cloud Run minimum instances = 0
- cap maximum instances aggressively, normally 1 for this demo
- no database unless the architecture is explicitly revised and proven free
- no load balancer, static IP, VPC connector, GPU, or always-on worker
- keep Artifact Registry storage below the free allowance
- prevent runaway agent/pipeline loops
- event-driven execution only
- prefer one compact Cloud Run service

If a cost-safe path and a more impressive paid path exist, choose the cost-safe path.

## Judge-visible evidence

Build for inspectability.

For every lifecycle stage, leave visible evidence in GitLab: Issue, agent session, MR, pipeline job, scan, artifact, release, environment/deployment, health check, policy result, or generation report.

Do not hide the strongest automation in a local script that judges cannot see.

## Presentation constraint

The final story must fit under three minutes.

A strong demo should show:

1. current living generation
2. one natural-language growth Issue
3. agent/flow activity
4. passing lifecycle gates
5. deployment
6. visibly changed application
7. lineage/generation evidence
8. zero human intervention after the initial intent

If a feature does not strengthen that story or a judging criterion, challenge whether it belongs before the deadline.

## Definition of done

The core build is done only when all of the following are true:

- a public GitLab project contains the complete source and MIT license
- at least one GitLab Duo Agent Platform feature is central, not decorative
- one growth request completes hands-off from Issue to verified production
- the loop succeeds twice from two different fresh Issues
- a deliberately failing mutation demonstrates safe rejection or rollback
- all nine lifecycle stages have credible, judge-visible evidence where feasible
- Google Cloud deployment code is in the public GitLab project
- the live Cloud Run URL is publicly reachable
- cost guardrails have been verified
- the sub-three-minute demo can be recorded without staged manual intervention
