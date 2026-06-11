import type { GalleryItem, Locale } from "@/types/content";

const categoryLabels = {
  en: {
    wood: "Architectural Wood Manufacturing",
    paint: "Premium Paint & Colour Systems",
    auto: "Automotive Technology Upgrade",
    salon: "Luxury Grooming Experience"
  },
  ar: {
    wood: "تصنيع خشبي معماري",
    paint: "أنظمة دهانات وألوان فاخرة",
    auto: "ترقية تقنية للسيارات",
    salon: "تجربة عناية فاخرة"
  }
};

const categoryDescriptions = {
  en: {
    wood: "A portfolio view of production quality, crafted surfaces, and architectural delivery.",
    paint: "Colour, finish, texture, and coating inspiration presented as a premium visual study.",
    auto: "A curated look at interiors, displays, audio systems, lighting, and vehicle technology.",
    salon: "Interior ambience, grooming service details, and hospitality-focused customer experience."
  },
  ar: {
    wood: "عرض بصري لجودة الإنتاج والأسطح المتقنة والتنفيذ المعماري.",
    paint: "إلهام للألوان والتشطيبات والملمس وأنظمة الطلاء ضمن عرض بصري راق.",
    auto: "نظرة منتقاة على المقصورات والشاشات وأنظمة الصوت والإضاءة وتقنيات المركبات.",
    salon: "أجواء داخلية وتفاصيل عناية وتجربة ضيافة تركز على العميل."
  }
};

export function getGalleryMeta(item: GalleryItem, locale: Locale, index: number, total: number) {
  const projectType = {
    en: {
      wood: "Manufacturing Portfolio",
      paint: "Product & Finish Showcase",
      auto: "Technology Installation",
      salon: "Customer Experience"
    },
    ar: {
      wood: "محفظة تصنيع",
      paint: "عرض منتجات وتشطيبات",
      auto: "تركيب تقني",
      salon: "تجربة عملاء"
    }
  };

  return {
    title: item.title,
    category: categoryLabels[locale][item.category],
    projectType: projectType[locale][item.category],
    description: categoryDescriptions[locale][item.category],
    location: locale === "ar" ? "المملكة العربية السعودية" : "Saudi Arabia",
    finish: item.category === "paint" ? (locale === "ar" ? "تشطيبات داخلية وخارجية وديكورية" : "Interior, exterior, and decorative finishes") : undefined,
    application: item.category === "paint" ? (locale === "ar" ? "الجدران والأسطح المعمارية وأنظمة الحماية" : "Walls, architectural surfaces, and protection systems") : undefined,
    counter: locale === "ar" ? `الصورة ${index + 1} من ${total}` : `Image ${index + 1} of ${total}`
  };
}

export function galleryHeading(locale: Locale, mode: "portfolio" | "visual" = "visual") {
  return {
    eyebrow: locale === "ar" ? "مختارات من" : "A SELECTION OF",
    title: mode === "portfolio"
      ? locale === "ar" ? "محفظة الأعمال" : "Business Portfolio"
      : locale === "ar" ? "المعرض المرئي" : "Visual Gallery"
  };
}
