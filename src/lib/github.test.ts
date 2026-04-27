import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchFeaturedGithubProjects } from "./github";
import type { Project } from "@/types/content";

describe("fetchFeaturedGithubProjects", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  const fallbackProjects: Project[] = [
    {
      slug: "portfolio",
      title: "Portfolio",
      description: "Local description",
      tags: ["next.js"],
      githubUrl: "https://github.com/LucasLLimeira/portfolio",
      demoUrl: "",
    },
  ];

  const repoPayload = [
    {
      name: "portfolio",
      html_url: "https://github.com/LucasLLimeira/portfolio",
      description: "Remote description",
      pushed_at: "2026-04-22T00:00:00.000Z",
      updated_at: "2026-04-22T00:00:00.000Z",
      languages_url: "https://api.github.com/repos/LucasLLimeira/portfolio/languages",
      homepage: "https://portfolio.vercel.app",
      topics: ["nextjs", "github"],
      language: "TypeScript",
      stargazers_count: 3,
      forks_count: 1,
      private: false,
      fork: false,
    },
  ];

  it("removes demoUrl when deploy preview is unavailable", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => repoPayload } as Response)
      .mockResolvedValueOnce({ ok: true, text: async () => "" } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ TypeScript: 100 }) } as Response)
      .mockResolvedValueOnce({ ok: false, status: 404, headers: new Headers() } as Response);

    const projects = await fetchFeaturedGithubProjects(["portfolio"], fallbackProjects, "en");

    expect(projects[0]?.demoUrl).toBeUndefined();
    expect(projects[0]?.description).toBe("Local description");
  });

  it("keeps demoUrl when deploy preview is available", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => repoPayload } as Response)
      .mockResolvedValueOnce({ ok: true, text: async () => "" } as Response)
      .mockResolvedValueOnce({ ok: true, json: async () => ({ TypeScript: 100 }) } as Response)
      .mockResolvedValueOnce({ ok: true, status: 200, headers: new Headers() } as Response);

    const projects = await fetchFeaturedGithubProjects(["portfolio"], fallbackProjects, "en");

    expect(projects[0]?.demoUrl).toBe("https://portfolio.vercel.app");
    expect(projects[0]?.githubUrl).toBe("https://github.com/LucasLLimeira/portfolio");
  });
});
