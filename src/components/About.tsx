import { motion, type Variants } from "framer-motion";
import {
  Heart,
  Sparkles,
  Laptop2,
  ServerCog,
  Smartphone,
  Database,
} from "lucide-react";
import type { Language } from "../App";

interface AboutProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
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
    highlights: [
      "Desarrollo Full Stack web",
      "Aplicaciones móviles con Kotlin,Java y React Native",
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
    <section id="about" className="relative py-18 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.10),transparent_28%)]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-fuchsia-200 shadow-[0_0_24px_rgba(244,114,182,0.10)] backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h2 className="mt-5 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
          {t.title}
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 text-slate-300 shadow-[0_10px_40px_rgba(168,85,247,0.10)] backdrop-blur-md md:p-9"
          >
            <div className="space-y-5 text-[15px] leading-8 md:text-base">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
              <p>{t.paragraph3}</p>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="rounded-[32px] border border-fuchsia-300/20 bg-gradient-to-b from-fuchsia-500/12 via-violet-500/10 to-white/[0.03] p-7 shadow-[0_10px_40px_rgba(244,114,182,0.12)] backdrop-blur-md md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-fuchsia-200/90">
              {t.cardTitle}
            </p>

            <ul className="mt-6 space-y-3">
              {t.highlights.map((item) => (
                <li
                  key={item}
                  className="group rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-100 shadow-[0_0_18px_rgba(216,180,254,0.06)] transition-all duration-300 hover:border-fuchsia-300/25 hover:bg-white/[0.05]"
                >
                  <span className="inline-flex items-start gap-3">
                    <span className="mt-[7px] h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-300 to-violet-300 shadow-[0_0_12px_rgba(244,114,182,0.6)]" />
                    <span>{item}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {t.miniCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                custom={index + 3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_8px_30px_rgba(216,180,254,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-fuchsia-300/25 hover:bg-white/[0.06] hover:shadow-[0_16px_36px_rgba(244,114,182,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200 shadow-[0_0_20px_rgba(244,114,182,0.12)] transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-base font-semibold text-white md:text-lg">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {card.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}