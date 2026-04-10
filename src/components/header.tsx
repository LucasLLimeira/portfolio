"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";

import { useLocaleToggle } from "@/contexts/locale-context";
import { getContent } from "@/lib/content";

const sectionOrder = ["home", "about", "projects", "services", "education", "contact"] as const;

export function Header() {
  const { locale, toggleLocale } = useLocaleToggle();
  const [activeSection, setActiveSection] = useState<string>("home");

  const content = useMemo(() => getContent(locale), [locale]);

  useEffect(() => {
    const updateActiveSection = () => {
      const nav = document.querySelector<HTMLElement>("header[data-app-nav='true']");
      const navHeight = nav?.offsetHeight ?? 72;
      const focusLine = Math.max(navHeight + 24, window.innerHeight * 0.34);

      let current: string = sectionOrder[0];
      let crossedAny = false;

      for (const id of sectionOrder) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        // Keep the active section aligned with the title area the user is currently reading.
        if (rect.top <= focusLine) {
          current = id;
          crossedAny = true;
        }
      }

      if (!crossedAny) {
        current = sectionOrder[0];
      }

      const nearPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (nearPageBottom) {
        current = sectionOrder[sectionOrder.length - 1];
      }

      setActiveSection(current);
    };

    updateActiveSection();
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const scrollToSection = (section: string, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const element = document.getElementById(section);
    if (!element) return;

    const nav = document.querySelector<HTMLElement>("header[data-app-nav='true']");
    const navHeight = nav?.offsetHeight ?? 72;
    const top = element.getBoundingClientRect().top + window.scrollY - (navHeight + 18);

    window.history.replaceState(null, "", `#${section}`);
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(section);
  };

  const navMap = {
    home: content.profile.nav.home,
    about: content.profile.nav.about,
    projects: content.profile.nav.projects,
    services: content.profile.nav.services,
    education: content.profile.nav.education,
    contact: content.profile.nav.contact,
  };

  return (
    <header data-app-nav="true" className="sticky top-3 z-40 px-4 md:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex items-center justify-between gap-2 rounded-full border border-brand-200/60 bg-white/80 px-4 py-3 shadow-lg shadow-brand-500/10 backdrop-blur-md dark:border-brand-500/25 dark:bg-slate-950/70">
        <a href="#home" className="text-sm font-black tracking-wide text-slate-950 dark:text-white">
          Lucas Limeira
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {sectionOrder.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(event) => scrollToSection(section, event)}
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
        </div>
        </div>
      </div>
    </header>
  );
}
