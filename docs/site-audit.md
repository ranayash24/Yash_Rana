# Portfolio audit — 12 September 2026

The audit covers the local production build and public destinations linked from it. Changes have not been deployed. Every original project, page, résumé alias, and preserved asset remains available. This report distinguishes tested behavior from external settings that the repository cannot establish.

## Issues found and changes made

| Finding | Evidence | Resolution |
| --- | --- | --- |
| Contact delivery blocked | One authorized real browser submission received EmailJS HTTP 400: “The template ID not found.” | The form correctly retains the message and shows failure. Added build-time EmailJS settings. **Still requires the account's valid Template ID; inbox delivery is not verified.** |
| Three project source URLs unavailable publicly | GitHub returned 404 for `DSMS`, `bert_sentiment`, and `book_recommended_system`; none appears in the current public repository list. | Kept all three projects, their details, and original source addresses in project data. The buttons now show “GitHub · currently unavailable” instead of sending visitors to 404 pages. The chatbot knowledge also excludes unavailable destinations. This does not establish whether repositories are private, renamed, or deleted. |
| Two source buttons misleading | F1 Vision and Sales GPT linked to the GitHub profile. | Relabeled both “GitHub profile”; did not invent repository URLs. |
| Previous movie-booking demo fails to populate content | The old demo returns HTTP 200 but its browser data requests fail with four 401 errors. | Marked the previous demo unavailable. Kept the working newer demo, source link, project, and case study. |
| SEO domain does not resolve | DNS lookup for the hard-coded `yashrana.dev` failed. | Canonicals, sharing metadata, sitemap and robots now use `NEXT_PUBLIC_SITE_URL`, Netlify's production `URL`, or Vercel's production hostname. Local and preview builds are marked noindex. **Actual production domain still needs confirmation.** |
| Vulnerable framework and dependencies | Initial production audit: 1 critical and 2 high affected packages, including Next.js 14.2.29. | Upgraded to Next.js 15.5.24 / React 19.3.0, migrated asynchronous route parameters, patched PostCSS and compatible transitive dependencies. Final full npm audit: **0 known vulnerabilities**. |
| Menu keyboard behavior | Window-wide Enter handling could select a route while the close button had focus. A rapid route-change/reopen sequence could retain an empty-result search. | Enter selects a search result only from the search input; opening and Escape reset the search. Mobile destinations and focus restoration have regression checks. |
| Chatbot reliability | `null` JSON yielded HTTP 500; timeout cleanup did not run on every failure; duplicate sends were guarded only by rendered state. | Reject malformed/null payloads with HTTP 400, enforce the existing 4,000-character limit in the UI, clear timers reliably, add a synchronous send guard, bound provider requests to 20 seconds without retries, and reject empty provider replies. |
| Accessibility | Unnamed decorative skill SVGs, an inline download link distinguished only by color, and two low-contrast chat labels. | Marked decorative icons appropriately, underlined the download link, increased label contrast, and made the skip-link target focusable. |
| Stale documentation | README still described Netlify Forms and contained older contact links. | Updated contact setup, framework version, LinkedIn, email, and domain configuration instructions. |

## Verification

- Production build, TypeScript and lint checks pass on Next.js 15.5.24.
- Preservation check covers 6 original routes, 2 APIs, all 19 project records, 6 original assets, 7 legacy anchors and all 4 employers.
- Link crawl covers 25 rendered pages, 57 unique internal/email destinations, and 23 loaded resources, with no broken active internal links, missing fragments, broken images, unnamed links, or runtime exceptions detected.
- Of 18 active external destinations, 17 returned HTTP 200; LinkedIn returned 999 and cannot be automatically verified. Original unavailable URLs remain documented in the before-audit and project data.
- Browser regression checks cover responsive layouts at 320, 375, 768 and 1440px; every project detail page; filters/search/empty states; mobile and keyboard navigation; experience expansion; video pipeline controls and citations; résumé aliases; sitemap, robots and Open Graph; contact error/retry/acceptance states; chatbot UI; and space-shooter launch/play/shoot/exit.
- Negative requests cover invalid API payloads, unsupported API methods, unknown pages/projects, and attempts to fetch `.env.local` or `.git/config`.
- The real chatbot returned HTTP 200 with the correct employer and video project. Automated form/chat regressions intercept provider delivery and do not send emails.
- Automated WCAG A/AA checks found no remaining violations on the six main pages, video case study, mobile navigation and mobile chat after animations settled. This is an automated sample, not a full accessibility certification.
- The client bundle scan did not find the local private environment values. Those values were never printed or copied to audit artifacts.

## External limitations and follow-up

1. Replace the invalid EmailJS template using `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, verify its recipient is `yashrana2402@gmail.com`, rebuild, then confirm a permitted test in the actual inbox. EmailJS account settings and connected mailbox credentials cannot be inspected from the public identifiers.
2. Confirm the real production URL and deploy these local changes. DNS, host configuration, provider quotas and production abuse protection are not established by localhost tests. In particular, per-visitor API rate limits and EmailJS domain/CAPTCHA settings need verification in the hosting/provider accounts.
3. LinkedIn requires a manual check in a normal browser because it blocks automated requests.
4. External demos were inspected without creating accounts, submitting payments or altering data. The newer booking demo displays movie listings; WealthIQ's landing page opens; Redline renders without runtime errors and explicitly uses simulated telemetry, with a stale March race countdown. Authenticated/backend flows in those separate applications are not certified by this portfolio audit.

No test suite can establish that every future network response or security scenario will work perfectly. The unresolved items above are explicit blockers or limits, not silently treated as passes.

## Evidence and repeatable checks

- [Original link crawl](link-audit-before.json), [current link crawl](link-audit.json)
- [Live service checks](service-audit.json), [accessibility results](accessibility-audit.json), [dependency audit](dependency-audit.json)
- `node scripts/check-preservation.cjs`
- `node scripts/check-contact.cjs` (no emails sent)
- `node scripts/check-browser.cjs` (set `PLAYWRIGHT_MODULE` if installed externally)
- `node scripts/audit-links.cjs`
- `node scripts/check-accessibility.cjs` (requires Playwright and axe-core; optionally set `AXE_MODULE`)
- `npm run build` and `npm audit`

References: [Next.js 15 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-15), [EmailJS send API](https://www.emailjs.com/docs/rest-api/send/), [public GitHub repositories](https://api.github.com/users/ranayash24/repos?per_page=100), [published research](https://www.atlantis-press.com/proceedings/icaaai-25/126012636).
