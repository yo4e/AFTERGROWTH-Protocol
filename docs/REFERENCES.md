# Conceptual References

This file records conceptual work that informs AFTERGROWTH Protocol without turning the project into a philosophy or consciousness claim.

The project should remain judgeable as a concrete GitLab-native DevSecOps system. These references are background for its architecture, language, and evidence discipline.

## Core conceptual reference

### Artificial symbiotic intelligence: Agents, AGI and the orchestration of many minds

Benjamin Bratton, Blaise Agüera y Arcas, and James Manyika. DeepMind Institute, September 24, 2026.

https://institute.deepmind.com/essays/artificial-symbiotic-intelligence/

Useful ideas for AFTERGROWTH:

- Intelligence can emerge from an ensemble of models, tools, institutions, and human participants rather than from one isolated model.
- An apparent agent can be a decomposable assemblage of models, memories, tools, roles, and constraints.
- Robust collective capability can reside in rules, procedures, precedents, and feedback mechanisms, not only in the intelligence of any one agent.
- Human-agent work can be understood as orchestration across specialized roles rather than one human issuing prompts to one assistant.

### Relevance to AFTERGROWTH

AFTERGROWTH should not describe GitLab Duo as the sole intelligent actor.

The meaningful unit is the coordinated system:

- human intent
- GitLab Issue and repository history
- Duo agents and flows
- tests and security gates
- governance policy
- release and rollback procedures
- Google Cloud runtime feedback

The project therefore treats orchestration and institutional structure as first-class engineering, not merely plumbing around an AI model.

This reference does **not** imply that AFTERGROWTH is an AGI system.

## Adjacent research

### From cacophony to hierarchy: a principled framework for assessing AI consciousness

Shamil Chandaria, Arvo Muñoz Morán, Fernando Rosas, Anil Seth, Henry Shevlin, Marcus Hutter, Thore Graepel, Adam Bales, Iulia Comsa, Murray Shanahan, Ruben Laukkonen, Morten Kringelbach, Chris Frith, and Shane Legg.

arXiv:2609.35618, submitted September 28, 2026; revised September 29, 2026.

https://arxiv.org/abs/2609.35618

The paper develops a five-level hierarchy for assessing AI consciousness and argues for separating the metaphysical “hard problem” from the more operational “mapping problem.” It emphasizes explicit assumptions, observable indicators, and structured uncertainty rather than binary verdicts.

### What AFTERGROWTH borrows from it

AFTERGROWTH does **not** attempt to determine whether an AI system is conscious.

The useful methodological lessons are narrower:

- Define the unit being evaluated instead of assuming it is identical to one foundation model.
- Prefer operational evidence over intuitive or anthropomorphic impressions.
- Make claims proportional to what the system can actually demonstrate.
- Treat interaction history, environment, and system structure as potentially relevant to continuity and evaluation.
- Preserve uncertainty where external evidence is incomplete.

This supports AFTERGROWTH's use of generations, lineage, evidence links, health checks, and explicit viable/non-viable states.

## Design implications

These references suggest several architectural principles already compatible with the project.

### 1. The system, not the model, is the relevant engineering unit

A production generation is created by a coordinated protocol involving a human, agents, repository state, CI, policy, deployment infrastructure, and production feedback.

No single component should be described as having accomplished the entire mutation alone.

### 2. Identity should be externalized and inspectable

AFTERGROWTH generation identity should live in durable, machine-readable artifacts:

- Git commits and tags
- generation manifests
- lineage records
- source Issue and Merge Request links
- deployment revision
- verification evidence

This makes continuity a property that can be inspected rather than merely narrated.

### 3. Governance is part of capability

Policies, protected paths, cost limits, release gates, and rollback procedures are not obstacles surrounding the autonomous system.

They are part of the system that makes autonomous operation trustworthy.

### 4. Claims should remain evidence-bounded

Use language such as:

- “the mutation passed these tests”
- “this generation reached verified production”
- “this candidate failed the survival gate”
- “the previous viable revision was restored”

Avoid claims that exceed the evidence, including unsupported language about agency, intention, sentience, or consciousness.

### 5. The metaphor must remain subordinate to the mechanism

“Mutation,” “generation,” “lineage,” “survival,” and “ancestor” are useful because each maps to a real technical artifact or process.

If a biological metaphor has no technical counterpart, it should not be added merely for atmosphere.

## Scope boundary

AFTERGROWTH Protocol is:

- an agentic software-evolution experiment
- a GitLab-native DevSecOps workflow
- a study in orchestration, evidence, reversibility, and lineage

It is **not**:

- a claim that software is biologically alive
- a claim that GitLab agents possess consciousness
- a consciousness-detection system
- an AGI architecture claim

These references are included to sharpen the system design and vocabulary, not to enlarge the project's claims.
