# Portfolio Website — Complete Build Prompt for Claude Code

## Objective

Build a modern, responsive, visually impressive personal portfolio website for **Yash Rana** — a Software Developer & Data Scientist currently pursuing a Master's in Applied Computer Science at Concordia University, Montréal. The site should showcase projects, skills, work experience, education, published research, and contact information. It must be production-ready, deployable on Vercel/Netlify, and reflect a professional yet creative personality.

---

## Tech Stack Preference

- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion for smooth scroll animations, page transitions, and micro-interactions
- **Icons:** Lucide React or React Icons
- **Deployment Target:** Vercel
- **Optional Extras:** Dark/light mode toggle, smooth scrolling, SEO meta tags, Open Graph images

---

## Site Structure & Sections

### 1. Hero / Landing Section
- Full-screen hero with animated greeting
- Name: **Yash Rana**
- Tagline: "Software Developer · Data Scientist · ML Engineer"
- Subtitle: "Turning Data into Actionable Knowledge | Building Full-Stack Solutions"
- Animated typing effect cycling through roles: "Full Stack Developer", "Data Scientist", "ML Engineer", "Researcher"
- Call-to-action buttons: "View My Work" (scrolls to projects), "Download Resume" (links to a PDF), "Contact Me"
- Social links with icons: GitHub, LinkedIn, Email
- Background: subtle gradient or animated particles/mesh

### 2. About Me
- Photo placeholder (use a clean avatar placeholder or initials "YR")
- Bio text:

> Motivated and detail-oriented Software Developer with a background in computer science since 2020. Known for delivering in deadline-driven environments with a patient, methodical approach to problem-solving. Able to quickly pick up new tools and platforms, work independently or in cross-functional teams, and contribute to both research work and production-grade systems. Currently pursuing a Master of Applied Computer Science (MApCompSc) at Concordia University, Montréal. SSIP Hackathon 2022 Finalist.

- Location: Montréal, QC, Canada
- Fun fact / hobby section (optional placeholder for user to fill in)

### 3. Education

#### Concordia University
- **Degree:** Master of Applied Computer Science (MApCompSc)
- **Duration:** Sep 2024 – May 2026
- **Location:** Montréal, QC, Canada

#### Gujarat Technological University
- **Degree:** Bachelor of Engineering in Computer Engineering
- **Duration:** Sep 2020 – Apr 2024
- **Location:** Gujarat, India

### 4. Work Experience (Timeline/Card Layout)

#### Blue Data Consulting — Data Science Intern
- **Duration:** Dec 2023 – Jun 2024
- **Type:** Remote
- Built an end-to-end AI content generation system that converts client descriptions into structured text, audio, and video outputs using LLMs, LangChain, and Azure Cognitive Services for multimodal automation
- Engineered a production text-to-speech and video generation workflow with Azure Speech + Video Indexer APIs, cutting generation time from 25 → 8 minutes (−68%) while maintaining 92% accuracy in tone and context
- Integrated feedback-driven prompt refinement and automated quality scoring, improving generative consistency by 30% across production use cases
- **Tech:** Python, LangChain, Azure Cognitive Services, Azure Speech API, Azure Video Indexer, LLMs

#### ShapeAI — Full Stack Developer Intern
- **Duration:** Jun 2023 – Nov 2023
- **Type:** Remote
- Delivered a MERN-stack portal for an ed-tech client, centralizing student project submissions and analytics; active users grew from 120 → 220 (+83%) after introducing interactive dashboards
- Built secure React.js + Node.js/Express APIs with JWT authentication, validation middleware, and optimized routing logic, reducing backend and form errors by 45% while improving data integrity
- Optimized front-end architecture with modular React hooks, lazy loading, and advanced caching techniques, improving load speed by 40% and deployment turnaround by 25% across environments
- **Tech:** React.js, Node.js, Express.js, MongoDB, JWT, REST APIs

### 5. Projects Section (Card Grid with Filters)

Provide filter tabs: "All", "Full Stack", "Machine Learning / AI", "Distributed Systems", "Research"

---

#### Project 1: F1 Vision
- **Category:** Full Stack, Machine Learning / AI
- **Description:** A full-stack F1 race intelligence platform with live telemetry ingestion, Gradient Boosting–based race outcome prediction, driver/team comparison analytics, and LLM-generated strategy insights and summaries.
- **Key Features:**
  - Live telemetry data ingestion and visualization
  - ML-based race outcome prediction using Gradient Boosting
  - Driver and team comparison analytics dashboards
  - LLM-powered strategy insights and race summaries
- **Tech Stack:** FastAPI, Python, Next.js, Machine Learning, LLMs
- **Links:**
  - GitHub: https://github.com/ranayash24 (link to the F1 Vision repo — user should update with exact repo URL)
  - Live Demo: (user to add if deployed)

