import Image from "next/image";
import { Reveal } from "@/components/effects/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MachineGallery } from "@/features/businesses/MachineGallery";
import { getMachinery } from "@/lib/content";
import { isLocale } from "@/lib/locales";
import type { Locale } from "@/types/content";

const woodCapabilities = {
  en: [
    { title: "Fire-Rated Doors", body: "BM TRADA Q-Mark certified fire-rated door production for hospitality, healthcare, and commercial projects." },
    { title: "Custom Joinery & Cabinets", body: "Wardrobes, kitchen cabinets, wall units, entertainment systems, and precision-fit joinery solutions." },
    { title: "Architectural Cladding", body: "Wall cladding, column wrapping, ceiling treatments, and decorative panels for luxury interiors." },
    { title: "Bespoke Furniture", body: "Custom furniture design and production — dining sets, office suites, reception desks, and hospitality fit-outs." },
    { title: "Veneer & Laminate Work", body: "Premium veneer application, laminate pressing, and surface treatments for refined architectural results." },
    { title: "Installation & Handover", body: "On-site installation coordination, site supervision, snagging, and professional project handover." }
  ],
  ar: [
    { title: "أبواب مقاومة للحريق", body: "إنتاج أبواب مقاومة للحريق بشهادة BM TRADA Q-Mark للضيافة والرعاية الصحية والمشاريع التجارية." },
    { title: "نجارة وخزائن مخصصة", body: "خزائن ملابس، خزائن مطبخ، وحدات جدارية، أنظمة ترفيه وحلول نجارة دقيقة." },
    { title: "كسوة معمارية", body: "كسوة جدران، تغليف أعمدة، معالجة أسقف وألواح زخرفية للديكورات الفاخرة." },
    { title: "أثاث مخصص", body: "تصميم وإنتاج أثاث مخصص — طقم طعام، مكاتب، طاولات استقبال وتجهيزات ضيافة." },
    { title: "أعمال القشرة والبلاستيك الميلامين", body: "تطبيق قشرة خشبية فاخرة، ضغط الميلامين ومعالجات الأسطح للنتائج المعمارية المتطورة." },
    { title: "التركيب والتسليم", body: "تنسيق التركيب في الموقع، الإشراف الميداني، إجراءات القبول والتسليم المهني للمشاريع." }
  ]
};

const steelCapabilities = {
  en: [
    { title: "Structural Steel Fabrication", body: "Beams, columns, frames, trusses, and structural elements for commercial and industrial construction." },
    { title: "Steel Doors & Frames", body: "Heavy-duty steel door frames, security doors, and industrial access solutions for demanding applications." },
    { title: "Metal Staircases & Railings", body: "Architectural staircases, balustrades, handrails, and safety railings with premium finish standards." },
    { title: "Steel Cladding & Facades", body: "Exterior steel cladding panels, architectural facades, and decorative metal screening systems." },
    { title: "Industrial Steel Furniture", body: "Workshop benches, storage racks, shelving systems, and custom steel furniture for industrial environments." },
    { title: "Welding & Fabrication Services", body: "MIG, TIG and arc welding, custom steel fabrication, surface preparation, and protective coating." }
  ],
  ar: [
    { title: "تصنيع هياكل فولاذية", body: "عوارض وأعمدة وإطارات وجمالونات وعناصر هيكلية للبناء التجاري والصناعي." },
    { title: "أبواب وإطارات فولاذية", body: "إطارات أبواب فولاذية ثقيلة وأبواب أمنية وحلول الدخول الصناعية للتطبيقات الصعبة." },
    { title: "سلالم ودرابزين فولاذي", body: "سلالم معمارية وحواجز وإمساكيات ودرابزين السلامة بمعايير تشطيب فاخرة." },
    { title: "كسوة وواجهات فولاذية", body: "ألواح كسوة خارجية فولاذية وواجهات معمارية وأنظمة شاشات معدنية زخرفية." },
    { title: "أثاث فولاذي صناعي", body: "مناضد ورشة وأرفف تخزين وأنظمة رفوف وأثاث فولاذي مخصص للبيئات الصناعية." },
    { title: "خدمات اللحام والتصنيع", body: "لحام MIG وTIG والقوس الكهربائي وتصنيع فولاذ مخصص وإعداد السطح والطلاء الواقي." }
  ]
};

