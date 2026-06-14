import { Reveal } from "@/components/effects/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedStats } from "@/features/home/AnimatedStats";
import { HomeHero } from "@/features/home/HomeHero";
import { getCompany } from "@/lib/content";
import { t } from "@/lib/labels";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";
import Image from "next/image";

const services = {
  en: [
    {
      id: "wood-works",
      title: "Wood Works",
      description: "Fire-rated doors, custom joinery, bespoke furniture, architectural cladding, and premium interior fit-outs.",
      image: "/images/wood-wall.webp",
      href: "/services#wood-works"
    },
    {
      id: "steel-works",
      title: "Steel Works",
      description: "Structural steel fabrication, doors & frames, staircases, facades, and industrial fit-out solutions.",
      image: "/images/factory-machine.webp",
      href: "/services#steel-works"
    },
    {
      id: "aluminium-works",
      title: "Aluminium Works",
      description: "Curtain wall systems, window frames, office partitions, composite cladding, and powder-coated finishes.",
      image: "/images/wood-office.webp",
      href: "/services#aluminium-works"
    }
  ],
  ar: [
    {
      id: "wood-works",
      title: "أعمال الخشب",
      description: "أبواب مقاومة للحريق، نجارة مخصصة، أثاث مصمم خصيصاً، كسوة معمارية وأعمال داخلية فاخرة.",
      image: "/images/wood-wall.webp",
      href: "/services#wood-works"
    },
    {
      id: "steel-works",
      title: "أعمال الفولاذ",
      description: "تصنيع هياكل فولاذية، أبواب وإطارات، سلالم، واجهات وحلول التجهيزات الصناعية.",
      image: "/images/factory-machine.webp",
      href: "/services#steel-works"
    },
    {
      id: "aluminium-works",
      title: "أعمال الألمنيوم",
      description: "أنظمة جدار ستائر، إطارات نوافذ، أقسام مكتبية، كسوة مركبة وتشطيبات الطلاء البودري.",
      image: "/images/wood-office.webp",
      href: "/services#aluminium-works"
    }
  ]
};

