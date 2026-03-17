'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ROLES = ['Full Stack Developer', 'Data Scientist', 'ML Engineer', 'Researcher']

function useTyping(roles: string[]) {
  const [text, setText] = useState('')
  const [idx, setIdx]   = useState(0)
  const [del, setDel]   = useState(false)
  useEffect(() => {
    const role = roles[idx]
    let t: ReturnType<typeof setTimeout>
    if (!del && text === role)   t = setTimeout(() => setDel(true), 2000)
    else if (del && text === '') { setDel(false); setIdx(i => (i+1) % roles.length) }
    else t = setTimeout(() => setText(del ? role.slice(0,text.length-1) : role.slice(0,text.length+1)), del?45:80)
    return () => clearTimeout(t)
  }, [text, del, idx, roles])
  return text
}

const STATS = [
  { target:39, suffix:'+', label:'GitHub Repos' },
  { target:8,  suffix:'+', label:'Projects Built' },
  { target:95, suffix:'%', label:'ML Accuracy' },
]

function Counter({ target, suffix }: { target:number; suffix:string }) {
  const [val, setVal] = useState(0)
  const [run, setRun] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setRun(true) }, { threshold:.5 })
    obs.observe(ref.current!)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (!run) return
    const dur = 1600, start = performance.now()
    const step = (now: number) => {
      const t = Math.min((now-start)/dur, 1)
      setVal(Math.floor((1-Math.pow(1-t,3))*target))
      if (t < 1) requestAnimationFrame(step); else setVal(target)
    }
    requestAnimationFrame(step)
  }, [run, target])
  return <span ref={ref}>{val}{suffix}</span>
}

const lineReveal = {
  hidden:  { clipPath: 'inset(0 0 100% 0)' },
  visible: (i: number) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: .9, ease: [0.65,.05,0,1], delay: .3 + i*.18 }
  }),
}

