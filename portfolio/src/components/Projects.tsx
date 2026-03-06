import { useEffect, useMemo, useState } from "react";
import { motion, type Variants, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { projects } from "../components/dataprojetcts/projects";
import type { Language } from "../App";

interface ProjectsProps {
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
  },
};

export default function Projects({ language }: ProjectsProps) {
  const t = content[language];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!activeProject) return;

      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") goToNextImage();
      if (event.key === "ArrowLeft") goToPrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject, activeImageIndex]);

  return (
    <section id="projects" className="py-16 md:py-24">
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

        <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            {t.title}
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label={t.previous}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-200 shadow-[0_0_18px_rgba(216,180,254,0.08)] backdrop-blur-md transition-all duration-300 hover:border-fuchsia-300/20 hover:bg-white/[0.08] hover:text-fuchsia-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={goNext}
              aria-label={t.next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-slate-200 shadow-[0_0_18px_rgba(216,180,254,0.08)] backdrop-blur-md transition-all duration-300 hover:border-fuchsia-300/20 hover:bg-white/[0.08] hover:text-fuchsia-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
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

                return (
                  <motion.article
                    key={`${project.titleEn}-${current}`}
                    layout
                    className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.05] shadow-[0_0_28px_rgba(216,180,254,0.10)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:shadow-[0_0_34px_rgba(244,114,182,0.14)]"
                  >
                    <button
                      type="button"
                      onClick={() => openGallery(realProjectIndex)}
                      className="relative block h-56 w-full overflow-hidden text-left"
                    >
                      <img
                        src={previewImage}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09090f]/90 via-[#09090f]/40 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <div className="flex items-end justify-between gap-3">
                          <div className="min-w-0">
                            <p className="line-clamp-1 text-lg font-semibold text-white">
                              {title}
                            </p>
                            <p className="mt-1 line-clamp-1 text-sm text-fuchsia-200/90">
                              {project.stack}
                            </p>
                          </div>

                          {project.images?.length > 1 && (
                            <span className="shrink-0 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                              {project.images.length} {t.gallery}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    <div className="p-6 pt-5">
                      <p className="text-sm leading-7 text-slate-300">
                        {description}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => openGallery(realProjectIndex)}
                          className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/20 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-200 transition-all duration-300 hover:border-fuchsia-300/35 hover:bg-fuchsia-500/15"
                        >
                          <Sparkles className="h-4 w-4" />
                          {t.openGallery}
                        </button>

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-fuchsia-300"
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
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition-colors hover:text-fuchsia-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                            {t.demo}
                          </a>
                        )}
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
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-8 bg-gradient-to-r from-fuchsia-300 to-violet-300 shadow-[0_0_12px_rgba(244,114,182,0.35)]"
                    : "w-2.5 bg-white/20 hover:bg-white/35"
                }`}
              />
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeProject && activeProject.images?.length > 0 && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05050a]/80 px-3 py-4 backdrop-blur-xl md:px-6 md:py-6"
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
              className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,11,18,0.96),rgba(7,7,14,0.98))] shadow-[0_0_60px_rgba(244,114,182,0.10)]"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7 md:py-5">
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-fuchsia-200/75 md:text-xs">
                    {t.screenshots}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-white md:text-2xl">
                    {activeProjectTitle}
                  </h3>
                </div>

                <button
                  onClick={closeGallery}
                  aria-label={t.close}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all duration-300 hover:border-fuchsia-300/20 hover:bg-white/[0.06] hover:text-fuchsia-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex min-h-0 flex-1 flex-col gap-4 p-4 md:gap-5 md:p-6">
                <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.07),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-3 py-4 md:px-6 md:py-6">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_55%)]" />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeProject.images[activeImageIndex]}
                      src={activeProject.images[activeImageIndex]}
                      alt={`${activeProjectTitle} ${activeImageIndex + 1}`}
                      variants={imageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="relative z-10 mx-auto max-h-full w-auto max-w-full rounded-[24px] border border-white/10 object-contain shadow-[0_14px_45px_rgba(0,0,0,0.35)]"
                    />
                  </AnimatePresence>

                  {activeProject.images.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevImage}
                        aria-label={t.previous}
                        className="absolute left-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#09090f]/75 text-slate-100 shadow-[0_0_18px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-fuchsia-300/20 hover:text-fuchsia-200 md:left-5"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <button
                        onClick={goToNextImage}
                        aria-label={t.next}
                        className="absolute right-3 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-[#09090f]/75 text-slate-100 shadow-[0_0_18px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:border-fuchsia-300/20 hover:text-fuchsia-200 md:right-5"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {activeProject.images.length > 1 && (
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-3 md:p-4">
                    <div className="flex gap-3 overflow-x-auto pb-1">
                      {activeProject.images.map((image, index) => {
                        const isActive = index === activeImageIndex;

                        return (
                          <button
                            key={image}
                            onClick={() => setActiveImageIndex(index)}
                            className={`group relative shrink-0 overflow-hidden rounded-[18px] border transition-all duration-300 ${
                              isActive
                                ? "border-fuchsia-300/40 shadow-[0_0_18px_rgba(244,114,182,0.16)]"
                                : "border-white/10 opacity-75 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${activeProjectTitle} thumbnail ${index + 1}`}
                              className="h-24 w-[74px] object-cover md:h-28 md:w-[84px]"
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
    </section>
  );
}