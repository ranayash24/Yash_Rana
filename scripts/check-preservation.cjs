const fs = require("node:fs");
const crypto = require("node:crypto");
const vm = require("node:vm");
const ts = require("typescript");
const assert = require("node:assert/strict");
const baseline = JSON.parse(
  fs.readFileSync("docs/preservation-baseline.json", "utf8"),
);
const updates = JSON.parse(
  fs.readFileSync("docs/content-updates.json", "utf8"),
);
const compiled = ts.transpileModule(
  fs.readFileSync("lib/projects.ts", "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText;
const scope = { exports: {} };
vm.runInNewContext(compiled, scope);
const projects = JSON.parse(JSON.stringify(scope.exports.projects));
for (const route of baseline.routes)
  assert.ok(
    fs.existsSync(`app${route === "/" ? "" : route}/page.tsx`),
    `Missing route: ${route}`,
  );
for (const route of baseline.apis)
  assert.ok(fs.existsSync(`app${route}/route.ts`), `Missing API: ${route}`);
for (const [asset, hash] of Object.entries(baseline.assets)) {
  assert.ok(fs.existsSync(asset), `Missing asset: ${asset}`);
  assert.equal(
    crypto
      .createHash("sha256")
      .update(
        fs.readFileSync(
          asset === "public/resume.pdf" ? updates.previousResume : asset,
        ),
      )
      .digest("hex"),
    hash,
    `Existing asset changed: ${asset}`,
  );
}
for (const original of baseline.projectRecords) {
  const current = projects.find((p) => p.num === original.num);
  const expected = { ...original, ...updates.projectUpdates[original.num] };
  assert.ok(current, `Missing project: ${original.title}`);
  assert.equal(current.title, expected.title);
  const oldSlug = original.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
  assert.equal(
    scope.exports.projectId(current),
    oldSlug,
    `Original URL changed: ${original.title}`,
  );
  assert.equal(
    current.desc,
    expected.desc,
    `Description lost: ${original.title}`,
  );
  assert.deepEqual(
    current.tech,
    expected.tech,
    `Technologies lost: ${original.title}`,
  );
  assert.deepEqual(
    current.tags,
    expected.tags,
    `Categories lost: ${original.title}`,
  );
}
const home =
  fs.readFileSync("app/page.tsx", "utf8") +
  fs.readFileSync("components/hero-section.tsx", "utf8") +
  fs.readFileSync("components/featured-work.tsx", "utf8") +
  fs.readFileSync("components/site-footer.tsx", "utf8");
for (const anchor of baseline.legacy_anchors)
  assert.ok(
    home.includes(`id="${anchor}"`),
    `Missing legacy anchor: ${anchor}`,
  );
assert.equal(
  crypto
    .createHash("sha256")
    .update(fs.readFileSync("public/resume.pdf"))
    .digest("hex"),
  updates.resumeSha256,
  "Current résumé differs from approved uploaded source",
);
assert.equal(
  Buffer.compare(
    fs.readFileSync("public/resume.pdf"),
    fs.readFileSync(updates.resumeSource),
  ),
  0,
);
for (const num of updates.newProjectIds)
  assert.ok(
    projects.some((p) => p.num === num),
    `Missing new project ${num}`,
  );
const jobs = fs.readFileSync("lib/experience.ts", "utf8");
for (const name of [
  "GEXEL Telecom International",
  "Blue Data Consulting",
  "The Sparks Foundation",
  "DevTown",
])
  assert.ok(jobs.includes(name), `Missing employer: ${name}`);
console.log(
  `Preservation passed: ${baseline.routes.length} routes, ${baseline.apis.length} APIs, ${projects.length} complete project records, ${Object.keys(baseline.assets).length} preserved original assets (previous résumé archived), ${baseline.legacy_anchors.length} legacy anchors, and all 4 employers.`,
);
