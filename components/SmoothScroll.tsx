'use client'

import { useEffect, ReactNode } from 'react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void; on: (event: string, cb: (data: { scroll: number; limit: number }) => void) => void } | null = null

    async function init() {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1.1,
        touchMultiplier: 1.5,
      }) as typeof lenis

      // Expose lenis globally for scroll progress
      ;(window as Window & { __lenis?: typeof lenis }).__lenis = lenis

      function raf(time: number) {
        lenis!.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    init()
    return () => { lenis?.destroy() }
  }, [])

  return <>{children}</>
}
