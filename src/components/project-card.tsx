import type { Project } from "@/types/content";

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

  return (
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="group w-full rounded-2xl border border-brand-200/80 bg-white/80 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-brand-400 hover:shadow-lg dark:border-brand-500/30 dark:bg-slate-900/70 dark:hover:border-brand-300/60"
    >
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
        {relativeUpdated || typeof project.stars === "number" || typeof project.forks === "number" ? (
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {relativeUpdated ? <span>{relativeUpdated}</span> : null}
            {typeof project.stars === "number" ? <span>★ {project.stars}</span> : null}
            {typeof project.forks === "number" ? <span>⑂ {project.forks}</span> : null}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs text-brand-700 dark:border-brand-500/30 dark:bg-slate-800 dark:text-brand-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
