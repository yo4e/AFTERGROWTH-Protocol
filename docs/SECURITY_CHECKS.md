# Bootstrap security verification

Local secret/SAST checks are not authentication gates. They were initially omitted, then completed on 2026-10-07 and added to both bootstrap CI and the GitLab CI candidate.

- Gitleaks 8.30.1: official release archive checksum verified, `gitleaks git --redact --no-banner .`, 17 commits scanned, 0 findings. Redaction remains enabled; no raw secrets are written into evidence.
- Semgrep 1.179.0 community engine: `semgrep scan --config p/typescript --config p/javascript --metrics off --disable-version-check --error src scripts public`, 74 rules across 8 TS/JS files, 0 findings and 0 errors. Approximately 100% of targeted lines parsed. This fetches public registry rules and scans locally; no login/paid service or source-code upload.
- npm audit: all installed dependencies, moderate-and-above blocking, 0 vulnerabilities after Vitest upgrade.
- Protected-file and cost gates: negative tests reject governance changes, credential-shaped paths, unsupported infrastructure and false production claims.

Limitations: scanner findings=0 is not proof that vulnerabilities cannot exist. No GitLab-native security report/dashboard is available until canonical project access. Container-image/package scans depend on a built OCI image and selected supported scanner; bootstrap runner builds/smokes the image without publishing it. Production IAM, keyless identity, usage and public service configuration need approved target access.

Bootstrap GitHub CI uses the existing public repository's standard ubuntu-latest runner, read-only contents permission, pinned official Actions, 12-minute timeout and no stored cache/artifact or publication. It does not replace judge-visible GitLab evidence. The workflow is scoped to the bootstrap implementation branch and main; no automatic merge, deployment or release.

Sources: [Gitleaks](https://github.com/gitleaks/gitleaks), [Semgrep rule execution](https://semgrep.dev/docs/running-rules), [metrics control](https://semgrep.dev/docs/metrics), [standard public Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions).
