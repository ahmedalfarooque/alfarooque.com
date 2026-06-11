import Image from "next/image";
import { notFound } from "next/navigation";
import { Car, MapPin, MessageCircle, PaintBucket, Phone, Scissors } from "lucide-react";
import { Reveal } from "@/components/effects/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessGallery } from "@/features/businesses/BusinessGallery";
import { ProjectShowcase } from "@/features/businesses/ProjectShowcase";
import { getBusiness, getGallery, getMachinery, getProjects } from "@/lib/content";
import { t } from "@/lib/labels";
import type { GalleryItem, Locale, Project } from "@/types/content";

const specialty: Record<string, { eyebrow: string; title: string; items: string[] }> = {
  "wooden-industries": {
    eyebrow: "Production system",
    title: "From raw material to finished architectural element.",
    items: ["Design coordination", "Material selection", "Automated production", "Quality inspection", "Site installation", "Final handover"]
  },
  "paint-shop": {
    eyebrow: "Color system",
    title: "Premium interior and exterior paint guidance for Saudi homes and projects.",
    items: ["Interior wall paints", "Exterior protection", "Decorative finishes", "Low VOC options", "Color consultation", "Professional finishing"]
  },
  saloon: {
    eyebrow: "Luxury grooming",
    title: "A refined salon journey from arrival to final styling.",
    items: ["Premium hair styling", "Beard grooming", "Facial treatments", "VIP services", "Booking support", "Customer care"]
  },
  "car-accessories": {
    eyebrow: "Automotive technology",
    title: "Premium car interior accessories with a luxury technology feel.",
    items: ["Screen installation", "Sound systems", "Interior accessories", "Ambient lighting", "Smart gadgets", "Expert installation"]
  }
};

const paintSolutionImages: Record<string, string> = {
  "Interior wall paints": "/images/pdf-jotun/majestic/majestic-page-01.webp",
  "Exterior protection": "/images/pdf-jotun/jotashield/jotashield-page-01.webp",
  "Decorative finishes": "/images/pdf-jotun/majestic/majestic-page-02.webp",
  "Low VOC options": "/images/pdf-jotun/gardex/gardex-page-01.webp",
  "Color consultation": "/images/pdf-jotun/jotashield/jotashield-page-02.webp",
  "Professional finishing": "/images/pdf-jotun/jotashield/jotashield-page-08.webp"
};

const contacts = {
  "wooden-industries": {
    map: "https://maps.app.goo.gl/8cUydWcYoE7v9XNM9",
    embed: "https://www.google.com/maps?q=Old%20Mecca%20Road%20Bahrah%20Jeddah&output=embed",
    phones: ["+966 54 377 9954", "+966 56 446 6661", "+966 56 300 0051"]
  },
  "paint-shop": {
    map: "https://maps.app.goo.gl/hPYCsCH5TvNjrD5w9",
    embed: "https://www.google.com/maps?q=Jotun%20Rowad%20Alfa%20Paint%20Shop%20Jeddah&output=embed",
    phones: ["+966 56 559 7115", "+966 56 377 9966"]
  },
  saloon: {
    map: "https://maps.app.goo.gl/WUksrhz7sMeAHe1NA",
    embed: "https://www.google.com/maps?q=Rowad%20Alfa%20Saloon%20Jeddah&output=embed",
    phones: ["+966 58 295 7165"]
  },
  "car-accessories": {
    map: "https://maps.app.goo.gl/AfF6oefJtYPc5j7eA",
    embed: "https://www.google.com/maps?q=Rowad%20Alfa%20Car%20Accessories%20Jeddah&output=embed",
    phones: ["+966 53 842 393", "+966 50 667 4043"]
  }
};

