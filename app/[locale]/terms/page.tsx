import { GlassCard } from "@/components/ui/GlassCard";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  return (
    <main className="container">
      <section className="hero">
        <GlassCard>
          <p className="eyebrow">{locale === "ar" ? "الشروط" : "Terms"}</p>
          <h1>{locale === "ar" ? "الشروط والأحكام" : "Terms and Conditions"}</h1>
          <p className="lead">{locale === "ar" ? "صفحة شروط قابلة للتحديث قبل الإطلاق القانوني النهائي." : "A terms page prepared for final legal review before launch."}</p>
        </GlassCard>
      </section>
    </main>
  );
}
