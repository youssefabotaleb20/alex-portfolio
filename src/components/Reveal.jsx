import { Fragment, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Splits text into letters that rise in on view and bounce on hover.
// The in-view check sits on the wrapper: each letter starts clipped by its overflow-hidden
// mask, so observing letters individually left narrow ones (L, I) stuck out of view.
export function SplitText({ text, className = '', delay = 0, hover = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={text}>
      {text.split(' ').map((word, w, words) => {
        // Letters stay grouped per word so a line can only wrap between words.
        const start = words.slice(0, w).join(' ').length + (w ? 1 : 0)
        return (
          <Fragment key={w}>
            {w > 0 && ' '}
            <span className="inline-block whitespace-nowrap" aria-hidden>
              {word.split('').map((ch, i) => (
                <span key={i} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%', rotate: 12 }}
                    animate={inView ? { y: 0, rotate: 0 } : undefined}
                    transition={{ duration: 0.8, delay: delay + (start + i) * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={hover ? { y: -14, color: '#c6ff3d', transition: { type: 'spring', stiffness: 500, damping: 10 } } : undefined}
                  >
                    {ch}
                  </motion.span>
                </span>
              ))}
            </span>
          </Fragment>
        )
      })}
    </span>
  )
}

export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ index, children }) {
  return (
    <FadeUp className="mb-6 flex items-center gap-4 font-mono text-sm text-acid">
      <span>{index}</span>
      <motion.span
        className="h-px bg-acid"
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <span className="uppercase tracking-[0.3em] text-white/60">{children}</span>
    </FadeUp>
  )
}
