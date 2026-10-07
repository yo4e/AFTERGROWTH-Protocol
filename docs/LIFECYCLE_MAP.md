# Lifecycle dependency map

Solid local bootstrap nodes are verified; external transitions remain gated and are not represented as completed deployment evidence.

```mermaid
flowchart LR
  I[Human growth Issue] --> D[GitLab Duo plan and mutation]
  D --> M[Normal Merge Request]
  M --> V[Tests, browser, build]
  V --> S[Secret, SAST, dependency gates]
  S --> G[Protected and cost policy]
  G --> P[OCI package]
  P --> R[Authorized merge and generation release]
  R --> C[Authorized Cloud Run candidate revision]
  C --> H[Expected generation and behavior smoke]
  H -->|passes| L[Traffic promotion and lineage report]
  H -->|fails| A[Restore and verify viable ancestor]
  A --> F[Failure evidence on original Issue]
  L --> I
```

Implemented bootstrap: V/S/G/P checks, habitat/APIs/lineage, candidate/release/report helpers and injected rollback orchestration. Bootstrap standard-runner GitHub CI verifies OCI without publishing it. GitLab-native artifacts, Duo execution, R/C/real H/L/A/F depend on canonical identity/resources and the owner's explicit production authority. See REMAINING_WORK.md.
