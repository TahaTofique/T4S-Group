import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PageTransition } from '@/components/PageTransition'
import Landing from '@/pages/Landing'
import Security from '@/pages/Security'
import Enterprises from '@/pages/Enterprises'
import NotFound from '@/pages/NotFound'

function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-ink font-sans text-white selection:bg-gold/30">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/security" element={<Security />} />
            <Route path="/enterprises" element={<Enterprises />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default App
