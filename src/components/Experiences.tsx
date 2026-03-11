import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Sparkles,
  Clock3,
  BriefcaseBusiness,
  Gamepad2,
  Star,
  X,
  ChevronRight,
  Code2,
  Wrench,
  BrainCircuit,
  Rocket,
  Laptop2,
  Database,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Globe,
  Boxes,
} from "lucide-react";
import { experience } from "../components/dataprojetcts/experience";
import type { Language } from "../App";

interface ExperienceProps {
  language: Language;
}

type ExperienceItem = (typeof experience)[number];

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
    panelTitle: "Mission Log",
    stackLabel: "Stack",
    periodLabel: "Periodo",
    roleLabel: "Rol",
    detailsTitle: "Detalle técnico",
    achievementsTitle: "Qué resolví",
    learningsTitle: "Aprendizajes",
    technologiesTitle: "Tecnologías utilizadas",
    architectureTitle: "Enfoque técnico",
    questActive: "Quest active",
    experienceLabel: "Experiencia",
    openDetails: "Ver detalle",
    dblClickHint: "Doble click para abrir detalle",
    close: "Cerrar",
    technicalView: "Vista técnica",
    impactLabel: "Impacto",
  },
  en: {
    badge: "Experience",
    title: "Relevant experience",
    panelTitle: "Mission Log",
    stackLabel: "Stack",
    periodLabel: "Period",
    roleLabel: "Role",
    detailsTitle: "Technical details",
    achievementsTitle: "Problems solved",
    learningsTitle: "Learnings",
    technologiesTitle: "Technologies used",
    architectureTitle: "Technical approach",
    questActive: "Quest active",
    experienceLabel: "Experience",
    openDetails: "View details",
    dblClickHint: "Double click to open details",
    close: "Close",
    technicalView: "Technical view",
    impactLabel: "Impact",
  },
};

function getTechIcon(tech: string) {
  const value = tech.toLowerCase();

  if (
    value.includes("angular") ||
    value.includes("react") ||
    value.includes("tailwind") ||
    value.includes("html") ||
    value.includes("css") ||
    value.includes("javascript") ||
    value.includes("typescript")
  ) {
    return Globe;
  }

  if (
    value.includes("node") ||
    value.includes("express") ||
    value.includes("api") ||
    value.includes("backend") ||
    value.includes("spring")
  ) {
    return ServerCog;
  }

  if (
    value.includes("mysql") ||
    value.includes("mariadb") ||
    value.includes("sql") ||
    value.includes("database")
  ) {
    return Database;
  }

  if (
    value.includes("jwt") ||
    value.includes("auth") ||
    value.includes("security") ||
    value.includes("rbac")
  ) {
    return ShieldCheck;
  }

  if (
    value.includes("kotlin") ||
    value.includes("java") ||
    value.includes("android") ||
    value.includes("compose") ||
    value.includes("react native")
  ) {
    return Smartphone;
  }

  if (
    value.includes("docker") ||
    value.includes("arquitect") ||
    value.includes("micro") ||
    value.includes("module")
  ) {
    return Boxes;
  }

  return Code2;
}

