export type AcceptanceAssertion =
  | { kind: "trait-includes"; collection: "flora" | "fauna"; value: string }
  | { kind: "trait-equals"; trait: "lumenFlowers"; expected: boolean }
  | { kind: "flowers-at-hour"; hour: number; expected: number }
  | { kind: "night-at-hour"; hour: number; expected: boolean };
export function validateAcceptance(
  value: unknown,
): asserts value is AcceptanceAssertion[] {
  if (!Array.isArray(value) || value.length < 1 || value.length > 16)
    throw new Error("Acceptance requires 1–16 assertions");
  for (const assertion of value) {
    if (!assertion || typeof assertion !== "object" || Array.isArray(assertion))
      throw new Error("Invalid acceptance assertion");
    let keys: string[];
    switch (assertion.kind) {
      case "trait-includes":
        keys = ["kind", "collection", "value"];
        if (
          !["flora", "fauna"].includes(assertion.collection) ||
          typeof assertion.value !== "string" ||
          !/^[a-z][a-z0-9-]{0,63}$/.test(assertion.value)
        )
          throw new Error("Invalid trait assertion");
        break;
      case "trait-equals":
        keys = ["kind", "trait", "expected"];
        if (
          assertion.trait !== "lumenFlowers" ||
          typeof assertion.expected !== "boolean"
        )
          throw new Error("Invalid trait assertion");
        break;
      case "flowers-at-hour":
      case "night-at-hour":
        keys = ["kind", "hour", "expected"];
        if (
          !Number.isInteger(assertion.hour) ||
          assertion.hour < 0 ||
          assertion.hour > 23
        )
          throw new Error("Invalid acceptance hour");
        if (
          assertion.kind === "flowers-at-hour"
            ? !Number.isInteger(assertion.expected) ||
              assertion.expected < 0 ||
              assertion.expected > 1000
            : typeof assertion.expected !== "boolean"
        )
          throw new Error("Invalid acceptance expectation");
        break;
      default:
        throw new Error("Unsupported acceptance vocabulary");
    }
    if (
      Object.keys(assertion).length !== keys.length ||
      Object.keys(assertion).some((key) => !keys.includes(key))
    )
      throw new Error("Unsupported acceptance fields");
  }
}