const generatedGalleries = {
  paint: [
    ...Array.from({ length: 8 }, (_, index) => ({
      title: `Majestic PDF page ${index + 1}`,
      category: "paint" as const,
      image: `/images/pdf-jotun/majestic/majestic-page-${String(index + 1).padStart(2, "0")}.webp`
    })),
    ...Array.from({ length: 8 }, (_, index) => ({
      title: `Jotashield PDF page ${index + 1}`,
      category: "paint" as const,
      image: `/images/pdf-jotun/jotashield/jotashield-page-${String(index + 1).padStart(2, "0")}.webp`
    })),
    ...Array.from({ length: 2 }, (_, index) => ({
      title: `Gardex PDF page ${index + 1}`,
      category: "paint" as const,
      image: `/images/pdf-jotun/gardex/gardex-page-${String(index + 1).padStart(2, "0")}.webp`
    }))
  ],
  salon: Array.from({ length: 18 }, (_, index) => ({
    title: `Rowad Alfa Saloon ${index + 1}`,
    category: "salon" as const,
    image: `/images/rowad-alfa-saloon/saloon-${String(index + 1).padStart(2, "0")}.webp`
  })),
  auto: [
    { title: "Dashboard upgrade detail", image: "/images/rowad-alfa-car-accessories/car-accessories-01.webp" },
    { title: "Premium dashboard interface", image: "/images/rowad-alfa-car-accessories/car-accessories-02.webp" },
    { title: "Curved cockpit display", image: "/images/rowad-alfa-car-accessories/car-accessories-07.webp" },
    { title: "Interior ambient upgrade", image: "/images/rowad-alfa-car-accessories/car-accessories-08.webp" },
    { title: "Phone mirror link display", image: "/images/rowad-alfa-car-accessories/car-accessories-09.webp" },
    { title: "Ambient dashboard lighting", image: "/images/rowad-alfa-car-accessories/car-accessories-12.webp" },
    { title: "Luxury upholstery detail", image: "/images/rowad-alfa-car-accessories/car-accessories-13.webp" },
    { title: "Infotainment display setup", image: "/images/rowad-alfa-car-accessories/car-accessories-14.webp" },
    { title: "Audio installation showcase", image: "/images/rowad-alfa-car-accessories/car-accessories-16.webp" },
    { title: "Premium speaker display", image: "/images/rowad-alfa-car-accessories/car-accessories-17.webp" },
    { title: "Automotive technology detail", image: "/images/rowad-alfa-car-accessories/car-accessories-18.webp" },
    { title: "Sound system technology", image: "/images/rowad-alfa-car-accessories/car-accessories-19.webp" },
    { title: "Dashboard screen installation", image: "/images/rowad-alfa-car-accessories/car-accessories-20.webp" },
    { title: "Digital cockpit upgrade", image: "/images/rowad-alfa-car-accessories/car-accessories-21.webp" },
    { title: "Smart screen interface", image: "/images/rowad-alfa-car-accessories/car-accessories-22.webp" },
    { title: "Interior seat upgrade", image: "/images/rowad-alfa-car-accessories/car-accessories-23.webp" },
    { title: "Ambient lighting installation", image: "/images/rowad-alfa-car-accessories/car-accessories-26.webp" },
    { title: "Luxury leather interior", image: "/images/rowad-alfa-car-accessories/car-accessories-27.webp" },
    { title: "Premium cockpit lighting", image: "/images/rowad-alfa-car-accessories/car-accessories-29.webp" },
    { title: "Digital dashboard system", image: "/images/rowad-alfa-car-accessories/car-accessories-30.webp" },
    { title: "Tan leather seat upgrade", image: "/images/rowad-alfa-car-accessories/car-accessories-42.webp" },
    { title: "Automotive project showcase", image: "/images/rowad-alfa-car-accessories/car-accessories-43.webp" },
    { title: "Modern smart dashboard", image: "/images/rowad-alfa-car-accessories/car-accessories-44.webp" },
    { title: "Futuristic cockpit technology", image: "/images/rowad-alfa-car-accessories/car-accessories-45.webp" }
  ].map((item) => ({ ...item, category: "auto" as const }))
};

const pdfColorSwatches = [
  { name: "Sour Onion 7037", color: "#c7d1b6", source: "Jotashield" },
  { name: "Cobalt 6198", color: "#4d6f80", source: "Jotashield" },
  { name: "Mito 1133", color: "#b09178", source: "Jotashield" },
  { name: "Roast Coffee 2549", color: "#7b5b49", source: "Jotashield" },
  { name: "Pure Yellow 10394", color: "#f3c36c", source: "Jotashield" },
  { name: "Free Spirit 5489", color: "#18524c", source: "Majestic" },
  { name: "Dijon Yellow 10001", color: "#bd9043", source: "Majestic" },
  { name: "Mist 1376", color: "#d8d5c8", source: "Majestic" },
  { name: "Light Mocha 2024", color: "#c0a18b", source: "Jotashield" },
  { name: "Brown Script 2630", color: "#7b584d", source: "Jotashield" },
  { name: "Antique Brass 2011", color: "#a07348", source: "Jotashield" },
  { name: "Flax 2132", color: "#d4b075", source: "Jotashield" }
];

