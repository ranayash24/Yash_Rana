# Résumé and GitHub update — 11 September 2026

Sources: `Yash_Rana_ML_RESUME_v3.pdf`, the live [public repositories API](https://api.github.com/users/ranayash24/repos?per_page=100&sort=updated), repository READMEs/source trees, and the user-designated local folder `/Users/yashvinaychadrarana/Documents/Project/vision`.

The live API returned 13 public repositories. An older cached GitHub profile contained stale repository counts, so it was not used as the current inventory. Existing projects absent from the public list have been preserved; absence does not establish that the project never existed.

| Public repository | Website action / verified scope |
| --- | --- |
| [transcript](https://github.com/ranayash24/transcript) | Added Video Scene Intelligence as the lead project. Local source verifies FFmpeg, faster-whisper, Gemini, Qdrant, FastAPI, Celery/Redis, PostgreSQL, MinIO, SSE and Next.js. |
| [Text_summarizer_project](https://github.com/ranayash24/Text_summarizer_project) | Updated name and description from the new résumé, keeping `/projects/text-summarizer`. Public source contains configuration, ingestion/validation and research notebooks; no invented model score or production demo. |
| [Chess_Engine](https://github.com/ranayash24/Chess_Engine) | Updated current implementation to C++17 / SDL2, with threaded AI, alpha-beta search, quiescence, iterative deepening and transposition caching. Earlier Python work is retained in case-study context. |
| [F1_prediction_market](https://github.com/ranayash24/F1_prediction_market) | Redline Markets and its live demo retained. Earlier F1 Prediction Market record is also retained; the current repository is Redline Markets. |
| [Task_Tracker_CLI](https://github.com/ranayash24/Task_Tracker_CLI) | Corrected to Java and JSON file persistence; linked exact source. Old Python/Click/SQLite claims did not match the current public project. |
| [unit-converter](https://github.com/ranayash24/unit-converter) | Corrected to React/Vite + Java/Spring Boot; verified length, weight and temperature categories. Removed unsupported 100+ units/currency/history claims. |
| [PERSONAL_WEALTH_DASHBOARD](https://github.com/ranayash24/PERSONAL_WEALTH_DASHBOARD) | Added dashboard, source and repository-provided demo link. Asset management, Recharts analytics, CSV import, authentication, and encrypted storage are described. Roadmap items (market sync and Python service) are not represented as shipped. |
| [Fraud_detection](https://github.com/ranayash24/Fraud_detection) | Added imbalanced transaction classification notebook, with cleaning, feature engineering, VIF, Decision Tree / Random Forest, precision/recall/F1. No unverified accuracy score. |
| [Guess_Number](https://github.com/ranayash24/Guess_Number) | Added Spring Boot CLI game in the engineering/lab collection. |
| [Youtube_Clone](https://github.com/ranayash24/Youtube_Clone) | Added older engineering project using the repository's Play Framework / Akka description and HTML language metadata. No README was available; description remains brief. |
| [style_fusion](https://github.com/ranayash24/style_fusion) | Existing neural-style-transfer project and link retained. |
| [book-my-show](https://github.com/ranayash24/book-my-show) | Existing project, both demo links and source retained. Repository README is generic; richer content remains sourced from the résumés. |
| [Yash_Rana](https://github.com/ranayash24/Yash_Rana) | This portfolio repository; not added as a redundant project card. |

## Video project presentation

The local source matches the `transcript` repository. The original architecture SVG is copied intact to `public/projects/video-scene-intelligence-architecture.svg` and available as a download. `videoplayback.mp4` is sample source footage of a speaker, not a recording of the project interface, so it is not published as a project demo. The new interactive component is explicitly labeled an illustrative walkthrough and does not pretend to execute inference.

## Professional corrections

- Current role: Technical Specialist, Network & Connectivity at GEXEL Telecom International; June 2026–present; Montréal, QC. Added across hero, homepage timeline, experience, about, metadata and chatbot knowledge.
- Existing Blue Data Consulting, Sparks Foundation and DevTown entries retained. Sparks title updated and data-quality details merged; Blue Data stakeholder collaboration added.
- Summary now foregrounds 1.5+ years of applied ML and generative AI experience from the new résumé.
- Added relocation openness to Toronto, Canadian work eligibility (PGWP), English/French proficiency and the new AI/MLOps stack.
- Research phrasing now says co-author of peer-reviewed ML research, matching the new résumé, without inventing a second publication entry.
- `/resume.pdf` serves the new résumé. The previous download is preserved at `/resume-software-development.pdf`. Existing résumé aliases remain working.

## Chat compatibility

A real request in the existing server log failed with `model_not_found` for `llama-3.3-70b-versatile`. The account's models endpoint confirmed `openai/gpt-oss-20b` is available, consistent with [Groq's current model documentation](https://console.groq.com/docs/models). The default was updated and made configurable via `GROQ_MODEL`. Request validation now limits message length and excludes caller-supplied system roles from history. Logs record only status/code, avoiding full provider headers.

The final live chatbot check returned HTTP 200 with the correct current employer and video project pipeline. Browser tests and preservation checks passed for all six original pages, all 19 project routes, and mobile/desktop layouts.
