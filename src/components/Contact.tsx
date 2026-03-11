import { motion, type Variants } from "framer-motion";
import {
  Mail,
  Github,
  FileText,
  Linkedin,
  Sparkles,
  Send,
  Star,
} from "lucide-react";
import type { Language } from "../App";

interface ContactProps {
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
    badge: "Contacto",
    title: "Construyamos algo increíble",
    description:
      "Estoy abierta a oportunidades en desarrollo full stack, frontend, backend y desarrollo móvil. Si quieres colaborar, conocer mi trabajo o contactarme para una vacante, aquí puedes encontrar mis enlaces principales.",
    email: "Correo",
    github: "GitHub",
    linkedin: "LinkedIn",
    cvStandard: "CV (Normal)",
    cvHarvard: "CV (Formato Harvard)",
    panelTitle: "Communication Terminal",
    linksTitle: "Canales principales",
    availability: "Disponible para colaboración y oportunidades",
    quickNote: "Respuesta por correo o LinkedIn",
    document: "Documento",
    cvStandardText:
      "Versión principal de mi currículum para revisión general.",
    cvHarvardText:
      "Versión académica/profesional en formato Harvard.",
  },
  en: {
    badge: "Contact",
    title: "Let’s build something amazing",
    description:
      "I’m open to opportunities in full stack development, frontend, backend and mobile development.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    cvStandard: "CV (Standard)",
    cvHarvard: "CV (Harvard Format)",
    panelTitle: "Communication Terminal",
    linksTitle: "Main channels",
    availability: "Available for collaboration and opportunities",
    quickNote: "Reply via email or LinkedIn",
    document: "Document",
    cvStandardText: "Main version of my resume for general review.",
    cvHarvardText:
      "Academic/professional version in Harvard format.",
  },
};

export default function Contact({ language }: ContactProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={fadeUp}
        className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
      >
        <div className="rpg-window__bar console-topbar">
          <div className="rpg-window__title console-brand truncate pr-4">
            {t.panelTitle}
          </div>

          <div className="rpg-window__dots console-leds">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="p-4 sm:p-5 md:p-7 lg:p-8">
          <div className="game-label retro-badge w-fit">
            <Sparkles className="h-4 w-4" />
            {t.badge}
          </div>

          <h2 className="pixel-title glow-text mt-4 text-2xl text-white sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
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

          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="game-screen retro-screen p-4 sm:p-5 md:p-6"
            >
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="game-chip">
                  <Star className="h-3.5 w-3.5 text-fuchsia-200" />
                  {t.availability}
                </span>

                <span className="game-chip">
                  <Send className="h-3.5 w-3.5 text-violet-200" />
                  {t.quickNote}
                </span>
              </div>

              <p className="text-left text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8">
                {t.description}
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="game-card console-screen p-4 sm:p-5 md:p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-fuchsia-200/80 sm:text-xs">
                {t.linksTitle}
              </p>

              <div className="game-divider my-4" />

              <div className="space-y-3">
                <a
                  href="mailto:anahydlira@gmail.com"
                  className="game-button-secondary w-full justify-start gap-3 text-sm"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.email}</span>
                </a>

                <a
                  href="https://github.com/Alucarduwu"
                  target="_blank"
                  rel="noreferrer"
                  className="game-button-secondary w-full justify-start gap-3 text-sm"
                >
                  <Github className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.github}</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/anahi-lozano-de-lira-a4213a187"
                  target="_blank"
                  rel="noreferrer"
                  className="game-button-secondary w-full justify-start gap-3 text-sm"
                >
                  <Linkedin className="h-4 w-4 shrink-0" />
                  <span className="truncate">{t.linkedin}</span>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <motion.a
              href="/Cv Anahi Betzabe Lozano de Lira.pdf"
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="game-card console-screen block p-4 transition-colors duration-200 sm:p-5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 text-fuchsia-200 sm:h-12 sm:w-12">
                <FileText className="h-5 w-5" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-200/80 sm:text-[11px]">
                {t.document}
              </p>

              <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                {t.cvStandard}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">
                {t.cvStandardText}
              </p>
            </motion.a>

            <motion.a
              href="/Anahi_Lozano_Harvard_CV.pdf"
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="game-card console-screen block p-4 transition-colors duration-200 sm:p-5"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 text-fuchsia-200 sm:h-12 sm:w-12">
                <FileText className="h-5 w-5" />
              </div>

              <p className="text-[10px] uppercase tracking-[0.18em] text-fuchsia-200/80 sm:text-[11px]">
                {t.document}
              </p>

              <h3 className="mt-2 text-base font-semibold text-white sm:text-lg">
                {t.cvHarvard}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:leading-7">
                {t.cvHarvardText}
              </p>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}