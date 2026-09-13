const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const baseline = JSON.parse(fs.readFileSync("docs/preservation-baseline.json"));
const ts = require("typescript");
const vm = require("node:vm");
const scope = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("lib/projects.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  scope,
);
const projects = scope.exports.projects;
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) =>
    errors.push({ message: e.message, stack: e.stack, url: page.url() }),
  );
  const go = async (path) => {
    const r = await page.goto(base + path, { waitUntil: "networkidle" });
    assert.equal(r.status(), 200, path);
    await page.locator(".site-header").waitFor();
  };
  await go("/");
  await page.screenshot({ path: "/tmp/yash-home-desktop.png", fullPage: true });
  await page.screenshot({ path: "/tmp/yash-hero-desktop.png" });
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of baseline.routes) {
      await go(route);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${route} overflow at ${width}`,
      );
    }
  }
  console.log("All six routes fit 320, 375, 768 and 1440px.");
  for (const p of projects) {
    await go("/projects/" + scope.exports.projectId(p));
    assert.equal(await page.locator("h1").innerText(), p.title);
  }
  console.log(`All ${projects.length} project detail pages return 200.`);
  await go("/projects/video-scene-intelligence");
  for (const label of ["02 / Understand", "03 / Retrieve", "01 / Extract"]) {
    const button = page.getByRole("button", { name: label, exact: true });
    await button.click();
    assert.equal(await button.getAttribute("aria-pressed"), "true");
  }
  await page
    .getByRole("button", { name: "03 / Retrieve", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Show illustrative moment 00:45" })
    .click();
  assert.equal(await page.locator(".vision-time").innerText(), "00:45");
  assert.equal(
    await page
      .locator(".architecture-figure img")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
    true,
  );
  await go("/experience");
  assert(
    await page
      .getByText("GEXEL Telecom International", { exact: true })
      .isVisible(),
  );
  assert(
    await page.getByText("Jun 2026 — Present", { exact: true }).isVisible(),
  );
  console.log(
    "New current role, video walkthrough, citations, and architecture image passed.",
  );
  await go("/projects");
  assert.equal(await page.locator(".project-card").count(), projects.length);
  await page.getByRole("button", { name: "AI / ML", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 11);
  await page.getByRole("searchbox").fill("BERT");
  assert.equal(await page.locator(".project-card").count(), 1);
  await page.getByRole("searchbox").fill("does-not-exist");
  assert(await page.getByText("No projects match this search.").isVisible());
  await page.getByRole("button", { name: "Show all projects" }).click();
  assert.equal(await page.locator(".project-card").count(), projects.length);
  await page.keyboard.press("Meta+k");
  await page
    .getByRole("textbox", { name: "Search pages", exact: true })
    .fill("research");
  await page.keyboard.press("Enter");
  await page.waitForURL("**/research");
  await page.keyboard.press("Meta+k");
  await page
    .getByRole("textbox", { name: "Search pages", exact: true })
    .fill("nonsense");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");
  await page
    .getByRole("dialog", { name: "Navigate portfolio" })
    .waitFor({ state: "hidden" });
  console.log(
    "Project filtering, search, empty state and keyboard palette passed.",
  );
  // Mobile destinations and keyboard close must work independently of search selection.
  await page.setViewportSize({ width: 375, height: 667 });
  for (const [label, path] of [
    ["Home", "/"],
    ["About", "/about"],
    ["Experience", "/experience"],
    ["Projects", "/projects"],
    ["Research", "/research"],
    ["Contact", "/contact"],
  ]) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .getByRole("dialog", { name: "Navigate portfolio" })
      .getByRole("button", { name: label, exact: true })
      .click();
    await page.waitForURL(base + path);
    await page
      .getByRole("dialog", { name: "Navigate portfolio" })
      .waitFor({ state: "hidden" });
  }
  await page.keyboard.press("Control+k");
  await page.getByLabel("Search pages").focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page
    .getByRole("dialog", { name: "Navigate portfolio" })
    .waitFor({ state: "hidden" });
  assert.equal(
    page.url(),
    base + "/contact",
    "Enter on Close must not navigate",
  );
  assert.equal(
    await page
      .getByRole("button", { name: "Open navigation" })
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  console.log(
    "All mobile menu destinations, keyboard close, and focus restoration passed.",
  );
  await go("/experience");
  assert.equal(await page.getByRole("button", { expanded: true }).count(), 1);
  await page
    .getByRole("button", { name: /Data Analyst \/ Data Science Intern/ })
    .click();
  assert(
    await page.getByText(/Performed exploratory data analysis/).isVisible(),
  );
  await go("/contact");
  const emailEndpoint = "https://api.emailjs.com/api/v1.0/email/send";
  let submitted;
  let emailResponse = { status: 500, body: "Unavailable" };
  // Never send a real email from this automated suite.
  await page.route(emailEndpoint, async (route) => {
    submitted = route.request().postDataJSON();
    if (emailResponse === null) return route.abort("failed");
    await route.fulfill({ ...emailResponse, contentType: "text/plain" });
  });
  await page.getByLabel("Name", { exact: true }).fill("Portfolio QA");
  await page.getByLabel("Email", { exact: true }).fill("qa@example.com");
  await page.getByLabel("Subject", { exact: true }).fill("Local test");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Mocked request; no message is sent.");
  if (
    await page
      .getByRole("link", { name: "Open email app", exact: false })
      .count()
  ) {
    const draft = new URL(
      await page
        .getByRole("link", { name: "Open email app", exact: false })
        .getAttribute("href"),
    );
    assert.equal(draft.protocol, "mailto:");
    assert.equal(draft.pathname, "yashrana2402@gmail.com");
    assert.equal(draft.searchParams.get("subject"), "Local test");
    assert(
      draft.searchParams
        .get("body")
        .includes("Mocked request; no message is sent."),
    );
    assert(draft.searchParams.get("body").includes("qa@example.com"));
    assert.equal(
      submitted,
      undefined,
      "Email-app mode must not contact an unconfigured provider",
    );
    assert.equal(
      await page
        .getByRole("status")
        .filter({ hasText: "Message sent" })
        .count(),
      0,
    );
  } else {
    await page.getByRole("button", { name: "Send Message" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "couldn't confirm" })
      .waitFor();
    const preservedMessage = async () => {
      assert.equal(
        await page.getByLabel("Message", { exact: true }).inputValue(),
        "Mocked request; no message is sent.",
      );
      assert.equal(
        await page.getByLabel("Email", { exact: true }).inputValue(),
        "qa@example.com",
      );
    };
    await preservedMessage();
    const fallback = new URL(
      await page
        .getByRole("link", { name: "open it in your email app" })
        .getAttribute("href"),
    );
    assert.equal(fallback.pathname, "yashrana2402@gmail.com");
    assert.equal(fallback.searchParams.get("subject"), "Local test");
    assert(
      fallback.searchParams
        .get("body")
        .includes("Mocked request; no message is sent."),
    );
    // Regression: a successful HTTP response containing a page is not email success.
    emailResponse = {
      status: 200,
      body: "<!doctype html><html>Homepage</html>",
    };
    await page.getByRole("button", { name: "Try again" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "couldn't confirm" })
      .waitFor();
    await preservedMessage();
    emailResponse = null;
    await page.getByRole("button", { name: "Try again" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "couldn't confirm" })
      .waitFor();
    await preservedMessage();
    emailResponse = { status: 200, body: "OK" };
    await page.getByRole("button", { name: "Try again" }).click();
    await page
      .getByRole("status")
      .filter({ hasText: "Message sent" })
      .waitFor();
    assert.equal(submitted.service_id, "service_dtcqrgj");
    assert(
      submitted.template_id && submitted.template_id !== "template_0w2rpis",
    );
    assert.equal(submitted.template_params.from_name, "Portfolio QA");
    assert.equal(submitted.template_params.reply_to, "qa@example.com");
    assert.equal(submitted.template_params.to_email, "yashrana2402@gmail.com");
    assert.equal(
      submitted.template_params.message,
      "Mocked request; no message is sent.",
    );
    await page.getByRole("button", { name: "Send another message" }).click();
    assert.equal(
      await page.getByLabel("Message", { exact: true }).inputValue(),
      "",
    );
  }
  await page.unroute(emailEndpoint);
  await page.route("**/api/chat", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        reply: "Yash graduated from Concordia in May 2026.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Toggle AI chat" }).click();
  await page.getByLabel("Ask about Yash").fill("When did Yash graduate?");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await page.getByText("Yash graduated from Concordia in May 2026.").waitFor();
  await page.keyboard.press("Escape");
  console.log(
    "Contact error/success and chatbot conversation passed with mocked delivery.",
  );
  await go("/");
  await page.getByRole("button", { name: /Launch space shooter/ }).click();
  await page.getByRole("button", { name: "Play", exact: true }).waitFor();
  await page.keyboard.press("w");
  assert(
    await page.getByRole("button", { name: "Play", exact: true }).isVisible(),
  );
  await page.getByRole("button", { name: "Play", exact: true }).click();
  await page.getByRole("button", { name: "Quit Game (Esc)" }).waitFor();
  await page.keyboard.press("Space");
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("dialog", { name: "Space shooter", exact: true })
      .count(),
    0,
  );
  console.log(
    "Space shooter launch, explicit play, shooting and Escape close passed.",
  );
  for (const url of [
    "/resume.pdf",
    "/Yash_Vianychandra_Rana.pdf",
    "/Yash_Rana_SD_RESUME.pdf",
    "/Yash_Rana_ML_RESUME_v3.pdf",
    "/resume-software-development.pdf",
  ]) {
    const r = await page.request.get(base + url);
    assert.equal(r.status(), 200);
    assert((await r.body()).subarray(0, 4).equals(Buffer.from("%PDF")));
  }
  for (const url of [
    "/index.html",
    "/sitemap.xml",
    "/robots.txt",
    "/opengraph-image",
  ]) {
    const r = await page.request.get(base + url);
    assert.equal(r.status(), 200, url);
  }
  for (const url of ["/api/chat", "/api/contact"]) {
    for (const body of ["{}", "null", "{", "[]"]) {
      const r = await page.request.post(base + url, {
        data: body,
        headers: { "Content-Type": "application/json" },
      });
      assert.equal(r.status(), 400, `${url}: ${body}`);
    }
    assert.equal((await page.request.get(base + url)).status(), 405);
  }
  for (const path of [
    "/does-not-exist",
    "/projects/does-not-exist",
    "/.env.local",
    "/.git/config",
  ]) {
    assert.equal((await page.request.get(base + path)).status(), 404, path);
  }
  console.log(
    "Resume aliases, legacy index, sitemap, robots, OG image and API validation passed.",
  );
  await page.setViewportSize({ width: 375, height: 812 });
  await go("/");
  await page.screenshot({ path: "/tmp/yash-home-mobile.png", fullPage: true });
  await page.screenshot({ path: "/tmp/yash-hero-mobile.png" });
  await go("/contact");
  await page.screenshot({
    path: "/tmp/yash-contact-mobile.png",
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log("No browser runtime errors.");
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
