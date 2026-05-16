import React, { useEffect } from "react";
import { motion } from "framer-motion";

const ExecutiveShell = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    const originalVars = {
      '--bg-primary': root.style.getPropertyValue('--bg-primary'),
      '--bg-card': root.style.getPropertyValue('--bg-card'),
      '--bg-ui': root.style.getPropertyValue('--bg-ui'),
      '--primary': root.style.getPropertyValue('--primary'),
      '--primary-glow': root.style.getPropertyValue('--primary-glow'),
      '--primary-rgb': root.style.getPropertyValue('--primary-rgb'),
      '--text-main': root.style.getPropertyValue('--text-main'),
      '--text-soft': root.style.getPropertyValue('--text-soft'),
      '--text-muted': root.style.getPropertyValue('--text-muted'),
      '--border': root.style.getPropertyValue('--border'),
      '--shadow-base': root.style.getPropertyValue('--shadow-base'),
      '--bg-footer': root.style.getPropertyValue('--bg-footer'),
      '--rh-gold': root.style.getPropertyValue('--rh-gold'),
      '--rh-gold-soft': root.style.getPropertyValue('--rh-gold-soft'),
      '--rh-gold-dim': root.style.getPropertyValue('--rh-gold-dim'),
    };
    const originalFont = body.style.fontFamily;

    // ─── Paleta Obsidian + Warm Gold ───────────────────────────────
    root.style.setProperty("--bg-primary",   "#08090a");
    root.style.setProperty("--bg-card",      "#111214");
    root.style.setProperty("--bg-ui",        "#1a1b1e");
    root.style.setProperty("--primary",      "#C9A84C");   // Warm Gold
    root.style.setProperty("--primary-glow", "rgba(201, 168, 76, 0.2)");
    root.style.setProperty("--primary-rgb",  "201, 168, 76");
    root.style.setProperty("--text-main",    "#F8F5F0");   // Warm white
    root.style.setProperty("--text-soft",    "#C8C4BB");
    root.style.setProperty("--text-muted",   "#7A7872");
    root.style.setProperty("--border",       "rgba(201, 168, 76, 0.10)");
    root.style.setProperty("--shadow-base",  "rgba(0, 0, 0, 0.85)");
    root.style.setProperty("--bg-footer",    "#08090a");
    // Tokens RH-específicos para CSS inline
    root.style.setProperty("--rh-gold",      "#C9A84C");
    root.style.setProperty("--rh-gold-soft", "#E8C97A");
    root.style.setProperty("--rh-gold-dim",  "rgba(201, 168, 76, 0.12)");

    body.style.fontFamily = "'Inter', sans-serif";

    return () => {
      Object.entries(originalVars).forEach(([key, value]) => {
        if (value) root.style.setProperty(key, value);
        else root.style.removeProperty(key);
      });
      body.style.fontFamily = originalFont;
    };
  }, []);

  return (
    <div className="min-h-screen text-[#F8F5F0] relative overflow-hidden" style={{ background: "#08090a" }}>

      {/* ── Ambient background ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Warm gold radial top-right */}
        <div
          className="absolute"
          style={{
            top: "-15%", right: "-10%",
            width: "55%", height: "55%",
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.07) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Amber glow bottom-left */}
        <div
          className="absolute"
          style={{
            bottom: "-10%", left: "-8%",
            width: "45%", height: "45%",
            background: "radial-gradient(ellipse at center, rgba(180,130,50,0.05) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Subtle center warmth */}
        <div
          className="absolute top-[40%] left-1/2 -translate-x-1/2"
          style={{
            width: "60%", height: "30%",
            background: "radial-gradient(ellipse at center, rgba(201,168,76,0.03) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Fine grain texture */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />
        {/* Thin horizontal rule at very top */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.4) 70%, transparent)" }}
        />
      </div>

      {/* ── Decorative corner accents ──────────────────────────────── */}
      <div className="fixed top-0 left-0 pointer-events-none z-0 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M 10 110 L 10 10 L 110 10" stroke="rgba(201,168,76,0.15)" strokeWidth="1" fill="none"/>
          <circle cx="10" cy="10" r="3" fill="rgba(201,168,76,0.3)"/>
        </svg>
      </div>
      <div className="fixed bottom-0 right-0 pointer-events-none z-0 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M 110 10 L 110 110 L 10 110" stroke="rgba(201,168,76,0.15)" strokeWidth="1" fill="none"/>
          <circle cx="110" cy="110" r="3" fill="rgba(201,168,76,0.3)"/>
        </svg>
      </div>

      {/* ── Page content ───────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col min-h-screen"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ExecutiveShell;
