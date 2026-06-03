"use client";

import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/providers/motion-provider";
import { useState } from "react";

const jobs = [
  {
    period: "Jul 2023 — Jun 2024",
    role: "Data Science Intern",
    company: "Blue Data Consulting",
    type: "Remote",
    impacts: ["−68% Gen. Time", "92% Accuracy", "+30% Consistency"],
    points: [
      "Built an end-to-end AI content generation system converting client descriptions into structured text, audio, and video using LLMs, LangChain, and Azure Cognitive Services.",
      "Engineered a production TTS + video generation workflow with Azure Speech + Video Indexer APIs — cutting generation time from 25 → 8 minutes (−68%) at 92% tone accuracy.",
      "Integrated feedback-driven prompt refinement and MLflow-tracked quality scoring, improving generative consistency by 30% across production use cases.",
    ],
    tech: ["Python", "LangChain", "Azure Speech API", "Azure Video Indexer", "MLflow", "LLMs"],
  },
  {
    period: "Feb 2023 — May 2023",
    role: "Data Analyst Intern",
    company: "The Sparks Foundation",
    type: "Remote",
    impacts: ["EDA & Modeling", "Weekly Dashboards", "Supervised ML"],
    points: [
      "Performed exploratory data analysis, predictive modeling, and visualization using Pandas, NumPy, and Scikit-learn to convert raw datasets into actionable business insights.",
      "Delivered weekly analytical reports and dashboards summarizing key business metrics, applying statistical analysis and supervised learning to support data-driven decisions.",
    ],
    tech: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
  },
  {
    period: "Sep 2022 — Feb 2023",
    role: "Full Stack Developer Intern",
    company: "DevTown",
    type: "Remote",
    impacts: ["+83% Users", "−45% Errors", "+40% Speed"],
    points: [
      "Delivered a MERN-stack portal for an ed-tech client, growing active users from 120 → 220 (+83%) through interactive dashboards.",
      "Built secure Node.js/Express REST APIs with JWT authentication, reducing backend errors by 45% and improving load speed by 40%.",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
  },
];

export default function ExperiencePage() {
  const [expanded, setExpanded] = useState<number | null>(null);

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
            02 — Experience
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
          >
            Where I&apos;ve
            <br />
            <span className="text-white/20">shipped impact.</span>
          </motion.h1>
        </motion.div>

        <div className="space-y-0">
          {jobs.map((job, idx) => {
            const open = expanded === idx;
            return (
              <motion.div
                key={`${job.company}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group border-t border-white/8 hover:bg-white/[0.015] transition-colors"
              >
                <button
                  className="w-full text-left py-7 flex items-start lg:items-center justify-between gap-6"
                  onClick={() => setExpanded(open ? null : idx)}
                >
                  <div className="flex items-start lg:items-center gap-5 flex-1 min-w-0">
                    <span className="text-white/15 font-mono text-sm shrink-0 tabular-nums mt-0.5 lg:mt-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                        <h3 className="text-white font-bold text-xl lg:text-2xl tracking-tight">{job.role}</h3>
                        <span className="text-white/50 text-sm font-medium">{job.company}</span>
                        <span className="text-white/20 text-xs font-mono">{job.type}</span>
                      </div>
                      <span className="text-white/25 text-xs font-mono">{job.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex gap-2 flex-wrap">
                      {job.impacts.map((imp) => (
                        <span
                          key={imp}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-white/50 tracking-wide"
                        >
                          {imp}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 text-lg shrink-0"
                    >
                      +
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 md:pl-14">
                        <div className="flex flex-wrap gap-2 mb-5 md:hidden">
                          {job.impacts.map((imp) => (
                            <span
                              key={imp}
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-white/50"
                            >
                              {imp}
                            </span>
                          ))}
                        </div>
                        <ul className="space-y-3 mb-6">
                          {job.points.map((p, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06, duration: 0.3 }}
                              className="flex items-start gap-3 text-white/45 text-sm leading-relaxed"
                            >
                              <span className="text-white/20 mt-1.5 shrink-0 font-mono text-xs">—</span>
                              <span>{p}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {job.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/8 text-white/40"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Bottom border */}
          <div className="border-t border-white/8" />
        </div>
      </div>
    </div>
  );
}
