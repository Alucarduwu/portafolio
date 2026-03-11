import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Github,
  Code2,
  Layers3,
  Smartphone,
  Heart,
  Shield,
  Star,
  Gamepad2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Language } from "../App";

interface HeroProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.22,
      ease: "easeOut",
    },
  },
};

const content = {
  es: {
    badge: "Player Profile • Full Stack Developer",
    intro: "Hola, soy Anahí Betzabé Lozano de Lira",
    title1: "Diseño y desarrollo",
    title2: "productos digitales",
    title3: "modernos, funcionales y visualmente sólidos.",
    description:
      "Soy desarrolladora Full Stack enfocada en crear experiencias web y móviles con una base técnica fuerte y una estética cuidada. Trabajo con Angular, Node.js, React, MySQL, APIs REST y Kotlin para construir soluciones que combinen interfaz, lógica, estructura y escalabilidad.",
    subdescription:
      "Me interesa desarrollar productos que no solo funcionen bien, sino que también transmitan calidad, claridad y atención al detalle.",
    primary: "Ver proyectos",
    secondary: "Contáctame",
    tertiary: "GitHub",
    player: "Jugador",
    creativeMode: "Modo creativo",
    skill: "Skill",
    stats: {
      role: "Full Stack Developer",
      level: "Lv. 26",
      className: "Web • Mobile • Backend",
      affinity: "UI / UX + Engineering",
      status: "Disponible para nuevos retos",
    },
    cards: [
      {
        title: "Stack principal",
        value: "Angular • Node.js • React • MySQL",
        icon: Code2,
      },
      {
        title: "Especialidad",
        value: "Full Stack Web • APIs REST • Arquitectura",
        icon: Layers3,
      },
      {
        title: "Mobile",
        value:
          "Aplicaciones móviles con Kotlin, JavaScript y React Native",
        icon: Smartphone,
      },
    ],
  },
  en: {
    badge: "Player Profile • Full Stack Developer",
    intro: "Hi, I’m Anahí Betzabé Lozano de Lira",
    title1: "I design and build",
    title2: "digital products",
    title3: "that are modern, functional and visually solid.",
    description:
      "I am a Full Stack Developer focused on creating web and mobile experiences with strong technical foundations and refined visual execution. I work with Angular, Node.js, React, MySQL, REST APIs and Kotlin to build solutions that combine interface, logic, structure and scalability.",
    subdescription:
      "I enjoy building products that not only work well, but also communicate quality, clarity and attention to detail.",
    primary: "View projects",
    secondary: "Contact me",
    tertiary: "GitHub",
    player: "Player",
    creativeMode: "Creative mode",
    skill: "Skill",
    stats: {
      role: "Full Stack Developer",
      level: "Lv. 24",
      className: "Web • Mobile • Backend",
      affinity: "UI / UX + Engineering",
      status: "Open to new challenges",
    },
    cards: [
      {
        title: "Core stack",
        value: "Angular • Node.js • React • MySQL",
        icon: Code2,
      },
      {
        title: "Specialty",
        value: "Full Stack Web • REST APIs • Architecture",
        icon: Layers3,
      },
      {
        title: "Mobile",
        value: "Mobile applications with Kotlin, JavaScript and React Native",
        icon: Smartphone,
      },
    ],
  },
};

