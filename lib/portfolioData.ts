import { projects } from "./projects";
import { jobs } from "./experience";
import { projectDetails } from "./project-details";

// Yash Rana's portfolio knowledge base for the RAG chatbot

export const PORTFOLIO_DOCUMENTS = [
  {
    text: `Yash Rana is a motivated and detail-oriented Software Developer and Data Scientist based in Montréal, QC, Canada.
He has been working in computer science since 2020 and is known for delivering in deadline-driven environments with a patient, methodical approach to problem-solving.
He is able to quickly pick up new tools and platforms, work independently or in cross-functional teams, and contribute to both research work and production-grade systems.
Yash is currently open to work — he is available for full-time roles, internships, research collaborations, and consulting in Software Development, Data Science, Machine Learning, and related fields.
He focuses on applied ML and generative AI, with 1.5+ years of applied ML and GenAI experience across internships and research. He currently works at GEXEL Telecom International as Technical Specialist, Network & Connectivity (June 2026–present). He is based in Montréal, open to relocating to Toronto, and eligible to work in Canada (PGWP). English: fluent. French: professional working proficiency.
His GitHub handle is ranayash24 and his portfolio spans AI, full stack development, and systems engineering.
He was a SSIP Hackathon 2022 Finalist — a state-level innovation competition in India.
He is co-author of peer-reviewed ML research, with a paper in Atlantis Press ICAAAI 2025 Proceedings.`,
    metadata: { section: "about", topic: "identity background availability" },
  },
  {
    text: `Yash Rana's Education:

1. Master of Applied Computer Science (MApCompSc) — Concordia University, Montréal, QC, Canada.
   Period: September 2024 to May 2026. Completed in May 2026.

2. Bachelor of Engineering in Computer Engineering — Gujarat Technological University, Gujarat, India.
   Period: September 2020 to April 2024. Completed.

Yash started his computer science journey in 2020 and has completed graduate studies at Concordia University in Canada.`,
    metadata: { section: "education", topic: "university degree studies" },
  },
  ...jobs.map((job) => ({
    text: `${job.current ? "Current role" : "Previous role"}: ${job.role} at ${job.company}, ${job.period}, ${job.type}. ${job.points.join(" ")} Technologies and expertise: ${job.tech.join(", ")}.`,
    metadata: { section: "experience", topic: job.company },
  })),
  {
    text: `Yash Rana's Technical Skills:

Programming Languages: Python, Java, JavaScript, TypeScript, SQL, C++, C, HTML5, CSS

Frameworks & Libraries: FastAPI, Spring Boot, React, Next.js, Node.js, Flask, Express, React Native

Machine Learning & AI Tools: Scikit-learn, TensorFlow, PyTorch, RAG, Qdrant, Whisper, Gemini Vision, Embeddings, Prompt Engineering, XGBoost, LSTM, LangChain, Pandas, NumPy, BERT, Hugging Face, Matplotlib, Seaborn

Cloud / DevOps / Tools: AWS, Azure, Google Cloud, Docker, Git, Jira, Postman, Power BI, Vercel, Netlify, Streamlit, MLflow, Kubernetes, GitHub Actions, Linux/Unix, Shell Scripting, Celery, Redis, Docker Compose, MinIO

Databases: MySQL, PostgreSQL, MongoDB, Firebase, Supabase, Prisma

Expertise Areas: Distributed Systems, API Design, Data Visualization, Time-Series Forecasting, LLM Integration, NLP (Natural Language Processing), Neural Style Transfer`,
    metadata: {
      section: "skills",
      topic: "technologies programming languages frameworks tools databases",
    },
  },
  ...projects.map((p) => ({
    text: `${p.title}: ${p.desc} Technologies: ${p.tech.join(", ")}. Links: ${
      p.links
        .filter((l) => !l.unavailable)
        .map((l) => `${l.label}: ${l.href}`)
        .join("; ") ||
      "No public project link currently available; contact Yash for details"
    }.`,
    metadata: { section: "projects", topic: p.tags.join(" ") },
  })),
  ...Object.entries(projectDetails).map(([num, detail]) => ({
    text: `${projects.find((p) => p.num === num)?.title}: Problem: ${detail.challenge} Approach: ${detail.approach} ${detail.highlights.map((h) => `${h.title}: ${h.text}`).join(" ")} ${detail.note || ""}`,
    metadata: {
      section: "projects",
      topic: "implementation architecture case study",
    },
  })),
  {
    text: `Yash Rana's Research and Achievements:

Published Paper: "Early Detection of Diabetes using Machine Learning"
- Published in: Atlantis Press — ICAAAI 2025 Proceedings (International Conference on Advances and Applications in Artificial Intelligence)
- Description: Presents an SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction. Validates against Random Forest, KNN, and Logistic Regression baselines with clinical feature engineering.
- Key metrics: 95% model accuracy, SVM as primary algorithm, presented at ICAAAI 2025.
- Link: atlantis-press.com/proceedings/icaaai-25/126012636

Other Achievements:
- SSIP Hackathon 2022 Finalist: State-level innovation competition in India.
- GitHub Pull Shark achievement (username: ranayash24).
- Graduate of the Master of Applied Computer Science at Concordia University (2024–2026).`,
    metadata: {
      section: "research",
      topic:
        "published research paper diabetes machine learning achievements hackathon",
    },
  },
  {
    text: `Yash Rana's Contact Information and Availability:

Yash is currently open to work and actively looking for opportunities.

Contact details:
- Email: yashrana2402@gmail.com
- GitHub: github.com/ranayash24
- LinkedIn: www.linkedin.com/in/yash-rana-a5b4b9214/
- Location: Montréal, QC, Canada

He is open to:
- Full-time Software Developer, Data Scientist, or ML Engineer roles
- Research collaborations (especially in AI/ML)
- Internships and co-op positions
- Freelance and consulting projects
- Remote or in-person positions in Canada

To get in touch, the best way is to email him at yashrana2402@gmail.com or connect on LinkedIn at www.linkedin.com/in/yash-rana-a5b4b9214/.`,
    metadata: {
      section: "contact",
      topic: "contact email linkedin github location availability hiring",
    },
  },
];