const whyUs = {
  en: [
    { title: "40+ Years Experience", body: "Established in 1980, Alfarooque has four decades of manufacturing expertise across Saudi Arabia and the GCC." },
    { title: "Industrial Precision", body: "Advanced machinery including CNC routers, beam saws, edge banders, and hot press systems ensure repeatable quality." },
    { title: "Certified Quality", body: "BM TRADA Q-Mark fire door capability, ISO-led quality practices, and stage inspections on every project." },
    { title: "End-to-End Delivery", body: "From design coordination to site installation and final handover — one team, one standard, zero compromise." }
  ],
  ar: [
    { title: "خبرة +40 عاماً", body: "تأسست عام 1980، تمتلك الفاروق أربعة عقود من الخبرة التصنيعية عبر المملكة العربية السعودية ودول الخليج." },
    { title: "دقة صناعية", body: "معدات متقدمة تشمل أجهزة CNC والمناشير الشعاعية وأجهزة تغليف الحواف والمكابس الساخنة لضمان جودة متسقة." },
    { title: "جودة معتمدة", body: "قدرة BM TRADA Q-Mark للأبواب المقاومة للحريق وممارسات الجودة وفق معايير ISO وعمليات التفتيش في كل مرحلة." },
    { title: "تسليم متكامل", body: "من تنسيق التصميم إلى التركيب في الموقع والتسليم النهائي — فريق واحد، معيار واحد، بدون تنازلات." }
  ]
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const company = getCompany(locale);
  const labels = t(locale);
  const serviceItems = services[locale];
  const whyUsItems = whyUs[locale];

  return (
    <main>
      <HomeHero company={company} locale={locale} />

      {/* ── Intro ── */}
      <section className="container section introSection">
        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "شركة تصنيع سعودية" : "Saudi manufacturing company"}
            title={company.tagline}
            body={company.summary}
          />
        </Reveal>
        <AnimatedStats stats={company.stats} />
      </section>

      {/* ── Services ── */}
      <section className="container section">
        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "خدماتنا" : "Our services"}
            title={locale === "ar" ? "ثلاثة تخصصات. معيار واحد." : "Three specialisms. One standard."}
          />
        </Reveal>
        <div className="grid three">
          {serviceItems.map((service) => (
            <Reveal key={service.id}>
              <GlassCard
                className="businessCard card"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ButtonLink href={`/${locale}${service.href}`} variant="ghost">
                  {locale === "ar" ? "اعرف أكثر" : "Learn more"}
                </ButtonLink>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── About split ── */}
      <section className="container section grid two editorialSplit">
        <Reveal>
          <GlassCard className="editorialCard">
            <p className="eyebrow">{locale === "ar" ? "من نحن" : "Who we are"}</p>
            <h2>{locale === "ar" ? "تصنيع سعودي بخبرة أربعة عقود." : "Saudi manufacturing with four decades of operating trust."}</h2>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p>{company.about}</p>
            <strong className="closingLine">Excellent Service • Superior Quality • Reasonable Cost</strong>
          </GlassCard>
        </Reveal>
      </section>

      {/* ── Why us ── */}
      <section className="container section">
        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "لماذا الفاروق" : "Why Alfarooque"}
            title={locale === "ar" ? "الخبرة والدقة والتسليم في كل مشروع." : "Experience, precision, and delivery on every project."}
          />
        </Reveal>
        <div className="grid two">
          {whyUsItems.map((item) => (
            <Reveal key={item.title}>
              <GlassCard className="textCard">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Gallery preview ── */}
      <section className="container section">
        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "أعمالنا" : "Our work"}
            title={locale === "ar" ? "من المصنع إلى الموقع." : "From the factory floor to the finished site."}
          />
        </Reveal>
        <div className="homeGalleryGrid">
          {[
            "/images/gallery/gallery-01.webp",
            "/images/gallery/gallery-04.webp",
            "/images/gallery/gallery-07.webp",
            "/images/gallery/gallery-10.webp",
            "/images/gallery/gallery-13.webp",
            "/images/gallery/gallery-16.webp"
          ].map((src, i) => (
            <div className="homeGalleryItem glass" key={src}>
              <Image src={src} width={420} height={320} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
          <ButtonLink href={`/${locale}/gallery`}>{locale === "ar" ? "مشاهدة جميع الأعمال" : "View Full Gallery"}</ButtonLink>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="container section grid two">
        <Reveal>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "الرؤية" : "Vision"}</p>
            <h2>{locale === "ar" ? "نمو طويل الأمد بانضباط وابتكار." : "Long-term growth through discipline and innovation."}</h2>
            <p>{company.vision.slice(0, 340)}...</p>
            <ButtonLink href={`/${locale}/about`} variant="ghost">{locale === "ar" ? "تعرف علينا" : "About Us"}</ButtonLink>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard className="textCard">
            <p className="eyebrow">{locale === "ar" ? "ابدأ مشروعك" : "Start a project"}</p>
            <h2>{locale === "ar" ? "جاهزون للتعاون في مشروعك القادم." : "Ready to collaborate on your next project."}</h2>
            <p>{locale === "ar" ? "تواصل مع فريقنا لمناقشة متطلباتك والحصول على عرض سعر مخصص لأعمال الخشب والفولاذ والألمنيوم." : "Talk to our team to discuss your requirements and receive a tailored quotation for wood, steel, or aluminium works."}</p>
            <div className="buttonRow">
              <ButtonLink href={`/${locale}/contact`}>{labels.contact}</ButtonLink>
              <ButtonLink href={`/${locale}/services`} variant="ghost">{locale === "ar" ? "الخدمات" : "Our Services"}</ButtonLink>
            </div>
          </GlassCard>
        </Reveal>
      </section>
    </main>
  );
}
