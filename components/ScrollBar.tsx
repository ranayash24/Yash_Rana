'use client'

import { useEffect, useRef } from 'react'

export default function ScrollBar() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current!

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      bar.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={barRef}
      className="scroll-bar fixed top-0 left-0 right-0 h-[2px] z-[9998] origin-left"
      style={{ background: 'linear-gradient(90deg,#FF6B00,#ff9a00)' }}
    />
  )
}