---

#### Project 2: Early Detection of Diabetes using Machine Learning (Published Paper)
- **Category:** Research, Machine Learning / AI
- **Description:** Published research paper in Atlantis Press (ICAA AI 2025) presenting an SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction. The work explores feature engineering on clinical datasets and validates the model against baseline classifiers.
- **Key Features:**
  - SVM-based classification achieving 95% accuracy
  - Published in international conference proceedings (Atlantis Press, ICAAAI 2025)
  - Comparative analysis with Random Forest, KNN, Logistic Regression
  - Feature importance analysis on clinical diabetes indicators
- **Tech Stack:** Python, SVM, Scikit-learn, Pandas, NumPy, Matplotlib
- **Links:**
  - Published Paper: https://www.atlantis-press.com/proceedings/icaaai-25 (user should add direct paper URL)
  - GitHub: (user to add if code is public)

---

#### Project 3: Distributed Share Market System (DSMS)
- **Category:** Distributed Systems
- **Description:** A fault-tolerant replicated trading system using active replication, consensus protocols, and autonomous recovery to ensure high availability under crash and Byzantine failures. Demonstrates core distributed systems concepts.
- **Key Features:**
  - Active replication with consensus-based coordination
  - Autonomous crash recovery and Byzantine fault tolerance
  - UDP-based inter-replica communication
  - Simulated share trading with concurrent clients
- **Tech Stack:** Java, UDP, Distributed Systems
- **Links:**
  - GitHub: https://github.com/ranayash24 (user should update with exact repo URL)

---

#### Project 4: Online Movie Ticket Booking System (Book My Show Clone)
- **Category:** Full Stack
- **Description:** A full-stack ticket booking platform with user authentication, real-time seat selection, and simulated secure payments backed by a Spring Boot + MySQL service layer. Also has a React-based frontend deployed on Vercel.
- **Key Features:**
  - User authentication and authorization
  - Real-time interactive seat selection UI
  - Simulated secure payment flow
  - RESTful API backend with Spring Boot
- **Tech Stack:** React, Spring Boot, MySQL
- **Links:**
  - GitHub: https://github.com/ranayash24/book-my-show
  - Live Demo: https://book-my-show-chi.vercel.app

---

#### Project 5: BERT Sentiment Analysis Model
- **Category:** Machine Learning / AI
- **Description:** A sentiment analysis model built using the BERT base model from Hugging Face, served via a Flask API. Fine-tuned for text classification tasks to predict sentiment polarity.
- **Key Features:**
  - Fine-tuned BERT base model for sentiment classification
  - Flask REST API for model serving
  - Hugging Face Transformers integration
  - Jupyter notebook for training pipeline
- **Tech Stack:** Python, BERT, Hugging Face Transformers, Flask, PyTorch
- **Links:**
  - GitHub: https://github.com/ranayash24/bert_sentiment

---

#### Project 6: Book Recommendation System
- **Category:** Machine Learning / AI
- **Description:** A book recommendation engine using collaborative filtering and content-based techniques to suggest books based on user preferences and reading history.
- **Key Features:**
  - Collaborative filtering recommendations
  - Content-based filtering
  - Data preprocessing and exploratory analysis
- **Tech Stack:** Python, Pandas, Scikit-learn, Jupyter Notebook
- **Links:**
  - GitHub: https://github.com/ranayash24/book_recommended_system

---

#### Project 7: Style Fusion
- **Category:** Machine Learning / AI
- **Description:** A neural style transfer project that blends artistic styles with content images using deep learning techniques.
- **Key Features:**
  - Neural style transfer implementation
  - Deep learning–based image processing
  - Customizable style and content mixing
- **Tech Stack:** Python, Deep Learning, Jupyter Notebook
- **Links:**
  - GitHub: https://github.com/ranayash24/style_fusion

---

#### Project 8: Text Summarizer
- **Category:** Machine Learning / AI
- **Description:** An NLP-based text summarization tool that generates concise summaries from long-form text using transformer-based or extractive summarization techniques.
- **Key Features:**
  - Automatic text summarization (extractive/abstractive)
  - NLP pipeline with preprocessing
  - Jupyter notebook–based experimentation
- **Tech Stack:** Python, NLP, Transformers, Jupyter Notebook
- **Links:**
  - GitHub: https://github.com/ranayash24/Text_summarizer_project

---

### 6. Technical Skills Section (Visual/Interactive)

Display skills as categorized badges, progress bars, or an interactive skills cloud.

#### Languages
Python, Java, JavaScript, TypeScript, SQL, C, HTML5, CSS

