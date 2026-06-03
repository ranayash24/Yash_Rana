"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/providers/motion-provider";
import { useRef, useState } from "react";

const projects = [
  {
    num: "01",
    title: "Redline Markets",
    tags: ["Full Stack", "Real-time"],
    desc: "F1 prediction market platform with Polymarket-style trading cards, GP Coins economy, Stripe checkout, Firebase Auth, and a Spring Boot REST + WebSocket backend for real-time trades and chat.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "Firebase", "WebSocket", "Stripe"],
    links: [
      { label: "GitHub", href: "https://github.com/ranayash24" },
      { label: "Live Demo", href: "https://github.com/ranayash24" },
    ],
  },
  {
    num: "02",
    title: "F1 Vision",
    tags: ["Full Stack", "ML / AI"],
    desc: "Full-stack F1 race intelligence platform with live telemetry ingestion, Gradient Boosting race predictions, driver/team analytics, and LLM-generated strategy insights.",
    tech: ["FastAPI", "Python", "Next.js", "PostgreSQL", "ML", "LLMs"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
  {
    num: "03",
    title: "Chess Application & Engine",
    tags: ["Systems", "AI"],
    desc: "Chess app with a custom engine implementing legal move generation, castling, en passant, and a decision layer using Minimax + Alpha-Beta pruning, iterative deepening, and a custom evaluation function.",
    tech: ["Python", "Minimax", "Alpha-Beta Pruning", "Iterative Deepening"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
  {
    num: "04",
    title: "F1 Prediction Market",
    tags: ["Full Stack", "ML / AI"],
    desc: "Real-time F1 prediction market with live data feeds, ML-driven odds, and user predictions on race outcomes and championship standings.",
    tech: ["Python", "FastAPI", "Next.js", "PostgreSQL", "WebSocket", "ML"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24/f1_prediction_market" }],
  },
  {
    num: "05",
    title: "Early Diabetes Detection",
    tags: ["Published Research", "ML / AI"],
    desc: "Published ICAAAI 2025 (Atlantis Press). SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction, benchmarked via ROC-AUC against Logistic Regression, Random Forest, and KNN.",
    tech: ["Python", "SVM", "Scikit-learn", "Pandas", "Matplotlib"],
    links: [{ label: "Read Paper", href: "https://www.atlantis-press.com/proceedings/icaaai-25" }],
  },
  {
    num: "06",
    title: "Distributed Share Market",
    tags: ["Distributed Systems"],
    desc: "Fault-tolerant replicated trading system with active replication, consensus protocols, and autonomous recovery for high availability under crash and Byzantine failures.",
    tech: ["Java", "UDP", "Active Replication", "Consensus", "Distributed Systems"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
  {
    num: "07",
    title: "Online Movie Ticket Booking",
    tags: ["Full Stack"],
    desc: "Full-stack booking platform with authentication, real-time seat selection, simulated secure payments, and role-based access for admin and customer flows.",
    tech: ["React", "Spring Boot", "MySQL", "Vercel"],
    links: [
      { label: "Live Demo", href: "https://book-my-show-chi.vercel.app" },
      { label: "GitHub", href: "https://github.com/ranayash24/book-my-show" },
    ],
  },
  {
    num: "08",
    title: "Sales GPT",
    tags: ["ML / AI", "LLM"],
    desc: "AI sales assistant automating lead qualification, personalized outreach, and real-time conversation coaching via LLMs.",
    tech: ["Python", "LangChain", "OpenAI", "FastAPI", "React"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
  {
    num: "09",
    title: "BERT Sentiment Analysis",
    tags: ["ML / AI", "NLP"],
    desc: "Fine-tuned BERT for sentiment classification served via Flask REST API, with full training pipeline and inference endpoint.",
    tech: ["Python", "BERT", "Hugging Face", "Flask", "PyTorch"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24/bert_sentiment" }],
  },
  {
    num: "10",
    title: "Book Recommendation System",
    tags: ["ML / AI"],
    desc: "Collaborative filtering + content-based recommendation engine trained on reading history and user preferences.",
    tech: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24/book_recommended_system" }],
  },
  {
    num: "11",
    title: "Style Fusion",
    tags: ["ML / AI", "Deep Learning"],
    desc: "Neural style transfer blending artistic styles with content images using VGG feature extraction and content/style loss optimization.",
    tech: ["Python", "PyTorch", "VGG", "Deep Learning"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24/style_fusion" }],
  },
  {
    num: "12",
    title: "Text Summarizer",
    tags: ["ML / AI", "NLP"],
    desc: "Transformer-based and extractive summarization pipeline generating concise summaries from long-form content.",
    tech: ["Python", "Transformers", "NLP", "Hugging Face"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24/Text_summarizer_project" }],
  },
  {
    num: "13",
    title: "Task Tracker CLI",
    tags: ["CLI Tool"],
    desc: "Terminal-based task manager with project grouping, priority levels, due dates, and rich progress visualization.",
    tech: ["Python", "Click", "SQLite", "Rich"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
  {
    num: "14",
    title: "Unit Converter",
    tags: ["Full Stack"],
    desc: "100+ unit conversion with real-time results, history tracking, and currency support.",
    tech: ["React", "TypeScript", "Node.js"],
    links: [{ label: "GitHub", href: "https://github.com/ranayash24" }],
  },
];

function TiltCard({ p }: { p: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
    setGlow({ x: x * 100, y: y * 100 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      animate={{ rotateX: tilt.x, rotateY: tilt.y }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      style={{ transformStyle: "preserve-3d", perspective: 900 }}
      className="relative h-full p-6 rounded-2xl border border-white/8 bg-white/[0.02] flex flex-col cursor-default"
    >
      {/* Mouse glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-white/15 font-mono text-xs tabular-nums">{p.num}</span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider bg-white/5 border border-white/10 text-white/40"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <h3 className="text-white font-semibold text-lg mb-2 leading-snug tracking-tight">{p.title}</h3>
        <p className="text-white/35 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/[0.04] border border-white/8 text-white/35"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-white/35 hover:text-white transition-colors border-b border-white/10 pb-px hover:border-white/40"
            >
              {l.label} ↗
            </a>
          ))}
        </div>

        {/* Accent dot */}
        <div
          className="absolute bottom-4 right-4 w-1 h-1 rounded-full bg-white/20 transition-all duration-300"
          style={{ boxShadow: hovered ? "0 0 6px rgba(255,255,255,0.4)" : "none" }}
        />
      </div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p variants={staggerItem} className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-4">
            03 — Projects
          </motion.p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <motion.h1
              variants={staggerItem}
              className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
            >
              Things I&apos;ve
              <br />
              <span className="text-white/20">built &amp; shipped.</span>
            </motion.h1>
            <motion.p variants={staggerItem} className="text-white/20 text-xs font-mono">
              {projects.length} projects
            </motion.p>
          </div>
        </motion.div>

        {/* Featured — first 2 side by side */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {projects.slice(0, 2).map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            >
              <TiltCard p={p} />
            </motion.div>
          ))}
        </div>

        {/* Grid — rest */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(2).map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 * (i + 1) }}
            >
              <TiltCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
