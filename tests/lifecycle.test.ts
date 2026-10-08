import { it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import {
  candidate,
  releaseReady,
  deployAndVerify,
  smoke,
  report,
} from "../scripts/lifecycle.js";
const seed = JSON.parse(readFileSync("lineage/current.json", "utf8"));
it("requires all gates and traceable intent before release", () => {
  const g = candidate(
    seed,
    3,
    1,
    "a".repeat(40),
    "Lumen flowers",
    "2026-10-07T00:00:00Z",
    [{ kind: "flowers-at-hour", hour: 21, expected: 5 }],
  );
  expect(g.id).toBe("gen-0001");
  expect(releaseReady(g)).toBe(false);
  g.checks = {
    tests: "passed",
    security: "passed",
    policy: "passed",
    production: "pending",
  };
  expect(releaseReady(g)).toBe(true);
  g.checks.security = "failed";
  expect(releaseReady(g)).toBe(false);
  expect(
    report(g, {
      mr: "https://example.com/mr/1",
      pipeline: "https://example.com/pipeline/1",
      live: "https://example.com/",
    }),
  ).toContain("production: pending");
});
it("restores and revalidates ancestor after bad production", async () => {
  const verify = vi
    .fn()
    .mockRejectedValueOnce(new Error("bad phenotype"))
    .mockResolvedValueOnce(undefined);
  const rollback = vi.fn().mockResolvedValue(undefined);
  expect(
    await deployAndVerify(async () => "bad", verify, rollback, "good"),
  ).toEqual({ status: "rolled-back", revision: "good", failedRevision: "bad" });
  expect(rollback).toHaveBeenCalledWith("good");
  expect(verify.mock.calls).toEqual([["bad"], ["good"]]);
});
it("never claims rollback success if ancestor validation also fails", async () => {
  await expect(
    deployAndVerify(
      async () => "bad",
      async () => {
        throw new Error("still broken");
      },
      async () => {},
      "good",
    ),
  ).rejects.toThrow("still broken");
  await expect(
    deployAndVerify(
      async () => "bad",
      async () => {
        throw new Error("broken");
      },
      async () => {},
      null,
    ),
  ).rejects.toThrow("no viable ancestor");
});
it("rejects wrong production generation even when HTTP is healthy", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(
      new Response(
        JSON.stringify({ status: "healthy", generation: "gen-0001" }),
      ),
    )
    .mockResolvedValueOnce(new Response(JSON.stringify(seed)));
  await expect(
    smoke(
      "https://example.com",
      { ...seed, id: "gen-0001", parent: "gen-0000" },
      fetcher,
    ),
  ).rejects.toThrow("identity mismatch");
});
