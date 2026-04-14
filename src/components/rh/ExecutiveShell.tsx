import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ExecutiveShell = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
    // Luxury Business Variables - Dark Theme
    const root = document.documentElement;
    const body = document.body;
    
    // Backup original styles to restore them later
    const originalVars = {
      '--bg-primary': root.style.getPropertyValue('--bg-primary'),
      '--bg-card': root.style.getPropertyValue('--bg-card'),
      '--bg-ui': root.style.getPropertyValue('--bg-ui'),
      '--primary': root.style.getPropertyValue('--primary'),
      '--primary-glow': root.style.getPropertyValue('--primary-glow'),
      '--text-main': root.style.getPropertyValue('--text-main'),
      '--text-soft': root.style.getPropertyValue('--text-soft'),
      '--text-muted': root.style.getPropertyValue('--text-muted'),
      '--border': root.style.getPropertyValue('--border'),
      '--shadow-base': root.style.getPropertyValue('--shadow-base'),
      '--bg-footer': root.style.getPropertyValue('--bg-footer'),
    };
    const originalFont = body.style.fontFamily;

    // Apply RH Styles (Modern Senior Creative - Zinc & Indigo)
    root.style.setProperty("--bg-primary", "#09090b"); // Zinc 950
    root.style.setProperty("--bg-card", "#18181b");    // Zinc 900
    root.style.setProperty("--bg-ui", "#27272a");      // Zinc 800
    root.style.setProperty("--primary", "#6366f1");    // Indigo 500
    root.style.setProperty("--primary-glow", "rgba(99, 102, 241, 0.25)");
    root.style.setProperty("--text-main", "#fafafa");
    root.style.setProperty("--text-soft", "#e4e4e7");
    root.style.setProperty("--text-muted", "#a1a1aa");
    root.style.setProperty("--border", "rgba(255, 255, 255, 0.08)");
    root.style.setProperty("--shadow-base", "rgba(0, 0, 0, 0.8)");
    root.style.setProperty("--bg-footer", "#09090b"); // Zinc 950 (Dark Footer for RH)
    body.style.fontFamily = "'Inter', sans-serif";
    
    return () => {
      // Restore Original Styles on Unmount
      Object.entries(originalVars).forEach(([key, value]) => {
        if (value) root.style.setProperty(key, value);
        else root.style.removeProperty(key);
      });
      body.style.fontFamily = originalFont;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-white relative overflow-hidden font-inter selection:bg-[var(--primary)]/30 selection:text-white">
      {/* Abstract Creative Luxury Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-rose-500/10 rounded-full blur-[140px]"></div>
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Decorative Minimalist Lines */}
      <div className="fixed top-20 right-10 w-px h-32 bg-gradient-to-b from-[var(--primary)]/30 to-transparent hidden lg:block"></div>
      <div className="fixed bottom-20 left-10 w-px h-32 bg-gradient-to-t from-[var(--primary)]/30 to-transparent hidden lg:block"></div>
    </div>
  );
};

export default ExecutiveShell;
