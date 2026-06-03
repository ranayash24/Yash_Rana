# Yash Rana — Portfolio

Personal portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion.

**Live at:** [yashrana.dev](https://yashrana.dev)

---

## Tech Stack

- **Next.js 14** — App Router, file-based routing
- **TypeScript** — End to end type safety
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations and transitions
- **lucide-react + react-icons** — Icon libraries
- **FormSubmit** — Contact form delivery
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
- Contact form sends directly to email via FormSubmit

## Pages

| Route | Content |
|---|---|
| `/` | Hero + space shooter game |
| `/about` | Bio, education, full skills grid |
| `/experience` | 3 internships with expandable detail |
| `/projects` | 14 projects with tilt cards |
| `/research` | Published paper + achievements |
| `/contact` | Contact form + social links |

## Projects

1. Redline Markets — F1 prediction market (Next.js, Spring Boot, Firebase)
2. F1 Vision — Race intelligence platform (FastAPI, ML, LLMs)
3. Chess Application & Engine — Minimax + Alpha-Beta pruning
4. F1 Prediction Market — Real-time odds (FastAPI, WebSocket)
5. Early Diabetes Detection — Published ICAAAI 2025 (SVM, 95% accuracy)
6. Distributed Share Market System — Fault-tolerant (Java, UDP)
7. Online Movie Ticket Booking — Full-stack (React, Spring Boot)
8. Sales GPT — AI sales assistant (LangChain, OpenAI)
9. BERT Sentiment Analysis — Fine-tuned NLP (PyTorch, Flask)
10. Book Recommendation System — Collaborative filtering
11. Style Fusion — Neural style transfer (PyTorch, VGG)
12. Text Summarizer — Transformer-based NLP
13. Task Tracker CLI — Terminal task manager (Python, Click)
14. Unit Converter — 100+ units (React, TypeScript)

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

Built by **Yash Rana** · [LinkedIn](https://www.linkedin.com/in/yash-rana) · [GitHub](https://github.com/ranayash24) · [Email](mailto:yashrana240203@gmail.com)
