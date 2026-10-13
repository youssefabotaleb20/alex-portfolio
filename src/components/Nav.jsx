import { useEffect, useState } from 'react'
import { motion, useScroll, useMotionValueEvent, useSpring } from 'framer-motion'
import Magnetic from './Magnetic'

const links = ['about', 'skills', 'work', 'experience', 'contact']

export default function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 200 && !open)
  })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((id) => { const el = document.getElementById(id); el && obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-acid via-cyan to-hot" />
      <motion.nav
        animate={{ y: hidden && !open ? -110 : 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed left-0 right-0 top-4 z-50 mx-auto flex w-[min(1100px,calc(100%-2rem))] items-center justify-between rounded-full border border-white/10 bg-ink/60 px-5 py-3 backdrop-blur-xl"
      >
        <Magnetic>
          <a href="#top" className="font-display text-xl font-extrabold tracking-tight">
            AR<span className="text-acid">.</span>
          </a>
        </Magnetic>
        <ul className="hidden gap-1 md:flex">
          {links.map((l) => (
            <li key={l} className="relative">
              <Magnetic strength={0.25}>
                <a href={`#${l}`} className={`relative z-10 block rounded-full px-4 py-2 text-sm capitalize transition-colors ${active === l ? 'text-ink' : 'text-white/70 hover:text-white'}`}>
                  {active === l && (
                    <motion.span layoutId="pill" className="absolute inset-0 -z-10 rounded-full bg-acid" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  {l}
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
        <button onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 p-2 md:hidden" aria-label="Menu">
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0 }} className="block h-0.5 w-6 bg-white" />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-0.5 w-6 bg-white" />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0 }} className="block h-0.5 w-6 bg-white" />
        </button>
      </motion.nav>
      <motion.div
        initial={false}
        animate={{ clipPath: open ? 'circle(150% at 90% 5%)' : 'circle(0% at 90% 5%)' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-acid md:hidden"
      >
        {links.map((l, i) => (
          <motion.a
            key={l}
            href={`#${l}`}
            onClick={() => setOpen(false)}
            animate={{ y: open ? 0 : 40, opacity: open ? 1 : 0 }}
            transition={{ delay: open ? 0.2 + i * 0.06 : 0 }}
            className="font-display text-[10vw] font-extrabold capitalize text-ink sm:text-5xl"
          >
            {l}
          </motion.a>
        ))}
      </motion.div>
    </>
  )
}
