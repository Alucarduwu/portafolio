import { motion, type Variants } from "framer-motion";
import { Mail, Github, FileText, Linkedin, Sparkles } from "lucide-react";
import type { Language } from "../App";

interface ContactProps {
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
    badge: "Contacto",
    title: "Construyamos algo increíble",
    description:
      "Estoy abierta a oportunidades en desarrollo full stack, frontend, backend y desarrollo móvil. Si quieres colaborar, conocer mi trabajo o contactarme para una vacante, aquí puedes encontrar mis enlaces principales.",
    email: "Correo",
    github: "GitHub",
    linkedin: "LinkedIn",
    cvStandard: "CV (Normal)",
    cvHarvard: "CV (Formato Harvard)",
  },
  en: {
    badge: "Contact",
    title: "Let’s build something amazing",
    description:
      "I’m open to opportunities in full stack development, frontend, backend and mobile development. If you’d like to collaborate, review my work or contact me for a role, you can find my main links below.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    cvStandard: "CV (Standard)",
    cvHarvard: "CV (Harvard Format)",
  },
};

export default function Contact({ language }: ContactProps) {
  const t = content[language];

  return (
    <section id="contact" className="py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="rounded-[32px] border border-fuchsia-300/20 bg-gradient-to-br from-fuchsia-500/10 via-white/[0.05] to-violet-500/10 p-8 md:p-10 shadow-[0_0_40px_rgba(244,114,182,0.14)] backdrop-blur-md"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/[0.05] px-4 py-2 text-sm text-fuchsia-200 shadow-[0_0_20px_rgba(244,114,182,0.10)]">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          {t.title}
        </h2>

        <p className="mt-4 max-w-2xl text-slate-300 leading-8">
          {t.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:anahydlira@gmail.com"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-fuchsia-300/25 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
          >
            <Mail className="h-4 w-4" />
            {t.email}
          </a>

          <a
            href="https://github.com/Alucarduwu"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-fuchsia-300/25 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
          >
            <Github className="h-4 w-4" />
            {t.github}
          </a>

          <a
            href="https://www.linkedin.com/in/anahi-lozano-de-lira-a4213a187"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-fuchsia-300/25 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
          >
            <Linkedin className="h-4 w-4" />
            {t.linkedin}
          </a>

          <a
            href="/Cv Anahi Betzabe Lozano de Lira.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-pink-400 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(216,180,254,0.30)] transition-all hover:scale-[1.02]"
          >
            <FileText className="h-4 w-4" />
            {t.cvStandard}
          </a>

          <a
            href="/Anahi_Lozano_Harvard_CV.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-fuchsia-300/25 bg-fuchsia-500/10 px-5 py-3 text-sm font-semibold text-fuchsia-100 transition-all hover:bg-fuchsia-500/15 hover:border-fuchsia-200/40"
          >
            <FileText className="h-4 w-4" />
            {t.cvHarvard}
          </a>
        </div>
      </motion.div>
    </section>
  );
}