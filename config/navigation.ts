import type { Locale } from "@/types/content";

export function navItems(locale: Locale) {
  const labels =
    locale === "ar"
      ? {
          home: "الرئيسية",
          about: "من نحن",
          services: "الخدمات",
          gallery: "المعرض",
          contact: "تواصل معنا"
        }
      : {
          home: "Home",
          about: "About",
          services: "Services",
          gallery: "Gallery",
          contact: "Contact"
        };

  return [
    { label: labels.home, href: `/${locale}` },
    { label: labels.about, href: `/${locale}/about` },
    { label: labels.services, href: `/${locale}/services` },
    { label: labels.gallery, href: `/${locale}/gallery` },
    { label: labels.contact, href: `/${locale}/contact` }
  ];
}
