import axios from "axios";
import { projects as staticProjectsData } from "../components/dataprojetcts/projects";

const GITHUB_USERNAME = "Alucarduwu";
const BASE_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_HEADERS: Record<string, string> = {
  "Accept": "application/vnd.github.v3.raw",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(GITHUB_TOKEN ? { "Authorization": `Bearer ${GITHUB_TOKEN}` } : {})
};

export const fetchAllRepos = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${BASE_URL}?sort=pushed&per_page=100`, {
      headers: GITHUB_HEADERS
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
      timeout: 10000,
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
  if (!readme || typeof readme !== 'string') return meta;
  
  try {
    // Auto-extract Title from first H1
    const h1Match = readme.match(/^#\s+(.*)/m);
    if (h1Match) {
      meta.title_auto = h1Match[1].replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
    }

    // Auto-extract first paragraph as description
    const lines_all = readme.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('<'));
    if (lines_all.length > 0) {
      meta.description_auto = lines_all[0];
    }

    // More flexible regex for the metadata section
    const sectionMatch = readme.match(/##?\s*PROJECT[_-]DATA([\s\S]*?)(?:\n---|\n#|\n##|$)/i);
    if (!sectionMatch) return meta;

    const lines = sectionMatch[1].split('\n');
    let currentKey = "";
    
    lines.forEach((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.includes(':') && !line.startsWith('  ')) {
        currentKey = trimmed.split(':')[0].trim().toLowerCase();
        const firstVal = trimmed.split(':').slice(1).join(':').trim();
        if (firstVal && currentKey === 'stack') meta.stack.push(...firstVal.replace(/[\[\]]/g, '').split(',').map(s => s.trim()));
        else if (firstVal) meta[currentKey] = firstVal;
      } 
      else if (trimmed.startsWith('en:') || trimmed.startsWith('es:')) {
        const lang = trimmed.startsWith('en:') ? 'en' : 'es';
        const val = trimmed.split(':').slice(1).join(':').trim();
        if (currentKey && val) meta[`${currentKey}_${lang}`] = val;
      }
      else if (trimmed.startsWith('-')) {
        const val = trimmed.substring(1).trim();
        if (currentKey === 'stack') meta.stack.push(val);
        if (currentKey === 'features') {
            let context = "en";
            for (let j = i - 1; j >= 0; j--) {
                const prevTrim = lines[j].trim();
                if (prevTrim.startsWith('es:')) { context = "es"; break; }
                if (prevTrim.startsWith('en:')) { context = "en"; break; }
            }
            if (context === "es") meta.features_es.push(val);
            else meta.features_en.push(val);
        }
      }
    });
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
      images: p.images || [],
      github: p.github || "",
      demo: p.demo || null,
      category: p.category || "completo",
      date: new Date().toISOString()
    }));
  }

  const filteredRepos = repos.filter((r: any) => !r.fork && r.name !== GITHUB_USERNAME);
  
  // With authenticated token: 5000 req/hr — fetch READMEs for all repos
  const enriched = await Promise.all(
    filteredRepos.map(async (repo) => {
      const readme = await fetchRepoReadme(repo.name);
      // Optimized construction of the enriched project object
      const staticMatch = staticProjectsData.find(sp => sp.github.toLowerCase().includes(repo.name.toLowerCase())) as any;
      const meta = readme ? parseProjectData(readme) : {};
      
      return {
        id: repo.id,
        title: (isEs ? meta.name_es || meta.title_es : meta.name_en || meta.title_en) || meta.title_auto || repo.name.replace(/[-_]/g, ' ').toUpperCase(),
        description: (isEs ? meta.description_es || staticMatch?.descriptionEs : meta.description_en || staticMatch?.descriptionEn) || meta.description_auto || repo.description || "",
        stack: meta.stack?.length ? meta.stack : (staticMatch?.stack?.split(' • ') || [repo.language].filter(Boolean)),
        images: meta.images?.length ? meta.images : (staticMatch?.images || []),
        github: repo.html_url,
        demo: meta.demo || repo.homepage || staticMatch?.demo || null,
        category: meta.category || staticMatch?.category || detectCategory(repo),
        problem: isEs ? (meta.problem_es || meta.problem || staticMatch?.problemEs) : (meta.problem_en || meta.problem || staticMatch?.problemEn),
        solution: isEs ? (meta.solution_es || meta.solution || staticMatch?.solutionEs) : (meta.solution_en || meta.solution || staticMatch?.solutionEn),
        features: isEs ? (meta.features_es.length ? meta.features_es : (staticMatch?.features_es || [])) : (meta.features_en.length ? meta.features_en : (staticMatch?.features_en || [])),
        architecture: isEs ? (meta.architecture_es || meta.architecture || staticMatch?.architectureEs) : (meta.architecture_en || meta.architecture || staticMatch?.architectureEn),
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