function splitStack(stack: string) {
  return stack
    .split("•")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getFallbackDetails(item: ExperienceItem, language: Language) {
  const stackItems = splitStack(item.stack);

  if (language === "es") {
    return {
      architecture: [
        `Participación en un entorno enfocado en ${stackItems.slice(0, 3).join(", ")}.`,
        "Implementación y ajuste de componentes, lógica o flujos según requerimientos del proyecto.",
        "Trabajo con enfoque en mantenibilidad, estructura clara y mejora incremental.",
      ],
      achievements: [
        "Resolución de tareas funcionales y técnicas dentro del flujo del producto.",
        "Aporte a la calidad visual y técnica de la solución.",
        "Adaptación a requerimientos, cambios y nuevas necesidades del proyecto.",
      ],
      learnings: [
        "Fortalecimiento de buenas prácticas de desarrollo.",
        "Mejor comprensión de arquitectura y organización técnica.",
        "Experiencia práctica colaborando en productos reales.",
      ],
      impact:
        "Contribución en implementación, mejora funcional y solidez técnica del producto.",
    };
  }

  return {
    architecture: [
      `Worked in an environment focused on ${stackItems.slice(0, 3).join(", ")}.`,
      "Implemented and refined components, logic, or workflows according to product requirements.",
      "Contributed with a maintainability-oriented and structured approach.",
    ],
    achievements: [
      "Solved functional and technical tasks within the product flow.",
      "Contributed to both visual quality and technical quality.",
      "Adapted effectively to changing requirements and project needs.",
    ],
    learnings: [
      "Strengthened software development best practices.",
      "Improved architectural and technical organization skills.",
      "Gained hands-on experience contributing to real products.",
    ],
    impact:
      "Contributed to implementation, functional improvement, and technical solidity of the product.",
  };
}

export default function Experience({ language }: ExperienceProps) {
  const t = content[language];
  const [selectedItem, setSelectedItem] = useState<ExperienceItem | null>(null);

  const enhancedExperience = useMemo(() => {
    return experience.map((item) => {
      const details = (item as any).details?.[language];
      const fallback = getFallbackDetails(item, language);

      return {
        ...item,
        resolvedDetails: {
          architecture: details?.architecture ?? fallback.architecture,
          achievements: details?.achievements ?? fallback.achievements,
          learnings: details?.learnings ?? fallback.learnings,
          impact: details?.impact ?? fallback.impact,
        },
      };
    });
  }, [language]);

  return (
    <>
      <section className="py-10 sm:py-14 md:py-20 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <div className="game-label retro-badge">
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
              <span className="arcade-ghost arcade-ghost--blue" />
            </div>
          </div>

          <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
            {enhancedExperience.map((item, index) => {
              const Icon = item.icon;
              const title = language === "es" ? item.titleEs : item.titleEn;
              const company = language === "es" ? item.companyEs : item.companyEn;
              const period = language === "es" ? item.periodEs : item.periodEn;
              const description =
                language === "es" ? item.descriptionEs : item.descriptionEn;

              const stackItems = splitStack(item.stack);

              return (
                <motion.div
                  key={item.titleEn}
                  custom={index + 1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="rpg-window console-shell arcade-corners pixel-console"
                >
                  <div className="rpg-window__bar console-topbar">
                    <div className="rpg-window__title console-brand">
                      {t.panelTitle} #{String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="rpg-window__dots console-leds">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 md:p-7">
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-5">
                      <div
                        onDoubleClick={() => setSelectedItem(item)}
                        className="game-screen retro-screen cursor-default p-4 sm:p-5 transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(244,114,182,0.08)]"
                      >
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="pacman-row scale-90 sm:scale-100">
                            <span className="pacman" />
                            <span className="pacdot" />
                            <span className="pacdot" />
                            <span className="power-pellet" />
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <div className="retro-badge w-fit">
                              <Gamepad2 className="h-3.5 w-3.5" />
                              {t.questActive}
                            </div>

                            <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 md:inline-flex">
                              {t.dblClickHint}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 md:flex-row md:items-start">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200 sm:h-16 sm:w-16">
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="min-w-0 flex-1 text-left">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="game-chip">
                                <BriefcaseBusiness className="h-3.5 w-3.5 text-fuchsia-200" />
                                {company}
                              </span>

                              <span className="game-chip">
                                <Star className="h-3.5 w-3.5 text-violet-200" />
                                {t.experienceLabel}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl">
                              {title}
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-slate-300 sm:mt-4">
                              {description}
                            </p>

                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                              <button
                                type="button"
                                onClick={() => setSelectedItem(item)}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-fuchsia-500/90 via-violet-500/90 to-pink-400/90 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,70,239,0.18)] transition-all duration-300 hover:scale-[1.02]"
                              >
                                {t.openDetails}
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="game-card console-screen p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <Clock3 className="h-4 w-4 shrink-0 text-fuchsia-200" />
                              <p className="truncate text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200/85 sm:text-xs">
                                {t.periodLabel}
                              </p>
                            </div>

                            <div className="arcade-ghost arcade-ghost--blue shrink-0" />
                          </div>

                          <div className="game-divider mb-3" />

                          <p className="text-sm font-semibold text-white">
                            {period}
                          </p>
                        </div>

                        <div className="game-card console-screen p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200/85 sm:text-xs">
                              {t.roleLabel}
                            </p>

                            <div className="pacman-row">
                              <span className="pacman" />
                              <span className="pacdot" />
                            </div>
                          </div>

                          <div className="game-divider my-3" />

                          <p className="text-sm font-semibold text-white">
                            {title}
                          </p>
                        </div>

                        <div className="game-card console-screen p-4">
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200/85 sm:text-xs">
                              {t.stackLabel}
                            </p>

                            <div className="arcade-ghost arcade-ghost--violet shrink-0" />
                          </div>

                          <div className="game-divider my-3" />

                          <div className="flex flex-wrap gap-2">
                            {stackItems.map((tech) => {
                              const TechIcon = getTechIcon(tech);

                              return (
                                <span
                                  key={tech}
                                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200"
                                >
                                  <TechIcon className="h-3.5 w-3.5 text-fuchsia-200" />
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <ExperienceDetailModal
            item={selectedItem}
            language={language}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function ExperienceDetailModal({
  item,
  language,
  onClose,
}: {
  item: ExperienceItem;
  language: Language;
  onClose: () => void;
}) {
  const t = content[language];

  const title = language === "es" ? item.titleEs : item.titleEn;
  const company = language === "es" ? item.companyEs : item.companyEn;
  const period = language === "es" ? item.periodEs : item.periodEn;
  const description = language === "es" ? item.descriptionEs : item.descriptionEn;

  const stackItems = splitStack(item.stack);
  const Icon = item.icon;

  const details = (item as any).details?.[language];
  const fallback = getFallbackDetails(item, language);

  const architecture = details?.architecture ?? fallback.architecture;
  const achievements = details?.achievements ?? fallback.achievements;
  const learnings = details?.learnings ?? fallback.learnings;
  const impact = details?.impact ?? fallback.impact;

  return (
    <>
      <motion.button
        type="button"
        aria-label={t.close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-[#05060c]/75 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-3 top-1/2 z-[90] max-h-[88vh] -translate-y-1/2 overflow-hidden rounded-[1.8rem] border border-fuchsia-300/15 bg-[#0b0914]/96 shadow-[0_24px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:inset-x-6 lg:left-1/2 lg:w-[min(1100px,92vw)] lg:-translate-x-1/2"
      >
        <div className="flex max-h-[88vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-5 md:px-6">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="game-chip">
                  <BriefcaseBusiness className="h-3.5 w-3.5 text-fuchsia-200" />
                  {company}
                </span>
                <span className="game-chip">
                  <Clock3 className="h-3.5 w-3.5 text-violet-200" />
                  {period}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                {title}
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                {description}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-slate-300 transition-all duration-200 hover:border-fuchsia-300/20 hover:text-fuchsia-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-y-auto px-4 py-4 sm:px-5 md:px-6 md:py-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="space-y-4">
                <div className="game-screen retro-screen p-4 sm:p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 text-fuchsia-200">
                        <Icon className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/80">
                          {t.technicalView}
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          {t.detailsTitle}
                        </p>
                      </div>
                    </div>

                    <div className="pacman-row">
                      <span className="pacman" />
                      <span className="pacdot" />
                      <span className="pacdot" />
                      <span className="power-pellet" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <DetailBlock
                      icon={Wrench}
                      title={t.achievementsTitle}
                      items={achievements}
                    />

                    <DetailBlock
                      icon={BrainCircuit}
                      title={t.learningsTitle}
                      items={learnings}
                    />

                    <DetailBlock
                      icon={Rocket}
                      title={t.architectureTitle}
                      items={architecture}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="game-card console-screen p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                      {t.technologiesTitle}
                    </p>
                    <div className="arcade-ghost arcade-ghost--violet" />
                  </div>

                  <div className="game-divider my-3" />

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {stackItems.map((tech) => {
                      const TechIcon = getTechIcon(tech);

                      return (
                        <div
                          key={tech}
                          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200">
                            <TechIcon className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-slate-200">{tech}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="game-card console-screen p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                      {t.periodLabel}
                    </p>
                    <Clock3 className="h-4 w-4 text-fuchsia-200" />
                  </div>

                  <div className="game-divider my-3" />

                  <p className="text-sm font-semibold text-white">{period}</p>
                </div>

                <div className="game-card console-screen p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                      {t.roleLabel}
                    </p>
                    <Laptop2 className="h-4 w-4 text-fuchsia-200" />
                  </div>

                  <div className="game-divider my-3" />

                  <p className="text-sm font-semibold text-white">{title}</p>
                </div>

                <div className="game-card console-screen p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                      {t.impactLabel}
                    </p>
                    <Star className="h-4 w-4 text-violet-200" />
                  </div>

                  <div className="game-divider my-3" />

                  <p className="text-sm leading-7 text-slate-300">{impact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function DetailBlock({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.025] p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-fuchsia-300/15 bg-gradient-to-br from-fuchsia-500/15 to-violet-500/15 text-fuchsia-200">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-sm font-semibold text-white">{title}</p>
      </div>

      <ul className="space-y-2">
        {items.map((entry) => (
          <li
            key={entry}
            className="flex items-start gap-3 text-sm leading-7 text-slate-300"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-300" />
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}