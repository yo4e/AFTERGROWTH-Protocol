# Hackathon Strategy

Checked against the public Life After Code / GitLab Transcend hackathon pages on **2026-10-07**. Re-check official rules before submission.

## Competition posture

### Primary entry

- **Path A — Start Fresh**
- **Hands-off**

The repository was created during the submission period and the intended project is new work.

### Additional targets

- **Most Creative**
- **Most Stages Covered — Path A**
- Google Cloud deployment bonus, up to the amount currently stated by the hackathon
- **Most Environmentally Impactful** only as a stretch goal if the required sustainability measurement can be done credibly

## Why Hands-off

The project concept becomes much weaker if the human has to approve every transition.

AFTERGROWTH’s central claim is:

> A person supplies an intention. The next thing they touch is the grown, deployed generation.

This maps naturally to the hackathon’s Hands-off definition: set intent, then allow the complete path to production to occur without a human in the middle.

## Official lifecycle target

The challenge names nine stages:

**plan · create · verify · package · secure · release · configure · monitor · govern**

We should aim to show credible evidence for all nine.

“Most stages” alone is not enough. The hackathon prize language also emphasizes creativity in how they are covered, so the stages should reinforce the lineage metaphor rather than look like nine disconnected checkbox jobs.

## Judging criteria → build decisions

The public judging criteria are:

- Technological Implementation
- Design
- Potential Impact
- Innovation / Idea
- Presentation

### 1. Technological Implementation

What judges need to believe:

- GitLab is essential to the system
- GitLab Duo automation is central rather than decorative
- the workflow is non-trivial
- the implementation actually runs

Build response:

- use a real GitLab Duo agent/flow
- make pipeline history visible
- automate real MR/test/security/release/deploy work
- show a real rollback or blocked mutation
- keep agent-session evidence inspectable

### 2. Design

What judges need to believe:

- this is one coherent workflow
- each stage leads naturally to the next
- autonomy is understandable

Build response:

- one Issue is the story spine
- every artifact links back to that Issue
- generation metadata connects code, release, deployment, and visible habitat
- no random collection of unrelated CI jobs

### 3. Potential Impact

The project must not sound like a metaphor with no user.

Concrete problem statement:

> Solo developers and small teams can now generate software faster than they can safely evolve, validate, release, and maintain it.

Concrete audience:

- solo developers
- creative technologists
- maintainers of many small applications
- small teams adopting agentic development

Concrete value:

- an intent can become a verified production change
- the entire path is auditable
- unsafe candidates are blocked or rolled back
- maintenance and evolution become a protocol rather than ad-hoc toil

### 4. Innovation / Idea

This is where AFTERGROWTH should separate itself from ordinary “AI fixes CI” entries.

Distinctive ideas:

- software changes are **generations**, not merely versions
- Git history is **lineage/heredity**
- CI is a **survival test**
- deployment produces a visible **phenotype**
- rollback restores a **known viable ancestor**
- the public application makes the development process visible as an evolving work

Important: the biological language must correspond to real engineering structures. Do not oversell metaphor without mechanism.

### 5. Presentation

Judges are not required to watch beyond three minutes.

The demo must therefore be designed before the final feature list.

## Three-minute demo spine

Target duration: **2:30–2:50**.

### 0:00–0:20 — Hook

Show the living habitat and current generation.

Message:

> “AI can write code. AFTERGROWTH asks what happens after the code: can software safely grow itself all the way to production?”

### 0:20–0:40 — Intent

Create one short GitLab growth Issue.

Use a request with an obvious visual result and at least one behavioral requirement, for example:

> Add rare bioluminescent flowers that appear only after sunset. Add a test for the day/night behavior and record the trait in lineage.

Then stop touching the project.

### 0:40–1:35 — Autonomous lifecycle

Show, quickly:

- Duo agent/flow planning
- MR creation
- tests
- security/policy gate
- package/release
- deployment

Use jump cuts or accelerated screen capture if the live pipeline takes longer. Do not fake manual actions. The recorded artifacts must be real.

### 1:35–2:05 — Production

Refresh/open Cloud Run URL.

Show:

- changed habitat
- new generation number
- lineage entry
- health state

### 2:05–2:30 — Safety + lifecycle proof

Show either:

- a prior failed/non-viable mutation, or
- rollback evidence

Then flash the nine-stage evidence map.

### 2:30–2:50 — Close

Message:

> “This application doesn’t just have versions. It has generations. Git is its heredity, GitLab is its nervous system, and each production release is a tested descendant.”

End with project/GitLab name and live URL.

## Prize positioning

### Best Hands-off

Needs undeniable autonomy.

Evidence:

- timestamped initial Issue
- no user comments/approvals between trigger and production report
- agent sessions
- autonomous MR/merge
- production deployment

### Most Creative

Needs conceptual unity plus execution.

Avoid:

- generic “AI DevOps copilot” language
- a dashboard as the only visual output
- merely renaming CI stages with biology words

Do:

- make lineage visible in the product
- make generation identity real in tags/releases/metadata
- demonstrate a failed mutation/ancestor rollback

### Most Stages Covered

Maintain `docs/EVIDENCE.md` during implementation with one link/screenshot target per stage.

A stage without visible proof may as well not exist during judging.

### Google Cloud bonus

Current hackathon requirements state that eligibility requires:

- deployment on Google Cloud
- public live project URL
- Google Cloud deployment code in the public GitLab repository

Keep the service live through judging, currently scheduled to finish around November 16, 2026.

## Evidence checklist

Before submission, collect:

- public GitLab project URL
- MIT License visible in repo
- pipeline history
- representative growth Issue
- agent/flow session evidence
- MR
- verify jobs
- security jobs
- package evidence
- release/tag
- deployment environment
- Cloud Run live URL
- post-deploy health job
- rollback/blocked-candidate evidence
- lineage UI
- architecture diagram
- 3-minute video
- concise written project description

## Rules-sensitive practices

- Re-check the official rules immediately before submission.
- Keep all submission code/assets/instructions in the public GitLab project.
- Do not edit the submitted project after the deadline during judging if the rules prohibit it. If continued development is desired, work in a separate copy/fork.
- Keep the live project available to judges through the announced judging/winner period.
- Do not put copyrighted music or third-party trademark-heavy assets into the demo video.
- Ensure all submitted work complies with the required MIT licensing conditions.

## Source pages

Official/current references:

- https://gitlab-transcend.devpost.com/
- https://gitlab-transcend.devpost.com/resources
- https://gitlab-transcend.devpost.com/details/dates
- https://docs.gitlab.com/user/get_started/get_started_agent_platform/
- https://docs.gitlab.com/user/duo_agent_platform/flows/
- https://docs.gitlab.com/user/duo_agent_platform/agents/
- https://cloud.google.com/run/pricing
- https://cloud.google.com/build/pricing
- https://cloud.google.com/artifact-registry/pricing

## Strategic rule

When deciding between two features, prefer the one that produces a stronger answer to one of these questions:

1. Is the autonomy real?
2. Is GitLab essential?
3. Does it touch another lifecycle stage credibly?
4. Is the result visible in under three minutes?
5. Does it make the concept more memorable?
6. Does it remain reversible and free-tier-safe?

If the answer is “no” to all six, defer it.
