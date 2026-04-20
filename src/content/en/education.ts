import type { EducationItem } from "@/types/content";

export const education: EducationItem[] = [
  {
    slug: "pos-graduacao-fullstack",
    title: "Postgraduate Program in Fullstack Development",
    description: "Specialization focused on application architecture, APIs, and modern development practices.",
    institution: "Specialization",
    status: "In progress",
    certificateUrl: "/certificates/pos-graduacao-fullstack.pdf",
  },
  {
    slug: "certificado-ebac-frontend",
    title: "EBAC Front-end Certificate",
    description: "Hands-on front-end training covering reusable components, responsiveness, and engineering best practices.",
    institution: "EBAC",
    status: "In progress",
    certificateUrl: "/certificates/certificado-ebac-frontend.pdf",
  },
  {
    slug: "certificado-ebac-backend",
    title: "EBAC Back-end Certificate",
    description: "Practical backend content with Node.js, API integration, and service-oriented implementation.",
    institution: "EBAC",
    status: "In progress",
    certificateUrl: "/certificates/certificado-ebac-backend.pdf",
  },
];
