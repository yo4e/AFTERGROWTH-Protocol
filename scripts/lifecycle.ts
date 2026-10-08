import type { AcceptanceAssertion } from "../src/acceptance.js";
import { validateWorld } from "../src/generation.js";
import type { Generation } from "../src/generation.js";
import { nextGeneration, validateGeneration } from "../src/generation.js";
export function candidate(
  parent: Generation,
  issue: number,
  mr: number,
  commit: string,
  mutation: string,
  timestamp: string,
  acceptance: AcceptanceAssertion[],
): Generation {
  const g: Generation = {
    id: nextGeneration(parent.id),
    parent: parent.id,
    issue,
    merge_request: mr,
    commit,
    mutation,
    acceptance: structuredClone(acceptance),
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
  expected: Generation,
  fetcher: typeof fetch = fetch,
) {
  validateGeneration(expected);
  const url = new URL(base);
  if (!["http:", "https:"].includes(url.protocol))
    throw new Error("Invalid smoke URL");
  const read = async (path: string) => {
    const res = await fetcher(new URL(path, url), {
      signal: AbortSignal.timeout(10000),
      redirect: "error",
    });
    if (!res.ok) throw new Error(`Smoke HTTP ${res.status}`);
    return res.json();
  };
  const health = await read("/healthz");
  const generation = await read("/api/generation");
  validateGeneration(generation);
  if (
    health.status !== "healthy" ||
    health.generation !== expected.id ||
    generation.id !== expected.id
  )
    throw new Error("Production identity mismatch");
  const worlds = new Map<number, Record<string, unknown>>();
  for (const assertion of expected.acceptance) {
    const hour = "hour" in assertion ? assertion.hour : 12;
    if (!worlds.has(hour)) {
      const world = await read(`/api/world?hour=${hour}`);
      validateWorld(world);
      if (world.generation !== expected.id)
        throw new Error("World identity mismatch");
      worlds.set(hour, world as unknown as Record<string, unknown>);
    }
    const world = worlds.get(hour)!;
    const traits = world.traits as Record<string, unknown>;
    const phenotype = world.phenotype as Record<string, unknown> | undefined;
    let passed: boolean;
    switch (assertion.kind) {
      case "trait-includes":
        passed = (traits[assertion.collection] as string[]).includes(
          assertion.value,
        );
        break;
      case "trait-equals":
        passed = traits[assertion.trait] === assertion.expected;
        break;
      case "flowers-at-hour":
        passed = phenotype?.flowers === assertion.expected;
        break;
      case "night-at-hour":
        passed = phenotype?.night === assertion.expected;
        break;
    }
    if (!passed)
      throw new Error(
        `Production acceptance failed: ${assertion.kind} at hour ${hour}`,
      );
  }
  return {
    generation: expected.id,
    status: "healthy",
    assertions: expected.acceptance.length,
  };
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

export interface RevisionTarget {
  revision: string;
  url: string;
  generation: Generation;
}
export async function surviveDeployment(
  deploy: () => Promise<RevisionTarget>,
  promote: (revision: string) => Promise<void>,
  rollback: (revision: string) => Promise<void>,
  previous: RevisionTarget | null,
  fetcher: typeof fetch = fetch,
) {
  if (previous) validateGeneration(previous.generation);
  const target = await deploy();
  if (previous?.revision === target.revision)
    throw new Error("Candidate must use a distinct revision");
  return deployAndVerify(
    async () => target.revision,
    async (revision) => {
      const checking = revision === target.revision ? target : previous!;
      await smoke(checking.url, checking.generation, fetcher);
      if (revision === target.revision) await promote(revision);
    },
    rollback,
    previous?.revision ?? null,
  );
}
