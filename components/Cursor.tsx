'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current!
    let tx = -100, ty = -100
    let cx = -100, cy = -100
    let raf: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    document.addEventListener('mousemove', onMove)

    const tick = () => {
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      blob.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Grow cursor only on links/buttons — no text shadowing
    const addHover    = () => blob.classList.add('is-hover')
    const removeHover = () => blob.classList.remove('is-hover')

    const bindAll = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', removeHover)
      })
    }
    bindAll()

    const mo = new MutationObserver(bindAll)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      mo.disconnect()
    }
  }, [])

  return <div ref={blobRef} className="cursor-blob" />
}
