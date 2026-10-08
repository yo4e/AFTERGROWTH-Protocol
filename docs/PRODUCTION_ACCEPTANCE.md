# Generation survival contract — Issue #11

Each generation now requires `acceptance`, a non-empty list of at most 16 deterministic assertions. Candidate creation copies the Issue-derived contract explicitly; seed gen-0000 carries reed presence and zero-flower day/night assertions. Older manifests without a contract fail validation rather than bypass behavior checks.

Supported vocabulary only:

- `trait-includes`: `collection` flora/fauna and a short trait name `value`.
- `trait-equals`: `trait` lumenFlowers and boolean `expected`.
- `flowers-at-hour`: integer `hour` 0–23, integer `expected` 0–1000.
- `night-at-hour`: integer `hour` 0–23, boolean `expected`.

No arbitrary URLs, JSON paths, shell/code, extra fields, string coercion or unbounded lists are allowed. Extend this vocabulary through reviewed code/tests for future behavior APIs.

Example night-flower contract:

```json
[
  {"kind":"trait-equals","trait":"lumenFlowers","expected":true},
  {"kind":"flowers-at-hour","hour":12,"expected":0},
  {"kind":"flowers-at-hour","hour":21,"expected":5}
]
```

`smoke(candidateRevisionURL, trustedManifest)` validates the locally supplied manifest, service/generation identity, each queried world's identity, traits and actual API phenotype. Responses cannot weaken the local contract. It fetches only fixed same-origin endpoints, with redirect rejection and a 10-second timeout per request; world responses are reused per hour. It observes behavior and does not calculate the expected phenotype from remote trait flags.

CLI: `npx tsx scripts/smoke.ts URL gen-NNNN [trusted-manifest.json]`. Default is the repository/package's current manifest; its ID must equal the command's expected ID. The optional file is a trusted CI/release artifact, not a manifest downloaded from the service under test.

`surviveDeployment` orchestrates injected deployment/traffic callbacks: deploy a candidate revision without production traffic, execute the candidate's survival contract, then promote. On verification or promotion failure, restore the previous revision and smoke it with its own manifest. A broken ancestor fails the run; absence of an ancestor fails closed. Returning healthy/rolled-back does not itself write release evidence or call cloud APIs. This local wiring is ready for an approved real deployment adapter.

Tests run actual local HTTP habitat servers for success, wrong generation, correct ID/wrong trait, correct flag/wrong night behavior, remote contract weakening, ancestor restoration and broken-ancestor rejection. The real Cloud Run demo must deliberately fail a supported behavior assertion and show restored ancestor verification; it has not run, and Issue #11's real-demo criterion remains open.

No real merge, deployment, public import, authentication/permission change or new cloud resource is performed by this implementation. Owner app-finish OK remains mandatory before video recording/generation/editing.
