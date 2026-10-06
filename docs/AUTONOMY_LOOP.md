# Autonomous Execution Loop

## Purpose

AFTERGROWTH Protocol should be built by an agent that can continue working without waiting for routine human direction.

The default behavior is not:

> attempt once → report failure → stop

The default behavior is:

> observe → reason → act → verify → diagnose → repair → retry → record → continue

Repeat until the current acceptance criteria are satisfied or a genuine human-only gate is reached.

## The loop

For every active task or Issue:

1. **Observe**
   - inspect repository state
   - inspect relevant Issues/MRs
   - inspect the latest test/pipeline/deployment result
   - inspect current official documentation when an external API/configuration is involved

2. **Choose the next smallest decisive action**
   - prefer actions that reduce uncertainty
   - prefer reversible changes
   - prefer executable evidence over speculative design discussion

3. **Act**
   - edit code/config/docs
   - run tests/builds
   - create/update branches, MRs, Issues, or CI configuration
   - deploy only within already-authorized free-tier-safe resources

4. **Verify**
   - inspect actual command/test/pipeline output
   - compare result to acceptance criteria
   - never infer success from the absence of an error message

5. **Diagnose failure**
   - identify the concrete failing layer
   - read logs/errors
   - search current official docs when syntax/API behavior is uncertain
   - form the smallest plausible repair

6. **Repair and retry**
   - make the repair
   - rerun the narrowest relevant check first
   - once green, rerun the broader gate
   - continue without asking the human merely because a first attempt failed

7. **Record**
   - leave the repository clean
   - update the relevant Issue/status/evidence when a milestone or blocker changes
   - preserve useful failure evidence
   - commit coherent working slices

8. **Advance**
   - if the current task's acceptance criteria are satisfied, move to the next unblocked task in BUILD_PLAN.md
   - do not wait for praise, confirmation, or a new prompt between ordinary phases

## Human gate test

Before asking the human anything, apply this test:

> Can the agent obtain the missing information, choose a reasonable default, try a reversible experiment, inspect a log, read official documentation, or continue another unblocked part of the project?

If yes, do that instead of asking.

Only request human action when all useful autonomous paths are exhausted **and** one of these conditions applies:

### Gate A — Authentication / identity

Examples:

- OAuth login requires the human in a browser
- MFA / passkey / CAPTCHA
- accepting an invitation
- a provider requires account-owner consent
- payment/billing account linkage requires human confirmation

### Gate B — Explicit approval for irreversible or externally consequential action

Examples:

- deleting an external resource that contains unrelated data
- making a public/legal/business commitment outside the project
- granting broad permissions that are not necessary for the current design

Routine project commits, MRs, Issues, deployments to the dedicated hackathon environment, and reversible resource configuration are **not** human gates when already authorized.

### Gate C — Cost risk

The proposed action may exceed documented free usage or create a service with uncertain/non-trivial charges.

Before escalating:

1. search for a free alternative
2. simplify the design
3. check official pricing
4. prefer an already-approved resource

If no safe path remains, stop that path and ask.

### Gate D — Submission eligibility ambiguity

Official hackathon rules conflict or are unclear in a way that could make the project ineligible.

Do not guess around eligibility.

## Blocked does not mean idle

When one branch is human-blocked:

1. create/update a blocker Issue with:
   - exact human action needed
   - why it cannot be completed autonomously
   - exact URL/screen/permission if known
   - what becomes unblocked afterward
2. mark that branch blocked
3. continue all other independent work

Examples:

- GitLab onboarding blocked → continue building/test scaffolding locally
- GCP billing authorization blocked → finish container, deployment scripts, cost guard, and CI dry-run
- YouTube upload blocked → finish demo script, capture plan, Devpost copy, screenshots

A human gate should reduce the active frontier, not stop the whole project.

## Retry policy

Failures are expected during autonomous construction.

### Local/test/build failures

Retry after diagnosis until:

- fixed, or
- a new external/human gate is proven

Do not use an arbitrary “three failures then stop” rule for ordinary coding problems.

### CI/deployment failures

Avoid runaway loops.

- diagnose before retrying
- do not retry the same unchanged failure
- allow only a small fixed number of automatic retries for transient external failures
- after repeated identical infrastructure failure, change approach or mark the external dependency blocked
- never create self-triggering commit/pipeline loops

### Agent uncertainty

If two implementations are both reasonable:

- choose the simpler one
- implement and test it
- keep it if it meets acceptance criteria
- do not ask the human to adjudicate taste unless product intent truly changes

## Self-review loop

Before declaring a task complete, ask internally:

- Does it actually work?
- Did I run the relevant tests?
- Did I inspect the result?
- Is there a hidden manual step?
- Is the result judge-visible?
- Is it reversible?
- Does it stay within cost guardrails?
- Did I accidentally weaken the core AFTERGROWTH metaphor or autonomy story?
- Can the next agent understand the state from the repository alone?

If any answer is unsatisfactory, continue the loop.

## Phase advancement

The active agent owns progression through BUILD_PLAN.md.

It should:

- identify the earliest incomplete unblocked phase
- work its acceptance criteria
- update STATUS.md
- update EVIDENCE.md when proof becomes real
- move forward automatically

Do not require the human to say “continue,” “next,” or “go ahead” between phases.

## End condition

The autonomous construction loop ends only when:

1. the project is submission-ready under the documented definition, or
2. every remaining unfinished path is blocked by a genuine human gate.

At that point, report:

- what is complete
- what remains
- each human action required, minimized into the fewest possible steps
- the exact next autonomous work that will resume afterward

## Operating maxim

**Never turn a solvable error into a human notification.**

Humans should supply authority, intent, and decisions that genuinely belong to humans.

The agent should supply persistence.