#### Frameworks
FastAPI, Spring Boot, React, Next.js, Node.js, Flask, Express, React Native

#### Machine Learning & AI
Scikit-learn, TensorFlow, XGBoost, LSTM, LangChain, Pandas, NumPy, Matplotlib, Seaborn, BERT, Hugging Face Transformers

#### Cloud / DevOps / Tools
AWS, Azure, Google Cloud, Docker, Git, Jira, Postman, Power BI, Vercel, Streamlit

#### Databases
MySQL, PostgreSQL, Firebase, Supabase, Prisma, MongoDB

#### Other Expertise
Distributed Systems, API Design, Data Visualization, Time-Series Forecasting, LLM Integration, Neural Style Transfer, NLP

### 7. Publications / Research Section
- **Paper Title:** "Early Detection of Diabetes using Machine Learning"
- **Published in:** Atlantis Press — Proceedings of the International Conference on Advances and Applications in Artificial Intelligence (ICAAAI 2025)
- **Achievement:** SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction
- **Link:** https://www.atlantis-press.com/proceedings/icaaai-25 (user to update with direct paper link)

### 8. Achievements / Highlights
- SSIP Hackathon 2022 — Finalist
- Published researcher (Atlantis Press, ICAAAI 2025)
- 39 public repositories on GitHub
- GitHub Pull Shark achievement badge

### 9. Contact Section
- **Email:** yashrana2402@gmail.com
- **Phone:** (438) 836-5297
- **LinkedIn:** https://linkedin.com/in/yash-rana
- **GitHub:** https://github.com/ranayash24
- **Location:** Montréal, QC, Canada
- Include a simple contact form (Name, Email, Message) — can use Formspree, EmailJS, or a serverless function
- Optional: Embedded Google Maps showing Montréal

### 10. Footer
- "Designed & Built by Yash Rana"
- Year: 2026
- Quick links: GitHub, LinkedIn, Email
- "Back to top" button

---

## Design Guidelines

- **Color Palette:** Dark theme primary (deep navy/charcoal #0a0a0a or #1a1a2e), accent color (electric blue #00d4ff or teal #14b8a6), secondary accent (purple #8b5cf6). Support light mode toggle.
- **Typography:** Inter or Poppins for headings, system font stack or JetBrains Mono for code snippets
- **Layout:** Clean, spacious, with generous whitespace. Cards with subtle hover effects and shadows.
- **Animations:** Fade-in on scroll, staggered card reveals, smooth section transitions, hover scale on project cards, animated skill bars
- **Responsiveness:** Mobile-first, fully responsive across all breakpoints (phone, tablet, laptop, desktop)
- **Accessibility:** Proper semantic HTML, alt text placeholders, keyboard navigation, ARIA labels

---

## GitHub Profile Summary (for "About" or GitHub widget)
- **Username:** ranayash24
- **Display Name:** Yash_rana
- **Bio:** Data Scientist | Statistical Modeling and Machine Learning | Turning Data into Actionable Knowledge | SSIP Hackathon 2022 Finalist
- **Followers:** 5
- **Following:** 16
- **Public Repos:** 39
- **Pinned Repos:** bert_sentiment, book-my-show, book_recommended_system, style_fusion, Text_summarizer_project
- **GitHub URL:** https://github.com/ranayash24

---

## SEO & Metadata
- **Title:** Yash Rana — Software Developer & Data Scientist | Portfolio
- **Description:** Portfolio of Yash Rana — Full Stack Developer, Data Scientist, and ML Engineer. Master's student at Concordia University, Montréal. Explore projects in AI, distributed systems, and web development.
- **Keywords:** Yash Rana, Software Developer, Data Scientist, Machine Learning Engineer, Concordia University, Full Stack Developer, Portfolio, Python, React, Next.js, FastAPI
- **Open Graph Image:** Auto-generate or use a custom OG image with name and tagline
- **Canonical URL:** (user to set after deployment)

---

## Deployment Instructions
1. Initialize a Next.js 14+ project with TypeScript and Tailwind CSS
2. Build all sections as individual React components
3. Add Framer Motion for animations
4. Set up dark/light theme with next-themes or a custom context
5. Deploy to Vercel (connect GitHub repo)
6. Set up custom domain if available

---

## Notes for Claude Code
- This is a single-page portfolio (or multi-page with smooth navigation)
- All project links above are real and working GitHub repos — use them directly
- The user may want to add a profile photo later — use a placeholder or initials avatar for now
- The resume PDF should be downloadable from a `/public` folder asset
- Make the project cards clickable with links to both GitHub source and live demos where available
- Prioritize visual impact — this is a portfolio meant to impress recruiters and hiring managers