const paintProducts = {
  en: [
    { title: "Majestic Sense", type: "Interior", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "For perfect beauty and a healthy home.", benefits: ["Clean Air Technology", "Odour-less Comfort", "Luxuriously Smooth", "Covers Hairline Cracks"], areas: "Interior walls and premium home interiors" },
    { title: "Majestic True Beauty Sheen", type: "Interior", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "A luxurious long-lasting finish.", benefits: ["True Colour Experience", "Luxurious Smooth Finish", "Superior Easy Clean", "Anti-Bacterial & Anti-Fungal"], areas: "Interior walls requiring sheen finish and easy cleaning" },
    { title: "Majestic True Beauty Matt", type: "Interior", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "A luxurious long-lasting matt finish.", benefits: ["True Colour Experience", "Luxurious Smooth Finish", "Superior Easy Clean", "Anti-Bacterial & Anti-Fungal"], areas: "Interior matt wall finishes" },
    { title: "Majestic Supreme Finish", type: "Interior", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "A beautiful home through the finer details.", benefits: ["Beautiful Flawless Finish", "Superior Easy Clean", "Low Odour"], areas: "Interior decorative finishing" },
    { title: "Jotashield Flex", type: "Exterior", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "Formulated to cover and prevent exterior hairline cracks, with long-lasting UV and waterproof protection.", benefits: ["Superior UV-Protected Colours", "Covers and Prevents Cracks", "Waterproof"], areas: "Exterior walls and facades with hairline crack concerns" },
    { title: "Jotun Ultra Primer", type: "Primer / Sealer", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "Superior water-based primer suitable for fresh concrete.", benefits: ["Excellent Paint Adhesion", "Anti-Efflorescence & Anti-Discolouration", "Suitable for Fresh Concrete"], areas: "Fresh concrete and primer/sealer systems" },
    { title: "Jotashield Primer", type: "Exterior Primer", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "Premium water-based undercoat for exteriors.", benefits: ["Alkali-Resistant", "Superb Adhesion", "Water-Resistant"], areas: "Exterior undercoat systems" },
    { title: "Gardex Premium Gloss", type: "Wood & Metal", image: "/images/pdf-jotun/gardex/gardex-page-01.webp", body: "Premium gloss paint for wood and metal colours.", benefits: ["Low Odour", "Optimized Drying Time", "Excellent Colour Last", "Weather Resistance", "Anti Fungal and Anti Rust", "100% free from Heavy Metals"], areas: "Wood and metal surfaces" },
    { title: "Majestic Primer", type: "Primer", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "Enhances colour and durability.", benefits: ["Water-Resistant", "Alkali-Resistant", "Good Adhesion"], areas: "Interior systems before Majestic topcoat" }
  ],
  ar: [
    { title: "Majestic Sense", type: "داخلي", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "للجمال المثالي والمنزل الصحي.", benefits: ["تقنية الهواء النظيف", "راحة برائحة أقل", "نعومة فاخرة", "يغطي الشقوق الشعرية"], areas: "الجدران الداخلية والمساحات المنزلية الفاخرة" },
    { title: "Majestic True Beauty Sheen", type: "داخلي", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "تشطيب فاخر طويل الأمد.", benefits: ["تجربة لون حقيقية", "تشطيب ناعم فاخر", "تنظيف فائق السهولة", "مضاد للبكتيريا والفطريات"], areas: "الجدران الداخلية التي تحتاج لمعاناً وسهولة تنظيف" },
    { title: "Majestic True Beauty Matt", type: "داخلي", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "تشطيب مطفي فاخر طويل الأمد.", benefits: ["تجربة لون حقيقية", "تشطيب ناعم فاخر", "تنظيف فائق السهولة", "مضاد للبكتيريا والفطريات"], areas: "تشطيبات الجدران الداخلية المطفية" },
    { title: "Majestic Supreme Finish", type: "داخلي", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "منزل جميل من خلال أدق التفاصيل.", benefits: ["تشطيب جميل وخالٍ من العيوب", "تنظيف فائق السهولة", "رائحة منخفضة"], areas: "التشطيبات الداخلية الديكورية" },
    { title: "Jotashield Flex", type: "خارجي", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "مصمم لتغطية ومنع الشقوق الشعرية الخارجية مع حماية طويلة الأمد من الأشعة والماء.", benefits: ["ألوان محمية من الأشعة فوق البنفسجية", "يغطي ويمنع الشقوق", "مقاوم للماء"], areas: "الجدران والواجهات الخارجية ذات الشقوق الشعرية" },
    { title: "Jotun Ultra Primer", type: "برايمر / سيلر", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "برايمر مائي فائق مناسب للخرسانة الجديدة.", benefits: ["التصاق ممتاز للدهان", "مضاد للتزهر وتغير اللون", "مناسب للخرسانة الجديدة"], areas: "الخرسانة الجديدة وأنظمة البرايمر والسيلر" },
    { title: "Jotashield Primer", type: "برايمر خارجي", image: "/images/pdf-jotun/jotashield/jotashield-page-08.webp", body: "طبقة أساس مائية فاخرة للواجهات الخارجية.", benefits: ["مقاوم للقلوية", "التصاق فائق", "مقاوم للماء"], areas: "أنظمة الطبقة الأساسية الخارجية" },
    { title: "Gardex Premium Gloss", type: "خشب ومعادن", image: "/images/pdf-jotun/gardex/gardex-page-01.webp", body: "دهان لامع فاخر لألوان الخشب والمعادن.", benefits: ["رائحة منخفضة", "وقت جفاف محسّن", "ثبات لون ممتاز", "مقاومة للطقس", "مضاد للفطريات والصدأ", "خالٍ 100% من المعادن الثقيلة"], areas: "أسطح الخشب والمعادن" },
    { title: "Majestic Primer", type: "برايمر", image: "/images/pdf-jotun/majestic/majestic-page-08.webp", body: "يعزز اللون والمتانة.", benefits: ["مقاوم للماء", "مقاوم للقلوية", "التصاق جيد"], areas: "أنظمة داخلية قبل طبقة ماجستيك النهائية" }
  ]
};

