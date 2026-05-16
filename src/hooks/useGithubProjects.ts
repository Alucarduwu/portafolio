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

export function useGithubProjects(language: "es" | "en") {
  const fallbackProjects = useMemo(() => toStaticProjects(language), [language]);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const isLoading = false;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function syncProjects() {
      setError(null);

      const currentVersion = "v30";
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

        const enriched = await githubService.getEnrichedProjects(language);
        const nextProjects = enriched && enriched.length > 0 ? enriched : fallbackProjects;

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
