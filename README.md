# AFTERGROWTH Protocol

> **Code is only the beginning. What comes after is growth.**

AFTERGROWTH Protocol is an experimental self-growing software system built for the **GitLab Transcend: Life After Code** hackathon.

Instead of treating a deployed application as a finished artifact, AFTERGROWTH treats software as a lineage. A human expresses intent in a GitLab Issue. GitLab Duo agents and flows plan the mutation, implement it, test it, scan it, package it, release it, deploy it to Google Cloud Run, verify the live result, and report the new generation back to the original Issue.

The application does not merely have versions.

**It has generations.**

## Core idea

AFTERGROWTH reframes ordinary software-development primitives as a living system:

| Software primitive | AFTERGROWTH interpretation |
|---|---|
| GitLab Issue | environmental stimulus / desired mutation |
| Branch | possible lineage |
| Commit | heredity |
| Merge Request | candidate generation |
| CI | survival test |
| Security scan | immune response |
| Container image | packaged organism |
| Release | generation boundary |
| Cloud Run revision | living deployed generation |
| Git history | lineage / fossil record |
| Rollback | restoration of a viable ancestor |

The goal is not to simulate biology literally. The metaphor exists to make autonomous post-code software evolution visible, memorable, and inspectable.

## Hackathon target

**Event:** GitLab Transcend — Life After Code  
**Submission window:** October 5–27, 2026  
**Primary path:** Path A — Start Fresh  
**Primary autonomy target:** Hands-off  
**Additional prize targets:** Most Creative, Most Stages Covered (Path A)  
**Optional stretch target:** Most Environmentally Impactful, only if measurement can be added without distracting from the core build.

Current official requirements and judging strategy are captured in [docs/HACKATHON_STRATEGY.md](docs/HACKATHON_STRATEGY.md).

## The demo loop

The ideal end-to-end demo is deliberately simple:

1. A person creates a GitLab Issue such as:
   > Add bioluminescent flowers that appear after sunset, and record this mutation in the lineage.
2. A GitLab Duo flow interprets the Issue and creates an implementation plan.
3. Agents make the change without human intervention.
4. Tests, security checks, policy checks, and the build run automatically.
5. A Merge Request is created, validated, and merged when all gates pass.
6. A new generation is tagged and deployed to **Google Cloud Run**.
7. A live smoke test verifies the deployment.
8. If validation fails, the system restores the previous viable generation.
9. The original Issue receives a generation report with links to the MR, pipeline, release, and live deployment.
10. The public application visibly changed.

The important spectacle is not “AI wrote code.” It is that **intent travels all the way to a verified production generation without a human in the middle**.

## Product surface

The public application should be a small, visually striking evolving habitat. The first implementation should favor a deterministic, lightweight renderer over a large application framework.

A generation should expose:

- generation number
- mutation title
- short lineage description
- parent generation
- commit / release identity
- visible world change
- timestamp
- health state

The public UI should include a **Lineage** view so judges can see that Git history is part of the product concept rather than invisible infrastructure.

## DevSecOps lifecycle coverage

AFTERGROWTH is designed to touch all nine lifecycle stages named by the hackathon:

| Stage | Planned evidence |
|---|---|
| plan | Issue interpretation + generated mutation plan |
| create | Agent-authored branch / MR |
| verify | unit, integration, and browser/smoke tests |
| package | OCI container image |
| secure | GitLab security/dependency/secret checks where available |
| release | generation tag + release metadata |
| configure | declarative Cloud Run deployment configuration |
| monitor | post-deploy health/smoke verification + rollback path |
| govern | protected core files, cost policy, audit trail, autonomous merge rules |

The visible proof matters as much as the implementation. Pipeline history, agent sessions, MRs, releases, and deployment evidence should remain inspectable for judges.

## Architecture in one sentence

**GitLab is the nervous system; Git history is heredity; Cloud Run is the living environment; the evolving habitat is the visible phenotype.**

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the working design.

