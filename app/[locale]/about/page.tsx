import { Reveal } from "@/components/effects/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedStats } from "@/features/home/AnimatedStats";
import { getCompany } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const company = getCompany(locale);

  return (
    <main className="container">
      <section className="hero aboutHero">
        <Reveal>
          <p className="eyebrow">{locale === "ar" ? "عن القابضة" : "About Holding"}</p>
          <h1>{locale === "ar" ? "منظومة سعودية خاصة تقود الجودة عبر قطاعات متعددة." : "A Saudi private holding ecosystem built around quality across sectors."}</h1>
          <p className="lead">{company.about}</p>
          <strong className="closingLine">Excellent Service • Superior Quality • Reasonable Cost</strong>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "الرؤية المؤسسية" : "Corporate vision"}</p>
            <h2>{company.tagline}</h2>
            <p>{company.vision}</p>
          </GlassCard>
        </Reveal>
      </section>

      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "خط زمني" : "Interactive timeline"} title={locale === "ar" ? "محطات صنعت منظومة الأعمال." : "Milestones that shaped the business ecosystem."} />
        <div className="timeline">
          {company.timeline.map((item) => (
            <Reveal key={item.year}>
              <GlassCard className="timelineItem">
                <strong>{item.year}</strong>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section grid two">
        <GlassCard className="textCard">
          <p className="eyebrow">{locale === "ar" ? "الرسالة" : "Mission"}</p>
          <h2>{locale === "ar" ? "خدمة موثوقة وجودة قابلة للقياس." : "Reliable service and measurable quality."}</h2>
          <p>{company.mission}</p>
        </GlassCard>
        <GlassCard className="textCard">
          <p className="eyebrow">{locale === "ar" ? "القيادة والحوكمة" : "Leadership and governance"}</p>
          <h2>{locale === "ar" ? "رؤية مؤسس تتحول إلى انضباط تشغيلي." : "Founder vision translated into operating discipline."}</h2>
          <p>{company.leadershipEssay}</p>
        </GlassCard>
      </section>

      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "القيم" : "Values"} title={locale === "ar" ? "مبادئ واضحة لتجربة أعمال طويلة الأمد." : "Clear principles for long-term business confidence."} />
        <div className="grid three">
          {company.values.map((value) => (
            <GlassCard key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "الثقة المؤسسية" : "Corporate confidence"} title={locale === "ar" ? "قدرة صنعتها الخبرة والشراكات." : "Capability shaped by experience and partnerships."} body={company.confidence} />
        <AnimatedStats stats={company.confidenceStats ?? company.stats} />
      </section>
    </main>
  );
}
