export type Locale = "pt" | "en";

export type Theme = "light" | "dark";

export type ProfileContent = {
  name: string;
  title: string;
  shortBio: string;
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    projects: string;
    services: string;
    education: string;
    contact: string;
  };
  hero: {
    greeting: string;
    ctaProjects: string;
    ctaContact: string;
    downloadCv: string;
  };
  sections: {
    about: string;
    projects: string;
    services: string;
    education: string;
    contact: string;
  };
  about: {
    kicker: string;
    title: string;
    description: string;
    highlights: string[];
  };
  projectsUi: {
    filterLabel: string;
    all: string;
    viewRepo: string;
    viewDemo: string;
    noDemo: string;
    loadingRemote: string;
    showingFallback: string;
  };
  servicesIntro: string;
  contactText: string;
  footerText: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  language?: string;
  stars?: number;
  forks?: number;
  updatedAt?: string;
  languagePercent?: number;
  languagesBreakdown?: LanguageStat[];
  isPinned?: boolean;
};

export type LanguageStat = {
  language: string;
  percent: number;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type EducationItem = {
  title: string;
  institution: string;
  status: string;
  period?: string;
};
