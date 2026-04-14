import { useState, useEffect } from "react";
import * as githubService from "../services/githubService";

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

export function useGithubProjects(language: "es" | "en") {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function syncProjects() {
      setIsLoading(true);
      setError(null);

      try {
        const currentVersion = 'v26';
        const cacheKey = `gh_optimized_${currentVersion}_${language}`;
        
        // 1. CLEANUP: Delete any other "gh_optimized" keys that are not this version
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('gh_optimized_') && !key.includes(currentVersion)) {
            localStorage.removeItem(key);
          }
        });

        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          // 15-minute refresh cycle (Production balance)
          if (Date.now() - timestamp < 15 * 60 * 1000) { 
            setProjects(data);
            setIsLoading(false);
            return;
          }
        }

        const enriched = await githubService.getEnrichedProjects(language);
        if (enriched && enriched.length > 0) {
          setProjects(enriched as Project[]);
          localStorage.setItem(cacheKey, JSON.stringify({ data: enriched, timestamp: Date.now() }));
        } else if (cached) {
          setProjects(JSON.parse(cached).data);
        }
      } catch (err) {
        setError("Error fetching projects");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    syncProjects();
  }, [language]);

  return { projects, isLoading, error };
}