const salonServices = {
  en: [
    { title: "Premium Hair Styling", body: "Modern haircuts, executive styling, hair treatments, and polished finishing for daily and formal looks." },
    { title: "Beard Grooming", body: "Beard shaping, precision trimming, line definition, and premium grooming rituals." },
    { title: "Facial Treatments", body: "Skin care treatments, facial cleansing, refreshed grooming, and a calm luxury service rhythm." },
    { title: "VIP Services", body: "Executive packages, priority appointments, personalized grooming, and premium hospitality." }
  ],
  ar: [
    { title: "تصفيف شعر فاخر", body: "قصات حديثة وتصفيف تنفيذي وعلاجات شعر ولمسات نهائية للمظهر اليومي والرسمي." },
    { title: "عناية اللحية", body: "تشكيل اللحية وتشذيب دقيق وتحديد الخطوط وتجربة عناية راقية." },
    { title: "علاجات الوجه", body: "عناية بالبشرة وتنظيف للوجه وتجربة عناية هادئة وفاخرة." },
    { title: "خدمات VIP", body: "باقات تنفيذية ومواعيد مميزة وعناية شخصية وضيافة راقية." }
  ]
};

const salonServiceImages = [
  "/images/rowad-alfa-saloon/saloon-12.webp",
  "/images/rowad-alfa-saloon/saloon-10.webp",
  "/images/rowad-alfa-saloon/saloon-05.webp",
  "/images/rowad-alfa-saloon/saloon-02.webp"
];

const salonJourneyImages: Record<string, string> = {
  "Premium hair styling": "/images/rowad-alfa-saloon/saloon-12.webp",
  "Beard grooming": "/images/rowad-alfa-saloon/saloon-10.webp",
  "Facial treatments": "/images/rowad-alfa-saloon/saloon-05.webp",
  "VIP services": "/images/rowad-alfa-saloon/saloon-02.webp",
  "Booking support": "/images/rowad-alfa-saloon/saloon-04.webp",
  "Customer care": "/images/rowad-alfa-saloon/saloon-01.webp"
};

const autoServices = {
  en: [
    { title: "Screen Installation", items: ["OLED Displays", "Android Screens", "Smart Navigation Systems", "Digital Instrument Clusters"] },
    { title: "Sound System Installation", items: ["Premium Speakers", "Amplifiers", "Subwoofers", "DSP Audio Tuning"] },
    { title: "Interior Accessories", items: ["Carbon Fiber Trims", "Leather Upgrades", "Steering Wheel Enhancements", "Decorative Accessories"] },
    { title: "Ambient Lighting", items: ["RGB Lighting Systems", "Dashboard Lighting", "Door Panel Lighting", "Smart Mobile Controls"] }
  ],
  ar: [
    { title: "تركيب الشاشات", items: ["شاشات OLED", "شاشات أندرويد", "أنظمة ملاحة ذكية", "عدادات رقمية"] },
    { title: "تركيب أنظمة الصوت", items: ["سماعات فاخرة", "مضخمات", "سبووفر", "ضبط صوت DSP"] },
    { title: "إكسسوارات داخلية", items: ["لمسات كاربون فايبر", "ترقيات جلد", "تحسينات المقود", "إكسسوارات ديكورية"] },
    { title: "إضاءة محيطية", items: ["أنظمة RGB", "إضاءة الطبلون", "إضاءة الأبواب", "تحكم ذكي بالجوال"] }
  ]
};

const autoJourneyImages: Record<string, string> = {
  "Screen installation": "/images/rowad-alfa-car-accessories/car-accessories-30.webp",
  "Sound systems": "/images/rowad-alfa-car-accessories/car-accessories-48.webp",
  "Interior accessories": "/images/rowad-alfa-car-accessories/car-accessories-42.webp",
  "Ambient lighting": "/images/rowad-alfa-car-accessories/car-accessories-12.webp",
  "Smart gadgets": "/images/rowad-alfa-car-accessories/car-accessories-06.webp",
  "Expert installation": "/images/rowad-alfa-car-accessories/car-accessories-47.webp"
};

const autoServiceImages = [
  "/images/rowad-alfa-car-accessories/car-accessories-30.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-48.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-42.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-12.webp"
];

const autoProductImages = [
  "/images/rowad-alfa-car-accessories/car-accessories-44.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-48.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-05.webp",
  "/images/rowad-alfa-car-accessories/car-accessories-42.webp"
];

