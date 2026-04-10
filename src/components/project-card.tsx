import type { Project } from "@/types/content";
import { getLanguageColor } from "@/lib/language-colors";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
  locale: "pt" | "en";
};

function formatRelativeUpdated(value: string | undefined, locale: "pt" | "en") {
  if (!value) return null;

  const updatedAt = new Date(value).getTime();
  if (Number.isNaN(updatedAt)) return null;

  const diffMs = Date.now() - updatedAt;
  const minuteMs = 60 * 1000;
  const hourMs = 60 * minuteMs;
  const dayMs = 24 * hourMs;

  if (diffMs < hourMs) {
    const minutes = Math.max(1, Math.floor(diffMs / minuteMs));
    return locale === "pt"
      ? `Atualizado ha ${minutes} min`
      : `Updated ${minutes} min ago`;
  }

  if (diffMs < dayMs) {
    const hours = Math.max(1, Math.floor(diffMs / hourMs));
    return locale === "pt"
      ? `Atualizado ha ${hours} h`
      : `Updated ${hours} h ago`;
  }

  const days = Math.max(1, Math.floor(diffMs / dayMs));
  return locale === "pt"
    ? `Atualizado ha ${days} dia${days > 1 ? "s" : ""}`
    : `Updated ${days} day${days > 1 ? "s" : ""} ago`;
}

export function ProjectCard({ project, onOpen, locale }: ProjectCardProps) {
  const relativeUpdated = formatRelativeUpdated(project.updatedAt, locale);
  const languageBreakdown =
    project.languagesBreakdown && project.languagesBreakdown.length > 0
      ? project.languagesBreakdown
      : project.language
        ? [{ language: project.language, percent: project.languagePercent ?? 100 }]
        : [];

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group relative my-1 flex h-[390px] w-full flex-col rounded-2xl border border-brand-200/80 bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/18 hover:z-10 dark:border-brand-500/30 dark:bg-slate-900/70 dark:hover:border-brand-300/60 dark:hover:shadow-brand-500/16"
    >
      <div className="flex h-full flex-col">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
        <p className="mt-3 min-h-20 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
          {project.description}
        </p>

        {languageBreakdown.length > 0 ? (
          <div className="mt-5 rounded-xl border border-brand-200/70 bg-brand-50/70 p-3 dark:border-brand-500/25 dark:bg-slate-950/45">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-300">
              {locale === "pt" ? "Linguagens" : "Languages"}
            </p>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              {languageBreakdown.map((item, index) => (
                <span
                  key={item.language}
                  style={{
                    width: `${Math.max(4, item.percent)}%`,
                    backgroundColor: getLanguageColor(item.language, index),
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-300">
              {languageBreakdown.map((item, index) => (
                <span key={`${item.language}-label`} className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: getLanguageColor(item.language, index) }}
                  />
                  {item.language} {item.percent.toFixed(1)}%
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-auto pt-4">
          {languageBreakdown.length > 0 ? (
            <div className="h-px" />
          ) : null}

          {relativeUpdated || typeof project.stars === "number" || typeof project.forks === "number" ? (
            <div className="flex flex-wrap items-center justify-between gap-4 px-1 text-xs text-slate-500 dark:text-slate-400">
              {relativeUpdated ? <span className="font-medium">{relativeUpdated}</span> : <span />}
              <span className="inline-flex items-center gap-3">
                {typeof project.stars === "number" ? <span>★ {project.stars}</span> : null}
                {typeof project.forks === "number" ? <span>⑂ {project.forks}</span> : null}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </button>
  );
}
