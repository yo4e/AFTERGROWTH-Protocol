# Cost Guardrails

## Policy

**Target cloud spend: $0.00.**

The project may use services that require a billing account, but the architecture must be designed to remain inside currently documented free usage ranges during development, judging, and the required live period.

This document is a hard constraint, not a suggestion.

Pricing/free tiers can change. Verify current official pricing before provisioning.

## Current planning assumptions — checked 2026-10-07

Official Google Cloud pages currently state:

- Cloud Run has a monthly free usage allowance and applies it across projects by billing account.
- Cloud Build provides a monthly free build-minute allowance for the eligible default-pool machine type.
- Artifact Registry provides the first 0.5 GiB-month of storage free per billing account.

Sources:

- https://cloud.google.com/run/pricing
- https://cloud.google.com/build/pricing
- https://cloud.google.com/artifact-registry/pricing

Do not treat these numbers as eternal. Re-check them during setup and before final submission.

## Allowed Google Cloud footprint

Preferred:

- **1 Cloud Run service**
- **1 Artifact Registry repository**
- Cloud Build only as needed for image builds
- minimal IAM / Workload Identity resources
- ordinary Cloud Run/Build logs only

No other GCP services should be added without a written reason and a free-tier review.

## Cloud Run guardrails

Required configuration:

- request-based billing
- `min-instances=0`
- `max-instances=1` unless a documented reason proves another setting remains safe
- low memory target, preferably 256–512 MiB
- at most 1 vCPU unless required
- reasonable request timeout, typically <= 30s for the web service
- public service only because judges need access
- no always-on background process
- no scheduled keep-warm ping

The application must be stateless in production. Durable project state lives in Git.

### Region

Use a Tier 1 Cloud Run pricing region.

`us-central1` is the default recommendation because it is Tier 1 and marked by Google as a low-CO2 location, but another Tier 1 region is acceptable if there is a better technical reason.

Keep Artifact Registry and build/deploy resources geographically aligned where practical to reduce transfer complexity/cost.

## Artifact Registry guardrails

The free storage allowance is small enough that careless image accumulation can create charges.

Rules:

- use compact images
- avoid shipping build caches in production images
- retain only the current production image and a small rollback set
- target **<= 3 retained images**
- configure or implement cleanup of superseded/unreferenced images
- check total stored size before final submission and during the judging-live period
- do not enable paid vulnerability scanning without confirming cost

Prefer multi-stage Docker builds.

## Cloud Build guardrails

Rules:

- use only the eligible default pool/machine type covered by the free allowance
- no private pools
- no giant dependency caches
- do not trigger builds from bot-generated housekeeping commits
- cap automated retries
- prevent recursive pipelines
- avoid scheduled builds

The expected hackathon build count should be tiny compared with the documented monthly free allowance.

## GitLab cost guardrails

Use the hackathon contributor onboarding/free access.

Avoid:

- runaway Duo agent loops
- flows that trigger on their own comments
- pipelines that commit and retrigger indefinitely
- redundant full pipelines for documentation-only changes when not required
- unnecessary large artifacts

A failed autonomous task may retry a small fixed number of times. After that, fail closed and report the blocker.

## Forbidden-before-review resources

Do not provision these merely to make implementation easier:

- Cloud SQL
- GKE
- Compute Engine VMs
- static external IPs
- external load balancers
- Serverless VPC connectors
- NAT gateways
- GPUs
- Memorystore
- always-on workers
- managed databases
- paid monitoring products
- custom domain infrastructure
- recurring Cloud Scheduler jobs

Some of these can have free allowances in some contexts. That is irrelevant. They are unnecessary for this demo and expand billing risk.

## Authentication

Authentication infrastructure should not create paid resources.

Preferred:

- GitLab OIDC / Workload Identity Federation
- least-privilege deploy/build service account

Avoid long-lived service-account keys.

## Logging

Use default logs sparingly.

Do not:

- export logs to paid destinations
- create high-volume debug logging in production
- log every animation/frame/client event
- retain large custom build artifacts unnecessarily

## Budget alerts

If a billing account is attached, configure Google Cloud budget alerts as an additional warning layer.

Important:

**Budget alerts are not a hard spending cap.**

They do not replace architectural guardrails.

A tiny budget threshold can be used as an alarm, but the project should still be designed not to incur charges.

## Cost policy as code

Create a CI policy script, e.g. `scripts/cost-guard.*`, that fails if deployment configuration violates defined constraints.

At minimum, inspect for:

- minimum instances > 0
- maximum instances > allowed cap
- forbidden resource types/config files
- suspicious always-on scheduling
- newly introduced infrastructure outside the approved set

This turns “stay free” into part of the **govern** stage.

## Agent instruction

If an agent encounters a requirement that appears to need a paid resource:

1. do not provision it
2. search for a free architectural alternative
3. document the tradeoff
4. use the cheaper alternative
5. if no adequate alternative exists, create a blocker issue and stop that path

Do not silently spend money to satisfy a test.

## Judging-period survival

The hackathon currently asks that deployed projects remain available until winners are announced around November 16, 2026.

Before the submission freeze:

- confirm Cloud Run `min-instances=0`
- confirm max instances cap
- confirm Artifact Registry size
- remove stale images
- verify no scheduled workload
- verify no test/staging service was accidentally left running
- verify public production URL
- capture the final pipeline/demo evidence

The safest hackathon cloud resource is one that sleeps when nobody is judging it.
