# Production contact mode

For the production launch at `ranayash.netlify.app`, the contact form preserves the visitor's draft and opens a prefilled email to `yashrana2402@gmail.com`. The visitor sends it in their own email app. This mode is explicit and never shows “Message sent.”

Automatic EmailJS delivery is enabled only when `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` is supplied and differs from the template that failed the audit. Set the public service/key identifiers as needed, verify the template recipient, and rebuild to enable sending. The `/api/contact` compatibility endpoint is preserved; its separate account requirements remain below.

# Previous delivery audit

The active `/contact` page previously posted a Netlify-style form to `/`. A normal successful page response triggered “Message sent” without contacting an email provider. This was especially misleading in the local Next.js preview, where Netlify Forms does not process submissions.

The page now sends JSON directly to the existing EmailJS browser REST endpoint using the original service, template and public account identifiers. Only EmailJS's documented `200 OK` response triggers confirmation and clears the form. Errors and unconfirmed responses preserve the draft and expose a mailto link containing it. Requests time out after 20 seconds; no automatic retries occur. The form prevents concurrent submissions and retains its honeypot.

The existing `/api/contact` route remains available. It shares the template parameters, validates incoming data, and also requires explicit provider confirmation. Server use requires enabling non-browser requests in EmailJS Account → Security. If the account requires a private key, set `EMAILJS_PRIVATE_KEY` on the server only. The active browser form does not require this server setting.

## EmailJS account configuration

The code requests delivery to `yashrana2402@gmail.com`, but the template's dashboard settings ultimately determine the destination. In template `template_0w2rpis`, **To Email** must be `yashrana2402@gmail.com` or `{{to_email}}`, and **Reply To** should be `{{reply_to}}`. The message variables supplied include `from_name`, `from_email`, `subject`, `message`, plus the original `name` and `email` aliases. The old static script's setup comment mentions another mailbox; the actual dashboard settings cannot be inspected from repository files.

If provider acceptance is confirmed but mail is missing, check EmailJS Email History, the connected Gmail service `service_dtcqrgj`, the template recipient, and the recipient's spam folder. Account/domain restrictions or an expired email-service connection must be corrected in EmailJS. A provider confirmation means accepted for sending, not independently verified inbox arrival.

## Validation

- `node scripts/check-contact.cjs`: input validation, recipient/reply-to mapping, provider rejection, timeout/network errors, generic 2xx false-success regression, and accepted response. All provider calls are stubbed.
- `scripts/check-browser.cjs`: actual form error/retry/success states, draft preservation, prefilled email fallback, and message reset only after provider acceptance. Email requests are intercepted; no mail is sent.
- `npm run build` and `node scripts/check-preservation.cjs` verify the build and existing portfolio content.

A single authorized live browser test during the full site audit was rejected with HTTP 400: **“The template ID not found.”** No provider acceptance occurred. A valid template ID from the EmailJS dashboard is required; configure `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and rebuild. Inbox arrival remains unverified. The automated regression suites still intercept email requests and never send mail.

References: [EmailJS REST send](https://www.emailjs.com/docs/rest-api/send/), [EmailJS Node SDK server setting](https://github.com/emailjs-com/emailjs-nodejs#usage).
