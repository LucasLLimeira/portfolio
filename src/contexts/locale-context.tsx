"use client";

import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { detectLocaleFromNavigator, isLocale, LOCALE_COOKIE } from "@/lib/locale";
import type { Locale } from "@/types/content";

type LocaleContextValue = {
  locale: Locale;
  setLocale: Dispatch<SetStateAction<Locale>>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

type LocaleProviderProps = {
  children: ReactNode;
  initialLocale: Locale;
};

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") return initialLocale;
    const stored = localStorage.getItem(LOCALE_COOKIE);
    return isLocale(stored) ? stored : detectLocaleFromNavigator();
  });

  useEffect(() => {
    localStorage.setItem(LOCALE_COOKIE, locale);
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}

export function useLocaleToggle() {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale((prev) => (prev === "pt" ? "en" : "pt"));
  };

  return { locale, toggleLocale, setLocale };
}
