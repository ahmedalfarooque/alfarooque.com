import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { getInsight, getInsights } from "@/lib/content";
import { isLocale, locales } from "@/lib/locales";
import type { Locale } from "@/types/content";

export function generateStaticParams() {
  return locales.flatMap((locale) => getInsights(locale).map((insight) => ({ locale, slug: insight.slug })));
}

export default async function InsightDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: rawLocale, slug } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const insight = getInsight(locale, slug);
  if (!insight) notFound();
  return (
    <main className="container">
      <section className="hero">
        <GlassCard>
          <p className="eyebrow">{insight.category} · {insight.date}</p>
          <h1>{insight.title}</h1>
          <p className="lead">{insight.summary}</p>
        </GlassCard>
      </section>
      <section className="section">
        <GlassCard>
          <p className="lead">{insight.body}</p>
        </GlassCard>
      </section>
    </main>
  );
}
