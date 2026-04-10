import { NextResponse } from "next/server";

import { getContent } from "@/lib/content";
import { fetchFeaturedGithubProjects, fetchGithubLanguageStats } from "@/lib/github";
import type { Locale } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const localeParam = searchParams.get("locale");
  const locale: Locale = localeParam === "en" ? "en" : "pt";

  const content = getContent(locale);

  const [projects, languageStats] = await Promise.all([
    fetchFeaturedGithubProjects(content.featuredRepoNames, content.projects, locale),
    fetchGithubLanguageStats(),
  ]);

  const fallbackUsed =
    projects.length === content.projects.length &&
    projects.every((project, index) => project.slug === content.projects[index]?.slug);

  return NextResponse.json({
    projects,
    languageStats,
    fallbackUsed,
  });
}
