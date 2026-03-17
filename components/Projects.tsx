'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  { num:'01', title:'F1 Prediction Market',          tags:['Full Stack','ML / AI'],        desc:'Real-time F1 prediction market — live data feeds, ML-driven odds, user predictions on race outcomes and championship standings.',                                               tech:['Python','FastAPI','Next.js','PostgreSQL','WebSocket','ML'], links:[{label:'GitHub',href:'https://github.com/ranayash24/f1_prediction_market'}] },
  { num:'02', title:'Task Tracker CLI',               tags:['CLI Tool'],                    desc:'Terminal-based task manager with project grouping, priority levels, due dates and rich progress visualization.',                                                               tech:['Python','Click','SQLite','Rich'],                          links:[{label:'GitHub',href:'https://github.com/ranayash24'}] },
  { num:'03', title:'Unit Converter',                 tags:['Full Stack'],                  desc:'100+ unit conversion with real-time results, history tracking, and currency support.',                                                                                        tech:['React','TypeScript','Node.js'],                           links:[{label:'GitHub',href:'https://github.com/ranayash24'}] },
  { num:'04', title:'Sales GPT',                      tags:['ML / AI','LLM'],               desc:'AI sales assistant automating lead qualification, personalized outreach, and real-time conversation coaching via LLMs.',                                                     tech:['Python','LangChain','OpenAI','FastAPI','React'],           links:[{label:'GitHub',href:'https://github.com/ranayash24'}] },
  { num:'05', title:'F1 Vision',                      tags:['Full Stack','ML / AI'],        desc:'F1 intelligence platform with live telemetry, Gradient Boosting race predictions, driver analytics, and LLM strategy insights.',                                            tech:['FastAPI','Python','Next.js','ML','LLMs'],                  links:[{label:'GitHub',href:'https://github.com/ranayash24'}] },
  { num:'06', title:'Early Diabetes Detection via ML', tags:['Published Research'],         desc:'Published ICAAAI 2025. SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction.',                                                            tech:['Python','SVM','Scikit-learn','Pandas','Matplotlib'],       links:[{label:'Read Paper',href:'https://www.atlantis-press.com/proceedings/icaaai-25'}] },
  { num:'07', title:'Distributed Share Market',       tags:['Distributed Systems'],         desc:'Fault-tolerant replicated trading system with active replication, consensus protocols and Byzantine failure recovery.',                                                     tech:['Java','UDP','Distributed Systems','Consensus'],            links:[{label:'GitHub',href:'https://github.com/ranayash24'}] },
  { num:'08', title:'Online Movie Ticket Booking',    tags:['Full Stack'],                  desc:'Full-stack booking platform — auth, real-time seat selection, simulated payments, Spring Boot REST API.',                                                                    tech:['React','Spring Boot','MySQL','Vercel'],                    links:[{label:'Live Demo',href:'https://book-my-show-chi.vercel.app'},{label:'GitHub',href:'https://github.com/ranayash24/book-my-show'}] },
  { num:'09', title:'BERT Sentiment Analysis',        tags:['ML / AI','NLP'],               desc:'Fine-tuned BERT for sentiment classification served via Flask REST API with full training pipeline.',                                                                        tech:['Python','BERT','Hugging Face','Flask','PyTorch'],          links:[{label:'GitHub',href:'https://github.com/ranayash24/bert_sentiment'}] },
  { num:'10', title:'Book Recommendation System',     tags:['ML / AI'],                     desc:'Collaborative filtering + content-based recommendation engine built on reading history and preferences.',                                                                    tech:['Python','Pandas','Scikit-learn','Jupyter'],                links:[{label:'GitHub',href:'https://github.com/ranayash24/book_recommended_system'}] },
  { num:'11', title:'Style Fusion',                   tags:['ML / AI','Deep Learning'],     desc:'Neural style transfer blending artistic styles with content images via VGG feature extraction.',                                                                             tech:['Python','PyTorch','Deep Learning','Jupyter'],              links:[{label:'GitHub',href:'https://github.com/ranayash24/style_fusion'}] },
  { num:'12', title:'Text Summarizer',                tags:['ML / AI','NLP'],               desc:'Transformer-based and extractive text summarization generating concise summaries from long-form content.',                                                                   tech:['Python','NLP','Transformers','Jupyter'],                   links:[{label:'GitHub',href:'https://github.com/ranayash24/Text_summarizer_project'}] },
]

