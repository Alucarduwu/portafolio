import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { skillSections } from "../components/dataprojetcts/skills";
import type { Language } from "../App";

interface SkillsProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const content = {
  es: {
    badge: "Tecnologías",
    title: "Stack tecnológico",
    description:
      "Tecnologías, frameworks y herramientas con las que trabajo en desarrollo web, backend y aplicaciones móviles.",
  },
  en: {
    badge: "Skills",
    title: "Tech stack",
    description:
      "Technologies, frameworks and tools I use across web development, backend systems and mobile applications.",
  },
};

export default function Skills({ language }: SkillsProps) {
  const t = content[language];

  return (
    <section id="skills" className="py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-white/[0.05] px-4 py-2 text-sm text-fuchsia-200 shadow-[0_0_22px_rgba(244,114,182,0.10)] backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          {t.badge}
        </div>

        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          {t.title}
        </h2>

        <p className="mt-4 max-w-3xl text-slate-300 leading-8">
          {t.description}
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillSections.map((section, sectionIndex) => {
            const title = language === "es" ? section.titleEs : section.titleEn;

            return (
              <motion.div
                key={title}
                custom={sectionIndex + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_0_28px_rgba(216,180,254,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/25 hover:shadow-[0_0_38px_rgba(244,114,182,0.14)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/[0.04] via-transparent to-violet-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="inline-flex rounded-2xl border border-fuchsia-300/15 bg-fuchsia-500/10 px-4 py-2 shadow-[0_0_18px_rgba(244,114,182,0.08)]">
                    <h3 className="text-base font-semibold tracking-wide text-fuchsia-200">
                      {title}
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {section.skills.map((skill, skillIndex) => {
                      const Icon = skill.icon;

                      return (
                        <motion.div
                          key={skill.name}
                          custom={skillIndex + 1}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={fadeUp}
                          className="flex items-center gap-2 rounded-2xl border border-fuchsia-300/20 bg-black/20 px-3.5 py-2 text-sm font-medium text-slate-100 shadow-[0_0_16px_rgba(244,114,182,0.06)] transition-all duration-300 hover:scale-[1.04] hover:border-fuchsia-200/35 hover:bg-fuchsia-500/10 hover:text-fuchsia-100"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200 shadow-[0_0_14px_rgba(244,114,182,0.08)]">
                            <Icon size={16} />
                          </span>

                          <span className="whitespace-nowrap">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}