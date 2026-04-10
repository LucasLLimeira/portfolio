"use client";

import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { useLocaleToggle } from "@/contexts/locale-context";
import { useTheme } from "@/contexts/theme-context";
import { getContent } from "@/lib/content";

const sectionOrder = ["home", "projects", "services", "education", "contact"] as const;

export function Header() {
  const { locale, toggleLocale } = useLocaleToggle();
  const { toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("home");

  const content = useMemo(() => getContent(locale), [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: 0.1,
      },
    );

    sectionOrder.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navMap = {
    home: content.profile.nav.home,
    projects: content.profile.nav.projects,
    services: content.profile.nav.services,
    education: content.profile.nav.education,
    contact: content.profile.nav.contact,
  };

  return (
    <header className="sticky top-0 z-40 border-b border-brand-200/50 bg-white/75 backdrop-blur-md dark:border-brand-500/20 dark:bg-slate-950/65">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 md:px-6">
        <a href="#home" className="text-sm font-black tracking-wide text-slate-950 dark:text-white">
          Lucas Limeira
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {sectionOrder.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                activeSection === section
                  ? "bg-brand-500 text-white dark:bg-brand-300 dark:text-slate-950"
                  : "border border-brand-300/70 bg-white/85 text-slate-800 hover:bg-brand-100 hover:text-brand-900 dark:border-brand-500/40 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {navMap[section]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-full border border-brand-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-brand-100 dark:border-brand-500/40 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="toggle language"
          >
            {locale === "pt" ? "PT" : "EN"}
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-brand-300 bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:bg-brand-100 dark:border-brand-500/40 dark:bg-slate-900/85 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="toggle theme"
          >
            <Moon className="h-4 w-4 dark:hidden" strokeWidth={2} />
            <Sun className="hidden h-4 w-4 dark:inline" strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