## Cost policy

The project is intentionally constrained to the free usage range.

Non-negotiable rules:

- Prefer the hackathon-provided GitLab access.
- Google Cloud deployment must use a scale-to-zero Cloud Run service.
- Keep minimum instances at 0.
- Avoid databases, load balancers, VPC connectors, static IPs, GPUs, and always-on services.
- Keep Artifact Registry storage below its free allowance by retaining only a small number of images.
- Use Cloud Build only within its free monthly build-minute allowance.
- Do not enable paid extras just for polish.
- If a proposed implementation can plausibly create charges outside the free allowance, stop that implementation and choose a cheaper design.

See [docs/COST_GUARDRAILS.md](docs/COST_GUARDRAILS.md).

## Repository roles

This GitHub repository is the bootstrap/design workspace created during the hackathon period.

For the actual submission, the project must live in a **public GitLab project** with visible CI/CD history. Once GitLab hackathon onboarding is available, GitLab becomes the canonical submission repository. This repository may remain as a planning mirror or origin record.

## Build documents

- [AGENTS.md](AGENTS.md) — autonomous implementation instructions for AI coding agents / dots
- [docs/PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md) — product and experience definition
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — technical design
- [docs/HACKATHON_STRATEGY.md](docs/HACKATHON_STRATEGY.md) — judging, prize, and evidence strategy
- [docs/COST_GUARDRAILS.md](docs/COST_GUARDRAILS.md) — free-tier constraints
- [docs/BUILD_PLAN.md](docs/BUILD_PLAN.md) — implementation order and acceptance gates
- [docs/REFERENCES.md](docs/REFERENCES.md) — conceptual references, design implications, and explicit scope boundaries

## Design principles

1. **Autonomy must be real.** The demo should not hide manual steps.
2. **Every autonomous action should leave evidence.** A judge should be able to inspect what happened.
3. **Reversibility beats bravado.** Autonomous production changes need rollback.
4. **The metaphor must serve the engineering.** The “living software” idea should make the workflow easier to understand, not cover up weak implementation.
5. **Small app, deep lifecycle.** Spend complexity on agentic DevSecOps, not on a giant frontend.
6. **Free by architecture.** Cost safety is part of the system design.
7. **Three minutes is the real interface.** The project must be understandable and impressive in a sub-three-minute video.

## Status

Planning / bootstrap phase. No implementation should be considered stable until the complete hands-off loop has run successfully at least twice from fresh Issues.

---

MIT License. See [LICENSE](LICENSE).

## Local bootstrap (implementation branch)

Requires Node.js 22+.

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:browser
npm run dev
```

Open http://localhost:8080. For the compiled server: `npm run build && npm start`.
The deterministic hour slider changes day/night. Set `world/current.json` trait
`lumenFlowers` to true to make five flowers visible only before 06:00 or after 18:00.
The seed has production checks marked pending; a healthy local HTTP service is not
proof of a production generation. No external merge/deploy automation is enabled.

`npm run policy` checks generation consistency and the exact cost-safe footprint.
The MR protected-files gate requires GitLab's immutable diff base SHA and refuses
governance changes for human review. Initial bootstrap governance needs review;
this branch is not expected to bypass its own protection when first imported.

See [access gates](docs/ACCESS_GATES.md), [Duo setup candidate](docs/DUO_SETUP.md)
and [evidence ledger](docs/EVIDENCE.md) for remaining external validation.

Each generation requires a deterministic `acceptance` contract. Production smoke
uses a trusted local manifest to check generation identity and actual world behavior,
including day/night mutation assertions. The two-argument CLI uses the packaged current
manifest; an explicit trusted candidate manifest can be supplied as the third argument.
See [production acceptance](docs/PRODUCTION_ACCEPTANCE.md). Cloud traffic callbacks
remain injected scaffolding until the deployment target and authority are approved.
