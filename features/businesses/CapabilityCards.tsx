"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { acquireOverlayLock, releaseOverlayLock } from "@/lib/overlayLock";
import type { Locale } from "@/types/content";

type Capability = {
  title: string;
  body: string;
};

type CapabilityDetail = {
  overview: string;
  role: string;
  importance: string;
  benefits: string[];
  usage: string;
};

const labels = {
  en: {
    open: "Open capability details",
    close: "Close capability modal",
    overview: "Capability overview",
    role: "Role in craftsmanship",
    importance: "Technical importance",
    benefits: "Benefits",
    usage: "Project usage"
  },
  ar: {
    open: "فتح تفاصيل القدرة",
    close: "إغلاق نافذة القدرة",
    overview: "نظرة عامة",
    role: "الدور في الحرفية",
    importance: "الأهمية التشغيلية",
    benefits: "الفوائد",
    usage: "الاستخدام في المشاريع"
  }
} as const;

const details: Record<Locale, Record<string, CapabilityDetail>> = {
  en: {
    "Manufacturing capabilities": {
      overview: "This capability represents the complete production foundation behind Ismail Alfarooque Wooden Industries, combining automated cutting, edge finishing, sanding, veneer preparation, hot pressing, boring, mortising, profiling, and installation support within one coordinated workflow.",
      role: "In luxury architectural craftsmanship, manufacturing capability is not only about machines. It is the discipline of translating drawings, material specifications, site conditions, and finish expectations into precise components that can be repeated, assembled, and installed with confidence.",
      importance: "The operational value comes from controlling each stage before the work reaches site. Automated cutting improves dimensional accuracy, edge finishing protects visible surfaces, sanding prepares premium finishes, and boring or mortising supports dependable hardware installation.",
      benefits: ["Improves dimensional precision across repeated components", "Supports durable joinery, clean edges, and refined finishes", "Reduces site rework through better workshop preparation", "Creates a reliable production path for custom interiors and architectural woodwork"],
      usage: "This capability is used for cabinets, wardrobes, counters, wall cladding, custom furniture, hospitality elements, and project-specific joinery where accuracy, finish quality, and installation readiness matter."
    },
    "Machinery and technology": {
      overview: "The technology base includes specialist woodworking assets such as SCM edge banding, throughfeed moulding, wide belt sanding, beam saw cutting, boring systems, ORMA hot presses, Centauro mortising, and Casati veneer preparation equipment.",
      role: "For premium architectural work, technology gives craftsmanship the stability it needs. It helps skilled teams produce sophisticated details while maintaining the consistency expected in commercial, residential, healthcare, hospitality, and institutional interiors.",
      importance: "Dedicated equipment improves repeatability, controls production tolerances, and supports complex material handling. It also allows the workshop to separate cutting, bonding, surface preparation, profiling, and finishing into clearer quality checkpoints.",
      benefits: ["Enables industrial precision without losing custom flexibility", "Supports veneer, laminate, solid wood, and panel-based workflows", "Improves speed and consistency for project-scale production", "Creates measurable checkpoints for quality control and finishing readiness"],
      usage: "Technology is applied across doors, frames, cabinetry, wall systems, counters, and bespoke joinery where design intent requires a disciplined production environment rather than purely manual fabrication."
    },
    Products: {
      overview: "The product range covers fire-rated doors, non-fire-rated doors, frames, wardrobes, cabinets, counters, wall cladding, office joinery, custom furniture, and hospitality fit-out elements designed for practical use and refined presentation.",
      role: "Product development is where industrial production and architectural expression meet. Each item must satisfy function, durability, finish quality, and design continuity while fitting the requirements of its final environment.",
      importance: "Well-defined product categories allow the workshop to plan materials, hardware, finishing systems, production sequencing, and installation requirements with greater accuracy. This supports better coordination between design, manufacturing, and site teams.",
      benefits: ["Provides a broad architectural woodwork scope from doors to interiors", "Supports both standard requirements and bespoke project details", "Improves coordination between client needs and production planning", "Helps maintain consistent quality across different project types"],
      usage: "These products are used in residential interiors, commercial offices, hotels, healthcare environments, retail spaces, and project fit-outs where robust construction and premium appearance are both required."
    },
    "Quality standards": {
      overview: "Quality standards bring structure to every stage of the workshop process, including BM TRADA Q-Mark fire-door capability, ISO-led quality practices, raw-material controls, stage inspections, and site installation coordination.",
      role: "In luxury industrial craftsmanship, quality is the system that protects the final result. It connects material verification, production accuracy, finishing discipline, and installation checks into one continuous assurance process.",
      importance: "Stage inspections help identify issues before they become costly site problems. Fire-door capability and ISO-led practices also support documentation, consistency, accountability, and confidence for clients working on regulated or high-value projects.",
      benefits: ["Strengthens trust through documented quality practices", "Supports safer and more dependable fire-door workflows", "Improves consistency from raw material to final handover", "Reduces risk during installation and project completion"],
      usage: "Quality standards are applied throughout manufacturing and installation for doors, joinery, cabinetry, fit-out elements, and architectural interiors that require reliable performance and professional handover."
    }
  },
  ar: {
    "قدرات التصنيع": {
      overview: "تمثل هذه القدرة الأساس الإنتاجي الكامل لشركة إسماعيل الفاروق للصناعات الخشبية، حيث تجمع بين القص الآلي وتشطيب الحواف والصنفرة وتجهيز القشرة والكبس الحراري والتخريم والتعشيق والتشكيل ودعم التركيب ضمن سير عمل واحد.",
      role: "في الحرفية المعمارية الفاخرة لا تعني القدرة التصنيعية وجود المعدات فقط، بل تعني تحويل الرسومات والمواصفات وظروف الموقع وتوقعات التشطيب إلى مكونات دقيقة قابلة للتكرار والتجميع والتركيب بثقة.",
      importance: "تأتي القيمة التشغيلية من ضبط كل مرحلة قبل وصول العمل إلى الموقع. فالقص الآلي يحسن دقة الأبعاد، وتشطيب الحواف يحمي الأسطح الظاهرة، والصنفرة تجهز التشطيبات الفاخرة، بينما يدعم التخريم والتعشيق تركيب الإكسسوارات بثبات.",
      benefits: ["تحسين دقة الأبعاد في المكونات المتكررة", "دعم نجارة متينة وحواف نظيفة وتشطيبات راقية", "تقليل إعادة العمل في الموقع عبر تحضير أفضل داخل الورشة", "إنشاء مسار إنتاج موثوق للديكورات الداخلية والأعمال الخشبية المعمارية"],
      usage: "تستخدم هذه القدرة في الخزائن والدواليب والعدادات والكسوات الخشبية والأثاث الخاص وعناصر الضيافة وأعمال النجارة التي تتطلب دقة وجودة تشطيب وجاهزية للتركيب."
    },
    "المعدات والتقنية": {
      overview: "تشمل القاعدة التقنية معدات نجارة متخصصة مثل تلبيس الحواف من SCM والتشكيل المستمر والصنفرة العريضة وقص الألواح وأنظمة التخريم ومكابس ORMA الحرارية وتعشيق Centauro وتجهيز القشرة من Casati.",
      role: "في الأعمال المعمارية الفاخرة تمنح التقنية للحرفية ثباتاً أكبر، فهي تساعد الفرق الماهرة على إنتاج تفاصيل متقدمة مع الحفاظ على الاتساق المطلوب في المشاريع التجارية والسكنية والصحية والفندقية والمؤسسية.",
      importance: "تحسن المعدات المتخصصة تكرار الجودة وتضبط تفاوتات الإنتاج وتدعم التعامل مع المواد المعقدة. كما تساعد على فصل مراحل القص والربط وتحضير السطح والتشكيل والتشطيب إلى نقاط فحص أوضح.",
      benefits: ["تحقيق دقة صناعية مع الحفاظ على مرونة التصنيع الخاص", "دعم سير عمل القشرة واللامينيت والخشب والألواح", "تحسين السرعة والاتساق في إنتاج المشاريع", "إنشاء نقاط قياس واضحة للجودة وجاهزية التشطيب"],
      usage: "تطبق التقنية في الأبواب والإطارات والخزائن وأنظمة الجدران والعدادات والنجارة الخاصة حيث يتطلب التصميم بيئة إنتاج منضبطة وليست تصنيعاً يدوياً فقط."
    },
    "المنتجات": {
      overview: "تشمل المنتجات الأبواب المقاومة للحريق والأبواب العادية والإطارات والدواليب والخزائن والعدادات والكسوات الخشبية وأعمال المكاتب والأثاث الخاص وعناصر الضيافة المصممة للاستخدام العملي والمظهر الراقي.",
      role: "تطوير المنتجات هو نقطة التقاء الإنتاج الصناعي بالتعبير المعماري، حيث يجب أن يحقق كل عنصر الوظيفة والمتانة وجودة التشطيب واستمرارية التصميم مع ملاءمة بيئته النهائية.",
      importance: "تساعد فئات المنتجات الواضحة الورشة على تخطيط المواد والإكسسوارات وأنظمة التشطيب وتسلسل الإنتاج ومتطلبات التركيب بدقة أعلى، مما يحسن التنسيق بين التصميم والتصنيع وفرق الموقع.",
      benefits: ["توفير نطاق واسع من الأعمال الخشبية المعمارية من الأبواب إلى الديكورات", "دعم المتطلبات القياسية والتفاصيل الخاصة للمشاريع", "تحسين الربط بين احتياجات العميل وخطة الإنتاج", "المحافظة على جودة متسقة عبر أنواع مشاريع مختلفة"],
      usage: "تستخدم هذه المنتجات في الديكورات السكنية والمكاتب التجارية والفنادق والبيئات الصحية والمتاجر ومشاريع التجهيز التي تتطلب بناءً قوياً ومظهراً فاخراً."
    },
    "معايير الجودة": {
      overview: "تمنح معايير الجودة هيكلاً واضحاً لكل مرحلة من مراحل الورشة، بما في ذلك قدرة BM TRADA Q-Mark للأبواب المقاومة للحريق وممارسات الجودة وفق ISO وضبط المواد الخام وفحوصات المراحل وتنسيق التركيب.",
      role: "في الحرفية الصناعية الفاخرة تعد الجودة النظام الذي يحمي النتيجة النهائية، فهي تربط التحقق من المواد ودقة الإنتاج وانضباط التشطيب وفحوصات التركيب ضمن عملية ضمان مستمرة.",
      importance: "تساعد فحوصات المراحل على اكتشاف الملاحظات قبل أن تتحول إلى مشكلات مكلفة في الموقع. كما تدعم قدرات الأبواب المقاومة للحريق وممارسات ISO التوثيق والاتساق والمساءلة وثقة العملاء في المشاريع المنظمة أو عالية القيمة.",
      benefits: ["تعزيز الثقة من خلال ممارسات جودة موثقة", "دعم سير عمل أكثر أماناً وموثوقية للأبواب المقاومة للحريق", "تحسين الاتساق من المادة الخام إلى التسليم النهائي", "تقليل المخاطر أثناء التركيب وإنهاء المشروع"],
      usage: "تطبق معايير الجودة عبر التصنيع والتركيب للأبواب والنجارة والخزائن وعناصر التجهيز والديكورات المعمارية التي تتطلب أداءً موثوقاً وتسليماً احترافياً."
    }
  }
};

