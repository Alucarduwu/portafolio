import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalStateProvider } from "./context/GlobalContext";
import AIBot from "./components/AIBot";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const HomePage = lazy(() => import("./components/HomePage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ExperiencePage = lazy(() => import("./components/ExperiencePage"));
const ProjectsPage = lazy(() => import("./components/ProjectsPage"));
const CertificatesPage = lazy(() => import("./components/CertificatesPage"));
const ContactPage = lazy(() => import("./components/ContactPage"));

const LoadingScreen = () => (
  <div className="fixed inset-0 z-[1000] bg-[var(--bg-main)] flex flex-col items-center justify-center space-y-6">
    <div className="w-12 h-12 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin"></div>
    <div className="system-label text-[10px] animate-pulse tracking-[0.5em]">SYSTEM_INITIALIZING...</div>
  </div>
);

const App = () => {
  const location = useLocation();
  return (
    <GlobalStateProvider>
      <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-500 selection:bg-[var(--primary)]/30 selection:text-[var(--primary)]">
        <ScrollToTop />
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/experience" element={<PageTransition><ExperiencePage /></PageTransition>} />
              <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
              <Route path="/certificates" element={<PageTransition><CertificatesPage /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
        <AIBot />
      </div>
    </GlobalStateProvider>
  );
};

export default App;