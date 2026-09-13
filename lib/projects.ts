export type Project = {
  num: string;
  title: string;
  slug?: string;
  tags: string[];
  desc: string;
  tech: string[];
  links: { label: string; href: string; unavailable?: boolean }[];
};

export const projects: Project[] = [
  {
    num: "01",
    title: "Redline Markets",
    tags: ["Full Stack", "Real-time"],
    desc: "F1 prediction market platform with Polymarket-style trading cards, GP Coins economy, Stripe checkout, Firebase Auth, and a Spring Boot REST + WebSocket backend for real-time trades and chat.",
    tech: [
      "Next.js",
      "TypeScript",
      "Spring Boot",
      "Firebase",
      "WebSocket",
      "Stripe",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/f1_prediction_market",
      },
      {
        label: "Live Demo",
        href: "https://redlinem.netlify.app/",
      },
    ],
  },
  {
    num: "02",
    title: "F1 Vision",
    tags: ["Full Stack", "ML / AI"],
    desc: "Full-stack F1 race intelligence platform with live telemetry ingestion, Gradient Boosting race predictions, driver/team analytics, and LLM-generated strategy insights.",
    tech: ["FastAPI", "Python", "Next.js", "PostgreSQL", "ML", "LLMs"],
    links: [
      {
        label: "GitHub profile",
        href: "https://github.com/ranayash24",
      },
    ],
  },
  {
    num: "03",
    title: "Chess Application & Engine",
    tags: ["Systems", "AI"],
    desc: "Playable C++17 chess engine with an SDL2 interface, legal move generation, castling, en passant, and promotion. Its threaded AI combines iterative deepening, alpha-beta pruning, quiescence search, transposition caching, and move ordering.",
    tech: [
      "C++17",
      "SDL2",
      "CMake",
      "Minimax",
      "Alpha-Beta Pruning",
      "Iterative Deepening",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Chess_Engine",
      },
    ],
  },
  {
    num: "04",
    title: "F1 Prediction Market",
    tags: ["Full Stack", "ML / AI"],
    desc: "Real-time F1 prediction market with live data feeds, ML-driven odds, and user predictions on race outcomes and championship standings.",
    tech: ["Python", "FastAPI", "Next.js", "PostgreSQL", "WebSocket", "ML"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/f1_prediction_market",
      },
    ],
  },
  {
    num: "05",
    title: "Early Diabetes Detection",
    tags: ["Published Research", "ML / AI"],
    desc: "Published ICAAAI 2025 (Atlantis Press). SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction, benchmarked via ROC-AUC against Logistic Regression, Random Forest, and KNN.",
    tech: ["Python", "SVM", "Scikit-learn", "Pandas", "Matplotlib"],
    links: [
      {
        label: "Read Paper",
        href: "https://www.atlantis-press.com/proceedings/icaaai-25/126012636",
      },
    ],
  },
  {
    num: "06",
    title: "Distributed Share Market",
    tags: ["Distributed Systems"],
    desc: "Fault-tolerant replicated trading system with active replication, consensus protocols, and autonomous recovery for high availability under crash and Byzantine failures.",
    tech: [
      "Java",
      "UDP",
      "Active Replication",
      "Consensus",
      "Distributed Systems",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/DSMS",
        unavailable: true,
      },
    ],
  },
  {
    num: "07",
    title: "Online Movie Ticket Booking",
    tags: ["Full Stack"],
    desc: "Full-stack booking platform with authentication, real-time seat selection, simulated secure payments, and role-based access for admin and customer flows.",
    tech: ["React", "Spring Boot", "MySQL", "Vercel"],
    links: [
      {
        label: "Live Demo",
        href: "https://second-project-delta.vercel.app/",
      },
      {
        label: "Previous Demo",
        href: "https://book-my-show-chi.vercel.app",
        unavailable: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/book-my-show",
      },
    ],
  },
  {
    num: "08",
    title: "Sales GPT",
    tags: ["ML / AI", "LLM"],
    desc: "AI sales assistant automating lead qualification, personalized outreach, and real-time conversation coaching via LLMs.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "React"],
    links: [
      {
        label: "GitHub profile",
        href: "https://github.com/ranayash24",
      },
    ],
  },
  {
    num: "09",
    title: "BERT Sentiment Analysis",
    tags: ["ML / AI", "NLP"],
    desc: "Fine-tuned BERT for sentiment classification served via Flask REST API, with full training pipeline and inference endpoint.",
    tech: ["Python", "BERT", "Hugging Face", "Flask", "PyTorch"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/bert_sentiment",
        unavailable: true,
      },
    ],
  },
  {
    num: "10",
    title: "Book Recommendation System",
    tags: ["ML / AI"],
    desc: "Collaborative filtering + content-based recommendation engine trained on reading history and user preferences.",
    tech: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/book_recommended_system",
        unavailable: true,
      },
    ],
  },
  {
    num: "11",
    title: "Style Fusion",
    tags: ["ML / AI", "Deep Learning"],
    desc: "Neural style transfer blending artistic styles with content images using VGG feature extraction and content/style loss optimization.",
    tech: ["Python", "PyTorch", "VGG", "Deep Learning"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/style_fusion",
      },
    ],
  },
  {
    num: "12",
    title: "Abstractive Text Summarization",
    tags: ["ML / AI", "NLP"],
    desc: "Modular transformer-based summarization for long, unstructured documents, with separate ingestion, preprocessing, model inference, and evaluation stages for reproducible runs.",
    tech: ["Python", "Transformers", "NLP", "Hugging Face"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Text_summarizer_project",
      },
    ],
    slug: "text-summarizer",
  },
  {
    num: "13",
    title: "Task Tracker CLI",
    tags: ["CLI Tool"],
    desc: "Java command-line task manager with task creation, updates, deletion, status transitions, and filtering. Tasks persist in a JSON file with timestamps, with validation for invalid commands and missing inputs.",
    tech: ["Java", "CLI", "JSON", "File I/O"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Task_Tracker_CLI",
      },
    ],
  },
  {
    num: "14",
    title: "Unit Converter",
    tags: ["Full Stack"],
    desc: "Full-stack converter for length, weight, and temperature, with a React interface, light/dark themes, and a Spring Boot JSON REST API using enum-based conversions and temperature formulas.",
    tech: ["React", "JavaScript", "Java", "Spring Boot", "Vite", "REST APIs"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/unit-converter",
      },
    ],
  },
  {
    num: "15",
    title: "Video Scene Intelligence",
    tags: ["ML / AI", "Multimodal RAG", "Full Stack"],
    desc: "Ask natural-language questions about video and get answers with timestamped citations. Combines Whisper transcripts, Gemini frame captions, and Qdrant semantic retrieval in an asynchronous, full-stack RAG pipeline.",
    tech: [
      "Python",
      "FastAPI",
      "Qdrant",
      "Whisper",
      "Gemini Vision",
      "Celery",
      "Redis",
      "PostgreSQL",
      "MinIO",
      "Next.js",
      "Docker Compose",
      "SSE",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/transcript",
      },
      {
        label: "Architecture",
        href: "/projects/video-scene-intelligence-architecture.svg",
      },
    ],
  },
  {
    num: "16",
    title: "Personal Wealth Intelligence Dashboard",
    tags: ["Full Stack", "Data Visualization"],
    desc: "Portfolio dashboard bringing asset management, allocation charts, net-worth history, risk concentration, and CSV imports into one interface, with authentication and encrypted storage for sensitive asset data.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Recharts",
      "MongoDB",
      "Prisma",
      "NextAuth.js",
      "Zod",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/PERSONAL_WEALTH_DASHBOARD",
      },
      {
        label: "Live Demo",
        href: "https://personal-wealth-dashboard-beryl.vercel.app",
      },
    ],
  },
  {
    num: "17",
    title: "Financial Fraud Detection",
    tags: ["ML / AI", "Data Science"],
    desc: "Explores fraud detection on highly imbalanced transaction data using cleaning, feature engineering, multicollinearity analysis, and Decision Tree / Random Forest classifiers. Evaluates precision, recall, and F1 alongside accuracy.",
    tech: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Random Forest",
      "Matplotlib",
      "Seaborn",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Fraud_detection",
      },
    ],
  },
  {
    num: "18",
    title: "Number Guessing Game",
    tags: ["CLI Tool", "Engineering"],
    desc: "Spring Boot CLI game with difficulty levels, limited attempts, higher/lower hints, timed rounds, and saved high scores for each difficulty.",
    tech: ["Java", "Spring Boot", "Maven", "CLI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Guess_Number",
      },
    ],
  },
  {
    num: "19",
    title: "YouTube Clone",
    tags: ["Full Stack", "Engineering"],
    desc: "Web application exploring a YouTube-style experience using the Play Framework and Akka. Part of the earlier web engineering collection.",
    tech: ["HTML", "Play Framework", "Akka"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/ranayash24/Youtube_Clone",
      },
    ],
  },
];
export const projectId = (p: Project) =>
  p.slug ||
  p.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-$/, "");
export const featuredIds = ["15", "02", "12", "05", "01"];
export const projectTier = (p: Project) =>
  featuredIds.includes(p.num)
    ? "FEATURED"
    : ["03", "06", "07", "08", "09", "16", "17"].includes(p.num)
      ? "STRONG"
      : ["10", "11"].includes(p.num)
        ? "SUPPORTING"
        : "OLDER / ARCHIVE";
