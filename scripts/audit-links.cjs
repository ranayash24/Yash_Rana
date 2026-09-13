const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("node:fs");
const ts = require("typescript");
const vm = require("node:vm");
const scope = { exports: {} };
vm.runInNewContext(
  ts.transpileModule(fs.readFileSync("lib/projects.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  scope,
);
const base = process.env.PORTFOLIO_BASE_URL || "http://127.0.0.1:3000";
const paths = [
  "/",
  "/about",
  "/experience",
  "/projects",
  "/research",
  "/contact",
  ...scope.exports.projects.map(
    (p) => "/projects/" + scope.exports.projectId(p),
  ),
];
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const report = {
    checkedAt: new Date().toISOString(),
    base,
    pages: [],
    links: [],
    assets: [],
    issues: [],
    external: [],
  };
  page.on("pageerror", (e) =>
    report.issues.push({
      type: "runtime",
      message: e.message,
      url: page.url(),
    }),
  );
  const links = new Map();
  const assets = new Set();
  for (const path of paths) {
    const response = await page.goto(base + path, { waitUntil: "networkidle" });
    const data = await page.evaluate(() => ({
      title: document.title,
      h1: document.querySelectorAll("h1").length,
      ids: Array.from(document.querySelectorAll("[id]"), (el) => el.id),
      links: Array.from(document.querySelectorAll("a[href]"), (a) => ({
        href: a.href,
        text: a.innerText.trim() || a.getAttribute("aria-label") || "",
        target: a.target,
        rel: a.rel,
      })),
      assets: Array.from(
        document.querySelectorAll(
          'img[src],script[src],link[rel="stylesheet"]',
        ),
        (el) => el.src || el.href,
      ),
      images: Array.from(document.images, (img) => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0,
        alt: img.hasAttribute("alt"),
      })),
      description: document.querySelector('meta[name="description"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
    }));
    report.pages.push({
      path,
      status: response.status(),
      ...data,
      links: undefined,
      assets: undefined,
    });
    if (response.status() !== 200 || data.h1 !== 1 || !data.description)
      report.issues.push({
        type: "page",
        path,
        status: response.status(),
        h1: data.h1,
      });
    if (new Set(data.ids).size !== data.ids.length)
      report.issues.push({ type: "duplicate-id", path });
    for (const img of data.images)
      if (!img.loaded || !img.alt)
        report.issues.push({ type: "image", path, ...img });
    data.assets.forEach((src) => assets.add(src));
    for (const link of data.links) {
      if (!links.has(link.href)) links.set(link.href, { ...link, sources: [] });
      links.get(link.href).sources.push(path);
      if (link.target === "_blank" && !/noopener|noreferrer/.test(link.rel))
        report.issues.push({ type: "unsafe-target", path, ...link });
      if (!link.text)
        report.issues.push({ type: "unnamed-link", path, ...link });
    }
  }
  for (const link of links.values()) {
    const url = new URL(link.href);
    if (url.origin === base) {
      const r = await page.request.get(link.href);
      const item = { ...link, status: r.status(), final: r.url() };
      if (r.status() !== 200)
        report.issues.push({ type: "internal-link", ...item });
      if (url.hash) {
        const target = report.pages.find((p) => p.path === url.pathname);
        item.fragmentExists = !!target?.ids.includes(
          decodeURIComponent(url.hash.slice(1)),
        );
        if (!item.fragmentExists)
          report.issues.push({ type: "fragment", ...item });
      }
      report.links.push(item);
    } else if (url.protocol === "mailto:") {
      report.links.push({
        ...link,
        status: "email-app link; inbox not implied",
      });
    } else if (url.protocol === "https:") report.external.push(link);
    else report.issues.push({ type: "unsupported-link", ...link });
  }
  for (const src of assets) {
    const r = await page.request.get(src);
    report.assets.push({ src, status: r.status() });
    if (r.status() !== 200)
      report.issues.push({ type: "asset", src, status: r.status() });
  }
  const canonical = report.pages[0].canonical;
  if (
    canonical &&
    new URL(canonical).origin !== base &&
    !["localhost", "127.0.0.1"].includes(new URL(canonical).hostname)
  ) {
    report.external.push({
      href: canonical,
      sources: ["metadataBase", "sitemap"],
    });
  }
  let cursor = 0;
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (cursor < report.external.length) {
        const entry = report.external[cursor++];
        try {
          const r = await page.request.get(entry.href, { timeout: 20000 });
          entry.status = r.status();
          entry.final = r.url();
          const html = await r.text();
          entry.title = html
            .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
            ?.trim();
          entry.deploymentMissing =
            /DEPLOYMENT_NOT_FOUND|This deployment has been disabled|Site not found/i.test(
              html,
            );
        } catch (e) {
          entry.status = "unverified";
          entry.error = e.message.split("\n")[0];
        }
        console.log(entry.status, entry.href, entry.title || entry.error || "");
      }
    }),
  );
  fs.writeFileSync(
    "docs/link-audit.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        pages: report.pages.length,
        internalAndMailLinks: report.links.length,
        assets: report.assets.length,
        external: report.external.length,
        issues: report.issues,
      },
      null,
      2,
    ),
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
