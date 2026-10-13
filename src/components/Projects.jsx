import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import TiltCard from './TiltCard'

const projects = [
  { t: 'Nebula Pay', y: '2026', d: 'Real-time payments dashboard processing $2B/yr with sub-50ms updates over WebSockets.', tags: ['React', 'Go', 'Kafka'], img: '1551288049-bebda4e38f71', c: '#c6ff3d' },
  { t: 'Codeflow', y: '2025', d: 'Collaborative code editor with CRDT sync, live cursors and AI pair-programming.', tags: ['TypeScript', 'Rust', 'WASM'], img: '1555066931-4365d14bab8c', c: '#22d3ee' },
  { t: 'Orbit Analytics', y: '2025', d: 'Privacy-first product analytics that ingests 4B events a day on a lean Kubernetes stack.', tags: ['ClickHouse', 'K8s', 'Next.js'], img: '1460925895917-afdab827c52f', c: '#8b5cf6' },
  { t: 'Sentinel', y: '2024', d: 'Zero-trust edge security gateway with anomaly detection and a gorgeous audit UI.', tags: ['Go', 'eBPF', 'React'], img: '1550751827-4bd374c3f58b', c: '#ff4d8d' },
  { t: 'Circuit Lab', y: '2023', d: 'Browser-based hardware simulator teaching 200k students the basics of electronics.', tags: ['Three.js', 'WebGL', 'Node'], img: '1518770660439-4636190af475', c: '#c6ff3d' },
]

function Card({ p, i, onOpen }) {
  return (
    <TiltCard className="h-[60vh] w-[80vw] shrink-0 rounded-3xl md:w-[42vw]" max={8}>
      <motion.button
        onClick={() => onOpen(p)}
        layoutId={`card-${p.t}`}
        data-cursor="open"
        className="group relative block h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] text-left"
      >
        <motion.img
          layoutId={`img-${p.t}`}
          src={`https://images.unsplash.com/photo-${p.img}?w=1400&q=80`}
          alt={p.t}
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute left-6 top-6 font-mono text-sm text-white/60">0{i + 1} / {p.y}</div>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <div className="mb-3 flex flex-wrap gap-2">
            {p.tags.map((t) => <span key={t} className="rounded-full border border-white/20 bg-ink/50 px-3 py-1 font-mono text-xs backdrop-blur">{t}</span>)}
          </div>
          <h3 className="font-display text-4xl font-extrabold transition-colors duration-300 md:text-6xl" style={{ color: p.c }}>{p.t}</h3>
          <p className="mt-3 max-h-0 max-w-md overflow-hidden text-white/70 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">{p.d}</p>
        </div>
        <div className="absolute right-6 top-6 flex h-12 w-12 -rotate-45 items-center justify-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-0">→</div>
      </motion.button>
    </TiltCard>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25 })
  // Slide by the track's real overflow so the last card and the CTA always come into view.
  const track = useRef(null)
  const dist = useMotionValue(0)
  useEffect(() => {
    const measure = () => dist.set(Math.max(0, track.current.offsetWidth - window.innerWidth))
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [dist])
  const x = useTransform([smooth, dist], ([v, d]) => -v * d)
  const bar = useTransform(smooth, [0, 1], ['0%', '100%'])
  const [open, setOpen] = useState(null)

  return (
    <section id="work" ref={ref} className="relative h-[450vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between px-6">
          <div>
            <div className="mb-4 font-mono text-sm text-acid">03 — <span className="uppercase tracking-[0.3em] text-white/60">Selected work</span></div>
            <h2 className="font-display text-5xl font-extrabold md:text-8xl">Things I've <span className="gradient-text">built</span></h2>
          </div>
          <div className="hidden w-48 md:block">
            <div className="mb-2 font-mono text-xs text-white/40">keep scrolling →</div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10"><motion.div style={{ width: bar }} className="h-full bg-acid" /></div>
          </div>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 pl-6 pr-6 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {projects.map((p, i) => <Card key={p.t} p={p} i={i} onOpen={setOpen} />)}
          <div className="flex h-[60vh] w-[60vw] shrink-0 items-center justify-center md:w-[30vw]">
            <a href="#contact" className="font-display text-4xl font-extrabold text-stroke transition-colors hover:text-acid lg:text-6xl" data-cursor="let's go">Your project next?</a>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={() => setOpen(null)} data-cursor="close" />
            <motion.div layoutId={`card-${open.t}`} className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#11111b]">
              <motion.img layoutId={`img-${open.t}`} src={`https://images.unsplash.com/photo-${open.img}?w=1400&q=80`} alt={open.t} className="h-72 w-full object-cover" />
              <motion.div className="p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <div className="font-mono text-sm text-white/50">{open.y}</div>
                <h3 className="font-display text-5xl font-extrabold" style={{ color: open.c }}>{open.t}</h3>
                <p className="mt-4 text-lg text-white/70">{open.d}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {open.tags.map((t) => <span key={t} className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs">{t}</span>)}
                </div>
                <button onClick={() => setOpen(null)} className="mt-8 rounded-full bg-acid px-6 py-3 font-semibold text-ink">Close</button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
