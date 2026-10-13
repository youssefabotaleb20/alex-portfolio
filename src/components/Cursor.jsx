import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Two-part cursor: a precise dot plus a lagging ring that grows over interactive elements.
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 250, damping: 22, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 250, damping: 22, mass: 0.6 })
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.('a, button, input, textarea, [data-cursor]')
      setHover(!!el)
      setLabel(el?.dataset?.cursor || '')
    }
    const d = () => setDown(true)
    const u = () => setDown(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', d)
    window.addEventListener('mouseup', u)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', d)
      window.removeEventListener('mouseup', u)
    }
  }, [x, y])

  const size = label ? 88 : hover ? 56 : 32

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <motion.div
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: size, height: size, scale: down ? 0.8 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border ${
          label ? 'border-transparent bg-acid text-ink' : 'border-acid/70 mix-blend-difference'
        }`}
      >
        {label && <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">{label}</span>}
      </motion.div>
      <motion.div
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-acid"
      />
    </div>
  )
}
