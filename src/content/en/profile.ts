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
    about: "About",
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
    about: "About",
    projects: "Projects",
    services: "Services",
    education: "Education & certificates",
    contact: "Contact",
  },
  about: {
    kicker: "About me",
    title: "My journey",
    description:
      "I started by building practical projects to strengthen my front-end foundation and gradually evolved into fullstack application development focused on real delivery. Today, I combine user experience, performance, and clean code structure to turn ideas into useful and well-crafted products.",
    highlights: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
    ],
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
