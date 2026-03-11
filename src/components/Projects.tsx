import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  FolderOpen,
  Image as ImageIcon,
  Star,
  Code2,
  BrainCircuit,
  Rocket,
  Wrench,
  CalendarDays,
  Globe,
  Smartphone,
  Database,
  ServerCog,
  ShieldCheck,
  Boxes,
  ArrowUpRight,
} from "lucide-react";
import { projects } from "../components/dataprojetcts/projects";
import type { Language } from "../App";

interface ProjectsProps {
  language: Language;
}

type ProjectItem = (typeof projects)[number];

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

const slideVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
    scale: 0.985,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.985,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    transition: {
      duration: 0.18,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const content = {
  es: {
    badge: "Proyectos",
    title: "Proyectos destacados",
    github: "GitHub",
    demo: "Demo",
    previous: "Anterior",
    next: "Siguiente",
    gallery: "capturas",
    close: "Cerrar",
    screenshots: "Capturas del proyecto",
    openGallery: "Ver galería",
    panelTitle: "Mission Select",
    projectLabel: "Proyecto",
    preview: "Vista previa",
    details: "Ver detalle",
    openPage: "Abrir página",
    technicalView: "Vista técnica",
    stack: "Tecnologías",
    role: "Tipo",
    period: "Periodo",
    status: "Estado",
    featured: "Destacado",
    active: "Activo",
    portfolio: "Portfolio",
    whatSolved: "Qué resolví",
    learnings: "Aprendizajes",
    approach: "Enfoque técnico",
    thumbnails: "Miniaturas",
    mobileType: "Móvil",
    webType: "Web",
    fullStackType: "Full Stack",
  },
  en: {
    badge: "Projects",
    title: "Featured projects",
    github: "GitHub",
    demo: "Demo",
    previous: "Previous",
    next: "Next",
    gallery: "screenshots",
    close: "Close",
    screenshots: "Project screenshots",
    openGallery: "View gallery",
    panelTitle: "Mission Select",
    projectLabel: "Project",
    preview: "Preview",
    details: "View details",
    openPage: "Open page",
    technicalView: "Technical view",
    stack: "Technologies",
    role: "Type",
    period: "Period",
    status: "Status",
    featured: "Featured",
    active: "Active",
    portfolio: "Portfolio",
    whatSolved: "Problems solved",
    learnings: "Learnings",
    approach: "Technical approach",
    thumbnails: "Thumbnails",
    mobileType: "Mobile",
    webType: "Web",
    fullStackType: "Full Stack",
  },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitStack(stack: string) {
  return stack
    .split("•")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getTechIcon(tech: string) {
  const value = tech.toLowerCase();

  if (
    value.includes("angular") ||
    value.includes("react") ||
    value.includes("tailwind") ||
    value.includes("html") ||
    value.includes("css") ||
    value.includes("javascript") ||
    value.includes("typescript") ||
    value.includes("vite")
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
    value.includes("module") ||
    value.includes("architecture")
  ) {
    return Boxes;
  }

  return Code2;
}

function getProjectType(project: ProjectItem, language: Language) {
  const stack = project.stack.toLowerCase();

  if (
    stack.includes("kotlin") ||
    stack.includes("android") ||
    stack.includes("compose") ||
    stack.includes("react native")
  ) {
    return language === "es" ? "Móvil" : "Mobile";
  }

  if (
    stack.includes("node") ||
    stack.includes("express") ||
    stack.includes("mysql") ||
    stack.includes("api")
  ) {
    return language === "es" ? "Full Stack" : "Full Stack";
  }

  return language === "es" ? "Web" : "Web";
}

function getFallbackProjectDetails(project: ProjectItem, language: Language) {
  const stackItems = splitStack(project.stack);

  if (language === "es") {
    return {
      period:
        (project as any).periodEs ??
        (project as any).period ??
        "Proyecto personal / académico",
      solved: [
        "Diseño e implementación de interfaces funcionales y visualmente cuidadas.",
        "Estructuración del proyecto para mantener orden, escalabilidad y reutilización.",
        `Integración y uso de tecnologías como ${stackItems.slice(0, 3).join(", ")}.`,
      ],
      learnings: [
        "Mejora en organización de componentes y arquitectura del proyecto.",
        "Fortalecimiento del flujo entre interfaz, lógica y datos.",
        "Experiencia práctica en resolución de problemas reales de producto.",
      ],
      approach: [
        "Enfoque en mantenibilidad, claridad visual y experiencia de usuario.",
        "Separación entre interfaz, lógica y recursos del proyecto.",
        "Construcción progresiva con atención a escalabilidad y calidad visual.",
      ],
    };
  }

  return {
    period:
      (project as any).periodEn ??
      (project as any).period ??
      "Personal / academic project",
    solved: [
      "Designed and implemented functional, polished interfaces.",
      "Structured the project for maintainability, scalability, and reuse.",
      `Integrated and worked with technologies such as ${stackItems
        .slice(0, 3)
        .join(", ")}.`,
    ],
    learnings: [
      "Improved component organization and project architecture.",
      "Strengthened the flow between UI, logic, and data.",
      "Gained hands-on experience solving real product problems.",
    ],
    approach: [
      "Focused on maintainability, visual clarity, and user experience.",
      "Separated UI, logic, and project resources clearly.",
      "Built progressively with scalability and visual quality in mind.",
    ],
  };
}

function hasProjectPage(project: ProjectItem) {
  return Boolean((project as any).slug || (project as any).hasDetailPage);
}

export default function Projects({ language }: ProjectsProps) {
  const t = content[language];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [detailProjectIndex, setDetailProjectIndex] = useState<number | null>(null);

  const total = projects.length;

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  const visibleProjects = useMemo(() => {
    const currentProject = projects[current];
    const nextProject = projects[(current + 1) % total];
    return [currentProject, nextProject];
  }, [current, total]);

  const activeProject =
    activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  const detailProject =
    detailProjectIndex !== null ? projects[detailProjectIndex] : null;

  const activeProjectTitle =
    activeProject &&
    (language === "es" ? activeProject.titleEs : activeProject.titleEn);

  const openGallery = (projectIndex: number) => {
    setActiveProjectIndex(projectIndex);
    setActiveImageIndex(0);
  };

  const closeGallery = () => {
    setActiveProjectIndex(null);
    setActiveImageIndex(0);
  };

  const openDetails = (projectIndex: number) => {
    setDetailProjectIndex(projectIndex);
  };

  const closeDetails = () => {
    setDetailProjectIndex(null);
  };

  const goToNextImage = () => {
    if (!activeProject?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const goToPrevImage = () => {
    if (!activeProject?.images?.length) return;
    setActiveImageIndex(
      (prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length
    );
  };

  useEffect(() => {
    if (activeProject || detailProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, detailProject]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeProject) {
        if (event.key === "Escape") closeGallery();
        if (event.key === "ArrowRight") goToNextImage();
        if (event.key === "ArrowLeft") goToPrevImage();
      }

      if (detailProject && event.key === "Escape") {
        closeDetails();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, detailProject]);

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

          <div className="mt-4 flex flex-col gap-5 md:mt-5 md:flex-row md:items-end md:justify-between">
            <div>
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

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={goPrev}
                aria-label={t.previous}
                className="game-button-secondary h-11 w-11 shrink-0 p-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                onClick={goNext}
                aria-label={t.next}
                className="game-button-secondary h-11 w-11 shrink-0 p-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 overflow-hidden sm:mt-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:gap-6"
              >
                {visibleProjects.map((project) => {
                  const realProjectIndex = projects.findIndex(
                    (item) => item.titleEn === project.titleEn
                  );

                  const title =
                    language === "es" ? project.titleEs : project.titleEn;

                  const description =
                    language === "es"
                      ? project.descriptionEs
                      : project.descriptionEn;

                  const previewImage =
                    project.images?.[0] ?? "/images/placeholder.png";

                  const slug =
                    (project as any).slug ?? slugify(project.titleEn);

                  const typeLabel = getProjectType(project, language);
                  const stackItems = splitStack(project.stack);
                  const showProjectPage = hasProjectPage(project);
                  const hasGallery = Boolean(project.images?.length);

                  return (
                    <motion.article
                      key={`${project.titleEn}-${current}`}
                      layout
                      className="rpg-window console-shell arcade-corners pixel-console overflow-hidden"
                    >
                      <div className="rpg-window__bar console-topbar">
                        <div className="rpg-window__title console-brand">
                          {t.panelTitle} #{String(realProjectIndex + 1).padStart(2, "0")}
                        </div>

                        <div className="rpg-window__dots console-leds">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 md:p-6">
                        <div className="space-y-4 sm:space-y-5">
                          <div className="game-screen retro-screen overflow-hidden rounded-[1.35rem]">
                            <button
                              type="button"
                              onClick={() => hasGallery && openGallery(realProjectIndex)}
                              className={`group relative block h-56 w-full overflow-hidden text-left sm:h-64 md:h-[18rem] ${
                                hasGallery ? "cursor-pointer" : "cursor-default"
                              }`}
                            >
                              <img
                                src={previewImage}
                                alt={title}
                                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                                loading="lazy"
                              />

                              <div className="absolute inset-0 bg-gradient-to-t from-[#09090f]/92 via-[#09090f]/35 to-transparent" />

                              <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">
                                <div className="pacman-row scale-90 sm:scale-100">
                                  <span className="pacman" />
                                  <span className="pacdot" />
                                  <span className="pacdot" />
                                  <span className="arcade-ghost arcade-ghost--blue" />
                                </div>
                              </div>

                              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-fuchsia-200/75 sm:text-[11px]">
                                      {t.preview}
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-base font-semibold text-white sm:text-lg">
                                      {title}
                                    </p>
                                  </div>

                                  {project.images && project.images.length > 1 && (
                                    <span className="game-chip">
                                      <ImageIcon className="h-3.5 w-3.5 text-fuchsia-200" />
                                      {project.images.length} {t.gallery}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </button>
                          </div>

                          <div className="game-screen console-screen p-4 sm:p-5">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                              <span className="game-chip">
                                <FolderOpen className="h-3.5 w-3.5 text-fuchsia-200" />
                                {t.projectLabel}
                              </span>

                              <span className="game-chip">{typeLabel}</span>

                              <span className="game-chip">
                                <Star className="h-3.5 w-3.5 text-fuchsia-200" />
                                {t.featured}
                              </span>
                            </div>

                            <h3 className="text-lg font-semibold text-white sm:text-xl">
                              {title}
                            </h3>

                            <p className="mt-3 text-left text-sm leading-7 text-slate-300">
                              {description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {stackItems.slice(0, 5).map((tech) => {
                                const TechIcon = getTechIcon(tech);

                                return (
                                  <span key={tech} className="game-chip">
                                    <TechIcon className="h-3.5 w-3.5 text-fuchsia-200" />
                                    {tech}
                                  </span>
                                );
                              })}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={() => openDetails(realProjectIndex)}
                                className="game-button-secondary"
                              >
                                <Code2 className="h-4 w-4" />
                                {t.details}
                              </button>

                              {hasGallery && (
                                <button
                                  type="button"
                                  onClick={() => openGallery(realProjectIndex)}
                                  className="game-button-secondary"
                                >
                                  <ImageIcon className="h-4 w-4" />
                                  {t.openGallery}
                                </button>
                              )}

                              {showProjectPage && (
                                <Link
                                  to={`/projects/${slug}`}
                                  className="game-button-secondary"
                                >
                                  <ArrowUpRight className="h-4 w-4" />
                                  {t.openPage}
                                </Link>
                              )}

                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="game-button-secondary"
                                >
                                  <Github className="h-4 w-4" />
                                  {t.github}
                                </a>
                              )}

                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="arcade-button retro-boost"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  {t.demo}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {projects.map((_, index) => {
              const isActive = index === current;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  aria-label={`Go to project ${index + 1}`}
                  className={`transition-all duration-300 ${
                    isActive
                      ? "h-3 w-10 rounded-full bg-gradient-to-r from-fuchsia-300 to-violet-300 shadow-[0_0_12px_rgba(244,114,182,0.35)]"
                      : "h-3 w-3 rounded-full bg-white/20 hover:bg-white/35"
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {detailProject && (
          <ProjectDetailModal
            project={detailProject}
            language={language}
            onClose={closeDetails}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeProject && activeProject.images?.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050a]/82 px-3 py-4 backdrop-blur-xl md:px-6 md:py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="rpg-window console-shell arcade-corners relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden"
            >
              <div className="rpg-window__bar console-topbar">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/75 md:text-xs">
                    {t.screenshots}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-white md:text-2xl">
                    {activeProjectTitle}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rpg-window__dots console-leds">
                    <span />
                    <span />
                    <span />
                  </div>

                  <button
                    onClick={closeGallery}
                    aria-label={t.close}
                    className="game-button-secondary h-11 w-11 shrink-0 p-0"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 p-3 sm:p-4 md:gap-5 md:p-6">
                <div className="game-screen retro-screen relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] px-2 py-3 sm:px-3 sm:py-4 md:px-6 md:py-6">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProject.images[activeImageIndex]}
                      src={activeProject.images[activeImageIndex]}
                      alt={`${activeProjectTitle} ${activeImageIndex + 1}`}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="relative z-10 mx-auto max-h-full w-auto max-w-full rounded-[1rem] border border-white/10 object-contain shadow-[0_14px_45px_rgba(0,0,0,0.35)] sm:rounded-[1.25rem]"
                    />
                  </AnimatePresence>

                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevImage}
                        aria-label={t.previous}
                        className="game-button-secondary absolute left-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 p-0 sm:left-3 md:left-5 md:h-11 md:w-11"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        onClick={goToNextImage}
                        aria-label={t.next}
                        className="game-button-secondary absolute right-2 top-1/2 z-20 h-10 w-10 -translate-y-1/2 p-0 sm:right-3 md:right-5 md:h-11 md:w-11"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {activeProject.images.length > 1 && (
                  <div className="game-card console-screen p-3 md:p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-fuchsia-200" />
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                          {t.thumbnails}
                        </p>
                      </div>

                      <div className="arcade-ghost arcade-ghost--violet" />
                    </div>

                    <div className="game-divider mb-4" />

                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {activeProject.images.map((image, index) => {
                        const isActive = index === activeImageIndex;

                        return (
                          <button
                            key={image}
                            onClick={() => setActiveImageIndex(index)}
                            className={`group relative shrink-0 overflow-hidden rounded-[1rem] border transition-all duration-300 ${
                              isActive
                                ? "border-fuchsia-300/40 shadow-[0_0_18px_rgba(244,114,182,0.16)]"
                                : "border-white/10 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${activeProjectTitle} thumbnail ${index + 1}`}
                              className="h-20 w-[68px] object-cover sm:h-24 sm:w-[74px] md:h-28 md:w-[84px]"
                              loading="lazy"
                            />
                            <div
                              className={`absolute inset-0 transition-all duration-300 ${
                                isActive
                                  ? "bg-fuchsia-400/10"
                                  : "bg-black/10 group-hover:bg-black/0"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectDetailModal({
  project,
  language,
  onClose,
}: {
  project: ProjectItem;
  language: Language;
  onClose: () => void;
}) {
  const t = content[language];

  const title = language === "es" ? project.titleEs : project.titleEn;
  const description =
    language === "es" ? project.descriptionEs : project.descriptionEn;

  const slug = (project as any).slug ?? slugify(project.titleEn);
  const stackItems = splitStack(project.stack);
  const typeLabel = getProjectType(project, language);
  const showProjectPage = hasProjectPage(project);

  const detailContent =
    (project as any).details?.[language] ?? getFallbackProjectDetails(project, language);

  const period = detailContent.period;

  return (
    <>
      <motion.button
        type="button"
        aria-label={t.close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[110] bg-[#05060c]/75 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-3 top-1/2 z-[120] max-h-[88vh] -translate-y-1/2 overflow-hidden rounded-[1.8rem] border border-fuchsia-300/15 bg-[#0b0914]/96 shadow-[0_24px_120px_rgba(0,0,0,0.48)] backdrop-blur-2xl sm:inset-x-6 lg:left-1/2 lg:w-[min(1120px,92vw)] lg:-translate-x-1/2"
      >
        <div className="flex max-h-[88vh] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 px-4 py-4 sm:px-5 md:px-6">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="game-chip">
                  <FolderOpen className="h-3.5 w-3.5 text-fuchsia-200" />
                  {typeLabel}
                </span>
                <span className="game-chip">
                  <CalendarDays className="h-3.5 w-3.5 text-violet-200" />
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
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/80">
                      {t.technicalView}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <DetailBlock
                      icon={Wrench}
                      title={t.whatSolved}
                      items={detailContent.solved}
                    />

                    <DetailBlock
                      icon={BrainCircuit}
                      title={t.learnings}
                      items={detailContent.learnings}
                    />

                    <DetailBlock
                      icon={Rocket}
                      title={t.approach}
                      items={detailContent.approach}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="game-card console-screen p-4">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                      {t.stack}
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
                      {t.status}
                    </p>
                    <Star className="h-4 w-4 text-fuchsia-200" />
                  </div>

                  <div className="game-divider my-3" />

                  <div className="flex flex-wrap gap-2">
                    <span className="game-chip">{t.active}</span>
                    <span className="game-chip">{t.portfolio}</span>
                    <span className="game-chip">{t.featured}</span>
                  </div>
                </div>

                {(showProjectPage || project.github || project.demo) && (
                  <div className="game-card console-screen p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                        Resources
                      </p>
                      <Code2 className="h-4 w-4 text-fuchsia-200" />
                    </div>

                    <div className="game-divider my-3" />

                    <div className="flex flex-col gap-3">
                      {showProjectPage && (
                        <Link
                          to={`/projects/${slug}`}
                          onClick={onClose}
                          className="game-button-secondary w-full justify-start"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                          {t.openPage}
                        </Link>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="game-button-secondary w-full justify-start"
                        >
                          <Github className="h-4 w-4" />
                          {t.github}
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="arcade-button retro-boost w-full justify-start"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t.demo}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {project.images?.[0] && (
                  <div className="game-card console-screen p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                        {t.preview}
                      </p>
                      <ImageIcon className="h-4 w-4 text-fuchsia-200" />
                    </div>

                    <div className="game-divider my-3" />

                    <img
                      src={project.images[0]}
                      alt={title}
                      className="h-48 w-full rounded-[1rem] border border-white/10 object-cover object-top sm:h-56"
                      loading="lazy"
                    />
                  </div>
                )}
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