export default function Hero({ language }: HeroProps) {
  const t = content[language];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-0 pb-10 pt-24 sm:pb-14 sm:pt-28 md:min-h-[92vh] md:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-8 h-60 w-60 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute right-[-80px] top-12 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
        <div className="absolute bottom-[-40px] left-1/3 h-56 w-56 rounded-full bg-pink-300/8 blur-3xl" />
      </div>

      <div className="w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="game-label retro-badge w-fit"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t.badge}
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:mt-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-6">
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">Player Data</div>
              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div className="game-screen retro-screen p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="pacman-row scale-90 sm:scale-100">
                    <span className="pacman" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                    <span className="power-pellet" />
                  </div>

                  <div className="arcade-ghost arcade-ghost--blue" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/10 text-fuchsia-200 sm:h-14 sm:w-14">
                    <Heart className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/75">
                      {t.player}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      Anahí Lozano
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="game-stat">
                  <span className="game-stat__label">Role</span>
                  <span className="game-stat__value">{t.stats.role}</span>
                </div>

                <div className="game-stat">
                  <span className="game-stat__label">Level</span>
                  <span className="game-stat__value">{t.stats.level}</span>
                </div>

                <div className="game-stat">
                  <span className="game-stat__label">Class</span>
                  <span className="game-stat__value">{t.stats.className}</span>
                </div>

                <div className="game-stat">
                  <span className="game-stat__label">Affinity</span>
                  <span className="game-stat__value">{t.stats.affinity}</span>
                </div>
              </div>

              <div className="game-divider" />

              <div className="space-y-3 text-left">
                <div className="game-chip">
                  <Shield className="h-3.5 w-3.5 text-fuchsia-200" />
                  {t.stats.status}
                </div>

                <div className="game-chip">
                  <Star className="h-3.5 w-3.5 text-violet-200" />
                  Frontend + Backend
                </div>

                <div className="game-chip">
                  <Sparkles className="h-3.5 w-3.5 text-pink-200" />
                  {language === "es" ? "Diseño cuidado" : "Polished design"}
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners overflow-hidden"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">Main Quest</div>
              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-7">
              <p className="text-left text-[11px] uppercase tracking-[0.22em] text-slate-400 sm:text-xs sm:tracking-[0.28em]">
                {t.intro}
              </p>

              <h1 className="pixel-title glow-text mt-4 text-left text-3xl text-white sm:text-4xl md:text-5xl lg:text-6xl">
                <span className="block">{t.title1}</span>
                <span className="game-title-gradient block">{t.title2}</span>
                <span className="mt-2 block text-slate-200">{t.title3}</span>
              </h1>

              <div className="mt-5 sm:mt-6">
                <div className="game-screen retro-screen p-4 sm:p-5 md:p-6">
                  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <div className="pacman-row scale-90 sm:scale-100">
                      <span className="pacman" />
                      <span className="pacdot" />
                      <span className="pacdot" />
                      <span className="pacdot" />
                      <span className="power-pellet" />
                      <span className="arcade-ghost arcade-ghost--violet" />
                    </div>

                    <div className="retro-badge w-fit">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      {t.creativeMode}
                    </div>
                  </div>

                  <p className="text-left text-sm leading-7 text-slate-300 md:text-base">
                    {t.description}
                  </p>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                    {t.subdescription}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                <Link
                  to="/projects"
                  className="arcade-button retro-boost justify-center sm:justify-start"
                >
                  {t.primary}
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to="/contact"
                  className="game-button-secondary justify-center sm:justify-start"
                >
                  {t.secondary}
                </Link>

                <a
                  href="https://github.com/Alucarduwu"
                  target="_blank"
                  rel="noreferrer"
                  className="game-button-secondary justify-center sm:justify-start"
                >
                  <Github className="h-4 w-4" />
                  {t.tertiary}
                </a>
              </div>

              <div className="mt-6 flex items-center justify-center md:justify-start">
                <div className="pacman-row scale-90 sm:scale-100">
                  <span className="pacman" />
                  <span className="pacdot" />
                  <span className="pacdot" />
                  <span className="pacdot" />
                  <span className="pacdot" />
                  <span className="power-pellet" />
                  <span className="arcade-ghost" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-3">
          {t.cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="game-card console-screen p-4 text-left sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 text-fuchsia-200">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="game-chip">{t.skill}</span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="pacman-row scale-90 sm:scale-100">
                    <span className="pacman" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                  </div>

                  <div className="arcade-ghost arcade-ghost--blue" />
                </div>

                <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-200/80">
                  {card.title}
                </p>

                <p className="mt-2 text-sm font-semibold leading-6 text-white">
                  {card.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}