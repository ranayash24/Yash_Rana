'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

type Status = 'idle'|'sending'|'sent'|'error'

const lineReveal = {
  hidden:  { clipPath:'inset(0 0 100% 0)' },
  visible: (i:number) => ({ clipPath:'inset(0 0 0% 0)', transition:{ duration:.8, ease:[0.65,.05,0,1], delay:i*.14 } }),
}
const fadeUp = {
  hidden:  { opacity:0, y:24 },
  visible: (i:number) => ({ opacity:1, y:0, transition:{ duration:.65, ease:[0.25,.4,.25,1], delay:i*.1 } }),
}

export default function Contact() {
  const ref    = useRef<HTMLElement>(null)
  const formRef= useRef<HTMLFormElement>(null)
  const inView = useInView(ref, { once:true, margin:'-10% 0px' })
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus('sending')
    try {
      const ejs = (await import('@emailjs/browser')).default
      await ejs.sendForm('service_dtcqrgj','template_0w2rpis',formRef.current!,'xYpjewyPcaRv9w4yO')
      setStatus('sent'); formRef.current?.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error'); setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-24 md:py-36" style={{ background:'var(--surface)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <motion.p custom={0} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} className="section-num mb-4">06 — Contact</motion.p>
        <div className="clip-reveal mb-2">
          <motion.h2 custom={0} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
            className="display-text text-white" style={{ fontSize:'clamp(3rem,9vw,9rem)' }}
          >Let&apos;s build</motion.h2>
        </div>
        <div className="clip-reveal mb-16">
          <motion.h2 custom={1} variants={lineReveal} initial="hidden" animate={inView?'visible':'hidden'}
            className="display-text" style={{ fontSize:'clamp(3rem,9vw,9rem)', WebkitTextStroke:'1.5px rgba(255,107,0,0.5)', color:'transparent' }}
          >Something great.</motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}>
            <p className="text-white/40 text-lg leading-relaxed mb-10">
              Whether you&apos;re hiring, collaborating on research, or need an ML / full-stack system built — I&apos;d love to connect.
            </p>
            <div className="space-y-2 mb-10">
              {[
                { icon:'✉',  label:'yashrana2402@gmail.com',                 href:'mailto:yashrana2402@gmail.com' },
                { icon:'⬡',  label:'github.com/ranayash24',                  href:'https://github.com/ranayash24' },
                { icon:'in', label:'linkedin.com/in/yash-vinaychandra-rana', href:'https://linkedin.com/in/yash-vinaychandra-rana' },
                { icon:'📍', label:'Montréal, QC, Canada',                   href:null },
              ].map(({ icon, label, href }, i) => {
                const inner = (
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group"
                    style={{ border:'1px solid rgba(255,107,0,0.09)', background:'rgba(255,107,0,0.02)' }}
                  >
                    <span className="w-8 h-8 rounded-full border border-orange-500/20 flex items-center justify-center text-sm text-white/30 group-hover:text-orange-300 group-hover:border-orange-400/40 transition-colors shrink-0">{icon}</span>
                    <span className="text-white/45 text-sm font-mono group-hover:text-white/70 transition-colors">{label}</span>
                  </div>
                )
                return href ? (
                  <motion.a key={i} custom={i+3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'} href={href}
                    target={href.startsWith('mailto')?undefined:'_blank'} rel="noopener noreferrer" className="block"
                    onMouseEnter={e => { const d=e.currentTarget.querySelector('div') as HTMLElement; d.style.borderColor='rgba(255,107,0,0.28)'; d.style.background='rgba(255,107,0,0.06)' }}
                    onMouseLeave={e => { const d=e.currentTarget.querySelector('div') as HTMLElement; d.style.borderColor='rgba(255,107,0,0.09)'; d.style.background='rgba(255,107,0,0.02)' }}
                  >{inner}</motion.a>
                ) : (
                  <motion.div key={i} custom={i+3} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}>{inner}</motion.div>
                )
              })}
            </div>
            <a href="/resume.pdf" download className="btn-primary">Download Resume ↓</a>
          </motion.div>

          {/* Form */}
          <motion.div custom={6} variants={fadeUp} initial="hidden" animate={inView?'visible':'hidden'}>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              {[
                { id:'name',    label:'Name',    type:'text',  ph:'Your name',        req:true },
                { id:'email',   label:'Email',   type:'email', ph:'your@email.com',   req:true },
                { id:'subject', label:'Subject', type:'text',  ph:"What's this about?", req:false },
              ].map(({ id, label, type, ph, req }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">{label}</label>
                  <input id={id} name={id} type={type} placeholder={ph} required={req} className="form-input" />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-white/30 text-xs font-mono uppercase tracking-wider mb-1.5">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell me about your project..." required className="form-input resize-none" />
              </div>
              <button type="submit" disabled={status==='sending'}
                className={`btn-primary w-full justify-center py-4 text-base ${status==='sent'?'!bg-green-700':''} ${status==='error'?'!bg-red-800':''}`}
              >
                {status==='idle'    && <><span>Send Message</span><span>→</span></>}
                {status==='sending' && 'Sending...'}
                {status==='sent'    && 'Message Sent ✓'}
                {status==='error'   && 'Failed — email me directly'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
