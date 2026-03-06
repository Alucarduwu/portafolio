import { motion } from "framer-motion";
import { Globe, Sparkles } from "lucide-react";
import type { Language } from "../App";

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const content = {
  es: {
    role: "Desarrolladora Full Stack",
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Tecnologías",
    contact: "Contacto",
  },
  en: {
    role: "Full Stack Software Developer",
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
  },
};

export default function Navbar({ language, setLanguage }: NavbarProps) {
  const t = content[language];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090f]/65 backdrop-blur-2xl supports-[backdrop-filter]:bg-[#09090f]/55">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/15 via-violet-500/15 to-pink-400/10 text-fuchsia-200 shadow-[0_0_22px_rgba(244,114,182,0.14)] transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <p className="bg-gradient-to-r from-white via-fuchsia-100 to-violet-200 bg-clip-text text-base font-semibold tracking-[0.02em] text-transparent md:text-lg">
              Anahí Lozano
            </p>
            <p className="text-xs text-slate-400 md:text-[13px]">{t.role}</p>
          </div>
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 text-sm text-slate-300 shadow-[0_8px_30px_rgba(0,0,0,0.16)] backdrop-blur-xl md:flex">
            <a
              href="#about"
              className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.06] hover:text-fuchsia-200"
            >
              {t.about}
            </a>
            <a
              href="#projects"
              className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.06] hover:text-fuchsia-200"
            >
              {t.projects}
            </a>
            <a
              href="#skills"
              className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.06] hover:text-fuchsia-200"
            >
              {t.skills}
            </a>
            <a
              href="#contact"
              className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white/[0.06] hover:text-fuchsia-200"
            >
              {t.contact}
            </a>
          </nav>

          <div className="flex items-center gap-2 rounded-full border border-fuchsia-200/15 bg-white/[0.05] px-2 py-1.5 shadow-[0_0_24px_rgba(244,114,182,0.10)] backdrop-blur-xl">
            <Globe className="ml-1 h-4 w-4 text-fuchsia-200/80" />

            <div className="relative flex items-center rounded-full bg-white/[0.03] p-1">
              {(["es", "en"] as Language[]).map((lang) => {
                const isActive = language === lang;

                return (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className="relative min-w-[56px] rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="language-pill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-200 via-pink-100 to-white shadow-[0_4px_18px_rgba(255,255,255,0.16)]"
                      />
                    )}

                    <span
                      className={`relative z-10 ${
                        isActive ? "text-[#111827]" : "text-slate-300 hover:text-white"
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
      </div>
    </header>
  );
}