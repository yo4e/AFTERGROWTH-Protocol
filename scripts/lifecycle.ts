import type { Generation } from "../src/generation.js";
import { nextGeneration, validateGeneration } from "../src/generation.js";
export function candidate(
  parent: Generation,
  issue: number,
  mr: number,
  commit: string,
  mutation: string,
  timestamp: string,
): Generation {
  const g: Generation = {
    id: nextGeneration(parent.id),
    parent: parent.id,
    issue,
    merge_request: mr,
    commit,
    mutation,
    checks: {
      tests: "pending",
      security: "pending",
      policy: "pending",
      production: "pending",
    },
    deployment_revision: null,
    created_at: timestamp,
  };
  validateGeneration(g);
  return g;
}
export function releaseReady(g: Generation) {
  validateGeneration(g);
  return (
    !!g.commit &&
    !!g.issue &&
    !!g.merge_request &&
    ["tests", "security", "policy"].every(
      (key) => g.checks[key as keyof Generation["checks"]] === "passed",
    )
  );
}
export async function smoke(
  base: string,
  expected: string,
  fetcher: typeof fetch = fetch,
) {
  const url = new URL(base);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Invalid smoke URL");
  const read = async (path: string) => {
    const res = await fetcher(new URL(path, url), {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Smoke HTTP ${res.status}`);
    return res.json();
  };
  const health = await read("/healthz");
  const generation = await read("/api/generation");
  validateGeneration(generation);
  if (
    health.status !== "healthy" ||
    health.generation !== expected ||
    generation.id !== expected
  )
    throw new Error("Production identity mismatch");
  return { generation: expected, status: "healthy" };
}
export async function deployAndVerify(
  deploy: () => Promise<string>,
  verify: (revision: string) => Promise<void>,
  rollback: (revision: string) => Promise<void>,
  previous: string | null,
) {
  const revision = await deploy();
  try {
    await verify(revision);
    return { status: "healthy", revision };
  } catch (error) {
    if (!previous)
      throw new Error("Validation failed; no viable ancestor exists", {
        cause: error,
      });
    await rollback(previous);
    await verify(previous);
    return {
      status: "rolled-back",
      revision: previous,
      failedRevision: revision,
    };
  }
}
export function report(
  g: Generation,
  links: { mr: string; pipeline: string; live: string },
) {
  validateGeneration(g);
  for (const url of Object.values(links))
    if (new URL(url).protocol !== "https:")
      throw new Error("Evidence URLs require HTTPS");
  return `Generation ${g.id} ← ${g.parent ?? "origin"}\nMutation: ${g.mutation}\nTests: ${g.checks.tests}; security: ${g.checks.security}; policy: ${g.checks.policy}; production: ${g.checks.production}\nMR: ${links.mr}\nPipeline: ${links.pipeline}\nHabitat: ${links.live}\nRevision: ${g.deployment_revision ?? "not deployed"}`;
}
