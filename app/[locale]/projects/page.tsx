import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectFilter } from "@/features/projects/ProjectFilter";
import { getProjects } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const projects = getProjects(locale);
  return (
    <main className="container">
      <section className="hero">
        <Reveal>
          <p className="eyebrow">{locale === "ar" ? "سجل المشاريع" : "Corporate project register"}</p>
          <h1>{locale === "ar" ? "محفظة واضحة تركز على الاسم والفئة والموقع." : "A clean portfolio focused on project, category, location, and scope."}</h1>
          <p className="lead">{locale === "ar" ? "تم تصميم هذه الصفحة كقائمة مؤسسية بدون صور لإبراز المعلومات التشغيلية بوضوح." : "This page is intentionally presented without project imagery so operational references remain clear, fast, and professional."}</p>
        </Reveal>
      </section>
      <section className="section">
        <SectionHeading eyebrow={locale === "ar" ? "تصفية المشاريع" : "Project filters"} title={locale === "ar" ? "قائمة قابلة للتصفية حسب النشاط." : "A filterable register by business line."} />
        <ProjectFilter projects={projects} locale={locale} />
      </section>
    </main>
  );
}
