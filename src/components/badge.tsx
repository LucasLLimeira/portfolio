type BadgeProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function Badge({ label, active = false, onClick }: BadgeProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        active
          ? "border-brand-500 bg-brand-500 text-white dark:border-brand-300 dark:bg-brand-300 dark:text-slate-950"
          : "border-brand-300 bg-brand-50 text-brand-700 hover:border-brand-400 hover:bg-brand-100 dark:border-brand-400 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );
}
