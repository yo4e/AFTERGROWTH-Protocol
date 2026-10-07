import { it, expect } from "vitest";
import { guardChanges } from "../scripts/governance.js";
it("blocks weakened guardrails and credential-shaped paths", () => {
  expect(() =>
    guardChanges(["src/generation.ts", "world/current.json"]),
  ).not.toThrow();
  for (const path of [
    "AGENTS.md",
    ".github/workflows/bootstrap.yml",
    "scripts/policy.ts",
    "infra/cloud-run.json",
    ".env",
    "infra/deploy.key",
  ])
    expect(() => guardChanges([path])).toThrow();
});
