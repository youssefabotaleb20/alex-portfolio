import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Layered depth scene: back image, mid text, foreground image each move at different scroll speeds.
export default function ParallaxBanner() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const back = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['80%', '-80%'])
  const textX1 = useTransform(scrollYProgress, [0, 1], ['10%', '-30%'])
  const textX2 = useTransform(scrollYProgress, [0, 1], ['-30%', '10%'])
  const front = useTransform(scrollYProgress, [0, 1], ['30%', '-30%'])
  const frontRotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const front2 = useTransform(scrollYProgress, [0, 1], ['50%', '-60%'])
  const clip = useTransform(scrollYProgress, [0, 0.35], ['inset(20% 15% 20% 15% round 3rem)', 'inset(0% 0% 0% 0% round 0rem)'])

  return (
    <section ref={ref} className="relative h-[130vh] overflow-hidden">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <motion.img style={{ y: back, scale: 1.3 }} src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000&q=80" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/50" />
      </motion.div>

      <motion.div style={{ y: textY }} className="absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden">
        <motion.div style={{ x: textX1 }} className="whitespace-nowrap font-display text-[14vw] font-extrabold leading-none">CODE IS POETRY</motion.div>
        <motion.div style={{ x: textX2 }} className="whitespace-nowrap font-display text-[14vw] font-extrabold leading-none text-stroke">THAT COMPILES ✦</motion.div>
      </motion.div>

      <motion.div style={{ y: front, rotate: frontRotate }} className="absolute right-[6%] top-[55%] w-[40vw] max-w-md overflow-hidden rounded-3xl border border-white/20 shadow-2xl md:w-[28vw]">
        <motion.img whileHover={{ scale: 1.15 }} transition={{ duration: 0.6 }} src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80" alt="" className="w-full" />
      </motion.div>
      <motion.div style={{ y: front2 }} className="absolute left-[6%] top-[70%] w-[32vw] max-w-xs overflow-hidden rounded-3xl border border-white/20 shadow-2xl md:w-[20vw]">
        <motion.img whileHover={{ scale: 1.15 }} transition={{ duration: 0.6 }} src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&q=80" alt="" className="w-full" />
      </motion.div>
    </section>
  )
}
