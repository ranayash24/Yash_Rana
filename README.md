# Yash Rana — Portfolio

Personal portfolio website built with Next.js 15, Tailwind CSS, and Framer Motion.

**Production:** [ranayash.netlify.app](https://ranayash.netlify.app). The production URL is set in `netlify.toml`; local previews remain noindex unless a production URL is explicitly supplied.

---

## Tech Stack

- **Next.js 15** — App Router, file-based routing
- **TypeScript** — End to end type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **lucide-react + react-icons** — Icon libraries
- **EmailJS** — Contact form delivery
- **Inter + JetBrains Mono** — Typography

## Features

- Loading screen with animated word cycling and progress bar
- Command palette navigation (Cmd+K) with fuzzy search
- Hero with letter-by-letter name animation and cycling role titles
- Custom cursor with orbiting dots and magnetic pull effect
- Embedded space shooter game on the homepage
- Animated gradient mesh background
- 3D tilt project cards with mouse-tracked glow
- Fully responsive across all screen sizes
- Contact form uses EmailJS with explicit provider confirmation and a prefilled email fallback

## Pages

| Route | Content |
|---|---|
| `/` | Hero, selected work, bio, experience, research/skills, and space shooter |
| `/about` | Bio, education, full skills grid |
| `/experience` | Current GEXEL role and 3 prior internships with expandable detail |
| `/projects` | 19 projects with search, filters, and detail pages |
| `/research` | Published paper + achievements |
| `/contact` | Contact form + social links |

## Projects

1. Redline Markets — F1 prediction market (Next.js, Spring Boot, Firebase)
2. F1 Vision — Race intelligence platform (FastAPI, ML, LLMs)
3. Chess Application & Engine — C++17/SDL2, Minimax + Alpha-Beta pruning
4. F1 Prediction Market — Real-time odds (FastAPI, WebSocket)
5. Early Diabetes Detection — Published ICAAAI 2025 (SVM, 95% accuracy)
6. Distributed Share Market System — Fault-tolerant (Java, UDP)
7. Online Movie Ticket Booking — Full-stack (React, Spring Boot)
8. Sales GPT — AI sales assistant (LangChain, OpenAI)
9. BERT Sentiment Analysis — Fine-tuned NLP (PyTorch, Flask)
10. Book Recommendation System — Collaborative filtering
11. Style Fusion — Neural style transfer (PyTorch, VGG)
12. Abstractive Text Summarization — Modular transformer NLP pipeline
13. Task Tracker CLI — Java task management with JSON persistence
14. Unit Converter — Length, weight, and temperature (React, Spring Boot)
15. Video Scene Intelligence — Multimodal RAG over video (Whisper, Gemini, Qdrant)
16. Personal Wealth Intelligence Dashboard — Asset tracking and analytics
17. Financial Fraud Detection — Imbalanced classification and evaluation
18. Number Guessing Game — Spring Boot CLI
19. YouTube Clone — Play Framework and Akka

## Running Locally

```bash
git clone https://github.com/ranayash24/Yash_Rana.git
cd Yash_Rana
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Structure

```
.
├── app/
│   ├── page.tsx              # Home — hero + game
│   ├── about/page.tsx
│   ├── experience/page.tsx
│   ├── projects/page.tsx
│   ├── research/page.tsx
│   ├── contact/page.tsx
│   └── api/contact/route.ts
├── components/
│   ├── app-wrapper.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── loading-screen.tsx
│   ├── mouse-effects.tsx
│   ├── space-shooter-game.tsx
│   └── providers/
├── lib/
│   ├── utils.ts
│   └── haptic-manager.ts
└── public/
    ├── resume.pdf
    └── profile.jpg
```

---

Built by **Yash Rana** · [LinkedIn](https://www.linkedin.com/in/yash-rana-a5b4b9214/) · [GitHub](https://github.com/ranayash24) · [Email](mailto:yashrana2402@gmail.com)

## Redesign and preservation

The portfolio now uses a shared charcoal, ivory, and orange design system across all six original routes. The homepage features selected AI/ML work, engineering, research, experience, and a profile photo. All 14 original projects remain in a searchable, filterable collection, with dedicated `/projects/[slug]` pages. The command palette, résumé download, contact form, APIs, and space shooter are retained; the AI assistant is now connected to the layout.

Project content lives in `lib/projects.ts` and feeds the homepage, collection, detail pages, and chatbot knowledge. The contact page uses the existing **EmailJS** browser integration; `/api/contact` remains available for server clients. See [contact delivery setup](docs/contact-delivery.md). Chat uses the existing `GROQ_API_KEY` environment variable and defaults to the verified available `openai/gpt-oss-20b` model. Set `GROQ_MODEL` to override it with another compatible model available to the account. No credentials are committed by this redesign.

The current download is `Yash_Rana_ML_RESUME_v3.pdf`, with the GEXEL role, multimodal RAG project, and abstractive summarization details merged into the website. The prior PDF is preserved at `/resume-software-development.pdf`. GitHub-backed corrections and five additions bring the collection to 19 projects. See [the preservation audit](docs/redesign-preservation.md) for the migration map and intentional corrections.

Validation:

```bash
npx tsc --noEmit --incremental false
node scripts/check-preservation.cjs
npm run build
```

For browser checks, start the site, install Playwright in your preferred test environment, and run `node scripts/check-browser.cjs`. Set `PLAYWRIGHT_MODULE` to an external Playwright package path if it is not installed in this repository, and optionally set `PORTFOLIO_BASE_URL`. The browser checks intercept contact/chat delivery and do not send real messages.

Contact settings can be supplied at build time through `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`. These are public EmailJS identifiers; never place a private key in a `NEXT_PUBLIC_` variable. Until a valid replacement template is configured, the contact form opens a prefilled email draft. It does not claim to send mail automatically.

See [the full site audit](docs/site-audit.md) for verified routes, external-link findings, accessibility results, dependency patches, and remaining email/domain setup.
