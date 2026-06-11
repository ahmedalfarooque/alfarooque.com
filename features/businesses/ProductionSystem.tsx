"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/types/content";

type ProductionStage = {
  key: string;
  title: string;
  label: string;
  image: string;
  detail: string;
  points: string[];
};

const stageContent: Record<Locale, Record<string, Omit<ProductionStage, "key" | "title">>> = {
  en: {
    "Design coordination": {
      label: "Technical planning",
      image: "/images/wood-office.webp",
      detail: "Every project begins with coordinated drawings, measurements, and production planning so design intent can be translated into accurate workshop instructions.",
      points: ["Purpose: align design, budget, and production scope", "Tools: drawings, measurements, and project coordination files", "Importance: reduces rework before fabrication begins", "Output: approved production direction for the workshop"]
    },
    "Material selection": {
      label: "Quality material control",
      image: "/images/wood-wall.webp",
      detail: "Materials are selected for appearance, durability, application, and finish compatibility before moving into cutting and production.",
      points: ["Purpose: choose suitable boards, veneers, laminates, and finishes", "Tools: material samples and specification checks", "Importance: protects quality and visual consistency", "Output: approved material set ready for fabrication"]
    },
    "Automated production": {
      label: "Precision manufacturing",
      image: "/images/factory-machine.webp",
      detail: "Automated machinery supports cutting, routing, drilling, edging, sanding, and repeatable production for architectural wood elements.",
      points: ["Purpose: transform raw panels into accurate components", "Tools: CNC, panel saw, edge banding, drilling, and sanding systems", "Importance: improves speed, precision, and repeatability", "Output: prepared wood components ready for assembly"]
    },
    "Quality inspection": {
      label: "Controlled verification",
      image: "/images/machines/machine-05.webp",
      detail: "Components are checked for sizing, finish preparation, edge quality, alignment, and readiness before final assembly or site delivery.",
      points: ["Purpose: verify workmanship before installation", "Tools: measurement checks, surface review, and finishing inspection", "Importance: ensures defects are corrected early", "Output: approved components ready for final workflow"]
    },
    "Site installation": {
      label: "On-site execution",
      image: "/images/gallery/gallery-01.webp",
      detail: "Installation teams coordinate delivery, fitting, alignment, and finishing details so manufactured elements integrate cleanly with site conditions.",
      points: ["Purpose: install finished woodwork accurately on site", "Tools: fitting tools, alignment methods, and site coordination", "Importance: protects design quality in the final environment", "Output: installed architectural woodwork ready for handover"]
    },
    "Final handover": {
      label: "Completion assurance",
      image: "/images/project-flower.webp",
      detail: "The final stage confirms completion, reviews finishing quality, and supports a professional handover experience for the client.",
      points: ["Purpose: close the project with confidence", "Tools: final review, cleaning, and client walkthrough", "Importance: confirms expectations and service quality", "Output: completed project ready for use"]
    }
  },
  ar: {
    "Design coordination": {
      label: "تخطيط فني",
      image: "/images/wood-office.webp",
      detail: "تبدأ كل مهمة بتنسيق الرسومات والمقاسات وخطة الإنتاج حتى يتحول التصميم إلى تعليمات دقيقة للورشة.",
      points: ["الهدف: مواءمة التصميم والميزانية ونطاق الإنتاج", "الأدوات: الرسومات والمقاسات وملفات تنسيق المشروع", "الأهمية: تقليل إعادة العمل قبل بدء التصنيع", "الناتج: اتجاه إنتاج معتمد للورشة"]
    },
    "Material selection": {
      label: "ضبط جودة المواد",
      image: "/images/wood-wall.webp",
      detail: "يتم اختيار المواد بناءً على المظهر والمتانة وطبيعة الاستخدام وتوافقها مع التشطيب قبل الانتقال إلى القص والإنتاج.",
      points: ["الهدف: اختيار الألواح والقشرة واللامينيت والتشطيبات المناسبة", "الأدوات: عينات المواد وفحص المواصفات", "الأهمية: حماية الجودة والثبات البصري", "الناتج: مجموعة مواد معتمدة وجاهزة للتصنيع"]
    },
    "Automated production": {
      label: "تصنيع دقيق",
      image: "/images/factory-machine.webp",
      detail: "تدعم المعدات الآلية عمليات القص والحفر والتخريم وتلبيس الحواف والصنفرة لإنتاج عناصر خشبية معمارية متكررة ودقيقة.",
      points: ["الهدف: تحويل المواد الخام إلى مكونات دقيقة", "الأدوات: CNC ومنشار ألواح وتلبيس حواف وتخريم وصنفرة", "الأهمية: تحسين السرعة والدقة والتكرار", "الناتج: مكونات خشبية جاهزة للتجميع"]
    },
    "Quality inspection": {
      label: "تحقق محكوم",
      image: "/images/machines/machine-05.webp",
      detail: "يتم فحص المقاسات وتجهيز السطح وجودة الحواف والمحاذاة والجاهزية قبل التجميع النهائي أو التسليم للموقع.",
      points: ["الهدف: التأكد من جودة العمل قبل التركيب", "الأدوات: فحص المقاسات ومراجعة السطح والتشطيب", "الأهمية: معالجة الملاحظات مبكراً", "الناتج: مكونات معتمدة جاهزة للمرحلة التالية"]
    },
    "Site installation": {
      label: "تنفيذ في الموقع",
      image: "/images/gallery/gallery-01.webp",
      detail: "تنسق فرق التركيب التسليم والملاءمة والمحاذاة وتفاصيل التشطيب حتى تندمج العناصر المصنعة مع ظروف الموقع بدقة.",
      points: ["الهدف: تركيب الأعمال الخشبية النهائية بدقة", "الأدوات: أدوات التركيب وطرق المحاذاة وتنسيق الموقع", "الأهمية: حماية جودة التصميم في البيئة النهائية", "الناتج: أعمال خشبية معمارية مركبة وجاهزة للتسليم"]
    },
    "Final handover": {
      label: "ضمان الإنجاز",
      image: "/images/project-flower.webp",
      detail: "تؤكد المرحلة النهائية اكتمال العمل وتراجع جودة التشطيب وتدعم تجربة تسليم احترافية للعميل.",
      points: ["الهدف: إغلاق المشروع بثقة", "الأدوات: المراجعة النهائية والتنظيف وجولة العميل", "الأهمية: تأكيد التوقعات وجودة الخدمة", "الناتج: مشروع مكتمل وجاهز للاستخدام"]
    }
  }
};

