import { notFound } from "next/navigation";
import { Reveal } from "@/components/effects/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { getProject, getProjects } from "@/lib/content";
import { isLocale, locales } from "@/lib/locales";
import type { Locale } from "@/types/content";

export function generateStaticParams() {
  return locales.flatMap((locale) => getProjects(locale).map((project) => ({ locale, id: project.id })));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale: rawLocale, id } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const project = getProject(locale, id);
  if (!project) notFound();

  return (
    <main className="container">
      <section className="hero projectDetailHero">
        <Reveal>
          <p className="eyebrow">{project.value}</p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "الموقع والفئة" : "Location and category"}</p>
            <h2>{project.location}</h2>
            <p>{locale === "ar" ? "تصنيف المشروع" : "Project category"}: {project.category}</p>
          </GlassCard>
        </Reveal>
      </section>
      <section className="section grid two">
        <GlassCard>
          <p className="eyebrow">{locale === "ar" ? "القصة" : "Story"}</p>
          <h2>{project.title}</h2>
          <p>{project.story}</p>
        </GlassCard>
        <GlassCard>
          <p className="eyebrow">{locale === "ar" ? "قبل / بعد" : "Before / after"}</p>
          <h2>{locale === "ar" ? "واجهة مقارنة جاهزة للتوسع." : "A comparison module ready for future media."}</h2>
          <p>{locale === "ar" ? "يمكن ربط صور ما قبل وما بعد من أرشيف المشاريع عند توفرها." : "Before and after media can be connected from the project archive when available."}</p>
        </GlassCard>
      </section>
    </main>
  );
}
