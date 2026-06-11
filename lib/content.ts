import companyEn from "@/content/company.en.json";
import companyAr from "@/content/company.ar.json";
import businessesEn from "@/content/businesses.en.json";
import businessesAr from "@/content/businesses.ar.json";
import projectsEn from "@/content/projects.en.json";
import projectsAr from "@/content/projects.ar.json";
import galleryEn from "@/content/gallery.en.json";
import galleryAr from "@/content/gallery.ar.json";
import insightsEn from "@/content/insights.en.json";
import insightsAr from "@/content/insights.ar.json";
import contactsEn from "@/content/contacts.en.json";
import contactsAr from "@/content/contacts.ar.json";
import machineryEn from "@/content/machinery.en.json";
import machineryAr from "@/content/machinery.ar.json";
import type { Business, CompanyContent, Contacts, GalleryItem, Insight, Locale, Machine, Project } from "@/types/content";

const company = { en: companyEn, ar: companyAr } as Record<Locale, CompanyContent>;
const businesses = { en: businessesEn, ar: businessesAr } as Record<Locale, Business[]>;
const projects = { en: projectsEn, ar: projectsAr } as Record<Locale, Project[]>;
const gallery = { en: galleryEn, ar: galleryAr } as Record<Locale, GalleryItem[]>;
const insights = { en: insightsEn, ar: insightsAr } as Record<Locale, Insight[]>;
const contacts = { en: contactsEn, ar: contactsAr } as Record<Locale, Contacts>;
const machinery = { en: machineryEn, ar: machineryAr } as Record<Locale, Machine[]>;

export function getCompany(locale: Locale) {
  return company[locale];
}

export function getBusinesses(locale: Locale) {
  return businesses[locale];
}

export function getBusiness(locale: Locale, slug: string) {
  return businesses[locale].find((business) => business.slug === slug);
}

export function getProjects(locale: Locale) {
  return projects[locale];
}

export function getProject(locale: Locale, id: string) {
  return projects[locale].find((project) => project.id === id);
}

export function getGallery(locale: Locale) {
  return gallery[locale];
}

export function getInsights(locale: Locale) {
  return insights[locale];
}

export function getInsight(locale: Locale, slug: string) {
  return insights[locale].find((insight) => insight.slug === slug);
}

export function getContacts(locale: Locale) {
  return contacts[locale];
}

export function getMachinery(locale: Locale) {
  return machinery[locale];
}
