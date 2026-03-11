import { motion, type Variants } from "framer-motion";
import {
  Heart,
  Sparkles,
  Laptop2,
  ServerCog,
  Smartphone,
  Database,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Language } from "../App";

interface AboutProps {
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
    badge: "Sobre mí",
    title: "Desarrolladora Full Stack con enfoque en producto, diseño y escalabilidad",
    paragraph1:
      "Soy desarrolladora enfocada en construir experiencias digitales completas: desde interfaces modernas y bien cuidadas hasta lógica backend sólida, APIs funcionales y estructuras escalables. Me gusta crear productos que se vean profesionales, se sientan intuitivos y resuelvan problemas reales.",
    paragraph2:
      "He trabajado en plataformas web full stack, aplicaciones móviles con Kotlin y sistemas con autenticación por roles, paneles administrativos, modelado de bases de datos relacionales y consumo o desarrollo de APIs REST. También cuento con bases en Linux, networking y ciberseguridad, lo que me permite entender los sistemas de forma más integral.",
    paragraph3:
      "Disfruto combinar desarrollo, diseño y organización técnica para entregar soluciones limpias, mantenibles y con una identidad visual fuerte. Me adapto con facilidad a frontend, backend o mobile, y me interesa seguir creciendo en entornos donde pueda aportar tanto en implementación como en mejora del producto.",
    cardTitle: "Fortalezas clave",
    technicalProfile: "Perfil técnico",
    productDesign: "Producto + diseño",
    powerUps: "Power ups",
    skill: "Skill",
    background: "Background",
    viewProjects: "Ver proyectos",
    contact: "Contáctame",
    highlights: [
      "Desarrollo Full Stack web",
      "Aplicaciones móviles con Kotlin, Java y React Native",
      "APIs REST, autenticación JWT y RBAC",
      "Bases de datos relacionales, SQL y modelado",
      "UI cuidada, responsive y orientada a producto",
    ],
    miniCards: [
      {
        title: "Frontend + UI",
        text: "Diseño interfaces modernas, limpias y visualmente cuidadas, con atención a experiencia de usuario, estructura y detalle.",
        icon: Laptop2,
      },
      {
        title: "Backend + arquitectura",
        text: "Construyo APIs, lógica de negocio, autenticación y flujos escalables con enfoque en organización y mantenibilidad.",
        icon: ServerCog,
      },
      {
        title: "Mobile development",
        text: "También desarrollo aplicaciones móviles con Kotlin, buscando que sean funcionales, intuitivas y bien resueltas visualmente.",
        icon: Smartphone,
      },
      {
        title: "Data + modelado",
        text: "Trabajo con bases de datos relacionales, diseño de estructuras y consultas SQL para soportar productos sólidos.",
        icon: Database,
      },
      {
        title: "Detalle + producto",
        text: "Cuido tanto la funcionalidad como la estética, porque creo que un buen producto debe resolver y también transmitir calidad.",
        icon: Heart,
      },
    ],
  },
  en: {
    badge: "About",
    title: "Full Stack Developer focused on product, design and scalability",
    paragraph1:
      "I am a developer focused on building complete digital experiences, from modern, polished interfaces to solid backend logic, functional APIs and scalable structures. I enjoy creating products that look professional, feel intuitive and solve real problems.",
    paragraph2:
      "My experience includes full stack web platforms, mobile applications built with Kotlin, and systems with role-based authentication, admin dashboards, relational database modeling, and REST API development and integration. I also have foundations in Linux, networking and cybersecurity, which give me a broader systems perspective.",
    paragraph3:
      "I enjoy combining development, design and technical structure to deliver clean, maintainable solutions with a strong visual identity. I adapt easily across frontend, backend or mobile environments, and I am motivated by opportunities where I can contribute both to implementation and product improvement.",
    cardTitle: "Core strengths",
    technicalProfile: "Technical profile",
    productDesign: "Product + design",
    powerUps: "Power ups",
    skill: "Skill",
    background: "Background",
    viewProjects: "View projects",
    contact: "Contact me",
    highlights: [
      "Full Stack web development",
      "Mobile applications with Kotlin",
      "REST APIs, JWT authentication and RBAC",
      "Relational databases, SQL and data modeling",
      "Polished, responsive, product-driven UI",
    ],
    miniCards: [
      {
        title: "Frontend + UI",
        text: "I build modern, clean and visually refined interfaces with strong attention to user experience, structure and detail.",
        icon: Laptop2,
      },
      {
        title: "Backend + architecture",
        text: "I develop APIs, business logic, authentication flows and scalable systems with a focus on organization and maintainability.",
        icon: ServerCog,
      },
      {
        title: "Mobile development",
        text: "I also create mobile applications with Kotlin, aiming for solutions that are functional, intuitive and visually polished.",
        icon: Smartphone,
      },
      {
        title: "Data + modeling",
        text: "I work with relational databases, data structures and SQL queries to support robust and reliable products.",
        icon: Database,
      },
      {
        title: "Detail + product",
        text: "I care about both functionality and aesthetics, because great products should solve problems and also communicate quality.",
        icon: Heart,
      },
    ],
  },
};

