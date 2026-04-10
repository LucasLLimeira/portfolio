import type { Project } from "@/types/content";

export const featuredRepoNames = ["todo-list", "landing-page", "cadastro-de-usuario"];

export const projects: Project[] = [
  {
    slug: "todo-list",
    title: "Todo List (React)",
    description:
      "Aplicação de tarefas com foco em produtividade, organização por status e interface intuitiva.",
    tags: ["react", "typescript", "css"],
    githubUrl: "https://github.com/LucasLLimeira/todo-list",
    demoUrl: "",
    image: "",
  },
  {
    slug: "landing-page",
    title: "Landing Page (a construir)",
    description:
      "Landing page de conversão com design responsivo, copy orientada a resultado e boa performance.",
    tags: ["next.js", "tailwind", "seo"],
    githubUrl: "https://github.com/LucasLLimeira/landing-page",
    demoUrl: "",
    image: "",
  },
  {
    slug: "cadastro-de-usuario",
    title: "Cadastro de Usuário (a construir)",
    description:
      "Fluxo de cadastro com validações, feedback visual e base para integrações com APIs.",
    tags: ["next.js", "api", "forms"],
    githubUrl: "https://github.com/LucasLLimeira/cadastro-de-usuario",
    demoUrl: "",
    image: "",
  },
];