export function CapabilityCards({ capabilities, locale }: { capabilities: Capability[]; locale: Locale }) {
  const [activeCapability, setActiveCapability] = useState<Capability | null>(null);
  const copy = labels[locale];
  const lockId = "capability-viewer";
  const openCapability = (capability: Capability) => {
    if (!acquireOverlayLock(lockId)) return;
    setActiveCapability(capability);
  };
  const closeCapability = () => {
    setActiveCapability(null);
    releaseOverlayLock(lockId);
  };

  const activeDetail = useMemo(() => {
    if (!activeCapability) {
      return null;
    }
    return details[locale][activeCapability.title];
  }, [activeCapability, locale]);

  useEffect(() => {
    if (!activeCapability) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCapability();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCapability]);

  useEffect(() => {
    return () => releaseOverlayLock(lockId);
  }, []);

  return (
    <>
      <div className="grid three capabilityGrid">
        {capabilities.map((capability, index) => (
          <motion.button
            type="button"
            className="glass card capabilityCard"
            key={capability.title}
            onClick={() => openCapability(capability)}
            aria-label={`${copy.open}: ${capability.title}`}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <span className="capabilityNumber">{String(index + 1).padStart(2, "0")}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeCapability && activeDetail ? (
          <motion.div
            className="capabilityModalOverlay"
            role="dialog"
            aria-modal="true"
            aria-label={activeCapability.title}
            onClick={closeCapability}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              className="capabilityModal"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="capabilityModalClose" type="button" onClick={closeCapability} aria-label={copy.close}>
                <X size={20} />
              </button>
              <div className="capabilityModalContent">
                <p className="eyebrow">{copy.overview}</p>
                <h3>{activeCapability.title}</h3>
                <p>{activeDetail.overview}</p>

                <section>
                  <h4>{copy.role}</h4>
                  <p>{activeDetail.role}</p>
                </section>

                <section>
                  <h4>{copy.importance}</h4>
                  <p>{activeDetail.importance}</p>
                </section>

                <section>
                  <h4>{copy.benefits}</h4>
                  <ul>
                    {activeDetail.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4>{copy.usage}</h4>
                  <p>{activeDetail.usage}</p>
                </section>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
