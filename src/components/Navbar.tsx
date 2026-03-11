import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, Sparkles, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { Language } from "../App";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const content = {
  es: {
    role: "Full Stack Developer",
    home: "Inicio",
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    skills: "Tecnologías",
    contact: "Contacto",
    menu: "Menú",
  },
  en: {
    role: "Full Stack Developer",
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    menu: "Menu",
  },
};

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const t = content[language];
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 20) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(delta) < 6) return;

      if (delta > 0) setIsVisible(false);
      if (delta < 0) setIsVisible(true);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navItems = [
    { to: "/", label: t.home },
    { to: "/about", label: t.about },
    { to: "/experience", label: t.experience },
    { to: "/projects", label: t.projects },
    { to: "/skills", label: t.skills },
    { to: "/contact", label: t.contact },
  ];

  const isActiveRoute = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: isVisible ? 0 : -90,
          opacity: isVisible ? 1 : 0.98,
        }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#09090f]/80 via-[#09090f]/55 to-transparent" />

        <div className="mx-auto max-w-7xl">
          <div className="rpg-window console-shell arcade-corners pixel-console overflow-hidden border border-fuchsia-300/15 bg-[#0b0914]/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl supports-[backdrop-filter]:bg-[#0b0914]/90">
            <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
              {/* LEFT: hamburger */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label={t.menu}
                  className="game-screen console-screen group flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/10 bg-white/[0.03] text-slate-200 transition-all duration-300 hover:scale-[1.03] hover:border-fuchsia-300/25 hover:text-fuchsia-200"
                >
                  <Menu className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </button>

                <Link
                  to="/"
                  className="group hidden min-w-0 items-center gap-3 sm:flex"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/15 to-pink-400/10 text-fuchsia-200 shadow-[0_0_16px_rgba(244,114,182,0.12)] transition-transform duration-300 group-hover:scale-105">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 text-left leading-tight">
                    <p className="truncate bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-sm font-semibold text-transparent sm:text-base">
                      Anahí Lozano
                    </p>
                    <p className="hidden truncate text-[11px] text-slate-400 sm:block">
                      {t.role}
                    </p>
                  </div>
                </Link>
              </div>

              {/* RIGHT: language only */}
              <div className="game-screen console-screen flex items-center gap-2 rounded-[1.3rem] px-2.5 py-2">
                <div className="flex items-center gap-1 px-1.5">
                  <Languages className="h-3.5 w-3.5 text-fuchsia-200/80" />
                </div>

                <div className="relative flex items-center rounded-full bg-white/[0.03] p-1">
                  {(["es", "en"] as Language[]).map((lang) => {
                    const isActive = language === lang;

                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setLanguage(lang)}
                        className="relative min-w-[42px] rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors duration-300 sm:min-w-[46px] sm:px-3"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="language-pill"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-200 via-pink-100 to-white shadow-[0_4px_14px_rgba(255,255,255,0.12)]"
                          />
                        )}

                        <span
                          className={`relative z-10 ${
                            isActive
                              ? "text-[#111827]"
                              : "text-slate-300 hover:text-white"
                          }`}
                        >
                          {lang.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-white/8 px-3 py-2">
              <span className="pacman" />
              <span className="pacdot" />
              <span className="pacdot" />
              <span className="power-pellet" />
              <span className="arcade-ghost arcade-ghost--violet" />
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-[#05060c]/70 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: -360, opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -360, opacity: 0.9 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="fixed left-0 top-0 z-[70] flex h-screen w-[88vw] max-w-[360px] flex-col border-r border-fuchsia-300/15 bg-[#0b0914]/96 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/15 to-pink-400/10 text-fuchsia-200 shadow-[0_0_16px_rgba(244,114,182,0.12)]">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-base font-semibold text-transparent">
                      Anahí Lozano
                    </p>
                    <p className="truncate text-[11px] text-slate-400">
                      {t.role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-200 hover:border-fuchsia-300/20 hover:text-fuchsia-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="mb-5 flex items-center gap-2 rounded-2xl border border-fuchsia-300/10 bg-white/[0.025] px-3 py-3 text-xs text-slate-400">
                  <span className="pacman" />
                  <span className="pacdot" />
                  <span className="pacdot" />
                  <span className="power-pellet" />
                </div>

                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => {
                    const active = isActiveRoute(item.to);

                    return (
                      <motion.div
                        key={item.to}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ delay: 0.04 * index }}
                      >
                        <Link
                          to={item.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-250 ${
                            active
                              ? "border-fuchsia-300/20 bg-white/[0.06] text-fuchsia-200"
                              : "border-transparent text-slate-300 hover:border-fuchsia-300/15 hover:bg-white/[0.04] hover:text-fuchsia-200"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`text-xs transition-colors duration-200 ${
                              active
                                ? "text-fuchsia-300"
                                : "text-slate-500 group-hover:text-fuchsia-300"
                            }`}
                          >
                            0{index + 1}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="border-t border-white/8 px-5 py-4">
                <div className="rounded-2xl border border-fuchsia-300/10 bg-gradient-to-r from-fuchsia-500/8 via-violet-500/8 to-pink-400/8 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200/70">
                    Portfolio
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Web • Mobile • UI • Full Stack
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="h-[96px]" />
    </>
  );
}