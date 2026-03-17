'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const achievements = [
  { icon:'🏆', title:'SSIP Hackathon 2022', desc:'Finalist — State-level innovation competition' },
  { icon:'📄', title:'Published Researcher', desc:'Atlantis Press — ICAAAI 2025 Proceedings' },
  { icon:'⬡',  title:'GitHub Pull Shark',   desc:'39 public repositories' },
  { icon:'🎓', title:'Concordia University', desc:'Master of Applied Computer Science · 2024–2026' },
]

const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: (i:number) => ({ opacity:1, y:0, transition:{ duration:.65, ease:[0.25,.4,.25,1], delay:i*.1 } }),
}
const lineReveal = {
  hidden:  { clipPath:'inset(0 0 100% 0)' },
  visible: (i:number) => ({ clipPath:'inset(0 0 0% 0)', transition:{ duration:.8, ease:[0.65,.05,0,1], delay:i*.14 } }),
}

export default function Research() {
  const ref   = useRef<HTMLElement>(null)
  const inView= useInView(ref, { once:true, margin:'-10% 0px' })

  return (
    <section ref={ref} id="research" className="py-24 md:py-36 bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">05 — Research</motion.p>
        <div className="clip-reveal mb-2">
          <motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
            className="display-text text-white" style={{ fontSize:'clamp(2.8rem,6vw,6rem)' }}
          >Published work</motion.h2>
        </div>
        <div className="clip-reveal mb-14">
          <motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
            className="display-text" style={{ fontSize:'clamp(2.8rem,6vw,6rem)', WebkitTextStroke:'1.5px rgba(255,107,0,0.5)', color:'transparent' }}
          >&amp; achievements.</motion.h2>
        </div>

        {/* Publication */}
        <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
          className="card p-8 md:p-12 mb-8 group relative overflow-hidden"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background:'radial-gradient(ellipse at 20% 50%, rgba(255,107,0,0.06), transparent 65%)' }}
          />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider mb-6"
              style={{ background:'rgba(255,107,0,0.1)', border:'1px solid rgba(255,107,0,0.22)', color:'#FF9A40' }}
            >📄 Published Paper</span>

            <h3 className="text-white font-bold text-2xl md:text-3xl mb-4 leading-tight tracking-tight">
              &quot;Early Detection of Diabetes using Machine Learning&quot;
            </h3>
            <p className="text-white/30 text-sm mb-6 font-mono">
              Atlantis Press — ICAAAI 2025 Proceedings
            </p>
            <p className="text-white/45 leading-relaxed mb-8 max-w-3xl text-[0.95rem]">
              Presents an SVM-based diagnostic model achieving 95% accuracy for early-stage diabetes prediction.
              Validates against Random Forest, KNN, and Logistic Regression baselines with clinical feature engineering.
            </p>
            <div className="flex flex-wrap gap-10 mb-8">
              {[{v:'95%',l:'Model Accuracy'},{v:'SVM',l:'Primary Algorithm'},{v:'ICAAAI 2025',l:'Conference'}].map(({ v, l }) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-orange-300">{v}</div>
                  <div className="text-white/25 text-xs font-mono uppercase tracking-widest mt-0.5">{l}</div>
                </div>
              ))}
            </div>
            <a href="https://www.atlantis-press.com/proceedings/icaaai-25" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
              Read Paper ↗
            </a>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map(({ icon, title, desc }, i) => (
            <motion.div key={title} custom={i+3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
              className="card p-6 group"
            >
              <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform duration-300">{icon}</span>
              <h4 className="text-white font-semibold mb-1.5 tracking-tight">{title}</h4>
              <p className="text-white/35 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
