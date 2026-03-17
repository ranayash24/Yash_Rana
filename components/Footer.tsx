'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-10 bg-bg" style={{ borderTop:'1px solid rgba(255,107,0,0.07)' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-lg tracking-tight">YR</span>
          <span className="w-px h-4 bg-white/10" />
          <span className="text-white/20 text-xs font-mono tracking-wider">Software Developer · Data Scientist · ML Engineer</span>
        </div>
        <div className="flex items-center gap-6">
          {[
            { l:'GitHub',   h:'https://github.com/ranayash24' },
            { l:'LinkedIn', h:'https://linkedin.com/in/yash-vinaychandra-rana' },
            { l:'Email',    h:'mailto:yashrana2402@gmail.com' },
          ].map(({ l, h }) => (
            <a key={l} href={h} target={h.startsWith('mailto')?undefined:'_blank'} rel="noopener noreferrer"
              className="text-white/20 text-xs font-mono hover:text-orange-300 transition-colors"
            >{l}</a>
          ))}
        </div>
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          className="flex items-center gap-2 text-white/20 text-xs font-mono hover:text-orange-300 transition-colors group"
        >
          Back to top
          <motion.span animate={{ y:[0,-3,0] }} transition={{ repeat:Infinity, duration:1.5, ease:'easeInOut' }}>↑</motion.span>
        </button>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mt-6 pt-6 flex flex-col md:flex-row items-center justify-between gap-2" style={{ borderTop:'1px solid rgba(255,107,0,0.05)' }}>
        <span className="text-white/15 text-xs font-mono">© 2026 Yash Rana. All rights reserved.</span>
        <span className="text-white/15 text-xs font-mono">Designed &amp; Built by Yash Rana</span>
      </div>
    </footer>
  )
}
