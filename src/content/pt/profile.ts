import type { ProfileContent } from "@/types/content";

export const profile: ProfileContent = {
  name: "Lucas Limeira",
  title: "Desenvolvedor FullStack",
  shortBio:
    "Desenvolvedor Full Stack em início de carreira, criando aplicações web completas com React, Node.js e foco em performance, usabilidade e boas práticas.",
  links: {
    githubUsername: "LucasLLimeira",
    linkedinUrl: "https://www.linkedin.com/in/lucas-de-lucena-limeira",
    email: "lucasdllimeira@gmail.com",
    whatsappNumber: "5583998760660",
    whatsappMessage: "Olá Quero entrar em contato para um projeto/proposta",
  },
  assets: {
    cvHref: "/cv-lucas-limeira.pdf",
    avatarAlt: "Lucas Limeira",
  },
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
  header: {
    localeToggleAria: "alternar idioma",
  },
  hero: {
    greeting: "Olá, eu sou Lucas, Desenvolvedor Full Stack.",
    ctaProjects: "Ver projetos",
    ctaContact: "Contato",
    downloadCv: "Currículo",
  },
  cvModal: {
    title: "Currículo",
    closeAria: "fechar modal de currículo",
    previewFallback: "Não foi possível carregar a pré-visualização do PDF neste navegador.",
    downloadCta: "Baixar currículo",
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
      "Sou Desenvolvedor Full Stack com formação em Engenharia Civil, o que me proporcionou uma base sólida em raciocínio lógico, análise de problemas e organização de processos. Iniciei minha trajetória na tecnologia desenvolvendo projetos práticos para consolidar fundamentos em front-end, evoluindo para a construção de aplicações full stack completas.\n\nAtualmente, desenvolvo soluções utilizando React no frontend e Node.js, com foco em integração de APIs, boas práticas e performance. Busco criar aplicações eficientes e bem estruturadas, mantendo sempre a evolução contínua e o aprendizado como parte do processo.",
    highlights: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "APIs REST",
    ],
  },
  projectsUi: {
    filterLabel: "Filtrar por tecnologia",
    all: "Todas",
    viewRepo: "Ver repositório",
    viewDemo: "Ver demo",
    noDemo: "Sem demo disponível",
    languagesLabel: "Linguagens",
    mostUsedTitle: "Linguagens mais usadas",
    mostUsedSummary: "Resumo das linguagens principais dos seus repositórios no GitHub.",
    pinnedTitle: "Pinned (Top 3)",
    recentTitle: "Recentes",
    carouselPrevAria: "Ver cards anteriores",
    carouselNextAria: "Ver próximos cards",
    loadingRemote: "Sincronizando projetos em destaque do GitHub...",
    showingFallback: "Exibindo projetos locais (fallback).",
  },
  contactCard: {
    kicker: "Contato Direto",
    title: "Vamos construir algo grande?",
    whatsappCta: "Enviar mensagem",
    availability: "Disponível para novos projetos e colaborações",
  },
  projectModalUi: {
    previewLabel: "Prévia",
    closeAria: "fechar modal",
    iframeFallback:
      "Algumas páginas podem bloquear visualização embutida. Abra no botão abaixo se necessário.",
    repoPreviewCaption: "Prévia gerada a partir do repositório. Clique para abrir no GitHub.",
    localPreviewCaption: "Prévia local carregada do repositório (pasta public/previews).",
  },
  servicesIntro:
    "Desenvolvimento de aplicações web completas, do frontend ao backend, com foco em performance e qualidade.",
  contactText:
    "Pronto para colaborar em novos projetos e parcerias, com foco em qualidade, performance e código limpo.",
  footerRights: "Todos os direitos reservados.",
};
