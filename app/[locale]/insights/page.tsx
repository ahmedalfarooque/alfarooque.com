import { Reveal } from "@/components/effects/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getInsights } from "@/lib/content";
import { t } from "@/lib/labels";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const insights = getInsights(locale);
  const labels = t(locale);
  return (
    <main className="container">
      <section className="hero">
        <Reveal>
          <p className="eyebrow">{labels.insights}</p>
          <h1>{locale === "ar" ? "تحديثات مؤسسية ورؤى صناعية." : "Corporate updates and industry insights."}</h1>
          <p className="lead">{locale === "ar" ? "نظام محتوى قابل للتوسع للإعلانات والمقالات." : "A scalable content system for announcements, updates, and thought leadership."}</p>
        </Reveal>
      </section>
      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "المقالات" : "Articles"} title={locale === "ar" ? "أخبار المجموعة واتجاهات الصناعة." : "Group news and sector thinking."} />
        <div className="grid three">
          {insights.map((insight) => (
            <GlassCard key={insight.slug}>
              <p className="eyebrow">{insight.category}</p>
              <h3>{insight.title}</h3>
              <p>{insight.summary}</p>
              <ButtonLink href={`/${locale}/insights/${insight.slug}`} variant="ghost">
                {labels.readMore}
              </ButtonLink>
            </GlassCard>
          ))}
        </div>
      </section>
    </main>
  );
}
