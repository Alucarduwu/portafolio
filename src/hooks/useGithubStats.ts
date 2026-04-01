import { useState, useEffect } from "react";
import * as githubService from "../services/githubService";

export interface LanguageStat {
  name: string;
  value: number;
}

export function useGithubStats() {
  const [stats, setStats] = useState<LanguageStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await githubService.fetchOverallLanguages();
        setStats(data);
      } catch (error) {
        console.error("Hook Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  return { stats, isLoading };
}
