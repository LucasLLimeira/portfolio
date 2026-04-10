type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-slate-100">
        {title}
      </h2>
      {subtitle ? <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
    </div>
  );
}