const aluminiumCapabilities = {
  en: [
    { title: "Aluminium Window Systems", body: "Precision-engineered aluminium window frames — casement, sliding, fixed, and tilt-and-turn configurations." },
    { title: "Curtain Wall Facades", body: "Full-height curtain wall glazing systems for office towers, hotels, and large commercial buildings." },
    { title: "Aluminium Doors & Entrances", body: "Sliding doors, swing doors, automatic entrance systems, and decorative aluminium door frames." },
    { title: "Partitions & Office Systems", body: "Demountable aluminium partitions, glass partition systems, and modular office fit-out solutions." },
    { title: "Cladding & Composite Panels", body: "ACM cladding, aluminium composite panel facades, and rainscreen cladding for exterior finishes." },
    { title: "Powder Coating & Anodizing", body: "In-house colour matching, powder coat finishes, anodized treatments, and custom surface options." }
  ],
  ar: [
    { title: "أنظمة نوافذ ألمنيوم", body: "إطارات نوافذ ألمنيوم مصممة بدقة — تكوينات مفصلية ومنزلقة وثابتة وقابلة للإمالة والفتح." },
    { title: "واجهات جدار ستائر", body: "أنظمة تزجيج جدار ستائر بارتفاع كامل لمكاتب الأبراج والفنادق والمباني التجارية الكبيرة." },
    { title: "أبواب ومداخل ألمنيوم", body: "أبواب انزلاقية وأبواب دوارة وأنظمة مداخل أوتوماتيكية وإطارات أبواب ألمنيوم زخرفية." },
    { title: "أقسام وأنظمة مكتبية", body: "أقسام ألمنيوم قابلة للتفكيك وأنظمة أقسام زجاجية وحلول تجهيز مكتبية معيارية." },
    { title: "كسوة وألواح مركبة", body: "كسوة ACM وواجهات ألواح ألمنيوم مركبة وكسوة شاشة مطر للتشطيبات الخارجية." },
    { title: "الطلاء البودري والأنودة", body: "مطابقة الألوان الداخلية وتشطيبات الطلاء البودري والمعالجات الأنودية وخيارات السطح المخصصة." }
  ]
};

const woodStats = [
  { value: "40+", label: "Years Experience" },
  { value: "500+", label: "Wood Projects Delivered" },
  { value: "12", label: "Production Machines" },
  { value: "FD60", label: "Fire Door Certified" }
];

const steelStats = [
  { value: "100+", label: "Steel Projects" },
  { value: "3", label: "Welding Grades" },
  { value: "Heavy", label: "Structural Capacity" },
  { value: "GCC", label: "Material Sourcing" }
];

const aluminiumStats = [
  { value: "200+", label: "Façade Projects" },
  { value: "RAL", label: "Any Colour Available" },
  { value: "High", label: "Thermal Performance" },
  { value: "Custom", label: "Profile Systems" }
];

const woodProcess = {
  en: ["Design & Specification", "Material Procurement", "CNC Cutting & Shaping", "Edge Banding & Drilling", "Sanding & Surface Prep", "Painting & Finishing", "Assembly & QC", "Site Installation"],
  ar: ["التصميم والمواصفات", "توريد المواد", "القطع والتشكيل CNC", "تغليف الحواف والحفر", "السنفرة وتحضير السطح", "الطلاء والتشطيب", "التجميع وضبط الجودة", "التركيب في الموقع"]
};

const steelProcess = {
  en: ["Engineering Design", "Steel Procurement", "Cutting & Profiling", "Welding & Assembly", "Surface Preparation", "Priming & Painting", "Quality Inspection", "Delivery & Erection"],
  ar: ["التصميم الهندسي", "توريد الفولاذ", "القطع والتنميط", "اللحام والتجميع", "تحضير السطح", "التأسيس والطلاء", "فحص الجودة", "التسليم والنصب"]
};

