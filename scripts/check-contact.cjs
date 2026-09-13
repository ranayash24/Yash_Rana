// Provider responses are stubbed: this check never sends an email.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
let calls = [];
let reply = () => new Response("OK", { status: 200 });
const fakeFetch = async (url, options) => {
  calls.push({ url, ...options });
  return reply();
};
const compile = (
  file,
  imports = {},
  env = { NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "template_mock_only" },
) => {
  const scope = {
    exports: {},
    fetch: fakeFetch,
    AbortSignal,
    process: { env },
    console: { error() {} },
    require: (name) => {
      assert(name in imports, `Unexpected import: ${name}`);
      return imports[name];
    },
  };
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(file, "utf8"), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
      },
    }).outputText,
    scope,
  );
  return scope.exports;
};
const contact = compile("lib/contact.ts");
const { POST } = compile("app/api/contact/route.ts", {
  "@/lib/contact": contact,
  "next/server": {
    NextResponse: { json: (data, options) => Response.json(data, options) },
  },
});
const form = {
  name: " Test Sender ",
  email: "qa@example.com",
  subject: "",
  message: "A local mocked test.",
};
const request = (data) => ({ json: async () => data });
(async () => {
  const unconfigured = compile("lib/contact.ts", {}, {});
  assert.equal(unconfigured.emailDeliveryConfigured, false);
  await assert.rejects(unconfigured.sendContactEmail(form));
  assert.equal(
    calls.length,
    0,
    "Unconfigured delivery must not contact the provider",
  );
  for (const invalid of [
    null,
    {},
    { ...form, name: 1 },
    { ...form, email: "invalid" },
    { ...form, message: " " },
    { ...form, message: "x".repeat(10001) },
    { ...form, "bot-field": "spam" },
  ]) {
    assert.equal((await POST(request(invalid))).status, 400);
  }
  assert.equal(
    (
      await POST({
        json: async () => {
          throw Error("bad JSON");
        },
      })
    ).status,
    400,
  );
  assert.equal(calls.length, 0, "Invalid messages must never contact EmailJS");
  for (const response of [
    () => new Response("Unavailable", { status: 500 }),
    () => new Response("<html>Homepage</html>"),
    () => new Response("OK", { status: 202 }),
    () => {
      throw Error("Timeout");
    },
  ]) {
    reply = response;
    await assert.rejects(contact.sendContactEmail(form));
    const result = await POST(request(form));
    assert.equal(result.status, 502);
    assert.equal((await result.json()).success, undefined);
  }
  reply = () => new Response("OK");
  await contact.sendContactEmail(form);
  const result = await POST(request(form));
  assert.equal(result.status, 200);
  assert.deepEqual(await result.json(), { success: true });
  for (const call of calls) {
    assert.equal(call.url, "https://api.emailjs.com/api/v1.0/email/send");
    assert(call.signal, "Each request needs a timeout");
    const data = JSON.parse(call.body);
    assert.equal(data.template_params.to_email, "yashrana2402@gmail.com");
    assert.equal(data.template_params.from_name, "Test Sender");
    assert.equal(data.template_params.reply_to, "qa@example.com");
    assert.equal(
      data.template_params.subject,
      "Portfolio contact from Test Sender",
    );
  }
  console.log(
    "Contact passed: validation, recipient/reply-to, timeout/network failure, provider rejection, false-success regression, and confirmed acceptance. No emails sent.",
  );
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
