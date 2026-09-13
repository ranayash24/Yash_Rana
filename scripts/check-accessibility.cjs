const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const report = [];
  const inspect = async (name) => {
    await page.waitForTimeout(800);
    await page.addScriptTag({
      path: require.resolve(process.env.AXE_MODULE || "axe-core/axe.min.js"),
    });
    const r = await page.evaluate(() =>
      axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
        },
      }),
    );
    report.push({
      name,
      violations: r.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  };
  for (const path of [
    "/",
    "/about",
    "/experience",
    "/projects",
    "/research",
    "/contact",
    "/projects/video-scene-intelligence",
  ]) {
    await page.goto(
      (process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000") + path,
      { waitUntil: "networkidle" },
    );
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 500
    ) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await inspect(path);
  }
  await page.setViewportSize({ width: 375, height: 667 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByLabel("Search pages").focus();
  await inspect("mobile navigation");
  await page.keyboard.press("Escape");
  await page
    .getByRole("dialog", { name: "Navigate portfolio" })
    .waitFor({ state: "hidden" });
  await page.getByRole("button", { name: "Toggle AI chat" }).click();
  await page.getByLabel("Ask about Yash").focus();
  await inspect("mobile chatbot");
  fs.writeFileSync(
    "docs/accessibility-audit.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      report.map((r) => ({
        name: r.name,
        violations: r.violations.map((v) => ({
          id: v.id,
          count: v.nodes.length,
        })),
      })),
      null,
      2,
    ),
  );
  if (report.some((r) => r.violations.length)) process.exitCode = 1;
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
