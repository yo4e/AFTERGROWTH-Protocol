import { smoke } from "./lifecycle.js";
const [url, generation] = process.argv.slice(2);
if (!url || !generation)
  throw new Error("Usage: tsx scripts/smoke.ts URL gen-NNNN");
console.log(JSON.stringify(await smoke(url, generation)));
