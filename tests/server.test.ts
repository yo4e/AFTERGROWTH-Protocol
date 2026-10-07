import { it, expect } from "vitest";
import { app, loadState } from "../src/server.js";
import { resolve, join } from "node:path";
import {
  mkdtempSync,
  cpSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
it("serves consistent generation, world, lineage and rejects invalid requests", async () => {
  const server = app(resolve("."));
  await new Promise<void>((r, j) => {
    server.once("error", j);
    server.listen(0, "127.0.0.1", r);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("No port");
  const base = `http://127.0.0.1:${address.port}`;
  try {
    const health = await fetch(`${base}/healthz`).then((r) => r.json());
    const generation = await fetch(`${base}/api/generation`).then((r) =>
      r.json(),
    );
    expect(health.generation).toBe(generation.id);
    expect(health.production).toBe("pending");
    expect((await fetch(`${base}/api/world?hour=25`)).status).toBe(400);
    expect((await fetch(`${base}/../package.json`)).status).toBe(404);
    for (const path of ["constructor", "toString", "__proto__"])
      expect((await fetch(`${base}/${path}`)).status).toBe(404);
    expect((await fetch(`${base}/healthz`, { method: "POST" })).status).toBe(
      405,
    );
    expect(await fetch(base).then((r) => r.text())).toContain("AFTERGROWTH");
  } finally {
    await new Promise<void>((r, j) => server.close((e) => (e ? j(e) : r())));
  }
});

it("refuses inconsistent current records and broken ancestry at startup", () => {
  const dir = mkdtempSync(join(tmpdir(), "aftergrowth-state-"));
  try {
    for (const folder of ["world", "lineage"])
      cpSync(folder, join(dir, folder), { recursive: true });
    const g = JSON.parse(
      readFileSync(join(dir, "lineage/current.json"), "utf8"),
    );
    writeFileSync(
      join(dir, "lineage/current.json"),
      JSON.stringify({ ...g, mutation: "Unrecorded mutation" }),
    );
    expect(() => loadState(dir)).toThrow("record disagrees");
    const broken = { ...g, parent: "gen-9999" };
    writeFileSync(join(dir, "lineage/current.json"), JSON.stringify(broken));
    writeFileSync(
      join(dir, "lineage/generations/gen-0000.json"),
      JSON.stringify(broken),
    );
    expect(() => loadState(dir)).toThrow("ancestor chain");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
