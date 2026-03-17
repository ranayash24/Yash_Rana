'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  {label:'About',href:'#about'},{label:'Experience',href:'#experience'},
  {label:'Projects',href:'#projects'},{label:'Skills',href:'#skills'},{label:'Research',href:'#research'},
]

export default function Navbar() {
  const [scrolled,setScrolled] = useState(false)
  const [open,setOpen]         = useState(false)
  const [active,setActive]     = useState('')

  useEffect(()=>{
    const onScroll = ()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',onScroll,{passive:true})
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id)}),{threshold:.35})
    document.querySelectorAll('section[id]').forEach(s=>obs.observe(s))
    return ()=>{window.removeEventListener('scroll',onScroll);obs.disconnect()}
  },[])

  const go = (href:string)=>{
    document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'})
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{y:-80,opacity:0}} animate={{y:0,opacity:1}}
        transition={{duration:.8,ease:[0.65,.05,0,1],delay:.15}}
        className="fixed top-0 left-0 right-0 z-[900] transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,7,6,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,107,0,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button onClick={()=>go('#hero')} className="group flex items-center gap-2.5">
            <span className="font-bold text-lg text-white group-hover:text-orange-400 transition-colors duration-200 tracking-tight">YR</span>
            <span className="w-px h-4 bg-white/10" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/25 group-hover:text-white/50 transition-colors">Portfolio</span>
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {links.map(l=>(
              <li key={l.href}>
                <button onClick={()=>go(l.href)} className={`nav-link ${active===l.href.slice(1)?'active':''}`}>{l.label}</button>
              </li>
            ))}
            <li><button onClick={()=>go('#contact')} className="btn-primary py-2 px-5 text-xs">Let&apos;s Talk</button></li>
          </ul>

          <button className="md:hidden flex flex-col gap-[5px] w-6 justify-center py-1" onClick={()=>setOpen(v=>!v)}>
            <motion.span animate={open?{rotate:45,y:7}:{rotate:0,y:0}} className="block h-[1px] w-6 bg-white origin-center" />
            <motion.span animate={open?{opacity:0}:{opacity:1}} className="block h-[1px] w-4 bg-white/60" />
            <motion.span animate={open?{rotate:-45,y:-7}:{rotate:0,y:0}} className="block h-[1px] w-6 bg-white origin-center" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            transition={{duration:.25}}
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center"
            style={{background:'rgba(8,7,6,0.97)',backdropFilter:'blur(24px)'}}
          >
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage:'radial-gradient(circle, rgba(255,107,0,0.15) 1px, transparent 1px)',
              backgroundSize:'40px 40px',
            }}/>
            <ul className="relative flex flex-col items-center gap-8">
              {[...links,{label:'Contact',href:'#contact'}].map((l,i)=>(
                <motion.li key={l.href} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.06,duration:.4,ease:[0.65,.05,0,1]}}>
                  <button onClick={()=>go(l.href)} className="text-4xl font-bold text-white/60 hover:text-white transition-colors duration-200 tracking-tight uppercase">{l.label}</button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
