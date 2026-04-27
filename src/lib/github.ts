import type { LanguageStat, Locale, Project } from "@/types/content";

type GithubRepo = {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  updated_at: string;
  languages_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  fork: boolean;
};

const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || "LucasLLimeira";
const GITHUB_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_PROFILE = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_REPOSITORIES_TAB = `https://github.com/${GITHUB_USERNAME}?tab=repositories`;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getGithubApiHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "User-Agent": "portfolio-app",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  return {
    "User-Agent": "portfolio-app",
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function getGithubWebHeaders(): HeadersInit {
  return {
    "User-Agent": "portfolio-app",
    Accept: "text/html,application/xhtml+xml",
  };
}

function buildLanguageStats(languages: string[]): LanguageStat[] {
  const counter = new Map<string, number>();

  languages.forEach((language) => {
    if (!language) return;
    counter.set(language, (counter.get(language) ?? 0) + 1);
  });

  const total = Array.from(counter.values()).reduce((sum, value) => sum + value, 0);
  if (!total) return [];

  return Array.from(counter.entries())
    .map(([language, count]) => ({
      language,
      percent: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 5);
}

function parseRepoNamesFromSection(html: string): string[] {
  const names: string[] = [];
  const regex = new RegExp(`href="/${escapeRegExp(GITHUB_USERNAME)}/([^"/?#]+)"`, "g");
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const name = decodeURIComponent(match[1]);
    if (!name || names.includes(name)) continue;
    names.push(name);
  }

  return names;
}

function extractPinnedNames(profileHtml: string): string[] {
  const pinnedContainerMarker = "js-pinned-items-reorder-container";
  const pinnedContainerStart = profileHtml.indexOf(pinnedContainerMarker);

  if (pinnedContainerStart !== -1) {
    const containerChunk = profileHtml.slice(pinnedContainerStart, pinnedContainerStart + 25000);
    const names = parseRepoNamesFromSection(containerChunk).slice(0, 3);
    if (names.length > 0) return names;
  }

  const pinnedStart = profileHtml.indexOf("Pinned");
  const pinnedEnd = profileHtml.indexOf("Contribution activity");

  if (pinnedStart === -1 || pinnedEnd === -1 || pinnedEnd <= pinnedStart) return [];

  const pinnedChunk = profileHtml.slice(pinnedStart, pinnedEnd);
  return parseRepoNamesFromSection(pinnedChunk).slice(0, 3);
}

function extractRecentNames(repositoriesHtml: string): string[] {
  return parseRepoNamesFromSection(repositoriesHtml);
}

function extractRepoPrimaryLanguages(repositoriesHtml: string): Map<string, string> {
  const map = new Map<string, string>();
  const regex = new RegExp(
    `href="/${escapeRegExp(GITHUB_USERNAME)}/([^"/?#]+)"[\\s\\S]{0,2200}?itemprop="programmingLanguage"[^>]*>\\s*([^<]+)\\s*<`,
    "g",
  );

  let match: RegExpExecArray | null;
  while ((match = regex.exec(repositoriesHtml)) !== null) {
    const repoName = decodeURIComponent(match[1]).trim();
    const language = match[2]?.trim();
    if (!repoName || !language || map.has(repoName.toLowerCase())) continue;
    map.set(repoName.toLowerCase(), language);
  }

  return map;
}

function normalizeDemoUrl(value?: string | null): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function blocksIframeEmbedding(response: Response): boolean {
  const xFrameOptions = response.headers.get("x-frame-options")?.toLowerCase() ?? "";
  if (xFrameOptions.includes("deny") || xFrameOptions.includes("sameorigin")) {
    return true;
  }

  const csp = response.headers.get("content-security-policy")?.toLowerCase() ?? "";
  if (!csp.includes("frame-ancestors")) return false;

  return csp.includes("frame-ancestors 'none'") || csp.includes("frame-ancestors 'self'");
}

async function canUseDemoPreview(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const attempt = async (method: "HEAD" | "GET") =>
      fetch(url, {
        method,
        redirect: "follow",
        cache: "no-store",
        signal: controller.signal,
        headers: {
          "User-Agent": "portfolio-app",
        },
      });

    let response = await attempt("HEAD");
    if (response.status === 405 || response.status === 501) {
      response = await attempt("GET");
    }

    if (!response.ok) return false;
    if (blocksIframeEmbedding(response)) return false;

    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchRepoLanguageBreakdownByName(
  repoName: string,
  headers: HeadersInit,
): Promise<LanguageStat[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(repoName)}/languages`,
      {
        headers,
        cache: "no-store",
      },
    );

    if (!response.ok) return [];

    const payload = (await response.json()) as Record<string, number>;
    const total = Object.values(payload).reduce((acc, value) => acc + value, 0);
    if (!total) return [];

    return Object.entries(payload)
      .map(([language, bytes]) => ({
        language,
        percent: Math.round((bytes / total) * 1000) / 10,
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 4);
  } catch {
    return [];
  }
}

async function fetchHtmlGithubProjects(
  featuredRepoNames: string[],
  fallbackProjects: Project[],
  locale: Locale,
): Promise<Project[]> {
  const apiHeaders = getGithubApiHeaders();
  const webHeaders = getGithubWebHeaders();

  const [profileResponse, repositoriesResponse] = await Promise.all([
    fetch(GITHUB_PROFILE, {
      cache: "no-store",
      headers: webHeaders,
    }),
    fetch(GITHUB_REPOSITORIES_TAB, {
      cache: "no-store",
      headers: webHeaders,
    }),
  ]);

  if (!profileResponse.ok || !repositoriesResponse.ok) {
    throw new Error("GitHub HTML endpoints unavailable");
  }

  const [profileHtml, repositoriesHtml] = await Promise.all([
    profileResponse.text(),
    repositoriesResponse.text(),
  ]);

  const pinnedNames = extractPinnedNames(profileHtml);
  const recentNames = extractRecentNames(repositoriesHtml);
  const repoLanguageMap = extractRepoPrimaryLanguages(repositoriesHtml);

  const orderedPinned =
    pinnedNames.length > 0
      ? pinnedNames
      : featuredRepoNames;

  const pinnedSlugSet = new Set(orderedPinned.map((name) => name.toLowerCase()));
  const selectedNames = [
    ...orderedPinned.slice(0, 3),
    ...recentNames.filter((name) => !pinnedSlugSet.has(name.toLowerCase())).slice(0, 6),
  ];

  const uniqueSelectedNames = Array.from(new Set(selectedNames));

  if (uniqueSelectedNames.length === 0) return fallbackProjects;

  const mappedProjects = await Promise.all(
    uniqueSelectedNames.map(async (repoName) => {
    const localMatch = fallbackProjects.find(
      (project) =>
        project.slug.toLowerCase() === repoName.toLowerCase() ||
        project.title.toLowerCase() === repoName.toLowerCase(),
    );

      const primaryLanguageFromHtml = repoLanguageMap.get(repoName.toLowerCase());
      const apiLanguagesBreakdown = await fetchRepoLanguageBreakdownByName(repoName, apiHeaders);
      const languagesBreakdown =
        apiLanguagesBreakdown.length > 0
          ? apiLanguagesBreakdown
          : primaryLanguageFromHtml
            ? [{ language: primaryLanguageFromHtml, percent: 100 }]
            : [];

      const primaryLanguage = languagesBreakdown[0]?.language;
      const primaryPercent = languagesBreakdown[0]?.percent;
      const candidateDemoUrl = normalizeDemoUrl(localMatch?.demoUrl);
      const demoUrl =
        candidateDemoUrl && (await canUseDemoPreview(candidateDemoUrl))
          ? candidateDemoUrl
          : undefined;

      return {
        slug: repoName,
        title: localMatch?.title ?? repoName,
        description:
          localMatch?.description ??
          (locale === "pt" ? "Projeto importado do GitHub." : "Project imported from GitHub."),
        tags: localMatch?.tags.length ? localMatch.tags : [],
        githubUrl: `https://github.com/${GITHUB_USERNAME}/${repoName}`,
        demoUrl,
        image: localMatch?.image,
        previewVideo: localMatch?.previewVideo,
        language: primaryLanguage,
        languagePercent: primaryPercent,
        languagesBreakdown,
        isPinned: pinnedSlugSet.has(repoName.toLowerCase()),
      };
    }),
  );

  return mappedProjects;
}

