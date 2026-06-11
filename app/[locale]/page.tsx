import { Reveal } from "@/components/effects/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BusinessList } from "@/features/businesses/BusinessList";
import { AnimatedStats } from "@/features/home/AnimatedStats";
import { HomeHero } from "@/features/home/HomeHero";
import { getBusinesses, getCompany, getInsights, getProjects } from "@/lib/content";
import { t } from "@/lib/labels";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const company = getCompany(locale);
  const businesses = getBusinesses(locale);
  const projects = getProjects(locale);
  const insights = getInsights(locale);
  const labels = t(locale);

  return (
    <main>
      <HomeHero company={company} locale={locale} />

      <section className="container section introSection">
        <Reveal>
          <SectionHeading eyebrow={locale === "ar" ? "شركة قابضة سعودية خاصة" : "Saudi private holding company"} title={company.tagline} body={company.summary} />
        </Reveal>
        <AnimatedStats stats={company.stats} />
      </section>

      <section className="container section grid two editorialSplit">
        <Reveal>
          <GlassCard className="editorialCard">
            <p className="eyebrow">{locale === "ar" ? "من نحن" : "Who we are"}</p>
            <h2>{locale === "ar" ? "خبرة عائلية ممتدة ومنظومة أعمال متنوعة." : "A diversified family enterprise with four decades of operating trust."}</h2>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p>{company.about}</p>
            <strong className="closingLine">Excellent Service • Superior Quality • Reasonable Cost</strong>
          </GlassCard>
        </Reveal>
      </section>

      <section className="container section">
        <Reveal>
          <SectionHeading eyebrow={labels.businessEcosystem} title={locale === "ar" ? "أعمال متخصصة تحت معيار مؤسسي واحد." : "Specialized businesses under one corporate standard."} />
        </Reveal>
        <BusinessList businesses={businesses} locale={locale} />
      </section>

      <section className="container section grid two">
        <Reveal>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "الرؤية" : "Vision"}</p>
            <h2>{locale === "ar" ? "نمو طويل الأمد بتوازن بين الاستثمار والابتكار." : "Long-term growth balanced by investment discipline and innovation."}</h2>
            <p>{company.vision}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "القيادة" : "Leadership"}</p>
            <h2>{locale === "ar" ? "حوكمة عملية وقيم جودة راسخة." : "Practical governance with enduring quality values."}</h2>
            <p>{company.leadershipEssay}</p>
          </GlassCard>
        </Reveal>
      </section>

      <section className="container section">
        <Reveal>
          <SectionHeading eyebrow={locale === "ar" ? "الثقة المؤسسية" : "Corporate confidence"} title={locale === "ar" ? "أرقام تعكس الاستمرارية والقدرة." : "Signals of continuity, capability, and customer trust."} body={company.confidence} />
        </Reveal>
        <AnimatedStats stats={company.confidenceStats ?? company.stats} />
      </section>

      <section className="container section">
        <Reveal>
          <SectionHeading eyebrow={labels.featuredProjects} title={locale === "ar" ? "مراجع مختارة بدون ازدحام بصري." : "Selected project references without visual clutter."} />
        </Reveal>
        <div className="projectList compact">
          {projects.slice(0, 4).map((project) => (
            <GlassCard className="projectRow" key={project.id}>
              <div>
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <span>{project.location}</span>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="container section">
        <Reveal>
          <SectionHeading eyebrow={labels.insights} title={locale === "ar" ? "تحديثات وأفكار من منظومة الفاروق." : "Updates and thinking from the Alfarooque ecosystem."} />
        </Reveal>
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
