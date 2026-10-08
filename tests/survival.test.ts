import { it, expect } from "vitest";
import {
  mkdtempSync,
  cpSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { app } from "../src/server.js";
import { candidate, smoke, surviveDeployment } from "../scripts/lifecycle.js";
import {
  validateAcceptance,
  type AcceptanceAssertion,
} from "../src/acceptance.js";
const seed = JSON.parse(readFileSync("lineage/current.json", "utf8"));
const nightFlowers: AcceptanceAssertion[] = [
  { kind: "trait-equals", trait: "lumenFlowers", expected: true },
  { kind: "flowers-at-hour", hour: 12, expected: 0 },
  { kind: "flowers-at-hour", hour: 21, expected: 5 },
  { kind: "night-at-hour", hour: 21, expected: true },
];
const grown = () =>
  candidate(
    seed,
    11,
    9,
    "b".repeat(40),
    "Night flowers",
    "2026-10-08T04:00:00Z",
    nightFlowers,
  );
it("acceptance rejects code, URLs, unknown properties and excessive work", () => {
  for (const bad of [
    [],
    Array(17).fill(nightFlowers[0]),
    [{ kind: "shell", command: "echo unsafe" }],
    [{ kind: "flowers-at-hour", hour: 24, expected: 5 }],
    [{ kind: "flowers-at-hour", hour: 21, expected: "5" }],
    [{ kind: "trait-includes", collection: "constructor", value: "mote" }],
    [
      {
        kind: "flowers-at-hour",
        hour: 21,
        expected: 5,
        url: "https://example.invalid/",
      },
    ],
  ])
    expect(() => validateAcceptance(bad)).toThrow();
  expect(() => validateAcceptance(nightFlowers)).not.toThrow();
});
async function habitat(generation = seed, flowers = false) {
  const dir = mkdtempSync(join(tmpdir(), "aftergrowth-survival-"));
  for (const folder of ["public", "world", "lineage"])
    cpSync(folder, join(dir, folder), { recursive: true });
  const world = JSON.parse(
    readFileSync(join(dir, "world/current.json"), "utf8"),
  );
  world.generation = generation.id;
  world.traits.lumenFlowers = flowers;
  writeFileSync(join(dir, "world/current.json"), JSON.stringify(world));
  writeFileSync(join(dir, "lineage/current.json"), JSON.stringify(generation));
  writeFileSync(
    join(dir, "lineage/generations", `${generation.id}.json`),
    JSON.stringify(generation),
  );
  const server = app(dir);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No port");
  return {
    url: `http://127.0.0.1:${address.port}`,
    generation,
    close: async () => {
      await new Promise<void>((r) => server.close(() => r()));
      rmSync(dir, { recursive: true, force: true });
    },
  };
}
it("actual HTTP survival checks requested day/night behavior before promotion", async () => {
  const target = await habitat(grown(), true);
  const events: string[] = [];
  try {
    expect(await smoke(target.url, target.generation)).toEqual({
      generation: "gen-0001",
      status: "healthy",
      assertions: 4,
    });
    const result = await surviveDeployment(
      async () => ({ revision: "new", ...target }),
      async (revision) => {
        events.push(`promote:${revision}`);
      },
      async () => {
        throw new Error("Unexpected rollback");
      },
      null,
    );
    expect(result.status).toBe("healthy");
    expect(events).toEqual(["promote:new"]);
  } finally {
    await target.close();
  }
});
it("correct ID with wrong phenotype rejects, restores and verifies ancestor's own contract", async () => {
  const target = await habitat(grown(), false);
  const ancestor = await habitat();
  const events: string[] = [];
  try {
    await expect(smoke(target.url, target.generation)).rejects.toThrow(
      "Production acceptance failed",
    );
    const result = await surviveDeployment(
      async () => ({ revision: "bad", ...target }),
      async () => {
        throw new Error("Must not promote");
      },
      async (revision) => {
        events.push(`rollback:${revision}`);
      },
      { revision: "old", ...ancestor },
    );
    expect(result).toEqual({
      status: "rolled-back",
      revision: "old",
      failedRevision: "bad",
    });
    expect(events).toEqual(["rollback:old"]);
  } finally {
    await target.close();
    await ancestor.close();
  }
});
it("wrong generation and broken ancestor cannot report successful survival", async () => {
  const target = await habitat(grown(), false);
  const ancestor = await habitat();
  try {
    await expect(smoke(ancestor.url, grown())).rejects.toThrow(
      "identity mismatch",
    );
    const brokenAncestor = {
      ...ancestor,
      revision: "old",
      generation: { ...seed, acceptance: nightFlowers },
    };
    await expect(
      surviveDeployment(
        async () => ({ revision: "bad", ...target }),
        async () => {},
        async () => {},
        brokenAncestor,
      ),
    ).rejects.toThrow("Production acceptance failed");
  } finally {
    await target.close();
    await ancestor.close();
  }
});
it("production cannot weaken the trusted local acceptance contract", async () => {
  const g = grown();
  const weak = { ...g, acceptance: seed.acceptance };
  const target = await habitat(weak, false);
  try {
    await expect(smoke(target.url, g)).rejects.toThrow(
      "Production acceptance failed",
    );
  } finally {
    await target.close();
  }
});
it("correct trait and ID still fail when the night-only behavior is broken", async () => {
  const target = await habitat(grown(), true);
  const brokenBehavior: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);
    if (String(input).endsWith("/api/world?hour=21")) {
      const world = await response.json();
      world.phenotype.flowers = 0;
      return new Response(JSON.stringify(world), { status: response.status });
    }
    return response;
  };
  try {
    await expect(
      smoke(target.url, target.generation, brokenBehavior),
    ).rejects.toThrow("flowers-at-hour");
  } finally {
    await target.close();
  }
});
