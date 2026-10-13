import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'

// 3D tilt toward the pointer with a moving spotlight glare.
export default function TiltCard({ children, className = '', max = 12, glare = true, ...rest }) {
  const ref = useRef(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 150, damping: 15 })
  const sy = useSpring(py, { stiffness: 150, damping: 15 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const bg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(198,255,61,.22), transparent 55%)`

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { px.set(0.5); py.set(0.5) }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-full w-full"
        {...rest}
      >
        {children}
        {glare && <motion.div style={{ background: bg }} className="pointer-events-none absolute inset-0 rounded-[inherit]" />}
      </motion.div>
    </div>
  )
}
