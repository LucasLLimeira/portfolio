"use client";

import { useMemo } from "react";

import { useLocale } from "@/contexts/locale-context";
import { getContent } from "@/lib/content";

export function Footer() {
  const { locale } = useLocale();
  const content = useMemo(() => getContent(locale), [locale]);

  return (
    <footer className="border-t border-brand-200/50 py-8 dark:border-brand-500/20">
      <div className="mx-auto w-full max-w-6xl px-4 text-center text-sm text-slate-600 dark:text-slate-300 md:px-6">
        {content.profile.footerText}
      </div>
    </footer>
  );
}