function TiltCard({ p }: { p: typeof projects[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x:0, y:0 })
  const [glow, setGlow] = useState({ x:50, y:50 })
  const [hovered, setHovered] = useState(false)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    setTilt({ x:(y-.5)*-12, y:(x-.5)*12 })
    setGlow({ x:x*100, y:y*100 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({x:0,y:0}); setHovered(false) }}
      animate={{ rotateX:tilt.x, rotateY:tilt.y }}
      transition={{ type:'spring', stiffness:280, damping:28 }}
      style={{ transformStyle:'preserve-3d', perspective:900 }}
      className="card h-full"
    >
      {/* Mouse glow */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{ opacity:hovered?1:0, background:`radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,107,0,0.09) 0%, transparent 60%)` }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <span className="text-white/12 font-mono text-xs">{p.num}</span>
          <div className="flex flex-wrap gap-1.5 justify-end">
            {p.tags.map(t => (
              <span key={t} className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded uppercase tracking-wider"
                style={{ background:'rgba(255,107,0,0.08)', border:'1px solid rgba(255,107,0,0.2)', color:'#FF9A40' }}
              >{t}</span>
            ))}
          </div>
        </div>
        <h3 className="text-white font-bold text-xl mb-3 leading-tight tracking-tight">{p.title}</h3>
        <p className="text-white/38 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.tech.map(t => <span key={t} className="pill">{t}</span>)}
        </div>
        <div className="flex gap-4">
          {p.links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-orange-300/60 hover:text-orange-200 transition-colors"
              style={{ textDecoration:'none', borderBottom:'1px solid rgba(255,107,0,0.2)', paddingBottom:'1px' }}
            >{l.label} ↗</a>
          ))}
        </div>
        {/* Accent dot */}
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-orange-500/40 transition-all duration-300"
          style={{ boxShadow: hovered?'0 0 8px rgba(255,107,0,0.8)':'none' }}
        />
      </div>
    </motion.div>
  )
}

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: (i:number) => ({ opacity:1, y:0, transition:{ duration:.6, ease:[0.25,.4,.25,1], delay:i*.07 } }),
}
const lineReveal = {
  hidden:  { clipPath:'inset(0 0 100% 0)' },
  visible: (i:number) => ({ clipPath:'inset(0 0 0% 0)', transition:{ duration:.8, ease:[0.65,.05,0,1], delay:i*.14 } }),
}

export default function Projects() {
  const ref   = useRef<HTMLElement>(null)
  const inView= useInView(ref, { once:true, margin:'-10% 0px' })

  return (
    <section ref={ref} id="projects" className="py-24 md:py-36 bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">03 — Projects</motion.p>
            <div className="clip-reveal">
              <motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
                className="display-text text-white" style={{ fontSize:'clamp(2.8rem,6vw,6rem)' }}
              >Projects that</motion.h2>
            </div>
            <div className="clip-reveal">
              <motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
                className="display-text" style={{ fontSize:'clamp(2.8rem,6vw,6rem)', WebkitTextStroke:'1.5px rgba(255,107,0,0.5)', color:'transparent' }}
              >Make an impact.</motion.h2>
            </div>
          </div>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
            className="text-white/20 text-xs font-mono max-w-[180px] text-right"
          >{projects.length} projects built</motion.p>
        </div>

        {/* Featured */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="mb-5">
          <TiltCard p={projects[0]} />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(1).map((p,i) => (
            <motion.div key={p.num} custom={i+4} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}>
              <TiltCard p={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
