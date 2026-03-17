'use client'
interface Props { items: string[]; direction?: 'left'|'right' }

export default function MarqueeBanner({ items, direction='left' }: Props) {
  const doubled = [...items, ...items]
  return (
    <div className="py-3 overflow-hidden" style={{ borderTop:'1px solid rgba(255,107,0,0.08)', borderBottom:'1px solid rgba(255,107,0,0.08)', background:'rgba(255,107,0,0.02)' }}>
      <div style={{ display:'flex', whiteSpace:'nowrap', animation:`${direction==='left'?'marquee-left':'marquee-right'} 32s linear infinite` }}>
        {doubled.map((item,i) => (
          <span key={i} className="inline-flex items-center gap-5 px-5">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/20">{item}</span>
            <span className="text-orange-500/25 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