const autoFeatures = {
  en: [
    { title: "Professional Installation", description: "Careful fitting, clean wiring, and precise integration for screens, audio, and interior upgrades.", image: "/images/rowad-alfa-car-accessories/car-accessories-47.webp" },
    { title: "Genuine Products", description: "Selected automotive accessories, branded systems, and quality components for dependable upgrades.", image: "/images/rowad-alfa-car-accessories/car-accessories-48.webp" },
    { title: "Warranty Support", description: "After-sales guidance and service support designed to keep every installation protected.", image: "/images/rowad-alfa-car-accessories/car-accessories-49.webp" },
    { title: "Latest Technology", description: "Smart dashboards, digital cockpit systems, and advanced in-car electronics for modern vehicles.", image: "/images/rowad-alfa-car-accessories/car-accessories-44.webp" },
    { title: "Expert Technicians", description: "Skilled workshop handling for diagnostics, precision fitting, testing, and final calibration.", image: "/images/rowad-alfa-car-accessories/car-accessories-46.webp" },
    { title: "Fast Service", description: "Efficient workshop flow for quicker installation, responsive service, and smooth handover.", image: "/images/rowad-alfa-car-accessories/car-accessories-30.webp" }
  ],
  ar: [
    { title: "تركيب احترافي", description: "تركيب دقيق وتوصيلات نظيفة ودمج متقن للشاشات والصوت والترقيات الداخلية.", image: "/images/rowad-alfa-car-accessories/car-accessories-47.webp" },
    { title: "منتجات أصلية", description: "إكسسوارات مختارة وأنظمة معتمدة ومكونات عالية الجودة لترقيات موثوقة.", image: "/images/rowad-alfa-car-accessories/car-accessories-48.webp" },
    { title: "دعم ضمان", description: "إرشاد وخدمة ما بعد البيع للحفاظ على كل تركيب ضمن تجربة مطمئنة.", image: "/images/rowad-alfa-car-accessories/car-accessories-49.webp" },
    { title: "أحدث التقنيات", description: "لوحات قيادة ذكية وأنظمة قمرة رقمية وإلكترونيات متقدمة للسيارات الحديثة.", image: "/images/rowad-alfa-car-accessories/car-accessories-44.webp" },
    { title: "فنيون خبراء", description: "تعامل ورشة متخصص للتشخيص والتركيب الدقيق والاختبار والمعايرة النهائية.", image: "/images/rowad-alfa-car-accessories/car-accessories-46.webp" },
    { title: "خدمة سريعة", description: "سير عمل فعال داخل الورشة لتركيب أسرع واستجابة أفضل وتسليم سلس.", image: "/images/rowad-alfa-car-accessories/car-accessories-30.webp" }
  ]
};

