import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const getContentMock = vi.fn();
const fetchFeaturedGithubProjectsMock = vi.fn();
const fetchGithubLanguageStatsMock = vi.fn();

vi.mock("@/lib/content", () => ({
  getContent: (...args: unknown[]) => getContentMock(...args),
}));

vi.mock("@/lib/github", () => ({
  fetchFeaturedGithubProjects: (...args: unknown[]) => fetchFeaturedGithubProjectsMock(...args),
  fetchGithubLanguageStats: (...args: unknown[]) => fetchGithubLanguageStatsMock(...args),
}));

describe("GET /api/github-data", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns GitHub-backed projects for english locale", async () => {
    const content = {
      featuredRepoNames: ["portfolio"],
      projects: [{ slug: "fallback-project" }],
    };
    const projects = [{ slug: "portfolio", title: "Portfolio", githubUrl: "https://github.com/LucasLLimeira/portfolio" }];
    const languageStats = [{ language: "TypeScript", percent: 100 }];

    getContentMock.mockReturnValue(content);
    fetchFeaturedGithubProjectsMock.mockResolvedValue(projects);
    fetchGithubLanguageStatsMock.mockResolvedValue(languageStats);

    const response = await GET(new Request("http://localhost/api/github-data?locale=en"));
    const payload = await response.json();

    expect(getContentMock).toHaveBeenCalledWith("en");
    expect(fetchFeaturedGithubProjectsMock).toHaveBeenCalledWith(content.featuredRepoNames, content.projects, "en");
    expect(payload.projects).toEqual(projects);
    expect(payload.languageStats).toEqual(languageStats);
    expect(payload.fallbackUsed).toBe(false);
  });

  it("marks fallbackUsed when response matches local fallback projects", async () => {
    const fallbackProjects = [{ slug: "todo-list" }, { slug: "landing-page" }];
    const content = {
      featuredRepoNames: ["portfolio"],
      projects: fallbackProjects,
    };

    getContentMock.mockReturnValue(content);
    fetchFeaturedGithubProjectsMock.mockResolvedValue(fallbackProjects);
    fetchGithubLanguageStatsMock.mockResolvedValue([]);

    const response = await GET(new Request("http://localhost/api/github-data"));
    const payload = await response.json();

    expect(getContentMock).toHaveBeenCalledWith("pt");
    expect(payload.fallbackUsed).toBe(true);
  });
});
