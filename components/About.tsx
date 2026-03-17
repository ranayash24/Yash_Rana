'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const meta = [
  {icon:'📍',text:'Montréal, QC, Canada'},
  {icon:'🎓',text:'Concordia University, MApCompSc · 2024–2026'},
  {icon:'🏆',text:'SSIP Hackathon 2022 — Finalist'},
  {icon:'📄',text:'Published Researcher — Atlantis Press, ICAAAI 2025'},
]
const education = [
  {period:'Sep 2024 — May 2026',degree:'Master of Applied Computer Science',school:'Concordia University',location:'Montréal, QC, Canada',current:true},
  {period:'Sep 2020 — Apr 2024',degree:'Bachelor of Engineering — Computer Engineering',school:'Gujarat Technological University',location:'Gujarat, India',current:false},
]

const lineReveal = {
  hidden: {clipPath:'inset(0 0 100% 0)'},
  visible:(i:number)=>({clipPath:'inset(0 0 0% 0)',transition:{duration:.8,ease:[0.65,.05,0,1],delay:i*.12}}),
}
const fadeUp = {
  hidden: {opacity:0,y:24},
  visible:(i:number)=>({opacity:1,y:0,transition:{duration:.7,ease:[0.25,.4,.25,1],delay:i*.1}}),
}

export default function About() {
  const ref   = useRef<HTMLElement>(null)
  const inView= useInView(ref,{once:true,margin:'-10% 0px'})

  return (
    <section ref={ref} id="about" className="py-24 md:py-36 bg-bg" style={{borderTop:'1px solid rgba(255,107,0,0.07)'}}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">

        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">01 — About</motion.p>
            <div className="clip-reveal"><motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'} className="display-text text-white" style={{fontSize:'clamp(2.8rem,6vw,6rem)'}}>Motivated.</motion.h2></div>
            <div className="clip-reveal"><motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'} className="display-text" style={{fontSize:'clamp(2.8rem,6vw,6rem)',WebkitTextStroke:'1.5px rgba(255,107,0,0.5)',color:'transparent'}}>Detail-oriented.</motion.h2></div>
            <div className="clip-reveal"><motion.h2 custom={2} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'} className="display-text text-white" style={{fontSize:'clamp(2.8rem,6vw,6rem)'}}>Results-driven.</motion.h2></div>
          </div>
          <motion.span custom={3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="num-ghost text-[6rem] hidden lg:block">01</motion.span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
          <div className="space-y-5">
            {['Motivated and detail-oriented Software Developer with a background in computer science since 2020. Known for delivering in deadline-driven environments with a patient, methodical approach to problem-solving.',
              'Able to quickly pick up new tools and platforms, work independently or in cross-functional teams, and contribute to both research work and production-grade systems. Currently pursuing a Master of Applied Computer Science at Concordia University, Montréal.'].map((p,i)=>(
              <motion.p key={i} custom={i+3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="text-white/45 text-[0.95rem] leading-relaxed">{p}</motion.p>
            ))}
          </div>
          <div className="space-y-2">
            {meta.map(({icon,text},i)=>(
              <motion.div key={i} custom={i+5} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}
                className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group"
                style={{border:'1px solid rgba(255,255,255,0.06)',background:'rgba(255,107,0,0.02)'}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(255,107,0,0.22)';el.style.background='rgba(255,107,0,0.05)'}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(255,255,255,0.06)';el.style.background='rgba(255,107,0,0.02)'}}
              >
                <span className="text-lg shrink-0">{icon}</span>
                <span className="text-white/50 text-sm">{text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div custom={9} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}>
          <p className="section-num mb-6">Education</p>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map(({period,degree,school,location,current})=>(
              <div key={degree} className="card p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/25 text-xs font-mono">{period}</span>
                  {current&&(
                    <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider"
                      style={{background:'rgba(255,107,0,0.1)',border:'1px solid rgba(255,107,0,0.25)',color:'#FF9A40'}}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#FF6B00'}}/>Current
                    </span>
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 leading-tight">{degree}</h3>
                <p className="text-sm font-medium" style={{color:'rgba(255,150,80,0.7)'}}>{school}</p>
                <p className="text-white/25 text-xs mt-1 font-mono">{location}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
