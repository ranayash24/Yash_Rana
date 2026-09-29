'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

const jobs = [
  {
    period:'May 2026 — Present', role:'Software Developer', company:'Kofax', type:'Canada',
    impacts:['1M+ Records','+20% Automation','30+ Issues Resolved'],
    points:[
      'Develop and maintain Python- and FastAPI-based backend services supporting enterprise workflows and processing 1M+ records, implementing reusable business logic, validation, transformation, and exception-handling components.',
      'Design and integrate REST APIs and JSON-based services across 10+ enterprise sources, implementing authentication, request/response handling, payload validation, error handling, and integration workflows.',
      'Develop AI-enabled backend capabilities using LLM APIs, embeddings, and RAG patterns to support context-aware information retrieval and intelligent application workflows.',
      'Build reusable Python automation components for recurring application workflows, reducing manual intervention by approximately 20% and improving execution consistency across operational processes.',
      'Develop and execute pytest-based unit and integration tests covering API endpoints, business logic, validation rules, exception scenarios, and regression cases; support Docker-based application environments and CI/CD workflows through Git and Azure DevOps.',
      'Troubleshoot and resolve 30+ application, API integration, and processing issues using SQL diagnostics, execution logs, API responses, automated test results, and root-cause analysis, collaborating with engineering teams on corrective solutions.',
      'Support Agile/Scrum delivery through requirements refinement, development coordination, UAT, defect resolution, release support, technical documentation, and production troubleshooting.',
    ],
    tech:['Python','FastAPI','REST APIs','Docker','pytest','CI/CD','Azure DevOps','LLM APIs','RAG'],
  },
  {
    period:'Sep 2025 — Apr 2026', role:'Software Developer Intern', company:'Coupa Software', type:'Canada',
    impacts:['500K+ Records','+15% Automation','25+ Issues Resolved'],
    points:[
      'Developed Python- and SQL-based backend workflows for processing and validating 500K+ enterprise records, implementing reusable transformation, validation, and business-rule components.',
      'Integrated REST APIs and JSON services to support enterprise application workflows, handling authentication, request/response processing, malformed payloads, rate-limit conditions, and integration exceptions.',
      'Developed 3+ Python automation workflows, reducing recurring manual processing activities by approximately 15% while improving execution consistency and workflow reliability.',
      'Implemented pytest-based unit and integration testing for application logic, API integrations, validation rules, and exception scenarios; supported Docker-based development and testing environments.',
      'Supported CI/CD workflows through Git and Azure DevOps, contributing to automated validation, build checks, defect fixes, and controlled application delivery.',
      'Investigated 25+ application and API integration issues using logs, API responses, SQL diagnostics, test results, and root-cause analysis, resolving authentication, malformed-payload, and integration failures.',
      'Performed UAT and structured application testing against functional requirements, documenting expected versus actual behavior, reproducing defects, and coordinating fixes with development and business teams.',
    ],
    tech:['Python','SQL','REST APIs','Docker','pytest','Git','Azure DevOps'],
  },
  {
    period:'Sep 2022 — Aug 2024', role:'Software Developer', company:'Advanced', type:'India',
    impacts:['2M+ Records','10+ Workflows','100+ UAT Scenarios'],
    points:[
      'Developed Python- and SQL-driven application solutions supporting 2M+ enterprise records, implementing complex joins, CTEs, aggregations, transformation logic, validation, and application business rules.',
      'Designed and refined 10+ enterprise application workflows, analyzing functional requirements, system dependencies, integration points, automation opportunities, and enhancement requirements.',
      'Developed backend automation and API workflows to support application integration, data processing, validation, and exception handling across enterprise systems.',
      'Implemented pytest-based unit and integration testing for application logic, API workflows, data-processing components, and regression scenarios; used Docker to standardize application development and testing environments.',
      'Supported CI/CD-enabled software delivery using Git and development pipeline practices, contributing to automated validation, defect resolution, release readiness, and post-release support.',
      'Translated requirements from 20+ business stakeholders into functional specifications, user stories, acceptance criteria, application requirements, and implementation-ready technical documentation.',
      'Developed and maintained 30+ BRDs, FRDs, functional specifications, process flows, and technical documents, establishing traceability between requirements and delivered software functionality.',
      'Supported 100+ UAT scenarios and production troubleshooting, using SQL diagnostics, execution logs, validation checks, and root-cause analysis to identify and resolve application and workflow issues.',
    ],
    tech:['Python','SQL','Docker','pytest','Git','CI/CD'],
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
