import { it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { costGuard } from "../scripts/policy.js";
it("fails closed on cost expansion and unknown infrastructure", () => {
  const c = JSON.parse(readFileSync("infra/cloud-run.json", "utf8"));
  expect(() => costGuard(c)).not.toThrow();
  for (const change of [
    { minInstances: 1 },
    { maxInstances: 2 },
    { billing: "instance" },
    { database: "sql" },
  ])
    expect(() => costGuard({ ...c, ...change })).toThrow();
});
