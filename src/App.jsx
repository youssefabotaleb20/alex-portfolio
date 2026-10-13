import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ParallaxBanner from './components/ParallaxBanner'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)
  const done = useCallback(() => setLoading(false), [])

  return (
    <div className="grain">
      <AnimatePresence>{loading && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <Cursor />
      {!loading && (
        <>
          <Nav />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <ParallaxBanner />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