export default function Hero() {
  const ref        = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const spotRef    = useRef<HTMLDivElement>(null)
  const typing     = useTyping(ROLES)
  const mouseRef   = useRef({ x: -500, y: -500, tx: -500, ty: -500 })
  const { scrollYProgress } = useScroll({ target:ref, offset:['start start','end start'] })
  const y   = useTransform(scrollYProgress, [0,1],   ['0%','20%'])
  const opa = useTransform(scrollYProgress, [0,.65], [1,0])

  // Cursor-tracked spotlight
  useEffect(() => {
    const spot = spotRef.current!
    const m = mouseRef.current
    let raf: number

    const onMove = (e: MouseEvent) => {
      const r = ref.current!.getBoundingClientRect()
      if (e.clientY > r.bottom) return
      m.tx = e.clientX
      m.ty = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      m.x += (m.tx - m.x) * 0.08
      m.y += (m.ty - m.y) * 0.08
      spot.style.transform = `translate(${m.x}px, ${m.y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  // Particle canvas
  useEffect(() => {
    const cv = canvasRef.current!; const ctx = cv.getContext('2d')!
    let raf: number
    const resize = () => { cv.width=cv.offsetWidth; cv.height=cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    type Pt={x:number;y:number;vx:number;vy:number;r:number;a:number;life:number;max:number}
    const pts:Pt[] = Array.from({length:110},()=>({
      x:Math.random()*cv.width, y:Math.random()*cv.height,
      vx:(Math.random()-.5)*.5, vy:(Math.random()-.5)*.5,
      r:Math.random()*2.2+.6, a:Math.random()*.7+.25,
      life:Math.random()*200, max:Math.random()*200+120,
    }))
    const draw = () => {
      ctx.clearRect(0,0,cv.width,cv.height)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // Canvas spotlight — bright inner halo drawn directly on canvas
      if(mx > -400) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 220)
        grad.addColorStop(0,   'rgba(255,107,0,0.28)')
        grad.addColorStop(0.3, 'rgba(255,107,0,0.12)')
        grad.addColorStop(1,   'rgba(255,107,0,0)')
        ctx.beginPath(); ctx.arc(mx, my, 220, 0, Math.PI*2)
        ctx.fillStyle = grad; ctx.fill()

        // Bright core ring
        const core = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
        core.addColorStop(0,   'rgba(255,160,60,0.55)')
        core.addColorStop(0.5, 'rgba(255,107,0,0.22)')
        core.addColorStop(1,   'rgba(255,107,0,0)')
        ctx.beginPath(); ctx.arc(mx, my, 60, 0, Math.PI*2)
        ctx.fillStyle = core; ctx.fill()
      }

      pts.forEach(p => {
        p.life++
        if(p.life>p.max){p.x=Math.random()*cv.width;p.y=Math.random()*cv.height;p.life=0}
        const dx=p.x-mx,dy=p.y-my,d=Math.sqrt(dx*dx+dy*dy)
        if(d<200 && d>70){p.vx-=(dx/d)*.3;p.vy-=(dy/d)*.3}
        else if(d<70 && d>1){p.vx+=(dx/d)*.65;p.vy+=(dy/d)*.65}
        p.vx*=.97;p.vy*=.97;p.x+=p.vx;p.y+=p.vy
        if(p.x<0||p.x>cv.width)p.vx*=-1
        if(p.y<0||p.y>cv.height)p.vy*=-1
        const prog=p.life/p.max
        const fade=1-Math.abs(prog-.5)*2
        // particles near cursor glow brighter
        const nearBoost = d<200 ? 1+(1-d/200)*1.8 : 1
        const a = Math.min(p.a*fade*nearBoost, 0.95)
        const r = d<200 ? p.r*(1+(1-d/200)*1.2) : p.r
        ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,107,0,${a})`;ctx.fill()
      })
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy)
        if(d<140){
          // lines near cursor glow brighter
          const cdx=pts[i].x-mx,cdy=pts[i].y-my,cd=Math.sqrt(cdx*cdx+cdy*cdy)
          const boost = cd<200 ? 1+(1-cd/200)*3 : 1
          const a = Math.min((1-d/140)*.15*boost, 0.7)
          ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y)
          ctx.strokeStyle=`rgba(255,107,0,${a})`;ctx.lineWidth=.8;ctx.stroke()
        }
      }
      raf=requestAnimationFrame(draw)
    }
    draw()
    return ()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize)}
  }, [])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-bg">
      {/* Dot grid */}
      <div className="hero-dots" />

      {/* Ambient floating orb — top-right */}
      <div className="absolute pointer-events-none" style={{
        top:'-10%', right:'-8%',
        width:600, height:600, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,107,0,0.13) 0%, transparent 70%)',
        filter:'blur(60px)',
        animation:'heroOrb1 9s ease-in-out infinite alternate',
        zIndex:0,
      }}/>
      {/* Ambient floating orb — bottom-left */}
      <div className="absolute pointer-events-none" style={{
        bottom:'-5%', left:'-6%',
        width:500, height:500, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(255,140,30,0.10) 0%, transparent 70%)',
        filter:'blur(50px)',
        animation:'heroOrb2 12s ease-in-out infinite alternate',
        zIndex:0,
      }}/>

      {/* Cursor spotlight — hero only — outer halo */}
      <div ref={spotRef} className="absolute pointer-events-none will-change-transform"
        style={{
          top:0, left:0,
          width:1100, height:1100,
          borderRadius:'50%',
          background:'radial-gradient(circle, rgba(255,107,0,0.32) 0%, rgba(255,107,0,0.18) 20%, rgba(255,107,0,0.07) 45%, transparent 70%)',
          filter:'blur(8px)',
          zIndex:1,
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{zIndex:2}} />

      <motion.div style={{y, opacity:opa, position:'relative', zIndex:3}} className="w-full">
        {/* Status */}
        <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.1}}
          className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{background:'#FF6B00'}} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{background:'#FF6B00'}} />
            </span>
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{color:'rgba(255,107,0,0.6)'}}>
              Open to work · Montréal, QC
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-white/15 hidden md:block">
            Full Stack · Data Science · ML
          </span>
        </motion.div>

        {/* ── BIG NAME ── */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-0">
          <div className="clip-reveal">
            <motion.div custom={0} variants={lineReveal} initial="hidden" animate="visible"
              className="display-text text-white"
              style={{fontSize:'clamp(5.5rem,18vw,19rem)',lineHeight:.84,letterSpacing:'-0.03em'}}
            >YASH</motion.div>
          </div>
          <div className="clip-reveal -mt-2 md:-mt-4 flex justify-end md:justify-start md:pl-[8vw]">
            <motion.div custom={1} variants={lineReveal} initial="hidden" animate="visible"
              className="display-text"
              style={{
                fontSize:'clamp(5.5rem,18vw,19rem)',lineHeight:.84,letterSpacing:'-0.03em',
                WebkitTextStroke:'1.5px rgba(255,107,0,0.6)',color:'transparent',
              }}
            >RANA</motion.div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="mt-8 md:mt-12 border-t" style={{borderColor:'rgba(255,107,0,0.1)'}}>
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center">
            {/* Typing */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:1.1}}
              className="flex items-center gap-2"
            >
              <span className="text-white/30 font-mono text-sm">&gt;</span>
              <span className="text-white/65 font-mono text-sm min-w-[220px]">
                {typing}
                <span className="inline-block w-[2px] h-4 ml-0.5 align-middle animate-pulse" style={{background:'#FF6B00'}} />
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:1.2}}
              className="flex justify-start md:justify-center gap-8"
            >
              {STATS.map(({target,suffix,label}) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-white tabular-nums">
                    <Counter target={target} suffix={suffix} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mt-0.5" style={{color:'rgba(255,107,0,0.5)'}}>{label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:1.3}}
              className="flex gap-3 md:justify-end flex-wrap"
            >
              <a href="#projects" className="btn-primary text-sm py-2.5 px-5">View Work ↗</a>
              <a href="/resume.pdf" download className="btn-outline text-sm py-2.5 px-5">Resume ↓</a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Vertical socials */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.6,duration:.6}}
        className="absolute left-6 bottom-24 hidden xl:flex flex-col items-center gap-4"
      >
        {[{l:'GH',h:'https://github.com/ranayash24'},{l:'LI',h:'https://linkedin.com/in/yash-vinaychandra-rana'},{l:'EM',h:'mailto:yashrana2402@gmail.com'}].map(({l,h})=>(
          <a key={l} href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel="noopener noreferrer"
            className="text-[10px] font-mono text-white/20 hover:text-white transition-colors tracking-widest"
          >{l}</a>
        ))}
        <div className="w-px h-12" style={{background:'linear-gradient(to bottom, rgba(255,107,0,0.3), transparent)'}} />
      </motion.div>

      {/* Scroll */}
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.8,duration:.6}}
        className="absolute right-8 bottom-6 flex items-center gap-2"
      >
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white/20">Scroll</span>
        <motion.div animate={{x:[0,5,0]}} transition={{repeat:Infinity,duration:1.4,ease:'easeInOut'}}
          className="text-white/20 text-xs"
        >→</motion.div>
      </motion.div>
    </section>
  )
}
