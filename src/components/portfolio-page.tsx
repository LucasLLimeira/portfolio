"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Mail, MessageCircle } from "lucide-react";

import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { CvModal } from "@/components/cv-modal";
import { EducationModal } from "@/components/education-modal";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { SectionTitle } from "@/components/section-title";
import { useLocale } from "@/contexts/locale-context";
import { getContent } from "@/lib/content";
import { getLanguageColor } from "@/lib/language-colors";
import type { LanguageStat, Project } from "@/types/content";
import type { EducationItem, ServiceItem } from "@/types/content";

function getProjectFilterTerms(project: Project) {
  const terms = new Set<string>();

  project.tags.forEach((tag) => terms.add(tag.toLowerCase()));

  project.languagesBreakdown?.forEach((item) => {
    terms.add(item.language.toLowerCase());
  });

  if (project.language) terms.add(project.language.toLowerCase());

  ["github", "pythin"].forEach((blocked) => {
    terms.delete(blocked);
  });

  return Array.from(terms);
}

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

type ProjectsCarouselProps = {
  title: string;
  projects: Project[];
  locale: "pt" | "en";
  languagesLabel: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  showArrows?: boolean;
  onOpen: (project: Project) => void;
};

function ProjectsCarousel({
  title,
  projects,
  locale,
  languagesLabel,
  prevAriaLabel,
  nextAriaLabel,
  showArrows = true,
  onOpen,
}: ProjectsCarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slide = (direction: "prev" | "next") => {
    const node = trackRef.current;
    if (!node) return;

    const distance = Math.max(260, Math.floor(node.clientWidth * 0.85));
    node.scrollBy({
      left: direction === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-3" data-reveal>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-700 dark:text-brand-200">
        {title}
      </p>

      <div className={showArrows ? "relative pt-12 md:pt-0" : "relative"}>
        {showArrows ? (
          <div className="pointer-events-none absolute right-1 top-0 z-20 flex items-center gap-2 md:left-0 md:right-0 md:top-1/2 md:-translate-y-1/2 md:justify-between">
            <button
              type="button"
              onClick={() => slide("prev")}
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-300 bg-white/90 text-slate-900 shadow-md transition hover:bg-brand-100 md:h-10 md:w-10 dark:border-brand-500/40 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label={prevAriaLabel}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => slide("next")}
              className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-300 bg-white/90 text-slate-900 shadow-md transition hover:bg-brand-100 md:h-10 md:w-10 dark:border-brand-500/40 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
              aria-label={nextAriaLabel}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        <div ref={trackRef} className="carousel-track">
          {projects.map((project) => (
            <div key={project.slug} className="carousel-item">
              <ProjectCard
                project={project}
                onOpen={onOpen}
                locale={locale}
                languagesLabel={languagesLabel}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export function PortfolioPage() {
  const { locale } = useLocale();
  const content = useMemo(() => getContent(locale), [locale]);
  const whatsappMessage = encodeURIComponent(content.profile.links.whatsappMessage);
  const whatsappUrl = `https://wa.me/${content.profile.links.whatsappNumber}?text=${whatsappMessage}`;

  const [projects, setProjects] = useState<Project[]>(content.projects);
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEducation, setSelectedEducation] = useState<EducationItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [remoteLoading, setRemoteLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [languageStats, setLanguageStats] = useState<LanguageStat[]>([]);

  useEffect(() => {
    let mounted = true;

    const syncGithub = async () => {
      setRemoteLoading(true);
      const response = await fetch(`/api/github-data?locale=${locale}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        setProjects(content.projects);
        setUsingFallback(true);
        setLanguageStats([]);
        setRemoteLoading(false);
        setActiveTag("all");
        return;
      }

      const payload = (await response.json()) as {
        projects: Project[];
        languageStats: LanguageStat[];
        fallbackUsed: boolean;
      };

      if (!mounted) return;

      setProjects(payload.projects);
      setUsingFallback(payload.fallbackUsed);
      setLanguageStats(payload.languageStats);
      setRemoteLoading(false);
      setActiveTag("all");
    };

    void syncGithub();

    return () => {
      mounted = false;
    };
  }, [content, locale]);

  const FILTER_TAGS = ["all", "python", "typescript", "css", "html", "javascript", "jupyter notebook"];

  const pinnedProjects = projects.filter((project) => project.isPinned).slice(0, 3);

  const recentProjects = useMemo(() => {
    const nonPinned = projects.filter((project) => !project.isPinned);
    if (activeTag === "all") return nonPinned;
    return nonPinned.filter((project) => getProjectFilterTerms(project).includes(activeTag));
  }, [projects, activeTag]);

  const languageDonut = useMemo(() => {
    if (languageStats.length === 0) return "";

    let cursor = 0;
    const segments = languageStats.map((item, index) => {
      const start = cursor;
      const end = cursor + item.percent;
      cursor = end;
      return `${getLanguageColor(item.language, index)} ${start}% ${end}%`;
    });

    if (cursor < 100) {
      segments.push(`#334155 ${cursor}% 100%`);
    }

    return `conic-gradient(${segments.join(", ")})`;
  }, [languageStats]);

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

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [projects, locale]);

  return (
    <>
      <Header />

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-20 px-4 py-10 md:px-6 md:py-16">
        <section id="home" className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
          <div className="space-y-6" data-reveal>
            <span className="inline-flex rounded-full border border-brand-300 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-700 dark:border-brand-500/40 dark:bg-slate-900 dark:text-brand-200">
              {content.profile.title}
            </span>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
              {content.profile.hero.greeting} <br/>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg dark:text-slate-300">
              {content.profile.shortBio}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="#projects">{content.profile.hero.ctaProjects}</Button>
              <Button href="#contact" variant="ghost">
                {content.profile.hero.ctaContact}
              </Button>
              <Button variant="ghost" onClick={() => setIsCvModalOpen(true)}>
                {content.profile.hero.downloadCv}
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-brand-700 dark:text-brand-200">
              <a
                href={`https://github.com/${content.profile.links.githubUsername}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
              >
                <GithubMark />
              </a>
              <a
                href={content.profile.links.linkedinUrl}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
              >
                <LinkedinMark />
              </a>
              <a
                href={`mailto:${content.profile.links.email}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-400 bg-white/90 text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-100 hover:shadow-md dark:border-brand-400 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </div>

          <div
            className="mx-auto flex h-72 w-72 items-center justify-center rounded-full border border-brand-300/60 bg-linear-to-b from-brand-100 to-white p-3 shadow-xl dark:border-brand-500/35 dark:from-slate-900 dark:to-slate-950"
            data-reveal
          >
            <Image
              src="/avatar.jpg"
              alt={content.profile.assets.avatarAlt}
              loading="eager"
              width={400}
              height={400}
              className="h-full w-full rounded-full object-cover object-[center_38%]"
            />
          </div>
        </section>

        <section id="about" className="space-y-6" data-reveal>
          <article className="rounded-3xl border border-brand-200/80 bg-white/85 p-6 shadow-sm dark:border-brand-500/25 dark:bg-slate-900/70 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-200">
              {content.profile.about.kicker}
            </p>
            <h3 className="mt-2 max-w-3xl text-2xl font-bold text-slate-950 dark:text-slate-100 md:text-3xl">
              {content.profile.about.title}
            </h3>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
              {content.profile.about.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {content.profile.about.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-brand-300/80 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-500/35 dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-700/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section id="projects" className="space-y-6" data-reveal>
          <SectionTitle title={content.profile.sections.projects} subtitle={content.profile.projectsUi.filterLabel} />

          {languageStats.length > 0 ? (
            <article className="rounded-3xl border border-brand-200/80 bg-white/80 p-5 shadow-sm dark:border-brand-500/25 dark:bg-slate-900/70 md:p-7">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-700 dark:text-brand-200">
                {content.profile.projectsUi.mostUsedTitle}
              </h3>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                {content.profile.projectsUi.mostUsedSummary}
              </p>
              <div className="mt-6 grid items-center gap-6 md:grid-cols-[220px_1fr]">
                <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full p-4" style={{ background: languageDonut }}>
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-white text-center dark:bg-slate-950">
                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                      {languageStats[0]?.percent.toFixed(1)}%
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                      {languageStats[0]?.language}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {languageStats.map((stat, index) => (
                    <div key={stat.language} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-300">
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: getLanguageColor(stat.language, index) }}
                          />
                          {stat.language}
                        </span>
                        <span>{stat.percent.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(5, stat.percent)}%`,
                            backgroundColor: getLanguageColor(stat.language, index),
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ) : null}

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
            <ProjectsCarousel
              title={content.profile.projectsUi.pinnedTitle}
              projects={pinnedProjects}
              locale={locale}
              languagesLabel={content.profile.projectsUi.languagesLabel}
              prevAriaLabel={content.profile.projectsUi.carouselPrevAria}
              nextAriaLabel={content.profile.projectsUi.carouselNextAria}
              showArrows={false}
              onOpen={setSelectedProject}
            />
          ) : null}

          <div className="flex flex-wrap gap-2">
            {FILTER_TAGS.map((tag) => (
              <Badge
                key={tag}
                label={tag === "all" ? content.profile.projectsUi.all : tag}
                active={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>

          <ProjectsCarousel
            title={content.profile.projectsUi.recentTitle}
            projects={recentProjects}
            locale={locale}
            languagesLabel={content.profile.projectsUi.languagesLabel}
            prevAriaLabel={content.profile.projectsUi.carouselPrevAria}
            nextAriaLabel={content.profile.projectsUi.carouselNextAria}
            onOpen={setSelectedProject}
          />
        </section>

        <section id="services" className="space-y-6" data-reveal>
          <SectionTitle title={content.profile.sections.services} subtitle={content.profile.servicesIntro} />
          <div className="grid gap-4 md:grid-cols-2">
            {content.services.map((service: ServiceItem) => (
              <article
                key={service.title}
                className="rounded-2xl border border-brand-200/80 bg-white/80 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-500/25 dark:border-brand-500/25 dark:bg-slate-900/70 dark:hover:border-brand-300/60 dark:hover:shadow-brand-500/20"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="space-y-6" data-reveal>
          <SectionTitle title={content.profile.sections.education} />
          <div className="space-y-3">
            {content.education.map((item: EducationItem) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedEducation(item)}
                className="w-full rounded-2xl border border-brand-200/80 bg-white/80 p-5 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-2xl hover:shadow-brand-500/25 dark:border-brand-500/25 dark:bg-slate-900/70 dark:hover:border-brand-300/60 dark:hover:shadow-brand-500/20"
              >
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.institution}</p>
                <p className="mt-1 text-sm font-medium text-brand-700 dark:text-brand-200">{item.status}</p>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-6" data-reveal>
          <SectionTitle title={content.profile.sections.contact} />

          <div className="rounded-3xl border border-brand-300/45 bg-linear-to-r from-slate-950/96 via-[#06153a]/94 to-[#07233f]/92 p-7 shadow-xl shadow-brand-500/10 md:p-10 dark:border-brand-500/35">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200/90">
              {content.profile.contactCard.kicker}
            </p>
            <h3 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              {content.profile.contactCard.title}
            </h3>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-200/90">
              {content.profile.contactText}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="gap-2 px-5 py-2.5 text-sm"
              >
                <MessageCircle className="h-4 w-4" />
                {content.profile.contactCard.whatsappCta}
              </Button>
              <Button
                href={`mailto:${content.profile.links.email}`}
                variant="ghost"
                className="border-brand-300/40 bg-transparent px-4 py-2 text-xs text-slate-100 hover:bg-white/10 dark:border-brand-300/35"
              >
                Email
              </Button>
              <span className="text-sm text-slate-300/85">
                {content.profile.contactCard.availability}
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        viewDemoLabel={content.profile.projectsUi.viewDemo}
        viewRepoLabel={content.profile.projectsUi.viewRepo}
        noDemoLabel={content.profile.projectsUi.noDemo}
        previewLabel={content.profile.projectModalUi.previewLabel}
        closeAriaLabel={content.profile.projectModalUi.closeAria}
        iframeFallbackLabel={content.profile.projectModalUi.iframeFallback}
        repoPreviewCaption={content.profile.projectModalUi.repoPreviewCaption}
      />

      <EducationModal
        education={selectedEducation}
        onClose={() => setSelectedEducation(null)}
        locale={locale}
      />

      <CvModal
        isOpen={isCvModalOpen}
        cvHref={content.profile.assets.cvHref}
        title={content.profile.cvModal.title}
        closeAria={content.profile.cvModal.closeAria}
        previewFallback={content.profile.cvModal.previewFallback}
        downloadCta={content.profile.cvModal.downloadCta}
        onClose={() => setIsCvModalOpen(false)}
      />
    </>
  );
}
