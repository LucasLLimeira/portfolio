import type { Locale, Project } from "@/types/content";

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

async function getPrimaryLanguagePercent(
  languagesUrl: string,
  language: string | null,
  headers: HeadersInit,
): Promise<number | undefined> {
  if (!language) return undefined;

  try {
    const response = await fetch(languagesUrl, { headers, cache: "no-store" });
    if (!response.ok) return undefined;

    const payload = (await response.json()) as Record<string, number>;
    const total = Object.values(payload).reduce((acc, value) => acc + value, 0);
    const primary = payload[language] ?? 0;

    if (!total || !primary) return undefined;

    return Math.round((primary / total) * 100);
  } catch {
    return undefined;
  }
}

export async function fetchFeaturedGithubProjects(
  featuredRepoNames: string[],
  fallbackProjects: Project[],
  locale: Locale,
): Promise<Project[]> {
  try {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const headers: HeadersInit = token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    const response = await fetch(GITHUB_API, {
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

    const featuredSet = new Set(featuredRepoNames.map((name) => name.toLowerCase()));

    const nonForkRepos = allRepos.filter((repo) => !repo.fork);

    const featuredMatches = nonForkRepos.filter((repo) => featuredSet.has(repo.name.toLowerCase()));

    const pinnedRepos =
      featuredMatches.length > 0
        ? featuredMatches.slice(0, 3)
        : [...nonForkRepos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3);

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

      const languagePercent = await getPrimaryLanguagePercent(
        repo.languages_url,
        repo.language,
        headers,
      );

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
              : repo.language
                ? [repo.language.toLowerCase()]
                : [],
        githubUrl: repo.html_url,
        demoUrl: localMatch?.demoUrl ?? repo.homepage ?? undefined,
        image: localMatch?.image,
        language: repo.language ?? undefined,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        updatedAt: repo.updated_at,
        languagePercent,
        isPinned: pinnedSlugSet.has(repo.name.toLowerCase()),
      };
    }),
    );

    return mappedProjects;
  } catch {
    return fallbackProjects;
  }
}
