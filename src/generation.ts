import { validateAcceptance, type AcceptanceAssertion } from "./acceptance.js";
export interface Generation {
  id: string;
  parent: string | null;
  issue: number | null;
  merge_request: number | null;
  commit: string | null;
  mutation: string;
  acceptance: AcceptanceAssertion[];
  checks: {
    tests: string;
    security: string;
    policy: string;
    production: string;
  };
  deployment_revision: string | null;
  created_at: string;
}
export interface World {
  generation: string;
  traits: {
    cycle: "day-night";
    flora: string[];
    fauna: string[];
    lumenFlowers: boolean;
  };
}
const id = /^gen-\d{4,}$/;
export function validateGeneration(
  value: unknown,
): asserts value is Generation {
  if (!value || typeof value !== "object")
    throw new Error("Generation must be an object");
  const g = value as Generation;
  validateAcceptance(g.acceptance);
  if (
    !id.test(g.id) ||
    (g.parent !== null && (!id.test(g.parent) || g.parent === g.id))
  )
    throw new Error("Invalid lineage identity");
  for (const key of ["issue", "merge_request"] as const)
    if (g[key] !== null && (!Number.isInteger(g[key]) || Number(g[key]) <= 0))
      throw new Error(`Invalid ${key}`);
  if (g.commit !== null && !/^[a-f0-9]{40}$/.test(g.commit))
    throw new Error("Invalid commit");
  if (
    typeof g.mutation !== "string" ||
    !g.mutation.trim() ||
    !Number.isFinite(Date.parse(g.created_at))
  )
    throw new Error("Missing mutation or timestamp");
  for (const key of ["tests", "security", "policy"] as const)
    if (!["pending", "passed", "failed"].includes(g.checks?.[key]))
      throw new Error(`Invalid ${key} check`);
  if (
    !["pending", "healthy", "failed", "rolled-back"].includes(
      g.checks?.production,
    )
  )
    throw new Error("Invalid production result");
  if (
    g.deployment_revision !== null &&
    (typeof g.deployment_revision !== "string" || !g.deployment_revision)
  )
    throw new Error("Invalid deployment revision");
  if (
    g.checks.production === "healthy" &&
    (!g.deployment_revision ||
      !g.commit ||
      Object.values(g.checks).includes("pending") ||
      Object.values(g.checks).includes("failed"))
  )
    throw new Error("Healthy generation requires verified release evidence");
}
export function validateWorld(value: unknown): asserts value is World {
  const w = value as World;
  if (
    !w ||
    !id.test(w.generation) ||
    w.traits?.cycle !== "day-night" ||
    typeof w.traits.lumenFlowers !== "boolean"
  )
    throw new Error("Invalid world");
  for (const list of [w.traits.flora, w.traits.fauna])
    if (!Array.isArray(list) || list.some((v) => typeof v !== "string" || !v))
      throw new Error("Invalid traits");
}
export function phenotype(world: World, hour: number) {
  if (!Number.isInteger(hour) || hour < 0 || hour > 23)
    throw new Error("Hour must be 0–23");
  const night = hour < 6 || hour >= 18;
  return { night, flowers: world.traits.lumenFlowers && night ? 5 : 0 };
}
export function nextGeneration(parent: string): string {
  if (!id.test(parent)) throw new Error("Invalid parent");
  return `gen-${String(Number(parent.slice(4)) + 1).padStart(4, "0")}`;
}