function extractLanguagesFromRepositoriesHtml(repositoriesHtml: string): string[] {
  const matches = repositoriesHtml.matchAll(
    /itemprop="programmingLanguage"[^>]*>\s*([^<]+)\s*</g,
  );

  return Array.from(matches)
    .map((match) => match[1]?.trim())
    .filter((language): language is string => Boolean(language));
}

export async function fetchGithubLanguageStats(): Promise<LanguageStat[]> {
  try {
    const response = await fetch(`${GITHUB_API}?sort=pushed&per_page=100`, {
      headers: getGithubApiHeaders(),
      cache: "no-store",
    });

    if (!response.ok) throw new Error(`GitHub API status ${response.status}`);

    const repos = (await response.json()) as GithubRepo[];

    const primaryLanguages = repos
      .filter((repo) => !repo.private && !repo.fork && repo.language)
      .map((repo) => repo.language as string);

    return buildLanguageStats(primaryLanguages);
  } catch {
    try {
      const repositoriesResponse = await fetch(GITHUB_REPOSITORIES_TAB, {
        cache: "no-store",
        headers: {
          "User-Agent": "portfolio-app",
        },
      });

      if (!repositoriesResponse.ok) return [];

      const repositoriesHtml = await repositoriesResponse.text();
      const languages = extractLanguagesFromRepositoriesHtml(repositoriesHtml);
      return buildLanguageStats(languages);
    } catch {
      return [];
    }
  }
}

