'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const jobs = [
  {
    period:'Dec 2023 — Jun 2024', role:'Data Science Intern', company:'Blue Data Consulting', type:'Remote',
    impacts:['−68% Gen. Time','92% Tone Accuracy','+30% Consistency'],
    points:[
      'Built an end-to-end AI content generation system converting client descriptions into text, audio, and video using LLMs, LangChain, and Azure Cognitive Services.',
      'Engineered a production TTS + video generation workflow with Azure Speech + Video Indexer APIs — cutting generation time from 25 → 8 minutes (−68%) at 92% accuracy.',
      'Integrated feedback-driven prompt refinement and automated quality scoring, improving generative consistency by 30%.',
    ],
    tech:['Python','LangChain','Azure Cognitive Services','Azure Speech API','Azure Video Indexer','LLMs'],
  },
  {
    period:'Jun 2023 — Nov 2023', role:'Full Stack Developer Intern', company:'ShapeAI', type:'Remote',
    impacts:['+83% Active Users','−45% Backend Errors','+40% Load Speed'],
    points:[
      'Delivered a MERN-stack portal for an ed-tech client — active users grew from 120 → 220 (+83%) after introducing interactive dashboards.',
      'Built secure React.js + Node.js/Express APIs with JWT auth and validation middleware, reducing errors by 45%.',
      'Optimized front-end with modular React hooks, lazy loading, and caching — improving load speed by 40%.',
    ],
    tech:['React.js','Node.js','Express.js','MongoDB','JWT','REST APIs'],
  },
]

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: (i:number) => ({ opacity:1, y:0, transition:{ duration:.7, ease:[0.25,.4,.25,1], delay:i*.1 } }),
}
const lineReveal = {
  hidden:  { clipPath:'inset(0 0 100% 0)' },
  visible: (i:number) => ({ clipPath:'inset(0 0 0% 0)', transition:{ duration:.8, ease:[0.65,.05,0,1], delay:i*.14 } }),
}

export default function Experience() {
  const ref   = useRef<HTMLElement>(null)
  const inView= useInView(ref, { once:true, margin:'-10% 0px' })
  const [expanded, setExpanded] = useState<number|null>(null)

  return (
    <section ref={ref} id="experience" className="py-24 md:py-36" style={{ background:'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">02 — Experience</motion.p>
          <div className="clip-reveal">
            <motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
              className="display-text text-white" style={{ fontSize:'clamp(2.8rem,6vw,6rem)' }}
            >Where I&apos;ve</motion.h2>
          </div>
          <div className="clip-reveal">
            <motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
              className="display-text" style={{ fontSize:'clamp(2.8rem,6vw,6rem)', WebkitTextStroke:'1.5px rgba(255,107,0,0.5)', color:'transparent' }}
            >Made an impact.</motion.h2>
          </div>
        </div>

        <div>
          {jobs.map((job, idx) => {
            const open = expanded === idx
            return (
              <motion.div key={job.company} custom={idx+2} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
                className="group" style={{ borderTop:'1px solid rgba(255,107,0,0.08)', transition:'background .3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(255,107,0,0.015)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='transparent'}
              >
                <button className="w-full text-left py-7 flex items-start lg:items-center justify-between gap-6" onClick={() => setExpanded(open?null:idx)}>
                  <div className="flex items-start lg:items-center gap-5 flex-1 min-w-0">
                    <span className="text-white/15 font-mono text-sm shrink-0 tabular-nums mt-0.5 lg:mt-0">0{idx+1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="text-white font-bold text-xl lg:text-2xl tracking-tight">{job.role}</h3>
                        <span className="text-orange-300/70 text-sm font-medium">{job.company}</span>
                        <span className="text-white/20 text-xs font-mono">{job.type}</span>
                      </div>
                      <span className="text-white/25 text-xs font-mono">{job.period}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden md:flex gap-2 flex-wrap">
                      {job.impacts.map(imp => <span key={imp} className="impact-badge">{imp}</span>)}
                    </div>
                    <motion.div animate={{ rotate:open?45:0 }} transition={{ duration:.3 }}
                      className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 text-lg shrink-0"
                    >+</motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                      transition={{ duration:.4, ease:[0.65,.05,0,1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-10 md:pl-14">
                        <div className="flex flex-wrap gap-2 mb-5 md:hidden">
                          {job.impacts.map(imp => <span key={imp} className="impact-badge">{imp}</span>)}
                        </div>
                        <ul className="space-y-3 mb-6">
                          {job.points.map((p,i) => (
                            <motion.li key={i} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*.07,duration:.35}}
                              className="flex items-start gap-3 text-white/45 text-sm leading-relaxed"
                            >
                              <span className="text-orange-400/50 mt-1.5 shrink-0 font-mono text-xs">—</span>
                              <span>{p}</span>
                            </motion.li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {job.tech.map(t => <span key={t} className="pill">{t}</span>)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
