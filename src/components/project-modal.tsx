"use client";

import { useEffect } from "react";

import { Button } from "@/components/button";
import type { Project } from "@/types/content";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  viewDemoLabel: string;
  viewRepoLabel: string;
  noDemoLabel: string;
  previewLabel: string;
  closeAriaLabel: string;
  iframeFallbackLabel: string;
  repoPreviewCaption: string;
};

function getRepoPath(githubUrl?: string): string | null {
  if (!githubUrl) return null;

  try {
    const path = new URL(githubUrl).pathname;
    const match = path.match(/^\/([^/]+)\/([^/]+)/);
    return match ? `${match[1]}/${match[2]}` : null;
  } catch {
    return null;
  }
}

export function ProjectModal({
  project,
  onClose,
  viewDemoLabel,
  viewRepoLabel,
  noDemoLabel,
  previewLabel,
  closeAriaLabel,
  iframeFallbackLabel,
  repoPreviewCaption,
}: ProjectModalProps) {

  useEffect(() => {
    if (!project) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [project, onClose]);

  if (!project) return null;

  const repoPath = getRepoPath(project.githubUrl);
  const repoPreviewUrl = repoPath
    ? `https://opengraph.githubassets.com/portfolio-preview/${repoPath}`
    : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-brand-300/40 bg-white p-6 shadow-2xl dark:border-brand-500/40 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{project.title}</h3>
            <button
              type="button"
              aria-label={closeAriaLabel}
              onClick={onClose}
              className="rounded-full border border-brand-300 px-3 py-1 text-sm text-brand-700 hover:bg-brand-50 dark:border-brand-500/40 dark:text-brand-200 dark:hover:bg-slate-800"
            >
              x
            </button>
          </div>

          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {project.description}
          </p>

          {project.demoUrl ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
                {previewLabel}
              </p>
              <div className="relative overflow-hidden rounded-xl border border-brand-200/80 bg-slate-950 dark:border-brand-500/30">
                <div className="pointer-events-none aspect-video origin-top-left scale-[0.86]" style={{ width: "116.28%" }}>
                  <iframe
                    src={project.demoUrl}
                    title={`${project.title} preview`}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {iframeFallbackLabel}
              </p>
            </div>
          ) : repoPreviewUrl ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
                {previewLabel}
              </p>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="block overflow-hidden rounded-xl border border-brand-200/80 dark:border-brand-500/30"
              >
                <img
                  src={repoPreviewUrl}
                  alt={`${project.title} repository preview`}
                  loading="lazy"
                  className="h-auto w-full"
                />
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400">{repoPreviewCaption}</p>
            </div>
          ) : null}

          {project.language ? (
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
              <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-brand-700 dark:border-brand-500/30 dark:bg-slate-800 dark:text-brand-200">
                {project.language}
                {typeof project.languagePercent === "number" ? ` ${project.languagePercent.toFixed(1)}%` : ""}
              </span>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs text-brand-700 dark:border-brand-500/40 dark:bg-slate-800 dark:text-brand-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {project.demoUrl ? (
              <Button
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="ghost"
              >
                {viewDemoLabel}
              </Button>
            ) : project.githubUrl ? (
              <Button
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                variant="ghost"
              >
                {viewRepoLabel}
              </Button>
            ) : (
              <span className="inline-flex items-center rounded-full border border-dashed border-brand-300 px-4 text-xs text-slate-500 dark:border-brand-500/40 dark:text-slate-400">
                {noDemoLabel}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
