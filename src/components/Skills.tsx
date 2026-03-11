import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Boxes,
  Wrench,
  Gamepad2,
  Smartphone,
  Rocket,
  MonitorSmartphone,
  Code2,
  ServerCog,
  Database,
} from "lucide-react";
import { skillSections } from "../components/dataprojetcts/skills";
import type { Language } from "../App";

interface SkillsProps {
  language: Language;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const content = {
  es: {
    badge: "Tecnologías",
    title: "Stack tecnológico",
    description:
      "Tecnologías, frameworks y herramientas con las que trabajo en desarrollo web, backend y aplicaciones móviles.",
    panelTitle: "Tech Inventory",
    categoryLabel: "Categoría",
    inventory: "Inventario técnico",
    tools: "Herramientas y stack",
    mobile: "Multiplataforma con React Native",
    loadout: "Loadout",
    openPage: "Abrir página",
  },
  en: {
    badge: "Skills",
    title: "Tech stack",
    description:
      "Technologies, frameworks and tools I use across web development, backend systems and mobile applications.",
    panelTitle: "Tech Inventory",
    categoryLabel: "Category",
    inventory: "Technical inventory",
    tools: "Tools and stack",
    mobile: "Cross-platform with React Native",
    loadout: "Loadout",
  },
};

export default function Skills({ language }: SkillsProps) {
  const t = content[language];

  const enhancedSections = skillSections.map((section) => {
    const titleEs = section.titleEs.toLowerCase();
    const titleEn = section.titleEn.toLowerCase();

    const isMobileSection =
      titleEs.includes("móvil") ||
      titleEs.includes("mobile") ||
      titleEn.includes("mobile");

    const isBackendSection =
      titleEs.includes("backend") ||
      titleEs.includes("servidor") ||
      titleEs.includes("api") ||
      titleEn.includes("backend") ||
      titleEn.includes("server") ||
      titleEn.includes("api");

    const isDatabaseSection =
      titleEs.includes("base de datos") ||
      titleEs.includes("bases de datos") ||
      titleEs.includes("bd") ||
      titleEs.includes("database") ||
      titleEn.includes("database") ||
      titleEn.includes("databases") ||
      titleEn.includes("data");

    const currentNames = section.skills.map((skill) => skill.name.toLowerCase());

    const extraSkills = [
      ...(isMobileSection
        ? [
            !currentNames.includes("react native")
              ? { name: "React Native", icon: Smartphone }
              : null,
            !currentNames.includes("expo")
              ? { name: "Expo", icon: Rocket }
              : null,
            !currentNames.includes("genymotion")
              ? { name: "Genymotion", icon: MonitorSmartphone }
              : null,
          ]
        : []),

      ...(isBackendSection
        ? [
            !currentNames.includes("php")
              ? { name: "PHP", icon: Code2 }
              : null,
            !currentNames.includes("laravel")
              ? { name: "Laravel", icon: ServerCog }
              : null,
            !currentNames.includes("express")
              ? { name: "Express", icon: ServerCog }
              : null,
          ]
        : []),

      ...(isDatabaseSection
        ? [
            !currentNames.includes("sql server")
              ? { name: "SQL Server", icon: Database }
              : null,
            !currentNames.includes("sqlite")
              ? { name: "SQLite", icon: Database }
              : null,
          ]
        : []),
    ].filter(Boolean) as { name: string; icon: React.ElementType }[];

    if (extraSkills.length === 0) return section;

    return {
      ...section,
      skills: [...section.skills, ...extraSkills],
    };
  });

  return (
    <section className="py-10 sm:py-14 md:py-20 lg:py-24">
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

        <div className="mt-4 flex flex-col gap-5 md:mt-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h2 className="pixel-title glow-text text-2xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
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
          </div>
        </div>

        <div className="mt-6 max-w-4xl">
          <div className="game-screen retro-screen p-4 sm:p-5 md:p-6">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                <span className="game-chip">
                  <Boxes className="h-3.5 w-3.5 text-fuchsia-200" />
                  {t.inventory}
                </span>

                <span className="game-chip">
                  <Wrench className="h-3.5 w-3.5 text-violet-200" />
                  {t.tools}
                </span>

                <span className="game-chip">
                  <Smartphone className="h-3.5 w-3.5 text-pink-200" />
                  {t.mobile}
                </span>
              </div>

              <div className="retro-badge w-fit">
                <Gamepad2 className="h-3.5 w-3.5" />
                {t.loadout}
              </div>
            </div>

            <p className="text-left text-sm leading-7 text-slate-300 sm:text-[15px] sm:leading-8">
              {t.description}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {enhancedSections.map((section, sectionIndex) => {
            const title = language === "es" ? section.titleEs : section.titleEn;

            return (
              <motion.article
                key={title}
                custom={sectionIndex + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
                variants={fadeUp}
                className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
              >
                <div className="rpg-window__bar console-topbar">
                  <div className="rpg-window__title console-brand">
                    {t.panelTitle} #{String(sectionIndex + 1).padStart(2, "0")}
                  </div>

                  <div className="rpg-window__dots console-leds">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="game-screen console-screen p-4 sm:p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="game-chip">
                        <Boxes className="h-3.5 w-3.5 text-fuchsia-200" />
                        {t.categoryLabel}
                      </span>

                      <div className="pacman-row scale-90 sm:scale-100">
                        <span className="pacman" />
                        <span className="pacdot" />
                        <span className="arcade-ghost arcade-ghost--blue" />
                      </div>
                    </div>

                    <h3 className="text-left text-base font-semibold text-white sm:text-lg">
                      {title}
                    </h3>

                    <div className="game-divider my-4" />

                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
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
                            className="inline-flex min-h-[44px] items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-slate-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-fuchsia-300/20 hover:bg-white/[0.06]"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200">
                              <Icon size={15} />
                            </span>

                            <span className="break-words leading-5">
                              {skill.name}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}