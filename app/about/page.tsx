"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/providers/motion-provider";
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiJavascript,
  SiFastapi, SiFlask, SiNodedotjs, SiExpress, SiSpringboot,
  SiTailwindcss, SiMongodb, SiPostgresql, SiMysql, SiFirebase,
  SiDocker, SiGit, SiGithub, SiVercel, SiNetlify,
  SiScikitlearn, SiPytorch, SiLangchain, SiHuggingface,
  SiJupyter, SiStreamlit, SiKubernetes, SiLinux,
  SiTensorflow, SiPrisma, SiSupabase,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { Cloud, Database, Brain, Code2, Server, Cpu, GitBranch } from "lucide-react";
import type { IconType } from "react-icons";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type Skill = { name: string; icon?: IconType | LucideIcon };

const categories: Array<{
  name: string;
  color: string;
  icon: LucideIcon;
  skills: Skill[];
}> = [
  {
    name: "Languages",
    color: "#ef4444",
    icon: Code2,
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQL" },
      { name: "C" },
      { name: "HTML5" },
      { name: "CSS" },
    ],
  },
  {
    name: "Frameworks",
    color: "#3b82f6",
    icon: Server,
    skills: [
      { name: "FastAPI", icon: SiFastapi },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Flask", icon: SiFlask },
      { name: "Express", icon: SiExpress },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    name: "ML & AI",
    color: "#ec4899",
    icon: Brain,
    skills: [
      { name: "Scikit-learn", icon: SiScikitlearn },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "PyTorch", icon: SiPytorch },
      { name: "XGBoost" },
      { name: "LSTM" },
      { name: "LangChain", icon: SiLangchain },
      { name: "Hugging Face", icon: SiHuggingface },
      { name: "MLflow" },
      { name: "Pandas" },
      { name: "NumPy" },
    ],
  },
  {
    name: "Cloud Platforms",
    color: "#06b6d4",
    icon: Cloud,
    skills: [
      { name: "AWS (EC2, S3, Lambda)", icon: FaAws },
      { name: "Azure Cognitive Services", icon: Cloud },
      { name: "Google Cloud", icon: Cloud },
      { name: "Vercel", icon: SiVercel },
      { name: "Netlify", icon: SiNetlify },
    ],
  },
  {
    name: "DevOps & CI/CD",
    color: "#8b5cf6",
    icon: GitBranch,
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "GitHub Actions" },
      { name: "Git", icon: SiGit },
      { name: "Linux/Unix", icon: SiLinux },
      { name: "Shell Scripting" },
    ],
  },
  {
    name: "Databases",
    color: "#f59e0b",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MySQL", icon: SiMysql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
      { name: "Supabase", icon: SiSupabase },
      { name: "Prisma", icon: SiPrisma },
    ],
  },
];

const education = [
  {
    period: "Sep 2024 — May 2026",
    degree: "Master of Applied Computer Science (MApCompSc)",
    school: "Concordia University",
    location: "Montréal, QC, Canada",
    current: true,
  },
  {
    period: "Sep 2020 — Apr 2024",
    degree: "Bachelor of Engineering — Computer Engineering",
    school: "Gujarat Technological University",
    location: "Gujarat, India",
    current: false,
  },
];

const meta = [
  { icon: "📍", text: "Montréal, QC, Canada" },
  { icon: "🎓", text: "Concordia University — MApCompSc · 2024–2026" },
  { icon: "🏆", text: "SSIP Hackathon 2022 — Finalist" },
  { icon: "📄", text: "Co-author — Atlantis Press, ICAAAI 2025" },
  { icon: "📞", text: "(438) 836-5297" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        {/* Header */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p variants={staggerItem} className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-4">
            01 — About
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight mb-6"
          >
            Motivated.
            <br />
            <span className="text-white/20">Detail-oriented.</span>
            <br />
            Results-driven.
          </motion.h1>
        </motion.div>

        {/* Bio + meta */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-white/50 text-base leading-relaxed">
              Software Developer with 4+ years building across backend systems, AI/ML pipelines, and full-stack web applications.
              Co-author of two research publications. Skilled in Java, Python, and JavaScript with hands-on exposure to LLMs,
              distributed systems, and cloud platforms.
            </p>
            <p className="text-white/40 text-sm leading-relaxed">
              Known for shipping reliable systems fast — from distributed trading platforms to LLM-powered content pipelines.
              Currently pursuing a Master of Applied Computer Science at Concordia University, Montréal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2"
          >
            {meta.map(({ icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all"
              >
                <span className="text-base shrink-0">{icon}</span>
                <span className="text-white/45 text-sm">{text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-6">Education</p>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map(({ period, degree, school, location, current }) => (
              <div
                key={degree}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/25 text-xs font-mono">{period}</span>
                  {current && (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/5 border border-white/15 text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-white/60" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-base mb-2 leading-tight">{degree}</h3>
                <p className="text-sm font-medium text-white/50">{school}</p>
                <p className="text-white/25 text-xs mt-1 font-mono">{location}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-6">Technical Skills</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map(({ name, color, icon: Icon, skills }) => (
              <div
                key={name}
                className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/12 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}35` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h3 className="text-white/50 font-mono text-xs uppercase tracking-widest">{name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map(({ name: skill, icon: SkillIcon }) => (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/8 text-white/50 hover:text-white/80 hover:bg-white/[0.07] hover:border-white/15 transition-all"
                    >
                      {SkillIcon && <SkillIcon className="w-3 h-3 shrink-0" />}
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 p-6 rounded-2xl border border-white/8 bg-white/[0.02]"
        >
          <p className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4">Tools & Expertise</p>
          <div className="flex flex-wrap gap-2">
            {["Git", "Jira", "Postman", "PowerBI", "MLflow", "Streamlit", "Distributed Systems", "API Design", "LLM Integration", "Data Visualization", "Time-Series Forecasting"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] border border-white/8 text-white/40"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all"
          >
            View Experience →
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-white/70 font-medium text-sm hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
          >
            See Projects
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/15 text-white/70 font-medium text-sm hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
