import { it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { deploymentArgs, rollbackArgs } from "../scripts/deployment.js";
it("requires approval, immutable image and exact project scope", () => {
  const config = JSON.parse(readFileSync("infra/cloud-run.json", "utf8"));
  const image = `us-central1-docker.pkg.dev/demo-project/aftergrowth/habitat@sha256:${"a".repeat(64)}`;
  expect(() =>
    deploymentArgs(config, "demo-project", image, "gen-0001"),
  ).toThrow("approval");
  const args = deploymentArgs(
    { ...config, provisioningApproved: true },
    "demo-project",
    image,
    "gen-0001",
  );
  expect(args).toContain("--no-traffic");
  expect(args).toContain("--cpu-throttling");
  expect(() =>
    deploymentArgs(
      { ...config, provisioningApproved: true },
      "other-project",
      image,
      "gen-0001",
    ),
  ).toThrow("project-scoped");
  expect(() =>
    deploymentArgs(
      { ...config, provisioningApproved: true },
      "demo-project",
      image.replace(/@.*/, ":latest"),
      "gen-0001",
    ),
  ).toThrow("immutable");
  expect(rollbackArgs("demo-project", "aftergrowth-gen-0000")).toContain(
    "--to-revisions=aftergrowth-gen-0000=100",
  );
  expect(() => rollbackArgs("demo-project", "unrelated-revision")).toThrow();
});
