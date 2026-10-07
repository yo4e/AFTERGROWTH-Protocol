import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import {
  phenotype,
  validateGeneration,
  validateWorld,
  nextGeneration,
} from "../src/generation.js";
const generation = JSON.parse(readFileSync("lineage/current.json", "utf8"));
const world = JSON.parse(readFileSync("world/current.json", "utf8"));
describe("survival gates", () => {
  it("accepts seed but never claims verified production", () => {
    validateGeneration(generation);
    validateWorld(world);
    expect(generation.checks.production).toBe("pending");
  });
  it("rejects self-parent, missing checks and unsupported healthy claims", () => {
    for (const change of [
      { parent: generation.id },
      { checks: {} },
      { checks: { ...generation.checks, production: "healthy" } },
    ])
      expect(() => validateGeneration({ ...generation, ...change })).toThrow();
  });
  it("allocates descendant identities deterministically", () => {
    expect(nextGeneration("gen-0009")).toBe("gen-0010");
    expect(() => nextGeneration("latest")).toThrow();
  });
  it("makes flowers rare and night-only at boundaries", () => {
    const mutation = {
      ...world,
      traits: { ...world.traits, lumenFlowers: true },
    };
    for (const hour of [0, 5, 18, 23])
      expect(phenotype(mutation, hour).flowers).toBe(5);
    for (const hour of [6, 12, 17])
      expect(phenotype(mutation, hour).flowers).toBe(0);
    expect(phenotype(world, 23).flowers).toBe(0);
    expect(() => phenotype(world, 24)).toThrow();
  });
});
