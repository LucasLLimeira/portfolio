import { education as educationEn } from "@/content/en/education";
import { profile as profileEn } from "@/content/en/profile";
import { projects as projectsEn, featuredRepoNames as featuredReposEn } from "@/content/en/projects";
import { services as servicesEn } from "@/content/en/services";
import { education as educationPt } from "@/content/pt/education";
import { profile as profilePt } from "@/content/pt/profile";
import { projects as projectsPt, featuredRepoNames as featuredReposPt } from "@/content/pt/projects";
import { services as servicesPt } from "@/content/pt/services";
import type { Locale } from "@/types/content";

export const contentByLocale = {
  pt: {
    profile: profilePt,
    projects: projectsPt,
    services: servicesPt,
    education: educationPt,
    featuredRepoNames: featuredReposPt,
  },
  en: {
    profile: profileEn,
    projects: projectsEn,
    services: servicesEn,
    education: educationEn,
    featuredRepoNames: featuredReposEn,
  },
};

export function getContent(locale: Locale) {
  return contentByLocale[locale];
}
