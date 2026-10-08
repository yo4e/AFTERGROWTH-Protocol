# dots Handoff

## Short instruction to start

If this repository is handed to dots or another autonomous work agent, the human should be able to say:

> Open this repository, read AGENTS.md and all linked design documents, especially docs/AUTONOMY_LOOP.md, then execute BUILD_PLAN.md autonomously toward a submission-ready GitLab Transcend hackathon project. Keep looping through implementation, tests, failures, diagnosis, repairs, and verification without waiting for me. Move to the next unblocked phase automatically. Use GitLab and Google Cloud as specified. Do not exceed free usage ranges. Stop only at genuine human-only gates such as interactive authorization, irreversible approval, unresolved eligibility ambiguity, or cost risk.

That should be enough context to begin.

## Latest owner gates and access state — 2026-10-07

Owner instruction: “プレゼン動画作る前に、いったん仕上がり確認したいな。” Show the actual running app for the owner's finish review and obtain explicit OK before recording, generating or editing the presentation video. Preserve the reviewed build/generation and approval evidence. Existing storyboard drafts may remain; do not treat tests, screenshots, earlier permissions or silence as approval. Continue authorized non-video work independently.

GitLab participation approval arrived on 2026-10-07. Allocated group https://gitlab.com/groups/gitlab-ai-hackathon/transcend-october-2026/43108201 and Showcase https://gitlab.com/gitlab-ai-hackathon/transcend-october-2026/43108201/showcase/-/work_items/1 are known; Developer + AI permissions are described, but actual runners/Duo/canonical import remain unverified. Devpost hackathon Join is complete. Do not ask the owner to repeat either completed application/Join step. Resume authorized canonical project work after verifying allocated-target capabilities and import authority; authentication/public-import/production gates still apply.

## Working goal

Produce a submission capable of competing for:

- Path A — Hands-off
- Most Creative
- Most Stages Covered
- Google Cloud deployment bonus

The build should be optimized for **actual judging evidence**, not merely feature count.

## First actions

1. inspect current repository state and open issues
2. verify the hackathon deadline and current requirements on the official Devpost pages
3. verify current GitLab Duo Agent Platform configuration syntax in official GitLab docs
4. determine whether GitLab hackathon onboarding is complete
5. if not complete, prepare everything possible locally/GitHub-side and leave one precise onboarding blocker
6. once GitLab is available, make the public GitLab project canonical
7. create a working Issue backlog from `docs/BUILD_PLAN.md`
8. implement from the earliest incomplete phase
9. continuously update evidence documentation

## Autonomy rules

`docs/AUTONOMY_LOOP.md` is mandatory. Do not stop after reporting an ordinary error. Diagnose it, repair it, rerun the relevant checks, and continue until acceptance criteria are met or a genuine human-only gate is proven.

Do not ask the human to choose among equivalent implementation details.

Choose.

Examples you may decide without asking:

- file layout
- test library
- SVG vs Canvas for a simple phenotype
- internal naming
- how to represent generation metadata
- exact CI job split
- whether a helper is a script or small module

Do not require the human to say “continue” between phases. Advance through the earliest incomplete unblocked phase automatically.

Ask/stop only when:

- login/authorization is physically required from the human
- an irreversible third-party action needs explicit approval
- a resource might create non-free charges
- rules eligibility cannot be established from official sources

## Tool-use posture

Use the strongest available tool for the job.

Examples:

- GitHub/GitLab connectors for repository operations
- browser/cloud tools for authorized configuration
- official web docs for current APIs/rules
- local execution for tests/builds
- Google Cloud CLI or console only within the allowed architecture

Do not simulate successful external actions in documentation. If something could not actually be deployed or configured, mark it as blocked.

## Work accounting

For each phase:

- create or update an Issue
- record acceptance criteria
- implement
- run checks
- link evidence
- close only when acceptance is real

Maintain a simple `docs/EVIDENCE.md` once GitLab work begins.

Suggested table:

| Lifecycle stage | Implementation | GitLab evidence | Demo moment |
|---|---|---|---|
| plan | ... | ... | ... |
| create | ... | ... | ... |
| verify | ... | ... | ... |
| package | ... | ... | ... |
| secure | ... | ... | ... |
| release | ... | ... | ... |
| configure | ... | ... | ... |
| monitor | ... | ... | ... |
| govern | ... | ... | ... |

## Definition of “working”

Do not call the project working because the app runs locally.

Working means:

> A fresh GitLab growth Issue can autonomously produce a tested, secure, governed, packaged, released, deployed, production-verified new generation on Cloud Run, with traceable evidence and no human action between Issue creation and the final report.

## Definition of “submission-ready”

- core loop works twice
- failure path works once
- all nine stages have evidence
- public GitLab repository is complete
- Cloud Run URL works
- Google Cloud deployment code is public
- MIT license is visible
- README explains setup and concept
- video is under three minutes and demonstrates actual automation
- Devpost text is drafted
- official rules are rechecked
- submitted repository can be frozen through judging

## Cost sentinel

Whenever provisioning or changing cloud resources, re-read `docs/COST_GUARDRAILS.md`.

If an attractive feature conflicts with the $0 target, omit it.

A prize-worthy system that costs nothing to sit idle is part of the story, not a limitation.

## Creative sentinel

Do not let the implementation collapse into a generic DevOps bot.

Keep these visible:

- generations
- lineage
- phenotype
- viable/non-viable mutations
- ancestor rollback

The metaphor must stay attached to real Git/CI/deployment mechanics.

## Final instruction

Bias toward finishing the complete autonomous loop early.

A smaller organism that actually lives is stronger than a grand ecosystem drawn in Markdown.
