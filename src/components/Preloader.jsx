import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9))
      setN(v)
      if (v === 100) { clearInterval(id); setTimeout(onDone, 450) }
    }, 45)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="font-mono text-sm text-white/50">&lt;compiling portfolio /&gt;</div>
      <div className="font-display text-[22vw] leading-none text-acid md:text-[14vw]">{n}%</div>
      <div className="mt-4 h-0.5 w-64 overflow-hidden bg-white/10">
        <motion.div className="h-full bg-acid" animate={{ width: `${n}%` }} />
      </div>
    </motion.div>
  )
}
