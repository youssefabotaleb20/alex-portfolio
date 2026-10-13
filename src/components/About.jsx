import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import TiltCard from './TiltCard'
import { SectionLabel, FadeUp } from './Reveal'

const bio = "I craft fast, resilient software that people actually enjoy using. Eight years of shipping products across fintech, developer tooling and real-time collaboration — from pixel-perfect interfaces down to distributed systems humming at scale."

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [8, 0])
  return <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">{children}</motion.span>
}

function Counter({ to, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 2.2, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return <span ref={ref}>{v}{suffix}</span>
}

const stats = [
  { n: 8, s: '+', l: 'Years shipping' },
  { n: 64, s: '', l: 'Projects launched' },
  { n: 12, s: 'M', l: 'Users served' },
  { n: 99, s: '%', l: 'Coffee-driven' },
]

export default function About() {
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.4'] })
  const { scrollYProgress: imgP } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(imgP, [0, 1], ['-15%', '15%'])
  const frameRotate = useTransform(imgP, [0, 1], [-6, 6])
  const words = bio.split(' ')

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32 md:py-48">
      <SectionLabel index="01">About me</SectionLabel>
      <div className="grid items-center gap-16 md:grid-cols-[1fr_1.3fr]">
        <div ref={imgRef} className="relative mx-auto w-full max-w-sm">
          <motion.div style={{ rotate: frameRotate }} className="absolute -inset-4 rounded-[2rem] border-2 border-dashed border-acid/40" />
          <TiltCard className="aspect-[4/5] rounded-[2rem]" data-cursor="hi!">
            <div className="h-full w-full overflow-hidden rounded-[2rem]">
              <motion.img style={{ y: imgY, scale: 1.3 }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80" alt="Portrait" className="h-full w-full object-cover grayscale transition-[filter] duration-700 hover:grayscale-0" />
            </div>
            <div style={{ transform: 'translateZ(60px)' }} className="absolute -bottom-6 -right-6 rounded-2xl bg-acid px-5 py-3 font-mono text-sm font-semibold text-ink shadow-xl">
              📍 Based in Lisbon
            </div>
            <div style={{ transform: 'translateZ(40px)' }} className="absolute -left-6 top-8 rounded-2xl border border-white/10 bg-ink/80 px-4 py-2 font-mono text-xs backdrop-blur">
              <span className="text-cyan">status</span>: <span className="text-acid">"building"</span>
            </div>
          </TiltCard>
        </div>

        <div>
          <p ref={textRef} className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {words.map((w, i) => {
              const start = i / words.length
              return <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>{w}</Word>
            })}
          </p>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <FadeUp key={s.l} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, borderColor: 'rgba(198,255,61,.6)' }}
                  className="rounded-2xl border border-white/10 bg-white/[.03] p-5"
                >
                  <div className="font-display text-4xl font-extrabold text-acid"><Counter to={s.n} suffix={s.s} /></div>
                  <div className="mt-1 text-sm text-white/50">{s.l}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
