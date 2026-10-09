import { useEffect, useRef } from 'react'

/** Zone de tracé : la lettre modèle apparaît en filigrane, on la repasse du doigt. */
export function TraceCanvas({ glyph }: { glyph: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  const drawGuide = () => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const dark = matchMedia('(prefers-color-scheme: dark)').matches
    ctx.fillStyle = dark ? 'rgba(255,255,255,0.14)' : 'rgba(42,33,27,0.12)'
    ctx.font = '340px "Noto Naskh Arabic", serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.direction = 'rtl'
    ctx.fillText(glyph, canvas.width / 2, canvas.height / 2)
  }

  useEffect(() => {
    drawGuide()
    document.fonts?.ready.then(drawGuide)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glyph])

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let drawing = false
    const pos = (e: PointerEvent): [number, number] => {
      const r = canvas.getBoundingClientRect()
      return [((e.clientX - r.left) / r.width) * canvas.width, ((e.clientY - r.top) / r.height) * canvas.height]
    }
    const down = (e: PointerEvent) => {
      drawing = true
      canvas.setPointerCapture(e.pointerId)
      ctx.strokeStyle = '#a9492a'
      ctx.lineWidth = 16
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      ctx.moveTo(...pos(e))
    }
    const move = (e: PointerEvent) => {
      if (!drawing) return
      ctx.lineTo(...pos(e))
      ctx.stroke()
    }
    const up = () => {
      drawing = false
    }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)
    return () => {
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [])

  return (
    <div>
      <canvas
        ref={ref}
        width={500}
        height={500}
        aria-label={`Zone de tracé de la lettre ${glyph}`}
        className="mx-auto aspect-square w-full max-w-xs touch-none rounded-2xl bg-white ring-1 ring-stone-900/10 dark:bg-stone-900 dark:ring-white/10"
      />
      <div className="mt-2 text-center">
        <button className="btn-soft" onClick={drawGuide}>
          Effacer
        </button>
      </div>
    </div>
  )
}
