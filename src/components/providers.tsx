"use client";

import type { ReactNode } from "react";

import { LocaleProvider } from "@/contexts/locale-context";
import { ThemeProvider } from "@/contexts/theme-context";
import type { Locale } from "@/types/content";

type ProvidersProps = {
  children: ReactNode;
  initialLocale: Locale;
};

export function Providers({ children, initialLocale }: ProvidersProps) {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={initialLocale}>{children}</LocaleProvider>
    </ThemeProvider>
  );
}
