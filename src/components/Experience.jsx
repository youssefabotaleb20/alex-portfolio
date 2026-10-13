import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { SectionLabel, SplitText } from './Reveal'

const jobs = [
  { r: 'Staff Engineer', co: 'Stellar Labs', t: '2024 — Now', d: 'Leading a 14-person platform team. Rebuilt the rendering pipeline, cutting p95 load time by 63%.', pts: ['Designed event-sourced billing core', 'Introduced design-system v3 across 6 apps', 'Mentored 9 engineers to senior'] },
  { r: 'Senior Engineer', co: 'Flux Finance', t: '2021 — 2024', d: 'Owned real-time trading UI and its streaming backend serving 2M daily users.', pts: ['Built WebSocket fan-out handling 400k concurrent', 'Shipped mobile-first redesign (+31% retention)', 'On-call lead for core services'] },
  { r: 'Software Engineer', co: 'Pixelforge', t: '2019 — 2021', d: 'Full-stack work on a collaborative design tool used by agencies worldwide.', pts: ['Implemented multiplayer cursors with CRDTs', 'Wrote the plugin API and its docs', 'Reduced bundle size by 48%'] },
  { r: 'Junior Developer', co: 'Startup Garage', t: '2018 — 2019', d: 'Wore every hat: frontend, APIs, CI pipelines, and occasionally the coffee machine.', pts: ['Launched 3 MVPs in 12 months', 'Set up the first CI/CD pipeline', 'Learned to love tests'] },
]

function Job({ j, i }) {
  const [open, setOpen] = useState(false)
  const left = i % 2 === 0
  return (
    <div className={`relative flex md:w-1/2 ${left ? 'md:pr-16' : 'md:ml-auto md:pl-16'} pl-12 md:pl-0`}>
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-40%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className={`absolute top-8 h-5 w-5 rounded-full border-4 border-ink bg-acid shadow-[0_0_20px_#c6ff3d] left-[2px] ${left ? 'md:left-auto md:-right-2.5' : 'md:-left-2.5'}`}
      />
      <motion.div
        initial={{ opacity: 0, x: left ? -80 : 80, rotate: left ? -3 : 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.02 }}
        onClick={() => setOpen(!open)}
        data-cursor={open ? 'less' : 'more'}
        className="w-full rounded-3xl border border-white/10 bg-white/[.03] p-7 backdrop-blur transition-colors hover:border-acid/50"
      >
        <div className="font-mono text-sm text-acid">{j.t}</div>
        <h3 className="mt-2 font-display text-3xl font-bold">{j.r}</h3>
        <div className="text-white/50">@ {j.co}</div>
        <p className="mt-4 text-white/70">{j.d}</p>
        <AnimatePresence>
          {open && (
            <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              {j.pts.map((p, k) => (
                <motion.li key={p} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: k * 0.08 }} className="mt-3 flex gap-3 text-sm">
                  <span className="text-acid">▹</span>{p}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <div className="mt-4 font-mono text-xs text-white/40">{open ? '— click to collapse' : '+ click for highlights'}</div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-32 md:py-48">
      <SectionLabel index="04">Journey</SectionLabel>
      <h2 className="mb-20 font-display text-[9vw] font-extrabold md:text-[10vw] lg:text-8xl"><SplitText text="Experience" /></h2>
      <div ref={ref} className="relative space-y-16">
        <div className="absolute bottom-0 left-[11px] top-0 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        <motion.div style={{ scaleY }} className="absolute bottom-0 left-[11px] top-0 w-0.5 origin-top bg-gradient-to-b from-acid via-cyan to-hot md:left-1/2 md:-translate-x-1/2" />
        {jobs.map((j, i) => <Job key={j.co} j={j} i={i} />)}
      </div>
    </section>
  )
}
