'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const cats = [
  { icon:'💻', label:'Languages',               skills:['Python','Java','JavaScript','TypeScript','SQL','C','HTML5','CSS'] },
  { icon:'🖥️', label:'Frameworks & Libraries',  skills:['FastAPI','Spring Boot','React','Next.js','Node.js','Flask','Express','React Native'] },
  { icon:'🤖', label:'Machine Learning & AI',   skills:['Scikit-learn','TensorFlow','PyTorch','XGBoost','LSTM','LangChain','Pandas','NumPy','BERT','Hugging Face','Matplotlib','Seaborn'] },
  { icon:'☁️', label:'Cloud / DevOps / Tools',  skills:['AWS','Azure','Google Cloud','Docker','Git','Jira','Postman','Power BI','Vercel','Streamlit'] },
  { icon:'🗄️', label:'Databases',               skills:['MySQL','PostgreSQL','MongoDB','Firebase','Supabase','Prisma'] },
  { icon:'🧠', label:'Expertise Areas',         skills:['Distributed Systems','API Design','Data Visualization','Time-Series Forecasting','LLM Integration','NLP','Neural Style Transfer'] },
]

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: (i:number) => ({ opacity:1, y:0, transition:{ duration:.6, ease:[0.25,.4,.25,1], delay:i*.1 } }),
}
const lineReveal = {
  hidden:  { clipPath:'inset(0 0 100% 0)' },
  visible: (i:number) => ({ clipPath:'inset(0 0 0% 0)', transition:{ duration:.8, ease:[0.65,.05,0,1], delay:i*.14 } }),
}

export default function Skills() {
  const ref   = useRef<HTMLElement>(null)
  const inView= useInView(ref, { once:true, margin:'-10% 0px' })

  return (
    <section ref={ref} id="skills" className="py-24 md:py-36" style={{ background:'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">04 — Skills</motion.p>
            <div className="clip-reveal">
              <motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
                className="display-text text-white" style={{ fontSize:'clamp(2.8rem,6vw,6rem)' }}
              >Elite-level tools,</motion.h2>
            </div>
            <div className="clip-reveal">
              <motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
                className="display-text" style={{ fontSize:'clamp(2.8rem,6vw,6rem)', WebkitTextStroke:'1.5px rgba(255,107,0,0.5)', color:'transparent' }}
              >Mastered.</motion.h2>
            </div>
          </div>
          <motion.span custom={2} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
            className="font-mono font-bold text-[6rem] leading-none select-none hidden lg:block" style={{ color:'rgba(255,107,0,0.04)' }}
          >04</motion.span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden" style={{ background:'rgba(255,107,0,0.06)' }}>
          {cats.map(({ icon, label, skills }, ci) => (
            <motion.div key={label} custom={ci+3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
              className="p-6 transition-colors duration-300 group"
              style={{ background:'var(--surface)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='var(--surface-2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='var(--surface)'}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
                <h3 className="text-white/50 font-mono text-xs uppercase tracking-widest">{label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s,si) => (
                  <motion.span key={s}
                    initial={{ opacity:0, scale:.85 }}
                    animate={inView?{ opacity:1, scale:1 }:{}}
                    transition={{ duration:.35, ease:[0.25,.4,.25,1], delay: ci*.07+si*.03 }}
                    className="pill"
                  >{s}</motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
