# Product Specification

## Product name

**AFTERGROWTH Protocol**

## One-line description

A GitLab-native protocol that turns software changes into autonomous, testable, reversible **generations** deployed to a living public application.

## Problem

Generative coding makes it easy to produce more software than individuals and small teams can carefully evolve, validate, secure, release, and maintain.

Most AI coding demos end when code appears.

AFTERGROWTH begins there.

It explores a narrower, more provocative question:

> What if a deployed software work could receive an intention and safely grow into its next production generation by itself?

The project is both a practical DevSecOps demonstration and a visible conceptual artwork about software lineage.

## Audience

Primary real-world audience:

- solo developers with many small software projects
- creative coders and digital artists
- small teams that need reliable post-code automation
- maintainers experimenting with agentic DevSecOps

Primary hackathon audience:

- judges evaluating GitLab-native automation
- engineers who need to see the autonomous path, not just hear claims about it

## Product promise

A human creates a growth request.

After that request, the system should be capable of reaching a verified live production generation without further human action.

The user should be able to inspect *why* the mutation happened, *what* changed, *which tests it survived*, *where it was deployed*, and *how to return to its parent generation*.

## Public experience: the Habitat

The deployed application is a small evolving visual habitat.

It should be attractive enough to make growth obvious in a three-minute demo, but intentionally small enough that most engineering effort can go into the autonomous lifecycle.

### Visual direction

Prefer a generative, browser-rendered habitat using lightweight DOM/SVG/Canvas techniques.

A generation can contain traits such as:

- sky/light state
- terrain
- plant species
- particles
- weather
- inhabitants
- behaviors
- day/night rules
- text fragments
- ambient motion

The visual language can be abstract. It does not need photorealism.

### Why a habitat

A conventional dashboard would make the workflow legible but forgettable.

A habitat gives the engineering metaphor a visible phenotype:

- the Issue is an environmental pressure
- the implementation is a mutation
- the pipeline decides whether it survives
- deployment makes the phenotype visible
- history becomes lineage

## Core screens

### 1. Habitat

Shows the current deployed generation.

Must show at least:

- generation ID
- mutation name
- visible phenotype
- “healthy” or equivalent production status
- link/access to lineage

### 2. Lineage

Shows recent generations as a chain or tree.

Each entry should expose:

- generation ID
- parent
- mutation summary
- date/time
- source Issue
- commit/release identity when safe to expose
- deployment health

A simple elegant visualization is enough.

### 3. Generation details

Optional if time permits, but useful for judges.

Can show:

- acceptance criteria
- checks passed
- GitLab MR/pipeline links
- Cloud Run revision
- rollback parent

## Growth requests

The canonical input is a GitLab Issue.

The system should tolerate plain natural language. It should not require the user to fill a giant form.

Example:

> Add bioluminescent flowers that appear after sunset. They should feel rare rather than covering the whole habitat. Record this as a new trait in the lineage.

The agent should derive:

- mutation plan
- files likely to change
- acceptance criteria
- tests to add or change
- visual success condition
- risk notes

### Good demo requests

A demo request should force a real code change, not just change a string or JSON value.

Good:

- “Add bioluminescent flowers that appear only after sunset and write a test for the day/night behavior.”
- “Introduce a small nocturnal creature that hides during daylight and expose the trait in lineage metadata.”

Weak:

- “Change the background to blue.”
- “Change the title.”

## Declarative phenotype

Keep a portion of the world state declarative and versioned in Git.

A conceptual structure:

```json
{
  "generation": "gen-0007",
  "parent": "gen-0006",
  "traits": {
    "cycle": "day-night",
    "flora": ["reed", "moss", "lumen-flower"],
    "fauna": ["mote"]
  }
}
```

Simple changes can mutate data. More interesting requests may require new renderer or behavior code.

This hybrid is important:

- fully hard-coded worlds are difficult for agents to evolve reliably
- fully data-only worlds make the implementation look trivial

## Generation contract

A successful production change becomes a new generation.

A generation is not just a version number. It is a bundle of evidence:

- parent generation
- source intent
- source Issue
- implementation commit
- MR
- pipeline
- tests
- security result
- container/build identity
- Cloud Run revision
- production health check
- mutation summary

Suggested machine-readable record:

```json
{
  "id": "gen-0007",
  "parent": "gen-0006",
  "issue": 42,
  "merge_request": 17,
  "commit": "<sha>",
  "mutation": "Nocturnal bioluminescent flowers",
  "checks": {
    "tests": "passed",
    "security": "passed",
    "policy": "passed",
    "production": "healthy"
  },
  "deployment_revision": "<cloud-run-revision>",
  "created_at": "<ISO-8601>"
}
```

Final schema may differ, but it must be stable enough for the UI and automation to consume.

## Failure is part of the product

A living system that cannot reject a harmful mutation is not credible.

The project should intentionally demonstrate at least one failure path:

- test failure blocks merge, or
- security/policy gate blocks release, or
- production smoke test fails and triggers rollback

The UI/lineage may optionally record a “non-viable candidate” without pretending it became a generation.

## Branching lineage — stretch goal

If the core hands-off loop is stable, support a visible alternative lineage.

Example:

- branch from gen-0005
- evolve a different visual trait
- show two branches in the lineage viewer

This would make Git branching part of the artwork, but it is **not** worth destabilizing the main demo.

## Non-goals before submission

Do not spend deadline time on:

- user accounts
- social features
- mobile apps
- large databases
- custom domains
- elaborate 3D rendering
- multiplayer state
- heavy generative-image/video models
- a general-purpose autonomous coding platform

The hackathon submission is a focused protocol demonstration, not a startup MVP.

## Success metrics

Minimum:

- two distinct Issues successfully become two live generations hands-off
- one bad candidate is safely blocked or rolled back
- judges can understand current generation + lineage in under 20 seconds
- all critical evidence is linked/visible

Excellent:

- all nine lifecycle stages are credibly represented
- the autonomy is visually undeniable
- the metaphor improves comprehension rather than becoming decorative
- the end-to-end demo completes reliably enough to record without editing around failures
