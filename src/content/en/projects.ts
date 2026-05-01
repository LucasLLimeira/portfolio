import type { Project } from "@/types/content";

export const featuredRepoNames = ["Cadastro_usuario", "Ufood", "Diario_de_bordo"];

export const projects: Project[] = [
  {
    slug: "cadastro_usuario",
    title: "Cadastro_usuario",
    description:
      "Authentication and user registration web app with signup, login, and protected area flows.",
    tags: ["next.js", "react", "typescript", "zod", "react-hook-form", "api"],
    githubUrl: "https://github.com/LucasLLimeira/Cadastro_usuario",
    demoUrl: "",
    image: "",
  },
  {
    slug: "ufood",
    title: "Ufood",
    description:
      "Restaurant ordering app built with micro frontends and decoupled module communication.",
    tags: ["react", "webpack", "module-federation", "tailwind", "micro-frontends"],
    githubUrl: "https://github.com/LucasLLimeira/Ufood",
    demoUrl: "",
    image: "",
  },
  {
    slug: "diario_de_bordo",
    title: "Diario_de_bordo",
    description:
      "PWA for daily activity tracking with offline support, local persistence, and installable behavior.",
    tags: ["javascript", "pwa", "service-worker", "web-app-manifest", "localstorage"],
    githubUrl: "https://github.com/LucasLLimeira/Diario_de_bordo",
    demoUrl: "",
    image: "",
  },
];
