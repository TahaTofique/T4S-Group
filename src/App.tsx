import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollToTop } from '@/components/ScrollToTop'
import { PageTransition } from '@/components/PageTransition'
import { AuroraBackground } from '@/components/AuroraBackground'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Preloader } from '@/components/Preloader'
import { useLenis } from '@/hooks/useLenis'
import Landing from '@/pages/Landing'

// Route-level code splitting — the homepage (above) loads eagerly since
// it's the most common entry point, but Security/Enterprises/NotFound only
// download when someone actually navigates there. Keeps the initial bundle
// smaller and time-to-interactive lower on first load.
const Security = lazy(() => import('@/pages/Security'))
const Enterprises = lazy(() => import('@/pages/Enterprises'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function App() {
  const location = useLocation()
  useLenis()

  return (
    <div className="min-h-screen bg-ink font-sans text-white selection:bg-gold/30">
      <Preloader />
      <ScrollProgress />
      <AuroraBackground />

      {/* Everything below renders above the fixed aurora background (z-0) */}
      <div className="relative z-10">
        <ScrollToTop />
        <Navbar />
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Suspense fallback={null}>
              <Routes location={location}>
                <Route path="/" element={<Landing />} />
                <Route path="/security" element={<Security />} />
                <Route path="/enterprises" element={<Enterprises />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  )
}

export default App
