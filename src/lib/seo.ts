import type { Metadata } from "next";

import type { Locale } from "@/types/content";

const seoByLocale: Record<Locale, { title: string; description: string }> = {
  pt: {
    title: "Lucas Limeira | Desenvolvedor FullStack",
    description:
      "Portfólio pessoal de Lucas Limeira com projetos, serviços, formação e contato.",
  },
  en: {
    title: "Lucas Limeira | FullStack Developer",
    description:
      "Lucas Limeira's personal portfolio with projects, services, education and contact.",
  },
};

export function getMetadataByLocale(locale: Locale): Metadata {
  const seo = seoByLocale[locale];

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: "website",
      siteName: "Lucas Limeira Portfolio",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Lucas Limeira Portfolio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
  };
}