async function getRepoLanguageBreakdown(
  languagesUrl: string,
  headers: HeadersInit,
): Promise<LanguageStat[]> {
  try {
    const response = await fetch(languagesUrl, { headers, cache: "no-store" });
    if (!response.ok) return [];

    const payload = (await response.json()) as Record<string, number>;
    const total = Object.values(payload).reduce((acc, value) => acc + value, 0);
    if (!total) return [];

    return Object.entries(payload)
      .map(([language, bytes]) => ({
        language,
        percent: Math.round((bytes / total) * 1000) / 10,
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 4);
  } catch {
    return [];
  }
}

export async function fetchFeaturedGithubProjects(
  featuredRepoNames: string[],
  fallbackProjects: Project[],
  locale: Locale,
): Promise<Project[]> {
  try {
    const apiHeaders = getGithubApiHeaders();
    const webHeaders = getGithubWebHeaders();

    const response = await fetch(`${GITHUB_API}?sort=pushed&per_page=100`, {
      headers: apiHeaders,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`GitHub API status ${response.status}`);
    }

    const allRepos = ((await response.json()) as GithubRepo[])
      .filter((repo) => !repo.private)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
      );

    const nonForkRepos = allRepos.filter((repo) => !repo.fork);
    const repoMap = new Map(
      nonForkRepos.map((repo) => [repo.name.toLowerCase(), repo] as const),
    );

    let pinnedNamesFromProfile: string[] = [];
    try {
      const profileResponse = await fetch(GITHUB_PROFILE, {
        cache: "no-store",
        headers: webHeaders,
      });

      if (profileResponse.ok) {
        const profileHtml = await profileResponse.text();
        pinnedNamesFromProfile = extractPinnedNames(profileHtml);
      }
    } catch {
      pinnedNamesFromProfile = [];
    }

    const selectedPinnedNames =
      pinnedNamesFromProfile.length > 0
        ? pinnedNamesFromProfile
        : featuredRepoNames;

    const orderedPinned = selectedPinnedNames
      .map((name) => repoMap.get(name.toLowerCase()))
      .filter((repo): repo is GithubRepo => Boolean(repo));

    const pinnedRepos = orderedPinned.slice(0, 3);

    const pinnedSlugSet = new Set(pinnedRepos.map((repo) => repo.name.toLowerCase()));

    const recentRepos = nonForkRepos
      .filter((repo) => !pinnedSlugSet.has(repo.name.toLowerCase()))
      .slice(0, 6);

    const selectedRepos = [...pinnedRepos, ...recentRepos];

    if (selectedRepos.length === 0) {
      return fallbackProjects;
    }

    const mappedProjects = await Promise.all(
      selectedRepos.map(async (repo) => {
      const localMatch = fallbackProjects.find(
        (project) =>
          project.slug.toLowerCase() === repo.name.toLowerCase() ||
          project.title.toLowerCase() === repo.name.toLowerCase(),
      );

      const languagesBreakdown = await getRepoLanguageBreakdown(
        repo.languages_url,
        apiHeaders,
      );

      const primaryLanguage = languagesBreakdown[0]?.language ?? repo.language ?? undefined;
      const primaryPercent = languagesBreakdown[0]?.percent;
      const candidateDemoUrl = normalizeDemoUrl(localMatch?.demoUrl || repo.homepage || undefined);
      const demoUrl =
        candidateDemoUrl && (await canUseDemoPreview(candidateDemoUrl))
          ? candidateDemoUrl
          : undefined;

      return {
        slug: repo.name,
        title: localMatch?.title ?? repo.name,
        description:
          localMatch?.description ??
          repo.description ??
          (locale === "pt"
            ? "Projeto importado do GitHub."
            : "Project imported from GitHub."),
        tags:
          localMatch?.tags.length
            ? localMatch.tags
            : repo.topics.length
              ? repo.topics.filter((topic) => topic.toLowerCase() !== "github").slice(0, 4)
              : [],
        githubUrl: repo.html_url,
        demoUrl,
        image: localMatch?.image,
        previewVideo: localMatch?.previewVideo,
        language: primaryLanguage,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        languagePercent: primaryPercent,
        languagesBreakdown,
        isPinned: pinnedSlugSet.has(repo.name.toLowerCase()),
      };
    }),
    );

    return mappedProjects;
  } catch {
    try {
      return await fetchHtmlGithubProjects(featuredRepoNames, fallbackProjects, locale);
    } catch {
      return fallbackProjects;
    }
  }
}
