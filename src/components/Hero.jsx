import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import ParticleField from './ParticleField'
import Magnetic from './Magnetic'
import { SplitText } from './Reveal'

const roles = ['Full-Stack Engineer', 'Systems Thinker', 'React Specialist', 'Cloud Architect', 'Open-Source Nerd']

const chips = [
  { text: 'const ship = () => 🚀', x: '8%', y: '22%', depth: 40, rot: -8 },
  { text: 'git push --force-with-lease', x: '70%', y: '16%', depth: 70, rot: 6 },
  { text: '<Suspense fallback />', x: '78%', y: '70%', depth: 30, rot: -4 },
  { text: 'O(log n)', x: '12%', y: '74%', depth: 85, rot: 10 },
  { text: 'kubectl apply -f .', x: '52%', y: '84%', depth: 55, rot: -3 },
]

function useTyping(words) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    const t = setTimeout(() => {
      if (!del && txt === w) return setDel(true)
      if (del && txt === '') { setDel(false); setI(i + 1); return }
      setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1))
    }, !del && txt === w ? 1600 : del ? 40 : 85)
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return txt
}

function Chip({ c, mx, my }) {
  const x = useTransform(mx, (v) => v * c.depth)
  const y = useTransform(my, (v) => v * c.depth)
  return (
    <motion.div
      style={{ left: c.x, top: c.y, x, y, rotate: c.rot }}
      className="absolute hidden md:block"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + Math.random() * 0.6, type: 'spring' }}
    >
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4 + c.depth / 30, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.6}
          whileHover={{ scale: 1.12, rotate: 0 }}
          whileDrag={{ scale: 1.2, boxShadow: '0 0 40px rgba(198,255,61,.5)' }}
          data-cursor="drag"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs text-acid shadow-2xl backdrop-blur-md"
        >
          {c.text}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.35])
  const titleY = useTransform(scrollYProgress, [0, 1], ['0%', '120%'])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const strokeX = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])

  const mxRaw = useMotionValue(0)
  const myRaw = useMotionValue(0)
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20 })
  const my = useSpring(myRaw, { stiffness: 60, damping: 20 })
  const bgMx = useTransform(mx, (v) => v * -25)
  const bgMy = useTransform(my, (v) => v * -25)

  const onMove = (e) => {
    mxRaw.set(e.clientX / window.innerWidth - 0.5)
    myRaw.set(e.clientY / window.innerHeight - 0.5)
  }

  const typed = useTyping(roles)

  return (
    <section id="top" ref={ref} onMouseMove={onMove} className="relative h-[110vh] overflow-hidden">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute -inset-10">
        <motion.img style={{ x: bgMx, y: bgMy }} src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2000&q=80" alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/60 to-ink" />
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: 'conic-gradient(from 0deg, #8b5cf6, #22d3ee, #c6ff3d, #ff4d8d, #8b5cf6)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <ParticleField />

      {chips.map((c) => <Chip key={c.text} c={c} mx={mx} my={my} />)}

      <motion.div style={{ x: strokeX }} className="pointer-events-none absolute bottom-[12%] left-0 whitespace-nowrap font-display text-[18vw] font-extrabold leading-none text-stroke opacity-30">
        BUILD · BREAK · REBUILD · BUILD · BREAK
      </motion.div>

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 flex h-screen flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-acid/30 bg-acid/10 px-4 py-1.5 font-mono text-xs text-acid"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          Available for new projects
        </motion.div>

        <h1 className="font-display text-[15vw] font-extrabold leading-[0.85] tracking-tighter md:text-[11vw]">
          <SplitText text="ALEX" delay={0.2} />
          <br />
          <SplitText text="RIVERA" delay={0.4} className="gradient-text" />
        </h1>

        <div className="mt-8 h-8 font-mono text-lg text-white/80 md:text-2xl">
          <span className="text-white/40">&gt; </span>{typed}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="ml-0.5 inline-block h-6 w-3 translate-y-1 bg-acid" />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <a href="#work" data-cursor="view" className="group relative block overflow-hidden rounded-full bg-acid px-8 py-4 font-semibold text-ink">
              <span className="relative z-10">See my work</span>
              <span className="absolute inset-0 translate-y-full rounded-full bg-white transition-transform duration-500 group-hover:translate-y-0" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="block rounded-full border border-white/20 px-8 py-4 font-semibold transition-colors hover:border-acid hover:text-acid">
              Let's talk →
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        scroll
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <motion.span className="h-2 w-1 rounded-full bg-acid" animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </span>
      </motion.a>
    </section>
  )
}
