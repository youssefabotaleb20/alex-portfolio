import { useEffect, useRef } from 'react'

// Canvas constellation: points drift, link to neighbours, and scatter away from the pointer.
export default function ParticleField() {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    const ctx = c.getContext('2d')
    let w, h, raf
    const mouse = { x: -9999, y: -9999 }
    const dpr = Math.min(window.devicePixelRatio, 2)
    let pts = []

    const resize = () => {
      w = c.clientWidth; h = c.clientHeight
      c.width = w * dpr; c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.floor((w * h) / 14000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      }))
    }
    const onMove = (e) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = mouse.y = -9999 }

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const d = Math.hypot(dx, dy)
        if (d < 140) { p.vx += (dx / d) * 0.6; p.vy += (dy / d) * 0.6 }
        p.vx *= 0.96; p.vy *= 0.96
        p.vx += (Math.random() - 0.5) * 0.03; p.vy += (Math.random() - 0.5) * 0.03
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x)); p.y = Math.max(0, Math.min(h, p.y))
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(198,255,61,${(1 - d / 120) * 0.35})`
            ctx.lineWidth = 0.6
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const md = Math.hypot(pts[i].x - mouse.x, pts[i].y - mouse.y)
        if (md < 200) {
          ctx.strokeStyle = `rgba(34,211,238,${(1 - md / 200) * 0.6})`
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        ctx.fillStyle = 'rgba(232,232,240,.8)'
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 1.4, 0, Math.PI * 2); ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize(); tick()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])
  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}