const localizedTitles: Record<Locale, Record<string, string>> = {
  en: {},
  ar: {
    "Design coordination": "تنسيق التصميم",
    "Material selection": "اختيار المواد",
    "Automated production": "إنتاج آلي",
    "Quality inspection": "فحص الجودة",
    "Site installation": "تركيب الموقع",
    "Final handover": "التسليم النهائي"
  }
};

const modalLabels = {
  en: { close: "Close production stage", details: "Workflow detail", keyPoints: "Key points" },
  ar: { close: "إغلاق مرحلة الإنتاج", details: "تفاصيل سير العمل", keyPoints: "النقاط الرئيسية" }
} as const;

export function ProductionSystem({ items, locale }: { items: string[]; locale: Locale }) {
  const [activeStage, setActiveStage] = useState<ProductionStage | null>(null);
  const copy = modalLabels[locale];

  const stages = useMemo(
    () =>
      items.map((item) => ({
        key: item,
        title: localizedTitles[locale][item] ?? item,
        ...stageContent[locale][item]
      })),
    [items, locale]
  );

  useEffect(() => {
    if (!activeStage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveStage(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeStage]);

  return (
    <>
      <div className="grid two productionStepGrid">
        {stages.map((stage) => (
          <motion.button
            type="button"
            className="glass card productionStepCard"
            key={stage.key}
            onClick={() => setActiveStage(stage)}
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.985 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <Image src={stage.image} width={520} height={360} alt={stage.title} loading="lazy" />
            <span>
              <small>{stage.label}</small>
              <strong>{stage.title}</strong>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeStage ? (
          <motion.div
            className="productionModalOverlay"
            role="dialog"
            aria-modal="true"
            aria-label={activeStage.title}
            onClick={() => setActiveStage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <motion.div
              className="productionModal"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <button className="productionModalClose" type="button" onClick={() => setActiveStage(null)} aria-label={copy.close}>
                <X size={20} />
              </button>
              <div className="productionModalImage">
                <Image src={activeStage.image} width={1200} height={820} alt={activeStage.title} sizes="(max-width: 900px) 92vw, 58vw" />
              </div>
              <div className="productionModalDetails">
                <p className="eyebrow">{copy.details}</p>
                <h3>{activeStage.title}</h3>
                <p>{activeStage.detail}</p>
                <h4>{copy.keyPoints}</h4>
                <ul>
                  {activeStage.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
