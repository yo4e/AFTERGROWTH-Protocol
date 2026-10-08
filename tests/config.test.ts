import { it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
it("CI and flow candidates parse; flow uses supported ambient v1 fields", () => {
  const ci = parse(readFileSync(".gitlab-ci.yml", "utf8"));
  expect(ci.stages).toContain("govern");
  expect(ci["protected-files"].rules[0].if).toContain("merge_request_event");
  const flow = parse(readFileSync(".gitlab/duo/growth.yaml", "utf8"));
  expect(flow.version).toBe("v1");
  expect(flow.environment).toBe("ambient");
  expect(flow.flow.entry_point).toBe(flow.components[0].name);
  expect(flow.prompts[0].prompt_id).toBe(flow.components[0].prompt_id);
  expect(flow.prompts[0]).not.toHaveProperty("model");
});

it("bootstrap CI stays read-only with standard runner and no deploy/publish/cache", () => {
  const ci = parse(readFileSync(".github/workflows/bootstrap.yml", "utf8"));
  expect(ci.permissions).toEqual({ contents: "read" });
  expect(ci.jobs.verify["runs-on"]).toBe("ubuntu-24.04");
  expect(ci.jobs.verify["timeout-minutes"]).toBeLessThanOrEqual(12);
  for (const step of ci.jobs.verify.steps)
    if (step.uses) expect(step.uses).toMatch(/@[a-f0-9]{40}$/);
  const yaml = readFileSync(".github/workflows/bootstrap.yml", "utf8");
  expect(yaml).not.toMatch(
    /upload-artifact|actions\/cache|docker push|gcloud|secrets\./,
  );
});

it("GitLab governance executes immutable baseline code without candidate dependencies", () => {
  const ci = parse(readFileSync(".gitlab-ci.yml", "utf8"));
  const gate = ci["protected-files"];
  expect(gate.before_script).toEqual([]);
  expect(gate.variables.GIT_DEPTH).toBe("0");
  expect(gate.script.join("\n")).toContain(
    'git show "$CI_MERGE_REQUEST_DIFF_BASE_SHA:scripts/governance.ts"',
  );
  expect(gate.script.join("\n")).not.toContain("npx");
});
