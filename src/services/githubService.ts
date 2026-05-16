import axios from "axios";
import YAML from "yaml";
import { projects as staticProjectsData } from "../components/dataprojetcts/projects";

const GITHUB_USERNAME = "Alucarduwu";
const BASE_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

const GITHUB_HEADERS: Record<string, string> = {
  "Accept": "application/vnd.github.v3.raw",
  "X-GitHub-Api-Version": "2022-11-28",
};

export const fetchAllRepos = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?sort=pushed&per_page=100`, {
      headers: GITHUB_HEADERS,
      timeout: 3500
    });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.warn("GitHub Rate Limit Hit. Showing cached/static data.");
    }
    return [];
  }
};

export const fetchRepoReadme = async (repoName: string): Promise<string | null> => {
  try {
    const response = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`, {
      headers: GITHUB_HEADERS,
      timeout: 4500,
      responseType: 'text'
    });
    return response.data;
  } catch (error) {
    console.warn(`Could not fetch README for ${repoName}`);
    return null;
  }
};

const parseProjectData = (readme: string) => {
  const meta: any = { features_es: [], features_en: [], stack: [] };
  if (!readme || typeof readme !== "string") return meta;

  try {
    const h1Match = readme.match(/^#\s+(.*)/m);
    if (h1Match) meta.title_auto = h1Match[1].replace(/[\u{1F300}-\u{1F9FF}]/gu, "").trim();

    const lines = readme
      .split("\n")
      .map(line => line.trim())
      .filter(line => line && !line.startsWith("#") && !line.startsWith("!") && !line.startsWith("<"));
    if (lines.length > 0) meta.description_auto = lines[0];

    const blockMatch = readme.match(/PROJECT[_-]DATA\s*\n([\s\S]*?)(?:\n---|\n#{1,6}\s|$)/i);
    if (!blockMatch) return meta;

    const parsed = YAML.parse(blockMatch[1]);
    if (!parsed || typeof parsed !== "object") return meta;

    const localizedKeys = [
      "name",
      "description",
      "problem",
      "solution",
      "architecture",
      "technical_challenges",
      "improvements",
      "learning",
      "status",
      "future",
    ];

    Object.entries(parsed as Record<string, any>).forEach(([rawKey, value]) => {
      const key = rawKey.toLowerCase();

      if (key === "features" && value && typeof value === "object" && !Array.isArray(value)) {
        meta.features_en = Array.isArray(value.en) ? value.en : [];
        meta.features_es = Array.isArray(value.es) ? value.es : [];
        return;
      }

      if (key === "stack") {
        meta.stack = Array.isArray(value)
          ? value
          : String(value || "").split(/[•,|]/).map(item => item.trim()).filter(Boolean);
        return;
      }

      if (key === "repo" || key === "demo" || key === "category") {
        meta[key] = value || "";
        return;
      }

      if (localizedKeys.includes(key) && value && typeof value === "object" && !Array.isArray(value)) {
        meta[`${key}_en`] = value.en || "";
        meta[`${key}_es`] = value.es || "";
        return;
      }

      meta[key] = value;
    });

    localizedKeys.forEach(key => {
      if (!meta[`${key}_es`] && meta[`${key}_en`]) meta[`${key}_es`] = meta[`${key}_en`];
      if (!meta[`${key}_en`] && meta[`${key}_es`]) meta[`${key}_en`] = meta[`${key}_es`];
    });

    if (meta.features_es.length === 0 && meta.features_en.length > 0) meta.features_es = [...meta.features_en];
    if (meta.features_en.length === 0 && meta.features_es.length > 0) meta.features_en = [...meta.features_es];
  } catch (e) {
    console.warn("Parse error", e);
  }

  return meta;
};

// Removed unused stripMarkdown function safely


export const getEnrichedProjects = async (lang: "es" | "en") => {
  const repos = await fetchAllRepos();
  const isEs = lang === 'es';

  if (!repos || repos.length === 0) {
    return staticProjectsData.map((p: any, idx) => ({
      ...p,
      id: `static-${idx}`,
      title: isEs ? (p.titleEs || p.title) : (p.titleEn || p.title),
      description: isEs ? (p.descriptionEs || p.description) : (p.descriptionEn || p.description),
      stack: p.stack ? (Array.isArray(p.stack) ? p.stack : p.stack.split(' • ')) : [],
      features: isEs ? (p.features_es || []) : (p.features_en || []),
      problem: isEs ? (p.problemEs || '') : (p.problemEn || ''),
      solution: isEs ? (p.solutionEs || '') : (p.solutionEn || ''),
      images: p.images || [],
      github: p.github || "",
      demo: p.demo || null,
      category: p.category || "completo",
      date: new Date().toISOString()
    }));
  }

  const filteredRepos = repos.filter((r: any) => !r.fork && r.name !== GITHUB_USERNAME);
  
  const enriched = await Promise.all(
    filteredRepos.map(async (repo) => {
      const staticMatch = staticProjectsData.find(sp => sp.github.toLowerCase().includes(repo.name.toLowerCase())) as any;
      const readme = await fetchRepoReadme(repo.name);
      const meta = readme ? parseProjectData(readme) : parseProjectData("");
      
      return {
        id: repo.id,
        title: (isEs ? meta.name_es || meta.title_es : meta.name_en || meta.title_en) || meta.title_auto || repo.name.replace(/[-_]/g, ' ').toUpperCase(),
        description: (isEs ? meta.description_es || staticMatch?.descriptionEs : meta.description_en || staticMatch?.descriptionEn) || meta.description_auto || repo.description || "",
        stack: meta.stack?.length ? meta.stack : (staticMatch?.stack?.split(' • ') || [repo.language].filter(Boolean)),
        images: meta.images?.length ? meta.images : (staticMatch?.images || []),
        github: repo.html_url,
        demo: (staticMatch?.demo && staticMatch.demo !== "") ? staticMatch.demo : (meta.demo || repo.homepage || null),
        category: meta.category || staticMatch?.category || detectCategory(repo),
        problem: isEs ? (meta.problem_es || meta.problem || staticMatch?.problemEs) : (meta.problem_en || meta.problem || staticMatch?.problemEn),
        solution: isEs ? (meta.solution_es || meta.solution || staticMatch?.solutionEs) : (meta.solution_en || meta.solution || staticMatch?.solutionEn),
        features: isEs ? (meta.features_es.length ? meta.features_es : (staticMatch?.features_es || [])) : (meta.features_en.length ? meta.features_en : (staticMatch?.features_en || [])),
        architecture: isEs ? (meta.architecture_es || meta.architecture || staticMatch?.architectureEs) : (meta.architecture_en || meta.architecture || staticMatch?.architectureEn),
        technical_challenges: isEs ? (meta.technical_challenges_es || meta.technical_challenges) : (meta.technical_challenges_en || meta.technical_challenges),
        improvements: isEs ? (meta.improvements_es || meta.improvements) : (meta.improvements_en || meta.improvements),
        learning: isEs ? (meta.learning_es || meta.learning) : (meta.learning_en || meta.learning),
        status: isEs ? (meta.status_es || meta.status) : (meta.status_en || meta.status),
        future: isEs ? (meta.future_es || meta.future) : (meta.future_en || meta.future),
        date: repo.pushed_at
      };
    })
  );

  return enriched.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const fetchOverallLanguages = async (): Promise<{ name: string; value: number }[]> => {
  try {
    const repos = await fetchAllRepos();
    if (!repos || repos.length === 0) return [];

    const languages: Record<string, number> = {};
    
    // Fetch languages for the top 15 most recently pushed repos to avoid rate issues
    const topRepos = repos.filter((r: any) => !r.fork).slice(0, 15);
    
    await Promise.all(
      topRepos.map(async (repo: any) => {
        try {
          const langResponse = await axios.get(repo.languages_url, { headers: GITHUB_HEADERS });
          for (const [lang, bytes] of Object.entries(langResponse.data)) {
            languages[lang] = (languages[lang] || 0) + (bytes as number);
          }
        } catch (e) {
          // Skip if language fetch fails
        }
      })
    );

    return Object.entries(languages)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  } catch (error) {
    console.error("Error fetching overall languages:", error);
    return [];
  }
};

const detectCategory = (repo: any) => {
  const name = repo.name.toLowerCase();
  const topics = repo.topics || [];
  if (name.includes('sap') || name.includes('abap')) return 'empresarial';
  if (topics.some((t: string) => ['android', 'kotlin', 'flutter', 'react-native', 'ios'].includes(t))) return 'mobile';
  if (topics.some((t: string) => ['react', 'web', 'frontend', 'website', 'astro'].includes(t))) return 'web';
  return 'completo';
};
