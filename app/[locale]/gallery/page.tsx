import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryExperience } from "@/features/gallery/GalleryExperience";
import { getGallery } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const gallery = getGallery(locale);
  return (
    <main className="container">
      <section className="hero">
        <Reveal>
          <p className="eyebrow">{locale === "ar" ? "تجربة مرئية" : "Immersive gallery"}</p>
          <h1>{locale === "ar" ? "صور من المصانع والمتاجر والخدمات." : "Visuals from factories, retail, and service experiences."}</h1>
          <p className="lead">{locale === "ar" ? "معرض قابل للتصفية مع عرض ضوئي لكل فئة." : "A filterable masonry gallery with lightbox viewing by category."}</p>
        </Reveal>
      </section>
      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "المعرض" : "Gallery"} title={locale === "ar" ? "استكشف المواد والمساحات والتجارب." : "Explore materials, spaces, and experiences."} />
        <GalleryExperience items={gallery} locale={locale} />
      </section>
    </main>
  );
}
