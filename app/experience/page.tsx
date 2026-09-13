"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
} from "@/components/providers/motion-provider";
import { useState } from "react";

import { jobs } from "@/lib/experience";

export default function ExperiencePage() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div className="interior-page min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-mono tracking-[0.2em] uppercase text-muted mb-4"
          >
            02 — Experience
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
          >
            Where I&apos;ve
            <br />
            <span className="text-muted">shipped impact.</span>
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
                className={`experience-entry group border-t border-white/10 hover:bg-white/[0.015] transition-colors ${job.current ? "current-experience" : ""}`}
              >
                <button
                  className="w-full text-left py-7 flex items-start lg:items-center justify-between gap-6"
                  aria-expanded={open}
                  aria-controls={`experience-${idx}`}
                  onClick={() => setExpanded(open ? null : idx)}
                >
                  <div className="flex items-start lg:items-center gap-5 flex-1 min-w-0">
                    <span className="text-muted font-mono text-sm shrink-0 tabular-nums mt-0.5 lg:mt-0">
                      0{idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                        <h3 className="text-white font-bold text-xl lg:text-2xl tracking-tight">
                          {job.role}
                        </h3>
                        <span className="text-muted text-sm font-medium">
                          {job.company}
                        </span>
                        <span className="text-muted text-xs font-mono">
                          {job.type}
                        </span>
                      </div>
                      <span className="text-muted text-xs font-mono">
                        {job.period}
                      </span>
                      {job.current && (
                        <span className="current-badge">
                          <i className="status-dot" /> Current role
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden xl:flex gap-2 flex-wrap max-w-[260px]">
                      {job.impacts.map((imp) => (
                        <span
                          key={imp}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-muted tracking-wide"
                        >
                          {imp}
                        </span>
                      ))}
                    </div>
                    <motion.div
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-muted text-lg shrink-0"
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
                      id={`experience-${idx}`}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 md:pl-14">
                        <div className="flex flex-wrap gap-2 mb-5 xl:hidden">
                          {job.impacts.map((imp) => (
                            <span
                              key={imp}
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/5 border border-white/10 text-muted"
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
                              className="flex items-start gap-3 text-muted text-sm leading-relaxed"
                            >
                              <span className="text-muted mt-1.5 shrink-0 font-mono text-xs">
                                —
                              </span>
                              <span>{p}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {job.tech.map((t) => (
                            <span
                              key={t}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted"
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
          <div className="border-t border-white/10" />
        </div>
      </div>
    </div>
  );
}