export function BusinessDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const business = getBusiness(locale, slug);
  if (!business) notFound();
  const labels = t(locale);
  const category = categoryForSlug(slug);
  const sourceGallery = getGallery(locale).filter((item) => item.category === category);
  const gallery = slug === "paint-shop" ? generatedGalleries.paint : slug === "saloon" ? generatedGalleries.salon : slug === "car-accessories" ? generatedGalleries.auto : sourceGallery;
  const spec = specialty[slug];
  const woodenProjects = getProjects(locale).filter((project) => project.category === "wood");
  const machinery = getMachinery(locale);
  const isWood = slug === "wooden-industries";
  const isPaint = slug === "paint-shop";
  const isSalon = slug === "saloon";
  const isAuto = slug === "car-accessories";

  return (
    <main className={`businessSkin businessSkin-${slug}`}>
      <section className={`container hero businessHero ${isAuto ? "autoHero" : ""} ${isSalon ? "saloonHero" : ""}`}>
        <Reveal>
          <p className="eyebrow">{business.category}</p>
          <h1>{isAuto ? (locale === "ar" ? "إكسسوارات داخلية فاخرة للسيارات" : "Premium Car Interior Accessories") : business.hero}</h1>
          <p className="lead">
            {isAuto
              ? locale === "ar"
                ? "تركيب شاشات متقدمة • أنظمة صوت فاخرة • إضاءة محيطية • ترقيات داخلية راقية"
                : "Advanced Screen Installation • Premium Audio Systems • Ambient Lighting • Luxury Interior Upgrades"
              : business.summary}
          </p>
          <div className="buttonRow">
            <ButtonLink href={`/${locale}/contact`}>{isAuto ? (locale === "ar" ? "اطلب عرض سعر" : "Request Quotation") : labels.contact}</ButtonLink>
            <ButtonLink href={`#${slug}-services`} variant="ghost">
              {isAuto ? (locale === "ar" ? "استكشف الخدمات" : "Explore Services") : labels.gallery}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="heroVisual glass">
            <Image src={business.image} width={900} height={720} alt="" priority />
          </div>
        </Reveal>
      </section>

      <section id={`${slug}-services`} className="container section businessSkinServices">
        <SectionHeading eyebrow={business.theme} title={locale === "ar" ? "قدرات مصممة لتجربة فاخرة وموثوقة." : "Capabilities designed for a premium, reliable experience."} />
        <div className="grid three">
          {business.sections.map((section) => (
            <GlassCard key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container section grid two businessSkinIdentity">
        <Reveal>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? localizeSpecialEyebrow(slug) : spec.eyebrow}</p>
            <h2>{locale === "ar" ? localizeSpecialTitle(slug) : spec.title}</h2>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="grid two">
            {spec.items.map((item) => (
              <GlassCard
                className={isPaint ? "paintSolutionCard" : isSalon ? "saloonJourneyCard" : isAuto ? "autoJourneyCard" : ""}
                key={item}
                style={
                  isPaint
                    ? { backgroundImage: `linear-gradient(135deg, rgba(7, 20, 38, 0.62), rgba(7, 20, 38, 0.24)), url(${paintSolutionImages[item]})` }
                    : isSalon
                      ? { backgroundImage: `linear-gradient(135deg, rgba(7, 20, 38, 0.70), rgba(7, 20, 38, 0.28)), url(${salonJourneyImages[item]})` }
                      : isAuto
                        ? { backgroundImage: `linear-gradient(135deg, rgba(7, 20, 38, 0.72), rgba(7, 20, 38, 0.26)), url(${autoJourneyImages[item]})` }
                        : undefined
                }
              >
                <h3>{locale === "ar" ? localizeItem(item) : item}</h3>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </section>

      {isWood ? <WoodenSections locale={locale} machinery={machinery} projects={woodenProjects} labels={labels} /> : null}
      {isPaint ? <PaintSections locale={locale} /> : null}
      {isSalon ? <SalonSections locale={locale} gallery={gallery} /> : null}
      {isAuto ? <AutoSections locale={locale} /> : null}

      <section className="container section">
        <BusinessGallery
          items={gallery}
          locale={locale}
          heading="visual"
          variant={isWood ? "drag" : isPaint ? "momentum" : isAuto ? "auto-portfolio" : isSalon ? "dramatic-rotunda" : "rotunda"}
        />
      </section>

      <BusinessContact locale={locale} slug={slug} businessName={business.name} />
    </main>
  );
}

function WoodenSections({ locale, machinery, projects, labels }: { locale: Locale; machinery: Array<{ name: string; image: string; description: string }>; projects: Project[]; labels: ReturnType<typeof t> }) {
  return (
    <>
      <section className="container section">
        <SectionHeading eyebrow={locale === "ar" ? "تقنية التصنيع" : "Our manufacturing technology"} title={locale === "ar" ? "معدات متقدمة تدعم الدقة والتشطيب." : "Advanced machinery supporting precision, repeatability, and refined finishes."} />
        <div className="grid three">
          {machinery.map((machine) => (
            <GlassCard className="machineCard" key={machine.name}>
              <Image src={machine.image} width={680} height={480} alt={machine.name} />
              <h3>{machine.name}</h3>
              <p>{machine.description}</p>
            </GlassCard>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading eyebrow={labels.featuredProjects} title={locale === "ar" ? "محفظة تنفيذ خشبية ومعمارية." : "Wooden and architectural delivery portfolio."} />
        <ProjectShowcase projects={projects} locale={locale} />
      </section>
    </>
  );
}

function PaintSections({ locale }: { locale: Locale }) {
  const products = paintProducts[locale];
  const categories = locale === "ar"
    ? ["Majestic Interior Paints", "Jotashield Exterior Colours", "Gardex Wood & Metal", "Primer / Sealer", "Colour Selection Tips"]
    : ["Majestic Interior Paints", "Jotashield Exterior Colours", "Gardex Wood & Metal", "Primer / Sealer", "Colour Selection Tips"];
  return (
    <>
      <section className="container section paintTexture">
        <SectionHeading eyebrow={locale === "ar" ? "حلول دهان فاخرة" : "Premium paint solutions"} title={locale === "ar" ? "منتجاتنا الفاخرة" : "Our Premium Products"} />
        <div className="colorShowcase glass">
          {pdfColorSwatches.map((swatch) => (
            <span key={swatch.name} style={{ background: swatch.color }} title={`${swatch.name} - ${swatch.source}`} />
          ))}
        </div>
        <div className="swatchLegend">
          {pdfColorSwatches.map((swatch) => (
            <span key={swatch.name}>{swatch.name} <small>{swatch.source}</small></span>
          ))}
        </div>
        <div className="filterBar paintFilters" aria-label={locale === "ar" ? "فئات الدهان" : "Paint categories"}>
          {categories.map((item) => (
            <span className="filterChip active" key={item}>{item}</span>
          ))}
        </div>
        <div className="grid two">
          {products.map((product) => (
            <GlassCard className="productCard" key={product.title}>
              <Image src={product.image} width={680} height={480} alt={product.title} />
              <p className="eyebrow">{product.type}</p>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <ul>
                {product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
              </ul>
              <p><strong>{locale === "ar" ? "الاستخدامات:" : "Applications:"}</strong> {product.areas}</p>
              <a className="btn ghost" href={product.image} target="_blank" rel="noreferrer">
                {locale === "ar" ? "عرض صفحة PDF" : "View PDF source page"}
              </a>
            </GlassCard>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading eyebrow={locale === "ar" ? "أنظمة التطبيق من PDF" : "PDF application systems"} title={locale === "ar" ? "توصيات البرايمر والطبقات كما تظهر في بطاقات جوتن." : "Primer and coating recommendations shown in the Jotun cards."} />
        <div className="grid three">
          <GlassCard><PaintBucket size={24} /><h3>{locale === "ar" ? "نظام Majestic" : "Majestic Paint System"}</h3><p>{locale === "ar" ? "لأفضل النتائج: طبقة واحدة من Majestic Primer + طبقتان من أي Majestic Topcoat." : "For best results: 1 coat of Majestic Primer + 2 coats of any Majestic Topcoat."}</p></GlassCard>
          <GlassCard><PaintBucket size={24} /><h3>{locale === "ar" ? "نظام Jotashield" : "Jotashield Paint System"}</h3><p>{locale === "ar" ? "لراحة البال: طبقة واحدة من primer / sealer + طبقتان من topcoat." : "For peace of mind: 1 coat of primer / sealer + 2 coats of topcoat."}</p></GlassCard>
          <GlassCard><PaintBucket size={24} /><h3>{locale === "ar" ? "تحضير سطح Gardex" : "Gardex Surface Preparation"}</h3><p>{locale === "ar" ? "للأسطح الطباشيرية أو المتربة أو المواد الرخوة: يجب إزالة المواد قبل الطلاء. للمعادن الحديدية: يجب أن يكون السطح خالياً من الصدأ قبل الدهان." : "For chalky, dusty surfaces and loose materials: remove before painting. For ferrous metal surfaces: keep the surface free from rust before painting."}</p></GlassCard>
        </div>
      </section>
    </>
  );
}

function SalonSections({ locale, gallery }: { locale: Locale; gallery: GalleryItem[] }) {
  return (
    <>
      <section className="container section salonLuxury">
        <SectionHeading eyebrow={locale === "ar" ? "خدمات الصالون" : "Salon services"} title={locale === "ar" ? "عناية رجالية فاخرة بتجربة هادئة ومنظمة." : "Luxury grooming with a calm, refined service flow."} />
        <div className="grid four">
          {salonServices[locale].map((service, index) => (
            <GlassCard
              className="saloonServiceCard"
              key={service.title}
              style={{ backgroundImage: `linear-gradient(135deg, rgba(7, 20, 38, 0.72), rgba(7, 20, 38, 0.28)), url(${salonServiceImages[index]})` }}
            >
              <Scissors size={24} /><h3>{service.title}</h3><p>{service.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>
      <section className="container section grid two">
        <GlassCard className="textCard saloonInfoCard" style={{ backgroundImage: "linear-gradient(135deg, rgba(7, 20, 38, 0.68), rgba(7, 20, 38, 0.22)), url(/images/rowad-alfa-saloon/saloon-04.webp)" }}><p className="eyebrow">{locale === "ar" ? "نظرة على الأسعار" : "Pricing overview"}</p><h2>{locale === "ar" ? "باقات مرنة حسب الخدمة." : "Flexible packages by service."}</h2><p>{locale === "ar" ? "تتوفر باقات للحلاقة والتصفيف والعناية والزيارات التنفيذية، ويتم تأكيد السعر عند الحجز." : "Haircut, styling, grooming, facial, and executive appointment packages are confirmed during booking."}</p></GlassCard>
        <GlassCard className="textCard saloonInfoCard" style={{ backgroundImage: "linear-gradient(135deg, rgba(7, 20, 38, 0.68), rgba(7, 20, 38, 0.22)), url(/images/rowad-alfa-saloon/saloon-01.webp)" }}><p className="eyebrow">{locale === "ar" ? "آراء العملاء" : "Testimonials"}</p><h2>{locale === "ar" ? "تجربة نظيفة وراقية." : "Clean, refined, and reliable."}</h2><p>{locale === "ar" ? "يتمحور الصالون حول الراحة والنظافة والدقة واحترام وقت العميل." : "The salon experience is built around comfort, hygiene, precision, and respect for each appointment."}</p></GlassCard>
      </section>
      <section className="container section">
        <BusinessGallery items={gallery.slice(0, 10)} locale={locale} variant="drag" heading="portfolio" />
      </section>
    </>
  );
}

function AutoSections({ locale }: { locale: Locale }) {
  const features = autoFeatures[locale];
  return (
    <>
      <section className="container section autoTech">
        <SectionHeading eyebrow={locale === "ar" ? "خدمات السيارات" : "Automotive technology services"} title={locale === "ar" ? "شاشات وصوت وإضاءة داخلية بتجربة فاخرة." : "Screens, audio, lighting, and interior upgrades with a luxury technology feel."} />
        <div className="grid four">
          {autoServices[locale].map((service, index) => (
            <GlassCard
              className="autoServiceCard"
              key={service.title}
              style={{ backgroundImage: `linear-gradient(145deg, rgba(7, 20, 38, 0.74), rgba(7, 20, 38, 0.30)), url(${autoServiceImages[index]})` }}
            >
              <Car size={24} /><h3>{service.title}</h3><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </GlassCard>
          ))}
        </div>
      </section>
      <section className="container section">
        <SectionHeading eyebrow={locale === "ar" ? "عرض المنتجات" : "Product showcase"} title={locale === "ar" ? "شاشات وأنظمة صوت وإكسسوارات ذكية." : "OLED screens, audio systems, smart gadgets, and premium interior decor."} />
        <div className="grid four">
          {(locale === "ar" ? ["شاشات OLED", "أنظمة صوت فاخرة", "أجهزة ذكية للمركبة", "ديكور داخلي فاخر"] : ["Latest OLED Screens", "Luxury Audio Systems", "Smart Vehicle Gadgets", "Premium Interior Decor"]).map((item, index) => (
            <GlassCard className="productCard" key={item}><Image src={autoProductImages[index]} width={540} height={420} alt={item} /><h3>{item}</h3><p>{locale === "ar" ? "منتجات مختارة مع تركيب نظيف وواجهة استخدام حديثة." : "Selected products with clean installation and a modern user experience."}</p></GlassCard>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="grid three">
          {features.map((feature) => (
            <GlassCard
              className="autoFeatureCard"
              key={feature.title}
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className="autoFeatureContent">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </>
  );
}

function BusinessContact({ locale, slug, businessName }: { locale: Locale; slug: string; businessName: string }) {
  const contact = contacts[slug as keyof typeof contacts];
  return (
    <section className="container section">
      <SectionHeading eyebrow={locale === "ar" ? "التواصل والموقع" : "Contact & location"} title={locale === "ar" ? "ابدأ استفسارك أو احصل على الاتجاهات." : "Start an inquiry or get directions."} />
      <div className="grid two">
        <GlassCard className="businessContactCard">
          <MapPin size={28} />
          <h3>{businessName}</h3>
          <p>{locale === "ar" ? "موقع الخدمة وجهات الاتصال المباشرة لهذا النشاط." : "Service location and direct contact channels for this business."}</p>
          <div className="contactActions">
            {contact.phones.map((phone) => {
              const call = phone.replaceAll(" ", "");
              const whatsapp = call.replace("+", "");
              return (
                <span className="phoneAction" key={phone}>
                  <a className="btn ghost" href={`tel:${call}`}><Phone size={16} /> {phone}</a>
                  <a className="btn primary" href={`https://api.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
                </span>
              );
            })}
            <a className="btn ghost" href={contact.map} target="_blank" rel="noreferrer">{locale === "ar" ? "الاتجاهات" : "Directions"}</a>
          </div>
        </GlassCard>
        <div className="glass mapEmbed">
          <iframe title={`${businessName} map`} src={contact.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function categoryForSlug(slug: string) {
  if (slug === "paint-shop") return "paint";
  if (slug === "saloon") return "salon";
  if (slug === "car-accessories") return "auto";
  return "wood";
}

function localizeSpecialEyebrow(slug: string) {
  return {
    "wooden-industries": "نظام الإنتاج",
    "paint-shop": "نظام الألوان",
    saloon: "تجربة فاخرة",
    "car-accessories": "تقنية السيارات"
  }[slug];
}

function localizeSpecialTitle(slug: string) {
  return {
    "wooden-industries": "من المادة الخام إلى العنصر المعماري النهائي.",
    "paint-shop": "إرشاد فاخر للدهانات الداخلية والخارجية للمنازل والمشاريع.",
    saloon: "رحلة صالون راقية من الاستقبال إلى اللمسة النهائية.",
    "car-accessories": "إكسسوارات داخلية فاخرة للسيارات بروح تقنية حديثة."
  }[slug];
}

function localizeItem(item: string) {
  const map: Record<string, string> = {
    "Design coordination": "تنسيق التصميم",
    "Material selection": "اختيار المواد",
    "Automated production": "إنتاج آلي",
    "Quality inspection": "فحص الجودة",
    "Site installation": "تركيب الموقع",
    "Final handover": "التسليم النهائي",
    "Interior wall paints": "دهانات الجدران الداخلية",
    "Exterior protection": "حماية خارجية",
    "Decorative finishes": "تشطيبات ديكورية",
    "Low VOC options": "خيارات منخفضة المركبات العضوية",
    "Color consultation": "استشارة ألوان",
    "Professional finishing": "تشطيب احترافي",
    "Premium hair styling": "تصفيف شعر فاخر",
    "Beard grooming": "عناية اللحية",
    "Facial treatments": "علاجات الوجه",
    "VIP services": "خدمات VIP",
    "Booking support": "دعم الحجز",
    "Customer care": "عناية العملاء",
    "Screen installation": "تركيب الشاشات",
    "Sound systems": "أنظمة الصوت",
    "Interior accessories": "إكسسوارات داخلية",
    "Ambient lighting": "إضاءة محيطية",
    "Smart gadgets": "أجهزة ذكية",
    "Expert installation": "تركيب خبير"
  };
  return map[item] ?? item;
}
