import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { experience } from "../components/dataprojetcts/experience";
import type { Language } from "../App";

interface ExperienceProps {
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
    badge: "Experiencia",
    title: "Experiencia relevante",
  },
  en: {
    badge: "Experience",
    title: "Relevant experience",
  },
};

export default function Experience({ language }: ExperienceProps) {
  const t = content[language];

  return (
    <section id="experience" className="py-16 md:py-24">
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

        <div className="mt-10 grid gap-6">
          {experience.map((item, index) => {
            const Icon = item.icon;
            const title = language === "es" ? item.titleEs : item.titleEn;
            const company = language === "es" ? item.companyEs : item.companyEn;
            const period = language === "es" ? item.periodEs : item.periodEn;
            const description =
              language === "es" ? item.descriptionEs : item.descriptionEn;

            return (
              <motion.div
                key={item.titleEn}
                custom={index + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-[32px] border border-white/10 bg-white/[0.05] p-7 md:p-8 shadow-[0_0_28px_rgba(216,180,254,0.10)] backdrop-blur-md transition-all hover:border-fuchsia-300/20 hover:shadow-[0_0_34px_rgba(244,114,182,0.14)]"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200 shadow-[0_0_18px_rgba(244,114,182,0.12)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white">{title}</h3>
                      <p className="mt-1 text-sm font-medium text-fuchsia-200/90">
                        {company}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100 w-fit">
                    {period}
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-300">
                  {description}
                </p>

                <div className="mt-5">
                  <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-200">
                    {item.stack}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}