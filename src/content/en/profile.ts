import type { ProfileContent } from "@/types/content";

export const profile: ProfileContent = {
  name: "Lucas Limeira",
  title: "FullStack Developer",
  shortBio:
    "I build modern interfaces and scalable web applications focused on performance, user experience, and clean code.",
  metadata: {
    title: "Lucas Limeira | FullStack Developer",
    description:
      "Lucas Limeira's portfolio with projects, services, education, and contact links.",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    services: "Services",
    education: "Education",
    contact: "Contact",
  },
  hero: {
    greeting: "Hi, I'm Lucas.",
    ctaProjects: "View projects",
    ctaContact: "Contact",
    downloadCv: "Download CV",
  },
  sections: {
    projects: "Projects",
    services: "Services",
    education: "Education & certificates",
    contact: "Contact",
  },
  projectsUi: {
    filterLabel: "Filter by technology",
    all: "All",
    viewRepo: "View repository",
    viewDemo: "View demo",
    noDemo: "No demo available",
    loadingRemote: "Syncing featured projects from GitHub...",
    showingFallback: "Showing local projects (fallback).",
  },
  servicesIntro:
    "Practical solutions to launch digital products quickly with quality.",
  contactText:
    "Let's talk about your next product, technical improvements, or partnership opportunities.",
  footerText: "Built by Lucas Limeira.",
};
