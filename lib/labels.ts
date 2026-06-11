import type { Locale } from "@/types/content";

export function t(locale: Locale) {
  return locale === "ar"
    ? {
        explore: "استكشف",
        exploreBusiness: "استكشف النشاط",
        contact: "تواصل",
        viewProject: "عرض المشروع",
        all: "الكل",
        wood: "خشب",
        paint: "دهانات",
        auto: "سيارات",
        salon: "صالون",
        readMore: "اقرأ المزيد",
        featuredProjects: "مشاريع مختارة",
        businessEcosystem: "منظومة الأعمال",
        globalPresence: "الحضور والنطاق",
        gallery: "معرض مرئي",
        insights: "رؤى وأخبار",
        language: "English",
        nextLocale: "en"
      }
    : {
        explore: "Explore",
        exploreBusiness: "Explore Business",
        contact: "Contact",
        viewProject: "View project",
        all: "All",
        wood: "Wood",
        paint: "Paint",
        auto: "Auto",
        salon: "Salon",
        readMore: "Read more",
        featuredProjects: "Featured projects",
        businessEcosystem: "Business ecosystem",
        globalPresence: "Presence and scale",
        gallery: "Visual gallery",
        insights: "Insights and news",
        language: "العربية",
        nextLocale: "ar"
      };
}
