import type { ProfileContent } from "@/types/content";

export const profile: ProfileContent = {
  name: "Lucas Limeira",
  title: "Desenvolvedor FullStack",
  shortBio:
    "Construo interfaces modernas e aplicações web escaláveis com foco em performance, experiência do usuário e código limpo.",
  metadata: {
    title: "Lucas Limeira | Desenvolvedor FullStack",
    description:
      "Portfólio de Lucas Limeira com projetos, serviços, formação e contatos.",
  },
  nav: {
    home: "Início",
    about: "Sobre",
    projects: "Projetos",
    services: "Serviços",
    education: "Formação",
    contact: "Contato",
  },
  hero: {
    greeting: "Olá, eu sou Lucas.",
    ctaProjects: "Ver projetos",
    ctaContact: "Contato",
    downloadCv: "Baixar CV",
  },
  sections: {
    about: "Sobre",
    projects: "Projetos",
    services: "Serviços",
    education: "Formação e certificados",
    contact: "Contato",
  },
  about: {
    kicker: "Sobre mim",
    title: "Minha trajetoria",
    description:
      "Comecei desenvolvendo projetos práticos para consolidar base em front-end e, com o tempo, evoluí para aplicações fullstack com foco em entrega real. Hoje trabalho unindo experiência de usuário, performance e organização de código para transformar ideias em produtos úteis e bem construídos.",
    highlights: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
    ],
  },
  projectsUi: {
    filterLabel: "Filtrar por tecnologia",
    all: "Todas",
    viewRepo: "Ver repositório",
    viewDemo: "Ver demo",
    noDemo: "Sem demo disponível",
    loadingRemote: "Sincronizando projetos em destaque do GitHub...",
    showingFallback: "Exibindo projetos locais (fallback).",
  },
  servicesIntro:
    "Soluções práticas para lançar produtos digitais com velocidade e qualidade.",
  contactText:
    "Vamos conversar sobre seu próximo produto, melhoria técnica ou proposta de parceria.",
  footerText: "Feito por Lucas Limeira.",
};
