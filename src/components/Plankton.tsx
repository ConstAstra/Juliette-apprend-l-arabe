import { useEffect, useRef } from 'react'

/** Fond animé : quelques points de plancton qui dérivent lentement dans la nuit. */
export function Plankton() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const motes = Array.from({ length: 34 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.12,
      vy: -0.05 - Math.random() * 0.15,
      phase: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.25,
    }))

    let frame = 0
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        if (!still) {
          m.x += m.vx
          m.y += m.vy
          if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w }
          if (m.x < -10) m.x = w + 10
          if (m.x > w + 10) m.x = -10
        }
        const glow = 0.35 + 0.35 * Math.sin(t / 1400 + m.phase)
        const color = m.gold ? `rgba(240,217,160,${glow})` : `rgba(95,220,201,${glow})`
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!still) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
