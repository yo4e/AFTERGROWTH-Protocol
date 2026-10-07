import { readFileSync } from "node:fs";
import { loadState } from "../src/server.js";
import { resolve } from "node:path";
export function costGuard(c: Record<string, unknown>) {
  const approved = {
    region: "us-central1",
    service: "aftergrowth",
    minInstances: 0,
    maxInstances: 1,
    cpu: 1,
    memory: "256Mi",
    timeoutSeconds: 30,
    billing: "request",
    retainedImages: 3,
  };
  for (const [key, value] of Object.entries(approved))
    if (c[key] !== value) throw new Error(`Cost constraint violated: ${key}`);
  for (const key of Object.keys(c))
    if (!(key in approved) && key !== "provisioningApproved")
      throw new Error(`Unreviewed infrastructure field: ${key}`);
  if (typeof c.provisioningApproved !== "boolean")
    throw new Error("Explicit approval state required");
}
if (process.argv[1]?.endsWith("/policy.ts")) {
  costGuard(JSON.parse(readFileSync("infra/cloud-run.json", "utf8")));
  loadState(resolve("."));
  console.log("Generation and cost policy passed");
}
