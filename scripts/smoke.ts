import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { smoke } from "./lifecycle.js";
import { validateGeneration } from "../src/generation.js";
const [url, generation, manifest] = process.argv.slice(2);
if (!url || !generation)
  throw new Error(
    "Usage: tsx scripts/smoke.ts URL gen-NNNN [trusted-manifest.json]",
  );
const expected: unknown = JSON.parse(
  readFileSync(
    manifest ??
      fileURLToPath(new URL("../lineage/current.json", import.meta.url)),
    "utf8",
  ),
);
validateGeneration(expected);
if (expected.id !== generation)
  throw new Error("Expected generation disagrees with trusted manifest");
console.log(JSON.stringify(await smoke(url, expected)));