export default function About({ language }: AboutProps) {
  const t = content[language];

  return (
    <section className="relative overflow-hidden py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.08),transparent_28%)]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={fadeUp}
      >
        <div className="game-label retro-badge">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h2 className="pixel-title glow-text mt-4 max-w-5xl text-2xl text-white sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
          <span className="game-title-gradient">{t.title}</span>
        </h2>

        <div className="mt-4 flex items-center justify-start">
          <div className="pacman-row scale-90 sm:scale-100">
            <span className="pacman" />
            <span className="pacdot" />
            <span className="pacdot" />
            <span className="pacdot" />
            <span className="power-pellet" />
            <span className="arcade-ghost arcade-ghost--violet" />
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners overflow-hidden"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">
                {t.background}
              </div>

              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="game-screen retro-screen p-4 sm:p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="game-chip">
                      <Shield className="h-3.5 w-3.5 text-fuchsia-200" />
                      {t.technicalProfile}
                    </span>

                    <span className="game-chip">
                      <Star className="h-3.5 w-3.5 text-violet-200" />
                      {t.productDesign}
                    </span>
                  </div>

                  <div className="pacman-row scale-90 sm:scale-100">
                    <span className="pacman" />
                    <span className="pacdot" />
                    <span className="pacdot" />
                    <span className="arcade-ghost arcade-ghost--blue" />
                  </div>
                </div>

                <div className="space-y-4 text-left text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8 md:text-base">
                  <p>{t.paragraph1}</p>
                  <p>{t.paragraph2}</p>
                  <p>{t.paragraph3}</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                  <Link
                    to="/projects"
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500/90 via-violet-500/90 to-pink-400/90 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200"
                  >
                    {t.viewProjects}
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition-colors duration-200 hover:border-fuchsia-300/25 hover:text-fuchsia-200"
                  >
                    {t.contact}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
          >
            <div className="rpg-window__bar console-topbar">
              <div className="rpg-window__title console-brand">{t.cardTitle}</div>

              <div className="rpg-window__dots console-leds">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="retro-badge">
                  <Sparkles className="h-3.5 w-3.5" />
                  {t.powerUps}
                </div>

                <div className="arcade-ghost arcade-ghost--violet" />
              </div>

              <div className="space-y-3">
                {t.highlights.map((item) => (
                  <div key={item} className="game-stat">
                    <span className="game-stat__label">{t.skill}</span>
                    <span className="game-stat__value">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2 xl:grid-cols-5">
          {t.miniCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="game-card console-screen p-4 text-left sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 text-fuchsia-200 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" />
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

                <h3 className="text-base font-semibold text-white md:text-lg">
                  {card.title}
                </h3>

                <div className="game-divider my-4" />

                <p className="text-sm leading-7 text-slate-300">{card.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}