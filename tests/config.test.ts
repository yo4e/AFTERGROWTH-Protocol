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
