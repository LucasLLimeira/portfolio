import type { ProfileContent } from "@/types/content";

export const profile: ProfileContent = {
  name: "Lucas Limeira",
  title: "FullStack Developer",
  shortBio:
    "Early-career Full Stack developer creating complete web applications with React and Node.js, focusing on performance, usability, and best practices.",
  links: {
    githubUsername: "LucasLLimeira",
    linkedinUrl: "https://www.linkedin.com/in/lucas-de-lucena-limeira",
    email: "lucasdllimeira@gmail.com",
    whatsappNumber: "5583998760660",
    whatsappMessage: "Hello, I would like to talk about a project/proposal",
  },
  assets: {
    cvHref: "/cv-lucas-limeira.pdf",
    avatarAlt: "Lucas Limeira",
  },
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
  header: {
    localeToggleAria: "toggle language",
  },
  hero: {
    greeting: "Hi, I'm Lucas, Full Stack Developer.",
    ctaProjects: "View projects",
    ctaContact: "Contact",
    downloadCv: "Resume",
  },
  cvModal: {
    title: "Resume",
    closeAria: "close resume modal",
    previewFallback: "Unable to load PDF preview in this browser.",
    downloadCta: "Download resume",
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
      "I am a Full Stack Developer with a background in Civil Engineering, which gave me a solid foundation in logical reasoning, problem analysis, and process organization. I began my tech career developing practical projects to establish front-end fundamentals, evolving into building complete full stack applications.\n\nCurrently, I develop solutions using React on the frontend and Node.js, with a focus on API integration, best practices, and performance. I strive to create efficient, well-structured applications while maintaining continuous learning and growth as part of my process.",
    highlights: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "REST APIs",
    ],
  },
  projectsUi: {
    filterLabel: "Filter by technology",
    all: "All",
    viewRepo: "View repository",
    viewDemo: "View demo",
    noDemo: "No demo available",
    languagesLabel: "Languages",
    mostUsedTitle: "Most used languages",
    mostUsedSummary: "Summary of your top repository languages from GitHub.",
    pinnedTitle: "Pinned (Top 3)",
    recentTitle: "Recent",
    carouselPrevAria: "View previous cards",
    carouselNextAria: "View next cards",
    loadingRemote: "Syncing featured projects from GitHub...",
    showingFallback: "Showing local projects (fallback).",
  },
  contactCard: {
    kicker: "Direct Contact",
    title: "Let's build something big?",
    whatsappCta: "Send message",
    availability: "Available for new projects and collaborations",
  },
  projectModalUi: {
    previewLabel: "Preview",
    closeAria: "close modal",
    iframeFallback:
      "Some pages may block embedded preview. Use the button below to open it directly.",
    repoPreviewCaption: "Preview generated from the repository. Click to open on GitHub.",
    localPreviewCaption: "Local preview loaded from repository (public/previews folder).",
  },
  servicesIntro:
    "Complete web application development, from frontend to backend, with a focus on performance and quality.",
  contactText:
    "Ready to collaborate on new projects and partnerships, with focus on quality, performance, and clean code.",
  footerRights: "All rights reserved.",
};
