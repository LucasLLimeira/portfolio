import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { cookies, headers } from "next/headers";

import { BackgroundParticles } from "@/components/background-particles";
import { Providers } from "@/components/providers";
import { DEFAULT_LOCALE, detectLocaleFromHeader, isLocale, LOCALE_COOKIE } from "@/lib/locale";
import { getMetadataByLocale } from "@/lib/seo";
import type { Locale } from "@/types/content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

function resolveLocaleFromRequest(cookieValue: string | undefined, acceptLanguage: string | null): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return detectLocaleFromHeader(acceptLanguage);
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const locale = resolveLocaleFromRequest(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headersStore.get("accept-language"),
  );

  return {
    metadataBase: new URL("https://lucas-limeira-portfolio.vercel.app"),
    ...getMetadataByLocale(locale),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const initialLocale = resolveLocaleFromRequest(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headersStore.get("accept-language"),
  );

  return (
    <html
      lang={initialLocale ?? DEFAULT_LOCALE}
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-app text-foreground">
        <BackgroundParticles />
        <Providers initialLocale={initialLocale}>{children}</Providers>
      </body>
    </html>
  );
}
