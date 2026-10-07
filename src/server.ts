import { createServer } from "node:http";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { validateGeneration, validateWorld, phenotype } from "./generation.js";
const root = fileURLToPath(new URL("../", import.meta.url));
export function loadState(base = root) {
  const generation: unknown = JSON.parse(
    readFileSync(join(base, "lineage/current.json"), "utf8"),
  );
  const world: unknown = JSON.parse(
    readFileSync(join(base, "world/current.json"), "utf8"),
  );
  validateGeneration(generation);
  validateWorld(world);
  if (generation.id !== world.generation)
    throw new Error("World and lineage disagree");
  const lineage = readdirSync(join(base, "lineage/generations"))
    .filter((f) => f.endsWith(".json"))
    .sort()
    .reverse()
    .map((f) => {
      const record: unknown = JSON.parse(
        readFileSync(join(base, "lineage/generations", f), "utf8"),
      );
      validateGeneration(record);
      if (f !== `${record.id}.json`)
        throw new Error("Generation filename disagrees");
      return record;
    });
  if (!lineage.some((g) => g.id === generation.id))
    throw new Error("Missing current generation record");
  const current = lineage.find((g) => g.id === generation.id);
  if (JSON.stringify(current) !== JSON.stringify(generation))
    throw new Error("Current generation record disagrees");
  for (const record of lineage) {
    if (
      record.parent !== null &&
      (!lineage.some((g) => g.id === record.parent) ||
        Number(record.parent.slice(4)) >= Number(record.id.slice(4)))
    )
      throw new Error("Broken ancestor chain");
  }
  return { generation, world, lineage };
}
export function app(base = root) {
  const state = loadState(base);
  return createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'",
    );
    if (req.method !== "GET") {
      res.writeHead(405);
      res.end();
      return;
    }
    let data: unknown;
    if (url.pathname === "/healthz")
      data = {
        status: "healthy",
        generation: state.generation.id,
        production: state.generation.checks.production,
      };
    if (url.pathname === "/api/generation") data = state.generation;
    if (url.pathname === "/api/lineage") data = state.lineage;
    if (url.pathname === "/api/world") {
      try {
        data = {
          ...state.world,
          phenotype: phenotype(
            state.world,
            Number(url.searchParams.get("hour") ?? 12),
          ),
        };
      } catch {
        res.writeHead(400);
        res.end("Invalid hour");
        return;
      }
    }
    if (data !== undefined) {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      });
      res.end(JSON.stringify(data));
      return;
    }
    const files: Record<string, [string, string]> = {
      "/": ["index.html", "text/html"],
      "/app.js": ["app.js", "text/javascript"],
      "/style.css": ["style.css", "text/css"],
    };
    const file = Object.hasOwn(files, url.pathname)
      ? files[url.pathname]
      : undefined;
    if (!file) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": file[1] });
    res.end(readFileSync(join(base, "public", file[0])));
  });
}
if (process.argv[1] === fileURLToPath(import.meta.url))
  app().listen(Number(process.env.PORT ?? 8080), "0.0.0.0");
