import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'
import { SectionLabel, SplitText, FadeUp } from './Reveal'

function Field({ label, as = 'input', ...props }) {
  const [focus, setFocus] = useState(false)
  const [val, setVal] = useState('')
  const Tag = as
  const up = focus || val
  return (
    <label className="relative block">
      <motion.span
        animate={{ y: up ? -26 : 0, scale: up ? 0.8 : 1, color: focus ? '#c6ff3d' : 'rgba(255,255,255,.5)' }}
        className="pointer-events-none absolute left-0 top-4 origin-left font-mono"
      >
        {label}
      </motion.span>
      <Tag
        {...props}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className="w-full resize-none border-b border-white/20 bg-transparent pb-3 pt-4 text-lg outline-none"
      />
      <motion.span animate={{ scaleX: focus ? 1 : 0 }} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-acid" />
    </label>
  )
}

const burst = Array.from({ length: 18 }, (_, i) => i)
const socials = [
  { l: 'GitHub', href: 'https://github.com' },
  { l: 'LinkedIn', href: 'https://www.linkedin.com' },
  { l: 'X / Twitter', href: 'https://x.com' },
  { l: 'Dribbble', href: 'https://dribbble.com' },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  // Fields are controlled, so form.reset() can't clear them; remounting them does.
  const [round, setRound] = useState(0)
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setRound((r) => r + 1)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 md:py-48">
      <motion.div
        className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-violet/30 blur-[120px]"
        animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -left-40 bottom-20 h-[400px] w-[400px] rounded-full bg-acid/20 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-20 md:grid-cols-2">
        <div>
          <SectionLabel index="05">Contact</SectionLabel>
          <h2 className="font-display text-[10vw] font-extrabold leading-[0.9] md:text-[4.6vw] xl:text-6xl">
            <SplitText text="Let's build" /><br /><SplitText text="something" delay={0.2} /><br />
            <SplitText text="wild." delay={0.4} className="gradient-text" />
          </h2>
          <FadeUp delay={0.3}>
            <Magnetic strength={0.2}>
              <a href="mailto:hello@alexrivera.dev" className="mt-10 block font-mono text-xl text-white/80 underline decoration-acid decoration-2 underline-offset-8 hover:text-acid md:text-2xl">
                hello@alexrivera.dev
              </a>
            </Magnetic>
          </FadeUp>
          <div className="mt-10 flex flex-wrap gap-3">
            {socials.map((s, i) => (
              <FadeUp key={s.l} delay={0.4 + i * 0.08}>
                <Magnetic>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="block rounded-full border border-white/15 px-5 py-2.5 text-sm transition-colors hover:bg-white hover:text-ink">{s.l} ↗</a>
                </Magnetic>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp delay={0.2}>
          <form onSubmit={submit} className="space-y-10 rounded-3xl border border-white/10 bg-white/[.03] p-8 backdrop-blur-xl md:p-12">
            <Field key={`name-${round}`} label="Your name" name="name" required />
            <Field key={`email-${round}`} label="Email" name="email" type="email" required />
            <Field key={`msg-${round}`} label="Tell me about your project" name="msg" as="textarea" rows={4} required />
            <div className="relative">
              <Magnetic>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  data-cursor="send"
                  className="relative flex h-32 w-32 items-center justify-center rounded-full bg-acid font-display text-lg font-bold text-ink"
                >
                  <AnimatePresence mode="wait">
                    <motion.span key={sent ? 'y' : 'n'} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}>
                      {sent ? 'Sent ✓' : 'Send →'}
                    </motion.span>
                  </AnimatePresence>
                  <AnimatePresence>
                    {sent && burst.map((i) => {
                      const a = (i / burst.length) * Math.PI * 2
                      return (
                        <motion.span
                          key={i}
                          className="absolute h-2.5 w-2.5 rounded-full"
                          style={{ background: ['#c6ff3d', '#22d3ee', '#ff4d8d', '#8b5cf6'][i % 4] }}
                          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          animate={{ x: Math.cos(a) * 140, y: Math.sin(a) * 140, opacity: 0, scale: 0.3 }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                        />
                      )
                    })}
                  </AnimatePresence>
                </motion.button>
              </Magnetic>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  )
}
