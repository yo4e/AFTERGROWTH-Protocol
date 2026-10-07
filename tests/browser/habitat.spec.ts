import { test, expect } from "@playwright/test";
test("generation, lineage and day/night habitat are visible", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#generation")).toHaveText("gen-0000");
  await expect(page.locator("#lineage")).toContainText("origin");
  await expect(page.locator("#habitat")).toHaveAttribute("data-night", "false");
  await page.locator("#hour").fill("21");
  await expect(page.locator("#habitat")).toHaveAttribute("data-night", "true");
  await expect(page.locator("#health")).toContainText("production pending");
});
test("renderer exposes five flowers only after sunset for a mutation fixture", async ({
  page,
}) => {
  await page.route("**/api/world?hour=*", async (route) => {
    const response = await route.fetch();
    const world = await response.json();
    const hour = Number(
      new URL(route.request().url()).searchParams.get("hour"),
    );
    world.traits.lumenFlowers = true;
    world.phenotype.flowers = hour < 6 || hour >= 18 ? 5 : 0;
    await route.fulfill({ response, json: world });
  });
  await page.goto("/");
  await expect(page.locator("#habitat")).toHaveAttribute("data-night", "false");
  await expect(page.locator('[data-trait="lumen-flower"]')).toHaveCount(0);
  await page.locator("#hour").fill("21");
  await expect(page.locator('[data-trait="lumen-flower"]')).toHaveCount(5);
  await page.screenshot({ path: "test-results/habitat-night.png" });
  await page.locator("#hour").fill("12");
  await expect(page.locator('[data-trait="lumen-flower"]')).toHaveCount(0);
});
