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
import type { Language } from "../App";

interface HeroProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
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
          "Aplicaciones móviles con Kotlin, JavaScript and React Native (Multiplataform)",
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
        value:
          "Mobile applications with Kotlin JavaScript y React Native (Multiplataforma)",
        icon: Smartphone,
      },
    ],
  },
};

export default function Hero({ language }: HeroProps) {
  const t = content[language];

  return (
    <section
      id="home"
      className="relative flex min-h-[100vh] items-center overflow-hidden px-0 pb-16 pt-28 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="absolute right-[-80px] top-16 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
        <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />
      </div>

      <div className="w-full max-w-6xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="game-label retro-badge"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {t.badge}
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <motion.aside
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners pixel-console"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">Player Data</div>
              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div className="game-screen retro-screen p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="pacman-row">
                    <span className="pacman" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                    <span className="power-pellet" />
                  </div>

                  <div className="arcade-ghost arcade-ghost--blue" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-400/20 to-violet-400/20 text-fuchsia-200">
                    <Heart className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 text-left">
                    <p className="text-xs uppercase tracking-[0.18em] text-fuchsia-200/75">
                      {language === "es" ? "Jugador" : "Player"}
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
                  {language === "es"
                    ? "Frontend + Backend"
                    : "Frontend + Backend"}
                </div>

                <div className="game-chip">
                  <Sparkles className="h-3.5 w-3.5 text-pink-200" />
                  {language === "es" ? "Diseño cuidado" : "Polished design"}
                </div>
              </div>

              <div className="game-divider" />

              <div className="retro-controls pt-1">
                <div className="dpad" />

                <div className="console-mini-buttons">
                  <span />
                  <span />
                </div>

                <div className="arcade-pad-buttons">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </motion.aside>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">Main Quest</div>
              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="p-5 md:p-7">
              <motion.p
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-left text-xs uppercase tracking-[0.28em] text-slate-400"
              >
                {t.intro}
              </motion.p>

              <motion.h1
                custom={4}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="pixel-title glow-text mt-4 text-left text-4xl text-white md:text-6xl"
              >
                <span className="block">{t.title1}</span>
                <span className="game-title-gradient block">{t.title2}</span>
                <span className="mt-2 block text-slate-200">{t.title3}</span>
              </motion.h1>

              <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-6"
              >
                <div className="game-screen retro-screen p-5 md:p-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="pacman-row">
                      <span className="pacman" />
                      <span className="pacdot" />
                      <span className="pacdot" />
                      <span className="pacdot" />
                      <span className="power-pellet" />
                      <span className="arcade-ghost arcade-ghost--violet" />
                    </div>

                    <div className="retro-badge">
                      <Gamepad2 className="h-3.5 w-3.5" />
                      {language === "es" ? "Modo creativo" : "Creative mode"}
                    </div>
                  </div>

                  <p className="text-left text-sm leading-7 text-slate-300 md:text-base">
                    {t.description}
                  </p>

                  <p className="mt-3 text-left text-sm leading-7 text-slate-400">
                    {t.subdescription}
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={6}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a href="#projects" className="arcade-button retro-boost">
                  {t.primary}
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a href="#contact" className="game-button-secondary">
                  {t.secondary}
                </a>

                <a
                  href="https://github.com/alucarduwu"
                  target="_blank"
                  rel="noreferrer"
                  className="game-button-secondary"
                >
                  <Github className="h-4 w-4" />
                  {t.tertiary}
                </a>
              </motion.div>

              <div className="mt-6 flex items-center justify-center md:justify-start">
                <div className="pacman-row">
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

        <motion.div
          custom={7}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {t.cards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="game-card console-screen p-5 text-left"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="game-chip">
                    {language === "es" ? "Skill" : "Skill"}
                  </span>
                </div>

                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="pacman-row">
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
        </motion.div>
      </div>
    </section>
  );
}