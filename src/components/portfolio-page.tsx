"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { SectionTitle } from "@/components/section-title";
import { useLocale } from "@/contexts/locale-context";
import { getContent } from "@/lib/content";
import { fetchFeaturedGithubProjects } from "@/lib/github";
import type { Project } from "@/types/content";
import type { EducationItem, ServiceItem } from "@/types/content";

const githubUsername = "LucasLLimeira";

const whatsappMessage = encodeURIComponent(
  "Olá Quero entrar em contato para um projeto/proposta",
);
const whatsappUrl = `https://wa.me/5583998760660?text=${whatsappMessage}`;

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.1c-3.34.73-4.04-1.42-4.04-1.42a3.18 3.18 0 0 0-1.34-1.76c-1.1-.75.09-.73.09-.73a2.52 2.52 0 0 1 1.83 1.24 2.56 2.56 0 0 0 3.5 1 2.57 2.57 0 0 1 .76-1.6c-2.67-.3-5.47-1.34-5.47-5.95a4.67 4.67 0 0 1 1.24-3.24 4.35 4.35 0 0 1 .12-3.2s1-.33 3.3 1.24a11.42 11.42 0 0 1 6 0c2.3-1.57 3.3-1.24 3.3-1.24a4.35 4.35 0 0 1 .12 3.2 4.67 4.67 0 0 1 1.24 3.24c0 4.62-2.8 5.65-5.47 5.94a2.88 2.88 0 0 1 .82 2.23v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46 2.48 2.48 0 0 0 4.98 3.5M3 9h4v12H3zm7 0h3.84v1.64h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.2V21h-4v-5.56c0-1.33-.03-3.05-1.86-3.05-1.87 0-2.16 1.46-2.16 2.95V21h-4z" />
    </svg>
  );
}

export function PortfolioPage() {
  const { locale } = useLocale();
  const content = useMemo(() => getContent(locale), [locale]);

  const [projects, setProjects] = useState<Project[]>(content.projects);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [remoteLoading, setRemoteLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let mounted = true;

    const syncGithub = async () => {
      setRemoteLoading(true);
      const remoteProjects = await fetchFeaturedGithubProjects(
        content.featuredRepoNames,
        content.projects,
        locale,
      );

      if (!mounted) return;

      const fallbackUsed =
        remoteProjects.length === content.projects.length &&
        remoteProjects.every((project, index) => project.slug === content.projects[index]?.slug);

      setProjects(remoteProjects);
      setUsingFallback(fallbackUsed);
      setRemoteLoading(false);
      setActiveTag("all");
    };

    void syncGithub();

    return () => {
      mounted = false;
    };
  }, [content, locale]);

  const tags = useMemo(() => {
    const uniqueTags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        const normalized = tag.toLowerCase();
        if (normalized !== "github") uniqueTags.add(normalized);
      });
    });

    return ["all", ...Array.from(uniqueTags)];
  }, [projects]);

  const visibleProjects =
    activeTag === "all"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => tag.toLowerCase() === activeTag),
        );

  const pinnedProjects = visibleProjects.filter((project) => project.isPinned).slice(0, 3);
  const recentProjects = visibleProjects.filter((project) => !project.isPinned);

  useEffect(() => {
    document.title = content.profile.metadata.title;

    const updateMeta = (selector: string, value: string) => {
      const element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) element.content = value;
    };

    updateMeta('meta[name="description"]', content.profile.metadata.description);
    updateMeta('meta[property="og:title"]', content.profile.metadata.title);
    updateMeta('meta[property="og:description"]', content.profile.metadata.description);
    updateMeta('meta[name="twitter:title"]', content.profile.metadata.title);
    updateMeta('meta[name="twitter:description"]', content.profile.metadata.description);
  }, [content.profile.metadata.description, content.profile.metadata.title]);

  return (
    <>
      <Header />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-4 py-10 md:px-6 md:py-16">
        <section id="home" className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-700 dark:border-brand-500/40 dark:bg-slate-900 dark:text-brand-200">
              {content.profile.title}
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
              {content.profile.hero.greeting} <br /> {content.profile.name}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              {content.profile.shortBio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#projects">{content.profile.hero.ctaProjects}</Button>
              <Button href="#contact" variant="ghost">
                {content.profile.hero.ctaContact}
              </Button>
              <Button href="/cv-lucas-limeira.pdf" variant="ghost" target="_blank" rel="noreferrer">
                {content.profile.hero.downloadCv}
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-brand-700 dark:text-brand-200">
              <a
                href={`https://github.com/${githubUsername}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <GithubMark />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-de-lucena-limeira"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
              >
                <LinkedinMark />
              </a>
              <a
                href="mailto:lucasdllimeira@gmail.com"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xs rounded-3xl border border-brand-300/50 bg-linear-to-b from-brand-100 to-white p-3 shadow-xl dark:border-brand-500/35 dark:from-slate-900 dark:to-slate-950">
            <Image
              src="/avatar.jpg"
              alt="Lucas Limeira"
              width={400}
              height={500}
              className="h-80 w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        <section id="projects" className="space-y-6">
          <SectionTitle title={content.profile.sections.projects} subtitle={content.profile.projectsUi.filterLabel} />

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                label={tag === "all" ? content.profile.projectsUi.all : tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>

          {remoteLoading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {content.profile.projectsUi.loadingRemote}
            </p>
          ) : null}

          {!remoteLoading && usingFallback ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {content.profile.projectsUi.showingFallback}
            </p>
          ) : null}

          {pinnedProjects.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700 dark:text-brand-200">
                {locale === "pt" ? "Pinned (Top 3)" : "Pinned (Top 3)"}
              </p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pinnedProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} onOpen={setSelectedProject} locale={locale} />
                ))}
              </div>
            </div>
          ) : null}

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700 dark:text-brand-200">
              {locale === "pt" ? "Recentes" : "Recent"}
            </p>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {recentProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} onOpen={setSelectedProject} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="space-y-6">
          <SectionTitle title={content.profile.sections.services} subtitle={content.profile.servicesIntro} />
          <div className="grid gap-4 md:grid-cols-2">
            {content.services.map((service: ServiceItem) => (
              <article
                key={service.title}
                className="rounded-2xl border border-brand-200/80 bg-white/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg dark:border-brand-500/25 dark:bg-slate-900/70 dark:hover:border-brand-300/60"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-6">
          <SectionTitle title={content.profile.sections.education} />
          <div className="space-y-3">
            {content.education.map((item: EducationItem) => (
              <article
                key={item.title}
                className="rounded-2xl border border-brand-200/80 bg-white/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg dark:border-brand-500/25 dark:bg-slate-900/70 dark:hover:border-brand-300/60"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.institution}</p>
                <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-200">{item.status}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-6">
          <SectionTitle title={content.profile.sections.contact} subtitle={content.profile.contactText} />

          <div className="flex flex-wrap gap-3">
            <Button href={whatsappUrl} target="_blank" rel="noreferrer noopener">
              WhatsApp
            </Button>
            <Button
              href="https://www.linkedin.com/in/lucas-de-lucena-limeira"
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
            >
              LinkedIn
            </Button>
            <Button href="mailto:lucasdllimeira@gmail.com" variant="ghost">
              Email
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        viewDemoLabel={content.profile.projectsUi.viewDemo}
        noDemoLabel={content.profile.projectsUi.noDemo}
      />
    </>
  );
}
