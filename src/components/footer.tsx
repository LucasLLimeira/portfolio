"use client";

import { useLocale } from "@/contexts/locale-context";

export function Footer() {
  const { locale } = useLocale();
  const currentYear = new Date().getFullYear();

  const reservedRights =
    locale === "pt"
      ? `© ${currentYear} Lucas Limeira. Todos os direitos reservados.`
      : `© ${currentYear} Lucas Limeira. All rights reserved.`;

  return (
    <footer className="border-t border-brand-200/50 py-8 dark:border-brand-500/20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center text-sm text-slate-600 dark:text-slate-300 md:px-6">
        <p>{reservedRights}</p>
      </div>
    </footer>
  );
}
