import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 px-6 pb-8 pt-20">
      <motion.div
        initial={{ y: '60%' }}
        whileInView={{ y: '0%' }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="select-none text-center font-display text-[19vw] font-extrabold leading-none tracking-tighter"
      >
        {'RIVERA'.split('').map((c, i) => (
          <motion.span key={i} className="inline-block text-stroke" whileHover={{ y: -30, color: '#c6ff3d', WebkitTextStroke: '0px', transition: { type: 'spring', stiffness: 400 } }}>
            {c}
          </motion.span>
        ))}
      </motion.div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 font-mono text-xs text-white/40 md:flex-row">
        <span>© 2026 Alex Rivera — demo portfolio</span>
        <span>Built with React, Tailwind & Framer Motion · Photos: Unsplash</span>
        <a href="#top" className="hover:text-acid">Back to top ↑</a>
      </div>
    </footer>
  )
}
