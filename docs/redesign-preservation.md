# Portfolio redesign: preservation and verification

The original six pages, 14 projects, three historical employers, skills, research, achievements, contact functionality, APIs, custom interactions, and assets were inventoried before redesign. Existing user edits in the legacy `index.html`, `script.js`, and `style.css` remain untouched. No original project, asset folder, component folder, or source-content file was deleted.

The initial inventory is `docs/preservation-baseline.json`. Source-backed changes authorized by the newly uploaded résumé and GitHub review are recorded separately in `docs/content-updates.json`, preserving the baseline for comparison. Run `node scripts/check-preservation.cjs`.

## Current sources

The current résumé is `Yash_Rana_ML_RESUME_v3.pdf`. Its GEXEL role, Video Scene Intelligence, abstractive summarization, professional summary, skills, location/relocation information and language proficiency have been merged. The local vision project and current public GitHub repositories were inspected. See [the GitHub/source audit](github-project-audit.md) for individual sources and corrections.

## Preservation map

| Original content / feature | Current location / behavior |
| --- | --- |
| Six pages `/`, `/about`, `/experience`, `/projects`, `/research`, `/contact` | All routes retained with one shared design system |
| Fourteen projects | All retained in a collection expanded to 19; current-source corrections are explicitly audited |
| Project descriptions, technology details and links | Shared `lib/projects.ts`; additional case-study content in `lib/project-details.ts` |
| F1 Vision | Remains prominently featured alongside Video Scene Intelligence, abstractive summarization, ML research, and Redline Markets |
| Old Text Summarizer URL | `/projects/text-summarizer` retained even though the display title now reflects abstractive summarization |
| Three historical jobs | All retained; current GEXEL role added first; shared `lib/experience.ts` also feeds chatbot knowledge |
| Two degrees, full skills/tools, research and achievements | Retained and updated across about/research pages; new AI stack and spoken languages added |
| Original images and PDFs | Original images unchanged; new résumé replaces current download while old PDF bytes remain at `/resume-software-development.pdf`; source PDFs untouched |
| Legacy homepage section anchors | `#hero`, `#about`, `#experience`, `#projects`, `#skills`, `#publications`, `#contact` all retained |
| Legacy index and résumé filenames | Permanent redirects retained, new résumé filename alias added |
| Contact form / Netlify detection / EmailJS endpoint | Preserved; accessible labels and success/error states; email matches résumé |
| Chatbot / `/api/chat` | Preserved, knowledge updated, model compatibility fixed; input/history validation improved |
| Command palette / keyboard navigation | Preserved with visible desktop links, mobile menu access, focus handling and empty-result fix |
| Space shooter / scores | Preserved in the lab section with explicit Play, keyboard controls, Quit, Escape and local score storage |
| Intro, motion, cursor, profile spotlight | Preserved or improved with shorter session intro and reduced-motion handling |
| SEO | Metadata retained and extended with route metadata, project metadata, sitemap, robots, PNG social preview |
| New vision material | Lead showcase, interactive pipeline walkthrough, detailed case study, original architecture diagram and download |

## Internal hierarchy

- **Featured:** Video Scene Intelligence, F1 Vision, Abstractive Text Summarization, Early Diabetes Detection, Redline Markets.
- **Strong:** Chess Application & Engine, Distributed Share Market, Online Movie Ticket Booking, Sales GPT, BERT Sentiment Analysis, Personal Wealth Intelligence Dashboard, Financial Fraud Detection.
- **Supporting:** Book Recommendation System, Style Fusion.
- **Older / lab:** F1 Prediction Market, Task Tracker CLI, Unit Converter, Number Guessing Game, YouTube Clone.

All projects remain accessible; hierarchy only changes emphasis. Older project dates are not invented. GitHub projects absent from the current public list have not been deleted.

## Intentional corrections

The new résumé and public source supersede outdated professional information and several unsupported project technologies. Exact expected changes, source references and reasons are recorded in `content-updates.json`; the preservation checker verifies these rather than allowing arbitrary edits. The old résumé is checked byte-for-byte in its archive location, and the new download is checked against the uploaded source.

Video project diagrams and the interactive preview are illustrative; the original local architecture document is also provided. The sample MP4 is not represented as a recording of the app or republished.

## Verification

- Production build, TypeScript and preservation checks passed.
- Browser checks passed with no runtime errors for six original routes at 320, 375, 768 and 1440px; all 19 detail pages; current GEXEL role; new video walkthrough and architecture image; project filters/search; command palette; accordion; game; résumé aliases; SEO resources; and API missing-input responses.
- Contact success/error and chatbot UI tests use mocked requests, so automated browser tests do not send mail or model queries.
- Model availability was checked against the existing Groq account. A separate live `/api/chat` request returned HTTP 200 and correctly described the GEXEL role and Video Scene Intelligence. Invalid non-string and oversized messages returned HTTP 400. Live mail delivery remains dependent on the existing Netlify/EmailJS configuration and is not exercised by these tests.
