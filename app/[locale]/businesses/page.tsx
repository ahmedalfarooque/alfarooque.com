import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessList } from "@/features/businesses/BusinessList";
import { getBusinesses } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function BusinessesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const businesses = getBusinesses(locale);
  return (
    <main className="container">
      <section className="hero">
        <Reveal>
          <p className="eyebrow">{locale === "ar" ? "منظومة الأعمال" : "Business ecosystem"}</p>
          <h1>{locale === "ar" ? "دليل مؤسسي واضح لشركات المجموعة." : "A clear corporate directory for every group company."}</h1>
          <p className="lead">{locale === "ar" ? "تصفح الشركات بسرعة من خلال صفوف مختصرة تعرض النشاط والوصف وخيار الاستكشاف." : "Scan each business quickly through compact rows with category, description, and a direct exploration path."}</p>
        </Reveal>
      </section>
      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "الشركات" : "Subsidiaries"} title={locale === "ar" ? "عرض قائمة سريع ومناسب للأعمال." : "A fast, enterprise-ready list view."} />
        <BusinessList businesses={businesses} locale={locale} />
      </section>
    </main>
  );
}
