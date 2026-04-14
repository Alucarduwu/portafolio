import React, { Suspense, lazy, useEffect, useState, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GlobalStateProvider, GlobalContext } from "./context/GlobalContext";
import AIBot from "./components/AIBot";
import CyberShell from "./components/CyberShell";
import ExecutiveShell from "./components/rh/ExecutiveShell";
import PerspectiveSelector from "./components/PerspectiveSelector";
import HackerBackground from "./components/HackerBackground";

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
    initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
    exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
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

const LoadingScreen = () => {
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "KERNEL_BOOT_V6.4...",
    "MOUNTING_FS_DRIVERS...",
    "INIT_GRAPHICS_ENGINE...",
    "ESTABLISHING_VPN_TUNNEL...",
    "SYNCING_GITHUB_NODES...",
    "ACCESS_GRANTED_BY_ANAHI"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 80);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="fixed inset-0 z-[10000] bg-[var(--bg-main)] flex flex-col items-center justify-center space-y-8 p-10">
      <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[var(--primary)] border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-ping"></div>
          </div>
      </div>
      <div className="space-y-2 text-center fountain-log">
          {logs.slice(0, logIndex + 1).map((log, i) => (
              <div key={i} className={`system-label text-[8px] md:text-[10px] tracking-[0.3em] font-mono ${i === logIndex ? 'animate-pulse text-[var(--primary)]' : 'opacity-40'}`}>
                {`> ${log}`}
              </div>
          ))}
      </div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const { perspective } = useContext(GlobalContext);

  if (!perspective) {
    return <PerspectiveSelector />;
  }

  const Shell = perspective === 'rh' ? ExecutiveShell : CyberShell;

  return (
    <div className="min-h-screen transition-colors duration-500 relative overflow-hidden">
      <Shell>
        {perspective === 'dev' && (
          <>
            <HackerBackground />
            <div className="bg-dots"></div>
            <div className="bg-grid"></div>
            <div className="edge-glow-tl"></div>
            <div className="edge-glow-br"></div>
          </>
        )}
        <ScrollToTop />
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <AnimatePresence mode="popLayout" initial={false}>
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
      </Shell>
    </div>
  );
};

const App = () => {
  return (
    <GlobalStateProvider>
      <AppContent />
    </GlobalStateProvider>
  );
};

export default App;