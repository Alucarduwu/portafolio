import { useState, useEffect, useMemo } from "react";
import * as githubService from "../services/githubService";
import { projects as staticProjectsData } from "../components/dataprojetcts/projects";

export interface Project {
  id: string | number;
  title: string;
  description: string;
  stack: string[];
  images: string[];
  github: string;
  demo: string | null;
  category?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  technical_challenges?: string;
  improvements?: string;
  learning?: string;
  status?: string;
  future?: string;
  date?: string;
}

const toStaticProjects = (language: "es" | "en"): Project[] => {
  const isEs = language === "es";

  return staticProjectsData.map((p: any, idx) => ({
    ...p,
    id: `static-${idx}`,
    title: isEs ? (p.titleEs || p.title) : (p.titleEn || p.title),
    description: isEs ? (p.descriptionEs || p.description) : (p.descriptionEn || p.description),
    stack: p.stack ? (Array.isArray(p.stack) ? p.stack : p.stack.split(" • ")) : [],
    features: isEs ? (p.features_es || []) : (p.features_en || []),
    problem: isEs ? (p.problemEs || "") : (p.problemEn || ""),
    solution: isEs ? (p.solutionEs || "") : (p.solutionEn || ""),
    images: p.images || [],
    github: p.github || "",
    demo: p.demo || null,
    category: p.category || "completo",
    date: new Date().toISOString()
  }));
};

const mergeProjects = (baseProjects: Project[], remoteProjects: Project[]) => {
  const byGithub = new Map<string, Project>();

  [...baseProjects, ...remoteProjects].forEach((project) => {
    const key = project.github?.toLowerCase() || String(project.id);
    const existing = byGithub.get(key);
    byGithub.set(key, {
      ...existing,
      ...project,
      images: project.images?.length ? project.images : existing?.images || [],
      description: project.description || existing?.description || "",
      stack: project.stack?.length ? project.stack : existing?.stack || [],
      features: project.features?.length ? project.features : existing?.features || [],
    });
  });

  return Array.from(byGithub.values()).sort((a, b) => {
    const aTime = a.date ? new Date(a.date).getTime() : 0;
    const bTime = b.date ? new Date(b.date).getTime() : 0;
    return bTime - aTime;
  });
};

export function useGithubProjects(language: "es" | "en") {
  const fallbackProjects = useMemo(() => toStaticProjects(language), [language]);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const isLoading = false;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function syncProjects() {
      setError(null);

      const currentVersion = "v31";
      const cacheKey = `gh_optimized_${currentVersion}_${language}`;

      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith("gh_optimized_") && !key.includes(currentVersion)) {
            localStorage.removeItem(key);
          }
        });

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);

          if (Array.isArray(data) && data.length > 0 && Date.now() - timestamp < 15 * 60 * 1000) {
            if (!cancelled) setProjects(data);
            return;
          }
        }

        const remoteProjects = await githubService.getEnrichedProjects(language);
        const nextProjects = remoteProjects && remoteProjects.length > 0
          ? mergeProjects(fallbackProjects, remoteProjects as Project[])
          : fallbackProjects;

        if (!cancelled) setProjects(nextProjects as Project[]);
        localStorage.setItem(cacheKey, JSON.stringify({ data: nextProjects, timestamp: Date.now() }));
      } catch (err) {
        setError("Error fetching projects");
        console.error(err);
      }
    }

    setProjects(fallbackProjects);
    syncProjects();

    return () => {
      cancelled = true;
    };
  }, [fallbackProjects, language]);

  return { projects, isLoading, error };
}
