export type Locale = "pt" | "en";

export type Theme = "light" | "dark";

export type ProfileContent = {
  name: string;
  title: string;
  shortBio: string;
  links: {
    githubUsername: string;
    linkedinUrl: string;
    email: string;
    whatsappNumber: string;
    whatsappMessage: string;
  };
  assets: {
    cvHref: string;
    avatarAlt: string;
  };
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
  header: {
    localeToggleAria: string;
  };
  hero: {
    greeting: string;
    ctaProjects: string;
    ctaContact: string;
    downloadCv: string;
  };
  cvModal: {
    title: string;
    closeAria: string;
    previewFallback: string;
    downloadCta: string;
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
    languagesLabel: string;
    mostUsedTitle: string;
    mostUsedSummary: string;
    pinnedTitle: string;
    recentTitle: string;
    carouselPrevAria: string;
    carouselNextAria: string;
    loadingRemote: string;
    showingFallback: string;
  };
  contactCard: {
    kicker: string;
    title: string;
    whatsappCta: string;
    availability: string;
  };
  projectModalUi: {
    previewLabel: string;
    closeAria: string;
    iframeFallback: string;
    repoPreviewCaption: string;
    localPreviewCaption: string;
  };
  servicesIntro: string;
  contactText: string;
  footerRights: string;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  image?: string;
  previewVideo?: string;
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
  slug?: string;
  title: string;
  description?: string;
  institution: string;
  status: string;
  period?: string;
  certificateUrl?: string;
  image?: string;
  previewVideo?: string;
};
