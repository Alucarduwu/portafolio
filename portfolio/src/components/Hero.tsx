import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Github,
  Code2,
  Layers3,
  Smartphone,
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
    badge: "Full Stack Developer • Web • Mobile • Backend",
    intro: "Hola, soy Anahí Betzabé Lozano de Lira",
    title1: "Diseño y desarrollo",
    title2: "productos digitales",
    title3: "modernos, funcionales y con una ejecución visual sólida.",
    description:
      "Soy desarrolladora Full Stack enfocada en crear experiencias web y móviles con una base técnica fuerte y una estética cuidada. Trabajo con Angular, Node.js, React, MySQL, APIs REST y Kotlin para construir soluciones que combinen interfaz, lógica, estructura y escalabilidad.",
    subdescription:
      "Me interesa desarrollar productos que no solo funcionen bien, sino que también transmitan calidad, claridad y atención al detalle.",
    primary: "Ver proyectos",
    secondary: "Contáctame",
    tertiary: "GitHub",
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
        value: "Aplicaciones móviles con Kotlin",
        icon: Smartphone,
      },
    ],
  },
  en: {
    badge: "Full Stack Developer • Web • Mobile • Backend",
    intro: "Hi, I’m Anahí Betzabé Lozano de Lira",
    title1: "I design and build",
    title2: "digital products",
    title3: "that are modern, functional and visually well executed.",
    description:
      "I am a Full Stack Developer focused on creating web and mobile experiences with strong technical foundations and refined visual execution. I work with Angular, Node.js, React, MySQL, REST APIs and Kotlin to build solutions that combine interface, logic, structure and scalability.",
    subdescription:
      "I enjoy building products that not only work well, but also communicate quality, clarity and attention to detail.",
    primary: "View projects",
    secondary: "Contact me",
    tertiary: "GitHub",
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
        value: "Mobile applications with Kotlin",
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
  className="relative flex min-h-[90vh] items-center overflow-hidden py-20 md:py-24"
>
  <div className="absolute inset-0 -z-10">
    <div className="absolute left-[-120px] top-16 h-72 w-72 rounded-full bg-fuchsia-400/15 blur-3xl" />
    <div className="absolute right-[-80px] top-12 h-80 w-80 rounded-full bg-violet-400/15 blur-3xl" />
    <div className="absolute bottom-[-40px] left-1/3 h-72 w-72 rounded-full bg-pink-300/10 blur-3xl" />
  </div>

  <div className="w-full max-w-5xl">

    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/[0.05] px-4 py-1.5 text-xs font-medium text-fuchsia-200 backdrop-blur-md"
    >
      <Sparkles className="h-3.5 w-3.5" />
      {t.badge}
    </motion.div>

    <motion.p
      custom={1}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mt-6 text-xs uppercase tracking-[0.25em] text-slate-400"
    >
      {t.intro}
    </motion.p>

    <motion.h1
      custom={2}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl"
    >
      {t.title1}{" "}
      <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
        {t.title2}
      </span>
      <br />
      <span className="text-slate-200">{t.title3}</span>
    </motion.h1>

    <motion.div
      custom={3}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mt-6 max-w-2xl"
    >
      <p className="text-sm leading-7 text-slate-300 md:text-base">
        {t.description}
      </p>

      <p className="mt-3 text-sm text-slate-400">
        {t.subdescription}
      </p>
    </motion.div>

    <motion.div
      custom={4}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mt-8 flex flex-wrap gap-3"
    >
      <a
        href="#projects"
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-pink-400 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(216,180,254,0.25)] transition-all hover:scale-[1.02]"
      >
        {t.primary}
        <ArrowRight className="h-4 w-4" />
      </a>

      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:bg-white/[0.08]"
      >
        {t.secondary}
      </a>

      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.07]"
      >
        <Github className="h-4 w-4" />
        {t.tertiary}
      </a>
    </motion.div>

    <motion.div
      custom={5}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3"
    >
      {t.cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all hover:border-fuchsia-300/20"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200">
              <Icon className="h-4 w-4" />
            </div>

            <p className="mt-3 text-xs uppercase tracking-wide text-fuchsia-200/80">
              {card.title}
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {card.value}
            </p>
          </div>
        );
      })}
    </motion.div>

  </div>
</section>
  );
}