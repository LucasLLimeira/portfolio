import type { Project } from "@/types/content";

export const featuredRepoNames = ["Cadastro_usuario", "Ufood", "Diario_de_bordo"];

export const projects: Project[] = [
  {
    slug: "cadastro_usuario",
    title: "Cadastro_usuario",
    description:
      "Aplicação web de autenticação e cadastro com fluxo de registro, login e área protegida.",
    tags: ["next.js", "react", "typescript", "zod", "react-hook-form", "api"],
    githubUrl: "https://github.com/LucasLLimeira/Cadastro_usuario",
    demoUrl: "",
    image: "",
  },
  {
    slug: "ufood",
    title: "Ufood",
    description:
      "Aplicação de pedidos para restaurante com arquitetura de micro frontends e módulos desacoplados.",
    tags: ["react", "webpack", "module-federation", "tailwind", "micro-frontends"],
    githubUrl: "https://github.com/LucasLLimeira/Ufood",
    demoUrl: "",
    image: "",
  },
  {
    slug: "diario_de_bordo",
    title: "Diario_de_bordo",
    description:
      "PWA para registro de atividades diárias com suporte offline, persistência local e instalação no dispositivo.",
    tags: ["javascript", "pwa", "service-worker", "web-app-manifest", "localstorage"],
    githubUrl: "https://github.com/LucasLLimeira/Diario_de_bordo",
    demoUrl: "",
    image: "",
  },
];
