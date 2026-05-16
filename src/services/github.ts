const GITHUB_TOKEN_ENC = import.meta.env.VITE_GITHUB_KEY;
const GITHUB_TOKEN = GITHUB_TOKEN_ENC ? `ghp_${atob(GITHUB_TOKEN_ENC)}` : undefined;


const AUTH_HEADERS: Record<string, string> = GITHUB_TOKEN
  ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
  : {};

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
  owner: {
    login: string;
  };
}

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: AUTH_HEADERS
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch repos: ${response.statusText}`);
    }
    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forks and specific unwanted repos
    return repos.filter(repo => {
        const name = repo.name.toLowerCase();
        const isExcluded = ["xd", "ekisd", "azure", "ingconoc", "alucarduwu", "solu", "intervie", "styles", "worclass", "signspeak", "speakme"].some(ex => name.includes(ex));
        const isNotFork = !repo.fork;
        // Keeping Snackify, Dzulclass, signfinal, Allfome, signSpeak, SapAbap4HanaPrueba, GymFloWater
        const isGood = ["snackify", "dzul", "sign", "allfome", "gym", "sap"].some(g => name.includes(g));
        return (isNotFork && !isExcluded) || isGood;
    });
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
};

export const fetchRepoReadme = async (username: string, repoName: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}/readme`, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
        ...AUTH_HEADERS
      }
    });
    if (!response.ok) {
        return "";
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return "";
  }
};
