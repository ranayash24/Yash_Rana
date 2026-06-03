"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/providers/motion-provider";

const achievements = [
  { icon: "🏆", title: "SSIP Hackathon 2022", desc: "Finalist — State-level innovation competition" },
  { icon: "📄", title: "Co-author", desc: "Two research publications in peer-reviewed proceedings" },
  { icon: "⬡", title: "GitHub", desc: "github.com/ranayash24 · active open-source contributor" },
  { icon: "🎓", title: "Concordia University", desc: "MApCompSc · 2024–2026 · Montréal, QC" },
];

export default function ResearchPage() {
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
            05 — Research
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
          >
            Published work
            <br />
            <span className="text-white/20">&amp; achievements.</span>
          </motion.h1>
        </motion.div>

        {/* Publication */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="group relative overflow-hidden p-8 md:p-12 mb-8 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.03), transparent 65%)" }}
          />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider mb-6 bg-white/5 border border-white/15 text-white/60">
              📄 Published Paper
            </span>

            <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight tracking-tight">
              &quot;Early Detection of Diabetes using Machine Learning&quot;
            </h3>
            <p className="text-white/30 text-sm mb-6 font-mono">
              Atlantis Press — ICAAAI 2025 Proceedings
            </p>
            <p className="text-white/50 leading-relaxed mb-8 max-w-3xl">
              SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction, benchmarked via ROC-AUC
              against Logistic Regression, Random Forest, and KNN with clinical feature engineering.
            </p>
            <div className="flex flex-wrap gap-10 mb-8">
              {[
                { v: "95%", l: "Model Accuracy" },
                { v: "SVM", l: "Primary Algorithm" },
                { v: "ICAAAI 2025", l: "Conference" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-white">{v}</div>
                  <div className="text-white/25 text-xs font-mono uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <a
              href="https://www.atlantis-press.com/proceedings/icaaai-25"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-all"
            >
              Read Paper ↗
            </a>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 3) }}
              className="p-6 rounded-2xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-all group"
            >
              <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                {icon}
              </span>
              <h4 className="text-white font-semibold mb-1.5 tracking-tight">{title}</h4>
              <p className="text-white/35 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
