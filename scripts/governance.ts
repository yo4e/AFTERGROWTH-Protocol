import { execFileSync } from "node:child_process";
export const protectedPaths = [
  "AGENTS.md",
  "docs/COST_GUARDRAILS.md",
  "docs/AUTONOMY_LOOP.md",
  ".gitlab-ci.yml",
  "scripts/policy.ts",
  "scripts/governance.ts",
  "infra/cloud-run.json",
];
export function guardChanges(paths: string[]) {
  for (const path of paths) {
    if (protectedPaths.includes(path))
      throw new Error(`Protected change needs human review: ${path}`);
    if (
      /(^|\/)(\.env(?:\..*)?|.*\.(pem|key)|.*credentials.*\.json)$/.test(path)
    )
      throw new Error(`Secret-like file prohibited: ${path}`);
  }
}
if (process.argv[1]?.endsWith("/governance.ts")) {
  const base = process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA;
  if (!base) throw new Error("Protected-file gate needs immutable MR base SHA");
  if (!/^[a-f0-9]{40}$/.test(base)) throw new Error("Invalid base SHA");
  guardChanges(
    execFileSync("git", ["diff", "--name-only", base, "HEAD"], {
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .filter(Boolean),
  );
  console.log("Protected-file gate passed");
}
