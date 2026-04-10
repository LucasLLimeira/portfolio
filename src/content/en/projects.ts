import type { Project } from "@/types/content";

export const featuredRepoNames = [
  "ToDo-React-Avancado",
  "portfolio",
  "catalogo-livros-ts",
];

export const projects: Project[] = [
  {
    slug: "todo-list",
    title: "Todo List (React)",
    description:
      "Task management app focused on productivity, status organization, and intuitive UX.",
    tags: ["react", "typescript", "css"],
    githubUrl: "https://github.com/LucasLLimeira/todo-list",
    demoUrl: "",
    image: "",
  },
  {
    slug: "landing-page",
    title: "Landing Page (to be built)",
    description:
      "Conversion-oriented landing page with responsive design, focused copy, and strong performance.",
    tags: ["next.js", "tailwind", "seo"],
    githubUrl: "https://github.com/LucasLLimeira/landing-page",
    demoUrl: "",
    image: "",
  },
  {
    slug: "cadastro-de-usuario",
    title: "User Registration (to be built)",
    description:
      "User registration flow with validation, visual feedback, and API-ready foundations.",
    tags: ["next.js", "api", "forms"],
    githubUrl: "https://github.com/LucasLLimeira/cadastro-de-usuario",
    demoUrl: "",
    image: "",
  },
];
