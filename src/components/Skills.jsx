import { useRef } from 'react'
import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion'
import { SectionLabel, SplitText, FadeUp } from './Reveal'

const wrap = (min, max, v) => { const r = max - min; return ((((v - min) % r) + r) % r) + min }

// Marquee whose speed and direction follow scroll velocity.
function VelocityRow({ items, base }) {
  const x = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(vel, [-1000, 0, 1000], [-5, 0, 5], { clamp: false })
  const dir = useRef(1)
  const pos = useTransform(x, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000)
    const f = factor.get()
    if (f < 0) dir.current = -1
    else if (f > 0) dir.current = 1
    move += dir.current * move * Math.abs(f)
    x.set(x.get() + move)
  })

  return (
    <div className="flex overflow-hidden whitespace-nowrap py-3">
      <motion.div style={{ x: pos }} className="flex shrink-0 gap-6">
        {[...items, ...items].map((s, i) => (
          <motion.span
            key={i}
            whileHover={{ scale: 1.15, rotate: -3, backgroundColor: '#c6ff3d', color: '#07070d' }}
            className="rounded-full border border-white/15 px-8 py-4 font-display text-3xl font-bold md:text-5xl"
          >
            {s}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

const row1 = ['TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'Tailwind', 'Framer Motion', 'Three.js']
const row2 = ['Go', 'Rust', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS', 'Terraform', 'Kafka']

const toys = [
  { t: 'Frontend', c: 'bg-acid text-ink' },
  { t: 'Backend', c: 'bg-violet' },
  { t: 'DevOps', c: 'bg-hot' },
  { t: 'Testing', c: 'bg-cyan text-ink' },
  { t: 'UX', c: 'bg-white text-ink' },
  { t: 'Perf', c: 'bg-acid text-ink' },
  { t: 'Security', c: 'bg-violet' },
  { t: 'AI/ML', c: 'bg-hot' },
  { t: 'Mentoring', c: 'bg-cyan text-ink' },
]

const bars = [
  { l: 'Frontend architecture', v: 95 },
  { l: 'Distributed systems', v: 85 },
  { l: 'Cloud infrastructure', v: 80 },
  { l: 'Product & design sense', v: 90 },
]

export default function Skills() {
  const box = useRef(null)
  return (
    <section id="skills" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel index="02">Toolbox</SectionLabel>
        <h2 className="font-display text-5xl font-extrabold md:text-8xl">
          <SplitText text="Tools I wield" />
        </h2>
        <FadeUp><p className="mt-4 font-mono text-sm text-white/40">// scroll faster — the rows react to your speed</p></FadeUp>
      </div>

      <div className="mt-16 -rotate-2">
        <VelocityRow items={row1} base={-2} />
        <VelocityRow items={row2} base={2} />
      </div>

      <div className="mx-auto mt-32 grid max-w-7xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h3 className="font-display text-3xl font-bold">Proficiency</h3>
          <div className="mt-8 space-y-7">
            {bars.map((b, i) => (
              <div key={b.l}>
                <div className="mb-2 flex justify-between font-mono text-sm"><span>{b.l}</span><span className="text-acid">{b.v}%</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-violet via-cyan to-acid"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-3xl font-bold">Skill playground <span className="font-mono text-sm font-normal text-white/40">— toss them around</span></h3>
          <div ref={box} className="relative mt-8 h-80 overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.15),transparent_70%)]">
            {toys.map((t, i) => (
              <motion.div
                key={t.t}
                drag
                dragConstraints={box}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 12, power: 0.4 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, rotate: 8 }}
                data-cursor="grab"
                style={{ left: `${8 + (i % 3) * 30}%`, top: `${12 + Math.floor(i / 3) * 28}%` }}
                className={`absolute select-none rounded-full px-5 py-3 font-semibold shadow-lg ${t.c}`}
              >
                {t.t}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
