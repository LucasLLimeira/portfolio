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

const GITHUB_API = "https://api.github.com/users/LucasLLimeira/repos";
const GITHUB_PROFILE = "https://github.com/LucasLLimeira";
const GITHUB_REPOSITORIES_TAB = "https://github.com/LucasLLimeira?tab=repositories";

function getGithubHeaders(): HeadersInit {
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
  const regex = /href="\/LucasLLimeira\/([^"\/?#]+)"/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const name = decodeURIComponent(match[1]);
    if (!name || names.includes(name)) continue;
    names.push(name);
  }

  return names;
}

function extractPinnedNames(profileHtml: string): string[] {
  const pinnedStart = profileHtml.indexOf("Pinned");
  const pinnedEnd = profileHtml.indexOf("Contribution activity");

  if (pinnedStart === -1 || pinnedEnd === -1 || pinnedEnd <= pinnedStart) return [];

  const pinnedChunk = profileHtml.slice(pinnedStart, pinnedEnd);
  return parseRepoNamesFromSection(pinnedChunk).slice(0, 3);
}

function extractRecentNames(repositoriesHtml: string): string[] {
  return parseRepoNamesFromSection(repositoriesHtml);
}

async function fetchHtmlGithubProjects(
  featuredRepoNames: string[],
  fallbackProjects: Project[],
  locale: Locale,
): Promise<Project[]> {
  const [profileResponse, repositoriesResponse] = await Promise.all([
    fetch(GITHUB_PROFILE, {
      cache: "no-store",
      headers: {
        "User-Agent": "portfolio-app",
      },
    }),
    fetch(GITHUB_REPOSITORIES_TAB, {
      cache: "no-store",
      headers: {
        "User-Agent": "portfolio-app",
      },
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

  return uniqueSelectedNames.map((repoName) => {
    const localMatch = fallbackProjects.find(
      (project) =>
        project.slug.toLowerCase() === repoName.toLowerCase() ||
        project.title.toLowerCase() === repoName.toLowerCase(),
    );

    return {
      slug: repoName,
      title: localMatch?.title ?? repoName,
      description:
        localMatch?.description ??
        (locale === "pt" ? "Projeto importado do GitHub." : "Project imported from GitHub."),
      tags: localMatch?.tags.length ? localMatch.tags : [],
      githubUrl: `https://github.com/LucasLLimeira/${repoName}`,
      demoUrl: localMatch?.demoUrl,
      image: localMatch?.image,
      isPinned: pinnedSlugSet.has(repoName.toLowerCase()),
    };
  });
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
      headers: getGithubHeaders(),
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
    const headers = getGithubHeaders();

    const response = await fetch(`${GITHUB_API}?sort=pushed&per_page=100`, {
      headers,
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

    const orderedPinned = featuredRepoNames
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
        headers,
      );

      const primaryLanguage = languagesBreakdown[0]?.language ?? repo.language ?? undefined;
      const primaryPercent = languagesBreakdown[0]?.percent;

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
        demoUrl: localMatch?.demoUrl ?? repo.homepage ?? undefined,
        image: localMatch?.image,
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
