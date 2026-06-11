import type { Locale } from "@/types/content";

export function navItems(locale: Locale) {
  const labels =
    locale === "ar"
      ? {
          home: "الرئيسية",
          about: "عن القابضة",
          businesses: "الأعمال",
          projects: "المشاريع",
          gallery: "المعرض",
          insights: "الأخبار",
          contact: "تواصل"
        }
      : {
          home: "Home",
          about: "About Holding",
          businesses: "Businesses",
          projects: "Projects",
          gallery: "Gallery",
          insights: "Insights",
          contact: "Contact"
        };

  return [
    { label: labels.home, href: `/${locale}` },
    { label: labels.about, href: `/${locale}/about` },
    { label: labels.businesses, href: `/${locale}/businesses`, mega: true },
    { label: labels.projects, href: `/${locale}/projects` },
    { label: labels.gallery, href: `/${locale}/gallery` },
    { label: labels.insights, href: `/${locale}/insights` },
    { label: labels.contact, href: `/${locale}/contact` }
  ];
}
