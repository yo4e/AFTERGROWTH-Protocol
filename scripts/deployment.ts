import { costGuard } from "./policy.js";
export function deploymentArgs(
  config: Record<string, unknown>,
  project: string,
  image: string,
  revision: string,
) {
  costGuard(config);
  if (config.provisioningApproved !== true)
    throw new Error("Human approval required for deployment");
  if (!/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(project))
    throw new Error("Invalid project");
  const expected = `us-central1-docker.pkg.dev/${project}/aftergrowth/`;
  if (
    !image.startsWith(expected) ||
    !/^[-a-z0-9/.:]+@sha256:[a-f0-9]{64}$/.test(image)
  )
    throw new Error("Image must be immutable and project-scoped");
  if (!/^[a-z0-9][a-z0-9-]{0,30}$/.test(revision))
    throw new Error("Invalid revision suffix");
  return [
    "run",
    "deploy",
    "aftergrowth",
    "--project",
    project,
    "--region",
    "us-central1",
    "--image",
    image,
    "--revision-suffix",
    revision,
    "--min-instances",
    "0",
    "--max-instances",
    "1",
    "--cpu",
    "1",
    "--memory",
    "256Mi",
    "--timeout",
    "30s",
    "--cpu-throttling",
    "--no-cpu-boost",
    "--min",
    "0",
    "--max",
    "1",
    "--no-traffic",
    "--quiet",
  ];
}
export function rollbackArgs(project: string, revision: string) {
  if (
    !/^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(project) ||
    !/^aftergrowth-[a-z0-9-]+$/.test(revision)
  )
    throw new Error("Invalid rollback target");
  return [
    "run",
    "services",
    "update-traffic",
    "aftergrowth",
    "--project",
    project,
    "--region",
    "us-central1",
    `--to-revisions=${revision}=100`,
    "--quiet",
  ];
}