const aluminiumProcess = {
  en: ["Façade Design", "Profile Selection", "Extrusion & Cutting", "Powder Coating", "Glazing & Assembly", "Waterproofing", "Site Installation", "Testing & Handover"],
  ar: ["تصميم الواجهة", "اختيار البروفايل", "البثق والقطع", "الطلاء البودري", "التزجيج والتجميع", "العزل المائي", "التركيب في الموقع", "الاختبار والتسليم"]
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale = (isLocale(rawLocale) ? rawLocale : "en") as Locale;
  const machinery = getMachinery(locale);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="container premiumHero servicesHero">
        <div className="servicesHeroBg" />
        <div className="heroGlass glass servicesHeroGlass">
          <div className="heroCopy">
            <Reveal>
              <p className="eyebrow">{locale === "ar" ? "قدرات التصنيع" : "Manufacturing capabilities"}</p>
              <h1 className="gradientTitle">
                {locale === "ar" ? (
                  <>أعمال الخشب والفولاذ<br /><span>والألمنيوم.</span></>
                ) : (
                  <>Wood, Steel<br />& <span>Aluminium.</span></>
                )}
              </h1>
              <p className="lead">
                {locale === "ar"
                  ? "نصنع بدقة صناعية ونسلم بجودة معمارية — ثلاثة تخصصات تحت معيار واحد."
                  : "We manufacture with industrial precision and deliver to architectural quality — three specialisms under one standard."}
              </p>
              <div className="buttonRow">
                <ButtonLink href={`/${locale}/contact`}>{locale === "ar" ? "اطلب عرضاً" : "Request a Quote"}</ButtonLink>
                <ButtonLink href="#wood-works" variant="ghost">{locale === "ar" ? "استكشف الخدمات" : "Explore Services"}</ButtonLink>
              </div>
            </Reveal>
          </div>
          <div className="heroVisual glass servicesHeroVisual">
            <Image src="/images/home/slide-1.webp" width={720} height={540} alt="Manufacturing" priority />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WOOD WORKS
      ══════════════════════════════════════════════ */}
      <section id="wood-works" className="container section serviceSection businessSkin businessSkin-wooden-industries">
        <Reveal>
          <div className="serviceSectionHeader">
            <span className="serviceNumber">01</span>
            <div>
              <p className="eyebrow">{locale === "ar" ? "الصناعات الخشبية" : "Wooden industries"}</p>
              <h2>{locale === "ar" ? "أعمال الخشب" : "Wood Works"}</h2>
              <p className="lead">
                {locale === "ar"
                  ? "تصنيع خشبي معماري متقدم — أبواب مقاومة للحريق، نجارة، أثاث مخصص وأعمال داخلية فاخرة."
                  : "Advanced architectural wood manufacturing — fire-rated doors, joinery, bespoke furniture, and luxury interior fit-outs."}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid three serviceCapGrid">
          {woodCapabilities[locale].map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <GlassCard className="serviceCapCard">
                <span className="capabilityNumber">0{i + 1}</span>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="serviceStats">
          {woodStats.map((stat) => (
            <GlassCard className="serviceStatCard" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </GlassCard>
          ))}
        </div>

        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "خط الإنتاج" : "Production process"}
            title={locale === "ar" ? "من المادة الخام إلى العنصر المعماري." : "From raw material to finished architectural element."}
          />
        </Reveal>
        <div className="processTrack">
          {woodProcess[locale].map((step, i) => (
            <div className="processStep glass" key={step}>
              <span className="processNum">{String(i + 1).padStart(2, "0")}</span>
              <span className="processLabel">{step}</span>
            </div>
          ))}
        </div>

        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "معدات الإنتاج" : "Production equipment"}
            title={locale === "ar" ? "معدات متقدمة تدعم الدقة والتشطيب." : "Advanced machinery supporting precision, repeatability, and refined finishes."}
          />
        </Reveal>
        <MachineGallery machines={machinery} locale={locale} />

        <div className="serviceCta glass">
          <div>
            <h3>{locale === "ar" ? "مشروع خشبي في ذهنك؟" : "Have a wood works project in mind?"}</h3>
            <p>{locale === "ar" ? "تواصل معنا للحصول على عرض سعر مخصص لمشروعك." : "Get in touch for a tailored quotation for your project."}</p>
          </div>
          <ButtonLink href={`/${locale}/contact`}>{locale === "ar" ? "اطلب عرضاً" : "Request a Quote"}</ButtonLink>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STEEL WORKS
      ══════════════════════════════════════════════ */}
      <section id="steel-works" className="container section serviceSection serviceSection--steel">
        <Reveal>
          <div className="serviceSectionHeader">
            <span className="serviceNumber">02</span>
            <div>
              <p className="eyebrow">{locale === "ar" ? "أعمال الفولاذ" : "Steel fabrication"}</p>
              <h2>{locale === "ar" ? "أعمال الفولاذ" : "Steel Works"}</h2>
              <p className="lead">
                {locale === "ar"
                  ? "تصنيع فولاذي هيكلي ومعماري — إطارات، أبواب، درابزين، واجهات وتجهيزات صناعية."
                  : "Structural and architectural steel fabrication — frames, doors, railings, facades, and industrial fit-outs."}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid three serviceCapGrid">
          {steelCapabilities[locale].map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <GlassCard className="serviceCapCard serviceCapCard--steel">
                <span className="capabilityNumber" style={{ color: "var(--muted)" }}>0{i + 1}</span>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="serviceStats">
          {steelStats.map((stat) => (
            <GlassCard className="serviceStatCard" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </GlassCard>
          ))}
        </div>

        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "عملية التصنيع" : "Fabrication process"}
            title={locale === "ar" ? "من التصميم الهندسي إلى التسليم." : "From engineering design to on-site erection."}
          />
        </Reveal>
        <div className="processTrack">
          {steelProcess[locale].map((step, i) => (
            <div className="processStep glass" key={step}>
              <span className="processNum">{String(i + 1).padStart(2, "0")}</span>
              <span className="processLabel">{step}</span>
            </div>
          ))}
        </div>

        <div className="serviceFeaturesGrid">
          <GlassCard className="serviceFeatureCard">
            <Image src="/images/home/slide-2.webp" width={640} height={420} alt="Steel manufacturing" />
            <div>
              <h3>{locale === "ar" ? "قدرة هيكلية ثقيلة" : "Heavy structural capacity"}</h3>
              <p>{locale === "ar" ? "نتعامل مع المشاريع الكبيرة الحجم — من الأبراج التجارية إلى المنشآت الصناعية." : "We handle large-scale projects — from commercial towers to industrial facilities."}</p>
            </div>
          </GlassCard>
          <GlassCard className="serviceFeatureCard">
            <Image src="/images/home/slide-3.webp" width={640} height={420} alt="Steel precision" />
            <div>
              <h3>{locale === "ar" ? "دقة في التنفيذ" : "Precision in execution"}</h3>
              <p>{locale === "ar" ? "معايير لحام مشددة وفحص جودة منهجي في كل مرحلة من مراحل التصنيع." : "Strict welding standards and systematic quality checks at every fabrication stage."}</p>
            </div>
          </GlassCard>
        </div>

        <div className="serviceCta glass">
          <div>
            <h3>{locale === "ar" ? "متطلبات فولاذية؟" : "Have a steel works requirement?"}</h3>
            <p>{locale === "ar" ? "تحدث مع فريقنا الهندسي للحصول على عرض سعر." : "Speak with our engineering team for a competitive quotation."}</p>
          </div>
          <ButtonLink href={`/${locale}/contact`}>{locale === "ar" ? "اطلب عرضاً" : "Request a Quote"}</ButtonLink>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ALUMINIUM WORKS
      ══════════════════════════════════════════════ */}
      <section id="aluminium-works" className="container section serviceSection serviceSection--aluminium">
        <Reveal>
          <div className="serviceSectionHeader">
            <span className="serviceNumber">03</span>
            <div>
              <p className="eyebrow">{locale === "ar" ? "أعمال الألمنيوم" : "Aluminium systems"}</p>
              <h2>{locale === "ar" ? "أعمال الألمنيوم" : "Aluminium Works"}</h2>
              <p className="lead">
                {locale === "ar"
                  ? "أنظمة ألمنيوم معمارية — نوافذ، واجهات، أقسام مكتبية وكسوة مركبة."
                  : "Architectural aluminium systems — windows, curtain walls, office partitions, and composite cladding."}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid three serviceCapGrid">
          {aluminiumCapabilities[locale].map((cap, i) => (
            <Reveal key={cap.title} delay={i * 0.05}>
              <GlassCard className="serviceCapCard serviceCapCard--aluminium">
                <span className="capabilityNumber" style={{ color: "var(--emerald)" }}>0{i + 1}</span>
                <h3>{cap.title}</h3>
                <p>{cap.body}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        <div className="serviceStats">
          {aluminiumStats.map((stat) => (
            <GlassCard className="serviceStatCard serviceStatCard--aluminium" key={stat.label}>
              <strong style={{ color: "var(--emerald)" }}>{stat.value}</strong>
              <span>{stat.label}</span>
            </GlassCard>
          ))}
        </div>

        <Reveal>
          <SectionHeading
            eyebrow={locale === "ar" ? "عملية التصنيع" : "Fabrication process"}
            title={locale === "ar" ? "من التصميم إلى الاختبار والتسليم." : "From façade design to testing and handover."}
          />
        </Reveal>
        <div className="processTrack">
          {aluminiumProcess[locale].map((step, i) => (
            <div className="processStep glass processStep--aluminium" key={step}>
              <span className="processNum">{String(i + 1).padStart(2, "0")}</span>
              <span className="processLabel">{step}</span>
            </div>
          ))}
        </div>

        <div className="serviceFeaturesGrid">
          <GlassCard className="serviceFeatureCard">
            <Image src="/images/home/slide-4.webp" width={640} height={420} alt="Aluminium works" />
            <div>
              <h3>{locale === "ar" ? "طلاء بودري بأي لون RAL" : "Powder coating in any RAL colour"}</h3>
              <p>{locale === "ar" ? "تشطيبات مخصصة لتتطابق مع أي متطلبات تصميم أو هوية بصرية." : "Custom finishes to match any design requirement or brand identity."}</p>
            </div>
          </GlassCard>
          <GlassCard className="serviceFeatureCard">
            <Image src="/images/home/slide-1.webp" width={640} height={420} alt="Curtain wall" />
            <div>
              <h3>{locale === "ar" ? "أنظمة جدار ستائر" : "Curtain wall systems"}</h3>
              <p>{locale === "ar" ? "تزجيج كامل الارتفاع للمباني التجارية والفندقية بمعايير أداء حرارية عالية." : "Full-height glazing for commercial and hospitality buildings with high thermal performance standards."}</p>
            </div>
          </GlassCard>
        </div>

        <div className="serviceCta glass">
          <div>
            <h3>{locale === "ar" ? "مشروع ألمنيوم؟" : "Have an aluminium works project?"}</h3>
            <p>{locale === "ar" ? "تواصل مع فريقنا للحصول على استشارة مجانية وعرض سعر." : "Contact our team for a free consultation and competitive quotation."}</p>
          </div>
          <ButtonLink href={`/${locale}/contact`}>{locale === "ar" ? "اطلب عرضاً" : "Request a Quote"}</ButtonLink>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="container section">
        <GlassCard className="servicesMasterCta">
          <Reveal>
            <p className="eyebrow">{locale === "ar" ? "ابدأ مشروعك" : "Start your project"}</p>
            <h2>{locale === "ar" ? "خبرة متكاملة في الخشب والفولاذ والألمنيوم." : "Integrated expertise across wood, steel, and aluminium."}</h2>
            <p>{locale === "ar" ? "تواصل مع فريقنا لمناقشة متطلباتك والحصول على عرض سعر مخصص." : "Talk to our team to discuss your requirements and receive a tailored quotation."}</p>
            <div className="buttonRow">
              <ButtonLink href={`/${locale}/contact`}>{locale === "ar" ? "اطلب عرضاً" : "Request a Quote"}</ButtonLink>
              <ButtonLink href={`/${locale}/gallery`} variant="ghost">{locale === "ar" ? "مشاهدة الأعمال" : "View Our Work"}</ButtonLink>
            </div>
          </Reveal>
        </GlassCard>
      </section>
    </main>
  );
}
